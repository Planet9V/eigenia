"use client";

import React from "react";
import { ShieldCheck, Cpu, Scale, RefreshCw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const Principles: React.FC = () => {
  const { t } = useLanguage();

  const principles = [
    {
      icon: ShieldCheck,
      number: "01",
      titleKey: "pr_1_title",
      descKey: "pr_1_desc",
    },
    {
      icon: Cpu,
      number: "02",
      titleKey: "pr_2_title",
      descKey: "pr_2_desc",
    },
    {
      icon: Scale,
      number: "03",
      titleKey: "pr_3_title",
      descKey: "pr_3_desc",
    },
    {
      icon: RefreshCw,
      number: "04",
      titleKey: "pr_4_title",
      descKey: "pr_4_desc",
    },
  ];

  return (
    <section id="principles" className="py-20 bg-[#121417] text-white relative font-sans selection:bg-dutchOrange selection:text-white border-b border-zinc-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
            {t("pr_tag" as any)}
          </span>

          <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-white">
            {t("pr_title" as any)}
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
            {t("pr_desc" as any)}
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {principles.map((pr) => {
            const IconComponent = pr.icon;
            return (
              <div
                key={pr.number}
                className="p-8 sm:p-10 rounded-2xl bg-[#131519] border border-[#22252c] hover:border-zinc-700/60 transition-all shadow-xl space-y-5 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-dutchOrange" />
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
                      AXIOM {pr.number}
                    </span>
                  </div>

                  <h3 className="font-sans text-xl sm:text-2xl font-semibold text-white group-hover:text-dutchOrange transition-colors">
                    {t(pr.titleKey as any)}
                  </h3>

                  <p className="text-sm text-zinc-300 font-sans leading-relaxed font-light">
                    {t(pr.descKey as any)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
