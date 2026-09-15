| Field | Value |
|:---|:---|
| Designation | MPN-CORPUS-01 |
| Title | Clean source texts, twenty-five plays |
| Built by | `fetch_clean_texts.py`, which reproduces every file below |
| Source | Project Gutenberg |
| Works | 25 |
| Characters | 2,507,343 |

Each file holds one play and nothing else: the cast list, the stage directions
and the dialogue. Gutenberg front matter, the licence, translator prefaces,
editorial introductions, footnote sections, transcriber notes and publisher
catalogues have all been cut, because the batch scoring script reads whatever it
is given as dramatic speech and cannot tell a licence clause from a line.

Three groups. The Lacan set is the drama Lacan treated at length, so far as it
exists in public-domain English. The frame library is what the MPN application
has already scored, kept so that new material can be compared against it. The
chosen eight were each added for a reason stated in the table, and the reason is
in every case something the calculus has to be able to represent.

Claudel's Coufontaine trilogy, the subject of Seminar VIII and the longest
sustained reading of a single dramatic work in the Seminars, is not here. No
public-domain English translation exists on Gutenberg. It is recorded as absent
rather than replaced by something else of Claudel's.

## The Lacan set

| Work | PG | Characters | Edition, and why it is here |
|:---|---:|---:|:---|
| `hamlet.txt` | 1524 | 177,958 | Whole work. Seminar VI, Desire and its Interpretation, 1958-59 |
| `antigone.txt` | 31 | 57,795 | Extracted from The Oedipus Trilogy, F. Storr translation. Seminar VII, The Ethics of Psychoanalysis, 1959-60 |
| `oedipus_rex.txt` | 31 | 70,623 | Extracted from The Oedipus Trilogy, F. Storr translation. Referred to throughout the Seminars |
| `oedipus_at_colonus.txt` | 31 | 80,019 | Extracted from The Oedipus Trilogy, F. Storr translation. Seminar VII, on the boundary between life and death |
| `electra.txt` | 14484 | 68,988 | Extracted from The Seven Plays in English Verse, Lewis Campbell translation. Quoted in Seminar VII on Ate |
| `awakening_of_spring.txt` | 35242 | 118,217 | Whole play, Francis J. Ziegler translation. Preface a L'Eveil du printemps, 1 September 1974, in Autres ecrits p. 561 |

## Already in the frame library

| Work | PG | Characters | Edition, and why it is here |
|:---|---:|---:|:---|
| `king_lear.txt` | 1532 | 155,355 | Whole work. Modernised spelling, matching the other three Shakespeare plays. PG 1128, the First Folio old-spelling text used previously, is not comparable with them |
| `macbeth.txt` | 1533 | 104,475 | Whole work |
| `othello.txt` | 1531 | 154,224 | Whole work |
| `a_dolls_house.txt` | 2542 | 142,227 | Whole work |
| `hedda_gabler.txt` | 4093 | 152,778 | Whole work |
| `the_seagull.txt` | 1754 | 102,268 | Whole work |
| `uncle_vanya.txt` | 1756 | 89,458 | Whole work |
| `medea.txt` | 35451 | 97,140 | Whole play, Gilbert Murray verse translation |
| `importance_of_being_earnest.txt` | 844 | 117,287 | Whole work |
| `the_cherry_orchard.txt` | 7986 | 96,847 | Extracted from Plays by Chekhov, Second Series, Constance Garnett translation |
| `miss_julie.txt` | 14347 | 76,248 | Extracted from Plays by August Strindberg, Second Series, Edwin Bjorkman translation. Titled Miss Julia in this translation |

## Chosen for this programme

| Work | PG | Characters | Edition, and why it is here |
|:---|---:|---:|:---|
| `prometheus_bound.txt` | 27458 | 56,247 | Extracted from Prometheus Bound and The Seven Against Thebes, Theodore Alois Buckley translation. Chosen as the Real at its limit: a subject fixed in place, addressing what cannot answer |
| `agamemnon.txt` | 14417 | 83,474 | Whole play, Gilbert Murray translation, the same translator as Medea and The Bacchae. Chosen as the Symbolic at its limit: every character positioned by house, oath, rank and debt |
| `the_bacchae.txt` | 35173 | 87,654 | Whole play, Gilbert Murray translation. Chosen for entropy: a play whose action is the dissolution of a coherent subject |
| `ghosts.txt` | 2467 | 123,663 | Whole work, R. Farquharson Sharp translation. Chosen for the trauma ratchet: inherited damage that never discharges |
| `the_wild_duck.txt` | 73631 | 177,353 | Whole play, Eleanor Marx Aveling translation. Chosen for the Imaginary, and as a same-author control against Ghosts |
| `the_stronger.txt` | 14347 | 10,496 | Extracted from Plays by August Strindberg, Second Series, Edwin Bjorkman translation. Chosen as the dyadic test for B3: two characters, one of whom never speaks |
| `philoctetes.txt` | 14484 | 68,294 | Extracted from The Seven Plays in English Verse, Lewis Campbell translation, the same volume and translator as Electra. Chosen for sustained physical pain as a state the calculus must carry, and as a translation control against Electra |
| `everyman.txt` | 19481 | 38,255 | Extracted from Everyman, with Other Interludes. Chosen as the negative control: allegorical figures are not subjects, and a calculus of subjectivity should register that or be wrong |

## Reproducing this

    python3 fetch_clean_texts.py

Every boundary is an explicit marker in `WORKS`, not an inference, and every
output is checked before it is written: no Gutenberg apparatus, no editorial
headings, no mis-encoded characters, and a plausible length. The checks are there
because each of them caught a real defect. Three of the seven files originally in
this corpus were the wrong work. All seven carried the full licence text. Two
were truncated by a transcriber note near the top of the file. Electra was
silently carrying the whole of The Trachinian Maidens appended to it. Gutenberg's
own UTF-8 copy of The Awakening of Spring is mis-encoded at source, so the
fetcher takes the `-0.txt` of that book and rejects any copy that arrives with
the damage in it.

The sha256 prefix in `MANIFEST.json` pins each file. If a rebuild changes one,
Gutenberg has revised the edition, and any scored output derived from the old
file is a different stimulus.
