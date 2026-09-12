# Adversarial review of MPN-4-MX-R, the closed research environment edition

| Field | Value |
|:---|:---|
| Subject | `MPN-4-MX-R`, the closed research environment edition of Paper 4 (`MPN-4-MX-deployment-mexico.md`), invariants DM-1 to DM-23, 87 references |
| Date | 2026-09-12 |
| Method | Two independent reviewers, neither told the expected result nor the other's findings. Reviewer A took citations, cross-references and internal consistency; reviewer B took experimental design, measurement and statistics |
| Scope exclusion | Legal, regulatory, privacy and research-governance analysis was excluded by the author's instruction. Neither reviewer evaluated it, neither recommends adding it, and the absence of it is counted nowhere as a defect. The data are synthetic and the environment is closed |
| Detailed reports | `QA-MPN-4-MXR-citations.md` (reviewer A, 34-reference spot check, cross-reference table, claim audit); `QA-MPN-4-MXR-method.md` (reviewer B, study-by-study critique, numerical consistency table, measurement-validity table) |

## Combined verdict

**Publishable after fixes, with three blocking items.** The paper's first half is strong and the second half is not yet at the same standard. Sections 1 to 4, which define the environment, the provenance and determinism requirements, the renderer separation and the claim-to-dataset binding, are sound, and the requirement set DM-1 to DM-23 is contiguous, correctly counted and largely well drafted. The reference apparatus is complete in both directions and survived a thirty-four-reference spot check with one wrong title. The honesty framing holds: nothing anywhere is presented as measured.

Sections 5 and 6, the experimental programme, do not meet the standard sections 2 and 3 set. Not one of the six studies would pass the paper's own DM-14 and DM-15 as filed: no sample size, no power calculation, no stopping rule, no exclusion rule, no multiplicity policy, and one gesture at a primary outcome. Two studies are sound in form but lack the control condition that would make a result interpretable. One is not salvageable in its present framing because the construct it names is absent from its design. One is a forward reference to an analysis whose synthetic arm has no declared generative model to test against.

The central intellectual defect is the one the paper is most careful about in the abstract and least careful about in its claim sentences. Stipulated ground truth is treated as ground truth, and evidence about the encoder is repeatedly promoted to evidence about the construct. The environment can measure how people hear sounds. It cannot measure what the sounds are about. Half the programme is designed as though it could. Reviewer B rates the paragraph at line 321, on how a synthetic environment fools itself, the best methodological writing in the series; the fix is to apply its own argument to the claim sentences at lines 299, 331, 335 and 381.

## Blocking

1. **Study 5.5 has no independent variable.** Its stated variable contradicts the translation declared in section 4.3 (line 216 against line 293). Only about four scalars reach the renderer against roughly twenty vector components, so the recovery ceiling is computable in advance and the stated primary outcome has no interpretable direction. State the candidate psychometric mapping as an explicit function with a computed rank; if the rank is four, say so and rescope. Milestone M4 has no content until this is settled.
2. **The learned renderer's training target is never stated** (line 260). If it trains on fixed-renderer audio, it is capped at the fixed renderer and DM-13's comparison is a foregone conclusion; anything else breaks the "exact by construction" labelling. Study 5.4, milestone M5 and the third outcome at line 333 are all contingent on one missing sentence.
3. **Six studies violate the paper's own DM-14 and DM-15.** Either add sample sizes, power analyses, stopping and exclusion rules, primary outcomes and multiplicity policies to all six, or state plainly that section 5 contains design outlines and that the registrable protocols are separate documents.

## Severe

4. Add the decorrelated-rendering control arm to study 5.2 and settle whether audio continues during SAGAT freezes; without both, the study cannot distinguish information from sound.
5. Specify the surrogate test completely (algorithm, preserved statistic, count, test statistic, null, alpha) and pre-register the window and detrending bandwidth. As written, a positive early-warning result is available on demand through analyst degrees of freedom.
6. Exclude series downstream of the alert rule and the flood machine from the bimodality and hysteresis tests. Those mechanisms supply engineered hysteresis, so MPN-1's requirement (c) would otherwise be satisfied by an `if` statement.
7. Declare the plant twin's generative model and run the early-warning analysis against both a fold-bearing and a provably fold-free twin with matched spectra, reporting sensitivity and false-positive rate separately.
8. Restore MPN-2 section 9's two-stream retention criterion and its visual baseline condition to study 5.1, and give the scaling half of the magnitude estimation an analysis and a criterion.
9. **Line 23's central structural claim is false as written.** E-11 forbids any record of who used the mute and is not in the relaxation table, while lines 33, 92 and 154 all require the mute to be logged as a measure. Name E-11 in the table or drop the mute record. E-15 is likewise undeclared, and F-10, N-20, N-23, E-12, E-13, E-18 and E-19 are never discharged.
10. **DM-18's mechanism does not exist.** It requires five fields per affective label; DM-5 and the section 2.5 schema provide none and section 4.4 provides two. This is the mechanism the paper's honesty argument rests on. The run configuration and frame-table hash that DM-4, DM-7 and DM-17 depend on are also absent from the declared dataset layout.

## Major

11. Two verifiable factual errors contradict MPN-3: line 76 says the served endpoint accepts three scalars where MPN-3 says five (three is the adjective count), and the 57-dimensional enumeration omits trauma and entropy, summing to 55. Line 17 also attributes the random-target and ten-error-string training to "the projector", which was never trained; it means the v1 GPT-2 and the v2 planner.
12. Two different quantities are both named "the load index", MPN-2 section 3.2 against line 224, in the same schema and the same early-warning channel list.
13. The N-25 relaxation makes the fatigue index a mapping, but MPN-2 gives it no evidence tier for DM-17 to print. Tier it or leave it an annotation.
14. Line 319 claims MPN-1 section 5.6 is "adopted whole" while line 317 reverses requirement (a)'s exclusion of staff physiology. Say which requirements are adopted, which are modified and why.
15. Study 5.4 needs a mismatched-rendering floor and a plain parameter-mapping competitor, a defined FAD reference set or no FAD, a specified probe corpus, a declaration of interpolation against extrapolation for held-out vectors, a named rating instrument and a preference-pair count.
16. Study 5.6 has no milestone and no gate in section 9, needs a masking-matched distractor arm, and needs its training content specified.
17. The section 4 mermaid diagram cannot render operational mode (no `OPM --> REND`), has no calculus node, and logs nothing but audio, against its own accDescr and against DM-5. The roadmap's gate G1 requires DM-11, which is what M1 delivers, and its accDescr contradicts its own edges.
18. DM-18's normative language is inverted: "No such label MUST be carried" means the opposite of what is intended.

## Moderate and minor

19. Rewrite the claim sentences at lines 299, 331, 335 and 381 so that "the encoding is audible" is never written as "the mapping is calibrated", and list generator-internal results separately from participant results in the outcome list.
20. Define the listener population; "operators of the target population" has no referent in a closed environment with a synthetic plant.
21. Qualify line 106: sufficiency of one accelerator for a ten-hour corpus is extrapolated about twenty-two-fold from a twenty-seven-minute demonstration that reports no metric.
22. Re-attribute the speech-stress claim at line 226 to the working group's own reading, as the ledger and MPN-1 already do; the trailing citations make a facial-expression review appear to source it.
23. Reconcile the N-14 relaxation with DM-7; make the three manifest enumerations agree; fix the channel inventories (the synthetic historian node, the luminance channel); complete the subject column for N-3, N-19, N-25 and E-5; remove the undefined field-edition imports "premium delta" and "underwriting arithmetic"; state whether E-15 binds the learned rendering path; cite F-6 in DM-20; fix the E-4 cross-reference to Paper 2 section 8.2.
24. Reference [76] reads "Stadium-wise" for "Stagewise", inherited from MPN-1 [44]; references [37] to [40] and [70] lack authors that resolve from the DOIs they already print; [40] needs volume 6 and [34] pages 573 to 576.
25. Series hygiene: MX-R strips diacritics and abbreviates author lists that MPN-3 and the EU edition give in full, and carries article numbers and page ranges the siblings omit. Pick one convention and apply it to all five papers.
26. Require independent random streams per stochastic component in DM-3, so repeated runs are genuine replicates rather than one recorded seed.
27. Add a scenario-validity measure to study 5.2, since its external reach is bounded by the plausibility of the plant twin's scripted scenarios.
28. The relaxation table covers N- and E-requirements only, while line 13 says F-1 to F-14 bind except where MX-R relaxes them. Operator-state mode renders per-participant physiological inference, which a reader will compare against F-10 and F-11. State in one line whether the F-requirements' deployment clauses are considered inapplicable to a study condition, so no reader has to infer it. This is a normative-documentation gap, not a governance finding.

## What the reviewers did not find

No fabricated reference. No orphan citation in either direction. No claim that the system has measured a lead time, an accuracy, an incident rate or a premium effect. No place where the paper asserts the psychometric-to-music mapping is validated. Full corpus style compliance: no em dashes, none of the banned words, no leading H1, every heading under ninety characters, accTitle and accDescr on all four mermaid blocks, no company named, no arithmetic inside table cells.
