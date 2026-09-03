# Design Considerations for Hyperscale Datacentre Infrastructure

## Chapter 3: FMECA — Quantifying Cyber-Physical Risk

## Abstract

Cyber-induced failure modes in datacentre OT carry Risk Priority Numbers 3× to 13× higher than their mechanical equivalents. This chapter constructs dual FMECA matrices — mechanical and cyber-induced — for every critical OT component in the hyperscale reference architecture. The four highest-priority components (CDU pump, CDU isolation valve, BMS controller, ATS) share a common pattern: safety-critical function, zero IEC 62443 certification, and unauthenticated network interfaces. The matrices provide the quantitative basis for targeted security investment. The analysis is grounded in CVE research (2024–2026) and IEC 62443 standards mapping [CISA ICS-CERT, 2025; ISASecure, 2025].

---

## Practitioner's Note

FMECA is the workhorse of reliability engineering. I have used it to justify investment in hardened zone controllers for a European rail operator, to prioritise firmware updates across 3,000 Modbus devices in a water network, and to demonstrate to a board of directors why a $2M OT network segmentation project was cheaper than the $40M liability exposure it mitigated.

The method is straightforward: for each component, identify how it can fail, assess how severe the failure is, how often it occurs, and how likely you are to detect it before it causes damage. Multiply those three numbers and you get a Risk Priority Number (RPN) that tells you where to spend your money first.

What traditional FMECA misses — and what this paper corrects — is the cyber dimension. A CDU pump bearing wears out over 50,000 operating hours. That is a predictable, maintainable failure. But if an attacker can remotely command that same pump to stop, the failure is instantaneous, simultaneous across multiple units, and invisible to standard mechanical monitoring. The occurrence probability changes. The detection probability changes. The RPN changes dramatically.

---

## 1. FMECA Methodology

### 1.1 RPN Calculation

Risk Priority Number = **Severity (S) × Occurrence (O) × Detection (D)**

Each factor is rated on a 1–10 scale:

**Table 3.2: Each factor is rated on a 1–10 scale**

| Rating | Severity (S) | Occurrence (O) | Detection (D) |
|:---|:---|:---|:---|
| 1 | No operational impact | Failure extremely unlikely (<1 per 10 years) | Failure detected immediately with automated response |
| 3 | Minor performance degradation | Possible but rare (1 per 3–5 years) | Detected within minutes by monitoring |
| 5 | Partial system loss; manual workaround available | Occasional (1 per 1–2 years) | Detected within 30 minutes |
| 7 | Major system loss; extended recovery | Probable (1+ per year) | Detected only during scheduled inspection |
| 10 | Catastrophic facility-wide impact; safety hazard | Frequent or deliberately induced | Undetectable by existing monitoring |

### 1.2 The Cyber-Physical FMECA Extension

Traditional FMECA assigns Occurrence ratings based on component Mean Time Between Failure (MTBF) data — mechanical wear, thermal cycling, manufacturing defects. These are well-characterised for most datacentre equipment.

When we introduce cyber-induced failure modes, the Occurrence and Detection ratings must be re-evaluated:

- **Occurrence increases** because an attacker can trigger the failure at will, at any time, independent of component age or condition
- **Detection decreases** because a skilled attacker can spoof telemetry to mask the failure, making it invisible to standard SCADA/BMS monitoring
- **Severity may increase** because cyber-induced failures can affect multiple identical units simultaneously (common-cause failure), defeating N+1 mechanical redundancy

**Protocol-level vulnerabilities amplify these effects.** BACnet/IP and Modbus TCP, the dominant protocols in datacenter OT, provide no native authentication, encryption, or integrity checking [CISA ICS-CERT, 2025]. Any network-adjacent actor can issue commands to physical equipment. Broadcast discovery (BACnet "Who-Is") reveals all devices and object properties. These protocol weaknesses are not assigned CVEs but are well-documented as insecure-by-design [MITRE ATT&CK for ICS, T0830, T0802].

---

## 2. FMECA Matrix: Datacentre OT Components

### 2.1 Cooling Infrastructure

**Table 3.3: 2.1 Cooling Infrastructure**

| Component | Failure Mode | Traditional Cause | Cyber-Physical Vector | S | O (Mech) | O (Cyber) | D (Mech) | D (Cyber) | RPN (Mech) | RPN (Cyber) | Gap |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| CDU Pump Assembly | Catastrophic stop | Bearing seizure; VFD capacitor failure | Unauthenticated firmware flash bricks PLC | 9 | 3 | 7 | 2 | 9 | **54** | **567** | 10.5× |
| CDU Temperature Sensor | False reading (reads low when actual is high) | Sensor drift; calibration error | Attacker modifies sensor calibration offset via BMS | 7 | 2 | 6 | 3 | 8 | **42** | **336** | 8× |
| Chiller Compressor Controller | Compressor shutdown | Refrigerant leak; motor overload | Attacker sends shutdown command via BACnet to chiller controller | 8 | 2 | 5 | 2 | 7 | **32** | **280** | 8.75× |
| Cooling Tower Fan VFD | Fan speed locked at minimum | VFD component failure | Attacker sets VFD maximum frequency to 5 Hz via Modbus register write | 6 | 3 | 6 | 3 | 8 | **54** | **288** | 5.3× |
| CDU Isolation Valve (Motorised) | Valve fails closed | Actuator motor failure; mechanical binding | Attacker commands valve closed via BMS while spoofing "open" status | 9 | 2 | 6 | 2 | 9 | **36** | **486** | 13.5× |

**Table 3.3a: CVEs affecting cooling infrastructure components**

| Component | CVE ID | CVSS | Affected Product | Attack Vector | Source |
|:---|:---|:---|:---|:---|:---|
| CDU Pump VFD (ABB) | CVE-2024-48510 | 9.8 | ABB Drive Composer | Path traversal → file system access | [ABB PSIRT, 2024] |
| CDU Pump VFD (Siemens) | CVE-2024-56336 | 9.8 | SINAMICS S200 | Unlocked bootloader → full device compromise | [Siemens ProductCERT, 2025] |
| Chiller Controller (JCI York via Metasys) | CVE-2025-26385 | 10.0 | Metasys ADS/ADX ≤14.1 | SQL injection → remote command execution | [ICSA-26-027-04, Jan 2026] |
| Cooling Tower VFD (Danfoss) | — | — | Danfoss VLT FC series | IEC 62443-4-2 SL1 certified; no critical CVEs on core firmware | [Danfoss Security Advisory, 2025] |
| BMS Controller (Honeywell Niagara) | CVE-2025-3936 | 9.8 | Niagara Framework <4.14u2 | Valid accounts / default credentials | [Honeywell Advisory, Jul 2025] |
| BMS Controller (Schneider EBO) | CVE-2026-1226 | High | EcoStruxure Building Operation | XXE injection | [SEVD-2026-041-02, Feb 2026] |

### 2.2 Power Infrastructure

**Table 3.4: 2.2 Power Infrastructure**

| Component | Failure Mode | Traditional Cause | Cyber-Physical Vector | S | O (Mech) | O (Cyber) | D (Mech) | D (Cyber) | RPN (Mech) | RPN (Cyber) | Gap |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| UPS Network Management Card | Loss of management visibility | Card hardware failure | Exploitation of unpatched NMC CVE (e.g., TLStorm-class) | 5 | 3 | 7 | 2 | 6 | **30** | **210** | 7× |
| UPS Battery String | Premature capacity loss | Normal ageing; thermal stress | Logic bomb cycles batteries continuously, accelerating degradation | 8 | 4 | 5 | 3 | 8 | **96** | **320** | 3.3× |
| ATS Transfer Logic | Fails to transfer on utility loss | Relay contact welding; logic board failure | Attacker alters transfer parameters; ATS does not initiate transfer during brownout | 10 | 2 | 5 | 2 | 8 | **40** | **400** | 10× |
| Generator ECU | Engine fails to start | Fuel system issue; battery failure; ECU fault | Attacker disables auto-start via Modbus; alters coolant temperature threshold to prevent start permission | 9 | 3 | 5 | 2 | 7 | **54** | **315** | 5.8× |
| PDU Outlet Controller | Outlets de-energised | Relay failure; overcurrent trip | Attacker issues outlet-off commands via SNMP (default community string) | 7 | 2 | 7 | 2 | 6 | **28** | **294** | 10.5× |

**Table 3.4a: CVEs affecting power infrastructure components**

| Component | CVE ID | CVSS | Affected Product | Attack Vector | Source |
|:---|:---|:---|:---|:---|:---|
| UPS NMC (APC) | CVE-2022-22805 | 9.8 | APC Smart-UPS (TLStorm) | TLS bypass, firmware signing bypass | [NVD, Mar 2022] |
| UPS NMC (Vertiv) | CVE-2025-46412 | Critical | Vertiv UPS Management Cards | Authentication bypass | [Vertiv Security Center, 2025] |
| UPS NMC (Eaton) | CVE-2025-22495 | 8.4 | Network-M2 Card <3.0.4 | NTP config command injection | [Eaton Advisory, Feb 2025] |
| ATS Remote Annunciator (ASCO) | CVE-2025-1058 | 8.7 | ASCO 5310/5350 | Code download without integrity check | [CISA Advisory, Apr 2025] |
| Generator ECU (Siemens SIPROTEC) | CVE-2024-52504 | 8.7 | SIPROTEC 4 | Remote unauthenticated DoS during file transfer | [SSA-400089, 2024] |
| PDU Outlet Controller (Eaton G4) | CVE-2025-48394 | High | G4 PDU / NMC G2 | Path traversal | [Eaton Advisory, 2025] |

### 2.3 Control and Telemetry

**Table 3.5: 2.3 Control and Telemetry**

| Component | Failure Mode | Traditional Cause | Cyber-Physical Vector | S | O (Mech) | O (Cyber) | D (Mech) | D (Cyber) | RPN (Mech) | RPN (Cyber) | Gap |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| BMS Zone Controller | Loss of control logic | Hardware failure; power supply fault | Exploitation of unpatched CVE in BMS platform (e.g., Schneider CVE-2025-50121, CVSS 10.0) | 10 | 2 | 6 | 2 | 8 | **40** | **480** | 12× |
| OT Network Core Switch | Network partition | Switch hardware failure | Exploitation of CVE in switch firmware; ARP spoofing on flat OT network | 8 | 2 | 6 | 2 | 7 | **32** | **336** | 10.5× |
| Fire Detection Panel | False suppression activation | Detector contamination; wiring fault | Attacker sends activation command through compromised BMS-to-fire interface | 10 | 1 | 4 | 3 | 9 | **30** | **360** | 12× |
| EPMS Power Meter | Incorrect power readings | Meter calibration drift | Attacker modifies meter scaling factors, masking overload conditions | 6 | 2 | 5 | 3 | 8 | **36** | **240** | 6.7× |

**Table 3.5a: CVEs affecting control and telemetry components**

| Component | CVE ID | CVSS | Affected Product | Attack Vector | Source |
|:---|:---|:---|:---|:---|:---|
| BMS Controller (Honeywell Niagara) | CVE-2025-3936–3944 (multiple) | 9.8 | Niagara Framework <4.14u2 | Default credentials, MiTM, info theft | [Honeywell Advisory, Jul 2025] |
| BMS Controller (JCI Metasys) | CVE-2025-26385 | 10.0 | Metasys ADS/ADX ≤14.1 | SQL injection → remote command execution | [ICSA-26-027-04, Jan 2026] |
| BMS Controller (Schneider EBO) | CVE-2026-1226/1227 | High | EcoStruxure Building Operation | XXE injection, improper code generation | [SEVD-2026-041-02, Feb 2026] |
| BMS Controller (Siemens Desigo CC) | CVE-2025-47809 | 8.2 | Desigo CC (CodeMeter) | Privilege escalation via license import | [CISA Advisory, 2025] |
| OT Network Switch (Moxa) | CVE-2024-9138 | 8.6 | EDR-810, EDR-G902, etc. | Hard-coded credentials → root access | [MPSA-241155, Jan 2025] |
| OT Network Switch (Cisco IE3400) | Various | Various | IOS XE | Inherits IOS XE ecosystem vulnerabilities | [Cisco Security Advisories, 2024–2025] |
| Fire Detection Panel (Honeywell) | — | — | Not product-specific | BMS-to-fire interface via compromised BMS | [MITRE ATT&CK T0878] |
| EPMS Meter (Schneider PME) | CVE-2025-54923–54927 | High | PME 2022–2024 R2 | Deserialization, SSRF, path traversal | [SEVD-2025-224-02, Aug 2025] |

### 2.4 Silicon and Firmware Layer

**Table 3.6: 2.4 Silicon and Firmware Layer**

| Component | Failure Mode | Traditional Cause | Cyber-Physical Vector | S | O (Mech) | O (Cyber) | D (Mech) | D (Cyber) | RPN (Mech) | RPN (Cyber) | Gap |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| Server BMC (ASPEED AST2600) | Persistent implant below OS | N/A (firmware, not mechanical) | Compromised ODM supply chain; CVE-2023-34329/34330 (auth bypass + RCE) | 9 | N/A | 4 | N/A | 10 | N/A | **360** | — |
| Server UEFI/BIOS | Boot-level rootkit | N/A | Supply chain compromise; LogoFAIL/PixieFail class vulnerabilities | 9 | N/A | 4 | N/A | 10 | N/A | **360** | — |

**Table 3.6a: CVEs affecting silicon and firmware layer**

| Component | CVE ID | CVSS | Affected Product | Attack Vector | Source |
|:---|:---|:---|:---|:---|:---|
| BMC (ASPEED AST2600) | CVE-2023-34329/34330 | 9.0 | ASPEED AST2600 | Authentication bypass + RCE | [NVD, 2023] |
| UEFI/BIOS | LogoFAIL (multiple) | 8.2 | Various | Boot logo parsing → arbitrary code execution | [Binarly, 2023] |
| UEFI/BIOS | PixieFail (multiple) | 7.5 | EDK II PXE | Network boot vulnerabilities | [CISA, 2024] |

---

## 3. Interpreting the Results

### 3.1 The Cyber Multiplier Effect

Across all components analysed, **cyber-induced RPNs are 3× to 13× higher** than traditional mechanical RPNs for the same failure mode. The primary drivers:

1. **Occurrence increases** because an attacker can trigger failures on demand, at any time, regardless of component age
2. **Detection decreases** because attackers can spoof telemetry, suppress alarms, and mask the failure from operators
3. **Common-cause potential** means a single exploit can affect every instance of the same component simultaneously — CDU pump 1 *and* CDU pump 2 run the same firmware

### 3.2 Highest-Priority Components (RPN > 400)

**Table 3.7: 3.2 Highest-Priority Components (RPN > 400)**

| Component | Cyber RPN | Primary Risk Driver |
|:---|:---|:---|
| CDU Pump Assembly | 567 | Uncertified controller; unauthenticated firmware update |
| CDU Isolation Valve | 486 | Spoofable status feedback; no command authentication |
| BMS Zone Controller | 480 | Massive attack surface; CVE history; controls everything |
| ATS Transfer Logic | 400 | Safety-critical switching; no cybersecurity certification |

These four components represent the highest-priority targets for IEC 62443 mitigation. Not coincidentally, they are also the components with the *weakest* current certification posture — none holds an IEC 62443-4-2 certification at any level [ISASecure Certified Products Registry, 2025].

### 3.3 Where Mechanical Redundancy Fails

Traditional reliability engineering assumes that redundant systems fail independently. The probability of both UPS blocks failing simultaneously is the product of their individual failure probabilities — a very small number.

Cyber-induced failure breaks this assumption. If both UPS blocks run the same NMC firmware with the same vulnerability, an attacker exploiting that vulnerability compromises both blocks simultaneously. The "redundant" system has a single logical failure mode.

This is why the FMECA cyber-RPN for a distributed block redundant UPS is not improved by adding more blocks. The mitigation is not more hardware — it is firmware diversity, network segmentation, and component-level security certification.

### 3.4 IEC 62443 Security Level Targets for High-Risk Components

Based on the IEC 62443-3-2 zone and conduit model for datacenters [IEC 62443-3-2, Clause 5], each high-risk component should be assigned a Security Level Target (SL-T) and placed in an appropriate zone.

**Table 3.8: Recommended SL-T and zone placement for top-priority components**

| Component | Recommended SL-T | Zone | Rationale |
|:---|:---|:---|:---|
| CDU Pump Assembly | SL 3 | Zone 1 (BMS/HVAC) | Direct impact on cooling availability; requires protection against sophisticated attackers with moderate resources |
| CDU Isolation Valve | SL 3 | Zone 1 (BMS/HVAC) | Same as CDU pump; spoofable status feedback demands integrity controls (FR3) |
| BMS Zone Controller | SL 3 | Zone 1 (BMS/HVAC) | Central control point; CVE history (CVSS 9.8–10.0) justifies SL 3; conduit to enterprise IT must use data diode or industrial firewall with DPI |
| ATS Transfer Logic | SL 3 | Zone 2 (Electrical) | Safety-critical; must be air-gapped from enterprise IT; mechanical interlocks as primary protection |

**ISASecure certification status for these components:**

| Component | Vendor Example | ISASecure CSA (IEC 62443-4-2) | ISASecure SDLA (IEC 62443-4-1) |
|:---|:---|:---|:---|
| CDU Pump Controller | ABB ACS880 | Not certified | ABB SDLA ML3 (global) |
| CDU Isolation Valve Actuator | Belimo / Siemens | Not certified | Siemens SDLA aligned |
| BMS Zone Controller | Honeywell JACE | Not certified (product-level) | Honeywell SDLA ML3 (Building Technologies) |
| ATS Transfer Logic | ASCO (Schneider) | Not certified | Schneider SDLA ML3 (global) |

**Source:** [ISASecure Certified Products Registry, 2025]

The gap is clear: while vendors maintain secure development lifecycles (SDLA), their datacenter-specific products have not achieved component-level certification (CSA). This means the products themselves lack verified implementation of FR1–FR7 requirements.

---

## 4. From FMECA to Investment Decisions

The FMECA matrix provides a quantitative basis for security investment that facility engineers and procurement teams can act on immediately.

**Priority 1 (RPN > 400): Immediate architectural mitigation**
- CDU controllers: Deploy unidirectional gateways (data diodes) on CDU telemetry. Mandate firmware write-protection.
- BMS zone controllers: Segment BMS onto dedicated OT network using SL-2 certified switches (e.g., Moxa EDR-G9010, ISASecure CSA certified). Require SL-2 certified controllers for all new procurement.
- ATS: Air-gap ATS control logic. Require mechanical interlocks as primary transfer protection.

**Priority 2 (RPN 250–400): Procurement specification updates**
- UPS NMCs: Require SL-2 certified cards (Schneider NMC3, Vertiv RDU120, Eaton NETWORK-M3) in all new and replacement procurement. Disable HTTP management interfaces. Note: as of 2025, none of these NMCs hold ISASecure CSA certification — this should be a procurement requirement to drive vendor adoption.
- Generator ECUs: Isolate generator management on dedicated VLAN. Restrict Modbus access to authenticated endpoints only.
- Fire systems: Physically separate fire detection network from general BMS. Require hardware arm before electronic suppression activation.

**Priority 3 (RPN < 250): Monitoring and process controls**
- EPMS meters: Implement cross-validation between independent metering systems.
- Cooling tower VFDs: Monitor for anomalous frequency changes. Maintain hardware parameter locks.

**Procurement specification updates based on standards research:**
- All new OT components should require IEC 62443-4-2 CSA certification at SL 2 or higher. Where certification is not yet available (e.g., UPS NMCs), require vendor SDLA certification (IEC 62443-4-1) and contractual commitment to achieve CSA within 24 months.
- Network switches for OT zones must be ISASecure CSA certified (e.g., Moxa EDR-G9010, TN-4900 series) [ISASecure, 2025].
- BMS controllers should support BACnet/SC (Secure Connect) with TLS encryption and certificate-based authentication [BACnet International, 2024].

This is how IEC 62443 operates in practice: not as a checkbox exercise, but as an engineering methodology that directs finite security budgets to the components where risk reduction is greatest. The alternative — applying "one size fits all" security controls uniformly — wastes resources on low-risk components while leaving the highest-risk components exposed.

---

## 5. Standards Integration for Datacenter OT

The FMECA findings align with and are reinforced by multiple industry standards. The following table maps the highest-risk components to relevant standard clauses.

**Table 5.1: Standards mapping for high-risk components**

| Component | IEC 62443-3-2 Zone | ASHRAE TC 9.9 | NFPA 75/76 | EN 50600 / ISO 22237 |
|:---|:---|:---|:---|:---|
| CDU Pump Assembly | Zone 1 (BMS/HVAC) | Thermal guidelines for liquid cooling (2019 edition) | NFPA 75: fire protection for IT equipment | EN 50600-2-3: environmental control |
| CDU Isolation Valve | Zone 1 (BMS/HVAC) | ASHRAE liquid cooling guidelines | NFPA 75: coolant leak detection | EN 50600-2-3: cooling distribution |
| BMS Zone Controller | Zone 1 (BMS/HVAC) | — | NFPA 76: fire alarm interface | EN 50600-2-2: building management |
| ATS Transfer Logic | Zone 2 (Electrical) | — | NFPA 70 (NEC): emergency power | EN 50600-2-2: power distribution |

**ASHRAE TC 9.9** provides thermal guidelines that define acceptable operating envelopes for IT equipment. Cyber-induced cooling failures (e.g., CDU pump stop) can push temperatures beyond these envelopes within minutes, causing server throttling or shutdown [ASHRAE TC 9.9, 2019].

**NFPA 75** (Standard for the Fire Protection of Information Technology Equipment) and **NFPA 76** (Standard for the Fire Protection of Telecommunications Facilities) require fire detection and suppression systems to be reliable and tamper-resistant. The FMECA shows that cyber-induced false suppression activation (RPN 360) is a credible threat that NFPA 75/76 do not explicitly address — this is a gap that must be covered by OT security controls.

**EN 50600** (Information technology – Data centre facilities and infrastructures) and **ISO 22237** classify datacenter availability from Class 1 to Class 4. A cyber-induced failure that defeats N+1 redundancy effectively downgrades the datacenter's availability class. The FMECA provides the quantitative evidence to justify security investments that maintain the intended availability class.

---

## References

1. CISA ICS-CERT Advisories (2024–2026). https://www.cisa.gov/news-events/ics-advisories
2. ISASecure Certified Products Registry (2025). https://isasecure.org/certification/certified-products
3. IEC 62443-3-2:2020 – Security risk assessment for system design.
4. IEC 62443-4-2:2019 – Technical security requirements for IACS components.
5. ASHRAE TC 9.9 (2019). Thermal Guidelines for Data Processing Environments.
6. NFPA 75 (2020). Standard for the Fire Protection of Information Technology Equipment.
7. NFPA 76 (2020). Standard for the Fire Protection of Telecommunications Facilities.
8. EN 50600 series (2019–2021). Information technology – Data centre facilities and infrastructures.
9. ISO 22237 series (2021). Information technology – Data centre facilities and infrastructures.
10. MITRE ATT&CK for ICS (2025). https://attack.mitre.org/techniques/ics/
11. BACnet International (2024). BACnet/SC – Secure Connect Overview.
12. Vendor advisories: Schneider Electric (SEVD), Siemens (SSA), Honeywell, Johnson Controls, Eaton, Moxa, Vertiv, ABB, Danfoss.