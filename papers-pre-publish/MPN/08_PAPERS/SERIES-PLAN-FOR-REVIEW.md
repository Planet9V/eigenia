# Music and score series: plan for review

Nothing in this document has been written yet. It is the outline for a new, independent four-paper series on the script-to-score application. The existing MPN-1 to MPN-4 papers are untouched and stay where they are.

## 1. What went wrong with the first four, so the same thing does not happen twice

| Defect | What it looked like | What it should be |
|:---|:---|:---|
| Genre mismatch | Standards-specification style borrowed from the WG-05 DEXPI papers: designation lines, RFC 2119 keywords, numbered conformance requirements | A paper argues that something is true. A specification says what a thing must do. Only one of the four documents below is a specification, and it says so |
| No contribution | Each paper's core move was descriptive: what Lacan wrote, what channels exist, what the code does, what the law permits | Each paper states a question, a method, a result and what follows. A reader must finish it knowing something they could not get from the sources |
| Ceremony | 85 numbered requirements across four papers, for a system with no users | Requirements appear only in the specification paper, and only where two implementers could otherwise diverge |
| Citation as evidence | 84 to 87 references in documents with no findings | References support claims. Worked analyses and measurements carry the argument |
| Wrong application | Control-room sonification of plant and alarm state | Dramatic text in, orchestral score out, which is what the system does |

## 2. What the system actually is, in one paragraph

A composer gives it a play. For each character in each scene it derives a psychological state: two scalars for trauma and entropy, a three-way weighting across Lacan's registers of the Real, the Symbolic and the Imaginary, and a personality profile in DISC and Big Five terms. That state selects a key, a mode, a tempo, a metre, a dynamic level and a chord, and it generates a leitmotif for each character whose root pitch comes from the personality profile and whose rhythm comes from one trait. The result is engraved on a stave per speaking character, plays back through sampled instruments, and exports as MIDI, MP3 and MusicXML. Thirteen canonical plays ship with hand-annotated frames, including Hamlet and Antigone, on both of which Lacan wrote a seminar.

## 3. The proposed four papers

### S1. The method: deriving a musical parameter set from a dramatic character's position

**Question.** Can a character's position in a dramatic text be represented as a state that determines musical choices reproducibly, so that two readers working from the same text and the same rules produce the same score?

**Claim.** Yes for the mapping from state to music, which is a function and can be made exact. No for the mapping from text to state, which is a reading and must be declared as one. The paper's contribution is the formal separation of those two steps, and the demonstration that only the second is contestable.

**Genre.** Methods paper. Nearest published forms: computational literary studies methods articles, and music-theory papers that formalise an analytical procedure.

**Outline.**
1. The problem: scoring decisions in drama are made by ear and are not reproducible; two music editors given the same scene produce different cues for reasons neither can fully state.
2. Prior art for putting numbers on characters, honestly surveyed. Berry and Brown 2017 rated stock character types; Pizzolli and Strapparava 2019 assigned binary Big Five values to named Shakespeare characters with F1 between 0.45 and 0.61 and called it exploratory. No psychometrically defended trait vector exists for Hamlet, Medea or Antigone. This paper is therefore the first to propose one and must carry that burden openly.
3. The state, and where each component comes from. Trauma and entropy as dramatic quantities, not clinical ones. The three registers, derived from Lacan's own readings rather than asserted. The personality profile, with the standing of each inventory stated: Big Five replicated, DISC without independent validity evidence.
4. The category-error objection and the answer to it. L. C. Knights's 1933 attack on treating characters as people with offstage lives is the strongest form. The answer this paper can defend: the state is a reading of positions and stage business, not a diagnosis of a mind, and Lacan's own Hamlet reading works the same way, on the interrupted burial rites and the hour of the Other rather than on Hamlet's psyche.
5. The mapping from state to music, with an evidence tier on every row. Tempo to arousal is well supported; mode to valence is a Western convention that tempo overrides; roughness is one component of tension; the neo-Riemannian transformations are mathematics, not psychology. The tiers are the paper's honesty mechanism.
6. Worked micro-example: one scene, one character, state to score, by hand.
7. Limits. What the method cannot do, and what would falsify it.

**Evidence base.** Lacan Seminar VI Hamlet material, verified from the Hulbert translation in Yale French Studies 55/56; Seminar VII Antigone chapters, verified from the Porter translation; Knights 1933, read in full; the music-cognition evidence already gathered; Berry and Brown, Pizzolli and Strapparava.

**Length.** Six to eight thousand words. Two figures.

### S2. The notation: a score grammar for dramatic state

**Question.** What exactly must be written down so that a score generated from a play is reproducible, readable by a musician, and revisable by a composer?

**Claim.** A complete grammar, small enough to implement in a week and exact enough that two implementations agree note for note.

**Genre.** Specification, and it says so on the first page. This is the one document in the series where numbered requirements belong, because their function is to stop two implementers diverging.

**Outline.**
1. Scope, and what a reader gets: the frame and bar model, the header block, the parameter set, the stave layout.
2. The frame: what a frame is in a play, how frames are delimited, what a frame carries.
3. The header: key, mode, tempo, metre, dynamic, chord, and the rules that set each from the state.
4. Character voices: one stave per speaking character, leitmotif construction, the interval table, how personality sets root pitch and rhythm, how a motif is transformed when the character's state moves.
5. Transitions: the neo-Riemannian operations on triads, defined correctly on all 24 triads, with the operation triggered by a state change named exactly. This is where the existing implementation is wrong, and the paper fixes it.
6. Ensemble: how simultaneous characters are voiced, how absence is made audible, the stream budget.
7. Rendering and deliverables: engraved score, MIDI with a tempo map, MusicXML, stems. What a music editor needs that the current exports do not provide.
8. Two worked examples, computed rather than asserted, that a reader can reproduce.
9. Conformance: the requirement list, short.

**Evidence base.** The existing implementation's behaviour, the corrected transformation algebra, professional deliverable practice.

**Length.** Five to seven thousand words, mostly tables and examples.

### S3. Scoring Hamlet and Antigone: two worked analyses

**Question.** When the method is applied to two plays Lacan himself read closely, does the resulting score track his reading, contradict it, or reveal something neither the text nor the reading makes obvious?

**Claim.** This is the paper that earns the series its place. It is an analysis, and its result is whatever the analyses actually show, including a negative result. If Hamlet's music does not change at the prayer scene, that is a finding and it goes in.

**Genre.** Analysis paper, in the tradition where a music analyst and a literary critic address the same object.

**Outline.**
1. Why these two plays: Lacan wrote a seminar on each, so there is an independent reading to test against, and both are already annotated in the system.
2. Method recap in one page, pointing to S1 and S2.
3. Hamlet. The state trajectory across the play. What the score does at the four places the criticism cares about: the interrupted funeral, the play within the play, the prayer scene, Ophelia's burial. Lacan's Seminar VI reading against the score, and his different Seminar VII account of the prayer scene, which is a distinction the literature often collapses.
4. Antigone. The state trajectory. What the score does at the two deaths, at the Chorus's turn, at Antigone's last speech. Lacan's account of Atè as a limit and of beauty as a veil, against what the music does.
5. What the scores agree on, what they contradict, and what they add.
6. Where the method broke. Every place the state derivation produced something the text does not support, named.
7. A comparison the paper must survive: the same scenes scored by a competent human composer's temp choices, or by a generic mood-conditioned tool, so that the reader can judge whether the psychological layer is doing any work at all.

**Evidence base.** The generated scores themselves, produced by running the system; the two seminars; the standard criticism.

**Length.** Eight to ten thousand words, with notated examples.

**What does not exist yet.** The scores. This paper cannot be written from documents. The system has to be run, its output inspected bar by bar, and the defects in the existing implementation fixed or worked around first.

### S4. The system, its state, and what would show that it works

**Question.** What has been built, what is honest to claim about it, and what study would settle whether the psychological layer improves a score over a simpler baseline?

**Claim.** A description of the instrument that a reader could reimplement, an accurate statement of maturity, and a study design specific enough to run.

**Genre.** System paper with an evaluation design. Nearest published form: a music-technology system paper with a preregistered listening study.

**Outline.**
1. Architecture: text to state to score to sound, with the parts that are implemented, the parts that are stubs, and the parts that call an external model clearly separated.
2. What the audit found, stated once and without drama: the training runs that used random targets, the adapter whose loop is a no-op, the export that returns a fixed tone, the two calculi that disagree. This belongs here, in two pages, not as a paper of its own.
3. Reproducibility: seeds, versions, and what a reader needs to regenerate a figure from this series.
4. The evaluation question, stated so it can fail: does a score generated from the psychological state carry information about the character that a listener can recover, beyond what tempo and loudness alone would carry?
5. The study: stimuli, the baseline to beat, task, sample, analysis plan, and the result that would count as negative.
6. What a positive result would and would not license.

**Length.** Five to seven thousand words.

## 4. Order, dependencies and what is blocking

| Paper | Depends on | Blocked by |
|:---|:---|:---|
| S1 method | Research already gathered, plus one pass on dramatic structure and character theory | Nothing |
| S2 notation | S1's state definition | Nothing |
| S3 analyses | S1, S2, and actually running the system on the two plays | The implementation defects in the transformation algebra and the exports |
| S4 system and study | S1 to S3 | Nothing to write it; running the study is a separate act |

The honest sequence is S1, then S2, then fix enough of the implementation to trust its output, then S3, then S4.

## 5. What I need from you

1. Does this set of four answer the question you are actually asking about this system, or is there a fifth thing that matters more than one of these?
2. S3 is the paper with the intellectual payoff and it cannot be written without running the code and reading the output. Is that in scope, or should the series stop at S2 until the implementation is fit to produce figures?
3. Who is the reader? A composer, a research audience, a funder, or the working group itself. The register changes with the answer.
4. Do you want the Lacanian frame to carry the theory, or to appear as one reading among several? The method works with a simpler affective state model, and the paper is easier to defend that way, though it loses the connection to your earlier work.
