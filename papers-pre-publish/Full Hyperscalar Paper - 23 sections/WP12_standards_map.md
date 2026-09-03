# Standards Mapping: WP12
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:14:12.536186

### Comprehensive Standards Mapping for WP12 Infrastructure

**Table 1: Asset → Zone → SL-T → IEC 62443-4-2 FR/SR Requirements**

| Asset / Subsystem | IEC 62443-3-2 Zone | SL-T | Applicable IEC 62443-4-2 FR / SR & Clause References |
| :--- | :--- | :--- | :--- |
| **BESS BMS (Node N15)** | Zone 6 | 3 | **FR1/CR 1.1** (Human user IAC), **FR1/CR 1.2** (Software process/device IAC), **FR1/CR 1.5** (Authenticator mgmt), **FR1/CR 1.7** (Password strength), **FR2/CR 2.1** (Authorization enforcement), **FR3/CR 3.1** (Comm integrity), **FR3/CR 3.4** (SW/info integrity), **FR7/CR 7.1** (DoS protection) |
| **BESS PCS (Inverter)** | Zone 6 | 3 | **FR1/CR 1.2**, **FR2/CR 2.1**, **FR3/CR 3.1**, **FR4/CR 4.3** (Use of crypto - if MMS used), **FR7/CR 7.1**, **FR7/CR 7.2** (Resource mgmt) |
| **BESS EMS** | Zone 6 | 3 | **FR1/CR 1.1**, **FR2/CR 2.1**, **FR2/CR 2.8** (Auditable events), **FR3/CR 3.1**, **FR3/CR 3.7** (Input validation), **FR5/CR 5.1** (Network segmentation), **FR7/CR 7.1** |
| **BESS Thermal Mgmt** | Zone 6 | 2 | **FR1/CR 1.2**, **FR3/CR 3.1**, **FR7/CR 7.2** |
| **BESS Fire Detection/Suppression** | Zone 3 (interlocked) | 3 | **FR3/CR 3.11** (Physical tamper resistance), **FR7/CR 7.1**. Hardwired interlocks take precedence over network function. |
| **Water Treatment PLC/Controller (Node N16)** | Zone 1 | 2 | **FR1/CR 1.1**, **FR1/CR 1.2**, **FR2/CR 2.1**, **FR3/CR 3.1**, **FR3/CR 3.4**, **FR7/CR 7.1** |
| **Water Treatment Sensors (Chemical/Conductivity)** | Zone 1 | 2 | **FR3/CR 3.1** (Comm integrity), **FR7/CR 7.1**. Typically simple Modbus/4-20mA devices. |
| **Water Treatment Dosing Pumps** | Zone 1 | 2 | **FR1/CR 1.2**, **FR3/CR 3.1**, **FR3/CR 3.7** (Input validation for setpoints), **FR7/CR 7.2** |

**Table 2: Asset → Certification Status → Gap Description**

| Asset | ISASecure / IEC 62443 Certification Status | Gap Analysis (vs. SL-3/SL-4 Requirements) |
| :--- | :--- | :--- |
| **BESS BMS (All vendors per Table 12.3)** | **Not Certified (Gap)** | Lacks **FR1/CR 1.2** (device authentication), **FR1/CR 1.5** (default credentials common), **FR4/CR 4.3** (cleartext Modbus), **FR6/CR 6.2** (no OT SIEM integration). Fails SL-3. |
| **BESS PCS / EMS** | **Not Certified (Gap)** | Similar gaps to BMS. Modbus TCP lacks authentication/integrity (**FR3/CR 3.1**), no secure update mechanism (**FR3/CR 3.4**). Fails SL-3. |
| **BESS Thermal Management** | **Not Certified (Gap)** | Often uses proprietary/BACnet with weak security. Gaps in **FR1/CR 1.2** and **FR2/CR 2.1**. Meets SL-2 only. |
| **Water Treatment PLC (Generic)** | **Vendor-Dependent; Typically Not Certified** | Most use default protocols (Modbus) lacking **FR4/CR 4.3**. Firmware integrity (**FR3/CR 3.4**) unverifiable. May meet SL-2, fails SL-3. |
| **BESS Gas Detection System** | **N/A (Primarily Hardwired)** | Safety-critical function relies on hardwired interlock to ventilation/panel. Network interface (if present) represents uncontrolled conduit. |
| **UPS Network Management Cards (from Table 1)** | **Not Certified (Critical Gap)** | Universal default: HTTP/FTP, default passwords, no **FR1/CR 1.5** or **FR4/CR 4.3**. Principal attack vector into Zone 2. Fails SL-2+.

**Table 3: Asset → Non-IEC Standards Applicability (ASHRAE, NFPA, etc)**

| Asset | Applicable Standard & Specific Clause/Section | Requirement & Datacenter Context |
| :--- | :--- | :--- |
| **BESS (All)** | **NFPA 855:2026, Section 4.3** | Minimum 15 m physical separation from IT data halls based on UL 9540A installation-level test data. Cybersecurity must prevent initiation of hazard defined by this standard. |
| **BESS** | **NFPA 855:2026, Chapters 9, 10, 11** | Fire detection (gas/thermal), enhanced ventilation for gas management, and explosion control required. OT system must not inhibit these functions. |
| **BMS-BESS, Thermal Mgmt** | **IEC 62443-3-2, Clause 5.4 (Conduit C6-0)** | Mandates dedicated zone (Zone 6) with controlled conduit to Zone 2 (Electrical). Unidirectional gateway for telemetry, separate authenticated command path. |
| **Water Treatment System** | **ASHRAE TC 9.9 (2021), Water Classes W17-W+** | Supply water temperature limits per class (e.g., W32 ≤32°C). BMS/PLC setpoints must enforce these bounds to maintain cooling capacity. |
| **Water Treatment System** | **EN 50600-2-3** | Environmental control availability class dictates redundancy for water loops. Class 4 requires 2(N+1) pumping/treatment. |
| **BESS & Water System OT Networks** | **IEC 62443-3-3, SR 3.5 (Network Segmentation)** | Technical control requirement for zones. Zone 6 (BESS) and Zone 1 (Water) must be segmented with industrial firewalls enforcing zone conduits. |

**Architectural Recommendations for Closing Gaps**

1.  **Implement Defined Zone/Conduit Architecture:** Per **IEC 62443-3-2, Clause 5.3**, instantiate the proposed zone model. **Zone 6 (BESS)** must be isolated with conduits using **unidirectional security gateways** (for telemetry) and **industrial firewalls with DPI** (for command/control) per **Clause 5.4**.

2.  **Mandate Component-Level Requirements in Procurement:** For all uncertified BESS and water treatment components, contractually mandate compliance with **IEC 62443-4-2, FR 1, FR 2, FR 3, FR 5, and FR 7** at **Security Level (SL) 2 or 3** as appropriate for the zone. Require evidence of secure development lifecycle (**IEC 62443-4-1**) from vendors.

3.  **Deploy Hardwired Safety Interlocks:** For BESS thermal runaway prevention, implement **independent, hardwired cell-level thermal disconnects** and **gas detection** as **P1 safeguards**. These must be physically separate from and take precedence over any OT control path, aligning with the safety requirement in **NFPA 855, Chapter 9**.

4.  **Conduct Targeted CyHAZOPs & Penetration Testing:** Perform **IEC 62443-3-2** security risk assessment for each new node (N15, N16). Execute focused penetration testing on **Modbus TCP** and **REST API** interfaces of BESS BMS/EMS against **CR 1.1, CR 3.1, CR 3.7, and CR 7.1** requirements.

5.  **Integrate with Central OT Monitoring:** All BESS and water treatment OT devices must forward audit logs (**FR 6/CR 6.1**) to the central OT SIEM. Network flows and device health must be monitored for compliance with zone boundary rules and to detect anomalous commands indicative of the hazards in Table 12.4.