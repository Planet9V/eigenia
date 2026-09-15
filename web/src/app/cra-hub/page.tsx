"use client";

import React from "react";
import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { 
  ShieldCheck, 
  Scale, 
  Clock, 
  Database, 
  FileText, 
  ArrowRight,
  ExternalLink,
  Cpu,
  Layers,
  CheckCircle2,
  Lock,
  Globe,
  AlertTriangle,
  Server,
  Building,
  Terminal,
  ChevronRight
} from "lucide-react";
import { PillarCardsNav } from "@/components/cra/PillarCardsNav";
import { StatutoryTimelineSection } from "@/components/cra/StatutoryTimelineSection";

export default function CraHubPage() {
  return (
    <main className="min-h-screen bg-canvas text-primary relative font-sans selection:bg-dutchOrange selection:text-white transition-colors duration-300">
      <SiteChrome>
        {/* ========================================================================= */}
        {/* HERO SECTION WITH QUICK STATUS & 4 PILLAR NAVIGATION CARDS                */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden border-b border-hairline bg-surface/30 pt-28 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "CRA Conformity Hub" }
              ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Title & Mission (7 Cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dutchOrange/10 border border-dutchOrange/30 text-dutchOrange text-xs font-mono font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Eigenia Labs Public Scientific Resource // Vendor-Agnostic</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary leading-[1.15]">
                  EU Cyber Resilience Act{" "}
                  <span className="text-dutchOrange">Conformity Hub</span>
                </h1>

                <p className="text-base sm:text-lg text-secondary max-w-2xl leading-relaxed">
                  An authoritative, independent knowledge and tooling gateway for Regulation (EU) 2024/2847. 
                  Explore the 4 core pillars below to navigate essential requirements, statutory enforcement timelines, 
                  evaluated tooling, and engineering playbooks.
                </p>
              </div>

              {/* Right Column: Engine Profile // Quick Status (5 Cols) */}
              <div className="lg:col-span-5">
                <div className="p-5 rounded-2xl bg-[#111317] border border-white/10 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-mono text-xs uppercase tracking-wider text-white/90 font-bold">
                        Engine Profile // Quick Status
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-dutchOrange bg-dutchOrange/10 border border-dutchOrange/20 px-2 py-0.5 rounded">
                      Reg (EU) 2024/2847
                    </span>
                  </div>

                  <div className="space-y-1 font-mono text-xs">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-white/50">PDE Scope:</span>
                      <span className="font-bold text-white">All Hardware & Software</span>
                    </div>
                  </div>

                  {/* 2x2 High-Density Quick Status Metric Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="text-[10px] text-white/50 uppercase tracking-wider">EU Tooling TAM</div>
                      <div className="text-base font-bold text-white mt-0.5">€1.397B</div>
                      <div className="text-[9px] text-white/40 mt-0.5">Verified Bottom-Up</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="text-[10px] text-white/50 uppercase tracking-wider">Impacted Entities</div>
                      <div className="text-base font-bold text-white mt-0.5">446,500</div>
                      <div className="text-[9px] text-white/40 mt-0.5">Hardware & Software</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="text-[10px] text-amber-400 uppercase tracking-wider">NANDO Bodies</div>
                      <div className="text-base font-bold text-amber-400 mt-0.5">0 Designated</div>
                      <div className="text-[9px] text-white/40 mt-0.5">Audit Bottleneck</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="text-[10px] text-red-400 uppercase tracking-wider">Article 14 Gate</div>
                      <div className="text-base font-bold text-red-400 mt-0.5">Sep 11, 2026</div>
                      <div className="text-[9px] text-white/40 mt-0.5">24h Early Warning</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top-Level 4 Pillar Navigation Cards */}
            <PillarCardsNav />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 1: PILLAR 01 — STATUTORY REQUIREMENTS GATEWAY                      */}
        {/* ========================================================================= */}
        <section id="pillar-1-requirements" className="py-16 bg-surface/30 border-b border-hairline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-mono text-dutchOrange uppercase tracking-wider font-semibold block">
                  Pillar 01 Gateway // Regulatory Scope & Annex I
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
                  Essential Cybersecurity & Vulnerability Requirements
                </h2>
                <p className="text-sm sm:text-base text-secondary max-w-3xl leading-relaxed">
                  Clause-by-clause statutory requirements under Regulation (EU) 2024/2847. Manufacturers placing 
                  Products with Digital Elements on the EU Single Market must demonstrate continuous compliance across 
                  design, testing, and lifecycle vulnerability handling.
                </p>
              </div>

              <Link 
                href="/cra-hub/requirements" 
                className="px-5 py-2.5 rounded-xl bg-dutchOrange text-white font-mono text-xs font-bold inline-flex items-center gap-2 shadow-md hover:bg-dutchOrange/90 transition-all shrink-0"
              >
                <span>Open Pillar 1: Requirements</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 3 Requirements Teaser Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Security by Design */}
              <div className="p-6 rounded-2xl bg-canvas border border-hairline space-y-4 hover:border-dutchOrange/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-dutchOrange/10 border border-dutchOrange/20 flex items-center justify-center text-dutchOrange">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-dutchOrange font-bold uppercase tracking-wider block">
                    Annex I Section 1
                  </span>
                  <h3 className="text-base font-bold text-primary mt-1">
                    Security-by-Design Mandates
                  </h3>
                </div>
                <ul className="space-y-2 text-xs text-secondary font-mono">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Strict prohibition of hardcoded / default passwords</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Attack surface reduction & zero-trust interfaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Automated security updates enabled by default</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>State-of-the-art encryption at rest and in transit</span>
                  </li>
                </ul>
              </div>

              {/* Card 2: Vulnerability Handling */}
              <div className="p-6 rounded-2xl bg-canvas border border-hairline space-y-4 hover:border-dutchOrange/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-wider block">
                    Annex I Section 2
                  </span>
                  <h3 className="text-base font-bold text-primary mt-1">
                    Vulnerability Lifecycle & SBOM
                  </h3>
                </div>
                <ul className="space-y-2 text-xs text-secondary font-mono">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                    <span>Machine-readable SBOMs (CycloneDX & SPDX)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                    <span>Coordinated Vulnerability Disclosure (CVD) portal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                    <span>Security patches distributed without commercial delay</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                    <span>10-year archival retention of technical dossiers</span>
                  </li>
                </ul>
              </div>

              {/* Card 3: Conformity Routes */}
              <div className="p-6 rounded-2xl bg-canvas border border-hairline space-y-4 hover:border-dutchOrange/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider block">
                    Article 24 Gateways
                  </span>
                  <h3 className="text-base font-bold text-primary mt-1">
                    Conformity Assessment Routes
                  </h3>
                </div>
                <ul className="space-y-2 text-xs text-secondary font-mono">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                    <span><strong>Module A</strong>: Self-assessment for ~90% default PDE</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                    <span><strong>Class I</strong>: Third-party CAB audit if no harmonised std</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                    <span><strong>Class II</strong>: Mandatory Notified Body audit (Module H/B+C)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                    <span>Official CE Marking & EU Declaration of Conformity</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Direct Gateway Link */}
            <div className="pt-2 flex items-center justify-between p-4 rounded-xl bg-surface border border-hairline text-xs font-mono">
              <span className="text-secondary">
                Need to classify your product under Annex III or Annex IV?
              </span>
              <Link 
                href="/cra-hub/requirements" 
                className="text-dutchOrange font-bold hover:underline inline-flex items-center gap-1.5"
              >
                <span>View Full Clause-by-Clause Explorer & Conformity Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: PILLAR 02 — STATUTORY TIMELINE & 3D GLOBE GATEWAY              */}
        {/* ========================================================================= */}
        <section id="pillar-2-timeline">
          <StatutoryTimelineSection />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: PILLAR 03 — 18-TOOL DIRECTORY GATEWAY                           */}
        {/* ========================================================================= */}
        <section id="pillar-3-directory" className="py-16 bg-surface/30 border-b border-hairline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-mono text-dutchOrange uppercase tracking-wider font-semibold block">
                  Pillar 03 Gateway // Vendor-Neutral Assessment
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
                  18 Evaluated CRA Compliance Tools & Platforms
                </h2>
                <p className="text-sm sm:text-base text-secondary max-w-3xl leading-relaxed">
                  Independent technical benchmarking and pricing transparency across 5 critical compliance market segments. 
                  Eigenia Labs evaluates commercial and open-source tooling without vendor bias or sponsored placement.
                </p>
              </div>

              <Link 
                href="/cra-hub/directory" 
                className="px-5 py-2.5 rounded-xl bg-dutchOrange text-white font-mono text-xs font-bold inline-flex items-center gap-2 shadow-md hover:bg-dutchOrange/90 transition-all shrink-0"
              >
                <span>Open Pillar 3: 18-Tool Directory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 4 Category Teaser Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Category 1: Industrial OT */}
              <div className="p-5 rounded-2xl bg-canvas border border-hairline space-y-3 hover:border-dutchOrange/40 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-dutchOrange/10 border border-dutchOrange/20 flex items-center justify-center text-dutchOrange">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary">Industrial OT & ICS</h3>
                    <p className="text-[11px] font-mono text-dutchOrange mt-0.5">Regulus Cyber, Nozomi</p>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed">
                    Annex VII technical file compilation, hardware schematics, and unified alignment with IEC 62443 and Machinery Regulation (EU) 2023/1230.
                  </p>
                </div>
                <div className="pt-2 border-t border-hairline text-[10px] font-mono text-muted">
                  Class II & Industrial PLCs
                </div>
              </div>

              {/* Category 2: Cloud & SaaS PDE */}
              <div className="p-5 rounded-2xl bg-canvas border border-hairline space-y-3 hover:border-dutchOrange/40 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary">Cloud & SaaS PDE</h3>
                    <p className="text-[11px] font-mono text-sky-400 mt-0.5">Sbomify, CRA Portal, Check</p>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed">
                    Automated CycloneDX 4-BOM continuous generation, ENISA Article 14 schema reporting, and self-serve Module A gap workflows.
                  </p>
                </div>
                <div className="pt-2 border-t border-hairline text-[10px] font-mono text-muted">
                  SaaS, APIs & Microservices
                </div>
              </div>

              {/* Category 3: Binary SCA & Firmware */}
              <div className="p-5 rounded-2xl bg-canvas border border-hairline space-y-3 hover:border-dutchOrange/40 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary">Binary SCA & Firmware</h3>
                    <p className="text-[11px] font-mono text-purple-400 mt-0.5">Onekey, Finite State</p>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed">
                    Zero-source binary firmware disassembly, embedded RTOS vulnerability detection, hardware interface security, and CVE tracking.
                  </p>
                </div>
                <div className="pt-2 border-t border-hairline text-[10px] font-mono text-muted">
                  Connected IoT & Embedded Hardware
                </div>
              </div>

              {/* Category 4: Open Source & CABs */}
              <div className="p-5 rounded-2xl bg-canvas border border-hairline space-y-3 hover:border-dutchOrange/40 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary">Open Source & CABs</h3>
                    <p className="text-[11px] font-mono text-emerald-400 mt-0.5">Complaro/OCCTET, TÜV</p>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed">
                    Self-hosted sovereign FOSS conformity engines alongside designated European Conformity Assessment Bodies (CABs) for Module B+C audits.
                  </p>
                </div>
                <div className="pt-2 border-t border-hairline text-[10px] font-mono text-muted">
                  Self-Hosted FOSS & Notified Bodies
                </div>
              </div>
            </div>

            {/* Direct Gateway Link */}
            <div className="pt-2 flex items-center justify-between p-4 rounded-xl bg-surface border border-hairline text-xs font-mono">
              <span className="text-secondary">
                Comparing commercial pricing, deployment options, and CycloneDX export fidelity?
              </span>
              <Link 
                href="/cra-hub/directory" 
                className="text-dutchOrange font-bold hover:underline inline-flex items-center gap-1.5"
              >
                <span>Browse All 18 Platform Profiles, Pricing Matrices & Filters</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: PILLAR 04 — PEER-REVIEWED TECHNICAL GUIDES GATEWAY             */}
        {/* ========================================================================= */}
        <section id="pillar-4-guides" className="py-16 bg-canvas border-b border-hairline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-mono text-dutchOrange uppercase tracking-wider font-semibold block">
                  Pillar 04 Gateway // Operational Playbooks
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
                  Peer-Reviewed Engineering Playbooks & Field Guides
                </h2>
                <p className="text-sm sm:text-base text-secondary max-w-3xl leading-relaxed">
                  In-depth technical publications authored by Eigenia Labs. Equipped with Truth Boxes, comparative 
                  data, and regulatory citations for engineering leaders, product security directors, and CISOs.
                </p>
              </div>

              <Link 
                href="/cra-hub/guides" 
                className="px-5 py-2.5 rounded-xl bg-dutchOrange text-white font-mono text-xs font-bold inline-flex items-center gap-2 shadow-md hover:bg-dutchOrange/90 transition-all shrink-0"
              >
                <span>Open Pillar 4: Deep Guides</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 3 Playbook Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Playbook 1: Article 14 */}
              <Link 
                href="/cra-hub/guides/article-14-playbook"
                className="p-6 rounded-2xl bg-surface border border-hairline flex flex-col justify-between space-y-4 hover:border-dutchOrange/50 transition-colors group shadow-sm hover:shadow-md"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-red-400 uppercase font-bold px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 inline-block">
                    Active Enforcement
                  </span>
                  <h3 className="text-base font-bold text-primary group-hover:text-dutchOrange transition-colors">
                    Article 14 Early Warning Playbook: Notifying ENISA in 24 Hours
                  </h3>
                  <p className="text-xs text-secondary leading-relaxed">
                    Step-by-step incident response procedures for notifying the Single Reporting Platform and national CSIRTs without leaking exploit telemetry.
                  </p>
                </div>
                <div className="pt-4 border-t border-hairline text-xs font-mono text-dutchOrange font-semibold flex items-center gap-1.5">
                  <span>Read Playbook</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Playbook 2: Industrial OT */}
              <Link 
                href="/cra-hub/guides/industrial-ot"
                className="p-6 rounded-2xl bg-surface border border-hairline flex flex-col justify-between space-y-4 hover:border-dutchOrange/50 transition-colors group shadow-sm hover:shadow-md"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-dutchOrange uppercase font-bold px-2 py-0.5 rounded bg-dutchOrange/10 border border-dutchOrange/20 inline-block">
                    Industrial OT Collision
                  </span>
                  <h3 className="text-base font-bold text-primary group-hover:text-dutchOrange transition-colors">
                    Industrial OT Under CRA: Harmonizing IEC 62443 & Machinery Mandate
                  </h3>
                  <p className="text-xs text-secondary leading-relaxed">
                    Navigating the January 20, 2027 Machinery Regulation enforcement date, binary RTOS analysis, and Class II Notified Body audit routes.
                  </p>
                </div>
                <div className="pt-4 border-t border-hairline text-xs font-mono text-dutchOrange font-semibold flex items-center gap-1.5">
                  <span>Read Industrial Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Playbook 3: Tools Benchmark */}
              <Link 
                href="/cra-hub/guides/tools-comparison"
                className="p-6 rounded-2xl bg-surface border border-hairline flex flex-col justify-between space-y-4 hover:border-dutchOrange/50 transition-colors group shadow-sm hover:shadow-md"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-sky-400 uppercase font-bold px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 inline-block">
                    Empirical Benchmark
                  </span>
                  <h3 className="text-base font-bold text-primary group-hover:text-dutchOrange transition-colors">
                    Complete Guide to EU CRA Compliance Tools (2026 Comparison)
                  </h3>
                  <p className="text-xs text-secondary leading-relaxed">
                    18-platform comparison across verified pricing tiers, CycloneDX SBOM depth, and Module A vs B/C/H conformity assessment fit.
                  </p>
                </div>
                <div className="pt-4 border-t border-hairline text-xs font-mono text-dutchOrange font-semibold flex items-center gap-1.5">
                  <span>Read Full Comparison</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>

            {/* Direct Gateway Link */}
            <div className="pt-2 flex items-center justify-between p-4 rounded-xl bg-surface border border-hairline text-xs font-mono">
              <span className="text-secondary">
                Looking for executive technical files, templates, or disclosure runbooks?
              </span>
              <Link 
                href="/cra-hub/guides" 
                className="text-dutchOrange font-bold hover:underline inline-flex items-center gap-1.5"
              >
                <span>Browse All Guides, Truth Boxes & Architectural Blueprints</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* EXECUTIVE ADVISORY & STATUTORY NOTICE                                      */}
        {/* ========================================================================= */}
        <section className="py-14 bg-surface/20 border-b border-hairline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 rounded-3xl bg-gradient-to-r from-surface to-surface/60 border border-hairline flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="space-y-2 max-w-2xl">
                <span className="font-mono text-xs text-dutchOrange uppercase tracking-wider font-bold block">
                  Enterprise Assurance
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-primary">
                  Need sovereign architecture evaluation or statutory CRA verification?
                </h2>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                  Eigenia Labs provides mathematical proof, binary audit automation, and empirical compliance verification 
                  for hardware manufacturers and software engineering organizations.
                </p>
              </div>

              <Link
                href="/collaborate"
                className="px-6 py-3 rounded-xl bg-dutchOrange text-white font-mono text-xs font-bold inline-flex items-center gap-2 hover:bg-dutchOrange/90 transition-all shadow-md shrink-0"
              >
                <span>Request Technical Briefing</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Editorial Notice */}
        <section className="py-8 bg-canvas">
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
