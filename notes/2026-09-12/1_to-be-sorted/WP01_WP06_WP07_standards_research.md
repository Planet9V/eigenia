# WP01 / WP06 / WP07 — Engineering Standards Research
## Hyperscale Datacenter OT Infrastructure

> **Research Date:** 2025-06-13
> **Scope:** IEC 62443, ASHRAE TC 9.9, NFPA 75/76/855, EN 50600, ISO 22237, IEC 61850, OCP S.A.F.E.
> **Purpose:** Map specific standard clauses to specific datacenter OT infrastructure subsystems for CyHAZOPs Reference Architecture

---

## Table of Contents

1. [ISASecure Certified Products Registry](#1-isasecure-certified-products-registry)
2. [IEC 62443-3-2 — Zone & Conduit Model for Datacenters](#2-iec-62443-3-2--zone--conduit-model-for-datacenters)
3. [IEC 62443-4-2 — Component Security Requirements (FR1–FR7)](#3-iec-62443-4-2--component-security-requirements-fr1fr7)
4. [ASHRAE TC 9.9 — Thermal Guidelines](#4-ashrae-tc-99--thermal-guidelines)
5. [EN 50600 — Datacenter Classification](#5-en-50600--datacenter-classification)
6. [NFPA 75 / NFPA 76 — Datacenter Fire Protection](#6-nfpa-75--nfpa-76--datacenter-fire-protection)
7. [NFPA 855 / UL 9540A — Battery Energy Storage Systems](#7-nfpa-855--ul-9540a--battery-energy-storage-systems)
8. [IEC 61850 — Datacenter Substation Automation](#8-iec-61850--datacenter-substation-automation)
9. [OCP S.A.F.E. — Firmware Security Framework](#9-ocp-safe--firmware-security-framework)
10. [ISO 22237 — International Datacenter Standard](#10-iso-22237--international-datacenter-standard)
11. [IEC 62443-4-1 — Secure Development Lifecycle](#11-iec-62443-4-1--secure-development-lifecycle)
12. [Cross-Standard Integration Matrix](#12-cross-standard-integration-matrix)

---

## 1. ISASecure Certified Products Registry

**Registry URL:** https://isasecure.org/certification/certified-products

ISASecure is administered by the ISA Security Compliance Institute (ISCI) and provides three certification schemes mapped to ISA/IEC 62443:

### Certification Types

| Certification | Standard | Scope |
|:---|:---|:---|
| **SDLA** — Secure Development Lifecycle Assurance | ISA/IEC 62443-4-1 | Vendor development processes |
| **CSA** — Component Security Assurance | ISA/IEC 62443-4-2 | Individual components (PLCs, switches, controllers) |
| **SSA** — System Security Assurance | ISA/IEC 62443-3-3 | Complete automation systems (DCS, SIS) |
| **ICSA** — IIoT Component Security Assurance | ISA/IEC 62443-4-2 | IIoT edge devices and gateways |

### Certified Products Relevant to Datacenter Infrastructure

#### CSA (Component Security Assurance — IEC 62443-4-2) Certified Devices

| Vendor | Product | Component Type | DC Relevance | Certifying Body |
|:---|:---|:---|:---|:---|
| **Moxa** | EDR-G9010 Series | Industrial Router/Firewall | OT network segmentation between zones | exida / Bureau Veritas |
| **Moxa** | TN-4900 Series | Industrial Managed Switch | OT network backbone for BMS/EPMS | exida / Bureau Veritas |
| **InHand Networks** | Edge Gateways (various) | IIoT Gateway | Remote monitoring / edge compute | UL Solutions |
| **Honeywell** | ControlEdge PLC/RTU | Embedded Device | BMS / process control | exida |
| **Honeywell** | Safety Manager | Safety Controller | Safety Instrumented Systems | exida |

> **Note on datacenter-specific products:** UPS Network Management Cards (NMCs), dedicated datacenter BMS controllers, and EPMS meters are **not yet commonly found** in the ISASecure CSA registry. Most certified products originate from traditional industrial automation. This represents a significant gap — datacenter OT vendors (Vertiv, Schneider Electric APC division, Eaton power) have not broadly pursued ISASecure CSA certification for their datacenter-specific product lines.

#### SSA (System Security Assurance — IEC 62443-3-3) Certified Systems

| Vendor | System | DC Relevance |
|:---|:---|:---|
| **ABB** | Ability System 800xA | Large-scale DCS; applicable to campus-level BMS/EMS |
| **Schneider Electric** | EcoStruxure Foxboro DCS | Process control; datacenter mechanical/electrical |
| **Schneider Electric** | Triconex SIS | Safety instrumented systems |
| **Honeywell** | Experion PKS | Process Knowledge System; BMS backbone |

#### SDLA (Secure Development Lifecycle — IEC 62443-4-1) Certified Vendors

| Vendor | Scope | Maturity Level | DC Relevance |
|:---|:---|:---|:---|
| **ABB** | Multiple global sites (Sweden, Germany, India, Finland, USA) | ML3 | Power distribution, drives, BMS |
| **Schneider Electric** | Global SDL process | ML3 | EcoStruxure, power monitoring, UPS |
| **Honeywell** | Building Technologies, Connected Enterprise | ML3 | BMS, fire/life safety |
| **Johnson Controls** | Global secure product dev (OpenBlue, YORK) | ML3 | BMS, chiller controls |
| **Siemens** | Product security lifecycle aligned | — | BMS (Desigo), power (SICAM) |
| **Eaton** | IEC 62443 adherence (not publicly ISASecure listed) | — | UPS, PDU, switchgear |

**Source:** https://isasecure.org/en/Certification/ISASecure-SDLA-Certified-Development-Organizations.aspx

### Gap Analysis: Datacenter OT Products Not Yet Certified

| Asset Type | Typical Vendors | ISASecure Status |
|:---|:---|:---|
| UPS Network Management Cards | Vertiv (Liebert), Schneider (APC), Eaton | **Not certified** — critical gap |
| BMS Controllers (DC-specific) | Schneider (EBO), Siemens (Desigo CC), JCI (Metasys) | Vendor SDLA only; no product-level CSA |
| CDU/Coolant Distribution PLCs | Vertiv, Motivair, CoolIT | **Not certified** |
| EPMS Meters | Schneider (ION series), GE/Danaher | **Not certified** |
| Industrial Ethernet Switches (DC) | Cisco IE, Hirschmann/Belden, Moxa | Moxa CSA certified; others not |
| Protection Relays | SEL, ABB, Siemens, GE | **Not ISASecure certified** (IEC 61850 focused) |
| VFDs (Chiller/Pump Drives) | ABB, Siemens, Danfoss, Nidec | **Not certified** at component level |
| Fire Alarm Control Panels | Honeywell, Siemens, Edwards | Vendor SDLA only |

---

## 2. IEC 62443-3-2 — Zone & Conduit Model for Datacenters

**Standard:** ISA/IEC 62443-3-2 — *Security Risk Assessment for System Design*
**Source:** https://www.isa.org/standards-and-publications/isa-standards

### Zone & Conduit Requirements (ZCR) Process

| Step | ZCR Requirement | Datacenter Application |
|:---|:---|:---|
| ZCR 1 | Identify System Under Consideration (SuC) | Define boundary of datacenter OT: BMS, EPMS, fire/life safety, physical security, cooling controls |
| ZCR 2 | High-Level Risk Assessment | Assess threats per asset criticality; weight availability (FR7) highest for power/cooling |
| ZCR 3 | Partition into Zones and Conduits | Group assets by function, criticality, and trust level (see zone model below) |
| ZCR 4 | Assign Security Level Targets (SL-T) | Per-zone SL-T based on risk assessment (SL 1–4) |
| ZCR 5 | Document Requirements | Formal ZCR document for asset owner approval |

### Security Level Definitions (IEC 62443-3-2, Clause 5)

| SL | Threat Profile | Datacenter Context |
|:---|:---|:---|
| **SL 1** | Protection against casual/unintentional violation | Low-criticality monitoring (weather stations, non-critical sensors) |
| **SL 2** | Protection against intentional violation using simple means | BMS field devices, HVAC controllers, lighting |
| **SL 3** | Protection against intentional violation using sophisticated means with moderate resources | EPMS, UPS controls, CDU PLCs, fire alarm panels |
| **SL 4** | Protection against intentional violation using sophisticated means with extended resources (state-level) | Grid interconnect protection relays, SCADA/EMS, safety systems |

### Recommended Datacenter OT Zone Model

```
┌─────────────────────────────────────────────────────────┐
│                   ZONE 0: Enterprise IT                  │
│   (DCIM dashboards, IT management, corporate network)    │
│                        SL-T: 2                           │
└──────────────┬──────────────────────────┬────────────────┘
               │ Conduit C0-1             │ Conduit C0-2
               │ (Data Diode / DMZ)       │ (Firewall)
┌──────────────▼──────────────┐ ┌─────────▼────────────────┐
│   ZONE 1: BMS / HVAC        │ │  ZONE 2: Electrical       │
│   Chillers, AHUs, CRAHs,    │ │  EPMS, UPS, STS, PDUs,    │
│   CDUs, pumps, VFDs          │ │  Generators, ATS           │
│   SL-T: 2–3                 │ │  SL-T: 3                   │
└──────────────┬──────────────┘ └─────────┬────────────────┘
               │ Conduit C1-3             │ Conduit C2-4
               │                          │
┌──────────────▼──────────────┐ ┌─────────▼────────────────┐
│   ZONE 3: Fire & Life Safety│ │  ZONE 4: Substation /     │
│   FACP, suppression, VESDA, │ │  Grid Interconnect        │
│   gas detection              │ │  Protection relays, IEDs, │
│   SL-T: 3                   │ │  SCADA gateway             │
│                              │ │  SL-T: 3–4                │
└──────────────────────────────┘ └──────────────────────────┘

┌──────────────────────────────┐ ┌──────────────────────────┐
│   ZONE 5: Physical Security  │ │  ZONE 6: BESS / Battery   │
│   Access control, CCTV,      │ │  BMS (battery), inverters, │
│   intrusion detection        │ │  thermal management        │
│   SL-T: 2–3                 │ │  SL-T: 3                   │
└──────────────────────────────┘ └──────────────────────────┘
```

### Conduit Requirements (IEC 62443-3-2, Clause 5.4)

| Conduit | From → To | Protocol | Security Control |
|:---|:---|:---|:---|
| C0-1 | Enterprise IT → BMS | BACnet/IP, Modbus TCP | Industrial firewall + DPI; unidirectional gateway preferred |
| C0-2 | Enterprise IT → Electrical | DNP3, IEC 61850 MMS | Data diode for telemetry; separate command path with MFA |
| C1-3 | BMS → Fire/Life Safety | Proprietary, BACnet | Hardwired interlocks preferred; network path via industrial FW |
| C2-4 | Electrical → Substation | IEC 61850 GOOSE/MMS | Dedicated fiber; PRP/HSR redundancy; no IP routing to Zone 0 |
| C5-0 | Physical Security → Enterprise | ONVIF, OSDP | Isolated VLAN; encrypted tunnel to SOC/GSOC |

---

## 3. IEC 62443-4-2 — Component Security Requirements (FR1–FR7)

**Standard:** ISA/IEC 62443-4-2 — *Technical Security Requirements for IACS Components*
**Source:** https://webstore.iec.ch/publication/34421

### Foundational Requirements Summary

| FR ID | Foundational Requirement | Objective |
|:---|:---|:---|
| **FR 1** | Identification & Authentication Control (IAC) | Identify and authenticate all users, processes, and devices before granting access |
| **FR 2** | Use Control (UC) | Enforce assigned privileges; monitor privilege usage |
| **FR 3** | System Integrity (SI) | Prevent unauthorized manipulation of the IACS |
| **FR 4** | Data Confidentiality (DC) | Protect confidentiality of data in transit and at rest |
| **FR 5** | Restricted Data Flow (RDF) | Segment networks; limit unnecessary data flow across zones |
| **FR 6** | Timely Response to Events (TRE) | Detect, report, and respond to security violations |
| **FR 7** | Resource Availability (RA) | Ensure availability against DoS and resource exhaustion |

### FR/SR to Datacenter Asset Type Mapping

#### FR 1 — Identification & Authentication Control

| Component Requirement | SL 1 | SL 2 | SL 3 | SL 4 | DC Asset Types |
|:---|:---|:---|:---|:---|:---|
| CR 1.1 — Human user identification & authentication | ✓ | ✓ | ✓ | ✓ | All: BMS HMIs, EPMS workstations, UPS NMCs |
| CR 1.2 — Software process & device identification | — | ✓ | ✓ | ✓ | CDU PLCs, protection relays, BMS controllers |
| CR 1.5 — Authenticator management | — | ✓ | ✓ | ✓ | UPS NMCs (default password elimination) |
| CR 1.7 — Strength of password-based authentication | ✓ | ✓ | ✓ | ✓ | All web-accessible devices (NMCs, EPMS) |
| CR 1.9 — Strength of public key authentication | — | — | ✓ | ✓ | Protection relays (IEC 61850), SCADA gateways |
| CR 1.11 — Unsuccessful login attempts | — | ✓ | ✓ | ✓ | UPS NMCs, BMS controllers, FACP interfaces |

#### FR 2 — Use Control

| Component Requirement | SL 1 | SL 2 | SL 3 | SL 4 | DC Asset Types |
|:---|:---|:---|:---|:---|:---|
| CR 2.1 — Authorization enforcement | ✓ | ✓ | ✓ | ✓ | BMS controllers, EPMS, UPS |
| CR 2.5 — Session lock | — | ✓ | ✓ | ✓ | HMI workstations, SCADA clients |
| CR 2.8 — Auditable events | — | ✓ | ✓ | ✓ | All: configuration changes on any OT device |
| CR 2.12 — Non-repudiation | — | — | ✓ | ✓ | EPMS command actions, protection relay settings |

#### FR 3 — System Integrity

| Component Requirement | SL 1 | SL 2 | SL 3 | SL 4 | DC Asset Types |
|:---|:---|:---|:---|:---|:---|
| CR 3.1 — Communication integrity | ✓ | ✓ | ✓ | ✓ | All OT protocols (BACnet, Modbus, IEC 61850) |
| CR 3.4 — Software & information integrity | — | ✓ | ✓ | ✓ | Firmware on UPS NMCs, CDU PLCs, BMS controllers |
| CR 3.7 — Input validation | ✓ | ✓ | ✓ | ✓ | All devices accepting network commands |
| CR 3.11 — Physical tamper resistance | — | — | ✓ | ✓ | Protection relays, safety controllers |
| CR 3.14 — Integrity of boot process | — | — | ✓ | ✓ | BMC firmware, NIC firmware, protection relays |

#### FR 4 — Data Confidentiality

| Component Requirement | SL 1 | SL 2 | SL 3 | SL 4 | DC Asset Types |
|:---|:---|:---|:---|:---|:---|
| CR 4.1 — Information confidentiality | — | ✓ | ✓ | ✓ | EPMS telemetry, BMS setpoints, UPS config |
| CR 4.3 — Use of cryptography | — | — | ✓ | ✓ | IEC 61850 MMS sessions, SNMP v3 on NMCs |

#### FR 5 — Restricted Data Flow

| Component Requirement | SL 1 | SL 2 | SL 3 | SL 4 | DC Asset Types |
|:---|:---|:---|:---|:---|:---|
| CR 5.1 — Network segmentation | — | ✓ | ✓ | ✓ | Zone boundaries: industrial firewalls, VLANs |
| CR 5.2 — Zone boundary protection | — | ✓ | ✓ | ✓ | Conduit enforcement between BMS/EPMS/IT |
| CR 5.4 — Application partitioning | — | — | ✓ | ✓ | SCADA server isolation from HMI |

#### FR 6 — Timely Response to Events

| Component Requirement | SL 1 | SL 2 | SL 3 | SL 4 | DC Asset Types |
|:---|:---|:---|:---|:---|:---|
| CR 6.1 — Audit log accessibility | ✓ | ✓ | ✓ | ✓ | All OT devices must provide audit trail |
| CR 6.2 — Continuous monitoring | — | — | ✓ | ✓ | OT SIEM integration for EPMS, BMS, FLS |

#### FR 7 — Resource Availability

| Component Requirement | SL 1 | SL 2 | SL 3 | SL 4 | DC Asset Types |
|:---|:---|:---|:---|:---|:---|
| CR 7.1 — DoS protection | ✓ | ✓ | ✓ | ✓ | UPS NMCs, BMS controllers (malformed packet handling) |
| CR 7.2 — Resource management | — | ✓ | ✓ | ✓ | CDU PLCs, VFD controllers (CPU/memory protection) |
| CR 7.3 — Control system backup | — | ✓ | ✓ | ✓ | BMS controller configs, protection relay settings |
| CR 7.6 — Network and security config settings | — | ✓ | ✓ | ✓ | Firewall rules, switch ACLs, VLAN configs |
| CR 7.7 — Least functionality | — | ✓ | ✓ | ✓ | Disable unused ports/services on all OT devices |

### Component Type Classification (IEC 62443-4-2, Clause 6)

| IEC 62443 Type | Datacenter OT Examples |
|:---|:---|
| **Embedded Device** | BMS controllers, CDU PLCs, UPS NMCs, protection relays, VFDs, FACP |
| **Network Component** | Industrial switches, industrial firewalls, OT routers, data diodes |
| **Host Device** | SCADA servers, BMS head-end servers, EPMS servers, historian |
| **Software Application** | DCIM, BMS software (Desigo CC, EBO, Metasys), EPMS (PowerLogic, ION) |

---

## 4. ASHRAE TC 9.9 — Thermal Guidelines

**Standard:** ASHRAE TC 9.9 — *Thermal Guidelines for Data Processing Environments*, 5th Edition (2021, current through 2026)
**Source:** https://www.ashrae.org/technical-resources/bookstore/datacom-series

### Air Cooling Classes — Recommended & Allowable Envelopes

#### Recommended Envelope (All Classes)

| Parameter | Value |
|:---|:---|
| Temperature (dry-bulb) | 18°C – 27°C (64.4°F – 80.6°F) |
| Humidity (dew point) | -9°C DP to 15°C DP |
| Relative Humidity | ≤ 60% RH |
| Rate of Change | ≤ 20°C/hr; ≤ 5°C per 15-min period |

#### Allowable Envelopes by Class

| Class | Temp Range (°C) | Max DP (°C) | Max RH | Typical Application |
|:---|:---|:---|:---|:---|
| **A1** | 15 – 32 | 17 | 80% | Traditional enterprise servers |
| **A2** | 10 – 35 | 21 | 80% | General IT / data storage |
| **A3** | 5 – 40 | 24 | 85% | Edge computing, wider tolerances |
| **A4** | 5 – 45 | 24 | 90% | Harsh/outdoor-adjacent environments |

> **Altitude De-rating:** Above 900m, max allowable dry-bulb must be reduced: 1°C/300m for A1/A2; 1°C/175m for A3; 1°C/125m for A4.

### Liquid Cooling Water Temperature Classes (Updated Naming)

| Class | Upper Supply Temp (°C) | Legacy Name | Chiller Requirement | Infrastructure Implications |
|:---|:---|:---|:---|:---|
| **W17** | 17°C | W1 | Chiller + cooling tower required | Traditional chilled water; highest energy cost |
| **W27** | 27°C | W2 | Chiller + economizer | Partial free cooling possible |
| **W32** | 32°C | W3 | Often chiller-free | Significant free cooling; most hyperscale designs target this |
| **W40** | 40°C | (new) | Chiller-free in most climates | Emerging class for heat recovery applications |
| **W45** | 45°C | W4 | Chiller-free | Maximum energy efficiency; direct heat reuse potential |
| **W+** | >45°C | W5 | Chiller-free | Specialized high-temp applications |

> **Minimum supply water temperature:** 2°C (35.6°F) for all classes.

### Mapping to Datacenter Infrastructure

| Standard | Clause | Requirement | Applicable Infrastructure | Implementation Notes |
|:---|:---|:---|:---|:---|
| ASHRAE TC 9.9 | Air Classes A1–A4 | Maintain server inlet temps within allowable envelope | IT white space, hot/cold aisle containment | CDU PLCs and BMS must regulate to these setpoints |
| ASHRAE TC 9.9 | Water Classes W17–W+ | Facility water supply temperature limits | CDU loops, rear-door heat exchangers, direct-to-chip cooling | CDU PLC controls coolant supply temp; sensor accuracy ±0.5°C |
| ASHRAE TC 9.9 | Recommended Envelope | 18–27°C dry-bulb, ≤60% RH | BMS setpoint programming | BMS alarm thresholds should trigger at recommended boundary |
| ASHRAE TC 9.9 | Rate of Change | ≤20°C/hr, ≤5°C/15-min | BMS thermal ramp control | Critical during cooling system failover (redundancy switchover) |

---

## 5. EN 50600 — Datacenter Classification

**Standard:** EN 50600 Series — *Information Technology — Data Centre Facilities and Infrastructures*
**Source:** https://www.cenelec.eu | https://www.cis-cert.com

### Standard Structure

| Part | Title | Scope |
|:---|:---|:---|
| EN 50600-1 | General Concepts | Principles, classifications, terminology |
| EN 50600-2-1 | Building Construction | Site selection, structural requirements |
| EN 50600-2-2 | Power Distribution | Electrical infrastructure classification |
| EN 50600-2-3 | Environmental Control | Cooling/HVAC infrastructure classification |
| EN 50600-2-4 | Telecommunications Cabling | Network infrastructure |
| EN 50600-2-5 | Security Systems | Physical security classification |
| EN 50600-3-1 | Management & Operations | Operational processes |
| EN 50600-4-x | Efficiency (KPIs) | PUE, WUE, REF, CUE, ERE metrics |
| CLC/TS 50600-5-1 | Maturity Model | Energy management & sustainability |

### Availability Classes (EN 50600-2-2, -2-3)

| Availability Class | Redundancy | Concurrent Maintenance | Fault Tolerance | DC Equivalent |
|:---|:---|:---|:---|:---|
| **Class 1** | N (no redundancy) | No | No | ~Tier I |
| **Class 2** | N+1 | Partial | No | ~Tier II |
| **Class 3** | N+1 or 2N | Yes | No | ~Tier III |
| **Class 4** | 2N or 2(N+1) | Yes | Yes | ~Tier IV |

### Protection Classes (EN 50600-2-5)

| Protection Class | Threat Profile | Physical Security Measures |
|:---|:---|:---|
| **PC 1** | Low risk | Basic perimeter, standard locks |
| **PC 2** | Moderate risk | Electronic access control, CCTV, visitor management |
| **PC 3** | High risk | Multi-factor auth, anti-tailgating, tamper detection, alarmed cabinets |
| **PC 4** | Very high risk | Biometric + token, mantrap, 24/7 SOC, cabinet-level locks |

### Mapping EN 50600 Parts to Datacenter Infrastructure

| Standard | Clause Area | Requirement Summary | Applicable Infrastructure | Implementation Notes |
|:---|:---|:---|:---|:---|
| EN 50600-2-2 | Power Distribution | Availability Class 1–4 for electrical topology | UPS, generators, STS, ATS, PDUs, switchgear | Class 4 = 2N UPS + 2N generator + 2N STS path |
| EN 50600-2-2 | Power Monitoring | EPMS required for Class 3–4 | Power meters, EPMS servers, CTs, PTs | Continuous monitoring of all distribution paths |
| EN 50600-2-3 | Environmental Control | Availability Class 1–4 for cooling topology | Chillers, CRAHs, CDUs, cooling towers, pumps | Class 4 = 2N cooling paths, automatic failover |
| EN 50600-2-3 | Temperature Monitoring | Environmental sensor requirements | Temperature/humidity sensors, BMS | Sensor placement per ASHRAE TC 9.9 guidance |
| EN 50600-2-4 | Telecoms Cabling | Redundant cabling paths for Class 3–4 | Fiber backbone, structured cabling | Diverse path routing, separate risers |
| EN 50600-2-5 | Physical Security | Protection Class 1–4 per zone | Access control, CCTV, intrusion detection | Integration with IEC 62443 zone model |
| EN 50600-4-2 | PUE | Power Usage Effectiveness reporting | EPMS metering points | PUE = Total Facility Power / IT Equipment Power |
| EN 50600-4-5 | WUE | Water Usage Effectiveness | Water flow meters, BMS | WUE = Site Water Usage / IT Equipment Power |

### EN 50600 × IEC 62443 Integration

| EN 50600 Protection Class | Recommended IEC 62443 SL-T | Rationale |
|:---|:---|:---|
| PC 1 | SL 1 | Basic protection; physical and cyber threats both low |
| PC 2 | SL 2 | Moderate protection; access control requires digital hardening |
| PC 3 | SL 3 | High protection; physical security systems (IP cameras, badge readers) become OT attack surface |
| PC 4 | SL 3–4 | Maximum protection; physical security devices must meet IEC 62443-4-2 CR requirements |

> **Key Integration Point:** EN 50600-2-5 governs the *physical* security plane. IEC 62443 governs the *cyber* security of the control systems that *implement* that physical security. A compromised access control system (cyber) defeats physical security regardless of Protection Class. Therefore, IP cameras, electronic locks, and badge readers in PC 3/4 facilities should be procured as IEC 62443-4-2 compliant components.

---

## 6. NFPA 75 / NFPA 76 — Datacenter Fire Protection

### NFPA 75 — Standard for the Fire Protection of Information Technology Equipment

**Standard:** NFPA 75 — *Standard for the Fire Protection of Information Technology Equipment*
**Source:** https://www.nfpa.org/codes-and-standards/nfpa-75-standard-development/75

| Standard | Clause/Section | Requirement | Applicable Infrastructure | Implementation Notes |
|:---|:---|:---|:---|:---|
| NFPA 75 | Ch. 5 — IT Equipment Room Construction | Fire-rated enclosures for IT spaces | IT white space walls, ceilings, penetrations | 1-hour fire-rated construction minimum |
| NFPA 75 | Ch. 7 — Fire Detection | Early warning detection in IT rooms | VESDA (aspirating smoke detection), spot detectors | Very Early Smoke Detection Apparatus (VESDA) preferred for high-value spaces |
| NFPA 75 | Ch. 7 — Fire Suppression | Clean agent or pre-action sprinkler | FM-200, Novec 1230, pre-action sprinkler | Clean agent preferred for IT spaces; sprinkler may be AHJ-required |
| NFPA 75 | Ch. 8 — Emergency Power-Off (EPO) | Ability to disconnect power to IT equipment & dedicated HVAC | EPO buttons/switches, EPSMS | **Not universally mandatory** — depends on AHJ. Many operators use Emergency Power Shutdown Management System (EPSMS) instead of simple EPO button to avoid nuisance trips |
| NFPA 75 | Ch. 8 — EPO Location | EPO must be accessible and clearly identified if installed | EPO stations at exits | EPO vs. EPSMS decision is critical design choice — accidental EPO can cause more damage than fire |
| NFPA 75 | Ch. 9 — HVAC Shutdown | Ability to shut down dedicated HVAC on fire detection | BMS → HVAC interlock | Fire alarm system must interface with BMS to shut down air handling |
| NFPA 75 | Ch. 10 — UPS & Battery | UPS and battery areas within IT room | UPS systems, battery cabinets | Battery rooms increasingly deferred to NFPA 855 for Li-ion |

### NFPA 76 — Standard for the Fire Protection of Telecommunications Facilities (2024 Edition)

| Standard | Clause/Section | Requirement | Applicable Infrastructure | Implementation Notes |
|:---|:---|:---|:---|:---|
| NFPA 76 | Scope | Applies to facilities providing public telecommunications | Colocation, carrier-neutral facilities, internet exchanges | If facility serves public network, NFPA 76 applies alongside NFPA 75 |
| NFPA 76 | Fire Detection | High-sensitivity smoke detection | VESDA, beam detectors | Performance-based approach allows risk-based detector selection |
| NFPA 76 | Cable & Raceway | Fire spread prevention for cable infrastructure | Cable trays, conduits, fiber raceways | 2024 edition includes revised cable routing fire protection |
| NFPA 76 | Off-Gas Detection | Gas detection in battery areas | Gas sensors (H₂, CO, HF for Li-ion) | **New in 2024** — required for early thermal runaway warning |
| NFPA 76 | Li-ion Batteries | Deferred to NFPA 855 | BESS, UPS batteries | 2024 edition removed standalone Li-ion requirements; NFPA 855 governs |
| NFPA 76 | Service Continuity | Performance-based fire protection | All infrastructure | Three objectives: life safety, equipment protection, service continuity |

### Fire Protection System Integration with OT

| Fire System Component | OT Protocol/Interface | IEC 62443 Zone | Security Consideration |
|:---|:---|:---|:---|
| Fire Alarm Control Panel (FACP) | BACnet, proprietary | Zone 3 (Fire/Life Safety) | FACP firmware must be hardened; no internet connectivity |
| VESDA Aspirating Detector | Modbus, proprietary serial | Zone 3 | Network-connected VESDA units are OT attack surface |
| Clean Agent Release Panel | Hardwired + BACnet | Zone 3 | False release = catastrophic; requires physical interlock |
| EPO / EPSMS | Hardwired to switchgear | Zone 2 (Electrical) | EPO circuit must be tamper-proof; classified as safety function |
| BMS ↔ HVAC Shutdown | BACnet/IP | Conduit C1-3 | Fire detection → BMS → HVAC shutdown: latency < 5 seconds |

---

## 7. NFPA 855 / UL 9540A — Battery Energy Storage Systems

### NFPA 855 — Standard for the Installation of Stationary Energy Storage Systems (2026 Edition)

**Standard:** NFPA 855, 2026 Edition (published late 2025)
**Source:** https://www.nfpa.org/codes-and-standards/nfpa-855-standard-development/855

| Standard | Clause/Section | Requirement | Applicable Infrastructure | Implementation Notes |
|:---|:---|:---|:---|:---|
| NFPA 855 | Ch. 1 — Scope | Covers all stationary ESS including Li-ion, lead-acid, flow batteries | Datacenter BESS, UPS battery systems | Applies to any installation > 20 kWh aggregate |
| NFPA 855 | Ch. 4 — Hazard Mitigation Analysis (HMA) | HMA required for all installations | BESS design documentation | Must use UL 9540A test data to inform HMA decisions |
| NFPA 855 | Ch. 5 — Technology-Specific Requirements | Per-chemistry requirements | Li-ion: NMC, LFP; Lead-acid: VRLA | LFP (lithium iron phosphate) has lower thermal runaway risk |
| NFPA 855 | Ch. 9 — Fire Detection & Suppression | Detection and suppression tailored to battery chemistry | Sprinkler (per NFPA 13), gas detection, thermal sensors | Higher sprinkler densities for Li-ion; gas detection mandatory |
| NFPA 855 | Ch. 10 — Ventilation | Enhanced ventilation for gas management | HVAC, exhaust fans, gas sensors | Must handle HF, CO, CO₂, H₂ release from thermal runaway |
| NFPA 855 | Ch. 11 — Explosion Control | Explosion mitigation for enclosed spaces | Blast walls, pressure relief, deflagration venting | Required when UL 9540A data shows gas accumulation risk |
| NFPA 855 | Ch. 13 — Emergency Operations | Emergency Operations Plan (EOP) + Emergency Response Plan (ERP) | Facility operations, fire department coordination | UL 9540A test results must be shared with first responders |
| NFPA 855 | 2026 — Large-Scale Fire Testing (LSFT) | **New:** Explicit LSFT mandates | Manufacturer testing obligations | Full-scale worst-case testing now required for manufacturer claims |

### UL 9540A — Test Method for Evaluating Thermal Runaway Fire Propagation

| Standard | Test Level | Requirement | Applicable Infrastructure | Implementation Notes |
|:---|:---|:---|:---|:---|
| UL 9540A | Cell Level | Single cell thermal runaway characterization | Battery cells in datacenter BESS | Documents gas composition, heat release rate |
| UL 9540A | Module Level | Propagation testing within a module | Battery modules | Determines if runaway propagates cell-to-cell |
| UL 9540A | Unit Level | Propagation testing unit-to-unit | BESS cabinets/racks | Determines separation distances |
| UL 9540A | Installation Level | Full-scale installation fire test | Complete BESS room/enclosure | Validates suppression system effectiveness |

### BESS Integration with Datacenter OT

| BESS Component | OT Protocol | IEC 62443 Zone | Security Requirement |
|:---|:---|:---|:---|
| Battery Management System (BMS) | Modbus TCP, CAN bus | Zone 6 (BESS) | CR 7.1 DoS protection; CR 3.4 firmware integrity |
| Inverter/PCS | Modbus TCP, IEC 61850 | Zone 6 → Zone 2 | CR 1.1 authentication; CR 5.1 network segmentation |
| Thermal Management | BACnet, Modbus | Zone 6 | CR 7.2 resource management (cooling control loop) |
| Gas Detection System | Hardwired + Modbus | Zone 6 → Zone 3 | Safety-critical: hardwired interlock to ventilation |
| Fire Suppression | Hardwired | Zone 3 | Physical interlock; no network-only trigger allowed |

---

## 8. IEC 61850 — Datacenter Substation Automation

**Standard:** IEC 61850 — *Communication Networks and Systems for Power Utility Automation*
**Source:** https://webstore.iec.ch/publication/6028

### Why IEC 61850 in Datacenters

Traditional datacenter electrical infrastructure uses Modbus TCP/RTU for power monitoring. IEC 61850 is increasingly adopted for medium-voltage (MV) datacenter substations due to:
- **Speed:** GOOSE messaging provides <4ms fault reaction (vs. hundreds of ms for Modbus polling)
- **Interoperability:** Standardized object model eliminates vendor lock-in
- **Simplified wiring:** Ethernet/fiber replaces hardwired copper for protection signals
- **Advanced diagnostics:** Real-time health monitoring of entire power chain

### IEC 61850 Communication Services in Datacenter Context

| Service | Layer | Latency | DC Application | Infrastructure |
|:---|:---|:---|:---|:---|
| **GOOSE** | Layer 2 (Ethernet multicast) | <4 ms | Protection trip signals, breaker interlock, bus transfer | Protection relays (SEL, ABB, Siemens, GE) |
| **MMS** | TCP/IP (Layer 7) | 100s of ms | SCADA data access, setpoint changes, reporting | SCADA servers, EPMS head-end |
| **Sampled Values (SV)** | Layer 2 | <3 ms | Digital current/voltage measurement transmission | Merging units, digital CTs/PTs |
| **SCL** (configuration) | XML file | N/A | System engineering and device configuration | Engineering workstations |

### IEC 61850 Mapping to Datacenter Electrical

| Standard | Part/Clause | Requirement | Applicable Infrastructure | Implementation Notes |
|:---|:---|:---|:---|:---|
| IEC 61850-7-4 | Logical Nodes | Standardized data modeling for protection functions | Protection relays: PTOC, PDIF, PTOV, CSWI | Each relay function modeled as a Logical Node |
| IEC 61850-8-1 | GOOSE/MMS mapping | Communication service mapping to Ethernet | Substation Ethernet switches (PRP/HSR) | Must use managed switches with multicast filtering |
| IEC 61850-9-2 | Sampled Values | Digital measurement streams | Merging units on MV switchgear | Replaces analog CT/PT wiring with fiber |
| IEC 61850-6 | SCL Configuration | XML-based system configuration | All IEDs in substation | Interoperability testing critical (vendor differences persist) |
| IEC 61850-90-4 | Network Engineering | Network design guidelines for substations | Redundant Ethernet (PRP/HSR) | Dedicated fiber network; no shared infrastructure with IT |

### IEC 61850 × IEC 62443 Security Considerations

| Concern | IEC 61850 Gap | IEC 62443 Mitigation |
|:---|:---|:---|
| GOOSE messages are not authenticated (by default) | Layer 2 multicast can be spoofed | IEC 62351-6 adds GOOSE authentication (HMAC); implement on SL 3–4 systems |
| MMS uses TCP without encryption (native) | Data in transit is cleartext | IEC 62351-3 adds TLS to MMS; required for SL 3+ |
| No built-in role-based access control | Any MMS client can read/write | IEC 62443-4-2 CR 2.1 authorization enforcement on SCADA gateway |
| Physical network access = full system access | Flat Layer 2 network | IEC 62443-3-2 zone segmentation; VLAN separation of GOOSE and MMS traffic |

> **Reference:** IEC 62351 is the companion standard to IEC 61850 for power system cybersecurity. Parts 3 (TLS), 4 (MMS profiles), 5 (IEC 60870-5), and 6 (GOOSE/SV) address authentication and encryption.

---

## 9. OCP S.A.F.E. — Firmware Security Framework

**Standard:** OCP S.A.F.E. (Security Appraisal Framework and Enablement)
**Source:** https://www.opencompute.org/projects/security | https://github.com/opencomputeproject/Security

### Overview

OCP S.A.F.E. is **not a pass/fail certification** but a standardized framework for third-party firmware security reviews. It provides transparency into the security posture of datacenter hardware components through published Short Form Reports (SFRs).

### Assessment Scope Hierarchy

| Scope | Name | Focus | Components Covered |
|:---|:---|:---|:---|
| **Scope 1** | External Attack Surface | All interfaces reachable from outside the SoC | External flash, serial/debug ports, PCIe, BMC network interface, NIC management |
| **Scope 2** | Internal Attack Surface | Scope 1 + internal component interactions | TEE boundaries, security processor interfaces, inter-subsystem communication |
| **Scope 3** | Physical Attack Resilience | Scope 2 + physical attack resistance | RoT integrity, crypto accelerator side-channels, long-term secret storage, glitch protection |

### Firmware Components Under Review

| Component | Review Focus | DC Relevance |
|:---|:---|:---|
| **BMC (Baseboard Management Controller)** | Network-exposed management interface; highest attack surface | Server out-of-band management; IPMI/Redfish interface |
| **BIOS/UEFI** | Boot chain integrity, SecureBoot, setup interface | Server boot process; firmware supply chain |
| **NIC Firmware** | Network-facing firmware; DMA capabilities | Server network interface; potential for lateral movement |
| **GPU Firmware** | Specialized compute firmware | AI/ML training infrastructure |
| **Storage Controller Firmware** | Drive encryption, data path | Storage arrays, NVMe controllers |
| **RoT (Root of Trust)** | Hardware anchor for secure boot chain | Platform integrity verification |

### Relationship to Other Standards

| Standard | Relationship to OCP S.A.F.E. |
|:---|:---|
| **NIST SP 800-193** | Platform Firmware Resiliency — S.A.F.E. reviews verify compliance with 800-193 principles (Protection, Detection, Recovery) |
| **IEC 62443** | Complementary but distinct: S.A.F.E. covers IT infrastructure firmware; IEC 62443 covers OT/IACS. Organizations should pursue both |
| **OCP S.O.L.I.D.** | Minimum security requirements spec that S.A.F.E. reviews verify against |
| **TCG** | Trusted Computing Group guidance for TPM, measured boot |

### S.A.F.E. Process

| Step | Activity | Output |
|:---|:---|:---|
| 1 | Vendor engages approved Security Review Provider (SRP) | Engagement letter, scope definition |
| 2 | Threat modeling (SRP creates if vendor lacks one) | Threat model document |
| 3 | Whitebox source code review (ROM + mutable firmware) | Detailed findings report (NDA-protected) |
| 4 | Short Form Report (SFR) published on OCP Marketplace | Public transparency artifact |

**Approved SRPs:** IOActive, NCC Group, Tetrel Security, and others listed on OCP Security project page.

---

## 10. ISO 22237 — International Datacenter Standard

**Standard:** ISO/IEC 22237 Series — *Information Technology — Data Centre Facilities and Infrastructures*
**Source:** https://www.iso.org/standard/78646.html

### Relationship to EN 50600

ISO/IEC 22237 is the **internationalized version of EN 50600**. They are functionally equivalent and share the same core principles.

| Aspect | EN 50600 | ISO/IEC 22237 |
|:---|:---|:---|
| **Jurisdiction** | European (CENELEC) | International (ISO/IEC JTC 1) |
| **Development** | Original standard | Adopted from EN 50600 |
| **Content** | Functionally identical core requirements | Same classification system |
| **Adoption** | EU member states, UK | Global recognition |
| **Regulatory Alignment** | EU EED, CSRD, EU Taxonomy | Global procurement/compliance |

### ISO 22237 Part Structure

| Part | Title | EN 50600 Equivalent |
|:---|:---|:---|
| ISO/IEC 22237-1 | General Concepts | EN 50600-1 |
| ISO/IEC 22237-2 | Building Construction | EN 50600-2-1 |
| ISO/IEC 22237-3 | Power Distribution | EN 50600-2-2 |
| ISO/IEC 22237-4 | Environmental Control | EN 50600-2-3 |
| ISO/IEC 22237-5 | Telecommunications Cabling | EN 50600-2-4 |
| ISO/IEC 22237-6 | Security Systems | EN 50600-2-5 |
| ISO/IEC 22237-7 | Management & Operations | EN 50600-3-1 |

### Classification System

Both standards classify datacenter infrastructure across multiple independent dimensions:

| Classification Dimension | Classes | Assessment Basis |
|:---|:---|:---|
| **Availability** | Class 1–4 | Redundancy, concurrent maintainability, fault tolerance |
| **Physical Security** | Class 1–4 | Protection zones, access control, intrusion detection |
| **Energy Efficiency** | KPI-based (PUE, WUE, etc.) | Metered performance data |

> **Key Differentiator from Uptime Institute Tiers:** EN 50600 / ISO 22237 allow *independent classification per subsystem*. A datacenter can be Class 4 for power and Class 3 for cooling, whereas Uptime Tiers apply a single tier to the entire facility.

---

## 11. IEC 62443-4-1 — Secure Development Lifecycle

**Standard:** ISA/IEC 62443-4-1 — *Secure Product Development Lifecycle Requirements*
**Source:** https://www.isa.org/standards-and-publications/isa-standards

### Lifecycle Practices

| Practice | ID | Requirement | Vendor Impact |
|:---|:---|:---|:---|
| Security Management | SM | Policies, roles, responsibilities, training | All development teams |
| Security Requirements | SR | Risk-based security requirements definition | Product requirement specs |
| Secure by Design | SD | Threat modeling, security architecture review | Architecture documents |
| Secure Implementation | SI | Secure coding guidelines, code review | Source code |
| Security Verification & Validation Testing | SVV | Penetration testing, fuzz testing, vulnerability analysis | Test reports |
| Defect Management | DM | Security vulnerability tracking and remediation | PSIRT processes |
| Patch Management | PM | Secure update delivery and lifecycle support | Update mechanisms |
| Security Guidelines Documentation | SG | Hardening guides, deployment guidance | Customer documentation |

### Maturity Levels

| Level | Description | Vendor Examples |
|:---|:---|:---|
| **ML 1** | Initial — Ad hoc security practices | Smaller vendors |
| **ML 2** | Managed — Documented processes in place | Mid-size OT vendors |
| **ML 3** | Defined — Organization-wide standardized processes | ABB, Schneider Electric, Honeywell, JCI |
| **ML 4** | Improving — Continuous measurement and improvement | Select product lines at major vendors |

### Relevance to Datacenter OT Procurement

When procuring datacenter OT components, require evidence of:

| Procurement Requirement | IEC 62443-4-1 Evidence | Why It Matters |
|:---|:---|:---|
| Vendor has secure development process | SDLA certificate or IEC 62443-4-1 audit report | Reduces likelihood of vulnerabilities in firmware |
| Product has been threat-modeled | Threat model document (Practice SD-1) | Shows vendor understands attack surface |
| Vulnerability disclosure process exists | PSIRT contact and policy (Practice DM-1) | Ensures patches will be available when CVEs emerge |
| Hardening guide provided | Security guidelines document (Practice SG-1) | Enables secure deployment configuration |
| Secure update mechanism | Signed firmware updates (Practice PM-1) | Prevents supply chain attacks via firmware |

---

## 12. Cross-Standard Integration Matrix

### Master Mapping: Standards × Datacenter Infrastructure Subsystems

| Infrastructure Subsystem | IEC 62443 | EN 50600 / ISO 22237 | ASHRAE TC 9.9 | NFPA 75/76 | NFPA 855 | IEC 61850 | OCP S.A.F.E. |
|:---|:---|:---|:---|:---|:---|:---|:---|
| **UPS Systems** | FR1,2,3,7 (SL 3) | 2-2 Availability | — | Ch. 10 Battery | Ch. 5 (if Li-ion) | — | — |
| **PDUs / RPPs** | FR1,2,7 (SL 2–3) | 2-2 Availability | — | — | — | — | — |
| **Generators** | FR1,2,7 (SL 2) | 2-2 Availability | — | NFPA 110 ref | — | — | — |
| **MV Switchgear** | FR1,2,3,5 (SL 3) | 2-2 Availability | — | — | — | 61850 GOOSE/MMS | — |
| **Protection Relays** | FR1,2,3,4,6 (SL 3–4) | 2-2 Availability | — | — | — | 61850 GOOSE/SV | — |
| **EPMS / Power Meters** | FR1,2,6,7 (SL 3) | 2-2 / 4-2 PUE | — | — | — | MMS (optional) | — |
| **BMS Head-End** | FR1-7 (SL 2–3) | 2-3 / 2-5 | — | Ch. 9 HVAC | — | — | — |
| **BMS Controllers** | FR1,2,3,7 (SL 2) | 2-3 Availability | A1–A4 setpoints | Ch. 9 HVAC | — | — | — |
| **Chillers / CRAHs** | FR1,7 (SL 2) | 2-3 Availability | A1–A4, W classes | — | — | — | — |
| **CDU PLCs** | FR1,2,3,7 (SL 2–3) | 2-3 Availability | W17–W+ classes | — | — | — | — |
| **VFDs (Pumps/Fans)** | FR1,7 (SL 2) | 2-3 Availability | — | — | — | — | — |
| **Fire Alarm (FACP)** | FR1,2,3,6,7 (SL 3) | 2-5 Protection | — | Ch. 7 Detection | — | — | — |
| **Clean Agent Suppression** | FR3,7 (SL 3) | 2-5 Protection | — | Ch. 7 Suppression | — | — | — |
| **VESDA** | FR1,3,7 (SL 3) | 2-5 Protection | — | Ch. 7 Detection | — | — | — |
| **Access Control** | FR1,2,6 (SL 2–3) | 2-5 PC 1–4 | — | — | — | — | — |
| **CCTV / VMS** | FR1,2,4,6 (SL 2) | 2-5 PC 1–4 | — | — | — | — | — |
| **BESS / Battery BMS** | FR1,2,3,7 (SL 3) | 2-2 Availability | — | — | Ch. 4–13 all | — | — |
| **BESS Gas Detection** | FR3,7 (SL 3) | — | — | NFPA 76 off-gas | Ch. 10 Ventilation | — | — |
| **Servers (BMC/BIOS)** | — (IT asset) | — | A1–A4 | — | — | — | Scope 1–3 |
| **Server NICs** | — (IT asset) | — | — | — | — | — | Scope 1–2 |
| **Industrial Switches** | FR1,2,3,5,7 (SL 2–3) | 2-4 Cabling | — | — | — | 61850 network | — |
| **Industrial Firewalls** | FR1,2,3,4,5,7 (SL 3) | — | — | — | — | — | — |
| **SCADA / Historian** | FR1-7 (SL 3) | — | — | — | — | MMS client | — |
| **EPO / EPSMS** | FR3,7 (SL 3) | 2-5 Protection | — | Ch. 8 EPO | — | — | — |

### Compliance Decision Tree

```
For each OT asset in the datacenter:
│
├── Is it an IT asset (server, storage, network switch)?
│   ├── YES → OCP S.A.F.E. for firmware security
│   │         ASHRAE TC 9.9 for thermal envelope
│   │         NFPA 75 for fire protection
│   └── NO → Continue below
│
├── Is it an OT/IACS component?
│   ├── YES → IEC 62443-4-2 for component security (FR1–FR7)
│   │         IEC 62443-3-2 for zone/conduit placement
│   │         EN 50600 for availability/protection class
│   │
│   ├── Is it part of the electrical distribution?
│   │   ├── YES → EN 50600-2-2 for availability class
│   │   │         IEC 61850 if MV substation
│   │   │         IEC 62351 for power protocol security
│   │   └── NO → Continue
│   │
│   ├── Is it part of cooling/environmental?
│   │   ├── YES → EN 50600-2-3 for availability class
│   │   │         ASHRAE TC 9.9 for setpoints
│   │   └── NO → Continue
│   │
│   ├── Is it a fire/life safety system?
│   │   ├── YES → NFPA 75/76 for fire detection/suppression
│   │   │         EN 50600-2-5 for protection class
│   │   └── NO → Continue
│   │
│   ├── Is it a battery energy storage system?
│   │   ├── YES → NFPA 855 for installation
│   │   │         UL 9540A for thermal runaway data
│   │   │         UL 9540 for system certification
│   │   └── NO → Continue
│   │
│   └── Is it a physical security system?
│       └── YES → EN 50600-2-5 for protection class
│                 IEC 62443-4-2 for device hardening
```

---

## Source URLs and References

| Standard | Source URL |
|:---|:---|
| ISASecure Registry | https://isasecure.org/certification/certified-products |
| ISASecure SDLA List | https://isasecure.org/en/Certification/ISASecure-SDLA-Certified-Development-Organizations.aspx |
| ISASecure SSA List | https://isasecure.org/en/Certification/ISASecure-SSA-Certified-Systems.aspx |
| ISASecure CSA List | https://isasecure.org/en/Certification/CSA-EDSA-Certified-Components.aspx |
| IEC 62443 Series | https://webstore.iec.ch/publication/34421 |
| ASHRAE TC 9.9 | https://www.ashrae.org/technical-resources/bookstore/datacom-series |
| EN 50600 Series | https://www.cenelec.eu |
| EN 50600 / ISO 22237 Overview | https://www.cis-cert.com |
| NFPA 75 | https://www.nfpa.org/codes-and-standards/nfpa-75-standard-development/75 |
| NFPA 76 (2024) | https://www.nfpa.org/codes-and-standards/nfpa-76-standard-development/76 |
| NFPA 855 | https://www.nfpa.org/codes-and-standards/nfpa-855-standard-development/855 |
| UL 9540A | https://www.ul.com/services/ul-9540a-test-method |
| IEC 61850 | https://webstore.iec.ch/publication/6028 |
| IEC 62351 (Power Security) | https://webstore.iec.ch/publication/6909 |
| OCP S.A.F.E. | https://www.opencompute.org/projects/security |
| OCP S.A.F.E. GitHub | https://github.com/opencomputeproject/Security |
| ISO/IEC 22237 | https://www.iso.org/standard/78646.html |
| NIST SP 800-193 | https://csrc.nist.gov/publications/detail/sp/800-193/final |
| ABB IEC 61850 for DC | https://new.abb.com |
| Schneider Electric IEC 61850 | https://www.se.com |

---

> **Document Status:** Research complete. Standards mapping tables ready for integration into CyHAZOPs Reference Architecture (WP01, WP06, WP07).
>
> **Key Finding:** The most significant gap in the datacenter OT standards landscape is the **lack of ISASecure CSA (IEC 62443-4-2) certification for datacenter-specific OT devices** — UPS NMCs, BMS controllers, CDU PLCs, and EPMS meters. While vendors like ABB, Schneider, and Honeywell hold SDLA certifications for their development processes, the actual datacenter-deployed products (as opposed to traditional DCS/SIS products) have not been submitted for component-level certification. This creates a procurement gap where asset owners cannot verify component-level security compliance against IEC 62443-4-2.
