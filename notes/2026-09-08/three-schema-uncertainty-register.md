# Three-schema programme: consolidated uncertainty register

Date: 2026-09-08
Branch: `feat/three-schema-cyber-digital-twin`
Scope: the eight documents of the three-schema cyber digital twin programme, 74,144 words

## Why this file exists

Each paper's author flagged what it asserted but could not verify. Those lists were
delivered as agent reports, which are conversation artifacts, not repository artifacts.
They would have been lost. This file is the durable copy.

**Nothing below is a defect in the published text.** Each item is a stated limitation
that the paper carries honestly. This register exists so a reviewer can attack the
weakest claims first, and so a later session does not mistake a flagged assumption for
a settled result.

## The single most important one

**No finding in this programme was observed. Every one was reasoned.**

P7 states it plainly: findings F-B1 through F-B9 were derived from what the
specifications permit when read together, not from watching an implementation fail.
The same is true of P5's F-4 through F-7 and P6's F-R1 through F-R4. There is no
conformance implementation, so there is no consumer to observe getting it wrong.

P3 specifies the conformance suite. Building it is what converts this programme from
reasoned to observed, and it is the highest-value next piece of work in the programme.

## Ranked by what a reviewer could overturn fastest

| # | Claim | Paper | How to settle it |
|:--|:---|:---|:---|
| 1 | No pharmaceutical operator publishes a CIM export at all | P5 | One conversation with a plant electrical engineer |
| 2 | No infrastructure manager produces a CIM export for depot traction power; it lives in a traction simulation tool instead | P6 | One conversation with a rail electrification engineer |
| 3 | An operator would produce even an L1 leg on request | P5 | Connection agreements do not normally quote internal model identifiers |
| 4 | `theta`, the impact threshold, has no calibration data anywhere in the corpus | P7 | No incident set carries both a topology and an outcome. Unresolved and possibly unresolvable from public data |
| 5 | Section 4.4's "electrical conduits" mean DEXPI signal wiring, not power circuits | P7 | Ask the author of the two-schema paper. If the wider reading was intended, P7's reduction argument needs restating |
| 6 | All 26 RefBESS protection devices run one artefact | P7 | RefBESS's own table also lists `xfmr-diff@1.9.2` and calls itself representative. Sensitivity given: set drops 123 to 78, lambda rises 0.42 to 1.00. The physical finding survives, the discrimination result does not |

Items 1 and 2 are worth more than any further modelling. Each is one conversation, and
each could invalidate a paper's central premise.

## Standards claims cited below full confidence

- **CLC/TS 50701:2023 supersedes 2021** (P6). Rests on national adoption catalogue
  entries, not the CENELEC supersession record. Flagged in-text. The corpus still cites
  the 2021 edition in `WG-05-CAD-Frontier-AI-Hardware-Security.md`.
- **EN 50126-2** named in P6 prose and deliberately not cited; title and edition unverified.
- **GAMP 5 second edition** named in P5 without a publication date verified.
- **ICH Q7 and 21 CFR Part 11** cited by title and part only, no clause numbers, deliberately.
- **F-R1's CIM class gap** reasoned against P2, not confirmed against the IEC 61970-301
  UML, which is paid and not held. P6 deliberately did not invent a class name for an
  earthing switch.
- **`Feeder` and `PowerTransformerEnd`** appear in the papers but were never independently
  verified against IEC 61970-301.
- **NFPA 855 clause-level separation distances** were never resolved. NFPA 855 appears in
  none of the eight papers.
- **Two bibliography entries in the Frontier paper** could not be found by five
  independent search routes and are not cited by any body text. See
  `notes/2026-09-07/suspect-citations-verification.md`. Recommendation there is to strike
  them; no decision taken.

## Modelling artefacts a reader should not over-read

- **P7's rule J3** (connectivity expansion) is exercised everywhere and tested nowhere.
  RefBESS publishes 27 connectivity nodes but not which loads share one, so the expansion
  is empty at every site. None of the three reference assets tests it.
- **P7's multiplicative composition assumes path independence, which is false** for four
  drives on one field segment. The gate mechanism handles common mode at a support set,
  not along a path. Named and not closed.
- **P5's count of 14 component objects at H1** is an artefact of the F-4 workaround, not
  a property of the plant.
- **P7's three non-RefBESS rows in section 8.9** are vertex counts over P5's and P6's
  published hop tables, not independent traversals. Neither paper assigned a weight and
  P7 does not attribute one retrospectively.
- **P5's H4 process step attribute has no verified DEXPI schema element**, and its
  ISO 15926-4 classes are described rather than resolved.
- **Two synthetic identifiers were minted** and labelled at the point of use: P5's
  `PROT-415-A01` asset reference equivalent, and P7's `4c7b1e0a-93d5-4f62-8a17-b5e0c2d84f39`.
  Nothing depends on either value.
- **P6's CA-1**, that a forced permissive equals a lost interlock, carries the entire
  rail safety finding and assumes a single-channel software permissive with no trapped-key
  scheme in series. P6 names it as the thing to attack first.
- **P7's air cooled condenser 2-of-3 duty split** is assumed by symmetry with the chillers;
  the source publishes the count only.

## A caution that belongs in any summary of this work

P7's F-B6: the blast radius set can contain vertices whose loss **removes** the hazard.
Monotone consequence is a two-schema assumption that the electrical partition breaks.
`|B3|` must never be reported as a magnitude of harm.

## Open specification decisions, no ruling taken

- **F-2**, P1 cannot express absence while P2 requires the distinction. Three options
  recorded in `notes/2026-09-07/f2-negative-assertion-gap.md`, option 2 recommended.
  P6 added a condition: absence is *contingent* at RefPharma, where a retrofit could
  supply firmware, but *structural* for contact lines, where no ISO 15926-4 class exists
  and no producer will ever publish one. Option 2 misdescribes the second case unless a
  producer can declare a leg **inapplicable** as distinct from **unpublished**.
- **F-4** (P5): an object carrying more than one assertion has no encoding in any leg.
  P4's F-1 fixed the CycloneDX half by duplicating component objects, which contradicts
  its own device count and does not port to CIM, where C-4 forbids a second `mRID`.
- **F-6** (P5): every query has a minimum completeness level, and P2 provides no way to
  state it and no rule for when the level received is below it.
