# Source Analysis: deck.gl (Uber Open Source WebGL Engine)

- **Official Repository**: https://github.com/visgl/deck.gl
- **Version Evaluated**: deck.gl 9.0+
- **License**: MIT
- **Credibility**: 9.5 / 10 | **Recency**: Active (2025-2026) | **Bias**: Industry-backed (Uber/Vis.gl)

## Key Capabilities

1. **Dual Views**:
   - Offers `_GlobeView` for 3D planetary rendering and `MapView` for 2D cartographic projections.
   - GPU-accelerated rendering capable of displaying millions of points, polygonal boundaries, and flow arcs at 60fps.
2. **Layer Abstraction**:
   - `GeoJsonLayer`: Direct rendering of polygon choropleths, stroke outlines, and property styling.
   - `ScatterplotLayer` / `ArcLayer`: Renders plant pins, cross-border cryptographic flows, and facility markers.
3. **Open Source Base**:
   - Can run standalone without Mapbox tokens by supplying non-tiled GeoJSON or open raster tile endpoints.

## Limitations

- **Experimental Status**: The documentation notes that `_GlobeView` remains experimental and does not support full camera transitions between Globe and Flat views without tearing or re-instantiating viewport states.
- **Heavy Footprint**: `@deck.gl/core` + `@deck.gl/layers` + `@deck.gl/geo-layers` adds over 1.2 MB to the JavaScript bundle.
- **Custom Shader Styling**: Custom glow and atmosphere shaders require deep luma.gl / WebGL programming rather than declarative CSS.
