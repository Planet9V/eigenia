#!/usr/bin/env python3
"""
Compiler for Document 6: Cognitive Bias Catalog
Source: papers-pre-publish/Research_equations/RSCH-34-COGNITIVE_BIAS.md
Destination: references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Cognitive-Bias-Catalog.md
"""

import os
import re

dest_path = 'references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Cognitive-Bias-Catalog.md'

content = """## Executive Abstract

In high-consequence operational technology (OT) and mission-critical data center operations, security architectures are designed to withstand hardware component failures and cryptographic attacks. Yet the most vulnerable attack vector remains the human decision loop. Under operational stress and sensory alert flooding, control room operators, systems engineers, and incident responders systematically abandon slow, analytical System 2 deliberation in favor of rapid, heuristic System 1 cognitive shortcuts.

This catalog establishes the definitive taxonomy of cognitive biases exploited by sophisticated threat actors targeting industrial infrastructure:
- We formulate the **Bias Susceptibility Score (BSS)**; a multi-dimensional metric that integrates baseline psychometric traits (Big Five / OCEAN), organizational hierarchy, and dynamic operational stress.
- We map classical Kahneman-Tversky heuristics (Anchoring, Confirmation, Availability, Authority Bias, Escalation of Commitment) directly to MITRE ATT&CK for ICS techniques and social engineering playbooks.
- We demonstrate how cognitive bias creates predictable decision latency, transforming brief software-induced cooling trips into catastrophic, permanent hardware destruction.

Coupled to physical infrastructure through DEXPI 2.0 (ISO 15926) piping schematics and CycloneDX 1.6+ multi-BOM specifications, this treatise provides the quantitative foundation for human defender simulation in the AEON digital twin and establishes affirmative actuarial loss hedging under Lloyd's Y5381.

---

## 1. Dual-Process Cognition in Mission-Critical Operations

Human cognitive architecture is divided into two distinct modes of information processing (Kahneman & Tversky, 1974; Stanovich & West, 2000):

```
+-------------------------------------------------------------------------+
|                  DUAL-PROCESS COGNITIVE ARCHITECTURE                    |
+-------------------------------------------------------------------------+
| SYSTEM 1 (Fast, Heuristic, Automatic):                                  |
| - Low cognitive energy expenditure, pattern matching, intuitive leaps. |
| - Dominated by affective heuristics, availability bias, and anchoring. |
| - Operational Phase: Crisis response, alarm flood (> 150 alerts/min).   |
+-------------------------------------------------------------------------+
                                    |
                    OPERATIONAL STRESS DRIFT (tau_stress)
                                    |
                                    v
+-------------------------------------------------------------------------+
| SYSTEM 2 (Slow, Analytical, Deliberative):                              |
| - High cognitive energy expenditure, deductive logic, rule validation. |
| - Systematic cross-referencing of DEXPI schematics and sensor logs.     |
| - Operational Phase: Routine maintenance, post-incident forensic audit. |
+-------------------------------------------------------------------------+
```

When an industrial facility operates within nominal parameters, personnel maintain supervisory control using analytical System 2 reasoning. However, when an adversary executes a coordinated cyber-physical assault; combining falsified SCADA alarms, spoofed management communications, and hydraulic valve manipulations; the incoming information rate exceeds human working memory capacity ($7 \pm 2$ chunks). 

The brain experiences cognitive overload, automatically shifting decision-making to System 1 heuristics. Threat actors deliberately induce this shift, exploiting predictable cognitive biases to bypass logical security interlocks.

---

## 2. Multi-BOM and DEXPI Process Topology Grounding

To model the physical impact of cognitive bias exploitation, operator decision vectors are mapped to plant piping and multi-BOM specifications:

```
+-------------------------------------------------------------------------+
|            DEXPI-CYCLONEDX OPERATIONAL TOPOLOGY GRAPH                   |
+-------------------------------------------------------------------------+
| DEXPI 2.0 PIPING & HYDRAULIC NETWORK:                                   |
| - Coolant Subsystem: Secondary Distribution Loop, Chilled Water Pumping|
| - Instrumentation: FT-101 (Flowmeter), PT-202 (Pressure), TT-305 (Temp) |
+-------------------------------------------------------------------------+
                                    |
                    CROSS-DOMAIN DIGITAL TWIN BINDING
                                    |
                                    v
+-------------------------------------------------------------------------+
| CYCLONEDX 1.6+ MULTI-BOM SPECIFICATION:                                 |
| - HBOM: Silicon ASICs, Pumping VFDs, Automatic Transfer Switches (ATS)  |
| - SBOM: PLC Logic Firmware, SCADA HMI Server Binaries, Modbus Stacks    |
| - CBOM: Mutual TLS Certificates, DICE Hardware Identity Credentials     |
| - OBOM: Operational Envelope Bounds (Flow >= 35 L/min, Temp <= 45°C)    |
| - VEX:  Machine-Readable Threat Exploit Feeds (CISA ICS Advisories)     |
+-------------------------------------------------------------------------+
```

When an adversary manipulates the human operator through cognitive bias, the operator issues unauthorized manual overrides that violate OBOM constraints, forcing physical equipment past its thermodynamic destruction limits.

---

## 3. Mathematical Formulation of the Bias Susceptibility Score (BSS)

The vulnerability of an operational team member to cognitive manipulation is quantified by the Bias Susceptibility Score ($BSS_i(t)$):

$$BSS_i(t) = \sum_{b \in \mathcal{B}} w_b \cdot S_{i,b} \cdot \left[ 1 + \gamma \cdot \text{Stress}_i(t) \right]$$

Where:
- $\mathcal{B}$ is the set of all documented cognitive biases.
- $w_b \in [0, 1]$ is the threat relevance weighting of bias $b$ ($\sum w_b = 1.0$).
- $S_{i,b} \in [0, 1]$ is the operator's baseline susceptibility to bias $b$, derived from psychometric assessments (CB5T / OCEAN and DISC profiles).
- $\text{Stress}_i(t) \in [0, 1]$ is the dynamic physiological and cognitive stress level at time $t$.
- $\gamma \ge 0$ is the stress amplification coefficient ($\gamma \approx 1.85$).

```
+-------------------------------------------------------------------------+
|             TABLE 3.1: COGNITIVE BIAS SUSCEPTIBILITY WEIGHTS            |
+-------------------------------------------------------------------------+
```

| Bias Code | Cognitive Bias | Baseline Mechanism | Operational ICS Manifestation | Threat Weight ($w_b$) |
|:---:|:---|:---|:---|:---:|
| **CB-01** | **Authority Bias** | Unquestioning compliance with perceived superiors | Executing urgent configuration overrides from spoofed executive emails | 0.20 |
| **CB-02** | **Scarcity / Urgency** | Fear of loss overriding logical verification | Skipping dual-authorization protocols to prevent immediate SLA penalties | 0.18 |
| **CB-03** | **Anchoring Bias** | Fixation on the initial piece of data | Interpreting all subsequent alarms through the lens of a "known sensor fault" | 0.16 |
| **CB-04** | **Confirmation Bias** | Filtering data to fit pre-existing hypothesis | Ignoring rising temperature telemetry while searching for communication errors | 0.15 |
| **CB-05** | **Availability Heuristic**| Estimating likelihood based on recall ease | Diagnosing a targeted cyber attack as routine thermal throttling | 0.12 |
| **CB-06** | **Social Proof** | Conforming to actions of peer group | Operators ignoring secondary alarms because neighboring consoles did not react | 0.10 |
| **CB-07** | **Escalation of Commitment**| Sunk-cost persistence in failed courses | Continuing manual pump cycling rather than initiating hard facility trip | 0.09 |

---

## 4. Deep-Dive Taxonomy of Critical Cognitive Biases

### 4.1 CB-01: Authority Bias (Milgram Effect in Industrial Ops)
- **Psychological Principle:** Human agents possess an evolutionary predisposition to defer critical judgment to recognized authority figures.
- **Cyber-Physical Attack Scenario:** The adversary compromises an internal email account belonging to the Chief Operating Officer or Operations Vice President. During a minor maintenance window, the adversary transmits an urgent message: *"Urgent: Bypass Secondary Chiller Interlock #4 immediately to support emergency LLM cluster load. Do not route through standard change board."*
- **Operational Consequence:** The Level 2 operator, scoring high in Agreeableness ($A \ge 0.82$) and Conscientiousness ($C \ge 0.78$), disables the physical pump interlock without demanding cryptographic verification, allowing coolant stagnation.

### 4.2 CB-02: Scarcity & Artificial Urgency
- **Psychological Principle:** Scarcity triggers acute loss aversion; humans perceive opportunities or choices as vastly more valuable when time is severely constrained (Kahneman-Tversky Prospect Theory: $\lambda_{\text{loss}} \approx 2.25$).
- **Cyber-Physical Attack Scenario:** Adversary injects simulated telemetry suggesting a Tier-1 customer SLA violation costing $50,000\text{ USD}$ per minute of downtime. A prompt appears on the engineering terminal: *"Immediate operator action required within 90 seconds to prevent cluster drop."*
- **Operational Consequence:** The operator rushes to enter credentials and execute script commands without performing peer verification or analyzing physical P&ID flow rates.

### 4.3 CB-03: Anchoring Bias (The First-Alarm Trap)
- **Psychological Principle:** When forming estimates or diagnoses, human cognition anchors disproportionately on initial numbers or explanations, failing to adjust sufficiently for subsequent evidence.
- **Cyber-Physical Attack Scenario:** The adversary triggers a benign minor alert: *"PT-101 Pressure Sensor Calibration Drift."* Five minutes later, the adversary initiates actual physical valve sabotage.
- **Operational Consequence:** The operator anchors on the initial calibration message. As thermal alarms flood the HMI console, the operator insists that the system is merely suffering from "sensor calibration drift," ignoring true physical overheating.

### 4.4 CB-04: Confirmation Bias
- **Psychological Principle:** Once an individual adopts an explanatory hypothesis, incoming data is selectively filtered: supportive data is highlighted, while disconfirming evidence is discarded as noise.
- **Cyber-Physical Attack Scenario:** Operator believes that facility cooling issues are driven by high ambient summer temperatures. The adversary slowly starves secondary coolant flow to specific high-density racks.
- **Operational Consequence:** The operator attributes rising rack temperatures entirely to external ambient weather, ignoring the fact that adjacent identical racks remain completely stable.

### 4.5 CB-05: Availability Heuristic (Recency and Salience Distortion)
- **Psychological Principle:** Humans assess the frequency, probability, or cause of an event by how easily concrete examples come to mind. Recent, emotionally vivid, or frequently discussed events dominate probability estimation over objective Bayesian base rates.
- **Cyber-Physical Attack Scenario:** A data center experienced a widely discussed false alarm three days prior, caused by a faulty transient firmware update on temperature sensor TT-305. The adversary now triggers an actual physical coolant valve restriction that activates TT-305.
- **Operational Consequence:** The operator immediately recalls the vivid incident from earlier in the week, concluding: *"TT-305 is glitching again; ignore the alarm until the morning shift."* The availability heuristic obscures the novel physical reality of valve starvation.

### 4.6 CB-06: Social Proof & Information Cascades
- **Psychological Principle:** In ambiguous or high-stress environments, individuals look to the actions of others to determine appropriate behavior. When peers appear unconcerned, individuals suppress their own private alarms (bystander effect and pluralistic ignorance).
- **Cyber-Physical Attack Scenario:** In a multi-console operations room, an adversary injects localized acoustic alarms on a junior engineer's terminal while keeping senior operator consoles quiet.
- **Operational Consequence:** The junior engineer observes the senior operators quietly sipping coffee, concluding that the alarms cannot represent a true emergency. The social signal overrides the telemetry, delaying emergency notifications by several minutes.

### 4.7 CB-07: Escalation of Commitment & Sunk Cost Fallacy
- **Psychological Principle:** Once resources (time, reputation, effort) are invested in a course of action, decision-makers persist in that course even in the face of negative outcomes, driven by the desire to justify earlier decisions.
- **Cyber-Physical Attack Scenario:** An operator attempts to clear a cooling loop blockage by manually cycling auxiliary pump P-204. Fluid pressure continues to drop.
- **Operational Consequence:** Rather than accepting that manual cycling has failed and executing an immediate emergency facility trip, the operator cycles P-204 a third and fourth time, wasting the critical 45-second survival window.

### 4.8 Python Computational Implementation of the BSS Model
To integrate cognitive bias susceptibility into the 3.2M-node AEON digital twin simulation engine, the BSS model is implemented as a vectorized Python module:

```python
from dataclasses import dataclass, field
from typing import Dict, List
import numpy as np

@dataclass
class OperatorProfile:
    operator_id: str
    role: str
    tenure_years: float
    # Psychometric baseline: Big Five / OCEAN traits in [0, 1]
    ocean_traits: Dict[str, float]
    # Baseline bias susceptibilities in [0, 1]
    bias_sensitivities: Dict[str, float]

@dataclass
class ThreatContext:
    alarm_rate_per_min: float
    shift_hours_elapsed: float
    ambient_temperature_c: float
    is_spoofed_executive_present: bool

class CognitiveBiasEngine:
    # Threat relevance weighting vector (sum = 1.0)
    WEIGHTS: Dict[str, float] = {
        "CB-01_Authority": 0.20,
        "CB-02_Scarcity": 0.18,
        "CB-03_Anchoring": 0.16,
        "CB-04_Confirmation": 0.15,
        "CB-05_Availability": 0.12,
        "CB-06_SocialProof": 0.10,
        "CB-07_Commitment": 0.09,
    }

    GAMMA_STRESS: float = 1.85
    BASE_LATENCY_SEC: float = 8.5
    KAPPA_DISTORTION: float = 2.45

    @classmethod
    def calculate_stress(cls, context: ThreatContext) -> float:
        # Dynamic stress in [0, 1] driven by alarm flood and fatigue
        stress_alarm = min(1.0, context.alarm_rate_per_min / 200.0)
        stress_fatigue = min(1.0, context.shift_hours_elapsed / 12.0)
        return float(np.clip(0.6 * stress_alarm + 0.4 * stress_fatigue, 0.0, 1.0))

    @classmethod
    def compute_bss(cls, profile: OperatorProfile, context: ThreatContext) -> float:
        stress = cls.calculate_stress(context)
        raw_score = sum(
            cls.WEIGHTS[bias] * profile.bias_sensitivities.get(bias, 0.5)
            for bias in cls.WEIGHTS
        )
        # Stress-amplified score
        amplified = raw_score * (1.0 + cls.GAMMA_STRESS * stress)
        return float(np.clip(amplified, 0.0, 1.0))

    @classmethod
    def predict_decision_latency(cls, bss: float) -> float:
        # Returns expected operator response delay in seconds
        return float(cls.BASE_LATENCY_SEC * np.exp(cls.KAPPA_DISTORTION * bss))
```

This computational engine allows the AEON digital twin to simulate thousands of stochastic variations of human defender behavior under varying alarm volumes, identifying precisely which operators require automated fallback interlocks.

---

## 5. Mathematical Modeling of Decision Latency and the Thermal Cliff

The primary consequence of cognitive bias exploitation is **Decision Latency** ($\tau_{\text{delay}}$); the time lost while the operator rationalizes false hypotheses instead of executing emergency procedures.

We model decision latency as an exponential function of the Bias Susceptibility Score:

$$\tau_{\text{delay}}(BSS) = \tau_0 \cdot \exp\left( \kappa \cdot BSS_i(t) \right)$$

Where:
- $\tau_0 = 8.5\text{ seconds}$ is the baseline reaction time of an alert, unbiased operator.
- $\kappa = 2.45$ is the cognitive distortion coefficient.

In high-density liquid-cooled compute facilities running $120\text{ kW}$ per rack across a 100 MW campus, fluid stagnation causes silicon junction temperature $T_j(t)$ to rise catastrophically:

$$\frac{dT_j(t)}{dt} = \frac{P_{\text{die}} - h_{\text{conv}}(\dot{Q}_{\text{vol}}) \cdot A_{\text{die}} \cdot (T_j - T_{\text{coolant}})}{C_{\text{thermal}}}$$

Where:
- $P_{\text{die}} = 1,200\text{ W}$ heat dissipation per accelerator.
- $C_{\text{thermal}} = 142\text{ J/K}$ thermal capacitance of the die assembly.
- Heat flux exceeds $140\text{ W/cm}^2$.
- Operating pressure is $6.0\text{ bar}$ with $38.5\text{ L/min}$ PG25 coolant.

```
+-------------------------------------------------------------------------+
|                  COGNITIVE DELAY VS. SILICON SURVIVAL                   |
+-------------------------------------------------------------------------+
| T = 0.0s: Primary pump isolation valve closed by adversary exploit.     |
| T = 12.0s: Die temperature rate of change exceeds 4.2°C/s.             |
| T = 20.0s: Alarms trigger. Operator anchors on "sensor calibration."    |
| T = 35.0s: Decision latency tau_delay continues; operator debating.    |
| T = 45.0s: Silicon junction temperature breaches 94.0°C. DELAMINATION.|
+-------------------------------------------------------------------------+
```

If cognitive bias induces a decision latency $\tau_{\text{delay}} > 35\text{ seconds}$, the physical facility crosses the 45-second thermal trip cliff. The silicon packages experience irreversible thermal delamination before human operators execute manual breaker cutouts.

---

## 6. Systems Assurance: Engineering Remediations

To eliminate the systemic failure modes introduced by cognitive bias, systems assurance mandates three deterministic architectural remediations:

```
+-------------------------------------------------------------------------+
|                  DETERMINISTIC DEFENSIVE ARCHITECTURE                   |
+-------------------------------------------------------------------------+
| REMEDIATION 1: AUTOMATED TWO-PERSON INTEGRITY (TPI)                     |
| Critical commands (valve bypasses, trip inhibitions) require dual-token  |
| cryptographic attestation from independent physical terminals.          |
+-------------------------------------------------------------------------+
| REMEDIATION 2: HARDWIRED ANALOG SIL-3 TRIP LOOPS                        |
| Snap-action thermal switches and pressure relief valves bypass operator |
| HMI consoles entirely, executing physical trips at 85.0°C.             |
+-------------------------------------------------------------------------+
| REMEDIATION 3: INDEPENDENT CONTRAPUNTAL TELEMETRY                       |
| Visual HMI dashboards are accompanied by spatial acoustic telemetry    |
| (MPN), preventing visual anchoring and cognitive tunnel vision.         |
+-------------------------------------------------------------------------+
```

---

## 7. Actuarial Risk Engineering and Reinsurance Treaty Structuring

Quantifying cognitive bias susceptibility allows insurers and corporate risk officers to calculate Annualised Loss Expectancy ($\text{ALE}$) for affirmative cyber property catastrophe policies under Lloyd's Y5381:

$$\text{ALE}_{\text{bias}} = \text{SLE}_{\text{physical}} \times \text{ARO}_{\text{exploit}} = \text{PML}_{\text{hall}} \times \left( \text{ARO}_{\text{baseline}} \cdot \overline{BSS} \right)$$

$$\text{SLE}_{\text{physical}} = \sum_{k=1}^{N_{\text{racks}}} C_{\text{replacement}}(k) + \int_0^{T_{\text{restore}}} \dot{L}_{\text{BI}}(t) \, dt + \Phi_{\text{regulatory}}$$

Where:
- $C_{\text{replacement}}$ is the capital asset replacement cost ($14,400,000\text{ USD}$ per 120-rack hall).
- $\dot{L}_{\text{BI}}(t)$ is the business interruption revenue loss rate ($24,000\text{ USD/hour}$).
- $\Phi_{\text{regulatory}}$ is the statutory fine under EU CRA Article 64.

Deploying cognitive bias mitigation training and automated TPI controls ($C_{\text{controls}} = 180,000\text{ USD}$) reduces the mean team susceptibility $\overline{BSS}$ by 62%, mitigating annualized loss expectancy from $9,200,000\text{ USD}$ to $310,000\text{ USD}$ and yielding a verified Return on Security Investment ($\text{ROSI}$):

$$\text{ROSI} = \frac{(\text{ALE}_{\text{unmitigated}} - \text{ALE}_{\text{hardened}}) - C_{\text{controls}}}{C_{\text{controls}}} \times 100\% = \frac{\$8,890,000 - \$180,000}{\$180,000} \times 100\% = 4,838\%$$

Compliance with SFAIRP (So Far As Is Reasonably Practicable) standards protects operators against allegations of gross negligence, securing reduced policy deductibles, eliminating restrictive sub-limit caps, and mitigating accumulation risk across global syndicates.

### 7.1 Catastrophic Accumulation Risk and Reinsurance Layering
In hyperscale campus environments containing 800 liquid-cooled racks across four contiguous halls, human cognitive failure introduces severe correlation risk across reinsurance treaties. If an operations team succumbs to social proof and confirmation bias, a single adversary exploit can compromise all four halls simultaneously. The Probable Maximum Loss ($\text{PML}$) escalates from $14,400,000\text{ USD}$ for a single hall to $57,600,000\text{ USD}$ in hardware damage, plus $115,000,000\text{ USD}$ in consequential business interruption and cloud provider SLA penalties.

Underwriters operating under the Lloyd's Y5381 cyber war and state-backed attack exclusions require proof that cognitive bias cannot induce cross-hall correlated failure. By enforcing automated Two-Person Integrity (TPI) and isolated SIL-3 physical trip interlocks, facility operators prove independent failure domains, allowing reinsurers to eliminate punitive co-insurance penalties, structure realistic attachment points ($5,000,000\text{ USD}$ primary retention), and underwrite affirmative cyber property limits up to $100,000,000\text{ USD}$.

---

## 8. Summary of Engineering Principles

1. **Humans Shift to Heuristics Under Stress:** In crisis conditions, analytical System 2 reasoning collapses into predictable System 1 cognitive shortcuts.
2. **Threat Actors Target Cognition, Not Just Code:** Sophisticated cyber-physical attacks engineer sensory overload to exploit specific cognitive biases.
3. **Decision Latency Causes Physical Destruction:** In liquid-cooled computing facilities, thirty seconds of cognitive hesitation results in permanent hardware destruction.
4. **Autonomous Interlocks Prevent Human Failure:** Critical thermodynamic safety loops must be physically hardwired, bypassing human operator intervention entirely.
5. **Psychometrics Quantifies Actuarial Solvency:** Calculating the Bias Susceptibility Score transforms nebulous human risk into measurable capital protection.
"""

# Final verification: eliminate any lingering em-dashes
content = content.replace('—', '; ')

# Ensure directory exists
os.makedirs(os.path.dirname(dest_path), exist_ok=True)

with open(dest_path, 'w', encoding='utf-8') as f:
    f.write(content)

words = len(content.split())
chars = len(content)
print(f"Successfully compiled {dest_path}")
print(f"Stats: {words:,} words | {chars:,} characters")
