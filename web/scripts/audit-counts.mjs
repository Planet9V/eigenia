#!/usr/bin/env node
/**
 * COUNT AUDIT
 *
 * A literal count of the corpus must equal the corpus.
 *
 * Why this exists: every such number in this repo has been wrong at least once.
 * The README advertised "25 Treatises, 8 Working Groups" while the registry held
 * 63 and 9. A dead translation key promised "View All 7 Research Tracks". The
 * homepage still says "3 Core Research Tracks". None of these were caught by a
 * gate, because nothing compared a written number to the thing it counts.
 *
 * This does not require counts to be derived. {workingGroups.length} is not a
 * literal and is not checked. A hand-written number is allowed; it just has to
 * be true.
 *
 * Usage: node scripts/audit-counts.mjs
 * Exit:  0 clean, 1 a written count disagrees with the registry, 2 could not run.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, resolve, relative } from "node:path";

const HERE = import.meta.dirname;
const WEB = resolve(HERE, "..");
const ROOT = resolve(WEB, "..");

/** Nouns worth checking, mapped to the registry value that settles them. */
const SUBJECTS = [
  { re: /\b(\d{1,4})\s+(?:Core\s+)?Treatises\b/gi, key: "documents" },
  { re: /\b(\d{1,4})\s+Working\s+Groups\b/gi, key: "groups" },
  { re: /\b(\d{1,4})\s+(?:Core\s+)?Research\s+Tracks\b/gi, key: "groups" },
];

/**
 * Truth comes from the registry source, read as text rather than imported:
 * this file must run in plain node from prebuild, CI and the pre-push hook,
 * none of which have a TypeScript loader.
 */
function truth() {
  const src = readFileSync(join(WEB, "src/lib/wikiRegistry.ts"), "utf-8");
  const documents = (src.match(/^\s+slug:\s*"/gm) || []).length;
  const groups = new Set(
    [...src.matchAll(/^\s+id:\s*"((?:WG-\d{2}-[A-Z]+|MP-MATH|GOV-RES))"/gm)].map((m) => m[1])
  ).size;
  if (!documents || !groups) throw new Error("could not read counts from wikiRegistry.ts");
  return { documents, groups };
}

let exceptions = [];
try {
  exceptions = JSON.parse(readFileSync(join(HERE, "count-exceptions.json"), "utf-8")).allowed ?? [];
} catch (e) {
  console.error("COUNT AUDIT COULD NOT RUN: count-exceptions.json;", e.message);
  process.exit(2);
}

let COUNTS;
try {
  COUNTS = truth();
} catch (e) {
  console.error("COUNT AUDIT COULD NOT RUN:", e.message);
  process.exit(2);
}

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir)) {
    if (e === "node_modules" || e === ".next" || e.startsWith(".")) continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|md)$/.test(e)) out.push(p);
  }
  return out;
}

/** A comment is where a past mistake gets narrated, so it quotes wrong numbers on purpose. */
const IS_COMMENT = /^\s*(?:\/\/|\/\*|\*|#)/;

function check(text, allowed = []) {
  const out = [];
  const lines = text.split(/\r?\n/);
  lines.forEach((line, i) => {
    if (IS_COMMENT.test(line)) return;
    if (allowed.some((a) => line.includes(a))) return;
    for (const s of SUBJECTS) {
      s.re.lastIndex = 0;
      let m;
      while ((m = s.re.exec(line))) {
        const written = Number(m[1]);
        const actual = COUNTS[s.key];
        if (written !== actual) out.push({ line: i + 1, text: m[0].trim(), actual });
      }
    }
  });
  return out;
}

// Prove the gate can fail before trusting a pass.
const canary = `The wiki holds ${COUNTS.documents + 1} Treatises across ${COUNTS.groups + 1} Working Groups.`;
if (check(canary).length !== 2) {
  console.error("COUNT AUDIT COULD NOT RUN: self-test failed; a wrong count was not flagged.");
  process.exit(2);
}
if (check(`${COUNTS.documents} Treatises across ${COUNTS.groups} Working Groups`).length !== 0) {
  console.error("COUNT AUDIT COULD NOT RUN: self-test failed; a correct count was flagged.");
  process.exit(2);
}

const files = [
  ...walk(join(WEB, "src")),
  ...walk(join(ROOT, "documentation")),
  ...(existsSync(join(ROOT, "README.md")) ? [join(ROOT, "README.md")] : []),
];

const BAR = "=".repeat(72);
console.log(BAR);
console.log("COUNT AUDIT");
console.log(BAR);
console.log(`Registry: ${COUNTS.documents} documents, ${COUNTS.groups} working groups`);
console.log("");

let bad = 0;
for (const file of files) {
  const rel = relative(ROOT, file);
  const allowed = exceptions
    .filter((a) => a.file === rel && a.reason?.trim())
    .map((a) => a.match);
  const hits = check(readFileSync(file, "utf-8"), allowed);
  for (const h of hits) {
    bad++;
    console.log(`FAIL  ${rel}:${h.line}`);
    console.log(`        "${h.text}" but the registry holds ${h.actual}`);
  }
}

console.log("");
console.log(BAR);
if (bad) {
  console.error(`COUNT AUDIT FAILED: ${bad} written count(s) disagree with the registry.`);
  console.error("Correct the number, or derive it rather than writing it down.");
  console.log(BAR);
  process.exit(1);
}
console.log(`COUNT AUDIT PASSED: every written count matches the registry.`);
console.log(BAR);
