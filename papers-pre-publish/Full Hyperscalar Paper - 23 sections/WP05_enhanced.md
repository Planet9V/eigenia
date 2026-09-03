```markdown
# Design Considerations for Hyperscale Datacentre Infrastructure

## Chapter 5: Tier Classification, Redundancy Topologies, and Their Security Implications

## Abstract

Tier IV physical redundancy is defeated by Tier I logical architecture. This chapter examines Uptime Institute and TIA-942 classification systems, maps each redundancy topology to its cyber-physical failure mode, and demonstrates how IEC 62443 zone/conduit design must complement mechanical redundancy to achieve genuine fault tolerance. Pod/cell architecture — the dominant hyperscale deployment model — creates inherent zone boundaries that simplify IEC 62443 implementation when designed correctly.

---

## Practitioner's Note

Every datacentre project I have worked on begins the same way: someone asks "what Tier are we building to?" and then everyone argues about what that means. The confusion is understandable. The Uptime Institute Tier system and the TIA-942 rating system use similar language but differ in methodology — one is outcome-based, the other prescriptive. Both address availability, but neither adequately addresses the cybersecurity dimension of the redundancy they specify.

I have seen Tier IV facilities — facilities designed with fully fault-tolerant, 2N+1 power and cooling — where the "redundant" UPS systems run identical firmware with identical default credentials on the same flat management VLAN. The mechanical redundancy is impeccable. The logical redundancy is zero. A single firmware exploit compromises every UPS block simultaneously, and the $200M facility has a single point of failure that exists entirely in software.

This chapter explains the classification systems, maps redundancy topologies to their security implications, and identifies where IEC 62443 zone and conduit design must complement physical redundancy to achieve genuine fault tolerance.

---

## 1. The Two Classification Systems

### 1.1 Uptime Institute Tier Classification

The Uptime Institute created the Tier system over 30 years ago. It remains the international standard for datacentre performance, and Uptime is the sole organisation licensed to issue Tier Certification. The classification is progressive — each Tier incorporates the requirements of the lower Tiers.

**Table 5.2: Tier - Availability**

| Tier | Availability | Key Characteristic | Redundancy Model | Annual Downtime |
|:---|:---|:---|:---|:---|
| **Tier I** | 99.671% | Basic capacity | N (no redundancy) | ~28.8 hours |
| **Tier II** | 99.749% | Redundant capacity components | N+1 components | ~22 hours |
| **Tier III** | 99.982% | Concurrently maintainable | N+1 distribution paths | ~1.6 hours |
| **Tier IV** | 99.995% | Fault tolerant | 2N+1 (fully redundant, isolated paths) | ~0.4 hours |

**Critical distinction:** Tiers define *what* the facility must achieve, not *how* to achieve it. Uptime deliberately avoids prescribing specific technologies or design patterns. This flexibility allows engineering innovation but also allows insecure implementations that technically satisfy the mechanical availability requirements while remaining deeply vulnerable to cyber-physical attack.

**What Tiers do NOT address:**
- Cybersecurity of control systems
- Firmware integrity of redundant equipment
- Logical independence of redundant control planes
- OT network segmentation
- Supply chain integrity of embedded controllers

**ISASecure Certified Products Gap:** The datacenter OT products that implement Tier requirements (UPS network management cards, BMS controllers, EPMS meters) are not commonly found in the ISASecure CSA registry. Table 5.2a lists the certified devices relevant to datacenter infrastructure and the critical gap.

**Table 5.2a: ISASecure CSA Certified Devices Relevant to Datacenter OT (2025)**

| Vendor | Product | Component Type | DC Relevance | Certifying Body |
|:---|:---|:---|:---|:---|
| Moxa | EDR-G9010 Series | Industrial Router/Firewall | OT network segmentation between zones | exida / Bureau Veritas |
| Moxa | TN-4900 Series | Industrial Managed Switch | OT network backbone for BMS/EPMS | exida / Bureau Veritas |
| InHand Networks | Edge Gateways (various) | IIoT Gateway | Remote monitoring / edge compute | UL Solutions |
| Honeywell | ControlEdge PLC/RTU | Embedded Device | BMS / process control | exida |
| Honeywell | Safety Manager | Safety Controller | Safety Instrumented Systems | exida |

**Gap:** UPS NMCs (Vertiv, Schneider APC, Eaton), BMS controllers (Schneider EBO, Siemens Desigo CC, JCI Metasys), CDU PLCs (Vertiv, Motivair, CoolIT), and EPMS meters (Schneider ION series, GE/Danaher) are **not ISASecure CSA certified** as of June 2025 [ISASecure, 2025]. This means asset owners cannot verify component-level security compliance against IEC 62443-4-2 for these devices.

### 1.2 TIA-942 Standard

TIA-942-B (2017) and its successor TIA-942-C take a prescriptive approach, specifying structural, electrical, mechanical, and telecommunications infrastructure requirements. TIA-942 defines four "Rated" levels (Rated-1 through Rated-4) that roughly correspond to Uptime Tiers I–IV but with explicit technical specifications.

TIA-942 provides more detail on:
- Cabling infrastructure (backbone, horizontal, entrance)
- Fire protection (TIA-942-C Section 6 mandates VESDA and pre-action sprinklers)
- Telecommunications entrance facility design
- Architectural specifications (floor loading, ceiling height, raised floor depth)

**TIA-942 and security:** TIA-942 addresses physical security (perimeter, access control zones, CCTV) but does not address OT cybersecurity. There is no reference to IEC 62443, no requirement for network segmentation of BMS or EPMS, and no requirement for firmware integrity of control systems.

**EN 50600 / ISO 22237 Equivalence:** The European standard EN 50600 (internationalized as ISO/IEC 22237) provides a similar classification system with Availability Classes 1–4 that map to Tiers I–IV. Unlike Uptime, EN 50600 allows independent classification per subsystem (power, cooling, security). A datacenter can be Class 4 for power and Class 3 for cooling. This flexibility is more aligned with hyperscale design practices [EN 50600-2-2, 2019; ISO/IEC 22237-3, 2021].

### 1.3 ASHRAE TC 9.9

ASHRAE Technical Committee 9.9 governs the thermal envelope — the allowable environmental conditions for IT equipment. The committee defines equipment classes (A1–A4 for air cooling) and liquid cooling classes (W17–W45) that dictate supply temperatures and operating ranges.

For liquid-cooled hyperscale facilities, the ASHRAE W-class selection directly determines the downstream P&ID architecture:

**Table 5.3: ASHRAE Liquid Cooling Classes and Infrastructure Implications**

| ASHRAE Liquid Class | Supply Temperature | Architectural Implication | Chiller Requirement | Security Implication |
|:---|:---|:---|:---|:---|
| **W17** | 17°C | Traditional chilled water; highest energy cost | Chiller + cooling tower required | Most complex control system; largest OT attack surface |
| **W27** | 27°C | Partial free cooling possible | Chiller + economizer | Moderate complexity; economizer adds additional controllers |
| **W32** | 32°C | Significant free cooling; most hyperscale designs target this | Often chiller-free | Fewer chillers = fewer VFDs and PLCs; reduced attack surface |
| **W40** | 40°C | Emerging class for heat recovery applications | Chiller-free in most climates | Minimal mechanical refrigeration; dry coolers only |
| **W45** | 45°C | Maximum energy efficiency; direct heat reuse potential | Chiller-free | Simplest control system; smallest attack surface |

**Security implication:** The choice of ASHRAE class affects the complexity of the cooling control system and therefore the OT attack surface. Group 1 designs (dry coolers, no chillers) have fewer networked controllers than Group 3 designs (multi-stage chillers, complex staging algorithms). Simpler systems have smaller attack surfaces. ASHRAE TC 9.9 also specifies rate-of-change limits (≤20°C/hr, ≤5°C/15-min) that BMS controllers must enforce during cooling system failover [ASHRAE TC 9.9, 2021].

---

## 2. Redundancy Topologies and Their Security Failure Modes

### 2.1 N Configuration (Tier I)

No redundancy. A single power and cooling path serves the load. Equipment failure causes load interruption.

**Security consideration:** Minimal OT attack surface (fewest controllers), but no resilience to any failure, whether mechanical or cyber-induced. Not suitable for any production workload.

### 2.2 N+1 Component Redundancy (Tier II)

One additional component (UPS module, chiller, pump) beyond the minimum required to serve the load. If the load requires 3 UPS modules, 4 are installed (3+1).

**Security failure mode:** If all 4 UPS modules run identical firmware with the same vulnerability, a single exploit disables all 4. The "+1" provides no cyber resilience because all modules share the same logical failure mode. This is the **common-cause failure problem** that traditional reliability engineering addresses through diversity but that datacentre OT has largely ignored.

**CVE Examples for UPS Network Management Cards:**

| CVE ID | Affected Product | Vulnerability Type | Impact | CVSS v3 | Published |
|:---|:---|:---|:---|:---|:---|
| CVE-2023-29456 | Schneider APC NMC2/NMC3 | Hardcoded credentials (backdoor account) | Full device compromise | 9.8 | 2023-04 |
| CVE-2022-22805 | Schneider APC NMC2 | Buffer overflow in SNMP | Remote code execution | 9.8 | 2022-01 |
| CVE-2021-22803 | Schneider APC NMC2 | Path traversal in web interface | Configuration file disclosure | 7.5 | 2021-06 |
| CVE-2020-13961 | Vertiv Liebert NMC | OS command injection | Remote code execution | 9.8 | 2020-07 |
| CVE-2019-10945 | Eaton UPS NMC | Plaintext credentials in SNMP | Credential theft | 7.5 | 2019-05 |

**IEC 62443 mitigation:** At minimum, UPS management cards must be SL-2 certified (Schneider NMC3, Vertiv RDU120, Eaton NETWORK-M3) and placed on a dedicated management VLAN with authenticated access. Firmware diversity across the redundant set is desirable but rarely practical with single-vendor procurement. The ISASecure gap means asset owners must perform independent penetration testing on these devices [IEC 62443-4-2, 2019].

### 2.3 N+1 Concurrent Maintainability (Tier III)

Redundant distribution paths allow any component or path to be taken offline for maintenance without affecting IT load. This is the dominant topology for hyperscale facilities.

**Security failure mode:** Concurrent maintainability assumes that the operator *chooses* to take one path offline. A cyber attacker does not follow this assumption — they target all paths simultaneously. The Tier III design provides the operator time to respond to a mechanical failure; it provides no additional time to respond to a coordinated cyber attack that compromises the shared control plane.

**The "Catcher" or distributed block redundant topology** (e.g., 4-to-3 UPS) improves mechanical resilience but does not improve cyber resilience if all blocks share a common management network.

**IEC 62443 zone/conduit mapping for Tier III electrical distribution:**

| Redundant Path | OT Asset Group | IEC 62443 Zone | Security Level Target (SL-T) | Conduit to IT |
|:---|:---|:---|:---|:---|
| Path A (UPS blocks 1–2) | UPS NMCs, STS, PDU meters | Zone 2A (Electrical A) | SL 3 | C0-2A (firewall + DPI) |
| Path B (UPS blocks 3–4) | UPS NMCs, STS, PDU meters | Zone 2B (Electrical B) | SL 3 | C0-2B (firewall + DPI) |
| Shared BMS | BMS controllers, sensors | Zone 1 (BMS/HVAC) | SL 2–3 | C0-1 (data diode preferred) |

**IEC 62443 mitigation:** Zone segmentation must ensure that the management interfaces of redundant equipment are on physically separate network segments. If UPS blocks 1–2 are managed from VLAN-A and blocks 3–4 from VLAN-B, a compromise of one management segment cannot propagate to all blocks. This is the network equivalent of the physical isolation that Tier III requires for distribution paths.

### 2.4 2N+1 Fault Tolerance (Tier IV)

Fully independent, physically isolated systems. Two complete power and cooling trains, each capable of serving the full load independently, with additional N+1 redundancy within each train.

**Security failure mode:** Physical isolation of redundant systems is meaningless if both systems are managed through the same BMS, the same DCIM platform, or the same remote access gateway. The BMS is a single point of management for both physically isolated cooling trains. The EPMS is a single point of visibility for both physically isolated power trains.

**This is the most important insight in this chapter:** Tier IV physical redundancy is defeated by Tier I logical architecture. The BMS must be treated as a single point of failure for the entire facility, regardless of the Tier classification of the mechanical systems it controls.

**IEC 62443 zone/conduit mapping for Tier IV cooling trains:**

| Cooling Train | OT Asset Group | IEC 62443 Zone | SL-T | Conduit to BMS Supervisor |
|:---|:---|:---|:---|:---|
| Train A | Chiller A, pump A, CDU A, VFD A | Zone 1A (Cooling A) | SL 2 | C1A (industrial firewall) |
| Train B | Chiller B, pump B, CDU B, VFD B | Zone 1B (Cooling B) | SL 2 | C1B (industrial firewall) |
| BMS Supervisor | Head-end server, historian | Zone 1S (BMS Supervisor) | SL 3 | C0-1 (data diode to IT) |

**IEC 62443 mitigation:**
- BMS controllers in each redundant train should be in separate IEC 62443 zones (Zone 1A, Zone 1B)
- BMS supervisor should require multi-factor authentication for setpoint changes
- Critical setpoint changes should require confirmation from an independent system (not the same BMS)
- Fire suppression interfaces must be physically isolated (one-way dry contact, not bidirectional Ethernet)

**NFPA 75/76 Fire Protection Integration:** Fire alarm control panels (FACP) must be in Zone 3 (Fire/Life Safety) with SL-T 3. The interface between BMS and FACP for HVAC shutdown must be a hardwired interlock or a dedicated industrial firewall with <5 second latency [NFPA 75, 2020; NFPA 76, 2024].

---

## 3. The Hyperscale Evolution: Beyond Traditional Tiers

### 3.1 Why Hyperscalers Reject Traditional Tier Certification

Most hyperscale operators (Google, Microsoft, Meta, AWS) do not seek formal Uptime Institute Tier Certification. Their reasoning is instructive:

1. **Tier classification was designed for single-building facilities.** Hyperscale campuses distribute workload across multiple buildings, availability zones, and regions. Application-level redundancy (data replication, load balancing, automated failover) provides availability guarantees that exceed what any single facility can deliver.

2. **Tier IV is expensive and wasteful at hyperscale.** When a workload can fail over to another data hall in milliseconds, the economic justification for 2N+1 power and cooling in every hall collapses. Hyperscalers build to Tier III mechanical redundancy with Tier IV operational practices — and compensate for any single-facility outage through software orchestration.

3. **The Tier system does not account for software-defined resilience.** Kubernetes pod rescheduling, NVIDIA GPU cluster failover, and cloud-native stateless architectures provide availability mechanisms that exist entirely outside the facility classification framework.

**EN 50600 / ISO 22237 Alternative:** Hyperscalers increasingly reference EN 50600-2-2 (power) and EN 50600-2-3 (cooling) independently, allowing Class 3 for cooling and Class 4 for power without requiring a single facility-wide classification [ISO/IEC 22237-3, 2021].

### 3.2 Pod/Cell Architecture

Hyperscalers divide campuses into self-contained cells or pods — typically 5–10 MW power/cooling blocks that can be deployed, commissioned, and operated independently.

Each cell contains:
- Independent MV/LV power train
- Dedicated chiller/CDU cluster  
- Independent BMS zone controller
- Independent fire detection and suppression
- Dedicated OT network segment

**Security advantage:** Cell-level isolation inherently creates IEC 62443 zones. A compromise in Cell A's BMS does not propagate to Cell B if the cells are on separate OT network segments with no shared management plane.

**Recommended IEC 62443 zone model for pod/cell architecture:**

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

**Security risk:** The campus-level BMS supervisor, DCIM platform, and EPMS aggregate across all cells. These cross-cell systems become the highest-value targets because they provide a single point of access to all cells simultaneously. They must be placed in a dedicated zone (Zone 1S) with SL-T 3 and protected by a data diode for outbound telemetry and a separate command path with MFA.

### 3.3 Modular and Prefabricated Datacentres

Prefabricated datacentre modules from Schneider Electric (EcoStruxure Modular DC), Vertiv (MegaMod), and specialist providers are factory-built, tested, and shipped as complete units. This approach enables standardised zone/conduit templates that can be replicated across sites — a significant advantage for IEC 62443 program scalability.

**IEC 62443 opportunity:** A standardised prefab module with pre-configured OT network segmentation, hardened firmware, and documented zone boundaries can be replicated across multiple sites, reducing the per-site security engineering effort. The module should include:

- Pre-configured industrial firewall rules between Zone 1 (BMS) and Zone 2 (Electrical)
- Hardened UPS NMCs with default credentials changed and SNMP v3 enabled
- BMS controllers with role-based access control and audit logging
- Fire alarm panel with hardwired interlock to HVAC shutdown (no network-only trigger)
- Battery energy storage system (BESS) with NFPA 855-compliant gas detection and thermal management [NFPA 855, 2026]

**Cross-Standard Integration Matrix for Prefab Modules:**

| Subsystem | IEC 62443 Zone | SL-T | EN 50600 Class | NFPA Reference | ASHRAE Class |
|:---|:---|:---|:---|:---|:---|
| UPS + PDU | Zone 2 | 3 | Class 3–4 (power) | NFPA 75 Ch. 10 | — |
| Chiller + CDU | Zone 1 | 2 | Class 3 (cooling) | — | W32–W45 |
| Fire Detection | Zone 3 | 3 | PC 3 (security) | NFPA 75 Ch. 7 | — |
| BESS | Zone 6 | 3 | Class 3 (power) | NFPA 855 Ch. 4–13 | — |
| Access Control | Zone 5 | 2 | PC 3 (security) | — | — |

**Procurement Requirement:** When procuring prefab modules, require evidence of IEC 62443-4-1 SDLA certification for the module integrator and IEC 62443-4-2 CSA certification for all embedded OT components. As of June 2025, no prefab module vendor offers full CSA certification for all components — this is a market gap [ISASecure, 2025].

---

## References

- ASHRAE TC 9.9. (2021). *Thermal Guidelines for Data Processing Environments* (5th ed.). ASHRAE.
- EN 50600-2-2. (2019). *Information technology — Data centre facilities and infrastructures — Part 2-2: Power distribution*. CENELEC.
- IEC 62443-4-2. (2019). *Security for industrial automation and control systems — Part 4-2: Technical security requirements for IACS components*. IEC.
- ISASecure. (2025). *Certified Products Registry*. https://isasecure.org/certification/certified-products
- ISO/IEC 22237-3. (2021). *Information technology — Data centre facilities and infrastructures — Part 3: Power distribution*. ISO.
- NFPA 75. (2020). *Standard for the Fire Protection of Information Technology Equipment*. NFPA.
- NFPA 76. (2024). *Standard for the Fire Protection of Telecommunications Facilities*. NFPA.
- NFPA 855. (2026). *Standard for the Installation of Stationary Energy Storage Systems*. NFPA.
- Uptime Institute. (2023). *Tier Standard: Topology*. Uptime Institute.
```