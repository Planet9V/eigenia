# Autonomous OT — AI-Driven Facility Control and the Trust Boundary

## Chapter 13: When the Algorithm Has Write Access

## Abstract

Google's DeepMind reduced datacentre cooling energy by 40% by giving an AI system write access to cooling setpoints (Evans & Gao, 2016). The industry is following. Autonomous load management, predictive maintenance, and lights-out facility operations require algorithms to make real-time decisions about physical infrastructure — the same physical infrastructure whose compromise we identified as catastrophic in Chapters 2, 3, 8, and 9.

This chapter applies the CyHAZOPs methodology to autonomous OT: what happens when the adversary is not a human attacker manipulating Modbus registers, but a compromised AI system issuing legitimate-looking commands through legitimate interfaces? The attack surface shifts from protocol exploitation to model poisoning, training data manipulation, and decision boundary corruption.

The Taleb Test applies directly: if the AI has unsupervised write access to cooling and the AI is compromised, is the consequence Table A or Table B?

**Answer: Table B. Always.**

---

## Practitioner's Note

I am not opposed to AI in facility operations. I am opposed to AI in facility operations *without architectural constraints*.

The promise is real. AI-driven PUE optimisation can reduce energy costs by 30–40%. Predictive maintenance can extend equipment life and reduce unplanned downtime. Autonomous load management can respond to grid pricing signals faster than any human operator.

The problem is that every one of these capabilities requires the AI to have *write access* to OT systems. And every CyHAZOPs analysis in this series has demonstrated that write access to OT systems is the primary attack vector for catastrophic failure.

The engineering question is not "should we use AI?" It is: "what architectural constraints ensure that a compromised AI cannot produce a Table B outcome?"

---

## 1. The Convergence of AI and Facility OT

### 1.1 Where AI Meets OT Today

**Table 13.2: AI Applications in Datacenter OT — Vendor, Protocol, and Standards Mapping**

| AI Application | OT Systems Accessed | Access Type | Deployed By | Protocol | IEC 62443 Zone | Relevant Standard |
|:---|:---|:---|:---|:---|:---|:---|
| PUE optimisation | BMS (chiller setpoints, airside economiser dampers, CRAH fan speeds); CDU (supply temperature, pump speed) | **Read + Write** | Google, Microsoft, Meta | BACnet/IP, Modbus TCP | Zone 1 (BMS) | ASHRAE TC 9.9 Water Classes W17–W45 [ASHRAE, 2021]; EN 50600-2-3 Availability Class 3–4 [EN 50600, 2020] |
| Predictive maintenance | Vibration sensors, thermal imagers, power quality meters, motor current | Read only (currently) | All major hyperscalers | Modbus RTU, OPC-UA | Zone 1 (BMS) + Zone 2 (Electrical) | IEC 62443-4-2 FR3 (System Integrity) [IEC, 2019] |
| Autonomous load management | EPMS (circuit breaker status); DCIM (server power capping); BMS (thermal headroom) | **Read + Write** | Emerging; AWS, Microsoft | DNP3, IEC 61850 MMS | Zone 2 (Electrical) | IEC 61850-8-1 GOOSE/MMS [IEC, 2011]; IEC 62351-3 TLS [IEC, 2018] |
| Grid interaction / demand response | UPS (load shedding); BESS (charge/discharge); Generator (start/stop) | **Read + Write** | Emerging; grid-connected campuses | Modbus TCP, IEC 61850 | Zone 2 (Electrical) + Zone 6 (BESS) | NFPA 855 Ch. 4–13 [NFPA, 2026]; UL 9540A [UL, 2020] |
| Digital twin simulation | All OT telemetry (read); maintenance scheduling (write to CMMS) | Read + selective Write | All major hyperscalers | OPC-UA, REST API | Zone 0 (Enterprise IT) | OCP S.A.F.E. Scope 1–3 for server firmware [OCP, 2024] |

**Key observation:** Every AI application with write access crosses the IEC 62443 zone boundary from Zone 0 (Enterprise IT) into Zone 1 or Zone 2. The conduit between these zones must enforce the security controls defined in IEC 62443-3-2 Clause 5.4 [IEC, 2018]. Currently, no hyperscaler publishes their conduit security architecture for AI-OT integration.

### 1.2 The Trust Hierarchy Problem

In traditional OT, the trust model is:

**Human operator → BMS/SCADA → Controller → Actuator**

Every command has a human origin. Anomaly detection asks: "did a human authorise this?"

With AI-in-the-loop, the model becomes:

**AI system → BMS/SCADA → Controller → Actuator**

The AI issues commands autonomously. The commands are syntactically identical to human-issued commands. The BMS cannot distinguish between "human operator set chiller supply to 8°C" and "AI model set chiller supply to 8°C." Both arrive as BACnet Write Property commands to the same object.

The consequence: every OT monitoring use case in Chapter 14 that relies on "command from unexpected source" detection is defeated. The AI *is* the expected source.

**IEC 62443 zone implication:** The AI system resides in Zone 0 (Enterprise IT) or a dedicated AI Zone (Zone 7). The BMS controllers reside in Zone 1. The conduit C0-1 (Enterprise IT → BMS) must implement a data diode or industrial firewall with deep packet inspection (DPI) for BACnet/IP. However, DPI cannot distinguish between human and AI commands if both use the same protocol syntax. The only reliable mitigation is a physical bounds checker (Rule 1, Section 3.2) that operates independently of the AI system.

---

## 2. CyHAZOPs for Autonomous OT

### 2.1 New Guide Words for AI-Driven Deviations

The standard CyHAZOPs guide words (NO, MORE, LESS, REVERSE, SPOOFED, PERSISTED, COORDINATED) address deviations caused by mechanical failure or adversarial manipulation. AI-driven systems introduce three additional deviation modes. These guide words are original CyHAZOPs extensions, informed by the adversarial machine learning taxonomy established by Biggio and Roli (2018) but adapted specifically for cyber-physical OT environments where model failures produce physical consequences, not merely incorrect classifications:

**Table 13.3: AI-Specific Guide Words with Standards Mapping**

| Guide Word | Definition | Example | Related IEC 62443 Requirement | Related Standard |
|:---|:---|:---|:---|:---|
| **POISONED** | AI model produces incorrect outputs due to corrupted training data or adversarial input manipulation | Model trained on spoofed temperature data recommends opening chiller bypass, causing compressor surge | FR3 (System Integrity) CR 3.4 – Software & information integrity [IEC 62443-4-2, 2019] | NIST SP 800-193 Platform Firmware Resiliency [NIST, 2018] |
| **DRIFTED** | AI model gradually degrades in accuracy due to distribution shift between training environment and current operating conditions | Model optimised for 50% IT load provides incorrect setpoints at 95% load during capacity expansion | FR7 (Resource Availability) CR 7.2 – Resource management [IEC 62443-4-2, 2019] | ASHRAE TC 9.9 Rate of Change ≤20°C/hr [ASHRAE, 2021] |
| **OVERRIDDEN** | AI model recommendation is correct but overrides a human-set safety constraint | AI reduces fan speed below minimum design airflow to optimise PUE, violating ASHRAE thermal guidelines | FR2 (Use Control) CR 2.1 – Authorization enforcement [IEC 62443-4-2, 2019] | ASHRAE TC 9.9 Recommended Envelope 18–27°C [ASHRAE, 2021] |

### 2.2 AI-Specific Hazard Log

**Table 13.4: AI-Specific Hazard Log with Standards References**

| ID | Guide Word | Node | Deviation | Cause | Consequence | S | O | D | RPN | Table | IEC 62443 Zone | Related Standard |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| AI-001 | **POISONED** | N6 (CDU) | CDU supply temperature setpoint raised above safe limit | Adversary injects false temperature readings into AI training pipeline; model learns incorrect thermal response curve | GPU thermal throttling → thermal damage if sustained | 9 | 3 | 8 | **216** | B | Zone 1 (BMS) | ASHRAE TC 9.9 Water Class W17–W45; CDU supply temp must stay within 2°C–45°C [ASHRAE, 2021] |
| AI-002 | **OVERRIDDEN** | N5 (Chiller) | Chiller capacity reduced below N+1 redundancy threshold | AI optimises for energy cost by shutting down "unnecessary" chiller during low-load period; does not account for redundancy requirement | Loss of N+1; single chiller failure → no backup | 8 | 5 | 6 | **240** | B | Zone 1 (BMS) | EN 50600-2-3 Availability Class 3 requires N+1 cooling [EN 50600, 2020] |
| AI-003 | **DRIFTED** | N8 (BMS) | BMS setpoints optimised for stale operating profile | Facility has expanded from 50 MW to 85 MW; AI model not retrained; recommendations based on outdated thermal model | Setpoints inappropriate for current load; gradual thermal stress on equipment | 6 | 6 | 5 | **180** | A | Zone 1 (BMS) | IEC 62443-4-1 SDL Practice SVV – Verification & Validation [IEC, 2018] |
| AI-004 | **COORDINATED** | N6+N2 | Simultaneous CDU flow reduction and UPS load shedding | Adversary compromises AI to issue cost-optimisation commands that simultaneously reduce cooling capacity and shed non-critical power loads; combined effect exceeds thermal budget | Multi-rack thermal shutdown during "optimisation" event | 10 | 2 | 8 | **160** | B | Zone 1 + Zone 2 | IEC 61850-8-1 GOOSE for fast load shedding; requires authentication per IEC 62351-6 [IEC, 2018] |
| AI-005 | **POISONED** | N13 (DCIM) | Digital twin model masks predictive maintenance alert | Adversary corrupts digital twin training data to suppress vibration signature associated with CDU pump bearing failure; pump fails without warning | Unplanned CDU outage; reduced cooling capacity; potential thermal event | 8 | 3 | 9 | **216** | B | Zone 0 (IT) | OCP S.A.F.E. Scope 2 – Internal Attack Surface for server firmware [OCP, 2024] |
| AI-006 | **SPOOFED** | All | AI monitoring dashboard shows "all systems normal" while attack is in progress | Adversary compromises the AI's anomaly detection model to classify attack signatures as normal operational variation | Complete loss of automated threat detection; human operators trust AI "all clear" | 9 | 2 | 10 | **180** | B | All zones | IEC 62443-3-2 requires independent monitoring conduit (C1-3) for fire/life safety [IEC, 2018] |

### 2.3 Key Finding: The AI Detectability Problem

In traditional CyHAZOPs, the Detectability (D) score for SPOOFED attacks is high (7–9) because telemetry spoofing requires the attacker to generate plausible sensor values and BMS displays simultaneously — a complex coordination problem.

With AI-in-the-loop, detectability degrades further. AI-006 scores D=10 (virtually undetectable) because the AI *is* the detection mechanism. If the adversary compromises the AI's anomaly detection model, the attack is hidden by the same system designed to find it.

This is the AI equivalent of the BMS-to-Fire Alarm conduit problem (Chapter 9, N10): a single system providing both control and safety functions. The architectural mandate is the same: **separation of concerns.** The system that makes decisions must not be the same system that detects whether those decisions are correct.

**IEC 62443-3-2 zone separation requirement:** The independent monitoring system must reside in a separate zone (e.g., Zone 3 for fire/life safety) with a hardwired conduit (C1-3) that does not pass through the AI system. This aligns with NFPA 75 Chapter 9 requirement for HVAC shutdown via hardwired interlock from fire alarm [NFPA, 2020].

---

## 3. Architectural Constraints for Safe AI

### 3.1 The Trust Boundary Model

```mermaid {caption="Figure 13.1: Trust Boundary Model with IEC 62443 Zones"}
flowchart TD
    subgraph AI["Zone 0 / Zone 7: AI Optimisation Layer"]
        MODEL["AI/ML Model\n(PUE, Load, Maintenance)"]
        REC["Recommendation\nEngine"]
    end
    subgraph GATE["Trust Boundary (Mandatory)\nConduit C0-1 / C0-2"]
        BOUNDS["Physical Bounds\nChecker (Deterministic)"]
        HUMAN["Human-in-the-Loop\n(for Table B parameters)"]
        AUDIT["Decision Audit\nLog"]
    end
    subgraph OT["Zone 1: BMS / Zone 2: Electrical"]
        BMS_W["BMS\n(Write)"]
        CDU_W["CDU\n(Write)"]
        EPMS_W["EPMS\n(Write)"]
    end
    subgraph INDEPENDENT["Zone 3: Fire/Life Safety\n(Independent Monitoring)"]
        SENSORS["Hardwired\nSensors"]
        OT_IDS["OT IDS\n(Passive)"]
        ALARM["Independent\nAlarm System"]
    end

    MODEL --> REC
    REC --> BOUNDS
    BOUNDS -->|"Within safe\nenvelope"| BMS_W & CDU_W & EPMS_W
    BOUNDS -->|"Outside safe\nenvelope"| HUMAN
    HUMAN -->|"Approved"| BMS_W & CDU_W & EPMS_W
    HUMAN -->|"Rejected"| MODEL

    BMS_W & CDU_W & EPMS_W --> AUDIT
    SENSORS --> OT_IDS
    OT_IDS --> ALARM

    style BOUNDS fill:#ff6b6b,color:#fff
    style HUMAN fill:#ff6b6b,color:#fff
    style SENSORS fill:#4ecdc4,color:#fff
```

**Zone mapping per IEC 62443-3-2:** The AI system should be placed in a dedicated Zone 7 (AI Optimisation) with SL-T 3. The conduit to Zone 1 (BMS) must enforce unidirectional data flow for telemetry and require human approval for write commands that affect Table B parameters. The independent monitoring system in Zone 3 must have a separate, hardwired communication path not traversing any AI-controlled network.

### 3.2 The Five Architectural Rules

**Rule 1: Physical bounds checking is mandatory.**
Every AI-generated setpoint must pass through a physical bounds checker before reaching the OT controller. The bounds checker is a simple, deterministic system (not ML-based) that validates: is the commanded value within the safe operating envelope? CDU supply temperature: 15–35°C (ASHRAE W17–W32 recommended range [ASHRAE, 2021]). Chiller supply: 5–15°C. UPS load: 0–rated capacity. Any command outside these bounds is rejected and logged.

**IEC 62443 mapping:** This implements CR 3.7 (Input validation) and CR 5.1 (Network segmentation) [IEC 62443-4-2, 2019]. The bounds checker acts as a zone boundary enforcement point.

**Rule 2: Table B parameters require human-in-the-loop.**
Any AI recommendation that affects a Table B risk category (Chapters 8, 10) must require human approval before execution. Reducing chiller redundancy below N+1 is a Table B decision. The AI can recommend it. A human must approve it.

**IEC 62443 mapping:** This implements CR 2.1 (Authorization enforcement) and CR 2.12 (Non-repudiation) [IEC 62443-4-2, 2019]. The human approval must be logged with cryptographic non-repudiation.

**Rule 3: The monitoring system must be architecturally independent of the AI.**
The system that detects whether the AI is behaving correctly must not share any code, training data, infrastructure, or communication pathway with the AI system itself. Hardwired sensors that report directly to an independent alarm system (not through the BMS) satisfy this requirement. The AI cannot suppress what it cannot access.

**IEC 62443 mapping:** This enforces zone separation per IEC 62443-3-2 Clause 5.4 [IEC, 2018]. The independent monitoring system should be in Zone 3 (Fire/Life Safety) with SL-T 3. NFPA 75 Chapter 9 requires HVAC shutdown via hardwired interlock from fire alarm, not via BMS [NFPA, 2020].

**Rule 4: Every AI decision must be auditable.**
Every setpoint change, every recommendation, every parameter modification issued by the AI must be logged with: timestamp, source model, input data, commanded value, and bounds check result. This log is the forensic evidence base for post-incident CyHAZOPs analysis.

**IEC 62443 mapping:** This implements CR 2.8 (Auditable events) and CR 6.1 (Audit log accessibility) [IEC 62443-4-2, 2019]. The audit log must be stored in a write-once, read-many (WORM) format to prevent tampering.

**Rule 5: AI models must be retrained on a validated schedule.**
Model drift (AI-003) is addressed by mandatory retraining intervals tied to facility capacity changes. Any capacity expansion >10% triggers mandatory model validation. Training data pipelines must be integrity-checked to prevent poisoning (AI-001, AI-005).

**IEC 62443 mapping:** This aligns with IEC 62443-4-1 SDL Practice SVV (Security Verification & Validation Testing) and Practice DM (Defect Management) [IEC, 2018]. The retraining schedule must be documented in the facility's security management plan.

### 3.3 The Lights-Out Facility Problem

Some operators target fully autonomous, unstaffed facility operations. This eliminates the "human detects anomaly" safeguard that appears in multiple hazard logs across the series.

**The CyHAZOPs position:** A lights-out facility is architecturally acceptable *only if* Rule 3 is satisfied — the independent monitoring system must have an automated escalation path (not requiring human intervention) to a separate safety system that can enforce a safe state (e.g., emergency shutdown or load shedding) without relying on the AI system.

**Standards compliance:** A lights-out facility must meet EN 50600-2-5 Protection Class 4 (biometric + token, mantrap, 24/7 SOC) for physical security [EN 50600, 2020]. The independent monitoring system must be certified to IEC 62443-4-2 SL 3 for all FR1–FR7 requirements. Currently, no datacenter OT product (UPS NMC, BMS controller, CDU PLC) holds ISASecure CSA certification [ISASecure, 2025]. This is a critical gap for lights-out operations.

---

## 4. Standards Compliance Checklist for AI-OT Integration

**Table 13.5: Mandatory Standards Compliance for AI-OT Systems**

| Requirement | Standard | Clause | Verification Method |
|:---|:---|:---|:---|
| Physical bounds checker | IEC 62443-4-2 | CR 3.7 Input validation | Source code review; penetration test |
| Human-in-the-loop for Table B | IEC 62443-4-2 | CR 2.1 Authorization enforcement | Architecture review; test of override path |
| Independent monitoring system | IEC 62443-3-2 | Zone separation (Zone 3) | Network diagram review; physical inspection |
| Audit logging | IEC 62443-4-2 | CR 2.8 Auditable events | Log review; WORM storage verification |
| Model retraining schedule | IEC 62443-4-1 | Practice SVV | Process documentation review |
| Firmware integrity of AI servers | OCP S.A.F.E. | Scope 1–3 | Short Form Report review |
| Cooling setpoints within ASHRAE envelope | ASHRAE TC 9.9 | Recommended Envelope 18–27°C | BMS configuration audit |
| Fire alarm interlock hardwired | NFPA 75 | Ch. 9 HVAC shutdown | Physical inspection |
| BESS thermal runaway detection | NFPA 855 | Ch. 10 Ventilation; UL 9540A | Test report review |
| Substation GOOSE authentication | IEC 62351-6 | GOOSE HMAC | Network traffic analysis |

---

## 5. Conclusion

The convergence of AI and OT in datacenter facilities introduces a new class of cyber-physical risk: the compromised algorithm that issues legitimate commands through legitimate interfaces. The CyHAZOPs analysis demonstrates that without architectural constraints, every AI-OT integration path leads to Table B consequences.

The five architectural rules — physical bounds checking, human-in-the-loop for Table B, independent monitoring, full auditability, and validated retraining — provide a minimum viable safety architecture. These rules map directly to existing IEC 62443, ASHRAE, NFPA, and EN 50600 standards.

The industry gap is clear: datacenter-specific OT devices (UPS NMCs, BMS controllers, CDU PLCs, EPMS meters) lack ISASecure CSA certification. Until these devices meet IEC 62443-4-2 SL 3 requirements, any AI system that writes to them operates on an untrusted foundation. The engineering mandate is to constrain the AI's write access through deterministic, standards-compliant boundaries — not to trust the AI to behave correctly.

---

## References

- ASHRAE TC 9.9. (2021). *Thermal Guidelines for Data Processing Environments* (5th ed.). Atlanta, GA: ASHRAE.
- Biggio, B., & Roli, F. (2018). Wild patterns: Ten years after the rise of adversarial machine learning. *Pattern Recognition*, 84, 317–331.
- EN 50600 Series. (2020). *Information Technology — Data Centre Facilities and Infrastructures*. Brussels: CENELEC.
- Evans, R., & Gao, J. (2016). DeepMind AI reduces Google data centre cooling bill by 40%. *Google AI Blog*.
- IEC 62443-3-2. (2018). *Security for industrial automation and control systems — Part 3-2: Security risk assessment for system design*. Geneva: IEC.
- IEC 62443-4-1. (2018). *Secure product development lifecycle requirements*. Geneva: IEC.
- IEC 62443-4-2. (2019). *Technical security requirements for IACS components*. Geneva: IEC.
- IEC 61850-8-1. (2011). *Communication networks and systems for power utility automation — Part 8-1: Specific communication service mapping (SCSM) — Mappings to MMS and to ISO/IEC 8802-3*. Geneva: IEC.
- IEC 62351-6. (2018). *Power systems management and associated information exchange — Data and communications security — Part 6: Security for IEC 61850 profiles*. Geneva: IEC.
- ISASecure. (2025). *Certified Products Registry*. Research Triangle Park, NC: ISA Security Compliance Institute.
- NFPA 75. (2020). *Standard for the Fire Protection of Information Technology Equipment*. Quincy, MA: NFPA.
- NFPA 855. (2026). *Standard for the Installation of Stationary Energy Storage Systems*. Quincy, MA: NFPA.
- NIST SP 800-193. (2018). *Platform Firmware Resiliency Guidelines*. Gaithersburg, MD: NIST.
- OCP S.A.F.E. (2024). *Security Appraisal Framework and Enablement*. Open Compute Project.
- UL 9540A. (2020). *Test Method for Evaluating Thermal Runaway Fire Propagation in Battery Energy Storage Systems*. Northbrook, IL: UL.