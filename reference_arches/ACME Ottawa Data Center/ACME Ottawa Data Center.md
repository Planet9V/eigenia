---
aliases: [ACME Ottawa DC, Ottawa Federal Colocation, ACME CDT]
type: facility-reference-model-hub
category: data-center
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-datacenter, phase/1c, sector/colocation, sector/federal-tenant, org/acme-demo, geo/ottawa-on, tier/iii]
related: ["[[Ottawa DC Architecture]]", "[[Ottawa DC Network]]", "[[Ottawa DC Equipment]]", "[[Ottawa DC HAZOPS]]", "[[Ottawa DC Threat Profile]]", "[[Ottawa DC Supply Chain]]", "[[Ottawa DC Narrative]]", "[[Ottawa DC CVE Cross-Reference]]"]
created: 2026-05-09
updated: 2026-05-09
---

# ACME Ottawa Data Center

> **Demo overlay**: ACME is a fictional demo customer. This reference model is built from public-source research on federal-tenant colocation patterns (Shared Services Canada Enterprise Data Centre, Cologix Ottawa, Q9 Networks, Bell Data Centers). No specific real federal facility is impersonated.

## Quick Facts

| Attribute | Value |
|-----------|-------|
| **Name** | ACME Ottawa Data Center |
| **Location** | Downtown Ottawa, Ontario (45.4112°N, 75.6799°W) |
| **Tier Classification** | [[Uptime Institute Tier III]] |
| **Availability Target** | 99.982% (≤1.6 hrs downtime/year) |
| **Tenant Model** | Federal Crown + commercial mix |
| **Architecture** | [[Purdue Model]] L0–L3.5 with [[IEC 62443]] zone segmentation |
| **Network Fabric** | [[Spine-leaf VXLAN/EVPN]] over dual-redundant optical backbone |
| **Prime Carrier** | Bell Canada, Telus, Rogers, Cogent, Hurricane Electric (5× peers, BGP multi-path) |
| **Power** | Dual 25 kV feeds, 2× 1 MW generators, N+1 UPS redundancy |
| **Cooling** | 2N chiller loops, CRAH units, hot/cold aisle containment |
| **Primary Risk Vector** | Cyber-physical convergence (BMS compromise) + [[Taiwan Strait]] supply chain |

---

## Purpose

ACME Ottawa serves as a **reference model for federal-tenant colocation facilities** operating under Canadian [[ITSG-33]] compliance requirements. The facility illustrates tensions between:

1. **Infrastructure resilience** (Tier III design, N+1 redundancy)
2. **Cyber-physical attack surfaces** (BMS segmentation, [[IEC 62443]] SL-T targets)
3. **Supply-chain geopolitical exposure** (TSMC CPUs, Samsung memory, China rare earths)
4. **Regulatory binds** (Bill C-8/[[CCSPA]] compliance, data sovereignty, federal tenant audit)

---

## Facility Architecture at a Glance

### Layer Map

| Purdue Level | Function | Key Systems | IEC 62443 Zone | SL-Target |
|--------------|----------|-------------|-----------------|-----------|
| **L0** | Mechanical/Electrical | 25 kV feeds, generators, UPS, chillers, CRAH | Power & Cooling | SL-T 2 |
| **L1** | DCIM / BMS Controllers | Environmental sensors, PDUs, monitoring microservices | BMS/DCIM | SL-T 2 |
| **L2** | DC Operations | On-site SOC, capacity planning, incident response | DC Mgmt | SL-T 2 |
| **L3** | Tenant Operations | Tenant VMs, apps, services | Tenant Networks | SL-T 1–3 (variable) |
| **L3.5** | Internet Boundary | Edge firewalls, DDoS mitigation, WAN aggregation | Tenant DMZ | SL-T 3 |

---

## Pages in This Model

| Doc | Purpose | Key Topics |
|-----|---------|-----------|
| [[Ottawa DC Architecture]] | Identity, [[Purdue Model]] adaptation, [[IEC 62443]] zones, tenant isolation | Facility zones, conduit mapping, SL targets, design invariants |
| [[Ottawa DC Network]] | Spine-leaf fabric, BGP carriers, VLAN segmentation, OOB management | Optical backbone, VXLAN/EVPN overlay, IP addressing, VLAN architecture |
| [[Ottawa DC Equipment]] | Real vendors, firmware versions, CVE anchors | Power, cooling, compute, storage, network, security zones |
| [[Ottawa DC HAZOPS]] | 12 critical failure modes, RAMS metrics, cyber-physical convergence | Availability calc, SPOFs, FIT/MTBF, cyber-physical attack vectors, residual risk |
| [[Ottawa DC Threat Profile]] | Nation-state actors, kill chains, remote access vectors, supply-chain attack scenarios | [[Volt Typhoon]], [[Salt Typhoon]], [[APT29]], [[Sandworm]], [[BlackCat]]/LockBit |
| [[Ottawa DC Supply Chain]] | 3-tier upstream (OEMs, components, raw materials), geopolitical chokepoints | Taiwan [[TSMC]], Korea memory duopoly, China rare earths, Russia sanctions cascade |
| [[Ottawa DC Narrative]] | Board-readable executive summary, stakes, priorities, compliance bind | The stakes, architecture tick, hazard landscape, threat actors, top 5 priorities |
| [[Ottawa DC CVE Cross-Reference]] | Equipment → CVE correlation, kill-chain grouping, firmware update readiness | CVE IDs, EPSS scores, ATT&CK techniques, SQL templates for forge.cve_records |
| [[Ottawa DC References]] | Consolidated citations by topic (standards, security, vendors, supply chain) | 195+ deduplicated URLs, topic grouping, verification sources |

---

## Key Design Principles

1. **No Single Point of Failure (NSPOF)**: Dual utility feeds, dual generators, dual chiller loops. Every critical system (power, cooling, network, access) has N+1 or 2N redundancy.

2. **Concurrent Maintainability**: Any critical component can be replaced without shutting down tenant workloads. This is the distinguishing feature of [[Uptime Institute Tier III]].

3. **Zone-Based Security**: Each [[IEC 62443]] zone has explicit ingress/egress conduits. No undefined trust relationships.

4. **Tenant Isolation**: VLAN + firewall at L3; no shared L2 broadcast domains between tenants.

5. **Monitoring-First Philosophy**: Every L0–L2 system reports health metrics to SOC. Alerts trigger <1 min from anomaly detection.

6. **Graceful Degradation**: Loss of any single UPS/CRAC/chiller reduces capacity but maintains continuity.

---

## Critical Vulnerabilities & Watchlist

**Top 3 CVE Attack Vectors**:

1. **[[APC]] AP9630/AP9631 NMC2 firmware AOS 6.x** — Internet-reachable if misconfigured. Enables lateral movement from DCIM breach to power distribution.
2. **[[Cisco]] UCS UCSM 4.x + [[Cisco]] Firepower FTD 7.x** — Multiple RCEs (CVE-2023-20257, CVE-2024-20255). Sit on critical attack path.
3. **[[VMware]] vSAN 7.0 U3 + [[VMware]] ESXi 7.0 U3** (legacy nodes) — Unpatched; newer U2 nodes hardened. Hyperconverged strategy = containment risk.

See [[Ottawa DC CVE Cross-Reference]] for full equipment-to-CVE mapping and SQL templates.

---

## Immediate Priorities (30–90 Days)

1. **Generator Redundancy** (CRITICAL, 30-day window) — Implement N+1 or emergency rental SLA
2. **BMS Cyber-Isolation** (CRITICAL, 60-day window) — Verify air-gap; test annually
3. **Fuel Contamination Monitoring** (HIGH, 14-day window) — Quarterly polishing + desiccant breather
4. **Behavioral Anomaly Detection** (MEDIUM, 90-day window) — ML-based DCIM API monitoring
5. **Vendor Security Audit** (HIGH, Bill C-8 compliance Feb 2027) — Risk questionnaire, SLSA attestation, supply-chain register

---

## Regulatory Context

- **[[ITSG-33]]** (Canadian IT Security Risk Management): 195 controls; baseline for [[ITSG-33|Protected-B]] data
- **[[IEC 62443]]** (Industrial Automation Security): Security Levels (SL-1 to SL-4); ACME targets SL-T 2–3 per zone
- **Bill C-8 / [[CCSPA]]** (Effective Feb 2027): Critical Cyber Systems protection; annual cyber risk assessment; 24-hr breach notification; penalties up to $15M or 5% gross revenue
- **[[TIA-942]]** / EN 50600: Tier III data center standards; concurrently maintainable design

---

## Geopolitical Risk Summary

### Taiwan Strait (High Impact)
- **TSMC CoWoS Dependency**: Nvidia H100/H200 GPUs 100% sourced from TSMC. 2-week Taiwan blockade → 6-month GPU shortage.
- **Impact on ACME**: AI workload refresh cycles delayed; competitive threat from [[AWS]] / [[Azure]] capacity.

### Korea Memory Duopoly (Medium Impact)
- **Samsung + SK Hynix = 70% of global DRAM**: Both concentrated in South Korea (Icheon fab 25 km from Seoul).
- **Climate Risk**: +20% monsoon precipitation 2020–2025 → flooding risk.
- **Impact on ACME**: DRAM tightening 2026–2027; DDR5 lead times 16+ weeks; budget doubling.

### China Rare-Earth Monopoly (High Impact)
- **85% of global rare-earth supply** from Baotou, Inner Mongolia.
- **Transformer core steel**: 60% from China (Baosteel, Wuhan Iron & Steel Co.).
- **Impact on ACME**: UPS transformer cores subject to 30–60 day lead times; trending longer post-2025.

---

## Estimated Business Impact (Unplanned Outage)

| Downtime | Facility Loss | Tenant Claim | Insurance Payout |
|----------|------------|-----------|------------------|
| <30 min (SLA within bounds) | ~$0 (SLA credit $500–2K) | Negotiable | None |
| 30 min – 4 hours | ~$5–15K (penalty clause) | Varies | Partial |
| **>4 hours** | **$20–50K+** (manual cooling, fuel rental) | **High likelihood** | **Full coverage** (Lloyds) |
| 24+ hours | $200K+ (shutdown, forensics, reputation) | Class action risk | High-limit claim ($5M+) |

---

## Cross-References

**Other Phase 1c Facilities**:
- [[ACME Nashville Surface Treatment]] (TN, ITAR-exposed aerospace customers)
- [[ACME Ottawa Substation]] (115/27.6 kV IEC 61850, [[Sandworm]]-class targets)
- [[ACME Ottawa Civic Hospital]] (TOH Civic Campus model, ransomware-targeted)
- [[ACME Ottawa Pediatric Medical Center]] (CHEO model, post-2018 DDoS context)

**OXOT Reference Catalog**:
- [[1_datacenters]] folder (Tier classification, facility ecosystem)
- [[100 Master Segment 1 - Hyperscale Data Center Ecosystem]]
- [[104 Datacenter TierClassification System]]
- [[20_Vendor_Database_DCIM_ICS_Software]]

**Related Standards & Frameworks**:
- [[Uptime Institute Tier III]]
- [[TIA-942]]
- [[IEC 62443]]
- [[Purdue Model]]
- [[ITSG-33]]
- [[ITSG-31]]

---

**Document Version**: 1.0 | **Phase**: 1c | **Last Updated**: 2026-05-09  
**Wiki Model Scope**: 10 pages, ≤800 lines per file, [[wikilinks]] for vendors, standards, threat actors  
**Source Synthesis**: phase1c/acme-ottawa-datacenter/ (10 source files, 3500+ lines) → Obsidian wiki format
