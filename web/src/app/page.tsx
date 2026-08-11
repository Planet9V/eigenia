"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { KnowledgeTransfer } from "@/components/KnowledgeTransfer";
import { SCurveSection } from "@/components/SCurveSection";
import { Principles } from "@/components/Principles";
import { EuComplianceFooter } from "@/components/EuComplianceFooter";
import { ImpressumModal } from "@/components/ImpressumModal";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { FirstVisitSplash } from "@/components/FirstVisitSplash";
import { ArrowRight, Compass, Layers, Cpu, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [cookiesForceOpen, setCookiesForceOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-canvas text-primary transition-colors duration-300 relative font-sans selection:bg-dutchOrange selection:text-white">
      {/* First Visit Atmospheric Splash Entrance Sequence */}
      <FirstVisitSplash />

      {/* Top Navbar */}
      <Navbar
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenCookies={() => setCookiesForceOpen(true)}
      />

      {/* Hero Section */}
      <Hero />

      {/* Standalone Route Navigation Portals Showcase */}
      <section className="py-20 bg-subtle border-b border-hairline transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
              {t("portals_tag")}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-primary">
              {t("portals_title")}
            </h2>
            <p className="text-sm text-secondary font-light leading-relaxed">
              {t("portals_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
            {/* Portal 1: Mission */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-8 rounded-2xl bg-surface border border-hairline hover:border-dutchOrange/50 transition-all space-y-5 shadow-xl group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium block">
                  {t("portal_1_tag")}
                </span>
                <h3 className="font-sans text-lg font-semibold text-primary group-hover:text-dutchOrange transition-colors">
                  {t("portal_1_title")}
                </h3>
                <p className="text-xs text-muted font-sans leading-relaxed">
                  {t("portal_1_desc")}
                </p>
              </div>

              <Link
                href="/mission"
                className="pt-4 border-t border-hairline text-dutchOrange font-bold flex items-center justify-between group-hover:translate-x-1 transition-transform"
              >
                <span>{t("portal_1_cta")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Portal 2: Research Tracks */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-8 rounded-2xl bg-surface border border-hairline hover:border-dutchOrange/50 transition-all space-y-5 shadow-xl group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium block">
                  {t("portal_2_tag")}
                </span>
                <h3 className="font-sans text-lg font-semibold text-primary group-hover:text-dutchOrange transition-colors">
                  {t("portal_2_title")}
                </h3>
                <p className="text-xs text-muted font-sans leading-relaxed">
                  {t("portal_2_desc")}
                </p>
              </div>

              <Link
                href="/tracks"
                className="pt-4 border-t border-hairline text-dutchOrange font-bold flex items-center justify-between group-hover:translate-x-1 transition-transform"
              >
                <span>{t("portal_2_cta")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Portal 3: Applied Physics */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-8 rounded-2xl bg-surface border border-hairline hover:border-dutchOrange/50 transition-all space-y-5 shadow-xl group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium block">
                  {t("portal_3_tag")}
                </span>
                <h3 className="font-sans text-lg font-semibold text-primary group-hover:text-dutchOrange transition-colors">
                  {t("portal_3_title")}
                </h3>
                <p className="text-xs text-muted font-sans leading-relaxed">
                  {t("portal_3_desc")}
                </p>
              </div>

              <Link
                href="/physics"
                className="pt-4 border-t border-hairline text-dutchOrange font-bold flex items-center justify-between group-hover:translate-x-1 transition-transform"
              >
                <span>{t("portal_3_cta")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Portal 4: Collaborate */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-8 rounded-2xl bg-surface border border-hairline hover:border-dutchOrange/50 transition-all space-y-5 shadow-xl group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium block">
                  {t("portal_4_tag")}
                </span>
                <h3 className="font-sans text-lg font-semibold text-primary group-hover:text-dutchOrange transition-colors">
                  {t("portal_4_title")}
                </h3>
                <p className="text-xs text-muted font-sans leading-relaxed">
                  {t("portal_4_desc")}
                </p>
              </div>

              <Link
                href="/collaborate"
                className="pt-4 border-t border-hairline text-dutchOrange font-bold flex items-center justify-between group-hover:translate-x-1 transition-transform"
              >
                <span>{t("portal_4_cta")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* S-Curve Phase Transitions Section */}
      <SCurveSection />

      {/* Principles Section */}
      <Principles />

      {/* Knowledge Transfer Pipeline Section */}
      <KnowledgeTransfer />

      {/* Footer */}
      <EuComplianceFooter
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenCookies={() => setCookiesForceOpen(true)}
      />

      {/* Modals & Banners */}
      <ImpressumModal isOpen={impressumOpen} onClose={() => setImpressumOpen(false)} />
      <CookieConsentBanner forceOpen={cookiesForceOpen} onCloseForceOpen={() => setCookiesForceOpen(false)} />
    </main>
  );
}
