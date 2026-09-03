# Standards Mapping: WP16
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:26:16.488491

### Table 1: Asset → Zone → SL-T → IEC 62443-4-2 FR/SR Requirements

| Asset / Subsystem | IEC 62443-3-2 Zone | SL-T | Applicable IEC 62443-4-2 Component Requirements (SR) |
| :--- | :--- | :--- | :--- |
| **Utility Feed (EPMS Monitoring)** | Zone 2 (Electrical) | SL-T 3 | SR 1.1 (Human user identification), SR 2.1 (Authorization enforcement), SR 2.8 (Auditable events), SR 3.4 (Software & information integrity), SR 5.1 (Network segmentation), SR 7.1 (DoS protection), SR 7.3 (Control system backup) |
| **Medium Voltage Switchgear (Protective Relays, IEC 61850)** | Zone 4 (Substation / Grid Interconnect) | SL-T 4 | SR 1.1, SR 1.2 (Software process & device identification), SR 1.9 (Strength of public key authentication), SR 2.1, SR 2.12 (Non-repudiation), SR 3.1 (Communication integrity), SR 3.4, SR 3.11 (Physical tamper resistance), SR 3.14 (Integrity of boot process), SR 4.3 (Use of cryptography), SR 5.1, SR 5.2 (Zone boundary protection), SR 6.2 (Continuous monitoring), SR 7.1, SR 7.3 |
| **UPS Blocks (Network Management Card - NMC)** | Zone 2 (Electrical) | SL-T 3 | SR 1.1, SR 1.5 (Authenticator management), SR 1.7 (Strength of password-based authentication), SR 1.11 (Unsuccessful login attempts), SR 2.1, SR 2.8, SR 3.4, SR 4.1 (Information confidentiality), SR 5.1, SR 7.1, SR 7.3, SR 7.7 (Least functionality) |
| **BMS Controller (e.g., Chiller/Pump Control)** | Zone 1 (BMS / HVAC) | SL-T 2 | SR 1.1, SR 1.2, SR 1.5, SR 1.7, SR 1.11, SR 2.1, SR 2.8, SR 3.1, SR 3.4, SR 5.1, SR 7.1, SR 7.3, SR 7.7 |
| **CDU Controller (Liquid Cooling)** | Zone 1 (BMS / HVAC) | SL-T 3 | SR 1.1, SR 1.2, SR 1.7, SR 1.11, SR 2.1, SR 2.8, SR 3.1, SR 3.4, SR 4.1, SR 5.1, SR 7.1, SR 7.2 (Resource management), SR 7.3 |
| **VFD (Chiller/Pump Drive)** | Zone 1 (BMS / HVAC) | SL-T 2 | SR 1.1, SR 2.1, SR 2.8, SR 3.4, SR 5.1, SR 7.1 |
| **Fire Alarm Control Panel (FACP)** | Zone 3 (Fire & Life Safety) | SL-T 3 | SR 1.1, SR 1.2, SR 1.7, SR 2.1, SR 2.8, SR 3.1, SR 3.4, SR 3.11, SR 5.1, SR 5.2, SR 7.1, SR 7.3 |
| **EPMS (Power Monitoring Server/Meters)** | Zone 2 (Electrical) | SL-T 3 | SR 1.1, SR 1.2, SR 1.7, SR 1.11, SR 2.1, SR 2.8, SR 2.12, SR 3.1, SR 3.4, SR 4.1, SR 4.3, SR 5.1, SR 5.4 (Application partitioning), SR 6.1 (Audit log accessibility), SR 6.2, SR 7.1, SR 7.3, SR 7.7 |
| **BESS BMS (Battery Management System)** | Zone 6 (BESS / Battery) | SL-T 3 | SR 1.1, SR 1.2, SR 1.7, SR 2.1, SR 2.8, SR 3.1, SR 3.4, SR 5.1, SR 7.1, SR 7.2, SR 7.3 |
| **Industrial Ethernet Switch (OT Network)** | Network between Zones 1/2/3/6 | SL-T 3 | SR 1.1, SR 1.2, SR 2.1, SR 2.8, SR 3.4, SR 5.1, SR 5.2, SR 7.1, SR 7.6 (Network and security config settings), SR 7.7 |
| **Industrial Firewall / Data Diode** | Conduit Enforcement Points (e.g., C0-1, C1-3) | SL-T 3 | SR 1.1, SR 1.2, SR 2.1, SR 2.8, SR 3.4, SR 5.1, SR 5.2, SR 7.1, SR 7.6, SR 7.7 |
| **Safety Instrumented System (SIS)** | Zone 3 or Zone 4 (if electrical safety) | SL-T 4 | SR 1.1, SR 1.2, SR 1.9, SR 2.1, SR 2.12, SR 3.1, SR 3.4, SR 3.11, SR 3.14, SR 4.3, SR 5.1, SR 5.2, SR 6.1, SR 6.2, SR 7.1, SR 7.3 |

### Table 2: Asset → Certification Status → Gap Description

| Asset / Subsystem | ISASecure Certification Status | Gap Description (SL-3/SL-4 Non-Compliance) |
| :--- | :--- | :--- |
| **UPS Network Management Cards (NMCs)** | **Gap** (No ISASecure CSA/SSA) | Fails SR 1.5 (authenticator management), SR 1.7 (strong passwords), SR 1.11 (login attempt limits), SR 4.1 (data confidentiality), SR 4.3 (use of cryptography). Default credentials and lack of encrypted communication are critical gaps. |
| **BMS Controllers (DC-specific)** | **Gap** (Vendor SDLA only; no product CSA) | Fails SR 1.2 (software process identification), SR 3.14 (boot integrity). Limited support for SR 5.1 (segmentation) and SR 6.2 (continuous monitoring). |
| **CDU/PLC Controllers** | **Gap** (No ISASecure CSA) | Fails SR 1.2, SR 3.14, SR 7.2 (resource management). Often lack firmware integrity verification and robust DoS protection. |
| **EPMS Meters** | **Gap** (No ISASecure CSA) | Fails SR 1.2, SR 2.12 (non-repudiation), SR 4.1, SR 4.3. Critical telemetry and command data often transmitted in clear text. |
| **Protection Relays (IEC 61850)** | **Gap** (Not ISASecure; IEC 61850 focused) | Fails SR 3.11 (physical tamper), SR 3.14 (boot integrity), SR 4.3 (cryptography). While IEC 61850 defines secure communication, component-level security (e.g., firmware signing) is not mandated. |
| **Industrial Ethernet Switches** | **Certified** (Moxa TN-4900) | **Partial Gap:** Most competing vendors (Cisco IE, Belden/Hirschmann) are not ISASecure certified, creating a mixed-certification environment in the same zone. |
| **Fire Alarm Control Panels (FACP)** | **Gap** (Vendor SDLA only) | Fails SR 1.2, SR 3.4 (software integrity), SR 3.11. Proprietary protocols and lack of standard authentication are systemic gaps. |
| **BESS BMS** | **Gap** (No ISASecure CSA) | Fails SR 1.2, SR 3.14, SR 7.2. Lack of certified BMS creates a high-risk attack surface for thermal runaway initiation. |
| **Safety Instrumented Systems (SIS)** | **Certified** (Honeywell Safety Manager) | Meets SL-4 requirements for certified components. **System-level** SSA certification (e.g., Triconex) required for compliance. |

### Table 3: Asset → Non-IEC Standards Applicability

| Asset / Subsystem | Applicable Standard | Clause / Section | Key Requirement |
| :--- | :--- | :--- | :--- |
| **Cooling System (Chillers, CRAHs, CDUs)** | ASHRAE TC 9.9 | Air Classes A1-A4; Water Classes W17-W+ | Maintain inlet temperatures within allowable envelope; rate of change ≤20°C/hr. CDU PLC must control coolant supply temp per selected Water Class. |
| **BMS (HVAC Control)** | ASHRAE TC 9.9 | Recommended Envelope | Setpoints must target 18–27°C dry-bulb; alarms at boundary. Rate of change limits must be enforced during failover. |
| **Electrical Distribution (UPS, Switchgear)** | EN 50600-2-2 | Availability Classes 1-4 | Class 4 topology (2N) requires simultaneous maintenance capability and fault tolerance. EPMS monitoring is mandatory for Class 3-4. |
| **Cooling Infrastructure** | EN 50600-2-3 | Availability Classes 1-4 | Class 4 topology requires automatic failover for all cooling paths (N+N). Environmental monitoring per ASHRAE TC 9.9. |
| **Fire Protection (VESDA, Suppression)** | NFPA 75 | Ch. 7 (Detection), Ch. 9 (HVAC Shutdown) | Early warning detection (VESDA) required. Fire detection must interface with BMS to shut down air handling within 5 seconds. |
| **Fire Protection (General)** | NFPA 76 | 2024 Ed., Fire Detection, Off-Gas Detection | Performance-based detection. Mandatory off-gas detection for battery areas. |
| **Battery Systems (Li-ion BESS)** | NFPA 855 | Ch. 4 (HMA), Ch. 9, Ch. 10, Ch. 11 | Hazard Mitigation Analysis required. Enhanced ventilation for gas management. Explosion control may be required per UL 9540A installation-level test. |
| **Physical Security (Access Control, CCTV)** | EN 50600-2-5 | Protection Classes 1-4 | PC 3/4 requires multi-factor authentication, anti-tailgating, cabinet-level locks. IP-based devices must be OT-hardened per IEC 62443. |
| **Datacenter Efficiency** | EN 50600-4-2, -4-5 | PUE, WUE Metrics | EPMS and water metering required for reporting. PUE = Total Facility Power / IT Equipment Power. |

### Architectural Recommendations for Closing Gaps

1.  **Mandate ISASecure/IEC 62443-4-2 Compliance for Critical OT Components:** Issue procurement specifications requiring ISASecure CSA (Component Security Assurance) certification for all new UPS NMCs, BMS controllers, CDU PLCs, EPMS meters, and industrial switches. For assets without certified equivalents (e.g., protection relays), require a formal, third-party assessed gap analysis against IEC 62443-4-2 SL-3 or SL-4, with compensating controls documented.
2.  **Enforce Network Segmentation per SR 5.1/5.2:** Deploy industrial firewalls and/or data diodes at all conduit points (C0-1, C1-3, C2-4) as defined in IEC 62443-3-2. Enforce a zero-trust communication policy where every connection between zones requires explicit, application-aware rules. This mitigates the risk of lateral movement from a compromised BMS controller (Zone 1) to the fire safety system (Zone 3).
3.  **Implement Robust Authentication and Encryption for High-Value Assets:** For assets in SL-T 3/4 zones (e.g., EPMS, protection relays, safety controllers), enforce SR 1.9 (public key authentication) and SR 4.3 (cryptography). Deprecate all clear-text protocols (Modbus TCP, unauthenticated BACnet/IP) on conduits connecting these zones. Implement certificate-based authentication for all human and software users accessing these systems.
4.  **Integrate Cyber Event Response into the ConOps Mode Transition Logic:** Formalize the transition from Mode M1 to M4 (Degraded — Cyber) in the facility's operating procedures. Link specific IEC 62443-4-2 SR 6.2 (Continuous Monitoring) alerts from OT SIEMs directly to the ConOps trigger table (Table 16.3). Ensure that the isolation and manual control procedures for a compromised CDU PLC or UPS NMC are practiced drills.
5.  **Address Firmware Integrity Gaps:** For all SL-T 3/4 embedded devices (controllers, relays), implement a secure firmware update process aligned with SR 3.4 and SR 3.14. Establish a cryptographic firmware baseline for each device type and perform periodic integrity verification. This is a critical countermeasure against the persistent threat of firmware manipulation in datacenter OT.
6.  **Map EN 50600 Protection Classes to IEC 62443 Security Levels:** Formally adopt the integration matrix (EN 50600 PC 3/4 → IEC 62443 SL 3/4) as a design principle. This ensures that physical security upgrades (e.g., installing IP-based access control for a PC 3 zone) are always accompanied by a corresponding cyber hardening project for the underlying OT control systems.