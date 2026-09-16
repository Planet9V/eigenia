#!/usr/bin/env python3
"""
The four conditions MPN-DESIGN-01 section 11 attaches to the Autonomy-to-register
mapping, computed rather than asserted.

Section 11 rules that the mapping from Bruscia's Autonomy gradient onto the
register simplex survives, that Partner sits at the barycentre, and that four
conditions attach to keeping it:

  C1  Fix the five register triples numerically.
  C2  Run the collapse check: enumerate the five triples against the chosen
      margin and the live pitch table, and count the distinct modal outputs.
  C3  Declare the rounding convention the notation path uses.
  C4  Print the quarter-tone divergence between the notated score and the audio.

This script closes C1, C2 and C4 by computation and supplies the arithmetic on
which C3 is declared. It also fixes the gradient-to-state map that the therapy
surface needs, on a stated criterion, and runs the worked session end to end.

The mode machinery -- MODES, the LIVE pitch table, weights() and blended_scale()
-- is the machinery of s7_blocking_numbers.py in this directory, restated here so
that this script runs alone, and cross-checked against MPN-S2's closed form for
the margin area before any of it is used.

Every figure printed below is a property of the maps MPN-S2 and MPN-S3 state.
Nothing here is measured on any person. The script exits non-zero if any
assertion fails.
"""
import collections
import itertools
import math
import sys

FAILURES = []
RUN = []

def check(label, condition, detail=''):
    """Record an invariant. The script exits non-zero if any of them fails."""
    mark = 'ok  ' if condition else 'FAIL'
    line = f'  [{mark}] {label}'
    if detail:
        line += f'   {detail}'
    print(line)
    RUN.append(label)
    if not condition:
        FAILURES.append(label)
    return condition

def rule(n=78):
    print('=' * n)

def head(title):
    print()
    rule()
    print(title)
    rule()

# ===========================================================================
# THE MODE MACHINERY, restated from s7_blocking_numbers.py
# ===========================================================================

MODES = {
    'Ionian':     (0, 2, 4, 5, 7, 9, 11),
    'Dorian':     (0, 2, 3, 5, 7, 9, 10),
    'Phrygian':   (0, 1, 3, 5, 7, 8, 10),
    'Lydian':     (0, 2, 4, 6, 7, 9, 11),
    'Mixolydian': (0, 2, 4, 5, 7, 9, 10),
    'Aeolian':    (0, 2, 3, 5, 7, 8, 10),
    'Locrian':    (0, 1, 3, 5, 6, 8, 10),
}
LIVE = {'low':  {'R': 'Dorian',  'S': 'Lydian',      'I': 'Phrygian'},
        'high': {'R': 'Aeolian', 'S': 'Mixolydian',  'I': 'Locrian'}}
ORDER = ('R', 'S', 'I')
BAND_SWITCH = 0.6          # MPN-S3 2.3: the table switches at trauma 0.6

def weights(x, delta):
    """MPN-S3 decision D3 option (c): w_k = max(0, 1 - (m - x_k)/delta), normalised."""
    m = max(x)
    w = [max(0.0, 1.0 - (m - xk) / delta) for xk in x]
    s = sum(w)
    return [wi / s for wi in w]

def blended_scale(x, delta, band):
    w = weights(x, delta)
    tbl = LIVE[band]
    return [sum(w[k] * MODES[tbl[ORDER[k]]][d] for k in range(3)) for d in range(7)]

def argmax_mode(x, band):
    k = max(range(3), key=lambda i: (x[i], -i))   # R over S over I on a tie
    return LIVE[band][ORDER[k]]

def half_up(v):
    return math.floor(v + 0.5)

def half_even(v):
    return round(v)

def name_of(scale):
    hit = [n for n, m in MODES.items() if list(m) == list(scale)]
    return hit[0] if hit else 'a scale outside the seven'

def notate(blend, convention):
    f = half_up if convention == 'half up' else half_even
    return [f(v) for v in blend]

def divergence_cents(blend, convention):
    """Greatest disagreement, in cents, between the notated pitch and the audio."""
    return max(abs(b - r) * 100 for b, r in zip(blend, notate(blend, convention)))

# ---------------------------------------------------------------------------
# The machinery is checked against MPN-S2's closed form before it is used.
# ---------------------------------------------------------------------------
head('THE MACHINERY, CHECKED BEFORE IT IS USED')

N = 200
GRID = []
for i in range(N + 1):
    for j in range(N + 1 - i):
        GRID.append((i / N, j / N, (N - i - j) / N))
print(f'  simplex grid: {len(GRID):,} points at a step of 1/{N}')

for delta in (0.05, 0.20):
    inside = sum(1 for x in GRID if sum(1 for w in weights(x, delta) if w > 1e-12) > 1)
    measured = inside / len(GRID)
    closed = 2 * delta - delta ** 2
    check(f'margin area at delta {delta:.2f} matches MPN-S2\'s kite form 2d - d^2',
          abs(measured - closed) < 0.01,
          f'measured {measured:.4f}, closed form {closed:.4f}')

outside_agrees = 0
outside_total = 0
for x in GRID:
    w = weights(x, 0.05)
    if sum(1 for wi in w if wi > 1e-12) == 1:
        outside_total += 1
        blend = blended_scale(x, 0.05, 'low')
        if [round(v) for v in blend] == list(MODES[argmax_mode(x, 'low')]):
            outside_agrees += 1
check('outside the margin the interpolation is argmax exactly',
      outside_agrees == outside_total,
      f'{outside_agrees:,} of {outside_total:,} states')

# ===========================================================================
# C1. THE FIVE REGISTER TRIPLES, FIXED NUMERICALLY
# ===========================================================================
head('C1. THE FIVE REGISTER TRIPLES, FIXED NUMERICALLY')

REAL_FLOOR = 0.15     # the shared frame the first four gradients keep intact
LEAN       = 0.60     # what a named register carries when it is the leader

GRADIENTS = [
    # name,        (R,      S,      I)
    ('Dependent', (REAL_FLOOR, 0.25, LEAN)),
    ('Follower',  (REAL_FLOOR, (1 - REAL_FLOOR) / 2, (1 - REAL_FLOOR) / 2)),
    ('Partner',   (1 / 3, 1 / 3, 1 / 3)),
    ('Leader',    (REAL_FLOOR, LEAN, 0.25)),
    ('Resister',  (LEAN, 0.20, 0.20)),
]
NAMES = [g for g, _ in GRADIENTS]
TRIPLE = dict(GRADIENTS)

print('  gradient   |     Real |  Symbolic | Imaginary | the reading')
print('  -----------|----------|-----------|-----------|------------------------------')
READING = {
    'Dependent': 'the other as image, the Imaginary leads',
    'Follower':  'rule-taking without rule-setting: Imaginary and Symbolic exactly level',
    'Partner':   'mutual regulation: the barycentre, all three level',
    'Leader':    'the client sets the structure, the Symbolic leads',
    'Resister':  'the shared structure is refused, the Real leads',
}
for n, (r, s, i) in GRADIENTS:
    print(f'  {n:<10} | {r:8.4f} | {s:9.4f} | {i:9.4f} | {READING[n]}')
print()

for n, x in GRADIENTS:
    check(f'{n} lies on the simplex', abs(sum(x) - 1.0) < 1e-12 and all(v >= 0 for v in x),
          f'sum {sum(x):.12f}')
check('Partner is exactly the barycentre',
      all(abs(v - 1 / 3) < 1e-15 for v in TRIPLE['Partner']))
check('Dependent is Imaginary-led', TRIPLE['Dependent'][2] == max(TRIPLE['Dependent']))
check('Follower has the Imaginary and the Symbolic exactly level',
      abs(TRIPLE['Follower'][1] - TRIPLE['Follower'][2]) < 1e-15)
check('Leader is Symbolic-led', TRIPLE['Leader'][1] == max(TRIPLE['Leader']))
check('Resister is Real-led', TRIPLE['Resister'][0] == max(TRIPLE['Resister']))
check('the four gradients that keep the shared frame hold the Real level',
      len({round(TRIPLE[n][0], 12) for n in ('Dependent', 'Follower', 'Leader')}) == 1,
      f'Real held at {REAL_FLOOR}')
check('Dependent and Leader are mirror images in the Imaginary and the Symbolic',
      TRIPLE['Dependent'][1] == TRIPLE['Leader'][2]
      and TRIPLE['Dependent'][2] == TRIPLE['Leader'][1])
check('the table is not monotone: it leaves the Imaginary-Symbolic edge at Resister',
      TRIPLE['Resister'][0] > max(TRIPLE[n][0] for n in ('Dependent', 'Follower', 'Leader')))

# ===========================================================================
# C2. THE COLLAPSE CHECK
# ===========================================================================
head('C2. THE COLLAPSE CHECK')

DELTAS = (0.02, 0.05, 0.10, 0.15, 0.20, 0.30)

def five_blends(delta, band):
    return {n: blended_scale(TRIPLE[n], delta, band) for n in NAMES}

print('  The blended scale each gradient renders, at delta = 0.05, on the low band')
print('  (Real Dorian, Symbolic Lydian, Imaginary Phrygian).')
print()
print('  gradient   | the blended scale in semitones above the tonic')
print('  -----------|--------------------------------------------------------------')
B05 = five_blends(0.05, 'low')
for n in NAMES:
    print(f'  {n:<10} | ' + ', '.join(f'{v:.4f}' for v in B05[n]))
print()

check('the five blended scales are pairwise distinct at delta = 0.05',
      len({tuple(round(v, 9) for v in B05[n]) for n in NAMES}) == 5)

# --- margin invariance -----------------------------------------------------
print('  Margin invariance. The blended scales are recomputed at every margin from')
print('  0.001 to 0.400 in steps of 0.001 and compared with the value at 0.001.')
base = {n: tuple(round(v, 9) for v in blended_scale(TRIPLE[n], 0.001, 'low')) for n in NAMES}
first_change = None
for k in range(1, 401):
    d = k / 1000.0
    cur = {n: tuple(round(v, 9) for v in blended_scale(TRIPLE[n], d, 'low')) for n in NAMES}
    if cur != base:
        first_change = d
        break
print(f'  the first margin at which any of the five outputs changes: {first_change:.3f}')
print('  MPN-S3 section 2.3 puts the candidate margins at 0.02 to 0.20.')
check('the five outputs are the same at every margin MPN-S3 has under consideration',
      first_change is not None and first_change > 0.20,
      f'invariant below {first_change:.3f}')
check('the margin at which the Real enters Follower is the Real gap',
      abs(first_change - (TRIPLE['Follower'][1] - TRIPLE['Follower'][0])) < 0.0015,
      f'Real gap {TRIPLE["Follower"][1] - TRIPLE["Follower"][0]:.3f}')

# --- the count, by band and by convention ----------------------------------
print()
print('  The count of distinct outputs, by band, by path and by convention.')
print()
print('  band | path                      | distinct outputs of a possible five')
print('  -----|---------------------------|------------------------------------')
COUNTS = {}
for band in ('low', 'high'):
    bl = five_blends(0.05, band)
    exact = len({tuple(round(v, 9) for v in bl[n]) for n in NAMES})
    COUNTS[(band, 'audio')] = exact
    print(f'  {band:<4} | audio, exact in cents     | {exact}')
    for conv in ('half up', 'half to even'):
        c = len({tuple(notate(bl[n], conv)) for n in NAMES})
        COUNTS[(band, conv)] = c
        print(f'  {band:<4} | notation, {conv:<14} | {c}')
print()

for band in ('low', 'high'):
    check(f'the audio path renders five distinct outputs on the {band} band',
          COUNTS[(band, 'audio')] == 5)
    check(f'the notation path under round half up renders three on the {band} band',
          COUNTS[(band, 'half up')] == 3)
    check(f'the notation path under round half to even renders four on the {band} band',
          COUNTS[(band, 'half to even')] == 4)

print('  Which gradients share a notated scale, at delta = 0.05:')
print()
for band in ('low', 'high'):
    bl = five_blends(0.05, band)
    for conv in ('half up', 'half to even'):
        groups = collections.defaultdict(list)
        for n in NAMES:
            groups[tuple(notate(bl[n], conv))].append(n)
        print(f'  {band} band, {conv}:')
        for sc, members in groups.items():
            print(f'     {" and ".join(members):<24} -> {list(sc)}  {name_of(sc)}')
        print()

# --- is the Partner-Resister meeting structural? ---------------------------
print('  Whether the Partner and Resister meeting is a property of these triples')
print('  or of the live table. Every Real-led triple on the grid whose lead exceeds')
print('  the margin is enumerated, and its notated scale recorded.')
print()
for band in ('low', 'high'):
    reals = set()
    n_real = 0
    for x in GRID:
        if x[0] > max(x[1], x[2]) + 0.05 + 1e-12:
            n_real += 1
            reals.add(tuple(notate(blended_scale(x, 0.05, band), 'half to even')))
    partner_notated = tuple(notate(blended_scale(TRIPLE['Partner'], 0.05, band), 'half to even'))
    only = list(reals)[0] if len(reals) == 1 else None
    print(f'  {band} band: {n_real:,} Real-led states, {len(reals)} distinct notated scale(s): '
          f'{name_of(only) if only else "several"}')
    check(f'every Real-led state notates to one scale on the {band} band', len(reals) == 1)
    check(f'the barycentre notates to that same scale on the {band} band',
          partner_notated == only,
          f'{name_of(partner_notated)}')
print()
print('  So the Partner and Resister meeting on the notation path is a property of')
print('  the live pitch table and the barycentre, and holds for every admissible')
print('  Real-led placement of Resister. It is declared rather than moved.')

# --- what the Imaginary-Symbolic edge can notate ---------------------------
print()
print('  What the Imaginary-Symbolic edge can notate. Follower is placed on that')
print('  edge; the edge is scanned at a step of 1/2000 and every notated scale')
print('  recorded, under each convention.')
print()
EDGE_STEPS = 2000
for conv in ('half up', 'half to even'):
    seen = {}
    for k in range(EDGE_STEPS + 1):
        t = k / EDGE_STEPS
        rest = 1 - REAL_FLOOR
        x = (REAL_FLOOR, rest * (1 - t), rest * t)
        sc = tuple(notate(blended_scale(x, 0.05, 'low'), conv))
        seen.setdefault(sc, []).append(t)
    print(f'  {conv}: {len(seen)} distinct notated scale(s) reachable on the edge')
    for sc, ts in seen.items():
        span = f'{min(ts):.4f} to {max(ts):.4f}' if len(ts) > 1 else f'the single point t = {min(ts):.4f}'
        print(f'     {list(sc)}  {name_of(sc):<28} on {span}')
    print()
dep_sc = tuple(notate(blended_scale(TRIPLE['Dependent'], 0.05, 'low'), 'half to even'))
led_sc = tuple(notate(blended_scale(TRIPLE['Leader'], 0.05, 'low'), 'half to even'))
tie_sc = tuple(notate(blended_scale(TRIPLE['Follower'], 0.05, 'low'), 'half to even'))
tie_up = tuple(notate(blended_scale(TRIPLE['Follower'], 0.05, 'low'), 'half up'))
check('under round half to even the exact tie notates to a scale of its own',
      tie_sc != dep_sc and tie_sc != led_sc, f'{list(tie_sc)}')
check('under round half up the exact tie notates to the Leader\'s scale',
      tie_up == tuple(notate(blended_scale(TRIPLE['Leader'], 0.05, 'low'), 'half up')),
      f'{name_of(tie_up)}')
off_tie = []
for k in range(1, EDGE_STEPS + 1):
    t = 0.5 + k / (2 * EDGE_STEPS)
    rest = 1 - REAL_FLOOR
    x = (REAL_FLOOR, rest * (1 - t), rest * t)
    sc = tuple(notate(blended_scale(x, 0.05, 'low'), 'half to even'))
    if sc not in (dep_sc, led_sc):
        off_tie.append(t)
check('the exact tie is the only placement on the edge that notates to its own scale',
      not off_tie, f'{len(off_tie)} other placements')

# --- does the count depend on the particular numbers chosen? ---------------
print()
print('  Whether the three counts depend on the particular numbers of C1. The')
print('  Real floor is swept from 0.05 to 0.30 and the leader\'s weight from 0.45')
print('  to 0.80, keeping the readings of C1 intact, and the three counts are')
print('  recomputed at every admissible pair.')
sweep_n = 0
sweep_counts = set()
sweep_short = set()
sweep_lead = 0
for rf_i in range(5, 31):
    rf = rf_i / 100.0
    for ln_i in range(45, 81):
        ln = ln_i / 100.0
        rest = 1.0 - rf - ln
        if rest <= 0.02:
            continue
        trip = {
            'Dependent': (rf, rest, ln),
            'Follower':  (rf, (1 - rf) / 2, (1 - rf) / 2),
            'Partner':   (1 / 3, 1 / 3, 1 / 3),
            'Leader':    (rf, ln, rest),
            'Resister':  (ln, (1 - ln) / 2, (1 - ln) / 2),
        }
        if trip['Dependent'][2] != max(trip['Dependent']):
            continue
        if trip['Leader'][1] != max(trip['Leader']):
            continue
        if trip['Resister'][0] != max(trip['Resister']):
            continue
        sweep_n += 1
        bl = {n: blended_scale(trip[n], 0.05, 'low') for n in NAMES}
        counts = (
            len({tuple(round(v, 9) for v in bl[n]) for n in NAMES}),
            len({tuple(notate(bl[n], 'half up')) for n in NAMES}),
            len({tuple(notate(bl[n], 'half to even')) for n in NAMES}),
        )
        # the lead rule: a gradient named for a register leads by more than the margin
        leads = min(ln - rest, ln - (1 - ln) / 2)
        if leads > 0.05:
            sweep_lead += 1
            sweep_counts.add(counts)
        else:
            sweep_short.add((round(leads, 4), counts))
print(f'  pairs swept: {sweep_n:,}; of those, pairs on which every named '
      f'register leads by more than the margin: {sweep_lead:,}')
print(f'  count triples where every named register leads by more than the margin '
      f'(audio, half up, half to even): {sorted(sweep_counts)}')
print(f'  count triples where a named register leads by zero: '
      f'{sorted({c for lead, c in sweep_short if lead == 0.0})}')
check('the three counts hold wherever every named register leads by more than the margin',
      sweep_counts == {(5, 3, 4)}, f'{sorted(sweep_counts)}')
check('a lead of zero is what puts three gradients on one audio output',
      {c for lead, c in sweep_short if lead == 0.0} == {(3, 2, 2)},
      f'{sorted({c for lead, c in sweep_short if lead == 0.0})}')
print('  THE LEAD RULE, which the sweep is what establishes: a gradient named for')
print('  a register is placed so that the register leads the other two by more')
print('  than the interpolation margin. Under that rule the three counts are the')
print('  same at every placement, so the collapse check below is a finding about')
print('  the live pitch table rather than about the numbers C1 chose.')

# ===========================================================================
# C3. THE ROUNDING CONVENTION
# ===========================================================================
head('C3. THE ROUNDING CONVENTION, AND WHAT EACH ONE DECIDES')

print('  MPN-S3 section 2.3 states the general case at the Real against Symbolic')
print('  tie on the live low band, Dorian against Lydian. Recomputed here:')
_d, _l = MODES['Dorian'], MODES['Lydian']
_b = [(a + b) / 2 for a, b in zip(_d, _l)]
print(f'    Dorian            {list(_d)}')
print(f'    Lydian            {list(_l)}')
print(f'    the blend         {_b}')
print(f'    round half up     {notate(_b, "half up")}  -> {name_of(notate(_b, "half up"))}')
print(f'    round half to even {notate(_b, "half to even")}  -> {name_of(notate(_b, "half to even"))}')
check('round half up at the Real-Symbolic tie returns one of the two inputs',
      name_of(notate(_b, 'half up')) in ('Dorian', 'Lydian'))
check('round half to even at that tie returns a scale outside the seven',
      name_of(notate(_b, 'half to even')) == 'a scale outside the seven')
print()
print('  What each convention costs the therapist, counted over the five gradients:')
print()
print('  convention        | distinct notated scales | gradients that keep a scale of their own')
print('  ------------------|-------------------------|----------------------------------------')
for conv in ('half up', 'half to even'):
    bl = five_blends(0.05, 'low')
    groups = collections.defaultdict(list)
    for n in NAMES:
        groups[tuple(notate(bl[n], conv))].append(n)
    alone = [m[0] for m in groups.values() if len(m) == 1]
    print(f'  {conv:<17} | {len(groups):^23} | {", ".join(alone)}')
print()
print('  THE DECLARATION. The notation path rounds half to even. It is the')
print('  convention that keeps Follower a scale of its own, it is what a Python')
print('  implementation gets by writing round, and it is declared on the face of')
print('  the score.')

# ===========================================================================
# C4. THE DIVERGENCE BETWEEN THE SCORE AND THE AUDIO
# ===========================================================================
head('C4. THE DIVERGENCE BETWEEN THE SCORE AND THE AUDIO, IN CENTS')

print('  Under the declared convention, at delta = 0.05.')
print()
print('  gradient   | low band, greatest divergence | high band, greatest divergence')
print('  -----------|-------------------------------|-------------------------------')
DIVERGE = {}
for n in NAMES:
    row = []
    for band in ('low', 'high'):
        bl = blended_scale(TRIPLE[n], 0.05, band)
        d = divergence_cents(bl, 'half to even')
        DIVERGE[(n, band)] = d
        row.append(d)
    print(f'  {n:<10} | {row[0]:>25.2f}     | {row[1]:>25.2f}')
print()
worst = max(DIVERGE.values())
exact = [n for n in NAMES if DIVERGE[(n, 'low')] == 0 and DIVERGE[(n, 'high')] == 0]
print(f'  the greatest divergence over the five gradients and both bands: {worst:.2f} cents')
print(f'  gradients on which the score and the audio agree exactly: {", ".join(exact)}')
check('the greatest divergence is the quarter tone MPN-S3 gives as the worst case',
      abs(worst - 50.0) < 1e-9, f'{worst:.2f} cents')
check('Follower is where the quarter tone is attained',
      abs(DIVERGE[('Follower', 'low')] - 50.0) < 1e-9)
check('Partner diverges by one third of a semitone',
      abs(DIVERGE[('Partner', 'low')] - 100.0 / 3) < 1e-6,
      f'{DIVERGE[("Partner", "low")]:.4f} cents')
check('three of the five gradients render a printed scale and its audio alike',
      len(exact) == 3, ', '.join(exact))

print()
print('  Where the divergence sits, degree by degree, for the two gradients that')
print('  carry it. Low band.')
for n in ('Follower', 'Partner'):
    bl = blended_scale(TRIPLE[n], 0.05, 'low')
    nt = notate(bl, 'half to even')
    print(f'    {n}:')
    print('      audio, semitones  ' + ', '.join(f'{v:7.4f}' for v in bl))
    print('      score, semitones  ' + ', '.join(f'{v:7d}' for v in nt))
    print('      divergence, cents ' + ', '.join(f'{abs(a - b) * 100:7.2f}' for a, b in zip(bl, nt)))

# ===========================================================================
# THE GRADIENT-TO-STATE MAP
# ===========================================================================
head('THE GRADIENT-TO-STATE MAP, FIXED ON A STATED CRITERION')

DYN_B   = (0.10, 0.20, 0.35, 0.50, 0.65, 0.80, 0.90)
TEMPO_B = (0.40, 0.70)
METRE_B = (0.30, 0.50, 0.60, 0.80)
MODE_B  = (BAND_SWITCH,)
BOUNDS  = tuple(sorted(set(DYN_B + TEMPO_B + METRE_B + MODE_B)))
LADDER  = (0.20, 0.40, 0.60, 0.80)

print(f'  the boundaries a rating on the unit interval can land on: {list(BOUNDS)}')
print('  (seven from the dynamics ladder, two from tempo, four from metre, one')
print('  from the trauma switch in the mode table; the set is their union)')
print()

def levels(a, b):
    return [a + b * (g - 1) for g in range(1, 6)]

def clearance(a, b):
    ls = levels(a, b)
    if ls[0] <= 0.0 or ls[-1] >= 1.0:
        return -1.0
    return min(abs(l - bd) for l in ls for bd in BOUNDS)

# a symmetric map puts its middle level at 0.5, which is a boundary of two channels
check('0.5 is a boundary of the dynamics ladder and of the metre lookup',
      0.5 in DYN_B and 0.5 in METRE_B)
sym_fail = all(clearance(0.5 - 2 * bb, bb) <= 1e-12
               for bb in [k / 1000 for k in range(1, 250)])
check('no five-level map symmetric about the midpoint clears every boundary',
      sym_fail, 'its middle level is 0.5')

best = None
for ai in range(10, 401):
    a = ai / 1000.0
    for bi in range(50, 251):
        b = bi / 1000.0
        c = clearance(a, b)
        if c < 0:
            continue
        key = (round(c, 6), -sum((l - m) ** 2 for l, m in zip(levels(a, b), (0.1, 0.3, 0.5, 0.7, 0.9))))
        if best is None or key > best[0]:
            best = (key, a, b)
_, A, B = best
LEVELS = levels(A, B)
CLEAR = clearance(A, B)
print(f'  the map that keeps every rating level furthest from every boundary:')
print(f'    level(g) = {A:.3f} + {B:.3f} * (g - 1), for g = 1 to 5')
print(f'    the five levels: ' + ', '.join(f'{l:.3f}' for l in LEVELS))
print(f'    least clearance from any boundary: {CLEAR:.4f} in state units')
print()
check('every rating level clears every boundary', CLEAR > 0, f'{CLEAR:.4f}')
check('the map is strictly increasing', all(LEVELS[i] < LEVELS[i + 1] for i in range(4)))
check('every level lies strictly inside the unit interval',
      LEVELS[0] > 0 and LEVELS[-1] < 1)

# the two composite ladders take both ratings, so they are checked over all 25 pairs
worst_ladder = 1.0
for gt in range(5):
    for gh in range(5):
        tau, H = LEVELS[gt], LEVELS[gh]
        dens = 0.3 * H + 0.7 * tau
        frag = max(0.0, 0.7 * H - 0.3 * tau) / 0.7
        for v in (dens, frag):
            worst_ladder = min(worst_ladder, min(abs(v - bd) for bd in LADDER))
print(f'  over all 25 pairs of ratings, the least clearance of the density and')
print(f'  fragmentation ladders from a ladder boundary: {worst_ladder:.4f}')
check('no pair of ratings puts a composite ladder on a boundary', worst_ladder > 0,
      f'{worst_ladder:.4f}')

# ===========================================================================
# THE WORKED SESSION
# ===========================================================================
head('THE WORKED SESSION: FIVE RATINGS IN, MUSIC OUT')

RATING = {
    'Relational stance':  'Partner',
    'Musical variability': 2,
    'Arousal':             3,
    'Valence':             2,
    'Session intensity':   4,
}
print('  What the therapist set:')
for k, v in RATING.items():
    print(f'    {k:<20} {v}')
print()

tau = LEVELS[RATING['Session intensity'] - 1]
H   = LEVELS[RATING['Musical variability'] - 1]
x   = TRIPLE[RATING['Relational stance']]
band = 'high' if tau > BAND_SWITCH else 'low'
print(f'  The state that carries them:')
print(f'    trauma, from session intensity {RATING["Session intensity"]} of 5   tau = {tau:.3f}')
print(f'    entropy, from musical variability {RATING["Musical variability"]} of 5  H   = {H:.3f}')
print(f'    the register triple, from Partner        (R, S, I) = '
      f'({x[0]:.4f}, {x[1]:.4f}, {x[2]:.4f})')
print(f'    arousal and valence are carried to the session record')
print()

# dynamics
DYN_NAMES = ('ppp', 'pp', 'p', 'mp', 'mf', 'f', 'ff', 'fff')
def dynamics(t):
    for idx, bd in enumerate(DYN_B):
        if t < bd:
            return idx, DYN_NAMES[idx]
    return 7, DYN_NAMES[7]
d_idx, d_name = dynamics(tau)
velocity = int(20 + 107 * tau)

# tempo and metre
def tempo(h):
    if h <= 0.4:
        lo, hi, nm = 40, 60, 'strategic'
    elif h <= 0.7:
        lo, hi, nm = 80, 100, 'operational'
    else:
        lo, hi, nm = 120, 180, 'crisis'
    return round(lo + h * (hi - lo)), nm
bpm, tempo_band = tempo(H)
def metre(h):
    if h < 0.3:
        return '4/4'
    if h <= 0.5:
        return '3/4'
    if h < 0.6:
        return '4/4'
    if h <= 0.8:
        return 'irregular, 5/4 or 7/8'
    return 'free'
metre_sig = metre(H)

# the two ladders
density = 0.3 * H + 0.7 * tau
fragmentation = max(0.0, 0.7 * H - 0.3 * tau) / 0.7
def stage(v):
    return sum(1 for bd in LADDER if v >= bd) + 1
dens_stage, frag_stage = stage(density), stage(fragmentation)

# mode
blend = blended_scale(x, 0.05, band)
notated = notate(blend, 'half to even')
div = divergence_cents(blend, 'half to even')

# harmonic position, on the absolute form at k_max = 23
TRIADS = [(r, m) for m in (0, 1) for r in range(12)]
def P(t): r, m = t; return (r, 1 - m)
def L(t): r, m = t; return ((r + 4) % 12, 1) if m == 0 else ((r + 8) % 12, 0)
def R_(t): r, m = t; return ((r + 9) % 12, 1) if m == 0 else ((r + 3) % 12, 0)
cyc = [(0, 0)]
cur = (0, 0)
for i in range(23):
    cur = L(cur) if i % 2 == 0 else R_(cur)
    cyc.append(cur)
check('the LR alternation visits all 24 triads exactly once', len(set(cyc)) == 24)
PCN = ('C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B')
def triad_name(t):
    return f'{PCN[t[0]]} {"major" if t[1] == 0 else "minor"}'
K_MAX = 23
pos = round(K_MAX * tau)
chord = cyc[pos % 24]

# timbre, the two-node case
def audible_fraction(p, q):
    d = [pi - qi for pi, qi in zip(p, q)]
    ln = math.sqrt(sum(v * v for v in d))
    if ln == 0:
        return 0.0
    mag = sum(d) / 2.0                    # the component along the deaf direction
    return math.sqrt(max(0.0, ln * ln - mag * mag)) / ln
CLIENT = (1.0, 1.0, 0.0, 0.0)
VOICE  = (0.0, 0.0, 1.0, 1.0)
af = audible_fraction(CLIENT, VOICE)
af_flat = audible_fraction((0.2, 0.4, 0.6, 0.8), (0.45, 0.65, 0.85, 1.05))

print('  What the instrument renders:')
print(f'    dynamic marking        {d_name}, the {d_idx + 1} of 8, velocity {velocity}')
print(f'    tempo                  {bpm} bpm, the {tempo_band} band')
print(f'    metre                  {metre_sig}')
print(f'    orchestration density  stage {dens_stage} of 5, from a density of {density:.4f}')
print(f'    fragmentation          stage {frag_stage} of 5, from {fragmentation:.4f}')
print(f'    the band of the table  {band}, because trauma is {"above" if band == "high" else "at or below"} {BAND_SWITCH}')
print(f'    mode, printed          {notated}  {name_of(notated)}')
print(f'    mode, sounded          ' + ', '.join(f'{v:.4f}' for v in blend))
print(f'    the two disagree by    {div:.2f} cents at most')
print(f'    harmonic position      {pos} of 23 along the chain, {triad_name(chord)}')
print(f'    timbre, the two voices audible fraction {af:.4f}')
print()
print('  The harmonic position is round(23 * f(state)) on the absolute form that')
print('  MPN-S3 section 2.5 establishes; the reading used here takes f as trauma,')
print('  and naming f is the next step recorded in this paper\'s further work.')
print()

check('the dynamic marking is one of the eight', d_name in DYN_NAMES)
check('the tempo is one of the 35 reachable integer tempi',
      bpm in {round(lo + (k / 10000) * (hi - lo))
              for lo, hi, a_, b_ in ((40, 60, 0, 0.4), (80, 100, 0.4, 0.7), (120, 180, 0.7, 1.0))
              for k in range(int(a_ * 10000) + 1, int(b_ * 10000) + 1)},
      f'{bpm} bpm')
check('both ladders land inside their five stages',
      1 <= dens_stage <= 5 and 1 <= frag_stage <= 5)
check('the printed mode is one of the seven', name_of(notated) != 'a scale outside the seven',
      name_of(notated))
check('the harmonic position is inside the chain', 0 <= pos <= 23)
check('the two voices of the two-node case are fully audible through timbre',
      abs(af - 1.0) < 1e-12)
check('a pair differing by a constant on all four coordinates is deaf in timbre',
      abs(af_flat) < 1e-12)

# determinism
def render():
    t2 = LEVELS[RATING['Session intensity'] - 1]
    h2 = LEVELS[RATING['Musical variability'] - 1]
    b2 = 'high' if t2 > BAND_SWITCH else 'low'
    return (dynamics(t2), tempo(h2), metre(h2),
            tuple(notate(blended_scale(TRIPLE[RATING['Relational stance']], 0.05, b2),
                         'half to even')),
            round(K_MAX * t2))
check('the same five ratings render the same music on every run',
      len({render() for _ in range(64)}) == 1)

# what the five stances render, side by side
print('  The same session with the stance changed and nothing else, which is the')
print('  comparison a therapist makes:')
print()
print('  stance     | printed mode          | sounded, first three degrees | divergence')
print('  -----------|-----------------------|------------------------------|-----------')
for n in NAMES:
    bl = blended_scale(TRIPLE[n], 0.05, band)
    nt = notate(bl, 'half to even')
    print(f'  {n:<10} | {name_of(nt):<21} | ' +
          ', '.join(f'{v:6.3f}' for v in bl[:3]) +
          f'         | {divergence_cents(bl, "half to even"):6.2f}c')
print()

# ===========================================================================
head('INVARIANTS')
print(f'  assertions run: {len(RUN)}; failed: {len(FAILURES)}')
if FAILURES:
    for f in FAILURES:
        print(f'    FAILED: {f}')
    sys.exit(1)
print('  every assertion passed')
sys.exit(0)
