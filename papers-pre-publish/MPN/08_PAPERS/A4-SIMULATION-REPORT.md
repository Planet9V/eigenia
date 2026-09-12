| Field | Value |
|:---|:---|
| Designation | MPN-SIM-01 |
| Title | Can A4 be settled without listeners? A blind synthetic rater panel, its calibration failure, and what it settles anyway |
| Author of the theory | J. McKenney |
| Status | Simulation report. Feeds S1 section 8.3 and S3 |
| Materials | `a4-sim/stimuli.json`, `panel.json`, `prompt_0..7.txt`, `resp/rater_0..7.json` |
| Ground truth | `ms-research/m1-mode-affect-ground-truth.md` |
| Date | 12 September 2026 |

## 1. What was asked and why a simulation was tried

A4 says the dominant register selects a modal pair and trauma selects the darker member. Four mutually incompatible register-to-mode tables exist in the corpus and the assertion cannot be defended until one is authoritative. The proper instrument is a listener study. It costs money and a term, and the programme has neither yet.

The question this report answers is whether a panel of language-model raters can settle it instead, and the honest answer has two halves: **no, not as a substitute for listeners, and the reason is measurable**; and **yes, it settles something else, decisively, which changes which table the theory should adopt**.

The design was fixed before any rater was run, with a pass criterion and a stop rule, because a simulation with a movable bar is not a simulation.

## 2. Design

Eight independent raters, no shared context, no access to the corpus, no web access, four personas (film composer, music theorist, clinical psychologist without musical training, untrained listener) across three model families, so that agreement could not be an artefact of one model talking to itself.

Each rater saw the seven diatonic modes **stripped of their names**, presented only as scale-degree formulae, semitone distances from the tonic, a count of raised minus lowered degrees, and two structural flags: tritone above the tonic, perfect fifth present. Labels were shuffled independently for each rater.

Four arms, in this order, because order matters:

**Arm A, calibration.** Rank six modes by the happiness a listener would hear, plus three forced choices on tempo, loudness and roughness. Scored against Temperley and Tan's published listener data and against the standard anchors.

**Arm T, target.** Four descriptions of a state a person can be in, with every Lacanian word removed. Three are the registers paraphrased. The fourth is a **nonsense control**: a coherent-sounding description of a state organised by the periodicity of attention, which denotes nothing in the theory. For each, choose one mode, give a confidence and give a reason grounded in interval content.

**Arm X, transfer.** The same four descriptions matched against seven rotations of an **invented scale that has no name and no folklore**. This is the test that separates structural judgement from cultural retrieval.

**Arm M, memorisation, asked last** so that naming could not prime the earlier answers: do you recognise this family, can you name each label, and did you know while answering.

## 3. Arm M: the blind condition is not blind

**56 of 56.** Every rater named all seven modes correctly from interval content alone. Six of eight reported knowing the names throughout, two knowing them partly.

There is no way to run this task blind on a language model. Any result from the diatonic arm is contaminated by everything the model has read about what Locrian and Lydian are said to express, and the contamination is total rather than partial. This is why Arm X exists.

## 4. Arm A: the panel fails the one benchmark that discriminates

The three forced choices were passed 8 out of 8: faster is more aroused, louder is more tense, rougher is more tense. These are so well established and so easy that passing them shows only that the panel is not broken.

The discriminating test is the mode ranking. Temperley and Tan's listeners, in a forced-choice task with the tonic held constant, produced:

> Ionian .83 > Mixolydian .64 > **Lydian .58** > Dorian .40 > Aeolian .34 > Phrygian .21

The load-bearing feature is that this is **not** monotone in brightness. Lydian is the brightest mode and listeners rate it below Ionian and below Mixolydian. Happiness peaks at the unaltered scale and falls away in both directions.

Six of the eight raters produced exactly the pure brightness ordering, Lydian first, with a rank correlation against brightness of **+1.00** and against the listener data of +0.73. One rater put Ionian first and Lydian second. One put Lydian last. The panel's modal answer is the theory of brightness, not the behaviour of listeners.

**Arm A fails.** The pre-registered stop rule says that a panel which cannot reproduce the one published result about the seven modes cannot be cited as evidence about what listeners will hear. That rule is honoured here: nothing below is offered as a prediction about listeners.

The failure is itself worth the day it cost. It says that any human study in this programme must include the Ionian and Lydian comparison as a manipulation check, because the intuition the whole field runs on, brighter is happier, is wrong at exactly the point A4 depends on it.

## 5. Arm T: the panel converges, and not on the table the theory states

| Register, paraphrased | Consensus | Count | Mean confidence |
|:---|:---|---:|---:|
| The Real | **Locrian** | 7 of 8 | 76 |
| The Symbolic | **Ionian** | 8 of 8 | 70 |
| The Imaginary | **Lydian** | 6 of 8 | 65 |
| Nonsense control | Dorian | 8 of 8 | 48 |

Fleiss kappa across the three real registers, eight raters, seven categories: **0.691**. That is substantial agreement by any conventional reading, on a task with seven options and no communication between raters.

The reasons given were structural and were arrived at independently:

- **The Real takes the only mode with no perfect fifth.** Every rater who chose it said some version of the same thing: there is nothing to resolve to, nothing to return to, no stable centre, so the mode cannot be absorbed or negotiated with. That is a reading of the interval content, and it matches Lacan's own definition of the Real as what resists symbolisation, rather than any folklore about Locrian.
- **The Symbolic takes the unaltered reference.** Ionian is the scale from which every other one in the set is defined by difference. A register whose meaning comes from position within an order gets the mode that *is* the order.
- **The Imaginary takes the single raised degree.** Lydian was described as the luminous double of the ordinary major, one step too high, present but never settling into it. The ideal self never quite reached.

Against the corpus tables, taking the consensus as Locrian, Ionian, Lydian:

| Table | Where it lives | Real | Symbolic | Imaginary | Matches |
|:---|:---|:---|:---|:---|---:|
| 1 | assertions register, TS transformation rules, v1 training data | Aeolian or Dorian | Lydian or Mixolydian | Phrygian or Locrian | **0 of 3** |
| 2 | shipped Python calculus, README, core equations | Phrygian | Ionian | Lydian | 2 of 3 |
| 3 | browser calculus | Phrygian or Locrian | Ionian or Mixolydian | Lydian or whole-tone | **3 of 3** |
| 4 | inference server | mode from trauma alone | | | not applicable |

Table 1 is the table the theory document states and the one A4 asserts. It scores zero. Tables 2 and 3, which the running code uses, score two and three.

## 6. Arm X: the convergence is structural, not cultural

This is the arm that matters, because Arm M showed the diatonic arm is contaminated.

The invented family has seven rotations of a scale nobody has written about. One of them, and only one, carries the Locrian signature: no perfect fifth, a tritone above the tonic, five lowered degrees.

**Eight raters out of eight chose that one for the Real.** Unanimous, on a scale with no name, no reputation and nothing to retrieve.

| Register | Structural signature preserved on the unnamed scales |
|:---|---:|
| The Real | **8 of 8** |
| The Symbolic | 6 of 8 |
| The Imaginary | 7 of 8 |

So the Real-to-Locrian assignment is not folklore. It survives the removal of the name, the reputation and the family. The Symbolic and Imaginary assignments largely survive too. Whatever the panel is doing, on this arm it is reading interval content.

That is the finding. The panel cannot tell us what a listener hears. It can tell us, and does tell us with unusual unanimity, **which assignment is structurally motivated and which is arbitrary**, and the theory's own stated table is the arbitrary one.

## 7. The nonsense control, and what it costs the result

All eight raters assigned a mode to the register that denotes nothing, and all eight chose the same one. Confidence was lower, 48 against 65 to 76, and five of eight volunteered that it could not be matched in a principled way; several said so in the strongest terms, that pitch content has no temporal dimension and any answer would be a strained analogy. But every one of them answered anyway, and they converged.

Two things follow. Agreement alone is not evidence of meaning: a panel will agree on the leftover option. And confidence is doing real work here, because the gap between the nonsense register and the three real ones is the only signal separating them. The Imaginary at 65 is closer to the nonsense register at 48 than the Real at 76 is, which is a reason to hold the Imaginary assignment more loosely than the other two.

## 8. The extremity arm, which is the trauma switch

Asked what changes when the state is at its most extreme and most painful:

| Register | Extreme choice |
|:---|:---|
| The Real | Locrian, unchanged, 8 of 8 |
| The Symbolic | **Phrygian, 6 of 8** |
| The Imaginary | no consensus: Locrian 3, Aeolian 3, Phrygian 1, Lydian 1 |

The Real has nowhere darker to go, which is a structural fact rather than a judgement and is a small argument for its assignment.

The Symbolic result is the interesting one and it does not fit any of the four tables. Under maximum pressure the raters did not want the dim partner of Ionian; they wanted the semitone above the tonic, which several described as the order closing in with no space left between the subject and what presses on it. If that is right, the Symbolic pair is not Ionian and Mixolydian but Ionian and something much darker, and the trauma switch is not a dimming but an inversion. That is a claim A4 does not currently make and it is worth an ear.

The Imaginary scattered completely. The theory should not pretend to a dark partner for the Imaginary until something settles it.

## 9. What this does and does not license

**It does not license** any claim about what listeners hear. Arm A settles that. A panel that unanimously gets the published Ionian and Lydian comparison backwards has no standing as a listener simulator and this report does not give it any.

**It does license** three things.

First, Table 1 should be withdrawn. It is the only one of the four with no structural support, it matches the panel on none of the three registers, and the panel's reasons for rejecting it are reasons about interval content that transfer to scales with no names.

Second, the assignment the theory should adopt, pending the listener study, is the one the running code already uses: the Real to the modes without a stable fifth, the Symbolic to the unaltered reference, the Imaginary to the single raised degree. The theory document and the implementation currently disagree, and the implementation is right.

Third, the human study has a design now. It has a manipulation check, the Ionian and Lydian comparison. It has a control condition, the unnamed scale family, which is the only way to separate the structure from the reputation in human raters too. And it has a pre-registered hypothesis with a direction, which it did not have this morning.

**The cost of all this was a day and no money**, against a term and several thousand pounds for the study it informs. That is the argument for running simulations of this kind: not to replace the instrument, but to arrive at the instrument with the arbitrary choices already removed.

## 10. Limitations, stated plainly

The panel is eight raters, not a sample. The personas are prompts, not people. Three model families is diversity of a kind but not independence in any statistical sense, since they share training data and very probably share the brightness prior that Arm A exposed. The invented scale family was constructed by the same person who scored the results, and although the signature test was stated before the answers were read, a different invented family might behave differently. The registers were paraphrased by that same person, and a paraphrase is an interpretation.

And the whole exercise inherits the programme's standing problem: it is another set of numbers the system produced about itself. What makes this one different is that Arm X removed the thing the system could have been retrieving, and the answer did not move.
