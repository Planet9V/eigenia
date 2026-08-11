"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations } from "@/locales/translations";

interface LanguageContextType {
  lang: Language;
  language: Language;
  setLang: (lang: Language) => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const detectSmartDefaultLanguage = (): Language => {
  if (typeof window === "undefined") return "en";

  // 1. Check explicit user preference in localStorage
  const saved = localStorage.getItem("eigenia_lang") as Language;
  if (saved === "en" || saved === "nl") return saved;

  // 2. Check Browser Preferred Languages (navigator.languages array or navigator.language)
  const navLangs = Array.from(navigator.languages || [navigator.language || ""]);
  const hasDutchInLanguages = navLangs.some(
    (l) => l.toLowerCase().startsWith("nl") || l.toLowerCase().includes("nl-")
  );
  if (hasDutchInLanguages) return "nl";

  // 3. Check European & Dutch Timezones (Amsterdam, Brussels)
  try {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const isDutchOrBelgianTimezone =
      userTimezone.includes("Amsterdam") ||
      userTimezone.includes("Brussels") ||
      userTimezone === "Europe/Amsterdam" ||
      userTimezone === "Europe/Brussels";

    if (isDutchOrBelgianTimezone) return "nl";
  } catch (e) {
    // Fallback if Intl fails
  }

  // 4. Check domain extension (.nl)
  if (window.location.hostname.endsWith(".nl")) {
    return "nl";
  }

  return "en";
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const detected = detectSmartDefaultLanguage();
    setLangState(detected);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("eigenia_lang", newLang);
  };

  const t = (key: string): string => {
    const dict = (translations as any)[lang] || translations.en;
    const enDict = translations.en as Record<string, string>;
    return (dict as Record<string, string>)[key] || enDict[key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ lang, language: lang, setLang, setLanguage: setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
