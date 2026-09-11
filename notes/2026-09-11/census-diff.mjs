#!/usr/bin/env node
/**
 * Census diff, gated by a per-phase allowlist.
 *
 * Compares two census snapshots and classifies every difference as ALLOWED
 * (named on the phase allowlist) or VIOLATION (everything else). Exits 1 on
 * any violation.
 *
 * The design point: the allowlist is a WHITELIST, not a blacklist. A change
 * nobody thought to forbid is still a violation. That is what catches the
 * failure mode being hunted here, where a rename quietly takes a document
 * title or a slug with it.
 *
 * Usage: node census-diff.mjs <before.json> <after.json> <phase>
 *        node census-diff.mjs --self-test
 */
import { readFileSync } from "node:fs";

// ---------------------------------------------------------------- allowlists

/**
 * Each phase names exactly what may move.
 *
 *   files           file paths whose content fields may change
 *   newFiles        paths that may appear that were not there before
 *   groupFields     { groupId: [field, ...] } group fields that may change
 *   newGroups       group ids that may appear
 *   retiredGroups   group ids that may disappear
 *   dropDocFields   document fields that may vanish from every document
 *   reparent        document ids that may change which group they nest under
 *   reparentFields  fields those documents may change as a consequence
 */
const CONTENT_FIELDS = [
  "sha256", "bytes", "chars", "lines", "headings", "fences", "mermaid",
  "head80", "tail80",
];

const ALLOWLISTS = {
  phase0: {},

  phase1: {
    files: ["references/WG-05-CAD-DEXPI-2/WG-05-CAD-Supply-Chain-EU-CRA.md"],
    newFiles: ["references/external-research/WG-05-CAD_eu-cra-product-classes_20260911.md"],
  },

  // Runs AFTER phase 3, per findings F1: the short titles remove the need for
  // a per-document group name, so the field is deleted rather than derived.
  phase2: {
    dropDocFields: ["workingGroupName", "workingGroupNameNl"],
  },

  phase3: {
    groupFields: {
      "WG-01-UI": ["title", "titleNl"],
      "WG-02-DT": ["title", "titleNl"],
      "WG-03-ML": ["title", "titleNl"],
      "WG-04-CF": ["title", "titleNl"],
      "WG-05-CAD": ["title", "titleNl"],
      "WG-07-TM": ["title", "titleNl"],
      "MP-MATH": ["title", "titleNl"],
      "GOV-RES": ["title", "titleNl"],
    },
    newGroups: ["WG-09-MPN"],
    retiredGroups: ["WG-08-MO"],
    reparent: [
      "WG-03-ML-Mckenney-Lacanian",
      "WG-03-ML-Calculus-of-the-Subject",
      "WG-03-ML-Loman-Operator-Topology-of-an-Act",
      "WG-03-ML-Morphogenesis-Signifying-Chain-gGNN",
      "WG-03-ML-Musical-Psychometric-Notation",
      "WG-02-DT-Article3-The-20-Second-Deficit",
      "WG-02-DT-Article4-Lacan-in-the-Control-Room",
      "WG-08-MO-Monte-Carlo-Engine",
    ],
    // A re-parented document's own workingGroupId must follow it, and the
    // denormalized group name moves with it until phase 2 deletes the field.
    reparentFields: ["workingGroupId", "workingGroupName", "workingGroupNameNl"],
  },
};

// ---------------------------------------------------------------- comparison

const violations = [];
const allowed = [];

function record(ok, entity, field, before, after) {
  const line = `${entity}.${field}: ${JSON.stringify(before)} -> ${JSON.stringify(after)}`;
  (ok ? allowed : violations).push(line);
}

function indexDocs(census) {
  const out = new Map();
  for (const g of census.groups)
    for (const d of g.documents) out.set(d.id, { doc: d, groupId: g.id });
  return out;
}

function diff(before, after, phase) {
  const al = ALLOWLISTS[phase];
  if (!al) {
    console.error(`unknown phase "${phase}". known: ${Object.keys(ALLOWLISTS).join(", ")}`);
    process.exit(2);
  }
  const fileOk = new Set(al.files ?? []);
  const newFileOk = new Set(al.newFiles ?? []);
  const reparentOk = new Set(al.reparent ?? []);
  const reparentFields = new Set(al.reparentFields ?? []);
  const dropOk = new Set(al.dropDocFields ?? []);

  // ---- files on disk
  const beforePaths = new Set(Object.keys(before.onDisk));
  const afterPaths = new Set(Object.keys(after.onDisk));
  for (const p of afterPaths)
    if (!beforePaths.has(p)) record(newFileOk.has(p), `file[${p}]`, "ADDED", null, "present");
  for (const p of beforePaths) {
    if (!afterPaths.has(p)) {
      // A vanished file is never allowed. references/ is append-only.
      record(false, `file[${p}]`, "REMOVED", "present", null);
      continue;
    }
    for (const f of CONTENT_FIELDS) {
      const b = before.onDisk[p][f], a = after.onDisk[p][f];
      if (b !== a) record(fileOk.has(p), `file[${p}]`, f, b, a);
    }
  }

  // ---- groups
  const bg = new Map(before.groups.map((g) => [g.id, g]));
  const ag = new Map(after.groups.map((g) => [g.id, g]));
  for (const id of ag.keys())
    if (!bg.has(id)) record((al.newGroups ?? []).includes(id), `group[${id}]`, "ADDED", null, "present");
  for (const [id, g] of bg) {
    if (!ag.has(id)) {
      record((al.retiredGroups ?? []).includes(id), `group[${id}]`, "RETIRED", "present", null);
      continue;
    }
    const okFields = new Set((al.groupFields ?? {})[id] ?? []);
    for (const f of ["title", "titleNl", "number", "badge", "badgeNl", "descriptionSha", "descriptionNlSha"]) {
      if (g[f] !== ag.get(id)[f]) record(okFields.has(f), `group[${id}]`, f, g[f], ag.get(id)[f]);
    }
  }

  // ---- documents
  const bd = indexDocs(before), ad = indexDocs(after);
  for (const id of ad.keys()) if (!bd.has(id)) record(false, `doc[${id}]`, "ADDED", null, "present");
  for (const [id, { doc: b, groupId: bGroup }] of bd) {
    if (!ad.has(id)) {
      // A vanished document is the headline failure. Never allowed.
      record(false, `doc[${id}]`, "LOST", `in ${bGroup}`, null);
      continue;
    }
    const { doc: a, groupId: aGroup } = ad.get(id);
    if (bGroup !== aGroup) record(reparentOk.has(id), `doc[${id}]`, "nestedUnder", bGroup, aGroup);

    for (const f of [
      "slug", "title", "titleNl", "subtitleSha", "subtitleNlSha", "workingGroupId",
      "workingGroupName", "workingGroupNameNl", "relativePath", "author",
      "publicationDate", "badge", "badgeNl", "featured", "featuredRank", "hookSha",
    ]) {
      if (b[f] === a[f]) continue;
      const vanished = b[f] !== undefined && a[f] === undefined;
      const ok =
        (vanished && dropOk.has(f)) ||
        (reparentOk.has(id) && reparentFields.has(f));
      record(ok, `doc[${id}]`, f, b[f], a[f]);
    }
  }

  // ---- aggregate movement, reported for the record
  const summary = {};
  for (const k of ["groupCount", "documentCount", "featuredCount", "totalChars", "totalMermaid"]) {
    if (before.checks[k] !== after.checks[k]) summary[k] = `${before.checks[k]} -> ${after.checks[k]}`;
  }
  return summary;
}

// ---------------------------------------------------------------- self test

function selfTest() {
  const base = {
    groups: [{
      id: "WG-00-XX", title: "T", titleNl: "TN", number: "WG-00", badge: "B",
      badgeNl: "BN", descriptionSha: "d", descriptionNlSha: "dn",
      documents: [{
        id: "DOC-1", slug: "s", title: "DT", titleNl: "DTN", subtitleSha: "x",
        subtitleNlSha: "y", workingGroupId: "WG-00-XX", workingGroupName: "T",
        workingGroupNameNl: "TN", relativePath: "references/a.md", author: "A",
        publicationDate: "April 6, 2026", badge: "DB", badgeNl: "DBN",
        featured: undefined, featuredRank: undefined, hookSha: "h",
      }],
    }],
    onDisk: {
      "references/a.md": {
        bytes: 10, sha256: "aa", chars: 10, lines: 2, head80: "h", tail80: "t",
        headings: 1, fences: 0, mermaid: 0,
      },
    },
    checks: { groupCount: 1, documentCount: 1, featuredCount: 0, totalChars: 10, totalMermaid: 0 },
  };
  const clone = () => JSON.parse(JSON.stringify(base));

  const cases = [
    ["identical snapshots", clone(), 0],
    ["document title changed", (() => { const c = clone(); c.groups[0].documents[0].title = "CHANGED"; return c; })(), 1],
    ["slug changed", (() => { const c = clone(); c.groups[0].documents[0].slug = "other"; return c; })(), 1],
    ["relativePath moved", (() => { const c = clone(); c.groups[0].documents[0].relativePath = "references/moved.md"; return c; })(), 1],
    ["document deleted", (() => { const c = clone(); c.groups[0].documents = []; return c; })(), 1],
    ["file truncated (tail80 + chars)", (() => { const c = clone(); c.onDisk["references/a.md"].tail80 = "X"; c.onDisk["references/a.md"].chars = 4; return c; })(), 1],
    ["file removed", (() => { const c = clone(); delete c.onDisk["references/a.md"]; return c; })(), 1],
    ["group title changed, not allowlisted in phase1", (() => { const c = clone(); c.groups[0].title = "NEW"; return c; })(), 1],
    ["badge changed", (() => { const c = clone(); c.groups[0].documents[0].badge = "NB"; return c; })(), 1],
    ["publicationDate changed", (() => { const c = clone(); c.groups[0].documents[0].publicationDate = "May 1, 2026"; return c; })(), 1],
    ["titleNl dropped while title kept", (() => { const c = clone(); delete c.groups[0].documents[0].titleNl; return c; })(), 1],
  ];

  let failures = 0;
  for (const [name, after, expected] of cases) {
    violations.length = 0; allowed.length = 0;
    diff(base, after, "phase1");
    const got = violations.length > 0 ? 1 : 0;
    const verdict = got === expected ? "ok  " : "FAIL";
    if (got !== expected) failures++;
    console.log(`  ${verdict} ${name.padEnd(48)} violations=${violations.length}`);
  }
  console.log(failures === 0
    ? "\nself-test PASSED: the diff catches every mutation it must catch."
    : `\nself-test FAILED: ${failures} case(s) wrong.`);
  process.exit(failures === 0 ? 0 : 1);
}

// ---------------------------------------------------------------- main

if (process.argv[2] === "--self-test") selfTest();

const [, , beforePath, afterPath, phase] = process.argv;
if (!beforePath || !afterPath || !phase) {
  console.error("usage: node census-diff.mjs <before.json> <after.json> <phase>");
  console.error("       node census-diff.mjs --self-test");
  process.exit(2);
}

const summary = diff(
  JSON.parse(readFileSync(beforePath, "utf8")),
  JSON.parse(readFileSync(afterPath, "utf8")),
  phase
);

console.log(`census-diff: ${beforePath} -> ${afterPath}, allowlist "${phase}"`);
if (Object.keys(summary).length) {
  console.log("\nAggregate movement:");
  for (const [k, v] of Object.entries(summary)) console.log(`  ${k}: ${v}`);
}
if (allowed.length) {
  console.log(`\nALLOWED (${allowed.length}), named on the "${phase}" allowlist:`);
  for (const l of allowed) console.log(`  ${l}`);
}
if (violations.length) {
  console.log(`\nVIOLATIONS (${violations.length}), NOT on the "${phase}" allowlist:`);
  for (const l of violations) console.log(`  ${l}`);
  console.log("\nFAIL: the phase changed something it was not permitted to change.");
  process.exit(1);
}
console.log(`\nPASS: ${allowed.length} allowed change(s), 0 violations.`);
