import fs from "fs";
import path from "path";

export interface PaperMeta {
  slug: string;
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

export const PAPERS_REGISTRY: Record<string, { title: string; relativePath: string }> = {
  // Track 1: Taleb Probabilistic Risk Series
  "taleb-fooled-by-randomness": {
    title: "Paper I: Fooled by Randomness — Epistemology of Risk in Physical Infrastructure",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-1.md",
  },
  "cdt-series-background": {
    title: "Paper II: Background & Philosophical Foundations of Anti-Fragile Systems",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-2.md",
  },
  "cdt-series-1": {
    title: "Paper III: Cyber Digital Twin Architecture Brief & Non-Linear Dynamics",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-3.md",
  },
  "cdt-series-2": {
    title: "Paper IV: Taleb on Wall Street vs. Physical Infrastructure Realities",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-4.md",
  },
  "cdt-series-3": {
    title: "Paper V: Graph Neural Networks & Psychometric Tensors Technical Deep Dive",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-5.md",
  },
  "high-density-liquid-cooling": {
    title: "High-Density Liquid Cooling Architecture & Thermal Catastrophe Dynamics",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-High-Density-Liquid-Cooling.md",
  },
  "seven-staff-fugue": {
    title: "The Seven-Staff Fugue: A Topological Score for Cyber-Physical State Evolution",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-Seven-Staff-Fugue.md",
  },
  "cognitive-digital-twin": {
    title: "Cognitive Digital Twin: Defender Simulation for Incident Response Optimization",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-Cognitive-Digital-Twin.md",
  },

  // Track 2: Cyber-Physical Standards
  "dexpi-cyclonedx-standards": {
    title: "Eigenia Physics Models & DEXPI 2.0 / CycloneDX 4-BOM Standards",
    relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-DEXPI-Introduction.md",
  },
  "frontier-ai-hardware-security": {
    title: "Frontier AI Hardware Security & Platform Assurance Framework",
    relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-Frontier-AI-Hardware-Security.md",
  },
  "unified-dexpi-cyclonedx-standards": {
    title: "Unified DEXPI 2.0 & CycloneDX 1.6+ Semantic Bridge",
    relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-Unified-DEXPI-CycloneDX.md",
  },
  "supply-chain-eu-cra-standards": {
    title: "Supply Chain Transparency & EU CRA Regulatory Enforcement",
    relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-Supply-Chain-EU-CRA.md",
  },
  "iec62443-sfairp-secracs": {
    title: "IEC 62443 in Practice: SFAIR, SecRACS, and Security Level Targets",
    relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-IEC62443-SFAIRP-SecRACS.md",
  },
  "dexpi-open-standard-position-paper": {
    title: "Breaking the Proprietary CAD/BIM Monopoly: Why DEXPI 2.0 is the Open Foundation for Industrial Cyber-Physical Twins",
    relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-DEXPI-Open-Standard-Position-Paper.md",
  },
  "three-identity-join": {
    title: "The Three-Identity Join: DEXPI 2.0, CycloneDX 1.6, and IEC 61970 CIM",
    relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-Three-Identity-Join.md",
  },
  "cim-profile-cyber-physical": {
    title: "A CIM Profile for Cyber-Physical Assets",
    relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-CIM-Profile-Cyber-Physical.md",
  },
  "conformance-reference-implementation": {
    title: "Conformance Suite and Reference Implementation",
    relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-Conformance-Reference-Implementation.md",
  },
  "refbess-250mw-specification": {
    title: "RefBESS-250MW: A Synthetic Reference Battery Storage Architecture",
    relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-RefBESS-250MW-Specification.md",
  },
  "energy-refbess-250mw": {
    title: "Energy Case: The Three-Schema Join at RefBESS-250MW",
    relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-Energy-RefBESS-250MW.md",
  },
  "manufacturing-refpharma-api-1": {
    title: "Manufacturing Case: The CIM-Thin Test at RefPharma-API-1",
    relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-Manufacturing-RefPharma-API-1.md",
  },
  "rail-refdepot-emu-12": {
    title: "Rail Case: A Split Domain at RefDepot-EMU-12",
    relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-Rail-RefDepot-EMU-12.md",
  },
  "blast-radius-three-ontologies": {
    title: "Blast Radius Across Three Ontologies",
    relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-Blast-Radius-Three-Ontologies.md",
  },
  "fooled-by-best-practice": {
    title: "Fooled by Best Practice: The Epistemological Fraud of OT Cybersecurity",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-Article1-Fooled-by-Best-Practice.md",
  },
  "the-20-second-deficit": {
    title: "The 20 Second Deficit: Decision Latency Against a 45 Second Thermal Cliff",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-Article3-The-20-Second-Deficit.md",
  },
  "lacan-in-the-control-room": {
    title: "Lacan in the Control Room: Symbolic Severance and the Irruption of the Real",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-Article4-Lacan-in-the-Control-Room.md",
  },
  "the-barbell-defense": {
    title: "The Barbell Defense: Deterministic Physics Against Software Snake Oil",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-Article5-The-Barbell-Defense.md",
  },

  // Track 3: Actuarial Re-Invention & Underwriter Treatises
  "1-underwriter-overview": {
    title: "Treatise 01: Cyber Underwriting Overview & Physical Risk Integration",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-Overview.md",
  },
  "2-underwriter-cope-summary": {
    title: "Treatise 02: COPE Framework Summary for Industrial Assets",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-COPE_summary.md",
  },
  "3-underwriter-cope-detail": {
    title: "Treatise 03: Detailed Cyber COPE Analysis & Physical Loss Expectations",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-COPE_detail.md",
  },
  "4-underwriter-cyber-risk-underwriting": {
    title: "Treatise 04: Catastrophe-Grade Cyber-Physical Actuarial Engine",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-Cyber_Risk_Underwriting.md",
  },
  "101-underwriter-cyber-observations": {
    title: "Treatise 05: Empirical Cyber Insurance Market Observations",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-Cyber_Observations.md",
  },
  "102-cyber-method": {
    title: "Treatise 06: Non-Linear Cyber Risk Underwriting Methodology",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-Cyber_Method.md",
  },
  "102-oxot-underwriter-value-prop": {
    title: "Treatise 07: Underwriter Value Proposition & Dynamic Premium Adjustments",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-7-Industry-Value-Prop.md",
  },
  "104-competitive-analysis": {
    title: "Treatise 08: Actuarial Engine Ecosystem Competitive Analysis",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-Competitive_Analysis.md",
  },
  "oxot-cdt-underwriters-needed-improvements": {
    title: "Treatise 09: Reinsurance Layering & Lloyd's Y5381 War Exclusion Module",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-Req-Improvements.md",
  },
  "paradigm-suite": {
    title: "Treatise 10: The Paradigm Suite — Actuarial Portfolio Transformation",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-Paradigm-Library.md",
  },
  "lacanian-psychohistory-framework": {
    title: "Treatise 11: Lacanian Psychometric Tensor & Human Node Dissonance",
    relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Mckenney-Lacanian.md",
  },
  "autonomous-ot-trust-boundary": {
    title: "Autonomous OT & AI-Driven Facility Control: The Write-Access Trust Boundary",
    relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Autonomous-OT-Trust-Boundary.md",
  },
  "calculus-of-the-subject": {
    title: "The Calculus of the Subject: Topology, Infinitesimal Logic, and the Mirror Stage",
    relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Calculus-of-the-Subject.md",
  },
  "loman-operator-topology-of-an-act": {
    title: "The Loman Operator & Topology of an Act: Dynamic Phase Space Simulation of Psychodynamic Collapse",
    relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Loman-Operator-Topology-of-an-Act.md",
  },
  "morphogenesis-signifying-chain-ggnn": {
    title: "The Morphogenesis of the Signifying Chain: Computational Simulation via Gated Graph Neural Networks",
    relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Morphogenesis-Signifying-Chain-gGNN.md",
  },
  "musical-psychometric-notation": {
    title: "Musical Psychometric Notation (MPN): Formal Specification for Security State Sonification",
    relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Musical-Psychometric-Notation.md",
  },
  "cognitive-bias-catalog": {
    title: "Cognitive Bias Catalog: Exploiting Human Heuristics in Security Decisions",
    relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Cognitive-Bias-Catalog.md",
  },
  "kramers-escape-model": {
    title: "Treatise 12: Kramers Barrier Escape Model & Topological Transition Rates",
    relativePath: "references/MP-Math-Physics-Formula/MP_Kramers_Escape_Model.md",
  },
  "quantitative-cyber-physical-fmeca": {
    title: "Treatise 13: Quantitative Cyber-Physical FMECA: Failure Mode Analysis for Underwriting",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-Quantitative-Cyber-Physical-FMECA.md",
  },
  "ale-rosi-decision-framework": {
    title: "Treatise 14: Annualised Loss Expectancy & Return on Security Investment for OT",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-ALE-ROSI-Decision-Framework.md",
  },
  "rcil-scil-reinsurance": {
    title: "Treatise 15: Reliability & Safety Critical Items Lists (RCIL / SCIL) for Reinsurance",
    relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-RCIL-SCIL-Reinsurance.md",
  },

  // Track 4: TACAM Threat Matrix & CyHAZOP
  "tacam-deep-dive": {
    title: "TACAM Deep Dive: 7D Threat Actor Capability & Motivation Matrix",
    relativePath: "references/WG-07-TM-Threat-Modeling/WG-07-TM-TACAM.md",
  },
  "cyhazop-hyperscale-methodology": {
    title: "CyHAZOP: Cyber-Physical Hazard Analysis for Hyperscale Infrastructure",
    relativePath: "references/WG-07-TM-Threat-Modeling/WG-07-TM-CyHAZOP-Methodology.md",
  },
  "cyhazop-node-registers": {
    title: "CyHAZOP System Drill-Down: Node Registers for Power, Cooling, and Safety",
    relativePath: "references/WG-07-TM-Threat-Modeling/WG-07-TM-CyHAZOP-Node-Registers.md",
  },

  // Track 5: Threat Scoring
  "atq-deep-dive": {
    title: "Adversary Threat Quotient (ATQ): A Twelve-Factor Quantitative Threat Actor Scoring Model",
    relativePath: "references/WG-07-TM-Threat-Modeling/WG-07-TM-ATQ.md",
  },

  // Track 6: Monte Carlo Engine
  "monte-carlo-engine": {
    title: "Eigenia Monte Carlo Engine: Importance Sampling & Graph Random Walks",
    relativePath: "references/WG-08-MO-Monte-Carlo-Application/WG-08-MO-Monte Carlo Engine.md",
  },

  // Track 7: Cascading Failures
  "death-wobble-frequency-instability": {
    title: "The Grid's Precarious Pulse: Frequency Instability & Cascading Failure",
    relativePath: "references/WG-04-CF-Cascading-Failures/WG-04-CF-Death Wobble-The Grids Precarious Pulse Frequency Instability - jmckenney.md",
  },
  "cascading-failure-hypothesis": {
    title: "Cascading Failure Hypothesis: Non-Linear Energy Grid Instability",
    relativePath: "references/WG-04-CF-Cascading-Failures/WG-04-CF-Cascading Failure Hypothesis.md",
  },
  "emerging-power-topologies": {
    title: "Emerging Power Topologies: Cyber-Physical Resilience of BESS, SMRs, and Microgrids",
    relativePath: "references/WG-04-CF-Cascading-Failures/WG-04-CF-Emerging-Power-Topologies.md",
  },
  "grid-unseen-tremors": {
    title: "The Grid's Unseen Tremors: Frequency Stability, Cascading Risk, and the Imperative for Action",
    relativePath: "references/WG-04-CF-Cascading-Failures/WG-04-CF-Grid-Unseen-Tremors.md",
  },
  "unseen-current": {
    title: "The Unseen Current: Emerging Threats to Grid Stability in Renewable-Dominated Systems",
    relativePath: "references/WG-04-CF-Cascading-Failures/WG-04-CF-Unseen-Current.md",
  },
  "project-inertia": {
    title: "Project Inertia: Synchronous Inertia Decay and System Separation Risk",
    relativePath: "references/WG-04-CF-Cascading-Failures/WG-04-CF-Project-Inertia.md",
  },
  "ercot-wecc-ibr-reliability": {
    title: "ERCOT and WECC Renewable Integration: Inverter-Based Resource Reliability Under Stress",
    relativePath: "references/WG-04-CF-Cascading-Failures/WG-04-CF-ERCOT-WECC-IBR-Reliability.md",
  },
  "grid-incident-response-playbook": {
    title: "Grid Incident Response Playbook: Detection Signatures, Recovery and Coordination",
    relativePath: "references/WG-04-CF-Cascading-Failures/WG-04-CF-Grid-Incident-Response-Playbook.md",
  },

  // Additional Models
  "cdt-mathematical-models": {
    title: "Eigenia Digital Twin Complete Mathematical Ontology (40 Governing Equations)",
    relativePath: "references/MP-Math-Physics-Formula/MP_Mathematical_Models.md",
  },
  "graph-universe-visualizer": {
    title: "Graph Universe Visualizer & 3.2M Node Topology Traversal",
    relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-Applied-Physics.md",
  },
  "research-sourcing-governance": {
    title: "External Research Sourcing & Attribution Methodology",
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
    title: meta.title,
    filePath: resolvedPath,
    sourceChars: rawContent.length,
    content: rawContent,
    charCount: rawContent.length,
    lineCount: lines.length,
    wordCount: rawContent.split(/\s+/).filter(Boolean).length,
  };
}
