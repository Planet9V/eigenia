---
aliases: [Peds MC Threats, ATT&CK Mapping]
type: facility-reference-model
category: pediatric-specialty-hospital
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-pediatric-medical-center, phase/1c, sector/healthcare, sector/pediatric, org/acme-demo]
related: ["[[ACME Ottawa Pediatric Medical Center]]", "[[Pediatric MC HAZOPS]]", "[[Pediatric MC CVE Cross-Reference]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Pediatric Medical Center Threat Profile

---

## Top Threat Actors Targeting Pediatric Healthcare

### Russian/Anti-Western DDoS Hacktivists
**Groups**: [[NoName057]], [[KillNet]], [[AnonymousSudan]]

**Pattern**: Consistent with [[CHEO 2018 DDoS]]; opportunistic healthcare targeting for disruption + publicity

**Motivation**: Political/anti-Western activism; healthcare visibility

**Risk**: T1498 Network DoS; opportunistic credential theft during chaos

**Timeline**: Recurring; seasonal peaks (geopolitical events)

### BlackCat / ALPHV (Ransomware-as-a-Service)
**Pattern**: Pediatric-data sensitivity ([[Lurie Children's Hospital]] 792K breach, Jan 2024)

**Tactics**: Email phishing → stolen credentials → lateral movement → encryption

**Exfil Target**: Patient genomic/oncology cohorts (high dark-web market value)

**Capabilities**: AI-enhanced phishing, multi-stage encryption, post-exfil [[ESXi]]/[[Veeam]] destruction

**Timeline**: Long dwell (30–90 days pre-encryption); ransom $2–10M+

### LockBit (Prolific Ransomware Gang)
**Incidents**: >460 U.S. healthcare orgs hit in 2024; pediatric wings included

**Common Path**: Social engineering → unpatched VPN → domain admin compromise

**Post-Incident**: Public data dumps if ransom not paid

### Cl0p (Opportunistic Mass Exfiltration)
**Pattern**: [[MOVEit]]/[[Accellion]] mass exploitation

**Target**: File-transfer systems, shared EHR repositories (pediatric oncology research shares)

**Impact**: Data exfil without encryption; competitors may silently acquire stolen genomic cohorts

### China MSS (State-Sponsored APT)
**Target**: Pediatric oncology research, rare-disease genomic IP (high strategic value)

**Tactics**: Watering-hole exploitation, supply-chain compromise, long-term reconnaissance

**Dwell**: Months to years; lateral movement to research air-gapped systems

**Post-Incident**: IP exfil without ransom demand; silent IP theft

### Iranian APTs (Pioneer Kitten, Charming Kitten)
**Target**: Pediatric vaccine/CRISPR research, geopolitical leverage

**Tactics**: Credential harvesting, supply-chain targeting ([[Epic]], [[Philips]])

---

## MITRE ATT&CK Techniques — Pediatric Healthcare Context

### Initial Access
- **T1199 Trusted Relationship**: Compromised [[Epic]] support tech → remote session access
- **T1190 Exploit Public-Facing App**: Pediatric patient portal SQL injection → admin credentials
- **T1566 Phishing**: "Lab results for your child" → malicious Excel macro

### Persistence & Privilege Escalation
- **T1078 Valid Accounts**: Stolen clinician AD (nurse, MD) → lateral movement
- **T1547 Boot/Logon Autostart**: Malware persistence on shared pediatric-imaging workstation
- **T1098 Account Manipulation**: Admin account backdoor via alternate credentials

### Command & Control / Exfiltration
- **T1041 Exfil over C2 channel**: Encrypted genomic research data to attacker [[S3]]
- **T1567 Exfil to cloud**: Patient cohorts → Mega / CyberDuck cloud storage
- **T1059 Command-line (LOTL)**: PowerShell on clinical file share

### Defense Evasion
- **T1497 Sandbox Evasion**: Malware checks for [[Hyper-V]] / [[VMware]] before running
- **T1036 Masquerading**: Attacker binary renamed to `svchost.exe` on medical workstation
- **T1220 XSL Script Processing**: MSXML compiled script → reverse shell

### Impact
- **T1486 Data Encrypted for Impact**: Ransomware locks down pediatric EMR → surgery delays
- **T1485 Data Destruction**: Post-exfil [[Veeam]] backup wipe → no recovery option
- **T1565 Data Manipulation**: Drug library tampered (pediatric dosage tables) → patient safety risk

---

## Kill-Chain Mapping

### Russian DDoS Activists (T1498)

**Reconnaissance** → Domain enumeration, social media staff enumeration, GitHub research code leaks

**Weaponization** → Botnet/DDoS-as-a-Service procurement ([[Mirai]], [[Nitol]] variants)

**Delivery** → Volumetric UDP/SYN flood → ISP uplinks; application-layer HTTP floods

**Exploitation** → Patient portal unavailable; [[Epic]] Hyperspace timeouts; backup network exhausted

**Post-Incident** → Credentials harvested during escalation calls (social engineering); unpatched VPN exploited

**Anchors**: ISP uplinks (Rogers + Bell → [[Cloudflare]]/[[Akamai]]), Patient portal (AWS ELB/Nginx), Public DNS (Route53 + [[Cloudflare]])

### Ransomware Gang (BlackCat/LockBit) — T1078 + T1486 + T1485

**Weeks 1–4**: Domain enumeration, LinkedIn scraping, [[Shodan]] / [[Censys]] for open ports

**Weeks 5–6**: Phishing campaign "Lab System Upgrade Required — Click to Verify" → macro-enabled Excel → Stage-1 downloader ([[Emotet]] / [[Trickbot]])

**Weeks 7–12**: Lateral movement via stolen credentials (net.exe, [[BloodHound]]) → Privilege escalation (PrintSpooler, PetitPotam) → Domain admin achieved → Defender disabled

**Weeks 13–14**: Research database enumeration: `patient_cohorts` (oncology genetics, 2000 subjects), `clinical_outcomes` (treatment responses, dosages, genomic variants) → Data packaged → Staged to external C2 ([[Azure Storage]], Wasabi [[S3]])

**Week 15**: T1486 all .docx/.xlsx/.pptx/.vmdk → .lockbit; T1485 [[Veeam]] snapshots deleted; Ransom note: $8M USD in Bitcoin within 72h; pediatric cohort sold to bidders if unpaid

**Post-Incident** (Weeks 16+): Law enforcement (FBI + RCMP); media + patient advisory; PHIPA breach notification; incident response cost $3–5M

**Anchors**: Email gateway ([[Exchange]] / [[Office 365]]), Domain admin credentials (AD mimikatz target), File servers (\\\\acme-ottawa-fs1, \\\\acme-ottawa-research), [[Veeam]] backup (VM snapshots at risk), Air-gap research (if NOT air-gapped, lateral movement path exists)

### Insider / Compromised Research Staff (T1199 + T1567)

**Setup**: Disgruntled researcher hired by competitor pharma; legitimate access: research-share mounted on workstation; VPN PKI cert legitimately issued

**Exploitation** (Continuous): Routine access to genomic cohort database → Incremental exfil 10 GB/week to personal cloud (OneDrive, Google Drive) → USB cable during lunch breaks (physical exfil) OR cloud sync → Detection avoidance (mimics normal research workflow)

**Impact** (Silent for months): Genomic data never encrypted (not ransomware — IP theft); Competitor launches competing rare-disease therapy 6 months early; ACME IP advantage lost

**Anchors**: Research workstation (DLP enforcement), VPN audit (PKI certificate tracking), File access logs (genomic database queries), Cloud sync services (banned or monitored)

---

## Remote Access Architecture — Post-2018 Hardening

### [[Epic]] Tesseract / Hyperspace VPN
- IPsec tunnel (AES-256), PIV card + RSA SecurID MFA
- Session limit: 5 concurrent; 4-hour max
- [[CyberArk]] PAM gating; every command logged via sysmon
- Duration: 4-hour session max; mandatory logout + cert revocation

### [[Philips]] Remote Services
- [[TLS 1.3]] encrypted tunnel; [[Philips]] PKI certificate (Hardware Security Module)
- Access limited to device management LAN (VLAN 3040, isolated from clinical)
- Encrypted logs stored in ACME audit server (immutable, 7-year retention)
- Pre-incident approval: Service request + clinical engineering sign-off

### [[GE InSite]] (Diagnostic Imaging)
- GE-provided secure box as intermediary
- GE connects outbound only; ACME does not initiate inbound
- Appliance relays requests (whitelist model)
- Session recording: video + keystroke capture; business hours only (08:00–17:00 ET)

### [[Drager]] TechWeb (Ventilator/Anesthesia)
- VPN: [[Drager]] PKI cert + ACME clinician [[Duo Security]] MFA (2FA → 3FA)
- Network segmentation: Drager session → restricted routing to Drager devices only
- Out-of-band verification: Support call + ticket number checked in parallel
- Duration: Single device session max 2 hours; mandatory re-auth per device

### Biomed Vendor Laptops (On-Site)
- Hardened laptops (no general internet, no browser, no email)
- MAC whitelisted in wireless VLAN (vendor-access, isolated)
- USB: Blocked except pre-loaded vendor media (read-only)
- File transfer: [[SFTP]] only; USB-to-Device forbidden
- Post-visit: Laptop scanned by InfoSec; USB drive wiped by vendor (witnessed)

---

## MFA Hardening — Post-Incident Standard

### Clinician & Admin Access
- **Requirement**: PIV card (hardware security module) + [[TOTP]] (time-based OTP)
- **Policy**: Passwordless where feasible ([[Windows Hello for Business]])
- **Fallback**: [[TOTP]] ([[Google Authenticator]] / [[Duo]]) if PIV reader unavailable
- **Hardware**: All workstations have USB PIV readers ([[Yubico]] Nano); tested quarterly

### Patient Portal (Low-Privilege, Web-Facing)
- **Requirement**: Email verification + SMS/email OTP for initial login
- **Session**: 30-min timeout (no persistent login)
- **Brute-force Protection**: 5 failed attempts → 15-min lockout + admin notification
- **CAPTCHA**: [[reCAPTCHA v3]] for bot detection

### Service Accounts (EHR, Batch Jobs)
- **Requirement**: Certificates + regular rotation (every 90 days)
- **Policy**: No static passwords; [[Kubernetes]] secrets or [[HashiCorp Vault]] for runtime injection
- **Audit**: Every service account access logged (who, what, when, why)

---

## DDoS Mitigation — Always-On Architecture

- **Primary**: Rogers 10G + Secondary: Bell 5G → [[Cloudflare Magic Transit]] always-on scrubbing
- **Volumetric**: Mitigation in <500ms; application-layer (L7) protection
- **Backup (Out-of-Band)**: [[Akamai Prolexic]] DDoS Protection as secondary
- **Public DNS**: Cloudflare (secondary) + [[AWS Route53]] (primary); [[DNSSEC]] enabled
- **Rate Limiting**: Per-IP queries capped at 100 req/sec; 1000 req/min per IP to patient portal
- **WAF**: AWS WAF (CloudFront) + [[Cloudflare]] WAF; GeoIP blocking (non-Canadian → portal blocked)

---

## Residual Risk & Bypass Paths (Even Post-2018)

| Path | Trigger | Mitigation Status |
|------|---------|-------------------|
| **Stolen Clinician AD** | Phishing → credential harvesting | Partially mitigated: MFA + conditional access (IP whitelisting) |
| **Vendor Contractor Laptop** | Malware on personal device → WiFi access | Mitigated: MAC whitelisting + VLAN isolation |
| **Insider Threat** | Legitimate access → incremental exfil over months | Partially mitigated: DLP + user behavior analytics; gaps in USB/mobile |
| **Third-Party Lab Integration** | Partner lab VPN tunnel (HL7 feed) → internal pivoting | Mitigated: DMZ appliance + protocol inspection |
| **Supply-Chain ([[Epic]]/[[Philips]])** | Vendor code → backdoor persistence | Mitigated: Code signing verification; vendor SLAs for emergency patches |

---

**Reference**: [[MITRE ATT&CK]], [[CHEO 2018 DDoS]], [[Lurie Children's Hospital 2024]]

**Document**: Phase 1c Threat & Remote Access  
**Lines**: 393 | **Threat Actors**: 6 | **ATT&CK Techniques**: 15+ | **Kill-Chains**: 3 | **Created**: 2026-05-09
