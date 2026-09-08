| Field | Value |
|:---|:---|
| Designation | P4, first applied paper of the three-schema programme |
| Status | Draft for submission |
| Normative language | None. P1 owns R-nn, P2 owns C-nn, P3 owns V-nn. This document raises findings F-1 to F-3 |
| Licence | Creative Commons Attribution 4.0 International (CC BY 4.0) [1] |
| Computes against | RefBESS-250MW [2], cited and not restated |
| Rule on every number | Sourced to [2], derived by arithmetic from rows of [2], or labelled modelled with the assumption stated inline |

## 1. Scope

The three-schema programme claims that DEXPI 2.0 [3], CycloneDX 1.6 [4] and the IEC 61970 Common Information Model [5] describe one physical asset, that none alone answers what physically happens when a disclosed vulnerability is exploited, and that a four-field identity binding makes the question computable. P1 defines the binding [6], P2 the CIM subset it attaches to [7], P3 what conformance would be tested against [8]. RefBESS-250MW specifies an asset all three can name [2].

This paper runs the join. It takes one named package on one named site, traverses the declared bindings by hand, and reports what the traversal returns, what it refuses to return, and which leg each part of the answer came from. A reader who disagrees can point at the hop where it went wrong, which is what separates a result from an assertion.

The target asset is RefBESS-250MW, the 250 MW, 500 MWh lithium iron phosphate site specified in [2]. Its parameters, tag block, bills of materials, CPAI instance counts and identity assignments belong to that document and are not reproduced here, because repeating a parameter table creates a second place for a number to drift. Where this paper needs a value it cites the row of [2] carrying it; where [2] carries none, it says so and either does without or labels the substitute modelled.

### 1.1 What this paper does not do

**It does not generalise the blast radius formulation.** The two-schema bridge defines a directed multigraph over plant and cyber nodes, with a shortest-path distance bounded by depth, a product of coupling weights along the path, and an impact threshold [9]. Generalising that to three ontologies is P7's subject. This paper traverses by hand, states every hop, and assigns no numeric coupling weight at all. Introducing a competing formalism here would leave the programme with two.

**It does not validate anything against a real installation.** RefBESS-250MW is synthetic and says so on every row [2]. No vendor, package URL or master resource identifier here resolves. Section 7 treats the consequences.

**It does not define new normative content.** P1's five relations and P2's requirements and completeness levels are used as published. Where the traversal met something those rules do not settle, it is recorded as a finding against the paper owning the rule, not patched here.

### 1.2 A naming rule for this paper

RefBESS-250MW publishes one exemplar instance name and `mRID` per CPAI class, the remaining instances by count and arrangement, and one asset reference, on pump `P-1101A` [2]. Below that it names nothing. So this paper names an object by its published identifier where one exists and by its role where none does, and mints no identifier of any kind in the form RFC 9562 defines [14]. A traversal quietly inventing an `mRID` for the eleventh auxiliary bay would be traversing its own invention, and a reader could not tell.

## 2. The DEXPI model of the coolant loop

The process leg is what makes a battery site describable by a P&ID at all. A 250 MW site rejects heat continuously and its cells tolerate 15 °C to 35 °C [2], so thermal management is a plant with an inventory, rotating equipment, heat transfer surface, valves and instruments. RefBESS-250MW specifies it as a primary chilled water loop, a secondary glycol and water loop, plate heat exchangers separating the two, and one hundred tagged objects [2]. Two properties of that model decide what section 6 can do with it, and a third holds them up: P1 R-17's rule that the binding attaches to the tagged object and never to a symbol on `PID-RB-COOL-101` [6] is what stops a revision D breaking every result below.

**The tag is the identity and the tag is not the join.** `P-1101A` is unique on this site and means nothing on another, which is why P1 R-18 requires the ISO 15926-4 class to travel with it [6], [10]. RefBESS-250MW describes those classes in words and records that as a defect against itself [2]. Q-1 below depends on the asset reference and never on a resolved class identifier, so it survives the defect. A query matching `P-1101A` against a pump of the same function on another site would not.

**The relation vocabulary separates the instruments from the actuators.** The block distribution carries twenty temperature transmitters, ten flow transmitters and ten conductivity analysers against ten three-way control valves [2]. The transmitters carry `monitors`, the valves carry `controls`, and P1 R-13 forbids traversing one as the other [6]. Section 6 does not reach the block distribution, so it does not exercise that rule.

### 2.1 The redundancy set

One arrangement in [2] carries the whole weight of section 6, so it is stated here rather than left for the reader to assemble.

RefBESS-250MW specifies four secondary circulation pumps at 50 percent, each 460 m3/h at 45 m head, against a whole-site secondary flow of 920 m3/h [2]. Dividing the site flow by the pump flow gives two duty pumps and two standby, which is arithmetic on two published rows and not a new number. The pumps are tagged `P-1101A`, `P-1101B`, `P-1102A` and `P-1102B` [2].

A 2-out-of-4 arrangement is the ordinary way a plant buys availability against a single mechanical failure, and its value rests entirely on the four failures being independent. That premise is mechanical, and the DEXPI file cannot test it, because the DEXPI file does not know what is inside the drives.

## 3. The CycloneDX bills of materials for the control stack

RefBESS-250MW carries six CycloneDX 1.6 documents, one per deliverable unit, with no merged site bill of materials [2], for P1's reason for having no central join registry: a merge reintroduces a single authority and hides which build system vouched for which claim [6]. This paper reads the thermal plant automation document `BOM-RB-THM`, which carries three representative component identities: `pkg:generic/example-automation/plc-runtime@5.4.0`, `pkg:generic/example-automation/vsd-firmware@7.2.1` and `pkg:generic/example-hvac/chiller-ctrl@3.0.6` [2]. All three namespaces are synthetic and unregistrable under RFC 2606 [11], so none resolves and none can be scanned.

This is the volatile leg. A firmware upgrade mints a new package URL, correctly, because it is a different artefact [6], [12], and RefBESS-250MW is specified with versions rather than ranges for that reason [2]. The query in section 6 is stated against `7.2.1` and says nothing about `7.2.2`.

Firmware is also a constituent and not the asset. Every component in [2] carries `partOf` toward the object it runs inside, with two stated exceptions: the site controller carries `controls` toward the ten block asset references, and the thermal plant controller carries `controls` toward the ten control valves and `monitors` toward the block instruments [2]. Those assignments decide whether a compromise reaches the blocks in the graph, and they were made once, in the specification, rather than inferred at query time.

### 3.1 One artefact on four devices, and how it must be encoded

RefBESS-250MW's component table is labelled representative, so it publishes one entry per identity and not one per device [2]. The query needs to know how many components in `BOM-RB-THM` carry `vsd-firmware@7.2.1`, and P1 does not settle it.

R-21 requires the assertion to sit in the `properties` array of the component it applies to, and R-3 requires it to state exactly one asset reference, one relation, one authority and one basis [6]. A CycloneDX `properties` array is a flat list of name and value pairs that permits repeated names [4], so a single component object carrying four `assetjoin:ref` values and four `assetjoin:relation` values gives a consumer no rule for pairing them, and R-3 supplies none.

The only encoding satisfying both is one component object per physical device, each with its own document-local `bom-ref`, all four sharing the same `purl`. That is legal CycloneDX, because `bom-ref` is document-local and unique while `purl` need not be unique within a document [4].

> **F-1.** Under P1 R-3 and R-21 together, a package installed on N devices must appear as N component objects. The component count of a conformant bill of materials is therefore a device count, not an artefact count. A scanner reporting "four affected components" is reporting four devices, and one that deduplicates by `purl` before counting destroys the fact the join was built to expose. P1 section 6 should state the multi-instance encoding rather than leave it to be derived.

This paper adopts that encoding. RefBESS-250MW does not publish the four entries, so section 6 runs on the one binding it does publish and reports the other three as P1 R-12 requires, unjoined rather than absent.

## 4. The CPAI instance for the electrical connection

The electrical leg is a CPAI document, the cyber-physical profile of IEC 61970-301 that P2 defines [7], [5]. CPAI admits shape and refuses quantity, so this leg carries no impedance, rating, tap position or solved voltage [2], [7]. It reaches completeness level L4, the highest P2 defines, and declares it rather than leaving a consumer to infer it, as P2 C-7 requires [2], [7]. L4 is the level at which a cyber event traces to a physical action, because the profile can say what removes supply from an asset and whether that device appears in a bill of materials [7].

The eleven `EnergyConsumer` instances are the ones this paper needs, and their composition is arithmetic on the tag block of [2]: four circulation pumps, three chiller packages, three air cooled condensers and one glycol dosing pump. Four plus three plus three plus one is eleven, matching the published `EnergyConsumer` count and the published count of 415 V auxiliary bays. A query traversing to a load class whose population does not reconcile with the tag block is traversing two different sites, so the check is worth running.

### 4.1 What the electrical leg contributes, and in which direction

The published L4 chain from the pump's load object runs load, terminal, connectivity node, breaker, protection device, bay, voltage level, station [2]. Every hop uses an association P2 section 4.3 admits and the document declares, which is what P2 C-8 requires and what stops a consumer inferring containment from naming conventions [7].

The chain runs toward the pump, not away from it. `CB-415-A01` carries `supplies` toward the pump's asset reference and `PROT-415-A01` carries `controls` toward the breaker it operates [2]. So the chain answers what can de-energise this pump and whether that device runs software, which here it does: `PROT-415-A01` is a CPAI `ProtectionEquipment` instance and `pkg:generic/example-protection/feeder-relay@1.9.2` is a component of `BOM-RB-PRO`, and they are one device [2]. Section 6.6 needs that closure, and section 6.3 shows what P1 R-13 forbids doing with it.

## 5. The join applied to one physical object

Pump `P-1101A` is the object. RefBESS-250MW publishes its three legs in full: the DEXPI generic attribute set on the equipment object carrying the tag, the CycloneDX properties on the drive firmware component, and the CPAI properties on the `EnergyConsumer` representing the motor as a load [2]. Those encodings are not reproduced here. What matters for the query is what they agree on and what they do not.

| Leg | Local identity, in its own system | Relation | Asserting authority | As-built basis |
|:---|:---|:---|:---|:---|
| DEXPI 2.0 | `TagName` `P-1101A` | `identity` | plant model authority | `PID-RB-COOL-101 rev C 2026-08-14` |
| CycloneDX 1.6 | `purl` `pkg:generic/example-automation/vsd-firmware@7.2.1` | `partOf` | build authority | `BUILD-RB-2026-0831 2026-08-31` |
| CPAI | `mRID` `0dae4314-dc30-454e-8dd1-5849dee9dcc1` | `identity` | network model authority | `NM-RB-EXPORT-2026-Q3 2026-08-20` |

All three carry the asset reference `09a66af0-8c96-4ed1-b2f2-fb9f0e5c8524` [2]. No file holds a foreign identifier, which is P1 R-9 and the reason this is a mapping rather than a merge [6]. Two legs assert `identity` and one asserts `partOf`, which is correct rather than a conflict: the tag denotes the pump, the load object denotes the pump as the network sees it, and the firmware is a constituent. P1 R-5 forbids two `identity` assertions for one asset reference within a single file, not across files, and P1 R-14 governs two files claiming `identity` for objects that are not the same asset [6]. Here they are the same asset, so R-14 is not triggered.

### 5.1 The basis set spans seventeen days, and it bites one leg harder than the others

The three as-built bases carry three different dates, deliberately, because P1 R-8 treats a divergent basis set as legitimate and conformant rather than an error to be tidied away [6], [2]. The span is 14 August to 31 August 2026, seventeen days.

An applied paper inherits that set and has to say what it did about it. The divergence is not symmetric. The DEXPI leg is the oldest and the least exposed, because a tag survives a component change: if the drive on `P-1101A` was replaced on 20 August, its `identity` assertion is still true on 31 August. The CPAI leg is similarly insensitive, since an `mRID` on an `EnergyConsumer` is stable within one model authority set across exports of the same model [7] and replacing a drive does not move the load in the network.

The CycloneDX leg is the exposed one, in the direction that matters, because its identity changes on every upgrade [6]. A build basis of 31 August states what the build system produced that day; it does not establish that `7.2.1` is executing on the drive now, which P1 records as a limitation of `purl` in general [6]. So the query in section 6 is stated as of a basis set rather than as of a date, and its component-leg finding is the perishable one. That is weaker than "the site runs 7.2.1" and it is the claim the evidence supports.

## 6. One worked query neither standard answers alone

### 6.1 The question

> **Q-1.** Advisory `SYN-RB-2026-0001` is disclosed against `pkg:generic/example-automation/vsd-firmware@7.2.1`, permitting an unauthenticated command to stop or mis-speed the drive. Under the bindings RefBESS-250MW publishes, which objects does it reach, in which leg, by which declared hop, and what does that do to the coolant loop?

`SYN-RB-2026-0001` is a synthetic advisory identifier. It is not a CVE, it is registered with no numbering authority, and no such advisory exists; the `SYN-` prefix is there so it cannot be mistaken for one. A real CVE could not be used, because the target package URL is itself synthetic and unregistrable [2], [11], and attaching a real advisory to a package that does not exist would be a fabrication.

### 6.2 What each leg is asked for

CycloneDX 1.6 is asked which components carry this `purl` and what asset references their assertions name. DEXPI 2.0 is asked what tagged object those references denote and what it does. CPAI is asked where the resulting load sits electrically, what removes its supply, and whether that device carries software.

No leg is asked a question another leg could answer, which is the test of whether the join is doing work or decorating a result one schema already had.

### 6.3 The traversal, hop by hop

Hops are numbered. Each states the leg, the mechanism, and whether it is a join hop under P1, a model traversal under P2, or a hop the join delegates to a schema's own topology.

**H1. Component leg, join hop.** Query `BOM-RB-THM` for components whose `purl` equals `pkg:generic/example-automation/vsd-firmware@7.2.1`, and read the `assetjoin:ref` and `assetjoin:relation` of each. One binding is published: relation `partOf`, asset reference `09a66af0-8c96-4ed1-b2f2-fb9f0e5c8524`, authority `https://example.org/authority/refbess-build`, basis `BUILD-RB-2026-0831 2026-08-31` [2].

**H1a. What H1 does not return.** RefBESS-250MW's component table is representative, so the asset references of the other three drives are not published [2]. P1 R-12 requires a consumer to treat an asset reference appearing in only one file as unjoined and forbids synthesising the missing legs [6], and nothing permits minting three that were never printed. H1 returns one bound device and three reported as same artefact, binding not published in the source document. That is a result and not a gap; section 6.6.1 shows why the distinction must be carried rather than collapsed.

**H2. Process leg, join hop.** Resolve that asset reference in the DEXPI file. It carries relation `identity` on the equipment object whose `TagName` is `P-1101A` [2]. Physical object reached: `P-1101A`, centrifugal pump, secondary circulation, 460 m3/h at 45 m head, 90 kW motor [2].

**H3. Electrical leg, join hop.** Resolve the same asset reference in the CPAI document. It carries relation `identity` on the `EnergyConsumer` `EC-AUX-P1101A`, `mRID` `0dae4314-dc30-454e-8dd1-5849dee9dcc1`, model authority set `https://example.org/mas/refbess-network` [2]. Electrical object reached: one load.

**H4 to H8. Electrical leg, CPAI model traversal.** From `EC-AUX-P1101A`, using only associations P2 admits and the document declares, as C-8 requires [7]:

| Hop | Object | `mRID` | Association used |
|:---|:---|:---|:---|
| H4 | `T-EC-P1101A`, `Terminal` | `742a9710-5cde-4442-b2d6-2a81b1f671e2` | `Terminal` to `ConductingEquipment` |
| H5 | `CN-415-A01`, `ConnectivityNode` | `db595f8f-3517-43af-b032-acd877dba3f4` | `Terminal` to `ConnectivityNode` |
| H6 | `CB-415-A01`, `Breaker` | `72c08317-0300-49f2-ba83-df1869f3d755` | `Terminal` to `ConnectivityNode`, read back |
| H7 | `PROT-415-A01`, `ProtectionEquipment` | `ee3010f0-5183-40ad-9c48-32dffd7e63a5` | `ProtectionEquipment` to `ProtectedSwitch` |
| H8 | `BAY-415-A01`, then `VL-415`, then `SUB-RB01` | `d93a2e1d-9f54-492e-898d-37f57e0022d4`, `6282fe57-0ff7-40e2-b024-3bdbd277ee31`, `e4cc3030-e621-419f-ae42-35023375eb75` | `Equipment` to `EquipmentContainer`, then `Bay` to `VoltageLevel`, then `VoltageLevel` to `Substation` |

**H8a. Direction check.** H4 to H8 were traversed and none of them is affected by Q-1. Both `supplies` and `controls` on this chain point at the pump [2], and P1 R-13 forbids inverting a directed relation [6], so a compromise of the drive firmware does not propagate up it. These eight objects are the electrical context of the affected asset, where it sits and what de-energises it. Reporting them as damaged would be the most likely error in an automated version of this traversal.

**H9. Process leg, delegated hop.** From `P-1101A` forward into the coolant loop. The join does not carry this hop. P1 defines no physics model and assigns hydraulic and thermal propagation to the two-schema work and its generalisation [6], [9]. The forward path from a pump to the blocks it serves is the DEXPI file's own piping network system, and RefBESS-250MW places `supplies` on the piping segment feeding a block rather than on the pump [2], so the pump has no outbound join relation at all.

The delegation is correct and not free. Q-1 crosses a boundary at H9 where the evidence changes from a declared join assertion to a schema-internal topology, and a reader auditing the result has to open the DEXPI file to check the second half. This paper marks the boundary rather than smoothing it.

**H10. Common-mode expansion, back at the component leg.** The artefact reached at H1 is one firmware version, and under CA-2 the pumps reached through it are all four members of the 2-out-of-4 set of section 2.1. This is the hop that makes Q-1 worth asking.

### 6.4 The answer

**Affected set, published bindings only.** One physical object, `P-1101A`, and one electrical object, `EC-AUX-P1101A`, the same asset seen from the network side.

**Affected set, under CA-2.** Four physical objects, `P-1101A`, `P-1101B`, `P-1102A` and `P-1102B`, being the whole secondary circulation duty, and their four `EnergyConsumer` instances among the eleven auxiliary loads, of which RefBESS-250MW publishes one by name.

**Electrical context set, reached and not affected.** Eight CPAI objects, listed at H4 to H8.

**Process consequence, across the delegated hop H9.** RefBESS-250MW specifies the secondary loop as the only path from the ten blocks to the plate heat exchangers, with the whole-site flow of 920 m3/h delivered by these four pumps against a design duty of 8.0 MW thermal [2]. Losing all four removes the heat rejection path, and the cells leave the 15 °C to 35 °C band [2], [13].

**No time is stated.** How long the cells stay inside the band after flow stops depends on the coolant inventory, the enclosure thermal mass and the instantaneous throughput, and RefBESS-250MW publishes none of the three [2]. The join produces an ordering of events, not a time to exceed. A time stated here would be a number the reference architecture does not carry.

**No consequence value is stated.** The two-schema work formulates an actuarial loss function over hardware replacement, data reconstruction and business interruption [9]. Every term needs a cost RefBESS-250MW omits, since it carries no commercial model [2]. A loss figure computed here would be invented.

**The redundancy finding.** The 2-out-of-4 arrangement of section 2.1 buys availability against a single mechanical failure and does not survive `SYN-RB-2026-0001` under CA-2. That is what Q-1 was asked for: a statement about a redundancy claim rather than about a package. Section 6.7 shows which schemas can produce it.

### 6.5 What the answer depends on

Each assumption is labelled and each is contestable at the point it is stated. None carries a numeric weight, for the reason section 1.1 gives.

**CA-1, modelled. A firmware compromise is a loss of the device the firmware is `partOf`.** The advisory permits stopping or mis-speeding the drive, and a pump that will not run at commanded speed is not delivering its 460 m3/h. It is the least contestable assumption here and it is still an assumption: a drive with an independent hardwired trip, or a pump on a mechanical bypass, would not fail this way. RefBESS-250MW specifies neither, so this paper assumes neither exists.

**CA-2, modelled, and the assumption the whole finding rests on. One firmware version on four identical drives fails identically under one exploit.** RefBESS-250MW publishes `vsd-firmware@7.2.1` once, in a table labelled representative, bound to `P-1101A` [2]. That the other three pumps carry variable speed drives at all, and that they carry this version, is inferred from four identical pumps of identical duty and is not published. The inference is contestable three ways, and a reader holding any of them should reject the finding: the drives may be different hardware revisions; two may sit on a separate network segment reachable only by a different path; and a site staggering firmware across a redundancy set defeats the assumption by design. That last one is the useful output of the query, because staggering is a control an operator can apply and would not think to apply without seeing this result.

**CA-3, sourced to [2]. The secondary loop is the only heat rejection path from the blocks.** RefBESS-250MW specifies two loops separated by plate heat exchangers, with the blocks fed from the secondary [2], and gives them no alternative.

**CA-4, a refusal rather than an assumption. No timing and no cost.** Repeated from section 6.4 because a reader skimming for a headline number should find the refusal instead.

**Basis set.** The component-leg finding is as of 31 August 2026 and the process leg as of 14 August 2026. Section 5.1 sets out which leg the seventeen-day span exposes.

**Encoding, per F-1.** Had the producer emitted one component with four repeated property pairs, H1 would return an ambiguous set and the traversal would stop rather than return a wrong answer, which is the correct failure.

### 6.6 The same query against the two-leg object, `P-1403`

RefBESS-250MW carries `P-1403`, the glycol dosing pump, as a deliberate counter-example: a positive displacement pump started direct on line with no firmware, so it has a DEXPI leg and a CPAI leg and no CycloneDX leg [2]. It exists so an implementation cannot pass without exercising P1 R-12 and P2 C-9 [6], [7].

> **Q-2.** Which packages must be patched to protect the glycol dosing function `P-1403`?

**H1', component leg.** Query the six bills of materials for a component asserting `partOf` toward the asset reference of `P-1403`. The result is the empty set.

**H2', the reporting rule.** P2 section 7 states that silence is not absence and that a consumer must not read a missing class as a negative fact [7]. P1 R-12 requires an asset reference appearing in only one file to be treated as unjoined rather than as having no other legs [6]. The correct report at H1' is *no component leg is asserted for this asset*; the incorrect report is *this asset has no software exposure*.

**H3', electrical leg.** `P-1403` is one of the eleven auxiliary loads of section 4. Its `EnergyConsumer` sits in a 415 V auxiliary bay with a `Breaker` and a `ProtectionEquipment` on the arrangement RefBESS-250MW publishes, though only the exemplar instance of each class is named [2]. That protection device is one of twenty-six, and the twenty-six run `pkg:generic/example-protection/feeder-relay@1.9.2` from `BOM-RB-PRO` [2].

**The answer to Q-2 is not the empty set.** It is `pkg:generic/example-protection/feeder-relay@1.9.2`, reached in three hops through the electrical leg, on an object carrying no firmware of its own. A compromise of the feeder relay trips the breaker, the breaker removes supply from the dosing pump, and glycol makeup to the secondary loop stops. A traversal taking the empty `partOf` set at H1' as the answer would have reported a device with real software exposure as not affected, which is the R-12 failure the counter-example exists to catch.

That is how the two-leg join degrades honestly rather than into silence. `P-1403` is missing the leg that usually carries the software, and the software that can act on it is still findable, because the leg it does carry says what de-energises it. A join failing on a missing leg would return nothing; a join synthesising it would return an invented package. The published rules return the true answer reached by a different route.

### 6.6.1 A gap the counter-example exposed

At H1a the query met three devices whose bindings are not published. At H1' it met one device asserted to have no component leg at all. Both return an empty set on `partOf`, and they are different facts. P2's silence-is-not-absence rule makes the difference load-bearing, because a consumer must treat the first as unknown and could treat the second as known-empty if it could tell them apart. It cannot. RefBESS-250MW carries the distinction in prose [2], and there is no way to say it in a join assertion, because P1's four fields state a binding that exists and the vocabulary has no negative form.

> **F-2.** P1 provides no way to assert that an asset has no leg in a given schema, so a consumer cannot distinguish an unpublished binding from an asserted absence, while P2 section 7 requires it to treat the two differently. The fix is not obviously a fifth field, since a negative assertion needs its own authority and basis to be worth anything. P1 section 9 should record the gap alongside the closed relation vocabulary.

### 6.7 What no single schema, and no pair, returns

The claim is that the three-way join does work none of the parts can do, and the honest test is to run Q-1 with legs removed.

| Available | What Q-1 returns | What it misses |
|:---|:---|:---|
| CycloneDX 1.6 alone | `vsd-firmware@7.2.1` is a firmware component of `BOM-RB-THM` | which devices run it, what they do, that there are four, that they are a redundancy set |
| DEXPI 2.0 alone | four 50 percent circulation pumps, two duty two standby, 920 m3/h against an 8.0 MW duty | that the four share one software artefact, so the arrangement has a common mode |
| CPAI alone | eleven auxiliary loads, each with a bay, a breaker and a protection device, at 415 V in `SUB-RB01` | which loads carry software, and which software |
| DEXPI plus CycloneDX | the common-mode finding, which is most of the answer | what de-energises the pumps, and anything at all about `P-1403` |
| CycloneDX plus CPAI | the relay reach of section 6.6, and that four loads run one firmware | that the four are a redundancy set serving one duty, and what that duty is |
| DEXPI plus CPAI | the plant, the switchgear and the protection scheme | every software fact in the query |
| All three | the affected set, the electrical context, the delegated process consequence, the common-mode defeat of the 2-out-of-4 arrangement, and a non-empty answer for the two-leg object | timing, cost, and whether the model matches the plant |

The row worth arguing with is DEXPI plus CycloneDX, which returns the headline finding without CPAI. That is the two-schema bridge [9], and it is a fair reading that Q-1 as posed does not need the third leg. Q-2 is where it does: `P-1403` has no CycloneDX leg, so the two-schema bridge returns nothing about it and the answer arrives entirely through CPAI. A programme that only ever asked Q-1 would not have needed P2. Asking Q-2 of the same site is what shows the third leg earning its place, and it is why RefBESS-250MW specified a two-leg object on purpose.

### 6.8 Whether the two CPAI gaps touched the query

RefBESS-250MW records two places where CPAI does not fit a battery site [2], [7]. Both were checked against this traversal rather than assumed harmless.

**The converter gap did not touch Q-1.** CPAI admits no class for a grid-forming converter, so the site's fifty power conversion units land in generic `ConductingEquipment` and lose the fact that they are converters [2], [7]. Q-1 runs in the 415 V thermal auxiliary system and no converter sits on any hop of it. The gap would bite immediately on a query starting from `pkg:generic/example-power/pcs-control@11.2.4`, where the traversal would land on fifty objects indistinguishable in class from any other current-carrying object and report the reach set at a class that does not say what the objects are. That query is not run here, and saying why is more useful than running it badly.

**The `Feeder` deferral touched the reporting and not the traversal.** P2 refused to admit a class it could not name against the published UML, so the ten block circuits are carried as `Bay` inside `VL-33` [2], [7]. Q-1's consequence at H9 lands on the blocks. Reported by electrical circuit rather than by process function, CPAI returns cubicles where an operator asked for feeders. The traversal completes either way and the answer comes back in the wrong vocabulary, which matters because a consequence report an operator has to translate is one an operator distrusts.

> **F-3.** Neither published CPAI gap blocks Q-1. The converter gap is untested here and would be exercised by a query originating in `BOM-RB-PCS`. The `Feeder` deferral degrades the vocabulary of the consequence report, not its correctness. P2's next revision should admit the converter classes on the strength of the first and may rank the second lower on the strength of the second.

## 7. Limitations

**The query was run by hand because no validator exists.** P3 defines the test vectors, round-trip cases and reference implementation, and states that until it is implemented every requirement in the programme is a proposal [8]. Nothing checked this traversal except its author reading the three legs of [2] against the rules of [6] and [7]. Every hop is written out so a reader can repeat it, which substitutes for a validator and is not one.

**The site is synthetic, so nothing here is validated against a real installation.** RefBESS-250MW states that no parameter came from a specific installation, no vendor exists, and every package URL and master resource identifier is synthetic [2], and the advisory in section 6.1 is synthetic and labelled. This paper shows the join's declared rules producing a specific answer on a specific model. It does not show that any real battery site is arranged this way.

**The coupling assumptions are the working group's.** CA-1 and CA-2 are choices, stated inline so a reader can reject either and see which part of the answer falls with it. CA-2 converts a package-level fact into a plant-level finding and should be attacked first. This paper assigns no numeric coupling weight and no threshold; the general formulation over three ontologies is a later paper's subject and is not pre-empted here [9].

**A traversal correct over the model says nothing about whether the model matches the plant.** P1 states this first among its own limitations and it is the one that most limits this paper [6]. Whether the drawing describes what was built, whether `7.2.1` is executing on the drive, and whether the network export predates a switchgear change are site verification questions, none answerable inside any of the three standards. A join over a stale P&ID produces confident, precise, wrong answers just as fluently as this traversal produced its own.

**The delegated hop is the weakest link.** Every hop before H9 is a declared assertion a reader can check in a table. H9 is an architecture-level claim from [2] rather than a computed one, and it carries the whole distance between four affected pumps and cells leaving the band.

**Three of the four devices in the common-mode set are unbound in the source document, and F-2 was reasoned rather than observed.** CA-2 does the work three published bindings would otherwise do; a revision of [2] publishing them would let Q-1 run entirely on declared assertions and make F-1 concrete rather than derived. F-2 was reached by asking what a consumer can distinguish, not by watching one get it wrong, and until P3's reference implementation exists there is no consumer to watch.

**All three legs rest on extension mechanisms not yet confirmed.** P1 assumes the DEXPI Profile can license an added attribute set and records the competing reading, and the CycloneDX `assetjoin` namespace is provisional until registration completes [6]. P2 has no machine-readable form and no CIM validator has been shown to tolerate its foreign properties [7]. A query run against files no tool will accept is a query run against a proposal.

## 8. References

1. **Creative Commons.** *Attribution 4.0 International (CC BY 4.0) Legal Code.* Creative Commons Corporation, 2013.
2. **McKenney, J.** *RefBESS-250MW: A Synthetic Reference Architecture for the Three-Schema Join.* Eigenia working group WG-05-CAD, 2026. Source of every site parameter, tag, package URL, master resource identifier and identity assignment used here.
3. **DEXPI e.V.** *DEXPI 2.0 Specification.* Released 10 October 2025, published on GitLab under the Creative Commons Attribution 4.0 International licence.
4. **OWASP Foundation and Ecma International.** *CycloneDX Bill of Materials Specification.* ECMA-424, 1st edition, June 2024, defining CycloneDX 1.6. Ecma International Technical Committee 54, Geneva.
5. **International Electrotechnical Commission.** *IEC 61970-301: Energy management system application program interface (EMS-API), Part 301: Common information model (CIM) base.* International Standard.
6. **McKenney, J.** *The Three-Identity Join: DEXPI 2.0, CycloneDX 1.6 and IEC 61970 CIM.* P1 of the three-schema programme, defining requirements R-1 to R-35, Eigenia working group WG-05-CAD, 2026.
7. **McKenney, J.** *CIM Profile for Cyber-Physical Asset Identity (CPAI).* P2 of the three-schema programme, defining requirements C-1 to C-10 and completeness levels L0 to L4, Eigenia working group WG-05-CAD, 2026.
8. **McKenney, J.** *Conformance Suite and Reference Implementation.* P3 of the three-schema programme, Eigenia working group WG-05-CAD, 2026.
9. **McKenney, J.** *The Unified DEXPI 2.0 and CycloneDX 1.6 Semantic Bridge.* Eigenia working group WG-05-CAD, 2026. Defines the multigraph blast radius and the actuarial consequence function over two schemas.
10. **International Organization for Standardization.** *ISO 15926-4: Integration of life-cycle data for process plants including oil and gas production facilities, Part 4: Initial reference data.* International Standard.
11. **Eastlake, D. and Panitz, A.** *Reserved Top Level DNS Names.* RFC 2606, BCP 32, Internet Engineering Task Force, June 1999. Reserves `example.org` for documentation use.
12. **Ecma International.** *Package URL (purl) Specification.* ECMA-427, 1st edition, December 2025. Ecma International Technical Committee 54, Geneva.
13. **Ma, S., Jiang, M., Tao, P., Song, C., Wu, J., Wang, J., Deng, T., and Shang, W.** *Temperature effect and thermal impact in lithium-ion batteries: A review.* Progress in Natural Science: Materials International, vol. 28, no. 6, pp. 653 to 666, December 2018. Source of the 15 °C to 35 °C band.
14. **Davis, K., Peabody, B., and Leach, P.** *Universally Unique IDentifiers (UUIDs).* RFC 9562, Internet Engineering Task Force, May 2024. Fixes the form of the asset reference and the `mRID` values quoted here.
