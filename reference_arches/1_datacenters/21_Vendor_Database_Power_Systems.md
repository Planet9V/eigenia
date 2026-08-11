---
tags: [tetrel, datacenter, vendors, power, plc, ups, generators, iec62443, ocp-safe]
created: 2026-04-29
source: Multi-source research (Perplexity, WebSearch, vendor documentation)
---

# Datacenter Vendor Database: Power Systems

*Comprehensive vendor database for PLCs, PDUs, UPS, Backup Generation, Substation Systems, and Electrical Distribution used in hyperscale and enterprise data centers. Cross-referenced against [[09_Datacenter_Components_and_Suppliers]] and [[10_Hyperscale_Ecosystem_Deep_Dive]].*

> [!info] Certification Key
> - **OCP S.A.F.E.**: Currently limited to compute/silicon vendors (AMD, Intel, SK Hynix, AMI, Nuvoton). No power/OT infrastructure vendors hold this certification as of April 2026.
> - **IEC 62443-4-2**: Component-level security certification with Security Levels (SL-1 through SL-4)
> - **SIL**: Safety Integrity Level per IEC 61508 (SIL 1-4)

---

## 1. Programmable Logic Controllers (PLCs)

| Vendor | Product Lines | Customers | Revenue/Size | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL Rating |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| Siemens AG | SIMATIC S7-1200, S7-1500, S7-300/400; Desigo CC (BMS); PCS 7 (DCS) | Hyperscalers, colocation, industrial | $87.3B rev; ~318K employees | $220B | Largest global automation vendor; integrated BMS+PLC | CVE-2022-38465 (key extraction); CVE-2022-38773 (unpatchable firmware, 100+ S7-1500 models); CyberAv3ngers targeting | No | PCS 7: 62443-4-1 + 62443-3-3 (first TUV SUD cert); S7-1500: per 62443-4-1 | S7 F-series: SIL 3 |
| Schneider Electric | Modicon M580, M340, M241/M251/M258; EcoStruxure Building | Hyperscalers, Equinix, Digital Realty | $47.2B rev; ~150K employees | ~$140B | Integrated power+automation+BMS | CVE-2022-45788/45789 (OT:ICEFALL RCE); CVE-2024-3596 (RADIUS bypass, CVSS 9.0); CVE-2024-11737 (Modbus, CVSS 9.8) | No | Modicon: per 62443-4-1; EcoStruxure per 62443-3-3 | Modicon M580: SIL 3 |
| ABB Ltd | AC500, AC500-S (safety); Ability Symphony Plus (DCS) | Industrial, utilities, datacenter BMS | $33.2B rev; ~140K employees | ~$100B | Strong electrification + automation; AC500 certified secure-by-design | CVE-2024-51547 (hard-coded creds, CVSS 9.3); CVE-2025-53187 (ASPECT auth bypass, CVSS 9.8) | No | **AC500: IEC 62443-4-2 certified (TUV SUD)**; 62443-4-1 ML certified | AC500-S: SIL 3 |
| Rockwell Automation | Allen-Bradley ControlLogix 5580, CompactLogix 5480, GuardLogix | Hyperscalers (DC automation framework) | $8.3B rev; ~28K employees | $44.5B | US-dominant; PAC architecture; DC automation whitepaper | CVE-2023-3595 (RCE, CVSS 9.8, nation-state); CVE-2024-6242 (Trusted Slot bypass, CVSS 8.4); 9 CVEs in 2025 | No | **ControlLogix 5580: IEC 62443-4-2 certified; SDL: 62443-4-1 ML4** (highest) | GuardLogix: SIL 3 |
| Honeywell | Experion PKS, ControlEdge PLC, C300; EBI (BMS) | Datacenter BMS, process industries | $37.4B rev; ~95K employees | $155.6B | Strong BMS presence; mission-critical facility control | CVE-2025-2521 (OneWireless buffer overflow, CVSS 8.6) | No | Experion: per 62443-3-3; development per 62443-4-1 | Experion C300: SIL 3 |
| Mitsubishi Electric | MELSEC iQ-R, iQ-F (FX5U), Q/L series; ICONICS SCADA | Asian hyperscalers; DCIM via ICONICS | $37.6B rev; ~146K employees | $57.6B | Acquired ICONICS (2019) + Nozomi Networks (2025) for DC cybersecurity | CVE-2023-1424 (MELSEC FX5U buffer overflow, **CVSS 10.0**); CVE-2024-0802 (RCE, CVSS 9.8) | No | Development per 62443-4-1 | MELSEC iQ-R Safety: SIL 2 |
| Phoenix Contact | PLCnext AXC F 1152/2152/3152; PLCnext Safety RFC 4072S | Building automation, edge DC | ~$3.6B rev; ~21K employees | Private | **First IEC 62443-4-2 SL2 certified PLC on market** | Fewer CVEs than legacy vendors; newer platform | No | **PLCnext: IEC 62443-4-2 SL2 + 62443-4-1 ML3** (TUV SUD) | RFC 4072S: SIL 3 |
| Beckhoff Automation | TwinCAT, CX series embedded PCs, EtherCAT I/O | Building automation, edge DC | ~$1.25B rev; ~5K employees | Private | PC-based control; EtherCAT inventor; Industry 4.0 pioneer | Limited public CVEs | No | Development per 62443-4-1 | TwinSAFE: SIL 3 |
| WAGO | PFC200, PFC100, 750 series I/O; BACnet controllers | Building automation, HVAC | ~$1.2B rev; ~9K employees | Private | Compact modular I/O; strong BACnet/building automation | CVE-2019-5134 through 5138 (PFC200 multiple vulns) | No | PFC200: per 62443-4-1 | Not SIL rated |
| Yokogawa Electric | CENTUM VP (DCS), STARDOM, FA-M3 | Process industries, utility DC | $3.7B rev; ~20K employees | $6.9B | Process control leader; robust safety systems | CVE-2023-26593 (CENTUM hardcoded password) | No | CENTUM VP: ISASecure SDLA + SSA certified | ProSafe-RS: SIL 3 |
| Emerson (DeltaV) | DeltaV DCS, ROC800, FB3000 | Process industries, some DC | $18.0B rev; ~73K employees | $80.8B | Process automation leader | Multiple DeltaV CVEs historically | No | DeltaV: ISASecure SSA + SDLA certified | DeltaV SIS: SIL 3 |
| Unitronics | Vision, Samba, UniStream | Water/wastewater, small facilities | ~$50M rev; ~200 employees | Private (Israel) | Low-cost integrated PLC+HMI | **CyberAv3ngers (IRGC) compromised 75+ devices in US critical infrastructure, Nov 2023; default credentials** | No | No certification | No SIL rating |

> [!warning] High-Risk PLC Vulnerabilities
> - **Siemens S7-1500**: Unpatchable hardware vulnerability (CVE-2022-38773) in 100+ models. Siemens says no fix planned.
> - **Mitsubishi MELSEC FX5U**: Buffer overflow scored **CVSS 10.0** (CVE-2023-1424).
> - **Rockwell ControlLogix**: Nation-state exploit (CVE-2023-3595, CVSS 9.8).
> - **Unitronics**: IRGC CyberAv3ngers compromised 75+ devices via default credentials.

---

## 2. Power Distribution Units (PDUs)

| Vendor | Product Lines | Customers | Revenue/Size | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL Rating |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| Schneider Electric (APC) | APC Rack PDU (Metered, Switched, MBO); NetShelter; ASCO PDU | AWS, Microsoft, Google, Meta, Equinix | $47.2B rev (group); PDU market leader | ~$140B | Market leader; deepest SKU portfolio; NMC management cards | CVE-2021-22810 (NMC2 XSS); default passwords; TLStorm (2022) | No | NMC: no 62443-4-2 cert | N/A |
| Vertiv (Geist/Liebert) | Geist rPDU, Liebert MPX/MPH; PowerIT rack transfer switch | Microsoft, Google, colocation | $10.2B rev; ~28K employees | $113B | #2 global; 80% revenue from DC | Limited PDU-specific CVEs | No | No 62443-4-2 cert | N/A |
| Eaton | ePDU G3 (Metered, Switched, Managed) | Hyperscalers, enterprise | $27.4B rev; ~97K employees | ~$130B | Strong electrical heritage; acquired Tripp Lite (2021) | CVE-2025-67450, CVE-2025-59887 (UPS Companion RCE, CVSS 8.6) | No | No 62443-4-2 cert | N/A |
| Legrand (Raritan/Server Tech) | Raritan PX3/PX4 iPDU; Server Tech PRO3X/HDOT; Starline Track Busway | AWS, Microsoft, Equinix, CyrusOne | $9.5B rev (group); ~40K employees | $45.3B | Broadest PDU portfolio via acquisitions | Raritan: older firmware web interface vulns | No | No 62443-4-2 cert | N/A |
| CyberPower Systems | PDU41000 series (Switched, Metered, MBO) | Mid-market enterprise, colocation | $381M rev | Private (Taiwan) | Value-oriented; strong channel; SMB focus | Limited public CVEs | No | No certification | N/A |
| nVent (Enlogic) | Enlogic EN series high-density iPDU | AI/HPC DC, hyperscalers | ~$3.1B rev (group) | ~$11B | "Cyber secure iPDU"; high-density AI power (30kW+/rack) | Limited public CVEs | No | No 62443-4-2 cert | N/A |
| Panduit | SmartZone G5 iPDU | Enterprise, colocation | ~$5B rev (est.) | Private | Physical infrastructure + cabling + PDU | Limited public CVEs | No | No certification | N/A |
| Rittal | PSM busbar, DK PDU series | European DC market | $3.1B rev (Friedhelm Loh Group) | Private (Germany) | Enclosures + cooling + PDU integrated | Limited public CVEs | No | No certification | N/A |
| Delta Electronics | InfraSuite PDU | Asian market, hyperscaler supply chain | $14.9B rev (group) | ~$50B | Vertically integrated with UPS | CISA advisories on Delta products | No | No certification | N/A |

> [!warning] PDU Certification Gap
> No PDU vendor holds IEC 62443-4-2 certification despite all intelligent PDUs running firmware on network management cards. This is a key Tetrel Tier 2 target.

---

## 3. Uninterruptible Power Supply (UPS)

| Vendor                   | Product Lines                                          | Customers                                   | Revenue/Size                  | Market Cap        | Niche                                                 | Security Issues                                                                                                          | OCP S.A.F.E. | IEC 62443 SL      | SIL Rating |
| :----------------------- | :----------------------------------------------------- | :------------------------------------------ | :---------------------------- | :---------------- | :---------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- | :----------- | :---------------- | :--------- |
| Schneider Electric (APC) | Galaxy VX/VS/VL, Symmetra PX, Smart-UPS                | AWS, Microsoft, Google, Equinix             | $47.2B (group); UPS co-leader | ~$140B            | Broadest UPS portfolio; NMC management                | **TLStorm (2022): 3 zero-days, physical damage possible; CVE-2023-29411/29412/29413 (RCE, CVSS 9.8); millions affected** | No           | NMC: no 62443-4-2 | N/A        |
| Vertiv (Liebert)         | Liebert EXL S1, Trinergy Cube, APM, GXT5               | Microsoft, Google, colocation               | $10.2B rev; 80% from DC       | $113B             | Pure-play DC power; modular scalable                  | NMC/network card vulns                                                                                                   | No           | No 62443-4-2      | N/A        |
| Eaton                    | 93PM, 93PR, 93E, 9395, xStorage                        | Hyperscalers, enterprise, gov               | $27.4B rev                    | ~$130B            | Strong mid-range; acquired Tripp Lite                 | CVE-2025-67450, CVE-2025-59887 (Companion RCE)                                                                           | No           | No 62443-4-2      | N/A        |
| ABB                      | MegaFlex UL 415V, PowerWave 33, Conceptpower DPA       | Hyperscalers, industrial                    | $33.2B rev                    | ~$100B            | MegaFlex UL for AI DC (June 2025)                     | ABB ASPECT/NEXUS CVEs; UPS NMC vulns                                                                                     | No           | No 62443-4-2      | N/A        |
| Delta Electronics        | Ultron HPH/DPH, Modulon; HPR 33kW OCP ORv3 power shelf | Asian hyperscalers, OCP ecosystem           | $14.9B rev (group)            | ~$50B             | OCP rack v3 power shelf; vertically integrated        | CISA advisories on Delta                                                                                                 | No           | No 62443-4-2      | N/A        |
| Piller Power Systems     | UNIBLOCK (150kW-50MW), rotary + kinetic storage        | Hyperscale, colocation                      | ~$300M rev (est.)             | Private (Germany) | **Only vendor making both rotary and static UPS**     | Limited public CVEs                                                                                                      | No           | No certification  | N/A        |
| Socomec                  | DELPHYS XM (300-800kVA), Masterys, Modulys             | European DC, industrial                     | $925M rev; ~4,400 employees   | Private (France)  | Independent; STS expertise; European focus            | Limited public CVEs                                                                                                      | No           | No certification  | N/A        |
| Bloom Energy             | Bloom Energy Server (solid oxide fuel cells)           | Oracle, AEP, Equinix, Brookfield ($5B deal) | $2.0B rev (2025, +37%)        | ~$28B             | **Fuel cell alternative to diesel**; 1000% stock rise | Newer technology; limited CVEs                                                                                           | No           | No certification  | N/A        |

---

## 4. Backup Generation

| Vendor | Product Lines | Customers | Revenue/Size | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL Rating |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| Caterpillar | Cat C175, D3516, D3512, D1500 | All hyperscalers | $67.6B rev; ~115K employees | $367.9B | Dominant high-HP (>2MW) | Generator controllers networked; limited CVEs | No | No 62443-4-2 | N/A |
| Cummins | QSK60 G29, QSK95, QSK50 | AWS, Microsoft, hyperscalers | $33.7B rev; ~76K employees | $85.1B | QSK95 workhorse for hyperscale | Limited public CVEs | No | No 62443-4-2 | N/A |
| Rolls-Royce (MTU) | mtu Series 4000/2000; fast-start gas (45-sec, 2026) | Hyperscale (72MW Frankfurt) | £20.1B rev (group) | ~$60B | Premium high-speed diesel | Limited public CVEs | No | No 62443-4-2 | N/A |
| GE Vernova | Jenbacher, Waukesha gas engines | Utility-connected DC | $38.1B rev | $266.5B | Gas engine specialist | GE grid SCADA CVEs historically | No | No 62443-4-2 | N/A |
| Wartsila | W34SG, W46, W50 gas engines | US hyperscalers (507MW order, Nov 2025) | ~$6.5B rev | ~$12B | Large-format gas (>10MW/unit) | Limited public CVEs | No | No 62443-4-2 | N/A |
| Generac | SD diesel, SG gas; modular paralleling | Enterprise, edge, sub-1MW | $4.2B rev | $12.2B | Sub-1MW specialist; modular DC products | Limited public CVEs | No | No 62443-4-2 | N/A |

---

## 5. Substation Systems

| Vendor | Product Lines | Customers | Revenue/Size | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL Rating |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| Hitachi Energy | GIS (72.5kV-1200kV); EconiQ SF6-free; Relion relays; MicroSCADA | Hyperscalers, utilities | Part of Hitachi (~$80B group) | Part of Hitachi | **Pioneered GIS (1965)**; world's first SF6-free 550kV GIS | MicroSCADA CVEs; Relion firmware vulns | No | MicroSCADA: per 62443; Relion: 62443-4-1 | Relion: SIL 2-3 |
| Siemens Energy | 8DA/8DB GIS; SIPROTEC relays; SICAM automation | Hyperscalers (Eaton JV) | $39.1B rev | $140.6B | Eaton JV for DC; complete substation-to-rack | SIPROTEC relay CVEs; substation automation vulns | No | SICAM: per 62443-3-3; SIPROTEC: 62443-4-1 | SIPROTEC: SIL 3 |
| ABB | Purpose-built DC substations; GIS; REF/RET relays | Hyperscalers, colocation | $33.2B rev (group) | ~$100B | Purpose-built DC substations (2025); modular | Relay/SCADA CVEs; ASPECT vulns | No | Ability: per 62443-3-3; relays: 62443-4-1 | REF/RET: SIL 2-3 |
| GE Vernova (Grid Solutions) | SF6-free g3 GIS; Multilin relays; MiCOM | Hyperscalers, utility DC | $38.1B rev (group) | $266.5B | Complete HV equipment; SF6-free | **GE Multilin relay CVEs (multiple CISA advisories)** | No | Multilin: per 62443-4-1; some ISASecure SDLA | Multilin: SIL 2-3 |
| SEL (Schweitzer) | SEL-700 relays; SEL-3530 RTAC; SEL-5033 automation | US utilities, US DC | ~$1B rev (est.) | Private (US) | **US protection relay leader**; strong cybersecurity | Generally well-secured; few public CVEs | No | Cybersecurity-focused; per 62443 principles | SEL relays: SIL 2-3 |
| Powell Industries | Custom switchgear; power control rooms | Hyperscalers ($75M+ megaproject) | ~$1B rev | ~$5B (POWL) | Custom MV switchgear for DC; 265% stock growth | Limited public CVEs | No | Limited 62443 data | N/A |

---

## 6. Electrical Distribution

| Vendor | Product Lines | Customers | Revenue/Size | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL Rating |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| ABB | Emax 2 breakers; SACE Tmax; OTM/OT ATS; MNS switchgear | Hyperscalers, colocation | $33.2B rev | ~$100B | Broadest LV distribution portfolio | ASPECT/NEXUS CVEs; breaker network interface vulns | No | Ekip: per 62443-4-1 | N/A |
| Schneider (Square D/ASCO) | Masterpact MTZ; ASCO 7000 ATS; Canalis busway; ION meters | All hyperscalers | $47.2B rev (group) | ~$140B | **ASCO ATS market leader** | ION meter CVEs; EcoStruxure power monitoring vulns | No | ION: per 62443-4-1 | N/A |
| Eaton (Cutler-Hammer) | Magnum DS breakers; ATC-900 ATS; pow-R-way busway | Hyperscalers, enterprise | $27.4B rev | ~$130B | Strong US market; Siemens Energy JV | Limited breaker CVEs | No | Limited 62443 | N/A |
| Starline (Legrand) | Track Busway; Plug-In Raceway; Critical Power Monitor | Hyperscalers, colocation | Part of Legrand ($9.5B) | Part of Legrand ($45.3B) | **Overhead busway leader for DC** | Limited public CVEs | No | No certification | N/A |
| LayerZero Power Systems | eSTS (static transfer switch); ePODs; eRPPs | Hyperscale, colocation, supercomputing | ~$100M rev (est.) | Private (US) | **Premium STS specialist**; mission-critical | Limited public CVEs | No | No certification | N/A |

---

## Key Findings

> [!tip] IEC 62443-4-2 Certified PLCs
> - **Phoenix Contact PLCnext**: First PLC certified SL2 (TUV SUD)
> - **ABB AC500**: TUV SUD certified
> - **Rockwell ControlLogix 5580**: Certified; 62443-4-1 ML4 (highest maturity)

> [!warning] Zero Certification in PDU/UPS/ATS/Generator Categories
> No vendor in PDU, UPS, generator, ATS, or busway categories holds IEC 62443-4-2 despite all running firmware on network management interfaces. Microsoft's mandate for UPS network card security creates immediate demand. This is the core of Tetrel's Tier 2 addressable market.

> [!warning] TLStorm — Schneider APC UPS
> Three zero-days (2022) can physically damage UPS units. CVE-2023-29411/29412/29413 scored CVSS 9.8 for RCE. Millions of APC units affected globally. NMC cards ship with default passwords and cleartext auth.

**Research conducted April 29, 2026. Revenue and market cap figures reflect most recent available data (primarily FY2025). CVE data reflects publicly disclosed vulnerabilities through April 2026.**
