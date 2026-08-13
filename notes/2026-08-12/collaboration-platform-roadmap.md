# Option 3 — a collaborative research platform (deferred, future execution)

Not built. This is a roadmap document for a genuinely separate application,
scoped out during the same exploration that produced the `/collaborate`
page redesign (see the sibling file `collaboration-page-redesign.md` for
what was actually shipped). Written to be specific enough to plan and
estimate later, not vague enough to need re-deriving from scratch.

## Why this is a separate application, not a bigger page

The redesigned `/collaborate` page is a **lead-capture surface** — it
routes an interested party to a human (Jim) via email. This option is
different in kind: a **standing platform** with accounts, ongoing state,
and content that outlives any single submission. That's the line that
justifies a separate app rather than "just add more to the page":
persistent identity, moderation, and a real database (the project's
first — everything today is markdown files + one contact-form API route).

## The generic version (baseline, not the interesting part)

A Product-Hunt-style board: submit a research proposal, track its status,
browse other public submissions, comment. This is the obvious shape and
is included here only as the floor, not the ceiling — it doesn't connect
to anything Eigenia specifically does, and a dozen off-the-shelf
form-builder + Airtable combinations already do this adequately.

## Where the actual innovation is — three ideas specific to Eigenia

### 1. A public sandbox, not just a submission form

Eigenia's actual differentiator (per its own trust-signal copy, now live
on `/collaborate`) is "reproducible physics, not compliance checklists" —
open, peer-reviewable models. A crowdsourced platform that's actually
*of* that mission, not just adjacent to it, would let a visitor run a
simplified, safe, public version of the lab's own methods — e.g. a toy
cascading-failure simulator over a synthetic (not real) infrastructure
graph, using a simplified GGNN or copula-based propagation model in the
browser — before ever filling out a form. A compelling configuration a
visitor builds ("look what happens when I stress this node") becomes the
natural on-ramp into "talk to us about the real version." This is
"agent-driven" in the sense the original ask raised, without requiring an
LLM: the interesting agent here is the simulation itself.

Technically: a client-side simulation (WebGL/Canvas + a simplified,
open-sourced subset of the real model — deliberately not the production
risk engine, to protect both IP and against misuse) is self-contained,
needs no new backend, and could plausibly be prototyped *within* the
current Next.js app before the rest of the platform exists.

### 2. A living, public risk registry — the platform produces trust signals, not just collects leads

Rather than a private queue of submissions, a structured, versioned,
public registry of **anonymized/aggregated** findings (with explicit
utility/partner consent per entry) — audit patterns, validated model
outputs, fellowship publications — presented as a citable public good.
This directly closes the gap the redesigned page's trust-signals section
can only gesture at with words ("we do rigorous work") — the registry
would let it be shown instead of claimed. A sponsor funding a specific
track could watch that track's registry entries accumulate over time
instead of getting a one-time thank-you email.

### 3. An open peer-verification layer on proposals

Instead of a black-box application queue (submit → wait → maybe hear
back), let submitted research proposals be genuinely open for public
comment and replication attempts from the academic community before a
decision is made — closer to how the lab already frames its own
methodology (open, peer-reviewable) than a typical hidden-review funnel.
This is the one piece of this roadmap that most directly extends the
"Open Methodology" trust pillar into the collaboration process itself,
not just the research output.

### 4. (Named separately — bigger scope, bigger payoff, bigger risk) A vetted data-contribution pathway

The most ambitious and most directly mission-aligned idea, kept separate
because its risk profile is different from 1–3: let vetted grid
operators/utilities contribute anonymized, aggregated infrastructure
topology or incident data to improve the underlying models — turning
"collaboration" into part of the actual research supply chain, not just
a funnel toward it. This is a genuine network effect (more data → better
models → more credibility → more willing contributors) but requires data-
sharing agreements, anonymization guarantees a lawyer should review, and
a much higher trust bar before any utility would participate. Flagged
here as the highest-ceiling, highest-effort idea — not something to
attempt until 1–3 have proven the platform is worth the investment.

## What building any of this actually requires

- **A real database** — first one in the project. Postgres is the
  obvious default given Next.js/Railway's existing familiarity elsewhere;
  no reason to introduce anything exotic.
- **Auth** — even a lightweight magic-link or OAuth flow is new surface
  area this codebase doesn't have today.
- **Moderation** — public comments/registry entries need a review step
  before publication; this is an ongoing operational commitment, not a
  one-time build.
- **Legal review** for idea #4 specifically (data-sharing/anonymization
  agreements) before any utility data pathway is built, let alone shipped.
- **A decision on where it lives** — a subroute of the existing site
  (`/collaborate/portal`) versus a fully separate deployable app. A
  subroute is simpler to link to and share auth/branding with; a separate
  app isolates its infrastructure (a public sandbox simulator or open
  comment system is a different risk profile than the mostly-static
  marketing site it would sit next to) and avoids adding always-on
  database/auth dependencies to what is otherwise a simple static-content
  deployment.

## Sequencing suggestion (not a commitment, just a reasonable order)

1. Idea #2 (public registry) first — it's additive to what the redesigned
   `/collaborate` page already promises, needs the least net-new
   infrastructure (read-heavy, moderation-light if entries are
   pre-approved before publication), and directly strengthens the page
   that already exists rather than starting an entirely new surface.
2. Idea #1 (public sandbox) second — self-contained, no auth/DB
   dependency, could genuinely live inside the current app as an
   experiment before any of the rest of this roadmap is committed to.
3. Idea #3 (open peer-verification) once there's an actual pipeline of
   submissions worth making public — no point building review
   infrastructure for a trickle of proposals.
4. Idea #4 (data contribution) only after 1–3 have demonstrated real
   engagement and only after the legal groundwork is separately done.

Nothing here is scheduled. This document exists so the idea doesn't have
to be re-derived from scratch whenever this becomes a live priority.
