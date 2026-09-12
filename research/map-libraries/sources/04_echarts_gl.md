# Source Analysis: Apache ECharts & ECharts-GL

- **Official Repository**: https://github.com/apache/echarts, https://github.com/ecomfe/echarts-gl
- **Version Evaluated**: ECharts 5.5+, ECharts-GL 2.0+
- **License**: Apache 2.0
- **Credibility**: 9.2 / 10 | **Recency**: Moderate updates | **Bias**: Apache Software Foundation

## Key Capabilities

1. **Integrated Charting and Mapping**:
   - `globe`: 3D globe component with lighting, atmosphere, and surface texture mapping.
   - `geo`: 2D planar map component with built-in choropleth data ranges via `visualMap`.
2. **Configuration Driven**:
   - Declarative option objects declare colors, tooltips, and series.

## Limitations

- **Dual Engine Disconnect**: ECharts treats `globe` (WebGL) and `geo` (SVG/Canvas) as distinct coordinate systems. Transitioning between them requires resetting the chart instance rather than smoothly interpolating coordinates.
- **Limited Custom Micro-Interactions**: Custom SVG animations, pulse markers, and tailored glassmorphism borders are difficult to achieve within ECharts' rigid canvas rendering loops.
