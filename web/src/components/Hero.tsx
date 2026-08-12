"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="dark relative overflow-hidden pt-28 pb-16 min-h-[480px] sm:min-h-[540px] lg:min-h-[620px] flex items-center selection:bg-dutchOrange selection:text-white border-b border-hairline"
    >
      {/* Vector Field Background */}
      <div className="absolute inset-0 bg-[#0B0C0E]">
        <picture>
          <source media="(max-width: 767px)" srcSet="/assets/hero-vector-field-mobile.webp" />
          <img
            src="/assets/hero-vector-field.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[65%_35%] opacity-55"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0E]/35 via-[#0B0C0E]/55 to-[#0B0C0E]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl space-y-6">
          {/* Top Entity Label */}
          <div>
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block mb-1">
              {t("hero_badge" as any)}
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-primary tracking-tight leading-[1.15]">
            {t("hero_title_pre" as any)}{" "}
            <span className="text-dutchOrange">
              {t("hero_title_accent" as any)}
            </span>.
          </h1>

          <p className="font-sans text-base sm:text-lg text-secondary font-light leading-relaxed max-w-3xl">
            {t("hero_subtitle" as any)}
          </p>

          <div className="pt-2 font-mono text-xs text-muted flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-dutchOrange inline-block animate-pulse"></span>
            <span>{t("hero_tagline" as any)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
