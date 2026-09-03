# Eigenia Research Wiki: Master Paper Proposals Backlog

**Governance:** Applied Complexity & Critical Infrastructure Systems Assurance  
**Executive Lead:** J. McKenney  
**Status:** Approved for Iterative Execution  
**Corpus Sources:** `eigenia/papers-pre-publish/Full Hyperscalar Paper - 23 sections/` and `eigenia/papers-pre-publish/DEXPI and CycloneDX/`

---

## 1. Inventory & Execution Registry

| ID | Working Group | Title | Primary Source File(s) | Execution Priority | Target Length |
|:---|:---|:---|:---|:---:|:---:|
| **P-01** | `WG-05-CAD` / `WG-02-DT` | Frontier AI Hardware Security & Platform Assurance Framework | `DEXPI and CycloneDX/Frontier-AI-Hardware-Security-and-Platform-Assurance-Framework.md` | Phase 1 (Immediate) | 5,500 – 7,000 words |
| **P-02** | `WG-05-CAD` | Unified DEXPI 2.0 & CycloneDX 1.6+ Semantic Bridge | `DEXPI and CycloneDX/Unified-DEXPI-CycloneDX-Specification.md`, `example_unified_dexpi_cyclonedx.json` | Phase 1 (Immediate) | 4,500 – 6,000 words |
| **P-03** | `WG-05-CAD` / `WG-01-UI` | Supply Chain Transparency & EU CRA Regulatory Enforcement | `DEXPI and CycloneDX/enforcement_SBOM_*.md`, `perplexity_alarp_cra_classes.md`, `WP11_enhanced.md` | Phase 1 (Immediate) | 5,000 – 6,500 words |
| **P-04** | `WG-07-TM` | CyHAZOP: Cyber-Physical Hazard Analysis for Hyperscale Infrastructure | `Full Hyperscalar Paper/WP08_enhanced.md`, `cyhazop-register.csv` | Phase 2 | 6,000 – 8,000 words |
| **P-05** | `WG-07-TM` | CyHAZOP System Drill-Down: Node Registers for Power, Cooling, and Safety | `Full Hyperscalar Paper/WP09_enhanced.md`, `WP02_enhanced.md` | Phase 2 | 6,500 – 8,500 words |
| **P-06** | `WG-07-TM` / `WG-03-ML` | Autonomous OT & AI-Driven Facility Control: The Write-Access Trust Boundary | `Full Hyperscalar Paper/WP13_enhanced.md` | Phase 2 | 5,000 – 6,500 words |
| **P-07** | `WG-01-UI` | Quantitative Cyber-Physical FMECA: Failure Mode Analysis for Underwriting | `Full Hyperscalar Paper/WP03_enhanced.md` | Phase 3 | 5,500 – 7,000 words |
| **P-08** | `WG-01-UI` / `WG-06-EC` | Annualised Loss Expectancy (ALE) & Return on Security Investment for OT | `Full Hyperscalar Paper/WP10_enhanced.md` | Phase 3 | 5,000 – 6,500 words |
| **P-09** | `WG-01-UI` | Reliability & Safety Critical Items Lists (RCIL / SCIL) for Reinsurance | `Full Hyperscalar Paper/WP17_enhanced.md`, `WP16_enhanced.md` | Phase 3 | 5,500 – 7,000 words |
| **P-10** | `WG-04-CF` / `WG-02-DT` | Emerging Power Topologies: Cyber-Physical Resilience of BESS, SMRs, and Microgrids | `Full Hyperscalar Paper/WP12_enhanced.md` | Phase 4 | 5,500 – 7,000 words |
| **P-11** | `WG-04-CF` / `WG-05-CAD` | High-Density Liquid Cooling Architecture & Thermal Catastrophe Dynamics | `Full Hyperscalar Paper/WP06_enhanced.md`, `WP07_enhanced.md` | Phase 4 | 5,000 – 6,500 words |
| **P-12** | `WG-02-DT` / `WG-07-TM` | IEC 62443 in Practice: SFAIR, SecRACS, and Security Level Targets | `Full Hyperscalar Paper/WP04_enhanced.md`, `WP18_enhanced.md` | Phase 4 | 6,000 – 7,500 words |

---

## 2. Detailed Technical Abstracts & Scope

### P-01: Frontier AI Hardware Security & Platform Assurance Framework
- **Domain:** Zero Trust at Silicon Boundary, Hardware Cryptographic Envelopes, Dual-Pacing V-Model.
- **Problem Statement:** Model weights exceeding $500M in replacement cost cannot rely on operating systems or hypervisors for containment. Host compromise must be assumed as a baseline.
- **Core Contribution:** Formalizes the 4-Point Hardware Cryptographic Envelope, the 7-Vector AI Rack Envelope, and the EN 50126 Dual-Pacing V-Model reconciling quarterly software sprints with 5-year silicon tape-outs.

### P-02: Unified DEXPI 2.0 & CycloneDX 1.6+ Semantic Bridge
- **Domain:** P&ID Mechanical Standards (ISO 15926), Software/Hardware BOMs (ISO/IEC 5962), Cyber Digital Twin.
- **Problem Statement:** Facility engineers communicate via hydronic P&ID diagrams; security teams communicate via CVEs and SBOMs. When cooling actuators fail, neither team can calculate digital blast radius.
- **Core Contribution:** Establishes the concrete `dexpi:` property namespace binding DEXPI equipment tags to CycloneDX 1.6 component references, linking thermodynamics to silicon execution.

### P-03: Supply Chain Transparency & EU CRA Regulatory Enforcement
- **Domain:** Regulatory Engineering, EU Reg 2024/2847 (CRA), Annex I/II Essential Cybersecurity Requirements.
- **Problem Statement:** Static vendor questionnaires fail under regulatory audits. European law mandates machine-verifiable chain of custody from wafer fabrication to end-of-life.
- **Core Contribution:** Maps CRA Class I and Class II obligations to automated M2M repositories, integrating 6-site manufacturing HSM audits, on-die asymmetric keys, and live VEX/VDR feeds.

### P-04: CyHAZOP: Cyber-Physical Hazard Analysis for Hyperscale Infrastructure
- **Domain:** Industrial Hazard Identification, IEC 61882 / IEC 62443 Integration.
- **Problem Statement:** IT threat modeling (STRIDE) ignores fluid and electrical physics, while classical HAZOP assumes sensors and actuators never lie.
- **Core Contribution:** Defines formal CyHAZOP guide words (`NO FLOW`, `ERRONEOUS FEEDBACK`, `UNAUTHORIZED COMMAND`) applied to industrial OT boundary nodes with consequence severity scoring.

### P-05: CyHAZOP System Drill-Down: Node Registers for Power, Cooling, and Safety
- **Domain:** Quantitative OT Hazard Registers, Building Management Systems (BMS), Electrical Power Monitoring (EPMS).
- **Problem Statement:** Generic security recommendations fail to protect specific mechanical assets against targeted manipulation.
- **Core Contribution:** Delivers engineering hazard registers across 15 critical data center nodes (11kV switchgear, plate heat exchangers, manifold valves, VESDA smoke detectors) with concrete mitigation architectures.

### P-06: Autonomous OT & AI-Driven Facility Control: The Write-Access Trust Boundary
- **Domain:** Closed-Loop Control, Reinforcement Learning, Industrial Safety Instrumented Systems (SIS).
- **Problem Statement:** AI-driven facility optimization loops gain write access to physical plant actuators, creating an exploit surface where sensor spoofing causes physical equipment destruction.
- **Core Contribution:** Defines the non-negotiable write-access boundary, enforcing hardwired analog safety overrides (IEC 61511) and pre-deployment digital twin verification gates.

### P-07: Quantitative Cyber-Physical FMECA: Failure Mode Analysis for Underwriting
- **Domain:** MIL-STD-1629A Failure Analysis, Cyber Actuarial Engineering, Risk Priority Numbers.
- **Problem Statement:** Underwriters lack objective quantitative metrics to price catastrophic physical losses induced by cyber intrusion.
- **Core Contribution:** Adapts FMECA to cyber-physical plants, formulating Risk Priority Numbers (RPN) that combine mechanical wear with cyber vulnerability exploitability to set empirical policy deductibles.

### P-08: Annualised Loss Expectancy (ALE) & Return on Security Investment for OT
- **Domain:** Actuarial Economics, Financial Risk Quantification, Return on Security Investment (ROSI).
- **Problem Statement:** Security teams cannot justify multimillion-dollar hardware upgrades without defensible financial models connecting downtime to capital allocation.
- **Core Contribution:** Provides mathematical formulations for Single Loss Expectancy (SLE), Annualised Rate of Occurrence (ARO), and ALE, establishing clear hurdle rates for CFO capital allocation and captive capitalization.

### P-09: Reliability & Safety Critical Items Lists (RCIL / SCIL) for Reinsurance
- **Domain:** Catastrophe Reinsurance Treaty Structuring, Aerospace Asset Screening (ARP4761).
- **Problem Statement:** Catastrophic accumulation losses are driven by unhedged single-point dependencies in long-lead physical equipment.
- **Core Contribution:** Defines RCIL and SCIL criteria for high-density facilities, establishing proof-testing protocols and tying reinsurance treaty attachment points to verified equipment compliance.

### P-10: Emerging Power Topologies: Cyber-Physical Resilience of BESS, SMRs, and Microgrids
- **Domain:** Power Systems Physics, Inverter-Based Resources, Battery Energy Storage, Small Modular Reactors.
- **Problem Statement:** Behind-the-meter generation introduces electrochemical thermal runaway and digital I&C attack surfaces that bypass traditional utility protections.
- **Core Contribution:** Analyzes BMS manipulation in utility-scale lithium-ion BESS, SMR safety parameter display vulnerabilities, and inverter synchronization attacks causing synthetic inertia collapse.

### P-11: High-Density Liquid Cooling Architecture & Thermal Catastrophe Dynamics
- **Domain:** Direct-to-Chip (DTC) Cooling, Immersion Systems, Fluid Mechanics, Thermal Shock.
- **Problem Statement:** With chip heat fluxes exceeding $100\,\text{W/cm}^2$, loss of coolant flow drives silicon junction temperatures past $105^\circ\text{C}$ in under 15 seconds.
- **Core Contribution:** Models thermodynamic time constants, hydraulic balancing, proportional valve hunting, and mechanical interlock architectures required to prevent silicon destruction.

### P-12: IEC 62443 in Practice: SFAIR, SecRACS, and Security Level Targets
- **Domain:** Industrial Security Architecture, Zone & Conduit Partitioning, Security Requirements Specification.
- **Problem Statement:** Organizations frequently claim IEC 62443 compliance without formal zone partitioning or defensible Security Level Targets (SL-T).
- **Core Contribution:** Demonstrates how to write Security Fundamental Architecture and Implementation Requirements (SFAIR) and Security Requirements and Architectural Controls Specifications (SecRACS) for critical infrastructure.
