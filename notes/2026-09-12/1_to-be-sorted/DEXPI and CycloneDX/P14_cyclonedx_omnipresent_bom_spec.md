# The Omnipresent Bill of Materials: Full-Spectrum CycloneDX 1.6+ for Offline Systems Assurance

## Abstract

Industrial control systems, embedded devices, and hyperscale compute environments are exposed to compounding supply chain vulnerabilities spanning silicon fabrication, firmware, network runtimes, and cryptographic algorithms. Traditional Software Bill of Materials (SBOM) implementations, such as SPDX, were architected primarily for open-source licensing compliance and lack the semantic breadth required to describe cyber-physical systems. This paper presents OWASP CycloneDX 1.6+ as the omnipresent, full-stack bill of materials standard for industrial systems assurance. We analyze CycloneDX's five foundational BOM types: Hardware BOM (HBOM), Software BOM (SBOM), Operations BOM (OBOM), Cryptography BOM (CBOM), and Services/SaaS BOM (SaaSBOM). We detail how CycloneDX enables 100% air-gapped, offline vulnerability and exploitability tracking using Vulnerability Exploitability eXchange (VEX) and Vulnerability Disclosure Reports (VDR). Finally, we demonstrate how CycloneDX graphs connect embedded firmware dependencies to physical device architectures, establishing the cyber half of the cyber digital twin.

## 1. Beyond Software: The Imperative for Full-Spectrum Systems Transparency

Industrial automation and critical infrastructure operate across multiple layers of abstraction. In a modern liquid-cooled artificial intelligence cluster or power substation, a failure in temperature regulation can originate in an unpatched vulnerability in an embedded micro-controller web server, a hardcoded TLS private key in an Ethernet gateway, a misconfigured Modbus routing rule in an operational container, or a physical silicon defect in a variable frequency drive (VFD).

Historically, software security initiatives have focused on software package managers (such as Maven, npm, PyPI, and Cargo). Under United States Executive Order 14028 and European Union Regulation 2024/2847 (Cyber Resilience Act, CRA), organizations must maintain machine-readable bills of materials for all products with digital elements.

However, treating the bill of materials as a flat list of software libraries is dangerously deficient for critical infrastructure:

1. **Blindness to Silicon & Hardware Microarchitecture**: An application running on an x86 or ARM CPU depends on low-level silicon features, such as the Silicon Root of Trust (RoT), Baseboard Management Controller (BMC), and Physical Unclonable Functions (PUF). If the hardware is untracked, hardware-level exploits remain invisible.
2. **Ignorance of Runtime Operational Context**: Software does not run in a vacuum. Its execution posture is dictated by Linux systemd units, network routing tables, firewall policies, and control loop update frequencies.
3. **Cryptographic Obsolescence**: With the advent of quantum cryptanalysis and commercial harvest-now-decrypt-later attacks, systems require automated inventory of cipher suites, key lengths, and certificate trust anchors.

> ❝ SPDX is insufficient for industrial cyber-physical systems because it was built for software licensing. CycloneDX 1.6+ is cybersecurity-first. To defend critical infrastructure under EU CRA and IEC 62443, we need all five BOM classes: HBOM for silicon roots of trust (Caliptra, BMCs, ASICs), SBOM for real-time OS and control firmware, OBOM for Modbus/BACnet network configurations and setpoints, CBOM for cryptographic certificates and PQC readiness, and SaaSBOM for remote telemetry. Crucially, CycloneDX enables 100% offline analysis via VEX/VDR, allowing air-gapped industrial facilities to trace supply chain vulnerabilities without cloud connectivity. ❞
>
> *— OT Cybersecurity & Supply Chain Specialist (Industrial Systems Assurance Review)*

## 2. The Five Dimensions of CycloneDX 1.6+

OWASP CycloneDX 1.6+ provides a unified, extensible data model serialized in JSON, XML, and Protocol Buffers. It standardizes five distinct yet interconnected BOM categories.

```
+-------------------------------------------------------------------------+
|                  CYCLONEDX 1.6+ FULL-STACK BOM GRAPH                    |
+-------------------------------------------------------------------------+
|                                                                         |
|  [HBOM] Hardware BOM                                                    |
|  - Silicon: AMD EPYC / NVIDIA Blackwell / Intel Xeon                     |
|  - Micro-controllers: STM32F407, ESP32-S3                               |
|  - Security Elements: Caliptra RoT, TPM 2.0                             |
|       |                                                                 |
|       v mounts / executes                                               |
|  [SBOM] Software BOM                                                    |
|  - OS: FreeRTOS v10.4, Yocto Embedded Linux 5.15                        |
|  - Firmware: BMC OpenBMC v2.14, VFD Control Logic v1.02                 |
|  - Libraries: mbedTLS 3.1.0, lwIP 2.1.3, libmodbus 3.1.6                |
|       |                                                                 |
|       v configured by                                                   |
|  [OBOM] Operations BOM                                                  |
|  - Environment: Docker runtime, systemd services                        |
|  - Network: Modbus TCP Port 502, BACnet UDP 47808, VLAN 102             |
|  - Control Bounds: Max Flow = 45 L/min, Cutoff Temp = 72 deg C          |
|       |                                                                 |
|       +-----------------------------------+                             |
|       |                                   |                             |
|       v secured by                        v communicates via            |
|  [CBOM] Cryptography BOM             [SaaSBOM] Services BOM             |
|  - Protocol: TLS 1.3                 - Endpoint: telemetry.facility.internal |
|  - Cipher: AES-256-GCM               - Protocol: gRPC / mTLS            |
|  - Signature: ML-DSA-65 (PQC)        - Auth: OIDC Client Credentials    |
|  - Cert: Root CA (Exp: 2035)         - Data Flow: Bi-directional Status |
+-------------------------------------------------------------------------+
```

### 2.1 Hardware Bill of Materials (HBOM)
CycloneDX defines hardware components using the `device` and `hardware` component types. An HBOM entry captures:
- Physical packaging, part numbers, and electronic product codes.
- Manufacturer Identifiers and hardware root-of-trust bindings (such as Open Compute Project Caliptra).
- Board revision, hardware errata, and physical interface pins.

```json
{
  "type": "device",
  "bom-ref": "cdu-controller-board-rev2",
  "name": "Cooling Distribution Unit Mainboard",
  "version": "Rev 2.1",
  "supplier": { "name": "Schneider Electric / CoolIT Systems" },
  "hashes": [{ "alg": "SHA-256", "content": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" }],
  "properties": [
    { "name": "caliptra:root_of_trust", "value": "enabled" },
    { "name": "hardware:silicon_stepping", "value": "B0" }
  ]
}
```

### 2.2 Software Bill of Materials (SBOM)
Captures the operating system kernel, device drivers, embedded software libraries, and communication protocol stacks. Each component includes standardized Package URLs (`purl`) and Common Platform Enumerations (`cpe`):

```json
{
  "type": "operating-system",
  "bom-ref": "rtos-freertos-v10-4",
  "name": "FreeRTOS",
  "version": "10.4.3",
  "purl": "pkg:generic/freertos@10.4.3",
  "cpe": "cpe:2.3:o:amazon:freertos:10.4.3:*:*:*:*:*:*:*"
}
```

### 2.3 Operations Bill of Materials (OBOM)
Captures the deployment and operational configuration parameters that determine component behavior in the field. This includes file permissions, environment variables, system limits, and network endpoints:

```json
{
  "type": "data",
  "bom-ref": "obom-modbus-config",
  "name": "Modbus TCP Engine Configuration",
  "properties": [
    { "name": "network:listening_port", "value": "502" },
    { "name": "control:register_range", "value": "40001-40128" },
    { "name": "security:write_access_enabled", "value": "false" }
  ]
}
```

### 2.4 Cryptography Bill of Materials (CBOM)
Introduced as a first-class citizen in CycloneDX 1.6, CBOM inventories cryptographic assets across four distinct object models:
- `cryptographic-assets`: Algorithms (e.g., AES, RSA, Kyber/ML-KEM), key sizes, and NIST security levels.
- `keys`: Public and private key material references, hardware security module (HSM) handles.
- `certificates`: X.509 chains, expiration dates, signature algorithms, and revocation endpoints.
- `protocols`: TLS, SSH, and IPSec configuration postures.

### 2.5 Services & SaaS Bill of Materials (SaaSBOM)
Inventories external cloud APIs, telemetry aggregators, and remote diagnostic channels. It documents endpoint URIs, data classification levels (e.g., telemetry vs command-and-control), and authentication mechanisms.

## 3. Air-Gapped Offline Vulnerability Tracking via VEX and VDR

A non-negotiable operational constraint in nuclear plants, defense facilities, and critical utility networks is the Purdue Model air gap. Level 1 and Level 2 control systems have zero internet connectivity. They cannot query the National Vulnerability Database (NVD) or commercial software vulnerability scanners in real time.

CycloneDX solves this through two deterministic offline artifacts:

### 3.1 Vulnerability Exploitability eXchange (VEX)
VEX enables equipment vendors to publish cryptographically signed assertions declaring the true exploitability status of a known CVE in a specific product context:

1. `not_affected`: The vulnerable code is either not compiled into the binary, unreachable through existing network paths, or neutralized by inline hardware controls.
2. `affected`: The vulnerability is exploitable; remediation action is required.
3. `fixed`: The vulnerability has been resolved in the current revision.
4. `under_investigation`: The vendor is currently evaluating exploitability.

```json
{
  "vulnerabilities": [
    {
      "id": "CVE-2024-38812",
      "source": { "name": "NVD", "url": "https://nvd.nist.gov/vuln/detail/CVE-2024-38812" },
      "analysis": {
        "state": "not_affected",
        "justification": "code_not_reachable",
        "detail": "Vulnerable vCenter directory traversal code resides in optional telemetry daemon not compiled into the micro-CDU firmware image."
      },
      "affects": [{ "ref": "rtos-freertos-v10-4" }]
    }
  ]
}
```

### 3.2 Offline Risk Graph Resolution
In an air-gapped facility, the security assessment workflow operates purely on local files:
1. The facility maintains a local, cryptographically signed mirror of the CycloneDX multi-BOM for all installed equipment.
2. When security advisories are issued, new VEX/VDR documents are brought into the facility via authenticated one-way data diodes.
3. The local digital twin engine evaluates the intersection of the BOM components, network OBOM configurations, and VEX statements without sending a single packet outside the security boundary.

## 4. Connecting Silicon to Physics: The Missing Cyber-Physical Link

Traditional vulnerability analysis stops at the common vulnerability scoring system (CVSS) score. A CVSS 9.8 vulnerability in an embedded RTOS sounds catastrophic, but what does it actually affect?

If the vulnerable micro-controller manages an office badge reader, the consequence is localized. If that same micro-controller controls the proportional bypass valve of a 140 kW direct-to-chip liquid cooling loop, the consequence is silicon destruction.

> ❝ Neither model is sufficient alone. A P&ID knows that tripping valve FCV-201 starves Manifold A, but has no visibility into the firmware running its digital actuator. A CycloneDX SBOM knows that CVE-2024-XXXX exists in the actuator's embedded TCP stack, but cannot calculate that exploiting it spikes GPU junction temperature $T_j > 105^\circ\text{C}$ in 12 seconds. By linking DEXPI equipment tags (Equipment Tag=\"PMP-101A\") directly to CycloneDX bom-ref identifiers, we achieve the holy grail: a cyber-physical graph where cyber exploitability directly drives physical thermodynamic catastrophe simulation. ❞
>
> *— Cyber Digital Twin Architect (Systems Assurance & Graph Topology Lead)*

By embedding physical equipment references directly inside CycloneDX component metadata, the bill of materials becomes an active topological participant in the cyber digital twin.

## 5. Conclusion

Cybersecurity for critical infrastructure cannot rely on fragmented, software-only inventories. OWASP CycloneDX 1.6+ provides the foundational multi-BOM architecture (uniting hardware, software, operations, cryptography, and services) required to verify industrial assets across their entire operational lifespan. When implemented in conjunction with machine-readable VEX feeds, CycloneDX enables complete, offline, air-gapped systems assurance. By pairing CycloneDX with physical plant engineering topology, organizations bridge the final chasm between software vulnerabilities and physical consequences.
