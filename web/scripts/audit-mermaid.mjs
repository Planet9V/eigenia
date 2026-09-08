#!/usr/bin/env node
/**
 * MERMAID DIAGRAM AUDIT
 *
 * Parses every ```mermaid block in references/ through the REAL mermaid library
 * and fails if any of them is invalid.
 *
 * Why this exists:
 *   MarkdownViewer renders a mermaid block by handing it to the library at
 *   runtime and falling back to a plain <pre> if parsing throws. That fallback
 *   is silent. A malformed diagram ships as a grey monospace box, the Next
 *   build stays green, and audit-publications.js still reports 100% fidelity
 *   because the source text is intact. Nothing in the pipeline notices.
 *
 *   This is the same failure shape that let one unbalanced code fence swallow
 *   ~90 lines of a treatise while every gate passed.
 *
 * Mermaid needs a DOM, so jsdom stands in for the browser. globalThis.navigator
 * is getter-only on modern Node, hence defineProperty rather than assignment.
 *
 * Usage: node scripts/audit-mermaid.mjs
 * Exit:  0 all parse, 1 at least one failed, 2 could not run at all.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, relative } from "node:path";
import { JSDOM } from "jsdom";
import { resolveReferencesDir } from "./lib/references-dir.mjs";

const REFS_DIR = resolveReferencesDir(import.meta.dirname);
// ROOT is only used to print paths as references/WG-.../file.md
const ROOT = resolve(REFS_DIR, "..");
const REFS = REFS_DIR;

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e.endsWith(".md")) out.push(p);
  }
  return out;
}

/** Extract fenced mermaid blocks with the line number the fence opens on. */
function extractBlocks(md) {
  const out = [];
  const lines = md.split("\n");
  let open = null, buf = [];
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (open === null && /^```mermaid\b/.test(t)) { open = i + 1; buf = []; continue; }
    if (open !== null) {
      if (t === "```") { out.push({ line: open, code: buf.join("\n") }); open = null; }
      else buf.push(lines[i]);
    }
  }
  if (open !== null) out.push({ line: open, code: buf.join("\n"), unterminated: true });
  return out;
}

const dom = new JSDOM("<!doctype html><body></body>", { pretendToBeVisual: true });
const w = dom.window;
for (const k of ["window", "document", "Element", "SVGElement", "Node",
                 "HTMLElement", "DocumentFragment", "getComputedStyle", "MutationObserver"]) {
  try { globalThis[k] = k === "window" ? w : w[k]; } catch { /* getter-only */ }
}
try { Object.defineProperty(globalThis, "navigator", { value: w.navigator, configurable: true }); } catch { /* already set */ }

let mermaid;
try {
  mermaid = (await import("mermaid")).default;
  mermaid.initialize({ startOnLoad: false, securityLevel: "loose" });
} catch (e) {
  console.error("MERMAID AUDIT COULD NOT RUN:", e.message);
  process.exit(2);
}

// Prove the parser actually rejects bad input. A validator that cannot fail
// is worse than none: it reports green whatever it is given.
try {
  await mermaid.parse("flowchart TD\n  A[[[unclosed");
  console.error("MERMAID AUDIT ABORTED: the parser accepted deliberately broken input,");
  console.error("so a green result here would prove nothing.");
  process.exit(2);
} catch { /* expected */ }

console.log("\n" + "=".repeat(70));
console.log("MERMAID DIAGRAM AUDIT");
console.log("=".repeat(70) + "\n");

let total = 0, bad = 0;
for (const file of walk(REFS)) {
  const blocks = extractBlocks(readFileSync(file, "utf-8"));
  if (!blocks.length) continue;
  const rel = relative(ROOT, file);
  for (const b of blocks) {
    total++;
    if (b.unterminated) {
      bad++;
      console.log(`FAIL  ${rel}:${b.line}  unterminated \`\`\`mermaid fence`);
      continue;
    }
    try {
      await mermaid.parse(b.code);
    } catch (e) {
      bad++;
      console.log(`FAIL  ${rel}:${b.line}`);
      console.log(`        ${String(e.message).split("\n")[0].slice(0, 140)}`);
    }
  }
  if (!blocks.some((b) => b.unterminated)) {
    // per-file ok line only when nothing in it failed
  }
}

console.log("\n" + "=".repeat(70));
if (bad) {
  console.error(`MERMAID AUDIT FAILED: ${bad} of ${total} diagrams do not parse.`);
  console.error("These render as a plain <pre> fallback on the live site.");
  console.log("=".repeat(70) + "\n");
  process.exit(1);
}
console.log(`MERMAID AUDIT PASSED: all ${total} diagrams parse.`);
console.log("=".repeat(70) + "\n");
