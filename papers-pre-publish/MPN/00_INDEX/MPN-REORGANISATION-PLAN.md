# MPN folder: what is actually there, and how to organise it

Analysis of `eigenia/papers-pre-publish/MPN`, 2026-09-12. 762 files, 111 MB.

## 1. The duplication, measured

131 groups of byte-identical files, 165 redundant copies, 17 MB reclaimable. One cause accounts for nearly all of it: **`mckenney-lacan-calculus-2025-11-28` exists three times.** Once at the MPN root where the Drive zip extracted, once inside `mckenney-lacan-theory/`, and once still compressed as the 14 MB zip. Every score CSV, every play text and both 6 MB background documents are duplicated on that basis alone.

Against that, only **8 filenames carry different content in different places**, and most are benign: `06_mckenney_lacan_unified_theory copy` against its original, `README.md` in five unrelated folders, `COMPLETION_REPORT.md` for biases against the one for personality frameworks. Three deserve a look before anything moves: `00_Unified_Theory_Master_Index.md`, `02_Vol_II_Kinematics.md` and `91_Archive_Master_Syllabus.md`, each of which differs between the unified-theory folder and its copy.

So this is a clean problem. The tree looks chaotic but it is one folder triplicated plus a small number of real versions.

## 2. What the archive changes

`mckenney_lacan_dec_12_2025_Archive` is 41 MB, 370 files, **zero Drive stubs**. It holds as real markdown everything the live tree holds only as pointers: the 45 bias documents, the 53 personality frameworks, the unified theory, the Lacanian reference library, the cyber use cases. For that material the archive is the authoritative copy and the live tree is empty shelving.

It also contains material that is not MPN at all: the IEC 62443 and TS 50701 work, the CRL workshop days, the CSET reference data, and a Blender training pack of 15 `.blend`, 14 `.obj`, 14 `.mtl` and 14 `.fbx` files. That belongs with your OT security work, not in a music theory folder, and moving it out will remove a large fraction of the bulk without touching anything relevant.

## 3. The constraint that shapes the method

The bridge to your machine cannot delete files. `rm` returns "Operation not permitted" by design. Everything I do has to be a move.

That is the right method anyway for this job. Nothing gets deleted, superseded copies go to a quarantine folder with a manifest, and you delete that folder yourself once you are satisfied. There is no step at which work can be lost by my hand.

## 4. Proposed structure

Numbered so that sort order is reading order, and split by function rather than by when a folder happened to be created.

```
MPN/
  00_INDEX/              the map, the file manifest, DRIVE-STUB-INDEX.csv, the task registry
  01_THEORY/
     01_core/            the 22 core calculus documents
     02_primers/         the 10 mathematical primers
     03_unified/         the unified theory volumes
     04_background/      the four background works, markdown preferred, docx retained
  02_BIASES/             the 45 NER-annotated documents, the executive summary, the completion report
  03_PERSONALITY/        the 53 personality framework documents
  04_NOTATION_ENGINE/    notation system, GNN engine, symphonic score JSON, Neo4j schema, API spec
  05_DATA/
     01_scores/          the 7 play scores and the Salesman beats
     02_source_texts/    the play texts the scores were generated from
     03_generators/      batch_process_classic_plays.py and the Salesman scripts
  06_APPLICATIONS/
     01_cycle/           the 10 cycle application documents
     02_predictive/      the 5 predictive application documents
     03_use_case_cyber/  corporate personality assessments, psychohistory demographics
  07_LACANIAN_REFERENCE/ the reference library
  08_PAPERS/             S1, the MPN series, citation ledgers, QA reports, reviews
  09_SNAPSHOTS/          dated archives kept whole and read-only
  _attic/                every superseded copy, with MANIFEST.csv. Nothing deleted
  _relocate/             the IEC 62443, CRL, CSET and Blender material, for you to move out
```

Two properties worth naming. `05_DATA` separates the scores, their source texts and the generator that links them, because that triple is the empirical asset and it is currently scattered across two copies of one folder. And `08_PAPERS` separates output from source, so that what I write never again gets mistaken for what you wrote.

## 5. Execution protocol

1. **Manifest first.** Every file hashed and recorded with path, size and sha256 before anything moves. Written to `00_INDEX/FILE-MANIFEST-before.csv`.
2. **Canonical copy chosen by rule**, not by taste: for each duplicate group, the copy in the deepest curated folder wins, and the loose root-level extraction loses. Recorded per group.
3. **Moves only.** Superseded copies are moved to `_attic/` preserving their original relative path, so any move is reversible by reading the manifest.
4. **The 8 version conflicts are not touched.** They are listed for you with a diff summary, and they stay where they are until you say which wins.
5. **Verification pass.** Re-hash everything after the moves and prove that every sha256 present before is still present somewhere. If any hash is missing the run has failed and I say so.
6. **Nothing truncated.** No file is edited, rewritten, summarised or regenerated. Only moved.
7. **The zip stays** until you have confirmed the extracted copy is intact, then it goes to `_attic/`.

## 6. What I would not do without you

Delete anything, including from `_attic`. Resolve the 8 version conflicts. Move the IEC 62443 and Blender material out of the MPN tree rather than into `_relocate/`, since I do not know where your OT work lives. Touch the archive's internal structure, which I would keep whole inside `09_SNAPSHOTS/` as a dated read-only record even though its content also appears in the live folders.

## 7. The one judgement I would ask you to make first

The archive holds the only real copies of the biases, the personality frameworks and the unified theory. Two options, and they lead to different trees.

**Promote.** Copy that material out of the archive into `02_BIASES`, `03_PERSONALITY` and `01_THEORY/03_unified`, and keep the archive whole in `09_SNAPSHOTS` as the dated record. The working tree then holds everything live and the archive is history. This is what I would do.

**Reference.** Leave it in the archive and point at it. Less movement, but the working tree stays full of empty shelves where the Drive stubs are, and every future search has to know to look in two places.

Say which, and whether to run the protocol, and I will do it and give you the before and after manifests.
