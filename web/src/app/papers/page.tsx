"use client";

import React, { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { SiteChrome } from "@/components/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  Search,
  FileText,
  BookOpen,
  Layers,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Sparkles,
  Clock,
  Network,
  Cpu,
  Zap,
  ShieldAlert,
  Activity,
  Boxes,
  Check,
  Copy,
  Table as TableIcon,
  LayoutGrid,
  Quote,
  Command,
  Radio,
} from "lucide-react";
import Link from "next/link";
import {
  getAllWikiDocuments,
  getAllWorkingGroups,
  WikiDocumentMeta,
  WorkingGroupCategory,
} from "@/lib/wikiRegistry";
import {
  getTreatiseWordCount,
  formatReadingTime,
} from "@/lib/wordCounts";
import { useLanguage } from "@/context/LanguageContext";
import CitationModal from "@/components/papers/CitationModal";

const WG_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "WG-01-UI": ShieldAlert,
  "WG-02-DT": Layers,
  "WG-03-ML": Activity,
  "WG-04-CF": Zap,
  "WG-05-CAD": Cpu,
  "WG-06-SC": ShieldCheck,
  "WG-07-TM": Boxes,
  "WG-08-MO": Sparkles,
  "WG-09-MPN": Radio,
  "WG-09": Radio,
  "WG-10-AN": Network,
  "MP-MATH": FileText,
  "GOV-RES": BookOpen,
};

const WG_COLOR_MAP: Record<string, { badge: string; bg: string; border: string; text: string }> = {
  "WG-01-UI": { badge: "bg-red-500/10 text-red-500 border-red-500/30", bg: "hover:bg-red-500/5", border: "border-red-500/20", text: "text-red-500" },
  "WG-02-DT": { badge: "bg-blue-500/10 text-blue-500 border-blue-500/30", bg: "hover:bg-blue-500/5", border: "border-blue-500/20", text: "text-blue-500" },
  "WG-03-ML": { badge: "bg-purple-500/10 text-purple-500 border-purple-500/30", bg: "hover:bg-purple-500/5", border: "border-purple-500/20", text: "text-purple-500" },
  "WG-04-CF": { badge: "bg-amber-500/10 text-amber-500 border-amber-500/30", bg: "hover:bg-amber-500/5", border: "border-amber-500/20", text: "text-amber-500" },
  "WG-05-CAD": { badge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30", bg: "hover:bg-emerald-500/5", border: "border-emerald-500/20", text: "text-emerald-500" },
  "WG-06-SC": { badge: "bg-orange-500/10 text-orange-500 border-orange-500/30", bg: "hover:bg-orange-500/5", border: "border-orange-500/20", text: "text-orange-500" },
  "WG-07-TM": { badge: "bg-cyan-500/10 text-cyan-500 border-cyan-500/30", bg: "hover:bg-cyan-500/5", border: "border-cyan-500/20", text: "text-cyan-500" },
  "WG-08-MO": { badge: "bg-indigo-500/10 text-indigo-500 border-indigo-500/30", bg: "hover:bg-indigo-500/5", border: "border-indigo-500/20", text: "text-indigo-500" },
  "WG-09-MPN": { badge: "bg-violet-500/10 text-violet-500 border-violet-500/30", bg: "hover:bg-violet-500/5", border: "border-violet-500/20", text: "text-violet-500" },
  "WG-09": { badge: "bg-violet-500/10 text-violet-500 border-violet-500/30", bg: "hover:bg-violet-500/5", border: "border-violet-500/20", text: "text-violet-500" },
  "WG-10-AN": { badge: "bg-teal-500/10 text-teal-500 border-teal-500/30", bg: "hover:bg-teal-500/5", border: "border-teal-500/20", text: "text-teal-500" },
  "MP-MATH": { badge: "bg-rose-500/10 text-rose-500 border-rose-500/30", bg: "hover:bg-rose-500/5", border: "border-rose-500/20", text: "text-rose-500" },
  "GOV-RES": { badge: "bg-zinc-500/10 text-zinc-400 border-zinc-500/30", bg: "hover:bg-zinc-500/5", border: "border-zinc-500/20", text: "text-zinc-400" },
};

const QUICK_TOPICS = [
  "DEXPI 2.0",
  "Clayton Copula",
  "TACAM Matrix",
  "Taleb Series",
  "EU CRA",
  "Digital Twin",
  "FMECA",
];

function PapersHubContent() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Read initial values from URL query parameters
  const paramWg = searchParams.get("wg") || "ALL";
  const paramQ = searchParams.get("q") || "";
  const paramView = (searchParams.get("view") === "grid" ? "grid" : "table") as "table" | "grid";
  const paramSort = (searchParams.get("sort") || "wg") as "id" | "title" | "wg" | "words";
  const paramDir = searchParams.get("dir") === "desc" ? false : true;

  const [searchQuery, setSearchQuery] = useState(paramQ);
  const [selectedWg, setSelectedWg] = useState<string>(paramWg);
  const [viewMode, setViewMode] = useState<"table" | "grid">(paramView);
  const [sortKey, setSortKey] = useState<"id" | "title" | "wg" | "words">(paramSort);
  const [sortAsc, setSortAsc] = useState(paramDir);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [citingDoc, setCitingDoc] = useState<WikiDocumentMeta | null>(null);

  const allDocs = useMemo(() => getAllWikiDocuments(language), [language]);
  const workingGroups = useMemo(() => getAllWorkingGroups(language), [language]);

  // Synchronize state with URL parameters
  const updateUrl = (newParams: { wg?: string; q?: string; view?: string; sort?: string; dir?: string }) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (newParams.wg !== undefined) {
      if (newParams.wg === "ALL") current.delete("wg");
      else current.set("wg", newParams.wg);
    }
    if (newParams.q !== undefined) {
      if (!newParams.q.trim()) current.delete("q");
      else current.set("q", newParams.q.trim());
    }
    if (newParams.view !== undefined) {
      if (newParams.view === "table") current.delete("view");
      else current.set("view", newParams.view);
    }
    if (newParams.sort !== undefined) {
      if (newParams.sort === "wg") current.delete("sort");
      else current.set("sort", newParams.sort);
    }
    if (newParams.dir !== undefined) {
      if (newParams.dir === "asc") current.delete("dir");
      else current.set("dir", newParams.dir);
    }

    const searchStr = current.toString();
    const query = searchStr ? `?${searchStr}` : "";
    router.replace(`${pathname}${query}`, { scroll: false });
  };

  // Keep state synchronized with browser back/forward buttons
  useEffect(() => {
    const wg = searchParams.get("wg") || "ALL";
    const q = searchParams.get("q") || "";
    const view = (searchParams.get("view") === "grid" ? "grid" : "table") as "table" | "grid";
    const sort = (searchParams.get("sort") || "wg") as "id" | "title" | "wg" | "words";
    const dir = searchParams.get("dir") !== "desc";

    setSelectedWg(wg);
    setSearchQuery(q);
    setViewMode(view);
    setSortKey(sort);
    setSortAsc(dir);
  }, [searchParams]);

  // Keyboard shortcut listener: '/' or 'Cmd+K' / 'Ctrl+K' focuses search; 'Escape' clears
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInputActive =
        document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA";

      if (
        (e.key === "/" && !isInputActive) ||
        ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      } else if (e.key === "Escape") {
        if (document.activeElement === searchInputRef.current) {
          if (searchQuery) {
            setSearchQuery("");
            updateUrl({ q: "" });
          } else {
            searchInputRef.current?.blur();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchQuery]);

  const copyCanonicalUrl = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `https://eigenia.nl/papers/${slug}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    }
  };

  const filteredDocs = useMemo(() => {
    let result = allDocs;

    if (selectedWg !== "ALL") {
      result = result.filter((doc) => doc.workingGroupId === selectedWg);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((doc) => {
        const title = (language === "nl" && doc.titleNl ? doc.titleNl : doc.title).toLowerCase();
        const subtitle = (language === "nl" && doc.subtitleNl ? doc.subtitleNl : doc.subtitle || "").toLowerCase();
        const id = doc.id.toLowerCase();
        const slug = doc.slug.toLowerCase();
        const wg = doc.workingGroupName.toLowerCase();
        const badge = (doc.badge || "").toLowerCase();
        return (
          title.includes(q) ||
          subtitle.includes(q) ||
          id.includes(q) ||
          slug.includes(q) ||
          wg.includes(q) ||
          badge.includes(q)
        );
      });
    }

    return [...result].sort((a, b) => {
      let comparison = 0;
      if (sortKey === "id") {
        comparison = a.id.localeCompare(b.id);
      } else if (sortKey === "title") {
        const titleA = language === "nl" && a.titleNl ? a.titleNl : a.title;
        const titleB = language === "nl" && b.titleNl ? b.titleNl : b.title;
        comparison = titleA.localeCompare(titleB);
      } else if (sortKey === "wg") {
        comparison = a.workingGroupId.localeCompare(b.workingGroupId) || a.id.localeCompare(b.id);
      } else if (sortKey === "words") {
        const wordsA = getTreatiseWordCount(a.slug);
        const wordsB = getTreatiseWordCount(b.slug);
        comparison = wordsA - wordsB;
      }
      return sortAsc ? comparison : -comparison;
    });
  }, [allDocs, selectedWg, searchQuery, sortKey, sortAsc, language]);

  const toggleSort = (key: "id" | "title" | "wg" | "words") => {
    let newDir = true;
    if (sortKey === key) {
      newDir = !sortAsc;
      setSortAsc(newDir);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
    updateUrl({ sort: key, dir: newDir ? "asc" : "desc" });
  };

  const handleSelectWg = (wgId: string) => {
    setSelectedWg(wgId);
    updateUrl({ wg: wgId });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateUrl({ q: query });
  };

  const handleSelectTopic = (topic: string) => {
    if (searchQuery.toLowerCase() === topic.toLowerCase()) {
      setSearchQuery("");
      updateUrl({ q: "" });
    } else {
      setSearchQuery(topic);
      updateUrl({ q: topic });
    }
  };

  const handleToggleView = (mode: "table" | "grid") => {
    setViewMode(mode);
    updateUrl({ view: mode });
  };

  return (
    <div className="min-h-screen bg-canvas text-primary font-sans transition-colors duration-300">
      <SiteChrome>
        {/* Hero Section */}
        <section className="dark relative overflow-hidden border-b border-hairline bg-[#0B0C0E] py-16 sm:py-20 lg:py-24">
          <div className="absolute inset-0 bg-radial-at-t from-dutchOrange/10 via-transparent to-transparent opacity-60 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumb
              items={[
                { label: t("nav_tracks"), href: "/tracks" },
                { label: t("papers_hub_title"), href: "/papers" },
              ]}
            />

            <div className="mt-8 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dutchOrange/10 border border-dutchOrange/30 text-dutchOrange text-xs font-mono tracking-wider uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t("papers_hub_eyebrow")}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {t("papers_hub_title")}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                {t("papers_hub_desc")}
              </p>
            </div>

            {/* Metrics Ribbon */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-dutchOrange font-mono">
                  {allDocs.length}
                </div>
                <div className="text-xs text-zinc-400 font-mono mt-1">
                  {t("papers_hub_stat_treatises")}
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {workingGroups.length}
                </div>
                <div className="text-xs text-zinc-400 font-mono mt-1">
                  {t("papers_hub_stat_groups")}
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  316k+
                </div>
                <div className="text-xs text-zinc-400 font-mono mt-1">
                  {t("papers_hub_stat_words")}
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                  100%
                </div>
                <div className="text-xs text-zinc-400 font-mono mt-1">
                  {t("papers_hub_stat_access")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Controls & Search Band */}
        <section className="sticky top-16 z-40 bg-surface/90 backdrop-blur-md border-b border-hairline py-4 shadow-sm transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              {/* Search Bar with Keyboard Hotkey Indicator */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder={t("papers_search_placeholder")}
                  className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-canvas border border-hairline text-sm text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-dutchOrange/50 transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  {searchQuery ? (
                    <button
                      onClick={() => handleSearchChange("")}
                      className="text-xs font-mono text-muted hover:text-primary px-1"
                    >
                      Clear
                    </button>
                  ) : (
                    <span className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-surface border border-hairline rounded text-muted">
                      <Command className="w-2.5 h-2.5" /> K
                    </span>
                  )}
                </div>
              </div>

              {/* View Switcher & Result Count */}
              <div className="flex items-center gap-2 justify-between sm:justify-end">
                <span className="text-xs font-mono text-muted whitespace-nowrap">
                  Showing <strong className="text-primary">{filteredDocs.length}</strong> of {allDocs.length}
                </span>

                <div className="flex items-center bg-canvas border border-hairline rounded-xl p-0.5">
                  <button
                    onClick={() => handleToggleView("table")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      viewMode === "table"
                        ? "bg-surface shadow-sm text-dutchOrange font-bold"
                        : "text-muted hover:text-primary"
                    }`}
                    title={t("papers_view_table")}
                  >
                    <TableIcon className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">{t("papers_view_table")}</span>
                  </button>
                  <button
                    onClick={() => handleToggleView("grid")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      viewMode === "grid"
                        ? "bg-surface shadow-sm text-dutchOrange font-bold"
                        : "text-muted hover:text-primary"
                    }`}
                    title={t("papers_view_grid")}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">{t("papers_view_grid")}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick-Pill Search Tags */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono scrollbar-none">
              <span className="text-muted text-[11px] whitespace-nowrap mr-1 hidden sm:inline">
                {t("papers_quick_topics")}
              </span>
              {QUICK_TOPICS.map((topic) => {
                const isActive = searchQuery.toLowerCase() === topic.toLowerCase();
                return (
                  <button
                    key={topic}
                    onClick={() => handleSelectTopic(topic)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap border transition-all ${
                      isActive
                        ? "bg-dutchOrange text-white border-dutchOrange font-bold shadow-sm"
                        : "bg-surface/60 border-hairline text-muted hover:text-primary hover:border-muted"
                    }`}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>

            {/* Working Group Horizontal Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono scrollbar-none">
              <button
                onClick={() => handleSelectWg("ALL")}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap border transition-all ${
                  selectedWg === "ALL"
                    ? "bg-primary text-canvas border-primary font-bold shadow-sm"
                    : "bg-surface border-hairline text-muted hover:text-primary hover:border-muted"
                }`}
              >
                {t("papers_all_wgs")} ({allDocs.length})
              </button>
              {workingGroups.map((wg) => {
                const isSelected = selectedWg === wg.id;
                const colors = WG_COLOR_MAP[wg.id] || {
                  badge: "bg-zinc-500/10 text-zinc-500",
                  text: "text-primary",
                };
                return (
                  <button
                    key={wg.id}
                    onClick={() => handleSelectWg(wg.id)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap border transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? `${colors.badge} border-current font-bold shadow-sm`
                        : "bg-surface border-hairline text-muted hover:text-primary hover:border-muted"
                    }`}
                  >
                    <span>{wg.number}</span>
                    <span className="text-[10px] opacity-75">({wg.documents.length})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {filteredDocs.length === 0 ? (
            <div className="text-center py-20 bg-surface rounded-2xl border border-hairline p-8">
              <BookOpen className="w-12 h-12 text-muted mx-auto mb-4 stroke-1" />
              <h3 className="text-lg font-bold text-primary">{t("papers_no_results")}</h3>
              <p className="text-sm text-muted mt-2">Try adjusting your keyword search or selecting a different Working Group.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedWg("ALL");
                  updateUrl({ q: "", wg: "ALL" });
                }}
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-dutchOrange text-white font-mono text-xs font-bold hover:bg-dutchOrange/90 transition-colors shadow-sm"
              >
                {t("papers_reset_filters")}
              </button>
            </div>
          ) : viewMode === "table" ? (
            /* Canonical Table View */
            <div className="overflow-x-auto bg-surface rounded-2xl border border-hairline shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-hairline bg-canvas/60 text-[11px] font-mono text-muted uppercase tracking-wider">
                    {/* Sortable Ref Code */}
                    <th
                      className="py-3.5 px-4 cursor-pointer hover:text-primary transition-colors whitespace-nowrap"
                      onClick={() => toggleSort("id")}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={sortKey === "id" ? "text-dutchOrange font-bold" : ""}>
                          {t("papers_col_id")}
                        </span>
                        {sortKey === "id" ? (
                          sortAsc ? <ArrowUp className="w-3.5 h-3.5 text-dutchOrange" /> : <ArrowDown className="w-3.5 h-3.5 text-dutchOrange" />
                        ) : (
                          <ArrowUpDown className="w-3 h-3 text-muted/60 opacity-60" />
                        )}
                      </div>
                    </th>

                    {/* Sortable Title */}
                    <th
                      className="py-3.5 px-4 cursor-pointer hover:text-primary transition-colors"
                      onClick={() => toggleSort("title")}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={sortKey === "title" ? "text-dutchOrange font-bold" : ""}>
                          {t("papers_col_title")}
                        </span>
                        {sortKey === "title" ? (
                          sortAsc ? <ArrowUp className="w-3.5 h-3.5 text-dutchOrange" /> : <ArrowDown className="w-3.5 h-3.5 text-dutchOrange" />
                        ) : (
                          <ArrowUpDown className="w-3 h-3 text-muted/60 opacity-60" />
                        )}
                      </div>
                    </th>

                    {/* Sortable Working Group */}
                    <th
                      className="py-3.5 px-4 cursor-pointer hover:text-primary transition-colors whitespace-nowrap"
                      onClick={() => toggleSort("wg")}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={sortKey === "wg" ? "text-dutchOrange font-bold" : ""}>
                          {t("papers_col_wg")}
                        </span>
                        {sortKey === "wg" ? (
                          sortAsc ? <ArrowUp className="w-3.5 h-3.5 text-dutchOrange" /> : <ArrowDown className="w-3.5 h-3.5 text-dutchOrange" />
                        ) : (
                          <ArrowUpDown className="w-3 h-3 text-muted/60 opacity-60" />
                        )}
                      </div>
                    </th>

                    {/* Sortable Read Time */}
                    <th
                      className="py-3.5 px-4 cursor-pointer hover:text-primary transition-colors whitespace-nowrap hidden sm:table-cell"
                      onClick={() => toggleSort("words")}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={sortKey === "words" ? "text-dutchOrange font-bold" : ""}>
                          {t("papers_col_read_time")}
                        </span>
                        {sortKey === "words" ? (
                          sortAsc ? <ArrowUp className="w-3.5 h-3.5 text-dutchOrange" /> : <ArrowDown className="w-3.5 h-3.5 text-dutchOrange" />
                        ) : (
                          <ArrowUpDown className="w-3 h-3 text-muted/60 opacity-60" />
                        )}
                      </div>
                    </th>

                    <th className="py-3.5 px-4 hidden lg:table-cell">{t("papers_col_canonical")}</th>
                    <th className="py-3.5 px-4 text-right">{t("papers_col_actions")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline text-sm">
                  {filteredDocs.map((doc, idx) => {
                    const WGIcon = WG_ICON_MAP[doc.workingGroupId] || FileText;
                    const colors = WG_COLOR_MAP[doc.workingGroupId] || {
                      badge: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
                      text: "text-primary",
                    };
                    const title = language === "nl" && doc.titleNl ? doc.titleNl : doc.title;
                    const subtitle = language === "nl" && doc.subtitleNl ? doc.subtitleNl : doc.subtitle;
                    const badge = language === "nl" && doc.badgeNl ? doc.badgeNl : doc.badge;
                    const isCopied = copiedSlug === doc.slug;
                    const wordCount = getTreatiseWordCount(doc.slug);

                    return (
                      <tr
                        key={doc.id}
                        className="hover:bg-canvas/50 transition-colors group"
                      >
                        {/* Ref Code Column */}
                        <td className="py-4 px-4 align-top whitespace-nowrap">
                          <span className="font-mono text-xs font-semibold px-2 py-1 rounded bg-canvas border border-hairline text-primary">
                            {doc.id}
                          </span>
                          <div className="text-[10px] font-mono text-muted mt-1.5">
                            #{String(idx + 1).padStart(2, "0")}
                          </div>
                        </td>

                        {/* Title & Description Column */}
                        <td className="py-4 px-4 align-top max-w-md xl:max-w-xl">
                          <div className="flex items-center gap-2 mb-1">
                            {badge && (
                              <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${colors.badge}`}>
                                {badge}
                              </span>
                            )}
                            {doc.publicationDate && (
                              <span className="text-[10px] font-mono text-muted">
                                {doc.publicationDate}
                              </span>
                            )}
                          </div>
                          <Link
                            href={`/papers/${doc.slug}`}
                            className="font-bold text-primary group-hover:text-dutchOrange transition-colors block text-sm sm:text-base leading-snug"
                          >
                            {title}
                          </Link>
                          {subtitle && (
                            <p className="text-xs text-muted mt-1 font-light leading-relaxed line-clamp-2">
                              {subtitle}
                            </p>
                          )}
                        </td>

                        {/* Working Group Column */}
                        <td className="py-4 px-4 align-top whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg border ${colors.badge}`}>
                              <WGIcon className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="text-xs font-mono font-bold text-primary">
                                {doc.workingGroupId}
                              </div>
                              <div className="text-[11px] text-muted">
                                {doc.workingGroupName}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Reading Time Column */}
                        <td className="py-4 px-4 align-top whitespace-nowrap hidden sm:table-cell">
                          <div className="text-xs font-mono font-semibold text-primary">
                            {formatReadingTime(wordCount, language)}
                          </div>
                        </td>

                        {/* Canonical URL Column */}
                        <td className="py-4 px-4 align-top hidden lg:table-cell whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <code className="text-xs font-mono text-zinc-500 bg-canvas px-2 py-1 rounded border border-hairline">
                              /papers/{doc.slug}
                            </code>
                            <button
                              onClick={(e) => copyCanonicalUrl(doc.slug, e)}
                              className="p-1 rounded text-muted hover:text-dutchOrange hover:bg-subtle transition-colors"
                              title={t("papers_copy_canonical")}
                            >
                              {isCopied ? (
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </td>

                        {/* Actions Column */}
                        <td className="py-4 px-4 align-top text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Cite Button */}
                            <button
                              onClick={() => setCitingDoc(doc)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-canvas border border-hairline text-muted hover:text-dutchOrange text-xs font-mono transition-colors"
                              title={t("papers_cite_title")}
                            >
                              <Quote className="w-3 h-3" />
                              <span className="hidden xl:inline">{t("papers_cite_btn")}</span>
                            </button>

                            {/* Read Paper Link */}
                            <Link
                              href={`/papers/${doc.slug}`}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-dutchOrange/10 border border-dutchOrange/30 text-dutchOrange text-xs font-mono font-semibold hover:bg-dutchOrange hover:text-white transition-all shadow-sm"
                            >
                              <span>{t("papers_btn_read")}</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>

                            {/* Wiki Link */}
                            <Link
                              href={`/wiki?slug=${doc.slug}`}
                              className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-canvas border border-hairline text-muted hover:text-primary text-xs font-mono transition-colors"
                              title={t("papers_btn_wiki")}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* Bento Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDocs.map((doc) => {
                const WGIcon = WG_ICON_MAP[doc.workingGroupId] || FileText;
                const colors = WG_COLOR_MAP[doc.workingGroupId] || {
                  badge: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
                  border: "border-hairline",
                  text: "text-primary",
                };
                const title = language === "nl" && doc.titleNl ? doc.titleNl : doc.title;
                const subtitle = language === "nl" && doc.subtitleNl ? doc.subtitleNl : doc.subtitle;
                const badge = language === "nl" && doc.badgeNl ? doc.badgeNl : doc.badge;
                const isCopied = copiedSlug === doc.slug;
                const wordCount = getTreatiseWordCount(doc.slug);

                return (
                  <div
                    key={doc.id}
                    className="bg-surface rounded-2xl border border-hairline p-5 flex flex-col justify-between hover:shadow-md hover:border-dutchOrange/40 transition-all group"
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${colors.badge}`}>
                            {doc.workingGroupId}
                          </span>
                          <span className="font-mono text-[11px] text-muted">
                            {doc.id}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-muted text-xs font-mono">
                          <Clock className="w-3 h-3" />
                          <span>{formatReadingTime(wordCount, language)}</span>
                        </div>
                      </div>

                      {/* Title & Subtitle */}
                      <Link
                        href={`/papers/${doc.slug}`}
                        className="font-bold text-primary group-hover:text-dutchOrange transition-colors block text-base leading-snug"
                      >
                        {title}
                      </Link>

                      {subtitle && (
                        <p className="text-xs text-muted mt-2 font-light leading-relaxed line-clamp-3">
                          {subtitle}
                        </p>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 text-xs font-mono text-zinc-500">
                        <button
                          onClick={(e) => copyCanonicalUrl(doc.slug, e)}
                          className="flex items-center gap-1 hover:text-dutchOrange transition-colors"
                          title={t("papers_copy_canonical")}
                        >
                          {isCopied ? (
                            <span className="text-emerald-500 flex items-center gap-1 font-semibold">
                              <Check className="w-3 h-3" /> {t("papers_copied")}
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Copy className="w-3 h-3" /> /{doc.slug.slice(0, 14)}...
                            </span>
                          )}
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Cite Button */}
                        <button
                          onClick={() => setCitingDoc(doc)}
                          className="p-2 rounded-lg bg-canvas border border-hairline text-muted hover:text-dutchOrange transition-colors"
                          title={t("papers_cite_title")}
                        >
                          <Quote className="w-3.5 h-3.5" />
                        </button>

                        {/* Wiki Link */}
                        <Link
                          href={`/wiki?slug=${doc.slug}`}
                          className="p-2 rounded-lg bg-canvas border border-hairline text-muted hover:text-primary transition-colors"
                          title={t("papers_btn_wiki")}
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                        </Link>

                        {/* Read Link */}
                        <Link
                          href={`/papers/${doc.slug}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-dutchOrange text-white text-xs font-mono font-semibold hover:bg-dutchOrange/90 transition-colors shadow-sm"
                        >
                          <span>{t("papers_btn_read")}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>

        {/* Global Citation Modal */}
        <CitationModal
          doc={citingDoc}
          isOpen={!!citingDoc}
          onClose={() => setCitingDoc(null)}
        />
      </SiteChrome>
    </div>
  );
}

function PapersHubLoading() {
  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center font-mono text-xs text-primary">
      <div className="flex items-center gap-2">
        <Layers className="h-4 w-4 animate-spin text-dutchOrange" />
        <span>Loading Treatises Hub...</span>
      </div>
    </div>
  );
}

export default function PapersHubPage() {
  return (
    <Suspense fallback={<PapersHubLoading />}>
      <PapersHubContent />
    </Suspense>
  );
}
