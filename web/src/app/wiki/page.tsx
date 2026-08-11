"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Menu, ArrowLeft, BookOpen, Layers } from "lucide-react";
import Link from "next/link";
import {
  WORKING_GROUPS,
  getAllWikiDocuments,
  getWikiDocumentById,
  getWorkingGroupById,
  WikiDocumentData,
} from "@/lib/wiki";
import WikiAccordionSidebar from "@/components/wiki/WikiAccordionSidebar";
import WikiDocumentViewer from "@/components/wiki/WikiDocumentViewer";

function WikiContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramWg = searchParams.get("wg") || "WG-01-UI";
  const paramDoc = searchParams.get("doc") || searchParams.get("slug") || "WG-01-UI-1-Overview";

  const [activeWgId, setActiveWgId] = useState<string>(paramWg);
  const [activeDocId, setActiveDocId] = useState<string>(paramDoc);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const wg = searchParams.get("wg");
    const doc = searchParams.get("doc") || searchParams.get("slug");
    if (wg) setActiveWgId(wg);
    if (doc) setActiveDocId(doc);
  }, [searchParams]);

  const allDocs = useMemo(() => getAllWikiDocuments(), []);

  const activeDocData: WikiDocumentData | null = useMemo(() => {
    return getWikiDocumentById(activeDocId);
  }, [activeDocId]);

  const currentWg = useMemo(() => {
    if (activeDocData) {
      return getWorkingGroupById(activeDocData.workingGroupId);
    }
    return getWorkingGroupById(activeWgId) || WORKING_GROUPS[0];
  }, [activeDocData, activeWgId]);

  const activeIndex = useMemo(() => {
    return allDocs.findIndex(
      (d) =>
        d.id.toLowerCase() === activeDocId.toLowerCase() ||
        d.slug.toLowerCase() === activeDocId.toLowerCase()
    );
  }, [allDocs, activeDocId]);

  const handleSelectDocument = (wgId: string, docId: string) => {
    setActiveWgId(wgId);
    setActiveDocId(docId);
    router.push(`/wiki?wg=${encodeURIComponent(wgId)}&doc=${encodeURIComponent(docId)}`, {
      scroll: false,
    });
  };

  const handleNavigatePrev = () => {
    if (activeIndex > 0) {
      const prevDoc = allDocs[activeIndex - 1];
      handleSelectDocument(prevDoc.workingGroupId, prevDoc.id);
    }
  };

  const handleNavigateNext = () => {
    if (activeIndex < allDocs.length - 1) {
      const nextDoc = allDocs[activeIndex + 1];
      handleSelectDocument(nextDoc.workingGroupId, nextDoc.id);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-canvas text-primary font-sans">
      {/* Left Accordion Table of Contents Sidebar */}
      <WikiAccordionSidebar
        activeDocId={activeDocId}
        activeWgId={activeWgId}
        onSelectDocument={handleSelectDocument}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Top Navbar Header */}
        <header className="flex h-14 items-center justify-between border-b border-hairline bg-surface px-4 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-1.5 text-muted hover:text-primary transition-colors lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link
              href="/tracks"
              className="flex items-center gap-1.5 text-xs text-muted hover:text-dutchOrange transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Research Tracks</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="hidden sm:inline-block font-mono text-[11px] text-muted">
              Eigenia Applied Complexity Think Tank
            </span>
            <div className="h-4 w-px bg-hairline hidden sm:block" />
            <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-dutchOrange">
              <BookOpen className="h-3.5 w-3.5" />
              Wiki Engine
            </span>
          </div>
        </header>

        {/* Viewport for Active Treatise */}
        <main className="flex-1 overflow-hidden min-w-0">
          <WikiDocumentViewer
            docData={activeDocData}
            workingGroup={currentWg}
            onNavigatePrev={handleNavigatePrev}
            onNavigateNext={handleNavigateNext}
            hasPrev={activeIndex > 0}
            hasNext={activeIndex < allDocs.length - 1}
          />
        </main>
      </div>
    </div>
  );
}

export default function WikiPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-canvas text-primary font-mono text-xs">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 animate-spin text-dutchOrange" />
            <span>Loading Sovereign Research Wiki...</span>
          </div>
        </div>
      }
    >
      <WikiContent />
    </Suspense>
  );
}
