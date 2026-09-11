<!-- verified: 2026-09-11 f655255 -->
# Tasks

_Last brought current: 2026-09-11 by the Cowork session, verified against main at `f655255` (2026-09-10 15:41 -0500). The HTML comment on line 1 is machine-read by `web/scripts/audit-tasks-stamp.mjs` and `scripts/hooks/`; update it every time this file is brought current._
_Counts here are checked against `web/src/lib/wikiRegistry.ts`, not typed from memory._
_Memory of record (decided 2026-09-11): this file and `memory/` at the repo root. `.taskmaster/`, `.remember/`, `.claude/memory.db`, `.swarm/` and the gateway's `memory_store` are tool caches, not sources. Rules: `memory/context/working-agreement.md`._

## Active

- [ ] **The `/tracks` header is hardcoded English on a bilingual site** - eyebrow "Research Programme & Working Group Output", h1 "Sovereign Research Tracks" and the body paragraph do not use `t()` (`web/src/app/tracks/page.tsx` lines 66-75, still true after `62729f8`). Switching to NL leaves the header English while the nav translates
- [ ] **Wire PretotypeExperimentModal** - bound to `useContactForm`, imported by no page (re-verified 2026-09-11: 0 importers)
- [ ] **Triage the 23 untracked files** - `web/AGENTS.md` and `web/CLAUDE.md` (written by `next dev`; the AGENTS.md block says commit it to keep the tree clean), `.env.example`, `.stitch/designs/` (three Stitch page designs + preview/console HTML, 2026-09-09), `assets/backgrounds/` extraction material, and new `papers-pre-publish/` drafts (TACAM x5, DEXPI 2 x6, ATQ-1, CDT-7). Decide commit / ignore / move for each; nothing should sit untracked for a week
- [ ] **`feat/what-eigenia-does`** - branch cut from main, 0 commits, no local edits. State its intent here or delete it
- [ ] **Push `chore/memory-enforcement` and open the PR** - branch is prepared in the working tree (Cowork could not commit: `.git/index.lock` cannot be removed from its shell). Jim: `rm .git/index.lock`, `git checkout -b chore/memory-enforcement`, `git add -A -- TASKS.md memory CLAUDE.md .claude/settings.json .gitignore scripts/hooks web/scripts/audit-tasks-stamp.mjs .github/workflows/ci.yml documentation/TESTING.md`, commit, push, PR
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
