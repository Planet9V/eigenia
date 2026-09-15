| Field | Value |
|:---|:---|
| Designation | MPN-S3-BL2-DRAFT |
| Item | BL-2, the disposition of CB-017, the framing effect, which renders as the minor mode |
| Role | Drafter under decision 7 of 12 September 2026. Claude drafts, Jim McKenney strikes out what is wrong. Not the author, not a reviewer |
| Date | 14 September 2026 |
| Governed by | `ARBITRATION-DESIGN-R7.md`, ruling A, ruling B and change 2, which sets the rationale this item must use [1] |
| Rationale fixed by the gate | CB-017 sets the mode, and no channel allocation is available on which setting the mode is admissible [1, change 2] |
| Wider finding that bounds the argument | Every channel in the census is categorical in output, so CB-017 is not special in kind, only in what it collides with [1, ruling A] |
| Depends on | BL-1, for CB-017's state coordinate. Drafted there as register: Imaginary, flagged against trauma |
| Options produced | Two, argued, with a recommendation |
| Recommendation | Option A, the remap, adopted as provisional pending BL-8, with the condition stated in section 6 |

## 1. What BL-2 is now, after the gate

Before the gate, BL-2 read as a rendering problem: a bias mapped to a categorical channel cannot be perturbed, so remap it to a continuous one or strike it. The gate removed both halves of that sentence. Ruling A strikes the modulation rule, and with it the distinction between perturbing and assigning, on the ground that on a piecewise-constant output every bounded perturbation is a categorical reassignment that fires with some probability, so the distinction has no content on any channel in the table whether it carries one bias or eight [1, ruling A]. Ruling B relabels the table as a census of which $\Phi$ channel each device was written for, so no bias writes to any channel today, CB-017 included [1, ruling B]. And there is no continuous channel to remap to: dynamics is piecewise constant on eight markings, tempo is rounded to an integer inside three bands, metre is a four-condition lookup with a hole, the two texture ladders are five stages at even fifths, harmony is 24 triads at integer chain positions, the instrument family is categorical by construction, and the three continuous timbre coordinates have no stated jump set at all, which is worse rather than better because a bound cannot be written for them [1, ruling A], [2, sections 2.1 to 2.6].

So the escape BL-2 was originally written to find does not exist, and the item is not about continuity. What survives is the collision, and the collision is specific: CB-017's device sets the mode, the mode is the parameter A4 is about, and A4 is the theory's central mapping claim. That is a collision with an assertion rather than with a channel, and it is why CB-017 is not special in kind but is special in what it collides with. BL-2 is therefore the question of whether the Atlas keeps an entry whose only device overwrites the programme's central claim, and the two ways to answer it are to give the entry a different device or to remove the entry from the layer.

## 2. The search, and what it does not cover

Five searches were run before either option was drafted, and three of them changed what the options say.

| Search | Target | Result |
|:---|:---|:---|
| M1 | Every entry in the census writing to MODE | Exactly one, CB-017, and it is one half of a pair [3], [4] |
| M2 | The framing records in the reference implementation | Two, `bias-010` major and positive, `bias-011` minor and negative, the only records in the thirty carrying a `condition` field [5] |
| M3 | Which half the layer inherits, and why | The later record, decided by insertion order in a one-line dictionary comprehension [4] |
| M4 | Other mode writers in the implementation's own thirty | One more, `bias-019`, Ambiguity, "Chromatic Uncertainty", inside the fifteen implementation-only rows [3] |
| M5 | Any stated discretisation of the mode channel | None in S3, none in MPN-NOTE-05, none in the design [1, change 11], [2, section 2.3] |

**M3 is the sharpest of the five and it was not visible from the prose.** `s6_bias_layer.py` builds its trait index with `by_trait = {e['trait']: e for e in IMPL}`, and both framing records carry the trait `Framing`, so the second one overwrites the first and the layer inherits the minor mode [4]. Nothing chose the minor. The device the whole of BL-2 is about is the one a dictionary comprehension happened to keep, and had the two records been written in the other order the census would read "Major Mode, same data, positive frame" and the section's sharpest finding would read the same way, because the objection is to setting the mode and not to setting it minor. This is worth the author's attention independently of which option is taken, because it means the entry as inherited carries less authority than a row in a table normally carries.

**M2 matters to both options.** The framing pair is the only place in the thirty where the implementation states a bias as two conditioned alternatives rather than as one device, and the condition is the frame's valence rather than any state quantity. S3 section 4.1 already records that the implementation carries 29 distinct traits across 30 entries because framing appears twice, positively and negatively framed [2]. The pair structure is the bias's own content, since framing is by definition the same datum under two presentations, and any option that keeps CB-017 should keep the pair.

**M5 bounds what a remap can promise.** Mode has no stated discretisation in any cited source, and under MPN-NOTE-05's rounding recommendation $\Phi$ would cease to discretise mode at all [1, change 11]. So no budget could have been written for this channel even if the modulation rule had survived, which is a second and independent reason CB-017 could not have been kept on mode.

**What these searches do not cover.** They cover the census as `s3_bias_reconciliation.json` projects it and the reference implementation at the paths named in [5], as of 14 September 2026. They do not cover what a listener hears, because nobody has heard any of this; the honest status of all thirty mappings is that no listener has ever been asked whether any of them carries what it claims to carry [2, section 4.4]. They do not settle whether re-voicing is audible as a presentation change rather than as a change of material, which is a discrimination question and is stated as an open test in section 4. They do not reach BL-8, since which channel the layer occupies is the author's and roughly half the new material follows from the answer [1, section 5]. And they assume the strict reading of the reconciliation, which is the one that has to be defended; under the loose reading three further traits match and none of them is framing, so the reading does not affect this item [2, section 4.1].

## 3. Option A, the remap

The device below is written to three constraints: a detector can propose it, it writes to no parameter $\Phi$ determines, and it has the shape a between-stave relation channel could carry if BL-8 allocates one.

| Id | Bias | Domain | Musical device | Rides on | Why this device |
|:---|:---|:---|:---|:---|:---|
| CB-017 | Framing | PERC† | The same pitch classes restated in a different registral disposition and spacing, open and high against close and low, with mode, key, tempo, metre, dynamic marking and instrument all held | register: Imaginary, flagged against trauma | framing is the same datum under two presentations, so the device has to be a restatement that changes nothing about the material and everything about how it is set out; a frame is the image under which a datum appears, which is the Imaginary |

The row keeps the pair structure the implementation states, since open and high is the positive frame and close and low is the negative one, and it keeps the `condition` field's content without keeping its collision. It writes to none of the six parameters: the disposition and spacing of a pitch-class set is not the mode, not the key, not the dynamic marking, not the tempo or metre, not fragmentation or density, not the harmonic chord quality or the operator, and not the instrument family or the three timbre coordinates [2, sections 2.1 to 2.6].

Four things recommend it and two count against it, and both sides belong on the page.

It is the bias's own logic in sound rather than a convention laid over it. Every other device in the thirty asks a listener to accept an association, that a pedal tone is a fixation or that a tutti crescendo is a crowd. This one asks for a comparison, and the comparison is the bias: the same set, twice, differently. That is also why it is checkable without a listener, in the way S3 section 4.2 says choice-supportive bias is checkable, because an analyst can put the two statements side by side and say whether the pitch content is identical [2].

It is the first of the thirty written in the shape a relation channel can carry. Ruling A's reason for deferring the rendering is not that the channel is missing but that all thirty devices are modulations of $\Phi$ channels, none is a relation between two staves, and rewriting thirty for a channel that does not yet exist is authorial work of the same size as the layer [1, ruling A]. A device defined as a difference from a reference statement is not an absolute setting and does not need a channel of its own to be stated; it needs a reference, which a running score always has. So BL-2 answered this way hands BL-8 one of the thirty already respecified instead of twenty-nine and a hole.

It preserves the layer's cheapest positive control. On synthetic dialogue a framing move is a minimal pair by construction, since the generator emits one datum twice under two presentations, so scoring a detector on it needs no judgement about whether a device was recognised. Section 5a.6's partition puts twenty-two of the thirty in the frame-local class and eight in the historical class [4], and framing is the one member of the fourteen whose planted form is a controlled pair. BL-5 and BL-6 are the items that turn this layer into evidence, and this is one of the two cleanest instruments they have.

It costs the frame-local classification, and that is a real cost. A restatement is audible only against the statement it restates, so CB-017 moves from the twenty-two to the eight, the per-turn score becomes a passage-pair score, and the partition of section 5a.6 becomes twenty-one and nine. The test gets cheaper in judgement and more expensive in material.

And it rests on a sub-channel S3 has not specified, which is its weakness and should be said plainly. Section 3 of S3 sets the leitmotif's pitches from the registers through the transformation, and nothing in S3 specifies octave placement, spacing or voicing of the resulting set [2]. That is what makes the sub-channel free today and it is also what makes it fragile: a later specification of voicing would take it back and put CB-017 exactly where it is now, one specification away from a collision with a parameter the theory owns. An author who intends to specify voicing in a later revision of S3 should strike rather than remap.

## 4. What Option A does not escape

It does not escape categoricality. A registral disposition is a choice among a finite set of dispositions, so the remapped device is categorical in output like every other channel in the census, and ruling A's finding applies to it unchanged [1, ruling A]. What it escapes is the collision, which is the whole of BL-2's content: the remapped device competes with nothing $\Phi$ sets, so no listening study on any assertion is measuring the bias layer and reporting the result as something else. Under the detector reading of version one, categoricality does not bite at all, because nothing renders.

It does not escape the mode entirely either, and BL-1's search found the reason. `psychometric_calculus.ts:310` wires CB-001, confirmation bias, into the first argument of `lookupMode`, which gives that argument priority over the register triple [5]. The wiring is inert, because no mode entry keyed to the emotion it names exists and because `lookupMode`'s answer is written to every stave and read by nothing [2, section 2.3], but it is there in the source. So the census's claim that one of the thirty writes to mode is true of the census and not of the implementation, where two Atlas entries reach the mode selector by two different doors. Whichever option is taken for CB-017, that second door should be recorded, because it is the same defect and it is currently hidden by an accident.

It does not answer BL-8 and is not offered as an answer. The remapped device is provisional, in the sense section 6 states, and its purpose in the interim is to keep an entry in the layer that the detector can use.

## 5. Option B, the strike

Recorded in the exact form S3 section 4.4 requires, as a row of `08_PAPERS/MPN-S3-STRIKES.md`:

```
| CB-017 | The inherited device is the minor mode, which sets the parameter A4 is about; no channel allocation is available on which setting the mode is admissible, and no remapped device was adopted in its place. |
```

The strike removes CB-017 from the layer and leaves its drafted domain standing, per S3 section 4.2's rule that striking a mapping does not strike its domain [2]. The Atlas then carries twenty-nine entries with a musical mapping and one recorded strike, and section 5a.3's census loses its only mode row, which removes the section's sharpest finding along with the entry that produced it.

What recommends it. It is final, and finality is worth something in a document that has been revised seven times. It costs no new specification, where Option A spends a sub-channel S3 has not written down. It is the smaller claim, and the arbitration's standing preference is for the smaller claim where two are available. And CB-017 is an expanded Atlas entry rather than a catalogued one, so its domain is itself drafted and carries a dagger, which makes it the lightest of the thirty to remove.

What counts against it. It is taken to solve a rendering problem that version one no longer has, since ruling A defers all rendering and nothing in version one sets any mode. It removes a control the test harness has a use for, as section 3 sets out. And it costs more in machinery than Option A, which is the next section.

## 6. What either does to the reconciliation invariant

The invariant is asserted in `s3_bias_reconcile.py` at line 281 as `set(DRAFT_MAPPINGS) | set(struck) == set(unmapped)`, where `unmapped` is the set of Atlas entries with no musical mapping, which is the sixteen, and `struck` is read from `08_PAPERS/MPN-S3-STRIKES.md` by the reader at line 69 [6]. Its purpose is that every Atlas entry with no musical mapping is covered by a drafted mapping or by a recorded strike, so a strike recorded with its reason keeps the check green and a strike recorded nowhere makes it fail [2, section 4.2].

**Option A touches the invariant not at all.** CB-017 is matched strictly on the trait `Framing`, so it is in `mapped` and not in `unmapped`, and replacing its device does not move it between those sets. The mechanical edit is a fourth dictionary applied after the strict match, in `gen6/s6_bias_layer.py` beside the `INHERITED_RIDES` dictionary that BL-1 adds:

```python
# BL-2. A device drafted to replace one inherited from the reference
# implementation. The Atlas entry is still matched strictly, so the
# reconciliation's coverage invariant is untouched.
REMAPPED_DEVICES = {
    'CB-017': ('MODE -> VOICING',
               'Same pitch classes, different registral disposition and '
               'spacing; open and high against close and low'),
}
```

applied where the inherited record is built, so that `category` and `element` take the remapped values when an id appears in it. `DRAFT_MAPPINGS` is not touched, `unmapped` stays at sixteen, `covered` stays at sixteen, and the assertion stays green. Two consequential edits follow and neither is in the reconciliation: the channel census of section 5a.3 loses its MODE row and gains a VOICING row, so the census's mode finding must be rewritten as a historical statement about what the implementation wrote rather than as a live collision; and section 5a.6's partition moves one entry from the frame-local twenty-two to the historical eight.

**Option B breaks the invariant as written, and this is the decisive mechanical fact.** CB-017 is mapped, so it is not in `unmapped`, so recording it in the strikes file makes `covered` seventeen against an `unmapped` of sixteen and the assertion raises with `{'CB-017'}` in its message [6], [7]. The form S3 section 4.4 prescribes therefore does not currently accept a strike of an inherited entry at all, which nobody had reason to notice while every struck candidate was one of the sixteen. Three edits make Option B work and all three are required together.

First, widen the invariant from the sixteen to the thirty. The replacement is that every Atlas entry is covered by an inherited mapping, a drafted mapping or a recorded strike, and that no entry is covered twice:

```python
struck = read_strikes()
assert set(struck) <= set(atlas), 'a strike names an id that is not an Atlas entry'
inherited = mapped - set(struck)
drafted = set(DRAFT_MAPPINGS) - set(struck)
assert not (set(DRAFT_MAPPINGS) & set(struck)), 'both drafted and struck'
assert inherited | drafted | set(struck) == set(atlas), (
    'the invariant is that every Atlas entry is covered by an inherited '
    'mapping, a drafted mapping or a recorded strike; these are not: '
    + str(set(atlas) ^ (inherited | drafted | set(struck))))
```

This is weaker than the present invariant in one respect that should be counted rather than glossed: the present form is an equality over a set that the script derives, so it catches a drafted row for an entry that did not need one, and the replacement only catches an entry covered by nothing. The property S3 section 4.2 sells, that a row cannot be dropped silently, survives in both forms.

Second, the counts of S3 section 4.1 move. Shared by strict name matching falls from 14 to 13, implementation only rises from 15 to 16, and Atlas entries with no musical mapping rises from 16 to 17 unless the table gains a struck row, which is the cleaner repair. Four of the nine rows of that table change and the sentence about 29 distinct traits across 30 entries, which is a fact about the framing pair, needs rewording since only one of the pair now has an Atlas counterpart and neither is in the layer.

Third, `s6_bias_layer.py` has no notion of a strike. It asserts `n_none == 0` with the message that an Atlas entry has no device and the layer is not complete [4], and a struck CB-017 makes that assertion fire. The script must either read the strikes file itself or assert over thirty minus the strikes. Under Option A none of this arises.

## 7. Recommendation

Adopt Option A, the remap, as a provisional device pending BL-8, and mark the row in section 5a.3's census as drafted rather than inherited so that it is strikeable by the ordinary route afterwards. Four reasons, in the order of their weight.

The first is that a strike is permanent and is being taken to solve a problem version one does not have. Under ruling A nothing in the bias layer renders, so nothing sets the mode, so the collision with A4 is not live in version one and will not be live until the author answers BL-8. Striking now spends a decision that does not have to be taken yet, and it spends it in the direction that cannot be undone cheaply, since restoring a struck entry means restoring its row, its script entry and its strike record together.

The second is the test harness. CB-017 is one of two entries in the thirty whose planted form is a controlled comparison rather than a device a listener has to recognise, the other being choice-supportive bias, which S3 section 4.2 already names the natural pilot for the whole layer [2]. Both BL-5 and BL-6 are scored on planted moves in generated dialogue, and the arbitration names BL-1, BL-4, BL-5 and BL-6 as the route to the first evidence this layer has ever had [1, section 5]. Removing a positive control from a layer that has never had any evidence is the most expensive thing on this page.

The third is BL-8. Ruling A's stated obstacle to allocating a channel is that all thirty devices are modulations of $\Phi$ channels and none is a relation, and that a single relation channel cannot carry thirty distinguishable devices [1, ruling A]. A device stated as a difference from a reference statement is the first exception, so answering BL-2 this way reduces BL-8's respecification work by one and, more usefully, gives it a worked example of the shape the other twenty-nine would have to take.

The fourth is the machinery, and it is the lightest of the four. Option A needs one new dictionary and no change to any invariant; Option B needs a widened invariant, four corrected counts in a published section, and a strike reader in a script that has none. That is not a reason to keep a bad entry, and it is a reason to prefer the remap when the substantive case is close.

The condition on the recommendation. Adopt Option A only if the author does not intend to specify voicing and registral disposition in a later revision of S3. If voicing is going to be specified, the sub-channel this device uses is already spoken for, the remap buys one revision of delay and no more, and Option B is the honest answer today. That is a question about S3's future contents and it is the author's, which is why the recommendation is conditional rather than flat.

One thing to do whichever option is taken. Record M3, that the layer inherits the minor half of the framing pair because a dictionary comprehension keeps the later record, and record the second door to the mode selector that BL-1's search found at `psychometric_calculus.ts:310`. Both are facts about the census, both survive either option, and both are cheaper to write down now than to rediscover.

## 8. How to strike a row

If the author takes Option B, the row of section 5 goes into `08_PAPERS/MPN-S3-STRIKES.md` exactly as printed, the three edits of section 6 land together, and CB-017's drafted domain in S3 section 4.3 stays unless it is struck separately by the same route.

If the author takes Option A and later wants the remapped device gone, the row of section 3 is deleted, the entry of the same id is deleted from `REMAPPED_DEVICES` in `gen6/s6_bias_layer.py`, and CB-017 reverts to the inherited minor mode, which is the state BL-2 was opened to change; so a strike of Option A's device is a strike of the remap and not of the entry, and taking Option B afterwards is the separate operation of section 5. To remove the entry from the layer altogether after adopting Option A, delete `REMAPPED_DEVICES['CB-017']`, delete `INHERITED_RIDES['CB-017']` per BL-1, record the strike row of section 5, and apply the three edits of section 6.

The row of section 3 is independent of every other row in either table. It is coupled to nothing, since no other device is defined by reference to it, and the couplings S3 section 4.4 declares, being survivorship's dependence on a prior statement and the groupthink triple, do not reach it [2]. Its only dependency runs the other way: BL-1 supplies its coordinate, and if that row is struck this one loses the fifth column and keeps the rest.

## References

[1] `ARBITRATION-DESIGN-R7.md`, 14 September 2026, ruling on MPN-DESIGN-01 revision 7, disposition STOP. Ruling A, ruling B, changes 2, 4, 5, 10 and 11, and section 5.

[2] J. McKenney, "The mapping," MPN-S3, `S3-mapping-phi.md`, revision 9. Sections 2.1 to 2.6, 3, 4.1, 4.2, 4.3 and 4.4.

[3] `s3_bias_reconciliation.json`. The two framing records `bias-010` and `bias-011`, the third mode record `bias-019` inside the implementation-only fifteen, and the strict match of the trait `Framing` to CB-017.

[4] `gen6/s6_bias_layer.py`. The trait index built at the head of section 1 of the script, which keeps the later of two records sharing a trait; the completeness assertion `n_none == 0`; and the twenty-two by eight partition of section 6 of the script.

[5] `mpn-conductor-standalone`, inspected 14 September 2026: `src/components/mpn-lab/mpn_reference_data.ts:1948` and `:1970` for the framing pair `bias-010` and `bias-011`, with their `condition` fields at `:1956` and `:1978`; `src/components/mpn-lab/psychometric_calculus.ts:310` for the confirmation-to-emotion wiring; `src/components/mpn-lab/mpn_reference_lookup.ts:220` for `lookupMode` and the priority of its emotion branch.

[6] `s3_bias_reconcile.py`. `STRICT` at line 138, `read_strikes` at line 69, `unmapped` at line 257 and the coverage invariant asserted at line 281.

[7] `MPN-S3-BL1-DRAFT.md`, section 8, which establishes the same fact from the other direction: an inherited entry cannot be added to `DRAFT_MAPPINGS` either, because the invariant is an equality over the sixteen.

[8] `ASSERTIONS-REGISTER.md`, entries A4 and B4.
