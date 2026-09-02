# Known Issues

Things that are flagged and understood but not yet fixed. Check here
before assuming something you just noticed is a fresh bug.

## `eigenia.com` is not a configured domain

Site metadata and copy reference both `eigenia.com` and `eigenia.nl`
(README, `DEPLOYMENT.md`, on-page copy). Only `eigenia.nl` is actually
configured as a custom domain on the Railway service. Either register/wire
up `eigenia.com` or scrub the references to it — as of this writing,
neither has been done.

## [RESOLVED] Stale wiki embedded copy

Resolved via `scripts/sync-publications.js` and lifecycle hooks (`npm run prebuild`,
`npm run predev`). All 26 markdown publications in `references/` are automatically
synchronized into `web/src/lib/generatedReferencesContent.ts` at build time and dev time.
The audit agent `scripts/audit-publications.js` verifies 100% word-for-word fidelity on
every build, preventing any drift between `references/`, `/papers/[slug]`, and `/wiki`.

## `web/Dockerfile` / `web/docker-compose.yml` can't build `references/`

Covered in [DEPLOYMENT.md](./DEPLOYMENT.md#webdockerfile--webdocker-composeyml--local-only-not-what-railway-uses).
Its build context is `web/` only, so it can never reach `../references/`.
Not a bug to fix so much as a footgun to not use — the root `Dockerfile`
(what Railway actually builds from) is the one with the correct context.

## `papers-pre-publish/` is empty and unused

Implies a draft → review → publish gate that doesn't actually exist in
this workflow (there's no pre-publish routing — see root `CLAUDE.md`).
Harmless as-is; flagged rather than deleted since nobody's confirmed it's
safe to remove.

## Dependabot: 5 vulnerabilities (3 high, 2 moderate)

Reported by GitHub on push, transitive dependencies of `next@15.1.7`, not
introduced by any specific recent change. Not triaged yet — check
`https://github.com/Planet9V/eigenia/security/dependabot` for current
detail before assuming they're still the same 5.

## `JoinResearchCTA` references translation keys that don't exist

`web/src/components/JoinResearchCTA.tsx` calls `t("join_tag" as any)`,
`t("join_title" as any)`, `t("join_desc" as any)`, and
`t("join_btn_apply" as any)` — none of those keys exist anywhere in
`web/src/locales/translations.ts` (`en` or `nl`). `LanguageContext`'s
`t()` has no build-time key checking (it's typed `(key: string) =>
string`) and falls back to printing the raw key string when a lookup
misses in both languages, so if this component were ever rendered it
would show literal text like "join_title" instead of real copy. As of
this writing, `JoinResearchCTA` is also not imported by any other file in
the codebase — it's dead code, not a live bug, but it's a landmine for
whoever imports it next expecting it to just work. Found while auditing
`/collaborate` (2026-08-12); left unfixed since wiring it in was outside
that task's scope. Fix is either: delete the component if it's genuinely
unused, or add the missing `join_*` keys (both languages) and hook it up
somewhere.

## Mobile-viewport visual testing is unreliable in this dev environment

The browser-automation tooling used in Claude Code sessions here
(`resize_window`, Chrome's native device-toolbar shortcut) does not
reliably change the real rendered viewport — `window.innerWidth` stays
fixed at the actual window size regardless of the requested resize. When a
session says a layout is "verified at desktop width" but not "verified on
an actual narrow viewport," that's why — it's a tooling gap, not a skipped
step. Real mobile/tablet testing needs an actual device or a browser
outside this automation path.
