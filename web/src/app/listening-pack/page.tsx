"use client";

import React, { useRef, useState } from "react";
import { SiteChrome } from "@/components/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card } from "@/components/ui/Card";
import { SectionBand } from "@/components/ui/SectionBand";
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Send,
  Upload,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useListeningIntakeForm } from "@/lib/useListeningIntakeForm";
import { HeroCanvasBackground } from "@/components/canvas/HeroCanvasBackground";

type Role = "composer" | "therapist" | "researcher";
type Credit = "named" | "acknowledged" | "anonymous";

export default function ListeningPackReturnPage() {
  const { t } = useLanguage();
  const { submitted, sending, error, notice, submit, reset } = useListeningIntakeForm();

  const [returnText, setReturnText] = useState("");
  const [role, setRole] = useState<Role | "">("");
  const [credit, setCredit] = useState<Credit | "">("");
  const [email, setEmail] = useState("");
  const [uploadedName, setUploadedName] = useState<string | null>(null);
  const [readError, setReadError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);

  // The upload is a convenience on top of the textarea rather than a second
  // path. It reads the file into the same box the paste lands in, so what gets
  // sent is one value and the respondent can see it before it goes.
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setReadError(null);
    try {
      const text = await file.text();
      setReturnText(text);
      setUploadedName(file.name);
    } catch {
      setUploadedName(null);
      setReadError(t("lp_form_upload_failed"));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role || !credit) return;
    await submit({ returnText, role, credit, email });
  };

  const startAnother = () => {
    reset();
    setReturnText("");
    setUploadedName(null);
    setReadError(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  const roles: { id: Role; label: string }[] = [
    { id: "composer", label: t("lp_role_composer") },
    { id: "therapist", label: t("lp_role_therapist") },
    { id: "researcher", label: t("lp_role_researcher") },
  ];

  const credits: { id: Credit; label: string }[] = [
    { id: "named", label: t("lp_credit_named") },
    { id: "acknowledged", label: t("lp_credit_acknowledged") },
    { id: "anonymous", label: t("lp_credit_anonymous") },
  ];

  const steps = [
    t("lp_next_1"),
    t("lp_next_2"),
    t("lp_next_3"),
    t("lp_next_4"),
  ];

  return (
    <main className="min-h-screen bg-canvas text-primary transition-colors duration-300 relative font-sans selection:bg-dutchOrange selection:text-white">
      <SiteChrome>
        <section className="dark relative overflow-hidden border-b border-hairline min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] flex items-center">
          <div className="absolute inset-0 bg-[#0B0C0E]">
            <HeroCanvasBackground
              variant="streamlines"
              fallbackSrc="/assets/hero-vector-field.webp"
              fallbackClassName="object-cover object-[center_62%]"
              opacity={0.8}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 space-y-6">
            <Breadcrumb items={[{ label: t("lp_nav"), href: "/listening-pack" }]} />

            <div className="max-w-4xl space-y-4">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
                {t("lp_header_tag")}
              </span>

              <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-primary leading-tight">
                {t("lp_header_title")}
              </h1>

              <p className="text-base sm:text-lg text-secondary font-light leading-relaxed max-w-3xl">
                {t("lp_header_desc")}
              </p>
            </div>
          </div>
        </section>

        {/* What this page is. Short, because the pack and the brief already said
            everything about the study itself. */}
        <SectionBand variant="canvas">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-xs text-dutchOrange uppercase tracking-widest font-semibold block">
              {t("lp_what_tag")}
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
              {t("lp_what_title")}
            </h2>
            <p className="text-sm text-secondary font-light leading-relaxed">{t("lp_what_p1")}</p>
            <p className="text-sm text-secondary font-light leading-relaxed">{t("lp_what_p2")}</p>
            <p className="text-sm text-secondary font-light leading-relaxed">{t("lp_what_p3")}</p>
          </div>
        </SectionBand>

        {/* The form. */}
        <section id="lp-form" className="bg-subtle py-20 border-b border-hairline transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-2xl bg-surface border border-hairline shadow-2xl space-y-8">
              <div className="space-y-3 border-b border-hairline pb-6">
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
                  {t("lp_form_tag")}
                </span>
                <h2 className="font-sans text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary">
                  {t("lp_form_title")}
                </h2>
                <p className="text-sm text-secondary font-light leading-relaxed">{t("lp_form_desc")}</p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-subtle border border-hairline text-center space-y-5 font-mono">
                  <span className="text-dutchOrange font-bold text-sm block uppercase tracking-wider">
                    {t("lp_form_success_tag")}
                  </span>
                  <p className="text-xs text-secondary font-sans max-w-md mx-auto leading-relaxed">
                    {t("lp_form_success_msg")}
                  </p>
                  {notice && (
                    <p className="text-xs text-amber-600 font-sans max-w-lg mx-auto leading-relaxed bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 text-left">
                      <AlertTriangle className="w-3.5 h-3.5 inline-block mr-1.5 -mt-0.5" />
                      {notice}
                    </p>
                  )}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={startAnother}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dutchOrange/10 border border-dutchOrange/30 text-dutchOrange text-xs font-bold font-mono hover:bg-dutchOrange hover:text-white transition-all"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{t("lp_form_another")}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
                  {/* The returned text. */}
                  <div className="space-y-2">
                    <label htmlFor="lp-return-text" className="text-muted uppercase text-[11px] block">
                      {t("lp_form_text_label")}
                    </label>
                    <p className="text-[11px] text-secondary font-sans font-light leading-relaxed">
                      {t("lp_form_text_hint")}
                    </p>
                    <textarea
                      id="lp-return-text"
                      rows={14}
                      required
                      spellCheck={false}
                      value={returnText}
                      onChange={(e) => {
                        setReturnText(e.target.value);
                        setUploadedName(null);
                      }}
                      placeholder={t("lp_form_text_placeholder")}
                      className="w-full p-3 rounded-xl bg-subtle border border-hairline text-primary focus:outline-none focus:border-dutchOrange font-mono text-[11px] leading-relaxed"
                    />
                  </div>

                  {/* Upload, which fills the box above. */}
                  <div className="space-y-2">
                    <label htmlFor="lp-return-file" className="text-muted uppercase text-[11px] block">
                      {t("lp_form_upload_label")}
                    </label>
                    <input
                      id="lp-return-file"
                      ref={fileInput}
                      type="file"
                      accept=".txt,text/plain"
                      onChange={handleFile}
                      className="w-full p-3 rounded-xl bg-subtle border border-hairline text-secondary font-sans text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-dutchOrange/10 file:text-dutchOrange file:font-mono file:text-[11px] file:font-semibold hover:file:bg-dutchOrange/20"
                    />
                    {uploadedName && (
                      <p className="text-[11px] text-dutchOrange font-sans flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        {t("lp_form_upload_loaded")} {uploadedName}
                      </p>
                    )}
                    {readError && (
                      <p className="text-[11px] text-amber-600 font-sans">{readError}</p>
                    )}
                  </div>

                  {/* Path. */}
                  <div className="space-y-2">
                    <label className="text-muted uppercase text-[11px] block">{t("lp_form_role_label")}</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {roles.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          aria-pressed={role === option.id}
                          onClick={() => setRole(option.id)}
                          className={`p-3 rounded-xl transition-colors text-left ${
                            role === option.id
                              ? "bg-dutchOrange text-white font-bold"
                              : "bg-subtle border border-hairline text-secondary hover:text-primary"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Credit. */}
                  <div className="space-y-2">
                    <label className="text-muted uppercase text-[11px] block">{t("lp_form_credit_label")}</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {credits.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          aria-pressed={credit === option.id}
                          onClick={() => setCredit(option.id)}
                          className={`p-3 rounded-xl transition-colors text-left ${
                            credit === option.id
                              ? "bg-dutchOrange text-white font-bold"
                              : "bg-subtle border border-hairline text-secondary hover:text-primary"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Optional return address. */}
                  <div className="space-y-1">
                    <label htmlFor="lp-email" className="text-muted uppercase text-[10px] block">
                      {t("lp_form_email_label")}
                    </label>
                    <input
                      id="lp-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("lp_form_email_placeholder")}
                      className="w-full p-3 rounded-xl bg-subtle border border-hairline text-primary focus:outline-none focus:border-dutchOrange font-sans text-xs"
                    />
                    <p className="text-[11px] text-secondary font-sans font-light leading-relaxed pt-1">
                      {t("lp_form_email_hint")}
                    </p>
                  </div>

                  {error && (
                    <p className="text-xs text-amber-600 font-sans leading-relaxed bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3">
                      <AlertTriangle className="w-3.5 h-3.5 inline-block mr-1.5 -mt-0.5" />
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending || !role || !credit}
                    className="w-full py-3.5 rounded-xl bg-dutchOrange text-white font-semibold hover:bg-dutchOrange/90 transition-all shadow-lg flex items-center justify-center gap-2 font-mono text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    <span>{sending ? t("lp_form_sending") : t("lp_form_submit")}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* What happens next. */}
        <SectionBand variant="canvas">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-3">
              <span className="font-mono text-xs text-dutchOrange uppercase tracking-widest font-semibold block">
                {t("lp_next_tag")}
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
                {t("lp_next_title")}
              </h2>
            </div>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <Card key={index} variant="subtle" hoverEffect={false} className="p-5 flex gap-4 items-start">
                  <span className="font-mono text-[11px] text-dutchOrange font-semibold pt-0.5 flex-shrink-0">
                    0{index + 1}
                  </span>
                  <p className="text-sm text-secondary font-light leading-relaxed">{step}</p>
                </Card>
              ))}
            </div>
            <p className="text-xs text-muted font-sans font-light leading-relaxed flex items-start gap-2 pt-2">
              <CheckCircle2 className="w-4 h-4 text-dutchOrange flex-shrink-0 mt-0.5" />
              {t("lp_next_close")}
            </p>
          </div>
        </SectionBand>
      </SiteChrome>
    </main>
  );
}
