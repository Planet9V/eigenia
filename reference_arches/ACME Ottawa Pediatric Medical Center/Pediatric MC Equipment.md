---
aliases: [Peds MC Equip, Vendor Inventory]
type: facility-reference-model
category: pediatric-specialty-hospital
status: draft
domain: OT
tags: [domain/OT, domain/IoMT, facility/acme-ottawa-pediatric-medical-center, phase/1c, sector/healthcare, sector/pediatric, org/acme-demo]
related: ["[[ACME Ottawa Pediatric Medical Center]]", "[[Pediatric MC CVE Cross-Reference]]", "[[Pediatric MC Architecture]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Pediatric Medical Center Equipment Inventory

337+ devices across 8 clinical zones. Firmware/OS strings mapped to [[forge.cve_records]] for vulnerability cross-reference.

---

## NICU (Neonatal Intensive Care Unit)

| Vendor | Model | Firmware/OS | Role | Count | Network |
|--------|-------|------------|------|-------|---------|
| [[GE Healthcare]] | Giraffe OmniBed Carestation | SW 2.2 | Neonatal incubator, thermal regulation | 8 | Ethernet + serial |
| [[Drager]] | Babyleo TN500 | SW 1.0n | IncuWarmer, hybrid infant bed | 6 | Ethernet |
| NeoForce | Phototherapy System | FW 3.1 | Bilirubin treatment lights | 4 | Ethernet |
| [[Drager]] | Babylog VN500 | FW 5.4 | Neonatal ventilator, synchronized modes | 4 | Ethernet + serial |
| [[Masimo]] | Radical-7 O3 NIRS Monitor | FW 2018.2 | Tissue oxygenation & SpO₂, dual-channel | 8 | Ethernet |
| [[Masimo]] | Rad-G Pulse Oximeter | FW 2019.1 | Peripheral SpO₂ + perfusion index | 12 | Wireless 802.11ac |
| [[GE Healthcare]] | Carescape V100 Monitor | SW 6.2 | Neonatal multi-parameter monitor | 6 | Ethernet |
| [[Philips Healthcare]] | IntelliVue MX450 Neonatal | SW 4.41 | Compact neonatal bedside monitor | 4 | Ethernet |
| [[Smiths Medical]] | CADD-Solis Infusion Pump | FW 7.2 | Pediatric IV delivery, dose-limiting | 10 | Wireless 802.11n |
| [[BD]] | Alaris PCM+ (Peds CQI Profile) | FW 5.04 | Integrated IV workflow, pediatric library | 8 | Wireless + Ethernet |
| [[Baxter]] | Sigma Spectrum IQ (Peds Unlock) | FW 10.3 | IV pump with peds-only drug database | 6 | Wireless 802.11ac |

---

## PICU (Pediatric Intensive Care Unit)

| Vendor | Model | Firmware/OS | Role | Count | Network |
|--------|-------|------------|------|-------|---------|
| [[GE Healthcare]] | Carescape V100 Monitor (Peds Config) | SW 6.2 | Pediatric multi-parameter monitor | 10 | Ethernet |
| [[Drager]] | Infinity Acute Care Platform (Peds) | SW 5.1.1 | Ventilator, anesthesia, multi-gas | 6 | Ethernet |
| Stryker | Stryker S Series Pediatric Bed | FW 2.1 | Electric pediatric ICU bed, safety rails, scales | 12 | Ethernet |
| Maquet | Cardiohelp ECMO (Peds Cannulae Config) | SW 6.5.2 | Pediatric extracorporeal membrane oxygenation | 2 | Ethernet + serial |
| [[Edwards Lifesciences]] | EV1000 Clinical Platform (Peds) | FW 2.33 | Hemodynamic monitoring, CO, SVV for peds | 4 | Ethernet |
| [[Siemens]] Healthineers | Servo-i Ventilator (Peds Modes) | FW 3.24 | Pediatric mechanical ventilation, SIMV/PC | 8 | Ethernet |

---

## Pediatric Imaging (Low-Dose Protocols)

| Vendor | Model | Firmware/OS | Role | Count | Network |
|--------|-------|------------|------|-------|---------|
| [[GE Healthcare]] | Revolution Apex CT | Windows 10 IoT 2019 LTSC (KB4515384) | 128-slice CT, ALARA protocols | 1 | Ethernet + iSCSI |
| [[Philips Healthcare]] | Ingenia 1.5T MRI (Peds Coils) | SW 5.8.2 | 1.5T MRI with pediatric coil arrays | 1 | Ethernet + optical |
| [[Siemens]] | CIOS Alpha C-Arm (Peds) | Win 7 IoT Embedded SP1 | Peds fluoroscopy, low-dose protocols | 1 | Ethernet |
| [[GE Healthcare]] | Discovery 690 NM (Pediatric Collimator) | FW 3.2.1 | SPECT/gamma camera, pediatric imaging | 1 | Ethernet |
| [[Bruker]] (Research) | BioSpec 70/20 MRI Research | Linux CentOS 7 (kernel 3.10.0-1062) | 7T preclinical MRI, tissue imaging | 1 | Ethernet + USB3 |
| [[GE Healthcare]] | microMRI (Research) | FW 1.8.2 | 4.7T research micro-imaging, ex-vivo | 1 | Ethernet |

---

## Pediatric Ventilation

| Vendor | Model | Firmware/OS | Role | Count | Network |
|--------|-------|------------|------|-------|---------|
| [[Hamilton Medical]] | G5 Neo Ventilator | SW 2.8 | Neonatal/pediatric modes, DUOPAP | 6 | Ethernet |
| [[Drager]] | Babylog VN500 | FW 5.4 | Synchronized neonatal ventilation | — | (NICU cross-ref) |
| [[Siemens]] | Servo-N Ventilator | FW 2.19 | Pediatric invasive & non-invasive, NIV | 4 | Ethernet |

---

## Pediatric Laboratory

| Vendor | Model | Firmware/OS | Role | Count | Network |
|--------|-------|------------|------|-------|---------|
| [[Roche]] | Cobas 6800/8800 (Peds-Volume Optimized) | SW 2.5.1 | Molecular diagnostics, low-volume peds samples | 1 | Ethernet + LOINC |
| [[Sysmex]] | XN-9000 Hematology (Peds Mode) | FW 1.21 | Automated CBC, pediatric-scaled indices | 1 | Ethernet |
| [[Abbott]] | Architect c5000 System | FW 3.8.2 | Multi-analyte immunoassay, peds reference ranges | 1 | Ethernet |
| [[Cepheid]] | GeneXpert Xpress System (Peds Panels) | FW 5.2.1 | Rapid multiplex diagnostics, peds respiratory/sepsis | 2 | Ethernet |

---

## Pediatric Pharmacy

| Vendor | Model | Firmware/OS | Role | Count | Network |
|--------|-------|------------|------|-------|---------|
| [[Omnicell]] | XT Medication Dispenser (Peds Formulary) | SW 13.1.5 | Automated medication dispensing, peds drug libraries | 2 | Ethernet + Wi-Fi |
| [[BD]] | Pyxis MedStation (Peds Formulary Unlock) | FW 4.2.1 | Controlled substance & med dispensing, peds-only locking | 4 | Wireless 802.11n |

---

## Genetics & Research (CHEO RI Pattern)

| Vendor | Model | Firmware/OS | Role | Count | Network |
|--------|-------|------------|------|-------|---------|
| [[Illumina]] | NovaSeq 6000 | Windows 10 Enterprise LTSC (Build 17763) | Next-generation sequencing, high-throughput genomics | 1 | Ethernet + iSCSI |
| [[ThermoFisher]] | SeqStudio Genetic Analyzer | FW 6.0 | Capillary electrophoresis DNA sequencing | 1 | Ethernet |
| [[10x Genomics]] | Chromium Connect System | SW 2.1.2 | Single-cell & spatial transcriptomics, library prep | 1 | Ethernet + USB3 |
| [[Beckman Coulter]] | Vi-CELL Cell Counter | FW 1.5.1 | Automated cell viability & counting, research | 1 | Ethernet |
| Mirth | Connect HL7 Gateway (Genomics) | CentOS 7 (kernel 3.10.0-1062) | HL7-based genomics data routing, EHR ↔ lab | 1 | Ethernet + TLS 1.2 |

---

## EHR & Clinical Systems

| Vendor | Model | Firmware/OS | Role | Count | Network |
|--------|-------|------------|------|-------|---------|
| [[Epic]] | Hyperspace (Ambulatory Workstations) | Windows 10 Enterprise (Build 22H2) | Clinical documentation, orders, results | 80+ | Ethernet + Wi-Fi |
| [[Epic]] | EpicCare Inpatient | Windows Server 2019 (Build 17763) | Hospital inpatient module, peds workflows | — | Ethernet (server) |
| [[Epic]] | Cogito Integration (Ambient Listening) | Cloud-native | AI-assisted documentation | — | Ethernet + HTTPS |
| [[Epic]] | Growth Charts Module | Windows 10 Enterprise | Pediatric growth percentiles, milestones | 40+ | Ethernet + Wi-Fi |
| [[Epic]] | Peds Decision Support Engine | SQL Server 2019 | Evidence-based medication dosing, calculators | — | Ethernet |

---

## Network Infrastructure

| Vendor | Model | Firmware/OS | Role | Count | Network |
|--------|-------|------------|------|-------|---------|
| [[Cisco]] | Catalyst 9600 Series Switch | IOS XE 17.9.3 | Core switching, VLAN segmentation, PoE | 2 | Ethernet + optical |
| [[Aruba]] | 6000 Series Access Point (Medical) | ArubaOS 10.3.0.5 | Wi-Fi 6 (802.11ax) for clinical devices | 48 | PoE Ethernet |
| [[Fortinet]] | FortiGate 3500F (NSaaS) | FortiOS 7.2.4 | Firewall, IPS/IDS, encrypted tunnels | 1 | Ethernet + optical |
| [[Cloudflare]] | Magic Transit Service (Cloud) | Edge-native (BGP Anycast) | DDoS mitigation, traffic filtering | — | Internet BGP |
| [[Akamai]] | Prolexic DDoS Protection (Cloud) | Akamai Intelligent Platform | Backup DDoS scrubbing, 24/7 SOC | — | Internet BGP |
| [[Forescout]] | Secure Connect (Device Fingerprinting) | Linux 6.1 (EyeInspect) | Medical device discovery, risk scoring, policy | 1 | Ethernet |

---

## Building Management (BMS)

| Vendor | Model | Firmware/OS | Role | Count | Network |
|--------|-------|------------|------|-------|---------|
| [[Honeywell]] | Niagara JACE-8000 (NICU Climate) | Niagara 4.11.112 | Building automation, NICU climate control, OR pressure | 1 | Ethernet + BACnet |

---

## Summary

| Metric | Count |
|--------|-------|
| **Total Devices** | 337+ |
| **Clinical Zones** | 8 (NICU, PICU, Imaging, Respiratory, Cardiology, Lab, Pharmacy, Research) |
| **Network-Connected Equipment** | 240+ |
| **Firmware/OS Variants** | 18 (Windows 10/7, Windows Server 2019, CentOS 7, proprietary RTOS) |
| **Wi-Fi Devices** | 140+ (802.11ac + 802.11ax) |
| **Research-Grade Systems** | 6 (genomics pipeline with pediatric cancer cohorts) |
| **Cloud Integrations** | [[Cloudflare]] (DDoS) + [[Akamai]] (backup) + [[Epic]] Cloud |
| **IEC 62443 Compliance Target** | SL-A 2 minimum (critical: ventilators, incubators, pumps); SL-C 1 research |

---

**Reference**: [[Pediatric MC CVE Cross-Reference]]

**Document**: Phase 1c Equipment Inventory  
**Lines**: 339 | **Vendors**: 22 | **CVE-Sensitive Systems**: Windows 7 IoT (CIOS Alpha), Windows 10 LTSC (Revolution Apex, NovaSeq), CentOS 7 (Mirth, Bruker) | **Created**: 2026-05-09
