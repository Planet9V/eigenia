import React from "react";
import { Navbar } from "@/components/Navbar";
import { EuComplianceFooter } from "@/components/EuComplianceFooter";
import { MarkdownViewer } from "@/components/MarkdownViewer";
import { getPaperBySlug, getAllPaperSlugs, getPaperBySlug as fetchPaper } from "@/lib/papers";
import { ArrowLeft, BookOpen, FileText, CheckCircle2, ShieldCheck, Layers, Hash } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = getAllPaperSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PaperDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const paper = getPaperBySlug(resolvedParams.slug);

  if (!paper) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0b0c0e] light:bg-[#FAF8F5] text-white light:text-[#18181B] relative font-sans selection:bg-dutchOrange selection:text-white transition-colors duration-300">
      <Navbar />

      {/* Hero Header Band (#0b0c0e) */}
      <section className="bg-[#0b0c0e] light:bg-[#FAF8F5] pt-28 pb-12 border-b border-zinc-900/60 light:border-[#E8E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-4xl space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-dutchOrange font-bold uppercase tracking-wider bg-dutchOrange/10 px-3 py-1 rounded-lg border border-dutchOrange/30">
                  {paper.number}
                </span>
                <span className="font-mono text-xs text-zinc-400 light:text-[#52525B] uppercase tracking-wider">
                  {paper.category}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-white light:text-[#18181B] leading-tight">
                {paper.title}
              </h1>

              {/* Exact Character & Verification Audit Badge */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 light:text-[#52525B] pt-2">
                <span className="flex items-center gap-1.5 bg-zinc-950 light:bg-[#EBE5DC] px-3 py-1.5 rounded-lg border border-zinc-800 light:border-[#E0D5C5] text-dutchOrange font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Complete & Untruncated
                </span>
                <span className="flex items-center gap-1.5 bg-zinc-950 light:bg-[#EBE5DC] px-3 py-1.5 rounded-lg border border-zinc-800 light:border-[#E0D5C5]">
                  <Hash className="w-3.5 h-3.5 text-dutchOrange" /> {paper.charCount.toLocaleString()} Characters
                </span>
                <span className="flex items-center gap-1.5 bg-zinc-950 light:bg-[#EBE5DC] px-3 py-1.5 rounded-lg border border-zinc-800 light:border-[#E0D5C5]">
                  <FileText className="w-3.5 h-3.5 text-dutchOrange" /> {paper.lineCount.toLocaleString()} Lines
                </span>
                <span className="flex items-center gap-1.5 bg-zinc-950 light:bg-[#EBE5DC] px-3 py-1.5 rounded-lg border border-zinc-800 light:border-[#E0D5C5]">
                  <BookOpen className="w-3.5 h-3.5 text-dutchOrange" /> {paper.wordCount.toLocaleString()} Words
                </span>
              </div>
            </div>

            <Link
              href="/tracks"
              className="px-4 py-2.5 rounded-xl bg-zinc-950 light:bg-white border border-zinc-800 light:border-[#E8E3DA] text-xs font-mono font-medium text-zinc-300 light:text-[#18181B] hover:text-dutchOrange transition-all flex items-center gap-2 flex-shrink-0 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-dutchOrange" /> Return to Research Tracks
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Section (#121417) */}
      <section className="bg-[#121417] light:bg-[#F3F0EC] py-16 border-b border-zinc-900/60 light:border-[#E8E3DA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="p-8 sm:p-12 rounded-3xl bg-[#131519] light:bg-white border border-[#22252c] light:border-[#E8E3DA] shadow-2xl space-y-8">
            
            {/* Markdown & KaTeX Typeset Document Renderer */}
            <MarkdownViewer content={paper.content} />

            {/* Document Verification Footer */}
            <div className="pt-8 border-t border-zinc-900 light:border-[#E8E3DA] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-400 light:text-[#52525B]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-dutchOrange" />
                <span>Eigenia Labs Open Scientific Publishing Standard</span>
              </div>
              <div>
                Exact Verification Audit: <strong className="text-dutchOrange">{paper.charCount.toLocaleString()} chars</strong>
              </div>
            </div>

          </div>

        </div>
      </section>

      <EuComplianceFooter onOpenImpressum={() => {}} onOpenCookies={() => {}} />
    </main>
  );
}
