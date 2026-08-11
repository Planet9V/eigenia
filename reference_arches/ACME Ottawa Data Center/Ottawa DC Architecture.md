---
aliases: [ACME Purdue Model, ACME IEC 62443 Zones]
type: facility-reference-model
category: data-center
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-datacenter, phase/1c, sector/colocation, architecture, zone-design, iec-62443]
related: ["[[ACME Ottawa Data Center]]", "[[Ottawa DC Network]]", "[[Ottawa DC Equipment]]", "[[Purdue Model]]", "[[IEC 62443]]"]
created: 2026-05-09
updated: 2026-05-09
---

# Ottawa DC Architecture

> **Demo overlay**: ACME is a fictional demo customer. This reference model is built from public-source research on federal-tenant colocation patterns (Shared Services Canada Enterprise Data Centre, Cologix Ottawa, Q9 Networks, Bell Data Centers). No specific real federal facility is impersonated.

## Identity & Mission

**Name**: ACME Ottawa Data Center (fictional demo)  
**Location**: Downtown Ottawa, Ontario (45.4112°N, 75.6799°W)  
**Tenant Model**: Federal Crown + commercial mix (Crown corps + financial/telecom tenants)  
**Primary Use Case**: Shared government IT infrastructure + private sector cloud-hosting  
**Demo Note**: This facility overlays ACME's fictional presence; real-world analogues are [[Shared Services Canada]] EDCs and Cologix Ottawa facilities.

---

## Tier III Classification

| Attribute | [[Uptime Institute Tier III]] |
|-----------|------------------------|
| **Standard** | [[TIA-942]] (Uptime Tier 3), EN 50600 Class 3 |
| **Availability** | 99.982% (≤1.6 hrs downtime/year) |
| **Fault Tolerance** | N+1 power, 2N cooling, concurrently maintainable |
| **Power Continuity** | ≥72 hrs on generators alone |
| **Concurrent Maintenance** | All capacity components replaceable without shutdown |

**[[TIA-942]] Compliance**: Redundant active power and cooling distribution paths; concurrently maintainable design ensures production continuity during planned maintenance (key federal requirement).

**EN 50600 Reference**: Availability Class 3 for power supply + environmental control + cabling ensures coordinated redundancy across all infrastructure layers.

---

## [[Purdue Model]] Adaptation for Data Center

**Context**: [[Purdue Model]]'s L0–L5 hierarchy was designed for manufacturing/[[SCADA]]; adapting it for a Tier III DC adds mechanical/electrical dominance at L0.

| Level | Function | Key Systems | Zones ([[IEC 62443]]) |
|-------|----------|-------------|-------------------|
| **L0** | Mechanical/Electrical Infrastructure | 25 kV utility feed, 2N transformer, dual UPS, generator yard, chiller plant, VFD blowers | Power & Cooling (SL-T 3) |
| **L1** | DCIM / BMS Controllers | Environmental sensors, power distribution units (PDUs), monitoring microservices | BMS/DCIM (SL-T 2) |
| **L2** | DC Operations Management | On-site SOC, capacity planning, incident response | DC Mgmt (SL-T 2) |
| **L3** | Tenant Operations | Tenant-managed VMs, apps, services (ACME scope) | Tenant Networks (SL-T 1–3 by tenant) |
| **L3.5** | Internet / MPLS Boundary | Edge firewalls, DDoS mitigation, WAN aggregation | Tenant DMZ (SL-T 3) |

**Design Rationale**: L0 hosts the "physics" that keeps the facility alive; L1–L2 are DC operations; L3 is tenant workload domain; L3.5 is the trust boundary to the untrusted internet.

---

## [[IEC 62443]] Zone Architecture

### Zone Inventory & Security Levels

| Zone | Purpose | SL-Target | Isolation | Conduit Ingress |
|------|---------|-----------|-----------|-----------------|
| **Power & Cooling** | Generator, UPS, CRAC units, PDUs, transfer switches | SL-T 3 | Physical: caged, camera-monitored | L0→L1 sensors only |
| **BMS/DCIM** | Environmental telemetry, capacity dashboards | SL-T 2 | Network segmented; read-only from L3 | HTTPS + mTLS from L2 ops; L1 data aggregation |
| **Tenant Cages** | Physical cage + network access per tenant | SL-T variable (1–3) | Cage locks, VLAN isolation, firewall rules | L2 management; L3.5 WAN per tenant SLA |
| **Network Core** | Spine/leaf switches, core routers, interconnects | SL-T 3 | Secure room, administrative access control | Layer 3 from BMS; Layer 2 within tenant VLANs |
| **Tenant DMZ** | Firewalls, IDS/IPS, proxy, cloud VPN endpoints | SL-T 3 | Demarcation point; dual-firewall sandwich | WAN ↔ L3 tenant networks |

### Conduit Mapping (Zone-to-Zone Communication)

| From | To | Protocol | Purpose | Authentication |
|-----|----|---------|---------|----|
| Power & Cooling | BMS/DCIM | SNMP, Modbus TCP | Temperature, humidity, power readings | mTLS (field certs) |
| BMS/DCIM | Tenant Cages | HTTPS (read-only API) | Capacity visibility, SLA metrics | Bearer token + IP allowlist |
| Tenant Cages | Network Core | BGP, OSPF (for redundancy) | Routing; inter-tenant isolation via VRF | Route signing (RPKI where available) |
| Network Core | Tenant DMZ | Layer 2/3 transit | Tenant internet egress | Firewall rules; SLA-based QoS |
| Tenant DMZ | Internet/MPLS | BGP, IPsec tunnels | WAN connectivity for remote tenants | Mutual TLS; geofence enforcement |

---

## Physical Floor Plan & Infrastructure

### Power Supply (25 kV → 120/208V)
- **Utility Feed**: Dual 25 kV feeds from Ottawa Hydro (independent substations)
- **Primary Transformer**: 2 MVA, 25 kV → 480V (pole-mounted near dock)
- **Secondary Transformer**: 480V → 120/208V distribution (in-room)
- **UPS System**: 800 kW, dual 10-minute handoff, battery bay (2 hr hold on >50% load)
- **Generator Yard**: Two 1 MW diesel generators (1 active + 1 standby) with 48-hr fuel reserve
- **Transfer Switches**: Automatic static switches (ATS) for seamless utility→UPS→generator failover

### Cooling Architecture
- **Raised Floor**: 24-inch plenum for hot/cold aisle containment
- **CRAC Units**: Six 150 kW units with variable-speed compressors (load-responsive)
- **Chiller Plant**: 500 kW capacity, 2N redundancy (either chiller can cool 100% of facility)
- **Water Loop**: Pressurized glycol-water with dual circulation pumps (N+1 redundancy)
- **Thermal Zones**: Hot aisle (target 32°C), cold aisle (16–18°C), containment dams

### Network Topology
- **Core Switches**: Two high-speed (100 Gbps) spine switches (active-active); LACP aggregation
- **Access Switches**: Per-cage 10 Gbps ToR (Top-of-Rack) switches; L3-terminated VLANs
- **Cross-Connect Rooms**: Two independent fiber paths (diverse carriers):
  - Path 1: [[Bell Canada]] MPLS + public internet
  - Path 2: Cogent/Zito national fiber backbone
- **Dual-Path Network**: BGP multi-path; automatic failover within 100 ms

### Facility Layout Zones
1. **Dock & Intake** (L0): Generator fuel delivery, UPS battery replacement
2. **Generator Yard** (L0): Two 1 MW units + transfer switches + fuel tank
3. **Transformer Room** (L0): Primary/secondary transformers, UPS rectifier
4. **Main Distribution Panel** (L1): PDU circuits, monitoring, cabinet feeders
5. **Chiller Plant** (L0): Two chillers, circulation pumps, expansion tanks
6. **Raised-Floor Data Floor** (L3): 25 cage bays × 48 RU each; hot/cold aisle separation
7. **Cross-Connect Room** (L3.5): Incoming fiber terminations, firewall appliances, edge routers
8. **DC Operations Center** (L2): Monitoring workstations, SOC staff area

---

## Tenant Model

### Crown Tenant ([[ITSG-33]] Compliant)
- **Scope**: Federal workloads requiring Canadian data residency + [[ITSG-33]] Annex 4 compliance
- **Cage Count**: 3 cages (18 RU each), dedicated UPS circuit, fiber path #1 ([[Bell Canada]] MPLS)
- **Security**: [[IEC 62443]] SL-T 3 for network; physical badge access + audit logs
- **Isolation**: Dedicated VLAN + firewall rules; no tenant-to-tenant routing
- **Data Governance**: Encrypted storage-at-rest (AES-256); encrypted transit (TLS 1.3)

### Commercial Tenants (Financial, Telecom)
- **Scope**: Cloud hosting, NaaS, SaaS infrastructure
- **Cage Count**: Up to 22 cages (variable RU); shared UPS, either fiber path
- **Security**: [[IEC 62443]] SL-T 1–2 (negotiable per SLA); IP-based access control
- **Isolation**: L3 firewall rules; tenant-managed VPNs for remote staff
- **Billing**: Metered power ($/kWh) + bandwidth ($/Gbps) + physical space ($/RU)

---

## Redundancy & Resilience

- **Concurrent Maintenance Windows**: Any single UPS, CRAC, or chiller can be removed/serviced without impacting operations
- **Generator Capacity**: 2 MW total (>100% of peak load); N+1 means 1 generator failure = no outage
- **Network**: Dual-path active-active routing; BGP convergence <5 seconds on failure
- **Power Conditioning**: Harmonic distortion <5%; voltage regulation ±2% (critical for sensitive equipment)

---

## [[IEC 62443]] Security Requirements Matrix

| Functional Requirement (FR) | Implementation | Zone(s) |
|-----|---|---|
| **FR1: Device Access Control** | Physical: cage locks, badge readers; Logical: RBAC per tenant | All |
| **FR2: Software Integrity** | Firmware signing on DCIM controllers; update via signed channels | BMS/DCIM |
| **FR3: Information Confidentiality** | TLS 1.3 for all conduit traffic; AES-256 at rest | Network Core, Tenant DMZ |
| **FR4: Information Integrity** | HMAC-SHA256 on sensor data streams; signed certificates | Power & Cooling, BMS/DCIM |
| **FR5: Restricted Data Flow** | VRF isolation per tenant; firewall ACLs block cross-tenant routing | Network Core, Tenant Cages |
| **FR6: Timely Response to Events** | IDS/IPS rules tuned for OT anomalies (unusual power draw, temp spikes) | Tenant DMZ, Network Core |
| **FR7: Resource Availability** | N+1 UPS, 2N chillers, dual network paths; 99.982% uptime SLA | L0–L3.5 |

---

## Key Design Invariants

1. **No Single Point of Failure**: Every critical system (power, cooling, network, access) has redundancy
2. **Concurrently Maintainable**: Can replace any component without production downtime
3. **Zone-Based Security**: Each [[IEC 62443]] zone has explicit ingress/egress conduits; no undefined trust
4. **Tenant Isolation**: VLAN + firewall at L3; no shared L2 broadcast domains between tenants
5. **Monitoring-First Philosophy**: Every L0–L2 system reports health metrics to SOC; alerts trigger <1 min from anomaly
6. **Graceful Degradation**: Loss of any single UPS/CRAC/chiller reduces capacity but maintains continuity

---

## References

- [TIA-942 Data Center Standards: Tier Levels and Implementation](https://eureka.patsnap.com/article/tia-942-data-center-standards-tier-levels-and-implementation)
- [EN 50600 — European standard for data centers | TÜV NORD](https://www.tuev-nord.de/en/services/auditing-and-certification/en-50600/)
- [Uptime Institute Tier Classification System](https://uptimeinstitute.com/tiers)

---

**Doc Version**: 1.0 | **Phase**: 1c | **Last Updated**: 2026-05-09
