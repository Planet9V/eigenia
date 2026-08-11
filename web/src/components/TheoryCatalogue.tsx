"use client";

import React, { useState } from "react";
import { ArrowRight, BookOpen, LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MathFormula } from "@/components/MathFormula";

import { theoryModelsList, TheoryModel } from "@/lib/theoryModels";
export type { TheoryModel };
export { theoryModelsList };

export const TheoryCatalogue: React.FC = () => {
  const [viewMode, setViewMode] = useState<"bento" | "grid">("grid");

  return (
    <section id="theory" className="py-20 bg-[#16181d] text-white relative font-sans selection:bg-dutchOrange selection:text-white scroll-mt-24 border-b border-zinc-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-900 pb-8">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
              Open Scientific Research Catalogue
            </span>

            <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-white">
              Applied Physics & Mathematical Frameworks
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              9 non-linear physical risk models, algebraic topology frameworks, and statistical thermodynamics algorithms implemented across the Eigenia digital twin engine.
            </p>
          </div>

          {/* View Mode Toggle Switcher */}
          <div className="flex items-center gap-1 bg-[#0b0c0e] p-1.5 rounded-xl border border-zinc-800/60 font-mono text-xs font-medium flex-shrink-0">
            <button
              onClick={() => setViewMode("bento")}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === "bento"
                  ? "bg-dutchOrange text-white shadow-sm font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Bento Grid (2 Col)
            </button>

            <button
              onClick={() => setViewMode("grid")}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === "grid"
                  ? "bg-dutchOrange text-white shadow-sm font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <List className="w-3.5 h-3.5" /> Compact Grid (3 Col)
            </button>
          </div>
        </div>

        {/* 9 Models Grid (Dynamic Grid Class for Bento vs Compact) */}
        <div
          className={`grid gap-6 font-mono text-xs ${
            viewMode === "bento"
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {theoryModelsList.map((model) => (
            <motion.div
              key={model.id}
              whileHover={{ y: -4, scale: 1.01 }}
              className={`rounded-2xl bg-[#131519] border border-[#22252c] hover:border-zinc-700/60 transition-all shadow-xl flex flex-col justify-between group ${
                viewMode === "grid" ? "p-6 space-y-4" : "p-8 space-y-6"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-dutchOrange" />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium block">
                    {model.number}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-sans text-xl font-semibold text-white group-hover:text-dutchOrange transition-colors">
                    {model.name}
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-400 block pt-0.5">
                    {model.tag}
                  </span>
                </div>

                {/* KaTeX Rendered Mathematical Formula Box */}
                <div className="p-4 rounded-xl bg-[#0b0c0e] border border-zinc-800/60 font-mono text-xs overflow-x-auto min-h-[60px] flex items-center justify-center">
                  <MathFormula formula={model.formula} />
                </div>

                <p className="text-sm text-zinc-300 font-sans leading-relaxed font-light">
                  {model.description}
                </p>

                <div className="space-y-2 pt-3 border-t border-zinc-900 font-sans">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-dutchOrange uppercase font-medium block">
                    Deliverables & Proofs:
                  </span>
                  {model.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                      <span className="text-dutchOrange font-bold">&bull;</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={`/theory/${model.slug}`}
                className="pt-4 border-t border-zinc-900 text-dutchOrange font-sans text-xs font-semibold flex items-center justify-between group-hover:translate-x-1 transition-transform"
              >
                <span className="flex items-center gap-1.5">
                  Read Mathematical Specification
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
