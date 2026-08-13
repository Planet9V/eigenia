# Known Issues

Things that are flagged and understood but not yet fixed. Check here
before assuming something you just noticed is a fresh bug.

## `eigenia.com` is not a configured domain

Site metadata and copy reference both `eigenia.com` and `eigenia.nl`
(README, `DEPLOYMENT.md`, on-page copy). Only `eigenia.nl` is actually
configured as a custom domain on the Railway service. Either register/wire
up `eigenia.com` or scrub the references to it — as of this writing,
neither has been done.

## Stale wiki embedded copy

`web/src/lib/wiki.ts` stores a static `RAW_DOC_CONTENT` /
`RAW_DOC_CONTENT_NL` string per document, separate from the source `.md`
file it's meant to mirror. A user edit to
`references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-7-Industry-Value-Prop.md`
was made directly to the `.md` file; the embedded copy in `wiki.ts` was
not updated to match. The `/wiki` view for that document is currently out
of sync with `/papers/[slug]` for the same content. Needs a manual resync
(diff the `.md` against the embedded string, update the string) — not
something that self-heals.

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

## Mobile-viewport visual testing is unreliable in this dev environment

The browser-automation tooling used in Claude Code sessions here
(`resize_window`, Chrome's native device-toolbar shortcut) does not
reliably change the real rendered viewport — `window.innerWidth` stays
fixed at the actual window size regardless of the requested resize. When a
session says a layout is "verified at desktop width" but not "verified on
an actual narrow viewport," that's why — it's a tooling gap, not a skipped
step. Real mobile/tablet testing needs an actual device or a browser
outside this automation path.
