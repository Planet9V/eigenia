- "**WebSocket_Live_Data** <!-- ORPHAN-WAS: WebSocket Live Data --> <!-- ORPHAN: 2026-05-15 unresolved -->"

# Physics Models — 6 Seldon Indicators

> The Eigenia CDT uses **6 physics-inspired indicators** derived from the `seldon.psychohistory_state` PostgreSQL table. These values are read by the Seldon Score endpoint and the L6 globe layer to produce risk gauges on the CDT dashboard.

## Implementation Status Summary

| Indicator | Where Computed | Node.js Computation | Data Source |
|-----------|---------------|---------------------|-------------|
| SIR R0 | External pipeline → PG | **Data display only** | `psychohistory_state.sir_r0` |
| Kramers | External pipeline → PG | **Data display only** | `psychohistory_state.kramers_mttc_epochs`, `kramers_barrier` |
| EPSS Velocity | **Node.js (mc-weights.ts)** | Boost formula applied to MC walks | `seldon.epss_trajectory` (555K rows) |
| Granovetter | External pipeline → PG | **Data display only** | `psychohistory_state.granovetter_tau` |
| Ising | External pipeline → PG | **Data display only** | `psychohistory_state.ising_spin`, `ising_h_field` |
| Spectral | **Node.js (mc-engine.ts)** — boost only | Eigenvector boost for MC walks | `seldon.spectral_analysis` |


## 1. SIR Compartmental Model (Epidemic Spreading)

**Physics analogy:** Susceptible-Infected-Recovered epidemic model applied to vulnerability propagation.

**What it measures:** How fast a vulnerability "infects" connected systems across the OT/IT network. R0 > 15 triggers a "TIPPING" status.

**Implementation:** Data display only — no SIR computation in the application layer. The `sir_r0` and `sir_beta` columns in `seldon.psychohistory_state` are populated by an external pipeline. The application reads them via SQL aggregation:

```sql
-- From demo.ts (Seldon Score endpoint)
SELECT AVG(sir_r0) AS sir_r0
FROM seldon.psychohistory_state
WHERE computed_at > NOW() - INTERVAL '90 days'
```

**Dashboard mapping:** `modelRisk("sir_r0") = min(1, sir_r0 / 50.0)`, weight 0.20.

**Database columns:** `psychohistory_state.sir_r0`, `psychohistory_state.sir_beta`


## 2. Kramers Barrier Escape (Time-to-Exploit)

**Physics analogy:** Kramers escape rate from a potential well — the probability of a "particle" (attacker) overcoming an energy barrier (defensive control).

**What it measures:** Expected time for a known vulnerability to be exploited, given current defenses.

**Implementation:** Data display only — no Kramers computation in the application layer. The `kramers_mttc_epochs` (mean time to compromise in epochs) and `kramers_barrier` columns are populated by an external pipeline. The application reads them via:

```sql
-- From demo.ts (Seldon Score endpoint)
SELECT AVG(1.0 / NULLIF(kramers_mttc_epochs, 0)) AS kramers
FROM seldon.psychohistory_state
WHERE computed_at > NOW() - INTERVAL '90 days'
```

The Kramers barrier is also used in the ATQ scoring pipeline via `seldon.kramers_barriers` (per-actor barrier heights), queried by the `atq_c8_kramers()` stored procedure. See CDT Mathematical Models for the full barrier formula.

**Dashboard mapping:** `modelRisk("kramers") = min(1, kramers / 0.5)`, weight 0.20. Threshold: 0.40.

**Database columns:** `psychohistory_state.kramers_mttc_epochs`, `psychohistory_state.kramers_barrier`


## 3. EPSS Velocity (Exploitation Prediction)

**Physics analogy:** Velocity of a moving object — rate of change in exploitation probability.

**What it measures:** How rapidly CVEs are approaching active exploitation, based on `delta_30d` from `seldon.epss_trajectory`.

**Implementation: Computed in Node.js (mc-weights.ts).** This is the only indicator with real-time application-layer computation. Two code paths use it:

**Path 1 — MC Edge Weight Modifier (mc-weights.ts `computeEdgeWeight()`):**

```typescript
// OPT-5: EPSS trending up = more likely to be exploited soon
if (targetProps.epss_delta_30d != null && targetProps.epss_delta_30d > 0.02) {
    w *= (1.0 + Math.min(targetProps.epss_delta_30d * 3.0, 0.5)); // up to 1.5x
}
```

**Path 2 — MC Walk Boost Map (mc-weights.ts `getEpssVelocityMap()`):**

```typescript
// Fetches top 100 CVEs with delta_30d > 0.05 from seldon.epss_trajectory
// Boost factor: 1.0 + min(delta_30d * 3.0, 0.5) => range [1.15, 1.5]
const boost = 1.0 + Math.min(e.delta_30d * 3.0, 0.5);
```

The boost map is cached for 10 minutes and applied during every Monte Carlo random walk step via the `boostMaps.epssVelocity` lookup in `mc-engine.ts`.

**Data source:** `seldon.epss_trajectory` (555,556 rows), filtered to `delta_30d > 0.05`, ordered by `delta_30d DESC`, limit 100.

**Dashboard mapping:** `modelRisk("epss") = min(1, epss)`, weight 0.20. Threshold: 0.75.

**Database table:** `seldon.epss_trajectory` (columns: `cve_id`, `epss_score`, `delta_30d`, `delta_14d`, `alert_flag`)


## 4. Granovetter Cascade Threshold

**Physics analogy:** Granovetter's threshold model of collective behavior — how many "neighbors" need to adopt a behavior before cascade occurs.

**What it measures:** The cascade probability — whether a breach at one facility will cascade to connected facilities.

**Implementation:** Data display only — no Granovetter computation in the application layer. The `granovetter_tau` column in `seldon.psychohistory_state` is populated by an external pipeline. The application reads it directly:

```sql
-- From demo.ts (L6 globe layer)
SELECT AVG(ps.granovetter_tau) AS granovetter_tau
FROM seldon.psychohistory_state ps
```

The Granovetter value also comes from the `seldon_score_v2` table via the `cascade_probability` column in the Seldon Score endpoint.

**Dashboard mapping:** `modelRisk("granovetter") = min(1, value / 0.5)`, weight 0.20. Threshold: 0.35.

**Database column:** `psychohistory_state.granovetter_tau`


## 5. Ising Model (System Criticality)

**Physics analogy:** Ising model of ferromagnetism — binary spin states (secure/compromised) with nearest-neighbor coupling.

**What it measures:** The "phase transition" proximity — how close the system is to a critical point where correlated failure becomes likely.

**Implementation:** Data display only — no Ising computation in the application layer. The `ising_spin` (binary 0/1) and `ising_h_field` columns are populated by an external pipeline. The application reads them via:

```sql
-- From demo.ts (Seldon Score endpoint)
SELECT AVG(CASE WHEN ising_spin = 1
            THEN ising_h_field
            ELSE 1 - ising_h_field END) AS ising
FROM seldon.psychohistory_state
WHERE computed_at > NOW() - INTERVAL '90 days'
```

**Dashboard mapping:** `modelRisk("ising") = min(1, ising)`, weight 0.10. Threshold: 0.95.

**Database columns:** `psychohistory_state.ising_spin`, `psychohistory_state.ising_h_field`


## 6. Spectral Gap (Network Resilience)

**Physics analogy:** Spectral gap of the graph Laplacian — the difference between the first two eigenvalues of the adjacency matrix.

**What it measures:** Network connectivity resilience — a larger spectral gap means the network is more robust to node removal.

**Implementation: Partially computed in Node.js (mc-engine.ts) — boost map only.** The eigenvector centrality computation itself (populating `seldon.spectral_analysis`) is performed by an external pipeline. The application reads the results and applies a boost to Monte Carlo walk edge weights:

```typescript
// mc-engine.ts — getSpectralBoostMap()
// Top 50 nodes with eigen_rank < 0.1 (top 10% eigenvector centrality)
// Linear mapping: eigen_rank 0 => 1.8x boost, eigen_rank 0.1 => 1.1x boost
const boost = 1.8 - (n.eigen_rank * 7.0);
map.set(n.node_id, Math.max(1.1, boost));
```

The spectral boost is cached for 15 minutes and applied during MC random walk steps alongside EPSS velocity and TACAM boosts.

**Dashboard mapping:** `modelRisk("spectral_gap") = min(1, 0.05 / max(spectral, 0.001))`, weight 0.10. Threshold: 0.02 (lower = worse).

**Database:** `seldon.spectral_analysis` (columns: `node_id`, `node_type`, `eigen_rank`, `spectral_gap`), `psychohistory_state.spectral_eigen_rank`


## WebSocket Broadcast

The WebSocket at `/ws/cdt` broadcasts a `physics_update` message every 30 seconds, but it does **not** send the 6 indicator values. It sends:

```json
{
  "type": "physics_update",
  "epoch": 234,
  "seldon": {
    "epoch": "Q2-2026",
    "score": 0.82,
    "status": "TIPPING"
  },
  "incident_count": 14,
  "ts": 1746000000000
}
```

The `seldon` field comes from `seldon_gpr_temporal_signals` (GPR leading indicator), not from the 6 physics indicators. The `incident_count` comes from `cdt_sec8k_events` (SEC 8-K filings in the last 7 days). Max 200 concurrent WebSocket connections enforced.

The 6 physics indicator values are fetched on-demand by the dashboard via REST endpoints (see below), not streamed.


## API Endpoints (Actual)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/seldon/score` | GET | Seldon Score with all 6 physics gauges aggregated from `psychohistory_state` (demo.ts) |
| `/api/mc-real/reasoning/psychohistory-state` | GET | Raw `psychohistory_state` rows, optional `?customer=` filter, top 50 by attack probability (mc-reasoning.ts) |
| `/api/demo/globe-features?layer=l6` | GET | Physics per customer, geo-joined with `customer_facilities` for globe overlay (demo.ts) |
| `/ws/cdt` | WS | GPR score + incident count broadcast every 30 seconds (does **not** include the 6 indicators) |


## Database Table: `seldon.psychohistory_state`

This is the central table for all 6 physics indicators. Key columns:

| Column | Type | Indicator |
|--------|------|-----------|
| `sir_r0` | numeric | SIR R0 |
| `sir_beta` | numeric | SIR transmission rate |
| `kramers_mttc_epochs` | numeric | Kramers mean-time-to-compromise |
| `kramers_barrier` | numeric | Kramers barrier height |
| `epcs_score` | numeric | EPSS composite score |
| `granovetter_tau` | numeric | Granovetter cascade threshold |
| `ising_spin` | integer | Ising spin state (0 or 1) |
| `ising_h_field` | numeric | Ising external field strength |
| `spectral_eigen_rank` | numeric | Spectral eigenvector rank |
| `customer` | text | Customer code |
| `system_id` | text | System identifier |
| `epoch_id` | text | Epoch identifier |
| `computed_at` | timestamptz | Computation timestamp |
| `attack_prob` | numeric | Overall attack probability |
| `scvs_composite` | numeric | SCVS composite score |
| `geo_stability` | numeric | Geopolitical stability |
| `eic_net` | numeric | EIC net score |
| `psych_pressure` | numeric | Psychographic pressure |

Rows are populated by an external pipeline (not by the Node.js application). The application only reads this table.