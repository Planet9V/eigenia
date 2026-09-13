#!/usr/bin/env node
/**
 * Registry + corpus census.
 *
 * Emits a machine-readable snapshot of everything that must survive the
 * working-group restructure unchanged. Re-run after each PR and diff against
 * the baseline: any field that moves and was not supposed to move is a defect.
 *
 * Deliberately parses wikiRegistry.ts as TEXT rather than importing it. The
 * registry is TypeScript sitting next to a 3.3 MB content bundle; a text parse
 * cannot be fooled by a re-export and cannot pull the bundle in.
 *
 * Usage: node census.mjs <repo-root> > census.json
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, relative } from "node:path";

const ROOT = process.argv[2];
if (!ROOT) {
  console.error("usage: node census.mjs <repo-root>");
  process.exit(2);
}

const REGISTRY = join(ROOT, "web/src/lib/wikiRegistry.ts");
const REFERENCES = join(ROOT, "references");

const sha = (buf) => createHash("sha256").update(buf).digest("hex");

// ---------------------------------------------------------------- registry

const src = readFileSync(REGISTRY, "utf8");
const lines = src.split("\n");

/** Pull `field: "value"` at a given indent out of a block of lines. */
function field(block, name, indent) {
  const re = new RegExp(`^\\s{${indent}}${name}:\\s*"((?:[^"\\\\]|\\\\.)*)",?\\s*$`, "m");
  const m = block.match(re);
  return m ? m[1] : undefined;
}
/** Same, for non-string values (booleans, numbers). */
function rawField(block, name, indent) {
  const re = new RegExp(`^\\s{${indent}}${name}:\\s*([^\\n]*?),?\\s*$`, "m");
  const m = block.match(re);
  return m ? m[1] : undefined;
}

// Group blocks start at an indent-4 `id:`; document blocks at indent-8.
// Line numbers are recorded so a later diff can point at a location.
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
    descriptionSha: sha(field(head, "description", 4) ?? ""),
    descriptionNlSha: sha(field(head, "descriptionNl", 4) ?? ""),
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
      subtitleSha: sha(field(d, "subtitle", 8) ?? ""),
      subtitleNlSha: sha(field(d, "subtitleNl", 8) ?? ""),
      workingGroupId: field(d, "workingGroupId", 8),
      workingGroupName: field(d, "workingGroupName", 8),
      workingGroupNameNl: field(d, "workingGroupNameNl", 8),
      relativePath: field(d, "relativePath", 8),
      author: field(d, "author", 8),
      publicationDate: field(d, "publicationDate", 8),
      badge: field(d, "badge", 8),
      badgeNl: field(d, "badgeNl", 8),
      featured: rawField(d, "featured", 8),
      featuredRank: rawField(d, "featuredRank", 8),
      hookSha: sha(field(d, "hook", 8) ?? ""),
      line: ds + 1,
    });
  }
  groups.push(g);
}

// ---------------------------------------------------------------- filesystem

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const onDisk = {};
if (existsSync(REFERENCES)) {
  for (const p of walk(REFERENCES)) {
    const rel = relative(ROOT, p).split("\\").join("/");
    const buf = readFileSync(p);
    const text = buf.toString("utf8");
    onDisk[rel] = {
      bytes: statSync(p).size,
      sha256: sha(buf),
      chars: text.length,
      lines: text.split("\n").length,
      // Truncation detectors: a cut file keeps its head and loses its tail.
      head80: text.slice(0, 80),
      tail80: text.slice(-80),
      headings: (text.match(/^#{1,6} /gm) || []).length,
      fences: (text.match(/^```/gm) || []).length,
      mermaid: (text.match(/^```mermaid/gm) || []).length,
    };
  }
}

// ---------------------------------------------------------------- invariants

const allDocs = groups.flatMap((g) => g.documents);
const slugs = allDocs.map((d) => d.slug);
const ids = allDocs.map((d) => d.id);
const dup = (arr) => [...new Set(arr.filter((v, i) => arr.indexOf(v) !== i))];

const registeredPaths = new Set(allDocs.map((d) => d.relativePath));
const mdOnDisk = Object.keys(onDisk).filter((p) => p.endsWith(".md"));

const checks = {
  groupCount: groups.length,
  documentCount: allDocs.length,
  duplicateSlugs: dup(slugs),
  duplicateIds: dup(ids),
  // A document whose workingGroupId does not match the group it is nested in
  // is the drift paper.category had. Must always be empty.
  groupIdMismatch: groups.flatMap((g) =>
    g.documents.filter((d) => d.workingGroupId !== g.id).map((d) => d.id)
  ),
  // A document whose denormalized group name does not match its group's title.
  groupNameMismatch: groups.flatMap((g) =>
    g.documents
      .filter((d) => d.workingGroupName !== g.title)
      .map((d) => ({ doc: d.id, has: d.workingGroupName, groupTitle: g.title }))
  ),
  missingFiles: allDocs
    .filter((d) => !d.relativePath || !onDisk[d.relativePath])
    .map((d) => ({ doc: d.id, path: d.relativePath })),
  // Markdown in references/ that no registry entry points at. Not necessarily a
  // defect (external-research and README are intentionally unregistered), but
  // the set must not GROW: a grown set means a paper fell out of the registry.
  unregisteredMarkdown: mdOnDisk.filter((p) => !registeredPaths.has(p)).sort(),
  missingTitleNl: allDocs.filter((d) => !d.titleNl).map((d) => d.id),
  missingBadge: allDocs.filter((d) => !d.badge).map((d) => d.id),
  featuredCount: allDocs.filter((d) => d.featured === "true").length,
  totalChars: mdOnDisk.reduce((a, p) => a + onDisk[p].chars, 0),
  totalMermaid: mdOnDisk.reduce((a, p) => a + onDisk[p].mermaid, 0),
};

console.log(
  JSON.stringify(
    {
      censusVersion: 1,
      repoRoot: ROOT,
      registrySha: sha(readFileSync(REGISTRY)),
      groups,
      onDisk,
      checks,
    },
    null,
    2
  )
);
