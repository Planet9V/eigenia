# WP01 — Hyperscale Datacenter Power Distribution & HLD Infrastructure Research

**Research Date:** 2026-06-13
**Purpose:** Vendor-specific technical specifications for CyHAZOPs Reference Architecture workpaper WP01
**Classification:** Research Brief — All data points include source citations

---

## Table of Contents

1. [48V DC Rack Power Distribution](#1-48v-dc-rack-power-distribution)
2. [Distributed Block UPS](#2-distributed-block-ups)
3. [Automatic Transfer Switches (ATS)](#3-automatic-transfer-switches-ats)
4. [Protection Relays & Substation Automation](#4-protection-relays--substation-automation)
5. [Generator Paralleling Switchgear](#5-generator-paralleling-switchgear)
6. [Medium Voltage Switchgear](#6-medium-voltage-switchgear)
7. [IEC 61850 in Datacenter Substations](#7-iec-61850-in-datacenter-substations)
8. [OCP Power Specifications](#8-ocp-power-specifications)

---

## 1. 48V DC Rack Power Distribution

### 1.1 Delta HPR 33kW ORv3 Power Shelf

| Parameter | Specification | Source |
|---|---|---|
| **Model** | Delta HPR ORv3 Power Shelf | [Delta](https://deltaww.com) |
| **Max Output Power** | 33 kW (6+0 configuration) | [Delta Datasheet](https://deltaww.com) |
| **Redundant Power (N+1)** | 27.5 kW (5+1 configuration) | [Delta Datasheet](https://deltaww.com) |
| **Output Voltage** | 48 VDC / 50 VDC (Narrow-range 48V system) | [OCP](https://opencompute.org) |
| **Chassis Capacity** | 6 slots for hot-swappable 5.5 kW PSUs | [Delta](https://deltaww.com) |
| **Peak Efficiency** | >97.5% | [Delta Americas](https://delta-americas.com) |
| **Form Factor** | 1OU (1 Open Rack Unit) | [Delta Americas](https://delta-americas.com) |
| **Management** | Integrated Power Management Controller (PMC) with PoE | [Delta](https://deltaww.com) |
| **Communication Protocol** | DMTF Redfish® via Ethernet | [Delta Americas](https://delta-americas.com) |
| **Transient Protection** | 150% load capability for 20ms per PSU | [Delta](https://deltaww.com) |
| **Bus Bar Interface** | OCP ORv3 blind-mate output connector | [OCP](https://opencompute.org) |
| **Scalability** | Multiple shelves in parallel for >100 kW per rack | [Advanced Energy](https://advancedenergy.com) |
| **IEC 62443 Certification** | Not publicly documented for power shelf | — |
| **Known CVEs** | None publicly disclosed | — |

### 1.2 Advanced Energy (Artesyn) ORv3 Power Shelf

| Parameter | Specification | Source |
|---|---|---|
| **Output Power** | 15 kW (N+1 configuration per 1OU shelf) | [Advanced Energy](https://advancedenergy.com) |
| **Output Voltage** | 50V nominal (48V at BBU); range 47.5V–50.5V | [Advanced Energy](https://advancedenergy.com) |
| **PSU Configuration** | 6 × 3,000W hot-swappable PSUs | [Advanced Energy](https://advancedenergy.com) |
| **Input Voltage** | 200–277 VAC (3-phase Delta/Wye or single-phase) | [Mouser](https://mouser.com) |
| **Management** | Hot-pluggable PMC with Redfish® support via Ethernet | [Advanced Energy](https://advancedenergy.com) |
| **PMC Connectivity** | 10/100/1000MB Base-T Ethernet, PoE (802.3at), RS232 debug | [Advanced Energy](https://advancedenergy.com) |
| **Efficiency** | Peak ~98% | [Advanced Energy](https://advancedenergy.com) |
| **Current Sharing** | Active + droop current sharing | [Advanced Energy](https://advancedenergy.com) |
| **Safety Compliance** | IEC/EN/UL 62368-1 | [Advanced Energy](https://advancedenergy.com) |
| **EMC Compliance** | EN55035, EN61000 series | [Business Wire](https://businesswire.com) |

### 1.3 Vicor 48V-to-Point-of-Load Conversion Modules

| Module Type | Peak Efficiency | Application | Source |
|---|---|---|---|
| **ZVS Buck Regulators** (Non-isolated) | Up to 98% | Flexible PoL conversion | [Vicor](https://vicorpower.com) |
| **ZVS Buck-Boost Regulators** (Non-isolated) | Up to 97% | Bidirectional PoL | [Vicor](https://vicorpower.com) |
| **DCM™ DC-DC Converters** (Isolated, Regulated) | Up to 96% | Various conversion stages | [Vicor](https://vicorpower.com) |
| **NBM™ Bus Converters** (Fixed-ratio) | Exceeding 98% | 12V/48V bridging | [Vicor](https://vicorpower.com) |

**Architecture:** Factorized Power Architecture (FPA) — separates regulation and transformation. Uses proprietary current multiplication at the PoL. [Source](https://vicorpower.com)

**Power Density:** Up to 1,244 W/in³ for some DCM modules in ChiP/VIA packages. [Source](https://vicorpower.com)

**Packaging:** Thermally-adept, low-profile encapsulated modules (ChiP and VIA form factors). [Source](https://avnet.com)

### 1.4 Flex Power Modules BMR310 / BMR320

| Parameter | BMR310 | Source |
|---|---|---|
| **Type** | Non-isolated digital Intermediate Bus Converter (IBC) | [Flex](https://flex.com) |
| **Input Voltage** | 40–60V | [Flex](https://flex.com) |
| **Output Voltage** | 10–15V (unregulated) | [Flex](https://flex.com) |
| **Continuous Power** | Up to 860W | [Flex](https://flex.com) |
| **Peak Power** | Up to 1,000W (<1s duration) | [Flex](https://flex.com) |
| **Efficiency** | >98% at half load | [Flex](https://flex.com) |
| **Dimensions** | 58.4 × 25 × 9.9 mm (with integrated baseplate) | [Flex](https://flex.com) |
| **Technology** | Zero Voltage Switching Switched Capacitor Converter (ZSC) | [EE Power](https://eepower.com) |
| **Management** | PMBus® interface | [Flex](https://flex.com) |
| **Safety** | IEC/EN/UL 62368-1 | [Flex](https://flex.com) |
| **End-of-Life** | Last order date: May 31, 2026 — replaced by BMR320/321, BMR316 | [Flex](https://flex.com) |

---

## 2. Distributed Block UPS

### 2.1 Schneider Electric Galaxy VXL (1250 kW)

| Parameter | Specification | Source |
|---|---|---|
| **Model** | Galaxy VXL | [Schneider Electric](https://se.com) |
| **Power Rating** | 1,250 kW / 1,250 kVA | [SE Datasheet](https://se.com) |
| **Topology** | Double-conversion online | [SE Datasheet](https://se.com) |
| **Efficiency (eConversion)** | Up to 99% | [SE](https://se.com) |
| **Efficiency (Double-Conversion)** | ~97.5% | [Scribd / SE](https://scribd.com) |
| **Input/Output Voltage** | 380V, 400V, 415V (3-phase) | [SE Datasheet](https://se.com) |
| **Dimensions** | 1,970 mm (H) × 1,200 mm (W) × 1,000 mm (D) | [SE Datasheet](https://se.com) |
| **Weight** | ~1,169 kg | [SE Datasheet](https://se.com) |
| **Footprint** | ~1.2 m² | [SE](https://se.com) |
| **Live Swap** | Yes — modular power module replacement with zero downtime | [SE](https://se.com) |
| **Battery Compatibility** | VRLA and Lithium-ion | [SE](https://se.com) |
| **IEC 62443-4-2 Certified** | **Yes** | [SE](https://se.com) |
| **Standards** | IEC 62040-1 (Safety), IEC 62040-2 (EMC), IEC 62040-3 (Performance) | [SE](https://se.com) |
| **EcoStruxure Connected** | Yes — secure remote monitoring | [SE](https://se.com) |

#### NMC3 Network Management Card Details

| Parameter | Specification | Source |
|---|---|---|
| **Models** | AP9641 (1-port), AP9643 (2-port + sensors) | [SE](https://se.com) |
| **IEC 62443-4-2 Certified** | **Yes — Security Level 2 (SL2)** | [Industrial Cyber](https://industrialcyber.co) |
| **Certifying Body** | TÜV Rheinland (independent verification) | [Industrial Cyber](https://industrialcyber.co) |
| **ISASecure SDLA** | Compliant | [IoT Insider](https://iotinsider.com) |
| **Current Firmware Series** | 3.x series (e.g., 3.4.0.8 as of mid-2025) | [SE](https://se.com) |
| **Legacy Firmware** | 2.5.x (available without subscription, limited) | [SE](https://se.com) |
| **Firmware Access Model** | Subscription-based (Secure NMC Subscription) | [ADI Global](https://adiglobaldistribution.us) |
| **Management Platform** | EcoStruxure IT | [SE](https://se.com) |

### 2.2 Vertiv Liebert EXL S1

| Parameter | Specification | Source |
|---|---|---|
| **Model** | Liebert® EXL S1 | [Vertiv](https://vertiv.com) |
| **Power Range** | 250 kVA to 1,200 kVA | [Vertiv](https://vertiv.com) |
| **Efficiency (Dynamic Online)** | Up to 99% | [Vertiv](https://vertiv.com) |
| **Efficiency (Intelligent ECO/VFD)** | >99% | [Vertiv](https://vertiv.com) |
| **Topology** | Double-conversion (VFI) | [Vertiv](https://vertiv.com) |
| **Performance Standard** | IEC 62040 Class 1 | [Vertiv](https://vertiv.com) |

#### Dimensions (480V models)

| Rating | Width | Depth | Height | Weight |
|---|---|---|---|---|
| 250–400 kVA | 51.3" | 37" | 79.1" | 1,970 lbs |
| 500–600 kVA | 63" | 36" | 79.1" | 2,750 lbs |
| 625–800 kVA | 78.8" | 36" | 79.1" | 3,508 lbs |
| 1,000–1,200 kVA | 104.5" | 36" | 79.1" | 4,667 lbs |

[Source: Elec Support](https://elecsupport.com)

| Parameter | Specification | Source |
|---|---|---|
| **IEC 62443-4-2** | Applied to **IntelliSlot™ RDU120** communication card (not entire UPS) | [Vertiv](https://vertiv.com) |
| **Cybersecurity Note** | IEC 62443 certifications apply to communication/control modules | [Vertiv](https://vertiv.com) |
| **Known CVEs** | Check Vertiv security advisories portal | [Vertiv](https://vertiv.com) |

### 2.3 Eaton 93PM

| Parameter | Specification | Source |
|---|---|---|
| **Model** | Eaton 93PM | [Eaton](https://eaton.com) |
| **Power Range** | 30 kVA to 500 kVA | [Eaton](https://eaton.com) |
| **Efficiency (Double-Conversion)** | Up to 96.7% | [Eaton](https://eaton.com) |
| **Efficiency (ESS Mode)** | >99% (2ms transfer to double-conversion) | [Eaton](https://eaton.com) |
| **Dimensions (30–250 kVA)** | 560 mm (W) × 914 mm (D) × 1,876 mm (H) | [Eaton](https://eaton.com) |
| **Dimensions (100–500 kVA)** | 1,618 mm (W) × 920 mm (D) × 1,968 mm (H) | [Eaton](https://eaton.com) |
| **Min Footprint** | ~0.5 m² | [Eaton](https://eaton.com) |
| **Safety** | IEC 62040-1 | [Eaton](https://eaton.com) |
| **EMC** | IEC 62040-2 | [Eaton](https://eaton.com) |
| **Performance** | IEC 62040-3 | [Eaton](https://eaton.com) |

#### IEC 62443 Certification Details (Eaton)

| Component | Certification | Source |
|---|---|---|
| **Gigabit Network Card** | IEC 62443-4-2 + UL 2900-1 | [Eaton](https://eaton.com) |
| **Industrial Gateway Card** | IEC 62443-4-2 + UL 2900-1 | [Eaton](https://eaton.com) |
| **Development Process** | IEC 62443-4-1 (industry-first) | [Eaton](https://eaton.com) |
| **Design Philosophy** | "Secure by design" | [Eaton](https://eaton.com) |

---

## 3. Automatic Transfer Switches (ATS)

### 3.1 ASCO 7000 Series

| Parameter | Specification | Source |
|---|---|---|
| **Model** | ASCO 7000 Series | [Steven Engineering](https://stevenengineering.com) |
| **Transfer Time (Open Transition)** | <100 ms (break-before-make) | [Steven Engineering](https://stevenengineering.com) |
| **Transfer Time (Closed Transition)** | Overlap within 100 ms (make-before-break) | [Curtis Power Solutions](https://curtispowersolutions.com) |
| **Mechanism** | Solenoid operating mechanism | [Power Solutions](https://power-solutions.com) |
| **Closed Transition Logic** | Automatic sync monitoring; falls back to open transition if out-of-sync | [Curtis Power Solutions](https://curtispowersolutions.com) |
| **Delayed Transition** | Adjustable time delay in "load disconnect" position | [Global Power](https://globalpwr.com) |
| **Communication** | Modbus RTU/TCP, BACnet, SNMP options | [ASCO / Prima](https://primapowersys.com) |
| **IEC 62443 Status** | Not publicly documented for ATS | — |

### 3.2 Eaton ATC-300+

| Parameter | Specification | Source |
|---|---|---|
| **Model** | ATC-300+ (microprocessor-based controller) | [Eaton](https://eaton.com) |
| **Type** | Controller for ATS (not a complete switch) | [Eaton](https://eaton.com) |
| **TDES** | 0–120 seconds (adjustable) | [Eaton](https://eaton.com) |
| **TDEN** | 0–1,800 seconds (adjustable) | [Eaton](https://eaton.com) |
| **Mechanical Transfer Time** | Determined by specific ATS equipment (40A–3,000A+) | [Eaton](https://eaton.com) |
| **Note** | Transfer time depends on contactor/switch type, not controller alone | [Eaton](https://eaton.com) |

### 3.3 LayerZero eSTS (Static Transfer Switch)

| Parameter | Specification | Source |
|---|---|---|
| **Model** | LayerZero eSTS | [LayerZero](https://layerzero.com) |
| **Transfer Time** | 2–4 ms typical; ¼-cycle for in-phase sources | [LayerZero](https://layerzero.com) |
| **Transfer Range** | 4–16 ms general specification | [LayerZero](https://layerzero.com) |
| **Transfer Method** | **Open-transition** (sources never cross-connected) | [LayerZero](https://layerzero.com) |
| **Make-Before-Break** | **No** — intentionally avoids paralleling independent feeds | [LayerZero](https://layerzero.com) |
| **Switching Element** | Silicon-controlled rectifiers (SCRs) — no mechanical contactors | [LayerZero](https://layerzero.com) |
| **Key Technology** | Dynamic Phase Compensation (for async source emergency transfers) | [LayerZero](https://layerzero.com) |
| **ITIC Compliance** | Maintains transfer within ITIC power tolerance ranges | [LayerZero](https://layerzero.com) |
| **Monitoring** | Continuous real-time evaluation of both sources (phase alignment, voltage health) | [LayerZero](https://layerzero.com) |
| **IEC 62443 Status** | Not publicly documented | — |

---

## 4. Protection Relays & Substation Automation

### 4.1 Siemens SIPROTEC 5 (7SJ / 7SA / 7SD Series)

| Parameter | Specification | Source |
|---|---|---|
| **Platform** | SIPROTEC 5 | [Siemens SIOS](https://siemens.com) |
| **7SJ** | Overcurrent / feeder protection | [Siemens](https://siemens.com) |
| **7SA** | Distance protection | [Siemens](https://siemens.com) |
| **7SD** | Differential protection | [Siemens](https://siemens.com) |
| **IEC 61850 Support** | Edition 1 and Edition 2 | [Siemens](https://siemens.com) |
| **GOOSE Messaging** | Peer-to-peer; up to 5 GOOSE applications/datasets per device, 50 data objects total | [Siemens](https://siemens.com) |
| **GOOSE Functions** | Interlocking, intertripping, busbar protection schemes | [Siemens](https://siemens.com) |
| **Engineering Software** | DIGSI 5 (includes IEC 61850 System Configurator) | [Siemens](https://siemens.com) |
| **Parallel Protocols** | Modbus TCP, DNP3, IEC 60870-5-104 (concurrent with IEC 61850) | [Siemens](https://siemens.com) |
| **Firmware Versions** | V8.60, V9.30, V9.90+ documented | [Siemens](https://siemens.com) |
| **Cybersecurity** | Signed firmware, role-based access control (RBAC) | [Siemens](https://siemens.com) |
| **Conformance Docs** | PICS, PIXIT, TICS, MICS per firmware version | [Siemens](https://siemens.com) |
| **Connectivity** | RJ45 and LC fiber Ethernet options | [Siemens SIOS](https://siemens.com) |
| **Application Notes** | SIP5-APN-008 (enhanced GOOSE) | [Siemens](https://siemens.com) |

### 4.2 SEL-400 Series / SEL-735

| Parameter | SEL-400 Series | SEL-735 | Source |
|---|---|---|---|
| **Type** | Generator/Line protection | Power Quality & Revenue Meter | [SEL](https://selinc.com) |
| **IEC 61850 Version** | Edition 2.1 (varies by model) | Supported | [SEL](https://selinc.com) |
| **GOOSE Messaging** | Publisher/Subscriber | Publisher/Subscriber | [SEL](https://selinc.com) |
| **MMS** | Supported | Supported (up to 6 sessions) | [SEL](https://selinc.com) |
| **Process Bus (SV)** | Supported (SEL-401 merging unit; IEC 61850-9-2, IEC 61869-9) | N/A | [SEL](https://selinc.com) |
| **Time Sync** | PTPv2, IRIG-B | PTP, IRIG-B | [SEL](https://selinc.com) |
| **Redundancy** | PRP (Parallel Redundancy Protocol) | — | [SEL](https://selinc.com) |
| **SCL Configuration** | CID files | CID files | [SEL](https://selinc.com) |
| **Other Protocols** | DNP3, Modbus (concurrent) | DNP3, Modbus, IEC 61850 (concurrent) | [SEL](https://selinc.com) |

### 4.3 ABB/Hitachi Energy Relion 670 Series

| Parameter | Specification | Source |
|---|---|---|
| **Platform** | Relion 670 series (REL670, REB670, RET670, RED670, REG670) | [ABB/Hitachi Energy](https://hitachienergy.com) |
| **Application** | High-end transmission and sub-transmission | [ABB](https://abb.com) |
| **IEC 61850 Support** | Edition 1 and Edition 2 | [ABB](https://abb.com) |
| **GOOSE** | Full publisher/subscriber support | [ABB](https://abb.com) |
| **Process Bus** | IEC 61850-9-2LE Sampled Values | [ABB](https://abb.com) |
| **Engineering Tool** | PCM600 (Protection and Control Manager) | [ABB](https://abb.com) |
| **GOOSE Config** | Datasets, GOOSE Control Blocks, AppID, MAC, VLAN priority/ID, retransmission | [ABB](https://abb.com) |
| **Legacy Protocols** | DNP3, IEC 60870-5-103, LON, SPA | [ABB](https://abb.com) |
| **Firmware Versions** | 1.2, 2.0, 2.1, 2.2+ | [ABB](https://abb.com) |
| **V2.2+ Features** | HSR redundancy, IEC/IEEE 61850-9-3 (PTP/IEEE 1588), "Easy GOOSE" | [ABB](https://abb.com) |
| **Cybersecurity** | NERC CIP compliant design, IEC 62351-8 | [ABB](https://abb.com) |
| **Documentation** | Technical Manuals per version (e.g., 1MRK 506 353-UEN for REL670 v2.1) | [ABB](https://abb.com) |
| **Portal Access** | ABB Automation Customer Portal (service agreement required) | [ABB](https://abb.com) |

---

## 5. Generator Paralleling Switchgear

### 5.1 Woodward easYgen-3500XT

| Parameter | Specification | Source |
|---|---|---|
| **Model** | easYgen-3500XT (P1 and P2 variants) | [Woodward](https://woodward.com) |
| **P1 Package** | Complex paralleling (Manual: B37580) | [Woodward](https://woodward.com) |
| **P2 Package** | Co-Gen/CHP with expanded I/O (Manual: B37581) | [Woodward](https://woodward.com) |
| **Paralleling Capacity** | Up to 32 generators; up to 16 LS-5 breaker controllers | [Woodward/Newtec](https://newtec.com.vn) |
| **Direct Voltage** | Up to 690 VAC | [Woodward](https://woodward.com) |
| **Altitude** | Up to 4,000m without derating | [Woodward](https://woodward.com) |
| **Connectivity** | Redundant Ethernet, CAN (CANopen/J1939), RS-485, USB | [Woodward](https://woodward.com) |

#### Modbus Register Map

| Item | Detail | Source |
|---|---|---|
| **Mapping Tool** | TelegramMapper / Modbus Master Mapper software | [Woodward](https://woodward.com) |
| **Register Start Address** | 50,000 | [Woodward](https://woodward.com) |
| **Protocol Selection** | Parameter ID #3184 | [EasyGen.org](https://easygen.org) |
| **Recommended Protocol** | 5016 (for XT series applications) | [EasyGen.org](https://easygen.org) |
| **Backward Compatible** | 5003 and 5010 (classic easYgen-3000) | [EasyGen.org](https://easygen.org) |
| **Protocol Spreadsheet** | XLS download from Woodward Manuals portal | [Woodward](https://wss.woodward.com/manuals/PGC/Forms/AllItems.aspx) |
| **Engineering Tool** | Woodward ToolKit software | [Woodward](https://woodward.com) |

### 5.2 ComAp InteliGen NT (IGS-NT)

| Parameter | Specification | Source |
|---|---|---|
| **Model** | InteliGen NT (IGS-NT) | [ComAp](https://comap-control.com) |
| **Application** | Complex paralleling, island/mains parallel | [Skyward Controls](https://skywardcontrols.co.nz) |
| **ComAp Protocol** | Proprietary (GenConfig, InteliMonitor) | [Sunpower EE](https://sunpoweree.com.my) |
| **Modbus** | RTU and TCP (Slave mode); Master mode via I-CB/Modbus extension | [Sunpower EE](https://sunpoweree.com.my) |
| **User Modbus Registers** | Custom registers in 42873–43000 range | [Sunpower EE](https://sunpoweree.com.my) |
| **SNMP** | v1, v2 (closed private networks) | [Symbiosistas](https://symbiosistas.net) |
| **CAN Bus** | CAN1 (extensions), CAN2 (load sharing) | [Skyward Controls](https://skywardcontrols.co.nz) |
| **Physical Ports** | RS232, RS485, USB, Ethernet | [Sunpower EE](https://sunpoweree.com.my) |
| **Remote Access** | AirGate (NAT/firewall traversal) | [Sunpower EE](https://sunpoweree.com.my) |
| **ECU Support** | Extensive electronic engine control unit integration | [Skyward Controls](https://skywardcontrols.co.nz) |
| **Documentation** | IGS-NT Communication Guide | [ComAp](https://comap-control.com) |

### 5.3 Cummins PowerCommand Digital Master Control (DMC)

| Parameter | Specification | Source |
|---|---|---|
| **Models** | DMC1000, DMC1500, DMC2000, DMC6000, DMC8000 | [Cummins Peru](https://cumminsperu.pe) |
| **Architecture** | Distributed logic — autonomous component operation | [Cummins](https://cummins.com) |
| **Topologies** | Isolated bus, utility paralleling, peak-shaving, base-loading | [Cummins Peru](https://cumminsperu.pe) |
| **Transfer Types** | Open-transition (load break), closed-transition (ramping) | [Cummins Peru](https://cumminsperu.pe) |
| **Metering** | True RMS bus metering (generator + utility) | [Cummins Peru](https://cumminsperu.pe) |
| **Data Logging** | Real-time/historical trending (kW, kVAR, amps, voltage) | [Scribd](https://scribd.com) |
| **SCADA Protocol** | Modbus RTU (RS485) — primary | [GenPower USA](https://genpowerusa.com) |
| **Protocol Gateway** | ModLon gateway (for LonWorks conversion) | [Scribd](https://scribd.com) |
| **Remote Monitoring** | PowerCommand Cloud™ | [Cummins](https://cummins.com) |
| **Data Nodes** | Engine parameters, alternator status, generator metering, system/breaker alarms | [GenPower USA](https://genpowerusa.com) |

---

## 6. Medium Voltage Switchgear

### 6.1 Hitachi Energy GIS

| Parameter | Specification | Source |
|---|---|---|
| **Type** | Gas-Insulated Switchgear (GIS) | [Hitachi Energy](https://hitachienergy.com) |
| **Voltage Range** | 72.5 kV to 1,200 kV (HV/EHV); down to MV for integrated solutions | [Hitachi Energy](https://hitachienergy.com) |
| **Rated Current** | Up to 4,000A (up to 8,000A for UHV) | [Hitachi Energy](https://hitachienergy.com) |
| **Short-Circuit Rating** | Up to 63 kA | [Hitachi Energy](https://hitachienergy.com) |
| **Footprint Reduction** | 70–95% vs conventional AIS | [Hitachi Energy](https://hitachienergy.com) |
| **IEC 61850 Compliance** | Station and process bus architectures | [Hitachi Energy](https://hitachienergy.com) |
| **Process Bus** | IEC 61850-9-2 via LPIT + merging units or SAM600 | [Hitachi Energy](https://hitachienergy.com) |
| **Monitoring** | MSM (SF6 gas density), Switchsync™ PWC600 (point-on-wave switching) | [Hitachi Energy](https://hitachienergy.com) |
| **Protection** | Relion® series IEDs | [Hitachi Energy](https://hitachienergy.com) |
| **Design** | Modular building blocks (ELK series) | [Hitachi Energy](https://hitachienergy.com) |
| **Environmental** | High seismic, extreme temperature rated | [Hitachi Energy](https://hitachienergy.com) |
| **SF6 Alternatives** | Vacuum technology with alternative insulation (under development) | [Hitachi Hyoron](https://hitachihyoron.com) |

### 6.2 Siemens NXPLUS C

| Parameter | Specification | Source |
|---|---|---|
| **Type** | Gas-insulated MV switchgear (GIS) | [Siemens](https://siemens.com) |
| **Voltage Range** | Up to 36 kV | [Siemens](https://siemens.com) |
| **Insulation** | SF6 Gas (or Clean Air for "blue GIS" models) | [Siemens](https://siemens.com) |
| **Design** | Metal-enclosed, hermetically sealed, stainless steel | [Siemens](https://siemens.com) |
| **Arc Flash Protection** | IAC A FLR (Front, Lateral, Rear) | [KV Material](https://kvmaterial.cz) |
| **Arc Energy** | ~1/3 of air-insulated switchgear (shorter arc in SF6 vessel) | [Siemens](https://siemens.com) |
| **Arc Testing** | IEC 62271-200; ANSI/IEEE C37.20.7 on request | [Siemens](https://siemens.com) |
| **Pressure Relief** | Optional duct system for safe gas discharge | [Siemens](https://siemens.com) |
| **IEC 61850 Support** | Full support via integrated SIPROTEC relays | [Siemens](https://siemens.com) |
| **Communication Protocols** | IEC 61850 (GOOSE + reporting), IEC 60870-5-103, DNP3, Modbus RTU | [Siemens](https://siemens.com) |
| **Standards** | IEC 62271-200, ANSI/IEEE C37.20.7/C37.20.9, CSA C22.2 | [Siemens](https://siemens.com) |
| **Catalog Reference** | Siemens HA 35.41 | [Siemens](https://siemens.com) |

### 6.3 Schneider Electric PIX

| Parameter | Specification | Source |
|---|---|---|
| **Type** | Air-insulated MV switchgear | [Schneider Electric](https://se.com) |
| **Arc Flash Rating** | AFLR (Arc Fault, Front, Lateral, Rear) per IEC 62271-200 | [SE](https://se.com) |
| **Active Arc Protection** | Simultaneous light + overcurrent detection (ms-level trip) | [SE](https://se.com) |
| **Arc Protection Devices** | PowerLogic A125, Arc V121 (autonomous from main relay) | [SE](https://se.com) |
| **Protection Relays** | PowerLogic P5 series | [SE](https://se.com) |
| **IEC 61850 Support** | Full GOOSE messaging for high-speed protection coordination | [SE](https://se.com) |
| **EcoStruxure Ready** | Yes — digital control and monitoring | [Scribd](https://scribd.com) |
| **Condition Monitoring** | TH110 thermal monitoring sensors | [Scribd](https://scribd.com) |
| **Racking** | Closed-door circuit breaker rack-in/out; motorized racking option | [SE](https://se.com) |
| **Overpressure Release** | Upward (inside or outside room) | [SE](https://se.com) |

---

## 7. IEC 61850 in Datacenter Substations

### 7.1 Deployment Patterns

| Aspect | Details | Source |
|---|---|---|
| **Adoption Trend** | Increasing adoption; replacing legacy hardwired point-to-point with fiber-optic Ethernet | [ABB](https://abb.com) |
| **ATS Application** | GOOSE for managing redundant power feeds at machine speed | [Digital Substation](https://digitalsubstation.com) |
| **Protection Schemes** | Reverse blocking, interlocks, busbar protection via GOOSE | [OPAL-RT](https://opal-rt.com) |
| **Monitoring** | UPS, cooling, circuit breakers unified via MMS | [Digital Substation](https://digitalsubstation.com) |
| **Cabling Benefit** | Reduced copper wiring → fiber-optic Ethernet (cost, scalability, real-time visibility) | [CAI Engineering](https://cai-engr.com) |

### 7.2 GOOSE Architecture Requirements

| Requirement | Detail | Source |
|---|---|---|
| **Protocol Layer** | Layer 2 multicast | [iGrid](https://igrid-td.com) |
| **Performance Target** | Sub-4ms deterministic | [iGrid](https://igrid-td.com) |
| **VLAN Segmentation** | IEEE 802.1Q required for traffic isolation | [SEL](https://selinc.com) |
| **Priority** | High-priority tagging on GOOSE packets | [SCADA Protocols](https://scadaprotocols.com) |
| **SCL Files** | Substation Configuration Language mandatory for interop | [OPAL-RT](https://opal-rt.com) |
| **Interoperability** | PIXIT documents required per IED; consistent semantic modeling across vendors | [Tekvel](https://tekvel.com) |
| **Testing** | End-to-end chain validation (publisher event → subscriber logic response) | [OPAL-RT](https://opal-rt.com) |

### 7.3 Cybersecurity Considerations

| Risk | Mitigation | Source |
|---|---|---|
| **GOOSE is unencrypted** | Physical security, unused port disabling, VLAN segmentation | [SEL](https://selinc.com) |
| **Frame manipulation** | IEC 62351 adoption where supported | [SCADA Protocols](https://scadaprotocols.com) |
| **Multicast flooding** | Managed switches directing traffic only to relevant subscribers | [OPAL-RT](https://opal-rt.com) |
| **Implementation expertise** | Requires multidisciplinary team: IT networking + security + power systems | [Nokia](https://nokia.com) |

---

## 8. OCP Power Specifications

### 8.1 Open Rack V3 (ORv3) Power Architecture

| Parameter | Specification | Source |
|---|---|---|
| **Standard** | OCP Open Rack V3 (ORv3) | [OCP](https://opencompute.org) |
| **Architecture** | 48V DC bus bar with blind-mate connectors | [OCP](https://opencompute.org) |
| **Form Factor** | 21" wide Open Rack | [OCP](https://opencompute.org) |

### 8.2 Bus Bar & Connector Specifications

| Parameter | Specification | Source |
|---|---|---|
| **Power Shelf/BBU Connector Current** | 500A+ continuous | [Molex](https://molex.com) |
| **IT Gear Input Connector Current** | 100A continuous (power + return path) | [OCP](https://opencompute.org) |
| **Voltage Range (Narrow)** | 46V–52V (nominal 51V) | [OCP](https://opencompute.org) |
| **Voltage Range (Wide)** | 52V–56V (nominal 54V) | [OCP](https://opencompute.org) |
| **Connector Type** | Blind-mate (no bolted connections) | [OCP / Rackcdn](https://rackcdn.com) |
| **Chassis Ground** | Dedicated ground contacts | [OCP](https://opencompute.org) |
| **Voltage Sense** | Sense contacts on IT gear connectors | [OCP](https://opencompute.org) |
| **Contact Material** | Silver-plated copper alloy | [Molex](https://molex.com) |
| **Panel Thickness** | 1.10–1.32 mm | [OCP / Rackcdn](https://rackcdn.com) |
| **Alignment Float** | ±3.0 mm in X and Y directions | [OCP / Rackcdn](https://rackcdn.com) |
| **Power Output Connector Rev** | Rev 2.0 | [OCP](https://opencompute.org) |

### 8.3 Connector Suppliers

| Vendor | Product | Source |
|---|---|---|
| **TE Connectivity** | ORv3 power connector solutions | [TE](https://te.com) |
| **Molex** | ORv3 busbar connectors (500A+) | [Molex](https://molex.com) |
| **Amphenol** | ORv3-compliant connectors | [OCP](https://opencompute.org) |
| **BizLink** | ORv3 power interconnects | [BizLink](https://bizlinktech.com) |

### 8.4 OCP Power Shelf Standards Summary

| Standard/Spec | Detail | Source |
|---|---|---|
| **Power Shelf Form Factor** | 1OU per shelf | [OCP](https://opencompute.org) |
| **PSU Hot-Swap** | Required — blind-mate PSU insertion | [OCP](https://opencompute.org) |
| **Management Protocol** | DMTF Redfish® via Ethernet | [OCP](https://opencompute.org) |
| **Power over Ethernet** | 802.3at for management controller backup | [Advanced Energy](https://advancedenergy.com) |
| **Narrow DC Range** | 47.5V–50.5V (optimized for fixed-ratio downstream DC-DC) | [Advanced Energy](https://advancedenergy.com) |
| **Official Repository** | [OCP Rack & Power Wiki](https://www.opencompute.org/wiki/Rack_&_Power) | [OCP](https://opencompute.org) |
| **Design Files** | [OCP Specs & Designs](https://www.opencompute.org/wiki/Open_Rack/SpecsAndDesigns) | [OCP](https://opencompute.org) |

---

## Cross-Cutting: IEC 62443 Certification Summary

| Vendor | Product/Component | IEC 62443 Status | Certifying Body | SL Achieved | Source |
|---|---|---|---|---|---|
| **Schneider Electric** | Galaxy VXL (UPS) | IEC 62443-4-2 Certified | Not specified | Not specified | [SE](https://se.com) |
| **Schneider Electric** | NMC3 (AP9641/AP9643) | IEC 62443-4-2 Certified | TÜV Rheinland | **SL2** | [Industrial Cyber](https://industrialcyber.co) |
| **Schneider Electric** | NMC3 Development | ISASecure SDLA Compliant | ISASecure | — | [IoT Insider](https://iotinsider.com) |
| **Vertiv** | IntelliSlot™ RDU120 Card | IEC 62443-4-2 (comm card only) | Not specified | Not specified | [Vertiv](https://vertiv.com) |
| **Eaton** | Gigabit Network Card | IEC 62443-4-2 + UL 2900-1 | Not specified | Not specified | [Eaton](https://eaton.com) |
| **Eaton** | Industrial Gateway Card | IEC 62443-4-2 + UL 2900-1 | Not specified | Not specified | [Eaton](https://eaton.com) |
| **Eaton** | Development Process | IEC 62443-4-1 (industry-first) | Not specified | — | [Eaton](https://eaton.com) |
| **ABB/Hitachi Energy** | Relion 670 Series | NERC CIP, IEC 62351-8 design | — | — | [ABB](https://abb.com) |
| **Siemens** | SIPROTEC 5 | Signed firmware, RBAC | — | — | [Siemens](https://siemens.com) |

> **Note on IEC 62443 in power infrastructure:** Cybersecurity certifications typically apply to the **communication and management modules** (network cards, gateway cards, controllers) rather than the entire power conversion equipment. The UPS power path, switchgear, and relays themselves are covered by safety standards (IEC 62040, IEC 62271) while their management interfaces carry the cybersecurity certifications.

---

## Research Gaps & Follow-Up Items

1. **Specific IEC 62443 certificate dates** — Not publicly available for most vendors; requires direct vendor engagement or certificate registry queries (e.g., ISASecure registry, TÜV databases)
2. **Schneider Galaxy VXL NMC3 firmware exact version** — 3.x series confirmed, but specific version bundled with VXL varies by deployment; check SE firmware portal
3. **CVE tracking** — No datacenter-specific CVEs found in public search for these products; recommend monitoring:
   - [Schneider PSIRT](https://www.se.com/ww/en/work/support/cybersecurity/security-notifications.jsp)
   - [Vertiv Security Advisories](https://www.vertiv.com/en-us/support/security-advisories/)
   - [Eaton Cybersecurity](https://www.eaton.com/us/en-us/digital/cybersecurity.html)
   - [Siemens ProductCERT](https://cert-portal.siemens.com/)
   - [SEL Security](https://selinc.com/solutions/cybersecurity/)
4. **Woodward Modbus register map spreadsheet (XLS)** — Available at [Woodward manuals portal](https://wss.woodward.com/manuals/PGC/Forms/AllItems.aspx) (login may be required)
5. **ComAp InteliGen NT exact Modbus register map** — Documented in IGS-NT Communication Guide (vendor-restricted)
6. **Cummins DMC Modbus register map** — Available in controller-specific technical manual; contact Cummins distributor
7. **ABB Relion 670 exact firmware versions** — Available via ABB Automation Customer Portal (service agreement required)
8. **Hitachi Energy MV GIS specific model numbers** — Require consultation with Hitachi Energy for datacenter-specific MV (e.g., 15–38 kV range) models vs. their HV/EHV portfolio

---

*End of Research Brief — WP01 Systems Research*
