---
aliases: [ACME Ottawa Network, 115/27.6 kV Network Architecture, VLAN Design]
type: facility-reference-model
category: electrical-transmission-distribution
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-substation, phase/1c, sector/electrical, protocol/iec-61850, protocol/dnp3, org/acme-demo, network]
related: ["[[ACME Ottawa Substation]]", "[[Ottawa Substation Architecture]]", "[[Ottawa Substation Equipment]]", "[[Tofino Industrial Firewall]]", "[[Waterfall Unidirectional Gateway]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Ottawa Substation Network

**Executive Summary**: ACME Ottawa operates four segregated VLANs (Process, Station, Engineering, OOB), connected via industrial firewall ([[Tofino]]) to Hydro One control center (ICCP/TLS) and jump-server PAM gateway. Devices communicate via [[IEC 61850]] GOOSE/MMS (station bus) and legacy [[DNP3]] (northbound); time sync via PTP grandmaster + IRIG-B distribution.

---

## VLAN Architecture

| VLAN | IP Range | Purpose | Protocols | Security |
|--|--|--|--|--|
| **Process Bus** | 10.61.0.0/24 | Instrument transformers, merging units, I/O modules (sampled values) | [[IEC 61850]] SV (Ethertype 0x88BA), [[GOOSE]] (Ethertype 0x88B8) | L2 only, IEEE 802.1Q priority 4–7, no IP routing |
| **Station Bus** | 10.61.1.0/24 | Relays, IEDs, LAN gateways, SCADA aggregation | [[IEC 61850]] MMS (TCP 102), GOOSE, ICCP (TCP 102 TLS) | IP routable, engineering reachable, mDNS device discovery |
| **Engineering** | 10.61.2.0/24 | Relay config, EnerVista, Compass provisioning, commissioning | HTTP(S) 80/443, [[Modbus TCP]] 502, vendor diagnostics | Isolated from operational; jump-server required for access |
| **OOB Mgmt** | 10.61.99.0/24 | Out-of-band access, Tofino console, UPS SNMP, syslog aggregation | SNMPv3 161, Syslog UDP 514, SSH 22 | Separate physical links, air-gapped from Process/Station |

---

## LAN Device Inventory

### Process Bus (10.61.0.0/24)
- **2× [[SEL-3505]] Merging Units** (115/27.6 kV winding TTs, CTs)
- **8× I/O Modules** (analog inputs, binary outputs for breaker coils)
- **Sampled Value Streams**: 200 samples/sec per phase, IEEE 1588v2 timestamps embedded
- **GOOSE Publishers**: None on process bus (MUs only produce SV)

### Station Bus (10.61.1.0/24)
- **[[SEL-3530]] Real-Time Automation Controller** (115 kV zone control, AGC pilot) → 10.61.1.50
- **[[GE SR745]] Transformer Differential Relay** (27.6 kV transformer T1) → 10.61.1.51
- **[[ABB RET670]] Line Differential Relay** (115 kV line L1) → 10.61.1.52
- **[[Schweitzer 421G]] Distance Relay** (27.6 kV backup zone) → 10.61.1.53
- **[[Tofino Industrial Firewall]]** (southbound VLAN bridge, northbound WAN gateway) → 10.61.1.1
- **Generic Microgrid Gateway** (VPN aggregator to enterprise SOC) → 10.61.1.200

**IEC 61850 LAN Profile**: MMS server on [[SEL-3530]] (TCP 102), GOOSE multicast 224.0.0.0/24 (L2-bound), ACSI/XACML role-based access per [[IEC 62351-6]]

### Engineering VLAN (10.61.2.0/24)
- **GE EnerVista Workstation PC** (relay config, event review) → 10.61.2.100
- **[[SEL]] Compass Server** (asset inventory, remote-access gateway) → 10.61.2.101
- **[[ABB]] ServicePort Terminal** (RET670 diagnostics) → 10.61.2.102
- **CommScope Network Tap** (packet capture, IDS passive monitoring) → 10.61.2.150

### OOB Management (10.61.99.0/24)
- **[[Tofino]] Console** (out-of-band access, configuration, rule updates) → 10.61.99.1
- **APC UPS 9PX** (5 kVA, SNMP traps) → 10.61.99.10
- **Syslog Aggregator** (rsyslog, Promtail shipper to LOKI) → 10.61.99.50

---

## Protocol & Communication Flows

### Real-Time (Process Bus / Station Bus)

| Protocol | Ethertype / Port | Direction | Frequency | Latency Bound |
|--|--|--|--|--|
| **[[IEC 61850]] SV** | 0x88BA (L2) | MU → Relays | 200 Hz per analog group | < 4 ms (Cycle-based) |
| **[[GOOSE]]** | 0x88B8 (L2) | Device A ⇄ Device B | ~10 Hz (trip, reconfig) | < 3 ms |
| **[[IEC 61850]] MMS** | TCP 102 | Relay ← EnerVista | On-demand (config) | No hard deadline |
| **[[DNP3]] (Legacy)** | TCP 20000 | [[SEL-3530]] → Hydro One RTU | 2 s polling + events | 1 s max |
| **ICCP/TASE.2** | TCP 102 (TLS) | [[SEL-3530]] → HO SCADA | Event-driven + heartbeat | 2 s |

---

## WAN Gateway Architecture

### Northbound Connectivity (to Hydro One Control Center)

**Primary Path**: MPLS VPN + Fiber (64 Mbps, 99.5% SLA)
```
[[SEL-3530]] (10.61.1.50)
  └─ ICCP over TLS
     └─ [[Tofino Industrial Firewall]] (stateful, rule 001)
        └─ Metro Ethernet (Hydro One MPLS cloud)
           └─ HO SCADA Server (203.0.113.50)
```

**Secondary Path** ([[DNP3]] over dial-up to legacy RTU)
```
[[SEL-3530]] → [[Waterfall]] unidirectional gateway (telemetry extract)
           → 4G LTE backup modem (IP 10.61.99.200)
```

**Telemetry Export**:
- **[[Waterfall]] Data Diode**: Unidirectional (station bus → enterprise SOC only)
- **No reverse channel** from external systems to substation LAN
- **Extraction Protocol**: [[IEC 60870-5-104]] JSON (anonymized CVE/CWE tags, no firmware versions)

---

## Cybersecurity Perimeter

### [[Tofino Industrial Firewall]] Ruleset (summary)

```
Rule 001: Allow [[IEC 61850]] MMS (TCP 102) Station → Engineering (commissioning only)
Rule 002: Allow ICCP (TCP 102 TLS) [[SEL-3530]] → Hydro One (outbound only, cert-pinned)
Rule 003: Allow [[DNP3]] (TCP 20000) [[SEL-3530]] → dial-up (legacy fallback, rate-limited)
Rule 004: Allow SNMPv3 (UDP 161) OOB Mgmt ↔ UPS (no community strings)
Rule 005: Block all other inter-VLAN traffic
Rule 006: Drop packets from unknown sources (no spoofing)
```

### Jump-Server PAM Gateway

**Architecture**:
```
Remote Admin PC (external)
  ↓ VPN (TLS 1.3, MFA)
  → Jump Server (10.61.2.200, PAM hardening, 30-min session TTL)
     ├─ SSH → EnerVista PC (10.61.2.100) for relay config
     ├─ HTTP → Compass Server (10.61.2.101) for asset mgt
     └─ Serial → [[ABB]] Terminal (10.61.2.102) for black-box diagnostics
```

All sessions: logged to syslog (10.61.99.50), searchable by admin ID + timestamp.

---

## Time Synchronization

### PTP Grandmaster (10.61.1.5)

**Hardware**: [[Schweitzer]] SEL-8334 Network Time Product
- **Source**: GPS antenna + rubidium oscillator (stratum 1, ±100 ns jitter)
- **Announce Interval**: 1 per second (multicast 224.0.1.129:319, [[UDP]])
- **Sync Interval**: 16 per second (P2P hybrid delay mechanism)
- **Slave Convergence**: < 60 seconds to ±1 µs accuracy

**IRIG-B Distribution** (optical isolation):
- Outputs: 4 isolated TTL/LVDS channels
- Receivers: Legacy ABB/GE relays, [[IEC 60870-5-103]] RTU
- Frequency: 1 kHz, duty cycle 50% ± 5 ns

---

## Management & Monitoring

### SNMP v3 (10.61.99.0/24 only)

```
snmp-engine-id: SEL-3530-2026
users:
  - acme-monitor: read-only, authPriv (AES-256, HMAC-SHA-512)
  - acme-admin: read-write, authPriv (commissioning only)

targets:
  - acme-ups (10.61.99.10): battery %, load %, battery temp
  - tofino-fw (10.61.99.1): CPU %, mem %, packet drop rate
  - syslog-agg (10.61.99.50): disk usage %, last sync timestamp
```

### Syslog Aggregation (rsyslog + Promtail shipper to LOKI)

**Sources**:
- [[SEL-3530]] ([[UDP]] 514 unencrypted)
- [[Tofino]] Firewall (rule hits, connection state changes)
- UPS (battery events, status changes)
- Network Tap (IDS/IPS alerts, if deployed)

**Log Retention**: 7 days, 100 MB max (roll daily at 00:00 UTC)

---

## Key References

- **[[IEC 61850-9-2]]**: Sampled Values over ISO/IEC 8802-3
- **[[IEC 61850-8-1]]**: MMS (Manufacturing Message Specification) mapping
- **[[IEC 61850-90-6]]**: GOOSE signing (future CMS integration)
- **[[IEC 62351-5]]**: Security of ICCP
- **[[IEEE 1588-2008]]**: Precision Time Protocol for power systems

---

**Version**: Phase 1c | **Lines**: 380 | **Status**: Draft
