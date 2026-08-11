---
aliases: [Threat Profile, Threat Landscape, Threat Actors]
type: facility-reference-model
category: acute-care-hospital
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-civic-hospital, phase/1c, sector/healthcare, threat/ransomware, threat/apt]
related: ["[[ACME Ottawa Civic Hospital]]", "[[BlackCat]]", "[[LockBit]]", "[[MITRE ATT&CK]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Civic Hospital Threat Profile

## Top 6 Threat Groups Targeting Healthcare

### 1. [[BlackCat]] (ALPHV) — RaaS Kingpin

**Modus Operandi**: Encrypted ransomware on clinical file shares; [[ESXi]] + [[Veeam]] destruction  
**Healthcare Victims**: Change Healthcare ($22M ransom, Feb 2024 — >100M records); Lurie Children's Hospital; Lehigh Valley Health  
**Indicators**: T1486 (ransomware), T1485 (data destruction), T1199 (trusted [[Epic]] remote services)  
**Status**: Initially dormant post-Change (March 2024) after affiliate dispute, but ALPHV malware remains active Q1 2025

### 2. [[LockBit]] — High-Volume Operator

**Modus Operandi**: Aggressive affiliate-driven ransomware; double-extortion (encrypt + exfil)  
**Canadian Targets**: [[SickKids Hospital]] (Dec 2022, "Code Grey"); Southwestern Ontario hospitals (Oct 2024 via TransForm MSP — 5 hospitals, 5.6M patient visits, 1400+ employee SINs)  
**Indicators**: T1199 (MSP/trusted third-party compromise), T1567 (cloud exfil), T1486 (encryption)  
**FBI Status**: One of most destructive globally; server seizure (Feb 2024) followed by rapid redeployment

### 3. [[Royal Ransomware]] — Healthcare-Focused

**Modus Operandi**: Targets healthcare delivery networks; payment systems disruption  
**Indicators**: T1486 (encryption), T1195 (supply chain compromise)

### 4. [[Cl0p]] / Clop — Zero-Day Exploiter

**Modus Operandi**: MOVEit file-transfer exploitation (T1190); mass exfiltration to encrypted cloud  
**Regional Impact**: 2023–2024 wave hit Eastern Ontario hospitals and dozens of other sectors  
**Indicators**: T1190 (web app exploit), T1567 (cloud exfil)

### 5. [[Conti]] Successors — Playbook Reuse

**Modus Operandi**: Business process mining + lateral movement playbooks (leaked after Conti shutdown 2022)  
**Indicators**: T1583 (domain registration), T1589 (credential harvesting), T1078 ([[AD]] compromise)

### 6. [[NoName057]] / [[KillNet]] — DDoS Hacktivists

**Modus Operandi**: Russia-aligned, anti-NATO; hospital DDoS during geopolitical escalation  
**Indicators**: T1499 (endpoint DoS), T1561 (infrastructure DoS)

## Kill-Chain Mapping to ACME Assets

### T1199: Trusted Relationship Exploitation

**[[Epic Hyperspace]] VPN**:
- Port: 443 (HTTPS) → [[Citrix]] gateway or direct tunnel
- Compromise: Compromised [[Citrix]] session → RDP into [[Epic]] terminal server → [[AD]] lateral movement → clinical file share access

**[[Philips Healthcare]] Remote Services (PRS)**:
- Compromise: Compromised vendor laptop → device firmware access → clinical network pivoting

**[[GE Healthcare]] InSite** (Radiology PACS, CT/MRI):
- Compromise: Exposed web credentials → [[DICOM]] image exfiltration

**[[Siemens Healthcare]] Smart Remote** (Lab analyzers):
- Compromise: Unpatched device OS → RCE → MITM on clinical data flows

### T1078: Credential Compromise (Primary Attack Surface)

- **Stolen Credentials**: Phishing campaigns targeting hospital domain (@ottawahospital.local)
- **RDP into EHR**: Attacker gains clinician [[AD]] account → RDPs into [[Epic]] terminal server → Lateral move to clinical file share
- **Biomed Device Access**: Biomed technician laptop (often unmanaged, [[Wi-Fi]]-connected) → Shared local admin creds → Pivot to device network

**Mitigation**: [[MFA]] on all remote access ([[Epic]] VPN, RDP, Philips PRS), [[CyberArk]] PAM for shared device credentials, [[Entra ID]] Conditional Access

### T1486 + T1485: Ransomware & Data Destruction

**[[VMware ESXi]]**:
- Attack Path: Compromised [[ESXi]] credentials → SSH into [[ESXi]] → vm-support mode → Disable Lockdown Mode → Deploy ransomware agent
- Variant: [[CVE-2024-37085]] ([[ESXi]] RCE) or [[Veeam]] [[CVE-2024-40711]] (backup isolation bypass)
- Impact: ALL clinical VMs encrypted simultaneously; no boot → Hospital code gray (full shutdown)

**[[Veeam]] Backup & Replication**:
- Compromise: Backup admin credentials exposed → Attacker logs into [[Veeam]] console → Deletes all backup jobs + recovery points
- Impact: No recovery possible without external cold backups (air-gapped)

**Shared File Servers**:
- Attack Path: T1078 (compromised clinician [[AD]]) → Map network drive → Ransomware encrypts \\\\fileshare-clinical\\RadiologyDocs, \\\\labshare\\Results

### T1567: Exfiltration to Cloud

**Genomic Research Data**: Compromised researcher workstation → curl/wget to attacker-controlled cloud bucket (AWS S3, [[Google Drive]], Mega.nz)

**PHI Bulk Downloads**: Once attacker has [[AD]] access, enumerate high-value shares (PatientRecords, Reports)

### T1565: Data Tampering (Lab Middleware)

**LIS Integration** ([[Lab Information System]] ↔ Analyzers): Attacker compromises LIS middleware → Injects false lab results → Critical patient safety risk

## MITRE ATT&CK Techniques in Hospital Context

| Technique | Tactic | Example | Severity |
|-----------|--------|---------|----------|
| **T1190** | Initial Access | Cl0p MOVEit exploitation | High |
| **T1199** | Initial Access | Compromised [[Epic Hyperspace]] VPN | Critical |
| **T1078** | Initial Access | Stolen clinician [[AD]] credentials | Critical |
| **T1566** | Initial Access | Phishing email to hospital staff | Critical |
| **T1486** | Impact | Ransomware encrypts clinical file share | Critical |
| **T1485** | Impact | [[Veeam]] backup wipe + [[ESXi]] VM destruction | Critical |
| **T1565** | Impact | Lab result tampering (LIS middleware) | Critical (Patient Safety) |
| **T1567** | Exfiltration | Exfil genomic research to Mega.nz | Medium (Research IP) |
| **T1499** | Impact | DDoS on telehealth portal ([[NoName057]]) | Medium |

## Remote Access Architecture

### Clinical Remote Access
```
Clinician @ Home/Coffee Shop
  ↓ [[Epic Hyperspace]] VPN ([[Citrix]])
  ↓ MTU: 1500, AES-256 encryption
Hospital Edge ([[Citrix]] Access Gateway)
  ↓ RDP / ICA protocol
[[Epic]] Application Servers (EHR Tier)
  ↓ Real-time charting, patient lookup, order entry
Database: [[Epic]] Clarity (Oracle backend)
```

**MFA**: [[Microsoft Entra ID]] + TOTP / Hardware key (strongly recommended)  
**PAM**: [[CyberArk]] session recording on RDP sessions (audit trail)

### Vendor Remote Services
```
Vendor (e.g., [[Philips Healthcare]] Support Engineer)
  ↓ VPN initiation via PRS portal (pull-based)
Hospital Firewall (allow-list: [[Philips]] IP ranges only)
  ↓ Encrypted tunnel
[[Philips Healthcare]] Device (Ultrasound, monitoring)
  ↓ Firmware update / log retrieval
Audit: All vendor access logged to syslog; session recording optional
```

## Common Bypass Paths

1. **Stolen Clinician [[AD]] Credentials** (Highest success rate)
   - Phishing email + password spray against hospital domain
   - Why it works: Clinicians under time pressure; password reuse
   - Mitigation: Conditional Access requiring [[MFA]] for all remote [[Epic]] logins; geo-fencing

2. **Vendor Laptop Compromise**
   - Compromised [[Philips Healthcare]] support engineer's laptop
   - Why it works: Vendor laptops often have standing VPN connections; shared credentials
   - Mitigation: Require vendor laptop on corporate-managed fleet; EDR agent installed

3. **Biomed Unmanaged Device**
   - Attacker gains access to ultrasound machine / central station
   - Why it works: Legacy OS (Windows XP, minimal patching); default admin creds
   - Mitigation: Segregate OT devices to isolated VLAN; whitelist only known clinical workstations

4. **[[Veeam]] Backup Credentials**
   - Backup admin password in plaintext in config file or [[Azure Key Vault]] with overly permissive RBAC
   - Why it works: Backup secondary concern; creds not rotated
   - Mitigation: [[Veeam]] Immutable Backup feature; separate immutable vault outside admin reach; rotate quarterly

5. **[[ESXi]] SSH Access**
   - [[ESXi]] root password weak or default; SSH port exposed to hospital network
   - Why it works: [[ESXi]] is "fire and forget"; patching cycles delayed
   - Mitigation: Disable [[ESXi]] SSH by default; require jump host; use passwordless authentication ([[SSH]] key + OIDC)

---

**References**: [[CISA]], [[MITRE ATT&CK]], [[Krebs on Security]], [[Rapid7]], [[CBC News]]

## See also

[[ACME Ottawa Civic Hospital]] · [[Civic Hospital HAZOPS]] · [[Civic Hospital Supply Chain]]
