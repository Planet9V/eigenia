# Design Considerations for Hyperscale Datacentre Infrastructure

## Chapter 6: Cooling Architecture — Air, Direct-to-Chip, and Immersion

## Abstract

At rack densities above 80 kW, a CDU pump failure causes GPU thermal throttling within 45 seconds and protective shutdown within 90 seconds. Air-cooled systems at 20 kW/rack provide minutes of thermal response time. This chapter provides a comparative analysis of three cooling modalities — air, direct-to-chip liquid (DLC), and immersion — with their respective OT attack surfaces, thermal failure velocities, and IEC 62443 zone requirements. No CDU controller, immersion tank controller, or CRAH unit controller holds any IEC 62443-4-2 certification from any vendor.

---

## Practitioner's Note

I have walked through chiller plants in Auckland that cool 2 MW of legacy enterprise compute with two York centrifugal chillers and a BACnet-networked BMS. I have reviewed reference architectures for 100 MW AI factories where 72-GPU rack-scale systems generate 130 kW each and require CDU controllers managing 2.3 MW of heat transfer. The thermodynamic principles are the same; the scale, the density, and the cyber-physical consequences are not.

When a compromised chiller controller at a 2 MW facility causes a thermal excursion, the operations team walks to the plant room, resets the controller, and the event is closed within the hour. When a compromised CDU controller at a 100 MW AI facility causes thermal throttling across a 1,500-GPU training cluster, the economic impact is measured in hundreds of thousands of dollars per hour of interrupted training time, and the cascading effects on model convergence timelines affect business commitments measured in quarters.

This chapter provides a rigorous, comparative analysis of the three cooling modalities — structured for an engineering audience that must make architectural decisions with long-term cyber-physical risk implications.

### Field Observation

During the commissioning phase of a new DLC deployment at a European hyperscale campus in late 2024, the project team discovered that the CDU controller's Modbus TCP interface was accessible from the facility's general-purpose OT management VLAN — the same VLAN used by BMS workstations, vendor remote-access jump hosts, and the building security system. The CDU vendor's commissioning engineer confirmed that setpoint writes (pump speed, supply temperature, valve position) required no authentication. Any device on that VLAN could issue a Modbus function code 06 (Write Single Register) to change the CDU supply temperature setpoint from 32°C to 55°C. At the deployed rack density of 105 kW, the thermal response time from setpoint manipulation to GPU throttling was measured at 38 seconds during acceptance testing. The remediation — placing the CDU controllers in a dedicated zone with a protocol-aware firewall permitting only read operations from the BMS — was completed during commissioning at negligible cost. Had this been discovered after handover, the network redesign would have required a maintenance window affecting the production GPU cluster.

---

## 1. The Thermodynamic Imperative

The physics is unambiguous. Water has a thermal conductivity over 23× greater than air and stores approximately 3,000× more heat per unit volume. At rack densities above 30–40 kW, air cooling reaches its practical limit — the volumetric airflow required exceeds the physical capacity of standard containment aisles and the acoustic limits of chassis fans.

Modern AI accelerators have pushed well beyond this limit:

**Table 6.2: Modern AI accelerators have pushed well beyond this limit**

| Accelerator | TDP per Module | Rack Configuration | Rack Power |
|:---|:---|:---|:---|
| NVIDIA H100 SXM5 | 700 W | 8× per HGX baseboard; 4–8 per rack | 35–60 kW |
| NVIDIA B200 SXM | 1,000 W | 8× per HGX baseboard | 50–80 kW |
| NVIDIA GB200 NVL72 | 72× B200 + 36× Grace | Full rack-scale | 120–142 kW |
| AMD MI300X | 750 W | 8× per OAM baseboard | 40–60 kW |
| AMD MI350X | ~1,000 W (est.) | 8× per OAM baseboard | 60–80 kW |
| Intel Gaudi 3 | ~500 W | 8× per baseboard | 30–40 kW |

At 120+ kW per rack, liquid cooling is not an option — it is the only viable approach. The question is which liquid cooling modality, and what OT security implications each carries.

The ASHRAE TC 9.9 5th Edition thermal guidelines define Facility Water Supply (FWS) temperatures from W17 (chiller + tower) to W45+ (dry cooler / district heating). For AI clusters the industry is shifting from W45 toward W32 to maintain thermal margin as chip TDPs increase. [Research: ASHRAE TC 9.9 5th Ed.]

---

## 2. Modality 1: Precision Air Cooling (Legacy and Low-Density)

### 2.1 Architecture

Computer Room Air Handlers (CRAHs) circulate chilled water through coils to produce cold air, which is delivered to server intakes via raised-floor plenums or overhead ducting. Computer Room Air Conditioners (CRACs) use direct expansion (DX) with internal compressors — self-contained units that do not require external chilled water.

Hot/cold aisle containment — physical barriers that separate supply and exhaust airstreams — improves efficiency by 20–40% and is mandatory per ASHRAE TC 9.9 for all new deployments.

### 2.2 Applicable Range

Air cooling remains viable and appropriate for:
- Storage racks (5–15 kW/rack)
- Networking infrastructure (10–20 kW/rack)
- Management and control servers (10–25 kW/rack)
- Legacy compute environments undergoing gradual densification

### 2.3 OT Attack Surface

**Table 6.3: 2.3 OT Attack Surface — Air Cooling Components**

| Component | OT Interface | IEC 62443 Zone | Certification Status |
|:---|:---|:---|:---|
| CRAH unit controller | BACnet/IP or Modbus TCP to BMS | Z2 | No vendor holds 62443-4-2 cert |
| CRAH supply fan VFD | Modbus RTU to local controller | Z3 | No certification |
| Chilled water valve (motorised) | BACnet/Modbus from BMS | Z2/Z3 boundary | No certification |
| Temperature/humidity sensors | Analog 4‑20mA or BACnet MS/TP | Z3 (L0) | N/A (passive) |

**Key vendors:** Vertiv Liebert (DS, FC, SRC), Schneider Uniflair, Stulz CyberAir 4, Munters, Airedale, Daikin Applied.

**Risk assessment:** Moderate. Air-cooled systems have a well-understood OT attack surface — BMS-connected controllers with standard BACnet/Modbus interfaces. The consequence of compromise is thermal discomfort and eventual throttling, not immediate hardware damage, because air-cooled racks operate at lower densities with greater thermal mass.

**Known Vulnerabilities Impacting BMS Platforms Used in Air Cooling:**

| CVE ID | CVSS | Affected Product | Impact | Source |
|:---|:---|:---|:---|:---|
| CVE-2025-3936 | 9.8 | Honeywell Niagara < 4.14u2 | Remote code execution on JACE controllers | [NVD] |
| CVE-2025-26385 | 10.0 | Johnson Controls Metasys ADS/ADX ≤ 14.1 | SQL injection leading to chiller setpoint manipulation | [CISA ICSA-26-027-04] |
| CVE-2025-47809 | 8.2 | Siemens Desigo CC (CodeMeter) | Privilege escalation to admin | [CISA] |
| CVE-2026-1226 | High | Schneider EcoStruxure B.O. Workstation | XXE injection | [Schneider SEVD-2026-041-02] |

These vulnerabilities apply to any BMS managing CRAHs, chillers, or cooling towers. Air cooling inherits the full BMS attack surface.

### 2.4 Pros and Cons — Air Cooling

**Table 6.4: 2.4 Pros and Cons — Air Cooling**

| Factor | Assessment |
|:---|:---|
| **Maturity** | Decades of operational experience; well-understood maintenance |
| **Simplicity** | Fewer OT components; smaller attack surface per rack |
| **Scalability** | Cannot scale above ~30 kW/rack without impractical airflow volumes |
| **PUE** | 1.3–1.5 typical; 1.2 achievable with economiser and containment |
| **AI-readiness** | Not viable for GPU clusters exceeding 40 kW/rack |
| **Security posture** | Moderate risk; well-understood attack surface; lower consequence of compromise |

---

## 3. Modality 2: Direct-to-Chip Liquid Cooling (DLC/D2C)

### 3.1 Architecture

DLC circulates coolant through cold plates bonded directly to the primary heat-generating components — CPUs, GPUs, and HBM packages. The system architecture follows the OCP Advanced Cooling Solutions (ACS) two-loop model:

**Facility Water System (FWS):** The primary loop transports heat from CDUs to the central plant (chillers, cooling towers, or dry coolers). Large-diameter carbon steel, CPVC, or PE-100 piping. Designed per standard chilled water plant practices.

**Technology Cooling System (TCS):** The secondary loop circulates highly purified coolant from the CDU, through rack manifolds, into server cold plates, and back. The TCS is completely isolated from the FWS by a Brazed Plate Heat Exchanger (BPHE) inside the CDU. TCS piping is 304/316L stainless steel or PP-R (polypropylene) to prevent corrosion. Fluid purity is critical — particulate filtration to 50 microns absolute, electrical conductivity below 2,500 µS/cm (PG25) or 100 µS/cm (DI water).

**Coolant Distribution Unit (CDU):** The thermal bridge between loops. Contains the BPHE, redundant stainless steel pumps (N+1), internal reservoir, 50-micron filtration, temperature and flow sensors, and a PLC-based controller that manages pump speed, valve position, and temperature regulation.

### 3.2 Cold Plate and Quick-Disconnect Technology

Cold plates with micro-channel geometries (flow channels as narrow as 100 microns) achieve thermal resistance of 0.02°C/W with PG25 or 0.015°C/W with pure DI water at 2–5 LPM flow rates. Quick Disconnects (QDs) conforming to OCP UQD v2.0 use dripless blind-mate or hand-mate couplings with EPDM or FKM seals, allowing hot-swap of individual servers without draining the loop.

**Specific cold plate specifications:**

| Vendor | Model | Thermal Resistance | Flow Rate | Architecture | Source |
|:---|:---|:---|:---|:---|:---|
| CoolIT | Split-Flow™ | <0.009 °C/W (4000W plate) | 6 LPM (1.5 LPM/kW) | Microchannel | [CoolIT] |
| Asetek | Integrated pump/cold plate | OEM-specific | Distributed pumping | Microchannel + pump | [Asetek] |
| ZutaCore | Two-phase cold plate | N/A (phase change) | N/A (gravity return) | Pool boiling | [ZutaCore] |
| Mezzo Technologies | Microtube HX | Custom | Custom | Microtube 0.5–2 mm | [Mezzo] |

### 3.3 CDU Vendor Specifications

**Table 6.5: CDU Vendor Comparison**

| Vendor | Model | Max Capacity | Pump Redundancy | Communication Protocols | Filtration | Source |
|:---|:---|:---|:---|:---|:---|:---|
| CoolIT | CHx2000 | 2,000 kW | N+N hot-swappable + ultracapacitor | Redfish, SNMP, TCP/IP, Modbus, BACnet | 25 µm | [CoolIT] |
| Motivair/SE | MCDU-70 | 2,500 kW | N+1 VFD | PLC-integrated | Stainless plate HX | [Motivair] |
| Vertiv | CoolChip 2300 | 2,300 kW | Triple (N+2) with VSD | VSD + controller alerts | — | [Vertiv] |
| Schneider Electric | Uniflair L2L | 1,000 kW | Built-in N+1 | VFD | — | [Schneider] |
| Boyd (Liqtech) | ROL4000 | 2,000 kW | N+1 seal-less | Industry standard (Modbus, BACnet) | 50 µm | [Boyd OCP Deschutes] |
| Asetek | RackCDU D2C | 80 kW/rack | Distributed (multi-pump) | DCIM integration | — | [Asetek] |

### 3.4 OT Attack Surface

**Table 6.6: DLC OT Attack Surface — Detailed Component Mapping**

| Component | OT Interface | IEC 62443 Zone | Certification Status | Consequence of Compromise |
|:---|:---|:---|:---|:---|
| CDU controller (PLC) | Modbus TCP/BACnet to BMS | Z2 | **No vendor certified** | GPU thermal shutdown in 45–90 seconds |
| CDU pump VFD | Modbus RTU from CDU PLC | Z3 | No certification | Flow starvation; thermal throttling |
| CDU isolation valve (motorised) | BACnet/Modbus from BMS | Z2/Z3 | No certification | Coolant isolation; rack overheat |
| TCS flow sensors | Analog/Modbus to CDU PLC | Z3 (L0) | N/A (passive) | Loss of flow visibility |
| TCS temperature sensors | Analog/Modbus to CDU PLC | Z3 (L0) | N/A (passive) | Loss of thermal visibility |
| Rack manifold QDs | Mechanical (no OT interface) | N/A | N/A | Physical leak if manipulated |
| Leak detection cables | Digital/analog to BMS | Z3 | No certification | Loss of leak detection |
| CDU vendor cloud portal | HTTPS to vendor cloud | Z2→external conduit | No certification | Remote access to CDU controls |

**Key CDU vendors:** Motivair (XDU/Cascade), CoolIT Systems, Asetek (RackCDU), Boyd (Liqtech), Vertiv (XDU-Liebert), Schneider Electric CDU, Lenovo Neptune, ZutaCore (two-phase CDU), nVent.

**Key cold plate vendors:** Asetek, CoolIT, ZutaCore, Mezzo Technologies, Boyd/Aavid.

**Key QD vendors:** CPC, Stäubli Quickliq, Parker Hannifin, Swagelok.

### 3.5 Known Vulnerabilities Affecting DLC Infrastructure

| CVE ID | CVSS | Affected System | Impact | Source |
|:---|:---|:---|:---|:---|
| CVE-2024-48510 | 9.8 | ABB Drive Composer (CDU VFD configuration) | Path traversal → file system access | [ABB] |
| CVE-2024-56336 | 9.8 | Siemens SINAMICS S200 (pump VFD) | Unlocked bootloader → full compromise | [Siemens] |
| CVE-2025-26385 | 10.0 | Johnson Controls Metasys (chiller/york integration) | SQL injection → setpoint control | [CISA] |
| CVE-2025-41450 | High | Danfoss AK-SM 8xxA (cooling controller) | Exploitation through AK-SM | [Danfoss] |
| CVE-2025-2595 | High | ABB AC500 V3 (CDU PLC alternative) | Firmware < 3.9.0 | [ABB] |

### 3.6 VFD Control Loops for CDU Pumps

Variable Frequency Drives (VFDs) govern pump speed based on closed-loop PID control. The primary CDU control loop modulates the FWS control valve to maintain TCS supply temperature within ±0.5°C of setpoint.

**Table 6.7: VFD Comparison for CDU Pump Applications**

| Feature | ABB ACQ580 | Danfoss iC7 | Siemens G120 |
|:---|:---|:---|:---|
| Built-in PID | ✅ + PID Assistant | ✅ + Auto-tune | ✅ + Autotuning |
| Modbus RTU | Native (RS‑485) | — | RS‑485 |
| Modbus TCP | Optional (FMBT‑21) | Standard (embedded) | Optional |
| PROFINET | Optional adapter | Standard (license) | Standard |
| BACnet | — | — | MS/TP (CU‑dependent) |
| OPC UA | — | ✅ | — |
| Pump‑specific features | IPC, dry run, anti‑cavitation | Sleep mode, multi‑pump, extended ramp | Pump/fan macros |
| Max power | — | 4,500 kW | — |

Sources: [ABB ACQ580 Firmware Manual], [Danfoss iC7], [Siemens G120].

### 3.7 BMS Control Logic for DLC

The BMS orchestrates DLC through several critical control loops:

**Primary PID loop:** The CDU controller modulates the FWS control valve to maintain TCS supply temperature within ±0.5°C of setpoint. This is the single most critical control metric in the liquid cooling architecture.

**Dew point tracking:** The BMS continuously calculates ambient dew point from temperature and humidity sensors and dynamically resets the TCS supply temperature to maintain at least 2°C above dew point — preventing condensation on cold plates and piping that would cause catastrophic short circuits.

**Differential pressure pump optimisation:** Variable-speed pumps adjust flow rate based on differential pressure at the most hydraulically remote manifold, ensuring adequate coolant delivery to all racks.

**Leak detection and automated isolation:** Upon detecting a verified leak (conductive sensing cable + CDU reservoir level drop), the BMS closes motorised isolation valves to sequester the affected zone and shuts down associated pumps.

### 3.8 Chiller and Cooling Tower Specifications Supporting DLC

The FWS is typically served by centrifugal chillers and cooling towers. The following equipment is common in hyperscale deployments:

**Table 6.8: Chiller Comparison for Datacenter**

| Feature | YORK YZ | Trane CenTraVac | Carrier AquaEdge 19DV |
|:---|:---|:---|:---|
| Max capacity | 1,550 tons | 6,000+ tons | 1,150 tons |
| Refrigerant | R-1233zd(E) | R-514A / R-1233zd | R-1233zd(E) |
| GWP | 1 | <2 | 1 |
| Best IPLV | ~0.1 kW/ton | 0.28 kW/ton | 0.295 kW/ton |
| Bearing type | Magnetic (oil‑free) | Direct‑drive | Ceramic |
| BACnet | ✅ (native) | ✅ (incl. BACnet/SC) | ✅ |
| Modbus | RTU (gateway) | Via BCI‑C module | RTU + TCP/IP |
| VSD | Integral (standard) | Adaptive Frequency | Integral |

Sources: [JCI YORK YZ], [Trane CenTraVac], [Carrier 19DV].

**Table 6.9: Cooling Tower Comparison**

| Feature | BAC Series 3000 | EVAPCO AT Atlas | SPX Marley MD |
|:---|:---|:---|:---|
| Airflow type | Induced draft, crossflow | Induced draft, counterflow | Induced draft, counterflow |
| Max capacity | 1,446+ tons | High (field‑erected class) | 756 tons |
| CTI Certified | ✅ | ✅ | ✅ |
| BACnet | ✅ MS/TP | ✅ MS/TP | ✅ MS/TP |
| Modbus | ✅ RTU | ✅ RTU | ✅ RTU |
| VFD support | ✅ | ✅ | ✅ |
| Hybrid option | — | eco‑ATWB‑H | — |

Sources: [BAC Cooling Towers], [EVAPCO AT Atlas], [SPX Marley MD].

### 3.9 Coolant Fluid Properties for DLC

The TCS typically uses a water‑glycol mixture (PG or EG) or deionized water. Thermal properties:

| Fluid | Thermal Conductivity (W/m·K) | Specific Heat (kJ/kg·K) | Viscosity @40°C (cP) | Flash Point |
|:---|:---|:---|:---|:---|
| DI Water | 0.61 | 4.18 | 0.65 | None |
| PG25 (25% PG/75% water) | ~0.45 | ~3.85 | ~1.5 | None |
| PG40 | ~0.38 | ~3.50 | ~2.5 | None |

Sources: [ASHRAE TC 9.9], [CoolIT].

### 3.10 Pros and Cons — DLC

**Table 6.10: 3.10 Pros and Cons — DLC**

| Factor | Assessment |
|:---|:---|
| **Thermal capacity** | Handles 60–142 kW/rack; 70–80% of rack heat removed via cold plates |
| **PUE** | 1.1–1.2 achievable |
| **OT attack surface** | Large: CDU controllers, VFDs, BMS integration, cloud portal |
| **Maturity** | Rapidly maturing; OCP standards, multiple vendors |
| **Complexity** | Medium‑high: requires secondary loop, leak detection, fluid management |
| **Security posture** | High risk: fastest thermal failure velocity; authenticated setpoint writes required |
| **Redundancy** | N+N pump redundancy available; automatic failover in seconds |
| **Coolant hazard** | Water/glycol — low toxicity, conductive if leaked |

---

## 4. Modality 3: Immersion Cooling

### 4.1 Architecture

Immersion cooling submerges IT equipment entirely in a dielectric fluid. Two variants exist:

- **Single‑phase immersion:** Fluid remains liquid; heat removed by circulation through a heat exchanger. Typical PUE ≤1.03.
- **Two‑phase immersion:** Fluid boils at chip surface; vapor rises, condenses on a cooled condenser, and returns as liquid. Higher heat flux capacity, waterless in the white space.

### 4.2 Single‑Phase Immersion Systems

| Vendor | Model | Max Heat Load | IT Capacity | Coolant | PUE | Source |
|:---|:---|:---|:---|:---|:---|:---|
| GRC | ICEraQ | 184–368 kW/rack | 42U+ | ElectroSafe (dielectric) | <1.03 | [GRC] |
| Submer | SmartPodX | Up to 100 kW | 21U (19″) or 19 OU (OCP 21″) | SmartCoolant (synthetic) | ≤1.03 | [Submer] |
| Asperitas | AIC24 | 32–60 kW | 24U + 2×1U switch | Dielectric fluid | — | [Asperitas] |
| LiquidStack | DataTank 48U (W32) | >110 kW | 48U | Non‑hazardous dielectric | 1.02–1.03 | [LiquidStack] |

**Single‑phase immersion fluids:**

| Property | Shell S5 X | Castrol ON DC 15 | ElectroCool EC‑100 |
|:---|:---|:---|:---|
| Chemistry | Synthetic (GTL) | Hydrocarbon | Synthetic hydrocarbon |
| Thermal conductivity @40°C | 0.142 W/m·K | 0.126 W/m·K | Proprietary |
| Dielectric breakdown | 42 kV | >35 kV | >40 kV |
| Flash point | 200°C | 166°C | — |
| PFAS‑free | ✅ | ✅ | ✅ |
| Biodegradable | Yes | Partial | 98% |

Sources: [Shell], [Castrol], [Engineered Fluids].

### 4.3 Two‑Phase Immersion Systems

| Vendor | Model | Capacity | Cooling Type | Dielectric Fluid | Source |
|:---|:---|:---|:---|:---|:---|
| ZutaCore | HyperCool | Up to 100+ kW/rack | Two‑phase D2C (pool boiling) | Opteon SF33, R-1233zd | [ZutaCore] |
| LiquidStack | DataTank 4U/48U | Up to 252 kW/rack | Two‑phase immersion | Proprietary dielectric | [LiquidStack] |

**Two‑phase dielectric fluids (PFAS risk noted):**

| Fluid | Boiling Point (°C) | Thermal Cond. (W/m·K) | GWP | Flash Point | PFAS Status | Source |
|:---|:---|:---|:---|:---|:---|:---|
| Opteon SF33 (HFO‑1336mzz‑Z) | 33.4 | 0.077 | 2 | None | Non‑PFAS | [Chemours] |
| R‑1233zd(E) | 18.3 | ~0.083 | 1 | None | Non‑PFAS | [Honeywell] |
| Galden HT55 (PFPE) | 55 | 0.065 | Low | None | ⚠ PFAS | [Solvay] |
| Asahiklin AE‑3000 | ~38–56 | ~0.07–0.08 | Low | None | Verify per grade | [AGC] |

**⚠ PFAS Regulatory Risk:** Galden (PFPE) and some Asahiklin grades are fluorinated chemistries. The same PFAS regulatory pressure that drove 3M's exit continues to evolve globally. These should be considered transitional solutions while PFAS‑free alternatives mature. [Research: PFAS Regulatory Risk, WP06].

### 4.4 OT Attack Surface — Immersion

Immersion cooling replaces the CDU with a simpler controller (pump/fan speeds, temperature monitoring, leak detection). The attack surface is smaller than DLC but still significant:

| Component | OT Interface | IEC 62443 Zone | Certification Status | Consequence |
|:---|:---|:---|:---|:---|
| Immersion tank controller | Modbus/BACnet to BMS | Z2 | No certification | Overheat, loss of circulation |
| Pump VFD (if external) | Modbus RTU | Z3 | No certification | Flow starvation |
| Leak detection sensors | Analog/digital to controller | Z3 | No certification | Delayed leak response |
| Vapor/condenser controls (2‑phase) | Modbus/BACnet | Z2 | No certification | Loss of condensation → pressure buildup |

Key vendors: GRC, Submer, Asperitas, ZutaCore, LiquidStack. No vendor holds IEC 62443‑4‑2 certification.

Single‑phase immersion has higher thermal inertia (minutes to throttle) than two‑phase, which can respond in seconds if condenser fails.

### 4.5 Pros and Cons — Immersion Cooling

| Factor | Assessment |
|:---|:---|
| **Thermal capacity** | Up to 368 kW/rack (GRC ICEraQ); 252 kW/rack (LiquidStack 2‑phase) |
| **PUE** | 1.02–1.03 typical |
| **OT attack surface** | Smaller than DLC (fewer components) but controllers still uncertified |
| **Maturity** | Emerging: single‑phase more mature; two‑phase niche |
| **Complexity** | Medium: dielectric fluid management; weight (1,500+ kg per tank) |
| **Security posture** | Moderate risk: slower thermal response (single‑phase); fewer attack vectors |
| **Coolant hazard** | Dielectric, non‑toxic, high flash point; PFAS concern for some fluids |
| **Serviceability** | Requires robotic or manual extraction of servers from fluid; higher OpEx |

---

## 5. Comparative Summary

| Modality | Max Rack Density | Typical PUE | Thermal Failure Velocity | OT Component Count | IEC 62443 Cert Status | Primary Attack Vector |
|:---|:---|:---|:---|:---|:---|:---|
| Air cooling | ~30 kW | 1.3–1.5 | Minutes | Low (CRAH, VFD, sensors) | No certs | BMS compromise → setpoint change |
| DLC | 60–142+ kW | 1.1–1.2 | 45–90 seconds | High (CDU, VFD, valves, sensors, cloud portal) | No certs | CDU controller Modbus write or VFD stop |
| Immersion (1‑phase) | 100–368 kW | 1.02–1.03 | Minutes (single‑phase) | Medium (tank controller, pump, leak detection) | No certs | Tank controller overheat setpoint |
| Immersion (2‑phase) | 100–252 kW | 1.02–1.03 | Seconds (2‑phase) | Medium (condenser, pump, vapor management) | No certs | Condenser failure via BMS |

---

## References

- ASHRAE TC 9.9, *Thermal Guidelines for Data Processing Environments*, 5th Edition.
- OCP Advanced Cooling Solutions (ACS) Specification.
- CoolIT Systems CDU Portfolio. [coolitsystems.com](https://coolitsystems.com)
- Motivair Corp. [motivaircorp.com](https://motivaircorp.com)
- Vertiv CoolChip CDU. [vertiv.com](https://vertiv.com)
- Schneider Electric Uniflair CDU. [se.com](https://se.com)
- Boyd Corp CDU Portfolio. [boydcorp.com](https://boydcorp.com)
- Asetek RackCDU D2C. [asetek.com](https://asetek.com)
- ZutaCore HyperCool. [zutacore.com](https://zutacore.com)
- LiquidStack DataTank. [liquidstack.com](https://liquidstack.com)
- GRC ICEraQ. [grcooling.com](https://grcooling.com)
- Submer SmartPodX. [submer.com](https://submer.com)
- Asperitas AIC24. [asperitas.com](https://asperitas.com)
- ABB ACQ580 Firmware Manual (Doc 3AXD50000035867). [abb.com](https://abb.com)
- Danfoss iC7 Series. [danfoss.com](https://danfoss.com)
- Siemens G120. [siemens.com](https://siemens.com)
- Johnson Controls YORK YZ. [johnsoncontrols.com](https://johnsoncontrols.com)
- Trane CenTraVac. [trane.com](https://trane.com)
- Carrier AquaEdge 19DV. [carrier.com](https://carrier.com)
- BAC Series 3000. [baltimoreaircoil.com](https://baltimoreaircoil.com)
- EVAPCO AT Atlas. [evapco.com](https://evapco.com)
- SPX Marley MD. [spxcooling.com](https://spxcooling.com)
- Chemours Opteon SF33. [chemours.com](https://chemours.com)
- Solvay Galden HT. [solvay.com](https://solvay.com)
- Shell S5 X. [shell.com](https://shell.com)
- Castrol ON. [castrol.com](https://castrol.com)
- Engineered Fluids ElectroCool. [engineeredfluids.com](https://engineeredfluids.com)
- CISA ICS Advisories: ICSA-26-027-04 (JCI Metasys), ICSA-25-322-04 (Schneider PowerChute).
- NVD: CVE-2025-3936, CVE-2025-26385, CVE-2024-48510, CVE-2024-56336, CVE-2025-41450, CVE-2025-2595.
- ABB PSIRT: [global.abb/group/en/technology/cyber-security/alerts-and-notifications](https://global.abb/group/en/technology/cyber-security/alerts-and-notifications)
- Siemens ProductCERT: [siemens.com/cert/advisories](https://www.siemens.com/cert/advisories)