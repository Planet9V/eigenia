# Deep Research Plan: The Opensource Unified Standard "G_CPDT"
## Unifying Physical Equipment Topology (ISO 15926 / DEXPI 2.0), Hierarchical Multi-BOM (OWASP CycloneDX 1.6+), and Grid Topology (IEC 61970 CIM) for Product Assurance in Critical Supply Chains

- **Research Slug**: `g-cpdt-unified-standard`
- **Date**: 2026-09-11
- **Investigator**: Deep Research Engine (Antigravity)
- **Stakeholder**: Jim McKenney / Eigenia Labs / Working Group WG-05-CAD

---

## 1. Reframe & Objective

### Core Question
How can industry formally define, store, and execute an open-source unified standard—the **Graph of Cyber-Physical Digital Twins (`G_CPDT`)**—that bridges:
1. **Physical Process & Equipment Topology**: ISO 15926-4 / DEXPI 2.0 (P&IDs, process flow, hydronic/chemical piping, TagNames)
2. **Platform & Supply Chain Cyber Assets**: OWASP CycloneDX 1.6+ (ECMA-424: HBOM silicon/hardware, SBOM firmware/software, CBOM cryptography, OBOM runtime parameters, VEX/VDR)
3. **Electrical & Power Network Topology**: IEC 61970 CIM (Common Information Model, Energy Management System API, ConductingEquipment, mRIDs)
...and what are the concrete architectural mechanics and practical benefits for storing and executing interoperable, transparent product assurance across critical infrastructure supply chains?

### Underlying Decision
To establish whether and how Eigenia WG-05-CAD and the broader open-source community should publish `G_CPDT` as an open specification, standard reference implementation, and machine-readable data model satisfying the EU Cyber Resilience Act (Regulation 2024/2847), IEC 62443, and NIST SP 800-161.

### Falsifiable Hypotheses
- **H1 (Identity Decoupling)**: Promoting any existing identifier (`TagName`, `purl`, or `mRID`) to serve as the unified join key fails across lifecycle mutations. Only an immutable, decoupled UUID Asset Reference (RFC 9562) bound through native extension mechanisms preserves validity without breaking parent schema conformance.
- **H2 (Federated Graph vs. Monolithic File)**: Attempting to invent a single "merged XML/JSON file" that encapsulates CAD, BOM, and CIM is an anti-pattern rejected by standards bodies; G_CPDT must be defined as a computable federated multi-graph with a closed 5-relation directional vocabulary (`identity`, `partOf`, `controls`, `supplies`, `monitors`).
- **H3 (Assurance & Blast Radius Utility)**: Binding physical thermodynamics and power topology to firmware/software BOMs provides deterministic, machine-speed blast radius computation that mathematically falsifies non-exploitable vulnerabilities (VEX) and reduces operational triage time by >80%.
- **H4 (Sanctioned Extension Feasibility)**: G_CPDT can achieve 100% standards-compliant adoption without forking any parent standard by targeting DEXPI Profiles, the CycloneDX registered property taxonomy (`assetjoin`), and an IEC 61970 CIM Profile.

---

## 2. Genre & Structure
- **Report Genre**: Architectural Explainer & Standards Specification Framework (`explainer` + `validation`)
- **Deliverables**:
  - `plan.md` (this file)
  - `sources.csv` (triangulated index with credibility/recency/bias scoring)
  - `sources/` (individual raw source dossiers with verbatim quotes)
  - `findings/` (atomic theses: Identity, Extension Mechanisms, Blast Radius Mechanics, Regulatory Assurance, Graph Storage)
  - `refresh_targets.md` (tracking updates to CRA harmonized standards, DEXPI 2.0.1, CycloneDX 1.7)
  - `2026-09-11_g_cpdt_standard_research_report.md` (the comprehensive authoritative treatise)

---

## 3. Sourcing Strategy & Sourcing Matrix
- **Domain 1: Physical Process & Industrial CAD Standards**: ISO 15926, DEXPI 2.0 Specification (October 2025), DEXPI e.V. Profile Update (August 2026).
- **Domain 2: Supply Chain & Multi-BOM Security**: OWASP CycloneDX 1.6 (ECMA-424), package URL (ECMA-427), CISA VEX, OCP SAFE / Caliptra Silicon RoT.
- **Domain 3: Power Systems & Electrical Topology**: IEC 61970-301 CIM Base, IEC 61970-600 CGMES, IEC 61850 Process Bus.
- **Domain 4: Regulatory & Product Assurance Mandates**: EU Cyber Resilience Act (Regulation 2024/2847), Commission Implementing Regulation (EU) 2025/2392, IEC 62443-4-1 / 62443-4-2, NIST SP 800-161.
- **Domain 5: Graph Serialization & Storage Architectures**: Neo4j Labeled Property Graphs, W3C RDF/OWL semantic graphs, Parquet / Arrow columnar stores for digital twin runtime states.

---

## 4. Risk Register & Opposing Queries
- **Opposition Query 1**: "Why not just use Asset Administration Shell (AAS / IEC 63278) or W3C Web of Things (WoT) instead of G_CPDT?"
- **Opposition Query 2**: "Why can't CycloneDX properties hold the TagName directly without minting a separate UUID?"
- **Opposition Query 3**: "Won't a federated multi-leg graph introduce synchronization drift between CAD drawings and software builds?"
