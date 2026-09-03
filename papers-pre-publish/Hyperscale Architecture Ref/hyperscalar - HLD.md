An elegant and comprehensive **Bill of Materials (BOM) and P&ID Design Guide** has been generated to assist you in designing a modern, cyber-physical, concurrently maintainable (Tier 3) hyperscale data center.

This document is organized systematically, mapping out the physical power distribution, thermal loops (FWS and TCS), representative IT rack architecture, building automation network, and safety-critical life safety layers. Each subsystem includes specific equipment, real-world manufacturers, precise makes/models, operational communication protocols, and corresponding **IEC 62443 Security Level Targets (SL-T)**.


# Hyperscale Tier 3 Data Center OT Infrastructure: P&ID Design Document & Bill of Materials

This design document and Bill of Materials (BOM) provides the precise technical specification required to construct a comprehensive Piping and Instrumentation Diagram (P&ID) and electrical single-line diagram for an AI-ready $100 \text{ MW}$ hyperscale Tier 3 data center.

The primary architectural mandate is **concurrent maintainability**, meaning any electrical, mechanical, or control component can be isolated, serviced, or replaced without interrupting the IT load. In the cyber-physical domain, this design mirrors physical Tier 3 redundancy directly into logical network segmentation per the **ISA/IEC 62443 Zones and Conduits model**, preventing a common-mode cyber-attack from compromising redundant systems simultaneously.

---

## 1. System Engineering & P&ID Schematic Guide

To draft the physical and logical P&ID schematics, use the following operational loops as the engineering baseline:

```

```
              [ Heat Rejection Loop (Towers) ]
                             │
                     Chilled Water (FWS)
                             │
                [ Centrifugal Chiller Plant ]
                             │
                     Chilled Water (FWS)
                             │
                [ Coolant Distribution Unit ] (Heat Exchanger)
                             │
                    Secondary Loop (TCS)
                             │
       ┌─────────────────────┴─────────────────────┐
       ▼                                           ▼
```

[ Representative Rack A ] [ Representative Rack B ]

- Switched PDU (Modbus TCP) - Switched PDU (Modbus TCP)
- Manifold QD (Mechanical) - Manifold QD (Mechanical)
- GPU Cold Plates (Fluid) - GPU Cold Plates (Fluid)
- Server BMC (Redfish/IPMI) - Server BMC (Management)

```

### 1.1 The Primary Cooling Loop: Facility Water System (FWS)
The FWS loop circulates facility water between the outdoor heat rejection systems (cooling towers) and the central refrigeration plant (chillers), which then supplies chilled water to the Coolant Distribution Units (CDUs).
*   **P&ID Drafting Instruction:** Draw the loop as a closed hydronic circuit. Supply water flows from the chiller evaporators at $7^\circ\text{C}$ to the facility-side inlet of the CDU heat exchanger, returning at $12^\circ\text{C}$ to the chiller return manifold. The condenser loop circulates water from the chiller condensers to the cooling tower spray headers and back.
*   **Valves & Instrumentation:** Include motorized isolation valves (FCVs) on the inlet/outlet of each chiller and cooling tower cell to allow automatic isolation. Place dual-redundant temperature transmitters (TT) and vortex-shedding flow transmitters (FT) on the main supply and return headers.

### 1.2 The Secondary Cooling Loop: Technology Cooling System (TCS)
The TCS loop is completely isolated from the FWS by a Brazed Plate Heat Exchanger (BPHE) inside each CDU to prevent biological fouling and mineral deposition on the server cold plates.
*   **P&ID Drafting Instruction:** Draw the TCS as a localized, high-purity loop. Purified deionized water with glycol (PG25) is pumped from the CDU manifold at a constant $32^\circ\text{C}$ (ASHRAE W32 fluid class) to the rack-level manifolds. Return manifolds collect heated fluid at $40^\circ\text{C}$ and route it back to the CDU BPHE return port.
*   **Valves & Instrumentation:** Place motorized isolation valves (FCVs) at the supply/return of each server rack manifold. Implement high-accuracy differential pressure transmitters (DPT) at the most hydraulically remote rack manifold to drive the CDU's variable-speed pump logic.

### 1.3 The Representative Server Rack (RCK-01)
Instead of replicating 100 identical server cabinets, the P&ID represents the compute layer using a single OCP Open Rack v3 (ORv3) configuration as a functional unit.
*   **P&ID Drafting Instruction:** Show a single cabinet containing:
    1.  **A 48V DC Power Shelf** connected to the rack-level bus bars.
    2.  **Two liquid-cooled GPU/CPU Server Nodes** with direct-to-chip (D2C) micro-channel cold plates.
    3.  **Dripless Quick Disconnects (QDs)** connecting the server nodes to the vertical rack supply and return manifolds.
    4.  **A local leak-detection sensing cable** running along the base of the rack enclosure.

---

## 2. Integrated Bill of Materials (BOM)

| System ID | P&ID Tag | Equipment Description | Manufacturer | Model / Series | Communication Interface & Protocol | IEC 62443 Zone & Target SL (SL-T) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1. ELECTRICAL POWER DISTRIBUTION CHAIN** | | | | | | |
| Power | MV-SWG-01 | Medium-Voltage Gas-Insulated Switchgear | Hitachi Energy | ZX2 Series | Hardwired Trip Circuits (to relays) | Zone 1: Control (SL-T 2) |
| Power | PRO-RLY-01 | MV Substation Protection Relay | SEL | SEL-751A | IEC 61850 GOOSE & MMS, PRP/HSR | Zone 4: Substation (SL-T 4) |
| Power | XFMR-01 | Dry-Type Cast Resin Power Transformer | ABB | TriDry series | RS-485 / Modbus RTU (winding temp) | Zone 3: Field (SL-T 2) |
| Power | UPS-A-01 | Double-Conversion Online Modular UPS | Schneider Electric | Galaxy VX 1250kW | Modbus TCP, SNMP v3, HTTPS | Zone 2: Electrical (SL-T 3) |
| Power | UPS-NMC-A | UPS Network Management Card | Schneider Electric | AP9641 (NMC3) | SNMP v3, HTTPS, Modbus TCP | Zone 2: Electrical (SL-T 3) |
| Power | ATS-A-01 | Microprocessor-Controlled Transfer Switch | ASCO (Schneider) | 7000 Series | Modbus TCP, BACnet/IP, SNMP | Zone 2: Electrical (SL-T 3) |
| Power | GEN-A-01 | Backup Diesel Generator Set | Caterpillar | 3516C-HD | CAN Bus (internal) / SAE J1939 | Zone 3: Field (SL-T 2) |
| Power | GEN-CTL-A | Generator Electronic Control Unit (ECU) | Woodward | easYgen-3500XT | Redundant Ethernet, Modbus TCP, CAN | Zone 2: Electrical (SL-T 3) |
| Power | PGC-01 | Generator Paralleling Controls Platform | Woodward | easYgen-3500XT | Modbus TCP, CAN, Redundant Ethernet | Zone 2: Electrical (SL-T 3) |
| Power | LV-SWG-01 | Low-Voltage Distribution Switchgear | Eaton | Pow-R-Line | Modbus TCP (to BMS/EPMS) | Zone 3: Field (SL-T 2) |
| Power | EPMS-SRV | Electrical Power Monitoring Server | Schneider Electric | PowerLogic PME | Modbus TCP, DNP3, OPC UA, HTTPS | Zone 2: Electrical (SL-T 3) |
| **2. FACILITY WATER COOLING LOOP (FWS - PRIMARY)** | | | | | | |
| Mechanical | CHL-A-01 | Magnetic Bearing Oil-Free Chiller | Johnson Controls | YORK YZ Series | BACnet/IP (native), Modbus TCP | Zone 1: BMS/HVAC (SL-T 2) |
| Mechanical | CHL-CTL-A | Chiller Panel Microprocessor Controller | Johnson Controls | OptiView Controller | BACnet/IP, Modbus RTU | Zone 1: BMS/HVAC (SL-T 2) |
| Mechanical | CTW-01 | Induced Draft Counterflow Cooling Tower | Baltimore Aircoil | Series 3000 | BACnet MS/TP, Modbus RTU | Zone 3: Field (SL-T 2) |
| Mechanical | CHW-PMP-01 | Primary Chilled Water Circulation Pump | Grundfos | Hydro MPC | Modbus RTU (to local VFD) | Zone 3: Field (SL-T 2) |
| Mechanical | PMP-VFD-01 | Variable Frequency Drive for CHW Pump | ABB | ACQ580 | Modbus TCP, BACnet/IP, Profibus | Zone 1: BMS/HVAC (SL-T 2) |
| Mechanical | TT-FWS-01 | High-Accuracy Temperature Transmitter | Emerson (Rosemount)| 3144P | Analog 4-20 mA / HART protocol | Zone 3: Field (SL-T 2) |
| Mechanical | FCV-FWS-01 | Motorized Control Isolation Valve | Belimo | EV Series | BACnet MS/TP, Modbus RTU, 2-10V | Zone 3: Field (SL-T 2) |
| **3. TECHNOLOGY COOLING LOOP (TCS - SECONDARY)** | | | | | | |
| Mechanical | CDU-01 | Liquid-to-Liquid Coolant Distribution Unit| CoolIT Systems | CHx2000 Platform | Redfish API, Modbus TCP, SNMP v3 | Zone 1: BMS/HVAC (SL-T 3) |
| Mechanical | CDU-PLC-01 | CDU Onboard Process Logic Controller | Emerson (Woodward) | RX3i PACSystems | Modbus TCP, BACnet/IP, HTTPS | Zone 1: BMS/HVAC (SL-T 3) |
| Mechanical | TCS-PMP-01 | Secondary TCS In-Line Pump | Xylem (Bell & Gossett)| e-1510 series | Modbus RTU (to local VFD) | Zone 3: Field (SL-T 2) |
| Mechanical | TCS-VFD-01 | Pump VFD (Variable Speed Pump Control) | Danfoss | VLT® Flow Drive | Certified: BACnet/IP, Modbus TCP | Zone 1: BMS/HVAC (SL-T 3) |
| Mechanical | DPT-TCS-01 | Differential Pressure Transmitter (Remote) | Yokogawa | EJX110A | Analog 4-20 mA / HART protocol | Zone 3: Field (SL-T 2) |
| Mechanical | LEK-DET-01 | Conductive Leak Detection Sensor Cable | TraceTek | TT1000 Series | Relay contact closures (to local controller) | Zone 3: Field (SL-T 2) |
| Mechanical | LEK-CTL-01 | Leak Detection Panel Controller | RLE Technologies | SeaHawk LD1500 | Modbus TCP, SNMP, SMTP | Zone 1: BMS/HVAC (SL-T 2) |
| Mechanical | WTS-PLC-01 | Water Treatment Chemical Dosing PLC | Siemens | SIMATIC S7-1200 | Modbus TCP, PROFINET | Zone 1: BMS/HVAC (SL-T 2) |
| **4. Representative IT Rack Layer (RCK-01)** |  |  |  |  |
| Compute Node | Supermicro / Open Compute | OCP ORv3 Server | REST API (Redfish) | IT Compute Workload | Zone 0 (Enterprise IT) |
| Server BMC | ASPEED | AST2600 | IPMI (RMCP+), Redfish API | Zone 1: Server Mgmt (SL-T 3) |
| Cold Plates | CoolIT Systems | Split-Flow™ D2C | N/A (Passive mechanical) | Direct-to-chip heat extraction | N/A (Mechanical) |
| Quick Disconnects | CPC | OCP UQD v2.0 | N/A (Mechanical blind-mate) | Dripless hot-swap rack coupling| N/A (Mechanical) |
| Switched Rack PDU| Raritan (Legrand) | PX4 Switched Series | HTTPS, SSH, SNMP v3, Modbus TCP | Rack-level billing & outlet actuation | Zone 2: Electrical (SL-T 3) |
| **5. BUILDING AUTOMATION & OT NETWORK CORE** | | | | | | |
| Automation | BMS-SRV | BMS Supervisory Server Platform | Honeywell | Niagara Framework / EBI | BACnet/SC, Modbus TCP, OPC UA, HTTPS | Zone 1: BMS/HVAC (SL-T 3) |
| Automation | DDC-01 | Direct Digital Field Controller | Saia-Burgess | PCD3.M6893 QronoX | Certified: BACnet/IP, Modbus TCP | Zone 1: BMS/HVAC (SL-T 3) |
| Automation | GTW-01 | Protocol Gateway / Conduit Device | Loytec | L-GATE Series | BACnet, Modbus, LonWorks, OPC UA| Zone Boundary: Conduit C0-1 |
| Network | OT-SW-01 | Managed Industrial Ethernet Core Switch | Moxa | TN-4900 Series | Certified: SNMP v3, HTTPS, SSH, 802.1X | Zone 1: Backbone (SL-T 3) |
| Network | OT-FW-01 | Next-Gen Industrial Security Firewall | Moxa | EDR-G9010 Series | Certified: Deep Packet Inspection (DPI) | Conduit Boundary (SL-T 3) |
| Security | PACS-SRV | Physical Access Control Server | Genetec | Synergis | OSDP over TLS, HTTPS, BACnet/IP | Zone 5: Phys. Security (SL-T 3)|
| Security | DOOR-CTL-01 | Switched Door Controller | HID Global | Mercury LP1502 | OSDP (v2 Secure Channel), HTTPS | Zone 3: Field Security (SL-T 3)|
| **6. FIRE PROTECTION & LIFE SAFETY** | | | | | | |
| Safety | FACP-01 | Fire Alarm Control Panel | Honeywell | XLS3000 | SLC Loop (to sensors), Modbus/BACnet | Zone 3: Safety (SL-T 3) |
| Safety | ASD-01 | Aspirating Smoke Detection Unit (VESDA) | Honeywell | VESDA-E VEP | High-sensitivity air sampling loop | Zone 3: Safety (SL-T 3) |
| Safety | FSC-01 | Fire Suppression Actuation Controller | Fike | Cheetah Xi | Proprietary SLC, RS-485, Relays | Zone 3: Safety (SL-T 3) |
| Safety | CLN-AGT-01 | Clean Agent Fire Extinguishing Cylinder | Fike | Novec 1230 System | Hardwired solenoids (to FSC-01) | Zone 3: Safety (SL-T 3) |
| Safety | EPO-BTN-01 | Emergency Power Off Button Assembly | Schneider Electric | Harmony XB5 | Hardwired dry-contact loops | Zone 2: Electrical (SL-T 4) |

---

## 3. Subsystem P&ID Drafting Guidelines

### 3.1 Facility Water System (FWS) P&ID Scheme
```

[ Cooling Tower CTW-01 ] ──(FWS Return Header)───► [ Chiller CHL-A-01 Condenser ] ▲ │ └──────────────(FWS Supply Header)─────────────────────┘ │ (Primary Loop) ▼ [ CHW-PMP-01 ] ───► [ ABB VFD-01 ] │ ▼ [ CDU-01 BPHE Heat Exchanger ]

```
1.  **Chiller Piping & Valves:** Connect two chillers (`CHL-A-01` and `CHL-B-01`) in parallel to form a $2N$ redundant primary chiller plant. Place a motorized butterfly valve (`FCV-FWS-01`) on the evaporator inlet of each chiller to allow the standby unit to be hydraulically decoupled.
2.  **Pump Station configuration:** Draw three primary chilled water pumps (`CHW-PMP-01`) configured in an $N+1$ arrangement. Connect the discharges of the pumps to a single main supply header, each isolated with a silent check valve and a manual gate valve. Wire each pump motor to an independent variable frequency drive (`PMP-VFD-01`) running on a dedicated Modbus subnet.
3.  **Sensor & Control Loops:** Place high-sensitivity temperature sensors (`TT-FWS-01`) and pressure sensors directly in the main evaporator supply and return headers. Establish a control loop within the BMS to dynamically modulate pump speed via the VFDs based on differential pressure across the chiller evaporators to maintain optimal $7^\circ\text{C}$ supply.

### 3.2 Technology Cooling System (TCS) P&ID Scheme
```

```
                   [ CDU-01 BPHE ]
                          │
                   (Secondary Loop)
                          ▼
                  [ TCS-PMP-01 ] ───► [ Danfoss TCS-VFD-01 ]
                          │
                (Pure Glycol PG25)
                          ▼
       ┌──────────────────┴──────────────────┐
       ▼                                     ▼
```

[ Supply Manifold ] [ Return Manifold ] │ ▲ (UQD Coupling) (UQD Coupling) ▼ │ [ GPU Server Nodes ] ──────────────────────────┘

```
1.  **CDU Assembly Internals:** Inside the boundary of `CDU-01`, draw a Brazed Plate Heat Exchanger (BPHE). Connect the facility-side inlet/outlet to the primary FWS loop. The secondary-side inlet/outlet connects to the TCS loop.
2.  **Pump Redundancy:** Draw two TCS circulation pumps (`TCS-PMP-01`) in an $N+1$ configuration inside the CDU shell. Connect each pump motor to a dedicated VFD (`TCS-VFD-01`) to regulate secondary loop flow rates dynamically.
3.  **Instrument & Safety Interlocks:** Place redundant inline temperature transmitters (`TT-TCS-01`) and turbine flow meters (`FT-TCS-01`) on the secondary supply piping. Define a critical safety PID control loop within the CDU's internal PLC (`CDU-PLC-01`): the controller reads the secondary supply temperature and modulates the primary-side control valve to maintain a steady $32^\circ\text{C}$ supply to the server halls, preventing thermal shock or condensation.

### 3.3 Representative IT Rack (RCK-01) P&ID Scheme
```

[ Vertical Rack Supply Manifold ] │ (Dripless OCP UQD) ▼ [ GPU Cold Plate 1 ] │ [ CPU Cold Plate 1 ] │ (Dripless OCP UQD) ▼ [ Vertical Rack Return Manifold ]

```
1.  **Manifold Segregation:** Inside `RCK-01`, draw two vertical distribution pipes: the **Rack Supply Manifold** (connected to the CDU supply piping) and the **Rack Return Manifold** (routing fluid back to the CDU return header).
2.  **Server Node Connections:** Draw a representative server node chassis containing cold plates mounted directly on the high-TDP processor chips (`GPU Cold Plate` and `CPU Cold Plate` connected in series).
3.  **Dripless Couplings:** Draw the physical interface between the server node and the vertical manifolds using OCP-compliant quick disconnect symbols (`OCP UQD v2.0`). Show these as blind-mate, non-drip hydraulic couplings.
4.  **Local Safety Loop:** Draw a conductive leak-detection sensing cable (`LEK-DET-01`) routed in a serpentine pattern along the drip tray at the bottom of the rack enclosure. Wire this cable to a local zone module (`LEK-CTL-01`) to automatically isolate the rack manifold valves in the event of coolant escape.

---

## 4. Cyber-Physical Control & Network Topology

To complete your P&ID documentation, the physical piping must interface with the logical network architecture. The topology uses physical zone segmentation via industrial firewalls to prevent lateral privilege escalation:

```

[ ZONE 0: Enterprise IT Network ] │ Conduit C0-1 (Industrial DPI Firewall) ▼ [ ZONE 1: BMS / HVAC Process Control ] ◄── (BMS Head-End: Niagara WEBs-N4) ├── CDU PLC (RX3i PACSystems) ├── Chiller Controllers (OptiView) └── Pump VFDs (ABB ACQ580) │ Conduit C1-3 (Hardwired Safety Interlocks) ▼ [ ZONE 3: Fire & Life Safety Zone ] ◄───── (FACP-01 / VESDA ASD-01)

```

### 4.1 Communication & Protocol Specifications
*   **BMS to Field Controllers (Zone 1 ↔ Zone 3):** The primary Building Management System (`BMS-SRV`) communicates with downstream DDC controllers and CDUs using BACnet/IP (Port 47808) or Modbus TCP (Port 502).
*   **Grid Substation (Zone 4):** Medium-voltage protective relays (`PRO-RLY-01`) utilize **IEC 61850 GOOSE** for horizontal, low-latency ($< 4 \text{ ms}$) peer-to-peer trip signals over dedicated fiber networks, and **MMS** for reporting telemetry to the supervisory SCADA gateway.
*   **Compute Plane (Zone 0):** Server out-of-band management utilizes baseboard management controllers (`AST2600`) communicating via Redfish API over HTTPS or secure IPMI (RMCP+) on a dedicated management network.

### 4.2 Security Level (SL) Target Definition
This hyperscale design is built to conform with **IEC 62443 Security Level Target 3 (SL-T 3)** for all critical process automation zones, providing defense-in-depth against sophisticated actors using specialized resources and IACS-specific exploits.
*   **Network Device Mandate:** Deployed network switches (`OT-SW-01`) and firewalls (`OT-FW-01`) must hold **ISASecure Component Security Assurance (CSA) Level 3** certification.
*   **Compensating Controls for Uncertified Devices:** Since datacenter-specific devices like UPS network cards and CDU PLCs commonly lack native IEC 62443-4-2 certifications, the design implements **compensating architectural countermeasures**:
    1.  **Conduit Micro-segmentation:** All uncertified UPS cards are isolated on a dedicated power-management VLAN (`Zone 2`), blocked from accessing the general-purpose BMS.
    2.  **Unidirectional Telemetry Gateways:** Telemetry flows from the power meters and CDUs to the DCIM/BMS via a unidirectional gateway (data diode) to ensure zero write-back paths exist to actuate physical equipment.
    3.  **Physical Safety Overrides:** High-consequence safety loops—such as Emergency Power Off (`EPO-BTN-01`) or Fire Suppression release—are hardwired directly through safety-rated relays, bypassing all software networks entirely to prevent cyber-induced false activation.

