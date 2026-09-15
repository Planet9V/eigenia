#!/usr/bin/env python3
"""
The two blocking numbers that are not settled by listening: the rounding rule
and k_max.

Three numbers gate four documents. Delta, the interpolation margin, is settled
by ear and the listening pack is built for it. The other two are settled by
argument, and an argument about a system should be made against the system's
own arithmetic rather than against taste. This script supplies the arithmetic.

  Part 1  The rounding rule. What rounding the interpolated mode to a semitone
          actually costs, measured over the simplex rather than bounded from
          above. The question is not the worst case, which S3 already gives as
          a quarter tone. It is whether rounding leaves anything of the
          interpolation at all.

  Part 2  k_max. S3 section 2.5 establishes the defensible range and the defect
          that chain position and Cayley distance do not rise together. What is
          added here is the one question S3 leaves open in a sentence and does
          not compute: whether the harmonic parameter can be re-expressed as a
          function of the current state alone, as the other five are, and what
          value of k_max that costs.

Nothing here is measured on any person. Every figure is a property of the maps
S2 and S3 state.
"""
import itertools
import math

def rule(n=78):
    print('=' * n)

# ===========================================================================
# PART 1. THE ROUNDING RULE
# ===========================================================================
rule(); print('PART 1. THE ROUNDING RULE'); rule()

MODES = {
    'Ionian':     (0, 2, 4, 5, 7, 9, 11),
    'Dorian':     (0, 2, 3, 5, 7, 9, 10),
    'Phrygian':   (0, 1, 3, 5, 7, 8, 10),
    'Lydian':     (0, 2, 4, 6, 7, 9, 11),
    'Mixolydian': (0, 2, 4, 5, 7, 9, 10),
    'Aeolian':    (0, 2, 3, 5, 7, 8, 10),
    'Locrian':    (0, 1, 3, 5, 6, 8, 10),
}
# The live pitch table of S3 section 2.3, which is the one the pitches use.
LIVE = {'low':  {'R': 'Dorian',  'S': 'Lydian',      'I': 'Phrygian'},
        'high': {'R': 'Aeolian', 'S': 'Mixolydian',  'I': 'Locrian'}}
ORDER = ('R', 'S', 'I')

def weights(x, delta):
    """S3 decision D3 option (c): w_k = max(0, 1 - (m - x_k)/delta), normalised."""
    m = max(x)
    w = [max(0.0, 1.0 - (m - xk) / delta) for xk in x]
    s = sum(w)
    return [wi / s for wi in w]

def blended_scale(x, delta, band):
    w = weights(x, delta)
    tbl = LIVE[band]
    return [sum(w[k] * MODES[tbl[ORDER[k]]][d] for k in range(3)) for d in range(7)]

def argmax_scale(x, band):
    # stable sort, Real over Symbolic over Imaginary on a tie, per S3
    k = max(range(3), key=lambda i: (x[i], -i))
    return list(MODES[LIVE[band][ORDER[k]]]), ORDER[k]

# Grid over the simplex.
N = 200
pts = []
for i in range(N + 1):
    for j in range(N + 1 - i):
        k = N - i - j
        pts.append((i / N, j / N, k / N))
print(f'  simplex grid: {len(pts):,} points at a step of 1/{N}')
print('  live pitch table, trauma at or below 0.6 so the modes are')
print(f'  Real {LIVE["low"]["R"]}, Symbolic {LIVE["low"]["S"]}, '
      f'Imaginary {LIVE["low"]["I"]}')
print()

print('  delta | in margin | rounding moves | rounded differs | mean |err| | max |err|')
print('        |           | a degree       | from argmax     | in cents  | in cents')
print('  ------|-----------|----------------|-----------------|-----------|----------')
ROWS = {}
for delta in (0.02, 0.05, 0.10, 0.15, 0.20, 0.30):
    in_margin = 0
    round_moves = 0          # rounding changes at least one degree from the blend
    differs = 0              # rounded blend differs from the pure argmax scale
    errs = []
    for x in pts:
        w = weights(x, delta)
        if sum(1 for wi in w if wi > 1e-12) == 1:
            continue                      # outside the margin: blend is argmax
        in_margin += 1
        blend = blended_scale(x, delta, 'low')
        amax, _ = argmax_scale(x, 'low')
        rounded = [round(b) for b in blend]
        e = [abs(b - r) * 100 for b, r in zip(blend, rounded)]
        errs.append(max(e))
        if any(abs(b - r) > 1e-9 for b, r in zip(blend, rounded)):
            round_moves += 1
        if rounded != amax:
            differs += 1
    frac = in_margin / len(pts)
    ROWS[delta] = (frac, differs / max(1, in_margin), sum(errs)/max(1,len(errs)))
    print(f'  {delta:5.2f} |  {frac:7.2%}  |    {round_moves/max(1,in_margin):7.2%}     '
          f'|     {differs/max(1,in_margin):7.2%}     |  {sum(errs)/max(1,len(errs)):7.2f}  '
          f'|  {max(errs) if errs else 0:6.2f}')
print()
print('  THE COLUMN THAT DECIDES IT is the fourth. It is the share of points')
print('  inside the margin where the ROUNDED blend is a different scale from')
print('  the one argmax would have chosen. Where it is zero, rounding has')
print('  snapped every blended degree back onto the winning mode and the')
print('  interpolation has bought nothing that reaches a notated pitch.')
print()

print('  Multiply the first column by the fourth and the finding is plain:')
for d in (0.05, 0.20):
    frac, diff, _ = ROWS[d]
    print(f'    delta {d:.2f}: rounding leaves a scale different from argmax on '
          f'{frac*diff:.2%} of the whole simplex')
print('  So rounding inside Phi snaps the blend back onto the winning mode')
print('  almost everywhere. The interpolation S3 chose over hysteresis and a')
print('  dead band survives into a notated pitch on under one per cent of')
print('  states at delta = 0.05. Rounding does not degrade the interpolation.')
print('  It very nearly deletes it.')
print()
print('  AND THE TIE IS EXACTLY WHERE THE ROUNDING CONVENTION DECIDES THE')
print('  SCALE. At a two-way tie the weights are 0.5 and 0.5, so every degree')
print('  on which the two modes differ by one semitone lands on a half. Take')
print('  the Real and Symbolic tie on the live table, Dorian against Lydian:')
_d, _l = MODES['Dorian'], MODES['Lydian']
_b = [(a + b) / 2 for a, b in zip(_d, _l)]
_half_up = [math.floor(v + 0.5) for v in _b]
_bankers = [round(v) for v in _b]
_nm = lambda v: ([n for n, m in MODES.items() if list(m) == v] or ['not one of the seven'])[0]
print(f'    Dorian            {list(_d)}')
print(f'    Lydian            {list(_l)}')
print(f'    blend at the tie  {_b}')
print(f'    round half up     {_half_up}  -> {_nm(_half_up)}')
print(f'    bankers rounding  {_bankers}  -> {_nm(_bankers)}')
print('  One convention returns one of the two inputs; the other returns a')
print('  scale that is neither. The round built in to Python is the second.')
print('  This is not a detail to leave to a language. Whichever rule is')
print('  adopted decides the scale at precisely the states interpolation was')
print('  chosen for, and it has to be written down.')
print()

# The theoretical check: the kite area S2 gives for the margin.
print('  cross-check against S2\'s closed form for the margin area, 2d - d^2:')
for delta in (0.05, 0.20):
    kite = 2 * delta - delta ** 2
    print(f'    delta {delta:.2f}: measured {ROWS[delta][0]:.4f}, closed form {kite:.4f}, '
          f'difference {abs(ROWS[delta][0]-kite):.4f}')
print('  The grid and the closed form agree, so the margin is being computed')
print('  the way S2 and S3 describe it and the rest of the table can be read.')
print()
print('  THE RECOMMENDATION FOLLOWS FROM THE TABLE AND FROM ONE PRECEDENT.')
print('  S3 section 2.1 already settles the same question for dynamics: "The')
print('  output of Phi is the marking, not the velocity: the velocity interval')
print('  is the pre-image." Do the same here. Phi emits the blended degree as a')
print('  continuous value in cents; the NOTATED pitch is its rounded pre-image,')
print('  a rendering property of the notation path and not a property of the')
print('  mapping. Then:')
print('    - the jump set of the mode parameter stays the single surface')
print('      tau = 0.6 and nothing on the simplex, which is what S3 proves and')
print('      what rounding inside Phi would destroy;')
print('    - the audio path carries the exact value through pitch bend, so the')
print('      delta experiment runs on a synthesiser that takes cents and needs')
print('      no microtonal notation renderer, which S3 says does not exist;')
print('    - the rounding rule stops being a blocking number for the THEORY and')
print('      becomes a setting on one renderer;')
print('    - and the cost is bounded and stated: notation and audio disagree by')
print('      at most a quarter tone, only inside the margin, on the share of')
print('      the simplex the first column gives.')

# ===========================================================================
# PART 2. K_MAX
# ===========================================================================
print()
rule(); print('PART 2. K_MAX, AND WHETHER THE HARMONIC PARAMETER CAN REJOIN A11'); rule()

# --- the 24 consonant triads and the PLR generators -------------------------
# a triad is (root pitch class, 0 for major / 1 for minor)
TRIADS = [(r, m) for m in (0, 1) for r in range(12)]
IDX = {t: i for i, t in enumerate(TRIADS)}

def P(t):
    r, m = t
    return (r, 1 - m)

def L(t):
    r, m = t
    # major C -> E minor (root + 4, minor); minor -> major a major third below
    return ((r + 4) % 12, 1) if m == 0 else ((r + 8) % 12, 0)

def R(t):
    r, m = t
    # major C -> A minor (root + 9, minor); minor A -> C major
    return ((r + 9) % 12, 1) if m == 0 else ((r + 3) % 12, 0)

GENS = (('P', P), ('L', L), ('R', R))

# involutions, fixed-point free, transitive
ok_inv = all(g(g(t)) == t for _, g in GENS for t in TRIADS)
ok_fix = all(g(t) != t for _, g in GENS for t in TRIADS)
print(f'  generators are involutions: {ok_inv}; fixed-point free: {ok_fix}')

# BFS distances
import collections
DIST = {}
for s in TRIADS:
    d = {s: 0}; q = collections.deque([s])
    while q:
        u = q.popleft()
        for _, g in GENS:
            v = g(u)
            if v not in d:
                d[v] = d[u] + 1; q.append(v)
    DIST[s] = d
transitive = all(len(DIST[s]) == 24 for s in TRIADS)
diam = max(d for s in TRIADS for d in DIST[s].values())
dist_hist = collections.Counter(d for s in TRIADS for d in DIST[s].values())
print(f'  action transitive: {transitive}; Cayley diameter: {diam}')
print(f'  distance distribution over all 576 ordered pairs: '
      f'{[dist_hist[i] for i in range(diam+1)]}')
print('  S3 section 2.5 gives 24, 72, 144, 192, 120, 24. Reproduced above, so')
print('  the graph this script reasons on is the graph S3 reasons on.')

# --- the LR Hamiltonian cycle ----------------------------------------------
cyc = [(0, 0)]                     # C major
cur = (0, 0)
for i in range(23):
    cur = L(cur) if i % 2 == 0 else R(cur)
    cyc.append(cur)
ham = len(set(cyc)) == 24 and (R(cyc[-1]) == cyc[0] or L(cyc[-1]) == cyc[0])
POS = {t: i for i, t in enumerate(cyc)}
print(f'  the LR alternation visits all 24 triads exactly once and closes: {ham}')

# --- the question S3 leaves open -------------------------------------------
print()
print('  S3 records that the harmonic parameter is a function on P x P and on')
print('  the chord already sounding, which is exactly the dependency it uses to')
print('  rule out hysteresis and a dead band for the mode selector, and that it')
print('  has the first-frame problem too. It then asks, in one sentence and')
print('  without computing it, whether the parameter can be re-expressed as a')
print('  function of the current state alone. It can, and the computation says')
print('  at what value of k_max.')
print()
print('  ABSOLUTE form: position = round(k_max * f(state)) around the LR cycle,')
print('  from a fixed origin. A function on P alone. No previous chord, no')
print('  previous state, no first frame problem, A11 intact.')
print('  RELATIVE form: the shipped proposal. A change of size d moves the')
print('  chord round(k_max * d) positions from wherever it is.')
print()
print('  The two agree on the SIZE of every move by construction. Where they')
print('  part company is REACH, and reach is computable:')
print()
print('   k_max | chords the absolute form can ever visit | of 24 | full cycle')
print('  -------|-----------------------------------------|-------|-----------')
for k in (1, 4, 5, 10, 11, 12, 13, 16, 20, 22, 23, 24):
    reach = len({round(k * (i / 2000.0)) % 24 for i in range(2001)})
    print(f'   {k:5d} |                 {reach:3d}                     | '
          f'{reach/24:5.1%} | {"yes" if reach == 24 else "no"}')
print()
print('  The relative form reaches all 24 by accumulating moves whatever k_max')
print('  is. The absolute form reaches min(k_max + 1, 24). So the two')
print('  formulations have the same codomain at exactly one value, k_max = 23,')
print('  and at 24 and above the absolute form wraps, which is the artefact S3')
print('  already rules out.')
print()

# --- what a full sweep costs in the metric, at each k_max -------------------
print('  And the value has to clear S3\'s own constraint, which is about the')
print('  metric rather than the cycle: how far along the Cayley graph a full')
print('  trauma sweep can carry a character, from every starting triad.')
print()
print('   k_max | greatest Cayley distance a full sweep reaches | from how many')
print('         | (worst starting triad)                       | triads is the')
print('         |                                              | antipode reached')
print('  -------|----------------------------------------------|---------------')
for k in (5, 10, 11, 12, 13, 16, 20, 23):
    worst = 99; anti = 0
    for s in TRIADS:
        best = 0
        for step in range(k + 1):
            tgt = cyc[(POS[s] + step) % 24]
            best = max(best, DIST[s][tgt])
        worst = min(worst, best)
        if best == diam:
            anti += 1
    print(f'   {k:5d} |                     {worst:1d}                        |'
          f'      {anti:2d} of 24')
print()
print('  Reproduces S3 section 2.5: nothing below 11 reaches the diameter from')
print('  any triad, nothing below 13 reaches it from every triad, and the')
print('  defensible range is 13 to 23.')
print()
print('  THE RECOMMENDATION. k_max = 23, and with it the absolute form.')
print('  Three independent reasons, none of them a taste judgement:')
print('    1. It is the only value at which the state-only formulation has the')
print('       same reachable set as the change-based one, so adopting it is')
print('       what lets the harmonic parameter be re-expressed as a function of')
print('       the current state. That restores A11 decomposability for the one')
print('       parameter of the six that lacks it, and removes the first-frame')
print('       problem, which in therapy is the opening of every session.')
print('    2. It is at the top of S3\'s own defensible range, so a destroyed')
print('       character can arrive at the far side of the harmonic space from')
print('       every starting triad rather than from half of them.')
print('    3. It is the largest value that stays injective. At 24 the map wraps')
print('       by an artefact of the modulus.')
print()
print('  WHAT IT DOES NOT FIX, and the estimate is worth nothing if this is')
print('  not said with it. S3 finds that chain position and Cayley distance do')
print('  not rise together, so a larger change in trauma can produce a smaller')
print('  harmonic move. k_max = 23 does not repair that and makes the worst')
print('  case plainest: at a sweep of 23 positions the character ends ONE')
print('  generator from where they started.')
worst_pairs = [(d, POS_OFF) for POS_OFF in range(1, 24)
               for d in [DIST[(0,0)][cyc[POS_OFF]]]]
print()
print('   positions moved along the chain | Cayley distance, from C major')
print('  ---------------------------------|-------------------------------')
for off in range(1, 24):
    print(f'   {off:3d}                             |   {DIST[(0,0)][cyc[off]]}')
print()
print('  Read that column downward. It is not monotone and it is not close to')
print('  monotone. Choosing k_max does not decide whether the harmonic move')
print('  carries a magnitude or an index, which is S3\'s open repair and stays')
print('  the author\'s. What k_max = 23 does is make the parameter a function of')
print('  the state, which is the thing A11 needs and the thing no other value')
print('  delivers.')
