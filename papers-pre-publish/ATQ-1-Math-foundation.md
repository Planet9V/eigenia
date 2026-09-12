In critical infrastructure security, qualitative assessments fail to survive board meetings. CISOs often rank adversaries based on brand recognition—such as declaring that the Lazarus Group is "scarier" than Ember Bear. However, when asked to define *how* much scarier, or how that translates into defensive capital allocation, the conversation collapses into subjective adjectives like "highly sophisticated" or "well-resourced". 

The **Actor Threat Quotient (ATQ)** solves this measurement problem by replacing adjectives with actuarial-grade mathematics. Running in production as a **materialized SQL view against live data (`seldon.atq_scores`)**, the ATQ is a dynamic composite score from **0 to 100** that quantifies the real-time danger an adversary poses to a specific facility.

---

### 1. The Production Formula: Sigmoid Transform

The ATQ does not use simple linear addition. Linear models suffer from extreme value distortion and fail to represent the scaling physics of threat capability. Instead, the database engine aggregates twelve auditable threat dimensions into **eight core components (\\(C_1\\) to \\(C_8\\))** representing layers L0 through L7 of the digital twin. 

These components are processed through a **weighted logistic (sigmoid) transform** to compute the final score:

\\[\mathbf{Z = 1.8 C_1 + 1.4 C_2 + 1.2 C_3 + 1.0 C_4 + 0.8 C_5 + 0.7 C_6 + 0.6 C_7 + 0.5 C_8 - 4.0}\\]

\\[\mathbf{ATQ = \frac{100}{1 + e^{-Z}}}\\]

#### **The Intercept and Centering Physics:**
*   **The -4.0 Intercept:** This value centers the logistic curve. A median threat actor (whose weighted component sum \\(\approx 4.0\\)) produces an ATQ of **50**.
*   **The Sigmoid Ceiling:** A top-tier state-sponsored actor approaching theoretical perfection (all components \\(= 1.0\\), yielding \\(Z = +4.0\\)) tops out at a maximum ATQ of **98.2**.
*   **Uncertainty Confidence Bands:** To ensure statistical transparency, Seldon calculates a **95% Confidence Interval** for every score based on the proportion of populated components:
    \\[\text{Confidence} = \frac{\text{Non-Zero Components}}{8} \quad \text{and} \quad \sigma = \max(2, \text{ATQ} \times (1 - \text{Confidence}) \times 0.3)\\]
    This ensures that highly active actors with complete data profiles have tight, narrow error margins (\\(\approx \pm 3.9\\) points), while poorly documented groups exhibit wider error bands.

---

### 2. The 8 Core Components (\\(C_1\\) through \\(C_8\\)) Deconstructed

Every point in an actor’s ATQ score is traceable back to a specific SQL function executing against active tables:

```
  +---------------------------------------------------------------------------------+
  |                            ATQ FORMULA ARCHITECTURE                             |
  +---------------------------------------------------------------------------------+
  |  C1: EIC Composite (18%)  .......................  0.40*I + 0.35*C + 0.25*O      |
  |  C2: TACAM Affinity (14%)  ......................  TTP + Sector + Protocol + KC  |
  |  C3: Temporal Momentum (12%)  ...................  Recency + Velocity + Incident  |
  |  C4: Incident Evidence (10%)  ...................  Frequency + Severity + Cost   |
  |  C5: Exploit Economics (8%)  ....................  CWE-CVE Join / KEV Ratios     |
  |  C6: Discourse Dynamics (7%)  ...................  Lacanian Discourse + Beta     |
  |  C7: Geopolitical Pressure (6%)  ................  ACLED Conflict Correlation    |
  |  C8: Kramers Penetration (5%)  ..................  Inverse Potential Barrier     |
  +---------------------------------+-----------------------------------------------+
                                    |
                                    v
                         Z = Sum(w_i * C_i) - 4.0
                                    |
                                    v
                           Sigmoid Transform
                                    |
                                    v
                           ATQ Score (0-100)
```

#### **\\(C_1\\): EIC Composite (L6 Psychographic Domain) — Weight 1.8**
*   **Formula:** \\(C_1 = \min(1.0, \ 0.40 \times \text{Intent} + 0.35 \times \text{Capability} + 0.25 \times \text{Opportunity} + 0.15 \times d\_factor)\\)
*   **What it Measures:** The foundational baseline profile of the actor. It is enhanced by the **Dark Triad \\(d\_factor\\)** (psychometric evaluation) stored in `seldon.psychometric_profiles` to adjust for cognitive escalation parameters.

#### **\\(C_2\\): TACAM Affinity (L1-L2 Cyber-Physical Domain) — Weight 1.4**
*   **Formula:** \\(C_2 = \frac{\text{technique\_breadth} + \text{sector\_reach} + \text{protocol\_reach} + \text{kill\_chain\_completeness}}{4}\\)
*   **What it Measures:** The actor's structural alignment with physical operational environments. It checks:
    *   *Technique Breadth:* Techniques utilized / max techniques of any actor.
    *   *Sector Reach:* Target sectors with targeting score \\(> 0.3\\) / 17.
    *   *Protocol Reach:* Target OT protocols with targeting score \\(> 0.3\\) / 12 (e.g., Modbus, OPC-UA).
    *   *Kill Chain Completeness:* Active coverage across the **14 MITRE ATT&CK for ICS tactics**.

#### **\\(C_3\\): Temporal Momentum (L7 Temporal Domain) — Weight 1.2**
*   **Formula:** \\(C_3 = 0.35 R_{\text{campaign}} + 0.25 V_{\text{EPSS}} + 0.20 V_{\text{technique}} + 0.20 R_{\text{incident}}\\)
*   **What it Measures:** The adversary's active operational velocity. It applies a mathematical decay to campaigns (\\(R_{\text{campaign}} = e^{-\frac{\ln 2 \times \Delta t}{90\text{ days}}}\\)) and incident recency (\\(R_{\text{incident}} = e^{-\frac{\ln 2 \times \Delta t}{180\text{ days}}}\\)) to heavily penalize dormant actors, while rewarding actors with rapidly rising exploit velocities (\\(V_{\text{EPSS}}\\)).

#### **\\(C_4\\): Incident Evidence (L5 Economic Domain) — Weight 1.0**
*   **Formula:** \\(C_4 = 0.40 F + 0.30 S + 0.30 K\\)
*   **What it Measures:** The historical cost trail. It indexes attack frequency (\\(F\\)), severity breakdown (\\(S\\)), and cumulative dollar-denominated loss cost (\\(K\\)) logged in the `threat_incidents` database over the last 24 months.

#### **\\(C_5\\): Exploit Economics Index (L5/L7 Synthesis) — Weight 0.8**
*   **Formula:** \\(C_5 = \min(1.0, \ 0.60 \times EEI + 0.40 \times EPSS_{\text{avg}})\\) (or proxy fallback: \\(EPSS_{\text{avg}} \times 1.5 + \frac{KEV_{\text{count}}}{CWE_{\text{count}}} \times 0.2\\))
*   **What it Measures:** Attacker exploitation efficiency. It maps the average exploitability of the actor’s preferred CWEs against active CISA KEV listings to determine how "cheaply" the adversary can successfully compromise a target.

#### **\\(C_6\\): Discourse Dynamics (L6 Psychographic Domain) — Weight 0.7**
*   **Formula:** \\(C_6 = \min(1.0, \ D_{\text{base}} + B_{\text{bifurcation}} + M_{\text{stability}})\\)
*   **What it Measures:** The narrative and psychological posture of the threat group. Seldon parses communication feeds into Lacanian discourse states (e.g., *Hysteric* \\(= 0.80\\), *Master* \\(= 0.65\\), *Analyst* \\(= 0.60\\)) and applies a **bifurcation boost** if the actor is approaching a rapid behavioral transition phase.

#### **\\(C_7\\): Geopolitical Pressure (L4 Geopolitical Domain) — Weight 0.6**
*   **Formula:** \\(C_7 = \min(1.0, \ 0.40 T_{\text{origin}} + 0.30 T_{\text{target}} + 0.30 C_{\text{conflict}})\\)
*   **What it Measures:** Geopolitical alignment. Pulling real-time event counts from **ACLED** and regional tension indices, it correlates active military conflicts, trade sanctions, and state-sponsorship indices directly with the threat actor node.

#### **\\(C_8\\): Kramers Barrier Penetration (L0-L2 Physics Domain) — Weight 0.5**
*   **Formula:** \\(C_8 = \max\left(0, \ 1.0 - \frac{\bar{h} \times f_{\text{adj}}}{h_{\text{max}}}\right)\\)
*   **What it Measures:** The adversary's technical ability to defeat physical zone segmentation. A lower average network potential barrier height (\\(\bar{h}\\)) indicates high penetration capability, translating to a maximum \\(C_8\\) score.

---

### 3. The Science of Saturation Thresholds: Eliminating the V1 "Ceiling Effect"

In Seldon's **V1 scoring model**, the ATQ suffered from a severe design flaw: its parameters saturated too quickly. For instance, if the "Incident Count" component hit its maximum value at just 3 attributed incidents, almost every state-sponsored actor instantly scored a perfect 1.0. This created a tight "ceiling effect," compressing the top 30 global threat groups into a narrow 2.9-point tie (between 80.3 and 83.2).

```
  V1 STATIC CEILING (Ceiling Effect: Narrow 2.9-Point Range)
  [Lazarus: 83.2]=======[APT28: 81.9]=======[Ember Bear: 80.8]=======[CyberAv3ngers: 80.3]
  
  V2 DYNAMIC EMISSIVITY (Calibrated spread: Expanded 10.6-Point Range)
  [Lazarus: 83.2]-----------------[Volt Typhoon: 82.9]---------[APT41: 80.7]-----[CyberAv3ngers: 68.4]
```

To solve this, the **V2 Reform** retuned the saturation limits against the empirical distribution of real-world threat campaigns:
*   **Incident Count Saturation:** Raised from \\(\div 3\\) to **\\(\div 20\\)**.
*   **Vendor Product Exposure (CPE):** Raised from \\(\div 15\\) to **\\(\div 50\\)**.
*   **Technique Reach:** Raised from \\(\div 80\\) to **\\(\div 120\\)**.

#### **The Practical Consequence:**
Under the old model, the low-tier hacktivist collective **CyberAv3ngers** (8 incidents) scored the exact same incident-count metric as the **Lazarus Group** (120 incidents). Under the V2 formula, CyberAv3ngers' incident score correctly drops to **0.40**, whereas Lazarus remains saturated at **1.0**. 

This spread the top-tier rankings by **10.6 points**, allowing **Volt Typhoon (ATQ 82.9)** to surge past legacy actors due to their active, pre-positioned posture and high geopolitical momentum.

---

### 4. Continuous Recalculation: Tracking "Actor Drift"

Threat intelligence is not a static report; it is a trajectory. The ATQ is driven by event-based **PostgreSQL database triggers**:

```
[ New Incident Logged ] ------> trg_atq_auto_roster() -------\
[ EPSS Daily Ingestion ] -----> trg_atq_recompute_eic() ------> [ atq_compute_batch() ] ---> Upsert seldon.atq_scores
[ ACLED Conflict Event ] ----> trg_atq_recompute_temporal() -/
```

Whenever a new incident is written to `threat_incidents` or an EPSS score surges on a critical PLC vulnerability, triggers automatically enqueue the affected threat actors into the `atq_recompute_queue`. 

The system runs batch recalculations and writes snapshot records to `seldon.atq_score_history`. By querying these **historical snapshot epochs**, security analysts can track **"Actor Drift"** over time:

> *“In the 90 days following a regional geopolitical conflict escalation, APT41’s ATQ score drifted upward by **2.3 points**, driven by localized geopolitical tension (+1.4), rapid exploit velocity on targeted mechatronics firmwares (+0.6), and campaign recency (+0.3).”*

---

### 5. Downstream Execution: How the Twin Leverages ATQ

The ATQ does not sit idle on a dashboard. It serves as a real-time mathematical input for the twin's core execution engines:

1.  **The Monte Carlo B2 Boost Map (`mc-weights.ts`):** 
    When the simulation executes random walks, it queries Postgres for the active **TACAM Temporal Recency modifier**. The walk weight (\\(w\\)) for edges originating from an active, high-ATQ actor is boosted by up to **1.5x** (\\(0.3 + 1.2 \times \text{recency}\\)). This forces the simulation walkers down the most realistic, threat-active pathways.
2.  **Seldon Rating (Top-Down Threat Pressure):** 
    Your facility's Seldon Rating is calculated by combining internal vulnerabilities with **external threat pressure**. Seldon parses your DEXPI-imported hardware tags and SBOMs, searches the TACAM matrix to find which actors target those exact components, and weights the threat component of your score by those actors' specific ATQs.
3.  **The Gordon-Loeb Capital Allocation Model:** 
    Because highly active, high-ATQ adversaries boost the likelihood of successful simulated breach paths, they directly drive up the facility’s **Annual Loss Expectancy (ALE)**. This shift in expected loss mathematically raises the Gordon-Loeb optimal security spend boundary, providing hard financial justification to the board.

***
