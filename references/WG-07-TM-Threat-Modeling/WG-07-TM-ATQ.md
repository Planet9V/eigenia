# The Actor Threat Quotient (ATQ)
## Eigenia's 12-Factor Formula That Scores Every Threat Actor on Earth

---

*Your firewall doesn't care who's attacking. Your board does.*

*The ATQ tells them.*

---

### A Number That Means Something

Cybersecurity has a measurement problem. Ask a CISO to rank their top five threat actors and you'll get a list sorted by brand recognition — Lazarus Group sounds scarier than Ember Bear. Ask them to quantify *how much* scarier, and the conversation collapses into adjectives: "sophisticated," "persistent," "well-resourced."

Adjectives don't survive a board meeting. Numbers do.

The **Actor Threat Quotient (ATQ)** is a single composite score, 0 to 100, that measures how dangerous a specific threat actor is right now. It is computed from a materialized view against live data (`seldon.seldon_score_v2`), fed by 77,279 TACAM rows, 555,556 EPSS trajectory records, 79,376 knowledge graph edges, and 35,341 geopolitical events.

When Volt Typhoon scores 78.6 and Kimsuky scores 68.0, the 10.6-point gap isn't an opinion. It's a measurement. You can decompose it into twelve weights, check it against source data, and compare it across time via snapshot epochs.

---

### The Twelve Dimensions

The ATQ is not a black box. Every point is traceable to a specific component, a specific weight, and a specific data source. Here is the formula that runs in production:

| # | Component | Weight | What It Measures | Data Source | Saturation Threshold |
|---|-----------|--------|-----------------|-------------|---------------------|
| 1 | **EIC Score** | 18% | Intent, Capability, and Opportunity -- the base threat actor assessment | `seldon.actor_eic` (178 profiled actors) | Percentile-ranked (PERCENT_RANK) for maximum spread |
| 2 | **Kill Chain Completeness** | 14% | What fraction of the 14 MITRE ATT&CK enterprise tactics can this actor execute? | `tacam_ttp_clusters` (1,579 rows) | tactic_count ÷ 14 |
| 3 | **Temporal Threat Score** | 13% | Campaign recency, operational tempo, dormancy detection | `tacam_temporal_clusters` (173 profiles) | 0–1 (pre-normalised) |
| 4 | **EPSS Base** | 10% | Average exploit probability across this actor's known CVEs | EPSS daily feed (341,000+ CVEs) | mean_epss × 5, cap 1.0 |
| 5 | **Technique Reach** | 10% | How many distinct MITRE techniques are in the actor's arsenal? | KG `USES_TECHNIQUE` (4,413 edges) | technique_reach ÷ 120 |
| 6 | **Vendor Exposure** | 10% | How many distinct vendors' products can this actor exploit? | `tacam_cpe_clusters` (62,965 rows) | vendor_count ÷ 50 |
| 7 | **Sector Reach** | 5% | How many CISA critical infrastructure sectors does this actor target? | KG `TARGETS_SECTOR` (2,278 edges) | sector_reach ÷ 15 |
| 8 | **Protocol Reach** | 5% | How many OT/ICS protocols can this actor exploit? | KG `TARGETS_PROTOCOL` (627 edges) | protocol_reach ÷ 10 |
| 9 | **Incident Count** | 5% | How many attributed cyber incidents are in the historical record? | Curated incidents (2,305 events) | incident_count ÷ 20 |
| 10 | **Campaign Recency** | 5% | How recently was this actor's last known campaign? | `tacam_temporal_clusters` | 0–1 (pre-normalised) |
| 11 | **EPSS Velocity** | 5% | Are this actor's CVEs becoming *more* exploitable over time? | EPSS trajectory (555,556 records) | epss_velocity × 100, cap 1.0 |
| 12 | **Geopolitical Tension** | 5% | Is this actor backed by a state currently engaged in conflict or under sanctions? | `seldon.geopolitical_field` + ACLED | MAX(geo_field_value), cap 1.0 |

**Total weight**: 100% = ATQ score (0–100)

---

### Why Twelve — Not Three

The original Seldon Score V1 used three inputs: a static "EIC" assessment, a capability estimate, and an intent estimate. The result was a range of 2.9 points across the top 30 actors — all of them wedged between 80.3 and 83.2.

That's not a score. That's a tie.

The V2 reform spread the top 10 from 2.9 points to **10.6 points**, a 3.7× gain in discriminatory power. The fix was adding nine independent dimensions that each reveal something the others miss:

```
Old system (3 components):
  Lazarus Group:  83.2 ─┐
  Volt Typhoon:   82.9  │  2.9 point
  APT28:          80.5  │  spread
  Mustang Panda:  80.3 ─┘  (meaningless)

New system (12 components):  
  Volt Typhoon:   78.6 ─┐
  Dragonfly:      76.2  │
  Lazarus Group:  76.0  │  10.6 point
  APT29:          73.6  │  spread
  Ember Bear:     73.4  │  (actionable)
  Kimsuky:        68.0 ─┘
```

Notice that Volt Typhoon **overtook** Lazarus Group after the reform. The old EIC-heavy formula rewarded historical volume (Lazarus has more incidents). The new formula rewards *current operational posture*. Volt Typhoon is pre-positioned in US energy infrastructure right now, with rising EPSS velocity on its preferred CVEs and active geopolitical tension behind it.

That's the difference between a threat intelligence score and a threat intelligence *prediction*.

---

### The Art of Saturation Thresholds

The design decision that matters most in the ATQ isn't the weights. It's the **saturation thresholds**. A threshold defines where a component stops adding score.

Consider the "Incident Count" component. At the old threshold of ÷ 3, any actor with 3 or more attributed incidents scored a perfect 1.0 on that dimension. Since most state-sponsored actors have 10–120 incidents, this component contributed zero differentiation — every serious actor saturated.

The V2 reform raised this to ÷ 20. Now:

| Actor | Incidents | Old Score (÷3) | New Score (÷20) | Differentiation |
|-------|-----------|---------------|----------------|----------------|
| Lazarus Group | 120 | 1.0 | 1.0 | ← still saturated (extreme outlier) |
| APT28 | 53 | 1.0 | 1.0 | ← still saturated |
| Dragonfly | 68 | 1.0 | 1.0 | ← still saturated |
| Kimsuky | 71 | 1.0 | 1.0 | ← still saturated |
| Ember Bear | 21 | 1.0 | 1.0 | ← now at threshold edge |
| CyberAv3ngers | 8 | 1.0 | **0.40** | ← now properly differentiated |
| FIN7 | 12 | 1.0 | **0.60** | ← now properly differentiated |

The same logic was applied across every dimension: Vendor Exposure raised from ÷ 15 to ÷ 50. Technique Reach from ÷ 80 to ÷ 120. EPSS multiplier halved from 10× to 5×. Each adjustment was set against the actual data distribution to get the most information out of each component.

**The principle**: A scoring system that saturates on most inputs produces a ceiling effect. A scoring system that never saturates produces noise. The ATQ is tuned to the empirical distribution of real threat actor capabilities — not to theoretical ideals.

---

### How ATQ Feeds the Kill Chain

The ATQ is not a report card pinned to a wall. It is a **live input** to three downstream engines:

#### 1. Monte Carlo Simulation (B2 Boost Map)

When the Monte Carlo engine executes a random walk through the knowledge graph, it loads a **TACAM Actor Modifier Map** from Postgres. This map converts ATQ components into edge weight multipliers:

```
Actor with high ATQ → Higher Boltzmann walk weights → 
  More likely to be selected at each step → 
    Higher probability of successful attack path → 
      Higher cost in simulation → 
        Higher ALE in the report
```

An actor with ATQ 78.6 (Volt Typhoon) generates walk weights 1.3–1.5× higher than an actor with ATQ 42.1 (a low-tier hacktivist group). This directly increases the frequency and cost of attack paths originating from that actor in the Monte Carlo simulation.

#### 2. Seldon Rating (Top-Down Threat Pressure)

The per-organization **Seldon Rating** combines three dimensions: internal hardening, vulnerability exposure, and **external threat pressure**. ATQ scores of actors targeting the customer's sector × geography × vendor stack set the threat pressure component.

A customer in the energy sector with Siemens equipment and European geography inherits threat pressure from every actor whose TACAM profile matches — weighted by ATQ. If Volt Typhoon (ATQ 78.6) has high energy sector affinity, high Siemens CPE affinity, and high European geography affinity, that customer's Seldon Rating drops.

#### 3. Gordon-Loeb Optimal Investment

The financial model that prescribes *how much to invest* in cybersecurity uses the Monte Carlo output (itself driven by ATQ). Higher ATQ actors produce higher ALE. Higher ALE raises the Gordon-Loeb optimal investment threshold. The board sees:

> "Because Volt Typhoon (ATQ 78.6) has pre-positioned in your sector with rising EPSS velocity on CVEs affecting your vendor stack, the optimal security investment is $17.4M — $8.2M above your current spend."

That sentence is generated from data, not intuition.

---

### The Snapshot Architecture: Scores That Move

Unlike static threat intelligence reports, the ATQ changes as the world changes. The system captures point-in-time snapshots in `seldon.seldon_score_snapshots`, tagged by epoch:

| Epoch | Date | Event | Effect |
|-------|------|-------|--------|
| 0 | 2026-04-10 | Baseline (pre-reform) | 178 actors scored with old formula |
| 1 | 2026-04-11 | V2 Reform | 12-component formula deployed |
| 2–234 | Ongoing | Continuous refresh | EPSS updates, new incidents, geopolitical shifts |

This enables **temporal analysis**: "How has APT41's ATQ changed since the AUKUS submarine deal was announced?" Answer: ATQ rose 2.3 points in the 90 days following, driven by geo_tension (+1.4 points), EPSS velocity (+0.6 points), and campaign recency (+0.3 points).

Delta tracking turns the ATQ from a static ranking into a threat **trajectory**. Not just "who is dangerous" but "who is *getting* more dangerous."

---

### What Makes This Unique

Every major threat intelligence vendor (Mandiant, CrowdStrike, Recorded Future) provides actor profiles. What they do not provide is:

| Capability | Industry Standard | Eigenia ATQ |
|-----------|-------------------|----------|
| **Quantified score** | Subjective severity labels (High/Medium/Low) | 12-component weighted score (0–100) |
| **Component decomposition** | Opaque "analyst assessment" | 12 auditable `w_*` columns per actor |
| **Customer contextualisation** | Generic sector-level reporting | TACAM cross-query: Sector × CPE × Protocol × Geography |
| **Temporal tracking** | Point-in-time reports | Epoch-based snapshots with delta analysis |
| **Simulation input** | Reports for humans to read | Live Boltzmann boost map for Monte Carlo engine |
| **Financial output** | "Risk is high" | "$8.2M gap between current spend and optimal investment" |
| **Geopolitical integration** | Separate geopolitical commentary | Embedded geo_tension component from ACLED/GPR data |
| **EPSS velocity** | Static EPSS scores | Trajectory analysis: d/dt of exploit probability |
| **Saturation calibration** | Unknown internal models | Published thresholds tuned to empirical distributions |

The practical difference: other vendors give you a threat actor *profile*. Eigenia gives you a threat actor *measurement* that feeds into a financial model telling your board exactly how much to spend.

---

### Reading an ATQ Decomposition

Here is what a fully decomposed ATQ looks like in the platform. When a security analyst clicks on Volt Typhoon, they see:

```
┌──────────────────────────────────────────────────────────┐
│  VOLT TYPHOON                              ATQ: 78.6     │
│  Attribution: China / People's Republic of China         │
│  Sophistication: Advanced Persistent Threat              │
├──────────────────────────────────────────────────────────┤
│  COMPONENT BREAKDOWN                                      │
│                                                           │
│  ████████████████░░░░  EIC Score (18%)        ▸ 14.7/18  │
│  ██████████████░░░░░░  Kill Chain (14%)       ▸ 12.0/14  │
│  █████████████░░░░░░░  Temporal (13%)         ▸ 12.4/13  │
│  ████████░░░░░░░░░░░░  EPSS Base (10%)        ▸  7.3/10  │
│  ████████░░░░░░░░░░░░  Technique Reach (10%)  ▸  6.8/10  │
│  ████████░░░░░░░░░░░░  Vendor Exposure (10%)  ▸  8.0/10  │
│  ████░░░░░░░░░░░░░░░░  Sector Reach (5%)      ▸  4.2/ 5  │
│  ███░░░░░░░░░░░░░░░░░  Protocol Reach (5%)    ▸  3.4/ 5  │
│  ████░░░░░░░░░░░░░░░░  Incident Count (5%)    ▸  4.2/ 5  │
│  ████░░░░░░░░░░░░░░░░  Campaign Recency (5%)  ▸  4.8/ 5  │
│  ██░░░░░░░░░░░░░░░░░░  EPSS Velocity (5%)     ▸  0.4/ 5  │
│  ██░░░░░░░░░░░░░░░░░░  Geo Tension (5%)       ▸  0.3/ 5  │
├──────────────────────────────────────────────────────────┤
│  TACAM CROSS-MATCH                                        │
│  Sector: Energy (0.94), Water (0.71), Comms (0.83)       │
│  Protocols: OPC-UA, Modbus, DNP3                          │
│  Top CPE Targets: Siemens SIMATIC, Cisco IOS, Fortinet   │
│  Campaign Recency: Active (last 30 days)                  │
│  Kill Chain: 12/14 tactics (missing: Exfiltration, Impact)│
├──────────────────────────────────────────────────────────┤
│  TRAJECTORY (90-DAY)                                      │
│  ATQ Δ: +2.3 points ↑  (Epoch 228 → 234)                │
│  Driven by: Temporal +1.4, EPSS vel +0.6, Recency +0.3  │
│  Forecast: Elevated through Q3 2026 (87% confidence)     │
└──────────────────────────────────────────────────────────┘
```

Every bar, every number, every delta is computed from source data. Nothing is imputed. Nothing is subjective.

---

### The Bottom Line

The ATQ is not a marketing label. It is a **materialized SQL view** running against live data — twelve components, twelve auditable weights, twelve saturation thresholds tuned to empirical threat actor distributions, feeding a Monte Carlo simulation that produces dollar-denominated risk for your board.

Other platforms tell you an actor is "dangerous." The ATQ tells you *how dangerous*, *why*, *compared to whom*, *trending in which direction*, and *what it costs you*.

That is the difference between threat intelligence and threat *measurement*.

---

*Eigenia CDT — Endeavour Energy B.V.*
*"Every threat actor on earth, scored across twelve dimensions, updated continuously, priced in dollars."*