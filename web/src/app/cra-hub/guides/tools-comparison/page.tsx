"use client";

import React from "react";
import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  ArrowRight,
  Database,
  Clock,
  Scale
} from "lucide-react";

export default function ToolsComparisonGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "headline": "The Complete Guide to EU CRA Compliance Tools and Services (2026 Comparison)",
        "description": "An independent, vendor-agnostic review of 18 EU CRA compliance platforms, scanners, and Notified Body testing services.",
        "author": { "@type": "Organization", "name": "Eigenia Labs" },
        "publisher": { "@type": "Organization", "name": "Eigenia B.V." }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between Class I and Class II products under the CRA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Class I products (Annex III) can use Module A self-assessment if harmonized European standards exist. Class II products (Annex IV) such as industrial automation controllers and smart meters require mandatory third-party assessment by an accredited Notified Body."
            }
          },
          {
            "@type": "Question",
            "name": "How much do CRA compliance tools cost on average?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Self-serve SMB platforms cost between €19 and €149 per month, mid-market continuous compliance platforms cost between €400 and €1,200 per month, and enterprise binary firmware platforms cost between €15,000 and €60,000 annually."
            }
          },
          {
            "@type": "Question",
            "name": "Does my SaaS application fall under the Cyber Resilience Act?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pure SaaS falls under the NIS 2 Directive. However, if a cloud service is an essential remote data processing solution for a connected hardware product or software client, it is classified as a Product with Digital Elements under the CRA."
            }
          },
          {
            "@type": "Question",
            "name": "What is the 24-hour Article 14 notification rule?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Manufacturers must submit an early warning to the ENISA Single Reporting Platform and national CSIRTs within 24 hours of becoming aware that a vulnerability in their product is being actively exploited."
            }
          },
          {
            "@type": "Question",
            "name": "Can I self-certify my product for CE marking under the CRA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, default products that are not classified in Annex III or IV follow Module A internal control, allowing manufacturers to conduct internal testing, compile technical documentation, and affix the CE mark without an external Notified Body."
            }
          }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-canvas text-primary relative font-sans selection:bg-dutchOrange selection:text-white transition-colors duration-300">
      <SiteChrome>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Article Header */}
        <section className="relative overflow-hidden border-b border-hairline bg-surface/50 pt-28 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "CRA Conformity Hub", href: "/cra-hub" },
                { label: "Guides", href: "/cra-hub/guides" },
                { label: "Tools Comparison (2026)" }
              ]}
            />

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dutchOrange/10 border border-dutchOrange/30 text-dutchOrange text-xs font-mono font-semibold">
                <FileText className="w-4 h-4" />
                <span>Flagship Benchmark // 18 Platforms Evaluated</span>
              </div>
              <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
                The Complete Guide to EU CRA Compliance Tools and Services
              </h1>
              <div className="flex items-center gap-4 text-xs font-mono text-muted">
                <span>Published by Eigenia Labs</span>
                <span>•</span>
                <span>Updated September 2026</span>
                <span>•</span>
                <span>20 min read</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-secondary leading-relaxed">
          {/* Truth Box */}
          <div className="p-6 rounded-2xl bg-surface border border-dutchOrange/40 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-dutchOrange font-bold font-mono text-sm uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Eigenia Labs Empirical Truth Box</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-canvas border border-hairline">
                <span className="text-dutchOrange font-semibold block mb-1">Active Law Status</span>
                <p className="text-secondary text-[11px] leading-relaxed">
                  Article 14 24h early warning reporting via ENISA Single Reporting Platform took effect on September 11, 2026.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-canvas border border-hairline">
                <span className="text-dutchOrange font-semibold block mb-1">Notified Body Drought</span>
                <p className="text-secondary text-[11px] leading-relaxed">
                  NANDO database shows zero accredited Notified Bodies for CRA in late 2026, causing severe audit bottlenecks.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-canvas border border-hairline">
                <span className="text-dutchOrange font-semibold block mb-1">Standard PDE Scope</span>
                <p className="text-secondary text-[11px] leading-relaxed">
                  Over 90% of products follow Module A internal control; third-party audits apply solely to Annex III/IV items.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-canvas border border-hairline">
                <span className="text-dutchOrange font-semibold block mb-1">Machinery Reg Overlap</span>
                <p className="text-secondary text-[11px] leading-relaxed">
                  Regulation (EU) 2023/1230 mandatory in January 2027 requires cybersecurity 11 months before full CRA enforcement.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1 */}
          <section className="space-y-4 text-sm sm:text-base">
            <h2 className="text-2xl font-bold text-primary tracking-tight">
              Statutory Foundations: What Regulation (EU) 2024/2847 Requires
            </h2>
            <p>
              The European Union Cyber Resilience Act establishes mandatory cybersecurity requirements for all Products with Digital Elements (PDE). If your organization manufactures or imports connected devices, embedded controllers, desktop applications, or cloud remote data processing solutions, compliance is a legal precondition for European Single Market access.
            </p>
            <p>
              Under Article 10, manufacturers are held legally accountable across the entire product lifecycle. Compliance cannot be delegated to offshore contractors or upstream chip suppliers. Failing to satisfy essential requirements carries administrative penalties up to €15,000,000 or 2.5% of total worldwide annual turnover.
            </p>
          </section>

          {/* Section 2: Comparison Table */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-primary tracking-tight">
              Comprehensive 18-Tool Comparison Matrix
            </h2>
            <p className="text-sm">
              The table below summarizes verified capabilities, deployment models, and public pricing tiers for leading platforms evaluated by Eigenia Labs.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-hairline">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-surface text-primary border-b border-hairline">
                  <tr>
                    <th className="p-3">Platform</th>
                    <th className="p-3">Target Segment</th>
                    <th className="p-3">Pricing Tier</th>
                    <th className="p-3">Deployment</th>
                    <th className="p-3">Conformity Route</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline bg-canvas">
                  <tr>
                    <td className="p-3 font-bold text-dutchOrange">Regulus Cyber</td>
                    <td className="p-3">Industrial OT & Auto</td>
                    <td className="p-3">€2.5k – €15k / yr</td>
                    <td className="p-3">Cloud / On-Prem</td>
                    <td className="p-3">Module B+C / H</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-dutchOrange">Sbomify</td>
                    <td className="p-3">Cloud & SaaS PDE</td>
                    <td className="p-3">€499 – €1,200 / mo</td>
                    <td className="p-3">SaaS</td>
                    <td className="p-3">Module A</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-dutchOrange">CRA Portal</td>
                    <td className="p-3">Startups & SMB PDE</td>
                    <td className="p-3">€19 – €149 / mo</td>
                    <td className="p-3">SaaS</td>
                    <td className="p-3">Module A</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-dutchOrange">CVD Portal</td>
                    <td className="p-3">All PDE Products</td>
                    <td className="p-3">Free – €299 / mo</td>
                    <td className="p-3">SaaS</td>
                    <td className="p-3">All Routes</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-dutchOrange">CRA Check</td>
                    <td className="p-3">Hardware & Software</td>
                    <td className="p-3">€25 – €50 / mo</td>
                    <td className="p-3">SaaS</td>
                    <td className="p-3">Module A</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-dutchOrange">Venvera</td>
                    <td className="p-3">Mid-Market Hardware</td>
                    <td className="p-3">€399 – €899 / mo</td>
                    <td className="p-3">SaaS</td>
                    <td className="p-3">All Routes</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-dutchOrange">Complaro / OCCTET</td>
                    <td className="p-3">Open Source Devs</td>
                    <td className="p-3">Free FOSS</td>
                    <td className="p-3">Self-Hosted</td>
                    <td className="p-3">Module A</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-dutchOrange">Finite State</td>
                    <td className="p-3">Embedded IoT & Devices</td>
                    <td className="p-3">Enterprise Quote</td>
                    <td className="p-3">Cloud / On-Prem</td>
                    <td className="p-3">Module B+C / H</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-dutchOrange">Cybellum</td>
                    <td className="p-3">Automotive & Medical</td>
                    <td className="p-3">Enterprise Quote</td>
                    <td className="p-3">Cloud / On-Prem</td>
                    <td className="p-3">Module B+C / H</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-dutchOrange">Doyensec</td>
                    <td className="p-3">High-Risk Hardware</td>
                    <td className="p-3">€15k – €60k / audit</td>
                    <td className="p-3">Consultancy</td>
                    <td className="p-3">Module B+C / H</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-dutchOrange">TÜV SÜD</td>
                    <td className="p-3">Class I & II Hardware</td>
                    <td className="p-3">€1.8k – €3.2k / day</td>
                    <td className="p-3">Accredited CAB</td>
                    <td className="p-3">Module B+C / H</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-hairline flex items-center justify-between text-xs font-mono">
              <span>Looking for detailed individual profiles?</span>
              <Link href="/cra-hub/directory" className="text-dutchOrange font-bold hover:underline flex items-center gap-1">
                <span>View Full 18-Tool Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

          {/* Section 3: Common Misconceptions */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary tracking-tight">
              Three Common Misconceptions
            </h2>
            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-surface border border-hairline space-y-1">
                <span className="text-red-400 font-bold block">Myth 1: An SBOM guarantees full CRA compliance</span>
                <p className="text-secondary text-[11px] leading-relaxed">
                  Correction: The SBOM is only one component under Annex I Part II. You must also prove secure default passwords, data encryption, hardware debug locks, and reliable security updates.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-hairline space-y-1">
                <span className="text-red-400 font-bold block">Myth 2: Open-source components shift liability upstream</span>
                <p className="text-secondary text-[11px] leading-relaxed">
                  Correction: The final commercial manufacturer integrating open-source software assumes 100% legal responsibility under Article 10. Upstream volunteers are legally protected.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-hairline space-y-1">
                <span className="text-red-400 font-bold block">Myth 3: You have until late 2027 to begin preparation</span>
                <p className="text-secondary text-[11px] leading-relaxed">
                  Correction: Article 14 mandatory reporting took effect on September 11, 2026. If an actively exploited flaw affects your deployed products today, you must report it within 24 hours.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: FAQ */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 text-sm">
              <div className="p-5 rounded-xl bg-surface border border-hairline space-y-2">
                <h3 className="font-bold text-primary">What is the difference between Class I and Class II products?</h3>
                <p className="text-xs text-secondary leading-relaxed">
                  Class I products (Annex III) can use Module A self-assessment if harmonized European standards exist. Class II products (Annex IV) such as industrial automation controllers and smart meters require mandatory third-party assessment by an accredited Notified Body.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-hairline space-y-2">
                <h3 className="font-bold text-primary">How much do CRA compliance tools cost on average?</h3>
                <p className="text-xs text-secondary leading-relaxed">
                  Self-serve SMB platforms cost between €19 and €149 per month, mid-market continuous compliance platforms cost between €400 and €1,200 per month, and enterprise binary firmware platforms cost between €15,000 and €60,000 annually.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-hairline space-y-2">
                <h3 className="font-bold text-primary">Does my SaaS application fall under the Cyber Resilience Act?</h3>
                <p className="text-xs text-secondary leading-relaxed">
                  Pure SaaS falls under the NIS 2 Directive. However, if a cloud service is an essential remote data processing solution for a connected hardware product or software client, it is classified as a Product with Digital Elements under the CRA.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-hairline space-y-2">
                <h3 className="font-bold text-primary">What is the 24-hour Article 14 notification rule?</h3>
                <p className="text-xs text-secondary leading-relaxed">
                  Manufacturers must submit an early warning to the ENISA Single Reporting Platform and national CSIRTs within 24 hours of becoming aware that a vulnerability in their product is being actively exploited in the wild.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-hairline space-y-2">
                <h3 className="font-bold text-primary">Can I self-certify my product for CE marking under the CRA?</h3>
                <p className="text-xs text-secondary leading-relaxed">
                  Yes, default products that are not classified in Annex III or IV follow Module A internal control, allowing manufacturers to conduct internal testing, compile technical documentation, and affix the CE mark without an external Notified Body.
                </p>
              </div>
            </div>
          </section>

          {/* Navigation & Backlinks Footer */}
          <div className="pt-8 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <Link href="/cra-hub/guides" className="text-secondary hover:text-dutchOrange">
              ← Back to Guides Index
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/cra-hub/guides/industrial-ot" className="text-dutchOrange font-bold hover:underline">
                Next: Industrial OT Guide →
              </Link>
              <Link href="/cra-hub/directory" className="text-dutchOrange font-bold hover:underline">
                Explore Directory →
              </Link>
            </div>
          </div>
        </article>
      </SiteChrome>
    </main>
  );
}
