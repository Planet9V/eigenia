"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ActuarialEngineSection } from "@/components/ActuarialEngineSection";
import { TheoryCatalogue } from "@/components/TheoryCatalogue";
import { EuComplianceFooter } from "@/components/EuComplianceFooter";
import { ImpressumModal } from "@/components/ImpressumModal";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ArrowDownRight, FileSpreadsheet, Binary } from "lucide-react";
import { motion } from "framer-motion";

export default function AppliedPhysicsPage() {
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [cookiesForceOpen, setCookiesForceOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0b0c0e] text-white relative font-sans selection:bg-dutchOrange selection:text-white">
      <Navbar
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenCookies={() => setCookiesForceOpen(true)}
      />

      {/* Main Header Container (Obsidian Hero Band #0b0c0e) */}
      <section className="bg-[#0b0c0e] pt-28 pb-12 border-b border-zinc-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Breadcrumb Navigation */}
          <Breadcrumb
            items={[
              { label: "Applied Physics", href: "/physics" },
              { label: "Actuarial Engine & Mathematical Physics Models" },
            ]}
          />

          {/* Page Header */}
          <div className="max-w-4xl space-y-4">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
              Applied Physics & Mathematical Frameworks
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-white">
              Applied Physics Frameworks
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-3xl">
              Nine mathematical models mapping physical control loops, thermodynamic phase transitions, epidemiological vulnerability spread, and heavy-tailed catastrophe risk.
            </p>
          </div>

          {/* Intro Summary Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs pt-4">
            
            {/* Card 1: Catastrophe Cyber Actuarial Engine */}
            <motion.a
              href="#actuarial"
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-8 rounded-2xl bg-[#131519] border border-[#22252c] hover:border-zinc-700/60 transition-all space-y-4 shadow-xl block group border-l-4 border-l-dutchOrange"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5 text-dutchOrange" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-dutchOrange uppercase font-medium">
                  TRACK 03 // ACTUARIAL SCIENCE
                </span>
              </div>
              <h3 className="font-sans text-xl font-semibold text-white group-hover:text-dutchOrange transition-colors">
                Cyber Actuarial Engine
              </h3>
              <p className="text-xs text-zinc-300 font-sans font-light leading-relaxed">
                Clayton copula tail dependence models, Exceedance Probability (EP) loss curves, and automated Lloyd's Market Bulletin Y5381 war exclusion filters.
              </p>
              <div className="flex items-center gap-1.5 text-dutchOrange text-xs font-semibold pt-2 border-t border-zinc-900">
                <span>Inspect Actuarial Specification</span>
                <ArrowDownRight className="w-4 h-4" />
              </div>
            </motion.a>

            {/* Card 2: Mathematical Physics Catalogue */}
            <motion.a
              href="#theory"
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-8 rounded-2xl bg-[#131519] border border-[#22252c] hover:border-zinc-700/60 transition-all space-y-4 shadow-xl block group border-l-4 border-l-dutchOrange"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                  <Binary className="w-5 h-5 text-dutchOrange" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-dutchOrange uppercase font-medium">
                  RESEARCH // 9 THEORY MODELS
                </span>
              </div>
              <h3 className="font-sans text-xl font-semibold text-white group-hover:text-dutchOrange transition-colors">
                Physics Catalogue
              </h3>
              <p className="text-xs text-zinc-300 font-sans font-light leading-relaxed">
                Gated Graph Neural Networks, KL divergence asset drift, Lacanian psychometrics, Kramers escape rates, and thermodynamic phase transition proofs.
              </p>
              <div className="flex items-center gap-1.5 text-dutchOrange text-xs font-semibold pt-2 border-t border-zinc-900">
                <span>Inspect Mathematical Models</span>
                <ArrowDownRight className="w-4 h-4" />
              </div>
            </motion.a>

          </div>

        </div>
      </section>

      {/* Track 3: Cyber Actuarial Component */}
      <ActuarialEngineSection />

      {/* Applied Physics & Mathematical Frameworks Catalogue Component */}
      <TheoryCatalogue />

      <EuComplianceFooter
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenCookies={() => setCookiesForceOpen(true)}
      />

      <ImpressumModal isOpen={impressumOpen} onClose={() => setImpressumOpen(false)} />
      <CookieConsentBanner forceOpen={cookiesForceOpen} onCloseForceOpen={() => setCookiesForceOpen(false)} />
    </main>
  );
}
