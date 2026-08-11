"use client";

import React, { useState } from "react";
import { ArrowRight, BookOpen, LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MathFormula } from "@/components/MathFormula";

export interface TheoryModel {
  id: string;
  slug: string;
  number: string;
  name: string;
  tag: string;
  formula: string;
  description: string;
  deliverables: string[];
}

export const theoryModelsList: TheoryModel[] = [
  {
    id: "m1",
    slug: "aeon-ggnn-gated-graph",
    number: "MODEL 01",
    name: "GGNN Directed Graph Topology",
    tag: "Graph Neural Networks & Physical Topology",
    formula: "h_i^{(t)} = \\text{GRU}\\left(h_i^{(t-1)}, \\sum_{j \\in \\mathcal{N}(i)} W e_{ij}\\right)",
    description: "7-layer directed graph neural network mapping physical SCADA/PLC control loops, lateral movement trajectories, and real-time vulnerability propagation across OT topologies.",
    deliverables: [
      "7-Layer Gated Graph Neural Network Topology",
      "Dynamic Lateral Movement Trajectory Sampling",
      "Real-Time SCADA/PLC Vulnerability Mapping",
    ],
  },
  {
    id: "m2",
    slug: "l0-l1-gap-calculus",
    number: "MODEL 02",
    name: "L0/L1 KL Divergence Asset Drift",
    tag: "Information Divergence & Asset Drift",
    formula: "D_{\\text{KL}}(P_{\\text{L1}} \\parallel P_{\\text{L0}}) = \\sum_{x} P_{\\text{L1}}(x) \\log \\frac{P_{\\text{L1}}(x)}{P_{\\text{L0}}(x)}",
    description: "Kullback-Leibler divergence metric measuring calibration drift between Platonic design datasheets (L0) and live physical sensor telemetry (L1).",
    deliverables: [
      "DEXPI 2.0 Platonic Datasheet Schema Validation",
      "Sensors & Actuators Calibration Drift Detection",
      "Minimum Operational Requirements (MOR) Index",
    ],
  },
  {
    id: "m3",
    slug: "mckenney-lacan-psychometric-tensor",
    number: "MODEL 03",
    name: "McKenney-Lacan Psychometric Tensor",
    tag: "Lacanian Four Discourses & RSI Triad",
    formula: "\\mathbf{T}_{\\text{adversary}} = \\mathbf{P}_{\\text{OCEAN}} \\otimes \\mathbf{V}_{\\text{capabilities}} \\otimes \\mathbf{G}_{\\text{geopolitical}}",
    description: "Integrates Jacques Lacan's Four Discourses (Master, University, Hysteric, Analyst) and RSI Triad (Real, Symbolic, Imaginary) with OCEAN psychometrics to predict threat actor targeting logic.",
    deliverables: [
      "Lacanian Four Discourses Threat Typology Profiling",
      "Real/Symbolic/Imaginary Structural Target Prediction",
      "Psychometric Tensor Alignment Matrix",
    ],
  },
  {
    id: "m4",
    slug: "interaction-hamiltonian",
    number: "MODEL 04",
    name: "Ising Phase Transition Security Model",
    tag: "Statistical Thermodynamics & Crisis Culture",
    formula: "\\mathcal{H}_{\\text{interaction}} = -\\sum_{\\langle i,j \\rangle} J_{ij} \\sigma_i \\sigma_j - h \\sum_i \\sigma_i",
    description: "Statistical thermodynamics Ising spin model measuring correlated team dynamics, security culture phase transitions, and Granovetter cascading threshold failure.",
    deliverables: [
      "Ising Phase Transition Security Culture Model",
      "Emergency Response Team Consonance Metrics",
      "Granovetter Cascading Critical Cut Identification",
    ],
  },
  {
    id: "m5",
    slug: "kramers-barrier-escape",
    number: "MODEL 05",
    name: "Kramers Potential Barrier Escape Model",
    tag: "Topological Risk & Time-to-Compromise",
    formula: "k = A \\exp\\left(-\\frac{\\Delta E}{k_B T}\\right), \\quad \\text{MTTC} = \\frac{1}{k}",
    description: "Transition state theory modeling stochastic attacker escape across topological energy barriers (\\Delta E) under threat temperature (k_B T), yielding Mean Time to Compromise (MTTC).",
    deliverables: [
      "Mean-Time-to-Compromise (MTTC) Epoch Calculation",
      "Topological Defensive Energy Barrier \\Delta E Hardening",
      "Stochastic Monte Carlo Walk Weighting",
    ],
  },
  {
    id: "m6",
    slug: "sir-compartmental-model",
    number: "MODEL 06",
    name: "SIR Compartmental Vulnerability Spreading",
    tag: "Epidemic Kinetics & Vulnerability Spreading",
    formula: "\\frac{dS}{dt} = -\\beta S I, \\quad \\frac{dI}{dt} = \\beta S I - \\gamma I, \\quad R_0 = \\frac{\\beta S_0}{\\gamma}",
    description: "Epidemiological kinetic model quantifying rapid vulnerability propagation across interconnected SCADA networks, where R_0 > 15 triggers tipping state alerts.",
    deliverables: [
      "Network Contagion Threshold R_0 Rate Calculation",
      "Interconnected Asset Infection Path Mapping",
      "Tipping Point Early Warning Trigger",
    ],
  },
  {
    id: "m7",
    slug: "clayton-copula-actuarial",
    number: "MODEL 07",
    name: "Clayton Copula Tail Dependence & ALE",
    tag: "Heavy-Tailed Reinsurance & Catastrophe Underwriting",
    formula: "C_\\theta(u, v) = (u^{-\\theta} + v^{-\\theta} - 1)^{-1/\\theta}, \\quad \\lambda_L = 2^{-1/\\theta} > 0",
    description: "Bivariate lower-tail copula capturing non-linear joint risk dependence and Aggregate Loss Exceedance (ALE) under Lloyd's Y5381 physical war exclusions.",
    deliverables: [
      "Clayton Copula Systemic Dependency Loss Matrix",
      "Aggregate Loss Exceedance (ALE) Catastrophe Curve",
      "Lloyd's Y5381 Physical State Exclusion Validation",
    ],
  },
  {
    id: "m8",
    slug: "hawkes-self-exciting-process",
    number: "MODEL 08",
    name: "Hawkes Self-Exciting Cascade Process",
    tag: "Correlated Incident Cascades & Aftershocks",
    formula: "\\lambda(t) = \\mu(t) + \\sum_{t_i < t} \\alpha e^{-\\beta(t - t_i)}",
    description: "Self-exciting point process modeling temporal clustering of physical security breaches, where one incident elevates the probability of subsequent cascade events.",
    deliverables: [
      "Temporal Incident Cluster Intensity \\lambda(t)",
      "Secondary Aftershock Impact Probability",
      "Cascading Control Loop Failure Forecasting",
    ],
  },
  {
    id: "m9",
    slug: "pareto-pot-evt-model",
    number: "MODEL 09",
    name: "Pareto Fat-Tailed Peak-Over-Threshold (POT)",
    tag: "Extreme Value Theory & Black Swan Risk",
    formula: "\\text{TVaR}_q(X) = \\frac{\\alpha}{\\alpha - 1} \\frac{x_m}{(1-q)^{1/\\alpha}}, \\quad X = x_{\\min} (1 - U)^{-1/\\alpha}",
    description: "Asymptotic tail loss quantification overriding Gaussian assumptions with fat-tailed Pareto distributions where 80% of damage stems from 1% of Black Swan events.",
    deliverables: [
      "Tail Value-at-Risk (TVaR) Asymptotic Exceedance",
      "Heavy-Tailed Pareto Loss Index \\alpha Computation",
      "Extreme Value Theory (EVT) Black Swan Simulation",
    ],
  },
];

export const TheoryCatalogue: React.FC = () => {
  const [viewMode, setViewMode] = useState<"bento" | "grid">("grid");

  return (
    <section id="theory" className="py-20 bg-[#16181d] text-white relative font-sans selection:bg-dutchOrange selection:text-white scroll-mt-24 border-b border-zinc-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-900 pb-8">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
              Open Scientific Research Catalogue
            </span>

            <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-white">
              Applied Physics & Mathematical Frameworks
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              9 non-linear physical risk models, algebraic topology frameworks, and statistical thermodynamics algorithms implemented across the Eigenia digital twin engine.
            </p>
          </div>

          {/* View Mode Toggle Switcher */}
          <div className="flex items-center gap-1 bg-[#0b0c0e] p-1.5 rounded-xl border border-zinc-800/60 font-mono text-xs font-medium flex-shrink-0">
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

        {/* 9 Models Grid (Dynamic Grid Class for Bento vs Compact) */}
        <div
          className={`grid gap-6 font-mono text-xs ${
            viewMode === "bento"
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {theoryModelsList.map((model) => (
            <motion.div
              key={model.id}
              whileHover={{ y: -4, scale: 1.01 }}
              className={`rounded-2xl bg-[#131519] border border-[#22252c] hover:border-zinc-700/60 transition-all shadow-xl flex flex-col justify-between group ${
                viewMode === "grid" ? "p-6 space-y-4" : "p-8 space-y-6"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-dutchOrange" />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-medium block">
                    {model.number}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-sans text-xl font-semibold text-white group-hover:text-dutchOrange transition-colors">
                    {model.name}
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-400 block pt-0.5">
                    {model.tag}
                  </span>
                </div>

                {/* KaTeX Rendered Mathematical Formula Box */}
                <div className="p-4 rounded-xl bg-[#0b0c0e] border border-zinc-800/60 font-mono text-xs overflow-x-auto min-h-[60px] flex items-center justify-center">
                  <MathFormula formula={model.formula} />
                </div>

                <p className="text-sm text-zinc-300 font-sans leading-relaxed font-light">
                  {model.description}
                </p>

                <div className="space-y-2 pt-3 border-t border-zinc-900 font-sans">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-dutchOrange uppercase font-medium block">
                    Deliverables & Proofs:
                  </span>
                  {model.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                      <span className="text-dutchOrange font-bold">&bull;</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={`/theory/${model.slug}`}
                className="pt-4 border-t border-zinc-900 text-dutchOrange font-sans text-xs font-semibold flex items-center justify-between group-hover:translate-x-1 transition-transform"
              >
                <span className="flex items-center gap-1.5">
                  Read Mathematical Specification
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
