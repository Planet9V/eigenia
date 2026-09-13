# Source Dossier S05: ISA/IEC 62443 Industrial Security

- **ID**: `S05`
- **Slug**: `iec62443_industrial_security`
- **Full Title**: Security for industrial automation and control systems (IACS)
- **Publishing Bodies**: International Society of Automation (ISA) & IEC (Technical Committee 65 / ISA99)
- **Key Parts**: IEC 62443-3-3 (System security requirements), IEC 62443-4-1 (Secure product development lifecycle), IEC 62443-4-2 (Technical security requirements for IACS components)
- **Date**: 2018-2024
- **Type**: International Technical Standard
- **Credibility**: 0.95 | **Recency**: 0.80 | **Bias**: 0.05 (Global standard)

---

## 1. Executive Summary & Domain Scope
IEC 62443 is the foundational global standard for Operational Technology (OT) and Industrial Control System (ICS) cybersecurity. It partitions plants into **Zones** (logical or physical grouping of assets with common security requirements) interconnected by **Conduits** (communication channels with dedicated security controls). IEC 62443-4-1 and 4-2 govern component-level product development, supply chain tracking, and Security Assurance Levels (SL 1 to SL 4).

---

## 2. Verbatim Key Passages & Data Points

### On Zones & Conduits (IEC 62443-3-3):
> "A zone is a logical grouping of physical, informational, and application assets sharing common security requirements. A conduit is a logical grouping of communication assets that protects the confidentiality and integrity of communications between two or more zones."
> *(Source: IEC 62443-3-3 System Requirements)*

### On Component Security & Supply Chain (IEC 62443-4-1 & 4-2):
> "The product supplier shall maintain a process to identify, document, and track all third-party components (including software binaries, open-source libraries, and hardware ASIC dependencies) incorporated into the product, and monitor those components for known vulnerabilities throughout the support lifecycle."
> *(Source: IEC 62443-4-1 Secure Product Development Lifecycle)*

> "Component Requirement (CR) 2.1: The component shall provide the capability to protect the integrity of data in transit across conduit boundaries... CR 7.6 shall enforce fail-safe defaults upon system error or loss of communication."
> *(Source: IEC 62443-4-2 Technical Security Requirements)*

---

## 3. Evaluative Analysis for G_CPDT
- **Structural Mapping**: Plant CAD files (DEXPI) and grid models (CIM) define the physical boundary of assets. IEC 62443 defines their security zoning. In G_CPDT, zone and conduit membership can be modeled as property attributes on graph nodes or containment edges.
- **Supply Chain Assurance**: Linking IEC 62443-4-1 component tracking directly to CycloneDX SBOMs/HBOMs binds developer supply-chain claims to physical plant architectures.
