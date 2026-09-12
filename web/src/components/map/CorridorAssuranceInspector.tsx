"use client";

import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  Clock,
  AlertTriangle,
  ArrowRight,
  FileCheck2,
  Cpu,
  Layers,
  Sparkles,
  Maximize2
} from "lucide-react";
import { SupplyChainCorridor } from "@/types/jurisdictions";

interface Props {
  corridor: SupplyChainCorridor | null;
  onClose: () => void;
  onFocusOrigin?: (coords: [number, number]) => void;
  onFocusTarget?: (coords: [number, number]) => void;
  onSelectCountry?: (iso2: string) => void;
}

export function CorridorAssuranceInspector({
  corridor,
  onClose,
  onFocusOrigin,
  onFocusTarget,
  onSelectCountry
}: Props) {
  const [tokenSimulated, setTokenSimulated] = useState(false);

  if (!corridor) return null;

  const clockDelta = corridor.clockDeltaHours ?? 0;
  const dwellDays = corridor.customsDwellRiskDays ?? 8.0;
  const dwellHoursPreCleared = corridor.preClearanceHours ?? 3.5;
  const liabilityM = corridor.article19LiabilityEurM ?? 10.0;
  const parity = corridor.complianceParityScore ?? 85;

  return (
    <div
      className="absolute bottom-4 left-4 right-4 md:right-auto md:w-[490px] z-30 pointer-events-auto font-sans"
      role="region"
      aria-label="Statutory Corridor Assurance Inspector"
    >
      <div className="p-5 rounded-2xl bg-[#0B0C0E]/95 border border-white/10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-white space-y-4">
        {/* Header Bar: Sector, Type, Status, and Close */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider bg-white/10 border border-white/15 text-white">
              {corridor.sector || "OT/Industrial"}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-slate-300 bg-black/40 border border-white/5">
              {corridor.corridorType}
            </span>
            <div
              className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold border ${
                corridor.panTokenStatus === "VERIFIED" || tokenSimulated
                  ? "bg-[#E05A10]/15 text-[#E05A10] border-[#E05A10]/40"
                  : corridor.panTokenStatus === "PENDING_SBOM"
                  ? "bg-white/10 text-white border-white/20"
                  : "bg-slate-800 text-slate-300 border-white/10"
              }`}
            >
              {corridor.panTokenStatus === "VERIFIED" || tokenSimulated ? (
                <>
                  <ShieldCheck className="w-3 h-3 text-[#E05A10]" />
                  <span>PAN TOKEN VERIFIED</span>
                </>
              ) : corridor.panTokenStatus === "PENDING_SBOM" ? (
                <>
                  <Clock className="w-3 h-3 text-slate-300" />
                  <span>PENDING ECMA-424 SBOM</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3 h-3 text-slate-400" />
                  <span>STATUTORY AUDIT REQ</span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close corridor inspector"
            aria-label="Close corridor inspector"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Origin to Destination Routing Deck */}
        <div className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-2 p-3 rounded-xl bg-black/50 border border-white/5">
            {/* Origin Hub */}
            <div className="space-y-0.5">
              <div className="text-[10px] font-mono uppercase text-slate-400">Origin Hub</div>
              <button
                onClick={() => {
                  if (onFocusOrigin) onFocusOrigin(corridor.sourceCoords);
                  if (onSelectCountry && corridor.sourceIso2) onSelectCountry(corridor.sourceIso2);
                }}
                className="text-left font-semibold text-xs text-white hover:text-[#E05A10] transition-colors leading-tight line-clamp-1"
                title={`Focus on ${corridor.sourceName}`}
              >
                {corridor.sourceName}
              </button>
              <div className="text-[10px] font-mono text-slate-400 truncate">
                {corridor.sourceRegime || "National OT Authority"}
              </div>
              <div className="inline-flex items-center gap-1 text-[10px] font-mono text-[#E05A10] bg-[#E05A10]/10 px-1.5 py-0.5 rounded">
                <Clock className="w-2.5 h-2.5" />
                <span>{corridor.sourceSlaHours ?? 24}h SLA</span>
              </div>
            </div>

            {/* Asymmetry Arrow / Delta */}
            <div className="flex flex-col items-center justify-center py-1 sm:py-0 px-2 text-center">
              <div className="text-[9px] font-mono font-bold text-slate-400 uppercase">
                {clockDelta > 0 ? `${clockDelta}h Delta` : "Harmonized"}
              </div>
              <ArrowRight className="w-4 h-4 text-white/40 my-0.5 rotate-90 sm:rotate-0" />
              <div className="text-[9px] font-mono text-slate-500">
                {parity}% Parity
              </div>
            </div>

            {/* Destination Hub */}
            <div className="space-y-0.5 text-left sm:text-right">
              <div className="text-[10px] font-mono uppercase text-slate-400">Destination Hub</div>
              <button
                onClick={() => {
                  if (onFocusTarget) onFocusTarget(corridor.targetCoords);
                  if (onSelectCountry) onSelectCountry(corridor.targetIso2);
                }}
                className="text-left sm:text-right font-semibold text-xs text-white hover:text-[#E05A10] transition-colors leading-tight line-clamp-1 block w-full"
                title={`Focus on ${corridor.targetCountryName}`}
              >
                {corridor.targetCountryName}
              </button>
              <div className="text-[10px] font-mono text-slate-400 truncate">
                {corridor.targetRegime || "Supervisory Gate"}
              </div>
              <div className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-300 bg-white/5 px-1.5 py-0.5 rounded">
                <Clock className="w-2.5 h-2.5" />
                <span>{corridor.targetSlaHours ?? 24}h SLA</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Bento Analytical Metric Tiles */}
        <div className="grid grid-cols-3 gap-2">
          {/* Tile 1: SLA Clock Delta */}
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 uppercase">
              <Clock className="w-3 h-3 text-[#E05A10]" />
              <span>SLA Clock</span>
            </div>
            <div className="text-base font-bold font-mono text-white">
              {clockDelta > 0 ? `+${clockDelta}h` : "0h"}
            </div>
            <div className="text-[9px] font-mono text-slate-400 leading-tight">
              {clockDelta > 0 ? "Reporting window gap" : "Full regulatory parity"}
            </div>
          </div>

          {/* Tile 2: Customs Dwell Reduction */}
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 uppercase">
              <FileCheck2 className="w-3 h-3 text-[#E05A10]" />
              <span>Customs Dwell</span>
            </div>
            <div className="text-base font-bold font-mono text-white">
              {dwellHoursPreCleared}h <span className="text-[10px] text-slate-500 font-normal">vs {dwellDays}d</span>
            </div>
            <div className="text-[9px] font-mono text-slate-400 leading-tight">
              Pre-cleared with ECMA-424
            </div>
          </div>

          {/* Tile 3: CRA Art. 19 Liability */}
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 uppercase">
              <Layers className="w-3 h-3 text-[#E05A10]" />
              <span>Liability</span>
            </div>
            <div className="text-base font-bold font-mono text-[#E05A10]">
              €{liabilityM.toFixed(1)}M
            </div>
            <div className="text-[9px] font-mono text-slate-400 leading-tight">
              EU CRA Art. 19 Max Fine
            </div>
          </div>
        </div>

        {/* Statutory Governance & Treaty Reference */}
        <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-400 uppercase tracking-wider">Governing Legal Treaty</span>
            <span className="text-[#E05A10] font-semibold">Article Reference</span>
          </div>
          <p className="text-xs font-sans text-white leading-relaxed">
            {corridor.statutoryGate}
          </p>
          {corridor.statutoryArticleRef && (
            <p className="text-[11px] font-mono text-slate-400">
              {corridor.statutoryArticleRef}
            </p>
          )}
        </div>

        {/* Critical OT/Cyber-Physical Component Manifest */}
        {corridor.componentClasses && corridor.componentClasses.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-slate-400">
              <Cpu className="w-3 h-3 text-[#E05A10]" />
              <span>Critical Cyber-Physical Component Classes Crossing Corridor</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {corridor.componentClasses.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] border border-white/10 text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/10">
          <button
            onClick={() => setTokenSimulated(!tokenSimulated)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E05A10]/15 border border-[#E05A10]/40 text-[#E05A10] hover:bg-[#E05A10]/25 text-xs font-mono font-semibold transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{tokenSimulated ? "Reset Token Simulation" : "Generate ECMA-424 Pre-Clearance Token"}</span>
          </button>

          <button
            onClick={() => {
              if (onFocusOrigin) onFocusOrigin(corridor.sourceCoords);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 text-xs font-mono transition-colors cursor-pointer"
            title="Re-center camera on origin hub"
          >
            <Maximize2 className="w-3 h-3 text-slate-400" />
            <span>Focus Hub</span>
          </button>
        </div>
      </div>
    </div>
  );
}
