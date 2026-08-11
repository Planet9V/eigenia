"use client";

import React, { useState, useMemo } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Search,
  Layers,
  FileText,
  Shield,
  Activity,
  Cpu,
  Boxes,
  Zap,
  Sparkles,
  X,
} from "lucide-react";
import {
  WORKING_GROUPS,
  WorkingGroupCategory,
  WikiDocumentMeta,
  searchWikiDocuments,
} from "@/lib/wiki";

interface WikiAccordionSidebarProps {
  activeDocId: string;
  activeWgId: string;
  onSelectDocument: (wgId: string, docId: string) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const WG_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "WG-01-UI": Shield,
  "WG-02-DT": Layers,
  "WG-03-ML": Activity,
  "WG-04-CF": Zap,
  "WG-05-CAD": Cpu,
  "WG-07-TM": Boxes,
  "WG-08-MO": Sparkles,
  "MP-MATH": FileText,
};

const COLOR_THEMES: Record<
  string,
  { border: string; bg: string; text: string; badge: string; glow: string }
> = {
  cyan: {
    border: "border-cyan-500/30 dark:border-cyan-500/20",
    bg: "bg-cyan-500/10 dark:bg-cyan-500/5",
    text: "text-cyan-700 dark:text-cyan-400",
    badge: "bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border-cyan-500/30",
    glow: "shadow-[0_0_15px_rgba(6,182,212,0.15)]",
  },
  emerald: {
    border: "border-emerald-500/30 dark:border-emerald-500/20",
    bg: "bg-emerald-500/10 dark:bg-emerald-500/5",
    text: "text-emerald-700 dark:text-emerald-400",
    badge: "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/30",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.15)]",
  },
  violet: {
    border: "border-violet-500/30 dark:border-violet-500/20",
    bg: "bg-violet-500/10 dark:bg-violet-500/5",
    text: "text-violet-700 dark:text-violet-400",
    badge: "bg-violet-500/20 text-violet-800 dark:text-violet-300 border-violet-500/30",
    glow: "shadow-[0_0_15px_rgba(139,92,246,0.15)]",
  },
  rose: {
    border: "border-rose-500/30 dark:border-rose-500/20",
    bg: "bg-rose-500/10 dark:bg-rose-500/5",
    text: "text-rose-700 dark:text-rose-400",
    badge: "bg-rose-500/20 text-rose-800 dark:text-rose-300 border-rose-500/30",
    glow: "shadow-[0_0_15px_rgba(244,63,94,0.15)]",
  },
  amber: {
    border: "border-amber-500/30 dark:border-amber-500/20",
    bg: "bg-amber-500/10 dark:bg-amber-500/5",
    text: "text-amber-700 dark:text-amber-400",
    badge: "bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/30",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.15)]",
  },
  sky: {
    border: "border-sky-500/30 dark:border-sky-500/20",
    bg: "bg-sky-500/10 dark:bg-sky-500/5",
    text: "text-sky-700 dark:text-sky-400",
    badge: "bg-sky-500/20 text-sky-800 dark:text-sky-300 border-sky-500/30",
    glow: "shadow-[0_0_15px_rgba(14,165,233,0.15)]",
  },
  orange: {
    border: "border-orange-500/30 dark:border-orange-500/20",
    bg: "bg-orange-500/10 dark:bg-orange-500/5",
    text: "text-orange-700 dark:text-orange-400",
    badge: "bg-orange-500/20 text-orange-800 dark:text-orange-300 border-orange-500/30",
    glow: "shadow-[0_0_15px_rgba(249,115,22,0.15)]",
  },
  indigo: {
    border: "border-indigo-500/30 dark:border-indigo-500/20",
    bg: "bg-indigo-500/10 dark:bg-indigo-500/5",
    text: "text-indigo-700 dark:text-indigo-400",
    badge: "bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 border-indigo-500/30",
    glow: "shadow-[0_0_15px_rgba(99,102,241,0.15)]",
  },
};

export default function WikiAccordionSidebar({
  activeDocId,
  activeWgId,
  onSelectDocument,
  isMobileOpen,
  onCloseMobile,
}: WikiAccordionSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedWgs, setExpandedWgs] = useState<Set<string>>(() => {
    return new Set([activeWgId || "WG-01-UI", "WG-02-DT", "MP-MATH"]);
  });

  const toggleWg = (wgId: string) => {
    setExpandedWgs((prev) => {
      const next = new Set(prev);
      if (next.has(wgId)) {
        next.delete(wgId);
      } else {
        next.add(wgId);
      }
      return next;
    });
  };

  const searchResults = useMemo(() => {
    return searchWikiDocuments(searchQuery);
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-80 flex-col border-r border-slate-200 bg-white/95 backdrop-blur-md transition-transform duration-300 dark:border-white/10 dark:bg-slate-950/95 lg:static lg:flex lg:translate-x-0 ${
        isMobileOpen ? "translate-x-0 flex" : "-translate-x-full hidden"
      }`}
    >
      {/* Sidebar Top Brand Header */}
      <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-mono text-xs font-semibold tracking-wider text-slate-900 dark:text-white">
              EIGENIA LABS
            </h2>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Sovereign Research Wiki
            </p>
          </div>
        </div>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Live Search Engine Input */}
      <div className="p-3 border-b border-slate-200 dark:border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Instant search across 25 treatises..."
            className="w-full rounded-md border border-slate-200 bg-slate-100 py-1.5 pl-8 pr-3 text-xs text-slate-900 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:border-emerald-400"
          />
        </div>
        {isSearching && (
          <p className="mt-1.5 px-1 text-[10px] text-slate-500 dark:text-slate-400">
            Found {searchResults.length} matching treatise{searchResults.length === 1 ? "" : "s"}
          </p>
        )}
      </div>

      {/* Navigation List Viewport */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
        {isSearching ? (
          /* Search Results View */
          <div className="space-y-1">
            <h3 className="px-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Search Results
            </h3>
            {searchResults.length === 0 ? (
              <p className="p-3 text-xs text-slate-500 dark:text-slate-400 italic">
                No matching treatises found for &quot;{searchQuery}&quot;.
              </p>
            ) : (
              searchResults.map(({ doc, snippet }) => (
                <button
                  key={doc.id}
                  onClick={() => {
                    onSelectDocument(doc.workingGroupId, doc.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all ${
                    activeDocId.toLowerCase() === doc.id.toLowerCase()
                      ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 font-medium"
                      : "border-slate-200 hover:border-slate-300 bg-slate-50 dark:border-white/5 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                    {doc.workingGroupId} • {doc.badge}
                  </span>
                  <span className="text-xs line-clamp-1 font-medium">{doc.title}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {snippet}
                  </span>
                </button>
              ))
            )}
          </div>
        ) : (
          /* Accordion Working Groups View */
          WORKING_GROUPS.map((wg: WorkingGroupCategory) => {
            const isExpanded = expandedWgs.has(wg.id);
            const Icon = WG_ICON_MAP[wg.id] || Layers;
            const theme = COLOR_THEMES[wg.color] || COLOR_THEMES.emerald;
            const isCategoryActive = activeWgId === wg.id;

            return (
              <div
                key={wg.id}
                className={`rounded-xl border transition-all ${
                  isCategoryActive
                    ? `${theme.border} ${theme.bg}`
                    : "border-slate-200 bg-slate-50/50 dark:border-white/5 dark:bg-slate-900/40"
                }`}
              >
                {/* Working Group Header */}
                <button
                  onClick={() => toggleWg(wg.id)}
                  className="w-full flex items-center justify-between p-3 text-left transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${theme.bg} ${theme.text}`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 block">
                        {wg.number}
                      </span>
                      <h3 className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                        {wg.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-[9px] font-mono font-medium ${theme.badge}`}
                    >
                      {wg.documents.length}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Subsections Document List */}
                {isExpanded && (
                  <div className="px-2 pb-2 space-y-1 border-t border-slate-200/50 dark:border-white/5 pt-1.5">
                    {wg.documents.map((doc: WikiDocumentMeta) => {
                      const isDocActive =
                        activeDocId.toLowerCase() === doc.id.toLowerCase() ||
                        activeDocId.toLowerCase() === doc.slug.toLowerCase();

                      return (
                        <button
                          key={doc.id}
                          onClick={() => {
                            onSelectDocument(wg.id, doc.id);
                            if (onCloseMobile) onCloseMobile();
                          }}
                          className={`w-full flex items-start gap-2 p-2 rounded-lg text-left text-xs transition-all ${
                            isDocActive
                              ? `bg-white dark:bg-slate-900 font-semibold text-slate-900 dark:text-white ${theme.border} ${theme.glow}`
                              : "text-slate-600 hover:text-slate-900 hover:bg-white/60 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5"
                          }`}
                        >
                          <FileText
                            className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${
                              isDocActive ? theme.text : "text-slate-400"
                            }`}
                          />
                          <div className="min-w-0 flex-1">
                            <span className="line-clamp-1 block leading-snug">
                              {doc.title}
                            </span>
                            {doc.subtitle && (
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1 block font-normal">
                                {doc.subtitle}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        )}
      </div>

      {/* Footer Total Audit Counter */}
      <div className="border-t border-slate-200 p-3 text-center dark:border-white/10">
        <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
          25 Treatises • 8 Working Groups • Zero Omissions
        </span>
      </div>
    </aside>
  );
}
