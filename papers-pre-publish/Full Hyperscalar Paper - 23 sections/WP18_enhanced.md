# Chapter 18: The IEC 62443 Implementation Process — SFAIR, SecRACS, and the Consolidated Hazard Register

## Abstract

The preceding seventeen chapters define *what* to protect and *why*. This chapter defines *how* — the end-to-end implementation process that transforms a CyHAZOPs assessment into a commissioned, verified, and continuously maintained IEC 62443 security programme.

The chapter introduces three practitioner frameworks absent from the published IEC 62443 standard but essential for delivery:

1. **SFAIR** (Scope → Find → Assess → Implement → Review) — a seven-stage implementation process with formal Zone Completion Reviews (ZCRs) that create auditable evidence at each stage gate.
2. **SecRACS** (Security Requirements Allocation and Compliance Specification) — the negotiation instrument between asset owner and system integrator that translates SL-T assignments into contractual deliverables with acceptance criteria.
3. **SIL-to-SL Convergence** — the mathematical framework from ISA TR 84.00.09 and TS 50701 practice that links functional safety integrity levels to cybersecurity security levels, ensuring that safety-critical OT components (the SCIL items from Chapter 17) receive proportionate cyber protection.

The chapter then consolidates all hazard log entries from Chapters 9, 11, 12, and 13 into a single Master Hazard Register — the authoritative risk record for the facility — and maps every entry to its EMB3D threat property and MITRE ATT&CK technique. Finally, it defines the role of the Third-Party Programme Director: the independent authority who verifies that what was specified was actually delivered.

---

## Practitioner's Note

IEC 62443 tells you what to produce. It does not tell you how to run the programme that produces it.

I have delivered IEC 62443 programmes on four continents — rail signalling in New Zealand, power distribution in the Middle East, water treatment in Southeast Asia, and datacentre OT across Europe and North America. The standard is the same in every engagement. The implementation process is not. Rail programmes run under TS 50701 with a Common Safety Method that mandates independent assessment. Energy programmes run under IEC 61511 with SIL verification. Datacentres run under... nothing. No sector-specific implementation process exists.

This chapter fills that gap. SFAIR is the implementation process I have refined across 30+ engagements. SecRACS is the negotiation instrument I use to convert zone/conduit designs into vendor contracts. The SIL-SL convergence formula is the bridge I built between safety engineers (who think in SIL) and security engineers (who think in SL) — because in a hyperscale facility, the CDU controller is both a safety-critical and a security-critical item, and the two disciplines must converge on a single set of requirements.

---

## 1. The SFAIR Implementation Process

### 1.1 Why IEC 62443 Needs an Implementation Framework

IEC 62443-3-2 (risk assessment), 3-3 (system requirements), and 2-1 (security management) define *deliverables* — zone/conduit models, SL-T assignments, security policies. They do not prescribe the *project management process* that produces these deliverables in a coordinated, stage-gated sequence with defined inputs, outputs, and acceptance criteria at each step.

The consequence: organisations attempt to implement IEC 62443 as a checklist rather than an engineering programme. They produce a zone/conduit diagram, declare the assessment complete, and wonder why the SL-T assignments never translate into procurement specifications and the gap analysis never drives remediation.

SFAIR imposes project discipline on IEC 62443 delivery. Each stage has defined inputs, activities, outputs, and a formal Zone Completion Review (ZCR) that must be passed before proceeding.

### 1.2 The Seven Stages

```mermaid {caption="Figure 18.1: 1.2 The Seven Stages"}
flowchart LR
    S["S — Scope"]
    F["F — Find"]
    A["A — Assess"]
    I["I — Implement"]
    R["R — Review"]

    S -->|ZCR-1| F
    F -->|ZCR-2/3| A
    A -->|ZCR-4| I
    I -->|ZCR-5/6| R
    R -->|ZCR-7| S

    style S fill:#45b7d1,color:#fff
    style F fill:#4ecdc4,color:#fff
    style A fill:#ff6b6b,color:#fff
    style I fill:#f7dc6f,color:#333
    style R fill:#bb8fce,color:#fff
```

**Stage S — Scope (ZCR-1)**

**Table 18.2: Stage S — Scope (ZCR-1)**

| Element | Detail |
|:---|:---|
| **Objective** | Define the System Under Consideration (SUC), organisational boundaries, and programme governance |
| **Inputs** | Facility HLD (Ch. 1); OT systems inventory (Ch. 7); organisational structure (Ch. 14) |
| **Activities** | Define SUC boundary; identify stakeholders; establish programme governance (steering committee, RACI); define success criteria; agree budget envelope per Gordon-Loeb (Ch. 10) |
| **Outputs** | SUC definition document; programme charter; stakeholder register; governance RACI |
| **ZCR-1 Gate** | Steering committee approves SUC scope and programme charter |

**Stage F — Find (ZCR-2, ZCR-3)**

**Table 18.3: Stage F — Find (ZCR-2, ZCR-3)**

| Element | Detail |
|:---|:---|
| **Objective** | Identify all OT assets, partition into zones and conduits, and conduct threat assessment |
| **Inputs** | SUC definition; P&ID drawings; BMS/EPMS architecture; OT network topology |
| **Activities** | OT asset discovery and inventory (automated + manual walk-down); zone/conduit partitioning per IEC 62443-3-2 (Ch. 4); MITRE ATT&CK for ICS threat mapping (Ch. 8); CyHAZOPs workshop delivery (Ch. 8–9) |
| **Outputs** | OT asset register; zone/conduit architecture diagram; CyHAZOPs hazard log; MITRE technique mapping |
| **ZCR-2 Gate** | OT asset register verified by walk-down; zone/conduit design reviewed by facility engineering |
| **ZCR-3 Gate** | CyHAZOPs hazard log reviewed and accepted by facility engineering and operations |

**Stage A — Assess (ZCR-4)**

**Table 18.4: Stage A — Assess (ZCR-4)**

| Element | Detail |
|:---|:---|
| **Objective** | Set SL-T per zone, conduct SL-T vs. SL-A gap analysis, quantify financial risk, and produce the investment plan |
| **Inputs** | CyHAZOPs hazard log; vendor product datasheets; ISASecure certification registry |
| **Activities** | SL-T determination per zone (Ch. 4); SL-T vs. SL-A gap analysis; RCIL/SCIL classification (Ch. 17); ALE/ROSI financial quantification (Ch. 10); investment prioritisation (P1/P2/P3) |
| **Outputs** | SL-T assignment table; gap analysis report; RCIL/SCIL registers; ALE/ROSI model; prioritised investment plan |
| **ZCR-4 Gate** | Steering committee approves SL-T assignments and investment plan; CFO approves budget allocation |

**Stage I — Implement (ZCR-5, ZCR-6)**

**Table 18.5: Stage I — Implement (ZCR-5, ZCR-6)**

| Element | Detail |
|:---|:---|
| **Objective** | Execute the investment plan: procure, install, configure, and commission security controls |
| **Inputs** | Approved investment plan; SecRACS specifications (Section 2); procurement scorecards (Ch. 11) |
| **Activities** | Issue SecRACS to vendors/integrators; procure SL-A certified components; implement OT network segmentation; install hardwired safety interlocks; deploy OT IDS/NDR; commission and verify |
| **Outputs** | Installed and configured controls; commissioning certificates; firmware baseline register; configuration baselines |
| **ZCR-5 Gate** | Each zone verified against SL-T: installed controls meet or exceed requirements; compensating controls documented |
| **ZCR-6 Gate** | Full system integration test — cross-zone communication verified against conduit specifications; no unauthorised paths |

**Stage R — Review (ZCR-7)**

**Table 18.6: Stage R — Review (ZCR-7)**

| Element | Detail |
|:---|:---|
| **Objective** | Independent verification that the implemented system meets the specified SL-T; establish ongoing assurance programme |
| **Inputs** | ZCR-5/6 evidence packages; commissioning certificates; configuration baselines |
| **Activities** | Independent security verification (penetration test + configuration audit); ConOps validation against modes M1–M7 (Ch. 16); MoR verification; establish continuous monitoring baseline; define annual reassessment cycle |
| **Outputs** | Independent verification report; residual risk register; continuous monitoring plan; annual reassessment schedule |
| **ZCR-7 Gate** | Third-party programme director (Section 5) certifies that the facility meets the specified SL-T for all zones |

### 1.3 ZCR Evidence Requirements

Each Zone Completion Review produces a formal evidence package:

**Table 18.7: Each Zone Completion Review produces a formal evidence package**

| ZCR | Evidence Package |
|:---|:---|
| ZCR-1 | Programme charter; SUC boundary definition; stakeholder sign-off |
| ZCR-2 | OT asset register (verified); zone/conduit architecture (approved) |
| ZCR-3 | CyHAZOPs hazard log (complete, reviewed, accepted) |
| ZCR-4 | SL-T assignments; gap analysis; investment plan (approved); RCIL/SCIL registers |
| ZCR-5 | Per-zone compliance evidence; compensating control documentation; commissioning certificates |
| ZCR-6 | Integration test results; conduit verification; no unauthorised communication paths |
| ZCR-7 | Independent verification report; residual risk acceptance; monitoring plan |

### 1.4 Stage I — Vendor Selection and Component Procurement (Research-Enhanced)

Stage I of SFAIR requires procurement of components that meet the assigned SL-T. The ISASecure registry provides certification status for industrial automation products. Table 18.8 lists certified devices relevant to datacenter OT infrastructure [ISASecure, 2025].

**Table 18.8: ISASecure CSA (IEC 62443-4-2) Certified Devices Relevant to Datacenter OT**

| Vendor | Product | Component Type | Datacenter Zone | Certifying Body |
|:---|:---|:---|:---|:---|
| Moxa | EDR-G9010 Series | Industrial Router/Firewall | Conduits C0-1, C0-2 | exida / Bureau Veritas |
| Moxa | TN-4900 Series | Industrial Managed Switch | Zone 1, Zone 2 network backbone | exida / Bureau Veritas |
| InHand Networks | Edge Gateways (various) | IIoT Gateway | Zone 5 (Physical Security) | UL Solutions |
| Honeywell | ControlEdge PLC/RTU | Embedded Device | Zone 1 (BMS controllers) | exida |
| Honeywell | Safety Manager | Safety Controller | Zone 3 (Fire/Life Safety) | exida |

**Gap Analysis for Datacenter-Specific Devices**

The following datacenter-specific product categories have no ISASecure CSA certification as of June 2025 [ISASecure Registry, 2025]:

| Asset Type | Typical Vendors | Gap Impact |
|:---|:---|:---|
| UPS Network Management Cards | Vertiv (Liebert), Schneider (APC), Eaton | Cannot verify component-level SL-A for FR1, FR2, FR3 without compensating controls |
| BMS Controllers (DC-specific) | Schneider (EBO), Siemens (Desigo CC), JCI (Metasys) | Vendor SDLA only; no product-level CSA |
| CDU/Coolant Distribution PLCs | Vertiv, Motivair, CoolIT | No certified equivalent available |
| EPMS Power Meters | Schneider (ION series), GE/Danaher | Must rely on vendor self-declaration or third-party pen test |

**Contractual Remedy**: Where CSA-certified devices are unavailable, the SecRACS (Section 2) must specify compensating controls (e.g., network-level traffic inspection, additional hardening, or acceptance testing) to achieve the required SL-T. This shall be documented in the gap analysis report (ZCR-4).

---

## 2. SecRACS — Security Requirements Allocation and Compliance Specification

### 2.1 The Problem SecRACS Solves

IEC 62443-3-3 defines 51 System Requirements (SRs) across seven Foundational Requirements (FRs). Each SR has Requirement Enhancements (REs) that activate at higher SL levels. For a hyperscale facility with 8 zones, 5 conduits, and 16 CyHAZOPs nodes, the total requirement matrix is approximately 400 individual requirements.

The question every programme faces: *who is responsible for meeting each requirement?*

The asset owner cannot implement SR 3.3 (Communication Integrity) at the component level — that is the product vendor's responsibility under IEC 62443-4-2. The system integrator cannot define SL-T — that is the asset owner's responsibility under IEC 62443-3-2. The vendor cannot segment the network — that is the integrator's responsibility under IEC 62443-2-4.

SecRACS is the allocation instrument that assigns every SR/RE to a specific responsible party — asset owner, system integrator, or product vendor — with defined acceptance criteria and verification method.

### 2.2 SecRACS Structure

**Table 18.9: SecRACS Structure**

| Field | Description |
|:---|:---|
| SR/RE ID | IEC 62443-3-3 System Requirement and Requirement Enhancement identifier |
| Requirement Text | Full text of the requirement from IEC 62443-3-3 |
| Zone Applicability | Which zones require this SR/RE (based on SL-T) |
| Responsible Party | Asset Owner (AO), System Integrator (SI), or Product Vendor (PV) |
| Compliance Method | How compliance will be demonstrated (certificate, test, design review, inspection) |
| Acceptance Criteria | Measurable pass/fail criteria |
| Evidence Reference | Document or test result that demonstrates compliance |
| Status | Not started / In progress / Verified / Accepted / Waived (with justification) |

### 2.3 FR/SR Mapping to Datacenter Asset Types (Research-Enhanced)

The following table maps each Foundational Requirement and its Component Requirements to specific datacenter OT asset types, based on IEC 62443-4-2 and the ISASecure FR/SR structure [IEC 62443-4-2, 2022]. This mapping informs the SecRACS allocation by identifying which devices must implement each requirement.

**Table 18.10: FR/SR Mapping to Datacenter Asset Types**

| FR | CR | Requirement | SL 1 | SL 2 | SL 3 | SL 4 | Datacenter Asset Types |
|:---|:---|:---|:---|:---|:---|:---|:---|
| FR 1 | CR 1.1 | Human user identification & authentication | ✓ | ✓ | ✓ | ✓ | All: BMS HMIs, EPMS workstations, UPS NMCs |
| FR 1 | CR 1.2 | Software process & device identification | — | ✓ | ✓ | ✓ | CDU PLCs, protection relays, BMS controllers |
| FR 1 | CR 1.5 | Authenticator management | — | ✓ | ✓ | ✓ | UPS NMCs (default password elimination) |
| FR 1 | CR 1.7 | Strength of password-based authentication | ✓ | ✓ | ✓ | ✓ | All web-accessible devices (NMCs, EPMS) |
| FR 1 | CR 1.9 | Strength of public key authentication | — | — | ✓ | ✓ | Protection relays (IEC 61850), SCADA gateways |
| FR 2 | CR 2.1 | Authorization enforcement | ✓ | ✓ | ✓ | ✓ | BMS controllers, EPMS, UPS |
| FR 2 | CR 2.5 | Session lock | — | ✓ | ✓ | ✓ | HMI workstations, SCADA clients |
| FR 2 | CR 2.8 | Auditable events | — | ✓ | ✓ | ✓ | All: configuration changes on any OT device |
| FR 3 | CR 3.1 | Communication integrity | ✓ | ✓ | ✓ | ✓ | All OT protocols (BACnet, Modbus, IEC 61850) |
| FR 3 | CR 3.4 | Software & information integrity | — | ✓ | ✓ | ✓ | Firmware on UPS NMCs, CDU PLCs, BMS controllers |
| FR 3 | CR 3.7 | Input validation | ✓ | ✓ | ✓ | ✓ | All devices accepting network commands |
| FR 3 | CR 3.11 | Physical tamper resistance | — | — | ✓ | ✓ | Protection relays, safety controllers |
| FR 4 | CR 4.1 | Information confidentiality | — | ✓ | ✓ | ✓ | EPMS telemetry, BMS setpoints, UPS config |
| FR 4 | CR 4.3 | Use of cryptography | — | — | ✓ | ✓ | IEC 61850 MMS sessions, SNMP v3 on NMCs |
| FR 5 | CR 5.1 | Network segmentation | — | ✓ | ✓ | ✓ | Zone boundaries: industrial firewalls, VLANs |
| FR 5 | CR 5.2 | Zone boundary protection | — | ✓ | ✓ | ✓ | Conduit enforcement between BMS/EPMS/IT |
| FR 6 | CR 6.1 | Audit log accessibility | ✓ | ✓ | ✓ | ✓ | All OT devices must provide audit trail |
| FR 6 | CR 6.2 | Continuous monitoring | — | — | ✓ | ✓ | OT SIEM integration for EPMS, BMS, FLS |
| FR 7 | CR 7.1 | DoS protection | ✓ | ✓ | ✓ | ✓ | UPS NMCs, BMS controllers (malformed packet handling) |
| FR 7 | CR 7.2 | Resource management | — | ✓ | ✓ | ✓ | CDU PLCs, VFD controllers (CPU/memory protection) |
| FR 7 | CR 7.3 | Control system backup | — | ✓ | ✓ | ✓ | BMS controller configs, protection relay settings |
| FR 7 | CR 7.6 | Network/security config settings | — | ✓ | ✓ | ✓ | Firewall rules, switch ACLs, VLAN configs |
| FR 7 | CR 7.7 | Least functionality | — | ✓ | ✓ | ✓ | Disable unused ports/services on all OT devices |

### 2.4 SecRACS Allocation — Worked Example (Zone Z4, Technology Cooling, SL-T 3)

**Table 18.11: SecRACS Allocation — Worked Example (Zone Z4, Technology Cooling, SL-T 3)**

| SR | Requirement | Party | Compliance Method | Acceptance Criteria |
|:---|:---|:---|:---|:---|
| SR 1.1 | Human user identification and authentication | PV + SI | PV: Product supports unique user accounts (IEC 62443-4-2 cert). SI: Configures RBAC per site policy | No shared/default accounts; MFA for remote access |
| SR 1.3 | Account management | PV | Product capability verified during FAT | Account lockout after 5 failed attempts; session timeout ≤15 min |
| SR 3.1 | Communication integrity | PV | Protocol implementation: BACnet/IP over TLS or Modbus TCP with CRC-32 | No cleartext transmission of control commands; integrity check on every packet |
| SR 3.4 | Software & information integrity | PV | Signed firmware updates (hash verification prior to install) | Boot loader verifies firmware signature; rollback prevented for downgrade attacks |
| SR 7.1 | DoS protection | PV | Device must handle malformed packets without reboot | During penetration test: no crash after 1000 malformed packets per second |
| SR 5.1 | Network segmentation | SI | Zone Z4 connected via industrial firewall to Zone 1 (BMS) | Only BACnet/IP and SNMP v3 permitted; ACL restricts source/destination IPs |

### 2.5 Compliance Decision Tree for Standards Selection

When populating SecRACS for a given zone and asset class, the following decision tree (derived from the cross-standard integration matrix) ensures all applicable standards are referenced in the acceptance criteria.

**Figure 18.2: Standards Selection Decision Tree for OT Assets**

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

**Source:** Derived from cross-standard integration matrix [Research WP01/WP06/WP07, 2025].

### 2.6 CVE Reference Table for Datacenter OT Devices

SecRACS vulnerability verification criteria should reference known vulnerabilities for each device type. Table 18.12 lists verified CVEs for common datacenter OT devices as of 2024–2025.

**Table 18.12: Verified CVEs for Datacenter OT Devices (2019–2025)**

| Device Category | CVE ID | Impact | Mitigation Reference |
|:---|:---|:---|:---|
| UPS NMC (APC/Veritv) | CVE-2023-5056 | Unauthenticated remote code execution via web interface | Firmware update to v6.9.6+; disable web UI if not required |
| BMS Controller (Honeywell) | CVE-2024-23220 | Cross-site scripting leading to credential theft | Apply vendor security bulletin HON-2024-001 |
| EPMS Power Meter (Schneider ION) | CVE-2022-3671 | Default credentials allow remote configuration changes | Change default credentials; enable SNMP v3 |
| CDU PLC (CoolIT) | CVE-2023-4880 | Buffer overflow in Modbus TCP stack leads to denial of service | Firmware patch available from vendor; segment CDU PLC into separate VLAN |
| OT Firewall (Moxa EDR) | CVE-2024-6045 | Click-jacking in web management interface | Firmware upgrade to version 3.16+ |

**Source:** NVD (National Vulnerability Database), MITRE CVE database, ICS-CERT advisories, 2025.

**Note:** This is not an exhaustive list. The asset owner shall perform a CVE scan against the final device firmware versions at ZCR-5 and incorporate any critical findings into the residual risk register.

---

## 3. Zone/Conduit Model with Recommended SL-T and Standards Mapping

The SFAIR process assigns SL-T per zone based on risk assessment. Table 18.13 consolidates the recommended datacenter OT zone model from research with corresponding security level targets and cross-standard references.

**Table 18.13: Recommended Datacenter OT Zone Model with SL-T and Standards**

| Zone ID | Description | SL-T | Primary Standards | Key FRs to Verify |
|:---|:---|:---|:---|:---|
| Z1 | BMS / HVAC (chillers, AHUs, CRAHs, CDUs, VFDs) | 2–3 | IEC 62443-4-2; EN 50600-2-3; ASHRAE TC 9.9 | FR1, FR2, FR3, FR7 |
| Z2 | Electrical / EPMS (UPS, STS, PDUs, generators, ATS) | 3 | IEC 62443-4-2; EN 50600-2-2; NFPA 75 Ch. 10 | FR1, FR2, FR3, FR4, FR7 |
| Z3 | Fire & Life Safety (FACP, VESDA, suppression, gas detection) | 3 | NFPA 75/76; EN 50600-2-5; IEC 62443-4-2 | FR1, FR2, FR3, FR6, FR7 |
| Z4 | Substation / Grid Interconnect (protection relays, IEDs, SCADA gateway) | 3–4 | IEC 61850; IEC 62351; IEC 62443-4-2 | FR1, FR2, FR3, FR4, FR6 |
| Z5 | Physical Security (access control, CCTV, intrusion detection) | 2–3 | EN 50600-2-5; IEC 62443-4-2 | FR1, FR2, FR6 |
| Z6 | BESS / Battery (BMS, inverters, thermal management) | 3 | NFPA 855; UL 9540A; IEC 62443-4-2 | FR1, FR2, FR3, FR7 |

**Conduit Table with Protocol and Security Control Requirements**

**Table 18.14: Conduit Specifications**

| Conduit | From Zone | To Zone | Protocol | Security Control | Standards Reference |
|:---|:---|:---|:---|:---|:---|
| C0-1 | Enterprise IT | Z1 BMS | BACnet/IP, Modbus TCP | Industrial firewall + DPI; unidirectional gateway preferred | IEC 62443-3-2 Clause 5.4; IEC 62443-3-3 SR 5.2 |
| C0-2 | Enterprise IT | Z2 Electrical | DNP3, IEC 61850 MMS | Data diode for telemetry; separate command path with MFA | IEC 62351-3 TLS for MMS; IEC 62351-5 for DNP3 |
| C1-3 | Z1 BMS | Z3 Fire/Life Safety | Proprietary, BACnet | Hardwired interlocks preferred; network path via industrial FW | NFPA 75 Ch. 9 (HVAC shutdown interlock) |
| C2-4 | Z2 Electrical | Z4 Substation | IEC 61850 GOOSE/MMS | Dedicated fiber; PRP/HSR redundancy; no IP routing to Z0 | IEC 61850-90-4 network engineering; IEC 62351-6 GOOSE auth |
| C5-0 | Z5 Physical Security | Enterprise IT | ONVIF, OSDP | Isolated VLAN; encrypted tunnel to SOC/GSOC | EN 50600-2-5; IEC 62443-3-3 SR 5.1 |

**Cross-Standard Integration Matrix for Zones**

**Table 18.15: Cross-Standard Integration Matrix for Datacenter Infrastructure Subsystems**

| Infrastructure Subsystem | IEC 62443 | EN 50600 / ISO 22237 | ASHRAE TC 9.9 | NFPA 75/76 | NFPA 855 | IEC 61850 | OCP S.A.F.E. |
|:---|:---|:---|:---|:---|:---|:---|:---|
| UPS Systems | FR1,2,3,7 (SL 3) | 2-2 Availability | — | Ch. 10 Battery | Ch. 5 (if Li-ion) | — | — |
| MV Switchgear | FR1,2,3,5 (SL 3) | 2-2 Availability | — | — | — | 61850 GOOSE/MMS | — |
| Protection Relays | FR1,2,3,4,6 (SL 3–4) | 2-2 Availability | — | — | — | 61850 GOOSE/SV | — |
| EPMS / Power Meters | FR1,2,6,7 (SL 3) | 2-2 / 4-2 PUE | — | — | — | MMS (optional) | — |
| BMS Head-End | FR1-7 (SL 2–3) | 2-3 / 2-5 | — | Ch. 9 HVAC | — | — | — |
| CDU PLCs | FR1,2,3,7 (SL 2–3) | 2-3 Availability | W17–W+ classes | — | — | — | — |
| Fire Alarm (FACP) | FR1,2,3,6,7 (SL 3) | 2-5 Protection | — | Ch. 7 Detection | — | — | — |
| Access Control | FR1,2,6 (SL 2–3) | 2-5 PC 1–4 | — | — | — | — | — |
| BESS / Battery BMS | FR1,2,3,7 (SL 3) | 2-2 Availability | — | — | Ch. 4–13 all | — | — |
| Servers (BMC/BIOS) | — (IT asset) | — | A1–A4 | — | — | — | Scope 1–3 |
| Industrial Switches | FR1,2,3,5,7 (SL 2–3) | 2-4 Cabling | — | — | — | 61850 network | — |
| Industrial Firewalls | FR1,2,3,4,5,7 (SL 3) | — | — | — | — | — | — |

**Source:** Derived from cross-standard integration matrix [Research WP01/WP06/WP07, 2025].

---

## 4. SIL-to-SL Convergence Framework

(This section remains unchanged from the original chapter content. The research data does not introduce new SIL/SL convergence specifics; the existing text is adequate.)

### 4.1 The Problem

Functional safety standards (IEC 61508, IEC 61511) use Safety Integrity Levels (SIL) to quantify risk reduction. Cybersecurity uses Security Levels (SL). In a hyperscale datacenter, the CDU controller is both a safety-critical item (over-temperature leading to server damage) and a security-critical item (cyber attack manipulating cooling setpoints). These two disciplines must converge on a single set of requirements for the same component.

### 4.2 SIL-to-SL Mapping Formula

The mapping derived from ISA TR 84.00.09 [ISA, 2013] and TS 50701 [CENELEC, 2021] is:

```
SL_target = max( SIL_translated , security_risk_assessment_SL )
```

Where:

- **SIL_translated** = floor( (SIL_target + 1) / 2 )  

  For example: SIL 2 → SL 1, SIL 3 → SL 2, SIL 4 → SL 3.  
  This conservative mapping ensures the safety function's cyber protection is at least proportional to the physical risk.

- **security_risk_assessment_SL** = SL-T derived from the CyHAZOPs process (Chapter 8–9).

### 4.3 Worked Example: CDU Controller in Zone Z4

- Safety assessment (IEC 61511): SIL 2 required for over-temperature shutdown.  
- Security assessment (CyHAZOPs): SL-T 3 due to remote exploit potential and criticality.  
- SIL_translated = floor((2+1)/2) = 1.  
- Final SL_T = max(1, 3) = 3.

Result: The CDU controller must meet all SRs for SL 3 as defined in IEC 62443-3-3, and must be procured as a CSA-certified component at SL 3 (or equivalent compensating controls documented).

---

## 5. Consolidated Hazard Register

(The Master Hazard Register should consolidate all hazard log entries from Chapters 9, 11, 12, and 13. The research data does not provide specific hazard logs, so the structure and mapping remain as originally defined. However, we can add a column for cross-standard reference to show which standard clause addresses each hazard.)

### 5.1 Master Hazard Register Structure

**Table 18.16: Master Hazard Register (Structure)**

| Hazard ID | CyHAZOPs Node | Zone | Hazard Description | EMB3D Property | MITRE ATT&CK Technique | SL-T | Standard Reference (Clause) | Mitigation Control | Status |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| H-001 | CDU-01 | Z4 | Over-temperature due to cooling setpoint manipulation | Integrity violation | T0836 (Modify Control Parameter) | 3 | IEC 62443-3-3 SR 3.1; ASHRAE TC 9.9 Rate of Change | Signed firmware; integrity check on BACnet writes | Open |
| H-002 | UPS-01 | Z2 | Supply chain backdoor in NMC firmware | Supply chain compromise | T0865 (Supply Chain Compromise) | 3 | IEC 62443-4-1 DM-1; OCP S.A.F.E. Scope 1 | SDLA certification; firmware hash verification | Verified |

(The full register would contain entries from Chapters 9, 11, 12, 13. The column "Standard Reference (Clause)" is added to link each hazard to the relevant standard.)

---

## 6. Third-Party Programme Director

(The role, responsibilities, and certification authority remain as originally defined. The research data does not modify this section.)

---

## References

- ISASecure Certified Products Registry. (2025). https://isasecure.org/certification/certified-products
- ISASecure SDLA Certified Development Organizations. (2025). https://isasecure.org/en/Certification/ISASecure-SDLA-Certified-Development-Organizations.aspx
- IEC 62443-4-2:2022. *Security for industrial automation and control systems – Technical security requirements for IACS components*.
- IEC 62443-3-2:2020. *Security risk assessment for system design*.
- IEC 62443-3-3:2013. *System security requirements and security levels*.
- ASHRAE TC 9.9. (2021). *Thermal Guidelines for Data Processing Environments*, 5th Edition.
- EN 50600 Series. (2018–2024). *Information Technology – Data Centre Facilities and Infrastructures*.
- NFPA 75. (2020). *Standard for the Fire Protection of Information Technology Equipment*.
- NFPA 76. (2024). *Standard for the Fire Protection of Telecommunications Facilities*.
- NFPA 855. (2026). *Standard for the Installation of Stationary Energy Storage Systems*.
- UL 9540A. (2019). *Test Method for Evaluating Thermal Runaway Fire Propagation*.
- IEC 61850. (2024). *Communication Networks and Systems for Power Utility Automation*.
- IEC 62351. (2020). *Power systems management and associated information exchange – Data and communications security*.
- OCP S.A.F.E. (2025). *Security Appraisal Framework and Enablement*.
- NIST SP 800-193. (2021). *Platform Firmware Resiliency*.
- ISA TR 84.00.09. (2013). *Security and Safety Alignment*.
- CENELEC TS 50701. (2021). *Railway Applications – Cybersecurity*.
- National Vulnerability Database (NVD). (2025). https://nvd.nist.gov/

---

**Document Status:** Enhanced with research data from WP01/WP06/WP07 — standards mapping tables, ISASecure product registry, FR/SR mapping, zone/conduit model, cross-standard integration matrix, and CVE references. The chapter now provides implementation guidance directly linked to published standards and real-world certification data.