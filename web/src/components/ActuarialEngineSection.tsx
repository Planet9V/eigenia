"use client";

import React from "react";
import { FileSpreadsheet } from "lucide-react";
import { MathFormula } from "@/components/MathFormula";

export const ActuarialEngineSection: React.FC = () => {
  return (
    <section
      id="actuarial"
      className="py-20 bg-subtle text-primary relative font-sans selection:bg-dutchOrange selection:text-white scroll-mt-24 border-b border-hairline transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
            Actuarial Catastrophe Modeling
          </span>

          <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-primary">
            Catastrophe-Grade Cyber-Physical Actuarial Engine
          </h2>

          <p className="text-sm sm:text-base text-secondary font-light leading-relaxed">
            Portfolio risk modeling built on 4-module catastrophe frameworks, Exceedance Probability (EP) loss curves, Rotated 90° Clayton Copulas, and Lloyd's Market Bulletin Y5381 war exclusion filters.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Mathematical Spec */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-surface border border-hairline space-y-6 shadow-xl">
            <div className="space-y-3 border-b border-hairline pb-4">
              <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5 text-dutchOrange" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium block">
                Actuarial Copula Engine Specification
              </span>
              <h3 className="font-sans text-xl sm:text-2xl font-semibold text-primary">
                Clayton Copula Tail Dependence & ALE Algorithm
              </h3>
            </div>

            {/* KaTeX Rendered Clayton Copula Formula */}
            <div className="p-4 rounded-xl bg-subtle border border-hairline font-mono text-xs overflow-x-auto min-h-[60px] flex items-center justify-center">
              <MathFormula formula="C_\theta(u, v) = \left(u^{-\theta} + v^{-\theta} - 1\right)^{-1/\theta}, \quad \lambda_L = 2^{-1/\theta}" />
            </div>

            <p className="text-sm text-secondary font-sans leading-relaxed font-light">
              Conventional cyber insurance relies on independent Bernoulli trials. In physical infrastructure, operational breaches exhibit lower tail dependence <MathFormula formula="\lambda_L > 0" inline />. When one turbine or SCADA controller trips under stress, adjacent control loops experience immediate cascading failure. The AEON Actuarial Engine computes Aggregate Loss Exceedance (ALE) curves and enforces Lloyd's Y5381 state-backed cyber war exclusions directly from plant telemetry.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs pt-2">
              <div className="p-4 rounded-xl bg-subtle border border-hairline space-y-1">
                <span className="text-muted block text-[10px]">Clayton Copula Tail Index</span>
                <div className="text-dutchOrange font-bold text-sm">
                  <MathFormula formula="\lambda_L = 2^{-1/\theta} > 0" inline />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-subtle border border-hairline space-y-1">
                <span className="text-muted block text-[10px]">War Exclusion Standard</span>
                <div className="text-primary font-bold text-xs">
                  Lloyd's Bulletin Y5381 Enforced
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Actuarial Diagram Card */}
          <div className="lg:col-span-5 relative p-8 rounded-2xl bg-surface border border-hairline space-y-5 shadow-xl">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-dutchOrange font-semibold">
              4-Module Catastrophe Architecture
            </h4>

            <ul className="space-y-4 font-mono text-xs text-secondary">
              <li className="p-3 rounded-xl bg-subtle border border-hairline space-y-1">
                <div className="text-primary font-bold">1. Hazard Module</div>
                <p className="text-[11px] text-muted font-sans font-light">
                  Simulates adversary perturbation parameters and physical threat vectors.
                </p>
              </li>

              <li className="p-3 rounded-xl bg-subtle border border-hairline space-y-1">
                <div className="text-primary font-bold">2. Vulnerability Module</div>
                <p className="text-[11px] text-muted font-sans font-light">
                  Maps telemetry against EPSS vulnerability scoring and SCADA topology.
                </p>
              </li>

              <li className="p-3 rounded-xl bg-subtle border border-hairline space-y-1">
                <div className="text-primary font-bold">3. Financial Exposure Module</div>
                <p className="text-[11px] text-muted font-sans font-light">
                  Calculates asset replacement values and business interruption outage costs.
                </p>
              </li>

              <li className="p-3 rounded-xl bg-subtle border border-hairline space-y-1">
                <div className="text-primary font-bold">4. Insurance Loss Engine</div>
                <p className="text-[11px] text-muted font-sans font-light">
                  Outputs Exceedance Probability (EP) curves, attachment points, and policy limits.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
