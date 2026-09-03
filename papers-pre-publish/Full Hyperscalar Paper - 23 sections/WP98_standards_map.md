# Standards Mapping: WP98
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:29:52.549744

### Table 1: Asset → Zone → SL-T → IEC 62443-4-2 FR/SR Requirements

| Asset/Subsystem | Zone (IEC 62443-3-3) | SL-T (IEC 62443-3-3) | IEC 62443-4-2 Foundational Requirements (FR) & Specific Requirements (SR) Applicable |
| :--- | :--- | :--- | :--- |
| **AHU (Air Handling Unit)** | Zone 1 (HVAC Process Control) | SL-2 | **FR 1: Identification & Authentication Control** (SR 1.1, SR 1.2). **FR 2: Use Control** (SR 2.4). **FR 3: System Integrity** (SR 3.4, SR 3.10). **FR 5: Restricted Data Flow** (SR 5.1, SR 5.2). **FR 6: Timely Response to Events** (SR 6.1). |
| **ATS (Automatic Transfer Switch)** | Zone 0 (Physical Process) | SL-1 | **FR 3: System Integrity** (SR 3.4). **FR 5: Restricted Data Flow** (SR 5.1). **FR 6: Timely Response to Events** (SR 6.1). |
| **BESS (Battery Energy Storage System)** | Zone 2 (Power Infrastructure) | SL-3 | **FR 1: Identification & Authentication Control** (SR 1.1, SR 1.2, SR 1.13). **FR 2: Use Control** (SR 2.4). **FR 3: System Integrity** (SR 3.4, SR 3.5, SR 3.10). **FR 4: Data Confidentiality** (SR 4.1, SR 4.2). **FR 5: Restricted Data Flow** (SR 5.1, SR 5.2). **FR 6: Timely Response to Events** (SR 6.1). **FR 7: Resource Availability** (SR 7.1, SR 7.2). |
| **BMS (Building Management System)** | Zone 1 (HVAC Process Control) | SL-3 | **FR 1: Identification & Authentication Control** (SR 1.1, SR 1.2, SR 1.13, SR 1.14). **FR 2: Use Control** (SR 2.1, SR 2.4). **FR 3: System Integrity** (SR 3.4, SR 3.5, SR 3.10, SR 3.11). **FR 4: Data Confidentiality** (SR 4.1, SR 4.2). **FR 5: Restricted Data Flow** (SR 5.1, SR 5.2, SR 5.3). **FR 6: Timely Response to Events** (SR 6.1). **FR 7: Resource Availability** (SR 7.1, SR 7.2). |
| **BMC (Baseboard Management Controller)** | Zone 1 (Server Management Plane) | SL-3 | **FR 1: Identification & Authentication Control** (SR 1.1, SR 1.2, SR 1.13, SR 1.14). **FR 2: Use Control** (SR 2.4). **FR 3: System Integrity** (SR 3.4, SR 3.5, SR 3.10, SR 3.11). **FR 4: Data Confidentiality** (SR 4.1, SR 4.2). **FR 5: Restricted Data Flow** (SR 5.1, SR 5.2). **FR 7: Resource Availability** (SR 7.1, SR 7.2). |
| **CDU (Coolant Distribution Unit)** | Zone 1 (DLC Process Control) | SL-3 | **FR 1: Identification & Authentication Control** (SR 1.1, SR 1.2, SR 1.13). **FR 2: Use Control** (SR 2.4). **FR 3: System Integrity** (SR 3.4, SR 3.5, SR 3.10, SR 3.11). **FR 5: Restricted Data Flow** (SR 5.1, SR 5.2). **FR 6: Timely Response to Events** (SR 6.1). **FR 7: Resource Availability** (SR 7.1, SR 7.2). |
| **EPMS (Electrical Power Monitoring System)** | Zone 2 (Power Infrastructure) | SL-3 | **FR 1: Identification & Authentication Control** (SR 1.1, SR 1.2, SR 1.13). **FR 2: Use Control** (SR 2.4). **FR 3: System Integrity** (SR 3.4, SR 3.5, SR 3.10). **FR 4: Data Confidentiality** (SR 4.1, SR 4.2). **FR 5: Restricted Data Flow** (SR 5.1, SR 5.2). **FR 6: Timely Response to Events** (SR 6.1). |
| **EPO (Emergency Power Off)** | Zone 0 (Physical Process) | SL-1 | **FR 3: System Integrity** (SR 3.4). **FR 7: Resource Availability** (SR 7.1). |
| **NMC (Network Management Card)** | Zone 2 (Network Management) | SL-3 | **FR 1: Identification & Authentication Control** (SR 1.1, SR 1.2, SR 1.13). **FR 2: Use Control** (SR 2.4). **FR 3: System Integrity** (SR 3.4, SR 3.5, SR 3.10). **FR 4: Data Confidentiality** (SR 4.1, SR 4.2). **FR 5: Restricted Data Flow** (SR 5.1, SR 5.2). |
| **PDU (Power Distribution Unit)** | Zone 2 (Power Infrastructure) | SL-2 | **FR 1: Identification & Authentication Control** (SR 1.1, SR 1.2). **FR 2: Use Control** (SR 2.4). **FR 3: System Integrity** (SR 3.4). **FR 5: Restricted Data Flow** (SR 5.1). |
| **PLC (Programmable Logic Controller)** | Zone 1 (Process Control) | SL-3 | **FR 1: Identification & Authentication Control** (SR 1.1, SR 1.2, SR 1.13). **FR 2: Use Control** (SR 2.4). **FR 3: System Integrity** (SR 3.4, SR 3.5, SR 3.10, SR 3.11). **FR 4: Data Confidentiality** (SR 4.1, SR 4.2). **FR 5: Restricted Data Flow** (SR 5.1, SR 5.2). **FR 6: Timely Response to Events** (SR 6.1). |
| **UPS (Uninterruptible Power Supply)** | Zone 2 (Power Infrastructure) | SL-2 | **FR 1: Identification & Authentication Control** (SR 1.1, SR 1.2). **FR 2: Use Control** (SR 2.4). **FR 3: System Integrity** (SR 3.4, SR 3.10). **FR 5: Restricted Data Flow** (SR 5.1, SR 5.2). **FR 6: Timely Response to Events** (SR 6.1). **FR 7: Resource Availability** (SR 7.1). |
| **VFD (Variable Frequency Drive)** | Zone 1 (HVAC Process Control) | SL-2 | **FR 1: Identification & Authentication Control** (SR 1.1, SR 1.2). **FR 2: Use Control** (SR 2.4). **FR 3: System Integrity** (SR 3.4, SR 3.10). **FR 5: Restricted Data Flow** (SR 5.1). **FR 6: Timely Response to Events** (SR 6.1). |
| **VESDA (Smoke Detection)** | Zone 0 (Physical Process / Life Safety) | SL-1 | **FR 3: System Integrity** (SR 3.4). **FR 6: Timely Response to Events** (SR 6.1). **FR 7: Resource Availability** (SR 7.1). |

### Table 2: Asset → Certification Status → Gap Description

| Asset/Subsystem | ISASecure / S.A.F.E. Certification Status | Gap Description (Preventing SL-3/SL-4) |
| :--- | :--- | :--- |
| **AHU** | Gap (No certification). | Lacks SR 1.13 (Auth. Strength), SR 3.5 (Integrity Verification), SR 5.2 (Network Segmentation). Firmware update mechanism lacks cryptographic verification. |
| **ATS** | Gap (No certification). | No SR 1.1 (Identification) for electronic control interface. No SR 3.5 (Integrity Verification) for control logic. |
| **BESS** | Gap (No certification). | Critical gaps in SR 1.13 (Auth. Strength), SR 3.5 (Integrity Verification), SR 4.1 (Data Confidentiality at Rest), SR 5.2 (Network Segmentation). Lacks secure boot and signed firmware. |
| **BMS** | Partial (S.A.F.E. assessed for core software, not full system). | Gaps in SR 1.14 (Auth. Strength - Passwords), SR 2.1 (Authorization Enforcement), SR 3.11 (Resilience). Integration ports lack SL-3 access control. |
| **BMC** | Partial (S.A.F.E. assessed). | Persistent gap in SR 3.5 (Integrity Verification) - unsigned firmware updates common. Lacks SR 4.1 (Confidentiality) for management traffic on some models. |
| **CDU** | Gap (No certification). | Major gaps in SR 1.13 (Auth. Strength), SR 3.5 (Integrity Verification), SR 5.2 (Network Segmentation). Often uses legacy protocols with no authentication. |
| **EPMS** | Partial (S.A.F.E. assessed). | Gaps in SR 3.10 (Malicious Code Protection), SR 4.2 (Data Confidentiality in Transit - clear-text protocols). |
| **EPO** | Gap (No certification). | Purely physical. No SR applicable beyond SR 3.4 if electronically activated. |
| **NMC** | Gap (No certification). | Lacks SR 1.13 (Auth. Strength), SR 3.5 (Integrity Verification), SR 4.2 (Confidentiality in Transit). Uses cleartext protocols (e.g., HTTP, Telnet). |
| **PDU** | Gap (No certification). | Lacks SR 1.13 (Auth. Strength) for outlet-level control. No SR 3.5 (Integrity Verification). |
| **PLC** | Gap (No certification). | Critical gaps in SR 1.13 (Auth. Strength), SR 3.5 (Integrity Verification), SR 4.1 (Data Confidentiality at Rest), SR 5.2 (Network Segmentation). Lacks secure boot. |
| **UPS** | Partial (S.A.F.E. assessed). | Gaps in SR 3.10 (Malicious Code Protection), SR 5.2 (Network Segmentation). Network card often sits on same VLAN as critical servers. |
| **VFD** | Gap (No certification). | Lacks SR 1.13 (Auth. Strength), SR 3.5 (Integrity Verification), SR 5.2 (Network Segmentation). Many use hard-coded credentials. |
| **VESDA** | Gap (No certification). | No electronic SRs applicable. Physical and power resilience (SR 7.1) is primary concern. |

### Table 3: Asset → Non-IEC Standards Applicability

| Asset/Subsystem | Applicable Non-IEC Standards & Clauses | Specific Requirements |
| :--- | :--- | :--- |
| **AHU, VFD, CDU** | **ASHRAE TC 9.9** A2 Class Environmental Envelope; **ASHRAE 90.1** Energy Efficiency. | A2 class: 15–32°C operating, 5–45°C short-term survival, 20–80% RH non-condensing. VFD/CDU must maintain temperatures for IT load per A2. |
| **BESS, UPS** | **NFPA 855** (Standard for the Installation of Stationary Energy Storage Systems); **IEEE 1547** (Grid Interface). | NFPA 855 Ch. 9: Fire protection for BESS (venting, suppression). IEEE 1547: Grid interconnection requirements for UPS/BESS in island mode. |
| **BMS, PLC, EPMS** | **IEC 62443-4-2** (Primary), **IEC 62351-6** (Security for Power System Communication - IEC 61850). | IEC 62351-6 provides TLS profiles for GOOSE and MMS protocols used in BMS/PLC/EPMS. |
| **PDU, NMC, UPS** | **IEC 62368-1** (Audio/Video, ICT and Business Equipment Safety); **UL 2043** (Plenum Ratings). | Safety for power-carrying components. NMC/UPS network ports require appropriate isolation per UL 2043 if routed through plenums. |
| **All OT Assets** | **NFPA 75** (Standard for the Fire Protection of Information Technology Equipment); **NFPA 76** (Standard for the Fire Protection of Telecommunications Facilities). | Defines suppression, detection (VESDA), and compartmentalization for data center infrastructure. |
| **VESDA, EPO, ATS** | **NFPA 72** (National Fire Alarm and Signaling Code); **NFPA 110** (Standard for Emergency and Standby Power Systems). | NFPA 72: Aspirating smoke detection (VESDA) installation, spacing, sensitivity. NFPA 110: ATS reliability and transfer time requirements. |
| **BMC, NMC** | **NIST SP 800-193** (Platform Firmware Resiliency Guidelines); **CRA Annex I** (EU Cyber Resilience Act). | SP 800-193: Protection, detection, and recovery mechanisms for firmware. CRA: Mandates vulnerability handling and SBOM for products placed on EU market. |
| **BESS, UPS, PDU** | **IEEE 1613** (Environmental and Testing Requirements for Communications Networking Devices in Electric Power Substations). | Environmental endurance (temperature, humidity, vibration) for devices in power infrastructure. |

### Section: Architectural Recommendations for Closing Gaps

1.  **Compensating Controls for Legacy Devices (CDU, VFD, PDU):** For assets with hard-coded credentials or lacking SR 1.13 (Auth. Strength), deploy a **secure serial console server or proxy** within the same zone. This device must enforce unique authentication (SR 1.1), log commands, and restrict access via jump hosts, effectively providing a security wrapper. This mitigates risk while awaiting device replacement.

2.  **Mandatory Network Micro-Segmentation:** Enforce IEC 62443-3-3 SR 5.2 (Network Segmentation) and SR 5.3 (Control Information Flow) at the switch level. Create a **dedicated VLAN/VPN for each zone** (e.g., VLAN 10 for Zone 1 HVAC, VLAN 20 for Zone 2 Power) with strict access control lists (ACLs). All traffic between zones (e.g., BMS to EPMS) must traverse a **stateful inspection firewall** within an IDMZ.

3.  **Firmware Integrity & Update Enforcement:**
    *   For all assets capable of secure boot (BMC, BMS, PLC), mandate its activation and tie it to a **Hardware Root of Trust**.
    *   Implement a centralized **patch and firmware management server** that validates the signature (SR 3.5, SR 3.11) of all updates against a secure key store. Deployment to operational assets requires dual authorization.

4.  **Cryptographic Enforcement for NMCs and EPMS:**
    *   Replace all cleartext protocols (SNMPv2c, HTTP, Telnet) with their secure variants (SNMPv3, HTTPS, SSH) as per IEC 62443-4-2 SR 4.1 and SR 4.2.
    *   Deploy **certificate-based authentication** for all management interfaces to achieve SR 1.13 (Auth. Strength).

5.  **Life Safety System Isolation (VESDA, EPO):** While low in SL-T, their compromise can cause physical harm or catastrophic failure. Ensure these systems are on a **physically separate or air-gapped network** from the corporate IT/OT network. Any electronic interface must use a unidirectional security gateway (data diode) for telemetry export, adhering to SR 5.2.

6.  **Certification Pathway:** Initiate **ISASecure IACS Security Lifecycle Management** certification for the BMS and EPMS as the first targets, as they are central control points. Use the **S.A.F.E.** assessment as a baseline for firmware security validation on BMCs and NMCs, driving vendor remediation to meet SR 3.5.