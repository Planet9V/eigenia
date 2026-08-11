"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Droplet, Apple, Zap } from "lucide-react";

export const Mission: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="mission"
      className="py-20 bg-subtle text-primary relative font-sans selection:bg-dutchOrange selection:text-white border-b border-hairline transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Mission Statement Hero Card & Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Reconciled Mission Core Statement Card */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-2xl bg-surface border border-hairline space-y-6 shadow-xl border-l-4 border-l-dutchOrange">
            <div className="space-y-2 border-b border-hairline pb-4">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium block">
                Dutch B.V. Applied Complexity Think Tank
              </span>
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-primary">
                Constitution & Core Mandate
              </h2>
            </div>

            <p className="text-base sm:text-lg text-secondary leading-relaxed font-sans font-light">
              &ldquo;Eigenia B.V. and Eigenia Labs exist to safeguard vital societal infrastructure—<strong className="text-primary font-semibold">Clean Water, Healthy Food, and Sustainable Energy</strong>—by replacing fragile compliance checklists with reproducible mathematical physics, open standards, and catastrophe-calibrated risk models to insulate vital societal assets.&rdquo;
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
              className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 shadow-xl border border-hairline"
            />
          </motion.div>
        </div>

        {/* 3 Core Societal Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 font-mono text-xs">
          {/* Pillar 1: Water */}
          <div className="p-6 rounded-2xl bg-surface border border-hairline space-y-4 shadow-xl">
            <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
              <Droplet className="w-5 h-5" />
            </div>
            <h3 className="font-sans text-lg font-semibold text-primary">
              1. Clean Water Operations
            </h3>
            <p className="text-xs text-secondary font-sans leading-relaxed font-light">
              Protecting municipal water treatment facilities, reservoir telemetry, and chemical dosing networks against cyber-physical manipulation and hydraulic failure cascades.
            </p>
          </div>

          {/* Pillar 2: Food */}
          <div className="p-6 rounded-2xl bg-surface border border-hairline space-y-4 shadow-xl">
            <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
              <Apple className="w-5 h-5" />
            </div>
            <h3 className="font-sans text-lg font-semibold text-primary">
              2. Healthy Food & Logistics
            </h3>
            <p className="text-xs text-secondary font-sans leading-relaxed font-light">
              Securing automated agricultural supply chains, cold-chain distribution networks, and fertilizer production plants against targeted supply interruptions.
            </p>
          </div>

          {/* Pillar 3: Energy */}
          <div className="p-6 rounded-2xl bg-surface border border-hairline space-y-4 shadow-xl">
            <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-sans text-lg font-semibold text-primary">
              3. Sustainable Energy Grids
            </h3>
            <p className="text-xs text-secondary font-sans leading-relaxed font-light">
              Modeling low-inertia power grid frequency collapse (RoCoF &gt; 1.0 Hz/s), BESS battery thermal runaway, and protection relay trip dominoes across renewable energy infrastructure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
