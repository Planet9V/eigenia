#!/usr/bin/env node
/**
 * CITATION AUDIT
 *
 * Fails when an [n] marker has no entry n in the same document.
 *
 * Why this exists: 148 of 494 citation markers corpus-wide sit in documents
 * with no bibliography at all. WG-02-DT carries 69 markers and not one
 * bibliography anywhere in the folder. A citation that resolves to nothing is
 * worse than no citation, because it looks like evidence.
 *
 * A document with zero markers and zero entries is clean; not every document
 * must cite. A document with markers and no bibliography is not.
 *
 * Usage: node scripts/audit-citations.mjs [--warn-orphan-entries]
 * Exit:  0 clean, 1 unresolved markers found, 2 could not run.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, relative } from "node:path";

const ROOT = resolve(import.meta.dirname, "../..");
const WARN_ORPHANS = process.argv.includes("--warn-orphan-entries");

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e.endsWith(".md")) out.push(p);
  }
  return out;
}

/**
 * Bibliography entries, after a heading that names a reference list.
 *
 * Three widenings over the naive version, each forced by a real false positive
 * found when this gate was first run:
 *
 *  1. "Citations" is a heading this corpus actually uses, in "## Research and
 *     Citations" and "#### Citations". The naive vocabulary of References,
 *     Bibliography and Works Cited missed four documents that DO carry a
 *     resolving list.
 *  2. The keyword can sit mid-title. "## 10. Normative Standards, References
 *     and IEEE Bibliographic Register" is a bibliography heading; requiring the
 *     keyword immediately after the number prefix missed it.
 *  3. Entries may be bulleted. This corpus writes "- [1] Kramers, H. A. (1940)"
 *     as often as "1. Kramers". Anchoring the digit to line start missed those.
 *
 * Reporting a document as unsourced when it carries a resolving bibliography is
 * the worst failure this gate can have, because it would send someone to add a
 * bibliography that already exists.
 */
function bibliographyIndices(text) {
  const idx = new Set();
  const parts = text.split(
    /^#{1,4} .*\b(?:References|Bibliography|Works Cited|Citations)\b.*$/im
  );
  if (parts.length < 2) return idx;
  const tail = parts.slice(1).join("\n");
  for (const mm of tail.matchAll(/^\s*(?:[-*+]\s*)?(?:\[(\d{1,3})\]|(\d{1,3})\.)\s+\S/gm)) {
    idx.add(Number(mm[1] ?? mm[2]));
  }
  return idx;
}

// Prove the gate can fail before trusting a pass. Each case below corresponds to
// a false positive this gate actually produced; if any stops parsing, the gate
// has silently narrowed and its green results are not trustworthy.
const CANARIES = [
  ["## References\n1. Something\n", 1, "plain numbered entry"],
  ["## Research and Citations\n- [2] Something\n", 1, "bulleted bracket entry under a Citations heading"],
  ["## 10. Normative Standards, References and Register\n3. Something\n", 1, "keyword mid-title"],
  ["## Introduction\n1. Not a bibliography\n", 0, "a non-bibliography heading must yield nothing"],
];
for (const [sample, expected, why] of CANARIES) {
  if (bibliographyIndices(sample).size !== expected) {
    console.error(`CITATION AUDIT ABORTED: canary failed, ${why}.`);
    console.error("A green result here would prove nothing.");
    process.exit(2);
  }
}

console.log("\n" + "=".repeat(72));
console.log("CITATION AUDIT");
console.log("=".repeat(72) + "\n");

let unresolved = 0, orphans = 0, clean = 0;
for (const file of walk(join(ROOT, "references"))) {
  const rel = relative(ROOT, file);
  const text = readFileSync(file, "utf-8");
  const body = text.replace(/```[\s\S]*?```/g, " ");
  const entries = bibliographyIndices(text);
  const cited = new Set();
  for (const m of body.matchAll(/\[(\d{1,3})\]/g)) cited.add(Number(m[1]));

  if (cited.size === 0 && entries.size === 0) { clean++; continue; }

  const missing = [...cited].filter((n) => !entries.has(n)).sort((a, b) => a - b);
  const unused = [...entries].filter((n) => !cited.has(n)).sort((a, b) => a - b);

  if (missing.length) {
    unresolved += missing.length;
    console.log(`FAIL  ${rel}`);
    console.log(`        ${missing.length} marker(s) resolve to nothing: ${missing.slice(0, 12).join(", ")}`);
    console.log(`        bibliography has ${entries.size} entries`);
  }
  if (unused.length && WARN_ORPHANS) {
    orphans += unused.length;
    console.log(`warn  ${rel}  ${unused.length} entries cited by nothing: ${unused.slice(0, 12).join(", ")}`);
  }
}

console.log("\n" + "=".repeat(72));
console.log(`${clean} document(s) carry neither markers nor a bibliography, which is allowed.`);
if (WARN_ORPHANS) console.log(`${orphans} bibliography entries cited by nothing.`);
if (unresolved) {
  console.error(`CITATION AUDIT FAILED: ${unresolved} marker(s) resolve to nothing.`);
  console.log("=".repeat(72) + "\n");
  process.exit(1);
}
console.log("CITATION AUDIT PASSED: every marker resolves.");
console.log("=".repeat(72) + "\n");
