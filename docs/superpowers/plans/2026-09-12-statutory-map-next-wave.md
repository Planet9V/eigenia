# Next-Wave Enhancements Implementation Plan: Global Statutory Jurisdiction Matrix

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the Next-Wave enhancements for the Global Statutory Jurisdiction Matrix at `/jurisdictions`, introducing an interactive guided tour with visual click-and-go demonstrations, bilateral regulatory delta comparator, animated supply chain corridor flow lines on the 3D globe, actionable compliance checklists in the regulatory drawer, keyboard navigation, and air-gapped boardroom memorandum export.

**Architecture:** Extend the existing D3 Canvas dual-projection engine (`JurisdictionMapViewer.tsx`) to render animated great-circle geodesic flow lines using `d3.geoInterpolate` and Canvas `lineDashOffset` at 60fps. Add an interactive 6-step showcase tour (`JurisdictionTourGuide.tsx`) with spotlight camera jumps and simulated visual clicks, a bilateral regulatory comparator modal (`BilateralComparatorModal.tsx`), an operational compliance checklist in `JurisdictionDossierDrawer.tsx`, keyboard event listeners, and native print/JSON export capabilities.

**Tech Stack:** React 19.0.0, Next.js 16.3.4, TypeScript 5.7.3, D3.js (`d3-geo`, `d3-zoom`, `d3-selection`), Tailwind CSS 3.4.17, Lucide React 0.475.0, Framer Motion 11.18.2.

## Global Constraints

- **Zero Em Dashes**: Never use the em dash character (`—`) in code, comments, or UI text. Use colons, parentheses, or spaced en dashes (` - `) instead.
- **Zero AI Banned Words**: Avoid `furthermore`, `moreover`, `delve`, `pivotal`, `tapestry`, `beacon`, `vital`, `crucial`, `cutting-edge`, `revolutionize`, `leverage`, `utilize`.
- **Terminology Registry**: Use "Cryptography Bill of Materials" or "CBOM", never "Component BOM". Use "Working Group", never "workstream".
- **Zero External API Keys / Air-Gapped**: 100% offline local TopoJSON vector geometries (`world-110m.json`) and pre-compiled PostgreSQL datasets. No Mapbox tokens, no external tile CDNs, no external PDF generator libraries.
- **60fps Performance Invariant**: Canvas great-circle arcs must compute path geometry on country/facility selection and animate via Canvas `setLineDash` and `lineDashOffset`.
- **Full Audit Gate Compliance**: All 10 web audit scripts in `web/scripts/run-audits.mjs` must pass with zero defects.

---

## Component Architecture Overview

```
web/src/
├── types/
│   └── jurisdictions.ts               # Extended with CorridorArc, ComparisonDelta, TourStep types
├── components/
│   └── map/
│       ├── JurisdictionMapViewer.tsx     # Enhanced with animated great-circle arcs and keyboard shortcuts
│       ├── MapControlBar.tsx             # Enhanced with Tour trigger, Compare button, and Keyboard badge
│       ├── JurisdictionDossierDrawer.tsx # Enhanced with Compliance Readiness Checklist and Print/JSON Export
│       ├── BilateralComparatorModal.tsx  # [NEW] Dual-country differential compliance comparator
│       ├── JurisdictionTourGuide.tsx     # [NEW] 6-step guided interactive walkthrough with visual click-and-go
│       └── FacilityImpactSimulator.tsx   # Preserved and linked to supply chain corridors
└── app/
    └── jurisdictions/
        └── page.tsx                      # Parent page coordinating comparator, tour state, and map view
```

---

## Tasks

### Task 1: Type Definitions & Supply Chain Corridor Datasets

**Files:**
- Modify: `web/src/types/jurisdictions.ts`

**Interfaces:**
- Produces: `SupplyChainCorridor`, `ComplianceActionItem`, `BilateralComparisonDelta`, `TourStep`

- [ ] **Step 1: Write type definitions for corridors, comparator, and tour**

Extend `web/src/types/jurisdictions.ts` with:
```typescript
export interface SupplyChainCorridor {
  id: string;
  sourceFacilityId: string;
  sourceName: string;
  sourceCoords: [number, number]; // [lng, lat]
  targetIso2: string;
  targetCountryName: string;
  targetCoords: [number, number]; // [lng, lat]
  corridorType: "Component Supply" | "Telemetry Relay" | "Grid Intertie" | "Subsea Transit";
  statutoryGate: string;
  activeStatus: "Operational" | "CAB Audit Pending";
}

export interface ComplianceActionItem {
  id: string;
  priority: "High" | "Medium" | "Standard";
  title: string;
  statuteRef: string;
  timeframe: string;
  actionRequired: string;
  category: "Access Control" | "Software Assurance" | "Incident Response" | "Data Residency";
}

export interface BilateralComparisonDelta {
  dimension: string;
  label: string;
  countryAValue: string | number | boolean;
  countryBValue: string | number | boolean;
  deltaText: string;
  divergenceLevel: "Aligned" | "Moderate" | "Critical";
}

export interface TourStep {
  id: string;
  stepNumber: number;
  totalSteps: number;
  title: string;
  badge: string;
  description: string;
  targetSelector?: string;
  targetCamera?: {
    yaw: number;
    pitch: number;
    zoom: number;
  };
  simulatedAction?: {
    type: "click" | "select_dimension" | "select_facility" | "select_country" | "open_comparator";
    targetIso2?: string;
    dimension?: RegulatoryDimension;
    facilityId?: string;
    description: string;
  };
  tooltipPlacement: "bottom" | "top" | "left" | "right" | "center";
}
```

- [ ] **Step 2: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: PASS (0 errors)

- [ ] **Step 3: Commit Task 1**

```bash
git add web/src/types/jurisdictions.ts
git commit -m "feat(types): add supply chain corridor, comparator, and tour interfaces"
```

---

### Task 2: Great-Circle Geodesic Corridor Arcs & Keyboard Navigation in `JurisdictionMapViewer.tsx`

**Files:**
- Modify: `web/src/components/map/JurisdictionMapViewer.tsx`
- Consumes: `SupplyChainCorridor` from `web/src/types/jurisdictions.ts`
- Uses: `d3.geoInterpolate`, `ctx.setLineDash`, `ctx.lineDashOffset`

**Interfaces:**
- Produces: Visual animated arcs connecting facilities to international suppliers and landing points.
- Produces: Keyboard controls for arrow rotation, zoom (+/-), space pause, and reset.

- [ ] **Step 1: Define realistic industrial supply chain corridors**

Add corridor constants anchored to the existing facility presets:
1. `Port of Rotterdam` (NL) -> Germany (DE) Siemens Energy Turbine Relay.
2. `Tennet BorWin5 Offshore HVDC` (DE) -> Netherlands (NL) TenneT TSO grid interconnection.
3. `Jurong Island Integrated Water` (SG) -> Japan (JP) Yokogawa DCS supplier corridor.
4. `Tokyo-Chiba Pacific Subsea Gateway` (JP) -> United States (US) trans-pacific fiber landing.

- [ ] **Step 2: Implement pre-computed geodesic paths using `d3.geoInterpolate`**

```typescript
const corridorLineStrings = useMemo(() => {
  return corridors.map((corridor) => {
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
}, [corridors]);
```

- [ ] **Step 3: Render animated dashed flow lines in canvas loop**

In the canvas render loop:
```typescript
if (showCorridors && corridorLineStrings.length > 0 && projectionMode === "globe") {
  const dashOffset = (Date.now() / 25) % 1000;
  corridorLineStrings.forEach(({ corridor, geoJson }) => {
    ctx.save();
    ctx.beginPath();
    pathGenerator(geoJson);
    ctx.setLineDash([8, 12]);
    ctx.lineDashOffset = -dashOffset;
    ctx.lineWidth = 2.0;
    ctx.strokeStyle = corridor.activeStatus === "CAB Audit Pending"
      ? "rgba(245, 158, 11, 0.85)"
      : "rgba(56, 189, 248, 0.85)";
    ctx.stroke();
    ctx.restore();
  });
}
```

- [ ] **Step 4: Implement keyboard event listeners and debounced hover state**

- Add keyboard navigation (`ArrowKeys` rotate, `+/-` zoom, `Space` pause spin, `Esc` dismiss).
- Add 120ms debounce on pointer move to eliminate flickering hover cards.

- [ ] **Step 5: Verify Canvas 60fps rendering and compilation**

Run: `npx tsc --noEmit`
Expected: PASS (0 errors)

- [ ] **Step 6: Commit Task 2**

```bash
git add web/src/components/map/JurisdictionMapViewer.tsx
git commit -m "feat(map): render animated great-circle corridors and add keyboard navigation"
```

---

### Task 3: Bilateral Regulatory Delta Comparator Modal

**Files:**
- Create: `web/src/components/map/BilateralComparatorModal.tsx`
- Modify: `web/src/components/map/MapControlBar.tsx`
- Modify: `web/src/app/jurisdictions/page.tsx`

**Interfaces:**
- Consumes: `CountryJurisdictionData[]`
- Produces: Interactive side-by-side comparison between Country A and Country B.

- [ ] **Step 1: Create `BilateralComparatorModal.tsx`**

Build a clean, high-contrast side-by-side comparison modal:
- Dual country selectors with quick presets:
  - Preset 1: Germany (EU NIS2/CRA) vs United States (CIRCIA/NERC CIP)
  - Preset 2: Netherlands (CRA/NIS2) vs Singapore (Cybersecurity Act 2024)
  - Preset 3: United Kingdom (PSTI) vs Japan (APPI/Economic Security)
- Comparative Delta Grid:
  - Incident Disclosure Clock: Direct hourly delta (e.g. 24h vs 72h) with early notification flag.
  - Default Passwords: Statutory ban alignment (Both Banned vs Discretionary).
  - Software & Cryptographic BOMs: SBOM/CBOM mandatory requirement diff.
  - Data Sovereignty: Strict Local Storage vs Adequacy vs Sectoral restrictions.
  - Cryptographic Controls: Import licensing & PQC roadmap comparison.
  - Maximum Fines: Turnover percentage threshold comparison (e.g. 2% vs 4% or fixed fine ceilings).
  - Cross-Sector Applicability: Side-by-side checkmarks for Energy, Water, Healthcare, OT, Telecom, Finance, Transport.

- [ ] **Step 2: Add "Compare Jurisdictions" button to `MapControlBar.tsx` and header**

- [ ] **Step 3: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: PASS (0 errors)

- [ ] **Step 4: Commit Task 3**

```bash
git add web/src/components/map/BilateralComparatorModal.tsx web/src/components/map/MapControlBar.tsx web/src/app/jurisdictions/page.tsx
git commit -m "feat(map): build bilateral regulatory delta comparator modal"
```

---

### Task 4: Compliance Action Plan Checklist & Boardroom Export in `JurisdictionDossierDrawer.tsx`

**Files:**
- Modify: `web/src/components/map/JurisdictionDossierDrawer.tsx`

- [ ] **Step 1: Generate country-tailored Actionable Compliance Checklist**

Based on the active country's PostgreSQL statutory data, generate a deterministic 4-item checklist on the Overview tab:
1. **Default Password Ban**: If `default_password_ban === true`, flag: "Phase out factory default passwords on all level 1-2 OT controllers before enforcement deadline."
2. **SBOM & CBOM Generation**: If `sbom_required === true`, flag: "Generate ECMA-424 CycloneDX 1.6+ machine-readable Bill of Materials covering software and post-quantum cryptographic primitives."
3. **Breach Notification Protocol**: If `incident_disclosure_hours <= 24`, flag: `Establish ${incident_disclosure_hours}h CSIRT statutory notification protocol with supervisory authority ${supervisory_dpa || "National CSIRT"}.`
4. **Data Sovereignty Safeguards**: If `data_localization_required === true`, flag: `Review data storage contracts against ${country_name} localized residency rules.`

- [ ] **Step 2: Add Air-Gapped Export Buttons (JSON & Native Print View)**

- **Export JSON**: Exports the full structured profile (`iso2`, `statutory_frameworks`, `cyber_security_mandates`, `incident_disclosure_rules`, `penalty_structures`, `sector_applicability`) as a formatted JSON file download.
- **Print Executive Memo**: Triggers `window.print()` with dedicated `@media print` styling that formats the dossier into a crisp, monochrome executive memorandum with letterhead and legal citations.

- [ ] **Step 3: Verify zero external PDF dependencies and audit gates**

Run: `npx tsc --noEmit && npm run audit`
Expected: PASS

- [ ] **Step 4: Commit Task 4**

```bash
git add web/src/components/map/JurisdictionDossierDrawer.tsx
git commit -m "feat(drawer): add compliance readiness checklist and air-gapped memorandum export"
```

---

### Task 5: Interactive 6-Step Guided Showcase Tour (`JurisdictionTourGuide.tsx`)

**Files:**
- Create: `web/src/components/map/JurisdictionTourGuide.tsx`
- Modify: `web/src/app/jurisdictions/page.tsx`

**Interfaces:**
- Manages an interactive onboarding tour that guides the user through the showcase step-by-step with camera flight, spotlight cards, and visual click-and-go simulations:

- [ ] **Step 1: Create `JurisdictionTourGuide.tsx`**

Tour Steps:
1. **Welcome to the Sovereign Jurisdiction Matrix**:
   - Camera: Centered on North Atlantic / Europe `[yaw: -10, pitch: 20, zoom: 1.0]`.
   - Explains the 249-nation statutory coverage and air-gapped TopoJSON engine.
2. **Regulatory Dimension Overlays**:
   - Highlights the 6 dimension buttons on `MapControlBar`.
   - Simulates click on "Incident Clocks" (`incident_clock`) to reveal 1h-96h disclosure windows.
3. **Critical Infrastructure Facility Corridors**:
   - Camera: Centers on Western Europe `[yaw: -5, pitch: 52, zoom: 1.6]`.
   - Highlights Tennet BorWin5 and Rotterdam facilities with animated supply chain corridor arcs.
4. **Facility Impact Assessment**:
   - Highlights the Facility Impact Simulator.
   - Simulates selecting "Safety-Instrumented Subsea Valves" and highlights affected nations globally.
5. **Bilateral Regulatory Delta**:
   - Highlights and opens the Bilateral Comparator modal with Germany vs United States preset.
6. **Deep Statutory Dossier & Compliance Action Plan**:
   - Selects Germany, opens the slide-over dossier drawer, and highlights the prioritized compliance checklist and export buttons.

- [ ] **Step 2: Connect Tour Camera, Click-and-Go Ripple, and Selection Callbacks**

Provide Next / Back / Skip buttons, step progress dots `1 of 6`, and animated target cursor ring (`tour-cursor-pulse`).

- [ ] **Step 3: Add "Launch Interactive Tour" button to hero section and control bar**

- [ ] **Step 4: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: PASS (0 errors)

- [ ] **Step 5: Commit Task 5**

```bash
git add web/src/components/map/JurisdictionTourGuide.tsx web/src/app/jurisdictions/page.tsx
git commit -m "feat(tour): implement interactive step-by-step guided showcase tour"
```

---

### Task 6: Comprehensive Verification & Visual Proof

**Files:**
- Modify: `scripts/jurisdictions/verify_map_visuals.py`
- Test: Full verification suite (`npm run verify`) and visual screenshot capture.

- [ ] **Step 1: Update Playwright script to verify all Next-Wave features**

Verify:
- Guided tour launches, advances steps, and closes cleanly.
- Bilateral comparator opens with Germany vs US preset and renders delta table.
- Great-circle corridor arcs render on the canvas.
- Compliance checklist displays in the dossier drawer.
- JSON export generates valid data blob.

- [ ] **Step 2: Run verification script and capture screenshot artifacts**

Run: `python3 scripts/jurisdictions/verify_map_visuals.py`
Expected: Capture screenshots of Tour Spotlight, Bilateral Comparator, and Corridor Arcs.

- [ ] **Step 3: Run full automated verification suite**

Run: `npm run verify` in `web/`
Expected:
- `npm run sync`: 0 errors
- `tsc --noEmit`: 0 errors
- `npm run audit`: 10 passing, 0 frozen, 0 skipped
- `npm run test:run`: 20/20 unit tests pass

- [ ] **Step 4: Update `walkthrough.md` and commit final changes**

```bash
git add web/ scripts/ docs/
git commit -m "feat(jurisdictions): complete next-wave enhancements with tour, comparator, and corridor arcs"
```
