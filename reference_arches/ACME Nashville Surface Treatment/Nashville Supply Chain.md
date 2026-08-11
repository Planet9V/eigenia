---
aliases:
  - Nashville Supply Chain Risk
  - Nashville Upstream Analysis
  - Nashville Geopolitical Risk
type: facility-reference-model
category: surface-treatment
status: draft
domain: OT
tags:
  - domain/OT
  - facility/acme-nashville-surface-treatment
  - phase/1c
  - supply-chain/geopolitical
  - supply-chain/materials
related:
  - "[[ACME Nashville Surface Treatment]]"
  - "[[Nashville Narrative]]"
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME Nashville is fictional. Geopolitical risk assessment and regulatory mapping are illustrative for OXOT demo; actual facility supply-chain characteristics would require direct customer engagement.

---

## Upstream Tier 1: Specialty Chemicals & Rectifiers

**Primary Chemistry Suppliers**:
- **[[Atotech]]** (MKS Inc. Materials Solutions Division) — Electroplating chemistries, chromium/nickel/zinc systems, passivation, immersion silver; 15 TechCenters globally with local technical support
- **Coventya** — Innovative electroplating formulations across automotive/aerospace/industrial; adhesion & corrosion-resistance focus
- **OMG** — Specialty surface-treatment chemistry systems (confirmed active in plating chemistry market 2025–2026)
- **[[BASF]]** — Broad surface-finish portfolio, sustainability-oriented formulations

**Rectifier & Equipment OEMs**:
- **[[Munk Metals]]**, **[[Dynapower]]**, **[[Plating Electronics]]** — DC rectifiers, power conversion, process automation controls
- **Electrochemical Systems** (ancillary fluid management)

**Risk Profile**: Chemistry suppliers are relatively consolidated; single-source dependency on [[Atotech]]/Coventya creates vulnerability to supply disruption or price shock. Rectifier OEMs more commoditized but tech-dependent (firmware updates, remote service access).

---

## Upstream Tier 2: Raw Materials & Sourcing Concentration

### Chromium Ore
- **Primary sources**: South Africa (~42% global reserves), Kazakhstan, Russia
- **2026 risk**: Russian sanctions maintain friction; South African supply stable but pricing volatile
- **Concentration**: ~10–12 major mining operations globally; 3–4 control >60% of refinery capacity

### Nickel Ore
- **Indonesia dominance**: 55M metric tons reserves (~40% global), but quota reduced 31% (2025→2026: 379M → 260–270M wet metric tons)
- **Secondary sources**: Russia (sanctions-restricted), Canada, Australia
- **Critical Chokepoint**: Chinese entities control ~75% of Indonesia's nickel refining capacity; >90% of Indonesian exports bound for China
- **2026 Forecast**: BMI revised nickel price upward to $16,600/ton (from $15,800/ton); structural support from quota constraints

### Specialty Acids & Electrolytes
- **Sulfuric, hydrochloric, phosphoric acid**: global capacity sufficient but transport-dependent ([[hazmat]] logistics)
- **Electrolytes** (nickel sulfate, chromic acid): mid-tier suppliers, subject to [[EPA]]/[[RCRA]] restrictions

### Geopolitical Layers
- **China Decoupling**: Rare-earth and specialty chemical IP concentrated in China; tariffs (Section 232/301) apply to many inputs
- **Sanctions Impact**: Russian nickel, palladium offline post-2022; shortage absorbed via Indonesia but at cost premiums
- **Indonesia Export Controls**: EV-grade nickel export restrictions (announced 2023, enforced 2024–2025) tighten availability for non-battery sectors

---

## Downstream Tier 1: Tier-1 Industrial Customers

**Automotive Tier-1 Suppliers**:
- Magna, Bosch, ZF (chassis/drivetrain components, stamped metal finishes for corrosion resistance)
- **[[IATF 16949]]** compliance required; frequent PPAP audits

**Aerospace Primes** (surface treatment scope):
- Boeing, Northrop Grumman, Lockheed Martin, Pratt & Whitney (coatings, anodizing, specialized finishes for structural/engine components)
- **[[ITAR]]-Controlled**: Aerospace surface treatment is often classified; export restrictions apply to finished components & technical data

**Specialty Industrial**:
- Oil & gas pump casings, HVAC heat exchangers, industrial fasteners (food-service, pharmaceuticals)

---

## Downstream Tier 2 & 3: OEMs & End Consumers

**OEMs**: Ford, GM, Toyota, Airbus, Boeing, Lockheed (final assembly point; depend on sub-tier ACME surface finish)

**End Consumers**: Civil aircraft passengers (Boeing/Airbus fleets), automotive buyers, industrial end-users (power plants, water treatment, defense contractors)

---

## Regulatory & Compliance Regime

### Export Controls (Production Impact)
- **[[ITAR]]** (International Traffic in Arms Regulations): Aerospace surface treatment often deemed "defense article"; requires authorization, restricted to US persons, export license for foreign nationals
- **[[EAR]]** (Export Administration Regulations): Chemicals & equipment controls; CWC-scheduled chemicals (e.g., certain precursors) require separate licensing

### Environmental & Process Safety
- **[[EPA]] [[RCRA]]** (Resource Conservation & Recovery Act): Chromium waste classification (hexavalent Cr is hazardous); spent plating solution disposal, sludge handling, land disposal restrictions
- **[[Clean Water Act]]**: Pretreatment standards for metal-finishing facilities (40 CFR Part 433); discharge limits for Cr, Ni, Zn, Cu
- **[[OSHA]] PSM** (Process Safety Management): If site uses hazardous chemicals above threshold quantities (chromic acid, hydrogen, compressed air), requires mechanical integrity, management of change, incident investigation
- **[[TSCA]]** (Toxic Substances Control Act): Reporting on new chemicals; [[EPA]] registration requirements for formulated products

### Industry-Specific Accreditations
- **[[Nadcap]] Chemical Processing**: Aerospace-required accreditation for anodizing, conversion coating, passivation
- **[[AS9100]]** (Aerospace Quality Mgmt): Prerequisite to Nadcap eligibility; includes supply-chain audits, configuration management, foreign object detection
- **[[IATF 16949]]** (Automotive Quality): Ford/GM/Toyota mandate; covers change control, PPAP, production part approval
- **[[ISO 9001]]**: Baseline quality system

### EU/Parent-Company Compliance
- **[[REACH]]** (Registration, Evaluation, Authorization of Chemicals): [[Aalberts]] NL parent subject to EU chemical restrictions; RoHS apply to customer-facing products
- **[[CSRD]]** (Corporate Sustainability Reporting Directive): [[Aalberts]] obligated to report Scope 1/2/3 emissions, including supply-chain chemical footprint

### US Defense Contractor Mandates
- **[[CMMC]] L2** (Cybersecurity Maturity Model Certification): If ACME supplies to DoD-tier-1 suppliers (Boeing, Northrop, Lockheed), [[CMMC]] L2 now mandatory; requires [[MFA]], endpoint detection, 110+ security controls

---

## Supply-Chain Compromise Pathways

### Historical Precedents

1. **Solarwinds-Style Upstream Injection**:
   - Attacker compromises equipment OEM (e.g., rectifier firmware update) → injects malicious code into DC power-supply controller → undetected for months during normal operation
   - **ACME Risk**: [[Munk]]/[[Dynapower]] rectifier firmware updates; firmware running legacy, unpatched components

2. **Kaseya-Style RMM Breach**:
   - Attacker compromises chemistry supplier remote-support tool (e.g., [[Atotech]] technical advisory system for dosing optimization) → lateral move to ACME's batch-control [[PLC]]
   - **Potential Impact**: Undetected changes to plating-solution composition, pH drift, current density misalignment → product quality drift, rework costs, customer complaints (Boeing/Pratt fail inspection)

3. **Vendor Credential Reuse**:
   - ACME staff reuse credentials across personal + work systems; [[Atotech]] rep email compromised (phishing) → attacker logs into ACME's chemistry-optimization dashboard using shared password → views proprietary process recipes, adjusts parameters

### Detection Gaps

- **ACME does NOT have**: [[MFA]] or session-token rotation on chemistry-data portal
- **No [[EDR]]** on control-room machines
- **Manual process logs** (paper + spreadsheet backup) — no centralized [[SIEM]] for anomaly detection

---

## Geopolitical Risk Synthesis

| Tier | Risk Factor | Impact | 2026 Trajectory |
|------|-------------|--------|-----------------|
| **Chromium** | South Africa supply; Russian sanctions | Price volatility ±15–20% YoY | Stable if SA continues; risk if political crisis in SA |
| **Nickel** | Indonesia quota reduction; China refining dominance | Structural price support; lead-time extension 2–3 months | Continued constraint; "friend-shoring" may redirect flows |
| **Chemistry IP** | China decoupling; tariffs on specialty acids | Long-lead imports; cost +8–12% | Tariff escalation possible under trade policy shift |
| **Aerospace** | [[ITAR]] restrictions; [[Nadcap]] accreditation narrow supply base | Single-source dependency on [[Atotech]] for some formulations | Accreditation base remains stable |
| **Cyber** | Rectifier firmware, RMM compromise historical precedent | Undetected process deviation; product liability | [[CMMC]] L2 soon mandated; ACME unprepared |

---

## Summary: ACME Nashville Critical Path

1. **Immediate** (0–6 months): Monitor Indonesia nickel quota enforcement; ensure [[ITAR]]-trained staff for aerospace work
2. **Medium-term** (6–12 months): Diversify chemistry suppliers (dual-source at least one critical formula); implement [[CMMC]] L2
3. **Long-term** (12+ months): Establish secondary processing path (consider nearshoring vs. China dependency); real-time [[SIEM]] for batch control [[PLC]]

---

## Cross-references

- [[ACME Ottawa Data Center]]
- [[ACME Ottawa Substation]]
- [[ACME Ottawa Civic Hospital]]
- [[ACME Ottawa Pediatric Medical Center]]

## See also

- [[Nashville Narrative]] — board-level supply-chain risk summary
- [[Nashville Threat Profile]] — cyber supply-chain compromise pathways
- [[ITAR]] — aerospace export control framework
- [[CMMC]] — DoD cybersecurity mandate for suppliers
