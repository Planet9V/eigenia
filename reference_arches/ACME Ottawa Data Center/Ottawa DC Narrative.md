---
aliases: [ACME Board Brief, ACME Executive Summary]
type: facility-reference-model
category: data-center
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-datacenter, phase/1c, narrative, executive-summary, board]
related: ["[[ACME Ottawa Data Center]]", "[[Ottawa DC Threat Profile]]", "[[Ottawa DC Supply Chain]]", "[[Ottawa DC Narrative]]"]
created: 2026-05-09
updated: 2026-05-09
---

# Ottawa DC Narrative

> **Demo overlay**: ACME is a fictional federal-tenant colocation facility. This executive narrative is modeled from real Tier III infrastructure patterns in Ottawa.

## The Stakes

Forty million Canadian citizens depend on federal services hosted at facilities like ACME. When the ACME Ottawa Data Center goes dark—whether by infrastructure failure, cyber attack, or supply-chain sabotage—the consequences cascade. Tax refunds stall. Pension payments freeze. Emergency services 911 routing threads through backup fiber. Estimated cost per day of unplanned outage: **$200M–$500M in economic impact** (Bank of Canada, 2023).

ACME Ottawa operates at the **convergence of civilization's three critical layers**: electricity (25 kV utility feeds + dual generators), cooling (precision chillers maintaining 16–18°C), and networking (dual-path fiber spanning 5 Canadian carriers). Any single failure—whether a ruptured [[CRAH]] condensate line, a misconfigured firewall rule, or a firmware backdoor—can unravel all three.

---

## What Makes This Facility Tick

ACME is built to **[[Uptime Institute Tier III]]** specification: 99.982% availability (≤1.6 hours downtime/year). This means:

- **Dual everything**: Two utility feeds from independent Ottawa Hydro substations. Two 1 MW diesel generators + automatic transfer switches. Two chiller loops (either can cool 100% of facility).
- **Concurrent maintainability**: You can replace any critical component—UPS, CRAC unit, network switch—without shutting down tenant workloads.
- **Segregation by security level**: Federal Crown tenants ([[Treasury Board]], [[CRA]], [[ESDC]]) occupy isolated VLAN pods. Commercial tenants ([[RBC]], [[TD]], [[Bell Canada]]) run in separate cages. Tenant-to-tenant cross-contamination is a design-priority risk.

The facility maps to **[[Purdue Model]] L0–L3**: L0 hosts the mechanical/electrical "physics" (generators, chillers, power distribution). L1 is DCIM/BMS (environmental monitoring, chiller logic). L2 is DC operations (on-site [[SOC]], incident response). L3 is tenant workloads.

Each layer has **[[IEC 62443]] security requirements**. Power & Cooling zones target **SL-T 2** (integrity + recovery <4 hrs). Cyber controls (network segmentation, MFA on BMS) target **SL-T 3** (highest—because cyber-physical attacks are plausible).

---

## The Network Architecture

ACME's spine-leaf fabric uses **[[VXLAN]]/[[EVPN]] overlay** atop a 1-Pbps [[Cisco]] Nexus 9504 backbone. Each tenant gets dedicated VLAN isolation + per-port firewall rules. The facility peers to **five [[BGP]] carriers** ([[Bell Canada]], [[Telus]], Rogers, Cogent, Hurricane Electric) with automatic failover <5 seconds.

**Out-of-band management** runs on isolated IPv6 (172.16.0.0/16). **Building Management System** occupies its own VRF (10.20.0.0/16)—completely segregated from production tenant traffic (10.10.0.0/16). BMS controllers (HVAC, UPS, PDU) use SNMP v3, Modbus TCP, and BACnet/IP; NO Internet egress.

**Time synchronization** via PTP IEEE 1588 from a rooftop GNSS antenna (Trimble Thunderbolt, 1PPS disciplined), achieving <2–8 µs accuracy across all network nodes.

---

## The Equipment Reality

ACME's hardware catalog is a who's-who of **critical infrastructure vendors**—and each one represents a geopolitical chokepoint:

- **Compute**: [[Cisco]] UCS, [[HPE]] ProLiant, [[Dell]] PowerEdge, Supermicro (all containing Intel/AMD CPUs sourced from [[TSMC]]/Samsung)
- **Storage**: Pure FlashArray, NetApp, [[Dell]] PowerStore, IBM Spectrum (all containing NAND from [[Samsung]], SK Hynix, Kioxia)
- **Network**: [[Juniper]] QFX5120, [[Cisco]] Nexus, Arista 7280 (all using Broadcom ASICs, dependent on [[TSMC]])
- **Power**: [[Vertiv]] (Liebert UPS), [[Schneider Electric]], [[Caterpillar]]/[[Cummins]] generators, [[APC]] PDUs
- **Cooling**: [[Trane]]/[[York]] chillers, [[Schneider Electric]] InRow, [[Vertiv]] CRAH units

**Top 3 CVE vectors** in this stack:
1. **[[APC]] AP9630/AP9631 PDU firmware** (AOS 6.x) — internet-reachable if misconfigured. Enables lateral movement from DCIM breach to power distribution.
2. **[[Cisco]] UCS UCSM 4.x + [[Cisco]] Firepower FTD 7.x** — multiple RCEs (CVE-2024-20255, CVE-2023-20257). Both sit on the critical attack path.
3. **[[VMware]] vSAN 7.0 U3 + [[VMware]] ESXi 7.0 U3** (legacy nodes) — unpatched; newer U2 nodes hardened. Hyperconverged strategy = containment risk.

---

## The Hazard Landscape

A [[HAZOPS]] analysis of ACME's 12 critical failure modes reveals **three categories of residual risk**:

### Physical Failures (Low Mitigation Possible)

**Generator Cold-Start Failure**: Fuel contamination (water ingress, microbial growth) or battery dead = generator cannot start within 30 sec. UPS depletes in 15 min. Servers overheat in 45 min. **Mitigation**: quarterly load-bank testing, fuel polishing, desiccant breathers. **Residual risk**: Medium (fuel contamination can disable gen for 4–8 hrs).

**Raised-Floor Leak**: CRAH condensate line ruptures → water pools under raised floor → IP leakage to server intake vents → power supply failure or arc flash. **Mitigation**: sump pump sensors, daily walkthrough inspections, hydrophobic coatings. **Residual risk**: Low-Medium (detected early, but detection failure = property damage).

### Cyber-Physical Convergence (High Concern)

**Cyber-Induced Generator Overspeed** (via BMS compromise): Attacker gains control of fuel governor set-point → engine RPM rises beyond 2400 (governed) to 3200+ RPM uncontrolled → mechanical failure in 30–60 sec. **Mitigation**: isolated BMS network (air-gapped), hardwired RPM overspeed relay, operator manual fuel cutoff valve. **Residual risk**: Medium (air-gapping reduces attack surface, but [[DCIM]] software updates remain supplier-compromise risk).

**Ransomware on BMS** (e.g., [[BlackCat]]): Attacker raises chiller setpoint to 30°C (from 18°C) or commands cooling fans OFF. Zone temperature rises 2°C/min. Server intake hits 35°C in 8 min. Thermal throttling → workload degradation → SLA breach. **Mitigation**: network segmentation (BMS on isolated VLAN), MFA on admin accounts, rate-limiting on CRAC commands, manual cooling loop bypass valve, 24/7 [[SOC]] behavioral monitoring. **Residual risk**: Medium-High (segmentation + MFA reduce lateral movement, but tenant VPN access + weak password policies are weak points).

### Compliance & Geopolitical (Structural)

**Bill C-8 / [[CCSPA]]** (Canada's Critical Cyber Systems Protection Act, effective 2027): ACME designated as Critical Cyber Systems operator because it hosts federal + telecom tenants. Obligations: annual cyber risk assessment, supply-chain risk register, 24-hour breach notification to [[CSE]]/ISED, "reasonable" cybersecurity measures (undefined). **Penalties**: up to $15M or 5% gross revenue. **Impact**: $200K–$500K initial audit cost; ongoing regulatory compliance burden.

**[[Taiwan]] Strait Supply-Chain Risk**: 100% of Nvidia H100/H200 GPUs ship from [[TSMC]] CoWoS (Chip-on-Wafer-on-Substrate). A 2-week [[Taiwan]] blockade → 6-month GPU shortage. [[TSMC]] Arizona fab (5 nm, 2024) immature yield (2–3 year ramp). Intel Geislingen (7 nm, 2025) not yet 5 nm. **ACME customer impact**: AI workload refresh cycles delayed; competitive threat from [[AWS]]/[[Azure]] capacity.

**Korea Memory Duopoly**: [[Samsung]] + SK Hynix = 70% of global [[DRAM]]. Both concentrated in South Korea (Icheon fab 25 km from Seoul). Climate change +20% monsoon precipitation 2020–2025 → flooding risk. China rare-earth export quota tightening → memory fab input costs rise 40–60% YoY. **ACME impact**: [[DRAM]] tightening 2026–2027; [[DDR5]] lead times 16+ weeks; budget doubling.

**Rare-Earth & Transformer Chokepoint**: China = 85% of global rare-earth supply (Baotou). Transformer core steel 60% from China ([[Baosteel]], Wuhan Iron & Steel Co.). Specialty electrical steel (0.35–0.50 mm thickness, <1.3 W/kg loss) available almost exclusively from China. Chiller coolant (HFO-1234yf) synthesis depends on Chinese fine-chemical intermediates. **ACME impact**: UPS transformer cores subject to 30–60 day lead times; chiller unit refills tightening 2026–2027.

---

## The Threat Actors

ACME hosts federal Crown tenants and critical private-sector infrastructure (banks, telecom). This makes it a **Tier-1 nation-state target**:

### [[Volt Typhoon]] (China-nexus, [[CISA]] designation)
**Objective**: Multi-year pre-positioning in critical infrastructure for disruptive campaigns.  
**Tactic**: Exploits vendor remote support ([[Cisco]] [[TAC]], [[Vertiv]] FieldCare) to gain hypervisor access → tenant VM escape.  
**ACME Risk**: Federal tenant workloads + pre-staging target for long-dwell espionage.

### [[Salt Typhoon]] (China-nexus, telecom-focused)
**Objective**: Telecom supply-chain compromise; pivot to federal agencies.  
**Tactic**: Compromises carrier [[BGP]] infrastructure; reroutes facility uplink via attacker-controlled border router.  
**ACME Risk**: If facility uplink via Shaw/[[Bell Canada]]/Rogers, threat is direct.

### [[APT29]] / [[Cozy Bear]] (Russia-SVR, espionage)
**Objective**: Intelligence gathering; zero-days against Windows [[Active Directory]]/Exchange.  
**Tactic**: Spearphishing federal tenant staff → WinRM/RDP → lateral to shared storage.  
**ACME Risk**: Federal tenants' AD trusts, email, [[SBOM]]s attractive.

### [[Sandworm]] (Russia-GRU, destructive)
**Objective**: Disruptive attacks on power grid, BMS, [[ICS]].  
**Tactic**: Compromises managed-service account ([[Schneider Electric]] Connected Services) → BMS Modbus access → firmware downgrade → power supply overspeed → electrical cascade.  
**ACME Risk**: Federal datacenter with [[ICS]]/[[SCADA]] tenants = high-value target for sabotage.

### [[BlackCat]] / [[LockBit]] (Russian-aligned ransomware)
**Objective**: Financial extortion, double-extortion (steal + encrypt).  
**Tactic**: Exploits [[DCIM]] portal RCE → 90-day dwell → full estate encryption.  
**ACME Risk**: Tenant [[SCADA]] backups, government research, cryptographic material.

---

## Top 5 Priorities for the Board

### 1. Generator Redundancy (Critical, 30-day window)
**Current State**: Single-generator [[SPOF]]. If gen fails to start, UPS depletes in 15 min → facility down.  
**Recommendation**: Implement N+1 redundancy (dual 1 MW generators) OR establish [[SLA]]-bound emergency rental contract (24-hr parts-on-hand guarantee).  
**Cost**: $500K–$1.5M (dual gen); $15K–$20K/year (emergency rental [[SLA]]).  
**Risk if Delayed**: Insurance payout threshold ($4-hr outage) easily breached by gen failure.

### 2. BMS Cyber-Isolation (Critical, 60-day window)
**Current State**: [[DCIM]] system potentially accessible from tenant IT via misconfigured firewall rules.  
**Recommendation**: Verify BMS is truly air-gapped (no shared switches, no IT VPN access). Test annually.  
**Cost**: Lab testing + deployment validation, ~$50K initial; ongoing $5K–$10K/year.  
**Risk if Delayed**: SolarWinds-style [[DCIM]] compromise → attacker gains control of chillers, PDUs, power supply logic.

### 3. Fuel Contamination Monitoring (High, 14-day window)
**Current State**: Generator fuel subject to water ingress, microbial growth, corrosion.  
**Recommendation**: Quarterly fuel polishing service + desiccant breather on fill cap.  
**Cost**: $3K–$5K per polishing cycle; desiccant breather $200.  
**Risk if Delayed**: Fuel contamination can disable gen for 4–8 hrs; most common gen failure mode.

### 4. Behavioral Anomaly Detection (Medium, 90-day window)
**Current State**: [[DCIM]] API logs stored locally; no real-time anomaly detection.  
**Recommendation**: Deploy ML-based anomaly detection (detect unusual [[DCIM]] command sequences, e.g., chiller setpoint + fuel governor in same minute).  
**Cost**: $50K–$100K ([[SIEM]] tuning + ML model training).  
**Risk if Delayed**: Ransomware dwell times extend to 90+ days; behavioral detection is fastest early-warning system.

### 5. Vendor Security Audit & Supply-Chain Risk Register (High, per Bill C-8 deadline Feb 2027)
**Current State**: No formal vendor risk assessment or supply-chain documentation.  
**Recommendation**: Annual vendor risk questionnaire (financial health, geopolitical exposure, cybersecurity posture), hardware provenance tracking ([[SLSA]] Level 2+), 120-day spare-parts buffer for Tier 0 components.  
**Cost**: $50K–$100K per vendor audit cycle; $100K–$200K for [[SLSA]] attestation framework.  
**Risk if Delayed**: [[CCSPA]] regulatory audit failure; $15M penalty or 5% revenue fine.

---

**Doc Version**: 1.0 | **Phase**: 1c | **Last Updated**: 2026-05-09
