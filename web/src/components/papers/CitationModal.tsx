"use client";

import React, { useState, useEffect } from "react";
import { X, Copy, Check, Quote, ExternalLink, BookOpen, Layers } from "lucide-react";
import { WikiDocumentMeta } from "@/lib/wikiRegistry";
import { useLanguage } from "@/context/LanguageContext";

export interface CitationModalProps {
  doc: WikiDocumentMeta | null;
  isOpen: boolean;
  onClose: () => void;
}

type CitationFormat = "apa" | "bibtex" | "markdown" | "url";

export default function CitationModal({ doc, isOpen, onClose }: CitationModalProps) {
  const { language, t } = useLanguage();
  const [format, setFormat] = useState<CitationFormat>("apa");
  const [copied, setCopied] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !doc) return null;

  const title = language === "nl" && doc.titleNl ? doc.titleNl : doc.title;
  const subtitle = language === "nl" && doc.subtitleNl ? doc.subtitleNl : doc.subtitle;
  const canonicalUrl = `https://eigenia.nl/papers/${doc.slug}`;
  const cleanId = doc.id.toLowerCase().replace(/[^a-z0-9]/g, "_");

  const getCitationText = (fmt: CitationFormat): string => {
    switch (fmt) {
      case "apa":
        return `Eigenia Labs (2026). ${title}${subtitle ? `: ${subtitle}` : ""}. Sovereign Scientific Monograph ${doc.id}. Amsterdam: Eigenia B.V. Retrieved from ${canonicalUrl}`;
      case "bibtex":
        return `@article{eigenia_${cleanId},\n  title = {${title}},\n  author = {{Eigenia Labs}},\n  year = {2026},\n  journal = {Eigenia Sovereign Scientific Monographs},\n  series = {${doc.workingGroupId}},\n  number = {${doc.id}},\n  url = {${canonicalUrl}},\n  publisher = {Eigenia B.V.},\n  address = {Amsterdam, The Netherlands}\n}`;
      case "markdown":
        return `[${doc.id}: ${title}](${canonicalUrl})`;
      case "url":
        return canonicalUrl;
    }
  };

  const citationText = getCitationText(format);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(citationText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="citation-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-surface border border-hairline rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-5 border-b border-hairline bg-canvas/40">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-dutchOrange/10 border border-dutchOrange/30 text-dutchOrange mt-0.5">
              <Quote className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-canvas border border-hairline text-primary">
                  {doc.id}
                </span>
                <span className="text-[11px] font-mono text-muted">
                  {doc.workingGroupId}
                </span>
              </div>
              <h3 id="citation-modal-title" className="text-base font-bold text-primary leading-snug">
                {title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-subtle transition-colors"
            title={t("papers_cite_close")}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Format Switcher Tabs */}
        <div className="px-5 pt-4 pb-2 flex items-center gap-2 border-b border-hairline overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setFormat("apa")}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              format === "apa"
                ? "bg-dutchOrange text-white border-dutchOrange font-bold shadow-sm"
                : "bg-canvas border-hairline text-muted hover:text-primary"
            }`}
          >
            {t("papers_cite_format_apa")}
          </button>
          <button
            onClick={() => setFormat("bibtex")}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              format === "bibtex"
                ? "bg-dutchOrange text-white border-dutchOrange font-bold shadow-sm"
                : "bg-canvas border-hairline text-muted hover:text-primary"
            }`}
          >
            {t("papers_cite_format_bibtex")}
          </button>
          <button
            onClick={() => setFormat("markdown")}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              format === "markdown"
                ? "bg-dutchOrange text-white border-dutchOrange font-bold shadow-sm"
                : "bg-canvas border-hairline text-muted hover:text-primary"
            }`}
          >
            {t("papers_cite_format_markdown")}
          </button>
          <button
            onClick={() => setFormat("url")}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              format === "url"
                ? "bg-dutchOrange text-white border-dutchOrange font-bold shadow-sm"
                : "bg-canvas border-hairline text-muted hover:text-primary"
            }`}
          >
            {t("papers_cite_format_url")}
          </button>
        </div>

        {/* Citation Output Body */}
        <div className="p-5 space-y-4">
          <div className="relative">
            <pre className="p-4 rounded-xl bg-canvas border border-hairline text-xs font-mono text-primary whitespace-pre-wrap break-all select-all overflow-x-auto max-h-56 leading-relaxed">
              {citationText}
            </pre>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <a
              href={canonicalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-dutchOrange transition-colors"
            >
              <span>{canonicalUrl}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-sm ${
                copied
                  ? "bg-emerald-600 text-white"
                  : "bg-dutchOrange text-white hover:bg-dutchOrange/90"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{t("papers_cite_copied")}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t("papers_copy_canonical")}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
