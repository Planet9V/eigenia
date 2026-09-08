# Featured Findings band, and a Working Groups strip

Date: 2026-09-08
Status: design, approved in conversation, implementation plan pending
Spec location follows this repo's precedent (`notes/<date>/`), not the skill default

## Why

The homepage is `FirstVisitSplash, SiteChrome, Hero`, a `research-portals` section
holding four portal cards, then `UnifiedStandardBand, SCurveSection, Principles,
KnowledgeTransfer`. Nothing on it names a single paper. Fifty-nine treatises exist, nine of them published in the last
two days, and a visitor cannot tell any of that from the front page.

The behaviour this is meant to change: an OT engineer, standards practitioner or
risk professional lands on the homepage and leaves without learning that a specific
result here is worth twenty minutes of their time.

The belief that has to shift is "another vendor whitepaper" to "this contains a
result I need."

## What this is not

Not a ticker, and not a marquee, despite the request that started it. Two findings
moved the design.

**The pattern reads as template.** The infinite marquee saturated SaaS and startup
landing pages from 2021 onward. On a site whose credibility rests on rigour, it
imports the semiotics of a broadcast crawl.

**The accessibility cost is real.** WCAG 2.2.2 Pause, Stop, Hide is a Level A
criterion triggered by content that starts automatically, runs longer than five
seconds, and sits alongside other content. An auto-marquee hits all three, so it
obligates a visible pause control; hover-pause does not satisfy it for keyboard or
touch users. Scroll-driven motion sidesteps the criterion entirely, because motion
stops when the user stops.

Auto-advancing carousels were considered and rejected on evidence. A Notre Dame
study found roughly one percent of visitors clicked a homepage carousel, and near
ninety percent of those clicks landed on the first slide. The Queensland Government
design system ships no carousel component and recommends against them.

## The two components

They are separate on purpose. Highlighting research and orienting a visitor across
working groups are different jobs, and merging them produces a surface that does
neither.

### 1. FeaturedFindingsBand

Five featured papers. Each card carries, in this order: the working group code and
badge, the **hook**, then the title.

The hook leads. The title is the small print. A strip of titles is a table of
contents; a strip of findings is an argument.

### 2. WorkingGroupsStrip

Nine working groups, each with a live document count derived from the registry. No
motion at all. This is navigation, and it is also the surface most at risk of going
stale: the site advertised "25 Treatises" until today, when the real number was 59.

Current values, all derived and none hardcoded:

| WG | Documents |
|:---|---:|
| WG-01-UI Actuarial | 12 |
| WG-02-DT Digital Twin | 10 |
| WG-03-ML | 7 |
| WG-04-CF Cascading Failure | 8 |
| WG-05-CAD | 14 |
| WG-07-TM Threat Modelling | 4 |
| WG-08-MO | 1 |
| MP-MATH | 2 |
| GOV-RES | 1 |
| **Total** | **59** |

## Placement

Both go after the `research-portals` section closes and before
`<UnifiedStandardBand />`, around line 163 of `web/src/app/page.tsx`.

Directly under the Hero was rejected: a strip of cards there competes with the
site's opening statement and pushes the portal cards below the fold. After the
portals the visitor has been oriented and is ready for "here is what is actually
inside." `FeaturedFindingsBand` first, `WorkingGroupsStrip` immediately after.

Correction recorded 2026-09-08: an earlier draft of this spec named a `Compass`
component at this seam. There is none. `Compass` is a lucide icon used inside one
of the four portal cards. The placement is unchanged; only the landmark was wrong.

## Data model

Two optional fields are added to `WikiDocumentMeta` in
`web/src/lib/wikiRegistry.ts`:

```ts
export interface WikiDocumentMeta {
  // ...existing fields unchanged...
  featured?: boolean;
  hook?: string;
}
```

`featured` marks a document for the band. `hook` carries its one-line finding.

Both live beside the document's own metadata rather than in a separate curated
list. Every hardcoded list in this repo has rotted; today's count was stale by 34,
and the plan file recorded stale per-working-group counts alongside it. A flag on
the entry cannot drift from the entry.

Ordering is by `featuredRank`, a third optional field, ascending. If more than five
carry the flag, the component renders the first five and the build does not fail;
the count is a display decision, not a data constraint.

Correction recorded 2026-09-08. This section originally said ordering follows
registry order, which contradicted the design's own statement that Rail leads.
Rendering the band exposed it: Rail came fourth. `featuredRank` resolves it while
keeping the principle that nothing lives in a parallel list, and `audit-featured`
now requires a rank on every featured document and rejects duplicates.

## The hooks

Written to a single rule: **state the finding, withhold only the mechanism.**

An expert reading "Fifty-eight candidates. True, conformant, operationally
worthless" has the entire result and still has to know how. The gap opens because
they understand the domain, not because information was withheld from them.
"You won't believe what we found" does the opposite, and on this audience it reads
as a vendor tell.

Every hook below quotes or paraphrases a verified finding in the paper it names.
None was generated from an abstract.

| Slug | Hook |
|:---|:---|
| `rail-refdepot-emu-12` | The most dangerous item in the set had the lowest service impact. Availability triage ranks it last. |
| `manufacturing-refpharma-api-1` | Fifty-eight candidates. True, conformant, operationally worthless. |
| `blast-radius-three-ontologies` | A blast radius can contain equipment whose loss removes the hazard. Its size is not a measure of harm. |
| `cim-profile-cyber-physical` | A model that says nothing about a relay is not a model that says there is no relay. |
| `refbess-250mw-specification` | Fifteen parameters sourced, thirty-five modelled, and every row says which. |

Rail leads. It carries the only safety consequence in the set, and the item that
breaks the pattern is the one that gets remembered.

Three further hooks are written and not featured in this pass. They are recorded
here so the work is not lost and so a later rotation has stock to draw on:

| Slug | Hook |
|:---|:---|
| `three-identity-join` | Three schemas, three identifiers, and no file permitted to hold another's. Thirty-five requirements to join them anyway. |
| `energy-refbess-250mw` | One advisory, three hops, and a change-control scope produced by traversal instead of by someone reading a spreadsheet. |
| `conformance-reference-implementation` | Thirty-two rules. Until they run, every finding in this programme is reasoned rather than observed. |

### Five further hooks, added 2026-09-08 on request

Risk modelling, catastrophe modelling, TACAM, ATQ and supply chain visibility.
Each is grounded in a verified passage in the paper it names.

| Slug | Hook |
|:---|:---|
| `ale-rosi-decision-framework` | A modelled 859 percent return, and a section explaining why the models behind it understate the tail. |
| `monte-carlo-engine` | Uniform sampling almost never walks into the catastrophic path. This engine weights the walk toward it. |
| `tacam-deep-dive` | Actor-to-technique tables are two-dimensional. This profiles 389 groups across seven. |
| `atq-deep-dive` | Three hundred and sixty-five percent more variance in the top decile, which is what separates a dormant actor from one already in position. |
| `supply-chain-eu-cra-standards` | Twenty-four hours to notify, and provenance evidenced on demand, down through ODMs and sub-tier silicon foundries. |

Sources for each, so a later editor can check them without rereading the papers:

- **ALE-ROSI** states a modelled programme ROSI of 859 percent against 15,350,250 USD
  of annual expected loss, and separately states that ALE, Gordon-Loeb and Gaussian
  Value at Risk all underestimate catastrophic tail risk because they assume
  thin-tailed distributions. The hook pairs the number with that admission, because
  the admission is the more unusual half.
- **Monte Carlo Engine** replaces a uniform breadth-first search with an
  importance-weighted one, selecting edges under a Boltzmann distribution.
- **TACAM** profiles threat actors across seven independent dimensions, 77,279 data
  points over 389 groups, and criticises the two-dimensional actor-to-technique table
  as the thing it replaces.
- **ATQ** reports that its formulation expands top-decile score variance by 365
  percent, separating dormant historical actors from actively pre-positioned ones.
- **Supply Chain and EU CRA** describes 24-hour vulnerability notification cadences
  and supply chain provenance a manufacturer must evidence on demand to a notified
  body, reaching ODMs, sub-tier silicon foundries, open-source firmware repositories
  and third-party commercial software.

Thirteen hooks now exist. Five are featured. The other eight are stock for rotation
and cost nothing to hold.

### Voice constraints on any future hook

No urgency, no scarcity, no "critical infrastructure at risk." That audience has
been marketed at by every vendor in the sector and is immune to it. Persuasion here
is carried entirely by being specific about real results, including unflattering
ones. The conformance hook admits nothing has been observed yet, and that admission
buys more credibility than a claim would.

Hooks obey the repo style contract: no em dashes, no banned filler words, plain
language over abstraction.

## Motion

CSS scroll-driven animation, with a fully usable static fallback.

The strip translates a small distance on the X axis as it passes through the
viewport, tied to a view progress timeline rather than a clock. Motion follows the
reader's own scrolling, so it stops when they stop, and WCAG 2.2.2 does not apply.

```css
.findings-track {
  animation: findings-drift linear both;
  animation-timeline: view();
  animation-range: entry 20% exit 80%;
}

@keyframes findings-drift {
  from { transform: translateX(2%); }
  to   { transform: translateX(-6%); }
}

@supports not (animation-timeline: view()) {
  .findings-track { animation: none; }
}

@media (prefers-reduced-motion: reduce) {
  .findings-track { animation: none; }
}
```

Three properties of this choice matter.

**It animates `transform` only.** Compositor-only properties animate at roughly one
percent dropped frames; animating `top` or `left` costs about fifty percent.

**It needs no JavaScript and no new dependency.** Framer Motion 11 is installed and
was considered. It would run a requestAnimationFrame loop for the life of the page,
on a homepage that already renders a Hero, an S-curve section and a canvas
background. A permanent main-thread loop for decorative drift is not worth it.

**The fallback is the design, not a degradation.** Firefox does not yet support
`animation-timeline` without a flag. Where the animation does not run, the component
is a horizontal scroll-snap strip, which is completely usable. Nothing is hidden and
no content becomes unreachable.

## Accessibility

The band is a horizontally scrollable list, not a moving object.

- `overflow-x: auto` with `scroll-snap-type: x mandatory` and `scroll-snap-align:
  start` on each card. Native momentum on touch, native keyboard scrolling, native
  screen reader behaviour.
- Every card is a single `<a>` wrapping its whole content, so there is one tab stop
  per paper and the whole card is a target.
- No duplicated content. The infinite-loop technique that requires `aria-hidden`
  clones is not used, so no paper title is announced twice and no keyboard user can
  tab into an off-screen copy.
- `prefers-reduced-motion: reduce` stops the drift. Because the underlying layout is
  already a scroll strip, the reduced-motion state loses nothing. This is the failure
  most marquee implementations make: they disable the animation and silently clip
  most of the content.
- The section carries an `aria-label` naming it, and the strip carries a visible
  "all 59" link to `/wiki` so the same content is reachable without horizontal
  scrolling.
- No pause control is needed, and none is added. Adding one would imply motion the
  component does not have.

## Hard constraint: never import `wiki.ts`

Both components import from `web/src/lib/wikiRegistry.ts` only.

`wikiRegistry.ts` is metadata and deliberately does not import the generated content
bundle. `wiki.ts` does, and that bundle is about 3.3 MB. It is why `/wiki` currently
ships roughly 1.65 MB of First Load JS.

Pulling it into the homepage would be a severe self-inflicted regression on the most
performance-sensitive route on the site. Any field either component needs must live
in `WikiDocumentMeta`. This is why `hook` is a metadata field and not an excerpt
derived from the paper's text.

## Files

```
web/src/components/home/FeaturedFindingsBand.tsx   create
web/src/components/home/WorkingGroupsStrip.tsx     create
web/src/app/globals.css                            add the two keyframe blocks
web/src/lib/wikiRegistry.ts                        add featured? and hook? to the
                                                   interface; set them on 5 entries
web/src/app/page.tsx                               render both after Compass
```

Both components are client components, consistent with the rest of the homepage.
Each is a single file with one responsibility, reads from one module, and holds no
state.

## Styling

Existing design tokens only, matching the `/unified-standard` card pattern already
in the repo: `bg-surface`, `bg-canvas`, `border-hairline`, `text-dutchOrange`,
`text-primary`, `text-secondary`, `text-muted`, `rounded-2xl`, and the
`font-mono text-[11px] tracking-wider uppercase` treatment for working-group codes.

No new colours, no new spacing scale, no new component primitives. The site has a
deliberate visual language and this has to sit inside it rather than beside it.

## Verification

1. `npx tsc --noEmit` exits 0.
2. `npm run build` reports AUDIT PASSED at 65 documents and compiles clean. Run the
   build separately from the dev server; a production build overwrites the dev
   server's chunks and every page then returns 500.
3. Homepage First Load JS does not increase by more than 15 kB. Check the build
   output for `/`. A jump of hundreds of kB means something imported `wiki.ts` and
   the change must be reverted, not shipped.
4. Rendered in a browser, both light and dark mode: five cards appear, hooks read
   above titles, the strip scrolls horizontally with snap, and the drift is visible
   while scrolling in a browser that supports `animation-timeline`.
5. Working-group counts on the strip equal each group's `documents.length` and total
   59. Compare against `/tracks`, which already derives the same numbers.
6. With `prefers-reduced-motion: reduce` set at the OS level, no drift occurs and all
   five cards remain reachable by scrolling.
7. Keyboard only: tab reaches exactly five links in the band, each scrolls its card
   into view, and focus is visible on each.
8. Console shows no hydration warnings on the homepage.

## Out of scope

- Rotating or scheduling which papers are featured. Five flags, changed by hand.
- Publication dates. `WikiDocumentMeta.publicationDate` exists and is unset on most
  entries, so "newest five" is not currently computable. Adding dates across 59
  documents is its own piece of work and is not required for this.
- Hooks for the other 46 documents. Thirteen are written, five are used.
- The `/wiki` bundle-size problem. Pre-existing, and its sidebar genuinely needs
  content for search, so it is not a drive-by fix.
- Any change to the curated card sets on `/unified-standard`. Their counts are
  editorial and stay literal.
