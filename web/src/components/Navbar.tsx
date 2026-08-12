"use client";

import React, { useState } from "react";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tracksOpen, setTracksOpen] = useState(false);
  const [physicsOpen, setPhysicsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-canvas/95 backdrop-blur-md border-b border-hairline transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo - Spaced out E I G E N I A   B. V. */}
          <Link href="/" className="flex flex-col group py-2">
            <span className="font-bold text-sm tracking-[0.25em] text-primary uppercase flex items-center gap-2 group-hover:text-dutchOrange transition-colors">
              E I G E N I A &nbsp; B.V.
              <span className="text-[9px] font-mono text-dutchOrange font-semibold tracking-normal">
                NL
              </span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-muted">
              Applied Complexity Science
            </span>
          </Link>

          {/* Desktop Navigation - 4 Standalone Route Links in Title Case */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-mono text-secondary relative">
            {/* Category 1: Mission Route */}
            <Link
              href="/mission"
              className={`relative py-5 transition-colors ${
                pathname === "/mission" ? "text-dutchOrange font-bold" : "hover:text-dutchOrange"
              }`}
            >
              <span>{t("nav_mission")}</span>
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
                <span>{t("nav_tracks")}</span>
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
                    className="absolute top-full left-0 w-96 bg-surface rounded-2xl shadow-2xl p-4 space-y-1.5 z-50 font-mono text-xs max-h-[460px] overflow-y-auto border border-hairline"
                  >
                    <Link
                      href="/wiki"
                      className="block p-2.5 rounded-xl bg-dutchOrange/10 border border-dutchOrange/30 hover:bg-dutchOrange/20 transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Sovereign Research Wiki Dashboard</span>
                      <span className="text-primary block font-sans text-xs">All 25 Treatises across 8 Working Groups (Sliding TOC)</span>
                    </Link>

                    <Link
                      href="/wiki?wg=WG-01-UI"
                      className="block p-2.5 rounded-xl hover:bg-subtle transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">WG-01 // Actuarial & Underwriting</span>
                      <span className="text-primary block font-sans text-xs">9 Treatises: COPE, Clayton Copulas, War Exclusions</span>
                    </Link>

                    <Link
                      href="/wiki?wg=WG-02-DT"
                      className="block p-2.5 rounded-xl hover:bg-subtle transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">WG-02 // Digital Twin & Taleb Series</span>
                      <span className="text-primary block font-sans text-xs">7 Treatises: Taleb Series I-V, 3.2M Graph Topology</span>
                    </Link>

                    <Link
                      href="/wiki?wg=WG-07-TM"
                      className="block p-2.5 rounded-xl hover:bg-subtle transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">WG-07 // Threat Modeling & TACAM</span>
                      <span className="text-primary block font-sans text-xs">TACAM 7D Matrix & ATQ 12-Factor Scoring</span>
                    </Link>

                    <Link
                      href="/wiki?wg=WG-04-CF"
                      className="block p-2.5 rounded-xl hover:bg-subtle transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">WG-04 // Cascading Failures</span>
                      <span className="text-primary block font-sans text-xs">Death Wobble & Energy Grid Instability</span>
                    </Link>

                    <div className="pt-2 border-t border-hairline text-center">
                      <Link
                        href="/wiki"
                        className="text-[11px] text-dutchOrange font-bold hover:underline block py-1"
                      >
                        Open Sovereign Research Wiki Dashboard (25 Treatises) →
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
                <span>{t("nav_physics")}</span>
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
                    className="absolute top-full left-0 w-96 bg-surface rounded-2xl shadow-2xl p-4 space-y-1.5 z-50 font-mono text-xs max-h-[480px] overflow-y-auto border border-hairline"
                  >
                    <Link
                      href="/theory/aeon-ggnn-gated-graph"
                      className="block p-2 rounded-xl hover:bg-subtle transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Model 01 // GGNN Directed Graph</span>
                      <span className="text-primary block font-sans text-xs">Gated Graph Topology</span>
                    </Link>

                    <Link
                      href="/theory/l0-l1-gap-calculus"
                      className="block p-2 rounded-xl hover:bg-subtle transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Model 02 // L0/L1 Gap Calculus</span>
                      <span className="text-primary block font-sans text-xs">Information Divergence</span>
                    </Link>

                    <Link
                      href="/theory/mckenney-lacan-psychometric-tensor"
                      className="block p-2 rounded-xl hover:bg-subtle transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Model 03 // Psychometric Tensor</span>
                      <span className="text-primary block font-sans text-xs">Lacanian Four Discourses</span>
                    </Link>

                    <Link
                      href="/theory/interaction-hamiltonian"
                      className="block p-2 rounded-xl hover:bg-subtle transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Model 04 // Interaction Hamiltonian</span>
                      <span className="text-primary block font-sans text-xs">Ising Phase Transition</span>
                    </Link>

                    <Link
                      href="/theory/kramers-barrier-escape"
                      className="block p-2 rounded-xl hover:bg-subtle transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Model 05 // Kramers Escape Model</span>
                      <span className="text-primary block font-sans text-xs">MTTC Topological Barrier</span>
                    </Link>

                    <Link
                      href="/theory/sir-compartmental-model"
                      className="block p-2 rounded-xl hover:bg-subtle transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Model 06 // SIR Compartmental</span>
                      <span className="text-primary block font-sans text-xs">Epidemic Contagion R0</span>
                    </Link>

                    <Link
                      href="/theory/clayton-copula-actuarial"
                      className="block p-2 rounded-xl hover:bg-subtle transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Model 07 // Clayton Copula</span>
                      <span className="text-primary block font-sans text-xs">Tail Dependence & ALE</span>
                    </Link>

                    <Link
                      href="/theory/hawkes-self-exciting-process"
                      className="block p-2 rounded-xl hover:bg-subtle transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Model 08 // Hawkes Process</span>
                      <span className="text-primary block font-sans text-xs">Self-Exciting Cascades</span>
                    </Link>

                    <Link
                      href="/theory/pareto-pot-evt-model"
                      className="block p-2 rounded-xl hover:bg-subtle transition-colors"
                    >
                      <span className="text-dutchOrange font-bold block text-[11px]">Model 09 // Pareto POT EVT</span>
                      <span className="text-primary block font-sans text-xs">Black Swan Extreme Values</span>
                    </Link>

                    <div className="pt-2 border-t border-hairline text-center">
                      <Link
                        href="/physics"
                        className="text-[11px] text-dutchOrange font-bold hover:underline block py-1"
                      >
                        {t("nav_view_all_models")}
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
              <span>{t("nav_collaborate")}</span>
              {pathname === "/collaborate" && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-dutchOrange"
                />
              )}
            </Link>
          </div>

          {/* Right Section: Theme Toggle + Language Switcher + Primary CTA */}
          <div className="hidden lg:flex items-center gap-3 text-xs font-mono">
            {/* Sun/Moon Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-surface border border-hairline text-dutchOrange hover:scale-105 transition-all flex items-center justify-center shadow-xs"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-dutchOrange" />
              ) : (
                <Moon className="w-4 h-4 text-dutchOrange" />
              )}
            </button>

            {/* Request Board Briefing Primary CTA Pill Button */}
            <Link
              href="/collaborate"
              className="px-4 py-2 rounded-xl bg-dutchOrange hover:bg-dutchOrange/90 text-white font-sans text-xs font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              {t("nav_request_briefing")}
            </Link>

            {/* Language Selector */}
            <div className="flex items-center gap-0.5 bg-subtle p-1 rounded-xl border border-hairline">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                  language === "en"
                    ? "bg-dutchOrange text-white font-bold shadow-xs"
                    : "text-muted hover:text-primary"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("nl")}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                  language === "nl"
                    ? "bg-dutchOrange text-white font-bold shadow-xs"
                    : "text-muted hover:text-primary"
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
              className="p-2 rounded-xl bg-surface text-dutchOrange border border-hairline"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-surface text-secondary hover:text-primary border border-hairline"
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
            className="lg:hidden bg-canvas font-sans text-xs p-6 space-y-4 shadow-2xl border-b border-hairline"
          >
            <Link
              href="/mission"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-primary font-medium hover:text-dutchOrange"
            >
              {t("nav_mission")}
            </Link>

            <Link
              href="/tracks"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-primary font-medium hover:text-dutchOrange"
            >
              {t("nav_tracks")}
            </Link>

            <Link
              href="/physics"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-primary font-medium hover:text-dutchOrange"
            >
              {t("nav_physics")}
            </Link>

            <Link
              href="/collaborate"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-primary font-medium hover:text-dutchOrange"
            >
              {t("nav_collaborate")}
            </Link>

            <div className="pt-4 border-t border-hairline flex justify-between items-center font-mono">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium ${language === "en" ? "bg-dutchOrange text-white font-bold" : "text-muted"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("nl")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium ${language === "nl" ? "bg-dutchOrange text-white font-bold" : "text-muted"}`}
                >
                  NL
                </button>
              </div>

              <button
                onClick={toggleTheme}
                className="px-3 py-1.5 rounded-lg bg-subtle text-dutchOrange text-xs font-semibold flex items-center gap-1.5 border border-hairline"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
