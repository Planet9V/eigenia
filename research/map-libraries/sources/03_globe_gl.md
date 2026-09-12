# Source Analysis: globe.gl / three-globe (Three.js WebGL)

- **Official Repository**: https://github.com/vasturiano/globe.gl
- **Version Evaluated**: globe.gl 2.32+, react-globe.gl 2.18+
- **License**: MIT
- **Credibility**: 9.0 / 10 | **Recency**: Active | **Bias**: Community maintained

## Key Capabilities

1. **High Visual Polish for 3D Earth**:
   - Excellent ready-made atmospheric glow, custom cloud layers, polygon choropleth rendering, and animated 3D arcs.
   - Built on Three.js, offering hardware-accelerated rendering and smooth inertia rotation.
2. **Data Integration**:
   - `polygonsData`: Directly accepts GeoJSON FeatureCollection.
   - Custom HTML elements and tooltips can be anchored to geographic coordinates.

## Limitations

- **Globe-Only Paradigm**: Does not provide a first-class 2D flat earth projection. Switching to a 2D map requires destroying the Three.js canvas and switching to an entirely separate map library or writing custom shader morphing.
- **React 19 Peer Dependencies**: `react-globe.gl` has strict peer dependencies expecting React 18, generating npm warnings and requiring overrides when combined with React 19.
- **Memory Overhead**: Retaining WebGL contexts with Three.js scene graphs is heavier than a 2D HTML5 canvas.
