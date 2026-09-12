# QA report: MPN-1-foundations.md

Reviewer: adversarial, independent of the authors' expected result. Method: facts (a) to (h) established by web search and fetch before the paper was opened; then the paper, the ledger, the four source papers in `/home/claude/eigenia/references/`, and Crossref metadata for the reference spot-check. Line numbers refer to `/home/claude/mpn-drafts/MPN-1-foundations.md` as reviewed on 2026-09-12.

## 1. Verified facts (independent findings)

| Item | Finding | Source |
|:--|:---|:---|
| (a) Four discourses | Positions: agent (upper left), other (upper right), truth (lower left), product (lower right). Master: S1 / $ addresses S2 / a. University: S2 / S1 addresses a / $. Hysteric: $ / a addresses S1 / S2. Analyst: a / S2 addresses $ / S1. Each discourse is a quarter-turn of the previous; Seminar XVII, 1969-70. Under any consistent quarter-turn the cycle is Master, Hysteric, Analyst, University (or its reverse); Master to Hysteric to University is not a rotation. | https://en.wikipedia.org/wiki/Four_discourses |
| (b) Kramers overdamped rate | Hänggi, Talkner, Borkovec, Rev. Mod. Phys. 62(2), 251-341, April 1990. Eq. (1.5): k = ν exp(−βE_b), ν = (ω0/2π)(1/ω_b)[(γ²/4 + ω_b²)^½ − γ/2] (moderate-to-strong friction). Eq. (1.6), Smoluchowski limit γ ≫ ω_b: k = (ω0 ω_b / 2πγ) exp(−βE_b). Validity: Eq. (2.2a) E_b/E_noise ≫ 1, which for a thermal bath reduces to Eq. (2.2b) βE_b ≫ 1. The sentence "the transition-state k_TST seriously overestimates the true rate" appears on p. 253 in the context of Kramers' weak-friction result, Eq. (1.4); the general statement "TST always overestimates the true rate" appears later in section II. | https://link.aps.org/doi/10.1103/RevModPhys.62.251 ; PDF at weizmann.ac.il (pp. 253, 256-257 checked) |
| (c) Stochastic cusp | Grasman, van der Maas, Wagenmakers, J. Stat. Softw. 32(8), 1-27, 2009. Potential −V(y; α, β) = αy + ½βy² − ¼y⁴; SDE dY = −∂V/∂Y dt + dW(t) with white-noise variance σ²; stationary density f(y) = ψ exp[(α(y−λ) + ½β(y−λ)² − ¼(y−λ)⁴)/σ²]; α and β are linear in covariates; α is the asymmetry (normal) factor, β the bifurcation (splitting) factor; fit by maximum likelihood, compared with linear and logistic models by AIC, BIC and pseudo-R². Builds on Cobb and Watson 1980, Cobb et al. 1983. | https://www.jstatsoft.org/article/view/v032i08 ; https://raoelg.r-universe.dev/cusp/doc/Cusp-JSS.pdf |
| (d) Zahler and Sussmann | Nature 269(5631), 759-763, 27 Oct 1977, doi 10.1038/269759a0. Abstract: "Several representative attempts to apply catastrophe theory to biological and social science problems turn out on close analysis to be characterised by incorrect reasoning, far-fetched assumptions, erroneous consequences, and exaggerated claims. Catastrophe theory seems to have made no significant contributions to biology and the social sciences, and to have no advantage over other better-established mathematical tools which have been used to better effect." The argument is methodological (Zeeman's applications in particular); it does not concede any successful application. | https://www.nature.com/articles/269759a0 |
| (e) Sokal and Bricmont on Lacan | Fashionable Nonsense (Picador 1998; French Impostures intellectuelles, Odile Jacob 1997), chapter 1. Specific targets: the analogy between topology (torus, Möbius strip, cross-cap, Klein bottle) and mental structure, called "not just false: it is gibberish"; the "compactness" passage of Seminar XX, which misstates the definition; "the erectile organ ... is equivalent to the √−1" from Écrits; imaginary numbers generally; superficial erudition used to impress. They state they take no position on psychoanalysis as such. I found no source for a concession that the Borromean knot mathematics is correct. | https://en.wikipedia.org/wiki/Fashionable_Nonsense ; Dawkins review at physics.nyu.edu/sokal/dawkins.html (listed by search; TLS blocked the fetch) |
| (f) Gadalla et al. 2026 | Gadalla, M., Nikoletseas, S., Amazonas, J. R. de A. Front. Psychol. 17:1526215, published 23 March 2026 (received 11 Nov 2024, accepted 27 Jan 2026), doi 10.3389/fpsyg.2026.1526215. Method: 40 dialogues, 264 sentences, from the DailyDialog corpus (Li et al. 2017); three "voters" familiar with Lacanian discourse theory independently assign up to three emotions from a 30-emotion set (GoEmotions-derived, "a well-known, fine-grained set of 30 emotions") with confidence scores, and one or more of five discourses (four plus capitalist) with confidence and weight; conditional probabilities and a normalised "relation intensity" in [0, 1]; Krippendorff's alpha across all three raters 0.70 analyst, 0.60 university, 0.55 master and capitalist, 0.52 hysteric; sample-size argument at 90 percent confidence; no classifier trained; method named Lacanian Discourse Discovery (LDD). | https://api.crossref.org/works/10.3389/fpsyg.2026.1526215 ; https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2026.1526215/full |
| (g) SD4 | Paulhus, Buckels, Trapnell, Jones 2021, European Journal of Psychological Assessment 37(3), 208-222, doi 10.1027/1015-5759/a000602. 28 items, four 7-item subscales, three studies (N = 868, 999, 660). Study 3 Table 4: α/ω narcissism .80/.80, Machiavellianism .75/.76, psychopathy .81/.81, sadism .81/.81. Table 6: Agreeableness −.31, −.39, −.41 for Mach, psychopathy, sadism; narcissism +.49 with Extraversion. | https://www.erinbuckels.com/uploads/EJPA.SD4.with.pagination.pdf ; https://econtent.hogrefe.com/doi/10.1027/1015-5759/a000602 |
| (h) Barrett et al. 2019 | PSPI 20(1), 1-68, doi 10.1177/1529100619832930. Conclusion (abstract): people do sometimes smile when happy, scowl when angry, more than chance, but expression varies substantially across cultures, situations and people; similar facial configurations express more than one emotion category and often something other than emotion; reliability, specificity and generalizability of the "common view" are limited; urgent need for research on how people actually move their faces in context. The phrase "are not universally diagnostic of emotional states" is from the APS press summary page, not from the article. | https://api.crossref.org/works/10.1177/1529100619832930 ; https://www.psychologicalscience.org/publications/emotional-expressions-reconsidered-challenges-to-inferring-emotion-from-human-facial-movements.html |

## 2. Errors (severity-ordered)

| Sev. | Line | Error | Fix |
|:--|:--|:---|:---|
| HIGH | 95 | The group action is computed wrongly. With positions (agent 0, other 1, product 2, truth 3), d_M = (S1, S2, a, $) and (g·d)(p) = d(p − 1): g·d_M = ($, S1, S2, a) (hysteric, correct); g²·d_M = (a, $, S1, S2), which is the ANALYST, not the university; g³·d_M = (S2, a, $, S1), the university. The paper states the reverse for g² and g³. The orbit is Master, Hysteric, Analyst, University, which is also Lacan's own order. | Rewrite: "twice, (a, $, S1, S2), the analyst's; three times, (S2, a, $, S1), the university". |
| HIGH | 97-117 | Mermaid diagram and its accDescr carry the same error: arrows labelled g go Master to Hysteric to University to Analyst. Hysteric to University is g², not g. Inconsistent with the definition at line 93. | Reorder the cycle M to H to A to U to M in nodes, arrows and accDescr. |
| HIGH | 36-43 | Section 2.2 states "each discourse is a quarter-turn of the previous one" over a table ordered Master, Hysteric, University, Analyst. Under any rotation, University does not follow Hysteric. Same error as above at the descriptive level. | Reorder table rows to Master, Hysteric, Analyst, University, or drop "of the previous one". |
| HIGH | 339 | Conclusion: "the four discourses are the orbit of one bijection under Z4" is true, but the mathematician cannot sign section 4.1 as written because the orbit is listed in the wrong order. | Follows from the fixes above. |
| MED | 79 | "a 32-item taxonomy": Gadalla et al. use 30 emotions ("a well-known, fine-grained set of 30 emotions"; index 1 ≤ j ≤ 30). The ledger row 39 carries the same wrong number. | Change to 30. Fix ledger row 39. |
| MED | 269 | Quotation "are not universally diagnostic of emotional states" is attributed to Barrett and colleagues' review; it is the wording of the APS press summary, not of the article. The ledger (row 7) admits it is "from the fetched page" (the APS page). Also "found no facial configuration distinctive of a particular emotion, even across cultures" overstates: the abstract says the expected configurations occur "more than what would be expected by chance" but with limited reliability and specificity. | Replace with abstract wording: "similar configurations of facial movements variably express instances of more than one emotion category", and say reliability and specificity are limited rather than absent. |
| MED | 67 | "on the Borromean knot they concede the mathematics is correct [33]": no source found. Sokal and Bricmont's Lacan chapter discusses torus, Möbius strip, cross-cap, Klein bottle, compactness, √−1 and quantifiers; I found no passage on the Borromean knot and the ledger row 33 only claims Wikipedia support for "the first three charges; rest standard". | Delete the clause or cite a page. |
| MED | 71 | "irrational and imaginary numbers, both closures of the rationals": mathematically wrong. The reals are the completion (or the irrationals are the complement of Q in R); the complex numbers are the algebraic closure. The irrationals are not a closure of anything. A mathematician stops here. | "the reals (the completion of the rationals) and the complex numbers (their algebraic closure)", or drop the gloss and attribute it to Plotnitsky. |
| MED | 402 | Reference [58] Kazi et al. is wrong: Human Factors 63(1), 32-65 (2021), not 63(5), 1044-1069. Ledger row 58 marks it VERIFIED; it is not. | Correct volume, issue, pages. |
| MED | 388 | Reference [44] title is wrong: the Physica D paper is "Transformation invariant stochastic catastrophe theory", Physica D 211(3-4), 263-276, 2005, doi 10.1016/j.physd.2005.08.014. | Correct title; add DOI. |
| MED | 426 | Reference [82] Lauro-Grotto: American Imago 64(4), 535-543 is Winter 2007, not 2008 (doi 10.1353/aim.2008.0009 was assigned in 2008). | Year 2007; add pages. |
| LOW | 12, 335 | "Five earlier working-group papers" and "all five papers", but the header (line 7) lists six and references [9] to [14] are six working papers. | Say six, or explain which one is excluded. |
| LOW | 16 | Citation [7] (Barrett et al., facial movements) is used to support "physiology indexes arousal and load rather than emotion". Barrett et al. is not about physiology. | Cite the HRV Task Force [75] or a physiology source, or reword. |
| LOW | 57 | "Lacan closed Seminar II ... with a lecture on psychoanalysis and cybernetics": the cybernetics lecture (22 June 1955) is chapter XXIII; the seminar's final session (29 June 1955, "A, m, a, S") follows it. | "near the close of". |
| LOW | 174 | "the transition-state rate without Kramers' prefactor ... 'seriously overestimates the true rate'": in HTB the quoted sentence is about the weak-friction (energy-diffusion) result, Eq. (1.4); TST has its own prefactor ω0/2π, so "without Kramers' prefactor" is not the right description. | "the transition-state rate, they note, 'seriously overestimates the true rate' in the weak-friction regime, and TST overestimates it in general". |
| LOW | 225 | "escape from the undecided saddle is Kramers-like": Kramers' rate describes escape from a metastable well over a barrier; departure from an unstable point (saddle) under noise is a different problem. | Reword to what Roxin and Ledberg show: reduction to a one-dimensional nonlinear diffusion in a potential, with Kramers-like escape only where a metastable state exists. |
| LOW | 374 | Reference [30] "Cahiers pour l'Analyse 1(3)": there is no issue 3 of volume 1; the Kingston URL "syn1.3" means article 3 of issue 1. | "Cahiers pour l'Analyse 1, 37-49, January 1966". |
| LOW | 373 | Reference [29] gives a chapter DOI (10.7208/9780226486840-007) for a whole book; Crossref does not resolve it. | Drop the DOI or cite the book ISBN. |
| LOW | 428 | Reference [84] lacks pages (479-495). | Add. |

Verified as correct (no change needed): the Kramers formula at line 172 and Eq. (1.6); the validity condition Eq. (2.2b) and the quotation "seriously overestimates the true rate"; the cusp SDE, potential, root structure, fold lines 27α² = 4β³ and stationary-density convention (lines 160-166); the escape-time formula at line 178 and its claim to match the Loman paper (source line 195, with D = β⁻¹); the Zahler and Sussmann abstract quotation; the SD4 item count, subscale reliabilities and Big Five correlation signs; the Gadalla sample (40 dialogues, 264 sentences, three raters, up to three emotions, five discourses, alphas 0.70/0.60/0.55/0.52, relation intensity in [0, 1], no classifier); the Solms quotation (verbatim); the capitalist bijection ($, S2, a, S1) being outside the Z4 orbit; the sexuation formulas; the PLR dihedral group of order 24.

## 3. Unsupported claims (not covered by a VERIFIED ledger entry)

- Line 67: Sokal and Bricmont "concede" the Borromean knot mathematics (see Errors).
- Line 67: "His quantifiers lack the required definitions" as a Sokal-Bricmont charge: ledger row 33 covers only three charges by Wikipedia summary.
- Line 71: Plotnitsky and Fink characterisations rest on Wikipedia (ledger rows 34, 35: "VERIFIED as to content via Wikipedia; book record UNVERIFIED"). Acceptable only if labelled; not currently labelled in the text.
- Line 79: "three Lacanian-trained raters": the source says "three voters, familiar with the Lacanian Theory of Discourses". "Trained" is the paper's word.
- Line 209: the three "technical objections" attributed to Zahler and Sussmann (gradient systems with at most four controls; flags produced by non-catastrophe mechanisms; qualitative curve-drawing). The Nature page fetched supports the abstract only; the ledger row 47 says "the three objections" without a page. Plausible but unverified as a summary of that paper rather than of Sussmann and Zahler 1978 (Synthese), which was dropped.
- Line 215: Kuehn's variance and autocorrelation scalings: ledger UNVERIFIED-canonical; correct as mathematics, but the attribution is not checked.
- Line 249: all DISC claims rest on Wikipedia (ledger row 67). The text labels it tertiary; fine, but the "German evaluation" and "Scandinavian work" are then third-hand.
- Line 269: "Electrodermal activity indexes sympathetic arousal ... not valenced"; "Task-evoked pupil dilation ... swamped ... by luminance and gaze angle"; "Speech-based stress recognition is trained on acted or elicited corpora and its accuracies fall on spontaneous, cross-corpus and noisy data": no citation at all (Boucsein, Beatty, Hogervorst were dropped per ledger "Items deliberately not cited"). Either cite or mark as the working group's summary.
- Line 269: HRV confound list "respiration, posture, movement, caffeine, fitness, age and circadian phase" is attributed to [75]; ledger row 75: "content UNVERIFIED".
- Line 273: "the Regulation's Recital 18 carves out [fatigue] as a physical state": correct in substance (Recital 18 excludes physical states such as pain or fatigue), covered by ledger row 3.
- Line 303: Carhart-Harris and Friston paraphrase ("the ego as the higher-level hierarchy that explains away prediction error"): ledger row 78 is a page record only.
- Line 311: "Lauro-Grotto's reading ... the one treatment in that line with checkable mathematical content": ledger row 82 is "VERIFIED (secondary, via Joncas)", a blog.
- Line 221: "the paper never plotted arousal against performance": true but rests on Teigen (ledger row 55 verified to exist only).

## 4. Reference spot-check table

| Ref | Status | Note |
|:--|:--|:---|
| [7] Barrett et al. 2019 | OK | PSPI 20(1), 1-68, DOI resolves. Quotation misattributed (see Errors). |
| [30] Miller 1966 | WRONG (minor) | "1(3)" is not an issue number; Cahiers pour l'Analyse 1, 37-49. |
| [31] Miller 1977-78 | OK | Screen 18(4), 24-34, doi 10.1093/screen/18.4.24. |
| [39] Gadalla et al. 2026 | OK | Front. Psychol. 17:1526215; add article number. |
| [40] Kramers 1940 | OK | Physica 7(4), 284-304. |
| [41] Hänggi et al. 1990 | OK | RMP 62(2), 251-341; Eq. (1.6) and (2.2b) confirmed in PDF. |
| [42] Grasman et al. 2009 | OK | JSS 32(8). |
| [43] Cobb and Watson 1980 | OK | Mathematical Modelling 1(4), 311-317, doi 10.1016/0270-0255(80)90041-x (add). |
| [44] Wagenmakers et al. 2005 | WRONG | Title is "Transformation invariant stochastic catastrophe theory"; 211(3-4), 263-276. |
| [46] Zeeman 1976 | OK | Sci. Am. 234(4), 65-83, doi 10.1038/scientificamerican0476-65. |
| [47] Zahler and Sussmann 1977 | OK | Nature 269(5631), 759-763. |
| [49] Guastello 1988 | OK | Psych. Bull. 103(2), 246-255. Ledger marks "from memory"; now confirmed. |
| [52] Kuehn 2011 | OK | Physica D 240(12), 1020-1035. |
| [53] van de Leemput et al. 2014 | OK | PNAS 111(1), 87-92. |
| [54] Yerkes and Dodson 1908 | OK | J. Comp. Neurol. Psychol. 18(5), 459-482, doi 10.1002/cne.920180503. |
| [55] Teigen 1994 | OK | Theory & Psychology 4(4), 525-547, doi 10.1177/0959354394044004. |
| [56] Hancock and Warm 1989 | OK | Human Factors 31(5), 519-537. |
| [58] Kazi et al. 2021 | WRONG | Human Factors 63(1), 32-65, not 63(5), 1044-1069. |
| [62] Ratcliff and Van Dongen 2011 | OK | PNAS 108(27), 11285-11290. |
| [63] Roxin and Ledberg 2008 | OK | PLoS Comput. Biol. 4(3), e1000046. |
| [70] Paulhus et al. 2021 | OK | EJPA 37(3), 208-222. |
| [78] Carhart-Harris and Friston 2010 | OK | Brain 133(4), 1265-1283; DOI 10.1093/brain/awq010 available, add. |
| [79] Solms 2019 | OK | Front. Psychol. 9:2714. |
| [82] Lauro-Grotto | WRONG | 2007, not 2008; pages 535-543. |
| [83] Borsboom 2017 | OK | World Psychiatry 16(1), 5-13. |
| [84] Crans et al. 2009 | OK | AMM 116(6), 479-495 (pages missing in entry). |
| [37] Greenshields 2017 | OK | Springer DOI resolves. |
| [29] Liu 2010 | UNVERIFIABLE | Book is real; the chapter DOI given does not resolve at Crossref. |
| [4] Commission guidelines C(2025) 5052 | UNVERIFIABLE | Page confirms publication 4 Feb 2025 and update 31 July 2025; the C-number and 29 July 2025 date not confirmed on the page fetched. The February version circulated as C(2025) 884 final; check which is cited. |
| [19] Verhaeghe 1995 | UNVERIFIABLE | Not in Crossref; The Letter 3 (Spring 1995), 76-99 per my recollection. Add pages if confirmed. |

Total spot-checked: 30. WRONG: 4 ([30] minor, [44], [58], [82]). UNVERIFIABLE: 3.

## 5. Style violations

- Em dashes: none. Banned words: none. Leading H1: none. Headings over 90 characters: none. "OXOT": absent. Mermaid: 3 blocks, each with accTitle and accDescr.
- KaTeX: 9 display blocks, each opened and closed on one line; all inline `$...$` pairs balanced. `\tfrac`, `\text`, `\longrightarrow`, `\mathbb`, `\exp\!` are all KaTeX-supported.
- `$` inside table cells (rule breach): lines 40-43 (`$S_1$`, `$\$$` etc. in the discourse table), 321, 325, 329, 331, 333 (corrections table). The `$\$$` construct (inline math containing an escaped dollar) is well-formed for KaTeX but fragile in pipe tables; replace the table cells with plain text (S1, S2, a, $ as text, or "barred S").
- Citation format: multi-citation runs use `[15] [16] [17]` (space-separated), consistent throughout. Citations before a comma or semicolon rather than a period occur at lines 16, 57, 71, 170, 180, 225, 269, 273, 309, 332; if the corpus rule is strictly `word [n].`, these need restructuring, otherwise they are acceptable.
- Section 2.5, line 57: "checkable finite-state combinatorics" is fine; but "Liu documents that it was a direct response to Shannon, Wiener and the Macy conferences" is a strong paraphrase for a historical argument.
- "The ledger" appears as an actor in the running text at lines 24, 71, 79, 225, 229, 245, 249, 261. An external reader has no idea what the ledger is. Either define it once in section 1 or rephrase as "the working group found".

## 6. Weakest paragraphs

1. Line 95 (section 4.1, the paragraph applying g). This is the one paragraph a mathematician would check by hand, and it is wrong: g² lands on the analyst, not the university. The diagram and the section 2.2 sentence repeat the mistake. The fix is small, but as written the paper's central formal claim fails its own test.
2. Line 16 (executive summary, third paragraph). One 150-word sentence stacks four legal instruments, a psychological claim and a design decision under "because ... and because ... since ... since ... and since". The psychological clause cites Barrett et al. for physiology, which it is not about. A control engineer wants the design rule in one sentence and the grounds in the next three; a lawyer wants the instruments cited separately.
3. Line 71 (section 3.2, the defences). "Both closures of the rationals" is false; "the positions are incompatible ... so a paper cannot cite both for one claim" is an editorial rule presented as a consequence; "Milner's account is the most useful for an engineer" is asserted without saying what an engineer would do with it. This paragraph is where the psychologist and the mathematician both lose confidence.

Runners-up: line 269 (six empirical claims about EDA, pupillometry and speech stress with no citation, followed by the misattributed Barrett quotation); line 225 ("escape from the undecided saddle is Kramers-like" is not what a diffusion model does); line 131 (the "Borromean constraint" is given three clauses whose first, "no channel is derivable from a second channel alone", is not a property of the Borromean rings and is not defined for a notation).

## 7. Verdict

PUBLISHABLE AFTER FIXES.

The paper's architecture holds: the Kramers and cusp mathematics is right, the SD4 and Gadalla numbers are right (one wrong count), the corrections table quotes the earlier papers accurately (rows 1, 3, 6, 7, 10, 12, 13 checked against source text), and the style rules are met apart from `$` in table cells. What blocks publication is one genuine mathematical error repeated in three places (the orbit order of the quarter-turn), one misattributed quotation, one false mathematical aside, one unsupported concession attributed to Sokal and Bricmont, and four bibliographic errors, two of which the ledger had marked VERIFIED. All are local edits; none requires restructuring.
