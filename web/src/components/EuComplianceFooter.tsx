"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Mail } from "lucide-react";

interface EuComplianceFooterProps {
  onOpenImpressum: () => void;
  onOpenCookies: () => void;
}

export const EuComplianceFooter: React.FC<EuComplianceFooterProps> = ({
  onOpenImpressum,
  onOpenCookies,
}) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-black light:bg-[#FAF8F5] text-zinc-300 light:text-[#3F3F46] border-t border-zinc-900 light:border-[#E8E3DA] font-sans text-xs selection:bg-dutchOrange selection:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12">
          
          {/* Column 1: Brand & Sovereign Mission Statement */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-[0.25em] text-white light:text-[#18181B] uppercase flex items-center gap-2 font-sans">
                E I G E N I A &nbsp; B.V.
                <span className="text-xs font-mono text-dutchOrange font-semibold tracking-normal">
                  NL
                </span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 light:text-[#71717A] uppercase mt-0.5">
                Applied Complexity Science Think Tank & Labs
              </span>
            </div>

            <p className="text-xs text-zinc-300 light:text-[#52525B] leading-relaxed font-light max-w-lg">
              Eigenia B.V. and Eigenia Labs conduct open research into nonlinear dynamics, digital twin models, and physical plant safety to protect energy grids, water systems, and agricultural logistics. Replacing fragile compliance checklists with reproducible mathematical physics, open standards, and catastrophe-calibrated risk models.
            </p>

            <div className="pt-2 font-mono text-[11px] text-zinc-400 light:text-[#52525B] flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-dutchOrange" />
              <span>Direct Board & Research Intake:</span>
              <a href="mailto:jim@eigenia.nl" className="text-dutchOrange font-bold hover:underline">
                jim@eigenia.nl
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-mono text-xs font-bold text-white light:text-[#18181B] uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link href="/mission" className="hover:text-dutchOrange transition-colors">
                  Sovereign Mission
                </Link>
              </li>
              <li>
                <Link href="/tracks" className="hover:text-dutchOrange transition-colors">
                  Research Tracks & Treatises
                </Link>
              </li>
              <li>
                <Link href="/physics" className="hover:text-dutchOrange transition-colors">
                  Applied Physics & Models
                </Link>
              </li>
              <li>
                <Link href="/physics#dexpi" className="hover:text-dutchOrange transition-colors">
                  DEXPI 2.0 + CycloneDX
                </Link>
              </li>
              <li>
                <Link href="/collaborate" className="hover:text-dutchOrange transition-colors">
                  Apply for Briefings
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect & Social Media Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-mono text-xs font-bold text-white light:text-[#18181B] uppercase tracking-wider">
              Connect
            </h3>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <a
                  href="mailto:jim@eigenia.nl"
                  className="hover:text-dutchOrange transition-colors inline-flex items-center gap-1.5 text-dutchOrange font-mono font-medium"
                >
                  <span>jim@eigenia.nl</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/eigenia-b-v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-dutchOrange transition-colors inline-flex items-center gap-1.5"
                >
                  <span>LinkedIn</span>
                  <span className="text-[10px] text-zinc-300 light:text-[#71717A]">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/eigenia_bv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-dutchOrange transition-colors inline-flex items-center gap-1.5"
                >
                  <span>X (Twitter)</span>
                  <span className="text-[10px] text-zinc-300 light:text-[#71717A]">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/eigenia-labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-dutchOrange transition-colors inline-flex items-center gap-1.5"
                >
                  <span>GitHub (Open Science)</span>
                  <span className="text-[10px] text-zinc-300 light:text-[#71717A]">↗</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-zinc-900 light:border-[#E8E3DA] flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-zinc-400 light:text-[#71717A] font-light">
          <div>
            &copy; {new Date().getFullYear()} Eigenia B.V. & Eigenia Labs. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px]">
            <button
              onClick={onOpenImpressum}
              className="hover:text-dutchOrange transition-colors"
            >
              EU Impressum
            </button>
            <button
              onClick={onOpenCookies}
              className="hover:text-dutchOrange transition-colors"
            >
              Cookie Settings
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
