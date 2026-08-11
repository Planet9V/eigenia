"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { EuComplianceFooter } from "@/components/EuComplianceFooter";
import { ImpressumModal } from "@/components/ImpressumModal";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { CheckCircle2, Send, ShieldCheck, FileSpreadsheet, GraduationCap, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function CollaboratePage() {
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [cookiesForceOpen, setCookiesForceOpen] = useState(false);

  const [selectedType, setSelectedType] = useState<string>("probono");
  const [selectedTrack, setSelectedTrack] = useState<string>("risk");
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Post to API endpoint targeted for jim@eigenia.nl
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          type: selectedType,
          track: selectedTrack,
          message,
          recipient: "jim@eigenia.nl",
        }),
      });
    } catch (err) {
      console.warn("API route failed, falling back to mailto", err);
    }

    // Trigger direct mailto dispatch pre-filled to jim@eigenia.nl
    const subject = encodeURIComponent(`[Eigenia Collaboration Proposal] ${selectedType.toUpperCase()} - ${company || name}`);
    const body = encodeURIComponent(
      `Full Name: ${name}\nEmail: ${email}\nOrganization: ${company}\nPathway: ${selectedType}\nTrack: ${selectedTrack}\n\nProposal Details:\n${message}`
    );
    window.location.href = `mailto:jim@eigenia.nl?subject=${subject}&body=${body}`;

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-canvas text-primary transition-colors duration-300 relative font-sans selection:bg-dutchOrange selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenCookies={() => setCookiesForceOpen(true)}
      />

      {/* Main Header Container */}
      <section className="bg-canvas pt-28 pb-12 border-b border-hairline transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb Navigation */}
          <Breadcrumb
            items={[
              { label: "Collaborate", href: "/collaborate" },
            ]}
          />

          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs text-dutchOrange uppercase tracking-widest font-semibold block">
              Engagement & Research Partnerships
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-primary leading-tight">
              Partner With Eigenia Labs
            </h1>

            <p className="text-base sm:text-lg text-secondary font-light leading-relaxed">
              We collaborate with critical infrastructure operators, academic research centers, and actuarial underwriters to deploy non-linear physical risk models and open standards.
            </p>
          </div>
        </div>
      </section>

      {/* Collaboration Pathways Grid */}
      <section className="bg-subtle py-20 border-b border-hairline transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs text-dutchOrange uppercase tracking-widest font-semibold block">
              Three Collaboration Tracks
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-primary">
              How We Work With Organizations
            </h2>
            <p className="text-sm text-secondary font-light leading-relaxed">
              Select the pathway tailored to your entity type: pro-bono defense for vital utilities, scientific co-authorship for academia, or risk portfolio validation for insurers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Track 1: Pro-Bono Defense Audit */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl bg-surface border border-hairline shadow-xl space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-dutchOrange/10 border border-dutchOrange/30 flex items-center justify-center text-dutchOrange">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-dutchOrange uppercase font-medium">Public Utility & Defense</span>
                <div className="space-y-1">
                  <h3 className="font-sans text-lg font-semibold text-primary">Pro-Bono SCADA Audit</h3>
                </div>
                <p className="text-xs text-secondary font-sans leading-relaxed font-light">
                  Eigenia B.V. provides confidential, pro-bono cyber-physical risk assessments for certified public drinking water utilities, regional power distribution grids, and agricultural logistics networks.
                </p>
                <ul className="space-y-2 text-xs text-muted font-sans border-t border-hairline pt-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0" /> Zero-cost for verified public infrastructure
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0" /> Non-disruptive digital twin modeling
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0" /> Executive board mitigation report
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Track 2: Academic & Scientific Research */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl bg-surface border border-hairline shadow-xl space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-dutchOrange/10 border border-dutchOrange/30 flex items-center justify-center text-dutchOrange">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-dutchOrange uppercase font-medium">University & Think Tank</span>
                <div className="space-y-1">
                  <h3 className="font-sans text-lg font-semibold text-primary">Academic Fellowship</h3>
                </div>
                <p className="text-xs text-secondary font-sans leading-relaxed font-light">
                  PhD researchers, complexity scientists, and open-source contributors join Eigenia Labs to co-author papers, validate mathematical proofs, and refine open datasets in algebraic topology.
                </p>
                <ul className="space-y-2 text-xs text-muted font-sans border-t border-hairline pt-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0" /> Open peer-reviewed publishing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0" /> Open-source telemetry & codebases
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0" /> Visiting fellow compute grants
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Track 3: Commercial & Actuarial Validation */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl bg-surface border border-hairline shadow-xl space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-dutchOrange/10 border border-dutchOrange/30 flex items-center justify-center text-dutchOrange">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-dutchOrange uppercase font-medium">Reinsurance & Actuarial</span>
                <div className="space-y-1">
                  <h3 className="font-sans text-lg font-semibold text-primary">Actuarial Validation</h3>
                </div>
                <p className="text-xs text-secondary font-sans leading-relaxed font-light">
                  Insurers, brokers, and industrial asset owners partner with Eigenia B.V. and Eigenia Labs to stress-test cyber-physical risk portfolios using Clayton copula tail dependence and DEXPI models.
                </p>
                <ul className="space-y-2 text-xs text-muted font-sans border-t border-hairline pt-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0" /> Portfolio tail-risk stress testing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0" /> DEXPI 2.0 schema integration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0" /> Custom catastrophe copula modeling
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="bg-canvas py-20 border-b border-hairline transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-2xl bg-surface border border-hairline shadow-2xl space-y-8">
            <div className="space-y-3 border-b border-hairline pb-6">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
                Application & Proposal Intake
              </span>
              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-primary">
                Submit Collaboration Proposal
              </h2>
              <p className="text-sm text-secondary font-light leading-relaxed">
                Fill out the details below to request a pro-bono defense audit, academic fellowship track, or commercial actuarial validation. Submissions are routed directly to <strong className="text-dutchOrange font-mono">jim@eigenia.nl</strong>.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-subtle border border-hairline text-center space-y-5 font-mono">
                <span className="text-dutchOrange font-bold text-sm block uppercase tracking-wider">
                  PROPOSAL DISPATCHED TO JIM@EIGENIA.NL
                </span>
                <p className="text-xs text-secondary font-sans max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Eigenia Labs. Your proposal details have been captured and queued for <strong className="text-primary">jim@eigenia.nl</strong>.
                </p>
                <div className="pt-2">
                  <a
                    href={`mailto:jim@eigenia.nl?subject=[Eigenia Proposal] ${selectedType.toUpperCase()}&body=Name: ${encodeURIComponent(name)}%0ACompany: ${encodeURIComponent(company)}%0A%0A${encodeURIComponent(message)}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dutchOrange text-white text-xs font-bold font-mono hover:bg-dutchOrange/90 transition-all shadow-md"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Direct Email to jim@eigenia.nl</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
                {/* Proposal Type Selection */}
                <div className="space-y-2">
                  <label className="text-muted uppercase text-[11px] block">Selected Engagement Pathway</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "probono", label: "Pro-Bono SCADA Audit" },
                      { id: "academic", label: "Academic Fellowship" },
                      { id: "commercial", label: "Actuarial / Commercial" },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedType(type.id)}
                        className={`p-3 rounded-xl transition-colors text-left ${
                          selectedType === type.id
                            ? "bg-dutchOrange text-white font-bold"
                            : "bg-subtle border border-hairline text-secondary hover:text-primary"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Research Track Selection */}
                <div className="space-y-2">
                  <label className="text-muted uppercase text-[11px] block">Target Research Track</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "risk", label: "Track 1 // Risk" },
                      { id: "dexpi", label: "Track 2 // DEXPI" },
                      { id: "actuarial", label: "Track 3 // Actuarial" },
                    ].map((track) => (
                      <button
                        key={track.id}
                        type="button"
                        onClick={() => setSelectedTrack(track.id)}
                        className={`p-3 rounded-xl transition-colors text-left ${
                          selectedTrack === track.id
                            ? "bg-dutchOrange text-white font-bold"
                            : "bg-subtle border border-hairline text-secondary hover:text-primary"
                        }`}
                      >
                        {track.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-muted uppercase text-[10px] block">Full Name / Lead Researcher</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr. Alexander Vance"
                      className="w-full p-3 rounded-xl bg-subtle border border-hairline text-primary focus:outline-none focus:border-dutchOrange font-sans text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-muted uppercase text-[10px] block">Institutional / Corporate Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vance@university.edu"
                      className="w-full p-3 rounded-xl bg-subtle border border-hairline text-primary focus:outline-none focus:border-dutchOrange font-sans text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-muted uppercase text-[10px] block">Organization / Utility Entity Name</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Institute for Physical Risk & Energy Grids"
                    className="w-full p-3 rounded-xl bg-subtle border border-hairline text-primary focus:outline-none focus:border-dutchOrange font-sans text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-muted uppercase text-[10px] block">Proposal Overview & Technical Objectives</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your research objectives, facility topology, or dataset validation requirements..."
                    className="w-full p-3 rounded-xl bg-subtle border border-hairline text-primary focus:outline-none focus:border-dutchOrange font-sans text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-dutchOrange text-white font-semibold hover:bg-dutchOrange/90 transition-all shadow-lg flex items-center justify-center gap-2 font-mono text-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Proposal to jim@eigenia.nl</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <EuComplianceFooter
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenCookies={() => setCookiesForceOpen(true)}
      />

      <ImpressumModal isOpen={impressumOpen} onClose={() => setImpressumOpen(false)} />
      <CookieConsentBanner forceOpen={cookiesForceOpen} onCloseForceOpen={() => setCookiesForceOpen(false)} />
    </main>
  );
}
