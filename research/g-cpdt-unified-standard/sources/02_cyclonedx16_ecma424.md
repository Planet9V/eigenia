# Source Dossier S02: CycloneDX 1.6+ Specification (ECMA-424)

- **ID**: `S02`
- **Slug**: `cyclonedx16_ecma424`
- **Full Title**: CycloneDX Bill of Materials Specification v1.6 (Standard ECMA-424)
- **Publishing Bodies**: Ecma International Technical Committee 54 & OWASP Foundation
- **Date**: 2024-06 (1st edition), 2025-12 (2nd edition ECMA-424 / package-url ECMA-427)
- **Type**: International Standard (ECMA / ISO Fast-Track)
- **Credibility**: 0.98 | **Recency**: 0.95 | **Bias**: 0.05 (Open standards consortium)

---

## 1. Executive Summary & Domain Scope
CycloneDX 1.6 is a comprehensive multi-BOM standard supporting not only Software Bills of Materials (SBOM), but also Hardware (HBOM), Cryptography (CBOM), Operations (OBOM), Manufacturing (MBOM), and Vulnerability Disclosure / Exploitability eXchange (VEX/VDR). It was formally published as international standard **ECMA-424**.

---

## 2. Verbatim Key Passages & Data Points

### On Multi-BOM Categorization:
> "CycloneDX supports multiple BOM types across software, hardware, services, and cryptography. Hardware components are represented using component type `device` or `hardware`, software via `application`, `framework`, `library`, `firmware`, and cryptographic primitives via `cryptographic-asset`."
> *(Source: ECMA-424 Specification, Section 7.2 Component Types)*

### On Component Identity (purl, bom-ref, cpe):
> "A component's `bom-ref` is unique only within the declaring document. Global package identity is declared via package-url (`purl`) as defined in ECMA-427. Where package coordinates do not apply, Common Platform Enumeration (`cpe`) or hardware part numbers may be specified."
> *(Source: ECMA-424, Section 7.1 Component Identification)*

> "A package URL identifies a software distribution coordinate (type, namespace, name, version). It changes whenever a package version is bumped, even if the underlying physical hardware is identical."
> *(Source: ECMA-427 Package URL Specification)*

### On Property Taxonomy & Custom Namespaces:
> "CycloneDX supports an extensible key-value property model. Properties allow arbitrary metadata to be attached to components, services, or the BOM itself. The CycloneDX Property Taxonomy establishes officially registered namespaces (e.g., `cdx:*`) while providing a public registration mechanism for domain-specific taxonomies."
> *(Source: OWASP CycloneDX Property Taxonomy Guide)*

> "Custom properties MUST NOT redefine, shadow, or conflict with official `cdx` names. Using a registered prefix ensures global uniqueness across the supply chain."
> *(Source: Authoritative Guide to SBOM, Section 8.4)*

### On Vulnerability Exploitability eXchange (VEX):
> "CycloneDX VEX conveys the exploitability status of known vulnerabilities (e.g., `not_affected`, `affected`, `fixed`, `under_investigation`). When marked `not_affected`, justification (e.g., `code_not_reachable`, `requires_configuration`, `protected_by_mitigating_control`) must be provided."
> *(Source: ECMA-424, Section 11 Vulnerabilities)*

---

## 3. Evaluative Analysis for G_CPDT
- **Identity mismatch**: `purl` identifies software releases, which are ephemeral and version-volatile; it cannot identify a physical asset in a plant.
- **Hierarchical richness**: CycloneDX 1.6+ natively provides the full depth from silicon Root of Trust (`Caliptra ROM/FMC`) to firmware, operating systems, and cryptographic certificates.
- **Clean integration**: Cross-domain binding requires zero schema modifications. It attaches to the `properties` array using a registered namespace (such as `assetjoin:` or `g_cpdt:`).
