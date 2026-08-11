"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { TheoryCatalogue } from "@/components/TheoryCatalogue";
import { EuComplianceFooter } from "@/components/EuComplianceFooter";
import { ImpressumModal } from "@/components/ImpressumModal";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";

export default function TheoryPage() {
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [cookiesForceOpen, setCookiesForceOpen] = useState(false);

  return (
    <main className="min-h-screen bg-charcoal text-slate-100 relative pt-20">
      <Navbar
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenCookies={() => setCookiesForceOpen(true)}
      />

      <TheoryCatalogue />

      <EuComplianceFooter
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenCookies={() => setCookiesForceOpen(true)}
      />

      <ImpressumModal
        isOpen={impressumOpen}
        onClose={() => setImpressumOpen(false)}
      />

      <CookieConsentBanner
        forceOpen={cookiesForceOpen}
        onCloseForceOpen={() => setCookiesForceOpen(false)}
      />
    </main>
  );
}
