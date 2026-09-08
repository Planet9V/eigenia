| Field | Value |
|:---|:---|
| Designation | P6, rail applied paper of the three-schema programme |
| Status | Draft for submission |
| Normative language | None. P1 owns R-nn, P2 owns C-nn, P3 owns V-nn. This document raises findings F-R1 to F-R4, prefixed R for rail because P4 owns the unprefixed F-n sequence and P5 was drafted in parallel |
| Licence | Creative Commons Attribution 4.0 International (CC BY 4.0) [1] |
| Specifies and computes against | RefDepot-EMU-12, specified inline in section 2 |
| Rule on every number | Sourced to a cited document, derived by arithmetic from a row of section 2, or labelled modelled with the assumption stated inline |

## 1. Scope, and why rail forced the third schema

The three-schema programme was first drafted with two schemas. DEXPI 2.0 [2] would carry the process topology, CycloneDX 1.6 [3] would carry the software, and a join between a `TagName` and a package URL [4] would answer the question an operator asks after a disclosure lands: if this is exploited, what physically happens downstream? That design is sound in a refinery. It fails on the first rail asset anyone points it at, and it fails in a way that cannot be patched by adding fields, because the failure is a scope boundary rather than a gap.

### 1.1 The boundary, stated from the standards' own scopes

DEXPI 2.0 unified the DEXPI P&ID Specification 1.4 and the DEXPI Process Specification 1.0 and introduced DEXPI XML as the serialization for P&IDs, PFDs and BFDs [2]. Those three artefacts are the ones DEXPI names. A piping and instrumentation diagram, a process flow diagram and a block flow diagram are all descriptions of a process: material and energy moving through equipment under measurement and control. None of them is a single-line diagram, and a single-line diagram is what traction power distribution is.

The semantics layer sits in the same place and makes the boundary harder rather than softer. ISO 15926-4 is the initial reference data for process plants including oil and gas production facilities [16]. Its classes describe pumps, exchangers, vessels, valves, transmitters and the piping that connects them. There is no class in it whose instances are contact wires, section insulators, disconnectors with earth blades, or a traction return path through a running rail. P1 R-18 requires the ISO 15926-4 class to travel with the tag, because a tag alone is scoped to one plant and one discipline and carries no cross-site meaning [6]. A producer who drew a contact line section as a DEXPI object would emit a file carrying an object with no reference data class. That is a picture, not a model, and it fails R-18 on its face.

This is not a criticism of DEXPI. A standard that covers process plant thoroughly and says nothing about electrical distribution is behaving correctly. The error would be in a programme that assumed one schema's silence was an omission it could fill.

### 1.2 Why a depot is the case that breaks it rather than merely stretching it

Plenty of assets have some electrical content DEXPI cannot describe. A pump has a motor, a motor has a feeder, and a two-schema join can simply decline to model the feeder and still answer most questions about the pump. RefBESS-250MW showed a case where the electrical leg added real value and where the two-schema pair still returned most of the headline finding on its own [9].

A depot is different because it is two plants sharing a building, and the second plant is not an accessory to the first.

One of them is a process plant. A carriage and bogie wash with water recovery, filtration and dosing. A compressed air system supplying brake and door testing at a point on every road. Hall ventilation. A diesel fuelling point for the shunter, with a bunded storage tank and a transfer pump. Interceptors and sump pumps catching the drainage from all of it. Every one of those is an ordinary P&ID with an inventory, rotating equipment, valves, instruments and a piping network system. DEXPI describes that plant completely and without strain.

The other is a traction power system. A depot shore supply. A 25 kV contact line divided into switched sections so that one road can be worked on while the others stay live. Section disconnectors, several of them carrying an earth function. The isolation and earthing that makes it safe for a person to stand on the roof of a vehicle and open an air conditioning package. DEXPI describes none of it.

And the second plant is where people are killed. Work on or near an overhead contact line system is a defined electrical regime, and the requirements for dead working on one are the subject of EN 50488:2021 [21]. Protective provisions against electric shock, earthing and the return circuit sit in EN 50122-1:2022 [20]. The design of the contact line itself sits in EN 50119:2020 [19]. A cyber-physical twin of a depot that models the wash plant and not the sectioning has modelled the half that inconveniences the timetable and skipped the half that appears in a coroner's report.

That boundary is why the programme carries IEC 61970-301 [5] as a third leg, profiled by P2 as CPAI [7]. This is a finding rather than an admission. A two-schema proposal published without noticing it would have been rejected by the first rail engineer who read it, and correctly.

### 1.3 What the depot shows that the battery site could not

RefBESS-250MW had ten physical objects carrying all three identities, and the worked query ran on one of them: pump `P-1101A`, an object DEXPI, CycloneDX and CPAI could each name [10]. The join there was mediated by a shared physical object, which is also how P1's own worked example is built [6].

In a depot, **no object carries both a DEXPI leg and a traction-side CIM leg**, and none ever will, because the two halves share no physical object at all. The wash pump is a process object and a 400 V load, so it has a DEXPI leg and a low-voltage CIM leg. The contact line section above road 5 is a traction object and nothing else. There is no pump on the contact line and no contact wire in the air receiver.

The join still crosses between the halves. It crosses through the component leg, because a single firmware image commands objects on both sides: a depot protection interlock controller that holds a permissive over both a fuelling point and the earthing switch above it. Section 6 runs that crossing hop by hop, and section 6.8 runs the same crossing from the opposite direction, where it does not work, which is what makes the mechanism legible.

### 1.4 What this paper does not do

**It does not name a real operator, depot, product or vendor.** RefDepot-EMU-12 is synthetic. Every package URL uses a namespace prefixed `example-` under a domain reserved for documentation [14], so none resolves and none can be scanned. The advisory in section 6 carries a `SYN-` prefix and is not a CVE, following the convention P4 set [9].

**It does not generalise the blast radius formulation.** The multigraph formulation over two ontologies belongs to the two-schema bridge [25] and its generalisation to three is P7's subject. This paper traverses by hand, states every hop, and assigns no numeric coupling weight.

**It does not claim clause conformance to any rail standard.** Section 7 treats CLC/TS 50701 and EN 50126 at the level of scope and intent. No clause of either is cited, for the reason given there.

**It does not define new normative content.** P1's five relations [6] and P2's requirements and completeness levels [7] are used as published. Where the traversal met something those rules do not settle, it is recorded as a finding against the paper that owns the rule.

## 2. RefDepot-EMU-12 specification

The depot is specified here rather than in a separate document, because it exists only to support this paper and a second file would be a second place for a number to drift. Every row states whether its value was taken from a published source or chosen by the author. A value chosen inside a published context is modelled, and the context is named so a reader sees how much freedom the choice had.

### 2.1 Site and fleet

| Parameter | Value | Basis |
|:---|:---|:---|
| Designation | RefDepot-EMU-12 | Modelled. Synthetic, named to match RefBESS-250MW [10] |
| Site class | Electric multiple unit maintenance and stabling depot | Modelled |
| Fleet served | 12 units, 4 cars each, 48 vehicles | Modelled. The 12 in the designation |
| Vehicles under cover at once | 4, on the two maintenance roads | Modelled |
| Shift pattern | Not specified | Modelled as absent. Section 6.3 refuses to state occupancy for this reason |
| Diesel shunter | 1, used for moves under dead contact line and for rescue | Modelled |

### 2.2 Traction power

| Parameter | Value | Basis |
|:---|:---|:---|
| Traction supply system | 25 kV, 50 Hz, alternating current, overhead contact line | Sourced. 25 kV AC is one of the nominal contact line voltages EN 50488:2021 applies to [21]; supply voltages of traction systems are the subject of EN 50163 [22] |
| Contact line design standard | EN 50119:2020 | Sourced [19] |
| Electrical safety, earthing and return circuit | EN 50122-1:2022 | Sourced [20] |
| Regime for work on the contact line | Dead working under EN 50488:2021 | Sourced [21] |
| Roads under contact line | 6 | Modelled |
| Roads where roof access is permitted | 2, roads 3 and 4 | Modelled |
| Fuelling road | Road 5, one diesel shunter fuelling point | Modelled |
| Wash road | Road 6 | Modelled |
| Contact line sections | 8 | Modelled. Six road sections plus two approach sections |
| Section disconnectors | 8, one per section | Modelled |
| Section disconnectors carrying an earth function | 5, on the two roof-access sections, the fuelling section and the two wash hall sections | Modelled. The dead working regime is sourced [21]; which five sections carry the earth function is a choice, and no depot design was consulted |
| Traction feeder bays | 8, one per section, each with a circuit breaker and a protection device | Modelled |
| Traction return | Running rails, bonded and earthed | Modelled. The standard governing the return circuit is EN 50122-1 [20]; this depot's arrangement is a choice, and it appears in no schema leg, per section 4.6 |

### 2.3 Auxiliary power

| Parameter | Value | Basis |
|:---|:---|:---|
| Depot incoming supply | 2 transformers at 1000 kVA, 11 kV to 400 V | Modelled |
| Auxiliary distribution voltage | 400 V, three phase | Modelled |
| Incomer bays | 2 at 11 kV | Modelled |
| Main board bays | 2 at 400 V | Modelled |
| Shore supply points for stabled units | 6, one per road | Modelled |
| Motor loads on the 400 V system | 13 | Modelled. Enumerated in section 4.3 |

### 2.4 Process systems

| Parameter | Value | Basis |
|:---|:---|:---|
| Wash plant | 1, brush wash with water recovery | Modelled |
| Wash water recovery fraction | 0.80 of throughput returned to the recovery tank | Modelled. Chosen; no supplier figure was used and none is implied |
| Wash supply pumps | 2 at 100 percent | Modelled |
| Compressed air plant | 2 screw compressors at 100 percent, 55 kW each, 8 bar gauge | Modelled |
| Compressed air duty | Brake and door testing at one point on each of the six roads | Modelled |
| Hall ventilation | 2 air handling units at 50 percent | Modelled |
| Diesel storage | 1 bunded tank, 20 m3 | Modelled |
| Drainage | 1 interceptor, 2 sump pumps at 100 percent | Modelled |
| Tagged process objects | 60 | Modelled. Enumerated in section 3.3 |

### 2.5 Standards, schemas and identity

| Parameter | Value | Basis |
|:---|:---|:---|
| Railway cybersecurity specification | CLC/TS 50701:2023 | Sourced [17] |
| Railway RAMS standard | EN 50126-1:2017 | Sourced [18] |
| Security requirements standard it derives from | IEC 62443-3-3 | Sourced [23]. CLC/TS 50701 derives its security models, concepts and risk assessment process from the IEC 62443 series [17] |
| Target security level, depot control zone | SL-T 2 | Modelled |
| Process schema | DEXPI 2.0 | Sourced [2] |
| Process semantics | ISO 15926-4 reference data library | Sourced [16] |
| Component schema | CycloneDX 1.6, standardised as ECMA-424 | Sourced [3] |
| Component identity syntax | Package URL, standardised as ECMA-427 | Sourced [4] |
| Electrical schema | IEC 61970-301, profiled as CPAI | Sourced [5], [7] |
| Electrical exchange precedent | IEC 61970-600-1:2021 and IEC 61970-600-2:2021, both International Standards | Sourced [11], [12] |
| Substation automation standard present on site | IEC 61850 series | Sourced [27]. Present as a protocol and not as the electrical model, per section 4.5 |
| Model authority set | `https://example.org/mas/refdepot-network` | Modelled. Reserved documentation domain [14] |
| Asset reference form | UUID, canonical hyphenated lowercase | Sourced. RFC 9562 [13], required by P1 R-1 [6] |
| As-built basis, process leg | `PID-RD-AIR-201 rev B 2026-07-31` | Modelled |
| As-built basis, component leg | `BUILD-RD-2026-0902 2026-09-02` | Modelled |
| As-built basis, electrical leg | `NM-RD-EXPORT-2026-Q3 2026-08-11` | Modelled. Three dates on purpose, per P1 R-8 [6] |

### 2.6 The sourced-to-modelled count

Across the five tables above there are fifty parameter rows. Fifteen are sourced and thirty-five are modelled. Every sourced row points at a published standard or specification rather than at a survey of built depots, so "sourced" here means the standard exists and says what the row claims it says, not that any depot was measured.

That ratio is worse than a reader might want and it is the honest one for a synthetic asset. RefBESS-250MW reported thirteen of thirty-two on the same rule and said so on every row [10]. Nothing in this document is improved by hiding which rows were chosen.

The three as-built dates differ because P1 R-8 treats a divergent basis set as legitimate and conformant rather than an error to be tidied away [6]. The span is 31 July to 2 September 2026, thirty-three days, and section 6.7 states which leg it exposes and why the depot exposes it differently from a battery site.

## 3. Depot process systems in DEXPI

### 3.1 What the process leg covers, and what it is for

Four systems and their drainage.

The **wash plant** draws from a recovery tank, filters the recovered water, doses detergent into it, and delivers it to six spray arm circuits along road 6. The balance goes to an interceptor before discharge. The recovery fraction of 0.80 in section 2.4 is a modelled choice and drives nothing else in this paper; it is stated because a reader should be able to see which numbers are load-bearing and which are furniture.

The **compressed air plant** is two screw compressors at 100 percent feeding a dryer pair, a receiver and a header, with an isolation valve and a pressure control valve at the air point on each of the six roads. Brake and door testing is the duty. This is the system a maintainer uses most and the one whose loss stops work fastest.

**Hall ventilation** is two air handling units at 50 percent with zone temperature transmitters and supply dampers.

The **fuelling system** is a bunded 20 m3 diesel tank, a transfer pump, a fire-safe shutoff valve, a metering flow transmitter and a hydrocarbon detector covering the bund and the fuelling point on road 5.

Every one of these is an ordinary P&ID. This is DEXPI's home ground and nothing about it is unusual for a process engineer. What is unusual is that all four systems sit underneath live traction equipment, and the P&ID has no way to say so. Section 6.6 is about that sentence.

### 3.2 Piping network systems and where the join does not attach

DEXPI describes the connectivity of the process in its own piping network systems, and the join does not duplicate it. P1 defines no physics model and assigns hydraulic and thermal propagation to the two-schema work [6], [25]. So the path from the air receiver `V-2203` through the header to the road 5 air point `XV-2206E` is carried inside the DEXPI file and traversed there, not by a chain of join assertions.

The consequence for section 6 is that any hop running forward through the process is a delegated hop. It is marked as such every time it occurs, because the evidence changes at that point from a declared assertion a reader can check in a table to a schema-internal topology a reader has to open a file to check. P4 marked the same boundary at its own H9 [9] and this paper follows it.

Join assertions attach to the tagged object and never to a symbol on a drawing, per P1 R-17 [6]. `PID-RD-AIR-201` is at revision B and will reach revision C. The bindings below survive that; a binding attached to a shape would not.

### 3.3 Tagged objects

Sixty objects carry a `TagName`. The tag block is modelled site convention: 21xx wash, 22xx compressed air, 23xx ventilation, 24xx fuel, 25xx drainage.

| TagName range | Class, described | Function | Count |
|:---|:---|:---|:---|
| `P-2101A/B` | centrifugal pump | wash water supply, two at 100 percent | 2 |
| `P-2102` | centrifugal pump | recovered water transfer | 1 |
| `TK-2103` | atmospheric tank | wash water recovery inventory | 1 |
| `LT-2103` | level transmitter | recovery tank level | 1 |
| `AT-2104` | conductivity analyser | recovered water quality | 1 |
| `F-2105A/B` | filter | recovery loop solids removal | 2 |
| `XV-2106A` to `XV-2106F` | isolation valve | spray arm circuit isolation | 6 |
| `FT-2107A/B` | flow transmitter | wash water supply flow | 2 |
| `PT-2108A/B` | pressure transmitter | wash header pressure | 2 |
| `P-2109` | positive displacement pump | detergent dosing | 1 |
| `K-2201A/B` | screw compressor | instrument and test air, two at 100 percent | 2 |
| `DR-2202A/B` | refrigerant dryer | air drying | 2 |
| `V-2203` | air receiver | air storage | 1 |
| `PSV-2204A/B` | pressure safety valve | receiver overpressure relief | 2 |
| `PT-2205A/B` | pressure transmitter | air header pressure | 2 |
| `XV-2206A` to `XV-2206F` | isolation valve | road air point isolation | 6 |
| `PCV-2207A` to `PCV-2207F` | pressure control valve | road air point regulation | 6 |
| `AHU-2301A/B` | air handling unit | maintenance hall ventilation | 2 |
| `TT-2302A` to `TT-2302F` | temperature transmitter | hall zone temperature | 6 |
| `DMP-2303A/B` | damper | hall supply air | 2 |
| `TK-2401` | atmospheric tank | diesel storage, bunded | 1 |
| `LT-2401` | level transmitter | diesel tank level | 1 |
| `P-2402` | positive displacement pump | diesel transfer to the fuelling point | 1 |
| `XV-2403` | isolation valve | fuelling point fire-safe shutoff | 1 |
| `FT-2404` | flow transmitter | fuelling point metering | 1 |
| `AT-2405` | hydrocarbon detector | bund and fuelling point leak detection | 1 |
| `TK-2501` | interceptor | oily water separation before discharge | 1 |
| `LT-2501` | level transmitter | interceptor level | 1 |
| `P-2502A/B` | submersible pump | drainage sump, two at 100 percent | 2 |

The counts sum to sixty, matching the parameter row in section 2.4. The Class column is descriptive rather than a resolved ISO 15926-4 reference data library identifier [16], the same defect RefBESS-250MW records against itself [10], and section 8 records it here.

### 3.4 Relation assignment on the process leg

The instrument set is where P1's relation vocabulary does visible work. `TT-2302C` observes the temperature of hall zone 3 and commands nothing, so it carries `monitors`. `PCV-2207E` regulates the air point on road 5 and moves metal, so it carries `controls`. Both sit on the same field network and appear in the same bill of materials, and only the declared relation separates a falsified reading from an air supply an attacker can close. P1 R-13 forbids traversing one as the other [6].

| Object class | Relation carried | Toward |
|:---|:---|:---|
| DEXPI equipment object | `identity` | its own asset reference |
| DEXPI transmitter, analyser or detector | `monitors` | the asset it observes |
| DEXPI control valve or damper | `controls` | the asset whose state it moves |
| DEXPI isolation valve | `controls` | the asset it isolates |
| DEXPI piping segment feeding a road air point | `supplies` | the air point asset reference |

Five assignments drawn from the five relations P1 permits, none invented. Section 5.2 is where the vocabulary stops fitting, and it stops fitting on the traction side rather than here.

### 3.5 The two objects section 6 depends on

`P-2402` is the diesel transfer pump. It is a positive displacement pump on a variable speed drive, so it carries a DEXPI leg, a component leg for the drive firmware and a CPAI leg as a 400 V load. It is the process-half object the crossing query starts from.

`P-2109` is the detergent dosing pump, started direct on line, with no firmware of any kind. It is the deliberate two-leg counter-example and it plays the part `P-1403` plays in RefBESS-250MW [10]. Section 6.9 uses it and does not rediscover what P4 already found there.

## 4. Traction power in CIM, which DEXPI cannot represent

### 4.1 The objects, and why none of them is a P&ID object

The traction half of the depot is eight contact line sections, each fed through a bay in the depot substation, each with a section disconnector, and five of those disconnectors carrying an earth function so that the section above a road can be proved dead and earthed before anyone climbs onto a vehicle.

| Section | Serves | Disconnector | Earth function | Why |
|:---|:---|:---|:---|:---|
| `S-01` | Depot approach, outer | `SW-OCL-S01` | No | No work under it | 
| `S-02` | Depot approach, inner | `SW-OCL-S02` | No | No work under it |
| `S-03` | Road 1, stabling | `SW-OCL-R01` | No | Stabling only, no roof access | 
| `S-04` | Road 2, stabling | `SW-OCL-R02` | No | Stabling only, no roof access |
| `S-05` | Road 3, maintenance | `SW-OCL-R03` | Yes, `ES-OCL-R03` | Roof access permitted |
| `S-06` | Road 4, maintenance | `SW-OCL-R04` | Yes, `ES-OCL-R04` | Roof access permitted |
| `S-07` | Road 5, fuelling | `SW-OCL-R05` | Yes, `ES-OCL-R05` | Fuelling under the contact line |
| `S-08` | Road 6, wash hall | `SW-OCL-R06` | Yes, `ES-OCL-R06A` and `ES-OCL-R06B` | Personnel entry to the wash hall, two earthing points |

The whole table is modelled. What is sourced is the regime it exists to serve: work on or near an overhead contact line system is a defined electrical regime, and the requirements for dead working on one are the subject of EN 50488:2021, which applies to contact line systems at nominal voltages including the 25 kV AC of section 2.2 [21]. Protective provisions against electric shock, earthing and the return circuit sit in EN 50122-1:2022 [20], and the design of the contact line in EN 50119:2020 [19].

Eight disconnectors plus five earth functions on five sections, one of which carries two earthing points, gives thirteen switching devices in the traction system. That arithmetic reconciles with the `Switch` count in section 4.3 and it is worth checking, because a query traversing to a population that does not match the depot is traversing a different depot.

None of those objects is drawable in DEXPI, and the reason bears stating precisely rather than as an assertion. A P&ID object is an instance of an ISO 15926-4 class [16], and that library covers process plants including oil and gas production facilities. It has no class whose instances are contact wires or earthing switches. A producer who drew them anyway would emit a DEXPI file carrying objects with no reference data class, failing P1 R-18 [6]. The correct answer is that the traction half belongs to a different schema, and that is what the programme concluded.

### 4.2 What CPAI has to say about a depot, class by class

CPAI is the cyber-physical profile of IEC 61970-301 that P2 defines [7], [5]. It admits shape and refuses quantity, so this leg carries no impedance, rating, tap position or solved voltage. The question for a rail case is whether a profile drawn for an energy management system fits a depot at all, and the answer is mostly yes with two named strains.

| Depot object | CPAI class used | Fit |
|:---|:---|:---|
| Depot substation | `Substation` | Exact. One instance, and section 6.6 shows why one is a problem. |
| 25 kV, 11 kV and 400 V systems | `VoltageLevel` with `BaseVoltage` | Exact. Three of each. |
| Traction feeder bay, incomer bay, board bay | `Bay` | Exact. This is where an intelligent electronic device is installed, so it is where firmware lands [7]. |
| Traction feeder circuit breaker | `Breaker`, a `ProtectedSwitch` | Exact. |
| Traction feeder protection relay | `ProtectionEquipment` | Exact, and it is the class P2 names as the reason a conducting-equipment-only profile is too thin [7]. |
| Section disconnector | `Switch` | Approximate. See F-R1. |
| Earthing switch | `Switch` | Wrong at the level that matters. See F-R1. |
| Contact line section | `ACLineSegment` | Approximate. See section 4.4. |
| Depot transformer | `PowerTransformer` | Exact. |
| Process motor load, shore supply point | `EnergyConsumer` | Exact. This is the class that most often stands on the electrical side of an `identity` relation to a DEXPI object [7]. |
| Traction return through running rails | none | Absent. See section 4.6. |
| The road itself | none | Absent. See F-R3. |

### 4.3 The CPAI instance set

Instance counts are modelled and follow from the arrangement of section 2.

| CPAI class | Instances | Exemplar instance | Exemplar `mRID` |
|:---|:---|:---|:---|
| `Substation` | 1 | `DEPOT-SUB01` | `04e98069-77f6-4533-8ad7-0418e4ee8e78` |
| `VoltageLevel` | 3 | `VL-25` | `17f91236-0cac-4ba5-a27c-ab12e58f753c` |
| `BaseVoltage` | 3 | `BV-25kV` | `0d830a70-eff0-4197-8517-78ba62e2210a` |
| `Bay` | 14 | `BAY-25-R05` | `aeb81b22-94f2-4f9e-8e01-a7644646c4eb` |
| `PowerTransformer` | 2 | `TX-11-01` | `1e9d43b6-961a-41d4-af9e-6907028e6040` |
| `Breaker` | 14 | `CB-25-R05` | `47e2de2d-a04b-4923-accc-2f78c7451d6a` |
| `ProtectionEquipment` | 14 | `PROT-25-R05` | `90bb9444-d81f-4229-b215-c1135a72e656` |
| `Switch` | 13 | `ES-OCL-R05` | `7af92eb5-37e8-4ef2-95d8-3b3d2800a6ae` |
| `ACLineSegment` | 8 | `ACL-OCL-R05` | `5d3708b7-317e-47ed-b954-1f69364927b0` |
| `ConnectivityNode` | 24 | `CN-25-R05` | `0fddde28-4008-4030-8a5e-e48e3113ef9e` |
| `Terminal` | 96 | `T-ES-OCL-R05` | `6ba56123-0416-4c7e-bce4-8999dea1b928` |
| `EnergyConsumer` | 19 | `EC-AUX-P2402` | `c58591fe-0313-4566-a38d-a0e055e04416` |

Three counts reconcile against the rest of the document and are worth running, because a population that does not reconcile is evidence that two files describe different sites.

**Fourteen bays.** Two 11 kV incomer bays, two transformer bays, eight 25 kV contact line feeder bays and two 400 V main board bays. Two plus two plus eight plus two is fourteen. The breaker and protection counts match it because every bay carries one of each.

**Thirteen switches.** Eight section disconnectors plus five earthing points, per the section table of 4.1.

**Nineteen energy consumers.** Thirteen motor loads plus six shore supply points. The thirteen are two wash supply pumps, one recovered water transfer pump, one detergent dosing pump, two compressors, two dryers, two air handling units, one diesel transfer pump and two drainage pumps, which is arithmetic on the tag block of section 3.3. The six shore supply points are the arrangement row of section 2.3.

### 4.4 The contact line as `ACLineSegment`, and how far that stretches

A depot contact line section is carried as `ACLineSegment`. That class was designed for transmission and distribution conductors and a contact wire with a running rail return is not one. Three differences matter and none of them defeats the modelling.

The conductor is a contact wire designed to be swept by a pantograph, so its mechanical design is governed by EN 50119 rather than by a cable standard [19]. CPAI carries no mechanical property, so nothing is asserted that would be wrong.

The return is not a second conductor of the same kind but the running rails, bonded and earthed under EN 50122-1 [20]. CPAI carries no return path for any conductor, so again nothing false is asserted, and section 4.6 records what is lost.

The section is switched frequently and deliberately, as part of ordinary depot work rather than as a fault response. Section 6.7 treats what that does to the model's currency.

CPAI's refusal of quantity is what makes the fit tolerable. Only the shape is used, and the shape is right: a conductor running between connectivity nodes, fed through a bay, isolatable by a switch. A profile that demanded impedance would have forced a producer to invent one.

### 4.5 IEC 61850 is present in a depot and it is not the electrical model

A depot substation has intelligent electronic devices, a station bus, and a substation configuration description. It is tempting to say the depot already has an electrical model and skip the CIM leg. That conflation is the one P2 opens by warning against, and rail is the domain most likely to fall into it, because IEC 61850 is far more familiar to a rail engineer than IEC 61970 is.

The IEC 61850 series is titled *Communication networks and systems for power utility automation* [27]. It governs how devices inside a substation talk and how their data is described. IEC 61970-301 governs what the network is: which breaker sits in which bay, which conductor runs between which connectivity nodes [5]. P2 sets the distinction out in full and this paper adopts it without restating the argument [7].

The practical consequence in a depot is specific. An engineer holding the substation configuration description can tell you which relay publishes which dataset and can tell you nothing about which road the section it protects sits above. A configuration description describes devices and their data, not the topology of the circuit they protect. The traction sectioning arrangement of section 4.1 is topology, and it is the CIM leg's contribution.

### 4.6 What the traction leg cannot carry at all

**The return circuit.** The traction return through bonded running rails is the subject of EN 50122-1 [20] and it appears in none of the three legs. CPAI has no representation of it, DEXPI has no class for it, and CycloneDX has nothing to say about a rail. A depot's earthing and bonding scheme is a safety system and this twin does not model it. That is stated as a limitation and not fixed.

**The switching state.** P2 excludes `TopologicalNode` because a bus derived from current switch positions changes as the network is switched, and an asset reference bound to one would break in normal operation [7]. The exclusion is correct and it means the CIM leg describes the switching arrangement as modelled, never as switched. The join answers what can act on a section; it never answers whether the section is live right now.

**The road.** Treated as F-R3 in section 6.6, because it is the query that exposes it.

### 4.7 Completeness level, and why the ceiling is not high enough

RefDepot-EMU-12 reaches **L4**, the highest level P2 defines, and declares it rather than leaving a consumer to infer it, as C-7 requires [7].

| Level | What P2 requires | Present in RefDepot-EMU-12 |
|:---|:---|:---|
| L1 | an admitted `IdentifiedObject`, its `mRID`, its authority set and a relation | Yes. Authority set `https://example.org/mas/refdepot-network` |
| L2 | plus `Terminal` and `ConnectivityNode` | Yes. 96 and 24 |
| L3 | plus `Bay`, `VoltageLevel`, `Substation` and `BaseVoltage` | Yes. 14, 3, 1, 3 |
| L4 | plus `Breaker`, `ProtectedSwitch` and `ProtectionEquipment` | Yes. 14 breakers, each a `ProtectedSwitch`, and 14 protection devices |

P2 defines L4 as the level at which a cyber event traces to a physical action, because the profile can say what removes supply from an asset and what is meant to trip [7]. Both of those are availability questions. The depot asks a third question and P2 has no class for it.

> **F-R1.** CPAI admits `Switch`, `ProtectedSwitch` and `Breaker` and names no isolating or earthing device class. The depot's eight section disconnectors and five earthing points therefore land in `Switch`, indistinguishable from each other and from any other non-protective switch. Section 6 reaches the right object only because the CPAI document declares an instance name a human can read, and C-8 explicitly forbids a consumer inferring anything from a name [7]. So an automated consumer at L4 cannot tell the device that makes a section safe to touch from the device that merely opens it. L4 answers what removes supply; depot isolation asks what makes it safe to touch, and the class that answers it is not in the profile. Whether IEC 61970-301 carries suitable switch subclasses under names this paper could confirm was not established, and no class name is invented here, for the same reason P2 deferred `Feeder`: the published UML is a paid standard the authors do not hold [7]. The requirement is named. The class is not.

The finding has a shape worth noting. P4 found that CPAI had no class for a grid-forming converter and reported it as a gap that did not touch its query [9]. Here the gap sits directly on the query's critical hop. Two applied papers in two sectors have now found the same kind of hole in the same place, which is evidence that P2's class list was drawn from an energy management system's questions rather than from a cyber-physical one's.

## 5. The control stack in CycloneDX

### 5.1 The bills of materials

The depot carries six CycloneDX 1.6 documents, one per deliverable unit, each produced by the build system that assembles it. There is no merged site bill of materials, for P1's reason for having no central join registry: a merge reintroduces a single authority and hides which build system vouched for which claim [6].

Vendor namespaces are synthetic, prefixed `example-`, under a domain reserved for documentation and unregistrable [14]. No package URL here resolves and none can be scanned.

| Bill of materials | Deliverable unit | Representative component identity | Component type |
|:---|:---|:---|:---|
| BOM-RD-DMS | Depot management | `pkg:oci/depot-manager@sha256:46178f27b0fdd1cebe7d9c2395d15649c226c98f7e5a6c2991515f3592f0cbfb?repository_url=registry.example.org/example-depot&tag=9.1.0` | container image, depot management system |
| BOM-RD-DMS | Depot management | `pkg:pypi/pymodbus@3.6.9` | library, inside the depot management image |
| BOM-RD-WSH | Wash plant automation | `pkg:generic/example-wash/wash-plc@4.6.2` | firmware, wash plant controller |
| BOM-RD-AIR | Compressed air plant | `pkg:generic/example-air/compressor-ctrl@2.3.1` | firmware, compressor package controller |
| BOM-RD-HVA | Hall ventilation | `pkg:generic/example-hvac/ahu-ctrl@6.1.4` | firmware, air handling unit controller |
| BOM-RD-SEC | Sectioning and depot protection | `pkg:generic/example-traction/section-scada@8.0.3` | software, sectioning supervisory control |
| BOM-RD-SEC | Sectioning and depot protection | `pkg:generic/example-traction/interlock-plc@3.4.0` | firmware, depot protection interlock controller |
| BOM-RD-PRO | Traction feeder protection | `pkg:generic/example-protection/ocl-feeder-relay@2.5.1` | firmware, 25 kV feeder protection relay |
| BOM-RD-NET | Depot network | `cpe:2.3:h:example_networks:depot_switch:1200:*:*:*:*:*:*:*` | hardware, no package coordinate applies [15] |

Two properties of this leg decide what section 6 can do with it.

**It is the volatile leg.** A firmware upgrade mints a new package URL, correctly, because it is a different artefact [6], [4]. RefDepot-EMU-12 is specified with versions rather than ranges for that reason, and the query in section 6 is stated against `3.4.0` and says nothing about `3.4.1`.

**Not every component has a package URL.** The depot network switch is hardware and carries a CPE instead [15]. The switchgear, the transformers, the contact line and the running rails all sit in the same category. A bill of materials reporting only what has a package coordinate reports the software and calls it the depot.

### 5.2 Relation assignment, and the interlock the vocabulary does not fit

Firmware is a constituent and not the asset, so every component above carries `partOf` toward the object it runs inside, with four stated exceptions.

| Component | Relation | Toward |
|:---|:---|:---|
| Depot management system | `monitors` | the process plant and the traction sectioning |
| Wash plant controller | `controls` | the six spray arm circuit isolation valves |
| Compressor package controller | `controls` | the two compressors and the two dryers |
| Sectioning supervisory control | `controls` | the eight section disconnector asset references |
| Depot protection interlock controller | `controls` | the road 5 earthing switch, the road 5 section disconnector, and the diesel transfer pump permissive |

The last row is the one the vocabulary does not fit.

An interlock does not command a state. It refuses one. The depot protection controller exists so that the fuelling point cannot be enabled while the contact line above it is live and unearthed, and so that an earthing switch cannot be commanded closed onto a live section. Its output is a permissive and its entire safety value is in the case where it says no.

P1's five relations are `identity`, `partOf`, `controls`, `supplies` and `monitors` [6]. `monitors` is wrong, because the device acts on the world. `controls` is the only remaining fit and it reads as issuing a command.

> **F-R2.** P1's relation vocabulary has no form for a permissive. An interlock encoded as `controls` is indistinguishable from a controller that commands the same object, and the two fail in opposite directions: a compromised commander makes something happen, a compromised permissive allows something that should have been refused. A consumer ranking a reach set by service impact will therefore rank the permissive lowest, because losing it changes nothing that anyone can see. P1 section 9 already names the closed five-relation vocabulary as the decision it is least confident about; this is a concrete case against it, from a domain where the permissive is the safety function. This finding does not propose a sixth relation. Widening the vocabulary carries the cost the F-2 discussion identified, where the same instinct was raised and set aside [9], [24], and the choice belongs to a P1 revision rather than to an applied paper.

### 5.3 One artefact commanding three objects, and how it must be encoded

The interlock controller carries four assertions: `partOf` toward its own cabinet and `controls` toward three separate asset references. P1 R-3 requires a join assertion to state exactly one asset reference, exactly one relation, exactly one authority and exactly one basis, and R-21 requires it to sit in the `properties` array of the component it applies to [6]. A CycloneDX `properties` array is a flat list of name and value pairs permitting repeated names [3], so a single component object carrying four references and four relations gives a consumer no rule for pairing them, and R-3 supplies none.

The encoding satisfying both is the one P4 derived as F-1: one component object per assertion, each with its own document-local `bom-ref`, all sharing the same `purl`, which is legal because `bom-ref` is document-local and unique while `purl` need not be unique within a document [3], [9].

F-1 reached that rule from a package installed on four devices. RefDepot-EMU-12 reaches the same rule from one device commanding three objects. Two independent routes arriving at one encoding is evidence for F-1's recommendation that P1 state the rule in section 6 rather than leave it to be derived. This paper applies it and adds nothing to it.

The component object carrying the crossing assertion:

```json
{
  "type": "firmware",
  "bom-ref": "interlock-plc-3.4.0-ctrl-es-r05",
  "name": "interlock-plc",
  "version": "3.4.0",
  "purl": "pkg:generic/example-traction/interlock-plc@3.4.0",
  "properties": [
    { "name": "assetjoin:ref",
      "value": "0644acbc-0e3d-469d-bca0-6df022f29af3" },
    { "name": "assetjoin:relation", "value": "controls" },
    { "name": "assetjoin:authority",
      "value": "https://example.org/authority/refdepot-build" },
    { "name": "assetjoin:basis", "value": "BUILD-RD-2026-0902 2026-09-02" }
  ]
}
```

The CPAI object that reference resolves to, carrying the join fields in a namespace outside the CIM namespace as C-3 requires [7]:

```
cim:Switch
  cim:IdentifiedObject.mRID      "7af92eb5-37e8-4ef2-95d8-3b3d2800a6ae"
  cim:IdentifiedObject.name      "ES-OCL-R05"
  join:assetReference            "0644acbc-0e3d-469d-bca0-6df022f29af3"
  join:relation                  "identity"
  join:authority                 "https://example.org/authority/refdepot-network"
  join:basis                     "NM-RD-EXPORT-2026-Q3 2026-08-11"
  join:modelAuthoritySet         "https://example.org/mas/refdepot-network"
```

And the DEXPI object at the process end of the same controller's reach, attached to the object carrying the tag per R-17 [6]:

```xml
<Equipment ID="EQ-P-2402">
  <TagName>P-2402</TagName>
  <GenericAttributes Set="AssetJoin">
    <GenericAttribute Name="AssetReference"
                      Value="1772bca9-e351-48b2-b860-ec96eb58873d"/>
    <GenericAttribute Name="AssetReferenceRelation" Value="identity"/>
    <GenericAttribute Name="AssetReferenceAuthority"
                      Value="https://example.org/authority/refdepot-plant"/>
    <GenericAttribute Name="AssetReferenceBasis"
                      Value="PID-RD-AIR-201 rev B 2026-07-31"/>
  </GenericAttributes>
</Equipment>
```

Three files, three identity systems, none of them holding a foreign identifier, which is P1 R-9 and the reason this is a mapping rather than a merge [6].

## 6. The join across a genuinely split domain

### 6.1 The question

> **Q-1.** Advisory `SYN-RD-2026-0001` is disclosed against `pkg:generic/example-traction/interlock-plc@3.4.0`, permitting an unauthenticated write that forces a depot protection permissive to the granted state without the position inputs behind it changing. Under the bindings RefDepot-EMU-12 publishes, which objects does the compromise reach, in which leg, by which declared hop, and does the reach set cross from the process half of the depot into the traction half?

`SYN-RD-2026-0001` is a synthetic advisory identifier. It is not a CVE, no numbering authority issued it, and no such advisory exists; the `SYN-` prefix is there so it cannot be mistaken for one. A real CVE could not be used, because the target package URL is itself synthetic and unregistrable [14], and attaching a real advisory to a package that does not exist would be a fabrication.

### 6.2 What each leg is asked for

CycloneDX 1.6 is asked which components carry this `purl` and what asset references their assertions name. DEXPI 2.0 is asked what tagged object those references denote and what it does. CPAI is asked what the remaining references denote electrically, where those objects sit, and what else can act on them.

No leg is asked a question another leg could answer, which is the test of whether the join is doing work or decorating a result one schema already had.

### 6.3 The traversal, hop by hop

Each hop states the leg, the mechanism, and whether it is a join hop under P1, a model traversal under P2, or a hop the join delegates to a schema's own topology.

**H1. Component leg, join hop.** Query `BOM-RD-SEC` for components whose `purl` equals `pkg:generic/example-traction/interlock-plc@3.4.0`, and read the `assetjoin:ref` and `assetjoin:relation` of each. Four component objects are returned under the section 5.3 encoding.

| Component object | Relation | Asset reference | Denotes |
|:---|:---|:---|:---|
| `interlock-plc-3.4.0-partof-cab` | `partOf` | `0f93d92c-df09-4867-9d5a-ecda1b0b2057` | the interlock controller cabinet |
| `interlock-plc-3.4.0-ctrl-es-r05` | `controls` | `0644acbc-0e3d-469d-bca0-6df022f29af3` | resolved at H3 |
| `interlock-plc-3.4.0-ctrl-sw-r05` | `controls` | `5b90d48a-a6b2-4646-80a1-0ea7243526cd` | resolved at H4 |
| `interlock-plc-3.4.0-ctrl-p2402` | `controls` | `1772bca9-e351-48b2-b860-ec96eb58873d` | resolved at H2 |

All four carry authority `https://example.org/authority/refdepot-build` and basis `BUILD-RD-2026-0902 2026-09-02`.

**H1a. What H1 does not return.** The three roof-access and wash sections carry earthing switches too, and the interlock controller plausibly holds permissives over them. RefDepot-EMU-12 publishes bindings only for road 5. P1 R-12 requires a consumer to treat an asset reference appearing in only one file as unjoined and forbids synthesising the missing legs [6], and nothing permits minting references that were never printed. H1 returns three bound objects and reports the rest as not published in the source document. That is a result and not a gap, and it is the same distinction P4 met at its own H1a [9].

**H2. Process leg, join hop.** Resolve `1772bca9-e351-48b2-b860-ec96eb58873d` in the DEXPI file. It carries relation `identity` on the equipment object whose `TagName` is `P-2402`. Physical object reached: the diesel transfer pump serving the fuelling point on road 5, a positive displacement pump on a variable speed drive.

**H3. The crossing.** Resolve `0644acbc-0e3d-469d-bca0-6df022f29af3`.

It does not appear in the DEXPI file. It never will, for the reason section 4.1 gives. It appears in the CPAI document, carrying relation `identity` on the `Switch` instance `ES-OCL-R05`, the earthing switch on the road 5 contact line section, `mRID` `7af92eb5-37e8-4ef2-95d8-3b3d2800a6ae`, model authority set `https://example.org/mas/refdepot-network`.

This is the hop the paper exists to show, so it is worth being explicit about what carried it.

H2 landed in the process half. H3 landed in the traction half. Nothing in the DEXPI file points at the CPAI document and nothing in the CPAI document points at the DEXPI file. The two halves share no object, so there is no `identity` assertion binding one to the other, no `supplies` assertion running between them and no `partOf` chain connecting them. The join crossed because two asset references appeared in the `properties` arrays of two component objects sharing one `purl` inside one CycloneDX document, and for no other reason.

**The component leg is the bridge, and in this depot it is the only bridge there is.** Section 6.8 runs the same crossing in the opposite direction, where there is no bridge, which is what makes the mechanism legible rather than merely successful.

**H4. Electrical leg, join hop.** Resolve `5b90d48a-a6b2-4646-80a1-0ea7243526cd`. It carries `identity` on the `Switch` instance `SW-OCL-R05`, the road 5 section disconnector.

**H5 to H8. Electrical leg, CPAI model traversal.** From `ES-OCL-R05`, using only associations P2 admits and the document declares, as C-8 requires [7]:

| Hop | Object | `mRID` | Association used |
|:---|:---|:---|:---|
| H5 | `T-ES-OCL-R05`, `Terminal` | `6ba56123-0416-4c7e-bce4-8999dea1b928` | `Terminal` to `ConductingEquipment` |
| H6 | `CN-25-R05`, `ConnectivityNode` | `0fddde28-4008-4030-8a5e-e48e3113ef9e` | `Terminal` to `ConnectivityNode` |
| H7 | `ACL-OCL-R05`, `ACLineSegment` | `5d3708b7-317e-47ed-b954-1f69364927b0` | `Terminal` to `ConnectivityNode`, read back |
| H8 | `BAY-25-R05`, then `VL-25`, then `DEPOT-SUB01` | `aeb81b22-94f2-4f9e-8e01-a7644646c4eb`, `17f91236-0cac-4ba5-a27c-ab12e58f753c`, `04e98069-77f6-4533-8ad7-0418e4ee8e78` | `Equipment` to `EquipmentContainer`, then `Bay` to `VoltageLevel`, then `VoltageLevel` to `Substation` |

**H8a. Direction check.** H5 to H8 were traversed and none of them is affected by Q-1. The relations reaching them point toward the switch, and P1 R-13 forbids inverting a directed relation [6], so a compromise of the interlock firmware does not propagate up the containment chain. These objects are the electrical context of the affected assets: where they sit and what else is in the same bay. Reporting them as damaged would be the most likely error in an automated version of this traversal, and it is the same error P4 guarded against at its own direction check [9].

**H9. Process leg, delegated hop.** From `P-2402` forward into the fuel system, through `XV-2403` to the fuelling point on road 5. The join does not carry this hop. P1 defines no physics model [6], and the path from a transfer pump to a delivery point is the DEXPI file's own piping network system, per section 3.2.

The delegation is correct and it is not free. From H9 onward a reader auditing the result has to open the DEXPI file, because the evidence has stopped being a declared assertion in a table. This paper marks the boundary rather than smoothing it.

**H10. Component leg, second-order reach at the same objects.** `PROT-25-R05` runs `pkg:generic/example-protection/ocl-feeder-relay@2.5.1` from `BOM-RD-PRO`, and the eight section disconnectors are also commanded by `pkg:generic/example-traction/section-scada@8.0.3` from `BOM-RD-SEC`. Two build authorities and three artefacts can act on the road 5 section. Q-1 concerns one of them. The other two are reported as reached and not affected, and their presence is itself an output: an operator asking what software can touch road 5 gets three answers, not one.

**H11. The hop no leg can make.** The fuelling point that H9 reaches is underneath `ACL-OCL-R05`, the contact line section that H7 reaches. That co-location is the entire safety argument and no file states it. Section 6.6 treats it.

### 6.4 The answer

**Affected set, process half.** One object, `P-2402`, the diesel transfer pump, reached at H2 through a declared `controls` assertion.

**Affected set, traction half.** Two objects, `ES-OCL-R05` and `SW-OCL-R05`, reached at H3 and H4 through declared `controls` assertions.

**Electrical context set, reached and not affected.** Four CPAI objects at H5 to H8, plus the road 5 feeder breaker `CB-25-R05` and its protection device `PROT-25-R05`.

**Other software reaching the same objects, reported and not affected.** `section-scada@8.0.3` and `ocl-feeder-relay@2.5.1`, at H10.

**Physical consequence, under the assumptions of section 6.5.** A forced permissive means two things. The fuelling point can be enabled while the contact line above it is live and unearthed. And an earthing switch can be commanded closed onto a live section, which is a fault-making operation rather than a loss of supply. Both outcomes put a person and a live 25 kV conductor in the same place, which is the condition the dead working regime of EN 50488:2021 exists to prevent [21].

**This is a safety finding, not an availability finding.** That distinction is the reason the query was worth running, and it is the sentence a depot engineer will want to argue with. Every other object the traversal touched fails toward loss of function. A compromised wash controller stops washing trains. A compromised compressor controller stops brake testing, which stops the depot inside a shift. Both are expensive and neither is dangerous. The interlock fails toward permitting something that should have been refused, and the cost of that is not measured in delay minutes.

An analysis ranking the reach set by service impact would rank this one lowest of the three. That ranking is what a conventional availability-driven vulnerability triage would produce, and the join is what makes the other reading visible.

**No probability, no timing and no cost is stated.** Whether anyone is on a roof or at a fuelling point at a given moment is a work control fact, not a model fact. RefDepot-EMU-12 carries no work control system, no permit process, no shift pattern and no commercial model, and section 2.1 marks the shift pattern as deliberately absent. Numbers for any of these would be invented and would look measured.

**No claim of injury is made.** The traversal produces an ordering of events and a hazardous condition. Whether that condition becomes harm depends on the procedural defences the depot runs, which section 6.5 treats as CA-1 and which this model does not carry.

### 6.5 What the answer depends on

Each assumption is labelled and contestable at the point it is stated. None carries a numeric weight, for the reason section 1.4 gives.

**CA-1, modelled, and the assumption the whole finding rests on. A forced permissive is a lost interlock.** The advisory permits writing the permissive state directly, and a permissive that cannot refuse is not an interlock.

It is the least contestable assumption here and it is still an assumption, in three directions a reader should attack.

A depot with a hardwired trapped key scheme in series with the software permissive does not fail this way, because the key cannot be released while the section is live regardless of what the controller believes. A depot whose earthing switch is manually operated and locked cannot be commanded closed at all. And a depot running a work permit process where a competent person proves the section dead with a test device before applying earths has a human check the software cannot defeat, which is exactly the kind of measure a dead working regime is built around [21].

RefDepot-EMU-12 specifies a single-channel software permissive and no second channel, and the parameter tables say so by omission. This paper assumes no second channel exists. A reader whose depot has one should reject the finding, and that is the useful output of the query, because a single-channel software permissive on a safety function is a design an operator can change and would not think to look for without seeing this result.

**CA-2, modelled. The section disconnector and the earthing switch are commandable from the same controller.** Section 2 and section 5.2 put both on `BOM-RD-SEC`. A depot separating the two onto independent controllers reduces the traction-half reach set from two objects to one, and defeats the specific sequence where a section is left apparently isolated while the earth is not applied.

**CA-3, modelled, with a sourced requirement behind it. Road 5's section carries an earth function because work happens beneath it.** Dead working on a contact line system is a defined regime with electrical protective measures and EN 50488:2021 is the standard that treats it [21]. Which five of the eight sections carry the earth function is the author's choice, stated as modelled in section 2.2 and enumerated in section 4.1, and it was taken from no depot design.

**CA-4, modelled. Fuelling happens under the contact line.** The fuelling point is on road 5 and road 5 is under `ACL-OCL-R05`. A depot siting its fuelling point outside the electrified area removes this hazard entirely, and that is a real design choice some depots make. RefDepot-EMU-12 puts it under the wire because the interesting case is the one where the two halves overlap.

**CA-5, a refusal rather than an assumption. No probability, no timing, no cost and no injury claim.** Repeated from section 6.4 because a reader skimming for a headline number should find the refusal instead.

**Basis set.** The component-leg finding is as of 2 September 2026, the electrical leg as of 11 August 2026 and the process leg as of 31 July 2026. Section 6.7 states which of the three the span exposes.

**Encoding, per F-1.** Had the producer emitted one component object with four repeated property pairs, H1 would return an ambiguous set and the traversal would stop rather than return a wrong answer, which is the correct failure [9].

### 6.6 The road, which is the safety boundary and which no schema names

H11 stopped. This section says why, because the stop is a finding rather than an inconvenience.

A maintainer at the fuelling point on road 5 is underneath `ACL-OCL-R05`. Nothing in any of the three files says so. The DEXPI file carries location in a tag convention that a person reads and a machine does not: `XV-2206E` is the road 5 air point because the site numbers its air points in road order, which is a convention and not an assertion. The CPAI document's finest spatial container is `Bay`, and P2 excluded the geographical classes on the ground that `Substation` already localises an asset well enough for every question the join asks [7].

That reasoning is right for a substation and wrong for a depot. In RefBESS-250MW, reporting consequence at the station was useful because the site had several. Inside RefDepot-EMU-12 every object in Q-1 sits in `DEPOT-SUB01`, so `Substation` separates nothing at all. The only spatial distinction that matters is which road, and it is exactly the distinction no leg carries.

The obvious fix is to make the road an asset and mint it a reference, and this paper does not do that.

P1 defines an asset as the smallest physical object that at least two of the three participating schemas can name [6]. A depot road is named by none of them. DEXPI names the air point beside it and the drain under it; CPAI names the contact line above it; CycloneDX names neither. Minting an asset reference for the road would put an object in the join that P1's own definition excludes, and it would do so silently, in an applied paper, against a specification the programme is trying to submit upstream. The gap is recorded instead.

> **F-R3.** The depot's safety boundary is the road, and no schema names it, so the join cannot assert co-location. Q-1's process-half object and its traction-half objects are in the same place and nothing in the three files says so; a consumer that reported the fuelling point and the contact line section as unrelated would be reading the model correctly. P1's asset definition excludes the road, so an applied paper cannot patch this without changing P1. P2's exclusion of the geographical classes is correct for a substation and wrong for a site where one substation contains every object under discussion. A P2 revision should either admit a spatial container below `Substation` or state that consequence reporting inside a single station is out of the profile's reach. The fix is not obviously geographical classes, because the road is an operational area rather than a network boundary, which is what those classes model.

### 6.7 Which leg the thirty-three day basis span exposes

The three as-built bases span 31 July to 2 September 2026. The exposure is not symmetric and it differs from the battery case in one way worth stating.

The **DEXPI leg** is the oldest and the least exposed, because a tag survives a component change. If the drive on `P-2402` was replaced on 20 August, the `identity` assertion on `P-2402` is still true on 2 September.

The **CPAI leg** is similarly insensitive at the level of identity. An `mRID` on a `Switch` is stable within one model authority set across exports of the same model [7], and replacing a controller does not move the switch in the network.

The **component leg** is the exposed one, in the direction that matters, because its identity changes on every upgrade [6]. A build basis of 2 September states what the build system produced that day. It does not establish that `3.4.0` is executing in the interlock cabinet now, which P1 records as a limitation of `purl` in general [6]. Q-1 is therefore stated as of a basis set rather than as of a date, and its component-leg finding is the perishable one.

The depot adds a case a battery site does not have, and it sits on the CPAI leg despite that leg being identity-stable. A depot's traction sectioning is altered constantly as part of ordinary work: a road taken out of use, a section split for a possession, an earth applied on Friday and left on over the weekend. A CPAI export dated 11 August describes the switching arrangement as modelled, never as switched, and P2's exclusion of `TopologicalNode` guarantees that [7].

So the CIM leg is stable in identity and silent about state, and the two properties are the same property. The join answers what can act on the road 5 section. It never answers whether the road 5 section is live at this moment, and a consumer that read a stable model as a current one would draw a confident conclusion about a hazard that had already been removed, or missed one that had just been created.

### 6.8 The same crossing attempted from the process side, where it fails

Q-1 crossed from process to traction. A reader is entitled to ask whether the crossing is a property of the join or an artefact of where the query happened to start. The test is to start on the other side.

> **Q-3.** A maintainer is about to work at the road 5 air point. Starting from the process leg alone, what software can act on anything on road 5?

**K1. Process leg, join hop.** Resolve the tagged object `XV-2206E`, the road 5 air point isolation valve. It carries `identity` on its own asset reference.

**K2. Component leg, join hop.** Query the six bills of materials for components asserting `controls` or `monitors` toward that reference. The compressed air package controller `compressor-ctrl@2.3.1` is returned for the compressors and dryers, and `wash-plc@4.6.2` is not, because the wash controller acts on road 6. Software reached: one artefact.

**K3. Process leg, delegated hop.** Traverse the DEXPI piping network system backwards from `XV-2206E` to the header, the receiver `V-2203`, the dryers and the compressors. Objects reached: the compressed air plant.

**K4. Electrical leg, join hop.** Resolve the same references in the CPAI document. Every process object reached so far is a 400 V load, so each has an `EnergyConsumer` and a route to its board breaker, its protection device and `VL-400`. Software reached: the protection firmware in `BOM-RD-PRO`.

**K5. The traversal stops.** Nothing reached at K1 to K4 has any assertion pointing at `ACL-OCL-R05`, `SW-OCL-R05` or `ES-OCL-R05`. The process objects sit at 400 V under `VL-400`, the traction objects sit at 25 kV under `VL-25`, and the only CPAI object above both is `DEPOT-SUB01`, which contains everything and therefore distinguishes nothing.

**K6. The answer to Q-3 is wrong, and it is wrong in the dangerous direction.** The correct answer is that three artefacts can act on road 5's contact line section and one of them holds the permissive protecting the fuelling point beneath it. Q-3 returns two artefacts, both acting on compressed air, and gives a maintainer no reason to think anything else is relevant to where they are standing.

Q-1 and Q-3 differ only in which end they start from. Q-1 crossed because it began at an artefact that happened to carry references on both sides. Q-3 could not cross because it began at a physical object, and physical objects in this depot have no assertion pointing across the split.

> **F-R4.** A three-schema join is not always mediated by a shared physical object, and where it is not, it is directional. In a domain split cleanly between two schemas, the only object touching both halves may be a software artefact, so a query starting at a component can cross and a query starting at a plant object cannot. P1's worked example binds one pump in three files and implies the general case looks like that [6]. It should state that a join may be component-mediated, that a consumer finding no shared object between two legs has not necessarily found a thin model, and that a traversal beginning at a plant object in a split domain may be silently incomplete rather than complete and small. Q-3 is the shape a maintainer's question actually takes, which makes this the more common case and the more dangerous one.

F-R3 and F-R4 are the same wound seen from two angles. If the road were nameable, Q-3 would cross by way of it. Because it is not, Q-3 has nowhere to go.

### 6.9 The two-leg object, and the absence P1 still cannot express

`P-2109`, the detergent dosing pump, is started direct on line and has no firmware. It carries a DEXPI leg and a CPAI leg and no component leg.

> **Q-2.** Which packages must be patched to protect the detergent dosing function `P-2109`?

**J1. Component leg.** Query the six bills of materials for a component asserting `partOf` toward its asset reference. The result is the empty set.

**J2. The reporting rule.** P2 section 7 states that silence is not absence and that a consumer must not read a missing class as a negative fact [7]. P1 R-12 requires an asset reference appearing in only one file to be treated as unjoined rather than as having no other legs [6]. The correct report is that no component leg is asserted for this asset; the incorrect report is that this asset has no software exposure.

**J3. Electrical leg.** `P-2109` is one of the nineteen loads of section 4.3. Its `EnergyConsumer` sits on a 400 V board with a breaker and a protection device, and that protection device runs `pkg:generic/example-protection/ocl-feeder-relay@2.5.1` from `BOM-RD-PRO`.

**J4. The answer to Q-2 is not the empty set.** It is the protection firmware, reached in three hops through the electrical leg, on an object carrying no firmware of its own.

That is the same traversal P4 ran on `P-1403` and it produces the same result, so it is not restated further. It also meets the same specification defect, which P4 raised as F-2 and which the programme has recorded as a confirmed defect open against a P1 revision [9], [24]: P1 provides no way to assert that an asset has no leg in a given schema, so a consumer cannot distinguish an unpublished binding from an asserted absence, while P2 section 7 requires it to treat the two differently. **This paper does not rediscover F-2.**

The depot does extend it in one direction P4 could not, and the extension changes what a fix would have to cover, so it is recorded against the open F-2 revision rather than raised as a new finding.

In RefBESS-250MW the absence was contingent. `P-1403` has no firmware today and a retrofit could give it some, so the honest statement about it is a statement about the plant as built. In RefDepot-EMU-12 there are two kinds of absence in one file. `P-2109`'s missing component leg is the contingent kind. But every one of the eight contact line sections has no DEXPI leg, permanently, because section 4.1 shows there is no ISO 15926-4 class for the object [16]. That absence is structural: it is a property of the schema, not of the depot, and no retrofit changes it.

A negative assertion mechanism scoped to "this producer published nothing here" would cover `P-2109` and would misdescribe `ACL-OCL-R05`, where the true statement is that the schema cannot describe the object at all. Option 2 in the F-2 note, a file-level completeness declaration in which the producer states which legs it undertook to publish [24], handles the first cleanly and the second only if a producer can declare a leg inapplicable rather than merely unpublished. That is a small addition to the option already preferred, and it is named here so the P1 revision starts from it rather than meeting it later.

### 6.10 What no single schema, and no pair, returns

The claim is that the three-way join does work none of the parts can do. The honest test is to run Q-1 with legs removed.

| Available | What Q-1 returns | What it misses |
|:---|:---|:---|
| CycloneDX 1.6 alone | `interlock-plc@3.4.0` is firmware in `BOM-RD-SEC` | what it commands, what those objects do, that one is a process object and two are traction objects |
| DEXPI 2.0 alone | a fuel transfer pump, a shutoff valve and a fuelling point on road 5 | that anything electrical exists at the depot at all |
| CPAI alone | eight contact line sections, thirteen switches, fourteen bays with breakers and protection | which switches carry an earth function, what software commands them, and that a fuelling point sits under one section |
| DEXPI plus CycloneDX | that a drive firmware sits inside `P-2402`, and that an interlock controller exists commanding something | every traction object in the query, so the entire safety finding |
| CycloneDX plus CPAI | the two traction objects and the software reaching them | that the third target is a process object, and what that object does |
| DEXPI plus CPAI | the process plant and the traction system as two disconnected graphs | every software fact, and any route from one half to the other |
| All three | the reach set across both halves, the electrical context, the delegated process consequence, the second-order software reach, and the safety character of the finding | the co-location at H11, the switching state, and whether the model matches the depot |

Two rows decide the programme's shape.

**DEXPI plus CycloneDX** is the two-schema bridge as originally proposed [25]. In the battery case that pair returned the headline finding and it was fair to ask whether the third leg was needed [9]. Here it returns nothing whatsoever about the safety question. Every object that matters is a traction object with no DEXPI leg, so a two-schema join sees an interlock controller commanding three references, resolves one of them and shrugs at the other two.

**DEXPI plus CPAI** is the row that is unique to rail. In the battery case that pair returned the plant, the switchgear and the protection scheme, because pump `P-1101A` was one object both schemas could name [9]. Here the pair returns two disconnected graphs with no edge between them. The depot has no object with a leg in both, so the two schemas that describe physical plant have nothing at all to join on.

That is the argument for the third schema stated as a measurement rather than an opinion. It is also the argument for the component leg being load-bearing in a way P1 does not currently say, which is F-R4.

### 6.11 Which hops were declared, delegated or impossible

A reader auditing this traversal should be able to see at a glance which parts rest on an assertion in a file and which do not.

| Hop | Kind | Evidence a reader can check |
|:---|:---|:---|
| H1, H2, H3, H4 | join hop | four fields in a `properties` array or a generic attribute set, quoted in section 5.3 |
| H5 to H8 | CPAI model traversal | associations P2 admits and the document declares, per C-8 [7] |
| H8a | rule application | P1 R-13 direction rule [6] |
| H9 | delegated | the DEXPI file's own piping network system, not the join |
| H10 | join hop | assertions in `BOM-RD-PRO` and `BOM-RD-SEC` |
| H11 | impossible | no leg carries it; F-R3 |
| K5 | impossible | no assertion crosses the split from a plant object; F-R4 |

Nine hops are checkable in a table, one is delegated to a schema, and two cannot be made at all. That distribution is the honest summary of what the three-schema join currently does for a depot.

## 7. Relationship to CLC/TS 50701 and EN 50126

This section states what the join contributes to two rail standards and what it does not. The rule governing it is stated first, because it governs everything after it.

### 7.1 No clause number appears in this section

Both documents are paid standards and the authors do not hold either. What follows is drawn from catalogue records of scope and applicability, which are public, and from this corpus's own prior use of both [26]. A clause-level mapping would need the standard text, and it is named as future work in section 8 rather than approximated.

That restraint is deliberate and it has a specific cause. This corpus found two probably fabricated bibliography entries on the morning this paper was drafted, both carrying precise volume and page numbers. Precision that cannot be checked is worse than no precision, because it reads as evidence. A reader of this section should be able to verify every claim in it from a public catalogue entry in a few minutes, and should treat any clause-level statement about these two standards, from anyone, as unverified until they have the text in front of them.

### 7.2 What CLC/TS 50701 is, and what the join gives it

CLC/TS 50701 is cybersecurity for railway applications. It is a CENELEC Technical Specification giving a consistent approach to identifying, supervising and managing residual risk from cyber threats so that RAMS characteristics are not reduced or compromised by attack. It applies across the Communications, Signalling and Processing, Rolling Stock and Fixed Installations domains, and its security models, concepts and risk assessment process are based on or derived from the IEC 62443 series [17], [23]. It is written to sit inside the railway RAMS lifecycle rather than beside it.

A depot sits in the Fixed Installations domain, and the depot protection interlock of section 5.2 sits at the boundary between Fixed Installations and Signalling and Processing depending on how the depot's protection is engineered. That boundary is a real one for a rail engineer and this paper does not resolve it; the point is that the join is agnostic to it, because it binds objects rather than domains.

**What the join contributes.** A risk assessment needs a system under consideration, an inventory of it, and for anything cyber-physical a statement of what each software item can act on. The third of those is the expensive one to produce by hand and it is what the three legs produce mechanically: which package sits inside which device, which device commands which physical object, and where that object sits electrically. Q-1's output is exactly that input, and it is one an assessor would struggle to assemble from the source documents, because it spans a P&ID, a build system and a network model held by three different teams.

The output has a second property worth naming. Section 6.4 showed the finding inverting a conventional impact ranking: the highest-consequence item in the reach set is the one with the lowest service impact. An assessment driven by availability scoring alone would order those three items exactly backwards, and the join is what makes the other ordering visible without anyone having to already suspect it.

**What the join does not contribute.** It supplies no zone and conduit partition, no threat model, no likelihood, no risk acceptance criteria and no security requirement allocation. Those are the substance of an assessment under this specification and the join produces none of them. Calling a traversal a risk assessment would be the same category error as calling a P&ID a HAZOP: the traversal is an input to the study, and it is a good one, and it is not the study.

### 7.3 An edition correction, carried honestly

The current edition is CLC/TS 50701:2023, superseding the 2021 edition; national adoption records list the 2021 document as withdrawn and the 2023 document as current [17]. This corpus cites the 2021 edition elsewhere [26].

That is a stale designation rather than a wrong argument, correctable by substitution, and it is recorded here in the same spirit as P2's correction of the CGMES designations from Technical Specification to International Standard [7], [11], [12]. Two qualifications belong with it. The CENELEC supersession record itself was not inspected directly, so the correction rests on catalogue entries for national adoptions. And the document remains a Technical Specification in both editions, so nothing about its normative status has changed; only the year has.

### 7.4 What EN 50126 is, and where the join touches it

EN 50126-1 is the railway RAMS specification. It sets out the process for specifying and demonstrating reliability, availability, maintainability and safety over a system lifecycle [18]. The series carries a second part covering the systems approach to safety; its exact title and edition were not verified against the CENELEC catalogue for this paper, so it is named and not cited.

RefDepot-EMU-12 has an ordinary RAM case. Two compressors at 100 percent, two wash supply pumps at 100 percent, two drainage pumps at 100 percent. Each arrangement is bought to survive a single mechanical failure and each rests entirely on the two failures being independent.

**Where the join touches the RAM.** The compressed air plant is the case. Two compressors at 100 percent is an availability argument, and section 5.2 puts both under one package controller, `compressor-ctrl@2.3.1`. A disclosure against that artefact defeats the redundancy in a way no mechanical reliability analysis would predict, because the analysis is done on the mechanical arrangement and the software is assessed separately. That is the common-mode finding P4 made against a 2-out-of-4 pump set [9], reproduced here on a smaller arrangement, and it is the class of result the two-schema bridge already reached. It is included because a rail reader should see that the ordinary case still works, not only the exotic one.

**Where the join touches the S.** Section 6 produced a hazardous condition from a software fact, across a discipline boundary, in a system whose safety argument lives in a different document from its cyber assessment. That is the class of hazard a RAMS process is weakest at reaching, and it is the reason CLC/TS 50701 exists as a companion to the RAMS lifecycle at all.

**What the join is not.** A traversal that starts at a package and ends at a hazardous condition is an input to hazard identification. It is not a safety case. A safety case demands a defined system boundary, a hazard log, apportioned targets, evidence of compliance over a lifecycle and an independent assessment. This paper supplies one traversal against one synthetic depot, run by hand, with no validator behind it. Anyone presenting a three-schema traversal as a safety argument would be overselling it by a wide margin, and section 8 says so again.

### 7.5 Consistency with the corpus's existing use

This corpus already uses CLC/TS 50701 and EN 50126 together, applying railway RAMS methodology to frontier artificial intelligence datacentres [26]. That is a transfer of a rail method into another domain and it is a legitimate one.

This paper uses both standards in their home domain, which is the first time the corpus has done so. Nothing here contradicts the earlier use. The only change is the edition year of section 7.3 and the discipline of section 7.1, which the earlier document should adopt when it is next revised.

## 8. Limitations

Each of the following is something this paper cannot do. They are stated because a reader will find them anyway, and an implementer who meets one after deployment would reasonably conclude the work was oversold.

**The depot is synthetic and nothing here is validated against a real installation.** No parameter came from a specific depot, no operator or vendor named or implied here exists, and every package URL and `mRID` is synthetic [14], [13]. Thirty-five of the fifty parameter rows are modelled. Section 2 represents nothing except itself, and the sourced rows point at standards rather than at a survey of built depots.

**The CIM leg is asserted rather than observed.** The instance counts of section 4.3 were derived from the arrangement of section 2, not read out of a CIM RDF XML file. P2 states that nothing in CPAI has been tested against a real export [7]. This paper supplies a target for that test rather than the test.

**Whether any real depot operator produces a CIM export at all is untested, and it is the assumption most likely to be wrong.** IEC 61970-301 is an energy management system application program interface [5], and a depot's traction power is commonly modelled in a traction power simulation tool, in an electrical control system, or in a design consultant's drawings, rather than in an EMS model whose scope is the transmission or distribution network. The programme has assumed a CPAI document could be produced for depot traction power and nobody has asked an infrastructure manager whether one exists. If the answer is no, the third leg of this case is producible only by building it, which changes its cost and its adoption path, though not its correctness. This is a question a rail reviewer could answer in one conversation and it would be worth more than any further modelling in this document.

**The isolation interlock is modelled from general practice, not from a specific design.** EN 50488:2021 establishes that dead working on a contact line system is a defined regime with electrical protective measures [21], and EN 50122-1:2022 governs earthing and the return circuit [20]. Neither was read for this paper beyond its published scope. Which sections carry an earth function, what the permissive logic is, whether it is single or dual channel, how it relates to a work permit, and whether a trapped key scheme sits in series with it are all modelled. A real depot protection scheme is a signalling and electrical control design, assessed as one, and would look different from the one in section 4.1 in ways this paper cannot predict.

**CA-1 is where the whole finding sits and it is a modelled single-channel assumption.** Section 6.5 states it three ways and a reader should attack it first. If the depot's isolation is protected by anything the software cannot defeat, Q-1's safety character falls away and what remains is an availability finding.

**The CLC/TS 50701 relationship is described at the level of intent, not clause conformance.** Section 7.1 states this and the reason for it. Nothing in this paper is a conformance claim against either rail standard, and the edition correction of section 7.3 rests on catalogue entries for national adoptions rather than on the CENELEC supersession record.

**The traversal was run by hand because no validator exists.** P3 defines the test vectors, round trips and reference implementation, and states that until it is implemented every requirement in the programme is a proposal [8]. Nothing checked this traversal except its author reading three legs against two sets of rules. Every hop is written out so a reader can repeat it, which substitutes for a validator and is not one.

**F-R1's class gap was reasoned, not confirmed against the UML.** CPAI does not name an earthing or isolating device class. Whether IEC 61970-301 carries one under a name this paper could have used was not established, for the same reason P2 deferred `Feeder`: the published UML is a paid standard the authors do not hold [7]. Naming a class this paper could not verify would be the exact error the corpus is trying to stop making, so the requirement is named and the class is not.

**F-R2 and F-R4 are arguments about a specification, reached by reasoning rather than by watching an implementation fail.** So is F-2, and P4 said the same about it [9]. Until P3's reference implementation exists there is no consumer to watch get it wrong. That is a real weakness in all three and it is not one an applied paper can fix.

**Nothing here was tested outside 25 kV AC.** A direct current depot at 750 V third rail puts a conductor rail and its ramps where this paper puts a contact wire, and its isolation and earthing arrangements differ in kind rather than in degree. The claim that the schema boundary falls in the same place there is made and not tested. A light rail or metro depot would be the sharper test, because its traction system is further from anything an energy management system models.

**The traction return is modelled nowhere.** Section 4.6 records it. A depot's earthing and bonding scheme is a safety system governed by EN 50122-1 [20], and this twin does not contain it in any leg. Any argument about touch voltage, rail potential or stray current is outside everything this paper can compute.

**Much of a real depot is on none of the three schemas.** The lifting jacks, the roof access platforms, the wheel lathe, the shunting movements and the road itself are among the depot's defining machinery and its defining hazards. CycloneDX names their firmware, DEXPI names none of them because they are not process plant, and CPAI names them only as electrical loads where they have a motor. A three-schema twin of a depot covers the systems of section 3 and section 4 and leaves the workshop floor uncovered. F-R3 is one instance of that larger gap and not the whole of it.

**A traversal correct over the model says nothing about whether the model matches the depot.** P1 states this first among its own limitations and it is the one that most limits this paper [6]. Whether `PID-RD-AIR-201` rev B describes what was built, whether `3.4.0` is executing in the interlock cabinet, and whether the CPAI export predates a sectioning change are site verification questions, none answerable inside any of the three standards. A join over a stale drawing produces confident, precise and wrong answers just as fluently as this traversal produced its own, and in a depot the wrong answer is about whether a section is safe to work under.

**All three legs rest on extension mechanisms not yet confirmed.** P1 assumes the DEXPI Profile can license an added attribute set and records the competing reading, and the CycloneDX `assetjoin` namespace is provisional until registration completes [6]. P2 has no machine-readable form and no CIM validator has been shown to tolerate its foreign properties [7]. A query run against files no tool will accept is a query run against a proposal.

## 9. References

1. **Creative Commons.** *Attribution 4.0 International (CC BY 4.0) Legal Code.* Creative Commons Corporation, 2013.
2. **DEXPI e.V.** *DEXPI 2.0 Specification.* Released 10 October 2025, published on GitLab under the Creative Commons Attribution 4.0 International licence. Unifies the DEXPI P&ID Specification 1.4 and the DEXPI Process Specification 1.0 and introduces DEXPI XML as the serialization for P&IDs, PFDs and BFDs.
3. **OWASP Foundation and Ecma International.** *CycloneDX Bill of Materials Specification.* ECMA-424, 1st edition, June 2024, defining CycloneDX 1.6. Ecma International Technical Committee 54, Geneva.
4. **Ecma International.** *Package URL (purl) Specification.* ECMA-427, 1st edition, December 2025. Ecma International Technical Committee 54, Geneva.
5. **International Electrotechnical Commission.** *IEC 61970-301: Energy management system application program interface (EMS-API), Part 301: Common information model (CIM) base.* International Standard.
6. **McKenney, J.** *The Three-Identity Join: DEXPI 2.0, CycloneDX 1.6 and IEC 61970 CIM.* P1 of the three-schema programme, defining requirements R-1 to R-35, Eigenia working group WG-05-CAD, 2026.
7. **McKenney, J.** *CIM Profile for Cyber-Physical Asset Identity (CPAI).* P2 of the three-schema programme, defining requirements C-1 to C-10 and completeness levels L0 to L4, Eigenia working group WG-05-CAD, 2026.
8. **McKenney, J.** *Conformance Suite and Reference Implementation.* P3 of the three-schema programme, Eigenia working group WG-05-CAD, 2026.
9. **McKenney, J.** *Energy: RefBESS-250MW.* P4 of the three-schema programme, raising findings F-1 to F-3, Eigenia working group WG-05-CAD, 2026. Source of the F-1 multi-instance encoding rule, of F-2, and of the direction-check discipline this paper follows.
10. **McKenney, J.** *RefBESS-250MW: A Synthetic Reference Architecture for the Three-Schema Join.* Eigenia working group WG-05-CAD, 2026. Cited for its parameter conventions, its sourced-to-modelled ratio and its two-leg counter-example `P-1403`.
11. **International Electrotechnical Commission.** *IEC 61970-600-1:2021: Energy management system application program interface (EMS-API), Part 600-1: Common Grid Model Exchange Standard (CGMES), Structure and rules.* International Standard, edition 1.0, 4 June 2021, cancelling and replacing IEC TS 61970-600-1:2017.
12. **International Electrotechnical Commission.** *IEC 61970-600-2:2021: Energy management system application program interface (EMS-API), Part 600-2: Common Grid Model Exchange Standard (CGMES), Exchange profiles specification.* International Standard, edition 1.0, 4 June 2021, cancelling and replacing IEC TS 61970-600-2:2017.
13. **Davis, K., Peabody, B., and Leach, P.** *Universally Unique IDentifiers (UUIDs).* RFC 9562, Internet Engineering Task Force, May 2024. Fixes the form of the asset references and `mRID` values quoted here.
14. **Eastlake, D. and Panitz, A.** *Reserved Top Level DNS Names.* RFC 2606, BCP 32, Internet Engineering Task Force, June 1999. Reserves `example.org` for documentation use.
15. **Cheikes, B. A., Waltermire, D., and Scarfone, K.** *Common Platform Enumeration: Naming Specification Version 2.3.* NISTIR 7695, NIST, August 2011.
16. **International Organization for Standardization.** *ISO 15926-4: Integration of life-cycle data for process plants including oil and gas production facilities, Part 4: Initial reference data.* International Standard. Cited for the scope of the reference data library the DEXPI leg depends on, which is the basis of the argument in section 1.1.
17. **European Committee for Electrotechnical Standardization (CENELEC).** *CLC/TS 50701:2023: Railway applications, Cybersecurity.* Technical Specification, superseding CLC/TS 50701:2021. Gives a consistent approach to identifying, supervising and managing residual risk from cyber threats across the Communications, Signalling and Processing, Rolling Stock and Fixed Installations domains, with security models, concepts and risk assessment derived from the IEC 62443 series, positioned within the RAMS lifecycle of EN 50126-1. Cited for scope and applicability only, from catalogue records of national adoptions; no clause of the standard text was read for this paper. https://standards.iteh.ai/catalog/standards/clc/db257ea9-8ba0-4f4c-a791-df34a6030541/clc-ts-50701-2023 (accessed 7 September 2026).
18. **European Committee for Electrotechnical Standardization (CENELEC).** *EN 50126-1:2017: Railway applications, The specification and demonstration of Reliability, Availability, Maintainability and Safety (RAMS), Part 1: Generic RAMS process.* European Standard. Cited for scope only; no clause was read for this paper.
19. **European Committee for Electrotechnical Standardization (CENELEC).** *EN 50119:2020: Railway applications, Fixed installations, Electric traction overhead contact lines.* European Standard, published 9 April 2020. Applies to new installations and complete renewal of overhead contact lines on heavy railways, light railways, trolleybuses and industrial railways. https://standards.iteh.ai/catalog/standards/clc/beb0220e-abe4-48ec-b89d-3ce50243bcbe/en-50119-2020 (accessed 7 September 2026).
20. **European Committee for Electrotechnical Standardization (CENELEC).** *EN 50122-1:2022: Railway applications, Fixed installations, Electrical safety, earthing and the return circuit, Part 1: Protective provisions against electric shock.* European Standard, with amendment A1:2025. Defines protective provisions against electric shock for fixed installations associated with alternating current and direct current traction systems, covering electrical safety, earthing and the return circuit. https://standards.iteh.ai/catalog/standards/clc/e72bea49-04da-4bb3-b650-807dd45fb650/en-50122-1-2022 (accessed 7 September 2026).
21. **European Committee for Electrotechnical Standardization (CENELEC).** *EN 50488:2021: Railway applications, Fixed installations, Electrical protective measures for working on or near an overhead contact line system and/or its associated return circuit.* European Standard. Provides requirements for electrical safety for dead working on an overhead contact line system and for work near a live one, for nominal voltages including 1.5 kV and 3 kV direct current and 15 kV, 2x15 kV, 25 kV and 2x25 kV alternating current. Cited for scope and applicability only; no clause was read. https://standards.iteh.ai/catalog/standards/clc/4d818df8-d89b-4918-ab20-ce462d92cac7/en-50488-2021 (accessed 7 September 2026).
22. **European Committee for Electrotechnical Standardization (CENELEC).** *EN 50163: Railway applications, Supply voltages of traction systems.* European Standard. Cited as the standard fixing nominal traction supply voltages and their permitted ranges. No specific voltage limit value is quoted from it in this paper, because the values were not verified against the standard text.
23. **International Electrotechnical Commission.** *IEC 62443-3-3:2013: Industrial communication networks, Network and system security, Part 3-3: System security requirements and security levels.* First edition, August 2013.
24. **McKenney, J.** *F-2: P1 cannot express absence, and P2 requires the distinction.* Eigenia working group WG-05-CAD internal working note, 7 September 2026. Records F-2 as a confirmed specification defect, open against a P1 revision, with three candidate fixes and no decision taken. Section 6.9 of this paper adds a condition to the preferred option rather than reopening the finding.
25. **McKenney, J.** *The Unified DEXPI 2.0 and CycloneDX 1.6 Semantic Bridge.* Eigenia working group WG-05-CAD, 2026. Defines the multigraph blast radius formulation and the actuarial consequence function over two schemas, and is the two-schema proposal section 1 describes.
26. **McKenney, J.** *Frontier AI Hardware Security.* Eigenia working group WG-05-CAD, 2026. Cited as the corpus's existing joint use of CLC/TS 50701 and EN 50126 outside their home domain, and as the location of the stale 2021 edition designation noted in section 7.3.
27. **International Electrotechnical Commission.** *IEC 61850: Communication networks and systems for power utility automation.* Series title, all parts. Cited for the distinction P2 draws between a communications standard and an information model.
