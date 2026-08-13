"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SiteChrome } from "@/components/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card } from "@/components/ui/Card";
import { SectionBand } from "@/components/ui/SectionBand";
import {
  CheckCircle2,
  Send,
  ShieldCheck,
  FileSpreadsheet,
  GraduationCap,
  HeartHandshake,
  Mail,
  FlaskConical,
  Atom,
  Lock,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useContactForm } from "@/lib/useContactForm";

type Pathway = "probono" | "academic" | "commercial" | "sponsor";

// Tracks are meaningful for academic/commercial engagements (they map to a
// specific research track — Risk, DEXPI, Actuarial). A one-time or recurring
// gift to the lab has no research track to select, so the field is hidden
// for that pathway rather than shown as a dead, unanswerable field.
const TRACK_SELECTOR_PATHWAYS: Pathway[] = ["probono", "academic", "commercial"];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function CollaboratePage() {
  const { t } = useLanguage();
  const { submitted, error, submit } = useContactForm();

  const [selectedType, setSelectedType] = useState<Pathway>("probono");
  const [selectedTrack, setSelectedTrack] = useState<string>("risk");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const submitLabelKey: Record<Pathway, string> = {
    probono: "collab_form_submit_probono",
    academic: "collab_form_submit_academic",
    commercial: "collab_form_submit_commercial",
    sponsor: "collab_form_submit_sponsor",
  };

  const emailLabelKey = selectedType === "sponsor" ? "collab_form_email_label_sponsor" : "collab_form_email_label";
  const orgLabelKey = selectedType === "sponsor" ? "collab_form_org_label_sponsor" : "collab_form_org_label";
  const msgLabelKey = selectedType === "sponsor" ? "collab_form_msg_label_sponsor" : "collab_form_msg_label";

  const emailPlaceholder =
    selectedType === "sponsor"
      ? "you@example.com"
      : selectedType === "probono"
      ? "ops@utility-authority.gov"
      : selectedType === "commercial"
      ? "underwriting@insurer.com"
      : "vance@university.edu";

  const orgPlaceholder =
    selectedType === "sponsor"
      ? "Foundation name, or leave blank"
      : selectedType === "probono"
      ? "Regional Water Authority / Grid Operator"
      : "Institute for Physical Risk & Energy Grids";

  const messagePlaceholder =
    selectedType === "sponsor"
      ? "One-time gift, a named research fund, or recurring support — tell us what you have in mind..."
      : "Describe your research objectives, facility topology, or dataset validation requirements...";

  const showTrackSelector = TRACK_SELECTOR_PATHWAYS.includes(selectedType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await submit(
      {
        name,
        email,
        company,
        type: selectedType,
        track: showTrackSelector ? selectedTrack : "n/a",
        message,
      },
      {
        subject: `[Eigenia Collaboration Proposal] ${selectedType.toUpperCase()} - ${company || name}`,
        body: `Full Name: ${name}\nEmail: ${email}\nOrganization: ${company}\nPathway: ${selectedType}\nTrack: ${
          showTrackSelector ? selectedTrack : "n/a"
        }\n\nProposal Details:\n${message}`,
      }
    );
  };

  const tracks: { id: Pathway; tag: string; title: string; desc: string; f1: string; f2: string; f3: string; cta: string; icon: React.ReactNode }[] = [
    {
      id: "probono",
      tag: t("collab_t1_tag"),
      title: t("collab_t1_title"),
      desc: t("collab_t1_desc"),
      f1: t("collab_t1_f1"),
      f2: t("collab_t1_f2"),
      f3: t("collab_t1_f3"),
      cta: t("collab_t1_cta"),
      icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
      id: "academic",
      tag: t("collab_t2_tag"),
      title: t("collab_t2_title"),
      desc: t("collab_t2_desc"),
      f1: t("collab_t2_f1"),
      f2: t("collab_t2_f2"),
      f3: t("collab_t2_f3"),
      cta: t("collab_t2_cta"),
      icon: <GraduationCap className="w-6 h-6" />,
    },
    {
      id: "commercial",
      tag: t("collab_t3_tag"),
      title: t("collab_t3_title"),
      desc: t("collab_t3_desc"),
      f1: t("collab_t3_f1"),
      f2: t("collab_t3_f2"),
      f3: t("collab_t3_f3"),
      cta: t("collab_t3_cta"),
      icon: <FileSpreadsheet className="w-6 h-6" />,
    },
    {
      id: "sponsor",
      tag: t("collab_t4_tag"),
      title: t("collab_t4_title"),
      desc: t("collab_t4_desc"),
      f1: t("collab_t4_f1"),
      f2: t("collab_t4_f2"),
      f3: t("collab_t4_f3"),
      cta: t("collab_t4_cta"),
      icon: <HeartHandshake className="w-6 h-6" />,
    },
  ];

  const trustPoints = [
    { title: t("collab_trust_p1_title"), desc: t("collab_trust_p1_desc"), icon: <FlaskConical className="w-5 h-5" /> },
    { title: t("collab_trust_p2_title"), desc: t("collab_trust_p2_desc"), icon: <Atom className="w-5 h-5" /> },
    { title: t("collab_trust_p3_title"), desc: t("collab_trust_p3_desc"), icon: <Lock className="w-5 h-5" /> },
  ];

  return (
    <main className="min-h-screen bg-canvas text-primary transition-colors duration-300 relative font-sans selection:bg-dutchOrange selection:text-white">
      <SiteChrome>
        {/* Main Header Container */}
        <section className="bg-canvas pt-28 pb-12 border-b border-hairline transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <Breadcrumb items={[{ label: t("nav_collaborate"), href: "/collaborate" }]} />

            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-3xl space-y-4"
            >
              <span className="font-mono text-xs text-dutchOrange uppercase tracking-widest font-semibold block">
                {t("collab_header_tag")}
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-primary leading-tight">
                {t("collab_header_title")}
              </h1>

              <p className="text-base sm:text-lg text-secondary font-light leading-relaxed">
                {t("collab_header_desc")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Trust Signals — why work with a think tank you haven't heard of,
            answered before the ask, not after. Methodology transparency and
            confidentiality posture, not fabricated stats. */}
        <SectionBand variant="canvas">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="font-mono text-xs text-dutchOrange uppercase tracking-widest font-semibold block">
              {t("collab_trust_tag")}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-primary">
              {t("collab_trust_title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {trustPoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col gap-3 p-6 rounded-2xl bg-subtle border border-hairline"
              >
                <div className="w-9 h-9 rounded-lg bg-dutchOrange/10 border border-dutchOrange/30 flex items-center justify-center text-dutchOrange">
                  {point.icon}
                </div>
                <h3 className="font-sans text-sm font-semibold text-primary">{point.title}</h3>
                <p className="text-xs text-secondary font-light leading-relaxed">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </SectionBand>

        {/* Collaboration Pathways Grid — 4 tracks */}
        <SectionBand variant="subtle">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="font-mono text-xs text-dutchOrange uppercase tracking-widest font-semibold block">
              {t("collab_tracks_tag")}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-primary">
              {t("collab_tracks_title")}
            </h2>
            <p className="text-sm text-secondary font-light leading-relaxed">{t("collab_tracks_desc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map((track, i) => (
              <Card
                key={track.id}
                variant="elevated"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-7 space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-dutchOrange/10 border border-dutchOrange/30 flex items-center justify-center text-dutchOrange">
                    {track.icon}
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-dutchOrange uppercase font-medium block">
                    {track.tag}
                  </span>
                  <h3 className="font-sans text-lg font-semibold text-primary">{track.title}</h3>
                  <p className="text-xs text-secondary font-sans leading-relaxed font-light">{track.desc}</p>
                  <ul className="space-y-2 text-xs text-muted font-sans border-t border-hairline pt-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0" /> {track.f1}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0" /> {track.f2}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0" /> {track.f3}
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedType(track.id);
                    document.getElementById("collab-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="w-full py-2.5 rounded-xl bg-dutchOrange/10 border border-dutchOrange/30 text-dutchOrange text-xs font-semibold font-mono hover:bg-dutchOrange hover:text-white transition-all"
                >
                  {track.cta}
                </button>
              </Card>
            ))}
          </div>
        </SectionBand>

        {/* Application Form Section */}
        <section id="collab-form" className="bg-canvas py-20 border-b border-hairline transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="p-8 sm:p-12 rounded-2xl bg-surface border border-hairline shadow-2xl space-y-8"
            >
              <div className="space-y-3 border-b border-hairline pb-6">
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
                  {t("collab_form_tag")}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-primary">
                  {t("collab_form_title")}
                </h2>
                <p className="text-sm text-secondary font-light leading-relaxed">{t("collab_form_desc")}</p>
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
                      href={`mailto:jim@eigenia.nl?subject=[Eigenia Proposal] ${selectedType.toUpperCase()}&body=Name: ${encodeURIComponent(
                        name
                      )}%0ACompany: ${encodeURIComponent(company)}%0A%0A${encodeURIComponent(message)}`}
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
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { id: "probono" as Pathway, label: t("collab_form_pathway_opt1") },
                        { id: "academic" as Pathway, label: t("collab_form_pathway_opt2") },
                        { id: "commercial" as Pathway, label: t("collab_form_pathway_opt3") },
                        { id: "sponsor" as Pathway, label: t("collab_form_pathway_opt4") },
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

                  {/* Research Track Selection — hidden for the sponsor pathway,
                      which has no research track to select. */}
                  {showTrackSelector && (
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
                  )}

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
                      <label className="text-muted uppercase text-[10px] block">{t(emailLabelKey)}</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={emailPlaceholder}
                        className="w-full p-3 rounded-xl bg-subtle border border-hairline text-primary focus:outline-none focus:border-dutchOrange font-sans text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-muted uppercase text-[10px] block">{t(orgLabelKey)}</label>
                    <input
                      type="text"
                      required={selectedType !== "sponsor"}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={orgPlaceholder}
                      className="w-full p-3 rounded-xl bg-subtle border border-hairline text-primary focus:outline-none focus:border-dutchOrange font-sans text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-muted uppercase text-[10px] block">{t(msgLabelKey)}</label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={messagePlaceholder}
                      className="w-full p-3 rounded-xl bg-subtle border border-hairline text-primary focus:outline-none focus:border-dutchOrange font-sans text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-dutchOrange text-white font-semibold hover:bg-dutchOrange/90 transition-all shadow-lg flex items-center justify-center gap-2 font-mono text-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t(submitLabelKey[selectedType])}</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </SiteChrome>
    </main>
  );
}
