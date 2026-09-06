#!/usr/bin/env node
/**
 * RENDERED COMPLETENESS AUDIT
 *
 * Proves that every line of prose in references/ actually reaches the rendered
 * page. Nothing may be truncated, shortened, abbreviated or silently dropped.
 *
 * Why this exists, and why audit-publications.js is not enough:
 *   audit-publications.js compares WORD COUNTS between the markdown on disk and
 *   the generated JSON bundle. Both are upstream of rendering, so it reports green
 *   while the page itself is broken. It did exactly that when one unbalanced code
 *   fence swallowed roughly 90 lines of a treatise into a <pre>: 178 equations and
 *   10 headings stopped rendering and every gate still passed.
 *
 * This audit closes that gap by comparing SOURCE PROSE against the VISIBLE TEXT of
 * the real page.
 *
 * Usage:
 *   node scripts/audit-rendered-completeness.js [--base http://localhost:4500]
 *
 * Exits non-zero if prose is missing, or if the server is not answering properly.
 * A dead or rebuilding server must never be mistaken for a clean result.
 */

const fs = require("fs");
const path = require("path");

const BASE =
  (process.argv.includes("--base") && process.argv[process.argv.indexOf("--base") + 1]) ||
  "http://localhost:4500";

// A real page is tens of kB. Anything smaller is an error page or a dead server.
const MIN_PAGE_BYTES = 5000;
// Prose shorter than this is too generic to match reliably.
const MIN_UNIT_CHARS = 60;
// Match on a prefix so trailing inline markup cannot cause a false miss.
const MATCH_PREFIX = 55;
// Shortest prose fragment between math spans worth asserting on.
const MIN_FRAGMENT_CHARS = 25;

function findRepoRoot() {
  let d = __dirname;
  for (let i = 0; i < 6; i++) {
    if (fs.existsSync(path.join(d, "references"))) return d;
    d = path.resolve(d, "..");
  }
  throw new Error("Could not locate the repo root (no references/ found).");
}

function normalize(s) {
  return s
    .normalize("NFKD")
    // Entities must include the HEX form. Missing &#x27; left "doesn&#x27;t" as
    // "doesn x27 t", which failed to match "doesn t" and produced hundreds of
    // false positives on the first run of this audit.
    .replace(/&(?:[a-z]+|#\d+|#x[0-9a-f]+);/gi, " ")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function visibleText(html) {
  return normalize(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  );
}

/**
 * Prose lines that MUST appear on the page.
 *
 * Deliberately excluded, because the renderer restructures rather than drops them:
 *  - fenced code blocks (emitted verbatim, or rendered as a diagram)
 *  - table rows (split into cells, so the row string never appears intact)
 *  - the leading H1/H2 (moved into the hero card by suppressLeadingTitle)
 *  - list markers ("1." / "-"), which become bullets rather than text
 */
function proseUnits(md, skipLeadingHeadings = 2) {
  const out = [];
  let inFence = false;
  let headings = 0;
  for (const raw of md.split("\n")) {
    const t = raw.trim();
    if (t.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence || !t || t.startsWith("|")) continue;
    if (t.startsWith("#")) {
      headings += 1;
      if (headings <= skipLeadingHeadings) continue;
    }
    const stripped = t
      .replace(/^\s*(?:[-*+]|\d+[.)])\s+/, "")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");

    // KaTeX rewrites every math span into markup that carries the expression twice
    // (MathML annotation plus styled HTML), so a whole-line match across math will
    // always fail even when the prose is perfectly intact. Compare the PROSE
    // BETWEEN the math instead. Math itself is covered by the separate KaTeX
    // error-count gate.
    const fragments = stripped
      .split(/\$\$[\s\S]*?\$\$|\$(?:\\.|[^$\\])+?\$/)
      .map(normalize)
      .filter((f) => f.length >= MIN_FRAGMENT_CHARS);

    if (fragments.length) {
      out.push({ raw: stripped, fragments });
    } else if (normalize(stripped).length >= MIN_UNIT_CHARS) {
      // A line that is entirely math has no prose to verify.
      out.push({ raw: stripped, fragments: [], mathOnly: true });
    }
  }
  return out;
}

function slugMap(root) {
  const src = fs.readFileSync(path.join(root, "web/src/lib/papers.ts"), "utf-8");
  const map = {};
  const re = /"([a-z0-9-]+)":\s*\{[\s\S]*?relativePath:\s*"references\/([^"]+)"/g;
  let m;
  while ((m = re.exec(src)) !== null) map[m[1]] = m[2];
  return map;
}

async function main() {
  const root = findRepoRoot();
  const entries = Object.entries(slugMap(root));

  console.log("\n" + "=".repeat(78));
  console.log("RENDERED COMPLETENESS AUDIT");
  console.log(`Base: ${BASE}   Documents: ${entries.length}`);
  console.log("=".repeat(78) + "\n");

  const failures = [];
  const unreachable = [];
  let totalUnits = 0;
  let totalMissing = 0;
  let totalMathOnly = 0;

  for (const [slug, rel] of entries) {
    const file = path.join(root, "references", rel);
    if (!fs.existsSync(file)) {
      failures.push({ slug, missing: [], units: 0 });
      console.log(`FAIL  ${slug.padEnd(44)} source missing on disk: references/${rel}`);
      continue;
    }
    const md = fs.readFileSync(file, "utf-8");

    let html;
    try {
      const res = await fetch(`${BASE}/papers/${slug}`);
      html = await res.text();
      if (!res.ok) {
        unreachable.push(`${slug}: HTTP ${res.status}`);
        continue;
      }
    } catch (e) {
      unreachable.push(`${slug}: ${e.message}`);
      continue;
    }
    if (html.length < MIN_PAGE_BYTES) {
      unreachable.push(`${slug}: page only ${html.length} bytes (server error?)`);
      continue;
    }

    const visible = visibleText(html);
    const units = proseUnits(md);
    const checkable = units.filter((u) => u.fragments.length);
    const mathOnly = units.length - checkable.length;
    // Every prose fragment of a line must survive; one missing fragment fails the line.
    const missing = checkable.filter((u) =>
      u.fragments.some((f) => !visible.includes(f.slice(0, Math.min(MATCH_PREFIX, f.length))))
    );

    totalUnits += checkable.length;
    totalMissing += missing.length;
    totalMathOnly += mathOnly;

    if (missing.length) {
      failures.push({ slug, units: units.length, missing });
      console.log(
        `FAIL  ${slug.padEnd(44)} ${String(missing.length).padStart(4)} / ${checkable.length} prose lines missing`
      );
      missing.slice(0, 3).forEach((m) => console.log(`        - ${m.raw.slice(0, 100)}`));
    } else {
      console.log(`ok    ${slug.padEnd(44)} ${String(checkable.length).padStart(4)} prose lines all present`+(mathOnly?`  (+${mathOnly} math-only)`:""));
    }
  }

  console.log("\n" + "=".repeat(78));
  if (unreachable.length) {
    console.error(`AUDIT INCONCLUSIVE: ${unreachable.length} document(s) could not be fetched.`);
    unreachable.slice(0, 10).forEach((u) => console.error(`   ${u}`));
    console.error("\nA dead or rebuilding server is NOT a pass. Start the dev server, then re-run:");
    console.error("   cd web && npm run dev");
    console.log("=".repeat(78) + "\n");
    process.exit(2);
  }
  if (failures.length) {
    console.error(
      `AUDIT FAILED: ${totalMissing} of ${totalUnits} prose lines missing across ${failures.length} document(s).`
    );
    console.error("Content is being lost between the markdown and the rendered page.");
    console.log("=".repeat(78) + "\n");
    process.exit(1);
  }
  console.log(`AUDIT PASSED: all ${totalUnits} prose lines across ${entries.length} documents render in full.`);
  console.log(`(${totalMathOnly} math-only lines are covered by the KaTeX error gate, not text matching.)`);
  console.log("=".repeat(78) + "\n");
}

main().catch((e) => {
  console.error("Audit crashed:", e);
  process.exit(3);
});
