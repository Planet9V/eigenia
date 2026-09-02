"use client";

import React, { useState } from "react";
import { SiteChrome } from "@/components/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  BookOpen,
  Layers,
  Cpu,
  ShieldAlert,
  Activity,
  Zap,
  ArrowRight,
  LayoutGrid,
  List,
  Boxes,
  Sparkles,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAllWorkingGroups, WorkingGroupCategory } from "@/lib/wiki";
import { useLanguage } from "@/context/LanguageContext";

const WG_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "WG-01-UI": ShieldAlert,
  "WG-02-DT": Layers,
  "WG-03-ML": Activity,
  "WG-04-CF": Zap,
  "WG-05-CAD": Cpu,
  "WG-07-TM": Boxes,
  "WG-08-MO": Sparkles,
  "MP-MATH": FileText,
  "GOV-RES": BookOpen,
};

export default function TracksPage() {
  const { language, t } = useLanguage();
  const [viewMode, setViewMode] = useState<"bento" | "lines">("bento");

  const workingGroups = getAllWorkingGroups(language);
  const totalDocuments = workingGroups.reduce(
    (acc, wg) => acc + wg.documents.length,
    0
  );

  return (
    <div className="min-h-screen bg-canvas text-primary font-sans transition-colors duration-300">
      <SiteChrome>
      {/* Hero Band: Digital Twin Graph Topology Background */}
      <section className="dark relative overflow-hidden border-b border-hairline min-h-[480px] sm:min-h-[540px] lg:min-h-[620px] flex items-center">
        <div className="absolute inset-0 bg-[#0B0C0E]">
          <div className="hidden lg:block">
            <img
              src="/assets/wg-graph-topology.png"
              alt="Eigenia digital twin graph topology"
              className="absolute inset-0 h-full w-full object-cover object-[center_58%] opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/55 to-[#0B0C0E]/10" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <Breadcrumb items={[{ label: "Research Tracks" }]} />

          <div className="mt-6 max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider font-semibold text-dutchOrange bg-dutchOrange/10 px-3 py-1 rounded-full border border-dutchOrange/30 inline-block">
              Eigenia Lab Working Groups
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
              Sovereign Research Tracks
            </h1>
            <p className="text-sm sm:text-base text-secondary max-w-3xl leading-relaxed">
              Explore all 8 Eigenia Lab Working Groups spanning {totalDocuments} published treatises. Select any Working Group card below to open the complete Research Wiki Engine.
            </p>
          </div>
        </div>
      </section>

      <main className="pt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* View Switcher & Action Controls */}
        <div className="flex items-center justify-end gap-3 mb-8">
          <Link
            href="/wiki"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dutchOrange hover:bg-dutchOrange-600 text-white font-medium text-xs shadow-md shadow-dutchOrange/20 transition-all"
          >
            <BookOpen className="h-4 w-4" />
            <span>Open Research Wiki ({totalDocuments} Treatises)</span>
          </Link>

          <div className="flex items-center rounded-xl border border-hairline bg-surface p-1 shadow-sm">
            <button
              onClick={() => setViewMode("bento")}
              className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                viewMode === "bento"
                  ? "bg-dutchOrange/15 text-dutchOrange border border-dutchOrange/30"
                  : "text-muted hover:text-primary"
              }`}
              title="Bento Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("lines")}
              className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                viewMode === "lines"
                  ? "bg-dutchOrange/15 text-dutchOrange border border-dutchOrange/30"
                  : "text-muted hover:text-primary"
              }`}
              title="Lines / List View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Working Groups Display Grid */}
        <div>
          {viewMode === "bento" ? (
            /* Uniform Bento Grid Layout (Master Dutch Orange Design System) */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workingGroups.map((wg: WorkingGroupCategory, idx: number) => {
                const Icon = WG_ICON_MAP[wg.id] || Layers;

                return (
                  <motion.div
                    key={wg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    className="group relative flex flex-col justify-between rounded-2xl border border-hairline bg-surface p-6 shadow-sm transition-all duration-300 hover:border-dutchOrange/40 hover:shadow-[0_0_20px_rgba(224,90,16,0.15)]"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-dutchOrange/10 text-dutchOrange border border-dutchOrange/20">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-mono text-xs font-bold tracking-wider text-muted block">
                              {wg.number}
                            </span>
                            <h3 className="text-base font-bold text-primary leading-tight">
                              {wg.title}
                            </h3>
                          </div>
                        </div>

                        <span className="inline-flex shrink-0 items-center rounded-full border border-dutchOrange/30 bg-dutchOrange/10 px-2.5 py-0.5 text-[10px] font-mono font-medium text-dutchOrange">
                          {wg.badge}
                        </span>
                      </div>

                      {/* 4-5 Sentence Copywriting Synopsis */}
                      <p className="text-xs text-secondary leading-relaxed mb-6 font-normal">
                        {wg.description}
                      </p>
                    </div>

                    {/* Footer Action Link */}
                    <div className="pt-4 border-t border-hairline flex items-center justify-between mt-auto">
                      <span className="font-mono text-[11px] text-muted font-medium">
                        {wg.documents.length} {language === "nl" ? "verhandeling(en)" : "treatise(s)"}
                      </span>

                      <Link
                        href={`/wiki?wg=${encodeURIComponent(wg.id)}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-dutchOrange group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>Open Wiki</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* Lines / List View Layout */
            <div className="space-y-4">
              {workingGroups.map((wg: WorkingGroupCategory) => {
                const Icon = WG_ICON_MAP[wg.id] || Layers;

                return (
                  <div
                    key={wg.id}
                    className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm transition-all hover:border-dutchOrange/40"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-dutchOrange/10 text-dutchOrange border border-dutchOrange/20">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-muted">
                              {wg.number}
                            </span>
                            <span className="inline-flex items-center rounded-full border border-dutchOrange/30 bg-dutchOrange/10 px-2.5 py-0.5 text-[10px] font-mono font-medium text-dutchOrange">
                              {wg.badge}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-primary">
                            {wg.title}
                          </h3>
                        </div>
                      </div>

                      <Link
                        href={`/wiki?wg=${encodeURIComponent(wg.id)}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-dutchOrange/10 text-dutchOrange border border-dutchOrange/30 hover:bg-dutchOrange/20 transition-all shrink-0"
                      >
                        <span>Open Wiki ({wg.documents.length} {language === "nl" ? "Verhandelingen" : "Treatises"})</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    <p className="mt-3 text-xs text-secondary leading-relaxed">
                      {wg.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      </SiteChrome>
    </div>
  );
}
