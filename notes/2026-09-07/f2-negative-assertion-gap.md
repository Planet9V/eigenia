# F-2: P1 cannot express absence, and P2 requires the distinction

Date: 2026-09-07
Status: confirmed specification defect, open, needs a P1 revision
Found by: the author of P4 while running a query against RefBESS-250MW
Confirmed by: the orchestrator, independently, against both papers

## The defect

P2 makes a normative demand that P1 gives no way to satisfy.

**P2, section 7:**

> Silence is not absence. An L1 leg does not assert that the asset has no
> breaker; it asserts nothing about breakers. A consumer MUST NOT read a missing
> class as a negative fact.

**P1** provides no negative assertion. Its relation vocabulary is closed at five,
and every one of them is positive:

    identity   partOf   controls   supplies   monitors

A grep of P1 for "negative assertion", "absence", "asserted absence" or "absent
leg" returns nothing. There is no way to write "this asset has no component leg"
as distinct from "no component leg was published for this asset."

## Why it matters, from the case that exposed it

P4 ran the same query against two objects in RefBESS-250MW.

**Three variable speed drives** carry the same firmware as pump `P-1101A`, but
RefBESS publishes only one binding because its component table is
representative. The query returns them as unjoined. P1 R-12 correctly forbids
synthesising the missing bindings.

**Glycol dosing pump `P-1403`** is started direct on line and genuinely has no
firmware. It is the deliberate two-leg counter-example.

**To a consumer these are indistinguishable.** Both produce an empty component
result. One means "we did not publish this"; the other means "there is nothing
to publish." P2 requires a consumer to treat them differently and P1 gives it
nothing to tell them apart.

## Why this is the right kind of finding

It could not have been found by reviewing P1 alone. P1 is internally consistent.
It could not have been found by reviewing P2 alone, for the same reason. It
appears only when a query is run against an asset carrying both an unpublished
binding and a genuine absence, which is exactly what RefBESS was built to
provide when it included `P-1403` on purpose.

The applied paper tested the specification rather than illustrating it. That is
what the three sector papers are for, and this is the first return on that
design.

## Options for the P1 revision, not yet chosen

1. **A sixth relation, or a modifier.** Something like `noLeg` or an explicit
   `asserted-absent` marker. Widens a vocabulary P1's section 9 already names as
   the thing it is least confident about, and P1 closed the set deliberately.
2. **A completeness declaration at file level.** The producer states which legs
   it undertook to publish, so an empty result inside a declared-complete leg is
   an absence and an empty result outside it is silence. Mirrors P2's own C-7,
   where the level is declared rather than inferred, so it is consistent with a
   mechanism the programme already uses.
3. **Leave it, and require the consumer to report ambiguity.** Cheapest, and
   honest, but it pushes the problem to every consumer and P2's MUST stays
   unsatisfiable.

Option 2 looks strongest because it reuses a pattern already in the corpus and
adds no relation. It is Jim's call, and it changes P1, which changes the
conformance rules P3 wrote against it.

## Consequence for the programme

- **P1** gains a requirement, so its count moves past R-35.
- **P3** gains a validation rule, and its coverage figures change.
- **P4** already reports the finding as F-2 and needs no change.
- **P5**, the deliberately CIM-thin case, will hit the same distinction from the
  other direction and should cite this note rather than rediscover it.
