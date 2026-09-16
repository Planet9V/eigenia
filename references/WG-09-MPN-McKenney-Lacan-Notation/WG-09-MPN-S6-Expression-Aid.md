# The Expression Surface: Rendering the Shape of a Conversation as Sound and Image

**J. McKenney**

Paper 6 of the Musical Psychometric Notation series, and the companion to MPN-S5. MPN-S1 states the theory, MPN-S2 the formal apparatus, MPN-S3 the mapping from psychological state to musical material and MPN-S4 the reference implementation; MPN-S5 covers the four dialogue use cases and this paper covers the expression surface.

Licence: CC BY 4.0. 15 September 2026.

## Executive Abstract

Most tools that analyse conversation report on the people in it. They score a speaker, rate a relationship, or infer a state of mind from the way the talk went. The Expression surface described in this paper reports on the exchange. It renders the *shape* of an exchange, who held the floor and for how long, who followed whom, who came in over whom and how quickly, as a musical score and as a graph, and every quantity it renders is a quantity of the exchange.

It is built for a reader who finds the shape of a conversation easier to read as sound or image than to infer from the speech itself. Autistic readers are among the people this design is for, and it is offered as a communication and expression aid whose whole output is a rendering of the exchange's shape.

The paper settles seven questions that the underlying design left open, and reports one measurement new to this programme. That measurement asks whether the unit in which speaking time is counted, seconds, words or turns, actually changes who a conversation appears to be dominated by. On three plays it does: the two computable units agree on who spoke most and disagree about almost everything below that, moving the second voice of *Hamlet* from Horatio to the King, and shifting the share of the exchange covered by the leading pair by as much as 12.8 points. On two anthologies the top speaker itself changes with the unit. The consequence for the surface is direct: every setting is shown to the reader with a sentence naming what it does to the output in front of them rather than what the unit means in the abstract.

Three design positions carry the most weight. The score renders one interaction stave per persona, a persona being an actor, a character, a speaker in a podcast or any persona a score carries, with the cast free to grow and shrink; a new persona is placed at the farthest available point in the timbre space, so every persona already on the page keeps its voice. A named comparison between two people is permitted on a stave. And the measures derived from overlap are released once a backchannel lexicon has been established for the language and the speech community in question, because a word list that scores the most supportive listener as the most aggressive interrupter produces a false positive that reads as a measurement.

Section 12 sets out the questions the design leaves open, and section 13 the work that would settle them.

## Abstract

This paper specifies the Expression surface of the Musical Psychometric Notation programme: a renderer that takes the observed measures of a dialogue transcript and returns a musical score and a graph of the exchange's shape. The surface is confined to Layer 1, the observed measures over a transcript, and therefore consumes the interaction mapping Ψ alone; the state mapping Φ runs where a human being has rated a state. The paper establishes what follows from that confinement: what the surface renders, which measures it releases on which condition, and what it says while a condition stands outstanding.

Six observed measures are in scope: floor share, speaker adjacency, overlap, latency, reciprocity and backchannel. The paper reports a new computation over the programme's seven score files establishing that the floor-share unit changes the answer below the busiest speaker, and derives from it a rule for how settings are presented. It releases the overlap-derived measures once a backchannel lexicon has been established for the relevant language and speech community, and holds them uncomputed until then. It scopes the per-person measures to the material rather than to the surface, permits a named per-person comparison on a stave as a labelled untested permission, and distinguishes a per-person measure from a ranking over people. It sets the layout at one interaction stave per persona, every stave an interaction stave, and shows that at two personas each stave carries floor share and latency, which is two independent quantities inside a declared budget of two to three. It supplies the sentence the surface carries on its own face, specifies the acoustic bounds the audio renderer declares, and states the conditions under which the whole surface would be abandoned.

---

## 1. Introduction

### 1.1 What this paper is

This is a paper about a tool. The tool renders the shape of an exchange. The question it asks throughout is whether the tool serves the person using it, and in several places the answer is the specification for the work that makes it so, stated as a specification rather than as a caution.

**It is a theory paper, offered for comment and improvement rather than as a finished specification.** The mapping at its centre is constrained by the obligations this paper states, and writing it is item 1 of section 13; the listening study set out in section 3 is the instrument that reports what a rendering of it communicates and settles the open questions of section 12. That is said once, here, and the paper then gets on with the design.

The test the paper is written to is this: write it as you would write a paper about a tool for professional musicians. The user knows what they want, the tool serves it or falls short of it, and the paper's job is to say which. A sentence that would read as condescending to the person using the tool is an error in the paper rather than a caution to that person, and where such a sentence would be needed to defend a design, the design is wrong and is changed instead.

### 1.2 The reader this surface is for

This surface's reader is anyone who finds the shape of a conversation easier to read as sound or image than to infer from the speech itself, and the question they bring is: *what actually happened between us, in the shape of the exchange rather than in what either of us was like?* Every position taken in sections 4 to 10 is answerable against that question, and section 11 records, for each, what the position costs the question and what it buys it. Where a position costs the question something and this paper takes it anyway, it says so in its own row rather than in a footnote.

Autism is among the author's named applications, and the framing is a communication and expression aid [5]. The design writes the audience as anyone who finds conversational dynamics easier to read as sound or image than to infer from speech. That is a statement about a preference for a medium, which is the only kind of statement this paper makes about its reader, and it is the same kind of statement one makes about a musician who reads a score faster than a description of a score.

Where this paper draws on the autism literature it does so to constrain the tool. That evidence, carried here through the author's own analysis of the application domain [13], answers exactly three questions: what an existing listener figure was measured in and therefore what it licenses, what the renderer has to declare about its own acoustic output, and who has to be in the room when the tool's own instruments are designed. Each of the three is a constraint on the tool: the first fixes the sampling requirement of section 3.4, the second fixes the acoustic declaration of section 10.7, and the third fixes the participatory requirement of section 10.8. The reader at the keyboard is described by one thing throughout this paper, which is the medium they prefer to read a conversation in. One point from that analysis is worth repeating where an implementer will read it: music is the modality where the measured difference between autistic and non-autistic listeners is smallest, which is the defensible sentence and is a narrower claim than music being a preserved strength [13].

### 1.3 Scope

The material is synthetic. The dialogue is dialogue the programme generates, or published dramatic text, and the work is held inside the programme. Every requirement in this paper is technical or epistemic.

The paper sits against section 6.4 of the unified design [5] and consumes the theory, the formal apparatus, the state mapping and the application audit [1], [2], [3] without amending them. The Instrument is a separate surface with its own conditions, and this paper leaves it there [4]. And Ψ, the interaction mapping, is constrained here by the obligations sections 10 and 11 set out; section 10 states them rather than working around them.

### 1.4 What the paper settles

Seven things, each in its own section and summarised in section 11: the stave layout, the form a setting takes on the surface, what happens to the overlap-derived measures, the per-person rule, which timing case the reader of this surface is in, the sentence the surface carries on its face, and the acoustic properties the audio renderer declares. Section 4 additionally reports a measurement, of how far the floor-share unit changes the answer, that is new to this programme.

---

## 2. What the surface shows

### 2.1 The layer boundary

**Expression is Layer 1 only** [5]. That sentence has been in the design from the beginning and it is the whole of the claims boundary, so it is worth spelling out as a chain rather than quoting as a label.

Layer 0 is the transcript: turns, timings, speakers, with parse confidence reported as a first-class output and a refusal below a declared threshold [5]. Layer 1 is the observed measures over that transcript: floor share, speaker adjacency, overlap, latency, reciprocity and backchannel, each carrying a named setting that changes the answer and is shown on every output [5], [21]. Layer 2 is a human being's rating, recorded as a judgement. Layer 3 is a machine's proposal, marked as a proposal wherever it appears.

**The state mapping runs where a state exists, and a state exists where a human has rated one** [5]. That is a structural rule: the derivation of a rated quantity from turn structure was shown false and withdrawn, and the state mapping's domain is the nine-component state the mapping paper specifies [3]. Expression's inputs are Layer 0 and Layer 1 throughout, and its user works from a transcript. **So every quantity on this surface is a quantity of the exchange, and the state mapping's domain is empty here.** That is a consequence of the layer boundary rather than a promise the product makes, and it is checked by asking what the input to the state mapping would be and reading the answer off the layer diagram.

**What the tool renders is therefore a function of four things: who spoke, when, for how long, and after whom.** The interaction mapping takes the Layer 1 measures and renders the shape of the exchange. It is a different function from the state mapping, with a different domain, and the design is explicit that the two are kept apart [5].

### 2.2 The vocabulary this surface speaks

The engine is named for a psychometric calculus whose state variables carry a Lacanian provenance. That vocabulary belongs in the theory and drama papers, where it is accurate and where it is an asset, and the user-facing layer speaks the reader's language [13]. On this surface that follows from the layer boundary: everything Expression computes and renders is one of the six Layer 1 measures over a transcript, named in section 2.1. The split is a fact of the layer boundary here rather than a rule someone has to remember, and the mark on the face of every output says the operative half in the reader's own language: this renders the shape of the exchange [5].

### 2.3 The epistemic question, and how far the layer boundary answers it

The risk specific to this family of tools is epistemic overwrite: a person handed a confident-looking external representation of their own state, produced by an unvalidated mapping, may take the representation as the answer [13]. The condition of that risk is that a representation of a state is produced. Expression's output is a representation of the exchange, so the claim about states is closed by construction.

The wider structure takes more than construction to close, and it is worth being exact about how far the closure reaches. The risk has three parts: a confident-looking external representation about the person, an unvalidated mapping, and the reader taking the representation as the answer. This surface does produce a representation about the reader's exchange, through a mapping this paper constrains and the listening study reports on, and section 3's conduct reading is the same structure with *conduct* in place of *state*. What holds the surface to Layer 1 is the rule stated at section 8.6, that the state mapping is turned on by building a different surface rather than by setting a control. A rule is the right instrument here, because the failure mode is gradual rather than sudden and a gradual failure is caught by a check rather than by a crash.

One path by which a state representation could enter this surface has been enumerated, a Layer 2 rating arriving by configuration, and the closure above reaches that path and no further. Three other objects on the surface carry a quantity about the reader and are enumerated against the full conjunction by item 14 of section 13: the numeric readout, the graph, and the surface sentence itself. This programme's own rule is that a claim of this kind reaches exactly as far as the class its enumeration covers.

**What remains is a different problem, which is section 3's.** A rendering whose whole content is the shape of an exchange can still be read as a verdict on conduct, because it is rendered in music and music is read affectively whatever the mapping intends. Layer 1 only closes the claim, and section 3 is where the reading is settled.

### 2.4 What the tool shows, and where the boundary of it runs

The interaction mapping is content-blind, so two people who agree and two people in a polite deadlock have the same Layer 1 signature and render the same [5]. Adjacency is sequence rather than response, because a transcript marks the order of turns and an addressee is marked in the content, and the renderer's directed arrow is a default rather than a claim [5], [8]. So the tool reports who spoke after whom, and who was answering whom is a question for the content of the talk.

On a script, four of the six measures are available, floor share becomes a line or word count, and reciprocity's window becomes a turn count rather than a duration [5]. Backchannel's availability on a script follows from which of its two definitions applies, and section 5.5 gives the rule.

### 2.5 Where Layer 3 goes, and it renders as text

Expression is Layer 1 only, so the question of what the surface would do with a machine proposal is closed before it opens. It is still worth recording what the answer would be, because the design's framing for the Live surface names bias as something the display shows. The bias layer is a text channel throughout: it is a Layer 3 detector whose output is a marked textual proposal beside the Layer 0 turn that prompted it, and text is the whole of what it renders on any surface [9].

The layer's own state supports that. Its reconciliation run of 14 September 2026 gives thirty entries, thirty now naming a state coordinate with three flagged as the author's to settle, eighteen signatures, and eight collisions involving twenty of the thirty; and its own closing note names the three pieces the layer still owes: a representation for a turn the detector passes over, an abstention rule and a per-turn cap [12]. **So a version of Expression that showed bias would show text.** That answer is conditional and the condition is stated: the channel allocation was taken as the null with a reopening condition rather than a permanence clause, and it reopens on a detection rate from the two pilot studies. A musical bias rendering is barred by a decision that evidence can revisit, rather than by the layer boundary that bars the state mapping here [9].

---

## 3. The affective reading, and what the listening study has to establish

### 3.1 The conflict, stated without softening

**The interaction mapping's claims are claims about the exchange, and its codomain is music, which is read affectively by construction.** The design states the conflict in those terms and resolves it by testing rather than by wording: a user whose conversation renders harsh or thin will read that as a verdict on the conversation and on themselves, and a line of text saying otherwise is overridden by a minor key [5]. That sentence stands unsoftened here, and the listening study of section 3.4 is what answers it.

### 3.2 The evidence the programme already holds

The Instrument paper carries a systematic review of the major-minor dichotomy which finds the major-happy and minor-sad association robust, developing from 58 per cent correct at age four to 92 per cent in adults, and replicated in Japanese and Chinese samples [4], [15]. The same review finds major and minor inducing equal happiness in a group of people with minimal exposure to Western music, and about 70 per cent of listeners performing near chance when asked to classify rapid tone-scrambles; the authors read the association as a psychoacoustic predisposition that becomes an established cultural connotation through exposure [4], [15].

**Both halves matter here.** The association is strong in the adult listeners it was measured in, which is why the design treats it as a real hazard rather than a theoretical one; and it is exposure-conditioned rather than universal, which is why the figure is re-measured on a different set of ears.

The programme's own listener evidence is the two studies the theory paper reports, and it reports both: one gave twenty-four participants a mean appropriateness rating of 4.2 on a five-point scale and tested an assignment that no shipped module implements; the second is a null result at forty-eight participants, p = 0.72, effect size 0.08, sitting in a document that presents the system as validated. Both used stimuli from an unseeded generator, and seeding the generator is what makes a restaged study reproducible [1]. The mapping paper says the same of the bias layer's devices: the listening work that establishes what each of the thirty carries is work still to be run [3]. **This surface therefore runs its own study, and section 3.4 states what that study has to establish.**

Listener testing of the interaction mapping is a condition of its shipping on every surface; what varies by surface is the required result rather than whether the study is run [5]. This section states the required result here.

### 3.3 Why the required result is strictest on this surface

The reason is about the layout and not about the reader.

The design demotes the score to a secondary renderer on the Studio and Live surfaces, where the graph leads and the score sits beside it, and records that demotion as evidence against the thesis rather than as a user-interface decision [5]. Expression is the surface where the score leads, because sound and image are what its audience is defined by wanting.

The exact form of the argument matters. Expression's screen carries three things, as Studio's does: the interaction staves, the graph that section 6.4 assigns the by-name attribution to, and the numeric readout. What differs is the configuration a given reader is in rather than the count. For a reader who takes the sound and not the image, and the design writes this audience as people who find conversational dynamics easier to read as sound **or** image, the score is the whole of what they read, and an unintended affective reading of the interaction mapping is then a distortion of their entire output rather than of one panel of three. That is a claim about a configuration rather than a property of the surface, and how this audience divides between the two is measured by item 13 of section 13. The conclusion holds on that narrower ground: **for the sound-only reader, the musical rendering carries the whole of the informational load.**

### 3.4 What the study must establish, in four parts

**One, the object of the inference.** Present a listener with a rendering of an exchange and ask what they take it to be about. The score is the object, not the pleasantness. A listener who says the music sounded harsh has reported the stimulus. A listener who says one of those people was hostile, or that the conversation went badly for someone, has drawn an inference about the people in it, and that report is the reading the study exists to detect. The question must be open rather than forced, because a forced choice between named readings supplies the reading the study is trying to measure.

**Two, the conduct reading specifically.** The residue that survives every argument about wording is that music is read affectively and a minor key overrides a line of text [6]. The sharp form of it on this surface is a reading about conduct, section 2 having closed the reading about a state: whether a listener told that a rendering is of an exchange they took part in hears it as an evaluation of how they behaved in it. The material under study stays synthetic, so the condition is supplied by the framing given to the listener rather than by the material, and the comparison is between listeners told the exchange is theirs and listeners told it is not. If the framing moves the reading, section 9's sentence is rewritten, and the study is what says so.

**Three, whose ears.** The 92 per cent is a general-population adult figure [4], [15]. Three findings in the author's analysis bear on whether it transfers to the listeners this surface is designed with, and they point in different directions [13]. Allen, Davis and Hill found physiological responsiveness to music intact while verbal report of the response was reduced, with the gap fully mediated by alexithymia, which is the shape of a warrant for a non-verbal channel. Kinnaird's review puts alexithymia at 49.93 per cent against 4.89 per cent, described there as common rather than universal. And Suslow and Kersting found that alexithymia degrades the perception of emotion in music as well, which points the other way. **A study on this surface's own listeners is what settles the direction**, which is why the required result is established there rather than inherited from the review. Instruments validated in general populations are adapted and retested for autistic adults, and that position applies to a listening instrument exactly as it applies to a questionnaire [13]. This is a sampling requirement on a study and nothing more is claimed from it.

**Four, the required result and what failing it costs.** Listener testing is a condition of shipping, so the result is a condition rather than an input to a judgement [5]. For this surface the required result is that the open-inference test of part one returns readings about the exchange, at a rate fixed before the study is run rather than after, and that the rate holds under the framing manipulation of part two. **A mapping that meets that result ships on this surface, and a mapping that misses it takes one of two routes:** respecify its codomain choices and retest, or ship the visual renderer alone.

### 3.5 Two populations, and the difference between them

Two populations are in play in this section and each takes its own phrase.

The **audience**, as section 1.2 defines it and as the design writes it, is anyone who finds conversational dynamics easier to read as sound or image. That is a statement about a preferred medium and is the only kind of statement this paper makes about its reader.

The **sample** that part three needs is a different question. Whether the general-population result transfers is a question about listeners whose response to the affective channel may differ, and the findings cited above are about one such group. So the required result is established on the sample most likely to produce a null, which is the conservative choice; a positive result on that sample is evidence about the audience, while a null on it is a reason to look at the audience rather than a verdict on it. The audience is defined by preference throughout, and the sample is a sampling frame for one study. Stating the sampling frame properly is item 16 of section 13.

### 3.6 The purpose of the study, and how the pack says so

The purpose is to find out what the mapping communicates. A mapping read as a verdict is a defective mapping, and the defect is in the mapping's codomain choices. Every result of this study is a finding about the mapping, and the pack says so in the same plain register the programme's existing therapist pack uses, which tells its participants the system's defects before asking them anything and invites the answer that the whole idea is misconceived [17].

### 3.7 What survives a failed study, and the work it takes

The second available response above, shipping the visual renderer alone, could be a real product rather than a consolation. The graph carries the full speaker set whether or not the score does, which is the design's own sentence about what carries the material a two-stave reduction drops [5], and the audience is defined by sound **or** image. A surface that renders the shape of an exchange as a graph, with its settings and its refusals intact, is the thing this paper describes minus one renderer, and it would be the honest outcome of a failed study rather than a retreat from it.

Two things are built before that sentence can be made. The graph's specification is item 10 of section 13. And an inference test for a visual rendering, which puts the graph in front of readers and asks what they take it to be about, is item 17: the listener conditions are written for listeners, and the comparative study at implementation item 9 asks which renderer answered a user's question, which is a usefulness test rather than an inference test. So the fallback offered here is the one object in the chain that those two items deliver, and the falsifier at section 12.3, which holds the surface to a visual renderer that carries a different reading, is evaluated by the instrument item 17 builds.

### 3.8 One more required result, easy to lose

The design requires a difference below the resolution floor to be rendered as **unmeasured**, visibly distinct from any rendering of an even exchange, and worded so that a reader knows the difference falls below what the recording resolves; it calls this one of its central honesty claims [5], [8]. Whether the musical channel carries that distinction audibly decides whether the musical renderer is self-sufficient here or the rule holds in the visual and textual channels beside it. The study asks, and it is the fifth part of item 2 in section 13.

---

## 4. Settings, and what the floor-share units actually do

### 4.1 A control needs a basis as well as a label

Showing a user a control reading *floor share unit: seconds, words or turns* hands them the power to change the answer, and a basis on which to choose is what makes that power usable. The design names supplying that basis as the work [5], [8]. Removing the control would be the wrong repair: a tool that exposes the decision that changes the answer serves its user better than one that hides it, and a control removed from this audience and kept for another would be exactly the condescension this paper refuses. **The user keeps every control, and gains a basis for each of them.**

### 4.2 The premise, computed

The design asserts that the three units genuinely disagree about who dominated a conversation [5]. A dedicated script, new with this paper, measures the disagreement on the only material the programme holds, which is the seven score files, under the design's own exclusions: *King Lear* refused for parse failure, the non-speaker token dropped under the non-dialogue rule, and the three anthology files printed below the line, because a top-two share over a file of several plays with disjoint casts measures the anthology rather than any play in it [5], [10], [14].

| Score file | Top two by turns | Top two by words | Coverage, turns | Coverage, words | Speakers at 1 per cent or more | Changing rank between the units |
|:---|:---|:---|---:|---:|---:|---:|
| A Doll's House | Nora, Helmer | Nora, Helmer | 64.6 | 71.0 | 7 | 4 |
| Hamlet | Hamlet, **Horatio** | Hamlet, **the King** | 40.4 | 53.2 | 18 | 17 |
| Macbeth | Macbeth, Lady Macbeth | Macbeth, Lady Macbeth | 30.0 | 42.3 | 22 | 17 |

### 4.3 What that establishes

The two computable units disagree, and on one of the three single plays they disagree about which speaker is second, which is precisely the pair a two-stave reduction renders. They disagree about how much of the exchange that pair covers by 6.4, 12.8 and 12.3 points. Below the single busiest voice, the design's premise holds on this material, and it is now a measurement rather than an assertion.

### 4.4 The narrower claim, which is the half a reader will assume

On all three single plays the single busiest speaker is the same under both units. The disagreement is about the order below the top. **The design's sentence is therefore stronger than the material supports, and the narrower claim is the true one**: the units agree about who spoke most and disagree about almost everything after that.

Two files do change their top speaker, and both are anthologies: the Chekhov file, where Irina leads by turns and Lubov by words, and the Strindberg file, where Maurice leads by turns and Adolphe by words and falls from first to fourth. An anthology figure is a figure about the anthology, so both sit outside the claim above [5], [10].

### 4.5 Three limits travel with the table, and all three are load-bearing

Seconds waits on turn onsets and offsets, and a script carries text, so the two computable units on this material are words and turns [5]. Seconds is also the unit most unlike the other two, since a speaker with few long turns and a speaker with many short ones are exactly the pair it separates, so every number above is a lower bound on the disagreement.

A row in these files is a line rather than a turn, so the turn column merges consecutive rows carrying the same speaker, which is the nearest approximation the material allows.

And all seven files are dramatic texts rather than conversations or moderated exchanges, which is a standing limit on every corpus figure in this programme [6]. These figures are new here and stand for verification in their own right; the coverage column is a different computation from the verified 69.2, 50.1 and 39.0 per cent, which count rows and retain the non-speaker token [10].

### 4.6 What the surface does with a setting

Each setting appears with a sentence saying what it changes, and the sentence names the consequence on the output in front of the user rather than the definition of the unit:

> *Floor share is counted in seconds. Counted in turns instead, this exchange reads as 53 to 47 rather than 40 to 60, and the floor-share line on each stave inverts.*

That form is the one that supplies a basis, because the effect on this exchange is a reason to prefer a unit where the definition of the unit is a reason to understand it. It costs a recomputation under the alternative setting, which is cheap on material known in advance and is bounded by the design's requirement that a selection be reversible without re-ingest [5].

The *Hamlet* instance from section 4.2, *counted in turns instead, the second voice is Horatio and not the King*, is the same form drawn from a surface that selects a principal pair. It is given here as the general pattern rather than as an output this surface produces, because Expression renders one stave per persona and carries the whole cast.

### 4.7 The default is justified by the material rather than chosen

Where turn onsets and offsets exist the unit is seconds; where the material carries text alone, floor share is a different measure and is labelled one, being a word or line count, under the design's rule that a script analysis and a podcast analysis are separate measurements and are reported separately [5]. So the ingest fixes the default on first use and the sentence beside it says what the alternative would do, which leaves the user choosing on a basis rather than out of the air. The numeric defaults themselves are among the parameters section 10.5 lists for fixing.

### 4.8 Disagreement is content

A conversation whose ordering is stable across units and one whose ordering inverts are different conversations, and the second fact is worth rendering. *Hamlet* is the case: a reader told only that the two principal voices are Hamlet and Horatio has been told something that a change of unit reverses, and a reader told that the pair depends on the unit has been told something true about the exchange. This is stated as a property of the material, in the same voice as any other measure rather than as an apology for the tool.

---

## 5. Backchannel, overlap, and the measure that waits on a lexicon

### 5.1 The failure this section exists to prevent

This is the failure most likely to do real harm on this surface, and the design names it exactly. A raw overlap detector scores the most supportive listener as the most aggressive interrupter, and the design's mitigation at Layer 1 is that the backchannel lexicon is declared and editable [5]. Editing a word list is an expert act, and on this surface the mitigation has to hold without one being performed [5], [8]. The design leaves the choice as a disjunction: either the lexicon is right by default for the deployed language, or the overlap measures are held as they are on a single room microphone [5].

### 5.2 The second branch is the one available

The design records that gap length and overlap tolerance vary by language **and by speech community**, that a fixed threshold will therefore systematically score some communities as more interruptive, and that the defaults are declared rather than universal [5].

That record is about a threshold and not about a word list, and taken at its full width it proves too much: it would withdraw the overlap threshold on every surface in this programme, and the latency turn-boundary rule with it, because gap length is exactly what latency measures, and latency is the one measure that section 12.1 leaves standing here. Whether the threshold and the turn-boundary rule do inherit the community variation is a real question and it is item 12 of section 13.

What the design's record does establish, and it is enough for the narrower point, is that a list is right for one community inside one language, where the first branch claims a default right for a whole language. **So the surface takes the second branch.**

### 5.3 Held until the lexicon exists

**The overlap-derived measures are held by default on this surface, and released on a lexicon.** They are released where a lexicon has been established for the deployed language and speech community by the same standard the programme applies to any other measured quantity, and establishing one is a programme task rather than a user task. Until then, overlap initiated and overlap received are **left uncomputed**, which is what the design already specifies for a single room microphone, adopted here for an independent reason [5].

*Left uncomputed* is the operative phrase and it is chosen against two weaker options. A measure computed and greyed is a measure the user will read. A measure computed and rendered as zero is worse, because zero is a finding. The design's own rule is that a flat output from an input still to arrive and a flat output from a flat conversation are rendered differently, and it applies here word for word [5].

### 5.4 What the surface shows while the lexicon is outstanding

**It says so before it says anything else.** The analysis opens with the sentence, ahead of the content rather than in a footnote, in the same position a single-microphone analysis uses and for the same reason the design gives: interruption is the dynamic most users are trying to read, and a stated condition is what tells a reader where the overlap answer has got to [5]. The wording names the cause rather than the symptom:

> *This analysis reports who held the floor, who followed whom, and how quickly each speaker came in. The overlap measures, who came in over whom, are released once a backchannel lexicon has been established for the way this group talks. A lexicon built for the language settles half of it: what counts as talking over someone varies between communities inside a language.*

**It is sorted as *specification pending*.** The design requires every held measure to state which kind it is and the one action available, because a bare blank reads as a fault [5]. This one is a measure whose specification is in progress, and its stated action is to name the work it waits on, which is item 3 of section 13, a backchannel lexicon for one language and one speech community. The sort is what carries the useful information to the reader: it tells them that their material is the right material, that their recording setup did its job, and that the outstanding work belongs to this programme rather than to them. Each of the four kinds the design defines carries its own one action in the same way, and a measure sorted into the right kind sends the reader to the right place.

**The other measures render normally.** A held overlap leaves the rest of the surface intact, and the sentence above is a statement about one measure family.

### 5.5 Backchannel is a measure in its own right, with two definitions

Backchannel is a sixth Layer 1 measure [21]. It had previously been a parameter of the overlap row rather than a measure the design defined, and the naming of a sixth measure was an authority the design reserved to the author; it has now been exercised.

Backchannel is measured differently on different ingest classes, and the rule is stated rather than left to the implementation. On class A, which is generated dialogue and script text, where the text is exact and the speaker labels are given, a backchannel is a **lexical** object: a count of short supportive utterances against a lexicon. On class B, a microphone per speaker, and class C, a single room microphone, where a detector is running anyway, it is **timing-derived** and patterns with overlap and latency.

Three consequences follow and all three are binding.

The measure carries **two settings rather than one**: a lexicon for the lexical definition and a timing rule for the timing-derived one. Layer 1 is therefore six measures and six settings.

A backchannel count from a script and a backchannel count from a room recording are **two different quantities**, and the output declares which definition produced the number, in the same way the floor-share unit is a declared setting shown on every output, and for the same reason: a reader comparing two numbers produced by two definitions is comparing the definitions. Specifying the per-class definition and the declaration is item 18 of section 13.

And the lexical definition inherits the keyword-counter precedent **on class A specifically**, which is the primary material. Section 5.3 holds the overlap-derived measures precisely because a backchannel lexicon is a keyword counter and the application audit found one read as a measurement through three revisions of a paper [2]. Naming backchannel a measure puts a keyword counter on the primary material in its own right. That is defensible and it carries a cost, and the paper that argues hardest against it is the one that now carries it.

On this surface the practical effect is small, because backchannel goes with the overlap-derived measures under section 5.3 and is held with them until a lexicon exists. Its effect elsewhere is larger: a script's available set goes from three measures of six to four of six, which strengthens the weakest surface in the programme, and at two speakers backchannel given and received carry distinct values, which gives the two-speaker case more content than it had appeared to have.

One consequence of the naming is worth recording because it reverses a correction. The three-clef generator prints its information budget as eighteen quantities, listing backchannel as a sixth interaction quantity, where the design had settled at seventeen and five, and the script had been recorded as defective on that basis [10], [11]. With backchannel named a sixth measure, the script was right and the correction was wrong. What remains is a recount: derived counts of the form *two of the five are unavailable outright on a script*, *three of the five carry no information at two speakers*, *four of the five are timing quantities* occur at sixty-five sites across four documents in this programme, and each has to be re-derived rather than incremented, because a global substitution of six for five would produce exactly the class of count error this programme keeps finding. That is item 19 of section 13.

### 5.6 The cost, recorded rather than softened

Overlap is very likely the thing the user came for; the design says as much for the single-microphone case and the reasoning carries. Holding it back is the expensive answer. It is the right one because the failure it prevents is a false positive that looks like a measurement, and because the object that would produce that false positive is a word list. **A keyword counter's output was read as a measurement through three revisions of a paper in this programme's own history** [2], [5]. A backchannel lexicon is a keyword counter. Shipping one as a default, on the surface with the least apparatus around its output, is that history scheduled to happen again, and the one thing this programme has learned at first hand is what that costs.

---

## 6. Per-person measures and the named comparison

### 6.1 The restoration, and the mismatch in it

The design restores every per-person measure in full: floor share, turn count, mean turn length, latency before taking the floor, overlap initiated and received, backchannel given and received, and degree in the adjacency graph, all attributable by name on a shared display, with each person's own state rendering where a Layer 2 rating exists, which on this surface is a case the layer boundary leaves empty. The stated reason for the restoration is that the subjects are synthetic [5].

Two observations about that are correct and are adopted here. The first is that the listener conditions on the interaction mapping cover the affective reading of the mapping, and extending them to a named per-person comparison is a study of its own [6], [7]. The second is a mismatch of scope: each restoration is justified by a property of the material, which is that the subjects are synthetic, and each is written into a surface, which outlives any particular material [7]. That is the kind of mismatch the design knows how to avoid, having scoped capabilities to an ingest class twice in the same document [5].

### 6.2 The restoration is scoped to the material, not to the surface

Expression renders per-person measures where the material is class A, which is generated dialogue and script text alike; the design's own class table puts them in one row because in both the speakers are characters somebody wrote. That is the condition the justification actually names. Written that way the rule states its own reason, it holds as written if the material ever changes, and it follows the design's existing practice [5].

### 6.3 The surface renders measures rather than a ranking

The distinction is exact rather than a hedge. A per-person measure is a quantity of the exchange indexed by speaker: A held the floor for 61 per cent of it; B's median latency before taking the floor was 0.4 seconds. A ranking is a derived ordering over people, presented as the object of interest: a sort, a leaderboard, a most-dominant label, a per-person composite. **The first is in the interaction mapping's domain, and the second is a new quantity.**

Shipping a ranking takes three things: a specification of its own, a listener condition that covers it, and evidence. Specifying and testing a ranking is work this programme has ahead of it, so the surface renders measures, and the reason given on the surface is the true one, that a ranking is a quantity this programme has yet to specify and test, rather than a protective one, which would be false and would be the condescension this paper refuses.

Section 4's result bears directly on it. On *Hamlet* the second-ranked voice changes with the unit, so an ordering below the top depends on the setting as much as on the exchange, and rendering that ordering as a result would be rendering the setting as a result.

### 6.4 A named per-person comparison is permitted on a stave

A named comparison between two personas may be carried on a stave, and the graph and the numeric readout carry it as well [21]. A persona here may be an actor, a character in a play, a speaker in a podcast or any persona a score carries, and a score carries several of them, added and removed as the material requires.

The cost of the permission is real and is stated rather than absorbed. The listener conditions on the interaction mapping are scoped to the affective reading of the mapping, and a named per-person comparison takes a condition of its own, so what goes on the stave goes there **untested** for now, on the channel where an affective reading lives, attached to a person by name. It is carried as a labelled untested permission, which is what the companion use-case paper already does for the panel producer [18]. Extending the listener conditions to cover the named comparison is therefore a study to run rather than a choice to make, and it is item 5 of section 13.

The exchange-level form remains available, and the named comparison now joins it. A stave can render shape, how concentrated the floor was, how the turn order alternated, the latency profile, the reciprocity of the window, and those are exchange-level quantities derived from the per-person measures. What changes is that a user who wants to hear their own floor share as a line against somebody else's can now have that, which is a thing a user might reasonably want and which an earlier position in this programme refused.

### 6.5 At two personas the measure and the ranking coincide

With two speakers a per-person measure and its complement are one number: a floor share of 61 per cent for one speaker is a floor share of 39 for the other, and the same holds for turn count, mean turn length and latency, while degree in the adjacency graph is the constant 1 for both. So at two personas the ordering is the whole content of the measure and it is read in one glance.

The rule of section 6.3 therefore governs the stave at every cast size and governs the readout above two personas, which is where a sort, a composite or a most-dominant label becomes a thing a surface could choose to build and this one leaves unbuilt. Stating the rule without this clause would leave it doing its whole work above two personas while its cost was paid at every size, including the one section 12.1 calls most likely.

### 6.6 What the surface computes, and what waits on the lexicon

Every number the surface has goes to the person who asked for it. Five of the nine per-person quantities the design restores are available as a number with their setting and their window beside them: floor share, turn count, mean turn length, latency before taking the floor, and degree in the adjacency graph. The graph carries every speaker.

The other four are the overlap-derived ones, and they wait on the lexicon, for the reason section 5 gives, which is a judgement about what a word list measures. They wait for every user of every surface on the same ground. **Handing over every number the surface computes is the rule here, and holding one back would be the condescension.** Holding a rendering until its reading has been tested is the rule the design applies to every untested rendering, and it applies on the other surfaces equally.

---

## 7. Which timing case the reader is in

### 7.1 The partition is whether the material is known in advance

The partition turns on the material rather than on the ingest class. Generated and recorded material are known in full before a single note is rendered, so the score is computed ahead and played against the dialogue, which is what a film score is [5], [6]. **The reader of this surface is in that case.** On generated material, which is the primary material, the interaction staves are synchronous, and the picture of a score running with the dialogue is deliverable as soon as the mapping exists.

### 7.2 One rule governs the precomputation, and it is load-bearing

Every quantity rendered at a turn is a function of that turn and of the turns before it, and of those alone. Whole-work precomputation is a convenience of the implementation rather than a licence to see forward, and a quantity that genuinely needs the whole work, such as a normalisation over total speaking time, is labelled a whole-work quantity and rendered as one [5]. On a surface whose point is to render an exchange as it unfolds, the measure at turn ten is a measure of the first ten turns.

### 7.3 Live capture is a different case, and it is sequenced

Class B is a microphone per speaker. Its speaker attribution is exact, because attribution is the channel, and the speech still has to be recognised as it arrives: a meeting-benchmark word error of 35 to 46 per cent is a recognition figure and survives the move to one channel per speaker unchanged [5]. That figure is stated in the design and an independent search has yet to trace its source, so it is carried here as unsourced [18], [20].

The split inside the live case is therefore between the quantities that need the words and the quantities computed from channel timings. Floor share, adjacency, latency, overlap and reciprocity are computed from channel timings alone, so they are synchronous on class B. What trails is anything requiring the words, which on the Live surface means every Layer 3 output and any overlap classified as a backchannel [5].

**On Expression that split has an unusual consequence.** Layer 3 renders as text rather than on this surface, and section 5 holds the backchannel classification until a lexicon exists. So both word-dependent quantities sit outside the rendering path, and **the interaction staves on class B are fully synchronous.** If a lexicon is ever established, the backchannel classification becomes the one thing on this surface that trails, and the surface says which half is which on the face of the output rather than in a document [5].

### 7.4 Class C, a single room microphone, carries three things

The overlap-derived measures are left uncomputed, because diarisation is worst exactly at overlap and many pipelines assign an overlapped span to one speaker, which deletes an interruption rather than mis-scoring it [5]. A resolution floor is derived from the deployed diariser's error rate, below which differences are rendered as unmeasured rather than as numbers or as an even split [5]. And an opening sentence states which measures the recording resolves, ahead of the content [5]. A panel of five on one microphone is precisely the material those error rates are measured on, so a multi-party class C surface waits on a better diariser [5].

### 7.5 The headline

Both live capture classes are future work if real audio is ever used, which the design records three times over, in its ingest section, its sequencing section and its implementation order, because it is the thing an implementer will otherwise miss [5]. Live capture is sequenced by measured error, and it earns its place once the mapping exists. **So the sentence for this surface is: the reader is in the synchronous case, the trailing case is sequenced behind the mapping, and the surface describes itself as a running score rendered against the dialogue rather than as captioning** [5].

### 7.6 What each case gives the reader

Material known in advance gives the whole surface at once, synchronous, every measure at the resolution its ingest supports, with the causal-window rule holding and whole-work quantities labelled.

A live class B capture gives the same staves synchronously, with what section 5 holds back still held, plus two rules that exist because a delayed feedback loop is worse frozen than blank: the display blanks after a declared staleness horizon and says it is stale rather than holding the last frame, and it marks a discontinuity when the cast changes mid-session rather than restating prior measures [5].

A live class C capture gives a reduced surface that opens by stating which measures it resolves.

---

## 8. The staves: one interaction stave per persona

### 8.1 Interaction staves throughout

The design promises this surface a running score and specifies that score, in its reference layout, as two state staves and one interaction stave. The state mapping runs where a human has rated a state, and Expression is Layer 1 only, so the interaction stave is the one of the three this surface takes forward [5], [6], [7].

**Expression renders interaction staves throughout.** The layout it declares to the reader is the layout it draws, so every stave on the page carries a measure. That follows the same rule as everything else here: a flat output from an input still to arrive and a flat output from a flat conversation are rendered differently [5], [7].

### 8.2 One stave per persona, and the cast is a property of the material

**The surface renders one interaction stave per persona.** A persona may be an actor, a character in a play, a speaker in a podcast or any persona a score carries, and a score carries several of them, added and removed as the material requires [21]. Per-person Layer 1 measures are indexed by speaker, so with N personas the layout is N interaction staves, every one of them an interaction stave, because the state mapping takes a Layer 2 rating as its input and this surface runs on Layers 0 and 1.

It is worth being clear about what the earlier one-stave reading was. The design's reference score is two state staves and one interaction stave, which is a two-speaker layout; removing the two state staves from it leaves one. That count was an artefact of the reference layout rather than a consequence of the rule. **The rule fixes the stave type. The cast fixes the count.**

### 8.3 A cast change leaves every voice in place

Adding or removing a persona changes the stave count, which is a speaker-set discontinuity and takes its marked seam. What it leaves alone is every persona already on the page.

The timbre assignment is append-only: a new persona is placed at the point farthest from every persona already placed, and **every persona already on the page keeps its voice**. The cost of that guarantee has been computed rather than asserted. Across the whole range from two personas to fourteen it costs at most **13.4 per cent** of timbre separation, and zero at two, five, six and fourteen personas. Removal is free and leaves the remaining placements where they are [22].

Two further properties of the persona space are worth recording because they are geometry rather than choice. The seventh persona is the flat behavioural profile at the centre of the reachable set, at separation exactly 1.0, every other position being a corner of the cube. And the cast ceiling depends on one discrimination threshold: at a threshold of the square root of 3 over 2 a growing score holds fourteen personas, at 1.0 it holds seven, at the square root of 2 it holds six, and at 2.0 it holds two. Measuring that threshold is the discrimination experiment the design specifies, and it is the instrument that fixes the ceiling [22].

The relation, as distinct from the cast, scales quadratically: pairs go from 1 at two personas to 91 at fourteen. A moderated structure collapses that to N minus 1, which makes a moderated reading of a large cast a load-bearing idea rather than a convenience [22].

### 8.4 The per-stave budget, and how it comes out

The programme's legibility assertion puts a stave at two to three independent quantities, as a per-stave claim that holds stave by stave [1], [16], [21]. So the budget applies stave by stave, independently of the cast size. Each persona's stave wants that persona's six Layer 1 measures: floor share, degree in the adjacency graph, overlap, latency, reciprocity and backchannel.

What is informative per stave depends on the cast size and on whether the overlap holding of section 5.3 is in force.

| Cast size | Held under section 5.3 | Constant at that size | Informative per stave | Budget per stave | Outcome |
|:---|:---|:---|---:|:---|:---|
| Two personas | overlap, backchannel | degree, reciprocity | **2**, floor share and latency | 2 to 3 | **Fits, exactly** |
| Two personas, lexicon established | all released | degree, reciprocity | 4 | 2 to 3 | Oversubscribed 1.3x to 2x |
| Above two | overlap, backchannel | all vary | 4 | 2 to 3 | Oversubscribed 1.3x to 2x |
| Above two, lexicon established | all released | all vary | 6 | 2 to 3 | Oversubscribed 2x to 3x |

**At two speakers each persona's stave carries floor share and latency, which is two quantities inside a budget of two to three. It fits exactly, with every quantity placed and the budget met.** That is a good result and it is worth stating plainly, because two speakers is the material this surface will mostly meet.

The reasoning that gets there is the per-persona layout doing work. Floor share looks like a single degree of freedom shared between two speakers if one stave carries the relation; with a stave each, it is a number on each persona's own stave. Persona A's floor share is a number on A's stave and persona B's is a number on B's, and the fact that they sum to one is a relation between two staves rather than an emptiness in either. Degree and reciprocity behave the other way: they are genuinely constant at two personas and are therefore the two the table marks constant at that size.

Above two personas the surface is oversubscribed, and the rule that a surface must choose does real work rather than standing as a formality. With overlap and backchannel held, four quantities compete for two or three places, so at least one and as many as two are displaced; with a lexicon established, six compete and as many as four are displaced. Section 6 says where the rest go, which is the graph and the numeric readout, and the named comparison reaches the stave as well.

Oversubscription flattens as the cast grows. It runs 2.7x at two personas to 3.7x at fourteen and then holds, so scaling makes the legibility problem wider rather than deeper [22].

### 8.5 The declared default pair

Each stave carries a declared two or three quantities, chosen before the session and shown on the output, with a stated default set, a one-screen budget and a preselected default [5]. The inherited default set was written for the three-stave reference layout: dynamics and tempo on each state stave, floor share and adjacency on the interaction stave.

**That inherited default is replaced here.** At two personas, which is the most likely material, adjacency is deterministic and floor share is one number and its complement across the two staves, so the inherited pair would fill each stave with a measure that is constant at that size and leave out latency, which is the one that varies. A user who opened no configuration would get one degree of freedom and one constant, where a defensible score carries two degrees of freedom.

At two personas the arithmetic of section 8.4 answers it: with overlap and backchannel held and degree and reciprocity constant, exactly floor share and latency remain, so the candidate and the one admissible answer coincide. **Above two personas the default pair is open**, because four measures then compete for two or three places, and which two a reader holds is settled by item 11 of section 13.

### 8.6 The state mapping is turned on by building a different surface

If a Layer 2 rating ever reaches this surface, Expression stops being Layer 1 only, which is a change to the surface rather than a configuration of it [5]. The operational form is blunt: **the state mapping is turned on by building a different surface.** A build with a toggle for it is that different surface, and it takes its own claims boundary, its own sentence on its face, and its own answer to the question section 2.3 closes here.

The reason for stating it in this form rather than as a preference is that the failure mode is gradual. A surface that acquires one rating field, then a default, then a rendering, will arrive at a state mapping without anybody having decided to build one.

---

## 9. What it is for, in one sentence

The design requires the surface to carry a sentence saying what it is for [5], [8]. It is supplied here.

> **This is a picture of the conversation's shape: who held the floor, who followed whom, and, where the material carries timings, how fast anyone came in, and, where a backchannel lexicon exists for this community, who came in over whom.**

**Four things about it are deliberate.** It names the measures in the words a person would use rather than in the words the design uses, so a reader knows what the picture is of before they read it. It carries the content of the design's mapping mark, that this renders the shape of the exchange, in the reader's language rather than as a Greek letter [5]. Its claims boundary is carried by what it names: every clause names a quantity of the exchange, so a reader can see that the list is the whole of the output, and it reads as information rather than as an assurance, because an assurance invites the question it is answering. And it is one sentence, carried on the surface itself, in the same type as everything else and in the reading order of the page.

**Two tests apply to it.** The first is about tone and is easy to run: if the sentence reads as reassurance, it is wrong; if it reads as an apology for the tool's scope, it is wrong; if a user would be irritated to be told it twice, it is the right length and in the wrong place, and it moves rather than shrinks. The second is that every quantity the sentence names is a quantity the surface computes in the configuration the reader is looking at. That is why the sentence above is a stem with two conditional clauses rather than a fixed string: latency needs timings and the overlap clause needs a lexicon, and a sentence that named either unconditionally would describe a product other than the one in front of the reader.

**Two operational notes.** The sentence is translated and not transliterated, because the mark is a sentence in the reader's language rather than a fixed string [5]. And on a live capture it gains a second clause, and there alone: the staves trail by seconds, they blank when they fall behind, and they report the exchange a few seconds back [5]. On material known in advance the staves are synchronous and the clause is dropped.

---

## 10. What would have to be built

### 10.1 The interaction mapping, and what specifying it takes

Specifying it means writing six things: the function, its acceptance criterion, its codomain, its channel count, its jump set and its discretisation [5]. **Everything in this paper about what the surface renders is a constraint on that function**, and the constraints are set out here so that whoever writes it has them to hand. Four of them are the obligations the companion paper collects, carried across in section 10.9: partiality, so that the mapping renders what the ingest supports and declares the rest; dyad reduction, so that a cast larger than the stave budget reduces by a stated rule; causality, so that every quantity at a turn is a function of that turn and the turns before it; and non-degeneracy, restated here for a surface whose most likely cast is two. Three more come from this paper: the codomain choices answer to the listening study of section 3, the discretisation answers to the per-stave budget of section 8.4, and the jump set answers to the speaker-set discontinuity of section 8.3. It is the item that dominates all others in the implementation order, and three of the four surfaces consume it [5].

What the synthetic scope changes is that the mapping is now testable, because a generator that decides a dialogue's relational structure in advance is a ground truth to validate against. The question *does the mapping recover the structure the generator put in* becomes answerable, and setting the accuracy target becomes ordinary work [5].

### 10.2 The graph renderer, and what specifying it takes

It takes a layout, a legibility budget, a declared quantity set and a coverage statement, and the design's own inventory of outstanding work gains it here [5]. Section 3.7 makes the graph the whole of the product that survives a failed listening study, and a visual renderer offered as the honest outcome of a failed study is one this programme has described in full. Specifying it is item 10 of section 13.

### 10.3 What this surface needs from the implementation order

**Item 1, the synthetic dialogue generator with known ground truth.** It must emit turn onsets and offsets, because most of the Layer 1 measures need them and the validation at item 3 reaches all six once they are emitted. Its timing model is recorded as a choice rather than emitted as a fact, since gap length and overlap tolerance vary by speech community and the generator embeds that choice.

**Item 2, the shared spine on class A**: Layer 0 from labelled text, the measures with their settings, the graph renderer, the four-kind refusal vocabulary and the credential rule.

**Item 3, specify the interaction mapping and validate it against the generator.**

**Item 4, the Studio surface**, where the audio path is built.

**Item 7, this surface**, after item 3, with the listening study of section 3.

**Item 9, both renderers in front of real users**, which the design says decides the thesis and which no earlier version of the plan scheduled.

### 10.4 What this surface leaves to other surfaces

Named here so that each is built where it belongs.

**Layer 3 and the bias detector**, which Layer 1 only places outside this surface and which renders as text wherever it appears [9], [12].

**The timbre channel as a state channel**, which is fed by an assigned behavioural profile and therefore belongs to a surface that carries ratings; it depends on the rating store and the audio path [5]. The timbre space is used here for persona placement, as section 8.3 describes, which is a different use of the same geometry.

**The live capture items**, only if live capture is wanted, on the sequencing section 7 gives.

**The Instrument**, which is a separate surface with its own conditions [4], [5].

### 10.5 The numeric parameters this surface consumes, and what fixes each

The parse-confidence refusal threshold; the resolution floor per ingest class; the Layer 1 defaults; the trigger at which a below-floor difference renders as unmeasured, which the design calls the numeric heart of one of its central honesty claims; the staleness horizon if live capture is ever built; and the damping constant that governs the redraw rate of a running stave [5].

Of these, only the parse-confidence threshold and the damping constant bind on class A, which is the material this surface will first meet. The resolution floor is defined for class C, the unmeasured trigger is defined against the resolution floor, and the staleness horizon governs the live blanking rule. They are carried here because they will bind if this surface ever meets real audio. Each is set by the material it binds on or by the study that fixes it, and item 8 of section 13 carries that work.

### 10.6 The legibility budget this surface takes next

The design measures three legibility budgets, event density, coverage and dyad churn, all three on the seven score files; the one of the three that measures how often a stave changes measures state channels on one generator's output distribution [5], [10]. The equivalent measurement for an interaction stave follows the mapping, and it is the third thing item 1 delivers. The budget that reaches Expression today is the per-stave assertion, and section 8.4 does that arithmetic.

### 10.7 The acoustic declaration, which is a specification and not a concession

This surface emits audio. Because the audio is generated from parameters rather than selected from recordings, its acoustic properties can be **declared and guaranteed** rather than checked after the fact: a ceiling on level, a bound on the rate of dynamic change, a stated frequency ceiling, a predictable form, and a stop control that is instantaneous and free, returning the reader to where they were with the ingest and the render both intact [5], [13].

This is the one genuinely technical contribution available in the domain: a generator can prove its bounds where a recording can only be checked after the fact. The prevalence figures that make stating the bounds worth the engineering rather than leaving them implicit are hyperacusis at 41.4 per cent currently and 60.6 per cent over a lifetime in a sample of 13,093, with half to seventy per cent reporting decreased sound tolerance at some point, and hyperacusis and misophonia requiring different mitigations [13].

**The design consequence is about declaring, not about limiting.** A user who can state the bounds of what a tool will play can decide whether to use it, which is true of a studio monitoring chain and is true here, and the bounds are parameters the user sets rather than a policy the tool applies. The reason to record it in this paper is scheduling: the audio path is built at item 4 for Studio, and an audio path built with its bounds declared is an audio path built once.

### 10.8 Designing the instruments with the people the surface is for

A tool for this readership is designed with that readership, and it is judged on that. Kenny's survey of 3,470 people found 61 per cent of autistic adults preferring identity-first terms, with professionals the outlier group and the authors' own conclusion being to ask rather than to mandate [13].

Two consequences are small and concrete. The listening study of section 3 and the setting sentences of section 4 are designed with autistic co-researchers from the start, because both are instruments and both stand or fall on who writes them. And this paper uses identity-first language on the survey's finding, while noting that asking is the rule the survey's authors drew and that a product with a user in front of it can ask.

The sources in this subsection and the preceding one come from the author's own analysis of the application domain [13], whose citations sit outside the citation pass that covers the rest of the series and are recorded here as unverified [16]. Any of them that carries weight in a later version is verified first.

### 10.9 What the companion paper assumes about this one

The companion use-case paper collects four obligations on the interaction mapping and states that all four reach this surface unchanged [18]. Three do: partiality, dyad reduction and causality. The fourth, non-degeneracy, arrives changed, and section 12.1 is why. The companion's first admissible answer makes the mapping at two speakers a function of latency and overlap alone, and section 5 of this paper holds overlap, so it arrives here as a function of latency alone; and the companion's second admissible answer removes the interaction stave, which on this surface removes the surface. This paper adopts the partiality, cast-size and causality obligations, and restates the fourth for this surface.

---

## 11. The surface in summary

Seven positions, each stated so that a later reader can attack it rather than rediscover it. Four of them constrain a function now being specified; they say what the interaction mapping must do.

| The position | What it costs the reader's question, and what it buys it | Section |
|:---|:---|:---|
| **Expression renders interaction staves throughout, one stave per persona**, the count being a property of the material. A cast change is a marked speaker-set discontinuity rather than a relabelling, because a persona is appended at the farthest available point and every persona already on the page keeps its voice. At two personas each stave carries floor share and latency, which fits the budget exactly; above two the surface must choose | Costs the question every quantity that falls outside a stave's budget, which above two personas is at least one and as many as four, depending on whether a backchannel lexicon exists. Buys it a surface whose whole content is the exchange rather than the people in it, and, at two personas, a stave whose contents are settled by arithmetic rather than by preference | 8 |
| **Each setting carries a sentence naming its effect on the output in front of the user**, rather than the definition of the unit; the default is fixed by the ingest rather than chosen; where the units disagree about the ordering, the surface renders the disagreement as content | Costs the question nothing and costs the reader a sentence of reading per setting. Buys it the one thing a settings-driven measure owes its reader, which is knowing that the answer moved because the unit moved | 4 |
| **The overlap-derived measures are held until a lexicon exists**, left uncomputed, announced ahead of the content, sorted as *specification pending*, with the other measures rendering normally | Costs the question the overlap answer, which this paper concedes is very likely what the reader came for. Buys it the guarantee that the answer given is a measured quantity rather than a keyword count read as one, which is this programme's own worst precedent | 5 |
| **The per-person restoration is scoped to the material and not to the surface**; the surface renders measures rather than a ranking; a named per-person comparison is permitted on a stave, on the graph and in the readout, labelled as untested until the listener conditions cover it; every number the surface computes goes to the user. Four of the design's nine per-person quantities wait on the lexicon under the holding above, and the analysis says so before it says anything else | Costs the question the guarantee that every affective reading attached to a person by name has been tested, which the permission gives up deliberately. Buys it the comparison on the channel the reader prefers, which is a thing a reader may reasonably want. At two personas the measure and the ranking coincide, so on that cast size the no-ranking rule governs the stave alone | 6 |
| **The reader is in the synchronous case**; both live classes are sequenced as future work; the surface describes itself as a running score rather than as captioning | Costs the question nothing today, because the material is known in advance. Buys it a surface that describes itself as what it is | 7 |
| **The surface sentence is supplied and carried on the surface itself**, in the reader's language, as a stem with two conditional clauses, with the live clause added on live capture only | Costs the question a fixed sentence, which would be easier to remember. Buys it a stem the reader can trust, with each clause appearing only where its quantity exists | 9 |
| **The audio path's acoustic bounds are declared parameters of the renderer**, with an instantaneous and costless stop, specified before the audio path is built | Costs the question nothing. Buys the reader an instantaneous and costless stop, which is the one control that makes the audio path usable for the reader it is for | 10.7 |

---

## 12. Open questions

These are the conditions under which the surface, or a part of it, would be wrong. They are named here so that the programme meets them rather than discovers them, in the order in which each becomes answerable.

### 12.1 The measure set is small at the cast size this surface will mostly see

At two speakers adjacency is deterministic, reciprocity is 1 by construction, and floor share is one number and its complement [5]. Section 5 holds the overlap-derived measures by default, and backchannel goes with them. A two-person conversation is the most likely material any version of this surface is pointed at.

The per-persona layout of section 8 answers half of this and it is worth saying which half. Floor share is a number on each persona's own stave, and the fact that two of them sum to one is a relation between staves rather than an emptiness in either, so at two personas each stave carries floor share and latency: two quantities inside a budget of two to three, which fits exactly. On the arithmetic of what a stave can hold, the question is answered in the surface's favour.

**What remains to answer is whether two quantities carry something a reader recognises.** If they carry less than that, Expression is a small instrument and is described as one, and the honest form of it is a much smaller product. It is answerable on paper and on generated two-handers today, ahead of both the listener panel and the interaction mapping, and it should be answered before the surface is scheduled rather than after.

### 12.2 The mapping may recover less of the structure than the generator put in

The generator supplies a ground truth and the validation step checks against it [5]. A renderer whose measurement fails to measure is a decoration, whatever it sounds like. Setting the accuracy target is ordinary work once the generator exists.

### 12.3 The rendering may be read as an evaluation of the people in the exchange

The listening study of section 3 may return that reading, and it may survive every respecification of the mapping's codomain. Then the visual renderer is what ships on this surface.

If the visual renderer is then shown to carry the same reading, the surface stands down, and the correct response is to say so rather than to add a disclaimer, since a minor key overrides a disclaimer [5]. As section 3.7 records, item 17 of section 13 builds the instrument that evaluates the visual half of that condition.

### 12.4 The comparative study decides which renderer answers the reader's question

The comparative study puts the graph and the score in front of real users on the same material and asks which answered their question; the design says that study decides the thesis [5]. Expression is the surface with the most to lose from it, because it is the surface where the score leads.

### 12.5 The unmeasured rendering may need the visual channel beside it

If the mapping makes a below-floor difference audibly indistinguishable from an even exchange, then the unmeasured rule holds in the visual and textual channels, the musical renderer runs beside them rather than alone, and a design that shipped audio alone on this surface would be shipping one channel short of the two the design calls central to its honesty [5], [8].

### 12.6 The backchannel question may sit beyond the reach of a programme this size

If establishing a lexicon for even one language and community, to the standard any other measured quantity is held to, turns out to be beyond this programme, then the overlap measures are held permanently rather than provisionally, section 12.1 bites at full strength, and the surface is a latency instrument.

The standard for the lexicon holds either way. What follows is a reason to attempt the lexicon early, because the answer changes what the surface is.

### 12.7 Composed with a single room microphone, the surface is one attenuated scalar

The degeneracies of section 12.1 are a property of the cast size and hold on every ingest class. On class C two further things happen.

The overlap holding is already in force, for a reason independent of cast size. And attribution error attenuates the one remaining scalar. Modelling a fraction *e* of speech assigned to the wrong speaker symmetrically, the observed gap between two speakers is (1 minus 2*e*) times the true gap. At the best published streaming diarisation error rate of 19.8 per cent, a true 60/40 reads as 56.0/43.9; at the 39.1 and 39.2 per cent of the two vendors that bundle diarisation with transcription, it reads as 52.2/47.8. Inverted, a 60/40 reading off a bundled vendor's output means a true split of about 95.9 to 4.1, which is one speaker holding the floor for nineteen parts in twenty [20].

The design states this as *at a fifth of speech mis-attributed, a true 60/40 floor share reads as an even one*, which is comfortably true at the vendor rates and too strong at the 19.8 per cent figure it cites in the same sentence, where the surviving gap is twelve points and no resolution floor in this programme is set that high [5].

Latency on class C carries the recognition error on top of the attribution error, and the design's figure for that, a meeting-benchmark word error of 35 to 46 per cent, is unsourced [18], [20]. So sourcing that figure is what supplies the quantitative basis for the latency half of this composition.

The conclusion holds on either of the two diarisation rates: at two speakers on a single room microphone this surface has one attenuated scalar and a latency measure whose error is still to be quantified, which is a surface sitting at its floor. Class C is future work on the design's own record three times over, and this is why that record stands for this surface.

---

## 13. Open work

Nineteen items. Every one of them is technical or authorial work inside this programme. Most of them run ahead of the interaction mapping, and several could be finished this week; the dependency is noted where it exists.

1. **Specify the interaction mapping and validate it against the generator's ground truth.** Everything on this surface follows from it, and every item that depends on a rendered stimulus follows it in turn. It delivers the function and the acceptance criterion [5].
2. **Run the listening study of section 3**: the open-inference object test, the framing manipulation, the sampling requirement, the required result fixed before the study runs, and the unmeasured-versus-even discrimination. It starts once item 1 gives it a stimulus.
3. **Establish a backchannel lexicon for one deployed language and speech community**, to the standard any measured quantity is held to, which is what releases the overlap measures. This is authorial and community work rather than engineering, and it is independent of item 1. It releases section 5.3 and it decides section 12.6.
4. **Answer the two-speaker informativeness question of section 12.1**, which is answerable on paper and on generated two-handers today. It decides whether the surface is worth scheduling, and it is the cheapest thing on this list.
5. **Extend the listener conditions to cover a named per-person comparison.** Section 6.4 permits the comparison, so this is a study to run rather than a choice to make. It removes the labelled untested permission that section 6.4 currently carries.
6. **Specify the acoustic bounds of section 10.7** with the audio path rather than after it.
7. **Design the two instruments this paper writes with autistic co-researchers from the start**, being the listening pack of item 2 and the setting sentences of section 4.6. It should start before item 2 rather than after, and the standing of both instruments depends on it [13].
8. **Fix the numeric defaults this surface consumes**: the parse-confidence threshold, the resolution floor, the unmeasured trigger, the staleness horizon if live capture is built, and the damping constant that governs the redraw rate of a running stave. Only the first and the last bind on class A [5].
9. **Assert over the anthology block in the floor-share script.** It asserts over the three single plays only, so a change of corpus that moved an anthology's top speaker would fail this paper rather than the script. Two anthologies change their top speaker today and section 4.4 says so. It is a two-line change [14].
10. **Specify the graph renderer for this surface**, so that section 3.7's fallback is a product this programme has described. It takes a layout, a legibility budget, a declared quantity set and a coverage statement, and the design's own inventory gains it [5].
11. **Derive the declared default quantity pair above two personas.** At two personas the arithmetic of section 8.4 settles it at floor share and latency. Above two, four measures compete for two or three places, and this item settles which two a reader holds.
12. **Settle whether the overlap threshold and the latency turn-boundary rule inherit the community variation the design records**, and if they do, what a surface declares about them. This decides whether the holding of section 5.3 reaches one measure family or three.
13. **Measure how this audience divides between the sound and the image.** Section 3.3's argument for the strictness of the required result is a claim about the sound-only configuration, and its weight depends on how many readers are in that configuration. The comparative study at implementation item 9 could answer it.
14. **Enumerate every object on this surface that carries a quantity about the reader**, and rule each against the three-part structure of section 2.3 rather than against the state clause alone. The objects known today are the numeric readout, the graph, the surface sentence and the interaction stave itself.
15. **Ask whether the direction reversal of the companion paper's second use case is available here.** This programme's own analysis names it as the design answer to epistemic overwrite, on the ground that a system that asks stands on a footing a system that pronounces has to earn. Expression pronounces.
16. **State the sampling frame for the third required result of section 3.4**: which listeners the study recruits, on what ground, and what a positive and a null result each license about the audience section 1.2 defines by preference. It waits on item 2, which waits on item 1.
17. **Specify an inference test for the visual renderer**, analogous to the listener conditions on the musical one: put the graph in front of readers and ask what they take it to be about rather than whether it was useful. It depends on item 10, because a specified renderer is what a test is written against.
18. **Specify the per-ingest-class definition of backchannel and make the output declare which one produced the number.** Two definitions of one measure means two settings rather than one, and a number carries its definition with it so that a reader knows which of the two produced it [21].
19. **Re-derive every derived Layer 1 count against six measures and six settings.** Sixty-five sites across four documents state a count the sixth measure moves, twelve of them in this paper, and most are derived rather than the bare total. Each is re-derived rather than incremented, because a global substitution would produce exactly the class of count error this programme keeps finding [21], [22].

---

## 14. References

**On the paths in these entries.** An entry that gives a path in backticks names an artefact in the MPN working corpus rather than a page on this site. That corpus is held privately, so such a path resolves inside the working corpus rather than from this page. The citations are kept as they stand because each names a real artefact and each entry says what the artefact is and what it establishes, which lets a reader see what a claim rests on and ask for the artefact by name. Keeping the citation is what discloses the dependency.

The rest of the series is published in this working group: [MPN-S1](/papers/mpn-s1-psychometric-calculus-theory), the theory; [MPN-S2](/papers/mpn-s2-formal-apparatus), the formal apparatus; [MPN-S3](/papers/mpn-s3-mapping-state-to-musical-material), the mapping; and [MPN-S5](/papers/mpn-s5-dialogue-use-cases), the dialogue use cases. Where an entry below also gives a working filename such as `S1-mckenney-lacan-theory.md`, that is the corpus copy of the same document.

[1] J. McKenney, "The McKenney-Lacan psychometric calculus," MPN-S1, `S1-mckenney-lacan-theory.md`. Source of the legibility assertion and of the two-to-three independent quantities per stave, which it states as an estimate rather than a measured figure; and of the two listener studies, the first at twenty-four participants with a mean appropriateness of 4.2 on a five-point scale, testing an assignment no shipped module implements, and the second a null at forty-eight participants, p = 0.72, effect size 0.08, both on stimuli from an unseeded generator, which seeding makes reproducible.

[2] J. McKenney, "The application," MPN-S4, `S4-application.md`. Its section 2 establishes the provenance of the score columns; 3.3 is the *King Lear* parse failure at 3,424 of 3,425 rows; 3.5 settles how the 31,078 rows may be named; section 4 is the licence finding that makes non-dialogue exclusion non-optional. The keyword counter read as a measurement through three revisions of a paper is this paper's finding, and it is the precedent section 5 of the present paper turns on. **MPN-S4 is an internal implementation audit of the reference implementation, held in the programme's working corpus and available from the author.** It is cited throughout this series for the provenance of the 31,078 scored rows, for the *King Lear* parse result, and for the keyword-counter precedent.

[3] J. McKenney, "The mapping," MPN-S3, `S3-mapping-phi-rev10.md`. Cited here for the state mapping's domain and for its statement that the listening work establishing what each of the thirty bias devices carries is work still to be run.

[4] "The instrument," MPN-PRD-01, `PRD-MPN-THERAPY.md`. Its section 7.2 carries the evidence on the major-happy and minor-sad association, the 92 per cent in adults, the 58 per cent at age four, the cross-cultural replication, the minimal-exposure finding and the tone-scramble figure. This paper cites it for that evidence alone; that surface has its own conditions.

[5] MPN-DESIGN-01, `DESIGN-UNIFIED-FRAMEWORK-rev8.md`, the unified design. Section 3 for the two mappings, the mark as a sentence and the affective-reading problem; 4.1 for parse confidence, the ingest classes and the unmeasured rendering; 4.2 for the Layer 1 measures, their settings, the backchannel lexicon and the speech-community caution; 4.4 for Layer 3's discipline; 6.2 for the three-clef reference score, the known-in-advance partition, the causal-window rule, the legibility budgets and the legibility rules; 6.3 for the measures that carry no information at two speakers; **6.4 for this surface**; 7.2 for scripts having no timings; 7.4 for participant mode and the per-person restoration; 7.6 for the sequencing of live capture; 8 for the edge cases; 8a for the four kinds of refusal and the staleness horizon; 9 for the numbered design decisions this paper adopts; 10 for the design's outstanding work and its open numeric parameters; 10a for the implementation order.

[6] `ARBITRATION-DESIGN-R7.md`, 14 September 2026. The internal review record of the unified design, cited here for the contradiction between a three-stave score and a Layer 1 only surface, for the scoping of the listener conditions on the interaction mapping, and for the standing limit that every file in the corpus is a dramatic text rather than a conversation or a moderated exchange.

[7] `REVIEW-DESIGN-R7-user.md`, 13 to 14 September 2026. The user-side review of the same document. Its two Expression findings and its cross-cutting paragraph on restorations justified by the material and written into a surface are the sharpest statement of the mismatch section 6 addresses.

[8] `REVIEW-DESIGN-user.md`, 13 September 2026. Source of the findings that became the design's requirements on listener testing, on the unmeasured rendering, on refusal wording, on the settings problem, and on the plain statement of what the surface is for.

[9] `DECISION-LOG-2026-09-14.md`, 14 September 2026. Records that the bias layer renders as text on every surface, with a reopening condition rather than a permanence clause.

[10] `05_DATA/03_generators/VERIFICATION-2026-09-14.txt`. Every figure in this paper taken from the design is confirmed or corrected there, with the command that produced it: coverage, event density and the entropy floor, the summary table, what is still open, and the repairs to the three-clef script.

[11] `05_DATA/03_generators/s6_three_clef.py`, run on 14 September 2026 for this paper. It resolves its corpus, asserts 31,078 rows read, 3,425 excluded and 27,653 retained, and reproduces the coverage, event-density and dyad-churn tables. Its information-budget section counts eighteen quantities with backchannel as a sixth interaction quantity, which section 5.5 records as correct. The working copy is `gen6/s6_three_clef.py`.

[12] `05_DATA/03_generators/s6_bias_layer.py`, run on 14 September 2026 against `s3_bias_reconciliation.json`. Thirty entries, thirty naming a coordinate with three flagged, eighteen signatures, eight collisions, twenty of thirty entries involved, the twenty-two by eight locality partition, and a closing note naming the abstention rule, the representation for a turn the detector passes over, and the per-turn cap as still owed. Cited here to establish that the layer renders as text. The working copy is `gen6/s6_bias_layer.py`.

[13] `THERAPY-AUTISM-ANALYSIS.md`, the author's own analysis of the application domain. Cited for six things and no others: that music is the smallest-difference modality rather than a preserved strength; Allen, Davis and Hill on physiological responsiveness intact with verbal report reduced and the gap mediated by alexithymia; Kinnaird's 49.93 against 4.89 per cent; Suslow and Kersting on alexithymia degrading the perception of emotion in music; the hyperacusis prevalence figures at 41.4 and 60.6 per cent in a sample of 13,093 and the centrality of control in autistic adults' own accounts; and the participatory position with Kenny's survey of 3,470 people at 61 per cent identity-first with professionals the outlier. **Its citations sit outside the citation pass of [16] and are recorded here as unverified.**

[14] `05_DATA/03_generators/s6_floor_share_units.py`, new with this paper and the source of section 4's table. It resolves its own corpus, excludes *King Lear*, drops the non-speaker token, prints the three anthologies below the line and labelled, and asserts three of its own results so that a change of corpus fails the script rather than this paper. It prints, in its own output, what it establishes and what it leaves open. The working copy is `gen6/s6_floor_share_units.py`.

[15] "The major-minor mode dichotomy in music perception: A systematic review on its behavioural, physiological, and clinical correlates," bioRxiv, 2023, as carried by [4] and verified in `CITATION-LEDGER-PRD.md`.

[16] `ASSERTIONS-REGISTER.md` for the legibility assertion's claim, formal content, constraint and falsification clause; `CITATION-STATUS-ALL.md` for the citation pass covering the series, the Instrument and the design, 27 of 107 references verified, and for the boundary rule that separates a series document from a verified source.

[17] `06_APPLICATIONS/06_listening_test/THERAPIST-SECTION.md`. Cited as this programme's own precedent for how a study pack addresses the people taking it: the defects of the system are stated before any question is asked, and the pack invites the answer that the whole idea is misconceived. The pack of section 3.6 is written in that register.

[18] J. McKenney, "Dialogue, and four things a producer or a researcher could do with it," MPN-S5, `S5-dialogue-use-cases.md`. The companion use-case paper. Cited here at the five places the two papers touch: the four obligations on the interaction mapping and which of them survives the trip to this surface; the named per-person comparison; the backchannel lexicon as a producer's mitigation; the class C figures and the one its citation ledger records as unsourced; and its four *the user and the question* subsections.

[19] `ARBITRATION-S5-S6.md`, 14 to 15 September 2026. The internal review record covering this paper and its companion: seventy-one reviewer findings across the two, deduplicated to fifty-seven determinations. Cited for the points on which the two papers were required to agree, and for the candidate default quantity pair it put forward and left open.

[20] Streaming speaker diarisation benchmark on DIHARD III, published by pyannoteAI at `https://www.pyannote.ai/blog/streaming-diarization-benchmark`, retrieved 15 September 2026. Reports, over all languages: pyannote API 19.8 per cent diarisation error rate, Speechmatics real-time v2 31.3, Deepgram Nova 3 39.1 and AssemblyAI Universal Streaming v3 39.2; and, on unattributed speech, 7.71 per cent for pyannote against 19.70 to 25.26 per cent for the others. It is the source of three of the four class C figures the design states unreferenced, and of the fourth clause, the missed-speech finding. The remaining figure, meeting-benchmark word error of 35 to 46 per cent, comes from elsewhere and remains unsourced.

[21] `DECISION-LOG-2026-09-15.md`, 15 September 2026. Five decisions of the author's. The legibility assertion is amended, striking the clause that let a layer escape the per-stave budget by living between staves, which makes the assertion easier to falsify. A named per-person comparison is permitted on a stave, and a score carries several personas, added and removed as the material requires. Backchannel is named a sixth Layer 1 measure, and is lexical on class A and timing-derived on classes B and C. And Expression is an N-persona surface, one interaction stave per persona.

[22] `MPN-NOTE-06-persona-scaling.md`, 15 September 2026, with `05_DATA/03_generators/s9_persona_scaling.py` and its output at `S9-PERSONA-SCALING-OUTPUT.txt`. Computes what an N-persona score costs: the per-stave oversubscription against N, which rises from 2.7x at two personas to 3.7x at fourteen and then flattens; the pair count, which is quadratic and reaches 91 at fourteen; and the append-only timbre curve, which shows a score can grow one persona at a time while every persona already on the page keeps its voice, at a cost of at most 13.4 per cent of separation and zero at two, five, six and fourteen personas.
