"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Scale,
  Clock,
  Database,
  FileText,
  ArrowRight
} from "lucide-react";

interface PillarItem {
  id: number;
  label: string;
  shortTitle: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
}

const PILLARS: PillarItem[] = [
  {
    id: 1,
    label: "1. Hub Overview",
    shortTitle: "Overview",
    href: "/cra-hub",
    icon: ShieldCheck,
    tagline: "Architecture & Corridors"
  },
  {
    id: 2,
    label: "2. Requirements",
    shortTitle: "Requirements",
    href: "/cra-hub/requirements",
    icon: Scale,
    tagline: "Statutory Clauses"
  },
  {
    id: 3,
    label: "3. Timeline",
    shortTitle: "Timeline",
    href: "/cra-hub/timeline",
    icon: Clock,
    tagline: "Enforcement Milestones"
  },
  {
    id: 4,
    label: "4. 18-Tool Directory",
    shortTitle: "Directory",
    href: "/cra-hub/directory",
    icon: Database,
    tagline: "Evaluated Platforms"
  },
  {
    id: 5,
    label: "5. Deep Guides",
    shortTitle: "Guides",
    href: "/cra-hub/guides",
    icon: FileText,
    tagline: "Peer-Reviewed Playbooks"
  }
];

interface Props {
  activePillarId?: number;
}

export function PillarInteractiveNav({ activePillarId = 1 }: Props) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [autoStep, setAutoStep] = useState<number>(activePillarId);
  const [isUserHovering, setIsUserHovering] = useState<boolean>(false);

  // Subtle periodic courier sweep when idle to guide the user's eye across the compliance arc
  useEffect(() => {
    if (isUserHovering) return;

    const interval = setInterval(() => {
      setAutoStep((prev) => (prev % PILLARS.length) + 1);
    }, 4500);

    return () => clearInterval(interval);
  }, [isUserHovering]);

  const currentFocusId = hoveredId ?? autoStep;

  return (
    <div 
      className="relative w-full pt-4 select-none"
      onMouseEnter={() => setIsUserHovering(true)}
      onMouseLeave={() => {
        setIsUserHovering(false);
        setHoveredId(null);
      }}
    >
      {/* Visual Header / Micro-Indicator */}
      <div className="flex items-center justify-between pb-2 font-mono text-[11px] text-muted">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-dutchOrange animate-pulse" />
          <span className="uppercase tracking-wider font-semibold text-primary">
            CRA Conformity Framework Arc
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-secondary">
          <span>Explore 5 Pillars</span>
          <ArrowRight className="w-3 h-3 text-dutchOrange animate-pulse" />
        </div>
      </div>

      {/* Interactive Pillars Rail */}
      <div className="relative grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 rounded-2xl bg-surface/80 border border-hairline shadow-sm backdrop-blur-md">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          const isActive = pillar.id === activePillarId;
          const isFocused = pillar.id === currentFocusId;

          return (
            <Link
              key={pillar.id}
              href={pillar.href}
              onMouseEnter={() => setHoveredId(pillar.id)}
              className={`group relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 text-center ${
                pillar.id === 5 ? "col-span-2 sm:col-span-1" : ""
              } ${
                isActive 
                  ? "text-dutchOrange font-bold" 
                  : "text-primary hover:text-dutchOrange"
              }`}
            >
              {/* Dynamic Traveling Highlight Beam */}
              {isFocused && (
                <motion.div
                  layoutId="activePillarBeam"
                  className="absolute inset-0 rounded-xl bg-dutchOrange/10 border border-dutchOrange/40 shadow-[0_0_16px_rgba(224,90,16,0.18)]"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30
                  }}
                />
              )}

              {/* Courier Arrow Head (Gliding along active pillar top edge) */}
              {isFocused && (
                <motion.div
                  layoutId="courierArrow"
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 28
                  }}
                >
                  <div className="w-2.5 h-2.5 bg-dutchOrange rotate-45 border-t border-l border-white/40 shadow-xs" />
                </motion.div>
              )}

              <div className="relative z-10 flex flex-col items-center gap-1">
                <motion.div
                  animate={{
                    scale: isFocused ? 1.12 : 1,
                    rotate: isFocused && isUserHovering ? 5 : 0
                  }}
                  transition={{ duration: 0.2 }}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isActive || isFocused
                      ? "bg-dutchOrange/15 text-dutchOrange"
                      : "bg-canvas text-secondary group-hover:text-dutchOrange"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </motion.div>

                <div className="flex flex-col items-center">
                  <span className="font-mono text-xs font-semibold tracking-tight">
                    {pillar.label}
                  </span>
                  <span className="text-[10px] text-secondary/70 font-sans hidden sm:block truncate max-w-[120px]">
                    {pillar.tagline}
                  </span>
                </div>
              </div>

              {/* Bottom Micro Status Bar */}
              <div className="mt-1.5 h-[2px] w-8 rounded-full bg-hairline relative overflow-hidden">
                {isFocused && (
                  <motion.div
                    layoutId="pillarProgressLine"
                    className="absolute inset-0 bg-dutchOrange"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
