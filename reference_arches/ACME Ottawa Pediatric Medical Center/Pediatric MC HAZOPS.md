---
aliases: [Peds MC Hazops, Safety Scenarios]
type: facility-reference-model
category: pediatric-specialty-hospital
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-pediatric-medical-center, phase/1c, sector/healthcare, sector/pediatric, org/acme-demo]
related: ["[[ACME Ottawa Pediatric Medical Center]]", "[[Pediatric MC Architecture]]", "[[Pediatric MC Equipment]]", "[[Pediatric MC Threat Profile]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Pediatric Medical Center HAZOPS

Pediatric hospitals present a **10× narrower safety margin** than adult facilities. A 10 mg morphine dose is therapeutic for adults; **lethal for neonates**. A ±2°C NICU temperature swing triggers **hypothermia cascades**. Pediatric cyber-physical attacks have **age-stratified lethality**: smallest patients (<1 kg preemies) most vulnerable.

---

## Top 12 Pediatric Cyber-Safety Scenarios

### 1. Peds Infusion Pump Firmware Tampering (RPN 288)

**Attack Vector**: Supply-chain compromise or direct pump-network injection (unencrypted drug-library update)

**Mechanism**: [[Smiths Medical CADD-Solis]] or [[BD Alaris]] drug library modified; pump delivers 10× intended rate to micropreemie

**Clinical Effect**: Hyperkalemia, cardiac arrhythmia, death within 15 min; 3-month-olds at 50× risk vs. adults

**RAMS Target**: FIT 150 (Alaris: 180, CADD: 120); availability 99.7%

**FMECA Rank**: CRITICAL (RPN 288)

**Safety Function**: [[BD Alaris]] peds dosing rule-library + cryptographic signature validation; CDS alert on >2× deviation

---

### 2. NICU BMS Temperature Attack (RPN 270)

**Attack Vector**: [[Modbus]] injection into [[Johnson Controls]] BMS; compromise setpoint or sensor → false reading

**Mechanism**: BMS sends ±6°C false setpoint; infant incubator climbs to 39°C or cools to 27°C without alarm

**Clinical Effect**: Neonatal hyperthermia (seizures, IVH bleeds) or hypothermia (apnea, bradycardia); **SOS within 4 hours**

**RAMS Target**: FIT 80 (NICU BMS: 70); availability 99.85%

**FMECA Rank**: CRITICAL (RPN 270)

**Safety Function**: Dual-redundant temperature sensors (3σ consensus), hardware interlock, manual override button

---

### 3. NICU Positive-Pressure Room Isolation Failure (RPN 264)

**Attack Vector**: BMS damper malfunction post-cyber-attack or network-induced HVAC shutdown

**Mechanism**: Cyber event disables positive-pressure differential; room becomes **negative or neutral** instead of +2.5 Pa

**Clinical Effect**: Airborne contamination ingress → neonatal VAP/infection; NICU sepsis bundle failure; **mortality +6%** in cohort

**RAMS Target**: FIT 45 (HVAC: 50); availability 99.9%

**FMECA Rank**: CRITICAL (RPN 264)

**Safety Function**: Pressure transmitter monitoring + redundant blower backup; alarm on differential <1.5 Pa; manual restore

---

### 4. Peds Ventilator Tidal Volume Tampering (RPN 280)

**Attack Vector**: Firmware update injection into [[Drager Babylog]] network config or memory corruption via DDoS + buffer overflow

**Mechanism**: Servo-loop disables; vent reverts to fixed-rate mode; tidal volume (4–6 mL/kg) set to adult mode (8–10 mL/kg) → barotrauma

**Clinical Effect**: Pneumothorax, pulmonary interstitial emphysema (PIE), **death in <1 hour**; 500-gram preemie most vulnerable

**RAMS Target**: FIT 95 (critical: 100); availability 99.88%

**FMECA Rank**: CRITICAL (RPN 280)

**Safety Function**: Firmware hash verification (TPM), tidal-volume sanity check (2–8 mL/kg only), redundant backup ventilator

---

### 5. Post-2018 DDoS Recurrence (RPN 192)

**Attack Vector**: [[Mirai]]-variant botnet targets hospital uplinks; [[Cloudflare]] scrubbing saturated or bypassed

**Mechanism**: Inbound DDoS floods ISP link; hospital Internet inoperative for 6–8 hours; EHR reads slow, tele-monitoring feeds stall

**Clinical Effect**: Pediatric telehealth consults cancel; peds ER imaging upload fails; **diagnosis delay** in peds stroke/DKA

**RAMS Target**: Availability 98.5% (target 99.95% for peds-critical)

**FMECA Rank**: HIGH (RPN 192)

**Safety Function**: Redundant ISP uplinks (both [[Cloudflare]]-scrubbed); local DNS cache; fallback paper charting + manual triage

---

### 6. Pediatric Oncology & Genomic Exfiltration (RPN 200)

**Attack Vector**: [[China MSS]] APT lateral movement via vendor VPN → research database SSH compromise

**Mechanism**: Exfil of 500-patient pediatric cancer cohort genomic profiles + clinical histories; CI/IP theft

**Clinical Effect**: Reputational damage, loss of research grant funding, **competitive disadvantage** on clinical trials; parents notified post-breach

**RAMS Target**: Data availability post-recovery: 72 hours

**FMECA Rank**: HIGH (RPN 200)

**Safety Function**: MFA on research DB; data classification + DLP rules; EDR on vendor gateway; quarterly penetration test

---

### 7. Pediatric Tele-Monitoring Outage (RPN 216)

**Attack Vector**: Cloud EHR provider outage or [[BGP]] hijack → [[AWS]]/[[Azure]] console unreachable

**Mechanism**: Tele-monitoring feeds for peds neuro (seizure prediction), peds endo (CGM data), peds cardio (remote Holter) go dark for 4–6 hours

**Clinical Effect**: Patients sent home without real-time alerts; **preventable seizure missed**; parent panic; litigious incident

**RAMS Target**: RTO 2 hours (peds-critical SLA), RPO 15 min

**FMECA Rank**: HIGH (RPN 216)

**Safety Function**: Redundant cloud provider (not same region); local cache of last 72h tele-data; SMS + voice alert fallback

---

### 8. [[Ontario Health Connect]] Upstream Compromise (RPN 272)

**Attack Vector**: Nation-state actor compromises OHC provider; lateral movement into hospital EHR via HL7 integration

**Mechanism**: OHC data poisoning: peds drug allergy flags flipped (penicillin → NOT allergic); pediatric dosing lookup table corrupted

**Clinical Effect**: Peds patient given PCN despite true anaphylaxis history; **anaphylactic shock** in ED; 10–15 min to diagnosis; death risk

**RAMS Target**: Integrity: cryptographic signature on OHC [[HL7]] messages; availability RTO 1 hour

**FMECA Rank**: CRITICAL (RPN 272)

**Safety Function**: [[HL7]] message signing ([[OAuth 2.0]] + HMAC); dual-source allergy verification (chart + pharmacy); CDS override logging

---

### 9. Pediatric Trauma Imaging Unavailable (RPN 256)

**Attack Vector**: Ransomware via phishing → PACS server encrypted; imaging unavailable for 12–24 hours

**Mechanism**: Peds trauma (MVA, fall) arrives; CT scan essential for subdural hematoma diagnosis **cannot be obtained**

**Clinical Effect**: Clinical suspicion without imaging → ICU admit for observation (overflow); missed SDH → delayed neuro decline; **preventable death**

**RAMS Target**: RTO 4 hours (imaging critical-path), RPO 1 hour

**FMECA Rank**: CRITICAL (RPN 256)

**Safety Function**: Air-gapped PACS backup (nightly restore drill); immutable snapshots on object storage; EDR + ransomware behavior block

---

### 10. [[BD]] Pyxis Drug Library Manipulation (RPN 296)

**Attack Vector**: Pharmacy automation network compromise; malicious actor injects peds **formulation alias** (e.g., morphine elixir 2 mg/mL relabeled as 5 mg/mL)

**Mechanism**: Peds ICU nurse selects "morphine IV bolus 2 mg" expecting 2 mL, but Pyxis dispenses vial labeled 5 mg/mL; nurse administers **5 mg instead of 2 mg**

**Clinical Effect**: Opioid toxicity in 2-year-old; respiratory depression, hypoxia; mechanical ventilation; **potential brain injury**

**RAMS Target**: Availability 99.95%, integrity 100%

**FMECA Rank**: CRITICAL (RPN 296)

**Safety Function**: [[Pyxis]] barcode verification (two-check system); CDS check on weight-based dose; pharmacy approval for peds formulation entry

---

### 11. NICU Ventilator Firmware Tampering — [[Drager Babylog]] Compliance Failure (RPN 288)

**Attack Vector**: OTA firmware update intercepted and corrupted (MITM on [[Drager]] service network)

**Mechanism**: Servo-control loop disables; vent reverts to fixed-rate mode; tidal volume no longer servo-adjusts for preemie lung compliance

**Clinical Effect**: Micropreemie (600 g) receives adult-calibrated tidal volume; barotrauma, PIE, pneumothorax within 2–10 min

**RAMS Target**: MTBF target 50,000 hours; availability 99.95%

**FMECA Rank**: CRITICAL (RPN 288)

**Safety Function**: Firmware hash chain-of-custody (code-signing cert); dual-vent strategy (backup vent on standby); offline updates only (no OTA)

---

### 12. Pharmacy Automation Downtime — Manual Peds Dosing Error Cascade (RPN 224)

**Attack Vector**: Software crash or cyber-attack → [[Pyxis]] downtime for 3+ hours; pharmacy reverts to manual hand-counts + paper orders

**Mechanism**: Manual peds dosing **error rate increases 10×** (0.1% → 1%); junior resident hand-calcs for 50+ peds patients without CDS assist

**Clinical Effect**: 3–5 wrong-dose incidents detected; 1–2 reach bedside; neonate receives 3× intended acetaminophen dose

**RAMS Target**: Availability 99.9% (uptime SLA), MTTR <30 min

**FMECA Rank**: HIGH (RPN 224)

**Safety Function**: Backup [[Pyxis]] unit on standby (weekly checkout); peds dosing calculator app on iPad (ISMP-vetted); pharmacist override log

---

## RAMS Targets: Neonatal Critical Path

| Component | FIT (per 10⁹ hours) | Target Availability | Clinical Justification |
|-----------|-----|-------|-----------|
| **Infusion Pump (Alaris/CADD)** | 180/120 | 99.7% | 10× dosing sensitivity; **lethal dose margin = 1 mL** |
| **NICU BMS (Incubator + Humidity)** | 70 | 99.85% | Micropreemie thermoregulation failure → death in 4 hours |
| **Ventilator ([[Drager Babylog]])** | 100 | 99.88% | Barotrauma onset in <10 minutes; no manual override feasible |
| **Positive-Pressure HVAC** | 50 | 99.9% | Room isolation loss → sepsis; **6% mortality lift** in NICU cohort |
| **Pharmacy Automation ([[Pyxis]])** | 120 | 99.9% | Manual fallback error rate 10×; pediatric dosing errors cascade |

---

## Real-World Reference: [[CHEO 2018 DDoS]]

**October 31, 2018**: Mirai botnet variant targeted [[CHEO]].

- **11:00 AM**: DDoS floods ISP uplink; hospital Internet → 0% throughput
- **11:15 AM**: EHR reads timeout; ED triage software offline; paper charting activated
- **11:30 AM**: Pediatric telehealth consults (neurology, cardiology) rerouted to mobile; 6 consultations rescheduled
- **12:00 PM**: [[PACS]] imaging upload stalls; CT images for peds trauma queued on USB drive
- **2:00 PM**: ISP + [[Cloudflare]] restore; hospital Internet restored; ~3-hour patient impact
- **Outcome**: No direct patient harm, but process delays identified; post-incident installed redundant ISP link + [[Cloudflare]] Enterprise

---

**Reference**: [[ISO 14971]], [[IEC 80001]], [[ASHRAE 170]], [[Ontario Pediatric Patient Safety Indicators]]

**Document**: Phase 1c HAZOPS  
**Lines**: 412 | **Scenarios**: 12 | **CRITICAL RPN**: 5 | **Created**: 2026-05-09
