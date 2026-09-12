"use client";

import React, { useState } from "react";
import { Factory, AlertOctagon, CheckCircle2, ChevronRight, ShieldAlert, Sparkles } from "lucide-react";
import { CountryJurisdictionData, SectorFilter } from "@/types/jurisdictions";

interface Props {
  countries: CountryJurisdictionData[];
  onHighlightJurisdictions: (iso2List: string[]) => void;
  onSelectCountry: (country: CountryJurisdictionData) => void;
}

interface FacilityPreset {
  id: string;
  name: string;
  sector: SectorFilter;
  equipmentType: string;
  hasRadio: boolean;
  hasIndustrialControl: boolean;
  processesSensitiveData: boolean;
  description: string;
}

export function FacilityImpactSimulator({
  countries,
  onHighlightJurisdictions,
  onSelectCountry
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string>("offshore_wind");

  const presets: FacilityPreset[] = [
    {
      id: "offshore_wind",
      name: "Offshore Wind Transmission Substation",
      sector: "Energy",
      equipmentType: "High-Voltage Protection Relays, SCADA Level 2 Servers, RTUs",
      hasRadio: true,
      hasIndustrialControl: true,
      processesSensitiveData: false,
      description: "Critical power transmission connecting national grids subject to NIS2, NERC CIP, and IEC 62443-3-3 SL-3."
    },
    {
      id: "water_reclamation",
      name: "Municipal Water Treatment Plant",
      sector: "Water",
      equipmentType: "PLC Level 1 Controllers, Flow Telemetry Sensors, Chemical Dosing Actuators",
      hasRadio: false,
      hasIndustrialControl: true,
      processesSensitiveData: false,
      description: "Drinking water and wastewater telemetry subject to EPA guidance, SOCI Water rules, and CRA Class II."
    },
    {
      id: "medical_imaging",
      name: "Connected Clinical Diagnostic Suite",
      sector: "Healthcare",
      equipmentType: "Connected MRI/CT Imaging Hardware, Clinical IoT Gateways, EHR Interfaces",
      hasRadio: true,
      hasIndustrialControl: false,
      processesSensitiveData: true,
      description: "Medical equipment processing patient diagnostic telemetry subject to FDA 524B, EU CRA, and HIPAA/GDPR."
    },
    {
      id: "chemical_refinery",
      name: "Petrochemical Continuous Processing Unit",
      sector: "OT/Industrial",
      equipmentType: "Safety Instrumented Systems (SIS), Emergency Shutdown Valves, Distributed Control Systems",
      hasRadio: false,
      hasIndustrialControl: true,
      processesSensitiveData: false,
      description: "High-consequence manufacturing subject to EU Machinery Regulation 2023/1230 and IEC 61508 / IEC 62443."
    },
    {
      id: "core_telecom_hub",
      name: "Subsea Cable Landing Station & 5G Gateway",
      sector: "Telecom",
      equipmentType: "Optical Transport Network (OTN) Switches, 5G Core Routers, Session Border Controllers",
      hasRadio: true,
      hasIndustrialControl: true,
      processesSensitiveData: true,
      description: "Foundational digital communications infrastructure subject to Singapore Cyber Act 2024, UK PSTI, and FCC rules."
    }
  ];

  const activePreset = presets.find((p) => p.id === selectedPresetId) || presets[0];

  // Compute impact across all 249 nations based on active facility preset
  const impactedCountries = countries.filter((c) => {
    // Has relevant sector obligation
    const hasSectorObligation = c.sector_applicability[activePreset.sector] !== undefined;

    // Check if equipment encounters critical regulatory gates
    const requiresCRAorSimilar = activePreset.hasIndustrialControl && c.sbom_required;
    const requiresShortNotice = c.incident_disclosure_hours <= 24;
    const localizationConcern = activePreset.processesSensitiveData && c.data_localization_required;

    return hasSectorObligation && (requiresCRAorSimilar || requiresShortNotice || localizationConcern);
  });

  const handleApply = () => {
    const iso2List = impactedCountries.map((c) => c.iso2);
    onHighlightJurisdictions(iso2List);
  };

  return (
    <div className="bg-[#0B0C0E]/90 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-2xl max-w-xl text-xs space-y-3 pointer-events-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Factory className="w-4 h-4 text-dutchOrange" />
          <h3 className="font-bold text-white uppercase tracking-wider font-mono">
            Facility & Asset Impact Simulator
          </h3>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-400 hover:text-white font-mono text-[11px] underline"
        >
          {isOpen ? "Hide Presets" : "Configure Facility"}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-2 pt-2 border-t border-white/10">
          <label className="text-[11px] text-slate-400 font-mono block">
            Select Facility Archetype:
          </label>
          <div className="grid grid-cols-1 gap-1.5">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`p-2 rounded-lg text-left transition-all flex items-start justify-between ${
                  selectedPresetId === preset.id
                    ? "bg-dutchOrange/10 border border-dutchOrange/50 text-white"
                    : "bg-black/30 border border-white/5 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div>
                  <div className="font-bold text-xs flex items-center gap-1.5">
                    {preset.name}
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-white/80">
                      {preset.sector}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">{preset.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Impact Assessment Card */}
      <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-slate-300 font-medium">Active Facility:</span>
          <span className="text-dutchOrange font-mono font-bold">{activePreset.name}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono">
          <div className="p-2 rounded bg-white/[0.02] border border-white/5">
            <span className="text-slate-400 block text-[9px] uppercase">Impacted Nations</span>
            <span className="text-sm font-bold text-white">{impactedCountries.length} / 249</span>
          </div>
          <div className="p-2 rounded bg-white/[0.02] border border-white/5">
            <span className="text-slate-400 block text-[9px] uppercase">&le; 24h Clock</span>
            <span className="text-sm font-bold text-dutchOrange">
              {impactedCountries.filter((c) => c.incident_disclosure_hours <= 24).length}
            </span>
          </div>
          <div className="p-2 rounded bg-white/[0.02] border border-white/5">
            <span className="text-slate-400 block text-[9px] uppercase">CAB Audit Gate</span>
            <span className="text-sm font-bold text-white">
              {impactedCountries.filter((c) => c.sbom_required).length}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleApply}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-dutchOrange hover:bg-dutchOrange/90 text-white border border-dutchOrange/50 text-xs font-mono font-medium shadow-[0_0_15px_rgba(224,90,16,0.25)] transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Highlight Impacted Nations on Map
          </button>
        </div>
      </div>
    </div>
  );
}
