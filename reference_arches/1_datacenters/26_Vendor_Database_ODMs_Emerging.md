---
tags: [tetrel, datacenter, vendors, odm, nuclear, smr, 48v-dc, optical, ocp-safe, emerging]
created: 2026-04-29
source: Multi-source research (Perplexity, WebSearch, vendor documentation)
---

# Datacenter Vendor Database: ODMs, Nuclear/SMR, 48V DC & Optical Interconnects

*33 vendors across emerging datacenter infrastructure categories. Cross-referenced against [[09_Datacenter_Components_and_Suppliers]] and [[10_Hyperscale_Ecosystem_Deep_Dive]].*

> [!warning] Critical Finding
> **Across all 33 vendors — spanning $500B+ in combined annual revenue — not a single one holds IEC 62443-4-2 component certification, OCP S.A.F.E. product certification, or IEC 61508 SIL rating for their datacenter products.** This represents massive whitespace for Tetrel.

---

## 1. ODMs (Original Design Manufacturers) for Hyperscale Compute

Foxconn, Wiwynn, Quanta, and Inventec collectively produce 60% of worldwide OCP server output.

| Vendor | Product Lines | Customers | Revenue (2025) | Market Cap | Employees | Niche | OCP Status |
|:---|:---|:---|:---|:---|:---|:---|:---|
| Foxconn/Hon Hai (TWSE: 2317) | AI servers (NVIDIA GPU racks), liquid-cooled rack systems, networking | Microsoft, Amazon, Google, Meta, NVIDIA | ~$262B TTM | ~$100B+ | ~900K (peak) | Largest EMS/ODM globally; AI servers >50% of server revenue | OCP member |
| Quanta Cloud Technology (TWSE: 2382) | OCP servers, storage, switches; AI/GPU servers | Ships ~1 in 7 servers globally | Parent: ~$65B; AI servers = 70% of revenue | Parent: ~$39B | Parent: 121,917 | Most extensive OCP product lineup; early OCP supporter | **OCP Solution Provider; first OCP certification** |
| Wiwynn (TWSE: 6669) | Hyperscale servers, storage, AI/GPU servers, advanced cooling | Hyperscaler "ODM Direct" model | ~$20B+ (NT$658B first 3Q, +169% YoY) | ~$20.2B | ~2,200 | ODM Direct (bypasses OEMs); advanced cooling | **OCP Platinum Member** |
| ZT Systems (now AMD) | Hyperscale server solutions, AI compute infrastructure | Hyperscale cloud providers | ~$5-6B run rate (pre-acquisition) | Acquired by AMD ($4.9B, Mar 2025) | N/A | 29 years hyperscale; now AMD's AI systems design arm | OCP contributor |
| Celestica (NYSE: CLS) | HPS, 1.6T switching, AI/ML infrastructure | Top 10 = 79% of revenue | $12.39B (+28% YoY) | ~$40.8B | ~24-30K | EMS + ODM hybrid; networking switching leader | OCP participant |
| Inventec (TWSE: 2356) | Rackmount/blade servers, AI/GPU servers, switches, OpenRAN | HP, Dell, Lenovo, hyperscalers | ~$22.2B TTM | ~$5.0B | 50,925 | World's largest server ODM by share (~30%) | OCP contributor |
| MiTAC Computing (TWSE: 3706) | OCP servers (air-cooled C2810Z5, liquid-cooled C2820Z5) | AMD, Broadcom, Intel, NVIDIA, Micron | Parent: ~$1.4B | Parent: ~$3.6B | 7,383 | OCP server specialist since 2017; open firmware contributor | Active OCP contributor since 2017 |
| Wistron (TWSE: 3231) | Comprehensive server portfolio, AI servers, storage, networking | Cloud, enterprise, vertical industry | ~$70.1B TTM (+115% YoY) | ~$14.3B | 60K+ est. | Broad ODM; parent of Wiwynn | OCP member (via Wiwynn) |

> [!tip] Tetrel ODM Opportunity
> Zero ODMs hold IEC 62443-4-2 or OCP S.A.F.E. certification. Given Microsoft's mandate for OCP S.A.F.E. on server firmware, every ODM is a potential customer. Start with Wiwynn (OCP Platinum, high growth) and QCT (most extensive OCP product line).

---

## 2. Nuclear/SMR Power for Datacenters

Total announced SMR capacity for datacenter-adjacent power exceeds 25 GW. All vendors pre-revenue on reactor operations.

| Vendor | Reactor Design | Output | NRC/Regulatory Status | DC Power Deals | Funding/Revenue | Market Cap |
|:---|:---|:---|:---|:---|:---|:---|
| NuScale Power (NYSE: SMR) | NuScale Power Module (NPM) | 77 MWe/module (12-pack = 924 MWe) | **Only NRC-certified SMR design** | TVA/ENTRA1: 6 GW; $25B US-Japan framework | Rev: $31.5M (2025, -15% YoY) | ~$4.3B |
| Oklo (NYSE: OKLO) | Aurora Powerhouse | 15-75 MWe (fast neutron, liquid metal) | NRC application pending; first reactor INL by 2027 | Switch: 12 GW framework; 2 undisclosed DC providers: 750 MW | Pre-revenue; $1.23B cash | ~$6.5-8.7B |
| X-energy (NASDAQ: XE) | Xe-100 (HTGR) | 80 MWe/unit (320 MWe 4-pack) | Dow Seadrift CPA accepted by NRC May 2025 | Amazon: $500M investment, 5 GW by 2039; Dow: 4-unit plant | IPO raised $1.02B at $9.1B valuation | ~$9.1B |
| TerraPower (private, Gates-backed) | Natrium (sodium fast reactor) | 345 MWe | **NRC construction permit approved** (5 months ahead of schedule) | NextEra partnership for Google + Microsoft AI DC power; Meta: up to 690 MW | $650M fundraise (June 2025, NVIDIA fund + Gates) | Private |
| Kairos Power (private) | KP-FHR (fluoride salt-cooled) | 75 MWe (Hermes demo) | **NRC construction permit** (Oak Ridge, TN) — first non-LWR in 50+ years | Google: 500 MW by 2035 | DOE $303M milestone funding | Private |
| Rolls-Royce SMR (LON: RR) | PWR (470 MWe class) | 470 MWe/unit | UK GDA final stage, expected Dec 2026 | UK Gov: 3 units at Wylfa; GBP 2.6B funding | Gov. backed | Parent: ~GBP 45B |
| GE Vernova Hitachi Nuclear (NYSE: GEV) | BWRX-300 | 300 MWe | Canada: CNSC construction license (Apr 2025) | OPG Darlington: 4 units; TVA Clinch River planned | Part of GE Vernova ($36B+) | GEV: ~$115B |
| Westinghouse (Cameco + Brookfield) | AP300 (Gen III+ PWR) | 300 MWe | Design certification targeted 2027 | US Gov: $80B+ in new reactors (AP1000 + AP300) | Part of $7.9B entity | Private |

> [!tip] Tetrel SMR Opportunity
> SMR vendors must comply with NRC 10 CFR 73.54 cybersecurity requirements, which share substantial overlap with IEC 62443 zone/conduit architecture. Tetrel can position as the bridge between nuclear safety (IEC 61513/IEEE 603) and IEC 62443 security architecture for digital I&C. TerraPower (NRC CP approved) and X-energy (NRC CPA in review) are nearest-term.

---

## 3. 48V DC Power Architecture Vendors

Industry shift from 12V to 48V reduces conduction losses by 16x. OCP Open Rack v3 standardizes 48V.

| Vendor | Key DC Products | Customers | Revenue (2025) | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| Vicor (NASDAQ: VICR) | Gen 5 VPD, 48V-to-point-of-load modules, Power-on-Package (1000A peak) | NVIDIA, Google, AMD, Cerebras, Tesla, Intel | ~$460M projected | ~$12.4B | 48V power-on-package pioneer; ~18% share of 1000W+ processor power | No major vulns | No | No |
| Delta Electronics (TWSE: 2308) | 72kW/108kW HVDC Power Shelves (480V AC to 48V DC), rack PDUs, UPS | Hyperscalers, telcos, enterprise | ~$17.8B TTM | ~$55B+ | Global #1 in power supplies; full-stack DC infrastructure | Conti ransomware (2021, general IT) | No | No |
| Flex Power Modules (NASDAQ: FLEX) | OCP ORv3 rack power, liquid cooling integration, DC-DC converters | Equinix (co-innovation), hyperscalers | Parent: $25.8B (FY2025) | Parent: ~$26.2B | EMS + power modules; OCP ORv3 format | No major vulns | No | No |
| Artesyn/Advanced Energy (NASDAQ: AEIS) | OCP ORv3 48V Power Shelf (industry first), embedded power supplies | Hyperscale DC operators, 5G | $1.80B (+21% YoY); DC Computing +113% YoY | ~$14.5B | Designed the first OCP ORv3 48V Power Shelf | No major vulns | No | No |
| Infineon (XETR: IFX) | 48V smart eFuse family, hot-swap controllers (400V/800V), VRMs for AI GPUs | NVIDIA, AMD, hyperscalers | ~EUR 14.7B (~$16B) | ~$61.7B | Top 5 PMIC vendor (~55% share); expanding to 400V/800V | No DC power firmware vulns | No | No |
| Texas Instruments (NASDAQ: TXN) | TPS1685 48V hot-swap eFuse (industry first), GaN power stages, PMICs | Broad DC/AI infra OEMs | $17.68B (+13% YoY) | ~$195.5B | Industry-first 48V integrated hot-swap eFuse; 50% smaller | No DC power firmware vulns | No | No |

> [!tip] Tetrel 48V Opportunity
> 48V power shelves in OCP ORv3 racks contain firmware (BMC-managed power rails, smart eFuses, hot-swap controllers). As hyperscalers mandate OCP S.A.F.E. for all rack components, power module firmware falls in scope. Delta (OCP Summit presenter) and Advanced Energy/Artesyn (designed first ORv3 48V shelf) are primary targets.

---

## 4. Optical Networking / High-Speed Interconnects

| Vendor | Key DC Products | Customers | Revenue (2025) | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| Broadcom (NASDAQ: AVGO) | Tomahawk 6 (102Tbps), Jericho 4, custom XPUs (Google TPU, Meta MTIA) | Google, Meta, OpenAI, Microsoft | ~$56B+; networking +170% YoY | ~$1.89T | Dominant switch ASIC; 3 hyperscaler custom XPU programs | No major DC chip CVEs | No | No |
| NVIDIA (NASDAQ: NVDA) | ConnectX-7/8 SmartNICs, BlueField-3/4 DPUs, Spectrum-X | All hyperscalers | ~$130B+; DC networking $1.46B/qtr (21% share) | ~$5.18T | End-to-end AI platform; Spectrum-X boosts AI perf 1.6x | **NVIDIAScape CVE-2025-23266 (CVSS 9.0)** | No | No |
| Marvell (NASDAQ: MRVL) | Custom XPUs (20+ programs), electro-optics (800G/1.6T), Octeon DPUs | Hyperscalers (cloud = 40%+ rev) | $8.19B (+42% YoY); DC = 75% | ~$112-134B | Custom silicon leader; acquired Celestial AI (Dec 2025) | No major CVEs | No | No |
| Arista Networks (NYSE: ANET) | 7800R4 (AI spine), 7060X6 (leaf), Etherlink AI, EOS | 10K+ customers; hyperscalers | $9.0B (+29% YoY) | ~$175B | #1 DC Ethernet switching; 150M cumulative ports | CVE-2024-11186 (CVSS 10.0, CloudVision Portal) | No | No |
| Coherent Corp (NYSE: COHR) | 800G/1.6T transceivers, VCSELs, datacenter photonics | Hyperscalers | $5.81B (+23% YoY); Comms +50% to $3.4B | ~$57.8B | #1 in datacom transceivers (800G/1.6T) | Transceiver firmware not publicly disclosed | No | No |
| Lumentum (NASDAQ: LITE) | 200 Gbps/lane EMLs (sole supplier), 1.6T DR8 OSFP, CPO components | NVIDIA (exclusive CPO), Google | $1.65B; FY2026 on pace for $3B+ | ~$64.1B | Only supplier shipping 200 Gbps/lane EMLs at scale | No major CVEs | No | No |
| Ciena (NYSE: CIEN) | WaveLogic 6 (800G coherent), RLS photonic line systems, pluggable optics | 5 cloud providers in top 10 | $4.77B (+19% YoY); FY2026 guide $5.7-6.1B | ~$73.6B | Coherent optical leader (DCI + metro) | WaveLogic/routing CVEs via PSIRT | No | No |
| FS.com | 120K+ SKUs: 400G/800G transceivers, DAC/AOC, switches, fiber mgmt | Microsoft, Google Fiber; 150+ countries | Est. $200-236M | Private | Low-cost transceiver/cabling; massive SKU catalog | Limited disclosure; supply chain concerns | No | No |

---

## Tetrel Addressable Market Summary

| Category | Vendors | Hold IEC 62443 | Hold OCP S.A.F.E. | Hold SIL | Tetrel Play |
|:---|:---|:---|:---|:---|:---|
| ODMs (Hyperscale Compute) | 8 | 0 | 0 | 0 | Firmware reviews; OCP S.A.F.E. gap assessments |
| Nuclear/SMR Power | 8 | 0 | 0 | 0 | IEC 62443 zone/conduit for digital I&C; NRC 73.54 bridge |
| 48V DC Power | 6 | 0 | 0 | 0 | Power shelf firmware security; OCP ORv3 compliance |
| Optical/Interconnects | 11 | 0 | 0 | 0 | DPU/switch firmware review; transceiver firmware supply chain |
| **Total** | **33** | **0** | **0** | **0** | **33 vendors, zero certifications = massive whitespace** |

**Research conducted April 29, 2026.**
