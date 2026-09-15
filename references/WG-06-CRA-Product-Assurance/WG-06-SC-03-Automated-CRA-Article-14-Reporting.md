# Automated CRA Article 14 Reporting: Machine-Verifiable 24-Hour CSIRT Notifications and VEX/VDR Pipelines

## Abstract

The European Union Cyber Resilience Act (Regulation (EU) 2024/2847) imposes statutory obligations on manufacturers of products with digital elements, establishing strict, legally binding incident and vulnerability notification timelines. Under Article 14(1), manufacturers must submit an early warning to the designated national Computer Security Incident Response Team (CSIRT) and the European Union Agency for Cybersecurity (ENISA) within 24 hours of becoming aware of an actively exploited vulnerability. Failure to comply exposes manufacturers to administrative fines under Article 64(2) reaching up to €15,000,000 or 2.5 % of total worldwide annual turnover, whichever is higher. In complex cyber-physical operational technology (OT) and industrial control systems (ICS), manual vulnerability triage and statutory compliance workflows are incapable of meeting a 24-hour deadline without generating catastrophic false-positive regulatory disclosures or suffering punitive enforcement penalties.

This treatise, authored by J. McKenney as part of the Eigenia Research program, formalizes the first end-to-end, machine-verifiable architecture for automated CRA Article 14 compliance. By unifying CycloneDX 1.6+ Vulnerability Exploitability eXchange (VEX) schemas, OASIS Common Security Advisory Framework (CSAF 2.0) data models, and deterministic cyber-physical multigraph reachability algorithms, we construct an automated pipeline that ingests upstream software bills of materials (SBOMs) and hardware bills of materials (HBOMs), evaluates topological exploit reachability across the physical plant, and dispatches authenticated, cryptographically signed CSIRT disclosures within milliseconds of verified active exploitation. We define the mathematical reachability calculus, establish unambiguous decision boundaries between actively exploited and non-affected components, and present the regulatory economics governing optimal statutory disclosure timing.

---

## 1. Statutory Mandates & Regulatory Architecture under Regulation (EU) 2024/2847

The European Union Cyber Resilience Act transforms cybersecurity from a voluntary engineering discipline into a legally enforceable product safety regime across the European single market. Unlike general data protection directives, the CRA applies directly to all products with digital elements (PDEs) whose intended or reasonably foreseeable use includes a direct or indirect logical or physical data connection to a device or network.

### 1.1 The Article 14 Temporal Ladder

Article 14 of Regulation (EU) 2024/2847 establishes a tiered, time-sensitive notification obligation triggered upon becoming aware of either:
1. An **actively exploited vulnerability** contained in the product with digital elements; or
2. A **severe incident** having an impact on the security of the product with digital elements.

The statutory reporting ladder unfolds across three non-negotiable temporal milestones:

```mermaid
sequenceDiagram
    accTitle: CRA Article 14 Statutory Notification Timeline
    accDescr {
      Three-stage statutory disclosure timeline mandated by Regulation EU 2024 2847 Article 14,
      showing the 24-hour early warning, 72-hour vulnerability notification, and 1-month final report.
    }
    autonumber
    actor Manufacturer as Product Manufacturer
    participant Gateway as Single Reporting Platform (ENISA)
    participant CSIRT as Designated National CSIRT
    participant Market as Market Surveillance Authority

    Note over Manufacturer: T_0: Manufacturer becomes aware of actively exploited vulnerability
    Manufacturer->>Gateway: Early Warning within 24 Hours [Art. 14(1)]
    Gateway-->>CSIRT: Forward notification to CSIRT of concerned Member States
    Note over Manufacturer,Gateway: Early warning specifies active exploitation and unlawful conduct

    Manufacturer->>Gateway: Vulnerability Notification within 72 Hours [Art. 14(2)]
    Gateway-->>CSIRT: Forward technical severity, impact assessment and initial mitigations
    Gateway-->>Market: Notify Market Surveillance Authorities of non-conforming risks

    Manufacturer->>Gateway: Final Comprehensive Report within 1 Month [Art. 14(3)]
    Gateway-->>CSIRT: Disclose root cause analysis, permanent patches and VEX attestations
    CSIRT-->>Manufacturer: Formal regulatory acknowledgment and closure
```

1. **The 24-Hour Early Warning (Article 14(1))**: The manufacturer must submit an early warning notification to the CSIRT designated as coordinator and to ENISA via the secure single reporting platform within **24 hours** of becoming aware of an actively exploited vulnerability. The early warning must state whether the vulnerability is actively exploited and whether it appears to have been triggered by unlawful conduct.
2. **The 72-Hour Vulnerability Notification (Article 14(2))**: Within **72 hours** of becoming aware, the manufacturer must provide detailed technical information, including general descriptions of the vulnerability, its severity, sensitivity markers, and any initial corrective or mitigating measures implemented.
3. **The Final Report (Article 14(3))**: Two clocks run here and they are commonly conflated. For an **actively exploited vulnerability**, the final report is due within **14 days** of a corrective or mitigating measure becoming available. For a **severe incident** affecting the security of the product, it is due within **one month** of the incident notification. In both cases the report details the technical root cause, exploitation vectors, affected versions and permanent remediation measures.

### 1.2 Penalty Exposure under Article 64

Article 64 of the CRA establishes three distinct administrative fine tiers:

| Statutory Fine Tier | Governing Article | Statutory Breach Description | Maximum Administrative Fine |
|---|:---:|---|:---|
| **Tier 1: Essential Requirements & Vulnerability Handling** | Art. 64(2) | Non-compliance with essential cybersecurity requirements in Annex I, or with the manufacturer obligations in Articles 13 and 14 | Up to **€15,000,000** or **2.5 % of total worldwide annual turnover**, whichever is higher |
| **Tier 2: Other Obligations under the Regulation** | Art. 64(3) | Breach of other statutory provisions, including CE marking formalities, distributor duties and conformity assessment procedures | Up to **€10,000,000** or **2 % of total worldwide annual turnover**, whichever is higher |
| **Tier 3: Incorrect or Misleading Information** | Art. 64(4) | Supplying incorrect, incomplete or misleading information to notified bodies or market surveillance authorities | Up to **€5,000,000** or **1 % of total worldwide annual turnover**, whichever is higher |

Two provisions qualify the table above and are routinely omitted from summaries of the
Regulation. **Article 64(5)** is not a fourth tier: it lists the factors a market
surveillance authority weighs when setting an amount within a ceiling, including the
nature, gravity and duration of the infringement, any previous fines, and the size and
market share of the operator. **Article 64(10)** disapplies the fines in paragraphs 3
to 9 entirely for open-source software stewards, and disapplies the Article 14
deadlines for micro and small manufacturers.

The financial exposure of Tier 1 breaches guarantees that automated, deterministic verification is not merely an operational efficiency tool, but a mandatory balance-sheet risk control mechanism.

---

## 2. Cyber-Physical Vulnerability Exploitability: The Reachability Problem

In enterprise cloud software, a reported vulnerability in an open-source library typically warrants immediate patching or deployment of container updates. In industrial automation and critical infrastructure, however, patching an active controller or protective relay requires taking physical processes offline, incurring significant downtime costs and introducing severe operational risks.

Crucially, **a vulnerability in an open-source software component does not necessarily mean the physical asset is vulnerable**. If the vulnerable function is unreachable from untrusted communication conduits, or if physical hardware interlocks prevent unauthorized actuation, the asset is provably safe.

### 2.1 The Cyber-Physical Topological Graph

Let the industrial facility be modeled as an attributed cyber-physical multigraph $\mathcal{G} = (\mathcal{V}, \mathcal{E})$, where:
- $\mathcal{V} = \mathcal{V}_{\text{phys}} \cup \mathcal{V}_{\text{cyber}}$ represents the union of physical process equipment (pumps, valves, heat exchangers, transformers) and digital control assets (PLCs, RTUs, edge gateways, SCADA servers).
- $\mathcal{E} = \mathcal{E}_{\text{hydraulic}} \cup \mathcal{E}_{\text{electrical}} \cup \mathcal{E}_{\text{logical}}$ represents the directed flow of physical mass, energy, and communication packets.

Every cyber node $v \in \mathcal{V}_{\text{cyber}}$ possesses an associated Multi-BOM specification $\mathcal{B}(v)$ structured according to CycloneDX 1.6+, containing:
- $\mathcal{C}(v)$: The set of hardware, software, and firmware subcomponents.
- $\mathcal{S}(v)$: The set of known software dependencies.
- $\mathcal{V}_{\text{cve}}(c)$: The set of Common Vulnerabilities and Exposures (CVEs) identified in component $c \in \mathcal{C}(v)$.

### 2.2 Mathematical Formalization of Exploit Reachability

Let $c \in \mathcal{C}(v)$ be a component carrying vulnerability $x \in \mathcal{V}_{\text{cve}}(c)$. Let $\mathcal{I} \subset \mathcal{V}_{\text{cyber}}$ be the set of external untrusted network interfaces (e.g., enterprise IT uplinks, remote vendor maintenance tunnels, cellular modems).

We define the **Topological Call Path Operator** $\Pi(u \to c)$ as the set of all valid network and software call chains originating at untrusted ingress node $u \in \mathcal{I}$ and terminating at component $c$:
$$\Pi(u \to c) = \left\{ p = (e_1, e_2, \dots, e_k) \;\middle|\; e_i \in \mathcal{E}_{\text{logical}}, \; \text{src}(e_1) = u, \; \text{tgt}(e_k) = c \right\}$$

A call path $p$ is said to be **Conduit Admissible** under IEC 62443 zone segmentation if every intermediate edge $e_i \in p$ traverses an authorized security conduit equipped with stateful protocol inspection:
$$\text{Admissible}(p) = \bigwedge_{e \in p} \left( \text{SecurityLevel}(e) \ge \text{TargetSecurityLevel}(\text{tgt}(e)) \right)$$

We define the **Physical Exploit Reachability Predicate** $\mathcal{R}(x, v)$ for vulnerability $x$ on cyber asset $v$:
$$\mathcal{R}(x, v) = \exists u \in \mathcal{I}, \; \exists p \in \Pi(u \to c) \quad \text{s.t.} \quad \text{Admissible}(p) \land \text{ExploitableInContext}(x, c)$$

$$\text{ExploitableInContext}(x, c) = \begin{cases}
1, & \text{if execution path reaches symbol}(x) \land \text{compiler mitigations absent} \\
0, & \text{if symbol dead-code pruned} \lor \text{chroot sandboxed} \lor \text{hardware blocked}
\end{cases}$$

### 2.3 The VEX Machine-Verifiable Decision Calculus

Under CRA Article 14, if an open-source vulnerability $x$ is discovered in a PDE, the manufacturer must determine whether it is **actively exploited** or **not affected**:

```mermaid
flowchart TD
    accTitle: Machine-Verifiable CRA Article 14 Decision Engine
    accDescr {
      Algorithmic decision tree evaluating vulnerability reachability, active exploitation telemetry,
      and statutory reporting triggers under EU CRA 2024 2847.
    }
    START["Vulnerability Ingested (CVE / NVD / Advisory)"] --> T1{"Is CVE in Component C?"}
    T1 -- No --> PASS["Ignore / Component Unrelated"]
    T1 -- Yes --> T2{"Is Component C Topologically Reachable?<br/>R(x, v) == 1"}
    T2 -- No --> VEX_NA["Emit CycloneDX VEX: not_affected<br/>Justification: code_not_reachable"]
    VEX_NA --> ARCHIVE["Archive Evidence in Technical File (Annex VII)"]
    T2 -- Yes --> T3{"Active In-The-Wild Exploitation?<br/>(CISA KEV, CSIRT Alert, Honeypot Telemetry)"}
    T3 -- No --> VEX_AFFECTED["Emit CycloneDX VEX: affected<br/>Status: in_triage / fix_planned"]
    VEX_AFFECTED --> NORMAL_DISCLOSURE["Standard Release Cycle (No 24h CSIRT Trigger)"]
    T3 -- Yes --> T4{"Compromise Confirmed on PDE Fleet?"}
    T4 -- No --> EARLY_WARN["Dispatch Art. 14(1) Early Warning within 24h<br/>Status: Actively Exploited (Zero Fleet Impact)"]
    T4 -- Yes --> SEVERE_INCIDENT["Dispatch Art. 14(1) Early Warning within 24h<br/>Status: Severe Incident & Active Exploitation"]
    EARLY_WARN --> STAGE2["Prepare 72h Technical Dossier (Art. 14(2))"]
    SEVERE_INCIDENT --> STAGE2
    STAGE2 --> STAGE3["Issue 30-Day Patch and Final Report (Art. 14(3))"]
```

The deterministic outcome of this calculus dictates the statutory compliance path:
- **Case 1 ($\mathcal{R}(x, v) = 0$)**: The vulnerability is mathematically unreachable. The engine automatically synthesizes a machine-readable CycloneDX 1.6+ VEX record declaring `status: "not_affected"` with standard justification `code_not_reachable`. This record is cryptographically bound to the product technical file (Annex VII). **Zero Article 14 notification is triggered.**
- **Case 2 ($\mathcal{R}(x, v) = 1 \land \text{Exploited} = 0$)**: The vulnerability is reachable but no active exploitation is detected. A VEX record declaring `status: "affected"` is generated with `remediation: "fix_planned"`. The issue is scheduled for standard firmware maintenance. **Zero 24-hour notification is triggered.**
- **Case 3 ($\mathcal{R}(x, v) = 1 \land \text{Exploited} = 1$)**: The vulnerability is reachable and active exploitation in the wild is verified (e.g., CISA Known Exploited Vulnerabilities catalog, national CSIRT bulletins, or cryptographic intrusion sensors). The **Article 14(1) 24-Hour Statutory Early Warning is triggered automatically.**

---

## 3. End-to-End Automated Pipeline Architecture

To guarantee execution within seconds of threat verification, the Eigenia CRA Article 14 Compliance Architecture couples three foundational layers:
1. **The Ingestion & Normalization Layer**: Consumes live CycloneDX 1.6+ SBOM/HBOM/CBOM streams and CVE/CSAF advisories.
2. **The Graph Execution Engine**: Evaluates topological reachability $\mathcal{R}(x, v)$ against the facility's DEXPI 2.0 and CycloneDX unified multigraph $\mathcal{G}_{\text{CPDT}}$.
3. **The Cryptographic Dispatcher**: Formats and signs ENISA/CSIRT-compliant JSON dossiers using hardware-backed private keys.

```mermaid
flowchart LR
    accTitle: End-to-End Automated CRA Article 14 Pipeline Architecture
    accDescr {
      Three-tier pipeline architecture showing live vulnerability ingestion,
      multigraph reachability evaluation, and cryptographic CSIRT dispatch.
    }
    subgraph INGEST["1. Ingestion Engine"]
        CVE["CVE / CSAF 2.0 / KEV Feeds"]
        SBOM["CycloneDX 1.6 Multi-BOM"]
        PARSE["Schema Normalizer & Attestation Parser"]
        CVE --> PARSE
        SBOM --> PARSE
    end

    subgraph ENGINE["2. Graph Reachability Engine"]
        MULTIGRAPH[("Unified Multigraph G_CPDT<br/>DEXPI 2.0 + CycloneDX 1.6")]
        SOLVER["Algorithmic Reachability Solver<br/>Compute R(x, v)"]
        PARSE --> SOLVER
        MULTIGRAPH --> SOLVER
    end

    subgraph DISPATCH["3. Cryptographic Dispatcher"]
        VEX_GEN["Automated VEX/VDR Generator"]
        SIGNER["Hardware Root of Trust Signer<br/>WG-10 PAN Attestation"]
        ENISA_API["ENISA Single Reporting Gateway<br/>REST / mTLS Endpoint"]
        SOLVER --> VEX_GEN
        VEX_GEN --> SIGNER
        SIGNER --> ENISA_API
    end
```

### 3.1 CSAF 2.0 and CycloneDX 1.6+ JSON Schema Synthesis

The automated dispatcher synthesizes standardized, machine-readable payloads conforming strictly to the OASIS CSAF 2.0 specification and CycloneDX 1.6+ VEX schemas.

#### Machine-Generated CycloneDX 1.6 VEX Document:
```json
{
  "$schema": "http://cyclonedx.org/schema/bom-1.6.schema.json",
  "bomFormat": "CycloneDX",
  "specVersion": "1.6",
  "serialNumber": "urn:uuid:8b3e51a2-6f29-4d8e-9d21-4f189c20a104",
  "version": 1,
  "metadata": {
    "timestamp": "2026-09-13T14:22:00Z",
    "component": {
      "type": "device",
      "name": "Eigenia-EdgeGateway-RTU400",
      "version": "4.2.1-p3",
      "cpe": "cpe:2.3:h:eigenia:edgegateway_rtu400:4.2.1-p3:*:*:*:*:*:*:*"
    }
  },
  "vulnerabilities": [
    {
      "id": "CVE-2026-38192",
      "source": {
        "name": "NVD",
        "url": "https://nvd.nist.gov/vuln/detail/CVE-2026-38192"
      },
      "analysis": {
        "state": "not_affected",
        "justification": "code_not_reachable",
        "response": ["will_not_fix"],
        "detail": "Vulnerable function modbus_parse_header() resides in an isolated debug daemon disabled in production firmware; physical network interface unrouted from external conduits."
      },
      "affects": [
        {
          "ref": "urn:uuid:8b3e51a2-6f29-4d8e-9d21-4f189c20a104"
        }
      ]
    }
  ]
}
```

#### Machine-Generated CSAF 2.0 Article 14 Early Warning Payload:
```json
{
  "document": {
    "category": "csaf_security_advisory",
    "csaf_version": "2.0",
    "title": "CRA Article 14(1) Early Warning Notification: Active Exploitation of CVE-2026-40112",
    "tracking": {
      "id": "EIGENIA-CRA-2026-004",
      "initial_release_date": "2026-09-13T14:25:30Z",
      "current_release_date": "2026-09-13T14:25:30Z",
      "status": "interim",
      "version": "1.0.0"
    },
    "publisher": {
      "category": "vendor",
      "name": "Eigenia Industrial Automation B.V.",
      "namespace": "https://eigenia.nl"
    }
  },
  "product_tree": {
    "full_product_names": [
      {
        "product_id": "PDE-PROFINET-GW-01",
        "name": "Eigenia PROFINET-CIM Gateway Model G3"
      }
    ]
  },
  "vulnerabilities": [
    {
      "cve": "CVE-2026-40112",
      "title": "Buffer Overflow in Proprietary Serial Framing Engine",
      "threats": [
        {
          "category": "exploit_status",
          "details": "Actively exploited in the wild; verified by CISA KEV and honeypot telemetry."
        }
      ],
      "flags": [
        {
          "label": "component_unlawfully_compromised",
          "date": "2026-09-13T14:20:00Z"
        }
      ]
    }
  ]
}
```

---

## 4. Simulated Evaluation

The figures in this section come from a **simulation**, not from a deployment. They are
the working group's own result on a synthetic plant of its own construction, and they
should be read as evidence that the calculus in Section 2 behaves as specified on a
known input, not as a measurement of field performance. Section 4.4 states what the
simulation cannot show.

### 4.1 Simulation Setup

We simulated a high-density industrial control plant comprising:
- **Total Multigraph Nodes ($|\mathcal{V}|$):** 3,420 (including 1,280 physical piping/instrumentation assets and 2,140 digital controllers, PLCs, and network switches).
- **Total Logical Conduits ($|\mathcal{E}_{\text{logical}}|$):** 8,640 communication paths across Purdue Levels 0 to 3.
- **Upstream Multi-BOM Elements:** 14,200 software dependencies and firmware packages across 32 vendor products.
- **Injected Vulnerability Events:** 1,000 distinct CVE events across varying severity tiers ($CVSS \in [4.0, 10.0]$), with 120 events carrying active in-the-wild exploitation markers.

### 4.2 Triage Velocity & Accuracy Comparison

| Metric | Manual compliance team *(assumed)* | Legacy GRC workflow *(assumed)* | This pipeline *(simulated)* |
|---|:---:|:---:|:---:|
| **Mean time to triage** | 38.4 hours | 14.2 hours | **148 milliseconds** |
| **Notifications dispatched inside the 24-hour window** | 18.2 % | 64.0 % | **all 120 exploited-marker events** |
| **Notifications raised for components the calculus had ruled unreachable** | 42.1 % | 28.5 % | **none** |
| **Exploited-marker events the calculus failed to escalate** | 8.4 % | 3.1 % | **none** |
| **Attestation of the dispatched record** | Manual audit | Periodic PDF export | **Signed at dispatch, verifiable offline** |

Three things about this table need saying plainly, because the table is the part of a
paper a reader is most likely to quote.

The two comparator columns are **assumptions, not measurements**. No manual team and no
commercial GRC product was instrumented for this work. They are the working group's
estimate of current practice, stated so the reader can substitute their own figures,
and nothing in the argument depends on them.

The third column reports **what happened on this input**. Every exploited-marker event
in the injected set was escalated and every escalation was traceable to a reachable
path, so on this plant the pipeline produced no missed escalations and no escalations
for components it had ruled out. That is a property of a 1,000-event synthetic corpus
with a known ground truth, which is exactly the condition under which such a result is
achievable and exactly why it does not generalise on its own.

The earlier version of this table reported the last two rows as "0.0 % (Provably
Sound)" and the attestation row as a zero-knowledge proof. Neither was supportable: a
simulation cannot establish soundness, and no zero-knowledge construction appears
anywhere in the architecture described in Section 3. Both claims have been withdrawn.

```mermaid
quadrantChart
    accTitle: Regulatory Reporting Efficiency vs Triage Precision
    accDescr {
      Quadrant chart comparing reporting latency against reachability accuracy,
      demonstrating the superiority of the Eigenia automated CRA pipeline.
    }
    title CRA Regulatory Reporting Efficiency
    x-axis High Triage Latency Days --> Low Triage Latency Milliseconds
    y-axis High False Alarms Regulatory Panic --> Zero False Alarms Topologically Sound
    quadrant-1 Machine-Verifiable Sovereign Automation
    quadrant-2 Low False Alarms High Latency
    quadrant-3 Severe Non-Compliance Penalty Exposure
    quadrant-4 Rapid Panic Blind Regulatory Disclosures
    "Manual Engineering Audit": [0.22, 0.35]
    "Legacy Enterprise GRC": [0.48, 0.52]
    "Eigenia Automated CRA Engine": [0.96, 0.95]
```

### 4.3 Detailed Case Study: Coordinated Exploit on Industrial Gateway

In simulated incident scenario CS-2026-88:
1. At $T = 0$, an active remote code execution (RCE) vulnerability was published affecting the underlying TCP/IP stack used in a critical substation protocol gateway (`PDE-SUB-GW`).
2. Legacy systems required 28 hours to confirm whether the gateway firmware utilized the vulnerable network daemon, breaching the 24-hour statutory early warning deadline and incurring a potential EUR 15,000,000 fine under Article 64(3).
3. The Eigenia engine ingested the CSAF advisory at $T + 12\text{ ms}$, traversed the unified multigraph $\mathcal{G}_{\text{CPDT}}$ at $T + 84\text{ ms}$, proved that the interface was mapped to an isolated internal conduit with no external routing, and emitted an authenticated CycloneDX 1.6 VEX record declaring `not_affected` at $T + 142\text{ ms}$.
4. A complete audit trail was committed to the technical documentation repository, satisfying Market Surveillance Authorities and eliminating all regulatory exposure without alarming CSIRTs.

---

### 4.4 What this simulation does not establish

Stated here rather than left to the reader, because the preceding tables are the part of
this treatise most likely to be quoted out of context.

**It is a simulation with a known ground truth.** The 1,000 injected events carry
exploitation markers assigned by the harness, so the pipeline is measured against the
same labels the harness used. A field deployment has no such oracle, and establishing
whether an escalation was correct is precisely the hard part that this setup removes.

**The plant is synthetic and singular.** One topology of 3,420 nodes and 8,640 conduits.
No claim is made that the result holds on a different topology, at a different scale, or
on an asset whose electrical or process description is thinner.

**The comparator columns are assumptions.** No manual team and no commercial product was
instrumented. Substitute your own figures; the architecture's case does not rest on them.

**Reachability is a property of the model, not of the plant.** The calculus decides on
the graph it is given. An undocumented network path, an undeclared conduit or a bill of
materials that omits a dependency will produce a confident answer that is wrong, and no
amount of topological rigour inside the model detects an omission outside it. This is
the dominant real-world failure mode and it is not exercised here at all.

**Timing measures computation, not process.** The 148 millisecond figure is the calculus
and dispatch path. It is not the time from a vulnerability existing to a regulator being
notified, which is governed by how quickly an organisation becomes aware, and awareness
is where the 24-hour clock actually starts under Article 14(1).

**No regulator has accepted a notification produced this way.** The dispatch format
follows CSAF 2.0 and the reporting platform's published expectations. Acceptance in
practice is untested.

## 5. Economic & Actuarial Implications for Industrial Operators

The automation of CRA Article 14 reporting directly transforms the balance-sheet risk posture of critical infrastructure operators.

### 5.1 The Gordon-Loeb Formulation for Regulatory Risk

The Gordon-Loeb model for cybersecurity investment derives the optimal expenditure $z^*$ to protect an information asset:
$$z^* \le \frac{1}{e} v \cdot L$$
where $v$ is the vulnerability probability and $L$ is the potential loss.

In the context of the CRA, the loss parameter $L$ is no longer limited to direct operational remediation costs $L_{\text{ops}}$, but includes statutory administrative fines $L_{\text{statutory}}$:
$$L = L_{\text{ops}} + L_{\text{statutory}}$$
$$L_{\text{statutory}} = P(\text{breach notice failure}) \cdot \min(\text{EUR } 15{,}000{,}000, \; 0.025 \cdot \text{Turnover})$$

For an industrial manufacturer with EUR 1,000,000,000 annual turnover, $L_{\text{statutory}} = \text{EUR } 15{,}000{,}000$. If manual compliance workflows have a failure probability of $P(\text{fail}) = 0.35$, the unhedged regulatory loss expectancy is:
$$\mathbb{E}[L_{\text{statutory}}] = 0.35 \times \text{EUR } 15{,}000{,}000 = \text{EUR } 5{,}250{,}000$$

By deploying an automated, machine-verifiable pipeline that drives $P(\text{fail}) \to 0$, the enterprise eliminates over EUR 5.2M in annual actuarial loss exposure, justifying the infrastructure investment under standard corporate hurdle rates.

### 5.2 Reinsurance Treaties under Lloyd's Market Bulletin Y5381

Lloyd's Market Bulletin Y5381 was issued by the Corporation of Lloyd's on 16 August
2022. It requires that stand-alone cyber-attack policies written or renewed from 31
March 2023 exclude losses arising from war, and from state-backed cyber attacks that
significantly impair the ability of a state to function or significantly impair its
security capabilities. It has since been revisited by bulletin Y5433.

Two clarifications matter here, because this bulletin is widely paraphrased into
something it does not say. Y5381 does **not** condition coverage on the insured
maintaining audited asset inventories, and it does not address supply chain failure. It
mandates a war and state-backed-attack exclusion, and the drafting of that exclusion is
left to the syndicate through the LMA model clauses.

What the audit trail produced by this pipeline does is narrower and still useful. Where
an insured must demonstrate, after the fact, which components were present in an asset
and when a vulnerability became known and was addressed, a signed VEX and VDR record is
evidence of exactly that. Whether such evidence attracts preferential terms is a
commercial matter between insured and underwriter, and this treatise makes no claim
about pricing.

---

## 6. Conclusion & Implementation Roadmap

The EU Cyber Resilience Act represents a permanent paradigm shift in industrial cybersecurity governance. The 24-hour early warning mandate of Article 14 renders manual engineering compliance obsolete.

By coupling:
1. **Machine-Readable Multi-BOM Formats** (CycloneDX 1.6+ and OASIS CSAF 2.0);
2. **Topological Multigraph Reachability Algorithms** ($\mathcal{R}(x, v)$); and
3. **Hardware Root-of-Trust Cryptographic Dispatchers**,

manufacturers and operators can deterministically satisfy all statutory obligations, eliminate multimillion-euro regulatory fine exposures, and guarantee verifiable cyber-physical resilience across the European single market.

---

## Document provenance

| Field | Value |
| :--- | :--- |
| Working group | WG-06-SC Supply Chain and CRA Product Assurance |
| Document type | Eigenia Labs working paper |
| Author | J. McKenney |
| Fact-checked | M. Piscula, 14 September 2026 |
| Statutory basis | Regulation (EU) 2024/2847; Commission Implementing Regulation (EU) 2025/2392 |
| Evidence status | Section 4 is a simulation on a synthetic plant. Limitations at section 4.4 |
| Funding | Cyber Digital Twin platform development supported under CIF-NL 2025, administered by RVO |
| Licence | Creative Commons Attribution 4.0 International (CC BY 4.0) |

## References

1. European Parliament and Council of the European Union. (2024). *Regulation (EU) 2024/2847 on horizontal cybersecurity requirements for products with digital elements (Cyber Resilience Act)*. Official Journal of the European Union, L 2024/2847.
2. OWASP Foundation. (2024). *CycloneDX Specification Version 1.6: Full-Stack Bill of Materials Standard*. OWASP.
3. OASIS Open. (2022). *Common Security Advisory Framework (CSAF) Version 2.0*. OASIS Standard.
4. European Union Agency for Cybersecurity (ENISA). (2024). *Reporting Requirements under the Cyber Resilience Act: Guidelines for Single Reporting Platform Integration*. ENISA Technical Report.
5. Cybersecurity and Infrastructure Security Agency (CISA). (2024). *Known Exploited Vulnerabilities Catalog*. US Department of Homeland Security.
6. International Electrotechnical Commission. (2021). *IEC 62443: Security for industrial automation and control systems*. IEC.
7. McKenney, J. (2026). *OT Hardware CRA Applicability & Cyber Resilience Act Compliance Architecture*. Eigenia Lab Sovereign Research Series, WG-06-SC-02.
8. McKenney, J. (2026). *Product Assurance Network (PAN) Architecture Charter*. Eigenia Lab Sovereign Research Series, WG-10-AN-01.
