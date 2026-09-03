"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers, ShieldCheck, GitMerge } from "lucide-react";
import { motion } from "framer-motion";

export const UnifiedStandardBand: React.FC = () => {
  return (
    <section className="py-20 bg-subtle text-primary relative font-sans border-b border-hairline overflow-hidden transition-colors duration-300">
      {/* Subtle Background Radial Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-dutchOrange/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Contextual Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-dutchOrange animate-pulse" />
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-semibold">
                  Open Architecture Standard // DEXPI 2.0 &amp; CycloneDX 1.6+
                </span>
              </div>

              <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-primary leading-snug">
                The Unified Standard:{" "}
                <span className="text-dutchOrange">
                  Topological BIM &amp; Hierarchical BOM
                </span>
              </h2>

              <div className="w-12 h-0.5 bg-dutchOrange/40 rounded-full my-3" />

              <p className="text-sm sm:text-base text-secondary font-light leading-relaxed">
                Critical utilities and AI datacenters have long been trapped in proprietary CAD/BIM walled gardens. The Unified Standard bridges physical P&amp;ID equipment topology (ISO 15926 / DEXPI 2.0) with full-spectrum supply chain bill of materials transparency (OWASP CycloneDX 1.6+).
              </p>

              <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
                By formalizing the single computable graph schema <span className="font-mono text-dutchOrange">G_CPDT</span>, operators model how firmware exploits directly precipitate physical thermodynamic catastrophes, fully air-gapped without cloud connectivity.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 pt-2 font-mono text-[11px] border-t border-hairline/60">
              <div className="space-y-0.5">
                <span className="text-muted block uppercase text-[9px] tracking-wider">Air-Gapped</span>
                <span className="text-primary font-semibold">100% Offline</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-muted block uppercase text-[9px] tracking-wider">BOM Classes</span>
                <span className="text-primary font-semibold">5-BOM Suite</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-muted block uppercase text-[9px] tracking-wider">Treatises</span>
                <span className="text-primary font-semibold">7 Papers</span>
              </div>
            </div>

            {/* Call to Action */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/unified-standard"
                className="px-6 py-3 rounded-xl bg-dutchOrange hover:bg-dutchOrange/90 text-white font-sans text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                <span>Explore The Unified Standard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/wiki?wg=WG-05-CAD"
                className="px-6 py-3 rounded-xl border border-hairline bg-surface text-primary font-sans text-xs sm:text-sm font-semibold hover:border-dutchOrange hover:text-dutchOrange transition-all inline-flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-dutchOrange" />
                <span>Working Group Treatises</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Layered Visual Composition (oxot_cdt_Pid + sbom_tree) */}
          <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[420px] flex items-center justify-center">
            
            {/* Layer 1: Background Faded Diagram (DEXPI P&ID Topology) */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="absolute left-0 top-0 w-[78%] h-[82%] rounded-2xl overflow-hidden border border-hairline shadow-2xl bg-surface/80 group"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/assets/oxot_cdt_Pid.png"
                  alt="DEXPI 2.0 P&ID Piping Topology"
                  fill
                  className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                {/* Micro Label */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm border border-white/10 font-mono text-[10px] text-zinc-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-dutchOrange" />
                  <span>DEXPI 2.0 // Piping Topology</span>
                </div>
              </div>
            </motion.div>

            {/* Layer 2: Foreground Layered Diagram (CycloneDX SBOM Tree) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="absolute right-0 bottom-0 w-[72%] h-[78%] rounded-2xl overflow-hidden border-2 border-hairline/90 shadow-2xl bg-surface/90 backdrop-blur-sm group hover:border-dutchOrange/60 transition-colors"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/assets/sbom_tree.png"
                  alt="CycloneDX 1.6+ Multi-BOM Tree"
                  fill
                  className="object-cover opacity-75 group-hover:opacity-90 transition-opacity duration-500 rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
                
                {/* Micro Label */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm border border-white/10 font-mono text-[10px] text-zinc-300 flex items-center gap-1.5">
                  <GitMerge className="w-3 h-3 text-dutchOrange" />
                  <span>CycloneDX 1.6+ // Hierarchical BOM</span>
                </div>

                {/* Overlapping Binding Badge */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-dutchOrange/20 border border-dutchOrange/40 font-mono text-[9px] text-dutchOrange font-semibold">
                  Binding Edge G_CPDT
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
