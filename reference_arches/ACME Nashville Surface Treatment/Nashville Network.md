---
aliases:
  - Nashville Network Design
  - Nashville VLAN Architecture
  - Nashville OT Network
type: facility-reference-model
category: surface-treatment
status: draft
domain: OT
tags:
  - domain/OT
  - facility/acme-nashville-surface-treatment
  - phase/1c
  - network/vlan
  - network/segmentation
related:
  - "[[ACME Nashville Surface Treatment]]"
  - "[[Nashville Architecture]]"
  - "[[Nashville Equipment]]"
  - "[[IEC 62443]]"
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: This document models [[Aalberts Surface Technologies]] Nashville TN (anodizing/plating/electroless-nickel/coatings). ACME is a fictional overlay; facility coords 36.2091, -86.7474.

---

## Network Topology Overview

ACME Nashville operates a [[Purdue Model]] (ISA-95) segmented OT network across process control, monitoring, and corporate layers with hierarchical demarcation zones per [[IEC 62443]] SL 2/3. Process control spans four chemical plating lines (Anodizing, Nickel, Hard Chrome, Specialty Coatings) with shared HMI, MES, and historian infrastructure.

---

## VLAN Architecture

| VLAN ID | Name | Purpose | IP CIDR | Notes |
|---------|------|---------|--------|-------|
| 100 | Process-Control | [[PLC]]/RTU/drives (ControlLogix, Profinet, Modbus TCP) | 10.111.1.0/24 | Layer 2 ZSL1 demarcation |
| 101 | Safety-Interlocks | Safety-rated E-stops, fire suppression logic, emergency shutdown | 10.111.2.0/24 | Air-gapped within facility; [[IEC 61511]] SIL 2 |
| 102 | HMI-Engineering | Operator stations, engineering workstations, trend displays | 10.111.3.0/24 | Read-only [[IEC 62443]] ZSL2 |
| 103 | MES-Historian | Manufacturing Execution System, OPC UA historian, OEE rollup | 10.111.4.0/24 | Historian archive (InfluxDB, SQL Server historian) |
| 104 | OT-Mgmt | Remote access, diagnostic SCADA, asset management (Maximo) | 10.111.5.0/24 | [[IEC 62443]] ZSL2; restricted admin access only |
| 105 | Wireless-OT | Mobile operator tablets, handheld barcode scanners, voice comms | 10.111.6.0/24 | [[WPA3]]-Enterprise; 802.1X auth required |
| 110 | Corporate-LAN | Finance, HR, procurement, email, ERP ([[SAP]]) | 192.168.111.0/24 | Standard corporate security; no OT access |
| 111 | Guest-WiFi | Visitors, contractors, temporary access | 192.168.111.128/25 | Isolated; rate-limited; 4-hour session timeout |
| 120 | DMZ | Corporate web portal, vendor SaaS APIs, Rockwell FactoryTalk Cloud | 172.16.111.0/24 | Firewalled; only HTTPS/VPN egress |
| 130 | Out-Of-Band | IPMI/iLO, console servers, dedicated mgmt network | 10.111.200.0/24 | Air-gapped; hardwired only; no wireless |

---

## Protocol Map by Zone

### Layer 2: Process Control (VLAN 100 — 10.111.1.0/24)

| Protocol | Port | Direction | Encryption | Equipment | Notes |
|----------|------|-----------|-----------|-----------|-------|
| [[EtherNet/IP]] | 44818 TCP | PLC ↔ I/O | None (encrypted via IPSec tunnel from border router) | [[Allen-Bradley]] CompactLogix (Lines 1,2,3), ControlLogix (central) | Real-time; <1ms jitter requirement |
| [[Profinet]] | 34962 UDP | Drive ↔ PLC | TLS optional (not in use; requires GSD module upgrade) | [[Siemens]] S7-1200 (Line 4 Hard Chrome), frequency drives | Cyclic; every 10 ms |
| [[Modbus TCP]] | 502 TCP | RTU ↔ PLC | None; IPSec tunnel at L3 | Legacy temperature/pressure transmitters (Yokogawa) | Fallback; <100 ms latency acceptable |
| [[MQTT]] | 8883 TCP | PLC → Historian | TLS 1.2 (cert pinned) | All PLCs → InfluxDB MQTT broker | Telemetry; JSON payload; 30-min buffer on PLC |

### Layer 2.5: HMI/Engineering (VLAN 102 — 10.111.3.0/24)

| Protocol | Port | Direction | Encryption | Equipment | Notes |
|----------|------|-----------|-----------|-----------|-------|
| [[OPC UA]] | 4840 TCP | HMI ↔ PLC | TLS 1.2; certificate-pinned | Operator workstations (Ignition, FactoryTalk View) | Subscribe-mode; read-only at HMI layer |
| [[HTTPS]] | 443 TCP | Browser → Ignition | TLS 1.2 | Web HMI dashboard (Ignition web module) | Role-based access; 15-min session timeout |
| [[VNC]] | 5900 TCP | Admin ↔ Engineering | SSH tunnel (no direct) | Engineering workstations to PLC console | Tunnel via jump server only |

### Layer 3: Historian/MES (VLAN 103 — 10.111.4.0/24)

| Protocol | Port | Direction | Encryption | Equipment | Notes |
|----------|------|-----------|-----------|-----------|-------|
| [[MQTT]] | 8883 TCP | PLC → InfluxDB | TLS 1.2 (cert pinned) | All PLC→Historian | Retained messages for offline playback |
| InfluxDB | 8086 TCP | MES → Historian | mTLS (cert-pinned) | MES server reads historian; InfluxDB (time-series) | Bare queries blocked; must use OPC UA aggregation layer |
| SQL Server | 1433 TCP | MES ↔ ERP | Windows Auth (Kerberos) | [[SAP]] → SQL Server historian replicas | Once-daily batch sync; no real-time feedthrough |
| [[Syslog]] | 514 UDP | All devices → Logger | TLS 1.2 via rsyslog | Central syslog aggregator (ELK stack) | AuditLog; 90-day retention |

---

## Conduit Model (Firewall Rules by Zone Pair)

### Conduits Defined (IEC 62443 ZSL demarcation)

| From | To | Port | Protocol | Allow | Rationale |
|------|----|----|----------|-------|-----------|
| **Process-Control** (VLAN 100) | **HMI** (VLAN 102) | 4840 | OPC UA (TLS) | ✅ | Read-only subscription; no write from HMI |
| **Process-Control** (VLAN 100) | **Historian** (VLAN 103) | 8883 | MQTT (TLS) | ✅ | Push telemetry only; no pull |
| **Process-Control** (VLAN 100) | **OT-Mgmt** (VLAN 104) | 22, 502 | SSH, Modbus TCP (tunnel) | ✅ | Admin access only; jump server relay required |
| **Process-Control** (VLAN 100) | **Corporate** (VLAN 110) | — | — | ❌ | Complete air-gap; zero cross-traffic allowed |
| **HMI** (VLAN 102) | **Historian** (VLAN 103) | 8086 | InfluxDB (mTLS) | ✅ | Trend queries; 5-min aggregation minimum |
| **OT-Mgmt** (VLAN 104) | **Corporate** (VLAN 110) | 443 | HTTPS (TLS) | ⚠️ | Filtered; Maximo API only; no file transfer |
| **Corporate** (VLAN 110) | **DMZ** (VLAN 120) | 443, 80 | HTTPS, HTTP | ✅ | Web portal, vendor SaaS only |
| **Safety-Interlocks** (VLAN 101) | Anything | — | — | ❌ | Fully air-gapped; hardwired relay logic only |

---

## Time Synchronization

### Atomic GPS Reference (Site)

**Location**: Roof-mounted GPS antenna (Trimble Thunderbolt E); coax run down external conduit to comms rack.

- **Primary Clock**: 10.111.200.10 (Out-Of-Band VLAN; hardwired only)
- **PTP IEEE 1588 Master**: Grandmaster stratum 1; <100 ns accuracy
- **Clients**: All PLCs, historian, MES sync to 10.111.200.10 via PTP multicast (224.0.1.129:319)
- **Fallback**: NTP pool (ubuntu.com) for historian/MES secondary sync; PLC timers fall back to local quartz (±5 ppm drift)

### PTP Distribution (Layer 2)

| Zone | Clock Source | Sync Interval | Accuracy Target |
|------|--------------|---------------|------------------|
| Process-Control (VLAN 100) | Grandmaster 10.111.200.10 (PTP) | 1 pps | <1 μs (OPC UA timestamp matching) |
| HMI (VLAN 102) | Grandmaster (PTP) + NTP backup | 10 sec | <100 ms (operator display) |
| Historian (VLAN 103) | Grandmaster (PTP) via dedicated port | 100 ms | <10 ms (time-series alignment) |
| OT-Mgmt (VLAN 104) | NTP pool (ubuntu.com, .edu, .org) | 5 min | <1 sec (Maximo audit log) |
| Corporate (VLAN 110) | NTP pool | 15 min | <10 sec (SAP ERP) |

---

## Diagnostic & Maintenance Access

### Jump Server Architecture (OT-Mgmt VLAN 104)

**Jump Server**: 10.111.5.200 (hardened Linux; CIS Level 2; no outbound internet)

**Access Path**:
1. Engineer VPN into corporate LAN (192.168.111.x)
2. SSH to jump server (10.111.5.200) with 2FA ([[TOTP]])
3. From jump, SSH to target PLC (10.111.1.x) — SSH tunnel only; no direct access
4. All commands logged via auditd + central syslog

**Command Restrictions**:
- Read-only by default; write requires approval ticket + manager override
- IP whitelisting: Only corporate office IPs permitted (no home VPN)
- Time windows: Mon-Fri 0600-1800 CST only (emergency after-hours access requires director phone approval)

---

## Wireless & Mobility

### 802.1X Authentication Flow (VLAN 105)

1. **Tablet** connects to SSID "ACME-OT-Staff" ([[WPA3]]-Enterprise)
2. **RADIUS server** (10.111.5.100) issues challenge via EAP-TLS
3. **Tablet certificate** (auto-provisioned via MDM) verified against local CA
4. **Access Point** ([[Cisco]] Catalyst 9120) grants VLAN 105 membership
5. **Operator** launches Ignition mobile client; inherits VLAN 105 subnet (10.111.6.x)
6. **Session timeout**: 2 hours; 15-min inactivity auto-disconnect; geofence enforcement (facility perimeter ±50m)

---

## Security Boundary & Demarcation

### Demarcation Firewall (Border Router: [[Cisco]] ASR 1001-HX)

**Input ACL** (DMZ → OT-Mgmt):
- Only 172.16.111.0/24 permitted
- Only ports 443 (HTTPS), 123 (NTP), 514 (syslog)
- All EtherNet/IP, Profinet, MQTT, OPC UA blocked at ingress

**Output ACL** (OT-Mgmt → Internet):
- Only DMZ gateway hosts (172.16.111.x) can originate
- Whitelist of 12 vendor hostnames (no wildcards); DNS validation via Route 53 DNSSEC
- Port 443, 123 only
- Rate limit: 1 Gbps aggregate (process control gets priority; management traffic shaper at 100 Mbps)

---

## Cross-references

- [[ACME Ottawa Data Center]]
- [[ACME Ottawa Substation]]
- [[ACME Ottawa Civic Hospital]]
- [[ACME Ottawa Pediatric Medical Center]]

## See also

- [[Nashville Architecture]] — zone layout and Purdue mapping
- [[Nashville Equipment]] — network device inventory
- [[IEC 62443]] — security levels and conduit principles
- [[Purdue Model]] — ISA-95 network demarcation
