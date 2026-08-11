---
title: Hyperscaler Data Center — Golden Path Asset Set
type: facility-reference-model
category: data-center
status: golden-path
domain: OT
tags: [datacenter, hyperscaler, iec62443, golden-path, cve, kev, tier-iv]
source: "108 Datacenter Hyperscaler BOM and Attack Surface.md, 109 Supplier Status to SL3/SL4, vendor DBs 20-26"
created: 2026-06-14
---

# Hyperscaler Data Center — Golden Path Asset Set

Realistic Tier IV hyperscaler data center assembled from the authoritative component research (BOM doc 108 + supplier-SL doc 109 + vendor DBs 20–26). Built to demonstrate the OXOT tiered vuln/threat correlation engine ("D"): the IT / security / network / hypervisor layer carries **firmware-confirmed CISA-KEV CVEs** (Tier-2 hero, several with active ransomware campaigns), while the OT / power / cooling / BMS layer shows realistic vendor-class context (Tier-0/1) — exactly the honest specificity ladder.

**Every CVE below is verified present + KEV-listed in `forge.cve_records`/`forge.kev_entries`, with the correct vendor↔product mapping and a firmware version the CVE actually affects** (NVD CPE version ranges). This is NOT the Ottawa narrative (whose CVE cross-reference had mis-mappings); it is corpus-verified.

## Facility
| Attribute | Value |
|---|---|
| Name | Hyperscale Regional Data Center (Tier IV) |
| Sector | datacenter / cloud-colocation |
| Tier | TIA-942 Tier IV / Uptime 99.995% |
| Scale | 15–20 MW/pod, 8–12 pods (~120–240 MW campus); 1,200–1,500 racks/pod; AI/GPU pods 40–120 kW/rack |
| Cooling | central chilled water + in-row + direct-to-chip (CDU) + immersion for AI pods |
| Redundancy | 2N power, 2N cooling, N+2 concurrently maintainable |

## Systems / IEC 62443 zones (from BOM zone map §"IEC 62443 Zone Map")
| Zone | Purdue | System | SL-T | Protocols |
|---|---|---|---|---|
| Z0 / Enterprise IT | L4–L5 | Business / ITSM / DCIM dashboards | 2 | HTTPS, REST |
| Z1 / DCIM-BMS Mgmt (IDMZ) | L3–L3.5 | DCIM servers, BMS historian, OT IDS, jump/PAM | 2–3 | HTTPS, OPC UA, BACnet/SC |
| Z2 / Building Automation & Supervisory | L2 | BMS head-ends, EPMS, chiller/gen/UPS controllers, CDU, physical security | 2–3 | BACnet/IP, Modbus TCP, SNMPv3, OPC UA |
| Z3 / Field Devices | L0–L1 | DDC controllers, protection-relay IEDs, meters, sensors, VFDs, ATS, rack PDUs, CRAC/CRAH | 1–2 | BACnet MS/TP, Modbus RTU, IEC 61850 GOOSE, 4–20 mA |
| Z4 / SIS (isolated) | SIS | Fire alarm panels, gaseous suppression, VESDA, EPO | 2–3 | SLC, RS-485, dry contact |
| Z5 / OOB | L3.5 DMZ | Serial console / jump / bastion | 3 | SSH, HTTPS (proxied), TLS 1.3 |
| IT-Net / Network Fabric | L3–L3.5 | Spine/leaf/border + DMZ firewalls + remote-access | 3 | BGP, OSPF, VXLAN, TLS |
| IT-Compute | L3 | Servers, hypervisors, HCI | 1–3 | Redfish/IPMI, vCenter API |
| IT-Storage | L3 | SAN/NAS, HSM | 1–3 | iSCSI, NFS, FC, KMIP |

## Equipment — Tier-2 KEV heroes (IT / security / network / hypervisor)
**Each firmware version below is in the CVE's affected range → the matcher's version-range check yields a CONFIRMED (Tier-2) exploitable finding.**

| System | Vendor | Product / Model | Firmware (vulnerable) | component_class | CVE anchor (KEV) | CVSS / EPSS / ransomware |
|---|---|---|---|---|---|---|
| Tenant DMZ | Palo Alto Networks | PA-5450 NGFW | PAN-OS 11.1.0 | firewall | CVE-2024-3400 (GlobalProtect cmd-inj) | 10.0 / 0.94 / ransomware |
| Tenant DMZ | Fortinet | FortiGate 7081F | FortiOS 7.4.1 | firewall | CVE-2024-21762 (SSL-VPN OOB write) | 9.8 / 0.93 / ransomware |
| Tenant DMZ (2nd) | Fortinet | FortiGate 600F | FortiOS 7.2.4 | firewall | CVE-2023-27997 (XORtigate) | 9.8 / 0.90 / ransomware |
| Network core | Cisco | Catalyst 9500 | IOS XE 17.9.4 | switch | CVE-2023-20198 (Web UI priv-esc) | 10.0 / 0.94 |
| WAN edge | Cisco | ASA 5555-X | ASA 9.16(4) | firewall | CVE-2023-20269 (VPN brute/unauth) | 9.1 / 0.01 / ransomware |
| WAN edge (leaf) | Juniper | SRX1500 | Junos 22.4R1 | firewall | CVE-2023-36845 (J-Web PHP env) | 9.8 / 0.94 |
| Remote access | Ivanti | Connect Secure VPN | ICS 22.5R1 | vpn_gateway | CVE-2024-21887 + CVE-2023-46805 chain | 9.1 / 0.94 / ransomware |
| App delivery | Citrix | NetScaler ADC | 13.1-48.47 | adc_loadbalancer | CVE-2023-4966 (Citrix Bleed) | 9.4 / 0.94 / ransomware |
| Virtualization mgmt | VMware | vCenter Server | 8.0 U1 | hypervisor_mgmt | CVE-2023-34048 (DCERPC heap) | 9.8 / 0.93 |
| Managed file transfer | Progress | MOVEit Transfer | 2023.0.0 | file_transfer | CVE-2023-34362 (SQLi → RCE) | 9.8 / 0.94 / ransomware |

## Equipment — realistic OT / facility layer (Tier-0/1 context; sparse public CVEs by design)
| System | Vendor | Product | Firmware | component_class | Zone | Tier note |
|---|---|---|---|---|---|---|
| UPS | Schneider Electric | Galaxy VX + NMC3 card | NMC3 v1.x | ups | Z2 | vendor-class (SL-2 cert per doc 109) |
| UPS | Vertiv | Liebert EXL S1 + RDU | RDU v2.x | ups | Z2 | vendor-class |
| Rack PDU | Schneider APC | NetShelter rPDU (AP8xxx) | AOS 6.x | pdu | Z2 | vendor-class (APC CPE present) |
| Gen paralleling | ComAp | InteliGen NTC | 2.x | generator_control | Z2 | vendor-class |
| Chiller | Johnson Controls / York | YZ magnetic-bearing | OptiView | chiller | Z2 | vendor-class |
| CRAH | Vertiv | Liebert PDX/iCOM | iCOM v8.x | crah | Z2 | vendor-class |
| CDU (liquid cooling) | Motivair | XDU CDU | controller fw | cdu | Z2 | vendor-class (AI pod) |
| BMS controller | Tridium | JACE-8000 (Niagara) | Niagara 4.13 | bms_controller | Z2 | vendor-class (Tridium CPE present; some CVEs) |
| BMS head-end | Johnson Controls | Metasys | — | bms_headend | Z2 | vendor-class |
| EPMS meter | Schneider | PowerLogic ION9000 | — | power_meter | Z3 | field device |
| Protection relay | Schweitzer (SEL) | SEL-735 | v6.x | protection_relay | Z3 | IEC 61850 IED |
| Industrial switch | Moxa | EDS-4000 | fw v3.x | ot_switch | Z3 | vendor-class (Moxa CPE present; some CVEs) |
| OT firewall | Siemens | RUGGEDCOM / SCALANCE | — | ot_firewall | Z1/Z3 | vendor-class (Siemens CVEs/some KEV) |
| Physical access | Genetec / LenelS2 | Security Center | — | pacs | Z2 | vendor-class |
| Fire alarm (SIS) | Honeywell | Notifier | — | fire_panel | Z4 | isolated SIS |
| Jump/PAM | CyberArk | PAM bastion | — | pam | Z5 | OOB |

## Key cyber-physical attack scenarios (for threat correlation, from BOM appendix)
- **Cooling shutdown** — compromise BMS/CDU (Z2) → raise chiller setpoint / stop CRAH → thermal runaway on AI pods. Assets: Tridium JACE, Motivair CDU, Vertiv CRAH.
- **Power sabotage** — UPS/generator firmware downgrade + ATS disable → electrical cascade. Assets: Schneider/Vertiv UPS, ComAp paralleling, ASCO ATS.
- **Edge breach → lateral** — PAN-OS/FortiOS/Ivanti/Citrix KEV exploit (T1190) → pivot to DCIM/BMS via flat OOB. Assets: the Tier-2 hero set above.
- **Supply-chain firmware backdoor** — Cisco IOS XE / switch firmware (T1195) → BGP hijack / traffic mirror.
ATT&CK: T1190 (exploit public-facing), T1133 (external remote services — Ivanti/Citrix VPN), T1195 (supply chain), T1485/T1565 (BMS sabotage). Actors: Volt Typhoon (pre-positioning), Sandworm (destructive OT), APT29 (espionage), ransomware affiliates (the KEV-ransomware flags).

## Supplier SL readiness (doc 109 — feeds vendor-risk composite)
- SL-2 achievable: Schneider NMC3 (UPS card), Vertiv RDU120, Eaton Network-M3, Cisco IE3x00 / Belden / Moxa OT switches, Honeywell/Siemens Desigo BMS.
- SL-3: Saia-Burgess PCD QronoX (niche). SL-4: none commercially (2025).
- Critical gap (high supplier risk): UPS power stage, ATS, generator controllers, CRAC/CRAH, CDU, PDU, DCIM platforms hold NO IEC 62443-4-2 certification.

## Build note
This catalogue is the source for the golden-path facility/template the D engine will adopt. The matcher must: normalize vendor (Palo Alto Networks→paloaltonetworks, Schneider Electric→schneider-electric), match vendor+product→CPE, and apply the firmware version against the CVE's CPE version range to mark Tier-2 CONFIRMED. The 10 hero assets above are pre-verified to yield Tier-2 KEV findings against the live corpus.
