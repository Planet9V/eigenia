"use client";

import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import {
  geoOrthographic,
  geoNaturalEarth1,
  geoPath,
  geoGraticule10,
  geoGraticule,
  geoContains,
  geoCentroid,
  geoInterpolate,
  GeoProjection,
  GeoPath
} from "d3-geo";
import { feature } from "topojson-client";
import {
  MapProjectionMode,
  RegulatoryDimension,
  SectorFilter,
  CountryJurisdictionData,
  JurisdictionMatrixDataset,
  FacilityMarker,
  SupplyChainCorridor
} from "@/types/jurisdictions";
import { STATUTORY_CORRIDORS } from "@/data/statutoryCorridors";
import { CorridorAssuranceInspector } from "./CorridorAssuranceInspector";
import {
  Maximize2,
  Minimize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Info,
  ShieldAlert,
  Clock,
  Key,
  Lock,
  Scale,
  Layers,
  ArrowRight,
  Workflow,
  Keyboard
} from "lucide-react";

interface Props {
  projectionMode: MapProjectionMode;
  activeDimension: RegulatoryDimension;
  activeSector: SectorFilter;
  autoRotate: boolean;
  onSelectCountry: (country: CountryJurisdictionData) => void;
  selectedIso2?: string | null;
  highlightedIso2List?: string[];
  facilityMarkers?: FacilityMarker[];
  showCorridors?: boolean;
  onToggleCorridors?: () => void;
  cameraOverride?: { yaw: number; pitch: number; zoom?: number } | null;
}

interface HoverState {
  x: number;
  y: number;
  country: CountryJurisdictionData;
}

// Preset critical facilities across sovereign jurisdictions
const DEFAULT_FACILITIES: FacilityMarker[] = [
  {
    id: "fac_rotterdam",
    name: "Port of Rotterdam Petrochemical Hub",
    sector: "OT/Industrial",
    lat: 51.9244,
    lng: 4.4777,
    iso2: "NL",
    criticality: "Critical",
    details: "NIS2 & CRA essential entity. Safety instrumented continuous chemical cracking loops."
  },
  {
    id: "fac_tennet_offshore",
    name: "Tennet BorWin5 Offshore HVDC Converter",
    sector: "Energy",
    lat: 54.0,
    lng: 6.5,
    iso2: "DE",
    criticality: "Critical",
    details: "Trans-European grid interconnector under BSI IT-SiG 2.0 and EU CRA critical standards."
  },
  {
    id: "fac_palo_verde",
    name: "Palo Verde Generating Station",
    sector: "Energy",
    lat: 33.3963,
    lng: -112.868,
    iso2: "US",
    criticality: "Critical",
    details: "Nuclear power generation subject to NRC 10 CFR 73.54 and NERC CIP Level 3 mandates."
  },
  {
    id: "fac_singapore_jurong",
    name: "Jurong Island Integrated Water & Energy Complex",
    sector: "Water",
    lat: 1.2667,
    lng: 103.7,
    iso2: "SG",
    criticality: "Critical",
    details: "Critical desalination and turbine infrastructure under Singapore Cybersecurity Act 2024."
  },
  {
    id: "fac_tokyo_otn",
    name: "Tokyo-Chiba Pacific Subsea Cable Gateway",
    sector: "Telecom",
    lat: 35.6074,
    lng: 140.1065,
    iso2: "JP",
    criticality: "High",
    details: "High-throughput international packet switching subject to Japan Economic Security Act."
  },
  {
    id: "fac_charleroi_biotech",
    name: "Wallonia Cell & Gene Diagnostic Manufacturing Hub",
    sector: "Healthcare",
    lat: 50.4108,
    lng: 4.4446,
    iso2: "BE",
    criticality: "High",
    details: "Automated clinical batch formulation under EU MDR / CRA Class II medical rules."
  }
];

export const DEFAULT_CORRIDORS: SupplyChainCorridor[] = STATUTORY_CORRIDORS;

export function JurisdictionMapViewer({
  projectionMode,
  activeDimension,
  activeSector,
  autoRotate,
  onSelectCountry,
  selectedIso2,
  highlightedIso2List = [],
  facilityMarkers = DEFAULT_FACILITIES,
  showCorridors = true,
  onToggleCorridors,
  cameraOverride
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Geo state
  const [topoFeatures, setTopoFeatures] = useState<any[]>([]);
  const [matrixData, setMatrixData] = useState<JurisdictionMatrixDataset | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoverState, setHoverState] = useState<HoverState | null>(null);
  const [selectedCorridor, setSelectedCorridor] = useState<SupplyChainCorridor | null>(null);
  const [hoveredCorridor, setHoveredCorridor] = useState<SupplyChainCorridor | null>(null);
  const [corridorTooltipPos, setCorridorTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Viewport / Camera state
  const [dimensions, setDimensions] = useState({ width: 900, height: 550 });
  const [yaw, setYaw] = useState<number>(0);
  const [pitch, setPitch] = useState<number>(-15);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const dragDistanceRef = useRef(0);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragInitialAnglesRef = useRef({ yaw: 0, pitch: 0 });
  const dragInitialPanRef = useRef({ x: 0, y: 0 });
  const animFrameIdRef = useRef<number | null>(null);
  const targetRotationRef = useRef<{ yaw: number; pitch: number } | null>(null);
  const hoverDebounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (hoverDebounceTimerRef.current) {
        clearTimeout(hoverDebounceTimerRef.current);
      }
    };
  }, []);

  // Handle cameraOverride if provided (e.g. from guided tour flight)
  useEffect(() => {
    if (cameraOverride) {
      targetRotationRef.current = {
        yaw: cameraOverride.yaw,
        pitch: cameraOverride.pitch
      };
      if (cameraOverride.zoom) {
        setZoomScale(cameraOverride.zoom);
      }
    }
  }, [cameraOverride]);

  // Pre-calculate Great-Circle LineStrings with dynamic sector filtering
  const visibleCorridors = useMemo(() => {
    if (activeSector === "All") {
      return STATUTORY_CORRIDORS;
    }
    return STATUTORY_CORRIDORS.filter((corridor) => corridor.sector === activeSector);
  }, [activeSector]);

  const corridorLineStrings = useMemo(() => {
    return visibleCorridors.map((corridor) => {
      const interpolate = geoInterpolate(corridor.sourceCoords, corridor.targetCoords);
      const steps = 48;
      const coords: [number, number][] = [];
      for (let i = 0; i <= steps; i++) {
        coords.push(interpolate(i / steps));
      }
      return {
        corridor,
        geoJson: {
          type: "LineString" as const,
          coordinates: coords
        },
        coords
      };
    });
  }, [visibleCorridors]);

  // Load TopoJSON and Matrix Dataset on mount
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        let topoRes = await fetch("/data/world-50m.json");
        if (!topoRes.ok) {
          topoRes = await fetch("/data/world-110m.json");
        }
        const [topoJson, matrixRes] = await Promise.all([
          topoRes.json(),
          import("@/data/jurisdictions-matrix.json")
        ]);
        const countriesGeo = (feature(topoJson, topoJson.objects.countries as any) as any).features;

        if (isMounted) {
          setTopoFeatures(countriesGeo);
          setMatrixData(matrixRes.default as unknown as JurisdictionMatrixDataset);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed loading map geometry or jurisdiction matrix:", err);
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Update container dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      setDimensions({
        width: Math.max(320, clientWidth),
        height: Math.max(400, clientHeight || 550)
      });
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Center on selected country if changed from outside
  useEffect(() => {
    if (!selectedIso2 || !matrixData || topoFeatures.length === 0) return;

    const country = matrixData.countries[selectedIso2];
    if (!country) return;

    const numCode = country.numeric_code;
    const matchFeature = topoFeatures.find((f: any) => {
      const idStr = String(f.id).padStart(3, "0");
      return idStr === numCode;
    });

    if (matchFeature) {
      const centroid = geoCentroid(matchFeature);
      if (centroid && !isNaN(centroid[0]) && !isNaN(centroid[1])) {
        targetRotationRef.current = {
          yaw: -centroid[0],
          pitch: -centroid[1]
        };
      }
    }
  }, [selectedIso2, matrixData, topoFeatures]);

  // Color mapping logic based on statutory dimensions: Dark Luxury Executive Palette
  const getCountryColor = useCallback(
    (country: CountryJurisdictionData | undefined, isHighlighted: boolean, isDimmed: boolean) => {
      if (!country) return "#151b2a";

      if (isDimmed) {
        return "#0a0e17";
      }

      // Filter by sector applicability if a sector is chosen
      if (activeSector !== "All" && !country.sector_applicability[activeSector]) {
        return "#0f1422";
      }

      switch (activeDimension) {
        case "incident_clock": {
          const hours = country.incident_disclosure_hours;
          if (hours <= 2) return "#E05A10"; // <= 2h Critical Fast Clock: Dutch Orange
          if (hours <= 6) return "#C2410C"; // <= 6h Fast Clock: deep burnt orange
          if (hours <= 12) return "#9A3412"; // <= 12h: deep rust
          if (hours <= 24) return "#64748B"; // <= 24h Early Warning: platinum slate
          if (hours <= 72) return "#475569"; // <= 72h Standard: dark slate
          return "#1E293B"; // >72h Extended: dark graphite
        }
        case "default_password": {
          return country.default_password_ban ? "#E05A10" : "#1E293B";
        }
        case "sbom_mandate": {
          if (country.sbom_required && country.cbom_required) return "#FFFFFF"; // Full SBOM + CBOM: titanium white
          if (country.sbom_required) return "#E05A10"; // SBOM required: Dutch orange
          return "#1E293B"; // Voluntary / Discretionary: dark graphite
        }
        case "data_localization": {
          if (country.data_localization_required) {
            return country.localization_scope.toLowerCase().includes("all") ||
              country.localization_scope.toLowerCase().includes("strict")
              ? "#E05A10" // Strict local storage: Dutch orange
              : "#9A3412"; // Sectoral: deep rust
          }
          if (country.cross_border_transfer_mechanism.toLowerCase().includes("adequacy")) {
            return "#64748B"; // Adequacy: slate
          }
          return "#1E293B";
        }
        case "crypto_controls": {
          if (country.crypto_import_license_required) return "#E05A10"; // Strict license: Dutch orange
          if (country.crypto_export_controls.toLowerCase().includes("wassenaar")) return "#64748B"; // Wassenaar: slate
          return "#1E293B";
        }
        case "penalties": {
          if (country.criminal_liability_directors) return "#E05A10"; // Director criminal liability: Dutch orange
          if (country.max_turnover_percentage >= 4) return "#C2410C"; // Turnover >= 4%: deep burnt orange
          if (country.max_turnover_percentage >= 1) return "#94A3B8"; // Turnover 1% - 3%: light slate
          return "#475569"; // Fixed fines: slate
        }
        default:
          return "#1E293B";
      }
    },
    [activeDimension, activeSector]
  );

  // Smooth animation / Render loop
  useEffect(() => {
    let running = true;

    const render = () => {
      if (!running) return;

      const canvas = canvasRef.current;
      if (!canvas) {
        animFrameIdRef.current = requestAnimationFrame(render);
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      const width = dimensions.width;
      const height = dimensions.height;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Handle smooth camera orientation lerp
      if (targetRotationRef.current) {
        const dy = targetRotationRef.current.yaw - yaw;
        const dp = targetRotationRef.current.pitch - pitch;
        if (Math.abs(dy) < 0.2 && Math.abs(dp) < 0.2) {
          setYaw(targetRotationRef.current.yaw);
          setPitch(targetRotationRef.current.pitch);
          targetRotationRef.current = null;
        } else {
          setYaw((prev) => prev + dy * 0.08);
          setPitch((prev) => prev + dp * 0.08);
        }
      } else if (autoRotate && !isDraggingRef.current && projectionMode === "globe") {
        setYaw((prev) => (prev + 0.12) % 360);
      }

      // Configure D3 Projection
      let projection: GeoProjection;
      const baseRadius = Math.min(width, height) * 0.42 * zoomScale;
      const cx = width / 2 + panOffset.x;
      const cy = height / 2 + panOffset.y;

      if (projectionMode === "globe") {
        projection = geoOrthographic()
          .scale(baseRadius)
          .translate([cx, cy])
          .rotate([yaw, pitch, 0])
          .clipAngle(90);
      } else {
        projection = geoNaturalEarth1()
          .scale(baseRadius * 0.65)
          .translate([cx, cy])
          .rotate([yaw, 0, 0]);
      }

      const pathGenerator: GeoPath = geoPath(projection, ctx);
      const timeMs = Date.now();

      // 1. Draw Globe Atmosphere Halo and Spherical Ocean Background
      if (projectionMode === "globe") {
        // Multi-stop celestial atmosphere corona (pure light white to subtle slate)
        const glowRadius = baseRadius + 22;
        const coronaGrad = ctx.createRadialGradient(cx, cy, baseRadius * 0.94, cx, cy, glowRadius);
        coronaGrad.addColorStop(0, "rgba(255, 255, 255, 0.12)");
        coronaGrad.addColorStop(0.25, "rgba(203, 213, 225, 0.05)");
        coronaGrad.addColorStop(0.65, "rgba(100, 116, 139, 0.015)");
        coronaGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(cx, cy, glowRadius, 0, 2 * Math.PI);
        ctx.fillStyle = coronaGrad;
        ctx.fill();

        // 3D Spherical depth shaded ocean core (light source at upper-left)
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius, 0, 2 * Math.PI);
        const oceanGrad = ctx.createRadialGradient(
          cx - baseRadius * 0.32,
          cy - baseRadius * 0.32,
          baseRadius * 0.05,
          cx,
          cy,
          baseRadius
        );
        oceanGrad.addColorStop(0, "#121828"); // Direct illuminated zone
        oceanGrad.addColorStop(0.35, "#0b101c"); // Mid-depth obsidian
        oceanGrad.addColorStop(0.75, "#060912"); // Limb falloff
        oceanGrad.addColorStop(1, "#020306"); // Dark limb terminator
        ctx.fillStyle = oceanGrad;
        ctx.fill();

        // Directional ocean specular highlight glint
        const glintGrad = ctx.createRadialGradient(
          cx - baseRadius * 0.32,
          cy - baseRadius * 0.32,
          0,
          cx - baseRadius * 0.32,
          cy - baseRadius * 0.32,
          baseRadius * 0.5
        );
        glintGrad.addColorStop(0, "rgba(255, 255, 255, 0.08)");
        glintGrad.addColorStop(0.4, "rgba(255, 255, 255, 0.02)");
        glintGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius, 0, 2 * Math.PI);
        ctx.fillStyle = glintGrad;
        ctx.fill();

        // Atmospheric Fresnel rim ring (inner glow on silhouette)
        const rimGrad = ctx.createRadialGradient(cx, cy, baseRadius * 0.88, cx, cy, baseRadius);
        rimGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
        rimGrad.addColorStop(1, "rgba(255, 255, 255, 0.14)");
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius, 0, 2 * Math.PI);
        ctx.fillStyle = rimGrad;
        ctx.fill();

        // Globe perimeter boundary hairline
        ctx.lineWidth = 1.0;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        ctx.stroke();
      } else {
        // Flat earth planar container with deep obsidian background
        ctx.beginPath();
        pathGenerator({ type: "Sphere" });
        ctx.fillStyle = "#070b14";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.stroke();
      }

      // 2. Draw Cartographic Precision Graticules
      // 10-degree minor grid
      ctx.beginPath();
      pathGenerator(geoGraticule10());
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.038)";
      ctx.stroke();

      // Equator & Prime Meridian major telemetry lines
      ctx.beginPath();
      pathGenerator({
        type: "MultiLineString",
        coordinates: [
          Array.from({ length: 361 }, (_, i) => [i - 180, 0]),
          Array.from({ length: 181 }, (_, i) => [0, i - 90])
        ]
      });
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.stroke();

      // 3. Draw Sovereign Country Polygons (High-Res 50m Vector Mesh)
      const hasHighlightList = highlightedIso2List.length > 0;
      let selectedCentroidCoords: [number, number] | null = null;

      for (const feat of topoFeatures as any[]) {
        const numId = String(feat.id).padStart(3, "0");
        const iso2 = matrixData?.by_numeric[numId];
        const country = iso2 ? matrixData?.countries[iso2] : undefined;

        const isHighlighted = Boolean(iso2 && highlightedIso2List.includes(iso2));
        const isDimmed = hasHighlightList && !isHighlighted;
        const isSelected = selectedIso2 && iso2 === selectedIso2;
        const isHovered = hoverState?.country.iso2 === iso2;

        ctx.beginPath();
        pathGenerator(feat);

        if (isSelected) {
          // Track centroid for radiant beacon pin
          const c = geoCentroid(feat);
          if (c && !isNaN(c[0]) && !isNaN(c[1])) {
            const projected = projection(c);
            if (projected) selectedCentroidCoords = projected;
          }

          // Radiant pure white / luminous diamond fill for selected nation
          ctx.fillStyle = "#ffffff";
          ctx.fill();

          // Luminous white glowing stroke
          ctx.save();
          ctx.shadowColor = "rgba(255, 255, 255, 0.75)";
          ctx.shadowBlur = 14;
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = "#ffffff";
          ctx.stroke();
          ctx.restore();
        } else if (isHovered) {
          // Frosted titanium silver hover state
          ctx.fillStyle = "#cbd5e1";
          ctx.fill();
          ctx.lineWidth = 1.8;
          ctx.strokeStyle = "#ffffff";
          ctx.stroke();
        } else {
          // Regular polygon fill from executive palette
          ctx.fillStyle = getCountryColor(country, isHighlighted, isDimmed);
          ctx.fill();

          // Crisp fine hairline border (elevated visibility: visible but restrained)
          if (isHighlighted) {
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
            ctx.stroke();
          } else {
            ctx.lineWidth = 0.55;
            ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
            ctx.stroke();
          }
        }
      }

      // Luminous concentric beacon on selected nation centroid
      if (selectedCentroidCoords && projectionMode === "globe") {
        const [bx, by] = selectedCentroidCoords;
        const beaconPulse = (timeMs % 1600) / 1600;
        const ringRadius = 6 + beaconPulse * 22;
        const ringOpacity = (1 - beaconPulse) * 0.9;

        // Expanding sonar ring in Dutch Orange
        ctx.beginPath();
        ctx.arc(bx, by, ringRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(224, 90, 16, ${ringOpacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner beacon core in glowing Dutch Orange
        ctx.beginPath();
        ctx.arc(bx, by, 4, 0, 2 * Math.PI);
        ctx.fillStyle = "#E05A10";
        ctx.shadowColor = "rgba(224, 90, 16, 0.9)";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Draw Great-Circle Supply Chain Corridors with Animated Photon Pulses
      if (showCorridors && corridorLineStrings.length > 0) {
        const dashOffset = (timeMs / 28) % 1000;
        corridorLineStrings.forEach(({ corridor, geoJson }) => {
          const isSelected = selectedCorridor?.id === corridor.id;
          const isHovered = hoveredCorridor?.id === corridor.id;
          const isHighlighted = isSelected || isHovered;

          ctx.save();
          ctx.beginPath();
          pathGenerator(geoJson);

          if (isHighlighted) {
            ctx.setLineDash([8, 8]);
            ctx.lineDashOffset = -dashOffset * 1.5;
            ctx.lineWidth = 3.2;
            ctx.strokeStyle = "#E05A10";
            ctx.shadowColor = "rgba(224, 90, 16, 0.75)";
            ctx.shadowBlur = 12;
          } else {
            ctx.setLineDash([6, 12]);
            ctx.lineDashOffset = -dashOffset;
            ctx.lineWidth = 1.6;
            ctx.strokeStyle =
              corridor.panTokenStatus === "VERIFIED"
                ? "rgba(248, 250, 252, 0.75)"
                : corridor.panTokenStatus === "PENDING_SBOM"
                ? "rgba(224, 90, 16, 0.85)"
                : "rgba(148, 163, 184, 0.65)";
          }
          ctx.stroke();
          ctx.restore();

          // Draw Terminal Hub Pins
          [corridor.sourceCoords, corridor.targetCoords].forEach((coords, ptIdx) => {
            const pt = projection(coords);
            if (!pt) return;

            if (projectionMode === "globe") {
              const center = [-yaw, -pitch];
              const rad = Math.PI / 180;
              const p1 = [coords[0] * rad, coords[1] * rad];
              const p0 = [center[0] * rad, center[1] * rad];
              const cosDist =
                Math.sin(p0[1]) * Math.sin(p1[1]) +
                Math.cos(p0[1]) * Math.cos(p1[1]) * Math.cos(p1[0] - p0[0]);
              if (cosDist < 0) return;
            }

            const [hx, hy] = pt;
            ctx.beginPath();
            ctx.arc(hx, hy, isHighlighted ? 4.5 : 2.8, 0, 2 * Math.PI);
            ctx.fillStyle = isHighlighted ? "#E05A10" : ptIdx === 0 ? "#FFFFFF" : "#94A3B8";
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#0B0C0E";
            ctx.stroke();
          });
        });
      }

      // 5. Draw Facility Pins with Animated Pulse Radar
      facilityMarkers.forEach((fac) => {
        const coords = projection([fac.lng, fac.lat]);
        if (!coords) return;

        // In 3D globe mode, skip facilities around the dark side of the globe
        if (projectionMode === "globe") {
          const center = [-yaw, -pitch];
          const rad = (Math.PI / 180);
          const p1 = [fac.lng * rad, fac.lat * rad];
          const p0 = [center[0] * rad, center[1] * rad];
          const cosDist =
            Math.sin(p0[1]) * Math.sin(p1[1]) +
            Math.cos(p0[1]) * Math.cos(p1[1]) * Math.cos(p1[0] - p0[0]);
          if (cosDist < 0) return;
        }

        const [fx, fy] = coords;
        const pulseRatio = (timeMs % 2000) / 2000;
        const pulseRadius = 4 + pulseRatio * 14;
        const pulseOpacity = (1 - pulseRatio) * 0.75;

        ctx.beginPath();
        ctx.arc(fx, fy, pulseRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = fac.criticality === "Critical" ? `rgba(224, 90, 16, ${pulseOpacity})` : `rgba(255, 255, 255, ${pulseOpacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(fx, fy, 4, 0, 2 * Math.PI);
        ctx.fillStyle = fac.criticality === "Critical" ? "#E05A10" : "#ffffff";
        ctx.fill();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#0B0C0E";
        ctx.stroke();
      });

      ctx.restore();

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      running = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [
    dimensions,
    topoFeatures,
    matrixData,
    projectionMode,
    yaw,
    pitch,
    zoomScale,
    panOffset,
    autoRotate,
    activeDimension,
    activeSector,
    highlightedIso2List,
    selectedIso2,
    hoverState,
    selectedCorridor,
    hoveredCorridor,
    facilityMarkers,
    showCorridors,
    corridorLineStrings,
    getCountryColor
  ]);

  // Synchronous country hit-test helper
  const hitTestCountry = useCallback((clientX: number, clientY: number): CountryJurisdictionData | null => {
    const canvas = canvasRef.current;
    if (!canvas || !matrixData || topoFeatures.length === 0) return null;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;

    const scaleX = dimensions.width / rect.width;
    const scaleY = dimensions.height / rect.height;
    const mouseX = (clientX - rect.left) * scaleX;
    const mouseY = (clientY - rect.top) * scaleY;

    const baseRadius = Math.min(dimensions.width, dimensions.height) * 0.42 * zoomScale;
    const cx = dimensions.width / 2 + panOffset.x;
    const cy = dimensions.height / 2 + panOffset.y;

    let projection: GeoProjection;
    if (projectionMode === "globe") {
      projection = geoOrthographic()
        .scale(baseRadius)
        .translate([cx, cy])
        .rotate([yaw, pitch, 0])
        .clipAngle(90);

      const distFromCenter = Math.hypot(mouseX - cx, mouseY - cy);
      if (distFromCenter > baseRadius + 2) return null;
    } else {
      projection = geoNaturalEarth1()
        .scale(baseRadius * 0.65)
        .translate([cx, cy])
        .rotate([yaw, 0, 0]);
    }

    const inverted = projection.invert ? projection.invert([mouseX, mouseY]) : null;
    if (!inverted || isNaN(inverted[0]) || isNaN(inverted[1])) return null;

    for (let i = 0; i < topoFeatures.length; i++) {
      const f = topoFeatures[i];
      if (geoContains(f, inverted)) {
        const numId = String(f.id).padStart(3, "0");
        const iso2 = matrixData.by_numeric[numId];
        if (iso2 && matrixData.countries[iso2]) {
          return matrixData.countries[iso2];
        }
      }
    }
    return null;
  }, [matrixData, topoFeatures, dimensions, zoomScale, panOffset, projectionMode, yaw, pitch]);

  // Synchronous corridor hit-test helper
  const hitTestCorridor = useCallback((clientX: number, clientY: number): SupplyChainCorridor | null => {
    const canvas = canvasRef.current;
    if (!canvas || !showCorridors || corridorLineStrings.length === 0) return null;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;

    const scaleX = dimensions.width / rect.width;
    const scaleY = dimensions.height / rect.height;
    const mouseX = (clientX - rect.left) * scaleX;
    const mouseY = (clientY - rect.top) * scaleY;

    const baseRadius = Math.min(dimensions.width, dimensions.height) * 0.42 * zoomScale;
    const cx = dimensions.width / 2 + panOffset.x;
    const cy = dimensions.height / 2 + panOffset.y;

    let projection: GeoProjection;
    if (projectionMode === "globe") {
      projection = geoOrthographic()
        .scale(baseRadius)
        .translate([cx, cy])
        .rotate([yaw, pitch, 0])
        .clipAngle(90);
    } else {
      projection = geoNaturalEarth1()
        .scale(baseRadius * 0.65)
        .translate([cx, cy])
        .rotate([yaw, 0, 0]);
    }

    const isVisibleOnGlobe = (coords: [number, number]) => {
      if (projectionMode !== "globe") return true;
      const center = [-yaw, -pitch];
      const rad = Math.PI / 180;
      const p1 = [coords[0] * rad, coords[1] * rad];
      const p0 = [center[0] * rad, center[1] * rad];
      return (
        Math.sin(p0[1]) * Math.sin(p1[1]) +
        Math.cos(p0[1]) * Math.cos(p1[1]) * Math.cos(p1[0] - p0[0]) >= 0
      );
    };

    for (const item of corridorLineStrings) {
      // Test endpoints (source and target hubs)
      const sPt = projection(item.corridor.sourceCoords);
      if (sPt && isVisibleOnGlobe(item.corridor.sourceCoords) && Math.hypot(mouseX - sPt[0], mouseY - sPt[1]) < 16) {
        return item.corridor;
      }
      const tPt = projection(item.corridor.targetCoords);
      if (tPt && isVisibleOnGlobe(item.corridor.targetCoords) && Math.hypot(mouseX - tPt[0], mouseY - tPt[1]) < 16) {
        return item.corridor;
      }

      // Test along sampled arc points
      for (let step = 0; step < item.coords.length; step += 2) {
        const pt = item.coords[step];
        if (!isVisibleOnGlobe(pt)) continue;
        const screenPt = projection(pt);
        if (screenPt && Math.hypot(mouseX - screenPt[0], mouseY - screenPt[1]) < 12) {
          return item.corridor;
        }
      }
    }
    return null;
  }, [showCorridors, corridorLineStrings, dimensions, zoomScale, panOffset, projectionMode, yaw, pitch]);

  // Pointer Interaction Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    dragInitialAnglesRef.current = { yaw, pitch };
    dragInitialPanRef.current = { ...panOffset };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !matrixData) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = rect.width ? dimensions.width / rect.width : 1;
    const scaleY = rect.height ? dimensions.height / rect.height : 1;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    if (isDraggingRef.current) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      dragDistanceRef.current = Math.hypot(dx, dy);

      if (projectionMode === "globe") {
        const sensitivity = 0.35 / zoomScale;
        const nextYaw = (dragInitialAnglesRef.current.yaw + dx * sensitivity) % 360;
        const nextPitch = Math.max(-85, Math.min(85, dragInitialAnglesRef.current.pitch - dy * sensitivity));
        setYaw(nextYaw);
        setPitch(nextPitch);
      } else {
        setPanOffset({
          x: dragInitialPanRef.current.x + dx,
          y: dragInitialPanRef.current.y + dy
        });
      }
      return;
    }

    // Hit testing for supply chain corridors
    const hitCorridor = hitTestCorridor(e.clientX, e.clientY);
    if (hitCorridor) {
      setHoveredCorridor(hitCorridor);
      setCorridorTooltipPos({ x: mouseX, y: mouseY });
      setHoverState(null);
      return;
    } else if (hoveredCorridor) {
      setHoveredCorridor(null);
      setCorridorTooltipPos(null);
    }

    // Hit testing for countries
    const baseRadius = Math.min(dimensions.width, dimensions.height) * 0.42 * zoomScale;
    const cx = dimensions.width / 2 + panOffset.x;
    const cy = dimensions.height / 2 + panOffset.y;

    let projection: GeoProjection;
    if (projectionMode === "globe") {
      projection = geoOrthographic()
        .scale(baseRadius)
        .translate([cx, cy])
        .rotate([yaw, pitch, 0])
        .clipAngle(90);
    } else {
      projection = geoNaturalEarth1()
        .scale(baseRadius * 0.65)
        .translate([cx, cy])
        .rotate([yaw, 0, 0]);
    }

    const inverted = projection.invert ? projection.invert([mouseX, mouseY]) : null;

    if (!inverted || isNaN(inverted[0]) || isNaN(inverted[1])) {
      setHoverState(null);
      return;
    }

    // In 3D mode, verify that mouse is within globe radius
    if (projectionMode === "globe") {
      const distFromCenter = Math.hypot(mouseX - cx, mouseY - cy);
      if (distFromCenter > baseRadius + 2) {
        setHoverState(null);
        return;
      }
    }

    // Find country polygon containing coordinate
    let foundCountry: CountryJurisdictionData | null = null;

    for (let i = 0; i < topoFeatures.length; i++) {
      const f = topoFeatures[i];
      if (geoContains(f, inverted)) {
        const numId = String(f.id).padStart(3, "0");
        const iso2 = matrixData.by_numeric[numId];
        if (iso2 && matrixData.countries[iso2]) {
          foundCountry = matrixData.countries[iso2];
          break;
        }
      }
    }

    if (foundCountry) {
      setHoverState({
        country: foundCountry,
        x: mouseX,
        y: mouseY
      });
    } else {
      setHoverState(null);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // If pointer was dragged to rotate the globe, do not trigger country selection
    if (dragDistanceRef.current > 6) {
      return;
    }

    // Corridor click takes precedence
    const clickedCorridor = hoveredCorridor || hitTestCorridor(e.clientX, e.clientY);
    if (clickedCorridor) {
      setSelectedCorridor(clickedCorridor);
      targetRotationRef.current = {
        yaw: -clickedCorridor.sourceCoords[0],
        pitch: Math.max(-60, Math.min(60, -clickedCorridor.sourceCoords[1] + 15))
      };
      return;
    }

    if (hoverState) {
      onSelectCountry(hoverState.country);
      return;
    }

    // Direct synchronous hit-test on click so map selection is instant
    const country = hitTestCountry(e.clientX, e.clientY);
    if (country) {
      onSelectCountry(country);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * -0.0015;
    setZoomScale((prev) => Math.max(0.7, Math.min(3.5, prev + zoomDelta)));
  };

  const handleResetOrientation = () => {
    targetRotationRef.current = { yaw: 0, pitch: -15 };
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        setYaw((prev) => (prev - 10) % 360);
        break;
      case "ArrowRight":
        e.preventDefault();
        setYaw((prev) => (prev + 10) % 360);
        break;
      case "ArrowUp":
        e.preventDefault();
        setPitch((prev) => Math.min(85, prev + 8));
        break;
      case "ArrowDown":
        e.preventDefault();
        setPitch((prev) => Math.max(-85, prev - 8));
        break;
      case "+":
      case "=":
        e.preventDefault();
        setZoomScale((prev) => Math.min(3.5, prev + 0.25));
        break;
      case "-":
      case "_":
        e.preventDefault();
        setZoomScale((prev) => Math.max(0.7, prev - 0.25));
        break;
      case "r":
      case "R":
        e.preventDefault();
        handleResetOrientation();
        break;
      case "?":
        e.preventDefault();
        setShowKeyboardHelp((prev) => !prev);
        break;
      case "Escape":
        setHoverState(null);
        setSelectedCorridor(null);
        setHoveredCorridor(null);
        setShowKeyboardHelp(false);
        break;
    }
  };

  // Dimension explanation legend items
  const legendConfig = useMemo(() => {
    switch (activeDimension) {
      case "incident_clock":
        return {
          title: "Incident Notification SLA",
          items: [
            { label: "≤ 2 Hours (Critical Fast Clock)", color: "#E05A10" },
            { label: "6 Hours", color: "#C2410C" },
            { label: "12 Hours", color: "#9A3412" },
            { label: "24 Hours (NIS2 Early Warning)", color: "#64748B" },
            { label: "72 Hours (GDPR / Standard)", color: "#475569" },
            { label: "> 72 Hours / Extended", color: "#1E293B" }
          ]
        };
      case "default_password":
        return {
          title: "Default Password Prohibition",
          items: [
            { label: "Statutory Ban (CRA / PSTI)", color: "#E05A10" },
            { label: "Discretionary / No Ban", color: "#1E293B" }
          ]
        };
      case "sbom_mandate":
        return {
          title: "Software & Cryptographic BOM Mandates",
          items: [
            { label: "Mandatory SBOM + CBOM", color: "#FFFFFF" },
            { label: "Mandatory SBOM Only", color: "#E05A10" },
            { label: "Voluntary / Unspecified", color: "#1E293B" }
          ]
        };
      case "data_localization":
        return {
          title: "Data Sovereignty & Localization",
          items: [
            { label: "Strict Local Storage Required", color: "#E05A10" },
            { label: "Sectoral Restrictions", color: "#9A3412" },
            { label: "Adequacy Safeguards", color: "#64748B" },
            { label: "Minimal Restrictions", color: "#1E293B" }
          ]
        };
      case "crypto_controls":
        return {
          title: "Cryptographic Import/Export & PQC",
          items: [
            { label: "Strict Import License / PQC", color: "#E05A10" },
            { label: "Dual-Use Export Controls (Wassenaar)", color: "#64748B" },
            { label: "Standard Commercial Crypto", color: "#1E293B" }
          ]
        };
      case "penalties":
        return {
          title: "Enforcement Severity & Liability",
          items: [
            { label: "Director Criminal Liability", color: "#E05A10" },
            { label: "Turnover ≥ 4% or Tier 1", color: "#C2410C" },
            { label: "Turnover 1% - 3%", color: "#94A3B8" },
            { label: "Fixed Fines / Discretionary", color: "#475569" }
          ]
        };
    }
  }, [activeDimension]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Interactive Sovereign Jurisdiction Map"
      className="relative w-full h-[620px] rounded-2xl overflow-hidden bg-obsidian border border-hairline shadow-2xl flex items-center justify-center select-none outline-none focus-visible:ring-2 focus-visible:ring-dutchOrange/70"
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-obsidian/90 backdrop-blur-md">
          <div className="w-10 h-10 border-2 border-dutchOrange border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs font-mono text-secondary">
            Loading Sovereign Vector Geometries & 249-Jurisdiction PostgreSQL Matrix...
          </p>
        </div>
      )}

      {/* Main Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onClick={handleClick}
        onWheel={handleWheel}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Floating Hover Card (Glassmorphism Tooltip) */}
      {hoverState && (
        <div
          style={{
            left: Math.min(dimensions.width - 290, Math.max(16, hoverState.x + 14)),
            top: Math.min(dimensions.height - 210, Math.max(16, hoverState.y + 14))
          }}
          className="absolute z-20 pointer-events-none w-72 bg-[#0B0C0E]/95 backdrop-blur-md border border-white/10 rounded-xl p-3.5 shadow-2xl transition-transform duration-75 text-xs font-mono"
        >
          <div className="flex items-start justify-between pb-2 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">
                  {hoverState.country.country_name}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/70 border border-white/10">
                  {hoverState.country.iso2} / {hoverState.country.iso3}
                </span>
              </div>
              <span className="text-[10px] text-white/60">{hoverState.country.continent} • {hoverState.country.region}</span>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-dutchOrange animate-ping" />
          </div>

          <div className="py-2 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-white/60 flex items-center gap-1">
                <Clock className="w-3 h-3 text-dutchOrange" /> Incident SLA:
              </span>
              <span className="font-bold text-white">
                {hoverState.country.incident_disclosure_hours} Hours
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white/60 flex items-center gap-1">
                <Key className="w-3 h-3 text-white/70" /> Default Passwords:
              </span>
              <span
                className={`font-semibold ${
                  hoverState.country.default_password_ban ? "text-dutchOrange" : "text-white/40"
                }`}
              >
                {hoverState.country.default_password_ban ? "Statutorily Banned" : "Discretionary"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white/60 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-white/70" /> SBOM Mandate:
              </span>
              <span
                className={`font-semibold ${
                  hoverState.country.sbom_required ? "text-white" : "text-white/40"
                }`}
              >
                {hoverState.country.sbom_required ? "Mandatory" : "Voluntary"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white/60 flex items-center gap-1">
                <Lock className="w-3 h-3 text-white/70" /> Localization:
              </span>
              <span
                className={`font-semibold ${
                  hoverState.country.data_localization_required ? "text-dutchOrange" : "text-white/70"
                }`}
              >
                {hoverState.country.data_localization_required ? "Strict / Sector" : "Adequacy Rules"}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-dutchOrange font-sans font-medium">
            <span>Click to inspect regulatory dossier</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      )}

      {/* Floating Corridor Hover Tooltip */}
      {hoveredCorridor && !selectedCorridor && corridorTooltipPos && (
        <div
          style={{
            left: Math.min(dimensions.width - 310, Math.max(16, corridorTooltipPos.x + 14)),
            top: Math.min(dimensions.height - 150, Math.max(16, corridorTooltipPos.y + 14))
          }}
          className="absolute z-20 pointer-events-none w-72 bg-[#0B0C0E]/95 backdrop-blur-md border border-[#E05A10]/40 rounded-xl p-3 shadow-2xl transition-transform duration-75 text-xs font-mono space-y-1.5 text-white animate-in fade-in zoom-in-95 duration-100"
        >
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1.5">
            <span className="text-[10px] font-mono font-semibold uppercase text-[#E05A10]">
              {hoveredCorridor.sector || "OT/Industrial"}
            </span>
            <span className="text-[10px] font-mono text-slate-300 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
              {hoveredCorridor.corridorType}
            </span>
          </div>
          <div className="text-xs font-semibold text-white leading-tight">
            {hoveredCorridor.sourceName} <span className="text-[#E05A10]">→</span> {hoveredCorridor.targetCountryName}
          </div>
          <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-400 pt-0.5">
            <div>
              SLA Delta: <span className="text-white font-bold">{hoveredCorridor.clockDeltaHours ?? 0}h</span>
            </div>
            <div>
              Customs: <span className="text-white font-bold">{hoveredCorridor.preClearanceHours ?? 3}h</span> <span className="text-slate-500">({hoveredCorridor.customsDwellRiskDays ?? 8}d)</span>
            </div>
          </div>
          <div className="text-[9px] text-[#E05A10] flex items-center justify-between pt-1 border-t border-white/5 font-sans font-medium">
            <span>Click to inspect assurance dossier</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </div>
        </div>
      )}

      {/* Floating Corridor Assurance Inspector Deck */}
      {selectedCorridor && (
        <CorridorAssuranceInspector
          corridor={selectedCorridor}
          onClose={() => setSelectedCorridor(null)}
          onFocusOrigin={(coords) => {
            targetRotationRef.current = { yaw: -coords[0], pitch: Math.max(-60, Math.min(60, -coords[1] + 15)) };
          }}
          onFocusTarget={(coords) => {
            targetRotationRef.current = { yaw: -coords[0], pitch: Math.max(-60, Math.min(60, -coords[1] + 15)) };
          }}
          onSelectCountry={(iso2) => {
            if (matrixData?.countries[iso2]) {
              onSelectCountry(matrixData.countries[iso2]);
            }
          }}
        />
      )}

      {/* Floating Canvas Controls (Zoom, Reset, Corridors, Keyboard) */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-[#0B0C0E]/90 backdrop-blur-md p-1 rounded-xl border border-white/10 shadow-xl">
        <button
          onClick={() => setZoomScale((prev) => Math.min(3.5, prev + 0.3))}
          title="Zoom In (+)"
          className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomScale((prev) => Math.max(0.7, prev - 0.3))}
          title="Zoom Out (-)"
          className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetOrientation}
          title="Reset Orientation (R)"
          className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Reset orientation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <div className="h-px bg-white/10 my-0.5" />
        {onToggleCorridors && (
          <button
            onClick={onToggleCorridors}
            title={showCorridors ? "Hide Supply Chain Corridors" : "Show Supply Chain Corridors"}
            className={`p-2 rounded-lg transition-colors ${
              showCorridors ? "text-dutchOrange bg-dutchOrange/10 border border-dutchOrange/30" : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
            aria-label="Toggle supply chain corridors"
          >
            <Workflow className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={() => setShowKeyboardHelp((prev) => !prev)}
          title="Keyboard Shortcuts (?)"
          className={`p-2 rounded-lg transition-colors ${
            showKeyboardHelp ? "text-dutchOrange bg-dutchOrange/10" : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
          aria-label="Keyboard shortcuts"
        >
          <Keyboard className="w-4 h-4" />
        </button>
      </div>

      {/* Keyboard Shortcuts Helper Modal */}
      {showKeyboardHelp && (
        <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0C0E] border border-white/10 rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-4 font-mono text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Keyboard className="w-4 h-4 text-dutchOrange" />
                <span>Keyboard Shortcuts</span>
              </div>
              <button
                onClick={() => setShowKeyboardHelp(false)}
                className="text-xs text-white/60 hover:text-white px-2 py-1 rounded hover:bg-white/10"
              >
                Close (Esc)
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Rotate / Pan Globe:</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">Arrow Keys</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Zoom In / Out:</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">+ / -</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Reset Orientation:</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">R</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Toggle Shortcuts:</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">?</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Dismiss / Clear:</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">Esc</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Floating Legend */}
      <div className="absolute bottom-4 left-4 z-20 bg-[#0B0C0E]/90 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-xl max-w-xs pointer-events-auto">
        <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-2 font-mono">
          <Layers className="w-3.5 h-3.5 text-dutchOrange" />
          <span>{legendConfig.title}</span>
        </div>
        <div className="grid grid-cols-1 gap-1 text-[10px] font-mono">
          {legendConfig.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-white/70 truncate">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mode & Navigation Tip Pill */}
      <div className="absolute top-4 left-4 z-20 bg-[#0B0C0E]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] font-mono text-white/70 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-dutchOrange animate-pulse" />
        <span>
          {projectionMode === "globe" ? "3D Rotating Globe" : "2D Natural Earth Projection"}
        </span>
        <span className="px-1.5 py-0.5 rounded bg-white/10 text-white font-semibold text-[10px] tracking-wide border border-white/10">
          50m Ultra-HD Vector Mesh
        </span>
        {showCorridors && (
          <>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-1.5 text-dutchOrange font-semibold">
              <Workflow className="w-3 h-3" />
              <span>{visibleCorridors.length} Assurance Corridors</span>
            </span>
          </>
        )}
        <span className="text-white/30">|</span>
        <span className="text-white/50 hidden sm:inline">Drag to rotate, scroll to zoom, click nation or corridor</span>
      </div>
    </div>
  );
}
