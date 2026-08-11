"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Mail } from "lucide-react";

interface EuComplianceFooterProps {
  onOpenImpressum?: () => void;
  onOpenCookies?: () => void;
}

export const EuComplianceFooter: React.FC<EuComplianceFooterProps> = ({
  onOpenImpressum,
  onOpenCookies,
}) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-canvas text-secondary border-t border-hairline font-sans text-xs selection:bg-dutchOrange selection:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12">
          {/* Column 1: Brand & Sovereign Mission Statement */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-[0.25em] text-primary uppercase flex items-center gap-2 font-sans">
                E I G E N I A &nbsp; B.V.
                <span className="text-xs font-mono text-dutchOrange font-semibold tracking-normal">
                  NL
                </span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-muted uppercase mt-0.5">
                Applied Complexity Science Think Tank & Labs
              </span>
            </div>

            <p className="text-xs text-secondary leading-relaxed font-light max-w-lg">
              Eigenia B.V. and Eigenia Labs conduct open research into nonlinear dynamics, digital twin models, and physical plant safety to protect energy grids, water systems, and agricultural logistics. Replacing fragile compliance checklists with reproducible mathematical physics, open standards, and catastrophe-calibrated risk models.
            </p>

            <div className="pt-2 font-mono text-[11px] text-muted flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-dutchOrange" />
              <span>Direct Board & Research Intake:</span>
              <a href="mailto:jim@eigenia.nl" className="text-dutchOrange font-bold hover:underline">
                jim@eigenia.nl
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-mono text-xs font-bold text-primary uppercase tracking-wider">
              {t("nav_tracks")}
            </h3>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link href="/mission" className="hover:text-dutchOrange transition-colors">
                  {t("nav_mission")}
                </Link>
              </li>
              <li>
                <Link href="/tracks" className="hover:text-dutchOrange transition-colors">
                  {t("nav_tracks")}
                </Link>
              </li>
              <li>
                <Link href="/physics" className="hover:text-dutchOrange transition-colors">
                  {t("nav_physics")}
                </Link>
              </li>
              <li>
                <Link href="/collaborate" className="hover:text-dutchOrange transition-colors">
                  {t("nav_collaborate")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate & Legal Information */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-mono text-xs font-bold text-primary uppercase tracking-wider">
              Legal & EU Compliance
            </h3>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <button
                  type="button"
                  onClick={onOpenImpressum}
                  className="hover:text-dutchOrange transition-colors text-left"
                >
                  Legal Impressum (Art. 5 DSA)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCookies}
                  className="hover:text-dutchOrange transition-colors text-left"
                >
                  Privacy & Cookie Preferences
                </button>
              </li>
              <li className="pt-2 font-mono text-[10px] text-muted">
                KVK (Dutch Chamber): Registered B.V.
              </li>
              <li className="font-mono text-[10px] text-muted">
                Jurisdiction: Kingdom of the Netherlands / EU
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & NIS2 Notice */}
        <div className="border-t border-hairline pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-muted">
          <div>
            &copy; {new Date().getFullYear()} Eigenia B.V. & Eigenia Labs. {t("footer_rights")}
          </div>
          <div className="flex items-center gap-4">
            <span>NIS2 / CER Compliant Policy</span>
            <span className="text-dutchOrange font-bold">&bull;</span>
            <span>Open Science Research</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
