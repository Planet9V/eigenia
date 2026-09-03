# Standards Mapping: WP99
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:30:47.336403

### **IEC 62443 Mapping for WP99 Datacenter OT Infrastructure**

This analysis maps the specific assets and subsystems referenced in the provided normative and informative citations to IEC 62443 security requirements, targeting Security Level 3 (SL-3) for industrial control system (ICS) environments and Security Level 4 (SL-4) for critical infrastructure with nation-state threat models. The mapping is granular, referencing specific clauses and standards.

**Assumed Asset Set Derived from References:** The chapter's references explicitly cite technologies and systems common to datacenter operational technology (OT). The following assets are mapped:
1.  **Uninterruptible Power Supply (UPS)** (e.g., APC Smart-UPS from *TLStorm* advisory)
2.  **Power Distribution Units (PDUs)**
3.  **Coolant Distribution Units (CDUs)** (e.g., OCP ACS CDU)
4.  **Clean Agent Fire Extinguishing Systems** (NFPA 2001)
5.  **Stationary Energy Storage Systems** (e.g., Battery Systems, NFPA 855)
6.  **Industrial Network Switches** (e.g., Moxa EDS-G500E)
7.  **Building Management System (BMS)** / Integrated Control System (e.g., Johnson Controls Metasys)
8.  **Industrial Control Systems (ICS)** (e.g., Unitronics Vision PLCs)

---

#### **Table 1: Asset → Zone → SL-T → IEC 62443-4-2 FR/SR Requirements**

| Asset | IEC 62443-3-2 Zone Placement | Target Security Level (SL-T) | IEC 62443-4-2 Functional Requirements (FR) / System Requirements (SR) |
| :--- | :--- | :--- | :--- |
| **UPS System** | Zone 2 (Control Network) or Zone 3 (Site Operations) | SL-3 | **FR 1 (Identification & Authentication Control):** SR 1.1 (Id. Management), SR 1.5 (Auth. Data). <br> **FR 2 (Use Control):** SR 2.4 (Access by Authorizable Users). <br> **FR 3 (System Integrity):** SR 3.1 (Malicious Code Protection), SR 3.5 (Response to Alarms). <br> **FR 4 (Data Confidentiality):** SR 4.1 (Information Confidentiality). <br> **FR 5 (Restricted Data Flow):** SR 5.1 (Network Segmentation). |
| **Power Distribution Unit** | Zone 2 or Zone 3 | SL-3 | **FR 1:** SR 1.1, SR 1.2 (Password-Based Auth.). <br> **FR 3:** SR 3.5 (Integrity Verification). <br> **FR 5:** SR 5.1, SR 5.2 (Control System Packet Filtering). |
| **Coolant Distribution Unit** | Zone 2 (Safety-Critical Control Network) | SL-3 | **FR 1:** SR 1.1, SR 1.7 (Password Strength). <br> **FR 3:** SR 3.2 (Software & Info Integrity), SR 3.6 (Resource Availability - critical for thermal safety). <br> **FR 6 (Timely Response to Events):** SR 6.1 (Audit Log Accessibility). |
| **Clean Agent Fire Suppression** | Zone 1 (Physical Security) / Zone 2 (if network-monitored) | SL-3 | **FR 3:** SR 3.3 (Error Handling), SR 3.7 (Network Interruption). <br> **FR 6:** SR 6.1, SR 6.2 (Audit Record Protection). *Note: Network-connected actuation panels require higher FRs.* |
| **Energy Storage System (Battery)** | Zone 2 (Control Network) | SL-3 | **FR 1:** SR 1.5 (Auth. Data). <br> **FR 3:** SR 3.1, SR 3.3 (Error Handling). <br> **FR 5:** SR 5.1 (Network Segmentation - mandatory isolation per NFPA 855). <br> **FR 7 (Resource Availability):** SR 7.1 (Denial of Service Protection). |
| **Industrial Network Switch** | Zone 1 (Network Infrastructure) | SL-4 | **FR 1:** SR 1.8 (Use of Authentication Protocols), SR 1.9 (Unsuccessful Login Attempts). <br> **FR 2:** SR 2.1 (Authorization Enforcement), SR 2.2 (Control of User Access Rights). <br> **FR 3:** SR 3.2, SR 3.4 (Software and Information Integrity), SR 3.8 (Audit Log Integrity). <br> **FR 5:** SR 5.1, SR 5.2, SR 5.3 (Control Network Segmentation). <br> **FR 6:** SR 6.1 (Audit Record Access). |
| **BMS / Integrated Control** | Zone 2 (Control Network) | SL-3 | **FR 1:** SR 1.1, SR 1.3 (Auth. Methods), SR 1.5, SR 1.8, SR 1.11 (Strength of Password-Based Auth.). <br> **FR 2:** SR 2.1, SR 2.4, SR 2.5 (Account Management). <br> **FR 3:** SR 3.1, SR 3.2, SR 3.5 (Response to Alarms). <br> **FR 4:** SR 4.1, SR 4.2 (Use of Cryptography). <br> **FR 5:** SR 5.1, SR 5.2. <br> **FR 6:** SR 6.1, SR 6.2, SR 6.3 (Timely Response). |
| **ICS (PLCs)** | Zone 3 (Basic Control) | SL-3 | **FR 1:** SR 1.1, SR 1.2, SR 1.11. <br> **FR 2:** SR 2.1, SR 2.4. <br> **FR 3:** SR 3.1 (no remote code execution), SR 3.2, SR 3.5. <br> **FR 4:** SR 4.1 (if applicable). <br> **FR 5:** SR 5.1. |

---

#### **Table 2: Asset → Certification Status → Gap Description**

| Asset | ISASecure / OCP SAFE Certification Status | Gap Description vs. SL-3/SL-4 Target |
| :--- | :--- | :--- |
| **UPS System** | **Gap** (Ref: CISA advisory ICSA-25-xxx on Honeywell Niagara; TLStorm on APC indicates vulnerability) | **Gap to SL-3:** Lacks **FR 3: SR 3.2 (Software and Info Integrity)** for firmware; lacks **FR 4: SR 4.2 (Use of Cryptography)** for secure update channels. Vulnerable to hard-coded credentials (**FR 1: SR 1.5**). |
| **Power Distribution Unit** | **Gap** | **Gap to SL-3:** Insufficient authentication strength (**FR 1: SR 1.11**). Lacks audit logging for access (**FR 6: SR 6.1**). Inadequate protection of security parameters (**FR 1: SR 1.5**). |
| **Coolant Distribution Unit** | **Certified (Assumed)** (OCP SAFE or ISASecure for ACS components) | **Gap to SL-3:** Potential gap in **FR 6: SR 6.2 (Audit Record Protection)** for tamper-resistant logging. Must validate cryptographic integrity (**FR 3: SR 3.4**) of firmware updates. |
| **Clean Agent Fire Suppression** | **Certified (Component)** (NFPA 2001 compliance) | **Gap to SL-3 (Network-Managed Systems):** Lacks secure communication (**FR 4: SR 4.2**) between detection/control panels and network. Lacks integrity checks on actuation commands (**FR 3: SR 3.2**). |
| **Energy Storage System** | **Gap** (Ref: NFPA 855; no cited certification) | **Gap to SL-3:** Lacks network segmentation enforcement (**FR 5: SR 5.1**). Inadequate authentication for management interfaces (**FR 1: SR 1.1, SR 1.11**). Vulnerable to availability attacks (**FR 7: SR 7.1**). |
| **Industrial Network Switch** | **Certified (OCP SAFE)** (Ref: OCP S.A.F.E.) | **Gap to SL-4:** Must verify coverage of **FR 2: SR 2.5 (Account Management)** for multi-admin support and **FR 6: SR 6.3 (Timely Response to Events)** for real-time alerting. Validate cryptographic strength (**FR 4: SR 4.2**) meets FIPS 140-2/3. |
| **BMS / Integrated Control** | **Gap** (Ref: CISA advisory ICSA-23-299-03) | **Gap to SL-3:** Critical gaps in **FR 1: SR 1.1 (Id. Management)** and **FR 2: SR 2.1 (Authorization Enforcement)** leading to privilege escalation. Lacks cryptographic integrity for data-in-transit (**FR 4: SR 4.2**). |
| **ICS (PLCs)** | **Gap** (Ref: CISA advisory ICSA-23-334-01) | **Gap to SL-3:** Pervasive hard-coded credentials (**FR 1: SR 1.5**). No secure boot or integrity verification (**FR 3: SR 3.4**). Inadequate input validation (**FR 3: SR 3.2**). |

---

#### **Table 3: Asset → Non-IEC Standards Applicability**

| Asset | Applicable ASHRAE / NFPA / IEEE / EN 50600 / TIA-942 Requirements |
| :--- | :--- |
| **UPS System** | **ASHRAE TC 9.9 A2 Class:** Thermal guidelines for server inlets (35-40°C). <br> **NFPA 110:** Standard for Emergency and Standby Power Systems. |
| **Power Distribution Unit** | **TIA-942-B (§8):** Electrical supply infrastructure. <br> **ASHRAE TC 9.9 A2 Class:** Environmental operating limits for devices in row. |
| **Coolant Distribution Unit** | **ASHRAE TC 9.9 (2021):** Advanced Cooling Solutions guidelines. <br> **OCP ACS CDU Spec (2025):** Performance and interface specifications. <br> **ISO/IEC 22237-4:** Data centre cooling. |
| **Clean Agent Fire Suppression** | **NFPA 2001:** Standard on Clean Agent Fire Extinguishing Systems. <br> **NFPA 72:** National Fire Alarm and Signalling Code (§17 for agent systems). |
| **Energy Storage System** | **NFPA 855:2023:** Standard for Installation of Stationary Energy Storage Systems. <br> **IEEE 2800-2022:** Standard for Interconnection of Energy Storage Systems. |
| **Industrial Network Switch** | **IEEE 802.1X:** Port-based network access control. <br> **TIA-942-B (§7):** Telecommunications cabling infrastructure. <br> **EN 50600 Series:** Data centre facilities (network layer resilience). |
| **BMS / Integrated Control** | **ASHRAE Guideline 36-2021:** High-Performance Sequences of Operation for HVAC. <br> **ISA-95.00.01:** Enterprise-Control System Integration (BMS to MES interface). |
| **ICS (PLCs)** | **IEC 61508 (2010):** Functional Safety of E/E/PE Safety-Related Systems. <br> **IEC 61511 (2016):** Safety Instrumented Systems for Process Sector. <br> **IEC 61850 (2013):** Communication networks for power utility automation. |

---

### **Architectural Recommendations for Closing Gaps**

1.  **Mandate ISASecure or OCP SAFE Certification (SL-T 3/4):** All Zone 2/3 components (UPS, PDU, CDU, BMS, ICS) must achieve ISASecure IACS Component Security Capability (CSC) certification or OCP SAFE certification for network devices. This directly addresses gaps in **IEC 62443-4-2 FR3 (System Integrity)** and **FR1 (Identification & Authentication Control)**.
2.  **Implement Cryptographic Enforcement at Network Edge:** Deploy network switches certified to **OCP SAFE SL-4** and configured for **IEC 62443-5-1 FR1 (SR 1.8 - Use of Authentication Protocols)** using FIPS 140-3 validated modules. This establishes a secure boundary for all Zone 2 assets.
3.  **Deploy Hardware Security Modules (HSMs) for Root of Trust:** Integrate HSMs with BMS and ICS to enforce **IEC 62443-4-2 FR3: SR 3.4 (Software and Information Integrity)** via secure boot and measured launch, mitigating gaps in legacy PLCs and controllers.
4.  **Isolate Safety-Critical Systems per NFPA 855:** Enforce a physically separate, monitored network segment for Battery Energy Storage Systems per **NFPA 855 §16** and **IEC 62443-3-3 SR 5.1 (Network Segmentation)**, with a data diode for unidirectional monitoring to meet **SL-3**.
5.  **Integrate Audit Log Forwarding to SIEM:** Ensure all assets (including fire suppression panels and CDUs) forward logs to a central SIEM via **IEC 62443-3-3 SR 6.1 (Audit Log Accessibility)** and **SR 6.2 (Audit Record Protection)**, with integrity protections via **IEC 62443-4-2 FR6**.