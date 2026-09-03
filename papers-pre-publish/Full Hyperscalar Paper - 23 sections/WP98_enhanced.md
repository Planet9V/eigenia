# Glossary of Terms, Acronyms, and Abbreviations

The following definitions apply throughout this Foundational Blueprint. Where terms carry specific meaning within the CyHAZOPs methodology, the CyHAZOPs-specific definition is provided.

## Acronyms and Abbreviations

**Table 98.1: Acronyms and Abbreviations**

| Acronym | Expansion |
|:---|:---|
| AHU | Air Handling Unit |
| ALE | Annualised Loss Expectancy — the expected monetary loss from a given risk per year (ARO × SLE) |
| ARO | Annual Rate of Occurrence — the estimated frequency of a loss event per year |
| ASHRAE | American Society of Heating, Refrigerating and Air-Conditioning Engineers |
| ATS | Automatic Transfer Switch — transfers electrical load between primary and backup power sources |
| ATT&CK | Adversarial Tactics, Techniques, and Common Knowledge — MITRE's threat intelligence framework |
| BESS | Battery Energy Storage System |
| BMS | Building Management System — the supervisory control platform for HVAC, lighting, and facility monitoring |
| BMC | Baseboard Management Controller — an embedded controller on server motherboards providing out-of-band management |
| CDU | Coolant Distribution Unit — distributes liquid coolant to server racks in direct-to-chip (DLC) cooling architectures |
| CISO | Chief Information Security Officer |
| CMMS | Computerised Maintenance Management System |
| COORDINATED | CyHAZOPs guide word: simultaneous manipulation of multiple nodes to produce cascading failure |
| CRA | Cyber Resilience Act — EU Regulation 2024/2847 mandating cybersecurity requirements for products with digital elements |
| CRQC | Cryptanalytically Relevant Quantum Computer |
| CVE | Common Vulnerabilities and Exposures — a standardised identifier for publicly disclosed security vulnerabilities |
| CyHAZOPs | Cyber Hazard and Operability Study — the methodology defined in this document |
| D | Detectability — FMECA scoring dimension (1 = easily detected, 10 = virtually undetectable) |
| DCIM | Data Centre Infrastructure Management — software platform aggregating OT telemetry for capacity planning and monitoring |
| DLC | Direct-to-Chip Liquid Cooling |
| DRIFTED | CyHAZOPs guide word (AI extension): AI model accuracy degradation due to distribution shift between training and operating conditions |
| EPMS | Electrical Power Monitoring System — monitors voltage, current, power quality, and energy consumption across the electrical distribution |
| EPO | Emergency Power Off — a manual or automated shutdown of all electrical power to a defined zone |
| ETCS | European Train Control System |
| FMECA | Failure Mode, Effects, and Criticality Analysis |
| HAZOP | Hazard and Operability Study — a structured brainstorming methodology using guide words to identify process deviations |
| HLD | High-Level Design |
| HSM | Hardware Security Module |
| IACS | Industrial Automation and Control Systems |
| ICS | Industrial Control Systems |
| IDMZ | Industrial Demilitarised Zone — a network segment mediating traffic between IT and OT networks |
| IDS | Intrusion Detection System |
| IP | Internet Protocol |
| MFL | Maximum Foreseeable Loss — the worst-case single-event financial loss |
| ML-DSA | Module-Lattice-Based Digital Signature Algorithm (NIST FIPS 204) |
| ML-KEM | Module-Lattice-Based Key-Encapsulation Mechanism (NIST FIPS 203) |
| MV/LV | Medium Voltage / Low Voltage |
| NDR | Network Detection and Response — passive monitoring technology for OT network traffic |
| NIS2 | Network and Information Security Directive 2 — EU Directive 2022/2555 |
| NMC | Network Management Card — an embedded network interface module in UPS and PDU equipment |
| O | Occurrence — FMECA scoring dimension (1 = extremely unlikely, 10 = near-certain) |
| OCP | Open Compute Project |
| OT | Operational Technology — hardware and software that detects or causes changes through direct monitoring and control of physical devices, processes, and events |
| OVERRIDDEN | CyHAZOPs guide word (AI extension): AI recommendation overrides a human-set safety constraint |
| P&ID | Piping and Instrumentation Diagram |
| PDU | Power Distribution Unit |
| PERSISTED | CyHAZOPs guide word: attacker maintains access through firmware implant or persistent backdoor that survives remediation |
| PLC | Programmable Logic Controller |
| POISONED | CyHAZOPs guide word (AI extension): AI model produces incorrect outputs due to corrupted training data or adversarial input |
| PQC | Post-Quantum Cryptography |
| PTC | Positive Train Control |
| PUE | Power Usage Effectiveness — the ratio of total facility energy to IT equipment energy (lower is better) |
| RACI | Responsible, Accountable, Consulted, Informed — a responsibility assignment matrix |
| RCIL | Reliability Critical Items List — items whose failure directly affects facility availability |
| ROSI | Return on Security Investment — (ALE_before − ALE_after − Cost_of_controls) / Cost_of_controls |
| RPN | Risk Priority Number — the product of Severity × Occurrence × Detectability in FMECA scoring |
| RTOS | Real-Time Operating System |
| S | Severity — FMECA scoring dimension (1 = negligible, 10 = catastrophic / life safety) |
| S.A.F.E. | Security Analysis Framework and Evaluation — OCP's firmware security assessment programme |
| SBOM | Software Bill of Materials — a machine-readable inventory of all software components in a product |
| SCIL | Security Critical Items List — items whose compromise enables a cyber-physical attack path |
| SFAIR | The seven-stage IEC 62443 implementation process defined in Chapter 18: Scope, Find, Assign, Implement, Assure, Iterate, Report |
| SIL | Safety Integrity Level — a measure of safety system performance defined by IEC 61508 (SIL 1–4) |
| SIS | Safety Instrumented System |
| SL | Security Level — the cyber security capability level defined by IEC 62443 (SL 0–4) |
| SL-C | Security Level — Capability (what a device or system can achieve) |
| SL-T | Security Level — Target (what the risk assessment requires) |
| SLE | Single Loss Expectancy — the monetary loss from a single occurrence of a risk event |
| SLH-DSA | Stateless Hash-Based Digital Signature Algorithm (NIST FIPS 205) |
| SMR | Small Modular Reactor |
| SNMP | Simple Network Management Protocol |
| SOC | Security Operations Centre |
| SPDX | Software Package Data Exchange — an SBOM format standard |
| SPOOFED | CyHAZOPs guide word: attacker manipulates sensor readings or telemetry to conceal an ongoing attack or trigger incorrect operator response |
| Table A | CyHAZOPs risk classification: events with quantifiable frequency and insurable loss (Mediocristan) |
| Table B | CyHAZOPs risk classification: events with fat-tail distribution, uninsurable maximum foreseeable loss (Extremistan) |
| TIA | Telecommunications Industry Association |
| UPS | Uninterruptible Power Supply |
| VESDA | Very Early Smoke Detection Apparatus — aspirating smoke detection system |
| VFD | Variable Frequency Drive — controls motor speed for pumps, fans, and compressors |
| VLAN | Virtual Local Area Network |

**Table 98.2: Common Vendor Implementations and Notable CVEs**

| Acronym | Vendor(s) | Product Example | Notable CVE(s) |
|:---|:---|:---|:---|
| BMC | ASPEED, Intel, HPE (iLO), Dell (iDRAC), Supermicro | AST2500, iLO 5, iDRAC9 | CVE-2019-6260 [Meh, 2019], CVE-2018-1207 [NVISO, 2018] |
| NMC | APC (Schneider), Eaton, Tripp Lite | AP9630, Netpack | CVE-2021-22873 [Dragos, 2021], CVE-2022-2759 [Team82, 2022] |
| PLC | Siemens, Rockwell, Schneider | S7-1500, ControlLogix | CVE-2020-15782 [Claroty, 2020], CVE-2021-22663 [Dragos, 2021] |
| VFD | ABB, Schneider, Siemens | ACS580, Altivar 960 | CVE-2020-15793 [JSOF, 2020] |
| UPS | APC (Schneider), Eaton, Emerson | Smart-UPS, 93PS | CVE-2020-13624 [Schneider, 2020] |
| CDU | CoolIT, Asetek, Chilldyne | CDU 1000 | No public CVEs as of 2025 |
| BMS | Johnson Controls, Siemens, Honeywell | Metasys, Desigo | CVE-2023-2694 [Claroty, 2023] |

All listed CVEs are verified against MITRE NVD and vendor advisories.

## CyHAZOPs Guide Words

The following guide words are used during CyHAZOPs workshop sessions to systematically identify deviations from design intent. The first seven are standard CyHAZOPs guide words; the final three are extensions for AI-driven systems (Chapter 13).

**Table 98.3: Guide Word - Category**

| Guide Word | Category | Meaning |
|:---|:---|:---|
| **NO** | Standard | Complete absence of the intended function |
| **MORE** | Standard | Parameter exceeds design intent (e.g., overpressure, overtemperature) |
| **LESS** | Standard | Parameter falls below design intent (e.g., underflow, undercooling) |
| **REVERSE** | Standard | Function operates in the opposite direction to design intent |
| **SPOOFED** | Cyber | Telemetry or commands are falsified to deceive operators or control systems |
| **PERSISTED** | Cyber | Attacker maintains access through mechanisms that survive remediation |
| **COORDINATED** | Cyber | Simultaneous manipulation of multiple nodes to produce cascading failure |
| **POISONED** | AI | Model produces incorrect output due to corrupted training data |
| **DRIFTED** | AI | Model accuracy degrades due to distribution shift |
| **OVERRIDDEN** | AI | Model recommendation overrides a human-set safety constraint |

## Example Zone and Conduit Mapping for Hyperscale Datacenter

**Table 98.4: IEC 62443 Zones and Conduits (Hyperscale Reference Architecture)**

| Zone/Conduit | Assets | SL-T (cyber) | SL-T (functional safety) if applicable | Notes |
|:---|:---|:---|:---|:---|
| Zone: Electrical Distribution | EPMS, UPS, PDU, ATS, BESS, MV/LV switchgear | 3 | 2 (arc flash) | Includes critical power path |
| Zone: Cooling | CDU, DLC pumps, chiller plant, AHU, VFDs | 2 | 1 (overpressure) | Redundant loops may split into sub-zones |
| Zone: Fire / Life Safety | VESDA, EPO, SIS, sprinkler controllers | 3 | 3 (SIL 2) | Separate from all other zones per NFPA 72 |
| Zone: BMS | BMS server, BACnet routers | 2 | 1 | Manages HVAC and lighting |
| Zone: DCIM | DCIM aggregation, analytics | 2 | 1 | Read-only telemetry from OT devices |
| Conduit: BMS ↔ DCIM | IDMZ, protocol gateway | SL-C 3 | – | Use OPC-UA with security profiles |
| Conduit: BMS ↔ Cooling VFDs | BACnet/IP or Modbus TCP | SL-C 2 | – | Require gateway with firewall |
| Conduit: DCIM ↔ IT network | IDMZ, SNMPv3 | SL-C 3 | – | Trap filtering and rate limiting |

Mapping follows IEC 62443-3-2 [2020] and OCP's OT Security Reference Architecture [OCP, 2024].

## Key Terms

**Table 98.5: Key Terms**

| Term | Definition |
|:---|:---|
| Barbell Strategy | Nassim Taleb's risk allocation approach: invest heavily in maximum safety and maximum opportunity, avoiding the fragile middle ground |
| Brownfield | An existing facility or system being assessed or upgraded, as opposed to a new-build (greenfield) |
| Common-cause failure | A single root cause that simultaneously defeats multiple redundant components (e.g., identical firmware vulnerability across all UPS modules) |
| Conduit | IEC 62443 term: a logical or physical grouping of communication channels that share common security requirements (IEC 62443-3-2, 2020) |
| Crypto-agility | The ability to replace cryptographic algorithms without hardware modification |
| Dual-RPN | CyHAZOPs scoring method: calculating separate RPN values for mechanical and cyber-induced failure modes of the same equipment to quantify the cyber multiplier |
| Extremistan | Nassim Taleb's term for domains where outcomes are dominated by rare, high-impact events with fat-tail distributions |
| Gordon-Loeb Model | An economic model demonstrating that optimal security spending rarely exceeds 37% of the expected loss (Gordon & Loeb, 2002) |
| Greenfield | A new facility being designed and built from scratch |
| Mediocristan | Nassim Taleb's term for domains where outcomes cluster around the mean and extreme events are rare |
| Node | In CyHAZOPs: a self-contained process function with defined design intent, control loops, and failure consequences |
| SecRACS | Security Requirements Allocation and Countermeasure Selection — the IEC 62443-3-2 process of assigning security requirements to specific zones and conduits (IEC 62443-3-2, 2020) |
| Taleb Test | CyHAZOPs decision tool: (1) Can the architecture survive the worst-case manifestation? (2) If not, can we eliminate the preconditions? |
| Trust Boundary | The architectural gate between AI recommendation and OT execution, comprising physical bounds checking, human-in-the-loop approval, and independent monitoring |
| Zone | IEC 62443 term: a logical or physical grouping of assets that share common security requirements (IEC 62443-3-2, 2020) |

## Industry Standards Referenced

**Table 98.6: Applicable Industry Standards (ASHRAE, NFPA, IEEE)**

| Acronym | Standard | Applicability | Current Edition |
|:---|:---|:---|:---|
| AHU | ASHRAE 62.1 | Ventilation for acceptable indoor air quality | 2022 |
| AHU | ASHRAE 90.1 | Energy standard for buildings | 2022 |
| ATS | NFPA 110 | Emergency and standby power systems | 2025 |
| EPO | NFPA 70 (NEC) Article 645 | Information technology equipment | 2023 |
| PDU | IEEE 141 (Red Book) | Electric power distribution for industrial plants | 1993 (confirmed 2020) |
| UPS | IEEE 1184 | Guide for batteries for UPS systems | 2006 |
| VESDA | NFPA 72 | Fire alarm and signaling code | 2025 |
| VFD | IEEE 519 | Harmonic control in electrical power systems | 2014 |
| BMS | ASHRAE 135 (BACnet) | Data communication protocol for building automation | 2024 |
| DLC | ASHRAE TC 9.9 | Thermal guidelines for data processing environments | 2021 |
| SMR | IEEE 1547 | Interconnection of distributed energy resources | 2018 |
| SIS | IEC 61508 / IEC 61511 | Functional safety for process industry | 2010 / 2016 |

All standards references are to the most recent published edition as of Q1 2025.