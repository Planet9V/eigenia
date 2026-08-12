"use client";

import React, { useState } from "react";
import { SiteChrome } from "@/components/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CheckCircle2, Send, ShieldCheck, FileSpreadsheet, GraduationCap, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useContactForm } from "@/lib/useContactForm";

export default function CollaboratePage() {
  const { t } = useLanguage();
  const { submitted, error, submit } = useContactForm();

  const [selectedType, setSelectedType] = useState<string>("probono");
  const [selectedTrack, setSelectedTrack] = useState<string>("risk");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await submit(
      {
        name,
        email,
        company,
        type: selectedType,
        track: selectedTrack,
        message,
      },
      {
        subject: `[Eigenia Collaboration Proposal] ${selectedType.toUpperCase()} - ${company || name}`,
        body: `Full Name: ${name}\nEmail: ${email}\nOrganization: ${company}\nPathway: ${selectedType}\nTrack: ${selectedTrack}\n\nProposal Details:\n${message}`,
      }
    );
  };

  return (
    <main className="min-h-screen bg-canvas text-primary transition-colors duration-300 relative font-sans selection:bg-dutchOrange selection:text-white">
      <SiteChrome>
      {/* Main Header Container */}
      <section className="bg-canvas pt-28 pb-12 border-b border-hairline transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb Navigation */}
          <Breadcrumb
            items={[
              { label: t("nav_collaborate"), href: "/collaborate" },
            ]}
          />

          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs text-dutchOrange uppercase tracking-widest font-semibold block">
              {t("collab_header_tag")}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-primary leading-tight">
              {t("collab_header_title")}
            </h1>

            <p className="text-base sm:text-lg text-secondary font-light leading-relaxed">
              {t("collab_header_desc")}
            </p>
          </div>
        </div>
      </section>

      {/* Collaboration Pathways Grid */}
      <section className="bg-subtle py-20 border-b border-hairline transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs text-dutchOrange uppercase tracking-widest font-semibold block">
              {t("collab_tracks_tag")}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-primary">
              {t("collab_tracks_title")}
            </h2>
            <p className="text-sm text-secondary font-light leading-relaxed">
              {t("collab_tracks_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Track 1: Pro-Bono Defense Audit */}
            <div className="p-8 rounded-2xl bg-surface border border-hairline shadow-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-dutchOrange/10 border border-dutchOrange/30 flex items-center justify-center text-dutchOrange">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-dutchOrange uppercase font-medium">{t("collab_t1_tag")}</span>
                <div className="space-y-1">
                  <h3 className="font-sans text-lg font-semibold text-primary">{t("collab_t1_title")}</h3>
                </div>
                <p className="text-xs text-secondary font-sans leading-relaxed font-light">
                  {t("collab_t1_desc")}
                </p>
                <ul className="space-y-2 text-xs text-muted font-sans border-t border-hairline pt-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0" /> {t("collab_t1_f1")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0" /> {t("collab_t1_f2")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0" /> {t("collab_t1_f3")}
                  </li>
                </ul>
              </div>
            </div>

            {/* Track 2: Academic & Scientific Research */}
            <div className="p-8 rounded-2xl bg-surface border border-hairline shadow-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-dutchOrange/10 border border-dutchOrange/30 flex items-center justify-center text-dutchOrange">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-dutchOrange uppercase font-medium">{t("collab_t2_tag")}</span>
                <div className="space-y-1">
                  <h3 className="font-sans text-lg font-semibold text-primary">{t("collab_t2_title")}</h3>
                </div>
                <p className="text-xs text-secondary font-sans leading-relaxed font-light">
                  {t("collab_t2_desc")}
                </p>
                <ul className="space-y-2 text-xs text-muted font-sans border-t border-hairline pt-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0" /> {t("collab_t2_f1")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0" /> {t("collab_t2_f2")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0" /> {t("collab_t2_f3")}
                  </li>
                </ul>
              </div>
            </div>

            {/* Track 3: Commercial & Actuarial Validation */}
            <div className="p-8 rounded-2xl bg-surface border border-hairline shadow-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-dutchOrange/10 border border-dutchOrange/30 flex items-center justify-center text-dutchOrange">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-dutchOrange uppercase font-medium">{t("collab_t3_tag")}</span>
                <div className="space-y-1">
                  <h3 className="font-sans text-lg font-semibold text-primary">{t("collab_t3_title")}</h3>
                </div>
                <p className="text-xs text-secondary font-sans leading-relaxed font-light">
                  {t("collab_t3_desc")}
                </p>
                <ul className="space-y-2 text-xs text-muted font-sans border-t border-hairline pt-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0" /> {t("collab_t3_f1")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0" /> {t("collab_t3_f2")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0" /> {t("collab_t3_f3")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="bg-canvas py-20 border-b border-hairline transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-2xl bg-surface border border-hairline shadow-2xl space-y-8">
            <div className="space-y-3 border-b border-hairline pb-6">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
                {t("collab_form_tag")}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-primary">
                {t("collab_form_title")}
              </h2>
              <p className="text-sm text-secondary font-light leading-relaxed">
                {t("collab_form_desc")}
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-subtle border border-hairline text-center space-y-5 font-mono">
                <span className="text-dutchOrange font-bold text-sm block uppercase tracking-wider">
                  {t("collab_form_success_tag")}
                </span>
                <p className="text-xs text-secondary font-sans max-w-md mx-auto leading-relaxed">
                  {t("collab_form_success_msg")}
                </p>
                {error && (
                  <p className="text-xs text-amber-600 font-sans max-w-md mx-auto leading-relaxed bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}
                <div className="pt-2">
                  <a
                    href={`mailto:jim@eigenia.nl?subject=[Eigenia Proposal] ${selectedType.toUpperCase()}&body=Name: ${encodeURIComponent(name)}%0ACompany: ${encodeURIComponent(company)}%0A%0A${encodeURIComponent(message)}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dutchOrange text-white text-xs font-bold font-mono hover:bg-dutchOrange/90 transition-all shadow-md"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{t("collab_form_direct_email")}</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
                {/* Proposal Type Selection */}
                <div className="space-y-2">
                  <label className="text-muted uppercase text-[11px] block">{t("collab_form_pathway_label")}</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "probono", label: t("collab_form_pathway_opt1") },
                      { id: "academic", label: t("collab_form_pathway_opt2") },
                      { id: "commercial", label: t("collab_form_pathway_opt3") },
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
                  <label className="text-muted uppercase text-[11px] block">{t("collab_form_track_label")}</label>
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
                    <label className="text-muted uppercase text-[10px] block">{t("collab_form_name_label")}</label>
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
                    <label className="text-muted uppercase text-[10px] block">{t("collab_form_email_label")}</label>
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
                  <label className="text-muted uppercase text-[10px] block">{t("collab_form_org_label")}</label>
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
                  <label className="text-muted uppercase text-[10px] block">{t("collab_form_msg_label")}</label>
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
                  <span>{t("collab_form_submit_btn")}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      </SiteChrome>
    </main>
  );
}
