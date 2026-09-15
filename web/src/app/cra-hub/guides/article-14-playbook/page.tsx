"use client";

import React from "react";
import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Clock,
  Layers,
  Building
} from "lucide-react";

const PLAYBOOK_MERMAID = `stateDiagram-v2
    [*] --> Detection: Active Exploit Discovered in Field
    
    Detection --> Triage: Internal Verification (Within 4 Hours)
    Triage --> EarlyWarningGate: Credible Evidence of Malicious Exploit?
    
    EarlyWarningGate --> Article14Notice: YES
    EarlyWarningGate --> InternalPatch: NO (Normal Defect)
    
    state Article14Notice {
        [*] --> Stage1_24h: Submit 24h Early Warning to ENISA SRP
        Stage1_24h --> Stage2_72h: Conduct Forensics & CVSS Triage (72 Hours)
        Stage2_72h --> Stage3_14d: Compile Fix & Submit Final Report (14 Days Post-Fix)
    }
    
    InternalPatch --> [*]
    Stage3_14d --> [*]`;

export default function Article14PlaybookPage() {
  return (
    <main className="min-h-screen bg-canvas text-primary relative font-sans selection:bg-dutchOrange selection:text-white transition-colors duration-300">
      <SiteChrome>
        {/* Header */}
        <section className="relative overflow-hidden border-b border-hairline bg-surface/50 pt-28 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "CRA Conformity Hub", href: "/cra-hub" },
                { label: "Guides", href: "/cra-hub/guides" },
                { label: "Article 14 Early Warning Playbook" }
              ]}
            />

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-mono font-semibold">
                <Clock className="w-4 h-4" />
                <span>Statutory Incident Response Playbook // Active Law</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
                Article 14 Early Warning Playbook: Notifying ENISA in 24 Hours
              </h1>
              <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
                Step-by-step incident response procedures for product security leads to report actively exploited vulnerabilities to the ENISA Single Reporting Platform and national CSIRTs.
              </p>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-secondary leading-relaxed">
          {/* Truth Box */}
          <div className="p-6 rounded-2xl bg-surface border border-red-500/40 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-red-500 font-bold font-mono text-sm uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Eigenia Labs Empirical Truth Box</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-canvas border border-hairline">
                <span className="text-red-500 font-semibold block mb-1">September 11, 2026</span>
                <p className="text-secondary text-[11px] leading-relaxed">
                  Article 14 reporting through ENISA Single Reporting Platform is active law today across all 27 EU member states.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-canvas border border-hairline">
                <span className="text-red-500 font-semibold block mb-1">Strict Trigger Threshold</span>
                <p className="text-secondary text-[11px] leading-relaxed">
                  The 24h clock starts the instant active exploitation in the wild is confirmed, NOT when a root cause or fix is authored.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-canvas border border-hairline">
                <span className="text-red-500 font-semibold block mb-1">Centralized Routing</span>
                <p className="text-secondary text-[11px] leading-relaxed">
                  The ENISA SRP automatically encrypts and broadcasts alerts to the national CSIRTs of all impacted member states.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-canvas border border-hairline">
                <span className="text-red-500 font-semibold block mb-1">Non-Compliance Fines</span>
                <p className="text-secondary text-[11px] leading-relaxed">
                  Concealing active exploits or missing deadlines risks fines up to €15,000,000 or 2.5% of annual worldwide revenue.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Diagram */}
          <section className="space-y-6">
            <div>
              <span className="text-xs font-mono text-red-500 uppercase tracking-wider font-semibold">Incident Response State Machine</span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-primary mt-1">
                Article 14 Incident Triage & Reporting Workflow
              </h2>
            </div>

            <MermaidDiagram chart={PLAYBOOK_MERMAID} />
          </section>

          {/* Section: Data Fields */}
          <section className="space-y-4 text-sm sm:text-base">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-primary mt-1">
              Six Mandatory Data Fields for the 24-Hour Early Warning
            </h2>
            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 rounded-xl bg-surface border border-hairline flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-primary">1. Manufacturer Legal Identification:</span> Legal entity name, European business address, and unique VAT or EORI number.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface border border-hairline flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-primary">2. Statutory Point of Contact:</span> Direct telephone number and PGP-encrypted email of the designated incident lead.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface border border-hairline flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-primary">3. Product Identification:</span> Commercial model name, hardware revisions, and specific firmware or software build hashes.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface border border-hairline flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-primary">4. Nature of Malicious Exploitation:</span> Brief summary of how the exploit was detected (e.g. telemetry trigger, threat intel report).
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface border border-hairline flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-primary">5. Initial Impact Indicator:</span> High-level assessment of whether state-sponsored or ransomware groups are involved.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface border border-hairline flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-primary">6. Cross-Border Distribution Scope:</span> List of European member states where the affected PDE has been deployed.
                </div>
              </div>
            </div>
          </section>

          {/* Navigation & Backlinks Footer */}
          <div className="pt-8 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <Link href="/cra-hub/guides" className="text-secondary hover:text-dutchOrange">
              ← Back to Guides Index
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/cra-hub/timeline" className="text-dutchOrange font-bold hover:underline">
                View Enforcement Timeline →
              </Link>
              <Link href="/cra-hub/directory" className="text-dutchOrange font-bold hover:underline">
                Explore Directory →
              </Link>
            </div>
          </div>
        </article>
      </SiteChrome>
    </main>
  );
}
