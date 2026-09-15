#!/usr/bin/env python3
"""Closed forms replacing the simulations, and the real proof of Theorem 2."""
import math
import random

random.seed(20260913)
print("=" * 72)
print("1. THE TIE MEASURE HAS A CLOSED FORM: P(gap < d) = 2d - d^2")
print("=" * 72)
print("  On the uniform distribution over the 2-simplex, the set where a")
print("  given coordinate beats both others by at least d is a KITE, not a")
print("  scaled simplex: its vertices are that coordinate's vertex, the two")
print("  points where it leads by exactly d on each adjacent edge, and the")
print("  point where all three are within d. Each kite has area fraction")
print("  (1-d)^2/3, the three are disjoint, so P(gap >= d) = (1-d)^2 and")
print("  P(gap < d) = 2d - d^2.")
print()
print("   d      closed form    Monte Carlo (400k)   error")
for d in (0.01, 0.02, 0.05, 0.10, 0.20, 0.50):
    exact = 2 * d - d * d
    hit = 0
    n = 400000
    for _ in range(n):
        g = [random.expovariate(1.0) for _ in range(3)]
        t = sum(g)
        p = sorted(x / t for x in g)
        if p[2] - p[1] < d:
            hit += 1
    mc = hit / n
    print(f"  {d:.2f}    {exact:.6f}      {mc:.6f}          {mc-exact:+.6f}")
print()
print("  The derivative at 0 is 2, so the measure vanishes linearly. The")
print("  simulation was unnecessary and, at four places, wrong.")

print()
print("=" * 72)
print("2. DIRICHLET CORRELATIONS HAVE A CLOSED FORM TOO")
print("=" * 72)
print("  For Dirichlet(alpha), corr(i,j) = -sqrt(a_i a_j / ((a0-a_i)(a0-a_j)))")


def dirichlet_corr(alpha):
    a0 = sum(alpha)
    out = []
    for i, j in ((0, 1), (1, 2), (0, 2)):
        out.append(-math.sqrt(alpha[i] * alpha[j]
                              / ((a0 - alpha[i]) * (a0 - alpha[j]))))
    return out


for alpha in ((1.0, 1.0, 1.0), (5.0, 1.0, 0.4)):
    c = dirichlet_corr(alpha)
    print(f"  Dirichlet{alpha}: {['%+.4f' % x for x in c]}")
print("  The uniform case is exactly -1/2 on every pair. No simulation needed.")

print()
print("=" * 72)
print("3. THEOREM 2, PROVED PROPERLY")
print("=" * 72)
print("  Identity. For x_1..x_n with mean m, write S = sum (x_t - m)^2 and")
print("  Q = sum_{t<n} (x_{t+1} - x_t)^2. Expanding the lag-1 autocovariance,")
print()
print("      sum (x_t-m)(x_{t+1}-m) = S - Q/2 - ((x_1-m)^2 + (x_n-m)^2)/2,")
print()
print("  so  AC_1 = 1 - Q/(2S) - ((x_1-m)^2 + (x_n-m)^2)/(2S).")
print("  AC_1 is therefore near 1 exactly when the total squared step Q and")
print("  the two endpoint terms are small against the total variation S.")
print("  Monotonicity is sufficient but not necessary: any smooth trend does")
print("  it. This is what the paper should say.")
print()


def parts(x):
    n = len(x)
    m = sum(x) / n
    S = sum((v - m) ** 2 for v in x)
    Q = sum((x[t + 1] - x[t]) ** 2 for t in range(n - 1))
    E = ((x[0] - m) ** 2 + (x[-1] - m) ** 2) / 2
    ac = sum((x[t] - m) * (x[t + 1] - m) for t in range(n - 1)) / S
    return ac, 1 - Q / (2 * S) - E / S, Q, S


print("  series                          AC_1     identity   Q/(2S)")
cases = {
    "linear ramp, n=200": [0.004 * k for k in range(200)],
    "linear ramp, n=30": [0.03 * k for k in range(30)],
    "linear ramp, n=12": [0.08 * k for k in range(12)],
    "ramp + noise sd .02, n=200": None,
    "ramp + noise sd .02, n=30": None,
    "white noise, n=200": None,
    "falling ramp, n=200": [1 - 0.004 * k for k in range(200)],
    "step at midpoint, n=200": [0.0] * 100 + [1.0] * 100,
}
random.seed(7)
cases["ramp + noise sd .02, n=200"] = [0.004 * k + random.gauss(0, 0.02)
                                       for k in range(200)]
cases["ramp + noise sd .02, n=30"] = [0.03 * k + random.gauss(0, 0.02)
                                      for k in range(30)]
cases["white noise, n=200"] = [random.gauss(0, 0.02) for _ in range(200)]
for name, x in cases.items():
    ac, ident, Q, S = parts(x)
    print(f"  {name:30s} {ac:+.4f}   {ident:+.4f}   {Q/(2*S):.4f}")
print()
print("  Note the falling ramp: AC_1 is just as high, which is the proof that")
print("  monotone increase is not the hypothesis. Monotone increase is")
print("  not the operative hypothesis, a trend is. And note n=12, the length")
print("  of a short act: at n=12 the indicator is already at +0.75.")

print()
print("=" * 72)
print("4. THE SIMPLEX AND THE BORROMEAN LINK ARE INCOMPATIBLE")
print("=" * 72)
print("  Borromean: the three rings are pairwise unlinked, collectively")
print("  linked. The pairwise linking numbers are all zero; what is non-zero")
print("  is the triple invariant. Read as a claim about dependence, it says")
print("  no two registers constrain one another; only all three together do.")
print()
print("  Simplex: Lemma 1 forces the three covariances to sum to -1/2 the")
print("  sum of the variances, so at least one pair is negatively coupled")
print("  and pairwise independence is impossible unless all variances are 0.")
print()
print("  Check: can three variables on the simplex be pairwise uncorrelated?")
print("  That would need cov(r,s)=cov(s,i)=cov(r,i)=0, hence by Lemma 1")
print("  var(r)+var(s)+var(i)=0, hence all three constant. The only point of")
print("  the simplex satisfying it is a single fixed composition.")
best = None
for _ in range(200000):
    g = [random.expovariate(1.0) for _ in range(3)]
    t = sum(g)
    pass
print("  So the two formalisations cannot both hold of a varying subject.")
