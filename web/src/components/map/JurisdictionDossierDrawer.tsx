"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Shield,
  FileText,
  Clock,
  Key,
  Lock,
  AlertTriangle,
  Layers,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Building2,
  Scale
} from "lucide-react";
import { CountryJurisdictionData, SectorFilter } from "@/types/jurisdictions";

interface Props {
  country: CountryJurisdictionData | null;
  activeSector: SectorFilter;
  onClose: () => void;
}

type DrawerTab = "overview" | "statutes" | "sectors" | "cyber" | "privacy" | "crypto" | "incidents" | "penalties";

export function JurisdictionDossierDrawer({ country, activeSector, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<DrawerTab>("overview");

  if (!country) return null;

  const tabs: { id: DrawerTab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <Building2 className="w-4 h-4" /> },
    { id: "statutes", label: "Statutes", icon: <FileText className="w-4 h-4" /> },
    { id: "sectors", label: "Sectors", icon: <Layers className="w-4 h-4" /> },
    { id: "cyber", label: "Cyber & SBOM", icon: <Shield className="w-4 h-4" /> },
    { id: "privacy", label: "Privacy", icon: <Lock className="w-4 h-4" /> },
    { id: "crypto", label: "Cryptography", icon: <Key className="w-4 h-4" /> },
    { id: "incidents", label: "Incidents", icon: <Clock className="w-4 h-4" /> },
    { id: "penalties", label: "Penalties", icon: <Scale className="w-4 h-4" /> },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-y-0 right-0 z-50 flex max-w-full pl-10 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 280 }}
          className="relative w-screen max-w-2xl bg-[#090d16]/95 border-l border-cyan-500/20 shadow-2xl backdrop-blur-xl flex flex-col text-slate-100 z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-start justify-between bg-white/[0.02]">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-mono px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold">
                  {country.iso2}
                </span>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                    {country.country_name}
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      ISO 3166-1 {country.iso3} ({country.numeric_code})
                    </span>
                  </h2>
                  <p className="text-sm text-slate-400">
                    {country.continent} &bull; {country.region} &bull; {country.sovereign_status}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/10"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-4 gap-2 p-4 bg-black/40 border-b border-white/5 text-center text-xs">
            <div className="p-2 rounded bg-white/[0.02] border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Incident Clock</span>
              <span className={`font-bold font-mono text-sm ${country.incident_disclosure_hours <= 6 ? "text-rose-400" : country.incident_disclosure_hours <= 24 ? "text-amber-400" : "text-cyan-400"}`}>
                {country.incident_disclosure_hours}h
              </span>
            </div>
            <div className="p-2 rounded bg-white/[0.02] border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Default Password</span>
              <span className={`font-bold text-xs ${country.default_password_ban ? "text-emerald-400" : "text-slate-400"}`}>
                {country.default_password_ban ? "Banned" : "Discretionary"}
              </span>
            </div>
            <div className="p-2 rounded bg-white/[0.02] border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">SBOM Mandate</span>
              <span className={`font-bold text-xs ${country.sbom_required ? "text-violet-400" : "text-slate-400"}`}>
                {country.sbom_required ? "Required" : "Optional"}
              </span>
            </div>
            <div className="p-2 rounded bg-white/[0.02] border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Max Turnover Fine</span>
              <span className="font-bold text-xs text-amber-300 font-mono">
                {country.max_turnover_percentage > 0 ? `${country.max_turnover_percentage}%` : "Fixed Fine"}
              </span>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex border-b border-white/10 px-4 bg-white/[0.01] overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-3 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "border-cyan-400 text-cyan-400 bg-cyan-400/5"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="rounded-xl p-4 bg-gradient-to-br from-cyan-950/20 to-slate-900/40 border border-cyan-500/20 space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                    Sovereign Jurisdiction Profile
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block">Capital:</span>
                      <span className="font-medium text-slate-200">{country.capital || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Currency:</span>
                      <span className="font-mono text-slate-200">{country.currency || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Primary Cyber Legislation:</span>
                      <span className="font-medium text-cyan-400">{country.primary_cyber_statute}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Primary Privacy Legislation:</span>
                      <span className="font-medium text-slate-200">{country.primary_privacy_statute}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Statutory Posture Summary
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                      <span className="text-slate-300 flex items-center gap-2">
                        {country.default_password_ban ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-500" />
                        )}
                        Factory Default Credentials Ban
                      </span>
                      <span className="text-slate-400 font-mono">
                        {country.default_password_ban ? "Mandatory Unique Credential" : "Discretionary"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                      <span className="text-slate-300 flex items-center gap-2">
                        {country.sbom_required ? (
                          <CheckCircle2 className="w-4 h-4 text-violet-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-500" />
                        )}
                        Software Bill of Materials (SBOM)
                      </span>
                      <span className="text-slate-400 font-mono">
                        {country.sbom_required ? "ECMA-424 CycloneDX Required" : "Recommended"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                      <span className="text-slate-300 flex items-center gap-2">
                        {country.data_localization_required ? (
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-sky-400" />
                        )}
                        Data Localization Requirements
                      </span>
                      <span className="text-slate-400 font-mono">
                        {country.data_localization_required ? "Strict or Sectoral Local Copy" : "Adequacy / Standard Clauses"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                      <span className="text-slate-300 flex items-center gap-2">
                        {country.criminal_liability_directors ? (
                          <AlertTriangle className="w-4 h-4 text-rose-400" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-slate-400" />
                        )}
                        Director Personal Liability
                      </span>
                      <span className="text-slate-400 font-mono">
                        {country.criminal_liability_directors ? "Personal Criminal / Civil Sanctions" : "Corporate Level Only"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Treatise Reference
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    This sovereign profile is harmonized with the Global Statutory Jurisdiction Index published in Working Group 10.
                  </p>
                  <a
                    href="/references/WG-10-AN-03-Jurisdiction-Registry-Index"
                    className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 underline pt-1 font-mono"
                  >
                    View WG-10-AN-03 Treatise Section <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {activeTab === "statutes" && (
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Statutory Frameworks ({country.statutory_frameworks.length} Recorded)
                </h3>
                {country.statutory_frameworks.map((statute, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-cyan-300 font-mono">
                        {statute.short_name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {statute.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium leading-snug">
                      {statute.official_title}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-2 border-t border-white/5 font-mono">
                      <div>
                        <span>Citation: </span>
                        <span className="text-slate-300">{statute.legal_citation || "N/A"}</span>
                      </div>
                      <div>
                        <span>Authority: </span>
                        <span className="text-slate-300">{statute.supervisory_authority}</span>
                      </div>
                      <div>
                        <span>Effective: </span>
                        <span className="text-slate-300">{statute.effective_date || "Enacted"}</span>
                      </div>
                      <div>
                        <span>Deadline: </span>
                        <span className="text-slate-300">{statute.enforcement_deadline || "Ongoing"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "sectors" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Sector Specific Obligations
                  </h3>
                  {activeSector !== "All" && (
                    <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                      Filtered: {activeSector}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  {Object.entries(country.sector_applicability)
                    .filter(([sec]) => activeSector === "All" || sec === activeSector)
                    .map(([sec, data], idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border ${
                          sec === activeSector
                            ? "bg-cyan-950/20 border-cyan-500/40"
                            : "bg-white/[0.02] border-white/10"
                        } space-y-2`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                            {sec}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono border border-slate-700">
                            {data.scope_classification}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {data.specific_obligations}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {activeTab === "cyber" && (
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Cybersecurity & Digital Product Assurance
                </h3>

                {country.cyber_security_mandates.map((mandate, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-400 font-mono">
                        Domain: {mandate.target_domain}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Patch SLA: {mandate.patch_management_sla_days || 30} days
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs space-y-1.5 font-mono">
                      <div>
                        <span className="text-slate-400">Baseline Standard: </span>
                        <span className="text-slate-200">{mandate.baseline_standard_ref}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Certifications: </span>
                        <span className="text-slate-200">{mandate.mandatory_certifications}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {mandate.details}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Data Privacy & Sovereignty Regime
                </h3>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Primary Privacy Statute</span>
                    <span className="text-white font-medium text-sm">{country.primary_privacy_statute}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Supervisory Data Protection Authority (DPA)</span>
                    <span className="text-cyan-300 font-mono">{country.supervisory_dpa}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Localization Mandate:</span>
                      <span className={`font-mono font-bold ${country.data_localization_required ? "text-amber-400" : "text-slate-300"}`}>
                        {country.data_localization_required ? "Active Requirement" : "No Omnibus Mandate"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Localization Scope:</span>
                      <span className="text-slate-300 font-mono text-[11px]">{country.localization_scope}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Cross-Border Mechanism:</span>
                      <span className="text-slate-300 font-mono text-[11px]">{country.cross_border_transfer_mechanism}</span>
                    </div>
                  </div>

                  {country.sensitive_data_categories.length > 0 && (
                    <div>
                      <span className="text-slate-400 block text-[11px] mb-1.5">Protected Sensitive Data Categories</span>
                      <div className="flex flex-wrap gap-1.5">
                        {country.sensitive_data_categories.map((cat, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "crypto" && (
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Cryptography Controls & National Ciphers
                </h3>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Export Control Regime</span>
                    <span className="text-cyan-300 font-mono">{country.crypto_export_controls}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-2 font-mono">
                    <div>
                      <span className="text-slate-400">Approved Ciphers: </span>
                      <span className="text-slate-200">{country.approved_encryption_standards}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Post-Quantum Roadmap: </span>
                      <span className="text-emerald-400">{country.post_quantum_mandate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Regulating Agency: </span>
                      <span className="text-slate-300">{country.regulatory_agency_crypto}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "incidents" && (
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Incident & Vulnerability Disclosure Clocks
                </h3>

                <div className="space-y-3">
                  {country.incident_disclosure_rules.map((rule, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">
                          {rule.breach_type}
                        </span>
                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                          rule.notification_timeline_hours <= 6 ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" :
                          rule.notification_timeline_hours <= 24 ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" :
                          "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        }`}>
                          {rule.notification_timeline_hours} Hours
                        </span>
                      </div>

                      <p className="text-xs text-slate-300">
                        {rule.threshold_trigger_definition}
                      </p>

                      <div className="p-2.5 rounded bg-black/40 border border-white/5 text-[11px] font-mono text-slate-400 space-y-1">
                        <div>
                          <span>Recipients: </span>
                          <span className="text-slate-300">{rule.recipient_authorities.join(", ")}</span>
                        </div>
                        {rule.ransomware_payment_reporting && (
                          <div className="text-rose-400 font-bold">
                            &bull; Mandatory Ransomware Payment Disclosure Required
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "penalties" && (
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Penalty Structures & Enforcement Powers
                </h3>

                <div className="space-y-3">
                  {country.penalty_structures.map((p, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div className="p-3 rounded bg-black/40 border border-white/5">
                          <span className="text-slate-400 block text-[10px]">Maximum Fixed Fine</span>
                          <span className="text-base font-bold text-amber-400">
                            {p.max_administrative_fine_fixed > 0
                              ? `${p.max_administrative_fine_fixed.toLocaleString()} ${p.fine_currency}`
                              : "Discretionary / No Ceiling"}
                          </span>
                        </div>
                        <div className="p-3 rounded bg-black/40 border border-white/5">
                          <span className="text-slate-400 block text-[10px]">Turnover Percentage</span>
                          <span className="text-base font-bold text-rose-400">
                            {p.max_turnover_percentage > 0 ? `${p.max_turnover_percentage}% Global Turnover` : "Fixed Fine Only"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs pt-1">
                        <div className="flex items-center justify-between text-slate-300">
                          <span>Director Criminal Sanctions:</span>
                          <span className={`font-mono font-bold ${p.criminal_liability_directors ? "text-rose-400" : "text-slate-400"}`}>
                            {p.criminal_liability_directors ? "Enforceable Liability" : "Corporate Only"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span>Border Seizure / Market Withdrawal:</span>
                          <span className={`font-mono font-bold ${p.market_withdrawal_sanctions ? "text-amber-400" : "text-slate-400"}`}>
                            {p.market_withdrawal_sanctions ? "Authorized Powers" : "None"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
