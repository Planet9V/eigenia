"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { EuComplianceFooter } from "@/components/EuComplianceFooter";
import { ImpressumModal } from "@/components/ImpressumModal";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
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
  CheckCircle2,
  Boxes,
  Sparkles,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { WORKING_GROUPS, WorkingGroupCategory } from "@/lib/wiki";

const WG_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "WG-01-UI": ShieldAlert,
  "WG-02-DT": Layers,
  "WG-03-ML": Activity,
  "WG-04-CF": Zap,
  "WG-05-CAD": Cpu,
  "WG-07-TM": Boxes,
  "WG-08-MO": Sparkles,
  "MP-MATH": FileText,
};

const COLOR_ACCENTS: Record<
  string,
  { border: string; bg: string; text: string; badge: string; glow: string }
> = {
  cyan: {
    border: "border-cyan-500/30 dark:border-cyan-500/20",
    bg: "bg-cyan-500/10 dark:bg-cyan-500/5",
    text: "text-cyan-700 dark:text-cyan-400",
    badge: "bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border-cyan-500/30",
    glow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
  },
  emerald: {
    border: "border-emerald-500/30 dark:border-emerald-500/20",
    bg: "bg-emerald-500/10 dark:bg-emerald-500/5",
    text: "text-emerald-700 dark:text-emerald-400",
    badge: "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/30",
    glow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
  },
  violet: {
    border: "border-violet-500/30 dark:border-violet-500/20",
    bg: "bg-violet-500/10 dark:bg-violet-500/5",
    text: "text-violet-700 dark:text-violet-400",
    badge: "bg-violet-500/20 text-violet-800 dark:text-violet-300 border-violet-500/30",
    glow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
  },
  rose: {
    border: "border-rose-500/30 dark:border-rose-500/20",
    bg: "bg-rose-500/10 dark:bg-rose-500/5",
    text: "text-rose-700 dark:text-rose-400",
    badge: "bg-rose-500/20 text-rose-800 dark:text-rose-300 border-rose-500/30",
    glow: "hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]",
  },
  amber: {
    border: "border-amber-500/30 dark:border-amber-500/20",
    bg: "bg-amber-500/10 dark:bg-amber-500/5",
    text: "text-amber-700 dark:text-amber-400",
    badge: "bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/30",
    glow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
  },
  sky: {
    border: "border-sky-500/30 dark:border-sky-500/20",
    bg: "bg-sky-500/10 dark:bg-sky-500/5",
    text: "text-sky-700 dark:text-sky-400",
    badge: "bg-sky-500/20 text-sky-800 dark:text-sky-300 border-sky-500/30",
    glow: "hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]",
  },
  orange: {
    border: "border-orange-500/30 dark:border-orange-500/20",
    bg: "bg-orange-500/10 dark:bg-orange-500/5",
    text: "text-orange-700 dark:text-orange-400",
    badge: "bg-orange-500/20 text-orange-800 dark:text-orange-300 border-orange-500/30",
    glow: "hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]",
  },
  indigo: {
    border: "border-indigo-500/30 dark:border-indigo-500/20",
    bg: "bg-indigo-500/10 dark:bg-indigo-500/5",
    text: "text-indigo-700 dark:text-indigo-400",
    badge: "bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 border-indigo-500/30",
    glow: "hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]",
  },
};

export default function TracksPage() {
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [cookiesForceOpen, setCookiesForceOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"bento" | "lines">("bento");

  const totalDocuments = WORKING_GROUPS.reduce(
    (acc, wg) => acc + wg.documents.length,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300">
      <Navbar onOpenImpressum={() => setImpressumOpen(true)} />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Breadcrumb items={[{ label: "Research Tracks" }]} />

        {/* Page Header */}
        <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Eigenia Lab Working Groups
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Sovereign Research Tracks & Treatises
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Explore all 8 Eigenia Lab Working Groups across 25 published treatises. Select any Working Group or paper below to open the complete 2-column Research Wiki Engine.
            </p>
          </div>

          {/* View Switcher Controls */}
          <div className="flex items-center gap-3">
            <Link
              href="/wiki"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md shadow-emerald-600/20 transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>Open Full Research Wiki ({totalDocuments} Treatises)</span>
            </Link>

            <div className="flex items-center rounded-lg border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900 p-1">
              <button
                onClick={() => setViewMode("bento")}
                className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === "bento"
                    ? "bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
                title="Bento Grid View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("lines")}
                className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === "lines"
                    ? "bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
                title="Lines / List View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Working Groups Display Grid */}
        <div className="mt-8">
          {viewMode === "bento" ? (
            /* Bento Grid Layout */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {WORKING_GROUPS.map((wg: WorkingGroupCategory, idx: number) => {
                const Icon = WG_ICON_MAP[wg.id] || Layers;
                const theme = COLOR_ACCENTS[wg.color] || COLOR_ACCENTS.emerald;
                const isFeatured = wg.id === "WG-01-UI" || wg.id === "WG-02-DT";

                return (
                  <motion.div
                    key={wg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 dark:bg-slate-900/60 backdrop-blur-md ${theme.border} ${theme.glow} ${
                      isFeatured ? "md:col-span-2 lg:col-span-2" : ""
                    }`}
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-xl ${theme.bg} ${theme.text}`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-mono text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 block">
                              {wg.number}
                            </span>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                              {wg.title}
                            </h3>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-mono font-medium ${theme.badge}`}
                        >
                          {wg.badge}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                        {wg.description}
                      </p>

                      {/* Deliverables Treatises List */}
                      <div className="space-y-2 mb-6">
                        <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Published Treatises ({wg.documents.length}):
                        </h4>
                        <div className="grid grid-cols-1 gap-1.5">
                          {wg.documents.map((doc) => (
                            <Link
                              key={doc.id}
                              href={`/wiki?wg=${encodeURIComponent(wg.id)}&doc=${encodeURIComponent(doc.id)}`}
                              className="group/item flex items-start gap-2 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/50 dark:hover:bg-white/5 border border-slate-200/50 dark:border-white/5 transition-colors"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <div className="min-w-0 flex-1">
                                <span className="text-xs font-medium text-slate-800 dark:text-slate-200 group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400 line-clamp-1">
                                  {doc.title}
                                </span>
                              </div>
                              <ArrowUpRight className="h-3 w-3 text-slate-400 opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Link Button */}
                    <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                      <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                        {wg.documents.length} treatise{wg.documents.length === 1 ? "" : "s"} indexed
                      </span>

                      <Link
                        href={`/wiki?wg=${encodeURIComponent(wg.id)}`}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold ${theme.text} hover:underline`}
                      >
                        <span>Open Working Group Wiki</span>
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
              {WORKING_GROUPS.map((wg: WorkingGroupCategory) => {
                const Icon = WG_ICON_MAP[wg.id] || Layers;
                const theme = COLOR_ACCENTS[wg.color] || COLOR_ACCENTS.emerald;

                return (
                  <div
                    key={wg.id}
                    className={`rounded-xl border bg-white p-5 dark:bg-slate-900/60 shadow-sm transition-all ${theme.border}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/5 pb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${theme.bg} ${theme.text}`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                              {wg.number}
                            </span>
                            <span
                              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-mono font-medium ${theme.badge}`}
                            >
                              {wg.badge}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            {wg.title}
                          </h3>
                        </div>
                      </div>

                      <Link
                        href={`/wiki?wg=${encodeURIComponent(wg.id)}`}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold ${theme.bg} ${theme.text} border ${theme.border} hover:opacity-90 transition-opacity`}
                      >
                        <span>Open Wiki ({wg.documents.length} Docs)</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    <p className="mt-3 text-xs text-slate-600 dark:text-slate-400">
                      {wg.description}
                    </p>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {wg.documents.map((doc) => (
                        <Link
                          key={doc.id}
                          href={`/wiki?wg=${encodeURIComponent(wg.id)}&doc=${encodeURIComponent(doc.id)}`}
                          className="flex items-center justify-between p-2 rounded-lg border border-slate-200/60 bg-slate-50 hover:bg-slate-100 dark:border-white/5 dark:bg-slate-950/40 dark:hover:bg-white/5 text-xs text-slate-700 dark:text-slate-300 transition-colors"
                        >
                          <span className="truncate font-medium">{doc.title}</span>
                          <ArrowRight className="h-3 w-3 text-slate-400 shrink-0 ml-1" />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <EuComplianceFooter
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenCookies={() => setCookiesForceOpen(true)}
      />

      <ImpressumModal
        isOpen={impressumOpen}
        onClose={() => setImpressumOpen(false)}
      />

      <CookieConsentBanner
        forceOpen={cookiesForceOpen}
        onCloseForce={() => setCookiesForceOpen(false)}
      />
    </div>
  );
}
