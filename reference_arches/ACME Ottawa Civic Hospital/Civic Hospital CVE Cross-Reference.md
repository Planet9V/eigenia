---
aliases: [CVE Reference, Vulnerability List, CVE Mapping]
type: facility-reference-model
category: acute-care-hospital
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-civic-hospital, phase/1c, sector/healthcare, vulnerabilities/cve, vulnerabilities/tracking]
related: ["[[ACME Ottawa Civic Hospital]]", "[[Civic Hospital Equipment]]", "[[NIST NVD]]", "[[MITRE ATT&CK]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Civic Hospital CVE Cross-Reference

## HIGH-SEVERITY CVEs (CVSS ≥9.0, Exploitable, Unpatched)

| Vendor | Model | Firmware | CVE | Title | CVSS | Status | Assets | Attack Path |
|--------|-------|----------|-----|-------|------|--------|--------|-------------|
| **[[GE Healthcare]]** | Carescape B650/B850 | 2.1.45, 2.3.22 | [[CVE-2020-6961]] | Remote Code Execution | 9.8 | **UNPATCHED** | 20 | Network heartbeat interception → RCE |
| **Maquet** | Cardiohelp ECMO | 3.2.0 | [[CVE-2023-21845]] | Denial of Service via malformed [[HL7]] | 9.1 | PENDING PATCH (3.2.1) | 2 | LIS middleware injection |
| **Fortinet** | FortiGate 1500D | 7.0–7.4.2 | [[CVE-2024-21762]] | SSL/TLS certificate validation bypass | 9.3 | PATCHED (7.4.3) | 2 | Perimeter firewall → inspect traffic bypass |
| **[[Cisco]] IOS-XE** | Catalyst 9400, 9300L, 9120 | 17.9.x | [[CVE-2023-20198]] | SSH privilege escalation | 8.6 | PATCHED (17.9.4a) | 39 | Network device lateral movement |
| **[[Siemens]] CIOS c-arm** | CIOS (Win7 Embedded) | POSReady 7 | [[CVE-2023-38545]], [[CVE-2023-41080]] | OpenSSL RCE, Tomcat RCE | 9.8 | **UNFIXED (legacy OS)** | 1 | Air-gapped; risk = LOW isolation dependency |

## MEDIUM-SEVERITY CVEs (CVSS 5.0–8.9)

| Vendor | Model | Firmware | CVE | Title | CVSS | Status | Assets | Impact |
|--------|-------|----------|-----|-------|------|--------|--------|--------|
| **[[Baxter]]** | Sigma Spectrum IQ | 8.1.3 | [[CVE-2022-26390]] | Unvalidated redirect in IV pump web console | 7.2 | MITIGATED (8.0+) | 18 | Credential phishing → pump tampering |
| **[[Baxter]]** | Exactamix System | 4.1.5 | [[CVE-2023-22298]] | SQL injection in IV admixture logs | 8.1 | PENDING PATCH (4.2.x) | 1 | Pharmacy automation tampering |
| **Sysmex** | XN-9000 | XN-Onsite 5.3.2 | [[CVE-2021-44228]] (Log4j) | Remote code execution in lab middleware | 10.0 | MITIGATED (5.2+) | 2 | Lab results falsification (T1565) |
| **Roche** | Cobas 8000 | Cobas IT 2.3.8 | [[CVE-2021-44228]] (Log4j) | RCE in analyzer update service | 10.0 | PENDING UPGRADE (2.5.x) | 1 | Lab data integrity |
| **[[BD]]** | Pyxis MedStation 4000 | ES 8.2.1 (Windows Server 2019) | [[CVE-2023-21674]] | Windows Server 2019 local priv esc | 7.8 | **VULNERABLE** | 12 | Medication diversion → RDP pivot |
| **[[Honeywell]] Niagara JACE** | JACE-8000 | 4.13.4 | [[CVE-2023-41080]] (Tomcat RCE) | Remote code execution in web framework | 9.8 | PATCHED (4.13.2+) | 2 | BMS access → facility control |
| **[[Epic]] Caché** | Caché Database | 2023.1.2 | [[CVE-2023-41056]] | Unauth database backup download | 8.2 | MITIGATED (monthly patches) | 2 | [[EHR]] data exfiltration |
| **Windows 10 IoT LTSC 2019** | GE Optima CT660, Panasonic FZ-G1 | KB5020788, KB5018506 | [[CVE-2024-26190]] | Windows RCE via SMBv3 | 9.8 | **EOL (Oct 2024)** | 3 | Imaging/nursing workstations → clinical network |

## Threat-Actor Kill-Chain Correlation

### T1199: Trusted Relationship Exploitation

**Hospital Vectors**: [[Epic Hyperspace]] remote access, [[Philips Healthcare]] PRS, [[GE Healthcare]] InSite, [[Siemens Healthcare]] Smart Remote

**CVE Mapping**:
- **[[Epic]] Caché** ([[CVE-2023-41056]]): Backup exfiltration → Attacker gains historical [[EHR]] snapshot
- **Groups**: [[BlackCat]], [[LockBit]] (vendor laptop compromise → lateral access)

**Mitigation**: PAM session recording, vendor [[MFA]] enforcement

---

### T1078: Credential Compromise (Primary Attack Vector)

**Asset Exposure**:
- **[[Citrix]] XenDesktop 7.15** (Windows 10 LTSC 2021): [[CVE-2024-26190]] (SMBv3 RCE)
- **Clinical Workstations** (Lenovo M90, HP EliteDesk 800): Windows 10 LTSC 2021, supports RDP [[MFA]]
- **[[AD]]-Joined Devices**: 120+ Defender agents, 95+ [[CrowdStrike]] Falcon agents (auto-detect credential theft)

**Kill-Chain**: Phishing → [[AD]] password spray → RDP without [[MFA]] → File share access

---

### T1486 + T1485: Ransomware & Backup Destruction

**[[VMware ESXi]] Hosts**:
- [[CVE-2024-37085]] ([[ESXi]] RCE) targets [[ESXi]] <8.0u2
- [[Veeam]] [[CVE-2024-40711]] (immutable backup bypass) → ALL recovery impossible

**Hospital Assets at Risk**:
- [[Epic]] VM01, PACS02, Lab System VM, [[Metasys]] control VMs
- **Impact**: Code Gray (facility shutdown)

---

### T1567: Exfiltration to Cloud Storage

**Vector**: Researcher workstation (Lenovo, HP) + [[CVE-2024-26190]] (Windows SMB bypass)
- Access \\\\research-share\\genetics\\patient_samples
- curl/wget to Mega.nz or [[Dropbox]] (hospital DLP may not block pre-approved vendors)

---

### T1565: Lab Middleware Data Tampering

**LIS Integration Chain**:
- **Sysmex XN-9000** ([[CVE-2021-44228]] Log4j) → RCE in analyzer
- **Roche Cobas 8000** ([[CVE-2021-44228]]) → Database write-back to LIS
- **Impact**: Attacker injects false potassium levels → Cardiac patient not treated → Adverse outcome

**Mitigation**: Network segmentation (LIS in isolated VLAN), input validation at analyzer firmware level

---

## Hospital "NOW" Priority CVE Watchlist

**Actionable This Week**:

1. **[[CVE-2024-26190]]** (Windows SMBv3 RCE) — 3 unpatched assets (GE Optima CT660, Panasonic FZ-G1)
   - Workaround: Disable SMBv3; whitelist RDP source IPs only

2. **[[CVE-2023-41080]]** (Tomcat RCE in [[Honeywell Niagara]])
   - Status: Already patched (4.13.4 → 4.13.2+) in this facility's inventory
   - Verify: `curl http://[JACE-IP]:8080/` does NOT return Tomcat 9.x version string

3. **[[CVE-2023-20198]]** ([[Cisco]] IOS-XE SSH priv esc)
   - Status: Already patched (17.9.4a) on all 39 devices
   - Verify: `show version | include 17.9` on each switch; confirm ≥17.9.4a

4. **[[CVE-2020-6961]]** ([[GE Carescape]] RCE)
   - 20 devices vulnerable (firmware ≤2.2.x)
   - Mitigation: Air-gap [[Carescape]] monitoring → VLAN 100 (clinical monitors only); no internet access
   - Vendor patch timeline: [[GE]] promised Carescape 2.4.x (Q2 2026)

5. **[[Veeam]] Backup Immutability** ([[CVE-2024-40711]])
   - Checklist: Is [[Veeam]] Immutable Backup enabled? Can backup admin delete snapshots? (Answer should be: NO)
   - Test: Attacker gains backup admin creds → Try DELETE snapshot → Should be blocked
   - If vulnerable: Enable [[Veeam]] Immutable Backup on separate vault (air-gapped)

---

**References**: [[NIST NVD]], [[ICS-CERT]], [[Rapid7]], [[Veeam Blog]], [[MITRE ATT&CK]]

## See also

[[ACME Ottawa Civic Hospital]] · [[Civic Hospital Equipment]] · [[Civic Hospital Threat Profile]]
