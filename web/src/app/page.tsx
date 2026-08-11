"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { KnowledgeTransfer } from "@/components/KnowledgeTransfer";
import { SCurveSection } from "@/components/SCurveSection";
import { Principles } from "@/components/Principles";
import { EuComplianceFooter } from "@/components/EuComplianceFooter";
import { ImpressumModal } from "@/components/ImpressumModal";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { FirstVisitSplash } from "@/components/FirstVisitSplash";
import { ArrowRight, Compass, Layers, Cpu, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [cookiesForceOpen, setCookiesForceOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0b0c0e] text-white transition-colors duration-300 relative font-sans selection:bg-dutchOrange selection:text-white">
      {/* First Visit Atmospheric Splash Entrance Sequence */}
      <FirstVisitSplash />

      {/* Top Navbar */}
      <Navbar
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenCookies={() => setCookiesForceOpen(true)}
      />

      {/* Hero Section (Obsidian Band #0b0c0e) */}
      <Hero />

      {/* Standalone Route Navigation Portals Showcase (Charcoal Band #121417) */}
      <section className="py-20 bg-[#121417] border-b border-zinc-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
              Eigenia Labs Research Portals
            </span>
            <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-white">
              Scientific Domains & R&D Portals
            </h2>
            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              Explore dedicated research routes across sovereign mission constitution, probabilistic tail-risk tracks, DEXPI open standards, and pro-bono defense partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
            
            {/* Portal 1: Mission */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-8 rounded-2xl bg-[#131519] border border-[#22252c] hover:border-zinc-700/60 transition-all space-y-5 shadow-xl group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium block">
                  Track 01 // Sovereign
                </span>
                <h3 className="font-sans text-lg font-semibold text-white group-hover:text-dutchOrange transition-colors">
                  Sovereign Mission
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Clean Water, Healthy Food, and Sustainable Energy protection through mathematical physics and constitution.
                </p>
              </div>

              <Link
                href="/mission"
                className="pt-4 border-t border-zinc-900/80 text-dutchOrange font-bold flex items-center justify-between group-hover:translate-x-1 transition-transform"
              >
                <span>Explore Mission</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Portal 2: Research Tracks */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-8 rounded-2xl bg-[#131519] border border-[#22252c] hover:border-zinc-700/60 transition-all space-y-5 shadow-xl group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium block">
                  Track 02 // Research
                </span>
                <h3 className="font-sans text-lg font-semibold text-white group-hover:text-dutchOrange transition-colors">
                  Research Tracks
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  3 Core Research Tracks: Taleb Probabilistic Risk Series, DEXPI 2.0 P&ID Topology, and Catastrophe Actuarial Engine.
                </p>
              </div>

              <Link
                href="/tracks"
                className="pt-4 border-t border-zinc-900/80 text-dutchOrange font-bold flex items-center justify-between group-hover:translate-x-1 transition-transform"
              >
                <span>Explore Tracks</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Portal 3: Applied Physics */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-8 rounded-2xl bg-[#131519] border border-[#22252c] hover:border-zinc-700/60 transition-all space-y-5 shadow-xl group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium block">
                  Track 03 // Models
                </span>
                <h3 className="font-sans text-lg font-semibold text-white group-hover:text-dutchOrange transition-colors">
                  Applied Physics
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  9 Applied Mathematical & Physical Models including GGNN Directed Graph Topology, L0/L1 Gap Calculus, and Psychometric Tensors.
                </p>
              </div>

              <Link
                href="/physics"
                className="pt-4 border-t border-zinc-900/80 text-dutchOrange font-bold flex items-center justify-between group-hover:translate-x-1 transition-transform"
              >
                <span>Explore Physics</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Portal 4: Collaborate */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-8 rounded-2xl bg-[#131519] border border-[#22252c] hover:border-zinc-700/60 transition-all space-y-5 shadow-xl group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium block">
                  Track 04 // Defense
                </span>
                <h3 className="font-sans text-lg font-semibold text-white group-hover:text-dutchOrange transition-colors">
                  Collaborate
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  100% Pro-bono sovereign defense projects, academic fellowships, and commercial actuarial stress-testing.
                </p>
              </div>

              <Link
                href="/collaborate"
                className="pt-4 border-t border-zinc-900/80 text-dutchOrange font-bold flex items-center justify-between group-hover:translate-x-1 transition-transform"
              >
                <span>Apply to Labs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* S-Curve Phase Transitions Section (Obsidian Band #0b0c0e) */}
      <SCurveSection />

      {/* Principles Section (Charcoal Band #121417) */}
      <Principles />

      {/* Knowledge Transfer Pipeline Section (Elevated Slate Band #16181d) */}
      <KnowledgeTransfer />

      {/* Footer */}
      <EuComplianceFooter
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenCookies={() => setCookiesForceOpen(true)}
      />

      {/* Modals & Banners */}
      <ImpressumModal isOpen={impressumOpen} onClose={() => setImpressumOpen(false)} />
      <CookieConsentBanner forceOpen={cookiesForceOpen} onCloseForceOpen={() => setCookiesForceOpen(false)} />
    </main>
  );
}
