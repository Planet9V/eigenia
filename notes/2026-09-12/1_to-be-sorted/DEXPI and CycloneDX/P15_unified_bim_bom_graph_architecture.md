# Unified DEXPI 2.0 & CycloneDX 1.6+: Bridging Topological BIM and Hierarchical BOM into a Single Computable Graph Schema

## Abstract

Industrial facilities and cyber-physical systems suffer from an ontological disconnect: mechanical and piping engineers model the world as continuous hydraulic and thermodynamic topologies (Building Information Modeling / Piping and Instrumentation Diagrams), while cybersecurity engineers model systems as discrete software, firmware, and hardware dependency trees (Bills of Materials). Neither abstraction alone can predict the cascading physical consequences of a software exploit, nor calculate the digital attack surface exposed by a mechanical reconfiguration. This paper presents the formal specification for the Unified DEXPI 2.0 and CycloneDX 1.6+ Semantic Bridge. We define a single computable graph schema, $G_{\text{CPDT}}$, that joins the physical directed multigraph of DEXPI with the hierarchical component directed acyclic graph (DAG) of CycloneDX. We provide bidirectional property mapping, formalize cross-namespace bindings, and demonstrate how this unified schema enables multi-physics state estimation, offline threat modeling, and deterministic blast radius calculation.

## 1. The Ontological Divide Between BIM and BOM

In engineering physics, a facility is defined by conservation laws: the conservation of mass, momentum, and energy. A heat exchanger, a pump, and a piping manifold are nodes in a continuous differential-algebraic network. Computer-Aided Engineering tools serialize this physical reality into DEXPI 2.0 (ISO 15926 / Proteus XML), describing line numbers, nominal diameters, fluid viscosities, and valve discharge coefficients.

In cybersecurity, a facility is defined by computational state: microarchitectures, cryptographic keys, operating system kernels, and network communication protocols. Security tooling serializes this digital reality into OWASP CycloneDX 1.6+, describing Package URLs (`purl`), Common Vulnerabilities and Exposures (CVE), and hardware root-of-trust signatures.

```
+------------------------------------+      +------------------------------------+
|          THE BIM DOMAIN            |      |          THE BOM DOMAIN            |
|       (Physical / Mechanical)      |      |        (Digital / Silicon)         |
+------------------------------------+      +------------------------------------+
| - DEXPI 2.0 XML Schema             |      | - OWASP CycloneDX 1.6+ JSON        |
| - Continuous Fluid & Thermal P&ID  |      | - Discrete Component Dependency DAG|
| - Conservation of Mass & Energy    |      | - CVEs, VEX Exploitability, PURLs  |
| - ISO 15926 Reference Data Library |      | - HBOM, SBOM, OBOM, CBOM, SaaSBOM  |
| - Actuators, Valves, Pumps, Headers|      | - Firmware, Kernels, Drivers, RoTs |
+------------------------------------+      +------------------------------------+
                  \                                    /
                   \                                  /
                    v                                v
       +------------------------------------------------------------+
       |             THE UNIFIED CYBER DIGITAL TWIN                 |
       |         Single Computable Graph Schema (U-CP-BOM)          |
       |                                                            |
       | - Bidirectional Semantic Binding via Equipment Tags        |
       | - Cyber Exploits Trigger Deterministic Fluid Transients    |
       | - Physical Thermal Envelopes Bound Cyber Mission Duration  |
       | - Offline Static Analysis & Blast Radius Traversal         |
       +------------------------------------------------------------+
```

When an industrial facility operates these two models in isolation, critical vulnerabilities fall between the cracks:
- If a security operations center (SOC) detects a critical vulnerability in an embedded micro-controller, it cannot evaluate whether that micro-controller regulates a primary coolant pump or an auxiliary ventilation damper.
- If a mechanical engineer replaces a failing pump with a higher-flow vendor model, they may unknowingly introduce an unverified third-party communications gateway running vulnerable legacy protocols.

> ❝ Neither model is sufficient alone. A P&ID knows that tripping valve FCV-201 starves Manifold A, but has no visibility into the firmware running its digital actuator. A CycloneDX SBOM knows that CVE-2024-XXXX exists in the actuator's embedded TCP stack, but cannot calculate that exploiting it spikes GPU junction temperature $T_j > 105^\circ\text{C}$ in 12 seconds. By linking DEXPI equipment tags (Equipment Tag=\"PMP-101A\") directly to CycloneDX bom-ref identifiers, we achieve the holy grail: a cyber-physical graph where cyber exploitability directly drives physical thermodynamic catastrophe simulation. ❞
>
> *— Cyber Digital Twin Architect (Systems Assurance & Graph Topology Lead)*

## 2. Mathematical Formulation of the Unified Graph ($G_{\text{CPDT}}$)

We define the Cyber-Physical Digital Twin as a unified attributed directed graph:

$$G_{\text{CPDT}} = (V, E, \Phi_V, \Phi_E)$$

### 2.1 Node Partitioning
The vertex set $V$ is partitioned into physical engineering vertices $V_{\text{phys}}$ (derived from DEXPI 2.0) and cyber component vertices $V_{\text{cyber}}$ (derived from CycloneDX 1.6+):

$$V = V_{\text{phys}} \cup V_{\text{cyber}}$$

Where:
- $V_{\text{phys}} = V_{\text{equipment}} \cup V_{\text{piping\_segment}} \cup V_{\text{nozzle}} \cup V_{\text{instrument\_transducer}}$
- $V_{\text{cyber}} = V_{\text{hardware}} \cup V_{\text{software}} \cup V_{\text{operations}} \cup V_{\text{crypto}} \cup V_{\text{service}}$

### 2.2 Edge Partitioning
The edge set $E$ models physical connectivity, digital dependency, and the ontological bridge:

$$E = E_{\text{hydraulic}} \cup E_{\text{electrical}} \cup E_{\text{dependency}} \cup E_{\text{binding}}$$

1. **Hydraulic Edges ($E_{\text{hydraulic}} \subset V_{\text{phys}} \times V_{\text{phys}}$)**: Represent physical fluid transfer governed by the Navier-Stokes and Darcy-Weisbach equations.
2. **Electrical Edges ($E_{\text{electrical}} \subset V_{\text{phys}} \times V_{\text{phys}}$)**: Represent power distribution and physical signaling circuits.
3. **Cyber Dependency Edges ($E_{\text{dependency}} \subset V_{\text{cyber}} \times V_{\text{cyber}}$)**: Represent hierarchical invocation, dynamic linking, and communication routes within the CycloneDX BOM.
4. **Cross-Ontological Binding Edges ($E_{\text{binding}} \subset V_{\text{phys}} \times V_{\text{cyber}}$)**: Form the explicit semantic bridge linking a physical actuator or sensor in the P&ID to its governing silicon and firmware component tree.

```
[DEXPI P&ID Node: Valve FCV-201] (Physical Equipment)
         |
         |  (E_binding: "controlled_by")
         v
[CycloneDX HBOM: Actuator Motor Controller Board] (Hardware Device)
         |
         |  (E_dependency: "executes")
         v
[CycloneDX SBOM: Actuator Firmware v1.4.2] (Software Component)
         |
         |  (E_dependency: "links")
         v
[CycloneDX SBOM: libmodbus v3.1.4] (Vulnerable Library: CVE-2024-XXXX)
```

## 3. Bidirectional Schema Specification

To allow engineering software and cybersecurity scanners to interact with the unified twin without breaking legacy toolchains, we specify cross-referencing extensions in both formats.

### 3.1 DEXPI 2.0 XML Extension for CycloneDX
In the DEXPI XML document, each `<Equipment>`, `<InstrumentLoop>`, or `<ActuatingSystem>` element contains an explicit `<CycloneDXRef>` element referencing the root component of its bill of materials:

```xml
<Equipment id="EQ-PMP-101A" ComponentClass="CentrifugalPump" TagName="PMP-101A">
  <DesignData>
    <NominalFlowRate unit="m3/h">35.0</NominalFlowRate>
    <DesignPressure unit="bar">16.0</DesignPressure>
    <FluidCode>PG25</FluidCode>
  </DesignData>
  <Nozzles>
    <Nozzle id="NOZ-PMP-101A-IN" NominalDiameter="DN65" FlowDirection="Inlet" />
    <Nozzle id="NOZ-PMP-101A-OUT" NominalDiameter="DN50" FlowDirection="Outlet" />
  </Nozzles>
  <!-- Unified Cyber-Physical Bridge Binding -->
  <ExtensionDomain name="EigeniaCyberDigitalTwin">
    <CycloneDXRef bom-ref="pmp-101a-vfd-assembly" bom-uri="urn:eigenia:bom:facilities:amsterdam-01:cdu-pumps" />
    <SecurityLevelTarget>SL-3</SecurityLevelTarget>
    <PurdueLevel>Level-1</PurdueLevel>
  </ExtensionDomain>
</Equipment>
```

### 3.2 CycloneDX 1.6+ JSON Extension for DEXPI
In the CycloneDX JSON document, the hardware or firmware component incorporates the `dexpi:` property namespace:

```json
{
  "type": "device",
  "bom-ref": "pmp-101a-vfd-assembly",
  "name": "Wilo Stratos MAXO Frequency Converter",
  "supplier": { "name": "Wilo SE" },
  "version": "v02.14.08",
  "properties": [
    { "name": "dexpi:EquipmentId", "value": "EQ-PMP-101A" },
    { "name": "dexpi:EquipmentTag", "value": "PMP-101A" },
    { "name": "dexpi:PipingSegmentInlet", "value": "PIPE-SEC-IN-04" },
    { "name": "dexpi:PipingSegmentOutlet", "value": "PIPE-SEC-OUT-04" },
    { "name": "dexpi:FailureModeConsequence", "value": "HYDRAULIC_STARVATION_SECONDARY_LOOP" }
  ],
  "components": [
    {
      "type": "firmware",
      "bom-ref": "wilo-vfd-firmware-v2-14",
      "name": "VFD Motor Control Logic",
      "version": "2.14.8",
      "properties": [
        { "name": "purdue:level", "value": "1" },
        { "name": "iec62443:sl_capability", "value": "SL-2" }
      ]
    }
  ]
}
```

> ❝ SPDX is insufficient for industrial cyber-physical systems because it was built for software licensing. CycloneDX 1.6+ is cybersecurity-first. To defend critical infrastructure under EU CRA and IEC 62443, we need all five BOM classes: HBOM for silicon roots of trust (Caliptra, BMCs, ASICs), SBOM for real-time OS and control firmware, OBOM for Modbus/BACnet network configurations and setpoints, CBOM for cryptographic certificates and PQC readiness, and SaaSBOM for remote telemetry. Crucially, CycloneDX enables 100% offline analysis via VEX/VDR, allowing air-gapped industrial facilities to trace supply chain vulnerabilities without cloud connectivity. ❞
>
> *— OT Cybersecurity & Supply Chain Specialist (Industrial Systems Assurance Review)*

## 4. Operationalization: Deterministic Blast-Radius Traversal

With the unified graph $G_{\text{CPDT}}$ loaded into an in-memory graph engine (such as NetworkX or Neo4j), algorithms can traverse across cyber and physical boundaries.

### 4.1 Cyber-to-Physical Consequence Mapping Algorithm
When a security scan detects an unmitigated vulnerability:
1. Identify the compromised software component $v_s \in V_{\text{cyber}}$ with Common Vulnerabilities and Exposures identifier $\text{CVE}_i$.
2. Trace incoming dependency edges in $E_{\text{dependency}}$ to locate the parent hardware device $v_h \in V_{\text{cyber}}$.
3. Traverse the cross-ontological binding edge $e_b \in E_{\text{binding}}$ to identify the physical equipment node $v_p \in V_{\text{phys}}$.
4. Execute hydraulic and thermal graph reachability traversals along $E_{\text{hydraulic}}$ downstream from $v_p$ to calculate the physical thermal blast radius.

$$\text{BlastRadius}(v_s) = \bigcup_{e=(u,w) \in E_{\text{hydraulic}}} \{ w \mid \text{flow}(e) < Q_{\text{critical}} \}$$

If $v_p$ is a cooling distribution unit pump, the reachability algorithm identifies every rack, manifold, and computing die served by that hydronic loop. The cyber severity score is no longer an abstract CVSS number; it is the total kilowatts of compute at risk of thermal destruction.

## 5. Conclusion

The unification of DEXPI 2.0 and CycloneDX 1.6+ resolves the fundamental fragmentation of industrial engineering. By anchoring the physical equipment topology of the P&ID directly to the multi-BOM hierarchy of embedded systems, this standard delivers the computable substrate for genuine cyber-physical digital twins. Facility designers, security architects, and plant operators can finally speak a single, mathematically rigorous language.
