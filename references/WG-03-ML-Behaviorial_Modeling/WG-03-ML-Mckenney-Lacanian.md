
# Mckenney-Lacanian Psychohistory Framework

Lab Sponsor Resident  j.mckenney

A systematic application of Lacanian psychoanalytic theory to the behavioral classification and predictive modeling of threat actors within the Cyber Digital Twin.

## Theoretical Foundation

The Cyber Digital Twin project utilizes Jacques Lacan's theory of the **Four Discourses** (Seminar XVII) to categorize the "social bond" and underlying motivations of threat actors. We move beyond simple "motivation" (Financial, Geopolitical) to analyze the **discursive structure** of the attack—how the actor relates to the "Other" (the victim/the state/the technology).

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
    

## The Four Discourses in Threat Modeling

| Discourse | Agent | Truth | Goal | Threat Actor Typology |
|-----------|-------|-------|------|-----------------------|
| **Master** | Command ($S_1$) | Power | Obedience / Recognition | **State Warfare (Sandworm, Lazarus)** |
| **University** | Knowledge ($S_2$) | Technicality | Universality / Extraction | **Espionage (Volt Typhoon, APT33)** |
| **Hysteric** | Symptom ($\cancel{S}$) | Protest | Questioning the Other | **Hacktivism / High-Ego (Scattered Spider)** |
| **Analyst** | Object ($a$) | Lack | Revelation of Structure | **Quiet Recon / Insider (Dragonfly 2.0)** |

## The Three Registers

Actors are further mapped across Lacan's RSI triad (Real, Symbolic, Imaginary):

1.  **The Real**: The unmediated impact. Actors driven by the Real (e.g., CyberAv3ngers) seek direct physical or biological disruption (Water, Energy).
2.  **The Symbolic**: The law and the letter. Actors driven by the Symbolic (e.g., Volt Typhoon) act as agents of a national security apparatus, following a strategic "code."
3.  **The Imaginary**: The ego and the image. Actors driven by the Imaginary (e.g., LockBit) seek brand recognition, notoriety, and the reflection of their "strength" in the victim's fear.

## Application in Seldon

### Psychometric Scoring
Each threat actor in the Seldon database is assigned a psychometric vector based on their operational history:
- **Discourse Alignment**: Master / University / Hysteric / Analyst.
- **RSI Dominance**: Real / Symbolic / Imaginary.
- **Dark Tetrad Projection**: Narcissism, Machiavellianism, Psychopathy, Sadism.

### Predictive Utility
By understanding an actor's discourse, we can predict their **Targeting Logic**:
- A **University** actor will bypass high-value targets if they lack technical "novelty" or "knowledge" value.
- A **Master** actor will strike at the most symbolically significant node (e.g., the national grid) even if it is not the most efficient path to disruption.
- A **Hysteric** actor is more likely to respond to public taunting or "honey-pots" designed to challenge their ego.


## Research & Citations

- [1] **Lacan, J. (1969-70)**: *Seminar XVII: The Other Side of Psychoanalysis*
- [2] **Žižek, S. (2006)**: *How to Read Lacan*.
- [3] **Mckenney, J. (2022)**: *Psychohistory and the Digital Twin: Modeling the Adversary*