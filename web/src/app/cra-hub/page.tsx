"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { 
  ShieldCheck, 
  Clock, 
  Search, 
  ExternalLink, 
  AlertTriangle, 
  Cpu, 
  FileText, 
  Server, 
  Layers, 
  CheckCircle2, 
  HelpCircle,
  Filter,
  ArrowRight,
  Database,
  Building,
  Terminal,
  Scale,
  TrendingUp,
  BarChart3,
  Network,
  Globe,
  Compass
} from "lucide-react";
import { PillarCardsNav } from "@/components/cra/PillarCardsNav";
import { StatutoryTimelineSection } from "@/components/cra/StatutoryTimelineSection";

interface ToolItem {
  name: string;
  category: "Industrial OT & ICS" | "Embedded IoT & Hardware" | "Cloud & SaaS PDE" | "Open Source & Developer" | "Consulting & Testing";
  pricing: string;
  deployment: string;
  summary: string;
  keyStrengths: string[];
  limitations: string[];
  url: string;
  craFit: string;
}

const TOOLS_DATABASE: ToolItem[] = [
  {
    name: "Regulus Cyber",
    category: "Industrial OT & ICS",
    pricing: "€2,500 – €15,000 / year",
    deployment: "Cloud & On-Premises",
    summary: "Industrial OT and automotive compliance platform specializing in Annex VII technical file generation, hardware schematics, and hazard analysis.",
    keyStrengths: [
      "Hardware schematic and firmware component mapping",
      "Unified alignment with IEC 62443 and Machinery Regulation (EU) 2023/1230",
      "Automated Annex VII technical documentation compiler"
    ],
    limitations: ["Higher entry cost for early-stage software startups"],
    url: "https://reguluscyber.com",
    craFit: "Class II Industrial Automation, PLCs, and Automotive PDE"
  },
  {
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
    craFit: "Cloud-connected PDE, SaaS microservices, and continuous software releases"
  },
  {
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
    craFit: "Default Products and lightweight software applications under Module A"
  },
  {
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
    craFit: "All manufacturers requiring statutory Article 10 CVD portals"
  },
  {
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
    craFit: "Early-stage engineering teams evaluating product conformity scope"
  },
  {
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
    craFit: "Mid-market hardware and connected device engineering teams"
  },
  {
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
    craFit: "Developer-first organizations, open-source maintainers, and privacy-first teams"
  },
  {
    name: "Finite State",
    category: "Embedded IoT & Hardware",
    pricing: "Enterprise Quote",
    deployment: "Cloud & Enterprise",
    summary: "Comprehensive binary software supply chain security platform capable of decomposing compiled firmware images without source code.",
    keyStrengths: [
      "Deep binary firmware analysis and RTOS disassembly",
      "Reconstructs SBOMs directly from compiled binaries",
      "Identifies unpatched third-party CVEs in vendor libraries"
    ],
    limitations: ["Enterprise price tier designed for large product portfolios"],
    url: "https://finitestate.io",
    craFit: "Class I & II Embedded IoT, medical devices, and industrial controllers"
  },
  {
    name: "Cybellum",
    category: "Embedded IoT & Hardware",
    pricing: "Enterprise Quote",
    deployment: "Cloud & On-Premises",
    summary: "Product Security Platform generating Cyber Digital Twins of firmware binaries to track lifecycle vulnerabilities across hardware lines.",
    keyStrengths: [
      "Cyber Digital Twin architecture for every device build",
      "Continuous CVE monitoring throughout product lifetime",
      "Automotive (ISO/SAE 21434) and Medical (MDR) cross-mapping"
    ],
    limitations: ["Substantial onboarding time for complex hardware architectures"],
    url: "https://cybellum.com",
    craFit: "High-consequence embedded systems, medical equipment, and automotive electronics"
  },
  {
    name: "Doyensec CRA Practice",
    category: "Consulting & Testing",
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
    craFit: "Class I & II critical products preparing for Module B third-party certification"
  }
];

const STATUTORY_FLOW_CHART = `flowchart TD
    Start[Product with Digital Elements Placed on EU Market] --> ScopeCheck{Annex III or IV Product?}
    
    ScopeCheck -->|No: Standard PDE ~90%| ModA[Module A: Internal Production Control]
    ModA --> ModASteps[1. Fulfill Annex I Security Reqs<br/>2. Compile 10-Yr Annex VII Technical File<br/>3. Continuous SBOM & Article 14 Reporting<br/>4. Sign EU DoC & Affix CE Mark]
    
    ScopeCheck -->|Annex III: Important Class I| ClassICheck{Harmonised Standards Exist?}
    ClassICheck -->|Yes: Full Standard Conformance| ModA
    ClassICheck -->|No or Partial Standard| ThirdPartyCheck[Third-Party Notified Body Audit Required]
    
    ScopeCheck -->|Annex IV: Important Class II| ThirdPartyCheck
    ThirdPartyCheck --> CABAudit[Module B + C: EU-Type Examination<br/>OR Module H: Full Quality Assurance]
    CABAudit --> CEPass[Issue EU-Type Certificate -> CE Mark]
    
    ModASteps --> MarketLive[Legal EU Single Market Access]
    CEPass --> MarketLive
    
    classDef highlight fill:#E05A10,stroke:#E05A10,color:#fff;
    classDef box fill:#131519,stroke:#22252C,color:#E8E3DA;
    class Start,ThirdPartyCheck highlight;
    class ModA,ModASteps,CABAudit,CEPass,MarketLive box;`;

const ENISA_INCIDENT_CHART = `sequenceDiagram
    autonumber
    participant M as Manufacturer Incident Team
    participant SRP as ENISA Single Reporting Platform
    participant CSIRT as National CSIRT (MS of Origin)
    participant AllCSIRTs as Affected Member State CSIRTs
    participant Users as Product Users / Customers

    Note over M: Detection of Actively Exploited Vulnerability
    M->>SRP: 24h Early Warning Notification (Art. 14.2)
    SRP-->>CSIRT: Encrypted Routing to National CSIRT
    SRP-->>AllCSIRTs: Encrypted Broadcast to Affected MS CSIRTs
    
    Note over M: Forensic Root Cause Analysis & Mitigation authoring
    M->>SRP: 72h Detailed Vulnerability Notification (Art. 14.3)
    opt User Mitigation Required
        M->>Users: Immediate User Workaround Advisory (Art. 14.5)
    end
    
    Note over M: Security Patch Compiled and Tested
    M->>Users: Distribute Security Patch / Firmware Update
    M->>SRP: Final Incident & Corrective Action Report (within 14 days)`;

export default function CraConformityHubPage() {
  const [activeSegment, setActiveSegment] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activePersona, setActivePersona] = useState<"engineering" | "regulatory">("engineering");

  const filteredTools = TOOLS_DATABASE.filter((tool) => {
    const matchesSegment = activeSegment === "All" || tool.category === activeSegment;
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.craFit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSegment && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-canvas text-primary relative font-sans selection:bg-dutchOrange selection:text-white transition-colors duration-300">
      <SiteChrome>
        {/* Hub Header & Navigation Ribbon */}
        <section className="relative overflow-hidden border-b border-hairline bg-surface/50 pt-28 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "CRA Conformity Hub" }
              ]}
            />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dutchOrange/10 border border-dutchOrange/30 text-dutchOrange text-xs font-mono font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Eigenia Labs Public Scientific Resource // Vendor-Agnostic</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
                  EU Cyber Resilience Act <span className="text-dutchOrange">Conformity Hub</span>
                </h1>
                <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
                  An independent knowledge and tooling engine for Regulation (EU) 2024/2847. 
                  Evaluating 18+ commercial and open-source platforms, statutory timelines, technical requirements, and econometric research without vendor commercial bias.
                </p>
              </div>

              {/* Scientific Engine Profile Card */}
              <div className="p-5 rounded-2xl bg-canvas border border-hairline shadow-sm space-y-3 min-w-[300px]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted uppercase tracking-wider">Engine Profile</span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-hairline">
                    <span className="text-muted">Target Statute:</span>
                    <span className="font-bold text-primary">Reg (EU) 2024/2847</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-hairline">
                    <span className="text-muted">Scope of Law:</span>
                    <span className="font-bold text-primary">All Hardware & Software PDE</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-muted">Evaluations:</span>
                    <span className="font-bold text-dutchOrange">18 Tools • 5 Segments</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Pillar Direct Navigation Cards */}
            <PillarCardsNav activePillarId={1} />
          </div>
        </section>

        {/* Dual-Column Interactive Statutory Timeline & Compact 3D Extraterritorial Globe Section */}
        <StatutoryTimelineSection />

        {/* Empirical Research & Econometric Telemetry Bar */}
        <section className="py-8 bg-canvas border-b border-hairline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
              <div className="p-4 rounded-xl bg-surface border border-hairline">
                <div className="flex items-center gap-1.5 text-xs text-muted mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-dutchOrange" />
                  <span>EU Tooling TAM</span>
                </div>
                <div className="text-xl font-bold text-primary">€1.397 Billion</div>
                <span className="text-[10px] text-muted block mt-0.5">Bottom-up verified</span>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-hairline">
                <div className="flex items-center gap-1.5 text-xs text-muted mb-1">
                  <Building className="w-3.5 h-3.5 text-dutchOrange" />
                  <span>Impacted Entities</span>
                </div>
                <div className="text-xl font-bold text-primary">446,500</div>
                <span className="text-[10px] text-muted block mt-0.5">Hardware & software OEMs</span>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-hairline">
                <div className="flex items-center gap-1.5 text-xs text-muted mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span>NANDO Notified Bodies</span>
                </div>
                <div className="text-xl font-bold text-amber-500">0 Designated</div>
                <span className="text-[10px] text-muted block mt-0.5">Severe audit bottleneck</span>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-hairline">
                <div className="flex items-center gap-1.5 text-xs text-muted mb-1">
                  <Clock className="w-3.5 h-3.5 text-red-500" />
                  <span>Article 14 Gate</span>
                </div>
                <div className="text-xl font-bold text-red-500">24 Hours</div>
                <span className="text-[10px] text-muted block mt-0.5">ENISA mandatory notice</span>
              </div>
            </div>
          </div>
        </section>

        {/* Live Diagram Section 1: Conformity Assessment Flowchart */}
        <section className="py-12 bg-surface/30 border-b border-hairline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-dutchOrange uppercase tracking-wider font-semibold">Interactive Statutory Architecture</span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-primary mt-1">
                  Statutory Conformity Assessment Flowchart
                </h2>
                <p className="text-sm text-secondary mt-1">
                  How products navigate from initial classification under Annex III/IV to CE marking routes under Regulation (EU) 2024/2847.
                </p>
              </div>
              <Link 
                href="/cra-hub/requirements" 
                className="text-xs font-mono text-dutchOrange font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>Full Clause-by-Clause Explorer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <MermaidDiagram chart={STATUTORY_FLOW_CHART} />
          </div>
        </section>

        {/* Live Diagram Section 2: Article 14 Sequence Diagram */}
        <section className="py-12 bg-canvas border-b border-hairline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-red-500 uppercase tracking-wider font-semibold">Active Law Protocol</span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-primary mt-1">
                  Article 14: 24h Early Warning & CSIRT Notification Sequence
                </h2>
                <p className="text-sm text-secondary mt-1">
                  End-to-end statutory interaction between manufacturers, the ENISA Single Reporting Platform, national CSIRTs, and end customers.
                </p>
              </div>
              <Link 
                href="/cra-hub/guides/article-14-playbook" 
                className="text-xs font-mono text-dutchOrange font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>Read 24h Early Warning Playbook</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <MermaidDiagram chart={ENISA_INCIDENT_CHART} />
          </div>
        </section>



        {/* Directory Preview Section */}
        <section className="py-16 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-dutchOrange uppercase tracking-wider font-semibold">Pillar 4 Preview</span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-primary mt-1">
                  18 Evaluated CRA Compliance Tools & Services
                </h2>
                <p className="text-sm text-secondary mt-1">
                  Empirical pricing, technical architecture, and statutory capabilities across 5 distinct market segments.
                </p>
              </div>

              <Link 
                href="/cra-hub/directory" 
                className="px-4 py-2 rounded-xl bg-dutchOrange text-white font-mono text-xs font-bold inline-flex items-center gap-1.5 shadow-md hover:opacity-90 transition-opacity"
              >
                <span>Open Full 18-Tool Directory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Quick Segment Filter */}
            <div className="flex flex-wrap gap-2">
              {["All", "Industrial OT & ICS", "Embedded IoT & Hardware", "Cloud & SaaS PDE", "Open Source & Developer", "Consulting & Testing"].map((seg) => (
                <button
                  key={seg}
                  onClick={() => setActiveSegment(seg)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    activeSegment === seg
                      ? "bg-dutchOrange text-white font-bold"
                      : "bg-canvas border border-hairline text-secondary hover:text-primary"
                  }`}
                >
                  {seg}
                </button>
              ))}
            </div>

            {/* Tool Cards Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.slice(0, 6).map((tool) => (
                <div
                  key={tool.name}
                  className="p-6 rounded-2xl bg-canvas border border-hairline flex flex-col justify-between hover:border-dutchOrange/50 transition-all duration-200 group shadow-sm hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-dutchOrange font-semibold uppercase tracking-wider block">
                          {tool.category}
                        </span>
                        <h3 className="text-base font-bold text-primary group-hover:text-dutchOrange transition-colors">
                          {tool.name}
                        </h3>
                      </div>
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-subtle text-muted hover:text-primary transition-colors"
                        aria-label={`Visit ${tool.name}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-subtle text-primary border border-hairline">
                        {tool.deployment}
                      </span>
                      <span className="text-muted">|</span>
                      <span className="text-dutchOrange font-medium">
                        {tool.pricing}
                      </span>
                    </div>

                    <p className="text-xs text-secondary leading-relaxed">
                      {tool.summary}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-hairline">
                      <span className="text-[10px] font-mono text-muted uppercase block">Statutory Fit:</span>
                      <span className="text-xs font-medium text-primary block">
                        {tool.craFit}
                      </span>
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
                    <span className="text-[10px] text-muted">Verified 2026</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <Link 
                href="/cra-hub/directory" 
                className="text-xs font-mono text-dutchOrange font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>View all 18 evaluated platforms, pricing matrices, and architecture comparisons →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Pillar 5 Guides Showcase */}
        <section className="py-16 bg-canvas border-t border-hairline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-dutchOrange uppercase tracking-wider font-semibold">Pillar 5 Technical Playbooks</span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-primary mt-1">
                  Peer-Reviewed Conformity Guides
                </h2>
                <p className="text-sm text-secondary mt-1">
                  In-depth engineering analyses equipped with Truth Boxes, comparative data, and regulatory citations.
                </p>
              </div>
              <Link 
                href="/cra-hub/guides" 
                className="text-xs font-mono text-dutchOrange font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>View All Guides Index →</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                href="/cra-hub/guides/tools-comparison"
                className="p-6 rounded-2xl bg-surface border border-hairline flex flex-col justify-between space-y-4 hover:border-dutchOrange/50 transition-colors group"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-dutchOrange uppercase">Tools Benchmark</span>
                  <h3 className="text-base font-bold text-primary group-hover:text-dutchOrange transition-colors">
                    The Complete Guide to EU CRA Compliance Tools (2026 Comparison)
                  </h3>
                  <p className="text-xs text-secondary leading-relaxed">
                    18-platform comparison across verified pricing tiers, CycloneDX SBOM depth, and Module A vs B/C/H conformity assessment fit.
                  </p>
                </div>
                <div className="pt-4 border-t border-hairline text-xs font-mono text-dutchOrange font-semibold flex items-center gap-1">
                  <span>Read Full Comparison</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              <Link 
                href="/cra-hub/guides/industrial-ot"
                className="p-6 rounded-2xl bg-surface border border-hairline flex flex-col justify-between space-y-4 hover:border-dutchOrange/50 transition-colors group"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-dutchOrange uppercase">Industrial OT</span>
                  <h3 className="text-base font-bold text-primary group-hover:text-dutchOrange transition-colors">
                    Industrial OT Under CRA: Harmonizing IEC 62443 and Machinery Regulation
                  </h3>
                  <p className="text-xs text-secondary leading-relaxed">
                    Navigating the January 20, 2027 Machinery Regulation enforcement date, binary RTOS analysis, and Class II Notified Body audit routes.
                  </p>
                </div>
                <div className="pt-4 border-t border-hairline text-xs font-mono text-dutchOrange font-semibold flex items-center gap-1">
                  <span>Read Industrial Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              <Link 
                href="/cra-hub/guides/article-14-playbook"
                className="p-6 rounded-2xl bg-surface border border-hairline flex flex-col justify-between space-y-4 hover:border-dutchOrange/50 transition-colors group"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-red-500 uppercase font-bold">Active Enforcement</span>
                  <h3 className="text-base font-bold text-primary group-hover:text-dutchOrange transition-colors">
                    Article 14 Early Warning Playbook: Notifying ENISA in 24 Hours
                  </h3>
                  <p className="text-xs text-secondary leading-relaxed">
                    Step-by-step incident response procedures for notifying the Single Reporting Platform and national CSIRTs without leaking exploit telemetry.
                  </p>
                </div>
                <div className="pt-4 border-t border-hairline text-xs font-mono text-dutchOrange font-semibold flex items-center gap-1">
                  <span>Read Playbook</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Mandatory Independent Legal Disclaimer */}
        <section className="py-10 border-t border-hairline bg-surface/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
            <span className="font-mono text-[10px] text-muted uppercase tracking-widest block">
              Editorial Policy & Statutory Notice
            </span>
            <p className="text-xs text-muted max-w-3xl mx-auto leading-relaxed">
              The CRA Conformity Hub is an independent public educational resource authored by Eigenia Labs (Eigenia B.V., Amsterdam). 
              Eigenia Labs does not accept paid advertising, affiliate commissions, or sponsored rankings. Information provided herein 
              is for technical benchmarking and educational purposes only and does not constitute statutory legal counsel or accredited Notified Body certification.
            </p>
          </div>
        </section>
      </SiteChrome>
    </main>
  );
}
