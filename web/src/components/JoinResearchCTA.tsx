"use client";

import React from "react";
import { ArrowRight, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export const JoinResearchCTA: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="join" className="py-20 bg-black light:bg-[#FAF8F5] text-white light:text-[#18181B] relative font-sans selection:bg-dutchOrange selection:text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container */}
        <div className="rounded-3xl bg-zinc-950/60 light:bg-white p-8 sm:p-12 shadow-2xl text-center space-y-6 border border-zinc-900 light:border-[#E8E3DA]">
          <span className="text-xs font-mono text-dutchOrange font-normal inline-block">
            {t("join_tag" as any)}
          </span>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white light:text-[#18181B] uppercase font-mono">
            {t("join_title" as any)}
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 light:text-[#52525B] font-light max-w-2xl mx-auto leading-relaxed">
            {t("join_desc" as any)}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 font-mono text-xs">
            <Link
              href="/collaborate"
              className="py-3 px-6 rounded-xl bg-dutchOrange text-white font-bold hover:bg-dutchOrange/90 transition-all shadow-lg flex items-center gap-2"
            >
              <span>{t("join_btn_apply" as any)}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="mailto:jim@eigenia.nl"
              className="py-3 px-6 rounded-xl bg-black light:bg-[#F4F0E8] text-zinc-300 light:text-[#18181B] border border-zinc-800 light:border-[#E8E3DA] hover:text-white transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-dutchOrange" />
              <span>jim@eigenia.nl</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
