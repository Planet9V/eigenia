"use client";

import React, { useState } from "react";
import { ArrowRight, LayoutGrid, List } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { motion } from "framer-motion";

export interface ResearchTrack {
  id: string;
  tag: string;
  titleKey: string;
  descKey: string;
  badge: string;
  bentoSpan: string;
  href: string;
  deliverables: string[];
}

export const researchTracksList: ResearchTrack[] = [
  {
    id: "track-1",
    tag: "Track 1 // Probabilistic Risk",
    titleKey: "track1_title",
    descKey: "track1_desc",
    badge: "OPEN SCIENCE PUBLICATION",
    bentoSpan: "col-span-1 md:col-span-2",
    href: "/papers/taleb-fooled-by-randomness",
    deliverables: [
      "5 Long-Form Peer-Reviewed Treatises (Taleb Framework)",
      "Peak-Over-Threshold (POT) Asymptotic Exceedance Formula",
      "L0/L1 Information Divergence Gap Calculus",
    ],
  },
  {
    id: "track-2",
    tag: "Track 2 // Cyber-Physical Open Standards",
    titleKey: "track2_title",
    descKey: "track2_desc",
    badge: "STANDARDS SCHEMAS",
    bentoSpan: "col-span-1 md:col-span-1",
    href: "/physics#dexpi",
    deliverables: [
      "DEXPI 2.0 P&ID Equipment XML Parser & Topology Graph",
      "CycloneDX 1.6 4-BOM Attestation (Software, Hardware, OT)",
      "Minimum Operational Requirements (MOR) Compliance",
    ],
  },
  {
    id: "track-3",
    tag: "Track 3 // Actuarial Re-Invention",
    titleKey: "track3_title",
    descKey: "track3_desc",
    badge: "ACTUARIAL MODEL",
    bentoSpan: "col-span-1 md:col-span-3",
    href: "/physics#actuarial",
    deliverables: [
      "Clayton Copula Systemic Dependency Loss Matrix",
      "Aggregate Loss Exceedance (ALE) Catastrophe Curve",
      "Lloyd's Y5381 Physical State Exclusion Validation",
    ],
  },
];

export const LabsShowcase: React.FC = () => {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<"bento" | "grid">("grid");

  return (
    <section id="labs" className="py-20 bg-black text-white relative font-sans selection:bg-dutchOrange selection:text-white">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header & Controls Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-900/60 pb-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono text-dutchOrange font-normal inline-block">
              {t("labs_tag" as any)}
            </span>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white uppercase font-mono">
              {t("labs_title" as any)}
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              {t("labs_desc" as any)}
            </p>
          </div>

          {/* View Mode Toggle Switcher */}
          <div className="flex items-center gap-1 bg-zinc-950 p-1.5 rounded-xl font-mono text-xs font-bold shadow-xs">
            <button
              onClick={() => setViewMode("bento")}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === "bento"
                  ? "bg-dutchOrange text-white shadow-sm font-bold"
                  : "text-zinc-400 hover:text-white font-medium"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Bento Grid
            </button>

            <button
              onClick={() => setViewMode("grid")}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === "grid"
                  ? "bg-dutchOrange text-white shadow-sm font-bold"
                  : "text-zinc-400 hover:text-white font-medium"
              }`}
            >
              <List className="w-3.5 h-3.5" /> Compact Grid
            </button>
          </div>
        </div>

        {/* Bento Cards (Frameless Pure Dark Cards) */}
        <div className={`grid gap-6 font-mono text-xs ${viewMode === "bento" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-3"}`}>
          {researchTracksList.map((track) => {
            const spanClass = viewMode === "bento" ? track.bentoSpan : "col-span-1";
            return (
              <motion.div
                key={track.id}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`${spanClass} p-6 sm:p-8 rounded-3xl bg-zinc-950/60 hover:bg-zinc-900/50 transition-all shadow-2xl flex flex-col justify-between space-y-6 group`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-dutchOrange font-normal inline-block">
                      {track.tag}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">
                      {track.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white uppercase group-hover:text-dutchOrange transition-colors">
                    {t(track.titleKey as any)}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed font-light">
                    {t(track.descKey as any)}
                  </p>

                  {/* Core Deliverables Bullet List */}
                  <div className="space-y-2 pt-2 border-t border-zinc-900/60 font-sans">
                    <span className="text-xs font-mono text-dutchOrange font-normal block uppercase">
                      Deliverables & Schemas:
                    </span>
                    {track.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <span className="text-dutchOrange font-bold">&bull;</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={track.href}
                  className="pt-4 border-t border-zinc-900/60 text-dutchOrange font-bold text-xs flex items-center justify-between group-hover:translate-x-1 transition-transform uppercase tracking-wider"
                >
                  <span>Explore Research Track</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
