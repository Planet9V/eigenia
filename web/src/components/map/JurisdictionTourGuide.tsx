"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Play,
  Pause,
  CheckCircle2,
  MousePointer2
} from "lucide-react";
import { TourStep, RegulatoryDimension } from "@/types/jurisdictions";

interface Props {
  isActive: boolean;
  onClose: () => void;
  onStepChangeCamera?: (camera: { yaw: number; pitch: number; zoom: number }) => void;
  onTriggerDimension?: (dim: RegulatoryDimension) => void;
  onTriggerFacilityArchetype?: (index: number) => void;
  onOpenComparator?: () => void;
  onSelectCountryIso2?: (iso2: string) => void;
}

const TOUR_STEPS: TourStep[] = [
  {
    id: "welcome",
    stepNumber: 1,
    totalSteps: 6,
    title: "Welcome to the Sovereign Matrix",
    badge: "Sovereign Geometry",
    description:
      "Explore statutory cybersecurity, digital product assurance, and incident disclosure laws across all 249 ISO 3166-1 sovereign jurisdictions using offline TopoJSON vector geometries.",
    targetSelector: '[data-tour="map-container"]',
    targetCamera: { yaw: -10, pitch: 20, zoom: 1.0 },
    tooltipPlacement: "bottom"
  },
  {
    id: "dimensions",
    stepNumber: 2,
    totalSteps: 6,
    title: "Statutory Dimension Lenses",
    badge: "Statutory Overlays",
    description:
      "Switch between 6 regulatory dimensions including Incident Notification Clocks, Factory Default Password Bans, SBOM/CBOM mandates, and Executive Liability.",
    targetSelector: '[data-tour="dimension-bar"]',
    simulatedAction: {
      type: "select_dimension",
      dimension: "incident_clock",
      description: "Switching to Incident Notification Clock dimension"
    },
    tooltipPlacement: "bottom"
  },
  {
    id: "corridors",
    stepNumber: 3,
    totalSteps: 6,
    title: "Supply Chain Geodesic Corridors",
    badge: "Supply Chain Telemetry",
    description:
      "Examine animated great-circle geodesic flow lines connecting industrial facilities like Tennet BorWin5 and Rotterdam to international suppliers and landing points.",
    targetSelector: '[data-tour="map-container"]',
    targetCamera: { yaw: -5, pitch: 52, zoom: 1.5 },
    tooltipPlacement: "bottom"
  },
  {
    id: "simulator",
    stepNumber: 4,
    totalSteps: 6,
    title: "Component Blast Radius Simulator",
    badge: "Facility Blast Radius",
    description:
      "Evaluate how specific operational technology components trigger compliance obligations across coastal and international sovereign jurisdictions simultaneously.",
    targetSelector: '[data-tour="facility-simulator"]',
    simulatedAction: {
      type: "select_facility",
      facilityId: "subsea_valves",
      description: "Selecting Subsea Safety-Instrumented Valves archetype"
    },
    tooltipPlacement: "top"
  },
  {
    id: "comparator",
    stepNumber: 5,
    totalSteps: 6,
    title: "Bilateral Regulatory Delta Comparator",
    badge: "Bilateral Diff Engine",
    description:
      "Directly diff regulatory obligations between any two sovereign nations with live hourly disclosure gap analysis and statutory divergence flags.",
    targetSelector: '[data-tour="compare-launcher-btn"]',
    simulatedAction: {
      type: "open_comparator",
      description: "Opening Bilateral Comparator with Germany vs US benchmark"
    },
    tooltipPlacement: "bottom"
  },
  {
    id: "dossier",
    stepNumber: 6,
    totalSteps: 6,
    title: "Boardroom Dossier & Action Plan",
    badge: "Executive Memorandum",
    description:
      "Inspect the 8-tab statutory dossier for Germany, review the prioritized compliance readiness action plan, and export air-gapped JSON or print-ready briefs.",
    targetSelector: '[data-tour="map-container"]',
    simulatedAction: {
      type: "select_country",
      targetIso2: "DE",
      description: "Opening Germany statutory dossier and action plan"
    },
    targetCamera: { yaw: -10.45, pitch: -51.16, zoom: 1.4 },
    tooltipPlacement: "left"
  }
];

interface SpotlightRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function JurisdictionTourGuide({
  isActive,
  onClose,
  onStepChangeCamera,
  onTriggerDimension,
  onTriggerFacilityArchetype,
  onOpenComparator,
  onSelectCountryIso2
}: Props) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [spotlight, setSpotlight] = useState<SpotlightRect | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const step = TOUR_STEPS[currentStepIdx];

  // Measure target DOM element on step change or resize
  useLayoutEffect(() => {
    if (!isActive || !step?.targetSelector) {
      setSpotlight(null);
      return;
    }

    const updateRect = () => {
      const el = document.querySelector(step.targetSelector!) as HTMLElement | null;
      if (!el) {
        setSpotlight(null);
        return;
      }
      const rect = el.getBoundingClientRect();
      const padding = 8;
      setSpotlight({
        x: Math.max(0, rect.left - padding),
        y: Math.max(0, rect.top - padding),
        width: rect.width + padding * 2,
        height: rect.height + padding * 2
      });
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, [isActive, currentStepIdx, step?.targetSelector]);

  // Execute step camera transitions & simulated actions
  useEffect(() => {
    if (!isActive || !step) return;

    // 1. Camera Transition
    if (step.targetCamera && onStepChangeCamera) {
      onStepChangeCamera(step.targetCamera);
    }

    // 2. Simulated Action with Visual Click Ripple
    if (step.simulatedAction) {
      setIsClicking(true);
      const timer = setTimeout(() => {
        setIsClicking(false);
        if (step.simulatedAction?.type === "select_dimension" && onTriggerDimension) {
          onTriggerDimension(step.simulatedAction.dimension!);
        } else if (step.simulatedAction?.type === "select_facility" && onTriggerFacilityArchetype) {
          onTriggerFacilityArchetype(2); // Subsea valves archetype
        } else if (step.simulatedAction?.type === "open_comparator" && onOpenComparator) {
          onOpenComparator();
        } else if (step.simulatedAction?.type === "select_country" && onSelectCountryIso2) {
          onSelectCountryIso2(step.simulatedAction.targetIso2 || "DE");
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [
    isActive,
    currentStepIdx,
    step,
    onStepChangeCamera,
    onTriggerDimension,
    onTriggerFacilityArchetype,
    onOpenComparator,
    onSelectCountryIso2
  ]);

  // Auto-play timer
  useEffect(() => {
    if (!isActive || !isAutoPlaying) {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setTimeout(() => {
      if (currentStepIdx < TOUR_STEPS.length - 1) {
        setCurrentStepIdx((prev) => prev + 1);
      } else {
        setIsAutoPlaying(false);
      }
    }, 4000);

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [isActive, isAutoPlaying, currentStepIdx]);

  // Keyboard navigation for tour
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        if (currentStepIdx < TOUR_STEPS.length - 1) {
          setCurrentStepIdx((prev) => prev + 1);
        }
      } else if (e.key === "ArrowLeft") {
        if (currentStepIdx > 0) {
          setCurrentStepIdx((prev) => prev - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, currentStepIdx, onClose]);

  if (!isActive || !step) return null;

  const handleNext = () => {
    if (currentStepIdx < TOUR_STEPS.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] pointer-events-auto">
      {/* Dimmed Backdrop with Spotlight Cutout */}
      {spotlight ? (
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out"
          style={{
            position: "fixed",
            left: `${spotlight.x}px`,
            top: `${spotlight.y}px`,
            width: `${spotlight.width}px`,
            height: `${spotlight.height}px`,
            borderRadius: "14px",
            border: "2px solid rgba(224, 90, 16, 0.8)",
            boxShadow: "0 0 0 9999px rgba(3, 7, 18, 0.82)"
          }}
        >
          {/* Animated Target Cursor Ripple */}
          {isClicking && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-10 h-10 rounded-full border-2 border-dutchOrange animate-ping pointer-events-none" />
              <MousePointer2 className="w-6 h-6 text-dutchOrange animate-bounce" />
            </div>
          )}
        </div>
      ) : (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm pointer-events-none" />
      )}

      {/* Floating Tour Guidance Card */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 font-mono">
        <div className="bg-cardSurface/95 border border-dutchOrange/50 rounded-2xl p-5 shadow-2xl backdrop-blur-xl space-y-4 text-white">
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-cardBorder pb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-dutchOrange/20 border border-dutchOrange/40 text-dutchOrange text-[10px] font-bold">
                {step.badge}
              </span>
              <span className="text-xs text-muted">
                Step {step.stepNumber} of {step.totalSteps}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoPlaying((prev) => !prev)}
                title={isAutoPlaying ? "Pause Auto-Play" : "Auto-Play Tour"}
                className="p-1 rounded text-secondary hover:text-primary hover:bg-subtle transition-colors text-xs flex items-center gap-1"
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-white" />
                    <span className="text-[10px]">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-dutchOrange" />
                    <span className="text-[10px]">Auto-Play</span>
                  </>
                )}
              </button>
              <button
                onClick={onClose}
                className="px-2 py-0.5 rounded text-xs text-slate-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1"
                aria-label="Exit tour"
              >
                <X className="w-3.5 h-3.5" />
                <span className="text-[11px]">Exit Tour</span>
              </button>
            </div>
          </div>

          {/* Card Body */}
          <div className="space-y-1.5">
            <h3 className="text-sm sm:text-base font-bold text-primary font-sans">
              {step.title}
            </h3>
            <p className="text-xs text-secondary leading-relaxed font-sans">
              {step.description}
            </p>
            {step.simulatedAction && (
              <div className="pt-1 flex items-center gap-2 text-[11px] text-dutchOrange">
                <span className="w-2 h-2 rounded-full bg-dutchOrange animate-ping" />
                <span>Simulating: {step.simulatedAction.description}</span>
              </div>
            )}
          </div>

          {/* Card Footer & Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-cardBorder text-xs">
            {/* Step Dots */}
            <div className="flex items-center gap-1.5">
              {TOUR_STEPS.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentStepIdx(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentStepIdx === idx
                      ? "w-5 bg-dutchOrange"
                      : "bg-subtle hover:bg-muted"
                  }`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentStepIdx === 0}
                className={`px-2.5 py-1 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                  currentStepIdx === 0
                    ? "opacity-40 cursor-not-allowed border-hairline text-muted"
                    : "bg-subtle border-cardBorder text-secondary hover:text-primary hover:border-hairline"
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                onClick={handleNext}
                className="px-3 py-1 rounded-lg bg-dutchOrange hover:bg-dutchOrangeLight text-white font-semibold text-xs flex items-center gap-1 transition-colors shadow-md"
              >
                <span>{currentStepIdx === TOUR_STEPS.length - 1 ? "Finish" : "Next"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
