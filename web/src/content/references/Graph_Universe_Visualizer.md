# Engine: Graph Universe Visualizer

## Overview
The **Graph Universe Visualizer** (implemented as `GraphUniverse.tsx`) provides an immersive, 3D interface for exploring the complexity of the Seldon knowledge graph. It is designed to help analysts identify "Hidden Links" and "Spectral Clusters" within the 69M-edge intelligence fabric.

## Visualization Modes

### 1. The Global Universe
An unbounded 3D space where nodes are clustered using a **Force-Directed Layout**:
- **Clustering**: Nodes are grouped by semantic similarity (e.g., all actors using similar malware families).
- **Physics**: Real-time simulation of node repulsion and edge attraction to reveal the natural structure of the data.
- **Traversal**: Users can "fly" through the graph, expanding neighbors and following links between disparate entities.

### 2. Facility Model View (`FacilityModel.tsx`)
A specialized graph view that maps the logical and physical connections within a single facility:
- **Topological Overlay**: Visualizing how data flows from the Corporate IT network down to the Layer 1 physical devices.
- **Vulnerability Heatmap**: Nodes are colored based on their CVE density or "Exploitability Index."
- **Path Highlighting**: Automatically identifying the "Shortest Path" for an actor to move from a guest Wi-Fi entry point to a critical PLC.

### 3. Kill Chain Theater (`KillChainTheater.tsx`)
A time-sequenced visualization of specific attack narratives:
- **Event Sequence**: Replaying a historical or simulated incident step-by-step.
- **Impact Propagation**: Visualizing how a compromise in one subsystem cascades into others.
- **Narrative Overlay**: Integrated text and audio commentary explaining the actor's motivation and technique at each stage of the chain.

## Technical Implementation
- **Rendering Engine**: `react-force-graph-3d` (Three.js based).
- **GPU Acceleration**: Utilizes hardware-accelerated shaders for high-performance rendering of 10,000+ simultaneous nodes.
- **Direct Cypher Integration**: The visualizer sends raw Cypher queries to the Neo4j backend and parses the results into a reactive graph state.

## Interaction Patterns
- **Right-Click Expansion**: Clicking any node triggers an asynchronous fetch of all its neighbors from Neo4j.
- **Spectral Filters**: Toggling visibility of nodes based on their "Betweenness Centrality" or "PageRank" importance.
- **Node Pinning**: Allowing analysts to "freeze" specific nodes in space while exploring the surrounding topology.