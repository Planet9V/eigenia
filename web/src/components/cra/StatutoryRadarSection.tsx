"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  geoOrthographic,
  geoPath,
  geoGraticule10,
  geoInterpolate
} from "d3-geo";
import { feature } from "topojson-client";
import {
  Clock,
  Globe,
  Radio,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Maximize2,
  RotateCw,
  Compass,
  Sparkles,
  ShieldCheck,
  ShieldAlert
} from "lucide-react";

// Radar Milestone Definitions
interface RadarMilestone {
  id: string;
  date: string;
  tag: string;
  badgeColor: string;
  title: string;
  citation: string;
  leadTime: string;
  summary: string;
  deliverables: string[];
  penalty: string;
  blipCoords: { x: number; y: number }; // Percentage position on radar scope
}

const RADAR_MILESTONES: RadarMilestone[] = [
  {
    id: "stage-enisa",
    date: "September 11, 2026",
    tag: "ACTIVE LAW TODAY",
    badgeColor: "bg-red-500 text-white",
    title: "Article 14 ENISA SRP 24h Early Warning",
    citation: "Regulation (EU) 2024/2847 Article 14(1) & (2)",
    leadTime: "ACTIVE TODAY",
    summary:
      "Mandatory 24-hour early warning notification to ENISA Single Reporting Platform and national CSIRTs upon discovering actively exploited zero-days or in-the-wild compromises.",
    deliverables: [
      "24h Early warning submission (Parties, model, exploited surface)",
      "72h Technical vulnerability dossier (CVSS, exploitation telemetry)",
      "14-day root-cause and mitigation distribution update"
    ],
    penalty: "Up to €15,000,000 or 2.5% of annual worldwide revenue",
    blipCoords: { x: 50, y: 22 }
  },
  {
    id: "stage-machinery",
    date: "January 20, 2027",
    tag: "UPCOMING COLLISION",
    badgeColor: "bg-dutchOrange/10 text-dutchOrange border border-dutchOrange/30",
    title: "Machinery Regulation Cyber Mandate",
    citation: "Regulation (EU) 2023/1230 Annex III § 1.1.9",
    leadTime: "T-4 MONTHS",
    summary:
      "Industrial machinery safety requires certified cyber protection 11 months before full CRA application. Hardware and software connections must withstand external corruption.",
    deliverables: [
      "Protection against corruption of safety-related control circuits",
      "Evidence of security-by-design for industrial control systems (ICS)",
      "Machinery CE mark technical file incorporating cyber risk assessment"
    ],
    penalty: "Market withdrawal, customs impoundment, national safety stop orders",
    blipCoords: { x: 74, y: 46 }
  },
  {
    id: "stage-full-cra",
    date: "December 11, 2027",
    tag: "STATUTORY DEADLINE",
    badgeColor: "bg-surface border border-hairline text-primary",
    title: "Full CRA Application & CE Marking",
    citation: "Regulation (EU) 2024/2847 Articles 10, 13, 24 & Annex I",
    leadTime: "T-15 MONTHS",
    summary:
      "Mandatory CE mark for 100% of Products with Digital Elements (PDE). Requires machine-readable CycloneDX SBOMs, 10-year technical files, and default-secure configurations.",
    deliverables: [
      "Annex I Part I Essential Cybersecurity requirements compliance",
      "Annex I Part II Vulnerability handling & automated security updates",
      "EU Declaration of Conformity and 10-year statutory technical dossier"
    ],
    penalty: "Up to €15,000,000 or 2.5% of total annual worldwide turnover",
    blipCoords: { x: 30, y: 72 }
  }
];

// Corridor Coordinates for 3D Globe
interface CorridorLine {
  id: string;
  name: string;
  sourceName: string;
  targetName: string;
  sourceCoords: [number, number]; // [lon, lat]
  targetCoords: [number, number];
  color: string;
  centerYaw: number;
  centerPitch: number;
  description: string;
}

const CORRIDORS: CorridorLine[] = [
  {
    id: "transatlantic",
    name: "Transatlantic Bridge",
    sourceName: "Washington D.C. (US)",
    targetName: "Brussels / Amsterdam (EU)",
    sourceCoords: [-77.0369, 38.9072],
    targetCoords: [4.3517, 50.8503],
    color: "#38bdf8", // Sky Blue
    centerYaw: 35,
    centerPitch: -38,
    description: "US FDA 524B & EO 14028 SBOM alignment vs CRA Annex I and CIRCIA 72h early reporting"
  },
  {
    id: "post_brexit",
    name: "Post-Brexit Alignment",
    sourceName: "London (UK)",
    targetName: "Amsterdam / Brussels (EU)",
    sourceCoords: [-0.1276, 51.5074],
    targetCoords: [4.3517, 50.8503],
    color: "#34d399", // Emerald
    centerYaw: -2,
    centerPitch: -50,
    description: "UK PSTI Act default password ban vs CRA broad software PDE scope & 24h ENISA clock"
  },
  {
    id: "apac_tech",
    name: "APAC Tech Corridor",
    sourceName: "Singapore / Tokyo (APAC)",
    targetName: "Brussels / Amsterdam (EU)",
    sourceCoords: [103.8198, 1.3521],
    targetCoords: [4.3517, 50.8503],
    color: "#c084fc", // Purple
    centerYaw: -60,
    centerPitch: -20,
    description: "Singapore Cyber Security Act 2h CII notification & Cyber Labelling Scheme vs CRA CE mark"
  }
];

export function StatutoryRadarSection() {
  // Radar Active Milestone State
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>("stage-enisa");
  const activeMilestone = RADAR_MILESTONES.find((m) => m.id === activeMilestoneId) || RADAR_MILESTONES[0];

  // 3D Canvas Globe State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedCorridorId, setSelectedCorridorId] = useState<string>("transatlantic");
  const [isGlobeHovered, setIsGlobeHovered] = useState<boolean>(false);
  const [topoFeatures, setTopoFeatures] = useState<any[]>([]);
  const [isGlobeVisible, setIsGlobeVisible] = useState<boolean>(true);

  // Rotation angles for Globe
  const rotationRef = useRef<{ yaw: number; pitch: number }>({ yaw: 20, pitch: -25 });
  const targetRotationRef = useRef<{ yaw: number; pitch: number }>({ yaw: 20, pitch: -25 });
  const animFrameRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const lastMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Load TopoJSON on mount
  useEffect(() => {
    let isMounted = true;
    async function loadGlobeData() {
      try {
        let res = await fetch("/data/world-110m.json");
        if (!res.ok) {
          res = await fetch("/data/world-50m.json");
        }
        if (res.ok) {
          const topo = await res.json();
          const countries = (feature(topo, topo.objects.countries as any) as any).features;
          if (isMounted) setTopoFeatures(countries);
        }
      } catch (err) {
        console.warn("Could not load world topojson for mini-globe preview:", err);
      }
    }
    loadGlobeData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Center globe on selected corridor
  const handleSelectCorridor = (corridor: CorridorLine) => {
    setSelectedCorridorId(corridor.id);
    targetRotationRef.current = {
      yaw: corridor.centerYaw,
      pitch: corridor.centerPitch
    };
  };

  // Intersection observer to pause rendering when scrolled out of view
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsGlobeVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Main Canvas Render Loop
  useEffect(() => {
    if (!isGlobeVisible) return;

    let time = 0;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      time += 0.015;

      // Smooth camera interpolation towards target
      if (!isDraggingRef.current) {
        // Auto-rotation if not hovered
        if (!isGlobeHovered) {
          targetRotationRef.current.yaw += 0.22;
        }

        rotationRef.current.yaw += (targetRotationRef.current.yaw - rotationRef.current.yaw) * 0.08;
        rotationRef.current.pitch += (targetRotationRef.current.pitch - rotationRef.current.pitch) * 0.08;
      }

      const width = canvas.width;
      const height = canvas.height;
      const radius = Math.min(width, height) * 0.42;

      ctx.clearRect(0, 0, width, height);

      // Create Orthographic Projection
      const projection = geoOrthographic()
        .scale(radius)
        .translate([width / 2, height / 2])
        .rotate([rotationRef.current.yaw, rotationRef.current.pitch, 0])
        .clipAngle(90);

      const pathGen = geoPath(projection, ctx);

      // 1. Globe Sphere Background (Deep Obsidian Space)
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
      ctx.fillStyle = "#0B0C0E";
      ctx.fill();

      // Atmospheric Glow Ring
      const glowGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        radius * 0.88,
        width / 2,
        height / 2,
        radius * 1.05
      );
      glowGradient.addColorStop(0, "rgba(224, 90, 16, 0)");
      glowGradient.addColorStop(0.7, "rgba(224, 90, 16, 0.15)");
      glowGradient.addColorStop(1, "rgba(224, 90, 16, 0.35)");
      ctx.fillStyle = glowGradient;
      ctx.fill();

      // 2. Graticules
      ctx.beginPath();
      pathGen(geoGraticule10());
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.stroke();

      // 3. Countries
      if (topoFeatures.length > 0) {
        ctx.beginPath();
        for (const feat of topoFeatures) {
          pathGen(feat);
        }
        ctx.fillStyle = "#181B20";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        ctx.stroke();
      }

      // 4. Bilateral Corridor Great-Circle Arcs
      CORRIDORS.forEach((corridor) => {
        const isSelected = corridor.id === selectedCorridorId;
        const interpolator = geoInterpolate(corridor.sourceCoords, corridor.targetCoords);

        // Generate 32 arc sample points
        const points: [number, number][] = [];
        for (let i = 0; i <= 32; i++) {
          points.push(interpolator(i / 32));
        }

        ctx.beginPath();
        pathGen({
          type: "LineString",
          coordinates: points
        });

        if (isSelected) {
          ctx.lineWidth = 2.4;
          ctx.strokeStyle = corridor.color;
          ctx.shadowColor = corridor.color;
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.shadowBlur = 0; // reset
        } else {
          ctx.lineWidth = 1.0;
          ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
          ctx.stroke();
        }

        // Animated Traveling Photon along the arc
        const photonT = (time * 0.4 + (isSelected ? 0 : 0.5)) % 1;
        const photonCoord = interpolator(photonT);
        const projectedPhoton = projection(photonCoord);

        if (projectedPhoton) {
          ctx.beginPath();
          ctx.arc(projectedPhoton[0], projectedPhoton[1], isSelected ? 3.5 : 2, 0, Math.PI * 2);
          ctx.fillStyle = isSelected ? "#ffffff" : corridor.color;
          ctx.shadowColor = corridor.color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Terminal City Beacons
        const srcProj = projection(corridor.sourceCoords);
        const tgtProj = projection(corridor.targetCoords);

        if (srcProj) {
          ctx.beginPath();
          ctx.arc(srcProj[0], srcProj[1], 3, 0, Math.PI * 2);
          ctx.fillStyle = corridor.color;
          ctx.fill();
        }

        if (tgtProj) {
          ctx.beginPath();
          ctx.arc(tgtProj[0], tgtProj[1], 3.5, 0, Math.PI * 2);
          ctx.fillStyle = "#E05A10"; // Dutch Orange EU Hub
          ctx.fill();
        }
      });

      // 5. Outer Horizon Rim
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.stroke();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [topoFeatures, isGlobeVisible, isGlobeHovered, selectedCorridorId]);

  // Drag interaction handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };

    rotationRef.current.yaw += dx * 0.45;
    rotationRef.current.pitch = Math.max(-85, Math.min(85, rotationRef.current.pitch - dy * 0.45));
    targetRotationRef.current = { ...rotationRef.current };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section className="py-12 bg-canvas border-b border-hairline relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider font-semibold text-dutchOrange bg-dutchOrange/10 px-3 py-1 rounded-full border border-dutchOrange/30 inline-block mb-2">
              Dual Operational Command // Pillars 3 & Global Scope
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-primary mt-1">
              Statutory Enforcement Radar & Extraterritorial Corridors
            </h2>
            <p className="text-sm sm:text-base text-secondary max-w-3xl leading-relaxed mt-1">
              Cross-correlate mandatory EU statutory enforcement clocks with global supply chain corridors. 
              Interactive radar telemetry on the left, live 3D geospatial extraterritorial matrix across 249 jurisdictions on the right.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-mono text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Live Telemetry Active
            </span>
          </div>
        </div>

        {/* Dual-Column Interactive Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ============================================================ */}
          {/* LEFT COLUMN (7 COLS): STATUTORY ENFORCEMENT RADAR           */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-surface border border-hairline shadow-sm space-y-6">
            
            {/* Radar Scope Visual & Active Milestone Selector */}
            <div>
              <div className="flex items-center justify-between border-b border-hairline pb-4 mb-5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary">
                  <Radio className="w-4 h-4 text-dutchOrange animate-pulse" />
                  <span>Statutory Radar Scope // T-Minus Enforcement Trajectory</span>
                </div>
                <span className="text-[11px] font-mono text-muted">
                  Click a milestone to inspect
                </span>
              </div>

              {/* Interactive Radar Dial + Milestone Blips */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                
                {/* Circular Radar Scope Display (5 cols) */}
                <div className="sm:col-span-5 flex justify-center">
                  <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-[#0B0C0E] border-2 border-hairline flex items-center justify-center overflow-hidden shadow-inner">
                    
                    {/* Concentric Distance Rings */}
                    <div className="absolute inset-4 rounded-full border border-dutchOrange/20" />
                    <div className="absolute inset-10 rounded-full border border-dutchOrange/15" />
                    <div className="absolute inset-16 rounded-full border border-dutchOrange/10" />

                    {/* Degree Crosshair Lines */}
                    <div className="absolute inset-y-0 w-[1px] bg-dutchOrange/15" />
                    <div className="absolute inset-x-0 h-[1px] bg-dutchOrange/15" />

                    {/* Rotating Radar Sweep Beam (Continuous Conic Sweep) */}
                    <div className="absolute inset-0 rounded-full animate-spin [animation-duration:4s] pointer-events-none bg-[conic-gradient(from_0deg,transparent_0deg,rgba(224,90,16,0.02)_280deg,rgba(224,90,16,0.3)_355deg,#E05A10_360deg)]" />

                    {/* Interactive Radar Milestone Blips */}
                    {RADAR_MILESTONES.map((m) => {
                      const isSelected = m.id === activeMilestoneId;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setActiveMilestoneId(m.id)}
                          style={{
                            left: `${m.blipCoords.x}%`,
                            top: `${m.blipCoords.y}%`,
                            transform: "translate(-50%, -50%)"
                          }}
                          className="absolute z-20 group cursor-pointer focus:outline-hidden"
                          title={`${m.title} (${m.date})`}
                        >
                          {/* Pulsing Beacon */}
                          <span className="relative flex h-4 w-4 items-center justify-center">
                            <span
                              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                m.id === "stage-enisa"
                                  ? "bg-red-400"
                                  : m.id === "stage-machinery"
                                  ? "bg-dutchOrange"
                                  : "bg-emerald-400"
                              }`}
                            />
                            <span
                              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                                isSelected
                                  ? "h-3.5 w-3.5 ring-2 ring-white " + (m.id === "stage-enisa" ? "bg-red-500" : "bg-dutchOrange")
                                  : m.id === "stage-enisa"
                                  ? "bg-red-500"
                                  : m.id === "stage-machinery"
                                  ? "bg-dutchOrange"
                                  : "bg-emerald-500"
                              }`}
                            />
                          </span>
                        </button>
                      );
                    })}

                    {/* Center Origin Dot */}
                    <div className="w-1.5 h-1.5 rounded-full bg-white z-10" />
                    <span className="absolute bottom-2 font-mono text-[9px] text-white/40">
                      CRA CLOCK T-0
                    </span>
                  </div>
                </div>

                {/* 3 Milestone Selector Cards (7 cols) */}
                <div className="sm:col-span-7 space-y-2">
                  {RADAR_MILESTONES.map((m) => {
                    const isSelected = m.id === activeMilestoneId;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setActiveMilestoneId(m.id)}
                        className={`w-full text-left p-2.5 sm:p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 ${
                          isSelected
                            ? "bg-dutchOrange/10 border-dutchOrange/40 shadow-xs ring-1 ring-dutchOrange/30"
                            : "bg-surface hover:bg-subtle border-hairline"
                        }`}
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${m.badgeColor}`}
                            >
                              {m.tag}
                            </span>
                            <span className="font-mono text-xs font-bold text-primary">
                              {m.date}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-primary mt-1 line-clamp-1">
                            {m.title}
                          </span>
                        </div>

                        <span className="font-mono text-[10px] text-dutchOrange font-bold shrink-0">
                          {m.leadTime}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selected Milestone Drill-down Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMilestone.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-4 rounded-xl bg-canvas border border-hairline space-y-3 font-mono text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-muted uppercase block">
                      Statutory Basis
                    </span>
                    <span className="text-primary font-bold text-xs">
                      {activeMilestone.citation}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-subtle text-secondary text-[10px] border border-hairline">
                    Binding EU Regulation
                  </span>
                </div>

                <p className="text-secondary font-sans text-xs leading-relaxed font-normal">
                  {activeMilestone.summary}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-hairline text-[11px]">
                  <span className="text-[10px] text-dutchOrange uppercase font-bold block">
                    Mandatory Operational Actions:
                  </span>
                  {activeMilestone.deliverables.map((d, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-secondary">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                  <span className="text-red-400">
                    <strong className="text-red-500">Fine Risk:</strong> {activeMilestone.penalty}
                  </span>
                  <Link
                    href="/cra-hub/timeline"
                    className="text-dutchOrange font-bold hover:underline inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Timeline Deep Dive</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN (5 COLS): 3D INTERACTIVE GLOBE & CORRIDORS     */}
          {/* ============================================================ */}
          <div 
            ref={containerRef}
            className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0B0C0E] border border-white/10 text-white shadow-xl relative overflow-hidden"
          >
            {/* Background ambient lighting */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-dutchOrange/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-dutchOrange">
                  <Globe className="w-4 h-4" />
                  <span className="font-bold">Extraterritorial Reach // 3D Matrix</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/70">
                  249 Sovereign ISOs
                </span>
              </div>

              {/* 3D Canvas Globe Viewport */}
              <div 
                className="relative w-full aspect-square max-w-[340px] mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing"
                onMouseEnter={() => setIsGlobeHovered(true)}
                onMouseLeave={() => {
                  setIsGlobeHovered(false);
                  isDraggingRef.current = false;
                }}
              >
                <canvas
                  ref={canvasRef}
                  width={340}
                  height={340}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  className="w-full h-full block"
                />

                {/* Floating Globe Instructions / Hint */}
                <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 border border-white/15 text-[10px] font-mono text-white/70 backdrop-blur-xs">
                    Drag to rotate • Hover to inspect
                  </span>
                </div>
              </div>

              {/* 3 Bilateral Corridor Preset Buttons */}
              <div className="space-y-1.5 font-mono text-xs">
                <span className="text-[10px] text-white/50 uppercase block">
                  Center On Key Regulatory Corridor:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {CORRIDORS.map((c) => {
                    const isSelected = c.id === selectedCorridorId;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleSelectCorridor(c)}
                        className={`p-2 rounded-lg text-center text-[10px] font-bold transition-colors cursor-pointer truncate ${
                          isSelected
                            ? "bg-white/15 border border-white/30 text-white shadow-xs"
                            : "bg-white/5 hover:bg-white/10 border border-white/5 text-white/70"
                        }`}
                      >
                        {c.id === "transatlantic"
                          ? "🇺🇸 US ↔ EU"
                          : c.id === "post_brexit"
                          ? "🇬🇧 UK ↔ EU"
                          : "🇯🇵🇸🇬 APAC ↔ EU"}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Corridor Insight */}
              {(() => {
                const current = CORRIDORS.find((c) => c.id === selectedCorridorId) || CORRIDORS[0];
                return (
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className="font-bold text-white">{current.name}</span>
                      <span className="text-[10px] text-white/50">{current.sourceName}</span>
                    </div>
                    <p className="text-[11px] text-white/70 font-sans leading-relaxed">
                      {current.description}
                    </p>
                  </div>
                );
              })()}

              {/* Telemetry Stat Strip */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/10 font-mono text-center">
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="text-base font-bold text-white">249</div>
                  <div className="text-[9px] text-white/50">ISOs</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="text-base font-bold text-white">580+</div>
                  <div className="text-[9px] text-white/50">Acts</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="text-base font-bold text-white">1h-96h</div>
                  <div className="text-[9px] text-white/50">Clocks</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="text-base font-bold text-dutchOrange">7</div>
                  <div className="text-[9px] text-white/50">Sectors</div>
                </div>
              </div>
            </div>

            {/* Direct CTA Link to Full Interactive Page */}
            <div className="pt-4 mt-4 border-t border-white/10 relative z-10">
              <Link
                href="/jurisdictions"
                className="w-full py-2.5 px-4 rounded-xl bg-dutchOrange hover:bg-dutchOrange-600 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-dutchOrange/20 transition-all cursor-pointer group"
              >
                <span>Launch 3D Interactive Global Matrix & Corridors</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
