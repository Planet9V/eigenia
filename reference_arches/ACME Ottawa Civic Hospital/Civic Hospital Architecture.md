---
aliases: [ACME Architecture, Hospital Architecture, Civic Architecture]
type: facility-reference-model
category: acute-care-hospital
status: draft
domain: OT
tags: [domain/OT, domain/IoMT, facility/acme-ottawa-civic-hospital, phase/1c, sector/healthcare, architecture/purdue-model, architecture/iec-62443]
related: ["[[ACME Ottawa Civic Hospital]]", "[[Civic Hospital Network]]", "[[Civic Hospital HAZOPS]]", "[[IEC 62443]]", "[[IEC 80001]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Civic Hospital Architecture

## IEC 80001 Healthcare IoMT Layered Model

[[IEC 80001]] structures healthcare networks into distinct layers, each with unique device populations, communication patterns, and risk profiles.

### Layer 0: Patient Medical Devices (~470 assets)

| Device Class | Examples | Qty | Risk Profile |
|---|---|---|---|
| Bedside monitors | [[Philips IntelliVue]], [[GE Carescape]] | ~150 | Continuous vitals (HR, BP, SpO2, ECG) |
| Infusion pumps | [[Baxter Sigma Spectrum]], [[Medtronic]] | ~180 | Drug delivery, patient safety critical |
| Ventilators | [[Philips]], [[Vyaire]] | ~60 | Airway management, ICU dependent |
| Defibrillators | [[Philips]], Zoll | ~40 | Cardiac rhythm management |
| Dialysis machines | [[Baxter]], Fresenius | ~25 | Renal replacement therapy |
| Anesthesia workstations | [[GE Aisys]], [[Philips]] | ~15 | OR critical |

**Connectivity**: Isolated, unidirectional flow to L1 aggregator (no bidirectional command).  
**Protocols**: Medical Device Profile (MDP) over proprietary serial or isolated Ethernet.

### Layer 1: Patient Room / OR / ICU Clinical Environment

Aggregation of bedside devices into clinical zones (bedside, OR, ICU corner).

| Zone Type | Qty | Composition | Risk Profile |
|---|---|---|---|
| ICU Bedside zones | 40 | Monitors + pumps + vent + isolated BMS thermostat | Life-safety dependent |
| OR suites | 8 | Anesthesia + surgical lights + BMS + integrated imaging | Sterile, synchronized |
| ED trauma bays | 12 | Monitors + pumps + mobile imaging | High throughput |
| Cardiac care zones | 6 | Monitors + ECMO + diagnostic + ICU-grade BMS | Advanced support |

**Subnet**: L1 Aggregation 192.168.11.0/24  
**Conduit**: Isolated cables from bedside → aggregator switch (no external routing).

### Layer 2: Clinical IT (200+ workstations)

Workstations, PACS, EHR viewers, lab systems — human clinicians interacting with digital patient records.

| System | Qty | Purpose | Risk Profile |
|---|---|---|---|
| EHR workstations | ~200 | [[Epic Hyperspace]] charting | Confidential PHI |
| PACS viewer stations | ~30 | Radiology, cardiology imaging | High-value imaging data |
| Lab interfaces | ~15 | LIS (Laboratory Information System) | Critical lab results |
| Telehealth workstations | ~10 | Remote consultation suites | [[HIPAA]] encrypted streams |

**Subnet**: Clinical IT 192.168.20.0/23  
**Security Baseline**: Windows 10/11 with antivirus, Windows Defender, local LAPS.  
**Authentication**: AD-integrated (LDAP), 2FA for remote access.

### Layer 3: Hospital Enterprise (Finance, HR, Supply Chain)

| System | Purpose | Risk Profile |
|---|---|---|
| ERP (Finance/Supply) | Purchasing, inventory, payroll | Valuable business data |
| Email servers | SMTP/IMAP for all staff | Credential theft vector |
| Backup/archival | [[Veeam]], CommVault clusters | Restore capability critical |
| [[HL7]] integration engines | Epic ↔ Cerner ↔ LIS bridges | Cross-system data flow |

**Subnet**: Enterprise IT 192.168.30.0/23  
**Security Baseline**: Hardened Windows Server 2019/2022, SQL Always On.

### Layer 3.5: Internet DMZ / Vendor Access

| Service | Purpose | Direction | Risk Profile |
|---|---|---|---|
| Patient portal | MyChart-like PHI access | Inbound + Outbound (patient auth) | Authentication critical |
| Telehealth gateway | Secure video to remote physicians | Outbound, TLS 1.3 | Encrypted streams |
| Ontario Health integration | Provincial reporting (adverse events, metrics) | Outbound, OAuth | Compliance mandatory |
| Vendor remote access | Biomedical support tunnels | Outbound to vendor gateways | Least-privilege tunnels |
| Disclosure platform | HackerOne or similar | Inbound (researchers) | Controlled vulnerability reports |

**Subnet**: DMZ 10.0.100.0/24  
**Bastion Hosts**: Jump servers for vendor troubleshooting (logged, monitored).

## IEC 62443 Security Zones with SL-T (Security Level Target)

### Zone 1: Medical-Device Clinical Zone (SL-T 3)

**Scope**: Layer 0 + Layer 1 devices (bedside monitors, pumps, BMS thermostats).  
**Rationale**: Life-safety systems. Patient monitors directly inform clinical decisions.

**SL-T 3 Requirements**:

| Category | Requirement | Implementation |
|---|---|---|
| **Access Control (AC)** | Only hospital biomedical engineers can modify configs | Network-isolated, no remote SSH. Serial console locked in server room. |
| **Audit & Accountability (AA)** | All config changes logged with timestamp | Syslog aggregation to isolated SIEM. |
| **Integrity Verification (CM)** | Device firmware checksums verified on boot | Immutable firmware partition, [[UEFI]] Secure Boot. |
| **Availability (AV)** | Redundant network paths, < 100 ms failover | Dual-uplink switches, spanning-tree. |

### Zone 2: BMS (Building Management) Zone (SL-T 2)

**Scope**: HVAC, lighting, fire detection, emergency power (UPS, generators).  
**Rationale**: Facility safety. Loss of cooling → equipment failure → patient care disruption.

**SL-T 2 Requirements**: Credentials in HSM or secure vault; TLS 1.2+ remote access; daily audit export; VLAN 192.168.50.0/24; quarterly firmware updates.

### Zone 3: Clinical IT (SL-T 2)

**Scope**: EHR workstations, PACS, lab systems (Layer 2).  
**Rationale**: Confidentiality critical (PHI under [[HIPAA]]/PIPEDA). Integrity & availability required but not life-safety.

**SL-T 2 Requirements**: AES-256 disk encryption ([[BitLocker]]); TLS 1.2+ for network; RBAC per job function; 15-minute idle timeout; EDR on all machines; 15-minute alert response SLA.

### Zone 4: Enterprise IT (SL-T 2)

**Scope**: Finance, HR, supply-chain systems (Layer 3).  
**Rationale**: Business confidentiality. Compliance (SOX, health insurance rules).

**SL-T 2 Requirements**: AD + MFA ([[Azure AD]] or similar); TLS 1.2 in transit; AES-256 at rest; monthly security patches (critical 0-days within 24h); RPO 24h, RTO 4h; Change Advisory Board approval.

### Zone 5: Internet DMZ / Vendor Access (SL-T 3)

**Scope**: Patient portal, telehealth, Ontario Health API, vendor remote tunnels.  
**Rationale**: Internet-facing surface. Highest external attack risk.

**SL-T 3 Requirements**: [[OWASP]] Top 10 scanning (monthly); WAF rules for SQLi, XSS; DDoS mitigation; [[OAuth 2.0]] + JWT tokens (rotation every 8 hours); Bastion host + IP whitelisting; Session recordings; TLS 256-bit minimum.

## Network Conduit Summary (Zone ↔ Zone Communication)

| From | To | Purpose | Direction | Protocol | Firewall Rule |
|---|---|---|---|---|---|
| L0 Medical Devices | L1 Aggregator | Telemetry polling | Unidirectional ← | SNMP, proprietary MDP | Allow only known device IPs |
| L1 Aggregator | L2 EHR Workstations | [[HL7]] messaging (alerts) | Bidirectional | [[HL7v2]] over TLS | Allow only EHR server IPs |
| L2 EHR / PACS | L3 Enterprise | Cross-system data sync | Bidirectional | [[HL7]], [[FHIR]] REST | API Gateway with [[OAuth]] |
| L3 Enterprise | L3.5 DMZ | Reporting + compliance | Outbound | HTTPS/REST | State-full firewall, IP whitelisting |
| L3.5 DMZ (Vendor Bastion) | Remote Vendor | Support tunnel | Outbound | SSH + VPN | Bastion logged; Auto 4h disconnect |
| External (Patient) | L3.5 DMZ (Patient Portal) | Patient authentication | Inbound + Outbound | HTTPS/[[OAuth]] | WAF, rate-limiting, IP reputation |
| L3 Enterprise (SOC) | All Zones | Syslog + SIEM | Outbound (push) | Syslog/TLS | Allow all zones → SOC port 6514 |

## Facility Layout

**Clinical Floors**:
- **B2**: Plant room (HVAC, generators, UPS)
- **B1**: Server room (climate-controlled), electrical distribution, medical gas
- **L1**: ED (12 trauma bays), main lobby, security office
- **L2**: Surgery (8 ORs), PACU, imaging (CT, MRI, ultrasound)
- **L3**: ICU (40 beds), cardiac care (6 beds), inpatient wards (80 beds)
- **L4**: Inpatient wards (120 beds), respiratory, rehab
- **L5**: Diagnostic lab, pharmacy (centralized IV compounding)
- **L6**: Administrative offices, finance, HR, executive suite
- **Rooftop**: Helipad + trauma alert integration

---

**References**: [[IEC 62443-3-3]], [[IEC 80001-1]], [[HHS-405d]], [[HIPAA]]

## See also

[[ACME Ottawa Civic Hospital]] · [[Civic Hospital Network]] · [[Civic Hospital Equipment]] · [[Civic Hospital HAZOPS]]
