"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Droplet, Apple, Zap, ShieldCheck } from "lucide-react";

export const Mission: React.FC = () => {
  const { t, lang } = useLanguage();

  return (
    <section
      id="mission"
      className="py-20 bg-subtle text-primary relative font-sans selection:bg-dutchOrange selection:text-white border-b border-hairline transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Unified Mission Statement & Artwork Block (Aligned Top to Bottom) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Seamless Aligned Content Block (No Card Outer Border) */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full border-l-2 border-l-dutchOrange pl-6 sm:pl-8 py-2 space-y-6">
            <div className="space-y-4">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-semibold block">
                {lang === "nl"
                  ? "Nederlandse B.V. Denktank voor Complexiteitswetenschap"
                  : "Dutch B.V. Applied Complexity Think Tank"}
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-primary">
                {t("mission_title")}
              </h2>

              <div className="w-12 h-0.5 bg-dutchOrange/40 rounded-full my-3" />

              <p className="text-base sm:text-lg text-secondary leading-relaxed font-sans font-light">
                &ldquo;{t("mission_desc")}&rdquo;
              </p>

              <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans font-light">
                {lang === "nl"
                  ? "Als Nederlandse B.V. denktank in Nederland slaat Eigenia de brug tussen theoretische fysica en soevereine infrastructuurbescherming. Wij leveren open wiskundige vergelijkingen, niet-destructieve SCADA-regelkringaudits en zelf-gehoste digitale tweeling-simulatienodes."
                  : "Operating as a Dutch B.V. research think tank in The Netherlands, Eigenia bridges theoretical physics and sovereign utility defense. We deliver open-access equations, non-destructive SCADA control loop audits, and self-hosted digital twin simulation nodes."}
              </p>
            </div>

            {/* Bottom Alignment Indicator Bar */}
            <div className="pt-4 border-t border-hairline/60 flex items-center justify-between font-mono text-xs text-dutchOrange">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-dutchOrange animate-pulse" />
                <span className="font-medium text-xs">
                  {lang === "nl" ? "Soeverein Beleid Infrastructuurbescherming" : "Sovereign Infrastructure Protection Policy"}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-[11px] text-muted font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-dutchOrange" />
                <span>KvK Nederland • Open Standards</span>
              </div>
            </div>
          </div>

          {/* Right Column: Flush Aligned Artwork (Matching Height) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 relative min-h-[340px] lg:min-h-[420px] rounded-2xl overflow-hidden shadow-2xl group border border-hairline/40"
          >
            <img
              src="/assets/Eigenia_2.png"
              alt="Eigenia Societal Infrastructure Protection"
              className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
          </motion.div>
        </div>

        {/* 3 Core Societal Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 font-mono text-xs">
          {/* Pillar 1: Water */}
          <div className="p-8 rounded-2xl bg-surface border border-hairline space-y-4 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
              <Droplet className="w-5 h-5" />
            </div>
            <h3 className="font-sans text-lg font-semibold text-primary">
              1. {t("mission_p1_title")}
            </h3>
            <p className="text-xs text-secondary font-sans leading-relaxed font-light">
              {t("mission_p1_desc")}
            </p>
          </div>

          {/* Pillar 2: Food */}
          <div className="p-8 rounded-2xl bg-surface border border-hairline space-y-4 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
              <Apple className="w-5 h-5" />
            </div>
            <h3 className="font-sans text-lg font-semibold text-primary">
              2. {t("mission_p2_title")}
            </h3>
            <p className="text-xs text-secondary font-sans leading-relaxed font-light">
              {t("mission_p2_desc")}
            </p>
          </div>

          {/* Pillar 3: Energy */}
          <div className="p-8 rounded-2xl bg-surface border border-hairline space-y-4 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-sans text-lg font-semibold text-primary">
              3. {t("mission_p3_title")}
            </h3>
            <p className="text-xs text-secondary font-sans leading-relaxed font-light">
              {t("mission_p3_desc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
