"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const DexpiCycloneSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="dexpi" className="py-12 bg-black text-white relative font-sans selection:bg-dutchOrange selection:text-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-2 border-t border-zinc-900/60 pt-8">
          <span className="text-xs font-mono text-dutchOrange font-normal inline-block">
            {t("dexpi_tag" as any)}
          </span>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase font-mono">
            {t("dexpi_title" as any)}
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
            {t("dexpi_subtitle" as any)}
          </p>
        </div>

        {/* 2 Main Columns Grid (Frameless Pure Dark Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
          
          {/* DEXPI 2.0 Equipment Topology */}
          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950/60 hover:bg-zinc-900/50 transition-all shadow-2xl space-y-6">
            <div className="space-y-2 border-b border-zinc-900/60 pb-4">
              <span className="text-xs font-mono text-dutchOrange font-normal inline-block">
                Open Standard // DEXPI 2.0 P&ID Topology
              </span>
              <h3 className="text-xl font-bold text-white uppercase">
                Plant Equipment XML Schema Validation
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed font-light">
              DEXPI (Data Exchange in Process Industry) 2.0 establishes an open, vendor-neutral XML data model for Piping and Instrumentation Diagrams (P&IDs). Eigenia Labs ingests DEXPI XML schemas directly to build deterministic equipment topology graphs.
            </p>

            <div className="p-4 rounded-xl bg-black text-dutchOrange font-mono text-xs overflow-x-auto">
              <code>{"<Equipment id='EQ-402' type='CentrifugalPump' maxPSI='1450' />"}</code>
            </div>
          </div>

          {/* CycloneDX 1.6 4-BOM Suite */}
          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950/60 hover:bg-zinc-900/50 transition-all shadow-2xl space-y-6">
            <div className="space-y-2 border-b border-zinc-900/60 pb-4">
              <span className="text-xs font-mono text-dutchOrange font-normal inline-block">
                Open Standard // CycloneDX 1.6 4-BOM
              </span>
              <h3 className="text-xl font-bold text-white uppercase">
                Software, Hardware & OT Bill of Materials
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed font-light">
              Modern SCADA and PLC control loops rely on third-party firmware, open-source libraries, and SaaS maintenance tunnels. CycloneDX 1.6 4-BOM (SBOM, HBOM, CBOM, SaaSBOM) validates supply chain attestation to 5+ levels of transitive dependency.
            </p>

            <div className="p-4 rounded-xl bg-black text-dutchOrange font-mono text-xs overflow-x-auto">
              <code>{"{\"bomFormat\": \"CycloneDX\", \"specVersion\": \"1.6\", \"components\": [...]}"}</code>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
