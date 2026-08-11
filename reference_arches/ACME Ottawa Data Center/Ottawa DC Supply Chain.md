---
aliases: [ACME Geopolitical Risk, ACME Supply Chain Risk]
type: facility-reference-model
category: data-center
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-datacenter, phase/1c, supply-chain, geopolitical, regulatory]
related: ["[[ACME Ottawa Data Center]]", "[[Ottawa DC Narrative]]"]
created: 2026-05-09
updated: 2026-05-09
---

# Ottawa DC Supply Chain

> **Demo overlay**: ACME is a fictional demo customer. Data, regulatory timelines, and geopolitical risk are illustrative and reflect 2026 intelligence.

## Executive Summary

ACME's federal tenant data center (Ottawa) operates at the **convergence of three critical supply chain choke points**: [[Taiwan]] semiconductor dominance ([[TSMC]] → Intel/AMD CPUs, Nvidia CoWoS GPUs), Korean memory ([[Samsung]]/Micron), and Chinese rare-earth/transformer components. Across 14 identified OEM upstream partners and 3 geopolitical risk zones, the facility's resilience depends on inventory buffer policies, regulatory compliance ([[ITSG-33]], Bill C-8/[[CCSPA]]), and Canadian sovereignty constraints (data residency, ownership control).

---

## Tier 1: Direct Equipment Suppliers (OEM Partners)

### Compute & Storage OEMs
- **[[Cisco]]** (network switching/routing) → Broadcom ASICs (Singapore/US), Intel forwarding engines
- **[[Dell]] Technologies** (servers, storage) → Seagate/WDC storage, Intel/AMD CPUs, Nvidia GPU mezzanines
- **[[HPE]]** (servers, SAN arrays) → Intel/AMD processors, Marvell SSD controllers
- **Supermicro** (ruggedized servers) → Open-source BIOS, AMD Epyc, Nvidia HGX
- **Pure Storage** (all-flash arrays) → Toshiba/Samsung NAND, Marvell controllers

### Storage & Backup OEMs
- **NetApp** (NAS/SAN) → Seagate/WDC HDDs, Samsung DRAM, Broadcom fabric switches
- **Quantum** (archive, LTO) → Seagate Exos/LTO drives, Sony/Fujifilm tape media

### Networking & Fabric
- **[[Juniper]] Networks** (core switches, firewalls) → Broadcom Jericho3 ASICs
- **Arista Networks** (data center switching) → Broadcom Tomahawk4/5, AMD Epyc processors
- **F5 Networks** (load balancers, ADC) → Dual Intel Xeon, custom ASIC fabric

### Infrastructure & Cooling
- **[[Vertiv]]** (UPS, precision cooling, PDUs) → Transformer cores (China sourced), lithium cells (Korea/China)
- **[[Schneider Electric]]** (PDM, ATS, thermal management) → Variable frequency drives (ABB/Siemens)
- **[[Caterpillar]] / [[Cummins]]** (diesel gensets) → Alternators (Russia-sensitive post-2022), fuel pumps
- **[[Trane]] / [[Carrier]]** (chiller units) → Compressors (Japan/Germany), refrigerants (DuPont specialty chemical)
- **[[Honeywell]]** (sensors, control logic) → Wireless mesh transceivers (Broadcom 802.15.4)

---

## Tier 2: Component Manufacturing (Silicon, Memory, Passive)

### CPU & GPU Chokepoints

**[[TSMC]] Dependency** ([[Taiwan]], 100 km from [[PRC]]):
- **Nvidia H100/H200 GPUs** for AI inference: 100% CoWoS (Chip-on-Wafer-on-Substrate) advanced packaging; capacity fully booked through 2026. CoWoS projected 70K–130K wafers by end-2026 against 113% annual demand growth. A 2-week [[Taiwan]] strait disruption → 6-month GPU shortage.
- **Intel Xeon (4th Gen+)** and **AMD Epyc (Genoa+)**: 7 nm / 5 nm process nodes at [[TSMC]]; 20–30% of high-performance server CPU capacity.

**Intel Fab Exposure**:
- Arizona (Chandler 2, Rio Rancho) — 5 nm fab now operational (2024); but immature yield (2–3 years ramp).
- Geislingen, Germany (Intel foundry partnership) — Operational 2025 for 7 nm, not yet 5 nm.

### Memory (DRAM + NAND)

**DRAM Duopoly** (Korea + US):
- **[[Samsung]]** (South Korea) — 40% global capacity; fab clusters in Hwaseong & Icheon heavily energy-dependent
- **SK Hynix** (South Korea) — 30% global capacity; Icheon fab ranks among world's highest power consumers per unit
- **Micron** (Boise, US; Taichung, [[Taiwan]]) — 25% global capacity; [[Taiwan]] fab 10 km from Taipei (under [[PLA]] missile range)

**NAND Flash** (MLC/TLC):
- **[[Samsung]]** — 30% NAND capacity (V-[[NAND]] 3D stacks, 14th generation 2024)
- **Kioxia/Western Digital** (Japan/US JV) — 30% capacity; production in Mie, Japan (earthquake zone) + Kioxia Kitakami (Iwate, tsunami-exposed)
- **SK Hynix** (subsidiary Solidigm, ex-Intel) — 20% capacity; fab in Icheon, Korea
- **Micron** — 15% NAND capacity; fab in Taichung, [[Taiwan]]

### ASICs & Analog Semiconductors

- **Broadcom** (San Jose HQ, Singapore/[[Taiwan]] fab partnerships) — Switching fabric, analog power management, oscillators
- **Marvell** (Santa Clara, [[Taiwan]] [[TSMC]] process) — SATA/NVMe controllers, Ethernet PHYs, power management
- **Texas Instruments** (Dallas HQ, [[Taiwan]]/Mexico/Singapore fabs) — Analog power (DC-DC converters), isolation ICs
- **NXP** (Eindhoven, but fabs in [[Taiwan]]/Singapore/Germany) — ARM processors for security appliances, automotive-grade voltage regulators

### Passive Components (Transformers, Inductors, Capacitors)

- **Transformers** (isolation, EMI, power): Schaffner (Switzerland), Coilcraft (Illinois), TDK (Japan). **China sourcing of laminated core steel** (~40% of world supply, concentrated in Baotou, Inner Mongolia)
- **Electrolytic Capacitors**: Nichicon (Japan), Rubycon (Japan), Nippon (Japan). **Aluminum foil (99.9%+ purity) sourced from China, Middle East for anodizing**
- **Inductors, Ferrite Cores**: TDK (Japan), Murata (Japan), Laird (Denmark/UK). **Ferrite raw material sourcing: China dominant**

---

## Tier 3: Geopolitical & Strategic Resource Constraints

### [[Taiwan]] Strait Scenario (Probability: Elevated 2026)

**Impact Chain**:
1. [[PLA]] blockade (air/sea) → [[TSMC]] fabs isolated; no new wafer starts; packaging queues collapse.
2. **GPU Shortage**: Within 1 week, Nvidia's CoWoS backlog exhausted. H100/H200 unshippable. AI infrastructure in ACME & customer tenants stalled.
3. **CPU Cascade**: Intel 5nm, AMD Rome/Bergamo orders freeze. Replacement CPUs (legacy Zen 3, older Xeons) source from secondary inventories, 8–12 week lead times.
4. **DRAM/NAND Impact**: Micron [[Taiwan]] fab (10% of global NAND) goes offline. Korean fabs ([[Samsung]]/SK Hynix) become single point of failure.
5. **Timeline**: Pre-shock, 3–6 months buffer inventory (if any). Post-shock, **18-month hardware refresh cycle becomes 4–8 years** for high-performance GPU/CPU combos.

**Canadian Regulatory Cascade**:
- Treasury Board Cloud-First policy mandates rapid cloud migration for non-Protected-B workloads → colocation demand drops 30–50%
- Protected-B tenants lock into Sovereign Cloud contracts → ACME loses federal quota to Canadian-owned cloud operators

### Korean Memory Risk (Lower Probability, High Impact)

- **Geopolitics**: North Korea missile tests (2024–2026) → South Korean grid vulnerability; government energy rationing in wartime scenario
- **Natural Disaster**: Icheon fab ([[Samsung]] HQ) lies 25 km south of Seoul. Flooding risk (Han River) documented in 2010–2012; climate change (+20% monsoon precipitation 2020–2025) raises probability
- **Economic Coercion**: China rare-earth export quotas → South Korea memory fab input costs rise 40–60% YoY

**Impact on ACME**: DRAM capacity tightening 2026–2027. Memory refresh budgets double; DDR5 lead times 16+ weeks.

### China Rare-Earth & Steel Chokepoint

- **Rare Earths** (85% global supply, Baotou): Dysprosium, Terbium used in transformer cores, permanent magnets, power semiconductors. China restricts export quotas; spot prices volatile (5–50% swings YoY).
- **Transformer Core Steel** (silicon-oriented electrical steel): China 60% of world production. Specialty grades available almost exclusively from China.
- **Glycol Refrigerants** (cooling loops): HFO-1234yf synthesis heavily dependent on Chinese fine-chemical intermediates

**ACME Exposure**:
- Chiller unit coolant refills require Chinese-origin HFO-1234yf; supply tightening 2026–2027 could force obsolescence
- UPS transformer cores (critical for power conditioning) subject to 30–60 day lead times; China export license delays 2024–2026 averaged 15 days

### Russia Gas & Energy (Post-2022 Sanctions)

- **Generator Coolant & Alternator Bearings**: Russian suppliers historically provided high-grade diesel engine coolant, generator rotor bearing assemblies (Uralelectrotyazhmash)
- **Post-2022 Sanctions**: Replacement sourcing from ABB (Switzerland), Siemens (Germany), [[GE]] (US). Lead times extended 12–16 weeks.
- **ACME Impact**: Diesel genset maintenance windows lengthened; spare-part inventory bloat (+40% cost); mean-time-to-repair on generator faults increases from 4 hours to 6–8 weeks

---

## Canadian Regulatory Regime

### [[ITSG-33]] (IT Security Risk Management)

- **Governing Body**: Canadian Centre for Cyber Security (CCCS), Communications Security Establishment
- **Scope**: All Crown departments, federal agencies, federally regulated industries
- **Control Families**: 195 security controls across Technical, Operational, Management
- **ACME Binding**: Colocation facility housing Protected-B data must meet [[ITSG-33]] Level 3. Covers network segmentation, encryption, access control, incident response.

**Gap Risk**: ACME's supply chain not explicitly covered in [[ITSG-33]] v4 (2023). Recommendations:
- Vendor risk assessment (questionnaire + [[SOC2]] audit) mandatory for all OEM partners
- Hardware firmware provenance tracking ([[SLSA]] framework or equivalent)
- Spare-part chain-of-custody documentation (tamper-evident sealing)

### Bill C-8 / [[CCSPA]] (Critical Cyber Systems Protection Act, Status: Feb 2027)

- **Scope**: Critical infrastructure operators in finance, telecom, energy, transportation
- **Key Obligations**:
  1. Designate critical cyber systems (CCS) per government direction
  2. File annual cyber risk assessments (threat modeling, supply chain risk register)
  3. Notify regulator within 24 hours of material cyber incident
- **Penalties**: up to $15M or 5% gross revenue for non-compliance

---

## Downstream Impact: Federal Tenants & National Resilience

### Tier 1 Downstream (Direct ACME Tenants)

| Tenant | Classification | Data Type | Regulatory Regime |
|--------|-----------------|-----------|-------------------|
| CRA | Crown | Protected-B, tax records | [[ITSG-33]], PIPEDA, Bill C-8 |
| ESDC | Crown | Protected-B, pension records | [[ITSG-33]], PIPEDA, Treasury Board |
| [[CSE]] | Classified | [[SIGINT]], foreign intelligence | [[ITSG-33]]+, SCIDA, Five Eyes |
| Major Banks (RBC, TD) | Private | Protected-B (internal ops) | PIPEDA, [[SAC]] 8 |
| Telco Backbone ([[Bell Canada]], Rogers, [[Telus]]) | Private | Protected-B (topology) | CRTC telecom rules, [[CCSPA]] |

### Tier 2 Downstream (Indirect Beneficiaries)

- **Canadian Taxpayers** (40M) — CRA data breach → identity theft, tax fraud, delayed refunds
- **Banking Customers** (30M) — RBC/TD data breach → financial fraud, account lockout
- **Mobile Users** (25M) — [[Bell Canada]]/Rogers/[[Telus]] outage → emergency services cascade failure

### Tier 3: National Infrastructure Cascade

If ACME taken offline (ransomware, supply-chain attack, geopolitical sabotage):
- **Government Services**: CRA processing stalls (tax refunds delayed 4–6 weeks); EI/pension payouts interrupted
- **Financial System**: Inter-bank settlement ([[SWIFT]], Payments Canada) disrupted 12–24 hours
- **Telecom**: 5G/4G core routing compromised; emergency call centers dependent on [[CSE]]-provided security appliances go dark
- **Estimated Economic Impact**: $200M–$500M per day (per Bank of Canada 2023 critical infrastructure study)

---

## Cross-References

- [[Ottawa DC Narrative]] (board-readable impact summary)
- [[Ottawa DC Threat Profile]] (supply-chain attack scenarios)
- [[Ottawa DC HAZOPS]] (geopolitical risk impact on facility availability)

---

**Doc Version**: 1.0 | **Phase**: 1c | **Last Updated**: 2026-05-09
