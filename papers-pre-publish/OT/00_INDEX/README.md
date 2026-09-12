# OT engineering material

Migrated 2026-09-12 from the MPN snapshot, where it had been sitting inside the McKenney-Lacan archive. Every file was copied, never moved, and the archive remains byte-identical to its pre-migration state. 114 files, 108 distinct pieces of content, 30 MB. Hash-verified: every source file is present here.

The reference copy stays at
`MPN/09_SNAPSHOTS/mckenney_lacan_dec_12_2025_Archive/06_mckenney_lacan_theory_application/`.

## Structure

| Folder | Contents |
|:---|:---|
| `00_INDEX` | This file and `FILE-MANIFEST.csv`, one row per file with size and sha256 |
| `01_STANDARDS_REFERENCE` | The IEC 62443 technical references and complete guides, the reference guide, information requirements, ZCR visualisation guide, CSMS template, asset criticality and SL-T determination, the 62443 diagram, the ISA57X rail 2026 update, and the Perplexity compliance note |
| `02_REQUIREMENTS` | The seven foundational requirement compliance sets for TVCS at SL-T 3, covering FR1 identification and authentication through FR7 resource availability, plus the 4-2 component requirements and the comprehensive SR requirements |
| `03_WORKBOOKS` | Asset control SR and FR specification workbook, CRL checklist, TS 50701 mapped requirements, the cyber artifact criticality list of October 2025, and the MITRE to IEC control mapping |
| `04_CRL_ENGAGEMENT` | The CRL complete guide v2 as PDF, the artifacts guide, and the four workshop day one deliverables including the client workshop document, the presentation and the HTML build |
| `05_PLATFORM_PRD` | The SaaS platform workshop PRD, the MVP PRD with its database schema and data model, both docker deployment guides, the testing and QA plan, the Railway TS 50701 PRD, the workshop technical reference, the API development note and the CSET swarm context |
| `06_3D_VISUALIZATION` | The Babylon application design, model and asset libraries, the libraries primer, the React Babylon workshop visualisation, UI and UX enhancement notes, and the 3D stack feasibility study |
| `06_3D_VISUALIZATION/assets` | The April 2019 Train Pack: 28 OBJ, 14 FBX and 15 Blender files |
| `08_SITE_DATA` | Two client data documents: the power plant equipment and systems inventory, and the water treatment facilities data request |

## Notes

The two site data documents are client-facing engineering records rather than standards material, which is why they sit apart from the reference folder.

Several files arrived without extensions or with spaces and equals signs in their names. They have been left under their original names so that any existing reference to them still resolves.

`IEC-62443-Complete-Technical-Reference` exists in four variants: the base file, a numbered copy, a dated October 2025 version initialled jtm, and an underscored spelling. They are not byte-identical. Nothing has been merged or discarded; pick the authoritative one when you next work on that document.
