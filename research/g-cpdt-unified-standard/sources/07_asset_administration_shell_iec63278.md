# Source Dossier S07: Asset Administration Shell (AAS / IEC 63278)

- **ID**: `S07`
- **Slug**: `asset_administration_shell_iec63278`
- **Full Title**: Specification of the Asset Administration Shell - Part 1: Metamodel (IEC 63278-1)
- **Publishing Bodies**: Industrial Digital Twin Association (IDTA), Plattform Industrie 4.0, IEC TC 65
- **Date**: 2023-06 (IDTA-01001-3-0 / IEC 63278-1)
- **Type**: International Technical Standard / Industry 4.0 Reference Architecture
- **Credibility**: 0.92 | **Recency**: 0.88 | **Bias**: 0.10 (Manufacturing consortium)

---

## 1. Executive Summary & Domain Scope
The Asset Administration Shell (AAS) is the standardized digital representation of an asset for Industry 4.0. It defines an asset wrapper comprising a collection of standardized **Submodels** (e.g., Digital Nameplate, Technical Data, Carbon Footprint, Operational State). While AAS excels at encapsulating metadata for single discrete components, it is not an end-to-end multi-domain topological graph for physical piping networks, electrical distribution grids, or multi-tier software dependency trees.

---

## 2. Verbatim Key Passages & Data Points

### On Structure & Scope of AAS:
> "An Asset Administration Shell represents exactly one asset (or asset type) and consists of a header identifying the asset and a body containing multiple submodels describing specific operational or engineering aspects."
> *(Source: IDTA Metamodel v3.0, Section 4.1)*

### On Relationships & Topology:
> "AAS models relationships between assets via `RelationshipElement` or `AnnotatedRelationshipElement`. However, AAS does not define domain-specific physical flow equations, process multigraphs, or electrical node-breaker topology, leaving these to external standards."
> *(Source: IEC 63278-1 Specification)*

---

## 3. Evaluative Comparison: AAS vs. G_CPDT
- **Granularity & Architecture**:
  - **AAS**: Component-centric encapsulation. Treats an asset as a container with submodels.
  - **G_CPDT**: System-of-systems topological multigraph. Connects physical fluids (DEXPI), electrical power flows (CIM), and software/silicon root of trust (CycloneDX) across miles of pipeline and electrical grid.
- **Complementary Synthesis**:
  - G_CPDT does not replace AAS; it contextualizes it. An AAS instance for a variable-speed drive can simply be a node in the G_CPDT graph, bound to its physical P&ID tag (`controls P-101`), electrical feeder (`suppliedBy Feeder 7`), and firmware SBOM (`partOf pkg:generic/vfd-fw@4.2.1`).
