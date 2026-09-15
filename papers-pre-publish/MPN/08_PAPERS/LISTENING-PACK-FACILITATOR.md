| Field | Value |
|:---|:---|
| Designation | MPN-PACK-02 |
| Title | Listening pack version 2: what it asks, who it goes to, and how to read what comes back |
| Status | Built and published. Stimuli are final and hashed; the key is held here and is not in the pack |
| Date | 14 September 2026 |
| Scope | Theory and internal research on synthetic material. Every sound is synthesised; nothing is a recording of anybody |

## 1. What the pack is for

Four claims in the programme are decided by ears rather than by argument, and none of them had stimuli. The pack supplies all four in one sitting, with a blind presentation order, and returns a text file the respondent downloads and sends back.

| Part | Settles | Falsifies the claim if |
|:---|:---|:---|
| A, seven modes | A4's register-to-mode table, which four documents disagree about | expert listeners do not converge, or converge on a table none of the four names |
| B, the blend | $\delta$, the interpolation margin, and the rounding rule | the blend is heard as mistuned, or the two margins are indistinguishable |
| C, ten triad pairs | whether the Cayley metric carries a magnitude, which S3 names as the harmonic channel's falsification test | rated distance does not track graph distance |
| D, eight pairs and six voices | the perceptual resolution of the timbre space, which closes the capacity table of MPN-DESIGN-01 section 5b.3 | listeners are at chance on the closest pair the design calls distinct |

Parts T and R are not listening tasks. T puts the instrument itself to music therapists, including the one design decision most likely to be wrong at a desk, that the balanced middle of the Autonomy gradient renders as the blend of three scales and so is the least distinctive sound in the set. R puts the method to researchers and asks what they would require before a result from this pack were citable.

## 2. Who gets which path

| Path | Parts | About |
|:---|:---|:---|
| Composer or music director | A, B, C | 30 minutes |
| Music therapist | A, D, T | 25 minutes |
| Researcher or methodologist | B, C, D, R | 25 minutes |

Part A's situation wording changes for therapists, from a director's description to a colleague's. Nothing else differs between paths and no stimulus differs at all, so a therapist's Part A answers and a composer's are directly comparable.

## 3. The blinding, and where the key lives

Presentation order is a fixed permutation drawn once from seed 20260914 and identical for every respondent, so two respondents' answers compare directly. **The key that decodes the labels is `05_DATA/03_generators/stimuli/ANSWER-KEY-v2.json` and it is not shipped in the pack.** File names inside the pack are meaningless without it.

Three things are deliberately withheld from every respondent: the scale names, what the theory predicts, and what the earlier panel of language models said. One further thing is withheld and matters more, because it is the one an expert will ask about afterwards: **Set 3 contains two items that carry the same scale.** Rounding half up at an exact tie returns one of the two inputs exactly, so that pair is a result and a catch trial at once. A respondent who reports them as identical has told you both that their ear is working and that the rounding convention collapses the blend.

## 4. What a returned file looks like

Plain text, one line per answer, keyed by part and item. Letters are as shown on the page. Free-text boxes come back whole. The respondent's identification block carries a name if they gave one, their description of their work, their training, and what they listened on, because training moderates mode perception and the pack should be able to report it as a covariate.

## 5. How to read the four results

**Part A.** Convergence first, then which table. The corpus holds four incompatible register-to-mode tables, two of them exact inversions, so the useful question is not whether people agree with the theory but whether they agree with each other. If they do not converge, A4 is not merely untested, it is not a fact about listeners.

**Part B.** Two readings. Whether the blend is heard as a scale or as mistuning decides whether interpolation is a musical object at all. Whether the near-tie pair is distinguishable at 17.4 cents decides $\delta$: if listeners separate them, the smaller margin is doing audible work and $\delta$ can be small; if they do not, a small margin is buying nothing and the larger one is the honest choice.

**Part C.** Correlate the rated distance against the true Cayley distance. If it tracks, the metric carries a magnitude and the first of S3's two repairs is available. If it does not, the metric is decoration, the parameter is a walk along a fixed cycle, and the second repair is the honest one. Note that the ten pairs are not equally far apart in an obvious way: position along the chain and graph distance do not rise together, which is the defect MPN-NOTE-05 section 3.4 sets out.

**Part D.** Find the separation at which same and different reach chance. Below the square root of two the six-character assignment table of MPN-DESIGN-01 section 5b.3 stands as printed. Above it, the cast shrinks and the capacity table says by how much. Two of the eight pairs are genuinely identical and are the floor on a respondent's reliability.

## 6. What the pack does not do

It has no pre-registration, no counterbalancing and no power calculation, and Part R asks respondents to say what it would need. It is a small expert panel, which is the right instrument for settling a design parameter and the wrong one for a citable perceptual claim. **S1 records that the corpus already holds two listener studies and that neither is citable, because the stimuli came from an unseeded system and are not reproducible.** These stimuli are reproducible: no random number is drawn anywhere in their generation, every file carries a SHA-256 in the manifest, and the pack ships the audio rather than a promise to regenerate it, which S4 makes a condition of any stimulus set.

## 7. Files

| Path | What |
|:---|:---|
| `05_DATA/03_generators/s7_listening_stimuli.py` | Generates all 31 new stimuli and the manifest. No randomness |
| `05_DATA/03_generators/stimuli/MANIFEST.json` | Every file with its scale or profile or distance, its byte count and its SHA-256 |
| `05_DATA/03_generators/stimuli/DISPLAY.json` | The blind presentation order, which is what the pack embeds |
| `05_DATA/03_generators/stimuli/ANSWER-KEY-v2.json` | The key. Not shipped in the pack |
| `05_DATA/03_generators/s7_blocking_numbers.py` | The arithmetic behind MPN-NOTE-05 |
| `08_PAPERS/MPN-NOTE-05-blocking-numbers.md` | The recommendation on the rounding rule and $k_{\max}$ |
| the published pack | Sets 1, 3, 4 and 5 with the response form. Sets 2 remains in the corpus for a second panel |
