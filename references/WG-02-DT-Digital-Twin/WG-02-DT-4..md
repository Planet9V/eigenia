
## 3 Technical Deep Dive

Author: jmckenney
Date: 2026 FEB

A technical architecture brief for the CYBER Eigenia Cyber Digital Twin
### The AEON Engine, the McKenney-Lacan Calculus, and the Seven-Layer Graph





---

## Overview: What This System Actually Is

The Eigenia Cyber Digital Twin is not a security tool. It is a **physics engine for organizational risk** — a system that treats a facility, its software, its people, and its geopolitical context as a single dynamical system, then runs the mathematics of physics, epidemiology, statistical mechanics, and psychoanalytic topology against that system to find where it breaks before an adversary does.​

At its core is the **AEON engine** — a Gated Graph Neural Network (GGNN) framework that operates over the seven-layer graph and executes the McKenney-Lacan calculus: a fusion of fluid dynamics, psychometric tensor mathematics, and Lacanian topological psychology built to model the most difficult variable in any security system — the _human being embedded in an organization embedded in a culture embedded in a geopolitical moment_.[[
This is not metaphor. The mathematics are precise, and each equation maps to a real, computable property of the system.

---

## The Seven-Layer Architecture: From Platonic Blueprint to Socioeconomic Reality

The seven layers form a directed, multi-relational graph in Neo4j, where edges across layers carry probabilistic weights that the AEON engine updates in real time. Each layer answers a distinct ontological question about the facility.​

| Layer | Name                | Core Question                                                               | Key Mechanism                                                                                                                                                                                                                                                          |
| ----- | ------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| L0    | Equipment Catalog   | _What should exist?_                                                        | DEXPI 2.0 reference blueprints; vulnerability inheritance from CVE to all instances [[ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/12239403/ee9d682f-e5da-4f79-8542-68d84c0c6510/Cyber-DT.md)]​           |
| L1    | Customer Equipment  | _What actually exists, where, and in what state?_                           | CMDB integration, serial-number-level geo-spatial mapping, cross-sector interdependency graph [[ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/12239403/ee9d682f-e5da-4f79-8542-68d84c0c6510/Cyber-DT.md)]​ |
| L2    | Software SBOM       | _What software is running and how deep does the dependency tree go?_        | SPDX/CycloneDX transitive analysis to 5+ levels; EPSS-enriched CVE scoring [[ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/12239403/ee9d682f-e5da-4f79-8542-68d84c0c6510/Cyber-DT.md)]​                    |
| L3    | Threat Intelligence | _Who is actively trying to attack this specific configuration?_             | Kill chain modeling, Volt Typhoon-style attribution engine, live campaign tracking [[ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/12239403/ee9d682f-e5da-4f79-8542-68d84c0c6510/Cyber-DT.md)]​            |
| L4    | Psychology          | _How will humans behave and misbehave?_                                     | McKenney-Lacan topology; Psychometric Tensor; Bias Cascade simulation [[ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/12239403/ee9d682f-e5da-4f79-8542-68d84c0c6510/Cyber-DT.md)]​                         |
| L5    | Information Streams | _What is happening in the world right now that changes the risk landscape?_ | Sub-second geopolitical correlation; BERT sentiment; echo chamber detection [[ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/12239403/ee9d682f-e5da-4f79-8542-68d84c0c6510/Cyber-DT.md)]​                   |
| L6    | Predictions         | _What happens next, with what probability, and what should we do about it?_ | Psychohistory-grade forecasting; Breach probability; Remediation Lag; ROI simulation [[ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/12239403/ee9d682f-e5da-4f79-8542-68d84c0c6510/Cyber-DT.md)]​          |

The profound architectural insight is that **L0 and L1 represent Taleb's two sides of the table made concrete**. L0 is the Platonic ideal — the reference model, the design specification, the world the vendor sold you. L1 is the real world — the delta, the drift, the undocumented change, the asset that was never patched, the firmware that was substituted in a maintenance window. Every attack that has ever succeeded in a hardened OT facility exploited the gap between L0 and L1. The CBER model _is_ that gap, mapped, quantified, and alive  

## The AEON Engine — Gated Graph Neural Networks Over a Living Graph

A standard Graph Neural Network propagates information across the graph by aggregating neighbor node features iteratively. A **Gated** GNN adds a gating mechanism — analogous to LSTM gates in sequential models — that controls which information is relevant to propagate at each step, and which should be suppressed.

In the Eigenia context, this matters for a very specific reason: the seven layers have radically different temporal dynamics. L2 (SBOM/CVE data) can change when a new CVE is published hourly. L3 (active campaigns) shifts day-to-day as threat actors pivot. L4 (human psychology) shifts over weeks and months as teams experience stress, success, and leadership changes. L5 (geopolitical events) spikes unpredictably. The AEON gating mechanism allows the GNN to propagate the _appropriate_ signal across layers at the _appropriate_ temporal resolution, without L5 geopolitical noise contaminating the slowly-evolving L4 psychometric state, and without stable L0 reference data being overwritten by L1 operational drift.​

The prediction pipeline has three explicit phases:

1. **Feature Extraction at T=0** — Extract the current state vector P(t)P(t)P(t) from Neo4j. Compute Super Label aggregate values across the graph. Calculate the instantaneous derivative dPdt\frac{dP}{dt}dtdP — the _rate of change_ of the security state, not just its current value.
    
2. **Trajectory Sampling (Simulation)** — Run 1,000 Monte Carlo simulations forward in time. Apply the **Shock Response Equation** (governing how the system responds to sudden perturbations — a new zero-day disclosure, a geopolitical event, a leadership change). Apply **Resilience Damping Factors** that encode organizational capacity to absorb shocks.
    
3. **Ensemble Aggregation at T+Δt** — Compute the posterior probability distribution over future security states. Calculate **Entropy** H(t+Δt)H(t+\Delta t)H(t+Δt) — the Shannon information entropy of the predicted state distribution, which is a direct measure of how much uncertainty remains after the simulation. Generate 95% Confidence Intervals for actionable outputs.
    

This is Taleb's Monte Carlo engine, operationalized at facility scale with a living, multi-layer graph as its substrate.

---

## The McKenney-Lacan Calculus — The Mathematical Core of L4

## Why Lacan?

Jacques Lacan's contribution to psychology was topological: he argued that the human subject is organized not as a simple mind, but as a structure across three registers — the **Real** (what is actually threatening but cannot be fully symbolized), the **Imaginary** (the mental model, the story the mind tells itself), and the **Symbolic** (the social language, rules, and roles that organize behavior).​

In security terms, this maps with brutal precision:

- The **Real** threat is the actual attack surface — the vulnerabilities in L2, the active adversary in L3, the organizational weakness in L4 — most of which the defender has _never fully perceived_.
    
- The **Imaginary** is the CISO's threat model — the PowerPoint, the risk register, the compliance score — which is always a partial, idealized, and self-serving representation of the Real.
    
- The **Symbolic** is the vendor market, the compliance frameworks, the industry "best practices" — the shared social language that determines what counts as "doing security right," independent of whether it actually reduces risk.
    

The **McKenney-Lacan topology** in L4 formally models the _gap_ between the Real threat and the Imaginary fear — quantifying the systematic distortions that cause security teams to over-invest in visible, narratively satisfying controls while remaining blind to real, mathematically significant attack paths. This is Taleb's "right side of the table" rendered as a measurable psychological variable.​

---

## The Psychometric Tensor

The foundational mathematical object of L4 is the **Psychometric Tensor**​

Pi=[DISC]⊗[OCEAN]P_i = \begin{bmatrix} D & I \\ S & C \end{bmatrix} \otimes \begin{bmatrix} O & C & E & A & N \end{bmatrix}Pi=[DSIC]⊗[OCEAN]

This is the **Kronecker product** of two psychological measurement frameworks:

- **DISC** (Dominance, Influence, Steadiness, Conscientiousness) — a behavioral assessment that captures _how_ a person acts under normal and pressure conditions
    
- **OCEAN / Big Five** (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism) — the dominant structural model of personality in psychometric science
    
The tensor product ⊗\otimes⊗ does not just combine these — it creates a _new mathematical space_ in which every combination of DISC behavioral tendency and Big Five trait becomes a distinct dimension. The resulting tensor PiP_iPi for individual iii is a 20-dimensional object living in a topological space.​

Why does this matter? Because it allows human behavior to be treated with the same mathematical rigor as physical system behavior. You can compute:

- **Distance** between two individuals' psychometric tensors (how differently will they respond to the same threat signal?)
    
- **Inner products** between a team's collective tensor and a threat scenario's "stress signature" (how much cognitive friction will this specific incident create in this specific team?)
    
- **Trajectories** through the tensor space under stress (how does the team's effective decision-making capacity change as an incident evolves from alert to crisis?)
    

---

## The Interaction Hamiltonian

The McKenney-Lacan calculus borrows the central object of quantum mechanics — the **Hamiltonian** — to model the total "energy" of an incident response scenario:

H=∑i12mivi2+∑i,jVij(xi,xj)H = \sum_i \frac{1}{2} m_i v_i^2 + \sum_{i,j} V_{ij}(x_i, x_j)H=∑i21mivi2+∑i,jVij(xi,xj)

The first term ∑i12mivi2\sum_i \frac{1}{2} m_i v_i^2∑i21mivi2 is the **kinetic energy** of the system — the active cognitive load being expended by each team member iii at velocity (decision rate) viv_ivi, with "mass" mim_imi representing their authority weight and organizational influence.

The second term ∑i,jVij(xi,xj)\sum_{i,j} V_{ij}(x_i, x_j)∑i,jVij(xi,xj) is the **potential energy** of pairwise interactions — the **Dissonance** (friction, conflict, miscommunication, incompatible mental models) and **Consonance** (flow, trust, shared understanding) between every pair of actors iii and jjj in the response team.​

The Hamiltonian is conserved: total "energy" is neither created nor destroyed, only transformed. An organization with high internal dissonance does not expend less total energy — it converts more of its response energy into friction heat rather than effective action. The AEON engine computes HHH in real time and flags when the dissonance potential is high enough to predict coordination failure before it happens.

---

## The Four Dynamical Equations — Physics Applied to Organizational Risk

## Epidemic Threshold — R₀ for Malware Propagation

R0=βγ×λmax⁡(A)R_0 = \frac{\beta}{\gamma} \times \lambda_{\max}(A)R0=γβ×λmax(A)

Where β\betaβ is the transmission rate (probability of lateral movement success per connection per unit time), γ\gammaγ is the recovery rate (patching, isolation, detection speed), and λmax⁡(A)\lambda_{\max}(A)λmax(A) is the **spectral radius** — the largest eigenvalue — of the network adjacency matrix AAA​

This is the epidemiological **basic reproduction number**, mapped to malware propagation. The critical insight is λmax⁡(A)\lambda_{\max}(A)λmax(A): it means that the topology of the network itself — not just the vulnerability of individual nodes — determines epidemic risk. A highly connected network with low individual vulnerability can still have a high R0R_0R0 if λmax⁡(A)\lambda_{\max}(A)λmax(A) is large. **Network segmentation** directly reduces λmax⁡(A)\lambda_{\max}(A)λmax(A) by decomposing the adjacency matrix into disconnected subgraphs.

The AEON engine computes R0R_0R0 continuously over the L1 network graph and identifies which segmentation cuts would most efficiently reduce the spectral radius — a mathematically grounded answer to "where should we segment?" that no compliance framework provides.
## Ising Dynamics — Security Culture as a Phase Transition

dmdt=−m+tanh⁡(β(Jzm+h))\frac{dm}{dt} = -m + \tanh\left(\beta(Jzm + h)\right)dtdm=−m+tanh(β(Jzm+h))

This is the **mean-field Ising equation** from statistical physics, where mmm is the net organizational "magnetization" (the degree to which the security culture is coherently oriented toward good security behavior), JJJ is the interaction strength between individuals (peer influence), zzz is the average number of peers in contact, hhh is the external field (leadership mandate, regulatory pressure), and β=1/T\beta = 1/Tβ=1/T is the inverse organizational temperature (inversely related to noise and chaos).

The Ising model predicts a **phase transition** at a critical temperature TcT_cTc. Below TcT_cTc — in a calm, well-led, coherent organization — the system "magnetizes": security culture spontaneously locks into a high-compliance, high-vigilance state. Above TcT_cTc — in a stressed, understaffed, chaotic organization — the magnetization breaks down, individuals act inconsistently, and the organization cannot sustain a coherent security posture regardless of how many controls are technically deployed.

This is why a mature organization can survive an incident that destroys an equally well-resourced but culturally fragmented one. It is a mathematical property of the organizational temperature, not a function of the technology stack.

## Granovetter Thresholds — Attack Cascades and Critical Mass

r(t+1)=N×F ⁣(r(t)N)r(t+1) = N \times F\!\left(\frac{r(t)}{N}\right)r(t+1)=N×F(Nr(t))

Where r(t)r(t)r(t) is the number of compromised nodes at time ttt, NNN is the total network size, and F(⋅)F(\cdot)F(⋅) is the **cumulative distribution function of individual compromise thresholds** across the network population.​

The cascade condition — self-sustaining attack propagation — occurs when the curve y=F(x)y = F(x)y=F(x) crosses y=xy = xy=x from above. Below this intersection, the attack dies out naturally. Above it, it becomes self-sustaining with no further adversary input required. The AEON engine identifies where in the current network topology this intersection occurs and which **high-threshold nodes** (firewalls, air gaps, network breaks) could be inserted to move the intersection point such that no cascade is geometrically possible below a chosen contamination fraction.

## Bifurcation — Seldon Crisis Detection

dxdt=μ+x2\frac{dx}{dt} = \mu + x^2dtdx=μ+x2

This is the **saddle-node bifurcation** normal form — the simplest mathematical description of a system approaching catastrophic collapse. The parameter μ\muμ represents the "distance from crisis": when μ<0\mu < 0μ<0, two fixed points exist (one stable, one unstable), and the system has a safe attractor. As μ→0\mu \to 0μ→0, the two fixed points approach each other. At μ=0\mu = 0μ=0, they collide and annihilate — the system has no stable state. For μ>0\mu > 0μ>0, the system undergoes runaway growth: collapse.

The architecture names this the **Seldon Crisis** — a deliberate invocation of Asimov's psychohistory, where a "Seldon Crisis" is a historical bifurcation point at which the accumulated pressures on a civilization force a discontinuous, irrevocable transition. The distance to the bifurcation point is proportional to ∣μ∣\sqrt{|\mu|}∣μ∣, which means the system gives **diminishing warning time** as it approaches the crisis. The AEON engine continuously estimates μ\muμ from the current graph state and flags when the system is within a critical window.

---

## The Prediction Pipeline in Full

The three-stage pipeline ties all of this together:​

**Stage 1 — Feature Extraction at T=0T=0T=0**  
Extract the current state vector P(t)P(t)P(t) from Neo4j across all seven layers. Compute Super Label values — aggregate graph metrics that summarize the security posture of a subgraph into a single comparable scalar. Calculate dPdt\frac{dP}{dt}dtdP — the instantaneous rate of change, which tells the system whether conditions are improving or deteriorating and at what velocity.

**Stage 2 — Trajectory Sampling**  
Run 1,000 Monte Carlo simulations forward in time. At each step, apply the Shock Response Equation — a damped harmonic oscillator model of how the system responds to sudden, high-magnitude perturbations (a new zero-day, a regulatory event, a staff departure). Apply resilience damping factors derived from the organizational Hamiltonian and Ising temperature. Each simulation run produces a trajectory through the full seven-layer state space.

**Stage 3 — Ensemble Aggregation at T+ΔtT + \Delta tT+Δt**  
Aggregate the 1,000 trajectories into a **posterior probability distribution** over future security states. Calculate the Shannon entropy H(t+Δt)=−∑ipilog⁡piH(t+\Delta t) = -\sum_i p_i \log p_iH(t+Δt)=−∑ipilogpi of that distribution — a high entropy means the future is genuinely uncertain and diverse interventions are warranted; a low entropy means trajectories are converging on a predictable outcome. Generate 95% confidence intervals for all key metrics and route them into the **NOW/NEXT/NEVER** framework for human decision-makers.

---

## What Makes This a True Talebian System

Taleb's core demand is that you live on the _left side of the table_ — that you operate from honest probability distributions over all possible futures, including the ones you haven't imagined, rather than from comforting narratives. The Eigenia system satisfies this demand at every layer:wikipedia+1

- **L0/L1 gap quantification** makes the "delta between design and reality" a first-class mathematical object, not an assumption that both sides of the table are identical
    
- **L2 transitive SBOM analysis** extends the vulnerability surface to where it actually exists — 5+ levels deep in dependency trees — rather than the visible, obvious surface that every compliance scan covers
    
- **L3 attribution and campaign tracking** grounds the threat in actual adversary behavior, not theoretical TTPs that vendors sell as universal
    
- **L4 McKenney-Lacan topology** makes the human failure modes computable, not narrative
    
- **L5 real-time geopolitical correlation** means the system is never operating on yesterday's risk picture
    
- **L6 psychohistory-grade forecasting** produces explicit probability distributions with confidence intervals — the intellectual antithesis of the binary "compliant / non-compliant" verdict that the security industry sells as risk management
    

The Monte Carlo engine does not look for the most _likely_ attack path. It maps the full distribution. It finds the **Black Swan paths** — the low-probability, high-consequence chains that every point-control solution misses precisely because they are individually improbable. That is the system doing exactly what Taleb argues the financial industry should do and never does: running the full simulation, not the expected-value calculation.wikipedia

The AEON engine, the McKenney-Lacan calculus, the psychometric tensor, the Ising dynamics, the Granovetter thresholds, and the bifurcation detector are not decorations. They are the **mathematical machinery of epistemic honesty** — the formal apparatus for refusing to be fooled by IT security.