"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
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
  ShieldCheck
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [worldData, setWorldData] = useState<any>(null);
  const rotationRef = useRef<[number, number]>([-15, -30]);
  const animationFrameRef = useRef<number | null>(null);

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
              Explore pre-application collision gates, statutory deliverables, and extraterritorial trade corridors.
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Statutory Enforcement Roadmap Teaser (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-white/50 pb-1">
                <span>Binding Regulatory Milestones</span>
                <span>Pillar 2 Gateway</span>
              </div>

              <div className="space-y-3">
                {STATUTORY_MILESTONES.map((m) => (
                  <Link
                    key={m.id}
                    href="/cra-hub/timeline"
                    className={`block p-4 sm:p-5 rounded-2xl border transition-all group ${
                      m.badgeType === "active"
                        ? "bg-[#14171c] border-red-500/40 hover:border-red-500/80 hover:bg-[#181b22] shadow-sm"
                        : m.badgeType === "collision"
                        ? "bg-[#14171c] border-amber-500/40 hover:border-amber-500/80 hover:bg-[#181b22] shadow-sm"
                        : "bg-[#14171c] border-white/10 hover:border-dutchOrange/60 hover:bg-[#181b22] shadow-sm"
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
                                ? "bg-amber-500 text-black font-bold"
                                : "bg-dutchOrange text-white"
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
                              ? "text-amber-400"
                              : "text-dutchOrange"
                          }`}
                        >
                          {m.leadTime}
                        </span>
                        <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-dutchOrange group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>

                    <p className="text-xs text-white/70 leading-relaxed mt-2.5 pt-2 border-t border-white/10">
                      {m.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {m.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-mono text-white/80"
                        >
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Prominent CTA to Dedicated Timeline Page */}
            <Link
              href="/cra-hub/timeline"
              className="py-3 px-5 rounded-xl bg-dutchOrange text-white font-mono text-xs font-bold flex items-center justify-between hover:bg-dutchOrange/90 transition-all shadow-md group"
            >
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Open Full Interactive Enforcement Timeline & Action Dossiers</span>
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Column: Compact, Tasteful & Clickable 3D Globe Teaser (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <Link
              href="/jurisdictions"
              className="p-5 rounded-2xl bg-[#111317] border border-white/10 hover:border-dutchOrange/60 hover:shadow-[0_0_25px_rgba(224,90,16,0.15)] transition-all duration-300 flex flex-col justify-between group cursor-pointer h-full space-y-4"
            >
              {/* Header */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/5 border border-white/10 text-dutchOrange uppercase tracking-wider group-hover:border-dutchOrange/40 transition-colors">
                    Extraterritorial Scope
                  </span>
                  <span className="text-[11px] font-mono text-white/50 group-hover:text-white/80 transition-colors">
                    Art. 11 & 13 →
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-dutchOrange transition-colors">
                  249 Sovereign Jurisdictions & Bilateral Trade Corridors
                </h3>

                <p className="text-xs text-white/70 leading-relaxed">
                  Non-EU manufacturers exporting to the EU must comply with binding cybersecurity baselines and appoint an EU Authorised Representative.
                </p>
              </div>

              {/* Compact 3D Globe Canvas (Tasteful, Small, Interactive) */}
              <div className="relative w-full py-2 flex flex-col items-center justify-center">
                <div className="relative w-[210px] h-[210px] rounded-full overflow-hidden border border-white/15 group-hover:border-dutchOrange/50 group-hover:shadow-[0_0_25px_rgba(224,90,16,0.25)] bg-black/40 transition-all flex items-center justify-center">
                  <canvas
                    ref={canvasRef}
                    width={210}
                    height={210}
                    className="w-full h-full block"
                  />
                  {/* Subtle overlay badge */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-sm border border-white/15 group-hover:border-dutchOrange/60 text-[9px] font-mono text-white/70 group-hover:text-dutchOrange transition-colors pointer-events-none whitespace-nowrap">
                    Click to Open 3D Globe
                  </div>
                </div>
              </div>

              {/* Telemetry Numbers */}
              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-center">
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10 group-hover:border-white/20 transition-colors">
                  <div className="text-base font-bold text-white">249</div>
                  <div className="text-[9px] text-white/50">ISO Territories</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10 group-hover:border-white/20 transition-colors">
                  <div className="text-base font-bold text-white">580+</div>
                  <div className="text-[9px] text-white/50">Statutes</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10 group-hover:border-dutchOrange/30 transition-colors">
                  <div className="text-base font-bold text-dutchOrange">1h–96h</div>
                  <div className="text-[9px] text-white/50">Breach Clocks</div>
                </div>
              </div>

              {/* Corridors Highlight List */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5 group-hover:border-white/10 transition-colors">
                  <span className="text-white/80">🇺🇸 United States ↔ EU</span>
                  <span className="text-[10px] text-sky-400">FDA 524B & CIRCIA</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5 group-hover:border-white/10 transition-colors">
                  <span className="text-white/80">🇬🇧 United Kingdom ↔ EU</span>
                  <span className="text-[10px] text-emerald-400">PSTI Act 2022</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5 group-hover:border-white/10 transition-colors">
                  <span className="text-white/80">🇯🇵🇸🇬 APAC Hubs ↔ EU</span>
                  <span className="text-[10px] text-purple-400">Cybersecurity Acts</span>
                </div>
              </div>

              {/* Action Call to Action Button */}
              <div className="pt-1 space-y-1.5">
                <div className="w-full py-2.5 px-4 rounded-xl bg-white/10 group-hover:bg-dutchOrange text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
                  <span>Launch Interactive 3D Globe & Corridors</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[10px] text-white/50 text-center font-mono leading-tight">
                  Opens full geospatial engine with 3D camera tours and bilateral legal comparators
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
