"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Mission } from "@/components/Mission";
import { Principles } from "@/components/Principles";
import { KnowledgeTransfer } from "@/components/KnowledgeTransfer";
import { EuComplianceFooter } from "@/components/EuComplianceFooter";
import { ImpressumModal } from "@/components/ImpressumModal";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useLanguage } from "@/context/LanguageContext";

export default function MissionPage() {
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [cookiesForceOpen, setCookiesForceOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-canvas text-primary relative font-sans selection:bg-dutchOrange selection:text-white transition-colors duration-300">
      <Navbar
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenCookies={() => setCookiesForceOpen(true)}
      />

      {/* Main Header Container */}
      <section className="bg-canvas pt-28 pb-12 border-b border-hairline transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
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
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-primary">
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

      <EuComplianceFooter
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenCookies={() => setCookiesForceOpen(true)}
      />

      <ImpressumModal
        isOpen={impressumOpen}
        onClose={() => setImpressumOpen(false)}
      />

      <CookieConsentBanner forceOpen={cookiesForceOpen} />
    </main>
  );
}
