#!/usr/bin/env python3
"""
The harmonic codomain, computed rather than cited.

S3 section 2.5 states that the 24 consonant triads carry a metric, the Cayley
graph distance under P, L and R, of diameter five, and proposes that a change
of size delta in trauma moves the chord round(k_max * delta) positions along
the alternating chain. It then admits that k_max is neither given nor bounded
anywhere, so the number of reachable chords is undetermined.

This script supplies what that subsection owes. It builds the group action
from the definitions of P, L and R, checks they are involutions, computes the
Cayley graph and its diameter, finds the alternating chain, and works out what
each candidate value of k_max costs in Cayley distance per unit of trauma.
Nothing here is taken from MPN-2; the diameter it reports is a check on MPN-2
rather than a restatement of it.
"""
import collections
import itertools

NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
TRIADS = [(r, q) for q in ('maj', 'min') for r in range(12)]


def name(t):
    r, q = t
    return NAMES[r] + ('' if q == 'maj' else 'm')


def P(t):
    r, q = t
    return (r, 'min' if q == 'maj' else 'maj')


def L(t):
    r, q = t
    return ((r + 4) % 12, 'min') if q == 'maj' else ((r - 4) % 12, 'maj')


def R(t):
    r, q = t
    return ((r + 9) % 12, 'min') if q == 'maj' else ((r + 3) % 12, 'maj')


GENS = {'P': P, 'L': L, 'R': R}

print('=' * 74)
print('1. THE GENERATORS ARE INVOLUTIONS AND THE ACTION IS ON 24 TRIADS')
print('=' * 74)
print(f'  consonant triads: {len(TRIADS)}  ({len(set(TRIADS))} distinct)')
for g, f in GENS.items():
    bad = [t for t in TRIADS if f(f(t)) != t]
    fixed = [t for t in TRIADS if f(t) == t]
    print(f'  {g}: involution {not bad}, fixed points {len(fixed)}, '
          f'example {name(TRIADS[0])} -> {name(f(TRIADS[0]))}')
    assert not bad
    assert not fixed, 'a neo-Riemannian generator should fix nothing'

print()
print('=' * 74)
print('2. THE CAYLEY GRAPH AND ITS DIAMETER')
print('=' * 74)
adj = {t: [f(t) for f in GENS.values()] for t in TRIADS}


def bfs(src):
    d = {src: 0}
    q = collections.deque([src])
    while q:
        u = q.popleft()
        for v in adj[u]:
            if v not in d:
                d[v] = d[u] + 1
                q.append(v)
    return d


all_d = {t: bfs(t) for t in TRIADS}
reach = {len(d) for d in all_d.values()}
diam = max(max(d.values()) for d in all_d.values())
ecc = {t: max(d.values()) for t, d in all_d.items()}
print(f'  every triad reaches: {reach} triads, so the action is transitive')
print(f'  diameter: {diam}')
print(f'  radius:   {min(ecc.values())}')
hist = collections.Counter(v for d in all_d.values() for v in d.values())
print('  distance distribution over all ordered pairs:')
for k in sorted(hist):
    print(f'    {k}: {hist[k]:4d} pairs')
print()
print(f'  MPN-2 reports a diameter of five. Computed here: {diam}. '
      f'{"It checks out." if diam == 5 else "IT DOES NOT CHECK OUT."}')

print()
print('=' * 74)
print('3. THE ALTERNATING CHAIN')
print('=' * 74)


def chain(start, first):
    """Alternate two generators from start until the walk closes."""
    seq, cur, k = [start], start, 0
    order = [first, [g for g in ('L', 'R') if g != first][0]] \
        if first in ('L', 'R') else [first, 'R']
    while True:
        cur = GENS[order[k % 2]](cur)
        k += 1
        if cur == start:
            return seq, k
        seq.append(cur)
        if k > 100:
            return seq, -1


for pair, first in ((('L', 'R'), 'L'), (('P', 'L'), 'P'), (('P', 'R'), 'P')):
    a, b = pair
    seq, cur, k = [TRIADS[0]], TRIADS[0], 0
    while True:
        cur = GENS[[a, b][k % 2]](cur)
        k += 1
        if cur == seq[0]:
            break
        seq.append(cur)
        if k > 200:
            break
    covers = len(set(seq))
    print(f'  {a}{b} alternating from {name(TRIADS[0])}: cycle length {k}, '
          f'{covers} distinct triads'
          f'{"  <-- Hamiltonian, all 24" if covers == 24 else ""}')
    if covers == 24:
        HAM = seq
print()
print('  The LR chain visits every triad exactly once before closing, so it is')
print('  a Hamiltonian cycle and "position along the alternating chain" is')
print('  well defined as an integer modulo 24.')
print('  The first eight positions: ' + ', '.join(name(t) for t in HAM[:8]))

print()
print('=' * 74)
print('4. WHAT k_max COSTS: CHAIN POSITION AGAINST CAYLEY DISTANCE')
print('=' * 74)
pos = {t: k for k, t in enumerate(HAM)}
by_step = collections.defaultdict(list)
for t in TRIADS:
    for u in TRIADS:
        step = (pos[u] - pos[t]) % 24
        by_step[step].append(all_d[t][u])
print('  Moving n positions along the chain costs this many generator steps')
print('  by a shortest word, over all starting triads:')
print(f'  {"n":>3s} {"min":>4s} {"max":>4s} {"mean":>6s}')
for n in range(24):
    v = by_step[n]
    print(f'  {n:3d} {min(v):4d} {max(v):4d} {sum(v)/len(v):6.2f}')

print()
print('=' * 74)
print('5. THE CANDIDATE VALUES OF k_max, AND WHAT EACH MEANS')
print('=' * 74)
print('  A change of delta in trauma moves round(k_max * delta) positions. The')
print('  useful questions are how many chords a full sweep of trauma can')
print('  reach, and how far in the METRIC it can get, which are different.')
print()
print(f'  {"k_max":>6s} {"chords reachable":>17s} {"max Cayley distance":>20s} '
      f'{"antipode reachable":>19s}')
for k in (1, 2, 3, 4, 5, 6, 8, 10, 11, 12, 13, 16, 23, 24):
    distinct = min(k + 1, 24)
    mx = max(max(all_d[t][HAM[(pos[t] + n) % 24]] for t in TRIADS)
             for n in range(1, k + 1))
    some = any(all_d[t][HAM[(pos[t] + n) % 24]] == 5
               for t in TRIADS for n in range(1, k + 1))
    every = all(any(all_d[t][HAM[(pos[t] + n) % 24]] == 5
                    for n in range(1, k + 1)) for t in TRIADS)
    tag = 'from all' if every else ('from some' if some else 'no')
    print(f'  {k:6d} {distinct:17d} {mx:20d} {tag:>19s}')
print()
offs = collections.Counter()
for t in TRIADS:
    far = [u for u in TRIADS if all_d[t][u] == 5][0]
    offs[(pos[far] - pos[t]) % 24] += 1
print(f'  The antipode sits at chain offset {sorted(offs)} from a triad, '
      f'{dict(offs)} of the 24 each.')
print('  So reaching the graph\'s diameter needs k_max >= 11 from some triads')
print('  and k_max >= 13 from every triad. No value below 11 reaches it at')
print('  all: a full sweep of trauma at k_max = 5 covers five chain positions')
print('  and a Cayley distance of at most 4.')
print()
print('  An earlier draft of S3 section 2.5 said that k_max = 5 makes a full')
print('  sweep "span the graph\'s diameter". That is false, and this table')
print('  says so four rows above the claim it contradicted.')
print()
print('  The honest constraints are these. At 24 or more the map wraps and two')
print('  different traumas give the same chord for no reason the theory')
print('  intends, so k_max <= 23. Below 11 no trauma trajectory can reach a')
print('  chord at the full diameter from any starting triad, and below 13 it')
print('  cannot from every one. Between those, how many of the 24 chords a')
print('  sweep should reach is a musical judgement and not a derivation.')


# ===========================================================================
# 6. THE PROPOSED MAPPING IS NOT MONOTONE, AND THAT IS A PROBLEM FOR IT
# ===========================================================================
print()
print('=' * 74)
print('6. THE PROPOSED MAPPING IS NOT MONOTONE IN THE METRIC IT CITES')
print('=' * 74)
print('  Section 4 above is worth reading again. Chain position and Cayley')
print('  distance do not rise together:')
worst_pairs = []
for n in range(1, 24):
    worst_pairs.append((n, min(by_step[n]), max(by_step[n])))
mono = all(worst_pairs[i][1] <= worst_pairs[i + 1][1]
           for i in range(len(worst_pairs) - 1))
print(f'  minimum cost non-decreasing in n: {mono}')
examples = [(4, 5), (10, 23), (12, 23)]
for a, b in examples:
    print(f'    moving {a:2d} positions costs {min(by_step[a])} to '
          f'{max(by_step[a])} steps; moving {b:2d} costs '
          f'{min(by_step[b])} to {max(by_step[b])}')
print()
print('  So a LARGER change in trauma can produce a SMALLER harmonic move.')
print('  The mapping section 2.5 proposes says the size of a state change')
print('  sets the size of a harmonic move, and cites the Cayley metric as')
print('  what makes that size a number. Measured in that metric the proposal')
print('  does not do what it says: the chain folds back on itself, because it')
print('  is a cycle of 24 in a graph of diameter 5.')
print()
print('  Two repairs are available and neither is free. Define the move IN')
print('  the metric, taking the target to be any triad at Cayley distance')
print('  round(5 * delta), which is monotone by construction but no longer')
print('  picks a unique chord, since several triads sit at each distance:')
for d in range(6):
    cnt = sum(1 for u in TRIADS if all_d[TRIADS[0]][u] == d)
    print(f'    from {name(TRIADS[0])}, triads at distance {d}: {cnt}')
print('  Or keep the chain and drop the claim that the move size is metric,')
print('  in which case the Cayley distance is decoration and the parameter is')
print('  a walk along a fixed cycle. The first is what the theory appears to')
print('  mean; the second is what the present wording describes. Choosing')
print('  between them is the author\'s and it is not a detail: it decides')
print('  whether the harmonic parameter carries a magnitude or an index.')
