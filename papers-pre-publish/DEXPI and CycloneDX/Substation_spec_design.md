Here is a comprehensive Bill of Materials (BOM) and Interface Connection Document designed specifically for mapping into a Digital Twin (using a Nodes and Edges graph structure). 

This model captures the physical, electrical, environmental, and digital architecture of the Endeavour Energy network, incorporating the Community Battery (BESS) trial, Distributed Energy Resource Management System (DERMS), and general substation engineering standards derived from the source documents.

---

### PART 1: Node Inventory (Bill of Materials)
These represent the "Nodes" (entities/assets) in your Digital Twin, categorized by system type.

#### 1. Primary Electrical Substation System (Physical/Power)
*   **TRF-01:** Power Transformer (Step-down/Step-up, e.g., 132/33kV or 33/11kV).
*   **CB-01:** High Voltage Circuit Breaker (SF6 or Vacuum).
*   **BUS-01:** Substation Busbar (Copper/Aluminum).
*   **DS-01:** Disconnector / Isolator Switch.
*   **LA-01:** Lightning Arrester.
*   **GND-01:** Substation Grounding/Earthing Grid.

#### 2. Battery Energy Storage System (BESS) (Physical/Power/Environmental)
*   **BAT-RACK-01:** Battery Modules/Racks (Lithium-ion; specific vendors: Rolls-Royce, Intercell).
*   **PCS-01:** Power Conversion System / Bi-directional Inverter (AC/DC conversion).
*   **BESS-TRF-01:** BESS Step-Up Transformer (Medium Voltage connection to Grid).
*   **BMS-01:** Battery Management System (Master and String/Module level).
*   **HVAC-01:** Environmental Control Unit (Thermal management/cooling fans).
*   **FSS-01:** Fire Suppression System (VESDA smoke detection, Water Deluge, Novec 1230, or CO2).

#### 3. Substation Auxiliary & Safety Systems
*   **AUX-BAT-01:** 110V DC Station Battery Bank (Valve Regulated Lead Acid - VRLA).
*   **AUX-CHG-01:** UPS-style DC Battery Charger (Dual redundant).
*   **AUX-DC-BUS:** DC Distribution Switchboard.

#### 4. Substation Automation & OT Network (Zones 1 & 2)
*   **IED-01:** Intelligent Electronic Device / Protection Relay (Zone 1).
*   **MU-01:** Merging Unit (Digitizes analog current/voltage signals).
*   **RTU-EE:** Endeavour Energy Remote Terminal Unit (Zone 2.3).
*   **RTU-VEN:** Vendor Remote Terminal Unit (BESS Controller).
*   **SW-01:** Substation LAN Switch (Layer 2).
*   **FW-01:** Local Substation Stateful Firewall / Deep Packet Inspection (DPI) (Zone 2.4).
*   **MOD-01:** EE-Controlled Edge Device/Modem (Private APN gateway).

#### 5. Central IT/OT & Cloud Integration (Zones 3, 4 & External)
*   **DERMS-01:** mPrest DERMS Application (Kubernetes cluster hosted on Nutanix infrastructure).
*   **UT-SRV-01:** SwitchDin Utility Server (Data Plane & Control Plane Gateway).
*   **ADMS-01:** Advanced Distribution Management System (Zone 3.1.3).
*   **ICCP-GW:** ICCP Adapter/Proxy.
*   **EIP-01:** Enterprise Integration Platform (webMethods).
*   **HIST-01:** Historian Database (PostgreSQL / Timescale) (Zone 3.1.2).
*   **OT-BUS-01:** On-premise OT Service Bus.
*   **AZ-APIM:** Azure API Management Gateway (DER Cloud).
*   **AZ-BUS:** Azure Service Bus (Cloud pub-sub).
*   **AZ-SQL:** Azure SQL Server (DER Cloud Database).
*   **PORTAL-INST:** DCCEEW Installer Portal / PEGA Connections Portal.
*   **API-RET:** Retailer API Gateway.
*   **BH-01:** OT Bastion Host / DMZ Gateway (Citrix) (Zone 3.5).
*   **ANALYTICS-01:** Gridsight (Dynamic Operating Envelope Calculator).

---

### PART 2: Interface Connection Mapping (Edges)
These represent the "Edges" in your Digital Twin, mapping the flow of materials, electricity, control signals, and data between the nodes. 

#### A. Physical & Environmental Flows
| Source Node | Target Node | Edge / Flow Type | Protocol / Medium / Payload |
| :--- | :--- | :--- | :--- |
| HVAC-01 | BAT-RACK-01 | Thermal / Environmental | Chilled Air / Forced Convection |
| FSS-01 | BAT-RACK-01 | Fire Suppression | Clean Agent (Novec 1230/CO2) or Water Spray |

#### B. Electrical Power Flows
| Source Node | Target Node | Edge / Flow Type | Protocol / Medium / Payload |
| :--- | :--- | :--- | :--- |
| External Grid | TRF-01 | Electrical Power | High Voltage AC (e.g., 132kV) |
| TRF-01 | BUS-01 | Electrical Power | Medium Voltage AC (e.g., 11kV or 33kV) |
| BAT-RACK-01 | PCS-01 | Electrical Power | High Voltage DC (e.g., 1500V DC bus) |
| PCS-01 | BESS-TRF-01 | Electrical Power | Three-phase AC (e.g., 400V AC to MV) |
| BESS-TRF-01 | BUS-01 | Electrical Power | Medium Voltage AC |
| AUX-CHG-01 | AUX-BAT-01 | Electrical Power | 110V DC (Charging Current) |
| AUX-BAT-01 | IED-01 / CB-01 | Electrical Power | 110V DC (Trip Coil & Relay Power) |

#### C. Local Substation Automation Data & Control (Layer 2 / Zone 1 & 2)
| Source Node | Target Node | Edge / Flow Type | Protocol / Medium / Payload |
| :--- | :--- | :--- | :--- |
| MU-01 | IED-01 | OT Data (Process Bus) | IEC 61850-9-2 Sampled Values (SV) |
| IED-01 | CB-01 | OT Control (Process Bus) | IEC 61850 GOOSE (Trip/Close commands) |
| IED-01 | SW-01 | OT Data (Station Bus) | IEC 61850 MMS (Status/Reporting) |
| BMS-01 | PCS-01 | OT Data & Control | CAN Bus / Modbus TCP (Limits, SoC, Temp) |
| BMS-01 | RTU-VEN | OT Data | Modbus TCP / RTU |
| RTU-EE | RTU-VEN | OT Data (Air-Gapped/Segmented) | Serial Connection / Modbus (Strict ACLs) |

#### D. BESS Remote Access & Gateway Flows (Edge to IT/OT Integration)
| Source Node | Target Node | Edge / Flow Type | Protocol / Medium / Payload |
| :--- | :--- | :--- | :--- |
| RTU-VEN | MOD-01 | OT Data | Ethernet / TCP/IP |
| MOD-01 | FW-01 | OT Security / Transport | Secure Private APN (4G/LTE Tunnel) |
| FW-01 | UT-SRV-01 | OT Data (Control/Telemetry) | VPN (TCP 8080/1194), Modbus (TCP 502, 3113) |
| FW-01 | UT-SRV-01 | OT Data (Proprietary OEM) | TCP 3111 (Rolls-Royce), TCP 16500->443 (Intercell) |
| Vendor Engineer | BH-01 | IT/OT Remote Access | HTTPS / MFA via Citrix (Jump Host) |
| BH-01 | RTU-VEN | OT Remote Session | SSH (TCP 22) / Fleet Manager (TCP 5000/16421) |

#### E. Core Enterprise Integration & Application Flows (Zones 3, 4 & Cloud)
| Source Node | Target Node | Edge / Flow Type | Protocol / Medium / Payload |
| :--- | :--- | :--- | :--- |
| UT-SRV-01 | DERMS-01 | Application Data | Internal APIs (Standardized Telemetry/Control) |
| DERMS-01 | ICCP-GW | Grid Control / Constraints | ICCP (Internal Proxy) |
| ICCP-GW | ADMS-01 | Grid Control / Constraints | ICCP over TLS 1.3 (Client/Server Certificates) |
| UT-SRV-01 | AZ-APIM | Registration / Assurance | HTTPS / REST API |
| AZ-APIM | AZ-BUS | Message Queuing | AMQP (TCP 5671, 5672) |
| AZ-BUS | AZ-SQL | Database Persistence | Cloud SQL queries (DER Registration Data) |
| AZ-BUS | OT-BUS-01 | Enterprise Service Bus | Cloud-to-On-Prem Stretch (TCP 61616 Messaging) |
| OT-BUS-01 | HIST-01 | Data Archiving | SQL (Telemetry and Test Results to PostgreSQL) |

#### F. Third-Party & Market Operations (External Interfacing)
| Source Node | Target Node | Edge / Flow Type | Protocol / Medium / Payload |
| :--- | :--- | :--- | :--- |
| PORTAL-INST | EIP-01 | Business Application | HTTPS / REST (Test Requests / Registration) |
| EIP-01 | UT-SRV-01 | OT Command Integration | HTTPS / REST (Translated Test execution) |
| EIP-01 | PORTAL-INST | Business Application | HTTPS / REST (DCCEEW Unified Data Exchange) |
| API-RET | DERMS-01 | Market Dispatch & Monitor | HTTPS (IEC 61968-5 / CIM JSON payload) |
| ANALYTICS-01 | DERMS-01 | Grid Analytics | HTTPS (Dynamic Operating Envelopes/Forecasts) |

---

### Instructions for Digital Twin Instantiation:
To import this into a graph database (like Neo4j or Azure Digital Twins):
1. **Nodes (Vertices):** Create an entity for every item in **Part 1**. Assign properties such as `Zone_Level` (e.g., Zone 1, Zone 3.5), `Equipment_Type` (e.g., Physical, Application, Network), and `Manufacturer` (e.g., Rolls-Royce, mPrest, SwitchDin).
2. **Edges (Relationships):** Create directed links based on **Part 2**. Use the "Edge / Flow Type" as the relationship name (e.g., `[BAT-RACK-01] -[:ELECTRICAL_POWER]-> [PCS-01]`). Store the "Protocol / Medium" as a property of the edge (e.g., `voltage: 1500V_DC` or `protocol: IEC_61850_GOOSE`). 

*Note: The architecture restricts "East-West" traffic at the substation level, which is why there are no direct digital network edges between the `RTU-EE` and `RTU-VEN` over standard Ethernet—they are segmented by VLANs and only interact via strict ACLs or physical serial cables to prevent lateral cyber movement.*