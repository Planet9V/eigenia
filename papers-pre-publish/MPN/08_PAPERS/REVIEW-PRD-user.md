| Field | Value |
|:---|:---|
| Designation | REVIEW-PRD-user |
| Reviews | MPN-PRD-01, `PRD-MPN-THERAPY.md`, draft 6 |
| Role | User Advocate |
| Date | 14 September 2026 |
| Reviewer's standing | I stand for the board-certified music therapist who holds this instrument and for the client in the room with them. I am not the Skeptic, I am not a regulatory reviewer, and I am not the author |
| Scope accepted | The ruling of 13 September 2026: theory, internal private use, synthetic material, no people, no regulation. No finding below is legal, consent-based or compliance-based, and none asks for one |
| Also read | `DESIGN-UNIFIED-FRAMEWORK-rev8.md` sections 4.4, 5a, 5b, 6.3 and 7; `DECISION-LOG-2026-09-14.md`; `gen7/LISTENING-PACK-FACILITATOR.md` |
| Prior review | None. Draft 6 has never been reviewed. Drafts 1, 2 and 3 were returned by other reviewers at fifteen, six and four blocking |
| Findings | 22 |
| Blocking | 17 |
| Disposition | **REVISE** |

## How this review was conducted

I walked six moments end to end, in the order a therapist meets them, and recorded every place the document stops short of the moment. Where the draft names a screen, I asked what is on it. Where it names a number, I asked what the person reading it does next. Where it names a requirement, I asked whether the person the requirement protects is the person in the room.

Two general observations govern several findings and are stated once here rather than repeated.

The first is that draft 6 was produced by deleting material rather than by rewriting around the deletions. The old section 8 and most of the old section 10 are gone, and seven cross-references into them survive. Four of those seven carry therapist-facing obligations, so the draft promises the therapist a protection and then points at a section that is no longer in the document. Findings 9 and 22 are the two where the loss is load-bearing.

The second is that the draft has two different people at the desk and does not know which. Section 6.4 has a therapist attending to a person in front of them rather than to a screen. Section 10 has the author. Sections 3, 7.3 and 11.4 have a credentialed clinician with a real caseload; sections 4.1 and 12 have nobody at all. Every requirement written for one of those people is wrong for at least one of the others, and the therapist reading the document cannot tell which one they are. Finding 21 states it; findings 12, 19 and 21 are its consequences.

## Moment 1: the therapist rates five gradients at the end of a session and the instrument renders it

### 1. The instrument has no opening state, and the first moment of the first session falls outside the only interaction budget in the document. BLOCKING

The person is a board-certified music therapist who has just finished a session with a new client and has opened the instrument for the first time with that client. The moment is the one immediately after the tool loads and before anything has been rated.

What they see is not stated anywhere in draft 6. The document never describes an opening screen, a client record, a session object, a way to say which client this is, or a way to say that this is a new moment rather than a continuation of the last one. Section 6.4 fixes the budget at under ten seconds and no more than five interactions, and the sentence that makes that budget achievable is "Five gradients, one tap each, defaults carried forward from the previous moment." At the first moment of a first session there is no previous moment and there are no defaults to carry. The document's own refusal rule, in the same paragraph, covers only the case of an unresolved analyser proposal with no carried-forward value, and it refuses to render. So on the reading the draft actually supports, the instrument refuses at the opening of every first session, which section 7.1 of the design correctly identifies as the one moment that occurs in every session in the caseload.

What goes wrong is that the therapist's very first encounter with the instrument is the encounter the document has not specified, and it is also the encounter section 3.2 says decides adoption, since the barrier the 104-respondent survey names is lack of training and the draft's answer is a tool "useful in the first session without a course". A tool whose first ten seconds are undefined does not clear that bar. The fix is small and the omission is not: state the opening state, state whether the five gradients begin unset or at a stated neutral level, state whether an unset gradient blocks rendering or renders with a declared substitute, and state what the budget is for a moment with no predecessor.

### 2. There is no way to start the sound, and the therapist is never told what they are about to hear. BLOCKING

The person is the same therapist, ten seconds later, with five gradients set. The moment is the one between the last tap and the first note.

What they see is governed by exactly two sentences in the document. Section 10 says nothing plays unbidden, with no autoplay, no preview on hover and no sound on load. Section 10 also says there is one stop control in a fixed position that reaches silence inside 200 milliseconds. Gate G0 tests both of those. Neither the document nor the gate says how sound starts. There is no play control specified, no render trigger, no statement of whether rendering is instantaneous or takes seconds, and no statement of what the instrument shows while it works.

More seriously, nothing in the draft says how long the passage is. Not in bars, not in seconds, not as a range, not as a setting. A therapist at the end of a session, with a client who may still be in the room and a next appointment behind them, presses something and does not know whether it commits them to eight seconds or to three minutes, or whether it loops. The same gap reaches notation, where section 7.1 promises one stave per voice "in the therapist's configuration" and the document never says where a voice configuration is made or what it defaults to, and it reaches MIDI and audio export, where nothing says whether export is per passage or per session.

What goes wrong is that the instrument's only specified audio behaviours are a prohibition and an interruption. That is a coherent safety posture and it is not a playback design. Specify the start, the duration and what the screen shows in between, and put the start in G0 beside the stop, because a gate that tests only the ability to stop sound does not test that sound can be produced at all.

### 3. Nobody on the therapist's surface assigns the DISC profile, and the shipped default is the one profile the channel cannot carry. BLOCKING

The person is the therapist, and the moment is the first render, at which gate G1 requires "DISC assigned per character so the timbre channel renders".

Section 7.6 says throughout that "the author assigns it". Section 5.4's table says "Assigned per character". Neither sentence names the therapist, and the therapist is not the author of the paradigm client in any ordinary reading of sections 3 and 6. So the draft requires an assignment for the channel to render, shows the consequences of that assignment on the therapist's screen, and never says who makes it, when in the flow it is made, or on what surface. A therapist who opens the instrument and rates five gradients has assigned nothing.

What they get instead is recorded in the design and not in the PRD. Design section 5b.6 establishes at path and line that the reference implementation's default "puts every unnamed character at the centre of the reachable set", which design section 5b.2 identifies as exactly the point the channel is deaf at, and states that this "is not a risk to be managed by whoever assigns profiles. It is what the product does today for every character nobody has named." The PRD states no default at all. So the therapist who never finds the assignment surface renders every character at the deaf point, and the audible-fraction display required by section 7.6 will read at or near zero for a reason the therapist did not cause and cannot diagnose from anything in this document.

What goes wrong is that the only quantity in the instrument that the therapist is required to see and has no authority over is also the one whose default is known to be broken. Either name the therapist as the assigner and give them a surface, or state the default profile pair explicitly in the PRD and state that the therapist cannot change it, and in either case say so in section 7.6 where the number appears rather than leaving it in a design document the therapist will not read.

## Moment 2: the audible fraction

### 4. The audible fraction is a number on a clinician's screen with no threshold, no remedy and nobody to take it to. BLOCKING

The person is the therapist. The moment is any render in which the instrument has computed the audible fraction of the assigned pair, which section 7.6 requires on every assigned pair and G1 requires computed and shown.

What they see is a number. The document does not say what the number is called on screen, what its range is, which direction is good, what a typical value looks like, or what value is bad. Section 7.6 says an assignment "that comes out near zero is declared", and near zero has no value. This is not my inference: design section 10 lists among the numeric parameters the programme has left unfixed "the audible-fraction threshold of section 5b, which PRD section 7.6 leaves as near zero with no value in either document". Both documents know the number is missing and neither supplies it.

The concrete case is available and makes the point sharper than an abstraction does. Design section 5b.2 works a pair that differs by 0.2 on three coordinates and 0.1 on the fourth and returns 0.240, with the comment that three quarters of the difference is inaudible. A therapist shown 0.240 has no way to know whether that is a warning, a curiosity or a normal reading, because 0.240 is not near zero and it is also not audible in any useful sense.

What goes wrong is worse than the missing number, and it is the part I want the author to sit with. Even with a threshold, the document attaches no action to the reading. The therapist cannot reassign the profile, because finding 3 establishes there is no assignment surface for them. They cannot suppress the timbre channel, because no such control exists. They cannot ask the instrument for a better pair, because no such affordance is specified. So the best case is a therapist who understands the number perfectly, is told that the two characters are inaudible through timbre, and can do precisely nothing about it, in a session, while a client waits. A diagnostic with no action attached is not a safeguard; it is a message that the instrument is broken and the therapist may not fix it. Supply the threshold, supply at least one remedy the therapist can reach from the screen the number is on, and if the only remedy is to change the assignment, then finding 3 must be closed first.

### 5. The declaration the audible fraction depends on is routed through a collapse check that section 6.3 does not contain. BLOCKING

The person is the therapist at the same screen. The moment is the one in which the instrument tells them the assignment is deaf.

Section 7.6's final requirement is that a near-zero assignment "is declared on the therapist's screen in the same way a collapsed mode channel is, under the rule of section 6.3's collapse check". I read section 6.3. It contains the five-row Autonomy-to-register table, a warning that the mapping has no empirical warrant, and a warning about the tripod. There is no collapse check in it, no declaration rule, and no description of what a collapsed mode channel looks like on any screen.

The collapse check exists, but it is in design section 11, as the second of four conditions on the Autonomy mapping: enumerate the five triples against the chosen margin, count the distinct modal outputs, and "if it is fewer than five, either widen the triples or declare the collapse on the therapist's screen. A flat output from a collapsed channel and a flat output from a flat state must not look alike." Section 14 of the PRD lists that condition as live work. So the PRD's timbre requirement inherits its user-facing behaviour from a rule that lives in another document, is not yet performed, and has no specified appearance.

What goes wrong is that the one sentence in the whole draft that tells the therapist how a dead channel will look on their screen resolves to nothing. Both of the instrument's two known silent-failure modes, a collapsed mode channel and a deaf timbre assignment, depend on it. Write the declaration rule into section 6.3, say what the therapist sees, and say how it differs from the appearance of a genuinely flat state, which is the distinction the design says must be preserved and which no text in the PRD preserves.

## Moment 3: Partner, and what a good session sounds like

### 6. The clinical high point renders as the blandest passage in the set, the programme knows it, and no therapist-facing text in this document says so. BLOCKING

The person is the therapist, the next morning, listening back to a session that went well. The moment is the passage rendered from Partner, the Autonomy gradient that Bruscia defines as mutual partnership and that Wigram used to record a child's readiness to interact, share and take turns.

What they hear is the even blend of three scales. Design section 11 states it in the ruling's own words: "mutual regulation sounds like the even blend of the three modes", and, approvingly, "Nobody fitting a mapping for elegance lands on the mean of three scales." The listening pack is blunter still. Part T of `LISTENING-PACK-FACILITATOR.md` puts to music therapists "the one design decision most likely to be wrong at a desk, that the balanced middle of the Autonomy gradient renders as the blend of three scales and so is the least distinctive sound in the set."

So the programme has identified this as the design decision most likely to be wrong at a desk, has built a listening pack part to ask therapists about it, and has shipped a PRD that does not mention it. Section 6.3's row for Partner reads "Balanced, near the barycentre", and its two warnings are about empirical warrant and about the tripod, neither of which a therapist would recognise as a statement about what they will hear. Section 14 records the four conditions and says nothing about the sound. The one place the draft does describe the Partner sound to the therapist is the section 7.4 explanation, and finding 7 establishes that what it says there is wrong.

What goes wrong is the trust relationship, and it goes wrong in the least recoverable direction. A therapist listening back to a strong session hears mush. The obvious inference, and the correct one on the evidence available to them, is that the instrument is not tracking what happened in the room. They will not infer that the mush is the prediction. Every subsequent flat passage confirms the first conclusion, and the instrument is discredited by exactly the sessions it should be strongest on. I accept the ruling in design section 11 entirely and I am not asking for a dead band, which that ruling shows would be worse. I am asking for a sentence. The therapist is told, before the first Partner render and again on the face of the passage, that a balanced relational stance renders as the blend and is the least distinctive sound the instrument makes, and that this is the prediction rather than a failure. The two warnings that section 6.3 requires to survive into the code comments protect a future implementer. Nothing in this draft protects the therapist, who is the only person who will ever hear the passage.

Two supporting points. The instrument is at its most distinctive at Resister and Dependent, which is to say at the two gradients a therapist is least likely to need help hearing, and at its least distinctive at the one that is hardest to hear and most worth recording. And design section 11's own collapse-check condition establishes that Dependent and Follower may also return the same mode, so version one may reach the therapist with three of five gradients sounding alike and only two distinct. Finding 5 is why they would not be told.

## Moment 4: the passage lands badly

### 7. The one explanation fixture in the document misdescribes the engine in three places, and each error is one a therapist would repeat out loud. BLOCKING

The person is the therapist reading the section 7.4 explanation, which the draft calls the differentiating output and offers as the answer to the question a clinician asks after every surprising output. The moment is the one in which they read it and believe it. Section 7.4 designates this fixture the first entry in a golden-output suite, which means it is also the text the build will be held to.

Three of its five sentences do not describe the engine this document specifies.

"Partner sits between leading and following, so no single mode was clearly indicated and the music blends the two nearest rather than jumping between them." Design section 11's ruling, which the PRD's own section 14 adopts, puts Partner at the barycentre, where the blend is of three modes and not two, and where the interpolation weights are equal. The fixture also says no single mode was "clearly indicated", which tells the therapist the instrument was uncertain at precisely the point the ruling establishes as the most stable point on the simplex and the one the interpolation was built to make well defined. So the sentence misstates the arithmetic and inverts the epistemic status, and a therapist repeating it to a supervisor says the instrument was unsure when the design says it was at its most determined.

"Session intensity at 4 of 5 set the volume to the fourth of eight levels and widened the chord movement by one step." The eight dynamic levels are right, per decision 6. The chord movement is not. Decision D-2026-09-14-B replaced the relative form, a move of size round of k-max times delta from the chord already sounding, with the absolute form, chord position equal to round of 23 times f of the state around the LR cycle from a fixed origin, on the express ground that the relative form read a previous chord and cost A11 its decomposability. The fixture describes the withdrawn form. A therapist reading it believes the harmony moved from where it was, when the engine now places it from a fixed origin, and that difference is exactly the one that matters at the opening of a session, which the decision log names as the first-frame problem.

"Variability at 2 of 5 kept the melody whole rather than breaking it into fragments." Fragmentation is not a function of variability alone. Design section 10 states the ladder as the positive part of 0.7 times entropy minus 0.3 times trauma, over 0.7, which in product vocabulary means fragmentation depends on musical variability and on session intensity together. The fixture attributes to one rating an outcome two ratings produced, which is the single failure mode the explanation exists to prevent: it answers "why did it do that" with the wrong cause. A therapist who then lowers session intensity and watches the melody fragment has been told something false by the output the document calls its differentiator.

What goes wrong is that the fixture is not an illustration. It is the specification of the differentiating output and the first test the build must pass, so every one of these errors is a requirement on the implementation. Rewrite it against the engine as decided on 14 September 2026, and add a rule that the fixture is re-derived whenever a mapping decision lands, because this one survived a decision taken the same day the draft carries.

### 8. The explanation closes with a promise section 7.5 withdraws two pages later. BLOCKING

The person is the therapist, and the sentence is the last one in the fixture: "Nothing here was chosen at random, and setting the same five ratings again produces the same music."

Section 7.5 says why that is not true. The rendered passage is a pure function of the state, the configuration and the seed; a change to the seeding algorithm changes every stimulus in the programme; and the record therefore has to carry the seed, the seed algorithm version, the ruleset version and the application build, "because a version quartet is a promise and a waveform is a record". Design section 6.3 goes further and calls a patch that changes rendered output a stimulus-version bump. So the true sentence is that setting the same five ratings again produces the same music on the same build, with the same ruleset, the same seeding algorithm and the same configuration.

What goes wrong is specific to who reads this sentence. Section 7.4 requires the explanation to be deliverable to a client or their advocate, and the therapist is the person who will say it out loud. A therapist who has told a client that the same ratings give the same music, and who then cannot reproduce last week's passage, has been made to break a promise the instrument wrote for them. Qualify the sentence in the fixture, in the vocabulary section 5.2 permits, and see finding 15 for the notice that has to reach the therapist before the session in which it matters.

### 9. Nothing enforces the explanation's vocabulary, because the section that enforced it was deleted. BLOCKING

The person is the therapist, or a client reading over their shoulder, or a supervisor. The moment is any render whose explanation the generator writes.

Section 5.2 states the naming rule and then states its enforcement in one sentence: "Section 8.4's golden-output test is what enforces this on the explanation, which is generated and therefore cannot be checked by reading the source." Section 7.4 repeats the pointer: "This is the first fixture in section 8.4's golden-output suite." Draft 6 has no section 8.4. Section 8 is now eight paragraphs with no subsections, and the golden-output suite is not among them. The only surviving instance of the mechanism is in design section 6.3, where a golden-output regression suite is specified over the Phi path for a completely different purpose, which is detecting divergence between the pinned build and head.

What goes wrong is that the rule barring trauma, entropy, Real, Symbolic, Imaginary, curvature and health from every surface a client or non-specialist can reach now has no test behind it, on the one surface the draft itself says cannot be checked by reading the source. The instrument can emit the word Imaginary to a client and nothing in draft 6 catches it. This is the clearest instance of the deletion problem: the discipline survived into section 8's surviving paragraph, and the mechanism that applied it to the generated text did not. Restore the golden-output suite as a numbered requirement, name the forbidden vocabulary as a list the test can run against, and put it in G0, since it protects the therapist from the first render onward and not from G2.

### 10. The explanation is not a sentence a person can say out loud, and read aloud it tells the client how the therapist rated them. Not blocking

The person is the therapist who has to say something to a client or to a supervisor, which is the test the brief sets and the test section 7.4 implicitly claims to pass.

The fixture is five sentences and about ninety words. Said aloud, it opens "You set relational stance to Partner and musical variability to 2 of 5." Two things follow from that opening. The first is that it is machine prose: it proceeds input by input, names an eight-level volume ladder and a chord movement measured in steps, and answers the question "what did the software do" rather than "what did you hear and why". A therapist can read it silently and follow it. A therapist cannot say it to a client without sounding like a manual, and a therapist saying it to a supervisor is describing a parameter chain rather than a session.

The second is sharper. Delivered to the client, the first clause discloses the therapist's own clinical rating of that client's relational stance, in the session it was made, in a plain word the client will understand. That may be exactly right in some therapeutic relationships and exactly wrong in others, and the decision belongs to the therapist and not to a template. Draft 6 requires the explanation to be deliverable to a client, through a pointer to a section it has deleted, and never once tells the therapist that delivering it discloses their rating, or offers a form of the explanation that describes the music without quoting the judgement.

What I would want instead is not more text. It is one sentence at the top, in the therapist's register, that can be said out loud on its own: something of the form "this is what mutual partnership sounds like in this instrument, and it is the least distinctive sound it makes." The parameter chain then follows for the reader who wants it. I mark this REVISE rather than blocking because the fixture can be rewritten without changing any mechanism, but I note that it is the output this document stakes its differentiation on, and as written it differentiates on the presence of a rule chain rather than on anyone being able to use one.

### 11. A passage the therapist stops leaves no trace in the session record or in the agreement log. BLOCKING

The person is the therapist and the client together. The moment is the one the brief names: a passage lands badly, and the therapist reaches for the stop.

What they see is what section 10 specifies and it works: one control, fixed position, silence inside 200 milliseconds. What happens next is not in the document. The session record of section 7.3 captures the state, the rules that acted on it, the musical material and the delivery schedule, all automatically, and has no field for a passage that was stopped. The agreement log of section 6.5 writes a row only at moments where the analyser proposed, and its four outcomes are accepted, edited, rejected and unresolved, all of which describe the therapist's relationship to a machine proposal and none of which describes their relationship to a rendered passage. So the instrument records the rating that produced the passage and does not record that the passage was killed two seconds in.

What goes wrong runs in two directions at once. For the therapist, the record they export to their EHR says a passage was delivered when what happened was that it was stopped, which makes the record wrong about the only clinically significant event in that moment. For the programme, the single most informative signal the instrument can generate, a credentialed clinician judging in real time that this rendering was wrong for this moment, is discarded. Section 11.4 calls session-derived data indexed to a real clinical moment the first object in the programme's history that would be evidence, and the stop is the strongest such datum available, free at the point of use, and uncaptured.

Add a stop event to the session record with the passage identifier and the elapsed time, and say in section 10 what the instrument shows after silence: whether the passage is retained, whether the state is still set, whether the therapist can re-render, and whether they can mark the passage rather than only silence it. At present the specification ends at silence.

### 12. Section 10's four requirements were rewritten for the author at a desk, and the therapist is never told what to do next. BLOCKING

The person is the therapist. The moment is any moment in which a passage is wrong for the room, which is a normal event in an instrument whose mapping the document repeatedly and correctly says has no empirical warrant.

The brief asks whether the four surviving requirements are enough for that moment. Read them in the order the draft gives. Nothing plays unbidden is a prohibition and holds. A stop that is immediate is an interruption and holds. The arc has a return in it is a property of the generator and holds, and it is the strongest of the four. The bound on intensity is a compositional control, not a guard, and is a setting with no numbers, no surface and no owner, which is finding 14.

Two of the four are therefore about preventing sound and one is about the shape of a generator. None of the four is about what the therapist does after a passage has already landed badly, and that is the moment the brief asks about. The document gives them silence and then stops.

The reason is visible in the section's own text. Section 10's justification for the prohibition reads "A tool that makes noise when you did not ask is a bad tool whoever is listening, and the author is the one at the desk." The four requirements were rewritten around a solo author with no client, no session and no time pressure, and gate G0 then applies them to a gate named "usable at the desk". For an author, silence is a complete remedy, because the author can simply try again. For a therapist mid-session, silence is the beginning of a problem: there is a person in the room who just heard something that did not land, the therapist has to say something, and the instrument has nothing to offer. I am not asking for a safety rule, and under the scope ruling there is none to ask for. I am asking for instrument design for the second user the document keeps naming: what the screen shows after a stop, whether the previous passage is one control away, whether the state that produced it is still visible and editable, and whether the therapist can render a gentler version of the same state without re-rating five gradients under time pressure. All four are design questions and none of them is answered.

### 13. Session intensity is called an arc and the therapist is never shown the arc. Not blocking

The person is the therapist. The moment is the third or fourth rating in a session.

Section 5.2 defines session intensity as "Where this moment sits in the arc the therapist is shaping". Section 10 requires the generator to handle a falling arc as a first-class case, and does so on a good musical argument. Nothing in the document shows the therapist the arc. There is no view of the intensity ratings already set in this session, no indication of where the current moment sits relative to them, and no sequence display of any kind. The rating is defined relative to a shape only the therapist holds in their head, on a five-point scale, under a ten-second budget, while attending to a client.

What goes wrong is that the one gradient defined by its relation to the other moments in the session is the one the therapist rates blind. A running display of the session's intensity ratings is cheap, is a by-product of data the instrument already holds, and would make the fourth requirement of section 10 usable rather than merely implemented.

### 14. The intensity bound has no numbers, no surface and no owner. Not blocking

The person is whoever shapes the passage. Section 10 keeps "a ceiling on dynamic range, tempo and harmonic distance" as a compositional control applied at generation so that it travels into MIDI and audio export, which is the right place to apply it. The draft states no default for any of the three, no range, no unit, no surface on which any of them is set, and does not say whether the therapist may set them or only the author. The old per-client intensity ceiling enforced in the renderer is deleted along with its rationale, and nothing takes over its concrete content.

What goes wrong is that a requirement written to give an author expressive control reaches the therapist as three unnamed numbers they cannot see or change, and section 7.5's determinism claim quietly depends on them, since they are part of the configuration. See finding 16.

## Moment 5: determinism as the therapist experiences it

### 15. A rendering change reaches the therapist during the session rather than before it, and the audio record is conditional on a decision nobody specified how to make. BLOCKING

The person is the therapist, and the client is the one who pays for this. The moment is a session in the week after a build lands, in which the therapist replays what this client heard last week.

Section 7.5 is right about the stakes and states them better than I could: "if a therapist cannot reproduce what a client heard last week, the record is not a record". It then specifies the record as carrying the seed, the seed algorithm version, the ruleset version and the application build, "and where a passage matters clinically, the rendered audio itself".

Two things are missing and both land on the therapist in the room.

The first is notice. Nothing in the PRD tells the therapist, before a session, that the rendering has changed. The version quartet is in the record, which is where they look afterwards, and the difference is something they discover by hearing it, in front of the client, when a familiar passage comes out different. The design already fixes this and the PRD does not carry the fix. Design section 6.3 requires that "the stimulus version is on the therapist's screen, and a rendering change is surfaced to the clinician before a session rather than only to the study", and gives the reason in the therapist's own terms: "the person who needs to know the material changed is the one who will otherwise read a different response from a client as a change in the client." That sentence is the strongest user-facing requirement in either document, it belongs in the PRD, and it is not in it. The consequence of leaving it out is not an inconvenience. It is a therapist attributing to a client a change that was a software release, which is a clinical misreading the instrument caused.

The second is the retention rule. "Where a passage matters clinically" is a judgement, and the draft does not say who makes it, at what moment, or what happens when it is made late. A therapist cannot reliably know at render time which passage will matter in eight weeks. If the audio is retained only for passages flagged at the time, then every passage that turns out to matter later is unrecoverable after the next bump, and the document's own standard, that a waveform is a record and a version quartet is a promise, is met only for the passages somebody happened to predict. Either retain the audio for every rendered passage in a session record, or state the flagging moment, the person and the default, and state what the therapist sees when they ask for a passage the instrument no longer holds.

### 16. The configuration is inside the determinism function and outside the record. BLOCKING

The person is the therapist trying to reproduce a passage. The moment is the attempt.

Section 7.5 states that "every rendered passage is a pure function of the state, the configuration and the seed". The record it then specifies carries the seed, the seed algorithm version, the ruleset version and the build. The configuration is not in that list, and the configuration is not empty: section 7.2 requires mode selection to be configurable per client, section 7.1 requires a per-voice stave configuration, section 10 carries three intensity ceilings, and section 7.6 implies a per-character DISC assignment. Every one of those changes the rendered output.

What goes wrong is that a therapist holding a complete record as the document defines it still cannot reproduce the passage, because one of the three arguments to the function the document names is missing from the record. This is a small fix and a total failure of the property section 7.5 says the record exists to have. Put the configuration in the record, and say which parts of it are per client, per session and per passage, because a client-level mode setting changed between sessions is exactly the case that makes two identical ratings sound different.

### 17. Per-client mode selection is required, declared clinical, and empty. BLOCKING

The person is a client outside the Western listening tradition, and the therapist who is treating them. The moment is the first render for that client.

Section 7.2 is careful and correct about the evidence: the major-happy and minor-sad association is robust and reaches 92 per cent in adults, it does not hold for listeners with minimal exposure to Western music, and around 70 per cent of listeners perform near chance on rapid tone-scrambles. It concludes with a requirement in bold: "Mode selection is configurable per client, because the review's cross-cultural finding means a fixed mapping is wrong for a client outside the Western listening tradition. This is a clinical setting, not a preference."

The draft then supplies nothing to configure. There is no second mode table, no alternative mapping, no list of the options, no default, no surface, no guidance on how a therapist would decide, and no statement of what happens to the section 7.4 explanation when the mapping is not the shipped one. The therapist has been told, in the document's strongest register, that the instrument is wrong for this client, and handed a setting with no content.

What goes wrong is that the requirement transfers a problem the programme has not solved onto the person least equipped to solve it under the most time pressure. If the honest position is that version one carries one mapping and the therapist should know it is culturally conditioned, say that, and say it in a sentence the therapist can use with the client. What is not tenable is a bolded clinical setting with no settings in it.

## Moment 6: the defaults the therapist actually meets

### 18. The ten-second budget and the written anchors cannot both be satisfied, and Study 1 measures the act the budget forbids. BLOCKING

The person is the therapist. The moment is the five taps.

Section 6.2 says the anchors are the instrument and the numbers are a convenience, and requires a written anchor descriptor at every level of every gradient. That is twenty-five descriptors. Section 6.4 requires the state to be set in under ten seconds and no more than five interactions, at one tap per gradient. Two seconds per gradient does not admit reading a five-way anchor set; it admits tapping a remembered position on a scale. So in the session the therapist is not using the instrument the document says the instrument is, and the anchors are doing their work only in memory and only after the therapist has learned them.

That would be a reasonable design tradeoff if it were stated, and it is not stated anywhere. It also has a consequence for the evidence. Study 1 in section 11.1 measures agreement between raters working "independently against the written anchors", on excerpts, with no time pressure and no client present. Whatever quadratic-weighted kappa that study returns describes careful anchor-reading, not the two-second tap that section 6.4 requires in session. The gate at G2 then licenses a claim on the strength of a study that measured a different act from the one the instrument performs.

Say which act the instrument is for. If it is the two-second tap, then Study 1 should be run under something like session conditions on at least one arm, and the anchors should be designed to be recognised at a glance rather than read. If it is the considered reading, then the budget is wrong and the interaction design should let a therapist rate after the session rather than in it, which section 6.4's own framing about prepared use already half concedes.

### 19. The anchors do not exist, two of the five gradients have no provenance, and the seed corpus is thirteen plays. Not blocking

The person is the therapist reading an anchor for the first time. Gate G0 requires that "the five gradients have written anchors", so the absence itself is gated and I do not block on it. Three things about the anchors are not gated and should be.

Two of the five gradients have no source. Section 5.2's table cites Bruscia for relational stance and musical variability, and leaves the source column for arousal, valence and session intensity as "Therapist's rating" with no instrument behind it. Arousal and valence are borrowed from the circumplex the AI music therapy literature uses, which is a reason to name them and not a set of anchors, and session intensity is the product name for trauma, which section 5.4 says the therapist's rating replaces entirely. So three of five gradients need anchors written from nothing, and the document does not say who writes them or against what.

Section 11.1 then says the frame library's 232 author judgements "seed the anchor descriptors". Those are judgements about scenes in thirteen dramatic works, made by the author, and section 9.1 is explicit that they are "the only set of human judgements the programme has" and are "not evidence about anything". A therapist rating a minimally verbal child against an anchor descriptor seeded from Hamlet is the concrete form of that sentence, and section 14's own open question, that anchors written for a verbal adult are wrong for a minimally verbal child, is the same worry arriving from a different direction. G0 tests that the anchors exist. Nothing tests that they were written for the client in the room.

### 20. The therapist cannot find out which defaults they have, and the draft never enumerates the inputs it requires to be off. BLOCKING

This is the question the brief asks directly, and the answer has three parts.

What the therapist actually meets is Layer 3 off. Design section 6.3 rules on the conflict explicitly: "This design has Layer 3 on and routes every surface into the shared renderers; PRD section 6.2 requires every optional input to be off by default and binds each input separately. The PRD's rule governs the Instrument. Layer 3 is off by default there, each input is enabled separately by the clinician, and shared renderers are an implementation fact rather than a licence for one surface's defaults to reach another." Design section 10a item 8 repeats it. So the conflict is resolved, and resolved the way I would have asked for.

Neither document tells the therapist. The PRD never mentions Layer 3, never mentions that another document in the programme has it on, and never records that the question arose. The resolution exists only in a design document whose section 10a says of the Instrument that "this design does not rule on it", and the therapist is not a reader of either. A therapist opening the instrument cannot determine which default they have from the PRD alone, and the only document that answers disclaims jurisdiction in the same section that answers.

Worse, the PRD's own rule cannot be verified against the draft. Section 6.2 requires that the product be "fully usable with every optional input switched off", ships "with all of them off by default", and binds "each input separately rather than the analyser as a class". The draft never enumerates the class. The only optional input named anywhere is the text analyser. A therapist cannot list what is off, an implementer cannot build the switches, and gates G0 and G1 cannot be tested against the rule, because nobody can say how many switches there should be. List the optional inputs by name in section 6.2, state the default beside each, and record the Layer 3 ruling in the PRD rather than leaving it to a design document that says the PRD governs.

### 21. The therapist cannot tell from this document who the instrument is for, and it changes the anchors, the record and the arc. Not blocking

The person is the therapist deciding whether to open this tool at all. The moment is reading the document.

Section 3 describes an MT-BC with 1,200 supervised hours working inside a therapeutic relationship. Section 5.2 describes ratings of how a client presents. Section 7.3 exports a record to the EHR the therapist already uses. Section 11.4 wants "session-derived data from real use, indexed to a real clinical moment, rated by a credentialed human". Section 10 says "There is no client. All of it is void." Section 12 says "It does not assess a person, because there is no person." Section 10's own justification for its four surviving requirements says the author is the one at the desk. Design section 10a says the PRD "specifies a tool for real therapists and real clients, which is not what the scope ruling covers".

I take no position on the scope ruling, which is not mine to question and which I accept in full. The finding is narrower and is about what the therapist can read off the page. Three concrete things depend on which listener the requirements were written for, and all three are unresolved in draft 6. The anchors are written for someone, and the draft cannot say whether that someone is a client or a character, which section 14 already notices. The record is exported to somewhere, and the draft cannot say whether that is an EHR or a research directory. The arc has a return in it, and the draft cannot say whether the return is for a session or for a dramatic scene, having deleted the session rationale and kept the requirement.

The therapist meets all three of those as concrete design questions on their first day. Decide who is at the desk in this document, say it once at the top, and let sections 10, 11.4 and 12 follow from that one sentence rather than each answering differently.

### 22. Four therapist-facing promises point at sections draft 6 deleted, and one of them is the record that leaves the building. BLOCKING

The person is the therapist, and in one case the reader of a record they exported. The moment is any moment at which they follow a pointer the draft gives them.

Section 4.2 says the analyser's unestablished validity is handled "by never letting that component's output reach a user as an assertion, which section 8.3 handles". There is no section 8.3. Section 3.3 says "Section 8.2 prohibits a named condition beside a claim of effect on any product surface" and relies on that prohibition to keep Wigram's diagnostic phrasing out of an anchor descriptor the therapist reads every session. There is no section 8.2, so the prohibition that keeps a diagnosis out of an anchor does not exist. Section 14's open question on client populations relies on the same missing 8.2. Section 7.4 says the explanation must be deliverable to a client "because section 10.6 requires it", and there is no section 10.6, so the one requirement that makes the explanation client-facing has no source.

The most consequential is in the session record. RG-MBI component 2, theory or scientific rationale, is specified as "the section 7.4 rule chain carrying the standing disclosure of section 8.5". There is no section 8.5 and no standing disclosure anywhere in draft 6. That record is the artefact section 3.2 says must leave the instrument for the EHR, and section 11.1 and 11.2 say makes the therapist's work publishable and comparable without transcription. So the thing that leaves the building carries a rule chain, is required to carry a disclosure alongside it, and the disclosure does not exist in the document. Whatever the author intends that disclosure to say, a therapist cannot supply it and an implementer cannot build it.

Section 2 also sends the reader to section 8 for the reasoning behind the working name, and section 7.4 sends them to section 8 for two named regulators, neither of which section 8 now discusses. I raise those two only as navigation, since section 8's surviving text makes the document's position clear, but they are the same defect and a reader following either lands nowhere.

Resolve every one of the seven pointers, and where the deleted requirement was doing therapist-facing work, which is true of 8.2, 8.4, 8.5 and 10.6, restore the requirement in its own right rather than only the pointer.

## Disposition

**REVISE**, with 17 blocking findings of 22.

I do not recommend STOP, and I want to be clear about why, because the blocking count is high. The architecture in section 6 is right, and the affirmative-acceptance rule in section 6.4 is the single best piece of user protection in the programme: it identifies the exact mechanism by which a machine value reaches a client, which is a therapist attending to a person rather than a screen, and it closes it. Section 10's requirement that the arc have a return, section 6.5's refusal to show the therapist their own agreement rate, and section 7.5's statement of what a record has to be are all reasoned from the person in the room outward. The draft's problems are not in what it decided. They are that it was produced by deletion, so the requirements that survived point at reasoning that did not, and that it stops at the edge of every moment it describes: it specifies the rating and not the render, the stop and not what follows it, the number and not the action, the setting and not the settings.

The seventeen blocking findings fall into four groups, and the author can work them in that order. Findings 9 and 22 are the deleted-pointer group and are mechanical. Findings 1, 2, 3, 5, 16, 17 and 20 are the unspecified-surface group, where a requirement exists and the screen behind it does not. Findings 4, 6, 11, 12 and 15 are the group that matters most to me, where the therapist is shown something and given nothing to do about it, and finding 6 is the one I would fix first because it is the cheapest and because it decides whether the therapist trusts the instrument after their best session. Findings 7, 8 and 18 are the group where the document says something to the therapist that is not true of the engine, and finding 7 is urgent because the fixture is a build requirement.

Two findings I want to leave standing separately for the author's attention, because they are not defects of care but of sequence. Finding 6 is a design decision the listening pack is already built to test, in Part T, on therapists, and the PRD could carry a provisional warning now and the pack's answer later. Finding 4's threshold is one number that design section 10 already lists as owed, and the instrument cannot reach G1 without it, since G1 requires the audible-fraction check computed and shown and a check with no threshold is not shown, it is merely displayed.
