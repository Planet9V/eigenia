---
aliases:
  - Nashville Cyber Threats
  - Nashville ATT&CK Profile
  - Nashville Remote Access Risks
type: facility-reference-model
category: surface-treatment
status: draft
domain: OT
tags:
  - domain/OT
  - facility/acme-nashville-surface-treatment
  - phase/1c
  - threat/apt
  - threat/ransomware
related:
  - "[[ACME Nashville Surface Treatment]]"
  - "[[Nashville HAZOPS]]"
  - "[[Nashville CVE Cross-Reference]]"
  - "[[Nashville Narrative]]"
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME Nashville is fictional. Threat vectors and architectural patterns are based on real ICS ransomware campaigns and industrial supply-chain vulnerabilities as of 2024–2025.

---

## Top 5 Threat Actors & Motivation

### 1. [[BlackCat]]/ALPHV (Cybercriminals - Industrial Ransomware)
- **Motive**: Operational disruption + double-extortion (recipes, customer data)
- **Typical Path**: Exploit unpatched [[Fortinet]] FortiGate → IT/OT boundary crossing via shared AD → MES historian encryption
- **ACME Relevance**: Surface treatment chemistry (automotive specs, aerospace formulas) worth $50K–$500K extortion per recipe
- **TTPs**: T1190 (FortiGate RCE), T1078 (stolen IT AD creds), T1486 (ransomware payload)

### 2. [[LockBit]] (Cybercriminals - Industrial Ransomware)
- **Motive**: Widespread manufacturing disruption; high victim density in automotive/aerospace
- **Typical Path**: Phishing → [[VPN]] appliance → lateral movement to industrial historian → [[DLP]] exfiltration
- **ACME Relevance**: Operator downtime costs $10K/hour; customer SLAs at risk
- **TTPs**: T1566 (phishing), T1550 (pass-the-hash via historian), T1567 (exfil via web shell)

### 3. [[Volt Typhoon]] (China-nexus APT - Pre-positioning, OT-adjacent IT)
- **Motive**: Long-term access for espionage; disruptive capability pre-positioned
- **Typical Path**: Compromise IT management network → VLAN hopping → [[Siemens]] Industrial Edge credentials → operator workstations
- **ACME Relevance**: Aerospace customer contracts + technology transfer risk; months of dwell time undetected
- **TTPs**: T1199 (trusted Siemens support relationship), T0815 (wireless pivot to OT), T0830 ([[AitM]] on rectifier [[Modbus]])

### 4. [[APT41]] (China dual-purpose - IP theft, cyber-espionage)
- **Motive**: Intellectual property theft (chemistry, process automation logic)
- **Typical Path**: Supply-chain compromise of PLC firmware → [[Dynapower]] diagnostics tool backdoor → data exfil to C2
- **ACME Relevance**: Surface treatment chemistry is 30-year competitive moat; one theft = competitive parity for state-sponsored competitor
- **TTPs**: T1195 (supply-chain compromise on PLC vendor), T1567 (recipe exfil), T0809 (modify PLC programs to establish persistence)

### 5. [[APT33]]/Elfin (Iran-nexus APT - Manufacturing focus)
- **Motive**: Disruptive capability; strategic targeting of U.S. industrial base
- **Typical Path**: Spear-phishing engineering team with macro → FactoryTalk Cloud reverse-shell → historian data destruction
- **ACME Relevance**: Aerospace customer relationships; U.S.–Iran sanctions evasion angle
- **TTPs**: T1566 (spear-phish engineering), T0832 (manipulation of MES view), T0809 (wipe historian logs)

---

## TTPs of Concern (Kill-Chain Mapping)

### Phase 1: Initial Access
**T1190 - Exploit Public-Facing Application**
- **Target**: [[Fortinet]] FortiGate 7.0.x (CVSS 9.6 RCE via SSL [[VPN]])
- **Evidence**: Port 443 open, FortiGate firmware 7.0.8 (EOL, no patch path to 7.2)
- **Consequence**: Unauthenticated RCE as "fortisys" service account

**T1199 - Trusted Relationship**
- **Target**: [[Siemens]] Industrial Edge cloud portal (FactoryTalk integrations)
- **Evidence**: Vendor remote diagnostics laptop (stale creds, stored in Putty history)
- **Consequence**: Lateral movement to engineering workstation VLAN, historian access

**T1566 - Phishing**
- **Target**: Production supervisor (operator@acme-nashville.local)
- **Evidence**: Gmail-lookalike phishing for "Payroll Portal Update"
- **Consequence**: Initial IT AD compromise; pass-the-hash to network

### Phase 2: Persistence & Privilege Escalation
**T1098 - Account Manipulation**
- **Target**: Shared "production" AD account (5+ engineers, shared password)
- **Evidence**: CyberArk PAM logs show frequent checkouts; password last rotated 18 months ago
- **Consequence**: Lateral movement persistence; [[MFA]] bypass

**T1078 - Valid Accounts**
- **Target**: Service account "FactoryTalk_Cloud_Sync" (plaintext creds in FactoryTalk Cloud config)
- **Evidence**: Shared service account across 3 historians; Kerberos unconstrained delegation enabled
- **Consequence**: S4U2Self + S4U2Proxy to compromise historian, MES, PLC configuration servers

### Phase 3: Defense Evasion & Exfiltration
**T0830 — Adversary in the Middle (AitM)**
- **Target**: Rectifier [[VFD]] [[Modbus TCP]] (unencrypted, no auth)
- **Evidence**: Rectifier on flat OT network, no network segmentation, Modbus broadcast traffic visible
- **Consequence**: Intercept setpoint commands; inject malicious power curve adjustments (→ equipment damage)

**T0855 — Unauthorized Command Message**
- **Target**: [[EtherNet/IP]] scanner port 2222 ([[Allen-Bradley]] CompactLogix [[PLC]])
- **Evidence**: PLC firmware 30.x (2015); no input validation on MOV/JSR opcodes
- **Consequence**: Inject firmware patch commands; establish persistence via hidden rungs

**T1567 — Exfiltration Over Web Service**
- **Target**: Aveva PI Server 2018 (SQL database export via historian [[DMZ]] rule)
- **Evidence**: Historian on DMZ with outbound HTTPS rule (no [[DLP]]); SQL credentials in Aveva PI integration config
- **Consequence**: 30 years of surface treatment chemistry recipes + aerospace customer formulas → public paste site

### Phase 4: Impact
**T1486 — Data Encrypted for Impact (Ransomware)**
- **Target**: MES database + historian + PLC configuration backups
- **Evidence**: Ransomware pre-staged on jump server; backup path \\BACKUP01\Historian_Daily not excluded from encryption scope
- **Consequence**: 72-hour operational shutdown; $720K daily loss (10K/hour × 72 hours)

**T0832 — Manipulation of View (HMI Spoofing)**
- **Target**: WinCC Unified V19 (Windows 10 IoT Enterprise 21H2), FactoryTalk View SE
- **Attack**: Inject false sensor readings (e.g., "Tank pH 7.0" while acid tank is 12.5)
- **Impact**: Operators proceed with electroplating unaware of parameter drift; equipment corrosion/damage unnoticed for 2–4 hours

---

## Remote Access Architecture & Bypass Paths

### Legitimate Access Paths

1. **FactoryTalk Cloud (Aveva)**
   - Entry: portal.avevac.com → VPN tunnel to FactoryTalk Cloud Gateway (on-prem)
   - Auth: SAML via Entra ID (no [[MFA]] on Entra conditional access for OT)
   - **Bypass**: Extract service account creds → impersonate FactoryTalk_Cloud_Sync role → historian access

2. **Dynapower Remote Diagnostics**
   - Entry: Web browser → dynapower.com customer portal
   - Session: RDP tunnel to Dynapower support VM (on customer network)
   - **Bypass**: [[MitM]] certificate; redirect RDP traffic to attacker C2

3. **CyberArk PAM (Privileged Access Management)**
   - Entry: Centralized vault for shared accounts (production, historian_admin, FactoryTalk_Cloud_Sync)
   - Session Duration: 4-hour check-out window; MFA via Duo Mobile on registered iPhone
   - **Bypass**: Steal iPhone (vendor laptop left in lobby) → approve Duo push remotely → check out credentials → immediate RDP to jump server

### Architectural Weaknesses

- **IT/OT Crossover via Shared AD**: Engineering workstations (IT domain) and operator PCs (OT domain) in same forest; no [[VLAN]] separation
- **Unencrypted Protocols on OT Network**: [[Modbus TCP]] (rectifier, soft starter) — no encryption, no authentication; [[EtherNet/IP]] (PLC) — no encryption; PLC firmware 30.x (2015) lacks input validation
- **Backup Encryption Misalignment**: Daily historian backups stored on \\BACKUP01 (IT domain) without exclusion from ransomware encryption
- **MFA Registration Bottleneck**: Duo MFA registered to single shared iPhone; loss/compromise = wholesale account compromise
- **Vendor Laptop Persistence**: Dynapower technician laptop stored on-site with active RDP credentials; no periodic credential rotation

---

## Critical Fix Priorities (90-Day Plan)

| Priority | Finding | Remediation | Impact |
|----------|---------|-------------|--------|
| **1-CRITICAL** | [[Fortinet]] FortiGate 7.0.8 RCE vulnerability | Upgrade to 7.2.5 LTS; disable SSL [[VPN]] if unused | Eliminates primary initial access vector |
| **1-CRITICAL** | Shared "production" AD account | Rotate to unique per-user; enable Duo [[MFA]] | Prevents lateral movement via pass-the-hash |
| **2-HIGH** | FactoryTalk plaintext service creds | Migrate to managed identity in Entra; rotate quarterly | Eliminates historian privilege escalation |
| **2-HIGH** | [[Modbus]]/[[EtherNet/IP]] unencrypted | Deploy ICS-aware firewall rules; isolate OT VLAN | Blocks [[AitM]] + command injection on rectifier/PLC |
| **3-MEDIUM** | Backup encryption misalignment | Exclude \\BACKUP01 from ransomware scope; air-gap daily | Preserves recovery path in ransomware event |

---

## Cross-references

- [[ACME Ottawa Data Center]]
- [[ACME Ottawa Substation]]
- [[ACME Ottawa Civic Hospital]]
- [[ACME Ottawa Pediatric Medical Center]]

## See also

- [[Nashville Architecture]] — zone layout for threat isolation
- [[Nashville HAZOPS]] — cyber-physical risk integration
- [[Nashville CVE Cross-Reference]] — equipment vulnerability detail
- [[Nashville Narrative]] — board-level threat summary
- [[MITRE ATT&CK ICS]] — ICS-specific technique reference
