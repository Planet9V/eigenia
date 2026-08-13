# /collaborate page redesign — record

Built via a 3-option exploration (grounded in the live codebase, the skill
vault of the local super-intelligence-framework MCP gateway, and CRO
frameworks) → chose Option A (redesign in place). This document is the
reference record; Option 3 (deferred, future execution) is in the sibling
file `collaboration-platform-roadmap.md`.

## What was wrong (found by reading the live page, not guessed)

1. Only 3 engagement pathways existed (pro-bono utility audit, academic
   fellowship, actuarial/commercial validation). **No sponsor/funder
   pathway at all** — a real gap against the actual ask.
2. The "Research Track" selector (Risk / DEXPI / Actuarial) showed for
   every pathway, including ones with no track to select.
3. Zero trust signals before the ask — hero → 3 cards → form, no proof
   points, no methodology credibility, nothing answering "why trust a
   think tank I haven't heard of" before asking for an institutional
   email.
4. Zero motion despite Framer Motion already being a site-wide dependency
   — this page was flatter than the rest of the site.
5. Hand-rolled `<div className="p-8 rounded-2xl bg-surface border...">`
   × 3 instead of the existing reusable `Card`/`SectionBand` components.
6. One generic "Send" CTA regardless of pathway; email placeholder biased
   toward academia (`vance@university.edu`) even when a utility or
   commercial pathway was selected.
7. **Discovered while implementing, not part of the original ask**:
   `JoinResearchCTA.tsx` references translation keys (`join_tag`,
   `join_title`, `join_desc`, `join_btn_apply`) that **do not exist
   anywhere in `translations.ts`**, and the component itself is not
   imported by any other file in the codebase. It is dead code that, if
   it were ever wired up, would currently render raw key names as
   visible text instead of copy. Left untouched — out of scope for this
   pass, flagged here so it isn't silently forgotten.

## What was built (Option A)

- **4th pathway: Sponsor / Fund the Lab.** New translation keys
  (`collab_t4_*`, both `en` and `nl`) framed correctly for a think tank —
  "no equity, no commercial obligation," directs to open/published
  research, named-fund or general support. Distinct icon (`HeartHandshake`).
- **Trust-signals band**, added between the header and the pathway grid:
  Open Methodology, Domain-Native Rigor, Confidential by Default. Framed
  as methodology/posture claims already true of the site's own content
  (GGNN, Clayton copulas, DEXPI, confidentiality-by-default), not
  fabricated stats ("N clients served") with no evidence behind them.
- **Conditional Track selector** — hidden for `sponsor` (and kept for
  `probono`/`academic`/`commercial`, unchanged), since a gift to the lab
  has no research track to select.
- **Per-pathway dynamic fields**: email/org placeholder text and the
  email/org/message field *labels* now vary by pathway (a sponsor sees
  "Organisation (optional for individual funders)" and "How you'd like to
  support the lab," not academic-biased copy). Organisation field is not
  `required` for the sponsor pathway.
- **Per-pathway CTA microcopy**: submit button reads "Request Audit" /
  "Apply for Fellowship" / "Request Validation Briefing" / "Send
  Sponsorship Inquiry" instead of one generic "Send."
- **Card grid CTA buttons**: each of the 4 pathway cards now has its own
  button that both selects that pathway *and* scrolls to the form
  (`#collab-form`), instead of the cards being purely decorative above a
  disconnected form.
- **Motion**: header fades/slides in on mount; trust-signal cards and
  pathway cards animate in on scroll (staggered), the form card fades in
  on scroll — using the site's existing Framer Motion dependency and the
  `Card` component's built-in motion support, no new dependency added.
- **Component reuse**: hand-rolled divs replaced with `Card`
  (`variant="elevated"`) and `SectionBand` for the trust and pathway
  sections — closes the inconsistency, zero visual regression risk since
  these components already define the same visual language used
  elsewhere on the site.
- **No new libraries added.** Everything above uses dependencies already
  in `package.json` (Framer Motion, lucide-react).

## Files touched

- `web/src/locales/translations.ts` — new `collab_t4_*`, `collab_trust_*`,
  `collab_form_pathway_opt4`, `collab_form_*_sponsor`,
  `collab_form_submit_*` keys, both `en` and `nl`; reworded
  `collab_tracks_tag`/`_desc`/`collab_header_desc` from "three" to "four"
  ways to engage.
- `web/src/app/collaborate/page.tsx` — full rewrite along the lines above.
  `web/src/lib/useContactForm.ts` and `web/src/app/api/contact/route.ts`
  were **not** touched — the existing nodemailer → `jim@eigenia.nl`
  pipeline (with its mailto fallback on error) is reused as-is; the form
  now just sends `type: "sponsor"` as one more value alongside the
  existing three.

## Verification performed

- `npx tsc --noEmit` — clean.
- `npm run build` — see the conversation this was built in for the actual
  result; do not assume success without checking it was actually clean.
- **Not deployed.** This is a local, uncommitted change to a live
  production site's repository. Per Eigenia's standing production-safety
  rule, nothing here should be pushed or deployed without a separate,
  explicit go-ahead — this record exists so that decision can be made
  with full context, not so it happens automatically.

## What this deliberately did NOT do

- Did not touch the homepage's link to `/collaborate` (still a plain
  link, unchanged destination — no reason to touch it).
- Did not fix the orphaned `JoinResearchCTA` component — flagged above,
  left for a separate, explicit decision.
- Did not add an LLM-backed intake wizard (that was Option B from the
  original 3-option exploration — not chosen this pass, not implemented).
- Did not touch `Mission.tsx`, papers/wiki content, or any route besides
  `/collaborate`.
