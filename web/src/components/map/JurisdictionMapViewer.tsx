"use client";

import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import {
  geoOrthographic,
  geoNaturalEarth1,
  geoPath,
  geoGraticule10,
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

export const DEFAULT_CORRIDORS: SupplyChainCorridor[] = [
  {
    id: "corr_rotterdam_de",
    sourceFacilityId: "fac_rotterdam",
    sourceName: "Port of Rotterdam Petrochemical Hub",
    sourceCoords: [4.4777, 51.9244],
    targetIso2: "DE",
    targetCountryName: "Germany",
    targetCoords: [10.4515, 51.1657],
    corridorType: "Component Supply",
    statutoryGate: "EU CRA Essential Entity Component Assurance",
    activeStatus: "Operational"
  },
  {
    id: "corr_tennet_nl",
    sourceFacilityId: "fac_tennet_offshore",
    sourceName: "Tennet BorWin5 Offshore HVDC Converter",
    sourceCoords: [6.5, 54.0],
    targetIso2: "NL",
    targetCountryName: "Netherlands",
    targetCoords: [5.2913, 52.1326],
    corridorType: "Grid Intertie",
    statutoryGate: "BSI IT-SiG 2.0 / Dutch Security of Network Interconnects",
    activeStatus: "Operational"
  },
  {
    id: "corr_singapore_jp",
    sourceFacilityId: "fac_singapore_jurong",
    sourceName: "Jurong Island Integrated Water & Energy Complex",
    sourceCoords: [103.7, 1.2667],
    targetIso2: "JP",
    targetCountryName: "Japan",
    targetCoords: [138.2529, 36.2048],
    corridorType: "Telemetry Relay",
    statutoryGate: "Singapore Cybersecurity Act 2024 / Japan Economic Security",
    activeStatus: "CAB Audit Pending"
  },
  {
    id: "corr_tokyo_us",
    sourceFacilityId: "fac_tokyo_otn",
    sourceName: "Tokyo-Chiba Pacific Subsea Cable Gateway",
    sourceCoords: [140.1065, 35.6074],
    targetIso2: "US",
    targetCountryName: "United States",
    targetCoords: [-95.7129, 37.0902],
    corridorType: "Subsea Transit",
    statutoryGate: "US-Japan Bilateral Critical Telecom Intercept Protection",
    activeStatus: "Operational"
  }
];

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

  // Pre-calculate Great-Circle LineStrings
  const corridorLineStrings = useMemo(() => {
    return DEFAULT_CORRIDORS.map((corridor) => {
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
        }
      };
    });
  }, []);

  // Load TopoJSON and Matrix Dataset on mount
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [topoRes, matrixRes] = await Promise.all([
          fetch("/data/world-110m.json"),
          import("@/data/jurisdictions-matrix.json")
        ]);

        const topoJson = await topoRes.json();
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

  // Color mapping logic based on statutory dimensions
  const getCountryColor = useCallback(
    (country: CountryJurisdictionData | undefined, isHighlighted: boolean, isDimmed: boolean) => {
      if (!country) return "#1e293b";

      if (isDimmed) {
        return "#131b2e";
      }

      // Filter by sector applicability if a sector is chosen
      if (activeSector !== "All" && !country.sector_applicability[activeSector]) {
        return "#1a2234";
      }

      switch (activeDimension) {
        case "incident_clock": {
          const hours = country.incident_disclosure_hours;
          if (hours <= 2) return "#ef4444"; // 1h-2h Critical Fast Clock
          if (hours <= 6) return "#f97316"; // 6h Fast Clock
          if (hours <= 12) return "#fb923c"; // 12h
          if (hours <= 24) return "#eab308"; // 24h Early Warning
          if (hours <= 72) return "#06b6d4"; // 72h Standard
          return "#64748b"; // >72h Extended
        }
        case "default_password": {
          return country.default_password_ban ? "#10b981" : "#334155";
        }
        case "sbom_mandate": {
          if (country.sbom_required && country.cbom_required) return "#8b5cf6"; // Full SBOM + CBOM
          if (country.sbom_required) return "#6366f1"; // SBOM required
          return "#334155"; // Voluntary / Discretionary
        }
        case "data_localization": {
          if (country.data_localization_required) {
            return country.localization_scope.toLowerCase().includes("all") ||
              country.localization_scope.toLowerCase().includes("strict")
              ? "#be123c"
              : "#d97706";
          }
          if (country.cross_border_transfer_mechanism.toLowerCase().includes("adequacy")) {
            return "#0284c7";
          }
          return "#334155";
        }
        case "crypto_controls": {
          if (country.crypto_import_license_required) return "#a855f7";
          if (country.crypto_export_controls.toLowerCase().includes("wassenaar")) return "#3b82f6";
          return "#475569";
        }
        case "penalties": {
          if (country.criminal_liability_directors) return "#dc2626";
          if (country.max_turnover_percentage >= 4) return "#ea580c";
          if (country.max_turnover_percentage >= 1) return "#f59e0b";
          return "#0284c7";
        }
        default:
          return "#334155";
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

      const dpr = window.devicePixelRatio || 1;
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

      // 1. Draw Globe Atmosphere Halo and Ocean Background
      if (projectionMode === "globe") {
        // Outer atmospheric rim glow
        const glowRadius = baseRadius + 14;
        const grad = ctx.createRadialGradient(cx, cy, baseRadius * 0.94, cx, cy, glowRadius);
        grad.addColorStop(0, "rgba(56, 189, 248, 0.08)");
        grad.addColorStop(0.6, "rgba(224, 90, 16, 0.06)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(cx, cy, glowRadius, 0, 2 * Math.PI);
        ctx.fillStyle = grad;
        ctx.fill();

        // Inner globe sphere
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius, 0, 2 * Math.PI);
        const oceanGrad = ctx.createRadialGradient(
          cx - baseRadius * 0.2,
          cy - baseRadius * 0.2,
          baseRadius * 0.1,
          cx,
          cy,
          baseRadius
        );
        oceanGrad.addColorStop(0, "#09101f");
        oceanGrad.addColorStop(1, "#040711");
        ctx.fillStyle = oceanGrad;
        ctx.fill();

        // Globe boundary stroke
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
        ctx.stroke();
      } else {
        // Flat earth planar subtle container
        ctx.beginPath();
        pathGenerator({ type: "Sphere" });
        ctx.fillStyle = "#070b16";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
        ctx.stroke();
      }

      // 2. Draw Graticules (Latitude / Longitude grid)
      ctx.beginPath();
      pathGenerator(geoGraticule10());
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(148, 163, 184, 0.08)";
      ctx.stroke();

      // 3. Draw Sovereign Country Polygons
      const hasHighlightList = highlightedIso2List.length > 0;

      topoFeatures.forEach((feat: any) => {
        const numId = String(feat.id).padStart(3, "0");
        const iso2 = matrixData?.by_numeric[numId];
        const country = iso2 ? matrixData?.countries[iso2] : undefined;

        const isHighlighted = Boolean(iso2 && highlightedIso2List.includes(iso2));
        const isDimmed = hasHighlightList && !isHighlighted;
        const isSelected = selectedIso2 && iso2 === selectedIso2;
        const isHovered = hoverState?.country.iso2 === iso2;

        ctx.beginPath();
        pathGenerator(feat);

        // Fill polygon
        ctx.fillStyle = getCountryColor(country, isHighlighted, isDimmed);
        ctx.fill();

        // Polygon border stroke
        if (isSelected) {
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = "#E05A10"; // Dutch orange glowing highlight
          ctx.stroke();
        } else if (isHovered) {
          ctx.lineWidth = 2;
          ctx.strokeStyle = "#38bdf8"; // Cyan highlight
          ctx.stroke();
        } else if (isHighlighted) {
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = "rgba(245, 158, 11, 0.8)"; // Amber highlight
          ctx.stroke();
        } else {
          ctx.lineWidth = 0.4;
          ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
          ctx.stroke();
        }
      });

      // 4. Draw Great-Circle Supply Chain Corridors
      const timeMs = Date.now();
      if (showCorridors && projectionMode === "globe" && corridorLineStrings.length > 0) {
        const dashOffset = (timeMs / 25) % 1000;
        corridorLineStrings.forEach(({ corridor, geoJson }) => {
          ctx.save();
          ctx.beginPath();
          pathGenerator(geoJson);
          ctx.setLineDash([8, 12]);
          ctx.lineDashOffset = -dashOffset;
          ctx.lineWidth = 2.0;
          ctx.strokeStyle =
            corridor.activeStatus === "CAB Audit Pending"
              ? "rgba(245, 158, 11, 0.85)"
              : "rgba(56, 189, 248, 0.85)";
          ctx.stroke();
          ctx.restore();
        });
      }

      // 5. Draw Facility Pins with Animated Pulse Radar
      facilityMarkers.forEach((fac) => {
        const coords = projection([fac.lng, fac.lat]);
        if (!coords) return;

        // In 3D globe mode, skip facilities around the dark side of the globe
        if (projectionMode === "globe") {
          const center = [-yaw, -pitch];
          // Check if coordinate is visible on the front facing hemisphere
          const rad = (Math.PI / 180);
          const p1 = [fac.lng * rad, fac.lat * rad];
          const p0 = [center[0] * rad, center[1] * rad];
          const cosDist =
            Math.sin(p0[1]) * Math.sin(p1[1]) +
            Math.cos(p0[1]) * Math.cos(p1[1]) * Math.cos(p1[0] - p0[0]);
          if (cosDist < 0) return; // Hidden behind horizon
        }

        const [fx, fy] = coords;

        // Pulse wave
        const pulseRatio = (timeMs % 2000) / 2000;
        const pulseRadius = 4 + pulseRatio * 14;
        const pulseOpacity = (1 - pulseRatio) * 0.7;

        ctx.beginPath();
        ctx.arc(fx, fy, pulseRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(224, 90, 16, ${pulseOpacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Pin core
        ctx.beginPath();
        ctx.arc(fx, fy, 4, 0, 2 * Math.PI);
        ctx.fillStyle = fac.criticality === "Critical" ? "#ef4444" : "#E05A10";
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "#ffffff";
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

    // Hit testing for hover
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

    // Mathematical polygon containment test
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
      if (hoverDebounceTimerRef.current) {
        clearTimeout(hoverDebounceTimerRef.current);
      }
      const targetCountry = foundCountry;
      hoverDebounceTimerRef.current = setTimeout(() => {
        setHoverState({
          x: mouseX,
          y: mouseY,
          country: targetCountry
        });
      }, 90);
    } else {
      if (hoverDebounceTimerRef.current) {
        clearTimeout(hoverDebounceTimerRef.current);
      }
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
            { label: "≤ 2 Hours (Critical)", color: "#ef4444" },
            { label: "6 Hours", color: "#f97316" },
            { label: "12 Hours", color: "#fb923c" },
            { label: "24 Hours (NIS2 Early)", color: "#eab308" },
            { label: "72 Hours (GDPR / CIRCL)", color: "#06b6d4" },
            { label: "> 72 Hours / Unspecified", color: "#64748b" }
          ]
        };
      case "default_password":
        return {
          title: "Default Password Prohibition",
          items: [
            { label: "Statutory Ban (CRA / PSTI)", color: "#10b981" },
            { label: "Voluntary / Discretionary", color: "#334155" }
          ]
        };
      case "sbom_mandate":
        return {
          title: "Software & Cryptographic BOM Mandates",
          items: [
            { label: "Mandatory SBOM + CBOM", color: "#8b5cf6" },
            { label: "Mandatory SBOM Only", color: "#6366f1" },
            { label: "Voluntary / Unspecified", color: "#334155" }
          ]
        };
      case "data_localization":
        return {
          title: "Data Sovereignty & Localization",
          items: [
            { label: "Strict Local Storage Required", color: "#be123c" },
            { label: "Sectoral (Financial/Health)", color: "#d97706" },
            { label: "Adequacy / Transfer Safeguards", color: "#0284c7" },
            { label: "Minimal Restrictions", color: "#334155" }
          ]
        };
      case "crypto_controls":
        return {
          title: "Cryptographic Import/Export & PQC",
          items: [
            { label: "Strict Import License / PQC", color: "#a855f7" },
            { label: "Dual-Use Export Controls (Wassenaar)", color: "#3b82f6" },
            { label: "Standard Commercial Crypto", color: "#475569" }
          ]
        };
      case "penalties":
        return {
          title: "Enforcement Severity & Liability",
          items: [
            { label: "Director Criminal Liability", color: "#dc2626" },
            { label: "Turnover ≥ 4% or Tier 1", color: "#ea580c" },
            { label: "Turnover 1% - 3%", color: "#f59e0b" },
            { label: "Fixed Fines / Discretionary", color: "#0284c7" }
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
          className="absolute z-20 pointer-events-none w-72 bg-cardSurface/95 backdrop-blur-md border border-cardBorder rounded-xl p-3.5 shadow-2xl transition-transform duration-75 text-xs font-mono"
        >
          <div className="flex items-start justify-between pb-2 border-b border-cardBorder">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-primary">
                  {hoverState.country.country_name}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-subtle text-muted">
                  {hoverState.country.iso2} / {hoverState.country.iso3}
                </span>
              </div>
              <span className="text-[10px] text-muted">{hoverState.country.continent} • {hoverState.country.region}</span>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-dutchOrange animate-ping" />
          </div>

          <div className="py-2 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-secondary flex items-center gap-1">
                <Clock className="w-3 h-3 text-dutchOrange" /> Incident SLA:
              </span>
              <span className="font-bold text-primary">
                {hoverState.country.incident_disclosure_hours} Hours
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary flex items-center gap-1">
                <Key className="w-3 h-3 text-emerald-400" /> Default Passwords:
              </span>
              <span
                className={`font-semibold ${
                  hoverState.country.default_password_ban ? "text-emerald-400" : "text-amber-400"
                }`}
              >
                {hoverState.country.default_password_ban ? "Statutorily Banned" : "Discretionary"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-violet-400" /> SBOM Mandate:
              </span>
              <span
                className={`font-semibold ${
                  hoverState.country.sbom_required ? "text-violet-400" : "text-muted"
                }`}
              >
                {hoverState.country.sbom_required ? "Mandatory" : "Voluntary"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-400" /> Localization:
              </span>
              <span
                className={`font-semibold ${
                  hoverState.country.data_localization_required ? "text-amber-400" : "text-sky-400"
                }`}
              >
                {hoverState.country.data_localization_required ? "Strict / Sector" : "Adequacy Rules"}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-cardBorder flex items-center justify-between text-[10px] text-dutchOrange font-sans font-medium">
            <span>Click to inspect regulatory dossier</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      )}

      {/* Floating Canvas Controls (Zoom, Reset, Corridors, Keyboard) */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-cardSurface/90 backdrop-blur-md p-1 rounded-xl border border-cardBorder shadow-xl">
        <button
          onClick={() => setZoomScale((prev) => Math.min(3.5, prev + 0.3))}
          title="Zoom In (+)"
          className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-subtle transition-colors"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomScale((prev) => Math.max(0.7, prev - 0.3))}
          title="Zoom Out (-)"
          className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-subtle transition-colors"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetOrientation}
          title="Reset Orientation (R)"
          className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-subtle transition-colors"
          aria-label="Reset orientation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <div className="h-px bg-cardBorder my-0.5" />
        {onToggleCorridors && (
          <button
            onClick={onToggleCorridors}
            title={showCorridors ? "Hide Supply Chain Corridors" : "Show Supply Chain Corridors"}
            className={`p-2 rounded-lg transition-colors ${
              showCorridors ? "text-sky-400 bg-sky-500/10" : "text-secondary hover:text-primary hover:bg-subtle"
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
            showKeyboardHelp ? "text-dutchOrange bg-dutchOrange/10" : "text-secondary hover:text-primary hover:bg-subtle"
          }`}
          aria-label="Keyboard shortcuts"
        >
          <Keyboard className="w-4 h-4" />
        </button>
      </div>

      {/* Keyboard Shortcuts Helper Modal */}
      {showKeyboardHelp && (
        <div className="absolute inset-0 z-30 bg-obsidian/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cardSurface border border-cardBorder rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-cardBorder pb-3">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Keyboard className="w-4 h-4 text-dutchOrange" />
                <span>Keyboard Shortcuts</span>
              </div>
              <button
                onClick={() => setShowKeyboardHelp(false)}
                className="text-xs text-muted hover:text-primary px-2 py-1 rounded hover:bg-subtle"
              >
                Close (Esc)
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-secondary">Rotate / Pan Globe:</span>
                <span className="px-2 py-0.5 rounded bg-subtle text-primary border border-hairline">Arrow Keys</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary">Zoom In / Out:</span>
                <span className="px-2 py-0.5 rounded bg-subtle text-primary border border-hairline">+ / -</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary">Reset Orientation:</span>
                <span className="px-2 py-0.5 rounded bg-subtle text-primary border border-hairline">R</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary">Toggle Shortcuts:</span>
                <span className="px-2 py-0.5 rounded bg-subtle text-primary border border-hairline">?</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary">Dismiss / Clear:</span>
                <span className="px-2 py-0.5 rounded bg-subtle text-primary border border-hairline">Esc</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Floating Legend */}
      <div className="absolute bottom-4 left-4 z-20 bg-cardSurface/90 backdrop-blur-md p-3 rounded-xl border border-cardBorder shadow-xl max-w-xs pointer-events-auto">
        <div className="flex items-center gap-1.5 text-xs font-bold text-primary mb-2 font-mono">
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
              <span className="text-secondary truncate">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mode & Navigation Tip Pill */}
      <div className="absolute top-4 left-4 z-20 bg-cardSurface/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cardBorder text-[11px] font-mono text-muted flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>
          {projectionMode === "globe" ? "3D Rotating Globe" : "2D Natural Earth Projection"}
        </span>
        <span className="text-hairline">|</span>
        <span className="text-secondary hidden sm:inline">Drag to rotate, scroll to zoom, click nation</span>
      </div>
    </div>
  );
}
