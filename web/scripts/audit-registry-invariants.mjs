#!/usr/bin/env node
/**
 * REGISTRY INVARIANTS AUDIT
 *
 * Verifies core structural invariants on wikiRegistry.ts that do not require
 * a historical baseline to check:
 *  - Exact document count matches the published corpus
 *  - Every registered document resolves to a readable file on disk
 *  - Zero duplicate slugs and zero duplicate document IDs
 *  - Every document's workingGroupId strictly matches its enclosing group ID
 *  - Every document carries required bilingual fields (titleNl, badge)
 *  - Every working group has required metadata (id, title, titleNl, badge, number)
 *
 * Parses wikiRegistry.ts as text so it runs in pure node without a TypeScript loader
 * and without pulling in the 8+ MB content bundle.
 *
 * Usage: node scripts/audit-registry-invariants.mjs
 * Exit:  0 clean, 1 invariant violation, 2 could not run.
 */

import { readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { resolveReferencesDir } from "./lib/references-dir.mjs";

const HERE = import.meta.dirname;
const WEB = resolve(HERE, "..");
const REGISTRY_PATH = join(WEB, "src/lib/wikiRegistry.ts");

let REFERENCES_DIR;
try {
  REFERENCES_DIR = resolveReferencesDir(HERE);
} catch (e) {
  console.error("REGISTRY INVARIANTS AUDIT COULD NOT RUN: references dir missing;", e.message);
  process.exit(2);
}

if (!existsSync(REGISTRY_PATH)) {
  console.error(`REGISTRY INVARIANTS AUDIT COULD NOT RUN: ${REGISTRY_PATH} missing`);
  process.exit(2);
}

const src = readFileSync(REGISTRY_PATH, "utf8");
const lines = src.split("\n");

function field(block, name, indent) {
  const re = new RegExp(`^\\s{${indent}}${name}:\\s*"((?:[^"\\\\]|\\\\.)*)",?\\s*$`, "m");
  const m = block.match(re);
  return m ? m[1] : undefined;
}

const groupStarts = [];
const docStarts = [];
lines.forEach((l, i) => {
  if (/^\s{4}id:\s*"/.test(l)) groupStarts.push(i);
  if (/^\s{8}id:\s*"/.test(l)) docStarts.push(i);
});

const groups = [];
for (let gi = 0; gi < groupStarts.length; gi++) {
  const start = groupStarts[gi];
  const end = gi + 1 < groupStarts.length ? groupStarts[gi + 1] : lines.length;
  const firstDoc = docStarts.find((d) => d > start && d < end);
  const head = lines.slice(start, firstDoc ?? end).join("\n");
  const g = {
    id: field(head, "id", 4),
    title: field(head, "title", 4),
    titleNl: field(head, "titleNl", 4),
    number: field(head, "number", 4),
    badge: field(head, "badge", 4),
    badgeNl: field(head, "badgeNl", 4),
    line: start + 1,
    documents: [],
  };
  const docsHere = docStarts.filter((d) => d > start && d < end);
  for (let di = 0; di < docsHere.length; di++) {
    const ds = docsHere[di];
    const de = di + 1 < docsHere.length ? docsHere[di + 1] : end;
    const d = lines.slice(ds, de).join("\n");
    g.documents.push({
      id: field(d, "id", 8),
      slug: field(d, "slug", 8),
      title: field(d, "title", 8),
      titleNl: field(d, "titleNl", 8),
      workingGroupId: field(d, "workingGroupId", 8),
      relativePath: field(d, "relativePath", 8),
      badge: field(d, "badge", 8),
      line: ds + 1,
    });
  }
  groups.push(g);
}

const allDocs = groups.flatMap((g) => g.documents);
const slugs = allDocs.map((d) => d.slug);
const ids = allDocs.map((d) => d.id);
const dup = (arr) => [...new Set(arr.filter((v, i) => arr.indexOf(v) !== i))];

const violations = [];

// Invariant 1: Document count must match 122
if (allDocs.length !== 122) {
  violations.push(`INV-1: Expected exactly 122 documents, found ${allDocs.length}`);
}

// Invariant 2: Zero missing files on disk
for (const doc of allDocs) {
  if (!doc.relativePath) {
    violations.push(`INV-2: Document ${doc.id} (line ${doc.line}) has no relativePath`);
    continue;
  }
  const subPath = doc.relativePath.replace(/^references\//, "");
  const diskPath = join(REFERENCES_DIR, subPath);
  if (!existsSync(diskPath)) {
    violations.push(`INV-2: Document ${doc.id} points to non-existent file on disk: ${doc.relativePath}`);
  }
}

// Invariant 3: Zero duplicate slugs or document IDs
const dupSlugs = dup(slugs);
if (dupSlugs.length > 0) {
  violations.push(`INV-3: Duplicate slugs detected: ${dupSlugs.join(", ")}`);
}
const dupIds = dup(ids);
if (dupIds.length > 0) {
  violations.push(`INV-3: Duplicate document IDs detected: ${dupIds.join(", ")}`);
}

// Invariant 10: Group nesting matches workingGroupId
for (const g of groups) {
  for (const doc of g.documents) {
    if (doc.workingGroupId !== g.id) {
      violations.push(`INV-10: Document ${doc.id} has workingGroupId "${doc.workingGroupId}" but is nested in group "${g.id}"`);
    }
  }
}

// Invariant 15: Required metadata fields present
for (const doc of allDocs) {
  if (!doc.titleNl?.trim()) {
    violations.push(`INV-15: Document ${doc.id} is missing titleNl`);
  }
  if (!doc.badge?.trim()) {
    violations.push(`INV-15: Document ${doc.id} is missing badge`);
  }
}

// Group metadata
for (const g of groups) {
  if (!g.id || !g.title || !g.titleNl || !g.number || !g.badge) {
    violations.push(`Group ${g.id || "UNKNOWN"} is missing required fields (id, title, titleNl, number, or badge)`);
  }
}

console.log("========================================================================");
console.log("REGISTRY INVARIANTS AUDIT");
console.log("========================================================================");
console.log(`Audited ${groups.length} working groups and ${allDocs.length} treatises.`);

if (violations.length > 0) {
  console.error(`\nFAILED with ${violations.length} violations:`);
  violations.forEach((v) => console.error(`  - ${v}`));
  console.log("========================================================================");
  process.exit(1);
}

console.log("\nREGISTRY INVARIANTS AUDIT PASSED: All 122 documents and groups conform.");
console.log("========================================================================");
process.exit(0);
