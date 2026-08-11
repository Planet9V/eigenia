"use client";

import React, { useState } from "react";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  onOpenImpressum?: () => void;
  onOpenCookies?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tracksOpen, setTracksOpen] = useState(false);
  const [physicsOpen, setPhysicsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0b0c0e]/95 dark:bg-[#0b0c0e]/95 light:bg-[#FAF8F5]/95 backdrop-blur-md border-b border-zinc-900 light:border-[#E8E3DA] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo - Spaced out E I G E N I A   B. V. */}
          <Link href="/" className="flex flex-col group py-2">
            <span className="font-bold text-sm tracking-[0.25em] text-white light:text-[#18181B] uppercase flex items-center gap-2 group-hover:text-dutchOrange transition-colors">
              E I G E N I A &nbsp; B.V.
              <span className="text-[9px] font-mono text-dutchOrange font-semibold tracking-normal">
                NL
              </span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-zinc-400 light:text-[#71717A]">
              Applied Complexity Science
            </span>
          </Link>

          {/* Desktop Navigation - 4 Standalone Route Links in Title Case */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-mono text-zinc-300 light:text-[#3F3F46] relative">
            
            {/* Category 1: Mission Route */}
            <Link
              href="/mission"
              className={`relative py-5 transition-colors ${
                pathname === "/mission" ? "text-dutchOrange font-bold" : "hover:text-dutchOrange"
              }`}
            >
              <span>Mission</span>
              {pathname === "/mission" && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-dutchOrange"
                />
              )}
            </Link>

            {/* Category 2: Research Tracks Dropdown */}
            <div
              className="relative py-5 cursor-pointer"
              onMouseEnter={() => setTracksOpen(true)}
              onMouseLeave={() => setTracksOpen(false)}
            >
              <Link
                href="/tracks"
                className={`flex items-center gap-1 transition-colors ${
                  pathname?.startsWith("/tracks") || pathname?.startsWith("/papers")
                    ? "text-dutchOrange font-bold"
                    : "hover:text-dutchOrange"
                }`}
              >
                <span>Research Tracks</span>
                <ChevronDown className="w-3.5 h-3.5 text-dutchOrange" />
              </Link>

              {pathname?.startsWith("/tracks") && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-dutchOrange"
                />
              )}

              {/* Research Tracks Submenu Dropdown */}
              <AnimatePresence>
                {tracksOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-96 bg-zinc-950 light:bg-white rounded-2xl shadow-2xl p-4 space-y-1.5 z-50 font-mono text-xs max-h-[460px] overflow-y-auto border border-zinc-900 light:border-[#E8E3DA]"
                  >
                    <Link
                      href="/papers/taleb-fooled-by-randomness"
                      className="block p-2.5 rounded-xl hover:bg-zinc-900 light:hover:bg-[#F4F0E8] transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Track 1 // Probabilistic Risk</span>
                      <span className="text-white light:text-[#18181B] block font-sans text-xs">Taleb 5-Paper Series</span>
                    </Link>

                    <Link
                      href="/physics#dexpi"
                      className="block p-2.5 rounded-xl hover:bg-zinc-900 light:hover:bg-[#F4F0E8] transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Track 2 // Cyber-Physical Standards</span>
                      <span className="text-white light:text-[#18181B] block font-sans text-xs">DEXPI 2.0 & CycloneDX 4-BOM</span>
                    </Link>

                    <Link
                      href="/papers/4-underwriter-cyber-risk-underwriting"
                      className="block p-2.5 rounded-xl hover:bg-zinc-900 light:hover:bg-[#F4F0E8] transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Track 3 // Actuarial Re-Invention</span>
                      <span className="text-white light:text-[#18181B] block font-sans text-xs">11 Treatises: COPE, Paradigm, Lacan & Kramers</span>
                    </Link>

                    <Link
                      href="/papers/tacam-deep-dive"
                      className="block p-2.5 rounded-xl hover:bg-zinc-900 light:hover:bg-[#F4F0E8] transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Track 4 // TACAM Matrix</span>
                      <span className="text-white light:text-[#18181B] block font-sans text-xs">7D Threat Actor Matrix (77,279 Points)</span>
                    </Link>

                    <Link
                      href="/papers/atq-deep-dive"
                      className="block p-2.5 rounded-xl hover:bg-zinc-900 light:hover:bg-[#F4F0E8] transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Track 5 // Threat Scoring</span>
                      <span className="text-white light:text-[#18181B] block font-sans text-xs">Adversary Threat Quotient (ATQ) 12-Factor</span>
                    </Link>

                    <Link
                      href="/papers/monte-carlo-engine"
                      className="block p-2.5 rounded-xl hover:bg-zinc-900 light:hover:bg-[#F4F0E8] transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Track 6 // Monte Carlo Engine</span>
                      <span className="text-white light:text-[#18181B] block font-sans text-xs">Importance BFS & Softmax Walk</span>
                    </Link>

                    <Link
                      href="/papers/death-wobble-frequency-instability"
                      className="block p-2.5 rounded-xl hover:bg-zinc-900 light:hover:bg-[#F4F0E8] transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Track 7 // Cascading Failures</span>
                      <span className="text-white light:text-[#18181B] block font-sans text-xs">Death Wobble & Grid Pulse Instability</span>
                    </Link>

                    <div className="pt-2 border-t border-zinc-900 light:border-[#E8E3DA] text-center">
                      <Link
                        href="/tracks"
                        className="text-[11px] text-dutchOrange font-bold hover:underline block py-1"
                      >
                        View All 7 Research Tracks →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Category 3: Applied Physics Frameworks Dropdown */}
            <div
              className="relative py-5 cursor-pointer"
              onMouseEnter={() => setPhysicsOpen(true)}
              onMouseLeave={() => setPhysicsOpen(false)}
            >
              <Link
                href="/physics"
                className={`flex items-center gap-1 transition-colors ${
                  pathname?.startsWith("/physics") || pathname?.startsWith("/theory")
                    ? "text-dutchOrange font-bold"
                    : "hover:text-dutchOrange"
                }`}
              >
                <span>Applied Physics</span>
                <ChevronDown className="w-3.5 h-3.5 text-dutchOrange" />
              </Link>

              {pathname?.startsWith("/physics") && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-dutchOrange"
                />
              )}

              {/* Applied Physics Submenu Dropdown */}
              <AnimatePresence>
                {physicsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-96 bg-zinc-950 light:bg-white rounded-2xl shadow-2xl p-4 space-y-1.5 z-50 font-mono text-xs max-h-[480px] overflow-y-auto border border-zinc-900 light:border-[#E8E3DA]"
                  >
                    <Link
                      href="/theory/aeon-ggnn-gated-graph"
                      className="block p-2 rounded-xl hover:bg-zinc-900 light:hover:bg-[#F4F0E8] transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Model 01 // GGNN Directed Graph</span>
                      <span className="text-white light:text-[#18181B] block font-sans text-xs">Gated Graph Topology</span>
                    </Link>

                    <Link
                      href="/theory/l0-l1-gap-calculus"
                      className="block p-2 rounded-xl hover:bg-zinc-900 light:hover:bg-[#F4F0E8] transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Model 02 // L0/L1 Gap Calculus</span>
                      <span className="text-white light:text-[#18181B] block font-sans text-xs">Information Divergence</span>
                    </Link>

                    <Link
                      href="/theory/mckenney-lacan-psychometric-tensor"
                      className="block p-2 rounded-xl hover:bg-zinc-900 light:hover:bg-[#F4F0E8] transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Model 03 // Psychometric Tensor</span>
                      <span className="text-white light:text-[#18181B] block font-sans text-xs">Lacanian Four Discourses</span>
                    </Link>

                    <Link
                      href="/theory/interaction-hamiltonian"
                      className="block p-2 rounded-xl hover:bg-zinc-900 light:hover:bg-[#F4F0E8] transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Model 04 // Interaction Hamiltonian</span>
                      <span className="text-white light:text-[#18181B] block font-sans text-xs">Ising Phase Transition</span>
                    </Link>

                    <Link
                      href="/theory/kramers-barrier-escape"
                      className="block p-2 rounded-xl hover:bg-zinc-900 light:hover:bg-[#F4F0E8] transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Model 05 // Kramers Escape Model</span>
                      <span className="text-white light:text-[#18181B] block font-sans text-xs">MTTC Topological Barrier</span>
                    </Link>

                    <Link
                      href="/theory/sir-compartmental-model"
                      className="block p-2 rounded-xl hover:bg-zinc-900 light:hover:bg-[#F4F0E8] transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Model 06 // SIR Compartmental</span>
                      <span className="text-white light:text-[#18181B] block font-sans text-xs">Epidemic Contagion R0</span>
                    </Link>

                    <Link
                      href="/theory/clayton-copula-actuarial"
                      className="block p-2 rounded-xl hover:bg-zinc-900 light:hover:bg-[#F4F0E8] transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Model 07 // Clayton Copula</span>
                      <span className="text-white light:text-[#18181B] block font-sans text-xs">Tail Dependence & ALE</span>
                    </Link>

                    <Link
                      href="/theory/hawkes-self-exciting-process"
                      className="block p-2 rounded-xl hover:bg-zinc-900 light:hover:bg-[#F4F0E8] transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Model 08 // Hawkes Process</span>
                      <span className="text-white light:text-[#18181B] block font-sans text-xs">Self-Exciting Cascades</span>
                    </Link>

                    <Link
                      href="/theory/pareto-pot-evt-model"
                      className="block p-2 rounded-xl hover:bg-zinc-900 light:hover:bg-[#F4F0E8] transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Model 09 // Pareto POT EVT</span>
                      <span className="text-white light:text-[#18181B] block font-sans text-xs">Black Swan Extreme Values</span>
                    </Link>

                    <div className="pt-2 border-t border-zinc-900 light:border-[#E8E3DA] text-center">
                      <Link
                        href="/physics"
                        className="text-[11px] text-dutchOrange font-bold hover:underline block py-1"
                      >
                        View All Applied Physics Models →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Category 4: Collaborate Route */}
            <Link
              href="/collaborate"
              className={`relative py-5 transition-colors ${
                pathname === "/collaborate" ? "text-dutchOrange font-bold" : "hover:text-dutchOrange"
              }`}
            >
              <span>Collaborate</span>
              {pathname === "/collaborate" && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-dutchOrange"
                />
              )}
            </Link>

          </div>

          {/* Right Section: Language Switcher + Primary CTA */}
          <div className="hidden lg:flex items-center gap-3 text-xs font-mono">

            {/* Request Board Briefing Primary CTA Pill Button (OXOT Reference Style) */}
            <Link
              href="/collaborate"
              className="px-4 py-2 rounded-xl bg-dutchOrange hover:bg-dutchOrange/90 text-white font-sans text-xs font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Request Briefing
            </Link>

            {/* Language Selector (EN / NL font size perfectly matching navbar text-xs) */}
            <div className="flex items-center gap-0.5 bg-zinc-950 light:bg-[#EBE5DC] p-1 rounded-xl border border-zinc-800 light:border-[#E0D5C5]">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                  language === "en"
                    ? "bg-dutchOrange light:bg-[#E0D5C5] text-white light:text-[#18181B] font-bold shadow-xs"
                    : "text-zinc-400 light:text-[#71717A] hover:text-white light:hover:text-[#18181B]"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("nl")}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                  language === "nl"
                    ? "bg-dutchOrange light:bg-[#E0D5C5] text-white light:text-[#18181B] font-bold shadow-xs"
                    : "text-zinc-400 light:text-[#71717A] hover:text-white light:hover:text-[#18181B]"
                }`}
              >
                NL
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-zinc-950 light:bg-white text-dutchOrange border border-zinc-800 light:border-[#E8E3DA]"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-zinc-950 light:bg-white text-zinc-300 light:text-[#18181B] hover:text-white border border-zinc-800 light:border-[#E8E3DA]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-dutchOrange" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black light:bg-[#FAF8F5] font-sans text-xs p-6 space-y-4 shadow-2xl border-b border-zinc-900 light:border-[#E8E3DA]"
          >
            <Link
              href="/mission"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-white light:text-[#18181B] font-medium hover:text-dutchOrange"
            >
              Mission
            </Link>

            <Link
              href="/tracks"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-white light:text-[#18181B] font-medium hover:text-dutchOrange"
            >
              Research Tracks
            </Link>

            <Link
              href="/physics"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-white light:text-[#18181B] font-medium hover:text-dutchOrange"
            >
              Applied Physics
            </Link>

            <Link
              href="/collaborate"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-white light:text-[#18181B] font-medium hover:text-dutchOrange"
            >
              Collaborate
            </Link>

            <div className="pt-4 border-t border-zinc-900 light:border-[#E8E3DA] flex justify-between items-center font-mono">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium ${language === "en" ? "bg-dutchOrange light:bg-[#E0D5C5] text-white light:text-[#18181B] font-bold" : "text-zinc-400 light:text-[#71717A]"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("nl")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium ${language === "nl" ? "bg-dutchOrange light:bg-[#E0D5C5] text-white light:text-[#18181B] font-bold" : "text-zinc-400 light:text-[#71717A]"}`}
                >
                  NL
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
