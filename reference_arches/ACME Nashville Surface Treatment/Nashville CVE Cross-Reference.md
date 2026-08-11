---
aliases:
  - Nashville CVE Mapping
  - Nashville Vulnerability Cross-Reference
type: facility-reference-model
category: surface-treatment
status: draft
domain: OT
tags:
  - domain/OT
  - facility/acme-nashville-surface-treatment
  - phase/1c
  - cve/mapping
  - threat/attack-ics
related:
  - "[[ACME Nashville Surface Treatment]]"
  - "[[Nashville Equipment]]"
  - "[[Nashville Threat Profile]]"
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: This [[CVE]] cross-reference synthesizes real firmware/OS strings from equipment inventory and [[ATT&CK ICS|MITRE ATT&CK ICS]] techniques. Compiled 2026-05-09.

---

## Equipment → CVE Mapping Table

| Vendor | Model | Firmware/OS | Likely CVEs | Severity |
|--------|-------|------------|-----------|----------|
| [[Munk Elektronik]] | SWR12/500-200 | 4.2.1 | None mapped (isolated, no IP) | Low |
| [[Plating Electronics]] | PowerPlate PE-1000 | 2.8.4 | CVE-2021-3XXXX ([[Modbus]] injection) | Medium |
| [[Dynapower]] | DXR-750-400 | 3.1.9 | CVE-2020-5XXXX (firmware parsing RCE) | High |
| Hach Lange | EXOmini | 2.4.6 | CVE-2022-2XXXX ([[Modbus TCP]] auth bypass) | Medium |
| Rosemount | 3051S+ | 7.2 (HART) | CVE-2019-9XXXX (HART protocol injection) | Low |
| [[Endress+Hauser]] | Promag 10D | 5.0.2 | CVE-2023-1XXXX (PROFINET firmware upload) | High |
| Markland Agitators | MA-500T | 1.8.7 | None mapped (hardwired, no IP) | Low |
| Nederman | ES-2000 | 3.2.1 | CVE-2020-7XXXX ([[Modbus]] RTU replay attack) | Medium |
| ebm-papst | 8600 NRG | 1.4.0 | None mapped (PWM hardwired) | Low |
| **[[Allen-Bradley]]** | **ControlLogix 1756-L83E** | **33.011** | **CVE-2023-4XXXX ([[EtherNet/IP]] MOV/JSR opcode injection)** | **Critical** |
| [[Siemens]] | S7-1500F | 2.9.4 | CVE-2022-3XXXX (S7 protocol [[MITM]] on PROFINET IRT) | High |
| [[Omron]] | NX1P2-2110DX1 | 1.4.2 | CVE-2021-8XXXX ([[OPC-UA]] cert validation bypass) | Medium |
| [[Allen-Bradley]] | GuardLogix 1756-L8xS | 32.001 | CVE-2023-5XXXX (safety frame spoofing) | Critical |
| [[Siemens]] | F-CPU 1512SP | 1.8.9 | CVE-2022-4XXXX (TIA Portal remote config wipe) | Critical |
| **Rockwell** | **FactoryTalk View SE** | **13.00 CU03 / Windows IoT 2019** | **CVE-2023-6XXXX (ActiveX deserialize RCE)** | **Critical** |
| Wonderware | InTouch 2020 R2 | 8.1.5203 | CVE-2022-6XXXX (DCOM activation escalation) | High |
| [[Siemens]] | WinCC Unified V19 | 19.0.20230615 | CVE-2023-7XXXX (service account privilege escalation) | High |
| Aveva | PI Server 2018 | SP3 / Windows Server 2016 | CVE-2022-8XXXX ([[SQL Injection]] in AF SDK) | High |
| Ignition | Gateway 8.1.28 | Linux CentOS 7 | CVE-2021-9XXXX (Java deserialization RCE) | High |
| **[[Cisco]]** | **Catalyst IE 3000-8U** | **IOS 15.2(6)E** | **CVE-2023-2XXXX ([[VLAN]] hopping via crafted frames)** | **High** |
| [[Cisco]] | Catalyst IE 4000-4GE | IOS 15.2(7)E | CVE-2023-2XXXX (same as above) | High |
| [[Hirschmann]] | MS20-0800 | v4.3.41 | CVE-2020-2XXXX (Magnum-II ring bypass) | Medium |
| Stratix 5700 | Managed Ethernet | 21.08.00 | CVE-2021-7XXXX ([[EtherNet/IP]] gateway stack overflow) | High |
| **[[Fortinet]]** | **FortiGate 600D** | **v7.2.5** | **CVE-2024-1XXXX (SSL [[VPN]] RCE)** | **Critical** |
| [[Cisco]] | Catalyst 6500E (ACE) | IOS XE 16.12.04 | CVE-2022-9XXXX (ACE module auth bypass) | High |
| [[Tofino]] | 5000 | 7.1.9 | CVE-2023-0XXXX (OT firewall rule injection) | Medium |
| [[Cisco]] | WAP581 | 802.11ac Wave 2 | CVE-2022-1XXXX ([[WPA3]] KRACK variant) | Medium |
| Dell | Optiplex 7090 | Windows 10 Pro 22H2 | CVE-2024-0XXXX (Windows SMB Eternal Blue variant) | High |
| HP | EliteDesk 800 G6 | Windows 11 Pro 23H2 | CVE-2023-3XXXX (Windows privilege escalation) | High |
| Ubuntu | Ubuntu Server 20.04 | Linux 5.15 LTS | CVE-2023-4XXXX (Linux kernel eBPF JIT) | Medium |
| CentOS | 7.9 | Linux 3.10 (EOL) | CVE-2023-5XXXX (kernel stack buffer overflow) | High |

---

## ATT&CK Technique → Exposed Equipment Mapping

### **T1190 — Exploit Public-Facing Application**
- **Primary Target**: [[Fortinet]] FortiGate 600D (v7.2.5 SSL [[VPN]] RCE, CVE-2024-1XXXX)
- **Secondary**: [[Cisco]] WAP581 ([[WPA3]] KRACK, CVE-2022-1XXXX)
- **Impact**: Unauthenticated RCE as service account; access to OT/IT boundary network
- **Equipment Affected**: HMI workstations, PI Server, MES historian

### **T1199 — Trusted Relationship**
- **Primary Target**: [[Siemens]] TIA Portal (vendor remote diagnostics), FactoryTalk Cloud (Aveva portal)
- **Secondary**: [[Dynapower]] remote service tunnel (self-signed certs)
- **Impact**: Lateral movement from engineering [[VLAN]] to [[PLC]] development network

### **T0830 — Adversary in the Middle (AitM)**
- **Target**: Rectifier [[Modbus TCP]] (unencrypted), [[EtherNet/IP]] [[PLC]] scanner (port 2222)
- **Equipment**: [[Munk]] SWR12, [[Dynapower]] DXR-750, [[Allen-Bradley]] ControlLogix (1756-L83E)
- **Impact**: Intercept setpoint commands; inject malicious power/flow curves; undetected equipment damage

### **T0855 — Unauthorized Command Message**
- **Target**: [[EtherNet/IP]] scanner ([[Allen-Bradley]] ControlLogix 1756-L83E firmware 33.011)
- **Vulnerability**: No input validation on MOV/JSR opcodes (PLC firmware 2015 vintage)
- **Impact**: Inject firmware patch; establish hidden rungs; persistence across power cycles

### **T1567 — Exfiltration Over Web Service**
- **Target**: Aveva PI Server 2018 ([[SQL]] database export via historian [[DMZ]] rule)
- **Data**: 30-year surface treatment recipes, aerospace customer formulas, 50K+ historian tags
- **Impact**: Competitive IP theft worth $10M+

### **T1486 — Data Encrypted for Impact (Ransomware)**
- **Stage 1**: Ransomware pre-staged on jump server (shares credentials with historians)
- **Stage 2**: Encrypt \\BACKUP01 (NOT excluded from encryption), MES DB, [[PLC]] config backups
- **Impact**: 72-hour operational shutdown; $720K daily loss

### **T0832 — Manipulation of View (HMI Spoofing)**
- **Target**: WinCC Unified V19 (Windows 10 IoT Enterprise 21H2), FactoryTalk View SE
- **Attack**: Inject false sensor readings (e.g., "Tank pH 7.0" while acid tank is 12.5)
- **Impact**: Operators proceed unaware of parameter drift; equipment damage unnoticed for 2–4 hours

---

## Critical Vulnerability Concentrations

**Tier-1 Risk (Immediate Action Required)**:
- [[Fortinet]] FortiGate 600D (CVE-2024-1XXXX) — CVSS 9.6 RCE
- [[Allen-Bradley]] ControlLogix 1756-L83E (CVE-2023-4XXXX) — Critical [[EtherNet/IP]] injection
- Rockwell FactoryTalk View SE (CVE-2023-6XXXX) — Critical ActiveX RCE

**Tier-2 Risk (High Priority)**:
- [[Siemens]] S7-1500F (CVE-2022-3XXXX) — PROFINET [[MITM]]
- Wonderware InTouch 2020 R2 (CVE-2022-6XXXX) — DCOM escalation
- Ignition Gateway 8.1.28 (CVE-2021-9XXXX) — Java deserialization

---

## Cross-references

- [[ACME Ottawa Data Center]]
- [[ACME Ottawa Substation]]
- [[ACME Ottawa Civic Hospital]]
- [[ACME Ottawa Pediatric Medical Center]]

## See also

- [[Nashville Equipment]] — device inventory
- [[Nashville Threat Profile]] — [[ATT&CK ICS|MITRE ATT&CK]] mapping
- [[Nashville Architecture]] — zone layout for vulnerability context
