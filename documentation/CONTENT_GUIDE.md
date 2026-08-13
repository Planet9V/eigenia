# Content Guide

This covers the mechanics of adding or editing content. The sourcing
*policy* (what counts as a citable claim, when external research is
required) is defined in the root `CLAUDE.md` — read that first if you
haven't. This doc is the "then what do I actually do" follow-up.

## Adding a new paper or wiki page

1. Content lives under `references/<WG-code>-.../your-file.md`. Working
   groups already have folders (`WG-01-UI-...`, `WG-02-DT-...`, etc.) —
   put new working-group output in the matching one.
2. Register it:
   - Paper → add an entry to `web/src/lib/papers.ts` with
     `relativePath: "references/WG-XX-.../your-file.md"`.
   - Wiki page → same idea in `web/src/lib/wiki.ts`.
3. `cd web && npm run build` — confirms the path resolves and the page
   renders. Don't skip this; a bad path here is a broken production page,
   not a local-only error (see [ARCHITECTURE.md](./ARCHITECTURE.md)).
4. If the page has math, actually look at it rendered (KaTeX) — a page
   that type-checks can still render broken LaTeX.

## Editing existing content

Fine to edit the `.md` file in place. The one hard rule: **never rename,
move, or delete a file under `references/`** — the hardcoded
`relativePath` entries in `papers.ts`/`wiki.ts` will break. If a file
genuinely needs to move, update every reference to it in both files in the
same commit, then verify with `npm run build` before it reaches Railway.

**Known trap**: `web/src/lib/wiki.ts` also carries a static
`RAW_DOC_CONTENT` / `RAW_DOC_CONTENT_NL` string per document as a
fallback. Editing the source `.md` file does not update that string — the
two can silently drift apart. See
[KNOWN_ISSUES.md](./KNOWN_ISSUES.md#stale-wiki-embedded-copy) for the
current known-stale instance.

## Sourcing external claims

Quick version (full policy in root `CLAUDE.md`): content under
`web/src/content/papers/` is Eigenia Labs' own working-group synthesis,
not peer review — original framing is fine. What's not fine is naming an
external method/model/dataset (Clayton Copulas, GGNNs, Kramers escape
models, etc.) without a traceable source.

1. Check `references/<WG-code>-.../` first — it might already be covered.
2. If not, search with `valyu` (`mcp__valyu__valyu_academic_search` etc.)
   for a real source.
3. Save what you find to `references/external-research/`, one file per
   source, named `<WG-code>_<topic-slug>_<YYYYMMDD>.md`. Include title,
   the query run, source/URL/DOI, retrieval date, which paper uses it, and
   a short summary. Header the folder's purpose: *"External research —
   found via valyu, not the WG's own analysis."*
4. If a claim really is the working group's own synthesis with no
   external analogue, say so explicitly in the paper — "novel synthesis"
   is a legitimate label, leaving it unattributed is not.

## Adding a new theory diagram

See [ARCHITECTURE.md](./ARCHITECTURE.md#theory-diagrams-physics-theoryslug)
for the visual language and the one recurring bug (badge-zone collisions)
to check for before calling a new diagram done.

## Scratch/session notes

`notes/<YYYY-MM-DD>/` at the repo root — dated so a later session can tell
freshness at a glance. Not `web/`, not loose files at repo root. See root
`CLAUDE.md` for the full convention.
