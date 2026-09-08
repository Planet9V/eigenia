| Field | Value |
|:---|:---|
| Designation | P5, second applied paper of the three-schema programme, the CIM-thin case |
| Status | Draft for submission |
| Normative language | None. P1 owns R-nn, P2 owns C-nn, P3 owns V-nn. This document raises findings F-4 to F-7, continuing P4 |
| Licence | Creative Commons Attribution 4.0 International (CC BY 4.0) [1] |
| Computes against | RefPharma-API-1, specified inline in section 2 |
| Rule on every number | Sourced to a named publication, derived by arithmetic from a row of section 2, or labelled modelled with the assumption stated inline |

## 1. Scope, and why this case is deliberately CIM-thin

P4 ran the three-identity join on RefBESS-250MW, a grid-scale battery site whose CIM leg reaches CPAI completeness level L4 and whose other two legs are substantial [2], [9]. That paper answered a question no single schema answers and reported three findings. It also proved less than it looks, because every leg it needed was rich.

A join that only works when every leg is rich is not a general mechanism. It is a demonstration. P1 section 7.1 says so in its own words and names a weak-leg case as the test [6]. P2 builds the degradation contract that test is supposed to exercise: five cumulative completeness levels L0 to L4, a rule that the level is declared rather than inferred, a rule that refusing a thin leg is non-conformant, and a rule that a missing class is not a negative fact [7]. None of those three rules has ever met an asset that would strain it.

This paper supplies the asset and runs the test. RefPharma-API-1 is a multi-purpose active pharmaceutical ingredient plant. Its DEXPI leg is the strongest in the programme, because reactors, condensers, heat exchangers, pumps, agitators, filter dryers, control valves and instrument loops are precisely the object set DEXPI 2.0 was built to describe [3]. Its CycloneDX leg is real, because a modern batch plant runs a distributed control system, a safety instrumented system, a process historian and a manufacturing execution system integration, all of which have bills of materials [4]. Its CIM leg is thin by construction, because a pharmaceutical manufacturer takes supply at one metered connection and does not model its internal electrical network in IEC 61970-301 [5]. There is no feeder chain to export, no protection inventory in CIM form, and in the ordinary case no CIM export at all.

The contribution is a negative result reported honestly. Section 6 runs two queries. One completes and the thin leg costs it nothing. The other is answerable at RefBESS-250MW and is not answerable here; section 6.6 shows the traversal stopping, and section 6.8 states exactly what is missing and what a reader would have to obtain to complete it. That second query is the more valuable of the two, and section 6.7 states the result both queries share: on this asset the third leg contributes nothing to either.

### 1.1 What this paper does not do

**It does not generalise the blast radius formulation.** The two-schema bridge defines a directed multigraph over plant and cyber nodes, with a shortest-path distance bounded by depth, a product of coupling weights along the path, and an impact threshold [21]. Generalising that to three ontologies is a later paper's subject. This paper traverses by hand, states every hop, and assigns no numeric coupling weight at all.

**It does not define new normative content.** P1's five relations and P2's requirements and completeness levels are used as published. Where the traversal met something those rules do not settle, it is recorded as a finding against the paper owning the rule, not patched here.

**It does not validate anything against a real installation.** RefPharma-API-1 is synthetic and says so on every row. No operator, site, vendor, package URL or master resource identifier here exists or resolves. Section 7 treats the consequences.

**It does not restate ICH Q7 or any regulatory text.** The GMP framing in section 6 is used because it makes the join's question sharper at a pharmaceutical plant than at a battery site, and it is used at the level of a requirement in kind. No clause number is quoted, because none was verified against the guideline text.

### 1.2 Naming and identifier rules

Every vendor namespace below is prefixed `example-`, every registry host sits under `example.org`, and both are reserved for documentation and unregistrable [11]. Asset references and master resource identifiers are UUIDs in the form RFC 9562 defines [13] and are synthetic; none was drawn from any real model. Advisory identifiers carry a `SYN-` prefix so they cannot be mistaken for a CVE, and no real advisory is attached to a package that does not exist.

This paper names an object by its published identifier where section 2 or section 3 gives one, and by its role where none does. It mints asset references only for the objects the worked encodings of section 6.2 require, and labels them synthetic at the point of use.

## 2. RefPharma-API-1, specified

RefBESS-250MW carries its own specification document because several papers compute against it [2]. RefPharma-API-1 does not need one, because one paper uses it. It is specified here, under the same rule: every row states whether its value was taken from a published source or chosen by the author.

### 2.1 Site parameters

| Parameter | Value | Basis |
|:---|:---|:---|
| Designation | RefPharma-API-1 | Modelled. Synthetic, formed to sit alongside RefBESS-250MW [2] |
| Site class | Multi-purpose active pharmaceutical ingredient plant, batch operation | Modelled |
| Product | One synthetic small-molecule API, non-sterile, supplied to downstream formulation | Modelled |
| Manufacturing mode | Campaign batch across three parallel reaction trains | Modelled |
| Reaction trains | 3 | Modelled |
| Primary reactor volume per train | 6.3 m3, glass-lined, jacketed, top-entry agitator | Modelled. Chosen by the author, not taken from a vendor range or a survey of built plant |
| Nominal batch cycle time | 38 h charge to discharge | Modelled |
| Campaigns per year | 6 | Modelled |
| GMP guide applied | ICH Q7 | Sourced. Good manufacturing practice guide for active pharmaceutical ingredients [14] |
| Change control regime | Any change to a validated system is a controlled change, assessed and approved before implementation | Sourced in kind. ICH Q7 requires a formal change control system [14]. No clause number was verified, so the requirement is stated and not cited to a clause |
| Computerised system framework | ISPE GAMP 5, second edition | Sourced. Risk-based approach to compliant GxP computerised systems [15] |
| Electronic records requirement | 21 CFR Part 11 | Sourced. Electronic records and electronic signatures [16] |
| Hazardous area classification basis | IEC 60079-10-1 | Sourced. Classification of areas, explosive gas atmospheres [17] |
| Area classification assigned | Zone 1 inside the reactor bunds, Zone 2 elsewhere in the solvent hall | Modelled. Assigned by the author, not the output of a classification study |
| Control system security standard | IEC 62443-3-3 | Sourced. System security requirements and security levels [18] |
| Target security level, GMP process control zone | SL-T 2 | Modelled |
| Site electrical supply | One 10 kV metered connection from the local distribution network operator | Modelled |
| Site maximum demand | 4.2 MW | Modelled |
| Internal distribution | 10 kV to 400 V, two 3.15 MVA site transformers, six motor control centres | Modelled |
| Protected outgoing ways across the six motor control centres | 58 | Modelled |
| Standby generation | 1.6 MW diesel, GMP-critical loads only | Modelled |
| Internal electrical network held in CIM form | None | Modelled. The case's defining property; section 2.2 gives the reason |
| Process schema | DEXPI 2.0 | Sourced. Released 10 October 2025 [3] |
| Process semantics | ISO 15926-4 reference data library | Sourced [10] |
| Component schema | CycloneDX 1.6, standardised as ECMA-424 | Sourced [4] |
| Component identity syntax | Package URL, standardised as ECMA-427 | Sourced [12] |
| Electrical schema | IEC 61970-301 Common Information Model, profiled as CPAI | Sourced [5], [7] |
| CPAI completeness level declared | L1 | Modelled. Section 5.2 derives it |
| Model authority set | `https://example.org/mas/example-dso-region-4` | Modelled. Reserved documentation domain [11] |
| Tagged objects in the DEXPI leg | 204 | Modelled. The count column of section 3.1 sums to this |
| Bills of materials | 6 | Modelled |
| As-built basis, three legs | `PID-RP-REAC-201 rev F 2026-05-22`; `BUILD-RP-2026-0714 2026-07-14`; `DSO-CONN-2026-0119 2026-01-19` | Modelled. Three dates on purpose; section 2.3 works out what the divergence costs |

Eleven of the thirty-one rows are sourced and twenty are modelled. That ratio is worse than RefBESS-250MW's thirteen of thirty-two [2], and the reason is instructive. A battery site's parameters sit in published standards and public deployment data. An API plant's reactor volume, cycle time and campaign count are commercial facts of a particular product, and there is nothing to source them to that would not be a specific manufacturer's plant. A reader should read the modelled rows as a consistent arrangement rather than as a representative one.

### 2.2 Why the electrical leg is thin, stated as a design decision

The thin leg is not an oversight in the specification. It is what a pharmaceutical manufacturer's electrical estate looks like from a schema's point of view, and three reasons hold it there.

**The operator is not a party to any grid model exchange.** CGMES exists so transmission system operators can exchange grid models for capacity calculation and system operation, and it is standardised as IEC 61970-600-1:2021 and IEC 61970-600-2:2021 [19]. A manufacturer connected at 10 kV is a load in someone else's model and produces no model of its own. Nothing has ever obliged it to hold one, and no counterparty has ever asked it for one.

**The internal network is documented, in a form nothing can traverse.** The site holds a low voltage single line diagram for its six motor control centres, a motor schedule mapping each equipment tag to an outgoing way, and relay setting records. Every fact the CIM leg would carry exists on the site today. It exists as CAD drawings and spreadsheets, and no consumer can walk them. This is the finding section 6.8 lands on, and it is worth stating early: the leg is thin because the information was never expressed in a traversable schema, not because it was never collected.

**The internal network is not the interesting boundary to the operator.** A battery site's reason for existing is electrical, so its operator models electricity. An API plant's reason for existing is a chemical conversion under a validated procedure, so its operator models process. The schema each operator invests in follows the discipline that pays it, which is the general reason legs are uneven across a corpus and the reason a degradation contract has to exist at all.

### 2.3 The as-built basis set, and which leg it exposes

P1 R-8 requires each leg to state the document revision its binding was drawn from, and treats a divergent basis set as legitimate and conformant rather than an error to be tidied away [6]. RefBESS-250MW carries a seventeen-day span across its three legs and P4 works out which leg that exposes [2], [9]. This site's span is far wider and it lands differently, which is worth showing rather than asserting.

| Leg | As-built basis | Date | Age relative to the newest basis |
|:---|:---|:---|:---|
| Process, DEXPI 2.0 | `PID-RP-REAC-201 rev F` | 2026-05-22 | 53 days |
| Component, CycloneDX 1.6 | `BUILD-RP-2026-0714` | 2026-07-14 | 0 days, the newest |
| Electrical, CPAI | `DSO-CONN-2026-0119` | 2026-01-19 | 176 days |

The electrical basis is 123 days older than the process basis and 176 days older than the component basis, which is arithmetic on the three dates above. At RefBESS-250MW that ordering would be alarming, because the CIM leg there is a network model export and a network model export goes stale when switchgear changes [2].

Here it is close to harmless, and the reason is a property of thin legs the programme has not previously stated. `DSO-CONN-2026-0119` is a connection document, and the only fact the CIM leg draws from it is the identity of the site's metered connection in one network operator's model. That fact changes when the connection changes, which is a decade-scale event. A leg carrying one boundary identifier has almost nothing in it that can go stale.

**The thinner the leg, the less its staleness matters, because there is less in it that can change.** That is a small consolation and it cuts the other way too: the same property means the leg cannot go stale usefully either. It carries no claim precise enough to be falsified by a switchgear change, which is exactly why section 6.6 cannot use it.

The exposed leg here is the component leg, as it was at RefBESS-250MW and for the same reason: a `purl` changes on every upgrade [6], [12], so a build basis of 14 July states what the build system produced that day and does not establish that `8.1.2` is executing on the controllers now. Section 6 states its component-leg findings as of a basis set rather than as of a date.

## 3. The DEXPI model of the reaction and isolation trains

This is DEXPI's home ground. RefBESS-250MW had to argue its way into a DEXPI leg by way of a thermal plant, because a battery is not a process unit and the coolant loop is the only part of that site a P&ID describes [2]. No such argument is needed here. An API plant is a P&ID from the pipe rack down.

The architecture is three parallel reaction trains sharing a solvent tank farm, a vent header and a pair of agitated filter dryers. Each train is a glass-lined jacketed reactor with a top-entry agitator, an overhead condenser and receiver, a packaged temperature control unit serving the jacket through a three-way control valve, metered reagent charge pumps, and slurry transfer to the isolation area.

### 3.1 Tagged objects

Two hundred and four objects carry a `TagName`. The tag block is modelled site convention: 21xx reaction, 22xx solvent, overheads and inventory, 23xx isolation and drying, 24xx jacket and utility circuits, with instrument and safety series inside those blocks.

| TagName range | Class, described | Function | Count |
|:---|:---|:---|:---|
| `R-2101` to `R-2103` | jacketed agitated reactor, glass-lined | primary reaction and crystallisation | 3 |
| `AG-2101` to `AG-2103` | top-entry agitator | reaction mass mixing | 3 |
| `TCU-2401` to `TCU-2403` | packaged temperature control unit | jacket heating and cooling | 3 |
| `HX-2411` to `HX-2416` | shell and tube heat exchanger | jacket circuit and condenser duty | 6 |
| `CD-2201` to `CD-2203` | overhead condenser | solvent vapour condensing | 3 |
| `RV-2211` to `RV-2213` | receiver vessel | distillate collection | 3 |
| `P-2141` to `P-2146` | centrifugal pump | slurry and solvent transfer | 6 |
| `P-2151` to `P-2154` | positive displacement pump | metered reagent charge | 4 |
| `CF-2301` to `CF-2302` | agitated filter dryer | isolation and drying | 2 |
| `AG-2301` to `AG-2302` | filter dryer agitator arm drive | cake agitation and discharge | 2 |
| `TK-2221` to `TK-2228` | atmospheric storage tank | bulk solvent inventory | 8 |
| `XV-2121` to `XV-2148` | isolation valve | charge, transfer and drain isolation | 28 |
| `TCV-2101` to `TCV-2103` | three-way control valve | reactor jacket temperature control | 3 |
| `PCV-2201` to `PCV-2206` | pressure control valve | reactor headspace and vent header | 6 |
| `PSV-2131` to `PSV-2142` | pressure safety valve | vessel overpressure relief | 12 |
| `TT-2101` to `TT-2136` | temperature transmitter | reaction mass, jacket and condenser | 36 |
| `PT-2201` to `PT-2218` | pressure transmitter | reactor and vent header | 18 |
| `LT-2221` to `LT-2236` | level transmitter | vessels and tanks | 16 |
| `FT-2241` to `FT-2258` | flow transmitter | charge and transfer metering | 18 |
| `AT-2261` to `AT-2266` | conductivity and pH analyser | in-process check | 6 |
| `GD-2271` to `GD-2282` | flammable gas detector | solvent hall leak detection | 12 |
| `SV-2291` to `SV-2296` | solenoid valve | safety interlock actuation | 6 |

P1 R-18 requires the ISO 15926-4 class to travel with the tag, because a tag alone is scoped to one plant and one discipline [6], [10]. The Class column above is descriptive rather than a resolved reference data library identifier, the same defect RefBESS-250MW records against itself and for the same reason: the authors do not hold the library [2]. Section 7 records it as a defect in this document rather than in the approach.

### 3.2 Why this is the strongest DEXPI leg in the programme

Three properties of the model matter for section 6, and each is stronger here than at RefBESS-250MW.

**Every object in the reach set is a genuine P&ID object.** A three-way control valve on a reactor jacket, a top-entry agitator on a glass-lined vessel and a slurry transfer pump are the classes ISO 15926-4 exists to name [10]. The battery site reached its DEXPI leg through an auxiliary system supporting the plant's real purpose. This site reaches it through the plant itself, so nothing in section 6 depends on an analogy.

**The relation vocabulary separates instruments from actuators at scale.** Ninety-four transmitters and analysers carry `monitors` against thirty-seven valves and drives carrying `controls`, which is arithmetic on the count column of section 3.1. P1 R-13 forbids traversing one as the other [6], and at ninety-four to thirty-seven the distinction is not a detail; it is most of the instrument set.

**The attachment rule earns its keep on a revision-heavy drawing.** P1 R-17 attaches the binding to the object carrying the `TagName` and never to a symbol on `PID-RP-REAC-201` [6]. A plant on revision F of its reaction P&ID has redrawn that sheet five times. A join bound to a graphic would have broken five times, and on a plant where drawing revision is itself a controlled activity each break would have been a documented deviation.

### 3.3 Relation assignment across the site

P1 permits five relations and forbids inventing a sixth [6]. Stating the assignment once, at site level, keeps section 6 from appearing to choose a relation to suit a query.

| Leg and object class | Relation carried | Toward |
|:---|:---|:---|
| DEXPI equipment object, reactor, pump, exchanger, tank, dryer | `identity` | its own asset reference |
| DEXPI instrument object, transmitter or analyser | `monitors` | the asset it observes |
| DEXPI control valve or agitator drive | `controls` | the asset whose state it moves |
| DEXPI piping segment feeding a reactor jacket | `supplies` | the reactor asset reference |
| CycloneDX firmware inside a field device | `partOf` | the device asset reference |
| CycloneDX batch controller | `controls` | the six commanded asset references of section 6.2 |
| CycloneDX safety logic solver | `controls` | the interlocked asset references |
| CycloneDX historian and gateway images | `monitors` | the asset references they read |
| CPAI `EnergyConsumer` at the site intake | `supplies` | the twelve GMP-critical asset references |

Nine assignments drawn from the five relations P1 permits, none invented. What is absent from the table is as informative as what is in it. RefBESS-250MW's equivalent carries two further rows, a CPAI `ACLineSegment` or `Breaker` carrying `supplies` toward a load and a CPAI `ProtectionEquipment` carrying `controls` toward the switch it operates [2]. Neither row exists here, because neither class exists in this site's CIM leg. Those two missing rows are precisely what section 6.6 discovers it needs and cannot get.

## 4. The CycloneDX bills of materials

The site carries six CycloneDX 1.6 documents, one per deliverable unit, each produced by the build system that assembles it. There is no merged site bill of materials, for the reason P1 gives for having no central join registry: a merge reintroduces a single authority and hides which build system vouched for which claim [6].

| Bill of materials | Deliverable unit | Representative component identity | Component type |
|:---|:---|:---|:---|
| BOM-RP-DCS | Distributed control system | `pkg:generic/example-automation/batch-controller@8.1.2` | firmware, redundant process controller pair |
| BOM-RP-DCS | Distributed control system | `pkg:generic/example-automation/io-module@2.4.1` | firmware, input and output module |
| BOM-RP-SIS | Safety instrumented system | `pkg:generic/example-safety/sis-logic@4.0.7` | firmware, safety logic solver |
| BOM-RP-FLD | Field instruments and drives | `pkg:generic/example-instruments/tx-hart@3.2.0` | firmware, transmitter |
| BOM-RP-FLD | Field instruments and drives | `pkg:generic/example-drives/vsd-firmware@6.5.0` | firmware, agitator variable speed drive |
| BOM-RP-HST | Process historian | `pkg:oci/historian@sha256:9d41c07b5a2e4f8836b0d1e75c3a9f24608b7e1a35d92c4f0ae67b3d81c5920f?repository_url=registry.example.org/example-historian&tag=12.4.0` | container image, historian server |
| BOM-RP-HST | Process historian | `pkg:pypi/pymodbus@3.6.9` | library, inside the historian image |
| BOM-RP-MES | Manufacturing execution system integration | `pkg:oci/mes-gateway@sha256:41b8e6cf0d29a7534e1c8f6b2a90d7e35c48f10b96d2a7e40c53f89b1ad6720e?repository_url=registry.example.org/example-mes&tag=5.2.1` | container image, integration gateway |
| BOM-RP-ELE | Electrical protection and motor control | `pkg:generic/example-protection/mcc-relay@2.3.4` | firmware, motor protection relay, 58 devices |
| BOM-RP-ELE | Electrical protection and motor control | `cpe:2.3:h:example_switchgear:mcc_module:2b:*:*:*:*:*:*:*` | hardware, no package coordinate applies [20] |

Two properties of this leg drive what section 6 can do with it.

**A real library sits inside a synthetic product.** `pkg:pypi/pymodbus@3.6.9` is a real package name and the container digests around it are not. That is the honest shape of a plant bill of materials, where a vendor product no schema knows is built from open source everyone knows. It also fixes the limit of what a synthetic corpus can demonstrate: a scanner run against this document would resolve one coordinate out of ten.

**Not every component has a package URL.** The switchgear module is hardware and carries a CPE instead [20]. That is not an edge case at this site; the reactors, the filter dryers and every vessel sit in the same category, and a bill of materials reporting only what has a package coordinate reports the software and calls it the asset.

`BOM-RP-ELE` is the entry that makes section 6.6 sharp rather than empty. The plant's own protection relays run firmware, and that firmware is in a bill of materials. The software the electrical leg would have pointed at is present in the corpus. What is absent is the means to say which of the fifty-eight instances protects any given motor, and section 6.6 shows the traversal failing on exactly that.

### 4.1 An object carrying more than one assertion has no encoding

P4 found that a package installed on N devices must appear as N component objects, because a CycloneDX `properties` array is a flat list and four repeated `assetjoin:ref` values give a consumer no rule for pairing them with four repeated `assetjoin:relation` values [9]. That finding fixed the component count of a bill of materials as a device count rather than an artefact count. It did not go far enough, and this asset shows where it stops.

The batch controller pair commands the jacket temperature control valve and the agitator on each of the three trains. Each controller device is therefore `partOf` its own controller asset reference and carries `controls` toward six further asset references: seven assertions on one device. P1 R-3 permits exactly one asset reference, one relation, one authority and one basis per assertion [6]. P1 R-21 places the assertion in the `properties` array of the component object it applies to. Seven assertions therefore need seven groupings, and the array offers none.

P4's workaround does not generalise, in two directions.

It does not generalise within CycloneDX. Splitting one device into seven component objects is legal, because `bom-ref` is document-local and unique while `purl` need not be unique within a document [4], but the seven objects then represent one device under seven relations, so a component count is no longer a device count and P4's F-1 is contradicted by the fix P4 proposed.

It does not generalise across legs. P2 C-3 attaches the join fields as properties to a CIM instance in the model graph [7], flat, with the same pairing ambiguity. A producer cannot mint a second CIM instance of one physical breaker to carry a second assertion, because that would mean minting a second `mRID`, and C-4 requires the recorded `mRID` to equal the source model's value byte for byte [7]. The DEXPI generic attribute set has the same shape and the same problem, and R-11 forbids re-minting an identifier belonging to another identity system [6]. So the CycloneDX trick has no counterpart in either of the other two legs.

> **F-4.** P1's join assertion is four flat fields attached to an object, with no grouping construct, so an object carrying more than one assertion has no encoding in any leg. RefBESS-250MW's site controller carrying `controls` toward ten block asset references [2] and this site's intake carrying `supplies` toward twelve loads are both stated in prose in a reference architecture, and neither has a legal serialization. P4's F-1 found the CycloneDX half of this and fixed it by duplicating component objects, which contradicts its own device-count result and does not port to CIM, where C-4 forbids a second `mRID`. The fix is a grouping construct: an assertion with its own local identifier carrying the four fields, and an object referencing N of them. That changes P1 section 4.1's form. It touches neither the relation vocabulary nor any leg's extension mechanism, so it costs nothing already argued for.

This paper adopts the duplication workaround for the CycloneDX leg so section 6 can run, and states it here rather than letting it pass as settled. Section 7 records that H1's count of fourteen component objects is an artefact of the defect rather than a property of the site.

## 5. The CIM leg, and what it does not contain

### 5.1 The CPAI document in full

Reproducing the CPAI document in full is short enough to do, which is itself the point of the section.

```
cim:EnergyConsumer
  cim:IdentifiedObject.mRID      "b7e4a1d9-53c8-4a06-9f21-6c4e08b3d572"
  cim:IdentifiedObject.name      "EC-RP-SITE"
  join:assetReference            "2c9f70b4-118e-4d3a-8b56-e0a4c7f91d63"
  join:relation                  "supplies"
  join:authority                 "https://example.org/authority/refpharma-plant"
  join:basis                     "DSO-CONN-2026-0119 2026-01-19"
  join:modelAuthoritySet         "https://example.org/mas/example-dso-region-4"
```

One instance. One class. Eleven further `supplies` assertions toward the other GMP-critical equipment asset references, which under F-4 have no legal encoding on this instance and are carried here as a modelled convention.

Three things are true about that document and worth separating, because they are separately contestable.

**It was not produced from a CIM export.** The operator holds no CGMES file and no CIM RDF XML. The `mRID` and the model authority set were obtained from the distribution network operator on request and transcribed into a document the operator wrote. That is a modelled construction, and section 7 records that whether a network operator would supply the value, and whether a pharmaceutical operator would ask for it, is untested.

**The asserting authority is the plant, not the network.** At RefBESS-250MW the CPAI leg's authority is the network model authority, because the site owns a network model [2]. Here the plant asserts a binding to an identifier it did not mint, inside a model it does not hold and cannot inspect. P1 R-7 requires the asserting authority to be stated as an absolute URI and nothing more [6], so this is conformant. It is also a materially weaker claim than RefBESS-250MW's, and a consumer reading only the four fields cannot tell the difference between a binding asserted by the party that owns the model and one asserted by a party quoting it second hand. That is a general property of R-7 rather than a defect in this document, and it is worth a reviewer's attention.

**It binds at the site boundary, not at any asset.** `EC-RP-SITE` denotes the plant as a load in someone else's model. Not one of the two hundred and four tagged objects of section 3.1 has a CIM counterpart, so no join assertion in this leg names anything smaller than the whole site.

### 5.2 The completeness level reached, and why it is L1

P2 defines five cumulative levels and requires the producer to declare the one it reaches rather than let a consumer infer it [7].

| Level | What P2 requires | Present in RefPharma-API-1 |
|:---|:---|:---|
| L0 | no CIM leg at all | Exceeded. A CIM leg exists |
| L1 | one admitted `IdentifiedObject` instance, its `mRID`, its authority set and a relation | Yes. `EC-RP-SITE`, one `EnergyConsumer`, authority set `https://example.org/mas/example-dso-region-4`, relation `supplies` |
| L2 | plus `Terminal` and `ConnectivityNode` | No. Neither class appears |
| L3 | plus `Bay`, `VoltageLevel`, `Substation` and `BaseVoltage` | No. None appears |
| L4 | plus `Breaker`, `ProtectedSwitch` and `ProtectionEquipment` | No. None appears, although fifty-eight protection devices exist on site and their firmware is in `BOM-RP-ELE` |

The declared level is **L1**. The declaration is made under P2 C-7, which requires a conformance claim to name the CIM model content version and the base profile the document was produced against [7]. That requirement is met awkwardly here, because the document was produced against no export, so the version named is the version the network operator stated when it supplied the `mRID`. A reviewer should treat that as the weakest sentence in this section, and F-7 below is the general form of the problem it points at.

The last row of the table is the one to read twice. Fifty-eight protection devices exist on this site, they run known firmware, and the CIM leg says nothing about any of them. P2's silence rule is doing real work at that row: an L1 leg does not assert that the site has no breaker, it asserts nothing about breakers [7]. A consumer reading the absence of `ProtectionEquipment` as an absence of protection equipment would be making a claim that is flatly false about this plant, and section 6.9 shows what that error would have cost.

### 5.3 What a level does not tell a consumer

P2's levels are a depth scale. They say which classes a leg carries. They say nothing about how many objects the leg binds or what class the binding attaches to, and those two omissions decide what a consumer can compute.

Consider two conformant L1 legs. This site's binds one object at the metered connection. A second site could bind two hundred objects, one `EnergyConsumer` per motor, each with its own `mRID` and authority set, and still carry no `Terminal` and no `ConnectivityNode`. Both declare L1 truthfully under C-7. The first supports no query that names an individual asset. The second answers, for every motor on site, whether it exists in a named authority's network model and which authority owns it, which is most of what an incident responder wants at three in the morning and is exactly the value P2 claims for L1 [7].

A consumer told "L1" cannot tell which of those two it holds without counting the objects itself. Counting is inference, and C-7's whole point is that the level is declared rather than inferred, so a consumer that counts has left the contract in order to work out what the contract should have told it.

> **F-5.** P2's completeness levels measure the depth of a CIM leg and not its attachment granularity or its cardinality. One boundary binding and two hundred per-asset bindings both declare L1 and support different query sets. P2 section 7 should require a declaration to state the number of bound objects and the admitted class each binding attaches to, alongside the level. That is two integers and a class name. Without them the declared level is not sufficient for a consumer to decide what it can ask, which is the one job a declared level has.

## 6. Graceful degradation, tested

Two queries. The first completes and the thin leg does not obstruct it. The second is answerable at RefBESS-250MW and is not answerable here. Section 6.7 runs both with legs removed, which is where the result they share becomes visible.

### 6.1 Q-3, the query the thin leg does not obstruct

> **Q-3.** Advisory `SYN-RP-2026-0004` is disclosed against `pkg:generic/example-automation/batch-controller@8.1.2`, permitting an authenticated operator-level session to write a setpoint outside the configured recipe limits. Which tagged equipment does the affected software command, which process step does that equipment perform, and what equipment falls inside the change control scope if the software is patched?

`SYN-RP-2026-0004` is a synthetic advisory identifier. It is not a CVE, it is registered with no numbering authority, and no such advisory exists; the `SYN-` prefix is there so it cannot be mistaken for one. A real CVE could not be used, because the target package URL is itself synthetic and unregistrable [11], and attaching a real advisory to a package that does not exist would be a fabrication.

The last clause of the question is why this asset is worth running the join against. At a battery site, patching a drive is an engineering decision. At a pharmaceutical plant, changing software inside a validated system is a controlled change that has to be assessed and approved before it is made [14], and the assessment needs a scope: a list of equipment and process steps. Today that list is assembled by a person reading a spreadsheet against a drawing, and its completeness rests on that person's memory of which controller commands which valve. "Which software is in which equipment, and what does that equipment do" is the question a change control record has to answer, and it is exactly the question the three-identity join was built to make computable.

### 6.2 The three legs of the objects Q-3 reaches

Before the traversal, the encodings it reads. RefBESS-250MW publishes these for one object [2] and this document publishes them for two, because the two behave differently and the difference is the paper's subject.

The asset reference for `TCV-2101` is `5d1c8b74-2f09-4e63-a1d7-90b4c6e25f38`, synthetic, minted once by the plant model authority. The DEXPI leg, on the equipment object carrying the tag, per P1 R-17:

```xml
<Equipment ID="EQ-TCV-2101">
  <TagName>TCV-2101</TagName>
  <GenericAttributes Set="AssetJoin">
    <GenericAttribute Name="AssetReference"
                      Value="5d1c8b74-2f09-4e63-a1d7-90b4c6e25f38"/>
    <GenericAttribute Name="AssetReferenceRelation" Value="identity"/>
    <GenericAttribute Name="AssetReferenceAuthority"
                      Value="https://example.org/authority/refpharma-plant"/>
    <GenericAttribute Name="AssetReferenceBasis"
                      Value="PID-RP-REAC-201 rev F 2026-05-22"/>
  </GenericAttributes>
</Equipment>
```

The CycloneDX 1.6 leg, on one of the two batch controller devices in `BOM-RP-DCS`. Under the encoding of section 4.1 this is one of seven component objects representing that single device, and this one carries the assertion toward `TCV-2101`:

```json
{
  "type": "firmware",
  "bom-ref": "dcs-ctl-a/controls/tcv-2101",
  "name": "batch-controller",
  "version": "8.1.2",
  "purl": "pkg:generic/example-automation/batch-controller@8.1.2",
  "properties": [
    { "name": "assetjoin:ref",
      "value": "5d1c8b74-2f09-4e63-a1d7-90b4c6e25f38" },
    { "name": "assetjoin:relation", "value": "controls" },
    { "name": "assetjoin:authority",
      "value": "https://example.org/authority/refpharma-build" },
    { "name": "assetjoin:basis", "value": "BUILD-RP-2026-0714 2026-07-14" }
  ]
}
```

The CPAI leg for `TCV-2101` does not exist. The document of section 5.1 contains one instance and it is not this object. That is not an omission in this paper; it is the site's actual electrical leg, and P1 R-12 requires a consumer to treat the reference as unjoined at that leg rather than synthesise it [6].

The second object is `P-2141`, the pump Q-4 asks about, asset reference `f2b90e5c-4a71-4d38-b6c9-081e5a37c94d`, synthetic. Its DEXPI leg is the same shape as the block above, carrying `identity` on the equipment object holding the tag, basis `PID-RP-REAC-201 rev F 2026-05-22`. It has no CycloneDX leg, because the pump is started direct on line and carries no firmware. It has no CPAI leg, for the same reason `TCV-2101` has none.

So `TCV-2101` is a two-leg object missing the electrical leg, and `P-2141` is a one-leg object missing both the component leg and the electrical leg. RefBESS-250MW's counter-example `P-1403` is a two-leg object missing the component leg and holding the electrical one [2], which is the mirror image, and section 6.6 shows why the mirror does not reflect.

### 6.3 The traversal for Q-3, hop by hop

Hops are numbered. Each states the leg, the mechanism, and whether it is a join hop under P1, a model traversal under P2, or a hop the join delegates to a schema's own topology.

**H1. Component leg, join hop.** Query `BOM-RP-DCS` for components whose `purl` equals `pkg:generic/example-automation/batch-controller@8.1.2`, and read the `assetjoin:ref` and `assetjoin:relation` of each. Under the workaround of section 4.1 the redundant controller pair appears as fourteen component objects, two devices at seven assertions each. Two carry `partOf` toward the controller pair's own asset reference `a3f4d206-7c19-4b8e-95a0-2d6e1f8c74b1`, synthetic. Twelve carry `controls`, six asset references from each device: `TCV-2101`, `TCV-2102`, `TCV-2103`, `AG-2101`, `AG-2102`, `AG-2103`. Authority `https://example.org/authority/refpharma-build`, basis `BUILD-RP-2026-0714 2026-07-14`.

**H1a. What H1 depends on.** The twelve `controls` assertions were made once, in section 3.3, rather than inferred at query time. A consumer that inferred them from a controller being in the same cabinet as an input and output module would be inferring, which R-6 forbids by requiring the relation to be stated [6].

**H2. Process leg, join hop.** Resolve those six asset references in the DEXPI file. Each carries relation `identity` on the equipment object whose `TagName` names it [6]. Physical objects reached: three three-way control valves on the reactor jacket circuits, and three top-entry agitators. Six tagged objects across three trains.

**H2a. Direction check.** The controller carries `controls` toward these six and P1 R-13 forbids inverting a directed relation [6]. The traversal runs from the software to the metal, which is the direction the advisory acts in. The thirty-six temperature transmitters that observe the same jacket circuits carry `monitors` and are not on this path; a traversal that walked them as though they were actuators would report a reach set six times too large, which is the specific error R-13 exists to prevent.

**H3. Process leg, delegated hop.** From `TCV-2101` into the jacket circuit of `R-2101`, and from `AG-2101` into the reaction mass it agitates. The join does not carry this hop. P1 defines no physics model and assigns hydraulic and thermal propagation to the two-schema work and its generalisation [6], [21], and the forward path from a control valve to the vessel it serves is the DEXPI file's own piping network system. Three reactors are reached, one per train.

The delegation is correct and it is not free. Q-3 crosses a boundary at H3 where the evidence changes from a declared join assertion to a schema-internal topology, and a reader auditing the result has to open the DEXPI file to check the second half. This paper marks the boundary rather than smoothing it, as P4 does at its own equivalent hop [9].

**H4. Process leg, carried attribute.** Each reactor object carries its process step as an attribute in the DEXPI leg: primary reaction and crystallisation of the API. That is a plant fact rather than a join hop, and it is the fact the change control record needs. RefPharma-API-1 carries it as a modelled generic attribute and no DEXPI schema element was verified for it, which section 7 records as a defect in this document.

**H5. Electrical leg, join hop.** Resolve the same six asset references in the CPAI document. **None of the six is present.** The document binds one object, `EC-RP-SITE`, and its `supplies` assertions do not reach the valves or the agitators. Three rules govern what the consumer does next, and all three fire.

Under P1 R-12 the consumer treats each reference as unjoined at this leg and must not synthesise the missing binding [6]. Under P2 C-9 the consumer accepts the L1 leg, reports the completeness level it received, and does not reject the leg for the absence of classes the producer did not supply [7]. Under P2's silence rule the consumer does not conclude that these six objects have no electrical supply, because an L1 leg asserts nothing about supply below the site boundary [7].

**H5a. Whether H5 cost the query anything.** It did not. Q-3 asks what the software commands, what that equipment does, and what falls in a change control scope. Every one of those is a process fact or a component fact. The electrical leg had nothing to contribute to any of them, and its thinness removed nothing from the answer.

### 6.4 The answer to Q-3, and the honest caveat

**Affected component set.** Two physical devices, the redundant batch controller pair, both running `batch-controller@8.1.2` as of build basis 14 July 2026.

**Commanded equipment set.** Six tagged objects: `TCV-2101` to `TCV-2103` and `AG-2101` to `AG-2103`.

**Equipment reached across the delegated hop.** Three reactors, `R-2101` to `R-2103`.

**Process steps in scope.** Primary reaction and crystallisation on all three trains, which is the whole site's API-forming step. A single advisory against a single package reaches every train, because the trains share a controller pair rather than holding one each. That is the site's own redundancy question and it is visible only because the component leg and the process leg were joined.

**Change control scope.** The distributed control system as a validated computerised system, the six commanded tagged objects, the three reactors and the three process steps. That is a list a change control record can carry, produced by traversal rather than by a person reading a spreadsheet, and every element of it traces to a declared assertion or to one marked delegated hop.

**No time is stated.** How long a mis-written jacket setpoint takes to move the reaction mass off specification depends on jacket duty, reaction mass thermal capacity and the temperature control unit's response, and section 2 publishes none of the three. The join produces an ordering of events, not a time to specification loss.

**No consequence value is stated.** A loss figure would need a batch value, a campaign schedule and a cost of investigation, and the specification carries no commercial model. A number computed here would be invented.

**The caveat, stated plainly.** Q-3 completes on two legs. It is a DEXPI plus CycloneDX answer, which is to say it is the two-schema bridge [21], and the third leg contributed nothing to it. This paper does not present Q-3 as evidence that the three-way join works on a thin-leg asset. It presents it as evidence that a thin third leg does not break a query that never needed the third leg, which is the weaker and more accurate claim, and which is what P2 C-9's refusal rule exists to protect. A validator that demanded topology, got none, and reported Q-3 as unanswerable would have withheld a complete answer, and that behaviour is what C-9 forbids [7].

### 6.5 Q-4, the query RefBESS answers and this site cannot

P4 ran Q-2 against RefBESS-250MW's glycol dosing pump `P-1403`, a tagged process object with no firmware, and answered it in three hops through the electrical leg: the pump's `EnergyConsumer`, its bay, its breaker, its protection device, and the relay firmware in `BOM-RB-PRO` [9]. The answer was one named package on an object carrying no software of its own, and P4 called it the clearest evidence in the programme that the third leg earns its place.

Q-4 is that query, asked of this site.

> **Q-4.** `P-2141`, the seed slurry transfer pump on reaction train 1, is started direct on line and carries no firmware. Which software can stop it?

The question matters here for the same GMP reason Q-3 does. An unplanned stop of a slurry transfer mid-batch is a deviation, and a deviation has to be investigated and its root cause identified before the batch can be dispositioned. "Which software could have caused this" is the first question of that investigation, and answering it by elimination costs days.

### 6.6 The traversal for Q-4, to the point it stops

**H1'. Component leg, join hop.** Query all six bills of materials for a component asserting `partOf` toward `P-2141`'s asset reference `f2b90e5c-4a71-4d38-b6c9-081e5a37c94d`. The result is the empty set.

**H2'. The reporting rule at H1'.** P1 R-12 requires an asset reference appearing in only one file to be treated as unjoined rather than as having no other legs [6], and P2 section 7 states that silence is not absence [7]. The correct report at H1' is *no component leg is asserted for this asset*. The incorrect report is *this asset has no software exposure*. This is the same rule P4 exercised at `P-1403` and it behaves identically here, which is worth recording as the one part of the degradation contract this site confirms rather than strains.

**H3'. Process leg, join hop.** Resolve `P-2141` in the DEXPI file. Relation `identity` on the equipment object carrying the tag. Object reached: centrifugal pump, seed slurry transfer, reaction train 1. The DEXPI leg confirms what the object is and what it does, and says nothing about what supplies it, because a P&ID does not show which motor control centre feeds a motor. That is not a defect in the DEXPI model; it is a discipline boundary, and it is precisely the boundary the CIM leg exists to cross.

**H4'. Electrical leg, join hop.** Resolve `P-2141`'s asset reference in the CPAI document. **Not present.** The document binds one object, `EC-RP-SITE`, and its twelve `supplies` assertions do not include `P-2141`. Under P1 R-12 the reference is unjoined at this leg [6]. Under P2's silence rule the consumer must not conclude the pump has no breaker, and in fact it has one, on one of the fifty-eight outgoing ways of section 2.1.

**H5'. The hop that does not exist.** At RefBESS-250MW this hop ran `Terminal` to `ConnectivityNode`, then read back to the `Breaker`, then `ProtectionEquipment` to `ProtectedSwitch`, using associations P2 section 4.3 admits and the CPAI document declares [2], [7]. Here the document declares none of those associations, because it contains none of those classes. P2 C-8 forbids a consumer inferring containment, supply or protection from `mRID` values or from naming conventions [7], so the consumer may not guess that a pump tagged `P-2141` on train 1 sits behind a motor control centre called `MCC-2A`, even though a site electrician would guess it correctly in a second. **The traversal stops.**

**H6'. The brute-force route, and why it is not an answer.** `BOM-RP-ELE` carries `pkg:generic/example-protection/mcc-relay@2.3.4` on fifty-eight component objects, one per protected outgoing way under the encoding of section 4.1. Every one of them carries `partOf` toward its own relay device asset reference. None of those fifty-eight relay asset references appears anywhere in the CPAI document, and none carries a `supplies` relation toward `P-2141`, because the object that would carry it, a CIM `Breaker` or `ProtectionEquipment` for the outgoing way, does not exist. The component leg holds the candidate software and cannot narrow it.

**The answer to Q-4 is fifty-eight candidates.** At RefBESS-250MW the same question returned one named package on one named device, reached in three declared hops. Here it returns a package name and fifty-eight indistinguishable instances of it, with no declared assertion connecting any instance to the pump. A report saying "one of these fifty-eight relays can stop `P-2141`" is true, conformant and operationally worthless. An investigator would have to walk the low voltage single line diagram by hand to reduce it, which is exactly the work the join was supposed to remove.

That is the sharpest thing this paper has to report, and it is worth stating in general terms because it does not depend on this site.

**The value the CIM leg supplies is discrimination, not existence.** The component leg already knows the relay firmware exists. It knows the version, the vendor namespace and the device count. What only the electrical leg can say is which instance of that firmware stands between the software and this particular pump. A thin CIM leg does not remove a fact from the answer; it removes the ability to select among facts already present. And that failure mode is invisible in any query where the candidate set happens to have one member, which is why a rich-leg case cannot find it. RefBESS-250MW's Q-2 returned one relay because that site's CIM leg had already done the selecting, and P4 could not tell how much of the answer the selection was carrying.

### 6.7 What no single schema, and no pair, returns

P4 tests its claim by running Q-1 with legs removed [9]. The same test applied to both queries here is where the paper's result becomes visible, because the two columns behave differently and neither behaves as P4's did.

| Available | What Q-3 returns | What Q-4 returns |
|:---|:---|:---|
| CycloneDX 1.6 alone | `batch-controller@8.1.2` is a firmware component of `BOM-RP-DCS`, on two devices | `mcc-relay@2.3.4` runs on 58 devices somewhere on site, and nothing about `P-2141` |
| DEXPI 2.0 alone | 204 tagged objects, of which three jacket control valves and three agitators serve three reactors | `P-2141` is a centrifugal pump on train 1, and nothing about what supplies it or what software reaches it |
| CPAI alone | one site load, `EC-RP-SITE`, in the model of one distribution network operator | the same one site load, and nothing about any object inside the fence |
| DEXPI plus CycloneDX | the entire Q-3 answer, including the change control scope | nothing. `P-2141` has no component leg, so the pair has one leg between them |
| CycloneDX plus CPAI | which software the site intake supplies, at site granularity, which no one asked | 58 candidate relays, unnarrowed, which is the section 6.6 result |
| DEXPI plus CPAI | the plant, and one boundary load with no path between them | the pump, and one boundary load with no path between them |
| All three | the entire Q-3 answer. The CIM leg adds nothing | 58 candidates. The CIM leg adds nothing it can act on |

Two rows deserve argument.

The Q-3 column shows the third leg contributing nothing at any combination it appears in. That is not a failure of the join; it is a query whose consequence is a process consequence, answered by the two legs that describe process and software. P4's Q-1 had the same property and P4 said so [9]. The difference is that P4 could point at Q-2 on the same site, where the third leg carried the whole answer. This paper cannot, and that is the finding.

The Q-4 column is the one that matters. At RefBESS-250MW the equivalent query is answered entirely through the electrical leg, so the row for CycloneDX plus CPAI returns the relay and the row for DEXPI plus CycloneDX returns nothing [9]. Here the electrical leg is present, conformant, correctly declared, and the same row returns fifty-eight unnarrowed candidates. **The join degraded gracefully into an answer nobody can use.**

That is the result the two queries share, and it is stronger than either alone. On a CIM-thin asset, the three-schema join does not fail, does not refuse, does not fabricate, and does not stop being conformant. It collapses to the two-schema bridge [21]. Every rule held and the third leg still bought nothing, on either query, at any combination. A mechanism that behaves correctly and adds no value on an entire class of assets is a real result about the mechanism's scope, and it is not visible from RefBESS-250MW.

### 6.8 What is missing, precisely, and what would have to be obtained

Four things are absent, in the order the traversal of section 6.6 needed them.

1. **An admitted `IdentifiedObject` for the pump motor, with its `mRID` and model authority set.** This is L1 at asset granularity rather than at site granularity, and it is the F-5 distinction stated as a concrete cost. Without it the CPAI document has no object to attach the pump's asset reference to, so H4' has nothing to resolve.
2. **A `Terminal` and a `ConnectivityNode`.** L2. Without them a `supplies` assertion is a single edge with no computable downstream set, so the consumer cannot ask what else shares the pump's electrical point [7].
3. **A `Bay`, a `VoltageLevel`, a `Substation` and a `BaseVoltage`.** L3. Without them a consequence report names an object and cannot say where it sits or at what voltage, which is the granularity at which an operator isolates plant.
4. **A `Breaker`, a `ProtectedSwitch` and a `ProtectionEquipment` for the outgoing way, with the `ProtectionEquipment` to `ProtectedSwitch` association.** L4. This is the pair of classes that carries the answer, and that association is the single hop that selects one relay from fifty-eight.

What a reader would have to obtain is not new information, and that is the point. Every fact above exists on the site today, in three artefacts the operator already maintains under its own document control: the low voltage single line diagram for the six motor control centres, the motor schedule that maps each equipment tag to an outgoing way, and the relay setting records. The gap is expression, not collection. Three routes close it and they cost very differently.

**Model the whole internal network in CIM.** Complete, and disproportionate. A manufacturer connected at 10 kV has no business reason to hold a full network model, no exchange obligation that would produce one [19], and no tool in its engineering estate that emits one. This is the route that makes the join look expensive, and it is the route nobody should take.

**Convert the electrical CAD to CPAI automatically.** There is no converter. Writing one is a real piece of work, and it is the kind of tool a schema attracts once it has users, which is a circular dependency this programme cannot break by itself. P2 records that CPAI has no machine-readable form at all yet [7], so the target format a converter would emit is not fixed either.

**Produce a partial L4 CPAI document covering only the GMP-critical motor control centres.** Fifty-eight outgoing ways, each with a breaker, a protection device and a load, plus the containers above them. That is roughly two hundred and fifty CIM instances, by arithmetic on the fifty-eight ways of section 2.1 at three classes per way plus about eighty container and terminal objects. It is a bounded transcription exercise against a document that already exists, rather than a modelling programme. It would make Q-4 answerable and would leave the rest of the site at L1.

The third route is the finding worth carrying to a pharmaceutical operator. The ask is not "adopt CIM"; it is "transcribe the motor schedule you already maintain into two hundred and fifty objects a consumer can walk". Whether an operator would do that for a benefit stated in incident response time is untested, and section 7 says so. But it changes the shape of the conversation, because the objection to the third leg at a plant like this is not that the data is unavailable. It is that nobody has ever had a reason to write it down in a form a machine can traverse.

It also connects to F-5. A partial L4 document is not a level in P2's scale at all, because the levels are declared for a leg and this leg would be L4 for fifty-eight objects and L0 for the remaining hundred and fifty. P2 has no way to declare that, and a consumer receiving it would be told a single level that is wrong for most of the site either way.

### 6.9 Whether P2's degradation contract held

The contract has three binding rules and this asset was chosen to strain all three. They held. Each is stated below with what it prevented, because a rule that prevents nothing on the case built to break it has not been tested.

**The level is declared, not inferred.** Held, with a wrinkle worth recording. RefPharma-API-1 declares L1 under C-7 [7]. A consumer that inferred L1 by counting the one object it found would have reached the right level for the wrong reason, and F-5 shows why the reasoning matters: counting objects is exactly the inference that cannot distinguish this site's L1 from a two-hundred-object L1. The declaration was also awkward to make here, since section 5.2 had to name a model content version for a document produced against no export.

**Refusal is forbidden.** Held, and it did real work. A validator demanding topology at H5 would have reported Q-3, a query with a complete and useful answer, as unanswerable. It would also have reported this site as having no electrical context, when it has an identifier, a named model authority and a metered connection. C-9 exists to prevent exactly that and it prevented it [7].

**A missing class is not a negative fact.** Held, and it is the rule that would have caused the worst error. Fifty-eight protection devices exist on this site and none appears in the CIM leg. A consumer reading their absence as their non-existence would have concluded that no software can stop `P-2141`, which is false, and would have closed the deviation investigation of section 6.5 on a wrong answer with a documented rationale. That is a worse outcome than returning fifty-eight candidates, and it is the outcome the silence rule prevents.

So the contract did not break. What this asset exposed is that it is incomplete in two ways a rich-leg case could not have shown.

The first is F-5, already stated: a level is a depth, and it carries no granularity and no cardinality.

The second is on the consumer side. P2 states what each level supports and defines no rule at all for what a consumer does when the level it holds is below the level the query requires. C-9 protects the leg from rejection and says nothing about the query [7]. A consumer holding L1 and asked Q-4 has three conformant options: return the fifty-eight candidates as though they were an answer, return nothing, or say that Q-4 requires L4 and it holds L1. Only the third is useful, and P2 requires none of them.

> **F-6.** Every query has a minimum CPAI level, and P2 defines no way to state it and no rule for what a consumer does when the level received is below it. C-9 protects the leg and leaves the query undefended. P2 section 7 should require a consumer to state the minimum level a query needs, and to refuse the query naming the level required and the level received, rather than returning a partial result carrying no marking to say it is partial. Q-3 needs L0, since it never touches the electrical leg. Q-4 needs L4. This site declares L1. Those three sentences are the correct output of a consumer meeting this asset, and nothing in P2 asks for any of them.

One further gap sits underneath both, and it is the one that would bite hardest at a plant that could not get even the identifier this site got.

> **F-7.** L0 has no carrier for its own declaration. C-7 places the completeness level in the CPAI document, and L0 is defined as no CIM leg at all, so a producer reaching L0 has nowhere to say so [7]. Combined with P4's F-2, which found that P1 provides no way to assert that an asset has no leg in a given schema [9], a consumer meeting no CIM leg cannot distinguish a declared L0 from a leg that was never delivered, from a leg that was delivered and lost in transit. This site is L1 and escapes the problem by exactly one object. A site that obtained no `mRID` from its network operator would fall into it, and that is the more common pharmaceutical case, not the rarer one.

A last observation about the degenerate edge of L1, which this document is the first in the programme to reach. `EC-RP-SITE` carries `supplies` toward twelve asset references. Every one of the twelve is one hop from the same node, so the electrical leg assigns them all the same electrical context and separates none of them. The assertions are conformant, the relation is used correctly, the authority and basis are stated, and the leg contributes no discrimination whatever. That is not a rule violation and it is not something P2 warns about. It is what L1 looks like when the single bound object sits at the site boundary, and it is the concrete form of what F-5 describes abstractly. A consumer could compute over it forever and never learn anything that distinguishes one GMP-critical asset from another.

## 7. Limitations

**The site is synthetic, so nothing here is validated against a real installation.** No operator, site, vendor, package URL or master resource identifier in this document exists. Twenty of thirty-one parameter rows are modelled and say so. Section 2 represents nothing except itself, and the reactor volume, cycle time and campaign count were chosen by the author rather than surveyed.

**The thin CIM leg is asserted rather than observed.** This is the most important limitation in the paper, because the paper's whole argument rests on the leg being thin. The authors hold no pharmaceutical plant's CIM export, and the claim that one would not exist is reasoned from the fact that a manufacturer connected at 10 kV is not a party to any grid model exchange [19] and has no obligation producing a network model. That reasoning is plausible and it is not evidence. A single counter-example, one API plant holding a CIM model of its internal distribution, would weaken section 2.2 without touching sections 6.6 to 6.9, which describe what happens when a leg is thin rather than claiming how often it is. A reviewer who works in pharmaceutical engineering can confirm or refute section 2.2 from experience, and that is the fastest correction available to this document.

**Whether a real pharmaceutical operator would produce even an L1 leg is untested.** The L1 document of section 5.1 was constructed on the assumption that a distribution network operator will supply an `mRID` and a model authority set on request, and that a manufacturer will think to ask. Neither has been tried. Network operators do not routinely publish internal model identifiers, and a manufacturer's connection agreement would not normally quote one. If the operator declines, or treats the identifier as commercially confidential, this site is L0 and falls into F-7 rather than reaching L1, which would make the paper's case sharper and its worked example unbuildable.

**The GMP framing is general and not validated against a specific regulatory regime.** ICH Q7 [14], ISPE GAMP 5 [15] and 21 CFR Part 11 [16] are named accurately and used at the level of a requirement in kind. No clause number is quoted, no jurisdiction-specific interpretation is offered, and no claim is made about what a particular inspectorate would accept as a change control scope. A reader working under a specific regime should treat section 6.1's framing as a motivation for the query and not as regulatory guidance, and should assume that a real change control assessment carries obligations this paper does not model.

**Both queries were run by hand because no validator exists.** P3 defines the test vectors, round-trip cases and reference implementation, and states that until it is implemented every requirement in the programme is a proposal [8]. Nothing checked these traversals except their author reading the three legs against the rules of P1 and P2. Every hop is written out so a reader can repeat it, which substitutes for a validator and is not one.

**F-4 was reasoned rather than observed, and this paper works around it.** The encoding collision of section 4.1 was reached by asking what P1 R-3 and R-21 permit together, not by watching a producer fail. Section 6.3 runs on the duplication workaround, so H1's count of fourteen component objects is an artefact of a defect this paper reports rather than a property of the site. A real producer might resolve the collision differently, and if it did, H1 would return a different count and the same reach set.

**The process step attribute at H4 has no verified schema element.** Section 6.3's H4 reads the reactor's GMP process step from a DEXPI generic attribute. RefBESS-250MW records the same class of defect against its ISO 15926-4 classes [2], [10], and P1 records that its own DEXPI serialization binding is provisional and must be confirmed against the published DEXPI 2.0 schema [6]. Q-3's change control scope depends on that attribute existing, so if it does not, the answer loses its process step column and keeps everything else.

**The ISO 15926-4 classes are described, not resolved.** Section 3.1 names classes in words. P1 R-18 requires the reference data library class to travel with the tag [6], [10], which needs a resolved identifier the authors do not hold. This is a defect in this document, correctable by substitution, and it means no query here could match a tag against equipment of the same function on another site.

**A traversal correct over the model says nothing about whether the model matches the plant.** P1 states this first among its own limitations [6]. Whether `PID-RP-REAC-201` at revision F describes what is installed, whether `8.1.2` is executing on the controllers now, and whether the motor schedule matches the wiring are site verification questions that no one of the three standards can answer. On a plant where revision control of drawings is itself a regulated activity, that limitation reads differently than it does at a battery site, and it is not thereby removed. A join over a stale P&ID produces confident, precise, wrong answers just as fluently as this traversal produced its own.

**Q-4's fifty-eight candidates are a modelled count.** The number follows from the fifty-eight protected outgoing ways of section 2.1, which is a modelled row. A site with thirty relays or a hundred and twenty would produce a different number and the same result, because the failure is the absence of a selection mechanism and not the size of the candidate set. The count matters only in that it is large enough to be useless and small enough to be walked by hand in a day, which is the range where the join's absence is most annoying and least catastrophic.

**All three legs rest on extension mechanisms not yet confirmed.** P1 assumes the DEXPI Profile can license an added attribute set and records the competing reading, and the CycloneDX `assetjoin` namespace is provisional until registration completes [6]. P2 has no machine-readable form and no CIM tool has been shown to tolerate its foreign properties [7]. A query run against files no tool will accept is a query run against a proposal, and that applies to the successful query in section 6.3 exactly as much as to the failed one in section 6.6.

## 8. References

1. **Creative Commons.** *Attribution 4.0 International (CC BY 4.0) Legal Code.* Creative Commons Corporation, 2013.
2. **McKenney, J.** *RefBESS-250MW: A Synthetic Reference Architecture for the Three-Schema Join.* Eigenia working group WG-05-CAD, 2026. Cited throughout to contrast a CIM leg reaching L4 with this document's L1 leg.
3. **DEXPI e.V.** *DEXPI 2.0 Specification.* Released 10 October 2025, published on GitLab under the Creative Commons Attribution 4.0 International licence.
4. **OWASP Foundation and Ecma International.** *CycloneDX Bill of Materials Specification.* ECMA-424, 1st edition, June 2024, defining CycloneDX 1.6. Ecma International Technical Committee 54, Geneva.
5. **International Electrotechnical Commission.** *IEC 61970-301: Energy management system application program interface (EMS-API), Part 301: Common information model (CIM) base.* International Standard.
6. **McKenney, J.** *The Three-Identity Join: DEXPI 2.0, CycloneDX 1.6 and IEC 61970 CIM.* P1 of the three-schema programme, defining requirements R-1 to R-35, Eigenia working group WG-05-CAD, 2026.
7. **McKenney, J.** *CIM Profile for Cyber-Physical Asset Identity (CPAI).* P2 of the three-schema programme, defining requirements C-1 to C-10 and completeness levels L0 to L4, Eigenia working group WG-05-CAD, 2026.
8. **McKenney, J.** *Conformance Suite and Reference Implementation.* P3 of the three-schema programme, Eigenia working group WG-05-CAD, 2026.
9. **McKenney, J.** *The Three-Schema Join Applied to RefBESS-250MW.* P4 of the three-schema programme, raising findings F-1 to F-3, Eigenia working group WG-05-CAD, 2026.
10. **International Organization for Standardization.** *ISO 15926-4: Industrial automation systems and integration, Integration of life-cycle data for process plants including oil and gas production facilities, Part 4: Initial reference data.* International Standard.
11. **Eastlake, D. and Panitz, A.** *Reserved Top Level DNS Names.* RFC 2606, BCP 32, Internet Engineering Task Force, June 1999. Reserves `example.org` for documentation use.
12. **Ecma International.** *Package URL (purl) Specification.* ECMA-427, 1st edition, December 2025. Ecma International Technical Committee 54, Geneva.
13. **Davis, K., Peabody, B., and Leach, P.** *Universally Unique IDentifiers (UUIDs).* RFC 9562, Internet Engineering Task Force, May 2024. Fixes the form of the asset references and `mRID` values quoted here.
14. **International Council for Harmonisation of Technical Requirements for Pharmaceuticals for Human Use.** *ICH Q7: Good Manufacturing Practice Guide for Active Pharmaceutical Ingredients.* ICH harmonised guideline. Cited for applicability and for the existence of a formal change control requirement. No clause number in this document was verified against the guideline text.
15. **International Society for Pharmaceutical Engineering.** *GAMP 5: A Risk-Based Approach to Compliant GxP Computerized Systems.* Second edition. Cited for the framework under which a computerised system is validated, not for any specific control.
16. **United States Food and Drug Administration.** *21 CFR Part 11: Electronic Records; Electronic Signatures.* Cited by part title only, for the requirement class applying to the historian and the manufacturing execution system integration.
17. **International Electrotechnical Commission.** *IEC 60079-10-1: Explosive atmospheres, Part 10-1: Classification of areas, Explosive gas atmospheres.* Cited as the basis a real area classification study would use. The zone assignment in section 2.1 is modelled and is not the output of such a study.
18. **International Electrotechnical Commission.** *IEC 62443-3-3: Industrial communication networks, Network and system security, Part 3-3: System security requirements and security levels.*
19. **International Electrotechnical Commission.** *IEC 61970-600-1:2021 and IEC 61970-600-2:2021: Common Grid Model Exchange Standard (CGMES).* International Standards, edition 1.0, 4 June 2021, cancelling and replacing the 2017 Technical Specifications of the same numbers. Cited for the exchange context a pharmaceutical manufacturer is not a party to.
20. **Cheikes, B. A., Waltermire, D., and Scarfone, K.** *Common Platform Enumeration: Naming Specification Version 2.3.* NISTIR 7695, National Institute of Standards and Technology, August 2011.
21. **McKenney, J.** *The Unified DEXPI 2.0 and CycloneDX 1.6 Semantic Bridge.* Eigenia working group WG-05-CAD, 2026. Defines the multigraph blast radius and the actuarial consequence function over two schemas.
