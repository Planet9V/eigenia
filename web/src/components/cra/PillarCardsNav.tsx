"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Scale,
  Clock,
  Database,
  FileText,
  ArrowUpRight
} from "lucide-react";

export interface PillarItem {
  id: number;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  description: string;
}

export const CRA_PILLARS: PillarItem[] = [
  {
    id: 1,
    label: "1. Requirements",
    href: "/cra-hub/requirements",
    icon: Scale,
    tagline: "Statutory Clauses",
    description: "Clause-by-clause Annex I cybersecurity and vulnerability handling requirements."
  },
  {
    id: 2,
    label: "2. Statutory Timeline",
    href: "/cra-hub/timeline",
    icon: Clock,
    tagline: "Enforcement Milestones",
    description: "36-month regulatory calendar, multi-law collisions, and countdown clocks."
  },
  {
    id: 3,
    label: "3. 18-Tool Directory",
    href: "/cra-hub/directory",
    icon: Database,
    tagline: "Evaluated Platforms",
    description: "Commercial and open-source compliance platforms across 5 market segments."
  },
  {
    id: 4,
    label: "4. Deep Guides",
    href: "/cra-hub/guides",
    icon: FileText,
    tagline: "Peer-Reviewed Playbooks",
    description: "In-depth engineering playbooks, Article 14 incident protocols, and OT guidance."
  }
];

interface Props {
  activePillarId?: number;
}

export function PillarCardsNav({ activePillarId }: Props) {
  return (
    <div className="w-full pt-6">
      <div className="flex items-center justify-between pb-3">
        <span className="font-mono text-xs uppercase tracking-wider text-muted font-semibold">
          CRA Conformity Framework // 4 Core Pillars
        </span>
        <span className="font-mono text-[11px] text-muted hidden sm:inline">
          Click to navigate directly to each dedicated pillar
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CRA_PILLARS.map((pillar) => {
          const isActive = pillar.id === activePillarId;
          const Icon = pillar.icon;

          return (
            <Link
              key={pillar.id}
              href={pillar.href}
              className={`group p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                isActive
                  ? "bg-dutchOrange/[0.05] border-dutchOrange/50 shadow-sm ring-1 ring-dutchOrange/20"
                  : "bg-surface/70 border-hairline hover:bg-surface hover:border-dutchOrange/40 hover:shadow-sm"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? "bg-dutchOrange text-white"
                        : "bg-canvas border border-hairline text-primary group-hover:text-dutchOrange group-hover:border-dutchOrange/30"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {isActive ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-dutchOrange/15 text-dutchOrange border border-dutchOrange/30">
                      CURRENT
                    </span>
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-dutchOrange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                </div>

                <h3
                  className={`text-sm font-bold transition-colors ${
                    isActive
                      ? "text-dutchOrange"
                      : "text-primary group-hover:text-dutchOrange"
                  }`}
                >
                  {pillar.label}
                </h3>

                <p className="text-[11px] font-mono text-muted mt-0.5">
                  {pillar.tagline}
                </p>
              </div>

              <p className="text-xs text-secondary leading-snug mt-3 pt-2 border-t border-hairline/60">
                {pillar.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
