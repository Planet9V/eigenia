# Architecture

## Stack

Next.js 15 (App Router), TypeScript 5, Tailwind CSS v4, KaTeX
(`remark-math` / `rehype-katex`) for math rendering, Framer Motion,
bilingual EN/NL via a custom `LanguageContext`. `images.unoptimized: true`
in `next.config.ts` — `next/image` gets zero automatic optimization, so all
responsive image handling in this project is manual (see "Hero
backgrounds" below).

## Route map

```
/ (Home)
├── /mission
├── /tracks                    Research tracks catalogue
├── /physics                   9-model Applied Physics catalogue (bento/compact grid toggle)
├── /collaborate                Proposal intake — the contact form
├── /wiki                      Sovereign Research Wiki — 25 treatises across 8 Working Groups
├── /theory/[slug]              9 dynamic routes, one per physics model
└── /papers/[slug]              Dynamic routes, one per long-form paper
```

(The root README's site map has historically drifted from this — `/wiki`
in particular has been missing from it. This file is the one to trust.)

## Content pipeline — `references/*.md` → the live site

This is the load-bearing part of the architecture. `references/` at the
repo root holds the actual markdown content (working-group treatises,
sourced external research). Two lookup tables map slugs to those files:

- `web/src/lib/papers.ts` — `getPaperBySlug()`, hardcodes `relativePath:
  "references/WG-XX-.../file.md"` per paper.
- `web/src/lib/wiki.ts` — same idea for `/wiki`, plus a `RAW_DOC_CONTENT` /
  `RAW_DOC_CONTENT_NL` static-string fallback that can drift out of sync
  with the actual `.md` file (see [KNOWN_ISSUES.md](./KNOWN_ISSUES.md)).

Both are resolved against `process.cwd()` at build/runtime, and the root
`Dockerfile` does `COPY references ./references` — so a `references/`
change needs a rebuild to reach production, not just a git push landing on
disk somewhere. **Never rename, move, or delete an existing file under
`references/`** — it breaks the slug lookup with a failed build or a
broken production page, not a caught-locally error. See
[CONTENT_GUIDE.md](./CONTENT_GUIDE.md) for how to add new content safely.

## Design system — dual-theme tokens

Defined as CSS custom properties in `web/src/app/globals.css`, redefined
under `.dark` / `html.dark`, consumed through Tailwind's `tailwind.config.ts`
color mappings (`bg-canvas`, `text-primary`, `border-hairline`, etc. — never
hardcode a hex value in a component, use the token).

| Token | Light | Dark |
| --- | --- | --- |
| `--bg-canvas` | `#FAF8F5` | `#0B0C0E` |
| `--bg-surface` | `#FFFFFF` | `#131519` |
| `--text-primary` | `#18181B` | `#FFFFFF` |
| `--border-hairline` | `#E8E3DA` | `#22252C` |
| accent (`dutchOrange`) | `#E05A10` | `#E05A10` |

The `dutchOrange` scale (50–900) lives in `tailwind.config.ts`; `DEFAULT`
(`#E05A10`) is the one used everywhere as `bg-dutchOrange` /
`text-dutchOrange` / `border-dutchOrange`.

**A section can force dark rendering regardless of site theme** by adding a
scoped `dark` className (e.g. `<section className="dark ...">`) — the CSS
variables cascade correctly from that point down. Used for every hero
section (home, `/physics`, `/mission`) so the background imagery always
reads correctly even when a visitor is in light mode. Buttons/text inside
a scoped-dark hero should still use the semantic tokens
(`text-primary`, `border-hairline`), not hardcoded colors — they resolve
to their dark values automatically inside the scope.

## Recurring patterns

### `SiteChrome`

`web/src/components/SiteChrome.tsx` is a single `"use client"` wrapper
around `<Navbar/>` + page children + `<EuComplianceFooter/>` +
`<ImpressumModal/>` + `<CookieConsentBanner/>`, owning the
impressum-open / cookie-banner-force-open state centrally. Every page
should render its content inside `<SiteChrome>...</SiteChrome>` rather than
wiring those four components itself — a page only needs its own
`"use client"` directive if it has interactive state of its own beyond
that (e.g. `/tracks`'s grid-view toggle, `/collaborate`'s form state).

### Hero backgrounds

Pattern used on `/` (vector-field), `/physics` (scalar-field), `/mission`
(relief-surface):

```tsx
<section className="dark relative overflow-hidden ... min-h-[480px] sm:min-h-[540px] lg:min-h-[620px] flex items-center border-b border-hairline">
  <div className="absolute inset-0 bg-[#0B0C0E]">
    <div className="hidden lg:block">
      <img src="/assets/hero-*.webp" aria-hidden="true"
           className="absolute inset-0 h-full w-full object-cover opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0E]/35 via-[#0B0C0E]/55 to-[#0B0C0E]" />
    </div>
  </div>
  {/* content, z-10 */}
</section>
```

Key decisions baked into this pattern, don't relitigate them per-page:
- **`hidden lg:block`** — the hero image is fully suppressed below the
  `lg` (1024px) breakpoint, not just served smaller. Phones and tablets
  get the flat `#0B0C0E` background only. This was a deliberate,
  explicit call (not the default "serve a smaller crop" approach) —
  simpler, and there's no meaningful hero-image content lost on a
  screen that size.
- Source images live in `web/public/assets/`, hand-optimized to WebP.
- The min-height floor (`480px` / `540px` / `620px` across breakpoints)
  keeps hero height consistent across pages — verified with
  `getBoundingClientRect()`, not assumed. A page with more hero content
  (e.g. `/physics`'s bento cards) can naturally exceed the floor; that's
  fine, the floor only prevents heroes from being *shorter* than the
  shortest one.

### Theory diagrams (`/physics`, `/theory/[slug]`)

`web/src/components/theory-diagrams/` — one hand-built inline SVG per
physics model, registered in `theory-diagrams/index.ts` by slug. Shared
visual language: `viewBox="0 0 400 200"`, `#0B0C0E` background, a single
`dutchOrange` accent, mono-font labels, axes in `#22252C`.

**The one recurring bug**: `DiagramBadge` (the shared overlay component)
renders two lines of mono text `absolute bottom-2.5 right-3`. Any diagram
label or curve tail placed in the bottom-right ~40% of the viewBox
(roughly `x > 230` or `y > 150`) will visually collide with it. Keep new
diagram geometry and captions out of that zone — this has bitten multiple
diagrams (GGNN's redundant caption, Lacan's original triangle) and is the
first thing to check if a new diagram looks fine in isolation but wrong on
the actual `/physics` grid.

### Contact form (`useContactForm`)

`web/src/lib/useContactForm.ts` — shared hook used by both `/collaborate`
and `PretotypeExperimentModal`. Posts to `/api/contact`, checks
`res.ok` (a plain `fetch()` doesn't throw on an HTTP error status, so this
check is what actually surfaces a server failure), sets a visible error
banner on failure, still fires the `mailto:` fallback either way, still
shows the "submitted" state. See [DEPLOYMENT.md](./DEPLOYMENT.md) for the
SMTP config this depends on.
