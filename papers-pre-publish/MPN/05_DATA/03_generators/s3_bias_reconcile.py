#!/usr/bin/env python3
"""
Reconcile the Cognitive Bias Atlas against the reference implementation's
thirty bias entries, and carry the drafted mappings and domain assignments
of S3 section 5.

S1 section 9.2 settled the counts by name matching: fourteen shared, fifteen
implementation-only, sixteen Atlas entries with no musical mapping, fourteen
Atlas entries with no domain. This script reproduces all four counts from the
two sources rather than restating them, and it is where the drafted content
lives so that the paper and the data cannot drift apart.

Decision 7 of 12 September 2026: Claude drafts the sixteen missing mappings
and the fourteen missing domains; Jim McKenney strikes out what is wrong.
Decision 8: Cialdini's six influence principles move to a separate layer and
do not share an index with the biases.

  MPN_REPO    path to mpn-conductor-standalone
  MPN_CORPUS  path to papers-pre-publish/MPN
"""
import json
import os
import re
import sys

def _repo():
    env = os.environ.get('MPN_REPO')
    if env:
        return env
    probe = 'src/components/mpn-lab/mpn_reference_data.ts'
    for c in ('/home/claude/mpn-conductor-standalone',
              os.path.expanduser('~/mpn-conductor-standalone')):
        if os.path.exists(os.path.join(c, probe)):
            return c
    raise SystemExit('the reference implementation was not found; set MPN_REPO')


REPO = _repo()
def _corpus():
    """Where the MPN corpus is. Set MPN_CORPUS to override; otherwise the
    first candidate that actually contains the Atlas wins, so the script runs
    unchanged from a staged copy or from the folder on the author's machine."""
    env = os.environ.get('MPN_CORPUS')
    if env:
        return env
    probe = '01_THEORY/03_unified/16_Vol_15_Cognitive_Bias_Atlas.md'
    for c in ('/home/claude/mpn-theory',
              os.path.expanduser('~/eigenia/papers-pre-publish/MPN'),
              '/Users/jimmcknney/jim_private/eigenia/papers-pre-publish/MPN'):
        if os.path.exists(os.path.join(c, probe)):
            return c
    raise SystemExit(
        'the MPN corpus was not found; set MPN_CORPUS to the folder '
        'containing ' + probe)


CORPUS = _corpus()

# ---------------------------------------------------------------------------
# The Atlas, read from the corpus. CB-001 to CB-016 carry a domain by section;
# CB-017 to CB-030 sit in the expanded reference table with no domain.
# ---------------------------------------------------------------------------
DOMAIN_OF_SECTION = {
    'PERCEPTION': 'PERC', 'DECISION': 'DEC', 'SOCIAL': 'SOC', 'MEMORY': 'MEM',
}



def read_strikes():
    """Entries the author has struck, from 08_PAPERS/MPN-S3-STRIKES.md.

    A strike is recorded as a line `| CB-0nn | reason |`. The file need not
    exist. The invariant this supports is that every Atlas entry with no
    musical mapping is covered by a drafted mapping OR by a recorded strike,
    so striking a row and recording it keeps the reconciliation green, while
    striking a row and recording nothing makes it fail.
    """
    path = os.path.join(CORPUS, '08_PAPERS/MPN-S3-STRIKES.md')
    if not os.path.exists(path):
        return {}
    out = {}
    for line in open(path, encoding='utf-8'):
        m = re.match(r'\s*\|\s*(CB-\d{3})\s*\|\s*(.+?)\s*\|\s*$', line)
        if m:
            out[m.group(1)] = m.group(2)
    return out


def read_atlas():
    path = os.path.join(CORPUS, '01_THEORY/03_unified/16_Vol_15_Cognitive_Bias_Atlas.md')
    text = open(path, encoding='utf-8').read()
    out, domain = {}, None
    for line in text.split('\n'):
        m = re.match(r'^## 3\.\d+ Category [A-D]: (\w+) BIASES', line)
        if m:
            domain = DOMAIN_OF_SECTION[m.group(1)]
            continue
        m = re.match(r'^### (CB-\d+): (.+?)\s*$', line)
        if m:
            name = re.sub(r'\s*\(.*\)\s*$', '', m.group(2)).strip().title()
            out[m.group(1)] = {'name': name, 'domain': domain, 'source': 'catalog'}
            continue
        m = re.match(r'^\|\s*\*\*(CB-\d+)\*\*\s*\|\s*\*\*(.+?)\*\*\s*\|', line)
        if m:
            out[m.group(1)] = {'name': m.group(2).strip(), 'domain': None,
                               'source': 'expanded'}
    return out


# ---------------------------------------------------------------------------
# The implementation, read from the reference data.
# ---------------------------------------------------------------------------
def read_impl():
    path = os.path.join(REPO, 'src/components/mpn-lab/mpn_reference_data.ts')
    src = open(path, encoding='utf-8').read()
    out = []
    for blk in re.split(r"(?=id: 'bias-)", src):
        if not blk.startswith("id: 'bias-"):
            continue

        def g(pat):
            m = re.search(pat, blk)
            return m.group(1) if m else ''
        out.append({
            'id': g(r"id: '(bias-\d+)'"),
            'trait': g(r"trait: '([^']*)'"),
            'category': g(r'category: MPNCategory\.(\w+)'),
            'element': g(r"musicalElement: '([^']*)'"),
            'strength': float(g(r'strength: ([\d.]+)') or 0),
        })
    return out


# ---------------------------------------------------------------------------
# Name matching, strict. S1 uses the strict reading because it is the one that
# has to be defended; the looser reading is recorded beside it.
# ---------------------------------------------------------------------------
STRICT = {
    'Confirmation': 'CB-001', 'Anchoring': 'CB-003', 'Availability': 'CB-005',
    'SunkCost': 'CB-006', 'HyperbolicDiscounting': 'CB-008',
    'DunningKruger': 'CB-009', 'Authority': 'CB-012', 'Hindsight': 'CB-015',
    'Framing': 'CB-017', 'StatusQuo': 'CB-018', 'Bandwagon': 'CB-020',
    'BiasBlindSpot': 'CB-021', 'Recency': 'CB-026',
    'FundamentalAttribution': 'CB-030',
}
LOOSE = dict(STRICT, **{
    'Optimism': 'CB-027',            # optimism bias against the planning fallacy
    'Liking': 'CB-013',              # liking against the halo effect
    'CognitiveDissonance': 'CB-022',  # against choice-supportive bias
})

# Cialdini's six, which decision 8 moves out of the bias index entirely.
INFLUENCE = ['Scarcity', 'SocialProof', 'Reciprocity', 'Commitment', 'Liking',
             'Authority']

# ---------------------------------------------------------------------------
# DRAFTED, per decision 7. Sixteen musical mappings for the Atlas entries that
# have none. Each names the device, the state coordinate it rides on, and the
# reason. Jim McKenney strikes out what is wrong.
# ---------------------------------------------------------------------------
DRAFT_MAPPINGS = {
 'CB-002': dict(name='Normalcy', category='RHYTHM',
   element='Metre held through a metric disturbance',
   rides='entropy', reason='The bias is the refusal to register that conditions have changed. Musically that is the accompaniment keeping its metre while the melody crosses a barline that should have moved it: the listener hears the failure to adjust rather than an event.'),
 'CB-004': dict(name='Survivorship', category='TEXTURE',
   element='Missing voice, never re-entered',
   rides='fragmentation', reason='The bias is reasoning from what remains. The texture states a line, drops it, and continues as though the remaining voices were the whole; the absence is audible only if the line was heard first, which is the bias exactly.'),
 'CB-007': dict(name='Loss Aversion', category='DYNAMICS',
   element='Asymmetric envelope, fast decay and slow recovery',
   rides='trauma', reason='Losses weigh about twice gains. A dynamic envelope that falls quickly and returns slowly gives the asymmetry directly, and the ratio of the two times is the one number the mapping has to state.'),
 'CB-010': dict(name="Gambler's Fallacy", category='MELODY',
   element='Sequence expecting an inversion that does not come',
   rides='entropy', reason='The bias is the belief that a run must reverse. A melodic sequence that repeats a figure in one direction while the listener waits for the answering inversion puts the expectation in the ear rather than in the notes.'),
 'CB-011': dict(name='Groupthink', category='TEXTURE',
   element='Unison with the dissenting voice absorbed mid-phrase',
   rides='register: Symbolic', reason='Distinct from social proof, which is joining. Groupthink is a voice that was separate and stops being separate: the second part doubles the first part in the middle of a phrase and does not return.'),
 'CB-013': dict(name='Halo Effect', category='HARMONY',
   element="One voice's consonance imposed on the whole chord",
   rides='register: Imaginary', reason='A single favourable impression colours every later judgement. The chord is voiced so that one line is consonant with the bass and the inner parts are bent to agree with it rather than with each other.'),
 'CB-014': dict(name='In-Group Bias', category='TEXTURE',
   element='Two groups with incompatible tuning or articulation',
   rides='register: Symbolic', reason='Tribalism is not disagreement about content but about the terms of playing. Two subsets of the ensemble articulate differently, and neither adapts; the split is audible before any dissonance is.'),
 'CB-016': dict(name='Peak-End Rule', category='DYNAMICS',
   element='Loudest bar and final bar marked, middle levelled',
   rides='trauma', reason='An experience is judged by its peak and its end. The dynamic profile of a scene is flattened except at its maximum and its last bar, so the shape a listener retains is the shape the rule predicts.'),
 'CB-019': dict(name='Negativity Bias', category='INTERVALS',
   element='Dissonances sustained, consonances passed through',
   rides='trauma', reason='Negative events weigh more. Holding every dissonant interval to its full value while consonances are taken as passing notes weights the same material without adding any.'),
 'CB-022': dict(name='Choice-Supportive', category='HARMONY',
   element='Retrospective reharmonisation of a phrase already heard',
   rides='entropy', reason='The bias is remembering a choice as better than it was. Restating an earlier phrase with its harmony improved, rather than as first heard, is that operation in sound and is checkable against the first statement.'),
 'CB-023': dict(name='Ostrich Effect', category='TEXTURE',
   element='Registral gap where a voice should answer',
   rides='register: Real', reason='Ignoring information is not silence but a hole in a specific place. The answering voice does not enter, and the gap sits in the register the answer would have occupied.'),
 'CB-024': dict(name='Outcome Bias', category='HARMONY',
   element='Cadence justified after the fact by its resolution',
   rides='register: Symbolic', reason='Judging the decision by the result. A progression that was irregular resolves conventionally, and the conventional resolution is what a listener remembers about the progression.'),
 'CB-025': dict(name='Zero-Risk Bias', category='HARMONY',
   element='Complete triad preferred over a richer incomplete voicing',
   rides='entropy', reason='A small certainty preferred to a large probability. The voicing takes the closed, fully stated triad in place of an open voicing that would carry more and risk more.'),
 'CB-027': dict(name='Planning Fallacy', category='RHYTHM',
   element='Phrase begun at a tempo it cannot finish in',
   rides='entropy', reason='Underestimating time. The phrase is set out at a rate that requires a rallentando or an extra bar to complete, and the correction is the audible content.'),
 'CB-028': dict(name='Representativeness', category='MELODY',
   element='Figure treated as a familiar type and completed wrongly',
   rides='register: Imaginary', reason='Stereotyping probability. A motif whose opening resembles a common figure is continued as that figure rather than as itself, so the listener hears the category override the particular.'),
 'CB-029': dict(name='Information Bias', category='TEXTURE',
   element='Accumulating countermelodies that change no decision',
   rides='entropy', reason='Seeking more information than can be used. Voices are added, each idiomatic, none altering the harmonic path; the texture thickens and the argument does not move.'),
}

# Fourteen domain assignments, per decision 7. The Atlas defines the domains as
# input filter, storage, risk calculation and network conformity, and each
# assignment below is made on that definition and nothing else.
DRAFT_DOMAINS = {
 'CB-017': ('PERC', 'Framing acts on how the datum is presented, before any calculation. The input layer.'),
 'CB-018': ('DEC', 'Status quo bias is a weighting of the default option in the calculation of risk, not a filter on what arrives.'),
 'CB-019': ('PERC', 'Negativity bias weights incoming events by valence at the point of intake.'),
 'CB-020': ('SOC', 'The bandwagon effect is conformity to the observed behaviour of others. The network layer.'),
 'CB-021': ('MEM', 'The blind spot is a failure in the account one holds of oneself, which is the storage layer, not the filter.'),
 'CB-022': ('MEM', 'Choice-supportive bias rewrites the record of a past decision. Storage.'),
 'CB-023': ('PERC', 'The ostrich effect is a refusal at intake: the information is available and is not taken in.'),
 'CB-024': ('MEM', 'Outcome bias re-reads a past decision in the light of its result. Storage, not calculation.'),
 'CB-025': ('DEC', 'Zero-risk bias is a distortion of the probability calculation itself.'),
 'CB-026': ('MEM', 'Recency is a weighting of the store by age.'),
 'CB-027': ('DEC', 'The planning fallacy is an error in the estimate, which is the processing layer.'),
 'CB-028': ('DEC', 'Representativeness substitutes similarity for probability in the calculation.'),
 'CB-029': ('DEC', 'Information bias is a distortion of what the calculation requires before it will conclude.'),
 'CB-030': ('SOC', 'Fundamental attribution is a judgement about another agent. The network layer.'),
}


def main():
    atlas = read_atlas()
    impl = read_impl()
    impl_traits = [e['trait'] for e in impl]

    print('=' * 74)
    print('1. THE TWO SETS OF THIRTY')
    print('=' * 74)
    print(f'  Atlas entries: {len(atlas)}')
    withdom = sum(1 for v in atlas.values() if v['domain'])
    print(f'    with a domain: {withdom}   without: {len(atlas) - withdom}')
    print(f'  Implementation entries: {len(impl)}')
    print(f'    distinct traits: {len(set(impl_traits))} '
          f'(framing appears twice, positively and negatively framed)')

    mapped = {v for v in STRICT.values()}
    print()
    print('=' * 74)
    print('2. NAME MATCHING, STRICT AND LOOSE')
    print('=' * 74)
    print(f'  shared, strict: {len(STRICT)}')
    print(f'  shared, loose:  {len(LOOSE)}')
    impl_only = [t for t in dict.fromkeys(impl_traits) if t not in STRICT]
    print(f'  implementation only, strict: {len(impl_only)}')
    unmapped = [k for k in atlas if k not in mapped]
    print(f'  Atlas entries with no musical mapping: {len(unmapped)}')
    print('    ' + ', '.join(f'{k} {atlas[k]["name"]}' for k in sorted(unmapped)))

    print()
    print('=' * 74)
    print('3. THE INFLUENCE LAYER, PER DECISION 8')
    print('=' * 74)
    present = [t for t in INFLUENCE if t in impl_traits]
    print(f"  Cialdini's six present in the implementation: {len(present)}")
    for t in INFLUENCE:
        e = next((x for x in impl if x['trait'] == t), None)
        shared = ' (also matched to an Atlas entry)' if t in STRICT else ''
        print(f'    {t:14s} {e["id"] if e else "absent":10s} '
              f'{e["element"][:40] if e else "":40s}{shared}')
    print('  These are techniques applied to a subject, not distortions in one.')
    print('  They leave the bias index and become the influence layer of S3.')

    print()
    print('=' * 74)
    print('4. DRAFTED MAPPINGS, PER DECISION 7')
    print('=' * 74)
    struck = read_strikes()
    covered = set(DRAFT_MAPPINGS) | set(struck)
    assert covered == set(unmapped), (
        'the invariant is that every Atlas entry with no musical mapping is '
        'covered by a drafted mapping or by a recorded strike; these are not: '
        + str(covered ^ set(unmapped)))
    assert not (set(DRAFT_MAPPINGS) & set(struck)), (
        'these ids are both drafted and struck: '
        + str(set(DRAFT_MAPPINGS) & set(struck)))
    if struck:
        print(f'  struck by the author: {len(struck)}')
        for k in sorted(struck):
            print(f'    {k} {struck[k]}')
    print(f'  drafted: {len(DRAFT_MAPPINGS)}, and they cover exactly the '
          f'{len(unmapped)} unmapped entries')
    for k in sorted(DRAFT_MAPPINGS):
        d = DRAFT_MAPPINGS[k]
        print(f'    {k} {d["name"]:22s} {d["category"]:10s} {d["element"]}')
        print(f'{"":11s}rides on {d["rides"]}')

    print()
    print('=' * 74)
    print('5. DRAFTED DOMAINS, PER DECISION 7')
    print('=' * 74)
    nodomain = sorted(k for k, v in atlas.items() if not v['domain'])
    assert set(DRAFT_DOMAINS) == set(nodomain), (
        'drafted domains do not cover exactly the undomained entries: '
        + str(set(DRAFT_DOMAINS) ^ set(nodomain)))
    print(f'  drafted: {len(DRAFT_DOMAINS)}, covering exactly the '
          f'{len(nodomain)} entries with no domain')
    tally = {}
    for k in sorted(DRAFT_DOMAINS):
        dom, why = DRAFT_DOMAINS[k]
        tally[dom] = tally.get(dom, 0) + 1
        print(f'    {k} {atlas[k]["name"]:24s} -> {dom}')
    print(f'  drafted distribution: {tally}')
    full = {}
    for k, v in atlas.items():
        d = v['domain'] or DRAFT_DOMAINS[k][0]
        full[d] = full.get(d, 0) + 1
    print(f'  the Atlas once complete: {full}, total {sum(full.values())}')

    json.dump({'atlas': atlas, 'impl': impl, 'strict': STRICT,
               'draft_mappings': DRAFT_MAPPINGS, 'draft_domains': DRAFT_DOMAINS,
               'influence': INFLUENCE},
              open(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                's3_bias_reconciliation.json'), 'w'), indent=1)
    print()
    print('  wrote s3_bias_reconciliation.json')
    return 0


if __name__ == '__main__':
    sys.exit(main())
