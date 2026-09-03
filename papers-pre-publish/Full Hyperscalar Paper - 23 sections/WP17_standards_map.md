# Standards Mapping: WP17
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:27:09.837741

## Standards Mapping: WP17 RCIL/SCIL Infrastructure

### Table 1: Asset → Zone → SL-T → IEC 62443-4-2 FR/SR Requirements
| Asset ID (WP17) | Asset Description | IEC 62443-3-2 Zone | IEC 62443-3-2 SL-T | IEC 62443-4-2 Requirements (Minimum for SL-3/SL-4) | Rationale |
|:---|:---|:---|:---|:---|:---|
| SCIL-001 | UPS Battery Management System | Zone 2 (Electrical) | SL-3 | FR1: CR 1.1, CR 1.2, CR 1.5, CR 1.7, CR 1.11<br>FR2: CR 2.1, CR 2.8<br>FR3: CR 3.1, CR 3.4, CR 3.7, CR 3.11, CR 3.14<br>FR4: CR 4.1<br>FR6: CR 6.1<br>FR7: CR 7.1, CR 7.2, CR 7.3 | Failure leads to fire/explosion (MoR-P03). Cyber compromise enables thermal runaway. |
| SCIL-002 | ATS Controller | Zone 2 (Electrical) | SL-3 | FR1: CR 1.1, CR 1.2, CR 1.7, CR 1.11<br>FR2: CR 2.1, CR 2.8<br>FR3: CR 3.1, CR 3.4, CR 3.7<br>FR7: CR 7.1 | Failure causes arc flash/electrocution (MoR-P05). Single point for load transfer. |
| SCIL-003 | CDU Isolation Valve Actuator | Zone 1 (BMS/Cooling) | SL-3 | FR1: CR 1.1, CR 1.2<br>FR3: CR 3.1, CR 3.4, CR 3.7<br>FR7: CR 7.1, CR 7.2 | Failure releases pressurized coolant (MoR-C03). Part of critical cooling path. |
| SCIL-004 | Fire Alarm Panel (FACP) | Zone 3 (Fire & Life Safety) | SL-3 | FR1: CR 1.1, CR 1.2, CR 1.7<br>FR3: CR 3.1, CR 3.4, CR 3.7<br>FR7: CR 7.1 | Undetected fire = total loss (MoR-S02). Network interface is attack surface. |
| SCIL-005 | Fire Suppression Controller | Zone 3 (Fire & Life Safety) | SL-3 | FR1: CR 1.1, CR 1.2<br>FR3: CR 3.1, CR 3.4<br>FR7: CR 7.1 | Suppression failure = total loss (MoR-S03). Must resist false activation. |
| SCIL-006 | EPO System | Zone 2 (Electrical) | **SL-4** | All FR1-FR7 requirements at SL-4 per IEC 62443-4-2 Clause 6. Fully hardwired by design; no OT dependency allowed. | Catastrophic consequence if manipulated (MoR-S04). Requires state-level attack resistance. |
| SCIL-007 | BESS Thermal Management | Zone 6 (BESS) | SL-3 | FR1: CR 1.1, CR 1.2<br>FR3: CR 3.1, CR 3.4<br>FR7: CR 7.1, CR 7.2 | Prevents thermal runaway cascade. Critical for battery safety. |
| SCIL-008 | BESS Gas Detection | Zone 6 (BESS) | SL-3 | FR1: CR 1.1<br>FR3: CR 3.1<br>FR7: CR 7.1 | Detects toxic gas release. Must trigger safety interlock. |
| SCIL-009 | Water Treatment Chemical Dosing | Zone 1 (BMS/Cooling) | SL-3 | FR1: CR 1.1, CR 1.2<br>FR3: CR 3.1, CR 3.4<br>FR7: CR 7.1, CR 7.2 | Prevents corrosive water damage (MoR-C04). Critical for cooling loop integrity. |
| SCIL-010 | Hydrogen Leak Detection | Zone 6 (BESS/FC) | SL-3 | FR1: CR 1.1<br>FR3: CR 3.1<br>FR7: CR 7.1 | Detects explosive atmosphere. Triggers ventilation/safety interlock. |
| RCIL Items | UPS NMC, CDU PLC, EPMS Meter, VFD, Protection Relay | Varies (Zone 1/2) | SL-3 | FR1: CR 1.1, CR 1.2, CR 1.7<br>FR3: CR 3.1, CR 3.4, CR 3.7<br>FR7: CR 7.1 | Reliability-critical: failure degrades availability below design target. |

### Table 2: Asset → Certification Status → Gap Description
| Asset Type | ISASecure Status | Certification Gap Description | Impact on SL-3/SL-4 Compliance |
|:---|:---|:---|:---|
| UPS Network Management Cards (Vertiv, Schneider APC, Eaton) | **Not Certified** | No vendor has achieved ISASecure CSA (IEC 62443-4-2) certification for datacenter-specific UPS NMCs. | CR 1.1 (IAC), CR 3.4 (firmware integrity), CR 7.1 (DoS protection) unverified. Cannot achieve SL-3. |
| CDU/Coolant Distribution PLCs (Vertiv, Motivair, CoolIT) | **Not Certified** | No datacenter cooling OEM has ISASecure CSA certification for CDU controllers. | CR 1.2 (process ID), CR 3.11 (tamper resistance) unverified. Cannot achieve SL-3. |
| EPMS Meters (Schneider ION, GE) | **Not Certified** | Power monitoring devices lack ISASecure certification. Vendor SDLA only. | CR 1.7 (auth strength), CR 4.1 (data confidentiality) unverified. Cannot achieve SL-3. |
| Industrial Ethernet Switches (Cisco IE, Hirschmann) | **Not Certified** (except Moxa) | Most datacenter OT switches are not CSA certified. Moxa certified. | CR 5.1 (segmentation), CR 5.2 (zone boundary) implementation unverified at component level. |
| Protection Relays (SEL, ABB, Siemens) | **Not Certified** | Relays follow IEC 61850, not ISASecure CSA. Vendor SDLA only. | CR 3.11 (physical tamper), CR 3.14 (boot integrity) unverified. Cannot achieve SL-4. |
| Safety Controllers (Honeywell Safety Manager) | **Certified** | ISASecure SSA certified. Meets IEC 62443-3-3. | No gap for SIS applications. |
| Industrial Firewalls (Moxa EDR-G9010) | **Certified** | ISASecure CSA certified. Meets IEC 62443-4-2. | No gap for conduit enforcement. |

### Table 3: Asset → Non-IEC Standards Applicability
| Asset | Primary Non-IEC Standard | Clause/Section | Requirement | IEC 62443 Integration Point |
|:---|:---|:---|:---|:---|
| SCIL-001 (UPS BMS) | NFPA 855 / UL 9540A | NFPA 855 Ch. 9, Ch. 10; UL 9540A Unit Level | Fire detection/suppression for Li-ion; ventilation for HF gas. | SCIL Clause: Hardwired safety function independent of network. |
| SCIL-002 (ATS) | NFPA 75 | Ch. 8 | Emergency disconnect capability. | SL-3 requires authentication for remote transfer (IEC 62443-4-2 CR 1.1). |
| SCIL-004 (FACP) | NFPA 75 | Ch. 7 | High-sensitivity smoke detection (VESDA). | Zone 3 SL-T: 3. FACP must meet CR 3.4 (firmware integrity). |
| SCIL-007 (BESS Thermal) | NFPA 855 | Ch. 5, Ch. 9 | Technology-specific requirements for Li-ion; thermal runaway detection. | UL 9540A test data informs SCIL RPN. Gas detection interlock is hardwired. |
| SCIL-010 (H₂ Detection) | NFPA 855 | Ch. 10, Ch. 11 | Ventilation for gas dilution; explosion control. | Hardwired interlock to ventilation (SCIL Clause). |
| Cooling System (CDU/Chiller) | ASHRAE TC 9.9 | Air Class A2/A3; Water Class W32/W40 | Server inlet temp 10–35°C; coolant supply ≤32°C. | CDU PLC (RCIL) must maintain setpoints. SL-3 requires CR 3.7 (input validation). |
| Electrical Infrastructure | EN 50600-2-2 | Availability Class 3/4 | N+1 or 2N redundancy; concurrent maintenance. | EPMS (RCIL) must monitor redundancy. SL-3 requires CR 1.1 (authentication). |
| Physical Security | EN 50600-2-5 | Protection Class 3/4 | Multi-factor auth, tamper detection, 24/7 SOC. | Access control systems must meet IEC 62443-4-2 CR 1.1, CR 5.1. |
| Substation Protection | IEC 61850 | GOOSE/MMS | <4ms fault reaction; sampled values. | Protection relays (RCIL) require IEC 62443 SL-4. CR 3.14 (boot integrity) critical. |

### Architectural Recommendations for Closing Gaps
1. **Procurement Mandates for SCIL Items**:
   - All SCIL components must include IEC 62443-3-2 Clause 5.4.2 as contract requirement.
   - Specify ISASecure CSA Level 2 minimum for SL-3 assets. For uncertified assets (UPS NMCs, CDU PLCs), require vendor attestation against IEC 62443-4-2 FR1–FR7 per Table 1.
   - SCIL Clause shall state: "Safety function shall be implemented via hardwired safety relay rated per IEC 61511 SIL-2/3, with proof testing intervals per IEC 61508."

2. **Compensating Controls for Certification Gaps**:
   - For uncertified UPS NMCs (SCIL-001): Implement IEC 62443-3-3 SR 3.5 (Anomaly Detection) via passive TAP/SPAN with OT IDS (Chapter 14).
   - For CDU PLCs: Enforce IEC 62443-4-2 CR 3.14 (Secure Boot) through hardware root-of-trust in procurement spec.
   - Network segmentation per IEC 62443-3-2 Clause 5.4.1: Isolate uncertified assets in dedicated conduits with industrial firewall (Moxa EDR-G9010, CSA certified).

3. **Safety-Cyber Integration**:
   - SCIL items must undergo joint safety-cyber risk assessment per IEC 62443-3-2 Annex D and IEC 61511 Clause 8.
   - Safety instrumented functions (SIF) shall be verified independent of OT network per IEC 61511 Clause 11.5.
   - Cyber-induced failure modes from FMECA (Chapter 3) shall be included in Safety Validation Testing per IEC 61511 Clause 9.

4. **Commissioning Verification**:
   - Firmware baseline hash verification at commissioning per IEC 62443-4-2 CR 3.4.
   - Proof test records for SCIL items per IEC 61508 Clause 8.
   - Zone/conduit compliance audit per IEC 62443-3-2 Clause 5.3.