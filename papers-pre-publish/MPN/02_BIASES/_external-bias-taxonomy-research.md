# B1 — Cognitive Bias Catalogue and Classification Schema

**Purpose.** A reference catalogue and classification scheme for cognitive biases, built to *extend* the author's existing three-tier / BSS / MPN-mapping scheme, not to replace it.
**Compiled:** 2026-09-12. All counts are live as of that date.

## Verification legend

Every citation below carries one of three marks. This is strict.

| Mark | Meaning |
|---|---|
| **VERIFIED-FT** | I fetched the source and read the actual data, table or text being cited. |
| **VERIFIED-MD** | I fetched an authoritative bibliographic record (Crossref, HAL, Wikimedia Commons API) and confirmed authors / journal / volume / pages / year / DOI. The *bibliographic details* are confirmed; the substantive claim attached to it is flagged separately where it was not read. |
| **UNVERIFIED** | Not checked against a fetched source in this pass. Treat as a lead, not a fact. |

No count, category name, DOI or reliability figure in this document was invented. Where I could not confirm something, it says so.

---

# 1. Catalogue and counts

## 1.1 Wikipedia, *List of cognitive biases* — **244 entries** (retrieved 2026-09-12)

**VERIFIED-FT.** Retrieved via `https://en.wikipedia.org/w/index.php?title=List_of_cognitive_biases&action=raw` and counted mechanically (bulleted entries between the first content heading and `== See also ==`). Every one of the 244 bullets was inspected and is a genuine named bias entry; there are no stray non-entry bullets.

**Critical structural finding for this programme:** the page is *no longer* organised by belief / social / memory. It is now explicitly organised by the **Dimara et al. (2020)** task-based taxonomy. The article says so in its own words:

> "This list is organized based on the task-based classification proposed by Dimara, Franconeri, Plaisant, Bezerianos, Dragicevic (2020). This classification defines 6 tasks, namely estimation, decision, hypothesis assessment, causal attribution, recall, and opinion reporting. The biases are further loosely classified into 5 sub-categories or 'flavors'."

The five flavors, verbatim from the article:

1. **Association** — a connection between different pieces of information
2. **Baseline** — comparing something to a perceived standard or starting point
3. **Inertia** — the reluctance to change something that is already in place
4. **Outcome** — how well something aligns with an expected or hoped-for result
5. **Self-perspective** — influenced by one's own personal point of view

**Counts by task (VERIFIED-FT, machine-counted):**

| Task | Entries |
|---|---|
| Estimation | 41 |
| Decision | 47 |
| Hypothesis assessment | 35 |
| Causal attribution | 36 |
| Recall | 60 |
| Opinion reporting | 25 |
| **Total** | **244** |

**Counts by task × flavor (VERIFIED-FT):**

| | Association | Baseline | Inertia | Outcome | Self-perspective |
|---|---|---|---|---|---|
| Estimation | 9 | 13 | 1 | 8 | 10 |
| Decision | 15 | 15 | 10 | 2 | 5 |
| Hypothesis assessment | 18 | — | — | 17 | — |
| Causal attribution | — | — | — | 22 | 14 |
| Recall | 38 | 8 | 3 | 6 | 5 |
| Opinion reporting | 3 | — | 3 | 8 | 11 |

Note the empty cells: the 6 × 5 grid is *not* fully populated. Hypothesis assessment has only Association and Outcome; causal attribution only Outcome and Self-perspective. This matters if the author wants a crossed facet design — Wikipedia's implementation of Dimara is a partial cross, not a full one.

## 1.2 The count is **disputed across time, not across sources** — 200 vs 244

**VERIFIED-FT.** I retrieved Wikipedia revision **997422981** (timestamp 2020-12-31T12:34:12Z) via the MediaWiki API and counted its table rows.

At that revision the page used a **three-way top-level structure** and contained **200 entries**:

| Section (2020 structure) | Entries |
|---|---|
| Belief, decision-making and behavioral | 112 |
| **Social** | **43** |
| Memory | 45 |
| **Total** | **200** |

This is the single most useful historical fact in this document for the author's purposes, and §2.6 and §4 build on it. The 2020 Wikipedia structure is a *published, checkable, widely-mirrored precedent for exactly the individual-versus-interpersonal split the author needs* — and it names its 43 social biases explicitly.

So: **200 (Wikipedia, Dec 2020) vs 244 (Wikipedia, Sep 2026).** Both real, both from the same source, different dates and different organising principle. Any figure quoted from a secondary source ("Wikipedia lists N biases") should be date-stamped or it is meaningless.

## 1.3 Benson's *Cognitive Bias Cheat Sheet* — **175 biases, 4 problems, 20 groupings**

**VERIFIED-FT** (fetched `https://buster.medium.com/cognitive-bias-cheat-sheet-55a472476b18`).

- Benson: "I've spent many years referencing Wikipedia's list of cognitive biases", and he started "with the raw list of the **175** biases."
- Published **1 September 2016**.
- The four problems, **verbatim**:
  1. "Problem 1: Too much information."
  2. "Problem 2: Not enough meaning."
  3. "Problem 3: Need to act fast."
  4. "Problem 4: What should we remember?"
- Sub-groupings: **5 + 6 + 5 + 4 = 20**. Full verbatim list in §2.1.

## 1.4 The Cognitive Bias Codex (Manoogian III) — the poster's own title says **"180+"**

**VERIFIED-FT** via the Wikimedia Commons API (`action=query&prop=imageinfo&iiprop=extmetadata`):

- File title: **"The Cognitive Bias Codex - 180+ biases, designed by John Manoogian III (jm3).png"**
- ImageDescription: *"Wikipedia's complete (as of 2016) list of cognitive biases, arranged and designed by John Manoogian III (jm3). Categories and descriptions originally by Buster Benson."*
- Artist: Jm3. DateTimeOriginal: **2016-09-05**. Licence: **CC BY-SA 4.0**.

Benson's article (VERIFIED-FT): *"A couple days after posting this, John Manoogian III asked if it would be okay to do a 'diagrammatic poster remix' of it."*

**On the number.** Three figures circulate and they are not the same:
- **175** — Benson's own stated starting list (VERIFIED-FT).
- **"180+"** — the Codex file's own title (VERIFIED-FT).
- **188** — the figure most commonly repeated in secondary write-ups and in most "cognitive bias codex" blog posts. **UNVERIFIED.** I found no primary source for 188 in Benson's article or in the Commons metadata. Do not cite 188 as if it were sourced.

**Structure of the Codex:** four problem quadrants (Benson's four problems), twenty groupings (Benson's twenty sub-headings), biases placed radially within them. The quadrants and groupings are Benson's; the placement and design are Manoogian's. VERIFIED-FT from both sources.

## 1.5 Kahneman and Tversky's heuristics-and-biases programme — **3 heuristics**

**Citation VERIFIED-MD** (Crossref): Tversky, A., & Kahneman, D. (1974). Judgment under Uncertainty: Heuristics and Biases. *Science*, **185**(4157), 1124–1131. doi:10.1126/science.185.4157.1124

**VERIFIED-FT** (Wikipedia, *Heuristic (psychology)*, fetched raw): *"In their initial research, Tversky and Kahneman proposed three heuristics—availability, representativeness, and anchoring and adjustment."*

The three heuristics and the biases conventionally assigned to each:

| Heuristic | Biases the 1974 paper derives from it |
|---|---|
| **Representativeness** | base-rate neglect / insensitivity to prior probability; insensitivity to sample size (law of small numbers); misconceptions of chance (gambler's fallacy); insensitivity to predictability; illusion of validity; misconceptions of regression |
| **Availability** | retrievability of instances; effectiveness of a search set; biases of imaginability; illusory correlation |
| **Anchoring and adjustment** | insufficient adjustment; biases in evaluating conjunctive and disjunctive events; overly narrow subjective probability distributions (overconfidence in calibration) |

**Status of that table: UNVERIFIED against the 1974 original.** I could not obtain the full text — JSTOR returned a JavaScript wall, and three PDF mirrors were either 404 or blocked by the egress proxy. The heuristic-level claim (three heuristics, named) is VERIFIED-FT via Wikipedia; the individual sub-bias assignments are the standard textbook rendering and should be checked against the paper before publication. Anchoring in confidence intervals and the 8×7×…×1 product demonstration *are* VERIFIED-FT as belonging to the 1974 paper (Wikipedia cites them to it directly with `sfn|Tversky|Kahneman|1974`).

**The programme is small.** Three heuristics and roughly a dozen named biases — against 244 in the catalogue. This is worth stating plainly in the author's document: the original programme is not a catalogue, it is a *mechanism* account, and only a small fraction of the catalogue descends from it. Most of the 244 are post-1980 accretions with far weaker evidentiary bases.

**Related primary citations, all VERIFIED-MD:**
- Tversky, A., & Kahneman, D. (1981). The Framing of Decisions and the Psychology of Choice. *Science*, **211**(4481), 453–458. doi:10.1126/science.7455683
- Nickerson, R. S. (1998). Confirmation Bias: A Ubiquitous Phenomenon in Many Guises. *Review of General Psychology*, **2**(2), 175–220. doi:10.1037/1089-2680.2.2.175
- Jacowitz, K. E., & Kahneman, D. (1995). Measures of Anchoring in Estimation Tasks. *Personality and Social Psychology Bulletin*, **21**(11), 1161–1166. doi:10.1177/01461672952111004

## 1.6 Other widely used compilations

**Dimara et al. (2020) — 154 biases, 7 categories.** VERIFIED-FT via the HAL API (`api.archives-ouvertes.fr`, halId hal-01868738), which returned the published abstract verbatim: *"Based on a survey of the literature we propose a task-based taxonomy of **154 cognitive biases** organized in **7 main categories**."*

**Note the discrepancy — this is a real one and should be reported as such.** Dimara's abstract says **7** categories. Wikipedia, which claims to implement Dimara, says **6** tasks and implements 6. The seventh category is not named in the abstract and I did not obtain the full paper. **UNVERIFIED** what the seventh is. Do not assert that Dimara has 6 categories; the abstract says 7.

**DMIDI — the Decision Making Individual Differences Inventory.** VERIFIED-FT (fetched `https://sjdm.org/dmidi/`). Self-described as *"a catalogue of over 200 individual difference measures commonly used in judgment and decision-making research."* This is the standard compilation of *instruments*, not of biases, and is the single most useful entry point for §5. Maintained under the Society for Judgment and Decision Making.
- Appelt, K. C., Milch, K. F., Handgraaf, M. J. J., & Weber, E. U. (2011). The Decision Making Individual Differences Inventory and guidelines for the study of individual differences in judgment and decision-making research. *Judgment and Decision Making*, **6**(3), 252–262. doi:10.1017/s1930297500001455 — **VERIFIED-MD**

**Hilbert (2012)** — a generative-mechanism compilation, deriving a family of biases from noisy information processing. Hilbert, M. (2012). Toward a synthesis of cognitive biases: How noisy information processing can bias human decision making. *Psychological Bulletin*, **138**(2), 211–237. doi:10.1037/a0025940 — **VERIFIED-MD**. Cited by Wikipedia as one of the classifications "by common generative mechanism" (VERIFIED-FT).

## 1.7 Summary table of counts

| Source | Count | Unit | Date | Status |
|---|---|---|---|---|
| Wikipedia, *List of cognitive biases* | **244** | named bias entries | 2026-09-12 | VERIFIED-FT |
| Wikipedia, rev. 997422981 | **200** | table rows (112 / 43 / 45) | 2020-12-31 | VERIFIED-FT |
| Benson, *Cognitive Bias Cheat Sheet* | **175** | biases organised | 2016-09-01 | VERIFIED-FT |
| Cognitive Bias Codex (file title) | **"180+"** | biases depicted | 2016-09-05 | VERIFIED-FT |
| Cognitive Bias Codex (common secondary claim) | 188 | — | — | **UNVERIFIED** |
| Dimara et al. 2020 | **154** in **7** categories | biases surveyed | 2020 | VERIFIED-FT (abstract) |
| Tversky & Kahneman 1974 | **3** heuristics, ~12 biases | — | 1974 | heuristics VERIFIED-FT; sub-biases UNVERIFIED |
| DMIDI | **"over 200"** | *measures*, not biases | live | VERIFIED-FT |

---

# 2. Classification schemes that already exist in the literature

## 2.1 Benson's four problem quadrants

**Principle of division:** the *adaptive problem* the bias is a side-effect of solving. Benson's framing is that each quadrant is a real constraint on cognition, and the biases in it are the price paid for a strategy that works.

**Categories:** four problems, twenty sub-groupings. **All verbatim, VERIFIED-FT.**

**Problem 1: Too much information.** (5)
- We notice things that are already primed in memory or repeated often.
- Bizarre/funny/visually-striking/anthropomorphic things stick out more than non-bizarre/unfunny things.
- We notice when something has changed.
- We are drawn to details that confirm our own existing beliefs.
- We notice flaws in others more easily than flaws in ourselves.

**Problem 2: Not enough meaning.** (6)
- We find stories and patterns even in sparse data.
- We fill in characteristics from stereotypes, generalities, and prior histories…
- We imagine things and people we're familiar with or fond of as better…
- We simplify probabilities and numbers to make them easier to think about.
- We think we know what others are thinking.
- We project our current mindset and assumptions onto the past and future.

**Problem 3: Need to act fast.** (5)
- In order to act, we need to be confident in our ability to make an impact…
- In order to stay focused, we favor the immediate, relatable thing in front of us…
- In order to get anything done, we're motivated to complete things that we've already invested…
- In order to avoid mistakes, we're motivated to preserve our autonomy and status…
- We favor options that appear simple or that have more complete information…

**Problem 4: What should we remember?** (4)
- We edit and reinforce some memories after the fact.
- We discard specifics to form generalities.
- We reduce events and lists to their key elements.
- We store memories differently based on how they were experienced.

**Citation:** Benson, B. (2016). *Cognitive bias cheat sheet*. Better Humans / Medium, 1 September 2016. https://buster.medium.com/cognitive-bias-cheat-sheet-55a472476b18 — **VERIFIED-FT**. Not peer-reviewed. This is a popular-science synthesis, and should be cited as such.

**Relevance to the author:** Benson's grouping 1.5 ("We notice flaws in others more easily than flaws in ourselves") and 2.5 ("We think we know what others are thinking") are *precisely* the dyadic groupings. Benson already isolated two of them without theorising the distinction. That is a usable anchor.

## 2.2 Arkes (1991) — three categories of judgement error

**Citation VERIFIED-MD** (Crossref): Arkes, H. R. (1991). Costs and benefits of judgment errors: Implications for debiasing. *Psychological Bulletin*, **110**(3), 486–498. doi:10.1037/0033-2909.110.3.486

**Principle of division:** the *psychological cause* of the error, chosen because each cause implies a different debiasing intervention. This is the key virtue of the scheme — it is a taxonomy built for intervention, which makes it the closest existing analogue to what the author is doing.

**Categories:**

| Category | Character | Debiasing implication |
|---|---|---|
| **Strategy-based** | The judge adopts a suboptimal strategy because it is cheap; effort trades off against accuracy | Responds to incentives and to effort — raising the stakes helps |
| **Association-based** | Error arises from automatic spreading activation in semantic memory; the judge cannot easily suppress what is cued | Does *not* respond to incentives; requires changing what gets cued |
| **Psychophysically based** | Error arises from the nonlinear mapping of physical/objective magnitude onto psychological magnitude (the shape of the value function) | Responds to neither incentives nor warnings; requires restructuring the representation |

**Status of the three category names and their descriptions: UNVERIFIED against the primary source.** Semantic Scholar and ResearchGate both returned empty or blocked pages. The three-way division is corroborated by a secondary source (Carey Morewedge, who paraphrases it as "strategic, associative, and psychophysical; which debiasing interventions are likely to work for each") — **UNVERIFIED**, a social-media post, not a citable authority. The *bibliographic record* is solid; the *content* needs one library fetch before publication.

**Why this matters most for the author.** The BSS is a susceptibility score, and susceptibility is only actionable if it is modifiable. Arkes' scheme predicts that his nine weighted biases will *not* all respond to the same intervention: anchoring is psychophysical (resistant), confirmation is association-based (resistant to incentives, responsive to cue restructuring), and authority/reciprocity are strategy-based *if* they are effort-driven. If a musical intervention works by re-cueing rather than by incentive, Arkes predicts it should bite hardest on the association-based ones.

## 2.3 Dimara, Franconeri, Plaisant, Bezerianos & Dragicevic (2020)

**Citation VERIFIED-MD** (Crossref + HAL): Dimara, E., Franconeri, S., Plaisant, C., Bezerianos, A., & Dragicevic, P. (2020). A Task-Based Taxonomy of Cognitive Biases for Information Visualization. *IEEE Transactions on Visualization and Computer Graphics*, **26**(2), 1413–1432. doi:10.1109/TVCG.2018.2872577

**Principle of division:** the **task** the person is performing when the bias manifests — chosen explicitly *because* existing taxonomies were organised by cognitive theory and were therefore hard to connect to anything a designer could act on. From the abstract (VERIFIED-FT): *"Existing taxonomies are organized by cognitive theories that are hard to associate with visualization tasks."*

**Structure:** **154 biases in 7 main categories** (VERIFIED-FT, abstract). Wikipedia's implementation names **6** tasks — estimation, decision, hypothesis assessment, causal attribution, recall, opinion reporting (VERIFIED-FT) — plus the 5 flavors listed in §1.1. The identity of the 7th category is **UNVERIFIED**.

**Relevance to the author:** this is the taxonomy that *won*. It now structures the Wikipedia list, which means it is the de facto standard reference organisation, and any new scheme has to explain its relation to it. It is also the closest published thing to a "stage of decision making" taxonomy (see §2.5).

## 2.4 Dual-process / System 1 – System 2

**Principle of division:** which processing system generates the judgement. Type 1 processing is fast, automatic, high-capacity, autonomous; Type 2 is slow, sequential, working-memory dependent. Biases are cast as Type 1 outputs that Type 2 failed to override.

**Citations, all VERIFIED-MD:**
- Stanovich, K. E., & West, R. F. (2000). Individual differences in reasoning: Implications for the rationality debate? *Behavioral and Brain Sciences*, **23**(5), 645–665. doi:10.1017/s0140525x00003435 — the paper that introduced the System 1 / System 2 labels
- Evans, J. St. B. T. (2008). Dual-Processing Accounts of Reasoning, Judgment, and Social Cognition. *Annual Review of Psychology*, **59**(1), 255–278. doi:10.1146/annurev.psych.59.103006.093629
- Kahneman, D. (2011). *Thinking, Fast and Slow*. Farrar, Straus and Giroux. — **UNVERIFIED** (trade book, no DOI looked up)

**Assessment: this is not a taxonomy and should not be used as one.** Dual-process theory is an *explanatory* scheme, not a partition. It does not assign each bias to exactly one class — nearly every bias in the catalogue is describable as "Type 1 output insufficiently overridden," which makes the classification vacuous as a filing system. Its practical residue for the author is a *measure*, not a taxonomy: the Cognitive Reflection Test (§5).

## 2.5 Taxonomy by stage of decision making

**Finding: the closest published scheme is Dimara et al. (2020), and it is close but not identical to what the author described.**

Dimara's six implemented tasks map onto stages as follows:

| Author's proposed stage | Dimara task | Present? |
|---|---|---|
| Perception | — | No separate category |
| Attention | — | No separate category |
| Memory / recall | **Recall** | Yes (60 entries on Wikipedia) |
| Judgement / estimation | **Estimation**, **Hypothesis assessment** | Yes, split in two |
| Choice | **Decision** | Yes (47 entries) |
| Action | — | No |
| Attribution | **Causal attribution** | Yes (36 entries) — *an extra stage the author did not list* |
| Reporting | **Opinion reporting** | Yes (25 entries) — *an extra stage the author did not list* |

**I did not find a published, citable taxonomy that uses the exact sequence perception → attention → memory → judgement → choice → action → recall.** Such sequences appear in applied and medical-decision-making writing, but I located no peer-reviewed taxonomy that partitions the bias catalogue that way. **This is a genuine gap** (see §7). If the author wants a stage taxonomy, Dimara is the one to build on, and the honest statement is that Dimara's "causal attribution" and "opinion reporting" are stages a naive process model omits — and that "opinion reporting" is where a *dialogue*-based instrument would actually be sampling.

## 2.6 Taxonomy by individual / interpersonal / group level — **the one that matters**

This was searched for specifically. Here is what exists, honestly reported.

### (a) The strongest existing artefact: Wikipedia's 2020 three-way structure

**VERIFIED-FT.** Revision 997422981 (2020-12-31) partitioned the catalogue into **Belief, decision-making and behavioral (112)** / **Social (43)** / **Memory (45)**. This is a real, dated, checkable three-way split with an explicit *social* category, and it is the closest thing to a canonical individual-versus-interpersonal partition of the bias catalogue in general circulation.

**The full 43-item "Social" list, verbatim (VERIFIED-FT):**

Actor–observer bias · Authority bias · Availability cascade · Bandwagon effect · Ben Franklin effect · Bias blind spot · Cheerleader effect · Courtesy bias · Defensive attribution hypothesis · Egocentric bias · Extrinsic incentives bias · False consensus effect · False uniqueness bias · Fundamental attribution error · Group attribution error · Groupthink · Halo effect · Hostile attribution bias · Illusion of asymmetric insight · Illusion of transparency · Illusory superiority · Ingroup bias · Intentionality bias · Just-world hypothesis · Moral luck · Naïve cynicism · Naive realism · Not invented here · Outgroup homogeneity bias · Puritanical bias · Pygmalion effect · Reactance · Reactive devaluation · Self-serving bias · Sexual over-/under-perception bias · Social comparison bias · Social desirability bias · Shared information bias · Trait ascription bias · Third-person effect · Ultimate attribution error · Worse-than-average effect

**Caveat, stated plainly:** Wikipedia is a tertiary source. The 43-item list is *useful*, and it is *verified as being what Wikipedia said on that date*, but it is not a peer-reviewed taxonomy and the category boundary is not theorised. Several entries in it (bias blind spot, illusory superiority, worse-than-average, egocentric bias) are self-referential rather than genuinely interpersonal, and several are group-level rather than dyadic. §3 does the theorising Wikipedia did not do.

### (b) Individual versus group: the peer-reviewed anchor

**Kerr, N. L., MacCoun, R. J., & Kramer, R. M. (1996). Bias in judgment: Comparing individuals and groups. *Psychological Review*, **103**(4), 687–719. doi:10.1037/0033-295X.103.4.687 — VERIFIED-MD.**

This is the canonical treatment of whether a bias is amplified or attenuated when judgement moves from an individual to a group. It is about *level of aggregation of the judging agent*, not about whether the bias is constitutively social — a different axis from the one the author needs, but the right citation for the individual/group boundary. **Content UNVERIFIED** (metadata only).

### (c) Attribution bias as a named super-category

Wikipedia treats **attribution bias** as an umbrella covering actor–observer, FAE, group attribution error, hostile attribution, defensive attribution, just-world, moral luck, puritanical bias, self-serving bias and ultimate attribution error — ten of the 43. Attribution biases are, by definition, biases in explaining *behaviour*, which is almost always someone's behaviour. This is the most defensible pre-existing cluster of properly other-directed biases.

### (d) The honest verdict

**There is no single canonical, peer-reviewed taxonomy of cognitive biases organised by individual / dyadic / group level.** I searched for one specifically and it does not exist as a standalone published scheme. What exists is:

- a widely-mirrored but tertiary three-way split (Wikipedia 2020) with an explicit 43-item social category;
- a peer-reviewed treatment of the individual-vs-group *judging agent* axis (Kerr et al. 1996);
- Benson's two implicitly dyadic groupings (1.5 and 2.5);
- the social-psychology literature's own internal organisation (attribution biases, egocentric biases, intergroup biases) which is a de facto taxonomy but is nowhere consolidated as one.

**This is the gap the author's scheme can legitimately claim to fill.** The dyadic facet in §4 is a contribution, not a restatement. It should be presented that way, and the absence of prior art should be stated openly rather than papered over with a weak citation.

---

# 3. The dyadic question

**The test applied.** A bias is **constitutively dyadic** if its *magnitude cannot be defined* without reference to a second person — that is, if removing the other person from the situation does not reduce the bias to zero but makes the quantity *undefined*. A bias is **typically-but-not-constitutively** social if a second person is the usual occasion for it, but the same bias is measurable with a non-person stimulus.

Three values are needed, not two. A number of biases require *others* without requiring *an other*: they need a plurality or a social category, and their magnitude is undefined for a single identified interlocutor. Collapsing these into "dyadic" would be wrong.

- **I — Individual.** Magnitude defined over one person and a non-person stimulus.
- **D — Dyadic.** Magnitude defined only relative to one identified other person.
- **G — Group / collective.** Magnitude defined only relative to a plurality, crowd or social category.

## 3.1 Table

| Bias | Class | Second person: constitutive or typical? | Reasoning | Primary citation | Status |
|---|---|---|---|---|---|
| **Fundamental attribution error** | **D** | **Constitutive** | Defined as over-attributing *another's* behaviour to disposition over situation. With no actor to explain, there is nothing to over-attribute. | Ross, L. (1977). The Intuitive Psychologist And His Shortcomings. *Adv. Exp. Soc. Psychol.*, 173–220. doi:10.1016/s0065-2601(08)60357-3 | VERIFIED-MD |
| **Actor–observer asymmetry** | **D** | **Constitutive** — maximally so | The bias *is* a difference score between self-explanation and other-explanation. Mathematically undefined with one person. Note Malle's meta-analysis found the classic effect close to zero overall — the construct is well-defined but the effect is weaker than folklore. | Malle, B. F. (2006). The actor-observer asymmetry in attribution: A (surprising) meta-analysis. *Psychol. Bull.*, **132**(6), 895–919. doi:10.1037/0033-2909.132.6.895 | VERIFIED-MD |
| **In-group bias** | **G** | **Constitutive, but group- not dyad-level** | Requires a category boundary and at least two groups. Minimal-group paradigm shows the category alone suffices — no specific other is needed, so it is not dyadic. | Tajfel, H., Billig, M. G., Bundy, R. P., & Flament, C. (1971). Social categorization and intergroup behaviour. *Eur. J. Soc. Psychol.*, **1**(2), 149–178. doi:10.1002/ejsp.2420010202 | VERIFIED-MD |
| **Out-group homogeneity** | **G** | **Constitutive, group-level** | A judgement about the *variance* of a category. Variance over a single individual is undefined. Strictly not dyadic. | Quattrone, G. A., & Jones, E. E. (1980). The perception of variability within in-groups and out-groups. *JPSP*, **38**(1), 141–152. doi:10.1037/0022-3514.38.1.141 | VERIFIED-MD |
| **Social proof / informational influence** | **G** | **Constitutive, group-level** | Magnitude is a function of *how many* others endorse. Asch's effect is near-zero with one confederate and asymptotes around three to four. The quantity is defined over a crowd, not a dyad. | Deutsch, M., & Gerard, H. B. (1955). *J. Abnorm. Soc. Psychol.*, **51**(3), 629–636. doi:10.1037/h0046408; Asch, S. E. (1956). *Psychol. Monogr.*, **70**(9), 1–70. doi:10.1037/h0093718 | VERIFIED-MD (the "three-to-four asymptote" claim itself: **UNVERIFIED**) |
| **Authority bias** | **D** | **Constitutive** | Requires an identified authority figure whose directives are deferred to. The magnitude is the deference to *that* source. Milgram's manipulations are dyadic (experimenter–subject). | Milgram, S. (1963). Behavioral Study of obedience. *J. Abnorm. Soc. Psychol.*, **67**(4), 371–378. doi:10.1037/h0040525 | VERIFIED-MD |
| **Liking bias** | **D** | **Constitutive** | Compliance as a function of liking *for a particular person*. Liking has no referent without one. | Cialdini, R. B. *Influence: The Psychology of Persuasion.* — **UNVERIFIED** (trade book). For the experimental core see Regan (1971) below, which crosses favour × liking. | UNVERIFIED |
| **Reciprocity** | **D** | **Constitutive** | Requires a giver to whom the debt is owed. Regan's design is explicitly dyadic: confederate buys a Coke, subject buys raffle tickets. | Regan, D. T. (1971). Effects of a favor and liking on compliance. *J. Exp. Soc. Psychol.*, **7**(6), 627–639. doi:10.1016/0022-1031(71)90025-4 | VERIFIED-MD |
| **Halo effect** | **I** (person-halo is D) | **Typical, not constitutive** | Thorndike's original case is officers rating soldiers — dyadic. But halo is demonstrated on brands, products and written work with no person rated. The general construct survives person-removal, so it is not constitutively dyadic. Split it: *person-halo* is D, *object-halo* is I. | Thorndike, E. L. (1920). A constant error in psychological ratings. *J. Appl. Psychol.*, **4**(1), 25–29. doi:10.1037/h0071663; Nisbett, R. E., & Wilson, T. D. (1977). *JPSP*, **35**(4), 250–256. doi:10.1037/0022-3514.35.4.250 | VERIFIED-MD |
| **Projection bias** | **I** | **NOT social at all — flag this** | **The author's candidate list contains a terminological trap.** "Projection bias" in the behavioural-economics sense (Loewenstein, O'Donoghue & Rabin) is *intertemporal and intrapersonal*: projecting current tastes onto one's own future self. No second person. The interpersonal construct is **social projection**, which is a different literature. | Loewenstein, G., O'Donoghue, T., & Rabin, M. (2003). Projection Bias in Predicting Future Utility. *QJE*, **118**(4), 1209–1248. doi:10.1162/003355303322552784 | VERIFIED-MD |
| **Social projection** | **D/G** | **Constitutive** | The interpersonal analogue of the above: inferring others' states from one's own. Dyadic when the target is one person, group-level when it is a population. | Krueger, J. I. (2007). From social projection to social behaviour. *Eur. Rev. Soc. Psychol.*, **18**(1), 1–35. doi:10.1080/10463280701284645 | VERIFIED-MD |
| **False consensus effect** | **G** | **Constitutive, group-level** | Defined as overestimating the *proportion* of others sharing one's view. A proportion over one other person is degenerate. Group-level, not dyadic. | Ross, L., Greene, D., & House, P. (1977). The "false consensus effect". *J. Exp. Soc. Psychol.*, **13**(3), 279–301. doi:10.1016/0022-1031(77)90049-x | VERIFIED-MD |
| **Illusion of transparency** | **D** | **Constitutive** | Overestimating the degree to which *an observer* can read one's internal state. Requires an observer. The paradigm is explicitly dyadic. | Gilovich, T., Savitsky, K., & Medvec, V. H. (1998). The illusion of transparency. *JPSP*, **75**(2), 332–346. doi:10.1037/0022-3514.75.2.332 | VERIFIED-MD |
| **Curse of knowledge** | **D** | **Constitutive** — the cleanest case in the list | Defined as the failure to discount one's private information when predicting *a less-informed agent's* judgement. The bias magnitude *is* the difference between the informed agent's prediction and the uninformed agent's actual judgement. Two agents are in the estimator by construction. | Camerer, C., Loewenstein, G., & Weber, M. (1989). The Curse of Knowledge in Economic Settings. *J. Polit. Econ.*, **97**(5), 1232–1254. doi:10.1086/261651 | VERIFIED-MD |
| **Naive realism** | **D/G** | **Constitutive** | Defined as the belief that one sees reality objectively and that *those who disagree* are biased. Requires a disagreeing other. Dyadic in conversation, intergroup in the canonical study. | Robinson, R. J., Keltner, D., Ward, A., & Ross, L. (1995). Actual versus assumed differences in construal: "Naive realism" in intergroup perception and conflict. *JPSP*, **68**(3), 404–417. doi:10.1037/0022-3514.68.3.404 | VERIFIED-MD |
| **Reactive devaluation** | **D** | **Constitutive** | An offer is devalued *because of who proposed it*. The magnitude is the difference in valuation across proposer identity. Undefined without a proposer. | Ross, L., & Stillinger, C. (1991). Barriers to Conflict Resolution. *Negotiation Journal*, **7**(4), 389–404. doi:10.1111/j.1571-9979.1991.tb00634.x | VERIFIED-MD |
| **Bias blind spot** | **D** | **Constitutive** | A difference score: bias attributed to self minus bias attributed to others. Mathematically undefined without a comparison other. | Pronin, E., Lin, D. Y., & Ross, L. (2002). The Bias Blind Spot. *PSPB*, **28**(3), 369–381. doi:10.1177/0146167202286008 | VERIFIED-MD |
| **Compassion fade / psychic numbing** | **G** | **Other-directed but not dyadic** | The target is other people, but the effect is defined over the *number* of victims — affect per victim declines as N rises. It is maximal at N = 1 and its whole content is the N-dependence. Group-level. | Slovic, P. (2007). "If I look at the mass I will never act": Psychic numbing and genocide. *Judgment and Decision Making*, **2**(2), 79–95. doi:10.1017/s1930297500000061 | VERIFIED-MD |
| **Bandwagon effect** | **G** | **Constitutive, group-level** | Adoption as a function of observed prevalence of adoption. | Nadeau, R., Cloutier, E., & Guay, J.-H. (1993). New Evidence About the Existence of a Bandwagon Effect in the Opinion Formation Process. *Int. Political Sci. Rev.*, **14**(2), 203–213. doi:10.1177/019251219301400204 | VERIFIED-MD |
| **Cognitive dissonance** | **I** | **Typical, not constitutive** | The classic induced-compliance paradigm uses an experimenter, but dissonance is defined over *a person's own* inconsistent cognitions. Removing the other leaves the construct intact. | Festinger, L., & Carlsmith, J. M. (1959). Cognitive consequences of forced compliance. *J. Abnorm. Soc. Psychol.*, **58**(2), 203–210. doi:10.1037/h0041593 | VERIFIED-MD |
| **Commitment / consistency** | **I** | **Typical, not constitutive** | As a *persuasion tactic* it needs an influencer; as a *disposition* (preference for consistency) it is intrapersonal and is measured as such. Classed I on the strength of its instrument. | Cialdini, R. B., Trost, M. R., & Newsom, J. T. (1995). Preference for consistency. *JPSP*, **69**(2), 318–328. doi:10.1037/0022-3514.69.2.318 | VERIFIED-MD |
| **Scarcity** | **I** | **Typical, not constitutive** | Worchel's paradigm varies the *supply of cookies*, not the presence of a rival. Social scarcity ("others want it") is a variant, not the core. Classed I. | Worchel, S., Lee, J., & Adewole, A. (1975). Effects of supply and demand on ratings of object value. *JPSP*, **32**(5), 906–914. doi:10.1037/0022-3514.32.5.906 | VERIFIED-MD |
| **Anchoring** | **I** | **Not social** | The canonical anchor is a wheel of fortune or an arbitrary number. No person required. | Jacowitz & Kahneman (1995), above | VERIFIED-MD |
| **Dunning–Kruger** | **I** | **Not dyadic — measurement is comparative, the bias is not** | Self-assessment is scored against one's own objective percentile, not against an identified other. The comparison class is a distribution. Additionally, the effect is contested as partly a regression artefact. | Kruger, J., & Dunning, D. (1999). *JPSP*, **77**(6), 1121–1134. doi:10.1037/0022-3514.77.6.1121; critique: Krueger, J., & Mueller, R. A. (2002). *JPSP*, **82**(2), 180–188. doi:10.1037/0022-3514.82.2.180 | VERIFIED-MD |

## 3.2 Additional biases the literature treats as interpersonal

From the verified 43-item Wikipedia Social list (§2.6a), the following are *constitutively* other-requiring and were not in the author's candidate list. They are worth knowing about because several are far more legible in dialogue than the ones he has:

**Dyadic (D):** illusion of asymmetric insight · trait ascription bias · naïve cynicism · hostile attribution bias · Pygmalion effect · Ben Franklin effect · defensive attribution hypothesis · third-person effect
**Group (G):** ultimate attribution error · group attribution error · shared information bias · groupthink · availability cascade · social comparison bias · social desirability bias · courtesy bias

**Status:** all names VERIFIED-FT as appearing in Wikipedia rev. 997422981. Individual primary citations **UNVERIFIED**.

## 3.3 The one line that should go in the author's document

Of the sixteen candidates he listed, **eight are constitutively dyadic** (FAE, actor–observer, authority, liking, reciprocity, illusion of transparency, curse of knowledge, reactive devaluation — plus bias blind spot and naive realism), **five are constitutively social but group-level rather than dyadic** (in-group bias, out-group homogeneity, social proof, false consensus), **two are typical-not-constitutive** (halo, cognitive dissonance), and **one is not social at all** (projection bias — a terminological trap).

---

# 4. Proposed two-facet classification for this programme

## 4.1 Design

Two orthogonal facets, preserving the author's tiers exactly as they are:

- **Facet A — Impact tier (his, unchanged):** T1 high · T2 medium · T3 context-dependent/additional.
- **Facet B — Social constitution (new):** **I** individual · **D** dyadic · **G** group.

**Classes = 3 × 3 = 9.** Under twelve, as required. Every bias in the standard catalogue falls into exactly one class, because Facet B is a genuine partition (the constitutive test in §3 is decidable for every bias: does removing the second person leave the magnitude defined, undefined-but-recoverable-with-a-plurality, or undefined-full-stop?) and Facet A is already a partition on his side.

**A structural observation that validates the tier reading.** The author's nine stated weights are 0.15 + 0.12 + 0.10 + 0.10 + 0.12 + 0.08 + 0.10 + 0.12 + 0.11 = **1.00 exactly**. The nine weighted biases are therefore not a sample of his catalogue — they are a closed, normalised set. On that basis Tier 1 is read below as exactly those nine. The Tier 2 / Tier 3 assignments for the remaining twenty-one are **proposed, not attributed** — the author should overwrite them with his own.

## 4.2 Class definitions and membership

| Class | Definition | His mapped biases in this class | n |
|---|---|---|---|
| **T1-I** | High impact, individual | scarcity · anchoring · confirmation · availability · optimism · Dunning–Kruger | 6 |
| **T1-D** | High impact, dyadic | **authority** · **reciprocity** | 2 |
| **T1-G** | High impact, group | **social proof** | 1 |
| **T2-I** | Medium impact, individual | commitment · framing (positive) · framing (negative) · status quo · sunk cost · hyperbolic discounting · affect heuristic · illusion of control · cognitive dissonance · hindsight · choice overload | 11 |
| **T2-D** | Medium impact, dyadic | **liking** · **bias blind spot** · **fundamental attribution error** | 3 |
| **T2-G** | Medium impact, group | **bandwagon** | 1 |
| **T3-I** | Context-dependent, individual | ambiguity effect · decision fatigue · action bias · primacy · recency | 5 |
| **T3-D** | Context-dependent, dyadic | *(empty in his thirty)* | 0 |
| **T3-G** | Context-dependent, group | **compassion fade** | 1 |
| | | **Total** | **30** |

## 4.3 Full mapping of all thirty, with MPN category retained

| # | Bias | Tier | Facet B | **Class** | His MPN category | His musical element |
|---|---|---|---|---|---|---|
| 1 | Authority | T1 (w=0.15) | D | **T1-D** | TIMBRE | deep brass, organ pedal |
| 2 | Scarcity | T1 (w=0.12) | I | **T1-I** | RHYTHM | tempo |
| 3 | Confirmation | T1 (w=0.12) | I | **T1-I** | MELODY | — |
| 4 | Optimism | T1 (w=0.12) | I | **T1-I** | MELODY | — |
| 5 | Dunning–Kruger | T1 (w=0.11) | I | **T1-I** | TEXTURE | — |
| 6 | Social proof | T1 (w=0.10) | **G** | **T1-G** | TEXTURE | — |
| 7 | Anchoring | T1 (w=0.10) | I | **T1-I** | HARMONY | — |
| 8 | Reciprocity | T1 (w=0.10) | **D** | **T1-D** | MELODY | — |
| 9 | Availability | T1 (w=0.08) | I | **T1-I** | DYNAMICS | — |
| 10 | Commitment | T2 | I | **T2-I** | RHYTHM | — |
| 11 | Liking | T2 | **D** | **T2-D** | HARMONY | — |
| 12 | Framing (positive) | T2 | I | **T2-I** | — | — |
| 13 | Framing (negative) | T2 | I | **T2-I** | — | — |
| 14 | Status quo | T2 | I | **T2-I** | HARMONY | — |
| 15 | Sunk cost | T2 | I | **T2-I** | MELODY | — |
| 16 | Hyperbolic discounting | T2 | I | **T2-I** | RHYTHM | — |
| 17 | Affect heuristic | T2 | I | **T2-I** | DYNAMICS | — |
| 18 | Illusion of control | T2 | I | **T2-I** | RHYTHM | — |
| 19 | Cognitive dissonance | T2 | I | **T2-I** | INTERVAL | — |
| 20 | Hindsight | T2 | I | **T2-I** | — | — |
| 21 | Choice overload | T2 | I | **T2-I** | TEXTURE | — |
| 22 | Bias blind spot | T2 | **D** | **T2-D** | — | — |
| 23 | Fundamental attribution error | T2 | **D** | **T2-D** | — | — |
| 24 | Bandwagon | T2 | **G** | **T2-G** | — | — |
| 25 | Ambiguity effect | T3 | I | **T3-I** | — | — |
| 26 | Decision fatigue | T3 | I | **T3-I** | RHYTHM | — |
| 27 | Action bias | T3 | I | **T3-I** | RHYTHM | — |
| 28 | Primacy | T3 | I | **T3-I** | — | — |
| 29 | Recency | T3 | I | **T3-I** | — | — |
| 30 | Compassion fade | T3 | **G** | **T3-G** | — | — |

## 4.4 Three findings that fall straight out of the cross-tabulation

**(1) The author's catalogue is overwhelmingly individual: 22 of 30 are I, 5 are D, 3 are G.** By contrast, the 2020 Wikipedia partition was 43/200 = 21.5% social; his is 8/30 = 27%. He is roughly representative of the field, which means the field's individual-centric bias is inherited, not chosen.

**(2) T3-D is empty.** He has no context-dependent dyadic bias. This is the obvious extension point, and **curse of knowledge** is the bias to add — it is the cleanest constitutively dyadic bias in the entire literature (§3.1), it is well instrumented, and it is extremely legible in dialogue (an expert failing to discount their own knowledge when addressing a novice is audible in a transcript).

**(3) His three highest weights split across facets.** Authority (0.15, **D**) and scarcity (0.12, **I**) and confirmation (0.12, **I**) do not share a facet. If musical parameters carry bias signal, the facet split predicts that authority should behave differently under manipulation from the other two — and note he has already, independently, given authority the only TIMBRE mapping and the only named instrument pair (deep brass, organ pedal). **The facet structure and his musical mapping agree on authority being the odd one out.** That is a non-trivial convergence and is worth writing up.

## 4.5 Coverage of the full 244-entry catalogue

The nine classes partition the whole catalogue, not just his thirty. Worked sanity check against Wikipedia's 2026 structure: the 36 "causal attribution" entries are almost entirely **D** or **G**; the 60 "recall" entries are almost entirely **I**; the 25 "opinion reporting" entries split, because reporting is an act performed *for* an audience. Opinion reporting is where D-class biases concentrate outside attribution, which is directly relevant to any dialogue-based instrument — a subject answering the author's questions *is* performing an opinion-reporting task, and is therefore in the one Dimara stage where dyadic biases are structurally live.

---

# 5. Representative set and why each was chosen

Selection criterion as specified: **best documented and most distinctly identifiable in dialogue.**

| Class | Representative | Why this one | Primary citation | Status |
|---|---|---|---|---|
| **T1-I** | **Anchoring** | Best-quantified bias in the catalogue. Has a *calibrated numeric index* (the anchoring index, Jacowitz & Kahneman 1995) rather than a binary. Uniquely legible in dialogue because the anchor is a literal utterable number — you can see it in a transcript and measure displacement from it. | Jacowitz & Kahneman (1995), doi:10.1177/01461672952111004 | VERIFIED-MD |
| **T1-D** | **Authority bias** | Highest weight in his BSS (0.15). Milgram is the most replicated social-psychology paradigm there is. In dialogue it is identifiable by a specific move: citing source status in place of argument. | Milgram (1963), doi:10.1037/h0040525 | VERIFIED-MD |
| **T1-G** | **Social proof** | Asch and Deutsch & Gerard are foundational and the normative/informational distinction is clean. Dialogue marker: appeal to prevalence ("everyone is doing X"). | Deutsch & Gerard (1955), doi:10.1037/h0046408; Asch (1956), doi:10.1037/h0093718 | VERIFIED-MD |
| **T2-I** | **Sunk cost** | Uniquely well-positioned: it is the *only* one of his thirty with a dedicated, published, psychometrically characterised subtest in a validated battery (A-DMC, Resistance to Sunk Costs). Dialogue marker: prior investment cited as reason to continue. | Arkes, H. R., & Blumer, C. (1985). The psychology of sunk cost. *OBHDP*, **35**(1), 124–140. doi:10.1016/0749-5978(85)90049-4; Staw, B. M. (1976). *OBHP*, **16**(1), 27–44. doi:10.1016/0030-5073(76)90005-2 | VERIFIED-MD |
| **T2-D** | **Fundamental attribution error** | The best-documented constitutively dyadic bias, and the one with the clearest linguistic signature — dispositional versus situational explanation of another's act is directly codable from a transcript. | Ross (1977), doi:10.1016/s0065-2601(08)60357-3 | VERIFIED-MD |
| **T2-G** | **Bandwagon** | Chosen by default, and the weakest representative in the set — see §7. Its evidence base is largely political-science survey work, not experimental psychology. | Nadeau, Cloutier & Guay (1993), doi:10.1177/019251219301400204 | VERIFIED-MD |
| **T3-I** | **Primacy / recency (serial position)** | The most robust *and* most precisely quantified effect in this class by a wide margin — a bowed serial-position curve is a century-old, universally replicated finding. In dialogue it is measurable directly: position-in-list versus recall or endorsement probability. | Murdock, B. B. (1962). The serial position effect of free recall. *J. Exp. Psychol.*, **64**(5), 482–488. doi:10.1037/h0045106 | VERIFIED-MD |
| **T3-D** | **Curse of knowledge** *(proposed addition — not currently in his thirty)* | Fills the empty cell. The cleanest constitutive dyad in the literature: the estimator *contains* two agents. Experimentally crisp (Camerer et al.'s market design). In dialogue, an expert's failure to discount private information is directly observable. | Camerer, Loewenstein & Weber (1989), doi:10.1086/261651 | VERIFIED-MD |
| **T3-G** | **Compassion fade** | Well-evidenced, theoretically clean (affect per victim as a function of N), and dialogically legible — responsiveness collapses as the number of people described rises. | Slovic (2007), doi:10.1017/s1930297500000061 | VERIFIED-MD |

---

# 6. Measurement

## 6.1 Adult Decision-Making Competence (A-DMC) — the strongest available battery

**Citation VERIFIED-MD + reliability table VERIFIED-FT.** Bruine de Bruin, W., Parker, A. M., & Fischhoff, B. (2007). Individual differences in adult decision-making competence. *Journal of Personality and Social Psychology*, **92**(5), 938–956. doi:10.1037/0022-3514.92.5.938. PMID 17484614.

Seven behavioural component tasks, **103 items**. **Table 2 reproduced verbatim from the paper (VERIFIED-FT, full text read):**

| A-DMC component | Cronbach's α | Test–retest r |
|---|---|---|
| Resistance to Framing | **.62** | **.58**\*\*\* |
| Recognizing Social Norms | **.64** | **.46**\*\*\* |
| Under/overconfidence | **.77** | **.47**\*\*\* |
| Applying Decision Rules | **.73** | **.77**\*\*\* |
| Consistency in Risk Perception | **.72** | **.51**\*\*\* |
| **Resistance to Sunk Costs** | **.54** | **.61**\*\*\* |
| Path Independence | **.75** | **.28**\*\*\* |

\*\*\* p < .001, two-sided.

**Aggregate (VERIFIED-FT, verbatim):** *"Cronbach's alpha is **.85** across the z scores for the A-DMC's 103 individual items and **.83** across the z scores for the seven A-DMC components."* Aggregate test–retest **r = .68** (p < .001); excluding Path Independence, **.73** (p < .001).

**Retest sample (VERIFIED-FT):** 106 returned of 138 mailed (76.8% response), mean **17.6 days** after the initial session (SD 5.06); the retest covered 29.4% of the original sample.

**Also reported (VERIFIED-FT):** Recognizing Social Norms α computed separately for personal social norms **α = .75** and predicted peer social norms **α = .93** in this study (Parker & Fischhoff 2005 reported .79 and .88). Decision Outcomes Inventory **α = .88** across 41 items.

**Read this carefully before relying on it.** Two of the seven components are below the conventional .70 threshold, and the one the author most needs — **Resistance to Sunk Costs at α = .54** — is the *worst* in the battery. The authors say so explicitly: alpha *"is above .60 for all component measures except for Resistance to Sunk Costs."* Path Independence has a test–retest of **.28**, which is poor. The aggregate is good; the components are uneven. Any BSS built on A-DMC subscores inherits that unevenness, and the sunk-cost term in particular carries roughly half its variance as error.

**Direct relevance to his thirty:** Resistance to Framing → framing (#12, #13). Resistance to Sunk Costs → sunk cost (#15). Under/overconfidence → Dunning–Kruger (#5), partially. Recognizing Social Norms → social proof (#6), partially.

## 6.2 Susceptibility to Persuasion-II (StP-II) — the closest existing analogue to the BSS

**Citation VERIFIED-MD + full reliability tables VERIFIED-FT** (fetched the PLOS ONE JATS manuscript directly). Modic, D., Anderson, R., & Palomäki, J. (2018). We will make you like our research: The development of a susceptibility-to-persuasion scale. *PLOS ONE*, **13**(3), e0194119. doi:10.1371/journal.pone.0194119. PMID 29543845.

**This is the single most relevant instrument to the author's BSS and he should know it exists.** It is a ten-factor susceptibility scale built for exactly his purpose — predicting compliance with influence attempts.

**Samples (VERIFIED-FT):** Study 1 n = 779 (split Main 500 / Holdout 279); Study 2 n = 6609.

**StP-II full scale, 54 items, 10 subscales — Cronbach's α (VERIFIED-FT):**

| Subscale | Items | α (Holdout) | α (Main) |
|---|---|---|---|
| Premeditation | 6 | .886 | .884 |
| Consistency | 6 | .887 | .889 |
| Sensation Seeking | 6 | .800 | .782 |
| Self-Control | 6 | .856 | .855 |
| **Social Influence** | 6 | **.864** | **.861** |
| Similarity | 4 | .899 | .883 |
| Risk Preferences | 6 | .900 | .909 |
| Attitudes towards Advertising | 4 | .780 | .822 |
| Need for Cognition | 6 | .865 | .893 |
| Uniqueness | 4 | .767 | .795 |
| **Full StP-II** | **54** | **.942** | **.948** |

**StP-II-B brief version, 30 items (VERIFIED-FT):** subscale α range **.747 to .912**; full scale **.910** (Holdout) / **.917** (Main). Initial 136-item pool: standardised α **.958** (n = 779).

**Study 2 replication, n = 6609 (VERIFIED-FT):** subscale standardised α range **.671 to .817**; overall scale **.820**. Note the drop from .94 to .82 on the large independent sample — the paper states it plainly: *"The reliability of particulate scales ranges from moderate to high (.671 to .817) with the reliability of the whole scale at .820."*

**The gap the author must notice.** StP-II has **Social Influence**, **Consistency** and **Similarity** subscales — mapping onto his social proof (w=0.10), commitment, and liking. It has **no authority subscale and no scarcity subscale.** Those are his two highest weights (0.15 and 0.12), together 27% of his BSS, and the best existing persuasion-susceptibility instrument does not measure either.

## 6.3 Cognitive Reflection Test

**Citation VERIFIED-MD:** Frederick, S. (2005). Cognitive Reflection and Decision Making. *Journal of Economic Perspectives*, **19**(4), 25–42. doi:10.1257/089533005775196732

**VERIFIED-FT** (SJDM DMIDI entry, fetched): three free-response brainteaser items (bat-and-ball, widgets, lily pads); "sub-scales: none"; described as assessing the ability to suppress an intuitive System 1 answer in favour of a reflective System 2 answer. **The DMIDI entry reports no internal-consistency figure, and I found no Cronbach's alpha in Frederick (2005).** Do not quote one for the original three-item CRT.

**Extended versions with published psychometrics:**
- Primi, C., Morsanyi, K., Chiesi, F., Donati, M. A., & Hamilton, J. (2016). The Development and Testing of a New Version of the Cognitive Reflection Test Applying Item Response Theory (IRT). *Journal of Behavioral Decision Making*, **29**(5), 453–469. doi:10.1002/bdm.1883 — **VERIFIED-MD**; **VERIFIED-FT** from the accepted manuscript: the three-item CRT's information function yields **r = .84** at the mean trait level, declining to **r = .72** and **r = .80** at trait levels −0.4 and +0.4, and *"information declines sharply below 3 (corresponding to a reliability level < .70) in the rest of the trait range."* The authors conclude the 3-item CRT *"seem[s] incapable of differentiating low from lower medium as well as higher medium from high levels of the latent trait."* This is a real limitation for a continuous susceptibility score: the CRT is reliable only near the middle of the distribution.
- Toplak, M. E., West, R. F., & Stanovich, K. E. (2014). Assessing miserly information processing: An expansion of the Cognitive Reflection Test. *Thinking & Reasoning*, **20**(2), 147–168. doi:10.1080/13546783.2013.844729 — **VERIFIED-MD**; reliability figures **UNVERIFIED**.

## 6.4 Bias Blind Spot scale

**Citation VERIFIED-MD** (direct DOI lookup): Scopelliti, I., Morewedge, C. K., McCormick, E., Min, H. L., Lebrecht, S., & Kassam, K. S. (2015). Bias Blind Spot: Structure, Measurement, and Consequences. *Management Science*, **61**(10), 2468–2486. doi:10.1287/mnsc.2014.2096

**Reliability: UNVERIFIED.** Both open-access mirrors I attempted returned 404. This is a validated scale and the paper does report psychometrics, but I did not see them and will not quote a number. One library fetch resolves it.

Foundational study: Pronin, E., Lin, D. Y., & Ross, L. (2002). The Bias Blind Spot. *PSPB*, **28**(3), 369–381. doi:10.1177/0146167202286008 — **VERIFIED-MD**.

## 6.5 Optimism — and a construct-validity warning

**Citation VERIFIED-MD:** Scheier, M. F., Carver, C. S., & Bridges, M. W. (1994). Distinguishing optimism from neuroticism (and trait anxiety, self-mastery, and self-esteem): A reevaluation of the Life Orientation Test. *JPSP*, **67**(6), 1063–1078. doi:10.1037/0022-3514.67.6.1063

**Reliability: UNVERIFIED.** The commonly quoted LOT-R figures (α ≈ .78; test–retest .68 to .79 across 4 to 28 months) are widely repeated but I did not fetch the source table. Do not print them as sourced.

**The warning matters more than the number.** The LOT-R measures **dispositional optimism** — a stable expectancy trait. The author's bias #4 is the **optimism bias** — a *comparative* judgement error (underestimating one's own risk relative to base rate). These are different constructs with different literatures. An LOT-R score is not a measure of optimism-bias susceptibility, and substituting one for the other would be a construct-validity error sitting on a 0.12 weight.

## 6.6 Dunning–Kruger — no instrument, and a live methodological dispute

**There is no validated Dunning–Kruger susceptibility instrument.** The effect is measured as a *within-subject discrepancy*: self-estimated percentile minus actual percentile, plotted by quartile. It requires an objective performance measure in the same session, which makes it awkward for any dialogue-based protocol.

- Kruger, J., & Dunning, D. (1999). *JPSP*, **77**(6), 1121–1134. doi:10.1037/0022-3514.77.6.1121 — **VERIFIED-MD**
- Krueger, J., & Mueller, R. A. (2002). Unskilled, unaware, or both? The better-than-average heuristic and statistical regression predict errors in estimates of own performance. *JPSP*, **82**(2), 180–188. doi:10.1037/0022-3514.82.2.180 — **VERIFIED-MD**

The 2002 critique argues the pattern is substantially produced by regression to the mean plus a better-than-average heuristic. The author carries Dunning–Kruger at w = 0.11 with no instrument and a contested effect. That combination should be flagged in his own document.

The nearest usable proxy is A-DMC **Under/overconfidence** (α = .77, test–retest .47 — VERIFIED-FT), which measures calibration rather than the quartile-specific pattern.

## 6.7 Where no validated instrument exists

**Stated plainly, because this is the honest bottom line of §5.** Of the author's nine BSS-weighted biases, susceptibility instruments break down as follows:

| Bias | Weight | Instrument status |
|---|---|---|
| Authority | 0.15 | **None.** No validated individual-difference susceptibility measure. Milgram-type paradigms are behavioural, one-shot and not ethically repeatable. StP-II has no authority subscale. |
| Scarcity | 0.12 | **None.** Worchel-type paradigms are experimental manipulations, not individual-difference measures. StP-II has no scarcity subscale. |
| Confirmation | 0.12 | **None validated as an individual-difference measure.** Wason-task and selection-task performance is used as a proxy; no standard scored instrument with published reliability. |
| Optimism | 0.12 | **Partial** — LOT-R measures a *different construct* (see §6.5). |
| Dunning–Kruger | 0.11 | **None** (see §6.6). |
| Social proof | 0.10 | **Partial** — StP-II *Social Influence* subscale, α .861–.864 (VERIFIED-FT); A-DMC *Recognizing Social Norms*, α .64, retest .46 (VERIFIED-FT). |
| Anchoring | 0.10 | **Yes (task, not scale)** — the anchoring index of Jacowitz & Kahneman (1995). Not a questionnaire; requires a calibrated estimation task. |
| Reciprocity | 0.10 | **None.** Regan-type paradigms are behavioural and single-use. |
| Availability | 0.08 | **None validated as an individual-difference measure.** |

**Roughly 0.68 of the BSS weight rests on biases with no validated susceptibility instrument.** That is the most consequential finding in this section and should be stated in the author's own document rather than discovered by a reviewer. It does not invalidate the BSS — it means the S_i,b terms are currently theoretical or rater-assigned quantities, and the document should say so.

**Where to look next:** DMIDI (§1.6), "over 200 individual difference measures" (VERIFIED-FT), is the correct catalogue to search for anything not covered above.

---

# 7. Gaps

1. **No published individual/dyadic/group taxonomy of cognitive biases exists.** Searched for specifically. What exists is a tertiary three-way split (Wikipedia 2020, with a verified 43-item social list), a peer-reviewed individual-vs-group *aggregation* treatment (Kerr et al. 1996), and the social-psychology literature's own informal clustering. **The author's Facet B is a contribution, and should be presented as one.**

2. **No published taxonomy uses the perception → attention → memory → judgement → choice → action → recall sequence.** Dimara et al. (2020) is the closest and differs materially: it has no perception, attention or action stages, and it *adds* causal attribution and opinion reporting.

3. **Dimara's seventh category is unidentified.** The abstract says 7 categories; Wikipedia implements 6 and names 6. One full-text fetch resolves this. Until then, do not write "Dimara's six categories."

4. **Arkes (1991)'s three category names are unverified against the primary source.** Only the bibliographic record was confirmed. Given that Arkes is the closest existing *intervention-oriented* taxonomy and is therefore the natural theoretical parent of this programme, this needs a library fetch.

5. **Tversky & Kahneman (1974)'s internal bias list is unverified.** Three PDF mirrors failed (404 / egress-proxy block) and JSTOR is JavaScript-walled. The three heuristics are verified; the ~12 sub-biases are the standard textbook rendering.

6. **The "188 biases" figure has no primary source.** The Codex file title says "180+"; Benson says 175. If 188 appears anywhere in the author's documents it should be replaced or sourced.

7. **T3-D is empty in his thirty.** Recommendation: add curse of knowledge.

8. **The BSS's largest weights are the least instrumented.** ~0.68 of total weight sits on biases with no validated susceptibility instrument (§6.7).

9. **Bandwagon is a weak T2-G representative.** Its evidence base is political-science survey research. If a stronger group-level representative is wanted, **availability cascade** or **shared information bias** are worth evaluating; both appear in the verified 43-item social list. Primary citations for both: **UNVERIFIED**.

10. **Scopelliti et al. (2015) reliability figures not obtained.** One fetch away.

11. **LOT-R reliability figures not obtained**, and the construct mismatch with optimism bias (§6.5) is the more serious issue of the two.

12. **Decision fatigue (his #26) rests on contested ground.** The Danziger et al. (2011) judicial-decisions study (doi:10.1073/pnas.1018033108, VERIFIED-MD) is the canonical citation and has been challenged on case-ordering grounds; the wider ego-depletion literature failed a large multi-lab replication. Specifics **UNVERIFIED**. At T3 this is low-stakes, but the citation should carry a caveat.

---

# 8. Sources

## Fetched and read in full (VERIFIED-FT)

1. Wikipedia, *List of cognitive biases*, raw wikitext, retrieved 2026-09-12. 244 entries; 6 tasks; 5 flavors; task and task×flavor counts. https://en.wikipedia.org/wiki/List_of_cognitive_biases
2. Wikipedia, *List of cognitive biases*, revision **997422981**, 2020-12-31T12:34:12Z, via MediaWiki API. 200 entries; Belief/decision-making/behavioral 112, Social 43, Memory 45; full 43-item social list.
3. Wikipedia, *Heuristic (psychology)*, raw wikitext, retrieved 2026-09-12. Three T&K heuristics.
4. Benson, B. (2016). *Cognitive bias cheat sheet*. Medium, 2016-09-01. 175 biases; four problems; twenty groupings; Manoogian attribution. https://buster.medium.com/cognitive-bias-cheat-sheet-55a472476b18
5. Wikimedia Commons API, `File:The Cognitive Bias Codex - 180+ biases, designed by John Manoogian III (jm3).png`. Title, description, artist, date 2016-09-05, CC BY-SA 4.0.
6. HAL open-archive API, halId `hal-01868738` — Dimara et al. published abstract: **154 biases, 7 main categories**.
7. Modic, Anderson & Palomäki (2018), PLOS ONE JATS manuscript — full StP-II reliability tables, subscale names, item counts, sample sizes.
8. Bruine de Bruin, Parker & Fischhoff (2007), full text PDF — A-DMC Table 2 (α and test–retest for all seven components), aggregate α .85/.83, aggregate retest .68/.73, retest sample description.
9. Primi et al. (2016), accepted manuscript PDF — CRT IRT information/reliability statements.
10. SJDM **DMIDI** home page and Cognitive Reflection Test entry. "Over 200 individual difference measures"; CRT description; no α reported.
11. PubMed eutils, PMID 17484614 — A-DMC abstract and bibliographic record.

## Bibliographic records verified via Crossref (VERIFIED-MD)

Arkes (1991) doi:10.1037/0033-2909.110.3.486 · Dimara et al. (2020) doi:10.1109/TVCG.2018.2872577 · Tversky & Kahneman (1974) doi:10.1126/science.185.4157.1124 · Tversky & Kahneman (1981) doi:10.1126/science.7455683 · Kerr, MacCoun & Kramer (1996) doi:10.1037/0033-295X.103.4.687 · Ross (1977) doi:10.1016/s0065-2601(08)60357-3 · Malle (2006) doi:10.1037/0033-2909.132.6.895 · Ross, Greene & House (1977) doi:10.1016/0022-1031(77)90049-x · Gilovich, Savitsky & Medvec (1998) doi:10.1037/0022-3514.75.2.332 · Camerer, Loewenstein & Weber (1989) doi:10.1086/261651 · Robinson, Keltner, Ward & Ross (1995) doi:10.1037/0022-3514.68.3.404 · Ross & Stillinger (1991) doi:10.1111/j.1571-9979.1991.tb00634.x · Quattrone & Jones (1980) doi:10.1037/0022-3514.38.1.141 · Tajfel et al. (1971) doi:10.1002/ejsp.2420010202 · Nisbett & Wilson (1977) doi:10.1037/0022-3514.35.4.250 · Thorndike (1920) doi:10.1037/h0071663 · Deutsch & Gerard (1955) doi:10.1037/h0046408 · Asch (1956) doi:10.1037/h0093718 · Milgram (1963) doi:10.1037/h0040525 · Regan (1971) doi:10.1016/0022-1031(71)90025-4 · Loewenstein, O'Donoghue & Rabin (2003) doi:10.1162/003355303322552784 · Krueger (2007) doi:10.1080/10463280701284645 · Pronin, Lin & Ross (2002) doi:10.1177/0146167202286008 · Scopelliti et al. (2015) doi:10.1287/mnsc.2014.2096 · Bruine de Bruin, Parker & Fischhoff (2007) doi:10.1037/0022-3514.92.5.938 · Frederick (2005) doi:10.1257/089533005775196732 · Scheier, Carver & Bridges (1994) doi:10.1037/0022-3514.67.6.1063 · Kruger & Dunning (1999) doi:10.1037/0022-3514.77.6.1121 · Krueger & Mueller (2002) doi:10.1037/0022-3514.82.2.180 · Stanovich & West (2000) doi:10.1017/s0140525x00003435 · Evans (2008) doi:10.1146/annurev.psych.59.103006.093629 · Arkes & Blumer (1985) doi:10.1016/0749-5978(85)90049-4 · Staw (1976) doi:10.1016/0030-5073(76)90005-2 · Hilbert (2012) doi:10.1037/a0025940 · Cialdini, Trost & Newsom (1995) doi:10.1037/0022-3514.69.2.318 · Kaptein et al. (2012) doi:10.1145/2209310.2209313 · Davis (1983) doi:10.1037/0022-3514.44.1.113 · Jacowitz & Kahneman (1995) doi:10.1177/01461672952111004 · Nickerson (1998) doi:10.1037/1089-2680.2.2.175 · Slovic (2007) doi:10.1017/s1930297500000061 · Worchel, Lee & Adewole (1975) doi:10.1037/0022-3514.32.5.906 · Murdock (1962) doi:10.1037/h0045106 · Samuelson & Zeckhauser (1988) doi:10.1007/bf00055564 · Langer (1975) doi:10.1037/0022-3514.32.2.311 · Fischhoff (1975) doi:10.1037/0096-1523.1.3.288 · Iyengar & Lepper (2000) doi:10.1037/0022-3514.79.6.995 · Scheibehenne, Greifeneder & Todd (2010) doi:10.1086/651235 · Ellsberg (1961) doi:10.2307/1884324 · Danziger, Levav & Avnaim-Pesso (2011) doi:10.1073/pnas.1018033108 · Bar-Eli et al. (2007) doi:10.1016/j.joep.2006.12.001 · Festinger & Carlsmith (1959) doi:10.1037/h0041593 · Kirby, Petry & Bickel (1999) doi:10.1037/0096-3445.128.1.78 · Finucane et al. (2000) doi:10.1002/(sici)1099-0771(200001/03)13:1<1::aid-bdm333>3.0.co;2-s · Appelt et al. (2011) doi:10.1017/s1930297500001455 · Primi et al. (2016) doi:10.1002/bdm.1883 · Toplak, West & Stanovich (2014) doi:10.1080/13546783.2013.844729 · Nadeau, Cloutier & Guay (1993) doi:10.1177/019251219301400204 · Modic, Anderson & Palomäki (2018) doi:10.1371/journal.pone.0194119

## UNVERIFIED

- "188 biases" as the Codex count — no primary source located.
- Arkes (1991)'s three category names and their descriptions — bibliographic record only.
- Tversky & Kahneman (1974)'s sub-bias list — heuristics verified, sub-biases not.
- Dimara et al.'s seventh category.
- Scopelliti et al. (2015) reliability figures.
- LOT-R reliability figures.
- Toplak et al. (2014) reliability figures.
- Cialdini, *Influence* (trade book) — liking principle.
- Kahneman, *Thinking, Fast and Slow* (trade book).
- Asch three-to-four confederate asymptote.
- Primary citations for the additional interpersonal biases in §3.2.
- Ego-depletion replication specifics bearing on decision fatigue.
