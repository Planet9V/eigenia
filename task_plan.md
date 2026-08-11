# Task Plan: Eigenia Sovereign Research Wiki & Working Group Migration

## Goal
Implement a complete, zero-omission Research Wiki Engine based on `howto_wiki.md` for Eigenia's 25 published treatises across 8 Lab Working Groups (`WG-01-UI`, `WG-02-DT`, `WG-03-ML`, `WG-04-CF`, `WG-05-CAD`, `WG-07-TM`, `WG-08-MO`, `MP-MATH`), replacing single-paper routes with a 2-column sliding accordion TOC dashboard and instant live search.

## Phases
- [x] Phase 1: Complete Inventory & Data Registry (`web/src/lib/wiki.ts`)
- [x] Phase 2: Wiki Engine UI Stack (`web/src/app/wiki/page.tsx`, `web/src/components/wiki/*`)
- [x] Phase 3: Working Group Bento Hub (`web/src/app/tracks/page.tsx`)
- [x] Phase 4: KaTeX & Untruncated Article Rendering Engine
- [x] Phase 5: Build Verification & Deployment Test

## Audit Matrix (25 Documents / 8 Working Groups)
| Working Group ID | Working Group Name | Document Count | Color Token | Status |
| :--- | :--- | :--- | :--- | :--- |
| `MP-MATH` | Mathematical Physics Models | 2 | `cyan` | Complete |
| `WG-01-UI` | Actuarial & Underwriting | 9 | `emerald` | Complete |
| `WG-02-DT` | Digital Twin & Taleb Series | 7 | `violet` | Complete |
| `WG-03-ML` | Psychometrics & Behavioral Modeling | 1 | `rose` | Complete |
| `WG-04-CF` | Cascading Failures | 2 | `amber` | Complete |
| `WG-05-CAD` | DEXPI 2.0 & CAD Interoperability | 1 | `sky` | Complete |
| `WG-07-TM` | Threat Modeling & TACAM Matrix | 2 | `orange` | Complete |
| `WG-08-MO` | Monte Carlo Engine Application | 1 | `indigo` | Complete |

## Errors Encountered
| Error | Attempt | Resolution |
| :--- | :--- | :--- |
