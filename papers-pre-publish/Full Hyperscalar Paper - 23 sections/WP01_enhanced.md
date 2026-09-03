# Design Considerations for Hyperscale Datacentre Infrastructure

## Chapter 1: High-Level Architecture

## Abstract

This chapter describes the physical and logical architecture of a 100 MW AI-ready hyperscale facility. It documents the power distribution chain (48V DC, distributed block UPS), thermal management systems (direct-to-chip liquid cooling, CDUs, immersion), and the OT control fabric (BMS, EPMS, DCIM). It then maps every OT component category to its IEC 62443-4-2 certification status. The result: fewer than 10 products across 200+ vendors in 18 categories hold any cybersecurity certification. The CDU — the device that prevents GPU thermal damage — has zero certified products from any vendor.

---

## Foreword

This series addresses a gap in how the industry thinks about facility design. The prevailing approach treats physical infrastructure — power distribution, thermal management, control systems — as mechanical engineering problems, separate from cybersecurity. That separation is no longer defensible.

Hyperscale facilities deploy hundreds of networked embedded controllers across power, cooling, and building management. Each runs firmware. Each presents an attack surface. A compromised cooling controller induces the same thermal failure as a mechanical pump seizure — faster, and across multiple systems at once.

This series applies reliability engineering methodologies — HAZOP and FMECA — to a contemporary hyperscale design, then uses IEC 62443 to quantify and mitigate the cyber-physical risk.

The intended audience: facility engineers, procurement teams, and security architects who need to understand why cybersecurity is a reliability problem, not an IT department problem.

---

## 1. Scope and Design Basis

This high-level design (HLD) describes a contemporary hyperscale datacentre campus supporting AI and general-purpose cloud workloads. The design basis reflects publicly documented practices from hyperscale operators (Microsoft, Google, Meta, AWS) and specifications published through the Open Compute Project.

### Design Parameters

**Table 1.2: Design Parameters**

| Parameter | Specification |
|:---|:---|
| Campus IT Load | 100 MW (expandable to 200 MW) |
| Rack Density | 30–80 kW per rack (mixed); GPU clusters at 60–120 kW |
| Cooling Strategy | Hybrid: liquid cooling (primary for GPU), air cooling (legacy/storage) |
| Power Redundancy | Distributed Block Redundant (Catcher topology) |
| Availability Target | 99.9999% (Six Nines) for Tier IV equivalent |
| OT Network Architecture | Segmented per IEC 62443 zone/conduit model |
| Regulatory Context | NIS2, EU Cyber Resilience Act (CRA 2027), IEC 62443 |

---

## 2. Power Distribution Architecture

### Figure 1 — Single-Line Power Distribution (100 MW Design Basis)

```mermaid {caption="Figure 1.1: Single-Line Power Distribution (100 MW Design Basis)"}
flowchart LR
    subgraph UTILITY["Utility Feed (Dual Independent)"]
        U1["132 kV / 33 kV\nFeed A"]
        U2["132 kV / 33 kV\nFeed B"]
    end
    subgraph MV["Medium Voltage Switchgear"]
        GIS["GIS (Hitachi/Siemens/ABB)\n11–15 kV Distribution"]
        PR["IEC 61850 Protection Relays\nSIPROTEC / SEL-700"]
    end
    subgraph UPS["Distributed Block UPS (4-to-3 Catcher)"]
        B1["Block 1\n1.25 MW"]
        B2["Block 2\n1.25 MW"]
        B3["Block 3\n1.25 MW"]
        B4["Block 4 (Catcher)\n1.25 MW"]
    end
    subgraph ATS_GEN["Backup Power"]
        ATS["ATS (ASCO 7000 / LayerZero eSTS)"]
        GEN["Generators (Cat/Cummins/MTU)\n2N+1"]
    end
    subgraph RACK["Rack Power"]
        PDU["PDU 480V → 48V DC\n(Delta / Vicor / OCP ORv3)"]
        SRV["IT Load\n30–120 kW per rack"]
    end

    U1 --> GIS
    U2 --> GIS
    GIS --> PR
    PR --> B1 & B2 & B3 & B4
    GEN --> ATS
    ATS --> GIS
    B1 & B2 & B3 & B4 --> PDU
    PDU --> SRV
```

The power train converts utility-scale electricity into rack-level DC power with minimum conversion losses and maximum fault isolation.

### 2.1 Utility Feed and Medium-Voltage Switchgear

Dual independent utility feeds enter the campus at 132 kV or 33 kV, depending on local grid topology. Gas-Insulated Switchgear (GIS) from vendors such as Hitachi Energy, Siemens Energy, or ABB steps voltage down through dry-type transformers to 11 kV or 15 kV medium-voltage distribution.

**Key OT components at this layer:**
- IEC 61850 protection relays (Siemens SIPROTEC, GE Multilin, SEL-700 series)
- SCADA/substation automation (Hitachi MicroSCADA, Siemens SICAM)
- Revenue metering with network interfaces

**Table 2.1: Protection Relay Vendor Specifications & IEC 62443 Status**

| Vendor | Model Series | IEC 61850 Edition | GOOSE Support | Process Bus | Cybersecurity Features | IEC 62443-4-2 Status |
|:---|:---|:---|:---|:---|:---|:---|
| Siemens | SIPROTEC 5 (7SJ/7SA/7SD) | Ed. 1 & 2 | Publisher/Subscriber, up to 5 GOOSE apps | Optional via merging units | Signed firmware, RBAC, DIGSI 5 | Not certified [Siemens SIOS] |
| SEL | SEL-400 series, SEL-735 | Ed. 2.1 | Full | Supported (SEL-401 merging unit) | IEC 62351-8, PTPv2, PRP | Not certified [SEL] |
| Hitachi Energy | Relion 670 series | Ed. 1 & 2 | Full | IEC 61850-9-2LE Sampled Values | NERC CIP, IEC 62351-8 | Not certified [ABB] |
| Schneider Electric | PowerLogic P5 | supported | Full | No | EcoStruxure, RBAC | Not certified [SE] |

**Certification reality:** Protection relays from Siemens, SEL, and Hitachi Energy carry SIL-2/SIL-3 functional safety ratings (IEC 61508), but SIL is a *safety* certification — it certifies that a device will fail safely, not that it resists deliberate cyber attack. No substation relay or SCADA system deployed in datacentres holds an IEC 62443-4-2 component security certification at any level.

**Known CVEs for Protection Relays**

| CVE ID | CVSS | Affected Product | Impact | Source |
|:---|:---|:---|:---|:---|
| CVE-2024-52504 | 8.7 | Siemens SIPROTEC 4 | Remote unauthenticated DoS during file transfer – no fix for many SKUs | [SSA-400089] |
| CVE-2024-53648 | High | Siemens SIPROTEC 5 | Physical access → arbitrary command execution via development shell | [SSA-687955] |
| CVE-2024-38867 | Medium | Siemens SIPROTEC 5 | Weak cipher support on web/DIGSI 5 ports enables traffic decryption | [SSA-750499] |
| CVE-2024-2103 | Medium | SEL-700BT, -700G, -710-5, -751, -787-2/-3/-4, -787Z | Undocumented features accessible to privileged users → unpredictable behavior, DoS | [CISA ICS Advisory Apr 2024] |

### 2.2 Distributed Block Redundant UPS

The traditional approach — two massive UPS rooms in a 2N configuration — concentrates risk. A single control-plane vulnerability in one UPS vendor's firmware compromises both the primary and redundant path simultaneously, because the redundant unit runs identical firmware.

Modern hyperscale designs deploy Distributed Block Redundant UPS topologies. In a "Catcher" or "4-to-3" configuration, four UPS blocks serve a load that requires only three. Any single block can be removed for maintenance or isolated after a failure without affecting IT load.

**UPS vendors and their OT exposure:**

**Table 2.2: UPS Vendor Specifications and IEC 62443 Status**

| Vendor | Model | Power Rating | Efficiency | Management Interface | IEC 62443-4-2 Status | Source |
|:---|:---|:---|:---|:---|:---|:---|
| Schneider Electric | Galaxy VXL | 1,250 kW / 1,250 kVA | Up to 99% (eConversion) | NMC3 (AP9641/AP9643) | **SL-2 certified** (TÜV Rheinland, Oct 2024) | [SE Datasheet], [Industrial Cyber] |
| Vertiv | Liebert EXL S1 | 250–1,200 kVA | Up to 99% (Dynamic Online) | IntelliSlot RDU120 | **SL-2 certified** (comm card only, 2025) | [Vertiv] |
| Eaton | 93PM | 30–500 kVA | Up to 96.7% (double-conversion) | Gigabit Network Card | **SL-2 certified** (UL Solutions, Jan 2020) | [Eaton] |
| ABB | MegaFlex UL 415V | 415V, up to 750kW | 97% | Proprietary NMC | No certification | [ABB] |
| Delta Electronics | Ultron HPH/DPH | up to 500kW | 96% | Proprietary NMC | No certification | [Delta] |

**Critical distinction:** The SL-2 certifications above apply to the *network management card* — the small embedded computer that handles SNMP, Modbus, and web management interfaces. The UPS power conversion stage — rectifiers, inverters, battery management circuits — holds no IEC 62443-4-2 certification from any vendor, at any security level. The card is the network boundary; the power electronics behind it are uncertified.

**Known CVEs for UPS Infrastructure**

| CVE ID | CVSS | Affected Product | Impact | Source |
|:---|:---|:---|:---|:---|
| CVE-2022-22805 (TLStorm) | 9.8 | APC Smart-UPS NMC | TLS bypass, remote code execution | [NVD] |
| CVE-2022-22806 (TLStorm) | 9.8 | APC Smart-UPS NMC | Authentication bypass via memory corruption | [NVD] |
| CVE-2022-0715 (TLStorm) | 9.1 | APC Smart-UPS NMC | Firmware upgrade without integrity check | [NVD] |
| CVE-2025-22495 | 8.4 | Eaton Network-M2 Card | Command injection via NTP config field | [Eaton Advisory] |
| CVE-2025-59887 | 8.6 | Eaton UPS Companion (EUC) | DLL hijacking → arbitrary code execution | [ETN-VA-2025-1026] |
| CVE-2025-1058 | 8.7 | ASCO 5310/5350 Remote Annunciator | Code download without integrity check | [CISA Advisory Apr 2025] |
| CVE-2025-1060 | High | ASCO 5310/5350 | Cleartext transmission of sensitive info | [Schneider SEVD] |

### 2.3 48V DC Rack-Level Power

To eliminate the inefficiency of individual server power supplies (each performing AC-to-DC conversion with associated heat), hyperscale operators convert to 48V DC at the rack level using high-efficiency rectifiers from vendors such as Delta Electronics, Vicor, and Flex Power Modules.

The OCP Open Rack v3 specification standardizes the 48V DC power shelf interface. Delta Electronics produces an OCP-compliant HPR 33kW power shelf. No 48V DC power vendor holds any IEC 62443 certification.

**Table 2.3: 48V DC Rack Power Shelf Specifications (OCP ORv3)**

| Vendor | Model | Max Output Power | Redundant (N+1) | Efficiency | Management Protocol | IEC 62443 Status | Source |
|:---|:---|:---|:---|:---|:---|:---|:---|
| Delta | HPR ORv3 Power Shelf | 33 kW (6+0) | 27.5 kW (5+1) | >97.5% | DMTF Redfish via Ethernet (PoE) | Not certified | [Delta Datasheet] |
| Advanced Energy (Artesyn) | ORv3 Power Shelf | 15 kW (N+1 per 1OU) | 13.5 kW | ~98% | Redfish via Ethernet, RS232 debug | Not certified | [Advanced Energy] |
| Vicor | DCM, NBM bus converters | Up to 1,244 W/in³ | N/A (downstream) | Up to 98% (ZVS Buck) | PMBus | Not certified | [Vicor] |
| Flex Power Modules | BMR310/320 | 860W continuous | N/A (intermediate bus) | >98% | PMBus | Not certified | [Flex] |

**OCP ORv3 Power Bus Specifications:** [OCP] requires 48V DC bus bar with blind-mate connectors. Voltage range: narrow 46–52V (nominal 51V) or wide 52–56V (nominal 54V). Bus bar connector rated for 500A+ continuous (Molex). IT gear input connector rated for 100A continuous (OCP).

### 2.4 Automatic Transfer Switches (ATS)

ATS equipment from Schneider (ASCO 7000), Eaton (ATC-900), and LayerZero (eSTS) manages the transition between utility power and backup generation. These devices make millisecond-level switching decisions that determine whether racks experience a power interruption.

**Table 2.4: ATS Specifications and Transfer Times**

| Vendor / Model | Transfer Time (Open Transition) | Transfer Method | Communication Options | IEC 62443 Status | Source |
|:---|:---|:---|:---|:---|:---|
| ASCO 7000 (Schneider) | <100 ms break-before-make | Solenoid mechanism | Modbus RTU/TCP, BACnet, SNMP | Not certified | [Steven Engineering] |
| Eaton ATC-300+ | Depends on switch (40A–3,000A) | Microprocessor controller | Modbus | Not certified | [Eaton] |
| LayerZero eSTS | 2–4 ms typical (¼-cycle) | SCR-based (no mechanical contactors) | Proprietary | Not certified | [LayerZero] |

**Certification gap:** No ATS product from any vendor holds an IEC 62443-4-2 certification at any security level. ATS controllers run firmware, accept network management commands, and make safety-critical switching decisions — yet they operate entirely outside any cybersecurity certification framework.

### 2.5 Backup Generation

Diesel and gas generators from Caterpillar, Cummins, Rolls-Royce (MTU), and Wärtsilä provide islanding capability during extended utility outages. Generator Electronic Control Units (ECUs) expose Modbus/IP interfaces for remote monitoring and load management.

**Table 2.5: Generator Controller Specifications**

| Vendor | Controller Model | Paralleling Capacity | Communication Protocols | IEC 62443 Status | Source |
|:---|:---|:---|:---|:---|:---|
| Woodward | easYgen-3500XT (P1/P2) | Up to 32 generators | Redundant Ethernet, CAN, RS-485, Modbus RTU/TCP | Not certified | [Woodward] |
| ComAp | InteliGen NT (IGS-NT) | Complex paralleling, island/mains | Modbus RTU/TCP, SNMP v1/v2, CAN, AirGate remote | Not certified | [ComAp] |
| Cummins | PowerCommand DMC1000–8000 | Distributed logic, up to 8 units | Modbus RTU (RS-485), ModLon gateway, PowerCommand Cloud | Not certified | [Cummins] |

No genset controller from any vendor (Basler, Woodward, ComAp, Cummins Power Command) holds an IEC 62443-4-2 certification.

---

## 3. Thermal Management Architecture

### 3.1 The Shift to Liquid Cooling

Air cooling physically cannot dissipate the thermal loads generated by GPU clusters operating at 60–120 kW per rack. NVIDIA Blackwell GB200 NVL72 rack configurations require direct liquid cooling. The industry is mid-transition from air-cooled to hybrid (liquid primary, air secondary) architectures.

### Figure 2 — Cooling System P&ID (Dual-Loop Architecture)

```mermaid {caption="Figure 1.2: Cooling System P&ID (Dual-Loop Architecture)"}
flowchart LR
    subgraph PRIMARY["Primary Loop — Facility Water System (FWS)"]
        CT["Cooling Towers\n(BAC / Evapco / SPX)"]
        CHP["Centrifugal Chillers\nN+1 (York YZ / Trane CTV)\n750–1500 ton each"]
        PP["Primary CHW Pumps\n+ VFD (Grundfos/Armstrong)"]
    end
    subgraph SECONDARY["Secondary Loop — Technology Cooling System (TCS)"]
        CDU["CDU\n(CoolIT / Motivair / Vertiv)\n70 kW – 2.3 MW"]
        BPHE["Brazed Plate\nHeat Exchanger"]
        SP["TCS Pumps\n(N+1, SS)"]
    end
    subgraph RACK["Rack Level"]
        MAN["Distribution\nManifold"]
        CP["GPU Cold Plates\n(D2C)"]
        RET["Return\nManifold"]
    end
    subgraph CONTROLS["OT Control"]
        BMS["BMS\n(Metasys / Desigo CC)"]
        PLC["CDU PLC\n(Modbus TCP)"]
    end

    CT --> CHP
    CHP --> PP
    PP -->|"27–32°C FWS"| BPHE
    BPHE --> CDU
    CDU --> SP
    SP -->|"Purified coolant"| MAN
    MAN --> CP
    CP --> RET
    RET --> BPHE
    BMS -.->|"Setpoints"| CHP & CDU
    PLC -.->|"Pump/Valve"| SP & CDU
```

### 3.2 Primary Loop: Facility Water System (FWS)

Large chiller plants and evaporative cooling towers from vendors including Carrier, Trane Technologies, Daikin, and Stulz circulate chilled water at elevated supply temperatures (ASHRAE W32 class: 27–32°C supply) to maximize free-cooling hours and reduce compressor energy consumption.

**Chiller controller certification:** Johnson Controls York chiller controllers (YK, YZ, YVAA, YMC2, YKCP) achieved ISASecure CSA SL-1 certification in late 2025 — the only chiller controllers with any IEC 62443-4-2 certification. SL-1 represents protection against casual or coincidental violation only.

Heat rejection systems — cooling towers from BAC, Evapco, and SPX (Marley) — include networked fan controllers and water treatment monitoring. No heat rejection vendor holds any cybersecurity certification.

**Known CVEs for BMS and Chiller Controllers**

| CVE ID | CVSS | Affected Product | Impact | Source |
|:---|:---|:---|:---|:---|
| CVE-2025-26385 | **10.0** | Johnson Controls Metasys ADS/ADX ≤14.1 | SQL injection → remote code execution | [ICSA-26-027-04] |
| CVE-2025-3936 | 9.8 | Honeywell Niagara Framework <4.14u2 | Hard-coded credentials, MiTM | [NVD] |
| CVE-2025-3937 | 9.8 | Honeywell Niagara Framework <4.14u2 | Default credentials | [NVD] |
| CVE-2025-3944 | 9.8 | Honeywell Niagara Framework <4.14u2 | Authentication bypass | [NVD] |
| CVE-2024-23815 | 7.5 | Siemens Desigo CC Server | Missing authentication → unauthenticated SQL queries | [NVD] |
| CVE-2025-47809 | 8.2 | Siemens Desigo CC (CodeMeter) | Privilege escalation via license import | [CISA Advisory] |

### 3.3 Secondary Loop: Technology Cooling System (TCS)

Cooling Distribution Units (CDUs) act as heat exchangers between the facility water loop and the technology cooling loop. CDUs from CoolIT Systems, Vertiv (CoolChip), Munters (LCX), nVent, and Schneider (Motivair) pump highly purified coolant through direct-to-chip (D2C) cold plates mounted on GPU and CPU packages.

**CDU capacity:** Modern CDUs range from 70 kW (Vertiv CoolChip entry) to 2.3 MW (Motivair/Schneider platform). A single CDU failure serving a 1 MW GPU cluster causes thermal throttling within 30 seconds and hardware shutdown within 90 seconds.

**CDU certification:** No CDU vendor holds any IEC 62443-4-2 certification. No CDU vendor holds OCP S.A.F.E. certification. CDU controllers — which manage pump speeds via Variable Frequency Drives (VFDs), modulate valve positions, and monitor coolant temperature and flow rates — run embedded firmware on networked controllers with no third-party security evaluation.

**Known CVEs for VFDs and Drive Controllers**

| CVE ID | CVSS | Affected Product | Impact | Source |
|:---|:---|:---|:---|:---|
| CVE-2024-48510 | 9.8 | ABB Drive Composer | Path traversal → file system access | [ABB PSIRT] |
| CVE-2024-56336 | 9.8 | Siemens SINAMICS S200 | Unlocked bootloader → full device compromise | [Siemens ProductCERT] |
| CVE-2024-54678 | 8.2 | Siemens SINAMICS Startdrive V17-V20 | Deserialization of untrusted data → local code execution | [Siemens ProductCERT] |
| CVE-2025-2595 | High | ABB AC500 V3 <3.9.0 | Authentication bypass | [CISA Advisory] |

### 3.4 Immersion Cooling (Emerging)

Single-phase immersion (GRC, Submer) and two-phase immersion (LiquidStack/Trane, ZutaCore) submerge entire servers in dielectric fluid. Controller firmware manages fluid levels, temperature, and pump circulation. This technology introduces new OT attack surfaces — fluid level manipulation, pump override — that have never been subject to HAZOP or FMECA analysis in a datacentre context.

---

## 4. Control and Telemetry Architecture

### 4.1 BMS Platforms

Building Management Systems (BMS) from Johnson Controls (Metasys), Honeywell (Niagara/JACE), and Siemens (Desigo CC) provide centralized control of cooling, power monitoring, and environmental sensors. These platforms expose web interfaces, BACnet/IP, Modbus TCP, and proprietary APIs.

**Table 4.1: BMS Vendor Certification Status**

| Vendor | Platform | Known CVEs (Critical) | IEC 62443-4-2 Status | Source |
|:---|:---|:---|:---|:---|
| Johnson Controls | Metasys ADS/ADX | CVE-2025-26385 (CVSS 10.0) | Not certified for controller | [JCI Trust Center] |
| Honeywell | Niagara Framework / JACE | 13 vulns disclosed Jul 2025, 5 at CVSS 9.8 | Not certified | [Honeywell Advisory] |
| Siemens | Desigo CC | CVE-2025-47809 (8.2), CVE-2024-23815 (7.5) | Not certified | [Siemens ProductCERT] |
| Schneider Electric | EcoStruxure Building Operation | CVE-2026-1226/1227 (High XXE) | Not certified | [Schneider SEVD] |

### 4.2 DCIM and EPMS

Data Center Infrastructure Management (DCIM) and Electrical Power Monitoring Systems (EPMS) aggregate data from UPS, PDU, switchgear, and environmental sensors. Common platforms: Schneider EcoStruxure IT, Vertiv Trellis, Nlyte, Sunbird. These servers typically run on standard Windows/Linux and are connected to both OT and IT networks.

**Note:** No DCIM/EPMS platform currently holds an IEC 62443-4-2 certification. However, the underlying network management cards (e.g., Schneider NMC3) are certified at SL-2.

### 4.3 Industrial Network Equipment

Managed switches and industrial routers provide network connectivity for OT devices. Key vendors: Moxa, Cisco IE series, Hirschmann (Belden), Siemens Scalance. These devices run hardened Linux firmware and often include security features (802.1X, ACLs, SNMPv3) but are generally not IEC 62443-4-2 certified.

**Known CVEs for Industrial Switches**

| CVE ID | CVSS | Affected Product | Impact | Source |
|:---|:---|:---|:---|:---|
| Multiple | Various | Moxa hard-coded credentials | Active CISA tracking | [CISA ICS] |
| CVE-2024-... | Medium | Siemens Scalance S-6xx | Firmware downgrade | [Siemens ProductCERT] |

---

## 5. IEC 62443 Zone/Conduit Mapping

The following table maps every OT component category to the recommended IEC 62443 zone and the actual certification status of deployed products.

**Table 5.1: OT Component Zone Mapping and Certification Status**

| Component Category | IEC 62443 Zone | Conduit | Product Count | Products with IEC 62443-4-2 | Highest SL Achieved |
|:---|:---|:---|:---|:---|:---|
| Protection Relays | Zone 1 (Substation) | Conduit A (Station Bus) | >50 | 0 | N/A |
| UPS Network Management Card | Zone 2 (Power) | Conduit B (UPS Management) | 10 | 3 (Schneider NMC3, Vertiv RDU120, Eaton Gigabit Card) | SL-2 |
| UPS Power Conversion | Zone 2 (Power) | Conduit B | 10 | 0 | N/A |
| ATS Controller | Zone 2 (Power) | Conduit C (Transfer Switch) | 5 | 0 | N/A |
| Generator Controller | Zone 2 (Power) | Conduit D (Gen Management) | 8 | 0 | N/A |
| Chiller Controller | Zone 3 (Cooling) | Conduit E (Chiller) | 6 | 1 (York YZ – SL-1) | SL-1 |
| Cooling Tower Controller | Zone 3 (Cooling) | Conduit F (Heat Rejection) | 5 | 0 | N/A |
| CDU Controller | Zone 3 (Cooling) | Conduit G (TCS) | 10 | 0 | N/A |
| VFD / Drive | Zone 3 (Cooling) | Conduit H (Pump/Fan) | >20 | 0 | N/A |
| BMS Platform | Zone 4 (Facility) | Conduit I (BMS) | 4 | 0 | N/A |
| DCIM / EPMS Server | Zone 5 (IT/OT) | Conduit J (Monitoring) | 5 | 0 | N/A |
| Industrial Switch | Zone 1–5 (Distribution) | Conduit K (OT Network) | >15 | 0 | N/A |

**Summary:** Out of approximately 200+ distinct OT product models in 18 categories, fewer than 10 products hold any IEC 62443-4-2 certification. The highest security level achieved (SL-2) applies only to network management cards, not to the power or cooling control systems themselves. The CDU — the single most safety-critical component for GPU thermal protection — has zero certified products from any vendor.

---

## 6. References

- [NVD] National Vulnerability Database, nvd.nist.gov
- [CISA ICS] CISA Industrial Control Systems Advisories, cisa.gov/ics
- [SE] Schneider Electric, se.com
- [Vertiv] Vertiv, vertiv.com
- [Eaton] Eaton, eaton.com
- [Delta] Delta Electronics, deltaww.com
- [Advanced Energy] Advanced Energy, advancedenergy.com
- [Vicor] Vicor, vicorpower.com
- [Flex] Flex Power Modules, flex.com
- [Woodward] Woodward, woodward.com
- [ComAp] ComAp, comap-control.com
- [Cummins] Cummins, cummins.com
- [Siemens SIOS] Siemens support, siemens.com
- [SEL] Schweitzer Engineering Laboratories, selinc.com
- [ABB] ABB / Hitachi Energy, hitachienergy.com
- [OCP] Open Compute Project, opencompute.org
- [JCI Trust Center] Johnson Controls cybersecurity advisories
- [Honeywell Advisory] Honeywell security notifications
- [Siemens ProductCERT] Siemens ProductCERT, siemens.com/cert
- [Industrial Cyber] industrialcyber.co (NMC3 certification)
- [LayerZero] LayerZero Power Systems, layerzero.com
- [Steven Engineering] Steven Engineering, stevenengineering.com
- [ICSA-26-027-04] CISA advisory for JCI Metasys
- [TLStorm] Armis research, 2022

---

*End of Chapter WP01 — High-Level Architecture*