| Field | Value |
|:---|:---|
| Designation | P7, final paper of the three-schema programme |
| Status | Draft for submission |
| Normative language | None. P1 owns R-nn, P2 owns C-nn, P3 owns V-nn, P4 owns F-n and P6 owns F-Rn. This document defines the metric and raises findings F-B1 to F-B9 |
| Licence | Creative Commons Attribution 4.0 International (CC BY 4.0) [1] |
| Extends | Section 4.4 of the two-schema semantic bridge [2]. It generalises that formulation and does not replace it |
| Computes against | RefBESS-250MW [7], with the CIM-thin and split-domain cases of [9] and [10] used as tests |
| Rule on every parameter | Sourced or Modelled. Section 9 labels every one and the two counts add to the row total |

## 1. Scope

Six papers of this programme establish that three open standards describe one physical asset and that a four-field identity binding makes a consequence question computable across them. P1 defines the binding and numbers its obligations R-1 to R-35 [4]. P2 defines the CIM subset the binding attaches to, its conformance rules C-1 to C-10 and its completeness levels L0 to L4 [5]. P3 writes the validation rules V-nn [6]. Three applied papers run the join by hand against three reference assets: an energy site whose electrical leg reaches L4 [8], a manufacturing site whose electrical leg reaches L1 [9], and a rail depot whose electrical leg reaches L4 across a domain split in two [10].

None of the six computes a blast radius. All three applied papers say so explicitly and all three assign the work here. P5 states that it "does not generalise the blast radius formulation" and that it "assigns no numeric coupling weight at all" [9]. P6 states the same and adds that generalising the two-schema multigraph "to three is P7's subject" [10]. P1 assigns hydraulic and thermal propagation to the two-schema work and its generalisation [4].

This paper is that generalisation. It takes the blast radius formulation already published over two ontologies [2], reproduces it, adds an electrical partition to its vertex set with its own edge semantics and its own traversal rules, states the conditions under which the extension reduces exactly to what it extends, and runs it end to end on one named advisory against one named package on one named site.

The result has a scope condition and the scope condition is the point. Two of the three applied cases show the third ontology contributing nothing: on a CIM-thin asset [9], and, as section 8.7 shows for the first time, on a CIM-rich asset when the traversal starts in the wrong place. A metric that claimed uniform benefit from a third ontology would be contradicted by evidence already in this corpus. This one states when the third partition pays and when it does not, and both statements are checkable against published cases.

### 1.1 What this paper does not do

**It does not replace section 4.4.** Section 3 sets out why, and section 4.7 states the reduction that makes the claim testable rather than rhetorical. Any two-schema computation continues to be governed by [2].

**It does not supply exploit likelihood.** Whether a disclosed vulnerability is exploited is a threat question, and this corpus already answers it in two places: TACAM correlates common vulnerabilities and exposures to actors and records membership of the CISA Known Exploited Vulnerabilities catalogue [20], [23], and ATQ makes the Exploit Prediction Scoring System a scored dimension with a base term and a thirty-day velocity term, fed from the FIRST daily feed [21], [22]. Section 7 states what this paper takes from them and what it declines to compose.

**It does not supply a physics model.** The delegated hop that P4, P5 and P6 all mark, where evidence stops being a declared join assertion and becomes a schema's own topology, is marked here too [8], [9], [10]. The metric traverses the DEXPI piping network system; it does not solve it. Head loss, logarithmic mean temperature difference and the affinity laws remain where [2] puts them.

**It does not state a time or a cost.** The three applied papers each refuse both, for the same reason: the reference assets carry no coolant inventory, no thermal mass, no batch value and no commercial model [8], [9], [10]. The actuarial consequence function of [2] section 4.5 is defined over a blast radius set and every one of its terms needs a cost the reference assets omit. This paper computes the set. It does not price it.

**It does not propose a sixth relation.** Section 4.5 needs a fact P1's four fields cannot carry, and P6's F-R2 argues that widening the closed vocabulary is a decision for a P1 revision rather than for an applied paper [10]. F-B9 records the requirement and stops there.

**It does not invent a class name.** P2 defers `Feeder` and P6 records that CPAI has no isolating or earthing device class, both because the published IEC 61970-301 UML is a paid standard the authors do not hold [5], [10], [14]. Nothing here names a class that neither document names.

### 1.2 Conventions, numbering and identifiers

Numbering across the programme has collided once already, which is why P6 prefixed its findings F-R. P4 owns the unprefixed F-n sequence, P5 continues it to F-7, and P6 owns F-R1 to F-R4 [8], [9], [10]. Queries collide too: P4 and P5 share a Q-1 to Q-4 sequence and P6 restarts its own at Q-1. This paper therefore prefixes both. Its findings are F-B1 to F-B9 and its queries are Q-B1 and Q-B2, B for blast radius, so that no reader has to work out which paper a bare F-5 or Q-3 belongs to.

Every asset reference and every master resource identifier quoted here is taken unchanged from the reference architecture that minted it [7], and each is a UUID in the canonical hyphenated lowercase form of RFC 9562 [18], as P1 R-1 requires [4]. Every vendor namespace is synthetic and every registry host sits under a reserved documentation domain, so no package URL here resolves and none can be scanned [19].

Section 9 labels every parameter Sourced or Modelled. **Sourced** means the value is stated in, or is arithmetic over values stated in, a document cited in this paper. **Modelled** means this paper chose it. There is no third category. A row Sourced to [7] may itself be a modelled row inside [7], which labels nineteen of its thirty-two site parameters modelled and says so on every row. Sourced here therefore means traceable to a cited document, not measured on built plant, which is the same discipline P6 states for its own ratio [10].

## 2. The formulation this paper extends

Reproducing what is being extended, before extending it, is not a courtesy. A reader has to be able to see which symbols moved and which did not, and a reviewer has to be able to check that nothing was quietly redefined on the way through.

### 2.1 The plant topology multigraph

The position paper of this working group formalises the DEXPI plant as a directed multigraph [3]:

> DEXPI 2.0 formalizes the plant as a directed multigraph $G_P = (V_P, E_P, \Phi_P)$, where:
>
> $$V_P = V_{\text{equip}} \cup V_{\text{nozzle}} \cup V_{\text{component}} \cup V_{\text{junction}}$$
>
> The edge set $E_P$ represents physical piping connections and electrical/pneumatic instrumentation signals:
>
> $$E_P = E_{\text{fluid}} \cup E_{\text{signal}}$$

Two things in that quotation matter later. The vertex set is entirely made of DEXPI objects, so a nozzle and a junction are vertices and a feeder is not. And $E_{\text{signal}}$ is the only electrical object either document defines: it is instrumentation wiring inside a P&ID, not a network.

### 2.2 The two-schema blast radius, reproduced

Section 4.4 of the semantic bridge reads, in full [2]:

> In the Cyber Digital Twin, the combined DEXPI plant and CycloneDX architecture is represented as a directed multigraph $\mathcal{G} = (\mathcal{V}, \mathcal{E}, \mathcal{W})$, where $\mathcal{V}$ consists of physical equipment nodes $\mathcal{V}_{\text{plant}}$ and cyber components $\mathcal{V}_{\text{cyber}}$, while $\mathcal{E}$ includes physical fluid edges, electrical conduits, and logical network dependencies.
>
> The blast radius $\mathcal{B}(v_{\text{target}})$ resulting from an attack on a physical or cyber node $v_{\text{target}}$ across graph depth $k$ is formulated as:
>
> $$\mathcal{B}(v_{\text{target}}) = \left\{ u \in \mathcal{V} \mid \text{dist}_{\mathcal{G}}(v_{\text{target}}, u) \le k \quad \text{and} \quad \prod_{(x,y) \in \mathcal{P}(v_{\text{target}}, u)} w(x,y) \ge \theta_{\text{impact}} \right\}$$
>
> Where:
>
> - $\text{dist}_{\mathcal{G}}(v_{\text{target}}, u)$ is the shortest path distance in the multigraph.
> - $\mathcal{P}(v_{\text{target}}, u)$ is the directed path from the compromised node to the destination node.
> - $w(x,y) \in (0, 1]$ represents the physical coupling strength or dependency criticality between node $x$ and node $y$.
> - $\theta_{\text{impact}}$ is the minimum propagation threshold governing cascade activation.

That is the whole of it. Four moving parts: a bipartite vertex set, a depth bound, a product of coupling weights along one directed path, and a threshold.

### 2.3 What section 4.4 already carries, and what it cannot

The formulation is stronger than it is usually given credit for and it has one gap that is structural rather than accidental.

**It already carries an electrical edge.** The edge set names electrical conduits. Read against the position paper's $E_{\text{signal}}$, an electrical conduit in the two-schema graph is instrumentation and control wiring between DEXPI objects: the Modbus segment carrying a valve command, the signal line from a transmitter [2], [3]. That reading is this paper's and the source sentence does not choose between it and a wider one. The wider reading, in which an electrical conduit is a power circuit, cannot be sustained, because the two-schema graph has no vertex a power circuit could run between. Either way the conclusion is the same and it is worth stating as a finding rather than as an aside.

> **F-B1.** Section 4.4 names electrical conduits in its edge set and admits no electrical vertex. The two-schema bridge could carry an electrical *edge*, because DEXPI 2.0 already models instrumentation and control wiring between tagged objects [3], [11], and it could not carry an electrical *node*, because neither of its two identity systems names one: a `TagName` names process plant and a `purl` names a package [4], [12], [13]. The generalisation to three ontologies is therefore the addition of a vertex partition, not the addition of an edge type. An implementer who reads P7 as adding electrical edges to an existing graph has misread both papers, and will produce a graph whose new edges have nothing at either end.

**It cannot express common mode over a redundancy set.** The condition is evaluated per destination vertex $u$ against one path $\mathcal{P}(v_{\text{target}}, u)$. A two-out-of-four pump set reached through four separate paths, each individually weak, is not expressible: whatever weight is put on the single shortest path from the firmware to the served function, that number is a claim about one pump and the function does not fail until three are gone. P4 met this exactly and handled it outside the formulation, with a labelled modelled assumption CA-2 carrying the whole finding [8]. Section 4.5 brings it inside.

**It says nothing about which paths may be composed.** P1 R-13 forbids traversing a `monitors` relation as though it were `controls` and forbids inverting a directed relation [4]. Both of P4's and P6's traversals turn on that rule at their direction checks [8], [10]. Section 4.4 has no place to put it, because a bare product over $w(x,y)$ cannot distinguish an edge that moves metal from an edge that falsifies a reading. Section 4.3 adds the type function that gives the rule somewhere to live.

## 3. Extension rather than replacement

### 3.1 Why a parallel formulation would be the wrong artefact

The easy move is to write a new blast radius over three ontologies and let the reader decide which one applies. It would be shorter and it would be wrong, for a reason this repository has already paid for once.

A terminology audit across this corpus found that one abbreviation meant two different things across seven papers, that the count of bill of materials layers was stated as four, five and six in different places, and that four incompatible zone schemes all cited the same standard. Nineteen of fifty-five audit findings were proved by putting two passages side by side. Every one of those defects had the same shape: two definitions of one thing, in one corpus, with no rule for choosing between them.

A second blast radius would be that defect, at the centre of the programme's quantitative claim rather than at its edges. A consumer holding both would have no basis for deciding which set to report, and a reviewer would reasonably read the second as a correction of the first, which it is not.

So this paper is written as a superset. Section 4.6 defines $\mathcal{B}_3$, section 4.7 states the conditions under which $\mathcal{B}_3 = \mathcal{B}$, and section 4.4 of [2] remains the definition for any computation over two ontologies. There is one blast radius in this corpus with a two-schema case and a three-schema case, not two blast radii.

### 3.2 What extension obliges this paper to prove

Choosing extension is cheap. Meeting the obligations it creates is not, and there are four.

**The reduction has to hold exactly, not approximately.** If $\mathcal{B}_3$ returns a different set from $\mathcal{B}$ on a two-schema input, it is a replacement wearing a superset's clothes. Section 4.7 states the conditions and the argument.

**No symbol may change meaning.** $k$, $\theta_{\text{impact}}$, $w(x,y)$ and $\mathcal{P}$ keep the readings section 4.4 gives them. Where this paper needs something section 4.4 does not have, it adds a new symbol rather than widening an existing one. The one place this is strained is $\text{dist}_{\mathcal{G}}$, and section 4.6 says exactly how.

**The extension must survive all three applied cases.** Two of them return a null contribution from the third partition, for two different reasons. A formulation that could only be exhibited on the case where it works would be an advertisement.

**The parameters must be labelled and countable.** Section 9 does this and section 11 says what the labels are worth.

## 4. The graph over three ontologies

### 4.1 The vertex set

$$\mathcal{V} = \mathcal{V}_{\text{plant}} \sqcup \mathcal{V}_{\text{cyber}} \sqcup \mathcal{V}_{\text{elec}}$$

The union is disjoint, and that is a claim rather than a convenience. It holds because P1 R-9 requires the local identity in a join assertion to be expressed in the native identity system of the file that carries it, and forbids expressing it in another leg's system [4]. No object is named twice, so no object is in two partitions.

| Partition | Objects | Identity | Source |
|:---|:---|:---|:---|
| $\mathcal{V}_{\text{plant}}$ | DEXPI 2.0 equipment, nozzles, piping components and junctions, as $V_P$ of [3] | `TagName` plus ISO 15926-4 class | [3], [11], [15] |
| $\mathcal{V}_{\text{cyber}}$ | CycloneDX 1.6 `component` and `service` objects | `bom-ref`, carrying `purl` or `cpe` | [12], [13], [25] |
| $\mathcal{V}_{\text{elec}}$ | instances of the classes CPAI admits, every one a descendant of `IdentifiedObject` | `mRID` plus model authority set | [5], [14] |

$\mathcal{V}_{\text{plant}}$ and $\mathcal{V}_{\text{cyber}}$ are exactly the two partitions of section 4.4, renamed in nothing. $\mathcal{V}_{\text{elec}}$ is the addition.

Membership of $\mathcal{V}_{\text{elec}}$ is decided by P2 and not by this paper. A CIM object outside the CPAI class list is not a vertex, which excludes topological nodes, the measurement package, geographical regions, the asset management classes, state variables, dynamics, direct current classes and market classes [5]. The list is short by design: CPAI admits shape and refuses quantity, so no vertex here carries an impedance, a rating, a tap position or a solved voltage. The precedent is CGMES, which profiled the same model down to a stated business need and was adopted by the IEC as IEC 61970-600-1:2021 and IEC 61970-600-2:2021, both first-edition International Standards published on 4 June 2021 that cancel and replace the 2017 Technical Specifications of the same numbers [16], [17].

Two consequences follow immediately and both are load-bearing later. A vertex in $\mathcal{V}_{\text{elec}}$ carries no quantity, so no weight in this paper can be derived from an electrical calculation; every electrical weight is a choice. And the population of $\mathcal{V}_{\text{elec}}$ is bounded by the CPAI completeness level the producer declares under C-7, which is what makes section 6.2 possible.

### 4.2 The edge set

$$\mathcal{E} = \mathcal{E}_{\text{intra}} \sqcup \mathcal{E}_{\text{join}} \sqcup \mathcal{E}_{\text{rep}}$$

$\mathcal{E}_{\text{intra}}$, **edges inside one ontology.**

$$\mathcal{E}_{\text{intra}} = E_{\text{fluid}} \cup E_{\text{signal}} \cup E_{\text{dep}} \cup E_{\text{cim}}$$

$E_{\text{fluid}}$ and $E_{\text{signal}}$ are $E_P$ of the position paper, unchanged, and sit inside $\mathcal{V}_{\text{plant}}$ [3]. $E_{\text{dep}}$ is the CycloneDX `dependencies` graph, inside $\mathcal{V}_{\text{cyber}}$; P1 R-25 requires a `partOf` component and the component representing its asset to be connected there, so the edges exist in any conformant document [4], [12]. $E_{\text{cim}}$ is the set of associations P2 section 4.3 admits, inside $\mathcal{V}_{\text{elec}}$, and only those the document actually declares, because C-8 forbids a consumer inferring containment, supply or protection from `mRID` values or from naming conventions [5].

$\mathcal{E}_{\text{join}}$, **edges induced by join assertions.**

A join assertion is not an edge. It binds one object to one asset reference under one relation [4]. Edges are induced from assertions sharing a reference, and the induction rule is where P1's traversal obligations are discharged.

Let $a$ be an asset reference and $L(a)$ the set of objects across all files carrying an assertion on $a$. Write $\mathrm{Id}(a)$ for the members of $L(a)$ whose relation is `identity`. R-5 permits at most one per file, so $\mathrm{Id}(a)$ has at most one member per leg [4].

*Rule J1, coalescence.* The members of $\mathrm{Id}(a)$ are one asset seen in up to three ontologies. They form a **co-identity class**, written $[a]$, and edges between members run in both directions with weight $1$ and cost nothing in depth. P4 establishes that two legs asserting `identity` for one reference on one asset is correct and does not trigger R-14, which governs two files claiming `identity` for objects that are *not* the same asset [4], [8].

Charging depth for a hop inside a co-identity class would make $k$ a function of how many legs a site published. The same plant, documented twice, would show two different blast radii, the larger belonging to the better documented site. That is a documentation artefact and not a physical fact, so the coalescence hop is free. The choice is Modelled and it is stated here rather than buried in a definition.

*Rule J2, directed relation edges.* For $u \in L(a)$ with relation $r \notin \{\texttt{identity}\}$, an edge runs $u \to [a]$, and never $[a] \to u$. The direction is the one P1 declares and R-13 forbids inverting it [4]. In words: a constituent reaches the asset it is inside, a controller reaches what it commands, a supplier reaches what it feeds, and none of those runs backwards. A pump failing does not corrupt the firmware inside its drive.

*Rule J3, connectivity expansion.* Where an edge of type $\mathrm{supply}$ lands on a co-identity class containing a CPAI object $e$, and the document declares a `Terminal` on $e$ sharing a `ConnectivityNode` with the `Terminal` of another admitted object $f$, the edge expands to $f$'s co-identity class at the same weight and the same depth. This is P2's own description of what completeness level L2 buys, that a single `supplies` assertion becomes a computable downstream set instead of one edge, written as a rule [5]. It fires only on associations the document actually declares, because C-8 forbids inferring supply from naming conventions, and it is the only place in this formulation where a CPAI association affects the product rather than the report.

$\mathcal{E}_{\text{rep}}$, **reporting edges.**

The containment associations of CPAI, `Equipment` to `EquipmentContainer`, `Bay` to `VoltageLevel` and `VoltageLevel` to `Substation`, are edges in the model and are not edges in a consequence graph. Losing a pump does not lose the cubicle. Both P4 and P6 traversed exactly this chain and reported the objects as *reached and not affected*, each calling the alternative the most likely error in an automated version of the traversal [8], [10].

This paper separates them structurally rather than by weight, and the distinction earns a finding.

> **F-B3.** Containment associations must be excluded from the blast radius product, not assigned a low weight. A low weight is a claim that consequence propagates weakly along containment; the truth is that it does not propagate along containment at all, and the two differ once $\theta_{\text{impact}}$ moves. P4 and P6 both reported a station, a voltage level and a bay as reached and not affected [8], [10]; formalising that as an edge class rather than as a small number is what stops a lowered threshold turning a substation into a casualty. The same holds for the reverse case: a consumer that drops containment edges entirely loses the ability to report *where* the affected objects sit, which is the granularity at which an operator isolates. $\mathcal{E}_{\text{rep}}$ is traversed for reporting and never composed into $\pi$.

### 4.3 Edge types, and the traversal rules they encode

Every edge carries a type under $\tau : \mathcal{E} \to T$.

| Type | Written | Carried by | What it asserts |
|:---|:---|:---|:---|
| coalesce | $\mathrm{coalesce}$ | co-identity class edges, rule J1 | the two objects are one asset in two ontologies |
| constitute | $\mathrm{constitute}$ | `partOf` assertions | the source is inside the target and its failure is the target's |
| actuate | $\mathrm{actuate}$ | `controls` assertions | the source commands the target's state |
| supply | $\mathrm{supply}$ | `supplies` assertions, and $E_{\text{fluid}}$ | the source provides the target's energy or working fluid |
| observe | $\mathrm{observe}$ | `monitors` assertions, and $E_{\text{signal}}$ | the source reads the target and commands nothing |
| contain | $\mathrm{contain}$ | $\mathcal{E}_{\text{rep}}$ | the target encloses the source |

A path is **admissible** when three conditions hold.

1. No edge on it has type $\mathrm{contain}$.
2. At most one edge on it has type $\mathrm{observe}$, and if one does, it is the last edge on the path.
3. Every edge is traversed in its declared direction.

Condition 3 is R-13's second clause. Condition 2 is R-13's first clause, made mechanical. A compromised transmitter falsifies a reading; it does not move metal. What a falsified reading reaches next is an operator or a control loop making a decision, and that decision sits outside all three schemas, so the path stops. Permitting an $\mathrm{observe}$ edge to compose onward would let a traversal walk a monitors relation as though it were controls, which is exactly what R-13 forbids and exactly what P5's H2a warns produces a reach set six times too large on a plant carrying ninety-four monitoring objects against thirty-seven commanding ones [4], [9].

Write $\Pi_A(v,u)$ for the set of admissible paths from $v$ to $u$.

### 4.4 Coupling weights

$w(x,y) \in (0,1]$ keeps section 4.4's reading: the coupling strength or dependency criticality between two nodes [2]. What this paper adds is that the weight is assigned by edge type, not per edge, and that every value is Modelled.

Assigning by type rather than per edge is a limitation dressed as a design. A per-edge weight would need a failure rate, a duty margin or a measured dependency for each pair, and none of the three reference assets carries any of them: RefBESS-250MW publishes no reliability data, RefPharma-API-1 publishes no jacket duty or thermal capacity, and RefDepot-EMU-12 publishes one process fraction which it labels furniture and propagates nowhere [7], [9], [10]. A per-edge schedule computed from those documents would be a schedule of invented numbers wearing three decimal places. Section 9 lists the eleven type weights this paper uses and section 11 states what they are worth.

The schedule is in section 9. Three of its entries need their reasoning stated here because they are not obvious.

$w_{\mathrm{coalesce}} = 1.00$. **Definitional.** The two objects are one asset, so nothing attenuates across the hop.

$w_{\mathrm{supply}}$ **differs between an electrical and a fluid edge.** A breaker opening removes supply completely and there is no partial state, so the electrical supply weight is $1.00$. A piping segment feeding a block is not the only thing standing between a pump and that block, so the fluid supply weight is below one. This is the single place where the electrical partition is *less* uncertain than the process partition, and it is worth noticing: a switch is binary and a pipe is not.

$w_{\mathrm{observe}} = 0.60$. **Lower than every other type**, because a falsified reading has to pass through a decision this graph does not model before it reaches anything physical. The value is a choice and the terminal-edge rule of section 4.3 does most of the work regardless of what number sits here.

### 4.5 The redundancy gate

Section 4.4's condition is evaluated per destination against one path. A redundancy set is not a path phenomenon and no choice of $w$ makes it one.

Let $\mathcal{V}_{\mathrm{fn}} \subseteq \mathcal{V}$ be a designated set of **gate vertices**. A gate vertex is an ordinary vertex of one of the three partitions, not a fourth kind of object, and it is the vertex at which a redundancy set converges: for four circulation pumps at 50 percent, the secondary header they all discharge into; for three chiller packages, the primary chilled water header. Both are DEXPI piping objects and both are in $\mathcal{V}_{\text{plant}}$, so nothing outside the three ontologies is invented to hold the gate. A gate vertex $u$ carries a **support set** $S_u \subseteq \mathcal{V}$ and a requirement $m_u$, meaning $m_u$ members of $S_u$ must be available for the function the vertex represents to hold. Define the gate

$$\sigma_u(B) = \begin{cases} 1 & \text{if } |S_u \setminus B| < m_u \\ 0 & \text{otherwise} \end{cases}$$

and, when the gate fires, the function vertex inherits

$$\pi(u) = w_{\mathrm{gate}} \cdot \min_{s \in S_u \cap B} \pi(s)$$

The minimum is the conservative reading: the function survives until the weakest member the set could still be running on is taken, so the coupling to the function is no stronger than the weakest coupling that had to hold. Depth is assigned the same way, one hop beyond the deepest member the gate needed:

$$\delta(u) = 1 + \max_{s \in S_u \cap B} \delta(s)$$

A gate vertex therefore enters $\mathcal{B}_3$ by the third term of the operator in section 4.6 rather than by a path, and carries a $\pi$ and a $\delta$ that downstream hops compose with in the ordinary way.

> **F-B2.** The single-path product of section 4.4 cannot express common-mode defeat of a redundancy set, and no assignment of $w(x,y)$ repairs it, because the failure condition is a property of a set of paths rather than of any one of them. A set-valued gate is needed. Its cost is that the blast radius stops being a per-vertex predicate computable in one pass and becomes the least fixed point of a monotone operator, which section 4.6 defines and which converges because the operator only adds vertices and $\mathcal{V}$ is finite. P4 met this problem and solved it outside the formulation, with a modelled assumption carrying the whole finding [8]. Bringing it inside is the substantive change this paper makes to the mathematics; the electrical partition is the change to the graph.

The gate needs an input the join cannot carry, and that is a defect worth naming rather than working around quietly.

> **F-B9.** $S_u$ and $m_u$ are facts about a redundancy arrangement, and P1's closed vocabulary of five relations has no form for redundancy, protection or standby. P1 records this as the decision it is least confident about, and P6's F-R2 makes a concrete case against the same closure from a different direction and declines to propose a sixth relation on the ground that widening it is a breaking change for consumers and a decision for a P1 revision [4], [10]. This paper follows P6 and proposes nothing. The consequence is that the gate's input currently arrives from outside the join, from a reference architecture's prose or an engineer's knowledge of the plant, which means the most consequential term in the metric is the one term the identity binding does not carry. A P1 revision considering a sixth relation should weigh this alongside F-R2 rather than separately from it.

### 4.6 The generalised blast radius

Fix a root $v \in \mathcal{V}$, a depth bound $k$ and a threshold $\theta_{\text{impact}}$. Define the path product and the depth cost:

$$\pi(\mathcal{P}) = \prod_{(x,y) \in \mathcal{P}} w(x,y) \qquad\qquad \delta(\mathcal{P}) = \big|\{ (x,y) \in \mathcal{P} \;:\; \tau(x,y) \neq \mathrm{coalesce} \}\big|$$

Then $\mathcal{B}_3(v)$ is the least fixed point of

$$\mathcal{B}_3^{(0)}(v) = \{v\}$$

$$\mathcal{B}_3^{(i+1)}(v) = \mathcal{B}_3^{(i)}(v) \;\cup\; \Big\{ u \in \mathcal{V} \;\Big|\; \max_{\mathcal{P} \in \Pi_A(v,u),\, \delta(\mathcal{P}) \le k} \pi(\mathcal{P}) \;\ge\; \theta_{\text{impact}} \Big\} \;\cup\; \Big\{ u \in \mathcal{V}_{\mathrm{fn}} \;\Big|\; \sigma_u\big(\mathcal{B}_3^{(i)}(v)\big) = 1 \Big\}$$

$$\mathcal{B}_3(v) = \bigcup_{i \ge 0} \mathcal{B}_3^{(i)}(v)$$

The operator is monotone in $\mathcal{B}_3^{(i)}$, since $\sigma_u$ is monotone in $B$ and the path term does not depend on $B$ at all. $\mathcal{V}$ is finite. So the iteration reaches a fixed point in at most $|\mathcal{V}|$ rounds and the least fixed point exists. Where the graph carries no function vertex the third term is empty at every round and the iteration converges after one, which is the case section 4.7 needs.

Three differences from section 4.4 are deliberate and each is stated so a reviewer can object to it individually.

**Maximum over admissible paths, in place of one path.** Section 4.4 evaluates $\mathcal{P}(v_{\text{target}}, u)$, the directed path, and reads $\text{dist}_{\mathcal{G}}$ as the shortest path distance [2]. In a multigraph carrying five relation types there is generally more than one path between two vertices, and the shortest one is not always the strongest: a two-hop path through a `monitors` relation is shorter and weaker than a three-hop path through `partOf` and `controls`. Taking the maximum of $\pi$ over admissible paths within depth $k$ makes the metric report the strongest way the consequence can arrive. Where exactly one admissible path exists the two readings coincide, which is the condition section 4.7 states.

**Depth does not count coalescence hops.** Section 4.5 above gives the reason.

**Function vertices enter by gate rather than by path.** Section 4.5.

### 4.7 The reduction to section 4.4

**Claim.** Let $\mathcal{G}$ be a graph in which $\mathcal{V}_{\text{elec}} = \varnothing$, $\mathcal{E}_{\text{rep}} = \varnothing$, $\mathcal{V}_{\mathrm{fn}} = \varnothing$, no path carries an $\mathrm{observe}$ edge, and exactly one directed path exists between any ordered pair of vertices. Then for every $v$, $k$ and $\theta_{\text{impact}}$,

$$\mathcal{B}_3(v) = \mathcal{B}(v)$$

where $\mathcal{B}$ is section 4.4's blast radius over the same $\mathcal{V}$, $\mathcal{E}$, $\mathcal{W}$, $k$ and $\theta_{\text{impact}}$ [2].

**Argument.** With $\mathcal{V}_{\text{elec}}$ empty the vertex set is $\mathcal{V}_{\text{plant}} \sqcup \mathcal{V}_{\text{cyber}}$, which is section 4.4's. With $\mathcal{E}_{\text{rep}}$ empty and no $\mathrm{observe}$ edge on any path, admissibility reduces to traversal in the declared direction, which section 4.4 assumes by taking a directed path. With one path per pair, $\max_{\mathcal{P}} \pi(\mathcal{P})$ is $\pi$ of that path, and the shortest path is that path, so $\delta(\mathcal{P}) \le k$ is $\text{dist}_{\mathcal{G}}(v,u) \le k$; coalescence hops do not arise because $\mathrm{Id}(a)$ cannot span two partitions when one is empty. With $\mathcal{V}_{\mathrm{fn}}$ empty the third term of the operator is empty at every round, so the iteration converges after one round and the union is the single-pass set. Every clause of the fixed point is then section 4.4's condition, evaluated once, over section 4.4's graph.

The reduction is a construction rather than an empirical result, and it is only as strong as the reading of section 4.4 that section 2.3 sets out. A reviewer who reads section 4.4's electrical conduits as power circuits between electrical vertices would be reading a formulation whose vertex set does not contain them, and this paper cannot make that reading work.

## 5. Directionality, and why the metric is not symmetric

### 5.1 The mediation condition

P6's F-R4 is the sharpest constraint any of the three applied papers places on this formulation, and a metric that silently assumed an undirected or fully connected join would be refuted by it before it was published [10].

RefDepot-EMU-12 is a depot whose process half and traction half share no physical object and never will: there is no pump on the contact line and no contact wire in the air receiver. No object carries both a DEXPI leg and a traction-side CIM leg. And yet P6's Q-1 crosses from one half to the other. It crosses for one reason, which P6 states without hedging [10]:

> The join crossed because two asset references appeared in the `properties` arrays of two component objects sharing one `purl` inside one CycloneDX document, and for no other reason.

The `purl` is `pkg:generic/example-traction/interlock-plc@3.4.0`. One component object carries `controls` toward `0644acbc-0e3d-469d-bca0-6df022f29af3`, which resolves to the CPAI `Switch` instance `ES-OCL-R05`, the road 5 earthing switch. Another carries `controls` toward `1772bca9-e351-48b2-b860-ec96eb58873d`, which resolves to the DEXPI object tagged `P-2402`, the diesel transfer pump. Two component objects, one package URL, one document, two ontologies [10].

Stated as a condition on $\mathcal{G}$: a path may change partition only at a co-identity class $[a]$ whose members span two partitions, or at a vertex $c \in \mathcal{V}_{\text{cyber}}$ carrying assertions on two asset references resolving into two different partitions. Call the second a **mediating component**. RefBESS-250MW crosses by the first route, because pump `P-1101A` and the load object `EC-AUX-P1101A` both assert `identity` on `09a66af0-8c96-4ed1-b2f2-fb9f0e5c8524` [7]. RefDepot-EMU-12 has no co-identity class spanning its two halves at all, and crosses only by the second.

### 5.2 Why a plant-rooted query cannot cross a split domain

P6 tested the crossing from the other end and it failed. Q-3 starts at the road 5 air point isolation valve, a process object, and asks what software can act on anything on road 5. It reaches the compressed air plant, the 400 V loads and their protection firmware, and then stops. P6 states why in a sentence [10]:

> Q-1 crossed because it began at an artefact that happened to carry references on both sides. Q-3 could not cross because it began at a physical object, and physical objects in this depot have no assertion pointing across the split.

This formulation reproduces that outcome without being told to, and the mechanism is worth writing out because it is not obvious that it should.

To get from `XV-2206E` back to the mediating component, a traversal would have to walk an edge from a plant object into a component object. Every edge from $\mathcal{V}_{\text{cyber}}$ into $\mathcal{V}_{\text{plant}}$ induced by rule J2 runs $u \to [a]$, from the component to the asset, because the relations that put them there are `partOf` and `controls`. There is no edge in the other direction. Walking one would be inverting a directed relation, and P1 R-13 forbids it [4]. Admissibility condition 3 of section 4.3 refuses the path.

So P6's Q-3 failure is not a defect in RefDepot-EMU-12's modelling and it is not a shortcoming of P6's traversal technique. It is the traversal rule of the specification the programme is built on, working as written.

> **F-B6.** $\mathcal{B}_3$ is directional and component-mediated, and both properties are consequences of P1 R-13 rather than choices this paper made. A traversal rooted in $\mathcal{V}_{\text{plant}}$ or $\mathcal{V}_{\text{elec}}$ cannot reach a mediating component, because every edge a mediating component induces points away from it and inverting one is forbidden. In a domain whose two physical halves share no object, a plant-rooted blast radius is therefore complete over its own half and silently empty over the other, which is the failure mode F-R4 names [10]. A consumer computing $\mathcal{B}_3$ from a plant root in a split domain MUST NOT report the result as a blast radius without stating which partitions the root could reach at all.

That last sentence is a requirement in shape and this paper owns no requirement numbers, so it is written as a finding and belongs to a P1 or P3 revision to make normative.

### 5.3 Reverse reachability, and the query shape both null results share

P5's Q-4 and P6's Q-3 look like different failures and are the same one.

Q-4 asks which software can stop `P-2141`, a pump with no firmware. Q-3 asks what software can act on anything on road 5. Neither is a blast radius question. A blast radius question fixes a root and asks what it reaches. Both of these fix a destination and ask what reaches it. Write that as

$$\mathcal{B}_3^{-1}(u) = \{\, v \in \mathcal{V} \;:\; u \in \mathcal{B}_3(v) \,\}$$

$\mathcal{B}_3^{-1}$ cannot be computed by walking edges backwards, because backwards is where R-13 stops you. It is computed by enumerating candidate roots, computing $\mathcal{B}_3$ forward from each, and selecting those whose reach contains $u$. That is legal, it is expensive, and it is answerable exactly when two conditions hold: the candidate roots are enumerable, and the forward reach of each is computable.

Both applied failures are one of those two conditions failing.

**P5's Q-4 fails the second.** The roots were enumerable: `BOM-RP-ELE` carries `pkg:generic/example-protection/mcc-relay@2.3.4` on fifty-eight component objects, one per protected outgoing way, each `partOf` its own relay device asset reference [9]. What could not be computed was any forward reach, because none of those fifty-eight relay asset references appears in the CPAI document at all, and the classes that would carry the reach, a `Breaker` or a `ProtectionEquipment` for the outgoing way, do not exist in it. Every candidate has an empty forward reach, so none can be excluded, and the selection returns all fifty-eight. P5's verdict stands and this formulation reproduces the number rather than improving on it [9]:

> A report saying "one of these fifty-eight relays can stop `P-2141`" is true, conformant and operationally worthless.

**P6's Q-3 fails the first.** A maintainer standing at the road 5 air point cannot enumerate the candidate roots, because enumerating them is the question. The forward reach of the mediating component is perfectly computable, as P6's Q-1 demonstrates on the same site with the same files; nobody standing on the process side has any reason to compute it [10].

> **F-B5.** P5's Q-4 and P6's Q-3 are one query shape, reverse reachability, and it is not the shape $\mathcal{B}_3$ computes. Because R-13 forbids inverting a directed relation, a reverse query must be answered by computing forward reach from an enumerated root set and selecting, never by walking backwards. That gives two independent failure conditions and each applied paper exhibited one: P5's roots were enumerable and their forward reach was not computable, returning fifty-eight undifferentiated candidates; P6's forward reach was computable and its roots were not enumerable from where the question was asked, returning an answer that was wrong in the dangerous direction [9], [10]. A consumer offering a reverse query MUST state which of the two conditions it has satisfied. Neither P1 nor P3 currently defines the query shape, so neither has anywhere to put that obligation.

The practical reading is blunt. The question an operator actually asks after a disclosure is a forward one and $\mathcal{B}_3$ answers it. The question a maintainer asks before touching something is a reverse one and $\mathcal{B}_3$ answers it only by brute force over an enumerated root set. P6 observes that the reverse shape "is the shape a maintainer's question actually takes, which makes this the more common case and the more dangerous one" [10]. This paper agrees and does not fix it.

## 6. Null contribution, and the scope condition it forces

### 6.1 The bridge condition

P5 ran its queries with legs removed and reported a result the programme did not expect [9]:

> The Q-3 column shows the third leg contributing nothing at any combination it appears in.

and, on the second query,

> Here the electrical leg is present, conformant, correctly declared, and the same row returns fifty-eight unnarrowed candidates. The join degraded gracefully into an answer nobody can use.

A metric asserting that a third ontology enlarges a blast radius would be refuted by that paper. This one asserts something narrower and testable instead.

For a traversal rooted in $\mathcal{V}_{\text{cyber}}$ to reach $\mathcal{V}_{\text{plant}}$ by a route that does not exist in the two-schema graph, there must be a vertex $e \in \mathcal{V}_{\text{elec}}$ satisfying both halves of the following, and it is a bridge only if both hold.

**(a) Inbound.** Some component asserts `partOf` or `controls` toward the asset reference $e$ carries, so $e$ is reachable from $\mathcal{V}_{\text{cyber}}$.

**(b) Outbound.** $e$ asserts `controls` or `supplies` toward an asset reference resolving into $\mathcal{V}_{\text{plant}}$, or does so after the connectivity expansion of rule J3, so $\mathcal{V}_{\text{plant}}$ is reachable from $e$.

Call this the **bridge condition**. It is checkable against a set of files without running any traversal, which is what makes it useful: a consumer can tell before it starts whether the electrical partition can contribute a path at all.

RefBESS-250MW satisfies it. `PROT-415-A01` is a CPAI `ProtectionEquipment` instance, it is the device `pkg:generic/example-protection/feeder-relay@1.9.2` runs on, and it carries `controls` toward the breaker that carries `supplies` toward a load whose co-identity class contains a tagged pump [7], [8]. Both halves hold on one object.

RefPharma-API-1 fails it, and fails it on both halves at once. The single CPAI instance is `EC-RP-SITE`, an `EnergyConsumer` at the metered site intake. Half (a) fails: no component in any of the six bills of materials asserts anything toward the site intake, because the site intake runs no firmware. Half (b) is satisfied in form, since `EC-RP-SITE` carries `supplies` toward twelve GMP-critical asset references, and satisfying it changes nothing, because the vertex it would bridge from is unreachable [9].

The fifty-eight motor protection relays would satisfy half (a) and there is no CPAI object for them to be, because a `Breaker` or `ProtectionEquipment` for an outgoing way is a class the document does not contain [9].

### 6.2 Completeness level as a sufficient cause

P2 defines five completeness levels and requires the producer to declare which it reaches [5]. The levels turn out to bound the bridge condition, which gives the first scope condition a mechanical form.

| Level | What the CIM leg carries [5] | What $\mathcal{B}_3$ can gain from it |
|:---|:---|:---|
| L0 | no CIM leg | Nothing. $\mathcal{V}_{\text{elec}} = \varnothing$ and $\mathcal{B}_3 = \mathcal{B}$ by section 4.7 |
| L1 | one admitted `IdentifiedObject`, its `mRID`, authority set and relation | The vertex itself, and its outbound `supplies` targets. Half (b) may hold; half (a) holds only if the object runs software, which at L1 it usually does not |
| L2 | plus `Terminal` and `ConnectivityNode` | The connectivity expansion of rule J3, so one `supplies` assertion becomes a downstream set rather than one edge |
| L3 | plus `Bay`, `VoltageLevel`, `Substation`, `BaseVoltage` | Reporting granularity only. Every one of these is a containment association and every containment edge is in $\mathcal{E}_{\text{rep}}$ |
| L4 | plus `Breaker`, `ProtectedSwitch`, `ProtectionEquipment` | Both halves of the bridge condition on one object, because a protection device runs firmware and commands a switch |

**Scope condition SC-1.** Below L4 the electrical partition cannot supply a bridge from $\mathcal{V}_{\text{cyber}}$ to $\mathcal{V}_{\text{plant}}$ that the two-schema graph does not already have, because no admitted class below L4 both runs software and commands supply. It can still enlarge $\mathcal{B}_3$ at L1 and L2, by contributing its own vertices and by expanding a supply edge, and it can still improve reporting at L3. What it cannot do below L4 is create a path.

That is the general form of P5's result. P5's asset is L1, so SC-1 predicts no bridge, and P5 found none. The prediction was available from the declared level alone, before any file was opened, which is more than P5's own analysis could offer and is a direct answer to P5's F-6, which asks P2 to let a consumer state the minimum level a query needs [9].

L3 deserves a note because it looks like it should help and does not. Knowing that an asset sits in `BAY-415-A01` inside `VL-415` inside `SUB-RB01` is exactly what an operator wants in a consequence report, and it carries no consequence, because containment does not propagate. That is F-B3 seen from the other side: the same edges that must be excluded from the product are the ones that make the answer readable.

### 6.3 Root position as a second sufficient cause

SC-1 is not the only way the third partition contributes nothing, and the second way is not visible from P5's asset at all. Section 8.7 exhibits it on an L4 site.

Consider a root in $\mathcal{V}_{\text{cyber}}$ that is `partOf` a device sitting on the load side of the electrical network: drive firmware inside a pump's variable speed drive, a transmitter's firmware, a chiller unit controller. The `partOf` edge lands in $\mathcal{V}_{\text{plant}}$, on the tagged object. The co-identity class of that object may contain an `EnergyConsumer`, and if it does, that vertex enters $\mathcal{B}_3$ for free. From it, every outbound electrical edge is one of two kinds. Containment associations run to the bay, the voltage level and the station, and they are in $\mathcal{E}_{\text{rep}}$. The `supplies` and `controls` relations on the chain point *at* the load, not away from it: RefBESS-250MW's breaker carries `supplies` toward the pump and its protection device carries `controls` toward the breaker [7]. Traversing either would invert a directed relation and R-13 forbids it, which is the direction check P4 and P6 both perform explicitly [4], [8], [10].

**Scope condition SC-2.** A traversal rooted at a component whose only assertion is `partOf` toward a load-side device gains from the electrical partition exactly the vertices of its co-identity classes, all of them terminal, and no downstream consequence, at any completeness level including L4.

> **F-B4.** Null contribution from the electrical partition has two independent sufficient causes, and the two applied papers between them exhibit only one. A CPAI leg below L4 cannot bridge from software to plant, whatever the query (SC-1); and a root bound `partOf` to a load-side device gains nothing from the electrical partition even at L4, because every edge leading further is either containment or an inverted relation (SC-2). P5 found the first and generalised it as a property of thin legs [9]. Section 8.7 finds the second on the richest leg in the programme. A consumer reporting that the third leg "added nothing" must say which of the two it met, because the remedies differ completely: SC-1 is fixed by producing more CIM, and SC-2 is not fixed by anything, because it is a property of the question.

### 6.4 Two measures, because enlargement is the wrong one

P5 states the value of the electrical leg in a sentence that constrains any metric built on top of it [9]:

> The value the CIM leg supplies is discrimination, not existence. The component leg already knows the relay firmware exists. It knows the version, the vendor namespace and the device count. What only the electrical leg can say is which instance of that firmware stands between the software and this particular pump.

A metric that scored the third leg by how many vertices it adds would contradict that directly. So this paper reports two ratios alongside $|\mathcal{B}_3|$, and neither is a count of added vertices.

Let $C$ be the candidate set: the component objects sharing the root's package URL, under the common-mode rule of section 8.2.

**Resolution.**

$$\rho(C) = \frac{\big|\{\, c \in C \;:\; \mathcal{B}_3(c) \cap (\mathcal{V}_{\text{plant}} \cup \mathcal{V}_{\text{elec}}) \neq \varnothing \,\}\big|}{|C|}$$

the fraction of candidates the traversal places on a named physical object. It answers whether the software has been located at all.

**Plant reach.**

$$\lambda(C) = \frac{\big|\{\, c \in C \;:\; \mathcal{B}_3(c) \cap \mathcal{V}_{\text{plant}} \neq \varnothing \,\}\big|}{|C|}$$

the fraction whose reach lands on a tagged process object. It answers whether the located software gets as far as the plant.

The two separate cleanly on the cases. At RefPharma-API-1, the fifty-eight motor protection relays give $\rho = 0$ and $\lambda = 0$ with the electrical leg present and conformant, because the relay device asset references appear in no file but the bill of materials that names them [9]. At RefBESS-250MW, section 8.5 computes $\rho = 1.00$ and $\lambda = 0.42$ for the same query shape on the same class of device.

A word about what $\lambda < 1$ means, because the temptation to read it as an exclusion is strong and P2 forbids it. Fifteen of RefBESS-250MW's twenty-six relays do not reach a tagged process object by any published path. That does not make them safe. It makes them unresolved, and P2's rule that silence is not absence requires a consumer to treat a missing class as an absent statement rather than a negative fact [5]. $\lambda$ measures how much of the candidate set the electrical leg has been able to speak about, not how much of it is harmless.

## 7. Exploit likelihood is not supplied here

$\mathcal{B}_3(v)$ answers one question: given that $v$ is compromised, what does the compromise reach. It contains no term for whether $v$ will be compromised, and adding one would duplicate work this corpus has already done twice.

The Adversary Threat Quotient makes the Exploit Prediction Scoring System two of its twelve scored dimensions: a base term over the mean score of an actor's attributed vulnerabilities, and a velocity term measuring the rate of change of that mean over a thirty-day window, so that an actor pivoting toward newly weaponised exploits registers before the base average moves. Both are fed from the FIRST daily feed [21], [22]. The TACAM matrix carries the complementary signal, correlating vulnerabilities to actors and recording how many of an actor's attributed vulnerabilities sit in the CISA Known Exploited Vulnerabilities catalogue, which is a statement about observed exploitation rather than predicted exploitation [20], [23].

Those are the corpus's exploit-likelihood signals and this paper reuses them by citation rather than restating them. Two things follow and both are refusals.

**This paper does not compose the two.** Multiplying a coupling weight by an exploit probability produces a number, and what that number means is not established. $w(x,y) \in (0,1]$ is a coupling strength, not a probability, and section 4.4 does not say it is one [2]. The product along a path is not a joint probability, because the edges are not independent: four pumps on one field network segment share a failure mode the graph does not carry. Writing $\mathrm{EPSS}(c) \cdot \pi(\mathcal{P})$ would look like a risk score and would be an arithmetic operation on two quantities with different units. Establishing what the composition means is a piece of work this paper has not done, and asserting the product would be the kind of precision P6 warns against, "precision that cannot be checked is worse than no precision, because it reads as evidence" [10].

**No exploit-likelihood value is quoted for the advisory used here.** `SYN-RB-2026-0002` in section 8 is a synthetic identifier against a package URL under a reserved documentation domain [19]. No numbering authority issued it, no such advisory exists, no scoring system has scored it and none ever will. Attaching a score to it would be fabrication, and the same constraint bound P4, P5 and P6 for the same reason [8], [9], [10].

The division of labour is therefore clean. TACAM and ATQ say how likely a root is to be reached. $\mathcal{B}_3$ says what the root reaches. Joining them is a further paper's subject and is not pre-empted here.

## 8. The worked example, end to end

The site is RefBESS-250MW, the 250 MW, 500 MWh lithium iron phosphate installation of [7]. It is used rather than a fourth reference asset because the programme already carries three, because P4 ran the identity traversal over it hop by hop so every binding quoted here can be checked against a published table [8], and because it is the only one of the three whose electrical leg reaches L4 without the domain split that makes RefDepot-EMU-12 a special case.

No parameter of [7] is restated except where a computation needs it, and where it is needed the row is cited. Section 9 lists every parameter this paper adds.

### 8.1 The question

> **Q-B1.** Advisory `SYN-RB-2026-0002` is disclosed against `pkg:generic/example-protection/feeder-relay@1.9.2`, permitting an unauthenticated command to assert a trip on the protected switch. Under the bindings RefBESS-250MW publishes, what is $\mathcal{B}_3$ of the affected component set at $k = 6$ and $\theta_{\text{impact}} = 0.50$, what coupling weight carried each hop, and what does the electrical partition contribute that the two-schema graph does not?

`SYN-RB-2026-0002` is a synthetic advisory identifier. It is not a common vulnerabilities and exposures identifier, no numbering authority issued it, and no such advisory exists. The `SYN-` prefix is there so it cannot be mistaken for one, following the convention P4, P5 and P6 all use [8], [9], [10]. A real identifier could not be used, because the target package URL is itself synthetic and unregistrable [7], [19], and attaching a real advisory to a package that does not exist would be a fabrication.

The root was chosen deliberately. P4's Q-1 starts at drive firmware inside a pump, reaches the pump in one hop, and finds the electrical partition contributes context and nothing else, which its direction check states plainly [8]. Q-B1 starts at the other end of the same site. It is the query where the electrical partition is load-bearing, and section 8.7 runs P4's root through the same metric so the two can be compared with one variable changed.

### 8.2 The root set, and why it is not a singleton

RefBESS-250MW carries twenty-six `ProtectionEquipment` instances, one per bay, and P4 records that the twenty-six run `pkg:generic/example-protection/feeder-relay@1.9.2` from `BOM-RB-PRO` [7], [8]. Under P4's F-1 encoding a package installed on N devices appears as N component objects, each with its own document-local `bom-ref`, all sharing one `purl`, because a CycloneDX `properties` array permits repeated names and gives a consumer no rule for pairing four references with four relations on one object [8], [12]. P6 reached the same encoding from a different direction, one device commanding three objects, and applied it unchanged [10].

**Rule CM, common-mode root set.** Given a root component $c$ with package URL $p$, the root set is $S_0 = \{\, c' \in \mathcal{V}_{\text{cyber}} : \mathrm{purl}(c') = p \,\}$, and $\mathcal{B}_3$ is computed by seeding the fixed point of section 4.6 with $S_0$ in place of $\{v\}$. Nothing else in the definition changes, and the gates of section 4.5 are then evaluated over the union, which is the whole reason the rule is needed.

Rule CM is P4's CA-2 generalised, and it inherits CA-2's status: **Modelled**. P4 states the assumption as one firmware version on four identical drives failing identically under one exploit, and lists three ways to reject it: different hardware revisions, separate network segments, and a site deliberately staggering firmware across a redundancy set [8]. All three apply here and the third applies with more force, because staggering firmware across twenty-six protection relays is a harder operational commitment than staggering it across four drives.

> **F-B8.** Deduplicating a bill of materials by package URL before counting destroys the redundancy gate. Under F-1 the component count is a device count, so twenty-six component objects sharing one `purl` are twenty-six devices [8]. A scanner that collapses them to one component reduces the common-mode root set of rule CM to a singleton, so no support set is ever fully contained in $\mathcal{B}_3$, so no gate of section 4.5 ever fires, so the metric returns the single-device answer and reports no redundancy defeat at all. F-1 recommends that P1 section 6 state the multi-instance encoding rather than leave it to be derived; this is a second and quantitative reason to, because the derived rule is load-bearing for the metric and not only for a count.

### 8.3 The graph fragment

Every object below is named in [7] or [8] except where marked. Master resource identifiers are quoted unchanged, as P1 R-11 requires and P2 C-4 restates [4], [5].

| Vertex | Partition | Identity | Source |
|:---|:---|:---|:---|
| `feeder-relay-1.9.2-partof-prot-415-a01` | $\mathcal{V}_{\text{cyber}}$ | `purl` `pkg:generic/example-protection/feeder-relay@1.9.2`, in `BOM-RB-PRO` | [7], encoding per F-1 [8] |
| `PROT-415-A01` | $\mathcal{V}_{\text{elec}}$ | `mRID` `ee3010f0-5183-40ad-9c48-32dffd7e63a5`, `ProtectionEquipment` | [7] |
| `CB-415-A01` | $\mathcal{V}_{\text{elec}}$ | `mRID` `72c08317-0300-49f2-ba83-df1869f3d755`, `Breaker` | [8] |
| `EC-AUX-P1101A` | $\mathcal{V}_{\text{elec}}$ | `mRID` `0dae4314-dc30-454e-8dd1-5849dee9dcc1`, `EnergyConsumer` | [7] |
| `P-1101A` | $\mathcal{V}_{\text{plant}}$ | `TagName` `P-1101A`, centrifugal pump, 460 m3/h at 45 m head, 90 kW motor | [7] |
| secondary header | $\mathcal{V}_{\text{plant}}$ | untagged DEXPI piping object, evidenced by `PT-1104A/B`, secondary header pressure | [7] |
| block coolant distribution branch | $\mathcal{V}_{\text{plant}}$ | untagged DEXPI piping segment, one per block, carrying `TCV-15xx` and `XV-15xx` | [7] |
| block asset reference | $\mathcal{V}_{\text{plant}}$ | one of the ten block asset references the site controller commands | [7] |

Three of the eight rows need a word.

`CB-415-A01` and its identifier come from P4's hop table rather than from [7]'s class table, which names `CB-220-L01` as its `Breaker` exemplar [7], [8]. Both are exemplars of the same twenty-six instances and P4's is the one on the 415 V auxiliary chain this query uses.

The secondary header and the block distribution branches are DEXPI piping objects and neither carries a `TagName`, so neither carries a join assertion; P1 R-17 attaches the four attributes to the object that carries the tag [4]. They are still vertices, because the position paper's $V_P$ admits $V_{\text{component}}$ and $V_{\text{junction}}$ alongside $V_{\text{equip}}$ [3]. Their presence is inferred from [7]'s own instrumentation: a site with a secondary header pressure transmitter has a secondary header.

The asset reference of `PROT-415-A01` is not published. [7] publishes the identity assignment for pump `P-1101A` in full and gives only exemplar instances for the CPAI classes, so the protection device's asset reference exists in the arrangement and not in the text. This paper mints `4c7b1e0a-93d5-4f62-8a17-b5e0c2d84f39` for it, labels it synthetic at the point of use as P5 does for the references its worked encodings require [9], and notes that nothing in the traversal depends on the value, only on the binding existing.

### 8.4 Traversal A, hop by hop

Each hop names the partition it moves in, the edge type of section 4.3, the weight of section 9, the depth after the hop and the running product. $k = 6$ and $\theta_{\text{impact}} = 0.50$.

| Hop | From, to | Type | $w$ | $\delta$ | $\pi$ |
|:---|:---|:---|---:|---:|---:|
| A1 | relay component object $\to$ `PROT-415-A01` | $\mathrm{constitute}$ | 0.90 | 1 | 0.9000 |
| A2 | `PROT-415-A01` $\to$ `CB-415-A01` | $\mathrm{actuate}$ | 0.95 | 2 | 0.8550 |
| A3 | `CB-415-A01` $\to$ co-identity class of `09a66af0-8c96-4ed1-b2f2-fb9f0e5c8524` | $\mathrm{supply}$ | 1.00 | 3 | 0.8550 |
| A3c | `EC-AUX-P1101A` $\leftrightarrow$ `P-1101A`, inside the class | $\mathrm{coalesce}$ | 1.00 | 3 | 0.8550 |
| A4 | four pumps $\to$ secondary header | gate, section 4.5 | 1.00 | 4 | 0.8550 |
| A5 | secondary header $\to$ block coolant distribution branch | $\mathrm{supply}$ | 0.95 | 5 | 0.8123 |
| A6 | block distribution branch $\to$ block asset reference | $\mathrm{supply}$ | 0.90 | 6 | 0.7310 |

**A1, component to electrical, join hop.** The relay firmware asserts `partOf` toward the protection device it runs inside. This is the crossing from $\mathcal{V}_{\text{cyber}}$ into $\mathcal{V}_{\text{elec}}$ and it satisfies half (a) of the bridge condition. The weight is $w_{\mathrm{constitute}} = 0.90$, the same reading P4 gives its CA-1: a firmware compromise is a loss of the device the firmware is inside, with the residual 0.10 standing for the case P4 names, a device with an independent hardwired function the software cannot defeat [8].

**A2, electrical to electrical, join hop.** `PROT-415-A01` carries `controls` toward the switch it operates, which is the relation assignment [7] publishes for every CPAI `ProtectionEquipment` on the site. The weight is $w_{\mathrm{actuate,prot}} = 0.95$, higher than a general control edge because asserting a trip is the protection device's designed function and there is no interpretation layer between the command and the mechanism.

**A3, electrical to plant, join hop.** `CB-415-A01` carries `supplies` toward the load's asset reference, again the published assignment for a CPAI `Breaker` feeding a load [7]. The weight is $w_{\mathrm{supply,elec}} = 1.00$, because an open breaker removes supply completely: there is no partial state and nothing attenuates. This is the one weight in the schedule that is not a hedge, and it is worth noticing that the electrical partition is the least uncertain of the three at exactly the hop where consequence crosses from software to metal.

**A3c, the coalescence.** `EC-AUX-P1101A` and `P-1101A` both assert `identity` on `09a66af0-8c96-4ed1-b2f2-fb9f0e5c8524` [7]. They are one asset in two ontologies, so the hop costs nothing in depth and nothing in weight, per rule J1. P4 establishes that two legs asserting `identity` on one reference for one asset is correct rather than a conflict [8].

**A3e, the connectivity expansion, which is empty here.** Rule J3 expands a `supply` edge across a shared `ConnectivityNode`. `EC-AUX-P1101A` connects through `T-EC-P1101A`, `mRID` `742a9710-5cde-4442-b2d6-2a81b1f671e2`, to `CN-415-A01`, `mRID` `db595f8f-3517-43af-b032-acd877dba3f4` [7], [8]. RefBESS-250MW publishes twenty-seven connectivity nodes against eleven auxiliary loads in eleven bays and does not publish which loads share a node, so this paper cannot state that any other load sits on `CN-415-A01` and does not assume one does. The expansion is therefore empty on this site and rule J3 is exercised and not tested. A site with two loads on one board section would test it, and none of the three reference assets is one.

**A4, the redundancy gate.** RefBESS-250MW specifies four secondary circulation pumps at 50 percent, each 460 m3/h at 45 m head, against a whole-site secondary flow of 920 m3/h [7]. Dividing the site flow by the pump flow gives two duty and two standby, which is arithmetic on two published rows and not a new number, and P4 states it in the same terms [8]. So the support set of the secondary header is $S = \{$`P-1101A`, `P-1101B`, `P-1102A`, `P-1102B`$\}$ with $m = 2$, and the gate fires when fewer than two remain, that is when three or more are in $\mathcal{B}_3$.

Under rule CM all four are, because all four sit in 415 V auxiliary bays with a protection device running the affected package. So $|S \setminus \mathcal{B}_3| = 0 < 2$ and $\sigma = 1$. The header inherits $\pi = 1.00 \times \min_{s} \pi(s) = 0.8550$ and $\delta = 1 + 3 = 4$.

Two things about A4 are worth separating. The gate is what converts four independent weak paths into one loss of duty, and no assignment of $w$ on any single path could have produced it, which is F-B2. And the gate's input, that these four pumps are one two-out-of-four set, is not carried in any join assertion; it is read out of [7]'s prose and its arithmetic, which is F-B9.

**A5 and A6, plant to plant, delegated and declared.** A5 is a hop inside the DEXPI piping network system, from the header into the branch feeding one block. The join does not carry it; P1 assigns hydraulic propagation to the two-schema work and its generalisation [4], and this paper traverses the topology without solving it. A6 is a join hop again, because [7] places `supplies` on the piping segment feeding a block rather than on the pump.

The boundary between A4 and A5 is where the evidence changes character, from a declared assertion a reader can check in a table to a schema-internal topology a reader has to open the DEXPI file to check. P4, P5 and P6 each mark that boundary rather than smoothing it [8], [9], [10] and this paper marks it here.

### 8.5 The computed set

Two answers are given, because [7] publishes one exemplar per CPAI class and the arrangement it describes covers twenty-six.

**Answer 1, published bindings only.** One relay component object is bound, to `PROT-415-A01`. The gate does not fire, because one pump lost of four leaves three against a requirement of two. $\mathcal{B}_3$ contains five vertices: the root component object, `PROT-415-A01` at $\pi = 0.9000$, `CB-415-A01` at $0.8550$, and the two members of the co-identity class, `EC-AUX-P1101A` and `P-1101A`, both at $0.8550$ and $\delta = 3$. The traversal stops there. $\rho = 1/26 = 0.04$ and $\lambda = 1/26 = 0.04$.

**Answer 2, under assumption CB-1.** CB-1 is stated in section 8.6 and it is the assumption that the arrangement [7] publishes, one breaker and one protection device per bay with the exemplar chain repeated, holds for all twenty-six bays as it does for the exemplar. Under CB-1 and rule CM:

| Partition | Members | Count | $\pi$ | $\delta$ |
|:---|:---|---:|---:|---:|
| $\mathcal{V}_{\text{cyber}}$ | component objects sharing the package URL, the root set | 26 | 1.0000 | 0 |
| $\mathcal{V}_{\text{elec}}$ | `ProtectionEquipment` instances, one per component object | 26 | 0.9000 | 1 |
| $\mathcal{V}_{\text{elec}}$ | `Breaker` instances they operate | 26 | 0.8550 | 2 |
| $\mathcal{V}_{\text{elec}}$ | `EnergyConsumer` instances in the eleven 415 V auxiliary bays | 11 | 0.8550 | 3 |
| $\mathcal{V}_{\text{plant}}$ | tagged objects co-identical with those loads | 11 | 0.8550 | 3 |
| $\mathcal{V}_{\text{plant}}$ | gate vertices: secondary header, primary chilled water header, heat rejection | 3 | 0.8550 | 4 |
| $\mathcal{V}_{\text{plant}}$ | block coolant distribution branches | 10 | 0.8123 | 5 |
| $\mathcal{V}_{\text{plant}}$ | block asset references | 10 | 0.7310 | 6 |
| | **total** | **123** | | |

The eleven tagged objects are the eleven 415 V auxiliary loads of [7], and their composition is arithmetic on its tag block: four circulation pumps `P-1101A/B` and `P-1102A/B`, three chiller packages `CH-1301A/B/C`, three air cooled condensers `AC-1302A/B/C` and one glycol dosing pump `P-1403`. Four plus three plus three plus one is eleven, which reconciles with the published `EnergyConsumer` count and the published count of 415 V auxiliary bays [7], [8]. A traversal whose load population does not reconcile with the tag block is traversing two different sites, so the check is worth running and P4 runs it too.

**Every one of the eleven is thermal plant.** That is not an assumption, it is what the tag block says: the 415 V auxiliary system at RefBESS-250MW exists to run the cooling plant. So a single package URL on twenty-six devices reaches, through eleven of them, the entire thermal plant of a 250 MW battery site.

**Three gates fire, not one.** Circulation is two-out-of-four and all four are taken. Chilled water generation is three packages at 4.0 MW, two duty and one standby, so two-out-of-three, and all three are taken [7]. Heat rejection to ambient is three air cooled condensers; [7] publishes the count and not the duty split, so a two-out-of-three arrangement is assumed by symmetry with the chillers and labelled Modelled in section 9. All three gates fire on the same root set.

**The plate heat exchangers are not in the affected set and stop working anyway.** `HX-1201A/B/C` are three units at 4.0 MW, two duty one standby, separating the primary and secondary loops [7]. They are passive: they carry no motor, so they are not among the eleven `EnergyConsumer` instances, and no path in $\mathcal{B}_3$ reaches them. They also have neither a hot side nor a cold side once both loops stop, which is a physical consequence across the delegated boundary rather than a graph result, and it is reported as such.

**Physical consequence, across the delegated hop.** [7] specifies the secondary loop as the only path from the ten blocks to the plate heat exchangers, the whole-site flow of 920 m3/h delivered by the four circulation pumps against a design heat rejection duty of 8.0 MW thermal, and the cells holding between 15 °C and 35 °C [7], [24]. With the secondary loop, the chilled water plant and the heat rejection plant all defeated by one package URL, there is no heat rejection path of any kind. P4 reached the same endpoint through the four pumps alone; this traversal reaches it three separate ways.

**No time is stated.** How long the cells stay inside the band after flow stops depends on coolant inventory, enclosure thermal mass and instantaneous throughput, and [7] publishes none of the three, which is P4's refusal and it is repeated here rather than quietly relaxed [8].

**No consequence value is stated.** The actuarial loss function of [2] section 4.5 needs a hardware replacement cost, a data reconstruction cost and a business interruption rate for every member of $\mathcal{B}_3$, and [7] carries no commercial model. A figure computed here would be invented.

**Context set, reached and not affected.** For the exemplar chain: `T-EC-P1101A`, `CN-415-A01`, `BAY-415-A01` (`d93a2e1d-9f54-492e-898d-37f57e0022d4`), `VL-415` (`6282fe57-0ff7-40e2-b024-3bdbd277ee31`), `BV-415V` (`944b4431-2c68-4e98-924e-9594e84b45d0`) and `SUB-RB01` (`e4cc3030-e621-419f-ae42-35023375eb75`) [7], [8]. Six objects, every edge to them of type $\mathrm{contain}$ or a topology association, every one in $\mathcal{E}_{\text{rep}}$ and none in the product. The containment closure over the whole affected set is twenty-six bays, four voltage levels, four base voltages and one substation.

The contrast with P4 is worth stating because it is the same site and the same files. In P4's Q-1 the breaker and the protection device are context, reached and not affected [8]. In Q-B1 they are the first two hops of the affected set. Nothing about the model changed. The root moved, and the direction rule did the rest.

### 8.6 What the answer depends on

Each assumption is labelled and each is contestable at the point it is stated. The convention is P4's [8].

**CB-1, Modelled. The published exemplar chain repeats across all twenty-six bays.** [7] gives instance counts and one exemplar per class, and derives the counts from the arrangement in its section 2: one 220 kV line bay, two 220 kV transformer bays, ten 33 kV block feeder bays, two auxiliary transformer bays and eleven 415 V auxiliary bays, each with a breaker and a protection device [7]. CB-1 is the assumption that "each with a breaker and a protection device" means what it says, and that each of those protection devices is bound to its own relay component object in the manner the exemplar is bound. Reject it and the answer is Answer 1, five vertices.

**CM, Modelled. One firmware version on twenty-six identical devices fails identically under one exploit.** Section 8.2 states it and inherits P4's three grounds for rejecting CA-2 [8]. Rejecting CM collapses the root set to one and, with it, every gate.

**CA-1', Modelled. A firmware compromise is a loss of the device the firmware is inside.** P4's CA-1, restated at a protection relay instead of a drive [8]. It is less contestable here than at a drive, because a protection relay's trip path is the thing the firmware exists to command; and a scheme with an independent backup protection device on a separate artefact would defeat it, and [7] specifies none.

**CA-3', Sourced to [7]. The secondary loop is the only heat rejection path from the blocks.** [7] specifies two loops separated by plate heat exchangers with the blocks fed from the secondary, and gives them no alternative. P4 states the same [8].

**The fifteen relays outside the auxiliary bays are unresolved, not excluded.** Three sit at 220 kV and twelve at 33 kV, ten of those on block feeders and two on auxiliary transformer feeders. Opening an auxiliary transformer breaker plainly removes supply from the 415 V board, and [7] does not publish whether the two boards are tied, whether either transformer can carry the whole auxiliary load, or whether the 33 kV collection can be back-fed. So those paths are not traversable and P2's rule that silence is not absence forbids reading them as absent [5]. They are reported as reaching a breaker whose downstream is not published.

**The single-purl reading of the twenty-six relays is P4's and it is in tension with [7]'s own table.** [7] lists two protection artefacts in `BOM-RB-PRO`, `feeder-relay@1.9.2` and `xfmr-diff@1.9.2`, and labels the component table representative; P4 reads the twenty-six as all running `feeder-relay@1.9.2` [7], [8]. This paper follows P4, because P4 owns that reading and contradicting it would put two answers in the corpus. The sensitivity is large and it is stated in section 8.8.

**Basis set.** The component leg is as of `BUILD-RB-2026-0831 2026-08-31`, the process leg as of `PID-RB-COOL-101 rev C 2026-08-14` and the electrical leg as of `NM-RB-EXPORT-2026-Q3 2026-08-20`, a span of seventeen days [7]. P4 sets out which leg the span exposes and the answer is unchanged here: the component leg, because its identity changes on every upgrade, so the finding is as of a basis set rather than as of a date [8].

### 8.7 Traversal B, the same site, the other root

P4's Q-1 root is `pkg:generic/example-automation/vsd-firmware@7.2.1`, the variable speed drive firmware inside the four circulation pumps, in `BOM-RB-THM` [7], [8]. Running the same metric from it, with the same $k$, the same $\theta_{\text{impact}}$, the same weights and the same rules, isolates the effect of the root.

| Hop | From, to | Type | $w$ | $\delta$ | $\pi$ |
|:---|:---|:---|---:|---:|---:|
| B1 | drive component object $\to$ `P-1101A` | $\mathrm{constitute}$ | 0.90 | 1 | 0.9000 |
| B1c | `P-1101A` $\leftrightarrow$ `EC-AUX-P1101A`, inside the class | $\mathrm{coalesce}$ | 1.00 | 1 | 0.9000 |
| B2 | four pumps $\to$ secondary header | gate, section 4.5 | 1.00 | 2 | 0.9000 |
| B3 | secondary header $\to$ block coolant distribution branch | $\mathrm{supply}$ | 0.95 | 3 | 0.8550 |
| B4 | block distribution branch $\to$ block asset reference | $\mathrm{supply}$ | 0.90 | 4 | 0.7695 |

Under rule CM the root set is four component objects, one per drive [8]. $\mathcal{B}_3$ contains 4 component objects, 4 pumps, 4 `EnergyConsumer` instances, 1 gate vertex, 10 branches and 10 block references: 33 vertices.

Now remove $\mathcal{V}_{\text{elec}}$ and run the same thing over the two-schema graph. B1 lands on `P-1101A` directly, because the drive firmware is `partOf` a tagged process object. B1c disappears, taking the four `EnergyConsumer` instances with it. Every other hop is unchanged, because every other hop is inside $\mathcal{V}_{\text{plant}}$. $\mathcal{B}_2$ contains 29 vertices.

**The electrical partition contributes four vertices, all of them terminal, and no consequence whatever.** From each `EnergyConsumer` the only outbound electrical edges are the containment associations to `BAY-415-A01`, `VL-415` and `SUB-RB01`, which are in $\mathcal{E}_{\text{rep}}$, and the inbound `supplies` and `controls` relations from the breaker and the protection device, which R-13 forbids traversing backwards [4], [5]. $\rho$ and $\lambda$ are both $1.00$ with the electrical partition and both $1.00$ without it, because the drives are `partOf` tagged objects and were already placed.

This is SC-2, exhibited on the richest electrical leg in the programme. The site declares L4, its CPAI document carries breakers, protected switches and protection devices, every conformance rule holds, nothing is fabricated, and the third partition buys four labels. P5 reached the same shape of result and attributed it to a thin leg [9]. It is not only thin legs. It is also the wrong root, and no amount of CIM fixes that.

### 8.8 Sensitivity

Q-B1 answer 2, varied one parameter at a time. Everything else held at $k = 6$, $\theta_{\text{impact}} = 0.50$, rule CM and CB-1.

| Varied | Value | $|\mathcal{B}_3|$ | What falls out |
|:---|:---|---:|:---|
| $\theta_{\text{impact}}$ | 0.50 | 123 | nothing |
| $\theta_{\text{impact}}$ | 0.70 | 123 | nothing. The weakest member is a block at 0.7310 |
| $\theta_{\text{impact}}$ | 0.75 | 113 | the ten block asset references |
| $\theta_{\text{impact}}$ | 0.85 | 103 | also the ten block distribution branches |
| $\theta_{\text{impact}}$ | 0.90 | 52 | also the loads, the tagged objects, the gates and the breakers |
| $k$ | 3 | 100 | the three gate vertices and everything past them |
| $k$ | 4 | 103 | the branches and the block references |
| $k$ | 5 | 113 | the block references |
| rule CM rejected | root set 1 | 5 | everything but the exemplar chain. No gate fires |
| CB-1 rejected | 1 bound relay | 5 | as above |
| all 26 relays not one artefact | 11 relays | 78 | the fifteen unresolved chains, forty-five vertices. Every gate still fires |

Three readings of that table matter more than the numbers.

**The result is insensitive to $\theta_{\text{impact}}$ over a wide band and then collapses.** Between 0.50 and 0.70 nothing changes at all, and at 0.90 the set loses more than half its members in one step. The band where the threshold does nothing is wide because the weights are clustered: five of the eleven type weights in section 9 sit between 0.90 and 1.00. That clustering is a property of the schedule this paper chose, not of the plant, and a schedule with more spread would make $\theta_{\text{impact}}$ a more discriminating parameter and would need evidence this paper does not have.

**The result is very sensitive to rule CM and to CB-1.** Rejecting either takes the answer from 123 vertices to 5. Those two assumptions carry the finding, exactly as P4 says CA-2 carries its own, and a reader who wants to attack this result should attack them first and not the weights [8].

**The tension in [7]'s protection table costs little.** If only the eleven auxiliary-bay relays run `feeder-relay@1.9.2` and the transformer bays run `xfmr-diff@1.9.2`, the set drops from 123 to 78, and all three gates still fire, because the eleven auxiliary relays are the ones that reach the thermal plant. The forty-five vertices lost are the fifteen unresolved component objects and the thirty electrical objects they reach, and $\lambda$ rises from 0.42 to 1.00 because every remaining candidate reaches the plant. The physical finding survives the tension; the discrimination result does not, because with a candidate set of eleven there is nothing left to discriminate. That is the sensitivity worth carrying: $\lambda$ is informative only when the candidate set is heterogeneous, and a revision of [7] publishing per-device bindings would settle whether it is.

### 8.9 What the electrical partition contributed, measured

| Root | Asset | CPAI level | $|\mathcal{B}_2|$ | $|\mathcal{B}_3|$ | $\rho$ two-schema | $\rho$ three-schema | $\lambda$ two-schema | $\lambda$ three-schema |
|:---|:---|:---|---:|---:|---:|---:|---:|---:|
| `feeder-relay@1.9.2` | RefBESS-250MW | L4 | 26 | 123 | 0.00 | 1.00 | 0.00 | 0.42 |
| `vsd-firmware@7.2.1` | RefBESS-250MW | L4 | 29 | 33 | 1.00 | 1.00 | 1.00 | 1.00 |
| `batch-controller@8.1.2` | RefPharma-API-1 | L1 | 23 | 23 | 1.00 | 1.00 | 1.00 | 1.00 |
| `mcc-relay@2.3.4` | RefPharma-API-1 | L1 | 58 | 58 | 0.00 | 0.00 | 0.00 | 0.00 |
| `interlock-plc@3.4.0` | RefDepot-EMU-12 | L4 split | 8 | 10 | 0.33 | 1.00 | 0.33 | 0.33 |

The three rows this paper did not compute are read off the published traversals of P5 and P6 and are stated as vertex counts over those papers' own hop tables rather than as new results [9], [10]. `batch-controller@8.1.2` reaches fourteen component objects, six commanded tagged objects and three reactors, and its electrical hop H5 returns nothing, so $\mathcal{B}_2 = \mathcal{B}_3$ at twenty-three vertices [9]. `mcc-relay@2.3.4` reaches fifty-eight component objects and stops, in both graphs [9]. `interlock-plc@3.4.0` reaches four component objects, one cabinet, `P-2402`, `XV-2403` and the road 5 fuelling point in the two-schema graph, and adds `ES-OCL-R05` and `SW-OCL-R05` in the three-schema graph; its candidate set for $\rho$ and $\lambda$ is the three `controls` assertions, of which one resolves without the electrical partition and three resolve with it [10].

Four things read out of that table.

**Row one is the case the programme was built for.** The electrical partition takes a set of twenty-six software objects that resolve to nothing and places every one of them on a named device, then carries eleven of them through to the thermal plant of a 250 MW site. Without it, $\rho = 0$: a protection relay is not a P&ID object, so there is nothing in the DEXPI file for the relay firmware to be `partOf`, and the two-schema graph can say only that the package exists.

**Row two is the same site, the same files, the same level and the same metric.** It gains four labels. The difference between rows one and two is entirely the root.

**Rows three and four are P5's result and this metric reproduces it without adjustment.** Row four is the fifty-eight candidates: $\rho = 0$ with a conformant, correctly declared electrical leg present. This is the shape P5 names when it says the leg supplies discrimination rather than existence, and $\rho$ is that sentence written as a number [9].

**Row five is the smallest contribution in the table and the largest in consequence.** Two vertices out of ten, and those two are an earthing switch and a section disconnector on a live 25 kV contact line section above a fuelling point where a person may be standing. P6 states that an assessment ranking that reach set by service impact would order it exactly backwards [10].

> **F-B7.** $\mathcal{B}_3$ ranks reach and must not be read as ranking consequence. The path product $\pi$ measures how directly a compromise arrives, and it carries no information about what arriving means. P6's Q-1 makes the point in its strongest form: the item with the lowest service impact in its reach set is the one that puts a person and a live conductor in the same place, and the two-vertex contribution of its electrical partition is the whole of that finding [10]. Any consumer that sorts $\mathcal{B}_3$ by $\pi$ and reports the top of the list is sorting by directness. A consequence ordering needs a severity model over the vertices, and none of the three schemas carries one.

### 8.10 A consequence the metric computes and should not be trusted to interpret

One result of section 8.5 is uncomfortable and it is better stated than left for a reader to find.

Under rule CM all twenty-six relays are compromised together. Eleven of them de-energise the thermal plant. Ten of them sit on 33 kV block feeder bays, and de-energising a block stops it charging and discharging, which removes its heat load. So the same common-mode event that destroys the cooling plant also, on paths this paper cannot traverse for want of published topology, removes the heat source the cooling plant exists to serve.

$\mathcal{B}_3$ has no way to express that. It is a set and set membership is monotone: a vertex is reached or it is not, and adding vertices never subtracts consequence. The two-schema formulation could hold that assumption safely, because a blast radius over process plant and the software inside it is a radius of damage. Once the electrical partition is admitted, some of the reached vertices are switches whose operation is protective.

> **F-B6.** A blast radius over three ontologies can contain vertices whose loss removes the hazard rather than causing it. Monotone consequence is a two-schema assumption and the electrical partition breaks it: a compromised breaker that de-energises a heat source is in $\mathcal{B}_3$ on the same footing as a compromised breaker that de-energises the cooling that heat source needs. This paper does not fix it. Fixing it needs a severity model over vertices and a rule for composing a protective loss with a damaging one, and neither exists in P1, P2 or the two-schema bridge [2], [4], [5]. Until one does, a consumer must not report $|\mathcal{B}_3|$ as a magnitude of harm, and should report the set with its partition labels so a reader can see what kind of object each member is.

Whether the adversary would choose the eleven rather than all twenty-six is a question about target selection, which is a threat model rather than a topology, and section 7 states why this paper does not supply one.

## 9. Every parameter this paper uses

Thirty rows. Each is Sourced or Modelled, in the sense section 1.2 fixes: Sourced means the value is stated in, or is arithmetic over values stated in, a document cited here; Modelled means this paper chose it. There is no third category and no row carries both.

| # | Parameter | Symbol | Value | Basis |
|---:|:---|:---|:---|:---|
| 1 | Depth bound | $k$ | 6 | Modelled. Chosen as the length of the longest admissible chain in section 8.4, so the worked example is not truncated by the bound it is measured against |
| 2 | Impact threshold | $\theta_{\text{impact}}$ | 0.50 | Modelled. No incident data exists in this corpus to calibrate a threshold against. Section 8.8 varies it |
| 3 | Coalescence weight | $w_{\mathrm{coalesce}}$ | 1.00 | Modelled. Definitional: the two objects are one asset, so nothing attenuates |
| 4 | Coalescence depth cost | | 0 | Modelled. Section 4.5. Charging depth would make $k$ a function of how many legs a site published |
| 5 | Constitute weight | $w_{\mathrm{constitute}}$ | 0.90 | Modelled. P4's CA-1 read as a weight; the residual stands for a device with a function the software cannot defeat |
| 6 | Actuate weight, protection to switch | $w_{\mathrm{actuate,prot}}$ | 0.95 | Modelled. Asserting a trip is the device's designed function, with no interpretation layer between command and mechanism |
| 7 | Actuate weight, controller to actuator | $w_{\mathrm{actuate,ctl}}$ | 0.85 | Modelled. Lower than row 6 because a control loop can reject or limit a commanded setpoint |
| 8 | Supply weight, electrical | $w_{\mathrm{supply,elec}}$ | 1.00 | Modelled. An open breaker removes supply completely and there is no partial state |
| 9 | Supply weight, fluid join edge | $w_{\mathrm{supply,fluid}}$ | 0.90 | Modelled. A piping segment is not the only thing between a source of flow and the object it feeds |
| 10 | Supply weight, intra-DEXPI fluid hop | $w_{\mathrm{supply,pipe}}$ | 0.95 | Modelled. A hop inside one piping network system, weaker than an electrical switch and stronger than a join-declared supply |
| 11 | Observe weight | $w_{\mathrm{observe}}$ | 0.60 | Modelled. Lowest in the schedule because a falsified reading passes through a decision this graph does not model |
| 12 | Contain weight | | excluded | Modelled. Section 4.2 and F-B3. Containment edges sit in $\mathcal{E}_{\text{rep}}$ and never enter the product |
| 13 | Gate output weight | $w_{\mathrm{gate}}$ | 1.00 | Modelled. The gate is a logical condition on a support set rather than an attenuation |
| 14 | Gate depth cost | | one above the deepest member of the support set | Modelled. Conservative: the function is lost no earlier than the last member that had to be taken |
| 15 | Air cooled condenser requirement | $m$ of $n$ | 2 of 3 | Modelled. [7] publishes the count of three and not the duty split; two of three is assumed by symmetry with the chiller packages |
| 16 | Secondary circulation pumps | $n$ | 4 | Sourced. Four at 50 percent, 460 m3/h at 45 m head [7] |
| 17 | Secondary circulation requirement | $m$ | 2 | Sourced. Arithmetic on two rows of [7], 920 divided by 460, stated the same way by P4 [8] |
| 18 | Whole-site secondary flow | | 920 m3/h | Sourced. Stated as the secondary volumetric flow, whole site [7] |
| 19 | Circulation pump flow at duty | | 460 m3/h | Sourced. Stated as the per-pump flow at duty [7] |
| 20 | Chiller packages | $n$, $m$ | 3, 2 | Sourced. Three at 4.0 MW, two duty one standby [7] |
| 21 | Plate heat exchangers | $n$, $m$ | 3, 2 | Sourced. Three at 4.0 MW, two duty one standby [7] |
| 22 | Air cooled condensers | $n$ | 3 | Sourced. `AC-1302A/B/C` in the tag block [7] |
| 23 | Protection devices on site | | 26 | Sourced. One per bay, from the CPAI instance table [7] |
| 24 | 415 V auxiliary bays | | 11 | Sourced. From the bay derivation [7] |
| 25 | Auxiliary loads, `EnergyConsumer` | | 11 | Sourced. Four pumps, three chillers, three condensers, one dosing pump [7], [8] |
| 26 | Devices sharing `feeder-relay@1.9.2` | | 26 | Sourced. P4 records the twenty-six as running that package [8] |
| 27 | Design heat rejection duty | | 8.0 MW thermal | Sourced. Stated as the design heat rejection duty at rated throughput [7] |
| 28 | Cell temperature band the loop holds | | 15 °C to 35 °C | Sourced. The band a published review gives for high performance and moderate degradation [24] |
| 29 | CPAI completeness level, RefBESS-250MW | | L4 | Sourced. Declared by [7] under P2 C-7 [5] |
| 30 | Candidate relays at RefPharma-API-1 | | 58 | Sourced. Protected outgoing ways across six motor control centres [9] |

**Fifteen of the thirty rows are Sourced and fifteen are Modelled.** Fifteen plus fifteen is thirty and the two counts were taken by machine over the Basis column rather than by eye.

That ratio is worse than it looks and better than it looks, in different ways. It is worse because every one of the fifteen Modelled rows is a coupling parameter, so the entire quantitative apparatus of this paper is on the chosen side of the line: rows 1 to 15 are the metric and rows 16 to 30 are the site. It is better because a row Sourced to [7] may itself be a Modelled row inside [7], which labels nineteen of its thirty-two site parameters Modelled [7]. Sourced here means traceable to a cited document, not measured on built plant, which is the same reading P6 states for its own fifteen of fifty and RefBESS-250MW for its thirteen of thirty-two [7], [10].

## 10. Limitations

Each of the following is something this paper cannot do. They are stated because a reviewer will find them anyway and an implementer who meets one after deployment would reasonably conclude the work was oversold.

**Every coupling weight is a choice and none is calibrated.** Fifteen of the thirty rows in section 9 are Modelled and every one of them is a weight, a threshold or a depth rule. No reliability data, no measured dependency and no incident record informed any of them, because none of the three reference assets carries any [7], [9], [10]. Section 8.8 varies the two most important and shows the result is insensitive to the threshold over a wide band and very sensitive to two modelled assumptions. A reader who wants to reject this paper's numbers should reject rule CM and CB-1 first, and the weights second.

**Weights are assigned by edge type, so the metric cannot distinguish two edges of one type.** A `controls` relation from a protection device to a well-maintained modern breaker and one to a device at the end of its life carry the same 0.95. A per-edge schedule is the right answer and it needs data that would have to be invented here.

**The multiplicative composition assumes independence along a path, and the assumption is false in the case the paper is about.** Four pumps whose drives sit on one field network segment do not fail independently, and the product of coupling weights along four separate paths says nothing about that shared segment because the graph has no vertex for it. The redundancy gate handles common mode at a support set and does not handle common mode along a path. That is a real gap and this paper does not close it.

**There is no calibration data anywhere in this corpus to fit $\theta_{\text{impact}}$ against.** A threshold governing cascade activation ought to be fitted to observed cascades. This corpus carries no incident set with both a topology and an outcome, so the threshold is a dial with a plausible default and section 8.8 is the only honest thing that can be said about it.

**The gate's input has no carrier in the join.** F-B9 states it. The most consequential term in the worked example, that four pumps are one two-out-of-four set, arrives from a reference architecture's prose and its arithmetic, not from any join assertion, because P1's closed vocabulary has no form for redundancy [4]. A metric whose largest term is fed from outside the mechanism it is built on is not yet a property of the mechanism.

**Rule J3, the connectivity expansion, was exercised and not tested.** RefBESS-250MW publishes twenty-seven connectivity nodes and does not publish which loads share one, so the expansion is empty everywhere it runs [7]. The rule is P2's own L2 sentence mechanised and nothing in this paper demonstrates it working [5]. A site with two loads on one board section would test it and none of the three reference assets is one.

**The reduction of section 4.7 is a construction and it rests on a reading of section 4.4 that section 4.4 does not settle.** Section 2.3 sets out both readings of "electrical conduits" and takes the one the position paper's $E_{\text{signal}}$ supports [2], [3]. A reviewer reading section 4.4's edge set as power circuits would be reading a formulation whose vertex set contains nothing for them to run between, and this paper cannot make that reading work. If the author of [2] intended the wider reading, the reduction argument needs restating and the extension does not.

**Non-monotone consequence is named and not fixed.** F-B6. A set whose members may individually be protective cannot be reported as a magnitude of harm, and this paper offers no severity model and no composition rule. It offers only the instruction to report the set with its partition labels.

**Reverse reachability is named and not fixed.** F-B5. P6 observes that the reverse shape is the shape a maintainer's question actually takes, which makes it the more common case and the more dangerous one [10]. Q-B1 is a forward query. The metric answers forward queries and answers reverse ones only by brute force over an enumerated root set.

**The metric was computed on one site and read off two others.** Sections 8.4 to 8.8 compute against RefBESS-250MW. The three rows of section 8.9 belonging to RefPharma-API-1 and RefDepot-EMU-12 are vertex counts over those papers' published hop tables, not independent traversals, and neither paper assigned a weight to anything [9], [10]. This paper does not attribute a weight, a threshold or a depth to either of them retrospectively, and a reader should not read section 8.9 as though P5 or P6 had computed a blast radius.

**The single-artefact reading of twenty-six protection relays is P4's and it is in tension with the reference architecture's own table.** [7] lists two protection artefacts and labels the table representative; P4 reads all twenty-six devices as running one of them [7], [8]. This paper follows P4 rather than contradicting it and states the sensitivity in section 8.8. A revision of [7] publishing the per-device bindings would settle it and would make both papers' results firmer.

**No co-location term exists and none was invented.** P6's F-R3 establishes that no schema names the depot road, so a join cannot assert that two objects are in the same place [10]. The same holds at a battery site: nothing in the three legs says the coolant pipe and the cable tray share a trench. A spatial coupling term would have no source in any of the three schemas and none appears here.

**The sites, the packages and the advisory are synthetic, so nothing here runs against a real installation.** Every vendor namespace is synthetic and unregistrable [19], no package URL resolves, no scanner can be run, and `SYN-RB-2026-0002` is an identifier this paper invented and labelled. No exploit-likelihood score exists for it and section 7 says why none is quoted.

**A traversal correct over the model says nothing about whether the model matches the plant.** P1 states this first among its own limitations and it limits this paper more than any other, because a metric returns a number and a number reads as a measurement [4]. Whether the P&ID at revision C describes what was built, whether `1.9.2` is executing on twenty-six relays, and whether the network export predates a switchgear change are site verification questions, none answerable inside any of the three standards. A blast radius over a stale model is confident, precise and wrong.

**All three legs rest on extension mechanisms not yet confirmed.** P1 assumes the DEXPI Profile can license an added attribute set and records the competing reading, and the CycloneDX `assetjoin` namespace is provisional until registration completes [4]. P2 has no machine-readable form and no CIM validator has been shown to tolerate its foreign properties [5]. A metric computed over files no tool will accept is a metric computed over a proposal.

**Every finding here was reasoned rather than observed.** F-B1 to F-B9 were reached by asking what the formulation permits and what the three applied cases show, not by watching an implementation get any of them wrong. P3 states that until its reference implementation exists every requirement in the programme is a proposal, and the same holds for every finding [6]. There is no consumer to watch.

**The programme ends here and the mechanism is unbuilt.** Seven papers define a join, a profile, a conformance suite, three applied cases and a metric. Nothing in any of them has been run by software. That is the single largest thing standing between this programme and a result anyone can use, and naming it as the last sentence of the last paper is more useful than a conclusion.

## 11. References

1. **Creative Commons.** *Attribution 4.0 International (CC BY 4.0) Legal Code.* Creative Commons Corporation, 2013.
2. **McKenney, J.** *The Unified DEXPI 2.0 and CycloneDX 1.6 Semantic Bridge.* Eigenia working group WG-05-CAD, 2026. Section 4.4 defines the multigraph blast radius over two ontologies and section 4.5 the actuarial consequence function. This paper generalises section 4.4 and does not replace it.
3. **McKenney, J.** *DEXPI as an Open Standard: Position Paper.* Eigenia working group WG-05-CAD, 2026. Section 2.2 formalises the DEXPI plant as the directed multigraph $G_P = (V_P, E_P, \Phi_P)$ reproduced in section 2.1 of this paper.
4. **McKenney, J.** *The Three-Identity Join: DEXPI 2.0, CycloneDX 1.6 and IEC 61970 CIM.* P1 of the three-schema programme, defining requirements R-1 to R-35, Eigenia working group WG-05-CAD, 2026. Source of the five-relation vocabulary, of the R-13 traversal rule this paper mechanises, and of the closed-vocabulary limitation F-B9 rests on.
5. **McKenney, J.** *CIM Profile for Cyber-Physical Asset Identity (CPAI).* P2 of the three-schema programme, defining requirements C-1 to C-10 and completeness levels L0 to L4, Eigenia working group WG-05-CAD, 2026. Source of the admitted class list bounding $\mathcal{V}_{\text{elec}}$, of the eight admitted associations, and of the silence-is-not-absence rule.
6. **McKenney, J.** *Conformance Suite and Reference Implementation.* P3 of the three-schema programme, defining validation rules V-nn, Eigenia working group WG-05-CAD, 2026.
7. **McKenney, J.** *RefBESS-250MW: A Synthetic Reference Architecture for the Three-Schema Join.* Eigenia working group WG-05-CAD, 2026. Source of every site parameter, tag, package URL, master resource identifier, instance count and identity assignment used in section 8.
8. **McKenney, J.** *Energy: RefBESS-250MW.* P4 of the three-schema programme, raising findings F-1 to F-3, Eigenia working group WG-05-CAD, 2026. Source of the F-1 multi-instance encoding, of the CA-1 and CA-2 coupling assumptions this paper reads as weights, of the direction-check discipline, and of the reading that twenty-six protection devices run one package.
9. **McKenney, J.** *Manufacturing: RefPharma-API-1.* P5 of the three-schema programme, raising findings F-4 to F-7, Eigenia working group WG-05-CAD, 2026. The CIM-thin case. Source of the fifty-eight-candidate result, of the discrimination-not-existence generalisation the measures of section 6.4 formalise, and of the deferral of the blast radius generalisation to this paper.
10. **McKenney, J.** *Rail: RefDepot-EMU-12.* P6 of the three-schema programme, raising findings F-R1 to F-R4, Eigenia working group WG-05-CAD, 2026. The split-domain case. Source of F-R4, the component-mediated and directional join, and of the service-impact ranking inversion F-B7 rests on.
11. **DEXPI e.V.** *DEXPI 2.0 Specification.* Released 10 October 2025, published on GitLab under the Creative Commons Attribution 4.0 International licence. Unifies the DEXPI P&ID Specification 1.4 and the DEXPI Process Specification 1.0 and introduces DEXPI XML as the serialization for P&IDs, PFDs and BFDs in place of the Proteus Schema.
12. **OWASP Foundation and Ecma International.** *CycloneDX Bill of Materials Specification.* ECMA-424, 1st edition, June 2024, defining CycloneDX 1.6. Ecma International Technical Committee 54, Geneva.
13. **Ecma International.** *Package URL (purl) Specification.* ECMA-427, 1st edition, December 2025. Ecma International Technical Committee 54, Geneva.
14. **International Electrotechnical Commission.** *IEC 61970-301: Energy management system application program interface (EMS-API), Part 301: Common information model (CIM) base.* International Standard. The model CPAI profiles and the source of the classes admitted to $\mathcal{V}_{\text{elec}}$.
15. **International Organization for Standardization.** *ISO 15926-4: Industrial automation systems and integration, Integration of life-cycle data for process plants including oil and gas production facilities, Part 4: Initial reference data.* International Standard. Cited for the reference data library that supplies the class travelling with a `TagName`.
16. **International Electrotechnical Commission.** *IEC 61970-600-1:2021: Energy management system application program interface (EMS-API), Part 600-1: Common Grid Model Exchange Standard (CGMES), Structure and rules.* International Standard, edition 1.0, published 4 June 2021, cancelling and replacing IEC TS 61970-600-1:2017.
17. **International Electrotechnical Commission.** *IEC 61970-600-2:2021: Energy management system application program interface (EMS-API), Part 600-2: Common Grid Model Exchange Standard (CGMES), Exchange profiles specification.* International Standard, edition 1.0, published 4 June 2021, cancelling and replacing IEC TS 61970-600-2:2017.
18. **Davis, K., Peabody, B., and Leach, P.** *Universally Unique IDentifiers (UUIDs).* RFC 9562, Internet Engineering Task Force, May 2024. Fixes the form of the asset references and master resource identifiers quoted here.
19. **Eastlake, D. and Panitz, A.** *Reserved Top Level DNS Names.* RFC 2606, BCP 32, Internet Engineering Task Force, June 1999. Reserves `example.org` for documentation use, which is why no package URL in section 8 resolves.
20. **McKenney, J.** *TACAM Deep Dive: 7D Threat Actor Capability and Motivation Matrix.* Eigenia working group WG-07-TM, 2026. Correlates vulnerabilities to actors and records how many of an actor's attributed vulnerabilities sit in the CISA Known Exploited Vulnerabilities catalogue. Cited as one of the two exploit-likelihood signals this paper reuses rather than restates.
21. **McKenney, J.** *Adversary Threat Quotient (ATQ): A Twelve-Factor Quantitative Threat Actor Scoring Model.* Eigenia working group WG-07-TM, 2026. Makes the Exploit Prediction Scoring System two of its twelve scored dimensions, a base average and a thirty-day velocity term. Cited as the second exploit-likelihood signal.
22. **Forum of Incident Response and Security Teams.** *Exploit Prediction Scoring System (EPSS).* FIRST. The daily feed that supplies the base and velocity terms of [21]. Cited for the signal only; no score is quoted in this paper and none exists for the synthetic advisory of section 8.
23. **Cybersecurity and Infrastructure Security Agency.** *Known Exploited Vulnerabilities Catalog.* CISA, United States Department of Homeland Security. The catalogue whose membership [20] records. Cited for the signal only.
24. **Ma, S., Jiang, M., Tao, P., Song, C., Wu, J., Wang, J., Deng, T., and Shang, W.** *Temperature effect and thermal impact in lithium-ion batteries: A review.* Progress in Natural Science: Materials International, vol. 28, no. 6, pp. 653 to 666, December 2018. Source of the 15 °C to 35 °C band the thermal plant of [7] holds.
25. **Cheikes, B. A., Waltermire, D., and Scarfone, K.** *Common Platform Enumeration: Naming Specification Version 2.3.* NISTIR 7695, National Institute of Standards and Technology, August 2011. Cited for the identity a CycloneDX component carries where no package coordinate applies.
