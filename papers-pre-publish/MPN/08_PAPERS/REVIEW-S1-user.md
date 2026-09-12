# Review S1 — User Advocate

**Subject:** `/home/claude/ms-drafts/S1-mckenney-lacan-theory.md`, revision 3
**Mandate:** the reader and the user. Can a composer, a music therapist, or a research audience understand this, act on it, and use the thing it describes.
**Evidence base:** the paper read whole; `REVIEW-S1-skeptic.md` (revision 2) read to avoid duplication; the reference implementation at `/home/claude/mpn-conductor-standalone/` opened as a user would meet it, cited `path:line`; the author's corpus on the Mac at `MPN/06_APPLICATIONS/04_therapy_usecase/`.
**Date:** 2026-09-12

---

## Verdict

The paper now serves one audience well, one badly, and one not at all, and it does not say so in the place a reader would look. The researcher is served: §2, §4.2, §5, §8.2's algebra and §10 are real argument, and A3 in particular is stated sharply enough that a stranger could design the study that kills it — but every apparatus a stranger would need to do the work, the failure conditions, the costed tests, the formal content of the dialogue assertions, sits in a "companion register" that has no citation, no identifier and no filename, so the paper is falsifiable in principle and unactionable in practice. The composer is served at the level of the idea and abandoned at the level of the thing: §6 offers decomposability as the reason to prefer this system over a learned one, and a composer who opens the system finds that none of the three quantities in §6's own worked sentence — mode, dynamics, texture density — is reachable, that the fifteen adjustable parameters in the entire product are things like "Machiavellian Detuning" and "Crisis/War room pace", that the three Lacanian register sliders the wizard does expose never reach a frame and so never reach a note, and that the dictionary entry a composer would consult to find the theory's central modal claim is labelled "Lydian" and ships a whole-tone scale. The therapist is not served and the admission of that is not adequate, because it is a single paragraph at the bottom of §11 in a paper whose §3 sells the therapist a benefit by name and whose named reference implementation ships a README section headed "Therapeutic Applications" instructing a therapist to track a client's psychological state — so the disclaimer never reaches the surface where the claim is made, and the author's own `THERAPY-AUTISM-ANALYSIS.md` already contains the three things S1 would need to say and defers all of them to a paper that does not exist. Above all of it sits one structural failure: the executive summary describes the paper's central disclosure as a mislabelled file, when §8.2 and §11 say that no quantity in the theory has ever been observed by anything except the system itself. Most readers stop at §1, and §1 is not true to §11.

---

## Findings

| id | audience | severity | claim |
|:---|:---|:---|:---|
| U1 | all three | CRITICAL | §1 describes the central disclosure as one mislabelled file; §8.2 and §11 say no quantity in the theory has ever been observed independently |
| U2 | therapist | CRITICAL | The paper declines the therapist audience in a buried paragraph while the named implementation's README instructs therapists to track clients |
| U3 | therapist | CRITICAL | The admission is not adequate: the author's own therapy analysis contains three findings that bear on S1 itself, and S1 defers all of them |
| U4 | composer | SERIOUS | The theory's central musical claims have no control surface; the whole product exposes 15 adjustable parameters and none of them is mode, fragmentation or density |
| U5 | composer | SERIOUS | The registers, DISC, OCEAN and Dark Triad a user sets in the wizard never reach a frame; trauma and entropy reach it as per-character constants |
| U6 | composer | SERIOUS | There is a fifth register-to-mode table, it is the composer-facing one, and its scale formulas contradict its own labels |
| U7 | composer | SERIOUS | Five words collide with their musical meanings and none is flagged; the worst is inside a numbered assertion |
| U8 | researcher | SERIOUS | Eight deferrals to a "companion register", a "citation ledger" and S2-S4, none of which has a citation, identifier or URL |
| U9 | researcher | SERIOUS | Entropy is a stipulation carrying Shannon's symbol, with no definition, no estimator and no disclaimer |
| U10 | all three | SERIOUS | The candidate-form table has four columns running in three directions of goodness with no legend |
| U17 | all three | SERIOUS | An algebraic identity is reported to four decimals across thirteen works, in the rhetorical position of thirteen confirmations |
| U19 | researcher | SERIOUS | Two assertions are sharp enough to be someone else's hypothesis; the other seven are not, and the register does not distinguish them |
| U11 | composer | MODERATE | The paper never says what comes out of the system or in what format; there is a MIDI export and the paper does not mention it |
| U12 | composer | MODERATE | Three of the fifteen adjustable parameters are the dynamics levels, so a user can turn off the paper's normative velocity law without being told |
| U13 | composer, researcher | MODERATE | §7's disclaimed apparatus is the product's main interface; the calculus is not |
| U14 | all three | MODERATE | The cyber-incident application's vocabulary is still in the labels the user reads: SBOM, Threats, Boardroom pace, War room pace |
| U15 | researcher | MODERATE | One endpoint sets the Real register and trauma to the same number and entropy to a random draw; §11 discloses the analyser and not this |
| U16 | composer | MODERATE | The reference dictionary presents 169 mappings of which 127 have an empty implementation and 154 cannot be adjusted |
| U18 | all three | MODERATE | The paper's one self-correction in its own favour is written so the withdrawn claim is what a stopping reader carries away |
| U20 | all three | MINOR | No contents, and the two sections every audience came for are at 60 and 90 per cent of the way through |
| U21 | all three | MINOR | The voice performs where it rates its own honesty, and §3 promises three audiences a benefit in a sentence where two are not served |

---

## 1. CRITICAL — The executive summary is not true to §11

**Audience: all three. What they do wrong: read §1, conclude that one file was mislabelled, and cite the paper as having a thin but real empirical base.**

§1 says: "Section 8.2 sets it out, along with the correction of a mistake this paper's own first revision made, which was to treat a machine-generated file of derived numbers as though it were annotated evidence."

§8.2 says: "**The corpus contains no observation of trauma, entropy or the registers that the system did not itself produce.** Six of the nine live assertions turn on those quantities, and none of the six has yet been tested against anything outside the system."

§11 says the same thing again and calls it "the single most important thing in this section."

These are not the same statement. The first is a housekeeping correction about one file. The second is the governing fact about the entire programme. A reader who stops at §1 — which is most readers, and every reader deciding whether §2 is worth their afternoon — walks away with the first and never learns the second. This is the single highest-traffic wrong belief the paper produces, and the paper produces it about itself.

It compounds in §1's next paragraph, which frames the revision's finding as "algebraic: two of the theory's quantities were constructed so that they cannot vary independently." True, and it invites the inference that the *other* quantities were fine and were checked. They were not checked, because there is nothing to check them against.

**Fix:** move §8.2's bolded sentence verbatim into §1, before the A8 paragraph.

---

## 2. CRITICAL — The paper declines the therapist while the system it names invites her

**Audience: therapist. What she does wrong: reads the paper, follows it to the reference implementation, and finds instructions to use it on a client.**

The paper's position is in the last paragraph of §11: "This paper is addressed to composers and to researchers, and it is not yet addressed to music therapists, though the series is. Nothing here states what a therapist would do with the system, under what supervision, with which population, or what the failure modes of a generated cue are in a clinical setting."

The header of the paper names the reference implementation. That implementation's README says:

```
README.md:27   A therapist tracking a client's progress over time. ...
README.md:97   ### 🧠 Therapeutic Applications
README.md:98   Track a client's psychological state over time and hear the progression.
               Therapists can use the musical output as a discussion tool—"What do you
               notice about this melody?"
```

So the clinical claim is made, it is made in the artefact the paper points at, and it is made in the imperative. The paper's disclaimer does not reach it. A therapist does not read §11's final paragraph and then decide; she reads §3, which tells her "For a therapist it is the difference between an instrument and an oracle," clicks through, and is told to track a client.

Two further things she meets that the paper does not mention. The system's only state slider is labelled **"Trauma (R)"** (`src/components/mpn-lab/MPNLabControls.tsx:53-64`), a word the paper is careful to say "is not a clinical measure and the theory does not treat it as one" — but the label carries no such note, and no screen in the product does. And the character analysis endpoint returns a per-character trauma score with `entropy: Math.random() * 0.3 + 0.2` (`src/app/api/analyze-character-psychometrics/route.ts:252`), which is a randomly generated number presented in the same object as a psychometric profile.

**Fix:** one sentence in §1 stating that the reference implementation's documentation makes a clinical-use claim that the theory does not support and that the claim is withdrawn.

---

## 3. CRITICAL — The admission is not adequate, and the missing content already exists

**Audience: therapist. What she fails to do: learn, from the paper that fixes the series' vocabulary and direction, the three things that would stop her using the series at all.**

I am asked whether the admission is adequate or whether the audience should not be claimed. It is not adequate, and the reason is not squeamishness about a gap — it is that S1 is the paper where three of the therapy questions are *decided*, not deferred. The author's own `MPN/06_APPLICATIONS/04_therapy_usecase/THERAPY-AUTISM-ANALYSIS.md`, dated the same day as this revision, settles all three, and S1 mentions none.

**(a) The direction of the instrument is set by S1's architecture and is the regulated direction.** The therapy analysis, §1: "The obvious version, a system that reads a person's psychological state and plays it back to help them, is the version that is regulated as a medical device in both major jurisdictions, that no evidence supports, that the flagship trial in this field argues against, and that carries a specific risk of harm to the population it most wants to serve. The defensible version inverts the direction of the instrument: the person composes their own state rather than being told what it sounds like." S1's entire apparatus — $\Phi : \mathcal{P} \rightarrow \mathcal{M}$, text in, state out, score out — is the first direction. A later paper cannot invert it; S1 fixed it.

**(b) The Lacanian vocabulary is installed by S1 and is the thing that ends the clinical conversation.** The therapy analysis, §3: the Haute Autorité de Santé adopted a recommendation on 8 January 2026 naming psychoanalysis under interventions "not recommended … or ineffective in autism"; and the author's own conclusion is "The Lacanian vocabulary … does not belong anywhere near a clinical or user-facing layer … the drama papers and any therapy paper must present the theory differently. Same machine, two provenances." S1 is the drama paper *and* the paper that names the theory after Lacan. If the split is the answer, S1 is where it is declared, and S1 does not declare it.

**(c) The failure mode of a generated cue is already identified and it is structural to S1's §6.** The therapy analysis, §5: "A person whose difficulty is precisely in identifying their own internal state, handed a confident-looking external representation of that state produced by an unvalidated mapping, may take the representation as the answer. The tool would then not be supporting articulation but overwriting it." S1 already owns the mechanism, in §6: "It is total. Every reachable state produces a score … which also means that nonsense in produces music out, a property the theory must own rather than hide." The paper owns the property and never connects it to a person. Totality plus an unvalidated mapping plus an unseeded generator (§11: "a user discovers this by pressing render twice") is the harm: the same client, the same declared state, two different cues, both delivered with the authority of notation.

**What a therapist would need before any of this touched a client** — and none of it is in S1: the population and its exclusions; that the tool sits inside a credentialed practitioner's own scope and makes no health claim; informed consent that names the mapping as unvalidated and the output as non-reproducible; a stop control that works instantly and without penalty; acoustic bounds (a level ceiling, a bound on rate of dynamic change, no unprepared dissonance) which the therapy analysis correctly identifies as the one thing a generator can *prove* and a recording cannot; supervision and a route for the client to reject the cue without it counting as data; and the epistemic-overwrite risk stated to the client, not just to the reader.

**Fix:** either strike the therapist from the series' audience claim until the therapy paper exists, or put three sentences in §1 — the direction is fixed here, the Lacanian naming is a drama-side provenance that does not travel to a clinical layer, and a generated cue is currently non-reproducible and therefore not usable with a person.

---

## 4. SERIOUS — The theory's central musical claims have no control surface

**Audience: composer. What he does wrong: reads §6, believes he can interrogate and steer a cue, opens the system, and cannot change any of the three things §6's own example names.**

§6 is the paper's offer to a composer: "a cue is loud because trauma is high, and thin because entropy is high, and in a particular mode because a particular register dominates, and each of those sentences can be checked separately."

Here is the entire control surface of the main page, `/mpn-conductor`:

- scenario picker — `src/app/mpn-conductor/page.tsx:771`
- "Mode" dropdown, which selects an ensemble, not a church mode — `:690`
- AI on/off and a temperature slider — `:712, :729`
- a text-to-speech "VOICE" toggle — `:718`
- transport: reset, play/pause, next frame — `:798-826`
- master volume — `:845`

Trauma, entropy and the register triple are read off the selected frame and are not editable: `const trauma = currentFrame?.trauma ?? 0.3;` at `:347`, entropy at `:348`, `rsi` at `:365-369`. There is no slider, field or dial anywhere in the application that sets $r$, $s$ or $i$ on the score path — I grepped the whole of `src/app` and `src/components` for one.

The only place in the product where the *mapping itself* can be adjusted is a set of fifteen entries. `src/components/mpn-lab/mpn_reference_data.ts` carries 169 reference entries; exactly 15 are `adjustable: true`, and they are surfaced as the wizard's "Music Theory Parameters" step (`src/components/mpn-lab/ProcessingWizard.tsx:356-372`). In full, the composer's fifteen knobs are:

Machiavellian Detuning; Narcissistic Detuning; Slow Tempo (Largo) — "Strategic/Boardroom pace"; Normal Tempo (Andante) — "Operational pace"; Fast Tempo (Presto) — "Crisis/War room pace"; Soft, Medium and Loud Dynamic Level; Introverted, Balanced and Extroverted Dynamics; Self-Reflection (Echo); Anger Intensity; Phase Evolution — "Hamiltonian energy conservation"; Momentum Scaler.

Not on that list: mode. Fragmentation level. Orchestration density. The trauma threshold $\theta$. The register weights. In other words, every quantity A4, A7 and A8 are about — the assertions the paper spends §8.2 and §8.3 on — is fixed in source and unreachable from the interface.

The paper is not obliged to ship a better product. It is obliged not to describe a control surface the user cannot reach, and §6's "each of those sentences can be checked separately" describes one.

**Fix:** one sentence in §11 listing what a user can actually adjust, and stating that no register, mode, fragmentation or density control is exposed.

---

## 5. SERIOUS — What the user sets in the wizard does not reach the score

**Audience: composer. What he does wrong: spends twenty minutes setting a character's registers and personality, renders, and hears a score that used two of the fifteen numbers he entered.**

This is the paper's own promise — "a dramatic script goes in, a per-character psychometric state comes out" — at the one place a user supplies the state.

The wizard's character step is labelled **"McKenney-Lacan Psychometrics (17D)"** (`ProcessingWizard.tsx:872`) and exposes, per character: DISC 4 sliders (`:880-895`), OCEAN 5 (`:903-918`), Dark Triad 3 (`:926-941`), **Lacanian RSI 3** (`:949-964`), trauma and entropy (`:975-1005`). Seventeen numbers a composer can set by hand.

When the wizard completes, `src/app/play-library/page.tsx:628-648` builds the frames. Each frame carries:

```
trauma:      charConfig.psychometrics.trauma
entropy:     charConfig.psychometrics.entropy
focusLayer:  lineIdx % 7
```

and nothing else from the seventeen. The RSI sliders, DISC, OCEAN and Dark Triad are written to the saved config and never into a frame. Downstream, `mpn-conductor/page.tsx:365-369` therefore falls back to the hard-coded `real: 0.33, symbolic: 0.33, imaginary: 0.34` for every script a user processes. The register triple — Proposition 2, A2, A3, A4, the material §5 spends two pages establishing as the theory's original contribution — is, for any script the user brings, a constant the user cannot see and did not choose, sitting behind three sliders that appear to set it.

Three further consequences the composer will meet and the paper does not mention:

- **Trauma and entropy are per-character constants for the whole play.** Every line a character speaks gets the same $\tau$ and the same $H$. The paper's §9.3 figure says "State: trauma, entropy, registers, per turn" and "State moves within a scene." For a user-supplied script it does not move at all.
- **The simplex is not enforced at the input.** `updateCharacterPsychometric` (`ProcessingWizard.tsx:620-641`) writes each register slider independently over $[0,1]$. A user can set real = symbolic = imaginary = 1.0 and the interface accepts it silently. A3 calls $r+s+i=1$ "a substantive claim about them rather than a normalisation convenience"; the only place a human states those three numbers does not hold them to it.
- **`focusLayer: lineIdx % 7`.** The line's index modulo seven, presented in the interface as an analysis result (see U14).

**Fix:** §11 should say that the registers set in the interface do not reach the score, that the simplex is not enforced at input, and that user-supplied scripts carry a constant state per character.

---

## 6. SERIOUS — A fifth modal table, it is the one a composer would consult, and it contradicts itself

**Audience: composer. What he does wrong: looks up the theory's central modal claim in the product's own dictionary, writes out the scale it gives him, and gets a different scale from the one named.**

§8.3 says the corpus and implementation contain "four mutually incompatible register-to-mode tables" and enumerates them. There is a fifth, it is in the reference dictionary at `/mpn-reference`, and it is the only one presented to a user in prose a composer can read. `src/components/mpn-lab/mpn_reference_data.ts`:

- `mode-001` (`:1035-1055`) — "Major/Ionian Mode", Symbolic, `scaleFormula: [0,2,4,5,7,9,11]`. Correct.
- `mode-002` (`:1057-1077`) — displayed **"Phrygian/Locrian Mode"**, Real, `scaleFormula: [0,1,3,5,7,8,10]`. That is Phrygian. Locrian has a flattened fifth; this formula has a perfect fifth. The entry names two modes and ships one.
- `mode-003` (`:1078-1100`) — displayed **"Lydian/Whole-tone Mode"**, Imaginary, `scaleFormula: [0,2,4,6,8,10]`. That is the whole-tone scale, six notes. Lydian is `[0,2,4,6,7,9,11]`, seven notes. The entry names Lydian first and ships no Lydian at all.

And a sixth table, a single mode per register, sits in the lookup the dictionary is wired to: `src/components/mpn-lab/mpn_reference_lookup.ts:270-278` gives real→phrygian, symbolic→ionian, imaginary→lydian.

§8.3's own argument is exactly right — "A composer who learns the theory from one document and listens to the output of another will hear something close to the opposite of what they were taught and will conclude, reasonably, that the tool is broken." The paper has understated its own case by one table, and the missing table is the composer-facing one, and it is wrong on its own terms before it disagrees with anything else.

**Fix:** §8.3 should say five, and name the reference dictionary as the table a user actually meets.

---

## 7. SERIOUS — Five words collide with their musical meanings and none is flagged

**Audience: composer. What he does wrong: reads a numbered assertion and takes away its opposite.**

The worst case is inside an assertion, not in the prose.

**"register".** B4: "Profile takes timbre and register, set once per character; state takes dynamics and mode." The figure repeats it as a node: `C1["Timbre and register"]`. Everywhere else in this paper — §4.1, §5, all of A2, A3, A4, the whole of Proposition 2 — "register" is Lacan's. In B4 it must mean pitch register, because the sentence is about which musical channel carries which layer, and the implementation uses it that way (`GeniusComposer.ts:573`, `// Middle register`). So a composer reading B4 concludes that a character's DISC profile is expressed as their Lacanian registers, which is not what B4 says, is incoherent with §5, and cannot be unlearned because nothing in the paper contradicts it. This is a numbered assertion in a paper whose method is that assertions can be examined one at a time.

**"mode".** §6's $f_{\text{mode}}$ is a church mode. The most prominent control in the product is a dropdown labelled **"Mode"** (`mpn-conductor/page.tsx:689`) offering FULL_ORCHESTRA, CHAMBER_DEATH, JAZZ_NOIR, WAGNERIAN, MINIMALIST_VOID, CYBER_GLITCH (`GeniusComposer.ts:28-44`) — an ensemble, not a mode. The hero text above it advertises "**7 orchestration modes**" (`:674`) and there are six; the reference page offers a different set of four (`mpn_orchestration_options.ts:8-13`). Three vocabularies and a count that matches none of them, all behind a word the paper uses for something else.

**"dominant".** A4: "The dominant register selects the mode, trauma the darker member." To a musician the dominant is scale degree five and the chord built on it, and "the dominant selects the mode" is a sentence about tonal function. The paper means $\arg\max(r,s,i)$ and says so only in the formal column of the table.

**"voice".** §7 "a disagreement between two voices" (contrapuntal); §4.1 "individuate a character's musical voice across scenes" (timbral identity); and the product's "VOICE" toggle, which enables text-to-speech. Three senses.

**"resolution".** §4.1 "trauma needs a resolution term" (an additive term in a formula) against B2 "it resolves in one of three ways … by suspension, which is the musical name for deferring the decision" (harmonic resolution), one page apart.

**"dynamics".** §6 "Dynamics is a function of trauma alone" (loudness) against §1 "from dynamical systems" and §7's Hamiltonian material (the mathematics). Both in the same document, and the paper's §7 already shows it knows this class of problem exists — it does exactly this disambiguation for "free energy" and does it for nothing else.

**Fix:** a five-line glossary after §4.1 fixing the sense each word carries in this paper, and a parenthesis in B4 saying pitch register.

---

## 8. SERIOUS — The falsification apparatus is not in the paper

**Audience: researcher. What she fails to do: replicate, disagree with a specific number, or design a study, because every specification is in a document she cannot obtain.**

The paper's methodological offer is that it can be argued with item by item. Here is where the items are:

- §8.1: "Each assertion carries its own failure condition in the companion register, and the tests that would settle them are costed there."
- §9.3: "the companion register carries each one's formal content, its failure conditions and the study that would settle it."
- §12: "Code cited in the text is identified in the companion citation ledger by repository path and line."
- §12: "The figures in section 8.2 are reproducible from `05_DATA/03_generators/a8_form_analysis.py` against `05_DATA/01_scores/`."

Neither companion document appears in the reference list. Neither has a filename, a URL, a DOI, a repository, or a version. The reproducibility claim gives a path inside a repository that is never named. And S2, S3 and S4 are cited eight times between them — for the mathematics, the parameter mapping, the chosen candidate form, the chosen modal table, the channel-budget derivation, and the bias work queue — with no preprint identifiers.

The net effect for an outside researcher: the assertion table in §8.1 is five columns wide and the column that would let her disagree — the failure condition — is the one that is elsewhere. She can read that A2 is held "as hypothesis; measurement instrument missing" and cannot find out what instrument, what agreement threshold, or what result would retire the assertion.

**Fix:** add a failure-condition column to §8.1's table, or publish the register as a numbered appendix with an identifier.

---

## 9. SERIOUS — Entropy is a stipulation carrying Shannon's symbol

**Audience: researcher, and any composer who has met the term. What they do wrong: assume $H$ is computed from a distribution over something, and read every entropy-dependent claim as quantitative.**

§4.1 in full: "Entropy, written $H$, is the disorder of the subject's symbolic organisation. Where trauma asks how heavily the subject is loaded, entropy asks how far the subject's account of their situation has stopped cohering."

That is the entire definition. There is no formula, no estimator, no scale anchor, no statement of what distribution is being taken over what alphabet, and no sentence saying that this is not an information-theoretic quantity. The symbol $H$ is the standard notation for Shannon entropy and the paper adopts it without comment. Trauma gets better treatment: §4.1 states the ratchet property and flags it as a consequence of the definition. Entropy gets a gloss.

The paper is otherwise scrupulous about exactly this class of error — §7's second caution distinguishes variational free energy from a potential well and insists "they need different names in the same document." The same caution applies one section earlier and is not made.

What the reader is not told, and would find in a minute: in the implementation, entropy is a punctuation tally in one path, and `Math.random() * 0.3 + 0.2` in another (`src/app/api/analyze-character-psychometrics/route.ts:252`).

**Fix:** one sentence saying $H$ is a stipulated ordinal quantity with no estimator, and that the symbol is not Shannon's.

---

## 10. SERIOUS — The decision table runs in three directions with no legend

**Audience: all three, and specifically anyone who reaches the paper's one open decision. What they do wrong: read the best candidate as the worst.**

§8.2's table:

| Form | fragmentation | density | $r$ | PC1 | cells of 25 | works above 0.65 |
|:---|:---|:---|---:|---:|---:|---:|
| Shipped | … | … | +0.915 | 95.8% | 10 | 13 of 13 |
| C2 knee-shift | … | … | +0.565 | 78.3% | 19 | 5 |
| C3 opposed | … | … | +0.295 | 64.7% | 19 | 1 |

Four numeric columns. In three of them lower is better ($r$, PC1, works above 0.65); in one higher is better (cells of 25). Nothing on the table says so. The Shipped row — the thing being rejected — carries the largest number in the final column, "13 of 13", and C3 — the candidate the text says "the numbers favour" — carries "1". A reader scanning the table with the ordinary habit that bigger numbers are better reads C3 as the worst of the three and the shipped form as the best, which is the exact inverse of the section's conclusion.

The prose does resolve it, four paragraphs later. The table is what gets screenshotted.

**Fix:** rename the last column "works still above 0.65 (fewer is better)" and put an arrow or a "(lower better)" tag on $r$ and PC1.

---

## 11. MODERATE — The paper never says what comes out

**Audience: composer. What he fails to do: discover that there is a MIDI file at the end of this.**

A working film or theatre composer's first question about any generator is what lands on his disk and whether it opens in his DAW. The paper answers none of it. The header says "a leitmotif is transformed and rendered as notation, playback and MIDI" — that is in the task brief I was given, not in the paper. In the paper, §6's figure has a node reading `SC["Score: notation, playback, MIDI"]` and the body never returns to it. §11, the section about what the system does, lists only what is broken.

What actually exists: MIDI export via `downloadScoreMIDI` (`src/components/mpn-lab/ExportButton.tsx:76-108`, `score_exporter.ts`), an MP3 render (`exportScoreWithMetadata`, `:44`), and VexFlow notation rendering (`ConductorScoreVexFlow.tsx`). No MusicXML. That last absence matters more to a composer than most of §8 — MIDI carries pitch and velocity and loses the modal spelling, the articulation and the staff layout that this theory is largely *about*.

**Fix:** one sentence in §11 naming the three outputs, their formats, and the absence of MusicXML.

---

## 12. MODERATE — The user can turn off the paper's normative velocity law

**Audience: composer. What he does wrong: believes the cue is loud because trauma is high, when it is loud because he moved a slider three screens ago.**

§6 states $v(\tau) = 20 + 107\tau$ as normative and honestly reports that two other discretisations exist in the implementation. What it does not report is that one of those variants is *a user control*. Three of the fifteen adjustable parameters are exactly the dynamics levels (`ProcessingWizard.tsx:362-364`):

```
dynamics-001  Soft Dynamic Level    default 30   range 1-45    "Low trauma/Peace state"
dynamics-002  Medium Dynamic Level  default 72   range 60-85   "Normal engagement"
dynamics-003  Loud Dynamic Level    default 118  range 110-127 "Extreme crisis state"
```

A user who moves them has made the paper's linear law false for his own score, silently, with no indication that the parameter he just changed is the one the theory's worked example depends on. Decomposability — the property §6 offers a composer as the reason to prefer this system over a learned one, because "a cue is loud because trauma is high" is checkable — is user-defeasible and undocumented.

**Fix:** in §6, say that the shipped dynamics are three user-adjustable fixed levels rather than the linear law, and that adjusting them breaks the stated relation.

---

## 13. MODERATE — §7's disclaimed apparatus is the product's main interface

**Audience: composer, researcher. What they do wrong: accept §7's disclaimer, open the system, and find that the disclaimed material is most of what was built.**

§7: "The rest of the apparatus, Hamiltonian phase space … Lyapunov exponents … the Ising model … Granovetter thresholds … is real and is developed in S2. It is named here and not argued from, because no assertion in section 8 and no test in section 10 currently depends on any of it. Until one does, listing it in a theory paper would be decoration."

The disclaimer is the right instinct and the skeptic's finding 18 already pressed it. What neither has said is what happens when the reader follows the paper into the product. `/mpn-lab` (`src/app/mpn-lab/page.tsx:16-78`) is thirteen visualisations: seven-band waveform, persistence barcode, Turing patterns, neural plasma, neural propagation, epidemic phase, spectral waterfall, percolation map, Tonnetz grid, 7D state evolution, Borromean knot, Lorenz attractor, tensor hypercube. They are driven by two sliders and a layer picker (`MPNLabControls.tsx`). The conductor page computes and displays `lyapunov` and a `STABLE / EDGE / CHAOTIC` label from `(trauma + entropy - 0.5) * 0.5` (`mpn-conductor/page.tsx:353-357`) — a linear function of two numbers, presented to the user as a stability diagnosis. Two of the fifteen adjustable mapping parameters are `physics-hamiltonian-001 Phase Evolution` and `physics-hamiltonian-002 Momentum Scaler`.

So the material the paper declines to argue from is adjustable, visualised thirteen ways, and surfaced as a diagnosis; the calculus the paper is about is not adjustable at all (U4). That asymmetry is a fact about where the programme's effort has gone, and a reader who is deciding whether this is a research programme or a demo will want it.

**Fix:** add a clause to §7's disclaimer noting that the implementation exposes this apparatus and does not expose the calculus.

---

## 14. MODERATE — The previous application's vocabulary is still in the labels

**Audience: all three, immediately, on the first screen. What they do wrong: conclude the tool is not for them.**

The paper discloses one transplant, in §9.3: the dialogue chapters "develop the apparatus against a different application, a crisis meeting rather than a scene … Carrying the formalism across to drama is the author's move and is stated here as one." That is exactly the right disclosure. It is not made about the interface, where the transplant is still visible in the user's own words.

`src/components/mpn-lab/MPNLabControls.tsx:16` — the layer selector a user is offered next to the trauma and entropy sliders:

```
const LAYER_NAMES = ['L0 Catalog', 'L1 Equipment', 'L2 SBOM', 'L3 Threats',
                     'L4 Psychology', 'L5 Streams', 'L6 Predictions'];
```

SBOM is a software bill of materials. A composer scoring a scene is being asked to choose between Equipment, SBOM and Threats.

`ProcessingWizard.tsx:359-361` — the three tempo controls in the step headed "Music Theory Parameters":

```
Slow Tempo (Largo)    "Strategic/Boardroom pace"
Normal Tempo (Andante) "Operational pace"
Fast Tempo (Presto)   "Crisis/War room pace"
```

And the value that feeds the layer selector for a user's own play is `focusLayer: lineIdx % 7` (`play-library/page.tsx:634`) — the line number modulo seven, displayed as though it were an analysis.

**Fix:** one clause in §11 that the interface still carries the cyber-incident application's vocabulary, in the same spirit as §9.3's disclosure about the chapters.

---

## 15. MODERATE — One endpoint makes two assertions numerically impossible

**Audience: researcher. What she does wrong: takes §11's disclosure as the complete account of where the numbers come from.**

§11's disclosure is about the analyser's keyword counting, and it is the best paragraph in the paper. It is not the whole story. `src/app/api/analyze-character-psychometrics/route.ts:240-252` recommends a character's full profile:

```
const rsi: RSIProfile = {
    real:      normalize(traumaWords),
    symbolic:  normalize(complianceWords),
    imaginary: normalize(influenceWords)
};
const recommended: FullPsychometrics = {
    ...
    trauma:  normalize(traumaWords),
    entropy: Math.random() * 0.3 + 0.2
};
```

The Real register and trauma are *the same number by construction*. Not correlated — identical. And entropy is a uniform draw. Anyone testing A5 (trauma and entropy separable) or A2/A3 (the registers are a distinct three-way decomposition) against a corpus that passed through this endpoint would be testing `x` against `x` and against a random variable.

The endpoint has no caller in the interface — I could not find one outside its own route file — which is itself worth a clause, because a researcher reading the repository as the paper invites her to will find it and will not know it is dead.

**Fix:** name it in §11 next to the keyword lists, and say it is unreachable.

---

## 16. MODERATE — The dictionary a composer would browse is a catalogue of intentions

**Audience: composer. What he does wrong: reads a mapping, believes it is what the system does, and cannot hear it.**

`/mpn-reference` is the most composer-legible artefact in the product: a searchable dictionary with, per entry, a musical element, a psychometric mapping, a rationale and worked examples. It has 169 entries. Of those, **127 carry `implementation: {}`** — an empty implementation object — and **154 are `adjustable: false`**.

The Lacanian entries are among the empty ones. `mpn_reference_data.ts:2719-2739`, `lacan-imag-001`, displayed "Mirror Stage (Imaginary)", musical element "Mirror Inversion", rationale "The mirror stage creates the ego through reflected image", `implementation: {}`. §11 of this paper already says of that transformation: "The motif inversion negates an interval array that nothing else in the source reads, so it is inaudible." So the paper knows, and the dictionary the composer reads does not say.

Also worth one line: those entries condition on registers independently — `lacan-real-001` fires on `Real > 0.7`, `lacan-real-002` on `Real > 0.6`, `lacan-imag-002` on `Imaginary > 0.5` — thresholds that are only jointly satisfiable under A3's simplex in a narrow corner, and the dictionary does not say so.

§11 says "Most of the transformation typology does not reach the output." It does not say that the user-facing dictionary presents them as if they do.

**Fix:** one sentence in §11.

---

## 17. SERIOUS — An identity reported in the rhetoric of a finding

**Audience: all three. What they do wrong: take away thirteen confirmations from a paragraph that contains none.**

§8.2, under the bolded heading "**The illustration.**":

"On those the two scalars correlate at $r = 0.9150$, the first principal component carries 95.75 per cent of the joint variance, ten of the twenty-five fragmentation-by-density level pairs are realised, and all thirteen works sit above 0.65, from 0.7403 on *Miss Julie* to 0.9678 on *A Doll's House*."

The paper then says, correctly and immediately: "That agreement is an identity rather than a confirmation, and the paper claims nothing more from it than an identity gives."

The disclaimer is present and it does not survive contact with the sentence before it. Four significant figures, a named range across thirteen named works, a variance-explained percentage to two decimals — that is the prose of an empirical result, and it is doing rhetorical work the paper has just disowned. A reader who takes one thing from §8.2 takes "thirteen out of thirteen plays confirm the collinearity," which is precisely what the paper says it is not claiming. §8.2's own closing paragraph concedes the point — "Per-work correlations on nine frames are noisy in any case and should be read as a range" — and the numbers stay at four decimals anyway.

The same pattern one paragraph up: "With equal variances and trauma independent of entropy, the two scalars correlate at 0.8376." That is a derived constant, not a measurement, and it is given to four decimals alongside measured-looking figures with no typographic distinction.

**Fix:** cut the per-work range and round to two figures; the identity needs one number and a sentence.

---

## 18. MODERATE — The self-correction can be read as the thing it corrects

**Audience: all three. What they do wrong: stop two sentences early and carry away the withdrawn claim.**

§8.3, in order:

> "One claim the arbitration made about this must be withdrawn here, because a paper whose method is to report against itself cannot carry an unchecked claim in its own favour or against it. The arbitration said the trauma threshold $\theta = 0.6$ is implemented nowhere and that the mode-selection function does not take trauma as an argument. That is false."

Sentence one is meta-commentary about method. Sentence two states the false claim in full, in the paper's own voice, with no marker inside it. Sentence three, at the end, reverses everything. A reader skimming for the technical content lands on sentence two, reads a clean factual assertion about the implementation, and moves on.

This is the one place in the paper where the correction runs *in the system's favour*, which is exactly where a reader's guard is down and where the paper's own credibility rule ("we report against ourselves") makes a reader least likely to expect a reversal. Every other correction in the paper runs against the system and is stated fact-first.

**Fix:** invert the order — "The trauma threshold $\theta = 0.6$ is implemented: the transformation-rules module takes trauma and branches on it three times, and its mode reaches every pitch. An earlier arbitration said otherwise and is withdrawn here."

---

## 19. SERIOUS — Two assertions are someone else's hypothesis; seven are not

**Audience: researcher. What she fails to do: find the two she could actually work on, because the table does not distinguish them from the seven she cannot.**

I was asked whether the assertions are stated sharply enough to be someone else's hypothesis. Two are, and they are good.

- **A3** ($r+s+i=1$) is genuinely portable. §10 gives the design in one sentence — "elicitation without the constraint, followed by the correlation matrix" — and a stranger with a rating task, twenty raters and a set of scenes could run it next month and publish a result that contradicts the theory. That is a real contribution and it is the best thing the paper offers a researcher.
- **A5** (trauma and entropy separable) is nearly as good, and §8.2's "A5 succeeding forces A8 to fail as drafted" gives it teeth, because it makes the two outcomes non-trivially coupled.

The other seven are not hypotheses a stranger can hold.

- **A2** ("the registers admit magnitudes") has no instrument, no anchor, no candidate scale, and no statement of what agreement figure would count. Its own status column says "measurement instrument missing," which is honest and also means nobody outside can disagree with it in a way that could be settled.
- **A1** ("the state is nine-dimensional, and these are the nine") states no criterion for what observation would make it eight or ten. §10's entropy-collapse test is about A5, not A1.
- **A6** and **A11** are claims about a particular implementation. A researcher without that repository cannot hold them at all; a researcher with it is auditing, not testing.
- **A4** is recorded as "an open documentation defect," which is a statement about the author's filing system, not a hypothesis.
- **A7** and **A8** are now selector-form questions that §8.2 says "belongs to the ear rather than to a correlation coefficient" and defers to S3.

So the honest accounting is: of nine live assertions, two are testable by an outsider today, one is testable once an instrument exists, and six require either the implementation or a decision the author has not made. The paper's §11 says six of nine "turn on quantities none of which has been tested outside the system," which is the same fact from the evidence side. Nothing says it from the reader's side, which is the side that determines whether anyone else can join in.

**Fix:** add a column to §8.1 naming, for each assertion, the one observation an outsider could produce that would move it; write "none yet" where there is none.

---

## 20. MINOR — Navigation

**Audience: all three. What they do wrong: read in the order given and reach the governing facts last.**

No table of contents in a 7,700-word paper with twelve sections and three audiences. The two sections every audience came for are §8.1 (the assertion table, at about 60 per cent) and §11 (what is actually true of the system, at about 90 per cent). §11 is the section that changes what every reader does next, and it is second-to-last.

Specific misplacements:

- **§11's four disclosures belong in §1.** Where the state values come from; determinism unrealised; most of the typology not reaching output; the two listener studies. A reader who has those four facts reads the rest of the paper correctly. A reader who gets them on page twenty has read nineteen pages wrong.
- **The therapist paragraph is the last paragraph of §11.** It is a scope statement. Scope statements belong in §1's Scope, which currently says only "Nothing here is a clinical model."
- **The two most composer-useful sentences in the paper are buried in an amendment.** §8.2's C2 and C3 glosses — "a burdened theme breaks up sooner, not more"; "a subject whose symbolic organisation is coming apart cannot muster a tutti" — are the only places the paper makes a musical claim a composer can test against his own ear in ten seconds. They sit inside a subsection titled by an assertion identifier.
- **The one job a composer could do for this programme is also buried.** §8.3: "The way to settle it is by ear, against the seven modes over a fixed harmonic bed." That is an afternoon's work, it is the cheapest unblocking step in the whole paper, and it appears in the middle of a paragraph about documentation defects. It should be an invitation, and it should be visible.

**Fix:** a contents list, and §11's four disclosures promoted into §1.

---

## 21. MINOR — Tone: where it explains, where it performs

**Audience: all three. What they do wrong: discount the disclosures, because a section that praises its own honesty is harder to trust than one that just discloses.**

The paper explains, very well, in §2 (the best pages in it — a composer will recognise himself in "Ask why the cue is in Lydian and the answer will be a gesture"), §4.2, §5, §8.2's algebraic core, and §10.

It performs in five places, and they are all the same move — the author rating the author's conduct:

- §6: "Naming the disease three times is better than naming it twice and stepping over the third case."
- §8.1: "because a theory stated as a list of claims with failure conditions can be improved, and a theory stated as a description cannot."
- §8.3: "because a paper whose method is to report against itself cannot carry an unchecked claim in its own favour or against it."
- §8.4: "Two assertions are withdrawn, and saying so costs the theory nothing it was using."
- §5: "That is not a weakness in the theory; it is the location of the theory."

The skeptic flagged self-congratulation at revision 2; revision 3 has removed some and added §6's. The count is not the point. The point is that each of these sentences asks the reader to admire a disclosure instead of reading it, and there are two places (finding 1, finding 18) where the disclosure underneath is not accurate. A reader who has noticed one of those reads the rest of the performances as cover.

The worst single sentence is in §3, and it is worse than the self-congratulation because it is a promise:

> "For a composer that is the difference between a tool and a slot machine. For a therapist it is the difference between an instrument and an oracle. For a researcher it is the difference between a hypothesis and a black box."

It is well made and it is three promises, one of which the paper withdraws twenty pages later (the therapist), and one of which the implementation does not keep (the composer cannot interrogate a cue, because the generator is unseeded and returns a different answer each time — §11's own "a user discovers this by pressing render twice" is a slot machine by the paper's own metaphor).

**Fix:** cut every sentence that rates the paper's own honesty, and cut the therapist clause from §3 until §11 can support it.

---

## What each audience walks away with

### The composer

**Walks away with:** a clear and genuinely useful account of why explicit beats tacit (§2), a good reason not to use valence-arousal (§4.2), two musical propositions worth arguing about over a piano (§8.2's C2 and C3), and one concrete job he could do in an afternoon (§8.3's modal audition). That is more than most papers in this area give him.

**Also walks away with, and the paper did not intend it:** the belief that he can steer a cue by its psychological components, which he cannot (U4); the belief that setting a character's registers in the wizard changes the music, which it does not (U5); a modal assignment he cannot find a normative version of, and a product dictionary that gives him the wrong scale under the right name (U6); and the belief that "register", "mode", "dominant" and "voice" mean in this paper what they mean at his desk (U7).

**What he does not learn at all:** what file he gets at the end, and whether it opens in his DAW (U11).

**Would he close it?** He would not close it in §2 — §2 is written for him and is the best thing here. He would close it in §7, where thirteen paragraphs of physics he cannot use sit between him and §8, and the paper tells him in advance that none of it is load-bearing. If he survived to §8.1 he would read the table and want the failure conditions, which are not there. The paper is not making it easy for the reader most likely to be persuaded.

### The music therapist

**Walks away with:** nothing she can use, and one sentence in §3 telling her this system is "the difference between an instrument and an oracle," which is a claim about a benefit to her practice made in a paper that later says it has not thought about her practice.

**Walks away with, and it is dangerous:** if she follows the paper to the reference implementation — and the header of the paper directs her there — she meets a README section headed "Therapeutic Applications" telling her to track a client's psychological state over time and use the output as a discussion tool (U2). Nothing in the paper reaches that page. Nothing on that page reaches §11's disclaimer.

**What the paper should say and does not:** that the direction of the instrument is fixed by this paper and is the regulated, unsupported direction; that the Lacanian naming is a drama-side provenance and does not travel to a clinical layer; that a generated cue is currently not reproducible and therefore not usable with a person; and that the specific risk is epistemic overwrite in exactly the population a musical channel would most help. All four are already written, in the author's own hand, in `THERAPY-AUTISM-ANALYSIS.md`, and S1 defers all four (U3).

**Verdict on the admission.** Not adequate. Claiming this audience for the series while S1 fixes the direction, the vocabulary and the failure mode without naming any of them is worse than not claiming it, because the claim is what brings her to the README. Either strike the audience until the therapy paper exists, or put three sentences in §1.

### The researcher

**Walks away with:** a real falsification section (§10), an unusually honest provenance section (§5), a genuinely good algebraic result (§8.2), the single most useful disclosure in the programme (§11's "the corpus contains no observation … that the system did not itself produce"), and one study she could run next month without the author's cooperation (A3's unconstrained elicitation).

**Walks away without:** any of the failure conditions, any of the costings, the formal content of five of the fourteen assertions, the citation ledger, the modal table, the chosen candidate form, and the repository — all deferred to companion documents and sequels that carry no identifiers (U8). She can admire the method and cannot execute against it.

**Forms one wrong belief the paper could prevent in a sentence:** that $H$ is an information-theoretic quantity of something (U9).

**The honest summary of replicability:** she can replicate nothing, because nothing has been measured; she can disagree with exactly one thing specifically, which is $r+s+i=1$, and the paper tells her how; and she can design one study from what is here, which is the same one. That is not nothing — it is more than most theory papers in this area offer — and the paper would be stronger if it said so in those words instead of presenting nine assertions as though they were nine handles.
