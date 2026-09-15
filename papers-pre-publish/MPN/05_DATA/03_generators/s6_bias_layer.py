#!/usr/bin/env python3
"""
The bias layer as a buildable, testable layer rather than a table of proposals.

S3 section 4 settles the classification at the author's Cognitive Bias Atlas,
reconciles its thirty entries against the reference implementation's thirty,
and drafts the sixteen missing musical mappings and fourteen missing domains.
What S3 does not do, because it is a paper about the mapping and not about a
system, is ask the three questions a layer has to survive before anyone builds
it:

  1. Can the thirty be told apart in a rendering, or do some of them write the
     same device off the same coordinate and cancel each other?
  2. What happens when a bias device writes to a channel that Phi has already
     set from the state? Which wins, and by how much?
  3. Which of the thirty can be detected in a single frame, and which need the
     listener, or the test harness, to have heard something earlier?

Question 3 is the one the scope ruling makes answerable. On synthetic dialogue
a bias is PLANTED: the generator decides that a specific move lands on a
specific turn, so "did the layer find it" has an answer. This script partitions
the thirty by what kind of test each admits.

WHAT CHANGED ON 14 SEPTEMBER 2026, and it changes what questions 1 and 2 mean.
ARBITRATION-DESIGN-R7 ruling A strikes the modulation rule; ruling B relabels
the channel table as a CENSUS of which Phi channel each device was written for,
not as an allocation. D-2026-09-14-A takes option (e): the bias layer occupies
no musical channel. It is a Layer 3 detector whose output is a marked textual
proposal beside the Layer 0 turn that prompted it. Nothing in this layer renders
music in version one, and BL-8 is the item that would unblock one. So:

  * "rides on" is no longer an instruction to perturb a parameter. It is a
    claim about plausibility: the prior that this bias is the move on this turn
    is a function of that state coordinate, and nothing else in the row asserts
    anything about sound (BL-1 draft, section 1).
  * the channel column is history, not allocation (ruling B).
  * the perturbation budget of section 5 is DELETED, with the 0.0333, the 3.6
    velocity units and the 0.73 discrimination thresholds (change 3). What
    replaces it is the note change 3 retains, printed in section 5 below.

THE CLASS THIS SCRIPT'S NEGATIVE CLAIM COVERS (change 8, finding S12). This
script reads a five-field JSON projection of the reference implementation's
thirty bias records and NEVER OPENS the reference implementation. Its claim
that an inherited device names no state coordinate is a claim about that
projection. The projection also carries a `strength` on all thirty entries
which this script does not read; section 2 prints its range and says why it is
set aside. The search of the implementation itself was done by hand and is
reported in MPN-S3-BL1-DRAFT.md section 2, not here.

Input: s3_bias_reconciliation.json, produced by s3_bias_reconcile.py from the
Atlas and the reference implementation. Nothing here is restated from prose.
"""
import collections
import json
import os
import sys

def _src():
    here = os.path.dirname(os.path.abspath(__file__))
    for c in (os.environ.get('MPN_RECON'),
              os.path.join(here, 's3_bias_reconciliation.json'),
              '/home/claude/s3_bias_reconciliation.json',
              os.path.expanduser('~/s3_bias_reconciliation.json')):
        if c and os.path.exists(c):
            return c
    raise SystemExit(
        'the reconciliation was not found. It is produced by s3_bias_reconcile.py, '
        'which needs the reference implementation checked out; the produced JSON is '
        'committed beside this script so that the corpus alone is enough to re-run '
        'this analysis. Set MPN_RECON to point at it.')

D = json.load(open(_src()))
ATLAS, IMPL = D['atlas'], D['impl']
STRICT, DRAFT = D['strict'], D['draft_mappings']
DRAFT_DOM, INFLUENCE = D['draft_domains'], D['influence']

def rule(n=78):
    print('=' * n)

# ---------------------------------------------------------------------------
# BL-1. The state coordinate for the fourteen devices inherited from the
# reference implementation, which names none for any of them. Drafted in
# MPN-S3-BL1-DRAFT.md under decision 7 of 12 September 2026; strike a row by
# deleting its entry and the script keeps running, with the struck id back in
# the list of entries naming no coordinate.
#
# A TUPLE is an entry the draft flags as genuinely undecided between two
# coordinates (draft section 6). The first element is the coordinate the draft
# recommends and is the one the counts below use; the second is the live
# alternative. Nothing here picks silently: every flagged row is reported on its
# own, with what the alternative would do to the collision count.
# ---------------------------------------------------------------------------
INHERITED_RIDES = {
    'CB-001': ('register: Symbolic', 'entropy'),                  # flagged
    'CB-003': 'entropy',
    'CB-005': 'trauma',
    'CB-006': 'trauma',
    'CB-008': 'entropy',
    'CB-009': 'register: Imaginary',
    'CB-012': 'register: Symbolic',
    'CB-015': 'register: Symbolic',
    'CB-017': ('register: Imaginary', 'trauma'),                  # flagged
    'CB-018': ('trauma', 'register: Symbolic'),                   # flagged
    'CB-020': 'register: Symbolic',
    'CB-021': 'register: Imaginary',
    'CB-026': 'entropy',
    'CB-030': 'register: Imaginary',
}
# Subset, not equality, so that striking a row leaves the script running.
assert set(INHERITED_RIDES) <= set(STRICT.values()), \
    set(INHERITED_RIDES) - set(STRICT.values())
FLAGGED = {cb: v for cb, v in INHERITED_RIDES.items() if isinstance(v, tuple)}
# What separates the two, per MPN-S3-BL1-DRAFT.md section 6. The alternative is
# stored as a bare coordinate so that it lands on the right signature; the sign
# is carried here, because a sign does not change which entries collide.
FLAGGED_NOTE = {
    'CB-001': ('the account defending itself (Symbolic) against how tightly the '
               'account is held (entropy, SIGN REVERSED: the only inverted ride '
               'in either table)'),
    'CB-017': ('a frame is a presentation (Imaginary) against a frame is a '
               'valence (trauma); BL-2 turns on which is taken'),
    'CB-018': ('risk aversion under accumulated load (trauma) against deference '
               'to an established order (Symbolic); S3 section 4.3 already '
               'flags this entry\'s domain as arguable'),
}
assert set(FLAGGED_NOTE) == set(FLAGGED), set(FLAGGED_NOTE) ^ set(FLAGGED)

def drafted(v):
    """The coordinate a row is drafted onto: the first element of a flagged pair."""
    return v[0] if isinstance(v, tuple) else v

# The fourteen are NOT added to DRAFT_MAPPINGS in s3_bias_reconcile.py. That
# dictionary's invariant at line 281 is an equality over the sixteen Atlas
# entries with no musical mapping at all; the fourteen are mapped by strict name
# match, so adding any of them raises with its id in the message. See
# MPN-S3-BL1-DRAFT.md section 8, "the edit not to make".
assert not (set(INHERITED_RIDES) & set(DRAFT)), \
    'an inherited id has leaked into DRAFT_MAPPINGS: ' \
    f'{sorted(set(INHERITED_RIDES) & set(DRAFT))}'

# Phi OUTPUTS, as against state coordinates. Change 7 / finding S15: a row that
# rides on one of these rides on a Phi output and not on the state.
PHI_OUTPUTS = {'fragmentation', 'density'}

# ---------------------------------------------------------------------------
# 1. Assemble the thirty. Every Atlas entry, with the device that renders it.
# ---------------------------------------------------------------------------
rule(); print('1. THE THIRTY, ASSEMBLED WITH THEIR DEVICES'); rule()
by_trait = {e['trait']: e for e in IMPL}
LAYER = {}
for cb, a in sorted(ATLAS.items()):
    dom = a.get('domain') or (DRAFT_DOM.get(cb) or {}).get('domain') \
          if isinstance(DRAFT_DOM.get(cb), dict) else a.get('domain')
    if not dom and cb in DRAFT_DOM:
        v = DRAFT_DOM[cb]
        dom = v['domain'] if isinstance(v, dict) else v
    rec = {'name': a['name'], 'domain': dom}
    # a shared entry takes the implementation's device; a drafted one takes S3's
    hit = None
    for trait, cbid in STRICT.items():
        if cbid == cb:
            hit = by_trait.get(trait)
            break
    if hit:
        rec.update(category=hit['category'], element=hit['element'],
                   rides=INHERITED_RIDES.get(cb), source='implementation')
    elif cb in DRAFT:
        d = DRAFT[cb]
        rec.update(category=d['category'], element=d['element'],
                   rides=d['rides'], source='S3 draft')
    else:
        rec.update(category=None, element=None, rides=None, source='UNMAPPED')
    LAYER[cb] = rec

assert len(LAYER) == 30, len(LAYER)
n_impl = sum(1 for r in LAYER.values() if r['source'] == 'implementation')
n_draft = sum(1 for r in LAYER.values() if r['source'] == 'S3 draft')
n_none = sum(1 for r in LAYER.values() if r['source'] == 'UNMAPPED')
print(f'  Atlas entries                          {len(LAYER)}')
print(f'    device inherited from implementation {n_impl}')
print(f'    device drafted in S3 section 4.2     {n_draft}')
print(f'    no device at all                     {n_none}')
assert n_none == 0, 'an Atlas entry has no device; the layer is not complete'
print(f'  every Atlas entry carries a domain: '
      f'{all(r["domain"] for r in LAYER.values())}')

# ---------------------------------------------------------------------------
# 2. What each device rides on, after BL-1
# ---------------------------------------------------------------------------
rule(); print('2. WHAT EACH DEVICE RIDES ON')
rule()
no_rides = sorted(cb for cb, r in LAYER.items() if not r['rides'])
inherited = sorted(cb for cb, r in LAYER.items()
                   if r['source'] == 'implementation')
s3_drafted = sorted(cb for cb, r in LAYER.items() if r['source'] == 'S3 draft')
inh_named = [cb for cb in inherited if LAYER[cb]['rides']]
print('  S3 section 4.2 states the discipline of the layer in one sentence:')
print('  "A bias is not a free-floating decoration here but a modulation of')
print('  something the state already determines." Under ruling A of 14 September')
print('  the sentence is read as a detector claim rather than as a rendering')
print('  instruction: the coordinate is what the plausibility of the proposal is')
print('  conditioned on, not a parameter the device perturbs.')
print()
print(f'  Atlas entries                          {len(LAYER)}')
print(f'  mappings naming a coordinate           {len(LAYER) - len(no_rides)}')
print(f'  mappings naming none                   {len(no_rides)}')
print(f'    of which inherited from the implementation: '
      f'{sum(1 for cb in no_rides if LAYER[cb]["source"] == "implementation")}')
if no_rides:
    for cb in no_rides:
        r = LAYER[cb]
        print(f'    {cb}  {r["name"][:26]:28s} {r["category"]:9s} '
              f'{(r["element"] or "")[:34]}')
    print('  Each of these is an id struck from INHERITED_RIDES or a drafted')
    print('  mapping with no coordinate. A struck row is meant to reappear here.')
print()
print(f'  The {len(inh_named)} devices inherited by strict name match now carry a')
print('  coordinate supplied by BL-1 and drafted in MPN-S3-BL1-DRAFT.md. They')
print('  are an authorial act, not a derivation, and each can be struck on its')
print('  own line by deleting its entry from INHERITED_RIDES above.')
print()
for cb in inh_named:
    r = LAYER[cb]
    v = INHERITED_RIDES[cb]
    mark = '  FLAGGED' if isinstance(v, tuple) else ''
    print(f'    {cb}  {r["name"][:26]:28s} {r["category"]:9s} '
          f'{drafted(v):20s}{mark}')

# --- the flagged rows, reported on their own rather than picked silently -----
print()
print(f'  GENUINELY UNDECIDED: {len(FLAGGED)} of the {len(inh_named)} are flagged in the draft as')
print('  undecided between two coordinates. The dict carries BOTH. The counts in')
print('  section 4 use the first, which is the one the draft recommends; the')
print('  second is live and the author has not ruled. These are NOT settled:')
for cb in sorted(FLAGGED):
    a, b = FLAGGED[cb]
    print(f'    {cb}  {LAYER[cb]["name"][:24]:26s} drafted: {a}')
    print(f'    {"":6s}  {"":26s} against: {b}')
    print(f'    {"":6s}  {FLAGGED_NOTE[cb]}')

# --- change 7 / finding S15: fifteen of sixteen, CB-004 the exception --------
print()
phi_out = sorted(cb for cb in s3_drafted
                 if drafted(LAYER[cb]['rides']) in PHI_OUTPUTS)
print(f'  CHANGE 7. Of the {len(s3_drafted)} mappings S3 section 4.2 drafts, '
      f'{len(s3_drafted) - len(phi_out)} name a state')
print(f'  coordinate and {len(phi_out)} does not. The count is '
      f'{len(s3_drafted) - len(phi_out)} of {len(s3_drafted)}, not '
      f'{len(s3_drafted)} of {len(s3_drafted)}.')
for cb in phi_out:
    r = LAYER[cb]
    print(f'    {cb}  {r["name"]:24s} rides on {drafted(r["rides"])}, which is a Phi')
    print(f'          OUTPUT on {r["category"]}, the same channel the device writes to.')
print('  S3 section 4.2 says in its own words that survivorship rides on')
print('  fragmentation rather than on a state coordinate, and fragmentation is')
print('  max(0, 0.7H - 0.3tau)/0.7, a function Phi computes and then renders on')
print('  the texture channel. Conditioning a proposal on a Phi output is not the')
print('  same act as conditioning it on the state. Finding S15.')
_inh_phi = [cb for cb in inh_named if drafted(LAYER[cb]['rides']) in PHI_OUTPUTS]
print(f'  {len(_inh_phi)} of the {len(inh_named)} BL-1 rows ride on a Phi output: the draft keeps')
print('  fragmentation and density out of every one of them (draft section 7).')

# --- change 8: the class the negative claim covers --------------------------
print()
_fields = sorted({k for e in IMPL for k in e})
_str = [e['strength'] for e in IMPL if 'strength' in e]
print('  CHANGE 8. THE CLASS THIS SCRIPT\'S NEGATIVE CLAIM COVERS.')
print(f'  This script reads a {len(_fields)}-field JSON projection of the '
      f'implementation\'s')
print(f'  bias records and never opens the reference implementation. The fields')
print(f'  are {_fields}.')
print(f'  The projection carries a `strength` on {len(_str)} of the {len(IMPL)} entries, '
      f'in [{min(_str)}, {max(_str)}],')
print('  which this script DOES NOT READ. It is set aside rather than used')
print('  because it is an authored confidence in the device, not a state')
print('  dependence, so it cannot serve as the coordinate BL-1 is about; the')
print('  Atlas\'s own activation ordinal, which the projection drops entirely, is')
print('  the better prior for the firing rate change 28 still owes. Finding S12.')
print('  The search of the implementation itself, for values rather than for')
print('  function names, is reported at MPN-S3-BL1-DRAFT.md section 2. It found')
print('  three state dependences attached to biases and not one of them is a')
print('  per-device coordinate: a trauma gate over the whole list, a wiring of')
print('  confirmation bias into a mode lookup that misses on every frame, and a')
print('  visualisation with one formula shared across six named channels.')

# ---------------------------------------------------------------------------
# 3. Channel occupancy and the contention with Phi
# ---------------------------------------------------------------------------
rule(); print('3. THE CHANNEL CENSUS: WHICH PHI CHANNEL EACH DEVICE WAS WRITTEN FOR')
rule()
print('  RULING B. This table is a CENSUS and not an allocation. It records')
print('  which Phi channel each of the thirty devices was written for, in the')
print('  Atlas and in the reference implementation. It does not allocate a')
print('  channel to the bias layer, because D-2026-09-14-A allocates none: the')
print('  layer occupies no musical channel in version one. No bias writes to any')
print('  channel today, and the column below is history.')
print()
# Which Phi parameter each bias category was written for, per S3 sections 2.1 to 2.6.
PHI_CHANNEL = {
    'DYNAMICS':  ('dynamic marking', 'trauma', 'S3 2.1: v = 20 + 107*tau, eight markings'),
    'RHYTHM':    ('tempo and metre', 'entropy', 'S3 2.2: three tempo bands, four metre cuts'),
    'TEXTURE':   ('fragmentation and density', 'trauma and entropy', 'S3 2.4: five stages, five levels'),
    'HARMONY':   ('chord quality and operator', 'registers', 'S3 2.5: tension = 0.9r + 0.1H, five cuts'),
    'MODE':      ('THE MODE', 'the register simplex', 'S3 2.3: A4 itself'),
    'MELODY':    ('leitmotif pitches', 'registers, via the transformation', 'S3 3'),
    'INTERVALS': ('leitmotif intervals', 'the transformation', 'S3 3'),
    'TIMBRE':    ('the three DISC contrasts', 'DISC', 'S3 2.6'),
}
occ = collections.Counter(r['category'] for r in LAYER.values())
print('  channel   | biases | Phi sets                   | from                               | free?')
print('  ----------|--------|---------------------------|------------------------------------|------')
for cat, k in sorted(occ.items(), key=lambda kv: -kv[1]):
    par, frm, _ = PHI_CHANNEL[cat]
    print(f'  {cat:9s} |   {k:2d}   | {par:25s} | {frm:34s} |   no')
print(f'  {"":9s} |  {sum(occ.values()):3d}   |')
print()
print('  EVERY channel these devices were written for is a channel Phi already')
print('  sets. There is no free channel and there was never going to be: Phi maps')
print('  the state onto the whole of the musical surface, so a bias layer')
print('  rendered in music would necessarily be a second writer to an occupied')
print('  channel. That is the finding BL-8 has to answer, and until it does the')
print('  layer renders nothing.')
print()
print('  THE SECOND FINDING, and it is the sharp one.')
_m = occ.get('MODE', 0)
print(f'  {_m} of the thirty writes to MODE. Mode is the one parameter A4 is about:')
print('  the assertion that the dominant register selects the mode is the')
print('  theory\'s central mapping claim, and S3 section 2.3 spends the paper\'s')
print('  longest section on how the registers reach it. A bias entry that SETS')
print('  the mode does not modulate A4, it overwrites it, and a listening study')
print('  on A4 run over material carrying it would be measuring the bias layer')
print('  and reporting the result as the registers. One entry is enough to do')
print('  that, because it is the entry that fires on framing, and framing is')
print('  present in most dialogue worth analysing.')
for cb, r in sorted(LAYER.items()):
    if r['category'] == 'MODE':
        print(f'    {cb}  {r["name"]:24s} {r["element"]}')
print()
print('  BL-2, WITH ITS RATIONALE AS CHANGE 2 SETS IT. The modulation rule is')
print('  struck: on a piecewise-constant output every bounded perturbation is a')
print('  categorical reassignment that fires with some probability, so the')
print('  distinction between perturbing and assigning has no content on any')
print('  channel in this census. What survives is narrower and is not about')
print('  continuity at all: CB-017 SETS THE MODE, and no channel allocation is')
print(f'  available on which setting the mode is admissible. That is BL-2, {_m} entry')
print('  of the thirty, and it is now a collision with an assertion rather than')
print('  with a channel.')
print()
print('  The implementation\'s own thirty carry two further MODE entries beyond')
print('  the Atlas overlap; they sit in the fifteen implementation-only rows')
print('  and are not in this count. If they are ever promoted into the layer')
print('  the same rule applies to them.')

# ---------------------------------------------------------------------------
# 4. Collisions: two biases the rendering cannot tell apart
# ---------------------------------------------------------------------------
rule(); print('4. COLLISIONS WITHIN THE LAYER'); rule()
print('  Two biases collide if they write to the same channel off the same')
print('  state coordinate: their effects are then a single perturbation of a')
print('  single parameter, and no listener and no analyst can attribute it.')
print('  Computed over every entry that names a coordinate. Before BL-1 that was')
print(f'  {len(s3_drafted)} of {len(LAYER)}; with the {len(inh_named)} BL-1 coordinates loaded it is')
print(f'  {len(LAYER) - len(no_rides)} of {len(LAYER)}.')
print()

def signatures(rides_of):
    s = collections.defaultdict(list)
    for cb, r in LAYER.items():
        v = rides_of(cb, r)
        if v:
            s[(r['category'], v)].append(cb)
    return s

sig = signatures(lambda cb, r: drafted(r['rides']))
colls = {k: v for k, v in sig.items() if len(v) > 1}
n_named = sum(len(v) for v in sig.values())
n_involved = sum(len(v) for v in colls.values())
print(f'  entries naming a coordinate:                                 {n_named}')
print(f'  distinct (channel, coordinate) signatures among the {n_named}:      {len(sig)}')
print(f'  signatures carrying more than one bias:                      {len(colls)}')
print(f'  entries involved in a collision:  {n_involved} of {n_named}')
print()
_pre = signatures(lambda cb, r: drafted(r['rides'])
                  if r['source'] != 'implementation' else None)
_pre_colls = {k: v for k, v in _pre.items() if len(v) > 1}
for k, v in sorted(colls.items()):
    cat, rid = k
    tag = '   NEW, created by BL-1' if k not in _pre_colls else \
          ('   widened by BL-1' if len(v) > len(_pre_colls[k]) else '')
    print(f'    {cat} off {rid}:{tag}')
    for cb in v:
        src = 'BL-1' if LAYER[cb]['source'] == 'implementation' else 'S3  '
        print(f'        {cb} {src} {LAYER[cb]["name"]:22s} {LAYER[cb]["element"]}')
print()
print('  WHAT BL-1 CREATED AND WHAT WAS ALREADY THERE. A signature is new if it')
print('  carries more than one entry only because a BL-1 coordinate landed on')
print('  it. Those are strikeable by striking a row; the rest are not.')
print(f'    signatures before BL-1: {len(_pre)}   after: {len(sig)}')
print(f'    collisions before BL-1: {len(_pre_colls)}   after: {len(colls)}   '
      f'created by BL-1: {len(colls) - len(_pre_colls)}')
print(f'    entries involved before BL-1: '
      f'{sum(len(v) for v in _pre_colls.values())} of '
      f'{sum(len(v) for v in _pre.values())}   after: {n_involved} of {n_named}')
print()
print('  THE FLAGGED ROWS, AND WHAT THE ALTERNATIVE WOULD DO. Each flagged row')
print('  is recomputed on its own with the second coordinate taken instead of')
print('  the first, everything else held. This is reported, not decided.')
for cb in sorted(FLAGGED):
    alt = FLAGGED[cb][1]
    def _ride(x, r, _cb=cb, _alt=alt):
        return _alt if x == _cb else drafted(r['rides'])
    s2 = signatures(_ride)
    c2 = {k: v for k, v in s2.items() if len(v) > 1}
    i2 = sum(len(v) for v in c2.values())
    print(f'    {cb} on "{FLAGGED[cb][0]}": {len(sig)} signatures, {len(colls)} collisions, '
          f'{n_involved} entries involved')
    print(f'    {cb} on "{alt}": {len(s2)} signatures, {len(c2)} collisions, '
          f'{i2} entries involved')
print()
print('  Read the devices, not the signatures, before calling a collision a')
print('  defect. A collision whose devices OPPOSE is a prediction and is worth')
print('  keeping: normalcy holds the metre through a disturbance and the')
print('  planning fallacy starts a phrase at a tempo it cannot finish, both off')
print('  entropy and in opposite directions, so a character high in both should')
print('  sound self-contradictory and if that never happens the two are not')
print('  independent. A collision whose devices AGREE is a loss of resolution')
print('  and something has to give.')
print()
print('  THE THIRD FINDING, and it was not visible from the prose.')
print('  S3 section 4.2 names one pair as exactly this kind of prediction:')
print('  "Zero-risk bias and information bias both ride on entropy and both')
print('  concern voicing density, and they pull in opposite directions." They')
print('  do both ride on entropy. They do NOT both write to one channel:')
for cb in ('CB-025', 'CB-029'):
    r = LAYER[cb]
    print(f'    {cb}  {r["name"]:22s} {r["category"]:9s} {r["element"]}')
print('  HARMONY against TEXTURE. As tabled, one closes a chord and the other')
print('  adds a line, which are different parameters, so the contradiction S3')
print('  predicts cannot arise and the test S3 proposes would return nothing')
print('  whatever the truth of the claim. Either the prose is describing a')
print('  mapping the table does not carry, or one of the two categories is')
print('  wrong. That is item BL-7, it is an authorial call, and it was found by')
print('  computing the signatures rather than by reading the section.')

# ---------------------------------------------------------------------------
# 5. STRUCK under change 3. What replaces it: the note change 3 retains.
#
# Deleted from this script on 14 September 2026, with nothing put in their
# place as numbers, because the mechanism they bounded has been struck:
#   * the dynamics per-bias budget of 0.0333 in trauma
#   * the 3.6 MIDI velocity units it converted to on v = 20 + 107*tau
#   * the 0.73 discrimination thresholds per rhythm bias
# Change 12's two adjacent hardcoded strings, which disagreed about whether five
# or six channels lack stated band widths, are deleted with the section that
# carried them; neither was derived from the data this script loads.
# ---------------------------------------------------------------------------
rule(); print('5. THE PERTURBATION BUDGET IS STRUCK. WHAT REPLACES IT'); rule()
print('  CHANGE 3 deletes section 5a.4 in its entirety and deletes D48. Three')
print('  figures this script used to print go with it and are replaced by')
print('  nothing, because a bound on a struck mechanism is not a number to')
print('  correct:')
print('    0.0333 in trauma  the per-bias dynamics budget        DELETED')
print('    3.6 velocity      the same bound on v = 20 + 107*tau  DELETED')
print('    0.73 thresholds   the per-bias rhythm budget          DELETED')
print()
print('  WHAT IS RETAINED, and it is a finding rather than a budget. NO BOUND')
print('  WRITTEN IN A STATE COORDINATE CAN BE SAFE. A trauma bound of 0.0333,')
print('  which was the smallest of the three and was derived from the narrowest')
print('  band on the one channel S3 states in full, still reaches:')
_b = 0.0333
LADDER_CUTS = [0.2, 0.4, 0.6, 0.8]      # S3 2.4, five stages / five levels at even fifths
print(f'    THE MODE SURFACE. S3 section 2.3 puts the single mode jump at')
print(f'    tau = 0.6. A bound of {_b} spans [{0.6-_b:.4f}, {0.6+_b:.4f}], so any state')
print(f'    within {_b} of 0.6 has its MODE changed by the bound alone, which is')
print('    A4 overwritten by a device that was told it could not do that.')
print()
print('    BOTH TEXTURE LADDERS. S3 section 2.4 states them at even fifths, so')
print(f'    the cuts sit at {LADDER_CUTS} of the ladder value. The ladder values')
print('    are density = 0.3H + 0.7tau and fragmentation = max(0, 0.7H - 0.3tau)/0.7,')
print('    so a step of b in trauma moves them by:')
_dd, _df = 0.7 * _b, (0.3 / 0.7) * _b
print(f'      density        d/dtau = 0.70      -> {_dd:.4f} per {_b} of trauma')
print(f'      fragmentation  d/dtau = 0.3/0.7   -> {_df:.4f} per {_b} of trauma')
print('    Both are strictly positive, so both ladders have states at which the')
print(f'    bound crosses a cut. Reach as a fraction of the gap between cuts (0.2):')
print(f'      density        {_dd/0.2:.1%} of a stage      fragmentation  {_df/0.2:.1%} of a stage')
print()
print('  So a bound that is safe on the dynamics ladder is not safe on the mode')
print('  surface or on either texture ladder. And no smaller bound is either:')
print('  every one of these surfaces is a property of the state coordinate and')
print('  not of the channel, so any positive bound written in trauma crosses one')
print('  of them somewhere in the state space. That is why the finding is that')
print('  NO bound can be safe and not that this bound was the wrong size.')
print('  Finding S3, retained under change 3 in place of the deleted budget.')
_span = sum(min(1.0, t + _b) - max(0.0, t - _b) for t in [0.6])
print(f'  One rate, as an illustration and not as a budget: a trauma uniform on')
print(f'  [0, 1] lies within {_b} of the mode surface on {_span:.1%} of frames, and on')
print('  those frames the bound is a categorical reassignment of the mode.')
print()
print('  BL-3 IS DISCHARGED, NOT RESTORED (changes 3 and 10). Its budget was')
print('  computed over three rhythm entries at channel level and change 10 made')
print('  it dependent on BL-1. BL-1 discharges the dependency in the direction')
print(f'  that would have kept the divisor: with the {len(inh_named)} coordinates loaded,')
_r3 = sorted(cb for cb, r in LAYER.items()
             if r['category'] == 'RHYTHM' and drafted(r['rides']) == 'entropy')
_d3 = sorted(cb for cb, r in LAYER.items()
             if r['category'] == 'DYNAMICS' and drafted(r['rides']) == 'trauma')
print(f'    all {len(_r3)} RHYTHM entries ride on entropy: {_r3}')
print(f'    all {len(_d3)} DYNAMICS entries ride on trauma: {_d3}')
print('  so the divisor of three was a divisor at signature level and not only')
print('  at channel level. That is a note for whatever replaces the budget, not')
print('  a restoration of it.')

# ---------------------------------------------------------------------------
# 6. Locality: what kind of test each of the thirty admits
# ---------------------------------------------------------------------------
rule(); print('6. WHAT KIND OF TEST EACH BIAS ADMITS'); rule()
# Classified from the device text, one reason each, asserted to cover all 30.
HISTORICAL = {
    'CB-004': 'the dropped voice is audible only against the statement that included it',
    'CB-010': 'an expected inversion that does not come needs the run that set the expectation',
    'CB-016': 'the peak and the end are properties of a completed span',
    'CB-022': 'a reharmonisation is a change to material already heard',
    'CB-024': 'a cadence justified after the fact needs the decision it justifies',
    'CB-026': 'a weighting by recency is a comparison across the span',
    'CB-027': 'a tempo the phrase cannot finish in is judged at the phrase end',
    'CB-011': 'absorption is a voice that WAS playing something else',
}
local = [cb for cb in LAYER if cb not in HISTORICAL]
assert len(local) + len(HISTORICAL) == 30
assert all(cb in LAYER for cb in HISTORICAL)
print(f'  frame-local, detectable within one frame          {len(local)}')
print(f'  historical, needing material heard earlier        {len(HISTORICAL)}')
print()
print('  THE TEST HARNESS FOLLOWS FROM THE PARTITION, and it is only possible')
print('  because the material is generated. For a frame-local bias the')
print('  generator plants the move on a named turn and the score is per-turn:')
print('  did the layer fire on that turn and not on its neighbours. For a')
print('  historical bias a per-turn score is meaningless and the unit of test')
print('  is a PAIR of passages, the statement and its distortion, scored by')
print('  whether the second is heard as a distortion of the first.')
print()
for cb in sorted(HISTORICAL):
    print(f'    {cb}  {LAYER[cb]["name"]:24s} {HISTORICAL[cb]}')
print()
print('  S3 section 4.2 names choice-supportive bias the natural pilot for the')
print('  whole layer, because it is the only mapping checkable against earlier')
print('  material note for note without a listener at all. That is a member of')
print('  the historical eight and it is the cheapest test in the set: two')
print('  passages of one score and an analyst, no panel, no stimulus budget.')

# ---------------------------------------------------------------------------
# 7. The influence layer, kept separate as decision 8 requires
# ---------------------------------------------------------------------------
rule(); print('7. THE INFLUENCE LAYER IS NOT PART OF THIS COUNT'); rule()
print(f'  Cialdini\'s six principles: {", ".join(INFLUENCE)}')
print('  Decision 8 of 12 September 2026 moves them to a separate layer that')
print('  does not share an index with the biases. They appear in the')
print('  implementation\'s thirty and are therefore inside the fifteen')
print('  implementation-only entries, not inside the Atlas thirty. One coupling')
print('  crosses the boundary and S3 section 4.4 declares it: social proof is')
print('  JOINING, groupthink is ABSORPTION, and striking either requires the')
print('  other to be reworded.')
impl_traits = {e['trait'] for e in IMPL}
print(f'  influence principles present in the implementation: '
      f'{sorted(t for t in INFLUENCE if t in impl_traits)}')

rule(); print('8. THE WORK QUEUE THIS SCRIPT GENERATES'); rule()
_bl1 = ('CLOSED as drafted. All %d inherited mappings now name a coordinate '
        '(MPN-S3-BL1-DRAFT.md). %d of them are flagged undecided between two '
        'and are still the author\'s: %s.'
        % (len(inh_named), len(FLAGGED), ', '.join(sorted(FLAGGED)))) \
    if not no_rides else \
    ('OPEN. %d mappings still name no coordinate: %s.'
     % (len(no_rides), ', '.join(no_rides)))
Q = [
    ('BL-1', _bl1),
    ('BL-2', f'Decide the disposition of the {occ.get("MODE",0)} entry that SETS the mode. '
             'Rationale as change 2 fixes it: no channel allocation is available on which '
             'setting the mode is admissible. It is CB-017, framing. See MPN-S3-BL2-DRAFT.md.'),
    ('BL-3', 'DISCHARGED as a dependency and struck as a budget with section 5a.4 '
             '(changes 3 and 10). What survives is the signature-level note in section 5.'),
    ('BL-4', f'Resolve or declare the {len(colls)} collisions of section 4, of which '
             f'{len(colls) - len(_pre_colls)} are created by BL-1 and are strikeable by striking a row. '
             'The binary of opposing and agreeing devices does not cover the third case '
             'section 4 now shows, so the rule change 9 asks for has to cover it.'),
    ('BL-5', 'Pilot the layer on choice-supportive bias, which needs an analyst and two '
             'passages and no listener panel. This is the detection rate D-2026-09-14-A '
             'names as the condition on which BL-8 reopens.'),
    ('BL-6', f'Plant the {len(local)} frame-local biases in generated dialogue and score '
             f'detection per turn; score the other {len(HISTORICAL)} as passage pairs.'),
    ('BL-7', 'Reconcile S3 section 4.2\'s stated zero-risk against information-bias '
             'contradiction with the table, which puts them on different channels so the '
             'contradiction cannot occur.'),
    ('BL-8', 'Allocate a channel Phi does not occupy, and respecify the thirty devices for '
             'it. TAKEN on 14 September as option (e): no channel, the layer is a Layer 3 '
             'detector and renders nothing. Reopens on a BL-5/BL-6 detection rate; if it '
             'reopens, the fourth stave and not articulation. Change 5, D-2026-09-14-A.'),
]
for i, w in Q:
    print(f'  {i}  {w}')
print()
print('  NOT IN THIS QUEUE, and change 28 still owes it: what a turn with no')
print('  bias looks like, whether the layer may return nothing, and how many of')
print('  the thirty may fire on one turn. Without an abstention rule and a')
print('  stated rate there is no denominator on any surface that shows this.')
