# Inside the Exchange: What a Participant Reads on the Expression Surface

**J. McKenney**

Paper 8 of the Musical Psychometric Notation series. It is a standalone monograph and assumes no other paper in the series: sections 2 and 3 state everything a reader needs, and a reader who has met the series elsewhere can start at section 4. MPN-S1 states the theory, MPN-S2 the formal apparatus, MPN-S3 the mapping from psychological state to musical material and MPN-S4 the reference implementation; MPN-S5 covers the four dialogue use cases and MPN-S6 the Expression surface. This paper develops MPN-S6 for the reader who is inside the exchange rather than watching it.

Licence: CC BY 4.0. 16 September 2026.

## Executive Abstract

A surface that renders the shape of a conversation while the conversation is running has one person who configures it and several who read it. MPN-S5 identified that and deferred it in its own words: *this paper does not resolve it.* This paper resolves it for the case where the reader is one of the voices on the page.

The question is what a participant needs that an observer does not, and where the two conflict. Five things separate them, and all five follow from one fact: a participant appears in what they read. A participant needs to know which line is theirs without looking for it, needs to know who set the configuration they are reading, needs a stop on the display that leaves the exchange running, needs a seam where the thing they are tracking changes identity, and shares the surface with other readers who are also in the exchange. An observer needs none of the five, because an observer is outside the exchange and alone at the screen.

Two of those needs conflict with an observer's. A cheap reconfiguration serves the observer, who is the only reader and the one who made it; the same reconfiguration reaches several readers at once on a participant surface. And a named comparison between two voices is a comparison between third parties for an observer and a comparison the reader is inside for a participant.

The resolution is two rules. The **grounds rule**: a difference between the participant surface and the observer surface is admissible where it follows from the reader's position in the exchange, and a difference resting on any property attributed to the reader is a design error, because it would take a sentence about that reader to defend and the design changes instead. The **symmetry rule**: there is one surface, one configuration and one content, and the single per-reader parameter is the index naming which line is the reader's own. Everything else every reader sees is the same picture.

The arithmetic comes out well. Decision E of 15 September fixed the layout at one interaction stave per persona and computed that at two personas each stave carries floor share and latency, two quantities inside a declared budget of two to three, fitting exactly with nothing displaced. This paper shows that the three things the participant surface adds are an index, a declaration line and a seam, none of which is a rendered quantity, so all three cost zero against that budget and the fit survives. It also shows that the relation, which is the hardest thing to scale, is easier from inside than from outside: an observer chooses among N(N-1)/2 pairs and a participant's own star is N-1, so at fourteen personas the observer faces 91 pairs and the participant 13, and at two personas the participant's star is the whole relation graph.

Every figure here comes from a run made for this paper. Floor share under two units, computed on the programme's score files, moves the second voice of *Hamlet* from Horatio to the King and moves the pair's own coverage by as much as 12.8 points; renormalised to the pair a two-persona surface renders, the leader's share of *Hamlet*'s principal pair reads 76.4 per cent by turns and 85.6 per cent by words, a swing of 9.2 points on one voice. Section 9 turns that into the sentence a participant sees beside the control.

Sections 15 and 16 set out the questions this paper leaves open and the work that settles them.

## Abstract

This paper specifies the participant reader of the Expression surface: the case where the person reading a rendering of an exchange is one of the voices in it. It inherits participant mode as already specified, at section 7.4 of the unified design, carrying decisions D18, D55 and D68 and rejection R3, and develops it rather than re-proposing it.

Its contribution is the two-audience question that MPN-S5 raised and deferred. The paper establishes the structural asymmetry between an observer and a participant, derives five needs that follow from it, names four places where the two audiences pull in opposite directions on the same control, and resolves each. The resolution rests on two rules stated here for the first time, the grounds rule and the symmetry rule, both derived from the condescension test that MPN-S6 writes its design against.

The paper then carries the resolution through the surface. It shows the participant additions cost nothing against the per-stave budget, because an index, a declaration and a seam are not rendered quantities; it reproduces Decision E's arithmetic at two personas, where floor share and latency fit a budget of two to three exactly; it computes the participant's own star against the observer's pair count and shows the reduction is linear from inside and quadratic from outside; it computes floor share under two units on the programme's score files and renormalises it to the two-persona case, producing the setting sentence a participant sees; it states the form every blank takes, naming its kind and the one action available; it supplies the surface sentence for a participant reader, in one sentence, on the surface, in the same type, phrased as information; it specifies the acoustic declaration and the instantaneous costless stop on the audio path, and extends the stop to the whole display for a reader whose exchange continues without it; and it puts co-design with autistic co-researchers on the two instruments this paper writes.

---

## 1. Introduction

### 1.1 What this paper is

This is a paper about a tool, and specifically about what changes in that tool when the person reading it is one of the people in the conversation it renders.

The tool renders the shape of an exchange. It takes a transcript with speakers and timings, computes six observed measures over it, and returns a musical score and a graph. It says who held the floor, who followed whom and, where the material carries timings, how fast anyone came in. The companion paper MPN-S6 specifies that surface for a reader watching an exchange. This paper specifies it for a reader inside one.

It is a theory paper offered for comment and improvement. The mapping at its centre is specified in section 16 as the first item of open work, and the listening study that settles what it communicates is the second. That is said once, here, and the paper then gets on with the design.

### 1.2 The test this paper is written to

Write it as you would write a paper about a tool for professional musicians. The user knows what they want, the tool either serves it or it does not, and the paper's job is to say which.

**A sentence that would read as condescending to the person using the tool is an error in the paper rather than a caution to that person, and where such a sentence would be needed to defend a design, the design is wrong and is changed instead.** MPN-S6 states that test and this paper inherits it whole. It does more work here than it does there, because a participant reader is where the temptation to soften is strongest, and section 6 turns the test into the rule that decides every question in this paper.

### 1.3 The reader this surface is for, and the question they bring

This surface's reader is anyone who finds the shape of a conversation easier to read as sound or image than to infer from the speech itself. That is a statement about a preference for a medium, which is the only kind of statement this series makes about its reader, and it is the same kind of statement one makes about a musician who reads a score faster than a description of a score.

Autism is among the author's named applications, and the framing is a communication and expression aid. Where this paper draws on the autism literature it does so to constrain the tool: what a renderer declares about its own acoustic output, and who is in the room when the tool's own instruments are designed. Neither characterises the person at the keyboard, in either direction.

The question the reader brings, as MPN-S6 states it, is: *what actually happened between us, in the shape of the exchange rather than in what either of us was like?*

Read that question again with the emphasis on *between us*. It is already a participant's question. The person asking it was in the exchange, is asking about an exchange they took part in, and wants the answer in the shape rather than in a characterisation of either party. MPN-S6 answers it for a reader looking at a finished rendering. This paper answers it for a reader looking at one while the exchange is running, which is the harder half and the half the question was actually asked in.

### 1.4 Scope

The material is synthetic. The dialogue is dialogue the programme generates, or published dramatic text. Every requirement in this paper is technical or epistemic.

The paper sits against sections 6.4 and 7.4 of the unified design and consumes the theory, the formal apparatus, the state mapping and the application audit without amending them. It settles nothing about the Instrument, which is a separate surface with its own conditions.

### 1.5 What the paper settles

Seven things, each in its own section and collected in section 14.

The structural asymmetry between a participant and an observer, and the five needs that follow from it, in section 5. The grounds rule and the symmetry rule, which resolve the four conflicts the asymmetry produces, in section 6. The own-stave index, the declaration line and the seam, and the arithmetic showing that all three cost zero against the per-stave budget, in section 7. The relation seen from inside, where the participant's own star is linear against the observer's quadratic pair count, in section 8. The setting sentence for a participant reader and the form a mid-session change of setting takes, in section 9. The surface sentence, in section 11. And the stop, extended from the audio path to the whole display, in section 12.

Sections 9 and 8 additionally report computations made for this paper: floor share under two units renormalised to the two-persona case, and the star-against-pairs arithmetic checked by enumeration.

---

## 2. What the surface renders, stated from the beginning

A reader who has met no other paper in this series needs four things before section 4 can be read. They are here.

### 2.1 Four layers, ordered by what stands behind them

**Layer 0 is the transcript**: turns, timings and speakers, with parse confidence reported as a first-class output and a declared threshold above which the surface renders.

**Layer 1 is the observed measures over that transcript.** There are six: floor share, speaker adjacency, overlap, latency, reciprocity and backchannel. Each carries a named setting that changes the answer, and each setting is shown on every output.

**Layer 2 is a human being's rating**, recorded as a judgement rather than as an observation.

**Layer 3 is a machine's proposal**, marked as a proposal wherever it appears, and carried as text beside the Layer 0 turn that prompted it.

Two mappings run over those layers and they are different functions with different domains. The **state mapping** takes the nine-component state a human being has rated and renders it as musical material. The **interaction mapping** takes the Layer 1 measures and renders the shape of the exchange. The design keeps the two distinct, and each output carries a sentence in the reader's language naming which one produced it.

### 2.2 Expression is Layer 1

**Expression consumes the Layer 1 measures and the interaction mapping.** The state mapping runs where a human being has rated a state, and its domain is that rating. So what this surface renders is a function of four things: who spoke, when, for how long, and after whom.

That is the whole of the claims boundary, and it is checkable rather than promised: ask what the input to the state mapping would be on this surface and the answer is the four things above, which are the interaction mapping's domain and not the state mapping's. **What the surface renders is the shape of the exchange.**

The operational form of that, stated blunt because the failure it addresses is gradual rather than sudden: **the state mapping runs on a surface that has a rating instrument, a claims boundary written for one, and a sentence on its face that says so.** A build with those three is a different surface with a different name, and it is built as one rather than reached by configuration from this one.

### 2.3 The surface's vocabulary is the vocabulary of the exchange

The engine is named for a psychometric calculus whose state variables carry a Lacanian provenance. **That vocabulary belongs to the theory and drama papers, where it is accurate and where it is an asset.**

On this surface the words are the words a person would use about a conversation: who held the floor, who followed whom, how fast anyone came in, who came in over whom. A reader meets those and the measures behind them, and the mark on the face of every output says the operative thing in the reader's own language: this renders the shape of the exchange.

That split is a fact of the layer boundary here rather than a rule anybody has to remember, because the state mapping's domain is a rating and this surface's domain is a transcript.

### 2.4 What a persona is

A **persona** is whatever the score carries as a voice. It may be an actor, a character in a play, a speaker in a podcast, a voice in a book, or any persona a score carries. A score carries several of them, added and removed as the material requires.

**The surface renders one interaction stave per persona.** Per-person Layer 1 measures are indexed by speaker, so with N personas the layout is N interaction staves.

A cast change is a marked speaker-set discontinuity. The timbre assignment is append-only: a new persona is placed at the point farthest from every persona already placed, so **every persona already on the page keeps the voice it has.** The cost of that guarantee is computed rather than asserted, at most 13.4 per cent of timbre separation across the whole range from two personas to fourteen, and nothing at all at two, five, six and fourteen. Removal is free and repacks nothing.

### 2.5 The reader is in the synchronous case

The partition that matters is whether the material is known in advance rather than which ingest class it arrives on. Generated material and recorded material are known in full before a note is rendered, so the score is computed ahead and played against the dialogue, which is what a film score is. **The reader of this surface is in that case**, and the surface describes itself as a running score rendered against the dialogue.

One rule governs the precomputation and it is load-bearing. **Every quantity rendered at a turn is a function of that turn and of turns before it.** Whole-work precomputation is a convenience of the implementation, and a quantity that genuinely needs the whole work, such as a normalisation over total speaking time, is labelled a whole-work quantity and is rendered as one. On a surface whose point is to render an exchange as it unfolds, that rule is what makes the rendering a rendering of the exchange.

Live capture is sequenced by measured ingest-class error and it follows the interaction mapping, which it consumes like every other surface. Class B, a microphone per speaker, carries the timing-derived measures synchronously because attribution is the channel. Class C, a single room microphone, carries a resolution floor derived from the deployed diariser's error rate, below which differences render as **unmeasured**, visibly distinct from a rendering of an even exchange and worded so that a reader knows which of the two is in front of them.

---

## 3. Participant mode, inherited

Participant mode is specified. It is specified at section 7.4 of the unified design, under the heading *participant mode, specified rather than deferred*, and it carries four rulings that this paper inherits whole and builds on.

### 3.1 What participant mode is

**The same live surface, rendered while the exchange is running, with the exchange's own participants as its readers rather than an analyst.** Both modes are built and both were in from day one: the observer mode renders to an analyst, the participant mode renders the same surface to the people in the exchange.

**It renders everything the observer mode renders, per-person measures included.** That is D55, and the design states the ground: the earlier restriction rested on a premise about real people in a real room, and generated material removes the premise. D32 and D41, which had restricted per-person comparative measures in participant mode, are void under it.

**Per-person measures are restored in full**: floor share, turn count, mean turn length, latency before taking the floor, overlap initiated and overlap received, backchannel given and received, and degree in the adjacency graph. All of them are attributable by name on a shared display. An earlier revision had confined them to a person's own device; the design records that the confinement existed for a premise this material removes.

### 3.2 What gates the mode

**On generated material, which is class A, participant mode is gated on the interaction mapping alone.** Multi-party live participant mode additionally requires class B, a microphone per speaker. That is D18 and it stands as a measurement rather than as a preference: a single room microphone's attribution error is largest exactly at overlap, and a panel on one microphone is the material those error rates are measured on.

### 3.3 The three rules the mode carries, and the one thing they are all instances of

The surface blanks after a declared staleness horizon and says it is stale, because a live participant display is a delayed feedback loop by construction. It renders above the parse-confidence threshold. And it marks a discontinuity when the speaker set changes mid-session.

Those are three instances of one technical rule: **a stale or unsound reading is visibly distinct from a sound one.** The design says so in those words, and this paper generalises the rule at section 10 to every blank on the surface.

### 3.4 The observer effect, and the experiment that measures something

An earlier revision proposed running the same generated dialogue through the same engine with and without the display in the loop, and calling the difference the observer effect. A fixed transcript through a deterministic engine run twice is bit-identical, so that difference is fixed by the determinism guarantee the design insists on elsewhere.

**D68 replaces it with DC-1, display conditioning of a generator.** Condition the generator itself on the display: the generator writes the next turn with the rendered score available to it as context, and a paired run with the same seed writes the next turn without it. Holding the seed fixed is what makes the pair a comparison rather than two samples, and the comparison runs over many seed-matched pairs rather than over one dialogue. **What this measures is display conditioning of a generator**, and the name says so, because a generator conditioned on its own rendering is a model of the feedback loop rather than an instance of it. It is available because the material is synthetic.

### 3.5 What this paper inherits and what it adds

**R3 rejected the proposal that participant mode be removed rather than deferred.** The mode is in the design, in full, with its gating scoped and its experiment renamed.

What section 7.4 specifies is the mode: what it is, what it renders, what gates it, and what it does when a reading goes stale. **What it leaves to a later paper is the reader.** A mode that renders to several readers at once, one of whom configured it, raises a question the design leaves to a later paper and the companion use-case paper raises and defers. That question is this paper's, and section 4 states it.

---

## 4. The question this paper answers

### 4.1 The deferral, in the companion's own words

MPN-S5 specifies four use cases for one engine. Its section on the live score surface reaches the configuration act and stops. The paragraph is short and it is worth quoting at length, because the problem is stated exactly and the stopping is explicit:

> The reversibility argument is about one person at one screen, and this surface has several readers. In participant mode the chooser configures and the participants read, and a reader who did not choose is shown the two or three declared quantities and nothing about the twelve to fifteen that were displaced, because the sentence naming what an alternative displaces belongs to the configuration screen. And the click is not costless mid-session: changing which quantities a stave carries while a reader is tracking it silently rewrites what they have been tracking, which is the same object as the mid-session speaker relabel the design refuses, and for the same stated reason. **This paper does not resolve it.**

Two moves in the design produced that paragraph and both were right on their own terms. The design made each stave declare two or three quantities before the session, chosen from a longer list, with a stated default set and a one-screen budget. And it made the selection reversible without re-ingest, so that the cost of choosing wrongly is a click. Both are decisions about one reader at one screen. Participant mode puts several readers at one screen, and the second decision stops being a decision about the person who makes it.

### 4.2 Why this is a question about the theory and not about an interface

It would be easy to read the deferred paragraph as a user-interface detail: put a notification somewhere and move on. It is a question about the theory, for a reason that is about what the surface claims.

The surface's claim is that it renders the shape of an exchange. A rendering that two people in the same exchange read differently, without either knowing that the other's differs, is two renderings, and the claim that either of them is *the* shape of the exchange is weaker than the claim the surface makes. The thing at stake in the deferred paragraph is whether the object on the page is one object.

That is why the answer this paper gives is a pair of rules about the surface rather than a pattern for a screen. The rules are stated in section 6. They decide the interface, but the interface is what falls out of them rather than what they are about.

### 4.3 The shape of the answer

**What does a participant need that an observer does not, and where do the two conflict?**

Section 5 answers the first half. One structural fact separates the two readers, three properties follow from it, and five needs follow from those. Section 5.7 names four places where a participant's need pulls against an observer's on the same control.

Section 6 answers the second half. Two rules resolve all four, and the second rule is derived from the first rather than asserted beside it.

Sections 7 to 13 carry the resolution through the surface, one part at a time, with the arithmetic shown.

---

## 5. The participant and the observer

### 5.1 One fact

**A participant appears in what they read.** An observer does not.

Everything in this section follows from that sentence, and it is worth keeping in the foreground, because most of what looks like a difference of temperament between the two readers is a consequence of it.

### 5.2 Three properties

**Indexed.** A participant is one of the personas rendered on the page. One of the N interaction staves is theirs. An observer is none of them, and to an observer every stave is equally other.

**Concurrent.** A participant reads while taking part. Attention to the surface is time-shared with the exchange, and the exchange proceeds at its own rate whether or not the reader is looking. An observer's attention is free and the material waits: on material known in advance, an observer can look away, look back and lose nothing.

**Plural.** A participant surface has several readers, all of them in the exchange. At most one of them set the configuration. An observer surface has one reader, and that reader is the person who configured it.

Those three are properties of a position rather than of a person. Any reader who takes that position has all three; any reader who leaves it has none. That matters in section 6, because it is what makes them usable as grounds.

### 5.3 First need: the index

**A participant needs to know which line is theirs, without looking for it.**

This follows from *indexed* and it is the simplest of the five. On an N-persona score the staves are labelled by persona, so the information is on the page already; what the participant needs is that the identification cost zero attention. A reader who has to find their own stave among fourteen is spending on search the attention the surface exists to save, and a reader in the concurrent position has less of it to spend.

The design consequence is a per-reader parameter: **the own-stave index**, naming which persona this reader is. It is the only per-reader parameter this paper introduces, and section 6.5 shows it is the only one the rules admit.

### 5.4 Second need: the provenance of the configuration

**A participant needs to know what the stave they are reading carries, and who set it.**

This follows from *plural*. Each stave declares two or three quantities, and the declaration is already on the output for every reader of every surface. What the participant surface adds is the second half: the configuration is one person's act and several people's reading, so the declaration names the reader who made it.

That is a line of text on the surface, in the same type as the declaration it extends, and it is worth being exact about why it is there. It is a fact about the page rather than an attribution of responsibility: the floor-share line is counted in turns because a named reader chose turns, and a reader who knows that reads the line for what it is.

### 5.5 Third need: a stop that leaves the exchange running

**A participant needs a stop on the display that costs nothing and returns them to a running exchange.**

This follows from *concurrent*. MPN-S6 specifies an instantaneous and costless stop on the audio path, meaning no re-ingest, no re-render and no loss of position, and states that the guarantee is available because the audio is generated, a generator being able to prove its own bounds. On a participant surface the same guarantee is needed on the whole display and it means something slightly different, because the thing the reader returns to has moved on.

So the stop has two halves here. The audio stops instantly and at no cost, which is the inherited specification. And the display, on resuming, gives the reader the exchange as it now stands rather than where they left it, with a seam marking the interval they did not read. Section 12 specifies both.

### 5.6 Fourth and fifth needs: the seam, and symmetry

**A participant needs a seam wherever the thing they are tracking changes identity.** This follows from *concurrent* and *plural* together. A reader who can rewind discovers a change by rewinding. A reader who cannot, and who did not make the change, discovers it by being shown it. The design already draws such a seam for a cast change, on the ground that a stale or unsound reading is visibly distinct from a sound one. Section 6.4 extends the same instrument to the configuration, and section 7.5 lists it among the three things the participant surface adds.

**A participant needs the surface to be one surface.** This follows from *indexed* and *plural*. Each reader is in the picture, and so is every other reader. A page on which A sees a comparison between A and B, and B sees something else, is a page whose content depends on who is holding it, and the question *what actually happened between us* has as many answers as there are readers. Section 6.5 makes this a rule and derives it rather than asserting it.

### 5.7 Where the two audiences pull against each other

Four places. Each is a single control on which the observer's interest and the participant's interest point in opposite directions, and each is resolved in section 6.

**Conflict one, the cost of reconfiguration.** The observer's interest is that reconfiguration be cheap: one reader, one screen, and the cost of choosing wrongly should be a click. The participant's interest is that reconfiguration be conspicuous: several readers, one of whom made it, and the others were tracking a line whose contents changed under them. Cheap and conspicuous pull opposite ways on the same control.

**Conflict two, the subject of a named comparison.** A named per-person comparison between two personas is permitted on a stave. For an observer, both personas are third parties. For a participant, one of them may be the reader and the other may be sitting beside them. The permission is the same permission; what it is a permission to render is different.

**Conflict three, which relation to attend to.** An observer chooses a pair to attend to from all of them and has no ordering supplied, which is why a selection aid is needed as the cast grows. A participant is already positioned in a subset of the pairs, which is an ordering the exchange supplies for free. A surface built for one of those readers serves the other badly.

**Conflict four, the work the surface sentence does.** The surface carries one sentence saying what it is for. For an observer, the people in the exchange are third parties, so a sentence naming the picture's subject is straightforwardly informational. For a participant, the reader is one of the people, so the same clause is a sentence about the reader. It has to be written to do that work rather than to avoid it.

---

## 6. The resolution: two rules

### 6.1 The grounds rule

Take the test this paper is written to and apply it to a difference rather than to a sentence.

Suppose the participant surface differs in some respect from the observer surface. Write the sentence that defends the difference. Address that sentence to the reader it applies to. Then read it back.

**Two kinds of sentence come out, and only two.**

A sentence of the first kind states something about the reader's position in the exchange: *you are one of the voices on this page*; *this is running while you take part in it*; *several people are reading this*. Read back to the reader, a sentence of this kind tells them where they are sitting, which is something they already know and could have told you. It is information about the situation, and no reader is patronised by being told the shape of their own situation.

A sentence of the second kind states something about the reader: what they can hold, what they can take, how they will react, what would be good for them. Read back to the reader, a sentence of this kind is the sentence the test excludes.

**The grounds rule.** *A difference between the participant surface and the observer surface is admissible where it is derivable from the reader's position in the exchange. A difference that requires a property attributed to the reader is a design that changes.*

The rule is mechanical and that is the point of writing it in this form. It asks a designer to produce the defending sentence, address it, and see which of the two kinds it is, rather than to judge tone. A designer who reaches for the sentence and finds the difference has no ground behind it has reached the same outcome by a shorter route.

### 6.2 What the rule is a generalisation of

The rule is not new behaviour in this programme; it is the general form of something the companion paper already does twice.

MPN-S6 withholds the overlap-derived measures until a backchannel lexicon has been established for the language and the speech community, and it is careful to say what the ground is: *they are held back from every user of every surface on the same ground, not from this one*, and the ground is a judgement about what a word list can measure. That is a sentence about the measure, addressed to every reader identically. It survives being read back.

MPN-S6 also says, in five words that this paper takes as its premise, that **withholding numbers from the person who asked for them would be the condescension.** A design that gave the participant fewer numbers than the observer would need a defending sentence, and the only available one is about what a participant can take, which is the second kind. So that design changes, and the numbers go to the participant on the same terms.

The grounds rule states the principle those two applications share. Its value is that it decides cases neither of them covers, and section 6.4 onward uses it four times.

### 6.3 The symmetry rule, derived

The symmetry rule is a consequence of the grounds rule rather than a second principle beside it. The derivation is short and worth setting out, because a derived rule is harder to argue away than an asserted one.

Take two participants, A and B, reading one surface.

**Step one.** By the grounds rule, a difference between what A sees and what B sees is admissible where it is derivable from their positions in the exchange.

**Step two.** A and B differ in position in exactly one respect: which persona each of them is. Every other property of their position they hold in common. Both are inside the exchange. Both read concurrently. Both are among several readers. Those were the three properties of section 5.2 and each holds of both readers identically.

**Step three.** So an admissible difference between A's surface and B's is a function of which persona the reader is, and of nothing else.

**Step four.** There is a minimal such function: mark the reader's own stave. There are richer ones, and each of them restricts or reorders content by reader. A restriction needs its own defending sentence, and the available sentences for restricting one participant's content while another's stays whole are all of the second kind, because they say something about the reader rather than about the position. So by the grounds rule the richer functions are designs that change.

**The symmetry rule.** *There is one surface, one configuration and one content. The single per-reader parameter is the own-stave index. Every reader of the surface is looking at the same picture, and each of them can see which line is theirs.*

That is the resolution of the two-audience question in its general form. The four conflicts of section 5.7 are now four applications of it.

### 6.4 Conflict one resolved: the seam belongs to the reader, the control stays cheap

The observer wants reconfiguration cheap. The participant wants it conspicuous. The conflict dissolves once the two properties are seen to belong to different objects: **cheapness is a property of the control and conspicuousness is a property of the reading.**

So the control stays exactly as the design specifies it. A selection is reversible without re-ingest, the cost of choosing wrongly is a click, and every alternative states what it displaces rather than being offered as a free addition.

And the change draws a seam. **A change to a stave's declared quantity set draws a seam on every reader's surface at the turn where it takes effect, naming the quantity that arrived, the quantity it replaced, and the reader who made the change.** The seam is the same instrument the design already uses for a speaker-set discontinuity, applied to the other thing that can change a stave's meaning under a reader who is tracking it.

Three things follow and each is small.

The seam is an event rather than a channel, so it consumes no part of the per-stave budget. Section 7.6 does that arithmetic.

The seam carries the setting sentence of section 9 with it, so a reader who did not make the change is told what the change does to the output in front of them, which is the same sentence the configurer saw before making it. The information that MPN-S5 observed was confined to the configuration screen reaches every reader by the route the surface already has.

And in observer mode the rule costs nothing, because the one reader is the person who made the change and the seam confirms an act they performed. **The same rule serves both modes**, which is the outcome the symmetry rule predicts: what differs between the two modes is the number of readers, not the surface.

This closes the question MPN-S5 left open at its section 5.4.

### 6.5 Conflict two resolved: symmetry rather than suppression

A named per-person comparison between two personas is permitted on a stave, and the graph and the numeric readout carry it as well. On a participant surface one of the two personas may be the reader.

The symmetry rule settles what follows. **A named comparison rendered to one reader is rendered to every reader, in the same form, with the same quantities.** The comparison does not change when the reader is in it, because the comparison is a property of the exchange rather than of who is reading.

What would make the comparison a different object is asymmetry: a comparison available to one reader alone, or a version of it adjusted for the reader's presence in it. Both are per-reader functions richer than the index, both would need a defending sentence of the second kind, and both are therefore designs that change.

**The cost of the permission travels with it, and it is the same cost on both modes.** The listener conditions on the interaction mapping are scoped to the affective reading of the mapping and cover the mapping's codomain choices. A named comparison is a further object on the same channel, attached to a person by name, and the conditions reach it once they are extended to it. Until then the comparison is carried as a **labelled untested permission**, which is what the companion papers already do for the panel producer, and extending the listener conditions to cover it is a study to run rather than a choice to make. It is item 5 of section 16.

Two further consequences hold on a participant surface specifically.

**The surface renders measures, and a ranking is a separate quantity with its own specification.** A per-person measure is a quantity of the exchange indexed by speaker: A held the floor for 61 per cent of it; B's median latency before taking the floor was 0.4 seconds. A ranking is a derived ordering over people presented as the object of interest: a sort, a leaderboard, a most-dominant label, a per-person composite. The first is in the interaction mapping's domain. The second is a new quantity that would need its own specification, its own listener condition and its own evidence, and the reason the surface gives is the true one, that a ranking is a quantity awaiting its specification and its test, rather than a protective one, which would be false and would be the sentence this paper's test excludes.

Section 9's computation bears on the ranking question directly. On *Hamlet* the second-ranked voice changes with the floor-share unit, so an ordering below the top depends on the setting as much as on the exchange, and rendering that ordering as a result would be rendering the setting as a result.

**At two personas the measure and the ordering coincide**, because a floor share of 61 per cent for one speaker is a floor share of 39 for the other, and the same holds for turn count, mean turn length and latency. So at the cast size a participant surface will mostly meet, the ordering is the whole content of the measure and it is read in one glance. The no-ranking rule governs the stave at every cast size and governs the numeric readout above two personas, where a sort or a composite is a thing a surface could build and this one builds a measure instead.

### 6.6 Conflict three resolved: the star is a default, the pairs stay available

The observer chooses among all pairs and has no ordering supplied. The participant is in a subset of the pairs, which is an ordering the exchange supplies.

**The resolution is that the participant's own star is a default rather than a restriction.** The reader's own pairs are what the surface brings forward when the reader opens it, because that is derivable from position: this reader is in these pairs. Every other pair is one act away, and the full pair list is on the surface for every reader.

A default derived from position passes the grounds rule. A restriction to the star would need a sentence about why this reader gets less than that one, which is of the second kind. So the star is where the surface starts and the pair list is where it goes.

Section 8 computes what that is worth. It is worth a great deal as the cast grows, and at two personas it is worth exactly nothing, because at two personas the star is the whole relation graph.

### 6.7 Conflict four resolved: the sentence names its subject

The surface carries one sentence saying what it is for. For a participant reader, the clause that names what the picture is about is a clause about a set of people that includes the reader.

**The resolution is to name the subject rather than to work around it.** The sentence says what the picture is of, in the words a person would use, and the naming is the claims boundary. A reader who is told that the picture's subject is the exchange has been told the operative thing, and has been told it as information rather than as an assurance, which is what the design requires of the mark on every output.

Section 11 supplies the sentence, in one sentence, on the surface, in the same type as everything around it.

### 6.8 What the two rules settle, and the one thing they leave open

The grounds rule and the symmetry rule settle every question in sections 7 to 13, and they settle them in the same direction each time: the participant surface and the observer surface are one surface, and the participant additions are an index, a declaration and a seam.

**What they leave open is a question about the reading rather than about the design**, and it is worth stating here rather than in section 15 alone, because it is the condition on everything above. The symmetry rule says every reader is looking at the same picture. Whether a rendering of an exchange is read differently by a person who was in it than by a person who was not is a question about listeners, and the listening study of section 16 item 2 is built to ask exactly that: the comparison is between listeners told the exchange is theirs and listeners told it is not, and the material stays synthetic so the condition is supplied by the framing rather than by the material. If the framing moves the reading, the surface sentence of section 11 is doing less work than it is written to do and is rewritten on the result.

**The rules are about what the surface renders. The study is about what the rendering communicates.** Both are needed and neither substitutes for the other.

---

## 7. The staves, and what the participant additions cost

This is the design section, and its spine is arithmetic that was already done. Decision E of 15 September restated the layout for N personas and recomputed the per-stave load at two. This paper reproduces that arithmetic, then asks the question Decision E did not have to ask: what do the three participant additions of section 6 cost against it?

The answer is zero, and the reason is structural rather than lucky.

### 7.1 One interaction stave per persona

**The surface renders one interaction stave per persona.** With N personas the layout is N interaction staves.

The earlier reading of the design's reference score had made Expression a one-stave surface, and the reason it was a misreading is worth recording because it is instructive about counting. The design's reference score is two state staves and one interaction stave, which is a two-speaker layout; removing the two state staves from it leaves one. **That count was an artefact of the reference layout rather than a consequence of the rule.** The rule is about the state stave. The number of interaction staves is a property of the cast.

### 7.2 The per-stave budget, and where it comes from

The programme's legibility assertion puts a stave at two to three independent quantities. It is an estimate rather than a measured figure and the assertion says so. As amended on 15 September it carries no between-stave escape, so nothing on a stave is exempt from it and a measured channel budget differing from two to three falsifies it directly.

**The budget applies stave by stave and the cast size does not enter it.** Running the three-clef generator for this paper reproduces the arithmetic the assertion is measured against on the three-stave reference layout: eighteen rendered parameters, six per state stave and six interaction quantities, against a budget of six to nine across three staves, which is a factor of two at the ceiling and three at the floor. That computation is independent of the corpus, so it holds under every exclusion the design applies to the score files.

Each persona's stave wants that persona's six Layer 1 measures: floor share, degree in the adjacency graph, overlap, latency, reciprocity and backchannel. What is informative per stave depends on the cast size, and on whether a backchannel lexicon has been established for the language and the speech community.

### 7.3 At two personas the stave comes out exactly

| Cast size | Released on a lexicon | Constant at that size | Informative per stave | Budget per stave | Outcome |
|:---|:---|:---|---:|:---|:---|
| Two personas | overlap, backchannel | degree, reciprocity | **2**, floor share and latency | 2 to 3 | **Fits, exactly** |
| Two personas, lexicon established | none | degree, reciprocity | 4 | 2 to 3 | Oversubscribed 1.3x to 2x |
| Above two | overlap, backchannel | none | 4 | 2 to 3 | Oversubscribed 1.3x to 2x |
| Above two, lexicon established | none | none | 6 | 2 to 3 | Oversubscribed 2x to 3x |

**At two personas each stave carries floor share and latency, which is two quantities inside a budget of two to three. It fits exactly, with nothing displaced and nothing left over.** That is a good result and it is worth stating plainly, because two personas is the material this surface will mostly meet, and because a participant exchange between two people is the case the reader's question is most often asked about.

### 7.4 Why the per-persona layout is what produces that

The reasoning is the layout doing work rather than the measures being generous.

Floor share looks like a single degree of freedom shared between two speakers where one stave carries the relation. With a stave per persona it is two numbers. **Persona A's floor share is a number on A's stave and persona B's is a number on B's, and the fact that they sum to one is a relation between two staves rather than an emptiness in either.**

Degree in the adjacency graph and reciprocity behave the other way. At two personas degree is the constant 1 for both and reciprocity is 1 by construction, so they are genuinely constant at that size and the table marks them so.

The overlap-derived measures are released where a backchannel lexicon has been established for the language and the speech community, which is programme work rather than user work. Until then the surface names that blank as one of the four kinds and states the one action available, which section 10 specifies.

That leaves floor share and latency, and the candidate and the only admissible answer coincide. **Above two personas the default pair is open**, because four measures then compete for two or three places, and which two a reader can hold is what item 11 of section 16 derives.

### 7.5 The three participant additions

Section 6 adds three things to the surface and no more.

**The own-stave index.** A mark identifying which of the N staves belongs to this reader.

**The declaration line.** The declared quantity set on each stave, extended by the reader who set it.

**The seam.** A mark at the turn where a stave's declared quantity set changed, naming the quantity that arrived, the quantity it replaced, and the reader who made the change, and carrying the setting sentence of section 9.

### 7.6 All three cost zero against the per-stave budget, and the reason is structural

The budget counts **independent quantities the stave carries**. A quantity in that sense is something that varies turn by turn and that a reader tracks across time. That is what makes two or three a bound: it is a bound on simultaneous tracking.

Measure the three additions against that definition.

**The index is a property of the stave's identity rather than a quantity on it.** The stave is already labelled by persona, because per-person measures are indexed by speaker and the label is what the index means. Marking one label as the reader's own marks a label: the mark is constant for the whole session by construction, a reader's own persona being fixed for as long as they are that persona. **A constant is a label rather than a degree of freedom, so it is counted as one.**

**The declaration line is metadata about the stave rather than content on it.** The design already requires each stave's declared quantity set to be shown on the output, on every surface and in both modes. Extending that line by the name of the reader who set it lengthens a line of text and adds no channel.

**The seam is an event rather than a channel.** The design already draws a seam for a speaker-set discontinuity and counts it as an event, for the good reason that a mark occurring at one turn is read once rather than followed as a line. The configuration seam is the same object applied to the other thing that can change a stave's meaning.

So the arithmetic of section 7.3 survives intact:

| What is on a two-persona stave | Independent quantities | Against the budget |
|:---|---:|:---|
| Floor share | 1 | |
| Latency | 1 | |
| Own-stave index | 0, constant for the session | |
| Declaration line | 0, metadata | |
| Configuration seam | 0, an event | |
| **Total** | **2** | **2 to 3, fits exactly** |

**The participant surface is the observer surface at the same per-stave cost.** That result is what makes the symmetry rule of section 6.3 buildable rather than merely principled: a rule saying both modes render one content is easy to state and worth nothing if the participant additions had to displace a measure to fit. They fit, because each of them is a mark or a line of text rather than a measure.

### 7.7 The surface scales with the cast rather than with the readership

One more count, and it is the one an implementer will want.

An N-persona exchange with N participant readers renders N interaction staves. It renders N staves to each of the N readers, and it renders **the same N staves**, by the symmetry rule, with one label marked differently per reader.

So the number of staves the surface has to lay out is N, and it is N whether the surface has one reader or N. **The layout's two dimensions are the cast and the per-stave budget.** The one thing that scales with the readership is the index, which is one mark per reader and zero quantities per stave.

That is a stronger statement than it looks, because the obvious alternative design does scale with the readership. A surface that tailored content per reader would have as many layouts as readers, as many configurations as readers, and a legibility budget to defend for each. The symmetry rule removes that whole dimension, and it removes it for a reason about grounds rather than about engineering, which is the better kind of reason to have removed it for.

### 7.8 Oversubscription above two personas, and what it does as the cast grows

Above two personas the surface chooses, and the rule requiring it to choose is load-bearing rather than a formality. With the overlap family awaiting its lexicon, four quantities compete for two or three places, so at least one and as many as two are carried elsewhere; with a lexicon established, six compete and as many as four are.

**Oversubscription rises and then flattens as the cast grows.** It runs 2.7x at two personas to 3.7x at fourteen and then flattens, so scaling makes the legibility problem wider rather than deeper. The problem at fourteen personas is the problem at two, fourteen times over, and a surface that has solved it at two has solved it at fourteen.

Section 6 says where the quantities that leave the stave go, which is the graph and the numeric readout, and the named comparison reaches the stave as well.

---

## 8. The relation, seen from inside

The hardest thing to scale on this surface is the relation rather than the cast. This section computes what the participant's position is worth against it, and the answer is that the participant's position is the best reduction anyone has found for the problem.

### 8.1 The observer's problem is quadratic

A score of N personas carries N(N-1)/2 unordered pairs. The reduction to an active pair is a reader's act, and the ordering over the pairs is the observer's own to supply. At two personas that is one pair and the act is trivial. At fourteen it is ninety-one, and an act over ninety-one options with an ordering the reader supplies themselves is the act a selection aid exists to support, which is why the aid moves from a convenience to a requirement as the cast grows.

**This is the one place in the arithmetic where a bigger cast is categorically harder rather than proportionally harder**, because the growth is quadratic while everything else is linear or flat.

### 8.2 The participant's own star is linear

A participant is in exactly N-1 of those pairs: the pairs containing their own persona. Call that set the reader's **own star**.

The star is an ordering the exchange supplies for free. It needs no selection aid, no heuristic and no ranking, because it is a fact about where the reader is sitting rather than a judgement about what matters. That is a ground of the first kind under section 6.1, which is why section 6.6 makes the star the default the surface opens on.

Computed for this paper, and checked by enumeration at every listed cast size:

| Personas N | Pairs, N(N-1)/2 | Own star, N-1 | Ratio, N/2 |
|---:|---:|---:|---:|
| 2 | 1 | 1 | 1.0 |
| 3 | 3 | 2 | 1.5 |
| 4 | 6 | 3 | 2.0 |
| 5 | 10 | 4 | 2.5 |
| 6 | 15 | 5 | 3.0 |
| 7 | 21 | 6 | 3.5 |
| 8 | 28 | 7 | 4.0 |
| 10 | 45 | 9 | 5.0 |
| 12 | 66 | 11 | 6.0 |
| 14 | 91 | 13 | 7.0 |

**The reduction is exactly N/2, and it is unbounded.** At fourteen personas the observer faces ninety-one pairs and the participant thirteen, which is the difference between a set a reader chooses from and a set a reader reads.

### 8.3 At two personas the star is the whole relation graph

Read the top row. At N equals two, the pairs are one and the star is one, so the ratio is 1.0 and **the participant's default is the whole of the relation, losslessly.**

That is worth putting beside section 7.3. At two personas each stave carries floor share and latency, which fits the budget exactly; and the participant's own star is the entire pair set, so the default reduction costs nothing at all. **At the cast size this surface will mostly meet, the whole design comes out with nothing displaced anywhere**, which is a coincidence of two independent arithmetics and is the strongest single result in this paper.

### 8.4 The moderated case, and what the star has in common with it

A moderated structure collapses the pair count from N(N-1)/2 to N-1, which is linear, and that is a reason to record whether a score has a moderator rather than treating every cast as a free graph.

Compare that with the star column above. **They are the same number.** A moderator's star is the whole moderated graph, and a participant's star is their own slice of a free one. The moderated collapse and the participant reduction are one construction seen from two sides: a distinguished persona, and the pairs through it.

Two consequences follow.

**A participant reading a moderated exchange in which they are the moderator has the entire relation graph as their default.** Their star is every pair there is. That is the best case in the whole arithmetic and it arrives without any special handling.

**Recording whether a score has a moderator is worth doing for the participant surface and not only for the panel producer's.** It is item 12 of section 16.

### 8.5 What follows for the graph and the numeric readout

The graph carries every persona, which is the design's own statement about what carries the material a stave reduction sets aside. That holds through this section: **the star is where the surface opens and the full pair set is one act away for every reader.**

The numeric readout carries the per-person measures with their setting and their window beside them, for every persona, for every reader, under the symmetry rule. What the star changes is the order they are brought forward in, which is a fact about the reader's position and is derivable from it.

Specifying the graph renderer for this surface is item 10 of section 16, and it is the item on which section 15.4 turns.

---

## 9. Settings, and the sentence beside the control

Every Layer 1 measure carries a named setting that changes the answer, and the setting is shown on every output. This section specifies what that looks like for a reader inside the exchange, and it computes the material the specification rests on.

### 9.1 The user keeps every control, and gains a basis

Showing a reader a control reading *floor share unit: seconds, words or turns* hands them the power to change the answer and a basis on which to choose, or hands them the power alone. Which of the two it is depends entirely on what is written beside the control.

**The user keeps every control.** Removing a control from this audience while leaving it for another would be a difference between two surfaces defended by a sentence about this audience, which is a sentence of the second kind under section 6.1, and the design changes rather than writing it. **What the user gains is a basis**, and the basis is a sentence naming what the setting does to the output in front of them.

That form is the only one that supplies a basis, because the definition of a unit is not a reason to prefer it and the effect on this exchange is.

### 9.2 What the units do, computed

The premise that the floor-share units disagree about who dominated a conversation is measurable, and this paper measured it. The computation runs over the programme's seven score files under the design's own rules applied to its own evidence: the file whose rows carry the non-speaker token sits below the parse-confidence threshold and the computation runs on the remaining six; the non-dialogue token is dropped wherever it appears; and the three anthology files are reported below the line and labelled, because a top-two share over a file of several plays with disjoint casts measures the anthology rather than any play in it.

Seconds is computed where the material carries turn onsets and offsets. Dramatic script carries text, so the two units computable here are turns and words, and every figure below is a lower bound on the disagreement for that reason: seconds is the unit most unlike the other two, since a speaker with few long turns and a speaker with many short ones are exactly the pair it separates.

| Score file | Top two by turns | Top two by words | Coverage, turns | Coverage, words | Speakers at 1 per cent or more | Changing rank between the units |
|:---|:---|:---|---:|---:|---:|---:|
| A Doll's House | Nora, Helmer | Nora, Helmer | 64.6 | 71.0 | 7 | 4 |
| Hamlet | Hamlet, **Horatio** | Hamlet, **the King** | 40.4 | 53.2 | 18 | 17 |
| Macbeth | Macbeth, Lady Macbeth | Macbeth, Lady Macbeth | 30.0 | 42.3 | 22 | 17 |

**What that establishes.** The two computable units disagree, and on one of the three single plays they disagree about which speaker is second, which is precisely the pair a two-persona reduction renders. They disagree about how much of the exchange that pair covers by 6.4, 12.8 and 12.3 points.

**What it establishes narrowly, which is the half a reader will assume otherwise.** On all three single plays the single busiest speaker is the same under both units. **The units agree about who spoke most and disagree about almost everything after that.** That is the true claim and it is narrower than the design's own sentence.

Two files do change their top speaker and both are anthologies: the Chekhov file, where Irina leads by turns and Lubov by words, and the Strindberg file, where Maurice leads by turns and Adolphe by words while Maurice falls from first to fourth. An anthology figure is a figure about an anthology, so neither bears on the claim above.

Two further limits travel with the table. A row in these files is a line rather than a turn, so the turn column merges consecutive rows carrying the same speaker, which is the nearest approximation the material allows. And each of the six files is a dramatic text rather than a conversation or a moderated exchange, which is a standing limit on every corpus figure in this programme. These figures are new with this run; the coverage column is a different computation from the programme's verified 69.2, 50.1 and 39.0 per cent, which count rows and retain the non-speaker token.

### 9.3 The same computation at two personas, which is the participant case

The table above reports a pair's share of a whole work. A two-persona surface renders the pair, so the figure a participant reads is the pair renormalised to itself: not what fraction of the play these two hold, but how the floor divides between them.

Computed for this paper on the same three files, under the same exclusions:

| Pair | By turns | By words | Swing on the leader |
|:---|:---|:---|---:|
| Nora and Helmer, *A Doll's House* | 67.4 to 32.6 | 64.6 to 35.4 | 2.7 points |
| Hamlet and Horatio, *Hamlet* | 76.4 to 23.6 | 85.6 to 14.4 | 9.2 points |
| Macbeth and Lady Macbeth, *Macbeth* | 71.3 to 28.7 | 73.3 to 26.7 | 2.0 points |

**The swing is what the setting sentence has to carry, and it is uneven across the three.** Two of the three move by two or three points, which a reader can reasonably treat as one answer stated twice. One moves by 9.2 points, which is a different reading of the same exchange: counted in turns Hamlet holds three quarters of the pair's floor, counted in words he holds six sevenths of it.

**That unevenness is the argument for the sentence rather than against it.** A tool that showed the unit without the consequence would present the 2.0-point case and the 9.2-point case identically, and the sentence is what tells a reader which of the two they are in.

### 9.4 The setting sentence a participant sees

Each setting appears with a sentence saying what it changes, and the sentence names the consequence on the output in front of the reader rather than the definition of the unit. On a participant surface it names it in the second person, because the reader is one of the two quantities:

> *Floor share is counted in turns. Counted in words instead, this exchange reads as 86 to 14 rather than 76 to 24, and the floor-share line on each stave moves with it.*

Four things about that form.

**It is the same sentence in both modes with one word changed.** An observer reads *this exchange reads as 86 to 14*, and a participant reads the same clause. The second person enters only where the reader's own persona is named, which is the index of section 5.3 doing its work in text. A different sentence for the participant would need a ground, and the ground would be of the second kind.

**It costs a recomputation under the alternative setting**, which is cheap on material known in advance and is bounded by the requirement that a selection be reversible without re-ingest.

**It states a property of the material in the same voice as any other measure.** A conversation whose ordering is stable across units and one whose ordering inverts are different conversations, and the second fact is worth rendering. A reader told that the pair depends on the unit has been told something true about the exchange.

**It is the same sentence the configurer saw.** That matters in the next subsection.

### 9.5 A setting changed while the exchange is running

The control is cheap and reversible, and on a participant surface the change reaches readers who did not make it. Section 6.4 resolved this by giving the seam to the reader and leaving the control alone. Here is what the seam carries.

**At the turn where the change takes effect, every reader's surface draws a seam naming the setting that changed, the value it moved to, the value it moved from, and the reader who moved it, and carrying the setting sentence of section 9.4.**

So a reader who did not touch the control learns three things at the moment they become true: that the line they are tracking now means something else, what it now means, and what the change does to the numbers in front of them. The information MPN-S5 observed was confined to the configuration screen reaches every reader by the route the surface already has, and it reaches them at the point where it is load-bearing rather than before the session when it was abstract.

**In observer mode the seam confirms an act the one reader performed.** The rule is the same rule and it costs the observer a mark on a line they just changed.

### 9.6 The default is fixed by the ingest rather than chosen on first use

Where turn onsets and offsets exist the unit is seconds. Where the material is text with speaker labels, floor share is a word or line count and is labelled as one, under the rule that a script analysis and a podcast analysis are different measurements and each says which it is on its own output.

**The ingest fixes the default on first use, and the sentence beside it says what the alternative would do.** The numeric defaults themselves are among the parameters this surface consumes and section 16 item 8 fixes them.

---

## 10. The numbers that reach the reader, and the form every blank takes

### 10.1 Numbers go to the person who asked for them

**Every number this surface computes goes to the person who asked for it, on the same ground for every user of every surface.** That is the rule, it is inherited whole, and section 6.2 showed what holds it in place: a design that gave a participant fewer numbers than an observer would need a defending sentence about what a participant can take, and the grounds rule sends that design back to be changed.

Under the symmetry rule the stronger form holds. **Every number goes to every reader of the surface**, because the readers differ in position by the index alone and a difference in content would need a richer per-reader function than the index admits.

### 10.2 Which numbers this surface has

Five of the nine per-person quantities the design restores are available as a number, with their setting and their window beside them: floor share, turn count, mean turn length, latency before taking the floor, and degree in the adjacency graph. The graph carries every persona.

The other four are the overlap-derived ones: overlap initiated, overlap received, backchannel given and backchannel received. **They are released where a backchannel lexicon has been established for the deployed language and the speech community, by the same standard this programme applies to any other measured quantity.** Establishing one is programme work rather than user work, and it is item 3 of section 16.

### 10.3 The ground for that, which is about a word list rather than about a reader

This is the place where the two rules of section 6 are most easily misread, so the ground is worth stating in full.

Overlap is very likely the thing the reader came for, and the participant reader most of all, because *who came in over whom* is the dynamic a person inside an exchange is most often trying to read. Holding it back until the lexicon exists is the expensive answer.

**It is the right one because the object that would produce the alternative is a word list.** A raw overlap detector scores the most supportive listener as the most aggressive interrupter, and the mitigation in the design is that the backchannel lexicon is declared and editable. Editing a word list is an expert act, and on this surface the reader has better things to do with their attention than curate one.

The other branch, a lexicon right by default for the deployed language, is narrower than it sounds. Gap length and overlap tolerance vary by language **and by speech community**, so the most a list can be is right for one community inside one language. That is a fact about lexicons rather than about deployments.

And this programme has the precedent at first hand: its own application audit found a keyword counter read as a measurement through three revisions of a paper. A backchannel lexicon is a keyword counter.

**So the ground is a judgement about what a word list can measure, and it applies identically to every user of every surface.** It is a ground of the first kind, it is addressed to nobody in particular, and it survives being read back to anyone. That is what makes it admissible where a ground about the reader would not be.

### 10.4 Every blank names its kind and the one action available

Sixteen things in this design cause an output to shrink, and each of them is correct on its own terms. Undifferentiated they read alike, and a reader who meets one kind and acts as though it were another spends effort on nothing. So the rule:

**Every blank on this surface names which of four kinds it is, and the one action available.**

| Kind | What it means here | The action available |
|:---|:---|:---|
| **Your material** | A text with speaker labels carries words and turns; a low-coverage work is a work with many voices | Use different material, or read the graph, which carries every persona |
| **Your ingest class** | A single room microphone measures what a single room microphone measures | Record with a microphone per speaker |
| **Not specified yet** | A measure awaits the work that releases it | Wait, and the surface names the item it waits on |
| **We broke** | Vendor outage, staleness, a dropped stream | Wait and retry |

**A low-coverage work is the first kind**, and the sorting matters because the action available to that reader is real and immediate: the graph carries the personas a reduced score sets aside.

### 10.5 The blank for the overlap family, worded

**It is the third kind, and the surface says so before it says anything else.** The analysis opens with the sentence, ahead of the content rather than in a footnote, for the reason the design gives: interruption is the dynamic most readers are trying to read, and a blank met after the content is a blank a reader has already drawn a conclusion around.

> *This analysis reports who held the floor, who followed whom and how fast anyone came in. It reports who came in over whom once a backchannel lexicon has been established for the way this group talks: a lexicon built for the language carries part of it, and what counts as talking over someone varies between communities inside a language.*

Two things about that wording. **It names the cause rather than the symptom**, so a reader knows which of the four kinds they are in from the sentence alone. And it is written forward: it says what the surface reports now and what releases the rest, which is the form the third kind takes when its obligation to name the work it waits on is discharged in the sentence itself.

**The other measures render normally.** The sentence is a statement about one measure family and the surface is a surface.

### 10.6 A blank on a shared surface

One thing is new here and follows from plurality.

**A blank on a participant surface is the same blank for every reader, at the same moment, in the same words.** That is the symmetry rule applied to the case where the surface has less to say rather than more, and it is worth stating separately because the temptation runs the other way: a surface that told one reader why a line was empty and left another to wonder would be two surfaces again.

When a blank arrives mid-session it takes a seam, on the same rule as a configuration change, because a line that stops carrying a quantity has changed identity for a reader who was tracking it.

---

## 11. What it is for, in one sentence

The surface carries a sentence saying what it is for. For a participant reader it carries this one.

> **This is a picture of the shape of the conversation you are in, who held the floor, who followed whom, and, where the material carries timings, how fast anyone came in, and, where a backchannel lexicon exists for this community, who came in over whom; its subject is the exchange, your own line is marked, and everyone reading it is looking at the same picture.**

### 11.1 Four things about it are deliberate

**It names the measures in the words a person would use** rather than in the words the design uses, so a reader knows what the picture is of before they read it.

**It names its subject**, which is the claims boundary, and it names it as information rather than as an assurance, because an assurance invites the question it is answering. For an observer that clause names a set of people the reader is outside. For a participant it names a set the reader is inside, and the clause does more work for that reason: a reader who is in the exchange is exactly the reader for whom the question *what is this a picture of* has a wrong answer available.

**It names the index.** *Your own line is marked* is the surface sentence carrying section 5.3's need, and it is on the face of the output rather than in a preference.

**It names the symmetry**, and this clause is the one that is new with this paper. *Everyone reading it is looking at the same picture* is the surface's statement of section 6.3, in the reader's own language, and it is the thing a participant most needs to know about a shared surface that a footnote could not deliver.

And it is **one sentence, carried on the surface itself, in the same type as everything else**: not in a modal, not behind an icon, not in a footer.

### 11.2 Three tests apply to it

**The tone test, which is easy to run.** If the sentence reads as reassurance, it is wrong. If a reader would be irritated to be told it twice, it is the right length and in the wrong place, and it moves rather than shrinks.

**The configuration test.** Every quantity the sentence names is a quantity the surface computes in the configuration the reader is looking at. That is why the sentence is a stem with two conditional clauses rather than a fixed string: latency needs timings and the overlap clause needs a lexicon, and a sentence naming either unconditionally would describe a product other than the one in front of the reader.

**The checkability test, which is new here and which the symmetry clause earns.** *Everyone reading it is looking at the same picture* is a claim a reader can check, by turning to the person beside them. A claim on the face of a surface that the reader can verify is worth more than a claim they have to take, and the clause is written in the form that makes checking possible: it says the pictures are the same, which is falsified by one difference.

That test is worth generalising, because it is the best available answer to a problem this series keeps meeting. A surface that makes claims about itself is asking to be believed. A surface whose claims are checkable by the reader is asking to be checked. **Where a claims sentence can be written in the checkable form, it is written in that form.**

### 11.3 Two operational notes

The sentence is translated rather than transliterated, because the mark is a sentence in the reader's language rather than a fixed string.

On a live capture it gains a clause, and only there: the staves run with a delay, they blank and say so when they fall behind a declared horizon, and they describe themselves as a running score rendered against the dialogue. On material known in advance that clause is absent because the surface is synchronous.

---

## 12. The audio path, the declared bounds, and the stop

This surface emits audio, and for a reader who takes the sound rather than the image the audio path is the whole of what they read. The specification here is short and it is a specification rather than a concession.

### 12.1 The bounds are declared because the audio is generated

Because the audio is generated from parameters rather than selected from recordings, its acoustic properties can be **declared and guaranteed** rather than checked after the fact: a ceiling on level, a bound on the rate of dynamic change, a stated frequency ceiling, a predictable form, and the stop specified below.

**This is the one genuinely technical contribution available in the domain: a generator can prove its own bounds, and the proof is what the declaration rests on.**

The prevalence figures that make declaring the bounds worth the engineering, rather than leaving them implicit, are hyperacusis at 41.4 per cent currently and 60.6 per cent over a lifetime in a sample of 13,093, with half to seventy per cent reporting decreased sound tolerance at some point, and hyperacusis and misophonia calling for different mitigations. Those figures come from the author's own analysis of the application domain, whose citations sit outside the citation pass covering the rest of the series and are recorded here as unverified.

**The design consequence is about declaring rather than about limiting.** A user who can state the bounds of what a tool will play can decide whether to use it, which is true of a studio monitoring chain and is true here, and the bounds are parameters the user sets. The reason to record this in a paper rather than nowhere is scheduling: the audio path is built once, and an audio path built with its bounds declared is an audio path built once.

### 12.2 The stop

**The stop is instantaneous and costs nothing**, meaning no re-ingest, no re-render and no loss of position.

Of the seven positions this paper and its companion take, that one costs the reader's question nothing at all and buys the reader the one control whose presence makes the audio path usable for the reader it is for.

### 12.3 What the stop means for a reader inside the exchange

For an observer the stop is simple: the material waits, and the reader resumes where they left off.

For a participant the exchange proceeds at its own rate, so the stop has a second half. **The audio stops instantly and at no cost, and the display on resuming gives the reader the exchange as it now stands, with a seam marking the interval they did not read.**

The seam is the same instrument again. Section 6.4 gives it to a configuration change, section 10.6 to a blank arriving mid-session, and here to a reader's own absence. In each case the object is the same: a reader who was tracking a line is told where the line's meaning changed, rather than finding a line that is continuous in appearance and discontinuous in fact.

**The stop extends from the audio path to the whole display**, for the reason above and for one more. A reader who can stop the sound but not the picture has half a control, and the half they have is the half that is easy. The costless guarantee is a property of generated material and it holds for both renderers.

### 12.4 The stop, the symmetry rule, and the general test

A reader might object here that the stop breaks the symmetry rule: if reader A stops and reader B does not, their screens differ.

**The rule constrains the content the surface renders, and it leaves attention to the reader.** A stop is an act of a reader on their own attention, of the same kind as looking away, and the design consequence of *concurrent* is that a reader in this position needs that act to cost nothing. What the surface offers each reader is unchanged by it.

The distinction can be made exact, and doing so gives a test that decides the general case.

**The convergence test.** *After the act ends, does the reader's surface agree with every other reader's?* A stop converges: the reader resumes and holds the same picture as everyone else, with a seam over the interval. A per-reader configuration diverges: two readers who configured differently hold different pictures for as long as they hold their configurations, and the question *what actually happened between us* acquires two answers.

So a stop is admissible and a per-reader configuration is a design that changes, and the test says which is which without appeal to anybody's judgement. It is the operational form of the symmetry rule, and it is what an implementer should be handed.

---

## 13. Designing the two instruments with the people the surface is for

A tool for this readership designed without that readership will be judged on that alone, and rightly.

### 13.1 The finding this rests on, and the conclusion its own authors drew

Kenny's survey of 3,470 people found **61 per cent of autistic adults preferring identity-first terms**, with professionals the outlier group, and **the authors' own conclusion was to ask rather than to mandate**.

Both halves of that matter here. The majority finding is why this paper uses identity-first language. The conclusion the authors drew is why the finding is a reason to ask rather than a rule to apply, and a product with a user in front of it can ask. Those are two different obligations and a paper that carried only the first would be citing the survey against its own authors.

### 13.2 The two instruments this paper writes

**This paper writes two instruments, and both are designed with autistic co-researchers from the start.**

The first is the **listening study** of section 16 item 2. It asks what a rendering of an exchange is taken to be about, it compares listeners told the exchange is theirs against listeners told it is not, and its result is fixed before the study runs. A study whose questions were written without the people it recruits is a study measuring the questions.

The second is the **set of sentences this surface carries**: the setting sentence of section 9.4, the seam wording of section 9.5, the blank wording of section 10.5, and the surface sentence of section 11. Each of them is an instrument in the same sense, because each is a piece of text whose job is to produce a reading in a reader, and each fails in the same way if the wrong people wrote it.

**Co-design starts before the instruments are drafted rather than after**, and the standing of both depends on it. It is item 7 of section 16, and it is scheduled ahead of the study it serves.

### 13.3 What that changes about this paper specifically

Three of this paper's own decisions are the kind that co-design revises, and naming them is more useful than a general commitment.

**The wording of the symmetry clause** in section 11. *Everyone reading it is looking at the same picture* is this paper's best attempt at a checkable claim in plain language, and whether it reads as a claim or as a reassurance is exactly the kind of thing the writer of a sentence is worst placed to judge.

**The form of the seam** in sections 9.5 and 12.3. A seam is a mark that interrupts a reading in order to preserve it, and the trade between interrupting and preserving is a reader's trade rather than a designer's.

**The default the surface opens on** in section 6.6. The participant's own star is derivable from position, which makes it admissible; whether it is what a reader wants brought forward first is a separate question and it is answerable by asking.

### 13.4 The register the study pack is written in

The purpose of the listening study is to find out what the mapping communicates. A mapping read as a verdict is a defective mapping, and the defect is in the mapping's codomain choices. **No result of that study is ever a finding about a listener**, and the pack says so in the same plain register this programme's existing therapist pack uses, which states the system's open questions before asking its participants anything and invites the answer that the whole idea is misconceived.

---

## 14. The surface in summary

Seven positions, each stated so that a later reader can attack it rather than rediscover it. Two of them are rules about the design and five are what the rules produce.

| The position | What it costs the reader's question, and what it buys it | Section |
|:---|:---|:---|
| **The grounds rule.** A difference between the participant surface and the observer surface is admissible where it follows from the reader's position in the exchange. A difference resting on a property attributed to the reader is a design that changes. The test is mechanical: write the defending sentence, address it to the reader, and read it back | Costs a designer the freedom to make a judgement call about a reader, which is the freedom worth costing. Buys the question a surface whose every per-reader difference can be justified to the reader in a sentence they would recognise as true of their situation | 6.1 |
| **The symmetry rule, derived from the grounds rule rather than asserted beside it.** One surface, one configuration, one content, and the single per-reader parameter is the own-stave index. Two participants differ in position by which persona each is, so the index is the only admissible per-reader function and every richer one is a restriction needing a ground of the excluded kind | Costs the question the ability to tailor a surface to a reader, which some readers would want. Buys it the property that makes the surface's claim true: *what actually happened between us* has one answer on the page rather than one per reader | 6.3 |
| **The control stays cheap and the seam belongs to the reader.** A selection is reversible without re-ingest, and a change to a stave's declared quantity set draws a seam on every reader's surface at the turn it takes effect, naming what arrived, what it replaced, who made the change, and what the change does to the numbers in front of them | Costs the question a mark on the page at each change, and costs the configurer a confirmation of an act they performed. Buys it the close of the problem MPN-S5 stated and deferred, by routing the configuration screen's own sentence to every reader at the moment it becomes load-bearing | 6.4, 9.5 |
| **The participant additions are an index, a declaration line and a seam, and none of them is a rendered quantity.** So the two-persona stave still carries floor share and latency, which is two quantities inside a budget of two to three, fitting exactly with nothing displaced. The surface scales with the cast and not with the readership | Costs the question nothing, which is a result rather than an omission. Buys it a participant surface at the observer surface's per-stave cost, which is what makes the symmetry rule buildable rather than merely principled | 7 |
| **The participant's own star is the default and the full pair set is one act away.** A participant is in N-1 pairs against the observer's N(N-1)/2, a reduction of exactly N/2, which is 7x at fourteen personas and lossless at two, where the star is the whole relation graph. The moderated collapse and the participant reduction are one construction seen from two sides | Costs the question an ordering chosen by position rather than by importance, which is a real limitation and is why the pair set stays available. Buys it the only reduction of the relation anybody has found that needs no selection aid, no heuristic and no ranking | 6.6, 8 |
| **The surface sentence carries the index and the symmetry**, in one sentence, on the surface, in the same type, phrased as information, as a stem with two conditional clauses. Its symmetry clause is checkable by the reader, and where a claims sentence can be written in the checkable form it is written that way | Costs the question a longer sentence than the observer's. Buys it a claim the reader can verify by turning to the person beside them, rather than one they have to take | 11 |
| **The stop is instantaneous and costs nothing, and it extends from the audio path to the whole display**, returning the reader to the exchange as it now stands with a seam over the interval. The convergence test separates a stop from a per-reader configuration: after the act ends, a stop agrees with every other reader's surface and a configuration does not | Costs the question nothing. Buys the reader the one control whose presence makes the audio path usable, and buys an implementer a test that decides the general case without appeal to judgement | 12 |

---

## 15. Open questions

These are the conditions under which this design, or a part of it, would change. They are named here so that the programme meets them rather than discovers them, in the order in which each becomes answerable.

### 15.1 The framing may move the reading

The symmetry rule says every reader is looking at the same picture. Whether a rendering is read the same way by a person who was in the exchange as by a person who was not is a question about listeners, and the listening study of section 16 item 2 compares listeners told the exchange is theirs against listeners told it is not. **If the framing moves the reading, the surface sentence of section 11 is doing less work than it is written to do and is rewritten on the result**, and the available responses are to respecify the mapping's codomain choices and retest, or to render the exchange visually.

The material under study stays synthetic, so the condition is supplied by the framing given to the listener rather than by the material.

### 15.2 Two quantities may carry less than a reader recognises

At two personas each stave carries floor share and latency and the fit is exact. **Whether two quantities carry something a reader recognises is a different question from whether two quantities fit**, and section 7.3 answers only the second.

This is the cheapest thing on the list and it is answerable on paper and on generated two-handers today, ahead of the listener panel and ahead of the interaction mapping. It decides whether this surface is a small instrument, in which case it should be described as one, or a larger one. It is item 4 of section 16 and it should be answered before the surface is scheduled.

### 15.3 The seam may cost more attention than it saves

A seam interrupts a reading in order to preserve it. On a participant surface a reader's attention is time-shared with the exchange, so every mark is charged against the thing the surface exists to save.

**How often a seam fires in practice is a measurable quantity, and measuring it is item 9 of section 16.** Three things fire one under this design: a configuration change, a blank arriving mid-session, and a reader's own stop. The first is under the configurer's control, the second under the material's, and the third under the reader's. The question is whether their combined rate on real sessions leaves the surface readable, and it is answerable once the mapping exists and a session can be run.

### 15.4 The reduction may be the wrong reduction

The participant's own star is derivable from position, which is what makes it admissible. **Admissible and wanted are different properties.** A reader might open the surface wanting the pair that mattered rather than the pairs they are in, and the star gives them the second.

The surface keeps the full pair set one act away for exactly this reason, and section 13.3 names the default as one of the three things co-design revises. What would settle it is asking, which is item 7.

### 15.5 The visual half of every condition here waits on its own test

Section 15.1's study asks listeners. The graph has readers rather than listeners, and an instrument that asks a reader of a graph what they take it to be about is item 14 of section 16.

**That matters most where the graph is the fallback.** Every position in this paper that routes a quantity off the stave routes it to the graph or the readout, and a renderer carrying that load is a renderer worth specifying and testing. Specifying it is item 10 and specifying an inference test for it is item 14.

### 15.6 The lexicon question may be larger than a programme this size

If a backchannel lexicon can be established for one language and one speech community to the standard any other measured quantity is held to, the overlap family joins the surface and section 15.2 gets easier, because each stave then has four candidate quantities rather than two.

If it turns out to be beyond what this programme can reach, then the overlap family waits longer, section 15.2 bites at full strength, and this surface is a floor-share and latency instrument. **That is a reason to attempt the lexicon early rather than a reason to lower the standard for it**, because the answer changes what the surface is. It is item 3.

### 15.7 The default pair above two personas is open

At two personas the arithmetic settles the pair at floor share and latency. Above two, four measures compete for two or three places with the overlap family awaiting its lexicon and six compete once it arrives, and nothing in this programme yet says which two a reader can hold.

**Section 8's reduction changes the shape of that question without answering it.** A reader whose default is their own star is reading N-1 relations rather than N(N-1)/2, so the question *which two quantities* is being asked about a smaller and more structured set than it was. Deriving the pair is item 11.

### 15.8 The convergence test has been checked against two cases

Section 12.4 states the convergence test and applies it to a stop and to a per-reader configuration. Those are the two cases this paper needed.

**A test worth handing to an implementer is a test checked against the cases the implementer will meet**, and this one has been checked against two. Enumerating the per-reader acts a participant surface admits, and running each against the test, is item 18.

---

## 16. Open work

Nineteen items, each written as the thing to do rather than the thing to have. Most of them wait on nobody outside this programme and several could be finished this week; the dependency is noted where it exists.

1. **Specify the interaction mapping and validate it against the generator's ground truth.** A function, an acceptance criterion, a stated codomain, a channel count, a jump set and a discretisation. Everything musical on this surface follows it, and three of the four surfaces consume it. The synthetic scope is what makes it testable, because a generator that decides a dialogue's relational structure in advance is a ground truth to validate against, and *does the mapping recover the structure the generator put in* becomes answerable. Setting the accuracy target is then ordinary work.

2. **Run the listening study.** Its four parts: the open-inference object test, which asks a listener what they take a rendering to be about and takes an open answer rather than a forced choice; the framing comparison of section 15.1, between listeners told the exchange is theirs and listeners told it is not; the sampling requirement of item 16; and the required result, fixed before the study runs. It also asks whether the musical channel can render a below-floor difference as **unmeasured**, audibly distinct from an even exchange. It waits on item 1 for a stimulus.

3. **Establish a backchannel lexicon for one deployed language and speech community**, to the standard any measured quantity is held to. This is authorial and community work rather than engineering, it is independent of item 1, it releases the overlap family, and it decides section 15.6.

4. **Answer the two-persona informativeness question of section 15.2**, on paper and on generated two-handers. It decides whether the surface is worth scheduling and it is the cheapest item here.

5. **Extend the listener conditions to cover a named per-person comparison**, which the design permits on a stave. This is a study to run rather than a choice to make, and it removes the labelled untested permission the comparison currently carries.

6. **Specify the acoustic bounds of section 12.1 with the audio path** rather than after it: the level ceiling, the bound on rate of dynamic change, the frequency ceiling, the form guarantee and the stop.

7. **Design the two instruments of section 13.2 with autistic co-researchers, starting before they are drafted.** The listening pack of item 2, and the four sentences this surface carries: the setting sentence, the seam wording, the blank wording and the surface sentence. The standing of both instruments depends on it, and section 13.3 names three of this paper's own decisions as the ones to put first.

8. **Fix the numeric parameters this surface consumes**: the parse-confidence threshold, the resolution floor per ingest class, the Layer 1 defaults, the trigger at which a below-floor difference renders as unmeasured, the staleness horizon for live capture, and the damping constant governing the redraw rate of a running stave. The parse-confidence threshold and the damping constant bind on the primary material; the rest bind when this surface meets real audio.

9. **Specify the seam**: its visual and audible form, how long it persists on the page, and what it costs a reader in attention. Three things fire one and section 15.3 gives the measurement. It waits on item 1 for a session to measure.

10. **Specify the graph renderer for this surface**: layout, legibility budget, declared quantity set and coverage statement. Every position in this paper that routes a quantity off a stave routes it here, and section 15.5 makes it the fallback for a failed listening study.

11. **Derive the declared default quantity pair above two personas.** At two personas the arithmetic of section 7.3 settles it at floor share and latency. Above two, four measures compete for two or three places and the reduction of section 8 changes the shape of the question without answering it.

12. **Record whether a score has a moderator**, as a declared structural property rather than something a reader discovers. It collapses the pair count from quadratic to linear, and section 8.4 shows it is the same construction as the participant's own star with a distinguished persona.

13. **Measure how this audience divides between the sound and the image.** The argument for the strictness of the required result in item 2 is a claim about the reader who takes the sound alone, and its weight depends on how many readers are in that configuration. The comparative study that puts both renderers in front of readers on the same material could answer it.

14. **Specify an inference test for the visual renderer**, analogous to the listener conditions on the musical one: put the graph in front of readers and ask what they take it to be about rather than whether it was useful. It depends on item 10.

15. **Settle whether the overlap threshold and the latency turn-boundary rule inherit the speech-community variation the design records for gap length and overlap tolerance**, and what a surface declares about them. This decides whether item 3 releases one measure family or three, and latency is the measure a two-persona stave depends on.

16. **State the sampling frame for item 2**: which listeners the study recruits, on what ground, and what a positive result and a null result each license about the audience this surface defines by preference. The existing evidence points in more than one direction, so the study is run on this surface's own listeners rather than inherited: physiological responsiveness to music has been found intact with verbal report of the response reduced and the gap mediated by alexithymia, alexithymia has been reported at 49.93 per cent against 4.89 per cent and described as common rather than universal, and alexithymia has separately been found to degrade the perception of emotion in music. It waits on item 2, which waits on item 1.

17. **Specify the own-stave index and the declaration line as rendered objects**: what the mark is on a notated stave, what it is on the graph, what it is in the numeric readout, and what the declaration line says when several readers have configured different staves over a session. Section 7.6 establishes that all of it costs zero against the per-stave budget, which is the constraint the specification has to stay inside.

18. **Enumerate the per-reader acts a participant surface admits and run each against the convergence test.** The test is stated at section 12.4 and checked against two cases. The acts known today are the stop, the choice of which pair to bring forward, and the configuration change.

19. **Re-derive every derived Layer 1 count against six measures and six settings.** Counts of the form *four of the five are timing quantities* or *three of the five are constant at two speakers* occur at many sites across this programme's documents, and each is re-derived rather than incremented, because a global substitution of six for five would produce exactly the class of count error this programme keeps finding.

---

## 17. References

**On the paths in these entries.** An entry that gives a path in backticks names an artefact in the MPN working corpus rather than a page on this site. That corpus is not published, so such a path does not resolve from here. The citations are kept as they stand because each names a real artefact and each entry says what the artefact is and what it establishes, which lets a reader see what a claim rests on and ask for the artefact by name.

The rest of the series is published in this working group: [MPN-S1](/papers/mpn-s1-psychometric-calculus-theory), the theory; [MPN-S2](/papers/mpn-s2-formal-apparatus), the formal apparatus; [MPN-S3](/papers/mpn-s3-mapping-state-to-musical-material), the mapping; [MPN-S5](/papers/mpn-s5-dialogue-use-cases), the dialogue use cases; and [MPN-S6](/papers/mpn-s6-expression-aid), the Expression surface, which is this paper's companion.

[1] J. McKenney, "The McKenney-Lacan psychometric calculus," MPN-S1, `S1-mckenney-lacan-theory.md`. Source of the legibility assertion and of the two-to-three independent quantities per stave, which it states as an estimate rather than a measured figure. As amended on 15 September 2026 the assertion carries no between-stave escape, so nothing on a stave is exempt from the budget and a measured channel budget differing from two to three falsifies it directly.

[2] J. McKenney, "The formal apparatus," MPN-S2, `S2-mathematics.md`. Cited for the formal setting the two mappings are stated in.

[3] J. McKenney, "The mapping," MPN-S3, `S3-mapping-phi-rev10.md`. Cited for the state mapping's domain, which is the nine-component state a human being has rated, and for its record that the listener question on the bias layer's devices is still to be put.

[4] J. McKenney, "The application," MPN-S4, `S4-application.md`. An internal implementation audit of the reference implementation, held in the programme's working corpus and available from the author. Cited here for the provenance of the 31,078 scored rows, for the parse result on the file this paper's computations exclude, and for the keyword-counter precedent that section 10.3 turns on: a keyword counter read as a measurement through three revisions of a paper.

[5] J. McKenney, "Dialogue, and four things a producer or a researcher could do with it," MPN-S5, `S5-dialogue-use-cases.md`. The source of the deferral this paper resolves, at its section 5.4, quoted in full at section 4.1 above. Also cited for the live surface's default quantity set, for the reversibility of a selection without re-ingest, for the pair count against cast size and the moderated collapse, and for the append-only timbre result.

[6] J. McKenney, "The Expression surface: rendering the shape of a conversation as sound and image," MPN-S6, `S6-expression-aid-rev1.md`. This paper's companion. Cited at the seven places the two papers touch: the condescension test; numbers going to the person who asked for them on the same ground for every user of every surface; the vocabulary of the surface; the surface sentence; the four kinds of blank; the instantaneous and costless stop; and co-design with autistic co-researchers on Kenny's finding. MPN-S6 specifies the surface for a reader watching an exchange and this paper develops it for a reader inside one.

[7] MPN-DESIGN-01, `DESIGN-UNIFIED-FRAMEWORK-rev8.md`, the unified design. Section 3 for the two mappings and the mark as a sentence; 4.1 for parse confidence, the ingest classes and the unmeasured rendering; 4.2 for the Layer 1 measures, their settings, the backchannel lexicon and the speech-community record; 6.2 for the reference score, the known-in-advance partition, the causal-window rule and the legibility rules; 6.4 for this surface; **7.4 for participant mode**, which this paper inherits whole; 7.6 for the sequencing of live capture; 8a for the four kinds of blank and the staleness horizon; 9 for the numbered decisions, including D18, D55, D68 and rejection R3, and D53 on the per-stave declaration, D36 on reversibility, D42 on the scope of the listener conditions and D70 as clarified.

[8] `DECISION-LOG-2026-09-15.md`, 15 September 2026. Five decisions of the author's. **Decision E is the source of this paper's section 7**: Expression is an N-persona surface with one interaction stave per persona, and at two personas each stave carries floor share and latency, two quantities inside a budget of two to three, fitting exactly. Decision B permits a named per-person comparison on a stave and establishes that a score carries several personas, added and removed as the material requires. Decisions C and D name backchannel a sixth Layer 1 measure and make it lexical on class A and timing-derived on classes B and C, which takes Layer 1 to six measures and six settings and opens the recount of item 19.

[9] `MPN-NOTE-06-persona-scaling.md`, 15 September 2026, with `05_DATA/03_generators/s9_persona_scaling.py`. Computes what an N-persona score costs: the per-stave oversubscription against N, rising from 2.7x at two personas to 3.7x at fourteen and then flattening; the quadratic pair count; and the append-only timbre curve, at most 13.4 per cent of separation across the range two to fourteen and nothing at all at two, five, six and fourteen. Those figures are carried from that note rather than recomputed here.

[10] `05_DATA/03_generators/s6_floor_share_units.py`, **run for this paper on 16 September 2026** and the source of section 9.2's table. It resolves its own corpus, applies the design's parse-confidence rule to every file and runs on the six that meet it, drops the non-dialogue token, prints the three anthologies below the line and labelled, and asserts three of its own results so that a change of corpus fails the script rather than the paper. It prints, in its own output, what it establishes and how far the establishment reaches.

[11] `05_DATA/03_generators/s6_three_clef.py`, **run for this paper on 16 September 2026**. Resolves its corpus, asserts 31,078 rows read, 3,425 excluded and 27,653 retained, and reproduces the coverage, event-density and dyad-churn tables. Its information-budget section, cited at section 7.2, counts eighteen rendered quantities against a budget of six to nine across three staves and is independent of the corpus.

[12] `s8_pair_and_star.py`, **new with this paper and run on 16 September 2026**, the source of section 9.3's renormalised pair table and section 8.2's star table. It reads the same score files under the same exclusions, renormalises the leading pair to itself under both computable units, and checks the star arithmetic by enumeration at every cast size printed. No randomness and no network.

[13] `05_DATA/03_generators/VERIFICATION-2026-09-14.txt`. The programme's verification record, cited at section 9.2 for the coverage figures of 69.2, 50.1 and 39.0 per cent, which count rows and retain the non-dialogue token and are therefore a different computation from this paper's coverage column.

[14] `THERAPY-AUTISM-ANALYSIS.md`, the author's own analysis of the application domain. Cited for four things and no others: the hyperacusis prevalence figures at 41.4 and 60.6 per cent in a sample of 13,093 with half to seventy per cent reporting decreased sound tolerance, and the different mitigations hyperacusis and misophonia call for; the centrality of control in autistic adults' own accounts; the three alexithymia findings collected at item 16; and Kenny's survey of 3,470 people at 61 per cent identity-first, with professionals the outlier group and the authors' own conclusion being to ask rather than to mandate. **Its citations sit outside the citation pass covering the rest of the series and are recorded here as unverified.** Any of them that carries weight in a later version should be verified first.

[15] `ASSERTIONS-REGISTER.md` for the legibility assertion's claim, formal content, constraint and falsification clause as amended on 15 September 2026; `CITATION-STATUS-ALL.md` for the citation pass covering the series and for the boundary rule separating a series document from a verified source.

[16] `06_APPLICATIONS/06_listening_test/THERAPIST-SECTION.md`. This programme's precedent for the register a study pack addresses its participants in: the system's open questions are stated before any question is asked of a participant, and the pack invites the answer that the whole idea is misconceived. The pack of item 2 is written in that register.

[17] "The instrument," MPN-PRD-01, `PRD-MPN-THERAPY.md`. A separate surface with its own conditions, cited here only to say that this paper settles nothing about it, and for the evidence it carries on the major and minor mode association, which is why the affective reading of a musical rendering is treated in this programme as a measured hazard rather than a theoretical one.

[18] `DECISION-LOG-2026-09-14.md`, 14 September 2026. Records that the bias layer occupies no musical channel and carries its output as marked text beside the Layer 0 turn that prompted it, with a reopening condition rather than a permanence clause. Cited at section 2.1 for what a Layer 3 output is.

[19] `ARBITRATION-S5-S6.md`, 14 to 15 September 2026. The internal review record covering this paper's two companions: seventy-one reviewer findings across the two, deduplicated to fifty-seven determinations. Cited for the candidate default quantity pair it put forward and left open, which Decision E settled at two personas and which item 11 carries above two.
