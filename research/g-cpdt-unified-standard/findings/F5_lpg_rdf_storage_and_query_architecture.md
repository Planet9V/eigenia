# Finding F5: Storage Architecture — Labeled Property Graph (LPG) with Semantic RDF/OWL Façade

## 1. The Thesis
To serve both real-time industrial operations (sub-millisecond graph path traversals, physics solvers) and cross-enterprise regulatory exchange (standards-compliant XML/RDF, SPARQL queries), G_CPDT must adopt a **Dual-Representation Storage Architecture**: a high-performance Labeled Property Graph (LPG) core coupled with an RDF/OWL semantic façade and federated native document persistence.

---

## 2. Storage Modality Comparison

| Dimension | Monolithic Merged Document | Pure Semantic Triplestore (RDF/OWL) | Labeled Property Graph (LPG / Neo4j) | **G_CPDT Dual Architecture (Recommended)** |
|:---|:---|:---|:---|:---|
| **Standards Compliance** | ❌ Fails (Breaks all 3 parent schemas) | ⚠️ Moderate (Complex mapping for CycloneDX) | ⚠️ High (Internal model, but proprietary export) | ✅ **100% (Native files preserved + exported)** |
| **Traversal Performance** | ❌ Slow (O(N) XML/JSON parsing) | ⚠️ Medium (SPARQL join overhead at scale) | ✅ Ultra-Fast (Index-free adjacency, <10ms) | ✅ **Sub-millisecond native index-free adjacency** |
| **Rich Property Storage** | ⚠️ Flat or nested document | ❌ Cumbersome (Requires reification or RDF-Star) | ✅ Native Key-Value maps on nodes & edges | ✅ **Full telemetry, hashes, & coefficients** |
| **Formal Reasoning** | ❌ None | ✅ Complete (OWL DL, Description Logics) | ❌ Application-level logic required | ✅ **Formal OWL semantics via RDF façade** |

---

## 3. The Recommended G_CPDT Engine Stack

```
               [Native Document Repository (Air-Gapped S3 / Git LFS)]
             DEXPI 2.0 XML   |   CycloneDX 1.6 JSON   |   CIM RDF/XML
                                      │
                                      ▼
                        [Ingestion & Join Compiler]
                      Validates R-1..R-35; resolves UUID_AR
                                      │
                                      ▼
            ┌──────────────────────────────────────────────────┐
            │       G_CPDT COMPUTABLE PROPERTY GRAPH CORE      │
            │          (Neo4j / Memgraph / Arrow Graph)        │
            │  • Nodes: PhysicalAsset, ProcessNode, Component  │
            │  • Edges: PART_OF, CONTROLS, SUPPLIES, MONITORS  │
            │  • In-Memory Adjacency: Sub-millisecond queries   │
            └──────────────────────────────────────────────────┘
                      │                                │
                      ▼                                ▼
          [Fast Path Analytics API]          [Semantic Export Façade]
         • Physics Solvers (dx/dt)           • W3C RDF / OWL Ontologies
         • Dynamic Blast Radius              • CIM CGMES Profile Export
         • Monte Carlo Risk Walks            • Audit Dossier Generation
```

### 1. The LPG Core Schema:
- **Node Labels**: `:PhysicalAsset`, `:FunctionalLocation`, `:ProcessEquipment`, `:GridEquipment`, `:SoftwareComponent`, `:HardwareComponent`, `:Vulnerability`.
- **Edge Types**: `:PART_OF`, `:CONTROLS`, `:SUPPLIES`, `:MONITORS`, `:IDENTIFIED_AS`, `:AFFECTS`.
- **Edge Properties**: `authority`, `basisDocument`, `bindingTimestamp`, `flowRateLpm`, `voltageKv`, `conduitZone`.

### 2. Cypher Query Example for Machine-Speed Blast Radius:
```cypher
// Trace all physical actuators and cooling loops impacted by an exploited CVE
MATCH (v:Vulnerability {cveId: $targetCve})-[:AFFECTS]->(sw:SoftwareComponent)
MATCH (sw)-[:PART_OF*0..3]->(dev:HardwareComponent)
MATCH (dev)-[rel:CONTROLS]->(eq:PhysicalAsset)
MATCH path = (eq)-[:SUPPLIES*1..4]->(downstream:PhysicalAsset)
RETURN v.cveId, dev.name, eq.tagName, [n IN nodes(path) | n.tagName] AS cascadeChain,
       eq.burstPressureBar, downstream.operatingTempC
```
