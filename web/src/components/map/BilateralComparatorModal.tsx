"use client";

import React, { useState, useMemo } from "react";
import {
  X,
  ArrowLeftRight,
  Scale,
  Clock,
  Key,
  Shield,
  Lock,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Building2,
  FileText
} from "lucide-react";
import { CountryJurisdictionData } from "@/types/jurisdictions";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  countries: CountryJurisdictionData[];
  initialCountryA?: CountryJurisdictionData | null;
  initialCountryB?: CountryJurisdictionData | null;
}

interface BilateralPreset {
  name: string;
  isoA: string;
  isoB: string;
  label: string;
}

const PRESETS: BilateralPreset[] = [
  {
    name: "EU vs US Critical Infrastructure",
    isoA: "DE",
    isoB: "US",
    label: "Germany (EU CRA/NIS2) vs United States (CIRCIA/NERC CIP)"
  },
  {
    name: "North Sea vs Southeast Asia",
    isoA: "NL",
    isoB: "SG",
    label: "Netherlands (NIS2/CRA) vs Singapore (Cybersecurity Act 2024)"
  },
  {
    name: "Trans-Pacific Sovereign Alliance",
    isoA: "GB",
    isoB: "JP",
    label: "United Kingdom (PSTI) vs Japan (Economic Security Act)"
  }
];

export function BilateralComparatorModal({
  isOpen,
  onClose,
  countries,
  initialCountryA,
  initialCountryB
}: Props) {
  // Map countries by ISO2 for rapid lookup
  const countriesMap = useMemo(() => {
    const map = new Map<string, CountryJurisdictionData>();
    countries.forEach((c) => map.set(c.iso2, c));
    return map;
  }, [countries]);

  const [isoA, setIsoA] = useState<string>(
    initialCountryA?.iso2 || "DE"
  );
  const [isoB, setIsoB] = useState<string>(
    initialCountryB?.iso2 || "US"
  );

  if (!isOpen) return null;

  const countryA = countriesMap.get(isoA) || countries[0];
  const countryB = countriesMap.get(isoB) || countries[1];

  const handleSwap = () => {
    setIsoA(isoB);
    setIsoB(isoA);
  };

  const handleSelectPreset = (preset: BilateralPreset) => {
    setIsoA(preset.isoA);
    setIsoB(preset.isoB);
  };

  // Compute Incident Clock Delta
  const clockA = countryA?.incident_disclosure_hours ?? 72;
  const clockB = countryB?.incident_disclosure_hours ?? 72;
  const clockDelta = clockA - clockB;
  let clockDeltaText = "Identical disclosure window";
  let clockDivergence: "Aligned" | "Moderate" | "Critical" = "Aligned";

  if (clockDelta !== 0) {
    const absDiff = Math.abs(clockDelta);
    clockDeltaText = `${absDiff} hour differential (${clockA < clockB ? countryA.iso2 : countryB.iso2} faster)`;
    clockDivergence = absDiff >= 48 ? "Critical" : "Moderate";
  }

  // Sectors list for cross-applicability
  const sectors = [
    "Energy",
    "Water",
    "Healthcare",
    "OT/Industrial",
    "Telecom",
    "Financial Services",
    "Transport"
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparator-title"
      className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-cardSurface border border-cardBorder rounded-2xl shadow-2xl overflow-hidden font-sans text-white">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cardBorder bg-subtle/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-dutchOrange/10 border border-dutchOrange/30 flex items-center justify-center text-dutchOrange">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h2 id="comparator-title" className="text-base font-bold text-primary font-mono">
                Bilateral Regulatory Delta Comparator
              </h2>
              <p className="text-xs text-muted">
                Side-by-side statutory diffing across 7 statutory dimensions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-subtle transition-colors"
            aria-label="Close comparator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets Strip */}
        <div className="flex flex-wrap items-center gap-2 px-6 py-2.5 bg-obsidian border-b border-hairline text-xs font-mono">
          <span className="text-muted">Bilateral Presets:</span>
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(preset)}
              className={`px-2.5 py-1 rounded-md border text-[11px] transition-colors ${
                isoA === preset.isoA && isoB === preset.isoB
                  ? "bg-dutchOrange/20 border-dutchOrange text-dutchOrange font-semibold"
                  : "bg-subtle border-cardBorder text-secondary hover:text-primary hover:border-hairline"
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Country Selectors Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center px-6 py-4 border-b border-cardBorder bg-subtle/30 font-mono">
          {/* Country A Selector */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="text-xs text-muted block">Jurisdiction A (Primary Benchmark)</label>
            <select
              value={isoA}
              onChange={(e) => setIsoA(e.target.value)}
              className="w-full bg-obsidian border border-cardBorder rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:border-dutchOrange"
            >
              {countries.map((c) => (
                <option key={c.iso2} value={c.iso2}>
                  {c.country_name} ({c.iso2})
                </option>
              ))}
            </select>
            {countryA && (
              <div className="text-[11px] text-muted flex items-center gap-2 pt-0.5">
                <span>Statute:</span>
                <span className="text-secondary truncate">{countryA.primary_cyber_statute || "General Cyber Law"}</span>
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center pt-2 md:pt-4">
            <button
              onClick={handleSwap}
              title="Swap Benchmarks"
              className="p-2 rounded-full bg-cardSurface border border-cardBorder text-secondary hover:text-dutchOrange hover:border-dutchOrange/40 transition-colors shadow-md"
              aria-label="Swap jurisdictions"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          {/* Country B Selector */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="text-xs text-muted block">Jurisdiction B (Counterparty Mandate)</label>
            <select
              value={isoB}
              onChange={(e) => setIsoB(e.target.value)}
              className="w-full bg-obsidian border border-cardBorder rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:border-dutchOrange"
            >
              {countries.map((c) => (
                <option key={c.iso2} value={c.iso2}>
                  {c.country_name} ({c.iso2})
                </option>
              ))}
            </select>
            {countryB && (
              <div className="text-[11px] text-muted flex items-center gap-2 pt-0.5">
                <span>Statute:</span>
                <span className="text-secondary truncate">{countryB.primary_cyber_statute || "General Cyber Law"}</span>
              </div>
            )}
          </div>
        </div>

        {/* Comparative Delta Matrix Table (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 font-mono text-xs">
          {/* Incident Clock Dimension */}
          <div className="p-4 rounded-xl bg-obsidian border border-cardBorder space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-primary">
                <Clock className="w-4 h-4 text-dutchOrange" />
                <span>Incident Notification Clock</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  clockDivergence === "Critical"
                    ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    : clockDivergence === "Moderate"
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                }`}
              >
                {clockDeltaText}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="p-2.5 rounded-lg bg-subtle border border-hairline">
                <span className="text-[10px] text-muted block mb-0.5">{countryA.country_name}:</span>
                <span className="text-base font-bold text-primary">{clockA} Hours</span>
                <span className="text-[10px] text-secondary block mt-1">
                  Supervisory Authority: {countryA.supervisory_dpa || "National CSIRT"}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-subtle border border-hairline">
                <span className="text-[10px] text-muted block mb-0.5">{countryB.country_name}:</span>
                <span className="text-base font-bold text-primary">{clockB} Hours</span>
                <span className="text-[10px] text-secondary block mt-1">
                  Supervisory Authority: {countryB.supervisory_dpa || "National CSIRT"}
                </span>
              </div>
            </div>
          </div>

          {/* Software & Cryptographic BOM Mandates */}
          <div className="p-4 rounded-xl bg-obsidian border border-cardBorder space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-primary">
                <Shield className="w-4 h-4 text-violet-400" />
                <span>Software & Cryptographic BOMs (SBOM / CBOM)</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  countryA.sbom_required === countryB.sbom_required
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                }`}
              >
                {countryA.sbom_required === countryB.sbom_required ? "Bilateral Parity" : "Statutory Gap"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="p-2.5 rounded-lg bg-subtle border border-hairline">
                <span className="text-[10px] text-muted block mb-0.5">{countryA.country_name}:</span>
                <span
                  className={`text-sm font-bold ${
                    countryA.sbom_required ? "text-violet-400" : "text-muted"
                  }`}
                >
                  {countryA.sbom_required ? "Mandatory Machine-Readable SBOM" : "Voluntary / Recommended"}
                </span>
                <span className="text-[10px] text-secondary block mt-1">
                  CBOM Primitive Tracking: {countryA.cbom_required ? "Required" : "Discretionary"}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-subtle border border-hairline">
                <span className="text-[10px] text-muted block mb-0.5">{countryB.country_name}:</span>
                <span
                  className={`text-sm font-bold ${
                    countryB.sbom_required ? "text-violet-400" : "text-muted"
                  }`}
                >
                  {countryB.sbom_required ? "Mandatory Machine-Readable SBOM" : "Voluntary / Recommended"}
                </span>
                <span className="text-[10px] text-secondary block mt-1">
                  CBOM Primitive Tracking: {countryB.cbom_required ? "Required" : "Discretionary"}
                </span>
              </div>
            </div>
          </div>

          {/* Default Password Ban */}
          <div className="p-4 rounded-xl bg-obsidian border border-cardBorder space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-primary">
                <Key className="w-4 h-4 text-emerald-400" />
                <span>Factory Default Password Prohibition</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  countryA.default_password_ban === countryB.default_password_ban
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                }`}
              >
                {countryA.default_password_ban === countryB.default_password_ban ? "Aligned" : "Asymmetrical"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="p-2.5 rounded-lg bg-subtle border border-hairline">
                <span className="text-[10px] text-muted block mb-0.5">{countryA.country_name}:</span>
                <span
                  className={`text-sm font-bold ${
                    countryA.default_password_ban ? "text-emerald-400" : "text-amber-400"
                  }`}
                >
                  {countryA.default_password_ban ? "Statutorily Banned" : "Discretionary Guideline"}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-subtle border border-hairline">
                <span className="text-[10px] text-muted block mb-0.5">{countryB.country_name}:</span>
                <span
                  className={`text-sm font-bold ${
                    countryB.default_password_ban ? "text-emerald-400" : "text-amber-400"
                  }`}
                >
                  {countryB.default_password_ban ? "Statutorily Banned" : "Discretionary Guideline"}
                </span>
              </div>
            </div>
          </div>

          {/* Data Localization Scope */}
          <div className="p-4 rounded-xl bg-obsidian border border-cardBorder space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-primary">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Data Sovereignty & Localization Scope</span>
              </div>
              <span className="text-[11px] text-muted">
                Cross-border transfer safeguards
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="p-2.5 rounded-lg bg-subtle border border-hairline">
                <span className="text-[10px] text-muted block mb-0.5">{countryA.country_name}:</span>
                <span className="text-sm font-bold text-primary">
                  {countryA.data_localization_required ? "Local Residency Required" : "Adequacy Model"}
                </span>
                <span className="text-[10px] text-secondary block mt-1">
                  Scope: {countryA.localization_scope || "Standard Adequacy"}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-subtle border border-hairline">
                <span className="text-[10px] text-muted block mb-0.5">{countryB.country_name}:</span>
                <span className="text-sm font-bold text-primary">
                  {countryB.data_localization_required ? "Local Residency Required" : "Adequacy Model"}
                </span>
                <span className="text-[10px] text-secondary block mt-1">
                  Scope: {countryB.localization_scope || "Standard Adequacy"}
                </span>
              </div>
            </div>
          </div>

          {/* Penalties & Executive Liability */}
          <div className="p-4 rounded-xl bg-obsidian border border-cardBorder space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-primary">
                <Scale className="w-4 h-4 text-rose-400" />
                <span>Administrative Fines & Director Criminal Liability</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="p-2.5 rounded-lg bg-subtle border border-hairline">
                <span className="text-[10px] text-muted block mb-0.5">{countryA.country_name}:</span>
                <div className="text-sm font-bold text-rose-400">
                  {countryA.max_turnover_percentage > 0
                    ? `Up to ${countryA.max_turnover_percentage}% Global Turnover`
                    : countryA.max_administrative_fine_fixed > 0
                    ? `Up to ${countryA.fine_currency} ${countryA.max_administrative_fine_fixed.toLocaleString()}`
                    : "Statutory Cap Discretionary"}
                </div>
                <div className="text-[10px] text-secondary mt-1 flex items-center gap-1.5">
                  <span className="text-muted">Executive Liability:</span>
                  <span className={countryA.criminal_liability_directors ? "text-rose-400 font-bold" : "text-muted"}>
                    {countryA.criminal_liability_directors ? "Personal Criminal Liability" : "Corporate Only"}
                  </span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-subtle border border-hairline">
                <span className="text-[10px] text-muted block mb-0.5">{countryB.country_name}:</span>
                <div className="text-sm font-bold text-rose-400">
                  {countryB.max_turnover_percentage > 0
                    ? `Up to ${countryB.max_turnover_percentage}% Global Turnover`
                    : countryB.max_administrative_fine_fixed > 0
                    ? `Up to ${countryB.fine_currency} ${countryB.max_administrative_fine_fixed.toLocaleString()}`
                    : "Statutory Cap Discretionary"}
                </div>
                <div className="text-[10px] text-secondary mt-1 flex items-center gap-1.5">
                  <span className="text-muted">Executive Liability:</span>
                  <span className={countryB.criminal_liability_directors ? "text-rose-400 font-bold" : "text-muted"}>
                    {countryB.criminal_liability_directors ? "Personal Criminal Liability" : "Corporate Only"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sector Applicability Comparison */}
          <div className="p-4 rounded-xl bg-obsidian border border-cardBorder space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-primary">
                <Building2 className="w-4 h-4 text-sky-400" />
                <span>Sector Obligation Scope Comparison</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="space-y-1">
                <span className="text-[10px] text-muted block">{countryA.country_name} In-Scope Sectors:</span>
                <div className="flex flex-wrap gap-1">
                  {sectors.map((sec) => {
                    const inScope = Boolean(countryA.sector_applicability[sec]);
                    return (
                      <span
                        key={sec}
                        className={`px-2 py-0.5 rounded text-[10px] ${
                          inScope
                            ? "bg-sky-500/10 text-sky-400 border border-sky-500/30"
                            : "bg-subtle text-muted line-through"
                        }`}
                      >
                        {sec}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-muted block">{countryB.country_name} In-Scope Sectors:</span>
                <div className="flex flex-wrap gap-1">
                  {sectors.map((sec) => {
                    const inScope = Boolean(countryB.sector_applicability[sec]);
                    return (
                      <span
                        key={sec}
                        className={`px-2 py-0.5 rounded text-[10px] ${
                          inScope
                            ? "bg-sky-500/10 text-sky-400 border border-sky-500/30"
                            : "bg-subtle text-muted line-through"
                        }`}
                      >
                        {sec}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3 border-t border-cardBorder bg-subtle/50 flex items-center justify-between font-mono text-xs">
          <span className="text-muted text-[11px]">
            WG-10-AN Sovereign Assurance Benchmark Engine
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-dutchOrange hover:bg-dutchOrangeLight text-white font-semibold transition-colors"
          >
            Dismiss Comparator
          </button>
        </div>
      </div>
    </div>
  );
}
