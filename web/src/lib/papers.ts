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
  "high-density-liquid-cooling": {
    title: "High-Density Liquid Cooling Architecture & Thermal Catastrophe Dynamics",
    category: "Probabilistic Risk Series",
    number: "TALEB VI",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-High-Density-Liquid-Cooling.md",
  },
  "seven-staff-fugue": {
    title: "The Seven-Staff Fugue: A Topological Score for Cyber-Physical State Evolution",
    category: "Probabilistic Risk Series",
    number: "TALEB VII",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-Seven-Staff-Fugue.md",
  },
  "cognitive-digital-twin": {
    title: "Cognitive Digital Twin: Defender Simulation for Incident Response Optimization",
    category: "Probabilistic Risk Series",
    number: "TALEB VIII",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-Cognitive-Digital-Twin.md",
  },

  // Track 2: Cyber-Physical Standards
  "dexpi-cyclonedx-standards": {
    title: "Eigenia Physics Models & DEXPI 2.0 / CycloneDX 4-BOM Standards",
    category: "Cyber-Physical Standards",
    number: "TRACK 02",
    relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-DEXPI-Introduction.md",
  },
  "frontier-ai-hardware-security": {
    title: "Frontier AI Hardware Security & Platform Assurance Framework",
    category: "Cyber-Physical Standards",
    number: "TRACK 02-B",
    relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-Frontier-AI-Hardware-Security.md",
  },
  "unified-dexpi-cyclonedx-standards": {
    title: "Unified DEXPI 2.0 & CycloneDX 1.6+ Semantic Bridge",
    category: "Cyber-Physical Standards",
    number: "TRACK 02-C",
    relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-Unified-DEXPI-CycloneDX.md",
  },
  "supply-chain-eu-cra-standards": {
    title: "Supply Chain Transparency & EU CRA Regulatory Enforcement",
    category: "Cyber-Physical Standards",
    number: "TRACK 02-D",
    relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-Supply-Chain-EU-CRA.md",
  },
  "iec62443-sfairp-secracs": {
    title: "IEC 62443 in Practice: SFAIR, SecRACS, and Security Level Targets",
    category: "Cyber-Physical Standards",
    number: "TRACK 02-E",
    relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-IEC62443-SFAIRP-SecRACS.md",
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
  "autonomous-ot-trust-boundary": {
    title: "Autonomous OT & AI-Driven Facility Control: The Write-Access Trust Boundary",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 11-B",
    relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Autonomous-OT-Trust-Boundary.md",
  },
  "calculus-of-the-subject": {
    title: "The Calculus of the Subject: Topology, Infinitesimal Logic, and the Mirror Stage",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 11-C",
    relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Calculus-of-the-Subject.md",
  },
  "loman-operator-topology-of-an-act": {
    title: "The Loman Operator & Topology of an Act: Dynamic Phase Space Simulation of Psychodynamic Collapse",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 11-D",
    relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Loman-Operator-Topology-of-an-Act.md",
  },
  "morphogenesis-signifying-chain-ggnn": {
    title: "The Morphogenesis of the Signifying Chain: Computational Simulation via Gated Graph Neural Networks",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 11-E",
    relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Morphogenesis-Signifying-Chain-gGNN.md",
  },
  "musical-psychometric-notation": {
    title: "Musical Psychometric Notation (MPN): Formal Specification for Security State Sonification",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 11-F",
    relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Musical-Psychometric-Notation.md",
  },
  "cognitive-bias-catalog": {
    title: "Cognitive Bias Catalog: Exploiting Human Heuristics in Security Decisions",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 11-G",
    relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Cognitive-Bias-Catalog.md",
  },
  "kramers-escape-model": {
    title: "Treatise 12: Kramers Barrier Escape Model & Topological Transition Rates",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 12",
    relativePath: "references/MP-Math-Physics-Formula/MP_Kramers_Escape_Model.md",
  },
  "quantitative-cyber-physical-fmeca": {
    title: "Treatise 13: Quantitative Cyber-Physical FMECA: Failure Mode Analysis for Underwriting",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 13",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-Quantitative-Cyber-Physical-FMECA.md",
  },
  "ale-rosi-decision-framework": {
    title: "Treatise 14: Annualised Loss Expectancy & Return on Security Investment for OT",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 14",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-ALE-ROSI-Decision-Framework.md",
  },
  "rcil-scil-reinsurance": {
    title: "Treatise 15: Reliability & Safety Critical Items Lists (RCIL / SCIL) for Reinsurance",
    category: "Actuarial Re-Invention",
    number: "ACTUARIAL 15",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-RCIL-SCIL-Reinsurance.md",
  },

  // Track 4: TACAM Threat Matrix & CyHAZOP
  "tacam-deep-dive": {
    title: "TACAM Deep Dive: 7D Threat Actor Capability & Motivation Matrix",
    category: "Threat Intelligence Matrix",
    number: "TRACK 04",
    relativePath: "references/WG-07-TM-Threat-Modeling/WG-07-TM-TACAM.md",
  },
  "cyhazop-hyperscale-methodology": {
    title: "CyHAZOP: Cyber-Physical Hazard Analysis for Hyperscale Infrastructure",
    category: "Threat Intelligence Matrix",
    number: "TRACK 04-B",
    relativePath: "references/WG-07-TM-Threat-Modeling/WG-07-TM-CyHAZOP-Methodology.md",
  },
  "cyhazop-node-registers": {
    title: "CyHAZOP System Drill-Down: Node Registers for Power, Cooling, and Safety",
    category: "Threat Intelligence Matrix",
    number: "TRACK 04-C",
    relativePath: "references/WG-07-TM-Threat-Modeling/WG-07-TM-CyHAZOP-Node-Registers.md",
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
  "emerging-power-topologies": {
    title: "Emerging Power Topologies: Cyber-Physical Resilience of BESS, SMRs, and Microgrids",
    category: "Cascading Failures",
    number: "TRACK 07-C",
    relativePath: "references/WG-04-CF-Cascading-Failures/WG-04-CF-Emerging-Power-Topologies.md",
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
  "research-sourcing-governance": {
    title: "External Research Sourcing & Attribution Methodology",
    category: "Research Governance",
    number: "GOV-01",
    relativePath: "references/external-research/README.md",
  },
};

export function getAllPaperSlugs(): string[] {
  return Object.keys(PAPERS_REGISTRY);
}

export function getPaperBySlug(slug: string): PaperData | null {
  const meta = PAPERS_REGISTRY[slug];
  if (!meta) return null;

  // Search paths for authoritative file in project root references/
  const possiblePaths = [
    path.join(process.cwd(), "..", meta.relativePath),
    path.join(process.cwd(), meta.relativePath),
    path.join(process.cwd(), "src/content", meta.relativePath),
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

  // Sanitize rawContent to remove only YAML frontmatter strictly between --- boundaries
  rawContent = rawContent.replace(/^---[\s\S]*?---\r?\n?/g, "");
  rawContent = rawContent.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (m, p1, p2) => p2 || p1.replace(/_/g, " ")).trim();

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
