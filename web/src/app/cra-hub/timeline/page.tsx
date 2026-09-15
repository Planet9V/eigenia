"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { motion } from "framer-motion";
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
  ExternalLink
} from "lucide-react";

const TIMELINE_MERMAID = `timeline
    title Cyber Resilience Act & European Regulatory Enforcement Calendar
    2024 : Nov 20 Publication in EU Official Journal : Dec 10 Entry into Force
    2026 : Sep 11 ENISA Single Reporting Platform Live : Article 14 24h Early Warning Mandatory
    2027 : Jan 20 Machinery Reg (EU) 2023/1230 Mandatory : Dec 11 Full CRA Application & CE Marking`;

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
      "Statutory mandatory 24-hour early warning notice to the ENISA Single Reporting Platform and national CSIRTs upon becoming aware of any actively exploited vulnerability or severe incident.",
    highlights: [
      "24h Early Warning to ENISA & national CSIRTs",
      "72h Technical Dossier with CVSS telemetry",
      "14-Day Corrective Action & final patch report"
    ],
    mandatoryActions: [
      "Obtain authentication credentials for the ENISA Single Reporting Platform (SRP)",
      "Establish 24/7 internal incident triage team for immediate triage escalation",
      "Pre-authorize Article 14 communication templates with legal and engineering teams",
      "Appoint official EU Authorised Representative (Article 11) for non-EU manufacturers"
    ],
    penalties: "Administrative fines up to €15,000,000 or 2.5% of total worldwide annual turnover.",
    guideLink: {
      label: "Read Article 14 Playbook",
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
      "Horizontal machinery safety regulation requiring all industrial machines with digital interfaces to be resilient against cyber corruption 11 months ahead of full CRA application.",
    highlights: [
      "Hardware/software connection controls preventing physical hazard corruption",
      "Validation of safety control circuits against network spoofing",
      "Harmonized alignment with IEC 62443 and EN ISO 13849"
    ],
    mandatoryActions: [
      "Audit industrial Ethernet and wireless communication channels against spoofing",
      "Validate safety control loops cannot be corrupted by unauthorized network inputs",
      "Compile machinery technical files incorporating empirical cybersecurity risk assessments",
      "Bridge OT field engineers with corporate IT security governance teams"
    ],
    penalties: "Market surveillance stop-sale orders, mandatory EU-wide product recalls, and customs seizure.",
    guideLink: {
      label: "Read Industrial OT Guide",
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
      "100% of Products with Digital Elements placed on the EU Single Market must fully conform to Annex I, hold an Annex VII technical dossier, and bear the CE mark.",
    highlights: [
      "Mandatory CE Mark affixed to hardware and digital PDE",
      "Machine-readable CycloneDX SBOM continuous generation",
      "10-Year technical file archival repository requirement"
    ],
    mandatoryActions: [
      "Sign formal EU Declaration of Conformity (EU DoC) under internal Module A control",
      "Complete third-party Notified Body conformity audits for Important Class I & II PDE",
      "Deploy statutory Coordinated Vulnerability Disclosure (CVD) and security.txt",
      "Implement automated, free-of-charge security patches for the expected product lifetime"
    ],
    penalties: "Total prohibition from commercial distribution across all 27 EU member states plus €15M fines.",
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
      "Official legislative enactment following publication in the Official Journal of the European Union, commencing the 21-month and 36-month transition periods.",
    highlights: [
      "Publication in EU Official Journal (L series)",
      "Standardisation request issued to CEN/CENELEC/ETSI",
      "Commencement of statutory transitional countdowns"
    ],
    mandatoryActions: [
      "Commenced transitional period across European industry",
      "Notified European standardisation organisations to draft harmonised standards"
    ],
    penalties: "Legislative baseline established."
  }
];

export default function TimelineRadarPage() {
  const [flippedCards, setFlippedCards] = React.useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
                { label: "Enforcement Timeline" }
              ]}
            />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dutchOrange/10 border border-dutchOrange/30 text-dutchOrange text-xs font-mono font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>Pillar 2 // Statutory Enforcement Roadmap</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
                  CRA Regulatory <span className="text-dutchOrange">Enforcement Timeline</span>
                </h1>
                <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
                  Chronological roadmap of statutory dates, transitional milestones, and multi-regulation collisions. 
                  Explore binding operational obligations from the September 2026 ENISA reporting mandate to December 2027 full CE marking.
                </p>
              </div>

              {/* Quick Jump Ribbon */}
              <div className="p-4 rounded-2xl bg-canvas border border-hairline font-mono text-xs space-y-2 min-w-[280px]">
                <span className="text-muted text-[10px] uppercase block">Hub Navigation</span>
                <div className="space-y-1">
                  <Link href="/cra-hub" className="text-secondary hover:text-dutchOrange block">← Back to Hub Landing</Link>
                  <Link href="/cra-hub/requirements" className="text-secondary hover:text-dutchOrange block">→ Pillar 1: Statutory Requirements</Link>
                  <Link href="/cra-hub/directory" className="text-secondary hover:text-dutchOrange block">→ Pillar 3: 18-Tool Directory</Link>
                  <Link href="/cra-hub/guides" className="text-secondary hover:text-dutchOrange block">→ Pillar 4: Deep Technical Guides</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Diagram Section */}
        <section className="py-12 bg-surface/30 border-b border-hairline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div>
              <span className="text-xs font-mono text-dutchOrange uppercase tracking-wider font-semibold">Timeline Visualization</span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-primary mt-1">
                Multi-Regulation Enforcement Trajectory
              </h2>
              <p className="text-sm text-secondary mt-1">
                Visual progression highlighting the critical January 2027 Machinery Regulation collision ahead of CRA full application.
              </p>
            </div>

            <MermaidDiagram chart={TIMELINE_MERMAID} />
          </div>
        </section>

        {/* Milestone Deep Dives with 3D Flip Cards */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-dutchOrange uppercase tracking-wider font-semibold">Interactive Statutory Milestones</span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-primary mt-1">
                  Operational Action Plans & Technical Dossiers
                </h2>
                <p className="text-sm text-secondary mt-1">
                  Click any card to flip between strategic overview and mandatory engineering deliverables with statutory penalties.
                </p>
              </div>

              <span className="text-xs font-mono text-muted">
                Tip: Click card to flip
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MILESTONES.map((milestone) => {
                const isFlipped = !!flippedCards[milestone.id];

                return (
                  <div
                    key={milestone.id}
                    className="relative min-h-[340px] cursor-pointer perspective-1000"
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

        {/* Backlinks & Navigation Footer */}
        <section className="py-12 bg-surface/20 border-t border-hairline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <Link href="/cra-hub/requirements" className="text-secondary hover:text-dutchOrange flex items-center gap-1">
              ← Pillar 1: Statutory Requirements
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/cra-hub/directory" className="text-dutchOrange font-bold hover:underline">
                Explore 18-Tool Directory →
              </Link>
              <Link href="/cra-hub/guides/article-14-playbook" className="text-dutchOrange font-bold hover:underline">
                Read Article 14 Playbook →
              </Link>
            </div>
          </div>
        </section>
      </SiteChrome>
    </main>
  );
}
