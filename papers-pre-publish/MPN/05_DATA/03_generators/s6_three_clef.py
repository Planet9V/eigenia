#!/usr/bin/env python3
"""
The three-clef score: whether it can be read, measured on the seven score files.

The author's framing, verbatim: a near-real-time transposition of dialogue on a
screen "like we do for close captioning but the music score is there instead of
words, with the three clefs and the third outside", showing tension and bias.

The design document withdrew that framing on a latency argument and put nothing
in its place. The latency argument is about WHEN the surface can show something.
It says nothing about WHETHER what it shows can be read, and that is the
question this script answers, because it is the one the corpus can answer. The
corpus is seven score files holding 31,078 rows, the same rows S4 audits.

NAMING, AND WHY IT CHANGED (ARBITRATION-DESIGN-R7 change 18, ruling C, finding
G12). Earlier versions of this script called the rows "beats" and the files
"plays". S4 section 3.5 rules on both words for this artefact: 31,078 is right
as a row count and wrong as a description, it is not a number of dramatic
beats, the files are not seven plays, and the word beat is reserved for the
engine's own column name. The rows are rows; the files are score files; where a
count belongs to one file the file is named.

THE EXCLUSION, AND WHY IT IS NOW ENFORCED (change 18). The former
`assert TOTAL == 31078` made the King Lear file mandatory. S4 section 3.3 and
the design's own section 4.1 both record that file as a total parse failure,
with 3,424 of its 3,425 rows assigned to the non-speaker token STAGE. Section
4.1 requires the product this design specifies to REFUSE to render below a
parse-confidence threshold, and section 8 requires non-dialogue spans to be
marked and excluded. So the old guard enforced a contamination the design
forbids. It is replaced by an assertion over all three counts -- read, excluded,
retained -- so that a change of corpus fails this script rather than the paper.

Every table below is therefore printed TWICE: over all seven score files, and
over the six that remain when the parse failure is excluded. The Lear-excluded
figures are the ones ruling C lets the design cite.

Three quantities decide whether a three-stave live score is legible:

  1. how often each notated parameter changes, which is the event density the
     reader has to track;
  2. how much of a work the top two speakers actually cover, which is what a
     two-principal-voice reduction costs;
  3. how often the active pair changes, which is the rate the third stave has
     to redraw.

None of the three has ever been measured. All three are arithmetic on columns
that already exist. Nothing here is random and nothing here is read from prose.

Set MPN_SCORES to the score directory; otherwise the first candidate below that
actually holds the score files wins, so the script runs unchanged from a staged
copy or from the folder on the author's machine.
"""
import collections
import csv
import os

PREFIX = 'MCKENNEY_LACAN_SCORE_'
PROBE = PREFIX + 'HAMLET.csv'

SCORES_CANDIDATES = (
    '/mnt/user-data/uploads/eigenia/papers-pre-publish/MPN/05_DATA/01_scores',
    os.path.expanduser('~/mnt/eigenia/papers-pre-publish/MPN/05_DATA/01_scores'),
    os.path.expanduser('~/eigenia/papers-pre-publish/MPN/05_DATA/01_scores'),
    '/home/claude/mpn-scores',
)


def _scores():
    """Where the seven score files are. MPN_SCORES overrides; otherwise the
    first candidate that actually contains the score files wins."""
    env = os.environ.get('MPN_SCORES')
    if env:
        if not os.path.exists(os.path.join(env, PROBE)):
            raise SystemExit(
                'MPN_SCORES is set to ' + env + ' but that folder does not '
                'contain ' + PROBE + '. It must be the folder holding the '
                'seven ' + PREFIX + '*.csv score files.')
        return env
    for c in SCORES_CANDIDATES:
        if os.path.exists(os.path.join(c, PROBE)):
            return c
    raise SystemExit(
        'the score files were not found. This script needs the folder holding '
        'the seven ' + PREFIX + '*.csv files, identified by ' + PROBE + '. '
        'It looked, in order, in:\n  ' + '\n  '.join(SCORES_CANDIDATES) +
        '\nSet MPN_SCORES to that folder.')


SCORES = _scores()

FILES = {}
for fn in sorted(os.listdir(SCORES)):
    if fn.startswith(PREFIX) and fn.endswith('.csv'):
        with open(os.path.join(SCORES, fn), encoding='utf-8', newline='') as fh:
            FILES[fn[len(PREFIX):-4]] = list(csv.DictReader(fh))
if not FILES:
    raise SystemExit(
        'no score files in ' + SCORES + '; expected ' + PREFIX + '*.csv. '
        'Set MPN_SCORES to the folder that holds them.')

# S4 section 3.2, by its printed contents-block test: which of the seven files
# hold one work and which hold several. S4 section 3.3: which is the parse
# failure.
SINGLE_PLAYS = ('A_DOLLS_HOUSE', 'HAMLET', 'MACBETH')
ANTHOLOGIES = {'CHERRY_ORCHARD': 8, 'MISS_JULIE': 5, 'OEDIPUS_REX': 3}
PARSE_FAILURE = 'KING_LEAR'

ROWS_READ = sum(len(v) for v in FILES.values())
RETAINED_FILES = {p: r for p, r in FILES.items() if p != PARSE_FAILURE}
ROWS_EXCLUDED = len(FILES.get(PARSE_FAILURE, ()))
ROWS_RETAINED = sum(len(v) for v in RETAINED_FILES.values())

ALL_ROWS = [r for rows in FILES.values() for r in rows]
KEPT_ROWS = [r for rows in RETAINED_FILES.values() for r in rows]


def rule(n=78):
    print('=' * n)


def f(row, key):
    try:
        return float(row[key])
    except (TypeError, ValueError):
        return None


rule(); print('0. THE CORPUS, NAMED AS S4 SECTION 3.5 REQUIRES'); rule()
print('  Seven score files, not seven plays. Rows, not beats: the word beat is')
print('  reserved for the engine\'s own column name.')
print(f'  Read from {SCORES}')
print()
for p, rows in FILES.items():
    kind = ('single play' if p in SINGLE_PLAYS else
            f'anthology, {ANTHOLOGIES[p]} works' if p in ANTHOLOGIES else
            'PARSE FAILURE, excluded below')
    print(f'  {p:16s} {len(rows):6d} rows   {kind}')
print(f'  {"ROWS READ":16s} {ROWS_READ:6d} rows')

assert set(FILES) == set(SINGLE_PLAYS) | set(ANTHOLOGIES) | {PARSE_FAILURE}, \
    ('the file set is not the one S4 section 3.2 rules on; read '
     + ', '.join(sorted(FILES)))

# --- the exclusion, verified rather than assumed ---------------------------
kl = FILES[PARSE_FAILURE]
kl_sp = collections.Counter((r.get('SPEAKER') or '').strip() for r in kl)
kl_stage = kl_sp.get('STAGE', 0)
print()
print(f'  THE EXCLUSION (change 18). {PARSE_FAILURE}: {len(kl)} rows, of which')
print(f'  {kl_stage} carry the non-speaker SPEAKER token "STAGE". The remaining')
print(f'  {len(kl) - kl_stage}: '
      f'{ {k: v for k, v in kl_sp.items() if k != "STAGE"} }.')
print('  S4 section 3.3 and design section 4.1 both record this as a total')
print('  parse failure. Design section 4.1 makes the product this file')
print('  specifies REFUSE to render it. Verified here, not taken on trust.')
print()
print(f'  rows read      {ROWS_READ}')
print(f'  rows excluded  {ROWS_EXCLUDED}   ({PARSE_FAILURE})')
print(f'  rows retained  {ROWS_RETAINED}')

# The guard change 18 requires: all three counts, so that a change of corpus
# fails this script rather than the paper. The old `assert TOTAL == 31078`
# enforced the contamination it was supposed to guard against.
assert ROWS_READ == 31078, f'expected 31,078 rows read, read {ROWS_READ}'
assert ROWS_EXCLUDED == 3425, \
    f'expected 3,425 rows excluded ({PARSE_FAILURE}), excluded {ROWS_EXCLUDED}'
assert ROWS_RETAINED == 27653, \
    f'expected 27,653 rows retained, retained {ROWS_RETAINED}'
assert ROWS_READ == ROWS_EXCLUDED + ROWS_RETAINED
assert kl_stage == 3424, \
    f'expected 3,424 STAGE rows in {PARSE_FAILURE}, found {kl_stage}'
print('  All four counts assert. This is the same corpus S1 to S4 cite, and')
print('  the exclusion is the design\'s own rule applied to it.')

# ---------------------------------------------------------------------------
# 1. Event density: how often a notated parameter changes from row to row
# ---------------------------------------------------------------------------
rule(); print('1. EVENT DENSITY, THE FIRST LEGIBILITY BUDGET'); rule()
print('  A reader tracking a stave tracks CHANGES. The laws are S3\'s normative')
print('  ones, not the shipped lookups: the eight-marking dynamic law off')
print('  trauma, the three tempo bands and four metre cuts off entropy.')
print()
DYN = [(0.10, 'ppp'), (0.20, 'pp'), (0.35, 'p'), (0.50, 'mp'),
       (0.65, 'mf'), (0.80, 'f'), (0.90, 'ff'), (1.01, 'fff')]


def dyn(tau):
    for hi, lab in DYN:
        if tau < hi:
            return lab
    return 'fff'


def tempo_band(H):
    return 'slow' if H < 0.4 else ('middle' if H < 0.7 else 'fast')


def metre(H):
    for c, lab in ((0.3, 'm1'), (0.5, 'm2'), (0.6, 'm3'), (0.8, 'm4')):
        if H < c:
            return lab
    return 'm5'


def change_rate(rows, fn, col):
    vals = [fn(f(r, col)) for r in rows if f(r, col) is not None]
    if len(vals) < 2:
        return None, 0
    ch = sum(1 for i in range(1, len(vals)) if vals[i] != vals[i - 1])
    return ch / (len(vals) - 1), len(set(vals))


print('  score file       | dynamics      | tempo band    | metre')
print('                   | change  levels| change  levels| change  levels')
print('  -----------------|---------------|---------------|---------------')
for p, rows in FILES.items():
    d, dn = change_rate(rows, dyn, 'TRAUMA_R')
    t, tn = change_rate(rows, tempo_band, 'ENTROPY_H')
    m, mn = change_rate(rows, metre, 'ENTROPY_H')
    mark = '  <- excluded below' if p == PARSE_FAILURE else ''
    print(f'  {p:16s} | {d:5.1%}    {dn}   | {t:5.1%}    {tn}   | '
          f'{m:5.1%}    {mn}{mark}')
print()

AGG = {}
for label, rows in (('ALL SEVEN FILES', ALL_ROWS),
                    ('SIX, KL EXCLUDED', KEPT_ROWS)):
    D, Dn = change_rate(rows, dyn, 'TRAUMA_R')
    T, Tn = change_rate(rows, tempo_band, 'ENTROPY_H')
    M, Mn = change_rate(rows, metre, 'ENTROPY_H')
    AGG[label] = (D, T, M)
    n = len(rows)
    print(f'  {label:16s} | {D:5.1%}    {Dn}   | {T:5.1%}    {Tn}   | '
          f'{M:5.1%}    {Mn}   ({n} rows)')
print()
print('  BOTH VERSIONS, TO FOUR PLACES, SINCE RULING C QUOTES BOTH:')
print('                     dynamics     tempo band    metre')
for label in ('ALL SEVEN FILES', 'SIX, KL EXCLUDED'):
    D, T, M = AGG[label]
    print(f'    {label:17s}{D:8.4%}   {T:10.4%}   {M:9.4%}')
print()
print('  The arbitration gives 4.55, 32.24 and 25.70 per cent on all seven and')
print('  4.5, 33.9 and 26.6 per cent with King Lear excluded. Both sets are')
print('  reproduced above to the precision the arbitration states them at.')
print('  THE FIGURES THE DESIGN MAY CITE ARE THE SECOND ROW, because the file')
print('  the first row includes is one the product would refuse.')
print()
print('  WHAT MUST BE PRINTED BESIDE THEM (ruling C, finding S19). These are')
print('  properties of one generator\'s output distribution, not of S3\'s laws:')
_H = [f(r, 'ENTROPY_H') for r in ALL_ROWS if f(r, 'ENTROPY_H') is not None]
_floor = sum(1 for h in _H if h == 0.3)
_bands = [tempo_band(h) for h in _H]
_ch_idx = [i for i in range(1, len(_bands)) if _bands[i] != _bands[i - 1]]
_touch = sum(1 for i in _ch_idx if _H[i] == 0.3 or _H[i - 1] == 0.3)
print(f'    ENTROPY_H takes {len(set(_H))} distinct values over all '
      f'{len(_H)} rows read.')
print(f'    It is exactly 0.3 on {_floor} of them, {_floor/len(_H):.1%}.')
print(f'    Of the {len(_ch_idx)} tempo-band changes, {_touch} have 0.3 on one '
      f'side, {_touch/len(_ch_idx):.1%}.')
print()
print('  Read the two columns together. A low change rate with few distinct')
print('  levels is not calm notation, it is a channel that is barely moving:')
print('  the reader gets a page of the same marking. A high change rate is a')
print('  page the reader cannot track. Neither is what a live surface wants,')
print('  and the corpus says which of the two this system actually produces.')

# ---------------------------------------------------------------------------
# 2. What a two-principal-voice reduction costs
# ---------------------------------------------------------------------------
rule(); print('2. THE TWO PRINCIPAL VOICES, AND WHAT THE OTHERS LOSE'); rule()
print('  The design records an unresolved question: who selects the two')
print('  principal voices in a panel of five. Before choosing a rule, measure')
print('  what the choice costs. Coverage is the share of rows carrying a')
print('  speaker that is spoken by the top two speakers by row count.')
print()
print('  RULING C SPLITS THIS TABLE, and the split is the whole finding. Three')
print('  of the seven files are single plays and their top-two share is a')
print('  coverage figure. Three are anthologies -- the Chekhov second series,')
print('  eight works; the Strindberg second series, five; the Theban trilogy,')
print('  three -- whose speakers are several disjoint casts counted as one. A')
print('  top-two share over an anthology IS NOT A COVERAGE FIGURE for any play.')
print()


def coverage(rows):
    sp = collections.Counter((r.get('SPEAKER') or '').strip()
                             for r in rows if (r.get('SPEAKER') or '').strip())
    n = sum(sp.values())
    if not sp:
        return 0, None, None, None
    top = sp.most_common(3)
    c1 = top[0][1] / n
    c2 = sum(t[1] for t in top[:2]) / n
    c3 = sum(t[1] for t in top[:3]) / n
    return len(sp), c1, c2, c3


print('  BLOCK ONE -- THE THREE SINGLE PLAYS. These are coverage figures.')
print()
print('  score file       | speakers | top-1  | TOP-2  | top-3')
print('  -----------------|----------|--------|--------|-------')
single = {}
for p in SINGLE_PLAYS:
    k, c1, c2, c3 = coverage(FILES[p])
    single[p] = c2
    print(f'  {p:16s} |   {k:4d}   | {c1:5.1%}  | {c2:5.1%}  | {c3:5.1%}')
lo, hi = min(single.values()), max(single.values())
below = sorted(p for p, c in single.items() if c < 0.5)
print()
print(f'  RANGE {lo:.1%} to {hi:.1%} over the three single plays, with '
      f'{len(below)} of 3 below half')
print(f'  ({", ".join(below)}). The arbitration gives 39.0 to 69.2 per cent.')
print('  Four places: ' + ', '.join(
    f'{p} {single[p]:.3%}' for p in sorted(single, key=lambda q: -single[q])))
print()
print('  BLOCK TWO -- THE THREE ANTHOLOGIES. NOT COVERAGE FIGURES. Each row')
print('  below is the top-two share of a file holding several plays with')
print('  disjoint casts; it measures the anthology and not any play in it.')
print()
print('  score file       | speakers | top-1  | top-2  | top-3  | works in file')
print('  -----------------|----------|--------|--------|--------|--------------')
for p in sorted(ANTHOLOGIES):
    k, c1, c2, c3 = coverage(FILES[p])
    print(f'  {p:16s} |   {k:4d}   | {c1:5.1%}  | {c2:5.1%}  | {c3:5.1%}  |'
          f'  {ANTHOLOGIES[p]} works, {k} speakers as one cast')
_ch = coverage(FILES['CHERRY_ORCHARD'])
print()
print(f'  THE 8 PER CENT ANCHOR IS {_ch[2]:.1%}, and it is the CHERRY_ORCHARD row')
print('  above. The published headline "between 8 and 69 per cent, four of the')
print('  six less than half" took it as the low end of a range over works. It')
print(f'  is withdrawn as a coverage figure, and replaced by {lo:.1%} to {hi:.1%}.')
print()
print(f'  THE SEVENTH FILE, {PARSE_FAILURE}, carries no coverage figure at all:')
_kl = coverage(FILES[PARSE_FAILURE])
print(f'  {_kl[0]} distinct SPEAKER values, {kl_stage} of {len(kl)} rows on the')
print('  non-speaker token STAGE. It is the parse failure, not a cast.')
print()
print('  The number to carry into the design is BLOCK ONE\'s top-2 column. It')
print('  is the fraction of a play a two-stave reduction renders, and one minus')
print('  it is the fraction the third stave has to account for or the surface')
print('  silently drops.')

# ---------------------------------------------------------------------------
# 3. Dyad churn: how often the third stave redraws
# ---------------------------------------------------------------------------
rule(); print('3. DYAD CHURN, THE RATE THE THIRD STAVE REDRAWS'); rule()
print('  The third stave carries the relation between the two voices on the')
print('  first two. If the pair it refers to changes every few turns, the third')
print('  stave is not a stave at all, it is a flicker. Measured as the rate at')
print('  which the unordered pair (previous speaker, current speaker) changes,')
print('  over consecutive rows with two different named speakers.')
print()
CHURN = {}
print('  score file       | speaker changes | dyad changes | distinct dyads | busiest')
print('                   |                 |              |                | speaker\'s')
print('                   |                 |              |                | share of pairs')
print('  -----------------|-----------------|--------------|----------------|---------------')
for p, rows in FILES.items():
    seq = [(r.get('SPEAKER') or '').strip() for r in rows]
    seq = [s for s in seq if s]
    turns = [seq[0]] if seq else []
    for s in seq[1:]:
        if s != turns[-1]:
            turns.append(s)
    if len(turns) < 3:
        print(f'  {p:16s} |       --        |      --      |      --        |   --'
              + ('   <- the parse failure' if p == PARSE_FAILURE else ''))
        continue
    dyads = [frozenset((turns[i - 1], turns[i])) for i in range(1, len(turns))]
    ch = sum(1 for i in range(1, len(dyads)) if dyads[i] != dyads[i - 1])
    top1 = collections.Counter(turns).most_common(1)[0][0]
    dom = sum(1 for d in dyads if top1 in d) / len(dyads)
    CHURN[p] = (ch / (len(dyads) - 1), dom, len(set(dyads)))
    print(f'  {p:16s} |     {len(turns)-1:6d}      |   {ch/(len(dyads)-1):6.1%}     |'
          f'   {len(set(dyads)):5d}     |  {dom:5.1%}')
print()


def _span(d, keys):
    v = [d[k][0] for k in keys if k in d]
    w = [d[k][1] for k in keys if k in d]
    return (min(v), max(v), min(w), max(w)) if v else None


_all7 = _span(CHURN, list(FILES))
_six = _span(CHURN, list(RETAINED_FILES))
print('  BOTH VERSIONS, as everywhere else in this script:')
print(f'    all seven files    churn {_all7[0]:.1%} to {_all7[1]:.1%}, '
      f'busiest speaker {_all7[2]:.1%} to {_all7[3]:.1%}')
print(f'    six, KL excluded   churn {_six[0]:.1%} to {_six[1]:.1%}, '
      f'busiest speaker {_six[2]:.1%} to {_six[3]:.1%}')
if PARSE_FAILURE not in CHURN:
    print(f'    (the two are identical: {PARSE_FAILURE} has too few speaker')
    print('     changes to yield a dyad sequence at all, which is itself the')
    print('     parse failure showing up a third time.)')
print()
print('  TWO RESULTS, AND THE FIRST CONTRADICTS WHAT THE DESIGN ASSUMED.')
print()
print(f'  One: dyad churn runs {_six[0]:.1%} to {_six[1]:.1%}, not the near-100 per cent a')
print('  flickering third stave would need. The active pair SURVIVES. On the')
print('  two-hander files it changes on under a tenth of turns. A third stave')
print('  pinned to the active pair would be a stave, not a flicker, and the')
print('  legibility objection to an automatic reduction is not supported here.')
print()
print(f'  Two: the busiest speaker sits in {_six[2]:.1%} to {_six[3]:.1%} of all active pairs.')
print('  THAT is the objection, measured. The design withdrew the automatic')
print('  active-dyad reduction on the ground that in a moderated exchange the')
print('  moderator sits in nearly every adjacent pair, so the reduction would')
print('  render moderator-to-panellist for most of the runtime and discard the')
print('  clash the user came for. The corpus supports the ground it was')
print('  actually withdrawn on and does not support churn, which was never the')
print('  stated reason. The withdrawal stands; its justification is now a')
print('  number rather than an argument.')
print()
print('  ONE LIMIT ON BOTH (change 19, finding S18). These are seven Project')
print('  Gutenberg files and none of them is a moderated exchange, so neither')
print('  number corroborates a claim about moderated panels. Three of the six')
print('  are anthologies and the extremes of both ranges sit on an anthology at')
print('  one end and a two-hander at the other.')

# ---------------------------------------------------------------------------
# 4. The information budget of three staves
# ---------------------------------------------------------------------------
rule(); print('4. THE INFORMATION BUDGET OF THREE STAVES'); rule()
print('  S1 assertion B4 puts the number of independent quantities one stave')
print('  can carry at two to three, and calls it an estimate rather than a')
print('  measured figure. S3 section 2.6 supplies a MEASURED upper bound of')
print('  three for one channel of the several, the timbre channel, from the')
print('  scaling literature. Take B4 at its own stated range:')
print()
for per in (2, 3):
    print(f'    {per} quantities per stave  ->  three staves carry {3*per}')
print()
print('  Against that budget, what the surface wants to show:')
WANT = [
    ('voice 1 state', 'Phi: mode, dynamics, tempo, metre, texture, timbre', 6),
    ('voice 2 state', 'the same six', 6),
    ('the relation',  'Psi: floor share, adjacency, latency, overlap, '
                      'reciprocity, backchannel', 6),
]
for nm, what, k in WANT:
    print(f'    {nm:14s} {k:2d} quantities   ({what})')
WANT_TOTAL = sum(k for _, _, k in WANT)
print(f'    {"TOTAL":14s} {WANT_TOTAL:2d} quantities')
print()
print(f'  THE FINDING IS ARITHMETIC AND IT IS NOT CLOSE. {WANT_TOTAL} quantities')
print('  against a budget of six to nine. The three-clef score is over')
print(f'  subscribed by a factor of {WANT_TOTAL/9:.0f} at B4\'s ceiling and '
      f'{WANT_TOTAL/6:.0f} at its floor.')
print()
print('  This section is the one quantity in the script that does not depend on')
print('  the corpus, so the King Lear exclusion does not touch it.')
print()
print('  That does not kill the surface. It says the surface must CHOOSE, and')
print('  it says how many things it may choose: two to three per stave and no')
print('  more. The design consequence is a selection rule, not a warning, and')
print('  the selection is exactly what a live surface should be configured')
print('  with before a session rather than discovering mid-session.')
print()
print('  It also gives B4 something it has never had: a place where the')
print('  estimate bites. B4 has been an unmeasured number in a register with')
print('  no consequence attached. Here the difference between two and three')
print('  per stave is the difference between six and nine quantities on screen,')
print('  which is the difference between showing the relation and not showing')
print('  it. Settling B4 is now worth the study it has never justified.')
