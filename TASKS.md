<!-- verified: 2026-09-11 9932e9d -->
# Tasks

_Last brought current: 2026-09-11 by the Claude Code session, verified against main at `9932e9d` (PR #28 merged 2026-09-11 14:52 -0500). The HTML comment on line 1 is machine-read by `web/scripts/audit-tasks-stamp.mjs` and `scripts/hooks/`; update it every time this file is brought current._
_Counts here are checked against `web/src/lib/wikiRegistry.ts`, not typed from memory._
_Memory of record (decided 2026-09-11): this file and `memory/` at the repo root. `.taskmaster/`, `.remember/`, `.claude/memory.db`, `.swarm/` and the gateway's `memory_store` are tool caches, not sources. Rules: `memory/context/working-agreement.md`._

## Active

- [ ] **Nine papers exist on disk in neither registry** - measured 2026-09-11: `wikiRegistry.ts` still holds 63 documents across 9 groups, while `references/` carries `WG-10-Assurance-Network/` (5 treatises), `WG-06-CRA-Product-Assurance/` (1), and `WG-05-CAD-Kinetic-Blast-Radius.md` + `WG-05-CAD-Multigraph-Engine.md`. Three of those are in `papers.ts` but not `wikiRegistry.ts`, which is why `registry.test.ts` fails 66 against 63; the five WG-10 treatises are in neither, so they are unreachable on the site. Until this closes, the working tree fails the unit tests and the pre-push hook blocks every push
- [ ] **Unverifiable figures in the CRA supply-chain paper** - left in deliberately by the 2026-09-11 fact-check because fixing them means choosing replacement numbers, which is the working group's call. The thermal claim is arithmetically impossible (4.5 °C/s over 14.8 s against a 94 °C trip implies a 27.4 °C start for a 1,200 W package); Dittus-Boelter is evaluated in the laminar regime to derive the 78 % drop; cavitation is attributed to secondary-loop pressure rather than NPSH margin; `Pr ≈ 18.5` at 35 °C for PG25 against an independent estimate near 10; "over two hundred suppliers", the $10M to $50M deductible band and the eighteen-month OpenSIL transition are unsourced; `P_chain` "asymptotically approaches 1.0 (100% certainty)" is neither certainty nor derivable without θ, which the paper never assigns; and one stray "five non-negotiable principles" survives in the conclusions
- [ ] **WG-06 CRA paper corrections are uncommitted** - 10 fixes applied to `references/WG-06-CRA-Product-Assurance/WG-06-CRA-Product-Assurance.md` on 2026-09-11 and deliberately not committed, because the file belongs to a concurrent session. Includes a justification value absent from the CycloneDX enum that contradicted the paper's own Requirement S-3, a VEX state vocabulary wrong for both CycloneDX and CISA, firewalls filed under Annex III class I where they are class II, and an adoption date that contradicted the paper's own reference [1]. Detail in `notes/2026-09-11/change-ledger.md` U2. Whoever commits that paper should carry them
- [ ] **`audit-rendered-completeness.js` can only ever test port 4500** - `run-audits.mjs` reads `AUDIT_BASE_URL` for its server probe but never forwards `--base` to the audit, which hardcodes `http://localhost:4500`. So the audit cannot be pointed at a git worktree's own dev server, and it reports false failures whenever the tree under test differs from whatever is serving 4500. Cost two verification cycles on 2026-09-11
- [ ] **The `/tracks` header is hardcoded English on a bilingual site** - eyebrow "Research Programme & Working Group Output", h1 "Sovereign Research Tracks" and the body paragraph do not use `t()` (`web/src/app/tracks/page.tsx` lines 66-75, still true after `62729f8`). Switching to NL leaves the header English while the nav translates
- [ ] **Wire PretotypeExperimentModal** - bound to `useContactForm`, imported by no page (re-verified 2026-09-11: 0 importers)
- [ ] **Triage the 23 untracked files** - `web/AGENTS.md` and `web/CLAUDE.md` (written by `next dev`; the AGENTS.md block says commit it to keep the tree clean), `.env.example`, `.stitch/designs/` (three Stitch page designs + preview/console HTML, 2026-09-09), `assets/backgrounds/` extraction material, and new `papers-pre-publish/` drafts (TACAM x5, DEXPI 2 x6, ATQ-1, CDT-7). Decide commit / ignore / move for each; nothing should sit untracked for a week
- [ ] **`feat/what-eigenia-does`** - branch cut from main, 0 commits, no local edits. State its intent here or delete it
- [ ] **Home page: Stitch delta note** - `notes/<date>/home-stitch-delta.md` from `.stitch/designs/b89d8258…_home_unified_engagement.html` against `web/src/app/page.tsx`, per working-agreement §3; then one PR per section, hero first

## Waiting On

- [ ] **Confirm production after the 2026-09-10 deploys** - main has moved four merges past #18 (#21 next 16 + postcss, #23 nodemailer 9.1.1, #24 contact-endpoint validation and rate limiting, #26 vitest 4.1.11). Check on eigenia.nl: `9 Research Tracks` on the homepage, `ISO 15926-4` on `/unified-standard`, the contact form still delivers to jim@eigenia.nl after #24

## Someday

- [ ] **Sync the duplicated atq-card-terminal.html** - two copies, currently byte-identical; nothing keeps them that way
- [ ] **Decide on eigenia.com** - named in the Impressum, still referenced once in `site.ts`, not wired
- [ ] **Dutch treatise bodies** - 63 documents; a content project, deliberately deferred
- [ ] **Component tests** - zero component test files; nothing renders React and asserts on output, so the browser check stays mandatory
- [ ] **Spelled-out counts** - `audit-counts.mjs` matches digits only, so "nine Research Tracks" would pass
- [ ] **Stale local branches** - 17 local branches, most merged (deps/*, fix/*, feat/ascii-to-mermaid, docs/readme-accuracy, chore/taskmaster-tracking, pr1-local, probe/next16). Prune after confirming each is merged

## Done

### 2026-09-11
- [x] **31 verified CRA errors corrected in the supply-chain paper** (#27, #28) - `WG-05-CAD-Supply-Chain-EU-CRA.md`. Annex IV was labelled "Important Class II", so the Critical designation was absent and Annex III's class II erased; HSMs and smart meter gateways sat in the wrong tier; PLCs and "industrial automation systems" were listed in Annex III where neither string occurs in the Regulation; HBOMs were described as mandated, a word that appears nowhere in it; Article 64 paragraph numbers were off by one throughout; the flagship VEX example used a CSAF justification absent from the CycloneDX enum, so it would fail the schema the document itself declares; a fabricated CVE carried an NVD URL resolving to nothing; Lloyd's Y5381 was attributed to the wrong body. Verified against the authentic OJ text, edited in `scripts/compile_p03_supply_chain_cra.py` because it owns the file, compiler idempotent, live on eigenia.nl and checked before-and-after
- [x] **Three errors I introduced, then corrected** (#27) - the first pass added a fabricated "stricter category governs" rule that exists in neither instrument, miscounted the statutory designations as three where the Regulation names two, and attributed the open-source carve-out to Article 2, which never mentions it. All three came from trusting a secondary source over the text. Found by an adversarial re-check that was given the artifact and the question but never my conclusion
- [x] **Memory of record shipped and enforced** (#27) - `TASKS.md` plus `memory/`, imported into `CLAUDE.md`; SessionStart, Stop and PreToolUse hooks; `audit-tasks-stamp.mjs` failing on a stale stamp, verified to skip loudly in a simulated Docker layout where `TASKS.md` is not copied
- [x] **A measured change apparatus** - `notes/2026-09-11/census.mjs` snapshots every registry field and hashes every file under `references/`; `census-diff.mjs` gates a phase against a whitelist and carries an 11-case self-test proving it catches a retitle, a moved path, a deleted document, a truncated file and a dropped `titleNl`. It separated my six changes from six concurrent ones automatically, and disproved two of my own design assumptions before I acted on them. Cycle and evidence in `change-cycle.md` and `change-ledger.md`

### 2026-09-10
- [x] **Dependency and hardening PRs** (#21, #23, #24, #26) - next ^16.3.4, nodemailer ^9.1.1, vitest ^4.1.11; `/api/contact` now validates and rate-limits (`0b92c11`)
- [x] **Dependabot sharp PR #1** - overtaken: `package.json` now carries sharp ^0.35.4 via `deps/next-sharp-security` (merged into main)

### 2026-09-09
- [x] **Merge PR #19** (`2ba29ab`) - six dead components deleted, `audit-translation-keys.mjs` added
- [x] **Railway deploy of #17 and #18** - superseded by the 2026-09-10 deploys; verification moved to Waiting On
- [x] **ASCII art to mermaid** (#12, #13) - 51 fenced diagrams converted or retired; 91 mermaid diagrams now, all carrying `accTitle`/`accDescr`; `audit-ascii-art.mjs` added with a keep-list for the four deliberate exceptions
- [x] **README corrected** (#14) - said 25 treatises across 8 working groups against a real 63 and 9; directory tree rebuilt; gates documented; `localhost:3000` corrected to 4500
- [x] **Taxonomy unified** (#15, #17) - `paper.category` (51 of 63 contradicting their group) and `paper.number` (41 of 63) deleted; `Track N //` labels removed; convention settled as **Research Track = the section and route, Working Group = the entity**
- [x] **Two new gates** (#17) - `audit-terminology.mjs` extended to `web/src`, `audit-counts.mjs` added; between them they found 7 bare `ISO 15926` mentions and 2 stale counts on first run
- [x] **Railway build fix** (#18) - `audit-counts.mjs` compared paths literally and broke the Docker build while CI stayed green
- [x] **Task Master registry committed** (#16) - `.taskmaster/` in the repo
- [x] **Decide the four memory systems** - decided 2026-09-11: memory of record moved **into the repo** (`TASKS.md`, `memory/`, working-memory block in `CLAUDE.md`) so Claude Code auto-loads it, hooks enforce the write, and CI checks the stamp; `projects-bundle/eigenia-website` is now a pointer
- [x] **Land the uncommitted work** - was clean on 2026-09-09; 23 new untracked files since, tracked above as "Triage the 23 untracked files"
