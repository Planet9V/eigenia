"use client";

import React, { useState, useEffect } from "react";
import { Cookie, X, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CookieConsentBannerProps {
  forceOpen?: boolean;
  onCloseForceOpen?: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  forceOpen = false,
  onCloseForceOpen,
}) => {
  const { t } = useLanguage();
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);
  const [showPreferences, setShowPreferences] = useState(false);

  // Cookie Categories State
  const [necessary] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem("eigenia_cookie_consent");
    if (storedConsent) {
      setConsentGiven(true);
    } else {
      setConsentGiven(false);
    }
  }, []);

  useEffect(() => {
    if (forceOpen) {
      setShowPreferences(true);
      setConsentGiven(false);
    }
  }, [forceOpen]);

  const handleAcceptAll = () => {
    localStorage.setItem("eigenia_cookie_consent", JSON.stringify({ necessary: true, analytics: true, marketing: true }));
    setConsentGiven(true);
    if (onCloseForceOpen) onCloseForceOpen();
  };

  const handleSavePreferences = () => {
    localStorage.setItem("eigenia_cookie_consent", JSON.stringify({ necessary, analytics, marketing }));
    setConsentGiven(true);
    setShowPreferences(false);
    if (onCloseForceOpen) onCloseForceOpen();
  };

  if (consentGiven && !forceOpen) return null;

  return (
    <>
      {/* Bottom Sticky Consent Banner */}
      {!showPreferences && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-fade-in font-mono">
          <div className="bg-zinc-950 p-6 rounded-2xl shadow-2xl space-y-4 text-zinc-300">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <Cookie className="w-5 h-5 text-dutchOrange flex-shrink-0" />
                <h4 className="font-bold text-xs text-white uppercase">{t("cookie_banner_title" as any)}</h4>
              </div>
              <span className="text-xs font-mono text-dutchOrange font-normal inline-block">
                EU ePrivacy
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans font-light">
              {t("cookie_banner_desc" as any)}
            </p>

            <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-zinc-900/60 font-mono text-xs">
              <button
                onClick={() => setShowPreferences(true)}
                className="py-2 px-3 rounded-xl bg-black text-zinc-300 hover:text-white transition-colors"
              >
                {t("cookie_manage_prefs" as any)}
              </button>

              <button
                onClick={handleAcceptAll}
                className="py-2 px-4 rounded-xl bg-dutchOrange text-white font-bold hover:bg-dutchOrange-600 transition-colors shadow-md flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" /> {t("cookie_accept_all" as any)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal Overlay */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in font-mono">
          <div className="relative w-full max-w-lg bg-zinc-950 rounded-2xl p-6 sm:p-8 shadow-2xl text-zinc-300 space-y-6">
            
            <div className="flex items-center justify-between border-b border-zinc-900/60 pb-4">
              <div className="flex items-center gap-2">
                <Cookie className="w-5 h-5 text-dutchOrange" />
                <h3 className="text-sm font-bold text-white uppercase">Cookie Privacy Preferences</h3>
              </div>
              <button
                onClick={() => {
                  setShowPreferences(false);
                  if (onCloseForceOpen) onCloseForceOpen();
                }}
                className="p-1 rounded bg-black text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="flex items-center justify-between p-3 rounded-xl bg-black">
                <div>
                  <span className="font-bold text-white block">Strictly Necessary Cookies</span>
                  <span className="text-zinc-400 text-[11px]">Required for website operation and security authentication.</span>
                </div>
                <span className="text-dutchOrange font-mono font-bold text-[10px] uppercase">Always Active</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-black">
                <div>
                  <span className="font-bold text-white block">Performance & Analytics</span>
                  <span className="text-zinc-400 text-[11px]">Privacy-friendly telemetry to optimize load speeds and SCADA digital twin responsiveness.</span>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="accent-dutchOrange w-4 h-4"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-black">
                <div>
                  <span className="font-bold text-white block">Marketing & Targeting</span>
                  <span className="text-zinc-400 text-[11px]">Eigenia B.V. does not deploy cross-site tracking or third-party ad retargeting.</span>
                </div>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="accent-dutchOrange w-4 h-4"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-900/60 font-mono text-xs">
              <button
                onClick={handleSavePreferences}
                className="py-2.5 px-5 rounded-xl bg-dutchOrange text-white font-bold hover:bg-dutchOrange-600 transition-colors shadow-md"
              >
                Save Preferences
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
