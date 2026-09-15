"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { 
  Database, 
  ShieldCheck, 
  Clock, 
  Scale, 
  FileText, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Filter,
  Check,
  X
} from "lucide-react";

interface ToolItem {
  id: string;
  name: string;
  category: "Industrial OT & ICS" | "Embedded IoT & Hardware" | "Cloud & SaaS PDE" | "Open Source & Developer" | "Testing & Conformity Bodies";
  pricing: string;
  deployment: "SaaS" | "Cloud & On-Prem" | "Self-Hosted FOSS" | "Professional Service" | "Accredited CAB";
  summary: string;
  keyStrengths: string[];
  limitations: string[];
  url: string;
  craFit: string;
  moduleRoute: "Module A" | "Module B + C / H" | "All Routes";
}

const COMPLETE_18_TOOLS: ToolItem[] = [
  {
    id: "regulus-cyber",
    name: "Regulus Cyber",
    category: "Industrial OT & ICS",
    pricing: "€2,500 – €15,000 / year",
    deployment: "Cloud & On-Prem",
    summary: "Industrial OT and automotive compliance platform specializing in Annex VII technical file generation, hardware schematics, and hazard analysis.",
    keyStrengths: [
      "Hardware schematic and firmware component mapping",
      "Unified alignment with IEC 62443 and Machinery Regulation (EU) 2023/1230",
      "Automated Annex VII technical documentation compiler"
    ],
    limitations: ["Higher entry cost for early-stage software startups"],
    url: "https://reguluscyber.com",
    craFit: "Class II Industrial Automation, PLCs, and Automotive PDE",
    moduleRoute: "Module B + C / H"
  },
  {
    id: "sbomify",
    name: "Sbomify",
    category: "Cloud & SaaS PDE",
    pricing: "€499 – €1,200 / month",
    deployment: "SaaS",
    summary: "Continuous Software Bill of Materials (SBOM) lifecycle platform with native CycloneDX export and direct integration with the September 2026 ENISA Article 14 Single Reporting Platform schema.",
    keyStrengths: [
      "Direct API integration with ENISA Article 14 reporting",
      "Automated CycloneDX 4-BOM continuous generation",
      "CI/CD developer integrations (GitHub, GitLab)"
    ],
    limitations: ["Requires active cloud network connectivity"],
    url: "https://sbomify.com",
    craFit: "Cloud-connected PDE, SaaS microservices, and continuous software releases",
    moduleRoute: "Module A"
  },
  {
    id: "cra-portal",
    name: "CRA Portal",
    category: "Cloud & SaaS PDE",
    pricing: "€19 – €149 / month",
    deployment: "SaaS",
    summary: "Self-service CRA readiness platform designed for software startups and SMBs navigating Module A internal control.",
    keyStrengths: [
      "Accessible self-serve pricing for startups",
      "Clause-by-clause Annex I gap questionnaires",
      "Standard EU Declaration of Conformity generation"
    ],
    limitations: ["Lacks binary firmware disassembly and hardware lab testing"],
    url: "https://craportal.eu",
    craFit: "Default Products and lightweight software applications under Module A",
    moduleRoute: "Module A"
  },
  {
    id: "cvd-portal",
    name: "CVD Portal",
    category: "Cloud & SaaS PDE",
    pricing: "Free tier to €299 / month",
    deployment: "SaaS",
    summary: "Hosted Coordinated Vulnerability Disclosure (CVD) policy manager, security.txt generator, and encrypted vulnerability intake platform satisfying Article 10.",
    keyStrengths: [
      "Zero-setup security.txt RFC 9116 compliance",
      "Encrypted PGP researcher submission intake",
      "Audit-proof vulnerability timeline logging"
    ],
    limitations: ["Point solution focused solely on disclosure intake"],
    url: "https://cvdportal.eu",
    craFit: "All manufacturers requiring statutory Article 10 CVD portals",
    moduleRoute: "All Routes"
  },
  {
    id: "cra-check",
    name: "CRA Check",
    category: "Cloud & SaaS PDE",
    pricing: "€25 – €50 / month",
    deployment: "SaaS",
    summary: "Rapid online conformity scanner and readiness questionnaire for engineering teams planning compliance roadmaps.",
    keyStrengths: [
      "Fast technical gap analysis in under 30 minutes",
      "Plain-language engineering guidance without legal jargon",
      "Automated export of compliance checklists"
    ],
    limitations: ["Basic questionnaire model; does not scan code repositories directly"],
    url: "https://cracheck.eu",
    craFit: "Early-stage engineering teams evaluating product conformity scope",
    moduleRoute: "Module A"
  },
  {
    id: "venvera",
    name: "Venvera",
    category: "Embedded IoT & Hardware",
    pricing: "€399 – €899 / month",
    deployment: "SaaS",
    summary: "European product security workflow platform connecting engineering Jira backlogs with regulatory technical dossiers.",
    keyStrengths: [
      "Bridges engineering issue trackers with regulatory files",
      "Automated audit trails for security changes",
      "Customized templates for European market surveillance audits"
    ],
    limitations: ["Requires engineering process integration"],
    url: "https://venvera.io",
    craFit: "Mid-market hardware and connected device engineering teams",
    moduleRoute: "All Routes"
  },
  {
    id: "complaro",
    name: "Complaro / OCCTET",
    category: "Open Source & Developer",
    pricing: "Free Open Source",
    deployment: "Self-Hosted FOSS",
    summary: "Open-source, self-hosted conformity assessment engine built by the European open-source cybersecurity community.",
    keyStrengths: [
      "Zero software licensing cost",
      "Full data privacy with local on-premises execution",
      "Extensible Python/CLI codebase"
    ],
    limitations: ["Requires internal DevOps maintenance and self-hosting"],
    url: "https://github.com",
    craFit: "Developer-first organizations, open-source maintainers, and privacy-first teams",
    moduleRoute: "Module A"
  },
  {
    id: "finite-state",
    name: "Finite State",
    category: "Embedded IoT & Hardware",
    pricing: "Enterprise Quote",
    deployment: "Cloud & On-Prem",
    summary: "Comprehensive binary software supply chain security platform capable of decomposing compiled firmware images without source code.",
    keyStrengths: [
      "Deep binary firmware analysis and RTOS disassembly",
      "Reconstructs SBOMs directly from compiled binaries",
      "Identifies unpatched third-party CVEs in vendor libraries"
    ],
    limitations: ["Enterprise price tier designed for large product portfolios"],
    url: "https://finitestate.io",
    craFit: "Class I & II Embedded IoT, medical devices, and industrial controllers",
    moduleRoute: "Module B + C / H"
  },
  {
    id: "cybellum",
    name: "Cybellum",
    category: "Embedded IoT & Hardware",
    pricing: "Enterprise Quote",
    deployment: "Cloud & On-Prem",
    summary: "Product Security Platform generating Cyber Digital Twins of firmware binaries to track lifecycle vulnerabilities across hardware lines.",
    keyStrengths: [
      "Cyber Digital Twin architecture for every device build",
      "Continuous CVE monitoring throughout product lifetime",
      "Automotive (ISO/SAE 21434) and Medical (MDR) cross-mapping"
    ],
    limitations: ["Substantial onboarding time for complex hardware architectures"],
    url: "https://cybellum.com",
    craFit: "High-consequence embedded systems, medical equipment, and automotive electronics",
    moduleRoute: "Module B + C / H"
  },
  {
    id: "doyensec",
    name: "Doyensec CRA Practice",
    category: "Testing & Conformity Bodies",
    pricing: "€15,000 – €60,000 / audit",
    deployment: "Professional Service",
    summary: "High-end European offensive security engineering consultancy providing rigorous technical penetration testing and Notified Body preparation.",
    keyStrengths: [
      "Elite technical vulnerability discovery and hardware fuzzing",
      "Formal threat modeling aligned with Annex I essential requirements",
      "Recognized third-party audit reports for enterprise procurement"
    ],
    limitations: ["Manual engagement model with limited calendar availability"],
    url: "https://doyensec.com",
    craFit: "Class I & II critical products preparing for Module B third-party certification",
    moduleRoute: "Module B + C / H"
  },
  {
    id: "tuv-sud",
    name: "TÜV SÜD CRA Service",
    category: "Testing & Conformity Bodies",
    pricing: "€1,800 – €3,200 / day",
    deployment: "Accredited CAB",
    summary: "Accredited European testing and certification giant providing formal Notified Body inspection and EU-Type examination audits.",
    keyStrengths: [
      "Internationally recognized brand for CE certification",
      "Accredited testing laboratories across Germany and Europe",
      "Complete Module B, C, and H certification services"
    ],
    limitations: ["Severe waiting lists and high day-rate consulting fees"],
    url: "https://www.tuvsud.com",
    craFit: "Class I and Class II products requiring mandatory Notified Body certificates",
    moduleRoute: "Module B + C / H"
  },
  {
    id: "dekra",
    name: "DEKRA Testing Services",
    category: "Testing & Conformity Bodies",
    pricing: "Custom Enterprise Quote",
    deployment: "Accredited CAB",
    summary: "Global testing house with specialized laboratory facilities for radio equipment cybersecurity, ETSI EN 303 645, and CRA Annex I compliance.",
    keyStrengths: [
      "Physical radio frequency and hardware laboratory testing",
      "Radio Equipment Directive (RED) Delegated Regulation 2022/30 synergy",
      "Consumer and industrial IoT security benchmarking"
    ],
    limitations: ["Physical hardware sample shipping required"],
    url: "https://www.dekra.com",
    craFit: "Wireless IoT devices and radio-connected hardware PDE",
    moduleRoute: "Module B + C / H"
  },
  {
    id: "bsi-group",
    name: "BSI Group Europe",
    category: "Testing & Conformity Bodies",
    pricing: "Custom Enterprise Quote",
    deployment: "Accredited CAB",
    summary: "Leading European certification body specializing in full quality management system audits under Module H.",
    keyStrengths: [
      "Deep expertise in ISO/IEC 27001 and secure development governance",
      "Module H full quality assurance audits",
      "Pan-European regulatory standing"
    ],
    limitations: ["Heavy governance focus; requires high organizational maturity"],
    url: "https://www.bsigroup.com",
    craFit: "Enterprise manufacturers seeking Module H full quality assurance",
    moduleRoute: "Module B + C / H"
  },
  {
    id: "trellix",
    name: "Trellix Product Security",
    category: "Embedded IoT & Hardware",
    pricing: "Enterprise Quote",
    deployment: "Cloud & On-Prem",
    summary: "Device telemetry and runtime integrity platform providing continuous vulnerability ingestion for deployed hardware PDE.",
    keyStrengths: [
      "Runtime telemetry for field-deployed connected hardware",
      "Automated threat intelligence cross-referenced with CVE databases",
      "Large-scale enterprise fleet monitoring"
    ],
    limitations: ["High resource overhead for small microcontrollers"],
    url: "https://www.trellix.com",
    craFit: "Enterprise IoT fleets, smart grid infrastructure, and medical devices",
    moduleRoute: "All Routes"
  },
  {
    id: "jfrog-xray",
    name: "JFrog Xray / Curation",
    category: "Cloud & SaaS PDE",
    pricing: "Tiered Developer Plans",
    deployment: "SaaS",
    summary: "Enterprise artifact repository scanner tracking package dependencies and enforcing open-source license governance for software PDE.",
    keyStrengths: [
      "Native integration with Artifactory package workflows",
      "Automated SBOM generation for Maven, npm, PyPI, and Docker",
      "Blocks malicious open-source packages before build integration"
    ],
    limitations: ["Focused primarily on source packages rather than bare-metal firmware"],
    url: "https://jfrog.com",
    craFit: "DevOps pipelines, microservice PDE, and containerized software products",
    moduleRoute: "Module A"
  },
  {
    id: "snyk",
    name: "Snyk for PDE",
    category: "Cloud & SaaS PDE",
    pricing: "Free to Enterprise",
    deployment: "SaaS",
    summary: "Developer security platform scanning code repositories, open-source dependencies, and container images with automated patch pull requests.",
    keyStrengths: [
      "Developer-friendly workflow with automatic fix PRs",
      "Wide language coverage across modern software stacks",
      "Free tier for open-source and early-stage development"
    ],
    limitations: ["Limited visibility into proprietary compiled binary firmware"],
    url: "https://snyk.io",
    craFit: "Cloud software PDE, mobile application clients, and web services",
    moduleRoute: "Module A"
  },
  {
    id: "anchore",
    name: "Anchore Enterprise",
    category: "Cloud & SaaS PDE",
    pricing: "Enterprise Quote",
    deployment: "Cloud & On-Prem",
    summary: "Container security and SBOM management platform with strict policy enforcement engines designed for complex software supply chains.",
    keyStrengths: [
      "Deep container image inspection and Syft SBOM generation",
      "Cryptographic attestation and policy gate enforcement",
      "On-premises air-gapped deployment capability"
    ],
    limitations: ["Specialized for containerized workloads"],
    url: "https://anchore.com",
    craFit: "Enterprise containerized PDE and Kubernetes-native applications",
    moduleRoute: "Module A"
  },
  {
    id: "black-duck",
    name: "Black Duck by Synopsys",
    category: "Industrial OT & ICS",
    pricing: "Enterprise Quote",
    deployment: "Cloud & On-Prem",
    summary: "Industry standard software composition analysis platform providing deep source code and binary audits with legal compliance tracking.",
    keyStrengths: [
      "Unrivaled open-source license and vulnerability knowledge base",
      "Binary software composition analysis",
      "Trusted by legal and regulatory auditors worldwide"
    ],
    limitations: ["High licensing cost and dedicated administrator required"],
    url: "https://www.synopsys.com",
    craFit: "Large enterprise manufacturers, automotive suppliers, and industrial OEMs",
    moduleRoute: "All Routes"
  }
];

const DIRECTORY_QUADRANT_CHART = `flowchart TD
    subgraph EnterpriseScanners [Enterprise Scanners & Heavyweight OT]
        E1[Regulus Cyber<br/>€2.5k-€15k/yr]
        E2[Finite State<br/>Binary Scans]
        E3[Cybellum<br/>Digital Twins]
        E4[Black Duck<br/>Source & Binary]
    end

    subgraph MidMarketPlatforms [Mid-Market & Continuous Compliance]
        M1[Sbomify<br/>€499-€1.2k/mo]
        M2[Venvera<br/>€399-€899/mo]
        M3[Anchore<br/>Container Policies]
        M4[JFrog Xray<br/>Package Curation]
    end

    subgraph SelfServeSMB [Self-Serve SMB & Point Solutions]
        S1[CRA Portal<br/>€19-€149/mo]
        S2[CRA Check<br/>€25-€50/mo]
        S3[CVD Portal<br/>€0-€299/mo]
        S4[Complaro / OCCTET<br/>Free FOSS]
    end

    subgraph TestingLaboratories [Testing Laboratories & Notified Bodies]
        T1[Doyensec<br/>CRA Pen-Tests]
        T2[TÜV SÜD<br/>CAB Audits]
        T3[DEKRA<br/>Lab Radio Tests]
        T4[BSI Group<br/>Module H Audits]
    end

    SelfServeSMB -->|Scaling Up| MidMarketPlatforms
    MidMarketPlatforms -->|Hardware/OT Depth| EnterpriseScanners
    EnterpriseScanners -->|Class I/II Audits| TestingLaboratories
    
    classDef eBox fill:#131519,stroke:#E05A10,color:#E8E3DA;
    classDef mBox fill:#1a1d24,stroke:#71717A,color:#E8E3DA;
    class E1,E2,E3,E4,M1,M2,M3,M4,S1,S2,S3,S4,T1,T2,T3,T4 eBox;`;

export default function DirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedRoute, setSelectedRoute] = useState<string>("All");
  const [query, setQuery] = useState<string>("");

  const filtered = COMPLETE_18_TOOLS.filter((t) => {
    const matchCat = selectedCategory === "All" || t.category === selectedCategory;
    const matchRoute = selectedRoute === "All" || t.moduleRoute === selectedRoute || t.moduleRoute === "All Routes";
    const matchQ = 
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.summary.toLowerCase().includes(query.toLowerCase()) ||
      t.craFit.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchRoute && matchQ;
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
                { label: "18-Tool Directory" }
              ]}
            />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dutchOrange/10 border border-dutchOrange/30 text-dutchOrange text-xs font-mono font-semibold">
                  <Database className="w-4 h-4" />
                  <span>Pillar 4 // Vendor-Agnostic Tools Directory</span>
                </div>
                <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
                  18 Evaluated <span className="text-dutchOrange">CRA Platforms & Services</span>
                </h1>
                <p className="text-base sm:text-lg text-secondary font-light leading-relaxed max-w-2xl">
                  Comprehensive benchmark of 18 commercial platforms, open-source scanners, and testing laboratories supporting EU Cyber Resilience Act conformity. 
                  Zero referral links or sponsored rankings.
                </p>
              </div>

              {/* Quick Jump Ribbon */}
              <div className="p-4 rounded-2xl bg-canvas border border-hairline font-mono text-xs space-y-2 min-w-[280px]">
                <span className="text-muted text-[10px] uppercase block">Hub Navigation</span>
                <div className="space-y-1">
                  <Link href="/cra-hub" className="text-secondary hover:text-dutchOrange block">← Back to Hub Overview</Link>
                  <Link href="/cra-hub/requirements" className="text-secondary hover:text-dutchOrange block">→ Pillar 2: Statutory Requirements</Link>
                  <Link href="/cra-hub/timeline" className="text-secondary hover:text-dutchOrange block">→ Pillar 3: Enforcement Timeline</Link>
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
              <span className="text-xs font-mono text-dutchOrange uppercase tracking-wider font-semibold">Landscape Architecture Map</span>
              <h2 className="text-2xl font-bold text-primary mt-1">
                Market Structure: Cost vs. Technical Depth
              </h2>
              <p className="text-sm text-secondary mt-1">
                Categorization of evaluated tools across four distinct operational clusters.
              </p>
            </div>

            <MermaidDiagram chart={DIRECTORY_QUADRANT_CHART} />
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-dutchOrange uppercase tracking-wider font-semibold">Filter Directory</span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary mt-1">
                  Showing {filtered.length} of 18 Platforms
                </h2>
                <p className="text-sm text-secondary mt-1">
                  Filter by architectural category or statutory conformity route.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  placeholder="Search tool, feature, or pricing..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface border border-hairline text-xs font-mono focus:outline-none focus:border-dutchOrange transition-colors"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-muted uppercase mr-2">Category:</span>
                {["All", "Industrial OT & ICS", "Embedded IoT & Hardware", "Cloud & SaaS PDE", "Open Source & Developer", "Testing & Conformity Bodies"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      selectedCategory === c
                        ? "bg-dutchOrange text-white font-bold"
                        : "bg-surface border border-hairline text-secondary hover:text-primary"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-muted uppercase mr-2">Conformity Route:</span>
                {["All", "Module A", "Module B + C / H"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRoute(r)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      selectedRoute === r
                        ? "bg-dutchOrange text-white font-bold"
                        : "bg-surface border border-hairline text-secondary hover:text-primary"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* 18-Tool Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((tool) => (
                <div
                  key={tool.id}
                  className="p-6 rounded-2xl bg-surface border border-hairline flex flex-col justify-between hover:border-dutchOrange/50 transition-all duration-200 group shadow-xs hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-dutchOrange font-semibold uppercase tracking-wider block">
                          {tool.category}
                        </span>
                        <h3 className="text-lg font-bold text-primary group-hover:text-dutchOrange transition-colors">
                          {tool.name}
                        </h3>
                      </div>
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-subtle text-muted hover:text-primary transition-colors"
                        aria-label={`Open website for ${tool.name}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-subtle text-primary border border-hairline">
                        {tool.deployment}
                      </span>
                      <span className="text-dutchOrange font-semibold">
                        {tool.pricing}
                      </span>
                    </div>

                    <p className="text-xs text-secondary leading-relaxed">
                      {tool.summary}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-hairline">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-muted">Target Route:</span>
                        <span className="font-bold text-primary">{tool.moduleRoute}</span>
                      </div>
                      <div className="text-xs font-medium text-primary">
                        {tool.craFit}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-muted uppercase block">Key Strengths:</span>
                      {tool.keyStrengths.map((s, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] text-secondary">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-mono text-muted uppercase block">Trade-Offs & Limits:</span>
                      {tool.limitations.map((l, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] text-muted">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span>{l}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-6 border-t border-hairline flex items-center justify-between text-xs font-mono">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dutchOrange font-bold inline-flex items-center gap-1 hover:underline"
                    >
                      <span>Vendor Website</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-[10px] text-muted">Verified Telemetry</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Backlinks & Navigation Footer */}
        <section className="py-12 bg-surface/20 border-t border-hairline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <Link href="/cra-hub/timeline" className="text-secondary hover:text-dutchOrange flex items-center gap-1">
              ← Pillar 3: Enforcement Timeline
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/cra-hub/requirements" className="text-dutchOrange font-bold hover:underline">
                Explore Statutory Requirements →
              </Link>
              <Link href="/cra-hub/guides/tools-comparison" className="text-dutchOrange font-bold hover:underline">
                Read In-Depth Comparison Guide →
              </Link>
            </div>
          </div>
        </section>
      </SiteChrome>
    </main>
  );
}
