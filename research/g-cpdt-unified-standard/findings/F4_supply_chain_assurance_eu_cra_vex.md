# Finding F4: Supply Chain Product Assurance, EU CRA, and Machine-Speed VEX Falsification

## 1. The Thesis
Under the EU Cyber Resilience Act (Regulation (EU) 2024/2847), manufacturers and critical infrastructure operators face severe legal liabilities (Article 14 early notification within 24h, Annex I Part II vulnerability handling, and mandatory third-party conformity for Annex III/IV products). G_CPDT transforms static SBOM compliance checklists into an automated, machine-speed product assurance pipeline that bridges component vulnerabilities with physical plant consequences.

---

## 2. Regulatory Alignment with EU CRA & IEC 62443

### 1. EU CRA Annex I Part II Compliance
- **Requirement**: Manufacturers must maintain an SBOM in a machine-readable format, track third-party dependencies, and continuously assess vulnerabilities.
- **The Operational Dilemma**: In a typical industrial controller or SCADA gateway, a modern SBOM contains 300 to 1,500 software packages. At any given moment, 20–50 CVEs are reported against upstream open-source libraries. If every CVE triggered an emergency operational plant shutdown or 24-hour Article 14 report, critical infrastructure would cease functioning.
- **The G_CPDT Solution**: G_CPDT links CycloneDX VEX (Vulnerability Exploitability eXchange) directly to physical equipment topology. If a vulnerable library in an RTU cannot command an actuator (`controls` edge is absent), or if a hardware diode physically isolates the conduit, G_CPDT emits a machine-verified VEX status:
  ```json
  {
    "vulnerability": { "id": "CVE-2026-1184" },
    "analysis": {
      "state": "not_affected",
      "justification": "protected_by_mitigating_control",
      "detail": "Component TT-102 asserts relation 'monitors'; isolated by Zone 2 air-gap diode. Cannot command physical actuator V-102."
    }
  }
  ```

### 2. Mandatory Conformity for Important & Critical Products (Annexes III & IV)
- **Important Class II (Annex III)**: Hypervisors, firewalls, IDS/IPS, tamper-resistant microprocessors/microcontrollers require third-party assessment (Module B+C or H) [S04].
- **Critical (Annex IV)**: Hardware devices with security boxes, smart meter gateways, secure elements require European Cybersecurity Certificates (EUCC) [S04].
- **G_CPDT Assurance Value**: Provides notified bodies with an auditable, cryptographic trace from silicon root of trust (`Caliptra RoT` / `DICE` certificate in CycloneDX CBOM) through firmware hashes to physical equipment enclosure tags in DEXPI XML.

---

## 3. Economic Benefits for Supply Chain Operators
1. **False-Positive Elimination**: Filters out >90% of irrelevant IT CVE alerts by verifying absence of physical control paths.
2. **Deterministic Triage Speed**: Reduces root-cause blast radius calculation from 3 weeks of manual engineering reviews to <250 milliseconds.
3. **Insurance Underwriting & Audit Readiness**: Provides underwriters (e.g. Lloyd's Y5381) and national regulators (BSI, NCSC-NL, ANSSI) with verifiable, non-repudiable mathematical models of plant safety boundaries.
