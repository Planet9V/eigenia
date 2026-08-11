# Eigenia CDT Monte Carlo Engine: Technical Investigation

The Eigenia CDT Monte Carlo Engine is a sophisticated simulation system designed to model attack paths across the 7-layer Cyber-Digital-Twin (CDT). It moves beyond synthetic data to perform real-time, weighted random walks on live Neo4j graph data, enriched by temporal signals from Postgres.

## 1. Subgraph Building (Importance-Weighted BFS)

Located in mc-importance-bfs.ts.

Instead of a uniform BFS, the engine uses an **Importance-Weighted BFS** to extract the most relevant subgraph for simulation.

### Key Logic:

- **Importance Score**: Calculated as `degree × (0.3 + EPSS) × (1 + SpectralBoost)`.
- **Anchor Nodes**: The top-20 nodes by degree (proxy for betweenness centrality) are guaranteed to be included in the subgraph.
- **SLA Fallback**: If scoring takes >3s, it falls back to a uniform BFS to ensure system responsiveness.

typescript

export function computeImportanceScore(degree: number, epssScore: number = 0, spectralBoost: number = 0): number {

    return degree * (0.3 + Math.max(0, epssScore)) * (1 + Math.max(0, spectralBoost));

}

## 2. Weighting Engine (Boltzmann & Spectral)

Located in mc-weights.ts and mc-engine.ts.

The engine assigns weights to edges based on relationship types and node properties, then uses these weights to drive path selection.

### Spectral Weighting:

- **Eigenvector Centrality**: The top-50 nodes by `eigen_rank` from Postgres (`seldon.spectral_analysis`) receive a boost (up to 1.8x).
- **Pivot Points**: These nodes represent critical junctions where an attacker is most likely to pivot.

### Boltzmann Distribution:

- Path selection uses a Boltzmann distribution where the probability of selecting an edge is `P(e) ∝ exp(weight / T)`.
- **Temperature (T)**: Controls the randomness of the walk. Higher T = more exploration (Black Swan mode).

typescript

function boltzmannSelect(edges: WeightedEdge[], temperature: number, visited: Set<string>): { edge: WeightedEdge; probability: number } | null {

    `const maxW = Math.max(...candidates.map(e => e.weight));`

    `const energies = candidates.map(e => Math.exp((e.weight - maxW) / temperature));`

    `const Z = energies.reduce((a, b) => a + b, 0);`

    `const probs = energies.map(e => e / Z);`

    `// ... weighted random selection ...`

}

### Temporal & Risk Modifiers:

- **EPSS Velocity**: Multipliers for CVEs whose exploitability probability is rapidly increasing.
- **TACAM Recency**: Boosts for active threat actor campaigns.
- **SL-T Protection**: Reduces the probability of traversing edges leading to high-security zones (IEC 62443).

## 3. Live Streaming (SSE & Generators)

Located in mc-live.ts.

The simulation is exposed via a Server-Sent Events (SSE) endpoint at `/api/mc-real/simulate/stream`, enabling real-time visualization in the frontend.

### Implementation:

- **Generators**: `sampleWalkSteps()` is a TypeScript generator that yields `WalkStep` objects for each hop.
- **Real-time Replay**: The SSE route consumes the generator, sending each step to the client with a configurable delay (`stepDelay`).
- **Data Richness**: Each step includes cumulative cost, cumulative probability, zone crossing events, and detection events.

typescript

// From mc-live.ts

const gen = sampleWalkSteps(graph, seedId, targetId, maxHops, temperature, ...);

while (true) {

    const next = gen.next();

    if (next.done) break;

    res.write(`event: walk_step\ndata: ${JSON.stringify(next.value)}\n\n`);

    if (next.value.hop > 0) await delay(stepDelay);

}

## 4. Risk & Taleb Metrics

Located in mc-engine.ts.

The engine doesn't just calculate mean cost; it analyzes the **fat-tail** of the distribution.

- **VaR/CVaR (95/99)**: Value at Risk and Conditional Value at Risk.
- **Gaussian vs Pareto**: A ratio comparing standard predictions to fat-tail reality.
- **Antifragility**: Scoring nodes based on how they respond to increased simulation temperature.
- **Barbell Score**: Measures the efficiency of defense budget concentration.

---

NOTE

The engine uses **Mulberry32** for deterministic PRNG, allowing researchers to reproduce "Black Swan" events by sharing the `rngSeed`.