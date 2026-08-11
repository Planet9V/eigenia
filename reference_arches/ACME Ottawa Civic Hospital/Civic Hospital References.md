---
aliases: [References, Sources, Bibliography]
type: facility-reference-model
category: acute-care-hospital
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-civic-hospital, phase/1c, sector/healthcare, references/standards, references/vendor-docs, references/threat-intelligence]
related: ["[[ACME Ottawa Civic Hospital]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Civic Hospital References

## Standards & Frameworks

| Standard | URL | Scope |
|----------|-----|-------|
| **[[IEC 62443-3-3]]** | https://www.iec.ch/ | Industrial automation/control systems security; security zones (SL-1 to SL-4) |
| **[[IEC 80001-1:2010]]** | https://www.iec.ch/ | Healthcare IT network security; medical device risk management |
| **[[ISO 14971:2019]]** | https://www.iso.org/ | Medical device risk management; FMEA/HAZOPS framework |
| **[[ISO 60601]] (Series)** | https://www.iso.org/ | Medical electrical equipment safety standards |
| **[[HIPAA]] Security Rule (45 CFR 164)** | https://www.hhs.gov/ | US healthcare cybersecurity baseline (adopted by Canadian hospitals) |
| **[[PHIPA]]** (Ontario) | https://www.ontario.ca/ | Personal Health Information Protection Act; breach notification mandate |
| **[[PIPEDA]]** (Federal) | https://www.priv.gc.ca/ | Federal privacy law; personal information protection |
| **[[NIST CSF 2.0]]** | https://www.nist.gov/ | Identify, Protect, Detect, Respond, Recover (Purdue Model alignment) |
| **[[NIST SP 800-82 Rev 3]]** | https://www.nist.gov/ | Guidelines for OT/IT security convergence |
| **[[FDA]] 21 CFR Part 11** | https://www.fda.gov/ | Electronic records, signatures; audit trail |
| **[[FDA]] Postmarket Cybersecurity Guidance (2023)** | https://www.fda.gov/ | Supply-chain security for medical device manufacturers |
| **[[NIST SSDF v1.1]]** | https://www.nist.gov/ | Secure Software Development Framework; vendor attestation |
| **[[AAMI TIR57]]** | https://www.aami.org/ | [[RBAC]], validation, security for clinical IT systems |
| **[[HL7]] [[FHIR]] Release 5** | https://www.hl7.org/fhir/ | Healthcare interoperability standard |
| **[[DICOM]] Standard (PS3.x)** | https://www.dicomstandard.org/ | Medical imaging communication; [[PACS]] protocol |
| **[[HHS]] Cybersecurity Performance Goals (CPG)** | https://www.hhs.gov/ | U.S. healthcare sector best practices (ransomware defense, [[MFA]], EDR, patch mgmt) |
| **[[Bill C-26]] / CCSPA (2024)** | https://www.parl.ca/ | Critical infrastructure designation (healthcare may be added) |
| **Ontario Public Hospitals Act** | https://www.ontario.ca/ | Board governance, public accountability |

## Vendor Documentation

### EHR & Clinical Systems
| Vendor | Product | Link |
|--------|---------|------|
| **[[Epic Systems]]** | [[Hyperspace]], Caché Database, [[HL7]] integration | https://www.epic.com/ |
| **[[Citrix]]** | XenDesktop, remote access | https://www.citrix.com/ |
| **Rhapsody** | [[HL7]] message broker (iNTERFACE) | https://www.rhapsody.health/ |
| **Mirth Connect** | NextGen [[HL7]] broker | https://www.nextgen.com/ |

### Bedside & Monitoring
| Vendor | Product | Link |
|--------|---------|------|
| **[[Philips Healthcare]]** | IntelliVue monitors, Respironics ventilators, ultrasound | https://www.philips.com/healthcare |
| **[[GE Healthcare]]** | Carescape monitors, Optima CT/[[PACS]], Datex-Ohmeda | https://www.gehealthcare.com/ |
| **[[Mindray]]** | Bedside monitors, ultrasound, lab analyzers | https://www.mindray.com/ |
| **[[Baxter]]** | Sigma Spectrum infusion pumps, Exactamix IV automation | https://www.baxter.com/ |
| **[[BD]]** | Alaris pumps, Pyxis MedStation | https://www.bd.com/ |
| **Dräger** | Atlan A300 anesthesia workstations | https://www.draeger.com/ |
| **Stryker** | OpsStation boom arms, InTouch beds | https://www.stryker.com/ |

### Imaging & PACS
| Vendor | Product | Link |
|--------|---------|------|
| **[[Siemens Healthineers]]** | CIOS c-arm, CT/MRI infrastructure | https://www.siemens-healthineers.com/ |
| **Sectra** | [[PACS]] 25 (Windows Server 2019) | https://www.sectra.com/ |

### Lab & Pharmacy
| Vendor | Product | Link |
|--------|---------|------|
| **Sysmex** | XN-9000 hematology analyzer | https://www.sysmex.com/ |
| **Roche** | Cobas 8000 chemistry analyzer | https://www.roche.com/ |
| **Abbott** | Architect i2000SR immunoassay | https://www.abbott.com/ |
| **Omnicell** | XT drug-dispensing robot | https://www.omnicell.com/ |
| **Cepheid** | GeneXpert Omni (point-of-care) | https://www.cepheid.com/ |

### BMS & Facility
| Vendor | Product | Link |
|--------|---------|------|
| **[[Honeywell]]** | Niagara JACE-8000 ([[BMS]] controller) | https://www.honeywell.com/ |
| **Johnson Controls** | Metasys HVAC/energy management | https://www.johnsoncontrols.com/ |
| **Schneider Electric** | EcoStruxure Building (lighting + occupancy) | https://www.se.com/ |
| **Eaton** | 93PX [[UPS]] (500 kVA) | https://www.eaton.com/ |

### Network Infrastructure
| Vendor | Product | Link |
|--------|---------|------|
| **[[Cisco]]** | Catalyst 9400/9300L, Aironet 9120, ISE 3.2 | https://www.cisco.com/ |
| **Aruba** | CX 6300 switches, ClearPass rogue detection | https://www.arubanetworks.com/ |
| **Fortinet** | FortiGate 1500D firewalls | https://www.fortinet.com/ |
| **[[Palo Alto Networks]]** | Prisma threat prevention | https://www.paloaltonetworks.com/ |

### Backup & Disaster Recovery
| Vendor | Product | Link |
|--------|---------|------|
| **[[Veeam]]** | Backup & Replication; Immutable Backup | https://www.veeam.com/ |
| **CommVault** | Backup/archival | https://www.commvault.com/ |

### Security & Monitoring
| Vendor | Product | Link |
|--------|---------|------|
| **Microsoft** | Defender for Endpoint ([[EDR]]), [[Entra ID]] | https://www.microsoft.com/ |
| **[[CrowdStrike]]** | Falcon behavioral detection | https://www.crowdstrike.com/ |
| **[[Forescout]]** | CounterACT medical device discovery | https://www.forescout.com/ |
| **Splunk** | SIEM + Threat Intelligence | https://www.splunk.com/ |

## Threat Intelligence & Advisories

| Source | Reference | Link |
|--------|-----------|------|
| **[[CISA]]** | #StopRansomware AA23-353A ([[BlackCat]]/ALPHV) | https://www.cisa.gov/ |
| **[[Krebs on Security]]** | [[BlackCat]] Ransomware Group Implodes (March 2024) | https://krebsonsecurity.com/ |
| **CBC News** | [[LockBit]] Apologizes for [[SickKids Hospital]] Attack | https://www.cbc.ca/ |
| **Rapid7** | [[VMware]] [[ESXi]] [[CVE-2024-37085]] Targeted in Ransomware | https://www.rapid7.com/ |
| **[[Veeam]] Blog** | Ransomware Vulnerability [[CVE-2024-40711]] | https://www.veeam.com/products/veeam-data-platform/ |
| **[[MITRE ATT&CK]]** | Healthcare Techniques (T1199, T1078, T1486, T1567) | https://attack.mitre.org/ |
| **[[CSIS]]** | Securing Canada's Healthcare Sector (2022) | https://www.csis-scrs.gc.ca/ |

## Canadian Healthcare Regulatory & Policy

| Agency | Resource | Link |
|--------|----------|------|
| **Ontario Health** | Provincial [[EHR]] strategy, LHIN coordination | https://www.ontariohealth.ca/ |
| **Ontario Information & Privacy Commissioner** | [[PHIPA]] enforcement, breach guidance | https://www.ipc.on.ca/ |
| **Health Canada** | Medical device postmarket surveillance | https://www.canada.ca/health |
| **PHAC** (Public Health Agency of Canada) | Healthcare sector alerts, pandemic planning | https://www.canada.ca/phac |
| **Privacy Commissioner of Canada** | [[PIPEDA]] guidance | https://www.priv.gc.ca/ |

## Architecture & Reference Materials

| Domain | Reference |
|--------|-----------|
| **Purdue Model** | OT/IT convergence for industrial control ([[IEC 62443]] Zones L0–L3) |
| **[[SCADA]] Security** | [[NIST]] 800-82 + [[IEC 62443]] zone isolation |
| **Wireless Medical** | 802.11ax + 802.1X EAP-TLS, fast roaming (802.11r) |
| **Healthcare Protocols** | [[HL7v2]] (MLLP), [[HL7]] [[FHIR]] (RESTful), [[DICOM]], [[ASTM]], [[BACnet/IP]], Modbus TCP, [[SIP]], ONVIF |

## Glossary

- **[[EHR]]**: Electronic Health Record
- **[[PACS]]**: Picture Archiving and Communication System
- **[[HVAC]]**: Heating, Ventilation, Air Conditioning
- **[[BMS]]**: Building Management System
- **[[OT]]**: Operational Technology
- **[[IT]]**: Information Technology
- **[[PHI]]**: Personal Health Information
- **[[MFA]]**: Multi-Factor Authentication
- **[[EDR]]**: Endpoint Detection & Response
- **[[SIEM]]**: Security Information & Event Management
- **[[PAM]]**: Privileged Access Management
- **[[RTO]]**: Recovery Time Objective
- **[[RPO]]**: Recovery Point Objective

---

**Document**: Civic Hospital References  
**Compilation Date**: May 2026

## See also

[[ACME Ottawa Civic Hospital]] · [[Civic Hospital Equipment]] · [[Civic Hospital CVE Cross-Reference]]
