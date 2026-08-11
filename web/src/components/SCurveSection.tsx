"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { TrendingUp } from "lucide-react";
import { MathFormula } from "@/components/MathFormula";

export const SCurveSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="scurve" className="py-20 bg-[#0b0c0e] text-white relative font-sans selection:bg-dutchOrange selection:text-white border-b border-zinc-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
            {t("scurve_tag" as any)}
          </span>

          <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-white">
            {t("scurve_title" as any)}
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
            {t("scurve_desc" as any)}
          </p>
        </div>

        {/* Main Grid: Text Card & S-Curve Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Styled Card */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-[#131519] border border-[#22252c] space-y-6 shadow-xl">
            <div className="space-y-3 border-b border-zinc-900 pb-4">
              <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium block">
                Sigmoidal Phase Transitions in Cyber-Physical Operations
              </span>
              <h3 className="font-sans text-xl sm:text-2xl font-semibold text-white">
                The Non-Linear S-Curve Trajectory
              </h3>
            </div>

            <p className="text-sm text-zinc-300 font-sans leading-relaxed font-light">
              Industrial facilities do not fail linearly. Under increasing adversary perturbation or equipment wear, system stability follows a sigmoidal S-Curve transition: long periods of apparent calm (body of distribution) followed by an abrupt, non-linear acceleration past critical threshold <span className="font-mono text-dutchOrange font-semibold">x_c</span> into physical destruction.
            </p>

            {/* KaTeX Rendered S-Curve Sigmoidal Equation */}
            <div className="p-4 rounded-xl bg-[#0b0c0e] border border-zinc-800/60 font-mono text-xs overflow-x-auto min-h-[60px] flex items-center justify-center">
              <MathFormula formula="S(x) = \frac{1}{1 + e^{-k(x - x_c)}}" />
            </div>
          </div>

          {/* Right Column: S-Curve Image */}
          <div className="lg:col-span-5 relative">
            <img
              src="/assets/Eigenia_2.png"
              alt="Sigmoidal S-Curve Failure Trajectory"
              className="w-full h-auto object-cover rounded-2xl shadow-2xl border border-[#22252c]"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
