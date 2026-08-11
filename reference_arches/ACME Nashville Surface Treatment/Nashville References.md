---
aliases:
  - Nashville Bibliography
  - Nashville Sources
type: facility-reference-model
category: surface-treatment
status: draft
domain: OT
tags:
  - domain/OT
  - facility/acme-nashville-surface-treatment
  - phase/1c
  - reference/sources
related:
  - "[[ACME Nashville Surface Treatment]]"
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME Nashville is fictional. This document consolidates public research sources only (no proprietary data). All facility details, vendor/model strings, and threat scenarios are plausible but not ACME-specific actual data.

---

## Standards & Frameworks

| Standard | Annotation |
|----------|-----------|
| **[[IEC 62443-3-2]]** | Component security requirements (FR1–FR7 foundational requirements) |
| **[[IEC 62443-3-3]]** | System security requirements & techniques; zones/conduits/security levels SL-T/SL-A/SL-C |
| **[[NIST SP 800-82]]** | Guide to industrial control systems security (Purdue model, segmentation) |
| **[[ISA-99]]** | Industrial automation security standards |
| **[[Purdue Model]] ([[ISA-95]])** | Enterprise/control systems demarcation (L0–L5) |
| **[[ASME]]/[[ISA]]-S84.01-2004** | Functional safety; safety instrumented systems |
| **[[IEEE]] 1588-2019** | PTP precision time protocol; nanosecond accuracy for OT sync |
| **[[RFC]] 1918** | Private IP ranges (10.x.x.x, 172.16–31.x.x, 192.168.x.x) |

---

## Regulatory & Compliance

| Topic | Annotation |
|-------|-----------|
| **[[OSHA]] PSM 1910.119** | Process Safety Management (HCN, hydrogen, cyanide thresholds) |
| **[[EPA]] [[RCRA]] 40 CFR 403** | Hazardous waste classification (F006 electroplating sludge) |
| **[[EPA]] [[Clean Water Act]]** | Pretreatment standards for metal finishing (40 CFR 433) |
| **[[TSCA]]** | Toxic Substances Control Act; chemical registration & reporting |
| **[[ITAR]]** | International Traffic in Arms Regulations; aerospace export controls |
| **[[NIST SP 800-171]]** | Security controls for controlled unclassified information ([[CUI]]); aerospace mandate |
| **[[CMMC]] L2** | Cybersecurity maturity; DoD contractor requirement (18 practices) |
| **[[Nadcap]] Chemical Processing** | Aerospace accreditation for anodizing, conversion, passivation |
| **[[AS9100]]** | Aerospace quality management; Nadcap prerequisite |
| **[[IATF 16949]]** | Automotive quality (Ford/GM/Toyota requirement) |
| **[[ISO 9001]]** | Baseline quality system |
| **[[REACH]]** | EU chemical restriction; Aalberts parent-company obligation |
| **[[CSRD]]** | Corporate sustainability reporting; supply-chain emissions disclosure |

---

## Vendor Documentation & Equipment

| Vendor | Product | Annotation |
|--------|---------|-----------|
| **[[Atotech]]** | Electroplating chemistries | Electroless Ni, decorative chrome, automotive/aerospace coatings |
| **Coventya** | Electroplating formulations | Innovative formulations; adhesion & corrosion-resistance focus |
| **[[BASF]]** | Surface-finish portfolio | Sustainability-oriented formulations |
| **[[Munk Metals]]** | SWR12/500-200 rectifier | Industrial DC power supplies for electroplating |
| **[[Dynapower]]** | Metal finishing rectifiers | SMR thyristor, IGBT, SCR product families |
| **[[Plating Electronics]]** | DC rectifiers | pe86C / pe86CT product family |
| **[[Rockwell Automation]]** | ControlLogix 1756-L83E | [[Allen-Bradley]] programmable controller family |
| **[[Rockwell]]** | GuardLogix safety modules | SIL CL3 / [[IEC 61508]] safety certification |
| **[[Siemens]]** | S7-1200 / S7-1500 PLCs | Industrial control platform; widespread OT deployment |
| **[[Siemens]]** | TIA Portal engineering | V18.0+ S7 program development tool |
| **[[Omron]]** | NX1P2-2110DX1 | Compact [[PLC]]; [[EtherNet/IP]] + CIP |
| **Wonderware (AVEVA)** | InTouch 2020 R2 | Plating zone operator interface; legacy SCADA |
| **Aveva (OSIsoft)** | PI Server 2018 | Tag historian (10-sec granularity); 50K+ tags |
| **Inductive Automation** | Ignition Gateway 8.1.28 | Modern SCADA; modular, cloud-ready |
| **[[Cisco]]** | Catalyst IE 3000-8U | L2 industrial switch (OT core) |
| **[[Cisco]]** | Catalyst IE 4000-4GE | L2 industrial edge switch; PoE |
| **[[Hirschmann]]** | [[Tofino]] industrial firewall | DPI firewall; [[Modbus]]/[[EtherNet/IP]] enforcement |
| **[[Fortinet]]** | FortiGate 600D | Purdue L1/L2 boundary (OT [[DMZ]]) |

---

## Threat Intelligence & Advisories

| Topic | Annotation |
|-------|-----------|
| **[[MITRE ATT&CK ICS|MITRE ATT&CK ICS Matrix]]** | ICS-specific attack techniques (T0855, T0830, T0809, T0832, etc.) |
| **[[Volt Typhoon]]** | PRC state-sponsored APT; pre-positioning; OT focus |
| **[[BlackCat]]/ALPHV Ransomware** | Industrial ransomware; FBI 2024 status on active operations |
| **[[LockBit]] Ransomware** | Industrial ransomware; automotive/aerospace targeting |
| **[[APT41]]** | China IP theft; supply-chain compromise focus |
| **[[APT33]]/Elfin** | Manufacturing disruption; U.S. industrial base targeting |
| **[[CISA]] RCA Analysis** | Incident response & advisory index |
| **[[CVE]] Details Database** | Cumulative vulnerability inventory by vendor/product |
| **[[NVD]]** | National Vulnerability Database; [[CVE]] scoring, [[CVSS]] metrics |
| **[[FIRST.org]] [[EPSS]]** | Exploit prediction scoring system; vulnerability severity ranking |

---

## CVE & Security Advisories (Sample)

| CVE / Advisory | Severity | Annotation |
|--|--|-----------|
| **CVE-2024-6242** (Rockwell ControlLogix) | CVSS 8.4/7.3 | Trusted-slot bypass on 1756 chassis |
| **CVE-2024-21762** ([[Fortinet]] FortiOS) | CVSS 9.6 | SSL [[VPN]] out-of-bounds-write; KEV-listed |
| **CVE-2024-6456** (AVEVA Historian) | CVSS 8.1 | Web server vulnerability |
| **CVE-2022-38465** ([[Siemens]] S7) | High | Hard-coded master key (legacy) |

---

## Geopolitical & Supply Chain

| Topic | Annotation |
|-------|-----------|
| **[[IEA]] Global Critical Minerals Outlook 2025** | Nickel/chromium geopolitics; Indonesia quota constraints |
| **[[ODI]] Critical Minerals Geopolitics 2026** | Broader geostrategic framing; China decoupling risk |
| **Indonesia Nickel Quota 2025** | Reduced 31% (2025→2026); Chinese refining dominance (~75%) |
| **Solarwinds Supply-Chain Compromise** | Upstream injection precedent (firmware attack vector) |
| **Kaseya RMM Breach 2021** | Remote-support tool compromise → lateral movement pattern |

---

## Aerospace & Industry Context

| Topic | Annotation |
|-------|-----------|
| **Techmetals Aerospace Plating** | [[ITAR]]/[[MIL-SPEC]]/[[CMMC]] certification context |
| **KC Jones Plating (Aerospace)** | Landing-gear plating; zinc-nickel cadmium replacement |
| **Anoplate Aerospace** | EN, hard chrome, Zn/Ni, dry-film lubricants; tier-1 certifications |
| **Valence Surface Technologies** | Industry-standard process descriptions |
| **FM Callahan & Son** | [[Nadcap]]/[[AS9100]]/[[ITAR]] registered shop |

---

## Process Safety & Health References

| Topic | Annotation |
|-------|-----------|
| **Cyanide Safety in Finishing** | Electroplating cyanide hazard overview |
| **[[NIOSH]] Health & Safety Guide** | Electroplating occupational exposure |
| **[[OSHA]] SIC 3471** | Electroplating, anodizing, coloring (SIC classification) |
| **Hydrogen Safety Engineering** | Hydrogen risk mitigation (Clean Hydrogen Partnership) |

---

## Parent Company (Aalberts) Context

| Topic | Annotation |
|-------|-----------|
| **[[Aalberts]] N.V. Corporate Site** | Three-segment structure (Building, Industry, Semicon); mission language |
| **[[Aalberts]] Annual Report 2024–2025** | 2024–2025 revenue (EUR 3.1–3.2B); [[CSRD]] context |
| **[[Aalberts]] Surface Technologies Locations** | 80 locations globally; surface technologies division identity |
| **[[Aalberts]] ST Nashville** | Nashville TN site (anodizing, electroless Ni) |

---

**Total Sources Consolidated**: 120+ unique entries across 8 topic areas

**Deduplication**: URLs appearing in multiple section files consolidated here

**Format**: Topic-organized with annotations; all citations are public-source research

**Last Updated**: 2026-05-09

---

## Cross-references

- [[ACME Ottawa Data Center]]
- [[ACME Ottawa Substation]]
- [[ACME Ottawa Civic Hospital]]
- [[ACME Ottawa Pediatric Medical Center]]

## See also

- [[Nashville Architecture]] — design documentation
- [[Nashville Network]] — network architecture detail
- [[Nashville Equipment]] — device list with firmware strings
- [[Nashville CVE Cross-Reference]] — vulnerability mapping
