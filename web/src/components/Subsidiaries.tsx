"use client";

import React from "react";
import { CheckCircle, ArrowUpRight } from "lucide-react";

export const Subsidiaries: React.FC = () => {
  return (
    <section id="subsidiaries" className="py-24 bg-black text-white relative border-t border-zinc-900 font-sans selection:bg-dutchOrange selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 font-mono">
          <span className="text-xs font-mono text-dutchOrange font-normal inline-block">
            Corporate Architecture
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight uppercase font-mono">
            Operating Divisions & Subsidiaries
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base font-sans font-light">
            Eigenia B.V. executes its mission through specialised operating units delivering commercial cybersecurity audits and open complexity research.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-mono text-xs">
          
          {/* OXOT B.V. Card */}
          <div className="rounded-2xl bg-black border border-zinc-900 p-8 sm:p-10 relative overflow-hidden shadow-2xl hover:border-dutchOrange transition-colors">
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-2xl font-bold text-white uppercase font-mono">OXOT B.V.</h3>
                  <p className="text-xs font-mono text-dutchOrange font-normal">Operational Technology & Physical Safety</p>
                </div>
              </div>
              <span className="text-xs font-mono text-dutchOrange font-normal">
                100% Owned Sub
              </span>
            </div>

            <p className="text-zinc-300 text-xs font-sans leading-relaxed mb-6 font-light">
              OXOT B.V. is the commercial engineering arm providing hands-on penetration testing, SCADA/PLC safety validation, and physical process risk assessments for critical infrastructure clients.
            </p>

            <div className="space-y-3 mb-8 bg-black p-5 rounded-xl border border-zinc-900 font-sans">
              <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                <CheckCircle className="w-4 h-4 text-dutchOrange flex-shrink-0 mt-0.5" />
                <span>Purdue Level 0-3 Industrial Control System Audits</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                <CheckCircle className="w-4 h-4 text-dutchOrange flex-shrink-0 mt-0.5" />
                <span>Physical Process Failure Mode Analysis (FMEA)</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                <CheckCircle className="w-4 h-4 text-dutchOrange flex-shrink-0 mt-0.5" />
                <span>NIS2 & CER EU Directive Compliance Verification</span>
              </div>
            </div>

            <a
              href="https://oxot.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold font-mono text-dutchOrange hover:underline"
            >
              <span>Visit OXOT B.V. Portal</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Eigenia Labs Card */}
          <div className="rounded-2xl bg-black border border-zinc-900 p-8 sm:p-10 relative overflow-hidden shadow-2xl hover:border-dutchOrange/40 transition-colors">
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-2xl font-bold text-white uppercase font-mono">Eigenia Labs</h3>
                  <p className="text-xs font-mono text-dutchOrange font-normal">Applied Complexity & Digital Twins</p>
                </div>
              </div>
              <span className="text-xs font-mono text-dutchOrange font-normal">
                Open Science R&D
              </span>
            </div>

            <p className="text-zinc-300 text-xs font-sans leading-relaxed mb-6 font-light">
              Eigenia Labs operates as an open scientific initiative developing reproducible mathematical models, digital twin simulators, and open standards for vital infrastructure protection.
            </p>

            <div className="space-y-3 mb-8 bg-black p-5 rounded-xl border border-zinc-900 font-sans">
              <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                <CheckCircle className="w-4 h-4 text-dutchOrange flex-shrink-0 mt-0.5" />
                <span>DEXPI 2.0 P&ID Equipment Topology Standardisation</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                <CheckCircle className="w-4 h-4 text-dutchOrange flex-shrink-0 mt-0.5" />
                <span>Nonlinear Eigenvector Grid Bounds (AEON Engine)</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                <CheckCircle className="w-4 h-4 text-dutchOrange flex-shrink-0 mt-0.5" />
                <span>Open Catastrophe Actuarial Underwriting Models</span>
              </div>
            </div>

            <a
              href="#labs"
              className="inline-flex items-center gap-2 text-xs font-bold font-mono text-zinc-300 hover:text-dutchOrange transition-colors"
            >
              <span>Explore Eigenia Labs Showcase</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
