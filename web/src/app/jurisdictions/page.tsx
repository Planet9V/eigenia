"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  Map as MapIcon,
  Shield,
  FileText,
  Clock,
  Key,
  Lock,
  Layers,
  Building2,
  ExternalLink,
  ChevronRight,
  Database,
  Search,
  Scale,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MapControlBar } from "@/components/map/MapControlBar";
import { JurisdictionMapViewer } from "@/components/map/JurisdictionMapViewer";
import { JurisdictionDossierDrawer } from "@/components/map/JurisdictionDossierDrawer";
import { FacilityImpactSimulator } from "@/components/map/FacilityImpactSimulator";
import {
  MapProjectionMode,
  RegulatoryDimension,
  SectorFilter,
  CountryJurisdictionData,
  JurisdictionMatrixDataset
} from "@/types/jurisdictions";

export default function JurisdictionsShowcasePage() {
  const [matrixData, setMatrixData] = useState<JurisdictionMatrixDataset | null>(null);
  const [countriesList, setCountriesList] = useState<CountryJurisdictionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Map state
  const [projectionMode, setProjectionMode] = useState<MapProjectionMode>("globe");
  const [activeDimension, setActiveDimension] = useState<RegulatoryDimension>("incident_clock");
  const [activeSector, setActiveSector] = useState<SectorFilter>("All");
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [selectedCountry, setSelectedCountry] = useState<CountryJurisdictionData | null>(null);
  const [highlightedIso2List, setHighlightedIso2List] = useState<string[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const matrixRes = await import("@/data/jurisdictions-matrix.json");
        const dataset = matrixRes.default as unknown as JurisdictionMatrixDataset;
        setMatrixData(dataset);
        const list = Object.values(dataset.countries).sort((a, b) =>
          a.country_name.localeCompare(b.country_name)
        );
        setCountriesList(list);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed loading jurisdiction matrix dataset:", err);
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSelectCountry = (country: CountryJurisdictionData) => {
    setSelectedCountry(country);
  };

  const handleCloseDrawer = () => {
    setSelectedCountry(null);
  };

  return (
    <main className="min-h-screen bg-[#0B0C0E] text-white relative font-sans selection:bg-dutchOrange selection:text-white transition-colors duration-300">
      <SiteChrome>
        <div className="bg-[#0B0C0E] text-white">
          {/* =========================================================================
              HERO SECTION: Deep Obsidian Background with Statutory Metrics Strip
          ========================================================================= */}
          <section className="relative overflow-hidden border-b border-cardBorder pt-28 pb-12 bg-obsidian text-white">
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-[#070b16] to-obsidian pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-dutchOrange/10 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <Breadcrumb
                items={[
                  { label: "Research", href: "/tracks" },
                  { label: "Assurance Network", href: "/wiki?wg=WG-10-AN" },
                  { label: "Statutory Jurisdictions Matrix" }
                ]}
              />

              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dutchOrange/10 border border-dutchOrange/30 text-dutchOrange text-xs font-mono font-semibold">
                  <Globe className="w-3.5 h-3.5" />
                  <span>SOVEREIGN ASSURANCE NETWORK // WG-10-AN-03</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
                  Global Statutory Jurisdiction Matrix
                </h1>
                <p className="text-secondary text-sm sm:text-base leading-relaxed">
                  Authoritative geospatial visualization of statutory cybersecurity, digital product assurance,
                  data sovereignty, and incident disclosure mandates across all 249 ISO 3166-1 sovereign jurisdictions.
                </p>
              </div>

              {/* Metrics Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-cardSurface/90 border border-cardBorder shadow-lg">
                  <div className="flex items-center justify-between text-muted mb-1 text-xs font-mono">
                    <span>Coverage</span>
                    <Globe className="w-4 h-4 text-dutchOrange" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-primary">249</div>
                  <div className="text-[11px] text-secondary">Sovereign Jurisdictions (100% ISO 3166-1)</div>
                </div>

                <div className="p-4 rounded-xl bg-cardSurface/90 border border-cardBorder shadow-lg">
                  <div className="flex items-center justify-between text-muted mb-1 text-xs font-mono">
                    <span>Statutory Acts</span>
                    <FileText className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-primary">580+</div>
                  <div className="text-[11px] text-secondary">Binding Frameworks & Directives</div>
                </div>

                <div className="p-4 rounded-xl bg-cardSurface/90 border border-cardBorder shadow-lg">
                  <div className="flex items-center justify-between text-muted mb-1 text-xs font-mono">
                    <span>Critical Sectors</span>
                    <Layers className="w-4 h-4 text-violet-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-primary">7</div>
                  <div className="text-[11px] text-secondary">Energy, Water, Health, OT, Telecom, Finance</div>
                </div>

                <div className="p-4 rounded-xl bg-cardSurface/90 border border-cardBorder shadow-lg">
                  <div className="flex items-center justify-between text-muted mb-1 text-xs font-mono">
                    <span>Breach Clocks</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-primary">1h - 96h</div>
                  <div className="text-[11px] text-secondary">Statutory Early Notification SLAs</div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              MAP SHOWCASE VIEWPORT: Controls, Canvas Engine, Simulation
          ========================================================================= */}
          <section className="bg-[#0B0C0E] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Top Control Bar */}
          <MapControlBar
            projectionMode={projectionMode}
            onToggleProjection={setProjectionMode}
            activeDimension={activeDimension}
            onChangeDimension={setActiveDimension}
            activeSector={activeSector}
            onChangeSector={setActiveSector}
            autoRotate={autoRotate}
            onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
            countries={countriesList}
            onSelectCountry={handleSelectCountry}
            selectedIso2={selectedCountry?.iso2}
          />

          {/* Canvas Map Viewer Container */}
          <div className="relative">
            <JurisdictionMapViewer
              projectionMode={projectionMode}
              activeDimension={activeDimension}
              activeSector={activeSector}
              autoRotate={autoRotate}
              onSelectCountry={handleSelectCountry}
              selectedIso2={selectedCountry?.iso2}
              highlightedIso2List={highlightedIso2List}
            />
          </div>

          {/* Industrial Facility Impact Simulator */}
          <div className="pt-4">
            <FacilityImpactSimulator
              countries={countriesList}
              onHighlightJurisdictions={setHighlightedIso2List}
              onSelectCountry={handleSelectCountry}
            />
          </div>

          {/* Regulatory Regime Comparison Table */}
          <div className="p-6 rounded-2xl bg-cardSurface/90 border border-cardBorder shadow-md space-y-4 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-cardBorder">
              <div>
                <h2 className="text-lg font-bold font-sans text-primary">
                  Anchor Regulatory Frameworks Across Primary Economic Blocs
                </h2>
                <p className="text-xs text-secondary font-mono">
                  Cross-jurisdictional synthesis of statutory baselines, mandatory certification modules, and supervisory agencies.
                </p>
              </div>
              <span className="text-[11px] font-mono text-muted bg-subtle px-2.5 py-1 rounded-md self-start sm:self-auto">
                PostgreSQL assurance_network
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-left border-collapse">
                <thead>
                  <tr className="border-b border-cardBorder bg-subtle/30 text-muted">
                    <th className="py-2.5 px-3 font-semibold">Jurisdiction</th>
                    <th className="py-2.5 px-3 font-semibold">Primary Cyber Statute</th>
                    <th className="py-2.5 px-3 font-semibold">Incident SLA</th>
                    <th className="py-2.5 px-3 font-semibold">Default Passwords</th>
                    <th className="py-2.5 px-3 font-semibold">BOM Requirement</th>
                    <th className="py-2.5 px-3 font-semibold">Data Sovereignty</th>
                    <th className="py-2.5 px-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cardBorder">
                  {/* EU / Germany */}
                  <tr className="hover:bg-subtle/30 transition-colors">
                    <td className="py-3 px-3 font-bold text-primary flex items-center gap-2">
                      <span>🇩🇪</span> Germany / EU
                    </td>
                    <td className="py-3 px-3 text-secondary">
                      BSI IT-SiG 2.0 / EU CRA 2024/2847 / NIS2
                    </td>
                    <td className="py-3 px-3 font-bold text-amber-500">24h / 72h</td>
                    <td className="py-3 px-3 text-emerald-400 font-semibold">Statutory Ban</td>
                    <td className="py-3 px-3 text-violet-400 font-semibold">Mandatory SBOM + CBOM</td>
                    <td className="py-3 px-3 text-sky-400">GDPR Adequacy / SCCs</td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => {
                          const de = countriesList.find((c) => c.iso2 === "DE");
                          if (de) handleSelectCountry(de);
                        }}
                        className="text-dutchOrange hover:underline flex items-center gap-1 text-[11px]"
                      >
                        Inspect <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>

                  {/* United States */}
                  <tr className="hover:bg-subtle/30 transition-colors">
                    <td className="py-3 px-3 font-bold text-primary flex items-center gap-2">
                      <span>🇺🇸</span> United States
                    </td>
                    <td className="py-3 px-3 text-secondary">
                      CIRCIA / NERC CIP / EO 14028 / FDA 524B
                    </td>
                    <td className="py-3 px-3 font-bold text-amber-500">24h / 72h</td>
                    <td className="py-3 px-3 text-emerald-400 font-semibold">Statutory Ban (NIST)</td>
                    <td className="py-3 px-3 text-violet-400 font-semibold">Mandatory Federal SBOM</td>
                    <td className="py-3 px-3 text-secondary">Sectoral / State Privacy</td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => {
                          const us = countriesList.find((c) => c.iso2 === "US");
                          if (us) handleSelectCountry(us);
                        }}
                        className="text-dutchOrange hover:underline flex items-center gap-1 text-[11px]"
                      >
                        Inspect <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>

                  {/* Netherlands */}
                  <tr className="hover:bg-subtle/30 transition-colors">
                    <td className="py-3 px-3 font-bold text-primary flex items-center gap-2">
                      <span>🇳🇱</span> Netherlands
                    </td>
                    <td className="py-3 px-3 text-secondary">
                      Cyberbeveiligingswet (NIS2) / CRA
                    </td>
                    <td className="py-3 px-3 font-bold text-amber-500">24h / 72h</td>
                    <td className="py-3 px-3 text-emerald-400 font-semibold">Statutory Ban</td>
                    <td className="py-3 px-3 text-violet-400 font-semibold">Mandatory SBOM + CBOM</td>
                    <td className="py-3 px-3 text-sky-400">EU Data Sovereignty</td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => {
                          const nl = countriesList.find((c) => c.iso2 === "NL");
                          if (nl) handleSelectCountry(nl);
                        }}
                        className="text-dutchOrange hover:underline flex items-center gap-1 text-[11px]"
                      >
                        Inspect <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>

                  {/* Singapore */}
                  <tr className="hover:bg-subtle/30 transition-colors">
                    <td className="py-3 px-3 font-bold text-primary flex items-center gap-2">
                      <span>🇸🇬</span> Singapore
                    </td>
                    <td className="py-3 px-3 text-secondary">
                      Cybersecurity Act 2024 / PDPA
                    </td>
                    <td className="py-3 px-3 font-bold text-red-400">2h / 24h</td>
                    <td className="py-3 px-3 text-emerald-400 font-semibold">Statutory Ban (CLS)</td>
                    <td className="py-3 px-3 text-secondary">Cyber Labelling Scheme</td>
                    <td className="py-3 px-3 text-amber-400 font-semibold">Sectoral CII Controls</td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => {
                          const sg = countriesList.find((c) => c.iso2 === "SG");
                          if (sg) handleSelectCountry(sg);
                        }}
                        className="text-dutchOrange hover:underline flex items-center gap-1 text-[11px]"
                      >
                        Inspect <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>

                  {/* United Kingdom */}
                  <tr className="hover:bg-subtle/30 transition-colors">
                    <td className="py-3 px-3 font-bold text-primary flex items-center gap-2">
                      <span>🇬🇧</span> United Kingdom
                    </td>
                    <td className="py-3 px-3 text-secondary">
                      PSTI Act 2022 / NIS Regulations 2018
                    </td>
                    <td className="py-3 px-3 font-bold text-sky-400">72 Hours</td>
                    <td className="py-3 px-3 text-emerald-400 font-semibold">Statutory Ban (PSTI)</td>
                    <td className="py-3 px-3 text-secondary">Recommended Standards</td>
                    <td className="py-3 px-3 text-sky-400">UK GDPR Adequacy</td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => {
                          const gb = countriesList.find((c) => c.iso2 === "GB");
                          if (gb) handleSelectCountry(gb);
                        }}
                        className="text-dutchOrange hover:underline flex items-center gap-1 text-[11px]"
                      >
                        Inspect <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>

                  {/* Japan */}
                  <tr className="hover:bg-subtle/30 transition-colors">
                    <td className="py-3 px-3 font-bold text-primary flex items-center gap-2">
                      <span>🇯🇵</span> Japan
                    </td>
                    <td className="py-3 px-3 text-secondary">
                      Economic Security Promotion Act / Basic Act
                    </td>
                    <td className="py-3 px-3 font-bold text-sky-400">72 Hours</td>
                    <td className="py-3 px-3 text-emerald-400 font-semibold">Statutory Ban (NISC)</td>
                    <td className="py-3 px-3 text-secondary">METI Guidelines</td>
                    <td className="py-3 px-3 text-sky-400">APPI Mutual Adequacy</td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => {
                          const jp = countriesList.find((c) => c.iso2 === "JP");
                          if (jp) handleSelectCountry(jp);
                        }}
                        className="text-dutchOrange hover:underline flex items-center gap-1 text-[11px]"
                      >
                        Inspect <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Research Treatise Reference Card */}
          <div className="p-6 rounded-2xl bg-cardSurface/90 border border-cardBorder text-white space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-dutchOrange text-xs font-mono font-semibold">
                  <Database className="w-3.5 h-3.5" />
                  <span>AUTHORITATIVE RESEARCH CORPUS</span>
                </div>
                <h3 className="text-base font-bold font-sans text-primary">
                  Working Group 10 // Treatise AN-03: Sovereign Jurisdiction Registry
                </h3>
                <p className="text-xs text-secondary max-w-2xl font-mono leading-relaxed">
                  The complete normative specification, statutory citations, and database schema mappings are codified in
                  treatise WG-10-AN-03. Covers all 249 ISO jurisdictions with deterministic regulatory scoring.
                </p>
              </div>

              <Link
                href="/wiki?wg=WG-10-AN"
                className="px-4 py-2.5 rounded-xl bg-dutchOrange hover:bg-dutchOrange/90 text-white font-sans text-xs font-bold transition-all flex items-center gap-2 shrink-0 self-start md:self-auto shadow-md"
              >
                <span>Read Full Treatise</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>

    {/* =========================================================================
        SLIDE-OVER REGULATORY DOSSIER DRAWER
    ========================================================================= */}
    <JurisdictionDossierDrawer
      country={selectedCountry}
      activeSector={activeSector}
      onClose={handleCloseDrawer}
    />
  </SiteChrome>
</main>
);
}
