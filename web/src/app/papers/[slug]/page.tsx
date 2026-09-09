import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { EuComplianceFooter } from "@/components/EuComplianceFooter";
import { MarkdownViewer } from "@/components/MarkdownViewer";
import { getPaperBySlug, getAllPaperSlugs } from "@/lib/papers";
import { getAllWikiDocuments, getWikiDocumentBySlug } from "@/lib/wikiRegistry";
import { ArrowLeft, BookOpen, FileText, CheckCircle2, ShieldCheck, Hash , Clock} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/site";

/**
 * Registry dates read "May 4, 2026". Schema.org wants ISO 8601.
 *
 * Returns undefined rather than a guess when the string does not parse, or when
 * the registry holds something looser like "April 2024" with no day. A wrong
 * datePublished is worse than an absent one: a crawler will believe it.
 */
function toIsoDate(human?: string): string | undefined {
  if (!human) return undefined;
  if (!/\d{1,2},\s*\d{4}/.test(human)) return undefined;
  const parsed = new Date(`${human} UTC`);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString().slice(0, 10);
}

export async function generateStaticParams() {
  const slugs = getAllPaperSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const paper = getPaperBySlug(resolvedParams.slug);

  if (!paper) {
    return {
      title: "Paper Not Found | Eigenia B.V. & Eigenia Labs",
    };
  }

  // Every document carries a hand-written subtitle in the wiki registry, written
  // to be scannable. That is a better search snippet than the first 160
  // characters of the body, which truncate mid-sentence. The body is kept only
  // as a fallback for a document with no subtitle.
  const meta = getWikiDocumentBySlug(paper.slug);
  const cleanDescription =
    meta?.subtitle?.trim() ||
    paper.content
      .replace(/[#*`_~>]/g, "")
      .replace(/\s+/g, " ")
      .slice(0, 160)
      .trim();

  const paperUrl = `${SITE_URL}/papers/${paper.slug}`;

  return {
    title: `${paper.title} | Eigenia Research & Actuarial Treatises`,
    description: cleanDescription,
    keywords: [
      "Eigenia Labs",
      "Actuarial Science",
      "Cyber Digital Twin",
      "DEXPI 2.0",
      "CycloneDX 4-BOM",
      "Clayton Copula",
      "OT Cybersecurity",
      "Industrial Control Systems",
      meta?.workingGroupName ?? "",
      paper.number,
    ],
    authors: [{ name: "J. McKenney", url: SITE_URL }],
    creator: "Eigenia B.V.",
    publisher: "Eigenia Labs",
    alternates: {
      canonical: paperUrl,
    },
    openGraph: {
      title: paper.title,
      description: cleanDescription,
      url: paperUrl,
      siteName: "Eigenia B.V. & Eigenia Labs",
      locale: "en_US",
      type: "article",
      publishedTime: "2026-05-01T00:00:00.000Z",
      authors: ["J. McKenney"],
    },
    twitter: {
      card: "summary_large_image",
      title: paper.title,
      description: cleanDescription,
      creator: "@eigenia_bv",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
      },
    },
  };
}

export default async function PaperDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const paper = getPaperBySlug(resolvedParams.slug);

  if (!paper) {
    notFound();
  }

  // Schema.org JSON-LD Structured Data for AI Crawlers (ScholarlyArticle)
  //
  // Everything below the title comes from the wiki registry, which is metadata
  // only. Do not reach for @/lib/wiki here: it pulls the generated content
  // bundle and would put roughly 3.3 MB on this route.
  const docMeta = getWikiDocumentBySlug(paper.slug);
  const publishedIso = toIsoDate(docMeta?.publicationDate);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: paper.title,
    ...(docMeta?.subtitle ? { alternativeHeadline: docMeta.subtitle } : {}),
    // One taxonomy. paper.category was a second, hand-maintained one that had
    // drifted: "Actuarial Re-Invention" spanned four working groups, and all
    // seven Psychometrics papers carried it.
    articleSection: docMeta?.workingGroupName ?? "",
    name: paper.title,
    author: {
      "@type": "Person",
      name: docMeta?.author ?? "J. McKenney",
      affiliation: {
        "@type": "Organization",
        name: "Eigenia B.V.",
        url: SITE_URL,
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Eigenia B.V. & Eigenia Labs",
      url: SITE_URL,
      logo: `${SITE_URL}/assets/logo_square_dark.svg`,
    },
    // datePublished was absent entirely, so every treatise was undated to a
    // crawler. Emitted only when the registry actually holds a date; an invented
    // date is worse than none.
    ...(publishedIso
      ? { datePublished: publishedIso, dateModified: publishedIso }
      : {}),
    isPartOf: {
      "@type": "Periodical",
      name: `${docMeta?.workingGroupName ?? ""}, Eigenia Labs`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/papers/${paper.slug}`,
    },
    url: `${SITE_URL}/papers/${paper.slug}`,
    description:
      docMeta?.subtitle?.trim() ||
      paper.content.slice(0, 200).replace(/[#*`_]/g, "").trim(),
    wordCount: paper.wordCount,
    inLanguage: "en-US",
    license: "https://creativecommons.org/licenses/by/4.0/",
  };

  return (
    <main className="min-h-screen bg-canvas text-primary relative font-sans selection:bg-dutchOrange selection:text-white transition-colors duration-300">
      {/* Schema.org Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      {/* Top Research Wiki Dashboard Invitation Banner */}
      <div className="pt-20 bg-dutchOrange/10 border-b border-dutchOrange/30 px-4 py-2 text-center text-xs font-mono text-dutchOrange">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <BookOpen className="h-4 w-4 shrink-0" />
          <span>Reading in standalone mode. Open this treatise in the complete 2-Column Sovereign Research Wiki Engine:</span>
          <Link
            href={`/wiki?doc=${encodeURIComponent(paper.slug)}`}
            className="underline font-bold hover:text-white transition-colors"
          >
            Open Wiki Dashboard ({getAllWikiDocuments().length} Treatises) →
          </Link>
        </div>
      </div>

      {/* Hero Header Band */}
      <section className="bg-canvas pt-28 pb-12 border-b border-hairline transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-4xl space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-dutchOrange font-bold uppercase tracking-wider bg-dutchOrange/10 px-3 py-1 rounded-lg border border-dutchOrange/30">
                  {paper.number}
                </span>
                <span className="font-mono text-xs text-muted uppercase tracking-wider">
                  {docMeta?.workingGroupName}
                </span>
              </div>

              <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-primary leading-tight">
                {paper.title}
              </h1>

              {/* Exact Character & Verification Audit Badge */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-secondary pt-2">
                <span className="flex items-center gap-1.5 bg-subtle px-3 py-1.5 rounded-lg border border-hairline text-dutchOrange font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Complete & Untruncated
                </span>
                <span className="flex items-center gap-1.5 bg-subtle px-3 py-1.5 rounded-lg border border-hairline">
                  <Clock className="w-3.5 h-3.5 text-dutchOrange" />{" "}
                  {Math.max(1, Math.round(paper.wordCount / 225))} min read
                </span>
              </div>
            </div>

            <Link
              href="/tracks"
              className="px-4 py-2.5 rounded-xl bg-surface border border-hairline text-xs font-mono font-medium text-secondary hover:text-dutchOrange transition-all flex items-center gap-2 flex-shrink-0 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-dutchOrange" /> Return to Research Tracks
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-subtle py-16 border-b border-hairline transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-hairline shadow-2xl space-y-8">
            {/* Markdown & KaTeX Typeset Document Renderer */}
            <MarkdownViewer content={paper.content} suppressLeadingTitle={true} />

            {/* Document Verification Footer */}
            <div className="pt-8 border-t border-hairline flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-muted">
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

      <EuComplianceFooter />
    </main>
  );
}
