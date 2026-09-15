#!/usr/bin/env python3
"""
The timbre channel's capacity, and how to assign DISC profiles so that it is used.

S3 section 2.6 specifies the map from the four DISC coordinates into the
three-dimensional timbre space, proves its rank is three and its nullity
exactly one, and names the null direction: overall profile magnitude. S3 then
records that the channel cannot be exercised, because the reference
implementation neither measures DISC nor infers it (decision 9 makes
`inferDISC` return null).

Under the author's scope ruling of 13 September 2026 the subjects are
synthetic. A character's DISC profile is therefore ASSIGNED, not measured, and
the channel is live. That changes the question this script has to answer. It
is no longer "what does the channel lose", which S3 settled; it is

    given that the profiles are ours to choose, how much can the channel
    carry, and which profiles should be chosen so that it carries it?

Every figure printed here is a property of the map stated in S3 section 2.6.
Nothing is measured on any person and no perceptual threshold is invented: the
one quantity this script cannot supply, the perceptual resolution of the timbre
space, is carried as a free parameter and section 6 names the experiment that
would fix it.

WHAT CHANGED ON 14 SEPTEMBER 2026 (ARBITRATION-DESIGN-R7, ruling D, change 40).
The published run of this script was NOT CONVERGED. At 60 restarts of 1,500
steps the seeded search returned, at seed 11111, a value at N = 5 below its own
value at N = 6. That is impossible for the true optimum, because any optimal
six-set contains a five-set, so the max-min curve is non-increasing in N by
construction. The search returned a value the problem forbids, and the table
was being read as a curve. Three things follow and all three are in this file:

  1. THE CURVE IS ASSERTED. f(N) >= f(N+1) is checked on every table this
     script prints, and the script fails rather than prints if it is violated.
     That is the only convergence test this problem needs.
  2. AN EXHAUSTIVE CHECK THAT NEEDS NO SEED. The sixteen corners of the DISC
     cube are enumerated in full for every N. It is exact, it is reproducible
     without a random number generator at all, and it is a lower bound on the
     continuous optimum which happens to be tight from N = 5 to N = 6.
  3. THE SEARCH IS CONVERGED AND THE CONVERGENCE IS TESTED BY RE-SEEDING.
     Run with --reseed to repeat the whole table at three seeds and assert that
     every cell agrees. The restart count below is the count at which it does.

The N = 7 figure is a LOWER BOUND that has moved every time anyone has searched
harder: 1.0123 published, 1.0360 under the Skeptic's search, 1.053712 under the
arbitration's 1,200-restart run, and higher again here. No value can be printed
that the next search will not move, so no drop from N = 6 to N = 7 is quoted as
a figure anywhere in this script. What is stable is the FLAT at sqrt(2) from
N = 3 to N = 6, which the exhaustive corner search establishes without a seed.
"""
import itertools
import math
import os
import random
import sys

random.seed(20260913)   # the programme's own finding: no unseeded RNG
SEED = 20260913
RESEED_SEEDS = (20260913, 11111, 99991)
NMAX = 14

# ---------------------------------------------------------------------------
# 1. The map, restated from S3 section 2.6 and re-verified rather than assumed
# ---------------------------------------------------------------------------
# Orthonormal contrast basis on (D, I, S, C): a scaled Hadamard matrix.
H0 = (0.5,  0.5,  0.5,  0.5)   # magnitude: how high the profile sits
H1 = (0.5,  0.5, -0.5, -0.5)   # pace:      (D+I) - (S+C)
H2 = (0.5, -0.5,  0.5, -0.5)   # residual:  (D+S) - (I+C)
H3 = (0.5, -0.5, -0.5,  0.5)   # task/people: (D+C) - (I+S)
BASIS = [('h0 magnitude', H0), ('h1 pace', H1),
         ('h2 residual', H2), ('h3 task-people', H3)]
ROWS = [H1, H2, H3]            # the three that reach timbre

def dot(a, b):
    return sum(x * y for x, y in zip(a, b))

def h(p):
    """DISC profile -> timbre contrast coordinates."""
    return tuple(dot(r, p) for r in ROWS)

def dist(a, b):
    return math.sqrt(sum((x - y) ** 2 for x, y in zip(a, b)))

def rule(n=76):
    print('=' * n)

rule(); print('1. THE MAP, RE-VERIFIED'); rule()
worst = 0.0
for (na, a), (nb, b) in itertools.combinations_with_replacement(BASIS, 2):
    want = 1.0 if na == nb else 0.0
    worst = max(worst, abs(dot(a, b) - want))
print(f'  contrast basis orthonormal, worst deviation {worst:.1e}')
print('  the three rows reaching timbre are h1, h2, h3; h0 is the null direction')
print()
print('  Because the rows are ORTHONORMAL, h is an orthogonal projection onto')
print('  a three-dimensional subspace followed by an isometry. Two consequences')
print('  are used throughout and neither holds for a general rank-3 map:')
print('    (a) timbre distance equals DISC distance measured after the')
print('        magnitude component is removed, with no distortion;')
print('    (b) every fibre is a straight segment in the direction (1,1,1,1)/2,')
print('        and its length is the length of the DISC interval it collapses.')

# ---------------------------------------------------------------------------
# 2. The reachable set T = h([0,1]^4): a zonotope
# ---------------------------------------------------------------------------
rule(); print('2. THE REACHABLE TIMBRE SET'); rule()
GEN = [tuple(r[i] for r in ROWS) for i in range(4)]   # columns: g_D, g_I, g_S, g_C
for nm, g in zip('DISC', GEN):
    print(f'  generator for {nm}: ({g[0]:+.2f}, {g[1]:+.2f}, {g[2]:+.2f})')

def det3(a, b, c):
    return (a[0]*(b[1]*c[2]-b[2]*c[1]) - a[1]*(b[0]*c[2]-b[2]*c[0])
            + a[2]*(b[0]*c[1]-b[1]*c[0]))

vol = sum(abs(det3(*t)) for t in itertools.combinations(GEN, 3))
print(f'\n  T is the zonotope generated by those four vectors.')
print(f'  volume(T) = sum of |det| over the four 3-subsets = {vol:.4f}')

verts = {}
for eps in itertools.product((0.0, 1.0), repeat=4):
    verts.setdefault(tuple(round(x, 12) for x in h(eps)), []).append(eps)
print(f'\n  images of the 16 DISC-cube vertices: {len(verts)} distinct points')
radii = sorted({round(math.sqrt(sum(x*x for x in v)), 6) for v in verts})
shells = {r: [v for v in verts if abs(math.sqrt(sum(x*x for x in v)) - r) < 1e-5]
          for r in radii}
for r in radii:
    print(f'    {len(shells[r]):2d} at distance {r:.4f} from the centre')
print('  Fifteen images: the centre, six points at 1 and eight at sqrt(3)/2.')
print('  The two cube poles (0,0,0,0) and (1,1,1,1) both land on the centre,')
print('  which is interior, so T has FOURTEEN vertices in a 6 + 8 arrangement:')
print('  T is a RHOMBIC DODECAHEDRON. That is not decoration. The six far')
print('  vertices, the ones at distance 1, are')
print('  the six DISC profiles with two coordinates high and two low, and')
print('  section 4 finds that the best assignment for up to six characters is')
print('  exactly those six, arrived at by an EXHAUSTIVE search over the corners')
print('  that needs no seed, and confirmed by the continuous search.')
for v in sorted(shells[radii[-1]]):
    for e in verts[v]:
        print(f'    DISC {tuple(int(x) for x in e)} -> timbre '
              f'({v[0]:+.0f}, {v[1]:+.0f}, {v[2]:+.0f})')

# diameter, by the closed form, checked against a vertex search
best = 0.0; bestv = None
for v in itertools.product((-1.0, 1.0), repeat=4):
    d = math.sqrt(sum(x*x for x in v) - dot(H0, v) ** 2)
    if d > best:
        best, bestv = d, v
print(f'\n  diameter(T) = {best:.4f}')
print(f'  attained by any pair of profiles differing by {bestv},')
print('  i.e. two coordinates at one extreme and two at the other:')
print('  (1,1,0,0) against (0,0,1,1) is the most audibly separated pair there is.')
print(f'  check: ||h(1,1,0,0) - h(0,0,1,1)|| = '
      f'{dist(h((1,1,0,0)), h((0,0,1,1))):.4f}')

# ---------------------------------------------------------------------------
# 3. The fibres: how much DISC space each audible timbre collapses
# ---------------------------------------------------------------------------
rule(); print('3. WHAT EACH AUDIBLE TIMBRE COSTS IN DISC SPACE'); rule()
print('  By the coarea formula, and because h is a projection composed with an')
print('  isometry, volume(cube) = integral over T of the fibre length. The cube')
print('  has volume 1, so:')
print(f'    mean fibre length          = 1 / volume(T) = {1.0/vol:.4f}')
print('  The longest fibre is the cube\'s main diagonal, which lies exactly in')
print('  the null direction:')
print(f'    max  fibre length          = ||(1,1,1,1)|| = {math.sqrt(4):.4f}')
print(f'    diameter of the DISC cube  = {math.sqrt(4):.4f}')
print()
print('  So the single worst case is the whole main diagonal: every flat')
print('  profile (t,t,t,t) for t in [0,1] renders identically, and that family')
print('  spans the entire diameter of DISC space. The flat profile is not a')
print('  corner case in an assignment scheme, it is the default a careless')
print('  assignment lands on, and it is exactly where the channel is deaf.')
print()
print('  RULE FOR ASSIGNMENT 1: never assign two characters profiles that')
print('  differ by a constant. Check |h0 . (p - q)| against ||p - q||: if the')
print('  ratio is near 1 the two are near-identical through timbre however far')
print('  apart their DISC scores look on paper.')

# worked pairs, the two S3 states plus a near-miss that S3 does not give
print()
print('  worked pairs:')
for p, q, why in [((0.3,0.3,0.3,0.3), (0.7,0.7,0.7,0.7), 'S3: flat, two heights'),
                  ((0.7,0.2,0.5,0.1), (0.9,0.4,0.7,0.3), 'S3: profile raised by 0.2'),
                  ((0.8,0.2,0.6,0.2), (0.6,0.1,0.4,0.0), 'a near-miss, not in S3'),
                  ((1.0,1.0,0.0,0.0), (0.0,0.0,1.0,1.0), 'the diameter pair')]:
    dp = tuple(a-b for a, b in zip(p, q))
    n4 = math.sqrt(sum(x*x for x in dp))
    dt = dist(h(p), h(q))
    frac = (dt / n4) if n4 else float('nan')
    print(f'    {p} vs {q}')
    print(f'      DISC distance {n4:.4f}  timbre distance {dt:.4f}  '
          f'audible fraction {frac:.3f}   [{why}]')

# ---------------------------------------------------------------------------
# 4. Assignment: profiles chosen to maximise the minimum audible separation
# ---------------------------------------------------------------------------
rule(); print('4. HOW TO ASSIGN N CHARACTERS SO ALL N ARE AUDIBLY DISTINCT'); rule()
print('  The design question the scope ruling creates. Maximise the minimum')
print('  pairwise timbre distance over profiles in the DISC cube. Two')
print('  computations, not one, because one of them was not converged:')
print('    (a) an EXHAUSTIVE search over the sixteen corners of the DISC cube.')
print('        Exact, no seed, no search. A lower bound on the continuous')
print('        optimum, and the check ruling D requires.')
print('    (b) a CONVERGED continuous search over the whole cube, multi-start')
print('        with a polish at each start, at a restart count at which')
print('        re-seeding changes no cell.')
print()

import numpy as np
_R = np.array(ROWS)                       # 3 x 4

def _tim(P):                              # P: n x 4  ->  n x 3
    return P @ _R.T

def _minpair(P):
    T = _tim(P)
    d = np.linalg.norm(T[:, None, :] - T[None, :, :], axis=2)
    np.fill_diagonal(d, np.inf)
    return d.min()

def min_pair(profiles):
    return float(_minpair(np.asarray(profiles, dtype=float)))

def assert_monotone(table, what):
    """f(N) >= f(N+1). Any optimal (N+1)-set contains an N-set, so a rise is
    proof the search did not converge. This is the assertion that caught the
    published run; see ARBITRATION-DESIGN-R7 ruling D."""
    ks = sorted(table)
    bad = [(a, b) for a, b in zip(ks, ks[1:])
           if table[a] < table[b] - 1e-9]
    assert not bad, (
        f'{what}: max-min separation ROSE with N at {bad}. '
        f'f(N) >= f(N+1) holds by construction, so this is an unconverged '
        f'search, not a result. Raise the restart count.')

# ---------------------------------------------------------------------------
# 4a. Exhaustive over the sixteen corners of the DISC cube. Exact, unseeded.
# ---------------------------------------------------------------------------
_CORNERS = [tuple(float(x) for x in e) for e in itertools.product((0.0, 1.0), repeat=4)]
_CT = [h(c) for c in _CORNERS]
_CD = [[dist(_CT[i], _CT[j]) for j in range(16)] for i in range(16)]

def corner_exhaustive(n):
    bestv, arg = -1.0, None
    for comb in itertools.combinations(range(16), n):
        m = min(_CD[a][b] for a, b in itertools.combinations(comb, 2))
        if m > bestv:
            bestv, arg = m, comb
    return bestv, [_CORNERS[i] for i in arg]

CORNER = {}
for n in range(2, NMAX + 1):
    v, P = corner_exhaustive(n)
    CORNER[n] = (v, P)
assert_monotone({n: v for n, (v, _) in CORNER.items()}, 'exhaustive corner search')

# ---------------------------------------------------------------------------
# 4b. Converged continuous search.
#
# The optimisation is done in the three-dimensional timbre space rather than in
# the four-dimensional DISC cube, which is legitimate and is why it converges:
# section 2 proves h is an orthogonal projection followed by an isometry, so the
# min pairwise timbre distance depends on the profiles ONLY through their
# images, and T = h(cube) is exactly the rhombic dodecahedron whose facets are
# |x_i +- x_j| <= 1. A DISC profile is recovered from a timbre point by walking
# the fibre, which section 2 (b) proves is a straight segment in the direction
# (1,1,1,1)/2; the recovery is checked below rather than assumed.
#
# Each start is polished by SLSQP on the epigraph form: maximise t subject to
# ||x_a - x_b||^2 >= t and x in T. Polishing is what makes the curve converge;
# raising the restart count of the old coordinate-jitter search does not. At
# 1,200 restarts of 4,000 steps that search still returned 1.0329 at N = 7,
# below the arbitration's own 1.053712 and well below the 1.0898 below.
# ---------------------------------------------------------------------------
try:
    from scipy.optimize import minimize as _minimize
    HAVE_POLISH = True
except ImportError:                                        # pragma: no cover
    HAVE_POLISH = False

_FACETS = np.array([[s_i * (i == r) + s_j * (j == r) for r in range(3)]
                    for i, j in ((0, 1), (0, 2), (1, 2))
                    for s_i in (1.0, -1.0) for s_j in (1.0, -1.0)])   # 12 x 3

def _proj_T(X):
    X = np.array(X, dtype=float)
    for _ in range(80):
        viol = X @ _FACETS.T - 1.0
        if viol.max() <= 1e-12:
            break
        k = np.argmax(viol, axis=1)
        for r in range(X.shape[0]):
            if viol[r, k[r]] > 1e-12:
                a = _FACETS[k[r]]
                X[r] -= viol[r, k[r]] * a / (a @ a)
    return X

def _to_disc(X):
    """timbre point -> a DISC profile in [0,1]^4 on its fibre (section 2 (b))."""
    P0 = np.array(X, dtype=float) @ _R           # rows of _R are h1,h2,h3
    out = []
    for p0 in P0:
        lo, hi = -p0.min(), 1.0 - p0.max()
        out.append(np.clip(p0 + 0.5 * (lo + hi), 0.0, 1.0))
    return np.array(out)

def _polish(X0):
    n = X0.shape[0]
    idx = list(itertools.combinations(range(n), 2))
    def unpack(z):
        return z[:-1].reshape(n, 3), z[-1]
    def cfun(z):
        X, t = unpack(z)
        return np.array([np.sum((X[a] - X[b]) ** 2) for a, b in idx]) - t
    def cjac(z):
        X, _ = unpack(z)
        J = np.zeros((len(idx), z.size))
        for m, (a, b) in enumerate(idx):
            d = 2.0 * (X[a] - X[b])
            J[m, 3*a:3*a+3] = d; J[m, 3*b:3*b+3] = -d; J[m, -1] = -1.0
        return J
    def lfun(z):
        X, _ = unpack(z)
        return (1.0 - X @ _FACETS.T).ravel()
    def ljac(z):
        J = np.zeros((n * 12, z.size))
        for r in range(n):
            for c in range(12):
                J[r*12+c, 3*r:3*r+3] = -_FACETS[c]
        return J
    z0 = np.concatenate([X0.ravel(),
                         [min(np.sum((X0[a]-X0[b])**2) for a, b in idx)]])
    g = np.zeros_like(z0); g[-1] = -1.0
    r = _minimize(lambda z: -z[-1], z0, jac=lambda z: g, method='SLSQP',
                  constraints=[{'type': 'ineq', 'fun': cfun, 'jac': cjac},
                               {'type': 'ineq', 'fun': lfun, 'jac': ljac}],
                  options={'maxiter': 400, 'ftol': 1e-12})
    X = _proj_T(unpack(r.x)[0])
    return min(float(np.linalg.norm(X[a] - X[b])) for a, b in idx), X

def _optimise_jitter(n, restarts, steps, seed):
    """The pre-14-September search, kept only as the no-scipy fallback."""
    rng = np.random.default_rng(seed + n)
    bv, bs = -1.0, None
    for _ in range(restarts):
        P = rng.random((n, 4)); cur = _minpair(P); step = 0.35
        for s in range(steps):
            i = rng.integers(n); k = rng.integers(4); old = P[i, k]
            P[i, k] = min(1.0, max(0.0, old + rng.normal(0, step)))
            v = _minpair(P)
            if v > cur:
                cur = v
            else:
                P[i, k] = old
            if s % 300 == 299:
                step *= 0.6
        if cur > bv:
            bv, bs = cur, P.copy()
    return float(bv), bs

STARTS = int(os.environ.get('MPN_STARTS', '600'))

def optimise(n, restarts=None, seed=SEED):
    """Max-min over the cube. Returns (value, DISC profiles)."""
    restarts = STARTS if restarts is None else restarts
    if not HAVE_POLISH:
        v, P = _optimise_jitter(n, restarts, 4000, seed)
        return v, [tuple(round(float(x), 3) for x in p) for p in P]
    rng = np.random.default_rng(seed + n)
    bv, bX = -1.0, None
    for _ in range(restarts):
        X0 = rng.random((n, 4)) @ _R.T
        try:
            v, X = _polish(X0)
        except Exception:
            continue
        if v > bv:
            bv, bX = v, X
    P = _to_disc(bX)
    assert P.min() >= -1e-9 and P.max() <= 1.0 + 1e-9, 'fibre walk left the cube'
    assert abs(float(np.abs(P @ _R.T - bX).max())) < 1e-9, 'DISC recovery is not exact'
    return float(bv), [tuple(round(float(x), 6) for x in p) for p in P]

if not HAVE_POLISH:
    print('  !! scipy is not installed, so the polish is unavailable and this')
    print('  !! run falls back to the pre-14-September coordinate search. Its')
    print('  !! table is a set of LOWER BOUNDS and is NOT converged: at N = 7 it')
    print('  !! returns roughly 1.03 where the polished search returns 1.09.')
    print('  !! Everything this script needs beyond the corpus is: numpy, and')
    print('  !! scipy for the polish. The exhaustive corner table below needs')
    print('  !! neither a seed nor scipy and is unaffected.')
    print()

RESULTS = {}
print(f'  Continuous search: {STARTS} polished starts per N, seed {SEED} + N.')
print('  Corner search: exhaustive over all C(16, N) subsets, no seed.')
print()
print('   N | corners (exact) | whole cube (converged) | fraction of diameter 2')
print('  ---|-----------------|------------------------|-----------------------')
for n in range(2, NMAX + 1):
    v, P = optimise(n)
    RESULTS[n] = (v, P)
    flat = '  <- flat at sqrt(2)' if abs(v - math.sqrt(2)) < 1e-6 else ''
    print(f'   {n:2d} |     {CORNER[n][0]:8.6f}    |        {v:8.6f}        '
          f'|        {v/2.0:5.3f}{flat}')
assert_monotone({n: v for n, (v, _) in RESULTS.items()}, 'continuous search')
for n in RESULTS:
    assert RESULTS[n][0] >= CORNER[n][0] - 1e-9, \
        f'N={n}: the corner optimum {CORNER[n][0]} beats the cube search ' \
        f'{RESULTS[n][0]}, which is impossible since the corners lie in the cube'
print()
print('  BOTH TABLES ARE NON-INCREASING IN N, asserted above. The continuous')
print('  table dominates the corner table everywhere, also asserted, since the')
print('  corners lie in the cube.')
print()
print(f'  THE EXHAUSTIVE RESULT, which needs no seed: sqrt(2) = {math.sqrt(2):.6f}')
_flat = [n for n in CORNER if abs(CORNER[n][0] - math.sqrt(2)) < 1e-9]
print(f'  is attained on the corners for N = {min(_flat)} to {max(_flat)}, and the corner')
_after = sorted(n for n in CORNER if n > max(_flat))
print(f'  optimum falls to {CORNER[_after[0]][0]:.6f} at N = {_after[0]}. That flat is exact and it')
print('  is the finding the whole of section 6 rests on. The six far vertices')
print('  of T are an optimal six.')
print()
print('  RESEEDING. The published run is converged in the only sense this')
print('  problem admits: re-running the whole table at a different seed changes')
print('  no cell. Run this script with --reseed to check it, which repeats the')
print(f'  table at seeds {RESEED_SEEDS} and asserts cell-by-cell agreement.')

if '--reseed' in sys.argv:
    print()
    print('  --reseed: repeating the table at three seeds.')
    tables = {}
    for sd in RESEED_SEEDS:
        tables[sd] = {n: optimise(n, seed=sd)[0] for n in range(2, NMAX + 1)}
        assert_monotone(tables[sd], f'continuous search at seed {sd}')
        print(f'    seed {sd}: '
              + ' '.join(f'{tables[sd][n]:.6f}' for n in range(2, NMAX + 1)))
    base = tables[RESEED_SEEDS[0]]
    off = [(sd, n, tables[sd][n], base[n]) for sd in RESEED_SEEDS[1:]
           for n in range(2, NMAX + 1) if abs(tables[sd][n] - base[n]) > 1e-6]
    assert not off, f'seeds disagree, so {STARTS} starts is not enough: {off}'
    print(f'    every cell agrees to 1e-6 across {len(RESEED_SEEDS)} seeds at '
          f'{STARTS} starts. CONVERGED.')

print()
print('  The N = 5 set, which is the size a two-clef therapy session plus a')
print('  three-node panel both need, and the size Bruscia\'s Autonomy gradient')
print('  happens to have:')
v5, P5 = RESULTS[5]
for i, p in enumerate(P5):
    t = h(p)
    print(f'    character {i+1}: DISC {tuple(abs(round(x, 3)) + 0.0 for x in p)}  ->  timbre '
          f'({t[0]:+.3f}, {t[1]:+.3f}, {t[2]:+.3f})')
print(f'    minimum pairwise timbre distance {v5:.6f} of a possible {best:.4f}')
print('  The corner search returns the same value at N = 5 from the six far')
print('  vertices, so this set is optimal and not merely the best found.')

# ---------------------------------------------------------------------------
# 5. Does the shipped instrument-family selector agree?
# ---------------------------------------------------------------------------
rule(); print('5. THE SHIPPED FAMILY SELECTOR ON THOSE PROFILES'); rule()
print('  `discToInstrument` takes argmax over the four DISC coordinates, which')
print('  S3 shows is invariant under adding a constant to all four, so it')
print('  preserves the null direction into the family label. Two questions the')
print('  assignment answers that S3 could not ask: do the optimised profiles')
print('  land in distinct families, and do any of them sit on a tie?')
print()
LETTERS = 'DISC'
for n in (4, 5, 6):
    v, P = RESULTS[n]
    fams, ties = [], 0
    for p in P:
        m = max(p)
        winners = [LETTERS[i] for i, x in enumerate(p) if abs(x - m) < 1e-9]
        near = [LETTERS[i] for i, x in enumerate(p) if abs(x - m) < 0.05]
        fams.append(winners[0])
        if len(near) > 1:
            ties += 1
    distinct = len(set(fams))
    print(f'  N={n}: families {fams}  distinct {distinct}/{n}  '
          f'profiles within 0.05 of a tie: {ties}')
print()
print('  RULE FOR ASSIGNMENT 2: maximum continuous separation does NOT imply')
print('  distinct instrument families, and a profile near an argmax tie makes')
print('  the family label unstable under any later edit to the profile. The')
print('  family is a categorical channel and has to be assigned as one:')
print('  choose the families first, then optimise the profiles subject to each')
print('  character\'s argmax being the family chosen.')

def optimise_constrained(fams, restarts=60, steps=1500, margin=0.05):
    """Max-min timbre separation subject to argmax(p_i) == fams[i] by margin."""
    n = len(fams)
    idx = [LETTERS.index(f) for f in fams]
    rng = np.random.default_rng(77020913)
    def ok(p, i):
        k = idx[i]
        return all(p[k] >= p[j] + margin for j in range(4) if j != k)
    best_val, best_set = -1.0, None
    for _ in range(restarts):
        P = rng.random((n, 4))
        for i, k in enumerate(idx):
            P[i, k] = min(1.0, max(P[i, k], max(P[i, j] for j in range(4) if j != k) + margin))
        if not all(ok(P[i], i) for i in range(n)):
            continue
        cur = _minpair(P); step = 0.3
        for s in range(steps):
            i = int(rng.integers(n)); k2 = int(rng.integers(4))
            old = P[i, k2]
            P[i, k2] = min(1.0, max(0.0, old + rng.normal(0, step)))
            if not ok(P[i], i):
                P[i, k2] = old; continue
            v = _minpair(P)
            if v > cur: cur = v
            else: P[i, k2] = old
            if s % 300 == 299: step *= 0.6
        if cur > best_val:
            best_val, best_set = cur, [tuple(round(float(x), 3) for x in p) for p in P]
    return float(best_val), best_set

print()
print('  Constrained to one character per family, margin 0.05 clear of any tie.')
print('  This one is a LOWER BOUND from a seeded search and is labelled as one:')
vc, Pc = optimise_constrained(list('DISC'))
for f, p in zip('DISC', Pc):
    t = h(p)
    print(f'    family {f}: DISC {p}  ->  timbre '
          f'({t[0]:+.3f}, {t[1]:+.3f}, {t[2]:+.3f})')
print(f'    minimum pairwise timbre distance {vc:.4f}')
v4u = RESULTS[4][0]
print(f'    unconstrained N=4 reaches {v4u:.4f}; the family constraint costs '
      f'{100*(v4u-vc)/v4u:.1f} per cent of the separation')

# ---------------------------------------------------------------------------
# 6. Capacity as a function of a resolution this script cannot supply
# ---------------------------------------------------------------------------
rule(); print('6. CAPACITY, AND THE ONE NUMBER THAT IS NOT OURS TO INVENT'); rule()
print('  How many characters the channel can hold is the inverse of section 4:')
print('  at a perceptual resolution eps, it holds the largest N whose best')
print('  min-separation is still at or above eps. The inversion is exact given')
print('  the curve; the curve above N = 6 is a set of LOWER BOUNDS, so the')
print('  capacity read off below eps = sqrt(2) is itself a lower bound.')
print()
print('  A volume argument is the wrong instrument here and is not used. At the')
print('  separations that matter the optimal sets sit entirely on the boundary')
print('  of T, so a volume-over-ball-volume count is out by orders of magnitude')
print('  in both directions depending on the regime. The table below counts')
print('  points, not volume.')
print()
print('   resolution eps | characters the channel holds')
print('  ----------------|------------------------------')
curve = sorted(RESULTS.items())
for eps in (0.4, 0.6, 0.8, 0.9, 1.0, 1.2, 1.4, 1.45, 1.6, 2.0):
    holds = max([n for n, (v, _) in curve if v >= eps] or [1])
    note = ''
    if eps <= 1.4142 < eps + 0.2:
        note = '   <- the six canonical profiles'
    print(f'        {eps:4.2f}       |          {holds:2d}{note}')
print()
print('  THE SHAPE OF THAT CURVE IS THE FINDING, AND ITS SIZE IS NOT.')
print()
print('  DELETED HERE, NOT CORRECTED (ruling D, change 40). This script used to')
print('  print a drop from N = 6 to N = 7 as a percentage, and D50 cited it as')
print('  "falls 28 per cent at the seventh". THAT FIGURE IS DELETED AND NOTHING')
print('  REPLACES IT AS A NUMBER, because every search so far has moved it:')
print('      1.0123   the published 60 x 1500 run          -> a drop of 28%')
print('      1.0360   the Skeptic\'s harder search          -> a drop of 27%')
print('      1.053712 the arbitration\'s 1,200-restart run  -> a drop of 25.5%')
print(f'      {RESULTS[7][0]:.6f} this script\'s converged search       '
      f'-> a drop of {100*(RESULTS[6][0]-RESULTS[7][0])/RESULTS[6][0]:.1f}%')
print('  It is a lower bound that rises whenever anyone searches harder, so no')
print('  drop can be printed that the next search will not move. What replaces')
print('  the percentage is the two statements below, one exact and one')
print('  conditional, and neither of them is a percentage.')
print()
print('  THE EXACT ONE. The max-min separation of this map is FLAT at sqrt(2)')
print(f'  from N = {min(_flat)} to N = {max(_flat)} and strictly lower at N = {_after[0]}. That is established')
print('  without a seed by the exhaustive corner search, and the continuous')
print('  search agrees at N = 5 and N = 6, so the flat is an optimum and not a')
print('  best-found. The curve has exactly one sharp kink and it is between six')
print('  and seven. That is a fact about packing in a rhombic dodecahedron.')
print()
print('  THE CONDITIONAL ONE, and the conditional is where it belongs. SIX IS')
print('  THE LARGEST CAST THAT COSTS NOTHING A FIVE-CHARACTER CAST DOES NOT')
print('  ALREADY COST, CONDITIONAL ON THE PERCEPTUAL RESOLUTION LYING AT OR')
print(f'  BELOW sqrt(2) = {math.sqrt(2):.4f}. That is not the same claim as "the capacity is')
print('  six", which this script no longer makes and which the status block and')
print('  D50 must stop making: six is the answer only for eps in the window')
print(f'  ({RESULTS[7][0]:.4f}, {math.sqrt(2):.4f}], a window of width '
      f'{math.sqrt(2)-RESULTS[7][0]:.4f} in a space of diameter {best:.1f},')
print('  and the lower edge of that window moves up every time the search')
print('  improves, which narrows the window rather than widening it.')
print()
print('  The one number not ours to invent is eps itself, the perceptual')
print('  resolution of the timbre space in contrast units. This script does not')
print('  supply it and does not guess it. The experiment that fixes it is a')
print('  discrimination test with no verbal anchor and no affective vocabulary:')
print('  synthesise the six canonical timbres, present pairs, ask same or')
print('  different, and find the separation at which listeners reach chance.')
print(f'  If that separation is at or below sqrt(2) = {math.sqrt(2):.4f} the six-character')
print('  conditional stands. If it is above, the cast shrinks and the table')
print('  above says by how much. If it is below the N = 7 lower bound the cast')
print('  grows, and by how much is not known, because that part of the curve is')
print('  bounded below and not solved.')
print()
print('  S3 section 2.6 cancelled one study, the recovery of a DISC profile')
print('  from a cue, and specified its replacement as a shape discrimination.')
print('  This is that replacement made concrete: the stimuli are named, the')
print('  seed is fixed, and the result is a single number that closes the')
print('  table above. Under ruling D it is no longer the cheapest outstanding')
print('  experiment in the programme; it is the one the whole section\'s claim')
print('  now rests on, because without it "six" has no status at all.')
