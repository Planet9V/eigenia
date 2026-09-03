# Design Considerations for Hyperscale Datacentre Infrastructure

## Chapter 7: OT Systems Inventory — Components, Vendors, and Zone Assignments

## Abstract

This chapter provides the complete OT asset scoping checklist for an IEC 62443-3-2 zone and conduit engagement in a hyperscale datacentre. Every OT component category — power, cooling, BMS, fire, physical security, OT network, compute — is mapped to its IEC 62443 zone assignment, communication protocol, representative vendors, and certification status. Walk the facility against these tables, populate the asset inventory, and the conduit boundaries identify themselves.

**Enhancement:** This version incorporates verified CVE data (2022–2026) from NVD, CISA ICS-CERT, and vendor PSIRTs, along with cross-references to ASHRAE TC 9.9, NFPA 75/76/855, IEC 61850, and EN 50600/ISO 22237 standards. Every table now includes a "Known CVEs" column where applicable, and a "Standards Reference" column for critical subsystems.

---

## Practitioner's Note

When I conduct an IEC 62443-3-2 zone and conduit workshop, the first question is always: "what assets are in scope?" In a petrochemical plant, the answer is usually well-documented — P&IDs, loop drawings, instrument schedules. In a datacentre, the answer is often "we think the BMS is on this VLAN, but we're not sure what else is on it."

This chapter provides the complete OT systems inventory that eliminates the asset identification phase of a 62443-3-2 engagement. Every component category is mapped to its IEC 62443 zone, representative vendors are listed with their certification status, and the OT protocols that define conduit boundaries are documented.

**New:** I have also integrated the latest CVE research (through June 2025) for every major vendor and product line. If you see a CVE reference in a table, that means a known exploit path exists for that component — patch it, segment it, or replace it before the workshop. The standards references (ASHRAE, NFPA, IEC) are there to help you align your zone boundaries with regulatory and industry best practices.

This is intended as a scoping checklist. Walk the facility against each section, populate the asset inventory, and use the protocol fields to identify conduit boundaries.

---

## 1. IEC 62443 Zone Architecture for Datacentres

Before cataloguing assets, the zone model must be established. The following reconciles the ISA-95/Purdue reference model with IEC 62443 zone taxonomy as applied to a modern datacentre:

**Table 7.2: The following reconciles the ISA-95/Purdue reference model with IEC 62443 zone taxonomy as applied to a modern datacentre**

| Zone | Purdue Level | Name | Example Assets | Typical Protocols | SL-T Guidance | Standards Reference |
|:---|:---|:---|:---|:---|:---|:---|
| **Z0 / Enterprise** | L4–L5 | Enterprise IT / Business Network | Corporate IT, ITSM (ServiceNow), carbon accounting, business analytics | HTTPS, REST, SSH | SL-T 2 | ISO 22237, EN 50600 |
| **Z1 / Operations** | L3–L3.5 (IDMZ) | DCIM / BMS Management | DCIM servers, BMS historian, OT IDS consoles (Claroty, Nozomi, Dragos), jump hosts, PAM | HTTPS, OPC UA, REST, BACnet/WS | SL-T 2–3 | IEC 62443-3-2 ZCR 3 |
| **Z2 / Supervisory** | L2 | Building Automation / Supervisory Control | BMS head-ends (Metasys, Desigo CC, EBO), EPMS servers, CDU controllers, UPS NMCs, physical security | BACnet/IP, BACnet/SC, Modbus TCP, SNMP v3, OPC UA | SL-T 2–3 | IEC 62443-3-2 ZCR 4 |
| **Z3 / Field** | L0–L1 | Field Device / Physical Process | DDC controllers, protection relays, power meters, sensors, actuators, VFDs, rack PDUs | BACnet MS/TP, Modbus RTU, LON, 4–20 mA, IEC 61850 GOOSE | SL-T 1–2 | IEC 62443-4-2 FR1–FR7 |
| **Z4 / SIS** | Isolated | Safety Instrumented Systems | Fire alarm panels, suppression controllers, VESDA, EPO circuits | SLC, RS-485, dry contacts | SL-T 2–3 | NFPA 75, NFPA 76 |
| **Z5 / OOB** | DMZ segment | Out-of-Band / Jump Infrastructure | Serial consoles, OOB switches, vendor portals, PAM bastion | SSH, HTTPS, RDP (proxied) | SL-T 3 | IEC 62443-3-2 ZCR 5 |

**Critical conduits requiring explicit IEC 62443-3-2 documentation:**
- Z2 → external: Vendor remote access to BMS, UPS cards, CDU cloud portals
- Z4 → Z2: Fire alarm supervisory signal (one-way dry-contact only)
- Z1 → Z2: DCIM to BMS (read-only preferred)
- Z3 → Z4: Field detector to fire alarm panel (supervised SLC loop)

**Standards note:** The zone model above aligns with IEC 62443-3-2 Clause 5.4 (Zone and Conduit Requirements) and the ISA-95/Purdue model. For datacentre-specific classification, refer to EN 50600-2-6 (Management and Operational Information) and ISO 22237-2 (Building Construction). ASHRAE TC 9.9 provides thermal guidelines that influence cooling zone boundaries.

---

## 2. Electrical Power Chain

The electrical chain from utility intake to rack outlet is the most consequential OT attack surface. Compromise of generation dispatch, paralleling switchgear, or UPS management causes facility-wide outage.

### 2.1 High-Voltage and Medium-Voltage Infrastructure

**Table 7.3: 2.1 High-Voltage and Medium-Voltage Infrastructure**

| Component | Representative Vendors | Zone | OT Interface | Certification | Known CVEs | Standards Reference |
|:---|:---|:---|:---|:---|:---|:---|
| Utility substation (HV switchgear) | ABB, Siemens Energy, GE Vernova, Hitachi Energy | Z3 (relays/meters) | IEC 61850 MMS/GOOSE | None (62443-4-2) | CVE-2024-52504 (SIPROTEC 4 DoS) [SSA-400089] | IEC 61850, IEEE C37.118 |
| MV switchgear (5–35 kV) | ABB UniGear, Siemens NXPLUS C, Schneider PIX, Eaton VacClad-W | Z3 (breakers); Z2 (relay IEDs) | IEC 61850, serial Modbus | None | CVE-2024-54017 (SIPROTEC 5) [SSA-687955] | IEC 62271 |
| Substation transformers | ABB TrafoStar, Siemens GEAFOL, Schneider Trihal, Eaton FR3 | Z3 | Buchholz relay, OLTC, winding temp | None | — | IEEE C57.12.00 |
| Protection relays | SEL-400/735, ABB Relion 670, Siemens SIPROTEC 5, GE Multilin | Z3 (process bus); Z2 (station bus) | IEC 61850, Modbus, DNP3 | SIL-2/SIL-3 (safety only) | CVE-2024-2103 (SEL undocumented features) [CISA Apr 2024]; CVE-2024-53648 (SIPROTEC 5 dev shell) [SSA-687955] | IEC 61850-9-2 (process bus) |

**CVE Detail — Protection Relays:**

| CVE ID | CVSS | Affected Product | Impact | Remediation |
|:---|:---|:---|:---|:---|
| CVE-2024-52504 | 8.7 | Siemens SIPROTEC 4/4 Compact | Remote unauthenticated DoS during file transfer | No fix planned for many SKUs; isolate network |
| CVE-2024-54017 | High | Siemens SIPROTEC 5 (6MD85, 6MD86) | Remote service exploitation | Upgrade to V11.0+ |
| CVE-2024-53648 | High | Siemens SIPROTEC 5 | Physical access → arbitrary command execution via dev shell | Restrict physical access |
| CVE-2024-2103 | Medium | SEL-700BT, 700G, 710-5, 751, 787-2/-3/-4, 787Z | Undocumented features → unpredictable relay behavior, DoS | Check Appendix A of product manual for required firmware |

### 2.2 Power Conversion and Distribution

**Table 7.4: 2.2 Power Conversion and Distribution**

| Component | Representative Vendors | Zone | OT Interface | Certification | Known CVEs | Standards Reference |
|:---|:---|:---|:---|:---|:---|:---|
| UPS (power stage) | Schneider Galaxy VX (1.25 MW), Vertiv EXL S1, Eaton 93PM, ABB DPA/HiPerGuard, Mitsubishi 9900 | Z3 | Internal bus only | None | — | IEC 62040 |
| UPS network management card | Schneider NMC3, Vertiv IntelliSlot/RDU120, Eaton NETWORK-M3 | Z2 | SNMP v3, Modbus TCP, HTTPS | **SL-2** (Schneider, Vertiv, Eaton) | CVE-2022-22805/22806/0715 (TLStorm, CVSS 9.8); CVE-2025-46412 (Vertiv auth bypass); CVE-2025-41426 (Vertiv buffer overflow); CVE-2025-22495 (Eaton Network-M2 command injection) | IEC 62443-4-2 FR1, FR3 |
| ATS / STS | ASCO 7000, Eaton ATC-300+, LayerZero eSTS, Russelectric | Z3 (transfer logic) | Modbus, dry contacts | None | CVE-2025-1058/1059/1060/1070 (ASCO 5310/5350, CVSS 8.7) [ICSA-25-?] | IEC 60947-6-1 |
| Generators | Caterpillar, Cummins QSK, MTU/Rolls-Royce, Kohler KD | Z3 (ECU) | SAE J1939, Modbus | None | — | ISO 8528 |
| Generator paralleling controls | Woodward EasyGen, ComAp InteliGen, Cummins PowerCommand | Z2 (high-value PLC) | Modbus TCP, IEC 60870, SNMP | None | — | IEC 60034 |
| Battery systems (VRLA, Li-ion, BESS) | EnerSys, CATL, Saft, Tesla Megapack, Fluence | Z3 (strings); Z2 (BMS) | Modbus, DNP3, IEC 61850 | NFPA 855 (safety) | — | NFPA 855, UL 9540A |
| LV switchgear | Schneider MasterPact, Eaton Pow-R-Line, Siemens Sentron | Z3 | Modbus TCP to BMS | None | — | IEC 61439 |
| Floor/zone PDUs | Schneider, Vertiv Geist, Eaton EPDU, Legrand/Raritan | Z2/Z3 boundary | Modbus TCP, SNMP | None | CVE-2025-48394/48395 (Eaton G4 PDU path traversal) | IEC 62040 |
| Rack PDUs (intelligent) | Vertiv Geist rPDU, Server Technology PRO3X, Raritan PX4, Schneider APC | **Z2** (switched outlets!) | HTTP/HTTPS, SSH, SNMP, Modbus | None | — | IEC 62040 |
| Busway / bus duct | Starline Track Busway, Schneider Canalis, Eaton Pow-R-Way III | Z3 (passive); Z2 (monitors) | Modbus TCP (if monitored) | None | — | IEC 61439-6 |
| EPMS | Schneider PowerLogic ION9000 + PME, Siemens SENTRON + Powermanager, ABB M4M, SEL-735 | Z2 (SCADA); Z3 (meters) | Modbus TCP, DNP3, IEC 61850, OPC UA | **SL-2** (Schneider PME) | CVE-2025-54923–54927 (PME deserialization, SSRF, path traversal) [SEVD-2025-224-02] | IEC 61557-12 |

**CVE Detail — UPS Network Management Cards:**

| CVE ID | CVSS | Affected Product | Impact | Remediation |
|:---|:---|:---|:---|:---|
| CVE-2022-22805 | 9.8 | APC Smart-UPS (TLStorm) | TLS bypass → remote code execution | Patch NMC firmware; migrate to NMC3 |
| CVE-2022-22806 | 9.8 | APC Smart-UPS (TLStorm) | Firmware signing bypass | Patch NMC firmware |
| CVE-2022-0715 | 9.1 | APC Smart-UPS (TLStorm) | Memory corruption → RCE | Patch NMC firmware |
| CVE-2025-46412 | Critical | Vertiv UPS Management Cards | Authentication bypass on webserver | Apply Vertiv firmware update |
| CVE-2025-41426 | Critical | Vertiv UPS Management Cards | Stack-based buffer overflow → code execution | Apply Vertiv firmware update |
| CVE-2025-22495 | 8.4 | Eaton Network-M2 Card | NTP config command injection | Migrate to Network-M3 (EOL) |

**Critical observation:** Intelligent rack PDUs with switched outlets provide *physical power control over servers* via SNMP or HTTPS. A compromised rack PDU can remotely power-cycle production servers — this is not a monitoring interface, it is an actuator. Rack PDU management MUST be on an isolated VLAN with authenticated access.

### 2.3 Renewables and Microgrids

**Table 7.5: 2.3 Renewables and Microgrids**

| Component | Representative Vendors | Zone | Notes | Standards Reference |
|:---|:---|:---|:---|:---|
| Microgrid controller | Schneider EcoStruxure Microgrid Advisor, Siemens SPMC, ABB Microgrid Plus | Z2 (highest-value Z2 asset) | Authority over all generation dispatch | IEEE 1547, IEC 62898 |
| Fuel cells | Bloom Energy SOFC, Plug Power PEM | Z2/Z3 | Grid-alternative; 99.999% uptime claimed | NFPA 853 |
| BESS inverter/PCS | Tesla Megapack, CATL TENER, Fluence | Z2/Z3 | DNP3/IEC 61850 high-risk conduit | NFPA 855, UL 1741 |

---

## 3. Mechanical and Cooling

### 3.1 Central Plant

**Table 7.6: 3.1 Central Plant**

| Component | Representative Vendors | Zone | OT Interface | Certification | Known CVEs | Standards Reference |
|:---|:---|:---|:---|:---|:---|:---|
| Centrifugal chillers | York/JCI YZ/YK, Trane CenTraVac, Carrier AquaEdge 19DV, Daikin HXE | Z2 (controller) | BACnet/IP, Modbus TCP | **SL-1** (JCI York only) | CVE-2025-26385 (Metasys CVSS 10.0) can affect chiller setpoints if integrated via Metasys [ICSA-26-027-04] | ASHRAE 90.1, AHRI 550/590 |
| Cooling towers | BAC, Evapco, SPX/Marley, Delta | Z3 (VFDs, sensors) | Profibus, Modbus | None | — | ASHRAE 90.1 |
| Dry/adiabatic coolers | Güntner, EVAPCO eco-Air, Munters, Lu-Ve | Z3 | Modbus TCP, BACnet | None | — | ASHRAE 90.1 |
| Hydronic pumps + VFDs | Grundfos, Armstrong, Xylem; ABB ACQ580, Danfoss iC7, Siemens G120 | Z2 (VFD); Z3 (pump status) | Modbus RTU/TCP, Profibus | None | CVE-2024-48510 (ABB Drive Composer path traversal, CVSS 9.8); CVE-2024-56336 (Siemens SINAMICS S200 bootloader, CVSS 9.8); CVE-2024-54678 (Siemens Startdrive deserialization) | ASHRAE 90.1, IEC 61800 |

**CVE Detail — VFDs and Drive Controllers:**

| CVE ID | CVSS | Affected Product | Impact | Remediation |
|:---|:---|:---|:---|:---|
| CVE-2024-48510 | 9.8 | ABB Drive Composer | Path traversal → file system access | Update Drive Composer |
| CVE-2024-56336 | 9.8 | Siemens SINAMICS S200 | Unlocked bootloader → full device compromise | Apply firmware update |
| CVE-2024-54678 | 8.2 | Siemens SINAMICS Startdrive (V17-V20) | Deserialization → local authenticated code execution | Update Startdrive |
| CVE-2025-2595 | High | ABB AC500 V3 | Valid accounts issue | Upgrade to FW 3.9.0 |
| CVE-2025-41659 | High | ABB AC500 V3 | Theft of operational info | Upgrade to FW 3.9.0 |

### 3.2 Data Hall Cooling

**Table 7.7: 3.2 Data Hall Cooling**

| Component | Representative Vendors | Zone | OT Interface | Certification | Known CVEs | Standards Reference |
|:---|:---|:---|:---|:---|:---|:---|
| CRAH units | Vertiv Liebert DS/FC, Schneider Uniflair, Stulz CyberAir 4 | Z2 | BACnet/Modbus to BMS | None | — | ASHRAE TC 9.9 |
| CRAC (DX) units | Vertiv Liebert PC, Stulz CRAC W | Z2 | BACnet/Modbus | None | — | ASHRAE TC 9.9 |
| In-row coolers | Vertiv CRV, Schneider InRow RP/RD, Stulz CyberRow | Z2 | BACnet/Modbus | None | — | ASHRAE TC 9.9 |
| Rear-door heat exchangers | Motivair ChilledDoor (75 kW), ColdLogik/USystems CL20 | Z2 (active); Z3 (passive) | BMS integration (active only) | None | — | ASHRAE TC 9.9 |
| CDU (Coolant Distribution Unit) | Motivair XDU, CoolIT DCLC, Asetek RackCDU, Boyd Liqtech, Vertiv XDU, Schneider CDU, ZutaCore | **Z2 (highest-risk cooling asset)** | Modbus TCP, BACnet, vendor cloud | **None** | — | ASHRAE TC 9.9 (liquid cooling guidelines) |
| Cold plates | Asetek, CoolIT, ZutaCore, Mezzo, Boyd/Aavid | N/A (passive) | None | N/A | — | — |
| Quick disconnects | CPC, Stäubli Quickliq, Parker, Swagelok | N/A (mechanical) | None | N/A | — | — |
| Immersion tanks | GRC CarnotJet, Submer SmartPodX, Asperitas AIC24, LiquidStack HF | Z2 (controller) | Modbus/BACnet | None | — | ASHRAE TC 9.9 (immersion cooling) |

**Standards note:** ASHRAE TC 9.9 (Thermal Guidelines for Data Processing Environments) defines recommended and allowable temperature/humidity envelopes. All cooling control systems must be capable of maintaining conditions within the ASHRAE A1–A4 classes. For liquid cooling, refer to ASHRAE TC 9.9 Liquid Cooling Guidelines for Data Centers.

### 3.3 Fluid and Environmental Support

**Table 7.8: 3.3 Fluid and Environmental Support**

| Component | Representative Vendors | Zone | Notes | Standards Reference |
|:---|:---|:---|:---|:---|
| Water treatment (Legionella/DI) | Nalco/Ecolab, ChemTreat, Solenis, Veolia | Z3 (dosing controllers); Z2 (BMS integration) | ASHRAE 188 required | ASHRAE 188 (Legionellosis) |
| Humidification | Condair, Nortec, DRI-STEEM, Carel | Z2 (controllers) | BMS integration via BACnet | ASHRAE 90.1 |
| Leak detection | TraceTek TT-1000, RLE SeaHawk, Dorlen WaterAlert | Z3 (cables); Z2/Z3 (controllers) | TIA-942 T3+ mandatory | TIA-942, EN 50600 |

---

## 4. Building Management and Control

### 4.1 BMS Head-End Platforms (Z2 Supervisory)

**Table 7.9: 4.1 BMS Head-End Platforms (Z2 Supervisory)**

| Vendor / Product | IEC 62443 Certification | Known CVEs | Notes |
|:---|:---|:---|:---|
| Johnson Controls Metasys | **None** | **CVE-2025-26385 (CVSS 10.0)** — SQL injection on ADS/ADX [ICSA-26-027-04]; Dark Angels ransomware (Sep 2023) — $27M+ impact | OpenBlue cloud; BACnet/IP, Modbus; patch GIV-165989 required |
| Siemens Desigo CC | **SL-2** (TÜV SÜD, Sep 2023) | CVE-2025-47809 (CVSS 8.2) — privilege escalation via CodeMeter; CVE-2024-23815 (CVSS 7.5) — unauthenticated SQL queries | PX controller integration; common in European hyperscale |
| Honeywell EBI / Niagara WEBs-N4 | **SL-2** (ISASecure, Dec 2023 — APC variant) | **13 CVEs disclosed Jul 2025** — five rated CVSS 9.8 (CVE-2025-3936, 3937, 3938, 3941, 3944); exploit chain enables full MiTM | Niagara JACE-8000 4-1 SDLC certified; upgrade to Niagara 4.14u2 |
| Schneider EcoStruxure Building (EBO) | No 62443-4-2 cert | CVE-2026-1226/1227 (XXE injection, improper code gen); CVE-2025-8449 (DoS) [SEVD-2026-041-02] | Deep EPMS integration via PME (**PME is SL-2**) |
| Automated Logic WebCTRL (Carrier) | None | — | BACnet-native; strong HVAC optimisation |

**CVE Detail — BMS Head-End Platforms:**

| CVE ID | CVSS | Affected Product | Impact | Remediation |
|:---|:---|:---|:---|:---|
| CVE-2025-26385 | 10.0 | JCI Metasys ADS/ADX ≤14.1 | Command injection → remote SQL execution | Apply patch GIV-165989; close TCP 1433 |
| CVE-2025-3936 | 9.8 | Honeywell Niagara <4.14u2 | Valid accounts exploitation | Upgrade to 4.14u2 |
| CVE-2025-3937 | 9.8 | Honeywell Niagara <4.14u2 | Default credentials | Upgrade to 4.14u2 |
| CVE-2025-3938 | 9.8 | Honeywell Niagara <4.14u2 | Adversary-in-the-Middle | Upgrade to 4.14u2 |
| CVE-2025-3941 | 9.8 | Honeywell Niagara <4.14u2 | Theft of operational info | Upgrade to 4.14u2 |
| CVE-2025-3944 | 9.8 | Honeywell Niagara <4.14u2 | Valid accounts exploitation | Upgrade to 4.14u2 |
| CVE-2025-47809 | 8.2 | Siemens Desigo CC (all versions) | Privilege escalation via CodeMeter | Update CodeMeter to v8.30a+ |
| CVE-2024-23815 | 7.5 | Siemens Desigo CC Server | Unauthenticated SQL queries on port 4998/tcp | Apply Siemens patch |
| CVE-2026-1226 | High | Schneider EBO Workstation/WebStation | XXE injection | Apply SEVD-2026-041-02 patch |
| CVE-2026-1227 | High | Schneider EBO | Improper code generation | Apply SEVD-2026-041-02 patch |

### 4.2 DDC Field Controllers (Z3 / L1)

**Table 7.10: 4.2 DDC Field Controllers (Z3 / L1)**

| Vendor / Product | IEC 62443 Certification | Known CVEs | Notes |
|:---|:---|:---|:---|
| Siemens PXC Series | None | — | Modular I/O; BACnet/IP |
| JCI FX / FAC Series | None | ICSA-25-219-02 (FX80/FX90 controllers) | Metasys N2/SA bus |
| **Saia-Burgess PCD QronoX** | **SL-3** (only BMS DDC at SL-3 globally) | — | IEC 61131-3; Modbus/BACnet/IEC 60870-5 |
| Honeywell Spyder / CP-Open | None | — | BACnet MS/TP |
| Distech ECY Series | In progress | — | REST + BACnet |
| Tridium JACE-8000 | **4-1 SDLC certified** (process, not product) | See Niagara CVEs above | Integration gateway; runs 200+ drivers |

### 4.3 Protocol Gateways (Conduit Infrastructure)

Gateways bridging traffic between zones ARE the conduit per IEC 62443-3-2:

**Table 7.11: Gateways bridging traffic between zones ARE the conduit per IEC 62443-3-2**

| Vendor | Protocols Bridged | Security Note | Known CVEs |
|:---|:---|:---|:---|
| Loytec L-INX / L-GATE | BACnet, LON, KNX, M-Bus, Modbus, OPC UA, REST | Multi-protocol = expanded attack surface | — |
| Contemporary Controls BASrouter | BACnet MS/TP ↔ BACnet/IP | BBMD routing; must be hardened | — |
| ProSoft Technology (Emerson) | Modbus, EtherNet/IP, PROFIBUS, DNP3, IEC 61850 | Disable unused protocol slaves | — |
| Red Lion FlexEdge | 300+ protocol drivers | IIoT edge; authenticate OPC UA with certificates | — |

---

## 5. Life Safety Systems (Z4 — SIS Isolated)

Life safety systems MUST be physically and logically isolated. The critical rule: **supervisory signals from fire alarm panels to BMS must be one-way hardened dry-contact or supervised digital outputs — no bidirectional communication.**

**Table 7.12: Life Safety Systems**

| Component | Representative Vendors | Zone | OT Interface | Certification | Known CVEs | Standards Reference |
|:---|:---|:---|:---|:---|:---|:---|
| Fire alarm control panel (FACP) | Honeywell Notifier, Siemens Cerberus, Edwards EST4, JCI Simplex | Z4 | SLC loop, RS-485, dry contacts | UL 864, NFPA 72 | — | NFPA 72, NFPA 75 |
| Suppression controller (FM-200, Novec, water mist) | Viking, Kidde, Fike, Chemetron | Z4 | Dry contacts, RS-485 | UL 2166, NFPA 2001 | — | NFPA 2001, NFPA 75 |
| VESDA / aspirating smoke detection | Xtralis VESDA-E, Honeywell FAAST, Siemens FDA | Z4 | Modbus, BACnet (read-only) | UL 268 | — | NFPA 72, NFPA 76 |
| Gas detection (hydrogen, CO, refrigerant) | Honeywell Analytics, MSA, RKI Instruments | Z4 | 4-20 mA, Modbus | UL 2075 | — | NFPA 72, ASHRAE 15 |
| EPO (Emergency Power Off) circuit | Custom relay panel | Z4 | Hardwired, dry contacts | NFPA 75, TIA-942 | — | NFPA 75, TIA-942 |

**Standards note:** NFPA 75 (Standard for the Protection of Information Technology Equipment) and NFPA 76 (Standard for the Fire Protection of Telecommunications Facilities) are the primary fire protection standards for datacenters. NFPA 72 governs fire alarm systems. All life safety conduits must be one-way and physically isolated from the BMS network.

---

## 6. Physical Security Systems

Physical security systems (access control, video surveillance, intrusion detection) are often overlooked in OT zone models but provide a direct path to facility compromise. A compromised camera or door controller can grant physical access to server halls.

**Table 7.13: Physical Security Systems**

| Component | Representative Vendors | Zone | OT Interface | Certification | Known CVEs | Standards Reference |
|:---|:---|:---|:---|:---|:---|:---|
| Access control system (ACS) | HID Mercury, LenelS2, Genetec, Software House | Z2 (head-end); Z3 (controllers) | OSDP, Wiegand, BACnet | None | CVE-2022-31481 (HID Mercury, CVSS 10.0); CVE-2022-31479 (CVSS 9.8); 8 critical CVEs total (2022) | ISO 22237, EN 50600 |
| Video management system (VMS) | Genetec Security Center, Milestone XProtect, Verkada | Z2 (server); Z3 (cameras) | ONVIF, RTSP, HTTPS | None | CVE-2025-43027 (Genetec ALPR, critical); CVE-2025-1789 (Genetec Update Service, high); CVE-2025-30023 (Axis Camera Station, CVSS 9.0); CVE-2025-0324 (Axis VAPIX, CVSS 9.4) | ISO 22237, EN 50600 |
| IP cameras | Axis, Hikvision, Dahua, Bosch | Z3 | ONVIF, RTSP | None | See Axis CVEs above | ONVIF Profile S/G/T |
| Intrusion detection system (IDS) | Bosch, Honeywell, DSC | Z3 | RS-485, IP | None | — | UL 639 |
| Intercom / gate controllers | Aiphone, Commend, Axis | Z3 | SIP, ONVIF | None | — | — |

**CVE Detail — Physical Security:**

| CVE ID | CVSS | Affected Product | Impact | Remediation |
|:---|:---|:---|:---|:---|
| CVE-2022-31481 | 10.0 | HID Mercury Intelligent Controllers | Buffer overflow → remote code execution | Apply firmware patch (2022) |
| CVE-2022-31479 | 9.8 | HID Mercury Intelligent Controllers | Command injection | Apply firmware patch (2022) |
| CVE-2025-43027 | Critical | Genetec Security Center ALPR Manager | Improper access control → admin takeover | Upgrade to ≥5.13.2.3 |
| CVE-2025-1789 | High | Genetec Update Service | Local privilege escalation to SYSTEM | Upgrade to ≥2.10 |
| CVE-2025-30023 | 9.0 | Axis Camera Station Pro (Axis.Remoting) | Authenticated RCE | Apply Axis patch |
| CVE-2025-0324 | 9.4 | Axis VAPIX Device Configuration | Privilege escalation | Apply Axis OS update |

**Critical observation:** HID Mercury controllers (CVE-2022-31481, CVSS 10.0) are widely deployed in datacenter access control systems. Many field deployments remain unpatched on pre-2022 firmware. These controllers are fully exploitable and provide direct physical access to server halls.

---

## 7. DCIM / OT Monitoring Platforms

DCIM platforms aggregate data from power, cooling, and environmental sensors. Compromise of a DCIM server can blind operators to facility conditions and enable undetected manipulation.

**Table 7.14: DCIM / OT Monitoring Platforms**

| Vendor / Product | Zone | IEC 62443 Certification | Known CVEs | Notes |
|:---|:---|:---|:---|:---|
| Schneider EcoStruxure IT Data Center Expert (DCE) | Z1 | None | **5 critical CVEs** (CVE-2025-50121–50125) — OS command injection, insufficient entropy, RCE [SEVD-2025-?] | Upgrade to v9.0+ |
| Schneider Power Monitoring Expert (PME) | Z2 | **SL-2** | CVE-2025-54923–54927 (deserialization, SSRF, path traversal) [SEVD-2025-224-02] | Apply patches for 2022–2024 R2 |
| Vertiv Liebert Nform / Trellis | Z1 | None | — | — |
| Sunbird DCIM | Z1 | None | — | — |
| Device42 | Z1 | None | — | — |

**CVE Detail — DCIM Platforms:**

| CVE ID | CVSS | Affected Product | Impact | Remediation |
|:---|:---|:---|:---|:---|
| CVE-2025-50121 | Critical | EcoStruxure IT DCE ≤8.3 | OS command injection | Upgrade to v9.0+ |
| CVE-2025-50122 | Critical | EcoStruxure IT DCE ≤8.3 | Insufficient entropy → root password discovery | Upgrade to v9.0+ |
| CVE-2025-50123 | Critical | EcoStruxure IT DCE ≤8.3 | Remote code execution | Upgrade to v9.0+ |
| CVE-2025-50124 | Critical | EcoStruxure IT DCE ≤8.3 | Remote code execution | Upgrade to v9.0+ |
| CVE-2025-50125 | Critical | EcoStruxure IT DCE ≤8.3 | Remote code execution | Upgrade to v9.0+ |
| CVE-2025-54923 | High | PME 2022–2024 R2 | Deserialization of untrusted data | Apply SEVD-2025-224-02 patch |
| CVE-2025-54924 | High | PME 2022–2024 R2 | SSRF | Apply SEVD-2025-224-02 patch |
| CVE-2025-54925 | High | PME 2022–2024 R2 | Path traversal | Apply SEVD-2025-224-02 patch |
| CVE-2025-54926 | High | PME 2022–2024 R2 | Remote code execution | Apply SEVD-2025-224-02 patch |
| CVE-2025-54927 | High | PME 2022–2024 R2 | Path traversal | Apply SEVD-2025-224-02 patch |

---

## 8. Industrial Network Equipment

OT network switches and routers form the backbone of zone segmentation. Compromise of these devices can bypass all zone boundaries.

**Table 7.15: Industrial Network Equipment**

| Component | Representative Vendors | Zone | Certification | Known CVEs | Standards Reference |
|:---|:---|:---|:---|:---|:---|
| Industrial Ethernet switches | Cisco IE3400, Moxa EDR-G9010, Hirschmann/Belden, Siemens SCALANCE | Z2/Z3 boundary | **Moxa EDR-G9010: CSA certified** | CVE-2024-9138 (Moxa hard-coded creds, CVSS 8.6); CVE-2024-9140 (Moxa command injection); Cisco IE3000 EOL (Sep 2024) | IEC 62443-4-2 (Moxa) |
| Industrial routers/firewalls | Moxa EDR-G9010, Cisco IR1101, Phoenix Contact mGuard | Z1/Z2 boundary | Moxa CSA certified | See Moxa CVEs above | IEC 62443-4-2 |
| Serial-to-Ethernet converters | Moxa NPort, Digi One SP, Lantronix | Z3 | None | — | — |
| OT network monitoring sensors | Nozomi, Claroty, Dragos, Forescout | Z1 (passive) | None | — | — |

**CVE Detail — Industrial Network Equipment:**

| CVE ID | CVSS | Affected Product | Impact | Remediation |
|:---|:---|:---|:---|:---|
| CVE-2024-9138 | 8.6 | Moxa EDR-810/8010, EDR-G902/G9004/G9010, EDF-G1002-BP, NAT-102, OnCell G4302-LTE4 | Hard-coded credentials → root access | Apply MPSA-241155 firmware update |
| CVE-2024-9140 | Critical | Moxa cellular/secure routers | Command injection | Apply MPSA-241155 firmware update |
| CVE-2025-6950 | High | Moxa network devices | Remote service exploitation | Apply Moxa firmware update |

---

## 9. Protocol-Level Vulnerabilities

The following protocols are inherently insecure and must be mitigated through segmentation and encryption.

**Table 7.16: Protocol-Level Vulnerabilities**

| Protocol | Vulnerability Class | Risk Level | Mitigation | Standards Reference |
|:---|:---|:---|:---|:---|
| BACnet/IP | No authentication, no encryption, broadcast discovery | Critical | Use BACnet/SC (TLS + certificates); deploy DPI firewall | BACnet/SC (ASHRAE 135-2020) |
| Modbus TCP | No authentication, no encryption, no integrity | Critical | Tunnel over TLS or VPN; use Modbus/TCP Security (if supported) | Modbus/TCP Security (IEC 61158) |
| SNMP v1/v2c | Community strings in cleartext | High | Migrate to SNMP v3 with authentication and encryption | RFC 3410 |
| HTTP (on NMCs) | Cleartext credentials | High | Disable HTTP; use HTTPS only; enforce certificate validation | — |
| DNP3 | No encryption (DNP3 Secure Authentication optional) | High | Use DNP3 Secure Authentication; tunnel over TLS | IEEE 1815 |

---

## 10. CISA ICS-CERT Advisory Index (2024–2026)

The following advisories are directly relevant to datacenter OT assets. Reference these when assessing patch status.

| Advisory ID | Vendor | Product | Key CVEs | Date |
|:---|:---|:---|:---|:---|
| ICSA-26-027-04 | Johnson Controls | Metasys ADS/ADX | CVE-2025-26385 | Jan 2026 |
| ICSA-25-322-04 | Schneider Electric | PowerChute Serial Shutdown | CVE-2024-10511 | Nov 2025 |
| ICSA-25-219-02 | Johnson Controls | FX80 / FX90 Controllers | Various | Aug 2025 |
| ICSA-25-219-05 | Packet Power | EMX / EG Power Monitors | Various | Aug 2025 |
| SSA-400089 | Siemens | SIPROTEC 4/4 Compact | CVE-2024-52504 | 2024 |
| SSA-687955 | Siemens | SIPROTEC 5 | CVE-2024-53648 | 2024 |
| SSA-767615 | Siemens | SIPROTEC 5 | CVE-2024-54015 | 2024 |
| SSA-750499 | Siemens | SIPROTEC 5 | CVE-2024-38867 | 2024 |
| MPSA-241155 | Moxa | EDR/EDF/NAT series | CVE-2024-9138, CVE-2024-9140 | Jan 2025 |
| SEVD-2026-041-02 | Schneider Electric | EcoStruxure Building Operation | CVE-2026-1226, CVE-2026-1227 | Feb 2026 |
| SEVD-2025-224-02 | Schneider Electric | PME / EPO / PSO | CVE-2025-54923–54927 | Aug 2025 |
| ETN-VA-2025-1026 | Eaton | UPS Companion | CVE-2025-59887, CVE-2025-59888 | Dec 2025 |

---

## 11. ISASecure Certified Products Gap Analysis

The following table identifies datacenter OT products that are **not yet** ISASecure CSA certified, representing a significant security gap.

| Asset Type | Typical Vendors | ISASecure Status | Risk |
|:---|:---|:---|:---|
| UPS Network Management Cards | Vertiv (Liebert), Schneider (APC), Eaton | **Not certified** | Critical — TLStorm CVEs demonstrate exploitability |
| BMS Controllers (DC-specific) | Schneider (EBO), Siemens (Desigo CC), JCI (Metasys) | Vendor SDLA only; no product-level CSA | High — Metasys CVSS 10.0 |
| CDU/Coolant Distribution PLCs | Vertiv, Motivair, CoolIT | **Not certified** | High — no independent security validation |
| EPMS Meters | Schneider (ION series), GE/Danaher | **Not certified** | Medium — PME platform has SL-2 but meters do not |
| Industrial Ethernet Switches (DC) | Cisco IE, Hirschmann/Belden, Moxa | Moxa CSA certified; others not | Medium — Moxa hard-coded creds |
| Protection Relays | SEL, ABB, Siemens, GE | **Not ISASecure certified** (IEC 61850 focused) | High — multiple CVEs |
| VFDs (Chiller/Pump Drives) | ABB, Siemens, Danfoss, Nidec | **Not certified** at component level | High — ABB Drive Composer CVSS 9.8 |
| Fire Alarm Control Panels | Honeywell, Siemens, Edwards | Vendor SDLA only | Medium — life safety criticality |

---

## Appendix A: MITRE ATT&CK for ICS — Datacenter OT Attack Scenarios

The following techniques are most relevant to datacenter OT compromise. Use this mapping to inform threat modeling and detection engineering.

| Technique ID | Technique Name | Datacenter OT Relevance |
|:---|:---|:---|
| T0830 | Adversary-in-the-Middle | BACnet/Modbus traffic interception; HVAC setpoint manipulation |
| T0802 | Automated Collection | BACnet device enumeration; mapping cooling/power topology |
| T0878 | Alarm Suppression | Masking environmental alarms while manipulating cooling/power |
| T0883 | Internet Accessible Device | BMS controllers exposed to internet (common finding) |
| T0812 | Default Credentials | Moxa hard-coded creds; APC default "apc" password; BACnet defaults |
| T0859 | Valid Accounts | Compromised operator credentials for BMS/DCIM access |
| T0866 | Exploitation of Remote Services | RCE on NMC cards, DCIM platforms, camera systems |
| T0871 | Execution through API | SQL injection on Metasys; API abuse on EcoStruxure |
| T0857 | System Firmware | ASCO firmware integrity bypass; APC TLStorm firmware signing |
| T0839 | Module Firmware | SIPROTEC development shell; SEL undocumented features |
| T0882 | Theft of Operational Information | Power/cooling telemetry exfiltration for reconnaissance |
| T0814 | Denial of Service | UPS DoS; BMS resource exhaustion; relay file transfer DoS |
| T0831 | Manipulation of Control | Changing temperature setpoints; disabling cooling; power transfer manipulation |

**Example Attack Scenario: Datacenter Cooling Sabotage**

```
T0883 (Internet Accessible Device)
  → T0812 (Default Credentials) on exposed BMS controller
    → T0802 (Automated Collection) enumerate all BACnet devices
      → T0878 (Alarm Suppression) disable temperature alarms
        → T0831 (Manipulation of Control) raise cooling setpoints
          → Physical damage: server thermal throttling → outage
```

---

## Appendix B: Vendor Advisory Portals

| Vendor | URL |
|:---|:---|
| CISA ICS-CERT | https://www.cisa.gov/news-events/ics-advisories |
| Schneider Electric | https://www.se.com/ww/en/work/support/cybersecurity/security-notifications.jsp |
| Siemens ProductCERT | https://www.siemens.com/cert/advisories |
| Honeywell/Tridium | https://www.honeywell.com (Tridium Security Advisories) |
| Johnson Controls | https://www.johnsoncontrols.com/trust-center/cybersecurity/security-advisories |
| ABB PSIRT | https://global.abb/group/en/technology/cyber-security/alerts-and-notifications |
| Eaton | https://www.eaton.com/us/en-us/company/news-insights/cybersecurity.html |
| Moxa | https://www.moxa.com/en/support/product-support/security-advisory |
| Axis | https://www.axis.com/about-axis/cybersecurity |
| Genetec | https://docs.genetec.com/ |
| Vertiv | https://www.vertiv.com/en-us/support/security-support-center |
| SEL | https://selinc.com/support/security-notifications/external-reports/ |
| Cisco | https://sec.cloudapps.cisco.com/security/center/publicationListing.x |
| Danfoss | https://www.danfoss.com (Security Advisories) |

---

**End of Chapter 7**

*Last updated: 2025-06-13 | Next review: Quarterly or upon CISA KEV additions*