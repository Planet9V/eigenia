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
  Scale
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
  selectedIso2
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
    <div className="flex flex-col gap-3 w-full max-w-5xl mx-auto z-20 pointer-events-auto">
      {/* Top Bar: Projection Switch, Search, Auto-Rotate */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-2xl bg-[#090d16]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
        {/* 2D / 3D Projection Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-black/50 border border-white/5">
          <button
            onClick={() => onToggleProjection("globe")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              projectionMode === "globe"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            3D Globe
          </button>
          <button
            onClick={() => onToggleProjection("flat")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              projectionMode === "flat"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            2D Flat Earth
          </button>
        </div>

        {/* Auto-Rotate (Globe Mode Only) */}
        {projectionMode === "globe" && (
          <button
            onClick={onToggleAutoRotate}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
              autoRotate
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {autoRotate ? "Pause Spin" : "Auto Spin"}
          </button>
        )}

        {/* Search Jump Input */}
        <div ref={searchRef} className="relative flex-1 min-w-[240px]">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search 249 nations (e.g., Germany, SG, US, Japan)..."
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-black/60 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 font-mono"
            />
          </div>

          {/* Search Dropdown */}
          {searchOpen && filteredCountries.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-[#090d16] border border-cyan-500/30 shadow-2xl overflow-hidden z-50 divide-y divide-white/5">
              {filteredCountries.map((c) => (
                <button
                  key={c.iso2}
                  onClick={() => {
                    onSelectCountry(c);
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="w-full px-3.5 py-2.5 flex items-center justify-between text-left hover:bg-cyan-500/10 transition-colors text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-cyan-400">{c.iso2}</span>
                    <span className="text-white font-medium">{c.country_name}</span>
                    <span className="text-[10px] text-slate-400">({c.continent})</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {c.incident_disclosure_hours}h clock
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Secondary Bar: Regulatory Dimension Selector */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-[#090d16]/80 border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto">
          <span className="text-[10px] uppercase font-mono text-slate-400 px-2 flex items-center gap-1">
            <Filter className="w-3 h-3 text-cyan-400" />
            Dimension:
          </span>
          {dimensions.map((dim) => (
            <button
              key={dim.id}
              onClick={() => onChangeDimension(dim.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeDimension === dim.id
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              {dim.icon}
              {dim.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tertiary Bar: Sector Applicability Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1.5 rounded-xl bg-black/40 border border-white/5 backdrop-blur-sm">
        <span className="text-[10px] uppercase font-mono text-slate-500 px-2">
          Sector Scope:
        </span>
        {sectors.map((sec) => (
          <button
            key={sec}
            onClick={() => onChangeSector(sec)}
            className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono whitespace-nowrap transition-colors ${
              activeSector === sec
                ? "bg-cyan-900/40 text-cyan-300 border border-cyan-500/40 font-bold"
                : "text-slate-400 hover:text-slate-300 hover:bg-white/5 border border-transparent"
            }`}
          >
            {sec}
          </button>
        ))}
      </div>
    </div>
  );
}
