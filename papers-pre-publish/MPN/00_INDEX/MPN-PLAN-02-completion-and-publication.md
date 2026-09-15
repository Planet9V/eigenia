| Field | Value |
|:---|:---|
| Designation | MPN-PLAN-02 |
| Title | Completion, publication and the listener campaign: a prioritised plan |
| Author | J. McKenney, with Claude |
| Date | 14 September 2026 |
| Supersedes | The seven-step plan of 12 September 2026, six of whose steps are done and whose seventh is carried here as item 3.1 |
| Status | For the author. Every count in it was taken from the corpus on 14 September and the command that produced it is named |
| Scope | Theory and internal research on synthetic material, under the author's ruling of 13 September 2026. Publication of papers is a separate act from deployment of a product and nothing here proposes the second |

## 1. The two things "publish" can mean, and why the answer is both

The corpus lives in a folder called `papers-pre-publish`, so publication is the intended end state and has been since the reorganisation. What has never been settled is **what is being published, and when**, and the answer changes the whole shape of the work.

**S1 to S4 do not depend on a single listener.** S1 states the calculus as assertions with their falsification conditions. S2 is mathematics. S3 states the mapping and, crucially, spends most of its length establishing what the shipped implementation actually does, at path and line. S4 is an audit of two programs. Not one of those four papers makes an empirical claim about how a human hears anything. Their honest form is **theory and implementation audit**, and that form is publishable now.

**The empirical claims are all in front of us and none of them is made yet.** Whether listeners converge on a register-to-mode table, whether the blend is a scale or a mistuning, whether the Cayley metric is audible as a magnitude, whether six timbres are distinguishable: four questions, all specified, all with stimuli built, and zero data.

So the routes are not alternatives and should not be run as a choice.

**Route A, now.** Publish S1 to S4 as the theory-and-audit series, with every empirical claim marked as untested and the falsification condition stated. This is what the papers already are, and S4 in particular is a genuinely unusual document: a programme auditing its own reference implementation and reporting that a mode is computed and discarded, that a composer receives a literal instead of the state, and that an operator is not the operator it is named for. That is publishable and it is useful to somebody else building one of these.

**Route B, after.** The listener results become a fifth paper or an amendment series. If they return positive, four assertions move from stated to tested. If they return null, that is also a result, and the programme already holds one null it cannot cite because the stimuli were not reproducible. These stimuli are reproducible: no random draw anywhere, a SHA-256 per file, the audio shipped rather than promised.

**The risk Route A carries and the plan must manage.** A theory paper published without evidence invites the reading that evidence was avoided. The mitigation is in the papers already and must be kept prominent rather than buried: every assertion carries its falsification condition, the two existing listener studies are reported including the null at p = 0.72, and section 10 of the design records the demotion of the score as evidence against the thesis. A programme that publishes its own negative findings in the same document is not avoiding evidence.

**The decision this leaves you.** Venue, and only venue. Nothing before phase 5 depends on it, so it does not block anything, and phase 5 names the point where it must be answered.

## 2. The critical path

One chain determines the end date and everything else runs beside it.

**Recruit, then pilot, then collect, then settle A4, then finish S3, then re-gate S3's modal section.**

Every other outstanding item is work that can be done in parallel or afterwards. The pack is the longest pole and it has not started. Recruitment in particular is calendar time you do not control: finding a working music therapist, a working composer and a methodologist, and getting twenty-five minutes of their attention each, is measured in weeks of waiting rather than hours of work.

Two things sit on that path and are currently unstarted:

**The pack's wording has known defects that bias the very questions it exists to ask.** Part B tells the listener "some pairs differ by about a sixth of a semitone, others are identical." Part D says "there is no penalty for saying same, and at least one pair really is." Both sentences are true and both move a listener's criterion, which is exactly what a same-or-different task measures. There will be more. An expert's twenty-five minutes is the scarcest input this programme has and it should not be spent discovering a leading question.

**Nobody has been asked.** No names, no invitations, no schedule.

## 3. The phases

Phase numbers are dependencies, not calendar. Items marked **author** cannot be done by anyone else.

### Phase 0. Unblock, and start the clock on recruitment

| # | Item | Why it is here | Owner |
|:---|:---|:---|:---|
| 0.1 | Rotate the ElevenLabs key at the provider, then run `purge-key.sh` and force-push | Live in a public repository since 10 January, in all 36 commits. Nothing in the programme depends on it and no review will catch it | **author** |
| 0.2 | Adversarial pass over the pack's wording, then republish | Two known criterion leaks, probably more. Blocks 2.1 | Claude |
| 0.3 | Open recruitment across the three professions: composers and music directors, music therapists, researchers and methodologists. There is no cap and no target composition. A panel of thirty with five composers is as valid as any other split, and the analysis reports per profession and pooled | Blocks everything empirical | **author** |
| 0.4 | The four repairs section H of the verification file owes: restore the `05_DATA/03_generators/` citation prefix, repoint the three broken line anchors, correct fourteen to thirteen, copy the repaired `s6_three_clef.py` into the corpus | Three broken anchors in a document that claims a verified path list | Claude |

Phase 0 is days, and 0.3 should be done first because it is the only item whose duration is not yours.

### Phase 1. The gates that are owed

Two documents have never been through the review that every other document in this programme has passed.

| # | Item | State | Owner |
|:---|:---|:---|:---|
| 1.1 | Gate revision 8 of the design: Skeptic, Constraint Guardian, User Advocate, then Arbiter | Revision 8 is 30,512 words and has never been reviewed. Revisions 6 and 7 were reviewed; this one restores 7,500 words and answers two author decisions | Claude |
| 1.2 | **Gate the PRD, draft 6** | It has never been gated at all. It is the clinical document, it specifies an instrument a therapist holds, and it is the least reviewed thing in the corpus | Claude |
| 1.3 | Citation ledgers for S2, S3, S4, the PRD and the design | **Only S1 has one.** The original plan required one per paper and four were never written | Claude |

Item 1.3 is larger than it sounds and is a publication blocker rather than a nicety. The corpus carries **112 distinct bracket references across six principal documents** and **214 distinct external URLs**. Every one needs a verification status before anything is published, because a citation nobody checked is exactly the kind of thing this programme has caught itself on three times.

### Phase 2. The listener campaign

| # | Item | Detail |
|:---|:---|:---|
| 2.1 | **Wave 1, the pilot.** Whoever answers first, with at least one from each profession before it closes | The purpose is to break the instrument, not to collect data. Part Z of the pack asks each respondent where a question was badly posed and it is the most valuable box on the page |
| 2.2 | Fix what wave 1 finds, republish | Expect to change wording, not stimuli. If a stimulus has to change, the manifest and the key change with it and the wave 1 responses are not poolable |
| 2.3 | **Wave 2, the panel.** As many as answer | Every additional respondent narrows the estimate. Ten in a profession settles a design parameter for that profession; fewer still reports, with its spread. Not a citable perceptual claim at any size reached this way, and the plan does not pretend otherwise |
| 2.4 | Collection and first analysis | Responses arrive as text files. The answer key is in the corpus and not in the pack |

**What wave 2 settles, and it is four things at once.** The register-to-mode table, which four documents disagree about and which item 3.1 waits on. The interpolation margin, from whether the near-tie pair at 17.4 cents is distinguishable. The timbre resolution, which closes or shrinks the six-character table. And whether the Cayley metric is audible as a magnitude, which decides which of S3's two harmonic repairs is the honest one.

**What it does not settle.** Anything about a real client, because no client is involved. The pack asks professionals for judgements; it does not measure anybody.

### Phase 3. Settle what the data settles

| # | Item | Blocked on |
|:---|:---|:---|
| 3.1 | **Choose the register-to-mode table**, then fill S3's stubbed modal section and re-gate that section only | 2.4, and it is the author's choice at a keyboard. This is step 7 of the original plan, the only one not done |
| 3.2 | Fix delta from the margin result; fix the timbre resolution from the ladder | 2.4 |
| 3.3 | Rule on magnitude against index for the harmonic parameter | 2.4 |
| 3.4 | Update the assertions register: A4 moves from untested to tested or refuted; B4 gets the study section 6.2 now justifies | 3.1 to 3.3 |
| 3.5 | S3 to revision 10, S1's A4 disclosure updated, both re-gated on the changed sections only | 3.4 |

### Phase 4. The implementation, which no paper waits on and every future study does

The reference implementation still carries every defect S3 and S4 found. None of them blocks publication of the papers, because the papers report them as findings. All of them block the next stimulus set.

| # | Item | What it is |
|:---|:---|:---|
| 4.1 | S3-1 and S3-2: give `OrchestratorOutput.global` a mode field, remove the `as any` cast, pass the frame's register triple into `composeMelody` instead of the hard-coded literal | Until this lands, A4 is untestable on the build, and a study run on it returns a null whatever the truth |
| 4.2 | S3-3: the eight-marking dynamic law, which only the Python module implements | The shipped path emits three labels at three constant velocities where the law says eight |
| 4.3 | TC-1: remap the instrument family to the six canonical contrast directions | Four families keyed to an argmax cannot label a six-character cast, and every canonical profile sits exactly on a tie |
| 4.4 | The DISC input path, which does not exist in any form | Named at path and line: no contrast basis, no centroid, no attack-time term; `inferDISC` returns null; the flat 0.5 default puts every unnamed character at the one point the channel cannot carry |
| 4.5 | Seed the generator RNG | Carried since the original plan. It gates every listening study after this one |
| 4.6 | The remaining bias-layer queue: BL-3 to BL-7 | BL-1, BL-2 and BL-8 are answered. BL-3 depends on BL-1 and is now unblocked |

### Phase 5. Publication

| # | Item | Detail |
|:---|:---|:---|
| 5.1 | **Decide the venue** | The one decision phase 5 cannot start without. Nothing before it depends on the answer |
| 5.2 | Final pass on S1 to S4 for a reader who has not read the others | Each paper currently assumes the series. A published paper cannot |
| 5.3 | Reproducibility package | The generators, the stimuli with their hashes, the score files, the answer key. S4 makes publishing audio rather than a promise to regenerate a condition, and this is where that is honoured |
| 5.4 | Route A goes out | S1 to S4, theory and audit, empirical claims marked untested |
| 5.5 | Route B follows | The listener results, as a fifth paper or an amendment series |

## 4. Consistent quality: what has actually gone wrong, and the rule that stops it

Three process failures in this programme share one shape, and naming the shape is worth more than three separate fixes.

**The regulatory premise.** An external standard was researched, found real in its own domain, and applied to work that was never in that domain. It cost roughly 2,500 words of apparatus and, worse, six capabilities the author had asked for.

**The word cap.** A length target was invented against a standing instruction that there is no ceiling, and imposed on delegated agents. It cost about 4,000 words of argument compressed into assertion, since restored.

**The unverified claim.** "Forty-five of forty-five changes applied" was accepted on an agent's word. The check showed eighteen change numbers in the text and no audit table. There is now a forty-five row audit.

**The shape is the same in all three: an unverified standard or claim admitted into the work and allowed to govern it.** The programme already has a method that catches this on content, stated in S4 and used throughout: a negative claim reaches no further than the class its script enumerates, a quantitative claim no further than the records its parser read, and you search for the values a claim is about rather than the names of functions. What it lacked was the same discipline applied to **instructions and to agent reports**.

**So one rule is added and it is cheap.** *Every constraint that governs the work names its source, and every claim that a piece of work is complete is verified by something other than the claim.* In practice that is three checks at the end of any delegated task, mechanical and fast:

1. **The constraint check.** For each requirement imposed on the task, where did it come from: the author, a paper, a measurement, or the delegator's invention? An invented constraint is removed, not negotiated.
2. **The completion check.** The task's own claim of what it did is tested against the artefact. A count claimed is a count verified. This is what produced the change-audit table and it should be standard rather than a response to being caught.
3. **The scope check.** Does the output contain content the scope ruling excludes? One `grep` catches it, and it has been run on every document since 13 September.

Two existing disciplines stay and are worth restating because they are why this programme finds its own errors. **Reviewers must reject.** An arbitration that accepts every objection has transcribed rather than arbitrated, which has happened once and was reversed. **The computation wins.** Where a predicted figure and a computed figure disagree, the computed one is right and the disagreement is stated loudly. That rule has now overturned a figure I hand-wrote, a figure the Skeptic produced, and a figure the Arbiter produced, in that order.

## 5. The campaign in particular, since it is the long pole

**Who.** Three roles, and the pack is built for exactly these: a working composer or music director, a practising music therapist, and a researcher or methodologist. The therapist is the hardest to find and should be approached first.

**How many.** There is no cap and no required composition. The three roles are professions, not seats: a panel of thirty with five composers, eighteen therapists and seven researchers is a perfectly good panel, and so is one of eight. What matters is that the per-profession counts are reported alongside the pooled result, because Part A is the one part designed to pool across professions and the others are not.

**What each count buys.** One respondent in a profession is an anecdote and the analysis says so. Three give a spread. Around ten settle a design parameter for that profession, which is what the pack exists to do. None of it is a citable perceptual claim, and Part R asks respondents themselves what a citable study would require, which is the cheapest way to find out what one would cost.

**What they get.** A link, twenty-five to thirty-five minutes, and a text file they send back. No account, no tracking, nothing collected while they work. They are offered credit, acknowledgement, or anonymity, and the results.

**What to say when asking.** The pack's own opening does this work and an invitation should not improve on it: the material is synthesised, nobody is recorded, there is no participant and no subject, and the judgement is the data. The honest pitch is that four documents are waiting on their ear.

**What must not happen.** Wave 1 and wave 2 must not be pooled if a stimulus changes between them, only if wording changes. The presentation order is a fixed permutation so that two respondents compare directly, and that property is lost the moment anyone re-shuffles.

## 6. What this plan does not contain

It does not schedule a product, a deployment or a market, because the scope ruling excludes all three and nothing here proposes otherwise.

It does not schedule the bias layer's musical rendering, which is deferred behind a detection rate from BL-5 and BL-6 and reopens on evidence rather than on a date.

It does not schedule S5 or S6, the use-case papers, which were out of scope in the original plan and remain so.

It does not promise that the listener results will be positive. Three of the four questions have a plausible null, and the plan is written so that a null is a result rather than a failure: a null on the Cayley metric decides which harmonic repair is honest, a null on timbre shrinks the cast table by a stated amount, and a null on the modes is the most interesting outcome of the four, because four documents currently disagree about a table no listener has ever been asked about.

## 7. The order, in one place

1. **Open recruitment across the three professions.** Today. Nothing empirical starts until somebody is asked, and there is no cap on how many.
2. **Rotate the key.** Overdue by eight months.
3. Wording pass on the pack; the four citation and generator repairs.
4. Wave 1, the first few returns, to break the instrument.
5. In parallel: gate revision 8, gate the PRD, write the four missing citation ledgers.
6. Wave 2, the panel. Collect.
7. Choose the register-to-mode table; fill S3's modal section; settle delta, the timbre resolution and the metric question.
8. Decide the venue; final pass; reproducibility package; Route A out.
9. The implementation repairs, which gate the next study and no paper.
10. Route B, when there is something to say.

Items 1 and 2 are yours and are the only two that can start this minute.
