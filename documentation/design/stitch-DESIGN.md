# Design System: Eigenia (eigenia.nl)
**Skill:** stitch-design-taste-eigenia
**Derived from:** `web/tailwind.config.ts`, `web/src/app/globals.css`, `web/src/app/layout.tsx`, `web/src/components/Hero.tsx` and `Navbar.tsx` in `Planet9V/eigenia`, verified 2026-09-11. Every value below is the site's own token; nothing is aspirational. When the repo and this file disagree, the repo wins and this file gets updated.

---

## Configuration: the dials for Eigenia
| Dial | Level | Why |
|------|-------|-----|
| **Creativity** | `4` | An applied-complexity think tank publishing treatises and physics models. Personality comes from precision, typography and the single accent, not from editorial stunts. No inline images in headlines. |
| **Density** | `5` | Balanced. Research pages carry real tables, KaTeX and mermaid diagrams; marketing bands breathe. |
| **Variance** | `4` | Predictable, left-aligned structure. Readers return to compare documents; layout must not surprise them. Subtle offsets only. |
| **Motion Intent** | `3` | Subtle entrance and hover cues. One pulsing status dot, one orange glow on the focal element. Scroll-driven drift on the findings band. Nothing perpetual beyond that. |

> These override the generic "Taste Standard" defaults (8/4/8/6). Eigenia is a muted engineering aesthetic: the site reads like a well-typeset monograph in light mode and a command centre in dark mode. Both must be designed every time.

---

## 1. Visual Theme & Atmosphere
Two named moods, one system:
- **Light, "Warm Academic Monograph"**: warm off-white paper, near-black ink, hairline rules the colour of aged card stock, and a single burnt-orange accent. Reads like a printed research paper with a web layout.
- **Dark, "Obsidian Cyber-Physical Command Centre"**: near-black obsidian canvas, graphite surfaces, white text, the same orange accent carrying more weight. The hero is always rendered in this dark mood, even on the light theme (the hero section carries the `dark` class).

The overall impression: exact, calm, credible. The only light in the system is orange: a soft Dutch Orange glow marks the element that matters. Nothing bounces. Numbers on screen are real (11 Research Tracks, 77 treatises as of 2026-09-12) and come from the registry, never invented.

## 2. Color Palette & Roles
### Light theme
- **Paper Canvas** (#FAF8F5) — page background (`--bg-canvas`)
- **Pure Surface** (#FFFFFF) — cards, panels (`--bg-surface`)
- **Subtle Field** (#F3F0EC) — alternating bands, wells (`--bg-subtle`)
- **Input Field** (#EFECE6) — form inputs (`--bg-input`)
- **Ink** (#18181B) — primary text (`--text-primary`); never pure black
- **Graphite Secondary** (#52525B) — body and descriptions (`--text-secondary`)
- **Muted Stone** (#71717A) — metadata, timestamps, captions (`--text-muted`)
- **Hairline** (#E8E3DA) — 1px structural borders (`--border-hairline`); **Subtle Rule** (#F0ECE4) for dividers inside surfaces
- **Card Shadow** `0 4px 20px -2px rgba(24,24,27,0.05)`; **Dropdown Shadow** `0 10px 30px -5px rgba(24,24,27,0.08)`

### Dark theme
- **Obsidian Canvas** (#0B0C0E) — page background and hero
- **Graphite Surface** (#131519) — cards, panels; **Charcoal Band** (#121417) for alternating sections; **Slate Band** (#16181D) for the deepest well
- **Input Field** (#1C1F26)
- **White** (#FFFFFF) primary text; **Zinc Secondary** (#D4D4D8); **Zinc Muted** (#A1A1AA)
- **Hairline** (#22252C); **Subtle Rule** (#1A1D24)
- **Card Shadow** `0 10px 30px -10px rgba(0,0,0,0.5)`; **Dropdown Shadow** `0 20px 40px -10px rgba(0,0,0,0.7)`

### The one accent (both themes)
- **Dutch Orange** (#E05A10) — CTAs, active states, eyebrow labels, the accent word in a headline, focus rings, scrollbar hover, selection highlight (white text on orange)
- **Accent Tint** rgba(224,90,16,0.08) light / 0.15 dark — pill backgrounds, hover fills
- **Accent Border** rgba(224,90,16,0.3) light / 0.4 dark — pill and card borders on hover
- **Orange Glow** — the house glow, and the only glow. Static hover form: `hover:shadow-[0_0_20px_rgba(224,90,16,0.15)]` on cards (used on the Research Track cards). Animated form: the `glow` keyframe, `box-shadow 0 0 15px rgba(224,90,16,0.3)` to `0 0 25px rgba(224,90,16,0.6)`, `2s ease-in-out infinite alternate` (`animate-glow`). Use on one focal element per viewport: the primary CTA, a live status element, or a featured card. Never on body text, never on more than one element at a time, always with a `prefers-reduced-motion` fallback to the static form
- Scale available: 50 #FFF6EF · 100 #FFE7D6 · 200 #FFC9A8 · 300 #FFA370 · 400 #F07B37 · 500 #E05A10 · 600 #C64405 · 700 #9C3204 · 800 #7A2A0A · 900 #63240C

### Banned colours
- Any second accent. No blue, green, purple or teal for emphasis; status is expressed with orange, muted text and hairlines.
- Pure black (#000000) as text or surface; the darkest surface is Obsidian #0B0C0E.
- Glows in any colour other than Dutch Orange, and orange glow on more than one element per viewport.
- Cool blue-white backgrounds; the light canvas is warm.

## 3. Typography Rules
- **Sans (all text, all headings): Inter**, loaded via `next/font` as `--font-sans`. This deliberately overrides the generic taste rule that bans Inter: the site is set in Inter, and Stitch output must match it. Headings use `letter-spacing: -0.025em`.
- **Mono: JetBrains Mono** (`--font-mono`) for eyebrow labels, document IDs, counts, timestamps, code and the small status line under the hero.
- **No serif anywhere.** The `font-serif` alias resolves to the sans stack on purpose.
- **Scale as used on the site**: hero h1 `text-2xl / sm:3xl / lg:4xl`, weight 600, `leading-[1.15]`; section h2 `text-3xl / sm:4xl`, weight 800, tracking tight; hero subtitle `text-base / sm:lg`, weight 300, `leading-relaxed`, `max-w-3xl`; body `text-sm / text-base`, secondary colour; eyebrow `font-mono text-[10px]–text-xs uppercase tracking-[0.2em]` in Dutch Orange.
- **Accent word**: one phrase in a headline may be Dutch Orange (`hero_title_accent`). Never more than one per heading.
- **Line length**: prose blocks `max-w-3xl`; reading pages `max-w-4xl`.

### Banned typography
- Gradient text, outlined text, text shadows.
- Display faces (Geist, Satoshi, Cabinet Grotesk, Outfit, Fraunces and the rest of the generic list). They are fine elsewhere; they are not Eigenia.
- ALL-CAPS headings. Caps are reserved for mono eyebrows.

## 4. Component Stylings
- **Buttons, primary**: `px-6 py-3 rounded-xl bg-dutchOrange text-white text-sm font-bold`, `shadow-md`, hover `bg-dutchOrange/90 shadow-lg -translate-y-0.5`, optional trailing arrow icon. No glow by default; the orange glow may be added when the CTA is the viewport's focal element.
- **Buttons, secondary**: `px-6 py-3 rounded-xl border border-hairline bg-white/[0.02] text-primary text-sm font-semibold`, hover `border-dutchOrange text-dutchOrange`. Ghost, never filled.
- **Eyebrow pill**: `font-mono text-xs uppercase tracking-wider font-semibold text-dutchOrange bg-dutchOrange/10 px-3 py-1 rounded-full border border-dutchOrange/30`.
- **Cards**: `rounded-xl` (12px) is the workhorse, `rounded-2xl` (16px) for feature tiles; `rounded-3xl` and larger are not used. Surface fill, 1px hairline border, card shadow token, `p-6`–`p-8`. Cards hold a treatise, a working group or a model; they are not decoration.
- **Section bands**: full-width, alternating canvas / subtle (light) or obsidian / charcoal band / slate band (dark), separated by a hairline. Vertical rhythm `py-20`. Content in `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Breadcrumb**: present on every inner page, mono, muted; the Research Track name is the section label.
- **Navigation**: sticky, hairline bottom border, EN/NL toggle and theme toggle on the right, one orange CTA ("Request board briefing"). Desktop horizontal; mobile collapses to a labelled menu.
- **Inputs**: label above, `bg-input`, hairline border, orange focus ring, error text below in Dutch Orange 600. Intake forms post to `/api/contact`; the form shape is fixed, so design to it.
- **Tables**: hairline rules, mono for numeric columns, header row in subtle field.
- **Diagrams**: mermaid, rendered by the site; **Math**: KaTeX inline and display. Stitch should reserve clean blocks for both; do not draw fake formulas.
- **Status dot**: `w-2 h-2 rounded-full bg-dutchOrange animate-pulse` beside a mono caption.
- **Glow**: `animate-glow` (2s alternate orange box-shadow) or the static `hover:shadow-[0_0_20px_rgba(224,90,16,0.15)]`; one focal element per viewport.
- **Loaders / empty states**: skeletal blocks in subtle field with hairline; empty states say what will appear and link to the registry.

## 5. Hero Section
- Always the dark mood, `min-h-[480px] sm:min-h-[540px] lg:min-h-[620px]`, `pt-28 pb-16`, hairline bottom border. Every hero page shares this floor so heights do not jump between pages.
- **Left-aligned**, content in `max-w-4xl`, stacked: mono eyebrow, h1 with one orange phrase, light-weight subtitle, CTA row, mono status line with pulsing dot.
- **Two CTAs are the house pattern**: primary orange ("Request Board Briefing") and secondary ghost ("Explore Research Tracks"). This overrides the generic one-CTA rule.
- No inline images in the headline, no decorative photography, no scroll prompts, no centred layout.

## 6. Layout Principles
- CSS Grid for structure; `max-w-7xl` containment; single accent per viewport.
- Alternating bands rather than floating cards for rhythm; a horizontal scroll-snap strip is used once (Featured Findings), not as a habit.
- Feature grids: 2- or 3-up is acceptable here when the items are real registry entries of equal rank (working groups, physics models); do not invent a fourth to fill a row.
- No overlapping elements, no absolute-positioned copy over imagery, `min-h-[100dvh]` never `h-screen`.

## 7. Responsive Rules
- Collapse to one column below 768px; hero floor drops to 480px; section padding `py-20` may fall to `py-12`.
- Body text never below `text-sm` (14px); headline `text-2xl` at 375px.
- Touch targets 44px; navigation collapses to a labelled menu; EN/NL and theme toggles stay reachable.
- Verify at 375, 768 and 1440 in **both themes and both languages**. NL copy runs 15–25% longer than EN; leave room.

## 8. Motion & Interaction (code-phase intent)
- Framer Motion entrances: `opacity 0→1, y 12→0`, `duration 0.5–0.9s`, `ease: "easeOut"` or `[0.16, 1, 0.3, 1]`; staggered children `delay` in 0.1s steps. Hover transitions 0.15s.
- Scroll-driven drift on the findings band (`animation-timeline: view()`), with a Firefox fallback and `prefers-reduced-motion` disabling it. Any new motion gets the same two guards.
- Animate `transform` and `opacity`, plus `box-shadow` for the orange glow only. No spring physics library, no perpetual micro-loops beyond the status dot and the glow, no shimmer.

## 9. Content & Language Rules (enforced by the repo's audits)
- **Research Track** names a section and route; **Working Group** names the entity. Never "Workstream" for Eigenia's own output.
- Counts on screen are derived from `wikiRegistry.ts`; a mockup shows the current real numbers, labelled as such.
- Every visible string is a translation key with EN **and** NL. Stitch mockups should show EN and note that NL exists.
- No em dashes in copy; no filler words the audit bans (`leverage`, `utilize`, `pivotal`, `testament to`, `foster`, `streamline`, `at its core`, `beacon`, `game-changing`, `harness`, `furthermore`, `robust`). `landscape` is allowed.
- Citations as `[n]` brackets; headings are titles under 90 characters.
- No emojis. No stock photography of servers or padlocks. No invented testimonials, logos or partner names.

## 10. Anti-Patterns (banned for Eigenia)
- A second accent colour, or orange used as a large fill area.
- Any font other than Inter and JetBrains Mono.
- Radii above 16px; pill radius only on eyebrows and status dots.
- Glow in any colour but orange, neon, gradient text, custom cursors, bouncing chevrons, "scroll to explore".
- Centred hero, image-in-headline typography, three-equal-cards used as filler.
- Fake data: placeholder counts, "Acme", "John Doe", round percentages, Unsplash links.
- Designing one theme or one language and calling it done.
