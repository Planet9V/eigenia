---
aliases: [ACME Civic Hospital, Civic Hospital, ACME Ottawa]
type: facility-reference-model-hub
category: acute-care-hospital
status: draft
domain: OT
tags: [domain/OT, domain/IoMT, facility/acme-ottawa-civic-hospital, phase/1c, sector/healthcare, sector/acute-care, sector/level-1-trauma, org/acme-demo, geo/ottawa-on]
related: ["[[Civic Hospital Architecture]]", "[[Civic Hospital Network]]", "[[Civic Hospital Equipment]]", "[[Civic Hospital HAZOPS]]", "[[Civic Hospital Threat Profile]]", "[[Civic Hospital Supply Chain]]", "[[Civic Hospital Narrative]]", "[[Civic Hospital CVE Cross-Reference]]", "[[Civic Hospital References]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# ACME Ottawa Civic Hospital

**Demo Overlay**: This reference model is built from public-source research on The Ottawa Hospital — Civic Campus (1053 Carling Ave; real, publicly-funded MOH/Ontario Health, ~600 beds, Level 1 trauma). TOH is unrelated to ACME or OXOT; the architecture is from public TOH/Ontario Health publications.

## Facility Overview

**ACME Ottawa Civic Hospital** is a fictional acute-care, Level 1 trauma center serving a regional population of 500,000+. On any given day, the facility manages:

- 12 ED trauma bays (motor-vehicle collisions, penetrating injuries, falls)
- 40 ICU beds (ventilator-dependent, post-surgical, critical care)
- 8 operating rooms (100+ surgical procedures weekly)
- Laboratory (5,000 tests daily)
- Imaging (CT, MRI, ultrasound; 200+ studies daily)

**Clinical Specialties**: Trauma, cardiac care, emergency medicine, critical care, imaging, laboratory  
**Funding Model**: Ontario Health / Ministry of Health (public MOH mandate)  
**Accreditation**: Ontario Hospital Association (OHA) member

## Asset Inventory

- **1,247 networked medical devices** across 8 functional zones
- **470 bedside monitors**, pumps, ventilators
- **145 critical OR/ICU equipment** (anesthesia, ECMO, surgical infrastructure)
- **78 imaging systems** (CT, MRI, PACS, ultrasound)
- **92 laboratory analyzers**
- **156 network infrastructure devices**
- **189 clinical workstations**
- **48 BMS/facility equipment**

## Regulatory Framework

- [[IEC 62443]] — Industrial control systems security (SL-T 2–3 target)
- [[IEC 80001]] — Healthcare IoMT network security
- [[ISO 14971]] — Medical device risk management
- [[HIPAA]] — US healthcare baseline (adopted by Canadian hospitals)
- [[PHIPA]] — Ontario personal health information protection
- [[HHS-405d]] — Healthcare cybersecurity performance goals (best-practice parity)

## Threat Landscape

ACME faces six active threat groups (healthcare #1 target globally):

1. **[[BlackCat]] (ALPHV)** — $22M Change Healthcare precedent (March 2024)
2. **[[LockBit]]** — SickKids Hospital shutdown (Dec 2022), Southwestern Ontario hospitals (Oct 2024)
3. **[[Royal Ransomware]]** — Healthcare-focused payment system disruption
4. **[[Cl0p]] / Clop** — MOVEit zero-day exploiter (2023–2024 Eastern Ontario wave)
5. **[[Conti Successors]]** — Leaked playbook reuse
6. **[[NoName057]] / [[KillNet]]** — Russia-aligned DDoS hacktivists

## Key Risk Vectors

- **T1199**: Trusted relationship exploitation (Epic, [[Philips Healthcare]], [[GE Healthcare]] remote access)
- **T1078**: Credential compromise (clinician AD accounts, phishing campaigns)
- **T1486/T1485**: Ransomware + backup destruction ([[VMware ESXi]], [[Veeam]])
- **T1567**: Exfiltration to cloud (genomic research, PHI bulk downloads)
- **T1565**: Lab middleware data tampering (LIS, analyzer integration)

## Architecture Layers

1. **Layer 0**: Patient bedside ([[Philips IntelliVue]], [[GE Carescape]], [[Baxter Sigma Spectrum]], [[BD Alaris]])
2. **Layer 1**: Clinical environment (BMS, HVAC, fire/life safety)
3. **Layer 2**: Clinical IT ([[Epic Hyperspace]], PACS, lab interfaces, pharmacy automation)
4. **Layer 3**: Enterprise IT (finance, HR, supply chain)
5. **Layer 3.5**: Internet DMZ (patient portal, telehealth, Ontario Health gateways)

## Board-Level Priorities (Next 12 Months)

1. **Epic VPN & Privilege Access Management** ($500K–$1M, 6 months) — MFA + PAM for remote access
2. **Device Firmware Audit & Control** ($250K, 9 months) — Signed firmware, supply-chain verification
3. **Forescout Medical Device Discovery** ($400K, 6 months) — Continuous asset inventory + vulnerability scanning
4. **Immutable Backups** ($600K, 12 months) — Veeam immutable vault, quarterly restore drills
5. **BMS Segmentation & Interlocking** ($300K, 12 months) — Air-gap, passive safety, firmware verification

## Pages in This Reference Model

| Page | Purpose |
|------|---------|
| [[Civic Hospital Architecture]] | IEC 80001 layers, IEC 62443 zones, SL-T targets |
| [[Civic Hospital Network]] | VLANs, IP ranges, protocols, conduits, DMZ, remote access |
| [[Civic Hospital Equipment]] | 1,247 assets: vendors, models, firmware, CVE exposure |
| [[Civic Hospital HAZOPS]] | 10 scenarios, RAMS profiles, FMECA, safety functions, clinical KPIs |
| [[Civic Hospital Threat Profile]] | 6 threat groups, kill chains, bypass paths, MITRE ATT&CK mapping |
| [[Civic Hospital Supply Chain]] | 3-tier upstream, downstream, geopolitical, regulatory regime |
| [[Civic Hospital Narrative]] | Board-readable executive summary, consequence stories, decision framework |
| [[Civic Hospital CVE Cross-Reference]] | Equipment → CVE matrix, threat-actor correlation, SQL templates |
| [[Civic Hospital References]] | Standards, vendor docs, threat intelligence, Canadian regulatory resources |

---

**Last Updated**: 2026-05-09  
**Phase**: 1c (OXOT demo)  
**Status**: Reference model (non-operational, synthetic data)

> **Disclaimer**: ACME is fictional. The Ottawa Hospital (TOH) Civic Campus is a real, publicly-funded facility unrelated to ACME or OXOT. This reference model is for architectural demonstration only.
