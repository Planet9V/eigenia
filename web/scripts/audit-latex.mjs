#!/usr/bin/env node
/**
 * audit-latex.mjs
 *
 * Scans all published treatises in references/ and pre-publish papers in
 * papers-pre-publish/ for valid KaTeX math syntax (both block $$...$$ and
 * inline $...$).
 *
 * Ensures 100% mathematical precision and zero syntax errors or warnings
 * before any publication to the wiki.
 */

import { readdirSync, statSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import katex from "katex";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(HERE, "..", "..");
const DIRS_TO_SCAN = [
  join(REPO_ROOT, "references"),
  join(REPO_ROOT, "papers-pre-publish", "DEXPI and CycloneDX"),
];

function getMarkdownFiles(dir) {
  let results = [];
  if (!statSync(dir, { throwIfNoEntry: false })?.isDirectory()) return results;
  const list = readdirSync(dir);
  for (const file of list) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getMarkdownFiles(fullPath));
    } else if (file.endsWith(".md")) {
      results.push(fullPath);
    }
  }
  return results;
}

let allFiles = [];
for (const dir of DIRS_TO_SCAN) {
  allFiles = allFiles.concat(getMarkdownFiles(dir));
}

let errors = [];
let totalFormulas = 0;

for (const file of allFiles) {
  const relPath = relative(REPO_ROOT, file);
  const content = readFileSync(file, "utf-8");
  const lines = content.split(/\r?\n/);
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip fenced code blocks (```)
    if (line.trim().startsWith("```")) {
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        i++;
      }
      i++;
      continue;
    }

    // Display math blocks ($$)
    if (line.trim().startsWith("$$")) {
      let mathStr = "";
      const startLine = i + 1;
      if (line.trim().endsWith("$$") && line.trim().length > 2) {
        mathStr = line.trim().slice(2, -2).trim();
        i++;
      } else {
        const mathLines = [];
        const openingRemainder = line.trim().slice(2);
        if (openingRemainder.trim()) mathLines.push(openingRemainder);
        i++;
        while (i < lines.length) {
          const trimmed = lines[i].trim();
          if (trimmed.startsWith("$$")) {
            i++;
            break;
          }
          if (trimmed.endsWith("$$")) {
            mathLines.push(lines[i].replace(/\$\$\s*$/, ""));
            i++;
            break;
          }
          mathLines.push(lines[i]);
          i++;
        }
        mathStr = mathLines.join("\n").trim();
      }

      totalFormulas++;
      try {
        katex.renderToString(mathStr, {
          displayMode: true,
          throwOnError: true,
          strict: (code, msg) => {
            errors.push({
              file: relPath,
              line: startLine,
              type: `WARNING [${code}]`,
              detail: msg,
              snippet: mathStr.slice(0, 80).replace(/\n/g, " "),
            });
          },
        });
      } catch (err) {
        errors.push({
          file: relPath,
          line: startLine,
          type: "SYNTAX ERROR",
          detail: err.message,
          snippet: mathStr.slice(0, 80).replace(/\n/g, " "),
        });
      }
      continue;
    }

    // Inline math ($...$)
    const mathRegex = /(\$\$[\s\S]*?\$\$|\$(?:[^$\\]*\\.)+[^$\\]*\$|\$[^$\\]+?\$(?![0-9]))/g;
    const parts = line.split(mathRegex);

    for (const part of parts) {
      if (part.startsWith("$") && part.endsWith("$") && part.length > 2 && !part.startsWith("$$")) {
        const mathStr = part.slice(1, -1).trim();
        totalFormulas++;
        try {
          katex.renderToString(mathStr, {
            displayMode: false,
            throwOnError: true,
            strict: (code, msg) => {
              errors.push({
                file: relPath,
                line: i + 1,
                type: `INLINE WARNING [${code}]`,
                detail: msg,
                snippet: mathStr.slice(0, 80),
              });
            },
          });
        } catch (err) {
          errors.push({
            file: relPath,
            line: i + 1,
            type: "INLINE ERROR",
            detail: err.message,
            snippet: mathStr.slice(0, 80),
          });
        }
      }
    }

    i++;
  }
}

if (errors.length > 0) {
  console.error(`FAILED: audit-latex found ${errors.length} issue(s) across ${allFiles.length} files (${totalFormulas} formulas checked):\n`);
  for (const err of errors) {
    console.error(`  - [${err.file}:${err.line}] ${err.type}: ${err.detail}`);
    console.error(`    Snippet: ${err.snippet}\n`);
  }
  process.exit(1);
}

console.log(`PASS: audit-latex verified ${totalFormulas} formulas across ${allFiles.length} files. Zero errors, zero warnings.`);
process.exit(0);
