"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  geoOrthographic,
  geoPath,
  geoGraticule10,
  geoInterpolate
} from "d3-geo";
import { feature } from "topojson-client";
import {
  Clock,
  ArrowRight,
  RotateCw,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Scale,
  Compass,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

interface MilestoneCardData {
  id: string;
  date: string;
  badge: string;
  badgeType: "active" | "collision" | "deadline";
  leadTime: string;
  title: string;
  citation: string;
  summary: string;
  highlights: string[];
  mandatoryActions: string[];
  penalties: string;
  guideLink?: { label: string; href: string };
}

const STATUTORY_MILESTONES: MilestoneCardData[] = [
  {
    id: "enisa-srp",
    date: "September 11, 2026",
    badge: "ACTIVE LAW TODAY",
    badgeType: "active",
    leadTime: "ACTIVE TODAY",
    title: "Article 14 ENISA SRP 24h Early Warning",
    citation: "Regulation (EU) 2024/2847, Article 14(1) & (2)",
    summary:
      "Statutory mandatory 24-hour early warning notice to ENISA Single Reporting Platform and national CSIRTs upon discovering an actively exploited vulnerability.",
    highlights: [
      "24h Early Warning to ENISA & CSIRTs",
      "72h Technical Dossier with CVSS & telemetry",
      "14-Day Corrective Action & patch report"
    ],
    mandatoryActions: [
      "Provision authentication credentials for ENISA Single Reporting Platform (SRP)",
      "Establish 24/7 security incident triage team for immediate triage escalation",
      "Pre-authorize Article 14 communication templates with legal and engineering teams",
      "Appoint official EU Authorised Representative (Article 11) for non-EU entities"
    ],
    penalties: "Administrative fines up to €15,000,000 or 2.5% of total annual worldwide turnover.",
    guideLink: {
      label: "Read Article 14 Playbook",
      href: "/cra-hub/guides/article-14-playbook"
    }
  },
  {
    id: "machinery-cyber",
    date: "January 20, 2027",
    badge: "UPCOMING COLLISION",
    badgeType: "collision",
    leadTime: "T-4 MONTHS",
    title: "Machinery Regulation Cyber Mandate",
    citation: "Regulation (EU) 2023/1230, Annex III § 1.1.9",
    summary:
      "Horizontal machinery safety regulation requiring all industrial machines with digital interfaces to resist cyber corruption 11 months before full CRA application.",
    highlights: [
      "Hardware/software safety connection integrity",
      "Protection against physical hazard corruption",
      "EN ISO 13849 & IEC 62061 loop validation"
    ],
    mandatoryActions: [
      "Audit industrial Ethernet and wireless communication channels against spoofing",
      "Validate safety control circuits cannot be corrupted by external network inputs",
      "Compile machinery technical files incorporating empirical cyber risk assessments",
      "Bridge OT field engineers with IT security governance teams"
    ],
    penalties: "Stop-sale orders, mandatory EU-wide product recalls, and customs impoundment.",
    guideLink: {
      label: "Read Industrial OT Guide",
      href: "/cra-hub/guides/industrial-ot"
    }
  },
  {
    id: "full-cra",
    date: "December 11, 2027",
    badge: "STATUTORY DEADLINE",
    badgeType: "deadline",
    leadTime: "T-15 MONTHS",
    title: "Full CRA Application & CE Marking",
    citation: "Regulation (EU) 2024/2847, Articles 10, 13, 24 & Annex I",
    summary:
      "100% of Products with Digital Elements (PDE) placed on the EU Single Market must comply with Annex I, hold an Annex VII technical file, and bear the CE mark.",
    highlights: [
      "Mandatory CE Mark on hardware and digital PDE",
      "Machine-readable CycloneDX SBOM generation",
      "10-Year technical file archival repository"
    ],
    mandatoryActions: [
      "Sign formal EU Declaration of Conformity (EU DoC) under internal Module A control",
      "Complete third-party Notified Body conformity audits for Important Class I & II PDE",
      "Deploy statutory Coordinated Vulnerability Disclosure (CVD) and security.txt",
      "Implement automated, free-of-charge security patches for the expected product lifetime"
    ],
    penalties: "Total commercial distribution ban across all 27 EU member states plus €15M fines.",
    guideLink: {
      label: "Full 36-Month Timeline",
      href: "/cra-hub/timeline"
    }
  }
];

// Corridor definitions for the compact 3D globe
interface TradeCorridor {
  name: string;
  from: string;
  to: string;
  coordsFrom: [number, number]; // [lon, lat]
  coordsTo: [number, number];
  color: string;
}

const TRADE_CORRIDORS: TradeCorridor[] = [
  {
    name: "Transatlantic Bridge",
    from: "USA",
    to: "EU",
    coordsFrom: [-77.0369, 38.9072],
    coordsTo: [4.3517, 50.8503],
    color: "#38bdf8"
  },
  {
    name: "PSTI Alignment",
    from: "UK",
    to: "EU",
    coordsFrom: [-0.1276, 51.5074],
    coordsTo: [13.405, 52.52],
    color: "#34d399"
  },
  {
    name: "APAC Tech Corridor",
    from: "SG/JP",
    to: "EU",
    coordsFrom: [103.8198, 1.3521],
    coordsTo: [2.3522, 48.8566],
    color: "#c084fc"
  }
];

export function StatutoryTimelineSection() {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [worldData, setWorldData] = useState<any>(null);
  const rotationRef = useRef<[number, number]>([-15, -30]);
  const animationFrameRef = useRef<number | null>(null);

  // Toggle single card flip
  const toggleCard = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Fetch world topography for compact 3D globe preview
  useEffect(() => {
    fetch("/data/world-110m.json")
      .then((res) => res.json())
      .then((topo) => {
        const countries = feature(topo, topo.objects.countries);
        setWorldData(countries);
      })
      .catch((err) => {
        console.warn("Could not load world topography for compact globe preview", err);
      });
  }, []);

  // Render loop for compact tasteful globe preview (200px x 200px)
  const drawCompactGlobe = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const radius = width * 0.44;

    ctx.clearRect(0, 0, width, height);

    // Gently advance rotation
    rotationRef.current[0] += 0.35;
    const [yaw, pitch] = rotationRef.current;

    const projection = geoOrthographic()
      .scale(radius)
      .translate([width / 2, height / 2])
      .rotate([yaw, pitch, 0])
      .clipAngle(90);

    const path = geoPath(projection, ctx);

    // 1. Globe Sphere Base
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0a0c10";
    ctx.fill();

    // 2. Graticule lines (subtle latitude/longitude grid)
    ctx.beginPath();
    path(geoGraticule10());
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // 3. Landmasses
    if (worldData) {
      ctx.beginPath();
      path(worldData);
      ctx.fillStyle = "#22262d";
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // 4. Trade corridor arcs with photon pulses
    const now = Date.now() / 1000;
    TRADE_CORRIDORS.forEach((corridor, idx) => {
      const interpolator = geoInterpolate(corridor.coordsFrom, corridor.coordsTo);
      const points: [number, number][] = [];
      const steps = 30;
      for (let s = 0; s <= steps; s++) {
        points.push(interpolator(s / steps));
      }

      const lineString = {
        type: "LineString" as const,
        coordinates: points
      };

      // Arc base
      ctx.beginPath();
      path(lineString);
      ctx.strokeStyle = corridor.color;
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Traveling photon
      const photonT = (now * 0.4 + idx * 0.33) % 1;
      const photonCoord = interpolator(photonT);
      const projected = projection(photonCoord);
      if (projected) {
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(projected[0], projected[1], 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }
    });

    ctx.globalAlpha = 1.0;

    // 5. Outer atmospheric rim glow
    const rimGradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      radius * 0.85,
      width / 2,
      height / 2,
      radius * 1.04
    );
    rimGradient.addColorStop(0, "rgba(255, 102, 0, 0)");
    rimGradient.addColorStop(0.8, "rgba(255, 102, 0, 0.15)");
    rimGradient.addColorStop(1, "rgba(255, 102, 0, 0.4)");

    ctx.beginPath();
    ctx.arc(width / 2, height / 2, radius * 1.02, 0, Math.PI * 2);
    ctx.strokeStyle = rimGradient;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    animationFrameRef.current = requestAnimationFrame(drawCompactGlobe);
  }, [worldData]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(drawCompactGlobe);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [drawCompactGlobe]);

  return (
    <section className="py-14 bg-[#0A0C0E] text-white border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-dutchOrange/10 border border-dutchOrange/30 text-dutchOrange text-xs font-mono font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Statutory Compliance Architecture // Pillar 3 & Global Scope</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Statutory Enforcement Milestones & Extraterritorial Reach
            </h2>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Chronological roadmap of binding compliance gates under Regulation (EU) 2024/2847. 
              Click any card to flip and inspect mandatory engineering actions, statutory deliverables, and penalty frameworks.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <Link
              href="/cra-hub/timeline"
              className="text-dutchOrange hover:text-white transition-colors font-bold inline-flex items-center gap-1.5"
            >
              <span>View Full 36-Month Timeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Dual-Column Layout: Left (7 cols) Interactive Timeline Cards | Right (5 cols) Compact 3D Globe Teaser */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Milestone Cards (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between font-mono text-xs text-white/50 pb-1">
              <span>Binding Statutory Gates (Click card to flip details)</span>
              <span>3 Primary Deadlines</span>
            </div>

            <div className="space-y-4">
              {STATUTORY_MILESTONES.map((m) => {
                const isFlipped = !!flippedCards[m.id];

                return (
                  <div
                    key={m.id}
                    onClick={() => toggleCard(m.id)}
                    className="relative cursor-pointer select-none perspective group"
                    style={{ perspective: "1200px" }}
                  >
                    <motion.div
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="relative rounded-2xl"
                    >
                      {/* FRONT OF CARD (Overview & Highlights) */}
                      <div
                        style={{ backfaceVisibility: "hidden" }}
                        className={`p-5 rounded-2xl border transition-all ${
                          m.badgeType === "active"
                            ? "bg-[#14171c] border-red-500/40 hover:border-red-500/70 shadow-sm"
                            : m.badgeType === "collision"
                            ? "bg-[#14171c] border-dutchOrange/40 hover:border-dutchOrange/70 shadow-sm"
                            : "bg-[#14171c] border-white/10 hover:border-white/30 shadow-sm"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                  m.badgeType === "active"
                                    ? "bg-red-500 text-white"
                                    : m.badgeType === "collision"
                                    ? "bg-dutchOrange/20 text-dutchOrange border border-dutchOrange/30"
                                    : "bg-white/10 text-white/90 border border-white/15"
                                }`}
                              >
                                {m.badge}
                              </span>
                              <span className="font-mono text-xs text-white/90 font-bold">
                                {m.date}
                              </span>
                            </div>

                            <h3 className="text-base font-bold text-white group-hover:text-dutchOrange transition-colors pt-1">
                              {m.title}
                            </h3>
                            <p className="font-mono text-[11px] text-white/50">
                              {m.citation}
                            </p>
                          </div>

                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <span
                              className={`text-[10px] font-mono font-bold ${
                                m.badgeType === "active"
                                  ? "text-red-400"
                                  : m.badgeType === "collision"
                                  ? "text-dutchOrange"
                                  : "text-white/60"
                              }`}
                            >
                              {m.leadTime}
                            </span>
                            <span className="text-[10px] font-mono text-white/40 group-hover:text-dutchOrange inline-flex items-center gap-1 transition-colors">
                              <span>Flip Details</span>
                              <RotateCw className="w-2.5 h-2.5" />
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-white/70 leading-relaxed mt-3 pt-2 border-t border-white/10">
                          {m.summary}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-3 pt-2">
                          {m.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-mono text-white/80"
                            >
                              ✓ {h}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* BACK OF CARD (Flipped: Deep Mandatory Actions & Penalties) */}
                      <div
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)"
                        }}
                        className="absolute inset-0 p-5 rounded-2xl bg-[#171b22] border border-dutchOrange/50 shadow-md flex flex-col justify-between overflow-y-auto"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between border-b border-white/10 pb-2">
                            <div>
                              <span className="font-mono text-[10px] text-dutchOrange font-bold uppercase tracking-wider">
                                Statutory Deliverables & Legal Dossier
                              </span>
                              <h4 className="text-sm font-bold text-white">
                                {m.title}
                              </h4>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCard(m.id);
                              }}
                              className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[10px] font-mono text-white flex items-center gap-1 transition-colors"
                            >
                              <span>Return</span>
                              <RotateCcw className="w-2.5 h-2.5" />
                            </button>
                          </div>

                          <div className="space-y-1.5">
                            <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider block">
                              Mandatory Engineering Requirements:
                            </span>
                            <ul className="space-y-1">
                              {m.mandatoryActions.map((act, idx) => (
                                <li
                                  key={idx}
                                  className="text-xs text-white/85 flex items-start gap-1.5 leading-snug"
                                >
                                  <span className="text-dutchOrange font-bold">•</span>
                                  <span>{act}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="pt-3 mt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono">
                          <div className="text-red-400 font-semibold flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            <span className="line-clamp-1">{m.penalties}</span>
                          </div>

                          {m.guideLink && (
                            <Link
                              href={m.guideLink.href}
                              onClick={(e) => e.stopPropagation()}
                              className="text-dutchOrange hover:underline font-bold inline-flex items-center gap-1 shrink-0"
                            >
                              <span>{m.guideLink.label}</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Compact, Tasteful 3D Globe Teaser (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-5 rounded-2xl bg-[#111317] border border-white/10 hover:border-dutchOrange/40 transition-colors flex flex-col justify-between group shadow-sm space-y-4">
              {/* Header */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/5 border border-white/10 text-dutchOrange uppercase tracking-wider">
                    Extraterritorial Scope
                  </span>
                  <span className="text-[11px] font-mono text-white/50">
                    Art. 11 & 13
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-dutchOrange transition-colors">
                  249 Sovereign Jurisdictions & Bilateral Trade Corridors
                </h3>

                <p className="text-xs text-white/70 leading-relaxed">
                  Non-EU manufacturers exporting to the EU must comply with binding cybersecurity baselines and appoint an EU Authorised Representative.
                </p>
              </div>

              {/* Compact 3D Globe Canvas (Tasteful & Small) */}
              <div className="relative w-full py-2 flex flex-col items-center justify-center">
                <div className="relative w-[210px] h-[210px] rounded-full overflow-hidden border border-white/15 bg-black/40 shadow-inner flex items-center justify-center">
                  <canvas
                    ref={canvasRef}
                    width={210}
                    height={210}
                    className="w-full h-full block"
                  />
                  {/* Subtle overlay badge */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 text-[9px] font-mono text-white/60 pointer-events-none">
                    Rotating Preview
                  </div>
                </div>
              </div>

              {/* Telemetry Numbers */}
              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-center">
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
                  <div className="text-base font-bold text-white">249</div>
                  <div className="text-[9px] text-white/50">ISO Territories</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
                  <div className="text-base font-bold text-white">580+</div>
                  <div className="text-[9px] text-white/50">Statutes</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
                  <div className="text-base font-bold text-dutchOrange">1h–96h</div>
                  <div className="text-[9px] text-white/50">Breach Clocks</div>
                </div>
              </div>

              {/* Corridors Highlight List */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-white/80">🇺🇸 United States ↔ EU</span>
                  <span className="text-[10px] text-sky-400">FDA 524B & CIRCIA</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-white/80">🇬🇧 United Kingdom ↔ EU</span>
                  <span className="text-[10px] text-emerald-400">PSTI Act 2022</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-white/80">🇯🇵🇸🇬 APAC Hubs ↔ EU</span>
                  <span className="text-[10px] text-purple-400">Cybersecurity Acts</span>
                </div>
              </div>

              {/* Action Call to Action Button */}
              <div className="pt-2 space-y-2">
                <Link
                  href="/jurisdictions"
                  className="w-full py-2.5 px-4 rounded-xl bg-dutchOrange text-white font-mono text-xs font-bold flex items-center justify-center gap-2 hover:bg-dutchOrange/90 transition-all shadow-md group/btn"
                >
                  <span>Launch Interactive 3D Globe & Corridors</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <p className="text-[10px] text-white/50 text-center font-mono leading-tight">
                  Opens full geospatial engine with 3D camera tours and bilateral legal comparators
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
