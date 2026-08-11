---
aliases:
  - Nashville Board Brief
  - Nashville Executive Summary
type: facility-reference-model
category: surface-treatment
status: draft
domain: OT
tags:
  - domain/OT
  - facility/acme-nashville-surface-treatment
  - phase/1c
  - narrative/executive
related:
  - "[[ACME Nashville Surface Treatment]]"
  - "[[Nashville Architecture]]"
  - "[[Nashville HAZOPS]]"
  - "[[Nashville Threat Profile]]"
  - "[[Nashville Supply Chain]]"
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME Nashville is fictional. This narrative synthesizes facility architecture, threat profile, [[HAZOPS]], and supply-chain risk for board-level decision-making. All data points reflect realistic industrial scenarios; specific financial figures are illustrative.

---

## Executive Summary: The Stakes

ACME Nashville is a $50M+ aerospace and automotive supplier, treading the razor's edge between industrial competitiveness and catastrophic risk. The facility converts high-value metallic components (landing gear fasteners, avionics brackets) into finished products via electrochemical processes that demand exquisite control—and attract sophisticated adversaries.

**Three Risk Horizons Converge**:

1. **Cyber-Physical**: Operators depend on 50+ networked devices; attackers can corrupt chemistry recipes in real-time, triggering off-spec aerospace parts or environmental catastrophe.
2. **Geopolitical**: Nickel feedstock is 75% dependent on Indonesia's China-dominated refining; tariff escalation or quota shifts create supply shocks worth $2M+ annually.
3. **Regulatory**: Aerospace customers ([[Boeing]], [[Northrop]], [[Lockheed]]) mandate [[ITAR]] compliance and [[CMMC]] L2 cybersecurity; failure to certify = contract termination.

**Annual Consequence if Risk Materializes**: $10–15M (combined downtime, liability, recall, regulatory penalty, reputation).

---

## The Facility: [[Purdue Model]] Meets Plating Chemistry

ACME Nashville occupies 100,000 sq ft across six operational zones aligned to [[ISA-95]] ([[Purdue Model]]) and [[IEC 62443]]:

- **Layer 0 (Physical Process)**: 6 parallel plating/anodizing tanks with rectifiers, temperature/pH sensors, agitation motors
- **Layer 1 (Control)**: [[Allen-Bradley]] ControlLogix + [[Siemens]] S7-1500F PLCs; dedicated safety GuardLogix
- **Layer 2 (Monitoring & SCADA)**: Wonderware HMI stations, PI historian, MES
- **Layers 3–5 (Enterprise)**: SAP ERP, corporate IT, email
- **Security Zones (IEC 62443)**: Z-PRO (SL-T 3), Z-SAF (SL-T 3), Z-MON (SL-T 2), Z-DMZ (SL-T 2), Z-CORP (SL-T 1)

---

## The Threat: 5 Nation-State & Cybercriminal Groups

### 1. [[BlackCat]]/ALPHV (Ransomware + Double-Extortion)
**Motive**: $500K+ extortion on aerospace recipes + operational disruption premium.  
**Path**: [[Fortinet]] FortiGate 7.0.8 (CVSS 9.6 RCE) → IT AD credentials → lateral move to MES historian → encrypt batch records.  
**Impact**: 72-hour shutdown = $720K loss; customer SLAs miss → $2M contract penalty.

### 2. [[Volt Typhoon]] (APT, Long-Dwell Espionage)
**Motive**: Establish persistence for months; pre-position disruptive capability.  
**Path**: Compromise [[Siemens]] Industrial Edge cloud portal (trusted vendor) → pilfer engineering credentials → VLAN-hop to historian.  
**Impact**: Technology transfer to state-sponsored competitor = 30-year competitive moat lost overnight.

### 3. [[APT41]] (IP Theft, Supply-Chain Compromise)
**Motive**: Steal surface-treatment chemistry (automotive corrosion-resistance formulations worth $100M+ in R&D).  
**Path**: Compromise rectifier firmware from [[Dynapower]] OEM → inject backdoor → exfil PLC program logic + historical chemistry logs → C2 server.  
**Impact**: Undetected for months; chemistry stolen and operationalized by Chinese competitor.

### 4. [[LockBit]] (Ransomware, Targeting Manufacturing)
**Motive**: High-density victim targeting; $10K/hour downtime = reliable extortion.  
**Path**: Phishing operator (Gmail-lookalike "Payroll Portal") → keylogger captures shared "production" AD account → pass-the-hash to historian → data exfil + encryption.  
**Impact**: Customer notification = brand damage; aerospace customer may switch suppliers.

### 5. [[APT33]]/Elfin (Iran-nexus, Strategic Disruption)
**Motive**: Disrupt U.S. industrial competitiveness; secondary espionage.  
**Path**: Spear-phish engineering team (macro-embedded PowerPoint) → reverse shell on FactoryTalk Cloud gateway → wipe MES audit logs.  
**Impact**: FAA can no longer verify aerospace part airworthiness → fleet grounding scenario.

---

## The HAZOPS: 12 Scenarios, $50M+ Cumulative Risk

Top 4 by consequence:

| Scenario | Trigger | Consequence | Annual Loss |
|----------|---------|-------------|------------|
| **H3: Hydrogen Deflagration** | Electroless Ni tank hydrogen accumulation | Tank rupture; 5 injuries; $6M structural/equipment rebuild | $5–15M per incident |
| **H11: Aerospace Off-Spec Shipment** | Attacker tampers PLC recipe | Parts sold to Boeing without buyer knowledge; recall + FAA airworthiness directive | $2–5M per recall |
| **H12: MES Ransomware + FAA Traceability Loss** | Ransomware encrypts MES batch-record DB | Batch records unavailable >72 hrs; FAA inspection; potential fleet grounding | $1–5M |
| **H1: HCN Release** | Operator error; cross-contamination | Acute fatality (15-min LCt50 = 20 ppm·min) | $2.5–5M |

**Mitigation Strategy**: SIS PLC + dual redundancy ([[H2]] detector + governor relief) + air-gapped MES backup (4-hr RTO). **Residual risk acceptable under [[IEC 62443]] SL-T 2.**

---

## The Cyber-Physical Vulnerability Chain

ACME's current architecture has **5 critical weaknesses**:

### 1. [[Fortinet]] FortiGate 7.0.8 Unpatched RCE (CVSS 9.6)
**Attack path**: Unauthenticated SSL [[VPN]] RCE as "fortisys" service account  
**Downstream**: Direct access to historian database  
**Fix**: Upgrade to 7.2.5 LTS (60-min maintenance window)

### 2. Shared "production" AD Account (5+ engineers, 1 password)
**Attack path**: Phishing → credential theft → pass-the-hash to MES + historian  
**Downstream**: Ransomware persistence; audit trail bypass  
**Fix**: Unique per-user credentials; [[MFA]] per-device; quarterly rotation

### 3. [[Modbus TCP]] Unencrypted (Rectifier, [[VFD]], tank sensors)
**Attack path**: Intercept setpoint commands; inject malicious power curves  
**Downstream**: Equipment damage; off-spec coating thickness  
**Fix**: ICS-aware firewall rules; isolate OT [[VLAN]]; encrypt via [[IPSec]] tunnel

### 4. FactoryTalk Service Account Plaintext in Config (SQL Server)
**Attack path**: [[SQL Injection]] + service account compromise → historian escalation  
**Downstream**: Recipe exfil; process parameter tampering  
**Fix**: Migrate to Entra managed identity; rotate quarterly

### 5. Backup Encryption Misalignment (Historian daily export on IT share)
**Attack path**: Ransomware gains IT domain credentials → encrypts backup share → no recovery path  
**Downstream**: 72-hour RTO becomes indefinite; customer notification unavoidable  
**Fix**: Air-gap daily backup to offline NAS; [[WORM]] (write-once-read-many) storage for 30-day hold

---

## The Supply-Chain Pinch: Nickel, Tariffs, IP Theft

ACME depends on three upstream tiers:

### Tier 1: Specialty Chemicals & Rectifiers
- **Chemistry**: [[Atotech]], Coventya, OMG (all foreign-sourced)
- **Risk**: Single-source dependency on [[Atotech]] for aerospace passivation formulas; supply disruption = customer halt
- **Cyber**: Rectifier OEMs ([[Munk]], [[Dynapower]]) ship equipment with remote-access credentials for diagnostics; firmware updates unencrypted

### Tier 2: Raw Materials
- **Nickel**: Indonesia dominates (40% global reserves) but quota reduced 31% (2025→2026); China controls 75% of Indonesian refining capacity
- **Price Impact**: BMI revised nickel to $16,600/ton (up from $15,800/ton); 2–3 month lead-time extension expected
- **Chromium**: South Africa (42% global) stable, but tariff volatility ±15% YoY

### Tier 3: Downstream (Customers)
- **Boeing, Northrop, Lockheed**: [[ITAR]]-controlled aerospace contracts; mandatory [[Nadcap]] accreditation (narrow supply base)
- **Automotive Tier-1**: Magna, Bosch, ZF ([[IATF 16949]] compliance + PPAP audits)

**Geopolitical Forecast (2026)**: Tariff escalation risk (Section 232/301 specialty acids); Indonesia export controls tighten further; "friend-shoring" redirects flows but at cost premiums (+8–12% on chemistry). **ACME should dual-source at least one critical formula by Q3 2026.**

---

## Board Priorities: 5 Moves in 90 Days

| Priority | Action | Owner | Deadline | Cost | Upside |
|----------|--------|-------|----------|------|--------|
| **1-CRITICAL** | Upgrade [[Fortinet]] to 7.2.5 LTS; test failover | IT/OT Lead | Week 1 | $5K | Eliminates primary initial-access vector |
| **1-CRITICAL** | Migrate "production" AD to per-user + [[MFA]] | IT Lead | Week 2 | $10K | Blocks lateral movement via pass-the-hash |
| **2-HIGH** | Rotate FactoryTalk service creds; migrate to Entra managed identity | IT Lead | Week 4 | $8K | Eliminates historian privilege escalation |
| **2-HIGH** | Deploy ICS firewall rules; isolate OT [[VLAN]]; encrypt [[Modbus]] via [[IPSec]] | Network Lead | Week 6 | $50K | Blocks [[AitM]] + command injection |
| **3-MEDIUM** | Air-gap MES historian backup to [[WORM]] storage; test 4-hr RTO | IT/OT Lead | Week 8 | $30K | Preserves recovery path in ransomware |

**Total Investment**: ~$100K | **Payoff**: [[CMMC]] L2 certification (aerospace customer mandate); 90% risk reduction on top 3 threat scenarios.

---

## The Competitive Imperative

ACME is at an inflection point:

1. **Aerospace customers** (Boeing, Northrop) will begin enforcing [[CMMC]] L2 audits in Q4 2025; failure to certify = contract suspension.
2. **Nickel supply chain** tightens; competitors who secured dual-source contracts will weather price shocks better.
3. **IP theft risk** is asymmetric: Chinese competitors gain chemistry IP = ACME's 30-year moat is forfeit. Cyber controls cost $100K; losing IP costs $100M.

**Board Motion**: Allocate $100K capex + $50K/yr [[OpEx]] for:
- Cybersecurity hardening ([[Fortinet]] upgrade, AD consolidation, air-gapped backup)
- Supply-chain diversification (dual-source [[Atotech]] formula by Q3 2026)
- [[CMMC]] L2 certification audit readiness (by Q3 2025)

**Timeline**: 90 days to hardening; 180 days to full [[CMMC]] L2 compliance; 12 months to supply-chain resilience.

---

## Closing: Physics, Chemistry, Electrons

ACME Nashville's competitive advantage rests on three physical laws:
- **Chemistry**: Precise pH/temperature control → corrosion-resistant coatings → aerospace customer trust
- **Electricity**: Rectifier current density → coating thickness consistency → FAA airworthiness
- **Cyber-Physics**: Attacker corrupts one [[PLC]] setpoint → all three unravel → brand destruction

The investment to defend this triad is small. The cost of losing it is existential.

---

## Cross-references

- [[ACME Ottawa Data Center]]
- [[ACME Ottawa Substation]]
- [[ACME Ottawa Civic Hospital]]
- [[ACME Ottawa Pediatric Medical Center]]

## See also

- [[Nashville Architecture]] — facility design rationale
- [[Nashville HAZOPS]] — detailed safety scenarios
- [[Nashville Threat Profile]] — cyber threat detail
- [[Nashville Supply Chain]] — upstream risk analysis
