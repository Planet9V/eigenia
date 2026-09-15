"use client";

import React from "react";
import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MermaidDiagram } from "@/components/MermaidDiagram";
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
  FileText
} from "lucide-react";

const TIMELINE_MERMAID = `timeline
    title Cyber Resilience Act & European Regulatory Enforcement Calendar
    2024 : Nov 20 Publication in EU Official Journal : Dec 10 Entry into Force (20-day mark)
    2026 : Sep 11 ENISA Single Reporting Platform Live : Article 14 24h Early Warning Mandatory
    2027 : Jan 20 Machinery Reg (EU) 2023/1230 Mandatory : Dec 11 Full CRA Application & CE Marking`;

interface MilestoneItem {
  date: string;
  title: string;
  status: "ACTIVE NOW" | "UPCOMING" | "PASSED";
  regulation: string;
  summary: string;
  mandatoryActions: string[];
  penalties: string;
}

const MILESTONES: MilestoneItem[] = [
  {
    date: "September 11, 2026",
    title: "Article 14 Vulnerability & Incident Reporting Activation",
    status: "ACTIVE NOW",
    regulation: "Regulation (EU) 2024/2847, Article 14",
    summary: "Mandatory early warning system requiring manufacturers to notify ENISA and national CSIRTs within 24 hours of becoming aware of an actively exploited vulnerability.",
    mandatoryActions: [
      "Obtain authentication credentials for the ENISA Single Reporting Platform (SRP)",
      "Establish 24/7 internal incident triage roster for security alerts",
      "Draft pre-authorized communication templates for 24h early warning submissions",
      "Coordinate with European Authorised Representative (Article 11) for non-EU entities"
    ],
    penalties: "Administrative fines up to €15,000,000 or 2.5% of total worldwide annual turnover."
  },
  {
    date: "January 20, 2027",
    title: "Machinery Regulation (EU) 2023/1230 Enforcement",
    status: "UPCOMING",
    regulation: "Regulation (EU) 2023/1230, Annex III Section 1.1.9",
    summary: "Horizontal machinery safety regulation requiring all industrial machines with digital interfaces to be resilient against corruption from cyber attacks.",
    mandatoryActions: [
      "Implement hardware/software connection controls preventing physical hazard corruption",
      "Validate safety control loops under EN ISO 13849 and IEC 62061 with cybersecurity inputs",
      "Audit industrial Ethernet and wireless communication channels against spoofing",
      "Compile machinery technical files demonstrating resistance to unauthorized network access"
    ],
    penalties: "Market surveillance stop-sale orders, mandatory EU-wide product recalls, and civil liability."
  },
  {
    date: "December 11, 2027",
    title: "Full CRA Application & CE Marking Enforcement",
    status: "UPCOMING",
    regulation: "Regulation (EU) 2024/2847, Full Enactment",
    summary: "All Products with Digital Elements placed on the EU Single Market must fully conform to Annex I, hold an Annex VII technical file, and bear the CE mark.",
    mandatoryActions: [
      "Affix CE mark to hardware units, packaging, or digital documentation",
      "Sign official European Union Declaration of Conformity (EU DoC)",
      "Complete third-party Notified Body audits for Class I (if non-standard) and Class II products",
      "Lock down 10-year archival repository for firmware builds, SBOMs, and hazard analyses"
    ],
    penalties: "Total prohibition from commercial distribution across all 27 EU member states."
  },
  {
    date: "December 10, 2024",
    title: "Entry into Force of the Cyber Resilience Act",
    status: "PASSED",
    regulation: "Regulation (EU) 2024/2847, Article 71",
    summary: "The official legislative enactment following publication in the Official Journal of the European Union, initiating the 21-month and 36-month transition periods.",
    mandatoryActions: [
      "Commenced transitional period across European industry",
      "Notified European standardisation organisations (CEN/CENELEC/ETSI) to draft harmonised standards"
    ],
    penalties: "Legislative baseline established."
  }
];

export default function TimelineRadarPage() {
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
                  <span>Pillar 3 // Statutory Enforcement Radar</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
                  CRA Regulatory <span className="text-dutchOrange">Enforcement Timeline</span>
                </h1>
                <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
                  Chronological roadmap of statutory dates, transitional milestones, and multi-regulation collisions. 
                  Monitor critical obligations from the September 2026 ENISA reporting mandate to December 2027 full CE marking.
                </p>
              </div>

              {/* Quick Jump Ribbon */}
              <div className="p-4 rounded-2xl bg-canvas border border-hairline font-mono text-xs space-y-2 min-w-[280px]">
                <span className="text-muted text-[10px] uppercase block">Hub Navigation</span>
                <div className="space-y-1">
                  <Link href="/cra-hub" className="text-secondary hover:text-dutchOrange block">← Back to Hub Overview</Link>
                  <Link href="/cra-hub/requirements" className="text-secondary hover:text-dutchOrange block">→ Pillar 2: Statutory Requirements</Link>
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

        {/* Milestone Deep Dives */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div>
              <span className="font-mono text-xs text-dutchOrange uppercase tracking-wider font-semibold">Statutory Milestones</span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-primary mt-1">
                Operational Action Plans by Enforcement Date
              </h2>
              <p className="text-sm text-secondary mt-1">
                Detailed breakdowns of what engineering, compliance, and legal teams must complete at each statutory gate.
              </p>
            </div>

            <div className="space-y-6">
              {MILESTONES.map((milestone) => (
                <div 
                  key={milestone.date}
                  className={`p-8 rounded-2xl border space-y-6 transition-all ${
                    milestone.status === "ACTIVE NOW"
                      ? "bg-red-500/5 border-red-500/30 shadow-md"
                      : milestone.status === "UPCOMING"
                      ? "bg-surface border-hairline hover:border-dutchOrange/40"
                      : "bg-surface/50 border-hairline opacity-75"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded font-mono text-xs font-bold ${
                        milestone.status === "ACTIVE NOW"
                          ? "bg-red-500 text-white"
                          : milestone.status === "UPCOMING"
                          ? "bg-dutchOrange/10 text-dutchOrange border border-dutchOrange/30"
                          : "bg-subtle text-muted border border-hairline"
                      }`}>
                        {milestone.status}
                      </span>
                      <span className="font-mono text-sm font-bold text-primary">
                        {milestone.date}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-muted">
                      {milestone.regulation}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-primary">
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed mt-2">
                      {milestone.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2">
                      <span className="text-xs font-mono text-dutchOrange uppercase font-semibold block">
                        Mandatory Operational Deliverables:
                      </span>
                      <ul className="space-y-1.5">
                        {milestone.mandatoryActions.map((act, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-secondary">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-mono text-dutchOrange uppercase font-semibold block">
                        Statutory Non-Compliance Penalty:
                      </span>
                      <p className="text-xs text-secondary leading-relaxed bg-subtle p-3 rounded-xl border border-hairline">
                        {milestone.penalties}
                      </p>
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
            <Link href="/cra-hub/requirements" className="text-secondary hover:text-dutchOrange flex items-center gap-1">
              ← Pillar 2: Statutory Requirements
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
