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

const ROOT = resolve(import.meta.dirname, "../..");
const REGISTRY = join(import.meta.dirname, "terminology-registry.json");

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e.endsWith(".md")) out.push(p);
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
if (!canaryHit) {
  console.error("TERMINOLOGY AUDIT ABORTED: the gate did not flag a known-bad string,");
  console.error("so a green result here would prove nothing.");
  process.exit(2);
}

console.log("\n" + "=".repeat(72));
console.log("TERMINOLOGY AUDIT");
console.log("=".repeat(72) + "\n");

let violations = 0;
for (const file of walk(join(ROOT, "references"))) {
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
