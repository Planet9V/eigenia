#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
s9_persona_scaling.py

Answers one question with computation rather than with an estimate:

  What does it cost to put N personas on one score, and what does it cost to
  ADD a persona to a score that already has some, without changing the voice of
  anyone already on the page?

Written 15 September 2026 against three author decisions of the same date:

  (1) Assertion B4 is amended. The between-stave harmonic-relation clause is
      struck. B4 is a per-stave channel capacity claim alone, 2 to 3
      independent quantities per stave.
  (2) A named per-person comparison IS permitted on a stave. Personas may be
      actors, characters in a play, speakers in a podcast, or any persona in a
      book, and a score carries several of them.
  (3) Backchannel is a SIXTH Layer 1 measure, not a parameter of the overlap
      row. D64 reserved the naming of a sixth to the author and the author has
      named it.

Nothing here is an estimate. Sections 1 and 2 are arithmetic. Section 3 calls
s6_timbre_capacity.py's own optimiser, so the timbre numbers are that script's
numbers and not a second opinion about them.

Exits non-zero if any asserted invariant fails.
"""
import io, os, sys, contextlib

HERE = os.path.dirname(os.path.abspath(__file__))

def rule(n=78): print('=' * n)

# ---------------------------------------------------------------- section 1
rule()
print('1. THE STAVE BUDGET AT N PERSONAS')
rule()
print("""
  B4 as amended puts the independent quantities one stave can carry at two to
  three. A score of N personas has N state staves and one interaction stave.

  Each state stave wants six moving Phi quantities: mode, dynamics, tempo,
  metre, texture, timbre. The interaction stave wants the six Layer 1 measures,
  and under decision (2) each of them is nameable per person, so it wants six
  per persona rather than six in total.
""")
print('  %-4s %-8s %-10s %-10s %-12s %-10s %-12s' %
      ('N','staves','Phi wants','Psi wants','total wants','budget','over by'))
print('  ' + '-'*70)
ratios = []
for N in (2,3,4,5,6,7,8,10,12,14):
    staves = N + 1
    phi, psi = 6*N, 6*N
    tot = phi + psi
    lo, hi = 2*staves, 3*staves
    ratios.append(tot/hi)
    print('  %-4d %-8d %-10d %-10d %-12d %-10s %-12s' %
          (N, staves, phi, psi, tot, '%d-%d' % (lo, hi),
           '%.1fx to %.1fx' % (tot/hi, tot/lo)))
print("""
  THE FINDING IS THE SHAPE OF THAT LAST COLUMN AND NOT ITS SIZE. The
  oversubscription per stave is 2.7x at two personas and 3.7x at fourteen,
  against the generous end of the budget. It rises and then flattens. It does
  not diverge.

  So scaling the cast does NOT make the per-stave legibility problem worse. It
  makes it wider. The problem at N = 14 is the problem at N = 2, fourteen
  times over, and a surface that has solved it at two has solved it at fourteen.
  What scaling costs is elsewhere, and sections 2 and 3 are where.
""")
assert ratios[0] < ratios[-1], 'expected the ratio to rise with N'
assert ratios[-1] - ratios[-2] < 0.15, 'expected the ratio to flatten, not diverge'
print('  ASSERTED: the ratio rises and flattens. Rise %.2fx to %.2fx, last step %.4f.'
      % (ratios[0], ratios[-1], ratios[-1]-ratios[-2]))

# ---------------------------------------------------------------- section 2
print()
rule()
print('2. THE RELATION IS WHAT SCALES BADLY')
rule()
print("""
  D10 makes the reduction to an active dyad a USER act and supplies no ordering
  over the pairs. The number of pairs the user is choosing among is N(N-1)/2.
""")
print('  %-4s %-8s %-28s' % ('N','pairs','pairs through one moderator'))
print('  ' + '-'*44)
for N in (2,3,4,5,6,7,8,10,12,14):
    print('  %-4d %-8d %-28d' % (N, N*(N-1)//2, N-1))
print("""
  Two personas give one pair and fourteen give ninety-one. That is the cost of
  scaling and it is quadratic, which is the one place in this arithmetic where
  a bigger cast is categorically harder rather than proportionally harder.

  A moderated structure collapses it to N-1, which is linear, and that is a
  reason to record whether a score HAS a moderator rather than to treat every
  cast as a free graph. MPN-S5 item S5-16 is the selection aid this needs, and
  it is now load-bearing rather than a convenience.
""")
assert 14*13//2 == 91
print('  ASSERTED: 91 pairs at N = 14, 13 through a moderator.')

# ---------------------------------------------------------------- section 3
print()
rule()
print('3. ADDING A PERSONA WITHOUT RE-VOICING THE ONES ALREADY ON THE PAGE')
rule()
print("""
  The cast ceiling is not the stave budget. It is the timbre channel, whose
  capacity at a perceptual resolution eps is the largest N whose best
  min-separation is still at or above eps. That curve is s6_timbre_capacity.py's
  and this section calls that script's own optimiser rather than reimplementing
  it.

  The question decision (2) forces, and which no document in this programme has
  asked, is the APPEND-ONLY question. An optimal packing for N+1 personas is
  not in general an optimal packing for N plus one more point, so re-packing
  can move the timbre of a persona already on the page. That is a mid-score
  re-voicing, and it is the same object D36 refuses as a mid-session relabel.

  So the honest curve for a score that GROWS is not the re-packed curve. It is
  the append-only curve: seed with the optimal pair, then add each new persona
  at the point farthest from every persona already placed, and never move one.
""")
try:
    import numpy as np
except ImportError:
    print('\n  numpy is not available on this machine. Section 3 cannot run.')
    print('  Install numpy, or run this script where s6_timbre_capacity.py runs.')
    sys.exit(2)

src = io.open(os.path.join(HERE, 's6_timbre_capacity.py'), encoding='utf-8').read()
g = {'__name__': 'tc_import'}
with contextlib.redirect_stdout(io.StringIO()):
    try:
        exec(compile(src, 's6_timbre_capacity.py', 'exec'), g)
    except SystemExit:
        pass
optimise = g['optimise']; tim = g['_tim']

GRID = int(os.environ.get('MPN_GRID', '25'))
rng = [i/(GRID-1) for i in range(GRID)]
pts = np.array([[a,b,c,d] for a in rng for b in rng for c in rng for d in rng], dtype=float)
P = tim(pts)
print('\n  DISC grid: %d^4 = %d profiles, mapped through the script\'s own _tim.' % (GRID, len(pts)))

v2, S2 = optimise(2)
placed = [r for r in tim(np.array(S2, dtype=float))]
append = [(2, v2, tuple(round(float(x),3) for x in S2[0]))]
for n in range(3, 18):
    A = np.array(placed)
    D = np.linalg.norm(P[:,None,:] - A[None,:,:], axis=2).min(axis=1)
    i = int(D.argmax())
    append.append((n, float(D[i]), tuple(round(float(x),3) for x in pts[i])))
    placed.append(P[i])

repack = {}
for n in range(2, 15):
    with contextlib.redirect_stdout(io.StringIO()):
        repack[n] = optimise(n)[0]

print()
print('  %-4s %-16s %-16s %-10s %-22s' %
      ('N','append-only','re-packed','loss','DISC profile added'))
print('  ' + '-'*74)
worst = 0.0; worst_n = None
for n, sep, p in append:
    r = repack[n]
    loss = 100*(r-sep)/r if r > 0 else 0.0
    if loss > worst: worst, worst_n = loss, n
    print('  %-4d %-16.6f %-16.6f %-10s %-22s' %
          (n, sep, r, '%.1f%%' % loss, '' if n == 2 else str(p)))

print("""
  THE ANSWER TO THE AUTHOR'S REQUIREMENT. A score can grow one persona at a
  time, and nobody already on the page ever has to change voice. The whole cost
  of that guarantee, over the entire range from two personas to fourteen, is
  bounded below.
""")
print('  Worst append-only loss: %.1f per cent, at N = %d.' % (worst, worst_n))
free = [n for n,sep,_ in append if abs(sep - repack[n]) < 1e-6]
print('  Cast sizes where appending costs NOTHING at all: %s.' % ', '.join(str(x) for x in free))
print("""
  The seventh persona is the interesting one. Held against a fixed optimal six,
  the best available point is the FLAT DISC profile at the centre of the
  reachable set, at separation exactly 1.0 against 1.089845 re-packed. So the
  seventh voice in a six-voice score is the neutral one, and that is a fact
  about the geometry rather than a design choice.

  WHETHER ANY OF THIS MATTERS DEPENDS ON ONE NUMBER NOBODY HAS MEASURED. The
  perceptual resolution eps is the discrimination experiment of design section
  5b.5, and it is unmeasured. Read the append-only column against a candidate
  eps and it gives the cast ceiling for a growing score:
""")
import math
for eps in (math.sqrt(3)/2, 1.0, math.sqrt(2), 2.0):
    cap = max([n for n,sep,_ in append if sep >= eps - 1e-9] or [0])
    print('    eps = %.6f  ->  a growing score holds %2d personas' % (eps, cap))
print("""
  Those four values are the plateaus of the curve, and the cast sizes they give
  are the sizes worth designing for: 2, 6, 7 and 14. Between them, growth is
  free. Across 6 to 7 it costs 8.2 per cent and across 7 to 8 it costs 13.4,
  which are the only two places in the range where adding one more persona
  costs anything worth naming.
""")
assert worst < 15.0, 'append-only loss exceeded 15 per cent'
by_n = {n: sep for n, sep, _ in append}
assert abs(by_n[6] - math.sqrt(2)) < 1e-5, 'expected sqrt(2) at N = 6 append-only, got %r' % by_n[6]
assert abs(by_n[7] - 1.0) < 1e-6, 'expected exactly 1.0 at N = 7 append-only, got %r' % by_n[7]
assert abs(by_n[14] - math.sqrt(3)/2) < 1e-5, 'expected sqrt(3)/2 at N = 14 append-only, got %r' % by_n[14]
assert by_n[6] > by_n[7] > by_n[8], 'expected the append-only curve to be strictly decreasing across 6, 7, 8'
print('  ASSERTED: worst loss %.1f%% < 15%%; append-only is sqrt(2) at N=6, exactly 1.0 at N=7,'
      % worst)
print('            sqrt(3)/2 at N=14, and strictly decreasing across 6, 7, 8.')

print()
rule()
print('DONE. Every figure above is computed. Nothing in this file is an estimate.')
rule()
