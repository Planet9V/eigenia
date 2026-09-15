#!/usr/bin/env python3
"""
The tie rule this paper adopts, stated completely enough to implement, and
checked.

Revision 1 of section 2.3 adopted "modal interpolation within a stated margin"
without stating the margin, without saying what happens when three registers
tie, and it claimed the resulting map has no jump set in the interior. The
last of those is false for the obvious weighting, because a register entering
the candidate set at the margin enters with a non-zero weight. This script
fixes the rule and checks all three properties numerically.

THE RULE. Let x = (r, s, i) on the simplex, m = max(x), and delta > 0 the
margin. Give candidate k the weight

    w_k = max(0, 1 - (m - x_k) / delta),

normalise, and sound each scale degree at the weighted mean of the degrees the
candidate modes assign to it. The argmax has weight 1 always; a register whose
share is delta below the leader has weight 0, so it enters and leaves the
candidate set continuously.
"""
import itertools
import math
import random

DELTA = 0.05

# a table has to be chosen for the arithmetic; A4's choice is the author's.
# This uses the live table's low-trauma row so the figures are about a table
# that exists, and the properties checked below hold for ANY assignment of
# seven-degree modes.
MODES = {
    'Dorian':     [0, 2, 3, 5, 7, 9, 10],
    'Lydian':     [0, 2, 4, 6, 7, 9, 11],
    'Phrygian':   [0, 1, 3, 5, 7, 8, 10],
}
TABLE = ['Dorian', 'Lydian', 'Phrygian']          # real, symbolic, imaginary


def weights(x, delta=DELTA):
    m = max(x)
    w = [max(0.0, 1.0 - (m - v) / delta) for v in x]
    tot = sum(w)
    return [v / tot for v in w]


def degrees(x, delta=DELTA):
    w = weights(x, delta)
    return [sum(w[k] * MODES[TABLE[k]][d] for k in range(3)) for d in range(7)]


def argmax_degrees(x):
    k = max(range(3), key=lambda j: (x[j], -j))
    return MODES[TABLE[k]][:]


print('=' * 74)
print('1. DETERMINACY')
print('=' * 74)
bary = (1 / 3, 1 / 3, 1 / 3)
print(f'  at the barycentre, weights = '
      f'{[round(v, 4) for v in weights(bary)]}')
print(f'  degrees = {[round(v, 4) for v in degrees(bary)]}')
print('  A three-way tie gives the equal-weight mean of the three modes. It')
print('  is defined, it needs no previous frame, and it is a function of the')
print('  current state alone, so A11 decomposability survives.')
two = (0.5, 0.5, 0.0)
print(f'  at a two-way tie {two}, weights = '
      f'{[round(v, 4) for v in weights(two)]}')

print()
print('=' * 74)
print('2. IT REDUCES TO argmax WHEN NOTHING IS NEAR A TIE')
print('=' * 74)
random.seed(11)
bad = 0
tested = 0
for _ in range(200000):
    a, b = sorted((random.random(), random.random()))
    x = (a, b - a, 1 - b)
    srt = sorted(x)
    if srt[2] - srt[1] <= DELTA:
        continue
    tested += 1
    if [round(v, 12) for v in degrees(x)] != argmax_degrees(x):
        bad += 1
print(f'  states with a gap above the margin tested: {tested:,}')
print(f'  states where interpolation differs from argmax: {bad}')
assert bad == 0

print()
print('=' * 74)
print('3. CONTINUITY, WHICH THE ARGMAX SELECTOR DOES NOT HAVE')
print('=' * 74)


def sup_jump(fn, n=1200):
    """largest change in the degree vector between adjacent grid states."""
    worst = 0.0
    where = None
    for a in range(n + 1):
        r = a / n
        for b in range(n + 1 - a):
            s = b / n
            i = 1 - r - s
            x = (r, s, i)
            for dr, ds in ((1 / n, 0), (0, 1 / n)):
                if r + dr + s + ds > 1 + 1e-12:
                    continue
                y = (r + dr, s + ds, 1 - r - dr - s - ds)
                d = max(abs(p - q) for p, q in zip(fn(x), fn(y)))
                if d > worst:
                    worst, where = d, (x, y)
    return worst, where


step = 1 / 1200
w_i, at_i = sup_jump(degrees)
w_a, at_a = sup_jump(argmax_degrees)
print(f'  grid step on the simplex: {step:.6f}')
print(f'  interpolation, largest adjacent change in any degree: {w_i:.4f}')
print(f'  argmax selector,        largest adjacent change:      {w_a:.4f}')
print(f'  the argmax jump occurs at {tuple(round(v,4) for v in at_a[0])} -> '
      f'{tuple(round(v,4) for v in at_a[1])}')
print()
print(f'  The interpolated map changes by at most {w_i:.4f} semitones between')
print(f'  adjacent states, and that bound falls with the grid step, which is')
print(f'  what continuity looks like numerically. The argmax selector jumps')
print(f'  by {w_a:.0f} semitones across the tripod however fine the grid.')
# confirm the bound scales with the step
w2, _ = sup_jump(degrees, n=2400)
print(f'  halving the step: {w_i:.4f} -> {w2:.4f}  '
      f'(ratio {w_i/w2:.2f}, expected about 2 for a Lipschitz map)')

print()
print('=' * 74)
print('4. THE COST: HOW FAR FROM ANY PRINTABLE PITCH')
print('=' * 74)
worst = 0.0
worst_at = None
n = 600
for a in range(n + 1):
    r = a / n
    for b in range(n + 1 - a):
        s = b / n
        x = (r, s, 1 - r - s)
        for d in degrees(x):
            e = abs(d - round(d))
            if e > worst:
                worst, worst_at = e, (x, d)
print(f'  largest distance from an interpolated degree to the nearest')
print(f'  semitone: {worst:.4f} semitones, {100*worst:.1f} cents, at '
      f'{tuple(round(v,3) for v in worst_at[0])}')
print('  So a renderer that rounds to standard notation is wrong by at most')
print(f'  {100*worst:.0f} cents on any degree, and the rounding reintroduces a')
print('  jump. That is the cost, and S4 owes the rounding rule.')

print()
print('=' * 74)
print('5. THE PRECONDITION')
print('=' * 74)
card = {m: len(v) for m, v in MODES.items()}
print(f'  degree counts in the table used here: {card}')
print('  Interpolation is degree by degree, so every mode in a table must')
print('  have the same number of degrees. The reference dictionary assigns')
print('  the Imaginary a six-degree whole-tone scale against seven-degree')
print('  modes elsewhere, so interpolation is undefined on that table. Any')
print('  choice of table under A4 may reassign modes freely and may not mix')
print('  cardinalities.')


# ===========================================================================
# 6. HOW MUCH OF THE SIMPLEX THE INTERPOLATION ACTUALLY TOUCHES
# ===========================================================================
print()
print('=' * 74)
print('6. HOW MUCH OF THE SIMPLEX THE INTERPOLATION ACTUALLY TOUCHES')
print('=' * 74)
print('  Outside the margin the rule reproduces argmax exactly, which section')
print('  2 above establishes. So the region on which the registers reach the')
print('  output CONTINUOUSLY is the set where the leader is within delta of')
print('  the runner-up, and nowhere else. S2 gives the measure of that set in')
print('  closed form as 2d - d^2.')
for d in (0.02, 0.05, 0.10, 0.20):
    n = 900
    inside = tot = 0
    for a in range(n + 1):
        for b in range(n + 1 - a):
            x = (a / n, b / n, 1 - a / n - b / n)
            srt = sorted(x)
            tot += 1
            inside += (srt[2] - srt[1] <= d)
    closed = 2 * d - d * d
    print(f'    delta {d:.2f}   enumerated {inside/tot:.4f}   '
          f'closed form 2d-d^2 {closed:.4f}')
print()
print('  At the margin used above, delta = 0.05, that is under a tenth of the')
print('  simplex. An earlier draft said the interpolation makes both register')
print('  degrees of freedom reach the output "everywhere rather than near the')
print('  boundaries alone". That is false and it inverts the geometry: the')
print('  continuous region is exactly the neighbourhood of the tripod, its')
print('  measure goes to zero with delta, and on the remaining nine tenths')
print('  the channel is as categorical as argmax.')

# ===========================================================================
# 7. THE JUMP SET, CORRECTLY
# ===========================================================================
print()
print('=' * 74)
print('7. THE JUMP SET, CORRECTLY')
print('=' * 74)
print('  (a) At the simplex boundary. The weight map is Lipschitz on the')
print('  CLOSED simplex, so crossing a face where a register reaches zero is')
print('  continuous. Largest adjacent change in any degree along i = 0:')
n = 2000
worst = 0.0
for a in range(n + 1):
    r = a / n
    x, y = (r, 1 - r, 0.0), (min(1.0, r + 1 / n), max(0.0, 1 - r - 1 / n), 0.0)
    worst = max(worst, max(abs(p - q) for p, q in zip(degrees(x), degrees(y))))
print(f'      {worst:.4f} semitones at step 1/{n}. There is no jump there,')
print('      and an earlier draft said there was.')
print()
print('  (b) At the trauma switch. The table itself switches at tau = 0.6, so')
print('  the CANDIDATE modes change discontinuously in trauma whatever the')
print('  interpolation does on the simplex. With the live table\'s two rows')
print('  for the Imaginary, Phrygian below and Locrian above:')
LOW = {'Phrygian': [0, 1, 3, 5, 7, 8, 10]}
HIGH = {'Locrian': [0, 1, 3, 5, 6, 8, 10]}
d = [abs(a - b) for a, b in zip(LOW['Phrygian'], HIGH['Locrian'])]
print(f'      degree-by-degree difference: {d}, largest {max(d)} semitone(s)')
print('      so the jump set includes the surface tau = 0.6 and an earlier')
print('      draft dropped it after correctly listing it.')
print()
print('  The jump set of the mode parameter under interpolation is therefore')
print('  the single surface tau = 0.6, and nothing on the simplex.')
