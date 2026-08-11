---
tags: [tetrel, datacenter, vendors, cooling, bms, hvac, liquid-cooling, iec62443, ocp-safe]
created: 2026-04-29
source: Multi-source research (Perplexity, WebSearch, vendor documentation)
---

# Datacenter Vendor Database: Cooling, HVAC & BMS

*Comprehensive vendor database for Building Management Systems, Precision Cooling, Liquid Cooling, and Heat Rejection used in hyperscale and enterprise data centers. Cross-referenced against [[09_Datacenter_Components_and_Suppliers]] and [[10_Hyperscale_Ecosystem_Deep_Dive]].*

---

## 1. Building Management Systems (BMS)

| Vendor | Product Lines | Customers | Revenue/Size | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL Rating |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| Honeywell | EBI, Niagara Framework (Tridium), INNCOM | Hyperscalers, hospitals, campuses | $37.4B rev; 101K employees | ~$146B | Broad BMS; Niagara has 1M+ installations | 13 CVEs in Niagara Framework (Jul 2025) including CVE-2025-3937 (CVSS 7.7); CSRF + session hijack chain | No | No product-level 62443-4-2 | No |
| Johnson Controls | Metasys 15.0, OpenBlue, York HVAC controls | Datacenters, healthcare, large campuses | $24.0B rev; 87K employees | ~$85B | Open BAS; 1,000 IP devices/server | **Dark Angels ransomware (Sep 2023): 27TB stolen, $51M ransom demand, $27M+ costs; 8 months unauthorized access** | No | SL-2 hardening but no published 62443-4-2 cert | No |
| Siemens AG | Desigo CC, Desigo Optic, APOGEE | Hyperscalers, colocations, industrial | $87.3B rev; ~310K employees | ~$220B | Integrated BMS+EPMS single pane | CVE-2024-23815 (CVSS 7.5) SQL injection; CVE-2025-47809 privilege escalation; CVE-2025-40758 (CVSS 8.7) | No | ISASecure SDLA certified (process) | SIL-rated instruments available |
| Schneider Electric | EcoStruxure Building Operation, Foresight, IT DCE | Hyperscalers, colocation | $47.2B rev; 160K employees | ~$164-180B | First DCIM NMC to achieve IEC 62443-4-2 SL-2 | CVE-2025-50121 (CVSS 10.0 Critical) RCE in DCE; multiple EcoStruxure vulns | No | **IEC 62443-4-2 SL-2** (NMC3, TUV Rheinland); 62443-4-1 SDL | No |
| ABB Ltd | ABB Ability Building Ecosystem, Cylon BMS | Industrial campuses, datacenters | $33.2B rev; 110K employees | ~$90B | Strong DC electrical/power; acquired Cylon | CISA advisories for ABB equipment (2024-2025) | No | Some ISASecure certified products | SIL-rated safety relays |
| Tridium (Honeywell) | Niagara Framework 4, Enterprise Security | 1M+ installations; datacenters, campuses | Subsidiary of Honeywell; ~300 employees | N/A | Middleware/integration; multi-protocol, vendor-agnostic | 13 CVEs (Jul 2025) including high-severity CSRF/session hijack | No | No | No |
| Delta Electronics | InfraSuite Manager, DCIM solutions | Enterprise DC, telecom | $17.8B rev; ~80K employees | ~$50B (TWSE) | UPS + cooling + DCIM integrated; strong APAC | No major public incidents | No | No | No |
| Distech Controls (Acuity Brands) | ECLYPSE Connected Controllers, EC-BOS | Commercial buildings, datacenters | Sub of Acuity (~$3.5B) | N/A | Flat IP architecture; RESTful API; cybersecurity-focused | No major incidents | No | No | No |
| PassiveLogic | Autonomous Building Platform | Commercial buildings (emerging DC) | Pre-revenue; $125M+ total funding | Private | AI-driven autonomous BMS; digital twin | No major incidents | No | No | No |

---

## 2. Cooling Systems (CRAH, CRAC, Chillers)

| Vendor | Product Lines | Customers | Revenue/Size | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL Rating |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| Stulz GmbH | CyberAir, CyberCool, Direct Liquid Cooling | Hyperscalers, colocation, telecom | ~EUR 1.7B rev; 8,200 employees | Private | Precision cooling specialist since 1974 | No major incidents | No | No | No |
| Vertiv (Liebert) | Liebert CW/DS/PCW, CoolChip CDU (70kW-1350kW) | All major hyperscalers; acquired CoolTera | $10.2B rev; 34K employees | ~$92.5B | Broadest DC thermal portfolio; 11.3% liquid cooling share | No major cooling-specific CVEs | No | No | No |
| Rittal (Friedhelm Loh Group) | LCP (Liquid Cooling Package), RiMatrix NG, Blue e+ | European DC, industrial | ~EUR 3.1B (group); 9,600 employees | Private | Enclosure + cooling integrated | No major incidents | No | No | No |
| Schneider Electric | APC InRow, Uniflair, EcoStruxure cooling | Hyperscalers, colocation | See BMS table | See BMS | Acquired Motivair ($850M, 2024) for liquid cooling | See BMS table | No | **IEC 62443-4-2 SL-2** (NMC3) | No |
| Carrier Global | AquaForce chillers, 39CC air handlers, precision cooling | Hyperscalers; $1B DC revenue in 2025 | $21.8B rev; 48K employees | ~$75B | Grew DC cooling to $1B; targeting $1.5B in 2026 | No major incidents | No | No | No |
| Daikin Industries | Applied systems, CRAH/CRAC units | Global DC; acquired Alliance Air Products | $30.0B rev; ~90K employees | ~$37.3B | Largest HVAC manufacturer globally | No major incidents | No | No | No |
| Trane Technologies | IntelliPak, Sintesis chillers, CenTraVac | DC operators; acquired LiquidStack (Mar 2026), BrainBox AI | $21.3B rev; ~40K employees | ~$94.6B | End-to-end thermal; includes immersion via LiquidStack | No major incidents | No | No | No |
| Modine/Airedale | EdgeDX CRAC (30-95kW), EdgeAire CRAH (50-300kW) | Hyperscalers, AI infra; $180M in orders | $2.58B rev; 11K employees | ~$12B | Growing 60%+ in DC segment; $100M facility investment | No major incidents | No | No | No |
| Munters Group | DCT CRAH, LCX CDUs, indirect evaporative | US colocation; 2.1B SEK record order | 16.4B SEK rev; 5K employees | ~$3B | Evaporative/adiabatic specialist; 40% energy reduction | No major incidents | No | No | No |

---

## 3. Liquid Cooling (Cold Plates, CDUs, Immersion)

| Vendor | Product Lines | Customers | Revenue/Size | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL Rating |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| CoolIT Systems | Rack DLC, DLC Blade, CDUs, cold plates | Dell, HPE, Lenovo (OEM); hyperscalers | Private; est. $100-200M rev; ~300 employees | Private (Calgary) | Direct liquid cooling pioneer; deep OEM integration | No major incidents | No | No | No |
| Asetek | DLC cold plates, CDUs, InRackCDU | AI/HPC operators | $41.5M rev TTM; 114 employees | ~$85M (Copenhagen) | Patented DLC technology | No major incidents | No | No | No |
| Schneider (Motivair) | ChilledDoor RDHx (72kW/rack), CDU platforms (2.3MW) | Hyperscalers, colocation | Acquired for $850M (Oct 2024) | Part of Schneider | Rear-door heat exchangers + CDUs | See Schneider vulns | No | Via NMC3 SL-2 | No |
| LiquidStack (Trane) | Two-phase immersion cooling, DLC | AI, fintech, scientific computing | Acquired by Trane (Mar 2026) | N/A | Two-phase immersion for extreme densities | No major incidents | No | No | No |
| GRC (Green Revolution) | ICEraQ immersion racks, ReliaSys CDU (500kW) | Samsung, enterprise DC | ~$23.8M rev; 66 employees | Private (Samsung Ventures backed) | Single-phase immersion pioneer | No major incidents | No | No | No |
| ZutaCore | HyperCool direct-on-chip, closed-loop two-phase | HPC, AI operators | Private; 50-100 employees | Private (Israel) | Dielectric two-phase; waterless; closed-loop | No major incidents | No | No | No |
| Iceotope | KUL chassis-level liquid cooling | Edge, enterprise, defense | Private; 50-80 employees | Private (UK) | Chassis-level total liquid cooling | No major incidents | No | No | No |
| Submer | SmartPod immersion, MicroPod | Telefonica, ExxonMobil; 500MW deployed | ~$50M rev; 51-200 employees | Private (Spain, ~$500M valuation) | Immersion with autonomous maintenance robots | No major incidents | No | No | No |
| nVent Electric | CPI CDUs, cold plates, rear-door coolers | Hyperscalers; 270% DC order growth; NVIDIA partner | $3.83B rev; ~11K employees | ~$21.5B | 30% DC exposure; 1GW+ deployed | No major incidents | No | No | No |
| Boyd/Eaton Thermal | Liquid cold plates (5M+ delivered to hyperscalers) | Hyperscalers (NVIDIA GB200 partner) | Acquired by Eaton (early 2026) | N/A | High-volume cold plate manufacturing | No major incidents | No | No | No |
| JetCool (Flex) | SmartPlate microjet cooling | AI/HPC; NVIDIA ecosystem | Acquired by Flex (2025); MIT spinout | N/A | Microjet arrays direct to chip | No major incidents | No | No | No |

---

## 4. Heat Rejection Systems

| Vendor | Product Lines | Customers | Revenue/Size | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL Rating |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| BAC (Baltimore Aircoil) | TrilliumSeries cooling towers, COBALT immersion, adiabatic | Hyperscalers, colocation, industrial | ~$725M rev; 3K+ employees | Private (employee-owned) | Global leader; 10 factories globally | No major incidents | No | No | No |
| Evapco Inc. | AT cooling towers, eco-Air Titan heat exchangers | DC operators, industrial | ~$434-500M rev; ~600 employees | Private (employee-owned) | Evaporative cooling specialist | No major incidents | No | No | No |
| SPX Cooling (Marley) | Marley OlympusV Max, MD Everest, MH cooling towers | Large-scale DC | $2.25B rev (SPX total); 1,108 employees | ~$6.2B (SPXC) | Scalable modular; up to 50% greater capacity | No major incidents | No | No | No |
| Alfa Laval | Brazed plate HX (2.5MW CDU-grade), dry coolers, AlfaChill | DC sector 20 years | $7.1B rev; 22K employees | ~$20B | Extra-large plate HX for CDUs; heat recovery | No major incidents | No | No | No |
| Guntner Group | V-coolers, adiabatic dry coolers, hybrid coolers | DC operators (EU/global) | Private; est. EUR 500M+ | Private (Germany, 90+ years) | Industrial dry cooler specialist | No major incidents | No | No | No |
| Kelvion | Standard/adiabatic/hybrid dry coolers, SuperXL | DC operators, industrial | Private; est. EUR 1B+ | Private (Apollo funds since Jan 2026) | Heat exchanger pure-play | No major incidents | No | No | No |

---

## Key Findings

> [!warning] Cooling Certification Gap
> **Only Schneider Electric** has IEC 62443-4-2 SL-2 product certification (NMC3) for datacenter cooling infrastructure. No other cooling, liquid cooling, or heat rejection vendor has component-level certification. No vendor has OCP S.A.F.E.

> [!warning] Major BMS Security Incidents
> - **Johnson Controls**: Dark Angels ransomware (Sep 2023), $27M+ costs, 27TB data stolen
> - **Honeywell/Tridium**: 13 Niagara Framework CVEs (Jul 2025), 1M+ installations exposed
> - **Schneider Electric**: CVE-2025-50121 (**CVSS 10.0 Critical**) RCE in EcoStruxure DCE

> [!tip] Market Consolidation (2023-2026)
> - Schneider acquired Motivair ($850M, Oct 2024)
> - Trane Technologies acquired LiquidStack (Mar 2026) and BrainBox AI
> - Eaton acquired Boyd Thermal (early 2026)
> - Flex acquired JetCool (2025)
> - Vertiv acquired CoolTera (Dec 2023)
> - Mitsubishi Electric acquired Nozomi Networks (Sep 2025)

**60+ vendors profiled. The certification gap is significant — nearly all datacenter facilities infrastructure lacks IEC 62443-4-2 product certification. This represents a major opportunity for Tetrel's Silicon-to-Facility practice.**

**Research conducted April 29, 2026.**
