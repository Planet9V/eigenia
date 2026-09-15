# OXOT Cyber Digital Twin

## Feature Summary

*A living, engineering-grade model of what you operate, indexed to the regulatory
environment each asset sits in. It simulates attack, prioritises by physical
consequence, and produces your conformity evidence from the same model.*

**The problem it answers.** Industrial infrastructure operates across risk-indexed
regulatory environments, where compliance complexity in each jurisdiction dictates the
scope of sovereign risk management. Fragmented standards and disconnected supply chain
data prevent authoritative tracking of asset composition and vulnerabilities across
international shipping corridors.

---

## 1 · The model

- Seven-layer graph of what you operate: equipment, software, dependencies, threats, human and organisational context, information environment, and controls
- Territory rather than map: real firmware, patch state and connectivity, not the reference architecture
- Living model: change one component and the bills of materials, risk deltas and file sections regenerate as differences
- Drill through six levels: component, equipment, line, site, jurisdiction, enterprise
- Views: P&ID, 3D, network, Purdue and graph. One model, many lenses
- Ingests your existing data: asset inventories, network diagrams, configurations, security-tool output. It adds context rather than replacing your tools

## 2 · Bills of materials

- Machine-readable: **SBOM** software, **HBOM** hardware, **CBOM** cryptography including post-quantum, **MBOM** manufacturing with part provenance from the manufacturer, **Ops-BOM** operations, **SaaS-BOM** cloud services
- Built on an extended **DEXPI 2.0** engineering schema: versioned, diffable, vendor-neutral
- Expressed in **CycloneDX**, flowing into the CRA Annex VII technical file
- Transitive-dependency tracing, so a vulnerability five libraries deep still surfaces

## 3 · Jurisdiction and corridor

- **Origin and destination** recorded per component, so obligations are a property of the part
- **Obligation transfer** made explicit at each integration step along the corridor
- **Evidence sufficiency** assessed per destination market, not once globally
- **Regulatory index** per jurisdiction, so the same asset carries the right obligation profile in each market it reaches
- Gaps reported with the provision that creates them

## 4 · Vulnerability intelligence

- Every asset enriched with **KEV** known-exploited status, **EPSS** exploit probability, **CVSS** and **MITRE ATT&CK**
- Continuous CVE and KEV watch across the estate
- Exploitability scored as a reachable pathway rather than an isolated severity number

## 5 · Consequence engineering

- **FMECA**: failure mode, effects and criticality analysis per component
- **RCIL**: reliability-critical items list
- **SCIL**: safety-critical items list, mapped to the safety functions that protect against them
- **Minimum operating requirements**, so criticality reflects what must keep running
- Binds every finding to what it physically does to the process

## 6 · Simulation and prediction

- **OXOT Risk Engine**, a physics-based risk engine built on seven mathematical axioms
- **Monte Carlo** pipeline, 10,000 MITRE-aligned attack campaigns per pass
- Output: probability an adversary reaches a safety-critical system, with a 95 percent confidence interval
- **What-if** scenarios: test segmentation, patching or an organisation under stress, and watch the risk curve move
- **ATQ**: twelve-factor threat-actor profiling, establishing who actually targets an asset like yours

## 7 · Prioritisation and scoring

- **NOW / NEXT / NEVER**: triage by consequence against exploitability, with written permission to ignore the noise
- **Consequence Index**: one board-level figure, priced in euros through ALE with CVaR tails, on a 90-day trend, weighted by jurisdiction
- Glass-box: every score drills to the evidence it came from
- **Supplier and product track-record rating**: vendors rated on history across CVE, CWE, EPSS, CAPEC and MITRE trend, not only today's open CVE count

## 8 · Conformity outputs from the same model

- **Cyber Resilience Act**: the Annex VII technical file at portfolio scale, from the model rather than from a questionnaire
- **IEC 62443**: zones and conduits, target and achieved security levels, ALARP rationale
- **TS 50701** where the sector requires it
- **NIS2**: consequence-driven risk picture and supplier-dependency view
- **Board reporting**: a probability landscape with confidence intervals, not a maturity score

## 9 · Deployment and delivery

- **Single-tenant**: your own instance, never pooled with anyone else's
- **Sovereign cloud or on-premises**, in the jurisdiction your obligations require
- **Passive-first**: no agents on your controllers
- **CRA Transit**: a 60-day assisted engagement for one self-assessed product. File built, exported, platform torn down
- **Long-term licence**: keep and run the twin, with capability transferred to your team

---

*The Consequence Index, ALE and simulation outputs are OXOT's own transparent, drillable
calculations, directionally validated on real engagements. They are not rating-agency or
actuarial marks. Sample figures used in demonstrations are illustrative and are not
customer data.*

*Cyber Digital Twin platform development funded under CIF-NL 2025, administered by RVO,
the Netherlands Enterprise Agency.*
