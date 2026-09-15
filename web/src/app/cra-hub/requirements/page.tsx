"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { 
  Scale, 
  ShieldCheck, 
  Clock, 
  Database, 
  FileText, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Cpu,
  Layers,
  FileCode,
  HardDrive,
  Globe
} from "lucide-react";

interface RequirementItem {
  id: string;
  article: string;
  title: string;
  scope: "Essential Security" | "Vulnerability Handling" | "Supply Chain & Governance" | "Incident Response";
  summary: string;
  technicalExpectations: string[];
  applicableStandards: string[];
  conformityEvidence: string;
}

const REQUIREMENTS_DATA: RequirementItem[] = [
  {
    id: "annex-1-part-1",
    article: "Annex I, Part I",
    title: "Essential Security Requirements (Design & Default)",
    scope: "Essential Security",
    summary: "Products with digital elements must be designed, developed, and produced in a manner that ensures an appropriate level of cybersecurity based on the risks.",
    technicalExpectations: [
      "Delivered without known commercially exploitable vulnerabilities",
      "Secure by default configuration, including automatic reset mechanisms",
      "Protection of data confidentiality and integrity via state-of-the-art cryptography",
      "Minimization of attack surface (disabling unused ports, JTAG/SWD debug locks)",
      "Protection against memory corruption vulnerabilities in C/C++ native code"
    ],
    applicableStandards: ["IEC 62443-4-2", "ETSI EN 303 645", "ISO/IEC 27002"],
    conformityEvidence: "Cryptographic architecture documentation, hardware lock schematics, static/dynamic code analysis reports."
  },
  {
    id: "annex-1-part-2",
    article: "Annex I, Part II",
    title: "Vulnerability Handling Requirements",
    scope: "Vulnerability Handling",
    summary: "Manufacturers must establish and enforce systematic vulnerability handling processes for the expected product lifetime (minimum 5 years).",
    technicalExpectations: [
      "Machine-readable Software Bill of Materials (SBOM) covering top-level and recursive dependencies",
      "Coordinated Vulnerability Disclosure (CVD) policy with public intake and RFC 9116 security.txt",
      "Timely distribution of security patches free of charge, separated from feature upgrades",
      "Automated regression testing and cryptographic signature validation for all update binaries"
    ],
    applicableStandards: ["ISO/IEC 29147 (Vulnerability disclosure)", "ISO/IEC 30111 (Vulnerability handling)", "CycloneDX v1.6"],
    conformityEvidence: "Automated SBOM generator logs, public CVD page, secure update server TLS/PKI certificates."
  },
  {
    id: "article-10",
    article: "Article 10",
    title: "Obligations of Manufacturers",
    scope: "Supply Chain & Governance",
    summary: "Primary statutory obligations governing manufacturers who place products with digital elements on the European Union market.",
    technicalExpectations: [
      "Carry out comprehensive cybersecurity risk assessment throughout product design",
      "Compile and maintain Annex VII Technical Documentation for at least 10 years",
      "Draft and sign the official European Union Declaration of Conformity (EU DoC)",
      "Affix the CE marking visibly and indelibly to the product packaging or documentation"
    ],
    applicableStandards: ["ISO/IEC 17050-1 (Declaration of conformity)", "EN ISO 13849 / IEC 62061 (Functional safety overlap)"],
    conformityEvidence: "Formally signed EU Declaration of Conformity, Annex VII technical file archive."
  },
  {
    id: "article-11",
    article: "Article 11",
    title: "Authorised Representatives (Non-EU Manufacturers)",
    scope: "Supply Chain & Governance",
    summary: "Mandatory legal appointment for manufacturers located outside the European Union placing products on the EU market.",
    technicalExpectations: [
      "Must designate by written mandate at least one authorised representative established within the European Union",
      "Authorised representative must hold the Annex VII technical file and EU Declaration of Conformity for 10 years",
      "Must provide market surveillance authorities with all technical documentation and test reports upon reasoned request",
      "Must cooperate with competent authorities on any corrective action taken to eliminate cybersecurity risks"
    ],
    applicableStandards: ["ISO/IEC 17050-1", "EU Blue Guide on Product Rules"],
    conformityEvidence: "Formally executed written mandate, registered EU legal entity address on packaging, technical file repository."
  },
  {
    id: "article-14",
    article: "Article 14",
    title: "Mandatory Reporting of Exploited Vulnerabilities",
    scope: "Incident Response",
    summary: "Statutory early warning and incident reporting requirements active as of September 11, 2026.",
    technicalExpectations: [
      "Submit 24-hour Early Warning to ENISA Single Reporting Platform upon detecting active exploitation",
      "Submit 72-hour detailed Vulnerability Notification with CVSS scores and indicators of compromise",
      "Submit Final Incident Report within 14 days of remediation patch availability",
      "Notify impacted users without undue delay if manual mitigation workarounds are required"
    ],
    applicableStandards: ["ENISA Single Reporting Platform API Specification", "CVSS v3.1 / v4.0", "CWE Taxonomy"],
    conformityEvidence: "ENISA SRP submission receipt, CSIRT communications log, customer advisory bulletins."
  },
  {
    id: "article-13",
    article: "Article 13",
    title: "Open Source Software Stewards",
    scope: "Supply Chain & Governance",
    summary: "Lightweight governance regime for legal entities that provide sustained support for open source software intended for commercial PDE.",
    technicalExpectations: [
      "Documented cybersecurity policy ensuring responsible handling of disclosed flaws",
      "Coordinated vulnerability reporting mechanisms with upstream maintainers",
      "Active cooperation with European national market surveillance authorities"
    ],
    applicableStandards: ["OpenChain ISO/IEC 5230", "OpenSSF Best Practices Badge"],
    conformityEvidence: "Public open-source security policy, GitHub SECURITY.md file, CVE coordination records."
  },
  {
    id: "annex-7",
    article: "Annex VII",
    title: "Technical Documentation Dossier (10-Year Archive)",
    scope: "Supply Chain & Governance",
    summary: "The definitive technical evidentiary dossier proving compliance, which must be retained for at least 10 years after product release.",
    technicalExpectations: [
      "General product description, block diagrams, and system operating manuals",
      "Cybersecurity risk assessment report identifying threat models and hazard mitigations",
      "Software Bill of Materials (SBOM) and complete list of third-party firmware components",
      "Test reports from internal laboratories or accredited third-party testing houses"
    ],
    applicableStandards: ["CEN/CENELEC Harmonised Standards", "IEC 62443-4-1"],
    conformityEvidence: "Cryptographically hashed archive bundle containing schematics, test telemetry, and source SBOMs."
  }
];

const REQUIREMENTS_MERMAID = `flowchart LR
    subgraph Governance [Article 10: Manufacturer Obligations]
        G1[Cybersecurity Risk Assessment]
        G2[10-Year Annex VII Technical File]
        G3[EU Declaration of Conformity]
        G4[CE Marking Placement]
    end

    subgraph SecurityDesign [Annex I Part I: Security by Design]
        S1[No Known Vulnerabilities]
        S2[Secure Default Configuration]
        S3[Encrypted Data & Transport]
        S4[Hardware Debug Lock SWD/JTAG]
    end

    subgraph VulnManagement [Annex I Part II: Vulnerability Handling]
        V1[CycloneDX / SPDX SBOM]
        V2[Coordinated Disclosure CVD]
        V3[Security Patch Delivery 5+ Yrs]
    end

    subgraph Article14 [Article 14: Incident Response]
        A1[24h Early Warning to ENISA]
        A2[72h Full Notification to CSIRT]
        A3[14-Day Post-Remedy Report]
    end

    G1 --> SecurityDesign
    SecurityDesign --> VulnManagement
    VulnManagement -->|Active Exploit Detected| Article14
    
    classDef main fill:#131519,stroke:#E05A10,color:#E8E3DA;
    classDef alert fill:#2d120a,stroke:#E05A10,color:#fff;
    class G1,G2,G3,G4,S1,S2,S3,S4,V1,V2,V3 main;
    class A1,A2,A3 alert;`;

export default function RequirementsExplorerPage() {
  const [activeScope, setActiveScope] = useState<string>("All");
  const [searchFilter, setSearchFilter] = useState<string>("");

  const filteredItems = REQUIREMENTS_DATA.filter((item) => {
    const matchesScope = activeScope === "All" || item.scope === activeScope;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.article.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesScope && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-canvas text-primary relative font-sans selection:bg-dutchOrange selection:text-white transition-colors duration-300">
      <SiteChrome>
        {/* Header Ribbon */}
        <section className="relative overflow-hidden border-b border-hairline bg-surface/50 pt-28 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "CRA Conformity Hub", href: "/cra-hub" },
                { label: "Statutory Requirements" }
              ]}
            />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dutchOrange/10 border border-dutchOrange/30 text-dutchOrange text-xs font-mono font-semibold">
                  <Scale className="w-4 h-4" />
                  <span>Pillar 2 // Statutory Requirements Architecture</span>
                </div>
                <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
                  CRA Statutory <span className="text-dutchOrange">Clause Explorer</span>
                </h1>
                <p className="text-base sm:text-lg text-secondary font-light leading-relaxed max-w-2xl">
                  Interactive clause-by-clause analysis of Regulation (EU) 2024/2847. 
                  Explore the essential cybersecurity requirements, vulnerability handling duties, and technical documentation mandates governing CE marking.
                </p>
              </div>

              {/* Quick Jump Ribbon */}
              <div className="p-4 rounded-2xl bg-canvas border border-hairline font-mono text-xs space-y-2 min-w-[280px]">
                <span className="text-muted text-[10px] uppercase block">Hub Navigation</span>
                <div className="space-y-1">
                  <Link href="/cra-hub" className="text-secondary hover:text-dutchOrange block">← Back to Hub Overview</Link>
                  <Link href="/cra-hub/timeline" className="text-secondary hover:text-dutchOrange block">→ Pillar 3: Enforcement Timeline</Link>
                  <Link href="/cra-hub/directory" className="text-secondary hover:text-dutchOrange block">→ Pillar 4: 18-Tool Directory</Link>
                  <Link href="/cra-hub/guides" className="text-secondary hover:text-dutchOrange block">→ Pillar 5: Deep Technical Guides</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Diagram Section */}
        <section className="py-12 bg-surface/30 border-b border-hairline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div>
              <span className="text-xs font-mono text-dutchOrange uppercase tracking-wider font-semibold">Regulatory Structure Diagram</span>
              <h2 className="text-2xl font-bold text-primary mt-1">
                Interconnection of Statutory Duties
              </h2>
              <p className="text-sm text-secondary mt-1">
                How design requirements feed vulnerability handling, technical files, and Article 14 reporting triggers.
              </p>
            </div>

            <MermaidDiagram chart={REQUIREMENTS_MERMAID} />
          </div>
        </section>

        {/* Filter and Clause Explorer */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-dutchOrange uppercase tracking-wider font-semibold">Statutory Articles</span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary mt-1">
                  Clause-by-Clause Technical Breakdown
                </h2>
                <p className="text-sm text-secondary mt-1">
                  Showing {filteredItems.length} statutory sections with technical expectations, evidence standards, and applicable norms.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  placeholder="Filter articles or keywords..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface border border-hairline text-xs font-mono focus:outline-none focus:border-dutchOrange transition-colors"
                />
              </div>
            </div>

            {/* Scope Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {["All", "Essential Security", "Vulnerability Handling", "Supply Chain & Governance", "Incident Response"].map((scope) => (
                <button
                  key={scope}
                  onClick={() => setActiveScope(scope)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    activeScope === scope
                      ? "bg-dutchOrange text-white font-bold"
                      : "bg-surface border border-hairline text-secondary hover:text-primary"
                  }`}
                >
                  {scope}
                </button>
              ))}
            </div>

            {/* Extraterritorial Exporter Callout Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#121417] via-[#1a1d24] to-[#121417] border border-white/10 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-dutchOrange/15 border border-dutchOrange/30 flex items-center justify-center text-dutchOrange shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white">Manufacturing Outside the EU? (US, UK, Japan, APAC)</span>
                    <span className="px-2 py-0.5 rounded bg-dutchOrange/20 text-dutchOrange text-[10px] font-mono font-semibold">Article 11 Mandate</span>
                  </div>
                  <p className="text-xs text-white/70 mt-0.5">
                    Foreign manufacturers must align domestic certifications (US CIRCIA, UK PSTI, Singapore CLS) with EU CRA obligations. Explore cross-border trade corridors across 249 jurisdictions.
                  </p>
                </div>
              </div>
              <Link
                href="/jurisdictions"
                className="px-4 py-2 rounded-xl bg-dutchOrange hover:bg-dutchOrange/90 text-white text-xs font-mono font-bold transition-all shrink-0 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-sm"
              >
                <span>Launch Jurisdiction Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Requirement Cards */}
            <div className="space-y-6">
              {filteredItems.map((item) => (
                <div 
                  key={item.id}
                  className="p-8 rounded-2xl bg-surface border border-hairline space-y-6 shadow-xs hover:border-dutchOrange/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-4">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-dutchOrange/10 border border-dutchOrange/30 text-dutchOrange font-mono text-xs font-bold">
                        {item.article}
                      </span>
                      <h3 className="text-xl font-bold text-primary">
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-muted uppercase">
                      {item.scope}
                    </span>
                  </div>

                  <p className="text-sm text-secondary leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2">
                      <span className="text-xs font-mono text-dutchOrange uppercase font-semibold block">
                        Mandatory Technical Expectations:
                      </span>
                      <ul className="space-y-1.5">
                        {item.technicalExpectations.map((exp, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-secondary">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <span className="text-xs font-mono text-dutchOrange uppercase font-semibold block">
                          Applicable Standards:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.applicableStandards.map((std, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-subtle text-primary border border-hairline text-[11px] font-mono">
                              {std}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-xs font-mono text-dutchOrange uppercase font-semibold block">
                          Required Conformity Evidence:
                        </span>
                        <p className="text-xs text-secondary leading-relaxed bg-subtle p-3 rounded-xl border border-hairline">
                          {item.conformityEvidence}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Backlinks & Navigation Footer */}
        <section className="py-12 bg-surface/20 border-t border-hairline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <Link href="/cra-hub" className="text-secondary hover:text-dutchOrange flex items-center gap-1">
              ← Return to Hub Overview
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/cra-hub/timeline" className="text-dutchOrange font-bold hover:underline">
                Explore Enforcement Timeline →
              </Link>
              <Link href="/cra-hub/directory" className="text-dutchOrange font-bold hover:underline">
                View 18-Tool Directory →
              </Link>
            </div>
          </div>
        </section>
      </SiteChrome>
    </main>
  );
}
