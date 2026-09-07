## 1. DEXPI 2.0 P&ID Topology Ingestion Pipeline

The Data Exchange in Process Industry (DEXPI) 2.0 standard defines an XML-based schema for exchanging process plant design data between CAD systems (such as AVEVA, Intergraph, and Siemens COMOS) and digital twin graphs.

### Key Capabilities:
- **XML Equipment Schema Parsing:** Converts P&ID equipment symbols, piping segments, valves, pumps, and instruments into RDF graph nodes.
- **Topology Relationship Extraction:** Automatically infers process fluid connections (`PipingSegment`), electrical signaling lines (`SignalLine`), and safety loop dependencies.
- **Minimum Operational Requirements (MOR):** Verifies physical redundancy constraints on pumps, pressure relief valves, and safety instrumented systems (SIS).

## 2. CycloneDX 1.6 Multi-BOM Attestations

Traditional Software Bill of Materials (SBOM) only cover application code libraries. Eigenia extends this across the BOM layers defined in section 2.1 of *Unified DEXPI 2.0 & CycloneDX 1.6+ Semantic Bridge*, which is where the layer count is stated once for the corpus:

| BOM Dimension | Scope & Target | CycloneDX component type |
| :--- | :--- | :--- |
| **1. Hardware BOM (HBOM)** | PLC chassis, I/O modules, ASIC chips, board revisions, and the physical plant items: valves, actuators, heat exchangers, piping | `device`, `hardware` |
| **2. Software BOM (SBOM)** | Operating system, firmware, embedded SCADA libraries, and the firmware inside Modbus/DNP3 fieldbus devices, RTU controllers and sensors | `firmware`, `library`, `application` |
| **3. Cryptography BOM (CBOM)** | Device identity keys, certificate chains, and the algorithms each control loop depends on | `cryptographic-asset` |
| **4. Manufacturing BOM (MBOM)** | Supplier chain of custody, production lots, and material certification for the physical plant items | `component`, `metadata.manufacturer` |
| **5. Operations BOM (OBOM)** | Setpoint limits, rate limits, and the operating envelope each device is permitted to hold | `data`, `service` |
| **6. SaaS BOM (SaaSBOM)** | Fieldbus and management endpoints exposed by RTUs, protocol gateways and historians | `service` |

CBOM is the Cryptography Bill of Materials, which is what CycloneDX means by the `cryptographic-asset` component type. Physical plant items are not a separate BOM layer: the part inventory is the HBOM, and the material certification behind those parts is the MBOM. Field device firmware is software and belongs in the SBOM, and the network endpoints those devices expose belong in the SaaSBOM.

## 3. Deliverables & Integration Standards

1. **DEXPI 2.0 XML Parser:** High-speed graph ingestion translating P&ID sheets into Neo4j/pgvector node triples.
2. **CycloneDX 1.6 Multi-BOM Validator:** Automated attestation checking hardware firmware hashes against National Vulnerability Database (NVD) CVEs and ICS-CERT advisories.
3. **Plant-to-Twin Synchronization:** Continuous telemetry bridging CAD design intent with real-time SCADA sensor metrics.