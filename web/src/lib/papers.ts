import fs from "fs";
import path from "path";

export interface PaperMeta {
  slug: string;
  category: string;
  number: string;
  title: string;
  filePath: string;
  sourceChars: number;
}

export interface PaperData extends PaperMeta {
  content: string;
  charCount: number;
  lineCount: number;
  wordCount: number;
}

export const PAPERS_REGISTRY: Record<string, { title: string; category: string; number: string; relativePath: string }> = {
  // Track 1: Taleb Probabilistic Risk Series
  "taleb-fooled-by-randomness": {
    title: "Paper I: Fooled by Randomness — Epistemology of Risk in Physical Infrastructure",
    category: "Probabilistic Risk Series",
    number: "TALEB I",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-1.md",
  },
  "cdt-series-background": {
    title: "Paper II: Background & Philosophical Foundations of Anti-Fragile Systems",
    category: "Probabilistic Risk Series",
    number: "TALEB II",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-2.md",
  },
  "cdt-series-1": {
    title: "Paper III: Cyber Digital Twin Architecture Brief & Non-Linear Dynamics",
    category: "Probabilistic Risk Series",
    number: "TALEB III",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-3.md",
  },
  "cdt-series-2": {
    title: "Paper IV: Taleb on Wall Street vs. Physical Infrastructure Realities",
    category: "Probabilistic Risk Series",
    number: "TALEB IV",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-4.md",
  },
  "cdt-series-3": {
    title: "Paper V: Graph Neural Networks & Psychometric Tensors Technical Deep Dive",
    category: "Probabilistic Risk Series",
    number: "TALEB V",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-5.md",
  },

  // Track 2: Cyber-Physical Standards
  "dexpi-cyclonedx-standards": {
    title: "Eigenia Physics Models & DEXPI 2.0 / CycloneDX 4-BOM Standards",
    category: "Cyber-Physical Standards",
    number: "TRACK 02",
    relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-DEXPI-Introduction.md",
  },

  // Track 3: Actuarial Re-Invention & Underwriter Treatises
  "1-underwriter-overview": {
    title: "Treatise 01: Cyber Underwriting Overview & Physical Risk Integration",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 01",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-Overview.md",
  },
  "2-underwriter-cope-summary": {
    title: "Treatise 02: COPE Framework Summary for Industrial Assets",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 02",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-COPE_summary.md",
  },
  "3-underwriter-cope-detail": {
    title: "Treatise 03: Detailed Cyber COPE Analysis & Physical Loss Expectations",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 03",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-COPE_detail.md",
  },
  "4-underwriter-cyber-risk-underwriting": {
    title: "Treatise 04: Catastrophe-Grade Cyber-Physical Actuarial Engine",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 04",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-Cyber_Risk_Underwriting.md",
  },
  "101-underwriter-cyber-observations": {
    title: "Treatise 05: Empirical Cyber Insurance Market Observations",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 05",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-Cyber_Observations.md",
  },
  "102-cyber-method": {
    title: "Treatise 06: Non-Linear Cyber Risk Underwriting Methodology",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 06",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-Cyber_Method.md",
  },
  "102-oxot-underwriter-value-prop": {
    title: "Treatise 07: Underwriter Value Proposition & Dynamic Premium Adjustments",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 07",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-7-Industry-Value-Prop.md",
  },
  "104-competitive-analysis": {
    title: "Treatise 08: Actuarial Engine Ecosystem Competitive Analysis",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 08",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-Competitive_Analysis.md",
  },
  "oxot-cdt-underwriters-needed-improvements": {
    title: "Treatise 09: Reinsurance Layering & Lloyd's Y5381 War Exclusion Module",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 09",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-Req-Improvements.md",
  },
  "paradigm-suite": {
    title: "Treatise 10: The Paradigm Suite — Actuarial Portfolio Transformation",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 10",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-Paradigm-Library.md",
  },
  "lacanian-psychohistory-framework": {
    title: "Treatise 11: Lacanian Psychometric Tensor & Human Node Dissonance",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 11",
    relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Mckenney-Lacanian.md",
  },
  "kramers-escape-model": {
    title: "Treatise 12: Kramers Barrier Escape Model & Topological Transition Rates",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 12",
    relativePath: "references/MP-Math-Physics-Formula/MP_Kramers_Escape_Model.md",
  },

  // Track 4: TACAM Threat Matrix
  "tacam-deep-dive": {
    title: "TACAM Deep Dive: 7D Threat Actor Capability & Motivation Matrix",
    category: "Threat Intelligence Matrix",
    number: "TRACK 04",
    relativePath: "references/WG-07-TM-Threat-Modeling/WG-07-TM-TACAM.md",
  },

  // Track 5: Threat Scoring
  "atq-deep-dive": {
    title: "Adversary Threat Quotient (ATQ): 12-Factor Threat Actor Scoring Formula",
    category: "Threat Scoring Engine",
    number: "TRACK 05",
    relativePath: "references/WG-07-TM-Threat-Modeling/WG-07-TM-ATQ.md",
  },

  // Track 6: Monte Carlo Engine
  "monte-carlo-engine": {
    title: "Eigenia Monte Carlo Engine: Importance Sampling & Graph Random Walks",
    category: "Monte Carlo Engine",
    number: "TRACK 06",
    relativePath: "references/WG-08-MO-Monte-Carlo-Application/WG-08-MO-Monte Carlo Engine.md",
  },

  // Track 7: Cascading Failures
  "death-wobble-frequency-instability": {
    title: "The Grid's Precarious Pulse: Frequency Instability & Cascading Failure",
    category: "Cascading Failures",
    number: "TRACK 07-A",
    relativePath: "references/WG-04-CF-Cascading-Failures/WG-04-CF-Death Wobble-The Grids Precarious Pulse Frequency Instability - jmckenney.md",
  },
  "cascading-failure-hypothesis": {
    title: "Cascading Failure Hypothesis: Non-Linear Energy Grid Instability",
    category: "Cascading Failures",
    number: "TRACK 07-B",
    relativePath: "references/WG-04-CF-Cascading-Failures/WG-04-CF-Cascading Failure Hypothesis.md",
  },

  // Additional Models
  "cdt-mathematical-models": {
    title: "Eigenia Digital Twin Complete Mathematical Ontology (40 Governing Equations)",
    category: "Mathematical Physics",
    number: "MODEL ALL",
    relativePath: "references/MP-Math-Physics-Formula/MP_Mathematical_Models.md",
  },
  "graph-universe-visualizer": {
    title: "Graph Universe Visualizer & 3.2M Node Topology Traversal",
    category: "Graph Topology",
    number: "MODEL GRAPH",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-Applied-Physics.md",
  },
};

export function getAllPaperSlugs(): string[] {
  return Object.keys(PAPERS_REGISTRY);
}

export function getPaperBySlug(slug: string): PaperData | null {
  const meta = PAPERS_REGISTRY[slug];
  if (!meta) return null;

  // Search paths for file (web/src/content or root papers/references)
  const possiblePaths = [
    path.join(process.cwd(), "src/content", meta.relativePath),
    path.join(process.cwd(), "..", meta.relativePath),
    path.join(process.cwd(), meta.relativePath),
  ];

  let rawContent = "";
  let resolvedPath = "";

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      rawContent = fs.readFileSync(p, "utf-8");
      resolvedPath = p;
      break;
    }
  }

  if (!rawContent) {
    console.error(`Paper file not found for slug ${slug}: ${meta.relativePath}`);
    return null;
  }

  const lines = rawContent.split(/\r?\n/);

  return {
    slug,
    category: meta.category,
    number: meta.number,
    title: meta.title,
    filePath: resolvedPath,
    sourceChars: rawContent.length,
    content: rawContent,
    charCount: rawContent.length,
    lineCount: lines.length,
    wordCount: rawContent.split(/\s+/).filter(Boolean).length,
  };
}
