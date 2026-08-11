---
aliases: [ACME Ottawa Narrative, Executive Story, Mission & Consequence]
type: facility-reference-model
category: electrical-transmission-distribution
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-substation, phase/1c, sector/electrical, org/acme-demo, narrative]
related: ["[[ACME Ottawa Substation]]", "[[Ottawa Substation Threat Profile]]", "[[Ottawa Substation HAZOPS]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Ottawa Substation Narrative

**Demo Overlay**: ACME is a fictional grid infrastructure asset for demonstration. Hydro Ottawa 115/27.6 kV topology and threat profiles are illustrative of real Eastern Ontario transmission-distribution systems.

---

## The Mission

ACME Ottawa Substation feeds Centretown, Glebe, and west-end Ottawa—a grid-scale dependency serving 150,000+ households, hospitals, Parliament Hill, and major commercial districts. Loss of this single facility cascades across Hydro Ottawa's distribution network, testing backup systems city-wide. We exist to keep the lights on. We also exist under siege.

---

## The Facility: Modern IEC 61850 Architecture

This is not your grandfather's substation. ACME operates a 115/27.6 kV transmission-distribution interface using [[IEC 61850]], the international standard that marries analog power physics with digital determinism.

**The layers**:
- **L0 (Process)**: Two 75 MVA transformers, 115 kV primary bus, 6 distribution feeders at 27.6 kV. Hard copper, fiber, physics. No software. No failure modes except thermal and mechanical.
- **L1 (Protection)**: 7 multifunction protective relays, 4 merging units that digitize analog signals at sampled-value rates (256 samples/cycle, 15.36 kHz). Decision latency: sub-cycle. A relay must detect a fault and trip a breaker in <10 milliseconds or cascading blackout begins.
- **L1.5 (Process Bus)**: Fiber-optic ring topology, dual-redundant. Merging units stream sampled values to relays via [[IEC 61850-9-2LE]]. [[GOOSE]] (Generic Object Oriented Substation Event) broadcasts trip decisions peer-to-peer across relays—no L2 central logic needed. Decoupled from Ethernet congestion.
- **L2 (Station Control)**: RTAC (Real-Time Automation Controller), historian database, supervisory logic, HMI workstation. Locked control room, air-gapped from public networks. TCP/IP for management, not control.
- **L3 (Enterprise)**: Remote dispatch to Hydro One control center via IPSec VPN + [[Waterfall]] unidirectional gateway (data flows out only; no reverse channel). PMU synchrophasors for wide-area monitoring. SCADA historian (30-day rolling buffer).
- **L3.5 (Engineering OOB)**: Isolated serial console, firmware repository, air-gapped jump host for vendor remote access. Physical key access. Session recording. Audit trail searchable by timestamp.

**Design Invariants**:
- Time sync to UTC within 1 µs ([[IEEE 1588]] PTP + IRIG-B redundancy). Enables phasor alignment across Hydro One's grid.
- Air-gap L0 (no software touches primary power equipment).
- Process bus (L1.5) isolated on dedicated fiber, unreachable from Ethernet congestion.
- Manual fallback: every breaker operation can be done by hand from the yard if HMI dies.

---

## The Threat Story: Textbook Targets

Three state-sponsored adversaries have demonstrated capability and intent against Canadian grid infrastructure.

**[[Sandworm]] (Russia-GRU)**: [[Industroyer]] and CRASHOVERRIDE explicitly target [[IEC 61850]] [[GOOSE]]. Their 2022 Ukraine power grid attack poisoned [[GOOSE]] trip messages, forcing manual relay operation mid-fault. Their 2025 activity in Polish wind and solar farms shows they've extended the playbook beyond transmission. **ACME vulnerability**: If our [[GOOSE]] multicast is flooded or replayed, relays see phantom trip signals. Protection coordination fails. Fault clears late or not at all.

**[[Volt Typhoon]] (China state-sponsored)**: [[CISA AA24-038A]] describes 300+ days undetected inside U.S. utility OT networks. Their tactic: compromise engineering workstations or HMI hosts via IT-domain breach, then lateral move into protection relays using [[Modbus]] or [[IEC 61850]] MMS. No destructive payload—just reconnaissance, pre-positioning, waiting for orders. **ACME vulnerability**: Our engineering team shares Active Directory with IT. An IT domain controller breach harvests SCADA admin credentials. A vendor jump-server compromise opens direct [[Modbus]] RTU access to relays.

**[[APT33]] (Iran)**: Spearphishing OT engineers with HMI installers, vendor software, grid-update emails. Post-compromise: firmware modification, protection scheme erasure, persistent backdoor. **ACME vulnerability**: A USB stick from a contractor, a watering-hole attack on a grid forum, an email signed with Siemens branding.

**The kill-chain anchors at ACME**:
1. Engineering workstation ([[IEC 61850]] [[GOOSE]] config tool, [[SEL]] AcSELerator). One spearphish → relay protection logic silently modified. Config drift undetected for 2–4 weeks.
2. HMI Windows host (domain-joined, running InduSoft Web Studio). A CVE-2024-XXXXX kernel exploit → SYSTEM privilege → lateral move to engineering VLAN.
3. Vendor remote paths ([[SEL]] Compass, GE EnerVista, [[ABB]] ServicePort). Compromised vendor laptop left on engineering LAN overnight. Direct [[Modbus]] to relays.
4. Shared IT/OT Active Directory. Single forest (ACME.LOCAL). OT engineers reuse credentials for file shares. IT breach → credential harvesting → OT admin access.

---

## The Consequence Story: Cyber-Physical Convergence

Traditional protection schemes are deterministic: analog signals → relay logic → trip decision. Determinism meant adversaries had to destroy hardware.

Digital determinism changed the game. Now an attacker can manipulate the sampled values merging units send, poison the [[GOOSE]] trip signals, or rewrite relay firmware—all without leaving a hole in the fence.

**Scenario A: [[GOOSE]] Flooding DoS**.
Attacker floods the station bus with 8,500 [[GOOSE]] packets per second. The Ethernet switch loses legitimate trip messages. Protection coordination fails. Fault persists for 300–500 ms instead of 10 ms. Transformer oil ignites. Cascading blackout on distribution feeders.

**Scenario B: Sampled-Value Spoofing**.
Attacker compromises a merging unit (firmware update vector) or performs MITM replay via the station LAN. CT/VT analog signals are falsified. Relays see healthy current when a 500 MVA bolted fault exists. No trip. Fault clears via backup protection (slower, at 2 seconds). Cables overheat. Fire risk on distribution feeders downtown.

**Scenario C: Stuxnet-Style Engineering Laptop**.
Malware persists on an engineering workstation used by protection engineers. Whenever a relay firmware update is staged, the backdoor injects a silent modification: distance protection zone 1 reach reduced by 5%. Relay appears healthy (self-diagnostics pass). But protection under-reaches, failing to clear external faults. Hydro One's load-shed logic activates. Cascading blackout.

**Scenario D: ICCP Command Hijack**.
Attacker compromises the [[IPSec]] VPN to Hydro One's control center. ICCP (Inter-Control Center Protocol) messages are replayed or rewritten. Operator sends a breaker-close command; attacker intercepts, modifies to breaker-open. Critical feeder sheds load. Hydro Ottawa's voltage sags. Downstream customers see brown-out. Critical load (hospital, Parliament Hill) falls back to generator—or fails if offline for maintenance.

---

## Consequence at Grid Scale

ACME is one node in a 2,500-node Hydro One transmission grid. Voltage support, reactive power, frequency regulation—all interdependent. Loss of ACME forces Hydro One's emergency procedures: rolling blackouts, load shedding priority by zone.

**If attack happens during peak winter load**: 4–8 hours regional outage. Hospitals on backup generators. Water treatment plants offline. Heating systems fail in residential neighborhoods. (grand)children in long-term care facilities lose incubator support.

**If cascading to U.S. grid** (via Niagara Falls interconnect): 99.97% uptime SLA violated. Frequency support pulled from Canadian sources, destabilizing U.S. Northeast grid. Cascading blackout across three states. Fed inquiries. Political fallout.

---

## Top 5 Priorities: Immediate Actions

**1. [[SEL]] Firmware Update & [[Tofino]] Hardening** (4–6 weeks).
- [[SEL-311L]] relays (2012-era) have unpatched CVE-2023-5678 (IED auth bypass). Vendor has patched firmware ready; load it.
- [[Tofino]] industrial firewall 7.4.2 has rule-bypass CVE (7.x family). Patch to 7.5.1. Enable [[IEC 61850]] [[GOOSE]] rate-limiting (max 100 msg/sec per device).
- **Success criterion**: [[SEL]] firmware audit clean. [[Tofino]] rule hits logged for 7 days; no unauthorized [[GOOSE]].

**2. [[Waterfall]] & [[Tofino]] Network Hardening** (2–4 weeks).
- [[Waterfall]] unidirectional gateway (current: firmware 5.2) provides hardware-enforced isolation (no return path). Verify fiber diode is functional (monthly test).
- [[Tofino]] bypass relay: if power failure ≥2 min, filtering disabled. Install UPS on [[Tofino]]. Add 15-min backup.
- **Success criterion**: [[Waterfall]] tested and logged. [[Tofino]] has backup power. Failsafe tested annually.

**3. PTP Time-Integrity Monitoring** (2 weeks).
- Current: GPS + [[PTP]] grandmaster + IRIG-B backup. Distance relays depend on time-of-fault within ±10 ms.
- Add automated time-error alarm: if any relay's clock drifts >±10 ms from grandmaster, trigger alert + force operator review.
- Implement NTP v4 (not v3 plaintext); enable authentication.
- **Success criterion**: Time-error alarm functional. Operator SOP updated.

**4. Vendor Remote-Access PAM & Session Recording** (6–8 weeks).
- Current: Jump host has no session recording. Vendor access to [[ABB]] ServicePort is unmonitored serial console.
- Deploy CyberArk PAM vault: all vendor credentials stored, rotated on each checkout.
- Require 30-min session TTL. Mandatory session recording (video + command transcript).
- **Success criterion**: PAM provisioned. Vendor access logs searchable. 2-week audit shows zero unauthorized sessions.

**5. [[NERC CIP]] Equivalent Compliance Audit** (ongoing).
- Ontario Reg. 22/04 mandates [[IEC 62443]] SL-T 3 (defense-in-depth) for transmission-distribution substations.
- Conduct annual penetration test (third-party firm): attempt Volt Typhoon-style lateral movement, [[GOOSE]] injection, sampled-value spoofing.
- Publish ACME's compliance matrix (5-year plan): which controls in-place, in-progress, deferred.
- **Success criterion**: Pen test report signed. Remediation roadmap approved by Hydro One cyber officer + OEB.

---

## Why This Matters for (grand)children

Grid stability is foundational. Hospitals need power 24/7/365. Water treatment needs power. Data centers (remote education, telehealth, critical comms) need power. A cascading blackout that starts here ripples city-wide, then provincial, then—if unlucky—national.

An attacker doesn't need to burn down the substation. They just need to manipulate a few digital signals—falsify sampled values, flood [[GOOSE]], hijack time-sync—and our protection schemes fail silently. The transformer catches fire. The distribution network goes dark. For days.

We are the target because we matter.

---

**Version**: Phase 1c | **Lines**: 350 | **Status**: Draft
