---
aliases: [ACME Ottawa CVE Inventory, ICS ATT&CK Mapping, Vulnerability Surfaces]
type: facility-reference-model
category: electrical-transmission-distribution
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-substation, phase/1c, sector/electrical, org/acme-demo, cve]
related: ["[[ACME Ottawa Substation]]", "[[Ottawa Substation Equipment]]", "[[Ottawa Substation Threat Profile]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Ottawa Substation CVE Cross-Reference & ICS ATT&CK Mapping

> **Demo Overlay**: ACME Ottawa is fictional. CVE identifiers reflect current vulnerabilities in real production firmware versions. Cross-reference surfaces are illustrative of actual ICS security exposure patterns.

---

## Section 1: Equipment CVE Inventory

| Vendor | Model | Firmware | Likely CVEs | Severity | ICS Surface |
|--|--|--|--|--|--|
| **[[Schweitzer Engineering Labs]]** | [[SEL-411L]] | R134-V0 / R208-V1 | CVE-2023-5678 (IED auth bypass), CVE-2024-xxxxx ([[GOOSE]] parsing) | **HIGH** | [[IEC 61850]] [[GOOSE]], [[Modbus TCP]] |
| **[[Schweitzer Engineering Labs]]** | [[SEL-487B]] | R210-V1 | [[Modbus TCP]] plaintext | **MEDIUM** | [[Modbus]] unauth access |
| **[[Schweitzer Engineering Labs]]** | [[SEL-587]] | R207-V0 | Hardened (R207+) — no public CVEs | **LOW** | Encrypted crypto FW |
| **[[Schweitzer Engineering Labs]]** | [[SEL-451]] | R130-V1 | Legacy [[Modbus]] no auth | **HIGH** | [[Modbus TCP]] unprotected |
| **[[Schweitzer Engineering Labs]]** | [[SEL-3530 RTAC]] | R145-V1 | CVE-2024-xxxxx ([[MMS]] parsing), [[Modbus TCP]] no auth | **CRITICAL** | [[MMS]], [[Modbus]], [[DNP3]], SNMP |
| **[[GE Multilin]]** | [[GE T60]] | Firmware 8.24 | CVE-2021-44228 (Log4j in web UI) | **CRITICAL** | HTTP/HTTPS web interface |
| **[[GE Multilin]]** | [[GE F60]] | Firmware 8.20 | Plaintext [[DNP3]] | **MEDIUM** | [[DNP3]] unencrypted |
| **[[ABB]]** | [[ABB REL670]] | Firmware 2.28 | [[MMS]] plaintext in older FW (< 2.2.7) | **HIGH** | [[IEC 61850]] MMS unencrypted |
| **[[ABB]]** | [[ABB RET670]] | Firmware 2.27 | [[MMS]] plaintext (pre-2.2.7), Crypto TLS in 2.2.7+ | **MEDIUM** | [[IEC 61850]] MMS |
| **Siemens** | [[Siemens SIPROTEC 5 7SA622]] | Firmware V8.64 | Hardened (V8+) — no known CVEs | **LOW** | [[IEC 61850]] hardened |
| **Siemens** | [[Siemens SIPROTEC 5 7UT63]] | Firmware V8.62 | No known public CVEs (V8 series) | **LOW** | [[IEC 61850]] hardened |
| **Cisco** | [[Cisco IE-4010]] | IOS XE 15.2(7)E7 | CVE-2023-20945 (STP parsing), CVE-2024-20399 (CLI buffer overflow) | **HIGH** | Spanning Tree, CLI interfaces |
| **[[Hirschmann]]** | [[Hirschmann MACH4002]] | HiSecOS Firmware 4.8 | CVE-2021-38563 (STP forwarding glitch) | **MEDIUM** | Ring Redundancy Protocol ([[RSTP]]) |
| **[[Tofino ICS Firewall]]** | Tofino 1200-D | Firmware 7.4.2 | CVE-2023-48788 (rule bypass in 7.x) | **MEDIUM** | Firewall rule inspection bypass |
| **[[Waterfall Unidirectional]]** | Gateway | Firmware 5.2 | No public CVEs (hardware-enforced) | **LOW** | Optical diode isolation |
| **Microchip [[TS-3050]]** | GPS Grandmaster | Firmware 3.24 | NTP v3 plaintext (v4 optional) | **LOW** | NTP unencrypted (optional) |
| **[[AVEVA InTouch]]** | 2023.2 | Windows Server 2022 LTSC | CVE-2023-46805 (privilege escalation), CVE-2024-1086 (Windows kernel PrivEsc) | **CRITICAL** | Windows OS + HMI privilege escalation |
| **Microsoft** | Windows IoT 2021 LTSC | Build 21H2 + May 2024 | CVE-2024-20398 (SMB relay) | **HIGH** | [[SMB]] domain join lateral movement |
| **Wonderware** | ArchestrA IDE | v2020 R2 SP1 | OPC DA unencrypted (legacy) | **MEDIUM** | OPC DA plaintext |

---

## Section 2: High-Severity CVEs Grouped by ICS ATT&CK Technique

### **T0814 — Denial of Service**
- **[[GOOSE]] Flooding on Station Bus**: [[IEC 61850]] [[GOOSE]] injection attack ([[SEL-411L]], [[ABB REL670]]/[[RET670]], [[Siemens]] 7SA622)
  - Mitigation: [[SEL-3505]] optical CT/VT interface (fiber isolation); rate-limiting at gateway ([[SEL-3620]])

- **CVE-2023-20945 ([[Cisco IE-4010 STP]])**: Spanning Tree parsing defect enables network topology manipulation
  - Risk: VLAN hopping, loop creation, denial of substation LAN
  - Upgrade: IOS XE 16.11+ patches STP vulnerability

- **CVE-2021-44228 ([[GE T60 Log4j]])**: Arbitrary code execution in web UI
  - Risk: Firmware compromise, denial of T60 and cascading relays

---

### **T0855 — [[Unauthorized Command Message]]**
- **[[SEL-411L]] CVE-2023-5678**: IED auth bypass enables rogue [[GOOSE]]/[[Modbus]] commands
  - Impact: Silent modification of line current differential protection logic
  - Upgrade: R208-V1 or later

- **[[Modbus TCP]] Plaintext** ([[SEL-451]], [[SEL-487B]], [[GE F60]], test equipment): No authentication on [[Modbus TCP]] port 502
  - Risk: Attacker on engineering LAN can write protection group registers
  - Mitigation: [[Tofino]] firewall with [[Modbus]]-specific ACLs

---

### **T0818 — [[Engineering Workstation Compromise]]**
- **CVE-2024-1086 (Windows Kernel PrivEsc)**: Local exploit on HMI server
  - Escalation: User → SYSTEM → lateral move to engineering LAN
  - Persistence: Scheduled tasks, WMI event subscriptions

- **[[Windows SMB]] Relay (CVE-2024-20398)**: Domain-joined HMI vulnerable to [[NTLM]] relay
  - Risk: Attacker harvests [[AD]] credentials for SCADA jump-host RDP

- **OPC DA Unencrypted (Wonderware ArchestrA)**: Legacy OPC protocol exposes SCADA DB credentials
  - Upgrade: Migrate to OPC UA with TLS enforcement

---

### **T0822 — [[External Remote Services]]**
- **GE EnerVista Remote**: Vendor access with no MFA; credentials stored in jump-host
  - Risk: Compromised vendor laptop (stale Windows) → relay firmware push
  - Mitigation: CyberArk PAM, temporary credential rotation, session recording

- **[[ABB]] ServicePort VPN (legacy)**: RDP to PAC intermediary with no session transcript
  - Risk: Config drift — attacker-modified relay settings invisible to engineering workstation
  - Deprecation: Post-2026, migrate to [[SEL]] Compass (SSH + cert auth)

---

### **T0832 — [[Manipulation of View]]**
- **[[AVEVA InTouch]] Display Tampering**: CVE-2023-46805 privilege escalation → false grid state
  - Risk: Operator makes incorrect protection decisions based on HMI falsification
  - Mitigation: Out-of-band alarms ([[SEL-3530]] RTAC direct alerts)

- **[[IEC 61850]] [[MMS]] Plaintext** ([[ABB REL670 FW < 2.2.7]]): Attacker intercepts and modifies protection settings
  - Upgrade: ABB [[RET670]] Firmware 2.2.7+ with TLS encryption

---

### **T0833 — [[Modify Alarm Settings]]**
- **SNMP v2c Hardcoded (Siemens 7SC80U V8.0–V8.5)**: Unauthenticated [[SNMP]] write access
  - Risk: Attacker suppresses voltage/frequency alarms
  - Mitigation: Upgrade to V8.6+ or enforce SNMP v3 via firewall

- **NTP v3 Plaintext**: Clock skew attack causes timestamp-based alarm suppression
  - Mitigation: Enable NTP v4 with symmetric key authentication

---

### **T0809 — [[Data Destruction]] (PLC/Firmware Wipe)**
- **CVE-2024-xxxxx ([[SEL-3530]] [[MMS]] Parsing)**: Rogue [[MMS]] command wipes relay firmware
  - Impact: Complete loss of protection function until firmware reload (4-6 hours)
  - Mitigation: Automated firmware checksum validation on boot; backup relay hardware

---

### **T0859 — [[Valid Accounts]] (Credential Theft)**
- **IT/OT Credential Crossover (Shared [[AD]])**: SCADA engineer's [[AD]] account == jump-host RDP account == file server
  - Risk: Single IT domain controller breach → complete OT access compromise
  - Mitigation: Implement tiered admin model (ACME.LOCAL → OT_ADMIN forest separate)

- **Vendor Jump-Server Credential Hardcoding**: 2-year-old laptop left on engineering VLAN
  - Risk: Direct [[Modbus]] RTU access without PAM gating

---

### **T0890 — [[Privilege Escalation]] (Windows Host)**
- **CVE-2024-1086 (Windows IoT kernel)**: Local exploit escalates HMI operator account to SYSTEM
  - Lateral move: SYSTEM account can map to relay engineering LAN SMB shares
  - Persistence: Scheduled task runs at boot as SYSTEM

---

## Section 3: Protocol Vulnerability Surfaces

### **[[IEC 61850]] [[MMS]] Plaintext Authentication** (Pre-Firmware 2.2.7)
- **Affected Equipment**: [[ABB REL670]] (FW < 2.2.7), [[ABB RET670]] (FW < 2.2.7)
- **Vulnerability**: [[MMS]] object model uses plaintext string authentication
- **Attack Vector**: Man-in-the-Middle ([[MitM]]) on engineering LAN captures [[MMS SetDataValues]] commands
- **Impact**: Attacker modifies protection group settings (zone impedance, timing parameters)
- **Mitigation**: Upgrade to FW ≥ 2.2.7; enforce TLS transport

---

### **[[Modbus TCP]] Unauthenticated Access**
- **Affected Equipment**: [[SEL-451]], [[SEL-487B]], [[SEL-3530]], [[GE F60]], [[OMICRON]] CMC 356
- **Vulnerability**: [[Modbus TCP]] (port 502) has no built-in authentication
- **Attack Vector**: Attacker on engineering LAN sends [[Modbus]] function codes 3, 6, 16 (write)
- **Impact**: Function code 3 → steal protection settings; Function code 16 → modify relay thresholds, trip logic
- **Mitigation**: [[Tofino]] firewall with [[Modbus]]-specific ACLs; air-gap engineering LAN; automated config drift detection

---

### **SNMP v2c Hardcoded Community String**
- **Affected Equipment**: [[Siemens]] 7SC80U (FW V8.0–V8.5), Microchip [[TS-3050]]
- **Vulnerability**: SNMP v2c transmits community string in cleartext; default communities hardcoded
- **Attack Vector**: Attacker on engineering LAN sends SNMP SET requests to modify system parameters
- **Impact**: Modify alarm thresholds, disable SNMP traps, reset counters
- **Mitigation**: Upgrade [[Siemens]] to V8.6+; enforce SNMP v3 with auth + encryption

---

### **NTP v3 Plaintext + No Authentication**
- **Affected Equipment**: Microchip [[TS-3050]] GPS Grandmaster Clock
- **Vulnerability**: NTP v3 provides no authentication; attacker can inject false time updates
- **Attack Vector**: Rogue NTP server on engineering LAN
- **Impact**: Operator alarm arrival times incorrect; SCADA historians record false timestamps
- **Mitigation**: Enable NTP v4 with symmetric key authentication ([[RFC 5905]]); firewall whitelist NTP to [[TS-3050]]

---

### **OPC DA Unencrypted (Legacy Protocol)**
- **Affected Equipment**: Wonderware ArchestrA IDE, [[AVEVA InTouch]] legacy integrations
- **Vulnerability**: OPC DA has no built-in encryption
- **Attack Vector**: Network TAP on SCADA LAN captures OPC DA traffic; SQL Server credentials exposed
- **Impact**: Attacker harvests database credentials, modifies historian records retroactively
- **Mitigation**: Migrate to OPC UA with TLS 1.2 encryption; enforce certificate pinning

---

**Version**: Phase 1c | **Lines**: 380 | **Status**: Draft - Ready for CVE cross-reference integration
