# OT material migration: ordered plan

Source: `MPN/09_SNAPSHOTS/mckenney_lacan_dec_12_2025_Archive/06_mckenney_lacan_theory_application/`
Destination: `eigenia/papers-pre-publish/OT/`
Method: copy. The archive keeps its reference copy and is never modified.

## Steps

| # | Step | Verification |
|:--|:---|:---|
| 0 | Pre-flight manifest: hash every source file under `06_mckenney_lacan_theory_application`, excluding `Music/`, which is MPN and already promoted | Source count and distinct hash count recorded |
| 1 | Create the OT structure, eight folders | All directories exist |
| 2 | Copy the standards reference: IEC 62443 technical references, complete guide, information requirements, ZCR visualisation guide, CSMS template, ISA57X rail update | File count matches source selection |
| 3 | Copy requirements data: the seven FR compliance CSVs, the 4-2 component requirements, the comprehensive SR requirements | 9 files |
| 4 | Copy the workbooks: asset control spec workbook, CRL checklist, TS 50701 mapped requirements, cyber artifact criticality list, MITRE to IEC mapping | 5 files |
| 5 | Copy the CRL engagement: artifacts guide, complete guide v2 PDF, the four workshop day one files | 6 files |
| 6 | Copy the platform PRDs: SaaS platform, MVP, database schema, docker deployment, testing and QA plan, Railway, workshop technical reference | 8 files |
| 7 | Copy the 3D visualisation work and its asset pack: Babylon app, model library, asset library, primer, UI/UX, React workshop visualisation, feasibility study, and the Train Pack of 28 OBJ, 14 FBX and 15 Blends | 8 documents plus 59 assets |
| 8 | Copy the architecture documents and the remaining reference: water treatment data request, power plant inventory, CSET swarm context, Perplexity notes, unclassified remainder | Remainder reaches zero |
| 9 | Hash verification: every distinct content hash in the source must be present in the OT folder | Zero missing, or the run has failed |
| 10 | Write `OT/00_INDEX/README.md` and the manifest | Files exist |
| 11 | Confirm the archive is byte-identical to its pre-migration state | Zero hashes changed in the snapshot |

## Rules

Copy only; no source file is moved, edited or deleted. Any file not confidently classified goes to `07_UNSORTED` rather than being guessed at, and step 8 reports the remainder so nothing is silently dropped. The archive is read-only throughout.
