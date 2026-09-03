# Standards Mapping: WP06
Model: xiaomi/mimo-v2.5
Date: 2026-06-14T21:13:51.529259

### Table 1: IEC 62443-3-2 Zone Mapping & Security Requirements

| Asset/Subsystem | Zone Placement | SL-T (Target Security Level) | IEC 62443-4-2 FR/SR Requirements | Rationale for SL-T |
| :--- | :--- | :--- | :--- | :--- |
| **CRAH/CRAC Unit Controller** | Z2 | 3 | FR1 (Identification & Auth), FR5 (Restricted Data Flow), FR7 (Resource Availability) | Critical for thermal management; failure causes throttling; network-accessible. |
| **CDU Controller (DLC/Immersion)** | Z2 | 4 | FR1, FR3 (System Integrity), FR5, FR7, FR10 (Audit Logging) | Direct control of coolant flow/temp; compromise causes rapid hardware damage; highest consequence. |
| **VFD Controller (CDU/Chiller Pump)** | Z3 | 3 | FR1, FR5, FR7 | Controls critical pump speed; manipulated values can starve or flood cooling loops. |
| **Chiller Plant Controller** | Z2 | 3 | FR1, FR5, FR7 | Facility-wide thermal load management; failure cascades across zones. |
| **Cooling Tower Controller/VFD** | Z3 | 2 | FR1, FR5 | Lower direct consequence to IT; supports chiller plant efficiency. |
| **BMS Workstation** | Z1 | 4 | FR1, FR2 (Use Control), FR3, FR5, FR7 | Aggregation point for all OT data; high-value target for lateral movement. |
| **BMS Network Switch** | Z1 | 4 | FR1, FR5, FR7 | Carries all control traffic; compromise enables widespread disruption. |
| **Cold Plate Assembly (DLC)** | N/A (Physical) | 2 | FR3 (Physical Tamper) | Passive component, but leak detection sensor (if active) requires FR1/FR5. |
| **Immersion Tank (Single/Two-Phase)** | N/A (Physical) | 2 | FR3 | Physical containment; controller (if any) is Z2-SL4. |
| **FWS (Facility Water System) Pump** | Z3 | 3 | FR1, FR5, FR7 | Primary loop movement; failure disrupts heat rejection to chillers/towers. |
| **TCS (Technology Cooling System) Pump** | Z2 | 4 | FR1, FR3, FR5, FR7 | Secondary loop directly touching IT hardware; most critical pump. |

---

### Table 2: Certification Status & Gap Analysis

| Asset/Subsystem | Vendor Example | IEC 62443-4-2 Cert. | ISASecure Cert. | Gap Description |
| :--- | :--- | :--- | :--- | :--- |
| **CRAH/CRAC Controller** | Vertiv Liebert | **Not Certified** | **Not Certified** | No vendor holds certification. Typically runs on BACnet/IP with no native authentication or encrypted communications. |
| **CDU Controller** | CoolIT CHx2000, Vertiv CoolChip | **Not Certified** | **Not Certified** | Explicitly noted in chapter. Modbus/TCP or BACnet interfaces lack authentication; setpoint writes unauthenticated (Field Observation). |
| **Immersion Tank Controller** | GRC, Submer | **Not Certified** | **Not Certified** | Lack of certification noted; similar to CDU controllers. |
| **VFD Controller** | ABB ACQ580, Danfoss iC7 | **Not Certified** (for DC use) | **Not Certified** | VFDs are industrial components; no product carries datacenter-specific 62443-4-2 certification. Embedded Modbus RTU/TCP often unauthenticated. |
| **Chiller Controller** | YORK YZ, Trane CenTraVac | **Not Certified** | **Not Certified** | Chillers use BACnet/Modbus but are not certified as secure IACS components under 62443-4-2. |
| **Cooling Tower VFD/Controller** | BAC, EVAPCO | **Not Certified** | **Not Certified** | Fieldbus communication (BACnet MS/TP, Modbus RTU) is unauthenticated. |
| **BMS Workstation/Switch** | Johnson Controls, Siemens | **Partial (Software Only)** | **Partial** | BMS software may have secure development process (62443-4-1) but deployed workstations/switches lack 62443-4-2 endpoint certification. |

---

### Table 3: Non-IEC Standards Applicability

| Asset/Subsystem | ASHRAE | NFPA | IEEE | EN 50600 / ISO 30134 | Other |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CRAH/CRAC** | TC 9.9 (Thermal Guidelines), 90.1 (Energy) | 70 (NEC), 90A | — | — | — |
| **CDU (DLC/Immersion)** | TC 9.9 **W-Class** (W17-W45) | 70, 79 (Hydronic Systems) | — | — | OCP ACS (Design standard) |
| **VFD** | — | 70 | 519 (Harmonics), 1584 (Arc Flash) | — | IEC 61800-5-1 (Safety) |
| **Chiller** | TC 9.9, 90.1 | 70 | — | — | AHRI Standard 550/590 (Performance) |
| **Cooling Tower** | CTI Standard | 70 | — | — | CTI Certification (Performance) |
| **Dielectric Fluid** | — | 30 (Flammable Liquids Code) | — | — | REACH, RoHS, EU PFAS Regulations |
| **Immersion Tank** | — | 30, 79 | — | EN 50600-4 (Sustainability) | UL 3100 (Safety) |

---

### Architectural Recommendations for Closing Gaps

1.  **Mandatory Network Segmentation:**
    *   **CDU & Immersion Controllers:** Place all CDU, TCS pump, and immersion tank controllers in a dedicated, isolated **Zone 2**. No direct path from the general OT/BMS VLAN (Z1).
    *   **Protocol-Aware Firewalls:** Deploy firewalls between Z1 (BMS) and Z2 (Cooling OT) that:
        *   **Block** all Modbus/TCP function codes `03` (Read), `06` (Write Single), `16` (Write Multiple) from Z1 to Z2.
        *   **Allow only unidirectional reads** (e.g., function code `04` or specific BACnet properties) for monitoring purposes.
        *   **Enforce deep packet inspection** on industrial protocols to prevent unauthorized command injection.

2.  **Authentication & Encryption Mandate:**
    *   Require all new procurements for **Z2 controllers** (CDU, Chiller, CRAH) to support **IEC 62443-4-2** compliant secure authentication (e.g., X.509 certs, IEC 62351-3 for TLS) and encrypted communications (TLS 1.2+) for **all** setpoint and command functions.
    *   For existing uncertified equipment, deploy **external secure gateways/proxies** in the Z2-Z1 boundary that enforce authentication and encryption before passing commands to the legacy controller.

3.  **Zero-Trust for Cooling OT:**
    *   Implement **micro-segmentation** within Zone 2. Each CDU, Chiller, or row of immersion tanks should be in its own micro-zone, communicating only with its designated zone controller or management system.
    *   Deploy **intrusion detection systems (IDS)** with protocol-specific signatures (Modbus, BACnet) on all cooling OT network segments to detect anomalous setpoint changes or command floods.

4.  **Secure the Physical-Power Interface:**
    *   Apply **NFPA 70/79** and **IEEE 1584** rigorously to VFD and pump power circuits. Ensure arc flash labeling, safe work procedures, and proper grounding to mitigate physical attack vectors that could manipulate OT control.
    *   For immersion systems, ensure **leak detection systems** are hardwired to independent shutdown relays, bypassing the potentially compromised digital controller.

5.  **Leverage Vendor Roadmaps & Certification Pressure:**
    *   Form an **industry consortium** (e.g., via OCP) to demand IEC 62443-4-2 certified cooling components from major vendors (Vertiv, Schneider, CoolIT, Motivair).
    *   Issue **RFIs/RFPs** that explicitly require 62443-4-2 certification as a "must-have" for all new Z2 cooling equipment, making it a procurement gate.

6.  **Establish Compensating Controls for Legacy:**
    *   For all uncertified cooling controllers (which is the entire current market), mandate:
        *   **Physical USB/Serial Port Lockouts** to prevent local firmware tampering.
        *   **Change Management Logs** for all setpoint changes, correlated with ticketing systems.
        *   **Periodic Configuration Backups** stored offline and validated against known-good baselines to detect unauthorized parameter changes.