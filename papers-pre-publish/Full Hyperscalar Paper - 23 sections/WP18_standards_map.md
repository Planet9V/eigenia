# Standards Mapping: WP18
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:28:00.351535

### Comprehensive Standards Mapping for WP18 Hyperscale Datacenter OT Infrastructure

---

#### **Table 1: IEC 62443 Zone Placement, SL-T, and Component Requirements (FR/SR)**  
| Asset Type               | IEC 62443-3-2 Zone | SL-T | IEC 62443-4-2 FR/SR Requirements                     |
|--------------------------|--------------------|------|------------------------------------------------------|
| **BMS Controllers**      | Zone 1 (BMS/HVAC)  | SL 2–3 | FR1: CR 1.1, CR 1.2, CR 1.5, CR 1.7, CR 1.11<br>FR2: CR 2.1, CR 2.5, CR 2.8<br>FR3: CR 3.1, CR 3.4, CR 3.7<br>FR5: CR 5.1<br>FR6: CR 6.1<br>FR7: CR 7.1, CR 7.3, CR 7.6, CR 7.7 |
| **CDU/PLC**              | Zone 1 (BMS/HVAC)  | SL 3   | FR1: CR 1.1, CR 1.2<br>FR2: CR 2.1, CR 2.8<br>FR3: CR 3.1, CR 3.4<br>FR5: CR 5.1<br>FR6: CR 6.1<br>FR7: CR 7.1, CR 7.2, CR 7.3 |
| **UPS Network Mgmt Card**| Zone 2 (Electrical)| SL 3   | FR1: CR 1.1, CR 1.5, CR 1.7, CR 1.11<br>FR2: CR 2.1, CR 2.8<br>FR3: CR 3.1, CR 3.4<br>FR5: CR 5.1<br>FR6: CR 6.1<br>FR7: CR 7.1, CR 7.3, CR 7.6, CR 7.7 |
| **EPMS Meters**          | Zone 2 (Electrical)| SL 3   | FR1: CR 1.1<br>FR2: CR 2.1, CR 2.8<br>FR3: CR 3.1, CR 3.7<br>FR4: CR 4.1<br>FR5: CR 5.1<br>FR6: CR 6.1<br>FR7: CR 7.1 |
| **Protection Relays (IEC 61850)** | Zone 4 (Substation) | SL 3–4 | FR1: CR 1.1, CR 1.9<br>FR2: CR 2.1, CR 2.12<br>FR3: CR 3.1, CR 3.11, CR 3.14<br>FR4: CR 4.3<br>FR5: CR 5.1, CR 5.2<br>FR6: CR 6.1, CR 6.2<br>FR7: CR 7.1 |
| **Fire Alarm Control Panel (FACP)** | Zone 3 (Fire/Life Safety) | SL 3 | FR1: CR 1.1, CR 1.2<br>FR2: CR 2.1, CR 2.8<br>FR3: CR 3.1, CR 3.4<br>FR7: CR 7.1, CR 7.3 |
| **Access Control/Badge Readers** | Zone 5 (Physical Security) | SL 2–3 | FR1: CR 1.1, CR 1.7<br>FR2: CR 2.1, CR 2.8<br>FR3: CR 3.1<br>FR5: CR 5.1<br>FR7: CR 7.1 |
| **BESS Inverter/PCS**    | Zone 6 (BESS)      | SL 3   | FR1: CR 1.1<br>FR2: CR 2.1, CR 2.8<br>FR3: CR 3.1, CR 3.4<br>FR5: CR 5.1<br>FR6: CR 6.1<br>FR7: CR 7.1, CR 7.2 |
| **Industrial Switches (OT Backbone)** | Zone 1/2/3/4 (Conduits) | SL 2–3 | FR3: CR 3.1<br>FR5: CR 5.1, CR 5.2<br>FR7: CR 7.1, CR 7.6 |
| **Industrial Firewalls (Zone Boundaries)** | Conduit C0-1/C0-2/C1-3 | SL 3–4 | FR3: CR 3.1<br>FR5: CR 5.1, CR 5.2<br>FR6: CR 6.1<br>FR7: CR 7.1, CR 7.6 |

---

#### **Table 2: ISASecure Certification Status and Gap Analysis**  
| Asset Type               | Certification Status          | Gap Description                                                                 |
|--------------------------|-------------------------------|---------------------------------------------------------------------------------|
| **Moxa EDR-G9010 (Router/Firewall)** | ISASecure CSA Certified | *No gap* – Meets IEC 62443-4-2 for network segmentation.                      |
| **Moxa TN-4900 (Switch)** | ISASecure CSA Certified | *No gap* – Validated for OT backbone.                                           |
| **Honeywell ControlEdge PLC** | ISASecure CSA Certified | *No gap* – Validated for BMS/embedded control.                                 |
| **Schneider Electric Triconex SIS** | ISASecure SSA Certified | *No gap* – Safety-critical systems meet SL 3–4.                                |
| **UPS Network Mgmt Card (Vertiv/Schneider)** | **NOT Certified** | Gap: Lacks IEC 62443-4-2 CR1.1 (auth), CR3.4 (firmware integrity). Default passwords exposed. |
| **CDU PLCs (Vertiv/Motivair)** | **NOT Certified** | Gap: No ISASecure validation for coolant control logic; vulnerable to SL-3 threats. |
| **EPMS Meters (Schneider ION)** | **NOT Certified** | Gap: Absence of CR1.7 (strong auth) and CR4.3 (encryption) for telemetry.      |
| **Protection Relays (SEL/ABB)** | **NOT Certified** | Gap: IEC 61850 GOOSE lacks encryption; no CR3.14 (secure boot) validation.     |
| **FACP Interfaces (Honeywell)** | Vendor SDLA Only | Gap: No product-level CSA; firmware integrity (CR3.4) unverified.              |
| **VFDs (Chiller/Pumps)** | **NOT Certified** | Gap: No ISASecure for motor control; FR2/FR7 requirements unmet.               |
| **BESS Battery Mgmt System** | **NOT Certified** | Gap: Lacks CR7.1 (DoS protection) and CR3.4 (integrity) for thermal runaway prevention. |

---

#### **Table 3: Non-IEC Standards Applicability**  
| Asset Type               | Applicable Standards           | Key Requirements                                                                 |
|--------------------------|--------------------------------|---------------------------------------------------------------------------------|
| **Cooling System (Chillers/CRAHs/CDUs)** | ASHRAE TC 9.9: A2/W32 class<br>EN 50600-2-3: Availability Class 3–4 | Maintain inlet air 10–35°C, ≤80% RH. Water supply ≤32°C. Redundant cooling paths (N+1). |
| **Power Distribution (UPS/PDU/STS)** | EN 50600-2-2: Availability Class 3–4<br>NFPA 75: Ch. 10 | 2N redundancy for UPS/generators. Battery rooms per NFPA 855 (Li-ion gas venting). |
| **Fire Suppression System** | NFPA 75: Ch. 7, 9<br>NFPA 76: Gas detection | VESDA for early smoke detection. BMS-HVAC interlock ≤5s latency. Li-ion: Off-gas sensors (H₂/CO). |
| **Substation Protection (Relays/IEDs)** | IEC 61850: GOOSE <4ms<br>EN 50600-2-2 | Dedicated fiber; PRP/HSR redundancy. No IP routing to Zone 0.                   |
| **Physical Security (CCTV/Access Control)** | EN 50600-2-5: Protection Class 3–4 | Multi-factor auth, tamper detection, cabinet-level locks. Integrated with IEC 62443 zones. |
| **BESS** | NFPA 855: Ch. 4, 9, 10<br>UL 9540A | Hazard Mitigation Analysis (HMA). Gas detection + enhanced ventilation. Sprinkler density per chemistry. |

---

### **Architectural Recommendations for Gap Closure**  
1. **Mandate ISASecure/IEC 62443-4-2 Certification in Procurement**:  
   - Require CSA/SSA certification for all new OT assets (e.g., UPS NMCs, CDU PLCs). Reference IEC 62443-4-2 SL-3 CRs in SecRACS (Section 18.2).  
   - **Compensating Controls**: For uncertified legacy assets (e.g., EPMS meters), implement:  
     - Network segmentation (IEC 62443-4-2 CR 5.1) via industrial firewalls (Moxa EDR-G9010).  
     - Protocol encryption (SNMPv3, TLS) to satisfy CR 4.3.  

2. **Hardened Conduit Specifications**:  
   - **Conduit C0-1 (IT↔BMS)**: Unidirectional gateway + DPI firewall. Enforce BACnet/MODBUS allowlisting (CR 5.2).  
   - **Conduit C2-4 (Electrical↔Substation)**: IEC 61850 GOOSE on isolated fiber. No IP routing; use PRP/HSR redundancy (EN 50600-2-2 Class 4).  

3. **Safety-Critical Asset Protections**:  
   - **Protection Relays**: Implement IEC 62443-4-2 CR 3.14 (secure boot) via hardware root of trust. Validate settings against IEC 61850-7-2.  
   - **FACP/BESS**: Hardwired safety interlocks per NFPA 75/855. Dual-path control (network + physical) for suppression release.  

4. **Thermal/Power Resilience**:  
   - **Cooling**: CDU PLCs must comply with ASHRAE TC 9.9 W32 (≤32°C supply). BMS alarms at A2 class boundaries (35°C).  
   - **Power**: UPS NMCs isolated in Zone 2. Enforce EN 50600-2-2 Class 4 (2N paths) with EPMS monitoring per IEC 62443-4-2 FR 6.  

5. **Third-Party Verification**:  
   - Deploy independent assessor per SFAIR Stage R (ZCR-7) to validate SL-T compliance. Reference IEC 62443-3-3 SR 3.5 (conduit testing).  

> **Key Gap**: Datacenter-specific OT vendors (Vertiv, Schneider APC) lag in ISASecure certification. Mitigate via contractual SecRACS requirements (Clause 18.2) and compensating controls in IEC 62443-4-2 FR 5/FR 7.