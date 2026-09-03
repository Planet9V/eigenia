# Datacenter OT Infrastructure — CVE & Vulnerability Research

> **Work Packages:** WP01 (Threat Landscape), WP06 (BMS/Cooling), WP07 (Power/DCIM)
> **Research Date:** 2025-06-13
> **Sources:** NVD (nvd.nist.gov), CISA ICS-CERT, Vendor PSIRTs (Schneider, Siemens, Honeywell, Johnson Controls, ABB, Eaton, Moxa, Axis, Vertiv), MITRE ATT&CK for ICS

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [BMS Platforms](#2-bms-platforms)
3. [Power Infrastructure](#3-power-infrastructure)
4. [Cooling Infrastructure](#4-cooling-infrastructure)
5. [Physical Security Systems](#5-physical-security-systems)
6. [DCIM / OT Monitoring](#6-dcim--ot-monitoring)
7. [Industrial Network Equipment](#7-industrial-network-equipment)
8. [Protocol-Level Vulnerabilities](#8-protocol-level-vulnerabilities)
9. [Ransomware & Threat Actor Context](#9-ransomware--threat-actor-context)
10. [MITRE ATT&CK for ICS Mapping](#10-mitre-attck-for-ics-mapping)
11. [CISA ICS-CERT Advisory Index](#11-cisa-ics-cert-advisory-index)

---

## 1. Executive Summary

This research catalogues known vulnerabilities (CVEs) affecting operational technology (OT) and building management systems (BMS) commonly deployed in datacenter environments. The scope covers **BMS controllers, UPS/power distribution, cooling infrastructure, physical security, DCIM platforms, and industrial network switches** — the systems that, if compromised, could cause physical damage, environmental failure, or cascading outages.

### Key Findings

- **75% of organizations** have BAS devices affected by documented, in-the-wild exploited vulnerabilities (2025 research)
- **Johnson Controls** suffered a Dark Angels ransomware attack (Sep 2023) — $27M+ cost, 27TB exfiltrated, 76M households affected
- **Honeywell Niagara** disclosed 13 vulnerabilities in July 2025, five rated CVSS 9.8
- **Johnson Controls Metasys** has a CVSS 10.0 SQL injection (CVE-2025-26385) — the maximum severity score
- **BACnet/Modbus** protocols remain insecure by design — no native encryption or authentication
- **Moxa** industrial switches have hard-coded credential CVEs actively tracked by CISA
- Multiple **Schneider Electric** product lines (EcoStruxure Building, IT DCE, ASCO ATS) have critical RCE chains

---

## 2. BMS Platforms

### 2.1 Honeywell Niagara / Tridium JACE

| CVE ID | CVSS | Affected Product | Firmware/Version | Advisory URL | Disclosure Date | ATT&CK ICS Technique |
|--------|------|-----------------|-----------------|-------------|----------------|----------------------|
| CVE-2025-3936 | 9.8 | Niagara Framework / JACE | < 4.14u2 | [NVD](https://nvd.nist.gov/vuln/detail/CVE-2025-3936) | Jul 2025 | T0859 (Valid Accounts) |
| CVE-2025-3937 | 9.8 | Niagara Framework | < 4.14u2 | [Honeywell Advisory](https://www.honeywell.com) | Jul 2025 | T0812 (Default Credentials) |
| CVE-2025-3938 | 9.8 | Niagara Framework | < 4.14u2 | [NVD](https://nvd.nist.gov/vuln/detail/CVE-2025-3938) | Jul 2025 | T0830 (Adversary-in-the-Middle) |
| CVE-2025-3939 | TBD | Niagara Framework | < 4.14u2 | [Honeywell Advisory](https://www.honeywell.com) | Jul 2025 | T0830 (Adversary-in-the-Middle) |
| CVE-2025-3940 | TBD | Niagara Framework | < 4.14u2 | [Honeywell Advisory](https://www.honeywell.com) | Jul 2025 | T0830 (Adversary-in-the-Middle) |
| CVE-2025-3941 | 9.8 | Niagara Framework | < 4.14u2 | [NVD](https://nvd.nist.gov/vuln/detail/CVE-2025-3941) | Jul 2025 | T0882 (Theft of Operational Info) |
| CVE-2025-3944 | 9.8 | Niagara Framework | < 4.14u2 | [NVD](https://nvd.nist.gov/vuln/detail/CVE-2025-3944) | Jul 2025 | T0859 (Valid Accounts) |

**Key Context:**
- 13 vulnerabilities total disclosed July 2025 by Nozomi Networks researchers
- Exploitable if encryption is disabled on network devices (common misconfiguration)
- Chained exploitation enables full MiTM compromise of BMS controllers
- Remediation: Upgrade to **Niagara 4.14u2** or **Niagara Enterprise Security 4.14u2**
- Legacy Niagara AX systems are unsupported — must migrate

### 2.2 Johnson Controls Metasys

| CVE ID | CVSS | Affected Product | Firmware/Version | Advisory URL | Disclosure Date | ATT&CK ICS Technique |
|--------|------|-----------------|-----------------|-------------|----------------|----------------------|
| CVE-2025-26385 | **10.0** | Metasys ADS, ADX, LCS8500, NAE8500, SCT, CCT | ADS/ADX ≤ 14.1; SCT ≤ 17.1; CCT ≤ 17.0 | [ICSA-26-027-04](https://www.cisa.gov/news-events/ics-advisories/icsa-26-027-04) | Jan 2026 | T0871 (Execution through API) |
| CVE-2025-26382 | High | iSTAR Configuration Utility | Various | [JCI Trust Center](https://www.johnsoncontrols.com/trust-center/cybersecurity/security-advisories) | 2025 | T0859 (Valid Accounts) |
| CVE-2025-26386 | High | iSTAR / PowerG / IQPanel | Various | [JCI Trust Center](https://www.johnsoncontrols.com/trust-center/cybersecurity/security-advisories) | 2025 | T0859 (Valid Accounts) |

**Key Context:**
- **CVE-2025-26385 is CVSS 10.0** — Command Injection allowing remote SQL execution on Metasys ADS/ADX
- Impacts ADS with SQL Express (v ≤ 14.1), NAE8500/LCS8500 engines (v 12.0–14.1)
- Mitigation: Apply patch GIV-165989 via JCI License Portal; close TCP port 1433
- CISA advisory: **ICSA-26-027-04**
- **Dark Angels ransomware attack** (Sep 2023) compromised JCI corporate infrastructure — see [Section 9](#9-ransomware--threat-actor-context)

### 2.3 Siemens Desigo CC

| CVE ID | CVSS | Affected Product | Firmware/Version | Advisory URL | Disclosure Date | ATT&CK ICS Technique |
|--------|------|-----------------|-----------------|-------------|----------------|----------------------|
| CVE-2025-47809 | 8.2 | Desigo CC (Wibu CodeMeter component) | V5.0, V5.1, V6, V7, V8 (all) | [CISA Advisory](https://www.cisa.gov/news-events/ics-advisories) | 2025 | T0859 (Valid Accounts) |
| CVE-2024-23815 | 7.5 | Desigo CC Server | Multiple versions | [NVD](https://nvd.nist.gov/vuln/detail/CVE-2024-23815) | 2024 | T0871 (Execution through API) |

**Key Context:**
- CVE-2025-47809: Privilege escalation via Wibu CodeMeter "Import License" function — unprivileged user → admin
- CVE-2024-23815: Missing authentication allows unauthenticated SQL queries on event port 4998/tcp
- Remediation: Update CodeMeter to v8.30a+; restart after installation
- Vendor: [Siemens ProductCERT](https://www.siemens.com/cert/advisories)

### 2.4 Schneider Electric EcoStruxure Building

| CVE ID | CVSS | Affected Product | Firmware/Version | Advisory URL | Disclosure Date | ATT&CK ICS Technique |
|--------|------|-----------------|-----------------|-------------|----------------|----------------------|
| CVE-2026-1226 | High | EcoStruxure Building Operation (EBO) Workstation/WebStation | Multiple | [SEVD-2026-041-02](https://www.se.com/ww/en/work/support/cybersecurity/security-notifications.jsp) | 2026 | T0871 (Execution through API) |
| CVE-2026-1227 | High | EcoStruxure Building Operation (EBO) | Multiple | [Schneider SEVD](https://www.se.com/ww/en/work/support/cybersecurity/security-notifications.jsp) | 2026 | T0871 (Execution through API) |
| CVE-2025-8449 | Medium | EcoStruxure Building Operation | Multiple | [CISA Advisory](https://www.cisa.gov/news-events/ics-advisories) | 2025 | T0814 (DoS) |

**Key Context:**
- CVE-2026-1226/1227: XXE injection and improper code generation in EBO Workstation/WebStation
- CVE-2025-8449: Uncontrolled resource consumption → DoS
- Vendor: [Schneider Electric Security Notifications](https://www.se.com/ww/en/work/support/cybersecurity/security-notifications.jsp)

---

## 3. Power Infrastructure

### 3.1 Schneider Electric APC UPS / Network Management Card

| CVE ID | CVSS | Affected Product | Firmware/Version | Advisory URL | Disclosure Date | ATT&CK ICS Technique |
|--------|------|-----------------|-----------------|-------------|----------------|----------------------|
| CVE-2024-10511 | 5.3/6.3 | PowerChute Serial Shutdown | v1.2.0.301 and prior | [ICSA-25-322-04](https://www.cisa.gov/news-events/ics-advisories) | Nov 2024 | T0814 (DoS) |
| CVE-2022-22805 | 9.8 | APC Smart-UPS (TLStorm) | NMC firmware (multiple) | [NVD](https://nvd.nist.gov/vuln/detail/CVE-2022-22805) | Mar 2022 | T0866 (Exploitation of Remote Services) |
| CVE-2022-22806 | 9.8 | APC Smart-UPS (TLStorm) | NMC firmware (multiple) | [NVD](https://nvd.nist.gov/vuln/detail/CVE-2022-22806) | Mar 2022 | T0830 (Adversary-in-the-Middle) |
| CVE-2022-0715 | 9.1 | APC Smart-UPS (TLStorm) | NMC firmware (multiple) | [NVD](https://nvd.nist.gov/vuln/detail/CVE-2022-0715) | Mar 2022 | T0857 (System Firmware) |

**Key Context:**
- **TLStorm (2022)**: Critical TLS and firmware signing vulnerabilities affecting millions of APC Smart-UPS units — still widely unpatched
- CVE-2024-10511: Account lockout DoS on PowerChute Serial Shutdown; fix in v1.3
- Default "apc" credentials remain widespread in field deployments
- NMC2 cards reaching end-of-life; transition to NMC3 recommended

### 3.2 Siemens SIPROTEC Protection Relays

| CVE ID | CVSS | Affected Product | Firmware/Version | Advisory URL | Disclosure Date | ATT&CK ICS Technique |
|--------|------|-----------------|-----------------|-------------|----------------|----------------------|
| CVE-2024-52504 | 8.7 (v4) | SIPROTEC 4 / 4 Compact | Multiple; fix V4.78+ | [SSA-400089](https://www.siemens.com/cert/advisories) | 2024 | T0814 (DoS) |
| CVE-2024-54017 | High | SIPROTEC 5 (6MD85, 6MD86) | < V11.0 | [CISA Advisory](https://www.cisa.gov/news-events/ics-advisories) | 2024 | T0866 (Exploitation of Remote Services) |
| CVE-2024-53648 | High | SIPROTEC 5 | Multiple | [SSA-687955](https://www.siemens.com/cert/advisories) | 2024 | T0839 (Module Firmware) |
| CVE-2024-54015 | Medium | SIPROTEC 5 | Multiple | [SSA-767615](https://www.siemens.com/cert/advisories) | 2024 | T0882 (Theft of Operational Info) |
| CVE-2024-38867 | Medium | SIPROTEC 5 | Multiple | [SSA-750499](https://www.siemens.com/cert/advisories) | 2024 | T0830 (Adversary-in-the-Middle) |

**Key Context:**
- CVE-2024-52504: Remote unauthenticated DoS during file transfer — **no fix planned** for many SIPROTEC 4 SKUs
- CVE-2024-53648: Physical access → arbitrary command execution via development shell on SIPROTEC 5
- CVE-2024-38867: Weak cipher support on web/DIGSI 5 ports enables traffic decryption
- Vendor: [Siemens ProductCERT](https://www.siemens.com/cert/advisories)

### 3.3 SEL Protection Relays

| CVE ID | CVSS | Affected Product | Firmware/Version | Advisory URL | Disclosure Date | ATT&CK ICS Technique |
|--------|------|-----------------|-----------------|-------------|----------------|----------------------|
| CVE-2024-2103 | Medium | SEL-700BT, SEL-700G, SEL-710-5, SEL-751, SEL-787-2/-3/-4, SEL-787Z | Multiple FW versions | [CISA ICS Advisory](https://www.cisa.gov/news-events/ics-advisories) | Apr 2024 | T0839 (Module Firmware) |

**Key Context:**
- Undocumented features accessible to privileged users → unpredictable relay behavior, DoS
- Remediation: Check Appendix A of product instruction manual for required firmware revisions
- Vendor: [SEL Security Notifications](https://selinc.com/support/security-notifications/external-reports/)

### 3.4 ASCO / Schneider ATS Remote Annunciators

| CVE ID | CVSS | Affected Product | Firmware/Version | Advisory URL | Disclosure Date | ATT&CK ICS Technique |
|--------|------|-----------------|-----------------|-------------|----------------|----------------------|
| CVE-2025-1058 | 8.7 (v4) | ASCO 5310 / 5350 Remote Annunciator | Multiple | [CISA Advisory](https://www.cisa.gov/news-events/ics-advisories) | Apr 2025 | T0857 (System Firmware) |
| CVE-2025-1059 | High | ASCO 5310 / 5350 Remote Annunciator | Multiple | [Schneider SEVD](https://www.se.com/ww/en/work/support/cybersecurity/security-notifications.jsp) | Apr 2025 | T0814 (DoS) |
| CVE-2025-1060 | High | ASCO 5310 / 5350 Remote Annunciator | Multiple | [Schneider SEVD](https://www.se.com/ww/en/work/support/cybersecurity/security-notifications.jsp) | Apr 2025 | T0882 (Theft of Operational Info) |
| CVE-2025-1070 | High | ASCO 5310 / 5350 Remote Annunciator | Multiple | [Schneider SEVD](https://www.se.com/ww/en/work/support/cybersecurity/security-notifications.jsp) | Apr 2025 | T0857 (System Firmware) |

**Key Context:**
- ASCO annunciators monitor ATS status — critical for datacenter power transfer visibility
- CVE-2025-1058: Code download without integrity check
- CVE-2025-1060: Cleartext transmission of sensitive information
- CVE-2025-1070: Unrestricted file upload → device manipulation

### 3.5 Eaton UPS

| CVE ID | CVSS | Affected Product | Firmware/Version | Advisory URL | Disclosure Date | ATT&CK ICS Technique |
|--------|------|-----------------|-----------------|-------------|----------------|----------------------|
| CVE-2025-59887 | 8.6 | Eaton UPS Companion (EUC) | < v3.0 | [ETN-VA-2025-1026](https://www.eaton.com/us/en-us/company/news-insights/cybersecurity.html) | Dec 2025 | T0866 (Exploitation of Remote Services) |
| CVE-2025-59888 | 6.7 | Eaton UPS Companion (EUC) | < v3.0 | [ETN-VA-2025-1026](https://www.eaton.com/us/en-us/company/news-insights/cybersecurity.html) | Dec 2025 | T0859 (Valid Accounts) |
| CVE-2025-22495 | 8.4 | Network-M2 Card | FW < 3.0.4 | [Eaton Advisory](https://www.eaton.com/us/en-us/company/news-insights/cybersecurity.html) | Feb 2025 | T0871 (Execution through API) |
| CVE-2025-48394 | High | G4 PDU / NMC G2 | Multiple | [Eaton Advisory](https://www.eaton.com/us/en-us/company/news-insights/cybersecurity.html) | 2025 | T0882 (Theft of Operational Info) |
| CVE-2025-48395 | High | G4 PDU / NMC G2 | Multiple | [Eaton Advisory](https://www.eaton.com/us/en-us/company/news-insights/cybersecurity.html) | 2025 | T0882 (Theft of Operational Info) |

**Key Context:**
- CVE-2025-59887: DLL hijacking in EUC installer → arbitrary code execution
- CVE-2025-22495: NTP config field command injection on Network-M2 (EOL since early 2024)
- Network-M2 is EOL — migrate to Network-M3
- CVE-2025-48394/48395: Path traversal on PDU network cards

---

## 4. Cooling Infrastructure

### 4.1 ABB VFD / Drive Controllers

| CVE ID | CVSS | Affected Product | Firmware/Version | Advisory URL | Disclosure Date | ATT&CK ICS Technique |
|--------|------|-----------------|-----------------|-------------|----------------|----------------------|
| CVE-2024-48510 | 9.8 | ABB Drive Composer | Multiple | [ABB PSIRT](https://global.abb/group/en/technology/cyber-security/alerts-and-notifications) | 2024 | T0882 (Theft of Operational Info) |
| CVE-2025-2595 | High | ABB AC500 V3 | FW < 3.9.0 | [CISA Advisory](https://www.cisa.gov/news-events/ics-advisories) | 2025 | T0859 (Valid Accounts) |
| CVE-2025-41659 | High | ABB AC500 V3 | FW < 3.9.0 | [ABB PSIRT](https://global.abb/group/en/technology/cyber-security/alerts-and-notifications) | 2025 | T0882 (Theft of Operational Info) |
| CVE-2025-41691 | Medium | ABB AC500 V3 | FW < 3.9.0 | [ABB PSIRT](https://global.abb/group/en/technology/cyber-security/alerts-and-notifications) | 2025 | T0814 (DoS) |
| — | Various | ABB ACS880 Control Programs | CODESYS RTS vulns | [AV25-169](https://cyber.gc.ca/) | Mar 2025 | T0839 (Module Firmware) |

**Key Context:**
- CVE-2024-48510: **Critical (9.8)** path traversal in Drive Composer software → file system access
- ACS880 drives affected by CODESYS runtime vulnerabilities (common across many drive vendors)
- AC500 V3 fixes available in firmware 3.9.0
- ABB recommends drives should **never** be internet-facing

### 4.2 Siemens SINAMICS VFD

| CVE ID | CVSS | Affected Product | Firmware/Version | Advisory URL | Disclosure Date | ATT&CK ICS Technique |
|--------|------|-----------------|-----------------|-------------|----------------|----------------------|
| CVE-2024-56336 | 9.8 | SINAMICS S200 | Multiple (bootloader) | [Siemens ProductCERT](https://www.siemens.com/cert/advisories) | Mar 2025 | T0857 (System Firmware) |
| CVE-2024-54678 | 8.2 | SINAMICS Startdrive (V17-V20) | All versions | [Siemens ProductCERT](https://www.siemens.com/cert/advisories) | 2024 | T0871 (Execution through API) |
| CVE-2024-52051 | High | SINAMICS engineering platforms | Multiple (SSA-392859) | [Siemens ProductCERT](https://www.siemens.com/cert/advisories) | 2024 | T0871 (Execution through API) |

**Key Context:**
- CVE-2024-56336: **Critical (9.8)** unlocked bootloader on SINAMICS S200 → full device compromise
- CVE-2024-54678: Deserialization of untrusted data in Startdrive → local authenticated code execution
- These drives power cooling fans, pumps, and compressors in datacenter HVAC systems

### 4.3 Danfoss VFD / VLT

| CVE ID | CVSS | Affected Product | Firmware/Version | Advisory URL | Disclosure Date | ATT&CK ICS Technique |
|--------|------|-----------------|-----------------|-------------|----------------|----------------------|
| CVE-2025-41450 | High | Danfoss AK-SM 8xxA Series | Multiple | [Danfoss Security Advisory](https://www.danfoss.com) | 2025 | T0859 (Valid Accounts) |
| — (DSA-2025-12-01) | Low | MCT 10 Installer | Bundled MSXML 3.0 | [Danfoss Security Advisory](https://www.danfoss.com) | 2025 | T0866 (Exploitation of Remote Services) |

**Key Context:**
- Danfoss VLT® VFD product line (FC 102, 202, 301, 302) has achieved **IEC 62443-4-2 SL1** certification — no critical CVEs on core drive firmware
- CVE-2025-41450 affects AK-SM 8xxA (refrigeration/building management controller), not VFD drives
- MCT 10 installer ships with outdated MSXML 3.0 — use latest version

### 4.4 Johnson Controls York Chiller Controllers

| CVE ID | CVSS | Affected Product | Firmware/Version | Advisory URL | Disclosure Date | ATT&CK ICS Technique |
|--------|------|-----------------|-----------------|-------------|----------------|----------------------|
| (See CVE-2025-26385) | 10.0 | Metasys ADS/ADX (integrates York) | ≤ 14.1 | [ICSA-26-027-04](https://www.cisa.gov/news-events/ics-advisories/icsa-26-027-04) | Jan 2026 | T0871 (Execution through API) |

**Key Context:**
- No York-chiller-specific CVEs identified; however, York chillers integrated via **Metasys** or **Facility Explorer** inherit BMS platform vulnerabilities
- CVE-2025-26385 (Metasys CVSS 10.0) can affect chiller setpoint control if ADS/ADX manages chiller controllers
- FX80/FX90 building automation controllers: **ICSA-25-219-02**

---

## 5. Physical Security Systems

### 5.1 Genetec Security Center

| CVE ID | CVSS | Affected Product | Firmware/Version | Advisory URL | Disclosure Date | ATT&CK ICS Technique |
|--------|------|-----------------|-----------------|-------------|----------------|----------------------|
| CVE-2025-43027 | Critical | ALPR Manager Role | < 5.13.2.3 | [Genetec TechDoc](https://docs.genetec.com/) | 2025 | T0859 (Valid Accounts) |
| CVE-2025-1789 | High | Genetec Update Service | < 2.10 | [Genetec TechDoc](https://docs.genetec.com/) | 2025 | T0859 (Valid Accounts) |
| CVE-2025-2928 | Medium | Archiver Role | < 5.13.1.1 | [Genetec TechDoc](https://docs.genetec.com/) | 2025 | T0871 (Execution through API) |

**Key Context:**
- CVE-2025-43027: Improper access control → administrative takeover via ALPR Manager
- CVE-2025-1789: Local privilege escalation to SYSTEM on Windows
- CVE-2025-2928: SQL injection in Archiver role
- Multiple third-party dependency CVEs patched (OpenSSL, FFMPEG)

### 5.2 Axis Cameras

| CVE ID | CVSS | Affected Product | Firmware/Version | Advisory URL | Disclosure Date | ATT&CK ICS Technique |
|--------|------|-----------------|-----------------|-------------|----------------|----------------------|
| CVE-2025-30023 | 9.0 | AXIS Camera Station Pro (Axis.Remoting) | Multiple | [Axis Trust Center](https://www.axis.com/about-axis/cybersecurity) | Mid-2025 | T0866 (Exploitation of Remote Services) |
| CVE-2025-0324 | 9.4 | VAPIX Device Configuration (AXIS OS) | Multiple | [Axis Trust Center](https://www.axis.com/about-axis/cybersecurity) | 2025 | T0859 (Valid Accounts) |
| CVE-2025-30024 | Medium | AXIS Camera Station Pro | Multiple | [CISA Advisory](https://www.cisa.gov/news-events/ics-advisories) | 2025 | T0830 (Adversary-in-the-Middle) |
| CVE-2025-30025 | Medium | AXIS Camera Station Pro | Multiple | [CISA Advisory](https://www.cisa.gov/news-events/ics-advisories) | 2025 | T0859 (Valid Accounts) |
| CVE-2025-30026 | Medium | AXIS Camera Station Pro | Multiple | [CISA Advisory](https://www.cisa.gov/news-events/ics-advisories) | 2025 | T0859 (Valid Accounts) |
| CVE-2025-13064 | High | AXIS Camera Station Pro | < 6.14 | [Axis Trust Center](https://www.axis.com/about-axis/cybersecurity) | Early 2026 | T0866 (Exploitation of Remote Services) |

**Key Context:**
- CVE-2025-30023: **Critical (9.0)** RCE via Axis.Remoting protocol (authenticated)
- CVE-2025-0324: **Critical (9.4)** privilege escalation in VAPIX framework
- No Axis CVEs currently in CISA KEV catalog
- Axis is a CISA "Secure by Design" pledge participant

### 5.3 HID / Mercury Access Control

| CVE ID | CVSS | Affected Product | Firmware/Version | Advisory URL | Disclosure Date | ATT&CK ICS Technique |
|--------|------|-----------------|-----------------|-------------|----------------|----------------------|
| CVE-2022-31481 | 10.0 | HID Mercury Intelligent Controllers | Multiple | [CISA Advisory (2022)](https://www.cisa.gov/news-events/ics-advisories) | Jun 2022 | T0866 (Exploitation of Remote Services) |
| CVE-2022-31479 | 9.8 | HID Mercury Intelligent Controllers | Multiple | [CISA Advisory (2022)](https://www.cisa.gov/news-events/ics-advisories) | Jun 2022 | T0871 (Execution through API) |
| (+ 6 additional 2022 CVEs) | High–Critical | HID Mercury Controllers | Multiple | [Carrier/LenelS2](https://www.carrier.com) | Jun 2022 | Various |

**Key Context:**
- **Eight critical CVEs** discovered in 2022 by Trellix researchers — buffer overflows, command injection, path traversal
- No **new** CVEs in 2024-2025 specific to Mercury hardware
- Many field deployments remain unpatched on older firmware
- Affects OEM partners: Carrier/LenelS2, Genetec, and others
- **Legacy risk**: Controllers running pre-2022 firmware are fully exploitable

### 5.4 Verkada Cameras

| Status | Details |
|--------|---------|
| **No new CVEs (2024-2025)** | No public CVEs or breaches reported |
| **2021 Breach** | Major breach via internal support tools — live feed access |
| **2024 FTC Settlement** | $2.95M penalty; mandatory third-party audited InfoSec program |
| **Certifications** | ISO/IEC 27001, 27017, 27018 (2024); ISO/IEC 27701 (2025) |

---

## 6. DCIM / OT Monitoring

### 6.1 Schneider Electric EcoStruxure IT Data Center Expert

| CVE ID | CVSS | Affected Product | Firmware/Version | Advisory URL | Disclosure Date | ATT&CK ICS Technique |
|--------|------|-----------------|-----------------|-------------|----------------|----------------------|
| CVE-2025-50121 | Critical | EcoStruxure IT DCE | ≤ 8.3 | [Schneider SEVD](https://www.se.com/ww/en/work/support/cybersecurity/security-notifications.jsp) | Jul 2025 | T0871 (Execution through API) |
| CVE-2025-50122 | Critical | EcoStruxure IT DCE | ≤ 8.3 | [Schneider SEVD](https://www.se.com/ww/en/work/support/cybersecurity/security-notifications.jsp) | Jul 2025 | T0859 (Valid Accounts) |
| CVE-2025-50123 | Critical | EcoStruxure IT DCE | ≤ 8.3 | [Schneider SEVD](https://www.se.com/ww/en/work/support/cybersecurity/security-notifications.jsp) | Jul 2025 | T0866 (Exploitation of Remote Services) |
| CVE-2025-50124 | Critical | EcoStruxure IT DCE | ≤ 8.3 | [Schneider SEVD](https://www.se.com/ww/en/work/support/cybersecurity/security-notifications.jsp) | Jul 2025 | T0866 (Exploitation of Remote Services) |
| CVE-2025-50125 | Critical | EcoStruxure IT DCE | ≤ 8.3 | [Schneider SEVD](https://www.se.com/ww/en/work/support/cybersecurity/security-notifications.jsp) | Jul 2025 | T0866 (Exploitation of Remote Services) |
| CVE-2025-6438 | High | EcoStruxure IT DCE | ≤ 8.3 | [Schneider SEVD](https://www.se.com/ww/en/work/support/cybersecurity/security-notifications.jsp) | 2025 | T0859 (Valid Accounts) |

**Key Context:**
- **Five critical CVEs** in EcoStruxure IT Data Center Expert ≤ 8.3 — OS command injection, insufficient entropy (root password discovery), RCE
- Remediation: Upgrade to **version 9.0 or later**
- This is the DCIM platform used to monitor power, cooling, and environmental sensors in datacenters

### 6.2 Schneider EcoStruxure Power Monitoring Expert (PME)

| CVE ID | CVSS | Affected Product | Firmware/Version | Advisory URL | Disclosure Date | ATT&CK ICS Technique |
|--------|------|-----------------|-----------------|-------------|----------------|----------------------|
| CVE-2025-54923 | High | PME / EPO / PSO | 2022–2024 R2 | [SEVD-2025-224-02](https://www.se.com/ww/en/work/support/cybersecurity/security-notifications.jsp) | 2025 | T0866 (Exploitation of Remote Services) |
| CVE-2025-54924 | High | PME / EPO / PSO | 2022–2024 R2 | [Schneider SEVD](https://www.se.com/ww/en/work/support/cybersecurity/security-notifications.jsp) | 2025 | T0882 (Theft of Operational Info) |
| CVE-2025-54925 | High | PME / EPO / PSO | 2022–2024 R2 | [Schneider SEVD](https://www.se.com/ww/en/work/support/cybersecurity/security-notifications.jsp) | 2025 | T0882 (Theft of Operational Info) |
| CVE-2025-54926 | High | PME / EPO / PSO | 2022–2024 R2 | [Schneider SEVD](https://www.se.com/ww/en/work/support/cybersecurity/security-notifications.jsp) | 2025 | T0866 (Exploitation of Remote Services) |
| CVE-2025-54927 | High | PME / EPO / PSO | 2022–2024 R2 | [Schneider SEVD](https://www.se.com/ww/en/work/support/cybersecurity/security-notifications.jsp) | 2025 | T0882 (Theft of Operational Info) |

**Key Context:**
- Deserialization of untrusted data, SSRF, and path traversal across PME versions 2022–2024 R2
- PME monitors electrical distribution in datacenters — compromise could mask power anomalies

### 6.3 Vertiv Liebert / IntelliSlot

| CVE ID | CVSS | Affected Product | Firmware/Version | Advisory URL | Disclosure Date | ATT&CK ICS Technique |
|--------|------|-----------------|-----------------|-------------|----------------|----------------------|
| CVE-2025-46412 | Critical | Vertiv UPS Management Cards | Multiple | [Vertiv Security Center](https://www.vertiv.com/en-us/support/security-support-center) | 2025 | T0859 (Valid Accounts) |
| CVE-2025-41426 | Critical | Vertiv UPS Management Cards | Multiple | [Vertiv Security Center](https://www.vertiv.com/en-us/support/security-support-center) | 2025 | T0866 (Exploitation of Remote Services) |

**Key Context:**
- CVE-2025-46412: Authentication bypass on Vertiv UPS webserver
- CVE-2025-41426: Stack-based buffer overflow → code execution on UPS management cards
- Identified by Claroty researchers (June 2026 disclosure)
- IntelliSlot cards (RDU101, RDU120, Unity) should be checked for firmware updates

---

## 7. Industrial Network Equipment

### 7.1 Moxa Industrial Switches/Routers

| CVE ID | CVSS | Affected Product | Firmware/Version | Advisory URL | Disclosure Date | ATT&CK ICS Technique |
|--------|------|-----------------|-----------------|-------------|----------------|----------------------|
| **CVE-2024-9138** | **8.6 (v4) / 7.2 (v3)** | EDR-810/8010, EDR-G902/G9004/G9010, EDF-G1002-BP, NAT-102, OnCell G4302-LTE4 | Multiple | [MPSA-241155](https://www.moxa.com/en/support/product-support/security-advisory/mpsa-241155) | Jan 2025 | T0812 (Default Credentials) |
| CVE-2024-9140 | Critical | Moxa cellular/secure routers | Multiple | [Moxa Security Advisory](https://www.moxa.com/en/support/product-support/security-advisory) | Jan 2025 | T0871 (Execution through API) |
| CVE-2025-6950 | High | Moxa network devices | Multiple | [Moxa Security Advisory](https://www.moxa.com/en/support/product-support/security-advisory) | 2025 | T0866 (Exploitation of Remote Services) |

**Key Context:**
- **CVE-2024-9138: Hard-coded credentials** — authenticated user → root-level access; highest-profile Moxa CVE
- CVE-2024-9140: Critical command injection flaw in same product family
- These devices are used as OT network switches/routers in datacenter BMS/power distribution networks
- Mitigation: Firmware update, minimize SSH exposure, implement IDS/IPS

### 7.2 Cisco Industrial Ethernet Switches

| CVE ID | CVSS | Affected Product | Firmware/Version | Advisory URL | Disclosure Date | ATT&CK ICS Technique |
|--------|------|-----------------|-----------------|-------------|----------------|----------------------|
| (IOS XE vulns) | Various | Cisco Catalyst IE3400 (IOS XE) | Multiple versions | [Cisco Security Advisories](https://sec.cloudapps.cisco.com/security/center/publicationListing.x) | 2024–2025 | T0866 (Exploitation of Remote Services) |
| CVE-2024-45490 | Medium | IE3400 (expat library) | Multiple | [Cisco Advisory](https://sec.cloudapps.cisco.com/security/center/publicationListing.x) | 2024 | T0866 (Exploitation of Remote Services) |

**Key Context:**
- **IE3000 series reached End-of-Support September 28, 2024** — no more security patches
- IE3400 runs IOS XE and inherits all IOS XE ecosystem vulnerabilities (SNMP, Web UI, etc.)
- Must migrate IE3000 → IE3300/IE3400
- Use Cisco Software Checker to verify exposure for specific IOS XE versions

---

## 8. Protocol-Level Vulnerabilities

### BACnet / Modbus — Insecure by Design

| Vulnerability Class | Protocol | Risk Level | Description | ATT&CK ICS Technique |
|---------------------|----------|-----------|-------------|----------------------|
| No Authentication | BACnet/IP, Modbus TCP | **Critical** | Any network-adjacent actor can issue commands to physical equipment | T0830 (Adversary-in-the-Middle) |
| No Encryption | BACnet/IP, Modbus TCP | **Critical** | All traffic visible in cleartext — setpoints, alarms, sensor data | T0882 (Theft of Operational Info) |
| No Integrity Checking | BACnet/IP, Modbus TCP | **High** | Commands can be spoofed or modified in transit | T0830 (Adversary-in-the-Middle) |
| Broadcast Discovery | BACnet/IP | **Medium** | BACnet "Who-Is" broadcasts reveal all devices and object properties | T0802 (Automated Collection) |
| Default Device Passwords | Both | **High** | Many BAS controllers ship with default/no credentials | T0812 (Default Credentials) |

**Mitigation:**
- **BACnet/SC (Secure Connect)** adds TLS encryption and certificate-based authentication — require for new deployments
- Deploy protocol-aware firewalls with deep packet inspection for BACnet/Modbus traffic
- Strict OT network segmentation — not VLANs on shared switches
- Implement OT-specific continuous monitoring (e.g., Nozomi, Claroty, Dragos)

---

## 9. Ransomware & Threat Actor Context

### Johnson Controls — Dark Angels Attack (September 2023)

| Attribute | Detail |
|-----------|--------|
| **Threat Actor** | Dark Angels (ransomware gang) |
| **Date** | September 2023 |
| **Initial Access** | JCI Asia-Pacific offices |
| **Dwell Time** | 8 months (Feb 1 – Sep 30, 2023) |
| **Data Exfiltrated** | 27 TB — including ICS designs, building floor plans, trade secrets |
| **Ransom Demand** | $51 million (not paid) |
| **Financial Impact** | $27M+ in incident response, remediation, lost revenue |
| **Individuals Affected** | 76 million households, 7 million small businesses |
| **Notification Delay** | 22 months (Jul 2025 notification for Sep 2023 breach) |
| **Malware** | Payloads based on Babuk and Ragnar Locker leaked source code |
| **Products Impacted** | Corporate IT infrastructure (OpenBlue/Metasys digital products reportedly not impacted) |

**Relevance to CyHAZOPs:** This attack demonstrates that BMS vendors themselves are high-value targets. Exfiltrated building floor plans and ICS design documents could enable physical attacks against datacenter customers.

---

## 10. MITRE ATT&CK for ICS Mapping

The following ATT&CK for ICS techniques are most relevant to datacenter OT attack scenarios:

| Technique ID | Technique Name | Datacenter OT Relevance |
|-------------|---------------|------------------------|
| **T0830** | Adversary-in-the-Middle | BACnet/Modbus traffic interception; HVAC setpoint manipulation |
| **T0802** | Automated Collection | BACnet device enumeration; mapping cooling/power topology |
| **T0878** | Alarm Suppression | Masking environmental alarms while manipulating cooling/power |
| **T0800** | Activate Firmware Update Mode | Halting monitoring on critical cooling/power devices |
| **T0883** | Internet Accessible Device | BMS controllers exposed to internet (common finding) |
| **T0812** | Default Credentials | Moxa hard-coded creds; APC default "apc" password; BACnet defaults |
| **T0859** | Valid Accounts | Compromised operator credentials for BMS/DCIM access |
| **T0866** | Exploitation of Remote Services | RCE on NMC cards, DCIM platforms, camera systems |
| **T0871** | Execution through API | SQL injection on Metasys; API abuse on EcoStruxure |
| **T0857** | System Firmware | ASCO firmware integrity bypass; APC TLStorm firmware signing |
| **T0839** | Module Firmware | SIPROTEC development shell; SEL undocumented features |
| **T0882** | Theft of Operational Information | Power/cooling telemetry exfiltration for reconnaissance |
| **T0814** | Denial of Service | UPS DoS; BMS resource exhaustion; relay file transfer DoS |
| **T0831** | Manipulation of Control | Changing temperature setpoints; disabling cooling; power transfer manipulation |

### Attack Scenario: Datacenter Cooling Sabotage

```
T0883 (Internet Accessible Device)
  → T0812 (Default Credentials) on exposed BMS controller
    → T0802 (Automated Collection) enumerate all BACnet devices
      → T0878 (Alarm Suppression) disable temperature alarms
        → T0831 (Manipulation of Control) raise cooling setpoints
          → Physical damage: server thermal throttling → outage
```

---

## 11. CISA ICS-CERT Advisory Index

### Relevant Advisories (2024–2026)

| Advisory ID | Vendor | Product | Key CVEs | Date |
|-------------|--------|---------|----------|------|
| ICSA-26-027-04 | Johnson Controls | Metasys ADS/ADX | CVE-2025-26385 | Jan 2026 |
| ICSA-25-322-04 | Schneider Electric | PowerChute Serial Shutdown | CVE-2024-10511 | Nov 2025 |
| ICSA-25-219-02 | Johnson Controls | FX80 / FX90 Controllers | Various | Aug 2025 |
| ICSA-25-219-05 | Packet Power | EMX / EG Power Monitors | Various | Aug 2025 |
| (SSA-400089) | Siemens | SIPROTEC 4/4 Compact | CVE-2024-52504 | 2024 |
| (SSA-687955) | Siemens | SIPROTEC 5 | CVE-2024-53648 | 2024 |
| (SSA-767615) | Siemens | SIPROTEC 5 | CVE-2024-54015 | 2024 |
| (SSA-750499) | Siemens | SIPROTEC 5 | CVE-2024-38867 | 2024 |
| (MPSA-241155) | Moxa | EDR/EDF/NAT series | CVE-2024-9138, CVE-2024-9140 | Jan 2025 |
| (SEVD-2026-041-02) | Schneider Electric | EcoStruxure Building Operation | CVE-2026-1226, CVE-2026-1227 | Feb 2026 |
| (SEVD-2025-224-02) | Schneider Electric | PME / EPO / PSO | CVE-2025-54923 – CVE-2025-54927 | Aug 2025 |
| (ETN-VA-2025-1026) | Eaton | UPS Companion | CVE-2025-59887, CVE-2025-59888 | Dec 2025 |

### Vendor Advisory Portals

| Vendor | URL |
|--------|-----|
| CISA ICS-CERT | https://www.cisa.gov/news-events/ics-advisories |
| Schneider Electric | https://www.se.com/ww/en/work/support/cybersecurity/security-notifications.jsp |
| Siemens ProductCERT | https://www.siemens.com/cert/advisories |
| Honeywell/Tridium | https://www.honeywell.com (Tridium Security Advisories) |
| Johnson Controls | https://www.johnsoncontrols.com/trust-center/cybersecurity/security-advisories |
| ABB PSIRT | https://global.abb/group/en/technology/cyber-security/alerts-and-notifications |
| Eaton | https://www.eaton.com/us/en-us/company/news-insights/cybersecurity.html |
| Moxa | https://www.moxa.com/en/support/product-support/security-advisory |
| Axis | https://www.axis.com/about-axis/cybersecurity |
| Genetec | https://docs.genetec.com/ |
| Vertiv | https://www.vertiv.com/en-us/support/security-support-center |
| SEL | https://selinc.com/support/security-notifications/external-reports/ |
| Cisco | https://sec.cloudapps.cisco.com/security/center/publicationListing.x |
| Danfoss | https://www.danfoss.com (Security Advisories) |

---

## Appendix: Vulnerability Severity Distribution

```
CVSS 9.0-10.0 (Critical):  15 CVEs  ████████████████
CVSS 7.0-8.9  (High):      22 CVEs  ██████████████████████
CVSS 4.0-6.9  (Medium):     8 CVEs  ████████
CVSS 0.0-3.9  (Low):        1 CVE   █
Protocol-level (no CVE):    5 classes █████
```

**Last updated:** 2025-06-13 | **Next review:** Quarterly or upon CISA KEV additions
