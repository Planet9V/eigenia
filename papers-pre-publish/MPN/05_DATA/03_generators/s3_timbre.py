#!/usr/bin/env python3
"""
The timbre space T, which S2 section 6.1 leaves unspecified and section 6.4
shows to be the only channel the four DISC coordinates reach.

The published timbre-space literature gives two robust perceptual dimensions
and a contested third. DISC has four coordinates. This script works out what
that costs: which directions in DISC space are audible through timbre, and
which is not.

Nothing here is measured on any subject. It is the arithmetic of a proposed
map, and every figure it prints is a property of that map.
"""
import itertools
import math

# ---------------------------------------------------------------------------
# The orthonormal contrast basis on (D, I, S, C). The four rows are a scaled
# Hadamard matrix, so they are mutually orthogonal and each has unit norm.
# ---------------------------------------------------------------------------
H = {
    'h0 magnitude': (0.5, 0.5, 0.5, 0.5),
    'h1 pace': (0.5, 0.5, -0.5, -0.5),          # (D+I) - (S+C)
    'h2 residual': (0.5, -0.5, 0.5, -0.5),      # (D+S) - (I+C)
    'h3 task-people': (0.5, -0.5, -0.5, 0.5),   # (D+C) - (I+S)
}
NAMES = list(H)


def dot(a, b):
    return sum(x * y for x, y in zip(a, b))


print('=' * 74)
print('1. THE CONTRAST BASIS ON DISC IS ORTHONORMAL')
print('=' * 74)
ok = True
for a, b in itertools.combinations_with_replacement(NAMES, 2):
    d = dot(H[a], H[b])
    want = 1.0 if a == b else 0.0
    if abs(d - want) > 1e-12:
        ok = False
    if a == b or abs(d) > 1e-12:
        print(f'  <{a:16s}, {b:16s}> = {d:+.3f}')
print(f'  orthonormal: {ok}')
print()
print('  h1 is the instrument\'s own pace axis, D and I against S and C.')
print('  h3 is its task-versus-people axis, D and C against I and S.')
print('  h2 is the contrast the instrument does not name.')
print('  h0 is overall magnitude: how high the profile sits, not its shape.')

print()
print('=' * 74)
print('2. WHAT THE TIMBRE LITERATURE SUPPLIES')
print('=' * 74)
DIMS = [
    ('dimension 1', 'log attack time', 'agreed',
     'McAdams et al. 1995 (log rise time); Caclin et al. 2005 (attack time)'),
    ('dimension 2', 'spectral centroid', 'agreed',
     'McAdams et al. 1995; Caclin et al. 2005'),
    ('dimension 3', 'correlate disputed', 'disputed',
     'McAdams et al. 1995 gives degree of spectral variation (flux); Caclin '
     'et al. 2005 finds flux minimally salient when attack time and centroid '
     'vary concurrently, and identifies spectrum fine structure, modelled as '
     'even-harmonic attenuation, instead'),
]
print('  BOTH studies confirm a THREE-dimensional perceptual space. They agree')
print('  on the first two correlates and disagree about the third. It is the')
print('  CORRELATE of dimension three that is disputed, not its existence, and')
print('  an earlier draft of this script and of S3 section 2.6 said otherwise.')
print()
for n, corr, st, src in DIMS:
    print(f'  {n:14s} {corr:22s} {st:10s} {src}')
print()
print('  Both studies also report SPECIFICITIES: attributes of a particular')
print('  instrument that lie on no shared dimension. Those are what an')
print('  instrument-family label carries, and they are categorical.')

print()
print('=' * 74)
print('3. THE COST: FOUR COORDINATES INTO THREE DIMENSIONS')
print('=' * 74)
ASSIGN = [('h1 pace', 'log attack time', 'agreed',
           'assertive and outgoing reads as a fast attack; reserved and '
           'steady as a slow one'),
          ('h3 task-people', 'spectral centroid', 'agreed',
           'task orientation reads as brighter, people orientation as '
           'warmer. A convention, and labelled as one'),
          ('h2 residual', 'timbre dimension 3', 'disputed correlate',
           'the dimension is confirmed by both studies; which acoustic '
           'parameter realises it is not, so an implementation must pick '
           'one and say which')]
for a, d, s, why in ASSIGN:
    print(f'  {a:16s} -> {d:20s} [{s}]')
    print(f'{"":18s}{why}')
print()
print('  h0 magnitude maps to nothing. It is the null direction of the map:')
print('  two characters whose DISC profiles differ only by a constant added')
print('  to all four coordinates produce identical timbre.')

print()
print('=' * 74)
print('4. WHAT THAT MEANS FOR RECOVERY')
print('=' * 74)
print('  Rank of the DISC-to-timbre map: 3, the timbre space being three-')
print('  dimensional on both cited studies.')
print('  Dimension of DISC: 4.   Nullity: exactly 1.')
print()
print('  So of the four DISC coordinates three survive into timbre and one')
print('  never does, and that direction is profile magnitude.')
print()
print('  A listening study that asks a listener to')
print('  recover a character\'s DISC profile from a cue is asking for')
print('  something the channel cannot carry, whatever the listener\'s ear.')
print()
# what is lost concretely
print('  Worked: two profiles differing only in magnitude are inaudible.')
for base, delta in ((( 0.3, 0.3, 0.3, 0.3), 0.4), ((0.7, 0.2, 0.5, 0.1), 0.2)):
    other = tuple(min(1.0, x + delta) for x in base)
    co = [dot(H[k], base) for k in NAMES[1:]]
    cn = [dot(H[k], other) for k in NAMES[1:]]
    same = all(abs(a - b) < 1e-12 for a, b in zip(co, cn))
    print(f'    {base} and {other}')
    print(f'      audible contrasts {[round(x,3) for x in co]} against '
          f'{[round(x,3) for x in cn]}  identical: {same}')

print()
print('=' * 74)
print('5. THE CHANNEL BUDGET S1 LEAVES AS AN ESTIMATE')
print('=' * 74)
print('  S1 assertion B4 puts the number of independent quantities a single')
print('  stave can carry at "two to three", and calls it an estimate rather')
print('  than a measured figure, with S3 owing either a derivation or a')
print('  recovery study.')
print()
print('  This script does NOT discharge that debt, and an earlier draft said')
print('  it did. B4 counts independent STATE quantities carried by a stave;')
print('  the timbre literature counts perceptual DIMENSIONS within a single')
print('  channel. They are different quantities and the numerical agreement')
print('  between "two to three" and "three" is a coincidence.')
print()
print('  What the timbre result does give is narrower and still useful: an')
print('  upper bound of three on how many independent quantities the TIMBRE')
print('  channel alone can carry, which is one channel of the several a')
print('  stave has. B4 remains an estimate.')
