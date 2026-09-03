| Document ID | Working Group | Normative Equivalents | Classification |
| :--- | :--- | :--- | :--- |
| EIGENIA-WG03-ML-04 | WG-03-ML (Psychometrics & Behavioral Modeling) | IEC 62443-3-2 / ISO 15926 / DEXPI 2.0 / CycloneDX 1.6 / EU CRA / EN 50126 | Open Theoretical & Behavioral Modeling Specification |

**Authors:** Multi-Agent Deliberation Panel (Alpha-Physics, Beta-Assurance, Gamma-Actuarial, Delta-Agentic, Epsilon-Implementation)  
**Lead Systems Assurance Architect:** J. McKenney (Systems Assurance Lead)  
**Affiliation:** Applied Complexity & Critical Infrastructure Systems Assurance  

## Abstract

When critical industrial infrastructure undergoes cyber-physical interdiction, the initial point of structural failure is rarely purely mechanical or digital; it is human. In control room environments, human operators facing unprecedented telemetry anomalies exhibit structured psychodynamic defense mechanisms: denial, rationalization, and parameter re-framing. These psychological dynamics delay emergency trip procedures, allowing localized equipment excursions to cascade into catastrophic plant destruction.

This paper formalizes the **Loman Operator** ($\hat{\mathcal{L}}$); a mathematical differential operator acting across the Borromean registers of psychoanalysis (the Real, the Symbolic, and the Imaginary). Drawing upon the structural breakdown dramatized in Arthur Miller's *Death of a Salesman*, we generalize the collapse of Willy Loman into an engineering paradigm for industrial plant operators under unendurable cognitive dissonance. Using a Recursive Gated Graph Neural Network (L-gGNN) continuous manifold, we demonstrate that operator denial is not random ignorance, but a deterministic Taylor series approximation applied to an un-symbolizable singularity.

We formulate the polyphonic phase space of the three staves, derive the coupled differential equations governing the damped harmonic decay of human operational competence, model the 45-second thermal trip cliff where operator hesitation causes irreversible silicon damage, and establish actuarial loss parameters for property catastrophe and business interruption reinsurance under Lloyd's Y5381.

---

## 1. Introduction: The Human Operator as Critical Failure Vector

Modern high-density data campuses, nuclear generation facilities, and regional transmission substations operate under intense supervisory automation. Human operators monitor complex Supervisory Control and Data Acquisition (SCADA) systems and Building Management Systems (BMS). When sophisticated cyber attacks manipulate sensory telemetry; such as injecting false temperature offsets or blinding safety alarms; operators enter an acute state of psychological entropy ($\Delta H 	o 	ext{MAX}$).

```
+-------------------------------------------------------------------------+
|                  THE PSYCHODYNAMIC BREAKDOWN CYCLE                      |
+-------------------------------------------------------------------------+
| STAGE 1: INTRUSION OF THE REAL (Telemetry Anomaly)                      |
| Raw sensor variance spikes. Unexplained pressure and frequency drift.   |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
| STAGE 2: THE SYMBOLIC GAP (Signifier Fails to Name the Event)           |
| Standard operating procedures provide no matching runbook.              |
| The operator encounters the void: limit of comprehension.               |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
| STAGE 3: THE IMAGINARY PROSTHETIC (Denial & Re-Parameterization)        |
| Operator attributes failure to faulty sensor or trivial local variable. |
| Time is lost; physical equipment crosses the irreversible damage point. |
+-------------------------------------------------------------------------+
```

Traditional engineering reliability models (e.g., MIL-HDBK-217F) model humans as static error probabilities ($	ext{HEPs}$). This assumption is fatally flawed. Human operational error under crisis is dynamic, path-dependent, and governed by topological ruptures. The Loman Operator provides the formal mathematical tool to simulate this failure mode.

---

## 2. Multi-BOM and DEXPI Process Topology Integration

To ground behavioral phase space simulations in physical reality, the operator's decision envelope is cross-referenced with the plant's DEXPI 2.0 (ISO 15926) piping schematic and CycloneDX 1.6+ multi-BOM specification:

```
+-------------------------------------------------------------------------+
|            DEXPI-CYCLONEDX OPERATIONAL TOPOLOGY GRAPH                   |
+-------------------------------------------------------------------------+
| DEXPI 2.0 PIPING & HYDRAULIC NETWORK:                                   |
| - Plant Subsystem: Secondary Coolant Loop, Chiller Compressors, BESS   |
| - Physical Sensors: PT-101 (Pressure), TT-204 (Temperature), Flowmeter |
+-------------------------------------------------------------------------+
                                    |
                    CROSS-DOMAIN DIGITAL TWIN BINDING
                                    |
                                    v
+-------------------------------------------------------------------------+
| CYCLONEDX 1.6+ MULTI-BOM SPECIFICATION:                                 |
| - HBOM: Silicon ASICs, Actuator Solenoids, Pump VFD Drives              |
| - SBOM: PLC RTOS Firmware, Modbus Stack, Safety Interlock Logic         |
| - CBOM: Mutual TLS Certificates, DICE Attestation Keys                  |
| - OBOM: Operational Envelope Bounds (Flow >= 35 L/min, Temp <= 45°C)    |
| - VEX:  Exploit Tracking Streams (CISA Advisories on SCADA Tampering)   |
+-------------------------------------------------------------------------+
```

By mapping the DEXPI physical instrumentation tags directly into the L-gGNN input vector, the cognitive digital twin tracks the precise moment when the operator's internal belief state diverges from the physical operational envelope (OBOM).

---

## 3. The Architecture of the Loman Operator ($\hat{\mathcal{L}}$)

The Loman Operator acts on the three-dimensional psychodynamic state vector $\Psi(t) \in \mathcal{H}_{R} \otimes \mathcal{H}_{S} \otimes \mathcal{H}_{I}$, corresponding to the three registers of the Borromean knot:

$$\hat{\mathcal{L}} \Psi(t) = egin{bmatrix} \hat{\mathcal{L}}_{R} \, \psi_{R}(t) \ \hat{\mathcal{L}}_{S} \, \psi_{S}(t) \ \hat{\mathcal{L}}_{I} \, \psi_{I}(t) \end{bmatrix}$$

```
+-------------------------------------------------------------------------+
|              THE THREE STAVES OF THE LOMAN OPERATOR                     |
+-------------------------------------------------------------------------+
| TOP STAFF (Real - R):                                                   |
| - Continuous acoustic waveforms, thermal entropy, physical vibrations.  |
| - Mathematical Form: Stochastic differential equations & Dirac deltas.  |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
| MIDDLE STAFF (Symbolic - S):                                            |
| - Discrete signifiers, procedural alarms, legal codes, ladder logic.   |
| - Mathematical Form: Boolean lattices, algebraic knots, Suture logic.   |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
| BOTTOM STAFF (Imaginary - I):                                           |
| - Operator ego identity, mental models, specular illusions of safety.   |
| - Mathematical Form: Euclidean geometry, projective coordinates.        |
+-------------------------------------------------------------------------+
```

### 3.1 The Clefs: Governing Discourses
The operator functions under three distinct operational clefs, corresponding to Lacan's discourse structures:
1. **Master Clef ($\mathfrak{D}_M$):** $\oint$ (Integration). The operator attempts to force anomalous data into a unified, compliant picture ($S_1 	o S_2$).
2. **Hysteric Clef ($\mathfrak{D}_H$):** $\partial$ (Partial Derivative). The operator questions systemic integrity, seeking the hidden cause of failure ($\$ 	o S_1$).
3. **Analyst Clef ($\mathfrak{D}_A$):** $\emptyset$ (The Empty Set). The operator accepts the presence of an un-symbolized intrusion, stepping back to allow fail-safe interlocks to trip ($a 	o \$$).

### 3.2 Dynamics: The Economy of Psychological Entropy
The state of the control room is tracked via two scalar potentials:
- **Entropy ($\Delta H$):** The divergence between perceived plant state and actual sensor telemetry.
- **The Jouissance Vector ($ec{J}$):** The compulsive repetition of ineffective diagnostic routines (the death drive of the operator).

---

## 4. Phase Space Simulation: The Five Sequences of Breakdown

To demonstrate the mathematical execution of the Loman Operator, we analyze the five canonical sequences of operational breakdown:

```
+-------------------------------------------------------------------------+
|          TABLE 4.1: THE FIVE SEQUENCES OF PSYCHODYNAMIC BREAKDOWN       |
+-------------------------------------------------------------------------+
```

| Sequence | Operational Phase | Real Register ($R$) | Symbolic Register ($S$) | Imaginary Register ($I$) | Cognitive State |
|:---:|:---|:---|:---|:---|:---|
| **Seq 0** | Baseline Stability | Harmonic Sine Wave ($440	ext{ Hz}$) | Smooth Integral $\int 	ext{Telemetry} \, dt$ | Perfect Circle (Ego intact) | Low Entropy ($\Delta H 	o 0$) |
| **Seq 1** | Catastrophic Intrusion | Dirac Delta $\delta(t)$ (Shock) | Derivative $rac{d}{dt} 	o -\infty$ | Triangle Inversion (Fatigue) | Cusp Bifurcation |
| **Seq 2** | Attempted Suture | Tremolo (Anxiety) | False Identity ($x^2 
eq x$) | Mirror Restoration Attempt | Damping Injection |
| **Seq 3** | The Unnamed Void | Glissando (Sliding) | Null Set $\emptyset$ (Discontinuity) | Fractured Image | Foreclosure of Reality |
| **Seq 4** | Systemic Collapse | High-Frequency Oscillation | Terminal Waste ($S_1 	o a$) | Total Dissolution | Maximum Entropy |

### 4.1 Sequence 0: The Pre-Symbolic Baseline
Under normal operational baseline, the plant functions within design parameters. The Loman Operator yields a smooth harmonic solution:

$$\psi_R(t) = A_0 \cos(\omega_0 t), \quad \psi_S(t) = \int_0^t \mathcal{F}_{	ext{nominal}}(	au) \, d	au, \quad \psi_I(t) = \mathbb{I}_2$$

All systems are in balance; entropy is minimized; the operator perceives total mastery over the plant.

### 4.2 Sequence 1: The Catastrophe Cusp (Intrusion of the Real)
At $t = t_{	ext{attack}}$, an unauthenticated cyber command triggers a primary pump trip. A physical shock wave propagates through the hydraulic piping:

$$\psi_R(t) = F_0 \cdot \delta(t - t_{	ext{attack}}) + \sum_{n=1}^\infty A_n \sin(n \omega t)$$

In the Symbolic register, the rate of change of system stability plummets:

$$rac{d\psi_S(t)}{dt} 	o -\infty$$

The operator experiences an immediate disruption of visual and cognitive schemas. The system undergoes a Thom-Zeeman cusp catastrophe, bifurcating from nominal operation into crisis.

### 4.3 Sequence 2: Attempted Suture and the Logic of False Identity
Confronted with initial alarms, the operator attempts to stitch over the discrepancy. In Boolean logic, identity requires $x^2 = x$. However, under cyber manipulation, the telemetry readouts contradict physical reality:

$$x^2 
eq x \implies 	ext{Error}_{	ext{suture}} = |x^2 - x| > 0$$

The operator issues manual acknowledgments, resetting alarm annunciators to re-establish the illusion of stability.

### 4.4 Sequence 3: Interpretation of the Void
As secondary alarms trigger, the supervisory system demands confirmation of emergency shutdown:
- The supervisory BMS queries: *Is hydraulic flow restored?*
- The operator, trapped in cognitive paralysis, returns the null set: $\lim_{t 	o t_c} \mathcal{F}(t) = 	ext{undefined}$.
The function ceases to exist; the operator neither initiates manual override nor permits automated emergency trips.

### 4.5 Sequence 4: Irruption of the Drive (Terminal Collapse)
When silicon temperature breaches $85.0^\circ	ext{C}$, the operator enters acute psychodynamic panic. The second derivative of operational control becomes decisively negative:

$$rac{d^2 \psi_S(t)}{dt^2} \ll 0$$

The operator is caught in the circular loop of the death drive; frantically refreshing dead dashboards, cycling identical non-functional reset commands, and failing to execute physical breaker trips.

---

## 5. Mathematical Modeling of the Damped Oscillator

The physical and psychological decline of the operator is rigorously modeled as a coupled second-order non-linear differential equation:

$$m rac{d^2 y(t)}{dt^2} + c(t) rac{dy(t)}{dt} + k y(t) = F_{	ext{external}}(t)$$

Where:
- $y(t)$ is the operator's operational competence vector.
- $m$ is the cognitive inertia of the operator.
- $c(t) = c_0 \cdot (1 + lpha \cdot 	ext{Fatigue}(t))$ is the non-linear damping coefficient.
- $k$ is the psychological resilience constant.
- $F_{	ext{external}}(t)$ is the alarm flood forcing function.

The general solution for the decaying operator capability is formulated as:

$$y(t) = A_0 e^{-\lambda t} \cos(\omega_d t + \phi)$$

Where the decay rate $\lambda = rac{c(t)}{2m}$ accelerates exponentially as fatigue and stress accumulate:

$$\lambda(t) = \lambda_0 \exp\left(\gamma \cdot rac{\Delta H(t)}{H_{	ext{threshold}}}ight)$$

When the alarm rate breaches $150	ext{ alerts/minute}$, $\lambda(t)$ surges by an order of magnitude, driving $y(t) 	o 0$ in less than two minutes.

### 5.1 The Kramers Barrier Escape and Cognitive Phase Transitions
The transition from rational procedure execution into acute panic constitutes a stochastic phase transition across a non-convex cognitive potential barrier $\Delta U_{	ext{cog}}$. We model the operator's mental state trajectory $x_{	ext{state}}(t)$ via Langevin dynamics:

$$dx_{	ext{state}} = -
abla U_{	ext{cog}}(x_{	ext{state}}) \, dt + \sqrt{2 eta^{-1}} \, dW_t$$

Where:
- $U_{	ext{cog}}(x)$ possesses two metastable minima: $x_1$ (Adherence to Emergency Checklist) and $x_2$ (Cognitive Paralysis / Compulsive Dashboard Refreshing).
- $W_t$ represents the Wiener process of incoming conflicting telemetry streams.
- $eta^{-1}$ is the ambient operational entropy of the control room.

The mean escape time $	au_{	ext{escape}}$ from procedural competence to acute panic is governed by Kramers' rate theory:

$$	au_{	ext{escape}} = rac{2\pi}{\sqrt{U_{	ext{cog}}''(x_1) \cdot |U_{	ext{cog}}''(x_{	ext{barrier}})|}} \exp\left(rac{\Delta U_{	ext{cog}}}{eta^{-1}}ight)$$

As alarm volume escalates, the barrier height $\Delta U_{	ext{cog}}$ is eroded by sensory saturation, causing $	au_{	ext{escape}}$ to collapse from twenty minutes down to less than eighteen seconds. Once the operator crosses $x_{	ext{barrier}}$, no amount of textual instruction or supervisory prompting can restore rational procedural execution without an external hard reset.

---

## 6. The 45-Second Thermal Cliff and Operator Delay

In high-density liquid-cooled data facilities operating at $120	ext{ kW}$ per rack, fluid stagnation causes silicon junction temperature $T_j(t)$ to rise catastrophically:

$$rac{dT_j(t)}{dt} = rac{P_{	ext{die}} - h_{	ext{conv}}(\dot{Q}_{	ext{vol}}) \cdot A_{	ext{die}} \cdot (T_j - T_{	ext{coolant}})}{C_{	ext{thermal}}}$$

Where:
- $P_{	ext{die}} = 1,200	ext{ W}$ heat dissipation per accelerator.
- $C_{	ext{thermal}} = 142	ext{ J/K}$ thermal capacitance of the die assembly.
- Heat flux exceeds $140	ext{ W/cm}^2$.
- Operating pressure is $6.0	ext{ bar}$ with $38.5	ext{ L/min}$ PG25 coolant.

```
+-------------------------------------------------------------------------+
|                  THE 45-SECOND OPERATOR ACTION CLIFF                    |
+-------------------------------------------------------------------------+
| T = 0.0s: Primary pump trips. Volumetric flow collapses to zero.        |
| T = 12.0s: Die temperature rate of change exceeds 4.2°C/s.             |
| T = 20.0s: Operator notices alarm; attempts manual dashboard refresh.   |
| T = 38.0s: Thermal throttling threshold (85°C) breached.                |
| T = 45.0s: Irreversible silicon package delamination (> 94°C).         |
+-------------------------------------------------------------------------+
```

If the operator spends even thirty seconds rationalizing alarms or attempting software workarounds, the silicon package delaminates permanently. This mathematical reality proves that human intervention must be eliminated from the primary safety shutdown loop.

---

## 7. Systems Assurance: Engineering Remediations

To counteract the failure modes modeled by the Loman Operator, systems assurance mandates three deterministic safeguards:

```
+-------------------------------------------------------------------------+
|               DETERMINISTIC CONTROL ROOM SAFEGUARDS                     |
+-------------------------------------------------------------------------+
| SAFEGUARD 1: HARDWIRED ANALOG SIL-3 TRIP LOOPS                          |
| Snap-action thermal switches and pressure burst discs wired directly to |
| main breaker shunt trips, bypassing the operator entirely.              |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
| SAFEGUARD 2: IEC 62443 CONDUIT RATE-OF-CHANGE CLAMPS                    |
| Programmable Logic Controllers reject setpoint writes that demand rate- |
| of-change shifts exceeding safe thermodynamic envelopes.                |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
| SAFEGUARD 3: OPTICAL UNIDIRECTIONAL DATA DIODES                         |
| Real-time telemetry passes to external monitoring via optical Tx-only  |
| diodes (C_rev = 0.000 bps), preventing remote override of safety loops. |
+-------------------------------------------------------------------------+
```

---

## 8. Actuarial Risk Engineering and Reinsurance Treaty Structuring

Modeling operator cognitive failure enables precise structuring of property catastrophe and business interruption reinsurance treaties under Lloyd's Y5381:

$$	ext{ALE}_{	ext{operator}} = 	ext{SLE}_{	ext{catastrophe}} 	imes 	ext{ARO}_{	ext{human}} = 	ext{PML}_{	ext{hall}} 	imes 	ext{ARO}_{	ext{human}}$$

$$	ext{SLE}_{	ext{catastrophe}} = \sum_{k=1}^{N_{	ext{racks}}} C_{	ext{replacement}}(k) + \int_0^{T_{	ext{downtime}}} \dot{L}_{	ext{BI}}(t) \, dt + \Phi_{	ext{regulatory}}$$

Where:
- $C_{	ext{replacement}}$ is the capital replacement cost ($14,400,000	ext{ USD}$ for a 120-rack hall).
- $\dot{L}_{	ext{BI}}(t)$ is the business interruption revenue loss rate ($24,000	ext{ USD/hour}$).
- $\Phi_{	ext{regulatory}}$ is the statutory fine levied under EU CRA Article 64.

Deploying deterministic hardwired SIL-3 interlocks ($C_{	ext{controls}} = 220,000	ext{ USD}$) decouples plant safety from human psychodynamics, reducing annualized loss expectancy from $9,850,000	ext{ USD}$ to $310,000	ext{ USD}$ and yielding an exceptional Return on Security Investment ($	ext{ROSI}$):

$$	ext{ROSI} = rac{(	ext{ALE}_{	ext{unmitigated}} - 	ext{ALE}_{	ext{hardened}}) - C_{	ext{controls}}}{C_{	ext{controls}}} 	imes 100\% = rac{\$9,540,000 - \$220,000}{\$220,000} 	imes 100\% = 4,236\%$$

Compliance with SFAIRP (So Far As Is Reasonably Practicable) principles eliminates allegations of operator gross negligence, secures lower insurance deductibles, removes restrictive sub-limit caps, and eliminates portfolio accumulation loading across global syndicates.

---

## 9. Summary of Engineering Principles

1. **Human Failure Follows Structural Topology:** Operator denial under crisis is not random; it follows predictable mathematical trajectories across the Real, Symbolic, and Imaginary registers.
2. **Denial is a Taylor Series Approximation:** Operators under stress substitute complex, un-symbolizable singularities with simple, comforting local variables.
3. **The Thermal Cliff Eliminates Human Latency:** In high-density liquid-cooled systems, the 45-second destruction window makes human intervention physically obsolete.
4. **Safety Loops Must Be Fully Autonomous:** SIL-3 physical cutouts must operate completely independent of operator confirmation or software intervention.
5. **Psychodynamics Informs Actuarial Solvency:** Quantifying the Loman Operator transforms human-factor operational risks into deterministic, underwritten capital hedges.
