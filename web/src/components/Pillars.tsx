"use client";

import React from "react";
import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const Pillars: React.FC = () => {
  const { t } = useLanguage();

  const pillars = [
    {
      id: "water",
      title: "Clean Water Infrastructure",
      subtitle: "Protecting Municipal & Industrial Water Treatment",
      description:
        "Water treatment plants and distribution networks require zero-fail operational safety. We assess SCADA/PLC control loops to eliminate vulnerability vectors.",
      deliverables: [
        "SCADA & PLC Logic Safety Audits",
        "Purdue Level 1/2 Industrial Isolation",
        "Water Quality Sensor Integrity Validation",
      ],
    },
    {
      id: "food",
      title: "Healthy & Secure Food Supply",
      subtitle: "Safeguarding Agriculture & Processing Logistics",
      description:
        "From automated greenhouse climate loops to large-scale food distribution logistics, we ensure food production systems remain resilient against physical disruption.",
      deliverables: [
        "Automated Greenhouse Controls Assessment",
        "Cold-Chain Logistics Cyber-Physical Security",
        "Agri-Tech Process Reliability Benchmarking",
      ],
    },
    {
      id: "energy",
      title: "Sustainable Energy & Grid Reliability",
      subtitle: "BESS, Substation & Power Router Protection",
      description:
        "Energy storage systems (BESS), solar/wind microgrids, and high-voltage substations form the backbone of modern power. We fortify grid topology against cascading failure modes.",
      deliverables: [
        "Battery Energy Storage (BESS) Safety Audits",
        "Microgrid Inverter & Relay Security",
        "Power Flow Stabilization & Load Defense",
      ],
    },
  ];

  return (
    <section id="pillars" className="py-20 bg-black text-white relative font-sans selection:bg-dutchOrange selection:text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="text-xs font-mono text-dutchOrange font-normal inline-block">
            {t("pil_tag" as any)}
          </span>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white uppercase font-mono">
            {t("pil_title" as any)}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
            {t("pil_desc" as any)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          {pillars.map((pillar) => {
            return (
              <div
                key={pillar.id}
                className="group relative rounded-3xl bg-zinc-950/60 hover:bg-zinc-900/50 p-8 transition-all duration-300 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-dutchOrange font-normal block mb-2">{pillar.title}</span>
                  <p className="text-xs text-zinc-400 font-mono mb-3">{pillar.subtitle}</p>

                  <p className="text-xs text-zinc-300 font-sans leading-relaxed mb-6 font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-900/60 space-y-2">
                  <span className="text-xs font-mono text-dutchOrange uppercase tracking-wider block mb-3 font-normal">
                    Deliverables & Protections
                  </span>

                  {pillar.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 font-sans">
                      <Check className="w-4 h-4 text-dutchOrange flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
