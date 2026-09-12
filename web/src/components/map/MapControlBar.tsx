"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Globe,
  Map as MapIcon,
  Play,
  Pause,
  Search,
  Filter,
  Layers,
  Clock,
  Key,
  Shield,
  Lock,
  Scale,
  Sparkles,
  Workflow
} from "lucide-react";
import {
  MapProjectionMode,
  RegulatoryDimension,
  SectorFilter,
  CountryJurisdictionData
} from "@/types/jurisdictions";

interface Props {
  projectionMode: MapProjectionMode;
  onToggleProjection: (mode: MapProjectionMode) => void;
  activeDimension: RegulatoryDimension;
  onChangeDimension: (dim: RegulatoryDimension) => void;
  activeSector: SectorFilter;
  onChangeSector: (sec: SectorFilter) => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  countries: CountryJurisdictionData[];
  onSelectCountry: (country: CountryJurisdictionData) => void;
  selectedIso2?: string | null;
  onOpenComparator?: () => void;
  onStartTour?: () => void;
  showCorridors?: boolean;
  onToggleCorridors?: () => void;
}

export function MapControlBar({
  projectionMode,
  onToggleProjection,
  activeDimension,
  onChangeDimension,
  activeSector,
  onChangeSector,
  autoRotate,
  onToggleAutoRotate,
  countries,
  onSelectCountry,
  selectedIso2,
  onOpenComparator,
  onStartTour,
  showCorridors,
  onToggleCorridors
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = searchQuery.trim()
    ? countries
        .filter(
          (c) =>
            c.country_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.iso2.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.iso3.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 8)
    : [];

  const sectors: SectorFilter[] = [
    "All",
    "Energy",
    "Water",
    "Healthcare",
    "Financial Services",
    "Telecom",
    "OT/Industrial",
    "Transport"
  ];

  const dimensions: { id: RegulatoryDimension; label: string; icon: React.ReactNode }[] = [
    { id: "incident_clock", label: "Incident Clocks", icon: <Clock className="w-3.5 h-3.5" /> },
    { id: "default_password", label: "Default Passwords", icon: <Key className="w-3.5 h-3.5" /> },
    { id: "sbom_mandate", label: "SBOM & CBOM", icon: <Shield className="w-3.5 h-3.5" /> },
    { id: "data_localization", label: "Data Localization", icon: <Lock className="w-3.5 h-3.5" /> },
    { id: "crypto_controls", label: "Cryptography & PQC", icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "penalties", label: "Penalties & Fines", icon: <Scale className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="flex flex-col gap-2.5 w-full max-w-5xl mx-auto z-20 pointer-events-auto font-sans">
      {/* Unified Command Deck */}
      <div className="relative z-30 p-3 rounded-2xl bg-[#0B0C0E]/90 border border-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] space-y-3">
        {/* Top Tier: Projection Toggle, Global Utilities, Sovereign Search */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* 2D / 3D Projection Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-black/60 border border-white/10 shadow-inner">
            <button
              onClick={() => onToggleProjection("globe")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all duration-150 cursor-pointer ${
                projectionMode === "globe"
                  ? "bg-white/15 text-white border border-white/20 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>3D Globe</span>
            </button>
            <button
              onClick={() => onToggleProjection("flat")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all duration-150 cursor-pointer ${
                projectionMode === "flat"
                  ? "bg-white/15 text-white border border-white/20 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>2D Flat Earth</span>
            </button>
          </div>

          {/* Action Utilities: Auto-Rotate, Corridors, Compare, Tour */}
          <div className="flex items-center gap-2">
            {projectionMode === "globe" && (
              <button
                onClick={onToggleAutoRotate}
                title={autoRotate ? "Pause Globe Rotation" : "Resume Globe Rotation"}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all duration-150 cursor-pointer ${
                  autoRotate
                    ? "bg-white/10 border-white/20 text-white"
                    : "bg-black/40 border-white/5 text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {autoRotate ? <Pause className="w-3.5 h-3.5 text-dutchOrange" /> : <Play className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{autoRotate ? "Pause Spin" : "Auto Spin"}</span>
              </button>
            )}

            {onToggleCorridors && (
              <button
                onClick={onToggleCorridors}
                data-tour="corridor-toggle-btn"
                title={showCorridors ? "Hide Supply Chain Corridors" : "Show Supply Chain Corridors"}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all duration-150 cursor-pointer ${
                  showCorridors
                    ? "bg-dutchOrange/15 border-dutchOrange/40 text-dutchOrange font-semibold shadow-sm"
                    : "bg-black/40 border-white/5 text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Workflow className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Corridors {showCorridors ? "ON" : "OFF"}</span>
              </button>
            )}

            {onOpenComparator && (
              <button
                onClick={onOpenComparator}
                data-tour="compare-launcher-btn"
                title="Compare Bilateral Regulatory Frameworks"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 text-xs font-medium font-mono transition-all duration-150 cursor-pointer"
              >
                <Scale className="w-3.5 h-3.5 text-white/70" />
                <span className="hidden sm:inline">Compare</span>
              </button>
            )}

            {onStartTour && (
              <button
                onClick={onStartTour}
                data-tour="tour-launcher-btn"
                title="Start Interactive Showcase Tour"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dutchOrange/10 border border-dutchOrange/30 text-dutchOrange hover:bg-dutchOrange/20 hover:border-dutchOrange/50 text-xs font-semibold font-mono transition-all duration-150 shadow-sm cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tour</span>
              </button>
            )}
          </div>

          {/* Search Jump Input */}
          <div ref={searchRef} data-tour="search-input" className="relative flex-1 min-w-[200px] max-w-xs">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search 249 nations..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-dutchOrange/60 focus:ring-1 focus:ring-dutchOrange/40 font-mono transition-all duration-150"
              />
            </div>

            {/* Search Dropdown */}
            {searchOpen && filteredCountries.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-[#0B0C0E]/95 border border-white/15 shadow-2xl backdrop-blur-2xl overflow-hidden z-50 divide-y divide-white/5">
                {filteredCountries.map((c) => (
                  <button
                    key={c.iso2}
                    onClick={() => {
                      onSelectCountry(c);
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="w-full px-3.5 py-2.5 flex items-center justify-between text-left hover:bg-white/[0.06] transition-colors text-xs cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-dutchOrange">{c.iso2}</span>
                      <span className="text-white font-medium">{c.country_name}</span>
                      <span className="text-[10px] text-slate-400">({c.continent})</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                      {c.incident_disclosure_hours}h clock
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Divider Hairline */}
        <div className="h-px bg-white/5" />

        {/* Bottom Tier: Integrated Regulatory Dimensions & Sector Filter */}
        <div className="space-y-2">
          {/* Regulatory Dimension Selector */}
          <div data-tour="dimension-bar" className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[10px] uppercase font-mono text-slate-400 px-1 flex items-center gap-1.5 shrink-0">
              <Filter className="w-3 h-3 text-dutchOrange" />
              Dimension:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {dimensions.map((dim) => {
                const isActive = activeDimension === dim.id;
                return (
                  <button
                    key={dim.id}
                    onClick={() => onChangeDimension(dim.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition-all duration-150 cursor-pointer ${
                      isActive
                        ? "bg-white/10 text-white border border-white/20 shadow-sm font-semibold"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                    }`}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-dutchOrange shadow-[0_0_6px_#E05A10]" />
                    )}
                    <span className={isActive ? "text-white" : "text-slate-400"}>{dim.icon}</span>
                    <span>{dim.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sector Applicability Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1.5 border-t border-white/[0.04]">
            <span className="text-[10px] uppercase font-mono text-slate-500 px-1 shrink-0">
              Sector:
            </span>
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {sectors.map((sec) => {
                const isActive = activeSector === sec;
                return (
                  <button
                    key={sec}
                    onClick={() => onChangeSector(sec)}
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono whitespace-nowrap transition-all duration-150 cursor-pointer ${
                      isActive
                        ? "bg-dutchOrange text-white font-bold shadow-sm shadow-dutchOrange/30 border border-dutchOrange"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {sec}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
