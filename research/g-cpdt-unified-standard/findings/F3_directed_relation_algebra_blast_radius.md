# Finding F3: Directed Relation Algebra and Deterministic Physical Blast Radius

## 1. The Thesis
A simple equality join between physical equipment and cyber components is mathematically invalid because the domains operate at fundamentally different mereological and functional granularities. G_CPDT introduces a **closed vocabulary of 5 directed relations** that enables deterministic, machine-speed computation of physical blast radius ($\text{Cyber} \to \text{Physical} \to \text{Economic}$).

---

## 2. Why Equality Joins Fail
In naive database joins, an engineer writes:
$$\text{DEXPI.Equipment.TagName} \equiv \text{CycloneDX.Component.Name}$$
This produces catastrophic analysis errors:
1. **Granularity Collapse**: A physical reactor autoclave (`R-101`) contains a vessel, 4 nozzles, a cooling jacket, a magnetic agitator, 3 temperature transmitters, a safety bursting disc, and 2 emergency shutdown valves. Treating all of them as "equal" to the autoclave controller firmware conflates an observation sensor with an explosive bursting disc.
2. **Loss of Causality**: An equality edge has no direction. It cannot distinguish whether Component A commands Component B or merely observes it.

---

## 3. The 5 Directed Relations of G_CPDT

Every assertion in G_CPDT states a directed relationship from the declared object toward the Asset Reference ($UUID_{AR}$):

```
       [Declaring Object]  ------------ (Relation) ------------>  [Asset Reference]
```

| Relation | Formal Semantics | Direction | Inversion Allowed? | Physical Meaning in Digital Twin |
|:---|:---|:---|:---|:---|
| **`identity`** | The object denotes the asset itself. | Bidirectional ($1:1$) | Yes | Bijective mapping between the model object and physical machinery. |
| **`partOf`** | The object is a physical or logical constituent. | Directed (Many $\to 1$) | **NO** | Firmware is `partOf` a controller; nozzle is `partOf` a tank. |
| **`controls`** | The object commands or actuates the asset's state. | Directed (Many $\to$ Many) | **NO** | PLC or valve positioner commands valve opening/closing. |
| **`supplies`** | The object provides working fluid, material, or electrical power. | Directed (Many $\to$ Many) | **NO** | Busbar supplies motor; pipeline supplies coolant to jacket. |
| **`monitors`** | The object passively observes without commanding. | Directed (Many $\to$ Many) | **NO** | RTD sensor or PMU reads state; cannot move metal. |

---

## 4. Blast Radius Traversal Mechanics

### The Core Invariant (Requirement R-13):
> **"A consumer computing physical consequence MUST follow relations in the direction declared, MUST NOT traverse a `monitors` relation as if it were `controls`, and MUST NOT invert a directed relation."** [S06]

### Case 1: Actuation Vulnerability (Kinetic Impact)
- Adversary exploits CVE-2024-XXXX in Modbus library:
  $$\text{CVE} \xrightarrow{\text{affects}} \text{Firmware} \xrightarrow{\text{partOf}} \text{VFD Drive} \xrightarrow{\text{controls}} \text{Pump P-101}$$
- Traversal across DEXPI piping multigraph:
  $$\text{Pump P-101} \xrightarrow{\text{supplies}} \text{Cooling Line L-402} \xrightarrow{\text{connectedTo}} \text{Autoclave PZ-04}$$
- **Physical Result**: Halting the pump reduces coolant flow $Q$ from $45\,\text{L/min}$ to $0\,\text{L/min}$. Temperature derivative $\frac{dT}{dt}$ exceeds exothermic runaway threshold. **Physical blast radius confirmed: Bursting disc rupture.**

### Case 2: Telemetry Vulnerability (Epistemic Impact Only)
- Adversary exploits CVE in temperature transmitter:
  $$\text{CVE} \xrightarrow{\text{affects}} \text{Sensor TT-102} \xrightarrow{\text{monitors}} \text{Pump P-101}$$
- Because the relation is `monitors`, the traversal algorithm terminates at the cyber boundary. **The transmitter cannot command the pump to stop.**
- **Physical Result**: Zero physical kinetic damage. Blast radius is classified as "Telemetry spoofing / Operator confusion," preventing an unnecessary emergency shutdown.
