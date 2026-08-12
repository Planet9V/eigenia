"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { EuComplianceFooter } from "@/components/EuComplianceFooter";
import { ImpressumModal } from "@/components/ImpressumModal";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";

export const SiteChrome: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [cookiesForceOpen, setCookiesForceOpen] = useState(false);

  return (
    <>
      <Navbar />

      {children}

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
    </>
  );
};
