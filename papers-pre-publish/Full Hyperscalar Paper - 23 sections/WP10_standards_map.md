# Standards Mapping: WP10
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:12:27.522365

# Standards Mapping: IEC 62443 Requirements for WP10 Datacenter OT Infrastructure

## Table 1: Asset → Zone → SL-T → IEC 62443-4-2 FR/SR Requirements

| Asset (Node) | IEC 62443-3-2 Zone | SL-T (Target) | IEC 62443-4-2 Foundational Requirements & Component Requirements |
| :--- | :--- | :--- | :--- |
| **N2: UPS Network Management Card (NMC)** | Zone 2 (Electrical) | 3 | **FR1:** CR 1.1, CR 1.5, CR 1.7, CR 1.11<br>**FR2:** CR 2.1, CR 2.8<br>**FR3:** CR 3.1, CR 3.4, CR 3.7<br>**FR4:** CR 4.1, CR 4.3<br>**FR5:** CR 5.1, CR 5.2<br>**FR7:** CR 7.1, CR 7.2, CR 7.3, CR 7.6, CR 7.7 |
| **N5: Chiller / Cooling Tower VFD/PLC** | Zone 1 (BMS/HVAC) | 2–3 | **FR1:** CR 1.1, CR 1.2, CR 1.7<br>**FR2:** CR 2.1, CR 2.8<br>**FR3:** CR 3.1, CR 3.4, CR 3.7<br>**FR5:** CR 5.1<br>**FR7:** CR 7.1, CR 7.2, CR 7.7 |
| **N6: CDU (Coolant Distribution Unit) PLC** | Zone 1 (BMS/HVAC) | 3 | **FR1:** CR 1.1, CR 1.2, CR 1.5, CR 1.7<br>**FR2:** CR 2.1, CR 2.8<br>**FR3:** CR 3.1, CR 3.4, CR 3.7, CR 3.14<br>**FR4:** CR 4.1<br>**FR5:** CR 5.1, CR 5.2<br>**FR7:** CR 7.1, CR 7.2, CR 7.3, CR 7.6, CR 7.7 |
| **N8: Building Management System (BMS) Head-End** | Zone 1 (BMS/HVAC) | 3 | **FR1:** CR 1.1, CR 1.2, CR 1.5, CR 1.7, CR 1.9, CR 1.11<br>**FR2:** CR 2.1, CR 2.5, CR 2.8, CR 2.12<br>**FR3:** CR 3.1, CR 3.4, CR 3.7<br>**FR4:** CR 4.1, CR 4.3<br>**FR5:** CR 5.1, CR 5.2, CR 5.4<br>**FR6:** CR 6.1, CR 6.2<br>**FR7:** CR 7.1, CR 7.2, CR 7.3, CR 7.6, CR 7.7 |
| **N10: Fire Alarm Control Panel (FACP)** | Zone 3 (Fire/Life Safety) | 3 | **FR1:** CR 1.1, CR 1.2, CR 1.7<br>**FR2:** CR 2.1, CR 2.8<br>**FR3:** CR 3.1, CR 3.4, CR 3.7<br>**FR5:** CR 5.1, CR 5.2<br>**FR7:** CR 7.1, CR 7.3, CR 7.7 |
| **N14: Baseboard Management Controller (BMC)** | Zone 0 (Enterprise IT) / Host Device | 2 | **FR1:** CR 1.1, CR 1.2, CR 1.5, CR 1.7<br>**FR2:** CR 2.1, CR 2.8<br>**FR3:** CR 3.1, CR 3.4, CR 3.7, CR 3.14<br>**FR4:** CR 4.1<br>**FR7:** CR 7.1, CR 7.3, CR 7.7 |

**Clause References:**
*   Zone & SL-T Assignment per **IEC 62443-3-2 Clause 5 (Security Levels)** and the recommended zone model in Section 2 of the standards research.
*   Component Requirements (CR) per **IEC 62443-4-2 Clauses 7–13 (FR1–FR7)**, with SL applicability as defined in the component requirement tables of Section 3 of the standards research.

---

## Table 2: Asset → Certification Status → Gap Description

| Asset | Vendor Example | ISASecure / IEC 62443 Certification Status | Gap Description (Per **IEC 62443-4-2, Clause 6**) |
| :--- | :--- | :--- | :--- |
| **UPS Network Management Card (NMC)** | Vertiv Liebert, Schneider APC | **Not Certified** | No vendor in this space holds ISASecure CSA (Component Security Assurance) certification for **IEC 62443-4-2**. Represents a critical security gap for FR1, FR3, and FR7 compliance at SL-3. |
| **Chiller / Cooling Tower VFD** | Danfoss, Nidec | **Not Certified** | Variable Frequency Drives (VFDs) lack ISASecure CSA certification. Embedded device must independently satisfy all applicable component requirements. |
| **CDU PLC** | Vertiv, Motivair | **Not Certified** | Datacenter-specific CDU controllers are not listed in ISASecure registry. Vendor development processes may have **IEC 62443-4-1** alignment but product-level assurance is unvalidated. |
| **BMS Head-End Server/Software** | Siemens (Desigo CC), Schneider (EBO) | **Vendor SDLA Only** | Vendors (Siemens, Schneider, JCI) hold ISASecure SDLA (Secure Development Lifecycle Assurance) for **IEC 62443-4-1**, but the specific deployed BMS software version is not SSA (System Security Assurance) certified per **IEC 62443-3-3**. |
| **Fire Alarm Control Panel (FACP)** | Honeywell, Siemens | **Vendor SDLA Only** | Similar to BMS: Vendor development processes certified, but the specific FACP product lacks **IEC 62443-4-2** component certification. Critical for FR3.14 (boot process integrity). |
| **Protection Relays (Substation)** | SEL, ABB, GE | **Not ISASecure Certified** | Focus is on **IEC 61850** compliance (IEC 61850-8-1, -9-2). No products hold ISASecure CSA for **IEC 62443-4-2**, creating a gap for SL-4 requirements in Zone 4. |
| **EPMS Meters** | Schneider ION, GE | **Not Certified** | Network-capable power meters are a core OT data source but lack **IEC 62443-4-2** component certification. |

**Clause References:**
*   Gap identification based on ISASecure registry analysis and **IEC 62443-4-2, Clause 6 (Classification of Components)**, which mandates component-level assurance for embedded, network, host, and software types.

---

## Table 3: Asset → Non-IEC Standards Applicability (ASHRAE, NFPA, EN 50600, IEEE)

| Asset | Applicable Standard(s) & Key Clauses | Requirement Summary |
| :--- | :--- | :--- |
| **UPS NMC** | **EN 50600-2-2 (Clause 5.3)** for power monitoring. | Must contribute to Availability Class 3/4 topology for **2N/2(N+1)** redundancy and concurrent maintainability reporting. |
| **Chiller / Cooling Tower VFD/PLC** | **ASHRAE TC 9.9 (Air/Water Classes)**.<br>**EN 50600-2-3 (Clause 5)** for Environmental Control. | Must maintain IT environment within **A2/A3** class (10–40°C) and water supply within **W32/W40** class. Control logic must adhere to **ASHRAE rate-of-change limits (≤20°C/hr)**. |
| **CDU PLC** | **ASHRAE TC 9.9 (Water Classes W17–W+)**.<br>**EN 50600-2-3**. | Primary control for **direct-to-chip liquid cooling**. Must regulate coolant temperature to within the specified water class (e.g., **W32 @ 32°C upper limit**) and flow rates. |
| **BMS Head-End** | **EN 50600-3-1 (Management & Operations)**.<br>**ASHRAE TC 9.9 (Recommended Envelope)**. | Central management platform for environmental control. Must integrate monitoring per EN 50600 KPIs (PUE, WUE) and enforce **ASHRAE 18–27°C recommended envelope**. |
| **FACP** | **NFPA 75 (Ch. 7, 8)**.<br>**NFPA 855 (Ch. 9)** if integrated with BESS. | Must implement **VESDA aspirating detection** and provide **clean agent suppression**. Emergency Power-Off (**EPO**) function, if implemented, must comply with NFPA 75 Chapter 8. |
| **BMC (in Server)** | **ASHRAE TC 9.9** for environmental sensing. | Provides out-of-band management and thermal data. Must integrate with BMS for thermal event reporting and be isolated per **EN 50600-2-5 (Protection Class)**. |
| **Substation Protection Relays** | **IEC 61850 (Parts 5, 7, 8)**.<br>**IEEE C37 series**. | Must use **GOOSE (< 4ms)** for peer-to-peer tripping and **MMS** for reporting. Communications must reside on **PRP/HSR** networks as per **IEC 62443-3-2, Zone 4 conduit requirements**. |

**Clause References:**
*   ASHRAE TC 9.9 thermal classes are prescriptive for **IT equipment environment**.
*   NFPA 75/855 clauses are prescriptive for **fire suppression and battery safety**.
*   EN 50600 series clauses define **infrastructure availability and protection classes**.

---

## Architectural Recommendations for Closing Gaps

1.  **Mandate Compensating Controls for Non-Certified Assets:**
    *   For assets with ISASecure gaps (NMC, VFD, CDU, EPMS), implement **network segmentation** via industrial firewalls (e.g., **Moxa EDR-G9010**, which is ISASecure CSA certified) at zone conduits. This enforces **IEC 62443-4-2, FR5 (Restricted Data Flow)** through external architecture.
    *   Deploy **OT-specific anomaly detection** (e.g., Dragos, Claroty) to satisfy **FR6 (Timely Response to Events)** where component-level logging is insufficient.

2.  **Enforce Protocol Security at Zone Boundaries:**
    *   Conduit **C0-1 (Enterprise → BMS)** must employ **BACnet/SC (Secure Connect)** or an **industrial DMZ with deep packet inspection** to meet **IEC 62443-3-2, Clause 5.4** and protect against protocol-based attacks on BMS controllers.
    *   Conduit **C2-4 (Electrical → Substation)** must use **IEC 62443-compliant encryption** for **IEC 61850 MMS** sessions to satisfy **FR4.3** at SL-4, and rely on **GOOSE** (Layer 2) for critical protection functions.

3.  **Integrate Lifecycle Security into Procurement:**
    *   Require vendors to provide **IEC 62443-4-2 SA (Secure Architecture)** documentation as part of RFQ responses, even if product is not ISASecure certified. This shifts assurance burden to the vendor and aligns with **IEC 62443-2-1 (Security Management System)** requirements for asset owners.

4.  **Prioritize Firmware Integrity for High-Criticality Nodes:**
    *   For **N2 (UPS NMC)**, **N6 (CDU PLC)**, and **N10 (FACP)**, implement **secure boot and measured boot** processes to satisfy **CR 3.14 (Integrity of Boot Process)**. Where native capability is absent, deploy **network-based attestation** or **hardware security modules (HSM)** for key storage.