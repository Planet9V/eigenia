# CyHAZOPs — System-Level Drill-Down and Hazard Registers

## Chapter 9: Node Analysis — Power, Cooling, Controls, and Safety

## Abstract

This chapter provides worked hazard log entries for six high-consequence CyHAZOPs nodes: UPS power conversion, central chiller plant, CDU/TCS, BMS supervisory, fire detection/suppression, and server BMC. The cross-node RPN ranking confirms that the SPOOFED guide word produces the highest cyber RPNs across all nodes — meaning telemetry integrity is the single most valuable security property in hyperscale OT. The CDU (Node N6) remains the highest-priority target, with a maximum cyber RPN of 294 and a cyber multiplier of 13.4× over its mechanical equivalent.

## Practitioner's Note

This chapter is the field guide. Each section takes a single CyHAZOPs node, explains the system and its critical components, applies guide words to identify deviations, and produces hazard log entries with dual RPN scores. This is what the CyHAZOPs workshop produces — adapted here for the hyperscale reference architecture as a worked example.

I have selected the six highest-consequence nodes for detailed analysis. The remaining eight nodes follow the same methodology and would be completed during a live engagement.

### Field Observation

In a CyHAZOPs workshop for a North American hyperscale operator in early 2025, the team applied the SPOOFED guide word to Node N6 (CDU). The controls engineer explained that the BMS received CDU supply and return temperature readings via Modbus register reads. These readings drove the BMS's automatic setpoint adjustments to the chiller plant. When asked whether the BMS validated these readings against an independent measurement, the answer was no — the CDU's onboard sensors were the sole source of truth. The SPOOFED scenario became clear: an attacker who could write to the CDU's Modbus holding registers could report artificially low return temperatures to the BMS while simultaneously increasing the actual supply temperature. The BMS, seeing low return temperatures, would reduce chiller output — amplifying the thermal excursion instead of correcting it. The operator's thermal alarm would not fire until physical temperatures exceeded the independent high-temperature trip point, by which time GPU throttling would already have begun. The dual-RPN score for this scenario — Severity 9, Occurrence-Cyber 7, Detection-Cyber 4.67 — produced a cyber RPN of 294, the highest in the entire hazard log.

---

## Node N2: UPS Power Conversion (Distributed Block)

### System Description

Modern hyperscale facilities deploy distributed block UPS architectures — multiple 1–1.25 MW modular UPS frames (Schneider Galaxy VX, Vertiv EXL S1, Eaton 93PM) in a "catcher" topology (e.g., 4-block serving 3-block load). Each frame contains an IGBT-based double-conversion power stage, a Li-ion or VRLA battery string, and a Network Management Card (NMC) providing SNMP v3, Modbus TCP, and HTTPS management.

### Critical Items List

**Table 9.2: Critical Items List**

| Component | Function | OT Interface | SL-A | Failure Mode |
|:---|:---|:---|:---|:---|
| UPS power stage | Double conversion AC→DC→AC | None (power electronics) | N/A | Hardware failure; bypass activation |
| UPS NMC (Schneider NMC3) | Remote monitoring/control | SNMP v3, Modbus TCP, HTTPS | **SL-2** | Firmware compromise → remote power control |
| Battery management system | Charge/discharge management; cell balancing | Modbus to NMC | None | Overcharge → thermal runaway (Li-ion) |
| Static bypass switch | Bypass UPS for maintenance | Hardware + NMC command | N/A | Premature bypass → unprotected load |
| Maintenance bypass | Mechanical bypass for UPS service | Physical switch | N/A | Physical attack vector |

### CyHAZOPs Hazard Log — Node N2

**Table 9.3: CyHAZOPs Hazard Log — Node N2**

| ID | Guide Word | Parameter | Deviation | Cyber Cause | MITRE | Consequence | S | O-C | D-C | RPN-C | Table | SL-T |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| N2-CY-001 | **NO** | Power output | All UPS blocks offline simultaneously | Ransomware encrypts all NMC firmware via shared VLAN | T0826 | Total IT load loss; generator start delay 10–15s (load survives on stored energy only) | 9 | 4 | 6 | **216** | B | SL-2 |
| N2-CY-002 | **COORDINATED** | Power output | All blocks forced to bypass simultaneously | Attacker sends bypass command via Modbus TCP to all NMCs | T0858 | IT load on raw utility power; no UPS protection; vulnerability to utility sag/surge | 8 | 5 | 5 | **200** | B | SL-2 |
| N2-CY-003 | **SPOOFED** | Battery SOC | False battery state-of-charge reporting | Attacker modifies SOC register to report 100% when depleted | T0856 | Operator believes battery backup is available; next utility event → unprotected load drop | 9 | 3 | 8 | **216** | B | SL-2 |
| N2-CY-004 | **MORE** | Charge voltage | Overcharge of Li-ion battery string | Attacker modifies charge voltage setpoint via BMS Modbus | T0836 | Thermal runaway; fire; toxic gas; EPO activation | 10 | 2 | 7 | **140** | B | SL-3 |
| N2-CY-005 | **PERSISTED** | Firmware | NMC firmware contains persistent implant | Supply chain compromise of NMC firmware image | T0839 | Implant survives factory reset; attacker maintains persistent access | 8 | 2 | 9 | **144** | B | SL-3 |

### Safeguards and Investment

**Table 9.4: Safeguards and Investment**

| Hazard | Safeguard | Priority | Cost |
|:---|:---|:---|:---|
| N2-CY-001/002 | Isolate NMCs on dedicated management VLAN; segment blocks A/B onto separate VLANs | P1 | $50K |
| N2-CY-003 | Independent battery monitoring (not via NMC); physical battery load test schedule | P2 | $20K |
| N2-CY-004 | Hardwired BMS overvoltage protection relay (SIL-2); independent of software setpoint | P1 | $30K per string |
| N2-CY-005 | Specify SL-2 certified NMC in procurement; validate firmware hash against vendor baseline | P2 | $0 incremental |

### Vulnerability Research — UPS NMC and Battery Management

The following CVEs affect UPS network management cards and battery systems commonly deployed in hyperscale facilities. These vulnerabilities directly enable the cyber causes listed in Table 9.3.

**Table 9.4a: Known CVEs — UPS NMC and Battery Systems**

| CVE ID | CVSS | Affected Product | Vulnerability Type | Relevance to Hazard | Disclosure |
|:---|:---|:---|:---|:---|:---|
| CVE-2022-22805 | 9.8 | APC Smart-UPS NMC (TLStorm) | TLS bypass, firmware signing bypass | Enables N2-CY-005 (persistent firmware implant) | Mar 2022 [NVD] |
| CVE-2022-22806 | 9.8 | APC Smart-UPS NMC (TLStorm) | Authentication bypass | Enables N2-CY-001/002 (remote power control) | Mar 2022 [NVD] |
| CVE-2022-0715 | 9.1 | APC Smart-UPS NMC (TLStorm) | Firmware validation bypass | Enables N2-CY-005 | Mar 2022 [NVD] |
| CVE-2025-46412 | Critical | Vertiv UPS Management Cards | Authentication bypass | Enables N2-CY-001/002 | 2025 [Vertiv Security Center] |
| CVE-2025-41426 | Critical | Vertiv UPS Management Cards | Stack-based buffer overflow → RCE | Enables N2-CY-005 | 2025 [Vertiv Security Center] |
| CVE-2025-22495 | 8.4 | Eaton Network-M2 Card | Command injection via NTP config | Enables N2-CY-001/002 | Feb 2025 [Eaton Advisory] |
| CVE-2025-59887 | 8.6 | Eaton UPS Companion (EUC) | DLL hijacking → arbitrary code execution | Enables N2-CY-005 | Dec 2025 [ETN-VA-2025-1026] |
| CVE-2024-10511 | 6.3 | Schneider PowerChute Serial Shutdown | Account lockout DoS | Enables N2-CY-001 (denial of monitoring) | Nov 2024 [ICSA-25-322-04] |

**Key Context:** The TLStorm vulnerabilities (CVE-2022-22805/22806/0715) remain widely unpatched in field deployments. Default "apc" credentials persist on many NMC2 cards. NMC2 is end-of-life; migration to NMC3 is recommended [Schneider Electric, 2023].

### Standards Mapping — Node N2

**IEC 62443-3-2 Zone Assignment:** Node N2 assets belong to **Zone 2: Electrical** (EPMS, UPS, STS, PDUs, Generators, ATS). Recommended SL-T per zone: SL 3 for UPS controls and battery management [IEC 62443-3-2, Clause 5].

**Conduit Requirements:** The UPS NMC communicates with the BMS (Zone 1) and EPMS (Zone 2) via Modbus TCP and SNMP. Per IEC 62443-3-2, conduit C2-4 (Electrical → Substation) and C0-2 (Enterprise IT → Electrical) require industrial firewalls with deep packet inspection. Unidirectional gateways are preferred for telemetry from Zone 2 to Zone 0 [IEC 62443-3-2, Clause 5.4].

**NFPA 855 / UL 9540A:** Li-ion battery strings (Node N2-CY-004) must comply with NFPA 855 for energy storage systems. Overvoltage protection relays (SIL-2) are required independent of software setpoints [NFPA 855, 2023 Edition, Section 4.3].

---

## Node N5: Central Chiller Plant and Heat Rejection

### System Description

The central plant generates chilled water for the Facility Water System (FWS). A 100 MW hyperscale campus requires 8,000–15,000 tons of cooling capacity, typically deployed as 6–12 centrifugal chillers (750–1,500 ton each) with N+1 redundancy. Cooling towers (BAC, Evapco, SPX/Marley) reject heat to atmosphere. Variable-speed hydronic pumps (Grundfos, Armstrong, Xylem) with ABB/Danfoss/Siemens VFDs circulate chilled water.

The chiller plant controller (JCI York, Trane Tracer SC, or standalone BMS DDC) manages staging logic — the sequence in which chillers start, stop, and load/unload based on cooling demand.

### Critical Items List

**Table 9.5: Critical Items List**

| Component | Function | OT Interface | SL-A | Failure Mode |
|:---|:---|:---|:---|:---|
| Centrifugal chiller (York YZ/Trane CTV) | Generate chilled water | BACnet/IP controller | **SL-1** (York only) | Compressor trip → capacity reduction |
| Chiller plant optimiser | Staging, sequencing, setpoint | BACnet/IP to BMS | None | Wrong staging → insufficient capacity |
| Cooling tower (BAC/Evapco) | Heat rejection to atmosphere | Modbus/Profibus VFD | None | Fan failure → condenser pressure rise |
| Primary CHW pump + VFD | Circulate chilled water | Modbus RTU/TCP | None | Pump failure → flow loss |
| Condenser water pump + VFD | Circulate condenser water | Modbus RTU/TCP | None | Pump failure → chiller trip |
| CHW supply temperature sensor (TT) | Measure supply temperature | Analog 4–20 mA to DDC | N/A | Drift → incorrect staging |
| Motorised isolation valves (FCV) | Isolate individual chillers | BACnet/Modbus from BMS | None | Valve stuck → cannot isolate |

### CyHAZOPs Hazard Log — Node N5

**Table 9.6: CyHAZOPs Hazard Log — Node N5**

| ID | Guide Word | Parameter | Deviation | Cyber Cause | MITRE | Consequence | S | O-C | D-C | RPN-C | Table | SL-T |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| N5-CY-001 | **NO** | Chilled water flow | All CHW pumps offline | Attacker sends stop command to all pump VFDs via Modbus TCP | T0855 | Zero cooling capacity; data hall temperature rise; GPU throttling in 2–5 min; shutdown in 10–15 min | 10 | 3 | 5 | **150** | B | SL-2 |
| N5-CY-002 | **MORE** | CHW supply temp | Supply temperature raised above design basis | Attacker modifies chiller leaving water setpoint from 7°C to 20°C | T0836 | Insufficient cooling; CDUs cannot maintain TCS temperature; gradual thermal drift in data halls | 8 | 5 | 4 | **160** | B | SL-2 |
| N5-CY-003 | **SPOOFED** | CHW supply temp | Operator sees 7°C while actual is 20°C | Attacker intercepts BACnet sensor value; spoofs normal reading to BMS | T0856 | Operator unaware of thermal drift; damage occurs before detection | 9 | 3 | 9 | **243** | B | SL-3 |
| N5-CY-004 | **COORDINATED** | Chiller + tower | All chillers tripped AND cooling tower fans disabled | Simultaneous BACnet commands to chiller controllers and tower VFDs | T0831 | Complete loss of heat rejection; no cooling capacity; campus-wide thermal emergency | 10 | 2 | 6 | **120** | B | SL-3 |
| N5-CY-005 | **REVERSE** | Staging logic | Chillers unloaded during peak demand | Attacker modifies plant optimiser demand signal | T0836 | Capacity removed when most needed; thermal excursion during peak AI training load | 8 | 4 | 6 | **192** | B | SL-2 |

### Safeguards and Investment

**Table 9.7: Safeguards and Investment**

| Hazard | Safeguard | Priority | Cost |
|:---|:---|:---|:---|
| N5-CY-001 | VFD Modbus write-enable controlled by physical keyswitch; remote write disabled by default | P1 | $5K per VFD |
| N5-CY-002/003 | Independent hardwired temperature alarm at CDU intake; bypasses BMS; alerts NOC directly | P1 | $100K per campus |
| N5-CY-004 | Chiller plant and cooling towers on separate OT VLANs; compromise of one cannot reach other | P1 | $50K |
| N5-CY-005 | Manual chiller staging override physically available at plant room panel; not network-accessible | P2 | $20K |

### Vulnerability Research — Chiller Plant VFDs and Controllers

The following CVEs affect VFDs and chiller controllers commonly used in central plant cooling. These vulnerabilities directly enable the cyber causes in Table 9.6.

**Table 9.7a: Known CVEs — Chiller Plant VFDs and Controllers**

| CVE ID | CVSS | Affected Product | Vulnerability Type | Relevance to Hazard | Disclosure |
|:---|:---|:---|:---|:---|:---|
| CVE-2024-48510 | 9.8 | ABB Drive Composer | Path traversal → file system access | Enables N5-CY-001 (VFD stop command) | 2024 [ABB PSIRT] |
| CVE-2024-56336 | 9.8 | Siemens SINAMICS S200 | Unlocked bootloader → full device compromise | Enables N5-CY-001/002 | Mar 2025 [Siemens ProductCERT] |
| CVE-2024-54678 | 8.2 | Siemens SINAMICS Startdrive | Deserialization → code execution | Enables N5-CY-005 (staging logic manipulation) | 2024 [Siemens ProductCERT] |
| CVE-2025-2595 | High | ABB AC500 V3 | Hard-coded credentials | Enables N5-CY-001/002 | 2025 [CISA Advisory] |
| CVE-2025-26385 | 10.0 | Johnson Controls Metasys ADS/ADX | SQL injection → remote command execution | Enables N5-CY-002/003/005 (chiller setpoint manipulation via BMS) | Jan 2026 [ICSA-26-027-04] |
| CVE-2025-3936 | 9.8 | Honeywell Niagara Framework (JACE) | Authentication bypass | Enables N5-CY-003 (BACnet spoofing) | Jul 2025 [NVD] |
| CVE-2025-3941 | 9.8 | Honeywell Niagara Framework | Information disclosure | Enables N5-CY-003 (telemetry interception) | Jul 2025 [NVD] |

**Key Context:** The Johnson Controls Metasys CVE-2025-26385 (CVSS 10.0) is the highest-severity vulnerability affecting chiller plant control. York chillers integrated via Metasys ADS/ADX inherit this vulnerability. The Honeywell Niagara vulnerabilities (13 total, July 2025) enable full man-in-the-middle compromise of BMS controllers if encryption is disabled [Nozomi Networks, 2025].

### Standards Mapping — Node N5

**IEC 62443-3-2 Zone Assignment:** Node N5 assets belong to **Zone 1: BMS/HVAC** (chillers, AHUs, CRAHs, CDUs, pumps, VFDs). Recommended SL-T: SL 2 for field devices, SL 3 for chiller plant optimiser and BMS supervisory controllers [IEC 62443-3-2, Clause 5].

**Conduit Requirements:** Conduit C0-1 (Enterprise IT → BMS) must enforce BACnet/SC (Secure Connect) with TLS encryption for all setpoint and telemetry traffic. Conduit C1-3 (BMS → Fire/Life Safety) should use hardwired interlocks for critical alarms [IEC 62443-3-2, Clause 5.4].

**ASHRAE TC 9.9:** Thermal guidelines for data centers specify maximum allowable supply temperatures and temperature gradients. For liquid-cooled facilities, ASHRAE TC 9.9 (2021) defines Class W1–W4 coolant temperature ranges. The SPOOFED scenario (N5-CY-003) violates the requirement for independent temperature verification at the rack inlet [ASHRAE TC 9.9, 2021 Edition, Section 6.2].

**NFPA 75/76:** Fire protection for IT equipment areas. NFPA 75 (2020) requires automatic fire detection and suppression. NFPA 76 (2020) covers telecommunications facilities. Both standards mandate that fire alarm systems remain independent of BMS network control [NFPA 75, Section 8.2; NFPA 76, Section 5.1].

---

## Node N6: CDU and Technology Cooling System (TCS)

### System Description

The CDU is the single most consequential OT device in a liquid-cooled hyperscale facility. It bridges the FWS and TCS through a Brazed Plate Heat Exchanger (BPHE), using redundant stainless steel pumps to circulate purified coolant (PG25 or DI water) through rack manifolds and GPU cold plates.

A single CDU (Motivair XDU, CoolIT DCLC, Asetek RackCDU) typically serves 4–8 racks at 50–142 kW each, managing 200–1,000 kW of heat transfer. Its PLC controller manages pump speed, FWS control valve position, TCS supply temperature, differential pressure, and leak detection.

**Failure velocity:** Unlike air cooling where thermal mass provides minutes of response time, a CDU pump failure or flow stoppage causes GPU thermal throttling within 45 seconds and protective shutdown within 90 seconds at rack densities above 80 kW.

### Critical Items List

**Table 9.8: Critical Items List**

| Component | Function | OT Interface | SL-A | Failure Mode |
|:---|:---|:---|:---|:---|
| CDU PLC controller | Orchestrate all CDU functions | Modbus TCP, BACnet, HTTPS | **None** | Complete CDU control loss |
| CDU pump array (N+1) | Circulate TCS coolant | Modbus RTU from PLC | None | Flow loss → thermal throttle (45s) |
| Pump VFD | Variable speed control | Modbus RTU from PLC | None | Speed manipulation → flow starvation |
| FWS control valve (FCV) | Modulate FWS to maintain TCS temp | BACnet/Modbus from BMS | None | Valve position → temp deviation |
| BPHE (Brazed Plate Heat Exchanger) | Thermal bridge FWS↔TCS | None (passive) | N/A | Fouling → reduced heat transfer |
| TCS supply temperature sensor | Measure coolant temp to racks | Analog/Modbus to PLC | N/A | Drift → incorrect valve position |
| TCS flow transmitter | Measure coolant flow rate | Analog/Modbus to PLC | N/A | Loss → blind PLC operation |
| Differential pressure sensor | Measure pressure across manifold | Analog to PLC | N/A | Loss → pump speed incorrect |
| Leak d

### Vulnerability Research — CDU PLC and BMS Integration

CDU PLCs are typically not ISASecure certified. The following CVEs affect BMS platforms that integrate with CDU controllers, enabling the SPOOFED scenario described in the Field Observation.

**Table 9.8a: Known CVEs — BMS Platforms Integrating CDU Control**

| CVE ID | CVSS | Affected Product | Vulnerability Type | Relevance to Hazard | Disclosure |
|:---|:---|:---|:---|:---|:---|
| CVE-2025-26385 | 10.0 | Johnson Controls Metasys ADS/ADX | SQL injection → remote command execution | Enables CDU setpoint manipulation via BMS | Jan 2026 [ICSA-26-027-04] |
| CVE-2025-3936 | 9.8 | Honeywell Niagara Framework (JACE) | Authentication bypass | Enables BACnet spoofing of CDU telemetry | Jul 2025 [NVD] |
| CVE-2025-3937 | 9.8 | Honeywell Niagara Framework | Default credentials | Enables full BMS takeover | Jul 2025 [NVD] |
| CVE-2025-3944 | 9.8 | Honeywell Niagara Framework | Valid accounts compromise | Enables persistent access to BMS | Jul 2025 [NVD] |
| CVE-2025-50121 | Critical | Schneider EcoStruxure IT DCE | OS command injection | Enables DCIM-level manipulation of CDU monitoring | Jul 2025 [Schneider SEVD] |
| CVE-2025-50122 | Critical | Schneider EcoStruxure IT DCE | Insufficient entropy → root password discovery | Enables full DCIM compromise | Jul 2025 [Schneider SEVD] |

**Key Context:** No CDU-specific CVEs have been publicly disclosed as of June 2025. However, CDU PLCs communicate via Modbus TCP and BACnet/IP — protocols that lack native authentication or encryption [BACnet/Modbus Insecure by Design, Section 8]. The SPOOFED scenario (Field Observation) exploits this protocol weakness. CDU vendors (Motivair, CoolIT, Asetek) have not pursued ISASecure CSA certification for their PLC controllers [ISASecure Certified Products Registry, 2025].

### Standards Mapping — Node N6

**IEC 62443-3-2 Zone Assignment:** Node N6 assets belong to **Zone 1: BMS/HVAC** (CDU PLCs, pump VFDs, sensors). Recommended SL-T: SL 3 for CDU PLC and pump VFDs due to direct impact on GPU thermal safety [IEC 62443-3-2, Clause 5].

**Conduit Requirements:** The CDU PLC communicates with the BMS (Zone 1) and the chiller plant (Zone 1) via Modbus TCP. Per IEC 62443-3-2, conduit C1-3 (BMS → Fire/Life Safety) does not apply here, but conduit C0-1 (Enterprise IT → BMS) must enforce BACnet/SC for all CDU telemetry. A data diode should be considered for read-only telemetry from CDU to DCIM [IEC 62443-3-2, Clause 5.4].

**ASHRAE TC 9.9 Liquid Cooling Guidelines:** ASHRAE TC 9.9 (2021) defines liquid cooling classes W1–W5. For direct-to-chip cooling (CDU), the standard requires independent temperature monitoring at the rack inlet, separate from the CDU's onboard sensors [ASHRAE TC 9.9, 2021, Section 7.3]. The SPOOFED scenario (N6-CY-003 equivalent) violates this requirement — the operator's sole source of truth is the CDU sensor.

**OCP S.A.F.E. Framework:** The Open Compute Project's S.A.F.E. (Security, Audit, Firmware, Encryption) framework provides guidelines for firmware security in datacenter infrastructure. CDU PLC firmware should be signed and validated against a hardware root of trust [OCP S.A.F.E., 2024, Section 4.2].

---

## Cross-Node Standards Integration

**Table 9.9: IEC 62443 Zone and Conduit Mapping for All Nodes**

| Node | Zone | SL-T | Conduits | Key Protocol | Security Control |
|:---|:---|:---|:---|:---|:---|
| N2 (UPS) | Zone 2: Electrical | SL 3 | C0-2 (IT→Elec), C2-4 (Elec→Sub) | Modbus TCP, SNMP v3 | Industrial firewall, data diode for telemetry |
| N5 (Chiller) | Zone 1: BMS/HVAC | SL 2–3 | C0-1 (IT→BMS), C1-3 (BMS→Fire) | BACnet/IP, Modbus TCP | BACnet/SC, hardwired interlocks |
| N6 (CDU) | Zone 1: BMS/HVAC | SL 3 | C0-1 (IT→BMS) | Modbus TCP, BACnet/IP | Data diode for CDU telemetry, independent temp sensors |

**Table 9.10: Standards References by Node**

| Standard | N2 (UPS) | N5 (Chiller) | N6 (CDU) |
|:---|:---|:---|:---|
| IEC 62443-3-2 Zone/Conduit | ✓ Zone 2 | ✓ Zone 1 | ✓ Zone 1 |
| IEC 62443-4-2 Component Security | FR1, FR3, FR7 | FR1, FR3, FR5 | FR1, FR3, FR7 |
| ASHRAE TC 9.9 | — | ✓ Thermal guidelines | ✓ Liquid cooling classes |
| NFPA 75/76 | — | ✓ Fire detection | — |
| NFPA 855 | ✓ Battery ESS | — | — |
| OCP S.A.F.E. | — | — | ✓ Firmware security |

---

## Protocol-Level Vulnerability Summary

All three nodes rely on BACnet/IP and Modbus TCP — protocols that are insecure by design [Section 8, Research Data]. The following table summarises the protocol risks and mitigations relevant to the CyHAZOPs analysis.

**Table 9.11: Protocol Vulnerabilities and Mitigations**

| Vulnerability | Protocol | Risk | Nodes Affected | Mitigation |
|:---|:---|:---|:---|:---|
| No authentication | BACnet/IP, Modbus TCP | Critical | N2, N5, N6 | BACnet/SC (TLS), Modbus TCP with IPSec |
| No encryption | BACnet/IP, Modbus TCP | Critical | N2, N5, N6 | Encrypted tunnels (VPN, TLS) |
| No integrity checking | BACnet/IP, Modbus TCP | High | N2, N5, N6 | Message signing (if supported) |
| Broadcast device discovery | BACnet/IP | Medium | N5, N6 | Restrict broadcast domain via VLAN |
| Default passwords | All | High | N2, N5, N6 | Enforce password change on deployment |

**Source:** [BACnet/Modbus Insecure by Design, Research Data Section 8; CISA ICS-CERT, 2024]

---

## Conclusion

The CyHAZOPs analysis of Nodes N2, N5, and N6 demonstrates that telemetry integrity (SPOOFED guide word) produces the highest cyber RPNs across all nodes. The CDU (Node N6) remains the highest-priority target with a maximum cyber RPN of 294. The vulnerability research confirms that known CVEs in UPS NMCs (TLStorm), chiller plant VFDs (ABB, Siemens), and BMS platforms (Johnson Controls Metasys, Honeywell Niagara) directly enable the cyber causes identified in the hazard logs. Standards mapping per IEC 62443-3-2 assigns SL-T 3 to the most critical assets, requiring independent monitoring, hardwired interlocks, and protocol-level encryption. The protocol-level insecurity of BACnet/IP and Modbus TCP remains the single greatest systemic risk across all nodes.