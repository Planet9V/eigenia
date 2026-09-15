| Field | Value |
|:---|:---|
| Designation | S3-GENERATORS-README |
| Title | How to run the eleven S3 generators |
| Status | Issued with MPN-S3 revision 7 |

## 1. What they are

Every figure in MPN-S3 is produced by one of these eleven scripts. None transcribes a number from the paper and none takes a claim on trust: each parses the reference implementation or the frame library directly, and each aborts if the lines of the implementation it transcribes have changed. If a script runs clean, the paper's figures are the code's figures on the tree it was run against.

## 2. What they need

Two paths, both settable by environment variable.

`MPN_REPO` is the MPN Conductor working tree, the directory containing `src/components/mpn-lab/`. It is not inside any folder currently connected to this session, so it must be set explicitly:

    export MPN_REPO=/path/to/mpn-conductor-standalone

`MPN_CORPUS` is this corpus, the directory containing `01_THEORY/` and `08_PAPERS/`. Only `s3_bias_reconcile.py` reads it, and it finds this folder without help when run from inside it.

Python 3.9 or later, standard library only. No packages to install.

## 3. Running them

From `05_DATA/03_generators/`, with `MPN_REPO` set:

    for f in s3_*.py; do echo "== $f"; python3 "$f" || echo "FAILED"; done

Ten finish in under a second. `s3_interpolate.py` sweeps two grids over the register simplex and takes two to three minutes; that is expected.

## 4. What each one establishes

| Script | Paper section | What it proves |
|:---|:---|:---|
| `s3_modes.py` | 2.3 | The five places the source decides a mode, which reach a score, and why the Lyapunov branch always wins. Enumerates every line returning a mode name rather than checking a list of function names |
| `s3_register_reach.py` | 3 | Every line that reads a register component, the four chains they feed, and the printed counts the paper's sentences must use |
| `s3_tempo_metre.py` | 2.2 | The piecewise affine tempo law, the two jumps, the 35 reachable tempi, and the uncovered entropy interval from 0.5 to 0.6 |
| `s3_dynamics.py` | 2.1 | The eight-marking law and its crossing probabilities, in closed form and by enumeration, and the three-label TypeScript path with its two uncovered intervals |
| `s3_frame_cells.py` | 3 | The reachable output tuples under the specified laws and under the shipped laws separately, and the seven rhythmic cells |
| `s3_interpolate.py` | 2.3 | The tie rule: determinacy, agreement with argmax outside the margin, the Lipschitz constant, the 50-cent worst case, the blended area, and the jump set |
| `s3_clip.py` | 2.4 | Where the fragmentation clip binds, and the realised correlations of both the adopted and the superseded A8 pair |
| `s3_commensurability.py` | 2.4, 3 | Every effective-contribution figure, and the two commensurability-audit figures that do not reproduce |
| `s3_worked_frame.py` | 3 | One real frame from the library, taken through every law, specified against shipped |
| `s3_timbre.py` | 2.6 | The Hadamard contrast basis, its orthonormality, the rank and null direction of the DISC-to-timbre map |
| `s3_bias_reconcile.py` | 4 | The four bias counts, derived from the Atlas and the implementation, and the invariant that every Atlas entry with no musical mapping is covered by a drafted mapping or a recorded strike |

## 5. Striking a drafted bias mapping

`s3_bias_reconcile.py` reads `08_PAPERS/MPN-S3-STRIKES.md` if it exists. To strike CB-0nn: delete its row from S3 section 4.2, delete its entry from `DRAFT_MAPPINGS` in the script, and add a line to the strikes file:

    | CB-0nn | the reason, in a clause |

The script then still accounts for all thirty Atlas entries and reports the strike. A row deleted without a recorded strike makes the script fail, which is deliberate.

## 6. One script that was withdrawn

`s3_callgraph.py` was written for this set and is not in it. It built a textual call graph and reported reachability per function, but its attribution of a call to the enclosing function does not model class methods, so it reported five functions on the live pitch chain as unreachable. Its negative answers were the wrong ones. The lesson is recorded in MPN-NOTE-03 section 4: a search has to be as wide as the claim it supports, and the way to establish a negative about the implementation is to enumerate the values or the data the claim is about, not the names of functions that might touch them.
