---
tags: [tetrel, datacenter, vendors, dcim, ics, backup, iec62443, ocp-safe]
created: 2026-04-29
source: Multi-source research (Perplexity, WebSearch, vendor documentation)
---

# Datacenter Vendor Database: DCIM, ICS, Backup & Embedded Monitoring

*Comprehensive vendor database for Infrastructure Management, Industrial Control Systems, Backup/Recovery, and Environmental Monitoring used in hyperscale and enterprise data centers. Cross-referenced against [[09_Datacenter_Components_and_Suppliers]] and [[10_Hyperscale_Ecosystem_Deep_Dive]].*

> [!info] Certification Key
> - **OCP S.A.F.E.**: Open Compute Project Security Accountability Framework for Enterprise — firmware security standard
> - **IEC 62443-4-2**: Product-level security certification with Security Levels (SL-1 through SL-4)
> - **IEC 62443-4-1**: Development process security certification (SDL)
> - **SIL**: Safety Integrity Level per IEC 61508 (SIL 1-4)

---

## 1. DCIM Software Vendors

| Vendor | Product Lines | Customers | Revenue/Size | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL Rating |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| Schneider Electric (EcoStruxure IT) | EcoStruxure IT Expert, IT Advisor, Data Center Expert, NetBotz | Hyperscalers, colocation; 30% of revenue from DC segment | EUR 40B revenue (FY2025); 173K employees | ~$152B | End-to-end DC power + DCIM; >6% DCIM market share | Multiple CVEs in Data Center Expert (CVE-2024-8530, CVE-2024-8531, CVE-2025-50121 through 50125); NMC card XSS (CVE-2021-22810) | No | No product-level 62443-4-2 for DCIM | No |
| Vertiv (formerly Trellis) | Vertiv LIFE Services, Vertiv Intelligence, DCIM/EPMS integrations | Major colocation and hyperscale operators | $10.2B revenue (FY2025); 34K employees | $112.9B | Thermal + power management with fleet-level DCIM visibility | Not publicly documented for DCIM | No | No | No |
| Sunbird (dcTrack) | dcTrack DCIM Operations, Power IQ DCIM Monitoring | Comcast, Disney+, Merck, KPMG, MacStadium; 1,600+ customers | $50-100M revenue est.; ~120+ employees | Private | Pure-play DCIM; asset lifecycle + power chain analytics | Not publicly documented | No | No | No |
| Nlyte Software | Nlyte DCIM, Asset Lifecycle Mgmt, Energy Optimizer | Large enterprises, government, colocation | ~100 employees est. | Private | Hybrid/edge/colo DCIM; workflow automation | Not publicly documented | No | No | No |
| ABB (Ability DC Automation) | ABB Ability Data Center Automation (formerly Decathlon), DCIM + BMS + EPMS unified | Hyperscale DC, utilities, industrial | $33.2B total revenue (FY2025); 109K employees | ~$180B | Industrial-grade DCIM with BMS/EPMS integration; vendor-neutral | Symphony Plus: ISASecure EDSA (DCS, not DCIM) | No | Symphony Plus: ISASecure EDSA Level 1 (DCS only) | No (for DCIM) |
| Siemens (Datacenter Clarity LC) | Datacenter Clarity LC, Desigo CC integration, HD4D visualization, CFD modeling | Large enterprise DC operators | $87.3B total revenue (FY2025); 303K employees | ~$210B | BMS-DCIM bridge; CFD thermal modeling | Not publicly documented for DCIM | No | No | No |
| Panduit (SmartZone) | SmartZone Cloud DCIM, SmartZone G5 PDUs, environmental sensors | Fortune 100 (~90%); enterprise DC | $1.4B total revenue; ~4,400 employees | Private | Integrated monitoring (power + environmental + access + connectivity) | Not publicly documented | No | No | No |
| Device42 (Freshworks) | Device42 DCIM, IT asset management, dependency mapping | 1,000 customers; large enterprises | Acquired by Freshworks for $230M (Jun 2024) | Acquired | IT asset discovery + dependency mapping + DCIM hybrid | Not publicly documented | No | No | No |
| Raritan (Legrand) | Power IQ DCIM Monitoring, PX4 intelligent PDUs, SmartSensors | Top 10 Fortune 500 tech companies | Part of Legrand (EUR 9.5B) | Part of Legrand (~$45B) | Intelligent PDU + environmental monitoring | Not publicly documented | No | No | No |
| iTRACS (CommScope) | iTRACS DCIM suite, FutureView modeling, PowerEye energy management | Enterprise DC operators | Part of CommScope ($5.3B revenue) | CommScope: $4.1B | 3D interactive DC modeling; open architecture | Not publicly documented | No | No | No |
| Cormant | Cormant-CS DCIM | Enterprise and government | <50 employees est. | Private | Connectivity-focused DCIM; cable/circuit management | Not publicly documented | No | No | No |
| Modius | OpenData DCIM | Government, healthcare, enterprise | <50 employees est. | Private | Vendor-agnostic monitoring; BMS integration | Not publicly documented | No | No | No |
| Hyperview | Hyperview Cloud DCIM | 100+ customers; enterprise, healthcare | $2.7M revenue (2024); 20 employees | Private | Cloud-native SaaS-first DCIM | Not publicly documented | No | No | No |
| OpenDCIM | OpenDCIM (open-source) | Community; small/mid DC operators | Open-source; no commercial revenue | N/A | Free DCIM; asset + power + cooling tracking | No formal security audits | No | No | No |
| NetBox (NetBox Labs) | NetBox (open-source IPAM/DCIM), NetBox Cloud | Thousands of community deployments | Venture-funded startup | Private | Network source of truth; IPAM + DCIM; API-first | Community-reviewed | No | No | No |
| Tuangru | Tuangru DCIM | Enterprise and colocation | Small private company (Australia) | Private | Australian DCIM; capacity planning | Not publicly documented | No | No | No |
| EasyDCIM | EasyDCIM | Hosting providers, colocation | Small private company (Poland) | Private | Hosting/colo-focused DCIM; WHMCS integration | Not publicly documented | No | No | No |

> [!warning] DCIM Certification Gap
> No DCIM vendor holds IEC 62443-4-2 product certification or OCP S.A.F.E. certification. This is a significant gap given that DCIM software often has read/write access to power, cooling, and environmental systems. Tetrel opportunity: Tier 1b brownfield architecture reviews should include DCIM security posture assessment.

---

## 2. Backup and Recovery Vendors

| Vendor | Product Lines | Customers | Revenue/Size | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL Rating |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| Veeam (Insight Partners) | Veeam Backup & Replication, Veeam ONE, Kasten K10 | 550K+ customers; 82% of Fortune 500 | $1.7B ARR; 7K employees | Private ($15B valuation, Feb 2025) | #1 market share (15.1%) in enterprise backup | CVE-2023-27532 (critical auth bypass, actively exploited); CVE-2024-40711 (RCE) | No | No | No |
| Commvault (CVLT) | Commvault Cloud, HyperScale X, Metallic SaaS, Hedvig | Large enterprise; Fortune 500 | $1.15B revenue (TTM); 3.3K employees | $3.95B | Cyber resilience platform; hybrid cloud DR | CVE-2025-3928 (web server vuln, CISA KEV listed) | No | No | No |
| Cohesity (+ Veritas) | Cohesity DataProtect, DataHawk, FortKnox, Veritas NetBackup | 12K+ customers; 85 of Fortune 100 | $1.7B combined revenue; 5K+ employees | Private ($7B valuation) | Largest data protection co. post-Veritas merger | Veritas: multiple historical CVEs (CVE-2022-36956 series) | No | No | No |
| Rubrik (RBRK) | Rubrik Security Cloud, Data Observability, Cyber Recovery | 6,100+ customers | $1.32B revenue (TTM); ~3K employees | $10.8B | Zero Trust data security; IPO Apr 2024 | CVE-2023-25081 (info disclosure) | No | No | No |
| Acronis (EQT) | Acronis Cyber Protect, Cyber Protect Cloud | 5M customers; 20K+ MSP partners | $426M revenue (2024); ~2K employees | Private (EQT majority stake) | Integrated backup + cybersecurity + endpoint mgmt | CVE-2023-45249 (critical RCE, actively exploited) | No | No | No |
| Dell Technologies (DELL) | PowerProtect Data Manager, PowerProtect DD, Avamar, NetWorker | Enterprise; #1 PBBA by revenue | $95.6B total revenue (FY2025); ~120K employees | $138B | #1 purpose-built backup appliance; dedup leadership | Historical CVEs across product lines | No | No | No |
| IBM (Storage Protect) | IBM Storage Protect (formerly Spectrum Protect) | 4,558 companies; large enterprise/gov | $62.8B total revenue; 270K employees | ~$230B | Mainframe/legacy backup; petabyte-scale tape | Historical CVEs in TSM/Spectrum Protect | No | No | No |
| Arcserve | Arcserve UDP, SaaS Backup, OneXafe | 45K+ customers; enterprises, MSPs | ~$750M revenue; ~650 employees | Private | Legacy + modern hybrid backup; est. 1983 | CVE-2023-26258 (auth bypass) | No | No | No |
| Zerto (HPE) | Zerto 10, CDP, DR orchestration | Enterprise; part of HPE GreenLake | $130M+ run-rate at acquisition | Part of HPE ($23B) | Journal-based CDP; near-zero RPO | Not publicly documented | No | No | No |
| Druva | Druva Data Resiliency Cloud, Phoenix, inSync | 6K+ customers | $304M revenue (2024); 1.3K employees | Private ($2B valuation) | 100% SaaS backup; no hardware | CVE-2023-44403 (inSync vuln) | No | No | No |
| NAKIVO | NAKIVO Backup & Replication | 30K+ customers incl. Honda, Cisco, Coca-Cola | $27M revenue (2025); 180 employees | Private | SMB/mid-market backup; multi-platform | CVE-2024-48248 (path traversal, CISA KEV) | No | No | No |
| Bacula Systems | Bacula Enterprise (BEE) | NASA, Swisscom, Sky, Siemens; 500K+ installs | $3.6M revenue; 33 employees | Private (Switzerland) | Open-core enterprise backup; no per-volume licensing | Not publicly documented | No | No | No |

---

## 3. Embedded Devices / Environmental Monitoring

| Vendor | Product Lines | Customers | Revenue/Size | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL Rating |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| APC/Schneider (NetBotz) | NetBotz 750/755, SmartSensors (temp, humidity, leak, airflow) | Hyperscalers, enterprise DC, colocation | Part of Schneider (EUR 40B) | Part of Schneider (~$152B) | Integrated surveillance + environmental monitoring | NetBotz 450 firmware CVEs; NMC XSS vulns; Data Center Expert CVEs | No | No | No |
| Geist (Vertiv) | Vertiv Geist Environmental Monitors (Watchdog 15), GTHD sensors, rPDUs | Enterprise DC, colocation | Part of Vertiv ($10.2B) | Part of Vertiv ($112.9B) | Environmental monitoring integrated with intelligent PDUs | Not publicly documented | No | No | No |
| Raritan (Legrand) | SmartSensors (temp, humidity, airflow, differential pressure, water, vibration), PX4 PDUs | Top 10 Fortune 500 tech companies | Part of Legrand (EUR 9.5B) | Part of Legrand (~$45B) | Plug-n-play sensor ecosystem paired with intelligent PDUs | Not publicly documented | No | No | No |
| AKCP | sensorProbe, securityProbe, AKCPro Server, wireless sensors | 100K+ customers; 200K installations globally | ~150 employees; est. 1981 | Private | World's oldest networked sensor manufacturer | Not publicly documented | No | No | No |
| Kentix | KentixONE platform, MultiSensor (20+ hazard types), SmartAccess | Enterprise IT, critical infrastructure | <100 employees (Germany) | Private | Consolidates 8 security systems into 1 platform; Made in Germany | Not publicly documented | No | No | No |
| Panduit SmartZone | SmartZone G5 PDUs, environmental sensors, SmartZone Cloud | Fortune 100 companies | Part of Panduit ($1.4B) | Private | Integrated power + environmental + rack access | Not publicly documented | No | No | No |
| Sensaphone | Sentinel, Sentinel PRO, IMS-4000 | SMB datacenters, server rooms | ~24 employees; est. 1985; USA-manufactured | Private | Simple alert-based monitoring; affordable SMB | Not publicly documented | No | No | No |
| Monnit | ALTA wireless sensors (70+ types), iMonnit cloud | SMB, enterprise server rooms | ~48 employees; est. 2010 | Private (Salt Lake City) | Wireless sensor platform; 70+ sensor types; cloud dashboard | Not publicly documented | No | No | No |
| RF Code | CenterScape platform, wire-free active RFID sensors | Fortune 500; large DC operators | ~79 employees; est. 1997 | Private (Austin, TX) | Wire-free active RFID real-time asset + environmental monitoring | Not publicly documented | No | No | No |
| Server Technology (Legrand) | PRO4X intelligent PDUs, CDUs, environmental sensors | 60K+ customers; top cloud providers | $110M+ annual revenue pre-acquisition | Part of Legrand (~$45B) | High-density power distribution; 30+ year PDU specialist | Not publicly documented | No | No | No |

> [!warning] Embedded Monitoring Certification Gap
> No environmental monitoring or embedded sensor vendor holds IEC 62443-4-2 or OCP S.A.F.E. certification. These devices sit on OT networks with direct access to cooling and power controls. Tetrel opportunity: Component-level Tier 2 assessments for sensor firmware.

---

## 4. Industrial Control Systems (ICS/IACS) for Datacenters

| Vendor | Product Lines | Customers | Revenue/Size | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL Rating |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| Moxa | EDR-G9010/TN-4900 routers, EDS-4000/G4000 switches, UC-8200 computers | Industrial, energy, transportation, DC networking | $270-400M revenue; ~1,400 employees | Private (Taipei) | Industrial networking leader; first IEC 62443-4-2 SL2 certified router globally | Multiple ICS-CERT advisories; CVEs in MXview, EDS switches | No | **IEC 62443-4-1 + 62443-4-2 SL2** (EDR-G9010, TN-4900, EDS-4000/G4000, UC-8200) | No |
| Cisco | Catalyst IE switches (IE3x00, IE9300), Cyber Vision, Industrial Network Director | Hyperscalers, enterprise DC, industrial | $56.7B revenue (FY2025); 86K employees | $348.6B | #1 industrial networking | Numerous CVEs across IOS/IOS-XE; ICS-CERT advisories | No | **IEC 62443-4-1 + 62443-4-2** (Catalyst industrial switches) | No |
| Honeywell | Building Technologies (BMS), Niagara Framework, Forge, EBI/DVM | Airports, hospitals, data centers | $41B revenue (FY2025); 101K employees | ~$146B | Building automation leader; BMS for DC HVAC/cooling/fire | Multiple ICS-CERT advisories for Niagara/Tridium, EBI, Experion | No | **IEC 62443-4-1** (HBT development process) | No (for BMS) |
| Emerson (Ovation) | Ovation Automation Platform, DeltaV DCS, Ovation SIS | 20% of global power gen; DC energy management | $18B revenue (FY2025); 71K employees | $78.9B | Industrial DCS for power/datacenter; embedded AI | CISA ICS advisory ICSA-24-158-02; multiple CVEs | No | AMS 6500 ATG v4.1: **IEC 62443 Level 1** | **Ovation SIS: SIL3** |
| Yokogawa | CENTUM VP DCS, ProSafe-RS SIS, FAST/TOOLS SCADA | Process industry, power, DC cooling | $3.69B revenue; 17,670 employees | ~$8.7B | Process automation DCS; advanced control for complex cooling | ICS-CERT advisories for CENTUM VP, ProSafe-RS | No | **ISASecure SSA Level 1 (62443-3-3)** for CENTUM VP + ProSafe-RS | **ProSafe-RS: SIL3** |
| GE Vernova (Mark series) | Mark VIe/VIeS controls, OpFlex, Grid Solutions | Power generation, grid, DC backup gen | $38.1B revenue (FY2025); 75K employees | $266.5B | Turbine/generator controls; grid automation | Multiple ICS-CERT advisories for Mark VIe, UR relays | No | **IEC 62443-4-1 + 62443-2-4** (Grid Solutions) | **Mark VIeS: SIL3** |
| Beckhoff | TwinCAT 3, EtherCAT I/O, CX embedded controllers | Factory/building automation | EUR 1.17B revenue; 5,300 employees | Private (Germany) | PC-based control; EtherCAT inventor | Limited public CVEs | No | Aligns with 62443 principles; no confirmed cert | No |
| B&R (ABB) | APROL DCS, X20 PLC system, SafeLOGIC safety controllers | Process, energy, building automation | Part of ABB ($33.2B) | Part of ABB (~$180B) | High-performance PLC + safety; ABB's FA arm | Limited public CVEs | No | **IEC 62443-4-1 Maturity Level 3** (TUV Rheinland) | **SafeLOGIC: SIL3 / PL e** |
| Wago | PFC200 controllers, I/O System 750, KNX building automation | Building automation, energy, data centers | EUR 1.24B revenue; ~9,000 employees | Private (Germany) | Connection technology + compact controllers | CVEs in PFC200 (CVE-2021-21001 series); ICS-CERT advisories | No | **IEC 62443-4-1** (development process) | No confirmed |
| Omron | NX/NJ controllers, Sysmac platform, NX-SL safety controllers | Factory automation, packaging | $5.5B revenue; 26,614 employees | $6.1B | Factory automation; safety PLCs | Multiple ICS-CERT advisories (CVE-2022-34151 hard-coded credentials) | No | No confirmed 62443-4-2 | **NX-SL: SIL3** |
| Mitsubishi Electric | MELSEC iQ-R/iQ-F PLCs, GOT HMI, CC-Link IE | Factory automation, building, infrastructure | $37.6B revenue; 149,914 employees | $57.6B | Integrated FA systems; strong Asia presence | Multiple critical ICS-CERT advisories (CVE-2021-20594 series); actively targeted | No | No confirmed 62443-4-2 | **MELSEC Safety: SIL3** |
| Delta Electronics | InfraSuite DC management, modular UPS, precision cooling, building automation | DC operators, telecom, enterprise | $14.86B revenue; ~80K employees | $120B | DC power + cooling + management suite; strong in Asia | Limited public CVEs | No | No confirmed 62443-4-2 | No confirmed |
| Advantech | ADAM I/O, UNO computers, TPC HMI, WebAccess SCADA | Industrial IoT, edge computing, DC monitoring | $2.27B revenue; 6,454 employees | $9.4B | World's largest industrial PC maker; IEC 62443 cert service | Multiple ICS-CERT advisories for WebAccess; actively exploited | No | **IEC 62443-4-2** (RSB-3810, TPC-B520/B300 certified by Bureau Veritas) | No confirmed |
| Kontron (S&T) | KISS/KBOX industrial PCs, COM Express modules, IoT gateways | Transportation, industrial, DC edge | $1.85B revenue; ~7,000 employees | $1.8B | Embedded IoT computing; edge/fog platforms | Limited public CVEs | No | No confirmed 62443-4-2 | No confirmed |
| Red Lion (HMS Networks) | Sixnet RTUs, DA30D protocol converters, NT HMI panels | Industrial networking, OT convergence | ~$91M revenue; acquired by HMS Networks ($345M, 2024) | Acquired | Protocol conversion; OT/IT convergence | CVEs in Crimson configurator | No | Designs to ISA 62443 principles; no confirmed cert | No confirmed |

---

## Key Findings — Tetrel Sales Targeting

> [!tip] IEC 62443 Certification Leaders in ICS
> - **Moxa**: First globally to achieve IEC 62443-4-2 SL2 on industrial routers
> - **Cisco**: IEC 62443-4-1 + 62443-4-2 on Catalyst industrial switches
> - **Advantech**: IEC 62443-4-2 certified SBCs and HMIs (Bureau Veritas)
> - **B&R (ABB)**: IEC 62443-4-1 Maturity Level 3 (TUV Rheinland)

> [!tip] SIL3 Certified Safety Systems
> - Emerson Ovation SIS, Yokogawa ProSafe-RS, GE Vernova Mark VIeS, B&R SafeLOGIC, Omron NX-SL, Mitsubishi MELSEC Safety

> [!warning] OCP S.A.F.E. Gap
> No vendor in the DCIM, backup, embedded sensor, or ICS categories holds OCP S.A.F.E. certification. The program currently covers datacenter IT hardware/firmware (servers, storage, silicon) — AMD, Intel, SK Hynix. Extending S.A.F.E.-style firmware reviews to OT/embedded devices is a Tetrel differentiator.

> [!warning] Security Vulnerability Hotspots
> - **Schneider Electric**: Most documented CVEs in embedded/DCIM (NetBotz, Data Center Expert, NMC cards)
> - **Veeam, Commvault, NAKIVO, Acronis**: Critical CVEs actively exploited (CISA KEV listed)
> - **Mitsubishi MELSEC, Advantech WebAccess**: Frequently targeted in ICS-CERT advisories
> - **Moxa, Wago, Emerson, Yokogawa**: All have ICS-CERT advisories despite holding certifications
