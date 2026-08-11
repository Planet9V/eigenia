---
aliases:
  - Nashville Hazard Study
  - Nashville Safety Analysis
  - Nashville Risk Profile
type: facility-reference-model
category: surface-treatment
status: draft
domain: OT
tags:
  - domain/OT
  - facility/acme-nashville-surface-treatment
  - phase/1c
  - safety/hazops
  - safety/rams
related:
  - "[[ACME Nashville Surface Treatment]]"
  - "[[Nashville Threat Profile]]"
  - "[[Nashville Narrative]]"
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME Nashville is fictional, layered on [[Aalberts Industries]] Nashville TN. All hazard scenarios are plausible for surface-treatment class; financial figures are typical for industry, not ACME-specific actual data.

---

## HAZOPS Scenario Summary (12 Critical Scenarios)

| ID | Deviation | Consequence | SIL/SL-T | Residual Risk | $-Loss (Typical) |
|----|-----------|-------------|----------|----------------|-----------------|
| **H1** | HCN release (acid+cyanide mixing) | Acute fatality (15-min LCt50=20 ppm·min) | SIL 2 / SL-T 2 | 1 fatality per 50 yrs | $2.5–5M |
| **H2** | Hexavalent Cr(VI) mist inhalation | Chronic carcinogen; OSHA PEL 5 µg/m³ | SIL 1 / SL-T 2 | 10–15% elevated lung CA risk over 30yr | $1–2M (over 30 yrs) |
| **H3** | Hydrogen accumulation → explosion | Deflagration (120–200 psi); 5 injuries | SIL 2 / SL-T 3 | 1 event per 100 yrs if H2 detector fails | $5–15M |
| **H4** | Tank overheating / thermal runaway | Violent spattering; burns to operators | SIL 2 / SL-T 2 | 2nd-degree burn to 1–2 operators per 15 yrs | $200K–800K |
| **H5** | Ventilation/scrubber failure | Airborne Cr(VI), Ni, HCN reach zone | SIL 2 / SL-T 1 | 1–2 OSHA citations per 5 yrs | $100K–300K |
| **H6** | Rectifier arc flash / electrical fire | 3rd-degree flash burn (11 cal/cm² @ 18"); toxic smoke | SIL 1 / SL-T 2 | 1 event per 20 yrs | $500K–2M |
| **H7** | Cross-contamination (acid + bleach) | Toxic chlorine gas (Cl₂); IDLH 10 ppm | SIL 2 / SL-T 2 | 1 minor incident per 10 yrs | $100K–500K |
| **H8** | EPA RCRA reporting failure (cyber) | Ransomware locks MES waste-log system | SIL 3 / SL-T 3 | 1 minor probe attempt per 2 yrs | $50K–100K |
| **H9** | OSHA PSM cyber tampering (scale spoofing) | Facility unknowingly exceeds PSM threshold | SIL 3 / SL-T 2 | 1 out-of-sync event per 3 yrs (caught) | $100K–300K |
| **H10** | Wastewater pH excursion (cyber tampering) | Effluent pH outside NPDES permit | SIL 2 / SL-T 2 | 1 minor excursion (30 min) per 1 yr | $50K–200K |
| **H11** | Firmware tampering → off-spec aerospace parts | Parts sold to Boeing unaware; post-delivery inspection catches issue | SIL 3 / SL-T 3 | 1 minor recipe drift per 1.5 yrs (detected) | $2–10M |
| **H12** | Ransomware encrypts MES → FAA traceability loss | Batch records unavailable >72 hrs | SIL 3 / SL-T 3 | 1 ransomware attempt per 6 mo (caught by EDR) | $1–5M |

---

## RAMS Profile (Reliability, Availability, Maintainability, Safety)

| Component | MTBF (yrs) | MTTR (hrs) | Notes |
|-----------|-----------|----------|-------|
| **ControlLogix PLC** (redundant pair, hot-standby) | 25–30 | 2–4 | Proven in plating; dual CPU mitigates single-point failure |
| **GuardLogix safety module** (SIS tier) | 30–35 | 1–2 | Low FIT; certified SIL 3; annual proof-test (2% coverage) |
| **Rectifier (24 VDC 500A)** | 15–20 | 8–12 | Thyristor aging; thermal cycling degrades transformer |
| **Hydrogen detector** (4–20 mA, catalytic bead) | 12–18 | 0.5–1 | Sensor drift; quarterly bump-test (test gas 500 ppm) |
| **Differential-pressure gauge** (filter monitor) | 28–35 | 0.1–0.5 | Mechanical, reliable; visual check weekly |
| **Fan motor** (440 VAC 2 HP, IE3 efficiency) | 22–28 | 4–8 | Bearing lubrication extends life; vibration monitoring prevents seize |
| **Cooling pump** (1.5 HP, gear-driven, duty+standby) | 18–25 | 3–6 | Standby pump increases MTBF; annual bearing inspection |
| **Temperature sensor** (RTD Pt100, dual redundant) | 50–60 | 0.2–0.5 | High reliability; cross-check logic detects drift |
| **Load cells** (redundant, summing junctions) | 22–32 | 0.5–2 | Recalibration 2×/yr (temp-compensated); spare cell in stock |

**System MTBF Estimate** (conservative, full availability):
- With hot-standby PLC + dual cooling pump + dual load cells → **~15–18 years mean time to unplanned maintenance**
- **MTTR target**: <4 hours for rectifier swap; <2 hours for sensor replacement; <30 min for PLC failover (automatic)

---

## FMECA Highlights (Top 5 by Criticality)

| Rank | Component | Failure Mode | Severity | Occ./yr | Detection | Criticality | Mitigation |
|------|-----------|--------------|----------|---------|-----------|-------------|-----------|
| **1** | Hydrogen detector | Sensor drift / failure to alarm | **10 (death)** | 0.05 | Poor | **50** | Bump-test quarterly; 5-yr shelf-life replacement |
| **2** | Cooling pump | Both duty+standby fail (corrosion, cavitation) | **9 (burn + thermal runaway)** | 0.08 | Fair | **70** | Centrifugal pump material upgrade (stainless impeller) |
| **3** | Rectifier | Thyristor short (arc flash, smoke) | **9 (arc flash burn)** | 0.12 | Poor | **97** | Monthly thermal IR scan; annual insulation test |
| **4** | MES database (ransomware) | Encryption of batch records | **9 (FAA grounding)** | 0.15 | Fair | **136** | Air-gapped backup (hourly); WORM storage; EDR 24/7 |
| **5** | Load cell (scale spoofing) | Gross measurement error (>10%) undetected | **8 (PSM exceedance)** | 0.10 | Fair | **64** | Dual cells with 5% threshold alarm; monthly gravimetric check |

---

## Safety Functions & SIS Architecture

### Layer-of-Protection Analysis (LOPA) — Hydrogen Accumulation Example

**Unmitigated Risk**: Deflagration in electroless Ni tank → **HAZMAT Class 1 (5+ injuries)**

**IPL Sequence** (target SIL 2):
1. **IPL-1 (Engineering Control)**: Adequate ventilation 12 ACH, inspected monthly. **RRF: 10**
2. **IPL-2 (Safety Instrumented System)**: H₂ detector + SIS PLC de-energize rectifier @ 500 ppm. **RRF: 100**
3. **IPL-3 (Administrative)**: Operator training on hydrogen hazard; ATEX grounding. **RRF: 5**

**Cumulative RRF**: 10 × 100 × 5 = **5,000** → Residual risk **1 event per 50–100 yrs** (acceptable for ACME tier-2 process safety)

### Safety Interlocks

| Interlock ID | Condition | Action | Status |
|--------------|-----------|--------|--------|
| **SI-01** | H₂ alarm (>500 ppm) | De-energize all rectifiers; energize exhaust fan to max; siren + beacon alert | SIL 2 certified; proof-test 2×/yr |
| **SI-02** | Temp sensor (>45°C cathode solution) | Reduce rectifier duty cycle to 50%; alert operator via HMI | SIL 1; monitored daily |
| **SI-03** | Tank overfill (level sensor high) | Stop chemical feed pumps; siren; manual resume required | SIL 1; tested weekly |
| **SI-04** | Power loss (UPS <10% battery) | Switch to battery backup (4-hr duration); notify MES | Availability control; non-safety-critical |
| **SI-05** | pH out-of-range (dual probe disagreement >0.5 unit) | Stop peristaltic pump; alert operator to recalibrate probes | SIL 1; tested 1×/week |

---

## Lessons Learned & Guardrails

1. **Dual operators for chemical batching**: No single person can authorize cyanide or chromium additions; 2-signature rule prevents H1/H7 scenarios.
2. **Hydrogen detector maintenance discipline**: Quarterly bump-test (500 ppm test gas, $50 per test) is non-negotiable; sensor drift is insidious and undetectable without active testing.
3. **Thermal imaging program**: Bi-annual IR scan of rectifier lugs catches loose connections before arc-flash. RoI: $2K/yr scan cost prevents $500K+ rectifier replacement.
4. **Air-gapped MES backup**: Network ransomware has 80% success rate if backups are accessible to same credentials. WORM NAS (write-once-read-many) + offline tape restore proven in 2022 incident.
5. **Cyber-physical co-design**: H9 (scale spoofing) and H11 (recipe tampering) cannot be mitigated by IT security alone; SIS PLC must include process-envelope checks (concentration vs. tank age, weight vs. historical baseline).

---

## Risk Summary & Governance

| Risk Level | Count | Control Confidence | Action |
|-----------|-------|-------------------|--------|
| **Critical** (SL-T 3, residual >$1M) | 3 scenarios: H3, H11, H12 | High (SIS PLC + air-gapped backup proven) | Maintain current controls; annual audit by 3rd-party SIS engineer |
| **High** (SL-T 2, residual $100K–$1M) | 6 scenarios: H1, H2, H4, H5, H6, H7 | Medium (blend of engineering + admin controls) | Quarterly safety stand-down review; monthly vibration/IR monitoring |
| **Medium** (SL-T 1–2, residual <$100K) | 3 scenarios: H8, H9, H10 | Medium-High (cyber controls + operator vigilance) | Semi-annual cybersecurity risk re-assessment; monthly spot-check audits |

**Overall ACME Nashville Risk Posture**: **Acceptable under [[IEC 62443]] SL-T 2** with disciplined compliance to control schedule.

---

## Cross-references

- [[ACME Ottawa Data Center]]
- [[ACME Ottawa Substation]]
- [[ACME Ottawa Civic Hospital]]
- [[ACME Ottawa Pediatric Medical Center]]

## See also

- [[Nashville Architecture]] — safety zone design
- [[Nashville Threat Profile]] — cyber-physical integration
- [[Nashville Narrative]] — executive risk summary
- [[IEC 62443]] — security requirements correlation
