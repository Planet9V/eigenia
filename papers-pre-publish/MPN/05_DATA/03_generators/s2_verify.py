#!/usr/bin/env python3
"""
Verification for S2. Every numerical claim the paper makes is computed here.
Nothing is asserted in S2 that this script does not produce.
"""
import itertools
import math
import random

OUT = []


def say(s=""):
    OUT.append(s)
    print(s)


# ---------------------------------------------------------------------------
say("=" * 72)
say("1. THE SIMPLEX INDUCES NEGATIVE CORRELATION, DISTRIBUTION FREE")
say("=" * 72)
# Lemma: if r+s+i=1 then Var(r+s+i)=0, so
#   Var(r)+Var(s)+Var(i) + 2[Cov(r,s)+Cov(s,i)+Cov(r,i)] = 0
# hence sum of the three covariances = -(1/2) * sum of the three variances,
# for ANY distribution supported on the simplex.
random.seed(20260913)


def moments(samples):
    n = len(samples)
    m = [sum(x[k] for x in samples) / n for k in range(3)]
    def cov(a, b):
        return sum((x[a] - m[a]) * (x[b] - m[b]) for x in samples) / n
    V = [cov(k, k) for k in range(3)]
    C = [cov(0, 1), cov(1, 2), cov(0, 2)]
    return V, C


def corr_from(V, C):
    pairs = [(0, 1), (1, 2), (0, 2)]
    return [C[k] / math.sqrt(V[a] * V[b]) for k, (a, b) in enumerate(pairs)]


# (a) uniform on the simplex (Dirichlet 1,1,1) by the exponential trick
uni = []
for _ in range(400000):
    g = [random.expovariate(1.0) for _ in range(3)]
    t = sum(g)
    uni.append(tuple(x / t for x in g))
V, C = moments(uni)
say(f"uniform on the 2-simplex: variances {['%.5f' % v for v in V]}")
say(f"  covariances {['%.5f' % c for c in C]}")
say(f"  sum(var) = {sum(V):.6f}   sum(cov) = {sum(C):.6f}   ratio = {sum(C)/sum(V):+.4f}")
say(f"  pairwise correlations {['%+.4f' % c for c in corr_from(V, C)]}   (theory: -1/2 each)")

# (b) a deliberately lopsided distribution on the simplex, to show the
#     identity is not an artefact of symmetry
lop = []
for _ in range(400000):
    g = [random.gammavariate(a, 1.0) for a in (5.0, 1.0, 0.4)]
    t = sum(g)
    lop.append(tuple(x / t for x in g))
V2, C2 = moments(lop)
say(f"lopsided Dirichlet(5, 1, 0.4): variances {['%.5f' % v for v in V2]}")
say(f"  pairwise correlations {['%+.4f' % c for c in corr_from(V2, C2)]}")
say(f"  sum(cov)/sum(var) = {sum(C2)/sum(V2):+.6f}   (theory: exactly -1/2)")

# (c) the normalisation of three independent non-negative counts, which is
#     what analyzeRSI does: start independent, end negatively correlated
raw = [(random.expovariate(1.0), random.expovariate(1.0), random.expovariate(1.0))
       for _ in range(400000)]
Vr, Cr = moments(raw)
say(f"BEFORE normalising, three independent counts: correlations "
    f"{['%+.4f' % c for c in corr_from(Vr, Cr)]}")
nrm = [tuple(x / sum(t) for x in t) for t in raw]
Vn, Cn = moments(nrm)
say(f"AFTER dividing by the total: correlations "
    f"{['%+.4f' % c for c in corr_from(Vn, Cn)]}")
say("  -> the competition A3 asserts is manufactured by the division.")

# ---------------------------------------------------------------------------
say()
say("=" * 72)
say("2. ARGMAX IS DISCONTINUOUS ON A TRIPOD, NOT ON THE THREE MEDIANS")
say("=" * 72)
# Fraction of the simplex lying within Euclidean distance d of a tie, i.e. of
# the set where the largest two coordinates are equal. Measured in the plane
# of the simplex.
def near_tie_fraction(d, n=400000):
    hit = 0
    for _ in range(n):
        g = [random.expovariate(1.0) for _ in range(3)]
        t = sum(g)
        p = sorted(x / t for x in g)
        # gap between the largest and the second largest coordinate
        if p[2] - p[1] < d:
            hit += 1
    return hit / n


say("  The discontinuity set is the three segments from the barycentre to")
say("  the edge midpoints. On the other half of each median the third")
say("  coordinate is the strict maximum and the map is locally constant.")
say("  The exact measure is P(gap < d) = 2d - d^2; see s2_verify3.py. The")
say("  simulation below is a check on it, not the figure.")
say("  gap = (largest register) - (second largest). A tie is gap = 0.")
for d in (0.01, 0.02, 0.05, 0.10, 0.20):
    say(f"  d={d:.2f}  exact {2*d - d*d:.4f}   simulated {near_tie_fraction(d):.4f}")
say("  The measure vanishes linearly in the gap: one state in ten sits")
say("  within a tenth of a mode change on the uniform distribution. What")
say("  the system actually realises is in s2_rsi.py and is nothing like it.")

# ---------------------------------------------------------------------------
say()
say("=" * 72)
say("3. THE COMMENSURABILITY IDENTITY AND THE IMPOSSIBILITY RESULT")
say("=" * 72)
# y1 = a.x, y2 = b.x with x = (H, tau). corr(y1,y2) = a'Sb / sqrt(a'Sa b'Sb)


def scalar_corr(a, b, sH, sT, rho):
    S = [[sH * sH, rho * sH * sT], [rho * sH * sT, sT * sT]]
    def q(u, v):
        return sum(u[i] * S[i][j] * v[j] for i in range(2) for j in range(2))
    return q(a, b) / math.sqrt(q(a, a) * q(b, b))


say("  Shipped pair: frag = 0.6H + 0.4tau, dens = 0.3H + 0.7tau")
for rho in (0.0, 0.2802):
    for sH, sT, label in ((1.0, 1.0, "equal dispersion"), (0.1925, 0.2496, "frame library")):
        c = scalar_corr((0.6, 0.4), (0.3, 0.7), sH, sT, rho)
        say(f"    sd(H)={sH}, sd(tau)={sT}, rho={rho:+.4f}  ->  r = {c:+.4f}   [{label}]")
say("  Adopted pair: dens = 0.3H + 0.7tau, frag = (0.7H - 0.3tau)/0.7 clipped")
say("  Ignoring the clip, the second vector is (1.0, -3/7):")
for rho in (0.0, 0.2802):
    c = scalar_corr((0.3, 0.7), (1.0, -3.0 / 7.0), 0.1925, 0.2496, rho)
    say(f"    rho={rho:+.4f}  ->  r = {c:+.4f}")
say("  At rho = 0 and equal dispersion the two are exactly orthogonal:")
say(f"    r = {scalar_corr((0.3, 0.7), (1.0, -3.0/7.0), 1.0, 1.0, 0.0):+.10f}")

say()
say("  Effective contribution: a weight buys influence in proportion to")
say("  weight times dispersion, not weight alone.")
for (wH, wT), name in ((((0.6, 0.4)), "frag 0.6/0.4"), (((0.3, 0.7)), "dens 0.3/0.7")):
    sH, sT = 0.1925, 0.2496
    eH, eT = abs(wH) * sH, abs(wT) * sT
    tot = eH + eT
    say(f"    {name}: nominal {wH*100:.0f}/{wT*100:.0f}, "
        f"effective {100*eH/tot:.1f}/{100*eT/tot:.1f}")

# Impossibility: two scalars both strictly monotone increasing in both
# variables cannot be uncorrelated when the inputs are uncorrelated.
say()
say("  Impossibility check by exhaustion over positive weight pairs:")
worst = None
for a1 in [i / 100 for i in range(1, 100)]:
    a = (a1, 1 - a1)
    for b1 in [i / 100 for i in range(1, 100)]:
        b = (b1, 1 - b1)
        c = scalar_corr(a, b, 1.0, 1.0, 0.0)
        if worst is None or c < worst[0]:
            worst = (c, a, b)
say(f"    minimum achievable correlation with both weights positive: "
    f"r = {worst[0]:+.4f} at a = {worst[1]}, b = {worst[2]}")
say("    -> strictly positive in both slots forces r > 0. To reach zero one")
say("       weight must be negative, which is the orthogonal complement.")

# ---------------------------------------------------------------------------
say()
say("=" * 72)
say("4. THE PLR GROUP, VERIFIED ON ALL 24 CONSONANT TRIADS")
say("=" * 72)
MAJ, MIN = 0, 1


def pcs(t):
    r, q = t
    return frozenset(((r + x) % 12) for x in ((0, 4, 7) if q == MAJ else (0, 3, 7)))


def P(t):
    return (t[0], MIN if t[1] == MAJ else MAJ)


def L(t):
    return ((t[0] + 4) % 12, MIN) if t[1] == MAJ else ((t[0] - 4) % 12, MAJ)


def R(t):
    return ((t[0] + 9) % 12, MIN) if t[1] == MAJ else ((t[0] + 3) % 12, MAJ)


TRIADS = [(r, q) for r in range(12) for q in (MAJ, MIN)]
say(f"  triads: {len(TRIADS)}, distinct pitch-class sets: {len(set(pcs(t) for t in TRIADS))}")

ok = all(P(P(t)) == t and L(L(t)) == t and R(R(t)) == t for t in TRIADS)
say(f"  P, L, R are involutions: {ok}")

common = {n: min(len(pcs(t) & pcs(f(t))) for t in TRIADS)
          for n, f in (("P", P), ("L", L), ("R", R))}
say(f"  common tones preserved (minimum over all 24): {common}")

motion = {}
for n, f in (("P", P), ("L", L), ("R", R)):
    ds = set()
    for t in TRIADS:
        a, b = pcs(t), pcs(f(t))
        moved_from = list(a - b)[0]
        moved_to = list(b - a)[0]
        d = min((moved_to - moved_from) % 12, (moved_from - moved_to) % 12)
        ds.add(d)
    motion[n] = sorted(ds)
say(f"  semitones moved by the single moving voice: {motion}")

# group generated
seen = {t: "" for t in [(0, MAJ)]}
frontier = [(0, MAJ)]
while frontier:
    nxt = []
    for t in frontier:
        for n, f in (("P", P), ("L", L), ("R", R)):
            u = f(t)
            if u not in seen:
                seen[u] = seen[t] + n
                nxt.append(u)
    frontier = nxt
say(f"  orbit of C major under <P,L,R>: {len(seen)} triads")
say(f"  Cayley graph diameter from C major: {max(len(w) for w in seen.values())}")

# <L,R> alone
seen2 = {(0, MAJ)}
frontier = [(0, MAJ)]
while frontier:
    nxt = []
    for t in frontier:
        for f in (L, R):
            u = f(t)
            if u not in seen2:
                seen2.add(u)
                nxt.append(u)
    frontier = nxt
say(f"  orbit under <L,R> alone: {len(seen2)} triads")

t = (0, MAJ)
for ch in "RLRLRLR":
    t = {"P": P, "L": L, "R": R}[ch](t)
say(f"  RLRLRLR(C major) = {t}, P(C major) = {P((0, MAJ))}, equal: {t == P((0, MAJ))}")

# the LR chain used as a state coordinate
chain = [(0, MAJ)]
cur = (0, MAJ)
for k in range(1, 25):
    cur = L(cur) if k % 2 == 1 else R(cur)
    chain.append(cur)
NAMES = "C C# D D# E F F# G G# A A# B".split()
say("  the alternating LR chain from C major, k = 0..12:")
say("    " + ", ".join(f"{k}:{NAMES[c[0]]}{'' if c[1]==MAJ else 'm'}"
                       for k, c in enumerate(chain[:13])))
say(f"  returns to C major at k = {chain.index((0, MAJ), 1)}")

# the two wrong L implementations
def L_wrong(t):
    return ((t[0] - 1) % 12, MIN) if t[1] == MAJ else ((t[0] + 1) % 12, MAJ)


say(f"  L(C major) correct   = {NAMES[L((0,MAJ))[0]]} minor, "
    f"common tones {len(pcs((0,MAJ)) & pcs(L((0,MAJ))))}")
say(f"  L(C major) as shipped = {NAMES[L_wrong((0,MAJ))[0]]} minor, "
    f"common tones {len(pcs((0,MAJ)) & pcs(L_wrong((0,MAJ))))}")
say(f"  is the wrong L still an involution? "
    f"{all(L_wrong(L_wrong(t)) == t for t in TRIADS)}")
seen3 = {(0, MAJ)}
frontier = [(0, MAJ)]
while frontier:
    nxt = []
    for t in frontier:
        for f in (P, L_wrong, R):
            u = f(t)
            if u not in seen3:
                seen3.add(u)
                nxt.append(u)
    frontier = nxt
say(f"  orbit under <P, wrong L, R>: {len(seen3)} triads")

# hexatonic pole
t = P(L(P((0, MAJ))))
say(f"  PLP(C major) = {NAMES[t[0]]}{'' if t[1]==MAJ else ' minor'}, "
    f"common tones with C major: {len(pcs((0,MAJ)) & pcs(t))}")

# ---------------------------------------------------------------------------
say()
say("=" * 72)
say("5. A TREND, NOT MONOTONICITY, DRIVES THE UNDETRENDED INDICATOR TO 1")
say("=" * 72)
say("  The two standard indicators are rising variance and lag-1")
say("  autocorrelation approaching 1, both computed on residuals AFTER")
say("  detrending. Trauma as defined is non-decreasing, so it always")
say("  carries a trend. Monotonicity is sufficient, not necessary.")
n = 200
mono = [min(1.0, 0.004 * k) for k in range(n)]


def lag1(x):
    m = sum(x) / len(x)
    num = sum((x[k] - m) * (x[k + 1] - m) for k in range(len(x) - 1))
    den = sum((v - m) ** 2 for v in x)
    return num / den if den else float("nan")


say(f"  lag-1 autocorrelation of a pure linear ramp, n={n}: {lag1(mono):.4f}")
noise = [v + random.gauss(0, 0.02) for v in mono]
say(f"  the same ramp plus independent noise of sd 0.02:   {lag1(noise):.4f}")
white = [random.gauss(0, 0.02) for _ in range(n)]
say(f"  pure independent noise, no trend:                  {lag1(white):.4f}")
say("  -> any trend, rising or falling, drives the indicator to 1 whatever")
say("     the dynamics are; see the identity and the falling-ramp case in")
say("     s2_verify3.py. On a ratcheting trauma the UNDETRENDED indicator")
say("     therefore reports an imminent transition at every frame of every")
say("     play, including a calm one. The literature detrends; this theory")
say("     owes a detrending model before it may compute the indicator.")

import os
out = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                   "s2-verification.txt")
with open(out, "w") as f:
    f.write("\n".join(OUT) + "\n")
