// Asserts the homepage featured set is well formed.
//
// Discovered automatically by run-audits.mjs, so it runs in prebuild, in CI and
// in the pre-push hook without being registered anywhere.
//
// Checks: exactly thirteen documents are featured, each has a non-empty hook, no
// hook carries an em or en dash or a banned filler word, and every hook fits a
// card.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const SRC = resolve(import.meta.dirname, "../src/lib/wikiRegistry.ts");
const EXPECTED_FEATURED = 13;
const MAX_HOOK_CHARS = 140;
const BANNED = [
  "leverage",
  "utilize",
  "pivotal",
  "testament to",
  "foster",
  "streamline",
  "at its core",
  "landscape",
  "beacon",
  "game-changing",
  "harness",
  "furthermore",
  "robust",
];

const src = readFileSync(SRC, "utf8");

// Each document object is a brace-delimited block containing a slug.
const blocks = src.split(/\n\s{6}\{\n/).slice(1);
const featured = [];
for (const b of blocks) {
  if (!/featured:\s*true/.test(b)) continue;
  const slug = (b.match(/slug:\s*"([^"]+)"/) || [])[1] ?? "(unknown)";
  const hook = (b.match(/hook:\s*"((?:[^"\\]|\\.)*)"/) || [])[1] ?? null;
  const rankRaw = (b.match(/featuredRank:\s*(\d+)/) || [])[1];
  const rank = rankRaw === undefined ? null : Number(rankRaw);
  featured.push({ slug, hook, rank });
}

const errors = [];

if (featured.length !== EXPECTED_FEATURED) {
  errors.push(
    `expected ${EXPECTED_FEATURED} featured documents, found ${featured.length}`
  );
}

for (const { slug, hook } of featured) {
  if (!hook || hook.trim() === "") {
    errors.push(`${slug}: featured but has no hook`);
    continue;
  }
  if (hook.length > MAX_HOOK_CHARS) {
    errors.push(`${slug}: hook is ${hook.length} chars, max ${MAX_HOOK_CHARS}`);
  }
  if (hook.includes("—") || hook.includes("–")) {
    errors.push(`${slug}: hook contains an em or en dash`);
  }
  const lower = hook.toLowerCase();
  for (const w of BANNED) {
    if (lower.includes(w)) errors.push(`${slug}: hook contains banned word "${w}"`);
  }
}

// Ranks decide which card leads. Without this check the order can drift back
// to registry order silently, which is exactly what happened on first render.
const ranks = featured.map((f) => f.rank);
if (ranks.some((r) => r === null)) {
  for (const f of featured) {
    if (f.rank === null) errors.push(`${f.slug}: featured but has no featuredRank`);
  }
} else {
  const dupes = ranks.filter((r, i) => ranks.indexOf(r) !== i);
  if (dupes.length)
    errors.push(`duplicate featuredRank values: ${[...new Set(dupes)].join(", ")}`);
  // A contiguous 1..N sequence matters: the band rotates by offset, so a gap
  // would make one card lead twice and another never lead at all.
  const sorted = [...ranks].sort((a, b) => a - b);
  const expected = sorted.map((_, i) => i + 1);
  if (JSON.stringify(sorted) !== JSON.stringify(expected))
    errors.push(`featuredRank must be a contiguous 1..${ranks.length} sequence, got ${sorted.join(", ")}`);
}

console.log("=".repeat(64));
console.log("FEATURED SET AUDIT");
console.log("=".repeat(64));

if (errors.length) {
  console.log("FEATURED AUDIT FAILED");
  for (const e of errors) console.log(`  ${e}`);
  console.log("=".repeat(64));
  process.exit(1);
}

console.log(`FEATURED AUDIT PASSED: ${featured.length} featured, all hooks valid.`);
for (const f of [...featured].sort((a, b) => a.rank - b.rank))
  console.log(`  ${f.rank}. ${f.slug}`);
console.log("=".repeat(64));
