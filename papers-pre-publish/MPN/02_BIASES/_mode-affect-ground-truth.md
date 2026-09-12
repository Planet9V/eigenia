# M1 — Mode/Affect Ground Truth for Synthetic Rater Panel Calibration

Compiled 2026-09-12. Every row carries a verification status:

- **VERIFIED** — I fetched a page or PDF that states it, and read the statement myself.
- **SECONDARY** — a review, a citing paper, or an encyclopedia states it; I did not read the primary.
- **UNVERIFIED** — I could not confirm it.

Primary artefacts read in full: Temperley & Tan (2013) publisher PDF; Tan & Temperley (2017) PDF; Eerola, Friberg & Bresin (2013) full text incl. Table 1; Smit et al. (2022) full text. Bibliographic metadata for every cited work was checked against the Crossref API unless noted. **Perplexity MCP tools were unreachable this session** (remote device timeout), so everything here came from WebSearch/WebFetch/Crossref/Europe PMC.

---

## 0. Summary table — calibration anchors

| # | Anchor | Direction | Strength (best available number) | Best citation | Standing | Status |
|---|---|---|---|---|---|---|
| A1 | **Tempo → arousal** | Faster = higher arousal / energy / activity | Ramos et al. 2011: *F*(2,116) = 268.62, MSE = 0.6676, *p* < .001 — the largest single effect in that study. Færøvik & Specht 2026 (N = 1280): tempo → "vitality" *F*(3,1035) = 35.10, ηp² = .09 | Ramos, Bueno & Bigand (2011) *Braz J Med Biol Res* 44(2):165–172, DOI 10.1590/S0100-879X2010007500148 | **Established and replicated**, ~90 years, many labs | VERIFIED (abstract; Europe PMC) |
| A2 | **Mode (major/minor) → valence** | Major = positive valence / happy; minor = negative / sad | Eerola et al. 2013: mode *sr²* = 0.48 (happy), 0.54 (sad), β = +1.77 / −1.60. Færøvik & Specht 2026: mode → unease *F*(1,1036) = 189.51, ηp² = .15. Meta-analytic pooled behavioural SMD = 0.2167, 95% CI [0.1089, 0.3245], *I²* = 65.3% | Eerola, Friberg & Bresin (2013) *Front Psychol* 4:487, DOI 10.3389/fpsyg.2013.00487 | **Established and replicated**, but see A2b | VERIFIED (Table 1 read directly) |
| A2b | **Tempo vs. mode dominance** | *Disputed.* Most of the older literature ranks tempo above mode; the best-controlled factorial study ranks mode above tempo | Gagnon & Peretz 2003: both matter in isolation, "with the tempo being more salient, even when tempo salience was adjusted." Eerola et al. 2013: median *sr²* mode 0.29 vs. tempo 0.14 — and the authors explicitly flag this as conflicting with Gundlach 1935, Hevner 1937, Rigg 1964, Scherer & Oshinsky 1977, Juslin & Lindström 2010 | Gagnon & Peretz (2003) *Cognition & Emotion* 17(1):25–40, DOI 10.1080/02699930302279; Eerola et al. (2013) | **Genuine disagreement in the literature** — do not treat either direction as ground truth | VERIFIED (both) |
| A3 | **Consonance / roughness → tension** | Higher roughness / sensory dissonance = higher tension, lower valence, higher energy-arousal. But roughness is *not* the dominant predictor of consonance ratings | Bigand, Parncutt & Lerdahl 1996: tension arises from "a convergence of several cognitive and psychoacoustics influences, whose relative importance varies, depending on musical training." Eerola & Lahdelma 2021 (9 datasets): best model *R²* = 0.73; familiarity 46.2 % of explained variance vs. roughness+harmonicity 19.3 %; semi-partials familiarity *sr* = −0.216, roughness *sr* = −0.141, harmonicity *sr* = 0.047 | Bigand, Parncutt & Lerdahl (1996) *Perception & Psychophysics* 58(1):125–141, DOI 10.3758/BF03205482 | **Direction established and cross-culturally replicated** (Athanasopoulos et al. 2021); *magnitude and mechanism contested* | VERIFIED (abstract + publisher results page) |
| A4 | **Pitch height / register → arousal** | Higher register = higher energy-arousal. Direction on *valence* is **contested** | Eerola et al. 2013: register *sr²* = 0.15 (scary, β = −0.23), 0.09 (happy, β = +0.18), median 0.08. Ilie & Thompson 2006: "high-pitched speech but low-pitched music" rated more pleasant | Eerola, Friberg & Bresin (2013); Ilie & Thompson (2006) *Music Perception* 23(4):319–330, DOI 10.1525/mp.2006.23.4.319 | **Arousal link established**; **valence link disputed** (three sources point three ways) | VERIFIED (Eerola table; Ilie abstract) |
| A5 | **Loudness / dynamics → power or arousal** | Louder = more energetic, more tense, and (in music) more pleasant | Ilie & Thompson 2006: "loud excerpts were judged as more pleasant, energetic, and tense than soft excerpts" in both music and speech. Eerola et al. 2013: dynamics *sr²* = 0.08 (scary, β = +0.20), 0.14 (peaceful, β = −0.28), **but ≈ 0.00–0.01 for happy/sad** | Ilie & Thompson (2006) | **Established for arousal/tension**; weak-to-null for the happy–sad axis specifically | VERIFIED |

**Ranking of how safely each can be used as a pass/fail test:** A1 ≥ A2 > A5 ≈ A3 (direction only) > A4 (arousal only). A2b and A4-valence must **not** be used as pass/fail items.

---

## 1. Temperley & Tan (2013) — the primary source

**Citation (VERIFIED).** Temperley, D., & Tan, D. (2013). Emotional Connotations of Diatonic Modes. *Music Perception*, 30(3), 237–257. DOI 10.1525/MP.2012.30.3.237. Received 29 June 2011, accepted 17 April 2012. Read from the authors' own copy of the published article: `https://davidtemperley.com/wp-content/uploads/2015/11/temperley-tan.pdf` (10-page two-up scan of pp. 237–257). Crossref lists the issue as 2012-12; the article page footer prints "© 2013".

### 1.1 Design (all VERIFIED from the PDF)

- **Participants:** 17 undergraduates at the University of Rochester (9 female, 8 male), paid $10. **None were music majors.** Mean 1.9 years of music lessons (incl. group lessons); none more than six. Two said they had learned about diatonic modes; both then failed a simple mode question ("A melody using the C major scale with a tonal center of G would be in ___ mode"). Mean 11.7 hours of music listening per week; 15 of 17 named rock among the styles they listen to.
- **Stimuli:** six "basic melodies" composed in C Ionian, 4–8 bars, various time signatures, each using **all seven** scale degrees at least once, "in the style of traditional European folk melodies or children's melodies." Performed by the first author on a MIDI keyboard at a moderate tempo without a metronome, "in a musical (but not expressively exaggerated) style," rendered with the QuickTime Acoustic Grand Piano sound, heard over headphones, uniform dynamic level.
- **Transposition across modes — the key methodological point.** The tonic was held **constant at C** and the *key signature* was changed (Figure 1B mapping). A program altered the pitches of specific notes in the MIDI file, so **the expressive timing and phrasing of the original performance is identical across all six versions of a melody.** 6 melodies × 6 modes = 36 stimuli.
- **Modes:** Lydian, Ionian, Mixolydian, Dorian, Aeolian, Phrygian. **Locrian was excluded.** Authors' reason, verbatim: "it is virtually impossible to compose a melody that 'sounds' Locrian… such a melody will almost always imply an alternative tonic. (No doubt this is partly because scale-degree 5̂ is absent.)"
- **Task and scale:** **forced-choice pairwise comparison, not a rating scale.** Each trial = two modal versions of the *same* basic melody separated by a 2-s pause; participants circled "1" or "2" for "whether the first or the second melody is the HAPPIER of the two." All 15 mode pairs × 6 melodies = **90 trials**, in a different random order per participant, each heard **once only**.
- **Perceived, not felt.** Instructions said the experiment was about the "emotional connotations" of melodies — "what makes a melody seem happy or sad." Verbatim: "By focusing participants on the qualities of melodies themselves, rather than on how the melodies made them feel, we hoped to elicit reports of perceived rather than felt emotions."
- **Order control:** two "order groups" (first/second arrangement of the 15 canonical pairs), so each participant heard every mode in first and second position 15 times each and both orderings of each pair three times each.

### 1.2 The ordering — the number you asked for (VERIFIED, Figure 10)

Dependent measure: **proportion of trials involving that mode on which that mode was judged happier.**

| Rank | Mode | Proportion judged happier |
|---|---|---|
| 1 | **Ionian** | **.83** |
| 2 | **Mixolydian** | **.64** |
| 3 | **Lydian** | **.58** |
| 4 | **Dorian** | **.40** |
| 5 | **Aeolian** | **.34** |
| 6 | **Phrygian** | **.21** |
| — | Locrian | not tested |

### 1.3 Shape of the result — is it monotonic in sharpness? (VERIFIED)

**No — and this is the single most important fact for your purposes.**

The paper's own summary, verbatim: *"modes become happier as scale-degrees are raised — that is, as sharps are added and flats are removed"* — **"with the exception of Lydian."** Lydian is the sharpest mode but is rated *less* happy than Ionian (significantly so, *p* < .05 Bonferroni-corrected).

So the ordering is **monotone in distance from Ionian** (a unimodal peak at Ionian), **not** monotone in line-of-fifths position. A model predicting happiness as a linear function of the number of scale degrees shared with Ionian "would fit the data quite well" (the dotted line in their Figure 10).

The five mode-orderings differ as follows:

- Line-of-fifths / pitch-height prediction: Lydian > Ionian > Mixolydian > Dorian > Aeolian > Phrygian (strictly monotone).
- Familiarity (unimodal) prediction: Ionian at the peak, falling off with distance in both directions.
- **Observed:** Ionian > Mixolydian > Lydian > Dorian > Aeolian > Phrygian.

The observed result matches the unimodal familiarity prediction **except** that Lydian and Mixolydian are equidistant from Ionian (both differ by one degree) yet Mixolydian — much the more common in popular music — is only non-significantly ahead of Lydian, and almost half the participants put Lydian ahead. The authors take this residual as evidence for an additional **"sharpness"** factor on top of familiarity, and prefer the **line-of-fifths** account over the pitch-height account because prior work ties pitch height to arousal rather than valence.

### 1.4 Statistics (VERIFIED)

- No overall within-trial order effect: first mode chosen on 50.4 % of trials; one-sample *t* on per-participant counts, mean 45.3 vs. expected 45.0, *t*(16) = 0.32, ns.
- Mixed ANOVA (mode and melody within-subject, order group between-subject): **main effect of mode, *F*(5,75) = 50.73, *p* < .001.**
- Mode × order group: *F*(5,75) = 0.31, ns. Melody × mode: *F*(8.8, 132.2) = 1.81, *p* = .07 (Greenhouse–Geisser). Melody × mode × group: *F*(25,375) = 0.83, ns. No main effect of melody or order group.
- **Pairwise (Table 1, Bonferroni-corrected): 12 of the 15 pairs significant.** The three non-significant pairs are **Lydian/Mixolydian, Lydian/Dorian, Dorian/Aeolian.** Ionian beat every other mode at *p* < .001. Lydian < Ionian at *p* < .05; Lydian > Aeolian at *p* < .05; Lydian > Phrygian at *p* < .001. Mixolydian > Dorian *p* < .001, > Aeolian *p* < .05, > Phrygian *p* < .001. Dorian > Phrygian *p* < .05. Aeolian > Phrygian *p* < .05.
- Individual consistency: excluding Lydian trials, **every** participant favoured the sharper ("lower-numbered") mode on more than half of 60 trials; significant by χ² for 15 of 17.
- Within-trial order bias: only two pairs showed it — Dorian/Phrygian (.62, *p* < .05) and Aeolian/Phrygian (.64, *p* < .01). The authors attribute this to listeners sometimes hearing the Phrygian melodies with A♭ as tonic (i.e. as Ionian) rather than C.

### 1.5 Musically trained vs. untrained listeners (VERIFIED)

The main experiment used **only nonmusicians.** But the paper reports a **pilot with 18 musically trained participants (students at the Eastman School of Music)**, identical except that within-trial ordering was not systematically controlled. Verbatim:

> "The results were qualitatively very similar to the results of the current experiment, with one difference: Lydian was actually judged to be slightly happier than Mixolydian. (Lydian was favored in 71% of all trials involving that mode, while Mixolydian was favored in 65% of all trials involving that mode.)"

So: **training did not change the overall shape**; it shifted Lydian up relative to Mixolydian. Note that even the trained group did not put Lydian above Ionian. Within the untrained sample, 7 of 17 favoured Lydian over Mixolydian across all trials, 9 favoured Mixolydian, 1 tied; on the six direct Lydian/Mixolydian trials, 9 favoured Mixolydian, 4 favoured Lydian (one favoured Lydian on all six), 4 tied. No participant preferred Lydian over Ionian across all trials; 2 did so on the six direct trials and 3 split evenly.

### 1.6 What I could not get

- The raw per-participant data and the underlying figure values beyond the two-decimal proportions printed under Figure 10 — **UNVERIFIED**, not published in the article.
- The UC Press article record (`online.ucpress.edu`) returned HTTP 403 to every request, so the publisher-side abstract was not read; the authors' PDF of the same published article was used instead.

---

## 2. Replications, extensions, contradictions

### 2.1 Tan & Temperley (2017) — the authors' own follow-up (VERIFIED, read in full)

Tan, D., & Temperley, D. (2017). Perception and Familiarity of Diatonic Modes. *Music Perception*, 34(3), 352–365. DOI 10.1525/mp.2017.34.3.352.

This is **not** a replication of the happiness result; it is a direct test of the *explanation*. Four experiments on mode pairs Lydian/Ionian, Ionian/Mixolydian, Dorian/Aeolian, Aeolian/Phrygian. Listeners heard a three-bar context in one mode plus a one-bar ending in either the context mode or the adjacent mode, and rated how well the ending "fits." Participants: MI and DA experiments, 18 Rochester + 12 Indiana students; IL and AP, 16 Rochester + 12 Indiana. No music majors (Rochester mean 1.5 years of lessons, max 5; Indiana mean 0.75, max 3). $10 each.

Findings:

1. **Significant effect of ending mode and significant ending × context interaction in all four experiments.** Endings matching the context were rated as fitting better — even for Lydian, Mixolydian, Dorian and Phrygian contexts. Conclusion: untrained listeners **do** internalise modal frameworks; the "chromatic inflections against an underlying major" alternative from the 2013 paper is unsupported.
2. **The familiarity profile is bimodal, with peaks at Ionian and Aeolian** — not unimodal at Ionian. Strength of a mode in its own context (rating of matching ending minus alternative): Lydian context 0.125; Ionian context 2.22; Aeolian context 1.56.
3. **Therefore familiarity alone cannot explain the 2013 happiness ordering.** Verbatim: "Whereas in the earlier study, Dorian was rated relatively happier than Aeolian, in the current DA experiment, Aeolian endings were judged as better fitting than Dorian endings overall."
4. Their proposed model: **happiness ≈ familiarity + a linear "sharpness" term** (their Figure 9), the sharpness term explained by position on the line of fifths. They state explicitly: "in general, the factor of pitch height in music is not associated with valence (positive/negative emotion), but rather with arousal (energy/activity) (Gabrielsson & Lindström, 2001)." They flag the combined model as "only tentative."

### 2.2 Ramos, Bueno & Bigand (2011) — the only other study to rate all seven modes

**Citation VERIFIED (Crossref + Europe PMC):** Ramos, D., Bueno, J. L. O., & Bigand, E. (2011). Manipulating Greek musical modes and tempo affects perceived musical emotion in musicians and nonmusicians. *Brazilian Journal of Medical and Biological Research*, 44(2), 165–172. DOI 10.1590/S0100-879X2010007500148. PMID 21180883. (scielo.br is behind a bot shield; the abstract came from Europe PMC.)

**Abstract-level findings (VERIFIED):** 7 modes × 3 tempi. 24 musicians (19–25, 12 M / 12 F) and 24 nonmusicians (17–25, 12 M / 12 F). Task: listen, then assign one emotion — happiness, serenity, fear, anger, or sadness. Results:

- Tempo **strongly** affected arousal: *F*(2,116) = 268.62, MSE = 0.6676, *p* < .001.
- Tempo affected valence "to a lesser extent": *F*(6,348) = 8.71, MSE = 0.6196, *p* < .001.
- **Mode modulated valence: *F*(6,348) = 4.24, MSE = 0.6764, *p* < .001.**
- Some tempo × mode interaction, *F*(1,58) = 115.6, MSE = 0.6428, *p* < .001, "but, in most cases, the two parameters had additive effects."

*Caveat I must flag:* the degrees of freedom printed in the abstract for tempo-on-valence, *F*(6,348), do not obviously match a three-level tempo factor, and the interaction *F*(1,58) does not obviously match a 7 × 3 design. I could not open the full text to resolve this. Treat the *F* values as reported-verbatim, not as interpreted.

**Per-mode ordering — SECONDARY, via Temperley & Tan's reading of the paper.** T&T state (and I read this in their PDF): the authors "report a general linear trend of increasing valence with increasing mode 'height.' They report that **Ionian was significantly higher in valence than Lydian**, and that **Lydian and Mixolydian were not significantly different**; beyond this, they do not report statistical analyses of pairwise mode differences."

**This matters:** the Ionian > Lydian reversal is therefore **reported independently twice**, by two labs, on two continents, with different tasks (categorical assignment vs. forced-choice pairwise), different languages, and both musicians and nonmusicians. That is the strongest single fact in this whole dossier about the *shape* of the modal happiness curve. T&T also note Ramos's design limitations: binary positive/negative valence coding and crossed tempo may have hidden finer mode differences.

Whether Ramos et al. found the **full** seven-mode ordering, and where Locrian fell, is **UNVERIFIED** — I could not open the full text.

### 2.3 Smit, Milne, Sarvasy & Dean (2022) — cross-cultural, uses the T&T design (VERIFIED, read in full)

Smit, E. A., Milne, A. J., Sarvasy, H. S., & Dean, R. T. (2022). Emotional responses in Papua New Guinea show negligible evidence for a universal effect of major versus minor music. *PLOS ONE*, 17(6), e0269597. DOI 10.1371/journal.pone.0269597.

- **Participants:** 170 adults from seven villages in the Uruwa River Valley, PNG, stratified into three Western-music-exposure groups (minimal exposure; Lutheran church; Seventh-day Adventist church), plus 60 Sydney nonmusicians and 19 Sydney musicians.
- **Melody stimuli deliberately modelled on Temperley & Tan.** Three melodic subjects × six diatonic modes — "Phrygian, Æolian, Dorian, Mixolydian, Ionian, Lydian, listed from lowest to highest mean pitch or, equivalently, from most minor to most major" — all with the same tonic, asserted by a low C-octave drone. All 30 ordered pairs. Locrian omitted "(as in Temperley and Tan)". Two timbres (vocal choir, string quartet).
- **Task:** forced binary choice, "which of them made them happier." Note the framing is **felt/induced**, not perceived — a real difference from T&T.
- Their stated *a priori* expectation for Sydney participants: "results similar to those of Temperley and Tan — the melodic subject with the higher mean pitch is more likely identified as the happy one, but **unfamiliar modes (notably Lydian and Phrygian) are also less likely identified as the happy one**."
- **Results (Bayesian multilevel logistic):** for melodies, very strong evidence for a large positive effect of mean pitch in both Sydney groups; a medium effect in the Lutheran group; weak evidence for a small effect in the SDA group; **neither evidence for an effect nor for its practical absence in the minimal-exposure group.** For cadences, major > minor was very strongly evidenced in both Sydney groups and the SDA group, strongly in the Lutheran group, and **not evidenced in either direction in the minimal-exposure group.** Conclusion verbatim: "the emotive valence of major and minor is strongly associated with exposure to Western-influenced music and culture, although we cannot exclude the possibility of universality."

**Important limitation for our purposes:** their hypothesis-driven models parameterise the melodies by **mean pitch difference**, not by mode identity, so the paper **does not report whether the Sydney participants reproduced the Ionian > Lydian reversal.** A descriptive model with mode-sequence effects appears in their Figure 1, which I could not read numerically. So this is an extension of the *cross-cultural* question, **not** a confirmation or refutation of the T&T ordering. **UNVERIFIED** whether their data replicate the Lydian anomaly.

### 2.4 Athanasopoulos, Eerola, Lahdelma & Kaliakatsos-Papakostas (2021) — cross-cultural harmony (VERIFIED via publisher page)

*PLOS ONE* 16(1), e0244964. DOI 10.1371/journal.pone.0244964. UK (*n* = 101), Kalash (*n* = 34) and Kho (*n* = 34) participants from Chitral, Pakistan; two melodies × eight harmonisation styles (Bach chorale, jazz, organum, whole-tone, Greek Epirote, Kalash Drasailak), major and minor versions for Bach and jazz.

- **Mode affected UK listeners only:** "the ratings of the Kho participants were not influenced by Mode," and likewise for the Kalash.
- **Roughness travelled across cultures:** "higher roughness would generally lead to higher ratings of energy and dominance, and lower ratings of valence."
- **Consonance preference did not:** "preference for consonance seems to be dependent on cultural familiarity" — Kalash participants rated the dissonant whole-tone style positively.

### 2.5 Færøvik & Specht (2026) — very large sample, major/minor only (VERIFIED via publisher page)

*PLOS ONE* 21(5), e0348069. DOI 10.1371/journal.pone.0348069. **N = 1280** (262 musicians), ages 19–94. Five compositions × 4 tempi (60/100/120/150 bpm) × 2 modes; GEMS-9 second-order factors (sublimity, unease, vitality) on 7-point scales.

- Mode → unease: *F*(1,1036) = 189.51, *p* < .001, **ηp² = .15**. "Minor mode were consistently rated higher on unease than those in the major mode."
- Tempo → vitality: *F*(3,1035) = 35.10, *p* < .001, **ηp² = .09**. "As tempi increased, compositions were consistently rated as less sublimity and more vitality, in both major and minor modes."
- Tempo → sublimity: *F*(3,1035) = 6.00, *p* < .001, ηp² = .01. Mode × tempo interaction: *F*(3,1035) = 19.10, ηp² = .05.
- Does **not** cite Temperley & Tan or Ramos et al.

### 2.6 A relevant null (VERIFIED via Europe PMC)

Pereira, L. A. S., Ramos, D., & Bueno, J. L. O. (2022). The influence of different musical modes and tempi on time perception. *Acta Psychologica*, 229, 103701. DOI 10.1016/j.actpsy.2022.103701. Fifty undergraduates; four modes (Ionian, Mixolydian, Dorian, Aeolian) × three tempi (72 / 114 / 184 bpm); time-reproduction task. "Results showed no interaction between mode and tempi and **no differences between musical modes**, regardless of tempo," while tempo had a clean monotone effect. Mode distinctions that are robust for happiness judgments do **not** automatically transfer to other dependent measures.

### 2.7 A near-miss worth flagging

Fang, L., Shang, J., & Chen, N. (2017). Perception of Western Musical Modes: A Chinese Study. *Frontiers in Psychology*, 8, 1905. DOI 10.3389/fpsyg.2017.01905. Despite the title, this study manipulates **only major vs. minor** (C major / A minor) crossed with harmonic complexity, with 22 and 39 Chinese university students. It finds major > minor on pleasure, arousal and liking, and minor > major on tension. **It says nothing about the church modes.** Do not cite it as a seven-mode result.

### 2.8 Nothing else found

I searched the ~60 works citing Temperley & Tan (via the Semantic Scholar citation graph) and found **no other empirical study that rates all seven — or even all six non-Locrian — diatonic modes on affect.** The T&T ordering has been **reported once and partially corroborated once** (Ramos et al., on the Ionian > Lydian point). It has never been directly replicated. **This is the central gap.**

---

## 3. The calibration anchors in detail

### A1 — Tempo and arousal

- **Direction:** faster → higher arousal / energy / activity. Monotone and close to linear over musically plausible ranges.
- **Best citation:** Ramos, Bueno & Bigand (2011), *F*(2,116) = 268.62 for tempo-on-arousal — far and away the largest effect in a study that also varied mode. **VERIFIED.**
- **Corroboration:** Færøvik & Specht (2026), N = 1280, tempo → vitality ηp² = .09 **VERIFIED**; Eerola et al. (2013), tempo *sr²* = 0.12 (happy), 0.21 (sad), 0.15 (peaceful) **VERIFIED**; Dalla Bella et al. (2001) — tempo is the *first* cue children acquire, effective at age 5 before mode is **VERIFIED (abstract)**.
- **Standing: established and replicated** across nine decades and many labs. This is the safest anchor in the set.
- Historical priority: Hevner, K. (1937). The Affective Value of Pitch and Tempo in Music. *American Journal of Psychology*, 49(4), 621. DOI 10.2307/1416385. **Citation VERIFIED (Crossref); content SECONDARY** — I did not read Hevner; Eerola et al. (2013) cite her among the studies that "suggested tempo as the most important cue."

### A2 — Mode (major/minor) and valence

- **Direction:** major → positive valence (happy, serene); minor → negative valence (sad, tense, angry).
- **Best citation:** Eerola, Friberg & Bresin (2013), *Front Psychol* 4:487. Mode is the single strongest cue for happy (*sr²* = 0.48, β = +1.77) and sad (*sr²* = 0.54, β = −1.60), and near-irrelevant for scary (0.08) and peaceful (0.05). Model *R²adj* = .89 for both happy and sad. **VERIFIED — Table 1 read line by line.**
- **Corroboration:** Færøvik & Specht (2026), ηp² = .15, N = 1280 **VERIFIED**; Gagnon & Peretz (2003) **VERIFIED (abstract)**; Dalla Bella et al. (2001) **VERIFIED (abstract)**.
- **Meta-analysis (use with care):** Carraturo, Pando-Naude, Costa, Vuust, Bonetti & Brattico, "The Major-Minor mode Dichotomy in Music Perception: A Systematic Review and Meta-Analysis," bioRxiv 2023.03.16.532764 (later published in *Physics of Life Reviews*). 69 publications, 4,441 subjects. **Behavioural pooled random-effects SMD = 0.2167, 95 % CI [0.1089, 0.3245], *p* = .001, *I²* = 65.3 %** (12 experiments after excluding one outlier); EEG pooled SMD = 0.1621, 95 % CI [0.0913, 0.2328], *I²* = 0.0 %. The effect-size contrast is "between positive (happy, pleasant, like) and negative (sad, unpleasant, dislike) emotional connotations." Also reported: the major-happy/minor-sad association "increased from 58 % at the age of 4 to 61 % at the age of 5, 72 % at the age of 6, reaching 92 % in adults." **VERIFIED via the bioRxiv full text.** *My caution:* a pooled SMD of 0.22 is far smaller than the within-study effects above, which almost certainly reflects heterogeneous operationalisation across the pooled studies rather than the true strength of the major/minor–valence link. **Do not use 0.22 as the calibration target.** Use the single-study effects.
- **Cultural boundary condition — important.** The effect is **not** demonstrably universal: Smit et al. (2022) found no evidence of it in the minimal-Western-exposure PNG group, and Athanasopoulos et al. (2021) found mode did not influence Kalash or Kho ratings. **VERIFIED for both.** A synthetic panel of LLMs is, culturally, a Western-corpus panel; it should reproduce the Western result, and its reproduction of it is evidence about Western listeners only.
- **Standing: established and replicated within Western listeners; contested as a universal.**

### A2b — How much does tempo dominate mode?

**This is the anchor most likely to trap a naive calibration, so it gets its own entry.** The literature genuinely disagrees.

- **Tempo-dominant camp:** Gagnon & Peretz (2003), *Cognition & Emotion* 17(1):25–40. Equitone melodies; mode and tempo manipulated in isolation, convergent, and divergent conditions; nonmusicians rated happy–sad on a 10-point scale. Verbatim: "The results confirm that both mode and tempo determine the 'happy-sad' judgements in isolation, **with the tempo being more salient, even when tempo salience was adjusted.**" **VERIFIED (abstract).** Developmentally, Dalla Bella et al. (2001) agree: "tempo is mastered earlier than mode." **VERIFIED (abstract).** Eerola et al. list Gundlach 1935, Hevner 1937, Rigg 1964, Scherer & Oshinsky 1977, and Juslin & Lindström 2010 as also ranking tempo first.
- **Mode-dominant camp:** Eerola, Friberg & Bresin (2013), median *sr²* mode 0.29 vs. tempo 0.14. The authors name this as a conflict, verbatim: "Previous studies of the musical expression of emotions have suggested tempo as the most important cue … and here mode takes the lead. **We speculate that the nominal nature of mode led to higher effect sizes than linearly spaced levels of tempo, but this obviously warrants further research.**" **VERIFIED.**
- **Split-by-dimension:** Færøvik & Specht (2026) find mode dominates the *unease* (valence-like) factor, ηp² = .15, while tempo dominates the *vitality* (arousal-like) factor, ηp² = .09. Ramos et al. (2011) likewise: tempo owns arousal, mode owns valence. **VERIFIED for both.**
- **Reconciliation I would offer, but which is my inference, not a source's:** the two camps differ on which dependent variable is at stake and how the cue levels were spaced. On a single bipolar happy–sad scale, tempo tends to win; on a two-dimensional valence/arousal decomposition, the cues divide cleanly.
- **Standing: disputed. Not usable as a pass/fail item.**

### A3 — Consonance / roughness and tension

- **Direction:** higher sensory dissonance / roughness → higher perceived tension and lower valence.
- **Best citation for tension specifically:** Bigand, E., Parncutt, R., & Lerdahl, F. (1996). Perception of musical tension in short chord sequences: The influence of harmonic function, sensory dissonance, horizontal motion, and musical training. *Perception & Psychophysics*, 58(1), 125–141. DOI 10.3758/BF03205482. Participants rated the tension of chord X in C major → X → C major sequences, X being major/minor triads and major-minor/minor sevenths on all 12 chromatic roots. Conclusion verbatim: "judgments of tension arose from a convergence of several cognitive and psychoacoustics influences, **whose relative importance varies, depending on musical training.**" **VERIFIED (abstract).** The training moderation is the load-bearing detail: sensory dissonance weighs more for untrained listeners, tonal-hierarchic factors more for trained ones.
- **Psychoacoustic foundation:** Plomp, R., & Levelt, W. J. M. (1965). Tonal Consonance and Critical Bandwidth. *JASA*, 38(4), 548–560. DOI 10.1121/1.1909741. **Citation VERIFIED (Crossref); content SECONDARY** — I did not read it.
- **The crucial complication:** Eerola, T., & Lahdelma, I. (2021). The anatomy of consonance/dissonance: Evaluating acoustic and cultural predictors across multiple datasets with chords. *Music & Science*, 4. DOI 10.1177/20592043211030471. Across nine datasets, the best model reached **R² = 0.73**; in their variance decomposition **familiarity accounted for 46.2 % of explained variance vs. 19.3 % for roughness and harmonicity combined**; semi-partial correlations familiarity *sr* = −0.216, roughness *sr* = −0.141, harmonicity *sr* = 0.047. **VERIFIED via the publisher's results page.** So: roughness predicts consonance ratings *in the right direction*, but is **not** the dominant predictor. Note also that this study is about consonance/pleasantness, not tension.
- **Cross-cultural:** Athanasopoulos et al. (2021) — roughness → lower valence, higher energy and dominance **in all three groups**, while consonance *preference* was culture-dependent. **VERIFIED.**
- **Standing: direction established and cross-culturally replicated; relative magnitude and mechanism contested.** Usable as a pass/fail item for *direction only*.

### A4 — Pitch height / register and arousal

- **Direction on arousal:** higher register → higher energy-arousal / activity. This is consistent everywhere I looked.
  - Eerola et al. (2013): register *sr²* = 0.15 for scary (β = −0.23, i.e. *lower* register → scarier), 0.09 for happy (β = +0.18), 0.06 for peaceful, 0.01 for sad. Median *sr²* = 0.08, fourth of seven cues. **VERIFIED.**
  - Gabrielsson & Lindström, as quoted verbatim by Temperley & Tan: "a high pitch level is associated with both anger and happiness, both high in arousal but opposite in valence." **VERIFIED as a quotation of a secondary summary.**
- **Direction on valence: contested — three sources, three answers.**
  - Ilie & Thompson (2006): "high-pitched speech but low-pitched music" rated more pleasant — i.e. in *music*, **lower** pitch was more pleasant. **VERIFIED (abstract).**
  - Eerola et al. (2013): higher register → happier, lower → sadder and scarier. **VERIFIED.**
  - Chiasson, Traube, Lagarrigue & McAdams (2017), *Front Psychol* 8:153: valence vs. register is an **inverted U**, "a concave (inverted U-shaped) increasing form with a peak around octave 5 or 6," while energy-arousal rises monotonically with register. **VERIFIED via the article page.**
  - Smit et al. (2022) add that the strong mean-pitch→valence link in Sydney listeners is absent in minimal-exposure PNG listeners: "This suggests that the effect of mean pitch on valence — remarkably powerful in the West — is essentially cultural." **VERIFIED.**
- **Relevance to the modes question:** Temperley & Tan and Tan & Temperley both reject pitch height as the explanation of modal "sharpness," on exactly this ground — height is an arousal cue, not a valence cue. Huron, Yim & Chordia (2010) argued the contrary (that scales with relatively higher pitches are perceived as happier); their finding is the "height hypothesis" T&T test and set aside. **Citation UNVERIFIED for exact venue and pages** — widely given as Proceedings of the 11th ICMPC, Seattle, 2010, but I could not confirm pagination; the *existence* and *content* of the hypothesis are VERIFIED through T&T's and Tan & Temperley's descriptions.
- **Standing: arousal link established; valence link disputed and probably non-monotonic.** Use the arousal direction only.

### A5 — Loudness and power / arousal

- **Direction:** louder → more energetic, more tense, more dominant; in music also more pleasant.
- **Best citation:** Ilie, G., & Thompson, W. F. (2006). A comparison of acoustic cues in music and speech for three dimensions of affect. *Music Perception*, 23(4), 319–330. DOI 10.1525/mp.2006.23.4.319. 64 music and 64 speech samples; intensity, rate and pitch height manipulated; three dimensions rated (valence, energy arousal, tension arousal). Verbatim: **"loud excerpts were judged as more pleasant, energetic, and tense than soft excerpts"** in both domains. Their broader point — that *energy* arousal and *tension* arousal must be separated — is directly relevant to any rating instrument you design. **VERIFIED (abstract, from the Bond University institutional repository record; the publisher page returned 403 and the Semantic Scholar abstract is elided by the publisher).**
- **Corroboration and a caveat:** Eerola et al. (2013) dynamics *sr²* = 0.08 for scary (β = +0.20) and 0.14 for peaceful (β = −0.28), but **≈ 0.00–0.01 for happy and sad** — the authors call this "somewhat puzzling" given Ilie & Thompson, then note that dynamics was also weak for happy/sad in Scherer & Oshinsky (1977), Juslin (1997c) and Juslin & Lindström (2010). **VERIFIED.**
- Cross-modal foundation: Juslin, P. N., & Laukka, P. (2003). Communication of emotions in vocal expression and music performance: Different channels, same code? *Psychological Bulletin*, 129(5), 770–814. DOI 10.1037/0033-2909.129.5.770. Review of 104 vocal-expression and 41 music-performance studies; emotion-specific acoustic cue patterns match across the two channels, consistent with Scherer's (1986) predictions. **VERIFIED (abstract).**
- **Standing: established for arousal/tension/power; weak-to-null on the happy–sad axis specifically.**

### Overall cue architecture — one more result worth keeping

Eerola, Friberg & Bresin (2013) also establish, with 200 systematically crossed stimuli and 46 listeners, that **the cues combine additively and roughly linearly**: linear coding of the five scalar cues explained 77–89 % of rating variance, quadratic terms added 0–8 % for a few cue/emotion pairs, and "the interactions between the cues were non-existent" after multiple-comparison correction. **VERIFIED.** If your synthetic panel produces strong cue interactions where human listeners produce additivity, that is itself a calibration failure.

---

## 4. Objective brightness ordering of the seven diatonic modes

This part is arithmetic, and it is the only item here with no uncertainty.

### 4.1 The ordering (VERIFIED against a primary source)

Temperley & Tan (2013), p. 237, verbatim: *"With a tonic of C, a one-sharp key signature yields Lydian; no sharps or flats, Ionian; one flat, Mixolydian; two flats, Dorian; three flats, Aeolian; four flats, Phrygian; and five flats, Locrian."* Their Figure 4 plots exactly this as seven adjacent windows sliding along the line of fifths.

Brightest → darkest, with the count of altered degrees relative to Ionian:

| Position | Mode | Alterations vs. Ionian | Net count | Key sig. on C | Line-of-fifths window (scale degrees) |
|---|---|---|---|---|---|
| +1 | **Lydian** | ♯4 | **+1 sharpened** | 1 sharp | 1 5 2 6 3 7 ♯4 |
| 0 | **Ionian** | — | **0** | none | 4 1 5 2 6 3 7 |
| −1 | **Mixolydian** | ♭7 | **1 flattened** | 1 flat | ♭7 4 1 5 2 6 3 |
| −2 | **Dorian** | ♭3, ♭7 | **2 flattened** | 2 flats | ♭3 ♭7 4 1 5 2 6 |
| −3 | **Aeolian** | ♭3, ♭6, ♭7 | **3 flattened** | 3 flats | ♭6 ♭3 ♭7 4 1 5 2 |
| −4 | **Phrygian** | ♭2, ♭3, ♭6, ♭7 | **4 flattened** | 4 flats | ♭2 ♭6 ♭3 ♭7 4 1 5 |
| −5 | **Locrian** | ♭2, ♭3, ♭5, ♭6, ♭7 | **5 flattened** | 5 flats | ♭5 ♭2 ♭6 ♭3 ♭7 4 1 |

Equivalent statements of the same fact: each step down flattens exactly one further scale degree; each step down moves the seven-note window one position flatwards on the line of fifths; each step down lowers the mean pitch of the scale (with fixed tonic) by one semitone divided across seven degrees — which is why Smit et al. (2022) could treat "mode" and "mean pitch" as interchangeable predictors.

**Theoretical backing:** Sherrill, P. (2025). Modal Color Theory. *Journal of Music Theory*, 69(1), 1–49. DOI 10.1215/00222909-11595194. Abstract verbatim: it "launches from an investigation of the properties of 'modal brightness,' a widespread intuition that scales (or modes) with relatively high pitches are qualitatively 'bright.' **The structural features of the diatonic scale (e.g., Myhill's property) mean that its modes demonstrate this phenomenon in a straightforward way**, but generalizing brightness to the modes of other scales reveals unforeseen complexity." **VERIFIED via the Crossref abstract.** In other words: the clean linear brightness ordering is a special property of the diatonic scale and does **not** generalise to other scale families — relevant if your theory ever needs to leave the diatonic set.

### 4.2 Scale-degree formulas

| Mode | Formula | Relative to Ionian | Relative to Aeolian |
|---|---|---|---|
| Lydian | 1 2 3 ♯4 5 6 7 | "Like major with a ♯4̂" | — |
| Ionian | 1 2 3 4 5 6 7 | "Identical to major" | — |
| Mixolydian | 1 2 3 4 5 6 ♭7 | "Like major with a ♭7̂" | — |
| Dorian | 1 2 ♭3 4 5 6 ♭7 | — | "Like natural minor with a ♮6̂" |
| Aeolian | 1 2 ♭3 4 5 ♭6 ♭7 | — | "Identical to natural minor; no raised leading tone" |
| Phrygian | 1 ♭2 ♭3 4 5 ♭6 ♭7 | — | "Like natural minor with a ♭2̂" |
| Locrian | 1 ♭2 ♭3 4 ♭5 ♭6 ♭7 | — | Like Phrygian with a ♭5̂ |

Source for the six non-Locrian rows, including the quoted descriptions: *Open Music Theory*, "Diatonic Modes" chapter (`viva.pressbooks.pub/openmusictheory/chapter/diatonic-modes/`). **VERIFIED**, though this is a textbook (tertiary). The Locrian row is arithmetic from the key-signature mapping above, cross-checked against the footnote in §4.3. **VERIFIED by derivation.**

### 4.3 Tritone against the tonic; absence of a perfect fifth

- **Modes containing a tritone against the tonic: exactly two — Lydian (♯4̂, an augmented fourth above the tonic) and Locrian (♭5̂, a diminished fifth above the tonic).** Every other mode has both a perfect fourth and a perfect fifth above the tonic. **VERIFIED by derivation from the formulas above; confirmed for Locrian by the source below.**
- **Modes lacking a perfect fifth above the tonic: exactly one — Locrian.** Tan & Temperley (2017), footnote 1, verbatim: *"A seventh diatonic mode, Locrian, contains half-steps between the first and second scale degrees, and between the fourth and fifth scale degrees. **It is the only diatonic mode that has a diminished fifth rather than a perfect fifth above the tonic.** It is rarely found in either Western art music or popular music, and we did not include it in the studies discussed here."* **VERIFIED.**
- Consequence for the theory you are calibrating: **Locrian is the one mode for which no empirical affect data exists at all**, and for a principled reason — Temperley & Tan judge it near-impossible to compose a melody that a listener will actually *hear* as Locrian, because a tonic without a perfect fifth above it loses to any competing tonic in the scale. Any assignment table that places a register on Locrian is, empirically, unfalsifiable with current data.

---

## 5. Perceived versus induced emotion

**The distinction.** A listener can *recognise* that a piece expresses sadness without *feeling* sad, and can feel something the music does not express. The first — variously called perceived, expressed, recognised, cognitivist, or "external locus" emotion — is a judgment about a property of the stimulus. The second — felt, induced, emotivist, "internal locus" — is a report of the listener's own state. Temperley & Tan set this out directly and it is why they worded their instructions as they did: studies of perceived emotion "generally direct listeners' attention to characteristics of the music itself rather than to their own internal state; this will be our strategy in the current study as well," and they framed the task around "what makes a melody seem happy or sad" precisely so as "to elicit reports of perceived rather than felt emotions." The two do not coincide. Schubert's (2013) review of 16 publications / 19 studies published 2003–2012 found the felt rating was usually **lower** than, or equal to, the corresponding expressed rating: only **45 of 178 cell-pair comparisons** had the internal-locus mean above the external-locus mean, against **89 expected by chance**, χ²(1, N = 178) = 43.51, *p* < .001; and in crude magnitude terms, **99 cases** where the mean felt rating was lower than the mean expressed rating versus **9** the other way. The gap narrows for self-selected and preferred music and closes for loved music, which Schubert attributes to an emotional-contagion mechanism that is otherwise inhibited. **A rating instrument that does not say which one it is asking about is therefore not measuring a well-defined quantity**, and results from perceived-emotion and felt-emotion designs cannot be pooled — which is exactly the difference between Temperley & Tan ("which is the happier of the two *melodies*") and Smit et al. ("which made *them* happier").

**Best citations.**
- Gabrielsson, A. (2001/2002). Emotion perceived and emotion felt: Same or different? *Musicae Scientiae*, 5(1_suppl), 123–147. DOI 10.1177/10298649020050S105. **Citation VERIFIED (Crossref). Note the year ambiguity:** Crossref dates the issue 2001-09; the paper is almost universally cited as Gabrielsson (2002), including by Temperley & Tan. Report both.
- Schubert, E. (2013). Emotion felt by the listener and expressed by the music: literature review and theoretical perspectives. *Frontiers in Psychology*, 4, 837. DOI 10.3389/fpsyg.2013.00837. **VERIFIED (abstract + full text).** This is the one to cite for numbers.
- Evans, P., & Schubert, E. (2008). Relationships between expressed and felt emotions in music. *Musicae Scientiae*, 12(1), 75–99. DOI 10.1177/102986490801200105. **Citation VERIFIED (Crossref); content SECONDARY** via Schubert (2013).
- Kallinen, K., & Ravaja, N. (2006). Emotion perceived and emotion felt: Same and different. *Musicae Scientiae*, 10(2), 191–213. DOI 10.1177/102986490601000203. **Citation VERIFIED (Crossref); content UNVERIFIED.**

---

## 6. Mode and character, personality, psychological type

### 6.1 The historical doctrine of modal ethos

The idea that a mode carries a fixed character is very old and, for our purposes, **unusable as evidence**, for two independent reasons.

**Reason one: the ascriptions were never stable.** Temperley & Tan, verbatim: *"In the Middle Ages, the notion of modal affect or ethos was widely accepted; authors of treatises pertaining to mode would often point to chant examples that exhibited the ethos they described. **The specific characteristics associated with each mode changed over time.** For instance, the 11th-century theorist Hermannus Contractus deemed Mixolydian 'garrulous' (Powers, 2001), while the 16th-century author Stefanno Vanneus considered it a 'querulous' mode, one 'especially suited to lascivious words mixed in with moderate and pleasant ones, but then also to excited, angry, and threatening ones' (Judd, 2002, p. 375)."* **VERIFIED.** Two theorists, one mode, five centuries apart, and incompatible characterisations. A corpus of historical ethos-ascriptions will yield mutually contradictory tables — which is, in miniature, the same problem as the four incompatible assignment tables you are trying to adjudicate.

**Reason two: the names do not refer to the same objects.** This is the flag you asked me to raise, and it is correct.

- **Ancient Greek → medieval church modes.** *Encyclopaedia Britannica*, "Mode: Plainchant," verbatim: *"Medieval theorists apparently assumed wrongly that the Greek octave species were named in ascending rather than descending order,"* and consequently *"The Greek octave species Dorian (E–E), Phrygian (D–D), Lydian (C–C), and Mixolydian (B–B) thus appeared in the church modes as Dorian (D–D), Phrygian (E–E), Lydian (F–F), and Mixolydian (G–G)."* It adds that *"certain significant discrepancies seem to belie any direct historical connection."* **VERIFIED (tertiary source — Britannica, scholar-written).** So **ancient Dorian is modern Phrygian, ancient Phrygian is modern Dorian, ancient Lydian is modern Ionian, ancient Mixolydian is modern Locrian.** Any ethos claim sourced from Plato or Aristotle attaches to a *different scale* from the modern mode of that name.
- **Medieval church modes → modern diatonic modes.** Even setting the Greek layer aside, a medieval mode is not a modern one. Temperley & Tan: *"During this period and continuing into the Renaissance, the identification of the mode of a melody depended chiefly on its last note or 'final' (in relation to the diatonic scale) and on its 'ambitus' (range)."* A church mode is a final plus a range plus a reciting tone, in authentic/plagal pairs — eight categories over four finals, not seven rotations of one scale. The modern seven-mode set "was codified in the 16th century, beginning with Heinrich Glarean's *Dodechachordon* (1547)," and the modern sense of mode as "a collection of degrees of a scale (and its aggregate intervallic content), being governed by a single chief degree" dates only to the mid-18th century (Powers, 2001, p. 829, quoted in Temperley & Tan). **VERIFIED.** The names *Ionian* and *Aeolian* enter with Glarean; *Locrian* is later still and was never a practical church mode.
- Reference work for the whole history: Powers, H. S. et al., "Mode," *Grove Music Online* / *New Grove* (2001) — the standard source, cited throughout by Temperley & Tan. **Citation VERIFIED as used by T&T; I did not read the Grove article itself.**

**Practical consequence for your project:** any of the four assignment tables in the author's corpus that draws support from Greek or medieval ethos doctrine is drawing on a name collision. It should be scored as an unsupported claim, not a weakly supported one.

### 6.2 Film-scoring and analytical literature

Here I have to report a gap rather than a result.

- **What exists, peer-reviewed:** Sherrill (2025), *Modal Color Theory*, *JMT* 69(1):1–49 — a formal theory of scalar brightness, not an affect study. **VERIFIED.** Frank Lehman's *Hollywood Harmony: Musical Wonder and the Sound of Cinema* (OUP, 2018) is the standard monograph on chromatic and modal harmony as a carrier of "wonder" in film scoring; I located reviews of it but **did not verify any specific mode-to-affect mapping it proposes — treat any such claim as UNVERIFIED.** Schneller & Motazedian, "Tugging at Heartstrings: Bittersweet Harmonies in the Classic Hollywood Love Theme," *Journal of Film Music* — exists (publisher listing seen), concerns bittersweet harmony rather than a mode/character taxonomy; **content UNVERIFIED.**
- **What exists, grey literature:** a Berklee graduate thesis, "Dorian Mode: An Examination of Its Usage and Context in Film," hosted at `remix.berklee.edu`. **Not peer-reviewed; content UNVERIFIED.**
- **What does not exist, as far as I can establish:** any peer-reviewed empirical study mapping the seven diatonic modes onto character, personality, or psychological type. The great bulk of the mode-to-character material online (Songtive, Musical U, Production Music Live, film-scoring blogs) is pedagogical folklore with no measurement behind it, and the ascriptions it offers vary from site to site in the same way the medieval treatises did. **Do not feed it to the panel as ground truth, and do not let the panel's agreement with it count as a pass.**

---

## What the synthetic panel can and cannot be calibrated against

### Solid enough to serve as a pass/fail test

1. **Tempo → arousal (A1).** Direction, monotonicity and dominance-over-other-cues-on-the-arousal-axis are all established across nine decades, many labs, several cultures, and children as young as five. If the panel does not produce this, nothing else it says counts. **Pass criterion: faster stimuli rated higher on arousal/energy/activity, monotonically, with the largest effect of any cue on that axis.**
2. **Major → positive valence, minor → negative valence, for Western-enculturated raters (A2).** Established and replicated; a clean, large within-study effect (Eerola *sr²* = 0.48 / 0.54; Færøvik & Specht ηp² = .15 at N = 1280). **Pass criterion: major rated more positive in valence than minor, with a large effect, and with the effect concentrated on the valence axis rather than the arousal axis.** Do not set the target at the meta-analytic SMD of 0.22.
3. **Loudness → higher energy-arousal, tension and dominance (A5).** Direction is robust. **Pass criterion: louder rated higher on energy and tension.** Note the sub-criterion that loudness should be *weak* on the happy–sad axis (Eerola sr² ≈ 0.00–0.01) — a panel that makes loud = happy is miscalibrated.
4. **Roughness / sensory dissonance → higher tension and lower valence (A3), direction only.** Cross-culturally replicated in Athanasopoulos et al. **Pass criterion: direction correct.** Do **not** test magnitude, and do not require roughness to dominate consonance judgments — Eerola & Lahdelma show familiarity outweighs it 46.2 % to 19.3 %.
5. **The brightness ordering of the seven modes (item 4).** This is mathematics, not psychology, and it is certain. **Pass criterion: given only interval content, the panel recovers Lydian > Ionian > Mixolydian > Dorian > Aeolian > Phrygian > Locrian by number of sharpened degrees, and identifies Lydian and Locrian as the two modes containing a tritone against the tonic and Locrian as the only one lacking a perfect fifth.** A panel that fails this is failing at arithmetic and its affect judgments cannot be trusted.
6. **Additivity and near-linearity of cue combination (Eerola et al. 2013).** A secondary but usable check. **Pass criterion: cue effects combine additively; no strong interactions.**
7. **The perceived/felt distinction (item 5).** Not a rating target but a **design requirement.** Your instrument must state which it asks about; Schubert (2013) shows felt ratings run systematically lower than expressed ones (99 cases vs. 9). If you want to compare against Temperley & Tan, you must ask about **perceived** emotion, in their wording — a property of the melody, not of the listener.

### Usable, but only as a directional prior — not as pass/fail

8. **Pitch height → arousal (A4).** Direction on arousal is consistent. But the panel must **not** be graded on pitch-height → valence: Ilie & Thompson find low-pitched *music* more pleasant, Eerola et al. find high register happier, Chiasson et al. find an inverted U peaking around octave 5–6, and Smit et al. find the whole effect culturally contingent. Report the disagreement; do not pick.
9. **Temperley & Tan's happiness ordering itself (item 1).** Reported once, in one lab, with 17 nonmusicians, in one task format, and never directly replicated. It is nonetheless the best empirical fact in this domain, and it has one strong corroboration on its most distinctive feature — **the Ionian > Lydian reversal**, independently reported by Ramos et al. (2011) with a different task, different language, different country, and both musicians and nonmusicians. My recommendation: **use the reversal (Ionian rated happier than Lydian) as a pass/fail item, and the full six-mode rank order as a graded scoring item, not a threshold.** The three pairwise comparisons that were *not* significant in the original — Lydian/Mixolydian, Lydian/Dorian, Dorian/Aeolian — should be scored as ties, and a panel that separates them confidently in either direction is overclaiming relative to the human data.

### Not usable as ground truth

10. **The relative dominance of tempo over mode (A2b).** The literature genuinely disagrees. Gagnon & Peretz say tempo is more salient; Eerola et al. find mode leads and explicitly name the conflict with five prior studies; Ramos et al. and Færøvik & Specht suggest the answer depends on whether you ask about valence or arousal. Report the disagreement; do not grade on it.
11. **Any ordering involving Locrian.** No affect data exists for Locrian, for the principled reason that listeners cannot reliably hear a melody as Locrian at all. Any theory-side claim about Locrian is currently unfalsifiable.
12. **Universality of the mode–valence link.** Smit et al. (2022) found no evidence for it in minimal-Western-exposure listeners; Athanasopoulos et al. (2021) found mode did not influence Kalash or Kho ratings at all. An LLM panel is a Western-corpus panel by construction. Its verdict is evidence about Western-enculturated listening, and must be labelled as such in anything downstream.
13. **Historical modal ethos, and film-scoring mode/character folklore (item 6).** The historical ascriptions are mutually contradictory across centuries, and the names refer to different scales in the Greek, medieval and modern systems — ancient Dorian is modern Phrygian, ancient Lydian is modern Ionian. There is no peer-reviewed empirical mapping of the seven diatonic modes onto character or personality. If the panel reproduces the blog-consensus mode/character table, that is evidence the panel has memorised the folklore, **not** evidence the folklore is right — and it is a reason to worry about contamination in the blind condition, since the interval descriptions may be sufficient for a language model to identify each mode by name and retrieve its folklore associations.

### The contamination problem, stated plainly

Your blind design strips the mode names and gives interval content only. But a language model can recover the name from the interval content trivially (item 4 is arithmetic it will get right), and having recovered it can retrieve every folk-theoretic association attached to that name. **A blind synthetic panel is not blind in the way a human panel is.** The calibration set above tests whether the panel reproduces *human perceptual* results; it cannot test whether the panel is reasoning from interval content or retrieving from a name it silently inferred. Consider an adversarial control: present a mode of a *non-diatonic* scale with no established name and no folklore, and check whether the panel's brightness/valence judgments remain coherent. Sherrill (2025) is the right theoretical source for constructing such stimuli, and his point that brightness "reveals unforeseen complexity" outside the diatonic scale is exactly what makes them a useful control.

---

## Appendix — full citation list with status

| Work | DOI | Status of citation | Status of content |
|---|---|---|---|
| Temperley & Tan (2013), *Music Perception* 30(3):237–257 | 10.1525/MP.2012.30.3.237 | VERIFIED (Crossref + authors' PDF) | VERIFIED (read in full) |
| Tan & Temperley (2017), *Music Perception* 34(3):352–365 | 10.1525/mp.2017.34.3.352 | VERIFIED (Crossref + authors' PDF) | VERIFIED (read in full) |
| Ramos, Bueno & Bigand (2011), *Braz J Med Biol Res* 44(2):165–172 | 10.1590/S0100-879X2010007500148 | VERIFIED (Crossref, PMID 21180883) | VERIFIED (abstract); per-mode detail SECONDARY via T&T |
| Eerola, Friberg & Bresin (2013), *Front Psychol* 4:487 | 10.3389/fpsyg.2013.00487 | VERIFIED | VERIFIED (full text + Table 1) |
| Smit, Milne, Sarvasy & Dean (2022), *PLOS ONE* 17(6):e0269597 | 10.1371/journal.pone.0269597 | VERIFIED (Crossref) | VERIFIED (full text) |
| Athanasopoulos, Eerola, Lahdelma & Kaliakatsos-Papakostas (2021), *PLOS ONE* 16(1):e0244964 | 10.1371/journal.pone.0244964 | VERIFIED | VERIFIED (article page) |
| Færøvik & Specht (2026), *PLOS ONE* 21(5):e0348069 | 10.1371/journal.pone.0348069 | VERIFIED | VERIFIED (article page) |
| Gagnon & Peretz (2003), *Cognition & Emotion* 17(1):25–40 | 10.1080/02699930302279 | VERIFIED (Crossref) | VERIFIED (abstract, Europe PMC) |
| Dalla Bella, Peretz, Rousseau & Gosselin (2001), *Cognition* 80(3):B1–B10 | 10.1016/S0010-0277(00)00136-0 | VERIFIED (Crossref) | VERIFIED (abstract, Europe PMC) |
| Husain, Thompson & Schellenberg (2002), *Music Perception* 20(2):151–171 | 10.1525/mp.2002.20.2.151 | VERIFIED (Crossref) | **UNVERIFIED** — abstract elided by publisher; all routes 403/robots-blocked. Not relied on above. |
| Ilie & Thompson (2006), *Music Perception* 23(4):319–330 | 10.1525/mp.2006.23.4.319 | VERIFIED (Crossref) | VERIFIED (abstract, Bond University repository) |
| Hevner (1937), *Am J Psychol* 49(4):621 | 10.2307/1416385 | VERIFIED (Crossref) | SECONDARY (via Eerola et al. 2013) |
| Bigand, Parncutt & Lerdahl (1996), *Perception & Psychophysics* 58(1):125–141 | 10.3758/BF03205482 | VERIFIED (Crossref) | VERIFIED (abstract, Europe PMC) |
| Plomp & Levelt (1965), *JASA* 38(4):548–560 | 10.1121/1.1909741 | VERIFIED (Crossref) | SECONDARY |
| Eerola & Lahdelma (2021), *Music & Science* 4 | 10.1177/20592043211030471 | VERIFIED | VERIFIED (publisher results page) |
| Juslin & Laukka (2003), *Psychological Bulletin* 129(5):770–814 | 10.1037/0033-2909.129.5.770 | VERIFIED (Crossref) | VERIFIED (abstract, Europe PMC) |
| Gabrielsson & Lindström (2001), in *Music and Emotion*, OUP, 223–248 | 10.1093/oso/9780192631886.003.0010 | VERIFIED (Crossref) | SECONDARY (quoted via Temperley & Tan) |
| Gabrielsson & Lindström (2010), in *Handbook of Music and Emotion*, OUP, 367–400 | 10.1093/acprof:oso/9780199230143.003.0014 | VERIFIED (Crossref) | **UNVERIFIED** — OUP page served metadata only |
| Gabrielsson (2001/2002), *Musicae Scientiae* 5(1 suppl):123–147 | 10.1177/10298649020050S105 | VERIFIED (Crossref; year ambiguity flagged) | **UNVERIFIED** (abstract elided) |
| Evans & Schubert (2008), *Musicae Scientiae* 12(1):75–99 | 10.1177/102986490801200105 | VERIFIED (Crossref) | SECONDARY (via Schubert 2013) |
| Schubert (2013), *Front Psychol* 4:837 | 10.3389/fpsyg.2013.00837 | VERIFIED | VERIFIED (abstract + full text) |
| Kallinen & Ravaja (2006), *Musicae Scientiae* 10(2):191–213 | 10.1177/102986490601000203 | VERIFIED (Crossref) | UNVERIFIED |
| Carraturo et al. (2023), bioRxiv 2023.03.16.532764 | 10.1101/2023.03.16.532764 | VERIFIED (Crossref) | VERIFIED (full text, v3) |
| Bowling, Sundararajan, Han & Purves (2012), *PLOS ONE* 7(3):e31942 | 10.1371/journal.pone.0031942 | VERIFIED (Crossref) | VERIFIED (abstract, Europe PMC) |
| Vieillard, Peretz, Gosselin, Khalfa & Gagnon (2008), *Cognition & Emotion* 22(4):720–752 | 10.1080/02699930701503567 | VERIFIED (Crossref) | not used |
| Pereira, Ramos & Bueno (2022), *Acta Psychologica* 229:103701 | 10.1016/j.actpsy.2022.103701 | VERIFIED (Crossref) | VERIFIED (abstract, Europe PMC) |
| Fang, Shang & Chen (2017), *Front Psychol* 8:1905 | 10.3389/fpsyg.2017.01905 | VERIFIED | VERIFIED (article page) |
| Chiasson, Traube, Lagarrigue & McAdams (2017), *Front Psychol* 8:153 | 10.3389/fpsyg.2017.00153 | VERIFIED | VERIFIED (article page) |
| Sherrill (2025), *Journal of Music Theory* 69(1):1–49 | 10.1215/00222909-11595194 | VERIFIED (Crossref) | VERIFIED (Crossref abstract) |
| Huron, Yim & Chordia (2010), pitch exposure and sadness judgments | — | **UNVERIFIED** (venue/pages; usually given as Proc. 11th ICMPC, Seattle) | SECONDARY (via Temperley & Tan and Tan & Temperley) |
| Powers, H. S. et al. (2001), "Mode," *Grove Music Online* | — | VERIFIED as cited by T&T | not read directly |
| *Encyclopaedia Britannica*, "Mode: Plainchant" | — | tertiary | VERIFIED (page read) |
| *Open Music Theory*, "Diatonic Modes" | — | tertiary | VERIFIED (page read) |
| Lehman, *Hollywood Harmony* (OUP, 2018) | — | book exists; reviews located | **UNVERIFIED** |
| Schneller & Motazedian, "Tugging at Heartstrings," *Journal of Film Music* | — | publisher listing located | **UNVERIFIED** |

### Tooling notes

- The Perplexity MCP tools on MCP_DOCKER (`perplexity_research`, `perplexity_ask`) **timed out on every attempt** ("Device 'jims-macbook-pro-local' did not respond within 60s"). Nothing here depends on them.
- `online.ucpress.edu` returns HTTP 403 to all automated requests; `scielo.br` sits behind a Bunny Shield challenge; `pubmed.ncbi.nlm.nih.gov` and `pmc.ncbi.nlm.nih.gov` intermittently served reCAPTCHA. Europe PMC's REST API and the Crossref API were the reliable routes for metadata and abstracts and were used throughout.
