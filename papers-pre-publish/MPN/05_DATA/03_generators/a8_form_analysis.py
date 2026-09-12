#!/usr/bin/env python3
"""
A8 candidate-form analysis.

THE QUESTION. The theory selects the fragmentation stage by 0.6H + 0.4*tau and
the orchestration density level by 0.7*tau + 0.3H. These are two convex
combinations of the same two variables with weights close enough that they may
be near-collinear as a matter of algebra rather than as a property of any
corpus. This script measures that and evaluates candidate replacements.

PRIMARY SET, AND NOT EVIDENCE EITHER: `01_scores/hand_annotated_frames.csv`,
232 frames across thirteen works, extracted from `literary_data.ts` (119) and
`additional_plays.ts` (113) in the reference implementation. The scene prose and
chord labels are the author's; the TRAUMA and ENTROPY values were produced by the
application's own text analyser and calculus, run over that prose, as the author
confirms. They are therefore the system's reading of the author's commentary, not
an independent annotation. The file name is kept for continuity and is a misnomer.

SECOND CONTROL, ALSO NOT EVIDENCE: `01_scores/MCKENNEY_LACAN_SCORE_*.csv`, seven
files, 31,078 rows. These are NOT annotations. `03_generators/
batch_process_classic_plays.py` computes

    TRAUMA_R  = (beat / total_beats) * 0.8 + (count of 8 keywords) * 0.1
    ENTROPY_H = 0.30 + 0.20*count('?') + 0.15*count('!')
                     + 0.10*(count('--') + count('...'))

so trauma is the beat index (it correlates with beat position at 0.995 to 0.999
in every file) and entropy is a punctuation tally reproducible from the TEXT
column with zero error, 72.8 per cent of rows sitting at its 0.30 floor. No
register values appear in these files, and the ALL-CAPS speaker parser assigns
every one of King Lear's 3,425 rows to "STAGE". Neither set is evidence about drama. Both are run here to show that the
collinearity is a property of the two formulae and survives any choice of
inputs, which is the whole of the argument; every figure from the second set
is labelled GENERATED.

Reproduce: python3 a8_form_analysis.py
"""
import glob, os
import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
SCORES = os.path.join(HERE, "..", "01_scores")
FRAMES = os.path.join(SCORES, "hand_annotated_frames.csv")

# The shipped weights.
A_FRAG, A_DENS = 0.6, 0.3   # weight on entropy in each combination
FRAG_T = [0.25, 0.50, 0.75, 0.90]
DENS_T = [0.20, 0.40, 0.60, 0.85]

# The amendment criterion. THESE CONSTANTS ARE STIPULATED, NOT DERIVED.
# 0.65 is chosen to sit well clear of the shipped pair's per-corpus values;
# 18 of 25 is chosen as a little over two thirds of the level grid. A reader
# should treat both as a bar the author set, not as a threshold the data implies.
CRIT_R, CRIT_CELLS = 0.65, 18


# ---------------------------------------------------------------- loading
def load_frames():
    d = pd.read_csv(FRAMES)
    return d.dropna(subset=["TRAUMA", "ENTROPY"])


def load_generated():
    frames = []
    for f in sorted(glob.glob(os.path.join(SCORES, "MCKENNEY_LACAN_SCORE_*.csv"))):
        play = os.path.basename(f).replace("MCKENNEY_LACAN_SCORE_", "").replace(".csv", "")
        d = pd.read_csv(f)[["BEAT", "TRAUMA_R", "ENTROPY_H"]].copy()
        d.columns = ["FRAME", "TRAUMA", "ENTROPY"]
        d["WORK"] = play
        frames.append(d.dropna())
    return pd.concat(frames, ignore_index=True) if frames else None


# ---------------------------------------------------------------- candidates
def clip01(x):
    return np.clip(x, 0.0, 1.0)


def sigmoid(x):
    return 1.0 / (1.0 + np.exp(-x))


def f_shipped(H, T):
    """As drafted: two convex combinations of the same pair."""
    return clip01(A_FRAG*H + (1-A_FRAG)*T), clip01((1-A_DENS)*T + A_DENS*H)


def f_c1_separated(H, T):
    """C1. The floor case, not a proposal: fragmentation IS entropy and density
    IS trauma, so r(frag, dens) is just corr(tau, H). Shows the dissociation
    available at all, and the cost of a zero cross-term."""
    return clip01(H), clip01(T)


def f_c2_knee(H, T):
    """C2. Trauma shifts the KNEE of fragmentation rather than adding to it: a
    burdened theme breaks up sooner, not more. At tau = 0 the motif holds until
    entropy passes 0.60; at tau = 1 it starts coming apart at 0.30. Density is
    concave in trauma, so the orchestra swells early and saturates."""
    knee = 0.60 - 0.30*T
    return clip01(sigmoid(8.0 * (H - knee))), clip01(T ** 0.7)


def f_c3_opposed(H, T):
    """C3. Opposed cross-terms. Trauma adds a little fragmentation; entropy
    THINS the texture, on the claim that a subject whose symbolic organisation
    is coming apart cannot muster a tutti. The negative cross-term is what
    breaks the collinearity, and it is the strongest musical claim of the three."""
    return clip01(H + 0.25*(T - 0.5)), clip01(T * (1.0 - 0.40*H))


def f_adopted(H, T):
    """ADOPTED 2026-09-12, on the author's decision.

    The theory chooses ONE direction: what density means. Density keeps its
    original weighting, leaning on trauma. Fragmentation is then not a second
    blend of the same pair but the ORTHOGONAL COMPLEMENT of density in the
    (H, tau) plane, clipped at zero because a motif cannot be less than fully
    stated, and scaled so the stage ladder spans the unit interval.

        density       = 0.3*H + 0.7*tau
        fragmentation = max(0, 0.7*H - 0.3*tau) / 0.7

    Corner behaviour, which is A5 made literal:
        calm and ordered          -> density 0.00, fragmentation 0.00
        max weight, perfect order -> density 0.70, fragmentation 0.00
        no weight, total disorder -> density 0.30, fragmentation 1.00
        both at maximum           -> density 1.00, fragmentation 0.57

    Trauma drives force, entropy drives incoherence, and the two are now
    independently controllable. The previous pair asserted A5 and violated it."""
    dens = clip01(A_DENS*H + (1-A_DENS)*T)
    frag = clip01(np.maximum(0.0, (1-A_DENS)*H - A_DENS*T) / (1-A_DENS))
    return frag, dens


def f_linear(kf, kd):
    """Parameterised linear family, for the sensitivity scan."""
    return lambda H, T: (clip01(H + kf*(T - 0.5)), clip01(T + kd*(H - 0.5)))


CANDIDATES = [
    ("shipped 0.6H+0.4t / 0.7t+0.3H", f_shipped),
    ("C1 pure separation",            f_c1_separated),
    ("C2 knee-shift + concave",       f_c2_knee),
    ("C3 opposed cross-terms",        f_c3_opposed),
    ("ADOPTED orthogonal complement",  f_adopted),
]


# ---------------------------------------------------------------- metrics
def rankdata(x):
    x = np.asarray(x, float)
    order = np.argsort(x, kind="mergesort")
    ranks = np.empty(len(x), float)
    ranks[order] = np.arange(1, len(x)+1, dtype=float)
    sx = x[order]; i = 0
    while i < len(sx):
        j = i
        while j+1 < len(sx) and sx[j+1] == sx[i]:
            j += 1
        if j > i:
            ranks[order[i:j+1]] = (i+j+2)/2.0
        i = j+1
    return ranks


def spearman(a, b):
    ra, rb = rankdata(a), rankdata(b)
    return float("nan") if ra.std() == 0 or rb.std() == 0 else float(np.corrcoef(ra, rb)[0, 1])


def pc1_share(a, b):
    X = np.column_stack([a, b]).astype(float)
    X = X - X.mean(axis=0)
    if np.any(X.std(axis=0) == 0):
        return float("nan")
    X = X / X.std(axis=0)
    ev = np.linalg.eigvalsh(np.cov(X, rowvar=False))
    return float(ev.max()/ev.sum())


def cells(frag, dens):
    """ONE metric throughout: the implementation's own level ladders."""
    lf = np.searchsorted(FRAG_T, frag, side="right")
    ld = np.searchsorted(DENS_T, dens, side="right")
    return len(set(zip(lf.tolist(), ld.tolist())))


def corr(a, b):
    return float(np.corrcoef(a, b)[0, 1]) if a.std() > 0 and b.std() > 0 else float("nan")


def algebraic(aF, aD, rho, sH, sT):
    """EXACT correlation of (aF*H + (1-aF)*T, aD*H + (1-aD)*T) given only the two
    marginal standard deviations and corr(H, T). This is an identity, not an
    empirical prediction: for two exact linear combinations it cannot fail to
    match the sample value. Its use is that it shows the correlation depends on
    NOTHING ELSE about the data."""
    c = rho*sH*sT
    cov = aF*aD*sH**2 + (1-aF)*(1-aD)*sT**2 + (aF*(1-aD) + aD*(1-aF))*c
    vF = aF**2*sH**2 + (1-aF)**2*sT**2 + 2*aF*(1-aF)*c
    vD = aD**2*sH**2 + (1-aD)**2*sT**2 + 2*aD*(1-aD)*c
    return cov/np.sqrt(vF*vD)


def rho_needed(sH, sT, target):
    """What correlation between trauma and entropy would a corpus need for the
    SHIPPED pair to fall below `target`?"""
    g = np.linspace(-0.999, 0.999, 40001)
    v = np.array([algebraic(A_FRAG, A_DENS, float(r), sH, sT) for r in g])
    ok = g[v < target]
    return (float(ok.max()) if len(ok) else None), float(v.min()), float(g[int(v.argmin())])


# ---------------------------------------------------------------- reporting
def describe(df, label, generated=False):
    H = df["ENTROPY"].to_numpy(float); T = df["TRAUMA"].to_numpy(float)
    tag = " [GENERATED, NOT EVIDENCE]" if generated else ""
    print("=" * 78)
    print(f"{label}{tag}")
    print("=" * 78)
    print(f"n = {len(df)}   works = {df['WORK'].nunique()}")
    print(f"  tau : distinct={df['TRAUMA'].nunique():4d}  mean={T.mean():.4f} sd={T.std():.4f} range {T.min():.2f}-{T.max():.2f}")
    print(f"  H   : distinct={df['ENTROPY'].nunique():4d}  mean={H.mean():.4f} sd={H.std():.4f} range {H.min():.2f}-{H.max():.2f}")
    rho = corr(T, H)
    print(f"  corr(tau, H) = {rho:+.4f}")
    print()
    rows = []
    for name, fn in CANDIDATES:
        a, b = fn(H, T)
        rows.append({
            "form": name, "r": corr(a, b), "spearman": spearman(a, b),
            "PC1": pc1_share(a, b), "cells/25": cells(a, b),
            "meets criterion": "yes" if (corr(a, b) < CRIT_R and cells(a, b) >= CRIT_CELLS) else "no",
        })
    out = pd.DataFrame(rows)
    print(out.to_string(index=False, float_format=lambda x: f"{x:+.4f}"))
    print()
    return H, T, rho


def main():
    print(__doc__.strip().split("Reproduce:")[0])

    frames = load_frames()
    H, T, rho = describe(frames, "PRIMARY SET: 232 frames, 13 works (system-produced, not evidence)")
    sH, sT = H.std(), T.std()

    print("-- why the shipped pair cannot dissociate --")
    print(f"  sample r(frag, dens)                         : {corr(*f_shipped(H, T)):.4f}")
    print(f"  from sd(H)={sH:.4f}, sd(tau)={sT:.4f}, rho={rho:+.4f} : {algebraic(A_FRAG, A_DENS, rho, sH, sT):.4f}")
    print("  These agree to machine precision because the expression is an IDENTITY")
    print("  for two exact linear combinations. It could not have failed to match.")
    print("  What it establishes is that r depends on nothing else about the data:")
    print("  not on the plays, not on the annotator, not on the sample size.")
    print()
    print(f"  equal variances and tau independent of H     : {algebraic(A_FRAG, A_DENS, 0.0, 1.0, 1.0):.4f}")
    need65, vmin, argmin = rho_needed(sH, sT, CRIT_R)
    need80, _, _ = rho_needed(sH, sT, 0.80)
    print(f"  corpus would need corr(tau,H) < {need65:+.3f} for r < {CRIT_R}")
    print(f"  corpus would need corr(tau,H) < {need80:+.3f} for r < 0.80")
    print("  Both require trauma and entropy to be strongly ANTI-correlated, which")
    print("  would refute A5's independence claim rather than rescue A8.")
    print()
    print("  A5 succeeding forces A8 to fail: the better tau and H separate, the")
    print("  more tightly two similar reweightings of them must track.")
    print()

    print("-- per-work correlation, shipped pair vs candidates --")
    per = {}
    for name, fn in CANDIDATES:
        per[name] = {}
        for work, g in frames.groupby("WORK"):
            h, t = g["ENTROPY"].to_numpy(float), g["TRAUMA"].to_numpy(float)
            if len(g) < 8:
                continue
            a, b = fn(h, t)
            per[name][work] = corr(a, b)
    print(pd.DataFrame(per).to_string(float_format=lambda x: f"{x:+.4f}"))
    print()

    print(f"-- criterion (STIPULATED, not derived): r < {CRIT_R} and cells >= {CRIT_CELLS} of 25 --")
    print()

    print("-- linear-family scan: frag = H + kf(t-0.5), dens = t + kd(H-0.5) --")
    ks = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5]
    print("      kd: " + "".join(f"{k:8.2f}" for k in ks))
    for kf in ks:
        line = f"kf={kf:.1f}  "
        for kd in ks:
            a, b = f_linear(kf, kd)(H, T)
            line += f"{corr(a,b):+8.3f}"
        print(line)
    print()

    gen = load_generated()
    if gen is not None:
        describe(gen, "SECOND CONTROL: batch-generated score files", generated=True)
        print("  The same collinearity appears in a corpus built from a beat counter")
        print("  and a punctuation tally, which is the point: it is a property of the")
        print("  two formulae and survives any choice of inputs.")
        print()

    write_curves(frames)
    commensurability(frames, "on the 232 frames")


def write_curves(frames, works=("Hamlet", "Macbeth"), forms=None):
    try:
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
    except Exception as e:
        print(f"(curves skipped: {e})")
        return
    forms = forms or [("shipped", f_shipped), ("C3 opposed", f_c3_opposed), ("ADOPTED orthogonal complement", f_adopted)]
    outdir = os.path.join(HERE, "..", "04_figures")
    os.makedirs(outdir, exist_ok=True)
    for work in works:
        g = frames[frames["WORK"] == work]
        if len(g) < 8:
            continue
        H = g["ENTROPY"].to_numpy(float); T = g["TRAUMA"].to_numpy(float)
        x = np.arange(1, len(g)+1)
        fig, axes = plt.subplots(len(forms), 1, figsize=(11, 8), sharex=True)
        for ax, (name, fn) in zip(axes, forms):
            a, b = fn(H, T)
            ax.plot(x, a, marker="o", ms=3, lw=1.2, label="fragmentation")
            ax.plot(x, b, marker="s", ms=3, lw=1.2, label="orchestration density")
            ax.set_ylabel("level"); ax.set_ylim(-0.02, 1.02)
            ax.set_title(f"{name}   r = {corr(a,b):+.3f}", fontsize=10, loc="left")
            ax.legend(loc="upper left", fontsize=8, frameon=False)
        axes[-1].set_xlabel(f"hand-annotated frame ({work}, n = {len(g)})")
        fig.tight_layout()
        p = os.path.join(outdir, f"a8-curves-{work.lower().replace(' ','-')}.png")
        fig.savefig(p, dpi=150); plt.close(fig)
        print(f"  wrote 04_figures/{os.path.basename(p)}")




# ---------------------------------------------------------------- commensurability
def commensurability(df, label=""):
    """MPN-NOTE-01. Three results the A8 analysis above does not reach:
    (1) nominal weights are not effective weights; (2) fixing dispersion does not
    fix collinearity; (3) the scalarisation discards most of the state's second
    dimension, and the orthogonal basis recovers it."""
    H = df["ENTROPY"].to_numpy(float); T = df["TRAUMA"].to_numpy(float)
    sH, sT = H.std(), T.std()
    print("=" * 78); print(f"COMMENSURABILITY {label}"); print("=" * 78)
    print(f"sd(H)={sH:.4f}  sd(tau)={sT:.4f}  ratio {sT/sH:.3f}\n")
    print("-- nominal weight vs effective contribution --")
    for nm, a in [("fragmentation", A_FRAG), ("density", A_DENS)]:
        cH, cT = a*sH, (1-a)*sT
        print(f"  {nm:14s} nominal H {a*100:3.0f}% / tau {(1-a)*100:3.0f}%"
              f"   effective H {cH/(cH+cT)*100:4.1f}% / tau {cT/(cH+cT)*100:4.1f}%")
    print("\n-- fixing dispersion does not fix collinearity --")
    for nm, (h, t) in [("as shipped", (H, T)),
                       ("H rescaled from its 0.30 floor", ((np.clip(H,0.30,1)-0.30)/0.70, T)),
                       ("both standardised", ((H-H.mean())/sH, (T-T.mean())/sT))]:
        f = A_FRAG*h + (1-A_FRAG)*t; g = A_DENS*h + (1-A_DENS)*t
        fn, gn = (f-f.min())/(f.max()-f.min()), (g-g.min())/(g.max()-g.min())
        print(f"  {nm:32s} r = {corr(f,g):.4f}   cells {cells(fn,gn)} of 25")
    print("\n-- the variance budget: what the combination discards --")
    def pc1(X):
        Xc = X - X.mean(0); w = np.linalg.eigvalsh(np.cov(Xc, rowvar=False)); return w.max()/w.sum()
    pi = pc1(np.column_stack([H, T]))
    po = pc1(np.column_stack([A_FRAG*H+(1-A_FRAG)*T, A_DENS*H+(1-A_DENS)*T]))
    print(f"  state (H, tau)        PC1 {pi*100:5.1f}%   PC2 {(1-pi)*100:5.1f}%")
    print(f"  scalars (frag, dens)  PC1 {po*100:5.1f}%   PC2 {(1-po)*100:5.2f}%")
    print(f"  second dimension retained {(1-po)/(1-pi)*100:.1f}%; the combination discards {100-(1-po)/(1-pi)*100:.1f}% of it")
    print("\n-- the orthogonal basis: u = total disturbance, v = weight vs disorder --")
    u = (T+H)/np.sqrt(2); v = (T-H)/np.sqrt(2)
    r01 = lambda x: (x-x.min())/(x.max()-x.min())
    print(f"  density <- u, fragmentation <- -v :  r = {corr(r01(-v), r01(u)):+.4f}   cells {cells(r01(-v), r01(u))} of 25")
    print("  v is the Real-versus-Symbolic balance the theory already names.")
    print("\n-- sign-pattern taxonomy: minimum |r| achievable over all weights --")
    rng = np.random.default_rng(0)
    for name, (sf, sg) in [("both increasing in both (as shipped)", ((1,1),(1,1))),
                           ("density insensitive to entropy",       ((1,1),(0,1))),
                           ("density DECREASING in entropy (C3)",   ((1,1),(-1,1)))]:
        best = 1.0
        for _ in range(4000):
            wf = rng.random(2)*np.array(sf); wg = rng.random(2)*np.array(sg)
            a = wf[0]*H + wf[1]*T; b = wg[0]*H + wg[1]*T
            if a.std() > 1e-9 and b.std() > 1e-9:
                best = min(best, abs(corr(a, b)))
        print(f"  {name:38s} min |r| = {best:.4f}")
    print("  The first floor equals corr(tau, H) and is reached only where each scalar")
    print("  reads one variable and ignores the other. Blending and dissociating are")
    print("  incompatible unless one scalar is non-monotone.\n")


if __name__ == "__main__":
    main()
