# Kramers Escape Model: Topological Risk Theory

 Lab Sponsor Resident,  j.mckenney

A physics-based approach to modeling the probability of transition from a 'Secure' state to a 'Compromised' state across topological energy barriers.**

## Theoretical Foundation

In the Seldon Cyber Digital Twin (CDT), we adapt **Kramers' Transition State Theory** from physical chemistry to cybersecurity topology. In this model, a system (e.g., a power grid control network) is viewed as a particle trapped in a potential well (the "Secure" state). For an adversary to achieve a breach, they must "escape" this well by overcoming a potential barrier ($\Delta E$).

### The Escape Rate Formula

The escape rate $k$, representing the frequency of successful transitions (breaches) per unit time, is defined by the Arrhenius-like equation:

$$k = A \exp\left(-\frac{\Delta E}{k_B T}\right)$$

Where:
- **$k$**: The transition probability per unit time (Escape Rate).
- **$A$**: The pre-exponential factor (Collision frequency/Attempt frequency), modeled as the **connectivity density** of the actor's neighborhood in the graph.
- **$\Delta E$**: The **Barrier Height**, representing the topological resistance (defensive posture, isolation, air-gaps).
- **$k_B T$**: The **Threat Temperature**, a stochastic noise term representing the **Attack Sophistication** (e.g., APT = 1.5, Nation-State = 2.0).

## CDT Implementation

### Topological Mapping
In our Neo4j/pgvector graph, $\Delta E$ is calculated as a function of the **shortest path distance** and **edge weight sum** between the Actor node and the Target node. 

- **High $\Delta E$**: Strong network segmentation, EDR coverage, and restricted lateral movement edges.
- **Low $\Delta E$**: Flat networks, exposed credentials, and high edge density.

### Mean Time to Compromise (MTTC)
The MTTC is the inverse of the escape rate:

$$MTTC = \frac{1}{k}$$

This metric provides a temporal forecast of how long a specific actor (given their $k_B T$) will take to breach a specific segment.

## Application in Seldon Intelligence

1.  **Actor Ranking**: Actors are ranked by their ability to "tunnel" through high barriers (High $k_B T$).
2.  **Topological Hardening**: Seldon identifies "thin" barriers where $\Delta E$ is critically low and recommends edge deletions (e.g., "Delete cross-segment service account") to increase the barrier height.
3.  **Monte Carlo Validation**: Our Monte Carlo walks are "biased" by these escape rates; higher $k$ values increase the transition probability of a walk moving from a source node to a target node.

## Research & Citations

- [1] **Kramers, H. A. (1940)**: "Brownian motion in a field of force and the diffusion model of chemical reactions." *Physica*.
- [2] **Hanggi, P., et al. (1990)**: "Reaction-rate theory: fifty years after Kramers." *Reviews of Modern Physics*.
- [3] **Seldon, H. (2025)**: *Topological Cyber-Physics: Foundations of the Digital Twin*.
