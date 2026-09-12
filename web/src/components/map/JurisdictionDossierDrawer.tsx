"use client";

import React, { useState, useMemo } from "react";
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
  Scale,
  Download,
  Printer,
  CheckSquare,
  Minimize2,
  Maximize2
} from "lucide-react";
import { CountryJurisdictionData, SectorFilter, ComplianceActionItem } from "@/types/jurisdictions";

interface Props {
  country: CountryJurisdictionData | null;
  activeSector: SectorFilter;
  onClose: () => void;
}

type DrawerTab = "overview" | "statutes" | "sectors" | "cyber" | "privacy" | "crypto" | "incidents" | "penalties";

export function JurisdictionDossierDrawer({ country, activeSector, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<DrawerTab>("overview");
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const handleExportJson = () => {
    if (!country) return;
    const blob = new Blob([JSON.stringify(country, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jurisdiction-${country.iso2}-${country.country_name.toLowerCase().replace(/\s+/g, "-")}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const complianceChecklist: ComplianceActionItem[] = useMemo(() => {
    if (!country) return [];
    return [
      {
        id: "act_pwd",
        priority: country.default_password_ban ? "High" : "Standard",
        title: "Factory Default Password Phase-Out",
        statuteRef: country.primary_cyber_statute || "Statutory Cybersecurity Standard",
        timeframe: "Immediate / Pre-Commissioning",
        actionRequired: "Enforce unique cryptographically generated credentials across all Level 1 and Level 2 industrial controllers before connecting to site networks.",
        category: "Access Control"
      },
      {
        id: "act_sbom",
        priority: country.sbom_required ? "High" : "Medium",
        title: "CycloneDX 1.6+ Cryptography BOM (CBOM) Generation",
        statuteRef: `${country.country_name} Sovereign Digital Assurance Standard`,
        timeframe: "T-30 Days before Release",
        actionRequired: "Produce machine-readable ECMA-424 compliant SBOMs cataloguing every software component, microcode version, and post-quantum cryptographic primitive.",
        category: "Software Assurance"
      },
      {
        id: "act_incident",
        priority: "High",
        title: `${country.incident_disclosure_hours}h CSIRT Notification Readiness`,
        statuteRef: country.primary_cyber_statute || "Statutory Cybersecurity Standard",
        timeframe: `${country.incident_disclosure_hours} Hours from Incident Detection`,
        actionRequired: `Calibrate automated triage playbooks to dispatch statutory early warning reports to ${country.supervisory_dpa || "designated CSIRT/supervisory authority"} within the binding ${country.incident_disclosure_hours}-hour deadline.`,
        category: "Incident Response"
      },
      {
        id: "act_localization",
        priority: country.data_localization_required ? "High" : "Standard",
        title: "Data Sovereignty & Boundary Audit",
        statuteRef: country.primary_privacy_statute || "Data Localization Mandate",
        timeframe: "Quarterly Audit",
        actionRequired: country.data_localization_required
          ? "Verify that telemetry caches, operator access logs, and process historian archives remain strictly within sovereign boundaries."
          : "Review cross-border data transfer adequacy contracts and standard contractual clauses (SCCs) for international engineering access.",
        category: "Data Residency"
      }
    ];
  }, [country]);

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
      {/* Minimized Docked Badge View */}
      {isMinimized ? (
        <motion.div
          key="minimized-dock"
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          className="fixed top-24 right-4 sm:right-6 z-[70] pointer-events-auto bg-[#0B0C0E]/95 border border-white/20 hover:border-dutchOrange/60 rounded-2xl p-3 shadow-2xl backdrop-blur-xl flex items-center gap-3 text-white transition-all cursor-pointer group"
          onClick={() => setIsMinimized(false)}
        >
          <div className="w-9 h-9 rounded-xl bg-dutchOrange/15 border border-dutchOrange/40 flex items-center justify-center font-mono font-bold text-sm text-dutchOrange">
            {country.iso2}
          </div>
          <div className="text-left">
            <div className="font-bold text-xs flex items-center gap-2">
              <span>{country.country_name}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white border border-white/20">
                {country.incident_disclosure_hours}h Clock
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 group-hover:text-dutchOrange transition-colors">
              <span>Expand Full Dossier</span>
              <Maximize2 className="w-3 h-3" />
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-1"
            aria-label="Close dossier"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      ) : (
        /* Full Inspector Panel: Modeless & Non-blocking to Map Canvas */
        <div className="fixed inset-y-0 right-0 z-[70] flex max-w-full pointer-events-none">
          {/* Mobile-only subtle touch dismiss backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-xs pointer-events-auto"
            onClick={onClose}
          />

          <motion.div
            key="expanded-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-screen max-w-xl xl:max-w-2xl bg-[#0B0C0E]/95 border-l border-white/10 shadow-2xl z-10 flex flex-col h-full overflow-hidden text-white pointer-events-auto backdrop-blur-xl"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-dutchOrange/10 border border-dutchOrange/30 flex items-center justify-center font-mono font-bold text-lg text-dutchOrange">
                  {country.iso2}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                      {country.country_name}
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                        {country.iso3} ({country.numeric_code})
                      </span>
                    </h2>
                  </div>
                  <p className="text-xs text-slate-400">
                    {country.continent} &bull; {country.region} &bull; {country.sovereign_status}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleExportJson}
                  title="Export Structured JSON Profile"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10 text-xs font-mono cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-white/70" />
                  <span className="hidden sm:inline">Export JSON</span>
                </button>
                <button
                  onClick={handlePrint}
                  title="Print Executive Memorandum"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10 text-xs font-mono cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-dutchOrange" />
                  <span className="hidden sm:inline">Print Brief</span>
                </button>
                <button
                  onClick={() => setIsMinimized(true)}
                  title="Minimize to Floating Dock"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/10 cursor-pointer"
                  aria-label="Minimize drawer"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/10 cursor-pointer"
                  aria-label="Close drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-4 gap-2 p-4 bg-black/40 border-b border-white/5 text-center text-xs">
            <div className="p-2 rounded bg-white/[0.02] border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Incident Clock</span>
              <span className={`font-bold font-mono text-sm ${country.incident_disclosure_hours <= 6 ? "text-dutchOrange" : country.incident_disclosure_hours <= 24 ? "text-dutchOrange" : "text-white"}`}>
                {country.incident_disclosure_hours}h
              </span>
            </div>
            <div className="p-2 rounded bg-white/[0.02] border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Default Password</span>
              <span className={`font-bold text-xs ${country.default_password_ban ? "text-dutchOrange" : "text-slate-400"}`}>
                {country.default_password_ban ? "Banned" : "Discretionary"}
              </span>
            </div>
            <div className="p-2 rounded bg-white/[0.02] border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">SBOM Mandate</span>
              <span className={`font-bold text-xs ${country.sbom_required ? "text-white" : "text-slate-400"}`}>
                {country.sbom_required ? "Required" : "Optional"}
              </span>
            </div>
            <div className="p-2 rounded bg-white/[0.02] border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Max Turnover Fine</span>
              <span className="font-bold text-xs text-white font-mono">
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
                    ? "border-dutchOrange text-white bg-white/[0.04]"
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
                <div className="rounded-xl p-4 bg-cardSurface border border-cardBorder space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-white">
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
                      <span className="font-medium text-white font-mono">{country.primary_cyber_statute}</span>
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
                          <CheckCircle2 className="w-4 h-4 text-dutchOrange" />
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
                          <CheckCircle2 className="w-4 h-4 text-white" />
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
                          <AlertTriangle className="w-4 h-4 text-dutchOrange" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-white/60" />
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
                          <AlertTriangle className="w-4 h-4 text-dutchOrange" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-white/40" />
                        )}
                        Director Personal Liability
                      </span>
                      <span className="text-slate-400 font-mono">
                        {country.criminal_liability_directors ? "Personal Criminal / Civil Sanctions" : "Corporate Level Only"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Operational Compliance Readiness Checklist */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <CheckSquare className="w-3.5 h-3.5 text-dutchOrange" />
                      <span>Operational Compliance Action Plan</span>
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">
                      {complianceChecklist.length} Priority Items
                    </span>
                  </div>

                  <div className="space-y-2">
                    {complianceChecklist.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5 text-xs font-mono"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                item.priority === "High"
                                  ? "bg-dutchOrange/20 text-dutchOrange border border-dutchOrange/40"
                                  : item.priority === "Medium"
                                  ? "bg-white/10 text-white border border-white/20"
                                  : "bg-white/5 text-slate-300 border border-white/10"
                              }`}
                            >
                              {item.priority}
                            </span>
                            <span className="font-bold text-white">{item.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-400">{item.timeframe}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                          {item.actionRequired}
                        </p>
                        <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                          <span>Statute: {item.statuteRef}</span>
                          <span className="text-white/70">{item.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-cardSurface border border-cardBorder space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Treatise Reference
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    This sovereign profile is harmonized with the Global Statutory Jurisdiction Index published in Working Group 10.
                  </p>
                  <a
                    href="/references/WG-10-AN-03-Jurisdiction-Registry-Index"
                    className="inline-flex items-center gap-1 text-xs text-dutchOrange hover:text-dutchOrange/80 underline pt-1 font-mono"
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
                      <span className="text-xs font-bold text-white font-mono">
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
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-dutchOrange/20 text-dutchOrange border border-dutchOrange/40 font-mono font-semibold">
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
                            ? "bg-dutchOrange/5 border-dutchOrange/40"
                            : "bg-white/[0.02] border-white/10"
                        } space-y-2`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                            {sec}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-white font-mono border border-slate-700">
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
                      <span className="text-xs font-bold text-white font-mono">
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
                    <span className="text-white font-mono">{country.supervisory_dpa}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Localization Mandate:</span>
                      <span className={`font-mono font-bold ${country.data_localization_required ? "text-dutchOrange" : "text-slate-300"}`}>
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
                    <span className="text-white font-mono">{country.crypto_export_controls}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-2 font-mono">
                    <div>
                      <span className="text-slate-400">Approved Ciphers: </span>
                      <span className="text-slate-200">{country.approved_encryption_standards}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Post-Quantum Roadmap: </span>
                      <span className="text-dutchOrange">{country.post_quantum_mandate}</span>
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
                          rule.notification_timeline_hours <= 6 ? "bg-dutchOrange/20 text-dutchOrange border border-dutchOrange/40" :
                          rule.notification_timeline_hours <= 24 ? "bg-white/10 text-white border border-white/20" :
                          "bg-white/5 text-slate-300 border border-white/10"
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
                          <div className="text-dutchOrange font-bold">
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
                          <span className="text-base font-bold text-white">
                            {p.max_administrative_fine_fixed > 0
                              ? `${p.max_administrative_fine_fixed.toLocaleString()} ${p.fine_currency}`
                              : "Discretionary / No Ceiling"}
                          </span>
                        </div>
                        <div className="p-3 rounded bg-black/40 border border-white/5">
                          <span className="text-slate-400 block text-[10px]">Turnover Percentage</span>
                          <span className="text-base font-bold text-dutchOrange">
                            {p.max_turnover_percentage > 0 ? `${p.max_turnover_percentage}% Global Turnover` : "Fixed Fine Only"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs pt-1">
                        <div className="flex items-center justify-between text-slate-300">
                          <span>Director Criminal Sanctions:</span>
                          <span className={`font-mono font-bold ${p.criminal_liability_directors ? "text-dutchOrange" : "text-slate-400"}`}>
                            {p.criminal_liability_directors ? "Enforceable Liability" : "Corporate Only"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span>Border Seizure / Market Withdrawal:</span>
                          <span className={`font-mono font-bold ${p.market_withdrawal_sanctions ? "text-white" : "text-slate-400"}`}>
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
      )}
    </AnimatePresence>
  );
}
