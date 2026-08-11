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
import { MarkdownViewer } from "@/components/MarkdownViewer";

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
      <div className="flex h-full flex-col items-center justify-center p-8 text-center text-muted">
        <ShieldAlert className="mb-4 h-12 w-12 text-muted" />
        <h3 className="text-base font-semibold text-primary">
          No Treatise Selected
        </h3>
        <p className="mt-1 max-w-sm text-xs text-muted">
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
    <div className="flex flex-col h-full overflow-y-auto scrollbar-thin bg-canvas">
      {/* Top Header & Breadcrumbs Toolbar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-hairline bg-surface/90 px-6 py-3.5 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="font-mono font-semibold text-dutchOrange">
            {workingGroup?.number || docData.workingGroupId}
          </span>
          <span>/</span>
          <span className="truncate max-w-[200px] sm:max-w-[300px] text-primary font-medium">
            {workingGroup?.title}
          </span>
          <span>/</span>
          <span className="font-mono text-[10px] text-muted">{docData.badge || "Treatise"}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 rounded-xl border border-hairline bg-subtle px-3 py-1.5 text-xs font-medium text-primary hover:border-dutchOrange/40 hover:text-dutchOrange transition-all"
            title="Copy Deep Link to URL"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-dutchOrange" />
                <span className="text-dutchOrange">Copied</span>
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
        <div className="mb-8 rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center rounded-full border border-dutchOrange/30 bg-dutchOrange/10 px-3 py-0.5 text-xs font-mono font-semibold text-dutchOrange">
              {docData.workingGroupId}
            </span>
            {docData.badge && (
              <span className="inline-flex items-center rounded-full border border-hairline bg-subtle px-3 py-0.5 text-xs font-mono font-medium text-secondary">
                {docData.badge}
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            {docData.title}
          </h1>

          {docData.subtitle && (
            <p className="mt-2 text-sm text-secondary leading-relaxed">
              {docData.subtitle}
            </p>
          )}

          {/* Audit Verification Metadata Footer */}
          <div className="mt-6 pt-4 border-t border-hairline flex flex-wrap items-center justify-between gap-4 text-xs text-muted font-mono">
            <div className="flex flex-wrap items-center gap-4">
              {docData.author && (
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-muted" />
                  <span>{docData.author}</span>
                </div>
              )}
              {docData.publicationDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted" />
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
        <article className="prose dark:prose-invert max-w-none text-primary">
          <MarkdownViewer content={docData.content} />
        </article>

        {/* Bottom Pagination Footer */}
        <div className="mt-12 flex items-center justify-between border-t border-hairline pt-6">
          {hasPrev && onNavigatePrev ? (
            <button
              onClick={onNavigatePrev}
              className="flex items-center gap-2 rounded-xl border border-hairline bg-surface px-4 py-2 text-xs font-medium text-primary hover:border-dutchOrange/40 hover:text-dutchOrange transition-all"
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
              className="flex items-center gap-2 rounded-xl border border-hairline bg-surface px-4 py-2 text-xs font-medium text-primary hover:border-dutchOrange/40 hover:text-dutchOrange transition-all"
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
