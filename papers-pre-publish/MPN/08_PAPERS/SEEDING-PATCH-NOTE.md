| Field | Value |
|:---|:---|
| Designation | MPN-PATCH-01 |
| Title | Determinism, and the end of fabricated state |
| Repository | `mpn-conductor-standalone` |
| Patch | `0001-determinism-and-no-fabricated-state.patch` |
| Author of the theory | Jim McKenney |
| Status | Written and typechecked, not applied. Nothing has been pushed |
| Decisions implemented | 9, 10 and 11 of the decision log of 12 September 2026 |
| Size | 9 files, 383 insertions, 46 deletions, 2 new files |

## 1. What this fixes and why it was the highest-return work available

A11 asserts that the transformation from psychological state to musical parameters is total, deterministic and decomposable. The implementation made eleven unseeded calls to the platform random number generator in the composer and the calculus, so the same state did not produce the same score, and a user found that out by pressing render twice.

That one defect blocked every listening study in the programme. A stimulus that cannot be reproduced cannot be cited, which is why neither of the two existing listener studies can be used as evidence for anything. It also made A11 false as implemented while the paper asserted it as a design commitment, which is the gap this patch closes.

Separately, the path a user's own script travels was inventing four of the nine state components outright. That is the second half of the patch and it is the more consequential half.

## 2. The design question, and why the obvious answer is wrong

The obvious fix is one global generator seeded once at startup. It makes a run reproducible, and it is the wrong fix for two reasons that are worth setting down, because the wrong fix would have looked like a success.

**It makes the output a function of state and call order.** Render character A then B and you get a different result than B then A, because both draw from the same stream. A11 asserts a function of state. A global stream delivers a function of state and position in the queue, which is a weaker and different claim, and one that breaks silently the first time anything renders concurrently. Decision 10 settled this: the seed derives from the character and the frame, so that Φ stays a pure function of the state.

**It makes every previously rendered stimulus invalid whenever anyone adds a draw.** Insert one ornament decision early in the composer and every subsequent draw in the entire run shifts. In a programme where rendered cues have to remain citable across months of code changes, that is fatal, and it fails quietly.

## 3. What the patch does instead

Every draw is a pure function of its own coordinates. There is no stream and no state to carry. `rand('hamlet', 'ophelia', 12, 'melody.ornament', 0, 3)` returns the same number forever, whatever else was drawn, in what order, and whether other call sites were added or removed since.

Two properties follow, and both are structural rather than things anyone has to remember to maintain:

**Order independence.** Concurrent rendering is safe. A test asserts it directly by drawing two characters in both orders and comparing.

**Change locality.** Adding a draw under a new purpose string leaves every existing draw untouched, so a cue rendered in September still renders identically in March. A test asserts this too.

The new module is `src/lib/deterministic.ts`. The hash is xmur3 into a splitmix32 finaliser, integer arithmetic throughout via `Math.imul` and `>>> 0`, so the result is identical on every JavaScript engine. Floating point anywhere inside a hash makes it engine dependent, which would make a stimulus rendered in one browser a different stimulus in another.

Measured over two hundred thousand draws: maximum decile deviation 1.15 per cent, serial correlation between consecutive keys −0.001, range strictly inside [0, 1). Good enough for the use it is put to, which is ornament and inflection rather than cryptography or simulation.

## 4. Two key scopes, and a musical bug fixed on the way

S1 section 6 already drew the line this implements: the transformation is deterministic, and any stochastic element "sits downstream of the transformation, in performance rather than in composition." So there are two scopes.

`characterKey(work, character)` is stable for a character across a whole work. `frameKey(work, character, frameIndex)` varies per frame.

Choices belonging to a character use the character scope. A character's instrument is the clear case, and it turned out that keying it per frame had been a musical bug as well as a determinism one: the instrument was being reselected on every frame, so a character had no stable voice. Under the patch a character's instrument is a function of that character, which is what the theory says timbre is for.

Choices belonging to a moment of performance use the frame scope: ornament, syncopation, pattern length, velocity inflection, the flattened ninth in a voicing. None of them changes a named musical parameter of the theory. Mode, dynamics, the fragmentation stage and the density level are computed and were never drawn, which is worth stating because it means the determinism defect never reached the parameters A4, A7 and A8 are about.

## 5. Versioning, which is the part nobody asks for

`SEED_ALGORITHM_VERSION` is part of every key. Changing the hash changes every rendered stimulus in the programme, so it must be a deliberate and visible act rather than a side effect of a refactor. Bumping it is how you say "these are new stimuli". Leaving it alone is how a rendered cue stays the cue it was.

The test pins two exact values against version 1, explicitly rather than by snapshot, because a snapshot can be regenerated silently with `-u` and these values must not be. If someone changes the algorithm without bumping the version, the test fails and says why.

## 6. The end of fabricated state, per decision 9

The parser was assigning all four DISC components and all three Dark Triad components with the random number generator, banded off average trauma. On one import path trauma and entropy were assigned that way too, and the character-analysis endpoint returned an entropy drawn from a random band inside what it called a psychometric profile.

Decision 9 was to leave them unset. The patch does that: `inferDISC` and `inferDarkTriad` return null, the types become nullable, and each carries a named open task for the instrument that would fill them, either by deriving them from the text under a published protocol or by taking them from the user.

Making the types nullable is the point rather than a side effect. The type checker then forces every consumer to decide what an absent reading means, and three had to be changed:

- The character-analysis endpoint propagates absence through its arc rather than multiplying null by 1.3.
- The process-play endpoint scores an unmeasured frame at the neutral baseline and records `traumaMeasured: false` beside it, so a downstream reader can tell a measured zero from an absent reading. That distinction did not exist before and could not have.
- The import page stores null rather than a random number.

An invented value is indistinguishable downstream from a measured one. That is the whole argument, and it is why null is better than a plausible default.

## 7. One thing found on the way that you should know about

`.gitignore` line 13 carried a bare `lib/`, which also matches `src/lib/`. That directory holds `play_parser.ts`, `leitmotif_transformation_rules.ts` and now `deterministic.ts`. The existing files are tracked only because somebody force-added them at some point, and **any new file placed in `src/lib/` was silently untracked and would never have reached the repository**.

The patch narrows the pattern to `/lib/`, anchored to the root, which is the build output it was written for. This is a small change with a large blast radius avoided; a new module dropped into `src/lib` would have worked locally and vanished on clone.

## 8. What is not fixed

The patch covers the composition path, the state path and the import path. It does not touch the visualisation experiments, where roughly fifty further calls remain in the 3D components and the background effect. Those are decoration and a non-reproducible background animation harms nothing.

Two of them are worth a second look and are left for you rather than changed silently. `ScoreRendererDemo.tsx` generates trauma and entropy at random for its demonstration, which is harmless in a demo and would be a problem if anyone screenshotted it as output. And `MPNExperiment_PersistenceBarcode.tsx` generates its whole barcode at random while taking trauma as an input, so the picture appears to depend on the state and does not.

## 9. How to apply and verify

```
git apply --check 0001-determinism-and-no-fabricated-state.patch
git apply 0001-determinism-and-no-fabricated-state.patch
npm test -- deterministic
```

Then the check that matters more than any test: open the application, render a scene, render it again, and compare. Before the patch the two differ. After it they do not, and A11 is true rather than asserted.

The patch has been typechecked against the repository. The only type errors that remain in the touched files are three in `src/app/api/instruments/route.ts` that are present in the unmodified tree as well, confirmed by stashing the patch and re-running; they concern null against undefined on URL search parameters and have nothing to do with this work.

Nothing has been pushed. The patch is yours to read and apply.
