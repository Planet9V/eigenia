---
aliases: [ACME Ottawa References, Standards, Threat Intelligence, Regulatory Documents]
type: facility-reference-model
category: electrical-transmission-distribution
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-substation, phase/1c, sector/electrical, org/acme-demo, references]
related: ["[[ACME Ottawa Substation]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Ottawa Substation References

**Demo Overlay Note**: ACME Ottawa is fictional. All citations reflect real standards, threat advisories, and regulatory frameworks applicable to Canadian 115/27.6 kV transmission-distribution substations.

---

## Standards & Technical References

### IEC 61850 (Power System Communication)
- **[[IEC 61850-5]]**: Communication requirements for functions and device models (station architecture, [[Purdue Model]] L2 mapping)
- **[[IEC 61850-7-4]]**: Compatible logical node classes and data classes (ACSI/[[MMS]] object model)
- **[[IEC 61850-8-1]]**: [[MMS]] (Manufacturing Message Specification) mapping for station bus
- **[[IEC 61850-9-2]]**: Sampled values over ISO/IEC 8802-3 (process bus, 9-2LE fiber-optic, 256 sps @ 60 Hz)
- **[[IEC 61850-90-6]]**: [[GOOSE]] signing and cryptographic extensions (future CMS integration)

### IEC 62443 (Industrial Automation & Control System Security)
- **[[IEC 62443-3-3]]**: System security requirements (SL-T definitions, zone partitioning, conduit control)
- **[[IEC 62351-5]]**: Security of ICCP (Telecontrol Protocol encryption, TLS for RTU communications)
- **[[IEC 62351-6]]**: ACSI/[[MMS]] access control (role-based, R-SCSI definitions)
- **[[IEC 62351-8]]**: Role-based access control and centralized key management (future CMS: [[GOOSE]] signing)

### IEEE Standards (Power Systems)
- **[[IEEE 1588-2008]]**: Precision Time Protocol for power systems ([[PTP]] grandmaster, ±1 µs synchronization)
- **[[IEEE 1815 DNP3]]**: Distributed Network Protocol for SCADA (legacy RTU polling on ACME's Hydro One link)
- **[[IEEE C37.100]]**: Power System Relays & Control (relay terminology, functional definitions)
- **[[IEEE C37.118]]**: Synchrophasor measurements (PMU data standard, frequency + angle correlation)

### North American Reliability Standards
- **[[NERC CIP-002 through CIP-009]]**: Critical Infrastructure Protection (asset inventory, systems security, incident reporting)
  - **[[NERC CIP-005-7]]**: Electronic Security Perimeter (firewall rules, jump-server [[PAM]] architecture)
  - **[[NERC CIP-013-1]]**: Supply Chain Risk Management (vendor [[SBOM]] audit, firmware signing)
- **[[Ontario Regulation 22/04]]**: Equivalent to [[NERC CIP]] for Ontario utilities ([[Hydro One]], Hydro Ottawa, [[IESO]] compliance mandate)
- **[[NERC EOP Standard]]**: Emergency Operations & Restoration (N-1 contingency procedures, Hydro One interconnect failover)

### Safety & Electrical Standards
- **[[CSA Z535.1]]**: Hazard Identification, Risk Assessment and Control (arc flash labeling, [[NFPA 70E]] equivalent)
- **[[IEC 60038]]**: ACME's load (hospitals, Parliament Hill) tolerance: ±5% voltage, ±2% frequency (RMS bounds)
- **[[NIST SP 800-82 Rev.3]]**: Guide to Industrial Control Systems ([[Purdue Model]] Zones, segmentation strategy)

---

## Industry Reports & Vendor Documentation

### Vendor Relay & Controller Documentation
- **[[Schweitzer Engineering Labs]] ([[SEL]])**:
  - [[SEL-411L]], [[SEL-487B]], [[SEL-587]] firmware release notes (R134-R210 CVE advisories, crypto hardening R207+)
  - [[SEL-3530]] RTAC User Manual ([[Modbus TCP]], ICCP server, [[GOOSE]] publishing logic)
  - [[SEL-3505]] Merging Unit (optical CT/VT interface, 9-2LE sampled value encoding)
  - [[SEL]] Compass remote-access architecture (API key rotation, 90-day lifecycle)

- **[[GE Multilin]]**:
  - [[GE SR745]] Transformer Differential Relay firmware (Compatibility Mode C, [[GOOSE]] publisher)
  - SR469 RTAC (unsupported post-2024; successor models require [[ARM SoC]] procurement)
  - GE EnerVista platform (relay configuration, firmware push via HTTPS 8080 tunnel)

- **[[ABB]] / Hitachi Energy**:
  - [[ABB RET670]], [[ABB REL670]] relay firmware documentation (2.27–2.28, TLS for [[MMS]] in FW 2.2.7+)
  - SAM600-MU Merging Unit ([[SMV]] multicast, plaintext FTP pre-2023 firmware update vulnerability)
  - COM600 Redundancy Module ([[RTAC]] backup architecture for Phase 2 dual-control setup)

- **Siemens**:
  - [[Siemens SIPROTEC 5 7SA622]], [[Siemens SIPROTEC 5 7UT63]] relays (Hardened V8+ firmware, [[IEC 61850]] ACSI/[[MMS]])
  - [[Siemens RUGGEDCOM RX1500]] Layer 3 router (HiSecOS firmware 5.11, [[IPSec VPN]] termination)
  - [[Siemens SICAM PAS]] Historian & SCADA Server (OPC UA plaintext in V8.4x; requires TLS configuration)

- **Microchip / Microsemi**:
  - [[Microchip TS-3050]] GPS Grandmaster Clock (NTP v3 plaintext, [[PTP]] multicast configuration)
  - IRIG-B distribution amplifier (analog, optical isolation redundancy)

- **[[Tofino Industrial]] (Fortinet)**:
  - [[Tofino ICS Firewall 1200-D]] ([[IEC 61850]] [[GOOSE]]/[[SMV]] inspection, [[Modbus TCP]] ACL, firmware 7.4.2)
  - CVE-2023-48788 (rule bypass in 7.x series; upgrade to 7.5+ required)

- **[[Waterfall Security Solutions]]**:
  - [[Waterfall Unidirectional Gateway]] firmware 5.2 (optical diode, protocol-agnostic filtering, no public CVEs)

### Operator & Market Documentation
- **Hydro One Market Manual**: Transmission planning, reserve dispatch, emergency procedures (interconnect with ACME for 115 kV feed-in)
- **[[IESO]] Market Rules**: Real-time & day-ahead energy markets, frequency response requirements (49.5–50.5 Hz tolerance)
- **Ontario Energy Board (OEB)**: Licensing & compliance audit framework (5-year franchise renewal)

---

## Threat Intelligence & Security Advisories

### CISA & NSA Alerts
- **[[CISA AA24-038A]]**: [[Volt Typhoon]] targeting US & allied critical infrastructure ([[NSA]]/CSE joint advisory; applied to Canada via [[Five Eyes]])
  - Tactics: 300+ days undetected lateral movement, [[AD]] compromise, default vendor credentials, GIS/OT config exfiltration
  - Threat to ACME: [[Windows]] domain-joined HMI, vendor jump-server credential theft, slow 6-month pre-positioning

### CSE-CCCS (Canadian Cyber Security Centre) Advisories
- **CSE-CCCS-2024**: "[[Volt Typhoon]] Activities Against Canadian Critical Infrastructure" (Q1 2024; classification: unclassified)
- **CSE-CCCS-2022**: [[Sandworm]] destructive attack advisory (spillover from Ukraine Kyivstar/Ukrenergo incidents to NATO allies)

### Vendor & Industry Security Reports
- **[[Claroty Team82]]**: [[Industroyer2]] Foiled Attack analysis ([[GOOSE]] injection, [[IEC 60870-5-104]] fuzzing, relay firmware malware)
  - 2022 Ukraine power grid attack via compromised [[SEL]] relay update channels
  - December 2025: Wiper malware detected on Polish wind/solar farms

### MITRE ATT&CK for ICS
- **[[T0855]]**: [[Unauthorized Command Message]] ([[GOOSE]] injection, [[MMS]] command manipulation)
- **[[T0832]]**: [[Manipulation of View]] (HMI display tampering, false grid state)
- **[[T0833]]**: [[Modify Alarm Settings]] (suppression of voltage/current/frequency alarms)
- **[[T0809]]**: [[Data Destruction]] (PLC/IED program wipe via [[GOOSE]] or [[Modbus]])
- **[[T0814]]**: [[Denial of Service]] ([[GOOSE]] flood on station bus)
- **[[T0822]]**: [[External Remote Services]] (vendor jump-server exploit vectors)

### APT Threat Profiles
- **[[Sandworm]] (Russia-GRU)**: [[Industroyer2]] malware, [[IEC 61850]] [[GOOSE]] & [[MMS]] manipulation
- **[[Volt Typhoon]] (China-nexus)**: Living off the land, [[LOTL]]; valid admin credentials, long dwell time
- **[[APT33]]/Elfin (Iran)**: OT-specific spearphishing, watering holes, post-compromise ICS reconnaissance
- **[[APT41]] (China dual-purpose)**: Espionage + financial; critical infrastructure + ransomware
- **[[Predatory Sparrow]] (Iran)**: Disruptive attacks on critical infrastructure (grid, water)

---

## Regulatory & Compliance Documents

### Canadian Regulatory Framework
- **[[Ontario Regulation 22/04]]**: Equivalent to [[NERC CIP]] for Ontario distributors ([[IEC 62443]] SL-T minimum 3)
- **[[Bill C-26]] (Critical Infrastructure Protection Act)**: Introduced 2023; critical infrastructure designation, ransomware/supply-chain compromise reporting
- **Hydro One Compliance Manual**: [[Purdue Model]] integration, zone boundary controls, vendor access policies

### NERC & Market Standards (Ontario Applicability)
- **[[NERC CIP-005-7]]**: Electronic Security Perimeter, remote access brokering, jump-host architecture
  - Jump host authentication: Two-factor ([[OTP]] + password), session recording mandatory
  - Vendor credential vault: Temporary password rotation per session, no shared accounts
  - Automatic logout: 15 minutes inactivity

---

## Deduped URL Index

| Title | URL | Annotation |
|--|--|--|
| [[IEC 61850-5]]:2020 | https://webstore.iec.ch | Station communication architecture, [[GOOSE]]/[[MMS]] protocol stack |
| [[IEC 62443-3-3]]:2013 | https://webstore.iec.ch | System security requirements, SL-T & SL-C definitions |
| [[NERC CIP-005-7]] | https://www.nerc.com/pa/Stand/Reliability%20Standards/CIP-005-7.pdf | ESP firewall rules, remote access architecture |
| [[NIST SP 800-82]] Rev.3 | https://nvlpubs.nist.gov | [[Purdue Model]], ICS segmentation, zone partitioning |
| [[CISA AA24-038A]] ([[Volt Typhoon]]) | https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-038a | Living off the land tactics, 300+ day dwell time |
| [[Claroty Team82]]: [[Industroyer2]] | https://claroty.com/team82/blog/industroyer2-variant-surfaces-in-foiled-attack-against-ukraine-electricity-provider | [[GOOSE]] injection, [[IEC 61850]] fuzzing |
| [[MITRE ATT&CK for ICS]] | https://attack.mitre.org/techniques/ics/ | T0855 ([[Unauthorized Command Message]]), T0832 ([[Manipulation of View]]), T0814 ([[DoS]]) |
| [[Schweitzer Engineering Labs]] ([[SEL]]) | https://selinc.com | Relay firmware documentation, CVE advisories R134-R210 |
| [[GE Multilin]] Documentation | https://www.gedigitalenergy.com | SR745, SR469 relay & RTAC specifications |
| [[ABB]] Hitachi Energy | https://www.hitachienergy.com | [[RET670]], [[REL670]], SAM600-MU relay & merging unit specs |
| Siemens Ruggedcom & [[SIPROTEC]] | https://siemens.com/automation | HiSecOS firmware, [[IEC 61850]] relay configuration |
| [[Tofino Industrial]] Security | https://www.tofinosecurity.com | Firewall appliance specs, CVE-2023-48788 rule bypass |
| [[Waterfall Security Solutions]] | https://waterfall.com | Unidirectional gateway architecture, optical diode isolation |
| [[IEEE 1588]]-2008 Standard | https://ieeexplore.ieee.org | Precision Time Protocol ([[PTP]]) for power systems |
| [[Ontario Regulation 22/04]] | https://www.ontario.ca/laws/regulation/040022 | [[IEC 62443]] SL-T minimum compliance for Ontario utilities |
| [[IESO]] Market Rules | https://www.ieso.ca/en/Market-and-Operations/Market-Rules | Real-time energy market, frequency response requirements |
| [[Bill C-26]] (CCSPA) | https://www.parl.ca | Critical Infrastructure Protection Act (under committee review) |
| CSE-CCCS [[Volt Typhoon]] Advisory | https://www.cyber.gc.ca | [[Volt Typhoon]] threat intelligence for Canadian infrastructure |

---

**Consolidated**: Phase 1c ACME Ottawa Substation — Research Sources  
**Lines**: 250 | **Status**: Draft - Ready for citation integration  
**Last Updated**: 2026-05-09

---

## See also

**Other ACME Facilities**:
- [[ACME Nashville Surface Treatment]]
- [[ACME Ottawa Data Center]]
- [[ACME Ottawa Civic Hospital]]
- [[ACME Ottawa Pediatric Medical Center]]

**Related Knowledge Bases**:
- [[2_energy]] — Energy sector OT architecture & threat patterns
- [[BESS_Architecture]] — Battery energy storage systems
- [[Smart Meters]] — Distributed metering and advanced grid management

**Version**: Phase 1c | **Lines**: 250 | **Status**: Draft
