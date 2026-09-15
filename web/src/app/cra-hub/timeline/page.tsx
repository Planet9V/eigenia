"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Building, 
  Scale, 
  Database, 
  FileText, 
  RotateCw, 
  RotateCcw, 
  ExternalLink,
  Siren,
  Zap,
  Layers,
  Cpu,
  Server,
  Check,
  HelpCircle,
  Terminal,
  Flag,
  ChevronRight,
  Info
} from "lucide-react";

// =========================================================================
// COMPACT MERMAID CHARTS (STRICTLY CONSTRAINED FOR CRISP READABILITY)
// =========================================================================

const MACRO_TIMELINE_MERMAID = `timeline
    title European Cyber Resilience Act Multi-Year Statutory Trajectory
    2024 : Dec 10 Entry into Force : Standardisation Request to CEN/CENELEC
    2026 : Sep 11 Article 14 Early Warning Live : ENISA Single Reporting Platform Mandate
    2027 : Jan 20 Machinery Reg (EU) 2023/1230 : Dec 11 Full CRA Application & CE Marking`;

const INCIDENT_SEQUENCE_MERMAID = `sequenceDiagram
    autonumber
    participant M as Manufacturer
    participant E as ENISA SRP
    participant C as National CSIRT
    participant U as Customers

    Note over M: Exploit Detected in Wild
    M->>E: 24h Early Warning (Art. 14.2)
    E-->>C: Encrypted Routing to Host CSIRT
    Note over M: Triage & CVSS Root Cause
    M->>E: 72h Technical Dossier (Art. 14.3)
    opt Workaround Available
        M->>U: Immediate User Advisory (Art. 14.5)
    end
    Note over M: Patch Validation & Rollout
    M->>U: Deploy Free Security Update
    M->>E: Final Incident Report (within 14d)`;

// =========================================================================
// DATA STRUCTURES
// =========================================================================

interface MilestoneItem {
  id: string;
  date: string;
  badge: string;
  badgeType: "active" | "collision" | "deadline" | "passed";
  leadTime: string;
  title: string;
  citation: string;
  summary: string;
  highlights: string[];
  mandatoryActions: string[];
  penalties: string;
  guideLink?: { label: string; href: string };
}

const MILESTONES: MilestoneItem[] = [
  {
    id: "enisa-srp",
    date: "September 11, 2026",
    badge: "ACTIVE LAW TODAY",
    badgeType: "active",
    leadTime: "ACTIVE TODAY",
    title: "Article 14 ENISA SRP 24h Early Warning Mandate",
    citation: "Regulation (EU) 2024/2847, Article 14(1) & (2)",
    summary:
      "Statutory mandatory 24-hour early warning notice to the ENISA Single Reporting Platform and national CSIRTs upon becoming aware of any actively exploited vulnerability or severe incident affecting Products with Digital Elements.",
    highlights: [
      "24h Early Warning Notice to ENISA & national CSIRT",
      "72h Technical Incident Dossier with CVSS & telemetry",
      "14-Day Final Corrective Action & patch completion report"
    ],
    mandatoryActions: [
      "Obtain and test authentication credentials for the ENISA Single Reporting Platform (SRP)",
      "Establish 24/7 internal incident response triage team for rapid escalation",
      "Pre-authorize Article 14 communication templates with legal and product engineering teams",
      "Appoint official EU Authorised Representative (Article 11) for non-EU manufacturers"
    ],
    penalties: "Administrative fines up to €10,000,000 or 2.0% of total annual worldwide turnover for Article 14 non-compliance.",
    guideLink: {
      label: "Read Article 14 Incident Playbook",
      href: "/cra-hub/guides/article-14-playbook"
    }
  },
  {
    id: "machinery-cyber",
    date: "January 20, 2027",
    badge: "UPCOMING COLLISION",
    badgeType: "collision",
    leadTime: "T-4 MONTHS",
    title: "Machinery Regulation Cyber Mandate Enforcement",
    citation: "Regulation (EU) 2023/1230, Annex III § 1.1.9",
    summary:
      "Horizontal machinery safety regulation requiring all industrial machines with digital interfaces to be resilient against cyber corruption 11 months ahead of full CRA application. Unprotected network interfaces violate essential health and safety requirements.",
    highlights: [
      "Hardware/software connection controls preventing physical hazard corruption",
      "Validation of safety control circuits against network spoofing and MITM attacks",
      "Harmonized alignment with IEC 62443 and EN ISO 13849 safety functions"
    ],
    mandatoryActions: [
      "Audit industrial Ethernet, Fieldbus, and wireless communication channels against unauthorized access",
      "Validate safety control loops (E-stops, limiters) cannot be altered via network ports",
      "Compile machinery technical files incorporating empirical cybersecurity risk assessments",
      "Bridge OT plant automation engineers with corporate IT security teams"
    ],
    penalties: "Market surveillance stop-sale orders, mandatory EU-wide product recalls, and customs seizure at EU borders.",
    guideLink: {
      label: "Read Industrial OT & Machinery Guide",
      href: "/cra-hub/guides/industrial-ot"
    }
  },
  {
    id: "full-cra",
    date: "December 11, 2027",
    badge: "STATUTORY DEADLINE",
    badgeType: "deadline",
    leadTime: "T-15 MONTHS",
    title: "Full CRA Application & CE Marking Enforcement",
    citation: "Regulation (EU) 2024/2847, Articles 10, 13, 24 & Annex I",
    summary:
      "100% of Products with Digital Elements placed on the EU Single Market must fully conform to Annex I, hold an Annex VII technical dossier, provide continuous CycloneDX/SPDX SBOMs, and bear the CE mark.",
    highlights: [
      "Mandatory CE Mark affixed to hardware and digital PDE",
      "Continuous machine-readable CycloneDX / SPDX SBOM generation",
      "10-Year technical file archival repository requirement",
      "Third-party Notified Body certification for Class I & Class II PDE"
    ],
    mandatoryActions: [
      "Sign formal EU Declaration of Conformity (EU DoC) under internal Module A control or CAB certificate",
      "Complete third-party Notified Body conformity audits for Important Class I & Class II PDE",
      "Deploy statutory Coordinated Vulnerability Disclosure (CVD) and security.txt",
      "Implement automated, free-of-charge security patches for expected product lifetime"
    ],
    penalties: "Total prohibition from commercial distribution across all 27 EU member states plus fines up to €15M or 2.5% of turnover.",
    guideLink: {
      label: "View Annex I Requirements",
      href: "/cra-hub/requirements"
    }
  },
  {
    id: "entry-into-force",
    date: "December 10, 2024",
    badge: "LEGISLATIVE BASELINE",
    badgeType: "passed",
    leadTime: "PASSED",
    title: "Entry into Force of the Cyber Resilience Act",
    citation: "Regulation (EU) 2024/2847, Article 71",
    summary:
      "Official legislative enactment following publication in the Official Journal of the European Union (OJEU), commencing the 21-month transition period for Article 14 and 36-month transition for full Annex I conformity.",
    highlights: [
      "Publication in EU Official Journal (L series)",
      "Standardisation request issued to CEN/CENELEC/ETSI",
      "Commencement of statutory transitional countdowns"
    ],
    mandatoryActions: [
      "Establish cross-functional CRA compliance steering committee",
      "Inventory all product hardware, firmware, and software architectures under PDE definition"
    ],
    penalties: "Legislative baseline established across all 27 EU member states."
  }
];

export default function TimelinePage() {
  const [activeTab, setActiveTab] = useState<"macro" | "incident" | "machinery" | "grandfathering">("macro");
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="min-h-screen bg-canvas text-primary relative font-sans selection:bg-dutchOrange selection:text-white transition-colors duration-300">
      <SiteChrome>
        {/* ========================================================================= */}
        {/* HEADER SECTION & BREADCRUMBS                                              */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden border-b border-hairline bg-surface/40 pt-28 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "CRA Conformity Hub", href: "/cra-hub" },
                { label: "Enforcement Timeline" }
              ]}
            />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dutchOrange/10 border border-dutchOrange/30 text-dutchOrange text-xs font-mono font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>Pillar 2 // Multi-Track Statutory Enforcement Roadmap</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary leading-[1.15]">
                  CRA Regulatory <span className="text-dutchOrange">Enforcement Timeline</span>
                </h1>

                <p className="text-base sm:text-lg text-secondary max-w-2xl leading-relaxed">
                  A definitive operational roadmap of statutory deadlines, multi-regulation collisions, and incident 
                  reporting countdowns under Regulation (EU) 2024/2847. Explore the 4 specialized timeline tracks below.
                </p>
              </div>

              {/* Quick Jump Hub Navigation */}
              <div className="p-4 rounded-2xl bg-canvas border border-hairline font-mono text-xs space-y-2 min-w-[280px] shadow-sm">
                <span className="text-muted text-[10px] uppercase tracking-wider block font-bold">
                  Hub Navigation
                </span>
                <div className="space-y-1.5">
                  <Link href="/cra-hub" className="text-secondary hover:text-dutchOrange flex items-center justify-between">
                    <span>← Back to Hub Overview</span>
                  </Link>
                  <Link href="/cra-hub/requirements" className="text-secondary hover:text-dutchOrange flex items-center justify-between">
                    <span>→ Pillar 1: Requirements</span>
                  </Link>
                  <Link href="/cra-hub/directory" className="text-secondary hover:text-dutchOrange flex items-center justify-between">
                    <span>→ Pillar 3: 18-Tool Directory</span>
                  </Link>
                  <Link href="/cra-hub/guides" className="text-secondary hover:text-dutchOrange flex items-center justify-between">
                    <span>→ Pillar 4: Deep Guides</span>
                  </Link>
                  <Link href="/jurisdictions" className="text-dutchOrange font-bold hover:underline flex items-center justify-between pt-1 border-t border-hairline">
                    <span>→ 3D Globe & Corridors</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Macro Status Cards (4 Key Clocks at a Glance) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 font-mono">
              <div className="p-4 rounded-xl bg-canvas border border-hairline flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-muted uppercase">Baseline Law</span>
                  <div className="text-base font-bold text-primary mt-1">Dec 10, 2024</div>
                  <div className="text-xs text-secondary mt-0.5">Entry into Force</div>
                </div>
                <div className="mt-3 pt-2 border-t border-hairline text-[10px] text-emerald-400 font-bold">
                  ✓ Passed (In Force)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-red-400 uppercase font-bold">Article 14 Gate</span>
                  <div className="text-base font-bold text-red-400 mt-1">Sep 11, 2026</div>
                  <div className="text-xs text-secondary mt-0.5">ENISA 24h Early Warning</div>
                </div>
                <div className="mt-3 pt-2 border-t border-red-500/20 text-[10px] text-red-400 font-bold">
                  ● Active Law Today
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-amber-400 uppercase font-bold">Machinery Collision</span>
                  <div className="text-base font-bold text-amber-400 mt-1">Jan 20, 2027</div>
                  <div className="text-xs text-secondary mt-0.5">Reg (EU) 2023/1230 OT Safety</div>
                </div>
                <div className="mt-3 pt-2 border-t border-amber-500/20 text-[10px] text-amber-400 font-bold">
                  ⚡ T-4 Months Ahead of CRA
                </div>
              </div>

              <div className="p-4 rounded-xl bg-dutchOrange/5 border border-dutchOrange/20 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-dutchOrange uppercase font-bold">Full Enforcement</span>
                  <div className="text-base font-bold text-dutchOrange mt-1">Dec 11, 2027</div>
                  <div className="text-xs text-secondary mt-0.5">100% PDE CE Mark Required</div>
                </div>
                <div className="mt-3 pt-2 border-t border-dutchOrange/20 text-[10px] text-dutchOrange font-bold">
                  ⏳ T-15 Months Remaining
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE MULTI-TIMELINE STUDIO (4 SPECIALIZED TIMELINE VIEWS)          */}
        {/* ========================================================================= */}
        <section className="py-12 bg-surface/20 border-b border-hairline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-dutchOrange uppercase tracking-wider font-semibold block">
                  Interactive Studio
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary mt-1">
                  Four Specialized Statutory Timeline Tracks
                </h2>
                <p className="text-sm text-secondary mt-1 max-w-3xl">
                  Select a timeline view below to analyze multi-year statutory trajectories, the fast 24h/72h incident response clock, 
                  the industrial machinery regulatory collision, or grandfathering rules for existing products.
                </p>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex flex-wrap gap-1.5 p-1.5 rounded-xl bg-canvas border border-hairline font-mono text-xs">
                <button
                  onClick={() => setActiveTab("macro")}
                  className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                    activeTab === "macro"
                      ? "bg-dutchOrange text-white shadow-sm"
                      : "text-secondary hover:text-primary"
                  }`}
                >
                  1. 36-Month Calendar
                </button>
                <button
                  onClick={() => setActiveTab("incident")}
                  className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                    activeTab === "incident"
                      ? "bg-red-500 text-white shadow-sm"
                      : "text-secondary hover:text-primary"
                  }`}
                >
                  2. Article 14 Escalation (24h/72h)
                </button>
                <button
                  onClick={() => setActiveTab("machinery")}
                  className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                    activeTab === "machinery"
                      ? "bg-amber-500 text-black shadow-sm"
                      : "text-secondary hover:text-primary"
                  }`}
                >
                  3. Machinery Collision (Jan 2027)
                </button>
                <button
                  onClick={() => setActiveTab("grandfathering")}
                  className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                    activeTab === "grandfathering"
                      ? "bg-purple-500 text-white shadow-sm"
                      : "text-secondary hover:text-primary"
                  }`}
                >
                  4. Article 69 Grandfathering
                </button>
              </div>
            </div>

            {/* TAB CONTENT 1: MACRO 36-MONTH HORIZON */}
            {activeTab === "macro" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-6 rounded-2xl bg-canvas border border-hairline space-y-6">
                  <div className="flex items-center justify-between border-b border-hairline pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-primary">
                        36-Month Macro Regulatory & Harmonisation Calendar (2024–2027)
                      </h3>
                      <p className="text-xs text-secondary mt-0.5">
                        Statutory progression from initial Official Journal publication to mandatory European market surveillance.
                      </p>
                    </div>
                    <span className="font-mono text-xs text-dutchOrange font-bold px-2.5 py-1 rounded bg-dutchOrange/10 border border-dutchOrange/20">
                      Regulation (EU) 2024/2847
                    </span>
                  </div>

                  {/* High-Density Chronological Step Progression */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 font-mono">
                    <div className="p-4 rounded-xl bg-surface border border-hairline space-y-2">
                      <div className="text-[10px] text-muted">MILESTONE 01</div>
                      <div className="text-sm font-bold text-emerald-400">Dec 10, 2024</div>
                      <div className="text-xs font-bold text-primary">Entry into Force</div>
                      <p className="text-[11px] text-secondary font-sans leading-relaxed">
                        CRA published in OJEU. Standardisation request issued to CEN/CENELEC/ETSI for harmonised European standards.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-surface border border-hairline space-y-2">
                      <div className="text-[10px] text-muted">MILESTONE 02</div>
                      <div className="text-sm font-bold text-sky-400">Jun 11, 2026</div>
                      <div className="text-xs font-bold text-primary">NANDO CAB Guidelines</div>
                      <p className="text-[11px] text-secondary font-sans leading-relaxed">
                        Member states notify designation criteria for Conformity Assessment Bodies (CABs) under Articles 39–45.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/30 space-y-2">
                      <div className="text-[10px] text-red-400 font-bold">MILESTONE 03 // ACTIVE</div>
                      <div className="text-sm font-bold text-red-400">Sep 11, 2026</div>
                      <div className="text-xs font-bold text-primary">Article 14 Early Warning</div>
                      <p className="text-[11px] text-secondary font-sans leading-relaxed">
                        ENISA Single Reporting Platform goes live. Mandatory 24h exploit notice & 72h technical dossiers become legally binding.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/30 space-y-2">
                      <div className="text-[10px] text-amber-400 font-bold">MILESTONE 04 // COLLISION</div>
                      <div className="text-sm font-bold text-amber-400">Jan 20, 2027</div>
                      <div className="text-xs font-bold text-primary">Machinery Cyber Mandate</div>
                      <p className="text-[11px] text-secondary font-sans leading-relaxed">
                        Regulation (EU) 2023/1230 forces industrial machinery to withstand cyber corruption 11 months before full CRA.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-dutchOrange/5 border border-dutchOrange/30 space-y-2">
                      <div className="text-[10px] text-dutchOrange font-bold">MILESTONE 05 // CE MARK</div>
                      <div className="text-sm font-bold text-dutchOrange">Dec 11, 2027</div>
                      <div className="text-xs font-bold text-primary">Full CRA Application</div>
                      <p className="text-[11px] text-secondary font-sans leading-relaxed">
                        100% of PDE on EU market must conform to Annex I, hold 10-yr technical file, CycloneDX SBOM, and bear CE marking.
                      </p>
                    </div>
                  </div>

                  {/* Compact Visual Diagram */}
                  <div className="pt-2">
                    <div className="max-w-4xl mx-auto rounded-xl border border-hairline bg-surface/40 p-4">
                      <MermaidDiagram chart={MACRO_TIMELINE_MERMAID} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: ARTICLE 14 INCIDENT ESCALATION CLOCK */}
            {activeTab === "incident" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-6 rounded-2xl bg-canvas border border-red-500/30 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                        <h3 className="text-lg font-bold text-primary">
                          Article 14: The 24-Hour / 72-Hour / 14-Day Incident Escalation Clock
                        </h3>
                      </div>
                      <p className="text-xs text-secondary mt-0.5">
                        Statutory sequence governing exploited vulnerabilities and severe security incidents under Regulation (EU) 2024/2847 Article 14.
                      </p>
                    </div>
                    <Link
                      href="/cra-hub/guides/article-14-playbook"
                      className="text-xs font-mono text-dutchOrange font-bold hover:underline inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Read Complete Article 14 Playbook →</span>
                    </Link>
                  </div>

                  {/* 4-Stage Escalation Ladder */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono">
                    <div className="p-4 rounded-xl bg-surface border border-hairline space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted">STAGE 0</span>
                        <span className="text-[10px] text-amber-400 font-bold">HOUR 0</span>
                      </div>
                      <div className="text-sm font-bold text-primary">Exploit Detected</div>
                      <p className="text-xs text-secondary font-sans leading-relaxed">
                        Manufacturer becomes aware of an actively exploited vulnerability in their PDE or an ongoing severe security incident.
                      </p>
                      <div className="text-[10px] text-muted pt-2 border-t border-hairline">
                        Internal triage clock starts immediately.
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-red-400 font-bold">STAGE 1</span>
                        <span className="text-[10px] text-red-400 font-bold">T ≤ 24 HOURS</span>
                      </div>
                      <div className="text-sm font-bold text-red-400">Early Warning Notice</div>
                      <p className="text-xs text-secondary font-sans leading-relaxed">
                        Statutory submission to the ENISA Single Reporting Platform (SRP) and national CSIRT. Identifies affected PDE and severity.
                      </p>
                      <div className="text-[10px] text-red-400 font-bold pt-2 border-t border-red-500/20">
                        Mandatory under Article 14(2).
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-amber-400 font-bold">STAGE 2</span>
                        <span className="text-[10px] text-amber-400 font-bold">T ≤ 72 HOURS</span>
                      </div>
                      <div className="text-sm font-bold text-amber-400">Technical Dossier</div>
                      <p className="text-xs text-secondary font-sans leading-relaxed">
                        Comprehensive incident report with CVSS scoring, indicators of compromise, impact analysis, and interim mitigations.
                      </p>
                      <div className="text-[10px] text-amber-400 font-bold pt-2 border-t border-amber-500/20">
                        Mandatory under Article 14(3).
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-surface border border-hairline space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted">STAGE 3</span>
                        <span className="text-[10px] text-emerald-400 font-bold">T ≤ 14 DAYS</span>
                      </div>
                      <div className="text-sm font-bold text-emerald-400">Final Patch Report</div>
                      <p className="text-xs text-secondary font-sans leading-relaxed">
                        Final report detailing root cause analysis, permanent security patch release to customers, and verified remediation evidence.
                      </p>
                      <div className="text-[10px] text-muted pt-2 border-t border-hairline">
                        Completes incident cycle under Article 14(4).
                      </div>
                    </div>
                  </div>

                  {/* Compact, Well-Proportioned Sequence Diagram */}
                  <div className="pt-4 border-t border-hairline space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-muted uppercase tracking-wider font-semibold">
                        Architecture Sequence Diagram (ENISA Single Reporting Platform ↔ CSIRT ↔ User)
                      </span>
                      <span className="text-[11px] font-mono text-secondary">
                        Rendered with strict horizontal scale constraints
                      </span>
                    </div>

                    <div className="max-w-3xl mx-auto rounded-xl border border-hairline bg-surface/50 p-4 overflow-x-auto">
                      <MermaidDiagram chart={INCIDENT_SEQUENCE_MERMAID} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: MACHINERY REGULATION COLLISION */}
            {activeTab === "machinery" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-6 rounded-2xl bg-canvas border border-amber-500/30 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500 text-black">
                          COLLISION DATE: JAN 20, 2027
                        </span>
                        <h3 className="text-lg font-bold text-primary">
                          Machinery Regulation (EU) 2023/1230 vs CRA Regulatory Collision
                        </h3>
                      </div>
                      <p className="text-xs text-secondary mt-0.5">
                        Why industrial machinery builders cannot wait until December 2027 for cybersecurity compliance.
                      </p>
                    </div>
                    <Link
                      href="/cra-hub/guides/industrial-ot"
                      className="text-xs font-mono text-dutchOrange font-bold hover:underline inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Read Industrial OT Guide →</span>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-amber-400">
                          Machinery Regulation (EU) 2023/1230
                        </span>
                        <span className="font-mono text-xs text-amber-400 font-bold">Jan 20, 2027</span>
                      </div>
                      <p className="text-xs text-secondary leading-relaxed">
                        Annex III § 1.1.9 explicitly introduces <strong>Protection Against Corruption</strong> as a mandatory health and safety requirement. 
                        Any industrial machine with digital interfaces that control physical safety loops (robotics, CNCs, automated guided vehicles, packaging lines) 
                        must be hardened against cyber attacks starting January 2027.
                      </p>
                      <ul className="text-xs font-mono space-y-1 text-primary">
                        <li>• Applies to all CE-marked machinery placed on EU market</li>
                        <li>• Non-compliance blocks CE marking 11 months before CRA</li>
                        <li>• Enforced by national labor and machinery safety inspectorates</li>
                      </ul>
                    </div>

                    <div className="p-5 rounded-xl bg-dutchOrange/5 border border-dutchOrange/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-dutchOrange">
                          Cyber Resilience Act (EU) 2024/2847
                        </span>
                        <span className="font-mono text-xs text-dutchOrange font-bold">Dec 11, 2027</span>
                      </div>
                      <p className="text-xs text-secondary leading-relaxed">
                        Covers all Products with Digital Elements horizontally. For industrial components that are both PDE and machinery safety components 
                        (e.g., safety PLCs, industrial gateways, vision sensors), CRA Annex I harmonizes with Machinery Regulation requirements.
                      </p>
                      <ul className="text-xs font-mono space-y-1 text-primary">
                        <li>• Requires formal CycloneDX SBOM and vulnerability handling</li>
                        <li>• Module H / B+C third-party certification for Class II PDE</li>
                        <li>• Unified Annex VII technical file serves both directives</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-surface border border-hairline text-xs font-mono text-secondary flex items-start gap-3">
                    <Info className="w-5 h-5 text-dutchOrange shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-primary block mb-0.5">Engineering Action Item:</strong>
                      Industrial machine builders must integrate cybersecurity into their Machinery Directive technical files by Q4 2026. 
                      Treat January 20, 2027 as your actual hard operational deadline, not December 2027.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: ARTICLE 69 GRANDFATHERING */}
            {activeTab === "grandfathering" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-6 rounded-2xl bg-canvas border border-purple-500/30 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-primary">
                        Article 69 Transitional Provisions: Legacy Products & Grandfathering
                      </h3>
                      <p className="text-xs text-secondary mt-0.5">
                        Statutory rules governing products placed on the EU Single Market prior to December 11, 2027.
                      </p>
                    </div>
                    <span className="font-mono text-xs text-purple-400 font-bold px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/20">
                      Article 69 Analysis
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 rounded-xl bg-surface border border-hairline space-y-3">
                      <span className="font-mono text-xs text-emerald-400 font-bold block">
                        Legacy Products Placed Before Dec 2027
                      </span>
                      <p className="text-xs text-secondary leading-relaxed">
                        Products placed on the market before December 11, 2027 are <strong>exempt from Annex I design requirements</strong>, 
                        provided they do not undergo substantial modification after that date.
                      </p>
                      <div className="text-[11px] font-mono text-muted border-t border-hairline pt-2">
                        Existing inventories in warehouses can continue to be distributed without retrospective redesign.
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-surface border border-hairline space-y-3">
                      <span className="font-mono text-xs text-amber-400 font-bold block">
                        Substantial Modification Trigger (Art. 3.31)
                      </span>
                      <p className="text-xs text-secondary leading-relaxed">
                        If a legacy product undergoes a <strong>substantial modification</strong> (major firmware overhaul, kernel rewrite, new connectivity interfaces) 
                        after Dec 11, 2027, it loses its grandfathered status and must comply 100% with CRA Annex I.
                      </p>
                      <div className="text-[11px] font-mono text-muted border-t border-hairline pt-2">
                        Routine security patches that fix vulnerabilities do NOT count as substantial modifications.
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-surface border border-hairline space-y-3">
                      <span className="font-mono text-xs text-red-400 font-bold block">
                        Vulnerability Disclosure Still Applies
                      </span>
                      <p className="text-xs text-secondary leading-relaxed">
                        While design rules are grandfathered, <strong>Article 14 reporting obligations apply to all active products</strong>. 
                        If an actively exploited vulnerability is discovered in an existing legacy product, manufacturer must notify ENISA within 24 hours.
                      </p>
                      <div className="text-[11px] font-mono text-muted border-t border-hairline pt-2">
                        Zero exemption for active exploit reporting.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MILESTONE DEEP DIVES WITH 3D FLIP CARDS                                   */}
        {/* ========================================================================= */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-dutchOrange uppercase tracking-wider font-semibold">
                  Interactive Statutory Milestones
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-primary mt-1">
                  Operational Action Plans & Technical Dossiers
                </h2>
                <p className="text-sm text-secondary mt-1">
                  Click any card to flip between strategic overview and mandatory engineering deliverables with statutory penalties.
                </p>
              </div>

              <span className="text-xs font-mono text-muted">
                Tip: Click card to flip 3D dossier
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MILESTONES.map((milestone) => {
                const isFlipped = !!flippedCards[milestone.id];

                return (
                  <div
                    key={milestone.id}
                    className="relative min-h-[360px] cursor-pointer perspective-1000"
                    onClick={() => toggleCard(milestone.id)}
                  >
                    <motion.div
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="w-full h-full relative"
                    >
                      {/* FRONT OF CARD */}
                      <div
                        style={{ backfaceVisibility: "hidden" }}
                        className={`p-6 rounded-2xl border flex flex-col justify-between h-full group shadow-sm hover:shadow-md transition-all ${
                          milestone.badgeType === "active"
                            ? "bg-red-500/5 border-red-500/30 hover:border-red-500/60"
                            : milestone.badgeType === "collision"
                            ? "bg-amber-500/5 border-amber-500/30 hover:border-amber-500/60"
                            : milestone.badgeType === "deadline"
                            ? "bg-dutchOrange/5 border-dutchOrange/30 hover:border-dutchOrange/60"
                            : "bg-surface border-hairline opacity-75"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                  milestone.badgeType === "active"
                                    ? "bg-red-500 text-white"
                                    : milestone.badgeType === "collision"
                                    ? "bg-amber-500 text-black font-bold"
                                    : milestone.badgeType === "deadline"
                                    ? "bg-dutchOrange text-white"
                                    : "bg-subtle text-muted"
                                }`}
                              >
                                {milestone.badge}
                              </span>
                              <span className="font-mono text-xs text-muted">
                                {milestone.date}
                              </span>
                            </div>

                            <span className="font-mono text-[10px] text-muted flex items-center gap-1 group-hover:text-dutchOrange transition-colors">
                              <span>Flip</span>
                              <RotateCw className="w-3 h-3" />
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-primary group-hover:text-dutchOrange transition-colors">
                            {milestone.title}
                          </h3>
                          <span className="text-[11px] font-mono text-muted block mt-0.5">
                            {milestone.citation}
                          </span>

                          <p className="text-xs text-secondary leading-relaxed mt-3 pt-2 border-t border-hairline">
                            {milestone.summary}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {milestone.highlights.map((h, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded bg-subtle text-[11px] font-mono text-primary border border-hairline"
                              >
                                ✓ {h}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-hairline flex items-center justify-between text-xs font-mono">
                          <span className="text-[10px] text-muted">
                            {milestone.leadTime}
                          </span>
                          <span className="text-dutchOrange font-semibold inline-flex items-center gap-1">
                            <span>Inspect Deliverables</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>

                      {/* BACK OF CARD (FLIPPED: MANDATORY DELIVERABLES & PENALTIES) */}
                      <div
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)"
                        }}
                        className="absolute inset-0 p-6 rounded-2xl bg-canvas border border-dutchOrange/50 shadow-lg flex flex-col justify-between overflow-y-auto"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between border-b border-hairline pb-2">
                            <div>
                              <span className="font-mono text-[10px] text-dutchOrange font-bold uppercase tracking-wider block">
                                Statutory Deliverables & Enforcement
                              </span>
                              <h4 className="text-sm font-bold text-primary">
                                {milestone.title}
                              </h4>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCard(milestone.id);
                              }}
                              className="px-2 py-1 rounded bg-subtle hover:bg-hairline text-[10px] font-mono text-primary flex items-center gap-1 transition-colors"
                            >
                              <span>Back</span>
                              <RotateCcw className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="space-y-1.5">
                            <span className="font-mono text-[10px] text-muted uppercase tracking-wider block">
                              Mandatory Operational Actions:
                            </span>
                            <ul className="space-y-1">
                              {milestone.mandatoryActions.map((act, idx) => (
                                <li
                                  key={idx}
                                  className="text-xs text-secondary flex items-start gap-1.5 leading-snug"
                                >
                                  <span className="text-dutchOrange font-bold">•</span>
                                  <span>{act}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="pt-3 mt-3 border-t border-hairline space-y-2">
                          <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-mono">
                            <div className="font-bold text-[10px] uppercase mb-0.5">Statutory Penalty:</div>
                            <div className="leading-tight">{milestone.penalties}</div>
                          </div>

                          {milestone.guideLink && (
                            <Link
                              href={milestone.guideLink.href}
                              onClick={(e: React.MouseEvent) => e.stopPropagation()}
                              className="text-xs font-mono text-dutchOrange hover:underline font-bold inline-flex items-center gap-1 pt-1"
                            >
                              <span>{milestone.guideLink.label}</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STATUTORY PENALTIES & MARKET SURVEILLANCE SANCTIONS MATRIX                 */}
        {/* ========================================================================= */}
        <section className="py-14 bg-surface/30 border-t border-b border-hairline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div>
              <span className="text-xs font-mono text-red-500 uppercase tracking-wider font-semibold block">
                Statutory Sanction Matrix (Articles 52–54)
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-primary mt-1">
                Administrative Fines & Market Surveillance Authority Powers
              </h2>
              <p className="text-sm text-secondary mt-1 max-w-3xl">
                National market surveillance authorities in all 27 EU member states possess binding powers to impose 
                turnover-based financial penalties, issue market withdrawal orders, and initiate customs border blocks.
              </p>
            </div>

            <div className="rounded-2xl bg-canvas border border-hairline overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-surface border-b border-hairline text-muted uppercase text-[10px]">
                    <tr>
                      <th className="p-4">Violation Category</th>
                      <th className="p-4">Statutory Basis</th>
                      <th className="p-4">Maximum Financial Fine</th>
                      <th className="p-4">Operational / Market Sanction</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="p-4 font-bold text-primary">
                        Non-compliance with Annex I Essential Requirements
                      </td>
                      <td className="p-4 text-secondary">Article 53(1)</td>
                      <td className="p-4 text-red-500 font-bold">
                        Up to €15,000,000 or 2.5% of total annual global turnover
                      </td>
                      <td className="p-4 text-secondary">
                        Immediate ban on placement on the EU market; mandatory product recall across 27 member states.
                      </td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="p-4 font-bold text-primary">
                        Failure to comply with Article 14 Incident Reporting
                      </td>
                      <td className="p-4 text-secondary">Article 53(2)</td>
                      <td className="p-4 text-amber-500 font-bold">
                        Up to €10,000,000 or 2.0% of total annual global turnover
                      </td>
                      <td className="p-4 text-secondary">
                        Formal notice of non-compliance; referral to national CSIRTs and judicial authorities.
                      </td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="p-4 font-bold text-primary">
                        Supply of misleading information to Notified Bodies
                      </td>
                      <td className="p-4 text-secondary">Article 53(3)</td>
                      <td className="p-4 text-purple-400 font-bold">
                        Up to €5,000,000 or 1.0% of total annual global turnover
                      </td>
                      <td className="p-4 text-secondary">
                        Revocation of EU-Type Examination Certificate; revocation of Module H approval.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* QUARTERLY IMPLEMENTATION CHECKLIST (2025–2027)                             */}
        {/* ========================================================================= */}
        <section className="py-14 bg-canvas border-b border-hairline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div>
              <span className="text-xs font-mono text-dutchOrange uppercase tracking-wider font-semibold block">
                Preparation Playbook
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-primary mt-1">
                Quarterly Engineering & Regulatory Readiness Roadmap
              </h2>
              <p className="text-sm text-secondary mt-1 max-w-3xl">
                Recommended operational cadence for engineering leaders, product security directors, and legal compliance officers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-surface border border-hairline space-y-2">
                <div className="text-[10px] text-dutchOrange font-bold">Q3–Q4 2025</div>
                <div className="font-bold text-primary">Foundation Phase</div>
                <ul className="space-y-1 text-secondary text-[11px] font-sans">
                  <li>• Conduct complete product inventory under PDE scope</li>
                  <li>• Deploy automated CycloneDX / SPDX SBOM tooling in CI/CD</li>
                  <li>• Publish RFC 9116 security.txt on domain</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-hairline space-y-2">
                <div className="text-[10px] text-dutchOrange font-bold">Q1–Q2 2026</div>
                <div className="font-bold text-primary">Triage Drill Phase</div>
                <ul className="space-y-1 text-secondary text-[11px] font-sans">
                  <li>• Register credentials with ENISA Single Reporting Platform</li>
                  <li>• Conduct 24h mock incident escalation simulation</li>
                  <li>• Appoint EU Authorised Representative (Article 11)</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 space-y-2">
                <div className="text-[10px] text-red-400 font-bold">Q3–Q4 2026</div>
                <div className="font-bold text-primary">Article 14 Live</div>
                <ul className="space-y-1 text-secondary text-[11px] font-sans">
                  <li>• September 11: Article 14 24h early warning mandatory</li>
                  <li>• Begin Machinery Regulation cyber audit for industrial PDE</li>
                  <li>• Select accredited Notified Body for Class I/II PDE</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-dutchOrange/5 border border-dutchOrange/20 space-y-2">
                <div className="text-[10px] text-dutchOrange font-bold">2027 Full Enforcement</div>
                <div className="font-bold text-primary">CE Mark Affixation</div>
                <ul className="space-y-1 text-secondary text-[11px] font-sans">
                  <li>• January 20: Machinery Regulation cyber mandate live</li>
                  <li>• Finalize Annex VII technical file archival system</li>
                  <li>• December 11: Sign EU DoC and affix CE mark</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* BACKLINKS & NAVIGATION FOOTER                                              */}
        {/* ========================================================================= */}
        <section className="py-12 bg-surface/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <Link href="/cra-hub" className="text-secondary hover:text-dutchOrange flex items-center gap-1">
              ← Back to Hub Landing
            </Link>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/cra-hub/requirements" className="text-secondary hover:text-dutchOrange">
                Pillar 1: Requirements →
              </Link>
              <Link href="/cra-hub/directory" className="text-secondary hover:text-dutchOrange">
                Pillar 3: 18-Tool Directory →
              </Link>
              <Link href="/cra-hub/guides/article-14-playbook" className="text-dutchOrange font-bold hover:underline">
                Read Article 14 Incident Playbook →
              </Link>
            </div>
          </div>
        </section>
      </SiteChrome>
    </main>
  );
}
