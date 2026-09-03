<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# I need a hbom and sbom example (cyclonedx format for sbom) for example plus description

Here are annotated examples and descriptions for both a CycloneDX SBOM and HBOM, contextualized for OT/industrial environments like Caliptra-based systems.

***

## What's the Difference?

CycloneDX supports both formats within the same JSON document — there is no separate file format required for hardware. The key distinction is component `type`:[^1]


| Field | SBOM | HBOM |
| :-- | :-- | :-- |
| `type` | `library`, `application`, `firmware`, `framework` | `device`, `hardware` |
| Primary ID | `purl` (Package URL) | Manufacturer part number / CPE |
| Key fields | version, hashes, licenses, purl | manufacturer, revision, secure-boot state |
| Dependency scope | Software libraries → frameworks | Physical chips → firmware images |
| CRA / IEC 62443 role | Software supply chain transparency | Hardware supply chain transparency |

CycloneDX 1.6+ allows you to mix `device`, `firmware`, and `library` types in a single unified document, satisfying both SBOM and HBOM obligations in one file.[^1]

***

## CycloneDX SBOM Example (v1.6, JSON)

This represents a firmware application with its software dependencies — typical for a BMC or PLC firmware package:[^2][^3]

```json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.6",
  "serialNumber": "urn:uuid:a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "version": 1,
  "metadata": {
    "timestamp": "2026-06-26T05:00:00Z",
    "tools": [{ "vendor": "Syft", "name": "syft", "version": "1.22.0" }],
    "component": {
      "type": "firmware",
      "bom-ref": "caliptra-runtime",
      "name": "Caliptra Runtime Firmware",
      "version": "2.1.0",
      "supplier": { "name": "CHIPS Alliance" },
      "description": "Runtime firmware for Caliptra Silicon RoT"
    }
  },
  "components": [
    {
      "type": "library",
      "bom-ref": "lib-caliptra-drivers",
      "name": "caliptra-drivers",
      "version": "2.1.0",
      "purl": "pkg:cargo/caliptra-drivers@2.1.0",
      "hashes": [
        { "alg": "SHA-256", "content": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" }
      ],
      "licenses": [{ "license": { "id": "Apache-2.0" } }]
    },
    {
      "type": "library",
      "bom-ref": "lib-mbedtls",
      "name": "mbedtls",
      "version": "3.5.1",
      "purl": "pkg:github/ARMmbed/mbedtls@v3.5.1",
      "hashes": [
        { "alg": "SHA-256", "content": "9a3c9e5f2b7d..." }
      ],
      "licenses": [{ "license": { "id": "Apache-2.0" } }]
    }
  ],
  "dependencies": [
    {
      "ref": "caliptra-runtime",
      "dependsOn": ["lib-caliptra-drivers", "lib-mbedtls"]
    }
  ]
}
```

**Key SBOM fields explained:**

- **`serialNumber`** — Unique BOM UUID; used as the document identity in attestation chains[^4]
- **`purl`** — Package URL (e.g. `pkg:cargo/...`) is the universal component identifier, linking to vulnerability databases like OSV and NVD[^5]
- **`hashes`** — SHA-256 digest of the component; this is what gets cross-referenced in the OCP S.A.F.E. SFR[^6]
- **`dependencies`** — Explicit dependency graph; required for transitive vulnerability analysis[^2]
- **`licenses`** — SPDX license identifiers; required for CRA (Cyber Resilience Act) compliance[^1]

***

## CycloneDX HBOM Example (v1.6, JSON)

This represents the physical hardware stack — a server SoC with Caliptra integrated, relevant to OCP S.A.F.E. and IEC 62443 asset inventory:[^7][^1]

```json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.6",
  "serialNumber": "urn:uuid:f9e8d7c6-b5a4-3210-fedc-ba9876543210",
  "version": 1,
  "metadata": {
    "timestamp": "2026-06-26T05:00:00Z",
    "component": {
      "type": "device",
      "bom-ref": "server-node-01",
      "name": "OCP Server Node",
      "version": "Rev B",
      "manufacturer": { "name": "Example Hyperscaler OEM" }
    }
  },
  "components": [
    {
      "type": "device",
      "bom-ref": "soc-cpu-01",
      "name": "ExampleSoC X100",
      "version": "Stepping B0",
      "manufacturer": { "name": "Example Semiconductor" },
      "description": "Host CPU SoC with integrated Caliptra 2.1 RoT",
      "cpe": "cpe:2.3:h:examplesemi:x100:b0:*:*:*:*:*:*:*",
      "properties": [
        { "name": "caliptra-version", "value": "2.1.0" },
        { "name": "secure-boot", "value": "enabled" },
        { "name": "fips-140-3", "value": "Level-2" }
      ]
    },
    {
      "type": "firmware",
      "bom-ref": "fw-caliptra-rom",
      "name": "Caliptra ROM",
      "version": "2.1.0",
      "description": "Immutable mask ROM; first code executed on reset",
      "hashes": [
        { "alg": "SHA-384", "content": "38b060a751ac9638..." }
      ],
      "supplier": { "name": "CHIPS Alliance" }
    },
    {
      "type": "device",
      "bom-ref": "bmc-01",
      "name": "AST2600 BMC",
      "version": "Rev A3",
      "manufacturer": { "name": "ASPEED Technology" },
      "description": "Baseboard Management Controller",
      "properties": [
        { "name": "firmware-version", "value": "3.04" },
        { "name": "ocp-safe-reviewed", "value": "true" }
      ]
    }
  ],
  "dependencies": [
    {
      "ref": "server-node-01",
      "dependsOn": ["soc-cpu-01", "bmc-01"]
    },
    {
      "ref": "soc-cpu-01",
      "dependsOn": ["fw-caliptra-rom"]
    }
  ]
}
```

**Key HBOM fields explained:**

- **`type: device`** — Marks a physical hardware component; triggers HBOM-specific validation rules[^7]
- **`type: firmware`** — Embedded software tied to a specific chip; links hardware to software supply chain[^1]
- **`cpe`** — Common Platform Enumeration; used for NVD hardware CVE matching (e.g. identifying affected stepping in a speculative execution flaw)[^8]
- **`properties`** — Custom key-value pairs for OCP S.A.F.E. status, FIPS mode, Caliptra version — no schema extension needed[^1]
- **`dependencies`** — Models which firmware runs *on* which hardware; critical for impact analysis when a CVE hits a specific chip revision[^1]

***

## Unified Document in Practice

In OCP S.A.F.E. and IEC 62443 workflows, the recommended approach is a **single CycloneDX 1.6 document** that contains both hardware (`device`) and software (`library`, `firmware`) entries. This unified BOM becomes:[^1]

- The **technical file artifact** for CRA market surveillance
- The **component inventory** cross-referenced against OCP S.A.F.E. SFR firmware hashes
- The **asset register** feeding into your IEC 62443-2-4 / CSMS asset management controls

The official CycloneDX BOM examples repository at `github.com/CycloneDX/bom-examples` contains HBOM, SBOM, CBOM, VEX, and VDR examples under their respective folders, all under CC0 license.[^9]
<span style="display:none">[^10][^11][^12][^13][^14][^15][^16][^17][^18][^19][^20][^21][^22][^23][^24][^25]</span>

<div align="center">⁂</div>

[^1]: https://craevidence.com/cra-compliance/sbom/hbom

[^2]: https://docs.mend.io/platform/latest/sbom-schema-import-cyclonedx

[^3]: https://cyclonedx.org/use-cases/provenance/

[^4]: https://fossa.com/blog/sbom-examples-explained/

[^5]: https://fossa.com/learn/cyclonedx/

[^6]: https://techcommunity.microsoft.com/blog/azureinfrastructureblog/securing-hardware-and-firmware-supply-chains/4268815

[^7]: https://cyclonedx.org/capabilities/hbom/

[^8]: https://cyclonedx.org/guides/OWASP_CycloneDX-Authoritative-Guide-to-SBOM-en.pdf

[^9]: https://github.com/CycloneDX/bom-examples

[^10]: https://cyclonedx.org/capabilities

[^11]: https://cyclonedx.org

[^12]: https://www.ibm.com/docs/en/concert?topic=toolkit-examples

[^13]: https://nlnet.nl/project/HBoM-cdxgen/

[^14]: https://github.com/CycloneDX

[^15]: https://gitee.com/mirrors_sonatype-nexus-community/cyclonedx-sbom-examples

[^16]: https://owasp.org/www-project-cyclonedx/

[^17]: https://www.youtube.com/watch?v=CD_ZDGtoP2Y

[^18]: https://hub.docker.com/r/cyclonedx/cyclonedx-bom-repo-server

[^19]: https://cyclonedx.org/docs/latest

[^20]: https://github.com/CycloneDX/sbom-utility

[^21]: https://stackoverflow.com/questions/79292527/generate-sbom-using-cyclonedx-for-repository-containing-multiple-languages

[^22]: https://pkg.go.dev/github.com/CycloneDX/sbom-utility/schema

[^23]: https://cyclonedx.org/schema/bom/1.5

[^24]: https://github.com/anchore/syft/issues/3781

[^25]: https://anchorecommunity.discourse.group/t/components-missing-from-cyclonedx-json-format-sbom-when-generation-is-part-of-a-test/553

