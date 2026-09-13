# Refresh Targets: G_CPDT Open Standard Investigation

This file tracks specific external regulatory, standards, and technical milestones that trigger a delta update to the G_CPDT research corpus.

---

## 1. Standards Bodies Milestones

| Entity / Working Group | Milestone to Track | Trigger Condition for Delta Refresh | Expected Date |
|:---|:---|:---|:---|
| **DEXPI e.V.** | Release of DEXPI 2.0.1 and formal DEXPI Profile schema | If the Profile restricts attributes rather than allowing additions, update R-16 carrier mapping. | Q4 2026 |
| **CycloneDX (Ecma TC54 / OWASP)** | Formalization of `assetjoin` top-level taxonomy namespace | Confirm transition from `provisional: true` to official reserved namespace in the taxonomy registry. | Q1 2027 |
| **IEC TC 57 (WG 13 / WG 14)** | CIM Cyber-Physical Profile (P2 formal submission) | Check UML package boundaries for `cim:AssetCyberLink` and alignment with IEC 61970-600 CGMES. | Mid 2027 |
| **Plattform Industrie 4.0 / IDTA** | AAS Submodel for Supply Chain Security (IEC 63278-4) | Monitor release of standardized CycloneDX SBOM submodel wrapper in AAS. | Q2 2027 |

---

## 2. Regulatory & Legal Milestones

| Legislation / Regulator | Milestone to Track | Trigger Condition | Status / Date |
|:---|:---|:---|:---|
| **EU CRA (Reg 2024/2847)** | Article 14 Early Warning Reporting Binding | Mandatory 24h reporting active. Refine automated G_CPDT VEX generation pipeline. | **Active from 2026-09-11** |
| **CEN/CENELEC JTC 13 / JTC 21** | Harmonised Standards for CRA Annex I | Harmonised standard numbers replacing default Module A with presumption of conformity. | Expected Q2 2027 |
| **EU CRA (Reg 2024/2847)** | Full Application of all Essential Requirements | Mandatory full compliance across all PDEs entering EU market. | **2027-12-11** |
| **CISA / NIST** | Updated VEX & HBOM Guidance (SP 800-161r2) | Hardware Bill of Materials schema harmonization with CycloneDX 1.6+. | Ongoing 2026 |

---

## 3. Adversarial & Opposition Triggers
- **Trigger A**: If a major CAD vendor (e.g. Autodesk, AVEVA, Siemens) implements a proprietary cyber-physical export format that circumvents DEXPI 2.0, benchmark G_CPDT ingestion performance and publish open-source converter.
- **Trigger B**: If a notified body rejects federated multi-BOM evidence under CRA Module B+C, audit the specific clause and reinforce the cryptographic DICE/CBOM binding.
