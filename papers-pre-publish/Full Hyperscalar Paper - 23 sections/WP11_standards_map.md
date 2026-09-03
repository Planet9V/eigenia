# Standards Mapping: WP11
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:13:27.886155

## Standards Mapping Table: WP11 Lifecycle Security

**Scope:** Datacenter OT assets affected by lifecycle vulnerabilities (procurement, construction, commissioning, operations, decommissioning) as described in the chapter.

---

### **Table 1: Asset → Zone → SL-T → IEC 62443-4-2 FR/SR Requirements**

| Asset / Subsystem | IEC 62443-3-2 Zone Placement | IEC 62443-3-2 SL-T (Target) | IEC 62443-4-2:2019 Applicable Functional Requirements (FR) & System Requirements (SR) |
| :--- | :--- | :--- | :--- |
| **BMS Controllers (e.g., Metasys, Niagara, Desigo)** | Zone 1: Control System Zone (Purdue Level 2) | SL-3 | **FR1 (Identification & Authentication Control):** SR 1.1 (Identities), SR 1.2 (Authentication Information), SR 1.5 (Password-Based Authentication), SR 1.9 (Strength of Password-Based Authentication), SR 1.13 (Unsuccessful Login Attempts).<br>**FR2 (Use Control):** SR 2.1 (Authorization Enforcement), SR 2.4 (Security Function Enforcement).<br>**FR3 (System Integrity):** SR 3.4 (Software Application Integrity).<br>**FR5 (Restricted Data Flow):** SR 5.1 (Network Segmentation), SR 5.2 (Security for Industrial Communication Protocols).<br>**FR6 (Timely Response to Events):** SR 6.1 (Audit Log Accessibility), SR 6.2 (Audit Log Capacity).<br>**FR7 (Resource Availability):** SR 7.1 (Denial of Service Protection). |
| **CDU / Cooling Controllers** | Zone 1: Control System Zone (Purdue Level 2) | SL-3 | **FR1:** SR 1.5, SR 1.13.<br>**FR2:** SR 2.1, SR 2.4.<br>**FR3:** SR 3.4.<br>**FR5:** SR 5.1, SR 5.2.<br>**FR7:** SR 7.1. |
| **UPS Management Cards / PDUs** | Zone 1: Control System Zone (Purdue Level 2) | SL-3 | **FR1:** SR 1.1, SR 1.2, SR 1.5, SR 1.13.<br>**FR2:** SR 2.1, SR 2.4.<br>**FR3:** SR 3.4.<br>**FR5:** SR 5.1, SR 5.2.<br>**FR6:** SR 6.1.<br>**FR7:** SR 7.1. |
| **Cooling VFDs / Drive Controllers** | Zone 1: Control System Zone (Purdue Level 2) | SL-2 | **FR1:** SR 1.5, SR 1.13.<br>**FR2:** SR 2.1, SR 2.4.<br>**FR3:** SR 3.4.<br>**FR5:** SR 5.2.<br>**FR7:** SR 7.1. |
| **Power Distribution (ATS, Switchgear Relays)** | Zone 1: Control System Zone (Purdue Level 2) | SL-3 | **FR1:** SR 1.1, SR 1.5, SR 1.13.<br>**FR2:** SR 2.1, SR 2.4.<br>**FR3:** SR 3.4.<br>**FR5:** SR 5.1, SR 5.2.<br>**FR6:** SR 6.1.<br>**FR7:** SR 7.1. |
| **Physical Security (Cameras, Access Control)** | Zone 2: Site Operations Zone (Purdue Level 3) | SL-2 | **FR1:** SR 1.1, SR 1.2, SR 1.5, SR 1.13.<br>**FR2:** SR 2.1, SR 2.4.<br>**FR3:** SR 3.4.<br>**FR5:** SR 5.1, SR 5.2.<br>**FR6:** SR 6.1.<br>**FR7:** SR 7.1. |
| **Industrial Network Equipment (Switches, Routers)** | Zone 1 (if OT-dedicated) or Zone 2 | SL-3 | **FR1:** SR 1.1, SR 1.2, SR 1.5, SR 1.13.<br>**FR2:** SR 2.1, SR 2.4.<br>**FR3:** SR 3.4.<br>**FR4 (Data Confidentiality):** SR 4.1 (Data-in-Transit Confidentiality).<br>**FR5:** SR 5.1, SR 5.2.<br>**FR6:** SR 6.1.<br>**FR7:** SR 7.1. |
| **DCIM Platform (e.g., EcoStruxure IT DCE)** | Zone 3: Site Business Zone (Purdue Level 3.5) | SL-2 | **FR1:** SR 1.1, SR 1.2, SR 1.5, SR 1.13.<br>**FR2:** SR 2.1, SR 2.4.<br>**FR3:** SR 3.4.<br>**FR4:** SR 4.1.<br>**FR5:** SR 5.1, SR 5.2.<br>**FR6:** SR 6.1, SR 6.2.<br>**FR7:** SR 7.1. |

---

### **Table 2: Asset → Certification Status → Gap Description**

| Asset / Subsystem | ISASecure / IEC 62443-4-2 Certification Status (as implied by chapter) | Gap Analysis vs. SL-3 / SL-4 |
| :--- | :--- | :--- |
| **BMS Controllers (Metasys, Niagara)** | **Gap.** No evidence of IEC 62443-4-2 certification. Niagara disclosed 13 vulnerabilities (5 CVSS 9.8) in 2025. Metasys has a CVSS 10.0 CVE (2025-26385). | **FR1:** Default credentials (T0812). **FR3:** Missing software integrity checks enabling command injection. **FR5:** Weak/improper network protocol implementation. **FR6:** Insufficient audit logging. |
| **CDU / Cooling Controllers** | **Gap.** No specific certifications cited. Vendor (e.g., ABB, Siemens) product-line certifications do not guarantee CDU OEM integration. | **FR1:** Factory-default credentials. **FR3:** Unsigned firmware updates. **FR7:** Vulnerable to DoS, impacting thermal stability. |
| **UPS Management Cards / PDUs** | **Gap.** APC TLStorm vulnerabilities (CVE-2022-22805/22806) demonstrate FR3 (Software Integrity) and FR5 (Restricted Data Flow) failures. Vertiv IntelliSlot has critical auth bypass (CVE-2025-46412). | **FR1:** Authentication bypass, default credentials. **FR3:** Insecure TLS, unsigned firmware. **FR5:** Insecure network services. |
| **Cooling VFDs / Drive Controllers** | **Mixed.** Danfoss VLT drives are **certified to IEC 62443-4-2 SL1**. ABB and Siemens VFD lines show critical CVEs (e.g., CVE-2024-56336: unlocked bootloader). | **Gap (ABB/Siemens):** **FR1:** Default accounts. **FR3:** Bootloader integrity violations, insecure engineering tools. **Gap (Danfoss):** Certified to SL-1 only, insufficient for SL-3 datacenter requirements. |
| **Power Distribution (ATS, Relays)** | **Gap.** ASCO annunciators have firmware integrity and cleartext transmission issues (CVE-2025-1058/1060). SEL relays have undocumented features. | **FR1:** Privilege escalation. **FR3:** Unrestricted code download. **FR5:** Cleartext transmission of operational data. **FR7:** DoS via file transfer (SIPROTEC CVE-2024-52504). |
| **Physical Security (Cameras, Access Control)** | **Partial.** Axis is a CISA "Secure by Design" pledge participant, but has critical CVEs (CVE-2025-0324: VAPIX privilege escalation). HID Mercury has unpatched critical vulns (CVE-2022-31481). | **FR1:** Default/weak credentials, auth bypass. **FR3:** SQL injection, buffer overflows. **FR5:** Cleartext data exposure. |
| **Industrial Network Equipment** | **Gap.** Moxa has hard-coded credential CVEs (CVE-2024-9138) directly violating FR1. Cisco IE3000 series is End-of-Support, receiving no patches. | **FR1:** Hard-coded credentials. **FR3:** Command injection flaws. **FR4:** Lack of encryption for management. |
| **DCIM Platform** | **Gap.** EcoStruxure IT DCE has 5 critical CVEs in version ≤8.3, including OS command injection and weak entropy. | **FR1:** Insufficient password complexity. **FR3:** Remote code execution. **FR5:** Unauthenticated access to services. |

---

### **Table 3: Asset → Non-IEC Standards Applicability**

| Asset / Subsystem | Applicable Standards & Clauses |
| :--- | :--- |
| **All OT Assets** | **UL 2900-2-2 (Software for Industrial Control Systems):** Part 1, Clause 5.2 (Static Analysis), Clause 5.3 (Dynamic Analysis), Clause 5.4 (Fuzz Testing). **IEC 62443-4-1:2018, SR 3 (Secure by Design):** SR 7 (Use of Security Technology). |
| **BMS / Cooling / Power Controllers** | **ASHRAE Standard 90.4-2019:** Section 6.2.1 (Power Usage Effectiveness) requires monitoring, which these assets enable; their integrity is paramount. **NFPA 75 (2020) / NFPA 76 (2020):** Chapter 7.4 (Fire Protection System Control), requiring integrity of BMS/fire panel interfaces. |
| **Cooling VFDs** | **ASHRAE TC 9.9 (2021):** Section 5.1 (Environmental Limits) – VFD failure can cause environmental excursion beyond A1/A2 class limits, violating reliability requirements. **IEEE 519-2022:** Harmonic distortion limits for power quality, impacted by VFD operation. |
| **UPS, PDU, ATS, Switchgear** | **NFPA 110 (2022):** Chapter 8 (Performance of System Components) for emergency/standby power. **EN 50600-4-2 (2021):** Power Usage Effectiveness (PUE) calculation, reliant on accurate metering from these devices. **IEEE 1613-2009:** Environmental and EMC testing for substation relays. |
| **Physical Security Systems** | **EN 62676 (Video Surveillance):** Part 5 (Data security and privacy). **UL 2050 (National Industrial Security Systems):** Physical access control for critical infrastructure. |
| **Industrial Network Equipment** | **NIST SP 800-82 Rev. 3:** Section 3.3 (Architecture and Design), mandating secure network segmentation and device hardening for ICS. **CISA Cross-Sector Cyber Performance Goals (CPGs):** v2.0, CPG 2.H (Software Update Management), CPG 3.L (Account Management). |

---

### **Section: Architectural Recommendations for Closing Gaps**

1.  **Lifecycle-Integrated Procurement Specification:** Mandate **IEC 62443-4-2 CSA certification at SL-3** for all new procurements, per **IEC 62443-2-1:2010, Clause 8.3 (Secure acquisition)**. The scorecard in Table 11.4 must be a contractual gate. For assets not yet certified (e.g., most DCIM, BMS), require a **gap analysis against IEC 62443-4-2 SRs** and a time-bound remediation plan.

2.  **Construction-Phase Security Control Plane:** Implement **IEC 62443-2-4:2019, Clause 8 (Project security management)** during construction. This includes:
    *   **Physical Security:** Fenced laydown yards with CCTV and access logs per **EN 50600-2-8:2022 (Protection against physical damage)**.
    *   **Network Segmentation:** Deploy temporary, firewalled construction networks isolated from site IT per **IEC 62443-3-3, SR 5.1**.
    *   **Firmware Baseline:** Maintain a cryptographic hash (SHA-256) manifest of all delivered firmware, verified before installation per **IEC 62443-4-2, FR3/SR 3.4**.

3.  **Commissioning & Handover Protocol:** Enforce **IEC 62443-2-4, Clause 9 (Integration and verification testing)**. This must include:
    *   **Credential Injection:** Use a Hardware Security Module (HSM) to generate and inject unique, non-default credentials during commissioning, satisfying **FR1/SR 1.5** and **SR 1.13**.
    *   **Temporary Access Revocation:** A documented, auditable process to terminate all vendor/integrator access credentials and VPN tunnels post-handover, per **IEC 62443-3-3, SR 1.14 (Control of maintenance access)**.

4.  **Operational Lifecycle Management:** Establish a **Security Patch Management System** compliant with **IEC 62443-2-3:2015, Clause 9 (Patch management)**. Integrate with the vendor's security advisory feed (as per procurement requirement, Table 11.3). Monitor for firmware EOL using the procurement scorecard commitment, and initiate replacement planning **no later than 24 months** before the announced end-of-security-support date.

5.  **Decommissioning & Sanitisation:** Develop a **Data Sanitisation Procedure** per **NIST SP 800-88 Rev. 1 (Guidelines for Media Sanitization)**, adapted for OT. This includes:
    *   **Controller Zeroisation:** Cryptographic erasure of all stored credentials and network configurations via secure boot commands (where available).
    *   **Physical Destruction:** For devices not to be resold, degaussing or shredding per **EN 50600-5-1 (Security of facilities and data centres - Data destruction)**.
    *   **Certificate Revocation:** Revocation of any PKI certificates associated with decommissioned assets.