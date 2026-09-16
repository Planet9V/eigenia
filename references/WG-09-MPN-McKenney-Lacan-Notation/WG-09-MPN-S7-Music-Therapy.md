# The Therapist Rates, the Instrument Renders: A Music Therapy Surface for the McKenney-Lacan Calculus

**J. McKenney**

Paper 7 of the Musical Psychometric Notation series. MPN-S1 states the theory, MPN-S2 the formal apparatus, MPN-S3 the mapping from psychological state to musical material and MPN-S4 the reference implementation; MPN-S5 puts the engine to four dialogue use cases and MPN-S6 to the expression surface. This paper is the music therapy surface, and it is written to stand alone: a therapist can read it without having read the other six.

Licence: CC BY 4.0. 16 September 2026.

## Executive Abstract

A music therapist finishes a session and writes it up. The writing up is where the session goes to be forgotten. What happened in the room was musical, and what leaves the room is prose, and every therapist who has done this knows the gap between the two.

This paper specifies an instrument that closes part of that gap by running it the other way. The therapist rates the moment in the vocabulary they already use, two of Bruscia's Improvisation Assessment Profiles plus three plain gradients, and the instrument renders that rating as music: notation to read and play, audio to hear, MIDI to take into the digital audio workstation the therapist already has, a session record in the field's own reporting format, and a plain-language chain from the five ratings to every note in the output. The rating is the therapist's professional judgement and it is the whole of the input. The instrument is the rendering.

The rendering path runs through a stated theory. The McKenney-Lacan calculus names a psychological state and a transformation from that state to musical parameters, parameter by parameter, written down before any code and audited across four papers. The therapist's Autonomy rating carries the register triple, the Variability rating the theory's disorder term, and the session intensity rating its weight term; tempo, metre, dynamics, mode, texture and harmony follow from those by named functions. Because the functions are separate and explicit, a therapist who hears something surprising can ask why it happened and be answered with a chain of rules rather than a shrug.

The paper's own contribution is to close four conditions that the framework's design document attached to the Autonomy mapping and left standing. **The five register triples are fixed as numbers.** Dependent, Follower, Partner, Leader and Resister are placed on the register simplex under a construction with one rule, that a gradient named for a register places that register more than an interpolation margin ahead of the other two, and Partner sits exactly at the barycentre. **The collapse check is run.** Enumerating the five triples against the live pitch table finds that the audio path renders five distinct modal outputs and the notated score renders four, with Partner and Resister sharing a printed scale; that the sharing is a property of the pitch table and the barycentre rather than of the numbers chosen, holding across all 825 swept placements that satisfy the construction's one rule, and across every Real-led state on a 20,301-point grid; and that the whole result is the same at every interpolation margin the mapping has under consideration, changing first at 0.276 and the candidate margins running from 0.02 to 0.20. **The rounding convention is declared.** The notation path rounds half to even, which is the convention that keeps the Follower gradient a printed scale of its own, and the score says so on its face. **The divergence between the printed score and the sounded audio is printed.** It is a quarter tone at Follower, one third of a semitone at Partner, and exactly nothing at Dependent, Leader and Resister, so a therapist reading a score while hearing it knows where the two agree and where they part.

Two further results come out of the same arithmetic. The map from a five-way rating to a state value is fixed on a stated criterion, that no rating level lands on a boundary of any rendering channel, so the same rating always renders the same way; and the criterion forces the map to be asymmetric about the midpoint, because the midpoint of the unit interval is a boundary of both the dynamics ladder and the metre lookup. And the two-voice case, a client voice and a therapist voice, reaches the full diameter of the timbre channel exactly and with no search, which is the one cast size where the best assignment is trivial.

Version one ships two of Bruscia's six profiles, Autonomy and Variability, which is the pair Wigram used in practice. That is a choice about what a therapist's instrument is for. Six profiles rated every session is a checklist; two profiles rated every session is a judgement.

Every figure above is a property of the maps this series states, computed by one script that asserts fifty-five invariants about its own results and exits non-zero if any of them fails.

## Abstract

This paper specifies a music therapy instrument built on the McKenney-Lacan psychometric calculus, in which a therapist's own rating is the state and the framework's business is rendering. It gives the therapist-facing rating surface in the vocabulary of Bruscia's Improvisation Assessment Profiles, the mapping from that surface into the calculus, the six musical parameters the calculus produces, and a worked session traced from five ratings to notation, audio, MIDI and a session record in the Reporting Guidelines for Music-based Interventions format. It then closes the four conditions that MPN-DESIGN-01 section 11 attached to the mapping from the Autonomy gradient onto the register simplex: the five register triples are fixed numerically under a stated lead rule; the collapse check is enumerated, giving five distinct modal outputs on the audio path and four on the notation path, with the Partner and Resister meeting shown to be a property of the live pitch table and the barycentre across 825 admissible placements and 6,080 Real-led grid states per band; the rounding convention is declared as half to even on the ground that it is the only convention under which all of Dependent, Follower and Leader keep a printed scale of their own; and the divergence between the notated and the sounded pitch is printed at 50 cents for Follower, 33.33 cents for Partner and zero for the other three. The paper also fixes the map from a five-way rating to a state value by maximising the clearance of every rating level from every channel boundary, and reports that no map symmetric about the midpoint clears every boundary. It closes with what the field's existing instruments supply, what the published evidence establishes and at what size, and the studies that carry the claims made here.

---

## 1. Introduction

### 1.1 What this paper is, and who it is for

The reader this paper is written for has a caseload. They improvise with clients, they write session notes afterwards, and they have read Bruscia. They have a digital audio workstation and they already record. They do not need a theory of music and emotion; they have one, and it is better than most published ones because it was built out of sessions.

What they may not have is a way of getting from the judgement they make in the room to a piece of musical material they can play, hand over, keep and compare. That is what this paper specifies.

The instrument takes five ratings and renders music. Two of the five are Improvisation Assessment Profile gradients, rated the way the therapist already rates them. The other three are plain and short. The rendering is deterministic, so the same five ratings produce the same music every time, which is what makes a session record a record rather than an anecdote. Behind the rendering sits a stated calculus, published across this series, and the therapist can read as much or as little of it as they want; the surface is designed so that none of it has to be read to use the instrument.

This is a theory paper, offered for review and improvement, and the most useful thing a therapist can do with it is say where it is wrong about the room.

### 1.2 The sentence the rest of the paper elaborates

**The therapist's five gradients are the state.** That sentence is from the framework's product requirements document [8] and it is the design decision everything else follows from.

An earlier design proposed something different and more ambitious: deriving the Autonomy gradient from the structure of turn-taking, so that the machine would work out for itself whether a client was leading or resisting from the timing of who played when. That proposal was withdrawn at a review gate on a proof [7]. Leader and Resister are not separable by any monotone function of timings: a client who sets the structure the therapist follows and a client who refuses the shared structure can produce identical turn statistics, and no amount of better timing analysis separates them, because the information that separates them is not in the timings.

The withdrawal is what makes the instrument possible. The moment the machine stops trying to infer the stance, the therapist's rating is the only thing that can carry it, and the therapist's rating is the thing that was always going to be better. A therapist watching a client refuse the shared frame knows what they are watching. The instrument's job is to turn that knowledge into sound, reliably, inside the ten-second budget the design sets for setting a state, every time [8].

So: **the therapist assesses. The instrument renders.** The distinction between those two acts is the design, and it runs through every section below.

### 1.3 What a therapist can do with this on Monday

Concretely, and in the order it would happen.

**Rate a moment.** Five taps. Relational stance on Bruscia's Autonomy gradient; musical variability on Bruscia's Variability gradient; arousal, valence and session intensity on plain five-point scales with written anchors. Defaults carry forward from the previous moment, so a moment that has changed in one respect costs one tap.

**Get music back.** Notation on a stave, playable. Audio, rendered locally. MIDI, for the workstation the therapist already works in.

**Ask why.** Every rendered passage carries a chain in plain words from the five ratings to the musical material, naming each rule that fired and the value it read. The chain is written in the therapist's vocabulary rather than the theory's.

**Compare.** Change the relational stance and nothing else, and hear what changes. Section 10.5 prints that comparison for all five Autonomy gradients on one session, which is the single most useful thing the instrument does, because it is a direct answer to the question a therapist asks about an assessment instrument: what does this distinction actually sound like?

**Keep the record.** The session record comes out in the Reporting Guidelines for Music-based Interventions checklist, eight components across twelve items [14], with the automatically captured fields already filled. The record carries the rendered audio itself, not only the settings that produced it.

### 1.4 Two profiles, and why two

Bruscia's Improvisation Assessment Profiles number six: Integration, Variability, Tension, Congruence, Salience and Autonomy, each rated on five discrete gradients and applied to musical parameters including rhythm, tempo, volume and timbre [11]. Version one of this instrument ships two of them, Autonomy and Variability.

The choice is Wigram's. Wigram, who did more than anyone to make music therapy assessment rigorous, applied Bruscia's profiles selectively and used two in practice: Autonomy, for the readiness of a client to interact with others and their turn-taking, sharing and behaviour as a musical partner, and Variability, for creativity and the rigidity or flexibility of a client's playing [13].

There is a design argument for following him that is worth stating separately from the appeal to authority. An instrument that asks for all six profiles every session has told the therapist what it is: a form with a machine behind it, and the therapist's job is to complete the form. An instrument that asks for two has told them something else: that their judgement is expensive, that the instrument knows it, and that it is spending as little of it as it can. Therapist attention in session is the binding constraint on this whole design [8], and the two-profile surface is the first place that shows.

The three ratings that are not profiles, arousal, valence and session intensity, are short because they are not assessments. Arousal and valence are the two dimensions of the circumplex the affective-computing literature already uses [15], so they will be recognised by a therapist and by a reader of that literature. Session intensity asks where this moment sits in the arc the therapist is shaping, which is a question about the session rather than about the client.

### 1.5 How every number in this paper is produced

One script, `05_DATA/03_generators/s7_therapy_conditions.py`, computes every figure below that is not quoted from a named source [9]. It restates the mode machinery of `s7_blocking_numbers.py` so that it runs alone [10], checks that machinery against MPN-S2's closed form for the interpolation margin before using it, and then computes the four conditions, the gradient-to-state map, the worked session and the timbre check. It asserts fifty-five invariants about its own results and exits non-zero if any of them fails. Its full output is committed beside it.

The figures in this paper are properties of the maps MPN-S2 and MPN-S3 state, computed exactly. What a listener hears is the subject of the studies in section 13, and those studies are what carry the claims this paper makes about hearing.

### 1.6 Terms used in a particular sense here

**Gradient.** One of the five levels of an Improvisation Assessment Profile. Bruscia's usage, kept.

**Register.** One of the Real, the Symbolic and the Imaginary, the three coordinates of a triple that sums to one. The name is Lacan's; giving the three magnitudes and putting them in competition is this theory's, and MPN-S1 separates the two carefully [1].

**The triple.** A point on the register simplex, written $(r, s, i)$ with $r + s + i = 1$. The geometry is a triangle; the barycentre is its centre.

**The margin, $\delta$.** The register gap below which two modes blend rather than one winning outright. Section 6.4 says what depends on it.

**Cents.** One hundredth of a semitone. Fifty cents is a quarter tone, which is the largest gap between a printed pitch and the pitch that sounds.

**Mode.** One of the seven diatonic modes on the printed score; on the audio path, a scale whose degrees may lie between semitones. Section 8 is the whole of that difference.

## 2. The instrument

### 2.1 The shape

Five ratings in, music out, and one authoritative path between them.

```
   the therapist rates five gradients
                 |
                 v
          the accepted state
                 |
                 v
     the mapping, six named parameters
                 |
                 v
   notation   .   audio   .   MIDI   .   session record
```

An optional text analyser can read session notes and propose values, and it is off by default, one input at a time rather than as a class. A proposal reaches the state through an explicit act of acceptance or editing by the therapist; a proposal the therapist has attended to in some other way is logged as unresolved, and the carried-forward therapist value is what renders [8]. Every proposal writes one row to an agreement log carrying the proposed value, the therapist's value, the outcome and the moment, which is the paired human and machine data set the validation studies of section 13 are built on.

The instrument is fully usable with every optional input switched off, which is a requirement rather than a preference. It means the instrument's core value rests on the therapist's judgement and on the mapping, both of which are stated, and a therapist who wants nothing to do with a text analyser is a therapist with a complete instrument.

**Nothing blocks on the network.** The rendering path runs locally, so a session continues whatever a server is doing.

### 2.2 The five ratings

| Product name | What it is | Range | Source |
|:---|:---|:---|:---|
| Relational stance | The Autonomy gradient: Dependent, Follower, Partner, Leader, Resister | 5 gradients | Therapist's rating [11] |
| Musical variability | The Variability gradient, rigid through to unstable | 5 gradients | Therapist's rating [11] |
| Arousal | How activated the client presents, low to high | 5 gradients | Therapist's rating |
| Valence | How the affect presents, negative to positive | 5 gradients | Therapist's rating |
| Session intensity | Where this moment sits in the arc the therapist is shaping | 5 gradients | Therapist's rating |

Every user-visible quantity is named for what it measures, in the vocabulary of the profession that reads it [8]. Where a quantity is the therapist's own judgement it is named as a judgement. The theory's own vocabulary lives in three places, all of them addressed to a reader who has the papers: the engine internals, the published mapping table of section 3.5, and this series.

### 2.3 The anchors are the instrument

Each gradient carries a written anchor descriptor at every level, in the manner of the Improvisation Assessment Profiles and of the Nordoff-Robbins scales. **The anchors are the instrument and the numbers are a convenience.** A five-point scale with good anchors is an agreement device; the same scale with numbers alone is a mood ring.

The anchors describe the playing, in the terms a therapist would use to describe playing. What a therapist reads in the playing they have described is the therapist's, and it is what the rating carries into the instrument.

The field has a published figure for what anchored agreement looks like in practice, and it is section 12.2's.

### 2.4 What comes out

**Notation**, multi-stave, one stave per voice in the therapist's configuration, rendered so that it can be read off the screen and played.

**Audio**, played locally against sampled instruments and exportable as a file.

**MIDI**, because the workstation is where the therapist already works and is therefore the surface the instrument has to meet [16].

**A session record** in the Reporting Guidelines for Music-based Interventions format, section 2.7.

**An explanation**, section 2.6, which is the output that makes the rest arguable with.

### 2.5 Determinism, and why a record has to be one

Every rendered passage is a pure function of the state, the configuration and the seed, and the seed is in the session record. The generator that produces the material has zero unseeded draws on the score path, which MPN-S4 establishes by inspection [4].

Determinism matters here for a reason it did not matter in the proofs of concept. **If a therapist cannot reproduce what a client heard last week, the record is not a record.** A client who responds to a particular passage, and a therapist who wants to return to it, need the passage itself and not a description of it.

The seed alone gets most of the way there and not all of it. A change to the seeding algorithm changes every rendered passage in the programme, which MPN-S4 makes a condition on any stimulus set published for reuse: publish it as audio rather than as a promise that the code will regenerate it [4]. The session record therefore carries the seed, the seeding algorithm version, the ruleset version and the application build, and where a passage matters clinically it carries the rendered audio itself. A version quartet is a promise; a waveform is a record.

### 2.6 The explanation

Every rendered passage carries a plain-language chain from the therapist's inputs to the musical material, naming every rule that fired and every value it read. Section 10.4 prints the chain for the worked session in full.

The explanation is written in the vocabulary the rating surface uses rather than the theory's, so that it can be read aloud to a client or handed to an advocate. The chain is the first fixture in the golden-output suite that holds the vocabulary rule in place, because the explanation is generated and therefore has to be checked by testing rather than by reading the source.

A 2026 survey of generative music therapy systems reports interpretability as the open challenge across the five systems it reviews, finds that none of them trains on clinically annotated data, and finds that therapeutic intent in them is injected after the fact through textual prompts rather than built into the model's generative priors [15]. The explanation is the output that answers the question those systems leave open, and it can answer it because the calculus is a stated set of rules from named inputs to named parameters rather than a learned function.

### 2.7 The session record

The record schema is the Reporting Guidelines for Music-based Interventions checklist, whose 2025 revision has eight components across twelve items [14].

| Component | How the instrument fills it |
|:---|:---|
| 1 Brief name | Therapist-set, per intervention |
| 2 Theory or scientific rationale | Therapist-authored; any system-supplied text is the section 2.6 rule chain |
| 3a Music selection | The five ratings and the rules that acted on them, captured automatically |
| 3b Music | Mode, tempo, metre, dynamic and harmonic material, captured automatically |
| 3c Music delivery method | Therapist-set: played live, rendered, or client-created |
| 3d Materials | Therapist-set, with the instrument configuration pre-filled |
| 3e Intervention strategies | Therapist-set, against their own goals |
| 4 Interventionist | Credential and training, set once |
| 5 Individual or group | Therapist-set, with group size |
| 6 Setting | Therapist-set: location, privacy, ambient sound |
| 7 Delivery schedule | Session count, length, frequency, captured automatically |
| 8 Treatment fidelity | The agreement log, and the deterministic seed of section 2.5 |

Using the field's own reporting standard means a record a therapist produces in an ordinary session is already in the format a reviewer expects, and the studies of section 13 report in it too. Most of the automatically captured fields are free at the point of use, which is the argument for the instrument in one line: **it produces the documentation as a by-product of being used.** That is also the direction the field's own survey evidence points. A 2024 survey of 104 board-certified practitioners found documentation and evaluation narrowing sharply to electronic health record software, 26 and 21.2 per cent, and named clinicians' lack of training and lack of access as the barriers to adopting anything else [16]; the same literature's recommendation is to automate the recurring annotation work so that clinicians can spend the time on the relationship instead [15], [16].

Two consequences follow from that survey and both are requirements. The therapist already has a workstation and already records, so MIDI and audio export are the integration surface. And the documentation phase belongs to the health record, so **the instrument produces records that leave it** rather than records that live in it.

## 3. The theory behind the glass

A therapist can use the instrument without reading this section. It is here because concealing the theory behind the product is how a white box becomes a black one, and because a therapist who wants to argue with the rendering needs to see what they are arguing with.

### 3.1 The state

MPN-S1 states a psychological state as a vector of nine components, each bounded to the unit interval [1]: a weight term the theory calls trauma, a disorder term it calls entropy, the three registers, and four behavioural-style coordinates. Three of the nine, the Real, the Symbolic and the Imaginary, are constrained to sum to one, so the state lives on a simplex in those coordinates and the three registers stand in a competitive relation: one rises as the others fall.

The competitive constraint is the piece of the theory that does the most work in this instrument. A relational stance is a claim about which of three ways of being with another person is in the foreground, and a competitive triple is the right shape for that claim in a way that three independent dials would not be.

### 3.2 The registers, briefly, for a reader who wants them

The three registers are Lacan's. In the reading this theory uses, and stated as a reading rather than as an exegesis, the **Imaginary** is the order of the image and of identification with the other; the **Symbolic** is the order of structure, rule and shared code; and the **Real** is what the shared structure fails to contain.

A therapist will recognise all three in improvisation. A client playing to the image of the therapist, matching and mirroring, is playing in the Imaginary. A client taking up and working inside a rhythmic or tonal frame that the two of them share is playing in the Symbolic. A client whose playing refuses the frame, not by ignoring it but by pushing against it, is playing in the Real. The theory's claim is that these three are in competition and that their proportions are a usable description of the moment; the claim is offered as such, and section 13 says what would test it.

### 3.3 The transformation

A single transformation carries the state to musical parameter space. Tempo, dynamics, mode, timbre, texture and harmony are each a function of the state in their own right rather than a joint function of it, which is the property that makes a musical decision traceable back to the state component that caused it [1], [3]. That property is the practical motive for the whole construction, and it is what the explanation of section 2.6 rests on.

### 3.4 The six parameters, in one table

MPN-S3 states each function in full [3]. In summary:

| Parameter | Function of | What comes out | Where it steps |
|:---|:---|:---|:---|
| Dynamics | the weight term | eight markings, ppp to fff | seven boundaries: 0.10, 0.20, 0.35, 0.50, 0.65, 0.80, 0.90 |
| Tempo | the disorder term | 35 reachable integer tempi in three clusters | 0.4 and 0.7 |
| Metre | the disorder term | 4/4, 3/4, irregular, free | 0.3, 0.5, 0.6, 0.8 |
| Mode | the register triple, with the weight term as a second stage | seven diatonic modes on the score; a continuum containing them in the audio | the surface at weight 0.6 |
| Texture, as fragmentation and density | the two intensity terms together | five stages each, ladders at even fifths | four boundaries each, at 0.2, 0.4, 0.6, 0.8 |
| Harmony | the state, through a scalar function of it | 24 consonant triads under the neo-Riemannian algebra | 24 chain positions, a step of $1/23$ |

Three of the rows are worth a sentence for a therapist.

**Dynamics is a function of the weight term alone,** and its bands are unequal: the four at the ends of the range are 0.10 wide and the four in the middle 0.15, so the instrument resolves the weight term half again as finely at the extremes as in the middle [3].

**Tempo is continuous in form and categorical in effect.** The three tempo clusters sit so far apart that of the 141 integer tempi between 40 and 180 only 35 are reachable, and the steps between clusters are five and eleven times the spans within them [3]. A listener attending to speed hears three plateaux with cliffs between. Against the published discrimination thresholds for tempo, about 6 per cent for a single interval and 3 per cent for a six-interval sequence [24], the mapping emits roughly five times as many levels inside a cluster as a listener could resolve, which section 13 records as a prediction to be tested rather than a property to be asserted.

**Texture is two quantities that move independently.** The pair is density, which is 0.3 of the disorder term plus 0.7 of the weight term, and fragmentation, which is what is left of the disorder term after the weight term is taken out of it. They are exactly orthogonal away from the clip, which was the point of an amendment MPN-S1 made against itself [1], [2]. The musical claim carried by the negative weight has a direction and is worth stating in the room's language: **weight makes a theme more fully stated, not less.** A client carrying a great deal, whose account of it still holds, gets the theme whole and thick. Section 10.3's worked session is exactly that case.

### 3.5 Where the five ratings enter

| Theory term | Product name | The relationship |
|:---|:---|:---|
| The weight term, $\tau$ | Session intensity | The therapist's rating is the value |
| The disorder term, $H$ | Musical variability | Mapped from the Variability gradient |
| The register triple, $(r, s, i)$ | Relational stance | Mapped from the Autonomy gradient, sections 4 and 5 |
| The four behavioural-style coordinates | Assigned per voice | Section 11, the timbre channel |
| The mode | The mode | Sections 6, 7 and 8 |

Arousal and valence are carried to the session record, where items 3a and 3e of the reporting checklist take them.

The Autonomy row is the one that needs a whole argument, and sections 4 to 8 are that argument.

## 4. The Autonomy gradient and the register triple

### 4.1 The mapping, stated

The Autonomy profile's five gradients are Dependent, Follower, Partner, Leader and Resister, and Bruscia's own gloss is that the profile deals with the kinds of role relationships formed between the improvisers [11]. The register triple is a point on a two-dimensional simplex. The mapping between them is a design decision, stated here so that it can be argued with rather than discovered in a code listing.

| Autonomy gradient | Register emphasis | The reading |
|:---|:---|:---|
| Dependent | Imaginary-weighted | The client's playing is organised around the other as image rather than as partner |
| Follower | Imaginary to Symbolic | Rule-taking without rule-setting |
| Partner | The barycentre | Mutual regulation, the three registers level |
| Leader | Symbolic-weighted | The client sets the structure the other follows |
| Resister | Real-weighted | The client's playing refuses the shared structure |

### 4.2 What the withdrawal left available

Section 1.2 gave the proof that killed the ambitious version: Leader and Resister are not separable by any monotone function of timings [7]. It is worth seeing what the human-rated table does with the same two gradients, because it is the reason this mapping survived a withdrawal that its sibling did not.

The table runs Dependent toward the Imaginary, Follower along the edge from the Imaginary toward the Symbolic, Partner to the centre, Leader toward the Symbolic, and then **Resister to a third vertex entirely**. The path is not monotone. It runs from one vertex toward a second and then steps off the line altogether.

That is precisely what the timing derivation could not do. A monotone function of timings has to put Leader and Resister at different points of one line, and there is no line on which they differ. The human-rated table puts them at different vertices, and it can do that because the rating carries something timings do not: a speaker's stance toward the shared frame. A Leader and a Resister may take the same amount of floor, at the same moments, in the same proportions. What separates them is whether the structure they are producing is one the two of them share, and that is a judgement, and a therapist makes it.

So this mapping is not the withdrawn derivation in new clothes. It is what became available because the derivation was withdrawn.

### 4.3 Partner at the barycentre

Partner lands at the centre of the triangle, and there is a technical reason to look hard at that point before accepting it.

MPN-S2 proves a lemma about the selector that takes the largest of the three registers: on the tripod of segments joining the barycentre to the edge midpoints, that selector is discontinuous [2]. Read through that selector, Partner would land in a set with undefined neighbours all around it, which would be a bad place for the most common clinical state in the profile to live.

**The worry dissolves, because it is posed against a selector the mapping no longer uses.** MPN-S3 replaced the largest-of-three selector with modal interpolation, and under interpolation the barycentre is the **most** stable point on the simplex rather than the least [3]. The weights are equal there, the result is the mean of the three modes, and the map is Lipschitz on the closed simplex. The jump set of the mode parameter under interpolation is the single surface where the weight term crosses 0.6, and nothing at all on the simplex.

Interpolation is worth a paragraph in the room's language, because it is what makes the difference. Where two registers are close, the mode is not chosen between them. The scale degrees on which the two candidate modes differ are bent proportionally, so a client poised between two ways of being with the therapist sounds poised, rather than sounding like whichever register happened to win by a thousandth. Let $m$ be the largest of the three registers and $\delta$ the margin; the mode of register $k$ gets weight $\max(0,\, 1 - (m - x_k)/\delta)$, normalised to sum to one, and each scale degree sounds at the weighted mean of the degrees the candidate modes give it. The leader always has weight 1, and a register a full margin below it has weight exactly 0, so candidates enter and leave the blend continuously.

Read through that rule, Partner at the barycentre is not flattering geometry. It is an ordinary and testable prediction: **mutual regulation sounds like the even blend of the three modes.** Nobody fitting a mapping for elegance lands on the mean of three scales.

### 4.4 Why Partner has no dead band

A dead band, a gap below which the selector holds its previous value, is the standard remedy for a parameter that flickers near a boundary. It is worth saying why this instrument's mode selector is better off with the interpolation rule alone, and the argument is clinical as much as technical.

A dead band is defined by a gap and releases when the gap grows. At Partner the gap is zero, and it is zero permanently, because Partner is a rated triple sitting at the barycentre rather than a state that wanders near it. A rule defined by a gap that is always zero holds forever.

Follow that mechanism and the consequence is one a therapist would notice immediately. The selector would hold whatever register the preceding gradient selected. **A client moving from Resister to Partner would sound Real; a client moving from Dependent to Partner would sound Imaginary.** The same clinical state would sound like two different things depending on where the client had come from, and neither would sound like partnership. The instrument would erase the one transition a therapist most wants to hear.

The interpolation rule has the opposite property, and it is the property the mapping was chosen for: **Partner sounds the same however the client arrives at it**, which is the whole point of naming a state.

Two further things follow. A dead band would make the mode a function of the previous state as well as the current one, which costs the decomposability that section 3.3 says the explanation rests on. And it would have no previous register to hold on a first frame, which in therapy is the opening of every session rather than an edge case.

### 4.5 The four conditions

MPN-DESIGN-01 section 11 ruled that the mapping survives and that Partner takes no dead band, and attached four conditions to keeping it [7]. The conditions were stated and stood open. Sections 5 to 8 close them, one section each.

1. **Fix the five register triples numerically.** Under interpolation the exact coordinates set the blend weights, and *near the barycentre* and *at the barycentre* produce measurably different music.
2. **Run the collapse check.** Version one ships two profiles, so the register triple takes exactly five values and the mode channel has at most five reachable outputs. Enumerate the five triples against the chosen margin and the live pitch table, count the distinct modal outputs, and if there are fewer than five, either widen the triples or declare the meeting on the therapist's screen. A flat output from a channel where two gradients meet and a flat output from a flat state have to look different to the therapist.
3. **Declare the rounding convention.** The renderer chooses between rounding half up and rounding half to even, and the choice decides the printed scale precisely where interpolation exists.
4. **Print the divergence.** Notation and audio disagree by up to a quarter tone inside the margin, and anyone reading a score while hearing the audio hears the difference there, so the figure belongs beside the score.

## 5. Condition one: the five triples, fixed

### 5.1 The construction

The triples are fixed by a construction with two constants and one rule, rather than by five separate judgements, so that a reader can argue with the construction instead of with five numbers.

The two constants are a **Real floor**, the amount of the Real that the four gradients inside the shared frame carry, set at 0.15; and a **lead**, the amount a named register carries when it is the one the gradient names, set at 0.60.

| Gradient | Real | Symbolic | Imaginary | The reading |
|:---|---:|---:|---:|:---|
| Dependent | 0.1500 | 0.2500 | 0.6000 | The other as image; the Imaginary leads |
| Follower | 0.1500 | 0.4250 | 0.4250 | Rule-taking without rule-setting; the Imaginary and the Symbolic exactly level |
| Partner | 0.3333 | 0.3333 | 0.3333 | Mutual regulation; the barycentre, all three level |
| Leader | 0.1500 | 0.6000 | 0.2500 | The client sets the structure; the Symbolic leads |
| Resister | 0.6000 | 0.2000 | 0.2000 | The shared structure is refused; the Real leads |

Four properties of the table are asserted in the generator and hold [9]. Every triple lies on the simplex, summing to one with no negative coordinate. Partner is exactly the barycentre, to the last bit of the arithmetic. Dependent and Leader are mirror images of each other in the Imaginary and the Symbolic, which is the musical content of the claim that following and leading are the same relation seen from the two ends. And the Real is held level at 0.15 across Dependent, Follower and Leader, so **the one thing that changes when a client moves from Resister to any of the other four is that the shared frame comes back.** The table is not monotone, and the place where it leaves the line is the Resister row, which is section 4.2's finding as a property of the numbers.

Follower sits at the exact tie between the Imaginary and the Symbolic rather than near it. That is a deliberate choice and section 6.6 is the computation that earns it.

### 5.2 The lead rule

The construction carries one rule and it comes out of an enumeration rather than out of taste.

**A gradient named for a register places that register more than an interpolation margin ahead of the other two.**

The generator sweeps the Real floor from 0.05 to 0.30 and the lead from 0.45 to 0.80, keeping the readings of the table above intact, and recomputes the whole collapse check of section 6 at all 848 pairs, 825 of which satisfy the rule [9]. At every one of those 825, the three counts that section 6 reports are the same. Where a named register's lead falls to zero, three of the five gradients render one audio output, because a gradient that names a register and then places it level with another is no longer that gradient's placement.

So the rule is what makes section 6 a finding about the live pitch table rather than a finding about the particular numbers chosen here. The table above is one placement among many that satisfy the rule, and every one of them gives the same answer.

### 5.3 What each row sounds like

For a therapist reading the rows rather than the arithmetic, with the modes the live pitch table assigns below the weight-term switch: the Real takes Dorian, the Symbolic Lydian, the Imaginary Phrygian.

**Dependent** renders Phrygian outright. The Imaginary leads by 0.35, far more than any margin under consideration, so the blend has one candidate and the printed scale and the sounded scale are the same thing.

**Follower** renders the exact midpoint of Phrygian and Lydian, so its second, third, fourth, sixth and seventh degrees sound halfway between the two. It is the gradient that sounds most obviously *between*, which is what rule-taking without rule-setting is.

**Partner** renders the mean of all three, Dorian and Lydian and Phrygian together. It is the only gradient whose sound has all three registers in it at once.

**Leader** renders Lydian outright, mirroring Dependent.

**Resister** renders Dorian outright.

## 6. Condition two: the collapse check, run

### 6.1 What the check asks, and why a therapist should care about the answer

Version one ships two profiles, so the register triple takes exactly five values and the mode channel has at most five reachable outputs. The check asks one question, in the therapist's own terms: **when the therapist moves the relational stance from one gradient to the next, does the music change?**

It is a sharper question here than it looks, because the relational stance drives one channel of the six. Session intensity and musical variability drive dynamics, tempo, metre, texture and harmony; the stance drives the mode. So when a therapist changes the stance and holds the other four ratings, the mode channel is the whole of what answers. Two gradients meeting on that channel means two gradients that sound alike, and a therapist who moved the stance from Resister to Partner and found the staff unchanged would have every reason to wonder whether the rating had gone in.

So the check is run, the count is printed, and where two gradients meet the meeting is declared on the therapist's screen. **A flat output from a channel where two gradients meet and a flat output from a flat state are labelled differently.**

### 6.2 The machinery, checked before it is used

Before any of the check, the generator confirms that the interpolation it is about to run is the interpolation this series describes [9]. On a grid of 20,301 points at a step of $1/200$, the measured share of the simplex inside the margin is 9.21 per cent at $\delta = 0.05$ against MPN-S2's closed form $2\delta - \delta^2$ of 9.75 per cent, and 35.36 against 36.00 at $\delta = 0.20$. Outside the margin, at all 18,432 such states on the grid, the interpolation reproduces the largest-of-three selector exactly.

### 6.3 The result: five on the audio path

At $\delta = 0.05$, on the live pitch table below the weight switch, the five blended scales in semitones above the tonic are:

| Gradient | The scale that sounds |
|:---|:---|
| Dependent | 0, 1, 3, 5, 7, 8, 10 |
| Follower | 0, 1.5, 3.5, 5.5, 7, 8.5, 10.5 |
| Partner | 0, 1.667, 3.333, 5.333, 7, 8.667, 10.333 |
| Leader | 0, 2, 4, 6, 7, 9, 11 |
| Resister | 0, 2, 3, 5, 7, 9, 10 |

**Five gradients, five distinct scales.** The audio path carries every distinction the therapist makes. The same holds above the weight switch, where the table assigns Aeolian, Mixolydian and Locrian.

### 6.4 Margin invariance, which is what lets the check be run now

The margin $\delta$ is the one number in the mapping that is settled by ear rather than by argument, and the listening experiment that settles it is Study 2 of section 13. A check that depended on the margin would have to wait for that experiment.

This one does not. The generator recomputes all five blended scales at every margin from 0.001 to 0.400 in steps of 0.001 and compares each with the value at 0.001 [9]. **The first margin at which any of the five outputs changes is 0.276.** MPN-S3 puts the candidate margins at 0.02 to 0.20 [3], so the entire result of this section is the same at every margin under consideration, and it stays the same up to 0.275, which is well clear of the largest candidate.

The reason is structural rather than lucky. Partner sits at the barycentre, where all three weights are equal at every margin. Follower sits at the exact tie, where the two leading weights are equal at every margin. Dependent, Leader and Resister lead by 0.35, 0.35 and 0.40, so their blends have one candidate at any margin below those figures. The first thing to change is the Real entering Follower's blend, and it changes at 0.275, which is exactly Follower's Real gap. The generator asserts that identity.

### 6.5 The result: four on the notation path

The printed score rounds. Under the convention section 7 declares, the five gradients print as four scales:

| Gradient | Printed scale | Name |
|:---|:---|:---|
| Dependent | 0, 1, 3, 5, 7, 8, 10 | Phrygian |
| Follower | 0, 2, 4, 6, 7, 8, 10 | a scale outside the seven |
| Partner | 0, 2, 3, 5, 7, 9, 10 | Dorian |
| Leader | 0, 2, 4, 6, 7, 9, 11 | Lydian |
| Resister | 0, 2, 3, 5, 7, 9, 10 | Dorian |

**Partner and Resister print as the same scale.** Above the weight switch the same thing happens with Aeolian in place of Dorian. That is the meeting the therapist's screen declares, and section 6.7 says what it says.

Under the other rounding convention the count is three rather than four, and section 7 is the argument from that difference.

### 6.6 Two enumerations that say where the meeting comes from

The natural first response to a meeting is to move a triple. Two enumerations settle whether that would work.

**The Partner and Resister meeting is a property of the pitch table.** The generator enumerates every Real-led state on the 20,301-point grid whose lead exceeds the margin: 6,080 states per band. **All 6,080 print as one scale**, Dorian below the weight switch and Aeolian above it, because a state with one register clearly ahead has one candidate mode and prints as that mode outright. And the barycentre prints as that same scale, because the mean of the three modes rounds onto the Real's mode. So the meeting holds for every admissible placement of Resister, at every margin section 6.4 covers, in both bands. Moving Resister moves nothing, and Partner is fixed at the barycentre by section 4.3. **The meeting is declared rather than moved**, and section 6.7 is the declaration.

**The Imaginary to Symbolic edge carries exactly three printed scales, and the exact tie is one of them.** The generator scans that edge at a step of $1/2000$ and records every printed scale [9]. Under rounding half to even, the edge yields Lydian on the Symbolic side, Phrygian on the Imaginary side, and, **at the single point of the exact tie and nowhere else**, the scale 0, 2, 4, 6, 7, 8, 10, which is neither of them.

That is what earns Follower its place at the exact tie rather than near it. Anywhere else on the edge, Follower prints as Dependent's scale or as Leader's. At the tie it prints as a scale of its own. The generator asserts both halves: that the tie prints distinctly, and that no other placement on the edge does.

### 6.7 What the therapist's screen says

Where two gradients meet on a channel, the instrument says so on the surface where the therapist is working, in the vocabulary of section 2.2 and beside the passage it applies to. For version one that is one line:

> Partner and Resister print the same scale on this stave. The recording tells them apart.

The line does two things. It tells a therapist who has just moved the stance from Resister to Partner, and seen the printed staff unchanged, that the rating registered. And it tells them where to go to hear the difference, which is the audio, where section 6.3's five distinct scales are.

The instrument shows the same kind of line for the timbre channel, under section 11.3's rule, and for the same reason.

## 7. Condition three: the rounding convention, declared

### 7.1 The two conventions

The audio path carries the blended degree exactly, in cents. The printed score carries semitones, so the notation renderer rounds, and at a tie the value it is rounding is exactly a half. **Which way a half goes is a choice, and the choice decides the printed scale precisely at the states interpolation was chosen for.**

MPN-S3 states the general case at the tie between the Real and the Symbolic on the live pitch table, Dorian against Lydian, and the generator recomputes it [3], [9]:

| | Scale in semitones |
|:---|:---|
| Dorian | 0, 2, 3, 5, 7, 9, 10 |
| Lydian | 0, 2, 4, 6, 7, 9, 11 |
| The blend at the tie | 0, 2, 3.5, 5.5, 7, 9, 10.5 |
| Round half up | 0, 2, 4, 6, 7, 9, 11, which is Lydian exactly |
| Round half to even | 0, 2, 4, 6, 7, 9, 10, which is none of the seven |

One convention returns one of the two inputs. The other returns a scale that is not in the table at all, and it is what a Python implementation gets by writing `round`. This is not a detail to leave to a language.

### 7.2 What each convention costs the therapist

The choice has a cost that can be counted in the therapist's own terms: how many of the five Autonomy gradients keep a printed scale of their own.

| Convention | Distinct printed scales | Gradients that keep a scale of their own |
|:---|:---:|:---|
| Round half up | 3 | Dependent |
| Round half to even | 4 | Dependent, Follower, Leader |

Rounding half up sends Follower onto Leader's scale, because half up at the tie returns the Symbolic input and the Symbolic input is exactly what Leader prints. Rounding half to even keeps them apart.

### 7.3 The declaration

**The notation path rounds half to even, and the score declares it on its face.**

Three things carry the declaration. It is the convention under which three of the five gradients keep a printed scale of their own rather than one. It is the convention under which the exact tie, which is where Follower is placed and where section 6.6 shows the only distinct printed scale on that edge lives, actually produces that scale. And it is what a plain implementation produces, so the code and the declaration agree by default rather than by vigilance.

Declaring it on the face of the score is the other half. A score that prints a scale outside the seven has told a reader something, and the convention is what lets them work out what.

### 7.4 What the panel settles

The convention is declared here on the arithmetic above, and the arithmetic is about what the printed score carries. What a listener makes of the two conventions is a separate question with an instrument already built for it. Part B of the published listening pack carries seven items: the two pure inputs, the exact blend at the tie, two near-tie blends at margins of 0.05 and 0.20 separated by 17.4 cents, and **both roundings of the tie as separate items**, so a panel's answer about the convention falls out of the same seven items that answer about the margin [3]. Two of those seven carry the same scale, because rounding half up at an exact tie returns one of the two inputs exactly, which makes that pair a result and a catch trial at once.

## 8. Condition four: the divergence between the score and the sound

### 8.1 The figure

Under the declared convention, at a margin of 0.05, the greatest disagreement between the printed pitch and the pitch that sounds, gradient by gradient, in cents:

| Gradient | Below the weight switch | Above the weight switch |
|:---|---:|---:|
| Dependent | 0.00 | 0.00 |
| Follower | 50.00 | 50.00 |
| Partner | 33.33 | 33.33 |
| Leader | 0.00 | 0.00 |
| Resister | 0.00 | 0.00 |

**The greatest divergence over the five gradients and both bands is 50.00 cents**, which is the quarter tone MPN-S3 gives as the worst case, attained at the tie itself [3]. The generator asserts that identity.

Three of the five gradients print and sound alike exactly. Dependent, Leader and Resister each have one candidate mode, so nothing is being blended and nothing is being rounded. **The score and the audio agree completely on three of the five stances a therapist can rate**, and the two they part company on are the two whose musical content is being between things.

### 8.2 Degree by degree

Below the weight switch, for the two gradients that carry a divergence:

| Follower | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|:---|---:|---:|---:|---:|---:|---:|---:|
| Sounds at | 0.0000 | 1.5000 | 3.5000 | 5.5000 | 7.0000 | 8.5000 | 10.5000 |
| Prints as | 0 | 2 | 4 | 6 | 7 | 8 | 10 |
| Divergence, cents | 0.00 | 50.00 | 50.00 | 50.00 | 0.00 | 50.00 | 50.00 |

| Partner | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|:---|---:|---:|---:|---:|---:|---:|---:|
| Sounds at | 0.0000 | 1.6667 | 3.3333 | 5.3333 | 7.0000 | 8.6667 | 10.3333 |
| Prints as | 0 | 2 | 3 | 5 | 7 | 9 | 10 |
| Divergence, cents | 0.00 | 33.33 | 33.33 | 33.33 | 0.00 | 33.33 | 33.33 |

The tonic and the fifth print and sound alike on both, which is worth knowing for a therapist playing from the score: the frame of the scale is exact and the inside of it is what bends.

### 8.3 What this means at the piano

A therapist reading the printed score while the audio runs will hear the two agree at Dependent, Leader and Resister, and part company at Follower and Partner, by a quarter tone at Follower and by a third of a semitone at Partner.

That is a stated property of two rendering paths rather than an artefact, and it is printed beside the score so that a therapist meeting it knows what they are meeting. It also has a practical reading. **The printed score is what a therapist plays; the audio is what the instrument means.** Where the two diverge, the therapist playing from the score is playing the nearest thing an ordinary instrument can produce to a client who is between two ways of being with them, and that is a reasonable thing to play.

## 9. The gradient-to-state map

### 9.1 Why the map needs a criterion

Two of the five ratings, musical variability and session intensity, are five-way gradients that have to become numbers on the unit interval before the mapping can read them. The obvious map puts the five levels at the centres of five equal cells, at 0.1, 0.3, 0.5, 0.7 and 0.9.

The obvious map has a defect that is easy to miss and unpleasant to meet. Three of those five values sit exactly on a boundary of a rendering channel. 0.1 is a dynamics boundary, 0.5 is a dynamics boundary and a metre boundary, and 0.9 is a dynamics boundary. A rating that sits exactly on a boundary is a rating where the smallest change in the arithmetic, a different floating-point path or a later revision of a band edge, moves the output a whole step. **A therapist who sets the same rating twice should get the same music twice, and the cheapest way to guarantee that is to keep every rating away from every edge.**

### 9.2 The criterion, and the asymmetry it forces

The criterion is stated and then solved rather than argued about: **choose the affine map whose five levels are furthest from the nearest boundary of any rendering channel.**

The boundaries a rating on the unit interval can land on are the union of four sets: seven from the dynamics ladder, two from tempo, four from metre, and one from the switch in the mode table. Written out, they are 0.10, 0.20, 0.30, 0.35, 0.40, 0.50, 0.60, 0.65, 0.70, 0.80 and 0.90.

One consequence falls out before the search runs, and the generator asserts it. **No five-level map symmetric about the midpoint clears every boundary**, because a symmetric map puts its middle level at 0.5, and 0.5 is a boundary of both the dynamics ladder and the metre lookup. The symmetry a rating scale would naturally want is unavailable, and it is unavailable for a reason in the arithmetic rather than by oversight.

### 9.3 The map

The generator searches the affine family at a step of $1/1000$ in both parameters and reports the map that maximises the least clearance [9]:

$$\text{level}(g) \;=\; 0.075 + 0.200\,(g - 1), \qquad g = 1 \ldots 5$$

| Rating | 1 | 2 | 3 | 4 | 5 |
|:---|---:|---:|---:|---:|---:|
| State value | 0.075 | 0.275 | 0.475 | 0.675 | 0.875 |

**The least clearance from any boundary is 0.0250 in state units**, which is a quarter of the narrowest band in the whole mapping. Every level lies strictly inside the unit interval and the map is strictly increasing.

The map is used for both musical variability and session intensity, so a therapist learns one scale rather than two.

### 9.4 The two composite ladders

Texture is the one place where the two ratings meet: density and fragmentation are each functions of both, so their ladder boundaries are not boundaries of either rating on its own. The generator therefore checks them across all 25 pairs of ratings a therapist can set, and reports **a least clearance of 0.0050** from any ladder boundary [9]. Every one of the 25 states a version-one therapist can produce lands strictly inside a texture stage.

That figure is smaller than the 0.0250 above, and it is the number to watch if a later revision moves a ladder.

## 10. A worked session

This section is generated material. The five ratings below are the author's, written to exercise the path, and everything after them is computed by the generator [9]. It is here because the fastest way to say what an instrument is is to run it.

### 10.1 The five ratings

| Rating | Value |
|:---|:---|
| Relational stance | Partner |
| Musical variability | 2 of 5 |
| Arousal | 3 of 5 |
| Valence | 2 of 5 |
| Session intensity | 4 of 5 |

A moment in the middle of a session. The client is playing with the therapist rather than at them or against them. The playing is on the rigid side, repetitive and narrow. The therapist reads the moment as carrying a good deal of weight, and this is where they want the arc to be.

### 10.2 The state those ratings carry

| Quantity | Value | From |
|:---|---:|:---|
| The weight term | 0.675 | Session intensity 4 of 5, through the map of section 9.3 |
| The disorder term | 0.275 | Musical variability 2 of 5, through the same map |
| The register triple | (0.3333, 0.3333, 0.3333) | Relational stance Partner, through the table of section 5.1 |

The weight term is above 0.6, so the mode table is the one above the switch: the Real takes Aeolian, the Symbolic Mixolydian, the Imaginary Locrian. Arousal and valence are carried to the session record.

### 10.3 What the instrument renders

| Parameter | Value |
|:---|:---|
| Dynamic marking | **f**, the sixth of eight, velocity 92 |
| Tempo | **46 bpm**, in the lowest of the three tempo clusters |
| Metre | **4/4** |
| Orchestration density | **stage 3 of 5**, from a density of 0.5550 |
| Fragmentation | **stage 1 of 5**, from 0.0000 |
| Mode, printed | **0, 2, 3, 5, 7, 8, 10**, which is Aeolian |
| Mode, sounded | 0, 1.6667, 3.3333, 5.0000, 6.6667, 8.3333, 10.0000 |
| Score against audio | they disagree by **33.33 cents** at most |
| Harmonic position | **16 of 23** along the chain, A flat major |
| Timbre | the client voice and the therapist voice are **fully audible apart**, section 11 |

Three of those are worth the therapist's attention.

**Fragmentation comes out at stage 1, the whole theme.** That is the clip in the texture pair doing exactly what section 3.4 says it does. The client is carrying a great deal and their playing is narrow rather than scattered, and the mapping's reading of that combination is that the theme is stated whole and thick rather than broken into pieces. A therapist who disagrees with that reading has a substantive disagreement with the theory, which is the kind of disagreement this paper is published to collect.

**Tempo is 46 beats per minute and the metre is common time.** Low variability puts the moment in the most ordered of the three tempo clusters. A therapist expecting a heavy moment to be fast is meeting the claim underneath the tempo channel, which is that variability shows as instability of pulse rather than as speed [3].

**The harmonic position is the sixteenth of twenty-four chords around a chain, and here it is A flat major.** The chain is the 24 consonant triads under the neo-Riemannian algebra, which has a distance: from any one triad there is exactly one triad at the far end, and the graph's diameter is five moves [2], [3]. Position 16 is computed as $\operatorname{round}(23 \cdot f)$ on the absolute form, and the reading used for $f$ here is the weight term; naming $f$ is the first item of section 14.

### 10.4 The explanation, as the therapist reads it

> You set relational stance to Partner, so no single way of playing together was clearly in front, and the music blends the three of them rather than picking one. That blend is what makes the printed scale and the recording differ slightly here: the recording sits a third of a semitone away from the printed notes on four of the seven degrees, and the printed scale is the nearest the staff can come.
>
> Session intensity at 4 of 5 set the volume to **f**, the sixth of eight levels, and moved the chord sixteen places around a chain of twenty-four, which is A flat major.
>
> Musical variability at 2 of 5 kept the pulse steady, so the metre is common time and the tempo is 46 beats per minute.
>
> Those two together set the texture. The theme is stated whole rather than broken into fragments, and the scoring is at the third of five densities.
>
> Nothing here was chosen at random, and setting the same five ratings again produces the same music.

No register name, no operator name, no band, no seed string, and no word a non-specialist would have to look up. The generator asserts the determinism the last line claims by rendering the same five ratings sixty-four times and confirming one result.

### 10.5 The same session with the stance changed

This is the comparison the instrument exists to make, and it takes one tap. Session intensity, variability, arousal and valence are held; only the relational stance moves.

| Relational stance | Printed scale | Sounds at, first three degrees | Score against audio |
|:---|:---|:---|---:|
| Dependent | Locrian | 0.000, 1.000, 3.000 | 0.00 cents |
| Follower | 0, 2, 4, 5, 6, 8, 10, a scale outside the seven | 0.000, 1.500, 3.500 | 50.00 cents |
| Partner | Aeolian | 0.000, 1.667, 3.333 | 33.33 cents |
| Leader | Mixolydian | 0.000, 2.000, 4.000 | 0.00 cents |
| Resister | Aeolian | 0.000, 2.000, 3.000 | 0.00 cents |

Five stances, five sounds, four printed scales, with the Partner and Resister meeting declared on the screen under section 6.7.

Read the third column downward and the mapping's musical claim is in the numbers. The second degree runs 1.000, 1.500, 1.667, 2.000, 2.000, rising across the first four stances and holding at the fifth. The third runs 3.000, 3.500, 3.333, 4.000, 3.000, rising to the Leader and then closing all the way back at the Resister while the second stays open. That closing, with the second degree held and the third pulled in, is section 4.2's Real stepping off the line, rendered.

### 10.6 The record this session leaves

The seed, the seeding algorithm version, the ruleset version and the build; the five ratings; the twelve items of the reporting checklist with the automatic fields filled; the rendered audio itself; and, if the text analyser was on and proposed anything, one agreement-log row per proposal carrying what it proposed, what the therapist decided and when.

The five ratings are the only thing in that list the therapist supplied, and they were supplied in session for the sake of the music rather than for the sake of the record. Everything else is captured. That is section 2.7's argument, made concrete: **the documentation is the by-product of playing.**

## 11. The two voices, and the timbre channel

### 11.1 Why this case is the easy one

The theory's fourth group of state coordinates is a four-dimensional behavioural-style profile, and MPN-S3 specifies a map from it to a timbre space [3]. The map has rank three in four coordinates, which has a consequence a therapist can hear: **two profiles that differ by the same amount added to all four coordinates render identically.** The channel carries the shape of a profile and not its size.

For a character in a script the profile is assigned by the author, and MPN-S6 gives the rule for adding a voice to a score without re-voicing anyone already on the page [6]. For this instrument the two voices in the room, a client voice and a therapist voice, are the whole of the assignment, and two is the one cast size where the best assignment is exact and needs no search.

### 11.2 The audible fraction

A client voice at $(1, 1, 0, 0)$ and a therapist voice at $(0, 0, 1, 1)$ differ in opposite senses on two coordinates, which places them at opposite ends of the channel's full diameter. The generator computes the audible fraction of that pair, which is the part of their difference that survives the map, and **it is 1.0000: the whole of it** [9]. The generator also computes the audible fraction of a pair differing by a constant on all four coordinates and confirms it is exactly zero, which is the rank result as an assertion rather than as a claim.

### 11.3 Assigning for meaning and assigning for audibility

The tension is honest and the instrument resolves it by measurement rather than by rule. A profile is supposed to say what a voice is like. Two profiles chosen because they mean something may sit close together in the channel, or sit along the direction the channel does not carry, in which case the instrument would render two different voices with the same timbre while every other parameter said they differed.

So the requirement is neither *assign for meaning* nor *assign for audibility*. It is that **the instrument computes the audible fraction of every assigned pair and shows it**, and an assignment whose audible fraction comes out near zero is declared on the therapist's screen in the same way section 6.7 declares the mode meeting. A flat timbre from two profiles the channel renders alike and a flat timbre from two genuinely similar voices are labelled differently. The check is one line of arithmetic and it belongs in the build.

## 12. What the field already has, and what the published evidence establishes

This section is for a therapist deciding how much weight to put on the instrument. It reports what the field's published work establishes and at what size, with the sizes given so that a reader can weigh them.

### 12.1 The instruments the field already has

**Bruscia's Improvisation Assessment Profiles**, 1987. Six profiles, five gradients each, applied to musical parameters including rhythm, tempo, volume and timbre [11]. In the field's own vocabulary this is a mapping from clinical observation to musical parameters, which is the same shape as the mapping this series specifies and is forty years older. That is the reason the rating surface speaks the profiles: a therapist who already rates Autonomy on a five-point gradient is a therapist who already has the instrument's input.

**The Nordoff-Robbins scales.** Evaluation Scale I, Client-Therapist Relationship in Musical Activity, has published interrater evidence: **34 certified music therapists rated 10 video excerpts, and 78 per cent of all raters scored within one point of the group mean**, 82 per cent among Nordoff-Robbins-trained raters and 74 per cent among untrained [12]. That figure is the target this instrument's own reliability study aims at, and it is the reason section 2.3 says the anchors are the instrument: the agreement in that study is agreement between people reading the same written descriptions of the same playing.

**Wigram's selection.** Two of the six, Autonomy and Variability, which is section 1.4 [13].

### 12.2 What the published evidence establishes, with its sizes

**In autism.** The 2022 Cochrane review covers 26 studies and 1,165 participants and reports, immediately post-intervention: global improvement RR 1.22 (95 per cent CI 1.06 to 1.40) at moderate certainty, from 8 studies and 583 participants; quality of life SMD 0.28 (0.06 to 0.49) at moderate certainty from 3 randomised trials and 340 participants; total symptom severity SMD −0.83 (−1.41 to −0.24) at moderate certainty from 9 studies and 575 participants; and adverse events RR 1.52 (0.39 to 5.94) at moderate certainty [18], [25]. Social interaction, non-verbal communication and verbal communication are reported at low to very low certainty with intervals spanning the null.

Beside that sits the largest single trial. TIME-A randomised 364 children aged 4 to 7 across 10 centres in 9 countries, delivered a median of 19 improvisational music therapy sessions against an active comparator receiving a median of 45 other therapy sessions, and reported a between-group difference on the blinded primary outcome of **0.06 (95 per cent CI −0.70 to 0.81)** at five months, with the same result at twelve [19], [25]. Anyone reading the pooled severity estimate should read that interval beside it, and anyone reading the trial should read the pooled estimate beside that.

**In dementia.** The 2025 Cochrane update covers 30 studies and 1,720 randomised participants and reports depressive symptoms SMD −0.23 (−0.42 to −0.04) at moderate certainty, overall behavioural problems −0.31 (−0.60 to −0.02) at low certainty, and agitation or aggression −0.05 (−0.27 to 0.17) at moderate certainty [22], [25].

**Across five conditions.** A 2022 update of systematic reviews covering autism, dementia, depression, insomnia and schizophrenia pools 10 randomised trials and 1,248 patients and describes music therapy as a safe and low-threshold method with improvements in physical, psychological and social terms, stating at the same time that the trials it found were of moderate to low quality [17], [25].

**Where a reproducible stimulus carries the strongest result in the whole literature.** The Cochrane review of music interventions for acquired brain injury covers 29 randomised trials and 775 adults and reports **gait velocity +11.34 metres per minute (8.40 to 14.28)** from 9 trials and 268 participants at moderate quality, with stride length +0.12 m (0.04 to 0.20) at moderate quality [20], [25]. The rhythmic auditory cueing meta-analysis in Parkinsonian gait covers 50 studies and 1,892 participants and finds the effect depends on the tempo relative to the patient's own cadence: fast-paced cueing g 0.70 (0.50 to 0.89, $I^2 = 0$), slow-paced g −0.24 [21], [25].

Those two are the most useful entries in this section for the present instrument, and for two separate reasons. They establish that **a reproducible, recorded audio stimulus can carry a moderate-certainty clinical effect**, which is the class of object this instrument produces. And their mechanism is sensorimotor entrainment, a timing effect whose direction turns on tempo relative to the person's own cadence. That mechanism is a different one from the expressive mechanism this instrument's own studies test, and the tempo-relative finding is a direct argument for the per-client configurability of section 12.3.

**On generated music specifically.** The direct literature, as the programme's own evidence review counts it, is eight studies and 1,267 participants, four of them randomised, across anxiety, sleep, cognition and physiological relaxation markers, with quality rated moderate in half and weak in half; the source for that count is a conference presentation and the review says to weight it accordingly [25]. A 2026 narrative review of AI-assisted music therapy tools positions the area as a developing adjunct and names small samples, inconsistent endpoints and short follow-up as the shape of the published work [25]. Every estimate elsewhere in this section comes from an intervention delivered by a person, which is what makes the studies of section 13 the ones that carry this instrument's own claims.

The review this section draws on is worth naming as an asset rather than as a hedge. It was prepared by fetching every source and marking each numeric claim verified against the page it came from, with unverified claims carried without numbers, and it keeps its own list of what it could not read [25]. A therapist deciding what to make of this instrument is better served by a review built that way than by a summary that agrees with the instrument.

### 12.3 The mode map, and why it is configurable per client

MPN-S3 maps the leading register to one of seven diatonic modes, and the choice among four incompatible tables in the corpus is under test as Part A of the published listening pack [3].

The evidence underneath that map is worth a therapist's attention because it is unusually specific. A systematic review of the major and minor dichotomy finds the major-happy and minor-sad association developing from 58 per cent correct at age four to **92 per cent in adults**, replicated in Japanese and Chinese samples; finds that about 70 per cent of listeners perform near chance when asked to classify rapid tone-scrambles; and finds that major mode induces no greater happiness than minor in a group of listeners with minimal exposure to Western music [23]. The authors read the association as a psychoacoustic predisposition that becomes an established cultural connotation through exposure.

Two requirements follow and both are in the instrument. The major and minor axis carries a hedged interpretation, because it is the part of the map with an evidence base. And **mode selection is configurable per client**, because the cross-cultural finding means one fixed table is the right table for some listeners and the wrong one for others. That is a clinical setting rather than a preference.

## 13. What settles the claims made here

Every claim in this paper about what a therapist hears, or about how two therapists agree, is carried by a study. The studies are specified; this section says which claim rests on which, so a reader can see what would change each one.

**Study 1, the rating instrument's reliability, carries section 2.2's five ratings and section 2.1's authoritative path.** Two raters watch the same material and set the five gradients independently; the result is a weighted kappa per gradient, reported under the conventions for reliability coefficients that the field uses [26]. The comparator is section 12.1's 78 per cent within one point of the group mean [12]. A gradient that comes back with good agreement is a rating item; a gradient that comes back with poor agreement is a gradient whose anchors need rewriting, which is a result about the anchors and a useful one.

**Study 2, the listening study, carries the outputs of section 2.4 and the mode of section 12.3.** Material rendered from two different states is played to listeners who are asked which differs and in what direction. That is the claim the instrument exists to make, and the pack that makes it is built, blinded and published. Part A settles which register takes which mode among the four candidate tables. Part B settles the interpolation margin and the rounding convention together, from seven items, as section 7.4 sets out. Part D settles the resolution of the timbre space, which is what turns section 11's channel arithmetic into a statement about hearing [3].

**Study 3, machine against human, carries the interaction budget of section 2.1 and the analyser proposal it feeds.** Its data is the agreement log: the proposed value, the therapist's value, the same moment, the same index. The shipping rule attached to it is stated in advance, which is what makes it a test: a proposal overridden more often than chance would predict is a proposal the instrument turns off.

**Study 4 builds the corpus.** It produces the body of rendered material the framework is measured on, and it carries that claim alone.

One property is shared by all four and is worth saying in the positive. Each of them measures agreement, discrimination or preference among people asked a question, and each returns an answer about the instrument's rendering. The state the instrument renders is the therapist's own rating, given rather than recovered, which is why the studies above are about the rendering and about the rating's reliability, and why those two are the right things to study.

## 14. Further work, in the order it pays

**Name the scalar function inside the harmonic parameter.** The harmonic position is $\operatorname{round}(23 \cdot f(\text{state}))$ on the absolute form, and $f$ is the one function in the mapping still to be named. The value 23 is settled: it is the only value at which the state-only formulation reaches the same 24 chords as the change-based one, it sits at the top of the defensible range so that a fully weighted state can reach the far side of the harmonic space from every starting triad, and it is the largest value that stays injective [10], [27], [28]. Naming $f$ is cheap and several documents wait on it. This paper's worked session reads $f$ as the weight term and says so.

**Fix the interpolation margin.** One blended pair at a small margin against a large one, heard on a synthesiser that takes cents, which needs no microtonal notation renderer at all. It costs an afternoon, it is Part B of a pack that is already built, and section 6.4 establishes that the collapse check's answer is the same whichever way it comes out.

**Draft the anchor descriptors with therapists.** The anchors are the instrument, section 2.3, and they are the one part of the surface that a therapist is better placed to write than a designer. Study 1 is the instrument for telling a good anchor from a bad one.

**Print what the audio means.** Two of the five Autonomy gradients sound between semitones, section 8. A notation path that can print those pitches would close the divergence of section 8.1 at Follower and Partner rather than declaring it. Until then the declaration is what a reader gets, and it is accurate.

**Let the agreement log say which distinctions carry.** Version one ships two of Bruscia's six profiles. The principled route to a third is the log: a distinction that a therapist makes, that the instrument renders, and that a listener can hear, has earned a place. Adding profiles on the ground that Bruscia wrote six is how an instrument becomes a form.

**Render the relation between the two voices, not only each voice.** This paper renders one voice per stave from one state. The framework's interaction mapping renders the relation between voices, and the two-voice case is the one MPN-S5 identifies as the place where half the interaction measures go quiet by construction and the surviving ones are latency, overlap and backchannel [5]. A therapy instrument that rendered the relation would be rendering the thing Bruscia's Autonomy profile is about, and it is the largest single extension available from here.

**Measure the timbre space's resolution.** Part D of the listening pack, which is what turns section 11.2's audible fraction from an arithmetic property into a statement about two voices a therapist can tell apart.

## 15. References

[1] J. McKenney, "The McKenney-Lacan psychometric calculus: a theory of musical representation for psychological state," MPN-S1. The nine-component state, the simplex constraint on the three registers, the master transformation, the assertion register with its failure conditions, and the amendment that makes the two texture quantities orthogonal.

[2] J. McKenney, "The formal apparatus," MPN-S2. The geometry of the simplex; the kite result giving the area inside the interpolation margin as $2\delta - \delta^2$, which section 6.2 checks against; the lemma on the largest-of-three selector and the tripod, which section 4.3 disposes of; the correlation bound on two weighted sums of the same inputs; and the Cayley metric on the 24 consonant triads, diameter 5.

[3] J. McKenney, "The mapping: from psychological state to musical material, parameter by parameter," MPN-S3. Section 2.1 dynamics and the pre-image rule; 2.2 the tempo clusters and the metre lookup; 2.3 the mode, the live pitch table, the tie, modal interpolation and its four properties, the quarter-tone worst case, and the listening pack's Part B; 2.4 the two texture ladders at even fifths; 2.5 the harmonic operator in the absolute form at $k_{\max} = 23$; 2.6 the timbre map, its rank and its null direction.

[4] J. McKenney, "The application," MPN-S4. Cited here for the determinism finding on the score path and for the condition that a stimulus set published for reuse be published as audio.

[5] J. McKenney, "Decomposing dialogue: four use cases for one engine," MPN-S5. Cited for the two-speaker case, where adjacency is alternation, reciprocity is 1 and floor share is one number and its complement, and the surviving measures are latency, overlap and backchannel.

[6] J. McKenney, "The expression surface," MPN-S6. The companion paper on rendering the shape of an exchange as sound and image, and the source of the append-only timbre placement rule that lets a cast grow without re-voicing anyone.

[7] "One engine, several surfaces," MPN-DESIGN-01, `08_PAPERS/DESIGN-UNIFIED-FRAMEWORK-rev8.md`, revision 8. Decision D4 withdraws the derivation of the Autonomy gradient from turn structure on the finding that Leader and Resister are not separable by any monotone function of timings. Section 11 is the ruling that the Autonomy-to-register mapping survives, that Partner takes no dead band, and the four conditions this paper closes. Section 5b is the timbre channel.

[8] "The instrument," MPN-PRD-01, `08_PAPERS/PRD-MPN-THERAPY.md`, draft 6. Section 3.3 is the rule that the therapist-facing surface speaks the Improvisation Assessment Profiles, the Nordoff-Robbins agreement result, and Wigram's two profiles; 5.2 the five ratings and the naming rule; 5.4 the mapping back to the theory; 6.2 that the therapist's five gradients are the state; 6.3 the Autonomy-to-register table; 6.4 the interaction budget; 6.5 the agreement log; 7.3 the reporting checklist; 7.4 the explanation, whose worked trace section 10.4 develops; 7.5 determinism; 7.6 the two-node timbre case and the audible-fraction requirement.

[9] `05_DATA/03_generators/s7_therapy_conditions.py`, new with this paper, with its output committed beside it at `S7-THERAPY-CONDITIONS-OUTPUT.txt`. Source of every computed figure in sections 5 to 11: the five triples and their nine asserted properties; the collapse check on both bands, both rounding conventions and the audio path; the margin scan from 0.001 to 0.400 and the first change at 0.276; the 848-pair sweep behind the lead rule; the 6,080 Real-led states per band; the edge scan at a step of $1/2000$; the divergence table; the gradient-to-state map search and the asymmetry result; the worked session; and the timbre audible fractions. It runs 55 assertions over its own results and exits non-zero if any fails. All 55 pass.

[10] `05_DATA/03_generators/s7_blocking_numbers.py`. The source of the mode machinery this paper's generator restates: `MODES`, the `LIVE` pitch table, `weights()` and `blended_scale()`. Also the source of the reasoning on $k_{\max}$ that section 14 reports: the neo-Riemannian generators as fixed-point-free involutions, the transitive action, the Cayley diameter of 5 and the distance distribution 24, 72, 144, 192, 120, 24 over the 576 ordered pairs, the LR Hamiltonian cycle, and the reach comparison that makes 23 the single value at which the absolute and relative forms share a codomain.

[11] K. Bruscia, *Improvisation Assessment Profiles*, 1987, as summarised by the Technical University of Applied Sciences Würzburg-Schweinfurt. Six profiles, five gradients each; the Autonomy gradients are Dependent, Follower, Partner, Leader and Resister, and the profile deals with the kinds of role relationships formed between the improvisers. https://ifas.thws.de/en/high-m/theory/improvisation-assessment-profiles-iap/

[12] Mahoney, "Interrater agreement on the Nordoff-Robbins Evaluation Scale I: Client-Therapist Relationship in Musical Activity," *Music and Medicine*, 2010. 34 certified music therapists, 10 video excerpts, 78 per cent of all raters within one point of the group mean, 82 per cent among trained and 74 per cent among untrained raters.

[13] "Tony Wigram's contributions to the assessment of children with autism and multiple disabilities," *Voices: A World Forum for Music Therapy*. The source of the two-profile selection and of the glosses on Autonomy and Variability quoted in section 1.4.

[14] S. L. Robb, J. S. Carpenter and D. S. Burns, Reporting Guidelines for Music-based Interventions, with the 2025 revision of the checklist: eight components across twelve items.

[15] "A focused survey of generative AI-based music therapy systems: recent progress and open challenges," *Applied Sciences*, 16(9), 4120, 2026. Five systems reviewed; interpretability reported as an open challenge; therapeutic intent injected after the fact through textual prompts; the circumplex of arousal and valence as the affective model the area uses.

[16] "Classifying technologies during the assessment, treatment planning, documentation and evaluation phases of music therapy: a survey of board-certified practitioners," *Proceedings of the ACM on Human-Computer Interaction*, 2024. 104 respondents. In-session technology led by electric and electronic instruments at 42.3 per cent and digital audio workstations at 21.2 per cent; documentation and evaluation at 26 and 21.2 per cent on health record software; training and access named as the barriers.

[17] Gassner, Geretsegger and Mayer-Ferbas, "Effectiveness of music therapy for autism spectrum disorder, dementia, depression, insomnia and schizophrenia: update of systematic reviews," *European Journal of Public Health*, 32(1), 27, 2022. 10 randomised trials, 1,248 patients.

[18] Geretsegger et al., "Music therapy for autistic people," Cochrane Database of Systematic Reviews, CD004381.pub4, 2022. 26 studies, 1,165 participants, with the GRADE certainties quoted in section 12.2.

[19] Bieleninik, Geretsegger, Mössler et al., "Effects of improvisational music therapy vs enhanced standard care on symptom severity among children with autism spectrum disorder: the TIME-A randomized clinical trial," *JAMA*, 318(6), 525, 2017. 364 children, 10 centres, 9 countries; primary outcome difference 0.06 (95 per cent CI −0.70 to 0.81).

[20] Magee, Clark, Tamplin and Bradt, "Music interventions for acquired brain injury," Cochrane Database of Systematic Reviews, CD006787.pub3, 2017. 29 randomised trials, 775 adults; gait velocity +11.34 m/min (8.40 to 14.28) at moderate quality.

[21] Ghai, Ghai, Schmitz and Effenberg, "Effect of rhythmic auditory cueing on parkinsonian gait: a systematic review and meta-analysis," *Scientific Reports*, 8:506, 2018. 50 studies, 1,892 participants; fast-paced cueing g 0.70 (0.50 to 0.89), slow-paced g −0.24.

[22] van der Steen et al., "Music-based therapeutic interventions for people with dementia," Cochrane Database of Systematic Reviews, CD003477.pub5, 2025. 30 studies, 1,720 randomised, with the estimates quoted in section 12.2.

[23] "The major-minor mode dichotomy in music perception: a systematic review on its behavioural, physiological and clinical correlates," bioRxiv, 2023. The developmental series from 58 per cent at age four to 92 per cent in adults, the Japanese and Chinese replications, the tone-scramble result, and the minimal-exposure finding.

[24] Drake and Botte, on relative just-noticeable differences for tempo: about 6 per cent for a single interval and about 3 per cent for a six-interval sequence, over interonset intervals from 100 to 1,500 milliseconds. Carried here through MPN-S3 section 2.2 [3].

[25] `06_APPLICATIONS/04_therapy_usecase/research-a1-music-therapy-evidence.md`, the programme's own evidence review, prepared 12 September 2026, in which every numeric claim is marked verified against a fetched page or marked unverified with no numbers given. Source of the figures in section 12.2 and of their provenance. Its own gaps section names what it could not read, and those gaps travel with the figures.

[26] T. K. Koo and M. Y. Li, "A guideline of selecting and reporting intraclass correlation coefficients for reliability research," *Journal of Chiropractic Medicine*, 15, 155, 2016. The reporting convention Study 1 uses.

[27] `DECISION-LOG-2026-09-14.md`. The author's decisions of 14 September 2026, including the one that makes the mapping emit the blended degree in cents and puts the rounding on the notation renderer, which is what section 7 declares a convention for.

[28] `MPN-NOTE-05-blocking-numbers.md`, 14 September 2026. The estimate on $k_{\max}$ and the rounding rule that section 14's first item draws on.
