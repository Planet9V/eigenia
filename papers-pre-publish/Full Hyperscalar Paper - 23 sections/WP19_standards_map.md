# Standards Mapping: WP19
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:28:49.664048

### Table 1: Asset → Zone → SL-T → IEC 62443-4-2 FR/SR Requirements

| Asset/Subsystem | Zone Placement (IEC 62443-3-2) | Target Security Level (SL-T) | IEC 62443-4-2 Applicable FR/SR Requirements |
| :--- | :--- | :--- | :--- |
| **Cooling Distribution Unit (CDU) Controller** | Zone 2 (Control Zone - Cooling) | SL-3 | FR3 (System Integrity): SR 3.1 (Malicious Code Protection), SR 3.2 (Software Integrity Verification).<br>FR4 (Data Confidentiality): SR 4.1 (Data-at-rest Confidentiality).<br>FR5 (Restricted Data Flow): SR 5.1 (Network Segmentation). |
| **Power Distribution Unit (PDU) Controller** | Zone 1 (Control Zone - Power) | SL-3 | FR1 (Identification & Authentication): SR 1.1 (User Identification).<br>FR2 (Use Control): SR 2.1 (User Authentication).<br>FR3 (System Integrity): SR 3.1 (Malicious Code Protection). |
| **Fire Suppression Panel / SIS** | Zone 4 (Safety Zone) | SL-4 | FR1 (Identification & Authentication): SR 1.1 (User Identification), SR 1.2 (User Authentication).<br>FR3 (System Integrity): SR 3.5 (Response to Errors).<br>FR7 (Resource Availability): SR 7.1 (Denial of Service Protection). |
| **Building Management System (BMS)** | Zone 2 (Control Zone - Environmental) | SL-3 | FR1 (Identification & Authentication): SR 1.1 (User Identification).<br>FR2 (Use Control): SR 2.1 (User Authentication), SR 2.2 (User Access Control).<br>FR5 (Restricted Data Flow): SR 5.1 (Network Segmentation), SR 5.4 (Control Information Filtering). |
| **Emergency Power Off (EPMS) Panel** | Zone 1 (Control Zone - Power) | SL-3 | FR1 (Identification & Authentication): SR 1.1 (User Identification).<br>FR3 (System Integrity): SR 3.5 (Response to Errors). |
| **Physical Access Control System (PACS)** | Zone 3 (Safety/Security Zone) | SL-3 | FR1 (Identification & Authentication): SR 1.1 (User Identification), SR 1.2 (User Authentication).<br>FR2 (Use Control): SR 2.1 (User Authentication).<br>FR6 (Timely Response to Events): SR 6.1 (Audit Log Accessibility). |
| **Data Center Infrastructure Management (DCIM)** | Zone 2 (Control Zone - Management) | SL-2 | FR1 (Identification & Authentication): SR 1.1 (User Identification).<br>FR4 (Data Confidentiality): SR 4.1 (Data-at-rest Confidentiality). |
| **Server BMC / Firmware** | Zone 0 (IT Compute Zone) | SL-3 | FR3 (System Integrity): SR 3.2 (Software Integrity Verification), SR 3.3 (Firmware Integrity).<br>FR4 (Data Confidentiality): SR 4.1 (Data-at-rest Confidentiality). |
| **OT Network Switches (e.g., Moxa, Belden)** | Zone Boundary (Conduit Enforcement Point) | SL-3 | FR5 (Restricted Data Flow): SR 5.1 (Network Segmentation), SR 5.2 (Bypass Prevention).<br>FR6 (Timely Response to Events): SR 6.1 (Audit Log Accessibility). |

### Table 2: Asset → Certification Status → Gap Description

| Asset/Subsystem | ISASecure / IEC 62443-4-2 Certification Status (as per Chapter) | Gap Description vs. SL-3/SL-4 |
| :--- | :--- | :--- |
| **OT Network Switches** | Certified Alternatives Exist (Moxa, Belden, Phoenix Contact) | **Gap:** Brownfield facilities often use unmanaged/non-certified switches, failing SR 5.1 (Network Segmentation) and SR 5.2 (Bypass Prevention) of FR5. |
| **BMS Controllers** | Certified Alternatives in Development (Honeywell QronoX, Schneider EcoStruxure) | **Gap:** Existing controllers likely lack SR 1.1/1.2 (Identification/Authentication - FR1), SR 2.1 (User Authentication - FR2), and SR 3.1 (Malicious Code Protection - FR3) for SL-3. |
| **CDU Controllers** | **Zero Certified Products** | **Gap:** Fundamental lack of all FR1, FR2, FR3, and FR4 functionalities required for SL-3. No authentication, integrity verification, or secure logging. |
| **PDUs** | **Zero Certified Products** | **Gap:** Lack of SR 1.1 (User Identification - FR1) and SR 3.1 (Malicious Code Protection - FR3) for SL-3. |
| **Fire Suppression Panels** | **Zero Certified Products** | **Gap:** Critical lack of SR 1.1/1.2 (Identification/Authentication - FR1) and SR 3.5 (Response to Errors - FR3) for SL-4 safety assurance. |
| **Server BMC Firmware** | **Low OCP S.A.F.E. Adoption** | **Gap:** Most deployments lack verified firmware integrity (SR 3.3 - FR3) and secure boot, creating a persistent attack surface below the OS layer. |

### Table 3: Asset → Non-IEC Standards Applicability (ASHRAE, NFPA, etc)

| Asset/Subsystem | Applicable Non-IEC Standards | Key Requirements |
| :--- | :--- | :--- |
| **CDU, BMS, DCIM (Environmental Control)** | ASHRAE TC 9.9 (Thermal Guidelines), EN 50600-4-2 (Environmental Control) | **ASHRAE TC 9.9 A2/A3 Class:** Defines allowable environmental envelopes. Cyber failure must not breach thermal limits (e.g., 24-27°C inlet temp).<br>**EN 50600-4-2 Clause 5:** Requires monitoring and control systems for power/cooling to ensure availability. |
| **Fire Suppression, SIS, EPMS** | NFPA 75 (Fire Protection for IT Facilities), NFPA 76 (Telecommunications), NFPA 110 (Emergency Power), IEEE 1613 (Environmental Testing for Substations) | **NFPA 75 Chapter 5:** Mandates reliability and integrity of fire suppression actuation.<br>**IEEE 1613:** Defines environmental robustness for control equipment in power-critical environments.<br>**NFPA 110:** Governs reliability of emergency power transfer, relevant to EPMS. |
| **All OT Controllers, Switches** | IEEE 1613, UL 2900 (Software Cybersecurity for Network-Connectable Products) | **IEEE 1613:** Specifies environmental and EMC testing for equipment in power substations, applicable to data center power plant control.<br>**UL 2900:** Provides a baseline cybersecurity testing framework for connected products, often a precursor to formal IEC 62443-4-2. |
| **Physical Infrastructure & Layout** | EN 50600 Series (Information Technology - Data Centre Facilities and Infrastructures) | **EN 50600-1/2:** Defines facility design, infrastructure topology, and redundancy requirements that dictate zone/conduit physical implementation. |

---

### Architectural Recommendations for Closing Gaps

1.  **Enforce Conduit-Mandated Segmentation (Imperative 2):** Implement a **strict zone/conduit architecture per IEC 62443-3-3 Clause 5.2 (Security Level Allocation) and Clause 6.3 (System Partitioning)**. Safety-critical zones (Fire Suppression, SIS) must be isolated via unidirectional gateways or air gaps, enforcing **SL-4** boundaries. Control zones (BMS, CDU) must terminate at **SL-3-rated firewalls with protocol-aware inspection (BACnet/MSTP, Modbus/TCP)** at every conduit, as specified in **IEC 62443-3-3 SR 5.1 (Network Segmentation)**.

2.  **Mandate Component Hardening via Procurement (Imperative 1):** Procurement specifications must require vendors to demonstrate conformance with **IEC 62443-4-2 at SL-2 for all network-connected components**, escalating to **SL-3 for control systems (CDU, BMS, EPMS)** and **SL-4 for safety systems (Fire, SIS)**. This directly maps to fulfilling **SR 1.1, SR 1.2, SR 2.1, SR 3.1, and SR 3.2**. For uncertified categories (CDU, PDU), impose **TSC (Technical Security Capabilities)** via contractual clauses equivalent to the required **FR/SR**.

3.  **Implement Passive Monitoring at Conduits (Imperative 3):** Deploy **OT-NDR sensors** at every zone conduit enforcement point, as required by **IEC 62443-3-3 SR 6.1 (Security Monitoring)**. These sensors shall baseline protocol behavior (BACnet, Modbus) to detect anomalies indicative of **spoofing (CyHAZOPs guide word)** attacks against **FR6 (Timely Response to Events)**, specifically **SR 6.1 (Audit Log Accessibility)**.

4.  **Establish Firmware Lifecycle Control (Imperative 4):** For all PLCs/Controllers (CDU, BMS, Fire), enforce **IEC 62443-4-2 FR3 (System Integrity) SR 3.3 (Firmware Integrity)**. This requires: (a) **Cryptographic signature verification** of firmware binaries during loading, (b) **Hardware write-protection** for bootloaders, and (c) **Maintenance of hash baselines** for commissioning and periodic verification, aligned with **OCP S.A.F.E.** standards for BMCs.

5.  **Integrate Cyber-Physical HAZOP into Commissioning (Imperative 5):** Mandate a **CyHAZOP assessment per IEC 62443-3-2 Clause 7 (Security Risk Assessment)** before facility commissioning. This must explicitly map **SL-T** to each asset's physical consequence, using the 3-13× cyber multiplier (Chapter 9) to justify **SL-3/SL-4** allocations, ensuring the zone/conduit model adequately mitigates identified **dual-RPN** risks.