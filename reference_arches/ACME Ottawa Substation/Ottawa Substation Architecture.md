---
aliases: [ACME Ottawa Architecture, 115/27.6 kV Design, IEC 61850 Station Layout]
type: facility-reference-model
category: electrical-transmission-distribution
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-substation, phase/1c, sector/electrical, voltage/115kV, voltage/27.6kV, protocol/iec-61850, org/acme-demo, architecture]
related: ["[[ACME Ottawa Substation]]", "[[Ottawa Substation Network]]", "[[Ottawa Substation Equipment]]", "[[Ottawa Substation HAZOPS]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Ottawa Substation Architecture

**Facility**: Hydro Ottawa Slater–Cataraqui Transmission/Distribution Substation (115 kV → 27.6 kV)  
**Location**: Ottawa, ON 45.4042°N, 75.7104°W  
**Grid Role**: Inbound 115 kV transmission feeder (Ontario Hydro One interconnect) → dual 75 MVA transformers → outbound 27.6 kV distribution feeders to downtown Ottawa metro load  
**Criticality**: Life-safety + grid stability (IEC 62443 SL-T 4 protection)

---

## Purdue Model Mapping

| Purdue Level | Role | ACME Equipment | IEC 62443 SL-T |
|--|--|--|--|
| **L0 (Process)** | Primary equipment physics | [[Transformers]], [[Breakers]], [[CTs]], [[VTs]], capacitor banks, surge arresters | SL-T 4 (Life-safety) |
| **L1 (Bay)** | Protection + control relays | Multifunction relays (7×), Merging Units (4×), capacitor bank IED, TX relay | SL-T 4 (Protection critical) |
| **L1.5 (Process Bus)** | High-speed sampled values + GOOSE | Fiber ring, Ethernet switches, time sync | SL-T 4 (Latency-sensitive) |
| **L2 (Station/Control Center)** | RTAC HMI, supervisory logic, PMU aggregation | Rack-mounted industrial PC, SQL database, time server, gateway to WAN | SL-T 3 (High availability) |
| **L3 (Enterprise/Grid Ops)** | Remote dispatch, load forecasting, market ops | Encrypted WAN tunnel ([[IPSec VPN]]), SCADA historian, control center | SL-T 2 (Monitoring primary) |
| **L3.5 (Engineering/OOB)** | Remote diagnostics, firmware updates, logging | Dedicated out-of-band Ethernet port (physical isolation), jump host access | SL-T 3 (Controlled access) |

---

## Primary Power Equipment (L0 & L1)

### 115 kV Section
- **2× Main Power Transformers**: 75 MVA, 115/27.6 kV, Y-grounded/Y (TX1, TX2)
- **HV Bus**: Isolated, SF6 or vacuum (collection point)
- **HV Breaker**: 115 kV, ~2000 A, main feed disconnect
- **Disconnect Switches**: 115 kV motorized, backup isolation (2×)
- **Current Transformers**: 115 kV primary, 5 A secondary (4×)
- **Voltage Transformers**: 115 kV primary, 110 V secondary (2×)
- **Capacitor Bank**: 7.2–14.4 Mvar, shunt reactive power control
- **Surge Arresters**: Polymeric or ceramic, overvoltage protection (4×)

### 27.6 kV Section
- **TX Secondary Bus**: Isolated metalclad switchgear
- **Feeder Breakers**: 27.6 kV, 600–1200 A vacuum (6 distribution feeders)
- **Feeder Disconnects**: 27.6 kV load-break manual backup (6×)
- **Line CTs**: 27.6 kV primary, 5 A secondary (6×)
- **Shunt Capacitors**: 2.4–4.8 Mvar per group (3 banks), local VARs + voltage support
- **Surge Arresters**: Polymeric, feeder overvoltage protection (6×)

---

## IEC 61850 Station & Process Bus

### Layer 1.5: Process Bus (Sampled Values, 9-2LE)
**Participants**: 4 Merging Units (HV CT/VT, MV CT/VT taps) → 7 Multifunction Relays  
**Medium**: Fiber optic dual-ring topology (redundancy), 100 Mbps Ethernet switches  
**Sample Rate**: 256 samples per cycle (60 Hz = 15.36 kHz)  
**Protocol**: [[IEC 61850-9-2LE]] (sampled value encapsulation)  
**Purpose**: Sub-cycle protection loop (millisecond latency for fault detection)  
**Key Invariant**: Fiber isolation prevents L2 network congestion from impacting L1 relay speed

### Layer 2: Station Bus (GOOSE, MMS, TCP/IP)
**Participants**: All IEDs (relays, capacitor control, PMU), HMI workstation, time sync server  
**Medium**: Dual-stack switched Ethernet (ring topology, [[RSTP]] for bridging redundancy)  
**Protocols**:
- **[[GOOSE]]** (Generic Object Oriented Substation Event): Trip signals, breaker status, alarm events (<100 ms)
- **[[MMS]]** (Manufacturing Message Specification): Parameter readback, history, file transfer
- **TCP/IP**: NTP time sync, Syslog, management traffic

**Time Sync**: GPS/IRIG-B dual source (redundant), ≤1 µs accuracy for PMU alignment (per [[IEEE 1588]])

### Layer 3: System Control & Monitoring
- **Real-Time Advisory & Control (RTAC)**: Local station HMI with SQL database, automat logic engine
- **Remote Dispatch**: Data concentration via PMU (synchrophasors) + protected [[Waterfall]] gateway to control center WAN
- **Data Historian**: 30-day rolling buffer of waveforms, events, SCADA snapshots

---

## IEC 62443 Security Zones & Conduits

| Zone | Components | SL-T | Security Posture | Conduit to Outside |
|--|--|--|--|--|
| **Z-Primary** | Transformers, breakers, CTs, VTs, surge arresters, capacitor banks | 4 | Air-gap isolated; physical perimeter fence + locked yard gates | None (air-gap to L1) |
| **Z-Protection** | Multifunction relays (7×), MUs (4×), TX relay, capacitor IED, time sync server | 4 | Locked control house; dual-redundant fiber process bus; signed GOOSE + MMS auth | Process bus (fiber, L1.5); RTAC network (L2) |
| **Z-Control** | RTAC HMI, historian DB, supervisory logic engine | 3 | Locked control room; keyboard/monitor only; no USB ports; air-gap from public network | Station bus (Ethernet, L2); WAN gateway (VPN, L3) |
| **Z-Monitoring** | PMU aggregator, SCADA dashboard (read-only), syslog server | 2 | Locked cabinet; IPv4 ACLs; no command authority | WAN ([[IPSec]] tunnel, L3) |
| **Z-Engineering** | Out-of-band serial console, firmware repository, jump host | 3 | Separate air-gapped network; physical key access; audit logging | Serial port (isolated), Ethernet (VPN-only, L3.5) |

---

## Station Physical Layout

```
[Yard Perimeter: Chain-link fence, locked gates, 24/7 CCTV]
│
├─ HV Yard (115 kV section)
│  ├─ Main TX1 (75 MVA, 115/27.6, oil-cooled)
│  ├─ Main TX2 (standby/contingency)
│  ├─ HV Bus (SF6 or vacuum, rigid)
│  ├─ Shunt capacitor bank (7.2 Mvar, 115 kV)
│  └─ Lightning mast + grounding grid (10 ohms max)
│
├─ MV Yard (27.6 kV section)
│  ├─ Switchgear cubicles (6 feeder breakers, 1 main)
│  ├─ Feeder capacitor groups (3 banks, 2.4–4.8 Mvar each)
│  ├─ Distribution feeders to downtown Ottawa (OH lines)
│  └─ Load-break disconnect switches (manual, per feeder)
│
├─ Control House (brick/concrete, HVAC, UPS, access badge)
│  ├─ Equipment Room L1
│  │  ├─ Dual Ethernet switches (station bus, process bus fiber ring)
│  │  ├─ Time sync server (GPS/[[IRIG-B]], NTP stratum 1)
│  │  ├─ Uninterruptible Power Supply (UPS, 15 min runtime)
│  │  ├─ Battery charger + 48 VDC dist. panel
│  │  └─ Relay cabinets (multifunction relays, TX relay, capacitor IED)
│  │
│  ├─ Control Room L2
│  │  ├─ RTAC workstation (industrial PC, dual monitors, no USB)
│  │  ├─ Supervisor phone + intercom to dispatch
│  │  └─ Control desk (hardcopy one-line diagram, manual op checklists)
│  │
│  ├─ Server Room L2b
│  │  ├─ Historian database (industrial SQL, local redundancy)
│  │  ├─ Syslog aggregator (event logging, audit trail)
│  │  └─ PMU data concentrator (synchrophasors → WAN)
│  │
│  └─ OOB Management Room L3.5
│     ├─ Serial console server (access to relay serial ports, key-locked)
│     ├─ Jump host (air-gapped Ethernet, VPN gateway for remote support)
│     └─ Firmware staging repository (USB drive storage, no internet)
│
└─ Perimeter Security
   ├─ CCTV system (8 cameras, 90-day NVR storage, air-gapped)
   ├─ Door sensors + tamper alarms on critical rooms
   ├─ Physical badge access logs (hardcopy + file server)
   └─ Grounding grid + lightning protection
```

---

## Key Design Invariants

1. **IEC 61850 Determinism**: Process bus latency <10 ms guarantees sub-cycle protection delivery
2. **Dual Redundancy L0→L1**: All protection feedback uses dual CT/VT taps and dual relay pairs
3. **Air-Gap L0**: Primary equipment has no electronic feedback beyond hardwired copper
4. **Process Bus Isolation**: Fiber optic ring prevents L2 network congestion from impacting L1 relay speed
5. **Time Sync**: All IEDs synchronized to UTC within 1 µs via [[IEEE 1588 PTP]]
6. **No Wireless L0–L2**: Control signals strictly wired; mobile devices segregated to L3
7. **Manual Fallback**: All critical breaker operations can be done manually; no dependency on HMI software

---

## References

- **[[IEC 61850-5]]**: Communication requirements for functions and device models
- **[[IEC 61850-9-2]]**: Sampled values over ISO/IEC 8802-3 (process bus)
- **[[IEC 62443-3-3]]**: System security requirements (SL-T definitions, zone partitioning)
- **[[NIST SP 800-82 Rev. 3]]**: Guide to ICS (Purdue Model, zone segmentation)

---

**Version**: Phase 1c | **Lines**: 380 | **Status**: Draft
