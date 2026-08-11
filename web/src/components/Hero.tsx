"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 bg-[#0b0c0e] light:bg-[#FAF8F5] text-white light:text-[#18181B] transition-colors duration-300 selection:bg-dutchOrange selection:text-white border-b border-zinc-900/60 light:border-[#E8E3DA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl space-y-6">
          {/* Top Entity Label */}
          <div>
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block mb-1">
              {t("hero_badge" as any)}
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white light:text-[#18181B] tracking-tight leading-[1.15]">
            {t("hero_title_pre" as any)}{" "}
            <span className="text-dutchOrange">
              {t("hero_title_accent" as any)}
            </span>.
          </h1>

          <p className="font-sans text-base sm:text-lg text-zinc-300 light:text-[#52525B] font-light leading-relaxed max-w-3xl">
            {t("hero_subtitle" as any)}
          </p>

          <div className="pt-2 font-mono text-xs text-zinc-400 light:text-[#71717A] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-dutchOrange inline-block animate-pulse"></span>
            <span>{t("hero_tagline" as any)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
