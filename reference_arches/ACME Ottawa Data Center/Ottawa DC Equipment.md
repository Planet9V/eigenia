---
aliases: [ACME Equipment Catalog, ACME Vendor List]
type: facility-reference-model
category: data-center
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-datacenter, phase/1c, equipment, cve-cross-reference, vendors]
related: ["[[ACME Ottawa Data Center]]", "[[Ottawa DC CVE Cross-Reference]]"]
created: 2026-05-09
updated: 2026-05-09
---

# Ottawa DC Equipment

> **Demo overlay**: ACME is a fictional demo customer. This catalog represents a fictional federal-tenant colo facility with real vendors, models, and firmware versions chosen for [[CVE]] cross-reference and realistic supply-chain risk simulation. All customer-specific operational data is illustrative.

## Power Distribution Zone

| Vendor | Model | Firmware/OS | Role | Count |
|--------|-------|------------|------|-------|
| [[Vertiv]] | Liebert EXL S1 1100 kVA | 2.6.4 | Primary UPS | 1 |
| [[Schneider Electric]] | Galaxy VX 1500 kVA | 7.2.1 | Redundant UPS | 1 |
| [[Caterpillar]] | 3516 Diesel Generator | PowerCommand 3.3.2 | Backup Gen 1 | 1 |
| [[Cummins]] | QSK60 Diesel Generator | QSK PowerCommand 4.1.0 | Backup Gen 2 | 1 |
| [[ASCO]] | 7000 Series ATS | 6.4.2 | Auto Transfer Switch | 2 |
| [[APC]] | AP9630 / AP9631 NMC2 | AOS 6.9.8 | PDU Network Card (Primary) | 4 |
| [[APC]] | AP9635 | AOS 6.9.8 | PDU Network Card (Secondary) | 4 |
| [[Eaton]] | ePDU | 2.5.1 | Metered PDU (Backup) | 2 |

---

## Cooling Zone

| Vendor | Model | Firmware/OS | Role | Count |
|--------|-------|------------|------|-------|
| [[Trane]] | CenTraVac CVHE 1500-ton | 8.2.0 | Primary Chiller | 1 |
| [[York]] | YK 2000-ton | 5.1.3 | Backup Chiller | 1 |
| [[Vertiv]] | Liebert DSE 100 | 2.8.1 | CRAH Unit (Primary) | 4 |
| [[Schneider Electric]] | InRow RC | 3.4.0 | Precision Air Handler | 3 |
| [[Vertiv]] | Liebert VLD | 1.9.2 | Leak Detection System | 8 |
| Nilan | EC160-E | 2.0.1 | Economizer (Backup) | 1 |

---

## Compute Zone

| Vendor | Model | Firmware/OS | Role | Count |
|--------|-------|------------|------|-------|
| [[Cisco]] | UCS B480 M5 Blade | UCSM 4.1(1a) | Blade Server Chassis | 2 |
| [[Cisco]] | UCS C220 M5 Rackmount | UCSM 4.1(1a) | General Compute | 6 |
| [[Cisco]] | UCS C240 M6 Rackmount | UCSM 4.2(2a) | Memory-Heavy Workload | 4 |
| [[HPE]] | ProLiant DL380 Gen10 | iLO5 2.73 (latest) | Database Server | 3 |
| [[HPE]] | ProLiant DL360 Gen11 | iLO6 2.82 | Cache Tier | 4 |
| [[Dell]] | PowerEdge R740 | iDRAC9 6.10.00.00 | Archive/Batch | 2 |
| [[Dell]] | PowerEdge R750 | iDRAC9 6.51.00.00 | High-Performance Apps | 3 |

---

## Storage Zone

| Vendor | Model | Firmware/OS | Role | Count |
|--------|-------|------------|------|-------|
| Pure Storage | FlashArray //X90 | Purity 6.4.2 | NVMe Primary | 1 |
| NetApp | AFF A800 | ONTAP 9.13.1 | NAS / Backup | 1 |
| [[Dell]] | PowerStore 500F | 2.1.0.0 | Block Storage (Redundant) | 1 |
| IBM | Spectrum Virtualize | 8.5.2.0 | Storage Virtualization Layer | 2 (logical) |

---

## Hyperconverged Infrastructure

| Vendor | Model | Firmware/OS | Role | Count |
|--------|-------|------------|------|-------|
| Nutanix | HX6620 | AHV 5.20.5 | Hyperconverged Node | 4 |
| [[VMware]] | vSAN | ESXi 8.0 U2 (7.0 U3 legacy nodes) | Distributed Storage | 4 clusters |

---

## Network Zone

### Spine / Core

| Vendor | Model | Firmware/OS | Role | Count |
|--------|-------|------------|------|-------|
| [[Cisco]] | Nexus 9508 | NX-OS 10.2(4) | Spine Switch (Clos) | 2 |
| Arista | 7280R3 | EOS 4.30.1F | Backup Spine | 1 |

### Distribution

| Vendor | Model | Firmware/OS | Role | Count |
|--------|-------|------------|------|-------|
| [[Juniper]] | QFX5120 | Junos 22.4R1 | Leaf / Distribution (Pod A) | 2 |
| [[Cisco]] | Nexus 9336C-FX2 | NX-OS 10.1(3) | Leaf / Distribution (Pod B) | 2 |

### Edge / Access

| Vendor | Model | Firmware/OS | Role | Count |
|--------|-------|------------|------|-------|
| [[Cisco]] | Nexus 3232D | NX-OS 9.3(5) | Access Switch (Per-Zone) | 8 |
| Arista | 7050SX3 | EOS 4.28.2F | Backup Access (Standby) | 2 |

### Gateway / Border

| Vendor | Model | Firmware/OS | Role | Count |
|--------|-------|------------|------|-------|
| [[Cisco]] | ASR 9000 (9010) | IOS XR 7.10.2 | Provider Edge Router | 2 |

---

## Security Zone

| Vendor | Model | Firmware/OS | Role | Count |
|--------|-------|------------|------|-------|
| [[Palo Alto Networks]] | PA-5450 | PAN-OS 11.0.1 | Next-Gen Firewall (Primary) | 1 |
| [[Fortinet]] | FortiGate 7081F | FortiOS 7.4.1 | Next-Gen Firewall (Redundant) | 1 |
| [[Cisco]] | ASA 5525-X | ASA 9.18.3 | Legacy Stateful Firewall | 1 |
| [[Cisco]] | Firepower 4140 | FTD 7.3.0 | Intrusion Prevention | 2 |
| [[Fortinet]] | FortiAnalyzer 600F | 7.4.0 | Security Logging / SIEM | 1 |

---

## Hypervisor / Management Zone

| Vendor | Model | Firmware/OS | Role | Count |
|--------|-------|------------|------|-------|
| [[VMware]] | vSphere | 8.0 U2 | Hypervisor (Core Nodes) | 8 |
| [[VMware]] | vSphere | 7.0 U3 (Legacy) | Hypervisor (Legacy Nodes) | 4 |
| [[Cisco]] | Intersight | (Cloud SaaS) | Infrastructure Management | — |
| [[HPE]] | OneView | 7.6.0 | OneView Composer | 1 |
| [[Dell]] | OpenManage Enterprise | 3.15.0 | Dell iDRAC Aggregation | 1 |

---

## Data Center Infrastructure Management (DCIM)

| Vendor | Model | Firmware/OS | Role | Count |
|--------|-------|------------|------|-------|
| [[Schneider Electric]] | EcoStruxure IT Expert | 2024.1 | DCIM Onsite + Cloud | 1 (Appliance) |
| Sunbird | DCIM | 9.5.2 | Capacity Planning (Backup) | 1 (Appliance) |
| Modius | OpenData IQ | 2.8.1 | Real Estate Analytics | — |

---

## Building Management System (BMS)

| Vendor | Model | Firmware/OS | Role | Count |
|--------|-------|------------|------|-------|
| [[Honeywell]] | JACE-8000 | Niagara Framework 4.13.11 | BMS Controller (Primary) | 1 |
| [[Schneider Electric]] | Andover Continuum | 7.4.0 | Alarms & Alerting | 1 |
| Contemporary Controls | BACnet/IP Router | 3.2.1 | BACnet Gateway (for legacy HVAC) | 2 |

---

## Endpoint & Identity Management

| Vendor | Service | Version | Role | Count |
|--------|---------|---------|------|-------|
| [[Microsoft]] | Active Directory | Windows Server 2022 | On-Premises Identity | 2 (Domain Controllers) |
| [[Microsoft]] | Entra ID | Cloud SaaS | Hybrid Identity (Cloud) | — |
| Tanium | Tanium Core Platform | 7.4.43 | Endpoint Management / Patch | — |
| CrowdStrike | Falcon Sensor | 7.14.0 | EDR / Endpoint Protection | 150+ (Managed hosts) |

---

## Top CVE Risk Anchors

1. **[[APC]] AP9630/AP9631 NMC2 firmware AOS 6.x** — Internet-reachable if misconfigured. Enables lateral movement from DCIM breach to power distribution.
2. **[[Cisco]] UCS UCSM 4.x, [[Cisco]] Firepower FTD 7.x** — Multiple CVEs. Both sit on critical attack path.
3. **[[VMware]] vSAN 7.0 U3 + ESXi 7.0 U3** — Legacy nodes retain multiple CVEs; newer U2 nodes hardened. Hyperconverged strategy = containment risk.

See [[Ottawa DC CVE Cross-Reference]] for full mapping.

---

**Doc Version**: 1.0 | **Phase**: 1c | **Last Updated**: 2026-05-09
