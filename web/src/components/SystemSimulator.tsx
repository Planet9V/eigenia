"use client";

import React, { useState } from "react";
import { Activity, ShieldAlert, RefreshCw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const SystemSimulator: React.FC = () => {
  const { t } = useLanguage();
  const [gridFrequency, setGridFrequency] = useState(50.00);
  const [bessState, setBessState] = useState(94.2);
  const [threatLevel, setThreatLevel] = useState<"STABLE" | "ANOMALY DETECTED" | "ISOLATED & SECURE">("STABLE");

  const simulateAttack = () => {
    setThreatLevel("ANOMALY DETECTED");
    setGridFrequency(49.62);
    setTimeout(() => {
      setThreatLevel("ISOLATED & SECURE");
      setGridFrequency(50.00);
      setBessState(98.5);
    }, 2500);
  };

  const resetSim = () => {
    setThreatLevel("STABLE");
    setGridFrequency(50.00);
    setBessState(94.2);
  };

  return (
    <section id="simulation" className="py-14 bg-black text-white relative font-sans selection:bg-dutchOrange selection:text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-8 space-y-2">
          <span className="text-xs font-mono text-dutchOrange font-normal inline-block">
            {t("sim_tag" as any)}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-mono uppercase">
            {t("sim_title" as any)}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 font-light">
            {t("sim_desc" as any)}
          </p>
        </div>

        {/* Console Box (Frameless Pure Dark Card) */}
        <div className="rounded-2xl bg-zinc-950/60 p-6 sm:p-8 shadow-2xl font-mono space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900/60 pb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-dutchOrange animate-pulse" />
              <span className="text-xs font-bold text-white uppercase">{t("sim_live_telemetry" as any)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                threatLevel === "STABLE" ? "bg-black text-dutchOrange" :
                threatLevel === "ANOMALY DETECTED" ? "bg-dutchOrange text-white animate-bounce" :
                "bg-black text-white"
              }`}>
                {threatLevel}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-black space-y-1">
              <span className="text-zinc-400 text-[10px] uppercase block">{t("sim_grid_freq" as any)}</span>
              <span className="text-xl font-bold text-dutchOrange font-mono">{gridFrequency.toFixed(2)} Hz</span>
              <span className="text-[10px] text-zinc-400 block">Baseline target: 50.00 Hz</span>
            </div>

            <div className="p-4 rounded-xl bg-black space-y-1">
              <span className="text-zinc-400 text-[10px] uppercase block">{t("sim_bess_capacity" as any)}</span>
              <span className="text-xl font-bold text-white font-mono">{bessState.toFixed(1)}% SOC</span>
              <span className="text-[10px] text-zinc-400 block">Substation 4B Inverter Response</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-zinc-900/60 text-xs">
            <button
              onClick={resetSim}
              className="px-3.5 py-2 rounded-xl bg-black text-zinc-300 hover:text-white font-mono transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> {t("sim_btn_reset" as any)}
            </button>
            <button
              onClick={simulateAttack}
              className="px-4 py-2 rounded-xl bg-dutchOrange text-white font-bold hover:bg-dutchOrange-600 font-mono transition-colors shadow-md flex items-center gap-1.5"
            >
              <ShieldAlert className="w-3.5 h-3.5" /> {t("sim_btn_inject" as any)}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
