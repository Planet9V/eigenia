---
aliases: [HAZOPS, Safety Analysis, Risk Assessment]
type: facility-reference-model
category: acute-care-hospital
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-civic-hospital, phase/1c, sector/healthcare, hazops/cyber-physical, safety/patient-impact]
related: ["[[ACME Ottawa Civic Hospital]]", "[[ISO 14971]]", "[[IEC 80001]]", "[[NIST CSF 2.0]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Civic Hospital HAZOPS

## 10 Cyber-Incident Scenarios Mapped to Patient Safety

| # | Cyber Incident | Clinical Hazard | ISO 14971 Risk | Impact | Severity | Likelihood | Risk Level |
|---|---|---|---|---|---|---|---|
| 1 | [[EHR]] ransomware | ED diversion, surgical cancellation, medication lookup delay | Medical device unavailability | Mortality +1.2%, LOS +8h | Catastrophic | Medium | **Critical** |
| 2 | Infusion pump firmware tampering | Wrong-rate delivery (hyperkalemia, fluid overload) | Therapeutic overdose/underdose | Acute kidney injury, cardiac arrest | Catastrophic | Low | **High** |
| 3 | BMS HVAC cyber control | Positive-pressure loss, contamination cascade | Surgical-site infection (SSI), VAP | SSI +2.3%, VAP +1.8%, readmit +6% | Major | Medium | **Critical** |
| 4 | PACS/Imaging downtime | Trauma diagnosis delay, missed fracture, ICH | Clinical decision-support unavailability | Mortality +0.8%, door-to-image >60 min | Catastrophic | Medium | **Critical** |
| 5 | Pharmacy automation tampering | Manual dispensing surge, labeling errors | Medication error (wrong drug, wrong strength) | Adverse drug event +5%, preventable harm +3% | Major | Medium | **Critical** |
| 6 | Patient portal credential compromise | Identity spoofing, medical record misappropriation | Breach of confidentiality, fake clinical directives | [[HIPAA]] fine $100K–$1.5M | Major | Medium | **High** |
| 7 | Ontario Health Connect DDoS | Cross-hospital communication loss, specialist consult delay | Clinical communication unavailability | Consult delays, referral backlog +40% | Major | Low | **High** |
| 8 | Lab middleware / LIS compromise | Wrong-result reporting (hemoglobin, glucose, troponin) | Clinical decision-support on false data | Misdiagnosis (sepsis, MI, DKA), iatrogenic harm +1.5% | Catastrophic | Low | **High** |
| 9 | Tele-ICU partner hospital attack | Audio/video loss, monitoring stream corruption | Remote critical care unavailability | ICU handoff delay, 30-day mortality +0.6% | Major | Low | **High** |
| 10 | Data center power/cooling cyber attack | [[SCADA]]/[[BACnet]] compromise, multi-system unavailability | Multi-system unavailability (diagnostic/therapeutic) | All clinical systems dark 15–60 min | Catastrophic | Very Low | **Critical** |

## Scenario 1: EHR Ransomware (4-Hour Outage)

**Cyber Event**: Ransomware encrypts [[Epic]] database partitions; backup unaffected but recovery manual (2–4 h window).

**Clinical Cascade**:
- **Hour 0–1**: ED triage chart lookup fails → handwritten notes → 15-min delay per patient
- **Hour 1–2**: Medication reconciliation unavailable → pharmacist manual cross-check (30 min per patient, +5× error risk)
- **Hour 2–4**: Scheduled surgeries cancelled (no pre-op labs, imaging, allergies visible)
- **Recovery (4–6 h)**: [[Epic]] restored; backlog clears over 8–12 h

**KPI Impact**:

| Metric | Baseline | During Outage (4 h) | 24-h Cumulative |
|--------|----------|--------|---------|
| ED LOS | 4.2 h | +2.1 h (avg) | +1.2 h |
| OR case cancellations | 0–2 | 12–18 | 8–12 |
| Adverse drug events | 0.8/day | +5 (1.4/day) | +4 |
| Mortality (30-day) | baseline | +0.4 case estimate | +0.2 case (annualized: +73) |

## Scenario 3: BMS HVAC Positive-Pressure Loss

**Cyber Event**: Attacker modifies damper setpoints on OR positive-pressure control; HVAC alarm silenced via HMI compromise.

**Detection**: Facility manager notes unusual temps (room settling to 18°C over 2 h, alarm muted). 2-h detection lag.

**Clinical Impact**: OR 1–3 traffic and door-open events → positive-pressure loss → microbial ingress.

**KPI Impact**:

| Metric | Baseline | Post-Incident (30-day) |
|--------|----------|--------|
| SSI rate (acute care) | 1.8% | +2.3% = **4.1%** |
| VAP rate (ICU) | 3.2 | +1.8% = **5.0%** |
| Antibiotic escalation rate | 12% | +8% = **20%** |
| 30-day readmission rate | 6.1% | +6% = **12.1%** |
| ICU LOS (infected cohort) | 8.2 days | +3.1 days avg |

## Scenario 4: PACS/Imaging Downtime

**Cyber Event**: Ransomware locks imaging middleware; [[DICOM]] archive unreachable; offline fallback requires manual CD burn + 30-min delay.

**Clinical Cascade**:
- **Trauma (Level 1)**: CT scan for head injury → 45-min delay (SLA: 15 min) → repeat imaging post-recovery → excess radiation
- **ED chest pain**: CXR for pneumonia → hand-written note vs. radiologist interpretation → misdiagnosis risk +18%
- **ICU rounds**: Portable CXR for VAP assessment → no prior comparison images → clinician confidence -60%

**KPI Impact**:

| Metric | Baseline | During Outage |
|--------|----------|--------|
| Door-to-imaging (trauma) | 12 min | 45 min (+275%) |
| Imaging diagnostic accuracy (CXR) | 94% | 78% (-16%) |
| Trauma mortality (48-h) | 2.1% | +0.8% = **2.9%** |
| Repeat imaging (post-recovery) | 0 | 8–12 additional exams |

## RAMS (Reliability, Availability, Maintainability, Safety) Profiles

| System | Function | FIT | MTBF | MTTR | Safety Function | Redundancy |
|--------|----------|-----|------|------|---|---|
| **[[Epic]] EHR** | Clinical data store | ~2000 | 1200 h (50 days) | 2 h (manual recovery) | SOP availability | N+1 database nodes; RPO 15 min |
| **Infusion Pump** | Medication delivery | ~0.01–0.1 | 50,000 h (5.7 yr) | 30 min (replace unit) | CQI rule library (dose-rate check) | Manual override + nurse double-check |
| **BMS HVAC** | Environmental control | ~8000 | 2000 h (83 days) | 4 h (manual damper adjust) | Positive-pressure interlock | Redundant dampers, manual override |
| **PACS Middleware** | Imaging archive access | ~1800 | 900 h (37 days) | 1.5 h (restart service) | [[DICOM]] validation, stale-image detection | Offline cache (24 h) + CD burn fallback |
| **Pyxis (Pharmacy)** | Drug dispensing | ~3200 | 800 h (33 days) | 2.5 min per RX (manual) | Label inspection, barcode scan | Manual cabinet + human verification |
| **Patient Portal** | Patient engagement & auth | ~500 | 5000 h (208 days) | 15 min (cache refresh) | MFA, session timeout (15 min idle) | [[CDN]] fallback, IP geo-block |
| **LIS Middleware** | Lab result integration | ~2600 | 1000 h (42 days) | 1.5 h (service restart) | Result validation rules, stale-data marker | Manual result entry fallback |
| **Tele-ICU Gateway** | Remote intensive care | ~1400 | 700 h (29 days) | 45 sec (automatic failover) | Audio/video loss detection, handoff checklist | Dual-gateway (active-active) + phone fallback |
| **Data Center [[SCADA]]** | Power & cooling automation | PDU FIT: 7500; Gen FIT: 4200 | Generator MTBF: 2000 h | Manual intervention (5–10 min) | UPS → generator start; low-voltage alarm | [[UPS]] (45-min hold), manual generator start |

## Clinical KPI Targets (30-Day Rolling Baseline)

| KPI | Baseline | Target | Notes |
|---|---|---|---|
| **Mortality (30-day, all-cause)** | 2.8% | <2.8% | Cyber incident should not exceed baseline |
| **ED LOS (median)** | 4.2 h | <5.0 h during cyber recovery (SLA) |
| **Surgical-site infection (SSI) rate** | 1.8% | <2.2% post-HVAC incident (30-day monitoring) |
| **Adverse drug event (preventable)** | 0.8/day | <1.2/day during [[EHR]] outage (SLA) |
| **Lab result turnaround time (stat)** | 18 min | <25 min during LIS downtime (manual fallback) |
| **Sepsis bundle compliance** | 91% | >85% during [[EHR]]/imaging downtime |
| **VAP rate (ICU)** | 3.2 per 1000 VAD-days | <4.0 during/post-HVAC incident |
| **Tele-ICU handoff time** | 12 min | <18 min during connectivity loss |

## Safety Functions Inventory

### Clinical Supervision & Verification
1. **Nurse double-check** (infusion pump, medication name/dose) — human redundancy; latency +3–5 min
2. **Pharmacist label review** ([[Pyxis]], manual override) — stops 80–90% of look-alike errors
3. **Radiologist interpretation** (PACS, CXR/CT) — off-line review fallback if [[DICOM]] unavailable
4. **Code-team verbal handoff** (tele-ICU loss) — phone-based backup for critical care coordination
5. **Facility manager HVAC rounds** (BMS loss) — manual visual inspection q1h during incident

### Automated Safety Functions
1. **Infusion pump CQI rules** — dose-rate guard, bolus max, hard-pump maximum, infusion-line disconnect sensor
2. **BMS HVAC interlocking** — positive-pressure loss → OR door-opening alarm + page facility manager
3. **[[EHR]] clinical decision support** — drug-drug interaction check, allergy alert, renal dosing rule
4. **Alarm management system** — centralizes physiologic monitor alarms, deduplicates, prioritizes critical events
5. **Lab result validation rules** — bounds check, delta check (compare to prior value), reflexive testing trigger

---

**Standards**: [[ISO 14971]], [[IEC 80001-1]], Ontario Patient Safety Indicators

## See also

[[ACME Ottawa Civic Hospital]] · [[Civic Hospital Threat Profile]] · [[Civic Hospital Narrative]]
