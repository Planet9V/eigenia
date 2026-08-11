---
aliases: [ACME Ottawa, Ottawa 115/27.6 kV Substation, Slater-Cataraqui TS]
type: facility-reference-model-hub
category: electrical-transmission-distribution
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-substation, phase/1c, sector/electrical, voltage/115kV, voltage/27.6kV, protocol/iec-61850, org/acme-demo, geo/ottawa-on]
related: ["[[Ottawa Substation Architecture]]", "[[Ottawa Substation Network]]", "[[Ottawa Substation Equipment]]", "[[Ottawa Substation HAZOPS]]", "[[Ottawa Substation Threat Profile]]", "[[Ottawa Substation Supply Chain]]", "[[Ottawa Substation Narrative]]", "[[Ottawa Substation CVE Cross-Reference]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# ACME Ottawa Substation

> **Demo Overlay**: ACME is a fictional demo customer for OXOT. This reference model is built from public-source research on Hydro Ottawa 115/27.6 kV transmission/distribution stations (composite of Slater TS, Cataraqui TS, Hawthorne MTS, Lemieux TS). Hydro Ottawa is unrelated to ACME or OXOT.

**Location**: 45.4042°N, 75.7104°W (Ottawa, ON)  
**Criticality**: Life-safety + grid stability (IEC 62443 SL-T 4 protection)  
**Grid Role**: 115 kV transmission input → dual 75 MVA transformers → 27.6 kV distribution to downtown Ottawa (150K+ households)

---

## Quick Reference

- **Primary Architecture**: [[IEC 61850]] station bus (GOOSE + MMS) + fiber process bus (Sampled Values 9-2LE) + [[Purdue Model]] L0–L3.5 segmentation
- **Key Equipment**: [[SEL-411L]] (distance relay), [[GE SR745]] (transformer differential), [[ABB RET670]] (distance), [[Siemens SIPROTEC 5 7SA622]] (feeder)
- **Protection Scheme**: Redundant distance relays (Zone 1, 2, 3) + differential + breaker-fail + ground fault (SIL 3 / SL-T 3)
- **Network Isolation**: Four VLANs (Process Bus 10.61.0.0/24, Station Bus 10.61.1.0/24, Engineering 10.61.2.0/24, OOB 10.61.99.0/24)
- **Cybersecurity Perimeter**: [[Tofino Industrial Firewall]] + [[Waterfall Unidirectional Gateway]] + [[Schweitzer SEL-3620]] cybersecurity gateway
- **Threat Landscape**: [[Sandworm]], [[Volt Typhoon]], [[APT33]], [[Predatory Sparrow]] (ICS-specific targeting)

---

## Wiki Pages

1. **[[Ottawa Substation Architecture]]** — Purdue layers, IEC 61850 station/process bus, zone definitions, control room design
2. **[[Ottawa Substation Network]]** — VLAN architecture, LAN devices, GOOSE/MMS/DNP3/ICCP flows, PTP time sync, Tofino ruleset
3. **[[Ottawa Substation Equipment]]** — Full equipment manifest (38 entries), relay firmware versions, merging units, switches, firewalls
4. **[[Ottawa Substation HAZOPS]]** — 12 hazard scenarios, FMECA, safety functions, cyber-physical convergence risks, RAMS analysis
5. **[[Ottawa Substation Threat Profile]]** — Threat actors (Sandworm, Volt Typhoon, APT33), kill-chain anchors, remote-access bypass patterns, [[NERC CIP]] compliance
6. **[[Ottawa Substation Supply Chain]]** — Tier 1-3 OEM suppliers, geopolitical chokepoints (Taiwan, China, Russia), long lead-time vulnerabilities, resilience roadmap
7. **[[Ottawa Substation Narrative]]** — Executive summary, mission, threat consequences at grid scale, top 5 immediate actions for board
8. **[[Ottawa Substation CVE Cross-Reference]]** — Equipment CVE inventory, ICS ATT&CK technique mapping (T0814, T0855, T0818, T0822, T0832, T0833, T0809, T0859, T0890), protocol vulnerability surfaces
9. **[[Ottawa Substation References]]** — [[IEC 61850]], [[IEC 62443]], [[IEEE 1588]], [[NERC CIP]], [[Ontario Regulation 22/04]], threat intelligence links, vendor docs, CISA advisories

---

## Core Design Principles

- **IEC 61850 Determinism**: Process bus (sampled values) guarantees <10 ms delivery for protection inputs
- **Air-Gap L0**: Primary power equipment (transformers, breakers, CTs, VTs) has no electronic feedback beyond hardwired copper
- **Fiber Process Bus Isolation**: Optical ring prevents L2 network congestion from impacting L1 relay speed
- **Dual Redundancy**: All protection feedback signals use dual CT/VT taps + dual relay pairs
- **Time Sync Precision**: UTC synchronization within 1 µs (GPS + [[IEEE 1588 PTP]] + IRIG-B) enables phasor correlation across grid
- **Manual Fallback**: Every breaker operation can be done by hand from yard or control house; no dependency on HMI software

---

## Regulatory & Compliance

- **[[IEC 62443]]**: SL-T 3 minimum (defense-in-depth, tiered security)
- **[[NERC CIP-005-7]]**: Electronic security perimeter, jump-host PAM, session recording, MFA
- **[[Ontario Regulation 22/04]]**: Provincial equivalent to [[NERC CIP]]
- **[[Bill C-26 (CCSPA)]]**: Critical infrastructure designation, supply-chain compromise reporting (proposed 2024)

---

## Cross-References

**Other ACME Facilities**:
- [[ACME Nashville Surface Treatment]]
- [[ACME Ottawa Data Center]]
- [[ACME Ottawa Civic Hospital]]
- [[ACME Ottawa Pediatric Medical Center]]

**Related Standards & Protocols**:
- [[IEC 61850]] — Power system communication, GOOSE, MMS, Sampled Values
- [[IEC 62443]] — OT security framework, SL-T definitions, zone-conduit model
- [[NERC CIP]] — North American reliability standards (CIP-002 through CIP-009)
- [[IEEE 1815 DNP3]] — Legacy SCADA protocol (Hydro One RTU link)
- [[Purdue Model]] — Layers 0–4, ICS architecture segmentation

**Threat Actors**:
- [[Sandworm]] — Industroyer2, GOOSE injection, 2022 Ukraine power grid attack
- [[Volt Typhoon]] — CISA AA24-038A, living-off-the-land, 300+ days undetected
- [[APT33]] — Spearphishing, watering holes, OT-specific targeting
- [[Predatory Sparrow]] — Iranian disruptive APT

**Security Appliances**:
- [[Tofino Industrial Firewall]] — IEC 61850 + Modbus inspection, stateful filtering
- [[Waterfall Unidirectional Gateway]] — Optical diode isolation, telemetry exfil only
- [[Schweitzer SEL-3620]] — Cybersecurity gateway, GOOSE/SMV filtering

---

## Key Files (OXOT Admin)

- `architecture.md` — 200 lines, Purdue mapping, IEC 61850 layers, zone definitions
- `network.md` — 280 lines, VLAN design, device inventory, protocol flows, firewalls
- `equipment.md` — 290 lines, 38 equipment entries, CVE surfaces, firmware versions
- `hazops.md` — 350 lines, 12 scenarios, FMECA, safety functions, cyber-physical risks
- `threat-and-access.md` — 390 lines, threat actors, kill chains, remote-access bypass, compliance
- `supply-chain.md` — 275 lines, OEM suppliers, geopolitical risks, resilience roadmap
- `narrative.md` — 150 lines, executive story, consequence scenarios, top 5 actions
- `cves-cross-ref.md` — 410 lines, CVE inventory, ICS ATT&CK mapping, SQL queries
- `research-sources.md` — 180 lines, standards, threat intel, regulatory docs, URL index

---

**Version**: Phase 1c | **Created**: 2026-05-09 | **Status**: Draft - Ready for integration into OXOT admin system
