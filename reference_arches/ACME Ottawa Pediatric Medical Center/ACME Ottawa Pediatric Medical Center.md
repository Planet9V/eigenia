---
aliases: [ACME Ottawa Peds, Pediatric MC Hub]
type: facility-reference-model-hub
category: pediatric-specialty-hospital
status: draft
domain: OT
tags: [domain/OT, domain/IoMT, facility/acme-ottawa-pediatric-medical-center, phase/1c, sector/healthcare, sector/pediatric, sector/research, org/acme-demo, geo/ottawa-on]
related: ["[[Pediatric MC Architecture]]", "[[Pediatric MC Network]]", "[[Pediatric MC Equipment]]", "[[Pediatric MC HAZOPS]]", "[[Pediatric MC Threat Profile]]", "[[Pediatric MC Supply Chain]]", "[[Pediatric MC Narrative]]", "[[Pediatric MC CVE Cross-Reference]]", "[[Pediatric MC References]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# ACME Ottawa Pediatric Medical Center

**Demo Overlay**: ACME Ottawa is a fictional demo facility for OXOT product demonstration, modeled on [[CHEO|Children's Hospital of Eastern Ontario]] (401 Smyth Rd, Ottawa, Ontario). This reference model synthesizes publicly available pediatric hospital architectural patterns, standards-based infrastructure design, and evidence-based threat intelligence for educational and product demonstration purposes. CHEO is unrelated to ACME and to OXOT.

---

## Quick Facts

| Field | Value |
|-------|-------|
| **Facility** | ACME Ottawa Pediatric Medical Center |
| **Location** | Ottawa, Ontario (45.3827, -75.6552) |
| **Sector** | Pediatric specialty hospital + research |
| **Licensed Beds** | ~167 (NICU 30, PICU 24, OR 6, ED 20, Inpatient 60) |
| **Funding** | Ontario Health authority (provincial healthcare) |
| **Specialty** | Pediatric acute care, neonatal critical care, pediatric surgical services, pediatric imaging, biomedical research |
| **Real-world Basis** | [[CHEO]] — Children's Hospital of Eastern Ontario |
| **Reference Incident** | [[CHEO 2018 DDoS]] incident (Oct 31, 2018; Mirai botnet; 3+ hour outage) |
| **Phase** | Phase 1c (reference design model) |
| **Generated** | 2026-05-09 |

---

## Clinical Services

### Critical Care
- **NICU** (Neonatal ICU): 30 beds for high-acuity neonates ≤30 days; ventilator-dependent, premature infants
- **PICU** (Pediatric ICU): 24 beds for pediatric critical care, ages 1 month–17 years; cardiac, trauma, post-op care

### Surgical & Procedural
- **Pediatric OR Suites**: 6 theaters (orthopedic, general, neurosurgery, cardiac, thoracic, GI)
- **Pediatric ED**: 20 emergency beds with pediatric triage and resuscitation bays

### Inpatient & Diagnostic
- **General Inpatient Wards**: 60 beds across age cohorts (infants/toddlers, school-age, adolescents)
- **Pediatric Imaging**: MRI (1.5T), CT (128-slice, low-dose), fluoroscopy, ultrasound, nuclear medicine
- **Laboratory**: Hematology, chemistry, microbiology, genetics sequencing, blood bank

### Research & Innovation
- **CHEO Research Institute Pattern**: Molecular biology, genomics sequencing ([[Illumina NovaSeq 6000]]), biobank, bioinformatics
- **Pediatric Pharmacy**: Sterile compounding (USP <825> ISO Class 5 cleanroom), pediatric dosing validation, investigational drug support

---

## Infrastructure Layers

ACME follows the [[IEC 80001]] (Medical Device Risk Management for IT Networks) layered model with pediatric-specific hardening:

| Layer | SL-T | Description | Assets | Risk |
|-------|------|-------------|--------|------|
| **L0** | 4 | Bedside medical devices (neonatal incubators, ventilators, monitors) | [[Pediatric MC Equipment]] (NICU, PICU) | Device firmware injection → neonatal death |
| **L1** | 3–4 | Clinical zone (NICU/PICU/OR monitoring, BMS) | Philips IntelliVue, [[Drager Babylog VN500]], HVAC | Firmware tampering, environmental parameter injection |
| **L2** | 2–3 | Clinical IT ([[Epic]] EHRi, PACS, [[Pediatric MC Equipment\|LIS]]) | Cerner, imaging archive, MDI platform | Ransomware halts imaging/orders, medication errors |
| **L3** | 1–2 | Enterprise (Finance, HR, supply chain, AD) | Workday, ERP, AD, file servers | Business disruption, credential theft |
| **L3.5** | 2–3 | DMZ & Internet boundary ([[Cloudflare Magic Transit]], [[Akamai Prolexic]]) | Patient portal, telehealth, Ontario Health Connect | DDoS, credential harvesting, patient data exfil |
| **L3.6** | 3 | Research network (genomics, biobank, air-gapped) | [[Illumina NovaSeq 6000]], researcher workstations | IP theft, insider threat, genomic data exfiltration |

---

## Network Security

ACME implements [[IEC 62443]] security zones with post-2018 DDoS hardening:

- **VLAN 10**: Peds-Clinical (10.55.0.0/16) — NICU, PICU, OR, ED, wards
- **VLAN 20**: Peds-Medical-Devices (10.56.0.0/16) — isolated device LAN, unidirectional data diodes to L1
- **VLAN 30**: BMS/Climate (10.57.0.0/16) — HVAC, incubator temperature, isolation room pressure
- **VLAN 40**: Research (10.60.0.0/16) — air-gapped genomics, biobank, zero inbound network access
- **VLAN 50**: DMZ (172.16.0.0/16) — patient portal, telehealth, [[Cloudflare]] WAF
- **VLAN 60**: Guest WiFi (192.168.100.0/24) — 802.1X authenticated, isolated from clinical

**DDoS Resilience**: Dual ISP (Rogers 10G + Bell 5G), [[Cloudflare Magic Transit]] always-on scrubbing, [[Akamai Prolexic]] backup, BGP anycast DNS.

---

## Pediatric-Specific Threats

### High-Impact Scenarios
1. **NICU Device Firmware Attack** → Incubator tidal-volume set to adult mode → barotrauma in 600-gram preemie → death in <1 hour
2. **Infusion Pump Drug Library Tampering** → [[BD Alaris]] pump delivers 10× intended rate to micropreemie → cardiac arrhythmia, death in 15 min
3. **BMS Temperature Injection** → NICU climate swings 6°C → hypothermia cascade or seizures → death in 4 hours
4. **Ransomware PACS Outage** → Pediatric trauma CT unavailable for 24 hours → missed subdural hematoma → preventable death
5. **Pharmacy Automation Downtime** → Manual peds dosing errors increase 10× (0.1% → 1%) → 5–10 medication errors per day

### Real-World Precedent
[[CHEO 2018 DDoS]] (October 31, 2018): Mirai botnet variant flooded Children's Hospital of Eastern Ontario. EHR timeouts, ED triage offline, pediatric telehealth rerouted, PACS imaging stalled. Recovery: 3+ hours. No direct patient deaths reported, but process delays in pediatric trauma care measured in hours (not acceptable for pediatric critical care).

---

## Threat Landscape

### Primary Threat Actors

| Actor | Type | Target | Motivation | Notable Incidents |
|-------|------|--------|-----------|-------------------|
| [[NoName057]], [[KillNet]], [[AnonymousSudan]] | DDoS Activist | Hospital network uplinks | Political/anti-Western activism | [[CHEO 2018 DDoS]] analog |
| [[BlackCat]], [[ALPHV]] | Ransomware-as-a-Service | Patient genomic/oncology cohorts | Financial (ransom $2–10M+) | [[Lurie Children's Hospital]] (Jan 2024; 792K records) |
| [[LockBit]] | Ransomware Gang | Pediatric hospital EHR, file servers | Financial; PHI high-leverage | >460 U.S. healthcare hits in 2024 |
| [[Cl0p]] | Opportunistic Mass Exfil | File-transfer systems, EHR repos | IP theft, competitor intelligence | MOVEit/Accellion mass exploit pattern |
| [[China MSS]] | State-Sponsored APT | Pediatric oncology research, genomic IP | Strategic competitive advantage | Long-term persistence (months–years) |
| [[Pioneer Kitten]], [[Charming Kitten]] | Iranian APT | Pediatric vaccine/CRISPR research | Geopolitical leverage, IP theft | Increasing focus on CRISPR sites |

---

## Key References

### Standards
- [[IEC 80001]] — Risk Management for Medical Device IT Networks
- [[IEC 62443]] — Cybersecurity for Industrial Control Systems / Medical Devices
- [[ISO 14971]] — Medical Device Risk Management
- [[IEC 62304]] — Medical Device Software Lifecycle Processes
- [[ASHRAE 170]] — Ventilation of Healthcare Facilities (NICU climate specs)

### Regulatory (Canada)
- [[PHIPA]] — Personal Health Information Protection Act (Ontario); breach notification 48 hours
- [[Bill C-26]]/[[Bill C-8]] — Critical Cyber Systems Protection Act; healthcare identified as critical infrastructure

### Real-World Incidents
- [[CHEO 2018 DDoS]] — Children's Hospital of Eastern Ontario; Oct 31, 2018; 3-hour outage
- [[SickKids 2023 Ransomware]] — Toronto children's hospital; Code Grey lifted with 80% systems restored
- [[Lurie Children's Hospital 2024]] — Chicago; 792K pediatric records breached (genomic cohorts primary target)

---

## Architecture & Design Documents

This reference model comprises 9 supporting documents:

1. **[[Pediatric MC Architecture]]** — IEC 80001 layered model (L0–L3.6), Purdue model zones, IEC 62443 security levels, network conduits
2. **[[Pediatric MC Network]]** — VLAN map, IP allocation, clinical protocols (HL7v2, FHIR, DICOM), post-2018 DDoS mitigation
3. **[[Pediatric MC Equipment]]** — 337+ devices across 8 zones; vendors (GE, Philips, Drager, Baxter, [[Illumina]]), firmware/OS strings for CVE correlation
4. **[[Pediatric MC HAZOPS]]** — 12 pediatric-specific attack scenarios, RAMS targets, FMECA ranking, clinical KPI impact
5. **[[Pediatric MC Threat Profile]]** — ATT&CK mapping, kill-chain timelines (DDoS, ransomware, insider threat), remote-access architecture, MFA hardening
6. **[[Pediatric MC Supply Chain]]** — 3-tier upstream (OEM/reagents/silicon), 3-tier downstream (patients/regional/national); geopolitical risks (Taiwan TSMC, Russia/Belarus APIs)
7. **[[Pediatric MC Narrative]]** — Board-level executive narrative; pediatric safety margins, threat story, cascade failures, top 5 priorities
8. **[[Pediatric MC CVE Cross-Reference]]** — Equipment-to-CVE matrix (Windows 7/10, CentOS 7); SQL templates for forge.cve_records; threat actor kill-chains
9. **[[Pediatric MC References]]** — 200+ consolidated citations grouped by topic (standards, facility, vendors, network, incidents, threats, literature)

---

## Cross-References

### Other Phase 1c ACME Facilities
- [[ACME Nashville Surface Treatment]] — TN, aerospace surface treatment + ITAR
- [[ACME Ottawa Data Center]] — Federal colocation, Tier III
- [[ACME Ottawa Substation]] — IEC 61850, Sandworm-class threats
- [[ACME Ottawa Civic Hospital]] — TOH Civic Campus, ransomware-targeted

### Related Standards & Models
- [[IEC 80001-1]] — Application of Risk Management for IT-networks Incorporating Medical Devices
- [[Purdue Model]] — Industrial control system architecture (adapted for healthcare OT)
- [[MITRE ATT&CK Healthcare]] — Healthcare-specific TTPs and techniques
- [[NIST Cybersecurity Framework]] — Risk management and incident response

---

**Status**: Draft reference design for OXOT product demonstration  
**Next Review**: Quarterly  
**Custodian**: OXOT Phase 1c Reference Design Team
