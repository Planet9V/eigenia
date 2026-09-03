# Standards Mapping: WP05
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:12:49.128410

## Standards Mapping: IEC 62443 Requirements for WP05 Hyperscale Datacentre Infrastructure

### Table 1: Asset/Subsystem → IEC 62443-3-2 Zone/SL-T → IEC 62443-4-2 FR/SR Requirements

| Asset / Subsystem | IEC 62443-3-2 Zone | Target Security Level (SL-T) | Applicable IEC 62443-4-2 Component Requirements (FR/SR) |
| :--- | :--- | :--- | :--- |
| **UPS Modules** (N+1, 2N+1 redundancy) | Zone 2 (Electrical) | SL-3 | **FR 1:** CR 1.1, CR 1.5, CR 1.7, CR 1.11 (Human IAC)<br>**FR 2:** CR 2.1, CR 2.5, CR 2.8 (Use Control)<br>**FR 3:** CR 3.1, CR 3.4, CR 3.7 (System Integrity)<br>**FR 5:** CR 5.1, CR 5.2 (Restricted Data Flow)<br>**FR 7:** CR 7.1, CR 7.2, CR 7.3, CR 7.6, CR 7.7 (Resource Availability) |
| **UPS Network Management Card (NMC)** | Zone 2 (Electrical) | SL-3 | **FR 1:** CR 1.1, CR 1.5, CR 1.7, CR 1.11<br>**FR 2:** CR 2.1, CR 2.5, CR 2.8<br>**FR 3:** CR 3.1, CR 3.4, CR 3.7<br>**FR 4:** CR 4.1, CR 4.3<br>**FR 5:** CR 5.1, CR 5.2<br>**FR 6:** CR 6.1, CR 6.2<br>**FR 7:** CR 7.1, CR 7.2, CR 7.3, CR 7.6, CR 7.7 |
| **EPMS Meters** (Power monitoring) | Zone 2 (Electrical) | SL-3 | **FR 1:** CR 1.1, CR 1.2, CR 1.5, CR 1.7<br>**FR 2:** CR 2.1, CR 2.5, CR 2.8, CR 2.12<br>**FR 3:** CR 3.1, CR 3.4<br>**FR 4:** CR 4.1, CR 4.3<br>**FR 5:** CR 5.1, CR 5.2, CR 5.4<br>**FR 6:** CR 6.1, CR 6.2<br>**FR 7:** CR 7.1, CR 7.3, CR 7.6 |
| **CDU/Coolant Distribution PLCs** | Zone 1 (BMS/HVAC) | SL-3 | **FR 1:** CR 1.1, CR 1.2, CR 1.5, CR 1.7, CR 1.11<br>**FR 2:** CR 2.1, CR 2.5, CR 2.8<br>**FR 3:** CR 3.1, CR 3.4, CR 3.7<br>**FR 5:** CR 5.1, CR 5.2<br>**FR 6:** CR 6.1, CR 6.2<br>**FR 7:** CR 7.1, CR 7.2, CR 7.3 |
| **BMS Controllers** (HVAC control) | Zone 1 (BMS/HVAC) | SL-2 (field devices) / SL-3 (head-end) | **FR 1:** CR 1.1, CR 1.2, CR 1.5, CR 1.7, CR 1.11<br>**FR 2:** CR 2.1, CR 2.5, CR 2.8<br>**FR 3:** CR 3.1, CR 3.4, CR 3.7<br>**FR 5:** CR 5.1, CR 5.2<br>**FR 6:** CR 6.1, CR 6.2<br>**FR 7:** CR 7.1, CR 7.2, CR 7.3, CR 7.6 |
| **Chillers / VFDs** | Zone 1 (BMS/HVAC) | SL-2 | **FR 1:** CR 1.1, CR 1.2, CR 1.5, CR 1.7<br>**FR 2:** CR 2.1, CR 2.8<br>**FR 3:** CR 3.1, CR 3.4, CR 3.7<br>**FR 5:** CR 5.1, CR 5.2<br>**FR 7:** CR 7.1, CR 7.2, CR 7.7 |
| **Fire Alarm Control Panel (FACP)** | Zone 3 (Fire/Life Safety) | SL-3 | **FR 1:** CR 1.1, CR 1.5, CR 1.7, CR 1.11<br>**FR 2:** CR 2.1, CR 2.8<br>**FR 3:** CR 3.1, CR 3.4, CR 3.11, CR 3.14<br>**FR 4:** CR 4.1<br>**FR 5:** CR 5.1, CR 5.2<br>**FR 6:** CR 6.1, CR 6.2<br>**FR 7:** CR 7.1, CR 7.3, CR 7.6 |
| **VESDA / Aspirating Smoke Detection** | Zone 3 (Fire/Life Safety) | SL-3 | **FR 1:** CR 1.1, CR 1.2, CR 1.7<br>**FR 3:** CR 3.1, CR 3.4, CR 3.7<br>**FR 5:** CR 5.1, CR 5.2<br>**FR 7:** CR 7.1, CR 7.3 |
| **Access Control System (Badge Readers)** | Zone 5 (Physical Security) | SL-3 | **FR 1:** CR 1.1, CR 1.5, CR 1.7, CR 1.11<br>**FR 2:** CR 2.1, CR 2.5, CR 2.8<br>**FR 3:** CR 3.1, CR 3.4, CR 3.7<br>**FR 4:** CR 4.1, CR 4.3<br>**FR 5:** CR 5.1, CR 5.2<br>**FR 6:** CR 6.1, CR 6.2<br>**FR 7:** CR 7.1, CR 7.3 |
| **CCTV Cameras / VMS** | Zone 5 (Physical Security) | SL-2 (non-critical) / SL-3 (critical perimeter) | **FR 1:** CR 1.1, CR 1.7<br>**FR 3:** CR 3.1, CR 3.4, CR 3.7<br>**FR 4:** CR 4.1, CR 4.3<br>**FR 5:** CR 5.1, CR 5.2<br>**FR 7:** CR 7.1, CR 7.7 |
| **Protection Relays** (Grid interconnect) | Zone 4 (Substation) | SL-4 | **FR 1:** CR 1.1, CR 1.2, CR 1.5, CR 1.7, CR 1.9, CR 1.11<br>**FR 2:** CR 2.1, CR 2.5, CR 2.8, CR 2.12<br>**FR 3:** CR 3.1, CR 3.4, CR 3.7, CR 3.11, CR 3.14<br>**FR 4:** CR 4.1, CR 4.3<br>**FR 5:** CR 5.1, CR 5.2, CR 5.4<br>**FR 6:** CR 6.1, CR 6.2<br>**FR 7:** CR 7.1, CR 7.2, CR 7.3, CR 7.6 |
| **Industrial Managed Switches** (OT backbone) | Network backbone between zones | SL-3 (minimum) | **FR 1:** CR 1.1, CR 1.5, CR 1.7, CR 1.11<br>**FR 2:** CR 2.1, CR 2.5, CR 2.8<br>**FR 3:** CR 3.1, CR 3.4, CR 3.7<br>**FR 5:** CR 5.1, CR 5.2<br>**FR 6:** CR 6.1<br>**FR 7:** CR 7.1, CR 7.2, CR 7.6, CR 7.7 |
| **Industrial Firewalls / UTM** (Zone boundaries) | Conduit enforcement | SL-3 (minimum, SL-4 for Zone 4 boundary) | **FR 1:** CR 1.1, CR 1.5, CR 1.7, CR 1.11<br>**FR 2:** CR 2.1, CR 2.5, CR 2.8<br>**FR 3:** CR 3.1, CR 3.4, CR 3.7<br>**FR 4:** CR 4.1, CR 4.3<br>**FR 5:** CR 5.1, CR 5.2, CR 5.4<br>**FR 6:** CR 6.1, CR 6.2<br>**FR 7:** CR 7.1, CR 7.2, CR 7.6, CR 7.7 |

---

### Table 2: Asset/Subsystem → ISASecure Certification Status → Gap Analysis

| Asset / Subsystem | ISASecure Certification Status | Gap Description (for SL-3/SL-4 compliance) |
| :--- | :--- | :--- |
| **UPS Modules** | **Not Certified** (Vendor SDLA only) | **Critical Gap:** No component-level (CSA) certification per IEC 62443-4-2. Firmware integrity (CR 3.4) and authentication (CR 1.5) are unverified. Common-cause failure vulnerability per Chapter 2.2. |
| **UPS Network Management Card (NMC)** | **Not Certified** | **Critical Gap:** The single point of logical failure. Lacks certified IAC (CR 1.1, CR 1.5), system integrity (CR 3.4), and resource availability (CR 7.1). Default credentials prevalent. |
| **EPMS Meters** | **Not Certified** | **Gap:** Lacks certified non-repudiation (CR 2.12) and confidentiality (CR 4.3) for command actions, required for SL-3. Audit logging (CR 6.1) may be insufficient. |
| **CDU/Coolant Distribution PLCs** | **Not Certified** | **Gap:** No certified boot process integrity (CR 3.14) or input validation (CR 3.7), both required for SL-3. Thermal control loop vulnerable to DoS (CR 7.1). |
| **BMS Controllers** (Head-end) | Vendor SDLA only; **No Product-Level CSA** | **Gap:** Lacks certified zone boundary protection (CR 5.2) and application partitioning (CR 5.4) for SCADA server isolation. |
| **Chillers / VFDs** | **Not Certified** | **Gap:** No certified resource management (CR 7.2) or least functionality (CR 7.7). Control loops vulnerable to manipulation. |
| **Fire Alarm Control Panel (FACP)** | Vendor SDLA only; **No Product-Level CSA** | **Gap:** Lacks certified physical tamper resistance (CR 3.11) and boot integrity (CR 3.14). Safety function integrity unverified. |
| **VESDA / Aspirating Smoke Detection** | **Not Certified** | **Gap:** Lacks certified communication integrity (CR 3.1) for network-connected units. False data injection could trigger suppression or mask fire. |
| **Access Control System** | **Not Certified** | **Gap:** Lacks certified cryptographic use (CR 4.3) for credential transmission and session lock (CR 2.5). Critical for MFA implementation. |
| **CCTV Cameras / VMS** | **Not Certified** | **Gap:** Lacks certified cryptography (CR 4.3) and confidentiality (CR 4.1). Video streams could be intercepted or manipulated. |
| **Protection Relays** | **Not ISASecure Certified** (IEC 61850 focused) | **Critical Gap:** Requires SL-4. Lacks certified public key authentication (CR 1.9), non-repudiation (CR 2.12), and physical tamper resistance (CR 3.11). |
| **Industrial Managed Switches** | **Moxa:** Certified (CSA)<br>**Others (Cisco IE, Hirschmann):** **Not Certified** | **Gap (non-Moxa):** Lacks certified audit logging (CR 6.1), network segmentation (CR 5.1), and DoS protection (CR 7.1). |
| **Industrial Firewalls / UTM** | **Moxa:** Certified (CSA - EDR-G9010)<br>**Others:** **Not Certified** | **Gap (non-Moxa):** Lacks certified zone boundary protection (CR 5.2) and application partitioning (CR 5.4). Stateful inspection integrity unverified. |

---

### Table 3: Asset/Subsystem → Non-IEC Standards Applicability

| Asset / Subsystem | Applicable Standard | Clause / Requirement | Implication |
| :--- | :--- | :--- | :--- |
| **UPS / BESS** | NFPA 855 (2026), UL 9540A | NFPA 855 Ch. 4 (HMA), Ch. 9 (Detection/Suppression), Ch. 10 (Ventilation) | Mandatory Hazard Mitigation Analysis; gas detection for Li-ion; ventilation for thermal runaway gases (HF, CO). |
| **UPS / BESS** | EN 50600-2-2 | Availability Class 3–4 | Redundancy (N+1/2N) and concurrent maintenance requirements for power paths. |
| **CDU / Cooling** | ASHRAE TC 9.9 | Water Classes W32-W45, Recommended Envelope (18–27°C, ≤60% RH) | CDU PLC setpoints must regulate coolant supply to specified class; sensor accuracy critical. |
| **BMS / HVAC** | ASHRAE TC 9.9 | Rate of Change (≤20°C/hr) | BMS thermal ramp control required during redundancy failover to prevent condensation or thermal shock. |
| **Fire Protection (VESDA, FACP)** | NFPA 75 (Ch. 7), NFPA 76 | NFPA 75 Ch. 7 (VESDA required for early warning); NFPA 76 Ch. 9 (Off-Gas Detection) | High-sensitivity smoke detection mandatory; gas detection required for Li-ion battery areas. |
| **Fire Suppression** | NFPA 75 (Ch. 7), NFPA 855 (Ch. 9) | Clean agent (FM-200, Novec) or pre-action sprinkler; higher densities for Li-ion per UL 9540A | Suppression system design must comply with both standards; validation via UL 9540A Installation Level test. |
| **Electrical (UPS, Switchgear)** | EN 50600-2-2, TIA-942-C | EN 50600 Class 4 = 2N + 2N paths; TIA-942-C Section 6 (VESDA, pre-action) | Defines redundancy and fire protection requirements for power infrastructure. |
| **Substation / Protection Relays** | IEC 61850 | IEC 61850 GOOSE (<4ms fault reaction), MMS, PRP/HSR redundancy | Defines communication protocol and latency requirements for grid interconnect. |
| **Physical Security (Access, CCTV)** | EN 50600-2-5 | Protection Classes PC 3–4 (Multi-factor auth, tamper detection, cabinet locks) | Physical security measures must align with cyber zone model; IP devices require IEC 62443-4-2. |
| **All OT Components** | ASHRAE TC 9.9 (A1-A4) | Air temperature/humidity allowable envelope | BMS and CDU must maintain environmental conditions per IT equipment class; affects sensor placement and alarm thresholds. |
| **BESS / Battery Management** | NFPA 855 (Ch. 11), NFPA 76 (2024) | Explosion control for enclosed spaces; Li-ion gas detection | Mandatory explosion mitigation; off-gas detection (H₂, CO, HF) required. |
| **Data Center Fabric (Pod/Cell)** | TIA-942-C, EN 50600-2-4 | Cabling infrastructure (backbone, horizontal) | Redundant cabling paths for Availability Class 3–4; structural specifications (floor loading, raised floor depth). |

---

### Architectural Recommendations for Closing Gaps

1. **Enforce Zone-Compliant Procurement:**
   - Mandate IEC 62443-4-2 (CSA) certification for all new procurement in **SL-T 3** and **SL-T 4** zones. For legacy assets, require a third-party security assessment against IEC 62443-4-2 CRs as a prerequisite for connection.
   - Specifically require CSA certification for **UPS NMCs**, **EPMS meters**, and **Protection Relays**. The absence of certified products from major vendors (Schneider, Vertiv, Eaton, SEL) is a critical industry gap requiring vendor engagement.

2. **Logical Redundancy for Mechanical Systems:**
   - Implement **firmware diversity** or **hypervisor-based logical separation** for redundant UPS/Cooling blocks to mitigate common-cause failure. Per IEC 62443-3-2 ZCR 3, place redundant management interfaces on physically separate network segments (VLANs) with distinct conduit rules.
   - Apply **IEC 62443-3-2 Clause 5.4** conduit requirements to separate command and telemetry paths for critical systems (e.g., UPS control via dedicated firewall, monitoring via data diode).

3. **Compensate with Network Architecture:**
   - For uncertified components, enforce **microsegmentation** using industrial switches (Moxa CSA-certified) and firewalls to achieve CR 5.1/5.2 at the network level.
   - Deploy a **dedicated OT SIEM** for continuous monitoring (CR 6.2) of all Zone 2, 3, and 4 assets, with alerting to a 24/7 SOC.

4. **Lifecycle Security Enforcement:**
   - Contractually require vendors to maintain **IEC 62443-4-1 (SDLA) ML3** maturity for firmware updates. For assets without CSA certification, require secure update mechanisms with **CR 3.4** (software integrity) and **CR 3.14** (boot integrity) validation.
   - Integrate **ASHRAE TC 9.9** environmental constraints into BMS/CDU PLC setpoint and alarm logic to prevent security-induced thermal events.

5. **Fire & Life Safety Integration:**
   - Ensure FACP and VESDA systems comply with **NFPA 75 Ch. 7** and **NFPA 76 (2024)** for detection, and their control interfaces to BMS (Conduit C1-3) are hardened per **IEC 62443-4-2 FR 3/FR 7** to prevent false suppression or masking.
   - For Li-ion BESS, enforce **NFPA 855 (2026) Ch. 11** explosion control and gas detection, with safety-critical interlocks hardwired as per IEC 62443 zone model (Zone 6 → Zone 3 conduit).