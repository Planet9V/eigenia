#!/usr/bin/env python3
"""
The carry-over manifest: what survives from the two proof-of-concept codebases.

S1 to S4 audited the MPN Conductor and mpn_engine as experiments. This script
produces the manifest the rebuild works from. It does not re-derive the audit
findings, which are in the papers; it establishes that each named artefact
still exists at the path the manifest gives, measures how big it is, and
prints the verdict beside it so a reader can check the file rather than the
claim.

Every verdict traces to a paper section or to a named generator. The verdict
vocabulary is fixed:
  PORT      sound, and the rebuild takes it
  REPAIR    sound in design, defective as shipped; the defect is named
  REWRITE   the idea survives, the implementation does not
  DROP      does not travel

Set MPN_REPO to the Conductor working tree.
"""
import os
import sys

ROOT = os.environ.get('MPN_REPO', '/home/claude/mpn-conductor-standalone')

MANIFEST = [
    # (path, verdict, what it is, warrant)
    ('src/lib/deterministic.ts', 'PORT',
     'Keyed RNG: rand, randInt, randRange, chance, pick, characterKey, '
     'frameKey, SEED_ALGORITHM_VERSION',
     'S4 s7: 11 keyed draws and 11 key constructions on the score path, '
     '0 unseeded draws reachable from a rendered score'),
    ('src/components/mpn-lab/leitmotif_generator.ts', 'REPAIR',
     'Motif generation, 8 transformations, selectTransformation',
     'S4 s5.1: all 8 transformations audible; retrograde_inverted is '
     'bit-identical to inverted and unreachable from the selector; '
     'selectTransformation never reads rsi.symbolic'),
    ('src/components/mpn-lab/psychometric_calculus.ts', 'REWRITE',
     'psychometricToMusical, analyzeRSI, rsiToMode, the MODES constant',
     'S3 s2.3 and S4 s4.5: analyzeRSI is a keyword count over the author\'s '
     'own prose; rsiToMode and MODES are dead'),
    ('src/components/mpn-lab/score_orchestrator.ts', 'REPAIR',
     'Frame to score orchestration, stave activation and decay',
     'S3 S3-1: OrchestratorOutput.global has no mode field and an as-any '
     'cast hides it. S4 s5.1: the per-frame decay of 0.1 is undocumented'),
    ('src/components/mpn-lab/GeniusComposer.ts', 'REPAIR',
     'Melody and ensemble composition from the state',
     'S3 S3-2: composeMelody passes a literal register triple at line 161 '
     'instead of the state'),
    ('src/components/mpn-lab/mpn_reference_data.ts', 'REPAIR',
     'Tempo, metre and dynamics lookups, and the 30 bias mappings',
     'S3 S3-3, S3-5, S3-6: dynamics has 3 entries where decision 6 makes 8 '
     'normative; metre leaves entropy 0.5 to 0.6 uncovered; the 3 tempo '
     'ranges reach 35 of the 141 integer tempi they span'),
    ('src/lib/leitmotif_transformation_rules.ts', 'REPAIR',
     'Fragmentation and density ladders, and the trauma switch',
     'S3 S3-4: the shipped A8 pair is the superseded, correlated one. '
     'S3-8: the trauma switch gives the Imaginary a partner, against '
     'decision 4'),
    ('src/components/mpn-lab/score_exporter.ts', 'REPAIR',
     'MIDI, MP3 and PDF export',
     'S4 s5.1: MIDI and MP3 are real; the PDF export is a text report '
     'through jsPDF at line 405, not notation'),
    ('src/components/mpn-lab/literary_data.ts', 'PORT',
     '119 frames: author prose, chord annotations, trauma and entropy',
     'S4 s4.5: trauma and entropy are the author\'s literals, not the '
     'analyser\'s. They are the only human judgements in the programme'),
    ('src/components/mpn-lab/additional_plays.ts', 'PORT',
     '113 frames, same structure',
     'S4 s4.5, with literary_data.ts: 232 frames in total'),
    ('mpn_engine/core/tonnetz.py', 'REPAIR',
     'The neo-Riemannian P, L, R and PLP operators',
     'S4 s2.3: transform_L moves the root by a semitone and preserves no '
     'common tone; the group it generates agrees with the published one on '
     '50.0 per cent of ordered chord pairs'),
    ('mpn_engine/core/mpn_calculus.py', 'DROP',
     'trauma_R, entropy_H, baseline_B, arrhythmia, health score',
     'S4 s4.3: trauma is 99.4 per cent row position. S4 s4.2: the clinical '
     'health score is trauma inverted onto ten points'),
    ('mpn_engine/core/dynamics_mapper.py', 'DROP',
     'OCEAN to dynamics mapping',
     'S4 s2.1: zero use sites for every entry point. S4 s2.2: every factor '
     'is confined to [0.5, 1.0], so no character can score below the '
     'midpoint on any factor'),
    ('mpn_engine/core/instrument_mapper.py', 'DROP',
     'DISC to instrument mapping',
     'S4 s2.1: zero use sites for infer_profile_from_text and get_ensemble'),
    ('mpn_engine/text/dialogue_parser.py', 'REWRITE',
     'Speaker and line extraction from a play text',
     'S4 s3.3: it emitted SPEAKER=STAGE on 3,424 of King Lear\'s 3,425 rows'),
    ('src/components/mpn-lab/ConductorScoreVexFlow.tsx', 'PORT',
     'VexFlow multi-stave notation rendering',
     'S4 s8: the interactive application renders and plays, and that works'),
    ('docker-compose.yml', 'DROP',
     'Deployment compose file',
     'S4 S4-1: carries a plaintext API key at line 26 in all 36 commits'),
    ('ml/psychoscore_v2', 'DROP',
     'PSYCHOSCORE v1 and v2 training and inference',
     'S4 s6: v1 trained on uniformly random target tokens; v2 silver labels '
     'are a model\'s reaction to an error string; the performance loop is a '
     'placeholder; the 57-to-768 projector is computed and discarded'),
    ('src/components/mpn-lab/MPNExperiment_DialecticGraph.tsx', 'DROP',
     'One of 15 visualisations',
     'S4 s6.1: decorative. 10 of the 15 use unseeded draws and differ run '
     'to run'),
]

print('=' * 78)
print('CARRY-OVER MANIFEST: WHAT SURVIVES THE TWO PROOFS OF CONCEPT')
print('=' * 78)
print(f'  tree: {ROOT}')
print()
counts = {}
missing = []
for path, verdict, what, warrant in MANIFEST:
    full = os.path.join(ROOT, path)
    counts[verdict] = counts.get(verdict, 0) + 1
    if os.path.isdir(full):
        n = sum(len(f) for _, _, f in os.walk(full))
        size = f'{n} files'
    elif os.path.exists(full):
        lines = sum(1 for _ in open(full, encoding='utf-8', errors='replace'))
        size = f'{lines:,} lines'
    else:
        size = 'NOT FOUND'
        missing.append(path)
    print(f'  [{verdict:7s}] {path}')
    print(f'{"":12s}{size}')
    print(f'{"":12s}{what}')
    print(f'{"":12s}warrant: {warrant}')
    print()

print('=' * 78)
print('TALLY')
print('=' * 78)
for v in ('PORT', 'REPAIR', 'REWRITE', 'DROP'):
    print(f'  {v:8s} {counts.get(v, 0):2d}')
print(f'  {"total":8s} {len(MANIFEST):2d} artefacts named')
if missing:
    print()
    print('  NOT FOUND at the stated path, so the manifest is stale:')
    for m in missing:
        print(f'    {m}')
    sys.exit(1)
print()
print('  Every artefact named above exists at the path given. The manifest is')
print('  a statement about what the rebuild takes, not a plan for repairing')
print('  the proofs of concept in place: the REPAIR verdict means the design')
print('  survives and the named defect is fixed in the new implementation.')
