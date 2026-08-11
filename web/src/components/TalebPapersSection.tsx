"use client";

import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export interface TalebPaper {
  id: string;
  slug: string;
  number: string;
  titleKey: string;
  descKey: string;
  author: string;
  date: string;
  keyTopics: string[];
  fullProse: string;
}

export const talebPapersList: TalebPaper[] = [
  {
    id: "p1",
    slug: "taleb-fooled-by-randomness",
    number: "PAPER I",
    titleKey: "taleb_paper1_title",
    descKey: "taleb_paper1_desc",
    author: "J. McKenney",
    date: "2026 FEB",
    keyTopics: ["Philosophy of Uncertainty", "Survivorship Bias", "Skewness & Asymmetry", "Extreme Value Theory (EVT)", "Peak-Over-Threshold (POT)"],
    fullProse: `## I. Executive Abstract & Philosophical Foundations

Nassim Nicholas Taleb's *Fooled by Randomness* is a treatise on epistemology under severe opacity. At its core, the work demonstrates that human cognitive architecture is fundamentally flawed when evaluating stochastic processes characterized by non-linearities, heavy tails, and asymmetric payoffs. We live in a world dominated by luck, noise, and rare high-impact events (Black Swans), yet we consistently misattribute random outcomes to skill, deterministic causality, or institutional competence.`,
  },
  {
    id: "p2",
    slug: "cdt-series-background",
    number: "PAPER II",
    titleKey: "taleb_paper2_title",
    descKey: "taleb_paper2_desc",
    author: "J. McKenney",
    date: "2026 FEB",
    keyTopics: ["Field Observations", "Reference Architecture Illusion", "Compliance-as-Security", "Silent Evidence", "Epistemological Fragility"],
    fullProse: `## I. Author Introduction & Structural Thesis

Authored by J. McKenney, Founder of Eigenia B.V. & Eigenia Labs.`,
  },
  {
    id: "p3",
    slug: "cdt-series-1",
    number: "PAPER III",
    titleKey: "taleb_paper3_title",
    descKey: "taleb_paper3_desc",
    author: "J. McKenney",
    date: "2026 FEB",
    keyTopics: ["Fooled by Cybersecurity", "No-Breach Winning Streak", "7-Layer Architecture", "Left vs Right Side", "GvP Ratio Analysis"],
    fullProse: `## I. The Right-Side Trap of Modern Cybersecurity`,
  },
  {
    id: "p4",
    slug: "cdt-series-2",
    number: "PAPER IV",
    titleKey: "taleb_paper4_title",
    descKey: "taleb_paper4_desc",
    author: "J. McKenney",
    date: "2026 FEB",
    keyTopics: ["The Parallel Nobody Sees", "Ising Phase Transitions", "Granovetter Cascades", "Seldon Crisis", "Statistical Thermodynamics"],
    fullProse: `## I. Comparative Structural Analysis`,
  },
  {
    id: "p5",
    slug: "cdt-series-3",
    number: "PAPER V",
    titleKey: "taleb_paper5_title",
    descKey: "taleb_paper5_desc",
    author: "J. McKenney",
    date: "2026 FEB",
    keyTopics: ["AEON Engine GGNN", "McKenney-Lacan Calculus", "Psychometric Tensor", "Interaction Hamiltonian", "Eigenvector Spectral Limits"],
    fullProse: `## I. Architectural Specification of the AEON Engine`,
  },
];

export const TalebPapersSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="taleb" className="py-16 bg-black text-white transition-colors duration-300 relative font-sans selection:bg-dutchOrange selection:text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono text-dutchOrange font-normal inline-block">
            {t("taleb_tag" as any)}
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white font-mono uppercase">
            RESEARCH TRACK 1: {t("taleb_title" as any)}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans font-light">
            Conventional security risk models assume Gaussian normal distribution curves where extreme catastrophic events reside at 6+ standard deviations ($\sigma$), rendering them mathematically negligible. In physical plant control systems and interconnected power grids, physical breaches follow **fat-tailed Pareto distributions** where 80% of aggregate loss stems from 1% of Black Swan events.
          </p>
        </div>

        {/* 5 Taleb Papers Index Cards (Clean frameless cards leading to TOC reader) */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-900/60 pb-3 font-mono text-xs">
            <h3 className="text-lg font-bold text-white font-mono uppercase">
              Taleb Series Academic Publications (5 Treatises)
            </h3>
            <span className="text-xs font-mono text-dutchOrange font-normal">
              select paper to open long-form TOC reader
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
            {talebPapersList.map((paper) => {
              return (
                <div
                  key={paper.id}
                  className="p-6 rounded-3xl bg-zinc-950/60 hover:bg-zinc-900/50 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-2xl group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-dutchOrange font-normal inline-block">
                        {paper.number} // {paper.author} &bull; {paper.date}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-white font-mono uppercase group-hover:text-dutchOrange transition-colors">
                      {t(paper.titleKey as any)}
                    </h4>

                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                      {t(paper.descKey as any)}
                    </p>

                    {/* Key Topics Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {paper.keyTopics.map((topic, i) => (
                        <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-black text-zinc-400 font-mono">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/papers/${paper.slug}`}
                    className="pt-4 border-t border-zinc-900/60 text-dutchOrange font-bold text-xs flex items-center justify-between group-hover:translate-x-1 transition-transform uppercase tracking-wider"
                  >
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> Read Full Treatise (TOC Reader)
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
