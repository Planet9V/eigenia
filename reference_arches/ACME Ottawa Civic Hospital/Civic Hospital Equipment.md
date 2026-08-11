---
aliases: [Equipment, Hospital Equipment, Equipment Inventory]
type: facility-reference-model
category: acute-care-hospital
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-civic-hospital, phase/1c, sector/healthcare, equipment/medical-devices]
related: ["[[ACME Ottawa Civic Hospital]]", "[[Civic Hospital CVE Cross-Reference]]", "[[GE Healthcare]]", "[[Philips Healthcare]]", "[[Baxter]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Civic Hospital Equipment

## Inventory Overview

**Total Assets**: 1,247 devices across 8 functional zones  
**Network-Attached**: 941 devices (medical monitors, pumps, imaging, lab, network infrastructure)  
**Legacy/Air-Gapped**: 3 devices (isolated or end-of-life)

## PATIENT BEDSIDE (470 assets)

| Zone | Vendor | Model | Firmware/OS | Role | Count | NIC |
|------|--------|-------|-------------|------|-------|-----|
| ICU West | [[GE Healthcare]] | Carescape B650 | 2.1.45 | Patient monitor | 12 | 1G Ethernet |
| ICU West | [[GE Healthcare]] | Carescape B850 | 2.3.22 | Advanced monitor | 8 | 1G Ethernet |
| Cardiac | [[Philips Healthcare]] | IntelliVue MX800 | M.2.15 | Bedside monitor | 16 | 1G Ethernet |
| Cardiac | [[Philips Healthcare]] | IntelliVue MX850 | M.2.15 | Advanced ICU monitor | 6 | 1G Ethernet |
| Medical 3 | Hill-Rom | Centrella SmartBed | 3.8.2 | Patient bed + care surface | 32 | Wi-Fi 5 |
| Medical 4 | Stryker | InTouch Bed | 5.1.9 | Electric bed + mobility | 28 | Wi-Fi 5 |
| Pediatrics | [[Baxter]] | Sigma Spectrum | 6.2.5 | IV infusion pump | 24 | Ethernet |
| Pediatrics | [[Baxter]] | Sigma Spectrum IQ | 8.1.3 | Smart IV pump | 18 | Ethernet + Wi-Fi |
| Medical ICU | [[BD]] | Alaris 8015 | 9.2.1 | IV infusion module | 20 | Ethernet |
| Oncology | EarlySense | Bedside Motion Sensor | 4.2.0 | Patient motion + vitals | 12 | Wi-Fi 5 |
| Pediatrics | Vocera | B3000 Badge | 10.3.4 | Clinical communication | 45 | Wi-Fi 5 |
| Med/Surg | [[Philips Healthcare]] | Respironics Trilogy Vent | 2.2.1 | Mechanical ventilator | 8 | Ethernet |

**Vulnerabilities**: [[Carescape]] B650/B850: [[CVE-2020-6961]] (firmware ≤2.2.x) — 20 devices vulnerable, pending patch 2.4.x. [[Sigma IQ]] 8.1.3: [[CVE-2022-26390]] mitigation in 8.0+.

## OR / ICU CRITICAL (145 assets)

| Zone | Vendor | Model | Firmware/OS | Role | Count | Vulnerabilities |
|------|--------|-------|-------------|------|-------|-----------------|
| OR Suite 1–5 | Stryker | OpsStation Boom Arm | 4.1.2 | Surgical pendulum | 5 | Firmware 4.2+ pending |
| OR Suite 1–5 | Berchtold | Paxos 300 Ceiling Boom | 3.5.8 | Surgical support | 3 | None noted |
| OR Suite 6–8 | Maquet | Alphamaxx Operating Table | 2.7.1 | Surgical table | 3 | None noted |
| ICU East | Dräger | Atlan A300 Anesthesia | 2.6.4 | Anesthesia workstation | 4 | Legacy RS-232 serial bridge |
| ICU East | Mindray | SV300 Ventilator | 4.1.9 | Mechanical ventilation | 6 | None noted |
| ECMO Lab | Maquet | Cardiohelp ECMO | 3.2.0 | Extracorporeal membrane oxygenation | 2 | [[CVE-2023-21845]] (DoS, 3.0–3.1.x) |
| Hemodynamic Lab | Edwards | EV1000 CVi Monitor | 4.6.2 | Hemodynamic monitoring | 3 | None noted |
| PACU | [[GE Healthcare]] | Datex-Ohmeda S/5 | 3.3.5 | Patient monitor (post-op) | 8 | None noted |
| Recovery | Fresenius | CareStation Infusion | 5.1.2 | IV pump (post-op) | 6 | None noted |

## IMAGING (78 assets)

| Zone | Vendor | Model | Firmware/OS | Role | Count | Vulnerabilities |
|------|--------|-------|-------------|------|-------|-----------------|
| CT Suite 1–2 | [[GE Healthcare]] | Optima CT660 | Windows 10 IoT LTSC 2019 (KB5018506) | CT scanner + console | 2 | [[CVE-2024-26190]] (Windows SMBv3 RCE, EOL Oct 2024) |
| MRI 1 | [[Philips Healthcare]] | Ingenia 1.5T | [[Philips]] 5.4.1.4 | Magnetic resonance | 1 | None noted |
| C-Arm 1–2 | [[Siemens]] | CIOS c-arm | Windows 7 Embedded POSReady (KB3173428) | Portable c-arm | 2 | [[CVE-2023-38545]], [[CVE-2023-41080]] (~40 CVEs) |
| C-Arm Legacy | [[Siemens]] | CIOS c-arm | Windows XP Embedded (end-of-life) | Legacy mobile unit | 1 | Air-gapped only; extensive unfixed CVEs |
| NM Lab | [[GE Healthcare]] | Discovery 670 CZT | Windows Server 2016 (KB5020788) | SPECT/CT hybrid | 1 | None noted |
| PACS Server | Sectra | PACS 25 | Windows Server 2019 (KB5033791) | Image archive + dictation | 1 | Extended support through 2024 |

## LABORATORY (92 assets)

| Zone | Vendor | Model | Firmware/OS | Role | Count | Vulnerabilities |
|------|--------|-------|-------------|------|-------|-----------------|
| Hematology | Sysmex | XN-9000 | XN-Onsite 5.3.2 | Automated blood analyzer | 2 | [[CVE-2021-44228]] (Log4j) mitigation in 5.2+ |
| Chemistry | Roche | Cobas 8000 | Cobas IT 2.3.8 | Integrated lab analyzer | 1 | [[CVE-2021-44228]] (Log4j) patch in 2.5.x pending |
| Immunoassay | Abbott | Architect i2000SR | Architect 5.7.1 | Immunochemistry analyzer | 1 | None noted |
| Urinalysis | [[Siemens]] | Atellica UH900 | SureShop 5.2.3 | Urinalysis analyzer | 1 | None noted |
| Microbiology | [[BD]] | BACTEC FX | FX Control 7.1.9 | Blood culture system | 3 | None noted |
| Specimen Mgmt | Telcyte | TracSYS | TracSYS 4.6.2 | Specimen routing + tracking | 1 | None noted |
| Blood Bank | Grifols | ERYTRA Auto | Control 3.4.1 | Immunohematology analyzer | 1 | None noted |
| Coagulation | Instrumentation | STA-R Evolution | Evolution Analyzer 3.8.4 | Hemostasis analyzer | 1 | None noted |
| Point-of-Care | Cepheid | GeneXpert Omni | Omni 2.0.5 | Rapid molecular testing | 8 | None noted; weekly assay auto-sync (Wi-Fi) |

## PHARMACY (56 assets)

| Zone | Vendor | Model | Firmware/OS | Role | Count | Vulnerabilities |
|------|--------|-------|-------------|------|-------|-----------------|
| Automated Dispensary | Omnicell | XT | Omnicell Edge 28.4.2 | Drug dispensing robot | 2 | None noted (latest prod) |
| Pyxis Stations | [[BD]] | Pyxis MedStation 4000 | Pyxis ES 8.2.1 (Windows Server 2019) | Medication station | 12 | [[CVE-2023-21674]] (Windows Server 2019 priv esc) |
| IV Room | [[Baxter]] | Exactamix System | Exacta 4.1.5 | IV admixture automation | 1 | [[CVE-2023-22298]] (SQL injection, 4.0–4.1.x); patch to 4.2.x pending |
| Refill Cart | Symbios | ReMed | ReMed 3.2.0 | Mobile refill system | 4 | None noted |
| RFID Tracking | Zebra | FX9600 Reader | Zebra Reader 5.21.3 | Medication asset tracking | 8 | None noted |

## EHR / HIS (34 assets)

| Zone | Vendor | Model | Firmware/OS | Role | Count | Vulnerabilities |
|------|--------|-------|-------------|------|-------|-----------------|
| [[Epic]] Data Center | [[Epic]] | Caché Database | Caché 2023.1.2 | EHR backend | 2 | [[CVE-2023-41056]] (unauth backup download); mitigated (monthly patches) |
| [[Epic]] Desktop | [[Citrix]] | XenDesktop 7.15 | Windows 10 22H2 (KB5033791) | [[Epic Hyperspace]] terminal | 47 | None noted (patched) |
| BI Analytics | Tableau | Server 2024.1 | Linux RHEL 8.9 (kernel 4.18.0-513) | Clinical analytics | 1 | None noted |
| Integration Engine | Rhapsody | Rhapsody iNTERFACE | Rhapsody 6.7.3 | [[HL7]] message broker | 2 | Recommend upgrade to 6.8.x |
| Mirth Connect | NextGen | Mirth Connect | Mirth 4.2.1 | Secondary [[HL7]] broker | 1 | OpenJDK 11 LTS (through Sept 2026) |

## NETWORK INFRASTRUCTURE (156 assets)

| Zone | Vendor | Model | Firmware/OS | Role | Count | Vulnerabilities |
|------|--------|-------|-------------|------|-------|-----------------|
| Core Switch | [[Cisco]] | Catalyst 9400 | IOS-XE 17.9.4a | Core layer 3 switch | 2 | [[CVE-2023-20198]] (SSH priv esc) patched |
| Distribution | Aruba | CX 6300 | ArubaOS-CX 10.12.4010 | Distribution switch | 4 | None noted |
| Access | [[Cisco]] | Catalyst 9300L | IOS-XE 17.9.4a | Access layer switch | 12 | [[CVE-2023-20198]] patched |
| Wi-Fi 6 AP | [[Cisco]] | Aironet 9120 | IOS-XE 17.9.4a | Wireless access point | 24 | [[CVE-2023-20198]] patched |
| Edge Firewall | Fortinet | FortiGate 1500D | FortiOS 7.4.3 | Perimeter security | 2 | [[CVE-2024-21762]] (SSL/TLS bypass, 7.0–7.4.2) patched to 7.4.3 |
| Proxy/Content Filter | [[Cisco]] | Umbrella | Umbrella Agent 2.3.1 | DNS security + cloud proxy | 1 | None noted |
| VoIP Gateway | [[Cisco]] | Catalyst 8300-1N1S | IOS-XE 17.9.4a | Voice gateway | 1 | [[CVE-2023-20198]] patched |
| Data Center UPS | Eaton | 93PX | UPS 8.5 firmware | 500 kVA UPS | 2 | None noted |

## SECURITY / ENDPOINT (48 assets)

| Zone | Vendor | Model | Firmware/OS | Role | Count | Vulnerabilities |
|------|--------|-------|-------------|------|-------|-----------------|
| Endpoint Detection | Microsoft | Defender for Endpoint | Sensor 10.23.1 | Windows/Mac/Linux EDR | 120 agents | Monthly rollup |
| Managed Detection | [[CrowdStrike]] | Falcon | Agent 7.15.3 | Behavioral threat detection | 95 agents | Weekly patches |
| Network Discovery | [[Forescout]] | CounterACT | CounterACT 8.3.2 | Medical device discovery + assessment | 1 | None noted |
| Network Segmentation | [[Cisco]] | ISE 3.2 | ISE 3.2 Patch 11 | Identity & access control | 2 | [[CVE-2023-20198]] mitigation |
| Threat Intelligence | Splunk | Threat Intelligence | TIX 6.0.3 | Threat data aggregation | 1 | None noted |

## CLINICAL WORKSTATIONS (189 assets)

| Zone | Vendor | Model | Firmware/OS | Role | Count | Support |
|------|--------|-------|-------------|------|-------|---------|
| ICU Workstations | Lenovo | ThinkCentre M90 | Windows 10 IoT LTSC 2021 (KB5033791) | Clinical workstation | 24 | Extended support Jan 2027 |
| Physician Offices | HP | EliteDesk 800 G8 | Windows 10 22H2 LTSC 2021 | Physician order entry | 18 | Extended support Jan 2027 |
| Mobile (COW) | Lenovo | X1 Tablet Gen 9 | Windows 10 22H2 + Docking | Bedside order entry | 12 | Extended support Jan 2027 |
| Nursing Stations | Panasonic | FZ-G1 Tablet | Windows 10 IoT LTSC 2019 | Ruggedized nursing device | 8 | EOL Oct 2024; migration to FZ-G2 planned Q3 2026 |
| Tele-ICU Carts | [[Cisco]] | TelePresence Codec C90 | TC Software 10.19.2 | Remote ICU monitoring | 4 | None noted |
| iPad Units | Apple | iPad Pro 12.9" Gen 5 | iPadOS 17.4.1 | Clinical charting + comms | 32 | Auto-update weekly via MDM |
| Clinical Tablets | Samsung | Galaxy Tab S9+ | Android 14 (Knox 3.9) | Point-of-care apps | 24 | None noted |

## BUILDING MANAGEMENT SYSTEM (48 assets)

| Zone | Vendor | Model | Firmware/OS | Role | Count | Vulnerabilities |
|------|--------|-------|-------------|------|-------|-----------------|
| BMS Master | [[Honeywell]] | Niagara JACE-8000 | Niagara Framework 4.13.4 | Building automation controller | 2 | [[CVE-2023-41080]] (Tomcat RCE) patched in 4.13.2+ |
| HVAC Control | Johnson Controls | Metasys | Metasys 10.2.4 | HVAC/energy management | 3 | None noted |
| Lighting Control | Schneider | EcoStruxure Building | EcoStruxure 3.4.1 | Lighting + occupancy | 2 | None noted |
| BACnet Router | Contemporary Controls | ARCnet-BACnet | ARC-BACnet 2.1.3 | [[BACnet/IP]] router | 4 | None noted |
| Emergency Generator | Caterpillar | C9 Gen | GenComm 3.2.0 | Generator control + monitoring | 1 | None noted |
| UPS Monitoring | Eaton | Intelligent Power Manager | IPM 6.8.2 | Power quality + battery | 1 | None noted |

---

**Critical CVE Status Summary**:
- [[CVE-2020-6961]] (GE [[Carescape]]): 20 devices, firmware ≤2.2.x, UNPATCHED
- [[CVE-2024-21762]] (Fortinet): 2 devices, patched to 7.4.3
- [[CVE-2023-20198]] ([[Cisco]] IOS-XE): 39 devices, patched 17.9.4a
- [[CVE-2024-26190]] (Windows SMBv3): 3 imaging/nursing workstations, EOL Oct 2024
- [[CVE-2023-22298]] ([[Baxter]] Exactamix): 1 device, patch to 4.2.x pending

**References**: [[CVE-2020-6961]], [[CVE-2022-26390]], [[CVE-2023-20198]], [[CVE-2024-21762]]

## See also

[[ACME Ottawa Civic Hospital]] · [[Civic Hospital Architecture]] · [[Civic Hospital CVE Cross-Reference]]
