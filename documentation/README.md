# Eigenia Documentation

Developer and support documentation for the Eigenia B.V. / Eigenia Labs site
(`web/`, deployed at eigenia.nl). Root-level `README.md` stays the
one-page project overview; this folder is where the operational detail
lives.

| Doc | Read this for |
| --- | --- |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Route map, content pipeline (`references/*.md` → site), design system tokens, recurring UI patterns (SiteChrome, hero backgrounds, theory diagrams) |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Local dev setup, environment variables, how production deploys (Railway), how to redeploy |
| [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) | How to add/edit a paper or wiki page, sourcing rules for external claims, where things physically live on disk |
| [KNOWN_ISSUES.md](./KNOWN_ISSUES.md) | Open gaps and stale spots that haven't been fixed yet — check before assuming something is a bug you just found |

## Quick orientation

- **Framework**: Next.js 15 (App Router) + TypeScript 5 + Tailwind CSS v4, bilingual EN/NL.
- **Production**: Railway, built from the root `Dockerfile` (`COPY references ./references` — content is baked into the image at build time, not fetched at runtime).
- **Content is load-bearing**: `references/*.md` file paths are hardcoded into `web/src/lib/papers.ts` and `web/src/lib/wiki.ts`. Never rename/move an existing file under `references/` — see [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) and the root `CLAUDE.md`.
- **Support contact**: jim@eigenia.nl (also the inbox the contact form delivers to via Hostinger SMTP — see [DEPLOYMENT.md](./DEPLOYMENT.md)).

## Where else to look

- Root `CLAUDE.md` — the authoritative agent/contributor rules for this repo (sourcing discipline, file-path safety, scratch-notes convention). This documentation folder doesn't repeat those rules, it operationalizes them.
- `notes/<YYYY-MM-DD>/` — dated, session-scoped working notes (task plans, findings). Useful for "what was someone doing on this date," not for "how does X work today" — this folder is the current-state source of truth, notes/ is the historical scratch trail.
