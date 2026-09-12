# Review A — User Advocate

**Subject:** Block A, assertions A1–A11, `/home/claude/ms-drafts/ASSERTIONS-REGISTER.md`
**Supporting:** `/home/claude/ms-drafts/S1-mckenney-lacan-theory.md`; `/home/claude/mpn-analysis/repo-deconstruction.md` §4–§5; verification passes directly against `/home/claude/mpn-conductor-standalone`.
**Date:** 2026-09-12

**Mandate.** Whether these assertions serve the people who would use them. I do not redesign, do not add features, do not override stated goals, and do not argue about whether the theory is true. Where an assertion is false but comprehensible I pass it to the skeptic. Where it is true but unreadable, it is mine.

**The three users, held fixed throughout.**

- **The composer** wants cues they can use, revise and defend to a director. Needs to know why the system did what it did, and needs to override it. Deliverables that matter: engraved score, MIDI with a tempo map, stems, MusicXML.
- **The therapist** wants a piece with properties they can specify for a session. Will not read an equation. Needs to say what a piece will do before playing it to someone, and needs to stop it.
- **The researcher** wants something testable, replicable and citable. Needs operational definitions, stated constants, and a result that could come out the other way.

---

## 0. What a user actually touches

Six facts about the delivered surface govern every verdict below. Each was checked in the repository, not inferred from the papers.

**U1. The main conductor screen has no psychometric control at all.** The only two `type="range"` inputs on `src/app/mpn-conductor/page.tsx` are AI sampling temperature (`:729`) and output volume (`:845`). A user selects a pre-annotated scenario and presses play. Trauma and entropy are hand-authored per frame in `literary_data.ts` and are not editable in the interface that produces the music.

**U2. The one parameter-override panel offers major or minor.** `MusicalParametersPanel.tsx:11-20` exposes exactly `tempo`, `key`, `mode` restricted to major or minor, `timeSignature`, `dynamicRange{min,max}`. The seven-mode vocabulary that A4 rests on — Aeolian, Dorian, Mixolydian, Lydian, Phrygian, Locrian — cannot be selected by a user anywhere. The theory's central musical claim has no control surface.

**U3. The deliverables a composer named are two of four, and the one that matters most is absent.** MIDI export is real and does write a tempo meta-event (`src/lib/midi_writer.ts:33-38`, `0xFF 0x51`). MP3 export is real. **PDF export is a text report** — title, statistics, dramatis personae, a per-frame table (`score_exporter.ts:390-590`) — not engraved notation. MusicXML exists (`score_exporter.ts:348`) and is untested. No stems export exists on any path.

**U4. The same input produces a different cue on each render.** Nine unseeded `Math.random()` calls sit in the composition path (`GeniusComposer.ts:351,356,361,371,403,410,413,419,539`) and a tenth picks the instrument (`psychometric_calculus.ts:216`). One input state, two renders, two different pieces.

**U5. The glossary is a user-facing document and it does not carry S1's disclaimer.** `src/app/wiki/reference/glossary/page.tsx` defines "Trauma Score" as "a normalized value [0,1] representing unresolved psychological trauma" (`:154-155`) and "Entropy (Psychological)" as "psychological disorder, unpredictability, and chaos" (`:161-162`). S1 §9 says trauma here is a dramatic weight and not a clinical measure. That sentence does not appear in the glossary a user reads. 66 terms are defined there; the disclaimer is in none of them.

**U6. A stop control exists, but not where the music is.** `PlaybackControls.tsx:80-84,188-192` has a stop button and a spacebar binding — in the wizard. The conductor page, which is what the play-library scenarios run in, has play/pause buttons and a volume slider.

These six are not the theory's fault and I am not asking the theory to fix them. They are the conditions under which every assertion below will be met by a user.

---

## 1. The assertions, one at a time

### A1. The state is nine-dimensional, and these are the nine

**Who does it serve, and how would they notice?** The researcher, primarily — a named, bounded, countable state is exactly what makes a study designable, and A1 is the only assertion in Block A that hands a researcher an object to operationalise. The composer notices it as a readout: the conductor page displays derived state per frame. The therapist never encounters nine of anything and would not want to.

The trouble is that a user meets three different counts. The wiki architecture page asserts "57D → 768D" (`architecture/overview/page.tsx:239`) and an entire wiki section is titled "57D Input Space". The register and the calculus say nine. What audibly moves on the shipped path is two: trauma and, nominally, entropy — and entropy is pinned (see A5). A composer who reads the site, then the paper, then listens, counts 57, then 9, then 2, and has no way to reconcile them. That is not a subtle inconsistency; it is the first number on the marketing page disagreeing with the first number in the theory.

**What would the user misunderstand?** "State" is the first collision. A therapist hears *state* as an activation state — regulated, dysregulated, hyperaroused — something a person is in right now and that can change in a session. Here it is a coordinate vector, five components of which are scene-global and four of which are constant for a whole play. "Dimension" is the second: to a composer, dimensions are things you can turn; here, seven of nine cannot be turned by any control in the product. And "bounded to the unit interval" reads to a non-mathematician as a claim that the quantity has a real ceiling — that trauma *saturates* — when it is a scaling convention.

**Can the user act on it?** No. There is no interface anywhere that sets nine values. The four DISC components come from a character profile; τ and H come from hand-authored frame data; r, s and i are a constant. A composer who disagrees with the state cannot edit the state; they can only edit the music afterwards, in which case the state has stopped explaining anything.

**Verdict: ACTIVELY MISLEADING** — not because nine is the wrong number, but because three different numbers are presented to the same user in the same product and the assertion does nothing to settle which one they are looking at.

---

### A2. The Lacanian registers admit magnitudes

**Who does it serve, and how would they notice?** Nobody, currently. The registers take the value (0.33, 0.33, 0.34) on every frame of every play on both composition paths (`page.tsx:366-370` falling through to defaults because `currentFrame.real` does not exist; `GeniusComposer.ts:159` hard-coding the same triple). A user has never heard the register magnitudes vary. The researcher could notice it if an annotation protocol existed; none does.

**What would the user misunderstand?** This is the worst single word in the theory for the composer, and it is not "Real". It is **register**. To every musician alive, a register is a pitch range: the low register of the clarinet, writing in the upper register. "Real-dominant register" will be parsed as a range of pitches before it is parsed as anything Lacanian, and the misreading is coherent enough that the user will not notice they have made it — a theory that assigns musical consequences to "registers" and also assigns notes to staves has given the same word two jobs in one sentence.

Then the three names. **The Real** is read as *reality*, which is precisely what S1 §4 says it is not. **The Imaginary** is read as *imagined, made up, not real* — so "high Imaginary" reads as "this character is deluded" rather than "this character is invested in an image of themselves". **The Symbolic** collides head-on with music's own term of art: symbolic music means MIDI and notation as opposed to audio, and the repository's own honest-framing paragraph uses "symbolic musical parameters" and Lacanian *symbolic* within a few lines of each other. A composer reading "symbolic-dominant" in a document about symbolic music has a genuine ambiguity, not a lazy one.

**Can the user act on it?** No — there is no control, and the only path that produces varying values counts keywords in the annotator's own prose. A composer cannot say "this scene is more Symbolic than you have it".

**Verdict: THEORY-INTERNAL.** No user encounters a register magnitude. The commitment is real and it is entirely between the theory and itself.

---

### A3. The registers are competitive, and the state lives on a simplex

**Who does it serve, and how would they notice?** No user, in any form. `r + s + i = 1` is invisible at every surface: no display, no control, no export field. A researcher would notice it only as a constraint on an annotation protocol that does not exist, and the constraint is the thing they would have to *remove* to test it.

There is one way a user meets it indirectly and it costs them something. Because the three are forced to sum to one, a user who wanted to say "this character is intensely invested in both law and fantasy" has no way to say it — the vocabulary cannot express it, so the thought does not arrive. That is a real usability cost of a modelling decision, and it is worth stating as such rather than as an argument about whether the decision is correct.

**What would the user misunderstand?** "Competitive" reads, to a therapist, as a claim about the person — that the registers are in conflict inside them, which sounds like a clinical formulation. It means only that three numbers are normalised. "Simplex" will be read by nobody; it is not a word either named user has. "Borromean stability", which travels with this assertion, is worse: "stability" is already a therapist's word for something a client either has or does not, and already a musician's word for tonal stability, and the index itself has four incompatible definitions across the code and the wiki (repo-deconstruction §3.9), one of which is printed on the "Theory → Implementation" page a user is invited to read as a Rosetta Stone.

**Can the user act on it?** No, and there is nothing to act on.

**Verdict: THEORY-INTERNAL.**

---

### A4. The dominant register selects the mode, with trauma as the second switch

**Who does it serve, and how would they notice?** The composer, more than any other assertion in Block A. Mode is the parameter a composer hears first, argues about with a director, and can defend in one sentence. "This cue is Lydian because the character is still inside the symbolic order and not yet under weight" is the kind of sentence A4 exists to license, and it is a good one.

It is also the assertion where what the user is told and what the user hears diverge most. There are four incompatible mode tables in the material a single user can reach in an afternoon:

| Source a user can reach | Real → | Symbolic → | Imaginary → |
|---|---|---|---|
| This register, A4 | Aeolian / Dorian | Mixolydian / Lydian | Locrian / Phrygian |
| Wiki glossary (`glossary/page.tsx:192,199`) | — | Lydian | Phrygian (high trauma) |
| Shipped calculus + README | Phrygian | Ionian | Lydian |
| v1 training data (`generate_synthetic_pairs.py:23-30`) | Dorian / Aeolian | Lydian / Mixolydian | Phrygian / Locrian |
| Inference server (`server_v2.py:223-227`) | mode from trauma alone | registers not consulted | registers not consulted |

Real maps to Aeolian in the register and to Phrygian in the code. Imaginary maps to Locrian in the register and to Lydian in the code. These are not near-misses; Lydian and Locrian are the brightest and darkest modes in the set. A composer who learns the theory and then listens will hear the opposite of what they were taught, and will conclude the tool is broken rather than that the documents disagree.

And there is no trauma switch in any shipped implementation. The two-stage mechanism — register picks the pair, trauma picks the member — is the part of A4 that makes it *explicable*, and it exists only in prose.

**What would the user misunderstand?** "Dominant" is the highest-density collision in the whole theory and it lands on a composer's home ground. In harmony, the dominant is the fifth degree, the chord that wants to resolve; it is the single most used word in tonal analysis. In DISC it is the D. In the PAD affect model — which this same codebase implements as a speech output head producing arousal, valence and **dominance** (`speech/wav2vec_encoder.py:57-64`) — it is a third thing. And in A4 it means *argmax of three numbers*. "The dominant register selects the mode" is a sentence in which a musician's two strongest technical words are both being used in senses they do not have in music.

Then "mode" itself: A4 means church modes. `MusicalParametersPanel` means `'major' | 'minor'`. A user who wants to override a mode gets two options.

**Can the user act on it?** No. There is no mode control beyond major/minor (U2). A composer who thinks the system chose wrong can neither override nor correct, and because the register values never vary (A2) they cannot reach the mode through the state either. This is the single most expensive absence in the product: the theory's signature decision is the one a composer cannot touch.

**Verdict: ACTIVELY MISLEADING.**

---

### A5. Trauma and entropy are separable, and act on different musical parameters

**Who does it serve, and how would they notice?** All three, and this is the best assertion in Block A for an actual person. "Loud because burdened, incoherent because scattered" is a complete, memorable, checkable sentence that a composer can say to a director, a therapist can say to a supervisor, and a researcher can operationalise as two scales. It is the only place in the register where the theory earns its keep in one line. The separation is also musically productive: it names the difference between a heavy cue and a chaotic one, which composers know and rarely articulate.

The user-facing problem is that on the shipped path entropy does not act. `composeMelody(..., entropy = 0.5)` is never passed an entropy value (`GeniusComposer.ts:148-154`; `score_orchestrator.ts:302-307`), so every consequence A5 promises for coherence runs on a constant. One other input path sets `entropy: Math.random()*0.3+0.2` outright (`analyze-character-psychometrics/route.ts:251`). A user who hears two cues that differ only in entropy will hear no difference, and will reasonably conclude the distinction is decorative.

**What would the user misunderstand?** **Trauma** is the term with the largest consequence and it is used in two voices. S1 §9 is scrupulous: a dramatic weight, not a clinical measure, predicated of a character in a play. The glossary a user reads says "unresolved psychological trauma" with no such qualification (U5), and the Python calculus contains `clinical_health(trauma) = int((1 - trauma) * 10)`. A therapist meeting a 0–10 "clinical health" score derived from a "trauma score" has been handed something that looks exactly like a screening instrument and is not one. The paper's disclaimer does not travel with the software, and the software is what a therapist will meet first.

**Entropy** collides three ways. To a researcher it is Shannon entropy, which the theory documents invoke by formula and the implementation does not use — H is hand-authored, or derived from punctuation counts (`mpn_calculus.py:135-165`), and the Shannon helpers that exist are never called. To a composer, "entropy" is a familiar knob on generative tools meaning *how much randomness in the output*; here it is a property of the character, not of the generator, and a composer will turn it expecting jitter. To a therapist it is simply not a word about people.

**Can the user act on it?** Partly. Dynamic range is exposed in the wizard panel (U2), which lets a composer override the audible consequence of trauma after the fact. Nothing exposes entropy or its consequences. Neither variable can be set on the conductor path at all (U1).

**Verdict: SERVES A NAMED USER** — the composer, and the sentence is worth protecting. It serves them despite the implementation rather than through it, and the naming of trauma is the liability it carries.

---

### A6. The transformation typology is a function, not a repertoire

**Who does it serve, and how would they notice?** The composer, in principle, and this is the assertion that most directly answers "why did the system do that". Four named transformations, each with stated trigger conditions, is exactly the audit trail a composer needs to defend a cue.

A user hears two of them. `applyProfessionalTransformations` returns `{mode, orchestrationLevel, instruments, fragmentation, harmonyContext}`; only `.mode` and `.fragmentation.level` are read downstream — `orchestrationLevel`, `instruments` and `harmonyContext` appear only inside a `console.log` (`GeniusComposer.ts:179-190`). Orchestration growth and harmonic recontextualisation, two of the four transformations the assertion is about, are computed and discarded. A composer told that the system grows the orchestration under load, who then listens for it and does not hear it, has been given a reason for something that did not happen.

**What would the user misunderstand?** "Function" is the load-bearing word and it is read differently by each user. A researcher reads *mathematical function*: total, single-valued, testable. A composer reads *functional* in the harmonic sense — functional harmony, a chord's function — and also in the plain sense of "it works". A therapist reads *what it is for*. The assertion means the first, and the contrast it is drawing, function versus repertoire, is a contrast only the researcher will feel.

"Recontextualisation" is jargon without a payoff: the thing it names — recasting a motif under different harmony — has a perfectly good short name in every orchestration text, and using the long one costs the composer a lookup for nothing.

**Can the user act on it?** No. There is no per-transformation toggle, no way to say "fragment here but don't thin the orchestration", and no display of which transformations fired on a given frame. The PDF export is a text report of state, not of decisions (U3). The composer gets neither the transformations nor the record of them.

**Verdict: ACTIVELY MISLEADING** — four are named and promised, two reach a note, and nothing in the product tells the user which.

---

### A7. Fragmentation has ordered levels, selected by a scalar

**Who does it serve, and how would they notice?** The composer, and the naming here is the best craft writing in the register. *Full statement, truncation, core motif, interval residue, dissolution* is a vocabulary a composer can use immediately, can hear, can mark in a score, and can say out loud in a spotting session. A director will understand "we're at interval residue by the end of the scene" with no explanation. That is rare and it should be kept exactly as it is.

Two levels of the five are reachable on the shipped path. With H pinned at 0.5, the scalar `0.6H + 0.4τ` is confined to [0.3, 0.7] against thresholds at 0.25, 0.5, 0.75 and 0.9. The motif is never stated in full and never dissolves. The two endpoints — the ones that carry the dramatic meaning, the intact theme and its disappearance — are exactly the two a user cannot reach.

**What would the user misunderstand?** **Dissolution** is the risk word for the therapist: it sits very close to dissociation and to dissolution of self, and in a document that also says "trauma" and "clinical health" it will be read as describing a person coming apart rather than a tune. **Fragmentation** has the same problem, one step milder — a fragmented sense of self is standard clinical vocabulary.

The composer's risk is smaller but real: "core motif" is being used as a *stage of degradation*, whereas in ordinary usage the core motif is simply the head of the theme, present from the start. A composer will read "core motif" as a thing, not as a level.

**Can the user act on it?** No. There is no fragmentation control and no display of the current level. A composer who wants the theme intact for one more phrase cannot ask for it.

**Verdict: SERVES A NAMED USER** — the composer, through its vocabulary, which is the assertion's real contribution and survives every implementation problem around it.

---

### A8. Orchestration density has ordered levels, selected by a differently weighted scalar

**Who does it serve, and how would they notice?** The composer, by the same mechanism as A7 and slightly less well. *Solo, chamber, section, full orchestra, tutti* is standard and usable. The trouble is that no user hears it: orchestration level is one of the three values computed and dropped into a log (A6). Density on the shipped path is whatever the instrument assignment happens to produce.

**What would the user misunderstand?** The cognitive-load problem in this assertion is specific and avoidable. The user is asked to hold two scalars apart:

- fragmentation `= 0.6H + 0.4τ`, thresholds 0.25 / 0.5 / 0.75 / 0.9
- density `= 0.7τ + 0.3H`, thresholds 0.2 / 0.4 / 0.6 / 0.85

Same two variables, weights swapped and nudged, four thresholds each, none shared. No user will retain which is which, and nothing in the naming helps — both are "how intense is it" scalars with different arithmetic. A composer who wants to predict what the system will do has to carry eight constants and two formulas in their head to predict two ordinal levels. The distinction between the weightings is doing theoretical work (it asserts that force and coherence load differently) and no user work at all; the difference between 0.6/0.4 and 0.7/0.3 is not audible and is not actionable.

"**Density**" also collides inside the project's own documents: A8 means number of instruments, while the glossary says DISC maps to "rhythmic density" (`glossary/page.tsx:124`), which is notes per bar. Two densities, no distinguishing adjective in most sentences.

**Can the user act on it?** No control, no display, no override. The instrument that does reach the output is chosen by `Math.random()` from a family list (`psychometric_calculus.ts:216`), so the one audible correlate of density is partly arbitrary and not repeatable.

**Verdict: SERVES A NAMED USER** for the five named levels, which are good. The *differently weighted scalar* — the part the assertion's title is actually about — is **THEORY-INTERNAL**: it is invisible, unactionable, and its only user-facing effect is the load of remembering eight constants.

---

### A9. Objet a is the divergence between internal model and observed state

**Who does it serve, and how would they notice?** No user. The quantity never reaches a musical parameter on the served path: `object_petit_a` is defined in `advanced_extensions.py:212-227`, its sole caller is `compute_extended_musical_parameters`, which is itself uncalled, and its inputs are conscientiousness and a Dark-Triad composite (`:523-526`) rather than anything resembling a model-observation gap. A composer will never hear it. A therapist will never see it. A researcher cannot cite it as implemented.

**What would the user misunderstand?** Every reader misreads *objet petit a* on first contact, including readers who know the term, and the theory adds a third sense on top of the two already in circulation. The plain-English reading is "the object of desire" — the thing the character wants. Lacan's is the opposite: a remainder that escapes symbolisation, not a thing anyone can have. The theory's is a third: prediction error, a divergence magnitude from the free-energy literature. A composer who hears "objet a is high in this scene" will write music about *wanting*, which is a defensible musical decision and not what the number means.

"**Divergence**" compounds it. To a musician, divergence is voices separating. To a statistician it is KL divergence. To a therapist it is nothing. And "free energy", which the assertion imports, has three senses in this project's own documents — Friston's variational bound, the thermodynamic quantity, and the potential well in the collapse model. S1 §6 already flags this and asks S2 to give them different names; that instruction should extend to anything a user reads.

**Can the user act on it?** Nothing to act on.

**Verdict: THEORY-INTERNAL.** A theory-internal commitment that spends borrowed credibility with the only readers who would recognise the term, and buys no user anything.

---

### A10. The audience is a term in the model

**Who does it serve, and how would they notice?** No user, and there is no code. Searching the whole repository for an observation weight or observer coefficient returns only prose: the reference dictionary and the wiki glossary. The modulation `state × (1 + k · observation weight)` is not implemented on any path. Nothing a user does changes it, because there is nothing there.

Of the eleven, this is the one a *reader* is most likely to find compelling and a *user* least likely to encounter — which is the definition of a theory-internal commitment, and labelling it as one costs the theory nothing. The idea that a performance before an empty house is a different act is genuinely interesting; it is just not in the product.

**What would the user misunderstand?** "**Observation**" is the therapist's collision and it is a sharp one. Clinical observation of a client is a defined professional activity with a defined meaning. A therapist reading "an audience's attention modulates the observed subject's state" inside a document that also says trauma, crisis and clinical health will read this as a claim about *their own observation of their client*, and specifically as a claim that observing the client changes the client's measured state — which sounds like a warning about their own instrument. It is not; it is about performers and audiences.

The quantum-measurement framing that travels with A10 in the source documents makes this worse for every user. S1 §6 is honest that it is analogy. But "collapse", "superposition" and "entanglement" applied to an actor's state will be taken literally by exactly the readers who cannot check, and will be taken as a red flag by exactly the readers who can. Neither is a user the theory wants to lose.

**Can the user act on it?** No.

**Verdict: THEORY-INTERNAL.**

---

### A11. The whole composes: it is a calculus

**Who does it serve, and how would they notice?** All three, and it is the product's central promise. "Computed rather than chosen" is what makes a composer's cue defensible to a director, what lets a therapist say in advance what a piece will do, and what makes a researcher's replication possible. Every other assertion is a component; this is the one the user is buying.

The user notices it failing immediately. Press render twice, get two different pieces (U4). Determinism is not an abstract property here — it is the difference between a tool and a slot machine, which is S1's own phrase in Proposition 4, and the shipped path is the slot machine. A composer cannot revise a cue, because the cue does not survive a re-render. A therapist cannot preview a piece and then use it, because what they previewed is not what plays. A researcher cannot give two listeners the same stimulus.

**What would the user misunderstand?** Four words, in descending order of damage.

**Deterministic** is heard by every user as "the same every time", which is the correct plain reading of the technical term and is false of the product. This is the most consequential single word in Block A because it is the one a user will test within five minutes.

**Total** means, to a mathematician, defined on every input. To a composer it means the complete score; to a therapist, the whole thing. S1 §5 states the real consequence plainly — nonsense in, music out, the system never declines — and that consequence is the one a therapist most needs to know and is least likely to extract from the word "total".

**Calculus** reads to both non-mathematical users as "mathematics I cannot check". It signals inaccessibility at exactly the moment the theory is claiming accessibility. The assertion's own content — the parts compose — is the opposite of forbidding, and the word hides it.

**Compose** is doing double duty in the assertion's own title: *the whole composes* means function composition, and every reader of a music paper will read it as writing music. "The whole composes: it is a calculus" is a five-word sentence containing two false-friend terms for its primary audience.

**Can the user act on it?** Only downstream and only partially. The wizard panel lets a composer override tempo, key, major/minor, time signature and dynamic range after the fact (U2). Every parameter that carries the theory's actual content — mode as a modal choice, fragmentation stage, orchestration level, register balance — is unreachable. And because re-rendering does not reproduce, an override applied to one render does not carry to the next.

**Verdict: ACTIVELY MISLEADING** — on the word "deterministic", which is the word the assertion needs most and the one the product contradicts fastest.

---

## 2. The vocabulary problem

This is the highest-value section and I have ordered it by damage rather than by appearance. "What it actually means here" is taken from the theory documents and the code, not from what I think it should mean.

### Tier 1 — terms that will cause a user to act wrongly

| Term | What a composer thinks | What a therapist thinks | What it means here |
|---|---|---|---|
| **register** | a pitch range — the low register of the clarinet | a record, or a formal style of language | one of Lacan's three orders, Real / Symbolic / Imaginary |
| **dominant** | the fifth degree; the chord that resolves | assertiveness, or dominance in the PAD affect model | the largest of three numbers (and separately, the D of DISC) |
| **trauma** | dramatic weight, loosely | a clinical history with a definition, a screening instrument and a duty of care | a hand-authored scalar of unresolved dramatic burden, not clinical, per S1 §9 — a qualification the glossary omits |
| **score** | the notated music | a psychometric score: trauma score, risk score, a number about a person | both, constantly, in the same sentences — "trauma score" sits four screens from "export score" |
| **crisis** | a dramatic turning point | a clinical crisis: risk, escalation, intervention, possibly a duty to act | `λ > 0.2 ∧ BSI < 0.3`, a shape in a curve |
| **clinical health** | — | a clinical judgement | `int((1 − trauma) × 10)`, a 0–10 number with no clinical content of any kind |
| **compliance** | — | treatment adherence; also regulatory compliance | the C of DISC: accuracy and rule-following |
| **deterministic** | the same every time | predictable, safe to preview | the same every time — asserted, and false on the shipped path |

### Tier 2 — terms that will cause a user to misread the theory

| Term | What the user thinks | What it means here |
|---|---|---|
| **the Real** | reality; what is actually the case | what resists symbolisation — emphatically not reality (S1 §4) |
| **the Imaginary** | imagined, fictional, made up | the register of image, identification and the ego |
| **the Symbolic** | symbolic music — MIDI, notation, not audio | language, law and differential meaning |
| **objet a** | the object of desire; what the character wants | Lacan: a remainder that escapes symbolisation. Here: a prediction-error divergence. Three senses, none matching the plain reading |
| **entropy** | a randomness knob on a generative tool (composer); Shannon entropy (researcher) | disorder of symbolic organisation — a property of the character, not of the generator; implemented as hand-set values or punctuation counts, not Shannon |
| **dissolution / fragmentation** | dissociation, fragmented sense of self (therapist) | stages of motif degradation |
| **stability** | tonal stability (composer); a client's stability (therapist) | Borromean stability index — which has four incompatible definitions in the shipped material |
| **observation** | clinical observation of a client | audience attention on a performer |
| **projection / attribution** | psychoanalytic defence mechanisms | names of cognitive biases in a 36-item one-hot list |
| **influence** | — | the I of DISC (sociability) — while the theory separately imports Granovetter *influence* propagation, a different thing |
| **steadiness** | steady tempo (and the code emits `steady_4_4`) | the S of DISC (patience, consistency) |
| **free energy** | — | Friston's variational bound, the thermodynamic quantity, and a potential well — three senses in one project (S1 §6 concedes this) |
| **density** | notes per bar | number of instruments — while the glossary uses "rhythmic density" for the first sense |
| **intensity** | dynamic intensity | the orchestration scalar `0.7τ + 0.3H` — and separately, the parameter named `intensity` in `composeMelody`, which is trauma |
| **resolution** | harmonic resolution | resolution of trauma; and the resolving power of the representation |
| **mode** | a church mode: Lydian, Dorian, Phrygian | a church mode in the theory; only major or minor in the one control a user has |
| **total** | the complete score | defined on every input — so nonsense in, music out |
| **calculus** | mathematics I cannot check | a set of composing functions |
| **compose** | to write music | function composition |
| **bias** | prejudice (therapist); statistical bias (researcher) | one of 36 named cognitive biases |
| **dark triad** | — | a labelled screen value: `psychopathy: 0.4` attached to a character |
| **profile** | an actor profile | a psychological profile — with the profiling connotation intact |

### Tier 3 — inherited vocabulary that means nothing to any named user

The tempo bands are named `STRATEGIC`, `OPERATIONAL` and `CRISIS`, with ranges 40–60, 80–100 and 120–180. Those are the War Room / Boardroom / Ops Floor bands of a security-operations sonification document (`RSCH-39…md:60-81`), carried across unchanged. "Seldon Crisis" and "alert score" and "22-minute lead time" come from the same place. A composer reading "the operational tempo band" learns nothing; a therapist reading "crisis detected, severity 0.6" learns something alarming and false. This vocabulary is not wrong so much as addressed to a user who is not in the room.

### The one recommendation this section carries

The terms in Tier 1 are not a style problem. Four of them — trauma, score, crisis, clinical health — appear together on surfaces a therapist would see, and together they read as a clinical instrument. S1 §9 disclaims this in one paragraph, in a paper, which is not where a user is. That is the whole of my recommendation and it is within my mandate: the disclaimer has to travel with the word, everywhere the word appears, or the word has to change.

---

## 3. What a composer gets that they cannot already get

Honestly: one thing, and it is currently unusable. The thing is a *stated reason* for every parameter — a cue is fff because τ is 0.87, thin because H is high, in this mode because that register leads — and there is no other tool that offers it. A composer defending a cue to a director does not need the music to be better than what they would write; they need a sentence that survives a producer asking why, and A5's force-versus-coherence split plus A7's five named fragmentation stages are genuinely good sentences that a director will understand without training. That is real, it is small, and it is the whole of the novelty. Everything else a composer would want, they already have and have better: a DAW sketches faster, a notation program engraves properly, and any generative plugin gives more control with less reading. Set against that, what actually ships is MIDI with a tempo map (good), MP3 (fine), a PDF that is a statistics report rather than a score, an untested MusicXML path, no stems, an override panel that reduces the theory's seven modes to major or minor, two of the four promised transformations never reaching a note, and a re-render that does not reproduce the cue they just approved. The reason-for-every-parameter is also currently circular — it points at a τ and H that a human hand-authored for that frame, so "why is it loud" resolves to "because someone typed 0.87", which is not a defence a director will accept twice. A composer should take the vocabulary, which is free, and wait for the exports.

---

## 4. What a therapist would need before they could use any of this with a client

Confined to usability and comprehension, and assuming every ethical and regulatory question has already been answered elsewhere: they would need to be able to state, in advance and in acoustic terms, what the piece is going to do — peak level, dynamic range, whether and how fast it changes, duration, tempo and whether tempo moves, whether dissonance appears and at what point, and the highest frequency content — because those are the properties a session is planned around and none of them is currently visible before playback. They would need the same settings to produce the same piece twice, or preparation is impossible: a piece you audition on Sunday and cannot reproduce on Monday cannot be used in a session at all, and this is the single blocking defect. They would need the stop control on the same screen as the play control, always, with no penalty for using it. They would need the whole Tier 1 vocabulary off any surface a client might see and off any surface the therapist reads while forming an impression — "trauma score 0.8", "clinical health 2/10" and "crisis detected" are sentences that will be believed, and there is nothing behind them. They would need one page in their own language, with no equations, that says what each control does to the sound rather than what it means about a person; the current bridge document is a table of equations titled "Theory → Implementation" whose printed BSI formula does not match the code. And they would need the direction of the instrument to be legible: right now the product reads as *supply a person, receive a reading*, and what a therapist actually wants is *specify properties, receive a piece* — the same machine, but they cannot tell from the interface which one they are holding.

---

## 5. The three assertions that would most confuse a user, ranked

**1. A4 — the dominant register selects the mode.** The confusion is a contradiction, not an obscurity. Four documents a user can reach in one sitting give four different register-to-mode tables, two of which are exact inversions of each other (Real → Aeolian in the register, Real → Phrygian in the code; Imaginary → Locrian in the register, Imaginary → Lydian in the code). The user hears one thing, reads another, and has no way to tell which is the error. Layered on top: "register" and "dominant" are both false friends on a musician's home ground, the trauma switch that makes the mechanism explicable exists only in prose, and the override panel offers major or minor. A composer will conclude the tool is broken, because from where they are standing that is the most economical explanation.

**2. A11 — the whole composes: it is a calculus.** The confusion is that the word carrying the promise is the word the product contradicts within five minutes. "Deterministic" has exactly one plain meaning, the user will test it by pressing render twice, and it will fail. The damage is disproportionate because A11 is the assertion the other ten are in service of: a user who catches determinism failing does not conclude that nine `Math.random()` calls need seeding, they conclude that "computed rather than chosen" was a figure of speech, and every explanation the system offers afterwards is heard as decoration. Secondary load: "total", "calculus" and "compose" are all false friends in a five-word title.

**3. A1 — the state is nine-dimensional, and these are the nine.** The confusion is arithmetic and it is visible without any expertise. The wiki says 57, the theory says 9, and 2 audibly move. Below that: five of the nine are scene-global, so two characters in the same frame differ only by a per-play constant while the interface presents each as individually profiled — a user watching two characters' staves diverge is watching a constant, not a state. A composer cannot set any of the nine; a therapist is being shown a dimension count as evidence of sophistication and cannot check it; a researcher cannot tell which count to cite.

**Named runner-up, for a different reason.** A9 and A10 are the two assertions no user of any kind will ever encounter — *objet a* never reaches a musical parameter and the observer coefficient has no implementation at all. They are not confusing; they are invisible. Labelling them as theory-internal commitments in the register itself would cost the theory nothing and would stop a reader from looking for something that is not there.
