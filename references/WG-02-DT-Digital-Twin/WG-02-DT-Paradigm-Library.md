# Engine: Paradigm Suite

Lab Sponsor Resident  j.mckenney

The **Paradigm Suite** is the platform's specialized module library for risk quantification and predictive analytics. It integrates raw technical data (CVEs, Telemetry) into high-level strategic forecasts and actuarial models.


## Core Paradigm Modules

### 1. Consequence Engine (`ConsequenceEngine.tsx`)
Models the physical and economic impact of specific asset failures.
- **Kinetic Impact**: Mapping cyber-failures to physical outcomes (e.g., valve closure -> pressure spike -> rupture).
- **RTO/RPO Calculation**: Estimating the Recovery Time Objective and Recovery Point Objective for specific industrial processes.
- **Economic Downtime**: Calculating the per-hour cost of facility inactivity.

### 2. Sbom Risk Chain (`SbomRiskChain.tsx`)
Traces vulnerabilities through the software supply chain.
- **Component Pedigree**: Visualizing the hierarchy of sub-components within a facility's equipment.
- **Transitive Risk**: Identifying how a vulnerability in a low-level library (e.g., Log4j) propagates to a high-level OT controller.
- **Vendor Concentration**: Identifying systemic risk across multiple facilities using the same high-risk vendor.

### 3. Taleb Risk Console (`TalebRiskConsole.tsx`)
Focuses on "Black Swan" (rare but catastrophic) risk modeling.
- **Pareto Severity**: Utilizing power-law distributions to model high-impact security breaches.
- **Fat-Tail Analysis**: Quantifying the probability of events that traditional Gaussian models underestimate.
- **Accumulation Risk**: Modeling how a single zero-day could simultaneously affect an entire portfolio of customers.

### 4. Psychohistory Forecast (`PsychohistoryForecast.tsx`)
Named after Seldon's mathematical sociology, this module uses LLMs and statistical models to predict future events.
- **Geopolitical Stress Indicators**: Tracking regional indicators (protests, sanctions, military movements) that precede cyber-campaigns.
- **90-Day Windows**: Generating probabilistic "forecast windows" for upcoming threat actor activity.

### 5. Seldon Score Deep Dive (`SeldonScoreDeepDive.tsx`)
The transparency layer for the platform's primary risk metric.
- **Signal Weights**: Breakdown of the weights assigned to each intelligence input (GPR, TACAM, CVE density).
- **Benchmarking**: Comparing the organization's score against sector averages and historical performance.

## Data Integration
Paradigm modules pull data from three primary backend sources:
- **`seldon.seldon_daily_stats`**: Time-series risk data.
- **`forge.equipment`**: Physical asset metadata.
- **`Neo4j`**: Relational intelligence and kill-chain paths.