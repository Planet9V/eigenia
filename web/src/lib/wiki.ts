import fs from "fs";
import path from "path";

export interface WikiDocumentMeta {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  workingGroupId: string;
  workingGroupName: string;
  relativePath: string;
  author?: string;
  publicationDate?: string;
  badge?: string;
}

export interface WikiDocumentData extends WikiDocumentMeta {
  content: string;
  charCount: number;
  lineCount: number;
  wordCount: number;
  filePath: string;
}

export interface WorkingGroupCategory {
  id: string;
  title: string;
  number: string;
  badge: string;
  color: 'cyan' | 'emerald' | 'violet' | 'rose' | 'amber' | 'sky' | 'orange' | 'indigo';
  description: string;
  documents: WikiDocumentMeta[];
}

export const WORKING_GROUPS: WorkingGroupCategory[] = [
  {
    id: "WG-01-UI",
    title: "Actuarial & Underwriting",
    number: "WG-01",
    badge: "ACTUARIAL 01–09",
    color: "emerald",
    description: "Catastrophe-grade cyber-physical risk quantification, COPE framework adaptations, Lloyd's Y5381 war exclusions, and actuarial premium modeling for critical infrastructure.",
    documents: [
      {
        id: "WG-01-UI-1-Overview",
        slug: "1-underwriter-overview",
        title: "Treatise 01: Cyber Underwriting Overview & Physical Risk Integration",
        subtitle: "How the Actuarial and Insurance Sector Works",
        workingGroupId: "WG-01-UI",
        workingGroupName: "Actuarial & Underwriting",
        relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-Overview.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Overview",
      },
      {
        id: "WG-01-UI-1-COPE_summary",
        slug: "2-underwriter-cope-summary",
        title: "Treatise 02: COPE Framework Summary for Industrial Assets",
        subtitle: "Construction, Occupancy, Protection, Exposure",
        workingGroupId: "WG-01-UI",
        workingGroupName: "Actuarial & Underwriting",
        relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-COPE_summary.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "COPE Summary",
      },
      {
        id: "WG-01-UI-1-COPE_detail",
        slug: "3-underwriter-cope-detail",
        title: "Treatise 03: Detailed Cyber COPE Analysis & Physical Loss Expectations",
        subtitle: "Advanced Methodologies in Physical Risk Assessment",
        workingGroupId: "WG-01-UI",
        workingGroupName: "Actuarial & Underwriting",
        relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-COPE_detail.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "COPE Detail",
      },
      {
        id: "WG-01-UI-1-Cyber_Risk_Underwriting",
        slug: "4-underwriter-cyber-risk-underwriting",
        title: "Treatise 04: Catastrophe-Grade Cyber-Physical Actuarial Engine",
        subtitle: "Mathematical Models, Telemetry, and Premium Development",
        workingGroupId: "WG-01-UI",
        workingGroupName: "Actuarial & Underwriting",
        relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-Cyber_Risk_Underwriting.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Actuarial Engine",
      },
      {
        id: "WG-01-UI-Cyber_Observations",
        slug: "101-underwriter-cyber-observations",
        title: "Treatise 05: Empirical Cyber Insurance Market Observations",
        subtitle: "Eigenia's Approach is a Paradigm Shift in Cyber Insurance",
        workingGroupId: "WG-01-UI",
        workingGroupName: "Actuarial & Underwriting",
        relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-Cyber_Observations.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Market Intel",
      },
      {
        id: "WG-01-UI-1-Cyber_Method",
        slug: "102-cyber-method",
        title: "Treatise 06: Non-Linear Cyber Risk Underwriting Methodology",
        subtitle: "Redefining Critical Infrastructure Risk Transfer",
        workingGroupId: "WG-01-UI",
        workingGroupName: "Actuarial & Underwriting",
        relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-Cyber_Method.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Methodology",
      },
      {
        id: "WG-01-UI-1-7-Industry-Value-Prop",
        slug: "102-oxot-underwriter-value-prop",
        title: "Treatise 07: Underwriter Value Proposition & Dynamic Premiums",
        subtitle: "Predictive Intelligence and Behavioral Modeling in Insurance",
        workingGroupId: "WG-01-UI",
        workingGroupName: "Actuarial & Underwriting",
        relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-7-Industry-Value-Prop.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Value Prop",
      },
      {
        id: "WG-01-UI-1-Competitive_Analysis",
        slug: "104-competitive-analysis",
        title: "Treatise 08: Actuarial Engine Ecosystem Competitive Analysis",
        subtitle: "Insurance Underwriter Current State 2026",
        workingGroupId: "WG-01-UI",
        workingGroupName: "Actuarial & Underwriting",
        relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-Competitive_Analysis.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Competitive Intel",
      },
      {
        id: "WG-01-UI-1-Req-Improvements",
        slug: "oxot-cdt-underwriters-needed-improvements",
        title: "Treatise 09: Reinsurance Layering & Lloyd's Y5381 War Exclusion",
        subtitle: "Portfolio Module Gap and Systemic Risk Aggregation",
        workingGroupId: "WG-01-UI",
        workingGroupName: "Actuarial & Underwriting",
        relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-Req-Improvements.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Reinsurance",
      },
    ],
  },
  {
    id: "WG-02-DT",
    title: "Digital Twin & Taleb Series",
    number: "WG-02",
    badge: "DIGITAL TWIN 01–07",
    color: "violet",
    description: "Anti-fragile Cyber Digital Twin architecture, non-linear dynamics, Graph Neural Networks, psychometric tensors, and the Taleb probabilistic risk series.",
    documents: [
      {
        id: "WG-02-DT-1",
        slug: "taleb-fooled-by-randomness",
        title: "Paper I: Fooled by Randomness — Epistemology of Risk",
        subtitle: "Non-linear fat tails in operational technology networks",
        workingGroupId: "WG-02-DT",
        workingGroupName: "Digital Twin & Taleb Series",
        relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-1.md",
        badge: "Taleb I",
      },
      {
        id: "WG-02-DT-2",
        slug: "cdt-series-background",
        title: "Paper II: Background & Philosophical Foundations",
        subtitle: "Anti-fragile systems engineering in physical infrastructure",
        workingGroupId: "WG-02-DT",
        workingGroupName: "Digital Twin & Taleb Series",
        relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-2..md",
        badge: "Taleb II",
      },
      {
        id: "WG-02-DT-3",
        slug: "cdt-series-1",
        title: "Paper III: Cyber Digital Twin Architecture Brief",
        subtitle: "7-layer physical-to-financial computational ontology",
        workingGroupId: "WG-02-DT",
        workingGroupName: "Digital Twin & Taleb Series",
        relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-3..md",
        badge: "Taleb III",
      },
      {
        id: "WG-02-DT-4",
        slug: "cdt-series-2",
        title: "Paper IV: Taleb on Wall Street vs. Physical Realities",
        subtitle: "Why financial VAR models fail in physical infrastructure",
        workingGroupId: "WG-02-DT",
        workingGroupName: "Digital Twin & Taleb Series",
        relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-4..md",
        badge: "Taleb IV",
      },
      {
        id: "WG-02-DT-5",
        slug: "cdt-series-3",
        title: "Paper V: Graph Neural Networks & Psychometric Tensors",
        subtitle: "Technical deep dive into the 3.2M node knowledge graph",
        workingGroupId: "WG-02-DT",
        workingGroupName: "Digital Twin & Taleb Series",
        relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-5..md",
        badge: "Taleb V",
      },
      {
        id: "WG-02-DT-Applied-Physics",
        slug: "graph-universe-visualizer",
        title: "Graph Universe Visualizer & 3.2M Node Topology",
        subtitle: "3D exploration of the Seldon knowledge graph fabric",
        workingGroupId: "WG-02-DT",
        workingGroupName: "Digital Twin & Taleb Series",
        relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-Applied-Physics.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Topology",
      },
      {
        id: "WG-02-DT-Paradigm-Library",
        slug: "paradigm-suite",
        title: "Twin Engine: Paradigm Suite & Risk Metrics",
        subtitle: "Specialized module library for risk quantification",
        workingGroupId: "WG-02-DT",
        workingGroupName: "Digital Twin & Taleb Series",
        relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-Paradigm-Library.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Paradigm Suite",
      },
    ],
  },
  {
    id: "WG-03-ML",
    title: "Psychometrics & Behavioral Modeling",
    number: "WG-03",
    badge: "PSYCHOMETRICS 01",
    color: "rose",
    description: "Application of Lacanian psychoanalytic theory and cognitive dissonance tensors to the behavioral classification and predictive modeling of threat actors.",
    documents: [
      {
        id: "WG-03-ML-Mckenney-Lacanian",
        slug: "lacanian-psychohistory-framework",
        title: "Mckenney-Lacanian Psychohistory Framework",
        subtitle: "Behavioral classification and predictive threat modeling",
        workingGroupId: "WG-03-ML",
        workingGroupName: "Psychometrics & Behavioral Modeling",
        relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Mckenney-Lacanian.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Lacanian Framework",
      },
    ],
  },
  {
    id: "WG-04-CF",
    title: "Cascading Failures",
    number: "WG-04",
    badge: "CASCADING FAILURES 01–02",
    color: "amber",
    description: "Grid stability, frequency instability, BESS thermal runaway, death wobble analysis, and cyber-physical attack simulations on electricity transmission networks.",
    documents: [
      {
        id: "WG-04-CF-Cascading-Failure-Hypothesis",
        slug: "cascading-failure-hypothesis",
        title: "Cascading Failure Hypothesis: Non-Linear Energy Grid Instability",
        subtitle: "Cyber-Physical Attack Impact on NSW Electricity Network",
        workingGroupId: "WG-04-CF",
        workingGroupName: "Cascading Failures",
        relativePath: "references/WG-04-CF-Cascading-Failures/WG-04-CF-Cascading Failure Hypothesis.md",
        author: "J. McKenney",
        publicationDate: "March 12, 2026",
        badge: "Grid Impact",
      },
      {
        id: "WG-04-CF-Death-Wobble",
        slug: "death-wobble-frequency-instability",
        title: "The Grid's Precarious Pulse: Death Wobble & Frequency Instability",
        subtitle: "Frequency stability and cascading failure risk",
        workingGroupId: "WG-04-CF",
        workingGroupName: "Cascading Failures",
        relativePath: "references/WG-04-CF-Cascading-Failures/WG-04-CF-Death Wobble-The Grids Precarious Pulse Frequency Instability - jmckenney.md",
        author: "J. McKenney",
        publicationDate: "April 2024",
        badge: "Death Wobble",
      },
    ],
  },
  {
    id: "WG-05-CAD",
    title: "DEXPI 2.0 & CAD Interoperability",
    number: "WG-05",
    badge: "CAD STANDARDS 01",
    color: "sky",
    description: "Connecting plant P&ID design sheets directly to live physical assets using DEXPI 2.0 XML schemas and CycloneDX 1.6 4-BOM attestations.",
    documents: [
      {
        id: "WG-05-CAD-DEXPI-Introduction",
        slug: "dexpi-cyclonedx-standards",
        title: "DEXPI 2.0 P&ID Topology & CycloneDX 4-BOM",
        subtitle: "Hardware, Software, OT & Component Bill of Material Synergies",
        workingGroupId: "WG-05-CAD",
        workingGroupName: "DEXPI 2.0 & CAD Interoperability",
        relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-DEXPI-Introduction.md",
        badge: "DEXPI 2.0",
      },
    ],
  },
  {
    id: "WG-07-TM",
    title: "Threat Modeling & TACAM Matrix",
    number: "WG-07",
    badge: "THREAT MODELING 01–02",
    color: "orange",
    description: "Spectral decomposition of threat actor capability & motivation across 77,279 data points, paired with the 12-factor Adversary Threat Quotient (ATQ).",
    documents: [
      {
        id: "WG-07-TM-TACAM",
        slug: "tacam-deep-dive",
        title: "Eigenia Lab Deliverable: The TACAM Matrix",
        subtitle: "Fingerprinting Threat Actors Across 77,279 Data Points",
        workingGroupId: "WG-07-TM",
        workingGroupName: "Threat Modeling & TACAM Matrix",
        relativePath: "references/WG-07-TM-Threat-Modeling/WG-07-TM-TACAM.md",
        author: "Lab Sponsor Resident, j.mckenney",
        publicationDate: "April 28, 2025",
        badge: "TACAM Matrix",
      },
      {
        id: "WG-07-TM-ATQ",
        slug: "atq-deep-dive",
        title: "The Actor Threat Quotient (ATQ): 12-Factor Scoring Formula",
        subtitle: "Quantifying Threat Actor Capability and Motivation",
        workingGroupId: "WG-07-TM",
        workingGroupName: "Threat Modeling & TACAM Matrix",
        relativePath: "references/WG-07-TM-Threat-Modeling/WG-07-TM-ATQ.md",
        author: "Lab Sponsor Resident, j.mckenney",
        publicationDate: "April 28, 2025",
        badge: "ATQ Formula",
      },
    ],
  },
  {
    id: "WG-08-MO",
    title: "Monte Carlo Engine Application",
    number: "WG-08",
    badge: "MONTE CARLO 01",
    color: "indigo",
    description: "50,000-run importance sampling Monte Carlo simulation engine modeling non-linear failure cascades and Annualized Loss Expectancy (ALE).",
    documents: [
      {
        id: "WG-08-MO-Monte-Carlo-Engine",
        slug: "monte-carlo-engine",
        title: "Eigenia Monte Carlo Engine: Importance Sampling & Random Walks",
        subtitle: "Graph random walks and physical consequence modeling",
        workingGroupId: "WG-08-MO",
        workingGroupName: "Monte Carlo Engine Application",
        relativePath: "references/WG-08-MO-Monte-Carlo-Application/WG-08-MO-Monte Carlo Engine.md",
        badge: "Monte Carlo",
      },
    ],
  },
  {
    id: "MP-MATH",
    title: "Mathematical Physics Models",
    number: "MP-MATH",
    badge: "PHYSICS 01–02",
    color: "cyan",
    description: "Complete mathematical ontology of 40 governing equations and Kramers topological barrier escape model for Cyber Digital Twins.",
    documents: [
      {
        id: "MP_Mathematical_Models",
        slug: "cdt-mathematical-models",
        title: "Eigenia Mathematical Models — Complete Formula Reference",
        subtitle: "40 governing equations across the 7-layer ontology",
        workingGroupId: "MP-MATH",
        workingGroupName: "Mathematical Physics Models",
        relativePath: "references/MP-Math-Physics-Formula/MP_Mathematical_Models.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "40 Formulas",
      },
      {
        id: "MP_Kramers_Escape_Model",
        slug: "kramers-escape-model",
        title: "Kramers Escape Model: Topological Risk Theory",
        subtitle: "Physics-based transition state probability across potential barriers",
        workingGroupId: "MP-MATH",
        workingGroupName: "Mathematical Physics Models",
        relativePath: "references/MP-Math-Physics-Formula/MP_Kramers_Escape_Model.md",
        author: "H. Mckenney",
        badge: "Kramers Model",
      },
    ],
  },
];

export function getAllWorkingGroups(): WorkingGroupCategory[] {
  return WORKING_GROUPS;
}

export function getWorkingGroupById(id: string): WorkingGroupCategory | undefined {
  return WORKING_GROUPS.find((wg) => wg.id.toLowerCase() === id.toLowerCase());
}

export function getAllWikiDocuments(): WikiDocumentMeta[] {
  return WORKING_GROUPS.flatMap((wg) => wg.documents);
}

export function getWikiDocumentById(docId: string): WikiDocumentData | null {
  const docMeta = getAllWikiDocuments().find(
    (d) => d.id.toLowerCase() === docId.toLowerCase() || d.slug.toLowerCase() === docId.toLowerCase()
  );

  if (!docMeta) return null;

  const possiblePaths = [
    path.join(process.cwd(), docMeta.relativePath),
    path.join(process.cwd(), "..", docMeta.relativePath),
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
    console.error(`Wiki document file not found: ${docMeta.relativePath}`);
    return null;
  }

  const lines = rawContent.split(/\r?\n/);
  const words = rawContent.split(/\s+/).filter(Boolean);

  return {
    ...docMeta,
    content: rawContent,
    charCount: rawContent.length,
    lineCount: lines.length,
    wordCount: words.length,
    filePath: resolvedPath,
  };
}

export interface WikiSearchResult {
  doc: WikiDocumentMeta;
  snippet: string;
  matchScore: number;
}

export function searchWikiDocuments(query: string): WikiSearchResult[] {
  if (!query || !query.trim()) return [];

  const q = query.toLowerCase().trim();
  const results: WikiSearchResult[] = [];

  for (const wg of WORKING_GROUPS) {
    for (const docMeta of wg.documents) {
      const docData = getWikiDocumentById(docMeta.id);
      if (!docData) continue;

      let score = 0;
      let matchSnippet = "";

      if (docMeta.title.toLowerCase().includes(q)) score += 10;
      if (docMeta.subtitle?.toLowerCase().includes(q)) score += 5;
      if (docMeta.workingGroupName.toLowerCase().includes(q)) score += 3;

      const contentLower = docData.content.toLowerCase();
      const contentIndex = contentLower.indexOf(q);

      if (contentIndex !== -1) {
        score += 2;
        const start = Math.max(0, contentIndex - 40);
        const end = Math.min(docData.content.length, contentIndex + q.length + 60);
        matchSnippet = "..." + docData.content.slice(start, end).replace(/\n/g, " ") + "...";
      }

      if (score > 0) {
        results.push({
          doc: docMeta,
          snippet: matchSnippet || docMeta.subtitle || docMeta.title,
          matchScore: score,
        });
      }
    }
  }

  return results.sort((a, b) => b.matchScore - a.matchScore);
}
