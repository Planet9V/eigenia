# Source Dossier S06: The Three-Identity Join (Eigenia WG-05-CAD P1)

- **ID**: `S06`
- **Slug**: `eigenia_three_identity_join`
- **Full Title**: The Three-Identity Join: DEXPI 2.0, CycloneDX 1.6 and IEC 61970 CIM (P1)
- **Author / Group**: Jim McKenney / Eigenia Working Group WG-05-CAD
- **Date**: 2026-09-07 (Draft for submission)
- **Normative Language**: RFC 2119 (MUST, MUST NOT, SHOULD, MAY; Requirements R-1 to R-35)
- **Licence**: Creative Commons Attribution 4.0 International (CC BY 4.0)
- **Target Bodies**: DEXPI e.V., CycloneDX Project (OWASP / Ecma TC54), IEC TC 57
- **Credibility**: 0.90 | **Recency**: 0.99 | **Bias**: 0.15 (Originating specification proposal)

---

## 1. Executive Summary & Domain Scope
`P1` establishes the foundational mathematical and normative specification for joining physical process topology (DEXPI 2.0 / ISO 15926), supply-chain multi-BOM (CycloneDX 1.6 / ECMA-424), and electrical power models (IEC 61970 CIM). It rigorously defines the **Three-Identity Join**, proving that no existing domain identifier can be elected primary without catastrophic failure. It establishes 35 numbered requirements (R-1 through R-35), a closed 5-relation directional vocabulary, and non-breaking extension bindings.

---

## 2. Verbatim Key Passages & Data Points

### On the Core Problem:
> "Three open standards describe the same physical asset. DEXPI 2.0 describes its process topology. CycloneDX 1.6 describes the software and hardware it is built from. IEC 61970 CIM describes the electrical network that supplies it. Each standard is complete within its own discipline and none of them can answer the question an operator asks after a vulnerability disclosure lands: if this is exploited, what physically happens downstream?"
> *(Section 1, Scope)*

### On Failed Identifier Elections:
> "Electing the tag fails because CycloneDX components are produced by build systems that have never heard of the plant and cannot mint a tag. Electing the `purl` fails because it identifies a package, not an asset; a pump has no `purl` and a firmware version change would silently break every binding. Electing the `mRID` fails because it exists only for objects inside a CIM model, which excludes most of a process plant, and because an mRID is unique within an exchange context rather than globally. A fourth identifier is the minimum that works."
> *(Section 2.4, Why no identifier can be promoted)*

### On The Join Form & Requirement R-9 (The Mapping Invariant):
> "R-1. An asset reference MUST be a UUID as defined by RFC 9562, serialised in the canonical hyphenated lowercase textual form."
> "R-9. The local identity in a join assertion MUST be expressed in the native identity system of the file that carries the assertion, and MUST NOT be expressed in the identity system of another leg."
> "R-9 is the most important requirement in this document. It is what makes this a mapping rather than a merge. A DEXPI file names DEXPI objects; a CycloneDX document names CycloneDX components; a CIM model names CIM objects. No file ever holds a foreign identifier, so no file ever needs revalidating when a foreign identity system changes."
> *(Section 4.1, Form)*

### On The Directional Relation Vocabulary (Section 4.2):
> "An equality join across the three standards is wrong... Binding all three with an implicit 'is the same thing' produces a graph in which a vulnerability in a monitoring agent looks identical to a vulnerability in a safety controller. Five relations, no more: `identity`, `partOf`, `controls`, `supplies`, `monitors`."
> "The distinction between `controls` and `monitors` carries most of the analytic weight. A compromised temperature transmitter falsifies a reading; a compromised valve positioner moves metal."
> *(Section 4.2, The relation vocabulary)*

---

## 3. Evaluative Analysis for G_CPDT
- Provides the formal axiomatic mathematical proof for the open-source standard `G_CPDT`.
- Establishes that `G_CPDT` is **not a new file format**, but a **federated computable multi-graph** constructed by harvesting native files carrying conformant join assertions.
