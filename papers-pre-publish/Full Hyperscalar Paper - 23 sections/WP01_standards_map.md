# Standards Mapping: WP01
Model: xiaomi/mimo-v2.5
Date: 2026-06-14T21:09:40.938564

### Comprehensive Standards Mapping Table: WP01 Hyperscale Datacenter Infrastructure

---

### **Table 1: Asset → Zone → SL-T → IEC 62443-4-2 FR/SR Requirements**

| Asset/Subsystem | IEC 62443-3-2 Zone Placement | Target Security Level (SL-T) | IEC 62443-4-2 Functional Requirements (FR) & System Requirements (SR) |
| :--- | :--- | :--- | :--- |
| **Utility Feed / MV Switchgear (GIS)** | Zone 0 (Physical Process) / Zone 1 (Basic Control) | SL-3 | **FR1 (Identification & Authentication):** Unique user IDs, multi-factor for administrative access. <br>**FR2 (Use Control):** Role-based access control (RBAC) for firmware/logic changes. <br>**FR3 (Data Integrity):** Signed firmware updates, integrity checks for configuration files (SCL/SCD). <br>**FR5 (Data Confidentiality):** Encryption for remote management (TLS 1.2+). <br>**FR7 (Resource Availability):** Protection against denial-of-service on management ports. <br>**SR 1.13 (Malicious Code Protection):** Signed boot & firmware. |
| **IEC 61850 Protection Relays (SIPROTEC, SEL-700)** | Zone 1 (Basic Control) | SL-3 | **FR1:** Role-based accounts; no default credentials. <br>**FR2:** Disable unused protocols/ports; RBAC for setting changes. <br>**FR3:** Signed firmware; secure update mechanism. <br>**FR5:** Confidentiality for GOOSE/MMS if crossing security boundaries (requires IEC 62351). <br>**FR6 (Timely Response to Events):** Logging of all access attempts & configuration changes. <br>**SR 6.1 (Network Segmentation):** Dedicated VLAN for protection traffic. |
| **Distributed Block UPS (Power Stage)** | Zone 2 (Supervisory Control) | SL-2 | **FR1:** Authentication for local/remote management. <br>**FR2:** Access controls for operational parameters (voltage, current limits). <br>**FR3:** Secure storage of configuration. <br>**FR7:** Graceful shutdown under attack; isolation from communication bus. <br>**SR 5.1 (Denial of Service Protection):** Rate-limiting on network management port. |
| **UPS Network Management Card (NMC3, RDU120)** | Zone 2 (Supervisory Control) | SL-3 | **FR1:** Strong password policies; multi-factor support. <br>**FR2:** Granular RBAC (read-only vs. admin). <br>**FR3:** Secure boot; signed firmware; secure downgrade protection. <br>**FR4 (Data Confidentiality):** TLS 1.2+ for web/SNMPv3; SSH for CLI. <br>**FR5 (Data Confidentiality):** Encrypted storage of credentials. <br>**FR6:** Audit logging to external server (Syslog). <br>**FR7:** Resilience to buffer overflow/fuzzing attacks. |
| **Automatic Transfer Switch (ATS) Controller** | Zone 2 (Supervisory Control) / Zone 3 (Operations Management) | SL-3 | **FR1:** Authentication for configuration mode. <br>**FR2:** RBAC; prevent unauthorized change of transfer parameters. <br>**FR3:** Signed firmware. <br>**FR5:** Confidentiality for control commands. <br>**FR7:** Tamper detection; lockout after failed attempts. <br>**SR 6.1 (Network Segmentation):** Isolate on dedicated OT VLAN. |
| **Backup Generator ECU/Paralleling Control** | Zone 1 (Basic Control) | SL-3 | **FR1:** Unique credentials per generator/set. <br>**FR2:** RBAC for start/stop and synchronization commands. <br>**FR3:** Secure boot; authenticated firmware updates. <br>**FR5:** Encryption for remote monitoring data. <br>**FR7:** Protection against injection of false start commands. <br>**SR 5.1 (DoS Protection):** Rate-limit Modbus/IP requests. |
| **48V DC Power Shelf (PMC/Redfish)** | Zone 3 (Operations Management) | SL-2 | **FR1:** Authentication for Redfish API access. <br>**FR2:** RBAC; read-only vs. power-cycling permissions. <br>**FR3:** Secure storage of session tokens. <br>**FR4:** TLS for Redfish over Ethernet. <br>**FR7:** Resilience to malformed API requests. |
| **BMS/EPMS/DCIM Platform** | Zone 3 (Operations Management) / Zone 4 (Enterprise IT) | SL-3 | **FR1:** Integration with enterprise IAM (LDAP/AD); MFA. <br>**FR2:** Granular RBAC (view, control, administer). <br>**FR3:** Secure database; encrypted communications to all polled OT devices. <br>**FR4:** TLS for all north-south and east-west data flows. <br>**FR5:** Protection of collected OT data at rest. <br>**FR6:** Centralized audit logs; anomaly detection integration. <br>**SR 6.1 (Network Segmentation):** DMZ placement between OT and IT networks. |

---

### **Table 2: Asset → Certification Status → Gap Description**

| Asset/Subsystem | Vendor/Product | IEC 62443-4-2 Status | ISASecure Certification Status | Gap Description (vs. SL-3/SL-4) |
| :--- | :--- | :--- | :--- | :--- |
| **MV Switchgear / Protection Relays** | Siemens SIPROTEC, SEL-700, ABB Relion | **Not Certified.** SIL-2/3 (IEC 61508) only. | **Gap.** No ISASecure certification. | **Critical Gap:** No cybersecurity hardening certification. Signed firmware may exist but is not third-party validated. Lacks formal assurance of secure development lifecycle (SDLC). |
| **UPS Power Electronics** | All Vendors (Schneider, Vertiv, Eaton, ABB, Delta) | **Not Certified.** Power conversion stage. | **Gap.** | **Critical Gap:** Entire power path behind NMC is uncertified. Firmware vulnerabilities could lead to undetected power manipulation or shutdown. |
| **UPS NMC (Management Card)** | Schneider NMC3 (AP9641/9643) | **Certified SL-2** (TÜV Rheinland). | **ISASecure SDLA Compliant.** | **Gap vs. SL-3:** SL-2 does not mandate resistance to sophisticated, state-sponsored attacks (FR1, FR3, FR5 may not meet SL-3 rigor). |
| **UPS NMC (Management Card)** | Vertiv RDU120, Eaton NETWORK-M3 | **Certified SL-2** (UL Solutions). | **Not Specified.** | **Gap vs. SL-3:** Same as above. Assumes SL-2 for network management interfaces only, not the entire UPS system. |
| **ATS Controllers** | ASCO 7000, Eaton ATC-300+, LayerZero eSTS | **Not Certified.** | **Gap.** | **Critical Gap:** Firmware running safety-critical transfer logic has no cybersecurity certification. Exposes Modbus/SNMP interfaces without validation. |
| **Generator Paralleling Controls** | Woodward easYgen, ComAp InteliGen, Cummins DMC | **Not Certified.** | **Gap.** | **Critical Gap:** Controls accepting Modbus/IP commands to start/stop/synchronize generators lack certified secure development. |
| **48V DC Power Shelf** | Delta HPR, Advanced Energy ORv3, Vicor, Flex | **Not Certified.** | **Gap.** | **Gap:** Management controllers (PMC) using Redfish are uncertified. Physical bus bar is inherently secure, but the management plane is not. |
| **BMS/EPMS/DCIM Platforms** | Typically custom or commercial software (e.g., Schneider EcoStruxure) | **Typically Not Certified.** Application layer. | **Gap.** | **Gap:** While the software vendor may have processes, the installed instance is not certified. Requires hardening per IEC 62443-3-3 and deployment procedures. |

---

### **Table 3: Asset → Non-IEC Standards Applicability (ASHRAE, NFPA, IEEE, EN 50600)**

| Asset/Subsystem | Applicable Non-IEC Standards | Key Requirements |
| :--- | :--- | :--- |
| **Power Distribution (MV, UPS, 48V)** | **ASHRAE 90.4-2019:** Energy Standard for Data Centers. <br>**IEEE 1584-2018:** Guide for Performing Arc-Flash Hazard Calculations. <br>**EN 50600 Series:** Data Centre Facilities and Infrastructures (Availability, Energy Efficiency). <br>**UL 1778, IEC 62040:** UPS Safety & Performance. | Efficiency targets (>97% for UPS in double-conversion), arc flash labeling/protection for switchgear, physical security of power rooms. |
| **Backup Generation** | **NFPA 110: Standard for Emergency and Standby Power Systems.** <br>**ISO 8528:** Reciprocating Internal Combustion Engine Driven Alternating Current Generating Sets. | Maintenance, testing, and fuel system requirements. Automatic transfer switching performance (e.g., <100ms for life safety loads). |
| **Cooling (CDU, Chillers, Pumps)** | **ASHRAE TC 9.9:** Thermal Guidelines for Data Processing Environments. <br>**ASHRAE 90.1:** Energy Standard for Buildings. <br>**EN 50600-4:** Energy Efficiency of Data Centers. | Inlet air temperature ranges (A1-A4 classes), liquid cooling temperature/flow control, power usage effectiveness (PUE) targets. |
| **Physical & Environmental Control** | **ASHRAE 55:** Thermal Environmental Conditions for Human Occupancy. <br>**NFPA 70: National Electrical Code (NEC).** <br>**EN 50600-2:** Data Centre Site Infrastructure. | Human safety for facility staff, proper installation of power/cooling systems, fire suppression (e.g., clean agent systems for OT rooms). |
| **OT Network Infrastructure** | **IEC 62443-2-1:** Security Management System. <br>**NIST SP 800-82:** Guide to ICS Security. <br>**NIS2 Directive (EU):** Network & Information Security. | Risk assessment, security policies, network architecture design, incident response planning. Compliance for critical infrastructure operators. |

---

### **Section: Architectural Recommendations for Closing Gaps**

1.  **Compensating Controls for Uncertified Assets (SL-3/4):**
    *   **Network Segmentation (Zero Trust):** Implement strict IEC 62443 zone/conduit models. Use unidirectional security gateways (data diodes) for protection relays and generator controls where possible. Place all uncertified assets (ATS, generator controllers, power shelves) behind managed OT firewalls with application-aware inspection (e.g., deep packet inspection for Modbus, DNP3, IEC 61850).
    *   **Centralized Authentication & Monitoring:** Deploy an OT-focused Identity and Access Management (IAM) solution. Integrate all device logs (syslog, SNMP traps) into a Security Information and Event Management (SIEM) system for anomaly detection (e.g., abnormal command sequences to an ATS).

2.  **Procurement & Lifecycle Management:**
    *   **Mandate Certification in RFQs:** For all new procurements of networked OT components (NMCs, controllers, relays), require IEC 62443-4-2 certification at a minimum of SL-2, with a roadmap to SL-3 for critical zones. Require vendors to disclose their IEC 62443-4-1 (Secure Development Lifecycle) compliance.
    *   **Firmware Management Program:** Establish a formal process for tracking, validating, and applying signed firmware updates from vendors. Implement a testing lab for firmware upgrades prior to deployment in production.

3.  **Enhanced Architectural Segmentation:**
    *   **DMZ for Control System Access:** For BMS/EPMS/DCIM, implement a hardened DMZ with jump servers. All administrative access to OT networks must terminate in the DMZ, requiring re-authentication and session monitoring.
    *   **Dedicated Security VLANs:** Segment OT traffic by function (e.g., Protection, Power Management, Cooling, Building) to limit blast radius. Use VLANs with strict access control lists (ACLs) and firewall rules between zones.

4.  **Continuous Assessment & Validation:**
    *   **Regular Penetration Testing & Audits:** Commission annual third-party penetration tests specifically targeting the OT network and devices. Audit configurations against IEC 62443-3-3 requirements.
    *   **Compensating Control Documentation:** For each uncertified asset, formally document the risk assessment, the specific compensating controls in place (e.g., network isolation, monitoring), and the residual risk acceptance. This forms the core of the site's cybersecurity management system (IEC 62443-2-1).