---
aliases: [Narrative, Board Brief, Executive Summary]
type: facility-reference-model
category: acute-care-hospital
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-civic-hospital, phase/1c, sector/healthcare, narrative/board-brief]
related: ["[[ACME Ottawa Civic Hospital]]", "[[Civic Hospital HAZOPS]]", "[[Civic Hospital Threat Profile]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Civic Hospital Narrative

## When Clinical Systems Fail, Patients Die

**ACME Ottawa Civic Hospital** operates a 600-bed facility with Level 1 trauma capabilities, serving 500,000+. The hospital faces a sophisticated, multi-vector threat landscape dominated by ransomware (T1486/T1485) and credential compromise (T1078). Remote vendor relationships (T1199) and legacy device trust require continuous monitoring.

### The Clinical Stake

On any given day, the hospital manages:
- 12 ED trauma bays (motor-vehicle collisions, penetrating injuries, falls from height)
- 40 ICU beds (ventilator-dependent patients, sepsis, post-cardiac surgery, respiratory failure)
- 8 ORs delivering 100+ surgical procedures weekly
- Laboratory processing 5,000 tests daily (blood cultures, troponin, glucose, coagulation)
- Imaging (CT, MRI, ultrasound) with 200+ studies daily — critical to trauma diagnosis

**The Mortality Math**: A 4-hour [[EHR]] outage cascades into 1.2–8 additional deaths annualized. A HVAC system failure in the OR introduces airborne contamination, elevating surgical-site infection rates from 1.8% to 4.1% — an additional 20–30 preventable infections per year.

## Six Proven Threat Groups

### 1. [[BlackCat]] (ALPHV) — The $22M Precedent

March 2024: [[BlackCat]] encrypted Change Healthcare (US largest healthcare clearinghouse), leaving 900+ US hospitals unable to process insurance claims, send prescriptions, or access patient records for 5+ days. Change Healthcare paid $22M ransom.

**This is not hypothetical. This is current.** [[ACME]] runs on similar infrastructure ([[Epic]], [[Veeam]] backups, [[ESXi]] virtualization). A near-identical attack is feasible.

### 2. [[LockBit]] — The Canadian Precedent

December 2022: [[LockBit]] encrypted [[SickKids Hospital]] (Toronto), triggering "Code Grey" (full shutdown) for 72+ hours.  
October 2024: [[LockBit]] breached a Southwestern Ontario healthcare [[MSP]], compromising 5 regional hospitals, 5.6M patient visits, and 1,400+ employee SSNs.

**This is local. This is recent.** [[ACME]]'s vendors and network service providers face the same risk.

### Other Groups

3. **[[Cl0p]] (MOVEit Exploiters)** — 2023–2024 exploited unpatched MOVEit file-transfer appliances in Eastern Ontario hospitals
4. **[[Royal]], [[Conti Successors]], Hacktivists** — Less visible but actively targeting hospital payment systems, HVAC infrastructure
5. **Nation-State APTs** (Iran, China) — Lower frequency but higher sophistication; targeting medical AI models, genomic research

## The Kill Chain: From Credential to Cascade

1. **Initial Access (T1199 / T1078)**: Clinician receives phishing email. Clicks link. Credentials stolen.
   - Example: "[[Epic]] password reset" email → attacker captures [[AD]] credentials → logs into [[Epic]] from home IP

2. **Lateral Movement (T1570 / T1039)**: Attacker maps hospital network, discovers unpatched workstations, RDPs to clinical server.
   - Example: Compromised clinician → RDP to [[Epic]] terminal server → Access to clinical file share (\\\\fileshare-clinical\\RadiologyDocs)

3. **Ransomware Deployment (T1486)**: Attacker deploys ransomware to:
   - **Clinical File Servers**: All [[EHR]] documents encrypted. Hospital cannot access patient charts.
   - **[[ESXi]] Hypervisor**: All clinical VMs ([[Epic]], PACS, lab systems) encrypted simultaneously. Hospital goes dark within minutes.
   - **[[Veeam]] Backup**: All backup snapshots deleted. No recovery possible for days/weeks.

4. **Extortion & Payment Pressure**: Attacker demands $1–10M ransom. Hospital faces choice:
   - Pay ransom (funding criminal ecosystem, legal liability, no guarantee of decryption)
   - Refuse and operate on paper (clinical delays, medication errors, preventable mortality)

## Five Board-Level Priorities (Next 12 Months)

### Priority 1: Epic VPN & Privilege Access Management (PAM)
- **Current State**: Clinicians access [[Epic]] via VPN with username/password. Vendors access clinical devices with shared credentials.
- **Risk**: Credential compromise = full [[EHR]] access. No session recording. No unusual-access detection.
- **Action**: Deploy [[CyberArk]] PAM for all [[Epic]] admin accounts, vendor sessions, [[ESXi]]/[[Veeam]] access. Enforce [[MFA]] (TOTP or hardware key) on all remote [[Epic]] logins. Geo-fence non-North American access.
- **Cost**: $500K–$1M | **Timeline**: 6 months | **ROI**: Prevents 80% of credential-based lateral-movement attacks

### Priority 2: Philips & Vendor Device Firmware Audit & Control
- **Current State**: [[Philips Healthcare]] monitors, [[GE Healthcare]] imaging, and [[Mindray]] devices receive OTA firmware updates. No signature verification. No rollback plan.
- **Risk**: Supply-chain compromise → malicious firmware → patient data exfiltration, alarm suppression, or device malfunction
- **Action**: Audit all device firmware versions. Enforce signed firmware ([[UEFI]] Secure Boot on imaging systems). Test firmware updates in isolated lab before production deployment. Require vendor code-signing attestation.
- **Cost**: $250K | **Timeline**: 9 months | **ROI**: Blocks supply-chain firmware-injection attacks

### Priority 3: Forescout Medical Device Discovery & Asset Inventory
- **Current State**: 1,247 medical devices across facility. Limited visibility into firmware versions, vulnerabilities, unauthorized access.
- **Risk**: Vulnerable devices (e.g., [[GE Carescape]] with [[CVE-2020-6961]]) go unpatched. Rogue devices join network undetected.
- **Action**: Deploy [[Forescout]] CounterACT for continuous medical-device discovery. Baseline: Map all 1,247 assets. Ongoing: Monthly vulnerability scanning against device firmware.
- **Cost**: $400K | **Timeline**: 6 months | **ROI**: Identifies unpatched devices, enforces network segmentation rules, alerts on unauthorized device access

### Priority 4: Immutable Backups — Ransomware Recovery Resilience
- **Current State**: [[Veeam]] backups stored on network-attached storage (NAS). Backup admin credentials in [[Veeam]] console are susceptible to compromise. If attacker gains backup-admin access, all snapshots can be deleted.
- **Risk**: Ransomware + backup wipe = unrecoverable data. Hospital down for weeks.
- **Action**: Implement [[Veeam]] Immutable Backup on air-gapped NAS (no network access except for scheduled weekly restore tests). Separate immutable-vault admin credentials (not held by same backup admin). Quarterly restore drills.
- **Cost**: $600K | **Timeline**: 12 months | **ROI**: Guarantees recovery within hours (vs. weeks). Reduces ransomware ransom pressure.

### Priority 5: Building Management System (BMS) Segmentation & Interlocking
- **Current State**: BMS controls HVAC, power, fire suppression. Some legacy devices ([[Honeywell Niagara]], Johnson Controls) run unpatched firmware. Network partially isolated but not fully air-gapped from clinical IT.
- **Risk**: Attacker gains clinical network access → pivots to BMS → disables positive-pressure alarm → OR infection cascade
- **Action**: Complete air-gap of BMS from clinical IT (separate firewall, no routing). Implement spring-return damper locks (passive safety interlocking — cannot be overridden remotely). Firmware signature verification on BMS controllers.
- **Cost**: $300K | **Timeline**: 12 months | **ROI**: Prevents BMS-based attacks. Improves patient safety (alarm suppression impossible).

## The Stake: (Grand)children & Patient Safety

Every day [[ACME]]'s systems operate without these controls, vulnerable patients and families face unquantified risk. A ransomware attack is not a "when"; it's a "when." [[LockBit]]'s [[SickKids Hospital]] attack was preventable with immutable backups and credential vaulting. Change Healthcare's $22M loss was preventable with [[MFA]] and network segmentation.

**The ask**: Approve $2.05M capital expenditure (5 priorities above) to close critical gaps. Simultaneously, authorize incident-response tabletop exercises (quarterly) and supply-chain vetting for [[Mindray]]/India-sourced IT contractors.

**The outcome**: A hospital that can withstand a sophisticated ransomware attack and recover within hours — not days. A facility where patients receive the same standard of care (imaging, lab results, medication accuracy) even under cyber stress. A legacy of resilience for the 500,000+ people who depend on [[ACME]]'s trauma, cardiac, and emergency services.

---

**Classification**: Sensitive — Executive Leadership Only

## See also

[[ACME Ottawa Civic Hospital]] · [[Civic Hospital HAZOPS]] · [[Civic Hospital Threat Profile]]
