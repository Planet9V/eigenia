# Working agreement — Eigenia website (2026-09-11)

Decided by Jim on 2026-09-11. Applies to every session, Cowork or Claude Code, that touches eigenia.nl.

## 0. How this is enforced (not by asking nicely)
- **Read**: `CLAUDE.md` imports `@TASKS.md`; a `SessionStart` hook (`scripts/hooks/session-start.mjs`) prints the Active list, the stamp and the tree state into context every session.
- **Write**: a `Stop` hook (`scripts/hooks/stop-check.mjs`) refuses to let a session end when tracked files changed or commits landed and `TASKS.md` was not touched.
- **Gateway demoted**: a `PreToolUse` hook denies `mcp__super-intelligence__memory_store`; the `graph_*` and `memory_search` tools stay allowed.
- **Staleness fails CI**: `web/scripts/audit-tasks-stamp.mjs` fails when the stamp is missing, not a real commit, more than 15 commits behind `HEAD`, or older than 7 days. Skips loudly in the Docker image, where `TASKS.md` is not copied.
- Hooks live in `.claude/settings.json` (tracked) and apply to every Claude Code session in this directory.

## 1. Memory: one source of record
- **The repo root** is the memory of record (moved here 2026-09-11 so enforcement can reach it): `TASKS.md` (state, with the `<!-- verified: DATE SHA -->` stamp on line 1), `memory/` (decisions, glossary, evaluations), and the working-memory block at the top of `CLAUDE.md`, which Claude Code loads automatically. `projects-bundle/eigenia-website/` is a pointer only. Whichever session is working updates `TASKS.md` at the end of its work and stamps the "last brought current" line with the date, the session and the commit it verified against. Always read before write.
- **Repo `CLAUDE.md`** is the code contract (references/ paths load-bearing, compiler-owned files, sourcing, notes/ convention, render check). Any session touching code reads it first. It is not a status file.
- **`notes/<YYYY-MM-DD>/`** in the repo is per-session scratch and plans. Committed. Never the only copy of a decision — decisions get one line here in `memory/`.
- **Tool caches, not sources**: `.taskmaster/`, `.remember/`, `.claude/memory.db`, `.swarm/`, `ruvector.db`, the gateway's `memory_store`. Nobody reads these to learn state. See `gateway-evaluation.md`.
- Every fact written to memory carries what it was verified against (commit, file:line, or URL and date). Counts are derived from `wikiRegistry.ts`, never typed.

## 2. Session shape (both kinds of session)
1. Read `CLAUDE.md` + `TASKS.md` here, then repo `CLAUDE.md`. `git pull` main before branching (Cowork cannot fetch origin from the Mac — Jim pulls).
2. One task from Active. Branch `feat/…`, `fix/…`, `content/…`, `deps/…` from fresh main.
3. Work in small commits; plan for anything over an hour goes in `notes/<date>/<task>-plan.md` first (superpowers: brainstorming → writing-plans → executing-plans; verification-before-completion before saying "done").
4. `cd web && npm run verify`; push; PR; CI green (Audits / Unit tests / Types and build).
5. **Done = CI green + Jim signs off in the browser, light and dark, EN and NL.** Nothing is called done by an agent.
6. Merge → Railway deploys main → check production → update `TASKS.md` here (move to Done with PR number and commit).

## 3. Stitch → top-menu page, without drift (scope now: Home only)
- A `.stitch/designs/*.html` is a **design spec**, never code to paste. Stitch's own Tailwind classes, colours and fonts do not enter the repo.
- Commit the design files (they are the record of what was agreed). Then write `notes/<date>/home-stitch-delta.md`: section by section — what changes, which existing components are reused (`Breadcrumb`, navbar button styles, hero pattern with the min-height floor), which site tokens (`--text-primary`, `dutchOrange`, light `#FAF8F5`, dark `#0B0C0E`), which translation keys are new. Every new string is a `t()` key with EN **and** NL in the same commit (`audit-translation-keys.mjs` enforces presence).
- Numbers on the page come from the registry (`workingGroups.length`, `totalDocuments`), never literals (`audit-counts.mjs`).
- One PR per section of the page (hero, then each band), each mergeable alone, each with the browser sign-off. No new colour or font without a `tailwind.config` change in the same PR and a line in the delta note saying why.
- Before changing a shared component, list its importers (`grep -rl`, or Serena `find_referencing_symbols` in Claude Code) and check every page that uses it in both themes.
- Proposed new gate, to write and check in the Docker layout: `audit-hardcoded-strings.mjs` — flags JSX text literals in `web/src/app/**/page.tsx` that are not inside `t()`. Would have caught the `/tracks` header.

## 4. Publishing new content (treatises)
- Draft lives in `papers-pre-publish/` and is committed there. Compile with the specific `scripts/compile_rNN.py` that owns the target `references/*.md` (check `grep -rln <file> scripts/` first). Register in `wikiRegistry.ts`; counts follow.
- Named external methods need a file in `references/external-research/` (`<WG>_<topic>_<YYYYMMDD>.md`) — the citation audit is the gate, the rule is the reason.
- `npm run verify` (publications fidelity, citations, terminology, mermaid, featured), PR, CI, browser check of `/papers/<slug>` and `/wiki` in both themes, merge, production check, `TASKS.md`.

## 5. GitHub hygiene
- main is production (Railway deploys it). Enable branch protection on main: require the three CI checks, no direct pushes, even for one developer — the pre-push hook is client-side and skippable.
- Conventional commit subjects (`feat(scope): …`, `fix: …`, `deps: …`), one concern per PR, PR body says what was verified and how.
- Delete branches after merge (17 local branches on 2026-09-11, most merged). Keep `.env.example`, `web/AGENTS.md`, `web/CLAUDE.md` committed (Next.js re-creates the AGENTS block; committing it keeps the tree clean). Nothing untracked for more than a few days — the "Triage the 23 untracked files" task is the current debt.
- Dependabot PRs: decide within the week; merge on green or close with a reason.

## 6. Where multi-agent workflows earn their cost
Not for writing pages. For review of a ready PR across independent dimensions in parallel: copy accuracy against the registry and sources; i18n completeness (EN/NL keys, no hardcoded strings); token and component conformity against the delta note; accessibility of the changed section. Findings verified before they reach Jim. Ask for it by name when a PR is ready.
