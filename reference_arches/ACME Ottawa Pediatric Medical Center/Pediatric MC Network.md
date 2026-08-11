---
aliases: [Peds MC Net, VLAN Map]
type: facility-reference-model
category: pediatric-specialty-hospital
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-pediatric-medical-center, phase/1c, sector/healthcare, sector/pediatric, org/acme-demo]
related: ["[[ACME Ottawa Pediatric Medical Center]]", "[[Pediatric MC Architecture]]", "[[Pediatric MC Equipment]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Pediatric Medical Center Network

Post-2018 DDoS hardening: [[Cloudflare Magic Transit]] + [[Akamai Prolexic]] always-on scrubbing. Reference incident: [[CHEO 2018 DDoS]] (45-hour outage; Oct 31, 2018).

---

## VLAN Map

| VLAN ID | VLAN Name | IP Range | Purpose | Protocols | SL-T |
|---------|-----------|----------|---------|-----------|------|
| 10 | Peds-Clinical | 10.55.0.0/16 | NICU, PICU, OR-peds, ED-peds, inpatient wards | HL7v2/MLLP, FHIR/HTTPS, DICOM-peds | 2–3 |
| 20 | Peds-Medical-Devices | 10.56.0.0/16 | Bedside monitors, infusion pumps, ventilators | BACnet/IP, Modbus TCP, proprietary | 2–3 |
| 30 | BMS/Climate Control | 10.57.0.0/16 | HVAC, humidity, temperature per [[IEC 62443]] | BACnet/IP, SNMP v3 | 2 |
| 40 | Research VLANs | 10.60.0.0/16 | Sequencing, biobank, wet-lab, GenomeAnalyzer | HTTPS, SSH, NFS (air-gapped) | 1 |
| 50 | DMZ/Internet-Facing | 172.16.0.0/16 | Patient portal, telehealth, publication portal | HTTPS ([[TLS 1.3]]), HSTS | 2–3 |
| 60 | Guest/Wireless | 192.168.100.0/24 | Staff WiFi, visitor access | 802.1X, EAP-TLS | 1 |

---

## IP Address Allocation

```
10.55.0.0/16    Clinical Network
├─ 10.55.1.0/24   NICU (30 beds, monitors, incubators)
├─ 10.55.2.0/24   PICU (24 beds, ventilators, hemodynamics)
├─ 10.55.3.0/24   OR-Peds (6 suites, anesthesia)
├─ 10.55.4.0/24   ED-Peds (20 emergency beds)
├─ 10.55.5.0/24   Inpatient wards (60 beds)
└─ 10.55.6.0–10.55.13.0/24  Specialty services (oncology, cardio, neuro, endo)

10.56.0.0/16    Medical Device Management (reserved)

10.57.0.0/16    BMS/Building Management
└─ 10.57.1.10     [[Honeywell Niagara JACE-8000]] controller

10.60.0.0/16    Research (Air-Gapped)
├─ 10.60.1.0/24   Sequencing (USB ingestion only)
├─ 10.60.2.0/24   Biobank (LIMS)
└─ 10.60.3.0/24   Wet-lab (bioinformatics)

172.16.0.0/16   DMZ
├─ 172.16.1.1     Internet gateway
├─ 172.16.1.2     [[Fortinet FortiGate 3500F]] WAF
└─ 172.16.1.3     DNS (Route53 + [[Cloudflare]])

192.168.100.0/24 Guest DHCP (100–200)
```

---

## Clinical Protocols & Interoperability

- **HL7v2 over MLLP**: EHR ↔ bedside monitors, lab analyzers (port 2575)
- **FHIR over HTTPS**: [[Ontario Health Connect]] peds-data endpoints ([[TLS 1.3]], cert pinning)
- **DICOM-Peds**: PACS ↔ CT, MRI (port 11112, encrypted [[DICOM]] TLS)
- **GS1 DataBar**: Pharmacy peds-dose barcodes, drug-interaction checks at dispensing
- **ASTM Lab**: Interface to hematology, chemistry, microbiology labs
- **ONVIF Cameras**: Isolation room monitoring (encrypted RTSP, no raw streams)

---

## Post-2018 DDoS Mitigation Architecture

**Incident Context** ([[CHEO 2018 DDoS]]): 45-hour outage; EHR timeouts, ED triage offline, telehealth rerouted, imaging stalled.

### ISP Uplinks & BGP Failover
- **Primary**: Rogers (10 Gbps) + Secondary: Bell (5 Gbps)
- **Scrubbing**: [[Cloudflare Magic Transit]] with BGP anycast
  - Always-on; no switchover during attack
  - Automatic failover to Cloudflare PoP (Ottawa/Toronto) in <500ms
  - Volumetric + application-layer (L7) protection
- **Backup**: [[Akamai Prolexic]] (manually activated if Cloudflare capacity exceeded)

### Public DNS
- **Authoritative**: [[Cloudflare]] (secondary) + [[AWS Route53]] (primary)
- **Anycast**: Attack traffic absorbed by global PoP network
- **Query Logging**: Malicious patterns fed to WAF rules
- **DNSSEC**: Enabled (RRSIG validation prevents spoofing)
- **Rate Limiting**: 100 req/sec per IP (bots throttled)

### Web Application Firewall (WAF)
- **Technology**: AWS WAF (on CloudFront) + [[Cloudflare]] WAF
- **Rules**:
  - GeoIP blocking: Non-Canadian IPs → pediatric portal blocked (whitelist exceptions)
  - SQL Injection / XSS: OWASP ModSecurity rules + custom signatures
  - Bot Management: Behavioral scoring (TLS fingerprint, User-Agent, IP reputation)
  - Rate Limiting: 1000 req/min per IP to patient portal (sliding window)

### Internal Network Protection
- **Firewall**: [[Palo Alto Networks]] PA-5220 NextGen Firewall with DDoS protection
- **Volumetric Detection**: SYN flood threshold = 100K SYN/sec (auto-rate-limit)
- **Behavioral Analysis**: DNS tunneling detection → blocked
- **TCP State Tracking**: Half-open connection limits per IP

### Monitoring & Detection
- **SIEM**: [[Splunk]] Enterprise with DDoS dashboard
  - Metrics: Gbps, Mpps, top source IPs, top destinations
  - Alert: >50% traffic baseline spike for >60 sec → page on-call
  - Baseline: Profiled weekly; discharge/research export peaks excluded
- **NetFlow**: Cisco Netflow v9 → [[Splunk]]
- **Firewall Logs**: Palo Alto real-time stream to SIEM

---

## Network Segmentation & IEC 62443 SL Assessment

| Segment | SL-T (Target) | SL-A (Achieved) | Boundary | Enforcement |
|---------|--------------|-----------------|----------|-------------|
| Peds-Clinical | SL-2 | SL-2 | Firewall + IDS at 10.55.0.1 | Palo Alto PA-5220 |
| Medical-Devices | SL-2 | SL-2 | Network tap + segmentation at 10.56.0.1 | Unidirectional data diodes |
| BMS | SL-2 | SL-2 | Air-gapped historian; serial heartbeat | Manual override on NICU climate |
| Research | SL-1 | SL-1 | No patient data (soft boundary) | USB-only ingestion |
| DMZ | SL-2 | SL-2 | WAF + rate limiting; [[Fortinet]] F5 BIG-IP | [[Cloudflare]] + [[Akamai]] DDoS |
| Guest | SL-1 | SL-1 | VLAN isolation; no clinical network access | 802.1X, EAP-TLS |

---

## Time Synchronization

- **Internal NTP**: 10.55.1.20, 10.55.1.21 (redundant, Stratum-2)
- **GPS-Disciplined**: Trimble SecureSync at main switchroom (Stratum-0 backup)
- **Max Jitter**: <10 ms (required for EHR audit trails, medication timestamps)
- **External Pool**: time.google.com, time.cloudflare.com (fallback, logged)

---

## Vendor Remote-Access Hardening

**Epic Tesseract/Hyperspace VPN**: IPsec tunnel (AES-256), PIV card + RSA SecurID, session limit 5, 4-hour max, [[CyberArk]] PAM gating

**[[Philips]] Remote Services**: TLS 1.3, PKI certificate, isolated device LAN (VLAN 3040), 7-year audit log retention

**[[GE InSite]]** (Diagnostic Imaging): Secure box intermediary, outbound-only connection, video + keystroke capture, business hours only (08:00–17:00 ET)

**[[Drager]] TechWeb** (Ventilator): Drager PKI + [[Duo Security]] 2FA, per-device routing rules, out-of-band phone verification, 2-hour max per device

**Biomed Vendor Laptops**: Hardened devices (no browser, no email), MAC whitelisted (vendor VLAN), USB locked (read-only approved media), SFTP only (no USB-to-device), post-visit scanned + wiped

---

**Reference**: [[IEC 62443]], [[CHEO 2018 DDoS]], [[HL7 FHIR Pediatrics]]

**Document**: Phase 1c Network Architecture  
**Lines**: 439 | **VLANs**: 6 | **ISP Links**: 2 | **DDoS Scrubbers**: 2 | **Created**: 2026-05-09
