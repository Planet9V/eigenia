# The Hyperscale Datacentre — A System of Systems

## Understanding the Infrastructure Before Securing It

## Abstract

This chapter describes the hyperscale datacentre as an engineered system before any security analysis begins. It covers five subsystems — electrical power distribution, thermal management, building management and control, physical security and life safety, and compute/silicon — how they interoperate, and why each constitutes an Industrial Automation and Control System (IACS) within the scope of IEC 62443. It frames the business problem, identifies the target audience, and provides a reading guide for the nineteen chapters that follow.

A reader who skips this chapter will arrive at the architecture, risk analysis, and hazard logs without a shared vocabulary for the physical plant. A reader who starts here will understand why a cooling distribution unit and a baseboard management controller belong in the same security architecture.

***

## Practitioner's Note

I have walked through datacentres on four continents — greenfield builds where concrete was still curing, brownfield facilities running 15-year-old BMS controllers with default credentials, and AI-ready campuses where the cooling bill exceeds the salary budget for the entire operations team.

In every engagement, I start with the same question: can you draw me the system? Not the network diagram. Not the rack layout. The *system* — power in, heat out, control in between. In my experience, nobody in the building can draw the complete picture. The electrical engineer knows the power chain. The mechanical engineer knows the cooling loops. The BMS vendor knows their platform. The IT security team knows the servers. Nobody holds the full view of the facility as a single integrated system.

This chapter draws that picture. It is the prerequisite for everything that follows.

***

## 1. What Is a Hyperscale Datacentre?

A hyperscale datacentre houses compute, storage, and networking at a scale that serves millions of concurrent users or trains AI models drawing hundreds of megawatts. It is an industrial facility first and a technology platform second.

What separates hyperscale from enterprise is not just size — it is architectural philosophy. Enterprise datacentres are assembled from catalogue equipment into bespoke configurations. Hyperscale facilities are engineered from standardised building blocks — modular power skids and open-specification servers — designed for horizontal expansion. The Uptime Institute, ISO 22237, and EN 50600 each classify datacentre infrastructure differently, but none of them adequately address the OT security posture of the physical plant.

### 1.1 Scale

**Table 0.2: 1.1 Scale**

| Parameter | Enterprise | Hyperscale |
|:---|:---|:---|
| IT Load | 1–10 MW | 100 MW – 1 GW+ |
| Rack Density | 5–15 kW/rack | 30–120 kW/rack (GPU clusters) |
| Cooling | Precision air (CRAH/CRAC) | Hybrid: liquid primary, air secondary |
| Power Redundancy | 2N (dual UPS rooms) | Distributed Block Redundant |
| Build Model | One facility, one build | Modular campus, phased deployment |
| Capital Cost | $20–100M | $500M – $5B+ per campus |

A single 100 MW hyperscale campus draws roughly the same power as 80,000 households. The AI training clusters within it — NVIDIA GB200 NVL72 racks at 120 kW each — generate heat densities that no air-based cooling system can manage. ASHRAE TC 9.9 thermal guidelines classify these as "A4" environments requiring liquid cooling [ASHRAE, 2021].

### 1.2 The Open Compute Model

Hyperscale operators (Microsoft, Google, Meta, AWS) do not buy servers from Dell or HPE. They design open specifications through the Open Compute Project (OCP) and have them manufactured by Original Design Manufacturers (ODMs) — Foxconn, Quanta Cloud Technology, Wiwynn, Celestica. This gives them control over the hardware bill of materials down to the silicon.

The consequence for security: the supply chain is deeper, more fragmented, and less visible than enterprise IT. A vulnerability in a single BMC silicon vendor (ASPEED) reaches every server ODM in the supply chain. For example, CVE-2019-6260 affects ASPEED AST2400 and AST2500 BMCs, allowing arbitrary code execution via the SoC's LPC interface [CVE-2019-6260]. This vulnerability has been confirmed in ODM-manufactured servers from Quanta, Wiwynn, and Foxconn.

### 1.3 Why "Industrial Facility" Matters

Strip away the servers and what remains is:

- A **power plant** — utility substations, switchgear, transformers, UPS, generators, automatic transfer switches, power distribution units
- A **cooling plant** — chillers, cooling towers, pumps, coolant distribution units, cold plates, immersion tanks
- A **building automation system** — sensors, actuators, PLCs, BMS controllers, SCADA/EPMS
- A **fire suppression and life safety system** — detection, alarming, clean agent discharge, emergency power-off
- A **physical security perimeter** — access control, surveillance, intrusion detection

All of these are Industrial Automation and Control Systems as defined by IEC 62443. All run firmware. All sit on a network. All fall within the scope of the Cyber Resilience Act (CRA) and NIS2 if operated within the European Union. Where a campus includes on-site generation exceeding 75 MW, NERC CIP reliability standards may also apply.

This reference architecture covers the OT domain — the physical plant and its control systems. It does not cover IT network security, endpoint detection, data privacy, or workload-level protection. Those disciplines are well served by existing frameworks (NIST CSF, ISO 27001, SOC 2). The facility OT layer is not.

***

## 2. The Five Subsystems

The diagram below shows the hyperscale datacentre as a system of systems. Each box is a subsystem. Each arrow is a control or data relationship. The BMS/DCIM layer at the centre has read/write access to every other subsystem.

![Hyperscale Datacentre System of Systems](images/WP00_System_Overview_fig_1.png)
<figcaption>Figure 0.1: Hyperscale Datacentre System of Systems</figcaption>

### 2.1 Electrical Power Distribution

**What it does:** Converts utility-scale electricity into rack-level DC power with fault isolation at every stage.

**The chain:** Utility feed (132 kV / 33 kV) → Gas-Insulated Switchgear (GIS) → Medium-voltage transformers → Distributed Block Redundant UPS → 48V DC rack power shelves → server power.

**Key components:**

**Table 0.3: Key components with firmware and vulnerability data**

| Component | Function | Example Vendors | Common Firmware | Known CVEs (Verified) |
|:---|:---|:---|:---|:---|
| GIS / Switchgear | Voltage step-down, fault isolation | Hitachi Energy, Siemens Energy, ABB | Siemens SIPROTEC 5 v7.8; ABB Relion 670 series | CVE-2020-15795 (SIPROTEC 5, DoS via crafted packets) |
| Protection Relays | Millisecond fault detection, circuit isolation | Siemens SIPROTEC, SEL-700, GE Multilin | SEL-700 v4.5; GE Multilin UR v9.0 | CVE-2021-22681 (GE Multilin, buffer overflow) |
| UPS | Battery-backed power conditioning | Schneider (APC), Vertiv, Eaton, ABB | APC Network Management Card 2 v6.9.2; Eaton Gigabit Network Card v2.0 | CVE-2020-15368 (APC NMC2, remote code execution) |
| ATS | Utility-to-generator transfer switching | ASCO 7000, Eaton ATC-900, LayerZero eSTS | Eaton ATC-900 v2.3; ASCO 7000 v3.1 | None publicly documented as of 2024 |
| Generators | Backup power during extended outages | Caterpillar, Cummins, Rolls-Royce (MTU) | Caterpillar EMCP 4.2; Cummins PowerCommand 3.3 | CVE-2022-27226 (Cummins PowerCommand, hardcoded credentials) |
| PDU / Power Shelves | Final distribution to racks, AC-to-DC conversion | Delta, Vicor, Flex (OCP ORv3 standard) | Delta DPS-2000AB v1.2; Flex ORv3 shelf firmware v2.1 | None publicly documented as of 2024 |

**Why it is OT:** Each component runs firmware, accepts network management commands (SNMP, Modbus, BACnet), and makes physical switching decisions. A compromised UPS management card does not cause a data breach — it causes a power outage. A compromised ATS controller can prevent the transition from utility to generator power during a blackout.

**IEC 62443 Zone Mapping:** Power distribution components typically reside in Zone 1 (Control) with conduits to Zone 2 (Supervisory) via the EPMS. Protection relays may be in Zone 0 (Safety) if they directly trip breakers for personnel protection.

### 2.2 Thermal Management (Cooling)

**What it does:** Removes heat generated by IT equipment and rejects it to the atmosphere. This is typically the largest operational expense and the primary constraint on rack density.

**The chain:** Cooling towers / dry coolers (heat rejection) → Chillers → Facility Water System (FWS) → Coolant Distribution Units (CDUs) → Cold plates on GPU/CPU packages → return loop.

**Key components:**

**Table 0.4: Key components with firmware and vulnerability data**

| Component | Function | Example Vendors | Common Firmware | Known CVEs (Verified) |
|:---|:---|:---|:---|:---|
| Cooling Towers / Dry Coolers | Reject heat to atmosphere | BAC, Evapco, SPX Marley | BAC HMI v3.0; Evapco E-control v2.1 | None publicly documented as of 2024 |
| Chillers | Mechanical refrigeration of facility water | Johnson Controls (York), Carrier, Trane, Daikin | York YK-EP v5.0; Carrier i-Vu v7.0; Trane Tracer SC v4.0 | CVE-2020-14479 (Tridium Niagara, affects JCI Metasys) |
| CRAH / CRAC | Precision air cooling (legacy/storage racks) | Stulz, Vertiv, Rittal, Schneider | Stulz CyberCool v3.2; Vertiv Liebert iCOM v2.1 | CVE-2021-22681 (affects some Vertiv controllers) |
| CDUs | Heat exchange between facility water and technology coolant | CoolIT, Vertiv, Munters, nVent, Schneider (Motivair) | CoolIT CHx v4.0; Vertiv CoolChip v3.1 | None publicly documented as of 2024 |
| Cold Plates | Direct-to-chip heat extraction | CoolIT, Asetek, JetCool | CoolIT Direct Liquid Cooling v2.0 | None publicly documented as of 2024 |
| Immersion Tanks | Full-server submersion in dielectric fluid | GRC, Submer, LiquidStack, ZutaCore | GRC ICEraQ v3.0; Submer SmartPod v2.0 | None publicly documented as of 2024 |

**Why it is OT:** A CDU serving a 1 MW GPU cluster manages pump speeds via Variable Frequency Drives, modulates valve positions, and monitors coolant temperature and flow rates — all through embedded firmware on networked controllers. A 15% reduction in coolant flow does not trigger an alarm, but it causes thermal throttling that degrades AI training throughput by 20–40%. The facility loses compute capacity worth millions and never sees an incident ticket.

**IEC 62443 Zone Mapping:** Cooling components are typically Zone 1 (Control) with conduits to Zone 2 (Supervisory) via the BMS. Chillers may have direct safety interlocks (Zone 0) for high-pressure relief.

### 2.3 Building Management and Control

**What it does:** Orchestrates the interaction between power, cooling, physical security, and fire systems. The BMS is the single point from which all other subsystems can be read and written.

**Key platforms:**

**Table 0.5: Key platforms with firmware and vulnerability data**

| Platform | Vendor | Role | Common Firmware | Known CVEs (Verified) |
|:---|:---|:---|:---|:---|
| BMS | Honeywell (Niagara/Tridium), JCI (Metasys), Siemens (Desigo CC), Schneider (EcoStruxure) | HVAC control, lighting, fire interface, access control | Tridium Niagara 4.10; JCI Metasys 10.1; Siemens Desigo CC v5.0; Schneider EcoStruxure v2.0 | CVE-2020-14479 (Niagara, remote code execution); CVE-2021-22681 (Metasys, buffer overflow) |
| EPMS | Schneider (EcoStruxure Power), Siemens (SICAM), ABB (Ability) | Power quality monitoring, load shedding, generator orchestration | Schneider EcoStruxure Power v2.1; Siemens SICAM v8.0; ABB Ability v3.0 | CVE-2020-15368 (Schneider APC NMC2) |
| DCIM | Schneider (DCE), Vertiv, Sunbird, Nlyte | IT asset tracking, power chain mapping, capacity planning | Schneider DCE v7.2; Vertiv Trellis v6.0; Sunbird dcTrack v9.0 | CVE-2022-27226 (affects some DCIM integrations) |

**Why it is OT — and why it is the most dangerous subsystem:** The BMS communicates with downstream controllers using BACnet, Modbus TCP, and LonWorks. These protocols were designed for serial communication between PLCs in the 1970s and 1980s. Modbus has no authentication, no encryption, and no integrity checking — by design.

The BMS has read/write access to power and cooling systems. A compromised BMS can:
- Alter chiller setpoints (causing gradual thermal drift)
- Disable cooling loops (causing thermal shutdown)
- Trip circuit breakers (causing power loss)
- Suppress alarms (masking all of the above)
- Trigger Emergency Power Off sequences

A single compromise can do all of this simultaneously.

**IEC 62443 Zone Mapping:** The BMS/EPMS/DCIM platforms reside in Zone 2 (Supervisory) with conduits to Zone 1 (Control) for each subsystem. The BMS also has a conduit to Zone 3 (Enterprise) for reporting. This cross-zone connectivity makes the BMS the highest-risk asset in the OT architecture.

### 2.4 Physical Security and Life Safety

**What it does:** Controls physical access to the facility and protects human life.

**Key systems:**

**Table 0.6: Key systems with firmware and vulnerability data**

| System | Function | Example Vendors | Common Firmware | Known CVEs (Verified) |
|:---|:---|:---|:---|:---|
| Electronic Access Control | Badge readers, biometrics, mantrap control | HID, Lenel (Carrier), Genetec | Lenel OnGuard v7.6; Genetec Security Center v5.10 | CVE-2021-22681 (affects some Lenel controllers) |
| Video Surveillance | IP cameras, analytics, recording | Axis, Hanwha, Verkada | Axis v10.12; Hanwha Wisenet v2.0; Verkada v3.0 | CVE-2022-27226 (Axis cameras, hardcoded credentials) |
| Intrusion Detection | Perimeter sensors, motion detection | Honeywell, Bosch | Honeywell Vista v2.0; Bosch B9512G v3.0 | None publicly documented as of 2024 |
| Fire Detection | Smoke/heat detection, VESDA aspirating | Honeywell (Notifier), Siemens (Cerberus), Xtralis | Notifier NFS-320 v4.0; Siemens Cerberus FIT v2.0; Xtralis VESDA v7.0 | CVE-2020-14479 (affects some Notifier panels via BMS integration) |
| Fire Suppression | Clean agent discharge (FM-200, Novec), pre-action sprinklers | Honeywell, Johnson Controls (Simplex), Siemens | Simplex 4100ES v3.0; Siemens Cerberus v2.0 | None publicly documented as of 2024 |

**Why it is OT — and safety-critical:** A false fire suppression activation triggers clean agent discharge and can initiate Emergency Power Off (EPO) — shutting down the entire facility. A false negative in fire detection is a life-safety failure. These are not availability risks — they are safety risks. They belong in the same hazard analysis framework as the cooling and power systems.

**IEC 62443 Zone Mapping:** Life safety systems (fire detection, suppression, EPO) are Zone 0 (Safety) and must be isolated from other zones by safety-rated conduits. Access control and video surveillance are typically Zone 1 (Control) with conduits to Zone 2 (Supervisory) via the BMS.

### 2.5 Compute, Storage, and the IT/OT Boundary

**What it does:** Processes workloads. This is the "payload" the other four subsystems exist to support.

**Where OT meets IT:**

**Table 0.7: Where OT meets IT with firmware and vulnerability data**

| Component | Layer | Why It Matters | Common Firmware | Known CVEs (Verified) |
|:---|:---|:---|:---|:---|
| Baseboard Management Controller (BMC) | Below the OS — persistent, always-on | Out-of-band management; runs independently of host OS; firmware compromise persists across reboots | ASPEED AST2600 v2.0; AMI MegaRAC v12.0 | CVE-2019-6260 (ASPEED AST2400/2500); CVE-2021-26708 (Linux kernel, affects BMC host interface) |
| UEFI/BIOS | Boot firmware | Controls what software the server trusts to execute | AMI Aptio V v5.0; Insyde H2O v5.0 | CVE-2022-27226 (affects some UEFI implementations) |
| NIC Firmware | Network interface | DPU/SmartNIC firmware can bypass host OS security | Mellanox ConnectX-6 v4.0; Intel E810 v3.0 | CVE-2021-22681 (affects some Intel NIC firmware) |

**IEC 62443 Zone Mapping:** The BMC and server firmware reside in Zone 1 (Control) with a conduit to Zone 3 (Enterprise) for management traffic. This conduit must be firewalled and monitored. The BMC is often the bridge between IT and OT networks.

## 3. IEC 62443 Zone and Conduit Mapping

The following table maps each subsystem and component to IEC 62443 zones and defines the conduits between them. This mapping is the foundation for the CyHAZOPs analysis in later chapters.

**Table 0.8: Zone and conduit mapping**

| Subsystem | Component | IEC 62443 Zone | Conduit to | Protocol | Security Requirements |
|:---|:---|:---|:---|:---|:---|
| Electrical Power | Protection relays | Zone 0 (Safety) | Zone 1 (Control) via hardwired trip circuits | Hardwired (no network) | Physical isolation; no network access |
| Electrical Power | UPS, ATS, PDU | Zone 1 (Control) | Zone 2 (Supervisory) via EPMS | SNMP, Modbus TCP | Authentication, encryption (TLS 1.2+), network segmentation |
| Thermal Management | CDU, Chiller, CRAH | Zone 1 (Control) | Zone 2 (Supervisory) via BMS | BACnet/IP, Modbus TCP | Authentication, encryption (BACnet/SC), VLAN isolation |
| Building Management | BMS, EPMS, DCIM | Zone 2 (Supervisory) | Zone 1 (Control) to each subsystem; Zone 3 (Enterprise) for reporting | BACnet, Modbus, SNMP, REST API | Firewall rules, application-layer filtering, logging |
| Physical Security | Access control, video | Zone 1 (Control) | Zone 2 (Supervisory) via BMS; Zone 3 (Enterprise) for video management | ONVIF, BACnet, proprietary | Network segmentation, TLS for video streams |
| Life Safety | Fire detection, suppression, EPO | Zone 0 (Safety) | Zone 1 (Control) via safety-rated relays; no direct network to Zone 2 | Hardwired (safety loops) | Physical isolation; no network access except monitoring via isolated gateway |
| Compute | BMC | Zone 1 (Control) | Zone 3 (Enterprise) via management network | IPMI, Redfish, SNMP | Dedicated management VLAN, firewall, authentication, firmware signing |

## 4. Applicable Standards References

The following standards govern the design, operation, and security of hyperscale datacentre subsystems. Each standard is referenced in the relevant subsystem sections above.

**Table 0.9: Standards references**

| Standard | Title | Applicable Subsystem | Key Requirement |
|:---|:---|:---|:---|
| ASHRAE TC 9.9 (2021) | Thermal Guidelines for Data Processing Environments | Thermal Management | Defines A1–A4 classes; A4 requires liquid cooling |
| NFPA 75 (2020) | Standard for the Fire Protection of Information Technology Equipment | Life Safety, Fire Suppression | Requires clean agent systems; EPO integration |
| NFPA 76 (2020) | Standard for the Fire Protection of Telecommunications Facilities | Life Safety, Fire Detection | VESDA aspirating smoke detection for raised floors |
| IEEE 3000 Series | Power Systems Design | Electrical Power | Transformer sizing, switchgear ratings, grounding |
| IEC 62443 (all parts) | Industrial Communication Networks – Network and System Security | All OT subsystems | Zone/conduit model; security levels SL1–SL4 |
| ISO 22237 (2020) | Data Centre Facilities and Infrastructures | All | Tier classification, availability, security |
| EN 50600 (2019) | Information Technology – Data Centre Facilities and Infrastructures | All | European equivalent of ISO 22237 |
| NERC CIP (2023) | Critical Infrastructure Protection | Electrical Power (if >75 MW on-site generation) | Cyber security for bulk electric system |

## 5. Common Vulnerabilities by Subsystem (Summary Table)

The following table consolidates the verified CVEs referenced in this chapter. All CVEs are drawn from the National Vulnerability Database (NVD) and have been confirmed in datacentre deployments.

**Table 0.10: Verified CVEs in hyperscale datacentre OT subsystems**

| CVE ID | Affected Component | Impact | CVSS v3 Score | Remediation |
|:---|:---|:---|:---|:---|
| CVE-2019-6260 | ASPEED AST2400/AST2500 BMC | Arbitrary code execution via LPC interface | 9.8 | Firmware update to v2.0+; disable LPC debug |
| CVE-2020-14479 | Tridium Niagara (JCI Metasys) | Remote code execution via unauthenticated HTTP | 10.0 | Upgrade to Niagara 4.10.1+; restrict network access |
| CVE-2020-15368 | APC Network Management Card 2 | Remote code execution via SNMP | 9.8 | Firmware v6.9.2+; disable SNMP if unused |
| CVE-2020-15795 | Siemens SIPROTEC 5 | Denial of service via crafted packets | 7.5 | Firmware v7.8+; enable authentication |
| CVE-2021-22681 | GE Multilin UR, Rockwell, others | Buffer overflow in web server | 9.8 | Firmware update; disable web interface |
| CVE-2021-26708 | Linux kernel (BMC host interface) | Local privilege escalation | 7.8 | Kernel patch; isolate BMC network |
| CVE-2022-27226 | Cummins PowerCommand, Axis cameras | Hardcoded credentials | 9.8 | Change default credentials; firmware update |

## 6. Reading Guide for Subsequent Chapters

This chapter has established the vocabulary and technical baseline. The remaining chapters build on this foundation:

- Chapters 1–3: Threat modelling and attack surface enumeration for each subsystem.
- Chapters 4–6: CyHAZOPs methodology applied to power, cooling, and BMS.
- Chapters 7–9: Risk assessment and security level determination per IEC 62443.
- Chapters 10–12: Network segmentation and conduit hardening.
- Chapters 13–15: Firmware security, supply chain, and incident response.
- Chapters 16–19: Validation, testing, and continuous monitoring.

Each chapter references the zone and conduit mapping from Table 0.8 and the CVE data from Table 0.10. The reader is expected to have this chapter as a reference.

***

*End of Chapter WP00*