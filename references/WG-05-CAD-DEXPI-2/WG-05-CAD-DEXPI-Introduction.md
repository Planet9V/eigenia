# DEXPI 2.0 P&ID Topology & CycloneDX 4-BOM

Lab Sponsor Resident, j.mckenney  
Working Group: WG-05-CAD (CAD Interoperability & Open Standards)

## Overview & Objectives

Connecting plant Piping & Instrumentation Diagram (P&ID) design sheets directly to live physical assets on the industrial plant floor. This framework integrates **DEXPI 2.0 XML equipment schemas** with **CycloneDX 1.6 4-BOM attestations** (Software, Hardware, OT, Component) to enforce Minimum Operational Requirements (MOR) across critical infrastructure environments.

---

## 1. DEXPI 2.0 P&ID Topology Ingestion Pipeline

The Data Exchange in Process Industry (DEXPI) 2.0 standard defines an XML-based schema for exchanging process plant design data between CAD systems (e.g., AVEVA, Intergraph, Siemens COMOS) and digital twin graphs.

### Key Capabilities:
- **XML Equipment Schema Parsing:** Converts P&ID equipment symbols, piping segments, valves, pumps, and instruments into RDF graph nodes.
- **Topology Relationship Extraction:** Automatically infers process fluid connections (`PipingSegment`), electrical signaling lines (`SignalLine`), and safety loop dependencies.
- **Minimum Operational Requirements (MOR):** Verifies physical redundancy constraints on pumps, pressure relief valves, and safety instrumented systems (SIS).

---

## 2. CycloneDX 1.6 4-BOM Attestations

Traditional Software Bill of Materials (SBOM) only cover application code libraries. Eigenia extends this with a unified **4-BOM Architecture**:

| BOM Dimension | Scope & Target | Attestation Schema |
| :--- | :--- | :--- |
| **1. Software BOM (SBOM)** | Operating system, firmware, embedded SCADA libraries | CycloneDX 1.6 JSON/XML |
| **2. Hardware BOM (HBOM)** | PLC chassis, I/O modules, ASIC chips, board revisions | Hardware Component Schema |
| **3. OT BOM (OTBOM)** | Modbus/DNP3 fieldbus devices, RTU controllers, sensors | Field Device Attestation |
| **4. Component BOM (CBOM)** | Valves, actuators, heat exchangers, physical piping | Industrial Asset BOM |

---

## 3. Deliverables & Integration Standards

1. **DEXPI 2.0 XML Parser:** High-speed graph ingestion translating P&ID sheets into Neo4j/pgvector node triples.
2. **CycloneDX 1.6 4-BOM Validator:** Automated attestation checking hardware firmware hashes against National Vulnerability Database (NVD) CVEs and ICS-CERT advisories.
3. **Plant-to-Twin Synchronization:** Continuous telemetry bridging CAD design intent with real-time SCADA sensor metrics.
