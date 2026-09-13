# Hyperscale Data Center: High-Level Design, Equipment Bill of Materials & FMECA/Hazard Reference
---
## Executive Summary
This document presents a representative high-level design (HLD) for a hyperscale data center, covering all major engineering systems from grid intake through compute, storage, networking, cooling, power protection, DCIM/BMS, fire detection and suppression, physical security, and out-of-band management. Each system is annotated with representative make/model, connectivity, SIL/functional safety applicability, typical reliability (MTBF / availability), FMECA criticality rating, hazard log relevance, minimum operating requirements (MOR), and the approximate impact on compute/resources if the system is unavailable or tampered with. The design assumes a Tier III / Tier IV Uptime Institute topology targeting ≥99.982% (Tier III) to ≥99.995% (Tier IV) availability.[1][2]

Hyperscale data centers can demand from 20 MW to over 100 MW of power, house tens of thousands of servers, and span 100,000 ft² to millions of ft². As of early 2026, approximately 190 GW of hyperscale capacity has been announced globally, driven by AI workloads.[3][4]

***
## 1. Scope and Design Philosophy
### 1.1 Design Basis
The reference design is a single-campus hyperscale facility designed around a 2N or 2(N+1) power and cooling topology, with a spine-leaf data-center fabric, hybrid air and liquid cooling, and an integrated DCIM/BMS/SCADA layer. Each system below is listed once as a representative sample, not duplicated per pod or row unless the connectivity model demands it.
### 1.2 Uptime Tier Reference
| Tier | Uptime Availability | Redundancy Model | Fault Tolerance |
|------|---------------------|-----------------|----------------|
| Tier I | 99.671% | None | None[2] |
| Tier II | 99.741% | Partial redundant capacity | Single-path[2] |
| Tier III | 99.982% | N+1 dual-path, maintainable | Concurrent maintenance[2] |
| Tier IV | 99.995% | 2N fault-tolerant, isolated systems | Full fault tolerance[2] |

Hyperscale facilities targeting AI / cloud workloads typically target Tier III or Tier IV, or "Tier 5 Platinum" proprietary standards as defined by operators like Switch.[5]

***
## 2. Power Systems
### 2.1 Utility Intake, Substation & Medium Voltage Switchgear
**Description:** Utility power enters at high or medium voltage (typically 11 kV–138 kV). An on-site substation steps it down to medium voltage (MV, 11 kV–33 kV) for distribution, then to low voltage (LV, 415 V / 480 V) near data hall pods.[6]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | ABB PASS M0 or Schneider Electric SM6 / RM6 MV switchgear; ABB UniGear ZS1 or Schneider Electric SM AIS/GIS switchgear |
| **SIL Rating** | SIL 1 (protection relay functions for automatic fault isolation); main protection relays (e.g., Schneider Electric Easergy P3 / ABB REF615) typically SIL 1–SIL 2 per IEC 61511[7] |
| **Typical MTBF / Availability** | MV switchgear MTBF ≈ 200,000–400,000 hours; MV infrastructure availability ≈ 99.97–99.99% with redundant feeds[8] |
| **Critical Item** | **Yes** — loss of utility intake causes total site power loss |
| **FMECA Criticality** | Category I (Catastrophic); RPN High — loss of both utility feeds initiates generator and UPS transfer[9][10] |
| **Hazard Log Entry** | Yes — uncontrolled loss of MV, arc flash, SF6 release (GIS variants), cascading failure to IT loads |
| **MOR** | Minimum: 1 operative MV feed; recommended 2N independent utility feeds from separate substations |
| **Connectivity** | IEC 61850 GOOSE/MMS to site SCADA/BMS; hardwired protective relaying |
| **Impact if Unavailable** | 100% compute loss unless diesel generators and UPS transfer within <10–30 s |
### 2.2 Main Distribution Transformers
**Description:** Step MV (11 kV) to LV (415 V) for data hall pods. Typically 2.5 MVA or 3 MVA per transformer, one per pod pair.[6]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | ABB RESIBLOC dry-type transformer or Schneider Electric Trihal cast-resin transformer; typical 2.5–3 MVA, 11 kV / 415 V |
| **SIL Rating** | Not directly SIL-rated as a transformer; associated protection (Buchholz relay, thermal imaging, protection relay) targeting SIL 1 |
| **MTBF** | ~150,000–300,000 hours; expected life 25–30 years |
| **Critical Item** | **Yes** |
| **FMECA Criticality** | Category I (Catastrophic) — transformer failure eliminates power to affected pod |
| **Hazard Log Entry** | Yes — fire risk, oil-less arc flash (dry type), cascading overload on redundant transformer |
| **MOR** | N+1 transformer arrangement per distribution zone |
| **Connectivity** | Temperature/protection relay SCADA via Modbus/IEC 61850; tap changer control |
| **Impact if Unavailable** | Loss of 1 transformer: load shifts to redundant unit (N+1 maintained); loss of both: pod compute loss |
### 2.3 Diesel / Gas Backup Generators
**Description:** Emergency power generation. Hyperscale facilities deploy multiple large-frame generators per pod, typically 1500–3500 kW each.[11][12][13]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | Caterpillar Cat® 3516C (2000–3500 kW)[14][11]; Cummins QSK60G or QSK95 (1750–3500 kW)[12][13]; Kohler KD Series (600–4000 kW) |
| **SIL Rating** | Engine protection and auto-start sequencing: SIL 1 per IEC 61511 for automatic start/transfer; some facilities apply SIL 2 for generator paralleling protection |
| **MTBF** | ~20,000–40,000 operating hours between overhauls; cold-start-to-full-load: 10–30 s |
| **Critical Item** | **Yes** — last line of power protection when utility and UPS exhaust |
| **FMECA Criticality** | Category I (Catastrophic) if all generators fail simultaneously; individual unit failure Category II (Critical) if N+1 is maintained |
| **Hazard Log Entry** | Yes — fuel spill/fire, exhaust emissions, black-start sequencing failure, paralleling fault |
| **MOR** | N+1 (minimum); 2N for Tier IV. All generators must start and transfer within 30 s of utility loss |
| **Connectivity** | Generator control panel → site BMS/SCADA via Modbus or SNMP; automatic transfer switch interlock |
| **Impact if Unavailable** | If utility also fails: full site blackout; each kW of generator = ~1 kW of protected IT load |
### 2.4 Automatic Transfer Switches (ATS) / Static Transfer Switches (STS)
**Description:** Transfers load between utility and generator (ATS), or between two UPS feeds (STS) with sub-cycle transfer time for critical IT loads.[15][6]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | Eaton MAGNUM DS ATS; Schneider Electric Automatic Transfer Switch ATyS series; Vertiv Liebert STS2 (static, <4 ms transfer) |
| **SIL Rating** | SIL 1 for ATS control logic; STS targeting <4 ms transfer typically validated to SIL 1 per IEC 61508[7] |
| **MTBF** | ATS mechanical: ~100,000 operations; STS solid-state: MTBF >500,000 hours |
| **Critical Item** | **Yes** |
| **FMECA Criticality** | Category I (Catastrophic) — misoperation of ATS during transfer causes momentary or sustained power loss |
| **Hazard Log Entry** | Yes — maloperation during transfer, failure to transfer, inadvertent paralleling of sources |
| **MOR** | 1 ATS per distribution circuit, minimum; STS recommended for IT loads requiring <4 ms failover |
| **Connectivity** | Hardwired relay interlock; SCADA via Modbus/BACnet; alarm output to BMS |
| **Impact if Unavailable** | ATS failure: loads stranded on failed source. STS failure: IT equipment loses redundant power path |
### 2.5 UPS Systems
**Description:** Double-conversion online UPS providing clean power conditioning and battery ride-through (typically 5–15 minutes) to bridge generator start time.[15][6]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | Vertiv Liebert EXL S1 (250–1000 kW); Eaton 9395XR (1500–2500 kVA, modular, hot-swappable modules, Li-ion compatible)[16]; Schneider Electric Galaxy VXL (100–1250 kW, Li-ion)[17]; ABB MegaFlex UL 415V (AI-ready, 2025)[18] |
| **SIL Rating** | UPS output protection relay: SIL 1; bypass switch logic: SIL 1; battery management: not typically SIL-rated but must have functional safety plan per IEC 61508 for Li-ion BESS |
| **MTBF** | Double-conversion UPS module MTBF: ~200,000–500,000 hours; battery: 3–10 years depending on chemistry |
| **Critical Item** | **Yes** |
| **FMECA Criticality** | Category I (Catastrophic) if all UPS modules fail; Category II (Critical) for single-module failure in N+1 topology |
| **Hazard Log Entry** | Yes — thermal runaway (Li-ion), bypass failure, sustained overload, battery room fire |
| **MOR** | N+1 or 2N UPS topology; battery autonomy ≥ 5 minutes at full load |
| **Connectivity** | SNMP, Modbus, RS-485 to DCIM (Vertiv Environet[19][20]) and BMS; alarm contact outputs |
| **Impact if Unavailable** | Loss of UPS module: load shifts to redundant module (N+1 maintained); complete UPS failure: immediate compute loss until generator transfer |
### 2.6 Battery Energy Storage Systems (BESS)
![](https://www.vertiv.com/4a335a/globalassets/campaigns/bess/vertiv-bess-pagegraphics-physical-energy-storage-system.jpg)
Battery Energy Storage System diagram
**Description:** Grid-forming or grid-following BESS provides extended backup (1–4+ hours), demand response, and power quality stabilization. Increasingly deployed at medium voltage alongside UPS at LV.[15][21][22][23]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | Vertiv BESS (Li-ion, utility and C&I scale); FlexGen HybridOS-managed BESS; Tesla Megapack (containerized, 3.9 MWh per unit) |
| **SIL Rating** | Battery management system (BMS): SIL 1–SIL 2 per IEC 61508 for thermal runaway protection; fire suppression integration typically SIL 1[7] |
| **MTBF** | Inverter/PCS MTBF: ~100,000–200,000 hours; cells: 10–15-year design life; degradation-based capacity loss |
| **Critical Item** | **Yes** |
| **FMECA Criticality** | Category I (Catastrophic) — BESS fire or catastrophic failure can propagate; BMS malfunction during high AI load spike Category II |
| **Hazard Log Entry** | Yes — Li-ion thermal runaway, off-gas (hydrogen fluoride), fire propagation to adjacent electrical equipment, arc flash during PCS maintenance |
| **MOR** | Minimum 1 operative BESS capable of sustaining full IT load for ≥ 15 minutes independently from generators |
| **Connectivity** | Modbus/IEC 61850 to site EMS and BMS; grid-forming inverter communicates frequency and voltage to site microgrid controller |
| **Impact if Unavailable** | BESS offline: facility falls back to UPS-only bridge; loss of demand response and frequency support capability; AI load spikes may stress switchgear[22][23] |
### 2.7 DC Power Systems / 48V/400V HVDC Bus
**Description:** High-voltage DC (HVDC) distribution (typically 380–400 V DC) for modern AI server power supplies, bypassing AC-DC conversion stages and improving efficiency.

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | Vertiv Geist DC busbar systems; Delta Electronics HVDC power shelf; Schneider Electric DC PDU |
| **SIL Rating** | Not typically SIL-rated; standard electrical protection applies |
| **MTBF** | DC rectifier module MTBF: ~300,000–500,000 hours |
| **Critical Item** | Moderate — used in some high-efficiency AI pod designs |
| **FMECA Criticality** | Category II (Critical) — failure results in loss of specific AI compute pod, not entire facility |
| **Impact if Unavailable** | Affected AI compute pods (GPUs/TPUs) go offline; typically <20% of total compute capacity per DC bus zone |
### 2.8 Power Distribution Units (PDUs)
**Description:** Rack-level and row-level intelligent PDUs distributing power from UPS to individual server outlets.

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | Vertiv Geist rPDU (rack-mount, SNMP managed); Schneider Electric APC AP8941 (Metered, 0U); Raritan PX3 iPDU (per-outlet switching, SNMP) |
| **SIL Rating** | Not SIL-rated |
| **MTBF** | ~500,000–1,000,000 hours for passive rPDU; switching rPDU ~300,000 hours |
| **Critical Item** | Yes, at rack level |
| **FMECA Criticality** | Category II (Critical) per rack — single rPDU failure affects 20–40 servers |
| **Connectivity** | SNMP/Modbus to DCIM; per-outlet current monitoring |
| **Impact if Unavailable** | Loss of 1 rPDU: all IT equipment in affected rack goes offline |

***
## 3. Cooling Systems
### 3.1 Chillers
**Description:** Water-cooled centrifugal or magnetic-bearing chillers produce chilled water (supply ≈ 7–14°C) for distribution to CRAHs, CDUs, and rear-door heat exchangers.[24]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | Carrier AquaForce 30XW (300–1500 RT); Trane CenTraVac CVHF (500–2500 RT); Johnson Controls YORK YZ Magnetic Bearing chiller (150–500 RT)[25] |
| **SIL Rating** | Chiller protection (high-pressure cutout, low-oil safety): SIL 1 per IEC 61511 for critical process safety functions |
| **MTBF** | ~50,000–100,000 hours; design life 20–25 years |
| **Critical Item** | **Yes** |
| **FMECA Criticality** | Category I (Catastrophic) — loss of all chilling causes IT thermal shutdown within 5–30 minutes depending on thermal mass and airflow[9] |
| **Hazard Log Entry** | Yes — refrigerant leak (R-134a, R-1234ze), chilled water flooding (pipe failure), vibration damage to adjacent equipment |
| **MOR** | N+1 chillers minimum; 2N for Tier IV. Chilled water supply must be maintained at ≤14°C for CRAH/CDU operation |
| **Connectivity** | BACnet/IP or Modbus to BMS and DCIM; trend logging of chilled water supply/return temperatures, kW, COP |
| **Impact if Unavailable** | Loss of 1 chiller: N+1 maintained; full chiller plant failure: IT thermal trip within minutes; 100% compute loss |
### 3.2 Cooling Towers / Dry Coolers (Heat Rejection)
**Description:** Reject heat from chilled water loop or condenser water loop to atmosphere.[26][24]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | Evapco AT Series cooling tower; Baltimore Aircoil Series 3000 open cooling tower; ENEXIO adiabatic dry cooler (water-efficient) |
| **SIL Rating** | Basin level switches, anti-freeze protection: SIL 1 |
| **MTBF** | Fan motors ~30,000–60,000 hours; fill packs 10–15 years |
| **Critical Item** | **Yes** (paired with chillers) |
| **FMECA Criticality** | Category I (Catastrophic) if all towers fail simultaneously; individual fan/cell failure Category III (Marginal) in N+1 arrangement |
| **Hazard Log Entry** | Yes — Legionella risk (water treatment management), structural collapse (high-wind events), loss of condensing capacity causing chiller high-pressure trip |
| **MOR** | N+1 cooling tower cells; water treatment dosing must be maintained continuously |
| **Impact if Unavailable** | Loss of condenser water → chiller trips on high head pressure → progressive IT thermal load shedding |
### 3.3 CRAH Units (Computer Room Air Handlers)
**Description:** Room-level air cooling using chilled water coils. Deployed in raised-floor or overhead supply air configurations.[27][28]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | Vertiv Liebert CW (Chilled Water, 40–155 kW)[28]; Schneider Electric ACRD (row-based, 20–80 kW); Stulz CyberAir 3PRO (20–200 kW) |
| **SIL Rating** | Not SIL-rated; safety cut-out (high-temperature alarm, water detection) per ASHRAE/IEC |
| **MTBF** | Fan EC motor ~60,000–100,000 hours; chilled water valve actuator ~50,000 hours |
| **Critical Item** | **Yes** |
| **FMECA Criticality** | Category II (Critical) per unit — N+1 CRAH failure causes hot-aisle temperature rise, potential IT throttling |
| **Hazard Log Entry** | Yes — water leak on coil (CHW failure), condensation (dew point breach), loss of airflow causing rack hot-spot |
| **MOR** | N+1 CRAH per data hall row; CRAH supply air ≤18°C to maintain inlet temperature ≤27°C (ASHRAE A1 class)[29] |
| **Connectivity** | BACnet/Modbus to BMS/DCIM; supply/return air temperature, humidity, chilled water valve position |
| **Impact if Unavailable** | 1 CRAH failure: row temperature rise 2–5°C (N+1 maintained); multiple failures: IT servers throttle/TCASE protection shuts down GPU/CPU compute |
### 3.4 In-Row Cooling Units
**Description:** Supplemental row-based cooling delivering precision cooling directly to high-density racks, reducing distance between heat source and cooling.[27]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | Vertiv Liebert CRV (5–40 kW per unit)[30]; Schneider Electric APC ACRC (row-based, up to 30 kW); Rittal LCP (Liquid Cooling Package) |
| **SIL Rating** | Not SIL-rated |
| **MTBF** | ~50,000–80,000 hours |
| **Critical Item** | Moderate (supplemental to room CRAH) |
| **FMECA Criticality** | Category III (Marginal) when used alongside room CRAH; Category II if in-row is primary cooling path |
| **Impact if Unavailable** | Localized hot-spot at 1–3 racks; IT throttling in affected pods |
### 3.5 Coolant Distribution Units (CDUs)
**Description:** Liquid-to-liquid heat exchangers with integral pumps providing isolated secondary coolant loops to direct-to-chip or cold-plate cooled servers. Primary side connects to facility chilled water; secondary side connects to IT coolant manifolds.[26][24][31]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | Vertiv CoolChip Econophase CDU[31]; Motivair CoolDoor CDU (supporting up to 150 kW/rack)[26]; CoolIT Systems rack CDU; Schneider Electric EcoBreeze CDU |
| **SIL Rating** | Not SIL-rated; leak detection and flow monitoring per ASHRAE/OCP standards |
| **MTBF** | Pump MTBF ~50,000–100,000 hours; heat exchanger >200,000 hours |
| **Critical Item** | **Yes** for liquid-cooled AI/GPU pods |
| **FMECA Criticality** | Category I (Catastrophic) for liquid-cooled AI clusters — CDU failure causes GPU thermal emergency shutdown |
| **Hazard Log Entry** | Yes — coolant leak onto IT hardware, pump cavitation, chilled water freeze in secondary loop |
| **MOR** | N+1 CDU pumps; secondary coolant temperature maintained <18°C supply; leak detection active |
| **Connectivity** | BACnet/Modbus/SNMP to BMS and DCIM; flow rate, supply/return temperature, differential pressure monitoring |
| **Impact if Unavailable** | Loss of CDU → all GPU servers on that manifold emergency shut down within 60–120 s; for a 100-GPU pod ≈ 100% AI compute loss for that pod |
### 3.6 Rear-Door Heat Exchangers (RDHx / RDHX)
**Description:** Passive or active heat exchangers mounted on rack rear door; intercept exhaust heat from air-cooled servers and transfer it to facility chilled water, enabling room-neutral thermal design.[26][32][33]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | Motivair ChilledDoor® (passive, up to 72 kW/rack)[34][26]; Schneider Electric ACDC (active rear door, 10–40 kW)[26]; Vertiv RDHx (integrated with Geist monitoring) |
| **SIL Rating** | Not SIL-rated |
| **MTBF** | Passive unit ~500,000+ hours (no moving parts); active fan-assisted ~60,000 hours[32] |
| **Critical Item** | Moderate — supports high-density racks but is not sole cooling path in hybrid designs |
| **FMECA Criticality** | Category III (Marginal) in hybrid design; Category II in exclusively RDHx-cooled row |
| **MOR** | Chilled water supply maintained; condensation prevention (chilled water inlet > dew point) |
| **Impact if Unavailable** | Row temperature rises 5–15°C; servers throttle; 20–40% compute reduction per affected row |

***
## 4. Compute & Storage
### 4.1 Standard Compute Rack (Representative Sample — 1 rack shown)
**Description:** 42U or 48U server rack hosting CPU/GPU compute nodes, storage nodes, and networking equipment.[35][3]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model (Rack)** | Vertiv VR Rack 42U (600 × 1200 mm); Schneider Electric NetShelter SX 48U; Rittal TS 8 42U |
| **Typical Contents** | 8–16 × Dell PowerEdge R760 (CPU), 4–8 × NVIDIA DGX H100 or DGX B200 (GPU/AI), 2 × rPDU, 2 × KVM/serial tap, cable management |
| **Rack Power Density** | Standard: 8–20 kW; AI/GPU rack: 80–130+ kW (CDU/RDHx required)[4][36] |
| **SIL Rating** | IT equipment: not SIL-rated; power path to rack (PDU/UPS): SIL 1 |
| **Critical Item** | **Yes** (represents all revenue-generating compute) |
| **FMECA Criticality** | Category II (Critical) — loss of single rack is bounded; full row/pod loss is Category I |
| **MOR** | Power (A+B feeds from UPS), cooling (CRAH/CDU active), network connectivity (dual ToR switches) |
| **Impact if Unavailable** | 1 rack loss ≈ <1% compute capacity; pod loss ≈ 5–20% compute capacity |
### 4.2 All-Flash / NVMe Storage Arrays
| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | Pure Storage FlashArray//XL or NetApp AFF A-series (all-NVMe); IBM FlashSystem 9500 |
| **SIL Rating** | Not SIL-rated; HA mirroring (Active-Active controller pairs) |
| **MTBF** | Controller MTBF ~1,000,000 hours; NVMe flash DWPD-rated for 1–5 DWPD over 5 years |
| **Critical Item** | **Yes** |
| **FMECA Criticality** | Category II (Critical) — dual-controller failure = loss of storage domain, cascading application failure |
| **MOR** | Active-Active dual controller; minimum 1 controller + N+1 SSDs per RAID group |
| **Impact if Unavailable** | Storage domain offline: all VMs/containers dependent on that domain lose I/O → application crash; can affect 20–50% workloads per storage node |

***
## 5. Networking
### 5.1 Spine-Leaf Network Fabric
**Description:** Two-tier Clos network using 400 GbE spine switches and 25/100 GbE leaf switches, providing low-latency east-west traffic for AI/HPC distributed workloads.[37][38][39]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model (Spine)** | Arista 7800R4 (400GbE, 460.8 Tbps fabric)[37]; Cisco Nexus 9000 (N9K-X9624D-R2, 400GbE); Juniper QFX10008 (400GbE)[39] |
| **Manufacturer / Model (Leaf)** | Arista 7050X4 (48×25GbE + 8×100GbE uplinks); Cisco Nexus 93180YC-FX3 (48×25G + 6×100G) |
| **Manufacturer / Model (ToR)** | Arista 7060X5 (64×100G); Cisco Nexus 9336C-FX2 |
| **SIL Rating** | Not SIL-rated; redundant supervisors and power supplies standard |
| **MTBF** | Spine chassis MTBF ~400,000–600,000 hours; ToR ~200,000 hours |
| **Critical Item** | **Yes** |
| **FMECA Criticality** | Category I (Catastrophic) for spine failure without redundancy; Category II for single leaf/ToR |
| **Hazard Log Entry** | Yes — BGP black-hole, STP loop (legacy), misconfiguration causing east-west traffic blackout |
| **MOR** | Dual spine switches (ECMP); dual ToR per rack (A/B bonded NIC); BGP control plane monitoring |
| **Connectivity** | SNMP/gNMI to DCIM/NOC; sFlow/IPFIX for traffic telemetry |
| **Impact if Unavailable** | Spine failure (both): full fabric partitioned; east-west AI training traffic interrupted = 100% distributed GPU job loss |
### 5.2 Border Firewalls / Perimeter Security
**Description:** North-south traffic inspection and segmentation at the facility perimeter and between security zones.[40][38][41]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | Palo Alto Networks PA-7000 Series (NG firewall, 1.44 Tbps); Cisco Firepower 4140 / FTD; Fortinet FortiGate 7060F |
| **SIL Rating** | Not SIL-rated (IT security, not functional safety) |
| **MTBF** | ~200,000–400,000 hours |
| **Critical Item** | **Yes** (cyber perimeter) |
| **FMECA Criticality** | Category I (Catastrophic) — compromise or failure of both HA firewall nodes = loss of network segmentation, potential data exfiltration |
| **Hazard Log Entry** | Yes — firewall misconfiguration, DoS/DDoS bypass, policy failure |
| **MOR** | Active-passive HA pair minimum; separate OT/IT segmentation required per IEC 62443[9] |
| **Connectivity** | SNMP/Syslog to SIEM; API to SOAR/DCIM for automated response |
| **Impact if Unavailable** | Network access disrupted; security isolation compromised; regulatory breach risk |
### 5.3 Out-of-Band (OOB) / Console Management
**Description:** Serial console and KVM-over-IP for out-of-band management of servers, switches, PDUs, and infrastructure when primary network is unavailable.[42][43][44]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model (Serial)** | Vertiv Avocent ACS 8000 (8–48 ports, 4G LTE cellular failover, ZTP)[45][44]; ZPE Systems Nodegrid (multi-port, SD-WAN/cellular) |
| **Manufacturer / Model (KVM)** | Raritan Dominion KX IV-101 (4K, NIAP PP 4.0 CC-certified)[46]; Vertiv Avocent MPU8032 (32-port KVM); Lantronix SLC 8000 (serial) |
| **SIL Rating** | Not SIL-rated |
| **MTBF** | ~200,000–400,000 hours |
| **Critical Item** | **Yes** (enables management during outages) |
| **FMECA Criticality** | Category II (Critical) — loss of OOB means remote management of failed systems is impossible |
| **MOR** | Cellular failover active; OOB network must be on isolated VLAN/OOB management plane |
| **Connectivity** | Dedicated OOB LAN, cellular 4G/5G fallback, SNMP/SSH/REST to DCIM |
| **Impact if Unavailable** | All remote console access lost; engineers must physically access racks for recovery → MTTR increases by 2–10× |

***
## 6. DCIM and Monitoring Platforms
### 6.1 DCIM Platform — Vertiv Environet
**Description:** Centralized monitoring and management platform providing real-time environmental, power, and asset visibility across the facility.[47][19][48][20]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Product** | Vertiv/Geist Environet (enterprise DCIM); Vertiv Environet Alert (SMB/edge variant)[47][19][20] |
| **Protocols Supported** | SNMP, Modbus, BACnet, LonWorks[19]; API integration to BMS, NMS, SIEM |
| **SIL Rating** | Not SIL-rated; supports alarm management for safety-relevant systems |
| **Critical Item** | **Yes** (operational visibility) |
| **FMECA Criticality** | Category II (Critical) — loss of DCIM blinds operators to thermal, power, and environmental events |
| **MOR** | Redundant DCIM server (active-standby); polling interval ≤ 60 s for critical power/cooling sensors |
| **Connectivity** | SNMP/BACnet/Modbus to all power, cooling, and environmental sensors; REST API to CMDB/ITSM |
| **Impact if Unavailable** | Environmental alerts suppressed; reactive-only operations; MTTR for incidents increases |
### 6.2 AI-Based Predictive Maintenance — Vertiv Next Predict
**Description:** AI-powered managed service (launched January 2026) using ML anomaly detection, predictive algorithms, and root-cause analysis to anticipate failures in power and cooling equipment before they occur.[49][50][51][52]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Product** | Vertiv™ Next Predict (cloud-connected, managed service; covers Vertiv power, cooling, BESS, and liquid cooling platforms)[49][50][51][52] |
| **SIL Rating** | Not SIL-rated (monitoring/advisory service) |
| **Critical Item** | Moderate — enhances reliability but not a safety system |
| **FMECA Relevance** | Reduces RPN for power/cooling failure modes by improving Detection (D) score in FMECA[9] |
| **Impact if Unavailable** | Reverts to calendar-based or reactive maintenance; mean time to detection (MTTD) for degrading assets increases; MTBF-to-failure interval unknown |

***
## 7. Building Management System (BMS) and DCS Integration
**Description:** BMS/EMS unifies HVAC, power, fire safety, and access control into a single supervisory control and data acquisition layer. Protocols include BACnet/IP, Modbus, LonWorks, and OPC-UA for DCS integration.[53][54][55]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | Johnson Controls Metasys (BMS, BACnet/Modbus)[25]; Honeywell EBI (Enterprise Buildings Integrator); Schneider Electric EcoStruxure Building (BMS)[18]; Siemens Desigo CC (MV/BMS integration) |
| **SIL Rating** | BMS supervisory: not SIL-rated; safety-instrumented BMS functions (emergency cooling shutdown, fire damper release): SIL 1 per IEC 61511[7] |
| **MTBF** | BMS server hardware ~100,000 hours; network I/O modules ~300,000 hours |
| **Critical Item** | **Yes** (site-wide supervisory control) |
| **FMECA Criticality** | Category I (Catastrophic) for BMS total failure — loss of automated cooling, fire damper, and power control |
| **Hazard Log Entry** | Yes — BMS compromise can disable fire dampers, disable cooling, manipulate power, suppress alarms |
| **MOR** | Redundant BMS servers (active-standby); manual override capability for all safety-critical BMS outputs |
| **Connectivity** | BACnet/IP to CRAH, chiller, AHU, UPS, PDU; OPC-UA to site SCADA/DCS; fire panel hardwired (not BMS-only safety paths) |
| **Impact if Unavailable** | Loss of automated environmental control, blind to energy consumption KPIs, manual plant operation required |

***
## 8. Fire Detection and Suppression
### 8.1 Very Early Warning Aspirating Smoke Detection (VESDA)
**Description:** Aspirating smoke detectors providing the earliest possible warning before visible smoke, particularly for smoldering equipment faults.[56]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | Xtralis VESDA-E VEA/VEP (includes Li-ion off-gas detection)[56]; Securiton ASD535; Hochiki FIRElink |
| **SIL Rating** | Fire detection systems: SIL 1–SIL 2 per IEC 62061 / ISO 26262 for safety function initiation |
| **MTBF** | ~100,000 hours; annual servicing required |
| **Critical Item** | **Yes** |
| **FMECA Criticality** | Category I (Catastrophic) — failure of VESDA delays fire detection, risking unchecked fire propagation into IT equipment |
| **Hazard Log Entry** | Yes — undetected incipient fire, false alarm causing unnecessary suppression discharge, Li-ion off-gas detection failure |
| **MOR** | Minimum 1 aspirating detector per data hall zone; cross-zone confirmation before suppression discharge |
| **Connectivity** | RS-485/LON to fire alarm control panel (FACP); BMS integration via BACnet/Modbus |
### 8.2 Fire Alarm Control Panel (FACP)
| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | Siemens Sinteso FC2080 or Notifier NFS2-3030; EST3 (Edwards); Honeywell Fire/Morley |
| **SIL Rating** | Fire detection and alarm: SIL 2 per NFPA 72 and EN 54; suppression release function: SIL 2–SIL 3 depending on jurisdiction[7][57] |
| **Critical Item** | **Yes** |
| **FMECA Criticality** | Category I (Catastrophic) |
| **Hazard Log Entry** | Yes — FACP failure suppresses all alarms; FACP compromise disables suppression |
| **MOR** | Redundant loop cards; battery backup ≥ 24 hours |
### 8.3 Clean Agent Fire Suppression (FM-200 / Novec 1230 / Inergen)
**Description:** Gaseous clean agents discharge within 10 s to suppress fires without damaging IT equipment or leaving residue.[58][59]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | Kidde Sapphire (Novec 1230)[59]; Fike FE-227 (FM-200/HFC-227ea)[58][59]; Ansul INERGEN (inert gas, IG-541) |
| **SIL Rating** | Suppression release circuit: SIL 1–SIL 2; system abort switch and pre-discharge alarm required per NFPA 2001 |
| **MTBF** | Cylinder valve: >100,000 cycles; agent resupply required after each discharge |
| **Critical Item** | **Yes** |
| **FMECA Criticality** | Category I (Catastrophic) — suppression failure allows uncontrolled fire; accidental discharge causes oxygen depletion hazard (inert gas) |
| **Hazard Log Entry** | Yes — unintentional discharge (false alarm), agent depletion, halon-replacement agent environmental compliance |
| **MOR** | Two-zone cross-confirm before discharge; abort switch per zone; replacement cylinders on-site within 24 h |
| **Connectivity** | Hardwired to FACP (not BMS-sole control); BMS receives status signal only |

***
## 9. HVAC — Computer Room / Data Hall
**Description:** Site-level HVAC for office spaces, electrical rooms, generator rooms, and battery rooms, distinct from precision cooling for data halls.

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | Daikin VRV/VRF or Carrier AHU; Johnson Controls HVAC controls[25]; Siemens BT300 variable frequency drives (AHU fans) |
| **SIL Rating** | Battery room ventilation: SIL 1 (explosion prevention for hydrogen off-gas from VRLA batteries); generator room exhaust: SIL 1 |
| **Critical Item** | Moderate for general HVAC; **Yes** for generator room, battery room, and electrical room ventilation |
| **FMECA Criticality** | Category II (Critical) for battery/generator room ventilation; Category III for general office HVAC |
| **Hazard Log Entry** | Yes — battery room hydrogen accumulation; generator exhaust recirculation; electrical room overheating |
| **MOR** | Battery room ventilation must operate continuously; generator room must have 1 ACH minimum at rated load |

***
## 10. Physical Security
### 10.1 CCTV / Video Surveillance
**Description:** IP-based video surveillance covering perimeter, entrances, server halls, and critical equipment areas, with AI-based analytics for anomaly detection.[60][41][61]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | Avigilon H6A PTZ + fixed cameras (AI analytics integrated)[41]; Hanwha Vision QNV-8080R; Axis Communications Q6135-LE PTZ |
| **VMS Platform** | Genetec Security Center; Milestone XProtect Corporate; Avigilon Control Center |
| **SIL Rating** | Not SIL-rated (physical security); integration to fire/BMS per IEC 62443 zones |
| **Critical Item** | **Yes** (physical security continuity, regulatory compliance) |
| **FMECA Criticality** | Category II (Critical) — CCTV offline removes physical security visibility; adversarial exploitation of camera blind-spots |
| **Hazard Log Entry** | Yes — CCTV system compromise as precursor to physical attack, failure to capture evidence of unauthorized access |
| **MOR** | 100% uptime of perimeter and critical zone cameras; minimum 30-day video retention |
| **Connectivity** | IP/Ethernet PoE to NVR/VMS server; ONVIF Profile S/G; API integration to access control platform |
### 10.2 Door Access Control and Biometrics
**Description:** Multi-layer physical access control enforcing least-privilege and mantrap/airlock at critical zones.[62][60][63]

| Attribute | Detail |
|-----------|--------|
| **Manufacturer / Model** | LenelS2 OnGuard (ACS platform)[63]; Honeywell ProWatch; Lenel S2 NetBox; HID Global iCLASS SE readers; Suprema FaceStation 2 (biometric) |
| **SIL Rating** | Not SIL-rated; emergency egress must be fail-safe (door releases on power failure per life safety code) |
| **Critical Item** | **Yes** |
| **FMECA Criticality** | Category II (Critical) — system failure allows uncontrolled access (fail-secure mode) or complete lockout (fail-safe mode); both are hazardous |
| **Hazard Log Entry** | Yes — access control system compromise enables insider threat or external attacker physical access to MV switchgear, generators, UPS, and server halls |
| **MOR** | UPS-backed access control panels; fail-safe on egress, fail-secure on data hall ingress; audit log continuity |
| **Connectivity** | RS-485/IP to ACS head-end; LDAP/Active Directory integration for credential management; CCTV linkage for video badging |
### 10.3 Perimeter Security (Fence, Barriers, Lighting)
| Attribute | Detail |
|-----------|--------|
| **Components** | Hostile vehicle mitigation (HVM) bollards (ATG Access), perimeter fence (PIDS — Fiber Patrol or Optex beam detection), CCTV poles with integrated lighting |
| **SIL Rating** | Not SIL-rated |
| **Critical Item** | **Yes** (physical perimeter integrity) |
| **FMECA Criticality** | Category II (Critical) — perimeter breach enables direct physical attack on critical power/cooling infrastructure |

***
## 11. Consolidated Bill of Materials (Representative Equipment per System)
| System | Manufacturer | Model / Product | Qty (Representative) | Connectivity |
|--------|-------------|-----------------|----------------------|-------------|
| MV Switchgear | Schneider Electric | SM6 / RM6 or UniGear ZS1 | 2–4 panels | IEC 61850 / Modbus to SCADA |
| Distribution Transformer | ABB | RESIBLOC 2.5 MVA 11kV/415V | 2+ (N+1) | SCADA via Modbus |
| Diesel Generator | Caterpillar | Cat 3516C 2000 kW | 4+ (N+1 per pod) | BMS via Modbus |
| ATS | Eaton | MAGNUM DS ATS | 1 per distribution circuit | BMS/SCADA relay |
| STS (Static) | Vertiv | Liebert STS2 | 1 per UPS A/B pair | SNMP/BMS |
| UPS (Double Conversion) | Eaton | 9395XR 1500–2500 kVA | 2+ (N+1 per MDF) | SNMP/Modbus → DCIM |
| BESS | Vertiv / Tesla | Vertiv BESS / Megapack 3.9 MWh | 2–6 units | IEC 61850 / Modbus → EMS |
| rPDU | Vertiv | Geist rPDU (metered) | 2 per rack (A+B) | SNMP → DCIM |
| Chiller | Carrier / Trane | AquaForce 30XW / CenTraVac CVHF | 3–6 (N+1) | BACnet/IP → BMS |
| Cooling Tower | Evapco | AT Series (open loop) | 4–8 cells (N+1) | BACnet → BMS |
| CRAH | Vertiv | Liebert CW 100 kW | 8+ per data hall (N+1) | BACnet/Modbus → BMS/DCIM |
| In-Row Cooling | Vertiv | Liebert CRV 20 kW | 1 per 4–6 racks | BACnet/Modbus |
| CDU | Motivair | CoolDoor CDU 150 kW | 1 per 4–8 GPU racks | BACnet/Modbus/SNMP → DCIM |
| RDHx | Motivair | ChilledDoor® 72 kW | 1 per AI rack | Manual valve; BMS flow monitoring |
| Compute Rack | Vertiv | VR Rack 42U | Per design | Passive |
| CPU Server | Dell / HPE | PowerEdge R760 / ProLiant DL380 Gen11 | Per rack design | IPMI/BMC → OOB |
| GPU/AI Server | NVIDIA | DGX H100 / DGX B200 | Per pod design | NVLink/InfiniBand; BMC → OOB |
| Storage Array | Pure Storage | FlashArray//XL | 2 (Active-Active HA) | FC/iSCSI/NVMe-oF → ToR |
| Spine Switch | Arista | 7800R4 (400GbE) | 2–4 (redundant) | gNMI/SNMP → DCIM |
| Leaf/ToR Switch | Arista | 7050X4 | 2 per rack pair | SNMP → DCIM |
| Firewall | Palo Alto Networks | PA-7000 Series | 2 (HA pair) | SNMP/Syslog → SIEM |
| Serial Console (OOB) | Vertiv | Avocent ACS 8000 48-port | 1 per 48 devices | SSH/SNMP; 4G LTE failover |
| KVM-over-IP | Raritan | Dominion KX IV-101 | 1 per 16 servers | IP/SNMP |
| DCIM Platform | Vertiv | Environet Enterprise | 2 (redundant servers) | SNMP/BACnet/Modbus/REST |
| Predictive Maintenance | Vertiv | Next Predict (SaaS) | Per site | Cloud API + Vertiv hardware telemetry |
| BMS | Johnson Controls | Metasys | 2 (A/S redundant) | BACnet/IP + Modbus |
| VESDA | Xtralis | VESDA-E VEA | 1 per zone (≥2 zones per hall) | RS-485 → FACP |
| FACP | Siemens | Sinteso FC2080 | 1 per building (zoned) | BACnet/Modbus → BMS |
| Clean Agent Suppression | Kidde | Sapphire (Novec 1230) | 1 system per data hall | Hardwired to FACP |
| CCTV | Avigilon / Hanwha | H6A PTZ + fixed | Per zone coverage | IP/PoE → VMS (Genetec) |
| Access Control | LenelS2 | OnGuard + iCLASS SE readers | Per door | IP → LenelS2 server |
| Perimeter / HVM | ATG Access | Shallow Foundation Bollards | Per entry point | Manual / BMS monitored |

***
## 12. FMECA Summary — Critical Systems
The following table summarizes FMECA criticality and hazard log applicability for each major system, using a four-level severity classification aligned with MIL-STD-1629A and ISO 31000.[9][64][65][10]

| System | FMECA Category | Severity | Hazard Log | SIL Applicable | Consequence of Failure |
|--------|---------------|----------|------------|----------------|------------------------|
| Utility MV Intake | I — Catastrophic | Safety + Mission | Yes | SIL 1–2 (relay) | 100% compute loss; safety hazard (arc flash) |
| Transformers | I — Catastrophic | Mission | Yes | SIL 1 (protection) | Pod power loss |
| Diesel Generators | I / II | Safety + Mission | Yes | SIL 1–2 | Site blackout if all fail |
| ATS / STS | I — Catastrophic | Mission | Yes | SIL 1 | IT power interruption |
| UPS | I / II | Mission | Yes | SIL 1 (bypass/Li-ion) | Compute loss; Li-ion fire hazard |
| BESS | I — Catastrophic | Safety + Mission | Yes | SIL 1–2 (BMS) | Fire/explosion; loss of power buffer |
| Chillers | I — Catastrophic | Mission | Yes | SIL 1 (protection) | IT thermal shutdown in minutes |
| CDU (liquid cooling) | I — Catastrophic | Mission | Yes | Not SIL-rated | GPU/AI compute emergency shutdown |
| CRAH | II — Critical | Mission | Yes | Not SIL-rated | Row temperature rise; IT throttle |
| Spine Switches | I / II | Mission | Yes | Not SIL-rated | Fabric partition; AI job loss |
| Firewalls | I — Catastrophic | Security | Yes | Not SIL-rated | Segmentation loss; breach |
| FACP | I — Catastrophic | Safety | Yes | SIL 2 | Undetected fire; suppression failure |
| Clean Agent Suppression | I — Catastrophic | Safety | Yes | SIL 1–2 | Uncontrolled fire; O2 hazard |
| VESDA | I — Catastrophic | Safety | Yes | SIL 1–2 | Delayed fire detection |
| BMS | I — Catastrophic | Mission + Safety | Yes | SIL 1 (safety functions) | Loss of automated plant control |
| DCIM (Environet) | II — Critical | Mission | Yes | Not SIL-rated | Blind operations; delayed response |
| OOB Console (ACS 8000) | II — Critical | Mission | Yes | Not SIL-rated | Loss of remote management; MTTR ×10 |
| Access Control | II — Critical | Safety + Security | Yes | Not SIL-rated | Physical breach or lockout |
| CCTV | II — Critical | Security | Yes | Not SIL-rated | Physical security blind-spots |

***
## 13. Minimum Operating Requirements (MOR) Summary
| System | MOR Threshold | Compute/Resource Impact if Below MOR |
|--------|--------------|--------------------------------------|
| MV Utility Intake | ≥1 live MV feed | 100% compute loss on grid failure |
| UPS | ≥N+1 modules online; battery autonomy ≥5 min | Immediate compute loss on generator start delay |
| BESS | ≥1 operative unit at ≥80% SoC | Loss of demand buffer; 100 ms voltage sag risk on AI load step |
| Generators | ≥N+1 online; start within 30 s | Full site blackout if utility fails |
| Chillers | ≥N+1 online; chilled water ≤14°C | IT thermal trip within 5–30 min → 100% compute loss |
| CDU | ≥N+1 pumps active; secondary coolant ≤18°C | AI/GPU pod emergency shutdown; 100% pod compute loss |
| CRAH | ≥N+1 per row; air supply ≤18°C | IT throttling 10–40% per row if multiple units fail |
| Spine Network | ≥2 spine switches (ECMP) | AI distributed training fails; 100% east-west traffic loss |
| Firewalls | ≥1 active node (HA pair) | Network connectivity loss and/or security breach |
| FACP | All zones armed | Undetected fire risk — potential total facility loss |
| Clean Agent | All cylinders charged and valve armed | Fire propagation into IT equipment → permanent compute loss |
| DCIM | ≥1 server active | Operational blindness; 100% alarm management degraded |
| BMS | ≥1 server active; all safety I/O responsive | Manual plant operation; safety functions degraded |
| Access Control | ≥1 server active; battery-backed panels | Physical security degraded; unauthorized access risk |

***
## 14. Connectivity and Integration Architecture
All systems communicate over a multi-layer OT/IT integration bus:[53][54][55]

- **Field layer:** Hardwired I/O, RS-485 Modbus, BACnet MS/TP, LON for sensors and actuators
- **Supervisory layer:** BACnet/IP, Modbus TCP, IEC 61850, SNMP v3, OPC-UA for DCIM/BMS integration
- **Enterprise/cloud layer:** REST API, MQTT, gNMI, SNMP traps to NOC, SIEM, SOAR, and cloud-based services (Vertiv Next Predict, Accenture/Dragos OT platform)
- **OT security:** Network segmentation per IEC 62443 zones and conduits; separate OT VLAN for BMS/BAS; firewalled from IT fabric; OOB management plane isolated on dedicated VLAN with cellular failover

Per IEC 62443-3-3, the BMS/DCS network is designated Security Level 2 (SL 2) given the potential for an adversary to tamper with cooling, power, or fire suppression systems, causing significant operational harm.[9]

***
## 15. Notes and Limitations
- SIL ratings cited are typical industry practice; site-specific SIL assignments require a formal safety lifecycle per IEC 61511 / IEC 61508, including HAZOP and LOPA studies.
- MTBF values are manufacturer or industry-reference figures; actual reliability depends on maintenance regime, environment, and loading.
- Specific model selections represent current (2025–2026) representative examples; procurement should confirm availability, lead times, and site-specific certifications.
- This HLD does not replace a site-specific P&ID, single-line diagram (SLD), or detailed engineering design; it provides a reference baseline for BOM, FMECA pre-screening, and MOR policy development.
- The FMECA table above represents a pre-screening/Category A FMECA; a full quantitative FMECA requires failure rate data from reliability databases (MIL-HDBK-217F, OREDA, or vendor data) and detailed consequence trees.[65][10]