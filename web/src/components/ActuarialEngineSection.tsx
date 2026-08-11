"use client";

import React from "react";
import { FileSpreadsheet } from "lucide-react";
import { MathFormula } from "@/components/MathFormula";
import { useLanguage } from "@/context/LanguageContext";

export const ActuarialEngineSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="actuarial"
      className="py-20 bg-subtle text-primary relative font-sans selection:bg-dutchOrange selection:text-white scroll-mt-24 border-b border-hairline transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
            {t("act_sec_tag")}
          </span>

          <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-primary">
            {t("act_sec_title")}
          </h2>

          <p className="text-sm sm:text-base text-secondary font-light leading-relaxed">
            {t("act_sec_desc")}
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Mathematical Spec */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-surface border border-hairline space-y-6 shadow-xl">
            <div className="space-y-3 border-b border-hairline pb-4">
              <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5 text-dutchOrange" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium block">
                {t("act_sec_spec_tag")}
              </span>
              <h3 className="font-sans text-xl sm:text-2xl font-semibold text-primary">
                {t("act_sec_spec_title")}
              </h3>
            </div>

            {/* KaTeX Rendered Clayton Copula Formula */}
            <div className="p-4 rounded-xl bg-subtle border border-hairline font-mono text-xs overflow-x-auto min-h-[60px] flex items-center justify-center">
              <MathFormula formula="C_\theta(u, v) = \left(u^{-\theta} + v^{-\theta} - 1\right)^{-1/\theta}, \quad \lambda_L = 2^{-1/\theta}" />
            </div>

            <p className="text-sm text-secondary font-sans leading-relaxed font-light">
              {t("act_sec_spec_desc")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs pt-2">
              <div className="p-4 rounded-xl bg-subtle border border-hairline space-y-1">
                <span className="text-muted block text-[10px]">{t("act_sec_clayton_label")}</span>
                <div className="text-dutchOrange font-bold text-sm">
                  <MathFormula formula="\lambda_L = 2^{-1/\theta} > 0" inline />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-subtle border border-hairline space-y-1">
                <span className="text-muted block text-[10px]">{t("act_sec_exclusion_label")}</span>
                <div className="text-primary font-bold text-xs">
                  {t("act_sec_exclusion_value")}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Actuarial Diagram Card */}
          <div className="lg:col-span-5 relative p-8 rounded-2xl bg-surface border border-hairline space-y-5 shadow-xl">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-dutchOrange font-semibold">
              {t("act_sec_arch_title")}
            </h4>

            <ul className="space-y-4 font-mono text-xs text-secondary">
              <li className="p-3 rounded-xl bg-subtle border border-hairline space-y-1">
                <div className="text-primary font-bold">{t("act_sec_m1_title")}</div>
                <p className="text-[11px] text-muted font-sans font-light">
                  {t("act_sec_m1_desc")}
                </p>
              </li>

              <li className="p-3 rounded-xl bg-subtle border border-hairline space-y-1">
                <div className="text-primary font-bold">{t("act_sec_m2_title")}</div>
                <p className="text-[11px] text-muted font-sans font-light">
                  {t("act_sec_m2_desc")}
                </p>
              </li>

              <li className="p-3 rounded-xl bg-subtle border border-hairline space-y-1">
                <div className="text-primary font-bold">{t("act_sec_m3_title")}</div>
                <p className="text-[11px] text-muted font-sans font-light">
                  {t("act_sec_m3_desc")}
                </p>
              </li>

              <li className="p-3 rounded-xl bg-subtle border border-hairline space-y-1">
                <div className="text-primary font-bold">{t("act_sec_m4_title")}</div>
                <p className="text-[11px] text-muted font-sans font-light">
                  {t("act_sec_m4_desc")}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
