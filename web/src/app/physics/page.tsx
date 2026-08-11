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
    <main className="min-h-screen bg-canvas text-primary relative font-sans selection:bg-dutchOrange selection:text-white transition-colors duration-300">
      <Navbar
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenCookies={() => setCookiesForceOpen(true)}
      />

      {/* Main Header Container */}
      <section className="bg-canvas pt-28 pb-12 border-b border-hairline transition-colors duration-300">
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
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-primary">
              Applied Physics Frameworks
            </h1>
            <p className="text-base sm:text-lg text-secondary font-light leading-relaxed max-w-3xl">
              Nine mathematical models mapping physical control loops, thermodynamic phase transitions, epidemiological vulnerability spread, and heavy-tailed catastrophe risk.
            </p>
          </div>

          {/* Intro Summary Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs pt-4">
            {/* Card 1: Catastrophe Cyber Actuarial Engine */}
            <motion.a
              href="#actuarial"
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-8 rounded-2xl bg-surface border border-hairline hover:border-dutchOrange/50 transition-all space-y-4 shadow-xl block group border-l-4 border-l-dutchOrange"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5 text-dutchOrange" />
                </div>
                <ArrowDownRight className="w-5 h-5 text-muted group-hover:text-dutchOrange transition-colors" />
              </div>

              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium block">
                Actuarial Risk Framework
              </span>

              <h2 className="font-sans text-xl font-semibold text-primary group-hover:text-dutchOrange transition-colors">
                Actuarial Cyber Catastrophe Engine
              </h2>

              <p className="text-sm text-secondary font-sans leading-relaxed font-light">
                Portfolio risk modeling built on 4-module catastrophe frameworks, Exceedance Probability (EP) loss curves, Rotated 90° Clayton Copulas, and Lloyd's Market Bulletin Y5381 war exclusion filters.
              </p>
            </motion.a>

            {/* Card 2: 9 Core Mathematical Physics Frameworks */}
            <motion.a
              href="#catalogue"
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-8 rounded-2xl bg-surface border border-hairline hover:border-dutchOrange/50 transition-all space-y-4 shadow-xl block group border-l-4 border-l-dutchOrange"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                  <Binary className="w-5 h-5 text-dutchOrange" />
                </div>
                <ArrowDownRight className="w-5 h-5 text-muted group-hover:text-dutchOrange transition-colors" />
              </div>

              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium block">
                9 Research Monographs
              </span>

              <h2 className="font-sans text-xl font-semibold text-primary group-hover:text-dutchOrange transition-colors">
                9 Core Physics & Mathematical Frameworks
              </h2>

              <p className="text-sm text-secondary font-sans leading-relaxed font-light">
                Comprehensive catalogue of open-access physics papers, equations, and control loop equations spanning cyber-physical systems.
              </p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Actuarial Engine Specification Section */}
      <ActuarialEngineSection />

      {/* Theory Catalogue Section */}
      <TheoryCatalogue />

      <EuComplianceFooter
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenCookies={() => setCookiesForceOpen(true)}
      />

      <ImpressumModal
        isOpen={impressumOpen}
        onClose={() => setImpressumOpen(false)}
      />

      <CookieConsentBanner forceOpen={cookiesForceOpen} />
    </main>
  );
}
