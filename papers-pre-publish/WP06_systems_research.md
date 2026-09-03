# WP06 — Hyperscale Datacenter Cooling Infrastructure: Systems Research Brief

**Date:** 2026-06-13  
**Purpose:** Vendor-specific technical specifications for CyHAZOPs Reference Architecture WP06  
**Research Scope:** CDUs, immersion cooling (single- and two-phase), cold plates, VFD control loops, chillers, cooling towers, ASHRAE liquid cooling classes

---

## Table of Contents

1. [Coolant Distribution Units (CDUs) by Vendor](#1-coolant-distribution-units-cdus-by-vendor)
2. [Two-Phase Immersion Cooling](#2-two-phase-immersion-cooling)
3. [Single-Phase Immersion Cooling](#3-single-phase-immersion-cooling)
4. [VFD Control Loops for CDU Pumps](#4-vfd-control-loops-for-cdu-pumps)
5. [Cold Plate Specifications](#5-cold-plate-specifications)
6. [ASHRAE W-Class Liquid Cooling Classifications](#6-ashrae-w-class-liquid-cooling-classifications)
7. [Chiller Specifications for Datacenter](#7-chiller-specifications-for-datacenter)
8. [Cooling Tower Specifications](#8-cooling-tower-specifications)
9. [Dielectric & Immersion Cooling Fluid Properties](#9-dielectric--immersion-cooling-fluid-properties)

---

## 1. Coolant Distribution Units (CDUs) by Vendor

### 1.1 CoolIT Systems — DCLC Platform

| Parameter | Specification |
|---|---|
| **Flagship Model** | CHx2000 (Row-Based CDU) |
| **Heat Rejection Capacity** | 2,000 kW (at 5°C approach temperature) |
| **Flow Rate Target** | 1.2–1.5 LPM/kW of heat load |
| **Coolant Type** | Water-glycol mixture (PG or EG) |
| **Dimensions (W×D)** | 750 mm × 1,200 mm (single-rack footprint) |
| **Pump Redundancy** | N+N hot-swappable pumps with integrated ultracapacitor backup |
| **Filtration** | 25-micron standard (field-serviceable) |
| **Controller** | 10-inch touchscreen; group control for up to 20 CDUs |
| **Communication Protocols** | Redfish, SNMP, TCP/IP, Modbus, BACnet (available/planned) |
| **Warm Water Support** | ASHRAE W+ (up to 45°C+ inlet) |
| **Other Models** | AHx240 (liquid-to-air), CHx80 (compact rack-mount) |

**Sources:**
- [CoolIT Systems CDU Portfolio](https://www.coolitsystems.com)
- [StorageReview — CoolIT CHx2000](https://storagereview.com)
- [CoolIT 15kW Cold Plate Announcement](https://prnewswire.com)

---

### 1.2 Motivair (by Schneider Electric)

| Parameter | Specification |
|---|---|
| **CDU Capacity Range** | 105 kW to 2.5 MW per unit |
| **Newer Models** | MCDU-45, MCDU-55, MCDU-70 (AI factory-scale) |
| **Scalability** | Architectures to 10 MW+ for large AI factories |
| **Heat Exchanger** | Stainless-steel plate heat exchangers |
| **Pump Control** | VFD-driven pumps with integrated PLC controls |
| **Flow Control** | Modulating 2-way valves, real-time IT demand-based |
| **Temperature Range** | W1–W5 (55°F–113°F+ / 13°C–45°C+) |
| **ChilledDoor® RDHX** | Up to 75 kW per rack (100% sensible cooling) |
| **HDU (liquid-to-air)** | Up to 150 kW; ~32 GPM (MHDU-5910) |

**Sources:**
- [Motivair Corp CDU Portfolio](https://motivaircorp.com)
- [Schneider Electric Liquid Cooling](https://se.com)

---

### 1.3 Vertiv — CoolChip CDU (successor to Liebert XDU)

| Parameter | Specification |
|---|---|
| **Liquid-to-Liquid Models** | 100 kW, 450 kW, 600 kW, 1,350 kW, 2,300 kW |
| **Liquid-to-Air Models** | Up to 70 kW |
| **Pump Redundancy (600 kW)** | Twin pumps (N+N run/standby or simultaneous) |
| **Pump Redundancy (1350 kW)** | Triple pumps (N+2 configurable) |
| **Pump Features** | VSD controls, intelligent flow monitoring, hot-swappable |
| **Maintenance** | Concurrent maintainability with isolation valves |
| **Auto-Failover** | Automatic switchover on pump failure with controller alerts |

**Sources:**
- [Vertiv CoolChip CDU Product Line](https://vertiv.com)

---

### 1.4 Schneider Electric — Uniflair CDU

| Parameter | Specification |
|---|---|
| **Model** | Uniflair Liquid-to-Liquid CDU |
| **Capacity** | 1 MW |
| **Approach Temperature** | 3°C ATD |
| **Pump Type** | High-efficiency VFD pumps |
| **Dimensions** | 86.6″ H × 43.3″ W × 47.2″ D (2,200 × 1,100 × 1,199 mm) |
| **Redundancy** | Built-in pump and power redundancy |

**Sources:**
- [Schneider Electric Uniflair CDU](https://se.com)
- [Power Solutions — Uniflair CDU](https://power-solutions.com)

---

### 1.5 Boyd Corporation (formerly Liqtech / Eaton Boyd Thermal)

| Parameter | ROL4000-48U65 | ROL1100-48U32 | 4U L2L CDU | 10U L2A CDU |
|---|---|---|---|---|
| **Capacity** | 2 MW | 550–1,100 kW | ~80 kW (9.5°C ATD) | >30 kW |
| **TCS Flow Rate** | 500 GPM (1,890 LPM) | — | — | — |
| **Pump Redundancy** | N+1 seal-less pumps | — | N+1 | N+1 (pump, fan, PSU) |
| **Power** | Redundant feeds | — | — | 100–230 VAC |
| **Coolant** | Water, EGW, PGW | Water, EGW, PGW | Water, EGW, PGW | Water, EGW, PGW |
| **Controller** | Intelligent diagnostics, flow/pressure/temp monitoring | — | Industry-standard protocols | — |
| **Design Basis** | OCP "Project Deschutes" | — | — | — |
| **Leak Detection** | Integrated | Integrated | Integrated | Integrated |
| **Quick Disconnects** | Blind-mate swivel fittings | — | — | — |

**Sources:**
- [Boyd Corp CDU Portfolio](https://boydcorp.com)
- [Open Compute Project — Deschutes](https://opencompute.org)
- [Mouser — Boyd CDU datasheets](https://mouser.com)

---

### 1.6 Asetek — RackCDU D2C

| Parameter | Specification |
|---|---|
| **Max Heat Rejection** | Up to 80 kW per rack |
| **Heat Capture** | 60–80% of total server heat (CPU, GPU, memory) |
| **Operating Temperature** | Warm water up to 45°C (113°F) — chiller-free |
| **Pump Architecture** | Distributed pumping — integrated pump/cold plate units per CPU/GPU |
| **Pump Redundancy** | Redundant via multi-processor distributed design |
| **CDU Form Factor** | Zero-U rack extension or 4U rack-mount |
| **Heat Exchanger** | Liquid-to-liquid (server loop isolated from facility loop) |
| **Monitoring** | Real-time temp, flow, pressure; leak detection; DCIM integration |
| **Quick Connects** | Dripless quick disconnectors |

**Sources:**
- [Asetek RackCDU D2C](https://asetek.com)
- [NREL — Warm Water Cooling Study](https://nrel.gov)
- [LBNL — Liquid Cooling Analysis](https://lbl.gov)

---

### CDU Vendor Comparison Matrix

| Vendor | Model | Max Capacity | Pump Redundancy | Protocols | Filtration |
|---|---|---|---|---|---|
| CoolIT | CHx2000 | 2,000 kW | N+N + ultracap | Redfish, SNMP, Modbus, BACnet | 25 µm |
| Motivair/SE | MCDU-70 | 2,500 kW | N+1 VFD | PLC-integrated | Stainless plate HX |
| Vertiv | CoolChip 2300 | 2,300 kW | Triple (N+2) | VSD + controller alerts | — |
| Schneider | Uniflair L2L | 1,000 kW | Built-in | VFD | — |
| Boyd | ROL4000 | 2,000 kW | N+1 seal-less | Industry standard | — |
| Asetek | RackCDU D2C | 80 kW/rack | Distributed | DCIM integration | — |

---

## 2. Two-Phase Immersion Cooling

### 2.1 ZutaCore HyperCool

| Parameter | Specification |
|---|---|
| **Cooling Mechanism** | Two-phase direct-to-chip (D2C) pool boiling |
| **Dielectric Fluids** | Opteon SF33 (HFO-1336mzz-Z), R-1233zd |
| **Fluid Boiling Point** | 18°C–50°C (configurable by fluid selection) |
| **System Pressure** | < 3 bar |
| **Air-Cooled HRU** | Up to 20 kW per rack |
| **Water-Cooled HRU** | Up to 100+ kW per rack |
| **Key Advantage** | Waterless in white space; no water pipes between racks |
| **Condenser Design** | In-rack condenser (air) or facility water HRU |
| **Components** | Dielectric cold plates, manifolds, service unit (pump/purge) |
| **Software** | Software Defined Cooling (SDC) — real-time monitoring |
| **Thermal Stability** | Chip temp pinned near fluid boiling point regardless of TDP fluctuations |

**Sources:**
- [ZutaCore HyperCool Technology](https://zutacore.com)
- [Chatsworth Products — ZutaCore Partnership](https://chatsworth.com)
- [Primeline Solutions — ZutaCore](https://primeline-solutions.com)

---

### 2.2 LiquidStack DataTank™

| Parameter | DataTank 48U | DataTank 4U | MicroModular | MacroModular |
|---|---|---|---|---|
| **Cooling Capacity** | Up to 252 kW | Up to 6 kW | Up to 250 kW | Up to 1.5 MW |
| **Cooling Type** | Two-phase & single-phase immersion | Two-phase | Containerized | Containerized |
| **PUE** | 1.02–1.03 | — | — | — |
| **Single-Phase (W32)** | >110 kW per tank | — | — | — |
| **Design Life** | 20–30 years | — | — | — |
| **Fluid** | Non-hazardous, eco-friendly dielectric | — | — | — |

**Sources:**
- [LiquidStack Solutions](https://liquidstack.com)
- [LiquidStack Technical Documents](https://liquidstack.com/resources/technical-documents/)
- [SiliconAngle — LiquidStack](https://siliconangle.com)

---

### 2.3 Two-Phase Dielectric Fluids — Novec Replacement Landscape

3M discontinued Novec™ and Fluorinert™ production by end of 2025. Primary replacements:

| Fluid | Vendor | Boiling Point (°C) | Thermal Conductivity (W/m·K) | Specific Heat (kJ/kg·K) | GWP | Dielectric Constant | Viscosity (cP) | Flash Point |
|---|---|---|---|---|---|---|---|---|
| **Opteon SF33** (HFO-1336mzz-Z) | Chemours | 33.4 | 0.077 | 1.2 | 2 | 32 | 0.38 | None |
| **R-1233zd(E)** | Honeywell/Various | 18.3 | ~0.083 | ~1.2 | 1 | — | ~0.40 | None |
| **Galden HT55** | Solvay | 55 | 0.065 | 0.96* | ~0 ODP | 1.86 | 0.45 cSt | None |
| **Galden HT110** | Solvay | 110 | 0.065 | 0.96* | ~0 ODP | 1.92 | 0.77 cSt | None |
| **Galden HT170** | Solvay | 170 | 0.065 | 0.96* | ~0 ODP | 1.94 | 1.80 cSt | None |
| **Asahiklin AE-3000** | AGC Chemicals | ~38–56 | ~0.07–0.08 | — | Low | — | — | None |

*Galden specific heat: 0.23 cal/g·°C ≈ 0.96 kJ/kg·K*

> **⚠ PFAS Regulatory Risk:** Both Galden (PFPE) and some Asahiklin grades are fluorinated chemistries. The same PFAS regulatory pressure that drove 3M's exit continues to evolve globally (EU PFAS restriction proposals, US EPA TSCA). These should be considered transitional solutions while PFAS-free alternatives (engineered hydrocarbons) mature.

**Sources:**
- [Chemours Opteon SF33 TDS](https://chemours.com)
- [Solvay Galden HT Series TDS](https://solvay.com)
- [AGC Chemicals Asahiklin](https://agc-chemicals.com)

---

## 3. Single-Phase Immersion Cooling

### 3.1 GRC (Green Revolution Cooling) — ICEraQ / CarnotJet

| Parameter | CarnotJet (Eval Unit) | ICEraQ Production |
|---|---|---|
| **Capacity (IT)** | 13U | 42U+ |
| **Max Heat Load** | 6–8 kW (eval) | 184–368 kW/rack |
| **Dimensions** | 30″L × 26″W × 51″H | Varies by config |
| **Empty Weight** | ~150 lbs (68 kg) | — |
| **Filled Weight** | ~675 lbs (306 kg) | — |
| **Coolant** | ElectroSafe (dielectric, non-toxic) |
| **pPUE** | <1.03 |
| **Power Density** | Up to 2,200 W/sq.ft. |
| **Coolant Lifecycle** | Designed for datacenter lifetime (no replenishment) |

**Sources:**
- [GRC ICEraQ Platform](https://grcooling.com)

---

### 3.2 Submer — SmartPodX

| Parameter | Specification |
|---|---|
| **Heat Dissipation** | Up to 50 kW (standard); up to 100 kW (XL/custom) |
| **IT Capacity** | 21U (19″) / 19 OU (OCP 21″) |
| **Dimensions (L×W×H)** | 1,200 mm × 900 mm × 1,190 mm |
| **Weight (Empty)** | 411 kg (~906 lbs) |
| **SmartCoolant Volume** | 576 liters |
| **Total Weight (Full)** | 872 kg (~1,922 lbs) |
| **PUE** | ≤1.03 |
| **Coolant Type** | SmartCoolant (synthetic dielectric, non-toxic, biodegradable) |
| **Flash Point** | >180°C (356°F) |
| **Management** | Local + Submer Cloud; DCIM API integration |
| **Standards** | OCP-compliant (19″ + 21″ form factors) |

**Sources:**
- [Submer SmartPodX Datasheet](https://submer.com)
- [2CR SI — SmartPodX Specs](https://2cr.si)
- [GSMA — Submer SmartPodX](https://gsma.com)

---

### 3.3 Asperitas — AIC24

| Parameter | Specification |
|---|---|
| **Cooling Capacity** | 32 kW (standard); up to 60 kW (high-density) |
| **IT Capacity** | 24U + 2×1U switch space |
| **Dimensions (L×W×H)** | 1,500 mm × 714 mm × 1,600 mm |
| **Service Height** | 2,460 mm clearance required |
| **Facility Water Flow** | 0.5 L/s nominal; 1.6 L/s maximum |
| **Circulation Method** | Perpetual Natural Convection (no internal pumps) |
| **Power** | 3-phase 400V (32A or 63A) |
| **Weight (Empty)** | ~1,080 kg |
| **Weight (with IT)** | ~1,680 kg |

**Sources:**
- [Asperitas AIC24](https://asperitas.com)

---

### 3.4 Single-Phase Immersion Cooling Fluids

| Property | Shell S5 X | Castrol ON DC 15 | ElectroCool EC-100 |
|---|---|---|---|
| **Type** | Synthetic (GTL) | Hydrocarbon | Synthetic hydrocarbon |
| **Viscosity @40°C** | 9.8 mm²/s | 7.5 mm²/s | Proprietary (see TDS) |
| **Density** | 806 kg/m³ (@15°C) | 835 kg/m³ (@15.6°C) | — |
| **Flash Point** | 200°C (COC) | 166°C | — |
| **Pour Point** | −36°C | −45°C | — |
| **Thermal Conductivity @40°C** | 0.142 W/m·K | 0.126 W/m·K | Proprietary |
| **Dielectric Breakdown** | 42 kV | >35 kV | >40 kV |
| **Dielectric Constant** | — | — | 2.080 |
| **Biodegradable** | Yes (food-grade) | Partial | 98% biodegradable |
| **PFAS-Free** | Yes (non-halogenated) | Yes | Yes (non-halogenated) |

**Sources:**
- [TwinOils — Shell S5 X TDS](https://twinoils.com)
- [Castrol ON Fluids](https://castrol.com)
- [Kernow Oils — Castrol ON DC 15](https://kernow-oils.co.uk)
- [Engineered Fluids — ElectroCool](https://engineeredfluids.com)

---

## 4. VFD Control Loops for CDU Pumps

### 4.1 ABB ACQ580

| Parameter | Specification |
|---|---|
| **Application** | Water/wastewater pumping (applicable to CDU pump loops) |
| **Built-in PID** | Yes — closed-loop speed control on pressure, flow, or temperature |
| **PID Assistant** | Control panel wizard for feedback (AI2) and setpoint (AI1/constant/fieldbus) |
| **Pump Features** | Intelligent Pump Control (IPC), soft pipe fill, dry run protection, anti-cavitation |
| **Embedded Comms** | Modbus RTU (RS-485) — native |
| **Modbus Parameters** | Group 58: `58.01` Protocol enable, `58.03` Node address, `58.04` Baud rate, `58.05` Parity |
| **Optional Comms** | Modbus TCP (FMBT-21), EtherNet/IP, PROFINET, PROFIBUS (FENA-xx adapters) |
| **Legacy Support** | Parameter `96.78` for legacy ACQ550 Modbus mapping |
| **Key Manual** | ACQ580 Pump Control Program Firmware Manual (Doc: 3AXD50000035867) |

**Sources:**
- [ABB ACQ580 Product Page](https://abb.com)
- [ABB ACQ580 Firmware Manual](https://abb.com — Doc 3AXD50000035867)

---

### 4.2 Danfoss iC7 / iC7-Aqua

| Parameter | Specification |
|---|---|
| **Application** | High-performance motor control; iC7-Aqua for pump/HVAC |
| **Built-in PID** | Full PID process controller with auto-tuning |
| **Feedback** | Scaled and converted from multiple sources |
| **Pump Features** | Extended ramp (initial/final/check valve), variable torque, sleep mode, multi-pump |
| **Embedded Comms** | Dual Ethernet port — Modbus TCP standard |
| **Supported Protocols** | Modbus TCP, PROFINET RT, EtherNet/IP, EtherCAT, OPC UA |
| **License Model** | Protocol switching via software license token (no hardware swap) |
| **Custom Logic** | MyDrive® Insight — embedded automation sequences (can replace external PLC) |
| **Power Range** | 380–500 VAC (up to 690V); fractional kW to 4,500 kW |
| **Motor Types** | Induction, PM, SynRM |
| **Safety** | STO SIL3 standard; PROFIsafe optional |
| **Commissioning** | Automatic Motor Adaptation (AMA) at standstill |

**Sources:**
- [Danfoss iC7 Series](https://danfoss.com)

---

### 4.3 Siemens SINAMICS G120

| Parameter | Specification |
|---|---|
| **Application** | General purpose; G120P / CU230P-2 for pump/fan |
| **Built-in PID** | Technology Controller — closed-loop pressure/flow/level |
| **Key Parameters** | `p2200` (enable PID), `p2253` (setpoint source), `p2280` (P-gain), `p2350` (autotuning) |
| **Autotuning** | Automatic PID gain optimization |
| **PROFINET** | Standard — PROFIdrive, PROFIsafe, PROFIenergy profiles; requires GSDML file |
| **PROFIBUS DP** | Traditional fieldbus; GSD file integration |
| **Modbus RTU** | RS-485 master/slave; register mapping per Control Unit |
| **Additional Protocols** | EtherNet/IP, USS, BACnet MS/TP, CANopen (CU-dependent) |
| **Bus Termination** | DIP switches on Control Unit for RS-485 |
| **Tools** | STARTER or SINAMICS Startdrive (TIA Portal) |

**Sources:**
- [Siemens SINAMICS G120](https://siemens.com)

---

### VFD Comparison for CDU Pump Applications

| Feature | ABB ACQ580 | Danfoss iC7 | Siemens G120 |
|---|---|---|---|
| **Built-in PID** | ✅ + PID Assistant | ✅ + Auto-tune | ✅ + Autotuning |
| **Modbus RTU** | Native (RS-485) | — | RS-485 |
| **Modbus TCP** | Optional (FMBT-21) | Standard (embedded) | Optional |
| **PROFINET** | Optional adapter | Standard (license) | Standard |
| **PROFIBUS** | Optional adapter | — | Standard |
| **EtherNet/IP** | Optional adapter | Standard (license) | CU-dependent |
| **BACnet** | — | — | MS/TP (CU-dependent) |
| **OPC UA** | — | ✅ | — |
| **Pump-Specific Features** | IPC, dry run, anti-cavitation | Sleep mode, multi-pump, ramp | Pump/fan macros |
| **Max Power** | — | 4,500 kW | — |

---

## 5. Cold Plate Specifications

### 5.1 CoolIT — Split-Flow™ Cold Plates

| Parameter | 4000W-Ready Cold Plate | 15kW Cold Plate (2026) |
|---|---|---|
| **Thermal Resistance** | < 0.009 °C/W | — |
| **Full-Loop Pressure Drop** | ~8 PSI (inc. fittings, QDs) | — |
| **Validated Flow Rate** | 6 LPM (1.5 LPM/kW) | 1.2 LPM/kW |
| **Architecture** | Split-Flow™ microchannel | Split-Flow™ microchannel |
| **Performance vs. Standard** | ~30% better thermal & flow vs. end-to-end microchannel | — |
| **Test Coolant** | Water or PG25 at 45°C | — |

**Sources:**
- [CoolIT Split-Flow Technology Brief](https://coolitsystems.com)
- [CoolIT 15kW Cold Plate Press Release](https://prnewswire.com)

---

### 5.2 Asetek Cold Plates

| Parameter | Specification |
|---|---|
| **Architecture** | Microchannel + integrated pump/cold plate ("Ingredient Cooler") |
| **Thermal Resistance** | Custom per OEM engagement — not publicly published |
| **Design Philosophy** | Distributed pumping — each cold plate has integrated pump |
| **System Constraint** | ΔP budget balanced against CDU/pump curve |
| **Key Metric** | R = (T_chip − T_fluid) / Q [°C/W] — flow-rate dependent |
| **Integration** | Factory-integrated with Dell, HPE, Intel, Supermicro |
| **Characterization Method** | Bench-scale TCS test at 30%, 60%, 100%, 120% nominal flow |

**Sources:**
- [Asetek D2C Technology](https://asetek.com)

---

### 5.3 ZutaCore Two-Phase Cold Plates

| Parameter | Specification |
|---|---|
| **Cooling Mechanism** | Pool boiling (two-phase) at chip surface |
| **Fluid** | Opteon SF33 or R-1233zd (boils at 18–50°C) |
| **Heat Transfer** | Phase change (latent heat) — significantly higher heat flux capacity than single-phase |
| **No Pump at Cold Plate** | Gravity/thermosiphon return; service unit for initial charge/purge |
| **System Pressure** | < 3 bar |
| **Key Advantage** | No water in white space; thermal uniformity across chip |

**Sources:**
- [ZutaCore Technology](https://zutacore.com)

---

### 5.4 Mezzo Technologies — Microtube Heat Exchangers

| Parameter | Specification |
|---|---|
| **Core Technology** | Microtube heat exchangers (0.5–2.0 mm tube diameter) |
| **Primary Applications** | Aerospace, defense, automotive, industrial (not standard DC cold plates) |
| **Materials** | Stainless steel, superalloys, titanium |
| **Thermal Resistance** | Custom — depends on geometry, flow rate, alloy, TIM |
| **DC Relevance** | Custom engineering partner for extreme-density/specialized environments |

**Sources:**
- [Mezzo Technologies](https://mezzotechnologies.com)

---

## 6. ASHRAE W-Class Liquid Cooling Classifications

### ASHRAE TC 9.9 — 5th Edition Thermal Guidelines

| Class | Max FWS Temperature | °F | Typical Cooling Infrastructure |
|---|---|---|---|
| **W17** | 17°C | 62.6°F | Chiller + Cooling Tower |
| **W27** | 27°C | 80.6°F | Chiller + Cooling Tower |
| **W32** | 32°C | 89.6°F | Cooling Tower only; district heating potential |
| **W40** | 40°C | 104.0°F | Cooling Tower; district heating |
| **W45** | 45°C | 113.0°F | Cooling Tower / Dry Cooler; district heating |
| **W+** | >45°C | >113.0°F | Dry Cooler; district heating |

*Minimum water temperature for all classes: 2°C (35.6°F)*

### Critical Design Distinctions

- **FWS vs. TCS:** W-classes define the **Facility Water System** supply temperature. The **Technology Cooling System** (server loop) temperature is higher due to CDU approach temperature (typically 3–5°C).
- **Trend for AI/HPC:** Industry moving from W45 toward W32 to maintain thermal margin as chip TDPs increase (e.g., NVIDIA GB200 at 1,000W+).
- **Heat Reuse:** W45/W+ enables district heating integration; W32 requires supplemental heat pumps for reuse.

**Sources:**
- [ASHRAE TC 9.9 — Thermal Guidelines for Data Processing Environments, 5th Edition](https://ashrae.org)
- [ASHRAE Datacom Encyclopedia](https://ashrae.org)

---

## 7. Chiller Specifications for Datacenter

### 7.1 YORK YZ Magnetic Bearing Centrifugal Chiller (Johnson Controls)

| Parameter | Specification |
|---|---|
| **Capacity Range** | 150–1,550 tons (580–5,450 kW) |
| **Refrigerant** | R-1233zd(E) — GWP = 1 |
| **Compressor** | Magnetic bearing (oil-free); single moving assembly |
| **Drive** | Integral Variable-Speed Drive (VSD) — standard |
| **Evaporator** | Patented falling-film design (60% reduced refrigerant charge) |
| **Full-Load Efficiency** | As low as 0.1 kW/ton (at optimal off-design conditions) |
| **Annual Savings** | Up to 35% vs. fixed-speed oil-bearing chillers |
| **Standards** | Exceeds Ecodesign Tier 2 |
| **Controller** | OptiView™ Control Center (100+ setpoints/readouts/alerts) |
| **Communication** | BACnet, Modbus RTU (via E-Link gateway or native) |
| **Cloud Analytics** | Secure remote monitoring; predictive diagnostics |
| **Parts Reduction** | 80% fewer moving parts vs. traditional driveline |

**Sources:**
- [Johnson Controls YORK YZ](https://johnsoncontrols.com)
- [HVAC Navigator — YZ Specs](https://hvacnavigator.com)

---

### 7.2 Trane CenTraVac

| Parameter | Specification |
|---|---|
| **Capacity Range** | 200–6,000+ tons (700–21,000+ kW) |
| **DC-Optimized Models** | CDHH, CVHH |
| **Refrigerant** | R-514A, R-1233zd — GWP < 2 |
| **Compressor** | Direct-drive, multi-stage; one primary moving part |
| **Full-Load Efficiency** | 0.45–0.48 kW/ton (AHRI conditions) |
| **IPLV** | 0.28–0.52 kW/ton |
| **Controller** | Tracer AdaptiView™ / Symbio® 800 |
| **Communication** | BACnet MS/TP and IP (native); BACnet/SC (Secure Connect) |
| **Legacy Integration** | BCI-C communication interface module |
| **Options** | Heat recovery, free cooling, thermal storage, Adaptive Frequency VFDs |

**Sources:**
- [Trane CenTraVac Portfolio](https://trane.com)
- [Trane HK — CenTraVac](https://tranehk.com)
- [Trane Technologies](https://tranetechnologies.com)

---

### 7.3 Carrier AquaEdge 19DV

| Parameter | Specification |
|---|---|
| **Capacity Range** | 300–1,150 tons (1,000–4,044 kW) |
| **Refrigerant** | R-1233zd(E) |
| **Full-Load COP** | Up to 7.3 |
| **IPLV** | As low as 0.295 kW/ton |
| **Compressor** | EquiDrive™ two-stage back-to-back; ceramic bearings; independent guide vanes |
| **Evaporator** | Hybrid falling-film design |
| **Controller** | SmartView™ (PIC6) |
| **Communication** | BACnet MS/TP or IP; Modbus RTU or TCP/IP |
| **Protocol Note** | Cannot run conflicting BACnet + Modbus simultaneously on same layer; can run Modbus RTU + BACnet IP, or BACnet MS/TP + Modbus TCP/IP |
| **Integration** | i-Vu™ / WebCTRL networks |

**Sources:**
- [Carrier AquaEdge 19DV](https://carrier.com)
- [Carrier SharedDocs — 19DV Controls Manual](https://shareddocs.com)

---

### Chiller Comparison Matrix

| Feature | YORK YZ | Trane CenTraVac | Carrier 19DV |
|---|---|---|---|
| **Max Capacity** | 1,550 tons | 6,000+ tons | 1,150 tons |
| **Refrigerant** | R-1233zd(E) | R-514A / R-1233zd | R-1233zd(E) |
| **GWP** | 1 | <2 | 1 |
| **Best IPLV** | ~0.1 kW/ton (off-design) | 0.28 kW/ton | 0.295 kW/ton |
| **Bearing Type** | Magnetic (oil-free) | Direct-drive | Ceramic |
| **BACnet** | ✅ | ✅ (incl. BACnet/SC) | ✅ |
| **Modbus** | RTU (gateway) | Via BCI-C module | RTU + TCP/IP |
| **VSD** | Integral (standard) | Adaptive Frequency | Integral |

---

## 8. Cooling Tower Specifications

### 8.1 BAC Series 3000

| Parameter | Specification |
|---|---|
| **Type** | Induced Draft, Crossflow |
| **Capacity Range** | 171–1,446+ tons |
| **Key Feature** | High thermal performance, modular multi-cell |
| **Certifications** | CTI Certified, ASHRAE 90.1 compliant |
| **VFD Fan Control** | VFD-duty premium-efficient motors (standard/optional) |
| **BMS Communication** | BACnet MS/TP, Modbus RTU |
| **Control Input** | 4–20 mA or 0–10 VDC from BMS to VFD |

**Sources:**
- [BAC Cooling Towers](https://baltimoreaircoil.com)

---

### 8.2 EVAPCO AT Atlas

| Parameter | Specification |
|---|---|
| **Type** | Induced Draft, Counterflow |
| **Key Feature** | High efficiency, compact footprint (field-erected parity) |
| **Hybrid Option** | eco-ATWB-H (evaporative + dry cooling hybrid) |
| **Certifications** | CTI, IBC, ASHRAE 90.1 |
| **VFD Fan Control** | VFD-duty motors; soft start |
| **BMS Communication** | BACnet MS/TP, Modbus RTU |
| **Smart Controls** | Embedded standalone logic with fieldbus status reporting |

**Sources:**
- [EVAPCO Cooling Products](https://evapco.com)

---

### 8.3 SPX Marley MD

| Parameter | Specification |
|---|---|
| **Type** | Induced Draft, Counterflow |
| **Capacity Range** | 89–756 tons |
| **Key Feature** | Versatile, site-adaptable; easy multi-cell expansion |
| **Certifications** | CTI, Eurovent, FM Approved |
| **VFD Fan Control** | VFD-duty motors |
| **BMS Communication** | BACnet MS/TP, Modbus RTU |
| **Controls Package** | Marley Controls standalone with BMS integration |
| **Monitoring Parameters** | Vibration cutout, motor current/voltage, basin water level, temperature |

**Sources:**
- [SPX Cooling Technologies — Marley MD](https://spxcooling.com)

---

### Cooling Tower Comparison

| Feature | BAC 3000 | EVAPCO AT | SPX Marley MD |
|---|---|---|---|
| **Airflow Type** | Crossflow | Counterflow | Counterflow |
| **Max Capacity** | 1,446+ tons | High (field-erected class) | 756 tons |
| **CTI Certified** | ✅ | ✅ | ✅ |
| **BACnet** | ✅ MS/TP | ✅ MS/TP | ✅ MS/TP |
| **Modbus** | ✅ RTU | ✅ RTU | ✅ RTU |
| **VFD Support** | ✅ | ✅ | ✅ |
| **Hybrid Option** | — | eco-ATWB-H | — |
| **FM Approved** | — | — | ✅ |

---

## 9. Dielectric & Immersion Cooling Fluid Properties — Master Comparison

### Two-Phase Fluids

| Property | Opteon SF33 | R-1233zd(E) | Galden HT55 | Galden HT110 | Asahiklin AE-3000 |
|---|---|---|---|---|---|
| **Chemistry** | HFO-1336mzz-Z | HCFO | PFPE | PFPE | HFO |
| **Boiling Point (°C)** | 33.4 | 18.3 | 55 | 110 | ~38–56 |
| **Thermal Cond. (W/m·K)** | 0.077 | ~0.083 | 0.065 | 0.065 | ~0.07–0.08 |
| **Specific Heat (kJ/kg·K)** | 1.2 | ~1.2 | 0.96 | 0.96 | — |
| **Density (g/cm³)** | 1.36 | ~1.27 | 1.65 | 1.71 | — |
| **Viscosity** | 0.38 cP | ~0.40 cP | 0.45 cSt | 0.77 cSt | — |
| **Dielectric Constant** | 32 | — | 1.86 | 1.92 | — |
| **GWP** | 2 | 1 | Low (verify by grade) | Low (verify) | Low |
| **ODP** | 0 | 0 | 0 | 0 | 0 |
| **Flash Point** | None | None | None | None | None |
| **PFAS Status** | Non-PFAS (HFO) | Non-PFAS (HCFO) | ⚠ PFAS (PFPE) | ⚠ PFAS (PFPE) | Verify per grade |

### Single-Phase Fluids

| Property | Shell S5 X | Castrol ON DC 15 | ElectroCool EC-100 | GRC ElectroSafe |
|---|---|---|---|---|
| **Chemistry** | GTL Synthetic | Hydrocarbon | Synthetic HC | Dielectric (proprietary) |
| **Viscosity @40°C** | 9.8 mm²/s | 7.5 mm²/s | Proprietary | — |
| **Density** | 806 kg/m³ | 835 kg/m³ | — | — |
| **Flash Point** | 200°C | 166°C | — | — |
| **Pour Point** | −36°C | −45°C | — | — |
| **Thermal Cond. @40°C** | 0.142 W/m·K | 0.126 W/m·K | Proprietary | — |
| **Dielectric Strength** | 42 kV | >35 kV | >40 kV | — |
| **Dielectric Constant** | — | — | 2.080 | — |
| **Biodegradable** | Yes | Partial | 98% | — |
| **PFAS-Free** | ✅ | ✅ | ✅ | — |
| **Lifecycle** | Long (non-oxidizing) | Long | Long | Datacenter lifetime |

---

## Appendix A: Key Vendor Contact / Documentation References

| Vendor | Product | Key Document / Resource |
|---|---|---|
| CoolIT | CHx2000 CDU | [coolitsystems.com](https://coolitsystems.com) |
| Motivair/SE | MCDU Series | [motivaircorp.com](https://motivaircorp.com) |
| Vertiv | CoolChip CDU | [vertiv.com](https://vertiv.com) |
| Schneider | Uniflair CDU | [se.com](https://se.com) |
| Boyd | ROL4000 CDU | [boydcorp.com](https://boydcorp.com) |
| Asetek | RackCDU D2C | [asetek.com](https://asetek.com) |
| ZutaCore | HyperCool | [zutacore.com](https://zutacore.com) |
| LiquidStack | DataTank | [liquidstack.com](https://liquidstack.com) |
| GRC | ICEraQ | [grcooling.com](https://grcooling.com) |
| Submer | SmartPodX | [submer.com](https://submer.com) |
| Asperitas | AIC24 | [asperitas.com](https://asperitas.com) |
| ABB | ACQ580 | Doc: 3AXD50000035867 ([abb.com](https://abb.com)) |
| Danfoss | iC7 | [danfoss.com](https://danfoss.com) |
| Siemens | G120 | [siemens.com](https://siemens.com) |
| Johnson Controls | YORK YZ | [johnsoncontrols.com](https://johnsoncontrols.com) |
| Trane | CenTraVac | [trane.com](https://trane.com) |
| Carrier | AquaEdge 19DV | [carrier.com](https://carrier.com) |
| BAC | Series 3000 | [baltimoreaircoil.com](https://baltimoreaircoil.com) |
| EVAPCO | AT Atlas | [evapco.com](https://evapco.com) |
| SPX | Marley MD | [spxcooling.com](https://spxcooling.com) |
| Chemours | Opteon SF33 | [chemours.com](https://chemours.com) |
| Solvay | Galden HT | [solvay.com](https://solvay.com) |
| AGC | Asahiklin | [agc-chemicals.com](https://agc-chemicals.com) |
| Shell | S5 X | [shell.com](https://shell.com) |
| Castrol | ON DC 15 | [castrol.com](https://castrol.com) |
| Engineered Fluids | ElectroCool | [engineeredfluids.com](https://engineeredfluids.com) |
| ASHRAE | TC 9.9 5th Ed | [ashrae.org](https://ashrae.org) |

---

## Appendix B: Research Methodology Notes

- **Date of Research:** 2026-06-13
- **Sources prioritized:** Vendor product pages, datasheets (Scribd-hosted), OCP specifications, ASHRAE standards, manufacturer press releases
- **Data gaps identified:**
  - Asetek cold plate thermal resistance: Not publicly published (OEM-specific)
  - Mezzo Technologies: Custom engineering, no standard DC product specs
  - ElectroCool EC-100: Thermal conductivity and specific heat require direct TDS from manufacturer
  - ISASecure certification status for chillers: Not confirmed in public documentation — recommend direct inquiry
  - Exact Modbus register maps for all VFDs: Require firmware-version-specific manuals from each vendor
  - Cooling tower specific GPM/flow rates: Depend on site-specific design conditions and selections

---

*End of WP06 Systems Research Brief*
