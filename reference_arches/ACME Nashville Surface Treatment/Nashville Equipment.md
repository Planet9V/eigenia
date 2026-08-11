---
aliases:
  - Nashville Device Manifest
  - Nashville Equipment Inventory
type: facility-reference-model
category: surface-treatment
status: draft
domain: OT
tags:
  - domain/OT
  - facility/acme-nashville-surface-treatment
  - phase/1c
  - equipment/inventory
  - cve/mapping
related:
  - "[[ACME Nashville Surface Treatment]]"
  - "[[Nashville Architecture]]"
  - "[[Nashville Network]]"
  - "[[Nashville CVE Cross-Reference]]"
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional facility based on [[Aalberts Industries]] Nashville TN surface-treatment campus. Every device name, model number, firmware string, and network detail is traceable to actual products. Facility is demo construct; equipment stack and vulnerability profile reflect realistic OT environments in North America.

---

## Overview

Surface treatment OT stack: rectifiers (DC power for electroplating), tank monitoring (pH/conductivity/temp), [[PLC]]s (Purdue L0/L1), HMIs (L2), SCADA historians (L2/L3), Ethernet firewalls, Windows IoT endpoints. Every device matched to real CVE corpus via vendor/model/firmware.

---

## Purdue Level 0 (Field / Process Equipment)

### Rectifiers (DC Power)

| Vendor | Model | Firmware/OS | Role | Count | NIC Type | Notes |
|--------|-------|------------|------|-------|----------|-------|
| [[Munk Elektronik]] | SWR12/500-200 | 4.2.1 | Anodizing rectifier (500V, 200A) | 2 | None (hardwired) | Industrial DC PSU, no IP stack |
| [[Plating Electronics]] | PowerPlate PE-1000 | 2.8.4 | Electroless-nickel, PCB plating | 3 | Ethernet (isomodule) | Modular PSU w/ remote monitoring card |
| [[Dynapower]] Excitor | DXR-750-400 | 3.1.9 | General plating, switchable | 2 | None (hardwired) | Air-cooled, feedback loop to L1 PLC |

### Tank Monitoring (Process Analytics)

| Vendor | Model | Firmware/OS | Role | Count | NIC Type | Notes |
|--------|-------|------------|------|-------|----------|-------|
| Hach Lange | EXOmini | 2.4.6 | Multi-parameter analyzer (pH, ORP, temp) | 4 | Modbus TCP / Ethernet | Installed in anodizing/plating/rinse tanks |
| Rosemount | 3144P (with 3051S+) | 2.1.3 | Conductivity + pressure in acid tanks | 3 | 4–20mA (to L1 IO) + HART | Subsurface, transmitter only |
| [[Endress+Hauser]] | Promag 10D | 5.0.2 | Effluent flow rate monitor | 2 | PROFINET (to L1) | Wastewater recirculation |
| Markland Agitators | MA-500T controller | 1.8.7 | Tank agitation, thermal control | 5 | 24VDC pulse (L1 wired) | No IP; hardwired to PLC |

### Ventilation / Scrubbers

| Vendor | Model | Firmware/OS | Role | Count | NIC Type | Notes |
|--------|-------|------------|------|-------|----------|-------|
| Nederman Eclipse | ES-2000 | 3.2.1 | Mist collection + scrubber unit | 2 | Modbus RTU (via L1 serial) | Hood-mounted, fume extraction |
| ebm-papst | 8600 NRG | 1.4.0 | Motor speed controller (ventilation fan) | 2 | PWM from L1 PLC | No direct IP |

---

## Purdue Level 1 (Control / Automation)

### Primary PLCs

| Vendor | Model | Firmware | Role | Count | NIC Type | Network Notes |
|--------|-------|----------|------|-------|----------|----------------|
| [[Allen-Bradley]] | ControlLogix 1756-L83E | 33.011 | Anodizing zone master | 2 | EtherNet/IP (native) | Tag-based control, 200ms cycle |
| [[Siemens]] | SIMATIC S7-1500F CPU 1515F | 2.9.4 | Electroplating safety zone | 1 | PROFINET RT (IRT @ 2ms) | F-enabled for SIL 2 interlocks |
| [[Omron]] | NX1P2-2110DX1 | 1.4.2 | Rinse/recovery zone | 1 | EtherNet/IP + OMRON-CIP | Industrial PC form factor |

### Safety Controllers

| Vendor | Model | Firmware | Role | Count | NIC Type | Notes |
|--------|-------|----------|------|-------|----------|---------|
| [[Allen-Bradley]] | GuardLogix 1756-L8xS | 32.001 | Emergency stops + PSM interlocks | 1 | EtherNet/IP (safety frames) | OSHA PSM threshold monitoring |
| [[Siemens]] | F-CPU 1512SP | 1.8.9 | Electrolyte pump safety, circuit breaker logic | 1 | PROFINET (mapped safety DI/DO) | Rated SIL 3 for hazardous area control |

### I/O Modules

| Vendor | Model | Firmware | Mounted In | Count | Purpose |
|--------|-------|----------|-----------|-------|---------|
| [[Allen-Bradley]] | 1756-IB16D | N/A | ControlLogix chassis | 4 | Digital input from tank sensors, limit switches |
| [[Allen-Bradley]] | 1756-OB16 | N/A | ControlLogix chassis | 3 | Solenoid valve drivers, pump motor contactors |
| [[Siemens]] | DI 16x24 VDC HS | N/A | S7-1500 terminal module | 2 | High-speed pulse counting (flow meters) |
| [[Siemens]] | DO 16x24 VDC/2A | N/A | S7-1500 terminal module | 2 | Motor and heater logic |
| [[Beckhoff]] | EK1100 (EtherCAT coupler) | 2.3.1 | Remote I/O rack | 2 | Distributed I/O, 100ms cycle sync |

---

## Purdue Level 2 (SCADA / HMI / MES)

### HMI Workstations

| Vendor | Platform | OS | Firmware/Version | Role | Count | NIC | Notes |
|--------|----------|----|----|------|-------|-----|---------|
| Rockwell (AVEVA legacy) | FactoryTalk View SE | Windows IoT 2019 LTSC | 13.00 CU03 | Process HMI (anodizing ops) | 2 | GbE (static IP) | 1920×1200 touchscreen, 24/7 uptime |
| Wonderware (AVEVA) | InTouch 2020 R2 | Windows 10 LTSC | 2020 R2 MR (8.1.5203) | Plating zone operator interface | 1 | GbE (DHCP → fixed) | Citrix-hosted remote client in pilot |
| [[Siemens]] | WinCC Unified V19 (Runtime) | Windows 10 IoT Enterprise 21H2 | 19.0.20230615 | Effluent/recovery monitoring | 1 | GbE | Runs as service, no keyboard/mouse |

### SCADA / Historian Servers

| Vendor | Product | OS | Version | Role | Count | NIC | Notes |
|--------|---------|----|----|------|-------|-----|--------|
| Aveva (OSIsoft legacy) | PI Server 2018 | Windows Server 2016 | 2018 SP3 | Tag historian (10-second granularity) | 1 | GbE redundant (MPIO) | ~50K tags (devices + derived KPIs) |
| Rockwell | FactoryTalk SE (Archive/Backup) | Windows Server 2019 | 13.0 CU02 | Alarms + historical reports | 1 | GbE | Disk archive for 2-year retention |
| Ignition (Inductive Automation) | Ignition Gateway + Tag Historian | Linux CentOS 7 | 8.1.28 | Modern SCADA (modular, cloud-ready) | 1 | GbE | Primary platform for new deployments |

### Engineering Workstations

| Vendor | Software | OS | Version | Role | Count | NIC | Notes |
|--------|----------|----|----|------|-------|-----|--------|
| [[Siemens]] | TIA Portal (engineering) | Windows 10/11 Pro | 2022 v18.0 | S7 program development + simulation | 2 | GbE + USB (offline) | Dual-monitor setup, USB offline key |
| Rockwell | Studio 5000 | Windows 10/11 Pro | 35.00 | ControlLogix + CompactLogix development | 2 | GbE (isolated network during debug) | Offline: USB standalone license |

---

## Purdue Level 3 (Enterprise / MES)

### Manufacturing Execution System (MES)

| Vendor | Product | OS | Version | Role | Count | NIC | Notes |
|--------|---------|----|----|------|-------|-----|--------|
| Aveva | MES Insight | Windows Server 2022 | 2022.1 | Production scheduling, quality tracking | 1 | GbE (DMZ) | SAP integration via web service |
| Ignition | OPC-UA Bridge + Reporting | Linux (Docker) | 8.1.28 | Containerized MES, real-time dashboards | 1 | GbE (internal) | Pilot: Replacing legacy Aveva module |

### ERP Integration

| Vendor | Product | OS | Version | Role | Count | NIC | Notes |
|--------|---------|----|----|------|-------|-----|--------|
| [[SAP]] | SAP GUI / Fiori (browser) | Windows 10 + Chrome | Latest quarterly | Inventory, costing, shipping documents | 4 | GbE (corporate network) | Standard desktop client + mobile Fiori |

---

## Purdue Level 2.5 (Network / Firewall / Perimeter)

### Industrial Ethernet Switches

| Vendor | Model | Firmware | Role | Count | Ports | Notes |
|--------|-------|----------|------|-------|-------|---------|
| [[Cisco]] | Catalyst IE 3000-8U | IOS 15.2(6)E | L2 managed core, Anodizing zone | 1 | 8×GbE + 2×combo | Redundant ring w/ RAPID Spanning Tree |
| [[Cisco]] | Catalyst IE 4000-4GE | IOS 15.2(7)E | L2 managed edge, Plating zone | 2 | 4×GbE + 2×SFP uplink | PoE budget for wireless APs |
| [[Hirschmann]] | MS20-0800 (octopus) | v4.3.41 | Ring automation backup, Purdue L0/L1 | 1 | 8×GbE | Magnum-II (ring redundancy protocol) |
| Stratix 5700 (Rockwell) | Managed Ethernet | 21.08.00 | Legacy: EtherNet/IP gateway | 1 | 24×10/100 + 2×Gig | Still in production on second anodizing line |

### Industrial Firewalls

| Vendor | Model | Firmware | Role | Count | Throughput | Notes |
|--------|-------|----------|------|-------|-----------|---------|
| [[Fortinet]] | FortiGate 600D | v7.2.5 | Purdue L1/L2 boundary (Anodizing) | 1 | 4Gbps | Deep packet inspection, [[IEC 62443]] rules |
| [[Cisco]] | Catalyst 6500E (ACE module) | IOS XE 16.12.04 | Legacy L2/L3 boundary (failsafe mode) | 1 | 10Gbps | Retiring; replaced by Fortinet migration |
| [[Tofino]] (Fortinet subsidiary) | Tofino 5000 | 7.1.9 | L0/L1 microperimeter (tank monitoring) | 2 | 1Gbps | Purpose-built OT firewall, signature DB v2023.11 |

---

## Windows & Linux Endpoints

### Windows (IT Domain)

| Vendor | Type | OS | Version | Role | Count | NIC | Notes |
|--------|------|----|----|------|-------|-----|---------|
| Dell | Optiplex 7090 | Windows 10 Pro | 22H2 | Finance, HR, admin staff | 8 | GbE | Corporate domain (corp.acme.local) |
| HP | Elitedesk 800 G6 | Windows 11 Pro | 23H2 | New workstations (rolling upgrade) | 4 | GbE + WiFi 6E | BYOD policy exempt; encrypted drives |

### Linux Servers (Container / Cloud)

| Vendor | Distro | Kernel | Version | Role | Count | NIC | Notes |
|--------|---------|--------|---------|------|-------|-----|----------|
| Ubuntu | Ubuntu Server | 5.15 LTS | 20.04 LTS | Docker host (MES microservices) | 2 | GbE bonded | Kubernetes pilot planned for 2026 Q3 |
| CentOS | CentOS 7 | 3.10 | 7.9 (EOL 2024) | Ignition Gateway (historical) | 1 | GbE | Migrate to Rocky Linux 9 by EOL |

---

## Firmware Update Cadence & CVE Risk

| Category | Last Updated | Update Frequency | CVE Risk | Management Approach |
|----------|---------|---|---------|----------|
| **Rectifiers** | 2024-Q3 | Annual (summer) | Low (isolated, no network) | Physical audit + manual release notes |
| **Tank Sensors** | 2024-Q2 | As-needed (if drift detected) | Low (sensor → L1 only, no internet) | Calibration cert; firmware upgrades offline |
| **PLCs** | 2023-Q4 (L83E) / 2024-Q1 (S7-1500) | Quarterly (test in parallel system) | **High** (core control) | Change control board review, rollback plan |
| **Safety Controllers** | 2023-Q1 | Annual (functional safety audit) | **High** (SIL 2/3) | Certified integrator + re-validation testing |
| **HMI Platforms** | 2024-Q3 (FactoryTalk) / 2024-Q1 (Ignition) | Quarterly security patches | High | Patch Tuesday staging environment |
| **Network Equipment** | 2024-Q2 (Cisco) / 2024-Q4 (Fortinet) | Quarterly security patches | High | Maintenance windows (Saturday 02:00-04:00 CST) |
| **Engineering WS** | 2024-Q4 (TIA v18) / 2024-Q3 (Studio 5000 v35) | As-needed (development versions) | Medium | Offline development; production imports gated |

---

## Cross-references

- [[ACME Ottawa Data Center]]
- [[ACME Ottawa Substation]]
- [[ACME Ottawa Civic Hospital]]
- [[ACME Ottawa Pediatric Medical Center]]

## See also

- [[Nashville Architecture]] — equipment placement and zone assignment
- [[Nashville Network]] — network connectivity and protocols
- [[Nashville CVE Cross-Reference]] — vulnerability mapping for each device
- [[IEC 62443]] — security requirements per equipment role
