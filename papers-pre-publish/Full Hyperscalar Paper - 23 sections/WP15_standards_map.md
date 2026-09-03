# Standards Mapping: WP15
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:25:25.069014

**Standards Mapping: WP15 Infrastructure (Post-Quantum, SBOM, Regulatory) to IEC 62443 and Supporting Standards**

### Table 1: Asset → Zone → SL-T → IEC 62443-4-2 FR/SR Requirements

| Asset/Subsystem | IEC 62443-3-2 Zone | Target SL-T | Applicable IEC 62443-4-2 Requirements (Clause Reference) |
| :--- | :--- | :--- | :--- |
| **CDU Controller** | Control Zone (Level 2) | SL-3 | **FR 1 (Identification & Authentication Control):** SR 1.1 (Human users), SR 1.13 (Software processes).<br>**FR 3 (System Integrity):** SR 3.4 (Malicious code protection), SR 3.10 (Update integrity verification).<br>**FR 5 (Restricted Data Flow):** SR 5.1 (Network segmentation), SR 5.2 (Zone boundary protection).<br>**FR 6 (Timely Response to Events):** SR 6.1 (Audit log accessibility).<br>**FR 7 (Resource Availability):** SR 7.1 (Denial of service protection), SR 7.2 (Control redundancy). *Mandatory requirement for crypto-agility (FR 6) and SBOM management (FR 7) per Chapter 15 Sections 1.3 & 2.3.* |
| **BMC (Baseboard Management Controller)** | Control Zone (Level 2), Embedded in CDU | SL-3 | **FR 1:** SR 1.11 (Password-based authentication), SR 1.14 (Account management).<br>**FR 3:** SR 3.4, SR 3.11 (Input validation).<br>**FR 5:** SR 5.2.<br>**FR 7:** SR 7.1. *Gap: Secure boot chain (FR 3) and firmware signing (FR 6) must support crypto-agility per Section 1.2 & 1.3.* |
| **Real-Time Operating System (RTOS)** | Embedded within CDU/BMC | SL-3 | **FR 3:** SR 3.4 (Malicious code protection - inherent in RTOS design), SR 3.5 (Software integrity), SR 3.6 (Software authenticity).<br>**FR 5:** SR 5.1 (Partitioning if applicable). *Gap: Update mechanism for cryptographic libraries must be agile per Section 1.3.* |
| **Protocol Stacks (e.g., Modbus TCP, BACnet/IP)** | Embedded within CDU | SL-3 | **FR 1:** SR 1.13 (Secure communication services).<br>**FR 5:** SR 5.1 (Communication path isolation), SR 5.2.<br>**FR 7:** SR 7.1. *Gap: Must be included in SBOM and updated for PQC cipher suite support per Sections 1.3 & 2.2.* |
| **Cryptographic Libraries (e.g., OpenSSL, mbedTLS)** | Embedded within CDU/BMC | SL-3 | **FR 6:** SR 6.1 (Audit trail integrity - requires cryptographic signing).<br>**FR 7:** SR 7.1 (Integrity of security mechanisms). *Critical gap: Algorithms (RSA/ECC) are non-compliant with post-quantum requirements of NIST SP 800-175B (referenced via IEC 62443-4-2 FR 6.1) for future SL-3.* |
| **Embedded Web Server (Management UI)** | Control Zone (Level 2), Access Point | SL-3 | **FR 1:** SR 1.1, SR 1.11.<br>**FR 5:** SR 5.2 (Boundary protection for management interface).<br>**FR 6:** SR 6.1 (Logging of access attempts). *Vulnerable to SNDL attack per Section 1.2; TLS implementation must be PQC-ready.* |

### Table 2: Asset → Certification Status → Gap Description

| Asset/Subsystem | ISASecure Certification Status (as of 2026) | Gap to SL-3/SL-4 (Reference to Chapter 15) |
| :--- | :--- | :--- |
| **CDU Controller** | Gap (No known ISASecure SSA or EDSA certification for PQC-ready or SBOM-compliant controller) | **FR 3 (SR 3.6):** Firmware signing uses RSA/ECDSA, violating NIST deprecation timeline (2030) for SL-3 integrity.<br>**FR 6 (SR 6.1):** No demonstrated crypto-agility for management traffic, violating proactive event response.<br>**FR 7 (SR 7.1):** No machine-readable SBOM provided, violating resource availability for vulnerability management. |
| **BMC (NPCM8mnx Example)** | Partial (OCP S.A.F.E. certified for security features, but not ISASecure for full system security or PQC) | **FR 3 (SR 3.6):** PQC secure boot demonstrated, but certificate rotation mechanism (Table 15.3) not validated to ISASecure EDSA. |
| **RTOS / Protocol Stacks** | Gap (Third-party libraries rarely certified independently to ISASecure SSDF) | **FR 5:** Potential for weak network segmentation (SR 5.1) if stacks are not designed for OT environments.<br>**FR 7:** Lack of vendor commitment to PQC migration timeline (Table 15.3) creates SL-3/SL-4 compliance risk by 2035. |
| **Cryptographic Libraries** | Gap (Libraries like OpenSSL are FIPS 140-2/3 validated but not ISASecure-certified for OT system use) | **FR 6 (SR 6.1):** Library version included in firmware is pre-deprecated algorithm (e.g., RSA-2048), failing SL-4 for long-term integrity. |
| **Embedded Web Server** | Gap | **FR 1 (SR 1.1):** Likely lacks support for PQC-enabled TLS 1.3 (ML-KEM hybrid) for secure administration, violating SL-3 authentication security. |

### Table 3: Asset → Non-IEC Standards Applicability

| Asset/Subsystem | Applicable Standard | Requirement/Clause | Justification from WP15 |
| :--- | :--- | :--- | :--- |
| **CDU Controller** | **ASHRAE TC 9.9, A2 Class** | Allowable environmental conditions for liquid-cooled systems. | Primary thermal management asset; operational environment must ensure reliability over 10-20yr lifecycle (Section 1.2). |
| **CDU (as part of IT/OT infrastructure)** | **NFPA 75 / 76** | Fire protection for information technology and telecommunications equipment. | CDU carries conductive coolant; failure modes require fire safety assessment aligned with facility standards. |
| **Data Centre (WP15 context)** | **EN 50600 Series (e.g., -2-1, -2-4)** | Availability, power, and cooling design. | Chapter 15's lifecycle focus (2035) necessitates availability class design (e.g., EN 50600-1 Class 4) for core OT assets like CDU controllers. |
| **BMC / All Networked OT** | **IEEE 802.1AR** | Secure Device Identity (DevID). | Supports IEC 62443-4-2 FR 1 (Identification) by providing cryptographic device identity for supply chain integrity. |
| **SBOM Components** | **SPDX 2.3 / CycloneDX 1.5** | Machine-readable format specification. | Mandated in procurement language (Section 2.3) for regulatory compliance (CRA, NIS2) and operational SBOM management. |

### Architectural Recommendations for Closing Gaps

1.  **Mandate Crypto-Agility in Procurement:** Amend all OT procurement specifications (ref. Chapter 11) to require hardware and software crypto-agility per Table 15.3 specifications. This directly addresses IEC 62443-4-2 FR 6 (SR 6.1) for future-proof security event logging and FR 3 (SR 3.6) for firmware integrity. **Compliance Path:** Vendor demonstration of ML-KEM key generation and TLS 1.3 hybrid cipher suite negotiation.

2.  **Implement PQC VPN Tunnel Termination for Legacy Assets:** For CDU controllers and other non-PQC-ready OT assets installed pre-2026, deploy dedicated PQC-capable VPN gateways at zone boundaries (Control Zone / Enterprise Zone) as per Table 15.4. This maintains the security level of management traffic and satisfies IEC 62443-4-2 FR 5 (SR 5.2, Zone Boundary Protection) until hardware replacement.

3.  **Establish SBOM-Driven Vulnerability Management:** Operationalize SBOM ingestion and automated CVE matching (Table 15.6) as a core IEC 62443-2-3 (Patch Management) process. This creates the feedback loop required for FR 7 (SR 7.1, Denial of Service Protection) by enabling proactive vulnerability mitigation across the asset inventory.

4.  **Integrate NIST PQC Standards into IEC 62443-3-3 Requirements:** For any new data centre design (SL-3 or SL-4), explicitly map IEC 62443-3-3 SR 5.1 (Network Segmentation) and SR 6.1 (Timely Response) to include the restriction of classical cryptographic traffic to isolated legacy segments and the logging of algorithm negotiation failures. This addresses the unique OT vulnerability of long asset lifecycles outlined in Section 1.2.

5.  **Develop a Quantifiable PQC Migration Roadmap:** Using the timeline in Table 15.2, create a hardware replacement schedule for all OT assets lacking crypto-agility. This schedule must be a controlled document under IEC 62443-2-1 (Security Management System), with a hard deadline of 2032 for initiating replacement of devices installed before 2026, ensuring SL-3 compliance by 2035.