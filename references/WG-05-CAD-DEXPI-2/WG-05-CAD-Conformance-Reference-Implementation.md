| Field | Value |
|:---|:---|
| Designation | P3, conformance suite and reference implementation of the three-schema programme |
| Status | Draft for submission |
| Normative language | RFC 2119 |
| Licence | Creative Commons Attribution 4.0 International (CC BY 4.0) |
| Tests | P1, The Three-Identity Join, requirements R-1 to R-35 |
| Target bodies | DEXPI e.V.; the CycloneDX project; IEC TC 57 |

## 1. Scope

P1 defines the three-identity join and numbers its obligations R-1 to R-35 so that a conformance rule can be written against each one individually [1]. This document writes those rules. It supplies a validation rule for every requirement that can carry one, names the requirements that cannot carry one and says what a human reviewer must do instead, gives test vectors a validator can consume without further interpretation, and defines the three round-trip cases P1 section 8.3 defers to this paper.

The key words MUST, MUST NOT, SHOULD, SHOULD NOT and MAY are to be interpreted as described in RFC 2119 [2]. This document is offered under the Creative Commons Attribution 4.0 International licence [15], the same licence P1 carries, so a receiving body can merge either paper without a licence conflict.

P3 sits ahead of P2 in this programme's sequence. A specification submitted without a conformance suite and test vectors is admired and not adopted, because no reviewer can tell what an implementer would have to build. The CIM profile P2 defines is the larger piece of work, and it cannot be tested until a test method exists.

### 1.1 What this document does not do

It does not change a requirement. Every rule in section 3 cites the P1 requirement it enforces. A rule with no corresponding requirement is either a missing requirement in P1 or an invented rule here, and both are defects; section 3.4 records the checks made to prove neither happened.

It does not define the CIM profile. R-27 and R-30 stay deferred to P2 [1], and this suite marks the CIM leg's schema rules as unrunnable rather than pretending otherwise.

It does not establish that any file is true. Section 6 treats that at length and it is the section that matters most.

### 1.2 The requirement baseline this suite tests

This suite is written against the P1 text current at 7 September 2026, in which the DEXPI leg is carried by a DEXPI Profile. An earlier draft named the DEXPI Standard Library, and the carrier moved because DEXPI e.V.'s August 2026 update describes the Profile and does not mention a Standard Library [9]. Thirty-one of the thirty-five requirements are byte-identical to their earlier form; R-17 and R-19 were carrier renames and R-20's obligation is unchanged. R-16 is the one requirement whose substance moved, because it names a different artefact, so a rule written against the older text tests the wrong thing. V-16 is written against the Profile and carries the open question P1 section 3.1 records: whether a Profile may license an added attribute set is not settled in published text, and this suite does not settle it.

## 2. What a conformant unified file is

There is no unified file in the sense of a merged document, and P1 rules one out for good reasons [1]. What this suite calls a unified file is a single file of a single leg, valid against its own specification, carrying one or more join assertions. Conformance is a property of that file, of the process that wrote it, or of the process that reads it, and the three are tested differently.

### 2.1 The unit under test

A **join assertion** is a four-field tuple attached to one object in one file: an asset reference, a relation, an asserting authority and an as-built basis, with an optional binding instant. R-3 fixes the cardinality at exactly one of the first four per assertion [1].

A **leg file** is a DEXPI file, a CycloneDX document or a CIM model carrying at least one join assertion.

A **corpus** is a set of leg files presented together. Cross-file rules, meaning V-14 and the round-trips, run against a corpus. Every other file rule runs against one leg file in isolation, because most real validation happens where one file is produced and the siblings are not to hand.

### 2.2 The conformance statement

R-34 requires an implementation to state which roles and legs it implements and the version of each standard it implements against, and forbids an unqualified claim [1]. A statement in prose cannot be checked, so this suite defines a machine-readable form. It carries no new obligation; it is R-34 written down in a shape a validator can read.

```json
{
  "specification": "P1-three-identity-join",
  "roles": ["producer", "joiner"],
  "legs": ["dexpi", "cyclonedx"],
  "standardVersions": {
    "dexpi": "DEXPI 2.0",
    "cyclonedx": "1.6 (ECMA-424, 1st edition, June 2024)"
  },
  "namespaceRegistration": { "cyclonedx": "provisional" },
  "legValidation": {
    "cyclonedx": { "validator": "cyclonedx-cli 0.27.2", "result": "pass" }
  },
  "provisional": true
}
```

The roles are P1's, unchanged: producer writes assertions, consumer reads and traverses them, joiner mints asset references and is a model authority in the CIM sense [1]. This suite adds only the obligation that the claim be legible. An implementation that will not say which legs it writes cannot be tested against the leg rules, and a validator treats a missing statement as a failure of R-34, not a pass by default.

`provisional` is the flag P1 section 8.3 requires on a self-declaration made before this suite is published, and R-22 requires on use of the `assetjoin` namespace before its registration with the CycloneDX property taxonomy completes [1], [7].

### 2.3 Severities

Three outcomes, and the third is the one most suites omit.

**Error.** A MUST or MUST NOT is violated. The file, or the implementation, is non-conformant.

**Warning.** A SHOULD is not met. R-8's second clause and R-15 produce warnings, because P1 states them as SHOULD and a suite that promotes a SHOULD to an error is testing a specification it invented.

**Unverifiable.** The form is correct and the substance is outside what a machine can see. Every class B rule emits this alongside its pass. A validator that reports only pass and fail teaches an assessor that a green run means the file is right, which is the misreading section 6 exists to prevent.

## 3. Validation rules

Rule identifiers mirror requirement numbers. V-04 tests R-4. Where a requirement needs two rules, they are lettered. Where a requirement number has no rule, the gap in the sequence is deliberate and section 3.3 says why.

The class column states what a passing rule proves.

**A.** The rule decides the requirement. A pass means the requirement is met.

**B.** The rule checks form only. A pass means the file is shaped correctly and says nothing about whether the content is true. A human reviewer decides.

**C.** No mechanical rule exists. Section 3.3 covers these.

### 3.1 Rules on the form of an assertion, R-1 to R-15

| Rule | P1 requirement | What the rule checks | How it fails | Class |
|:---|:---|:---|:---|:---|
| V-01 | R-1 | The asset reference matches the canonical hyphenated lowercase UUID form of RFC 9562 [3], including version and variant nibbles | `E-REF-FORM`, quoting the offending value | A |
| V-03 | R-3 | Exactly one asset reference, one relation, one authority and one basis per assertion | `E-CARD`, naming the field and the count found | A |
| V-04 | R-4 | The relation is one of `identity`, `partOf`, `controls`, `supplies`, `monitors` | `E-REL-UNKNOWN`, quoting the value | A |
| V-05 | R-5 | At most one `identity` assertion per asset reference within one file | `E-IDENTITY-DUP`, listing both objects | A |
| V-06a | R-6 | The assertion carries a relation | `E-REL-ABSENT` | A |
| V-06b | R-6 | Consumer probe: given an assertion with no relation, the consumer rejects it and does not default it to `identity` | `E-CONSUMER-DEFAULTED` | A |
| V-07 | R-7 | The authority parses as an absolute URI under RFC 3986 [4], carrying a scheme | `E-AUTH-NOT-URI` | B |
| V-08a | R-8 | The basis is present and non-empty | `E-BASIS-ABSENT` | B |
| V-08b | R-8 | The basis carries a document identifier, a revision and an issue date, the SHOULD clause | `W-BASIS-SHAPE` | B |
| V-09 | R-9 | No local identity field of a leg holds an identifier belonging to another leg, tested against the known shapes of `purl`, `mRID` and `TagName` | `E-FOREIGN-ID`, naming the field and the shape matched | B |
| V-10 | R-10 | The file validates against its own specification with all join assertions present | `E-SCHEMA-INVALID`, quoting the validator's own message | B |
| V-11 | R-11 | Producer driver: identifiers supplied as input appear in the output byte for byte, with no normalisation, truncation or re-minting | `E-ID-MUTATED`, showing input and output side by side | B |
| V-12 | R-12 | Consumer probe: an asset reference present in only one file of the corpus is reported as unjoined and no missing leg is synthesised | `E-LEG-SYNTHESISED` | A |
| V-13 | R-13 | Consumer probe: traversal follows the declared direction, a `monitors` relation is never traversed as `controls`, and no directed relation is inverted | `E-TRAVERSAL-DIRECTION`, naming the relation | A |
| V-14 | R-14 | Two files asserting `identity` for one asset reference are reported as a conflict and neither is silently selected | `E-IDENTITY-CONFLICT`, listing both bindings | B |
| V-15 | R-15 | A binding instant is present, and where the leg's format offers a native timestamp field the producer used it | `W-INSTANT-ABSENT`, `W-INSTANT-NOT-NATIVE` | A |

V-06b, V-12 and V-13 are behavioural probes rather than file checks, because R-6, R-12 and R-13 constrain a consumer rather than a document. Each presents a vector from section 4 and inspects the consumer's output. This is the part an implementer is most likely to skip, and it is the part that keeps a compromised transmitter and a compromised positioner distinguishable, which P1 section 4.2 identifies as carrying most of the analytic weight [1].

V-14 is class B for a reason worth stating. The collision is a string comparison and is mechanically detectable. P1's actual condition, that the objects "are not the same asset", is not. Two files may legitimately assert `identity` for one reference when they describe the same asset from two model authorities. The validator reports the collision; a human decides whether it is a duplicate binding or a mistake by the model authority.

### 3.2 Rules on the three legs and on the roles, R-16 to R-35

| Rule | P1 requirement | What the rule checks | How it fails | Class |
|:---|:---|:---|:---|:---|
| V-16 | R-16 | The DEXPI join artefact declares no new DEXPI class | `E-DEXPI-NEW-CLASS`, naming the class | B |
| V-17 | R-17 | The attribute set attaches to the object carrying the `TagName`, not to a drawing, shape, symbol or presentation element | `E-ATTACH-GRAPHIC`, naming the parent object | A |
| V-18 | R-18 | An ISO 15926-4 class is stated alongside the tag | `E-RDL-CLASS-ABSENT` | B |
| V-21 | R-21 | The join properties sit in the `properties` array of a `component` or `service`, never at document metadata level | `E-META-LEVEL` | A |
| V-22 | R-22 | The namespace used appears in a pinned snapshot of the CycloneDX property taxonomy [7]; if it does not, the conformance statement carries `provisional` | `E-NAMESPACE-UNDECLARED` | B |
| V-23 | R-23 | No join property name sits in, shadows or redefines a name in the `cdx` namespace | `E-CDX-SHADOW`, quoting the name | A |
| V-24 | R-24 | The document validates against the unmodified CycloneDX 1.6 schema [5], in whichever of JSON or XML it uses | `E-CDX-INVALID` | A |
| V-25 | R-25 | Where a component's relation is `partOf` and a component representing the asset exists in the same document, the two are connected in `dependencies` | `E-DEP-EDGE-MISSING` | A |
| V-26 | R-26 | No CycloneDX property value matches the shape of a `TagName` or an `mRID` | `E-TAG-LEAK`, `E-MRID-LEAK` | B |
| V-28 | R-28 | The assertion attaches to an `IdentifiedObject` and the recorded `mRID` equals the value in the source model | `E-MRID-ALTERED` | B |
| V-29a | R-29 | The model authority set is stated alongside the `mRID` | `E-MAS-ABSENT` | A |
| V-29b | R-29 | Consumer probe: an `mRID` presented without its authority set is not treated as resolvable | `E-MRID-ASSUMED-GLOBAL` | A |
| V-30 | R-30 | The conformance statement does not assert CIM profile conformance | `E-CIM-OVERCLAIM` | B |
| V-31 | R-31 | Aggregate: for a producer, V-01 to V-11 pass on every leg file it wrote, and the leg rules for those legs pass | `E-ROLE-PRODUCER`, listing the failing rules | B |
| V-32 | R-32 | Aggregate: for a consumer, V-06b, V-12, V-13 and V-14 pass | `E-ROLE-CONSUMER` | B |
| V-33 | R-33 | Joiner probe: over a sample of minted asset references, the joiner returns the basis on which each leg was bound | `E-ROLE-JOINER`, naming the reference it could not answer for | B |
| V-34 | R-34 | The conformance statement names roles, legs and the version of each standard, and makes no unqualified claim | `E-CLAIM-UNQUALIFIED` | A |
| V-35 | R-35 | Every leg the statement claims carries a recorded native-schema validation with a passing result | `E-UNVALIDATED-CLAIM`, naming the leg | B |

V-10 and V-24 overlap deliberately. R-10 is general across all three legs and R-24 is the CycloneDX restatement of it. V-24 runs today against a public schema. V-10 runs today only for the CycloneDX leg; for DEXPI it is blocked by the provisional serialization binding P1 section 5.2 records, and for CIM until P2 defines the profile. A validator MUST report V-10 as unrunnable for those legs rather than as a pass, because a skipped check that prints green is worse than no check.

V-18 is class B because presence is mechanical and resolution is not. The rule confirms a class is stated. Confirming the stated class exists in the ISO 15926-4 reference data library [10], and is the right class for the equipment, needs the library and an engineer who knows the plant. A pump tagged with a heat exchanger class passes V-18 and is wrong.

V-26 is class B because only one of its two targets has a machine-recognisable shape. An `mRID` is conventionally a UUID, so a UUID in a join property other than `assetjoin:ref` is a strong signal and the rule catches it. A `TagName` follows a plant's own convention, so the rule catches `P-101` and `TK-2201A` by pattern and misses a site whose tags look like ordinary words. P1 names this leg as the one where R-9 is most often violated [1]. The rule reduces that risk; it does not remove it.

### 3.3 Requirements with no mechanical rule

Four requirements have no rule. Each is named here with what a human reviewer must do instead.

| P1 requirement | Why no rule exists | What a reviewer must do |
|:---|:---|:---|
| R-2, an asset reference MUST NOT be reused for a different asset, in any file, at any time | Universally quantified over an open, unbounded corpus. A validator sees the files presented to it. Reuse in a file it was never shown is undetectable in principle, and "a different asset" is a judgement about the physical world | Audit the joiner's minting register. Confirm one reference per asset and that the register is append-only. This is a process audit of a model authority, not a file check |
| R-19, a DEXPI file carrying the Profile MUST validate against the DEXPI 2.0 Specification | Mechanical in principle and unrunnable in practice. P1 section 5.2 states the binding of the four attributes to concrete DEXPI XML elements is unconfirmed against the published schema, and section 9 records it as an open item [1]. A validator cannot be written against an element spelling that is not settled | Validate the file with a DEXPI 2.0 validator once the serialization binding is confirmed against the published schema [8]. Until then, record V-10 for the DEXPI leg as unrunnable and do not claim the leg under R-35 |
| R-20, the Profile MUST NOT relax any constraint the base specification declares | Requires the published Profile text and a constraint-level comparison against the base specification. DEXPI e.V. describes the Profile in its August 2026 update; the Profile text is not published [9] | A DEXPI reviewer compares the Profile's constraints against the base specification by hand. This is the same review the specification teams would run on any Profile submission |
| R-27, the CIM leg MUST be expressed as a profile over IEC 61970-301 and MUST NOT add classes to the CIM UML | The profile is P2's subject. R-30 forbids claiming CIM profile conformance on P1 alone, so there is nothing yet to validate a CIM leg against [1], [11] | Defer. V-30 checks that no implementation claims what P2 has not yet defined, which is the only obligation P1 places here today |

R-2 is the one that cannot be fixed by publishing a missing document. The other three are blocked on artefacts that do not exist yet and become mechanical when they do.

### 3.4 Coverage, stated honestly

Thirty-five requirements. Thirty-one carry a mechanical rule; four do not.

Of the thirty-one, fifteen are class A, where a passing rule decides the requirement: R-1, R-3, R-4, R-5, R-6, R-12, R-13, R-15, R-17, R-21, R-23, R-24, R-25, R-29, R-34.

Sixteen are class B, where the rule checks form and a human decides the substance: R-7, R-8, R-9, R-10, R-11, R-14, R-16, R-18, R-22, R-26, R-28, R-30, R-31, R-32, R-33, R-35.

Four are class C, with no mechanical rule at all: R-2, R-19, R-20, R-27.

So twenty of the thirty-five need human review before a conformance claim means anything, and that is a majority. An assessor reading a green run is looking at fifteen decided requirements out of thirty-five. The suite carries thirty-two rules across thirty-one requirements, and no requirement is left with neither a rule nor a named human procedure.

Two checks were run on this mapping. Every rule in sections 3.1 and 3.2 cites exactly one P1 requirement, and no rule cites a requirement that does not exist. Every one of R-1 to R-35 appears either in a rule row or in the table of section 3.3. A rule with no requirement behind it would be an invented obligation, to be removed here or raised as a defect in P1; none was found.

## 4. Test vectors

Vectors are files, not descriptions. F-0 is complete and pasteable. Every failure vector is a minimal substitution into F-0, stated as the component or attribute set to replace, so that one vector demonstrates one failure and a reader can see which line caused it.

### 4.1 How the DEXPI vectors are expressed, and why

P1 section 5.2 states that the binding of the four attributes to concrete DEXPI XML elements MUST be confirmed against the published DEXPI 2.0 schema before submission, and section 9 records the serialization binding as provisional [1]. Presenting an unverified encoding as a vector would make this suite the thing that fixes a spelling nobody has confirmed.

**The choice made here: the DEXPI vectors are expressed at the level of the attribute set, not the wire format.** Each gives attribute names, values and the object they attach to. No DEXPI XML appears in this document. The requirement that binds is R-17, the attachment point, and it is testable without an element spelling. When the binding is confirmed against the published schema [8], a serialization vector can be added without changing a rule.

The CycloneDX vectors are given in full JSON, because CycloneDX 1.6 is standardised as ECMA-424 and its schema is public and settled [5]. The CIM vectors are given as property lists, because the CIM profile is P2's subject and no serialization is fixed here.

### 4.2 F-0, the minimal conformant vector

CycloneDX leg. A complete CycloneDX 1.6 document with one asset component, one firmware component bound to it, and the dependency edge R-25 requires.

```json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.6",
  "version": 1,
  "metadata": { "timestamp": "2026-04-12T09:14:00Z" },
  "components": [
    {
      "type": "device",
      "bom-ref": "asset-pump-101",
      "name": "centrifugal pump",
      "properties": [
        { "name": "assetjoin:ref", "value": "3f2a91c4-7b60-4d1e-9a55-0c8e21b4f7d2" },
        { "name": "assetjoin:relation", "value": "identity" },
        { "name": "assetjoin:authority", "value": "https://example.org/authority/plant-engineering" },
        { "name": "assetjoin:basis", "value": "PID-COOL-004 rev D 2026-04-18" }
      ]
    },
    {
      "type": "firmware",
      "bom-ref": "fw-vfd-421",
      "name": "vfd-firmware",
      "version": "4.2.1",
      "purl": "pkg:generic/vfd-firmware@4.2.1",
      "properties": [
        { "name": "assetjoin:ref", "value": "3f2a91c4-7b60-4d1e-9a55-0c8e21b4f7d2" },
        { "name": "assetjoin:relation", "value": "partOf" },
        { "name": "assetjoin:authority", "value": "https://example.org/authority/platform-build" },
        { "name": "assetjoin:basis", "value": "BUILD-2026-0412 2026-04-12" }
      ]
    }
  ],
  "dependencies": [
    { "ref": "asset-pump-101", "dependsOn": ["fw-vfd-421"] }
  ]
}
```

DEXPI leg, at attribute-set level. The attachment object is the equipment object carrying the tag, which is what R-17 fixes.

```text
attach to:  equipment object carrying TagName "P-101"
TagName                     P-101
ISO15926-4Class             centrifugal pump
AssetReference              3f2a91c4-7b60-4d1e-9a55-0c8e21b4f7d2
AssetReferenceRelation      identity
AssetReferenceAuthority     https://example.org/authority/plant-engineering
AssetReferenceBasis         PID-COOL-004 rev D 2026-04-18
```

CIM leg, as a property list on the identified object representing the supplying circuit.

```text
cim:ConductingEquipment
  cim:IdentifiedObject.mRID   c81d4e2e-bcf2-11e6-869b-7df92533d2db
  join:assetReference         3f2a91c4-7b60-4d1e-9a55-0c8e21b4f7d2
  join:relation               supplies
  join:authority              https://example.org/authority/network-model
  join:basis                  NM-EXPORT-2026-Q2 2026-04-30
  join:modelAuthoritySet      https://example.org/mas/distribution-south
```

Expected result: all rules pass, with `W-INSTANT-ABSENT` on the DEXPI and CIM legs under V-15, because neither carries a binding instant and R-15 is a SHOULD. The CycloneDX leg carries `metadata.timestamp`, which is the native field R-15 prefers.

### 4.3 Failure vectors

Each block replaces the corresponding part of F-0. Nothing else changes.

**F-01, R-1, asset reference not in canonical form.** Braces and uppercase.

```json
{ "name": "assetjoin:ref", "value": "{3F2A91C4-7B60-4D1E-9A55-0C8E21B4F7D2}" }
```

Expected: `E-REF-FORM` from V-01.

**F-02, R-3, two asset references on one component.**

```json
"properties": [
  { "name": "assetjoin:ref", "value": "3f2a91c4-7b60-4d1e-9a55-0c8e21b4f7d2" },
  { "name": "assetjoin:ref", "value": "9b17c0aa-2f43-4d92-a1e0-6c5b8de4f011" },
  { "name": "assetjoin:relation", "value": "partOf" },
  { "name": "assetjoin:authority", "value": "https://example.org/authority/platform-build" },
  { "name": "assetjoin:basis", "value": "BUILD-2026-0412 2026-04-12" }
]
```

Expected: `E-CARD` from V-03, naming `assetjoin:ref` with a count of two.

**F-03, R-4, relation outside the closed vocabulary.**

```json
{ "name": "assetjoin:relation", "value": "dependsOn" }
```

Expected: `E-REL-UNKNOWN` from V-04. A rejection, not a warning; P1 section 6.1 is explicit on that point [1].

**F-04, R-5, two identity assertions for one reference in one file.** Set the firmware component's relation to `identity` while the asset component keeps it.

```json
{ "name": "assetjoin:relation", "value": "identity" }
```

Expected: `E-IDENTITY-DUP` from V-05, listing `asset-pump-101` and `fw-vfd-421`.

**F-05, R-6, relation absent.** Remove the relation property from the firmware component.

```json
"properties": [
  { "name": "assetjoin:ref", "value": "3f2a91c4-7b60-4d1e-9a55-0c8e21b4f7d2" },
  { "name": "assetjoin:authority", "value": "https://example.org/authority/platform-build" },
  { "name": "assetjoin:basis", "value": "BUILD-2026-0412 2026-04-12" }
]
```

Expected: `E-REL-ABSENT` from V-06a. A consumer fed this vector MUST reject the assertion; defaulting it to `identity` raises `E-CONSUMER-DEFAULTED` from V-06b.

**F-06, R-7, authority is not an absolute URI.**

```json
{ "name": "assetjoin:authority", "value": "plant-engineering" }
```

Expected: `E-AUTH-NOT-URI` from V-07.

**F-07, R-8, basis absent.** Remove `assetjoin:basis` from the firmware component.

Expected: `E-BASIS-ABSENT` from V-08a. A basis of `"rev D"` alone passes V-08a and raises `W-BASIS-SHAPE` from V-08b, because it states a revision without a document identifier or an issue date.

**F-08, R-9 and R-26, a plant tag copied into a CycloneDX property.**

```json
{ "name": "assetjoin:tag", "value": "P-101" }
```

Expected: `E-TAG-LEAK` from V-26 and `E-FOREIGN-ID` from V-09. This is the violation P1 predicts for this leg, and the one an implementer will produce by accident.

**F-09, R-21, assertion at document metadata level.**

```json
"metadata": {
  "timestamp": "2026-04-12T09:14:00Z",
  "properties": [
    { "name": "assetjoin:ref", "value": "3f2a91c4-7b60-4d1e-9a55-0c8e21b4f7d2" },
    { "name": "assetjoin:relation", "value": "identity" }
  ]
}
```

Expected: `E-META-LEVEL` from V-21.

**F-10, R-25, `partOf` with no dependency edge.** Remove the `dependencies` array from F-0.

Expected: `E-DEP-EDGE-MISSING` from V-25. The firmware component asserts `partOf` and the asset component is in the same document, so the edge is required.

**F-11, R-23, the `cdx` namespace shadowed.**

```json
{ "name": "cdx:assetjoin:ref", "value": "3f2a91c4-7b60-4d1e-9a55-0c8e21b4f7d2" }
```

Expected: `E-CDX-SHADOW` from V-23.

**F-12, R-17, DEXPI attributes attached to a presentation element.**

```text
attach to:  shape element rendering equipment "P-101" on drawing sheet 3
AssetReference              3f2a91c4-7b60-4d1e-9a55-0c8e21b4f7d2
AssetReferenceRelation      identity
AssetReferenceAuthority     https://example.org/authority/plant-engineering
AssetReferenceBasis         PID-COOL-004 rev D 2026-04-18
```

Expected: `E-ATTACH-GRAPHIC` from V-17. The binding does not survive a redraw, which is why R-17 exists.

**F-13, R-18, DEXPI leg with no ISO 15926-4 class.** Remove the `ISO15926-4Class` line from the F-0 DEXPI leg.

Expected: `E-RDL-CLASS-ABSENT` from V-18. A tag alone is scoped to one plant and one discipline.

**F-14, R-29, CIM leg with no model authority set.** Remove `join:modelAuthoritySet` from the F-0 CIM leg.

Expected: `E-MAS-ABSENT` from V-29a. A consumer that then treats the bare `mRID` as globally resolvable raises `E-MRID-ASSUMED-GLOBAL` from V-29b.

**F-15, R-12, an unjoined reference.** Present the F-0 CycloneDX document alone, with no DEXPI or CIM leg in the corpus.

Expected: the consumer reports the asset reference as unjoined. Synthesising a DEXPI or CIM leg raises `E-LEG-SYNTHESISED` from V-12. The file rules pass; this vector tests the consumer only.

**F-16, R-13, a `monitors` relation traversed as `controls`.** Add a third component to F-0.

```json
{
  "type": "device",
  "bom-ref": "tt-401",
  "name": "temperature transmitter",
  "properties": [
    { "name": "assetjoin:ref", "value": "3f2a91c4-7b60-4d1e-9a55-0c8e21b4f7d2" },
    { "name": "assetjoin:relation", "value": "monitors" },
    { "name": "assetjoin:authority", "value": "https://example.org/authority/plant-engineering" },
    { "name": "assetjoin:basis", "value": "PID-COOL-004 rev D 2026-04-18" }
  ]
}
```

Expected: a consumer computing physical consequence treats `tt-401` as observing the pump and never as commanding it. Any output in which a compromise of `tt-401` moves the pump raises `E-TRAVERSAL-DIRECTION` from V-13.

**F-17, R-14, a cross-file identity conflict.** A second CycloneDX document asserting `identity` for the same reference on a different object.

```json
{
  "type": "device",
  "bom-ref": "asset-pump-207",
  "name": "centrifugal pump",
  "properties": [
    { "name": "assetjoin:ref", "value": "3f2a91c4-7b60-4d1e-9a55-0c8e21b4f7d2" },
    { "name": "assetjoin:relation", "value": "identity" },
    { "name": "assetjoin:authority", "value": "https://example.org/authority/contractor-b" },
    { "name": "assetjoin:basis", "value": "PID-COOL-011 rev A 2026-02-03" }
  ]
}
```

Expected: `E-IDENTITY-CONFLICT` from V-14, listing both bindings. A consumer that selects one and continues has failed R-14 whichever one it picked.

**F-18, R-34, an unqualified conformance claim.**

```json
{ "specification": "P1-three-identity-join", "conformant": true }
```

Expected: `E-CLAIM-UNQUALIFIED` from V-34. No roles, no legs, no standard versions.

## 5. The three round-trips

P1 section 8.3 defers three round-trip cases here [1]. One per leg, each written so that it tests the property that leg is weakest on. A round-trip passes when the leg's native identifier survives a full write, read and rewrite cycle byte for byte, the file still validates, and no foreign identifier has entered it.

### 5.1 RT-1, the DEXPI round trip, stability of a human identifier

A producer writes the F-0 DEXPI attribute set onto the equipment object carrying `P-101`. A consumer reads it and resolves the asset reference. The producer then rewrites the file from the consumer's output.

Pass criteria: `TagName` and the ISO 15926-4 class come back unchanged (R-11, V-11); the attributes are still on the tagged object and not on a graphic (R-17, V-17); no `purl` and no `mRID` has entered the DEXPI file (R-9, V-09).

Status: runnable at attribute-set level today. The file-level half, meaning revalidation against the DEXPI 2.0 Specification, is blocked with R-19, and V-10 reports unrunnable for this leg.

### 5.2 RT-2, the CycloneDX round trip, survival of a version bump

The volatility test. Take F-0, upgrade the firmware from 4.2.1 to 4.2.2, and rebuild. The build system mints a new `purl`, `pkg:generic/vfd-firmware@4.2.2`, and correctly so, because it is a different artefact under the package URL specification [6].

Pass criteria: the asset reference is unchanged, because the pump did not change; the new component carries its own assertion with a new basis and a new instant (R-8, R-15); the superseded component's assertion is not rewritten in place; the dependency edge is re-established for the new component (R-25, V-25).

This round-trip shows why the join needs a fourth identifier. A design electing the `purl` as primary would have silently broken every binding at the version bump, one of the three failed elections P1 section 2.4 names [1].

### 5.3 RT-3, the CIM round trip, and the one that is expected to fail

Export the same electrical network twice, from two network model tools, and bind the asset reference to the feeder in each.

Pass criteria: each export states its own model authority set (R-29, V-29a); each records its `mRID` unchanged from its own source model (R-28, V-28); a consumer given both assumes neither that the two `mRID` values denote different circuits nor that they denote the same one.

Expected outcome: the two exports carry different `mRID` values for the same physical circuit. P1 section 9 states this plainly; an `mRID` is unique within an exchange context and is not guaranteed stable across tools, and the specification offers no mechanism to reconcile them [1]. RT-3 therefore does not pass in the sense the other two do. It passes when the validator reports the divergence and the consumer declines to guess. A suite that reported RT-3 as green would be hiding the limitation, which is the failure mode section 6 is about.

## 6. What conformance does NOT establish

This section is the one an assessor should read first, because conformance testing is routinely read as assurance and it is not assurance about anything except syntax.

**A conformant file can be entirely wrong about the plant.** Every rule in section 3 inspects a file. Not one of them inspects a pump. A file that passes all thirty-two rules states a well formed binding between an object in a document and an identifier; whether the object corresponds to metal that exists, in the configuration described, is a question about site verification and it is outside all three of the participating standards.

**The join can be perfectly valid and describe an asset that was decommissioned last year.** Nothing in the assertion carries a lifecycle state. R-8 requires the as-built basis to name the document revision the binding was drawn from, and V-08 checks that a document identifier, a revision and a date are present. It cannot check that the revision is current, that the document was ever issued, or that the equipment it describes is still installed. A basis reading `PID-COOL-004 rev D 2026-04-18` passes when rev F superseded it in June and the pump was removed in July.

**Passing every vector in section 4 proves the syntax is right and says nothing about whether three files describe the same as-built state.** P1 already records that a P&ID at revision D, a bill of materials from a build two months later and a network model export from the quarter before are a legitimate, conformant, mutually inconsistent set [1]. This suite makes that visible and does not resolve it. Three green runs on three legs are three separate statements about three separate documents.

Four things are specific to conformance testing rather than to the join, and P1 section 9 does not cover them.

**A green run is a statement about the files presented, not about the estate.** The validator sees a corpus. A plant has thousands of assets across dozens of documents produced by different contractors at different times. Validating a sample and reporting the whole site as conformant is a sampling error, and the suite has no way to detect that it was handed a favourable sample.

**Vector coverage is not requirement coverage.** Section 3.4 gives the honest number: fifteen of thirty-five requirements are decided by a mechanical rule. For sixteen more, a pass means the form is right and a human has not yet looked. For four, there is no rule at all. An implementation reporting "conformant, all rules pass" is reporting on fifteen decided requirements and twenty open ones, and a conformance report that does not carry the unverifiable count alongside the pass count is misleading by omission. That is why section 2.3 makes unverifiable a first-class outcome.

**A validator run is a point in time.** It does not re-run when the plant changes, when a firmware image is replaced out of band, or when a P&ID is reissued. The join binds documents, and documents drift from the plant continuously. A conformance certificate with a date on it says what was true of those files on that date.

**The suite tests output, not discipline.** V-11 and V-33 probe a producer and a joiner through a driver, with inputs the tester supplies. They establish that the implementation behaves correctly on the cases presented. They do not establish that the model authority runs an append-only minting register, which is what R-2 actually requires and what section 3.3 hands to a human auditor.

Nothing here is signed. P1 records that a join assertion is an unsigned claim in a file, and that R-7 supports attribution while doing nothing to prevent a false assertion [1]. Conformance to this suite is not attestation and does not become attestation by being automated. An implementation can pass every rule in section 3 while asserting bindings its own engineers know to be guesses, and this suite will report a clean run.

## 7. Limitations

These are limitations of this suite. P1 section 9 carries the limitations of the join itself and they are not repeated here [1].

**No reference implementation ships with this document.** The rules are specified to the level of a failure code and a vector, which is enough for two implementers to write validators that agree on those vectors. Code is not attached. Until a validator has been run against a real corpus, section 3's classes are a reasoned allocation rather than a measured one.

**The DEXPI vectors are not wire-format vectors.** Section 4.1 states the choice and the reason. An implementer cannot paste an F-series DEXPI vector into a DEXPI file and run a schema validator, because this document deliberately does not spell the elements. That waits on confirmation of the binding against the published DEXPI 2.0 schema [8].

**The CIM leg has no schema rules.** V-28, V-29 and V-30 test properties of an assertion and of a claim. No rule tests that a CIM leg conforms to a profile, because P2 has not defined one, and CGMES is the precedent for how large that work is [12]. A CIM leg validated by this suite alone is validated on four fields.

**V-09 and V-26 are heuristic.** They match the known shapes of `purl`, `mRID`, `cpe` [13] and common tagging conventions. A foreign identifier that does not match a known shape passes. This is a detection rule, not a proof of absence, and it is marked class B for that reason.

**The vectors are synthetic.** F-0 uses a generic plant tag and invented values, as P1's worked example does. No vector here came from a real plant, so the suite has not met the cases a real corpus produces: duplicate tags across contractors, components with no `purl` at all, and network exports that omit the authority set because the exporting tool has no field for it.

**The closed vocabulary is not tested for sufficiency.** V-04 checks that a relation is one of five. It cannot detect that a producer forced a standby relationship into `supplies` because there was nothing better, which P1 records as the choice it is least confident about [1]. A suite cannot test whether a vocabulary is the right size; it can only test membership.

**The suite has no negative-completeness proof.** Section 4 gives one vector per distinct failure mode the authors identified. It does not establish that the set is closed. A validator passing every vector here may still accept a malformed file this document did not think of, and the two-schema bridge work [14] shows real files fail in ways a specification author does not predict.

## 8. References

1. **McKenney, J.** *The Three-Identity Join: DEXPI 2.0, CycloneDX 1.6 and IEC 61970 CIM.* P1 of the three-schema programme, Eigenia working group WG-05-CAD, 2026.
2. **Bradner, S.** *Key words for use in RFCs to Indicate Requirement Levels.* RFC 2119, BCP 14, Internet Engineering Task Force, March 1997.
3. **Davis, K., Peabody, B., and Leach, P.** *Universally Unique IDentifiers (UUIDs).* RFC 9562, Internet Engineering Task Force, May 2024. Obsoletes RFC 4122.
4. **Berners-Lee, T., Fielding, R., and Masinter, L.** *Uniform Resource Identifier (URI): Generic Syntax.* RFC 3986, STD 66, Internet Engineering Task Force, January 2005.
5. **OWASP Foundation and Ecma International.** *CycloneDX Bill of Materials Specification.* ECMA-424, 1st edition, June 2024, defining CycloneDX v1.6. Ecma International Technical Committee 54, Geneva.
6. **Ecma International.** *Package URL (purl) Specification.* ECMA-427, 1st edition, December 2025. Ecma International Technical Committee 54, Geneva.
7. **CycloneDX Project.** *CycloneDX Property Taxonomy.* OWASP Foundation. Taxonomy of official CycloneDX property namespaces and names, including the top-level namespace registration process.
8. **DEXPI e.V.** *DEXPI 2.0 Specification.* Released 10 October 2025, published on GitLab under the Creative Commons Attribution 4.0 International licence. DEXPI Plant SIG, DEXPI Process SIG and DEXPI Specification Steering Team.
9. **DEXPI e.V.** *DEXPI August 2026 Update.* dexpi.org, August 2026. States that DEXPI 2.0.1 is being prepared as an important update to the DEXPI 2.0 specification and that the Specification Teams are developing the DEXPI Profile, which extends the DEXPI specification with a mechanism for defining explicit constraints on classes and properties. Available at https://dexpi.org/dexpi-august-2026-update/ (accessed 7 September 2026).
10. **International Organization for Standardization.** *ISO 15926-4: Industrial automation systems and integration, Integration of life-cycle data for process plants including oil and gas production facilities, Part 4: Initial reference data.* International Standard.
11. **International Electrotechnical Commission.** *IEC 61970-301: Energy management system application program interface (EMS-API), Part 301: Common information model (CIM) base.* International Standard.
12. **International Electrotechnical Commission.** *IEC 61970-600-1:2021 and IEC 61970-600-2:2021: Common Grid Model Exchange Standard (CGMES).* International Standards, developed with ENTSO-E. First edition, published 4 June 2021, which cancels and replaces IEC TS 61970-600-1:2017 and IEC TS 61970-600-2:2017.
13. **Cheikes, B. A., Waltermire, D., and Scarfone, K.** *Common Platform Enumeration: Naming Specification Version 2.3.* NISTIR 7695, National Institute of Standards and Technology, August 2011.
14. **McKenney, J.** *The Unified DEXPI 2.0 and CycloneDX 1.6 Semantic Bridge.* Eigenia working group WG-05-CAD, 2026.
15. **Creative Commons.** *Attribution 4.0 International (CC BY 4.0) Legal Code.* Creative Commons Corporation, 2013.
