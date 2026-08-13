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
