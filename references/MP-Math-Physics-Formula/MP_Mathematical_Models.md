# CDT Mathematical Models — Complete Formula Reference

## 1. Overview

The Eigenia Cyber Digital Twin (CDT) implements 40 mathematical formulas across six computational engines. These models span the full 7-layer ontology (L0 Physical through L7 Temporal), connecting physical process dynamics to economic quantification and predictive forecasting.

The engines and their roles:

| Engine | Source File | Purpose |
|--------|-----------|---------|
| Monte Carlo Walk | `mc-engine.ts` | Boltzmann-weighted random walks on attack graphs |
| Edge Weight Composition | `mc-weights.ts` | 14-dimension edge weight calculation |
| Hawkes Cascade | `mc-hawkes.ts` | Self-exciting point process for correlated losses |
| Structural Causal Model | `mc-scm.ts` | 7-layer Pearl do-calculus propagation |
| ALE Insurance Engine | `ale-engine.ts` | Poisson-Pareto Monte Carlo for annual loss expectancy |
| ATQ Actor Scoring | `atq-migration.sql` | 8-component actor threat quotient (Postgres stored procedures) |

All formulas below are extracted directly from the production codebase.


## 2. Monte Carlo Walk Engine

### F1. Mulberry32 PRNG

Seedable 32-bit pseudorandom number generator for reproducible simulations.

**File:** `mc-engine.ts:27-36`

```typescript
export function createPRNG(seed?: number | null): () => number {
    if (seed == null) return Math.random;
    let s = seed | 0;
    return () => {
        s |= 0; s = s + 0x6D2B79F5 | 0;
        let t = Math.imul(s ^ s >>> 15, 1 | s);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
```

Output range: `[0, 1)`. When seed is null, falls back to `Math.random()`.

### F2. Boltzmann Distribution (Edge Selection)

Selects the next edge during a random walk using a Boltzmann (softmax) distribution with temperature parameter `T`.

**File:** `mc-engine.ts:320-344`

**Mathematical notation:**

$$P(e_i) = \frac{\exp(w_i / T)}{\sum_j \exp(w_j / T)}$$

Where `w_i` is the edge weight and `T` is the temperature parameter. Higher temperature = more exploration (uniform). Lower temperature = more exploitation (greedy).

```typescript
// Boltzmann: P(e) = exp(weight / T)
const maxW = Math.max(...candidates.map(e => e.weight));
const energies = candidates.map(e => Math.exp((e.weight - maxW) / temperature)); // log-sum-exp trick
const Z = energies.reduce((a, b) => a + b, 0);
const probs = energies.map(e => e / Z);
```

The log-sum-exp trick (subtracting `maxW`) prevents numerical overflow. Black swan walks use `T_bs = T * 4.0` for maximum exploration.

### F3. Pareto Sampling (Fat-Tail Cost)

Samples breach costs from a Pareto distribution for fat-tailed loss modelling.

**File:** `mc-engine.ts:348-351`

**Mathematical notation:**

$$X = x_{min} \cdot (1 - U)^{-1/\alpha}$$

Where `U ~ Uniform(0,1)`, `alpha` is the tail index, and `x_min` is the minimum loss threshold.

```typescript
function paretoSample(alpha: number, xmin: number = 100000, rng: () => number = Math.random): number {
    const u = rng();
    return xmin * Math.pow(1 - u, -1.0 / alpha);
}
```

### F4. Hill Estimator (Tail Index)

Estimates the Pareto tail index `alpha` from observed cost data using the top 10% order statistics.

**File:** `mc-engine.ts:355-366`

**Mathematical notation:**

$$\hat{\alpha} = \frac{k}{\sum_{i=1}^{k} \ln(X_{(i)} / X_{(k)})}$$

Where `X_(1) >= X_(2) >= ... >= X_(k)` are the top `k` order statistics and `k = floor(0.1 * n)`.

```typescript
function hillEstimator(data: number[]): number {
    if (data.length < 10) return 1.5; // default
    const sorted = [...data].sort((a, b) => b - a);
    const k = Math.max(5, Math.floor(data.length * 0.1)); // top 10%
    const xk = sorted[k];
    if (xk <= 0) return 1.5;
    let sum = 0;
    for (let i = 0; i < k; i++) {
        if (sorted[i] > 0 && xk > 0) sum += Math.log(sorted[i] / xk);
    }
    return sum > 0 ? k / sum : 1.5;
}
```

### F5. CVaR (Conditional Value at Risk)

The expected loss given that the loss exceeds the VaR threshold.

**File:** `mc-engine.ts:705-708`

**Mathematical notation:**

$$CVaR_\alpha = E[L \mid L \ge VaR_\alpha] = \frac{1}{|T_\alpha|} \sum_{l \in T_\alpha} l$$

Where `T_alpha = {l : l >= VaR_alpha}` is the tail set.

```typescript
const tail95 = allCosts.filter(c => c >= var95);
const cvar95 = tail95.length ? tail95.reduce((a, b) => a + b, 0) / tail95.length : 0;
const tail99 = allCosts.filter(c => c >= var99);
const cvar99 = tail99.length ? tail99.reduce((a, b) => a + b, 0) / tail99.length : 0;
```

### F6. Gaussian vs Pareto Ratio

Measures how wrong a Gaussian assumption would be. Values > 2.0 indicate the Gaussian model is dangerously inadequate.

**File:** `mc-engine.ts:776-778`

**Mathematical notation:**

$$\text{GvP Ratio} = \frac{CVaR_{99}^{actual}}{\mu + 2.33\sigma}$$

```typescript
const gaussianCvar99 = gaussianMean + 2.33 * gaussianStddev;
const gaussianVsPareto = gaussianCvar99 > 0 ? Math.round((cvar99 / gaussianCvar99) * 1000) / 1000 : 0;
```

### F7. Antifragility Score

Scores each node on a [-1, +1] scale based on its IEC 62443 Security Level Target.

**File:** `mc-engine.ts:791-795`

**Mathematical notation:**

$$\text{Antifragility}(n) = \frac{SL\text{-}T(n)}{4} \times 2 - 1$$

Scores: SL-T=0 -> -1.0 (fragile), SL-T=2 -> 0.0 (neutral), SL-T=4 -> +1.0 (antifragile).

### F8. Barbell Score

Measures defence budget concentration using coefficient of variation of cost distribution across layers. Range [0, 1].

**File:** `mc-engine.ts:814-821`

**Mathematical notation:**

$$\text{Barbell} = \min\left(1, \frac{CoV}{2}\right) \quad \text{where } CoV = \frac{\sigma_{layers}}{\mu_{layers}}$$

```typescript
const coV = lcMean > 0 ? lcStddev / lcMean : 0;
barbellScore = Math.round(Math.min(1, coV / 2) * 1000) / 1000;
```

### F9. Layer Transition Conditional Probability Table

Modifies edge weight when crossing between CDT layers using pre-calibrated transition probabilities.

**File:** `mc-engine.ts:196-201`

```typescript
const LAYER_CPT: Record<string, number> = {
    "L1->L2": 0.40, "L2->L0": 0.25, "L0->L3": 0.70, "L1->L3": 0.60,
    "L3->L5": 0.85, "L5->L4": 0.15, "L1->L6": 0.30, "L3->L7": 0.50,
    "L1->L0": 0.35, "L2->L3": 0.55, "L4->L1": 0.45, "L6->L1": 0.40,
    "L7->L5": 0.35, "L0->L2": 0.50, "L3->L4": 0.20, "L5->L7": 0.30,
};
// Edge weight adjusted: w_adjusted = w_raw * CPT[src_layer -> tgt_layer]
// Default 0.3 for unmapped transitions
```


## 3. Edge Weight Composition

### F10. 14-Dimension Edge Weight

The core weight function combines a base weight per relationship type with 14 modifier dimensions from node properties and temporal signals.

**File:** `mc-weights.ts:137-186`

**Mathematical notation:**

$$w = w_{base}(relType) \times M_{EPSS} \times M_{CVSS} \times M_{KEV} \times M_{SLT} \times M_{TACAM} \times M_{ERIKA} \times M_{\Delta EPSS} \times M_{CMS} \times M_{GPR} \times M_{Born}$$

Clamped to `[0.01, 1.0]`.

| # | Dimension | Formula | Range |
|---|-----------|---------|-------|
| 1 | Base weight | `BASE_WEIGHTS[relType]` (96 predicates mapped) | 0.10 -- 0.90 |
| 2 | EPSS score | `0.3 + 0.7 * epss_score` | 0.3 -- 1.0 |
| 3 | CVSS v3 | `0.5 + 0.5 * (cvss / 10)` | 0.5 -- 1.0 |
| 4 | KEV listed | `* 1.5` if actively exploited | 1.0 or 1.5 |
| 5 | SL-T defense | `1 - sl_target * 0.18` | 0.28 -- 1.0 |
| 6 | TACAM affinity | `0.5 + 0.5 * tacam_score` | 0.5 -- 1.0 |
| 7 | ERIKA activation | `max(0.2, erika_activation)` | 0.2 -- 1.0 |
| 8 | EPSS delta 30d | `1.0 + min(delta_30d * 3.0, 0.5)` (if > 0.02) | 1.0 -- 1.5 |
| 9 | TACAM CMS | `min(cms_multiplier, 2.0)` (if > 1.0) | 1.0 -- 2.0 |
| 10 | GPR amplifier | `1.0 + gpr_ale_modifier * 0.15` | 1.0 -- ~1.15 |
| 11 | Born probability | `max(0.3, born_prob_active)` | 0.3 -- 1.0 |
| 12 | Layer CPT | `CPT[srcLayer -> tgtLayer]` | 0.15 -- 0.90 |
| 13 | EPSS velocity boost (B1) | `1.0 + min(delta_30d * 3.0, 0.5)` | 1.15 -- 1.5 |
| 14 | Spectral boost (B3) | `1.8 - eigen_rank * 7.0` | 1.1 -- 1.8 |

```typescript
export function computeEdgeWeight(relType: string, sourceProps: NodeProps, targetProps: NodeProps): number {
    let w = BASE_WEIGHTS[relType] ?? 0.25;
    if (targetProps.epss_score != null && targetProps.epss_score > 0)
        w *= (0.3 + 0.7 * targetProps.epss_score);
    if (targetProps.cvss_v3_score != null && targetProps.cvss_v3_score > 0)
        w *= (0.5 + 0.5 * (targetProps.cvss_v3_score / 10));
    if (targetProps.kev_listed) w *= 1.5;
    if (targetProps.sl_target != null && targetProps.sl_target > 0)
        w *= (1 - targetProps.sl_target * 0.18);
    if (sourceProps.tacam_score != null && sourceProps.tacam_score > 0)
        w *= (0.5 + 0.5 * sourceProps.tacam_score);
    if (sourceProps.erika_activation != null)
        w *= Math.max(0.2, sourceProps.erika_activation);
    // ... temporal signals (F8-F11) ...
    return Math.min(1.0, Math.max(0.01, w));
}
```

### F11. EPSS Velocity Boost Map

CVEs with rising EPSS scores (delta_30d > 0.05) get boosted during walk traversal.

**File:** `mc-weights.ts:239-248`

$$\text{boost} = 1.0 + \min(\Delta EPSS_{30d} \times 3.0, \ 0.5)$$

Range: [1.15, 1.5]. Source: `seldon.epss_trajectory` (555K rows), cached 10 minutes.

### F12. TACAM Actor Recency Modifier

Maps campaign recency score to a weight modifier for actor-sourced edges.

**File:** `mc-weights.ts:296-304`

$$\text{modifier} = 0.3 + 1.2 \times \min(\text{campaign\_recency\_score}, 1.0)$$

Range: recency 0.0 (dormant) -> 0.3x, recency 1.0 (active) -> 1.5x.

### F13. Spectral Vulnerability Boost

Maps eigenvector centrality rank to a walk probability boost for critical pivot nodes.

**File:** `mc-engine.ts:174-183`

$$\text{boost} = \max(1.1, \ 1.8 - \text{eigen\_rank} \times 7.0)$$

Range: eigen_rank=0 -> 1.8x, eigen_rank=0.1 -> 1.1x. Source: `seldon.spectral_analysis`, top 50 nodes with eigen_rank < 0.1.


## 4. Hawkes Self-Exciting Process

### F14. Hawkes Intensity Function

The conditional intensity at time `t` given event history `{t_i}`.

**File:** `mc-hawkes.ts:74-88`

**Mathematical notation:**

$$\lambda(t) = \mu + \sum_{t_i < t} \alpha \cdot \exp\left(-\beta (t - t_i)\right)$$

Where:
- `mu` = background intensity (default 0.05, ~1 event per 20 hours)
- `alpha` = excitation amplitude (default 0.8)
- `beta` = decay rate (default 0.3, half-life ~2.3 hours)

```typescript
function hawkesIntensity(t: number, eventTimes: number[], mu: number, alpha: number, beta: number): number {
    let lambda = mu;
    for (const ti of eventTimes) {
        if (ti < t) {
            lambda += alpha * Math.exp(-beta * (t - ti));
        }
    }
    return lambda;
}
```

### F15. Basic Reproduction Number (R0)

The expected number of secondary infections per primary infection. If R0 > 1, the cascade grows.

**File:** `mc-hawkes.ts:294`

$$R_0 = \frac{\alpha}{\beta}$$

Default: `0.8 / 0.3 = 2.67` (supercritical -- cascades grow).

### F16. Generalized Pareto Distribution (GPD) Severity

Samples loss severity from a heavy-tailed distribution.

**File:** `mc-hawkes.ts:96-102`

**Mathematical notation:**

For shape parameter `xi > 0`:

$$X = \frac{\sigma}{\xi} \left[ (1 - U)^{-\xi} - 1 \right]$$

For `xi = 0` (exponential limit):

$$X = -\sigma \ln(1 - U)$$

```typescript
function gpdSample(xi: number, sigma: number): number {
    const u = Math.random();
    if (Math.abs(xi) < 1e-8) {
        return -sigma * Math.log(1 - u); // exponential limit
    }
    return (sigma / xi) * (Math.pow(1 - u, -xi) - 1);
}
```

Default: `xi = 0.6` (heavy tail), `sigma = 2.0` ($M scale).

### F17. Ogata Thinning Algorithm

Efficient event simulation via acceptance-rejection on the Hawkes intensity upper bound.

**File:** `mc-hawkes.ts:110-136`

1. Compute upper bound: `lambda_bar = lambda(t) + 0.01`
2. Generate candidate inter-event time: `w = -ln(U) / lambda_bar`
3. Accept with probability: `lambda(t + w) / lambda_bar`

### F18. Hawkes-SIR Cost with Intensity Boost

GPD-sampled cost is amplified by the current Hawkes intensity relative to baseline.

**File:** `mc-hawkes.ts:251-252`

$$\text{cost} = \text{GPD}(\xi, \sigma) \times \min\left(1 + \frac{\lambda(t) - \mu}{\mu}, \ 5.0\right)$$

### F19. SIR Recovery Model

Infected nodes recover with probability following an exponential CDF with rate `1/72` (72-hour MTTR).

**File:** `mc-hawkes.ts:197-205`

$$P(\text{recover by time } t) = 1 - \exp\left(-\frac{t - t_{infected}}{72}\right)$$


## 5. 7-Layer Structural Causal Model

Pearl's do-calculus implemented as layer-specific causal mechanisms. Each layer receives upstream variables and propagates downstream with exogenous noise `U ~ Uniform(0,1)`.

### F20. L0 -- Physical Process (Bernoulli Flow)

**File:** `mc-scm.ts:50-69`

$$\Delta P = (1 - v_{pos}) \times 100 \times (0.8 + U \times 0.4)$$
$$Q = v_{pos} \times 95$$
$$\Delta T = \begin{cases} \Delta P \times 0.3 & \text{if } |\Delta P| > 50 \\ 0 & \text{otherwise} \end{cases}$$
$$\text{interlock} = \begin{cases} 1 & \text{if } \Delta P > 80 \\ 0 & \text{otherwise} \end{cases}$$

### F21. L1 -- Cyber Detection (EPSS-Calibrated)

**File:** `mc-scm.ts:71-93`

$$P_{alarm} = \min\left(1, \ \frac{|\Delta P|}{100} \times 0.8 + U \times 0.1\right)$$
$$P_{exploit} = EPSS_{base} \times \left(1 + \frac{|\Delta P|}{200}\right)$$
$$t_{response} = \begin{cases} 2\text{ min} & \text{if interlock triggered} \\ 15 + U \times 30 & \text{otherwise} \end{cases}$$

### F22. L2 -- OT/ICS Isolation (IEC 62443 Zone Model)

**File:** `mc-scm.ts:95-116`

$$P_{isolate} = \text{SCADA\_alert} \times \frac{SL\text{-}T}{4} \times 0.8 + U \times 0.1$$
$$\text{conduit\_blocked} = P_{isolate} > 0.6$$
$$P_{lateral} = \begin{cases} 0.1 & \text{if blocked} \\ P_{exploit} \times 0.7 & \text{otherwise} \end{cases}$$
$$\text{defense\_effectiveness} = \frac{SL\text{-}T}{4}$$

### F23. L3 -- Organizational Impact (Business Continuity)

**File:** `mc-scm.ts:118-142`

$$t_{down} = \begin{cases} \max(2, \ t_{contain} \times 0.3) & \text{if isolated} \\ t_{contain} \times (0.5 + P_{lateral} \times 0.5) & \text{otherwise} \end{cases}$$
$$\text{production\_loss\_\%} = \min(100, \ t_{down} \times 2 + P_{lateral} \times 30)$$
$$\text{workforce\_impact} = \begin{cases} 0.8 & t_{down} > 48\text{h} \\ 0.3 & t_{down} > 8\text{h} \\ 0.05 & \text{otherwise} \end{cases}$$

### F24. L4 -- Geopolitical Propagation (Leontief Input-Output)

**File:** `mc-scm.ts:144-174`

$$P_{cascade} = \begin{cases} 0.6 + U \times 0.3 & \text{if production\_loss > 50\%} \\ \frac{\text{prod\_loss}}{100} \times 0.4 & \text{otherwise} \end{cases}$$
$$\text{geo\_amplifier} = g_{risk} \times (1 + P_{cascade} \times 0.5)$$

Where `g_risk` is the mean `g_risk_multiplier` from `public.governance_risk`.

### F25. L5 -- Economic Quantification (ALE Model)

**File:** `mc-scm.ts:176-207`

$$\text{breach\_cost} = C_{sector} \times (1 + U \times 0.5)$$
$$\text{BI\_cost} = t_{down} \times 0.015 \times \text{geo\_amp}$$
$$\text{reg\_fine} = \begin{cases} 2.5 + U \times 5 & \text{if notification required} \\ 0 & \text{otherwise} \end{cases}$$
$$\text{supply\_loss} = P_{cascade} \times C_{sector} \times 2$$
$$\text{total\_impact} = \text{breach} + \text{BI} + \text{fine} + \text{supply}$$

All values in $M. Premium multiplier: `1.3 + P_cascade * 0.7`. Insurance coverage: 60% typical.

### F26. L6 -- Psychographic Shift (ERIKA Quantum State)

**File:** `mc-scm.ts:209-230`

$$\Delta_{activation} = \begin{cases} 0.3 + U \times 0.2 & \text{if impact > \$20M} \\ \frac{\text{impact}}{100} & \text{otherwise} \end{cases}$$
$$P_{copycat} = \begin{cases} 0.4 + U \times 0.3 & \text{if impact > \$30M} \\ 0.1 & \text{otherwise} \end{cases}$$
$$\text{SE\_boost} = \begin{cases} 1.3 & \text{if } \Delta_{act} > 0.2 \\ 1.0 & \text{otherwise} \end{cases}$$

### F27. L7 -- Temporal Forecast (Seldon Prediction)

**File:** `mc-scm.ts:232-254`

$$\text{leading\_shift} = \Delta_{act} \times 0.5 + \frac{\text{impact}}{100} \times 0.3$$
$$P_{cascade}^{90d} = \min\left(1, \ 0.1 + \Delta_{act} \times 0.4 + U \times 0.1\right)$$
$$\text{seldon\_delta} = \text{leading\_shift} \times 100$$
$$\text{confidence} = 1 - U \times 0.4$$


## 6. ALE Insurance Engine

### F28. Poisson-Pareto ALE (Core Formula)

Annual Loss Expectancy via compound Poisson-Pareto Monte Carlo.

**File:** `ale-engine.ts:894-915`

**Mathematical notation:**

$$N \sim \text{Poisson}(\lambda_{adj})$$
$$L_j \sim \text{Pareto}(\alpha, x_{min})$$
$$\text{ALE} = \frac{1}{N_{sims}} \sum_{i=1}^{N_{sims}} \sum_{j=1}^{N_i} L_{ij}$$

```typescript
for (let i = 0; i < N_SIMS; i++) {
    // Poisson sampling (inverse CDF)
    let incidents = 0;
    let p = Math.exp(-adjustedFrequency);
    let cumP = p;
    const u = rng();
    while (u > cumP) {
        incidents++;
        p *= adjustedFrequency / incidents;
        cumP += p;
    }
    let totalLoss = 0;
    for (let j = 0; j < incidents; j++) {
        let loss = samplePareto(rng, sectorAlpha, sectorXmin);
        if (coverage_limit !== undefined && loss > coverage_limit) loss = coverage_limit;
        totalLoss += loss;
    }
    annualLosses[i] = totalLoss;
}
```

Default: 50,000 simulations. 17 sector-specific frequency calibrations.

### F29. Frequency Adjustment (SL-T + Posture)

**File:** `ale-engine.ts:791-794`

$$\lambda_{adj} = \lambda_{sector} \times (1 - SL\text{-}T \times 0.15) \times (1 - \text{posture} \times 0.6)$$

| SL-T | Factor | Posture | Factor |
|------|--------|---------|--------|
| 1 | 0.85 | 0.0 | 1.00 |
| 2 | 0.70 | 0.5 | 0.70 |
| 3 | 0.55 | 1.0 | 0.40 |
| 4 | 0.40 | -- | -- |

### F30. Percentile-Based Tail Shape Estimator (Pareto Alpha)

Robust alternative to the Hill estimator for mixed-magnitude datasets.

**File:** `ale-engine.ts:830-833`

$$\alpha = \frac{\ln(0.25 / 0.10)}{\ln(P_{90} / P_{75})}$$

Clamped to `[1.5, 3.0]` to guarantee finite variance.

### F31. Reporting Bias Correction (xmin)

Corrects for the fact that the threat_incidents table contains only publicly reported major incidents.

**File:** `ale-engine.ts:854-857`

$$x_{min} = \min(0.02 \times R, \ \max(50000, \ P_{10} \times 0.25))$$

Where `R` is annual revenue and `0.25` is the reporting bias factor (Romanosky 2016, Advisen).

Revenue scaling:

$$x_{min}^{scaled} = x_{min} \times \max\left(0.7, \ \frac{\log_{10}(R)}{9}\right)$$

### F32. Kolmogorov-Smirnov Goodness-of-Fit Test

Tests whether the fitted Pareto distribution adequately models the empirical tail.

**File:** `ale-engine.ts:225-268`

$$D_n = \max_i \left| F_{emp}(x_i) - F_{Pareto}(x_i) \right|$$

Where:

$$F_{Pareto}(x) = 1 - \left(\frac{x_{min}}{x}\right)^\alpha$$

P-value approximation (Marsaglia et al. 2003, simplified with Stephens correction):

$$\lambda = (\sqrt{n} + 0.12 + 0.11/\sqrt{n}) \times D_n$$
$$p \approx 2\left(e^{-2\lambda^2} - e^{-8\lambda^2} + e^{-18\lambda^2}\right)$$

Good fit if `D_n < 1.36 / sqrt(n)` at alpha=0.05.

### F33. Gordon-Loeb Optimal Security Investment

Maximum economically rational security spend.

**File:** `ale-engine.ts:978`

$$I^* = \frac{ALE}{e} \approx ALE \times 0.368$$

Based on Gordon & Loeb (2002): optimal investment never exceeds `1/e` of expected loss.

### F34. Premium Calculation

Insurance premium with risk and expense loading.

**File:** `ale-engine.ts:967-975`

$$\text{Premium} = \max\left(ALE \times 1.25 \times 1.15, \ R \times 0.0003\right)$$

Where:
- 1.25 = 25% risk margin
- 1.15 = 15% admin/acquisition costs
- Floor = 0.03% of revenue (minimum market premium)

90% confidence interval: `[P5 * 1.4375, P95 * 1.4375]`.

### F35. Y5381 War/Terrorism Exclusion

Lloyd's Market Bulletin Y5381 state-backed loss attribution.

**File:** `ale-engine.ts:706-730`

$$ALE_{Y5381} = ALE \times (1 - \text{state\_portion})$$

Where `state_portion` = cost-weighted fraction of incidents attributed to state-sponsored actors (from `seldon.actor_eic` attribution + `public.threat_incidents.nation_state_suspected`). Clamped to `[0, 0.95]`.

War exclusion applicable if `state_portion > 0.10`.

### F36. Loss Development Factors (LDF)

Fraction of ultimate loss reported at each development year, by sector.

**File:** `ale-engine.ts:283-299`

| Sector | Year 1 | Year 2 | Year 3 | Ultimate |
|--------|--------|--------|--------|----------|
| Energy | 0.60 | 0.85 | 0.95 | 1.00 |
| Healthcare | 0.45 | 0.75 | 0.90 | 1.00 |
| Financial Services | 0.50 | 0.80 | 0.92 | 1.00 |
| Manufacturing | 0.65 | 0.88 | 0.96 | 1.00 |
| Default | 0.55 | 0.82 | 0.93 | 1.00 |

Sources: Advisen cyber loss data, NetDiligence claims studies (2020-2025).

### F37. xoshiro128** PRNG (ALE Engine)

Seeded PRNG for the ALE engine (different from Mulberry32 in mc-engine).

**File:** `ale-engine.ts:366-379`

```typescript
function createRng(seed: number): () => number {
    let s0 = seed | 0 || 1;
    let s1 = (seed * 2654435761) | 0 || 1;
    let s2 = (seed * 2246822519) | 0 || 1;
    let s3 = (seed * 3266489917) | 0 || 1;
    return () => {
        const result = (((s1 * 5) << 7 | (s1 * 5) >>> 25) * 9) >>> 0;
        const t = s1 << 9;
        s2 ^= s0; s3 ^= s1; s1 ^= s2; s0 ^= s3;
        s2 ^= t;
        s3 = s3 << 11 | s3 >>> 21;
        return result / 4294967296;
    };
}
```


## 7. ATQ Actor Threat Quotient

8-component weighted scoring system computed entirely in Postgres stored procedures. Output range: 0-100 via sigmoid transformation.

### F38. ATQ Weighted Sum and Sigmoid

**File:** `atq-migration.sql:598-612`

$$Z = 1.8 C_1 + 1.4 C_2 + 1.2 C_3 + 1.0 C_4 + 0.8 C_5 + 0.7 C_6 + 0.6 C_7 + 0.5 C_8 - 4.0$$

$$ATQ = \frac{100}{1 + e^{-Z}}$$

The intercept -4.0 centres the sigmoid: `max Z = 8.0` (all C=1.0), so `Z in [-4.0, +4.0]`. Median actors (~sum 4.0) map to ATQ ~50; top actors (~sum 6.0) map to ATQ ~88.

```sql
v_z := 1.8 * v_c1 + 1.4 * v_c2 + 1.2 * v_c3 + 1.0 * v_c4
     + 0.8 * v_c5 + 0.7 * v_c6 + 0.6 * v_c7 + 0.5 * v_c8
     - 4.0;
v_atq := (1.0 / (1.0 + EXP(-v_z))) * 100.0;
```

### F38a. ATQ Confidence Interval

**File:** `atq-migration.sql:614-624`

$$\text{confidence} = \frac{\text{non-zero components}}{8}$$
$$\sigma_{ATQ} = \max(2, \ ATQ \times (1 - \text{confidence}) \times 0.3)$$
$$CI_{95\%} = [ATQ - 1.96\sigma, \ ATQ + 1.96\sigma]$$

Clamped to `[0, 100]`.

### Component Formulas (C1-C8)

#### C1: EIC Composite (L6 Psychographic)

**File:** `atq-migration.sql:178-208`

$$C_1 = \min\left(1, \ 0.40 I + 0.35 C + 0.25 O + 0.15 D\right)$$

Where `I` = intent, `C` = capability, `O` = opportunity (from `actor_eic`), `D` = Dark Triad d_factor (from `psychometric_profiles`).

#### C2: TACAM Affinity (L1-L2 Cyber-Physical)

**File:** `atq-migration.sql:213-258`

$$C_2 = \frac{\text{technique\_breadth} + \text{sector\_reach} + \text{protocol\_reach} + \text{kill\_chain\_completeness}}{4}$$

Where:
- `technique_breadth = actor_techniques / max_techniques` (across all actors)
- `sector_reach = distinct_sectors(score > 0.3) / 17`
- `protocol_reach = distinct_protocols(score > 0.3) / 12`
- `kill_chain_completeness = distinct_tactics / 14`

#### C3: Temporal Momentum (L7 Temporal)

**File:** `atq-migration.sql:283-337`

$$C_3 = 0.35 R_{campaign} + 0.25 V_{EPSS} + 0.20 V_{technique} + 0.20 R_{incident}$$

Where:
- $R_{campaign} = \exp\left(-\frac{\ln 2 \times \Delta t}{90 \text{ days}}\right)$ (half-life 90 days)
- $V_{EPSS} = \text{clamp}\left(\frac{\text{mean\_epss\_delta\_30d}}{0.05}, 0, 1\right)$
- $V_{technique} = \min\left(\frac{\text{techniques\_added\_last\_year}}{10}, 1\right)$
- $R_{incident} = \exp\left(-\frac{\ln 2 \times \Delta t}{180 \text{ days}}\right)$ (half-life 180 days)

#### C4: Incident Evidence (L5 Economic)

**File:** `atq-migration.sql:342-381`

$$C_4 = 0.40 F + 0.30 S + 0.30 K$$

Where:
- $F = \min\left(\frac{\text{count}}{20}, 1\right)$ (incidents in last 2 years)
- $S = \min(1, \ \text{pct}_{crit} \times 1.0 + \text{pct}_{high} \times 0.7 + \text{pct}_{med} \times 0.3)$
- $K = \min\left(\frac{\log_{10}(\text{total\_cost\_m} + 1)}{4}, 1\right)$

#### C5: Exploit Economics Index (L5/L7)

**File:** `atq-migration.sql:386-427`

With direct EEI data: $C_5 = \min(1, \ 0.60 \times EEI + 0.40 \times EPSS_{avg})$

With EPSS proxy: $C_5 = \min(1, \ EPSS_{avg} \times 1.5 + \frac{KEV_{count}}{CWE_{count}} \times 0.2)$

#### C6: Discourse Dynamics (L6 Psychographic)

**File:** `atq-migration.sql:431-468`

$$C_6 = \min(1, \ D_{base} + B_{bifurcation} + M_{stability})$$

Where:
- `D_base`: Hysteric=0.80, Master=0.65, Analyst=0.60, University=0.40, else=0.50
- `B_bifurcation = 0.15` if `beta_tension < 0.15` or `near_bifurcation = true`, else 0
- `M_stability = 0.10 * (1 - beta_tension)`

#### C7: Geopolitical Pressure (L4 Geopolitical)

**File:** `atq-migration.sql:472-511`

$$C_7 = \min(1, \ 0.40 T_{origin} + 0.30 T_{target} + 0.30 C_{conflict})$$

Where:
- `T_origin = max(geo_risk_score * attribution_weight)` for attribution > 0.3
- `T_target = avg(geo_risk_score * target_weight)` for target > 0.1
- `C_conflict = (conflict_exposure + state_sponsorship_likelihood) / 2` from geopolitical_field

#### C8: Kramers Barrier Penetration (L0-L2 Physics)

**File:** `atq-migration.sql:515-561`

$$C_8 = \max\left(0, \ 1 - \frac{\bar{h} \times f_{adj}}{h_{max}}\right)$$

Where `h` = barrier height, `h_max` = global max, and `f_adj` is a discourse-adjusted factor:

| Discourse | Adjustment |
|-----------|-----------|
| Hysteric | `1.0 - 0.15 * (1 - beta)` |
| University | `1.0 + 0.10 * beta` |
| Analyst | `0.95` |
| Master | `1.0` |
| Near bifurcation (beta < 0.15) | Override to `0.85` |

Low barrier = high penetration = high score (inverse relationship).


## 8. Detection Model

### F39. IEC 62443 Zone-Aware Detection Probability

Per-hop detection probability during Monte Carlo walks, accounting for zone transitions and SL-T gaps.

**File:** `mc-engine.ts:598-601`

$$P_{detect} = \min\left(0.95, \ \frac{SL\text{-}T}{4} \times 0.5 \times Z_{cross} \times G_{penalty}\right)$$

Where:
- `Z_cross = 1.3` if zone transition, `1.0` otherwise
- `G_penalty = 0.05` if `SL-T = 0` (unprotected zone, 95% detection reduction), `1.0` otherwise

```typescript
const gapPenalty = slTarget === 0 ? 0.05 : 1.0;
const pDetected = Math.min(0.95,
    (slTarget / 4) * 0.5 * (isZoneTransition ? 1.3 : 1.0) * gapPenalty
);
```


## 9. Spectral Vulnerability

See F13 above. The spectral boost map is loaded from `seldon.spectral_analysis` (refreshed every 15 minutes). Nodes with `eigen_rank < 0.1` (top 10% eigenvector centrality) are the most critical graph pivot points.


## 10. EPSS Velocity

See F11 above. EPSS velocity data is sourced from `seldon.epss_trajectory` (555,556 rows). CVEs with `delta_30d > 0.05` are flagged. The boost is applied both during edge weight computation (F10, dimension 8) and as a per-walk overlay (F11, dimension 13). Cache TTL: 10 minutes.


## 11. Formula Index

| # | Formula | File | Line | Layer |
|---|---------|------|------|-------|
| F1 | Mulberry32 PRNG | `mc-engine.ts` | 27 | -- |
| F2 | Boltzmann Distribution | `mc-engine.ts` | 320 | L1-L2 |
| F3 | Pareto Sampling | `mc-engine.ts` | 348 | L5 |
| F4 | Hill Estimator | `mc-engine.ts` | 355 | L5 |
| F5 | CVaR (Conditional VaR) | `mc-engine.ts` | 705 | L5 |
| F6 | Gaussian vs Pareto Ratio | `mc-engine.ts` | 776 | L5 |
| F7 | Antifragility Score | `mc-engine.ts` | 791 | L2 |
| F8 | Barbell Score (CoV) | `mc-engine.ts` | 814 | L5 |
| F9 | Layer CPT | `mc-engine.ts` | 196 | L0-L7 |
| F10 | 14-Dimension Edge Weight | `mc-weights.ts` | 137 | L0-L7 |
| F11 | EPSS Velocity Boost | `mc-weights.ts` | 239 | L7 |
| F12 | TACAM Recency Modifier | `mc-weights.ts` | 296 | L7 |
| F13 | Spectral Vulnerability Boost | `mc-engine.ts` | 174 | L1-L2 |
| F14 | Hawkes Intensity | `mc-hawkes.ts` | 74 | L7 |
| F15 | R0 (Reproduction Number) | `mc-hawkes.ts` | 294 | L7 |
| F16 | GPD Severity Sampling | `mc-hawkes.ts` | 96 | L5 |
| F17 | Ogata Thinning Algorithm | `mc-hawkes.ts` | 110 | L7 |
| F18 | Hawkes-SIR Cost Boost | `mc-hawkes.ts` | 251 | L5 |
| F19 | SIR Recovery Model | `mc-hawkes.ts` | 197 | L3 |
| F20 | L0 Physical Process | `mc-scm.ts` | 50 | L0 |
| F21 | L1 Cyber Detection | `mc-scm.ts` | 71 | L1 |
| F22 | L2 OT/ICS Isolation | `mc-scm.ts` | 95 | L2 |
| F23 | L3 Organizational Impact | `mc-scm.ts` | 118 | L3 |
| F24 | L4 Geopolitical Propagation | `mc-scm.ts` | 144 | L4 |
| F25 | L5 Economic Quantification | `mc-scm.ts` | 176 | L5 |
| F26 | L6 Psychographic Shift | `mc-scm.ts` | 209 | L6 |
| F27 | L7 Temporal Forecast | `mc-scm.ts` | 232 | L7 |
| F28 | Poisson-Pareto ALE | `ale-engine.ts` | 894 | L5 |
| F29 | Frequency Adjustment | `ale-engine.ts` | 791 | L5 |
| F30 | Percentile Tail Estimator | `ale-engine.ts` | 830 | L5 |
| F31 | Reporting Bias Correction | `ale-engine.ts` | 854 | L5 |
| F32 | KS Goodness-of-Fit | `ale-engine.ts` | 225 | L5 |
| F33 | Gordon-Loeb Optimal | `ale-engine.ts` | 978 | L5 |
| F34 | Premium Calculation | `ale-engine.ts` | 967 | L5 |
| F35 | Y5381 Attribution | `ale-engine.ts` | 706 | L4-L5 |
| F36 | Loss Development Factors | `ale-engine.ts` | 283 | L5 |
| F37 | xoshiro128** PRNG | `ale-engine.ts` | 366 | -- |
| F38 | ATQ Sigmoid + Weights | `atq-migration.sql` | 598 | L0-L7 |
| F38a | ATQ Confidence Interval | `atq-migration.sql` | 614 | -- |
| F39 | Detection Probability | `mc-engine.ts` | 598 | L2 |
| C1 | EIC Composite | `atq-migration.sql` | 178 | L6 |
| C2 | TACAM Affinity | `atq-migration.sql` | 213 | L1-L2 |
| C3 | Temporal Momentum | `atq-migration.sql` | 283 | L7 |
| C4 | Incident Evidence | `atq-migration.sql` | 342 | L5 |
| C5 | Exploit Economics Index | `atq-migration.sql` | 386 | L5/L7 |
| C6 | Discourse Dynamics | `atq-migration.sql` | 431 | L6 |
| C7 | Geopolitical Pressure | `atq-migration.sql` | 472 | L4 |
| C8 | Kramers Barrier | `atq-migration.sql` | 515 | L0-L2 |