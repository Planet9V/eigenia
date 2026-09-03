# Standards Mapping: WP07
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T07:42:04.587486

Here is the comprehensive standards mapping table for WP07 Infrastructure assets based on the provided chapter content and CVE research.

### **Table 1: Asset → Zone → SL-T → IEC 62443-4-2 FR/SR Requirements**

| Asset | IEC 62443 Zone | SL-T (Target) | IEC 62443-4-2 Functional Requirements (FR) & System Requirements (SR) |
| :--- | :--- | :--- | :--- |
| **Electrical Power Chain** | | | |
| HV/MV Switchgear (Relays/Meters) | Z3 | SL-T 2 | FR1 (Identification & Auth Control - IAC), FR3 (System Integrity), FR7 (Resource Availability) |
| Substation Transformers | Z3 | SL-T 1-2 | FR3 (System Integrity), FR7 (Resource Availability) |
| Protection Relays (SEL, ABB, Siemens) | Z3 (Process); Z2 (Station) | SL-T 2-3 | FR1 (IAC), FR2 (Use Control), FR3 (System Integrity), FR5 (Restricted Data Flow) |
| UPS Power Stage | Z3 | SL-T 1-2 | FR3 (System Integrity), FR7 (Resource Availability) |
| UPS Network Management Card (NMC) | Z2 | SL-T 2-3 | FR1 (IAC), FR2 (Use Control), FR5 (Restricted Data Flow), SR 1.13 (Denial of Service) |
| ATS/STS | Z3 | SL-T 2 | FR1 (IAC), FR3 (System Integrity), FR7 (Resource Availability) |
| Generators & Paralleling Controls | Z3 (ECU); Z2 (Controls) | SL-T 2 | FR1 (IAC), FR2 (Use Control), FR3 (System Integrity) |
| Battery Systems (BMS) | Z2 | SL-T 2-3 | FR1 (IAC), FR3 (System Integrity), FR5 (Restricted Data Flow) |
| Intelligent Rack PDUs | Z2 | SL-T 2-3 | FR1 (IAC), FR2 (Use Control), FR5 (Restricted Data Flow) |
| EPMS (SCADA Server) | Z2 | SL-T 2-3 | FR1 (IAC), FR2 (Use Control), FR5 (Restricted Data Flow), FR7 (Resource Availability) |
| **Mechanical & Cooling** | | | |
| Chiller Controllers | Z2 | SL-T 2 | FR1 (IAC), FR2 (Use Control), FR5 (Restricted Data Flow) |
| Cooling Tower VFDs/Sensors | Z3 | SL-T 1-2 | FR3 (System Integrity), FR7 (Resource Availability) |
| Hydronic Pump VFDs (ABB, Danfoss, Siemens) | Z2 | SL-T 2 | FR1 (IAC), FR2 (Use Control), FR3 (System Integrity) |
| Data Hall Cooling (CDU, CRAH/CRAC) | Z3 (Field); Z2 (Head-End) | SL-T 1-2 | FR3 (System Integrity), FR7 (Resource Availability) |
| **Building & Process Control** | | | |
| BMS Head-End (Metasys, Desigo, EBO) | Z2 | SL-T 2-3 | FR1 (IAC), FR2 (Use Control), FR5 (Restricted Data Flow), FR7 (Resource Availability) |
| DDC Controllers / Field Devices | Z3 | SL-T 1-2 | FR1 (IAC), FR3 (System Integrity) |
| VFDs (ACS880, SINAMICS) | Z2 | SL-T 2 | FR1 (IAC), FR2 (Use Control), FR3 (System Integrity) |
| Fire Alarm Panels / EPO | Z4 | SL-T 2-3 | FR1 (IAC), FR2 (Use Control), FR7 (Resource Availability) |
| **Physical Security** | | | |
| Access Control Panels (HID Mercury) | Z2 | SL-T 2 | FR1 (IAC), FR2 (Use Control), FR5 (Restricted Data Flow) |
| Security Cameras (Axis, Verkada) | Z2 | SL-T 2 | FR1 (IAC), FR2 (Use Control), FR5 (Restricted Data Flow) |
| **DCIM / OT Monitoring** | | | |
| DCIM Platform (Schneider DCE) | Z1 | SL-T 2-3 | FR1 (IAC), FR2 (Use Control), FR5 (Restricted Data Flow), FR7 (Resource Availability) |
| Power Monitoring (PME) | Z1/Z2 | SL-T 2-3 | FR1 (IAC), FR2 (Use Control), FR5 (Restricted Data Flow) |
| OT IDS/IPS (Claroty, Nozomi) | Z1 | SL-T 3 | FR1 (IAC), FR2 (Use Control), FR5 (Restricted Data Flow), FR7 (Resource Availability) |
| **Industrial Network** | | | |
| Managed OT Switch (Moxa, Cisco IE) | Z2/Z3 | SL-T 2-3 | FR1 (IAC), FR2 (Use Control), FR5 (Restricted Data Flow) |
| Serial Console / OOB Switch | Z5 | SL-T 3 | FR1 (IAC), FR2 (Use Control), FR5 (Restricted Data Flow) |

---

### **Table 2: Asset → Certification Status → Gap Description**

| Asset | ISASecure / Vendor Certification Status | Gap Analysis vs. SL-3/SL-4 |
| :--- | :--- | :--- |
| **Electrical Power Chain** | | |
| Protection Relays (SEL, ABB) | Vendor-specific safety SIL certifications; **No IEC 62443-4-2** | **FR2 (Use Control):** Lack of role-based access control. **FR5 (Restricted Data Flow):** Clear-text protocols (DNP3, Modbus). |
| UPS NMC (Schneider, Vertiv, Eaton) | Schneider & Vertiv **SL-2 certified**; Eaton M3 **SL-2** | **FR5:** Legacy protocols (Modbus, SNMPv3 without encryption). **FR1:** Default credentials (e.g., "apc") common. |
| Rack PDUs (Vertiv, Raritan, Schneider) | **No IEC 62443 certification** | **Critical Gap:** Actuator control (switched outlets) over cleartext HTTP/Modbus. Lacks FR1 (Strong Auth), FR5 (Encrypted Flow). |
| EPMS (Schneider PME) | Schneider PME **SL-2 certified** | **FR5:** Relies on clear-text Modbus/TCP. **FR7:** Deserialization/SSRF vulnerabilities (CVE-2025-54923). |
| **Building & Process Control** | | |
| BMS Head-End (JCI Metasys) | **No IEC 62443 certification** | **Critical Gap:** CVSS 10.0 SQL injection (CVE-2025-26385). Fails FR1, FR2, FR3, FR7 for SL-3/4. |
| BMS Head-End (Honeywell Niagara) | **No IEC 62443 certification** | **FR1 & FR2:** Hard-coded/default credentials (CVE-2025-3937). **FR5:** Lack of TLS enforcement enables MiTM. |
| VFDs (ABB ACS880) | **No IEC 62443 certification**; CODESYS-based | **FR2:** Access control via engineering software. **FR5:** CODESYS RTS vulnerabilities affect integrity. |
| **Physical Security** | | |
| Access Control (HID Mercury) | **No current IEC 62443 certification**; 2022 CVEs unpatched in field | **Critical Gap:** Buffer overflows (CVE-2022-31481). Fails FR1, FR3, FR7 for SL-3. |
| **DCIM / OT Monitoring** | | |
| Schneider EcoStruxure IT DCE | **No IEC 62443 certification** | **Critical Gap:** 5 Critical CVEs (e.g., CVE-2025-50121) enabling RCE. Fails FR1, FR3, FR7. |
| **Industrial Network** | | |
| Moxa EDR-G9004/810 | **No IEC 62443 certification** | **Critical Gap:** Hard-coded credentials (CVE-2024-9138). Fails FR1, FR5. |
| Cisco IE3000 Series | **End-of-Support (2024)**; No 62443 cert | **FR7 (Availability):** No security patches. **FR5:** Inherits IOS XE vulnerabilities. |

---

### **Table 3: Asset → Non-IEC Standards Applicability (ASHRAE, NFPA, IEEE, EN 50600)**

| Asset | Applicable Non-IEC Standards | Specific Requirements |
| :--- | :--- | :--- |
| **All OT Assets in Data Center** | EN 50600-4-2 | **Cabling & Network Security:** Mandates segregation of BMS/OT networks. |
| Battery Systems (Li-ion, VRLA, BESS) | **NFPA 855** | Installation, operation, and safety of stationary energy storage systems. |
| Electrical Distribution (LV Switchgear, PDUs) | **IEEE 1584** (Arc Flash) | Hazard analysis and PPE requirements for electrical work. |
| Power Systems (UPS, Generators, PDUs) | **NFPA 110** | Standard for Emergency and Standby Power Systems. |
| Fire Alarm Systems (Z4) | **NFPA 72** | National Fire Alarm and Signaling Code. |
| Cooling Systems (Chillers, CDUs) | **ASHRAE 90.1** | Energy Standard for Buildings (efficiency requirements). |
| **All OT Networks** | **IEC 62351** (for Power Systems) | Security for power system communication (applicable to IEC 61850, DNP3). |
| **Physical Security & Cameras** | **NIST SP 800-53** (Controls) | Often referenced for access control and video surveillance system security. |
| **Data Center Design** | **EN 50173-1** (Cabling) | Generic cabling for data centers; supports physical layer segregation. |

---

### **Section: Architectural Recommendations for Closing Gaps**

Based on the asset mapping and gap analysis, the following architectural controls are required to achieve SL-3 for critical OT zones:

1.  **Conduit & Zone Segmentation:**
    *   **Z3 ↔ Z2 Boundary:** Enforce a strict **data diode or unidirectional security gateway** for all fire alarm signals (Z4→Z2). Implement a **next-gen industrial firewall** (e.g., Fortinet, Palo Alto with OT protocols) between Z3 field networks and Z2 supervisory networks. Default-deny all non-essential traffic.
    *   **Z2 → Z1/External Boundary:** All vendor remote access must traverse a **jump host in Z5 (OOB)** with multi-factor authentication (MFA) and session recording. No direct internet access to Z1/Z2.

2.  **Protocol Hardening (Mitigating Insecure-by-Design):**
    *   **Replace/Upgrade:** Phase out BACnet MS/TP and Modbus RTU for new deployments; migrate to BACnet/SC and OPC UA with TLS 1.2+.
    *   **Overlay Encryption:** Deploy an **OT protocol encryptor** (e.g., Claroty SRA, Tosibox) to create an encrypted tunnel for legacy Modbus TCP/TCP traffic between Z2 assets and Z3 controllers.

3.  **Authentication & Access Control:**
    *   **Mandatory MFA** for all interactive logins to Z1, Z2, and Z5 assets. Deploy a **Privileged Access Management (PAM)** solution for session brokering.
    *   **Eliminate Defaults:** Enforce a policy to change all vendor default credentials (e.g., APC "apc", Moxa "root") during commissioning.

4.  **Monitoring & Anomaly Detection:**
    *   **Deploy OT-NDR** (Network Detection & Response) like Claroty xDome, Nozomi Guardian, or Dragos in a **Z1 monitoring zone** to passively inventory assets, baseline traffic, and detect anomalous commands (e.g., unexpected Modbus writes to a UPS PDU).

5.  **Certification & Patch Strategy:**
    *   **Procurement Mandate:** Require IEC 62443-4-2 certification at the appropriate SL-T for all new OT procurements by 2026.
    *   **Compensating Controls:** For uncertified assets (e.g., rack PDUs, legacy relays), implement strict **micro-segmentation** using VLANs/ACLs and enhanced monitoring as a compensating control.

6.  **Physical Security Integration:**
    *   Ensure all physical security systems (access control, cameras) are on a **dedicated, non-routable VLAN** with no connection to the core business IT network, following the **Z2 zone model**.