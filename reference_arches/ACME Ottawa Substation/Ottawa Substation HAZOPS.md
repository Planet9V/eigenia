---
aliases: [ACME Ottawa HAZOPS, Hazard Analysis, RAMS, Safety Functions]
type: facility-reference-model
category: electrical-transmission-distribution
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-substation, phase/1c, sector/electrical, org/acme-demo, safety, hazops]
related: ["[[ACME Ottawa Substation]]", "[[Ottawa Substation Architecture]]", "[[Ottawa Substation HAZOPS]]", "[[Ottawa Substation Threat Profile]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Ottawa Substation HAZOPS & RAMS Analysis

**Demo Overlay**: This HAZOPS synthesizes typical 115/27.6 kV substation hazards. Real operations require site-specific [[PHA]], protective device coordination, and licensed PE review per [[CSA Z535]].

---

## HAZOPS Scenarios (Top 10)

| # | Deviation | Cause | Consequence | IPL | Target SL-T | Residual Risk |
|--|--|--|--|--|--|--|
| **H1** | Loss of 115 kV supply (N-1) | Utility fault, breaker trip, TX failure | Load shed on 27.6 kV; 4–8 h regional outage | Distance protection + reclosure logic (3 sec) | SL-T3 | Medium |
| **H2** | TX oil release / fire | Winding short, bushing failure | Environmental spill, thermal runaway | Pressure relief, oil containment berm | SL-T3 | Low |
| **H3** | Breaker failure to clear fault | Contact corrosion, trip coil failure | Fault persists; backup protection delays (300–500 ms) | Breaker fail relay, redundant trip signal | SL-T2 | Medium |
| **H4** | Arc flash on switchgear | Technician error, insulation degradation | Worker serious injury; equipment damage | [[NFPA 70E]] arc-flash label, PPE, [[LOTO]] | SL-T3 | Low |
| **H5** | SF6 gas release (120 kg) | Decomposition, corrosion, valve leak | GWP 23500×; asphyxiation; equipment derating | Gas detection + alarm, maintenance SOP | SL-T2 | Low |
| **H6** | Ground fault on station bus | Contamination, ice, insulation puncture | Transient overvoltage (1.4–1.7 pu); protection misoperation | Ground-fault protection + isolation relay | SL-T2 | Medium |
| **H8** | Sampled-value spoofing ([[IEC 61850]] 9-2LE) | Attacker compromises MU firmware; MITM replay | CT/VT data falsified; relays see healthy when fault exists | Phasor authentication + signature verification | SL-T2 | Medium |
| **H9** | [[GOOSE]] flooding DoS | Malicious agent floods 8500/sec | Station bus switch unable to process trip signals | Network QoS, GOOSE rate-limit filter (max 100 msg/sec) | SL-T2 | Low |
| **H10** | Time-sync attack ([[PTP]]/IRIG-B) | Rogue NTP server; IRIG-B cable splice | Distance/differential protection time-distance mismatch | [[IEEE 1588]] PTP auth, independent GPS, redundant sources | SL-T2 | Low |
| **H11** | ICCP-to-control-center compromise | Attacker hijacks RTU ↔ EMS VPN | Operator commands blocked/spoofed; unauthorized breaker operation | VPN + TLS mutual auth, ICCP protocol signing | SL-T3 | Medium |

---

## FMECA Highlights (Top 5 Protection Schemes)

### 1. **Distance Protection (Zone 1, 2, 3)**
- **FMEA**: Relay CPU failure → no trip until watchdog resets (~500 ms) → partial fault exposure
- **Mitigation**: Redundant distance relay (parallel logic), fast watchdog (50 ms)
- **RPN**: 6 × 4 × 3 = **72** (medium-high)

### 2. **Differential Protection (Bus)**
- **FMEA**: Current transformer saturation → CT ratio misalignment → false trip on healthy feeder
- **Mitigation**: Harmonic restraint (2nd harmonic block), % differential with slope
- **RPN**: 3 × 5 × 4 = **60** (medium)

### 3. **Breaker-Fail Protection**
- **FMEA**: Failed pole contact → three-phase unbalance → relay detects stalled breaker too late
- **Mitigation**: Three-pole supervision, fast trip-signal echo back, override timer (150 ms)
- **RPN**: 4 × 5 × 3 = **60** (medium)

### 4. **Ground Fault Protection**
- **FMEA**: High-impedance ground (TT system) → insufficient current for relay pickup → intermittent arc (ferroresonance)
- **Mitigation**: Sensitive zero-sequence relay (≥0.5 A setting), Peterson coil tuning
- **RPN**: 5 × 4 × 3 = **60** (medium)

### 5. **Arc Flash Mitigation**
- **FMEA**: Failure to reduce arc flash energy (clearance time + incident energy) → injury severity increases
- **Mitigation**: Fast distance protection (100–200 ms), zone overlaps, [[NFPA 70E]] arc-flash label, PPE
- **RPN**: 2 × 9 × 5 = **90** (high; direct safety impact) → **Mitigating Action**: Auto-transfer + arc-flash relay; 100 ms target

---

## Safety Functions Inventory

| Safety Function | Scope | Target SIL | Target SL-T | Implementation |
|--|--|--|--|--|
| **Distance Protection (Trip A)** | Clears line-to-line/phase-to-ground faults on 115 kV | SIL 3 | SL-T3 | Redundant Zone 1 relays; proof testing annual |
| **Differential Protection** | Isolates faulty transformer; rejects external faults | SIL 3 | SL-T3 | 2-out-of-2 relay logic; stability checks |
| **Breaker Fail** | Backup protection if primary breaker stalls | SIL 2 | SL-T2 | Starter bus protection; timer-based escalation |
| **Ground Fault** | Isolates single-phase-to-ground faults | SIL 2 | SL-T2 | Sensitive zero-sequence; capacitive coupling |
| **Arc Flash Mitigation** | Reduces arc flash hazard (clearance time) | N/A | SL-T3 | Fast protection + hazard label + PPE |
| **Breaker Trip Supervision** | Confirms breaker pole motion | SIL 2 | SL-T2 | Position switch feedback; hardwired echo |
| **[[GOOSE]] Priority Queue** | Ensures trip message delivery during network load | SIL 1 | SL-T2 | CoS-based scheduling; multicast suppression |
| **Time Integrity** | Maintains synchro-phasor accuracy | SIL 2 | SL-T2 | Redundant GPS + [[PTP]]; error alarm at ±10 ms |

---

## Cyber-Physical Convergence Map

| Cyber Attack | Vector | Consequence | IEC 62443 SL Impact |
|--|--|--|--|
| Sampled-value falsification | MU firmware compromise, MITM | Relays blind to fault; delayed/no trip | SL-T2 → SL-T1 if undetected |
| [[GOOSE]] DoS | LAN flooding (8500 msg/sec) | Station bus drop; loss of P2P trip signal | SL-T2 → SL-T1 (isolated relay operates local input) |
| Time-sync attack | Rogue NTP / GPS jammer | Distance scheme under-reach (phase angle error) | SL-T2 → SL-T1 (time-error threshold exceeded) |
| MU firmware backdoor | USB stick / supply-chain | MU reboots on attacker trigger; analog data stops | SL-T3 → SL-T2 (firmware signature prevents deploy) |
| Control message hijack | VPN key compromise, RTU replay | Operator breaker commands ignored or spoofed | SL-T3 → SL-T2 (command authentication, audit log) |

---

## Key Takeaways

1. **N-1 contingency + fast reclosure** remains primary operational hazard; no crypto protection substitutes for utility coordination.
2. **Cyber-physical convergence** (sampled-value, [[GOOSE]], time-sync) introduces new SL-T2 → SL-T1 risks if relays not isolated by VLAN + crypto.
3. **Distance protection redundancy** is mandatory (2 relays) to meet SIL 3 / SL-T3 for primary clearance.
4. **Arc flash mitigation** (fast trip + hazard label + PPE) is highest-RPN safety function; 100 ms target achievable with Zone 1 + arc-flash relay.
5. **Ground grid integrity** (5-yr inspection, <5 Ω target) is foundational; ferroresonance risk increases with TT grounding.

---

## References

- **[[IEC 61850-7-420]]**: Protection Device Language (PDIS)
- **[[CSA Z535.1]]**: Hazard Identification & Product Labeling
- **[[IEEE C37.100]]**: Power System Relays & Control

---

**Version**: Phase 1c | **Lines**: 320 | **Status**: Draft
