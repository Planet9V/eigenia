# The super-intelligence MCP gateway on the Eigenia website — evaluation (2026-09-11)

Evidence base: repo `CLAUDE.md` §"Also available" (the gateway's own contract), `notes/` (34 files, 2026-08-12 → 2026-09-08), the index files in the working copy, git history. Not evidence: any claim about the gateway's quality in general.

## What it is, as the repo describes it
Code graph over `web/src` only (69 .ts/.tsx files), queried by `graph_query` / `graph_semantic_query` / `graph_path` / `graph_explain`; cross-session `memory_search` / `memory_store` keyed by `project="eigenia"`. Snapshot, not live: results carry `stale`, and the rule is to run `graph_index` before trusting a stale graph. Registered at user scope on Jim's Mac for Claude Code sessions.

## Measured use on this project
- Used once in 34 notes files: 2026-08-12, for a skill-vault lookup and one `memory_store` under namespace `eigenia:decisions` (key `eigenia-collaborate-page-redesign`). The repo's current guidance says that namespace form was "this section's original guidance" and `project=` is now correct — so the one stored decision may sit where nothing searches.
- Zero mentions of `graph_query`, `graph_semantic_query`, `graph_path`, `graph_explain` or `memory_search` anywhere in `notes/` or `documentation/`. The sessions of 2026-09-06 → 09-08 cite Valyu (11), Perplexity (3), Playwright (2) — never the gateway.
- Index artefacts in the working copy (`ruvector.db`, `.swarm/memory.db`) are dated 2026-09-03 02:11. Since then: PRs #10–#26, six components deleted, `paper.category`/`paper.number` removed, registry split from the content bundle. The graph is stale by construction unless re-indexed each session.
- Not reachable from Cowork sessions (not among the desktop app's proxied MCP servers), so half the sessions on this project cannot use it at all.

## SWOT — this project specifically
**Strengths.** Structural questions ("what renders `wikiRegistry` entries", "path from `page.tsx` to `useContactForm`") answered without grepping; semantic lookup when the symbol name is unknown; a cross-session store that outlives `notes/`.
**Weaknesses.** Coverage stops at `web/src`; the content (`references/`, `papers-pre-publish/`, the compilers) — where most of the risk and most of the work is — is invisible to it. Snapshot staleness on a repo that merged 17 PRs in three days. A namespace change already orphaned the only decision stored. Two memory stores (gateway + `projects-bundle`) is the same drift pattern the taxonomy work removed from the code.
**Opportunities.** Cheap to keep as a *query* tool: `graph_index` at session start, then use `graph_path`/`graph_explain` for impact analysis before touching a shared component (e.g. before changing `Breadcrumb` or the navbar for the Home redesign). Could re-store the 2026-08-12 decision under `project="eigenia"` so it is findable.
**Threats.** Trusting a stale answer about a deleted component; writing decisions there instead of here and losing them to the next namespace change; time spent maintaining a graph for a 69-file app that Serena's live LSP and `grep` already cover.

## Recommendation
Demote, don't remove — implemented 2026-09-11 as a `PreToolUse` deny on `memory_store` (see `.claude/settings.json`) and by removing `memory_store` from the allow list. The gateway is a structural search tool, not memory of record. Rules: (1) decisions and status live in `TASKS.md` and `memory/` at the repo root and in `notes/`; the gateway's `memory_store` is never the only copy of anything. (2) In a Claude Code session, run `graph_index(project="eigenia")` before the first `graph_*` call, and prefer Serena `find_symbol`/`find_referencing_symbols` for any single-symbol question. (3) Cowork sessions do not have it and do not need it: `grep`, the audits and the registry answer the same questions. (4) Revisit only if the graph starts covering `references/` and the compilers — that is where a code graph would earn its keep on this project.
