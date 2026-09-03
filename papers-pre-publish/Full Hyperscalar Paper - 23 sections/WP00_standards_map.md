# Standards Mapping: WP00
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:31:47.484994

### Table 1: Asset → Zone → SL-T → IEC 62443-4-2 FR/SR Requirements

| Asset/Subsystem | IEC 62443-3-2 Zone Placement | Target Security Level (SL-T) | Applicable IEC 62443-4-2 FR/SR Requirements |
| :--- | :--- | :--- | :--- |
| **Electrical Power Distribution** | | | |
| GIS / Switchgear (132kV/33kV) | Zone 1 (Process Control) | SL-1 | **FR1 (SR 1.1):** Access control for local/remote interfaces. **FR2 (SR 2.1):** Control of security parameters. **FR3 (SR 3.1, 3.2):** Malicious code protection & software/firmware integrity verification. **FR5 (SR 5.1):** Restricted data flow between Zone 1 and Zone 3. |
| Protection Relays (e.g., SIPROTEC) | Zone 1 (Process Control) | SL-2 | **FR1 (SR 1.1, 1.2):** Unique identification & authentication. **FR2 (SR 2.1, 2.4):** Control of security parameters & secure default. **FR3 (SR 3.1, 3.5):** Malicious code protection & runtime integrity. **FR4 (SR 4.1):** Event logging. **FR6 (SR 6.1):** Resource availability. |
| UPS (Network Management Card) | Zone 1 (Process Control) | SL-2 | **FR1 (SR 1.1, 1.2, 1.9):** Access control, unique ID & auth, strength of password-based auth. **FR2 (SR 2.1):** Control of security parameters. **FR3 (SR 3.1):** Malicious code protection. **FR7 (SR 7.1):** Denial of service protection. |
| ATS Controller (e.g., ASCO 7000) | Zone 1 (Process Control) | SL-2 | **FR1 (SR 1.1, 1.2, 1.9):** Access control, unique ID & auth, strength of password-based auth. **FR2 (SR 2.4):** Secure default. **FR3 (SR 3.1, 3.5):** Malicious code protection & runtime integrity. **FR7 (SR 7.2):** Fault tolerance. |
| Generator Controller | Zone 1 (Process Control) | SL-1 | **FR1 (SR 1.1):** Access control. **FR2 (SR 2.4):** Secure default. **FR3 (SR 3.1):** Malicious code protection. **FR7 (SR 7.2):** Fault tolerance. |
| PDU / DC Power Shelves (ORv3) | Zone 2 (Area Supervisory Control) | SL-1 | **FR1 (SR 1.1):** Access control. **FR2 (SR 2.4):** Secure default. **FR3 (SR 3.1):** Malicious code protection. **FR6 (SR 6.1):** Resource availability. |
| **Thermal Management** | | | |
| Chiller Controller (e.g., York) | Zone 1 (Process Control) | SL-2 | **FR1 (SR 1.1, 1.2):** Access control, unique ID & auth. **FR2 (SR 2.1, 2.4):** Control of security parameters & secure default. **FR3 (SR 3.1, 3.5):** Malicious code protection & runtime integrity. **FR7 (SR 7.2):** Fault tolerance. |
| CDU / Coolant Distribution Unit | Zone 1 (Process Control) | SL-2 | **FR1 (SR 1.1, 1.2, 1.9):** Access control, unique ID & auth, password strength. **FR2 (SR 2.1, 2.4):** Control of security parameters & secure default. **FR3 (SR 3.1):** Malicious code protection. **FR7 (SR 7.2):** Fault tolerance. |
| Cooling Tower VFD | Zone 1 (Process Control) | SL-1 | **FR1 (SR 1.1):** Access control. **FR2 (SR 2.4):** Secure default. **FR3 (SR 3.1):** Malicious code protection. |
| **BMS/DCIM** | | | |
| BMS Head-End Controller | Zone 3 (Site Operations) | SL-3 | **FR1 (SR 1.1, 1.2, 1.9, 1.10, 1.13):** Access control, unique ID & auth, password strength, lockout, use of authentication mechanisms. **FR2 (SR 2.1, 2.2, 2.4):** Control of security parameters, non-reputation, secure default. **FR3 (SR 3.1, 3.2, 3.4):** Malicious code protection, software/firmware integrity, self-test. **FR4 (SR 4.1):** Event logging. **FR5 (SR 5.1, 5.2):** Restricted data flow & network segmentation. **FR6 (SR 6.1):** Resource availability. |
| DCIM Software Server | Zone 3 (Site Operations) | SL-3 | **FR1 (SR 1.1, 1.2, 1.9, 1.13):** Full authentication and access control suite. **FR2 (SR 2.1, 2.2, 2.4):** Control of security parameters, non-repudiation, secure default. **FR3 (SR 3.1, 3.2):** Malicious code protection & integrity verification. **FR4 (SR 4.1):** Event logging. **FR5 (SR 5.1, 5.2):** Restricted data flow & network segmentation. **FR7 (SR 7.1, 7.2):** DoS protection & fault tolerance. |
| **Physical Security & Life Safety** | | | |
| Access Control Panel | Zone 3 (Site Operations) | SL-2 | **FR1 (SR 1.1, 1.2, 1.9):** Access control, unique ID & auth, password strength. **FR2 (SR 2.4):** Secure default. **FR3 (SR 3.1):** Malicious code protection. **FR4 (SR 4.1):** Event logging. |
| Video Management System (VMS) | Zone 3 (Site Operations) | SL-2 | **FR1 (SR 1.1, 1.2):** Access control, unique ID & auth. **FR2 (SR 2.1):** Control of security parameters. **FR3 (SR 3.1, 3.2):** Malicious code protection & integrity verification. **FR4 (SR 4.1):** Event logging. **FR5 (SR 5.1):** Restricted data flow. |
| Fire Alarm Control Panel (FACP) | Zone 1 (Process Control) | SL-2 | **FR1 (SR 1.1, 1.2):** Access control, unique ID & auth. **FR2 (SR 2.1, 2.4):** Control of security parameters & secure default. **FR3 (SR 3.1, 3.5):** Malicious code protection & runtime integrity. **FR7 (SR 7.2):** Fault tolerance. |
| **Compute/Silicon** | | | |
| Server Baseboard Mgmt Controller (BMC) | Zone 2 (Area Supervisory Control) | SL-3 | **FR1 (SR 1.1, 1.2, 1.9, 1.13):** Full authentication suite. **FR2 (SR 2.1, 2.2, 2.4):** Control of security parameters, non-repudiation, secure default. **FR3 (SR 3.1, 3.2, 3.4):** Malicious code protection, integrity verification, self-test. **FR4 (SR 4.1):** Event logging. **FR5 (SR 5.1):** Restricted data flow. **FR6 (SR 6.1):** Resource availability. |
| Top-of-Rack (ToR) Switch (OCP) | Zone 2 (Area Supervisory Control) | SL-3 | **FR1 (SR 1.1, 1.2, 1.9, 1.13):** Full authentication suite. **FR2 (SR 2.1, 2.2, 2.4):** Control of security parameters, non-repudiation, secure default. **FR3 (SR 3.1, 3.2):** Malicious code protection & integrity verification. **FR4 (SR 4.1):** Event logging. **FR5 (SR 5.1, 5.2):** Restricted data flow & network segmentation. **FR6 (SR 6.1):** Resource availability. |

### Table 2: Asset → Certification Status → Gap Description

| Asset/Subsystem | ISASecure Certification Status | Gap Description (vs. SL-3/SL-4) |
| :--- | :--- | :--- |
| **All Legacy OT Controllers** (e.g., older BMS, relay, UPS) | **Gap** - Typically uncertified | **Gap (SL-3/SL-4):** Fails FR1.13 (use of authenticated mechanisms). Lacks secure boot (FR3.5) and runtime integrity (FR3.4). Often uses insecure protocols (Modbus, unencrypted BACnet). Default credentials prevalent (FR2.4 gap). |
| **Hyperscale-Specific OCP Hardware** (BMC, ToR Switch) | **Gap** - Vendor-specific hardening only | **Gap (SL-3/SL-4):** While architecturally capable, many deployments lack centralized certificate-based authentication (FR1.13), encrypted management channels (FR5.1), and automated integrity verification (FR3.2) as standard practice. Firmware signing (FR3.1) is variable. |
| **New Premium OT Equipment** (e.g., latest chiller, GIS with digital secondary) | **Certified (partial)** - Some high-end components may hold ISASecure SDLA certification | **Gap (SL-4):** Even certified components often fail to meet the **defense-in-depth** required for SL-4. This includes lack of intrinsic, multi-party integrity verification (FR3.4) and the requirement for **secure development lifecycle** evidence at the facility integration level. |

### Table 3: Asset → Non-IEC Standards Applicability

| Asset/Subsystem | Applicable Non-IEC Standard | Specific Requirement / Clause |
| :--- | :--- | :--- |
| **All Subsystems** | **Cyber Resilience Act (CRA) / NIS2 (EU)** | Classifies the entire facility as **Critical/Important Entity**. Mandates risk management measures and incident reporting for OT components (Article 9 & 21 of NIS2). |
| **Electrical Power Distribution** | **IEEE 1613** | **Environmental and testing requirements for substation communication networking equipment.** Applies to protection relay and switchgear communication ports. |
| | **NFPA 110** | **Standard for Emergency and Standby Power Systems.** Mandates performance/testing of ATS and generators, which security must not impede (FR7 availability). |
| **Thermal Management** | **ASHRAE TC 9.9** | **Guidelines for Liquid Cooled Data Processing Environments (A4 Class).** Defines environmental limits for liquid-cooled racks (ASHRAE, 2021). Security controls (e.g., sensor access) must not disrupt monitoring per these guidelines. |
| | **ASHRAE 90.4** | **Energy Standard for Data Centers.** Cooling plant efficiency metrics (COP/PUE). Security-induced latency in chiller/vfd control loops can impact compliance. |
| **Building/Physical** | **NFPA 75 / 76** | **Standard for the Protection of Information Technology Equipment / Telecommunications Facilities.** Governs fire detection/suppression (FACP) and physical security requirements for the data hall. |
| | **EN 50600 Series** | **Information technology — Data centre facilities and infrastructures.** Provides European design criteria for availability (EN 50600-1) and energy efficiency (EN 50600-4), impacting system architecture and redundancy. |
| **Compute/Silicon** | **NIST SP 800-193** | **Platform Firmware Resiliency Guidelines.** Defines requirements for firmware protection, detection, and recovery (applies directly to BMC, UEFI). |

---

### Architectural Recommendations for Closing Gaps

1.  **Mandate Network Segmentation (IEC 62443-3-3 SR 3.5):** Implement strict zone firewalls between all zones. The BMS/DCIM (Zone 3) must communicate with Zones 1 & 2 only via a data diode or an industrial DMZ with application-layer break. This is foundational for achieving SL-T SL-3 and closing the pervasive data flow gap.
2.  **Enforce Strong Authentication and Credential Management (FR 1.2, 1.9, 1.13):** Decommission all default credentials. Implement a centralized privileged access management (PAM) system. Deploy multi-factor authentication (MFA) for all administrative access to the BMS/DCIM (SL-3) and highly sensitive Zone 1 assets like protection relays and generator controllers.
3.  **Implement a Secure Boot and Runtime Integrity Framework (FR 3.2, 3.4, 3.5):** For all assets supporting it (new OCP servers, modern chiller controllers), enable and enforce measured secure boot (TPM-based). For legacy assets, deploy network-based runtime integrity monitoring tools (e.g., passive fingerprinting for PLCs/relays) as a compensating control.
4.  **Establish a Unified Patch and Firmware Management Process (FR 3.1, 3.2):** Create a secure facility for staging and validating firmware updates for all OT subsystems. This process must verify integrity (cryptographic signatures) and authenticity of the vendor before deployment. This directly addresses the malicious code protection gap.
5.  **Deploy Secure, Resilient Communication Protocols (FR 5.1, 7.1):** Migrate from legacy protocols (Modbus TCP, unencrypted BACnet/IP) to secure alternatives (Modbus/TCP Security, BACnet/SC, OPC UA with security). For legacy devices, encapsulate communications within an encrypted VPN tunnel (IPsec or MACsec) to meet SR 5.1 and protect availability from network-based denial of service.
6.  **Integrate OT Security Monitoring with SIEM (FR 4.1):** Centralize logging from all IEC 62443-4-2 compliant assets into a Security Information and Event Management (SIEM) system. Use this to create analytics for detecting anomalous control commands (e.g., an ATS transfer command from an unusual source), closing the detection gap required for SL-3.