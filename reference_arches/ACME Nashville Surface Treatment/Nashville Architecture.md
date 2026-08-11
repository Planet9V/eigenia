---
aliases:
  - Nashville Facility Architecture
  - Nashville Purdue Model
type: facility-reference-model
category: surface-treatment
status: draft
domain: OT
tags:
  - domain/OT
  - facility/acme-nashville-surface-treatment
  - phase/1c
  - architecture/purdue-model
  - security/iec-62443
related:
  - "[[ACME Nashville Surface Treatment]]"
  - "[[Nashville Network]]"
  - "[[Nashville Equipment]]"
  - "[[IEC 62443]]"
  - "[[Purdue Model]]"
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. This architecture is modeled on [[Aalberts Industries]]' Nashville, TN surface treatment operations (anodizing, electroless nickel, plating, specialty coatings); Aalberts itself is not affiliated with this demo.

---

## Facility Identity & Mission

**Facility**: ACME Nashville Surface Treatment Plant  
**Location**: Nashville, TN (36.2091°N, 86.7474°W)  
**Sector**: Metal Finishing & Surface Coating  
**Primary Processes**: Anodizing, electroless nickel plating, hard-coat anodizing, specialized corrosion-resistant coatings  
**Throughput**: ~500 tons/month of finished aerospace and industrial components  
**Regulatory Scope**: EPA Clean Water Act, OSHA PSM, NFPA 70, [[IEC 61508]] (SIL 2 on safety interlocks)

The facility treats high-value aerospace components (landing gear fasteners, avionics brackets, structural aluminum) and industrial equipment. Process control is mission-critical: tank chemistry (pH, concentration, temperature) must stay within ±0.1°C and ±2% concentration to maintain coating thickness and adhesion specifications.

---

## Purdue Reference Model — Functional Mapping

| Level | Function | Examples (Surface Treatment Context) | SL-T |
|-------|----------|-------|-------|
| **L0** | Physical Process | Anodizing tanks (rectifier output → tank chemistry), plating baths, rinse stages, compressed air dryers, cooling loops | 3 |
| **L1** | Basic Control | PLC racks ([[Siemens]] S7-1200 in rectifier room), motor drives, valve positioners, temperature/pH sensors → local control loops | 3 |
| **L2** | Supervisory Control | SCADA (Wonderware ArchestrA on engineering workstations), recipe management, batch scheduling, alarm aggregation | 3 |
| **L3** | Operations & Planning | Manufacturing Execution System (MES), production scheduling, quality tracking, first-pass yield dashboards | 3 |
| **L4** | Enterprise Integration | ERP (SAP, shared with corporate), order management, inventory, financial reporting, supply chain | 1 |
| **L5** | Enterprise Business | Corporate office network, email, web presence, investor relations | 1 |

---

## IEC 62443 Security Levels — Zone Architecture

### Zone Roster

| Zone ID | Name | Function | SL-Target | Key Assets | Conduits |
|---------|------|----------|-----------|-----------|----------|
| **Z-PRO** | Process Control | Tank/bath chemistry, rectifiers, motor control | SL-T 3 | PLCs, VFDs, I/O modules, sensors | IEC-MOD, hardwired interlock |
| **Z-SAF** | Safety | Emergency stops, interlocks, safety PLCs | SL-T 3 | Safety relays, E-stop circuit, solenoid valves | Hardwired only (no IP) |
| **Z-MON** | Monitoring | SCADA servers, engineering workstations, historian | SL-T 2 | Wonderware ArchestrA, OSI PI, HMIs | IEC-MOD, Ethernet (airgapped) |
| **Z-ENG** | Engineering Access | Remote diagnostics, firmware updates, commissioning | SL-T 3 | Laptop + Siemens S7 engineering tools, VPN gateway | Serial (USB→Ethernet adapter, SNMPv3) |
| **Z-DMZ** | Corporate Gateway | IT/OT firewall, VPN termination, data historian export | SL-T 2 | Firewall (pfSense), historian relay, syslog aggregator | Routed DMZ ↔ Monitoring, DMZ ↔ Corp |
| **Z-CORP** | Corporate IT | Email, ERP, office workstations, internet | SL-T 1 | Office switches, servers, WiFi AP | NAT'd, standard IT (no direct OT access) |

---

## Site Topology — Physical & Functional Layout

### Rectifier Room (Z-PRO, SL-T 3)
Three 48V/500A DC power supplies (plating tank anodes) + 12V/100A supplies (safety solenoid valves). S7-1200 PLC monitors rectifier output voltage/current per tank. Hardwired voltage comparators trigger local alarm bells if tank current exceeds setpoint.

### Anodizing Line (L0–L1, Z-PRO + Z-SAF)
Six parallel tanks (sulfuric anodize, chromic anodize, hard-coat anodize, desmut, final rinse, deionized water). Each tank has:
- PT100 RTD temperature sensor → S7-1200 analog input (4–20 mA loop) → PID loop on immersion heater
- pH electrode + transmitter → analog input
- Tank level float switch → hardwired to E-stop circuit
- Agitation motor (3 HP) → [[VFD]] controlled by SCADA, with thermal overload relay

### Electroless Nickel Line (L0–L1)
Two heated tanks + catalytic bath pretreatment. Temperature setpoint: 185–195°F ±2°F. Coolant circulation pump with bypass loop; temperature deviation > 3°F triggers batch rejection alarm.

### SCADA / Operations Room (Z-MON, SL-T 2)
Two Wonderware ArchestrA servers (primary + hot standby) running 15-min batch recipe cycles. Three HMI operator stations display:
- Real-time tank temps, pH, current levels
- Batch progress (rinse → anodize → post-rinse → final check)
- First-pass yield % per shift
- Alarm log (last 500 events)

Historian database ([[OSI PI]]) logs all sensor readings at 1-sec granularity; 90-day rolling window on local SSD.

### Manufacturing Execution System (Z-MON, SL-T 2)
Infor CloudSuite MES instance (hosted on-premise, separate VLAN from SCADA). Pulls batch completion events from Wonderware via secure API. Generates first-pass yield dashboards, tracks scrap reason codes, computes [[IEC 62443]] compliance reporting (SL-A per FR1–FR7).

### Site Gateway & DMZ (L4)
**pfSense Firewall** (Z-DMZ, SL-T 2): Single-arm configuration; egress rules allow Z-MON historian → Z-CORP (syslog, email alerts). Ingress from Z-CORP: order/scheduling API calls to MES. No direct PLC access from corporate network.

**Data Historian Relay** (Z-DMZ, SL-T 2): Reads 15-min aggregated process data from Z-MON, writes to corporate data lake (S3) for BI dashboards. TLS 1.2 encryption in transit; at-rest encryption via KMS.

### Corporate Office (L5)
**Shared Services** (Z-CORP, SL-T 1): Standard IT: office WiFi (WPA3), email (Microsoft 365), web browsers. [[ERP]] (SAP) instance reaches Nashville facility via VPN tunnel through pfSense. Plant scheduling team accesses MES via web portal (LDAP + SAML). No direct access to SCADA or PLCs.

---

## Key Design Invariants

1. **Hardwired Safety**: E-stop circuit is purely hardwired; no software dependency.
2. **Airgapped Monitoring**: Z-MON (SCADA) is isolated from Z-CORP via DMZ; no direct routing.
3. **Encryption by Layer**: [[IEC 60870-5-104]] uses TLS 1.2 (RFC 5246); [[SNMPv3]] uses AES-128; historian uses HTTPS.
4. **SL-T Compliance**: Process control (Z-PRO, Z-SAF) targets SL-T 3 per [[IEC 62443-3-3]]; monitoring (Z-MON) is SL-T 2; corporate (Z-CORP) is SL-T 1.
5. **Data Retention**: SCADA historian retains 90 days locally; older data pushed to corporate data lake via Z-DMZ relay.
6. **Vendor Lockout**: Wonderware and [[Siemens]] firmware updates require physical USB key from sealed engineering laptop; no remote patch deployment.

---

## Cross-references

- [[ACME Ottawa Data Center]]
- [[ACME Ottawa Substation]]
- [[ACME Ottawa Civic Hospital]]
- [[ACME Ottawa Pediatric Medical Center]]

## See also

- [[Nashville Network]] — network segmentation and protocols
- [[Nashville Equipment]] — device inventory and CVE mapping
- [[Nashville HAZOPS]] — safety and reliability analysis
- [[Purdue Model]] — ISA-95 reference architecture
- [[IEC 62443]] — industrial control systems security
