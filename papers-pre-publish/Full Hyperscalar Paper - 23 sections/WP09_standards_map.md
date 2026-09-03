# Standards Mapping: WP09
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:14:59.354465

# IEC 62443 & Applicable Standards Mapping: WP09 Infrastructure Assets

## Table 1: Asset → Zone Placement → IEC 62443-4-2 FR/SR Requirements

| Asset / Subsystem | IEC 62443-3-2 Zone | Target SL (SL-T) | IEC 62443-4-2 Foundational Requirement & Security Requirement Mapping (Clause Citations) |
| :--- | :--- | :--- | :--- |
| **UPS NMC (Schneider NMC3)** | OT Control Zone (Dedicated Mgmt VLAN) | **SL-2** | **FR1 (Identification & Authentication Control):** SR 1.1 (Unique User ID), SR 1.2 (Password Mgmt), SR 1.3 (Authenticator Mgmt). **FR2 (Use Control):** SR 2.4 (Authorization Enforcement). **FR3 (System Integrity):** SR 3.5 (Integrity of Security Functions), SR 3.8 (Error Handling). **FR5 (Restricted Data Flow):** SR 5.1 (Network Segmentation). **FR6 (Timely Response to Events):** SR 6.2 (Audit Log Accessibility). **FR7 (Resource Availability):** SR 7.1 (DoS Protection). [Ref: IEC 62443-4-2:2019, Clauses 4.2.4.1 through 4.2.4.7] |
| **UPS Battery Management System** | OT Control Zone | **SL-3** | **FR1:** SR 1.13 (Authentication of Wireless Devices). **FR3:** SR 3.4 (Software Integrity), SR 3.7 (Run-time Application Integrity). **FR4 (Data Confidentiality):** SR 4.2 (Information Confidentiality). **FR5:** SR 5.2 (Use of Zone/Conduit). [Ref: IEC 62443-4-2:2019, Clauses 4.2.4.1 through 4.2.4.5] |
| **York YZ / Trane CTV Chiller Controller** | OT Control Zone | **SL-1** (per Table 9.5) | **FR1:** SR 1.1, SR 1.2. **FR3:** SR 3.5. **FR5:** SR 5.1. [Ref: IEC 62443-4-2:2019, Clause 4.2.4.1, 4.2.4.3, 4.2.4.5] |
| **Chiller Plant Optimiser (BMS DDC)** | OT Supervisory Zone | **SL-2** | **FR1:** SR 1.1, SR 1.2, SR 1.14 (Account Mgmt). **FR2:** SR 2.2 (Non-Interference). **FR3:** SR 3.5, SR 3.7. **FR5:** SR 5.1. **FR6:** SR 6.1 (Audit Log Events). **FR7:** SR 7.1. [Ref: IEC 62443-4-2:2019, Clauses 4.2.4.1 through 4.2.4.7] |
| **BMS Supervisory Platform (JCI Metasys / Honeywell Niagara)** | IT/OT DMZ (Enterprise Services) | **SL-3** | **FR1:** SR 1.9 (Strength of Password-Based Auth), SR 1.11 (Unsuccessful Login Attempts), SR 1.13. **FR2:** SR 2.8 (Remote Session). **FR3:** SR 3.5, SR 3.7. **FR4:** SR 4.1 (Confidentiality of Information at Rest), SR 4.2. **FR5:** SR 5.2. **FR6:** SR 6.1. **FR7:** SR 7.2 (Control of Processing Resources). [Ref: IEC 62443-4-2:2019, Clauses 4.2.4.1 through 4.2.4.7] |
| **Cooling Tower VFD (ABB/Siemens)** | OT Control Zone | **SL-1** | **FR1:** SR 1.2. **FR3:** SR 3.5. **FR5:** SR 5.1. [Ref: IEC 62443-4-2:2019, Clause 4.2.4.1, 4.2.4.3, 4.2.4.5] |
| **CDU/TCS Controller** | OT Control Zone | **SL-3** | **FR1:** SR 1.2, SR 1.12 (Authenticator Quality). **FR3:** SR 3.5, SR 3.7. **FR4:** SR 4.2. **FR5:** SR 5.2. **FR7:** SR 7.1. [Ref: IEC 62443-4-2:2019, Clauses 4.2.4.1 through 4.2.4.5, 4.2.4.7] |
| **Fire Detection/Suppression Panel** | OT Safety Zone | **SL-2** | **FR1:** SR 1.2. **FR3:** SR 3.5, SR 3.9 (Tamper Detection). **FR6:** SR 6.1. [Ref: IEC 62443-4-2:2019, Clause 4.2.4.1, 4.2.4.3, 4.2.4.6] |
| **Server BMC (Management Engine)** | IT Compute Zone (OOB Mgmt) | **SL-2** | **FR1:** SR 1.1, SR 1.2, SR 1.11. **FR3:** SR 3.4, SR 3.5. **FR4:** SR 4.2. **FR5:** SR 5.1. [Ref: IEC 62443-4-2:2019, Clauses 4.2.4.1 through 4.2.4.5] |

## Table 2: Asset → ISASecure / Certification Status & Gap Description

| Asset / Subsystem | Certification Status (ISASecure, IEC 62443, etc.) | Gap Description (vs. SL-3/SL-4) |
| :--- | :--- | :--- |
| **Schneider NMC3** | **No public ISASecure/IEC 62443-4-2 certification.** Claims SL-2 in procurement (Table 9.4). | **Gap to SL-3:** Lacks certified implementation of FR1.13 (Wireless Auth), FR3.7 (Run-time Integrity), FR4.2 (Confidentiality). Modbus TCP lacks encryption/authentication per IEC 62443-3-3 SR 5.1 (Network Segregation). |
| **York YZ / Trane CTV Chiller** | **No public ISASecure certification.** Table 9.5 lists SL-1. | **Gap to SL-3:** Fails FR1.13, FR3.7, FR4.1, FR4.2. BACnet/IP interface lacks native MACsec/TLS, violating IEC 62443-3-3 SR 6.2 (Data at Rest) and SR 3.5 (Integrity). |
| **Danfoss VLT VFD** | **Certified IEC 62443-4-2 SL1.** | **Gap to SL-3:** Certification only meets baseline SL1; lacks advanced authentication (FR1.12), cryptographic data integrity (FR3.7), and confidentiality (FR4.2) required for SL-3. |
| **JCI Metasys / Honeywell Niagara** | **No public ISASecure/IEC 62443-4-2 certification.** Vulnerability research (CVE-2025-26385, CVE-2025-3936) indicates severe FR1/FR3 gaps. | **Gap to SL-3:** Critical CVEs (CVSS 10.0, 9.8) demonstrate failure of FR1 (Authentication), FR3 (Integrity), FR7 (Availability). Unpatched SQL injection and default credentials violate IEC 62443-3-3 SR 2.5 (Authorization Enforcement). |
| **Siemens SINAMICS S200 VFD** | **No public ISASecure certification.** CVE-2024-56336 (CVSS 9.8) shows bootloader vulnerability. | **Gap to SL-3:** Unlocked bootloader violates FR3.7 (Runtime Integrity) and FR3.4 (Software Integrity). No secure boot chain violates IEC 62443-4-2 Clause 4.2.4.3. |
| **ABB ACS880 VFD** | **No public ISASecure/IEC 62443-4-2 certification.** CODESYS runtime vulnerabilities (AV25-169). | **Gap to SL-3:** Third-party runtime vulnerabilities violate FR3.5 (Security Function Integrity) and FR3.7. Lacks cryptographic integrity checks per IEC 62443-4-2 Clause 4.2.4.3. |
| **EcoStruxure IT DCE** | **No public ISASecure certification.** 5 critical CVEs (CVE-2025-50121–50125) in v≤8.3. | **Gap to SL-3:** OS command injection (FR3.7), weak entropy (FR1.12), RCE (FR7.2). Violates IEC 62443-3-3 SR 3.5 (Input Validation) and SR 4.1 (Confidentiality). |
| **Fire Detection Panel (Generic)** | **Typically UL 864 / EN 54 certified, not IEC 62443.** | **Gap to SL-2/3:** Lacks FR1.12, FR3.9 (Tamper Detection) per IEC 62443-4-2. No network authentication; relies on physical security (NFPA 72). |

## Table 3: Asset → Non-IEC Standards Applicability

| Asset / Subsystem | Applicable Non-IEC Standards & Specific Clause/Requirement |
| :--- | :--- |
| **All Cooling Assets (Chiller, CDU, VFD, Cooling Tower)** | **ASHRAE TC 9.9:** Class A1/A2 environment requirements for thermal limits (Clause 5.1); operational temperature/humidity monitoring (Clause 7.3). **ASHRAE Standard 90.4:** Minimum efficiency for mechanical cooling (Section 6). **IEEE 519:** Harmonic distortion limits for VFDs on power system (Clause 7). |
| **UPS, Power Distribution** | **IEEE 1613:** Environmental and testing for substation relays (Clause 5.3 – EMC immunity for NMCs). **UL 1778 / IEC 62040-1:** Safety for UPS (Clause 6 – Battery safety). **NFPA 70 (NEC):** Wiring methods for battery rooms (Article 480). **EN 50600-4-2:** Availability management for data centers (Clause 7 – UPS redundancy). |
| **BMS / Control Systems** | **ASHRAE Guideline 36:** High-performance sequences of operation for HVAC (Section 4 – Sensor validation). **NFPA 75 / 76:** Fire protection for IT/computing equipment (Chapter 5 – Suppression system integrity). **EN 50600-1:** Data center facilities (Clause 8 – Electrical supply safety). |
| **Fire Detection/Suppression** | **NFPA 72:** National Fire Alarm Code (Chapter 23 – Initiating device integrity). **EN 54:** Fire detection and alarm (Part 1 – System requirements; Part 2 – Control/indicating equipment). **ASHRAE Standard 15:** Safety for refrigeration systems (for CDU/TCS coolants). |
| **Server BMC / OOB Management** | **NIST SP 800-193:** Platform Firmware Resiliency Guidelines (Protect, Detect, Recover). **DMTF Redfish API:** Secure management (Clause 12.1 – Authentication). **PCI DSS v4.0:** If processing payment data (Requirement 8 – Secure authentication). |
| **Industrial Network Switches (Moxa, Cisco IE)** | **IEEE 802.1AE (MACsec):** Layer-2 encryption (Clause 9 – Key management). **IEC 61850-3:** Communications networks for power utility automation (Clause 5 – Environmental requirements). **IEEE 1613:** EMC for substation environment. |

## Architectural Recommendations for Closing Gaps

1.  **Critical Telemetry Integrity (CDU/UPS NMC/BMS):** Implement IEC 62443-3-3 **SR 3.5 (Integrity of Security Functions)** and **SR 3.7 (Integrity by Verifiably Updatable Software)** via:
    *   Independent, hardwired sensor validation for all critical setpoints (CDU temperature, UPS SOC, chiller supply temp) to break single-source-of-truth vulnerability.
    *   Deploy **IEC 62443-4-2 FR 3.7** compliant cryptographic signing for firmware updates on all NMCs, BMS controllers, and VFDs.
    *   Transition from Modbus/BACnet/IP to secure alternatives: **BACnet/SC (Secure Connect)** per ASHRAE 135-2020 Annex AP, or **OPC UA with TLS 1.3** for new deployments.

2.  **Network Segmentation & Authentication (OT Control Zone):** Enforce **IEC 62443-3-3 SR 5.2 (Use of Zone/Conduit)** and **SR 1.12 (Authenticator Quality)**:
    *   Isolate all OT control assets (UPS NMC, VFDs, chillers, CDUs) on dedicated, firewalled VLANs with no direct internet path.
    *   Mandate **MACsec (IEEE 802.1AE)** for all inter-switch links within the OT control zone to provide line-rate encryption and integrity, satisfying **IEC 62443-4-2 FR 5.1**.
    *   Deploy a centralized **Security Information and Event Management (SIEM)** or **OT-specific intrusion detection system** to monitor for violations of **FR 6.1 (Audit Log Events)**.

3.  **Secure Authentication for Legacy Systems (BMS/DCIM):** Mitigate **IEC 62443-4-2 FR 1.12 (Authenticator Quality)** and **FR 1.13 (Authentication of Wireless Devices)** gaps:
    *   For unpatched BMS (Metasys, Niagara), enforce network-level authentication via **802.1X** with RADIUS, isolating systems in a high-trust zone requiring VPN + MFA for access.
    *   Replace default/hard-coded credentials on all devices (Moxa switches, APC NMCs) with unique credentials managed by a **Privileged Access Management (PAM)** system.
    *   For wireless components, enforce WPA3-Enterprise with EAP-TLS certificates per **IEC 62443-3-3 SR 1.14 (Key Management)**.

4.  **Firmware and Secure Boot (VFDs, UPS NMCs):** Address **IEC 62443-4-2 FR 3.4 (Software Integrity)** and **FR 3.7 (Runtime Application Integrity)**:
    *   Procure only components certified to **IEC 62443-4-2 SL2 minimum** (e.g., Danfoss VLT at SL1 is insufficient for critical CDU pumps).
    *   Implement **Secure Boot** chains with measured boot to TPMs where available, preventing execution of compromised firmware.
    *   Establish a **Software Bill of Materials (SBOM)** for all OT software/firmware and monitor for vulnerabilities in third-party components (e.g., CODESYS runtime in VFDs).