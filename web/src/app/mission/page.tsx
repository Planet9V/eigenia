"use client";

import React from "react";
import { SiteChrome } from "@/components/SiteChrome";
import { Mission } from "@/components/Mission";
import { Principles } from "@/components/Principles";
import { KnowledgeTransfer } from "@/components/KnowledgeTransfer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useLanguage } from "@/context/LanguageContext";

import { HeroCanvasBackground } from "@/components/canvas/HeroCanvasBackground";

export default function MissionPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-canvas text-primary relative font-sans selection:bg-dutchOrange selection:text-white transition-colors duration-300">
      <SiteChrome>
        {/* Main Header Container: Digital Twin Background */}
        <section className="dark relative overflow-hidden border-b border-hairline min-h-[480px] sm:min-h-[540px] lg:min-h-[620px] flex items-center">
          <div className="absolute inset-0 bg-[#0B0C0E]">
            <HeroCanvasBackground
              variant="digital-twin"
              fallbackSrc="/assets/hero-digital-twin.webp"
              fallbackClassName="object-cover object-[65%_center]"
              opacity={0.85}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 space-y-6">
            {/* Breadcrumb Navigation */}
            <Breadcrumb
              items={[
                { label: t("nav_mission"), href: "/mission" },
                { label: t("mission_title") },
              ]}
            />

            {/* Reconciled Single Page Header */}
            <div className="max-w-4xl space-y-4">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
                {t("mission_page_tag")}
              </span>
              <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-primary">
                {t("mission_page_title")}
              </h1>
              <p className="text-base sm:text-lg text-secondary font-light leading-relaxed max-w-3xl">
                {t("mission_page_desc")}
              </p>
            </div>
          </div>
        </section>

        {/* Mission Constitution Component */}
        <Mission />

        {/* Operating Principles Component */}
        <Principles />

        {/* Knowledge Transfer Pipeline Section */}
        <KnowledgeTransfer />
      </SiteChrome>
    </main>
  );
}
