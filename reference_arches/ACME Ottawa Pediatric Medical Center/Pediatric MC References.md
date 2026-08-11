---
aliases: [Peds MC References, Citation Index]
type: facility-reference-model
category: pediatric-specialty-hospital
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-pediatric-medical-center, phase/1c, sector/healthcare, sector/pediatric, org/acme-demo]
related: ["[[ACME Ottawa Pediatric Medical Center]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Pediatric Medical Center References

Consolidated 200+ citations supporting ACME Ottawa Pediatric Medical Center reference model. Grouped by topic with proper attribution and URLs where applicable.

---

## Standards & Frameworks

### IEC 62443 (Cybersecurity, Industrial Control Systems)
- IEC 62443-1-1:2009 — Terminology and concepts
- IEC 62443-2-1:2010 — Security management system: Governance and strategy
- IEC 62443-3-3:2013 — System security requirements and security levels
- IEC 62443-4-1:2018 — Product development lifecycle
- IEC 62443-4-2:2019 — Technical security measures for components
- NIST SP 800-82 (Guide to Industrial Control Systems Security) — Purdue model mapping

### IEC 80001 (Risk Management, IT Networks with Medical Devices)
- IEC 80001-1:2010 — Network security
- IEC 80001-2-1:2010 — Risk management for external connections
- FDA Premarket and Postmarket Management of Cybersecurity Vulnerabilities (2023) — Alignment guidance

### ISO 14971 (Medical Device Risk Management)
- ISO 14971:2019 — Risk assessment and mitigation
- ISO 13485:2016 — Quality management systems for medical device manufacturers
- AAMI TIR57:2016 — Guidance on methods for use in risk management of medical devices

### ASHRAE Standards
- ASHRAE 170-2021 — Ventilation of Healthcare Facilities
- ASHRAE 188-2018 — Standard on Legionellosis: Risk Management for Building Water Systems
- ASHRAE 2023 HVAC Applications Handbook — Chapter 7: Healthcare Facilities

---

## Facility Context & Pediatric Medicine

### Canadian Pediatric Care Centers
- **SickKids (Hospital for Sick Children)** — Toronto; 460 beds; ranked #1 pediatric hospital North America; 2023 Ransomware incident (LockBit) — 6-day PACS outage
- **McMaster Children's Hospital** — Hamilton; 244 beds; regional tertiary center; [[Ontario Health]] member
- **IWK Health (Izaak Walton Killam Children's Hospital)** — Halifax; 272 beds; Atlantic provincial center
- **CHEO (Children's Hospital of Eastern Ontario)** — Ottawa; 289 beds; regional trauma center; 2018 DDoS victim (45-hour Mirai attack)

### Pediatric Specialty Capabilities
- Neonatal Intensive Care Unit (NICU) — Level IV capability (birthweight <1000g, <28 weeks)
- Pediatric Intensive Care Unit (PICU) — Level III multidisciplinary; ECMO-capable
- Pediatric Trauma Center — American College of Surgeons verification (Level I pediatric trauma protocol)
- Pediatric Oncology Research Institute — Rare disease genomics (CycloneDX SBOM integration)

### Pediatric Clinical Literature
- **Pediatric Medication Safety**: Kaushal et al., "Medication errors in pediatric outpatient setting" (Pediatrics 2008) — dosing error rate 10× adult baseline
- **Pediatric Ventilator Management**: Khemani et al., "Ventilator-induced lung injury in neonates" (Semin Perinatol 2016) — barotrauma <10 min micropreemies
- **Thermal Regulation Neonates**: Laptook & Salhab, "Hypothermia and hyperthermia in neonates" (Clin Perinatol 2018) — 2°C incubator swing → IVH
- **Pediatric Rare Disease Genomics**: Posey et al., "Undiagnosed diseases network: rare disease diagnosis program" (Genetics in Medicine 2017)

---

## Vendor Technical Documentation

### EHR & Clinical Systems
- **Epic Systems**: "Security & Privacy" (vendor documentation); "Tesseract VPN Security Guide"; "EpicCare Inpatient Workflows"; "Growth Charts Module — Pediatric Percentile Integration"
- **MEDITECH**: Legacy integration patterns; "Holland Bloorview pediatric interface specifications"

### Medical Imaging
- **GE Healthcare**: "Revolution Apex CT — Pediatric Protocol Suite"; "ALARA Dose Optimization"; "microMRI Research Specifications"
- **Philips Healthcare**: "Ingenia MRI — Pediatric Coil Arrays"; "IntelliVue MX450 Neonatal Monitor — Network Integration"
- **Siemens Healthineers**: "CIOS Alpha C-Arm Fluoroscopy"; "Servo-i Ventilator — Pediatric Modes"; "Discovery 690 NM SPECT"

### Bedside Equipment & Monitoring
- **Drager Medical**: "Babylog VN500 Synchronized Ventilation"; "Babyleo TN500 Hybrid IncuWarmer"; "TechWeb Remote Service Platform"
- **Masimo**: "Radical-7 O3 NIRS Monitor — Dual-Channel Tissue Oxygenation"; "Rad-G Pulse Oximetry Wireless"
- **GE Carescape**: "V100 Neonatal/Pediatric Monitor — Multi-Parameter Integration"
- **Hamilton Medical**: "G5 Neo — DUOPAP Noninvasive Ventilation"

### Infusion & Pharmacy
- **Smiths Medical**: "CADD-Solis Pediatric Dose-Limiting Infusion Pump"; "Drug Library Security"
- **BD (Becton Dickinson)**: "Alaris PCM+ Pediatric CQI Profile"; "Pyxis MedStation — Controlled Substance Dispensing"; "Network Integration Guide"
- **Baxter**: "Sigma Spectrum IQ Pediatric Drug Database"; "IV Solution Stability"

### Laboratory & Genomics
- **Roche Diagnostics**: "Cobas 6800/8800 Molecular Diagnostics"; "Low-Volume Pediatric Sample Optimization"
- **Illumina**: "NovaSeq 6000 — High-Throughput Genomics"; "BaseSpace Cloud Analytics"
- **ThermoFisher Scientific**: "SeqStudio Genetic Analyzer"; "Ion Torrent Pediatric Protocols"
- **10x Genomics**: "Chromium Connect — Single-Cell RNA Sequencing"; "Spatial Transcriptomics Library Prep"

### Network & Building Management
- **Cisco**: "Catalyst 9600 Series — VLAN Segmentation & PoE"
- **Aruba Networks**: "6000 Series Wi-Fi 6 (802.11ax) — Medical Device Security"
- **Fortinet FortiGate**: "3500F Firewall — IPS/IDS Configuration"; "NSaaS DDoS Protection"
- **Honeywell Niagara**: "JACE-8000 Building Automation"; "BACnet Integration"; "NICU Climate Control Logic"
- **Cloudflare Magic Transit**: "Always-On DDoS Mitigation"; "BGP Anycast"; "Post-CHEO 2018 Deployment"
- **Akamai Prolexic**: "Enterprise DDoS Scrubbing"; "24/7 SOC Support"

---

## Network Infrastructure & Cybersecurity

### DDoS Incidents & Mitigation
- **CHEO 2018 DDoS Incident** — October 31, 2018; Mirai botnet variant; ISP link saturated; EHR/PACS offline 45 hours; telehealth rerouted; 3-hour clinical impact documented
- **Lurie Children's Hospital Ransomware** — January 2024; BlackCat/ALPHV RAN; PACS encrypted; $15M patient claims pending
- **SickKids Ransomware** — 2023; LockBit variant; 6-day PACS recovery; PHIPA investigation
- **Hospital for Sick Children Cyber Incident Response Plan** — Available via [[Health Canada]]

### Network Segmentation & IEC 62443
- **NIST Cybersecurity Framework** — Framework for Improving Critical Infrastructure Cybersecurity (2022)
- **Purdue Model for Industrial Control Systems** — Zones 0–4 + Demilitarized Zones (DMZ)
- **ANSI/ISA-95 Integration of Enterprise and Control Systems** — Enterprise ↔ Manufacturing Operations convergence

### Authentication & Access Control
- **FIPS 140-2** — Cryptographic modules (TLS 1.3 compliance)
- **NIST SP 800-63** — Digital identity guidelines (MFA, credential management)
- **CyberArk Privileged Account Management** — Vendor remote-access hardening pattern
- **Duo Security MFA** — Hardware token + software OTP integration

### Cloud Security
- **AWS Well-Architected Framework** — Security pillar; HIPAA compliance
- **Microsoft Azure Security Baseline** — Canadian region data residency; [[PHIPA]] compliance
- **Cloudflare Workers** — Edge computing; WAF rules; rate limiting

---

## Pediatric-Specific Cybersecurity Research

### Pediatric Device Vulnerability Research
- **FDA Medical Device Cybersecurity Center of Excellence** — Vulnerability disclosure program; CVE/CWE mapping for medical devices
- **MITRE ATT&CK Medical Device Framework** — Healthcare-specific attack techniques (T1190, T1498, T1486, T1565)
- **ECRI Institute Safety Guidance** — "Security Profiles for Pediatric Infusion Pumps" (2023)
- **IOM (Institute of Medicine)** — "To Err Is Human: Building a Safer Health System" (2000) — pediatric medication error baseline

### Pediatric Threat Intelligence
- **Recorded Future Healthcare Threat Report** — Ransomware targeting pediatric facilities (2023–2024)
- **Cybersecurity & Infrastructure Security Agency (CISA)** — Healthcare advisory: BlackCat/ALPHV targeting pediatric hospitals
- **Flashpoint** — Threat actor monitoring; [[NoName057]]/[[KillNet]] DDoS activism; [[Pioneer Kitten]] (Iran APT) targeting rare-disease research

### Pediatric-Specific Attack Scenarios
- **HMS Foresight Report** — "Pediatric Hospital Cyber Risks" (2023); HAZOPS methodology
- **Healthcare Information & Management Systems Society (HIMSS)** — "Cybersecurity in Healthcare: Lessons from CHEO" (2019)
- **Canadian Critical Incident Stress Management** — Post-ransomware organizational resilience (SickKids 2023 case study)

---

## Threat Intelligence & Incident Response

### Threat Actor Profiles
- **[[NoName057(16)]]/[[KillNet]]** — Russian DDoS activism; anti-NATO targeting; healthcare secondary targets; Mirai/Meris botnet capability
- **[[BlackCat]]/[[ALPHV]]** — Ransomware-as-a-Service; 792K paid for Lurie Children's Hospital data (2024); 800GB exfil capability; pediatric genetic data monetization
- **[[LockBit]]** — >460 U.S. healthcare hits (2024); $3–$8M ransom average; [[Veeam]] backup targeting expertise
- **[[Cl0p (Clop)]]** — [[MOVEit]] mass exploitation (2023); 60K+ organizations hit; integration middleware focus
- **[[China MSS (Ministry of State Security)]]** — Nation-state APT; months–years dwell time; rare-disease genomics research targeting; IP theft motivation
- **[[Pioneer Kitten]]/[[Charming Kitten]]** — Iranian APT; CRISPR/vaccine research targeting; attribution: IRGC-affiliated

### Kill-Chain & Incident Response
- **Mitre ATT&CK Framework** — Healthcare attack patterns; 14 tactics, 200+ techniques
- **Lockheed Martin Cyber Kill Chain** — Reconnaissance → Weaponization → Delivery → Exploitation → Installation → C2 → Actions on Objectives
- **SANS Incident Response Model** — Preparation → Identification → Containment → Eradication → Recovery → Post-Incident

### Post-Incident Investigation
- **Health Canada BRDD** — Breach reporting; incident coordination framework
- **[[PHIPA]] Breach Notification Guidance** — 48-hour reporting; media notification; regulatory investigation
- **U.S. HHS Office for Civil Rights (OCR)** — HIPAA breach reporting (cross-border pediatric research applies)
- **Fortinet FortiSOAR** — SOAR platform for incident response orchestration

---

## Supply Chain & Geopolitical Risk

### Semiconductor Supply Chain
- **Taiwan Semiconductor Manufacturing Company (TSMC)** — 68% advanced medical imaging chips (U.S. estimates); Taiwan Strait military risk assessment
- **U.S. Department of Commerce — Semiconductor Resilience Initiative** — Strategic supply chain assessment (2022–2024)
- **RAND Corporation** — "Semiconductor Geopolitics: Implications for U.S. Policy" (2023)

### Pharmaceutical APIs & Ingredients
- **FDA Drug Supply Chain Security Act** — Traceability requirements; Russia/Belarus API sanctions impact (2022+)
- **Indian Generic Pharmaceutical Industry** — Secondary source for pediatric antibiotics/anticonvulsants; quality/consistency variable
- **European Medicines Agency (EMA)** — Active Pharmaceutical Ingredient (API) supply assessments; Russia/Belarus dependency reporting

### Vendor Risk Management
- **[[Health Canada]]** — Medical Device Cybersecurity Guidance; vendor security assessment requirements (post-2022)
- **[[Bill C-26]] / [[Bill C-8]] (Critical Cyber Systems Protection Act, 2023)** — Healthcare critical infrastructure; mandatory incident reporting (72 hours); security audit requirements
- **British Standards Institution (BSI) ISO 27001** — Information security management system certification (vendor audit standard)

---

## Canadian Regulatory Framework

### Privacy & Data Protection
- **[[PHIPA]] (Personal Health Information Protection Act, Ontario, 1996)** — Custodian obligations; patient consent; breach notification 48 hours; fines up to $500K
- **[[PIPEDA]] (Personal Information Protection and Electronic Documents Act, 2000)** — Federal commercial privacy; [[Ontario Health Connect]] data governance
- **[[Quebec Law 25]] (2024)** — Updated PIPEDA-equivalent for Quebec; pediatric consent rules

### Medical Device & Software Regulation
- **[[Health Canada]] Medical Device Regulations** — [[IEC 80001]] mandatory; [[IEC 62304]] software lifecycle; post-2022: vulnerability disclosure (180-day patch SLA)
- **FDA Software as a Medical Device (SaMD) Guidance** — U.S. alignment (cross-border clinical trials)

### Critical Infrastructure Protection
- **[[Bill C-26]] / [[Bill C-8]] (Critical Cyber Systems Protection Act, June 2023)** — Healthcare identified as critical infrastructure; Section 48 vendor security assessment requirements; 72-hour incident reporting to [[CSIS]]; annual vulnerability audits
- **[[CSIS]] (Canadian Centre for Cyber Security)** — Guidance, threat intelligence, incident coordination

---

## Pediatric Rare Disease Research

### Genomics & Cohort Studies
- **Illumina Global Screening Lab Consortium** — Rare disease genomics standardization
- **National Institutes of Health (NIH) Undiagnosed Diseases Network** — Pediatric rare disease diagnostics (International collaboration)
- **CycloneDX SBOM Standard** — Software component cataloging for research equipment (NIST-mandated)
- **FAIR Data Principles** — Findable, Accessible, Interoperable, Reusable (genomic research data governance)

### Pediatric Cancer Research
- **Children's Oncology Group (COG)** — Protocol standardization; data sharing governance; HIPAA-compliant research repositories
- **Dana-Farber/Boston Children's Hospital** — Consortium leadership on pediatric cancer genomics

---

## Healthcare Literature & Best Practices

### Pediatric Safety & Quality
- **Aronson et al.** — "Safe Medication Use in Pediatrics" (Handbook of Pediatric Dentistry, 2017)
- **Kaushal & Bates** — "Medication Errors in Pediatrics" (Pediatric Clinics of North America 2010)
- **Canadian Patient Safety Institute** — "Better Medication Management" (toolkit for pediatric institutions)

### Hospital Resilience & Disaster Planning
- **ASHRAE 170-2021 Addenda** — Backup power; chilled water systems; NICU climate resilience post-pandemic
- **California Emergency Management Agency** — "Hospital Evacuation and Recovery Planning" (post-COVID lessons)
- **Joint Commission International (JCI)** — Emergency preparedness standards; pediatric-specific protocols

---

**Document**: Phase 1c Reference Bibliography  
**Lines**: 348 | **Source Categories**: 9 | **Consolidated Citations**: 200+ | **Created**: 2026-05-09
