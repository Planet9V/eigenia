---
name: stitch-design-taste-eigenia
description: Use when prompting Google Stitch (or any screen generator) for eigenia.nl pages, or when turning a Stitch export into a delta note for the Eigenia repo. Encodes Eigenia's real design tokens (Inter, JetBrains Mono, Dutch Orange #E05A10, warm paper light / obsidian dark), component patterns, hero rules, motion intent and the content rules the repo's audits enforce.
---

# Stitch Design Taste, Eigenia edition

Derived from `Leonxlnx/taste-skill` (the generic "Taste Standard") and rewritten for eigenia.nl on 2026-09-11 from the repo's own tokens: `web/tailwind.config.ts`, `web/src/app/globals.css`, `web/src/app/layout.tsx`, `web/src/components/Hero.tsx`. The companion `DESIGN.md` is the single source of truth to paste into Stitch; it lives beside this file and in the Eigenia repo. If the repo and DESIGN.md disagree, the repo wins: re-derive DESIGN.md, do not patch the site to match a mockup.

## When to use
- Writing a Stitch prompt or a Stitch DESIGN.md for any eigenia.nl page (Home first; the working agreement limits the Stitch pass to Home until one page has shipped).
- Reviewing a `.stitch/designs/*.html` export before it becomes a delta note (`notes/<date>/<page>-stitch-delta.md`).
- Checking a proposed component against the house style before it enters `web/src`.

## When not to use
- For Tetrel or OXOT pages: they have their own systems.
- For the generic premium aesthetic; use the original `stitch-design-taste` for that. Several of its rules are deliberately reversed here (Inter is mandatory, two hero CTAs, radii capped at 16px, no spring physics, and one sanctioned glow: the orange one).

## The three rules that override the generic skill
1. **Inter is the typeface.** The generic skill bans it; Eigenia is set in it (`--font-sans`), with JetBrains Mono for eyebrows, IDs and numbers. Never propose a display face.
2. **One accent, Dutch Orange #E05A10**, in both themes. No second hue for status, links or charts.
3. **Two themes and two languages are one deliverable.** Light "Warm Academic Monograph" (#FAF8F5 canvas) and dark "Obsidian Command Centre" (#0B0C0E canvas), EN and NL. A screen designed for one is half a screen.

## Workflow
1. **Set the dials** from DESIGN.md (Creativity 4, Density 5, Variance 4, Motion 3). Do not raise them for a marketing page; the credibility of the treatises depends on the site not looking like a launch page.
2. **Paste DESIGN.md into Stitch** as the design system, then prompt per section, not per page: hero, one band, one grid. Name the real content the section holds (working groups, physics models, treatise cards) and give the real counts from the registry.
3. **Ask Stitch for both themes** explicitly and for one NL variant of any text-heavy section.
4. **Review the export against DESIGN.md §10** (anti-patterns) and §9 (content rules). Anything that fails is a note in the delta, never a fix applied to the repo to match the mockup.
5. **Write the delta note**, section by section: what changes, which existing components are reused (`Hero`, `SectionBand`, `Card`, `Breadcrumb`, `WorkingGroupsStrip`, `FeaturedFindingsBand`), which tokens, which new translation keys with EN and NL text. The Stitch HTML and its Tailwind classes never enter `web/src`.
6. Hand off to `eigenia-page-change` for implementation; `eigenia-verify-before-done` for the gates and Jim's browser sign-off.

## Prompt scaffold for Stitch
```
Design system: [paste DESIGN.md]
Page: eigenia.nl Home, section: [hero | working groups strip | featured findings | physics models | collaborate CTA]
Theme: render light and dark.
Language: EN, with one NL variant of the headline and subtitle.
Content (real): 11 Research Tracks, 73 treatises, 9 physics models (as of 2026-09-12); working group names: WG-01 Underwriter … WG-10 Assurance Network, MP-MATH, GOV-RES.
Constraints: Inter + JetBrains Mono only; one accent #E05A10; radii ≤ 16px; left-aligned dark hero with primary + ghost CTA; orange glow (0 0 20px rgba(224,90,16,0.15)) on one focal element only, no other glow, no gradient text, no emojis, no placeholder names or counts; no em dashes in copy.
Output: one screen per theme, annotated with the token used for every colour and the component reused for every block.
```

## Review checklist (paste into the delta note)
- [ ] Inter / JetBrains Mono only; headings tracking -0.025em; no caps headings
- [ ] Dutch Orange is the only accent; no orange fill areas larger than a button
- [ ] Light and dark both designed; hero is dark in both
- [ ] Radii: xl (12px) default, 2xl (16px) tiles, full only on pills and dots
- [ ] Hairline borders and the card shadow token; orange glow on at most one focal element per viewport
- [ ] Hero: left-aligned, eyebrow + h1 (one orange phrase) + light subtitle + primary and ghost CTA + mono status line
- [ ] Counts are the registry's current numbers; no invented data, names or logos
- [ ] Research Track vs Working Group used correctly; no "Workstream"
- [ ] Copy has no em dashes and none of the audited filler words
- [ ] EN and NL considered; NL strings 15–25% longer
- [ ] Motion limited to easeOut entrances, 0.15s hovers, the status dot, the orange glow on one element, scroll-driven drift with reduced-motion guard
- [ ] Verified at 375 / 768 / 1440

## Limitations
- Stitch renders static screens and will not honour every constraint; the delta note is where the constraints are enforced.
- DESIGN.md is a snapshot of the tokens on 2026-09-11. Re-derive it after any change to `tailwind.config.ts` or `globals.css`.
