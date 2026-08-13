# Progress Log: Eigenia Sovereign Research Wiki Migration

## Session Log
- **2026-08-11 10:54**: Initiated full audit of all Working Group files under `references/`.
- **2026-08-11 10:54**: Verified complete document count: 25 `.md` files across 8 Working Group directories.
- **2026-08-11 10:54**: Formulated comprehensive architectural migration plan in `implementation_plan.md`.

## 2026-08-12 — Design polish, hero backgrounds, theory diagrams, documentation

- Fixed contact form to send real email via Hostinger SMTP (`web/src/lib/mailer.ts`); set Railway env vars; verified with a live positive + negative (wrong-password) test.
- Extracted `SiteChrome` (shared Navbar/Footer/Modal wrapper) — removed duplicated impressum/cookie-banner wiring across 6 pages; `mission` and `theory` pages dropped `"use client"` entirely.
- Added visible error banner to the contact form via a shared `useContactForm` hook (previously a failed send was silent — `fetch()` doesn't throw on HTTP error status, neither caller checked `res.ok`).
- Removed decorative hover-lift from non-CTA/dense-grid cards (TheoryCatalogue's 9-card grid, collaborate's 3 pathway cards).
- Added hero background imagery (dark-scoped section, vignette, badge overlay pattern) to `/`, `/physics`, `/mission`. Images fully suppressed (`hidden lg:block`, not just downscaled) below the `lg` breakpoint per explicit instruction — phones/tablets get flat background only.
- Fixed hero-section height inconsistency across all 4 hero pages (measured via `getBoundingClientRect()`, ranged 353–655px) with a shared min-height-floor + flex-center pattern.
- Built and visually verified the 5 remaining theory-model diagrams (GGNN, L0/L1, Lacan, Ising, Clayton Copula) — all 9 physics models now have inline SVG diagrams. Found and fixed the recurring "diagram content collides with the bottom-right DiagramBadge overlay" bug on GGNN and Lacan.
- Fixed a pre-existing `<html>` hydration mismatch (added `suppressHydrationWarning` — the inline theme-detection script intentionally flips the class before React hydrates).
- Added primary ("Request Board Briefing") + secondary ("Explore Research Tracks") CTAs to the homepage hero, which previously had none — reused existing `hero_cta_briefing`/`hero_cta_labs` translation keys and the navbar's button styling.
- Created `documentation/` at repo root (README, ARCHITECTURE, DEPLOYMENT, CONTENT_GUIDE, KNOWN_ISSUES) consolidating and correcting drifted docs — deleted the contradictory root `DEPLOYMENT.md` (Railway) vs `DEPLOYMENT_GUIDE.md` (aspirational Cloudflare Pages architecture that was never implemented, no `.github/workflows/` exists). Updated root `README.md`'s site map, directory tree, and contact-flow description to match current reality.
- All work committed and pushed to `main` (Planet9V/eigenia) across several commits this session; `npm run build` passed clean before each push.

## 2026-08-12 (later session) — `/collaborate` sponsor pathway + trust signals

Explored via the local super-intelligence-framework MCP gateway
(`/brainstorming`-adjacent skill lookup across its 548-skill vault, plus a
grounded read of the live codebase before proposing anything) — 3 options
were scoped: (A) redesign `/collaborate` in place, (B) an agent/LLM-guided
intake wizard, (C) a separate standing collaborative research platform.
User picked A now, with C fleshed out and deferred.

- Found: `/collaborate` had only 3 engagement pathways (pro-bono utility
  audit, academic fellowship, actuarial/commercial validation) — no
  sponsor/funder pathway at all, despite that being an explicit goal. The
  Research Track selector showed for every pathway even where irrelevant.
  No trust signals before the form. Hand-rolled cards instead of the
  existing `Card`/`SectionBand` components. Zero motion despite Framer
  Motion already being a dependency. One generic "Send" CTA regardless of
  pathway; email placeholder biased toward academia.
- Built: added the missing **Sponsor / Fund the Lab** pathway (4th
  card, EN+NL translated); a trust-signals band (Open Methodology /
  Domain-Native Rigor / Confidential by Default — grounded in existing
  site content, not fabricated stats); made the Track selector
  conditional (hidden for `sponsor`); per-pathway dynamic form
  fields/placeholders/labels and CTA microcopy; swapped hand-rolled divs
  for `Card`/`SectionBand`; added Framer Motion entrance animations. No
  stack changes, no new dependencies, existing `/api/contact` →
  nodemailer pipeline reused unchanged.
- Found in passing, not fixed (out of scope): `JoinResearchCTA.tsx`
  references `join_*` translation keys that don't exist anywhere and the
  component isn't imported by anything else — dead code that would
  render raw key names as text if it were ever wired up. Logged in
  `documentation/KNOWN_ISSUES.md`.
- Verified: `tsc --noEmit` clean; `npm run build` clean (exit 0, 47/47
  pages); rebuilt and restarted the local Docker container
  (`eigenia_web_app`, port 3000, `web/docker-compose.yml` — bakes a
  standalone Next.js build into the image, no volume mount, so a code
  change needs an explicit rebuild to show up there) and confirmed
  `/collaborate` returns 200 with the sponsor pathway rendering, before
  the user reviewed it live.
- Committed on branch `collaborate-page-sponsor-redesign` (not `main`),
  pushed, PR opened: https://github.com/Planet9V/eigenia/pull/2 — **not
  merged, not deployed** as of this entry.
- Reference docs written to `notes/2026-08-12/collaboration-page-redesign.md`
  (full record of what changed and why) and
  `collaboration-platform-roadmap.md` (Option C fleshed out: a public
  in-browser risk-simulation sandbox, a living public risk registry, open
  peer-verification on research proposals, and — flagged as higher-risk/
  higher-ceiling — a vetted utility data-contribution pathway; sequencing
  and infra requirements included, nothing scheduled).
- `documentation/ARCHITECTURE.md` and `documentation/KNOWN_ISSUES.md`
  updated to match (route-map description, a new "Collaborate page — 4
  engagement pathways" recurring-pattern entry, the `JoinResearchCTA`
  finding).
- Decision also persisted to the super-intelligence-framework's
  cross-session memory (namespace `eigenia:decisions`, key
  `eigenia-collaborate-page-redesign`).
