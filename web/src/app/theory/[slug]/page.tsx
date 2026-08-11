import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { EuComplianceFooter } from "@/components/EuComplianceFooter";
import { theoryModelsList, TheoryModel } from "@/components/TheoryCatalogue";
import { ArrowLeft, Layers, Cpu, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MathFormula } from "@/components/MathFormula";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return theoryModelsList.map((model) => ({
    slug: model.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const model: TheoryModel | undefined = theoryModelsList.find(
    (item) => item.slug === resolvedParams.slug
  );

  if (!model) {
    return {
      title: "Model Not Found | Eigenia Applied Physics",
    };
  }

  const modelUrl = `https://eigenia.com/theory/${model.slug}`;

  return {
    title: `${model.name} | Eigenia Applied Physics Catalogue`,
    description: model.description.slice(0, 160),
    keywords: [
      "Eigenia Applied Physics",
      model.name,
      model.tag,
      "Cyber Digital Twin",
      "Non-Linear Dynamics",
      "OT Cybersecurity",
      "Industrial Control Systems",
      "Complex Systems Physics",
    ],
    authors: [{ name: "J. McKenney", url: "https://eigenia.com" }],
    creator: "Eigenia B.V.",
    publisher: "Eigenia Labs",
    alternates: {
      canonical: modelUrl,
    },
    openGraph: {
      title: `${model.name} — Eigenia Applied Physics`,
      description: model.description.slice(0, 160),
      url: modelUrl,
      siteName: "Eigenia B.V. & Eigenia Labs",
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${model.name} — Eigenia Applied Physics`,
      description: model.description.slice(0, 160),
      creator: "@eigenia_bv",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TheoryDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const model: TheoryModel | undefined = theoryModelsList.find(
    (item) => item.slug === resolvedParams.slug
  );

  if (!model) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: model.name,
    name: model.name,
    articleSection: "Applied Physics & Cyber-Physical Dynamics",
    description: model.description,
    author: {
      "@type": "Person",
      name: "J. McKenney",
      affiliation: {
        "@type": "Organization",
        name: "Eigenia B.V.",
        url: "https://eigenia.com",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Eigenia B.V. & Eigenia Labs",
      url: "https://eigenia.com",
    },
    url: `https://eigenia.com/theory/${model.slug}`,
    inLanguage: "en-US",
  };

  return (
    <main className="min-h-screen bg-[#0b0c0e] text-white relative font-sans selection:bg-dutchOrange selection:text-white">
      {/* Schema.org Structured Data Script for AI Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      {/* Hero Header Band (#0b0c0e) */}
      <section className="bg-[#0b0c0e] pt-28 pb-12 border-b border-zinc-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Breadcrumb
            items={[
              { label: "Applied Physics", href: "/physics" },
              { label: model.name },
            ]}
          />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-4xl space-y-4">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
                {model.number} // {model.tag}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-white leading-tight">
                {model.name}
              </h1>
            </div>

            <Link
              href="/physics#theory"
              className="px-4 py-2 rounded-xl bg-[#131519] border border-zinc-800 text-xs font-mono font-medium text-zinc-300 hover:text-dutchOrange hover:border-dutchOrange transition-all flex items-center gap-2 flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-dutchOrange" /> Applied Physics Catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Section (#121417) */}
      <section className="bg-[#121417] py-16 border-b border-zinc-900/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="p-8 sm:p-10 rounded-2xl bg-[#131519] border border-[#22252c] shadow-xl space-y-8">
            {/* Formula Callout with KaTeX Typesetting */}
            <div className="p-6 rounded-xl bg-[#0b0c0e] border border-zinc-800/60 space-y-4 shadow-inner">
              <div className="flex items-center justify-between text-xs font-mono text-dutchOrange uppercase tracking-wider">
                <span>Governing Mathematical Equation</span>
                <Cpu className="w-4 h-4 text-dutchOrange" />
              </div>
              <div className="py-4 text-center overflow-x-auto">
                <MathFormula formula={model.formula} />
              </div>
            </div>

            {/* Core Description */}
            <div className="space-y-4 text-zinc-300 font-sans text-base sm:text-lg leading-relaxed font-light">
              <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider text-dutchOrange">
                Systemic Risk Mechanism & Physics Formulation
              </h2>
              <p>{model.description}</p>
            </div>

            {/* Deliverables & Technical Proofs */}
            <div className="space-y-4 pt-6 border-t border-zinc-900 font-sans">
              <h2 className="text-base font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-dutchOrange" /> Key Technical Deliverables
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs pt-2">
                {model.deliverables.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#0b0c0e] border border-zinc-800/60 text-zinc-300 flex items-start gap-2">
                    <span className="text-dutchOrange font-bold mt-0.5">&bull;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Physical Application */}
            <div className="space-y-4 pt-6 border-t border-zinc-900">
              <h2 className="text-base font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-dutchOrange" /> Applied Sovereign Defense Integration
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed font-light">
                This mathematical framework is integrated into Eigenia's Digital Twin Engine to replace fragile compliance checklists with continuous physical safety proofs for critical energy, water, and food networks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <EuComplianceFooter />
    </main>
  );
}
