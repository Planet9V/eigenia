/**
 * Build-time synchronizer for Eigenia publications.
 * Reads directly from eigenia/references to generate an authoritative,
 * un-truncated, full-fidelity content module for both /papers and /wiki.
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

function sanitizeContent(raw) {
  if (!raw) return "";
  let c = raw;
  // Strip YAML frontmatter strictly between opening and closing ---
  c = c.replace(/^---[\s\S]*?---\r?\n?/g, "");
  // Convert Obsidian [[target|label]] to label, or [[target]] to target (spaces instead of underscores)
  c = c.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, p1, p2) => p2 || p1.replace(/_/g, " "));
  return c.trim();
}

function run() {
  const refDir = findReferencesDir();
  const repoRoot = path.resolve(refDir, "..");
  const mdFiles = getAllMarkdownFiles(refDir);

  console.log(`[sync-publications] Found ${mdFiles.length} markdown files in ${refDir}`);

  const contentMap = {};
  const metaMap = {};

  for (const fullPath of mdFiles) {
    const relFromRoot = path.relative(repoRoot, fullPath).replace(/\\/g, "/");
    const raw = fs.readFileSync(fullPath, "utf-8");
    const sanitized = sanitizeContent(raw);

    const baseName = path.basename(fullPath, ".md");
    const words = sanitized.split(/\s+/).filter(Boolean).length;
    const lines = sanitized.split(/\r?\n/).length;

    const fileMeta = {
      baseName,
      relativePath: relFromRoot,
      wordCount: words,
      lineCount: lines,
      charCount: sanitized.length,
    };

    // Index by relativePath, baseName, and sanitized baseName
    contentMap[relFromRoot] = sanitized;
    contentMap[baseName] = sanitized;

    metaMap[relFromRoot] = fileMeta;
    metaMap[baseName] = fileMeta;
  }

  // Also map known slugs to their baseName
  const slugToBaseMap = {
    "taleb-fooled-by-randomness": "WG-02-DT-1",
    "cdt-series-background": "WG-02-DT-2",
    "cdt-series-1": "WG-02-DT-3",
    "cdt-series-2": "WG-02-DT-4",
    "cdt-series-3": "WG-02-DT-5",
    "dexpi-cyclonedx-standards": "WG-05-CAD-DEXPI-Introduction",
    "1-underwriter-overview": "WG-01-UI-1-Overview",
    "2-underwriter-cope-summary": "WG-01-UI-1-COPE_summary",
    "3-underwriter-cope-detail": "WG-01-UI-1-COPE_detail",
    "4-underwriter-cyber-risk-underwriting": "WG-01-UI-1-Cyber_Risk_Underwriting",
    "101-underwriter-cyber-observations": "WG-01-UI-Cyber_Observations",
    "102-cyber-method": "WG-01-UI-1-Cyber_Method",
    "102-oxot-underwriter-value-prop": "WG-01-UI-1-7-Industry-Value-Prop",
    "104-competitive-analysis": "WG-01-UI-1-Competitive_Analysis",
    "oxot-cdt-underwriters-needed-improvements": "WG-01-UI-1-Req-Improvements",
    "paradigm-suite": "WG-02-DT-Paradigm-Library",
    "lacanian-psychohistory-framework": "WG-03-ML-Mckenney-Lacanian",
    "kramers-escape-model": "MP_Kramers_Escape_Model",
    "tacam-deep-dive": "WG-07-TM-TACAM",
    "atq-deep-dive": "WG-07-TM-ATQ",
    "monte-carlo-engine": "WG-08-MO-Monte Carlo Engine",
    "death-wobble-frequency-instability": "WG-04-CF-Death Wobble-The Grids Precarious Pulse Frequency Instability - jmckenney",
    "cascading-failure-hypothesis": "WG-04-CF-Cascading Failure Hypothesis",
    "cdt-mathematical-models": "MP_Mathematical_Models",
    "graph-universe-visualizer": "WG-02-DT-Applied-Physics",
    "research-sourcing-governance": "README",
  };

  for (const [slug, baseName] of Object.entries(slugToBaseMap)) {
    if (contentMap[baseName]) {
      contentMap[slug] = contentMap[baseName];
      metaMap[slug] = metaMap[baseName];
    }
  }

  // Also handle special id mappings used in wiki.ts
  const specialWikiIdMap = {
    "WG-04-CF-Cascading-Failure-Hypothesis": "WG-04-CF-Cascading Failure Hypothesis",
    "WG-04-CF-Death-Wobble": "WG-04-CF-Death Wobble-The Grids Precarious Pulse Frequency Instability - jmckenney",
    "WG-08-MO-Monte-Carlo-Engine": "WG-08-MO-Monte Carlo Engine",
    "README": "README",
    "external-research-governance": "README",
  };

  for (const [wikiId, targetBase] of Object.entries(specialWikiIdMap)) {
    if (contentMap[targetBase]) {
      contentMap[wikiId] = contentMap[targetBase];
      metaMap[wikiId] = metaMap[targetBase];
    }
  }

  const outPath = path.resolve(__dirname, "../src/lib/generatedReferencesContent.ts");
  const fileContent = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY.
 * Generated by scripts/sync-publications.js
 * Source of truth: eigenia/references/
 * Total files indexed: ${mdFiles.length}
 */

export interface DocMetadata {
  baseName: string;
  relativePath: string;
  wordCount: number;
  lineCount: number;
  charCount: number;
}

export const GENERATED_DOC_CONTENT: Record<string, string> = ${JSON.stringify(contentMap, null, 2)};

export const GENERATED_DOC_METADATA: Record<string, DocMetadata> = ${JSON.stringify(metaMap, null, 2)};
`;

  fs.writeFileSync(outPath, fileContent, "utf-8");
  console.log(`[sync-publications] Successfully wrote ${outPath} (${(fileContent.length / 1024).toFixed(1)} KB)`);
}

run();
