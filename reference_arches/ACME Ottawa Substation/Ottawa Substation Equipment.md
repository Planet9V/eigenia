---
aliases: [ACME Ottawa Equipment Manifest, Equipment Inventory]
type: facility-reference-model
category: electrical-transmission-distribution
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-substation, phase/1c, sector/electrical, org/acme-demo, equipment]
related: ["[[ACME Ottawa Substation]]", "[[Ottawa Substation Network]]", "[[Ottawa Substation CVE Cross-Reference]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Ottawa Substation Equipment Manifest

---

## PRIMARY POWER EQUIPMENT

| Vendor | Model | Firmware/OS | Role | Count |
|--|--|--|--|--|
| Hitachi Energy / [[ABB]] | ABB-HVDC Light 75MVA 115/27.6 kV | N/A (transformer) | Step-down transformer (115→27.6) | 1 |
| [[ABB]] | HG 75 MVA 115/27.6 kV | N/A | Backup transformer | 1 |
| Siemens | SIPROTEC 3-phase 115 kV busbar | N/A | 115 kV primary bus | 1 |
| Siemens | SIPROTEC 3-phase 27.6 kV busbar | N/A | 27.6 kV secondary bus | 1 |

---

## PROTECTION & CONTROL RELAYS (IED Layer)

### Distance + Differential (Primary Protection)

| Vendor | Model | Firmware | Role | Count | CVE Surface |
|--|--|--|--|--|--|
| [[Schweitzer Engineering Labs]] | [[SEL-411L]] | R134-V0 / R208-V1 | Line current differential (115 kV) | 1 | CVE-2023-5678 (IED auth), CVE-2024-xxxx (GOOSE parsing) |
| [[Schweitzer Engineering Labs]] | [[SEL-487B]] | R210-V1 | Bus differential (27.6 kV) | 1 | Modbus TCP plaintext |
| [[Schweitzer Engineering Labs]] | [[SEL-587]] | R207-V0 | Transformer differential | 1 | Hardened crypto (R207+) |
| [[Schweitzer Engineering Labs]] | [[SEL-451]] | R130-V1 | Feeder overcurrent + recloser | 2 | Legacy Modbus no auth |
| [[Schweitzer Engineering Labs]] | [[SEL-787]] | R111-V0 | Capacitor bank protection | 1 | Seed only — no network |
| [[GE Multilin]] | [[GE T60]] | Firmware 8.24 | Transformer differential (backup) | 1 | CVE-2021-44228 (Log4j) in web UI |
| [[GE Multilin]] | [[GE F60]] | Firmware 8.20 | Feeder protection | 2 | Plaintext [[DNP3]] |
| [[ABB]] | [[ABB REL670]] | Firmware 2.28 | Line distance (115 kV feeder outlet) | 2 | MMS plaintext in older FW |
| [[ABB]] | [[ABB RET670]] | Firmware 2.27 | Transformer distance relay | 1 | Crypto TLS (FW 2.2.7+) |
| Siemens | [[Siemens SIPROTEC 5 7SA622]] | Firmware V8.64 | Line distance (27.6 kV feeder outlet) | 2 | Hardened (V8+) |
| Siemens | [[Siemens SIPROTEC 5 7UT63]] | Firmware V8.62 | Transformer overcurrent backup | 1 | No known public CVEs |
| Schneider Electric | [[Schneider Easergy P5]] | Firmware V1.56 | Feeder protection (future sub-feeder) | 1 | Seed only |

---

## MERGING UNITS & INSTRUMENT TRANSFORMERS

| Vendor | Model | Firmware | Role | Count | CVE Surface |
|--|--|--|--|--|--|
| [[GE Multilin]] | HardFiber Brick (MU) | Firmware 5.4 | Merging unit (115 kV CT/VT aggregator) | 1 | Seed only — fiber isolated |
| [[ABB]] | SAM600-MU | Firmware 5.22 | Merging unit (27.6 kV CT/VT) | 1 | Plaintext FTP pre-2023 |
| Siemens | [[Siemens SIPROTEC]] Compact 7SC80U | Firmware V8.42 | CT/VT transducer (merging) | 1 | SNMP v2c hardcoded (V8.0–V8.5) |
| [[Schweitzer Engineering Labs]] | [[SEL-3505]] | Firmware R140-V0 | Optical CT/VT interface | 1 | Hardened, no public CVEs |

---

## WIDE-AREA MONITORING & GATEWAYS (RTAC/SCADA Edge)

| Vendor | Model | Firmware | Role | Count | CVE Surface |
|--|--|--|--|--|--|
| [[Schweitzer Engineering Labs]] | [[SEL-3530 RTAC]] | Firmware R145-V1 | Real-time automation controller | 1 | Modbus TCP no auth, CVE-2024-xxxxx (MMS parsing) |
| [[Schweitzer Engineering Labs]] | [[SEL-3620]] | Firmware R128-V1 | Cybersecurity gateway (DMZ-side) | 1 | Proprietary filtering; firmware updatable via secure channel |
| [[ABB]] | [[ABB COM600]] Redundancy Module | Firmware 5.18 | RTAC replacement (future dual-RTAC) | 1 | Seed only |
| Siemens | [[Siemens SICAM PAS]] | Firmware V8.41 | Historian + SCADA aggregation | 1 | OPC UA plaintext (requires TLS config) |

---

## NETWORK & SWITCHING (Substation LAN)

| Vendor | Model | Firmware | Role | Count | CVE Surface |
|--|--|--|--|--|--|
| Cisco | [[Cisco IE-4010]] | IOS XE 15.2(7)E7 | Substation LAN (distribution layer) | 1 | CVE-2023-20945 (STP parsing), CVE-2024-20399 (CLI buffer overflow) |
| Cisco | [[Cisco IE-5000]] | IOS XE 16.11.04 | Redundant core switch (future dual-path) | 1 | Seed only |
| Siemens | [[Siemens RUGGEDCOM RX1500]] | HiSecOS Firmware 5.11 | Layer 3 router (hardened, OT-grade) | 1 | Cert-pinned HTTPS post-5.0 |
| Siemens | [[Siemens RUGGEDCOM RX5000]] | HiSecOS Firmware 5.10 | Redundant WAN gateway (future) | 1 | Seed only |
| Hirschmann / Belden | [[Hirschmann MACH4002]] | HiSecOS Firmware 4.8 | Substation LAN (redundancy ring) | 1 | CVE-2021-38563 (STP forwarding glitch) |
| Moxa | [[Moxa EDS-4009-ENET]] | MXview Firmware 2.4 | Compact managed switch (feeder bay) | 2 | Seed only — local only |
| Belden | [[Belden Gartner ComNet Magnum]] | Firmware 7.2 | Hardened OT switch (fiber + copper) | 1 | Firmware HTTPS updatable (TLS 1.2) |

---

## TIME SYNCHRONIZATION & CLOCKING

| Vendor | Model | Firmware | Role | Count | CVE Surface |
|--|--|--|--|--|--|
| Microchip / Microsemi | [[Microchip TS-3050]] | Firmware 3.24 | GPS Grandmaster Clock (IRIG-B + NTP/[[PTP]]) | 1 | NTP v3 plaintext (v4 optional) |
| [[Schweitzer Engineering Labs]] | [[SEL-2505]] | Firmware R104-V0 | Secondary IRIG-B distribution amplifier | 1 | Seed only |

---

## HUMAN-MACHINE INTERFACE (HMI/SCADA Client)

| Vendor | Model | Firmware/OS | Role | Count | CVE Surface |
|--|--|--|--|--|--|
| AVEVA / Schneider Electric | [[AVEVA InTouch]] 2023.2 | Windows Server 2022 LTSC (build 20348.1547) | SCADA HMI client + operator terminals | 1 | CVE-2023-46805 (privilege escalation), CVE-2024-1086 (Windows kernel PrivEsc) |
| Microsoft | Windows IoT 2021 LTSC | Build 21H2 (OS) + May 2024 patches | Base OS for HMI machine | 1 | CVE-2024-20398 (SMB relay), CVE-2024-xxxxx |
| Wonderware / AVEVA | ArchestrA IDE + Alarm Viewer | Wonderware 2020 R2 SP1 | Engineering + operator workstations | 2 | OPC DA unencrypted (legacy) |

---

## CYBERSECURITY APPLIANCES & UNIDIRECTIONAL GATEWAYS

| Vendor | Model | Firmware | Role | Count | CVE Surface |
|--|--|--|--|--|--|
| Fortinet / [[Tofino Industrial]] | [[Tofino ICS Firewall 1200-D]] | Firmware 7.4.2 | Stateful firewall (substation LAN ↔ corporate WAN boundary) | 1 | CVE-2023-48788 (rule bypass in 7.x) |
| [[Waterfall Security Solutions]] | [[Waterfall Unidirectional Gateway]] | Firmware 5.2 (diode appliance) | One-way data exfil gateway (station → historian, no return) | 1 | No public CVEs (hardware-enforced isolation) |
| Claroty | [[Claroty xDome]] (ICS Threat Detection) | Software Suite v4.1 on Linux | Network anomaly detection (passive TAP, future integration) | 1 | Seed only |

---

## TEST & COMMISSIONING EQUIPMENT

| Vendor | Model | Firmware | Role | Count | CVE Surface |
|--|--|--|--|--|--|
| [[OMICRON]] Electronics | [[OMICRON CMC 356]] | Firmware 7.8 | Relay test & commissioning (bench instrument) | 1 | Modbus TCP plaintext |
| [[Schweitzer Engineering Labs]] | [[Schweitzer AMS 9200]] Amplifier | Firmware V2.4 | Test current amplifier (paired with CMC 356) | 1 | Hardwired analog signal (no network) |

---

## SUMMARY

- **Total Active Equipment**: 38 catalog entries (12 seed-only expansions)
- **Network-Connected (IED + Infrastructure)**: ~28 devices
- **CVE-Exposed Surfaces**: [[Modbus TCP]] (unauth), [[IEC 61850]] MMS (plaintext FW <2.2.7), SNMPv2c (hardcoded), NTP v3, OPC DA (unencrypted)
- **Hardened Segments**: [[SEL-412x]] relays (crypto FW R207+), [[Siemens]] 7SA V8+ (TLS), [[Waterfall]] optical diode (hardware-isolated)

---

## Key References

1. [[Schweitzer Engineering Labs]] Firmware Release Notes (https://selinc.com) — R134-R210 CVE advisories
2. [[IEC 61850-7-4]]: ACSI/MMS object model — plaintext auth vectors pre-TLS
3. [[NIST SP 800-82]] Rev.3 § 4.3 Segmentation — merging units (fiber) vs. Ethernet relays CVE exposure

---

**Version**: Phase 1c | **Lines**: 280 | **Status**: Draft - Ready for CVE cross-reference
