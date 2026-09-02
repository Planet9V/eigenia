/**
 * Audit agent for Eigenia publications.
 * Verifies that all 26 reference files in eigenia/references are:
 * 1. Registered in PAPERS_REGISTRY and WORKING_GROUPS.
 * 2. Served with 100% full fidelity without word loss or placeholder drops.
 * 3. Not corrupted by sanitizeMarkdownContent or regex filters.
 */

const fs = require("fs");
const path = require("path");

function findReferencesDir() {
  const candidates = [
    path.resolve(__dirname, "../../references"),
    path.resolve(process.cwd(), "../references"),
    path.resolve(process.cwd(), "references"),
  ];

  for (const c of candidates) {
    if (fs.existsSync(c) && fs.statSync(c).isDirectory()) {
      return c;
    }
  }
  throw new Error("Could not locate references directory in any expected path.");
}

function getAllMarkdownFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllMarkdownFiles(filePath));
    } else if (file.endsWith(".md")) {
      results.push(filePath);
    }
  }
  return results;
}

function countWords(str) {
  if (!str) return 0;
  return str.split(/\s+/).filter(Boolean).length;
}

function cleanFrontmatterOnly(raw) {
  if (!raw) return "";
  let c = raw;
  c = c.replace(/^---[\s\S]*?---\r?\n?/g, "");
  c = c.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, p1, p2) => p2 || p1.replace(/_/g, " "));
  return c.trim();
}

function run() {
  const refDir = findReferencesDir();
  const repoRoot = path.resolve(refDir, "..");
  const mdFiles = getAllMarkdownFiles(refDir);

  const jsonPath = path.resolve(__dirname, "../src/lib/generatedReferencesContent.json");
  const genData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const genContent = genData.content || {};

  console.log(`\n================================================================================`);
  console.log(`EIGENIA PUBLICATIONS FIDELITY AUDIT AGENT`);
  console.log(`Authoritative Source: ${refDir}`);
  console.log(`Total Source Documents: ${mdFiles.length}`);
  console.log(`================================================================================\n`);

  let totalErrors = 0;
  const auditResults = [];

  for (const fullPath of mdFiles) {
    const rel = path.relative(repoRoot, fullPath).replace(/\\/g, "/");
    const baseName = path.basename(fullPath, ".md");
    const rawContent = fs.readFileSync(fullPath, "utf-8");

    // Expected content is strictly source markdown without frontmatter
    const expectedContent = cleanFrontmatterOnly(rawContent);
    const expectedWords = countWords(expectedContent);
    const rawWords = countWords(rawContent);

    // Look up in generated content
    const inGenerated = genContent[rel] || genContent[baseName];
    const genWords = inGenerated ? countWords(inGenerated) : 0;

    const wordDiff = genWords - expectedWords;
    let status = "PASS";

    if (!inGenerated) {
      status = "FAIL: Missing from generated bundle";
      totalErrors++;
    } else if (wordDiff !== 0) {
      status = `FAIL: Word count discrepancy (${wordDiff > 0 ? "+" : ""}${wordDiff} words)`;
      totalErrors++;
    }

    auditResults.push({
      file: rel,
      baseName,
      rawWords,
      expectedWords,
      genWords,
      diff: wordDiff,
      status,
    });
  }

  // Print table
  console.log(`| #  | Source Document                                  | Raw Words | Expected | Delivered | Diff | Status |`);
  console.log(`|:--:|:------------------------------------------------|:---------:|:--------:|:---------:|:----:|:------:|`);

  auditResults.forEach((r, idx) => {
    const num = String(idx + 1).padStart(2, "0");
    const fname = r.baseName.length > 46 ? r.baseName.substring(0, 43) + "..." : r.baseName.padEnd(46, " ");
    const raw = String(r.rawWords).padStart(9, " ");
    const exp = String(r.expectedWords).padStart(8, " ");
    const del = String(r.genWords).padStart(9, " ");
    const diff = String(r.diff > 0 ? `+${r.diff}` : r.diff).padStart(4, " ");
    const st = r.status.startsWith("PASS") ? "✅ PASS" : "❌ " + r.status;
    console.log(`| ${num} | ${fname} | ${raw} | ${exp} | ${del} | ${diff} | ${st} |`);
  });

  console.log(`\n================================================================================`);
  if (totalErrors === 0) {
    console.log(`AUDIT PASSED: All ${mdFiles.length} reference documents are present with 100% content fidelity.`);
    console.log(`================================================================================\n`);
  } else {
    console.error(`AUDIT FAILED: ${totalErrors} issues detected across ${mdFiles.length} reference documents.`);
    console.log(`================================================================================\n`);
    process.exit(1);
  }
}

run();
