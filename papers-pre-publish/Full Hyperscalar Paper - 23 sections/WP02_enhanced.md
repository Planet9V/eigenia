# Design Considerations for Hyperscale Datacentre Infrastructure

## Chapter 2: HAZOP Analysis of Critical OT Nodes

**Author:** Jim McKenney, Tetrel Security  

## Abstract

This chapter applies IEC 61882 HAZOP methodology to three critical hyperscale OT nodes: the CDU cooling loop, the UPS power train, and the BMS supervisory network. For each node, it identifies both mechanical and cyber-induced deviations using standard guide words. The analysis reveals a class of cascading cross-node attack scenarios that exploit the shared BMS control plane — requiring only network access, no zero-day vulnerabilities, and no sophisticated tooling — to produce facility-wide thermal or electrical failure.

---

## Practitioner's Note

I have led HAZOP workshops in rail depots, petrochemical facilities, water treatment plants, and power generation stations across four continents. The methodology is the same everywhere: define the design intent, apply guide words systematically, identify deviations, assess consequences, and assign safeguards. What changes is the process medium — steam in a refinery, signalling commands on a railway, chilled water in a datacentre.

The datacentre industry has largely skipped this step. Facility engineers perform thermal modelling and electrical fault analysis, but they do not subject their OT control systems to the same structured hazard identification that a chemical plant or railway operator would consider routine. The result is a class of facilities where the physical infrastructure is engineered to extraordinary reliability standards, but the control plane that orchestrates it has never been formally examined for hazardous deviations — including those induced by cyber attack.

This paper applies standard HAZOP methodology, as I have practised it under IEC 61882 and adapted it within IEC 62443-3-2 zone and conduit risk assessments, to the critical OT nodes of a hyperscale datacentre.

### Field Observation

During a 2024 assessment of a 40 MW colocation facility in ANZ, the workshop team applied the guide word **OTHER THAN** to the BMS-to-fire-suppression interface. The controls engineer confirmed that the BMS issued a "pre-action hold" command to the fire panel via a BACnet write — a software command, not a hardwired interlock. When asked what prevented a compromised BMS from issuing a false "release" command, the room went silent. The fire suppression vendor had assumed the BMS was trustworthy. The BMS vendor had assumed the fire panel validated commands independently. Neither assumption had been tested. The HAZOP identified a single-point software path from a network-accessible BMS controller to a clean-agent discharge that would shut down the entire facility. The remediation — a hardwired interlock on the release circuit — cost less than $15,000. The consequence of the unmitigated scenario: full facility EPO, 48–72 hours of downtime, and potential contractual penalties exceeding $2M.

---

## 1. HAZOP Methodology in the Datacentre Context

### 1.1 What HAZOP Is

HAZOP — Hazard and Operability Study — is a structured, team-based technique for identifying hazards and operability problems in a process system. It was developed in the 1960s by ICI for chemical process plants and is codified in IEC 61882.

The method works by examining each "node" (a defined section of the system) against its design intent, using standardised guide words — **No**, **More**, **Less**, **Reverse**, **As Well As**, **Part Of**, **Other Than** — to systematically explore deviations from normal operation.

### 1.2 Why It Matters Here

In every brownfield OT assessment I have conducted — from Auckland to Amsterdam — the same pattern emerges. The facility was designed with mechanical redundancy (N+1 chillers, 2N UPS), but the control systems that orchestrate failover share a common network, common firmware, and common vulnerabilities. Mechanical redundancy is defeated by logical common-cause failure.

HAZOP forces the engineering team to confront this systematically, node by node, deviation by deviation.

### 1.3 Cyber-HAZOP Extension

Traditional HAZOP considers mechanical, electrical, and human-error causes. In modern connected facilities, we must add a fourth cause category: **cyber-induced deviation** — a deliberate manipulation of a controller, sensor, or actuator via its network interface or compromised firmware.

This is not theoretical. The Johnson Controls Metasys compromise (September 2023) demonstrated that BMS platforms are reachable. The TLStorm vulnerabilities in Schneider APC UPS units (BARR Engineering, 2022) demonstrated that power equipment firmware can be remotely exploited to cause physical damage. The Unitronics PLC compromises (November 2023) demonstrated that default credentials on OT controllers are actively targeted by nation-state actors.

---

## 2. Node Analysis

### Node 1: Secondary Cooling Loop — CDU to Direct-to-Chip Cold Plates

**Design Intent:** Deliver purified coolant at 30°C ± 2°C to GPU cold plates at 150 litres per minute, maintaining chip junction temperatures below 85°C under full computational load.

**System Boundary:** CDU inlet (facility water interface) → CDU heat exchanger → CDU pump → distribution manifold → rack-level quick-connect fittings → cold plate channels → return manifold → CDU return.

**Table 2.2: Guide Word - Parameter**

| Guide Word | Parameter | Deviation | Cause (Mechanical) | Cause (Cyber-Induced) | Consequence | Severity | Existing Safeguards | Recommended Safeguard |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| **NO** | Flow | No coolant flow | Pump mechanical seizure; power loss to pump | Ransomware bricks CDU PLC firmware; attacker sends pump-stop command via Modbus TCP | GPU junction temperatures exceed 100°C within 45 seconds. Hardware thermal shutdown. Potential permanent chip damage in high-density clusters. | **Catastrophic** | Thermal shutdown interlock on server BMC; redundant CDU (if provisioned) | IEC 62443-3-3 zone isolation preventing unauthorized write access to CDU controller; hardware write-protect on PLC firmware |
| **LESS** | Flow | Reduced coolant flow (below 80 LPM) | Partial valve closure; pump impeller degradation; air pocket in loop | Attacker sets VFD to 20% speed via unauthenticated Modbus write | Gradual thermal rise across cluster. GPU throttling reduces compute capacity by 40–60%. Undetected for minutes if telemetry is spoofed. | **Major** | Flow sensor alarm in BMS | Authenticated, cryptographically signed commands for VFD speed changes (IEC 62443-4-2 SL-2 minimum) |
| **MORE** | Temperature | Coolant supply exceeds 38°C | Primary chiller plant degradation; ambient temperature excursion | Attacker alters chilled water setpoint in BMS from 30°C to 45°C | Loss of cooling differential. GPUs throttle progressively. Full cluster shutdown if sustained beyond 5 minutes. | **Major** | High-temperature alarm; chiller redundancy | BMS setpoint changes require multi-factor authentication and audit logging |
| **REVERSE** | Flow | Reverse flow through cold plate channels | Check valve failure; incorrect pump wiring after maintenance | Attacker reverses VFD rotation direction | Coolant bypasses heat exchange surfaces. Thermal performance collapses. Cold plates may experience cavitation damage. | **Major** | Check valves; commissioning verification | VFD parameter lock (hardware jumper) preventing remote direction change |
| **AS WELL AS** | Composition | Coolant contamination (particulate, biological) | Corrosion products; biofilm growth; incorrect fluid used during maintenance | Attacker disables water treatment system dosing via BMS | Fouling of cold plate microchannels. Progressive loss of thermal performance. Long-term hardware corrosion. | **Moderate** | Water quality monitoring; filtration | Physical separation of water treatment controls from general BMS network |

#### Known Vulnerabilities Affecting Cooling Infrastructure

The following CVEs have been documented in variable frequency drives (VFDs) and cooling controllers commonly deployed in datacenter CDU and chiller systems. These vulnerabilities provide the cyber-induced attack paths identified in the HAZOP.

| CVE ID | CVSS | Affected Product | Attack Vector | Relevance to Node 1 |
|:---|:---|:---|:---|:---|
| CVE-2024-48510 | 9.8 | ABB Drive Composer | Path traversal → file system access | VFD programming software used for CDU pump drives |
| CVE-2024-56336 | 9.8 | Siemens SINAMICS S200 | Unlocked bootloader → full device compromise | VFD controlling cooling fans/pumps |
| CVE-2024-54678 | 8.2 | Siemens SINAMICS Startdrive | Deserialization → local code execution | Engineering software for drive configuration |
| CVE-2025-2595 | High | ABB AC500 V3 | Hard-coded credentials | PLC controlling CDU logic |
| CVE-2025-41659 | High | ABB AC500 V3 | Information disclosure | Telemetry exfiltration from cooling controllers |
| CVE-2025-41450 | High | Danfoss AK-SM 8xxA | Hard-coded credentials | Refrigeration/building controller (chiller interface) |

**Source:** NVD, CISA ICS-CERT, vendor advisories (2024–2025). See [CVE Research Appendix] for full details.

#### Standards References for Cooling Node

- **ASHRAE TC 9.9 (2021):** Thermal Guidelines for Data Processing Environments. Specifies allowable temperature ranges (A1–A4 classes). The design intent of 30°C ± 2°C supply aligns with ASHRAE A2 class (10–35°C inlet). [ASHRAE, 2021]
- **IEC 62443-3-2 Zone Model:** CDU controllers and VFDs should reside in **Zone 1 (BMS/HVAC)** with SL-T 2–3. Conduit C1-3 connects to fire/life safety zone. [IEC 62443-3-2, Clause 5.4]
- **IEC 62443-4-2 FR 3 (System Integrity):** VFD firmware updates must be signed and verified (CR 3.4). The TLStorm and SINAMICS bootloader vulnerabilities demonstrate the consequence of unsigned firmware. [IEC 62443-4-2, CR 3.4]

---

### Node 2: UPS Power Train — Distributed Block Redundant Configuration

**Design Intent:** Provide uninterrupted, conditioned 480V AC power to IT load during utility transitions, maintaining voltage within ±1% and frequency within ±0.5 Hz. Transfer time: zero (online double-conversion).

**Table 2.3: Guide Word - Parameter**

| Guide Word | Parameter | Deviation | Cause (Mechanical) | Cause (Cyber-Induced) | Consequence | Severity | Existing Safeguards | Recommended Safeguard |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| **NO** | Power Output | Total UPS output loss | Simultaneous inverter failure; DC bus fault | Logic bomb in NMC firmware commands all blocks to standby simultaneously | Total IT load loss. Revenue impact measured in millions per hour for hyperscale operators. | **Catastrophic** | Distributed block redundancy (4-to-3); static bypass | Require SL-2 certified NMC (Schneider NMC3, Vertiv RDU120, Eaton NETWORK-M3); network segmentation isolating UPS management from general IT |
| **LESS** | Voltage | Output undervoltage (below 460V) | Rectifier degradation; battery string imbalance | Attacker alters output voltage parameters via NMC web interface using default credentials | Server power supplies may ride through minor undervoltage. Sustained undervoltage causes erratic server behaviour, data corruption, unexpected reboots. | **Major** | UPS voltage regulation feedback loop; server PSU wide-input-range design | Mandatory credential rotation; disable HTTP on NMC; restrict management to out-of-band network |
| **REVERSE** | Power Flow | Reverse power flow during transfer | ATS logic error during grid-to-generator transition; phase sequence mismatch | Attacker manipulates ATS transfer logic during brownout via compromised SCADA | Phase collision between utility and generator. Catastrophic electrical short. Destruction of ATS and upstream switchgear. Arc flash hazard to personnel. | **Catastrophic** | Mechanical interlocks; phase-sequence verification relays | Air-gap ATS control logic from network; mechanical interlock as primary (not software-only) protection |
| **MORE** | Battery Discharge Rate | Excessive battery drain while on utility | Battery management system calibration drift | Attacker commands UPS to cycle batteries (discharge/charge) continuously via NMC, degrading battery health over weeks | Reduced battery runtime when genuinely needed. During actual utility outage, batteries fail to provide specified bridge time. Generator start-up gap. | **Major** | Battery health monitoring; scheduled test cycles | Anomaly detection on battery cycling frequency; UPS management isolated on dedicated VLAN |

#### Known Vulnerabilities Affecting Power Infrastructure

The following CVEs have been documented in UPS network management cards (NMCs), automatic transfer switches (ATS), and power monitoring platforms. These vulnerabilities provide the cyber-induced attack paths identified in the HAZOP.

| CVE ID | CVSS | Affected Product | Attack Vector | Relevance to Node 2 |
|:---|:---|:---|:---|:---|
| CVE-2022-22805 | 9.8 | APC Smart-UPS (TLStorm) | TLS bypass → firmware manipulation | NMC compromise leading to UPS output manipulation |
| CVE-2022-22806 | 9.8 | APC Smart-UPS (TLStorm) | Firmware signature bypass | Unauthorized firmware upload to NMC |
| CVE-2022-0715 | 9.1 | APC Smart-UPS (TLStorm) | Memory corruption → RCE | Remote code execution on NMC |
| CVE-2025-1058 | 8.7 | ASCO 5310/5350 Remote Annunciator | Code download without integrity check | ATS status manipulation |
| CVE-2025-1060 | High | ASCO 5310/5350 | Cleartext transmission of sensitive info | Credential theft for ATS control |
| CVE-2025-1070 | High | ASCO 5310/5350 | Unrestricted file upload | Device manipulation via ATS annunciator |
| CVE-2025-22495 | 8.4 | Eaton Network-M2 Card | NTP config command injection | RCE on UPS management card |
| CVE-2025-59887 | 8.6 | Eaton UPS Companion | DLL hijacking | Code execution during software install |
| CVE-2025-46412 | Critical | Vertiv UPS Management Cards | Authentication bypass | Unauthorized access to UPS controls |
| CVE-2025-41426 | Critical | Vertiv UPS Management Cards | Stack buffer overflow → code execution | Full compromise of UPS management |
| CVE-2025-50121–50125 | Critical | Schneider EcoStruxure IT DCE | OS command injection, RCE | DCIM platform compromise affecting power monitoring |

**Source:** NVD, CISA ICS-CERT, vendor advisories (2022–2025). See [CVE Research Appendix] for full details.

#### Standards References for Power Node

- **NFPA 855 (2023):** Standard for the Installation of Stationary Energy Storage Systems. Applies to battery rooms and UPS battery strings. Requires thermal runaway detection and ventilation. [NFPA, 2023]
- **UL 9540A (2024):** Test Method for Evaluating Thermal Runaway Fire Propagation in Battery Energy Storage Systems. Relevant for lithium-ion UPS batteries. [UL, 2024]
- **IEC 62443-3-2 Zone Model:** UPS controllers, NMCs, and ATS should reside in **Zone 2 (Electrical)** with SL-T 3. Conduit C2-4 connects to substation zone. [IEC 62443-3-2, Clause 5.4]
- **IEC 62443-4-2 FR 1 (Identification & Authentication):** NMCs must enforce strong password policies (CR 1.7) and lockout after failed attempts (CR 1.11). Default "apc" credentials are a known exploitation vector. [IEC 62443-4-2, CR 1.7, CR 1.11]
- **IEC 62443-4-2 FR 7 (Resource Availability):** UPS controllers must resist DoS attacks (CR 7.1). The TLStorm vulnerabilities demonstrated that NMC firmware can be bricked remotely, violating FR 7. [IEC 62443-4-2, CR 7.1]

---

### Node 3: BMS Control Network — Setpoint and Alarm Management

**Design Intent:** Maintain environmental parameters (temperature, humidity, airflow) within ASHRAE-recommended ranges. Generate alarms for out-of-tolerance conditions. Provide coordinated control across cooling, power, and fire suppression systems.

**Table 2.4: Guide Word - Parameter**

| Guide Word | Parameter | Deviation | Cause (Mechanical) | Cause (Cyber-Induced) | Consequence | Severity | Existing Safeguards | Recommended Safeguard |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| **OTHER THAN** | Command | Unexpected command to fire suppression system | Wiring fault; sensor cross-talk; human error during maintenance | Attacker sends fire suppression activation command through compromised BMS | Clean agent discharge in data hall. Emergency Power Off (EPO) sequence triggered. Total facility shutdown. Clean-up and re-commissioning measured in days. | **Catastrophic** | Two-stage alarm (pre-action); manual confirmation for suppression release | Physical interlock requiring manual arm before electronic activation; fire system on isolated network segment |
| **NO** | Alarm | No alarm generated for high-temperature condition | Sensor failure; alarm threshold misconfiguration | Attacker suppresses alarms in BMS while simultaneously manipulating cooling setpoints | Operators unaware of rising temperatures. Equipment damage occurs before human intervention. | **Major** | Redundant sensors; alarm acknowledgment procedure | Alarm suppression events must generate independent audit trail; BMS alarm handling must be monitored by separate SIEM |
| **MORE** | Setpoint | Cooling setpoint raised above safe limit | Operator error; failed temperature sensor | Attacker modifies BMS setpoint for all CRAC units to 40°C | Gradual thermal rise across data hall. Server inlet temperatures exceed ASHRAE A2 limits. Throttling and potential shutdown. | **Major** | High-temperature alarms; manual override | Setpoint changes require two-person rule; BMS write access restricted to authenticated sessions only |
| **AS WELL AS** | Communication | Unauthorized device joins BMS network | Rogue sensor installation; maintenance laptop left connected | Attacker connects malicious BACnet device to BMS network | Rogue device can issue commands, suppress alarms, or exfiltrate data. Full BMS compromise possible. | **Major** | MAC address filtering; physical port security | 802.1X network access control on BMS switch ports; BACnet/SC with certificate-based authentication |
| **REVERSE** | Data Flow | Telemetry data spoofed or replayed | Sensor degradation; wiring fault | Attacker replays old temperature data to mask actual thermal conditions | Operators believe conditions are normal while actual temperatures rise. Delayed response leads to equipment damage. | **Major** | Sensor cross-validation; manual walkthroughs | Cryptographic integrity checks on sensor data (BACnet/SC); anomaly detection on telemetry patterns |

#### Known Vulnerabilities Affecting BMS Platforms

The following CVEs have been documented in BMS controllers, supervisory software, and building automation protocols. These vulnerabilities provide the cyber-induced attack paths identified in the HAZOP.

| CVE ID | CVSS | Affected Product | Attack Vector | Relevance to Node 3 |
|:---|:---|:---|:---|:---|
| CVE-2025-26385 | **10.0** | Johnson Controls Metasys ADS/ADX | SQL injection → remote command execution | Full BMS server compromise; ability to issue any BACnet command |
| CVE-2025-3936 | 9.8 | Honeywell Niagara Framework (JACE) | Authentication bypass | Unauthorized access to BMS controllers |
| CVE-2025-3937 | 9.8 | Honeywell Niagara Framework | Default credentials | Direct access to BMS configuration |
| CVE-2025-3938 | 9.8 | Honeywell Niagara Framework | MiTM via disabled encryption | Interception and modification of BMS traffic |
| CVE-2025-3941 | 9.8 | Honeywell Niagara Framework | Information disclosure | Exfiltration of BMS topology and setpoints |
| CVE-2025-3944 | 9.8 | Honeywell Niagara Framework | Valid accounts compromise | Privilege escalation within BMS |
| CVE-2025-47809 | 8.2 | Siemens Desigo CC (CodeMeter) | Privilege escalation | Unprivileged user → admin on BMS server |
| CVE-2024-23815 | 7.5 | Siemens Desigo CC | Missing authentication | Unauthenticated SQL queries on event port |
| CVE-2026-1226 | High | Schneider EcoStruxure Building Operation | XXE injection | Server-side request forgery; data exfiltration |
| CVE-2026-1227 | High | Schneider EcoStruxure Building Operation | Improper code generation | Remote code execution on BMS workstation |
| CVE-2025-8449 | Medium | Schneider EcoStruxure Building Operation | Resource exhaustion → DoS | BMS unavailability during attack |

**Source:** NVD, CISA ICS-CERT, vendor advisories (2024–2026). See [CVE Research Appendix] for full details.

#### Protocol-Level Vulnerabilities

BACnet/IP and Modbus TCP, the dominant protocols in datacenter BMS networks, are insecure by design. The following table summarises the inherent risks.

| Vulnerability Class | Protocol | Risk Level | Description | MITRE ATT&CK ICS Technique |
|:---|:---|:---|:---|:---|
| No Authentication | BACnet/IP, Modbus TCP | **Critical** | Any network-adjacent actor can issue commands to physical equipment | T0830 (Adversary-in-the-Middle) |
| No Encryption | BACnet/IP, Modbus TCP | **Critical** | All traffic visible in cleartext — setpoints, alarms, sensor data | T0882 (Theft of Operational Info) |
| No Integrity Checking | BACnet/IP, Modbus TCP | **High** | Commands can be spoofed or modified in transit | T0830 (Adversary-in-the-Middle) |
| Broadcast Discovery | BACnet/IP | **Medium** | BACnet "Who-Is" broadcasts reveal all devices and object properties | T0802 (Automated Collection) |
| Default Device Passwords | Both | **High** | Many BAS controllers ship with default/no credentials | T0812 (Default Credentials) |

**Mitigation:** Deploy BACnet/SC (Secure Connect) with TLS encryption and certificate-based authentication for new deployments. Use protocol-aware firewalls with deep packet inspection for BACnet/Modbus traffic. Strict OT network segmentation — not VLANs on shared switches. Implement OT-specific continuous monitoring (e.g., Nozomi, Claroty, Dragos). [CISA, 2024; IEC 62443-3-2]

#### Standards References for BMS Node

- **NFPA 75 (2020):** Standard for the Protection of Information Technology Equipment. Requires fire suppression systems to have independent manual release capability. The HAZOP finding on BMS-to-fire-suppression interface directly violates NFPA 75 §8.3.2. [NFPA, 2020]
- **NFPA 76 (2020):** Standard for the Fire Protection of Telecommunications Facilities. Specifies pre-action sprinkler and clean-agent system requirements. [NFPA, 2020]
- **IEC 62443-3-2 Zone Model:** BMS controllers and supervisory servers should reside in **Zone 1 (BMS/HVAC)** with SL-T 2–3. Fire/life safety systems in **Zone 3** with SL-T 3. Conduit C1-3 must enforce strict access control. [IEC 62443-3-2, Clause 5.4]
- **IEC 62443-4-2 FR 5 (Restricted Data Flow):** BMS network must be segmented from enterprise IT (CR 5.1). BACnet/SC provides encrypted conduits (CR 5.2). [IEC 62443-4-2, CR 5.1, CR 5.2]
- **EN 50600-2-1 (2021):** Datacenter facility infrastructure — power distribution. References BMS integration requirements. [EN 50600, 2021]
- **ISO 22237 (2021):** Datacenter facilities and infrastructures. Provides classification framework for availability, security, and energy efficiency. [ISO, 2021]

---

## 3. Supporting Vulnerability Data

### 3.1 ISASecure Certified Products Gap

The ISASecure certification program (administered by ISA Security Compliance Institute) provides component-level security assurance under IEC 62443-4-2. As of 2025, the following datacenter OT products are **not** certified, representing a significant security gap.

| Asset Type | Typical Vendors | ISASecure Status | Risk Implication |
|:---|:---|:---|:---|
| UPS Network Management Cards | Vertiv (Liebert), Schneider (APC), Eaton | **Not certified** | No independent verification of FR1–FR7 compliance |
| BMS Controllers (DC-specific) | Schneider (EBO), Siemens (Desigo CC), JCI (Metasys) | Vendor SDLA only; no product-level CSA | Component-level vulnerabilities unaddressed |
| CDU/Coolant Distribution PLCs | Vertiv, Motivair, CoolIT | **Not certified** | No assurance of secure boot or firmware integrity |
| EPMS Meters | Schneider (ION series), GE/Danaher | **Not certified** | Telemetry manipulation risk |
| VFDs (Chiller/Pump Drives) | ABB, Siemens, Danfoss, Nidec | **Not certified** | Drive-level RCE vulnerabilities documented |

**Source:** ISASecure Certified Products Registry (https://isasecure.org/certification/certified-products). Accessed 2025-06-13.

### 3.2 Ransomware Threat Context

The Johnson Controls Dark Angels ransomware attack (September 2023) is directly relevant to BMS security in datacenters.

| Attribute | Detail |
|:---|:---|
| Threat Actor | Dark Angels |
| Initial Access | JCI Asia-Pacific offices |
| Dwell Time | 8 months (Feb 1 – Sep 30, 2023) |
| Data Exfiltrated | 27 TB — including ICS designs, building floor plans, trade secrets |
| Financial Impact | $27M+ in incident response, remediation, lost revenue |
| Individuals Affected | 76 million households, 7 million small businesses |
| Products Impacted | Corporate IT infrastructure; OpenBlue/Metasys digital products reportedly not impacted |

**Relevance:** This attack demonstrates that BMS vendors are high-value targets. Exfiltrated building floor plans and ICS design documents could enable physical attacks against datacenter customers. [CISA, 2023; JCI Trust Center, 2025]

---

## 4. Standards Integration Matrix

The following table maps each HAZOP node to relevant standards and recommended security levels.

| Node | Primary Standard | Zone (IEC 62443-3-2) | SL-T | Key Requirements |
|:---|:---|:---|:---|:---|
| CDU Cooling Loop | ASHRAE TC 9.9; IEC 62443-4-2 | Zone 1 (BMS/HVAC) | 2–3 | FR 3 (System Integrity) for VFD firmware; FR 1 (IAC) for PLC access |
| UPS Power Train | NFPA 855; UL 9540A; IEC 62443-4-2 | Zone 2 (Electrical) | 3 | FR 7 (Resource Availability) for NMC; FR 1 (IAC) for credential management |
| BMS Control Network | NFPA 75/76; EN 50600; ISO 22237; IEC 62443-3-2 | Zone 1 (BMS) + Zone 3 (Fire) | 2–3 | FR 5 (Restricted Data Flow) for network segmentation; FR 6 (TRE) for alarm integrity |
| Fire Suppression Interface | NFPA 75 §8.3.2; NFPA 76 | Zone 3 (Fire/Life Safety) | 3 | Hardwired interlock required; network path must be secondary |
| Battery Energy Storage | NFPA 855; UL 9540A | Zone 6 (BESS) | 3 | Thermal runaway detection; ventilation; fire suppression integration |

---

## 5. Conclusion

The HAZOP analysis of three critical OT nodes in a hyperscale datacentre reveals that cyber-induced deviations can produce consequences equal to or exceeding mechanical failures. The CDU cooling loop, UPS power train, and BMS supervisory network each have documented CVEs that provide the attack paths identified in the guide word analysis. The shared BMS control plane creates a cascading risk: a single compromised BMS controller can affect cooling, power, and fire suppression systems simultaneously.

The recommended safeguards align with IEC 62443-3-2 zone and conduit requirements and IEC 62443-4-2 component security requirements. The most urgent remediation is the installation of hardwired interlocks on fire suppression release circuits, as demonstrated in the field observation. Network segmentation, credential management, and firmware integrity verification follow as priority actions.

The datacentre industry must adopt structured hazard identification methods — HAZOP, CHAZOP, or equivalent — as standard practice during design and commissioning. The cost of the analysis is negligible compared to the consequence of an unmitigated cyber-physical failure.

---

## References

1. IEC 61882:2016 — Hazard and operability studies (HAZOP studies) — Application guide.
2. IEC 62443-3-2:2020 — Security for industrial automation and control systems — Part 3-2: Security risk assessment for system design.
3. IEC 62443-4-2:2019 — Security for industrial automation and control systems — Part 4-2: Technical security requirements for IACS components.
4. ASHRAE TC 9.9 (2021) — Thermal Guidelines for Data Processing Environments.
5. NFPA 75 (2020) — Standard for the Protection of Information Technology Equipment.
6. NFPA 76 (2020) — Standard for the Fire Protection of Telecommunications Facilities.
7. NFPA 855 (2023) — Standard for the Installation of Stationary Energy Storage Systems.
8. UL 9540A (2024) — Test Method for Evaluating Thermal Runaway Fire Propagation in Battery Energy Storage Systems.
9. EN 50600-2-1 (2021) — Information technology — Datacenter facilities and infrastructures — Part 2-1: Building construction.
10. ISO 22237 (2021) — Information technology — Datacenter facilities and infrastructures.
11. CISA ICS-CERT Advisories (2024–2026): ICSA-26-027-04 (Johnson Controls Metasys), ICSA-25-322-04 (Schneider PowerChute), ICSA-25-219-02 (Johnson Controls FX80/FX90).
12. BARR Engineering (2022) — TLStorm: Critical Vulnerabilities in APC Smart-UPS.
13. Nozomi Networks (2025) — Honeywell Niagara Framework Vulnerability Disclosure.
14. Trellix (2022) — HID Mercury Controller Vulnerabilities.
15. Johnson Controls Trust Center (2025) — Dark Angels Ransomware Incident Report.
16. ISASecure Certified Products Registry (2025) — https://isasecure.org/certification/certified-products.

---

## Appendix: CVE Research Summary

The following table summarises all CVEs referenced in this chapter, grouped by node.

| Node | CVE ID | CVSS | Vendor | Product | Year |
|:---|:---|:---|:---|:---|:---|
| Cooling | CVE-2024-48510 | 9.8 | ABB | Drive Composer | 2024 |
| Cooling | CVE-2024-56336 | 9.8 | Siemens | SINAMICS S200 | 2024 |
| Cooling | CVE-2024-54678 | 8.2 | Siemens | SINAMICS Startdrive | 2024 |
| Cooling | CVE-2025-2595 | High | ABB | AC500 V3 | 2025 |
| Cooling | CVE-2025-41659 | High | ABB | AC500 V3 | 2025 |
| Cooling | CVE-2025-41450 | High | Danfoss | AK-SM 8xxA | 2025 |
| Power | CVE-2022-22805 | 9.8 | Schneider APC | Smart-UPS (TLStorm) | 2022 |
| Power | CVE-2022-22806 | 9.8 | Schneider APC | Smart-UPS (TLStorm) | 2022 |
| Power | CVE-2022-0715 | 9.1 | Schneider APC | Smart-UPS (TLStorm) | 2022 |
| Power | CVE-2025-1058 | 8.7 | Schneider ASCO | 5310/5350 Annunciator | 2025 |
| Power | CVE-2025-1060 | High | Schneider ASCO | 5310/5350 Annunciator | 2025 |
| Power | CVE-2025-1070 | High | Schneider ASCO | 5310/5350 Annunciator | 2025 |
| Power | CVE-2025-22495 | 8.4 | Eaton | Network-M2 Card | 2025 |
| Power | CVE-2025-59887 | 8.6 | Eaton | UPS Companion | 2025 |
| Power | CVE-2025-46412 | Critical | Vertiv | UPS Management Cards | 2025 |
| Power | CVE-2025-41426 | Critical | Vertiv | UPS Management Cards | 2025 |
| Power | CVE-2025-50121–50125 | Critical | Schneider | EcoStruxure IT DCE | 2025 |
| BMS | CVE-2025-26385 | 10.0 | Johnson Controls | Metasys ADS/ADX | 2025 |
| BMS | CVE-2025-3936 | 9.8 | Honeywell | Niagara Framework | 2025 |
| BMS | CVE-2025-3937 | 9.8 | Honeywell | Niagara Framework | 2025 |
| BMS | CVE-2025-3938 | 9.8 | Honeywell | Niagara Framework | 2025 |
| BMS | CVE-2025-3941 | 9.8 | Honeywell | Niagara Framework | 2025 |
| BMS | CVE-2025-3944 | 9.8 | Honeywell | Niagara Framework | 2025 |
| BMS | CVE-2025-47809 | 8.2 | Siemens | Desigo CC | 2025 |
| BMS | CVE-2024-23815 | 7.5 | Siemens | Desigo CC | 2024 |
| BMS | CVE-2026-1226 | High | Schneider | EcoStruxure Building Operation | 2026 |
| BMS | CVE-2026-1227 | High | Schneider | EcoStruxure Building Operation | 2026 |
| BMS | CVE-2025-8449 | Medium | Schneider | EcoStruxure Building Operation | 2025 |

**Last updated:** 2025-06-13 | **Next review:** Quarterly or upon CISA KEV additions.