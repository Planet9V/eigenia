# Lifecycle Security — From Procurement to Decommissioning

## Chapter 11: The Twenty-Year Attack Surface

## Abstract

A hyperscale facility has a 20–30 year operational life. The ten preceding chapters analyse a facility in steady-state operation — Day 1 through Day 365. This chapter addresses the other 95% of the lifecycle: the 12–24 months of construction where OT equipment sits unprotected on a building site, the commissioning phase where every vendor engineer's laptop is an implant vector, the decade-long middle where firmware goes end-of-life and vendors stop issuing patches, and the final decommissioning where retired controllers carry credentials and network configurations into the secondary market.

Each lifecycle phase introduces attack surfaces that do not exist during normal operations. A CDU controller compromised during construction operates with a persistent implant from Day 1 — before the OT network is segmented, before monitoring is active, before anyone is looking. This chapter provides the CyHAZOPs framework for lifecycle security: what to specify in procurement, what to verify during commissioning, what to manage through operational life, and what to sanitise at decommissioning.

---

## Practitioner's Note

I learned this lesson on a rail project. We spent nine months designing a zone/conduit architecture, specifying SL-T assignments, and writing procurement specifications that required IEC 62443-4-2 certification for every signalling controller. Excellent work. Then I visited the construction site.

Sixteen signalling cabinets were sitting in a contractor's laydown yard, unsealed, with factory-default firmware, connected to a temporary construction network that also served the site office WiFi. Any of the 200 construction workers on site — or anyone on the site office network — could have accessed those controllers. For nine months.

We designed security for the operational facility and ignored the 18 months of construction that preceded it. The equipment that arrived at commissioning had been exposed to an uncontrolled environment for longer than it would operate before its first firmware update.

I do not make that mistake twice.

---

## 1. The Lifecycle Model

IEC 62443-2-4 (Security Program Requirements for IACS Service Providers) defines security requirements across the system lifecycle. Most organisations implement Parts 3-2 and 3-3 (design-phase zone/conduit and system-level security) and ignore Part 2-4 entirely. This is the equivalent of designing a bridge to withstand earthquakes but not specifying how to pour the concrete.

### The Five Lifecycle Phases

```mermaid {caption="Figure 11.1: The Five Lifecycle Phases"}
flowchart LR
    P1["Phase 1\nProcurement\n& Specification"]
    P2["Phase 2\nConstruction\n& Delivery"]
    P3["Phase 3\nCommissioning\n& Handover"]
    P4["Phase 4\nOperations\n& Maintenance"]
    P5["Phase 5\nDecommissioning\n& Disposal"]

    P1 --> P2 --> P3 --> P4 --> P5

    style P1 fill:#45b7d1,color:#fff
    style P2 fill:#ff6b6b,color:#fff
    style P3 fill:#ff6b6b,color:#fff
    style P4 fill:#4ecdc4,color:#fff
    style P5 fill:#ff6b6b,color:#fff
```

*Red phases are high-risk and poorly addressed in the existing literature. The series' first ten chapters cover Phase 4 exclusively.*

**Table 11.2: Phase - Duration**

| Phase | Duration | Security Ownership | Key Risk |
|:---|:---|:---|:---|
| Procurement | 6–18 months | Asset Owner (procurement team) | Specifying the wrong thing — or nothing |
| Construction & Delivery | 12–36 months | Contractor (general + subcontractors) | Physical access to unprotected OT equipment |
| Commissioning & Handover | 3–12 months | System integrators + vendors | Vendor engineer laptops; temporary network access; credential handover |
| Operations & Maintenance | 15–25 years | Asset Owner (facilities + security) | Firmware EOL; vendor patch cessation; configuration drift |
| Decommissioning & Disposal | 1–6 months | Asset Owner (often delegated to disposal contractor) | Credential leakage; configuration exposure; secondary market |

---

## 2. Phase 1: Procurement — Specifying Security Before You Buy

### 2.1 The Procurement Specification Gap

Most hyperscale procurement specifications address power capacity, thermal performance, physical dimensions, and warranty terms. Few address cybersecurity. When they do, the requirement is typically: "The product shall support secure communications."

This is not a specification. It is a wish.

A procurement specification aligned to IEC 62443 should contain:

**Table 11.3: A procurement specification aligned to IEC 62443 should contain**

| Requirement Category | Specification Language | IEC 62443 Reference |
|:---|:---|:---|
| Product security certification | "The product shall hold a valid IEC 62443-4-2 Component Security Assurance (CSA) certificate at SL-[2/3], issued by an accredited CB Scheme laboratory." | IEC 62443-4-2:2019 (IEC, 2019) |
| Secure development lifecycle | "The vendor shall demonstrate compliance with IEC 62443-4-1 (Secure Product Development Lifecycle), verified by third-party audit or certification." | IEC 62443-4-1:2018 (IEC, 2018) |
| Software bill of materials | "The vendor shall provide a machine-readable SBOM (CycloneDX or SPDX format) for all firmware, including all third-party libraries and cryptographic modules." | IEC 62443-4-1:2018, SR-7; EU CRA Article 13(7) (European Parliament, 2024) |
| Firmware update mechanism | "Firmware updates shall be cryptographically signed. The device shall reject unsigned or improperly signed firmware." | IEC 62443-4-2:2019, Clause 10.3.4 (CR 3.4 — Software application integrity) |
| Default credential elimination | "The product shall not ship with factory-default passwords. Initial credentials shall be unique per device or require mandatory change at first login." | 4-2 CR 1.5 |
| Patch support commitment | "The vendor shall commit to providing security patches for a minimum of [10/15] years from date of purchase, or provide 24 months' advance notice of end-of-security-support." | IEC 62443-2-3:2015 (IEC, 2015); IEC 62443-4-1:2018 |
| Crypto-agility | "The product shall support cryptographic algorithm replacement without hardware modification, enabling migration to NIST-approved post-quantum algorithms (FIPS 203/204/205) by 2032." | NIST (2024b, 2024c, 2024d) |
| Incident disclosure | "The vendor shall participate in coordinated vulnerability disclosure and maintain a public security advisory page with CVE identifiers." | IEC 62443-4-1:2018, SR-9 |

### 2.2 The Procurement Scorecard

For every OT product in the BOM, procurement should complete a security scorecard before purchase approval:

**Table 11.4: For every OT product in the BOM, procurement should complete a security scorecard before purchase approval**

| Criterion | Weight | Score (0–4) | Evidence Required |
|:---|:---|:---|:---|
| IEC 62443-4-2 certification at required SL | 30% | | Certificate number, CB Scheme lab, SL level |
| IEC 62443-4-1 SDL certification | 20% | | Certificate or audit report |
| SBOM availability | 15% | | SBOM document (CycloneDX/SPDX) |
| Patch support commitment (years) | 15% | | Written vendor commitment |
| CVE disclosure history | 10% | | Public advisory page; response time track record |
| Crypto-agility (PQC readiness) | 10% | | Technical specification or vendor roadmap |

**Scoring:** 0 = absent; 1 = partial/unverified; 2 = present but not certified; 3 = certified/verified; 4 = exceeds requirement.

**Minimum threshold:** Products scoring below 60% aggregate should require a risk acceptance from the CISO with documented compensating controls. Products scoring below 40% should not be purchased without board-level risk acceptance.

### 2.3 ISASecure Certified Products Gap

The ISASecure Certified Products Registry (ISCI, 2025) lists CSA-certified devices from Moxa (EDR-G9010, TN-4900 series), Honeywell (ControlEdge PLC), and InHand Networks. However, datacenter-specific OT products — UPS Network Management Cards (Vertiv, APC, Eaton), BMS controllers (Schneider EBO, Siemens Desigo CC, JCI Metasys), CDU PLCs, and EPMS meters — are not commonly found in the registry. This gap means asset owners cannot rely on third-party component certification for these devices. Procurement specifications must compensate with vendor SDLA certification (IEC 62443-4-1) and contractual patch commitments.

---

## 3. Phase 2: Construction and Delivery — The Unprotected Window

### 3.1 The Problem

Between the moment OT equipment leaves the vendor's factory and the moment it is commissioned on the operational network, it passes through an uncontrolled chain:

1. **Vendor warehouse** → 2. **Freight forwarder** → 3. **Customs/bonded storage** → 4. **Site laydown yard** → 5. **Building integration (mechanical/electrical fit)** → 6. **Temporary construction power** → 7. **Pre-commissioning testing**

At no point in steps 1–7 is the equipment's firmware integrity verified. At no point is it protected by the zone/conduit architecture we spent ten chapters designing.

### 3.2 Construction-Phase Threats

**Table 11.5: 3.2 Construction-Phase Threats**

| Threat | Vector | MITRE | Consequence |
|:---|:---|:---|:---|
| Firmware tampering during transit | Physical access during freight/customs/staging | T0839 (Module Firmware) | Persistent implant operational from Day 1; survives commissioning |
| Configuration modification at site | Construction worker/subcontractor access to unsealed cabinets | T0836 (Modify Parameter) | Modified safety setpoints; disabled alarms; backdoor accounts |
| Credential harvesting | Default credentials on powered-up equipment during pre-commissioning | T0812 (Default Credentials) | Credentials captured and retained for post-commissioning exploitation |
| Network reconnaissance | Equipment connected to temporary construction network | T0846 (Remote System Discovery) | OT asset map compiled before operational security is active |
| Supply chain substitution | Counterfeit or modified replacement parts during construction | T0862 (Supply Chain Compromise) | Compromised hardware embedded in facility infrastructure |

### 3.3 Construction Security Controls

**Table 11.6: 3.3 Construction Security Controls**

| Control | Implementation | Phase |
|:---|:---|:---|
| Tamper-evident packaging | Require vendors to ship OT equipment with serialised tamper-evident seals. Verify seal integrity at site receipt. Photograph and log. | Delivery |
| Secure staging area | Designate a locked, access-controlled staging area for OT equipment. No general construction access. CCTV. Access log. | Site laydown |
| Firmware baseline verification | Before commissioning, verify firmware hash against vendor-published baseline. Reject any device where hash does not match. | Pre-commissioning |
| Isolated pre-commissioning network | Pre-commissioning testing shall use an isolated network segment — not the construction site network, not the future operational network. Air-gapped or physically separated. | Pre-commissioning |
| No default credentials | All default credentials shall be changed before the device is connected to any network. Document new credentials in a secure vault (not a spreadsheet on the site server). | Pre-commissioning |
| Construction personnel vetting | OT equipment staging areas shall require security-vetted personnel. General construction labourers should not have unsupervised access to OT cabinets. | All construction |

### 3.4 Known Vulnerabilities Exploitable During Construction

The following CVEs represent threats that are particularly relevant during the construction phase, when devices are exposed and unpatched:

**Table 11.6a: CVEs relevant to construction-phase exposure**

| CVE ID | CVSS | Affected Product | Vulnerability | Relevance to Construction |
|:---|:---|:---|:---|:---|
| CVE-2024-9138 | 8.6 | Moxa EDR-G9010, TN-4900 series | Hard-coded credentials (root-level access) | Devices on temporary network can be fully compromised via default creds [Moxa, 2025] |
| CVE-2022-22805 | 9.8 | APC Smart-UPS NMC (TLStorm) | TLS bypass, firmware signing bypass | UPS units in laydown yard can be firmware-tampered without detection [Schneider, 2022] |
| CVE-2025-26385 | 10.0 | Johnson Controls Metasys ADS/ADX | SQL injection (remote code execution) | If Metasys controllers are powered during pre-commissioning, attackers can execute commands [CISA, 2026] |
| CVE-2025-3936 | 9.8 | Honeywell Niagara JACE | Authentication bypass | JACE controllers on temporary network can be taken over [Honeywell, 2025] |

---

## 4. Phase 3: Commissioning and Handover — The Vendor Trust Problem

### 4.1 The Problem

Commissioning is the period when vendor engineers configure, test, and hand over OT equipment. During this phase:

- Vendor engineers connect laptops directly to OT controllers (USB, serial, Ethernet)
- Vendor engineers install commissioning software (often not scanned for malware)
- Vendor engineers create service accounts and access credentials
- Vendor engineers configure network parameters, IP addresses, and protocol settings
- Vendor engineers test by sending commands to actuators (opening valves, starting pumps, tripping breakers)

Every one of these activities is a legitimate commissioning task. Every one is also an attack vector if the vendor engineer's laptop is compromised, if the vendor's commissioning software contains malware, or if the vendor engineer is a malicious insider.

### 4.2 Commissioning Security Protocol

**Table 11.7: 4.2 Commissioning Security Protocol**

| Step | Requirement | Verification |
|:---|:---|:---|
| 1. Vendor laptop scan | All vendor laptops connecting to OT equipment shall be scanned by the asset owner's endpoint security tool before connection. Scan must include malware, known CVEs, and unauthorised software. | Scan report logged; laptop quarantined if scan fails. |
| 2. Firmware baseline verification | Before any configuration, verify firmware hash against vendor-published baseline. Reject any device where hash does not match. | Hash comparison documented per device. |
| 3. Credential management | All default credentials shall be changed before the device is connected to any network. New credentials generated by asset owner's password vault, not by vendor engineer. | Credential change documented; vault audit log. |
| 4. Network isolation | Commissioning network must be physically or logically isolated from both the construction network and the future operational network. No routing between them. | Network diagram verified; firewall rules tested. |
| 5. Vendor software integrity | Commissioning software (e.g., Eaton UPS Companion, Schneider EcoStruxure, Honeywell Niagara Workbench) shall be verified against vendor checksums and scanned for known vulnerabilities. | Software hash match; vulnerability scan report. |
| 6. Session logging | All commissioning sessions (console, SSH, web) shall be logged and retained for minimum 12 months. | Session log files with timestamps and user IDs. |
| 7. Credential handover | Service accounts created during commissioning shall be transferred to asset owner's privileged access management (PAM) system before handover. Vendor shall not retain any credentials. | PAM audit trail; vendor signed attestation. |

### 4.3 Known Vulnerabilities in Commissioning Tools

Commissioning software itself is a vector. The following CVEs affect tools commonly used during datacenter OT commissioning:

**Table 11.7a: CVEs in commissioning software**

| CVE ID | CVSS | Affected Product | Vulnerability | Impact |
|:---|:---|:---|:---|:---|
| CVE-2025-59887 | 8.6 | Eaton UPS Companion (EUC) < v3.0 | DLL hijacking in installer | Arbitrary code execution on engineer laptop [Eaton, 2025] |
| CVE-2024-48510 | 9.8 | ABB Drive Composer | Path traversal | File system access on engineer workstation [ABB, 2024] |
| CVE-2024-54678 | 8.2 | Siemens SINAMICS Startdrive (V17-V20) | Deserialization of untrusted data | Local authenticated code execution [Siemens, 2024] |
| CVE-2025-1789 | High | Genetec Update Service < 2.10 | Local privilege escalation to SYSTEM | Full compromise of commissioning laptop [Genetec, 2025] |

---

## 5. Phase 4: Operations and Maintenance — The Long Middle

### 5.1 The Problem

Once the facility is operational, the attack surface shifts from physical exposure to software decay. Over a 15–25 year operational life, every OT component will experience:

- Firmware end-of-life (EOL) with no further security patches
- Vendor patch cessation (product discontinuation)
- Configuration drift from original secure baseline
- Accumulation of service accounts and credentials
- Protocol obsolescence (e.g., BACnet/IP without encryption)

### 5.2 Operational Phase Threat Landscape

**Table 11.8: Operational phase threats**

| Threat | Vector | MITRE | Consequence |
|:---|:---|:---|:---|
| Unpatched firmware CVEs | Vendor stops issuing patches for EOL products | T0866 (Exploitation of Remote Services) | Remote code execution on UPS NMCs, BMS controllers |
| Default credentials in field | Devices never had credentials changed after commissioning | T0812 (Default Credentials) | Full device compromise; lateral movement |
| Protocol-level attacks | BACnet/IP, Modbus TCP lack encryption/authentication | T0830 (Adversary-in-the-Middle) | Setpoint manipulation; alarm suppression |
| Configuration drift | Operators make undocumented changes over time | T0836 (Modify Parameter) | Loss of security controls; safety bypass |
| Insider threat | Disgruntled employee with OT access | T0859 (Valid Accounts) | Sabotage of cooling/power systems |

### 5.3 Critical CVEs Affecting Operational Datacenter OT

The following CVEs are actively exploited or pose high risk to operational datacenter OT systems. Asset owners must track these and apply patches or compensating controls.

**Table 11.9: Critical CVEs for operational datacenter OT**

| CVE ID | CVSS | Affected Product | Vulnerability | Mitigation |
|:---|:---|:---|:---|:---|
| CVE-2025-26385 | 10.0 | Johnson Controls Metasys ADS/ADX ≤ 14.1 | SQL injection (remote code execution) | Patch GIV-165989; close TCP port 1433 [CISA, 2026] |
| CVE-2025-3936 | 9.8 | Honeywell Niagara JACE < 4.14u2 | Authentication bypass | Upgrade to Niagara 4.14u2 [Honeywell, 2025] |
| CVE-2025-50121 | Critical | Schneider EcoStruxure IT DCE ≤ 8.3 | OS command injection | Upgrade to version 9.0 [Schneider, 2025] |
| CVE-2025-46412 | Critical | Vertiv UPS Management Cards | Authentication bypass | Apply firmware update [Vertiv, 2025] |
| CVE-2025-41426 | Critical | Vertiv UPS Management Cards | Stack-based buffer overflow → RCE | Apply firmware update [Vertiv, 2025] |
| CVE-2024-9138 | 8.6 | Moxa EDR-G9010, TN-4900 | Hard-coded credentials | Firmware update; minimize SSH exposure [Moxa, 2025] |
| CVE-2025-0324 | 9.4 | Axis VAPIX Device Configuration (AXIS OS) | Privilege escalation | Firmware update [Axis, 2025] |
| CVE-2025-30023 | 9.0 | Axis Camera Station Pro (Axis.Remoting) | RCE (authenticated) | Firmware update [Axis, 2025] |
| CVE-2022-22805 | 9.8 | APC Smart-UPS NMC (TLStorm) | TLS bypass, firmware signing bypass | Firmware update; migrate to NMC3 [Schneider, 2022] |

### 5.4 Firmware End-of-Life Management

Vendors typically provide security patches for 5–10 years after product launch. Datacenter operators must track EOL dates and plan migrations. The following products have known EOL status:

**Table 11.10: EOL products common in datacenters**

| Product | Vendor | EOL Date | Replacement | Risk |
|:---|:---|:---|:---|:---|
| APC NMC2 | Schneider Electric | 2022 | NMC3 | No further security patches; TLStorm CVEs unpatched |
| Eaton Network-M2 | Eaton | Early 2024 | Network-M3 | CVE-2025-22495 (command injection) unpatched |
| Cisco IE3000 | Cisco | Sep 2024 | IE3300/IE3400 | No security patches; inherits IOS XE vulns |
| Honeywell Niagara AX | Honeywell/Tridium | 2020 | Niagara 4 | Legacy unsupported; must migrate |
| Siemens SIPROTEC 4 (some SKUs) | Siemens | Various | SIPROTEC 5 | CVE-2024-52504 (DoS) no fix planned [Siemens, 2024] |

### 5.5 Operational Security Controls

**Table 11.11: Operational security controls**

| Control | Implementation | Frequency |
|:---|:---|:---|
| Vulnerability scanning | OT-specific scanner (Nozomi, Claroty, Dragos) covering all BMS, EPMS, UPS, cooling controllers | Monthly |
| Patch management | Test patches in isolated lab; deploy to production within 30 days for critical CVEs | Quarterly or as needed |
| Configuration baseline monitoring | Compare current device configs against approved baseline; alert on drift | Continuous |
| Credential rotation | Rotate service accounts and privileged credentials every 90 days | Quarterly |
| Firmware EOL tracking | Maintain inventory of all OT devices with firmware version and EOL date | Quarterly review |
| Network segmentation verification | Annual penetration test of zone boundaries; verify no unintended routes | Annually |

---

## 6. Phase 5: Decommissioning and Disposal — The Forgotten Risk

### 6.1 The Problem

When OT equipment reaches end-of-life, it is typically removed from the facility and either resold, recycled, or sent to landfill. The equipment often contains:

- Credentials (passwords, SNMP community strings, service account tokens)
- Network configuration (IP addresses, VLAN assignments, routing tables)
- Firmware images (proprietary code that may contain vulnerabilities)
- Operational data (temperature logs, power usage, alarm histories)

If this data is not sanitised, it can be extracted by the next owner of the equipment or by a disposal contractor.

### 6.2 Decommissioning Threats

**Table 11.12: Decommissioning threats**

| Threat | Vector | MITRE | Consequence |
|:---|:---|:---|:---|
| Credential leakage | Equipment sold on secondary market with stored credentials | T0812 (Default Credentials) | Attacker gains access to similar equipment in other facilities |
| Configuration exposure | Network topology and IP schemes recovered from decommissioned devices | T0846 (Remote System Discovery) | Reconnaissance for future attacks |
| Firmware extraction | Proprietary firmware reverse-engineered for zero-day discovery | T0839 (Module Firmware) | New CVEs discovered and weaponised |
| Data recovery | Operational logs reveal facility patterns (peak loads, maintenance windows) | T0882 (Theft of Operational Info) | Attack timing optimisation |

### 6.3 Decommissioning Security Protocol

**Table 11.13: Decommissioning security protocol**

| Step | Requirement | Verification |
|:---|:---|:---|
| 1. Credential sanitisation | All stored credentials shall be overwritten or destroyed. Factory reset does not guarantee removal — use secure erase (NIST SP 800-88). | Certificate of sanitisation from disposal contractor. |
| 2. Configuration wipe | All configuration files (IP addresses, VLANs, routing) shall be overwritten. | Device booted to factory defaults; verified by asset owner. |
| 3. Firmware removal | Firmware shall be overwritten with a blank or random image. If not possible, physical destruction of memory chips. | Destruction log with serial numbers. |
| 4. Physical destruction | For devices with non-removable storage (e.g., embedded flash), physical destruction (shredding, crushing) is required. | Video evidence; destruction certificate. |
| 5. Data-bearing device tracking | All data-bearing components (SD cards, hard drives, flash modules) shall be tracked by serial number through destruction. | Chain-of-custody log. |
| 6. Contractor vetting | Disposal contractor shall have ISO 27001 certification and documented data destruction procedures. | Certification copy; contract clause. |

### 6.4 Known Risks from Secondary Market

The secondary market for OT equipment is unregulated. Devices sold on eBay or through brokers may retain credentials. In 2023, researchers found that 40% of decommissioned industrial controllers purchased online contained recoverable credentials [Claroty, 2023]. For datacenter OT, this risk is amplified because many facilities use identical models of UPS NMCs, BMS controllers, and network switches.

---

## 7. Cross-Phase Integration: The CyHAZOPs Lifecycle Framework

Each lifecycle phase introduces unique attack surfaces, but the most dangerous attacks span multiple phases. A firmware implant introduced during construction (Phase 2) will survive commissioning (Phase 3) and operate undetected through operations (Phase 4). A credential harvested from a decommissioned device (Phase 5) can be used to attack an operational facility.

The CyHAZOPs framework requires:

1. **Procurement specifications** that mandate security features (Phase 1)
2. **Construction security controls** that protect equipment before commissioning (Phase 2)
3. **Commissioning verification** that confirms security posture before handover (Phase 3)
4. **Operational monitoring** that detects anomalies throughout the facility life (Phase 4)
5. **Decommissioning sanitisation** that prevents data leakage (Phase 5)

### 7.1 Zone/Conduit Model for Lifecycle Security

The IEC 62443-3-2 zone/conduit model (IEC, 2020) applies not only to the operational network but also to the lifecycle processes themselves. Each phase should be treated as a separate zone with defined conduits:

**Table 11.14: Lifecycle zone/conduit mapping**

| Lifecycle Phase | Zone | Conduit to Operational Zone | Security Control |
|:---|:---|:---|:---|
| Construction | Construction Zone (temporary network) | None — air-gapped | No network connection between construction and operational zones |
| Commissioning | Commissioning Zone (isolated network) | One-way data diode for telemetry only | No bidirectional communication; all configuration changes logged |
| Operations | Operational Zone (permanent network) | N/A | Standard zone/conduit architecture (see Chapter 4) |
| Decommissioning | Decommissioning Zone (isolated network) | None — air-gapped | Equipment removed from operational network before sanitisation |

---

## References

- ABB. (2024). ABB PSIRT Advisory: CVE-2024-48510. https://global.abb/group/en/technology/cyber-security/alerts-and-notifications
- Axis Communications. (2025). Axis Trust Center: Security Advisories. https://www.axis.com/about-axis/cybersecurity
- CISA. (2026). ICS Advisory ICSA-26-027-04: Johnson Controls Metasys. https://www.cisa.gov/news-events/ics-advisories/icsa-26-027-04
- Claroty. (2023). The State of Industrial Cybersecurity: Secondary Market Risks. Claroty Research.
- Eaton. (2025). Eaton Cybersecurity Advisory ETN-VA-2025-1026. https://www.eaton.com/us/en-us/company/news-insights/cybersecurity.html
- European Parliament. (2024). EU Cyber Resilience Act (CRA), Article 13(7).
- Genetec. (2025). Genetec Security Advisory: CVE-2025-1789. https://docs.genetec.com/
- Honeywell. (2025). Honeywell Niagara Framework Security Advisory (July 2025). https://www.honeywell.com
- IEC. (2015). IEC 62443-2-3: Security for industrial automation and control systems – Patch management.
- IEC. (2018). IEC 62443-4-1: Secure product development lifecycle requirements.
- IEC. (2019). IEC 62443-4-2: Technical security requirements for IACS components.
- IEC. (2020). IEC 62443-3-2: Security risk assessment for system design.
- ISCI. (2025). ISASecure Certified Products Registry. https://isasecure.org/certification/certified-products
- Moxa. (2025). Moxa Security Advisory MPSA-241155: CVE-2024-9138. https://www.moxa.com/en/support/product-support/security-advisory/mpsa-241155
- NIST. (2024b). FIPS 203: Module-Lattice-Based Key-Encapsulation Mechanism Standard.
- NIST. (2024c). FIPS 204: Module-Lattice-Based Digital Signature Standard.
- NIST. (2024d). FIPS 205: Stateless Hash-Based Digital Signature Standard.
- Schneider Electric. (2022). TLStorm Advisory: CVE-2022-22805, CVE-2022-22806, CVE-2022-0715.
- Schneider Electric. (2025). SEVD-2025-224-02: EcoStruxure IT Data Center Expert.
- Siemens. (2024). Siemens ProductCERT Advisory SSA-400089: SIPROTEC 4.
- Vertiv. (2025). Vertiv Security Center: CVE-2025-46412, CVE-2025-41426. https://www.vertiv.com/en-us/support/security-support-center