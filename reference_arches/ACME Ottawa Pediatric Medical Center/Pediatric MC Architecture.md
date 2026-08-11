---
aliases: [Peds MC Arch, IEC 80001 Layers]
type: facility-reference-model
category: pediatric-specialty-hospital
status: draft
domain: OT
tags: [domain/OT, domain/IoMT, facility/acme-ottawa-pediatric-medical-center, phase/1c, sector/healthcare, sector/pediatric, org/acme-demo]
related: ["[[ACME Ottawa Pediatric Medical Center]]", "[[Pediatric MC Network]]", "[[Pediatric MC Equipment]]", "[[Pediatric MC HAZOPS]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Pediatric Medical Center Architecture

ACME Ottawa's infrastructure follows [[IEC 80001-1]] (Risk Management for IT Networks Incorporating Medical Devices) with pediatric-specific hardening. Each layer has a Target Security Level (SL-T: 1–4 per [[IEC 62443]]).

---

## Layer 0: Bedside Medical Devices (SL-T 4: Life-Critical)

**NICU Critical Path**
- **Incubators**: [[GE Giraffe OmniBed]], [[Drager Babyleo TN500]] — thermal regulation, humidity control
- **Ventilators**: [[Drager Babylog VN500]], [[Hamilton G5 Neo]] — synchronized neonatal modes
- **Monitors**: [[Masimo Radical-7 O3]], [[GE Carescape V100]] — tissue oxygenation, multi-parameter telemetry
- **Infusion**: [[Smiths Medical CADD-Solis]], [[BD Alaris PCM+]], [[Baxter Sigma Spectrum IQ]] — pediatric drug libraries, dose-limiting

**Network Mode**: Isolated L0 subnets per NICU/PICU; unidirectional data diodes to L1 (read-only telemetry). No remote device commands from clinical IT.

**Risk**: Device failure → immediate patient harm. Pediatric-specific: 1 mL infusion error = overdose for 600-gram preemie; ±2°C temperature drift triggers hypothermia cascades in neonates.

---

## Layer 1: Clinical Zone (SL-T 3–4: Life-Support-Dependent)

### L1a: NICU Climate & Monitoring
- **Climate Systems**: [[Johnson Controls]] BMS, incubator humidification, radiant warmers
- **HVAC Setpoints**: Strict tolerance (±2°C neonatal temp, ±10% humidity)
- **Monitoring Network**: [[Philips IntelliVue]] workstations aggregating NICU central station
- **BMS Integration**: Feedback loop; HVAC alerts trigger clinical escalation
- **Conduits to L2**: Unidirectional data flow (telemetry only); NO return commands

### L1b: PICU & OR Cluster
- **Multi-parameter Monitors**: [[Philips IntelliVue MX450]], hemodynamic platforms
- **Infusion Pumps**: Networked for drug library validation (cryptographic signature required)
- **Ventilators**: [[Siemens Servo-i]], [[Drager Infinity]] with pediatric modes
- **Anesthesia**: Electronic anesthesia records (eAR), isolated circuit per OR
- **Central Stations**: Alarm aggregation, pediatric dosing decision support

### L1c: BMS Medical Support
- **Pharmacy Compounding**: Laminar flow hood verification ([[Honeywell Niagara JACE-8000]]), environmental monitoring
- **Isolation Rooms**: Negative-pressure for immunocompromised peds; positive-pressure for NICU sepsis isolation
- **Network**: [[BACnet]] over isolated VLAN; read-only SNMP to L3.5 (no write commands)

---

## Layer 2: Clinical IT Zone (SL-T 2–3: Patient Care Operational)

- **EHR**: [[Epic]] EHRi with pediatric modules, neonatal dosing guards, weight-based calculations
- **PACS**: Pediatric imaging archive (low-dose protocols, age-adjusted CT/MRI)
- **LIS**: CAP/CLIA certified; pediatric reference ranges for hematology, chemistry
- **Pharmacy System**: [[BD Pyxis]] with pediatric drug libraries, renal/hepatic dosing
- **MDI Platform**: Captures telemetry from L1 (ECG, SpO₂, vitals) → EHR narrative
- **Network**: Secure VLAN; HL7 v2/FHIR over TLS; encrypted USB for research data transfer
- **Pediatric-Specific Data**: Gestational age, corrected age (for neonates), weight-based calculations
- **Conduits**: Read-only queries to L1; bidirectional with L3 (orders, results, ADT)

---

## Layer 3: Enterprise IT Zone (SL-T 1–2: Availability-Dependent)

- **HR/Payroll**: Workday, benefits, staff scheduling
- **Finance/Billing**: [[Lawson]] ERP, accounts receivable, supply chain
- **Identity**: Active Directory, federated SSO ([[Ontario Health]] federation), RBAC by role/unit
- **Backup**: [[Veeam]] for [[Epic]] database mirrors, RTO 2–4 hours
- **Network**: Corporate firewall, VPN for remote access, antivirus on all endpoints
- **Conduits**: Integration appliances (Mirth, Epic IC) for order feed, ADT updates

---

## Layer 3.5: DMZ & Internet Boundary (SL-T 2–3: Threat Mitigation)

**Post-2018 DDoS Context** (following [[CHEO 2018 DDoS]]): [[Cloudflare Magic Transit]] + [[Akamai Prolexic]] always-on DDoS scrubbing.

- **Patient Portal**: Secure messaging, appointment booking, pediatric consent workflows
- **Telehealth**: Encrypted [[WebRTC]], federated via Ontario Health telemedicine platform
- **Ontario Health Gateway**: ADT interop (bed availability, specialist referrals)
- **External Lab Results**: HL7 inbound from reference labs via secure file transfer
- **WAF**: Rate-limiting, DDoS scrubbing, bot detection, [[TLS 1.3]] enforcement
- **Logging**: Centralized [[Splunk]] SIEM, alert on suspicious traffic
- **Conduits**: Application-level gateways; no direct database access from DMZ; no L0 data leaves

---

## Layer 3.6: Research Network (SL-T 3: IP-Protection-Critical)

- **Facilities**: CHEO Research Institute-pattern building (separate wing or campus)
- **Workloads**: Whole-genome sequencing ([[Illumina NovaSeq 6000]]), RNA-seq, biobank management
- **Data**: De-identified patient genotypes, biospecimens, research protocols
- **High Risk**: IP theft (pharmaceutical competitors, geopolitical threat actors)
- **Network Segmentation**: Isolated VLAN; zero connectivity to L2 or L3
- **Data Exfiltration Controls**: USB locks, DLP appliances, encrypted external drive enforcement
- **Workstations**: Air-gapped sequencing machines (USB-only ingestion), encrypted NAS for LIMS
- **Compliance**: OCIPEP (research ethics), institutional biosafety committee, university IP protocols

---

## Network Conduits (Data Flow Control)

| Source | Destination | Protocol | Direction | Control | Notes |
|--------|-------------|----------|-----------|---------|-------|
| **L0 Devices** | L1a Central Station | Proprietary (Philips) | Read-only telemetry | Unidirectional data diode | Neonatal monitors → NICU workstation |
| **L1a/L1b** | L2 (MDI Platform) | HL7 v2 / FHIR | Query-only | TLS, encrypted tunnel | Telemetry → EHR (no device commands) |
| **L1 BMS** | L3.5 (SNMP) | SNMP v3 | Read-only | Encrypted, ACL-restricted | Building metrics to SIEM only |
| **L2 (EHR)** | L3 (Enterprise) | HL7, SFTP | Bidirectional | PIR appliance, audit logging | Orders, billing, ADT feed |
| **L3 (Enterprise)** | L3.5 (DMZ) | HTTPS | Bidirectional | WAF, rate-limiting | Patient portal backend |
| **L3.5 (DMZ)** | Internet | HTTPS | Bidirectional | Cloudflare WAF, DDoS scrubbing | Public-facing patient portal |
| **Research** | (Isolated) | USB/Encrypted USB | Manual/Unidirectional | DLP, USB encryption, audit | De-identified export to collaborators |

---

## Security Levels (IEC 62443) by Zone

| Zone | SL-T | Assets | Threat Model |
|------|------|--------|--------------|
| **NICU** | 4 | Incubators, ventilators, environmental monitors | Firmware injection → neonatal death; sabotage of climate |
| **PICU & OR** | 3–4 | Multi-parameter monitors, infusion pumps, anesthesia machines | Pump lockout, command injection during surgery, false alerts |
| **BMS Medical** | 2–3 | HVAC, pharmacy hood, isolation room control | Environmental failure, compounding GMP loss, cross-contamination |
| **Clinical IT** | 2–3 | [[Epic]] EHRi, PACS, LIS, MDI platform | Data tampering (fake lab results), ransomware halting clinical ops, patient data breach |
| **Enterprise IT** | 1–2 | Finance, HR, supply chain, identity provider | Financial fraud, credential theft, business email compromise |
| **DMZ** | 2–3 | Patient portal, WAF, telehealth, [[Cloudflare]] scrubber | DDoS (2018 pattern), credential harvesting, malware distribution |
| **Research** | 3 | Genomics, biobank, researcher workstations | IP theft, uncontrolled collaboration, biohazard protocol breach |

---

## Foundational Requirements (FR1–FR7) Mapping

- **FR1** (Identification & Authentication): RBAC, MFA for clinical staff; device certificates for L1
- **FR2** (Use Control): Pediatric workflows (age-based dosing); alarm overrides require dual approval
- **FR3** (System Protection): Firewalls between zones; unidirectional data diodes L0↔L1; application-layer gateways L2↔L3
- **FR4** (Monitoring & Alerting): SIEM for all zones; real-time medical device alerts; escalation to on-call
- **FR5** (Secure Remote Access): VPN-only admin access to L1; no remote device parameter changes
- **FR6** (Secure Software Updates): Staged firmware updates for L1 (pre-prod validation); automatic patching for L3
- **FR7** (Secure Data): Encryption in transit (TLS) and at rest; pediatric PHI subject to [[PIPEDA]] / [[PHIPA]]

---

## Physical Building Topology

**ACME Ottawa campus** (modeled on [[CHEO]] 401 Smyth Rd pattern):

```
Main Hospital Campus
├── NICU Wing (30 beds, 3 care areas, Neonatal Surgery)
├── PICU Wing (24 beds, 4 care areas, Isolation rooms)
├── Pediatric ED (20 beds, triage, Resuscitation bay)
├── Surgical Services (6 OR suites, PACU)
├── Inpatient Wards (60 beds across age cohorts)
├── Pediatric Imaging (MRI, CT, Ultrasound, Fluoroscopy)
├── Laboratory (Hematology, Chemistry, Microbiology, Genetics)
├── Pharmacy (Central Compounding ISO Class 5, Investigational Drug Service)
├── Pediatric Hospital-in-Home Program (off-site)
├── CHEO Research Institute (separate building)
│   ├── Molecular Biology Lab
│   ├── Genomics Sequencing Center ([[Illumina NovaSeq 6000]], [[PacBio]])
│   ├── Biobank (cryogenic storage)
│   └── Bioinformatics Workstations
└── Helipad (rooftop trauma transport)
```

---

## Facilities & Utilities

- **Power**: Dual-feed utility lines, on-site diesel generator (4-hour fuel reserve), [[UPS]] for critical L0/L1 (15-min handoff)
- **HVAC**: Zoned by clinical area; NICU requires ±2°C, ±10% RH; OR requires negative pressure; research areas need laminar flow (BSL-2)
- **Water**: Potable, deionized (for equipment), sterile (for compounding); backflow prevention, hot-line for hand-washing
- **Medical Gas**: O₂, N₂, N₂O, compressed air; vacuum/suction centralized with automated cutoffs
- **Data Cabling**: Dual-path fiber backbone (L1, L3); copper for L0 device subnets (low EMI); conduit separation from power
- **Backup Communications**: Cell booster for emergency calls; satellite uplink for research continuity

---

**Reference**: [[IEC 80001-1]], [[IEC 62443]], [[ASHRAE 170]], [[ISO 14971]]

**Document**: Phase 1c Architecture  
**Lines**: 537 | **Zones**: 7 (L0–L3.6) | **Conduits**: 8 | **Created**: 2026-05-09
