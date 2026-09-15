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
  Cpu,
  Layers,
  Scale
} from "lucide-react";

const IEC_MAPPING_CHART = `flowchart TD
    subgraph CRA_Annex_I [CRA Annex I Essential Requirements]
        C1[Sec. 1: Security by Design & Minimal Surface]
        C2[Sec. 2: Exploit Protection & Memory Safety]
        C3[Sec. 3: Cryptographic Integrity & Confidentiality]
        C4[Part II: Vulnerability Handling & 10-Yr Patching]
    end

    subgraph IEC_62443 [ISA/IEC 62443 Standard Suite]
        I1[IEC 62443-4-1: Secure Product Development Lifecycle]
        I2[IEC 62443-4-2: Foundational Requirements FR1-FR7]
        I3[IEC 62443-3-3: System Security Requirements & SL-2]
    end

    subgraph Machinery_Reg [Machinery Regulation EU 2023/1230]
        M1[Annex III Sec. 1.1.9: Protection against Corruption]
        M2[Functional Safety Loops EN ISO 13849 / IEC 62061]
    end

    I1 --> C4
    I2 --> C1
    I2 --> C2
    I2 --> C3
    I3 --> M1
    M1 --> C1
    
    classDef main fill:#131519,stroke:#E05A10,color:#E8E3DA;
    class C1,C2,C3,C4,I1,I2,I3,M1,M2 main;`;

export default function IndustrialOtGuidePage() {
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
                { label: "Industrial OT & IEC 62443" }
              ]}
            />

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dutchOrange/10 border border-dutchOrange/30 text-dutchOrange text-xs font-mono font-semibold">
                <Cpu className="w-4 h-4" />
                <span>Industrial OT & Embedded Systems Guide</span>
              </div>
              <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
                Industrial OT and Embedded Systems Under CRA
              </h1>
              <p className="text-base sm:text-lg text-secondary font-light leading-relaxed">
                Navigating the January 20, 2027 Machinery Regulation (EU) 2023/1230 enforcement date, IEC 62443 harmonisation, and Class II Notified Body audit routes.
              </p>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-secondary leading-relaxed">
          {/* Truth Box */}
          <div className="p-6 rounded-2xl bg-surface border border-dutchOrange/40 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-dutchOrange font-bold font-mono text-sm uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Eigenia Labs Empirical Truth Box</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-canvas border border-hairline">
                <span className="text-dutchOrange font-semibold block mb-1">Jan 20, 2027 Collision</span>
                <p className="text-secondary text-[11px] leading-relaxed">
                  Machinery Regulation takes effect 11 months before CRA full application, requiring cyber resilience for CE marking.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-canvas border border-hairline">
                <span className="text-dutchOrange font-semibold block mb-1">Mandatory Class II Audits</span>
                <p className="text-secondary text-[11px] leading-relaxed">
                  Industrial controllers and firewalls are Annex IV Class II PDE, requiring third-party Notified Body certification.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-canvas border border-hairline">
                <span className="text-dutchOrange font-semibold block mb-1">IEC 62443 Synergy</span>
                <p className="text-secondary text-[11px] leading-relaxed">
                  IEC 62443-4-1 (SDL) and 62443-4-2 (Technical Requirements) satisfy over 80% of CRA Annex I technical mandates.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-canvas border border-hairline">
                <span className="text-dutchOrange font-semibold block mb-1">Binary Firmware SBOMs</span>
                <p className="text-secondary text-[11px] leading-relaxed">
                  Third-party compiled RTOS binaries must be decomposed into machine-readable CycloneDX SBOMs.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Diagram */}
          <section className="space-y-6">
            <div>
              <span className="text-xs font-mono text-dutchOrange uppercase tracking-wider font-semibold">Technical Architecture Map</span>
              <h2 className="text-2xl font-bold text-primary mt-1">
                Harmonizing IEC 62443 with CRA Annex I and Machinery Safety
              </h2>
            </div>

            <MermaidDiagram chart={IEC_MAPPING_CHART} />
          </section>

          {/* Section: Content */}
          <section className="space-y-4 text-sm sm:text-base">
            <h2 className="text-2xl font-bold text-primary tracking-tight">
              The Dual Regulatory Mandate for Industrial Equipment
            </h2>
            <p>
              Industrial automation device builders face a critical timeline. Machinery Regulation (EU) 2023/1230 becomes mandatory on January 20, 2027. Annex III Section 1.1.9 explicitly requires machine hardware and software connections to withstand external cyber corruption.
            </p>
            <p>
              Eleven months later, in December 2027, the Cyber Resilience Act mandates full security by design, 10-year technical files, and continuous vulnerability reporting for all connected industrial equipment.
            </p>
          </section>

          {/* Navigation & Backlinks Footer */}
          <div className="pt-8 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <Link href="/cra-hub/guides" className="text-secondary hover:text-dutchOrange">
              ← Back to Guides Index
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/cra-hub/guides/article-14-playbook" className="text-dutchOrange font-bold hover:underline">
                Next: Article 14 Playbook →
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
