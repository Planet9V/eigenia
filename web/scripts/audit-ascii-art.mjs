#!/usr/bin/env node
/**
 * ASCII ART AUDIT
 *
 * Fails when a published document draws a diagram with + | and - characters
 * instead of mermaid.
 *
 * Why this exists: audit-mermaid.mjs opens a block only on /^```mermaid\b/, so
 * a bare fence full of box drawings is invisible to it. 47 such diagrams sat in
 * 13 documents and passed every gate, and the conversion work stalled without
 * anyone noticing, because nothing measured it. This is that measurement.
 *
 * Two defects are detected, and the second is worse:
 *   FENCED   box art inside a ``` block. Renders as a monospace blob in a
 *            horizontally scrolling box; the widest line in this corpus is 205
 *            characters against a phone viewport of roughly 40.
 *   UNFENCED box art in raw markdown. Bare pipes are parsed as table syntax, so
 *            the art does not merely overflow, it renders wrong.
 *
 * Usage: node scripts/audit-ascii-art.mjs
 * Exit:  0 clean, 1 art found, 2 could not run.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, relative } from "node:path";
import { resolveReferencesDir } from "./lib/references-dir.mjs";

const REFS_DIR = resolveReferencesDir(import.meta.dirname);
// ROOT is only used to print paths as references/WG-.../file.md
const ROOT = resolve(REFS_DIR, "..");

/** A box-drawing rule or frame line: starts with + or |, then run of + - | space. */
const BOX_LINE = /^\s*[+|][-+| ]{8,}/;

/** A fenced block counts as art when at least two of its lines are frame lines. */
const MIN_FRAME_LINES = 2;

/**
 * Evidence files record what an external source said, verbatim, including any
 * box art the source drew. They are not presentation surfaces and are not
 * rendered as papers, so converting their diagrams would edit a record.
 */
const EXCLUDED_DIRS = new Set(["external-research"]);

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) {
      if (!EXCLUDED_DIRS.has(e)) walk(p, out);
    } else if (e.endsWith(".md")) out.push(p);
  }
  return out;
}

/**
 * Returns { fenced: [{line, frames}], unfenced: [line] } for one document.
 * Fence state is tracked so a pipe inside a code block is not confused with a
 * pipe loose in prose; the two are different defects with different fixes.
 */
function findArt(md) {
  const lines = md.split(/\r?\n/);
  const fenced = [];
  const unfenced = [];
  let inBlock = false;
  let blockStart = 0;
  let frames = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trimStart().startsWith("```")) {
      if (inBlock) {
        if (frames >= MIN_FRAME_LINES) fenced.push({ line: blockStart, frames });
        inBlock = false;
      } else {
        inBlock = true;
        blockStart = i + 2; // 1-indexed, first line after the fence
        frames = 0;
      }
      continue;
    }
    if (inBlock) {
      if (BOX_LINE.test(line)) frames++;
    } else if (BOX_LINE.test(line)) {
      unfenced.push(i + 1);
    }
  }
  return { fenced, unfenced };
}

// Prove the gate can fail before trusting a pass. A validator that cannot fail
// is a broken validator, not a clean corpus.
const canaryFenced = "```\n+-------------+\n| A BOX LABEL |\n+-------------+\n```\n";
// Only the frame rules match, not "| LOOSE BOX |": a line carrying letters is
// text, and flagging the rules is enough to point at the art.
const canaryUnfenced = "prose\n+-------------+\n| LOOSE BOX   |\n";
const cf = findArt(canaryFenced);
const cu = findArt(canaryUnfenced);
if (cf.fenced.length !== 1 || cu.unfenced.length !== 1 || cf.unfenced.length !== 0) {
  console.error(
    `ASCII ART AUDIT COULD NOT RUN: self-test failed ` +
      `(fenced=${cf.fenced.length}/1, unfenced=${cu.unfenced.length}/1, ` +
      `leaked-from-fence=${cf.unfenced.length}/0)`
  );
  process.exit(2);
}

const files = walk(REFS_DIR);
let fencedTotal = 0;
let unfencedTotal = 0;
const report = [];

for (const file of files) {
  const rel = relative(ROOT, file);
  const { fenced, unfenced } = findArt(readFileSync(file, "utf-8"));
  if (!fenced.length && !unfenced.length) continue;
  fencedTotal += fenced.length;
  unfencedTotal += unfenced.length;
  report.push({ rel, fenced, unfenced });
}

const BAR = "=".repeat(72);
console.log(BAR);
console.log("ASCII ART AUDIT");
console.log(BAR);
console.log(`Base: ${ROOT}   Documents: ${files.length}`);
console.log("");

if (!report.length) {
  console.log(BAR);
  console.log("ASCII ART AUDIT PASSED: no box-drawing art in any document.");
  console.log(BAR);
  process.exit(0);
}

for (const r of report) {
  console.log(`FAIL  ${r.rel}`);
  for (const f of r.fenced) {
    console.log(`        fenced diagram at line ${f.line}, ${f.frames} frame lines`);
  }
  if (r.unfenced.length) {
    const shown = r.unfenced.slice(0, 6).join(", ");
    const more = r.unfenced.length > 6 ? `, and ${r.unfenced.length - 6} more` : "";
    console.log(
      `        UNFENCED box art on line(s) ${shown}${more} ` +
        `(renders wrong: bare pipes parse as table syntax)`
    );
  }
}

console.log("");
console.log(BAR);
console.log(
  `ASCII ART AUDIT FAILED: ${fencedTotal} fenced diagram(s) and ` +
    `${unfencedTotal} unfenced line(s) across ${report.length} document(s).`
);
// One number for run-audits.mjs to ratchet against. Keep this line's shape
// stable; known-failures.json matches it with a regex.
console.log(`Total: ${fencedTotal + unfencedTotal} item(s).`);
console.log("Convert to mermaid, or to a markdown table where the content is tabular.");
console.log("Not every block should become a diagram: see the plan for the classes that");
console.log("stay as code, and record a reason next to any block deliberately kept.");
console.log(BAR);
process.exit(1);
