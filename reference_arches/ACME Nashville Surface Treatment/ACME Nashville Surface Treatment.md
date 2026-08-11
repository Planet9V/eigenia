---
aliases:
  - ACME Nashville
  - Nashville Surface Treatment
  - ACME Surface Finishing
type: facility-reference-model-hub
category: surface-treatment
status: draft
domain: OT
tags:
  - domain/OT
  - facility/acme-nashville-surface-treatment
  - phase/1c
  - sector/surface-treatment
  - sector/metal-finishing
  - org/acme-demo
  - geo/nashville-tn
related:
  - "[[ACME Ottawa Data Center]]"
  - "[[ACME Ottawa Substation]]"
  - "[[ACME Ottawa Civic Hospital]]"
  - "[[ACME Ottawa Pediatric Medical Center]]"
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. This reference model is built from public-source research on [[Aalberts Surface Technologies]]' Nashville TN subsidiary (real anodizing/plating/electroless-nickel/coatings business). Aalberts NL parent is unrelated to ACME or OXOT.

## Overview

**ACME Nashville Surface Treatment** is a ~100,000 sq ft aerospace and automotive supplier facility in Nashville, TN (36.2091°N, 86.7474°W). The facility processes high-value metallic components (landing gear fasteners, avionics brackets, structural aluminum) through electrochemical surface-treatment processes: anodizing, electroless nickel plating, hard-coat anodizing, and specialty corrosion-resistant coatings.

**Operating Profile**:
- **Throughput**: ~500 tons/month of finished aerospace/industrial components
- **Customers**: Boeing, Northrop Grumman, Lockheed Martin (aerospace); Magna, Bosch, ZF (automotive)
- **Regulatory**: EPA Clean Water Act, OSHA PSM, NFPA 70, [[IEC 61508]] (SIL 2 safety interlocks)
- **Certifications**: Nadcap Chemical Processing, AS9100, IATF 16949, CMMC L2 (required)

---

## Content Index

### Architecture & Design
- [[Nashville Architecture]] — Purdue Model (L0–L5), [[IEC 62443]] zones, SL-T security levels
- [[Nashville Network]] — VLANs, IP ranges, protocols, conduits, remote access architecture
- [[Nashville Equipment]] — Real vendors, models, firmware strings; Purdue L0–L3; CVE cross-reference

### Safety & Risk
- [[Nashville HAZOPS]] — 12 hazard scenarios, RAMS profile, FMECA, safety functions
- [[Nashville Threat Profile]] — 5 ATT&CK groups ([[BlackCat]], [[Volt Typhoon]], [[APT41]], [[LockBit]], [[APT33]]), TTPs, remote-access bypass paths

### Supply Chain & Narrative
- [[Nashville Supply Chain]] — 3-tier upstream (chemicals, rectifiers, raw materials), downstream (Tier-1 customers), geopolitical risk
- [[Nashville Narrative]] — Board-readable executive story: cyber-physical risk, regulatory imperatives, 90-day hardening roadmap

### References & Cross-Correlation
- [[Nashville CVE Cross-Reference]] — Equipment → CVE mapping, [[ATT&CK]] technique correlation, SQL templates for forge.cve_records
- [[Nashville References]] — Consolidated citations: standards, regulatory, vendors, threat intelligence

---

## Key Risk Profile

| Dimension | Status | Impact |
|-----------|--------|--------|
| **Cyber-Physical** | ⚠️ Critical | Rectifier firmware tampering → off-spec aerospace parts; ransomware → FAA traceability loss |
| **Geopolitical** | 📈 Escalating | Indonesia nickel quota -31%; China refining dominance (~75%); tariff volatility |
| **Regulatory** | ⏳ Imminent | CMMC L2 mandatory Q4 2025; aerospace customer mandate; ITAR compliance required |
| **Threat Actors** | 🎯 5 groups active | BlackCat ($500K+ extortion), Volt Typhoon (espionage), APT41 (IP theft), LockBit (disruption), APT33 (strategic disruption) |

**Annual Risk Consequence (if materializes)**: $10–15M (combined downtime, liability, recall, regulatory penalty, reputation)

---

## Board Priorities (90 Days)

| Priority | Action | Owner | Cost | Upside |
|----------|--------|-------|------|--------|
| 🔴 **1-CRITICAL** | Upgrade [[Fortinet]] FortiGate to 7.2.5 LTS | IT/OT Lead | $5K | Eliminates primary initial-access vector |
| 🔴 **1-CRITICAL** | Migrate "production" AD to per-user + [[MFA]] | IT Lead | $10K | Blocks lateral movement via pass-the-hash |
| 🟠 **2-HIGH** | Rotate FactoryTalk service creds → Entra managed identity | IT Lead | $8K | Eliminates historian privilege escalation |
| 🟠 **2-HIGH** | Deploy ICS firewall rules; isolate OT VLAN; encrypt [[Modbus]] via [[IPSec]] | Network Lead | $50K | Blocks AitM + command injection |
| 🟡 **3-MEDIUM** | Air-gap MES historian backup to WORM storage; test 4-hr RTO | IT/OT Lead | $30K | Preserves recovery path; meets CMMC L2 |

**Total Investment**: ~$100K | **Payoff**: CMMC L2 certification + 90% risk reduction on top 3 threat scenarios.

---

## Navigation

- **This Facility**: [[Nashville Architecture]], [[Nashville Network]], [[Nashville Equipment]], [[Nashville HAZOPS]], [[Nashville Threat Profile]], [[Nashville Supply Chain]], [[Nashville Narrative]], [[Nashville CVE Cross-Reference]], [[Nashville References]]
- **Other Phase 1c Facilities**: [[ACME Ottawa Data Center]], [[ACME Ottawa Substation]], [[ACME Ottawa Civic Hospital]], [[ACME Ottawa Pediatric Medical Center]]
- **OXOT Resources**: [[IEC 62443]], [[Purdue Model]], [[MITRE ATT&CK ICS]]

---

**Document Type**: Facility Reference Model Hub  
**Phase**: 1c (S270, 2026-05-09)  
**Status**: Draft (seeded demo customer)  
**Composition**: 10 wiki pages synthesized from public-source research on Aalberts Surface Technologies Nashville TN
