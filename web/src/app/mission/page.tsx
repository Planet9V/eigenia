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

export default function MissionPage() {
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [cookiesForceOpen, setCookiesForceOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0b0c0e] text-white relative font-sans selection:bg-dutchOrange selection:text-white">
      <Navbar
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenCookies={() => setCookiesForceOpen(true)}
      />

      {/* Main Header Container (Obsidian Band #0b0c0e) */}
      <section className="bg-[#0b0c0e] pt-28 pb-12 border-b border-zinc-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Breadcrumb Navigation */}
          <Breadcrumb
            items={[
              { label: "Mission", href: "/mission" },
              { label: "Sovereign Infrastructure Protection Constitution" },
            ]}
          />

          {/* Reconciled Single Page Header */}
          <div className="max-w-4xl space-y-4">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
              Dutch B.V. Applied Complexity Think Tank // Sovereign Infrastructure Constitution
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-white">
              Sovereign Infrastructure Mission
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-3xl">
              Replacing fragile compliance checklists with reproducible mathematical physics, open standards, and catastrophe-calibrated risk models to insulate vital societal assets.
            </p>
          </div>

        </div>
      </section>

      {/* Mission Constitution Component (Charcoal Band #121417) */}
      <Mission />

      {/* Operating Principles Component (Charcoal Band #121417) */}
      <Principles />

      {/* Knowledge Transfer Pipeline Section (Elevated Slate Band #16181d) */}
      <KnowledgeTransfer />

      {/* Standard EU Compliance Footer */}
      <EuComplianceFooter
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenCookies={() => setCookiesForceOpen(true)}
      />

      <ImpressumModal isOpen={impressumOpen} onClose={() => setImpressumOpen(false)} />
      <CookieConsentBanner forceOpen={cookiesForceOpen} onCloseForceOpen={() => setCookiesForceOpen(false)} />
    </main>
  );
}
