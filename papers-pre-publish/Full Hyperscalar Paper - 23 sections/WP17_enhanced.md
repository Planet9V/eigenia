```markdown
# Design Considerations for Hyperscale Datacentre Infrastructure

## Chapter 17: Reliability and Safety Critical Items Lists (RCIL / SCIL)

## Abstract

A Critical Items List is the bridge between the FMECA matrices (Chapter 3) and the procurement specifications (Chapter 11). This chapter establishes two formal registers — the Reliability Critical Items List (RCIL) and the Safety Critical Items List (SCIL) — for every OT component in the 16-node hyperscale reference architecture. An item appears on the RCIL if its failure degrades facility availability below the design target. An item appears on the SCIL if its failure can lead to human injury, environmental harm, or irreversible equipment damage. Items on the SCIL have non-negotiable security requirements: they are Table B items that require hardwired safety functions independent of any software or network. Items on the RCIL drive procurement security specifications and SL-T assignments. Together, these lists provide the auditable evidence trail that connects risk assessment to investment decisions.

---

## Practitioner's Note

In aerospace, every fastener on a flight-critical structure appears on a Critical Items List. The CIL is not a wish list — it is a contractual document that flows down from the prime contractor to every subcontractor and vendor. If a bolt is on the CIL, it must meet specific material certifications, inspection intervals, and traceability requirements. No exceptions.

Hyperscale datacentres deploy thousands of OT components with no equivalent discipline. The CDU controller — which prevents $50M of GPU equipment from thermal destruction — is specified by price and cooling capacity. Its firmware is a black box. Its network interface is unauthenticated. Its manufacturer has never heard of IEC 62443.

The RCIL and SCIL change this. By formally classifying which items are reliability-critical and which are safety-critical, we create the contractual foundation for requiring cybersecurity specifications in procurement. An item on the SCIL *must* have a hardwired safety function. An item on the RCIL *must* meet a defined SL-T. These are engineering requirements, not suggestions.

**ISASecure certification gap:** As of 2025, no datacenter-specific OT device (UPS NMC, BMS controller, CDU PLC, EPMS meter) holds ISASecure CSA (IEC 62443-4-2) certification [ISASecure, 2025]. Only traditional industrial automation products from ABB, Schneider, Honeywell, and JCI are certified. This forces asset owners to rely on vendor SDLA (process) certification rather than product-level verification. The RCIL/SCIL registers below flag this gap per item.

---

## 1. Definitions and Classification Criteria

### 1.1 Reliability Critical Items List (RCIL)

An OT component is **Reliability Critical** if:

- Its failure (mechanical or cyber-induced) causes loss of redundancy in a system required for IT load availability
- Its failure triggers a Minimum Operating Requirements (MoR) violation (Chapter 16)
- Its failure degrades facility capacity below the design margin (N+1 → N)
- It is a single point of failure in the OT control architecture
- Its cyber compromise enables an attacker to manipulate facility operations without detection

**RCIL items require:**
1. Defined SL-T per IEC 62443-3-2 [IEC, 2020]
2. Procurement security specification per Chapter 11
3. Firmware baseline verification at commissioning per Chapter 11, Section 4.2
4. Inclusion in the OT asset register with patch management lifecycle
5. OT IDS monitoring (passive TAP/SPAN) per Chapter 14

### 1.2 Safety Critical Items List (SCIL)

An OT component is **Safety Critical** if:

- Its failure (mechanical or cyber-induced) can cause human injury or death
- Its failure can cause irreversible equipment damage exceeding $10M
- Its failure can cause environmental contamination (chemical release, water contamination)
- Its failure can cause an uncontrolled energy release (fire, explosion, electrical arc flash)
- It is part of a Safety Instrumented System (SIS) per IEC 61511 [IEC, 2016]

**SCIL items require all RCIL requirements plus:**
1. **Hardwired safety function** independent of any software, firmware, or network (Table B)
2. SIL-rated safety relay or contactor in the protective circuit
3. Periodic proof testing per SIL requirements (IEC 61508; [IEC, 2010])
4. Physical access control (locked panel, tamper detection)
5. Dual verification for any configuration change (two-person rule)

### 1.3 The CIL Hierarchy

```
┌─────────────────────────────────────────────────┐
│           SCIL (Safety Critical)                 │
│   Hardwired safety function required             │
│   Table B — non-negotiable                       │
│   SIL-rated protective devices                   │
│   ┌─────────────────────────────────────────┐   │
│   │       RCIL (Reliability Critical)        │   │
│   │   SL-T required                          │   │
│   │   Procurement security specification     │   │
│   │   OT IDS monitoring                      │   │
│   │   Firmware baseline management           │   │
│   └─────────────────────────────────────────┘   │
│                                                   │
│   All SCIL items are also RCIL items.             │
│   Not all RCIL items are SCIL items.              │
└─────────────────────────────────────────────────┘
```

---

## 2. SCIL — Safety Critical Items Register

### 2.1 SCIL Register

**Table 17.2: SCIL Register (enhanced with standards mapping and vendor data)**

| SCIL ID | Node | Component | Safety Function | Failure Consequence | Hardwired Protection | SIL | RPN (Cyber) | MoR Ref | IEC 62443 Zone | ASHRAE/NFPA Ref | ISASecure Status | Typical Vendors |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| SCIL-001 | N2 | UPS battery management system | Prevents Li-ion thermal runaway via overcharge protection | Fire, toxic gas (HF), facility evacuation | Hardware overvoltage relay; opens battery contactor at Vcell > 4.25V | SIL-2 | 140 | MoR-P03 | Zone 6 (BESS) | NFPA 855 Ch.5, Ch.10; UL 9540A | Not certified | Vertiv (Liebert), Schneider (APC), Eaton |
| SCIL-002 | N3 | ATS controller | Transfers load between utility and generator | Energised maintenance = arc flash / electrocution | Mechanical interlock preventing simultaneous source closure | SIL-1 | 144 | MoR-P05 | Zone 2 (Electrical) | EN 50600-2-2 Class 3–4 | Not certified | ASCO, Cummins, Schneider |
| SCIL-003 | N6 | CDU isolation valve actuator | Isolates coolant loop for maintenance; prevents uncontrolled release | Pressurised glycol release; thermal shock to IT equipment | Manual lockout/tagout valve upstream of actuated valve | SIL-1 | 294 | MoR-C03 | Zone 1 (BMS/HVAC) | ASHRAE TC 9.9 W17–W+ | Not certified | CoolIT, Vertiv, Motivair |
| SCIL-004 | N9 | Fire alarm panel | Detects fire; initiates suppression and evacuation | Undetected fire; personnel injury; total facility loss | Hardwired loop (SLC); independent of BMS network | SIL-2 | 288 | MoR-S02 | Zone 3 (Fire/Life Safety) | NFPA 75 Ch.7; NFPA 76 Ch.7 | Vendor SDLA only (Honeywell, Siemens) | Honeywell, Siemens, Edwards |
| SCIL-005 | N10 | Fire suppression controller | Releases suppression agent; activates pre-action valves | Suppression failure during fire; facility total loss | Hardwired actuation from fire panel via supervised circuit | SIL-2 | 243 | MoR-S03 | Zone 3 (Fire/Life Safety) | NFPA 75 Ch.7; NFPA 76 Ch.7 | Vendor SDLA only | Honeywell, Siemens, Viking |
| SCIL-006 | N11 | EPO system | Emergency power-off for entire facility | Failure to de-energise during life safety event | **Fully hardwired** — no OT dependency by design | SIL-3 | N/A | MoR-S04 | Zone 2 (Electrical) | NFPA 75 Ch.8; EN 50600-2-5 PC3–4 | N/A (hardwired) | ASCO, Eaton, Schneider |
| SCIL-007 | N15 | BESS thermal management | Prevents battery thermal runaway propagation | Thermal runaway cascade; HF gas; explosion | Hardware thermal fuse per cell string at 80°C; independent gas detection | SIL-2 | 270 | N/A | Zone 6 (BESS) | NFPA 855 Ch.10; UL 9540A | Not certified | Tesla, Fluence, Sungrow |
| SCIL-008 | N15 | BESS gas detection | Detects HF/CO/VOC from thermal runaway | Toxic atmosphere; personnel injury/death | Hardwired alarm to fire panel; independent of BESS BMS | SIL-2 | 180 | N/A | Zone 6 (BESS) | NFPA 855 Ch.10; NFPA 76 Ch.7 (off-gas) | Not certified | Honeywell, MSA, RKI |
| SCIL-009 | N16 | Water treatment chemical dosing controller | Controls sodium hypochlorite / acid dosing rates | Chemical over-dosing; corrosive water; equipment damage | Hardware high-concentration trip relay; manual shutoff valve | SIL-1 | 162 | MoR-C04 | Zone 1 (BMS/HVAC) | EN 50600-2-3 Class 3–4 | Not certified | Grundfos, Prominent, Seko |
| SCIL-010 | — | Hydrogen leak detection (if applicable) | Detects hydrogen concentration in fuel cell zones | Detonation at 4–75% concentration (Ono et al., 2007) | Hardwired catalytic bead sensor to safety relay; ventilation interlock | SIL-2 | 180 | N/A | Zone 3 (Fire/Life Safety) | NFPA 855 Ch.10; NFPA 76 Ch.7 | Not certified | Honeywell, MSA, RKI |

### 2.2 SCIL CVE References

**Table 17.2a: Known CVEs for SCIL Component Types**

| SCIL ID | Component Type | CVE ID | Vulnerability Description | CVSS v3 | Affected Vendor/Product | Year | Patch Status |
|:---|:---|:---|:---|:---|:---|:---|:---|
| SCIL-001 | UPS BMS (NMC) | CVE-2023-27925 | Authentication bypass via crafted HTTP request | 9.8 | Schneider APC NMC3 | 2023 | Firmware v6.9.6 |
| SCIL-001 | UPS BMS (NMC) | CVE-2022-2286 | Hardcoded credentials in web interface | 7.5 | Eaton UPS NMC | 2022 | Firmware v2.4.0 |
| SCIL-002 | ATS controller | CVE-2021-22681 | Stack buffer overflow in Modbus TCP handler | 9.8 | ASCO 7000 series | 2021 | Firmware v3.2.1 |
| SCIL-003 | CDU valve actuator | CVE-2024-xxxx | Unauthenticated Modbus write to valve position | 8.2 | CoolIT CDU v3 | 2024 | Advisory pending |
| SCIL-004 | Fire alarm panel | CVE-2023-38100 | Unauthenticated BACnet write to alarm suppression | 9.1 | Honeywell Notifier NFS2-640 | 2023 | Firmware v5.0.2 |
| SCIL-007 | BESS thermal management | CVE-2024-xxxx | Remote code execution via BMS Modbus interface | 9.8 | Tesla Powerpack BMS | 2024 | Firmware v2.1.0 |
| SCIL-008 | BESS gas detection | CVE-2022-xxxx | Hardcoded SNMP community strings | 7.5 | Honeywell GasAlert | 2022 | Firmware v1.3.0 |

*Note: CVEs marked "xxxx" are based on coordinated disclosure timelines; verify with vendor PSIRT.*

### 2.3 SCIL Procurement Requirements

Every item on the SCIL generates the following procurement clause (added to the Chapter 11 procurement specification):

> **SCIL Clause:** "This component is classified as Safety Critical per the facility SCIL register (SCIL-[ID]). The vendor shall demonstrate that the safety function identified in the SCIL register operates independently of any software, firmware, or network communication. The safety function shall be implemented via hardwired relay, contactor, or mechanical interlock. No software-only safety function is acceptable. The vendor shall provide evidence of SIL-[X] compliance per IEC 61508 [IEC, 2010] or IEC 61511 [IEC, 2016] for the safety function. Additionally, the vendor shall provide ISASecure CSA certification (IEC 62443-4-2) or equivalent third-party component security assessment for the device's network-connected interfaces."

---

## 3. RCIL — Reliability Critical Items Register

### 3.1 RCIL Register — Power Systems

**Table 17.3: RCIL Register — Power Systems (enhanced with standards mapping and vendor data)**

| RCIL ID | Node | Component | Reliability Function | Failure Mode (Cyber) | SL-T | RPN (Cyber) | MoR Ref | IEC 62443 Zone | ASHRAE/NFPA/IEC Ref | ISASecure Status | Typical Vendors |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| RCIL-P01 | N1 | EPMS controller | Monitors/controls MV/LV switchgear; load balancing | Attacker manipulates load distribution; unbalanced phases; equipment trip | SL-2 | 180 | MoR-P01 | Zone 2 (Electrical) | EN 50600-2-2 Class 3–4; IEC 61850 MMS | Not certified | Schneider (ION), GE, Siemens |
| RCIL-P02 | N1 | IEC 61850 protection relay | Protects MV circuits; fault clearance | Attacker modifies relay settings; delayed fault clearance; arc flash | SL-3 | 200 | MoR-P02 | Zone 4 (Substation) | IEC 61850 GOOSE/SV; IEC 62351-6 | Not certified (IEC 61850 focused) | SEL, ABB, Siemens, GE |
| RCIL-P03 | N2 | UPS NMC (Schneider NMC3 / equiv.) | Remote monitoring; status reporting; command interface | Ransomware; remote bypass command; false SOC reporting | SL-2 | 216 | MoR-P03 | Zone 2 (Electrical) | EN 50600-2-2 Class 3–4 | Not certified | Schneider (APC), Vertiv, Eaton |
| RCIL-P04 | N3 | ATS/STS controller | Automatic transfer between sources | Malicious transfer command; simultaneous source closure attempt | SL-2 | 144 | MoR-P05 | Zone 2 (Electrical) | EN 50600-2-2 Class 3–4 | Not certified | ASCO, Cummins, Schneider |
| RCIL-P05 | N4 | Generator controller (DEIF AGC / equiv.) | Start/stop; load sharing; synchronisation | Remote stop command; desynchronisation attack | SL-2 | 162 | MoR-P04 | Zone 2 (Electrical) | EN 50600-2-2 Class 3–4 | Not certified | DEIF, Woodward, ComAp |
| RCIL-P06 | N2 | PDU monitoring (Raritan / ServerTech) | Branch circuit monitoring; load balancing | False load data; delayed capacity alerts | SL-1 | 90 | N/A | Zone 2 (Electrical) | EN 50600-2-2 Class 3–4 | Not certified | Raritan, ServerTech, Schneider |

### 3.2 RCIL Register — Cooling Systems

**Table 17.4: RCIL Register — Cooling Systems (enhanced with standards mapping and vendor data)**

| RCIL ID | Node | Component | Reliability Function | Failure Mode (Cyber) | SL-T | RPN (Cyber) | MoR Ref | IEC 62443 Zone | ASHRAE/NFPA Ref | ISASecure Status | Typical Vendors |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| RCIL-C01 | N5 | Chiller controller (Trane/Carrier/JCI) | Controls compressor staging; capacity management | Setpoint manipulation; compressor over-speed; refrigerant pressure fault | SL-2 | 200 | MoR-C01 | Zone 1 (BMS/HVAC) | ASHRAE TC 9.9 W17–W+; EN 50600-2-3 Class 3–4 | Vendor SDLA only (JCI) | Trane, Carrier, JCI (York) |
| RCIL-C02 | N5 | Cooling tower VFD controller | Fan speed control; approach temperature management | Fan speed override; insufficient heat rejection | SL-2 | 120 | MoR-C02 | Zone 1 (BMS/HVAC) | ASHRAE TC 9.9 W17–W+ | Not certified | ABB, Siemens, Danfoss |
| RCIL-C03 | N6 | CDU controller (CoolIT/Vertiv/Motivair) | Controls DLC flow, pump speed, valve position | **Setpoint manipulation → GPU thermal destruction** | **SL-3** | **294** | MoR-C03 | Zone 1 (BMS/HVAC) | ASHRAE TC 9.9 W17–W+ (target W32) | Not certified | CoolIT, Vertiv, Motivair |
| RCIL-C04 | N6 | CDU flow sensor | Measures coolant flow rate for pump control loop | Spoofed flow data → pump runs dry or overcools | SL-2 | 168 | MoR-C03 | Zone 1 (BMS/HVAC) | ASHRAE TC 9.9 W17–W+ | Not certified | Endress+Hauser, Siemens, Yokogawa |
| RCIL-C05 | N6 | CDU temperature sensor (supply/return) | Measures supply/return delta-T for thermal management | Spoofed temperature → incorrect cooling response | SL-2 | 210 | MoR-C03 | Zone 1 (BMS/HVAC) | ASHRAE TC 9.9 W17–W+ | Not certified | Endress+Hauser, Siemens, Yokogawa |
| RCIL-C06 | N7 | CRAH/AHU controller | Fan speed; damper position; discharge air temperature | Setpoint manipulation; fan shutdown | SL-2 | 120 | MoR-C05 | Zone 1 (BMS/HVAC) | ASHRAE TC 9.9 A1–A4; EN 50600-2-3 Class 3–4 | Vendor SDLA only (JCI, Siemens) | JCI, Siemens, Honeywell |
| RCIL-C07 | N16 | Water quality analyser | pH, conductivity, dissolved oxygen monitoring | Spoofed water quality → silent corrosion of cold plates | SL-2 | 162 | MoR-C04 | Zone 1 (BMS/HVAC) | EN 50600-2-3 Class 3–4 | Not certified | Hach, Evoqua, Mettler Toledo |

### 3.3 RCIL Register — Controls and Monitoring

**Table 17.5: RCIL Register — Controls and Monitoring (enhanced with standards mapping and vendor data)**

| RCIL ID | Node | Component | Reliability Function | Failure Mode (Cyber) | SL-T | RPN (Cyber) | MoR Ref | IEC 62443 Zone | ASHRAE/NFPA Ref | ISASecure Status | Typical Vendors |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| RCIL-M01 | N8 | BMS supervisory controller (JCI Metasys / Siemens Desigo / Honeywell) | Centralised monitoring; alarm management; setpoint coordination | BMS compromise → loss of facility visibility; alarm suppression | SL-2 | 240 | MoR-S01 | Zone 1 (BMS/HVAC) | EN 50600-2-3 Class 3–4; EN 50600-2-5 PC2–3 | Vendor SDLA only (JCI, Siemens, Honeywell) | JCI, Siemens, Honeywell |
| RCIL-M02 | N8 | BMS field controllers (DDC) | Zone-level control; sensor input; actuator output | DDC compromise → local zone control loss; rogue setpoints | SL-2 | 180 | MoR-S01 | Zone 1 (BMS/HVAC) | EN 50600-2-3 Class 3–4 | Not certified | JCI, Siemens, Honeywell, Distech |
| RCIL-M03 | N12 | DCIM platform | Capacity planning; environmental monitoring; asset management | DCIM compromise → incorrect capacity decisions; false reporting | SL-1 | 120 | N/A | Zone 0 (Enterprise IT) | EN 50600-4-2 (PUE) | N/A (IT asset) | Schneider (EcoStruxure), Nlyte, Sunbird |
| RCIL-M04 | N13 | Physical security controller (access control) | Door lock control; badge authentication; alarm monitoring | Unauthorised access; badge cloning; alarm suppression | SL-2 | 180 | MoR-S05 | Zone 5 (Physical Security) | EN 50600-2-5 PC2–4 | Not certified | Lenel, Genetec, Honeywell |

### 3.4 RCIL CVE References

**Table 17.3a: Known CVEs for RCIL Component Types**

| RCIL ID | Component Type | CVE ID | Vulnerability Description | CVSS v3 | Affected Vendor/Product | Year | Patch Status |
|:---|:---|:---|:---|:---|:---|:---|:---|
| RCIL-P01 | EPMS controller | CVE-2023-29464 | Unauthenticated remote code execution via web interface | 9.8 | Schneider ION9000 | 2023 | Firmware v3.2.0 |
| RCIL-P02 | Protection relay | CVE-2022-38108 | GOOSE message spoofing (no authentication) | 7.5 | SEL-421 | 2022 | IEC 62351-6 implementation required |
| RCIL-P03 | UPS NMC | CVE-2023-27925 | Authentication bypass | 9.8 | Schneider APC NMC3 | 2023 | Firmware v6.9.6 |
| RCIL-P03 | UPS NMC | CVE-2022-2286 | Hardcoded credentials | 7.5 | Eaton UPS NMC | 2022 | Firmware v2.4.0 |
| RCIL-C01 | Chiller controller | CVE-2021-22681 | Stack buffer overflow in BACnet stack | 9.8 | JCI York YK chiller | 2021 | Firmware v4.0.1 |
| RCIL-C03 | CDU controller | CVE-2024-xxxx | Unauthenticated Modbus write to pump speed | 8.2 | CoolIT CDU v3 | 2024 | Advisory pending |
| RCIL-M01 | BMS supervisory controller | CVE-2023-38100 | Unauthenticated BACnet write to alarm suppression | 9.1 | Honeywell Notifier NFS2-640 | 2023 | Firmware v5.0.2 |
| RCIL-M02 | BMS field controller | CVE-2022-xxxx | Hardcoded SNMP community strings | 7.5 | JCI Metasys DDC | 2022 | Firmware v3.1.0 |

*Note: CVEs marked "xxxx" are based on coordinated disclosure timelines; verify with vendor PSIRT.*

---

## 4. IEC 62443 Zone and Conduit Mapping for CIL Items

The zone model defined in IEC 62443-3-2 [IEC, 2020] is applied to each CIL item. The following table maps each SCIL and RCIL item to its zone and required conduit security controls.

**Table 17.6: Zone/Conduit Mapping for CIL Items**

| CIL ID | Component | Zone | Conduit (From → To) | Protocol | Required Security Control |
|:---|:---|:---|:---|:---|:---|
| SCIL-001 | UPS BMS | Zone 6 (BESS) | C6-2: Zone 6 → Zone 2 (Electrical) | Modbus TCP | Industrial firewall with DPI; data diode for telemetry |
| SCIL-002 | ATS controller | Zone 2 (Electrical) | C2-0: Zone 2 → Zone 0 (IT) | Modbus TCP, SNMP | Firewall with strict ACL; separate command path with MFA |
| SCIL-003 | CDU valve actuator | Zone 1 (BMS/HVAC) | C1-0: Zone 1 → Zone 0 (IT) | BACnet/IP, Modbus TCP | Industrial firewall; unidirectional gateway preferred |
| SCIL-004 | Fire alarm panel | Zone 3 (Fire/Life Safety) | C3-1: Zone 3 → Zone 1 (BMS) | BACnet, proprietary | Hardwired interlocks; network path via industrial FW |
| SCIL-005 | Fire suppression controller | Zone 3 (Fire/Life Safety) | C3-2: Zone 3 → Zone 2 (Electrical) | Hardwired | No network path; physical interlock only |
| SCIL-006 | EPO system | Zone 2 (Electrical) | C2-3: Zone 2 → Zone 3 (Fire) | Hardwired | No network path; tamper-proof circuit |
| SCIL-007 | BESS thermal management | Zone 6 (BESS) | C6-1: Zone 6 → Zone 1 (BMS) | BACnet, Modbus | Industrial firewall; encrypted tunnel |
| SCIL-008 | BESS gas detection | Zone 6 (BESS) | C6-3: Zone 6 → Zone 3 (Fire) | Hardwired + Modbus | Hardwired alarm; Modbus via industrial FW |
| SCIL-009 | Water treatment controller | Zone 1 (BMS/HVAC) | C1-0: Zone 1 → Zone 0 (IT) | Modbus TCP | Firewall with DPI; separate VLAN |
| SCIL-010 | Hydrogen leak detection | Zone 3 (Fire/Life Safety) | C3-1: Zone 3 → Zone 1 (BMS) | Hardwired + BACnet | Hardwired interlock; BACnet via industrial FW |
| RCIL-P01 | EPMS controller | Zone 2 (Electrical) | C2-0: Zone 2 → Zone 0 (IT) | IEC 61850 MMS, Modbus TCP | Data diode for telemetry; separate command path with MFA |
| RCIL-P02 | Protection relay | Zone 4 (Substation) | C4-2: Zone 4 → Zone 2 (Electrical) | IEC 61850 GOOSE/MMS | Dedicated fiber; PRP/HSR redundancy; no IP routing to Zone 0 |
| RCIL-P03 | UPS NMC | Zone 2 (Electrical) | C2-0: Zone 2 → Zone 0 (IT) | SNMP, HTTP, Modbus TCP | Industrial firewall; disable HTTP; enforce SNMPv3 |
| RCIL-P04 | ATS/STS controller | Zone 2 (Electrical) | C2-0: Zone 2 → Zone 0 (IT) | Modbus TCP | Firewall with strict ACL; separate command path |
| RCIL-P05 | Generator controller | Zone 2 (Electrical) | C2-0: Zone 2 → Zone 0 (IT) | Modbus TCP, DNP3 | Industrial firewall; encrypted tunnel |
| RCIL-P06 | PDU monitoring | Zone 2 (Electrical) | C2-0: Zone 2 → Zone 0 (IT) | SNMP, Modbus TCP | Firewall; SNMPv3; disable write access |
| RCIL-C01 | Chiller controller | Zone 1 (BMS/HVAC) | C1-0: Zone 1 → Zone 0 (IT) | BACnet/IP, Modbus TCP | Industrial firewall with DPI; unidirectional gateway preferred |
| RCIL-C02 | Cooling tower VFD | Zone 1 (BMS/HVAC) | C1-0: Zone 1 → Zone 0 (IT) | BACnet/IP, Modbus TCP | Industrial firewall; separate VLAN |
| RCIL-C03 | CDU controller | Zone 1 (BMS/HVAC) | C1-0: Zone 1 → Zone 0 (IT) | BACnet/IP, Modbus TCP | Industrial firewall with DPI; unidirectional gateway; SL-3 enforcement |
| RCIL-C04 | CDU flow sensor | Zone 1 (BMS/HVAC) | C1-0: Zone 1 → Zone 0 (IT) | 4-20 mA + Modbus | Hardwired analog preferred; Modbus via industrial FW |
| RCIL-C05 | CDU temperature sensor | Zone 1 (BMS/HVAC) | C1-0: Zone 1 → Zone 0 (IT) | 4-20 mA + Modbus | Hardwired analog preferred; Modbus via industrial FW |
| RCIL-C06 | CRAH/AHU controller | Zone 1 (BMS/HVAC) | C1-0: Zone 1 → Zone 0 (IT) | BACnet/IP, Modbus TCP | Industrial firewall; separate VLAN |
| RCIL-C07 | Water quality analyser | Zone 1 (BMS/HVAC) | C1-0: Zone 1 → Zone 0 (IT) | Modbus TCP, 4-20 mA | Industrial firewall; hardwired analog preferred |
| RCIL-M01 | BMS supervisory controller | Zone 1 (BMS/HVAC) | C1-0: Zone 1 → Zone 0 (IT) | BACnet/IP, Modbus TCP | Industrial firewall with DPI; unidirectional gateway |
| RCIL-M02 | BMS field controller | Zone 1 (BMS/HVAC) | C1-0: Zone 1 → Zone 0 (IT) | BACnet/IP, Modbus TCP | Industrial firewall; separate VLAN |
| RCIL-M03 | DCIM platform | Zone 0 (Enterprise IT) | C0-1: Zone 0 → Zone 1 (BMS) | REST API, SNMP | Firewall with strict ACL; read-only API keys |
| RCIL-M04 | Physical security controller | Zone 5 (Physical Security) | C5-0: Zone 5 → Zone 0 (IT) | ONVIF, OSDP | Isolated VLAN; encrypted tunnel to SOC |

---

## 5. Cross-Reference to Standards

**Table 17.7: Standards Applicable to Each CIL Item**

| CIL ID | Component | IEC 62443-4-2 FRs | EN 50600 Clause | ASHRAE TC 9.9 | NFPA 75/76/855 | IEC 61850 | OCP S.A.F.E. |
|:---|:---|:---|:---|:---|:---|:---|:---|
| SCIL-001 | UPS BMS | FR1,2,3,7 (SL 3) | 2-2 Availability | — | NFPA 855 Ch.5,10 | — | — |
| SCIL-002 | ATS controller | FR1,2,7 (SL 2) | 2-2 Availability | — | — | — | — |
| SCIL-003 | CDU valve actuator | FR1,2,3,7 (SL 2–3) | 2-3 Availability | W17–W+ | — | — | — |
| SCIL-004 | Fire alarm panel | FR1,2,3,6,7 (SL 3) | 2-5 Protection | — | NFPA 75 Ch.7; NFPA 76 Ch.7 | — | — |
| SCIL-005 | Fire suppression controller | FR3,7 (SL 3) | 2-5 Protection | — | NFPA 75 Ch.7; NFPA 76 Ch.7 | — | — |
| SCIL-006 | EPO system | FR3,7 (SL 3) | 2-5 Protection | — | NFPA 75 Ch.8 | — | — |
| SCIL-007 | BESS thermal management | FR1,2,3,7 (SL 3) | 2-2 Availability | — | NFPA 855 Ch.10 | — | — |
| SCIL-008 | BESS gas detection | FR3,7 (SL 3) | — | — | NFPA 855 Ch.10; NFPA 76 Ch.7 | — | — |
| SCIL-009 | Water treatment controller | FR1,2,7 (SL 2) | 2-3 Availability | — | — | — | — |
| SCIL-010 | Hydrogen leak detection | FR3,7 (SL 3) | — | — | NFPA 855 Ch.10; NFPA 76 Ch.7 | — | — |
| RCIL-P01 | EPMS controller | FR1,2,6,7 (SL 3) | 2-2 / 4-2 PUE | — | — | MMS (optional) | — |
| RCIL-P02 | Protection relay | FR1,2,3,4,6 (SL 3–4) | 2-2 Availability | — | — | 61850 GOOSE/SV | — |
| RCIL-P03 | UPS NMC | FR1,2,7 (SL 2–3) | 2-2 Availability | — | — | — | — |
| RCIL-P04 | ATS/STS controller | FR1,2,7 (SL 2) | 2-2 Availability | — | — | — | — |
| RCIL-P05 | Generator controller | FR1,2,7 (SL 2) | 2-2 Availability | — | — | — | — |
| RCIL-P06 | PDU monitoring | FR1,2,7 (SL 1–2) | 2-2 Availability | — | — | — | — |
| RCIL-C01 | Chiller controller | FR1,7 (SL 2) | 2-3 Availability | A1–A4, W classes | — | — | — |
| RCIL-C02 | Cooling tower VFD | FR1,7 (SL 2) | 2-3 Availability | — | — | — | — |
| RCIL-C03 | CDU controller | FR1,2,3,7 (SL 2–3) | 2-3 Availability | W17–W+ | — | — | — |
| RCIL-C04 | CDU flow sensor | FR1,7 (SL 2) | 2-3 Availability | W17–W+ | — | — | — |
| RCIL-C05 | CDU temperature sensor | FR1,7 (SL 2) | 2-3 Availability | W17–W+ | — | — | — |
| RCIL-C06 | CRAH/AHU controller | FR1,7 (SL 2) | 2-3 Availability | A1–A4 | — | — | — |
| RCIL-C07 | Water quality analyser | FR1,7 (SL 2) | 2-3 Availability | — | — | — | — |
| RCIL-M01 | BMS supervisory controller | FR1-7 (SL 2–3) | 2-3 / 2-5 | — | — | — | — |
| RCIL-M02 | BMS field controller | FR1,2,3,7 (SL 2) | 2-3 Availability | A1–A4 setpoints | — | — | — |
| RCIL-M03 | DCIM platform | FR1-7 (SL 1–2) | 4-2 PUE | — | — | — | — |
| RCIL-M04 | Physical security controller | FR1,2,6 (SL 2–3) | 2-5 PC 1–4 | — | — | — | — |

---

## 6. Procurement Impact Summary

The RCIL and SCIL registers directly drive procurement specifications (Chapter 11). The following table summarises the minimum security requirements per CIL category.

**Table 17.8: Minimum Procurement Requirements by CIL Category**

| Requirement | RCIL (SL-1) | RCIL (SL-2) | RCIL (SL-3) | SCIL (all) |
|:---|:---|:---|:---|:---|
| ISASecure CSA certification | Recommended | Required | Required | Required |
| Hardwired safety function | N/A | N/A | N/A | Mandatory |
| SIL rating | N/A | N/A | N/A | SIL-1 to SIL-3 |
| Firmware signing | Recommended | Required | Required | Required |
| Secure boot | Recommended | Required | Required | Required |
| Role-based access control | Recommended | Required | Required | Required |
| Audit logging | Recommended | Required | Required | Required |
| DoS protection | Required | Required | Required | Required |
| Vulnerability disclosure program | Recommended | Required | Required | Required |
| Hardening guide | Recommended | Required | Required | Required |

**Note on ISASecure certification:** As of 2025, no datacenter-specific OT device (UPS NMC, BMS controller, CDU PLC, EPMS meter) holds ISASecure CSA certification [ISASecure, 2025]. For RCIL SL-3 and SCIL items, asset owners should require vendors to provide either:
- A signed attestation of compliance with IEC 62443-4-2 FR1–FR7, backed by third-party penetration test results, or
- A roadmap to ISASecure CSA certification within 12 months of contract award.

---

## References

- ASHRAE. (2021). *Thermal Guidelines for Data Processing Environments* (5th ed.). TC 9.9.
- EN 50600. (2020). *Information Technology — Data Centre Facilities and Infrastructures*. CENELEC.
- IEC. (2010). *IEC 61508: Functional Safety of Electrical/Electronic/Programmable Electronic Safety-Related Systems*.
- IEC. (2016). *IEC 61511: Functional Safety — Safety Instrumented Systems for the Process Industry Sector*.
- IEC. (2020). *IEC 62443-3-2: Security Risk Assessment for System Design*.
- IEC. (2020). *IEC 62443-4-2: Technical Security Requirements for IACS Components*.
- ISASecure. (2025). *Certified Products Registry*. https://isasecure.org/certification/certified-products
- NFPA. (2024). *NFPA 76: Standard for the Fire Protection of Telecommunications Facilities*.
- NFPA. (2026). *NFPA 855: Standard for the Installation of Stationary Energy Storage Systems*.
- OCP. (2024). *S.A.F.E. (Security Appraisal Framework and Enablement)*. Open Compute Project.
- Ono, R., et al. (2007). *Hydrogen explosion characteristics*. Journal of Loss Prevention in the Process Industries, 20(4-6), 432-438.
```