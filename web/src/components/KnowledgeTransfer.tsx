"use client";

import React from "react";
import { BookOpen, ShieldAlert, Cpu } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const KnowledgeTransfer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="transfer"
      className="py-20 bg-canvas text-primary relative font-sans selection:bg-dutchOrange selection:text-white border-b border-hairline transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
            {t("kt_tag" as any)}
          </span>

          <h2 className="font-sans text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary">
            {t("kt_title" as any)}
          </h2>

          <p className="text-sm sm:text-base text-secondary font-light leading-relaxed">
            {t("kt_desc" as any)}
          </p>
        </div>

        {/* 3 Steps Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          {/* Step 1: Open Science */}
          <div className="p-8 rounded-2xl bg-surface border border-hairline transition-all shadow-xl space-y-5 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-dutchOrange" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
                  STEP 01 // SCIENCE
                </span>
              </div>

              <h3 className="font-sans text-xl font-semibold text-primary group-hover:text-dutchOrange transition-colors">
                {t("kt_step1_title" as any)}
              </h3>

              <p className="text-sm text-secondary font-sans leading-relaxed font-light">
                {t("kt_step1_desc" as any)}
              </p>
            </div>
          </div>

          {/* Step 2: Commercial Audits */}
          <div className="p-8 rounded-2xl bg-surface border border-hairline transition-all shadow-xl space-y-5 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-dutchOrange" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
                  STEP 02 // COMMERCIAL AUDITS
                </span>
              </div>

              <h3 className="font-sans text-xl font-semibold text-primary group-hover:text-dutchOrange transition-colors">
                {t("kt_step2_title" as any)}
              </h3>

              <p className="text-sm text-secondary font-sans leading-relaxed font-light">
                {t("kt_step2_desc" as any)}
              </p>
            </div>
          </div>

          {/* Step 3: Sovereign Defense */}
          <div className="p-8 rounded-2xl bg-surface border border-hairline transition-all shadow-xl space-y-5 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-dutchOrange" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
                  STEP 03 // SOVEREIGN DEFENSE
                </span>
              </div>

              <h3 className="font-sans text-xl font-semibold text-primary group-hover:text-dutchOrange transition-colors">
                {t("kt_step3_title" as any)}
              </h3>

              <p className="text-sm text-secondary font-sans leading-relaxed font-light">
                {t("kt_step3_desc" as any)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
