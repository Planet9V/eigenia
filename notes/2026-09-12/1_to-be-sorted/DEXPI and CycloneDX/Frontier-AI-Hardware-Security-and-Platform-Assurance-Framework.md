# Frontier AI Hardware Security & Platform Assurance Framework

**Classification:** Open Industry Architecture Specification  
**Version:** 1.0 (Post-Workshop Synthesis)  
**Date:** September 2026

**Author:** J. McKenney (Systems Assurance Lead)  
**Affiliation:** Applied Complexity & Critical Infrastructure Security

# This document is an informal follow-up to the late August 2026 workshop during the technical workshop. It captures my core observations, key takeaways, and critical commercial and engineering success factors, then proposes a concrete program of work.

Challenge: Frontier AI model weights are $500M+ assets that must be defended against sovereign-tier extraction. Frontier AI Labs require hardware-enforced zero trust that protects weights even if the host CPU or facility network is compromised. Semiconductor Manufacturer needs a structured way to deliver trusted silicon and rack architectures without derailing multi-year tape-out schedules.

Looking Forward: Coordinating rapid software deployment, multi-year silicon hardware and silicon engineering cycles requires a shared baseline. This proposed program of work couples a Uniform Platform Security Document (UPSD) with a Dual-Pacing V-Model Program—locking critical protections (such as Annex 7) into current N-1 platforms (N-1 Reference System/Host Server CPU) today, while locking in the architecture for Gen 6 zero-trust silicon tomorrow.

Part 1: Workshop Follow-up

Observations

Workshop takeaways, trust boundary definitions, potential assurance gaps

Key Takeaways

4 Critical Capabilities: locked kernels, egress throttling, machine-speed falsification, Annex 7

Key Success Factors

Commercial, operations, development and multi-vendor alignment

Part 2: Looking Forward

1. Strategic Proposal

2. Strategic Program Structure & Approach

3. The 5 Guiding Principles

Zero Trust at Silicon Boundary (Distrust the Host)

Cyber-Physical RAMS Convergence (Safety & Availability)

Machine-to-Machine Open Standards (Supply Chain Transparency)

Machine-Speed Falsification (Continuous Verification)

Open Platform Initialization (Cradle-to-Grave Provenance)

4. 3-Horizon Framework

6 Months

18 Months

5-6 Years

5. Multi-Vendor Model

6. 90 Day Action Plan

7. Glossary & Standards Referenced

## Part 1: Executive Workshop Observations & Takeaways

Observations From workshop session

Primary Objective: "Frontier model weights must be defended against sovereign-tier extraction."

Frontier Model ASL-3 / ASL-4 Containment & Security Requirements

Silicon as the Non-Negotiable Trust Boundary: Frontier AI Labs establish that chip architecture is an immutable security perimeter, requiring hardware-enforced zero-trust isolation where GPUs distrust host CPUs, operating systems, and baseboard management controllers (BMCs) to protect proprietary model weights and custom inference kernels

Unified Platform Threat Model Gap: The workshop identified a potential gap in Threat Modeling and validated controls across its platform security stack and committed to co-developing an end-to-end threat model bridging silicon, chassis firmware, out-of-band management, and facility operational technology (OT)

4-Point Hardware Cryptographic Envelope: The workshop identified that protecting frontier weights requires line-rate hardware encryption across scale-up links, inference kernel enclaves, host-device memory buses, and high-speed network interfaces

Hardware Egress Rate-Limiting: Non-token telemetry, debug, and sideband channels originating from GPU trays must be strictly rate-limited in silicon to close covert weight exfiltration pathways

Clarity on N-1 vs. Gen 6: Frontier AI Labs require deterministic verification of what exact protections apply to the clusters being deployed next quarter versus what is deferred to the 6-year silicon roadmap.

Constraints on cadence: Semiconductor hardware engineering teams cannot move at the speed of software sprints, and software teams cannot wait for 5-year silicon tape-outs

Uniform Platform Security Document (UPSD) Baseline: A proposed "single source of truth" for all Frontier AI deployments. The proposed "UPSD" could be used for the semiconductor platform to serve as the authoritative single source of truth governing verified production security features, hardware configurations, and active procurement contracts

Machine-Speed Automated Falsification: The workshop discussed a "Autonomous AI-Augmented vulnerability discovery, testing and validation" process, that would enable the transition from manual PSIRT cycles to automated testbenches using Autonomous Agentic-generated exploit hypotheses paired with hardware-in-the-loop (HIL) emulation. This includes testing hypotheses at  machine speed to meet the pace of model development and deployment, AI-based adversaries and the scaling volume of reported vulnerabilities and exploits.  This capability  requires increased transparency of bill of materials and emulation platforms of Frontier AI Lab used  products and platforms for Frontier AI Lab  to co-test with Semiconductor Manufacturer

Open Platform Firmware (OpenSIL) Migration:  Potential replacement of proprietary Legacy Proprietary Initialization Firmware (transitioning to OpenSIL) and BIOS binary blobs with open-source OpenSIL on coreboot, cutting maintenance overhead by up to 80% and enabling transparent boot code inspection

Independent 6-Site Manufacturing HSM Audit: For Supply and Value Chain security for the full manufacturing process, A high degree of confidence of provenance and integrity is required to support high value Model weights and IP:  The formalization of the manufacturing process into an auditable standard across each of AMDs  global HSM provisioning sites to map key injection flows and prepare for Gen 6 on-die asymmetric key generation and support flow down contractual obligations to silicon value and supply chain partners.

Supply Chain Transparency & EU CRA Alignment: The partnership requires semiconductor alignment to Cyber Resilience Act (CRA) for  products delivered to Frontier AI data center facilities, To support this  semiconductor platforms could improve  Supply Chain Transparency   provide machine-readable M2M schema (HBOM/CBOM/SBOM/OBOM) This could be expanded  with the development of an open coordinator for the supply chain with multi vendor support to satisfy EU Cyber Resilience Act requirements and support a more transparent ecosystem

Cyber-Physical Facility Risk Convergence: Physical datacenter systems—including liquid cooling distribution units (CDUs), 48V power busbars, and environmental controls—are formally classified as direct attack vectors governed by IEC 62443 and CLC/TS 50701 industrial safety frameworks

Post-Quantum Cryptography (PQC) Silicon Roadmap: Next-generation silicon will integrate the open-source Caliptra Silicon Root of Trust with NSA CNSA 2.0 quantum-resistant algorithms (ML-DSA-87 and LMS stateful hash signing).

## Key Takeaways

### Observed Required Critical Capabilities

Locked GPU Execution to reject arbitrary host code injection

Egress Bandwidth Throttling to choke covert sideband weight exfiltration channels

Machine-Speed Falsification to enable Autonomous Agent-driven testbenches to proactively find and validate security vulnerabilities before attackers

Annex 7 Contract Terms bind semiconductor manufacturers, ODMs, and system integrators to verifiable security deliverables

## Key Success Factors

### Key Success Factors & Strategic Enablers

SOW Funding Structure: Structuring this engagement around rolling quarterly SOWs tied to formal V-Model and  engineering gates allows the semiconductor partner to resource dedicated headcount (systems assurance, firmware engineers) without committing to open-ended R&D liabilities

EU CRA as a Market Enabler: Turning the September 11, 2026 EU Cyber Resilience Act (CRA) compliance into an automated M2M coordinator repository gives open silicon architectures a major competitive advantage across European and global hyperscale deployments

Asynchronous Cycles of Hardware, Software &:  Hardware teams cannot move at the speed of software sprints, and software teams cannot wait for 5-year silicon tape-outs. A N-1 vs N approach is required where N is current gen and N-1 is next gen. A model for program management that manages the interface between N and N-1 is required  supporting commercial interests with need for the rolling quarterly funding, and SOW requirements and reporting to meet objectives and commercial obligations and deliver tangible results in AI software capabilities, hardware features and integrations, and facility integrations

Brownfield and Trust Boundaries: The operator’s challenge with brownfield is managing the “entanglement” between the AI compute zone and legacy IT/Operational Technology (OT). The definition of the "AI Rack Envelope" (compute, power, cooling, storage, and network interfaces) needs to be established. The AI Rack Envelope is designed to be “air gapped” or strictly firewalled, but the reality of migration or integration often involves connecting these two worlds. The risk is that if the brownfield legacy IT / OT network has latent vulnerabilities (unpatched servers, open ports, weak access controls), attackers can use it as a pivot point to move laterally into the AI zone and access or manipulate the hardware or firmware

Automated Security Testing: Ensure the Autonomous Agent-driven testing engine focuses on hardware interface boundaries, NetFPGA emulation, and firmware state machines without exposing Frontier AI Lab's confidential model weights to test environments

OpenSIL Timeline: Replacing Legacy Proprietary Initialization Firmware (transitioning to OpenSIL) with OpenSIL on coreboot for Host Server CPU is actively underway, but customer-specific validation takes time. An 18-month Horizon 2 deliverable is realistic

"Distrust the Host" engineering deliverable: On current N-1 platforms (N-1 Reference System / Gen 6 AI Accelerator paired with Host Server CPUs), the host CPU owns the PCIe root complex and initial memory mapping. It would be challenging to deliver the full Zero Trust isolation on N-1; we can only deliver host access restriction and telemetry throttling. True zero-trust silicon isolation requires the Gen 6 hardware memory firewall (5-6 years). The program manager must maintain this clear distinction

Co-design & Transparency: Frontier AI Labs are evaluating significant cluster allocations. NVIDIA's stack is closed, proprietary, and rigid. By offering OpenSIL transparency, machine-readable M2M schemas (DEXPI/CycloneDX), and joint architectural co-design, Semiconductor Manufacturer establishes a differentiated strategic partnership that NVIDIA's closed ecosystem cannot match

# Part 2:  Looking Forward

# 1. Strategic Proposal - Program Structure & Approach



"Frontier model weights must be defended against sovereign-tier extraction."

Frontier Model ASL-3 / ASL-4 Containment & Security Requirements

## 1.1 Preface

As artificial intelligence systems scale to gigawatt-class datacenters and clusters of hundreds of thousands of interconnected accelerators, the fundamental security model of modern computing breaks down. The primary assets of frontier AI—proprietary model weights and custom inference execution pipelines—currently run on hardware architectures that implicitly trust the host CPU, the operating system kernel, the baseboard management controller (BMC), and multi-tiered global supply chains.

Under Frontier Model Responsible Scaling Policies (ASL-3 and ASL-4 equivalent tiers), hardware platforms hosting frontier models must enforce zero-trust isolation against host compromise, nation-state side-channel extraction, and physical supply chain tampering. Scaling frontier AI responsibly demands open interoperability between semiconductor designers, hyperscale cloud providers, original design manufacturers (ODMs), and international standards bodies.

## 1.2 The Strategic Imperative: Securing the AI Platform and Facility

Frontier AI models represent concentrated intellectual property, critical infrastructure dependencies, and strategic sovereign assets. Securing a  model checkpoint requires defending the entire cyber-physical stack. Today, modern hyperscale datacenters exhibit five systemic vulnerabilities:

Implicit Host Trust: Accelerator ASICs treat host CPUs, system memory, and hypervisors as trusted entities. A compromise in the host operating system kernel or baseboard management controller (BMC) exposes raw model weights in High Bandwidth Memory (HBM) and unencrypted tensor interconnects.

Disconnected Physical and Cyber Safety: Facility systems (coolant distribution units, manifolds, secondary cooling loops, 48V power busbars) operate on flat operational technology (OT) networks without formal safety-to-security derivation chains. Physical manipulation of flow rates or power transients can induce clock-glitch faults, thermal throttles, or side-channel leakage during kernel execution.

Supply Chain Opacity: Concentrated manufacturing across overseas original design manufacturers (ODMs) and sub-tier component vendors makes static, PDF-based security questionnaires obsolete. Hardware bills of materials (HBOMs) and firmware states are rarely cryptographically verifiable at delivery.

Human-Speed Vulnerability Management: Traditional Product Security Incident Response Teams (PSIRTs) operate on human triage cycles of weeks or months, while automated exploitation frameworks operate at machine speed.

Proprietary Firmware Blobs: Closed-source platform initialization routines (such as legacy Legacy Proprietary Initialization Firmware (transitioning to OpenSIL) and BIOS blobs) prevent operators from auditing the silicon root of trust and inspecting early boot execution sequences.

To address these vulnerabilities, the ecosystem of software and hardware supporting AI Models must progress from reactive and ad hoc security patches to a zero-trust approach that includes the platform firmware, accelerator silicon,  and  in the physical and silicon plumbing of the datacenter.

# 2. Proposed Strategic Program & Approach

## Strategic Partnership between Frontier AI Model Operators and Semiconductor Silicon Manufacturers requires a framework that bridges platform firmware, accelerator silicon and physical datacenter engineering into a unified zero-trust architecture. A unified view that ensures consolidation of all current-state audits, platform baselines, and verification protocols in a single authoritative source of truth for all parties to reference.

## 2.1 Proposed Primary artifact

The  Uniform Platform Security Document (UPSD) is a  shared platform artifact that establishes a single authoritative source of truth across the Silicon-Provider/AI-Lab partnership ecosystem. This serves as a shared reference for agreed-upon security baselines, cryptographic standards, supply chain requirements and firmware verification protocols.

## 2.2 Adoption of Dual-pacing and Gated Approach

To maintain engineering rigor while accommodating commercial agility (rolling quarterly budgets under existing commercial terms), a "Dual-Pacing Approach" is proposed. This approach balances commercial quarterly cadence with engineering gate reviews to provide a framework with; measurements, clear SOW vehicles, engineering cadence & rigor, transition of work to operations (MOC), and preserves Verification Protocols required by engineering. This balances flexibility with the rigid structure of hardware and silicon engineering cycles facilitating Semiconductor Silicon Manufacturers and Frontier AI Model Developers to meet their respective business and engineering needs. This approach is modeled after successful practices employed in rail, energy, manufacturing and avionic industries.

2.2.2 A Dual-Pacing Approach

A An applied "Dual-Pace" establishes three independent, parallel V-cycles that operate at different execution speeds:

Fast-Paced V-Cycle (Horizon 1, 6 months): Focuses on N-1 platforms (N-1 Reference System / Host Server CPU), surveying current key provisioning flows, delivering the UPSD source of truth, and locking Annex 7 contract terms

Medium-Paced V-Cycle (Horizon 2, 18 months): Focuses on software, automated falsification engines, open firmware (OpenSIL), and EU CRA supply chain schemas

Slow-Paced V-Cycle (Horizon 3, 6 years): Focuses on multi-year silicon co-design (Gen 6 on-die keys, Caliptra PQC, 4-point hardware crypto envelope)

### 2.2.2 Gate Reviews

Each cycle passes through four standardized EN 50126 gates:

Gate 1 (Definition): Scoping, Concept of Operations, and baseline asset register

Gate 2 (Requirements & Derivation): FMECA, Target Security Level calibration ($SL\text{-}T$), and interface specifications

Gate 3 (Verification & Testing): Hardware-in-the-loop validation and automated test harness execution

Gate 4 (Acceptance & SOW Closeout): Formal sign-off, SecRAC allocation, and quarterly budget release

### 2.2.3 Relevant Standards and Best Practices

To maintain engineering rigor while accommodating commercial agility (rolling quarterly budgets under existing commercial terms), we adapt proven industrial systems engineering frameworks:

CENELEC EN 50126-1 (Railway RAMS Lifecycle): Structured V-model governance from concept to operation

CENELEC CLC/TS 50701:2023 / IEC 63452: Cyber-physical security derivation linking physical safety hazards directly to digital threats

IEC 62443 Series: Zone and conduit segmentation, Capability Security Levels (SL-C), and Target Security Levels (SL-T)

Management of Change (MOC) & Verification Protocols (VP-01 to VP-05): Verifiable evidence gates governing production acceptance


| APPROACH 1: DUAL-PACING V-MODEL |
| --- |
| Horizon | Timeframe | Q1-Q2 | Q3-Q4 | Year 2 | Years 3-6 |
| Horizon 1 (Fast) | 6 Months | [ConOps] ──► [Annex 7] |  |  |  |
| Horizon 2 (Medium) | 18 Months | [CRA Mandate] | [DEXPI Schema] | [OpenSIL/Autonomous Agentic System HIL] |  |
| Horizon 3 (Slow) | 5-6 Years | [Zero-Trust Req] | [Crypto Spec] | [Tape-Out] | [Silicon Bring-Up] |


# 3. Proposed Guiding Principles

Five Guiding Principles

Zero Trust at Silicon Boundary ("Distrust the Host")  Distrust host CPU/OS; lock GPU execution; hardware-isolate High Bandwidth Memory (HBM).

Cyber-Physical RAMS Convergence (Safety & Availability Adapt IEC 62443 and TS 50701 / IEC 63452 to treat cooling, power, and BMCs as direct security vectors.

Machine-to-Machine Open Standards (Supply Chain Transparency)  Unified digital twin using DEXPI 2.0 (Plant/P&ID) and CycloneDX 1.6 (Hierarchical HBOM/SBOM/DICE).

Machine-Speed Falsification (Continuous Verification)  Replace manual PSIRT triage with Autonomous Agent-driven exploit generation and hardware-in-the-loop (HIL) emulation.

Open Platform Initialization (Cradle-to-Grave Provenance)  Phase out proprietary Legacy Proprietary Initialization Firmware (transitioning to OpenSIL)/BIOS blobs in favor of OpenSIL, coreboot, and 6-site HSM state surveys.

## 3.1 Principle 1: Zero Trust at the Silicon Boundary ("Distrust the Host")

Frontier AI model weights represent concentrated intellectual property and sovereign-tier assets. Accelerators must treat the host CPU, operating system kernel, hypervisor, and BMC as untrusted entities. Core Defensive Mechanisms include:

Locked Kernel Execution: GPUs reject arbitrary runtime code injection and host debug hooks, executing only cryptographically signed inference kernels verified against on-die keys.

Hardware Memory Firewalling: High Bandwidth Memory (HBM) is isolated from host physical memory mapping. On $N-1$ platforms (N-1 Reference System / Host Server CPU), host DMA access is constrained via firmware access control tables; next-generation silicon (Gen 6) introduces on-die hardware memory firewalls.

Non-Token Egress Rate Limiting: Non-token telemetry, debug traces, and sideband channels are rate-limited in silicon to single-digit KB/s to eliminate covert channel weight exfiltration.

### Recommendation:  Implement The 4-Point Hardware Cryptographic Envelope

Scale-Up Interconnects: Line-rate hardware encryption across intra-tray Infinity Fabric and UA-Link meshes.

Inference Kernel Enclaves: Isolated execution environments with hardware attestation for proprietary model architectures.

Host-Device Buses: Authenticated PCIe Gen 5/6 and CXL buses preventing host root-complex eavesdropping during weight loading.

Scale-Out Fabric: Line-rate 800G/1.6T RoCE and DPU packet encryption across the datacenter cluster network.

## 3.2 Principle 2: Cyber-Physical Security Convergence

In hyperscale AI facilities, physical facility failures (cooling disruptions, voltage droops) and digital security failures (firmware tampering, weight extraction) are interdependent failure modes already addressed by high-consequence industrial assurance methods.

### Recommendation: Adapt known Industrial Assurance Methodologies

3.2.1.1 Framework Adaptation (IEC 62443, CENELEC EN 50126, and CLC/TS 50701 / IEC 63452): Adapt the formal cyber-physical derivation chain used in high-consequence railway and industrial installations: $$\text{ConOps} \longrightarrow \text{FMECA} \longrightarrow \text{Hazard Log} \longrightarrow \text{Target Security Level (SL-T)} \longrightarrow \text{Zones and Conduits}$$

3.2.1.2 Mathematical Security Calibration: Mathematically derive Target Security Levels (SL-T) per zone based on impact severity and attacker capability: $$\text{SL-T} = \text{IC} + \text{AC} - 1$$

3.2.1.3 Physical-to-Logical Containment: Liquid cooling manifolds, leak detection circuits, and power busbars must be isolated into dedicated security zones (SL-T 3) with autonomous hardware interlocks that prevent physical state manipulation from corrupting compute integrity or extracting model weights.

### 3.2.2 The "AI Rack Envelope" Concept

The AI Rack Envelope defines the physical, electrical, thermal, and logical perimeter that isolates a high-density (100kW+) compute rack from the broader datacenter facility. Based on a typical hyperscale reference architecture, exactly eight discrete physical and logical conduits cross this boundary:

1. Primary Power Infeed (Inbound): 400V AC power drops feeding an internal 48V DC busbar through N+1 OCP power shelves.

2. Liquid Coolant Supply (Inbound): Treated water-glycol (PG25) delivered at 32°C through quick-disconnect manifolds directly to chassis cold plates.

3. Liquid Coolant Return (Outbound): Warm fluid exhausting at 40°C–45°C back to the row coolant distribution unit (CDU).

4. Residual Cold-Aisle Airflow (Inbound): Convective airflow from computer room air handlers (CRAHs) cooling non-liquid power supplies, VRMs, and optical transceivers.

5. Scacel-UP / Production Frontend Uplink (Bidirectional): Dual 100G/400G RoCE/Ethernet uplinks connecting compute trays to end-of-row distribution switches for job scheduling, dataset ingestion, and checkpoint storage.

6. Out-of-Band Serial Console (Bidirectional): RS-232 serial links (9600–115200 baud) wired to an advanced console server for bare-metal kernel recovery.

7. BMC / Redfish Management Link (Bidirectional): Dedicated out-of-band management Ethernet running IPMI and Redfish APIs to the baseboard management controller (designated as a Critical Conduit).

8. Scale-Out / Scale-Up Accelerator Fabric (Bidirectional): High-speed optical trunks (800G InfiniBand, RoCE, or UA-Link) linking GPUs directly across peer racks for distributed tensor operations.

### 3.2.3 Align Facility Infrastructure to Rack-Level Consequences

Facility engineering must derive security requirements directly from physical failure thresholds across each of the eight conduits:

Thermal Response Deadlines: A total disruption of liquid coolant flow forces accelerator thermal throttling within 45 seconds and protective emergency shutdown within 90 seconds. Hardware safety interlocks must execute locally at the CDU level without waiting for unauthenticated Building Management System (BMS) polling cycles.

Out-of-Band Telemetry Integrity: Temperature, flow, and electrical measurements must incorporate independent, hardwired sensor lines that cannot be suppressed or spoofed by manipulated Modbus or BACnet registers.

Demarcation of Physical Authority: Switched rack power distribution units (rPDUs), baseboard management controllers (BMCs), and isolation valves must enforce cryptographic attestation to ensure upstream facility networks cannot trigger uncoordinated actuators on active compute nodes.

### 3.2.4 Reference Model Threats to the AI Rack Envelope

Advanced persistent threats (APTs), nation-state adversaries, and AI-directed attack tools exploit facility pathways through subtle, long-duration campaigns designed to evade traditional cybersecurity monitoring:

Sub-Dewpoint Condensation Attacks (Conduits 2 & 4): An attacker with write access to BMS or chiller setpoints can lower secondary coolant temperatures below the data-hall dew point, causing moisture to condense directly on cold plates and PCB assemblies, leading to dendritic shorting or silent data corruption (SDC)

Sub-Threshold Thermal Cycling (Conduits 2 & 3): Oscillating CDU temperature setpoints induces mechanical stress and thermal fatigue on accelerator BGA solder joints and HBM3e stacks, cutting component lifespans without triggering high-temperature alarms

Synchronized Checkpoint Power Transients (Conduit 1): Attackers commanding rPDUs or UPS network management cards can inject millisecond voltage sags timed to burst checkpoint writes, corrupting training state files across thousands of nodes

Persistent Out-of-Band Implantation (Conduits 6 & 7): Exploiting vulnerabilities on BMCs allows attackers to establish persistent access that survives host OS rebuilds, allowing privileged power, virtual-media, and memory-scraping access while falsifying telemetry

Unmediated Fabric Exploitation (Conduits 5 & 8): In the absence of line-rate hardware encryption, a compromised node can inspect unauthenticated packet streams during all-reduce communications, reconstructing model weights and proprietary embeddings

BMS-to-FACP Kinetic Safety Cascades: Attackers traversing unauthenticated BMS-to-Fire-Alarm bridges can inject false alarm codes, discharging clean-agent suppression gas and tripping Emergency Power Off (EPO) shunt circuits


| AI RACK ENVELOPE ZONE MODEL (REFERENCE) |
| --- |
| Zone | SL-T | Components & Conduits |
| Zone 4: Facility & Mechanical OT | 3 | CDU, Secondary Manifolds, 48V Busbars, Leak Detection. Linked via Conduit C-43 (Isolated Gateways). |
| Zone 3: Scale-Up / Scale-Out Fabric | 4 | Infinity Fabric, UA-Link, 800G RoCE NICs, DPUs, Switches. Linked via Conduit C-32 (PCIe/CXL/SPDM). |
| Zone 2: Compute Tray & Untrusted Host | 3 | Server CPU CPUs, Host OS/VMM, OpenSIL/Coreboot, Node BMC (OOBM). Linked via Conduit C-21 (Memory Firewall). |
| Zone 1: Silicon & Weight Isolation | 4 | Instinct Gen 6 AI Accelerator Accelerators, HBM3e, Caliptra RoT, Locked Kernel Enclave. |


## 3.3 Principle 3: Machine-to-Machine Open Standards for Global Supply Chains

Supply chain security cannot depend on static trust or self-reported questionnaires; it requires machine-verifiable proof.

3.3.1 Dual-Layer Open M2M Schema:

DEXPI 2.0 (Physical Plant and Mechanical OT): Standardized machine-readable XML and JSON models capturing Piping and Instrumentation Diagrams (P&ID), piping topologies, coolant distribution units (CDUs), valve configurations, and sensor telemetry

3.3.2 CycloneDX 1.6 (Silicon, Hardware, and Firmware): Hierarchical machine-readable bills of materials capturing hardware components (HBOM), software/firmware dependencies (SBOM), Certificates (CBOM) silicon stepping revisions, fuse configurations, and DICE certificate hierarchies

3.3.3 Unified As-Built: Suppliers and ODMs must deliver integrated BIM (ISO 15926, ISO 16739, IPC-2581, IEC 62443) such as "DEXPI 2.0" and "CycloneDX 1.6" for every delivered compute, switch, and facility tray. This enables automated ingestion, continuous compliance monitoring, and immediate alignment with global regulatory mandates (including the EU Cyber Resilience Act taking effect on September 11, 2026)

## 3.4 Principle 4: Machine-Speed Falsification and Continuous Validation

Static annual questionnaires and manual penetration tests cannot keep pace with the complexity of multi-chip accelerator packages and modular datacenter firmware.

Recommendations

LLM-Driven Exploit Hypothesis Generation: Deploy frontier models (such as Fable ) to continuously generate, refine, and simulate exploit hypotheses against hardware interface specifications, register transfer level (RTL) models, and firmware source repositories

Hardware-in-the-Loop Testbenches: Pair automated hypothesis generation with dedicated hardware-in-the-loop (HIL) test harnesses and NetFPGA-style emulation testbeds to validate or falsify vulnerabilities at machine speed

Cross-Business Unit PSIRT Integration: Modernize vendor PSIRT pipelines to intake automated telemetry, score threat impact programmatically, and deliver verified remediations within strict service-level agreements (SLAs)

## 3.5 Principle 5: Open Platform Initialization and Cryptographic Provenance

The entire hardware lifecycle—from wafer fabrication to operational decommissioning—must be verifiable without relying on opaque supplier claims.

Recommendations

OpenSIL and Coreboot Adoption: Replace legacy, closed platform initialization blobs (such as Legacy Proprietary Initialization Firmware (transitioning to OpenSIL)) with open-source OpenSIL on coreboot. This cuts long-term firmware maintenance overhead by up to 80% and allows operators to inspect boot code directly

Manufacturing Key Provisioning Assessment: Survey, document, and baseline the current state across all six global Enterprise Distribution Server (EDS) HSM sites responsible for provisioning Unique Device Secrets (UDS) and DICE keys during factory test and provisioning modes

Post-Quantum Cryptographic Migration: Adopt the open-source Caliptra Silicon Root of Trust with on-die asymmetric key generation, and implement CNSA 2.0 post-quantum algorithms (ML-DSA-87 and LMS stateful hash signing) across all firmware signing and platform certificate hierarchies

# 4. A 3-Horizon Execution Framework

Adopting this framework will structure Silicon-Provider/AI-Lab engineering, procurement, and commercial contracts around three parallel execution horizons funded through rolling quarterly Statements of Work (SOWs):


| THE 3-HORIZON EXECUTION MATRIX |
| --- |
| Horizon | Timeframe | Q1-Q2 | Q3-Q4 | Year 2 | Years 3-6 |
| Horizon 1 | Near-Term: Q1 - Q2 | UPSD v1.0, 6-Site HSM Survey, AI Rack Threat Model, Annex 7 Terms |  |  |  |
| Horizon 2 | Mid-Term: Q3 - Q6 |  | EU CRA Compliance, DEXPI 2.0/CycloneDX, Open Coordinator, Autonomous Agentic System Exploit Engine, OpenSIL/Coreboot |  |
| Horizon 3 | Long-Term: 5-6 Year |  |  |  | Joint Silicon Steering, 4-Point Crypto Spec, Caliptra PQC, Locked Kernel Architecture |


## 4.1 Detailed Horizon Breakdown

### 4.1.1 Horizon 1: N-1 Platform Survey and Operational Baseline (Q1–Q2 SOW)

Goal: Secure currently deployed N-1 platforms (N-1 Reference System Gen 6 AI Accelerator trays and Host Server CPU SP7 hosts), establish the authoritative UPSD source of truth, and audit manufacturing key management

Core Activities:

Complete current-state surveys across the semiconductor manufacturer's 6 global EDS HSM sites to map key injection flows and phase out shared HMAC secrets

Construct the AI Rack Envelope threat model linking liquid cooling CDU loops, 48V power busbars, and BMC sidebands

Implement hardware rate-limiting on non-token GPU egress channel

Formalize Annex 7 technical security requirements in volume procurement contracts

### 4.1.2 Horizon 2: Automated Testing, Open Firmware, and Supply Chain Integration (Q3–Q6 SOW)

Goal: Build automated testing pipelines, transition platform firmware to open source, and establish machine-to-machine supply chain standards

Core Activities:

Meet the September 11, 2026 EU Cyber Resilience Act (CRA) milestone through automated PSIRT intake and M2M data exchange

Deploy unified DEXPI 2.0 (cooling/P&ID) and CycloneDX 1.6 (HBOM/DICE) schemas via an Open Multi-Vendor Coordinator Repository

Replace closed Legacy Proprietary Initialization Firmware (transitioning to OpenSIL) firmware blobs with OpenSIL on coreboot for Host Server CPU host nodes

Integrate the Autonomous Agentic System automated exploit hypothesis engine with hardware-in-the-loop (HIL) testbenches

### 4.1.3 Horizon 3: Gen 6 Silicon, 4-Point Cryptography, and Zero-Trust Architecture (6-Year Vision)

Goal: Co-design future silicon architectures where accelerators operate on zero-trust principles, completely isolating model weights from host infrastructure

Core Activities:

Maintain a Joint Silicon Steering Group with bi-weekly technical reviews

Implement line-rate 4-point hardware encryption across scale-up links, model weights, host-device transfers, and network fabrics

Integrate Caliptra 2.0 Silicon Root of Trust with on-die asymmetric key generation and CNSA 2.0 post-quantum algorithms (ML-DSA-87 signature verification and LMS stateful hash signing)

## 4.2 Dual-Pacing V-Model Governance & Risks

Significant risks exist in reconciling multi-year silicon tape-out cycles (3–5 years) with regulatory deadlines (e.g., EU CRA, NIST AI RMF) and quarterly commercial budget approvals. Addressing this risk programmatically requires a dual-pacing governance model; using a variant of CENELEC RAMS V-Model approach The program structures work through three synchronized V-cycles governed by four formal engineering gates:


| DUAL-PACING V-MODEL LIFECYCLE |
| --- |
| Gate 1: Definition | Gate 2: Derivation | Gate 3: Verification | Gate 4: Acceptance |
| ● Charter & Cadence ● Scope & ConOps ● SuC Definition ● Asset Intake ● Provenance of artifacts | ● Minimum Requirements Alignment (Safety/Reliability/Operations/Security) & Threat Modeling ● SL-T Derivation (Minimum Security Requirements per Zone (component) and Interfaces | ● HIL Test Protocols ● Emulation & Fuzzing ● Fault Injection ● Independent Reviews ● Verification & Validation (V-Model) | ● UPSD Release v1.x ● SecRAC Allocation  ● Risk Acceptance & Enterprise Risk Ledger ● SOW Close & Handover |



| Gate | Engineering Milestone | Technical Deliverable & Verification Output | Commercial SOW Action |
| --- | --- | --- | --- |
| Gate 1: Definition | Scope, ConOps, and Asset Intake | System under Consideration (SuC) definition and baseline asset register | Authorizes quarterly SOW scope and commits engineering hours |
| Gate 2: Derivation | Minimum Operation,, Safety & Reliability Requirements, Threat modeling and Security Requirements | FMECA, Target Security Level (SL-T) calibration, and M2M schemas, ALARP to lower requirements to SL-C (defensible) | Authorizes technical build and prototype development |
| Gate 3: Verification | Hardware-in-the-loop (HIL) testing | Automated test harness logs and protocol validation reports (HVP-01 to HVP-04), Facilities and Hardware adopt their assurance disciplines and methods. | Triggers technical sign-off by joint security leads |
| Gate 4: Acceptance | SOW closeout and operational handover | Authoritative UPSD version release, SecRAC allocation, and cluster acceptance, Hazard Log & Risk Ledger updated, Traced | Releases milestone funds and authorizes subsequent SOW budget |


# 5. Multi-Vendor Coordinator Model and Industry Governance

To prevent single-vendor lock-in, ensure enforced interoperability and clear definitions of roles and responsibilities, and support value chain and supply chain scaling for the partnership ecosystem, the proposed program operates through an Open Multi-Vendor Coordinator Repository. This structure separates responsibilities while maintaining an auditable, cryptographically verified source of truth:

Semiconductor Manufacturers (Semiconductor Manufacturer, etc.): Publish silicon root-of-trust specifications, DICE certificate hierarchies, OpenSIL platform initialization code, and line-rate encryption specifications

Frontier AI Developers (Frontier AI Lab, etc.): Deliver machine-readable RSP verification suites, threat hypotheses, non-token egress constraints, and automated model weight protection benchmarks

Original Design Manufacturers (ODMs) and Integrators: Provide verified DEXPI 2.0 mechanical plant models and CycloneDX 1.6 HBOM/SBOM records for every manufactured tray and rack assembly

Third-Party Systems Assurance Advisors (Tetrel, etc.): Maintain master V-Model gating, audit 6-site HSM provisioning states, perform RAMS hazard analyses, and publish authoritative UPSD releases

# 5. Multi-Vendor Coordinator Model and Industry Governance


| Gate | Engineering Milestone | Technical Deliverable & Verification Output | Commercial SOW Action |
| --- | --- | --- | --- |
| Gate 1: Definition | Scope, ConOps, and Asset Intake | System under Consideration (SuC) definition and baseline asset register | Authorizes quarterly SOW scope and commits engineering hours |
| Gate 2: Derivation | Threat modeling and Requirements:  In Rack (AI Rack Envelope) and outside: Facility, Suppliers & Value Chain | (Safety (FMECA.SCRIL)),Reliability /RCIL) Operations (MOR), Target Security Level (SL-T) calibration, and M2M schemas | Aligns Threats, Hazards and Minimum Requirements. Authorizes technical build and prototype development |
| Gate 3: Verification | Hardware-in-the-loop (HIL) testing | Automated test harness logs and protocol validation reports (HVP-01 to HVP-04) | Triggers technical sign-off by joint security leads |
| Gate 4: Acceptance | SOW closeout and operational handover | Authoritative UPSD version release, SecRAC allocation, and cluster acceptance | Releases milestone funds and authorizes subsequent SOW budget |


# 6. 90-Day Action Plan: Q1 SOW Execution and Gating


| 90-DAY EXECUTION TIMELINE (Q1) |
| --- |
| Phase / Month | September (Month 1) | October (Month 2) | November (Month 3) |
| Strategic Alignment | Lock Annex 7 Terms | 6-Site HSM Factory Survey | Deliver AI Rack Threat Model |
| Technical Foundation | Stand Up M2M Repo | Telemetry Throttling Baseline | Publish Authoritative UPSD v1.0 |
| Governance & Gates | EU CRA Sept 11 Gate | Intermediate Gate 2 Review | Formal Gate 4 SOW Closeout |


## 6.1 Priority Milestone Matrix


| Milestone Code | Core Objective & Deliverable | Target Date | Gate Alignment & Success Criteria | RACI |
| --- | --- | --- | --- | --- |
| M1-Q1: Annex 7 Lock | Finalize Binding Security Terms (Annex 7) Incorporate mandatory technical requirements (kernel execution locks, non-token egress throttling, and machine-readable BOM deliverables) directly into active volume procurement purchase agreements. | Sept 15, 2026 | Gate 1 (Definition):  Signed contractual annex attached to Q4 2026 / Q1 2027 hardware purchase orders. |  |
| M2-Q1: M2M Coordinator | Deploy Open M2M Coordinator Repository Establish the shared Git repository parser for DEXPI 2.0 (cooling/P&ID models) and CycloneDX 1.6 (HBOM/SBOM/DICE hierarchies) to satisfy initial EU Cyber Resilience Act (CRA) obligations. | Sept 30, 2026 | Gate 2 (Derivation):  Automated schema ingestion pipeline live with sample N-1 Reference System Gen 6 AI Accelerator tray records. |  |
| M3-Q1: HSM Site Survey | Execute AMD6-Site Manufacturing Key Survey Complete an engineering survey across the semiconductor manufacturer's global Enterprise Distribution Server (EDS) HSM sites to document current-state key injection flows, fuse burning, and factory test mode deactivation to provide a baseline of processes, value and supplier participation. | Oct 31, 2026 | Gate 2 (Derivation):  Verified current-state assessment report delivered and folded into the UPSD baseline. |  |
| M4-Q1: Facility Threat Model | Deliver AI Rack Envelope Cyber-Physical Threat Model Construct formal IEC 62443 / CLC/TS 50701 ConOps, FMECA, and SL-T derivation covering all eight conduits crossing the 100kW+ rack boundary (liquid cooling loops, 48V power busbars, BMC sidebands). | Nov 15, 2026 | Gate 3 (Verification):  Quantified failure envelopes, thermal response deadlines, and derivation chains established. |  |
| M5-Q1: UPSD Baseline v1.0 | Publish Authoritative UPSD Baseline v1.0 Issue the definitive single source of truth documenting verified N-1 platform capabilities, cryptographic baselines, factory test deactivations, and procurement standards. | Nov 30, 2026 | Gate 4 (Acceptance):  Formal technical acceptance, SecRAC allocation, and approval of Q2 SOW budget release. |  |


## 6.2 Operational Governance Cadence

Bi-Weekly Technical Syncs (Silicon Vendor / Frontier AI Lab / Independent Assurance Lead): Review interface boundaries, hardware telemetry limits, and open-source OpenSIL bring-up progress

Monthly SOW Steering Reviews: Track milestone completion, budget burn, and deliverables against EN 50126 verification gates

Immediate Action Item: Formalize the Q1 SOW advisory retainer for J. McKenney (Tetrel) to act as neutral Systems Assurance Lead and release manager for the UPSD

# 7. Glossary of Terms and Abbreviations

## DEXPI

DEXPI is a semantic machine-to-machine data exchange standard that treats the P&ID as an object-oriented, machine-readable dataset. It explicitly defines:

Equipment Objects: Component class (e.g., Variable-Speed Centrifugal Pump P-101, Plate Heat Exchanger HEX-201, Quick-Disconnect Manifold M-301).

Topology & Connectivity: Source, destination, flow direction, and pipe branch hierarchies (e.g., Line L-102 connects Nozzle N1 of CDU-1 to Inflow Port P2 of Compute Tray Rack 4).

Engineering Parameters: Design flow rates ($\text{L/min}$), fluid chemistry (e.g., 25% Propylene Glycol / PG25), design pressure limits ($\text{bar}$), and delta-$T$ thermal envelopes ($32^\circ\text{C} \to 45^\circ\text{C}$).

Instrumentation & Control Loops: Tagged sensors (temperature, flow, pressure transmitters), actuator types, interlocks, and Modbus/BACnet signal mappings. Engineering Counterparts


| Engineering Domain | Standard / Equivalent | What It Encodes |
| --- | --- | --- |
| Mechanical & Process Plant (Liquid) | DEXPI 2.0 (ISO 15926) | Hydronic topology, CDUs, P&ID graph |
| Building & Civil Architecture (AEC) | IFC (ISO 16739 / OpenBIM) | Structural walls, ductwork, 3D space |
| Electronic Design & PCB (EDA) | IPC-2581 / ODB++ / Netlist | Trace routes, IC footprints, pin wiring |
| Industrial Automation & Manufacturing | AutomationML (IEC 62714) / AAS | PLC logic, kinematic robot cells |
| Software Architecture & Supply Chain | CycloneDX 1.6 / SPDX (ISO/IEC 5962) | HBOM/SBOM components and dependencies |


Relevance to Program In a 100kW+ liquid-cooled AI cluster, facility teams currently hand software/security teams static PDF drawings of cooling loops, electricity, data, control and etc. with several different parties and teams; supply chain, value chain; security, engineering, facilities, and etc. and trying to get everyone to agree on what the drawings represent. The complex relationships of the datacenter with so many different systems and teams breaks automated verification.

Using DEXPI Promotes

Automate Ingestion of physical cooling loops and energy systems directly into simulation engines (such as the proposed "Autonomous AI-Assisted Automated Exploit & Falsification Engine"  without manual redrawing or fixed release packages.

Execute Cyber-Physical Threat Modeling: Programmatically trace fault propagation (e.g., "If Modbus Valve V-12 is manipulated, which specific GPU trays reach critical thermal throttling within 45 seconds?").

Satisfy EU CRA Machine-to-Machine Compliance: Pair DEXPI (physical mechanical BOM) with CycloneDX (silicon/software BOM) to provide an unbroken, machine-verifiable record of the entire datacenter stack.

General Terms

AC: Attacker Capability — Numeric rating (1–4) representing adversary resources, expertise, and motivation in IEC 62443 SL-T mathematical derivation.

Legacy Proprietary Initialization Firmware (transitioning to OpenSIL): Proprietary Encapsulated Silicon Architecture — Legacy closed-source initialization library for Semiconductor Manufacturer processors, being phased out in favor of open-source OpenSIL.

ASL-3 / ASL-4: AI Safety Level 3 / 4 — Frontier AI Lab Responsible Scaling Policy tiers requiring hardware-enforced protection against state-sponsored model weight theft and CBRN capability misuse.

BMC: Baseboard Management Controller — Specialized service processor providing out-of-band management; treated as an untrusted threat vector under zero-trust silicon architecture.

Caliptra: Caliptra Silicon Root of Trust — Open-source hardware Root of Trust (RoT) integrated directly into silicon to provide cryptographic attestation and identity (DICE) at power-on.

CDU: Coolant Distribution Unit — Datacenter mechanical system managing fluid flow, temperature, and heat exchange across liquid-cooled compute racks; classified under OT Zone 4.

CLC/TS 50701: CENELEC Technical Specification 50701 — Standard for railway cybersecurity, defining the systematic ConOps-to-Zones derivation chain adapted for AI cyber-physical security.

CNSA 2.0: Commercial National Security Algorithm Suite 2.0 — NSA-mandated quantum-resistant algorithms, requiring ML-DSA-87 (asymmetric signatures) and LMS (stateful hash-based signatures) for firmware signing.

ConOps: Concept of Operations — High-level engineering document defining operational boundaries, mission profiles, and functional failure envelopes of the System under Consideration.

CycloneDX: OWASP CycloneDX Standard (v1.6) — Machine-readable bill-of-materials standard supporting hierarchical Hardware (HBOM), Software (SBOM), firmware, and DICE certificate representations.

DEXPI 2.0: Data Exchange in the Process Industry — Standardized XML/JSON schema for Piping and Instrumentation Diagrams (P&ID), capturing physical topologies, CDU loops, valves, and mechanical sensors.

DICE: Device Identifier Composition Engine — TCG standard that cryptographically derives layered

device identity certificates from a Unique Device Secret (UDS) burned into silicon during fabrication.

DPU: Data Processing Unit — Programmable network accelerator (e.g., Hardware DPU / SmartNIC (Line-Rate Packet Filter)) providing line-rate hardware packet filtering, encryption, and telemetry enforcement.

EDS: Enterprise Distribution Server — Semiconductor Manufacturer manufacturing key provisioning system distributed across six global factory Hardware Security Module (HSM) sites.

EN 50126: CENELEC European Standard 50126 — Specification for the systematic management of Reliability, Availability, Maintainability, and Safety (RAMS) throughout the engineering lifecycle.

EU CRA: EU Cyber Resilience Act (Reg. 2024/2847) — European regulation imposing binding cybersecurity and vulnerability reporting requirements across digital hardware products, taking effect September 11, 2026.

FMECA: Failure Modes, Effects, and Criticality Analysis — Systematic inductive analysis method evaluating potential component failure modes, operational consequences, and severity rankings.

FRA: Failure Root-cause Analysis — Factory test mode allowing diagnostic inspection; requires permanent cryptographic deactivation before production platform delivery.

HBM / HBM3e: High Bandwidth Memory — 3D-stacked DRAM integrated directly on the accelerator interposer; isolated via hardware firewalls from unauthorized host CPU read access.

HBOM: Hardware Bill of Materials — Hierarchical, machine-readable inventory of every physical integrated circuit, passive component, printed circuit board, and mechanical assembly.

HIL: Hardware-in-the-Loop — Emulation and validation architecture connecting simulated automated exploit engines directly to physical server trays and NetFPGA testbeds.

HSM: Hardware Security Module — Tamper-resistant cryptographic appliance used to store root keys and perform high-assurance cryptographic operations during manufacturing.

IC: Impact Category — Numeric rating (1–4) representing the operational, financial, and safety severity of a compromised system under IEC 62443.

IEC 62443: IEC 62443 Standard Series — International standard defining cybersecurity for industrial automation and control systems, establishing the foundational Zones and Conduits architecture.

IEC 63452: IEC 63452 / ISO Standards — Emerging international standard establishing cybersecurity requirements and assurance lifecycles for complex cyber-physical infrastructures.

JTAG: Joint Test Action Group (IEEE 1149.1) — Dedicated boundary-scan and hardware debug interface; must be cryptographically locked down post-manufacturing to prevent physical memory tampering.

LMS: Leighton-Micali Signatures — Stateful hash-based signature scheme approved under CNSA 2.0 and NIST SP 800-208 for high-assurance firmware and bootloader verification.

M2M: Machine-to-Machine — Automated, standardized data exchange between software systems without manual human translation (e.g., DEXPI 2.0 and CycloneDX parsers).

Gen 6 AI Accelerator: Next-Generation Multi-Chiplet AI Accelerator (OAM / PCIe) — Semiconductor Manufacturer frontier accelerator packaging multi-chiplet GPUs and High Bandwidth Memory on an advanced packaging interposer.

ML-DSA-87: Module-Lattice-Based Digital Signature Algorithm — NIST-standardized (FIPS 204) post-quantum digital signature algorithm mandated under CNSA 2.0 for asymmetric identity and certificate chains.

MOC: Management of Change — Formal engineering discipline ensuring that hardware, firmware, and facility modifications do not compromise the established baseline safety case.

ODM: Original Design Manufacturer — Overseas engineering and manufacturing firms (e.g., Foxconn, Quanta, Wistron) that build compute, switch, and facility trays to hyperscale specifications.

OpenSIL: Open-Source Silicon Initialization Library — Semiconductor Manufacturer open-source architecture that decouples silicon initialization from host firmware, allowing transparent auditability and native integration with coreboot.

OT: Operational Technology — Hardware and software that detects or causes changes in physical processes (valves, pumps, cooling loops, electrical switchgear).

P&ID: Piping and Instrumentation Diagram — Detailed schematic showing piping, valves, instrumentation, sensors, and control loops within the datacenter liquid cooling infrastructure.

PQC: Post-Quantum Cryptography — Cryptographic algorithms resistant to cryptanalytic attacks executed on cryptanalytically relevant quantum computers (CRQCs).

PSIRT: Product Security Incident Response Team — Organizational team responsible for managing the intake, investigation, and coordinated disclosure of hardware and software security vulnerabilities.

RAMS: Reliability, Availability, Maintainability, Safety — Quantitative systems engineering discipline governing operational dependability across complex cyber-physical installations (EN 50126).

RoCE: RDMA over Converged Ethernet — Network protocol enabling direct memory access across accelerators over Ethernet fabrics without host CPU operating system intervention.

Open Acceleration Compute Stack & Runtime: Radeon Open Compute Platform — Semiconductor Manufacturer open-source software development platform and runtime for GPU-accelerated computing and machine learning.

RoT: Root of Trust — Fundamental hardware component that is inherently trusted to perform security-critical operations, such as measuring and validating boot code.

RSP: Responsible Scaling Policy — Frontier AI Lab operational framework specifying strict safety, security, and containment thresholds (ASL levels) as AI model capabilities scale.

SBOM: Software Bill of Materials — Machine-readable manifest tracking all software packages, libraries, dependencies, and licensing across platform firmware and host operating systems.

SecRAC: Security Requirements Allocation Table — Formal matrix mapping derived Target Security Levels (SL-T) and safety requirements to specific hardware, firmware, and organizational controls.

SL-T: Target Security Level — Quantitative security tier (SL-T 1 to SL-T 4) derived per IEC 62443 representing the required defensive posture of a specific zone against adversary capabilities.

SOW: Statement of Work — Quarterly commercial agreement defining specific engineering deliverables, verification milestones, and funding allocations under existing master contracts.

SPDM: Security Protocol and Data Model — DMTF standard defining protocols for hardware device authentication, attestation, and key exchange over PCIe and CXL buses.

SuC: System under Consideration — Formally bounded hardware, software, and physical envelope being evaluated during threat modeling and RAMS hazard analyses.

UA-Link: Ultra Accelerator Link — Open industry standard for high-bandwidth, low-latency scale-up communication between AI accelerators across compute trays.

UDS: Unique Device Secret — Secret cryptographic seed burned into non-volatile silicon fuses during fabrication, forming the base of the DICE identity chain.

UPSD: Uniform Platform Security Document — Authoritative, version-controlled source of truth detailing baseline security capabilities, verified configurations, and procurement standards across organizations.

Host Server CPUs (N-1 / Gen 6): Enterprise Server Host Processors — Next-generation Semiconductor Manufacturer server CPUs hosting compute node hypervisors, memory controllers, and PCIe root complexes.