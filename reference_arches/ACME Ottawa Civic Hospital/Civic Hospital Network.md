---
aliases: [Network, Civic Network, Hospital VLANs]
type: facility-reference-model
category: acute-care-hospital
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-civic-hospital, phase/1c, sector/healthcare, network/vlan, network/protocols]
related: ["[[ACME Ottawa Civic Hospital]]", "[[Civic Hospital Architecture]]", "[[HL7v2]]", "[[FHIR]]", "[[DICOM]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Civic Hospital Network

## VLAN Architecture (19+ VLANs)

| VLAN | ID | Subnet(s) | Purpose | SL | Protocols |
|------|----|-----------|---------|----|-----------|
| **Clinical Workstations** | 10 | 10.50.1.0/24 | EHR, medication dispensing, clinical charting | 2 | [[HL7v2]] (MLLP), HTTPS, SSH |
| **Medical Devices (NICU)** | 20 | 10.51.1.0/24 | NICU monitor, ventilators, infusion pumps | 2 | Modbus TCP, proprietary serial-over-IP |
| **Medical Devices (OR)** | 30 | 10.51.2.0/24 | Surgical suite monitors, electrosurgical units, anesthesia | 2 | Modbus TCP, [[PROFINET]], serial tunneling |
| **Medical Devices (ICU)** | 40 | 10.51.3.0/24 | Bedside monitors, infusion pumps, dialysis | 2 | Modbus TCP, proprietary vendor protocols |
| **Medical Devices (General Ward)** | 50 | 10.51.4.0/24 | Ward monitors, patient call systems, portable ultrasound | 2 | Modbus TCP, SNMP (read-only) |
| **BMS (Building Management)** | 60 | 10.52.0.0/24 | HVAC, power, fire detection, occupancy sensors | 1 | [[BACnet/IP]] (UDP 47808), proprietary controls |
| **VOIP-Clinical** | 70 | 10.50.2.0/24 | Clinical grade VoIP, nurse call, overhead paging | 2 | [[SIP]] (TCP 5060/5061), RTP (media) |
| **VOIP-Admin** | 71 | 10.50.3.0/24 | Administrative VoIP, general office telephony | 1 | [[SIP]], RTP |
| **Guest Wi-Fi** | 80 | 192.168.100.0/24 | Visitor network, no clinical data access | 0 | HTTPS only (WAF enforced) |
| **Vendor Jump / Remote Access** | 90 | 10.54.0.0/24 | Vendor service, Epic Remote, [[Philips]]/[[Siemens]]/[[GE]] remote | 1 | SSH (2222), RDP (3389 via bastion), proprietary VPN |
| **PACS (Imaging)** | 100 | 10.53.1.0/24 | Picture archiving, [[DICOM]] routing, imaging workstations | 2 | [[DICOM]] (TCP 11112), HTTPS, MLLP |
| **Lab & Middleware** | 110 | 10.53.2.0/24 | Laboratory information system (LIS), analyzer interfaces | 2 | [[ASTM]] (TCP 7777), [[HL7v2]], HTTPS |
| **Pharmacy** | 120 | 10.53.3.0/24 | Pharmacy system, medication delivery robots, barcode verification | 2 | [[HL7]], proprietary serial, HTTPS |
| **OR Imaging** | 130 | 10.51.5.0/24 | Intra-operative imaging (C-arm, fluoroscopy), image transfer | 2 | [[DICOM]], Modbus TCP, GigE |
| **Wireless Medical** | 140 | 10.50.4.0/24 | 802.11ax + 802.1X, portable monitors, handoff devices | 2 | 802.11 + 802.1X EAP-TLS, WPA2-Enterprise, SIP |
| **Printing & Scanning** | 150 | 10.55.0.0/24 | Printers, label makers, document scanners, fax gateways | 1 | LPD (TCP 515), IPP (TCP 631), SNMP |
| **Management / Admin** | 160 | 10.99.0.0/24 | IT infrastructure, backup, monitoring, patch distribution | 1 | SSH, HTTPS, NTP, SNMP |
| **Research Data** | 170 | 10.56.0.0/24 | De-identified research datasets, biobank integration, analytics | 1 | HTTPS, S3-compatible API |
| **DMZ (Patient Portal & Web)** | 200 | 172.16.0.0/24 | myChart portal, telehealth, Ontario Health Connect, WAF | 2 | HTTPS only, TLS 1.3 enforced |

## Healthcare Protocols

### HL7v2 (Admit/Discharge/Transfer + Lab/Results)

**Transport**: MLLP over TCP 6661 (primary), 6663 (backup)  
**Segments Used**: ADT (admission), ORU (lab results), ORM (orders), SCH (scheduling)  
**Firewall**: Clinical VLAN 10 ↔ EHR server (10.50.10.50); Lab VLAN 110 ↔ LIS (10.53.20.x)  
**Encryption**: Unencrypted over dedicated [[IPSec]] AES-256 VPN tunnel to external labs  
**Backup**: Secondary [[HL7]] gateway on standby, automatic failover

### HL7 FHIR (Ontario Health Connect)

**Transport**: HTTPS / RESTful (TCP 443), [[TLS]] 1.3 enforced  
**Endpoints**: Ontario Health Connect Hub (discharge summaries, eReferrals, prescription routing)  
**Authentication**: [[OAuth 2.0]] with SMART on [[FHIR]] scopes  
**Firewall**: DMZ gateway 172.16.10.20 → Ontario Health Hub (IP-restricted)  
**Rate Limiting**: 100 requests/min per endpoint (burst 500)

### DICOM (Imaging)

**Transport**: Native [[DICOM]] over TCP 11112 (unencrypted on LAN), [[TLS]] over WAN  
**PACS Subnet**: 10.53.1.0/24 (15 workstations, archive, routing gateway)  
**Storage**: 200 TB (2026) growing to 500 TB (2027), 5-year retention  
**Firewall**: PACS server restricts modality pushes to whitelisted AE titles only

### ASTM (Lab Middleware)

**Protocol**: [[ASTM]] E1381 over TCP 7777  
**Devices**: Siemens Advia analyzer (10.53.2.15), Abbott iStat (wireless, 10.50.4.x), Roche cobas (10.53.2.20)  
**Firewall**: Lab VLAN 110 outbound to LIS only (10.53.20.x)  
**Backup**: Secondary analyzer on standby; manual workaround if primary [[ASTM]] fails

### BACnet/IP (Building Management)

**Protocol**: [[BACnet/IP]] over UDP 47808  
**Devices**: [[Honeywell Niagara]] (chiller, cooling towers), Johnson Controls (HVAC), Schneider Electric (power)  
**Firewall**: BMS VLAN 60 air-gapped from clinical; no bidirectional data flow  
**Monitoring**: Read-only SNMP from management VLAN (10.99.x) for alerting only

### SIP (Clinical VoIP + Nurse Call Integration)

**Signaling**: [[SIP]] over TCP 5060 (internal), TCP 5061 (secure with [[TLS]], external)  
**Phones**: 400+ clinical handsets ([[802.11ax]] + 802.1X), desk phones (VLAN 70/71)  
**Nurse Call**: [[SIP]] trunks to nurse-call system ([[Philips IntelliSpace]]); alarm = [[SIP]] INVITE to on-call staff  
**QoS**: VLAN 70 (clinical) prioritized (DSCP EF); bandwidth guarantee 1 Mbps per phone

### 802.11 + 802.1X (Wireless Medical)

**Standard**: 802.11ax (Wi-Fi 6E) with 802.1X EAP-TLS  
**Devices**: 200+ wireless monitors, portable ultrasounds, handoff tablets, bag units  
**Authentication**: Hospital AD (LDAP-backed), certificate-based (EAP-TLS); device certs rotated annually  
**Roaming**: Fast roaming (802.11r) for seamless handoff between access points  
**Rogue Detection**: Aruba ClearPass detects unauthorized APs; alerts on MAC conflicts

## Vendor Remote Access Entry Points

| Vendor | System | Access Method | Session Timeout | 2FA |
|--------|--------|----------------|-----------------|-----|
| **Epic** | EHR ([[Hyperspace]]) | SSH bastion (2222) + RDP tunnel | 8 hours (daily reauth) | Yes ([[SMS]]) |
| **Philips** | Monitors, Nurse Call | Custom VPN ([[IPSec]]) | 1 hour | Yes (hardware token) |
| **GE Healthcare** | Imaging ([[Centricity]], PACS) | HTTPS portal + RDP | 2 hours | Yes (hardware token) |
| **Siemens** | Analyzer, OR imaging | SSH (2222) to analyzer subnet | 1 hour (auto-logout) | Yes ([[SMS]]) |
| **Honeywell** | BMS ([[Niagara]]) | Bastion RDP (port 3389) | 1 hour | Yes ([[SMS]]) |
| **Johnson Controls** | HVAC (Metasys) | Bastion SSH (2222) | 30 min | Yes ([[SMS]]) |
| **Medtronic / Stryker** | Surgical devices, ventilators | Field engineer badge + remote support phone | 4 hours (supervised) | Yes (voice auth) |

**Bastion Host**: 172.16.250.10 (DMZ, [[Palo Alto]] managed, jump host for all RDP/SSH)  
**Monitoring**: All vendor sessions logged (session recording for compliance audits)  
**Firewall Policy**: Source IP whitelist (vendor corporate networks); geo-blocking for non-North American vendors

## Patient Portal (myChart) — DMZ Architecture

**Outbound Flow**:
```
Patient (public internet)
  → [WAF: Imperva SecureSphere] (172.16.200.10)
  → [Load Balancer: F5 ASM] (172.16.200.20)
  → [myChart Proxy: Spring Boot] (172.16.10.x, 3 instances)
  → [EHR API Gateway: Epic [[FHIR]]]] (10.50.10.50 over VPN)
```

**WAF Rules**: 1000 requests/min per IP (burst 5000); [[Cloudflare]] Anycast upstream; geo-blocking; [[TLS]] 1.3 enforced; [[HSTS]] (1 year), [[CSP]] (strict), X-Frame-Options (DENY)

**Telehealth (Synchronous)**: [[Zoom for Healthcare]] ([[HIPAA]]-compliant); DMZ subnet 172.16.20.0/24; guaranteed 5 Mbps per active session

**Credential Management**: TOTP ([[Google Authenticator]]), 15-min idle timeout, 12+ char password, 60-day rotation

---

**References**: [[HL7v2]], [[FHIR]], [[DICOM]], [[BACnet/IP]], [[OAuth 2.0]], [[TLS 1.3]]

## See also

[[ACME Ottawa Civic Hospital]] · [[Civic Hospital Architecture]] · [[Civic Hospital Equipment]]
