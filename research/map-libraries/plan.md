# Deep Research Plan: Interactive Map & Globe Visualization Stack

## 1. Decision & Objective

Evaluate and select the optimal open source geospatial visualization library for the Eigenia Product Assurance Network (PAN) interactive statutory jurisdiction matrix landing page.

The visualization engine must support:
1. Dual projection modes: an interactive 3D rotating globe (orthographic sphere with drag, zoom, and auto-rotation) and a 2D planar projection (flat map).
2. Smooth transition or animated projection morphing between 3D and 2D.
3. Click-to-zoom into sovereign jurisdictions with polygon boundary highlighting and country isolation.
4. Rich interactive overlays: dynamic choropleth shading across statutory criteria (incident disclosure hours, default password bans, SBOM mandates, data localization, cryptographic controls).
5. Hover tooltips displaying country name, ISO codes, primary statutes, supervisory authorities, and penalty caps.
6. Support for facility markers, industrial plant pins, and cross-border regulatory transfer flows.
7. Completely open source with zero external API key requirements (air-gapped and self-contained).
8. Full hygiene with Next.js 16 App Router and React 19 (client component boundary, zero SSR hydration mismatches).

## 2. Falsifiable Hypotheses

- **Hypothesis 1 (Projection Flexibility)**: Pure D3 (`d3-geo`, `d3-zoom`, `d3-selection`) provides superior projection morphing between spherical orthographic 3D and planar 2D without requiring dual scene graphs or context reinitialization.
- **Hypothesis 2 (Performance & Overhead)**: A hybrid Canvas-plus-SVG architecture in D3 achieves 60 frames per second interaction while maintaining smaller bundle size and zero WebGL shader compilation lag compared to Deck.gl or Three.js/globe.gl.
- **Hypothesis 3 (React 19 & Next.js Hygiene)**: High-level React wrapper packages (such as `react-simple-maps` or `react-globe.gl`) introduce peer-dependency conflicts with React 19, whereas direct modular D3 wrapped in standard React `useRef` / `useEffect` hooks remains forward-compatible.

## 3. Evaluation Criteria & Scoring Weights

| Dimension | Weight | Target Threshold |
|---|---|---|
| **2D / 3D Projection Morphing** | 25% | First-class mathematical transition between sphere and plane |
| **Performance (60fps Drag & Zoom)** | 20% | Smooth inertia, responsive hover hit-testing on 249 polygons |
| **Styling & Glassmorphism Theme** | 20% | Full CSS/Canvas control, dark palette, glowing atmosphere |
| **Air-Gapped & Zero API Keys** | 15% | Works entirely with local GeoJSON / TopoJSON, no Mapbox token |
| **React 19 / Next.js Compatibility** | 10% | Zero peer dependency warnings, clean client-component boundary |
| **Bundle Footprint** | 10% | Under 100 KB gzipped added to client bundle |

## 4. Contenders Under Investigation

1. **Option A: D3.js Modular (`d3-geo`, `d3-zoom`, `d3-selection`, `topojson-client`)**
2. **Option B: deck.gl (`@deck.gl/core`, `@deck.gl/geo-layers`, GlobeView + MapView)**
3. **Option C: globe.gl / three-globe (Three.js WebGL)**
4. **Option D: Leaflet / OpenLayers + Cesium**
5. **Option E: Apache ECharts / ECharts-GL**
