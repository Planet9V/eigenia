"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Droplet, Apple, Zap } from "lucide-react";

export const Mission: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="mission" className="py-20 bg-[#121417] text-white relative font-sans selection:bg-dutchOrange selection:text-white border-b border-zinc-900/60">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Mission Statement Hero Card & Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: Reconciled Mission Core Statement Card */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-2xl bg-[#131519] border border-[#22252c] space-y-6 shadow-xl border-l-4 border-l-dutchOrange">
            <div className="space-y-2 border-b border-zinc-900 pb-4">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium block">
                Dutch B.V. Applied Complexity Think Tank
              </span>
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-white">
                Constitution & Core Mandate
              </h2>
            </div>

            <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-sans font-light">
              &ldquo;Eigenia B.V. and Eigenia Labs exist to safeguard vital societal infrastructure—<strong className="text-white font-semibold">Clean Water, Healthy Food, and Sustainable Energy</strong>—by replacing fragile compliance checklists with reproducible mathematical physics, open standards, and catastrophe-calibrated risk models to insulate vital societal assets.&rdquo;
            </p>

            <div className="flex items-center gap-3 pt-2 font-mono text-xs text-dutchOrange">
              <span className="w-2 h-2 rounded-full bg-dutchOrange animate-pulse" />
              <span>Sovereign Infrastructure Protection Policy</span>
            </div>
          </div>

          {/* Right Column: Clean Preserved Artwork */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 relative"
          >
            <img
              src="/assets/Eigenia_1.png"
              alt="Eigenia Societal Infrastructure Protection"
              className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 shadow-xl border border-[#22252c]"
            />
          </motion.div>

        </div>

        {/* 3 Core Societal Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 font-mono text-xs">
          
          {/* Pillar 1: Clean Water */}
          <div className="p-8 rounded-2xl bg-[#131519] border border-[#22252c] hover:border-zinc-700/60 transition-all space-y-5 shadow-xl group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                  <Droplet className="w-5 h-5 text-dutchOrange" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium block">
                  PILLAR 01
                </span>
              </div>
              <h3 className="font-sans text-lg font-semibold text-white group-hover:text-dutchOrange transition-colors">
                Clean Water
              </h3>
              <p className="text-sm text-zinc-300 font-sans leading-relaxed font-light">
                {t("mission_p1_desc" as any)}
              </p>
            </div>
          </div>

          {/* Pillar 2: Healthy Food */}
          <div className="p-8 rounded-2xl bg-[#131519] border border-[#22252c] hover:border-zinc-700/60 transition-all space-y-5 shadow-xl group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                  <Apple className="w-5 h-5 text-dutchOrange" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium block">
                  PILLAR 02
                </span>
              </div>
              <h3 className="font-sans text-lg font-semibold text-white group-hover:text-dutchOrange transition-colors">
                Healthy Food
              </h3>
              <p className="text-sm text-zinc-300 font-sans leading-relaxed font-light">
                {t("mission_p2_desc" as any)}
              </p>
            </div>
          </div>

          {/* Pillar 3: Sustainable Energy */}
          <div className="p-8 rounded-2xl bg-[#131519] border border-[#22252c] hover:border-zinc-700/60 transition-all space-y-5 shadow-xl group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                  <Zap className="w-5 h-5 text-dutchOrange" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium block">
                  PILLAR 03
                </span>
              </div>
              <h3 className="font-sans text-lg font-semibold text-white group-hover:text-dutchOrange transition-colors">
                Sustainable Energy
              </h3>
              <p className="text-sm text-zinc-300 font-sans leading-relaxed font-light">
                {t("mission_p3_desc" as any)}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
