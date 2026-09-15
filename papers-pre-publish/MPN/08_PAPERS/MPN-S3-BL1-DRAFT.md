| Field | Value |
|:---|:---|
| Designation | MPN-S3-BL1-DRAFT |
| Item | BL-1, the state coordinate for the fourteen inherited mappings |
| Role | Drafter under decision 7 of 12 September 2026. Claude drafts, Jim McKenney strikes out what is wrong. Not the author, not a reviewer |
| Date | 14 September 2026 |
| Governed by | `ARBITRATION-DESIGN-R7.md`, disposition STOP, ruling A, ruling B, and changes 2, 4, 5 and 10 [1] |
| Scope | The author's ruling of 13 September 2026: theory, internal use, synthetic material, no people, no regulation |
| Status of the layer | Layer 3 detector. Output is a marked textual proposal beside the Layer 0 turn that prompted it. No musical rendering is specified in version one and BL-8 is the item that would unblock one [1, ruling A] |
| Read in full before drafting | `S3-mapping-phi.md` sections 2.1 to 2.6 and section 4 [2]; `s3_bias_reconciliation.json` [3]; `gen6/s6_bias_layer.py` and its output [4]; `s3_bias_reconcile.py` [5]; `16_Vol_15_Cognitive_Bias_Atlas.md` [7]; the bias handling of `mpn-conductor-standalone` at the paths in section 2 [6] |
| Rows drafted | 14 |
| Rows flagged as genuinely undecided | 3 |
| Verification | Stated as a mechanical edit in section 8, simulated in this container, and confirmed to make `s6_bias_layer.py` print zero mappings naming no coordinate [9] |

## 1. What this draft is, and what it is not

The review gate on MPN-DESIGN-01 revision 7 closed today with disposition STOP, and two of its rulings change what a coordinate means before any coordinate is drafted. Ruling A strikes the modulation rule and defers the rendering half of the bias layer behind BL-8, the channel allocation, which is the author's to answer. Ruling B relabels section 5a.3's channel table as a census of which $\Phi$ channel each of the thirty devices was written for, so a bias's channel is now a historical fact about the Atlas and the reference implementation rather than a specification of where anything writes [1]. What survives, and the arbitration says so in terms, is the detector: a model proposing which of the thirty biases is operating on a turn, marked as a proposal, rendered in text beside the turn that prompted it. BL-1 survives intact and is named as the route to the first evidence this layer has ever had [1, section 5].

That changes the reading of the phrase "rides on" and improves it. Under the rendering reading, a coordinate was an instruction: the device perturbs the parameter $\Phi$ computed from that quantity. Under the detector reading, a coordinate is a claim about plausibility: the prior probability that this bias is the move on this turn is a function of that quantity, and nothing else in the row asserts anything about sound. That claim is testable on generated dialogue without a listener, a panel or a channel, because the generator plants the move and the state together, so the conditional is an experiment rather than a preference. Every row below is written to be read that way, and the closing clause of each row says why the bias is a modulation of that quantity and not another in exactly that sense.

Two things this draft does not do. It does not decide anything, and the fourteen rows are laid out so that each can be struck on its own line without touching the other thirteen. And it does not assert that any of the fourteen devices is right; the devices are inherited from the reference implementation by strict name match and their honest status is the one S3 section 4.4 already gives all thirty, which is that no listener has ever been asked whether any of them carries what it claims to carry [2].

## 2. The search, and what it does not cover

The gate upheld finding S12, that BL-1's negative claim reaches five JSON fields and not the implementation, because `s6_bias_layer.py` assigns `rides=None` to every implementation-sourced record at the record-building line and never opens the source [1, finding S12]. The claim was therefore tested before it was acted on, by searching the reference implementation for values rather than for function names.

### 2.1 What was searched

| Search | Target | Method |
|:---|:---|:---|
| S1 | The thirty `COGNITIVE_BIAS_ENTRIES` records | Field-name census by regular expression over `mpn_reference_data.ts` lines 1755 to 2391 [6] |
| S2 | The same block, for values | Case-insensitive search for trauma, entropy, rsi, real, symbolic, imaginary, fragment, densit, threshold, condition, range and state |
| S3 | Consumers | Every reference to `PsychometricDimension.COGNITIVE_BIAS` and to the identifier `biases` across the TypeScript tree |
| S4 | Names | Each of the fourteen implementation trait keys and each of their English names, across the whole repository |
| S5 | The Python tree | `ml/psychoscore_v2`, for any bias table and any coupling of one to a state coordinate |
| S6 | Bundled theory | `public/theory`, for a bias name co-occurring with a state word |
| S7 | The Atlas | `16_Vol_15_Cognitive_Bias_Atlas.md`, for any per-entry activation rule [7] |

S1 returns eleven field names across all thirty records and no more: `id`, `category`, `subcategory`, `musicalElement`, `displayName`, `psychometricMappings` carrying `dimension`, `trait`, `strength` and `description`, `implementation`, `theory` carrying `description`, `rationale`, `source` and `examples`, and `adjustable`. A twelfth field, `condition`, appears on exactly two of the thirty, and both are the framing pair. S2 returns ten hits and every one of them is either a MIDI range, the subcategory string `density`, an English word inside a prose description such as "preference for current state", or one of those two `condition` values, which are `positive` and `negative` and not numbers.

### 2.2 What the search found, reported as found rather than drafted

Five things exist and none of them is a per-device state coordinate, but three of them are close enough that the author should see them before striking anything.

**A trauma gate on the whole bias list, in the only bias-consuming function on the score path.** `lookupArticulation` at `mpn_reference_lookup.ts:183` takes trauma and the speaker's bias list, and returns `sforzando` above trauma 0.7 and `marcato` above 0.5, both evaluated before the bias loop is entered [6]. So the implementation does attach trauma to biases, and what it attaches is a suppressor rather than a rider: above half the trauma range no bias in the list reaches the output at all. Two further facts make it weaker than it looks. The gate applies to the list collectively and names no bias, so it distinguishes none of the fourteen from any other. And the loop it gates searches `MPNCategory.ARTICULATION`, which holds ten entries carrying the dimensions Big Five, DISC, emotion, dark triad and physics, and not one carrying the cognitive-bias dimension, so the trait lookup cannot match any of the thirty; the substring fallback searches the same ten descriptions, none of which contains a bias name. The function therefore returns `legato` for every character below trauma 0.5 whatever their biases are. This is a found state dependence and it lives on a channel, articulation, that the census of section 5a.3 does not contain.

**One of the fourteen wired to the mode selector.** `psychometric_calculus.ts:310` reads `if (state.biases && state.biases.includes('Confirmation Bias')) likelyEmotion = 'stubborn'`, and the result is passed as the first argument of `lookupMode`, which gives the emotion branch priority over the register branch and only falls through to the sorted register triple when the emotion lookup misses [6]. No mode entry with dimension emotion and trait `stubborn` exists anywhere in the reference data, so the branch always misses and the registers always decide; and `lookupMode`'s answer is written to every stave and read by nothing, which S3 section 2.3 establishes at path and line [2]. This is reported rather than drafted because it matters to BL-2. CB-017 is not the only Atlas entry in the source wired to the mode: CB-001 is wired to it too, by a different door, and the door is an override of the register triple rather than a modulation of it. If the author keeps a mode-setting bias, this is a second instance of the same collision with A4, and it is currently inert only by accident.

**A state dependence attached to named bias channels, in a visualisation.** `MPNExperiment_SpectralWaterfall.tsx` declares six bias channels at line 12, four of which are Atlas entries among the fourteen, being authority, anchoring, confirmation and availability, and two of which are influence principles [6]. It then computes a per-channel amplitude of $0.3 + 0.5\tau$ plus a time oscillation at line 65, a per-channel spread of $3 + \lfloor 4H \rfloor$ at line 62, and a convolution kernel width of $10 + \lfloor 20H \rfloor$ at line 32. This is the only place in the repository where a state coordinate is attached to a named bias, and it is not a coordinate for any one of them, because the formula is identical across all six channels and only the loop index shifts the centre frequency and the oscillator rate, and because the output is a canvas and not a score. It is still worth having, because it is evidence about intent: where the implementation did attach state to biases, it attached trauma to magnitude and entropy to spread, and nothing to the registers.

**A second and independent bias table with its own devices.** `ml/psychoscore_v2/models/advanced_extensions.py` carries sixteen enumerated biases at line 109, nine susceptibility weights summing to one at line 135, a per-character profile of nine scalars defaulting to 0.5 at line 149, and a `BIAS_AUDIO_EFFECTS` table at line 183 giving four biases an audio device each [6]. Three of those four are among the fourteen: confirmation is a 2 kHz low-pass filter, Dunning-Kruger is a gain boost of 6 dB with 15 cents of pitch drift, and authority is a 2.0 second hall reverb. Every magnitude is a literal constant. The master function at line 493 builds the core vector from trauma, entropy, the register triple and DISC, computes the bias susceptibility beside it, and returns the two in one dictionary without combining them, so the bias scalars and the state coordinates never meet. Two of these devices disagree with the ones the census inherits, since confirmation is an ostinato in the reference dictionary and a low-pass filter here, and authority is deep brass in one and hall reverb in the other. The reconciliation does not record that a second implementation table exists, and that is a gap in the census rather than in this draft.

**An activation ordinal in the Atlas that nothing reads.** The Atlas's own preamble says each bias is a node with specific activation thresholds, and sixteen of the thirty entries carry an activation line with a severity from 4 to 9 out of 10 and, on five of them, a trigger clause in prose such as "Triggers when Ego is invested in a hypothesis" for CB-001 and "Driven by Media Cycles" for CB-005 [7]. Eight of the fourteen carry one: CB-001 at 9, CB-003 at 8, CB-005 at 8, CB-006 at 9, CB-008 at 8, CB-009 at 6, CB-012 at 8 and CB-015 at 6. The other six, being CB-017, CB-018, CB-020, CB-021, CB-026 and CB-030, are table rows in the expanded set and carry nothing. None of these is a coordinate of the calculus and none of the trigger clauses names a quantity the detector can condition on. They are an ordinal the five-field projection drops, which is the same defect as the unread `strength` the arbitration records under finding S12, and they are the obvious prior for the firing rate that change 28 says the layer still owes.

### 2.3 What the search does not cover

It covers the checkout at `/home/claude/mpn-conductor-standalone` as it stands on 14 September 2026, and nothing else. Bias handling on an unshipped branch, in the graph service the dialectic data references, or inside a build artefact under `node_modules` is outside it. It is a search of source text and of data committed as source, so it cannot exclude a dependence that exists only at runtime, for example a speaker profile fetched from a store whose bias list is itself computed from the state; nothing in the source suggests one, and nothing in the source rules one out. The application was not executed, so a dependence arising from call order rather than from source text would not appear. The bundled theory tree was searched only for a bias name co-occurring with a state word, which is a coarse filter, and almost all of its hits are unrelated business material. And the search does not cover the Atlas as a source of coordinates, because the Atlas names none for any of its thirty entries, which is the reason section 4 of S3 had to draft sixteen in the first place.

### 2.4 The finding, restated after the search

Fourteen of the thirty inherit a device that names no state coordinate, and the restated claim is narrower and stronger than the one the script prints. The reference implementation attaches a state coordinate to a cognitive bias in exactly three places. One is a trauma gate that suppresses the whole list above trauma 0.5 and distinguishes no member of it. One is a wiring of confirmation bias into the mode selector, which overrides the register triple rather than riding on it and which misses on every frame because its lookup key does not exist. One is a visualisation that gives six named channels a common amplitude in trauma and a common spread in entropy and emits no music. Not one of the fourteen has a state dependence that is its own, and the negative claim survives the search with its class named. So all fourteen rows below are drafted, none is reported as found, and the two entries whose existing attachments the author should weigh against the drafted coordinate are CB-001 and CB-012, both discussed in section 4.

## 3. The fourteen drafted coordinates

The columns are those of S3 section 4.2 so that the two tables can be read as one table of thirty [2]. A domain marked with a dagger is itself drafted, in S3 section 4.3, and can be struck separately; striking a coordinate does not strike a domain, or the reverse. The device column is inherited from the reference implementation by strict name match and is not drafted here. Only the fifth and sixth columns are this draft's work. A row marked **flagged** gives two coordinates because the choice between them is genuinely undecided, and section 6 states what separates them.

| Id | Bias | Domain | Musical device | Rides on | Why this device |
|:---|:---|:---|:---|:---|:---|
| CB-001 | Confirmation | PERC | Ostinato pattern, repeating | register: Symbolic **flagged** | the loop is the account defending itself against revision, so it modulates the register that holds the account rather than the disorder of it |
| CB-003 | Anchoring | PERC | Sustained pedal tone | entropy | an anchor is what a subject holds to when the symbolic organisation cannot supply a value, so the held bass modulates disorder and not weight |
| CB-005 | Availability | PERC | Sforzando, sudden loud accent | trauma | the vivid item is the one already carrying weight, and the accent modulates the one quantity the marking it perturbs is already a function of |
| CB-006 | Sunk Cost | DEC | Forced motif development despite dissonance | trauma | trauma is the only coordinate in the calculus that accumulates and cannot fall, so it is the one quantity that can stand for what has already been spent |
| CB-008 | Present Bias | DEC | Short notes for the immediate, long for the future | entropy | a horizon is a structure and entropy is the disorder of structure, so the collapse of the horizon modulates entropy and not the weight carried |
| CB-009 | Overconfidence | DEC | Solo dominating over ensemble | register: Imaginary | the inflated estimate is an estimate of oneself, which is the Imaginary's content, rather than a failure of the account or a quantity of weight |
| CB-012 | Authority | SOC | Deep brass and organ pedal | register: Symbolic | deference is to the office and not to the person, which is the Symbolic; the device's channel is set from DISC and from no state coordinate, declared in section 4 |
| CB-015 | Hindsight | MEM | Strong perfect cadence | register: Symbolic | the outcome is written back into the record as a necessity, so what is modulated is the register that holds the record, not the disorder of it |
| CB-017 | Framing | PERC† | Minor mode, the same datum negatively framed | register: Imaginary **flagged** | a frame is the image under which a datum appears and the Imaginary is the register of the image; the device itself is BL-2's subject and is not recommended as it stands |
| CB-018 | Status Quo | DEC† | No modulation, stays in the tonic | trauma **flagged** | the refusal to modulate is risk aversion under load and trauma is the load, which is also why this row couples to CB-007 |
| CB-020 | Bandwagon | SOC† | Tutti crescendo | register: Symbolic | joining is joining the terms the others are playing on, which is the Symbolic and not the image of oneself; the coupling is declared in section 4 |
| CB-021 | Blind Spot | MEM† | Mirror inversion, self-blind | register: Imaginary | the blind spot is a property of the image one holds of oneself and the device is a mirror, so the Imaginary rather than the disorder of the account |
| CB-026 | Recency | MEM† | Strong final note emphasis | entropy | the last item wins when the store has no order to rank it by, so the weighting by age modulates disorder rather than the weight any item carries |
| CB-030 | Fundamental Attribution | SOC† | Solo success, ensemble failure | register: Imaginary | the other appears as a character rather than as a situated agent, which is the Imaginary's operation on another person and not a fact about the law |

The vocabulary is the one already in `DRAFT_MAPPINGS`, so `entropy`, `trauma` and `register: Real`, `register: Symbolic` and `register: Imaginary` appear in the same spelling in both tables [3], [5]. The brief offers nine components and enumerates seven, and the difference is worth a sentence because it bears on one row. The seven admissible here are trauma, entropy, the three registers, and the derived fragmentation and density. The nine of the implementation's own vector add the four DISC coordinates, which are a profile rather than a state and which is precisely why CB-012's row is irregular: its device writes to the only channel $\Phi$ drives from DISC.

## 4. Five rows worth more than a clause

**Authority, and a row whose channel and coordinate are disjoint.** CB-012 is the single timbre entry in the census, and $\Phi$ drives timbre from the four DISC coordinates through the contrast basis of S3 section 2.6 and from no state quantity at all [2]. So this row, alone among the thirty, names a coordinate that has nothing to do with the parameter its device was written for. Under the rendering reading that was a defect and the arbitration records it as one, since CB-012 writes to the timbre channel with no bound and D50's cost claim held only while $\Phi$ was the sole writer [1, change 41]. Under the detector reading it is not a defect at all, because the row no longer says anything about timbre: it says that a deference move is more plausible the more Symbolic-dominant the speaker, which is a claim about the proposal and not about a sound. The author should know that this is the one row whose meaning changed most when ruling A landed, and that if BL-8 ever allocates a channel the row will need rewriting rather than re-siting.

**Framing, which is BL-2's and is drafted here only so that the count closes.** CB-017 is drafted onto the Imaginary because a frame is a presentation and the Imaginary is the register of presentation, and it is flagged against trauma in section 6. The row is nonetheless not recommended as it stands, for the reason change 2 gives: CB-017 sets the mode, and no channel allocation is available on which setting the mode is admissible [1]. Section 2.2 above adds a fact that was not in the gate, which is that the source wires a second Atlas entry into the same selector, so the mode collision is not confined to one row even today. The two options and the recommendation are in `MPN-S3-BL2-DRAFT.md`.

**Bandwagon, which extends a declared coupling across a layer boundary.** S3 section 4.2 declares one coupling in the sixteen and it is the groupthink triple: social proof is joining, groupthink is absorption, in-group bias is neither, and striking one requires the other two to be reworded [2]. CB-020 joins that group and makes it four. The Atlas defines bandwagon as doing something because others are doing it, which is the definition section 4.2 gives social proof, and the implementation's two devices are a tutti crescendo for bandwagon and a tutti or unison passage for social proof, which are the same gesture. Decision 8 moves the influence principles to a separate layer that does not share an index with the biases, and CB-020 is the point where that separation does not hold, because the Atlas carries its own copy of the principle under another name. Placing CB-020 on the Symbolic puts it on one signature with groupthink and in-group bias, which is the declared triple's signature, and the author should decide whether the right disposition is a strike of CB-020 as a duplicate of an influence principle rather than a coordinate for it.

**The solo against the ensemble, a collision that predates this drafting.** CB-009 and CB-030 both write to texture and both are drafted onto the Imaginary, so they share a signature. That is not an accident of the drafting: the two records carry the same `subcategory` string, `solo_vs_ensemble`, in the reference implementation, and their devices are a solo dominating the ensemble and a solo taking the credit while the ensemble takes the blame [6]. Read as devices they do not oppose, and they do not obviously agree either, because one is about volume of presence and the other about the distribution of an attribution. This is a third case that section 4 of `s6_bias_layer.py` does not have a rule for, its binary being that opposing devices are a prediction and agreeing devices are a loss of resolution, and BL-4's rule has to cover it. The collision is visible now only because BL-1 supplies the coordinates, which is the sense in which supplying them is evidence rather than documentation.

**Recency against the peak-end rule, a coupling the signature does not catch.** CB-026 is drafted onto entropy and writes to melody; CB-016 rides on trauma and writes to dynamics [3]. They share no signature and collide on no channel, so no computation over signatures will report them. Their devices are a strong final note emphasis and a scene whose loudest bar and final bar are marked with the middle levelled, which is the same gesture at two scales, and the second contains the first. If the author strikes CB-016 the clause for CB-026 should be reread, and the reverse. This is the granularity point the arbitration makes at change 9, that BL-4's remaining collision and BL-7's struck one were tested at different granularities and the section owes a rule; here is a pair that a channel-level rule and a signature-level rule both miss and a device-level rule catches.

## 5. What the drafted coordinates do to the collision count

Loading the fourteen rows takes the collision computation of section 4 of `s6_bias_layer.py` from sixteen entries to thirty, and the result is worth the author's attention before any row is struck, because four of the eight collisions below are created by this drafting and are therefore strikeable [9].

| Signature | Entries | Present before BL-1 | Reading |
|:---|:---|:---|:---|
| DYNAMICS off trauma | CB-005, CB-007, CB-016 | a pair | a three-way; the accent, the asymmetric envelope and the levelled middle all perturb one marking |
| HARMONY off entropy | CB-003, CB-022, CB-025 | a pair | a three-way; a held bass, a reharmonisation and a closed voicing |
| HARMONY off register: Symbolic | CB-015, CB-024 | no | new, and the two devices are near-identical: a strong perfect cadence and a cadence justified after the fact |
| MELODY off entropy | CB-010, CB-026 | no | new; an expected inversion that does not come against a final emphasis, which are unrelated rather than opposed or agreed |
| MELODY off register: Imaginary | CB-021, CB-028 | no | new; an inversion against a wrong continuation, distinguishable to an analyst and probably not to a listener |
| RHYTHM off entropy | CB-002, CB-008, CB-027 | a pair | a three-way, and it is the set BL-3's budget was computed over |
| TEXTURE off register: Imaginary | CB-009, CB-030 | no | new, and it is the pair that shares a subcategory in the source |
| TEXTURE off register: Symbolic | CB-011, CB-014, CB-020 | a pair | a three-way, and it is the declared groupthink triple with the Atlas's own social proof added |

The totals move from twelve signatures, four collisions and eight of sixteen entries involved, to eighteen signatures, eight collisions and twenty of thirty [4], [9]. Two consequences belong to other items. BL-4 inherits four new collisions and a third reading its rule does not cover. BL-3, which change 10 marks as dependent on BL-1, gets its dependency discharged in the direction that keeps its number: all three rhythm entries ride on entropy and all three dynamics entries ride on trauma, so the divisor of three that produced D48's figures is a divisor at signature level and not only at channel level. Section 5a.4 and D48 are deleted under change 3, so this is a note for the replacement rather than a restoration of the budget.

## 6. The three flagged rows

**CB-001, the Symbolic against entropy inverted.** Confirmation bias is an account that admits nothing which would revise it. Read as a property of the account it belongs to the Symbolic, and the detector claim is that confirmation moves are more plausible the more Symbolic-dominant the speaker. Read as a property of how tightly the account is held it belongs to entropy with the sign reversed, and the claim is that confirmation moves are more plausible the lower the entropy. The two are not the same claim and they come apart on a real case, since a speaker can be Symbolic-dominant and disordered, which is a legalistic account in trouble. The Symbolic is drafted because entropy with a reversed sign is the only inverted ride in either table and an inverted ride is harder to state and harder to test than a plain one. The author who prefers entropy should also reread CB-003 and CB-026, which are both on plain entropy and would then sit on the same coordinate as their opposite.

**CB-017, the Imaginary against trauma.** A frame is a presentation, which is the Imaginary. A frame is also a valence, and the only valence-like quantity in the calculus is trauma, which is the coordinate $\Phi$ already uses to drive the parameter most listeners read affectively. The Imaginary is drafted because the bias is about the presentation and not about the weight, and because trauma would put framing on a signature with three dynamics entries if the device ever moves to that channel. The author who takes the valence reading should take it in BL-2 as well, because it changes which remapped device makes sense there.

**CB-018, trauma against the Symbolic.** Status quo bias is a preference for the current state. Placed on trauma, the claim is that the preference is risk aversion under accumulated load, which is the standard explanation of the bias and which couples this row to CB-007, loss aversion, already on trauma. Placed on the Symbolic, the claim is that the preference is deference to an established order, which couples it instead to CB-012 and CB-015. The first is drafted because S3 section 4.3 places the bias in Decision on the ground that a preference is a weighting applied at the point of choosing, and a weighting applied at the point of choosing is what trauma is in this calculus [2]. The author should note that section 4.3 already flags the domain of this entry as arguable, so a strike here and a strike there are the same judgement taken twice.

## 7. What no row rides on, and why

No row rides on the Real. The Real in this calculus is what resists symbolisation, and a cognitive bias is by definition an operation of the account rather than a failure to have one, so the Real is the wrong register for all fourteen. S3's own sixteen put exactly one entry there, CB-023, the ostrich effect, and the clause it gives is that ignoring information is a hole in a specific place rather than silence [2]. That is a refusal at intake and not a distortion in processing, and none of the fourteen is a refusal at intake in that sense.

No row rides on fragmentation or on density. Under the rendering reading this was forced, because finding S15 rules that CB-004's use of fragmentation is a ride on a $\Phi$ output on the very channel its device writes to, which makes section 5a.2's count fifteen of sixteen rather than sixteen [1, change 7]. Under the detector reading the objection weakens, because fragmentation and density are deterministic functions of trauma and entropy, so conditioning a proposal's plausibility on either is conditioning it on the state and the output objection does not apply. Two reasons keep them out anyway. Density is $0.3H + 0.7\tau$, which at the frame library's dispersions is three quarters trauma, so a row on density is a row on trauma with a weaker statement of itself [2, section 2.4]. And fragmentation is $\max(0, 0.7H - 0.3\tau)/0.7$, which is clipped at zero on a fifth of the annotated frames, so a proposal conditioned on it is conditioned on a quantity that is constant over a large region of the state space. If the author wants a row there, CB-021 is the candidate, because a blind spot is a hole in the account, and section 6's note on CB-021 is where that argument would go.

## 8. Making the check mechanical

The verification the orchestrator will run is that `s6_bias_layer.py` reports zero mappings naming no coordinate once this table is loaded. One edit does that and it is not the obvious one.

**The edit to make.** Add to `gen6/s6_bias_layer.py`, after the reconciliation is loaded and before the assembly loop:

```python
# BL-1. The state coordinate for the fourteen devices inherited from the
# reference implementation, which names none for any of them. Drafted in
# MPN-S3-BL1-DRAFT.md under decision 7; strike a row by deleting its entry.
INHERITED_RIDES = {
    'CB-001': 'register: Symbolic',  'CB-003': 'entropy',
    'CB-005': 'trauma',              'CB-006': 'trauma',
    'CB-008': 'entropy',             'CB-009': 'register: Imaginary',
    'CB-012': 'register: Symbolic',  'CB-015': 'register: Symbolic',
    'CB-017': 'register: Imaginary', 'CB-018': 'trauma',
    'CB-020': 'register: Symbolic',  'CB-021': 'register: Imaginary',
    'CB-026': 'entropy',             'CB-030': 'register: Imaginary',
}
assert set(INHERITED_RIDES) <= set(STRICT.values()), \
    set(INHERITED_RIDES) - set(STRICT.values())
```

and change the one line in the assembly loop that reads

```python
        rec.update(category=hit['category'], element=hit['element'],
                   rides=None, source='implementation')
```

so that its fourth argument is `rides=INHERITED_RIDES.get(cb)`. The subset form of the assertion rather than the equality form is deliberate, so that striking a row leaves the script running and leaves the struck id in the list of entries naming no coordinate, which is the honest result: the device is still inherited and still names nothing.

**What then changes in the script's output**, verified by running the edited copy in this container [9]. Section 2 prints 30 and 0 against today's 16 and 14. Section 4 runs over thirty entries instead of sixteen and prints eighteen signatures, eight collisions and twenty entries involved, against today's twelve, four and eight. Three hardcoded strings then contradict the data: section 2's heading and its closing paragraph both assert the fourteen, and section 4's line reads "of 16" while printing a count of twenty. Change 12 of the arbitration already requires the two adjacent hardcoded strings about channel band widths in this script to be corrected or deleted on the ground that neither is derived from the data the script loads [1]; these three are the same defect and should be fixed in the same pass. Section 8's BL-1 line should then close and BL-3's line, which change 10 marks dependent on BL-1, is discharged in the direction section 5 above describes.

**The edit not to make.** The fourteen must not be added to `DRAFT_MAPPINGS` in `s3_bias_reconcile.py`. That dictionary's invariant is asserted at line 281 as `set(DRAFT_MAPPINGS) | set(struck) == set(unmapped)`, where `unmapped` is the sixteen Atlas entries with no musical mapping [5]. The fourteen are mapped, by strict name match, so adding any of them raises the assertion with its id in the message. `DRAFT_MAPPINGS` is the wrong home for an inherited device's coordinate and the invariant is what says so, which is the invariant doing its job rather than an obstacle to work around. The same fact governs BL-2 and is the reason the strike form of S3 section 4.4 does not accept CB-017 without a second edit; that is worked in `MPN-S3-BL2-DRAFT.md`.

## 9. How to strike a row

Delete the row from the table above, and delete the entry of the same id from `INHERITED_RIDES` in `gen6/s6_bias_layer.py`. The script continues to run, the id reappears in the list of mappings naming no coordinate, and the printed counts move by one in each direction, which is the intended behaviour in both directions: the layer continues to account for all thirty entries, and a coordinate cannot be dropped silently.

Do not add the id to `08_PAPERS/MPN-S3-STRIKES.md`. That file records the striking of a drafted mapping, its reader is `read_strikes` in `s3_bias_reconcile.py`, and its invariant is over the sixteen Atlas entries that have no musical mapping at all [5]. None of the fourteen is one of those, so an id from this table recorded there fails the reconciliation rather than keeping it green. If the author wants a struck coordinate recorded rather than merely deleted, the cheapest form is a second table in the same file under its own heading, read by a second reader keyed to the fourteen, and that is a change to the script and not to this draft.

Each row is independent of every other and no device is defined by reference to another row's device, so removing one leaves the remaining thirteen intact. Five couplings are declared and they are the only ones: CB-012's channel is driven from DISC and not from any state coordinate; CB-015 shares a signature and a near-identical device with CB-024; CB-018's clause rests on CB-007 being on trauma; CB-020 joins the groupthink triple that S3 section 4.4 already declares and duplicates an influence principle across a layer boundary; and CB-009 and CB-030 share a signature and a subcategory string in the source. Nothing else in the series depends on any row, B1 asserts only that the layer exists and is not predicted by the state, and the identifiability count of S3 section 3 does not reach the bias layer at all, per B4 in the register [8].

## References

[1] `ARBITRATION-DESIGN-R7.md`, 14 September 2026, ruling on MPN-DESIGN-01 revision 7, disposition STOP. Rulings A and B, changes 2, 3, 4, 5, 7, 9, 10, 12, 28 and 41, and findings S11, S12, S13 and S15.

[2] J. McKenney, "The mapping," MPN-S3, `S3-mapping-phi.md`, revision 9. Sections 2.1 to 2.6 and section 4 entire.

[3] `s3_bias_reconciliation.json`, the five-field projection: thirty Atlas entries, thirty implementation entries, fourteen strict name matches, sixteen drafted mappings, fourteen drafted domains and six influence principles.

[4] `gen6/s6_bias_layer.py`, run unmodified 14 September 2026. Reproduces in full: fourteen inherited, sixteen drafted, twelve signatures and four collisions over the sixteen.

[5] `s3_bias_reconcile.py`, the producer of [3]. `DRAFT_MAPPINGS` at line 161, `read_strikes` at line 69, and the coverage invariant asserted at line 281.

[6] `mpn-conductor-standalone`, inspected 14 September 2026: `src/components/mpn-lab/mpn_reference_data.ts:1755` to `:2391` for the thirty bias records; `src/components/mpn-lab/mpn_reference_lookup.ts:183` for `lookupArticulation` and `:220` for `lookupMode`; `src/components/mpn-lab/psychometric_calculus.ts:310` for the confirmation-to-emotion wiring; `src/components/mpn-lab/MPNExperiment_SpectralWaterfall.tsx:12`, `:32`, `:62` and `:65` for the six bias channels; `ml/psychoscore_v2/models/advanced_extensions.py:109`, `:135`, `:149`, `:183` and `:493` for the second bias table; `ml/psychoscore_v2/models/projector.py:133` for the thirty-six binary bias flags.

[7] `mpn-theory/01_THEORY/03_unified/16_Vol_15_Cognitive_Bias_Atlas.md`, thirty entries, sixteen carrying an activation ordinal at lines 43 to 183 and fourteen carrying none.

[8] `ASSERTIONS-REGISTER.md`, entries B1 and B4.

[9] This draft's own computations, 14 September 2026, run before the sections they support: a field census of the thirty implementation bias records returning eleven field names on all thirty and a twelfth on two; the six searches of section 2.1; a signature recomputation over all thirty entries with the drafted coordinates loaded, returning eighteen signatures, eight collisions and twenty entries involved; and a simulated application of the section 8 edit to a copy of `gen6/s6_bias_layer.py`, which prints thirty mappings naming a coordinate and zero naming none.
