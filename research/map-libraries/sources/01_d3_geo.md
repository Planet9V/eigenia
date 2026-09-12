# Source Analysis: D3.js (d3-geo, d3-zoom, topojson-client)

- **Official Repository**: https://github.com/d3/d3-geo
- **Version Evaluated**: d3-geo 3.1.0, d3-zoom 3.0.0, topojson-client 3.1.0
- **License**: ISC (Permissive Open Source)
- **Credibility**: 9.8 / 10 | **Recency**: Active (2025-2026 updates) | **Bias**: Neutral standard

## Key Capabilities

1. **Projection Engine**:
   - `d3.geoOrthographic()`: Native 3D spherical projection with adjustable clip angles (`clipAngle(90)`) for hemispheric horizon occlusion.
   - `d3.geoNaturalEarth1()` / `d3.geoMercator()`: Standard planar 2D projections.
   - Projection interpolation: D3 supports mathematical interpolation of projection coefficients or rotation transitions, permitting smooth animation between globe and flat views.
2. **Rendering Freedom**:
   - Can target SVG path elements (`<path d="...">`) or HTML5 Canvas 2D contexts (`context.beginPath()`, `geoPath.context(context)`).
   - Canvas rendering easily achieves 60fps on modern devices for drag, spin, and zoom across 249 country polygons.
3. **Zero API Key Dependency**:
   - Parses local TopoJSON or GeoJSON structures directly with no external tile servers, no token validation, and no telemetry.
4. **React 19 Hygiene**:
   - Can be encapsulated in a React component using `useRef` and `useEffect`. Since D3 operates on raw canvas or detached elements, it avoids conflicting with React's virtual DOM reconciliation.

## Limitations

- Does not include out-of-the-box volumetric 3D bar extrusion like WebGL engines, though choropleths, arcs, and surface point pins are fully supported.
- Hit-testing on Canvas requires either an offscreen color-keyed canvas or mathematical ray/distance checking (or hybrid Canvas rendering with an SVG interaction layer).
