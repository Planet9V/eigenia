---
aliases: [ACME Network Fabric, ACME Spine-Leaf, ACME BGP]
type: facility-reference-model
category: data-center
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-datacenter, phase/1c, network, vxlan, evpn, bgp]
related: ["[[ACME Ottawa Data Center]]", "[[Ottawa DC Architecture]]", "[[Ottawa DC Equipment]]"]
created: 2026-05-09
updated: 2026-05-09
---

# Ottawa DC Network

> **Demo overlay**: ACME is a fictional demo customer. This reference model is built from public-source research on federal-tenant colocation patterns. No specific real federal facility is impersonated.

## Executive Summary

The ACME Ottawa Data Center implements a **spine-leaf [[VXLAN]]/[[EVPN]] fabric** for multi-tenant isolation over a **dual-redundant optical backbone** (MMF/SMF cross-connects in on-site MMR—multi-mode router) peered to [[Bell Canada]], [[Telus]], Rogers, Cogent, and Hurricane Electric via BGP. Out-of-band management operates on isolated IPv6 network (172.16.0.0/16); Building Management System (BMS) runs dedicated fabric (BACnet/IP, Modbus TCP, SNMPv3). Production tenant pods occupy 10.10.0.0/16; DCIM/monitoring on 10.20.0.0/16. Edge security enforced by [[Palo Alto Networks]] PA-5400 and [[Fortinet]] FortiGate 7000F; tenant-side firewalls (managed per tenant contract). Time synchronization via PTP IEEE 1588 with rooftop GNSS discipline. Remote access for third-party vendors ([[Cisco]] TAC, [[Vertiv]] FieldCare, [[Schneider Electric]] Connected Services, Pure Cloud Mediator, [[VMware]] Skyline) gated through bastion hosts with audit logging.

---

## Physical Network Infrastructure

### Optical Backbone

**Primary Connectivity:**
- **Fiber Routes**: Two physically diverse MMF (62.5 µm) + SMF (9 µm) bundles to carrier PoP
- **Location**: Rooftop optical cross-connect cabinet (MMR—multi-mode relay)
- **Redundancy**: Active-active, automatic failover at L2 via LACP (LAG ports 1–4)
- **Distances**: ~2.4 km to [[Telus]] downtown hub; ~3.1 km to [[Bell Canada]] Point Exchange

**BGP Peering:**

| ASN | Carrier | ISP Type | Primary Link | Backup Link | Weight |
|-----|---------|----------|--------------|------------|--------|
| AS 1673 | [[Bell Canada]] | Tier-1 Internet | Eth1/1 (10Gbe MMF) | Eth1/2 (10Gbe SMF) | 100 |
| AS 6453 | [[Telus]] | Tier-1 Internet | Eth2/1 (10Gbe MMF) | Eth2/2 (10Gbe SMF) | 95 |
| AS 577 | Rogers | Tier-1 Internet | Eth3/1 (10Gbe) | None (1x9.9 Gbps) | 80 |
| AS 174 | Cogent | Transit | Eth4/1 (10Gbe) | None | 75 |
| AS 6939 | Hurricane Electric | Transit | Eth5/1 (10Gbe) | None | 70 |

**BGP Route Policy**: Local-pref 300 for [[Bell Canada]]/[[Telus]] (primary); 250 for Rogers; 200 for Cogent/HE (tertiary). ECMP with max-paths 2 for equal-cost redundancy within same carrier.

### Internal Optical Distribution

**Fiber Plant:**
- **MDF (Main Distribution Frame)**: Floor 2, secured cage, 288 SC duplex ports (48-port panels × 6)
- **IDF (Intermediate DF) per Floor**: Floors 1–10, 144 SC duplex ports each, bridged to MDF via 12-strand OS2 backbone runs (4× redundant risers per floor)
- **Cabinet Cross-Connects**: 144 LC duplex per cabinet (rows A–H, 12 cabinets each), daisy-chained to nearest IDF
- **Connector Discipline**: OS2 for inter-floor; OM3 within cabinet rows (≤100 m run lengths); test records per [[TIA-568]].3

---

## Logical Network Architecture

### Spine-Leaf [[VXLAN]]/[[EVPN]] Fabric

**Topology:**
- **Spine Layer** (2x [[Cisco]] Nexus 9504): 32× 400GE QSFP ports each (1 Pbps aggregate)
- **Leaf Switches** (12× [[Cisco]] Nexus 9396 or equiv per 3-row pod): 96× 100GE ports per switch
- **Tenant Pod Layout**: 3 rows × 4 cabinets = 12 leaves/pod × 8 pods = 96 leaves (1,152 tenant-facing ports)
- **Underlay**: BGP Link-State (BGP-LS) for automatic SPINE discovery; IS-IS backup
- **Overlay**: [[VXLAN]] VNI 10000–10999 (1000 VNI tenant pool); [[EVPN]] Type 5 (RT2, RT3, RT5) for cross-pod routing

**VLAN Mapping to VNI:**
| VLAN Range | VNI Range | Tenant Scope | Purpose |
|------------|-----------|--------------|---------|
| 1001–1099 | 10001–10099 | Pod-1 (rows A–C) | Prod Web Tier |
| 1100–1199 | 10100–10199 | Pod-1 | Prod App Tier |
| 1200–1299 | 10200–10299 | Pod-1 | Prod DB Tier |
| 2001–2099 | 10001–10099 | Pod-2 (rows D–F) | Prod Web Tier |
| ... | ... | Pods 3–8 | Mirrored pattern |
| 9001–9100 | 19001–19100 | All Pods | Customer VPN Ingress |

**MAC Learning**: [[EVPN]] MAC route type 2 with sticky-MAC per tenant (no flooding); ARP suppression ([[EVPN]] ARP proxy) to reduce broadcast overhead.

### Out-of-Band Management Network

**Isolation**: Separate switch fabric (2× [[Cisco]] Nexus 3172T, 48× 10GE + 6× 40GE per switch)
- **IP Space**: 172.16.0.0/16
  - 172.16.1.0/24 — Spine management IP pool
  - 172.16.2.0/24 — Leaf management IP pool
  - 172.16.3.0/24 — Equipment (PDU, UPS, sensor) IP pool
  - 172.16.4.0/24 — Bastion host, jump servers
  - 172.16.5.0/24 — Reserved for future IPAM servers
- **Transport**: IPv6 primary (RFC 8945 BGPv6 UNNUMBERED), IPv4 fallback only
- **Access Control**: SSH-only, 22/tcp; RSA keys ≥4096-bit; Fail2Ban on bastion hosts
- **Logging**: Syslog to central collector (10.20.88.0/24) over TCP/601 (encrypted)
- **Device Discovery**: Netbox API (10.20.77.0/24) polls via SNMP v3 (auth: SHA256, priv: AES-256)

### Building Management System Network

**Segregation**: Dedicated switch fabric (2× Catalyst 9500H, 48× 1GE per switch)
- **IP Space**: 10.20.0.0/16 (same as DCIM but separate VRF via VRF-MGMT)
  - 10.20.100.0/24 — HVAC controllers ([[Schneider Electric]] EcoStruxure)
  - 10.20.101.0/24 — Power monitoring ([[Eaton]] ePDU, [[Vertiv]] InRow)
  - 10.20.102.0/24 — Fire/security sensors
  - 10.20.103.0/24 — Lighting control ([[Philips]] Hue Professional)
  - 10.20.104.0/24 — Water/cool-loop sensors
- **Protocols**:
  - **BACnet/IP**: Port 47808/udp for HVAC setpoint polling (15 min intervals)
  - **Modbus TCP**: Port 502/tcp for power meter modbus gateways
  - **SNMPv3**: Polling of UPS + PDU MIBs every 5 min
  - **syslog**: Local collection at 10.20.104.5 (Splunk Heavy Forwarder), 3-day retention
- **Isolation from IT**: VRF separation; no transit routes to 10.10.0.0/16; firewall rule DROP-DEFAULT for any BMS ↔ tenant traffic

---

## IP Addressing Scheme

### Production Tenant Pods (10.10.0.0/16)

**Subnet Allocation per Tenant:**
```
Tenant ACME-001:
  10.10.1.0/26  — Web tier (up to 62 IPs)
  10.10.1.64/26 — App tier
  10.10.1.128/26 — DB tier
  10.10.1.192/26 — Management + Reserve

Tenant ACME-002:
  10.10.2.0/26, 10.10.2.64/26, 10.10.2.128/26, 10.10.2.192/26
  (same pattern, different octet)

...64 tenants × 4 subnets = 256 /26 subnets, fitting within 10.10.0.0/16
```

**Gateway Addresses**: .1 (leaf switch VLAN interface); .2–.62 usable; .63 reserved (broadcast).  
**DHCP Scope**: Centralized ISC DHCP cluster (10.20.50.0/24) with per-tenant pools, 24h lease default.

### Internet-Facing Addresses

**TEST-NET-2 Placeholder** (per RFC 5737):
```
Edge NAT Pool (outbound): 192.0.2.0/25
  192.0.2.1–127 reserved for prod customer traffic
  Tenant firewall static NAT: 192.0.2.X:443 ↔ 10.10.Y.Z:443

Edge NAT Pool (inbound): 198.51.100.0/25
  Inbound tenant-subscribed IPs (e.g., SaaS access)
  Reverse NAT on [[Palo Alto Networks]] PA-5400 for port-forwarding
```

**BGP Export**: 192.0.2.0/25 and 198.51.100.0/25 announced to [[Bell Canada]]/[[Telus]]/Rogers with AS PATH: AS 65100 (ACME) prepended once for controlled failover.

---

## Routing & Protocol Details

### BGP Configuration Highlights

**Route Aggregation:**
```
aggregate-address 192.0.2.0 255.255.255.128 summary-only
aggregate-address 198.51.100.0 255.255.255.128 summary-only
  (prevents more-specific leaks; only /25 advertised)
```

**Local Pref Policy:**
- iBGP learned from Spine (Local-Pref 300) — preferred for leaf-to-leaf pod traffic
- [[Bell Canada]]/[[Telus]] eBGP (Local-Pref 300) — preferred egress
- Rogers eBGP (Local-Pref 250)
- Cogent/HE eBGP (Local-Pref 200) — fallback-only

**AS Path Manipulation:**
- Inbound: Accept AS path length ≤ 5 (prevent long-haul prepends)
- Outbound: Prepend AS 65100 once (ACME) for slower convergence if primary transit fails

### OSPF for OOB Network

- **Process ID**: 1 (ospf_mgmt)
- **Area 0**: 172.16.0.0/16 (backbone)
- **Cost Calculation**: 10 Gbps = cost 1; 1 Gbps = cost 10
- **Hello/Dead**: 10 sec / 40 sec (fast convergence for OOB failover)
- **Authentication**: MD5 (key ID 1, key "ACME-OOB-K1")

---

## Cross-References

- [[Ottawa DC Architecture]] (zone design, [[IEC 62443]] controls)
- [[Ottawa DC Equipment]] (switch models, firmware versions)
- [[Ottawa DC HAZOPS]] (network failure modes, BGP hijack scenarios)
- [[Ottawa DC Threat Profile]] ([[Salt Typhoon]], carrier compromise risk)

---

**Doc Version**: 1.0 | **Phase**: 1c | **Last Updated**: 2026-05-09
