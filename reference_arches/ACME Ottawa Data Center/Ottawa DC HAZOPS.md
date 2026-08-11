---
aliases: [ACME Failure Modes, ACME Risk Analysis]
type: facility-reference-model
category: data-center
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-datacenter, phase/1c, hazops, fmeca, risk, reliability]
related: ["[[ACME Ottawa Data Center]]", "[[Ottawa DC Threat Profile]]"]
created: 2026-05-09
updated: 2026-05-09
---

# Ottawa DC HAZOPS

> **Demo overlay**: ACME is a fictional demo customer. HAZOPS analysis reflects real Tier III infrastructure vulnerability patterns.

## Executive Summary

[[Uptime Institute Tier III]] data centers target **99.982% availability** (≤1.6 hours downtime/year). ACME Ottawa operates with concurrent maintainability: dual power feeds, redundant cooling loops, hot-standby generators, and segregated tenant zones. This HAZOPS identifies 12 critical failure modes, their intermediate protection layers, target SLs ([[IEC 62443]]), and residual risk profiles.

---

## Top 12 Critical Hazard Scenarios

### 1. Loss of Utility Power (Storm, Grid Event)

| Aspect | Detail |
|--------|--------|
| **Consequence** | 15 min UPS window → generator must start within 30 sec. Failure = fleet overheat in 45 min. |
| **Residual Risk** | **Medium**: Generator cold-start fail rate 0.5–1% — acceptable via quarterly test cadence, but single point of failure if ATS relay stuck |
| **Mitigation** | Real-time SCADA monitoring, automatic transfer switch dual-path logic, generator auto-start relay with watchdog timer, backup fuel supply |

### 2. Generator Failure to Start

| Aspect | Detail |
|--------|--------|
| **Cause** | Fuel contamination (water ingress, microbial growth), maintenance backlog (fuel injector fouling), battery dead, corrosion in fuel lines |
| **Consequence** | UPS battery depletes in 15 min. Servers begin shutdown. Tenant SLA breach. Heat rises to 35°C+. Disk failure cascade. |
| **Residual Risk** | **Medium-High**: Fuel contamination can disable generator for 4–8 hrs; mitigation requires discipline in preventive maintenance |

### 3. UPS Battery Thermal Runaway (Lithium or Lead-Acid Aging)

| Aspect | Detail |
|--------|--------|
| **Cause** | Over-charging (rectifier fault, thermal sensor failure), internal short circuit (manufacturing defect or age >8 yr), thermal runaway in lithium cells |
| **Consequence** | Battery cabinet fire → compartment smoke/heat → sprinkler discharge (FM-200 or Novec 1230) → operational disruption; hazmat cleanup; facility closure for 24+ hrs |
| **Residual Risk** | **Medium**: Lead-acid aging is predictable; lithium thermal events rare but catastrophic. EOL replacement at 7-yr mark mitigates. |

### 4. BMS Chiller Valve Stuck (Closed)

| Aspect | Detail |
|--------|--------|
| **Cause** | Mineral scale buildup (hard water in cooling tower), seismic shock or mechanical vibration → stuck spool |
| **Consequence** | Chiller outlet water temp rises 2°C/min. Chiller temperature alarm at 50°C → auto-shutdown. Zone temperature rises. Server shutdown sequence starts. |
| **Residual Risk** | **Medium**: Detected quickly via temp alarms. Redundant chiller + manual bypass mitigates. Failure-to-act = 2–4 hr recovery |

### 5. Raised-Floor Leak (CRAH Condensate Line Rupture)

| Aspect | Detail |
|--------|--------|
| **Cause** | Drain line corrosion (copper pipes, acidic condensate), installation defect (improper slope, pinched line), thermal expansion crack during winter shutdown |
| **Consequence** | Water pooling under raised floor → IP leakage to server intake vents → corroded network modules, power supply failure. Undetected: active electrical short → breaker trip or arc flash. |
| **Residual Risk** | **Low-Medium**: Detected early via sump alarms. Drainage system has 10–15 min capacity before spread. Risk: Detection failure → property damage + asset loss |

### 6. Fire Suppression Discharge (FM-200 or Novec 1230 Unintended Trigger)

| Aspect | Detail |
|--------|--------|
| **Cause** | Thermal shock from server overheat → fire detector false positive, accidental activation (maintenance, button press), smoke detector installed in HVAC return plenum → dust sensitivity |
| **Consequence** | Gaseous suppression floods zone (8–10 sec discharge). Server workloads crash immediately. Novec/FM-200 causes disk vibration + head crash risk. Recovery: 1–2 hrs to purge gas, restart equipment. |
| **Residual Risk** | **Low**: Rare trigger in Tier III design. Main risk: accidental activation by tenant or contractor. Locked release + dual-trigger logic mitigate. |

### 7. Cyber-Induced Generator Overspeed (BMS Compromise)

| Aspect | Detail |
|--------|--------|
| **Cause** | Attacker gains control of fuel governor set-point or load-regulation PID loop via unpatched DCIM system (SolarWinds-style supply-chain attack) |
| **Consequence** | Governor feedback loop malfunction → engine RPM rises beyond governed setpoint (2400 RPM nominal → 3200+ RPM uncontrolled). Mechanical stress on crankshaft, bearings. Catastrophic failure in 30–60 sec. |
| **Residual Risk** | **Medium**: Air-gapped BMS reduces risk. Weakness: DCIM software updates; supplier compromise still plausible. Residual risk requires 24/7 ops monitoring |

### 8. Cyber-Induced Cooling Shutdown (BMS Ransomware)

| Aspect | Detail |
|--------|--------|
| **Cause** | Ransomware (e.g., [[BlackCat]], [[LockBit]]) spreads from tenant IT segment to BMS via misconfigured firewall rules or compromised service account |
| **Consequence** | Chiller setpoint raised to 30°C (from 18°C). Zone temperature rises. Server intake temps reach 35°C within 8 min. Thermal throttling → workload performance degrades. Overheat alarms trigger. Tenant data loss + SLA breach. |
| **Residual Risk** | **Medium-High**: Segmentation + MFA reduce lateral movement. Weakness: tenant VPN access + weak password policies. Residual risk requires SOC vigilance + drills |

### 9. Tenant Cross-Contamination (Rogue Tenant Lateral Movement)

| Aspect | Detail |
|--------|--------|
| **Cause** | Vulnerable tenant-cage wiring (shared patch panels, mislabeled cross-connects), compromised tenant host pivots to shared colo switch port, physical access to unlocked tenant cage by neighbor |
| **Consequence** | Attacker accesses sibling tenant's network segment. Data exfil. Lateral move to facility backbone. Reputational damage + federal compliance violation. |
| **Residual Risk** | **Low-Medium**: Tier III standard design mitigates. Risk: legacy patches, port misconfiguration. Residual: periodic audits + training |

### 10. Loss of Single Carrier/BGP Failure

| Aspect | Detail |
|--------|--------|
| **Cause** | Carrier fiber cut (backhoe in field, maintenance error), [[BGP]] route hijack or misconfiguration (flapping, withdrawal), DDoS on carrier edge router (blackhole route) |
| **Consequence** | Primary carrier drops. Failover to secondary carrier activates. 2–5 sec latency spike + packet loss. Single-carrier-only tenants experience 30–60 sec outage. |
| **Residual Risk** | **Low**: Dual-carrier design mitigates single-point loss. Weakness: [[BGP]] misconfiguration (human error during maintenance). Residual: change control SOP + lab validation |

### 11. Multi-Tenant DDoS Amplification

| Aspect | Detail |
|--------|--------|
| **Cause** | One tenant's exposed DNS resolver, NTP server, or memcached runs unfiltered on colo switch. Attacker uses tenant as reflector in DDoS attack against external target. |
| **Consequence** | Tenant bandwidth exhausted. Downstream carrier link congested. All tenants on same carrier hit (backpressure). Latency degrades for innocent tenants. ISP may black-hole facility IP range. |
| **Residual Risk** | **Low-Medium**: Upstream scrubbing reduces impact. Weakness: tenant misconfiguration of services. Residual: tenant responsibility, but facility tools can limit spread |

### 12. SolarWinds-Style DCIM Compromise (Supply-Chain Attack)

| Aspect | Detail |
|--------|--------|
| **Cause** | Vendor (e.g., Sunbird, Nlyte, or [[Vertiv]] DCIM) ships backdoored update containing APT code. DCIM system pulls update, installs silently. |
| **Consequence** | Attacker gains visibility + control of entire facility state machine. Can manipulate power distribution, cooling setpoints, alert systems. Can exfiltrate facility topology, tenant rack assignments, power utilization data. Potential for cascading failure. |
| **Residual Risk** | **Medium**: Air-gapping + least-privilege reduce risk. Weakness: lab testing may miss zero-days. Residual: assume compromise, focus on detection + containment |

---

## Tier III Compliance Metrics

- **Uptime SLA**: 99.982% (max 1.6 hours downtime/year, or ~29 minutes/quarter)
- **MTTR (Mean Time To Repair)**: <4 hours for critical path components (power, cooling)
- **MTBF (Mean Time Between Failure)**:
  - Generator: 2,000–5,000 operating hours (~8–20 years for quarterly 30-min runs)
  - Chiller: 10,000–15,000 operating hours
  - UPS battery: 5–7 year design life
  - ATS: 50,000+ electrical cycles (10+ years typical)

---

## Top 5 Single Points of Failure (SPOFs)

| SPOF | Component | Effect | Mitigation | Residual Risk |
|------|-----------|--------|-----------|----------------|
| 1 | Main utility disconnect / Primary feeder | Loss of utility → UPS + gen required. If gen fails, facility down in 15 min. | Dual feeder from different utility substations; automatic transfer switch. Quarterly testing. | **Medium** |
| 2 | Diesel Generator (single unit, no secondary) | No backup power → 15-min UPS window → facility shutdown. | Install second generator (N+1) or emergency rental SLA | **Medium** (rental delay) |
| 3 | DCIM System | Ransomware wipe of facility control/monitoring. Operators lose real-time sensor visibility. | Air-gap DCIM from IT network. Backup cold standby. Daily config snapshots to immutable storage. | **Low-Medium** |
| 4 | Network backbone (core L3 switch, [[BGP]] router) | All tenant connections pass through backbone. Single unit failure = facility-wide connectivity loss. | Dual-active core switches (mesh interconnect). Per-tenant VRF isolation. | **Low** |
| 5 | Fuel supply to generator (single tank on-site) | Contamination (water, algae) or insufficient quantity. Generator cannot start or stalls mid-run. | Dual fuel tanks (N+1) with cross-connect valves. Quarterly fuel polishing. Desiccant breather. | **Low-Medium** |

---

## Insurance & Business Continuity

| Downtime Duration | Facility Loss | Tenant Claim | Insurance Payout |
|------------------|------------|-----------|------------------|
| <30 min (within SLA) | ~$0 (SLA credit ~$500–2K) | Negotiable | None |
| 30 min – 4 hours | ~$5–15K (penalty clause) | Varies | Partial |
| **>4 hours** | **$20–50K+** (manual cooling, fuel rental) | **High likelihood** | **Full coverage** (Lloyds) |
| 24+ hours | $200K+ (facility shutdown, forensics, reputation) | Class action risk | High-limit claim ($5M+ umbrella) |

**Key Takeaway**: Every hour of unplanned downtime beyond 4 hours triggers insurance payout → Facility prioritizes root-cause remediation over extended forensics.

---

## References

- Uptime Institute Tier Classification System
- NIST SP 800-82r3: Industrial Control Systems Security
- Cyber Risk in Data Center Cooling Systems (Dragos/TechMonitor)

---

**Doc Version**: 1.0 | **Phase**: 1c | **Last Updated**: 2026-05-09
