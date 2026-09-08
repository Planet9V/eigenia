| Field | Value |
|:---|:---|
| Designation | RefBESS-250MW, synthetic reference architecture of the three-schema programme |
| Status | Draft for submission |
| Normative language | None. This specifies an instance, not requirements. P1 owns R-nn, P2 C-nn, P3 V-nn |
| Licence | Creative Commons Attribution 4.0 International (CC BY 4.0) [1] |
| Serves | The applied papers following P1 [2], P2 [3] and P3 [4] |
| Rule on every number | Sourced or modelled. The Basis column says which |

## 1. Scope, and what RefBESS-250MW is not

RefBESS-250MW is a synthetic grid-scale battery energy storage site, specified once so the applied papers of this programme compute against a fixed target. It is a 250 MW, 500 MWh lithium iron phosphate installation connected at 220 kV, with a centralised liquid cooling plant, a layered control stack and a site substation.

It exists because the three-identity join needs an object all three standards can name. A distribution network satisfies the electrical leg richly and the process leg barely, because a network is not a P&ID. A software platform satisfies the component leg and neither of the others. A grid-scale battery site is a plant and a substation at once: pumps, heat exchangers, valves and instrumentation that DEXPI 2.0 [5] describes; battery management firmware, converter control software and an energy management platform that CycloneDX 1.6 [6] describes; transformers, switchgear and a coupling point that the IEC 61970 Common Information Model [7] describes. A join demonstrated on an asset with a thin leg proves nothing, so this site is specified where all three speak about one object.

### 1.1 What RefBESS-250MW is not

**It is not a real site or a real operator.** No parameter was taken from a specific installation, no vendor named in section 4 exists, and every package URL and master resource identifier here is synthetic.

**It is not a reuse of RefDNSP-1.2M** [8]. That asset is a 1.2 million customer distribution network whose process leg is thin by construction, which is right for what it supports and wrong for what the three-schema papers need. The two share a 50 Hz system context so a later paper may connect one to the other. Nothing else is inherited.

**It is not a design and not a validation.** A design carries vendor selections, calculation sheets and a hazard study. Nothing here has been tested against a real DEXPI file, CycloneDX document or CIM export. Section 3 gives a thermal plant no engineer should build from.

**It does not carry the join semantics.** Relations, attribute names, traversal rules and conformance sit in P1 [2] and the CIM profile in P2 [3]. This document assigns identities under those rules and does not restate them.

## 2. Site parameters

Every row states whether its value was taken from a published source or chosen. A value chosen inside a published range is modelled, and the range is named so a reader sees how much freedom the choice had.

| Parameter | Value | Basis |
|:---|:---|:---|
| Designation | RefBESS-250MW | Modelled. Synthetic, formed to match RefDNSP-1.2M [8] |
| Site class | Transmission-connected lithium iron phosphate storage | Modelled |
| Nominal system frequency | 50.0 Hz | Sourced. Frequency operating standard [9] |
| Normal operating frequency band | 49.85 Hz to 50.15 Hz | Sourced. The band the system should hold 99 percent of the time [9] |
| Rated power at the point of common coupling | 250 MW export and import | Modelled. Upper end of single-site grid-scale deployment |
| Rated energy at beginning of life | 500 MWh | Modelled. Derived from power and duration |
| Storage duration at rated power | 2.0 h | Modelled. Sits inside the one to four hour band the IEA reports for commissioned utility-scale projects, whose average moved from about two hours in 2023 to about three in 2025 [10] |
| Cell chemistry | Lithium iron phosphate | Modelled |
| Battery enclosures | 100, each 5 MWh nominal | Modelled |
| Battery enclosure envelope | ISO 668 series 1 freight container, 1AA | Sourced. Dimensions fixed by ISO 668 [11]; the containerised form is a modelled choice |
| Power conversion units | 50, each 5 MW | Modelled |
| Blocks | 10, each 25 MW and 50 MWh | Modelled. Five converters, ten enclosures each |
| Converter AC output voltage | 690 V | Modelled |
| Collection voltage | 33 kV | Modelled |
| Connection voltage at the coupling point | 220 kV | Modelled |
| Main step-up transformers | 2, each 150 MVA, 220/33 kV | Modelled |
| Block transformers | 10, each 30 MVA, 33/0.69 kV | Modelled |
| Auxiliary transformers | 2, each 2.5 MVA, 33/0.415 kV | Modelled |
| Cell temperature band the thermal plant holds | 15 °C to 35 °C | Sourced. A published review of temperature effects in lithium-ion cells gives this as the band where performance is high and degradation moderate [12] |
| Design heat rejection duty | 8.0 MW thermal | Modelled. Derived in section 3 |
| Grid-integrated storage safety standard | IEC 62933-5-2 | Sourced. Safety requirements for grid-integrated electrochemical storage [13] |
| Installation fire standard | NFPA 855 | Sourced. Installation of stationary energy storage systems [14]. Clause-level separation distances were not verified and are modelled in section 3 |
| Control system security standard | IEC 62443-3-3 | Sourced. System security requirements and security levels [15] |
| Target security level for the site control zone | SL-T 2 | Modelled |
| Process schema | DEXPI 2.0 | Sourced. Released 10 October 2025 [5] |
| Process semantics | ISO 15926-4 reference data library | Sourced [16] |
| Component schema | CycloneDX 1.6, standardised as ECMA-424 | Sourced [6] |
| Component identity syntax | Package URL, standardised as ECMA-427 | Sourced [17] |
| Electrical schema | IEC 61970-301 Common Information Model, profiled as CPAI | Sourced [7], [3] |
| Electrical exchange precedent | IEC 61970-600-1:2021 and IEC 61970-600-2:2021, both International Standards | Sourced [18], [19] |
| Model authority set | `https://example.org/mas/refbess-network` | Modelled. Reserved documentation domain [20] |
| As-built basis, three legs | `PID-RB-COOL-101 rev C 2026-08-14`; `BUILD-RB-2026-0831 2026-08-31`; `NM-RB-EXPORT-2026-Q3 2026-08-20` | Modelled. Three dates on purpose |

Thirteen of the thirty-two rows are sourced and nineteen are modelled, the honest ratio for a synthetic asset. The three as-built dates differ because P1 R-8 treats a divergent basis set as legitimate and conformant rather than an error to be tidied away [2].

## 3. The process leg: thermal management

A 250 MW battery site rejects heat continuously while it works and the cells tolerate only a narrow band [12]. Thermal management is therefore a process plant with a coolant inventory, rotating equipment, heat transfer surface, valves and instrumentation. It is the part of a battery site a P&ID describes, and it is why RefBESS-250MW can carry a DEXPI leg at all.

The architecture is two loops. A primary chilled water loop runs between water-cooled chiller packages and their heat rejection. A secondary glycol and water loop feeds the ten blocks, separated by plate heat exchangers so a field leak does not contaminate the chiller circuit. Each block takes flow through a modulating three-way valve controlled on its return temperature.

### 3.1 Thermal design parameters

| Design parameter | Value | Basis |
|:---|:---|:---|
| Cell temperature band the loop must hold | 15 °C to 35 °C | Sourced [12] |
| Assumed DC round-trip and conversion efficiency | 96 percent and 98.5 percent | Modelled |
| Design heat rejection duty at rated throughput | 8.0 MW thermal | Modelled. Derived from the two efficiencies above |
| Secondary coolant | 30 percent propylene glycol in water | Modelled |
| Secondary coolant freeze point | -13 °C nominal | Modelled. Nominal for a 30 percent mixture, not from a supplier data sheet |
| Secondary supply and return temperature | 18 °C and 26 °C | Modelled |
| Secondary loop temperature rise | 8 K | Modelled |
| Secondary volumetric flow, whole site | 920 m3/h | Modelled. Derived from duty and rise at assumed specific heat 3.85 kJ/kg K, density 1025 kg/m3 |
| Secondary volumetric flow per block | 92 m3/h | Modelled. Derived |
| Secondary circulation pumps | 4 at 50 percent, 460 m3/h at 45 m head | Modelled |
| Pump shaft power at duty | 75 kW | Modelled. Derived at 78 percent assumed hydraulic efficiency |
| Pump motor rating | 90 kW | Modelled |
| Plate heat exchangers | 3 at 4.0 MW, two duty one standby | Modelled |
| Chiller packages | 3 at 4.0 MW, two duty one standby | Modelled |
| Primary chilled water flow and return | 6 °C and 12 °C | Modelled |
| Primary volumetric flow | 1150 m3/h | Modelled. Derived |
| Separation between battery enclosure rows | 3 m | Modelled. NFPA 855 governs the installation [14]; its clause-level requirements were not verified, so this is a choice and not a code minimum |

Sixteen of the seventeen rows are modelled and one is sourced. Every derived row recomputes from the rows above it. That is why the assumed specific heat and efficiencies are published rather than only the answers: a reader who disagrees with 96 percent can rerun the arithmetic instead of arguing with a number that arrived from nowhere.

### 3.2 Tagged objects

One hundred objects carry a `TagName` in the DEXPI leg. The tag block is modelled site convention: 11xx circulation, 12xx heat transfer, 13xx refrigeration and heat rejection, 14xx coolant inventory, 15xx block distribution.

| TagName range | Class, described | Function | Count |
|:---|:---|:---|:---|
| `P-1101A/B`, `P-1102A/B` | centrifugal pump | secondary circulation, four at 50 percent | 4 |
| `ST-1101A` to `ST-1101D` | strainer | pump suction protection | 4 |
| `CV-1102A` to `CV-1102D` | check valve | pump discharge non-return | 4 |
| `XV-1103A` to `XV-1103H` | isolation valve | pump isolation | 8 |
| `PT-1104A/B` | pressure transmitter | secondary header pressure | 2 |
| `PSV-1105A/B` | pressure safety valve | secondary loop overpressure relief | 2 |
| `HX-1201A/B/C` | plate heat exchanger | primary to secondary separation | 3 |
| `PDT-1201A/B/C` | differential pressure transmitter | plate pack fouling | 3 |
| `CH-1301A/B/C` | packaged chiller | chilled water generation | 3 |
| `AC-1302A/B/C` | air cooled condenser | heat rejection to ambient | 3 |
| `V-1401` | expansion vessel | loop expansion and pressurisation | 1 |
| `LT-1401` | level transmitter | expansion vessel level | 1 |
| `TK-1402` | atmospheric tank | glycol makeup inventory | 1 |
| `P-1403` | positive displacement pump | glycol dosing | 1 |
| `TCV-1501` to `TCV-1510` | three-way control valve | block temperature control | 10 |
| `XV-1511` to `XV-1520` | isolation valve | block isolation | 10 |
| `FT-1521` to `FT-1530` | flow transmitter | block coolant flow | 10 |
| `TT-1531` to `TT-1550` | temperature transmitter | block supply and return temperature | 20 |
| `AT-1551` to `AT-1560` | conductivity analyser | block coolant leak detection | 10 |

P1 R-18 requires the ISO 15926-4 class to travel with the tag, because a tag alone is scoped to one plant and one discipline [2], [16]. The Class column is descriptive rather than a resolved reference data library identifier, a defect section 8 records against this document rather than the approach.

### 3.3 Why the control valves matter more than the pumps

The instrument set is where P1's relation vocabulary earns its keep. `TT-1541` observes the return temperature of block 1 and commands nothing, so it carries `monitors`. `TCV-1501` moves metal in response and carries `controls`. Both sit on the same field network and in the same bill of materials, and only the declared relation separates a falsified reading from a coolant flow an attacker can close. P1 R-13 forbids traversing one as the other [2].

## 4. The component leg: the control stack

The site carries six CycloneDX 1.6 documents, one per deliverable unit, each produced by the build system that assembles it. There is no merged site bill of materials, for the reason P1 gives for having no central join registry: a merge reintroduces a single authority and hides which build system vouched for which claim.

Vendor identifiers below are synthetic: namespaces prefixed `example-`, registry hosts under `example.org`, reserved for documentation and unregistrable [20]. No package URL here resolves.

| Bill of materials | Deliverable unit | Representative component identity | Component type |
|:---|:---|:---|:---|
| BOM-RB-BAT | Battery system | `pkg:generic/example-cells/bmu-firmware@2.8.3?arch=armv7e-m` | firmware, module management unit |
| BOM-RB-BAT | Battery system | `pkg:generic/example-cells/rack-bms@4.1.0` | firmware, rack battery management controller |
| BOM-RB-PCS | Power conversion | `pkg:generic/example-power/pcs-control@11.2.4` | firmware, converter control |
| BOM-RB-EMS | Energy management | `pkg:oci/site-controller@sha256:3b1f9c0a7d5e4482b6c1e90f2a7d4c58e3b09a17d642f8c05be31a9f4d7c20e6?repository_url=registry.example.org/example-ems&tag=6.3.2` | container image, site controller |
| BOM-RB-EMS | Energy management | `pkg:pypi/pymodbus@3.6.9` | library, inside the site controller image |
| BOM-RB-PRO | Protection and control | `pkg:generic/example-protection/feeder-relay@1.9.2` | firmware, feeder protection relay |
| BOM-RB-PRO | Protection and control | `pkg:generic/example-protection/xfmr-diff@1.9.2` | firmware, transformer differential protection |
| BOM-RB-THM | Thermal plant automation | `pkg:generic/example-automation/plc-runtime@5.4.0` | firmware, thermal plant controller |
| BOM-RB-THM | Thermal plant automation | `pkg:generic/example-automation/vsd-firmware@7.2.1` | firmware, variable speed drive |
| BOM-RB-THM | Thermal plant automation | `pkg:generic/example-hvac/chiller-ctrl@3.0.6` | firmware, chiller unit controller |
| BOM-RB-NET | Site network | `cpe:2.3:h:example_networks:rugged_switch:2400:*:*:*:*:*:*:*` | hardware, no package coordinate applies [21] |

Two properties of this leg drive what the applied papers can do with it.

**It is the volatile leg.** A firmware upgrade mints a new package URL, correctly, because it is a different artefact. P1 R-12 and R-15 exist for this [2]. The site is specified with versions rather than ranges, and an applied paper modelling an upgrade must mint new identities and say so.

**Not every component has a package URL.** The network switch is hardware and carries a CPE instead [21]. That is not an edge case here; the switchgear, transformers and enclosures all sit in this category. A bill of materials reporting only what has a package coordinate reports the software and calls it the asset.

### 4.1 Where the component leg attaches

Firmware is a constituent, not the asset. Every component above carries `partOf` toward the object it runs inside, with two exceptions. The site controller carries `controls` toward the ten block asset references because it dispatches them, and the thermal plant controller carries `controls` toward the ten control valves and `monitors` toward the block instruments. Those assignments decide whether a site controller compromise reaches the blocks in the graph or silently does not.

## 5. The electrical leg: connection and protection

The electrical leg is a CPAI document, the cyber-physical profile of IEC 61970-301 defined in P2 [3]. CPAI admits shape and refuses quantity, so nothing below carries an impedance, a rating, a tap position or a solved voltage.

| CPAI class | Instances | Exemplar instance | Exemplar `mRID` |
|:---|:---|:---|:---|
| `Substation` | 1 | `SUB-RB01` | `e4cc3030-e621-419f-ae42-35023375eb75` |
| `VoltageLevel` | 4 | `VL-415` | `6282fe57-0ff7-40e2-b024-3bdbd277ee31` |
| `BaseVoltage` | 4 | `BV-415V` | `944b4431-2c68-4e98-924e-9594e84b45d0` |
| `Bay` | 26 | `BAY-415-A01` | `d93a2e1d-9f54-492e-898d-37f57e0022d4` |
| `PowerTransformer` | 14 | `TX-220-01` | `99f76995-8ede-409c-9151-18da85317aca` |
| `Breaker` | 26 | `CB-220-L01` | `fda31807-402b-42fe-be62-17195e92a352` |
| `ProtectionEquipment` | 26 | `PROT-415-A01` | `ee3010f0-5183-40ad-9c48-32dffd7e63a5` |
| `ACLineSegment` | 11 | `ACL-220-01` | `5aee8cc8-dcf8-476b-84aa-224a6cf0d80f` |
| `ConnectivityNode` | 27 | `CN-415-A01` | `db595f8f-3517-43af-b032-acd877dba3f4` |
| `Terminal` | 104 | `T-EC-P1101A` | `742a9710-5cde-4442-b2d6-2a81b1f671e2` |
| `EnergyConsumer` | 11 | `EC-AUX-P1101A` | `0dae4314-dc30-454e-8dd1-5849dee9dcc1` |

Instance counts are modelled and follow from section 2: one 220 kV line bay, two 220 kV transformer bays, ten 33 kV block feeder bays, two auxiliary transformer bays and eleven 415 V auxiliary bays, each with a breaker and a protection device. Transformers are two main, ten block and two auxiliary units.

### 5.1 Completeness level reached

CPAI degrades by completeness level and requires the producer to declare it rather than let a consumer guess [3]. This site reaches **L4**, the highest level P2 section 7 defines.

| Level | Classes that carry it | Present in RefBESS-250MW |
|:---|:---|:---|
| L1 | `IdentifiedObject`, `mRID`, model authority set, relation | Yes. Authority set `https://example.org/mas/refbess-network` |
| L2 | plus `Terminal` and `ConnectivityNode` | Yes. 104 and 27 |
| L3 | plus `Bay`, `VoltageLevel`, `Substation`, `BaseVoltage` | Yes. 26, 4, 1, 4 |
| L4 | plus `Breaker`, `ProtectedSwitch`, `ProtectionEquipment` | Yes. 26 breakers, each a `ProtectedSwitch`, and 26 protection devices |

L4 is what makes this architecture worth specifying rather than assuming. It is the level at which a cyber event traces to a physical action, because the profile can answer what removes supply from an asset and whether that device appears in a bill of materials. Here it does: `PROT-415-A01` is a CIM `ProtectionEquipment` instance and `pkg:generic/example-protection/feeder-relay@1.9.2` is a CycloneDX component, and they are one device.

### 5.2 Two places where CPAI does not fit a battery site

A reference architecture that hides where its profile strains is not doing its job.

**CPAI admits no class for a grid-forming converter.** P2 excludes the direct current and converter classes of the wires package, on the ground that no join question yet distinguishes an AC from a DC supply path, and its own limitations record that grid-scale storage weakens that exclusion every year [3]. This site hits the gap directly. The fifty converters are its defining electrical devices, they carry firmware, and CPAI has nowhere to put them except `ConductingEquipment`, which loses the fact that they are converters. They are carried there and the loss is flagged. P2's next revision should admit the converter classes.

**CPAI defers `Feeder`.** P2 could not confirm the class name against the published UML and refused to admit a class it cannot name [3]. The ten block circuits are what an operator would call feeders. They are carried as `Bay` inside `VL-33`, which is traversable and is not what the objects are called on site.

## 6. Identity assignment across the three legs

A three-way join that cannot be demonstrated on one physical object is a diagram, not a mechanism. This section is why the document exists.

### 6.1 How many objects carry all three identities

Ten objects carry a `TagName`, a package URL for the software inside them, and an `mRID` for their electrical position: four circulation pumps, three chiller packages, three air cooled condensers. Each is a P&ID object, runs firmware, and is an electrical load with its own bay, breaker and protection device.

The glycol dosing pump `P-1403` is the deliberate counter-example. It is a tagged process object and an electrical load, started direct on line with no firmware, so it carries a DEXPI leg and a CIM leg and no CycloneDX leg. P1 R-12 and P2 C-9 both bear on it: a consumer must accept the two-leg join and must not synthesise the third [2], [3]. A reference architecture where every object carries three legs would let an implementation pass without exercising that rule.

### 6.2 The object carrying all three identities

Pump `P-1101A`, one of the four secondary coolant circulation pumps. Its asset reference `09a66af0-8c96-4ed1-b2f2-fb9f0e5c8524` is minted once by the plant model authority and appears unchanged in all three files.

DEXPI leg, on the equipment object that carries the tag, per P1 R-17:

```xml
<Equipment ID="EQ-P-1101A">
  <TagName>P-1101A</TagName>
  <GenericAttributes Set="AssetJoin">
    <GenericAttribute Name="AssetReference"
                      Value="09a66af0-8c96-4ed1-b2f2-fb9f0e5c8524"/>
    <GenericAttribute Name="AssetReferenceRelation" Value="identity"/>
    <GenericAttribute Name="AssetReferenceAuthority"
                      Value="https://example.org/authority/refbess-plant"/>
    <GenericAttribute Name="AssetReferenceBasis"
                      Value="PID-RB-COOL-101 rev C 2026-08-14"/>
  </GenericAttributes>
</Equipment>
```

CycloneDX 1.6 leg, on the variable speed drive firmware inside the pump's drive, in `BOM-RB-THM`:

```json
{
  "type": "firmware",
  "bom-ref": "pkg:generic/example-automation/vsd-firmware@7.2.1",
  "name": "vsd-firmware",
  "version": "7.2.1",
  "purl": "pkg:generic/example-automation/vsd-firmware@7.2.1",
  "properties": [
    { "name": "assetjoin:ref",
      "value": "09a66af0-8c96-4ed1-b2f2-fb9f0e5c8524" },
    { "name": "assetjoin:relation", "value": "partOf" },
    { "name": "assetjoin:authority",
      "value": "https://example.org/authority/refbess-build" },
    { "name": "assetjoin:basis", "value": "BUILD-RB-2026-0831 2026-08-31" }
  ]
}
```

CPAI leg, on the `EnergyConsumer` that represents the pump motor as a load, per P2 C-2 and C-3:

```
cim:EnergyConsumer
  cim:IdentifiedObject.mRID      "0dae4314-dc30-454e-8dd1-5849dee9dcc1"
  cim:IdentifiedObject.name      "EC-AUX-P1101A"
  join:assetReference            "09a66af0-8c96-4ed1-b2f2-fb9f0e5c8524"
  join:relation                  "identity"
  join:authority                 "https://example.org/authority/refbess-network"
  join:basis                     "NM-RB-EXPORT-2026-Q3 2026-08-20"
  join:modelAuthoritySet         "https://example.org/mas/refbess-network"
```

Three files, one asset reference. A `TagName` a plant engineer wrote, a package URL a build system minted, an `mRID` a network model tool assigned. None touched, none promoted over the others.

### 6.3 The L4 chain that hangs off it

L4's value is what the CIM leg makes traversable from that one binding, using only associations CPAI admits and the document declares, as P2 C-8 requires:

| Step | Object | `mRID` |
|:---|:---|:---|
| load | `EC-AUX-P1101A` | `0dae4314-dc30-454e-8dd1-5849dee9dcc1` |
| connection point | `T-EC-P1101A` | `742a9710-5cde-4442-b2d6-2a81b1f671e2` |
| shared point | `CN-415-A01` | `db595f8f-3517-43af-b032-acd877dba3f4` |
| what opens it | `CB-415-A01`, `Breaker` | `72c08317-0300-49f2-ba83-df1869f3d755` |
| what trips it | `PROT-415-A01`, `ProtectionEquipment` | `ee3010f0-5183-40ad-9c48-32dffd7e63a5` |
| cubicle | `BAY-415-A01` | `d93a2e1d-9f54-492e-898d-37f57e0022d4` |
| voltage level | `VL-415`, at `BV-415V` | `6282fe57-0ff7-40e2-b024-3bdbd277ee31` |
| station | `SUB-RB01` | `e4cc3030-e621-419f-ae42-35023375eb75` |

`PROT-415-A01` runs firmware and appears in `BOM-RB-PRO`, so the traversal closes. A disclosure against that relay firmware reaches, in declared hops and no inference, the breaker that feeds the pump that circulates the coolant that holds the cells inside the band of section 3. That is the chain the programme exists to make computable, and RefBESS-250MW is the smallest asset on which every hop is real.

### 6.4 Relation assignment across the site

| Leg and object class | Relation carried | Toward |
|:---|:---|:---|
| DEXPI equipment object | `identity` | its own asset reference |
| DEXPI instrument object, transmitter | `monitors` | the asset it observes |
| DEXPI instrument object, control valve | `controls` | the asset whose state it moves |
| DEXPI piping segment feeding a block | `supplies` | the block asset reference |
| CycloneDX firmware inside a device | `partOf` | the device asset reference |
| CycloneDX site controller | `controls` | the ten block asset references |
| CPAI `EnergyConsumer` for a plant load | `identity` | the load's asset reference |
| CPAI `ACLineSegment` or `Breaker` feeding a load | `supplies` | the load's asset reference |
| CPAI `ProtectionEquipment` | `controls` | the switch it operates |

Nine assignments drawn from the five relations P1 permits, none invented. The vocabulary held on this site, one small piece of evidence that five is enough. P1 records the opposite risk and this document does not settle it.

## 7. What this reference architecture deliberately omits

Each omission is a decision. This document is a target for analysis, not an analysis.

**No quantities on the electrical leg.** No impedance, admittance, rating, tap position, injection or solved voltage. CPAI excludes them, and a producer required to supply them supplies no CIM leg at all [3].

**No measurement objects.** The `monitors` relation sits in the monitoring device's own leg, with its firmware. Admitting CIM measurement classes would model one relationship twice with no rule for reconciling the two [3].

**No IEC 61850 substation configuration file, and no geography.** A battery site has an SCL file and it is a plausible fourth leg; P2 draws that boundary and this document does not cross it. `Substation` localises every asset well enough for the questions the join asks.

**No commercial model, cell data sheet or fire safety design.** Cost, dispatch strategy, cycle life, C-rate limits and warranty terms change no identity, and inventing them would produce numbers that look measured. NFPA 855 is named as applicable [14] and deflagration venting, suppression and detection are out of scope; section 3 gives one modelled separation distance, not a code minimum.

**No dynamics, and no network beyond the coupling point.** Inertia emulation, droop settings and fault ride-through belong to a stability study on a timescale the join does not reach. The site stops at the 220 kV connection; attaching it to a wider network is a later paper's decision, and RefDNSP-1.2M is the obvious candidate [8].

## 8. Limitations

**No such site exists, so nothing here is validated against a real installation.** Every modelled parameter was chosen by the author, and the sourced rows point at published standards and literature, not a survey of built plant. Section 2 represents nothing except itself.

**The thermal parameters are internally consistent and unverified against a vendor design.** The 8.0 MW duty follows from two assumed efficiencies, the flows from the duty and an assumed specific heat, the pump power from the flow and an assumed hydraulic efficiency. Change any assumption and the chain moves together, which makes it useful for a worked example and useless for procurement. No vendor has been asked whether 4.0 MW chiller packages exist in the configuration section 3 assumes.

**The CIM leg reaches L4 by construction, not because a real export was inspected.** The instance counts in section 5 were derived from the arrangement in section 2, not read out of a CIM RDF XML file. P2 states that nothing in CPAI has been tested against a real export [3]. This document supplies a target for that test, not the test.

**A synthetic asset cannot show the join survives a real operator's naming discipline.** Every tag follows one convention, every package URL is well formed, every `mRID` is a canonical UUID [22]. Real sites carry tags that changed when a contractor changed, components with no version string, and network models whose `mRID` values differ between exports of one circuit. The join's hard cases are in that gap and none appear here.

**The ISO 15926-4 classes are described, not resolved.** Section 3.2 names classes in words. P1 R-18 requires the reference data library class to travel with the tag [2], which needs a resolved identifier from ISO 15926-4 [16], and the authors do not hold the library. A defect in this document, correctable by substitution.

**No package URL here resolves and none can be tested.** Synthetic namespaces are right for a document that must not be mistaken for a real vendor's product [20], and the cost is that no tool can run against them. Jurisdiction is the same kind of limit: the 50 Hz rows are sourced to one frequency operating standard [9], and the claim that a 60 Hz site moves the electrical leg's parameters and none of its identities is made here and not tested.

**Two CPAI classes carry objects they do not describe.** Section 5.2 sets this out: converters as `ConductingEquipment`, block circuits as `Bay`. Both are findings against P2 rather than defects hidden in a table.

**The three as-built dates demonstrate a problem, they do not resolve it.** P1 R-8 makes basis divergence visible rather than removing it [2]. An applied paper computing against RefBESS-250MW inherits an inconsistent set and must say what it did about it.

## 9. References

1. **Creative Commons.** *Attribution 4.0 International (CC BY 4.0) Legal Code.* Creative Commons Corporation, 2013.
2. **McKenney, J.** *The Three-Identity Join: DEXPI 2.0, CycloneDX 1.6 and IEC 61970 CIM.* P1 of the three-schema programme, Eigenia WG-05-CAD, 2026.
3. **McKenney, J.** *CIM Profile for Cyber-Physical Asset Identity (CPAI).* P2 of the three-schema programme, defining the profile and its completeness levels L0 to L4, Eigenia WG-05-CAD, 2026.
4. **McKenney, J.** *Conformance Suite and Reference Implementation.* P3 of the three-schema programme, Eigenia WG-05-CAD, 2026.
5. **DEXPI e.V.** *DEXPI 2.0 Specification.* Released 10 October 2025, published on GitLab under the Creative Commons Attribution 4.0 International licence.
6. **OWASP Foundation and Ecma International.** *CycloneDX Bill of Materials Specification.* ECMA-424, 1st edition, June 2024, defining CycloneDX 1.6. Ecma International Technical Committee 54.
7. **International Electrotechnical Commission.** *IEC 61970-301: Energy management system application program interface (EMS-API), Part 301: Common information model (CIM) base.*
8. **McKenney, J.** *Cascading Failure Hypothesis.* Eigenia WG-04-CF, 2026. Specifies RefDNSP-1.2M.
9. **Australian Energy Market Commission, Reliability Panel.** *Frequency Operating Standard.* In effect 9 October 2023. Sets nominal system frequency 50 Hz and a normal operating band of 49.85 Hz to 50.15 Hz.
10. **International Energy Agency.** *Battery storage is scaling up and taking on a larger system role.* IEA commentary, Paris. Reports utility-scale durations clustering in the one to four hour band, the commissioned average rising from about two hours in 2023 to about three in 2025.
11. **International Organization for Standardization.** *ISO 668: Series 1 freight containers, Classification, dimensions and ratings.*
12. **Ma, S., Jiang, M., Tao, P., Song, C., Wu, J., Wang, J., Deng, T., and Shang, W.** *Temperature effect and thermal impact in lithium-ion batteries: A review.* Progress in Natural Science: Materials International, vol. 28, no. 6, pp. 653 to 666, December 2018. Gives 15 °C to 35 °C as the band where cell performance is high and degradation moderate.
13. **International Electrotechnical Commission.** *IEC 62933-5-2: Electrical energy storage (EES) systems, Part 5-2: Safety requirements for grid-integrated EES systems, Electrochemical-based systems.* 2025 edition.
14. **National Fire Protection Association.** *NFPA 855: Standard for the Installation of Stationary Energy Storage Systems.* Cited for applicability only; no clause-level requirement here was verified against the standard text.
15. **International Electrotechnical Commission.** *IEC 62443-3-3:2013: Industrial communication networks, Network and system security, Part 3-3: System security requirements and security levels.* First edition, August 2013.
16. **International Organization for Standardization.** *ISO 15926-4: Integration of life-cycle data for process plants including oil and gas production facilities, Part 4: Initial reference data.* International Standard.
17. **Ecma International.** *Package URL (purl) Specification.* ECMA-427, 1st edition, December 2025. Ecma International Technical Committee 54.
18. **International Electrotechnical Commission.** *IEC 61970-600-1:2021: Common Grid Model Exchange Standard (CGMES), Structure and rules.* International Standard, edition 1.0, 4 June 2021, cancelling and replacing the 2017 Technical Specification of the same number.
19. **International Electrotechnical Commission.** *IEC 61970-600-2:2021: Common Grid Model Exchange Standard (CGMES), Exchange profiles specification.* International Standard, edition 1.0, 4 June 2021, cancelling and replacing the 2017 Technical Specification of the same number.
20. **Eastlake, D. and Panitz, A.** *Reserved Top Level DNS Names.* RFC 2606, BCP 32, Internet Engineering Task Force, June 1999. Reserves `example.org` for documentation use.
21. **Cheikes, B. A., Waltermire, D., and Scarfone, K.** *Common Platform Enumeration: Naming Specification Version 2.3.* NISTIR 7695, NIST, August 2011.
22. **Davis, K., Peabody, B., and Leach, P.** *Universally Unique IDentifiers (UUIDs).* RFC 9562, Internet Engineering Task Force, May 2024.
