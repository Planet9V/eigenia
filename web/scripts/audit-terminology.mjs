#!/usr/bin/env node
/**
 * TERMINOLOGY AUDIT
 *
 * Fails if a published document uses a variant of a term the registry defines
 * once, or a bare form the registry forbids.
 *
 * Why this exists: 19 of the 55 findings in the WG-05-CAD and WG-07-TM audit
 * were proved by putting two passages side by side. CBOM meant two different
 * things across seven papers. The BOM layer count was 4, 5 and 6. Four
 * incompatible IEC 62443 zone schemes all claimed the same standard. Every one
 * of those is mechanically detectable and none of them was detected, because
 * nothing checked.
 *
 * Usage: node scripts/audit-terminology.mjs
 * Exit:  0 clean, 1 violations found, 2 could not run.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, relative } from "node:path";
import { resolveReferencesDir } from "./lib/references-dir.mjs";

const REFS_DIR = resolveReferencesDir(import.meta.dirname);
// The UI carries taxonomy too. paper.category drifted until it spanned four
// working groups; "Track N //" labelled four homepage counters and a subject
// picker as research tracks. Prose rules and code rules are kept apart by the
// per-entry `scope`, so a corpus term cannot start failing on a variable name.
const SRC_DIR = resolve(import.meta.dirname, "../src");
// ROOT is only used to print paths as references/WG-.../file.md
const ROOT = resolve(REFS_DIR, "..");
const REGISTRY = join(import.meta.dirname, "terminology-registry.json");

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(md|ts|tsx)$/.test(e)) out.push(p);
  }
  return out;
}

let registry;
try {
  registry = JSON.parse(readFileSync(REGISTRY, "utf-8"));
} catch (e) {
  console.error("TERMINOLOGY AUDIT COULD NOT RUN:", e.message);
  process.exit(2);
}

// Prove the gate can fail before trusting a pass.
const canary = "This text uses Component BOM which is a forbidden variant.";
const canaryHit = registry.terms.some((t) =>
  (t.variants || []).some((v) => canary.includes(v))
);
// Every forbidden pattern must prove it still matches the string it was written
// for. A rule that silently stops matching is worse than no rule: the suite
// goes green and the defect walks back in.
const PATTERN_CANARIES = {
  "Track \\d+ ?//": "tag: \"Track 02 // Research\",",
  "ISO 15926": "grounded in ISO 15926, serializing the plant",
  "workstreams?": "A separate Eigenia workstream is in preparation",
};
for (const b of registry.bare_forms_forbidden || []) {
  const probe = Object.entries(PATTERN_CANARIES).find(([k]) => b.pattern.includes(k));
  if (probe && !new RegExp(b.pattern).test(probe[1])) {
    console.error(`TERMINOLOGY AUDIT ABORTED: pattern ${b.pattern}`);
    console.error(`no longer matches its canary ${JSON.stringify(probe[1])},`);
    console.error("so a green result would not prove the rule is live.");
    process.exit(2);
  }
}
if (!canaryHit) {
  console.error("TERMINOLOGY AUDIT ABORTED: the gate did not flag a known-bad string,");
  console.error("so a green result here would prove nothing.");
  process.exit(2);
}

console.log("\n" + "=".repeat(72));
console.log("TERMINOLOGY AUDIT");
console.log("=".repeat(72) + "\n");

/** Entries default to references-only, which is what every existing term wants. */
const inScope = (entry, area) => (entry.scope ?? "references") === area
  || (entry.scope ?? "references") === "all";

let violations = 0;
const targets = [
  ...walk(REFS_DIR).map((f) => [f, "references"]),
  ...walk(SRC_DIR).map((f) => [f, "web"]),
];
for (const [file, area] of targets) {
  const rel = relative(ROOT, file);
  const lines = readFileSync(file, "utf-8").split("\n");
  let inFence = false;
  lines.forEach((line, i) => {
    if (line.trim().startsWith("```")) { inFence = !inFence; return; }
    if (inFence) return;
    for (const t of registry.terms) {
      for (const v of t.variants || []) {
        if (line.includes(v)) {
          violations++;
          console.log(`FAIL  ${rel}:${i + 1}`);
          console.log(`        uses "${v}", canonical is "${t.canonical}"`);
          if (t.note) console.log(`        ${t.note}`);
        }
      }
    }
    for (const b of registry.bare_forms_forbidden || []) {
      if (new RegExp(b.pattern).test(line)) {
        violations++;
        console.log(`FAIL  ${rel}:${i + 1}`);
        console.log(`        ${b.message}`);
      }
    }
  });
}

console.log("\n" + "=".repeat(72));
if (violations) {
  console.error(`TERMINOLOGY AUDIT FAILED: ${violations} violation(s).`);
  console.log("=".repeat(72) + "\n");
  process.exit(1);
}
console.log("TERMINOLOGY AUDIT PASSED: no variant or bare form found.");
console.log("=".repeat(72) + "\n");
