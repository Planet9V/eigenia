

# Hyperscale Data Center: Detailed System Design & Interface Control Document (ICD) for P&ID


**Document Class:** Detailed Level Design (DLD) / Interface Control Document (ICD)
**Facility Basis:** AI-Ready, Concurrently Maintainable Hyperscale Data Center — Tier III / Tier IV
**Design Standard References:** IEC 62443, IEC 61508/61511, IEC 61850, ASHRAE A1, ISO 31000, MIL-STD-1629A, NFPA 72, NFPA 2001, Uptime Institute Tier Classification
**Scope:** One representative sample per system; not duplicated per pod/row. All P&ID connections are categorized by connection type: 

**[F]** = Fluid, 
**[E]** = Electrical/Energy, 
**[D]** = Data/Signal, 
**[A]** = Air/Pneumatic, 
**[M]** = Mechanical/Physical, 
**[S]** = Safety-Hardwired.

*Document end. This ICD/System Design Document is intended as engineering reference input for P&ID drafting, FMECA development, SIL verification, and IEC 62443 zone/conduit design. All equipment models represent current 2025–2026 commercially available options. Site-specific engineering must validate all selections against applicable codes, regulations, and utility requirements before construction.*

***
## Document Structure
Each system section contains:
1. **System Purpose & P&ID Boundary**
2. **Equipment Register** (Tag, Description, Manufacturer/Model, OS/Firmware)
3. **Interface Control Table** (Interface ID, From Tag, To Tag, Connection Type, Medium/Protocol, Signal/Parameter, Direction, Safety Classification)
4. **P&ID Instrument Loop Description**
5. **Minimum Operating Requirements (MOR)**
6. **FMECA Pre-Screen / Hazard Log Flag**
7. **IEC 62443 Zone & Security Level Target (SL-T)**

***
## System 1: Grid Substation & Medium-Voltage Switchgear
### 1.1 System Purpose & P&ID Boundary
The Grid Substation system is the primary point of entry for utility power (11 kV–138 kV). It steps voltage down to site medium voltage (MV, 11 kV) for distribution to all power pods. The P&ID boundary encompasses utility demarcation point → incoming overhead/underground cable → MV Gas-Insulated Switchgear (GIS) → protective relays → MV busbar → feeder circuits to downstream transformers.[1][2]
### 1.2 Equipment Register
| P&ID Tag | Description | Manufacturer | Model | OS / Firmware | IEC 62443 Zone |
|----------|-------------|-------------|-------|---------------|----------------|
| MV-SWG-01 | MV Gas-Insulated Switchgear (GIS) | Hitachi Energy | ZX2 Series | QNX Neutrino RTOS | Zone 4: Substation (SL-T 4)[1] |
| PRO-RLY-01 | MV Protection Relay (overcurrent, differential, arc-flash) | Schweitzer Engineering Laboratories | SEL-751A | Proprietary Bare-Metal | Zone 4: Substation (SL-T 4)[1][2] |
| PRO-RLY-02 | Transformer Differential Protection Relay | ABB | REF615 | Proprietary Bare-Metal | Zone 4: Substation (SL-T 4) |
| MV-XFMR-A | HV/MV Incoming Power Transformer | ABB | PowerTransformer ONAN | N/A — passive | Zone 4: Substation |
| TT-MV-01 | Revenue Metering Current Transformer (CT) | ABB | CMF Series | N/A — passive | Zone 4: Substation |
| VT-MV-01 | Voltage Transformer (VT) for protection | ABB | TVT Series | N/A — passive | Zone 4: Substation |
| SCADA-RTU-01 | Substation RTU / Gateway | Schweitzer Engineering | SEL-3530 RTAC | Linux (Hardened) | Zone 4: Substation (SL-T 4) |
| EPMS-SRV | Electrical Power Monitoring Server | Schneider Electric | PowerLogic PME / ION9000 | Embedded Linux | Zone 2: Electrical (SL-T 3)[1][2] |
| EPO-BTN-01 | Emergency Power Off (EPO) button | Schneider Electric | Harmony XB5 | N/A — hardwired | Zone 2: Electrical (SL-T 4)[2] |
### 1.3 Interface Control Table — System 1
| ICD-ID | From Tag | To Tag | Type | Medium / Protocol | Signal / Parameter | Direction | Safety Class |
|--------|----------|--------|------|-------------------|--------------------|-----------|-------------|
| ICD-1.01 | Utility Grid | MV-SWG-01 | [E] Electrical | 3-phase 11 kV AC, 50/60 Hz | Utility power supply | In → | N/A |
| ICD-1.02 | MV-SWG-01 | PRO-RLY-01 | [E]+[S] | CT/VT secondary wiring; copper hardwired | Phase current, voltage, fault | Bi-dir | SIL 3 (IEC 61511) |
| ICD-1.03 | PRO-RLY-01 | MV-SWG-01 (breaker) | [S] Safety | Hardwired trip coil (48 VDC) | Trip / Close command | → Out | SIL 3 |
| ICD-1.04 | PRO-RLY-01 | SCADA-RTU-01 | [D] Data | IEC 61850 MMS over fiber Ethernet | GOOSE trip messages, event reports | Bi-dir | SL-T 4 |
| ICD-1.05 | PRO-RLY-01 (peer) | PRO-RLY-02 (peer) | [D] Data | IEC 61850 GOOSE (<4 ms latency) over PRP/HSR fiber | Horizontal tripping / blocking commands | Bi-dir | SIL 3 / SL-T 4 |
| ICD-1.06 | SCADA-RTU-01 | EPMS-SRV | [D] Data | Modbus TCP / IEC 61850 MMS over isolated OT LAN | Power telemetry (V, I, W, PF, Hz) | → Out | SL-T 3 |
| ICD-1.07 | EPMS-SRV | BMS-SRV (SYS-12) | [D] Data | OPC UA over TLS / REST API | Power quality alarms, energy metering | → Out | SL-T 3 |
| ICD-1.08 | EPO-BTN-01 | MV-SWG-01 (shunt trip) | [S] Safety | Hardwired copper, 48 VDC safety loop | Emergency shutdown command | → Out | SIL 3 / SL-T 4 |
| ICD-1.09 | MV-SWG-01 | XFMR-01 (SYS-2) | [E] Electrical | MV cable duct bank, 11 kV | Power distribution to transformers | → Out | N/A |
| ICD-1.10 | TT-MV-01 / VT-MV-01 | PRO-RLY-01 | [E] Analogue | CT/VT secondary leads (1A / 110V) | Metering and protection inputs | → Out | SIL 3 |
### 1.4 P&ID Instrument Loops
- **Loop L-01.1 (Overcurrent Protection):** CT (TT-MV-01) → 1A secondary → PRO-RLY-01 (pickup set at 1.2× FLA, time-overcurrent I²T curve) → hardwired trip output → MV-SWG-01 breaker trip coil. Cross-trips peer relay PRO-RLY-02 via IEC 61850 GOOSE within <4 ms.[2]
- **Loop L-01.2 (Arc Flash Detection):** Optical fiber arc-flash sensors within MV-SWG-01 busbar cells → direct hardwired arc flash detect input → PRO-RLY-01 → high-speed trip (<8 ms) → breaker trip coil.
- **Loop L-01.3 (EPO):** EPO-BTN-01 (key-switch + dual-break) → hardwired supervised loop → shunt trip coil MV-SWG-01. Operates independently of BMS/SCADA software.[1][2]
### 1.5 MOR, FMECA & Hazard Log
| Attribute | Detail |
|-----------|--------|
| **MOR** | ≥1 live MV feeder; ≥1 protection relay per circuit armed; EPO circuit continuous supervision |
| **FMECA Category** | Category I — Catastrophic (loss of both utility feeds → full site blackout)[1][3] |
| **Hazard Log** | Arc flash (NFPA 70E boundary); SF6 gas release (GIS maintenance); out-of-phase closing; cyber-induced false trip of protection relay[1] |
| **Downtime Cost** | ~$12.5M per hour[1] |
| **SIL / SL-T** | SIL 3 (protection relay trip function); SL-T 4 (substation zone)[1][2] |

***
## System 2: Power Transformers (MV/LV Distribution)
### 2.1 System Purpose & P&ID Boundary
Step MV (11 kV) down to low voltage (LV 415 V / 480 V) for data hall pods. Each transformer is a cast-resin dry-type unit serving one power distribution board (PDB) per pod pair. Boundary: MV feeder cable from MV-SWG-01 → transformer primary terminals → transformer secondary → LV switchgear (SYS-6).[2][3]
### 2.2 Equipment Register
| P&ID Tag | Description | Manufacturer | Model | OS / Firmware | IEC 62443 Zone |
|----------|-------------|-------------|-------|---------------|----------------|
| XFMR-01 | Dry-Type Cast Resin Power Transformer, 2.5–3 MVA, 11 kV/415 V | ABB | TriDry Series | Bare-Metal Firmware | Zone 3: Field (SL-T 2)[1][2] |
| TT-XFMR-01 | Winding Temperature Transmitter (embedded Pt100) | ABB | TT-M02 embedded | Analogue | Zone 3: Field |
| FAN-XFMR-01 | Forced-Air Cooling Fan Pack (thermostatically controlled) | ABB | Integrated cooling fans | Hardwired thermostat | Zone 3: Field |
| PRO-RLY-03 | Overcurrent / Earth Fault Relay (LV side) | Schneider Electric | Easergy P3T30 | Proprietary firmware | Zone 2: Electrical (SL-T 2) |
| TI-XFMR-01 | Thermal Imaging Sensor (periodic inspection) | Fluke | Ti450 (portable) or Optix IR sensor | N/A | Portable |
### 2.3 Interface Control Table — System 2
| ICD-ID | From Tag | To Tag | Type | Medium / Protocol | Signal / Parameter | Direction | Safety Class |
|--------|----------|--------|------|-------------------|--------------------|-----------|-------------|
| ICD-2.01 | MV-SWG-01 (SYS-1) | XFMR-01 (Primary) | [E] Electrical | MV cable 11 kV, 3-phase | Power supply to transformer | In → | N/A |
| ICD-2.02 | XFMR-01 (Secondary) | LV-SWG-01 (SYS-6) | [E] Electrical | LV busbars 415 V, 3-phase | Stepped-down power distribution | → Out | N/A |
| ICD-2.03 | TT-XFMR-01 | PRO-RLY-03 | [D] Analogue | 4–20 mA / Pt100 RTD | Winding temperature | → Out | SIL 1 |
| ICD-2.04 | PRO-RLY-03 | LV-SWG-01 (breaker) | [S] Safety | Hardwired trip (48 VDC) | Overcurrent / thermal overload trip | → Out | SIL 1 |
| ICD-2.05 | TT-XFMR-01 | BMS-SRV (SYS-12) | [D] Data | Modbus RTU → Modbus TCP gateway | Winding temperature trending | → Out | SL-T 2 |
| ICD-2.06 | FAN-XFMR-01 | TT-XFMR-01 (thermostat) | [S] Control | Hardwired thermostat relay (105°C set-point) | Fan start/stop command | Bi-dir | SIL 1 |
| ICD-2.07 | PRO-RLY-03 | EPMS-SRV (SYS-1) | [D] Data | Modbus TCP | Relay status, fault events | → Out | SL-T 2 |
### 2.4 MOR, FMECA & Hazard Log
| Attribute | Detail |
|-----------|--------|
| **MOR** | N+1 transformer arrangement per distribution zone; winding temperature monitoring active; cooling fans operational |
| **FMECA Category** | Category I — Catastrophic (transformer failure eliminates power to affected pod)[3] |
| **Hazard Log** | Arc flash (LV side); winding overheat; thermal sensor spoofing blocking fan actuation; cascading overload on redundant unit[1] |
| **SIL / SL-T** | SIL 1 (thermal protection); SL-T 2 (field zone)[1][2] |

***
## System 3: UPS — Double-Conversion Modular Chain
### 3.1 System Purpose & P&ID Boundary
Provides conditioned, uninterruptible AC power to data hall PDUs. A distributed block redundant topology (typically 4-to-3 or 2N) ensures any single UPS module failure does not interrupt load. Boundary: LV input from transformer/LV switchgear → UPS rectifier → battery string → inverter → UPS bypass switch → output busbar → downstream PDUs.[1][2][3]
### 3.2 Equipment Register
| P&ID Tag | Description | Manufacturer | Model | OS / Firmware | IEC 62443 Zone |
|----------|-------------|-------------|-------|---------------|----------------|
| UPS-A-01 | Double-Conversion Online Modular UPS, 1250 kW | Schneider Electric | Galaxy VX 1250 kW | VxWorks RTOS | Zone 2: Electrical (SL-T 3)[1][2] |
| UPS-NMC-A | UPS Network Management Card | Schneider Electric | AP9641 (NMC3) | Embedded Linux (Kernel 5.10) | Zone 2: Electrical (SL-T 3)[1] |
| BAT-STR-A | Li-Ion Battery String / Cabinet | Schneider Electric / EnerSys | Galaxy Li-Ion Battery (or VRLA) | BMS Firmware | Zone 2: Electrical (SL-T 3) |
| UPS-BYP-A | Maintenance Bypass Switch | Schneider Electric | Integrated Static Bypass | Hardwired logic | Zone 2: Electrical (SL-T 3) |
| STS-01 | Static Transfer Switch (<4 ms) | Vertiv | Liebert STS2 | Proprietary Firmware | Zone 2: Electrical (SL-T 3)[3] |
| BAT-MON-A | Battery Monitoring System | Alber (Vertiv) | BDS256 | Embedded firmware | Zone 2: Electrical (SL-T 2) |
### 3.3 Interface Control Table — System 3
| ICD-ID | From Tag | To Tag | Type | Medium / Protocol | Signal / Parameter | Direction | Safety Class |
|--------|----------|--------|------|-------------------|--------------------|-----------|-------------|
| ICD-3.01 | LV-SWG-01 (SYS-6) | UPS-A-01 (input) | [E] Electrical | LV 415 V AC, 3-phase busbar | AC power input to UPS rectifier | In → | N/A |
| ICD-3.02 | UPS-A-01 (DC bus) | BAT-STR-A | [E] Electrical | 480–540 V DC battery bus | DC charge/discharge | Bi-dir | SIL 1 (BMS) |
| ICD-3.03 | BAT-STR-A | BAT-MON-A | [D] Analogue+Data | Hardwired cell voltage/temp + Modbus RTU | Per-cell V, T, SoH, SoC | → Out | SIL 1 |
| ICD-3.04 | BAT-MON-A | UPS-A-01 (controller) | [D] Data | Modbus RTU / RS-485 | Battery state, alarm | → Out | SIL 1 |
| ICD-3.05 | UPS-A-01 (output) | STS-01 (input A) | [E] Electrical | 415 V AC 3-phase | UPS-conditioned power | → Out | N/A |
| ICD-3.06 | LV-SWG-01 (bypass) | STS-01 (input B) | [E] Electrical | 415 V AC 3-phase | Bypass raw power | → Out | N/A |
| ICD-3.07 | STS-01 (output) | Row PDU / rPDU (SYS-8) | [E] Electrical | 415 V AC 3-phase | Conditioned power to racks | → Out | N/A |
| ICD-3.08 | UPS-NMC-A | DCIM Environet (SYS-13) | [D] Data | SNMP v3 / Modbus TCP over isolated power VLAN | UPS load, battery SoC, alarms | → Out | SL-T 3 |
| ICD-3.09 | UPS-NMC-A | BMS-SRV (SYS-12) | [D] Data | HTTPS / SNMP v3 | UPS fault alarms | → Out | SL-T 3 |
| ICD-3.10 | UPS-A-01 (bypass relay) | UPS-BYP-A | [S] Safety | Hardwired relay interlock | Static bypass command (power fail) | Bi-dir | SIL 2 |
| ICD-3.11 | BESS PCS (SYS-7) | UPS-A-01 (DC bus) | [E] Electrical | MV/LV DC bus coupling | DC energy injection (ride-through) | Bi-dir | SIL 2 |
### 3.4 MOR, FMECA & Hazard Log
| Attribute | Detail |
|-----------|--------|
| **MOR** | ≥N+1 UPS modules online; battery autonomy ≥5 min at full load; static bypass operable |
| **FMECA Category** | Category I — Catastrophic (all modules fail); Category II — single module (N+1 intact)[3] |
| **Hazard Log** | Li-ion thermal runaway; bypass failure; RCE on NMC3 card (TLStorm class CVE) enabling simultaneous module shutdown; out-of-phase bypass transfer[1] |
| **Downtime Cost** | ~$12.5M per hour[1] |
| **SIL / SL-T** | SIL 2 (bypass/BMS); SL-T 3 (Zone 2 Electrical)[1][2] |

***
## System 4: Automatic Transfer Switches (ATS) & Static Transfer Switches (STS)
### 4.1 System Purpose & P&ID Boundary
ATS transfers loads between utility source and generator output during utility failure (transfer time ~10–30 s). STS provides sub-cycle (<4 ms) transfer between two UPS output buses. Boundary: Generator output bus → ATS input A; Utility bus → ATS input B; ATS output → UPS input.[2][3]
### 4.2 Equipment Register
| P&ID Tag | Description | Manufacturer | Model | OS / Firmware | IEC 62443 Zone |
|----------|-------------|-------------|-------|---------------|----------------|
| ATS-A-01 | Microprocessor-Controlled Automatic Transfer Switch | ASCO (Schneider Electric) | 7000 Series | FreeRTOS | Zone 2: Electrical (SL-T 3)[1][2] |
| STS-01 | Solid-State Static Transfer Switch, <4 ms | Vertiv | Liebert STS2 | Proprietary Firmware | Zone 2: Electrical (SL-T 3)[3] |
| ATS-CTL-A | ATS Microprocessor Control Module | ASCO | 5\*\*ATC control module | FreeRTOS | Zone 2: Electrical (SL-T 3) |
### 4.3 Interface Control Table — System 4
| ICD-ID | From Tag | To Tag | Type | Medium / Protocol | Signal / Parameter | Direction | Safety Class |
|--------|----------|--------|------|-------------------|--------------------|-----------|-------------|
| ICD-4.01 | GEN-A-01 (SYS-5) | ATS-A-01 (Source 1) | [E] Electrical | LV 415 V AC, 3-phase | Generator power | In → | N/A |
| ICD-4.02 | LV-SWG-01 (SYS-6) | ATS-A-01 (Source 2) | [E] Electrical | LV 415 V AC, 3-phase | Utility power | In → | N/A |
| ICD-4.03 | ATS-A-01 (output) | UPS-A-01 (SYS-3) input | [E] Electrical | LV 415 V AC | Selected source to UPS | → Out | N/A |
| ICD-4.04 | ATS-CTL-A | GEN-CTL-A (SYS-5) | [D]+[S] | Hardwired dry contact + Modbus TCP | Utility fail signal → generator start command | → Out | SIL 2 |
| ICD-4.05 | ATS-CTL-A | BMS-SRV (SYS-12) | [D] Data | Modbus TCP / BACnet/IP | ATS position status, transfer event log | → Out | SL-T 3 |
| ICD-4.06 | ATS-CTL-A | EPMS-SRV (SYS-1) | [D] Data | Modbus TCP | Voltage/frequency monitoring, source status | In → | SL-T 3 |
| ICD-4.07 | PRO-RLY-01 (SYS-1) | ATS-CTL-A | [S] Safety | Hardwired relay contact | Utility undervoltage / fault signal | In → | SIL 2 |
| ICD-4.08 | STS-01 | rPDU (SYS-8) | [E] Electrical | LV 415 V AC | Conditioned power output to racks | → Out | N/A |
### 4.4 MOR, FMECA & Hazard Log
| Attribute | Detail |
|-----------|--------|
| **MOR** | 1 ATS per distribution circuit; transfer complete within 30 s of utility failure; STS <4 ms |
| **FMECA Category** | Category I — Catastrophic (misoperation causes sustained power loss or arc flash)[3] |
| **Hazard Log** | Out-of-phase transfer (mechanical damage to generators); failure to transfer; command injection via Modbus write[1] |
| **SIL / SL-T** | SIL 2; SL-T 3[1][2] |

***
## System 5: Diesel Backup Generators
### 5.1 System Purpose & P&ID Boundary
Last-resort electrical generation. Multiple large-frame generator sets configured N+1. Engine management via integral ECU (EMCP/Woodward); paralleling via dedicated generator paralleling controller. Boundary: Fuel tank → fuel system → engine → alternator → generator output breaker → paralleling busbar → ATS input.[1][2][3]
### 5.2 Equipment Register
| P&ID Tag | Description | Manufacturer | Model | OS / Firmware | IEC 62443 Zone |
|----------|-------------|-------------|-------|---------------|----------------|
| GEN-A-01 | Diesel Generator Set, 2000–3500 kW | Caterpillar | Cat 3516C-HD | Proprietary (EMCP 4.2 RTOS) | Zone 3: Field (SL-T 2)[1][2] |
| GEN-CTL-A | Generator Electronic Control Unit (ECU) / Governor Controller | Woodward | easYgen-3500XT | VxWorks RTOS | Zone 2: Electrical (SL-T 3)[1][2] |
| PGC-01 | Generator Paralleling Controls Platform | Woodward | easYgen-3500XT PGC | VxWorks RTOS | Zone 2: Electrical (SL-T 3)[2] |
| FUEL-TK-01 | Day Tank (Diesel fuel storage) | CECO Environmental | CECO UL-142 (750–3000 gal) | N/A — passive | Zone 3: Field |
| FLT-LVL-01 | Fuel Level Transmitter (day tank) | Gems Sensors | XT-Serie float level | 4–20 mA analogue | Zone 3: Field |
| EXH-SYS-01 | Exhaust Stack & Silencer | Caterpillar | Integrated critical exhaust | N/A — mechanical | N/A |
| COOL-SYS-01 | Engine Radiator Cooling System | Caterpillar | Integrated radiator/aftercooler | Thermostat-controlled | Zone 3: Field |
### 5.3 Interface Control Table — System 5
| ICD-ID | From Tag | To Tag | Type | Medium / Protocol | Signal / Parameter | Direction | Safety Class |
|--------|----------|--------|------|-------------------|--------------------|-----------|-------------|
| ICD-5.01 | FUEL-TK-01 | GEN-A-01 (engine) | [F] Fluid | Diesel fuel supply line, DN50 | Fuel at 3–5 bar | → Out | N/A |
| ICD-5.02 | GEN-A-01 (alternator output) | PGC-01 (sync check) | [E]+[D] | LV 415 V pilot leads + CT/VT secondary | Generator voltage, frequency, phase angle | → Out | SIL 2 |
| ICD-5.03 | PGC-01 | GEN-CTL-A | [D] Data+[S] | CAN Bus / Modbus TCP | Governor setpoint, speed, paralleling commands | Bi-dir | SIL 2 |
| ICD-5.04 | GEN-CTL-A | GEN-A-01 (ECU) | [D]+[S] | SAE J1939 CAN Bus (internal) | Start/stop, governor, excitation control | Bi-dir | SIL 2 |
| ICD-5.05 | GEN-A-01 (output breaker) | ATS-A-01 (SYS-4) | [E] Electrical | LV busbars 415 V | Generator output to ATS Source 1 | → Out | N/A |
| ICD-5.06 | GEN-CTL-A | BMS-SRV (SYS-12) | [D] Data | Modbus TCP | Gen status, kW output, fuel level, alarms | → Out | SL-T 2 |
| ICD-5.07 | ATS-CTL-A (SYS-4) | GEN-CTL-A | [S] Safety | Hardwired dry contact | Utility fail → generator start signal | In → | SIL 2 |
| ICD-5.08 | FLT-LVL-01 | BMS-SRV (SYS-12) | [D] Analogue | 4–20 mA → Modbus via DDC | Day tank fuel level | → Out | SL-T 2 |
| ICD-5.09 | COOL-SYS-01 | GEN-CTL-A | [D]+[F] | Coolant temperature sensors (Pt100) + coolant loop | Engine coolant temperature | → Out | SIL 1 |
| ICD-5.10 | EXH-SYS-01 | Atmosphere | [A] Air/Gas | 3–5 bar exhaust stack | Combustion exhaust | → Out | N/A (emissions) |
### 5.4 MOR, FMECA & Hazard Log
| Attribute | Detail |
|-----------|--------|
| **MOR** | ≥N+1 generators; start within 30 s of utility loss; day tank ≥8-hour fuel at rated load; paralleling within 5 s of voltage matching |
| **FMECA Category** | Category I — Catastrophic (all generators fail); Category II — single unit (N+1 intact)[3] |
| **Hazard Log** | Fuel spill/fire; exhaust CO accumulation; out-of-phase paralleling (shaft damage, arc flash); governor manipulation via CAN/Modbus[1] |
| **Downtime Cost** | ~$12.5M per hour[1] |
| **SIL / SL-T** | SIL 2 (paralleling / auto-start); SL-T 2–3[1][2] |

***
## System 6: Low-Voltage Distribution Switchgear & Electrical Power Monitoring
### 6.1 System Purpose & P&ID Boundary
Distributes LV (415 V) power from transformers to UPS inputs, PDU feeds, mechanical plant, and auxiliary loads. Includes intelligent circuit breakers with EPMS integration. Boundary: Transformer LV secondary → LV main switchboard → distribution circuits → UPS inputs, CRAH panels, mechanical plant panels.[1][2]
### 6.2 Equipment Register
| P&ID Tag | Description | Manufacturer | Model | OS / Firmware | IEC 62443 Zone |
|----------|-------------|-------------|-------|---------------|----------------|
| LV-SWG-01 | LV Air-Insulated Main Distribution Switchboard | Eaton | Pow-R-Line / Power Defense | Bare-Metal Firmware | Zone 3: Field (SL-T 2)[1][2] |
| ACB-01 | Air Circuit Breaker (Main + Distribution) | Eaton | IZM or Magnum DS ACB | Embedded Trip Unit firmware | Zone 3: Field (SL-T 2) |
| EPMS-MTR | Power Quality Meter | Schneider Electric | PowerLogic ION9000 | Embedded Linux | Zone 2: Electrical (SL-T 3)[1] |
| BUS-DIF-01 | Busbar Differential Protection Relay | ABB | REB670 | Proprietary firmware | Zone 2: Electrical (SL-T 3) |
| SURGE-01 | Surge Protection Device (SPD) | Dehn | DG M TNC 275 | N/A — passive | Zone 3: Field |
### 6.3 Interface Control Table — System 6
| ICD-ID | From Tag | To Tag | Type | Medium / Protocol | Signal / Parameter | Direction | Safety Class |
|--------|----------|--------|------|-------------------|--------------------|-----------|-------------|
| ICD-6.01 | XFMR-01 (SYS-2) | LV-SWG-01 (main bus) | [E] Electrical | LV 415 V AC busbars | Transformer secondary output | In → | N/A |
| ICD-6.02 | LV-SWG-01 | UPS-A-01 (SYS-3) | [E] Electrical | LV feeder cables, 415 V | UPS AC input | → Out | N/A |
| ICD-6.03 | LV-SWG-01 | CRAH panels, mechanical plant | [E] Electrical | LV feeder cables, 415 V | Auxiliary loads | → Out | N/A |
| ICD-6.04 | ACB-01 (trip unit) | BUS-DIF-01 | [D]+[S] | Hardwired pilot + IEC 61850 GOOSE | Fault current, differential protection | Bi-dir | SIL 1 |
| ICD-6.05 | EPMS-MTR | EPMS-SRV (SYS-1) | [D] Data | Modbus TCP / IEC 61850 / DNP3 | V, I, W, PF, harmonics, energy | → Out | SL-T 3 |
| ICD-6.06 | EPMS-MTR | BMS-SRV (SYS-12) | [D] Data | Modbus TCP | Load trending, demand alarms | → Out | SL-T 3 |
| ICD-6.07 | ACB-01 (control unit) | BMS-SRV (SYS-12) | [D] Data | Modbus TCP | Breaker state, trip event | → Out | SL-T 2 |
### 6.4 MOR, FMECA & Hazard Log
| Attribute | Detail |
|-----------|--------|
| **MOR** | 2N LV switchboard configuration; EPMS metering active on all critical feeders |
| **FMECA Category** | Category I (main bus fault); Category II (individual feeder)[3] |
| **Hazard Log** | LV arc flash; breaker trip curve manipulation via Modbus write; telemetry masking hiding transformer overload[1] |
| **SIL / SL-T** | SIL 1; SL-T 2–3[1][2] |

***
## System 7: Battery Energy Storage System (BESS)
### 7.1 System Purpose & P&ID Boundary
Grid-forming or grid-following BESS provides extended backup, demand response, and real-time frequency/voltage support for AI load transients. Deployed at MV or LV with a power conversion system (PCS/inverter). Boundary: BESS enclosure → PCS → MV/LV bus connection → site microgrid EMS.[1][2][3]
### 7.2 Equipment Register
| P&ID Tag | Description | Manufacturer | Model | OS / Firmware | IEC 62443 Zone |
|----------|-------------|-------------|-------|---------------|----------------|
| BESS-MOD | BESS Container / Module (Li-ion NMC or LFP) | Tesla | Megapack 2XL (3.9 MWh/unit) | N/A — cells | Zone 2: Electrical |
| BESS-BMS | Battery Management System Controller | Tesla / Proprietary | Megapack BMS | Hardened Linux Kernel | Zone 2: Electrical (SL-T 3)[1] |
| BESS-PCS | Power Conversion System (Inverter/Rectifier) | SMA | Sunny Highpower PEAK3 or KACO blueplanet | Embedded Linux / VxWorks | Zone 2: Electrical (SL-T 3) |
| BESS-EMS | Energy Management System | FlexGen | HybridOS | Linux | Zone 2: Electrical (SL-T 3) |
| BESS-FSD | Fire Suppression (BESS-specific, Li-ion thermal runaway) | Kidde / Carrier | Aritech Li-ion suppression | Hardwired | Zone 3: Safety (SL-T 4) |
| BESS-GAS | Off-gas / H₂F Detection Sensor | MSA Safety | ULTIMA Series | 4–20 mA | Zone 3: Safety |
### 7.3 Interface Control Table — System 7
| ICD-ID | From Tag | To Tag | Type | Medium / Protocol | Signal / Parameter | Direction | Safety Class |
|--------|----------|--------|------|-------------------|--------------------|-----------|-------------|
| ICD-7.01 | BESS-MOD (cells) | BESS-BMS | [E]+[D] | High-voltage DC bus + cell monitoring harness | DC voltage, per-cell V/T/SoC | Bi-dir | SIL 2 |
| ICD-7.02 | BESS-BMS | BESS-PCS | [D] Data | CAN Bus + Modbus TCP | Charge/discharge commands, limits | Bi-dir | SIL 2 |
| ICD-7.03 | BESS-PCS | LV-SWG-01 (SYS-6) / MV bus | [E] Electrical | LV 415 V AC or MV 11 kV | AC power injection/absorption | Bi-dir | N/A |
| ICD-7.04 | BESS-EMS | BESS-PCS | [D] Data | Modbus TCP / IEC 61850 | Real/reactive power setpoints | → Out | SL-T 3 |
| ICD-7.05 | BESS-EMS | BMS-SRV (SYS-12) | [D] Data | Modbus TCP / OPC UA | BESS SoC, power dispatch, alarms | → Out | SL-T 3 |
| ICD-7.06 | BESS-GAS | BESS-FSD (trigger) | [S] Safety | Hardwired relay (4–20 mA threshold) | Off-gas alarm → suppression trigger | → Out | SIL 2 |
| ICD-7.07 | BESS-FSD | FACP-01 (SYS-16) | [S] Safety | Hardwired alarm contact | Fire suppression activation alarm | → Out | SIL 3 |
| ICD-7.08 | BESS-BMS | DCIM Environet (SYS-13) | [D] Data | DNP3 / Modbus TCP | Battery health, thermal status | → Out | SL-T 3 |
### 7.4 MOR, FMECA & Hazard Log
| Attribute | Detail |
|-----------|--------|
| **MOR** | ≥1 BESS unit at ≥80% SoC; off-gas detection active; fire suppression armed |
| **FMECA Category** | Category I — Catastrophic (BESS fire / thermal runaway); Category II — BMS fault[3] |
| **Hazard Log** | Li-ion thermal runaway; HF off-gas; BMS override → continuous overcharge → cell swelling; cyber manipulation of SoC data masking unsafe condition[1] |
| **Downtime Cost** | ~$5.0M per hour (throttled compute)[1] |
| **SIL / SL-T** | SIL 2 (BMS thermal runaway protection); SL-T 3[1][2] |

***
## System 8: Rack-Level Power Distribution (PDU / rPDU)
### 8.1 System Purpose & P&ID Boundary
Distributes power at rack level from UPS output to individual IT equipment outlets. Intelligent switched rPDUs provide per-outlet monitoring and remote switching. Boundary: UPS/STS output → row-level distribution board → A+B rPDU feeds → individual server/switch outlets.[2][3]
### 8.2 Equipment Register
| P&ID Tag | Description | Manufacturer | Model | OS / Firmware | IEC 62443 Zone |
|----------|-------------|-------------|-------|---------------|----------------|
| PDU-ROW-01 | Row-Level Power Distribution Panel | Schneider Electric | Galaxy PDU | Firmware | Zone 2: Electrical (SL-T 3) |
| rPDU-A | Rack PDU — Feed A (switched, metered, 0U) | Raritan (Legrand) | PX4 Switched Series | Embedded firmware | Zone 2: Electrical (SL-T 3)[2] |
| rPDU-B | Rack PDU — Feed B (switched, metered, 0U) | Vertiv | Geist rPDU Switched | Embedded firmware | Zone 2: Electrical (SL-T 3) |
| EM-01 | Environmental Monitor (Temp/Humidity per rack) | Vertiv | Geist SHD or RTemp | SNMP | Zone 1: BMS/HVAC (SL-T 2) |
### 8.3 Interface Control Table — System 8
| ICD-ID | From Tag | To Tag | Type | Medium / Protocol | Signal / Parameter | Direction | Safety Class |
|--------|----------|--------|------|-------------------|--------------------|-----------|-------------|
| ICD-8.01 | STS-01 (SYS-3/4) | PDU-ROW-01 | [E] Electrical | LV 415 V AC | Protected power to row | In → | N/A |
| ICD-8.02 | PDU-ROW-01 | rPDU-A | [E] Electrical | 3-phase / single-phase 240 V AC | A-side power to rack | → Out | N/A |
| ICD-8.03 | PDU-ROW-01 | rPDU-B | [E] Electrical | 3-phase / single-phase 240 V AC | B-side power to rack | → Out | N/A |
| ICD-8.04 | rPDU-A / rPDU-B | Server, switch, storage outlets | [E] Electrical | NEMA / IEC 320 C13/C19 outlets | Individual device power | → Out | N/A |
| ICD-8.05 | rPDU-A | DCIM Environet (SYS-13) | [D] Data | SNMP v3 / Modbus TCP | Per-outlet current, kW, kWh, outlet state | → Out | SL-T 3 |
| ICD-8.06 | EM-01 | DCIM Environet (SYS-13) | [D] Data | SNMP v3 | Rack inlet/outlet temperature, humidity | → Out | SL-T 2 |

***
## System 9: Primary Cooling Loop — Facility Water System (FWS)
### 9.1 System Purpose & P&ID Boundary
Closed hydronic FWS loop: chilled water produced at centrifugal/magnetic-bearing chillers (7°C supply) → primary pumps → CDU heat exchanger primary side → CRAH/RDHx coils → return to chiller (12–14°C return). Condenser loop: chiller condensers → cooling towers → return.[2][3]
### 9.2 Equipment Register
| P&ID Tag | Description | Manufacturer | Model | OS / Firmware | IEC 62443 Zone |
|----------|-------------|-------------|-------|---------------|----------------|
| CHL-A-01 | Centrifugal Magnetic-Bearing Oil-Free Chiller, 500 RT | Johnson Controls | YORK YZ Series | Proprietary RTOS (OptiView) | Zone 1: BMS/HVAC (SL-T 2)[1][2] |
| CHL-CTL-A | Chiller OptiView Panel Controller | Johnson Controls | OptiView Controller | Proprietary firmware | Zone 1: BMS/HVAC (SL-T 2)[2] |
| CTW-01 | Induced-Draft Counterflow Cooling Tower, N+1 cells | Baltimore Aircoil | Series 3000 | Bare-Metal Firmware | Zone 3: Field (SL-T 2)[1][2] |
| CHW-PMP-01 | Primary Chilled Water Pump (N+1) | Grundfos | Hydro MPC-E (in-line centrifugal) | Modbus RTU | Zone 3: Field (SL-T 2)[2] |
| PMP-VFD-01 | Variable Frequency Drive — CHW Pump | ABB | ACQ580 | CODESYS on Linux | Zone 1: BMS/HVAC (SL-T 2)[1][2] |
| CDW-PMP-01 | Condenser Water Pump (N+1) | Grundfos | NK Series | Modbus RTU | Zone 3: Field (SL-T 2) |
| TT-FWS-01 | Chilled Water Supply Temperature Transmitter | Emerson (Rosemount) | 3144P | 4–20 mA / HART | Zone 3: Field (SL-T 2)[2] |
| TT-FWS-02 | Chilled Water Return Temperature Transmitter | Emerson (Rosemount) | 3144P | 4–20 mA / HART | Zone 3: Field (SL-T 2) |
| FT-FWS-01 | Chilled Water Flow Transmitter | Emerson | Vortex 8800A | 4–20 mA / HART | Zone 3: Field |
| PT-FWS-01 | Chilled Water Differential Pressure Transmitter | Yokogawa | EJX110A | 4–20 mA / HART | Zone 3: Field |
| FCV-FWS-01 | Motorized Chilled Water Isolation/Modulating Valve | Belimo | EV Series (actuated butterfly) | BACnet MS/TP / Modbus RTU / 2–10 V | Zone 3: Field (SL-T 2)[2] |
| WTS-PLC-01 | Water Treatment Chemical Dosing PLC | Siemens | SIMATIC S7-1200 | Siemens proprietary | Zone 1: BMS/HVAC (SL-T 2)[2] |
| LEK-DET-02 | Underfloor Leak Detection (FWS piping) | RLE Technologies | SeaHawk LD5200G | Modbus TCP | Zone 1: BMS/HVAC (SL-T 2) |
### 9.3 Interface Control Table — System 9
| ICD-ID | From Tag | To Tag | Type | Medium / Protocol | Signal / Parameter | Direction | Safety Class |
|--------|----------|--------|------|-------------------|--------------------|-----------|-------------|
| ICD-9.01 | CTW-01 (basin outlet) | CDW-PMP-01 | [F] Fluid | Condenser water, 29°C, 6–10 bar, DN250 | Condenser water supply | → Out | N/A |
| ICD-9.02 | CDW-PMP-01 | CHL-A-01 (condenser inlet) | [F] Fluid | Condenser water, DN250 | Condenser water to chiller | → Out | N/A |
| ICD-9.03 | CHL-A-01 (condenser outlet) | CTW-01 (hot water inlet) | [F] Fluid | Condenser water, 35°C return, DN250 | Warm water to cooling tower | → Out | N/A |
| ICD-9.04 | CHL-A-01 (evaporator outlet) | CHW-PMP-01 | [F] Fluid | Chilled water, 7°C supply, DN200 | CHW supply to primary distribution | → Out | N/A |
| ICD-9.05 | CHW-PMP-01 | CDU-01 (SYS-10) / CRAH (SYS-11) | [F] Fluid | Chilled water, 7°C, 4–6 bar, DN200 | CHW supply to cooling units | → Out | N/A |
| ICD-9.06 | CDU-01 / CRAH return header | CHL-A-01 (evaporator inlet) | [F] Fluid | Chilled water, 12–14°C return, DN200 | CHW return to chiller | → Out | N/A |
| ICD-9.07 | TT-FWS-01 | CHL-CTL-A | [D] Analogue | 4–20 mA HART | CHW supply temperature feedback | → Out | SIL 1 |
| ICD-9.08 | TT-FWS-02 | CHL-CTL-A | [D] Analogue | 4–20 mA HART | CHW return temperature feedback | → Out | SIL 1 |
| ICD-9.09 | FT-FWS-01 | CHL-CTL-A | [D] Analogue | 4–20 mA HART | CHW flow rate (m³/h) | → Out | SIL 1 |
| ICD-9.10 | PT-FWS-01 | PMP-VFD-01 (setpoint) | [D] Analogue | 4–20 mA → BMS DDC | Differential pressure feedback | → Out | SL-T 2 |
| ICD-9.11 | PMP-VFD-01 | CHW-PMP-01 (motor) | [E]+[D] | VFD 0–100% speed + Modbus TCP | Motor speed, fault status | Bi-dir | SL-T 2 |
| ICD-9.12 | FCV-FWS-01 | BMS DDC-01 (SYS-12) | [D] Data | BACnet MS/TP | Valve position command/feedback | Bi-dir | SL-T 2 |
| ICD-9.13 | CHL-CTL-A | BMS-SRV (SYS-12) | [D] Data | BACnet/IP (native) | Chiller status, kW, COP, alarms | → Out | SL-T 2 |
| ICD-9.14 | WTS-PLC-01 | Chemical dosing pumps | [F]+[D] | Dosing tube (peristaltic) + PROFINET | Inhibitor / biocide dosing, flow rate | → Out | SL-T 2 |
| ICD-9.15 | LEK-DET-02 | BMS-SRV (SYS-12) | [D] Data | Modbus TCP | Leak alarm (FWS underfloor) | → Out | SL-T 2 |
### 9.4 P&ID Instrument Loops
- **Loop L-09.1 (Chilled Water Supply Temperature Control):** TT-FWS-01 (7°C setpoint) → CHL-CTL-A → chiller compressor speed modulation via OptiView PID loop → maintain evaporator leaving water at 7 ± 0.5°C.
- **Loop L-09.2 (Pump Differential Pressure Control):** PT-FWS-01 → BMS DDC-01 PID loop → PMP-VFD-01 speed signal → CHW-PMP-01 speed → maintain system ΔP at remote header ≥1.5 bar.
- **Loop L-09.3 (Isolation on Chiller Fault):** CHL-CTL-A alarm → BMS-SRV command → FCV-FWS-01 close (chiller isolation) → standby chiller FCV opens → N+1 maintained.
- **Loop L-09.4 (Legionella / Water Treatment):** WTS-PLC-01 timer + conductivity probe → dosing pump command → biocide injection into condenser loop.
### 9.5 MOR, FMECA & Hazard Log
| Attribute | Detail |
|-----------|--------|
| **MOR** | ≥N+1 chillers; CHW supply ≤14°C; N+1 primary CHW pumps; water treatment dosing continuous |
| **FMECA Category** | Category I — Catastrophic (total chiller loss → IT thermal trip within minutes)[3] |
| **Hazard Log** | Refrigerant release (R-1234ze, R-134a); Legionella (cooling tower); condensing loop failure → chiller high-pressure trip; VFD firmware corruption halting CHW flow[1] |
| **Downtime Cost** | ~$5.0M per hour (throttled to $12.5M on full loss)[1] |
| **SIL / SL-T** | SIL 1 (chiller high-pressure protection); SL-T 2[1][2] |

***
## System 10: Technology Cooling System (TCS) — CDU & Secondary Loop
### 10.1 System Purpose & P&ID Boundary
Isolated secondary liquid cooling loop for direct-to-chip (D2C) GPU/CPU cold plates. CDU provides liquid-to-liquid heat exchange between FWS primary loop (7°C facility water) and TCS secondary loop (32°C supply to servers, 40°C return). Boundary: CDU facility-side inlet (from FWS) → BPHE → CDU secondary outlet → rack supply manifold → cold plates → rack return manifold → CDU secondary inlet.[2][3]
### 10.2 Equipment Register
| P&ID Tag | Description | Manufacturer | Model | OS / Firmware | IEC 62443 Zone |
|----------|-------------|-------------|-------|---------------|----------------|
| CDU-01 | Liquid-to-Liquid Coolant Distribution Unit (CHx2000, 150 kW) | CoolIT Systems | CHx2000 Platform | Hardened Linux | Zone 1: BMS/HVAC (SL-T 3)[1][2] |
| CDU-PLC-01 | CDU Onboard Process Logic Controller | Emerson (GE Vernova) | RX3i PACSystems | VxWorks RTOS | Zone 1: BMS/HVAC (SL-T 3)[1][2] |
| BPHE-01 | Brazed Plate Heat Exchanger (inside CDU) | Alfa Laval | CB Series | N/A — passive | N/A (mechanical) |
| TCS-PMP-01 | TCS Secondary In-Line Pump, N+1 | Xylem (Bell & Gossett) | e-1510 Series | Modbus RTU | Zone 3: Field (SL-T 2)[2] |
| TCS-VFD-01 | TCS Pump VFD | Danfoss | VLT FlowDrive FC111 | BACnet/IP, Modbus TCP | Zone 1: BMS/HVAC (SL-T 3)[2] |
| TT-TCS-01 | Secondary Loop Supply Temperature Transmitter | Emerson (Rosemount) | 3144P | 4–20 mA / HART | Zone 3: Field |
| TT-TCS-02 | Secondary Loop Return Temperature Transmitter | Emerson (Rosemount) | 3144P | 4–20 mA / HART | Zone 3: Field |
| DPT-TCS-01 | TCS Remote Differential Pressure Transmitter | Yokogawa | EJX110A | 4–20 mA / HART | Zone 3: Field (SL-T 2)[2] |
| FCV-TCS-01 | TCS Primary-Side Facility Water Control Valve | Belimo | EV Series | BACnet MS/TP | Zone 3: Field (SL-T 2) |
| LEK-DET-01 | Conductive Leak Detection Sensing Cable (per rack) | TraceTek | TT1000 Series | Relay contacts | Zone 3: Field[2] |
| LEK-CTL-01 | Leak Detection Panel Controller | RLE Technologies | SeaHawk LD1500 | Modbus TCP, SNMP | Zone 1: BMS/HVAC (SL-T 2)[2] |
| MNF-SUPP | Rack Supply Manifold with isolation valves | CoolIT / Stäubli | OCP UQD v2.0 compatible | N/A — mechanical | N/A |
| MNF-RETN | Rack Return Manifold | CoolIT / Stäubli | OCP UQD v2.0 compatible | N/A — mechanical | N/A |
| WTS-PLC-02 | TCS Water Treatment & DI Monitoring PLC | Siemens | SIMATIC S7-1200 | Siemens proprietary | Zone 1: BMS/HVAC (SL-T 2)[2] |
### 10.3 Interface Control Table — System 10
| ICD-ID | From Tag | To Tag | Type | Medium / Protocol | Signal / Parameter | Direction | Safety Class |
|--------|----------|--------|------|-------------------|--------------------|-----------|-------------|
| ICD-10.01 | FWS header (SYS-9) | BPHE-01 (facility side inlet) | [F] Fluid | Chilled water, 7°C, 4–6 bar, DN80 | Primary side CHW supply to BPHE | In → | N/A |
| ICD-10.02 | BPHE-01 (facility side outlet) | FWS return header (SYS-9) | [F] Fluid | Chilled water, 12°C return, DN80 | Primary side CHW return to chiller | → Out | N/A |
| ICD-10.03 | FCV-TCS-01 | BPHE-01 (primary inlet) | [F]+[D] | Fluid modulation + BACnet signal | Primary flow rate control | Bi-dir | SL-T 2 |
| ICD-10.04 | BPHE-01 (secondary side outlet) | TCS-PMP-01 | [F] Fluid | PG25 glycol/water, 32°C, 3–4 bar | Secondary TCS supply to pump suction | → Out | N/A |
| ICD-10.05 | TCS-PMP-01 | MNF-SUPP (rack supply manifold) | [F] Fluid | PG25, 32°C, DN50, dripless UQD compatible | Secondary coolant to server rack supply | → Out | N/A |
| ICD-10.06 | MNF-SUPP | Cold Plates (SYS-11) | [F] Fluid | PG25 at 32°C, OCP UQD v2.0 dripless | Coolant supply to GPU/CPU cold plates | → Out | N/A |
| ICD-10.07 | Cold Plates (SYS-11) | MNF-RETN | [F] Fluid | PG25 at 40°C return, OCP UQD v2.0 | Heated coolant return from servers | → Out | N/A |
| ICD-10.08 | MNF-RETN | BPHE-01 (secondary side inlet) | [F] Fluid | PG25, 40°C, DN50 | Secondary TCS return to BPHE | → Out | N/A |
| ICD-10.09 | TT-TCS-01 | CDU-PLC-01 | [D] Analogue | 4–20 mA HART | Secondary supply temperature | → Out | SIL 2 |
| ICD-10.10 | TT-TCS-02 | CDU-PLC-01 | [D] Analogue | 4–20 mA HART | Secondary return temperature | → Out | SIL 2 |
| ICD-10.11 | DPT-TCS-01 | CDU-PLC-01 / TCS-VFD-01 | [D] Analogue | 4–20 mA HART | Remote differential pressure feedback | → Out | SIL 2 |
| ICD-10.12 | CDU-PLC-01 | TCS-VFD-01 | [D] Data | Modbus TCP / BACnet/IP | Pump speed setpoint | → Out | SL-T 3 |
| ICD-10.13 | TCS-VFD-01 | TCS-PMP-01 (motor) | [E] Electrical | VFD output 0–415 V, 0–50 Hz | Motor drive (variable speed) | → Out | N/A |
| ICD-10.14 | CDU-PLC-01 | BMS-SRV (SYS-12) | [D] Data | Modbus TCP / BACnet/IP | CDU status, temperatures, flow, alarms | → Out | SL-T 3 |
| ICD-10.15 | CDU-01 | DCIM Environet (SYS-13) | [D] Data | Redfish API / SNMP v3 | CDU telemetry, predictive maintenance data | → Out | SL-T 3 |
| ICD-10.16 | LEK-DET-01 | LEK-CTL-01 | [D]+[S] | Relay contact (sense wire resistance) | Coolant leak at rack base → alarm | → Out | SIL 2 |
| ICD-10.17 | LEK-CTL-01 | FCV-TCS-01 (isolation) | [S] Safety | Modbus TCP + hardwired relay backup | Close rack manifold isolation valve on leak | → Out | SIL 2 |
| ICD-10.18 | LEK-CTL-01 | BMS-SRV (SYS-12) | [D] Data | Modbus TCP | Leak alarm | → Out | SL-T 2 |
| ICD-10.19 | WTS-PLC-02 | Chemical dosing pump (DI polisher) | [F]+[D] | Peristaltic dosing + PROFINET | Conductivity / pH / DI quality control | → Out | SL-T 2 |
### 10.4 MOR, FMECA & Hazard Log
| Attribute | Detail |
|-----------|--------|
| **MOR** | ≥N+1 CDU pumps; secondary supply ≤18°C; leak detection armed; DI conductivity <1 µS/cm |
| **FMECA Category** | Category I — Catastrophic (CDU pump stop → GPU thermal trip in 45–60 s)[1][3] |
| **Hazard Log** | Coolant leak onto IT hardware (electrical short); pump cavitation; PLC firmware bricking via network; DPT manipulation causing low-flow condition; coordinated ransomware disabling all CDUs simultaneously[1] |
| **Downtime Cost** | ~$12.5M per hour[1] |
| **SIL / SL-T** | SIL 2 (leak isolation, thermal runaway prevention); SL-T 3[1][2] |

***
## System 11: Compute Rack — Representative Sample (RCK-01)
### 11.1 System Purpose & P&ID Boundary
Single OCP Open Rack v3 (ORv3) or equivalent 48U cabinet representing the IT compute layer. Contains GPU/AI compute nodes with direct-to-chip liquid cooling (cold plates + OCP UQD manifolds) and dual-feed rPDUs. Boundary: Rack cabinet → IT equipment → cold plate manifolds → rPDU outlets → network patch panel.[2][3]
### 11.2 Equipment Register
| P&ID Tag | Description | Manufacturer | Model | OS / Firmware | IEC 62443 Zone |
|----------|-------------|-------------|-------|---------------|----------------|
| RCK-01 | 42U/48U IT Cabinet | Vertiv | VR Rack 42U | N/A — passive | Zone 0 (Enterprise IT) |
| GPU-SRV-01 | GPU AI Server Node | NVIDIA | DGX H100 / DGX B200 | Linux (Ubuntu HPC) | Zone 0: IT Compute |
| CPU-SRV-01 | General Purpose CPU Server | Dell | PowerEdge R760 | Linux / Windows Server | Zone 0: IT Compute |
| BMC-01 | Baseboard Management Controller | ASPEED | AST2600 | OpenBMC / proprietary | Zone 1: Server Mgmt (SL-T 3)[1] |
| COLD-PLATE-01 | GPU Direct-to-Chip Cold Plate | CoolIT Systems | Split-Flow D2C Microfluidic | N/A — passive mechanical | N/A [2] |
| QD-01 | Dripless Quick Disconnect Coupling (OCP UQD v2.0) | CPC (Colder Products) | OCP UQD v2.0 | N/A — mechanical | N/A[2] |
| rPDU-A / rPDU-B | Dual Rack PDUs (A+B feeds) | Raritan (Legrand) | PX4 Switched | Embedded firmware | Zone 2: Electrical (SL-T 3)[2] |
| ToR-SW-A | Top-of-Rack Switch (A) | Arista | 7050X4 (64×100G) | EOS (Linux) | Zone 0: IT Network (SL-T 3) |
| ToR-SW-B | Top-of-Rack Switch (B) | Arista | 7050X4 (64×100G) | EOS (Linux) | Zone 0: IT Network (SL-T 3) |
| OOB-TAP-01 | Serial Console Tap (OOB access per rack) | Vertiv | Avocent ACS 8000 port | Linux | Zone 1: Server Mgmt (SL-T 3) |
### 11.3 Interface Control Table — System 11
| ICD-ID | From Tag | To Tag | Type | Medium / Protocol | Signal / Parameter | Direction | Safety Class |
|--------|----------|--------|------|-------------------|--------------------|-----------|-------------|
| ICD-11.01 | rPDU-A (outlet) | GPU-SRV-01 / CPU-SRV-01 (power inlet A) | [E] Electrical | C19/C20 IEC 320, 240 V AC | Primary power feed | → Out | N/A |
| ICD-11.02 | rPDU-B (outlet) | GPU-SRV-01 / CPU-SRV-01 (power inlet B) | [E] Electrical | C19/C20 IEC 320, 240 V AC | Redundant power feed | → Out | N/A |
| ICD-11.03 | MNF-SUPP (SYS-10) | QD-01 (supply side) | [F] Fluid | PG25 glycol/water, 32°C, OCP UQD v2.0 dripless | Secondary coolant supply | In → | N/A |
| ICD-11.04 | QD-01 (supply) | COLD-PLATE-01 (inlet) | [F] Fluid | PG25, 32°C, integrated microfluidic channels | Coolant to processor cold plate | → Out | N/A |
| ICD-11.05 | COLD-PLATE-01 (outlet) | QD-01 (return side) | [F] Fluid | PG25, 38–42°C, return | Heated coolant from processor | → Out | N/A |
| ICD-11.06 | QD-01 (return) | MNF-RETN (SYS-10) | [F] Fluid | PG25, 40°C return, OCP UQD v2.0 | Return to CDU BPHE | → Out | N/A |
| ICD-11.07 | GPU-SRV-01 (NIC) | ToR-SW-A / ToR-SW-B | [D] Data | 100GbE / 400GbE (OSFP/QSFP-DD) | Data plane traffic | Bi-dir | N/A |
| ICD-11.08 | BMC-01 | OOB-TAP-01 / ACS 8000 (SYS-15) | [D] Data | IPMI RMCP+ / Redfish API over dedicated mgmt network | BMC console access | Bi-dir | SL-T 3 |
| ICD-11.09 | rPDU-A / rPDU-B | DCIM Environet (SYS-13) | [D] Data | SNMP v3 / Modbus TCP | Outlet current, kW, kWh, outlet state | → Out | SL-T 3 |
| ICD-11.10 | LEK-DET-01 (SYS-10) | Rack drip tray | [D]+[S] | TraceTek TT1000 sense wire in drip tray | Coolant leak at rack base | → Out | SIL 2 |
| ICD-11.11 | GPU-SRV-01 (NVLink/InfiniBand) | Adjacent GPU servers | [D] Data | NVIDIA NVLink / InfiniBand HDR/NDR | GPU-to-GPU interconnect | Bi-dir | N/A |

***
## System 12: Building Management System (BMS) & DCS Integration
### 12.1 System Purpose & P&ID Boundary
Supervisory control, monitoring, and automation of all facility mechanical systems (HVAC, cooling, power). Acts as the integration layer between field devices (Zone 3) and enterprise/DCIM platforms (Zone 0). Boundary: All DDC/PLC field I/O → BMS server → DCIM integration bus → enterprise systems.[1][2][3]
### 12.2 Equipment Register
| P&ID Tag | Description | Manufacturer | Model | OS / Firmware | IEC 62443 Zone |
|----------|-------------|-------------|-------|---------------|----------------|
| BMS-SRV | BMS Supervisory Server Platform | Honeywell | Niagara Framework / EBI (Enterprise Buildings Integrator) | Windows Server / Linux | Zone 1: BMS/HVAC (SL-T 3)[1][2] |
| DDC-01 | Direct Digital Field Controller | Saia-Burgess (Honeywell) | PCD3.M6893 QronoX | Proprietary certified firmware | Zone 1: BMS/HVAC (SL-T 3)[2] |
| GTW-01 | Protocol Gateway / Conduit Device (BACnet ↔ Modbus ↔ OPC UA) | Loytec | L-GATE Series | Embedded Linux | Zone Boundary: Conduit C0-1[2] |
| OT-SW-01 | Managed Industrial Ethernet Switch (OT Backbone) | Moxa | TN-4900 Series | Moxa hardened firmware | Zone 1: Backbone (SL-T 3)[2] |
| OT-FW-01 | Next-Gen Industrial Security Firewall (ISASecure CSA-3 certified) | Moxa | EDR-G9010 | Moxa hardened firmware | Conduit Boundary (SL-T 3)[1][2] |
| SCADA-HMI | BMS Operator HMI Workstation | Dell / Advantech | HMI Server + Touch displays | Windows 10 LTSC | Zone 1: BMS/HVAC |
| OPC-UA-GW | OPC UA Server / Gateway to DCIM | Kepware (PTC) | KEPServerEX | Windows | Zone Boundary |
### 12.3 Interface Control Table — System 12
| ICD-ID | From Tag | To Tag | Type | Medium / Protocol | Signal / Parameter | Direction | Safety Class |
|--------|----------|--------|------|-------------------|--------------------|-----------|-------------|
| ICD-12.01 | DDC-01 (field I/O) | CHL-CTL-A (SYS-9), CDU-PLC-01 (SYS-10), FCV-FWS-01 | [D] Data | BACnet/IP + Modbus TCP | Setpoints, commands, status | Bi-dir | SL-T 2–3 |
| ICD-12.02 | BMS-SRV | DDC-01 | [D] Data | BACnet/SC (Secure Connect) over OT LAN | Supervisory setpoints, trends | Bi-dir | SL-T 3 |
| ICD-12.03 | GTW-01 | BMS-SRV | [D] Data | BACnet/IP → OPC UA translation | Protocol translation for legacy devices | Bi-dir | SL-T 3 |
| ICD-12.04 | OT-FW-01 | Zone 0 (DCIM/IT) | [D] Data | DPI-filtered HTTPS / REST API | Telemetry export to DCIM (read-only) | → Out | SL-T 3 |
| ICD-12.05 | BMS-SRV | FACP-01 (SYS-16) | [D] Data | BACnet/IP (monitoring only — no write path) | Fire alarm status (read only) | In → | SL-T 3 / SIL 3 |
| ICD-12.06 | BMS-SRV | AHU / HVAC systems | [D]+[A] Data+Control | BACnet/IP | Damper position, fan speed, temperature setpoints | Bi-dir | SL-T 2 |
| ICD-12.07 | BMS-SRV | EPMS-SRV (SYS-1) | [D] Data | OPC UA / Modbus TCP | Power quality telemetry, energy data | In → | SL-T 3 |
| ICD-12.08 | BMS-SRV | DCIM Environet (SYS-13) | [D] Data | REST API / OPC UA | All BMS trends, alarms, setpoints | → Out | SL-T 3 |
| ICD-12.09 | OPC-UA-GW | Enterprise SIEM (SYS-14) | [D] Data | TLS/HTTPS OPC UA | OT telemetry (read-only, data diode enforced) | → Out | SL-T 3 |
### 12.4 MOR, FMECA & Hazard Log
| Attribute | Detail |
|-----------|--------|
| **MOR** | ≥1 BMS server active; all safety I/O polled ≤5 s; BMS VLAN isolated from enterprise IT |
| **FMECA Category** | Category I — Catastrophic (BMS compromise enables global setpoint manipulation → facility-wide trip)[1][3] |
| **Hazard Log** | Exploitation of unpatched RCE (Niagara CVE, CVSS 9.8); BMS-to-FACP bridge abuse triggering false suppression; unauthorized write to cooling setpoints via Modbus[1] |
| **Downtime Cost** | ~$12.5M per hour[1] |
| **SIL / SL-T** | BMS supervisory not SIL-rated; safety I/O functions SIL 1; SL-T 3[1][2] |

***
## System 13: DCIM — Vertiv Environet & Next Predict
### 13.1 System Purpose & P&ID Boundary
Centralized Data Center Infrastructure Management (DCIM) providing real-time power, thermal, and asset visibility across the entire facility. Next Predict adds AI-based predictive maintenance on top of Environet telemetry. Boundary: All SNMP/BACnet/Modbus endpoints → Environet collectors → DCIM dashboard → Next Predict cloud API.[4][5][6][7][8]
### 13.2 Equipment Register
| P&ID Tag | Description | Manufacturer | Model | IEC 62443 Zone |
|----------|-------------|-------------|-------|----------------|
| DCIM-SRV | DCIM Application Server (Active-Standby) | Vertiv | Geist Environet Enterprise | Zone 1 / Zone 0 boundary |
| DCIM-COL | DCIM Protocol Collector (Modbus/SNMP/BACnet aggregation) | Vertiv | Geist Environet Gateway | Zone 1 (SL-T 2) |
| NXT-PRED | AI-Powered Predictive Maintenance Service | Vertiv | Next Predict (SaaS, cloud) | Cloud (dedicated API channel) |
| ENV-SEN-01 | Environmental Sensor Hub (T/H per row) | Vertiv | Geist SHD | Zone 1 (SL-T 2) |
### 13.3 Interface Control Table — System 13
| ICD-ID | From Tag | To Tag | Type | Medium / Protocol | Signal / Parameter | Direction | Safety Class |
|--------|----------|--------|------|-------------------|--------------------|-----------|-------------|
| ICD-13.01 | rPDU-A/B, UPS NMC, BESS EMS | DCIM-COL | [D] Data | SNMP v3 / Modbus TCP | Power, kWh, outlet, battery status | In → | SL-T 2–3 |
| ICD-13.02 | CHL-CTL-A, CDU-PLC-01, CRAH | DCIM-COL | [D] Data | BACnet/IP / Modbus TCP | Cooling performance, temperatures, flow | In → | SL-T 2 |
| ICD-13.03 | ENV-SEN-01 | DCIM-SRV | [D] Data | SNMP v3 | Rack inlet temperature, humidity | In → | SL-T 2 |
| ICD-13.04 | DCIM-SRV | NXT-PRED (cloud) | [D] Data | HTTPS REST API (outbound only, TLS 1.3) | Equipment telemetry for ML analysis | → Out | SL-T 3 |
| ICD-13.05 | NXT-PRED (cloud) | DCIM-SRV | [D] Data | HTTPS REST API | Predictive alerts, remaining useful life | In → | SL-T 3 |
| ICD-13.06 | DCIM-SRV | Enterprise NOC / SIEM | [D] Data | REST API / SNMP traps / Syslog | Alarms, capacity utilization | → Out | SL-T 3 |
| ICD-13.07 | DCIM-SRV | BMS-SRV (SYS-12) | [D] Data | REST API / OPC UA | Capacity planning, fault correlation | Bi-dir | SL-T 3 |

***
## System 14: Network Fabric — Spine-Leaf & Firewalls
### 14.1 System Purpose & P&ID Boundary
Two-tier Clos spine-leaf IP fabric for data-plane east-west traffic. Perimeter firewalls provide north-south segmentation. OT network (BMS/DCIM) is isolated by Moxa industrial firewalls. Boundary: ToR switches per rack → leaf switches → spine switches → border firewalls → internet peering / cloud interconnect.[1][2][3]
### 14.2 Equipment Register
| P&ID Tag | Description | Manufacturer | Model | OS | IEC 62443 Zone |
|----------|-------------|-------------|-------|----|----------------|
| SPINE-01/02 | Spine Switch, 400GbE | Arista | 7800R4 | EOS | Zone 0: IT Fabric |
| LEAF-01 | Leaf Switch, 100GbE | Arista | 7050X4 | EOS | Zone 0: IT Fabric |
| ToR-SW-A/B | Top-of-Rack Switch, 100GbE | Arista | 7060X5 | EOS | Zone 0: IT Fabric |
| FW-01/02 | Perimeter NGFW (HA pair) | Palo Alto Networks | PA-7000 Series | PAN-OS | Zone 0/1 Boundary (SL-T 3) |
| OT-FW-01 | Industrial OT Firewall (ISASecure CSA-3) | Moxa | EDR-G9010 | Moxa firmware | Conduit Boundary (SL-T 3)[1][2] |
| OT-SW-01 | Industrial OT Managed Switch | Moxa | TN-4900 | Moxa firmware | Zone 1: OT Backbone (SL-T 3)[2] |
| BGP-RR-01 | BGP Route Reflector | Arista | 7500R3 | EOS | Zone 0: IT Fabric |
### 14.3 Interface Control Table — System 14
| ICD-ID | From Tag | To Tag | Type | Medium / Protocol | Signal / Parameter | Direction | Safety Class |
|--------|----------|--------|------|-------------------|--------------------|-----------|-------------|
| ICD-14.01 | GPU-SRV (SYS-11) | ToR-SW-A/B | [D] Data | 100GbE/400GbE fiber/DAC | Data plane, training traffic | Bi-dir | N/A |
| ICD-14.02 | ToR-SW-A/B | LEAF-01 | [D] Data | 100GbE ECMP uplinks | East-west aggregation | Bi-dir | N/A |
| ICD-14.03 | LEAF-01 | SPINE-01/02 | [D] Data | 400GbE ECMP | Spine uplinks | Bi-dir | N/A |
| ICD-14.04 | SPINE-01/02 | FW-01/02 | [D] Data | 400GbE | North-south traffic to perimeter | Bi-dir | N/A |
| ICD-14.05 | FW-01/02 | Internet / Cloud | [D] Data | BGP, 100GbE WAN | Internet peering, cloud access | Bi-dir | N/A |
| ICD-14.06 | OT-FW-01 | BMS-SRV (SYS-12) | [D] Data | DPI-filtered BACnet/Modbus TCP | OT protocol with write control | Bi-dir | SL-T 3 |
| ICD-14.07 | OT-SW-01 | DDC-01, CDU-PLC-01 | [D] Data | Modbus TCP / BACnet/IP over OT VLAN | Field device management | Bi-dir | SL-T 3 |
| ICD-14.08 | FW-01/02 | SIEM | [D] Data | Syslog TLS / SNMP | Security event logs, telemetry | → Out | SL-T 3 |
| ICD-14.09 | Spine-Leaf fabric | gNMI/SNMP collector | [D] Data | gNMI streaming / SNMP v3 | Interface counters, BGP state, errors | → Out | N/A |

***
## System 15: Out-of-Band (OOB) Management — KVM & Serial Console
### 15.1 System Purpose & P&ID Boundary
Dedicated out-of-band management plane providing serial console and KVM-over-IP access to all servers, switches, and infrastructure equipment when the primary network is unavailable. Boundary: Dedicated OOB Ethernet switch → ACS 8000 console servers → serial ports of all managed devices; KVM-over-IP → server video/keyboard/mouse.[9][10][11][12]
### 15.2 Equipment Register
| P&ID Tag | Description | Manufacturer | Model | OS | IEC 62443 Zone |
|----------|-------------|-------------|-------|----|----------------|
| OOB-SRV | OOB Management Server | Dell | PowerEdge R660 (dedicated) | Linux | Zone 1: Server Mgmt |
| ACS-01 | Advanced Console Server, 48-port serial | Vertiv | Avocent ACS 8000 (48-port) | Linux | Zone 1: Server Mgmt (SL-T 3)[2] |
| KVM-01 | KVM-over-IP Switch (4K, NIAP PP 4.0) | Raritan | Dominion KX IV-101 | Embedded firmware | Zone 1: Server Mgmt (SL-T 3)[11][2] |
| OOB-SW-01 | OOB Dedicated Ethernet Switch (isolated VLAN) | Cisco | Catalyst 9200 | IOS-XE | Zone 1: Mgmt VLAN |
| OOB-CELL | Cellular 4G/5G Failover Modem | Cradlepoint | E3000 Series | RouterOS | Zone 1: OOB (SL-T 2) |
### 15.3 Interface Control Table — System 15
| ICD-ID | From Tag | To Tag | Type | Medium / Protocol | Signal / Parameter | Direction | Safety Class |
|--------|----------|--------|------|-------------------|--------------------|-----------|-------------|
| ICD-15.01 | BMC-01 (SYS-11) | ACS-01 (serial port) | [D] Data | RS-232 / RJ45 serial, 9600–115200 baud | BIOS/BMC console serial stream | Bi-dir | SL-T 3 |
| ICD-15.02 | Network switches, PDUs, BMS controllers | ACS-01 (serial ports) | [D] Data | RS-232/RJ45 | Device console access | Bi-dir | SL-T 3 |
| ICD-15.03 | ACS-01 | OOB-SW-01 | [D] Data | Ethernet / SSH / HTTPS | OOB network connectivity | Bi-dir | SL-T 3 |
| ICD-15.04 | OOB-CELL | OOB-SW-01 | [D] Data | 4G LTE / 5G cellular | WAN failover for OOB plane | Bi-dir | SL-T 2 |
| ICD-15.05 | KVM-01 | GPU-SRV / CPU-SRV (video+USB) | [D]+[E] | HDMI/DP video + USB KVM | Server video, keyboard, mouse | Bi-dir | SL-T 3 |
| ICD-15.06 | OOB-SRV | ACS-01 / KVM-01 | [D] Data | HTTPS / SSH (management API) | Session management, audit log | Bi-dir | SL-T 3 |

***
## System 16: Fire Detection, Alarm & Suppression
### 16.1 System Purpose & P&ID Boundary
Multi-layer fire detection (VESDA aspirating + conventional detectors) → FACP → two-zone cross-confirmation → clean agent suppression (Novec 1230). EPO integrated. Boundary: Smoke detectors / VESDA throughout data halls and electrical rooms → FACP → suppression release → agent distribution nozzles. All safety-hardwired; BMS receives alarm status read-only.[1][2][3]
### 16.2 Equipment Register
| P&ID Tag | Description | Manufacturer | Model | OS / Firmware | IEC 62443 Zone |
|----------|-------------|-------------|-------|---------------|----------------|
| ASD-01 | Aspirating Smoke Detector (VESDA-E), per zone | Honeywell (Xtralis) | VESDA-E VEP | Proprietary certified | Zone 3: Safety (SL-T 3)[1][2] |
| SD-01 | Conventional Photoelectric Smoke Detector | Hochiki | ESP-R/LED | N/A — analogue | Zone 3: Safety |
| FACP-01 | Fire Alarm Control Panel (dual SLC loop) | Honeywell | XLS3000 (Notifier) | Proprietary Certified RTOS | Zone 3: Safety (SL-T 3)[1][2] |
| FSC-01 | Fire Suppression Actuation Controller | Fike | Cheetah Xi | Proprietary SLC | Zone 3: Safety (SL-T 3)[2] |
| CLN-AGT-01 | Clean Agent Cylinder (Novec 1230 / FK-5-1-12) | Fike / Kidde | Novec 1230 System | Hardwired solenoids | Zone 3: Safety (SL-T 3)[2] |
| DISCH-NOZ | Discharge Nozzle Array | Fike / Kidde | Agent distribution nozzles | N/A — mechanical | N/A |
| EPO-BTN-01 | Emergency Power Off Push Button | Schneider Electric | Harmony XB5 (key-switch + dual break) | N/A — hardwired | Zone 2: Electrical (SL-T 4)[1][2] |
| ABT-BTN-01 | Abort Switch (pre-discharge inhibit) | Mircom | Per-zone abort station | N/A — hardwired | Zone 3: Safety |
| HORN-STR-01 | Audible/Visual Notification Appliance | System Sensor | SPSCW (strobe + sounder) | N/A — passive | Zone 3: Safety |
| BESS-FSD | BESS-Specific Li-ion Suppression (SYS-7) | Carrier / Kidde | Aritech Li-ion suppression | Hardwired | Zone 3: Safety (SL-T 4) |
| GAS-DET-01 | CO₂ / Off-gas Detector (Battery / Generator rooms) | MSA Safety | ULTIMA XE / Chillgard | 4–20 mA | Zone 3: Safety |
### 16.3 Interface Control Table — System 16
| ICD-ID | From Tag | To Tag | Type | Medium / Protocol | Signal / Parameter | Direction | Safety Class |
|--------|----------|--------|------|-------------------|--------------------|-----------|-------------|
| ICD-16.01 | ASD-01 (VESDA sampler) | Air samples in data hall | [A] Air | Capillary tubes — negative pressure sample | Aspirated air sample to detector | In → | SIL 2 |
| ICD-16.02 | ASD-01 | FACP-01 | [D]+[S] | RS-485 SLC loop + hardwired alarm contact | Smoke concentration alarm (4 alarm levels) | → Out | SIL 2 |
| ICD-16.03 | SD-01 | FACP-01 | [D]+[S] | 2-wire SLC loop | Smoke alarm contact | → Out | SIL 2 |
| ICD-16.04 | FACP-01 (cross-zone confirm) | FSC-01 | [S] Safety | Hardwired relay (dry contact) | Two-zone confirmed alarm → suppression arm | → Out | SIL 3 |
| ICD-16.05 | FSC-01 | CLN-AGT-01 (solenoid) | [S] Safety | 24 VDC hardwired solenoid circuit | Suppression discharge command | → Out | SIL 3 |
| ICD-16.06 | CLN-AGT-01 | DISCH-NOZ | [F] Fluid/Gas | High-pressure Novec 1230 agent, 42 bar discharge | Agent distribution to protected zone | → Out | N/A |
| ICD-16.07 | ABT-BTN-01 | FSC-01 | [S] Safety | Hardwired abort input | Pre-discharge inhibit (30 s delay) | → Out | SIL 3 |
| ICD-16.08 | FACP-01 | EPO-BTN-01 circuit | [S] Safety | Hardwired relay interlock | Fire confirmed → EPO initiation (optional per design) | → Out | SIL 3 |
| ICD-16.09 | EPO-BTN-01 | LV-SWG-01 (SYS-6) / UPS (SYS-3) shunt trips | [S] Safety | Hardwired 48 VDC supervised loop | Emergency de-energization of data hall | → Out | SIL 3 |
| ICD-16.10 | HORN-STR-01 | FACP-01 (NAC circuit) | [S] Safety | 24 VDC notification appliance circuit (NAC) | Alarm sounder + strobe activation | → Out | SIL 2 |
| ICD-16.11 | FACP-01 | BMS-SRV (SYS-12) | [D] Data | BACnet/IP (read-only, monitoring) | Fire alarm zone status (no write path from BMS) | → Out | SL-T 3 |
| ICD-16.12 | GAS-DET-01 | FACP-01 / BMS-SRV | [D]+[S] | 4–20 mA → hardwired relay threshold | CO₂/off-gas concentration alarm | → Out | SIL 2 |
| ICD-16.13 | BESS-FSD (SYS-7) | FACP-01 | [S] Safety | Hardwired alarm contact | BESS suppression status / activation | → Out | SIL 3 |
### 16.4 MOR, FMECA & Hazard Log
| Attribute | Detail |
|-----------|--------|
| **MOR** | All VESDA detectors sampling; FACP armed all zones; suppression cylinders charged; EPO circuit supervise-enabled |
| **FMECA Category** | Category I — Catastrophic (FACP failure → undetected fire; false suppression → compute loss + O₂ hazard)[1][3] |
| **Hazard Log** | Undetected incipient fire; false suppression discharge (O₂ asphyxiation hazard in sealed room); BMS-to-FACP network bridge exploited to inject false confirmation codes triggering suppression and EPO; Li-ion thermal runaway off-gas (HF)[1] |
| **Downtime Cost** | ~$12.5M per hour[1] |
| **SIL / SL-T** | SIL 3 (suppression release / EPO); SL-T 3[1][2] |

***
## System 17: Physical Security — CCTV, Access Control & Perimeter
### 17.1 System Purpose & P&ID Boundary
Multi-layer electronic physical security: perimeter detection → mantrap access control → CCTV surveillance → alarm management. All critical zone access requires multi-factor authentication. Boundary: Perimeter PIDS sensors → access control panels → door hardware → biometric readers → CCTV cameras → VMS server → security operations center (SOC).[1][2][3]
### 17.2 Equipment Register
| P&ID Tag | Description | Manufacturer | Model | OS | IEC 62443 Zone |
|----------|-------------|-------------|-------|----|----------------|
| CCTV-CAM-01 | 4K IP Dome Camera (AI analytics) | Avigilon / Hanwha | H6A PTZ / QNV-8080R | Axis OS / Embedded Linux | Zone 5: Physical Security (SL-T 2)[1] |
| CCTV-PTZ-01 | PTZ Network Camera (perimeter) | Axis Communications | Q6135-LE | Axis OS | Zone 5: Physical Security (SL-T 2) |
| VMS-SRV | Video Management Server | Genetec | Security Center | Windows Server | Zone 5: Physical Security (SL-T 3) |
| PACS-SRV | Physical Access Control Server | Genetec | Synergis | Windows Server | Zone 5: Physical Security (SL-T 3)[2] |
| DOOR-CTL-01 | Switched Door / Aperio Controller | HID Global | Mercury LP1502 | Embedded Linux | Zone 3: Field Security (SL-T 3)[1][2] |
| READER-01 | Smart Card / Biometric Reader | HID Global | iCLASS SE / Suprema FaceStation 2 | Embedded firmware | Zone 3: Field Security |
| PIDS-01 | Perimeter Intrusion Detection (fiber fence) | Optex / Fiber Patrol | FD-525TF | Embedded | Zone 5: Perimeter (SL-T 2) |
| HVM-01 | Hostile Vehicle Mitigation Bollards | ATG Access | Shallow Foundation Rising Bollards | Hardwired control | Zone 5: Perimeter |
| NVR-01 | Network Video Recorder / Storage | Genetec | Archiver (integrated in VMS) | Windows | Zone 5: Physical Security |
| INTERCOM-01 | IP Video Intercom | 2N | IP Verso | Embedded Linux | Zone 5: Physical Security |
| ALARM-PNL | Intrusion Alarm Panel | Bosch | Solution 6000 | Embedded firmware | Zone 5: Physical Security (SL-T 3) |
### 17.3 Interface Control Table — System 17
| ICD-ID | From Tag | To Tag | Type | Medium / Protocol | Signal / Parameter | Direction | Safety Class |
|--------|----------|--------|------|-------------------|--------------------|-----------|-------------|
| ICD-17.01 | CCTV-CAM-01 / PTZ-01 | VMS-SRV / NVR-01 | [D] Data | ONVIF Profile S/G over HTTPS/TLS, IP/PoE | H.265 video stream, analytics metadata | → Out | SL-T 2 |
| ICD-17.02 | VMS-SRV | PACS-SRV | [D] Data | REST API / Genetec SDK | Video badging, camera linkage on access event | Bi-dir | SL-T 3 |
| ICD-17.03 | READER-01 | DOOR-CTL-01 | [D]+[M] | OSDP v2 Secure Channel (RS-485) | Credential data, biometric match | → Out | SL-T 3 |
| ICD-17.04 | DOOR-CTL-01 | Door lock / strike | [M]+[E] | Hardwired 12/24 VDC | Electric strike / maglok release | → Out | Fail-safe egress |
| ICD-17.05 | DOOR-CTL-01 | PACS-SRV | [D] Data | HTTPS / TLS over dedicated PACS VLAN | Access events, door state, alarms | Bi-dir | SL-T 3 |
| ICD-17.06 | PACS-SRV | Active Directory / LDAP | [D] Data | LDAPS | Credential synchronization | Bi-dir | SL-T 3 |
| ICD-17.07 | PIDS-01 | ALARM-PNL | [D]+[S] | Hardwired dry contact + IP Ethernet | Perimeter intrusion alarm | → Out | SL-T 2 |
| ICD-17.08 | ALARM-PNL | PACS-SRV / SOC | [D] Data | Modbus TCP / proprietary panel API | Intrusion alarm state | → Out | SL-T 3 |
| ICD-17.09 | HVM-01 (bollards) | PACS-SRV (vehicle control) | [D]+[M] | Hardwired control panel + PACS integration | Raise/lower bollards on access event | Bi-dir | N/A |
| ICD-17.10 | INTERCOM-01 | PACS-SRV / VMS | [D] Data | SIP / HTTPS | Visitor management, remote door release | Bi-dir | SL-T 2 |
| ICD-17.11 | VMS-SRV / PACS-SRV | SOC Dashboard | [D] Data | REST API / HTTPS | Unified security view | → Out | SL-T 3 |
| ICD-17.12 | CCTV-CAM-01 | DCIM Environet / BMS | [D] Data | ONVIF + REST API | Video analytics alarms (tailgating, smoke detection) | → Out | SL-T 2 |
### 17.4 MOR, FMECA & Hazard Log
| Attribute | Detail |
|-----------|--------|
| **MOR** | 100% perimeter and critical zone camera coverage; all access control panels battery-backed; PIDS active |
| **FMECA Category** | Category II — Critical (CCTV loss = security blind spots; ACS failure = physical access breach)[3] |
| **Hazard Log** | CCTV compromise (VAPIX CVE-2025-0324 privilege escalation → video stream access)[1]; Mercury LP1502 buffer overflow (CVE-2022-31481) → root shell → all mantraps unlocked[1]; PIDS defeat enabling physical access to MV switchgear or generators |
| **SIL / SL-T** | Not SIL-rated; SL-T 2–3[1][2] |

***
## System 18: HVAC — Computer Room, Electrical Room & Battery Room Ventilation
### 18.1 System Purpose & P&ID Boundary
General HVAC and critical ventilation for non-IT spaces: electrical switchgear rooms (minimum 35°C setpoint), battery rooms (H₂ dilution ventilation), generator rooms (combustion air + exhaust), and office/NOC spaces. Boundary: AHU inlet → filter → coil → supply fan → distribution ductwork → space → return/exhaust.[2][3]
### 18.2 Equipment Register
| P&ID Tag | Description | Manufacturer | Model | IEC 62443 Zone |
|----------|-------------|-------------|-------|----------------|
| AHU-EL-01 | Air Handling Unit — Electrical Room | Daikin / Carrier | VRF/VRV Series or AHU | Zone 1: BMS/HVAC |
| AHU-BAT-01 | Dedicated Battery Room Ventilation Fan (continuous) | Fantech / Systemair | Continuous extract fan | Zone 1: BMS/HVAC |
| AHU-GEN-01 | Generator Room Combustion Air / Exhaust Fan | Fantech / Wood Group | Louvred exhaust fan | Zone 1: BMS/HVAC |
| VFD-AHU-01 | VFD for AHU Supply Fan | Siemens | BT300 VFD | Zone 1: BMS/HVAC |
| DMPR-01 | Motorized Fire Damper (fusible link + actuator) | Belimo / Ruskin | BFD Series | SIL 1 / hardwired |
| TT-ROOM-01 | Room Temperature Sensor | Siemens | QAA2280.EWSN | Zone 1: BMS/HVAC |
| H2-DET-01 | Hydrogen Sensor (battery room) | MSA Safety | ULTIMA XE (H₂) | SIL 1 / 4–20 mA |
### 18.3 Interface Control Table — System 18
| ICD-ID | From Tag | To Tag | Type | Medium / Protocol | Signal / Parameter | Direction | Safety Class |
|--------|----------|--------|------|-------------------|--------------------|-----------|-------------|
| ICD-18.01 | AHU-EL-01 | Electrical room (supply air) | [A] Air | HVAC ductwork, 16–18°C | Supply air to switchgear room | → Out | N/A |
| ICD-18.02 | AHU-BAT-01 | Battery room (exhaust) | [A] Air | Exhaust ductwork, continuous 10+ ACH | H₂ dilution ventilation extract | → Out | SIL 1 |
| ICD-18.03 | AHU-GEN-01 | Generator room (combustion + exhaust) | [A] Air | Louvred vents + forced exhaust | Combustion air intake + exhaust gases | Bi-dir | N/A |
| ICD-18.04 | H2-DET-01 | AHU-BAT-01 (interlock) | [S] Safety | Hardwired relay (>25% LEL threshold) | H₂ alarm → max fan speed + alarm | → Out | SIL 1 |
| ICD-18.05 | TT-ROOM-01 | DDC-01 / BMS-SRV | [D] Analogue | BACnet MS/TP | Room temperature feedback | → Out | SL-T 2 |
| ICD-18.06 | VFD-AHU-01 | AHU supply fan (motor) | [E] Electrical | VFD 0–415 V | Variable speed drive | → Out | N/A |
| ICD-18.07 | BMS-SRV (SYS-12) | VFD-AHU-01 | [D] Data | BACnet/IP | Fan speed setpoint | → Out | SL-T 2 |
| ICD-18.08 | DMPR-01 | FACP-01 (SYS-16) | [S] Safety | Hardwired fail-safe actuator (24 VDC) | Fire damper release on FACP alarm | → Out | SIL 1 |
| ICD-18.09 | H2-DET-01 | FACP-01 / BMS-SRV | [D]+[S] | 4–20 mA → threshold relay | H₂ concentration alarm | → Out | SIL 1 |

***
## Appendix A: Connection Type Legend
| Code | Connection Type | Description |
|------|----------------|-------------|
| [F] | Fluid | Pipe/tube: chilled water, condenser water, diesel fuel, coolant (PG25), refrigerant, agent gas |
| [E] | Electrical / Energy | Power cables: HV/MV/LV AC, DC bus, low-voltage control wiring, UPS/PDU outlets |
| [D] | Data / Signal | Network (Ethernet, fiber), serial (RS-232/485), fieldbus (Modbus, BACnet, IEC 61850, CAN, PROFINET), analogue (4–20 mA, 0–10 V) |
| [A] | Air / Pneumatic | HVAC ductwork, supply/return/exhaust air, aspirating sample tubes, pneumatic actuators |
| [M] | Mechanical / Physical | Structural connections, quick-disconnect couplings (OCP UQD), rack rail, bolted connections |
| [S] | Safety-Hardwired | Direct-wired safety loops, trip coils, EPO circuits, SIL-rated interlocks — bypass all software |

***
## Appendix B: IEC 62443 Zone Summary
| Zone | Name | Systems | SL-T | Protocol Boundary |
|------|------|---------|------|-------------------|
| Zone 4 | Grid Substation | SYS-1 (MV switchgear, protection relays) | SL-T 4 | IEC 61850 GOOSE/MMS, PRP/HSR fiber |
| Zone 2 | Electrical / Power | SYS-3 UPS, SYS-4 ATS, SYS-7 BESS, SYS-8 PDU, EPO | SL-T 3 | SNMP v3, Modbus TCP, HTTPS — dedicated power VLAN |
| Zone 3 | Field (Mechanical + Safety) | SYS-2, 5, 9, 10 (field sensors/actuators), SYS-16 (fire) | SL-T 2–3 | Modbus RTU/TCP, BACnet MS/TP, hardwired I/O |
| Zone 1 | BMS / HVAC Process Control | SYS-9 CDU, SYS-12 BMS, SYS-13 DCIM, SYS-18 HVAC | SL-T 3 | BACnet/IP, Modbus TCP, OPC UA, HTTPS |
| Zone 0 | Enterprise IT / Compute | SYS-11 (servers), SYS-14 (fabric), SYS-15 (OOB) | SL-T 3 | Standard IT protocols — BGP, HTTPS, SNMP, gNMI |
| Zone 5 | Physical Security | SYS-17 (CCTV, ACS, PIDS) | SL-T 2–3 | ONVIF TLS, OSDP v2, HTTPS — dedicated security VLAN |
| Conduit C0-1 | OT/IT Boundary | Between Zone 0 and Zone 1 | SL-T 3 | Moxa EDR-G9010 DPI firewall + data diode for telemetry |

***
## Appendix C: SIL / Functional Safety Assignment Summary
| System | Safety Function | SIL | Standard | Hardwired Override |
|--------|----------------|-----|----------|--------------------|
| SYS-1: Substation | MV overcurrent trip, arc-flash trip | SIL 3 | IEC 61511 | Yes — direct trip coil |
| SYS-3: UPS | Bypass relay, Li-ion thermal | SIL 2 | IEC 61508 | Yes — hardwired bypass |
| SYS-4: ATS/STS | Transfer on utility failure | SIL 2 | IEC 61511 | Yes — contact interlock |
| SYS-7: BESS | Thermal runaway protection, off-gas | SIL 2 | IEC 61508 | Yes — hardwired relay |
| SYS-9: FWS | Chiller high-pressure protection | SIL 1 | IEC 61511 | Yes — refrigerant safety relief |
| SYS-10: TCS | Leak isolation valve | SIL 2 | IEC 61511 | Yes — hardwired relay + manual valve |
| SYS-16: Fire | Smoke detection, suppression release, EPO | SIL 3 | IEC 62061 / NFPA 72 | Yes — all hardwired, no software path |
| SYS-18: HVAC | Battery room H₂ ventilation, fire damper | SIL 1 | IEC 61511 | Yes — hardwired |

***

