"use client";

import React, { useState, use } from "react";
import { Navbar } from "@/components/Navbar";
import { EuComplianceFooter } from "@/components/EuComplianceFooter";
import { ImpressumModal } from "@/components/ImpressumModal";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { theoryModelsList, TheoryModel } from "@/components/TheoryCatalogue";
import { ArrowLeft, Layers, Cpu, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MathFormula } from "@/components/MathFormula";

interface PageParams {
  slug: string;
}

export default function TheoryDetailPage({ params }: { params: Promise<PageParams> }) {
  const resolvedParams = use(params);
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [cookiesForceOpen, setCookiesForceOpen] = useState(false);

  const model: TheoryModel = theoryModelsList.find(
    (item) => item.slug === resolvedParams.slug
  ) || theoryModelsList[0];

  return (
    <main className="min-h-screen bg-[#0b0c0e] text-white relative font-sans selection:bg-dutchOrange selection:text-white">
      <Navbar
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenCookies={() => setCookiesForceOpen(true)}
      />

      {/* Hero Header Band (#0b0c0e) */}
      <section className="bg-[#0b0c0e] pt-28 pb-12 border-b border-zinc-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Breadcrumb
            items={[
              { label: "Applied Physics", href: "/physics" },
              { label: model.name },
            ]}
          />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-4xl space-y-4">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
                {model.number} // {model.tag}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-white leading-tight">
                {model.name}
              </h1>
            </div>

            <Link
              href="/physics#theory"
              className="px-4 py-2 rounded-xl bg-[#131519] border border-zinc-800 text-xs font-mono font-medium text-zinc-300 hover:text-dutchOrange hover:border-dutchOrange transition-all flex items-center gap-2 flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-dutchOrange" /> Applied Physics Catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Section (#121417) */}
      <section className="bg-[#121417] py-16 border-b border-zinc-900/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="p-8 sm:p-10 rounded-2xl bg-[#131519] border border-[#22252c] shadow-xl space-y-8">
            
            {/* Formula Callout with KaTeX Typesetting */}
            <div className="p-6 rounded-xl bg-[#0b0c0e] border border-zinc-800/60 space-y-4 shadow-inner">
              <div className="flex items-center justify-between text-xs font-mono text-dutchOrange uppercase tracking-wider">
                <span>Governing Mathematical Equation</span>
                <Cpu className="w-4 h-4 text-dutchOrange" />
              </div>
              <div className="py-4 text-center overflow-x-auto">
                <MathFormula formula={model.formula} />
              </div>
            </div>

            {/* Core Description */}
            <div className="space-y-4 text-zinc-300 font-sans text-base sm:text-lg leading-relaxed font-light">
              <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider text-dutchOrange">
                Systemic Risk Mechanism & Physics Formulation
              </h2>
              <p>{model.description}</p>
            </div>

            {/* Deliverables & Technical Proofs */}
            <div className="space-y-4 pt-6 border-t border-zinc-900 font-sans">
              <h2 className="text-base font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-dutchOrange" /> Key Technical Deliverables
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs pt-2">
                {model.deliverables.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#0b0c0e] border border-zinc-800/60 text-zinc-300 flex items-start gap-2">
                    <span className="text-dutchOrange font-bold mt-0.5">&bull;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Physical Application */}
            <div className="space-y-4 pt-6 border-t border-zinc-900">
              <h2 className="text-base font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-dutchOrange" /> Applied Sovereign Defense Integration
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed font-light">
                This mathematical framework is integrated into Eigenia's Digital Twin Engine to replace fragile compliance checklists with continuous physical safety proofs for critical energy, water, and food networks.
              </p>
            </div>

          </div>

        </div>
      </section>

      <EuComplianceFooter
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenCookies={() => setCookiesForceOpen(true)}
      />

      <ImpressumModal isOpen={impressumOpen} onClose={() => setImpressumOpen(false)} />
      <CookieConsentBanner forceOpen={cookiesForceOpen} onCloseForceOpen={() => setCookiesForceOpen(false)} />
    </main>
  );
}
