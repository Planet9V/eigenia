"use client";

import React from "react";
import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { 
  FileText, 
  ShieldCheck, 
  Clock, 
  Database, 
  Scale, 
  ArrowRight,
  Cpu,
  Layers,
  CheckCircle2
} from "lucide-react";

export default function GuidesIndexPage() {
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
                { label: "Technical Guides" }
              ]}
            />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dutchOrange/10 border border-dutchOrange/30 text-dutchOrange text-xs font-mono font-semibold">
                  <FileText className="w-4 h-4" />
                  <span>Pillar 5 // Technical Guides & Operational Playbooks</span>
                </div>
                <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
                  CRA Technical <span className="text-dutchOrange">Guides & Playbooks</span>
                </h1>
                <p className="text-base sm:text-lg text-secondary font-light leading-relaxed max-w-2xl">
                  Peer-reviewed technical publications, empirical comparisons, and operational playbooks authored by Eigenia Labs. 
                  Designed for engineering leaders, product security leads, and regulatory directors.
                </p>
              </div>

              {/* Quick Jump Ribbon */}
              <div className="p-4 rounded-2xl bg-canvas border border-hairline font-mono text-xs space-y-2 min-w-[280px]">
                <span className="text-muted text-[10px] uppercase block">Hub Navigation</span>
                <div className="space-y-1">
                  <Link href="/cra-hub" className="text-secondary hover:text-dutchOrange block">← Back to Hub Overview</Link>
                  <Link href="/cra-hub/requirements" className="text-secondary hover:text-dutchOrange block">→ Pillar 2: Statutory Requirements</Link>
                  <Link href="/cra-hub/timeline" className="text-secondary hover:text-dutchOrange block">→ Pillar 3: Enforcement Timeline</Link>
                  <Link href="/cra-hub/directory" className="text-secondary hover:text-dutchOrange block">→ Pillar 4: 18-Tool Directory</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Guide 1 */}
              <div className="p-8 rounded-2xl bg-surface border border-hairline flex flex-col justify-between space-y-6 hover:border-dutchOrange/50 transition-colors shadow-xs">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-dutchOrange/10 text-dutchOrange font-mono text-[10px] font-bold">
                      Tools Benchmark
                    </span>
                    <span className="text-xs font-mono text-muted">20 min read</span>
                  </div>

                  <h2 className="text-xl font-bold text-primary hover:text-dutchOrange transition-colors">
                    <Link href="/cra-hub/guides/tools-comparison">
                      The Complete Guide to EU CRA Compliance Tools and Services (2026 Comparison)
                    </Link>
                  </h2>

                  <p className="text-xs text-secondary leading-relaxed">
                    Independent evaluation of 18 leading commercial and open-source platforms. Includes verified pricing tiers, CycloneDX SBOM depth analysis, and Module A vs B/C/H conformity assessment fit.
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-hairline text-xs text-secondary">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>18 Tools Compared</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Empirical Truth Box</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>5-Question User FAQ</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-hairline">
                  <Link
                    href="/cra-hub/guides/tools-comparison"
                    className="text-xs font-mono text-dutchOrange font-bold flex items-center justify-between hover:underline"
                  >
                    <span>Read In-Depth Comparison</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Guide 2 */}
              <div className="p-8 rounded-2xl bg-surface border border-hairline flex flex-col justify-between space-y-6 hover:border-dutchOrange/50 transition-colors shadow-xs">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-dutchOrange/10 text-dutchOrange font-mono text-[10px] font-bold">
                      Industrial OT / ICS
                    </span>
                    <span className="text-xs font-mono text-muted">18 min read</span>
                  </div>

                  <h2 className="text-xl font-bold text-primary hover:text-dutchOrange transition-colors">
                    <Link href="/cra-hub/guides/industrial-ot">
                      Industrial OT and Embedded Systems Under CRA: Navigating IEC 62443
                    </Link>
                  </h2>

                  <p className="text-xs text-secondary leading-relaxed">
                    Technical guide for industrial machine builders and device manufacturers navigating the January 20, 2027 Machinery Regulation (EU) 2023/1230 overlap and Class II Notified Body audit routes.
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-hairline text-xs text-secondary">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Machinery Reg (EU) 2023/1230 Bridge</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>IEC 62443-4-1 & 4-2 Mapping</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Binary Firmware Disassembly</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-hairline">
                  <Link
                    href="/cra-hub/guides/industrial-ot"
                    className="text-xs font-mono text-dutchOrange font-bold flex items-center justify-between hover:underline"
                  >
                    <span>Read Industrial Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Guide 3 */}
              <div className="p-8 rounded-2xl bg-surface border border-hairline flex flex-col justify-between space-y-6 hover:border-dutchOrange/50 transition-colors shadow-xs">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-500 font-mono text-[10px] font-bold">
                      Active Law Today
                    </span>
                    <span className="text-xs font-mono text-muted">15 min read</span>
                  </div>

                  <h2 className="text-xl font-bold text-primary hover:text-dutchOrange transition-colors">
                    <Link href="/cra-hub/guides/article-14-playbook">
                      Article 14 Early Warning Playbook: Notifying ENISA in 24 Hours
                    </Link>
                  </h2>

                  <p className="text-xs text-secondary leading-relaxed">
                    Operational procedure for product security and incident response teams to report actively exploited vulnerabilities to the ENISA Single Reporting Platform and national CSIRTs without leaking exploit data.
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-hairline text-xs text-secondary">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>24h Early Warning Fields</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>72h Technical Dossier Flow</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Anti-Leak Triage Protocols</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-hairline">
                  <Link
                    href="/cra-hub/guides/article-14-playbook"
                    className="text-xs font-mono text-dutchOrange font-bold flex items-center justify-between hover:underline"
                  >
                    <span>Read Operational Playbook</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
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
              <Link href="/cra-hub/directory" className="text-dutchOrange font-bold hover:underline">
                Explore 18-Tool Directory →
              </Link>
              <Link href="/cra-hub/requirements" className="text-dutchOrange font-bold hover:underline">
                View Statutory Requirements →
              </Link>
            </div>
          </div>
        </section>
      </SiteChrome>
    </main>
  );
}
