# Emerging Infrastructure — BESS, SMR, Hydrogen, and Water Treatment

## Chapter 12: The Infrastructure That Isn't in the Blueprint Yet

## Abstract

The high-level design in Chapter 1 assumes utility power plus diesel generators. The industry is deploying Battery Energy Storage Systems at 100+ MWh scale, signing 20-year nuclear PPAs, and piloting hydrogen fuel cells for backup generation. Simultaneously, water scarcity is constraining cooling capacity in multiple jurisdictions. Each of these emerging systems introduces OT components, protocols, and failure modes absent from the current 14-node reference architecture.

This chapter extends the CyHAZOPs framework to four emerging infrastructure categories: BESS (Node N15), water treatment (Node N16), nuclear/SMR interconnection, and hydrogen fuel cells. The BESS thermal runaway scenario is a new Table B archetype — a cyber-induced cascading cell failure that can produce sustained fires lasting hours or days, with toxic gas emission rendering the facility uninhabitable.

---

## Practitioner's Note

In 2024 I toured a hyperscale campus where the operator had installed a 200 MWh lithium-ion BESS to manage grid interconnection timing. The BESS was managed by a Battery Management System — separate from the facility BMS — communicating via Modbus TCP on the same OT VLAN as the chiller plant controllers. The BESS vendor had not heard of IEC 62443.

I asked who was responsible for cybersecurity of the BESS. The Facilities team said it was the BESS vendor's responsibility. The BESS vendor said it was an "electrical installation" and should be managed like a transformer. Nobody was responsible.

Two hundred megawatt-hours of lithium-ion energy, on an unmonitored OT network, with default credentials, managed by nobody.

This chapter exists because emerging infrastructure is being deployed faster than security architecture can keep pace.

---

## 1. Battery Energy Storage Systems (BESS) — Node N15

### 1.1 System Description

Utility-scale BESS installations at hyperscale campuses serve multiple functions:

**Table 12.2: Utility-scale BESS installations at hyperscale campuses serve multiple functions**

| Function | Mechanism | Scale |
|:---|:---|:---|
| Grid interconnection bridge | Store energy during construction while permanent grid connection is built | 50–200 MWh |
| Demand response / grid services | Discharge during peak pricing; charge during off-peak | 50–200 MWh |
| UPS augmentation | Supplement or replace diesel generators for short-duration backup | 10–50 MWh |
| Renewable integration | Buffer intermittent solar/wind generation | 50–500 MWh |

**Key vendors:** Tesla Megapack, BYD Cube, Fluence Gridstack, Samsung SDI, CATL EnerOne.

### 1.2 OT Architecture

**Table 12.3: BESS OT components and their IEC 62443 certification status**

| Component | Function | OT Interface | ISASecure CSA Status | Datacenter-Specific Certification |
|:---|:---|:---|:---|:---|
| Battery Management System (BMS-BESS) | Cell-level monitoring: voltage, temperature, state of charge, state of health | CAN bus (internal); Modbus TCP (external) | **Not certified** — no BMS product from any major BESS vendor appears in the ISASecure CSA registry [ISASecure, 2025] | None |
| Power Conversion System (PCS) | DC-AC conversion; grid synchronisation | Modbus TCP; DNP3 to grid operator | **Not certified** — inverter/PCS products from Tesla, Fluence, SMA not listed | None |
| Energy Management System (EMS) | Charge/discharge optimisation; grid dispatch commands | Modbus TCP; REST API | **Not certified** — EMS platforms from Fluence, Greensmith, etc. not listed | None |
| Thermal Management System | Liquid or air cooling of battery modules; HVAC for enclosure | BACnet or proprietary | **Not certified** — cooling controllers from Vertiv, Motivair not listed | None |
| Fire Detection and Suppression | Gas detection (HF, CO, VOC); aerosol or water mist suppression | Proprietary; relay interfaces | N/A (safety system) | N/A |

**Certification gap:** The ISASecure CSA registry (IEC 62443-4-2) contains no datacenter-specific BESS components. While vendors like ABB, Schneider Electric, and Honeywell hold SDLA (Secure Development Lifecycle Assurance) certifications for their development processes, the actual BESS products deployed in datacenters have not been submitted for component-level certification [ISASecure, 2025]. This means asset owners cannot verify component-level security compliance against IEC 62443-4-2 for any BESS component.

**Table 12.3a: ISASecure-certified OT components relevant to datacenter infrastructure (for comparison)**

| Vendor | Product | Component Type | Certification | Datacenter Relevance |
|:---|:---|:---|:---|:---|
| Moxa | EDR-G9010 Series | Industrial Router/Firewall | CSA (IEC 62443-4-2) | OT network segmentation between zones |
| Moxa | TN-4900 Series | Industrial Managed Switch | CSA | OT network backbone for BMS/EPMS |
| Honeywell | ControlEdge PLC/RTU | Embedded Device | CSA | BMS / process control |
| Honeywell | Safety Manager | Safety Controller | CSA | Safety Instrumented Systems |
| ABB | Ability System 800xA | DCS | SSA (IEC 62443-3-3) | Campus-level BMS/EMS |
| Schneider Electric | EcoStruxure Foxboro DCS | DCS | SSA | Datacenter mechanical/electrical control |

**Source:** ISASecure Certified Products Registry, accessed 2025-06-13 [ISASecure, 2025].

**Gap analysis:** UPS Network Management Cards (Vertiv, Schneider APC, Eaton), BMS controllers (Schneider EBO, Siemens Desigo CC, JCI Metasys), CDU PLCs (Vertiv, Motivair, CoolIT), and EPMS meters (Schneider ION series) are **not certified** at the component level. Only Moxa industrial switches and Honeywell PLCs appear in the CSA registry among datacenter-relevant products.

### 1.3 CyHAZOPs Hazard Log — Node N15

**Table 12.4: CyHAZOPs Hazard Log — Node N15**

| ID | Guide Word | Parameter | Deviation | Cyber Cause | MITRE | Consequence | S | O | D | RPN | Table | IEC 62443 Zone | SL-T |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| N15-CY-001 | **MORE** | Charge voltage | Cell overcharge beyond safe limit | Attacker modifies BMS charge voltage ceiling via Modbus write | T0836 | Thermal runaway initiation; cell venting; cascading propagation to adjacent cells; fire; toxic gas (HF, CO) | 10 | 3 | 7 | **210** | B | Zone 6 (BESS) | SL 3 |
| N15-CY-002 | **NO** | Thermal management | BESS cooling disabled during high-rate charge | Attacker stops BESS thermal management while commanding high-rate charge via EMS | T0831 | Accelerated cell degradation; reduced time to thermal runaway; enclosure temperature exceeds safe limits | 9 | 4 | 6 | **216** | B | Zone 6 | SL 3 |
| N15-CY-003 | **SPOOFED** | Cell temperature | False cell temperature reporting | Attacker modifies BMS temperature registers to report 25°C while actual temperature exceeds 60°C | T0856 | BMS does not trigger protective disconnect; thermal runaway proceeds undetected | 10 | 3 | 9 | **270** | B | Zone 6 | SL 3 |
| N15-CY-004 | **COORDINATED** | Discharge + Fire suppression | Forced full-rate discharge during fire suppression activation | Attacker commands full discharge (maximum current) while simultaneously activating fire suppression relay | T0858 | Electrical arc energy exceeds suppression capacity; fire suppression depleted; fire spreads | 10 | 2 | 8 | **160** | B | Zone 6 → Zone 3 | SL 3 |
| N15-CY-005 | **NO** | Protective disconnect | Battery isolation contactors held closed during fault | Attacker writes contactor control register to prevent protective opening during overcurrent/thermal event | T0858 | BESS cannot isolate faulted string; fault current feeds fire; no safe shutdown | 10 | 2 | 9 | **180** | B | Zone 6 | SL 3 |

**Zone mapping:** All BESS OT components (BMS, PCS, EMS, thermal management) reside in Zone 6 (BESS) per the IEC 62443-3-2 zone model defined in the standards research [IEC 62443-3-2, Clause 5]. The fire suppression system resides in Zone 3 (Fire & Life Safety). Conduit C6-3 between Zone 6 and Zone 3 must be a hardwired interlock, not a network path, to prevent coordinated attacks (N15-CY-004).

### 1.4 The BESS Thermal Runaway Cascade

BESS thermal runaway is different in kind from any other hazard in this series. It is:

- **Self-sustaining:** Once thermal runaway propagates beyond a single cell, the stored chemical energy sustains the reaction independent of external input. Removing power does not stop it.
- **Toxic:** Lithium-ion thermal runaway produces hydrogen fluoride (HF) — lethal at 30 ppm, immediately dangerous at 50 ppm (NIOSH, 2019). The facility becomes uninhabitable.
- **Long-duration:** A 200 MWh BESS fire can burn for days. Traditional fire suppression slows but does not extinguish it. Cell-to-cell propagation rates range from 1–60 seconds per cell depending on chemistry and form factor (DNV, 2020).
- **Expansive:** Thermal propagation from one cell to adjacent cells to adjacent modules to adjacent racks follows a cascade timeline of minutes to hours.

**This is a Table B archetype.** The Taleb Test: can the architecture survive a full BESS thermal runaway event? Only if the BESS is physically separated from the IT facility with sufficient blast/fire separation distance. The cybersecurity investment is in preventing the initiation — not in surviving the consequence.

**Standards references:** NFPA 855 (2026 Edition) requires a Hazard Mitigation Analysis (HMA) using UL 9540A test data for all stationary ESS installations above 20 kWh aggregate [NFPA 855, Ch. 4]. UL 9540A defines four test levels: cell, module, unit, and installation [UL 9540A, 2023]. The 2026 edition of NFPA 855 introduces explicit Large-Scale Fire Testing (LSFT) mandates for manufacturer claims [NFPA 855, 2026]. For datacenter BESS, the installation-level test is the most relevant — it validates suppression system effectiveness against a full-scale fire.

### 1.5 Safeguards

**Table 12.5: Safeguards for BESS cybersecurity**

| Safeguard | Implementation | Priority | Standard Reference |
|:---|:---|:---|:---|
| Hardwired cell-level thermal disconnect | Hardware thermal fuse on each cell string that opens at 80°C — independent of BMS software | P1 | NFPA 855 Ch. 9 (fire detection) |
| BMS network isolation | BESS OT on dedicated VLAN/subnet; no conduit to facility BMS | P1 | IEC 62443-3-2 Zone 6 isolation; CR 5.1 network segmentation |
| Independent gas detection | HF/CO/VOC sensors with hardwired alarm to facility fire panel — not routed through BESS BMS | P1 | NFPA 855 Ch. 10 (ventilation); NFPA 76 (2024) off-gas detection |
| Physical separation | BESS installation at minimum 15 m separation from IT data halls per NFPA 855:2023, Section 4.3 (NFPA, 2023) | P1 | NFPA 855 Ch. 4 (HMA) — separation distance determined by UL 9540A test results |
| BMS firmware write protection | Physical write-protect switch on BMS controller; firmware updates require physical presence | P2 | IEC 62443-4-2 CR 3.4 (software integrity); OCP S.A.F.E. Scope 1 (external attack surface) |
| UL 9540A installation-level testing | Require vendor to provide UL 9540A installation-level test report before commissioning | P1 | UL 9540A; NFPA 855 Ch. 4 (HMA) |
| Emergency Operations Plan (EOP) | Documented response procedures including fire department coordination with UL 9540A data | P1 | NFPA 855 Ch. 13 |

---

## 2. Water Treatment Systems — Node N16

### 2.1 System Description

Every liquid-cooled hyperscale facility depends on treated water. The water treatment system is an OT system hiding in plain sight:

**Table 12.6: Water systems in hyperscale datacenters**

| Water System | Purpose | Treatment | ASHRAE Water Class | Typical Supply Temperature |
|:---|:---|:---|:---|:---|
| Chilled water (CHW) loop | Primary cooling medium for chillers and AHUs | Chemical inhibitors (glycol, biocide, corrosion inhibitors); conductivity management | W17–W27 | 7–17°C |
| Technology Cooling System (TCS) | CDU/cold plate secondary loop | Ultra-pure deionised water (DI); conductivity <1 µS/cm; oxygen scavenging | W32–W45 | 27–45°C |
| Cooling tower makeup water | Evaporative cooling replenishment | Softening; biocide dosing; anti-scale treatment; blowdown management | N/A (ambient) | Ambient |
| Reclaimed / grey water supply | Municipal wastewater reuse for cooling tower makeup (adopted at facilities in water-stressed regions) | Additional biological treatment; pathogen control; higher mineral load management | N/A | Ambient |
| Fire suppression water | Fire protection supply | Pressure maintenance; anti-freeze (if applicable) | N/A | Ambient |

**ASHRAE TC 9.9 water temperature classes:** The TCS loop typically operates in the W32–W45 range (chiller-free in most climates). The CHW loop operates in W17–W27 (requires chiller + economizer). Minimum supply water temperature is 2°C for all classes [ASHRAE TC 9.9, 5th Edition, 2021].

**Note on reclaimed water:** Facilities using municipal reclaimed water (e.g., Microsoft's San Jose campus, Google's Douglas County facility) introduce biological treatment OT — UV disinfection systems, membrane bioreactors, and chloramine dosing controllers — that are absent from conventional treated-water plants. These systems add OT nodes with their own protocol stacks and cybersecurity requirements.

### 2.2 The Slow Sabotage Vector

Water treatment sabotage is particularly dangerous because it is *slow-acting and hard to detect*. A modified pH setpoint does not cause an immediate alarm. Corrosion takes weeks. By the time cold plate failures begin, the root cause is invisible.

**Table 12.7: Attack scenarios for water treatment systems**

| Attack Scenario | Mechanism | Time to Impact | Detection Difficulty | ASHRAE/NFPA Reference |
|:---|:---|:---|:---|:---|
| pH manipulation in TCS loop | Modify chemical dosing PLC to increase pH above 9.5 or below 6.0 | 2–6 weeks (corrosion onset) | Very high — no immediate alarm; requires laboratory water analysis | ASHRAE TC 9.9 recommends pH 6.5–8.5 for DI loops |
| Conductivity target manipulation | Modify DI system to pass water at >5 µS/cm (inadequate deionisation) | 1–3 months (mineral deposit buildup in cold plates) | Very high — cold plate performance degrades gradually | ASHRAE TC 9.9: DI conductivity <1 µS/cm for TCS |
| Biocide dosing elimination in cooling tower | Disable biocide dosing pump via PLC | 2–4 weeks (Legionella growth; biofilm formation) | High — requires microbiological testing; health hazard to personnel | OSHA Legionella standard; ASHRAE Guideline 12-2020 |
| Anti-scale treatment defeat | Modify scale inhibitor dosing setpoint to zero | 1–3 months (scale buildup reduces heat transfer efficiency) | Moderate — PUE degrades gradually; often attributed to load increase | ASHRAE TC 9.9 water quality guidelines |

### 2.3 CyHAZOPs Hazard Log — Node N16

**Table 12.8: CyHAZOPs Hazard Log — Node N16**

| ID | Guide Word | Deviation | Cyber Cause | Consequence | S | O | D | RPN | Table | IEC 62443 Zone | SL-T |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| N16-CY-001 | **MORE** | pH raised above safe limit | Attacker modifies chemical dosing PLC setpoint | Alkaline corrosion of copper cold plates; micro-leaks; eventual coolant-to-IT contact | 8 | 4 | 9 | **288** | B | Zone 1 (BMS/HVAC) | SL 2–3 |
| N16-CY-002 | **NO** | Biocide dosing eliminated | Attacker disables biocide dosing pump via Modbus | Legionella proliferation in cooling towers; public health risk; regulatory shutdown | 7 | 5 | 8 | **280** | B | Zone 1 | SL 2–3 |
| N16-CY-003 | **LESS** | Conductivity target loosened | Attacker modifies DI system target from 0.5 to 10 µS/cm | Mineral deposits in DLC loop; progressive cold plate fouling; reduced thermal capacity | 7 | 4 | 9 | **252** | A | Zone 1 | SL 2–3 |
| N16-CY-004 | **SPOOFED** | Water quality readings masked | Attacker modifies pH/conductivity sensor calibration offsets | Water quality appears normal while actual chemistry is corrosive/contaminated | 8 | 3 | 10 | **240** | B | Zone 1 | SL 2–3 |

**Zone mapping:** Water treatment PLCs and dosing controllers reside in Zone 1 (BMS/HVAC) per the IEC 62443-3-2 zone model. The chemical dosing PLC should be on a dedicated network segment within Zone 1, isolated from the facility BMS head-end. Conduit C0-1 (Enterprise IT → BMS) must not allow direct access to dosing PLCs.

### 2.4 Safeguards

**Table 12.9: Safeguards for water treatment cybersecurity**

| Safeguard | Implementation | Priority | Standard Reference |
|:---|:---|:---|:---|
| Independent water quality monitoring | Standalone conductivity/pH analyser on DI loop — not connected to the dosing PLC | P1 | ASHRAE TC 9.9 recommends continuous monitoring; IEC 62443-3-2 zone separation |
| Periodic laboratory analysis | Monthly grab samples analysed by independent lab; results compared to online readings | P2 | ASHRAE TC 9.9 water quality testing protocol |
| Chemical dosing PLC isolation | Water treatment PLC on dedicated network segment; no conduit to BMS | P1 | IEC 62443-3-2 Zone 1 segmentation; CR 5.1 |
| High/low chemistry alarms hardwired | pH and conductivity out-of-range alarms wired directly to facility alarm panel | P1 | NFPA 72 (fire alarm) integration; hardwired interlock per IEC 62443-3-2 conduit C1-3 |
| Dosing pump manual override | Physical manual control for biocide and pH dosing pumps — independent of PLC | P2 | Safety instrumented system (SIS) per IEC 61511 |

---

## 3. Nuclear/SMR Interconnection and Hydrogen Fuel Cells

*Note: Detailed CyHAZOPs analysis for SMR and hydrogen fuel cell systems is deferred to a future revision. The following summary identifies key OT integration points based on current industry deployments.*

**SMR (Small Modular Reactor) interconnection:** Hyperscale operators (e.g., Microsoft, Google) have signed 20-year PPAs with nuclear developers (e.g., TerraPower, X-energy, NuScale). The interconnection point is typically at the medium-voltage substation (Zone 4 per IEC 62443-3-2). Protection relays must comply with IEC 61850 and IEC 62351 for secure GOOSE/MMS communication. The nuclear plant's OT network must be treated as a separate zone with SL-T 4 (state-level threat) due to regulatory requirements from the U.S. Nuclear Regulatory Commission (NRC) or equivalent.

**Hydrogen fuel cells:** Pilot installations (e.g., Microsoft's Latham, NY facility) use proton-exchange membrane (PEM) fuel cells for backup power. OT components include hydrogen supply pressure regulators, fuel cell stack controllers, and power inverters. These communicate via Modbus TCP and CAN bus. Hydrogen detection sensors (H₂) must be hardwired to the facility fire alarm system per NFPA 2 (Hydrogen Technologies Code). The fuel cell system should be assigned to Zone 6 (BESS) or a new Zone 7 (Hydrogen) with SL-T 3.

---

## References

- ASHRAE TC 9.9. (2021). *Thermal Guidelines for Data Processing Environments*, 5th Edition.
- IEC 62443-3-2. (2020). *Security Risk Assessment for System Design*.
- IEC 62443-4-2. (2019). *Technical Security Requirements for IACS Components*.
- ISASecure. (2025). *Certified Products Registry*. https://isasecure.org/certification/certified-products
- NFPA 855. (2023, 2026). *Standard for the Installation of Stationary Energy Storage Systems*.
- NFPA 76. (2024). *Standard for the Fire Protection of Telecommunications Facilities*.
- UL 9540A. (2023). *Test Method for Evaluating Thermal Runaway Fire Propagation in Battery Energy Storage Systems*.
- NIOSH. (2019). *Hydrogen Fluoride: Immediately Dangerous to Life or Health Concentrations*.
- DNV. (2020). *Battery Safety: Cell-to-Cell Propagation Rates*.
- OCP S.A.F.E. (2024). *Security Appraisal Framework and Enablement*. https://www.opencompute.org/projects/security