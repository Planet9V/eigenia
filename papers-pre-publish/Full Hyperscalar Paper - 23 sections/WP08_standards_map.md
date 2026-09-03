# Standards Mapping: WP08
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:13:45.989276

## IEC 62443 Mapping for WP08 Datacenter OT Infrastructure (Per CyHAZOPs Framework)

### Table 1: Asset → Zone → SL-T → IEC 62443-4-2 FR/SR Requirements

| Asset/Subsystem | Zone Placement | SL-T (Target) | Applicable IEC 62443-4-2 Requirements |
| :--- | :--- | :--- | :--- |
| **BMS Platform (Johnson Controls Metasys ADS/ADX)** | Zone 4 (Control Center) | SL-3 | FR 1 (Use Control), FR 3 (System Integrity), FR 4 (Data Confidentiality), FR 5 (Restricted Data Flow), FR 7 (Resource Availability); SR 3.1 (Malicious Code Protection), SR 5.1 (Network Segmentation), SR 5.2 (Security of Information Assurance) |
| **BMS Platform (Honeywell Niagara/JACE)** | Zone 4 (Control Center) | SL-3 | FR 1, FR 2 (Use Control), FR 3, FR 5, FR 7; SR 2.1 (User Identification & Authentication Control), SR 2.2 (Password-Based Authentication Control), SR 3.1, SR 5.1, SR 5.4 (Protection from Misuse) |
| **BMS Platform (Siemens Desigo CC)** | Zone 4 (Control Center) | SL-3 | FR 1, FR 3, FR 4, FR 5, FR 7; SR 1.1 (Identification of the Roles), SR 2.1, SR 3.1, SR 5.1, SR 6.1 (Timely Remediation of Security Issues) |
| **Cooling Controller (ABB AC500 V3)** | Zone 3 (Area Supervisory Control) | SL-3 | FR 1, FR 3, FR 5, FR 7; SR 1.1, SR 2.1, SR 3.1, SR 5.1, SR 6.1 |
| **Cooling VFD (Siemens SINAMICS S200)** | Zone 2 (Basic Process Control) | SL-2 | FR 1, FR 3, FR 7; SR 2.1, SR 3.1, SR 6.1 (Secure by Design) |
| **Cooling VFD (Danfoss VLT®)** | Zone 2 (Basic Process Control) | SL-2 | Certified: FR 1, FR 3, FR 7; SR 2.1, SR 3.1, SR 5.1, SR 6.1 |
| **UPS (Schneider Electric APC NMC2/NMC3)** | Zone 1 (Physical Process) | SL-2 | FR 1, FR 3, FR 5, FR 7; SR 2.1, SR 3.1, SR 5.1, SR 6.1 |
| **UPS (Eaton Network-M2/M3)** | Zone 1 (Physical Process) | SL-2 | FR 1, FR 3, FR 5, FR 7; SR 2.1, SR 3.1, SR 5.1, SR 6.1 |
| **UPS (Vertiv IntelliSlot RDU101)** | Zone 1 (Physical Process) | SL-2 | FR 1, FR 3, FR 5, FR 7; SR 2.1, SR 3.1, SR 5.1, SR 6.1 |
| **Power Relay (Siemens SIPROTEC 5)** | Zone 2 (Basic Process Control) | SL-3 | FR 1, FR 3, FR 5, FR 7; SR 2.1, SR 3.1, SR 5.1, SR 5.2, SR 6.1 |
| **ATS Remote Annunciator (ASCO 5310)** | Zone 2 (Basic Process Control) | SL-2 | FR 1, FR 3, FR 5, FR 7; SR 2.1, SR 3.1, SR 5.1, SR 6.1 |
| **DCIM Platform (Schneider EcoStruxure IT DCE)** | Zone 4 (Control Center) | SL-3 | FR 1, FR 3, FR 4, FR 5, FR 7; SR 1.1, SR 2.1, SR 3.1, SR 5.1, SR 5.2, SR 6.1 |
| **Power Monitoring (Schneider PME)** | Zone 3 (Area Supervisory Control) | SL-3 | FR 1, FR 3, FR 4, FR 5, FR 7; SR 1.1, SR 2.1, SR 3.1, SR 5.1, SR 5.2, SR 6.1 |
| **Industrial Network Switch (Moxa EDR-810)** | Zone 2/3 (Control System Network) | SL-3 | FR 1, FR 3, FR 5, FR 7; SR 2.1, SR 2.4 (Password Management), SR 3.1, SR 5.1, SR 5.2, SR 5.4, SR 6.1 |
| **Industrial Network Switch (Cisco IE3400)** | Zone 2/3 (Control System Network) | SL-3 | FR 1, FR 3, FR 5, FR 7; SR 2.1, SR 3.1, SR 5.1, SR 5.2, SR 6.1 |
| **Physical Security Server (Genetec Security Center)** | Zone 4 (Control Center) | SL-3 | FR 1, FR 3, FR 4, FR 5, FR 7; SR 1.1, SR 2.1, SR 3.1, SR 5.1, SR 5.2, SR 6.1 |
| **Access Control Panel (HID Mercury)** | Zone 3 (Area Supervisory Control) | SL-3 | FR 1, FR 3, FR 5, FR 7; SR 2.1, SR 3.1, SR 5.1, SR 6.1 |
| **Camera/Video Management (Axis Camera Station)** | Zone 4 (Control Center) | SL-3 | FR 1, FR 3, FR 4, FR 5, FR 7; SR 1.1, SR 2.1, SR 3.1, SR 5.1, SR 6.1 |

### Table 2: Asset → Certification Status → Gap Description

| Asset/Subsystem | Certification Status | Gap Description vs. SL-3/SL-4 |
| :--- | :--- | :--- |
| **BMS: Johnson Controls Metasys** | Not Certified (CVE-2025-26385, CVSS 10.0) | **CRITICAL GAP (SL-4 Failure).** FR 3 (System Integrity) violated; unauthenticated remote command injection. No ISASecure or IEC 62443-4-2 certification. Patch GIV-165989 required. |
| **BMS: Honeywell Niagara** | Not Certified (CVE-2025-3936/37/41/44, CVSS 9.8) | **Major GAP (SL-3 Failure).** FR 2 (Use Control) violated; MiTM and credential-based attacks possible. No ISASecure certification. Requires migration to Niagara 4.14u2. |
| **BMS: Siemens Desigo CC** | Partial (Wibu CodeMeter component only) | **Major GAP (SL-3 Failure).** FR 1 (Use Control) and FR 3 (System Integrity) violated via privilege escalation (CVE-2025-47809). Missing authentication on SQL port (CVE-2024-23815). |
| **Cooling Controller: ABB AC500 V3** | Not Certified (CVE-2025-2595) | **Moderate GAP.** FR 1 (Use Control) gap due to valid accounts vulnerability. Firmware 3.9.0 resolves; no ISASecure certification. |
| **Cooling VFD: Danfoss VLT®** | **Certified: IEC 62443-4-2 SL1** | **GAP to SL-2/3.** Certified for basic requirements but lacks SL-2/3 verification for FR 4 (Data Confidentiality) and advanced SRs (e.g., SR 5.2). |
| **UPS: Schneider APC NMC** | Not Certified (CVE-2022-22805/06, CVSS 9.8) | **Major GAP.** FR 3 (System Integrity) and FR 5 (Restricted Data Flow) violated by TLStorm vulnerabilities. Default credentials (T0812) persist in field. |
| **UPS: Eaton Network-M2** | Not Certified (CVE-2025-22495) | **Major GAP.** FR 3 (System Integrity) violated; command injection. Network-M2 is EOL, creating an unremediable architectural gap. |
| **DCIM: Schneider EcoStruxure IT DCE** | Not Certified (CVE-2025-50121 to -50125, CVSS Critical) | **CRITICAL GAP (SL-4 Failure).** FR 1, FR 3, FR 4, FR 5, FR 7 all violated. OS command injection, RCE. No ISASecure certification. Requires upgrade to v9.0. |
| **Network Switch: Moxa EDR-810** | Not Certified (CVE-2024-9138, CVSS 8.6) | **Major GAP.** FR 1 (Use Control) violated via hard-coded credentials. No IEC 62443-4-2 certification. |
| **Access Control: HID Mercury** | Not Certified (CVE-2022-31481, CVSS 10.0) | **Major GAP.** FR 1, FR 3, FR 7 violated. Buffer overflows and command injection. Many deployments on vulnerable firmware. |
| **Protocol: BACnet/Modbus** | **Insecure by Design** | **CRITICAL GAP (SL-4 Failure).** FR 4 (Data Confidentiality) and FR 5 (Restricted Data Flow) inherently violated. No native authentication, encryption, or integrity checking. |

### Table 3: Asset → Non-IEC Standards Applicability

| Asset/Subsystem | Applicable Non-IEC Standards & Clauses |
| :--- | :--- |
| **Cooling Systems (CDUs, Chillers, CRAH/VFDs)** | **ASHRAE TC 9.9 (Thermal Guidelines):** A2 class environment limits for safe IT equipment operation. Mandates redundant cooling (N+1) to prevent cascading failure. **NFPA 75/76:** Physical protection of IT and telecommunications equipment; fire resistance for rooms housing cooling infrastructure. |
| **Power Systems (UPS, PDUs, ATS)** | **NFPA 110 (Emergency and Standby Power Systems):** Level 1 system requirements for critical load; defines Type X, Y, Z classifications and maximum transfer times. **IEEE 1547-2018:** Interconnection of distributed energy resources; relevant for UPS and generator tie-ins. **EN 50600 Series:** Availability classes (1-4) for data center power infrastructure; mandates concurrent maintainability for Class 3/4. |
| **Fire Suppression Systems** | **NFPA 2001 (Clean Agent Fire Extinguishing Systems):** Design, installation, and maintenance of gaseous suppression systems (e.g., FM-200, Novec 1230). Interlocks with BMS for pre-discharge alarms and EPO. **NFPA 72 (National Fire Alarm and Signaling Code):** Integration and monitoring of fire alarm pull stations and sensors by BMS. |
| **BMS/DCIM Platforms** | **ASHRAE Guideline 36-2021:** High-Performance Sequences of Operation for HVAC systems. Compromise of BMS setpoints violates these sequences. **ISO/IEC 27001:** Information Security Management, often required for SOC 2 audits; applies to data integrity and availability of DCIM data. |
| **Physical Security (Access Control, Video)** | **UL 294:** Standard for Access Control System Units. **UL 2050:** Standard for National Industrial Security Systems. Mandates hardware integrity and secure communication for high-security areas. **NFPA 731:** Standard for Installation of Electronic Premises Security Systems. |

### Section: Architectural Recommendations for Closing Gaps

1.  **Zone Segmentation and Conduit Definition (IEC 62443-3-3 SR 5.1):** Implement strict network segmentation to isolate zones. All identified Zone 1 assets (UPS, PDU) must be placed behind a dedicated industrial firewall in a conduit terminated at the Zone 2/3 boundary. The conduit for BACnet/Modbus traffic must incorporate a protocol-aware deep packet inspection (DPI) firewall or data diode to enforce SR 5.1 (Network Segmentation) and mitigate the inherent protocol insecurity.

2.  **Firmware and Patch Management (IEC 62443-4-2 SR 6.1):** Mandate a program for timely remediation of security vulnerabilities. For unpatchable, EOL assets (e.g., Eaton Network-M2, Cisco IE3000), develop a phased replacement plan. Architectural elimination via network isolation (SR 5.1) is required until replacement.

3.  **Hardening of Zone 4 Control Systems (IEC 62443-4-2 SR 1.1, SR 2.1):** Apply SR 1.1 (Identification of Roles) and SR 2.1 (User Identification & Authentication) to all Zone 4 platforms (Metasys, Niagara, Desigo CC, DCE). Implement unique role-based accounts and eliminate shared/default credentials (addressing T0812, T0859). Enforce multi-factor authentication for administrative access to meet SL-4 requirements.

4.  **Secure Data Flow for Monitoring (IEC 62443-4-2 FR 5, SR 5.2):** All DCIM/OT monitoring traffic (DCE, PME) from lower zones to Zone 4 must be encrypted (SR 5.2) using TLS 1.2+ or IPsec. Unencrypted Modbus/BACnet telemetry must be encapsulated or proxied at the zone boundary.

5.  **Physical Interlocks and Safety Integrity (NFPA 2001, IEC 62443-3-3 SR 3.1):** For high-consequence scenarios (e.g., fire suppression false activation), enforce architectural separation. The BMS-to-fire alarm panel (FAP) interface must be a one-way, hardware-isolated conduit. The EPO button circuit must have a physical, non-networked override path to prevent cyber-induced catastrophic shutdown, satisfying both NFPA and IEC 62443 safety requirements.