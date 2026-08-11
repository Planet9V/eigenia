"use client";

import React, { useState } from "react";
import {
  FileText,
  Clock,
  User,
  Calendar,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { WikiDocumentData, WorkingGroupCategory } from "@/lib/wiki";
import MarkdownViewer from "@/components/MarkdownViewer";

interface WikiDocumentViewerProps {
  docData: WikiDocumentData | null;
  workingGroup: WorkingGroupCategory | undefined;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export default function WikiDocumentViewer({
  docData,
  workingGroup,
  onNavigatePrev,
  onNavigateNext,
  hasPrev,
  hasNext,
}: WikiDocumentViewerProps) {
  const [copied, setCopied] = useState(false);

  if (!docData) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center text-slate-500 dark:text-slate-400">
        <ShieldAlert className="mb-4 h-12 w-12 text-slate-400" />
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          No Treatise Selected
        </h3>
        <p className="mt-1 max-w-sm text-xs text-slate-500 dark:text-slate-400">
          Select a Working Group treatise from the left table of contents sidebar to begin reading.
        </p>
      </div>
    );
  }

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-thin">
      {/* Top Header & Breadcrumbs Toolbar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/90 px-6 py-3.5 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/90">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
            {workingGroup?.number || docData.workingGroupId}
          </span>
          <span>/</span>
          <span className="truncate max-w-[200px] sm:max-w-[300px] text-slate-900 dark:text-white font-medium">
            {workingGroup?.title}
          </span>
          <span>/</span>
          <span className="font-mono text-[10px] text-slate-400">{docData.badge || "Treatise"}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            title="Copy Deep Link to URL"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-emerald-500">Copied</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                <span>Share Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Article Body */}
      <div className="flex-1 px-4 py-8 sm:px-8 max-w-5xl mx-auto w-full">
        {/* Document Header Banner */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100/50 p-6 shadow-sm dark:border-white/10 dark:from-slate-900/80 dark:to-slate-950/80">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-300">
              {docData.workingGroupId}
            </span>
            {docData.badge && (
              <span className="inline-flex items-center rounded-full border border-slate-300 dark:border-white/10 bg-slate-200/50 dark:bg-white/5 px-2.5 py-0.5 text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                {docData.badge}
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {docData.title}
          </h1>

          {docData.subtitle && (
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {docData.subtitle}
            </p>
          )}

          {/* Audit Verification Metadata Footer */}
          <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <div className="flex flex-wrap items-center gap-4">
              {docData.author && (
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  <span>{docData.author}</span>
                </div>
              )}
              {docData.publicationDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>{docData.publicationDate}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <span title="Character Count">
                {docData.charCount.toLocaleString()} chars
              </span>
              <span>•</span>
              <span title="Word Count">
                {docData.wordCount.toLocaleString()} words
              </span>
              <span>•</span>
              <span title="Line Count">
                {docData.lineCount.toLocaleString()} lines
              </span>
            </div>
          </div>
        </div>

        {/* Markdown & KaTeX Rendered Body */}
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <MarkdownViewer content={docData.content} />
        </article>

        {/* Bottom Pagination Footer */}
        <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6 dark:border-white/10">
          {hasPrev && onNavigatePrev ? (
            <button
              onClick={onNavigatePrev}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous Treatise</span>
            </button>
          ) : (
            <div />
          )}

          {hasNext && onNavigateNext ? (
            <button
              onClick={onNavigateNext}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
            >
              <span>Next Treatise</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
