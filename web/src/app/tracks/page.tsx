"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { EuComplianceFooter } from "@/components/EuComplianceFooter";
import { ImpressumModal } from "@/components/ImpressumModal";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ArrowRight, CheckCircle2, BookOpen, Layers, Cpu, ShieldAlert, Activity, Network, Zap, LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ResearchTracksPage() {
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [cookiesForceOpen, setCookiesForceOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"bento" | "grid">("grid");

  const researchTracks = [
    {
      id: "track-1",
      number: "TRACK 01 // TALEB SERIES",
      title: "Fooled by Randomness: Probabilistic Risk Series",
      tag: "Heavy-Tailed Pareto Dynamics & Extreme Value Mechanics",
      icon: BookOpen,
      featured: true,
      description:
        "Standard risk models assume Gaussian normal distribution curves where extreme events sit six standard deviations out and get treated as impossible. In physical plants and connected power grids, breaches follow fat-tailed Pareto distributions where 80% of aggregate financial loss stems from 1% of Black Swan events.",
      deliverables: [
        "5 long-form treatises by J. McKenney applying Nassim Taleb's framework to OT",
        "Peak-Over-Threshold (POT) asymptotic exceedance calculations",
        "L0/L1 information divergence and survival bias proofs",
      ],
      href: "/papers/taleb-fooled-by-randomness",
      buttonText: "Read Taleb Treatises (TOC Reader)",
    },
    {
      id: "track-2",
      number: "TRACK 02 // OPEN STANDARDS",
      title: "DEXPI 2.0 P&ID Topology & CycloneDX 4-BOM",
      tag: "Cyber-Physical Open Standards // Hardware, Software, OT & Component BOM",
      icon: Layers,
      featured: false,
      description:
        "Connecting plant P&ID design sheets directly to live physical assets. Integrates DEXPI 2.0 XML equipment schemas with CycloneDX 1.6 4-BOM attestations (Software, Hardware, OT, Component) to enforce Minimum Operational Requirements (MOR) on the plant floor.",
      deliverables: [
        "DEXPI 2.0 P&ID XML equipment schema parser and graph pipeline",
        "CycloneDX 1.6 4-BOM attestation across software, hardware, and OT assets",
        "Minimum Operational Requirements (MOR) compliance tracking",
      ],
      href: "/physics#dexpi",
      buttonText: "Explore DEXPI Open Standards",
    },
    {
      id: "track-3",
      number: "TRACK 03 // ACTUARIAL",
      title: "Catastrophe-Grade Cyber-Physical Actuarial Engine",
      tag: "Actuarial Frameworks // Clayton Copulas & ALE",
      icon: Cpu,
      featured: false,
      description:
        "Catastrophe modeling built for physical infrastructure. Replaces static self-reported questionnaires with Clayton Copula tail dependence matrices, Aggregate Loss Exceedance (ALE) curves, Paradigm Suite risk modules, Lacanian psychohistory behavioral models, Kramers Escape barrier mechanics, and Lloyd's Y5381 war exclusion filtering.",
      deliverables: [
        "11 actuarial and risk engineering treatises covering COPE, Paradigm Suite, Lacanian & Kramers models",
        "Clayton Copula lower tail dependence loss matrix",
        "Aggregate Loss Exceedance (ALE) catastrophe loss curve",
        "Lloyd's Y5381 physical war exclusion filtering",
      ],
      href: "/papers/4-underwriter-cyber-risk-underwriting",
      buttonText: "Read Actuarial Underwriter Series (11 Treatises)",
    },
    {
      id: "track-4",
      number: "TRACK 04 // TACAM MATRIX",
      title: "Threat Actor Capability & Motivation Quantification (TACAM)",
      tag: "7-Dimensional Threat Actor Fingerprinting // 77,279 Data Points",
      icon: ShieldAlert,
      featured: false,
      description:
        "Analytical matrix profiling 389 threat actor groups across 77,279 data points, indexing TTPs, targeted industrial sectors, CPE hardware footprints, CWE weaknesses, OT protocols, state alignment, and campaign velocity.",
      deliverables: [
        "7-dimensional threat actor matrix across 77,279 data points",
        "Cross-dimensional CPE exposure and hardware procurement queries",
        "Real-time EPSS velocity and active campaign tracking",
      ],
      href: "/papers/tacam-deep-dive",
      buttonText: "Read Deep Dive Paper (TACAM)",
    },
    {
      id: "track-5",
      number: "TRACK 05 // THREAT SCORING",
      title: "Threat Actor Scoring: Adversary Threat Quotient (ATQ)",
      tag: "12-Factor Materialized SQL View Scoring // 0-100 Rating",
      icon: Activity,
      featured: false,
      description:
        "A composite score (0–100) measuring real-time adversary danger. Materialized in Postgres (seldon.seldon_score_v2), the calculation combines TACAM vectors, EPSS exploit rates, and ACLED geopolitical tension metrics.",
      deliverables: [
        "12-factor materialized SQL view scoring formula (0–100 scale)",
        "Calibrated saturation thresholds yielding 3.7x discriminatory gain",
        "Continuous snapshot epochs with 90-day trajectory forecasts",
      ],
      href: "/papers/atq-deep-dive",
      buttonText: "Read Deep Dive Paper (ATQ)",
    },
    {
      id: "track-6",
      number: "TRACK 06 // MONTE CARLO",
      title: "Subgraph Building & Monte Carlo Walk Simulation",
      tag: "Importance-Weighted BFS & Boltzmann Random Walks",
      icon: Network,
      featured: false,
      description:
        "A simulation engine running importance-weighted BFS and Boltzmann random walks on Neo4j/pgvector graph data, powered by Mulberry32 PRNG and SSE live streaming.",
      deliverables: [
        "Importance-weighted BFS subgraph extraction (mc-importance-bfs.ts)",
        "Boltzmann softmax edge selection with temperature parameter T",
        "Fat-tailed Pareto loss sampling with CVaR and TVaR risk calculations",
      ],
      href: "/papers/monte-carlo-engine",
      buttonText: "Read Deep Dive Paper (Monte Carlo)",
    },
    {
      id: "track-7",
      number: "TRACK 07 // CASCADING FAILURES",
      title: "Cascading Failure Hypothesis & Grid Frequency Instability",
      tag: "Death Wobble Dynamics & Low-Inertia RoCoF Exceedance (>1.0 Hz/s)",
      icon: Zap,
      featured: false,
      description:
        "Modeling frequency oscillations ('Death Wobble'), Rate of Change of Frequency (RoCoF) exceedances (>1.0 Hz/s), and cascading relay trips across power grids operating with reduced rotational inertia.",
      deliverables: [
        "The Grid's Precarious Pulse: Frequency Instability Treatise (J. McKenney)",
        "Cyber-physical attack impact hypothesis on the NSW 1.2M customer network",
        "RoCoF exceedance (>1.0 Hz/s) and domino protection relay mechanics",
      ],
      href: "/papers/death-wobble-frequency-instability",
      buttonText: "Read Death Wobble & Cascading Failure Papers",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0b0c0e] text-white relative font-sans selection:bg-dutchOrange selection:text-white">
      <Navbar
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenCookies={() => setCookiesForceOpen(true)}
      />

      {/* Main Header Container (Obsidian Hero Band #0b0c0e) */}
      <section className="bg-[#0b0c0e] pt-28 pb-12 border-b border-zinc-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Breadcrumb Navigation */}
          <Breadcrumb
            items={[
              { label: "Research Tracks", href: "/tracks" },
              { label: "7 Core R&D Domains & Treatises" },
            ]}
          />

          {/* Page Header & View Switcher */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-3xl space-y-4">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
                Eigenia Labs Research Catalogue
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-white">
                Scientific Research Tracks
              </h1>
              <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                Seven operational research tracks covering fat-tailed risk distributions, DEXPI/CycloneDX open topology standards, catastrophe actuarial modeling, TACAM threat fingerprinting, ATQ threat scoring, Monte Carlo subgraph walks, and grid frequency collapse.
              </p>
            </div>

            {/* View Mode Toggle Switcher */}
            <div className="flex items-center gap-1 bg-[#131519] p-1.5 rounded-xl border border-zinc-800/60 font-mono text-xs font-medium flex-shrink-0">
              <button
                onClick={() => setViewMode("bento")}
                className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  viewMode === "bento"
                    ? "bg-dutchOrange text-white shadow-sm font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" /> Bento Grid (2 Col)
              </button>

              <button
                onClick={() => setViewMode("grid")}
                className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  viewMode === "grid"
                    ? "bg-dutchOrange text-white shadow-sm font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <List className="w-3.5 h-3.5" /> Compact Grid (3 Col)
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7 Core Research Tracks Cards (Charcoal Band #121417) */}
      <section className="bg-[#121417] py-20 border-b border-zinc-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div
            className={`grid gap-6 font-mono text-xs ${
              viewMode === "bento"
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {researchTracks.map((track) => {
              const IconComponent = track.icon;
              return (
                <motion.div
                  key={track.id}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className={`rounded-2xl bg-[#131519] space-y-6 shadow-xl flex flex-col justify-between group ${
                    track.featured
                      ? "border-2 border-dutchOrange shadow-2xl relative"
                      : "border border-[#22252c] hover:border-zinc-700/60"
                  } ${viewMode === "grid" ? "p-6 space-y-4" : "p-8 space-y-6"}`}
                >
                  {track.featured && (
                    <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-dutchOrange text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                      Featured Series
                    </span>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-dutchOrange" />
                      </div>
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium block">
                        {track.number}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h2 className="font-sans text-xl font-semibold text-white group-hover:text-dutchOrange transition-colors leading-tight">
                        {track.title}
                      </h2>
                      <span className="text-[10px] font-mono text-zinc-400 block pt-1">
                        {track.tag}
                      </span>
                    </div>

                    <p className="text-sm text-zinc-300 font-sans leading-relaxed font-light">
                      {track.description}
                    </p>

                    <div className="space-y-2 pt-3 border-t border-zinc-900 font-sans">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-dutchOrange uppercase font-medium block">
                        Deliverables & Schemas:
                      </span>
                      {track.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-dutchOrange flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={track.href}
                    className={`pt-4 border-t border-zinc-900 font-sans text-xs font-semibold flex items-center justify-between group-hover:translate-x-1 transition-transform ${
                      track.featured ? "text-dutchOrange" : "text-white hover:text-dutchOrange"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {track.buttonText}
                    </span>
                    <ArrowRight className="w-4 h-4 text-dutchOrange" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <EuComplianceFooter
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenCookies={() => setCookiesForceOpen(true)}
      />

      <ImpressumModal isOpen={impressumOpen} onClose={() => setImpressumOpen(false)} />
      <CookieConsentBanner forceOpen={cookiesForceOpen} onCloseForceOpen={() => setCookiesForceOpen(false)} />
    </main>
  );
}
