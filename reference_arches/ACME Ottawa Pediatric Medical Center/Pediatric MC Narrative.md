---
aliases: [Peds MC Narrative, Board Brief]
type: facility-reference-model
category: pediatric-specialty-hospital
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-pediatric-medical-center, phase/1c, sector/healthcare, sector/pediatric, org/acme-demo]
related: ["[[ACME Ottawa Pediatric Medical Center]]", "[[Pediatric MC HAZOPS]]", "[[Pediatric MC Threat Profile]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Pediatric Medical Center Narrative

## Executive Summary

ACME Ottawa operates a **specialized pediatric facility with a 10× narrower safety margin** than adult hospitals. A single cyber-physical attack on a 600-gram neonate's ventilator can cause death within 10 minutes. This narrative frames the civilizational stakes: pediatric medical resilience is foundational to society's future. Supply chain disruption, ransomware, or geopolitical closure of semiconductor (Taiwan) or API (Russia/Belarus) pathways creates cascading clinical failures that disproportionately harm the youngest, most vulnerable patients.

---

## The Pediatric Safety Margin Crisis

### Age-Stratified Lethality
- **Neonates (<1 kg preemies)**: 50× risk vs. adults for identical drug dose errors; 4-hour thermal death from 2°C incubator swing
- **Infants (1–12 months)**: Morphine therapeutic range: 0.1–0.2 mg/kg; adult confusion (10 mg single dose) is **lethal**
- **Toddlers (1–3 years)**: Fluid balance errors (overhydration/dehydration) cascade to seizure within 30 minutes; ventilator barotrauma occurs in <1 hour

### Cyber-Physical Amplification
Traditional IT security assumes slow escalation (dwell time weeks–months, detection time days). **Pediatric medicine operates on minutes:**
- Infusion pump firmware tampering → hyperkalemia cardiac arrhythmia within **15 minutes**
- Ventilator servo-loop disarm → pneumothorax/barotrauma within **<1 hour**
- NICU BMS temperature attack → hypothermia cascade death within **4 hours**
- Pharmacy automation downtime → manual dosing error rate **10× baseline** (0.1% → 1%)

---

## Threat Story: The Cascading Failure Scenario

### Week 1: Reconnaissance
[[China MSS]] APT targets ACME's pediatric genomics research (rare disease cohort of 500 children). OSINT reveals:
- [[Epic]] Tesseract VPN entry point (vendor support tech account)
- [[Illumina NovaSeq 6000]] Windows 10 LTSC Build 17763 (publicly disclosed CVE-2023-32315 HTTP.sys RCE)
- Pediatric oncology patient data worth $50M on dark market (IP theft + insurance fraud leverage)

### Week 2–4: Initial Access
Phishing email to biomed team with macro-laced Excel ("ACME Equipment Inventory 2026.xlm"). Macro downloads [[Cobalt Strike]] beacon. Establishes C2 callback through hospital Internet.

### Week 5–6: Lateral Movement
Using stolen Epic clinician credentials (phishing), attacker pivots from research VLAN to clinical VLAN 10.55.0.0/16. Discovers:
- [[Epic]] EpicCare Inpatient environment (PHI goldmine)
- [[BD Pyxis]] MedStation (pharmacy automation) connected to clinical network
- [[Johnson Controls Niagara JACE]] BMS controller (unpatched; vulnerable to [[Modbus]] injection)

### Week 7–12: Exfiltration & Preparation
- 500-patient pediatric cancer cohort (~800 GB structured data + genomic sequences) exfiltrated to [[Azure Storage]] account
- [[Veeam]] backup credentials harvested (domain admin access)
- Drug library files from [[BD Pyxis]] reverse-engineered to prepare injection payload
- BMS climate-control formulas studied (NICU incubator setpoint logic)

### Week 13: Encryption & Ransom
Friday 2:00 AM local time (minimal clinical staffing):
1. **T1486 (Encryption)**: Ransomware worm propagates across inpatient network; PACS server encrypted within 8 minutes
2. **T1485 (Backup Destruction)**: [[Veeam]] snapshots deleted (domain admin creds); 3-year backup chain compromised
3. **T1565 (Data Manipulation)**: [[BD Pyxis]] drug library corrupted (morphine elixir 2 mg/mL relabeled as 5 mg/mL in database)

### Week 13–14: Clinical Impact
**Saturday 06:00 AM** — NICU nursing staff (night shift, skeleton crew) discovers:
- Incubator setpoint climbs from 36.5°C to 39°C (BMS [[Modbus]] injection); alarms disabled via rootkit
- Two neonates (32-week gestation) develop hyperthermia, seizures, intraventricular hemorrhage (IVH)
- Pediatric trauma patient arrives (MVA); [[PACS]] unavailable → clinical suspicion of subdural hematoma WITHOUT imaging confirmation → ICU hold for observation (wrong admission level, resource drain)
- Morning pharmacist notes Pyxis consistency error; too late—night shift administered "corrected" morphine dose to 2-year-old (5 mg instead of 2 mg); patient now on mechanical ventilation for respiratory depression

**Sunday**: Ransom demand $8M with pediatric patient genetic data leaked preview ("If you don't pay, we publish genetic privacy of your 500 childhood cancer patients").

### Week 14+: Cascading Failures
- **Parent litigation**: IVH permanent brain injury claim ($15M+); morphine overdose claim ($5M+)
- **Public trust collapse**: Media coverage "Hackers targeted Eastern Ontario's pediatric cancer research"; competing academic centers recruit ACME's oncology faculty
- **Regulatory investigation**: [[PHIPA]] breach investigation (48-hour notification missed; board-level culpability); [[Bill C-8]] audit (vendor risk assessment retroactive; external assessor hired)
- **Supply chain shock**: ACME's [[Veeam]] license revoked (contractual "material breach" over backup destruction); 90-day recovery window without enterprise backup until alternative vendor onboarded
- **Financial cascade**: $8M ransom + $5M legal settlement + $3M recovery costs + $2M vendor transition + $1M regulatory fines = **$19M impact**
- **Research cohort attrition**: 40% of families withdraw consent (genetic data breach fears); clinical trial recruitment stalls; publication timelines slip 18 months; grant funding (NIH, SickKids Foundation) paused pending corrective action

---

## The Five Priorities

### 1. Pediatric-Specific Threat Modeling (HAZOPS)
- **RPN Ranking**: Map all 12 scenarios (RPN 200–296) to clinical KPI impact
- **RAMS Targets**: Enforce SL-A 2 minimum (ventilators, incubators, infusion pumps, pharmacy automation)
- **Outcome**: Board attestation that ACME can defend against [[Lurie Children's Hospital]] (BlackCat 2024) and [[CHEO 2018 DDoS]] recurrence

### 2. Supply Chain Resilience
- **Dual-source imaging**: [[Mindray]] pediatric ultrasound as secondary to [[GE]]/[[Philips]] (lower cost, mixed-origin hedge)
- **API diversification**: India peds generics for Russia/Belarus-origin antibiotics and anticonvulsants
- **[[TSMC]] hedging**: Join [[Ontario Health]] group procurements for spare MRI/CT components (18-month buffer)
- **Outcome**: <6-month recovery SLA if Taiwan Strait closure halts advanced imaging procurement

### 3. Network Segmentation & IEC 62443 Compliance
- **Boundary Enforcement**: Unidirectional data diodes between clinical (VLAN 10.55) and research (VLAN 10.60)
- **Medical Device Isolation**: VLAN 10.56 separate from clinical workflows; [[Forescout]] continuous device fingerprinting
- **BMS Hardening**: Serial heartbeat monitoring + hardware interlock on NICU climate setpoint (manual override button always accessible)
- **Outcome**: Audit-ready SL-A 2 evidence for all critical zones by Q3 2026

### 4. Incident Response & Ransomware Playbook
- **Backup Immutability**: 3-year air-gapped backup chain; quarterly restore drills (target: <4-hour RPO, 4-hour RTO for PACS)
- **EDR Deployment**: [[CrowdStrike Falcon]] on all clinical workstations + biomed equipment (behavioral baselining for malware detection)
- **Ransomware Pay-No-Policy**: Board-ratified decision to never pay; federal [[CISA]] liaison for law enforcement coordination
- **Outcome**: Demonstrated ability to recover from encryption within 4 hours (pediatric trauma care SLA)

### 5. Vendor Risk Management (Bill C-8 Compliance)
- **Security Assessments**: Mandatory annual vulnerability audit for [[Epic]], [[Philips]], [[GE]], [[Drager]], [[BD]], [[Illumina]] (Section 48 CCSPA)
- **Patch Cadence**: 30-day SLA for critical patches; 90-day for high-priority; quarterly for medium
- **Remote-Access Hardening**: [[CyberArk]] PAM for all vendor session gates; sysmon logging + real-time SIEM stream for anomaly detection
- **Outcome**: [[Health Canada]] BRDD attestation that ACME meets Critical Infrastructure Cyber Systems standards by Q4 2026

---

## Stakeholder Impact: The (Grand)Children Layer

### Immediate Beneficiaries
- **150,000+ pediatric patients** (Eastern Ontario baseline): ACME supplies serve 500,000 outpatient visits/year. Supply disruption = missed diagnoses, delayed oncology care, research cohort attrition
- **Pediatric clinicians**: Workload escalation under equipment downtime; therapy substitution decisions (clinical risk); documentation overhead from manual workarounds
- **Families**: Caregiver anxiety under operational failures; travel burden for alternative care; medication access uncertainty (API shortage)

### Regional Resilience Layer
- **[[Ontario Health]] Children's Hospital Group**: SickKids (Toronto), McMaster (Hamilton), ACME (Ottawa), IWK (Halifax). ACME supply disruption weakens mutual-aid cascade and pediatric research capacity across 4 provinces
- **MOH Funding & Policy**: Emergency procurement variances, capital equipment budgeting delays, regulatory escalations

### National Pediatric Resilience
- **[[Health Canada]] TPD & BRDD**: Federal coordination of pediatric therapy supply (life-critical antibiotics, anticonvulsants, anticancer drugs)
- **[[Five Eyes]] Intelligence**: [[CSIS]] alerts on Russia/Belarus sanctioned APIs, Taiwan trade risk, China MSS activity targeting pediatric genomics (rare disease research)

### (Grand)Children Layer: Civilization Stake
Pediatric medical resilience is **non-negotiable infrastructure**. Disruption of ACME's supply chain, research capacity, or clinical care cascades to:
- Delayed rare disease diagnoses (pediatric cancer, metabolic disorders, immunodeficiency)
- Lost research cohorts (genomic basis of childhood disease)
- Clinician migration (brain drain to better-resourced facilities)
- Public trust collapse (parental hesitancy → vaccination delays → preventable outbreaks)

Protecting pediatric medical infrastructure is protecting society's future. The stakes are existential.

---

**Reference**: [[CHEO 2018 DDoS]], [[Lurie Children's Hospital 2024]], [[IEC 62443]], [[ISO 14971]], [[PHIPA]], [[Bill C-26]]

**Document**: Phase 1c Executive Narrative  
**Lines**: 288 | **Priorities**: 5 | **Stakeholder Layers**: 4 | **Created**: 2026-05-09
