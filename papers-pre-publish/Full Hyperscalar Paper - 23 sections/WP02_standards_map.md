# Standards Mapping: WP02
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:06:29.459288

### Table 1: Asset → Zone → SL-T → IEC 62443-4-2 FR/SR Requirements
| Asset/Subsystem | Zone Placement (IEC 62443-3-2) | SL-T (Target Security Level) | Applicable IEC 62443-4-2 Requirements (FR/SR) |
|-----------------|--------------------------------|------------------------------|------------------------------------------------|
| **CDU PLC (Coolant Distribution Unit)** | Zone 2 (High-Impact Control) | SL-3 | FR1.12 (Authentication), FR3.1 (System Integrity - Firmware), FR5.1 (Restricted Data Flow - VFD Commands), SR 2.4 (Software Integrity Verification), SR 3.5 (Cryptographic Measures for Modbus) |
| **CDU VFD (Variable Frequency Drive)** | Zone 2 (High-Impact Control) | SL-3 | FR1.12 (Authentication - Remote Speed Writes), FR3.1 (Integrity - Firmware Signing), FR5.1 (Restricted Data Flow - Modbus Commands), SR 2.4 (Software Integrity), SR 3.5 (Cryptographic Measures) |
| **UPS Network Management Card (NMC)** | Zone 3 (Medium-Impact Control) | SL-3 | FR1.7 (Role-Based Access Control), FR3.1 (Firmware Integrity), FR5.1 (Restricted Data Flow - SNMP/Modbus), SR 1.12 (Authentication - Avoid Default Creds), SR 3.5 (TLS for Web Interface) |
| **UPS Controller** | Zone 3 (Medium-Impact Control) | SL-3 | FR1.12 (Authentication), FR3.1 (Firmware Integrity), FR4.1 (Resource Availability - Redundancy), SR 1.13 (Password Complexity) |
| **BMS Supervisory Network (e.g., JACE/ADS)** | Zone 2 (High-Impact Control) | SL-4 | FR1.7 (Role-Based Access Control), FR1.12 (Authentication), FR2.1 (Use of Security Functions), FR3.1 (Firmware Integrity), FR5.1 (Restricted Data Flow), SR 2.4 (Secure Boot), SR 3.5 (Encryption for BACnet/IP), SR 6.1 (Audit Log Integrity) |
| **BMS-to-Fire Suppression Interface** | Zone 1 (Highest-Impact Safety) | SL-4 | FR1.7 (Restrict Logical Access), FR2.1 (Control of Security Functions), FR3.1 (Integrity - Command Validation), FR6.1 (Timely Response - Hardware Interlock), SR 6.4 (Tamper-Evident Logging) |
| **Water Treatment System Controller** | Zone 4 (Low-Impact Control) | SL-2 | FR1.12 (Authentication), FR5.1 (Restricted Data Flow - Separate from BMS), SR 1.14 (Unique User IDs) |
| **DCIM Platform (e.g., Schneider EcoStruxure IT DCE)** | Zone 2 (High-Impact Control) | SL-3 | FR1.7 (Role-Based Access), FR3.1 (Software Integrity), FR4.1 (Redundancy), FR5.1 (Restricted Data Flow), SR 3.5 (TLS for API), SR 6.1 (Audit Trail) |
| **OT Network Switches (e.g., Moxa EDR-810)** | Zone 2 (High-Impact Control) | SL-3 | FR1.12 (Authentication - No Hardcoded Creds), FR3.1 (Firmware Integrity), FR5.1 (Port-Based Access Control), SR 1.12 (Remove Default Accounts), SR 3.5 (Secure Config Protocols) |

---

### Table 2: Asset → Certification Status → Gap Description
| Asset/Subsystem | ISASecure Certification Status | Gap Analysis (Relative to SL-3/SL-4) |
|-----------------|--------------------------------|--------------------------------------|
| **CDU PLC (Generic)** | Not Certified | Lacks SR 2.4 (Secure Boot); vendor does not sign firmware images. Cannot meet SL-3 FR3.1 (System Integrity). |
| **ABB AC500 V3 (CDU VFD)** | Gap | Firmware < 3.9.0 vulnerable to CVE-2025-2595 (Valid Accounts). Fails FR1.12 (Authentication) and SR 1.12 (Remove Default Accounts). |
| **Schneider APC UPS NMC2** | Not Certified (End-of-Life) | TLStorm vulnerabilities (CVE-2022-22805/22806) unpatched in field units. Fails FR3.1 (Firmware Integrity) and SR 3.5 (TLS). |
| **Honeywell Niagara JACE** | Not Certified | 13 vulnerabilities (CVE-2025-3936 et al.) include CVSS 9.8 flaws. Fails FR1.12 (Authentication), FR3.1 (Firmware Integrity), SR 3.5 (Network Encryption). |
| **Johnson Controls Metasys ADS** | Not Certified | CVE-2025-26385 (CVSS 10.0) enables SQL injection. Fails FR2.1 (Security Function Control), FR3.1 (System Integrity), SR 2.4 (Secure Input Validation). |
| **Moxa EDR-810 Switch** | Gap | CVE-2024-9138 (Hardcoded Credentials). Fails FR1.12 (Authentication) and SR 1.12 (Default Account Removal). |
| **Genetec Security Center** | Not Certified | CVE-2025-43027 (Improper Access Control). Fails FR1.7 (Role-Based Access) and SR 1.15 (Least Privilege). |
| **Vertiv IntelliSlot UPS Card** | Not Certified | CVE-2025-46412 (Auth Bypass). Fails FR1.12 (Authentication) and FR3.1 (System Integrity). |
| **Schneider EcoStruxure IT DCE ≤ 8.3** | Not Certified | 5 critical CVEs (CVE-2025-50121 et al.). Fails FR3.1 (System Integrity), FR5.1 (Restricted Data Flow), SR 3.5 (Encryption). |

---

### Table 3: Asset → Non-IEC Standards Applicability
| Asset/Subsystem | Applicable Non-IEC Standards | Specific Requirements |
|-----------------|------------------------------|------------------------|
| **CDU Cooling Loop** | ASHRAE TC 9.9, EN 50600-4-2 | ASHRAE TC 9.9: Water quality (Class A2) for coolant purity; EN 50600-4-2: Energy efficiency metrics for CDU operation. |
| **UPS Power Train** | IEEE 1709, NFPA 110 | IEEE 1709: 480V DC distribution requirements for hyperscale; NFPA 110: Level 1 standby power system reliability. |
| **BMS Supervisory Network** | NFPA 75, ASHRAE Guideline 36 | NFPA 75: Hardwired fire suppression interlocks (Section 5.4); ASHRAE Guideline 36: BMS fault tolerance for critical systems. |
| **Fire Suppression Interface** | NFPA 2001, EN 1047-2 | NFPA 2001: Clean agent system command integrity; EN 1047-2: Data center fire protection with fail-safe interlocks. |
| **Electrical Distribution (ATS/PDU)** | NFPA 70 (NEC), IEEE 1547 | NFPA 70: Emergency power supply wiring (Article 700); IEEE 1547: Grid interconnection of UPS systems. |
| **OT Network Infrastructure** | IEC 62351-6, NIST SP 800-82 | IEC 62351-6: Security for power system communication; NIST SP 800-82: OT network segmentation for Modbus. |
| **Environmental Control** | EN 50600-2-4, ASHRAE TC 9.9 | EN 50600-2-4: Cooling system reliability class; ASHRAE TC 9.9: Thermal guidelines for chip temp limits. |

---

### Architectural Recommendations for Closing Gaps

1. **Zone Isolation for High-Impact Nodes**  
   - Implement IEC 62443-3-2 Zone 2 boundaries with data diodes between CDU/UPS controllers and BMS (SR 5.1, FR5.1).  
   - Segment BMS fire suppression interface into Zone 1 with hardware interlocks (SR 6.4).

2. **Firmware Integrity Enforcement**  
   - Mandate SR 2.4 (Secure Boot) on CDU/UPS controllers via hardware TPM modules.  
   - Vendor-agnostic firmware signing infrastructure for PLCs and VFDs (FR3.1).

3. **Authentication Hardening**  
   - Enforce FR1.12/SL-4 with FIDO2 tokens for BMS administrative access.  
   - Deploy RADIUS/TACACS+ for OT switch authentication (eliminate hardcoded credentials per SR 1.12).

4. **Cryptographic Protocol Migration**  
   - Replace Modbus/TCP with IEC 62351-6 secured Modbus over TLS 1.3 (SR 3.5).  
   - Upgrade BACnet MSTP to BACnet/SC (Secure Connect) for BMS communications.

5. **Safety-Critical Physical Interlocks**  
   - Hardwire fire suppression release circuits independent of BMS (NFPA 75 Section 5.4.3).  
   - Install VFD hardware jumpers disabling remote direction changes (FR2.1).

6. **Vendor Certification Requirements**  
   - Require ISASecure ISA/IEC 62443 SL-3 certification for new CDU/UPS procurements.  
   - Audit existing BMS components against IEC 62443-4-2 SL-4 FRs (e.g., Johnson Controls Metasys patching per ICSA-26-027-04).

7. **Unified OT Network Monitoring**  
   - Deploy OT-aware IDS (e.g., Claroty, Dragos) with SR 6.1 audit trail forwarding to SIEM.  
   - Segment SCADA/DCIM traffic per IEC 62351-6 requirements.