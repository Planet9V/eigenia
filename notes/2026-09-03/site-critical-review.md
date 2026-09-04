# Eigenia B.V. — Critical Site Review

**Reviewed:** 3 September 2026 · production `https://eigenia.nl` + repo HEAD (6 commits ahead of origin)
**Scope:** content credibility, design/UX, accessibility, SEO, code/security, performance, positioning

---

## 1. Verdict

No. As it stands this site would not convert a skeptical catastrophe underwriter, and the reasons are not taste. The visual design is genuinely competent (one accent, real theme tokens, a working dual theme, a hero canvas that correctly honours `prefers-reduced-motion`), the technical scaffolding is present (sitemap, JSON-LD, per-paper `generateMetadata`, server-rendered paper pages), and there is real substance in the corpus — `WG-01-UI-1-Cyber_Risk_Underwriting.md` is an accurate survey of actual market practice, and the ATQ paper names authoritative per-dimension sources (FIRST EPSS, ACLED, MITRE). That work is buried under three things a diligence-minded reader hits in the first hour: three fabricated journal articles with placeholder DOIs (`10.xxxx/cipr.2024.xxxxx`) published live under "Primary Sources — McKenney Research"; the flagship ROSI and ALE equations rendering as a red KaTeX parse error in production; and a Dutch B.V. that publishes an Impressum claiming EU statutory compliance while omitting the KvK number, the VAT ID and the address, with two of its three advertised external identities returning 404.

The fix list is mostly small and mostly content, not code. A weekend of edits moves this from "probably a shell" to "worth a call."

---

## 2. The three things that matter most

### 2.1 The corpus contains fabricated sources and broken mathematics, on the pages your target reader opens first

Three defects compound:

**Fabricated publication record.** `references/WG-04-CF-Cascading-Failures/WG-04-CF-Cascading Failure Hypothesis.md:3931,3933,3935`, live at `/papers/cascading-failure-hypothesis`, under the heading `#### Primary Sources - McKenney Research`:

```
McKenney, J. (2024). "Death Wobble: Grid Frequency Instability from Coordinated
DER Attacks." Critical Infrastructure Protection Review, 12(3), 145-178.
DOI: 10.xxxx/cipr.2024.xxxxx
```

Plus two more (*Energy Security Quarterly* 8(1), *Grid Modernization Journal* 15(4)). None of those journals exist; the real title in this space is Elsevier's *International Journal of Critical Infrastructure Protection*. `grep -rn "10.xxxx" references/` returns exactly those three lines. The same bibliography cites `ACME Inc. Internal Report EE-CTI-004`. Adjacent: a bibliography entry for `Seldon, H. (2025)` — Asimov's Hari Seldon — sitting beside genuine Kramers 1940 and Hänggi 1990 references at `MP_Kramers_Escape_Model.md:45`, live at `/papers/kramers-escape-model`.

**Broken math.** `grep -roP '\x09ext\{' references/` returns 1,346 hits across exactly 17 files; `\x0crac` returns 159 across the same 17. Root cause is confirmed: 18 of 20 `scripts/compile_*.py` embed LaTeX in non-raw Python strings, so `"\text"` silently became TAB + `ext`. Production `/papers/calculus-of-the-subject` renders a red error block: `ParseError: KaTeX parse error: Unexpected character ... ext{ROSI} = rac{(\text{ALE}...`, plus 100 leaked `ext{` fragments in body prose ("reducing annualized loss expectancy from 12,400,000 e x t U S D"). The concentration is in exactly the quantitative papers: CyHAZOP-Methodology (134), CyHAZOP-Node-Registers (128), Emerging-Power-Topologies (104), ALE-ROSI-Decision-Framework (86), Quantitative-Cyber-Physical-FMECA (92). PILLAR 01 on `/mission` promises "open, reproducible mathematical equations."

**Silent heading corruption.** Separately, `splitRunInHeading()` rewrites 76 author headings across 26 papers, demoting half of each section title into body text. Verified live. In total, 33 of 46 published papers carry at least one verified rendering defect. The build "gate" `audit-publications.js` compares word counts against a value it just computed, so none of this is detectable by the pipeline.

**Fix.** (a) Delete the three fabricated journal entries, the ACME lines, and the Seldon entry today; add a pre-publish grep gate for `10.xxxx`, `xxxxx`, `ACME`. (b) Convert every `compile_*.py` to raw strings (`r"""..."""`) and re-run, then fail the build if any file under `references/` contains `0x09`/`0x0C` immediately followed by `ext{`/`rac`. Verify by curling three rendered pages, not by reading the `.md`. (c) Fix `splitRunInHeading`. Effort: (a) 30 minutes, (b) half a day, (c) 1-2 hours.

### 2.2 The entity is not verifiable, and three of four advertised identities are dead

`ImpressumModal.tsx:23` heads a modal "EU Statutory Legal Disclosure (Impressum) / Compliant with Dutch Law & EU Directive 2000/31/EC". The registry field reads only "The Netherlands (KvK Registered B.V.) / Belastingdienst Tax Compliant." The footer on every page says "KVK (Dutch Chamber): Registered B.V." No number. Art. 5(1) of that directive requires (b) geographic address, (d) trade register and registration number, (g) VAT number. All three are absent from the page asserting compliance with it.

Note the verifier's correction: the KvK number does not exist anywhere in the repo. `README.md:191` has a BTW/VAT ID (`NL865421908B01`) and `README.md:188` has an address (Herengracht 450, 1017 CA Amsterdam), neither of which reaches the site. So this is not a copy-paste; you need the KvK extract.

Then the external trail:

| Identifier | Where | Result |
|---|---|---|
| `github.com/Planet9V/eigenia` | JSON-LD `sameAs` | 200 |
| `linkedin.com/company/eigenia-b-v` | JSON-LD `sameAs` | **404** |
| `x.com/eigenia_bv` | `sameAs` + `twitter:creator` | **404** |
| `eigenia.com` | Impressum: "Official Web Domains... 100% Unencumbered Ownership" | TLS handshake fails, http → **404** |

Controls confirm these are real 404s, not bot walls (`linkedin.com/company/anthropicresearch` → 200, `x.com/AnthropicAI` → 200). `linkedin.com/company/eigenia` does resolve, but that is a different URL from the one shipped.

On top of that, no `/papers` page renders an author or a date. The paper header shows "100% Complete & Untruncated / 9,146 Characters / 147 Lines / 1,329 Words" where a byline belongs, and the foot shows "Exact Verification Audit: 9,146 chars". There is no `/about`, no bio, no LinkedIn link on any page. The wiki does render authors, but as four different identities for one person: 27× "Lab Sponsor Resident, j.mckenney", 3× "J. McKenney", 1× "H. Mckenney" (`wiki.ts:801`), 1× "Eigenia Labs Governance", with 15 documents carrying none. Only 5 of 47 documents have a `publicationDate`; every paper page emits the same hardcoded `article:published_time` of `2026-05-01T00:00:00.000Z`.

Twenty-plus years of OT/ICS practice is the single most convertible asset here and it is invisible on the live site.

**Fix.** Put KvK number, BTW ID and registered address in the footer and Impressum, link the KvK number to its openbaar handelsregister entry. Remove the two dead `sameAs` entries and `twitter:creator`, or create the accounts. Either redirect `eigenia.com` to `eigenia.nl` or delete the claim. Replace the four count badges on every paper with Author / Published / Last revised / Working group. Add an `/about` page. Effort: half a day, plus whatever it takes to pull the KvK extract.

### 2.3 The 46 treatises are architecturally orphaned, and a 3.4 MB regression is queued to ship

Two separate problems that reinforce each other.

**Nothing on the site links to the indexable copies.** `/tracks` — the research index — links every document to `/wiki?wg=…&doc=…` (`tracks/page.tsx:169,178,195,238,258`). Grepping production HTML for `href="/papers/` returns 0 on every page including the paper pages themselves. `curl https://eigenia.nl/papers` → 404; there is no index route. The only `/papers/*` links in the codebase are in `LabsShowcase.tsx:28` and `TalebPapersSection.tsx:146`, both known dead code. Meanwhile `/papers/[slug]` is the surface that server-renders, carries per-document canonicals, OG/Twitter tags and ScholarlyArticle JSON-LD, and sits in the sitemap.

The destination those links point at renders nothing. `curl https://eigenia.nl/wiki` returns 15,188 bytes whose entire visible body text is `Loading Sovereign Research Wiki...`; `?wg=X&doc=Y` is byte-identical (md5 `14abb178…`) for every combination. `/wiki` also has no navbar, no footer, no link home, no contact link and no CTA anywhere — `grep -rn 'href="/"|collaborate|mailto|Contact'` on `app/wiki/page.tsx` and `components/wiki/` returns nothing. A reader who has just finished a 5,000-word treatise, the highest-intent moment on the site, has no way to reach you.

And the paper page — the one Google actually sees — opens with a banner it prints on all 46: "Reading in standalone mode. Open this treatise in the complete 2-Column Sovereign Research Wiki Engine." You are pointing search traffic at the version your own copy calls degraded, then routing it to a spinner.

**The bundle regression.** `Navbar.tsx:10` (a client component on every route) imports `@/lib/wiki`, which statically imports the 3,289,827-byte `generatedReferencesContent.json`. It uses it only for counts. Webpack emits a single 3,396,115-byte chunk containing the full prose of all 46 treatises and ships it everywhere. Isolated rebuild with only that import replaced by literals:

| Route | Now | Without the import |
|---|---|---|
| `/` | 1.17 MB | 256 kB |
| `/collaborate` | 1.08 MB | 169 kB |
| `/mission` | 1.08 MB | 168 kB |
| `/physics` | 1.17 MB | 251 kB |
| `/papers/[slug]` | 1.15 MB | 237 kB |
| `/unified-standard` | 1.10 MB | 180 kB |

Introduced by 76a1002 ("derive treatise counts from the registry"), not yet deployed. Production today already pays 921 kB gzip of it on `/wiki` and `/tracks`, and `/tracks` never reads a single character of that content (`grep -n "\.content" tracks/page.tsx` → nothing).

**Fix.** Split metadata from content: move the working-group registry into its own module that does not touch `generatedReferencesContent`, have `wiki.ts` load content lazily only where rendered. Then invert the link direction — make `/papers/<slug>` canonical, link `/tracks` at it, add a real `/papers` index grouped by working group, delete the "standalone mode" banner, and demote `/wiki` to a reading shell. Effort: 1 day for the split, 1 day for the IA change. Verify with `npm run build` before pushing.

---

## 3. Findings by dimension

### 3.1 Content credibility

**Critical**
- **Fabricated journal record** — `WG-04-CF-Cascading Failure Hypothesis.md:3931-3935`. See §2.1.
- **17 files of corrupted LaTeX** — 1,346 corrupted `\text`, 159 corrupted `\frac`. See §2.1. (Note: the code review counted 833 expressions across 18 files using a different regex. The file set is 17-18 either way; the fix is the same.)

**High**
- **Fictional author in a bibliography** — `Seldon, H. (2025), Topological Cyber-Physical: Foundations of the Digital Twin` at `MP_Kramers_Escape_Model.md:45`, formatted identically to real Kramers and Hänggi entries. Same pattern at `Mckenney-Lacanian.md:87` ("Psychohistory and the Digital Twin") and `Musical-Psychometric-Notation.md:558` ("AEON Research Division"), neither of which resolves. *Disagreement noted:* one reviewer called this the "physics section"; it is filed as ACTUARIAL 12 (`papers.ts:212-216`). The verifier downgraded from critical to high — it is one line of self-referential Asimov branding, not a DOI-bearing fake. Delete it anyway.
- **Two wrong public-domain facts on the framework's own intro page** — `WG-07-TM-TACAM.md:23` says "27 MITRE ATT&CK enterprise tactics" (it is 14); line 24 says "17 CISA critical infrastructure sectors" (it is 16). The same file's table 33 lines below correctly uses "12/14", "14/14". The corpus gives three sector counts: 17, 15 (`ATQ.md:75`, and the σ7 formula divides by 15), 16. The acronym is unstable too: TACAM = "Threat Actor Capability & Motivation Matrix" vs "…& Asset Matching"; "Adversary" vs "Adversarial" Threat Quotient. Fix to 14 and 16, pick one expansion. Highest credibility-per-character return on the site.
- **Lloyd's Y5381 invoked in 25 files, never dated or sourced, and mischaracterised.** `grep -rn "Y5381" references/ | grep -iE "2022|august|lloyds.com|Y5433"` returns nothing. It is called a "War/Terrorism Exclusion" (`MP_Mathematical_Models.md:561`), attributed to the LMA rather than Lloyd's, applied to property cat and BI reinsurance (`Loman:7`), and given a fabricated bibliographic entry: "Lloyd's Market Association (LMA). *Cyber Physical Damage and Consequential Loss Endorsement.* LMA5381 / Y5381 Guidelines, London, 2019" (`Frontier-AI-Hardware-Security.md:600`) — wrong body, wrong title, wrong year. Three papers claim the "war exclusion waived", which no syndicate can do under a bulletin that mandates it. Actual: Lloyd's Market Bulletin, 16 Aug 2022, state-backed cyber-attack exclusions in standalone cyber policies from 31 Mar 2023. This is the regulatory hook the whole underwriting pitch hangs on.
- **38 of 46 papers have no bibliography.** `WG-02-DT-1.md` — Paper I of the lead Digital Twin track — renders 127 `[n]` markers spanning [1]–[9] in production and the words "References" and "Bibliography" are both absent from the page. Nine sources would fix it: Taleb ×3, Granovetter 1973, a standard Ising reference. Where citations are done well (Death Wobble, 85 numbered entries with URLs and access dates), they lean on Wikipedia, pvcase.com and an EV Summit registration page as evidence in a grid-stability argument.

**Medium**
- **Headline capability numbers contradict each other.** 77,279 data points (TACAM:17, internally consistent), "80,000 knowledge graph edges" (ATQ:70), "3.2 million node knowledge graph" (Competitive_Analysis:27). "Curated Incident Corpus" appears exactly once in the corpus and is never defined, yet supplies 365%, P(x≥3)=0.942, 94.2%, Lazarus 120 / Dragonfly 68 / APT28 53. Thermal runaway is "12 to 45 seconds" in one paper and a flat "45-second thermal trip cliff" in five others; delamination is 94.0 °C in one and 88.0 °C in another. Publish one dated fact sheet and derive every mention from it.
- **"Verified ROSI"** — 8 papers share the sentence stem "yielding a verified Return on Security Investment", with different numbers (3,180% / 4,838% / 4,236% / 4,320% / 2,895% / >21,000% / 842%). *Reviewers disagreed here and the verifier was right:* the flagship `ALE-ROSI-Decision-Framework.md:131-168` **does** carry a node-by-node derivation (named 100 MW facility, per-node AV/EF/SLE/ARO, totals, Gordon-Loeb ceiling). The real defect there is internal inconsistency — the abstract says 842% / $15.07M / "49% of the Gordon-Loeb ceiling" while its own table computes 859% / $15,350,250 / 24.99%. So: global replace "verified ROSI" → "illustrative ROSI", add one line saying the parameters are illustrative, and fix the abstract's arithmetic. Do not delete the worked examples; they are useful.
- **"Retrospective analysis of 15 Seldon Crisis events"** (`Musical-Psychometric-Notation.md:492-495`) reports mean 22 / min 8 / max 47 minutes with no event list, dataset, dates or methodology. Either publish the 15 events or relabel it a simulation.
- **The repo's own sourcing policy is followed zero times.** `references/external-research/` contains only its README; "novel synthesis" appears in no paper. *Marked overstated and I agree:* CLAUDE.md is a forward-looking agent-instruction file added in August, and measuring a pre-existing corpus against it is repo hygiene, not something a visitor sees. The reader-visible half of it is already covered above.

### 3.2 Design and UX

**High**
- **Two contradictory taxonomies over one corpus.** `papers.ts` and `wiki.ts` reference the identical 46 files, but the badges cross-cut: TRACK spans WG-04/05/07/08; ACTUARIAL spans MP-MATH/WG-01/02/03. `TRACK 04` on a WG-07 document. No TRACK 01, no TRACK 03. *Correction to the original finding:* the slugs are the same 46 strings, `/tracks` **is** a working index linked from the navbar with a "Return to Research Tracks" button on every paper, and `/papers/[slug]` is the better-indexed surface, not the worse one. What survives is real: two incompatible numbering vocabularies, and a self-deprecating "standalone mode" banner on the canonical URL. Derive the badge from `workingGroupId`.
- **`/wiki` is a dead end** — no SSR content, no home link, no CTA, no contact. See §2.3. Its share button copies a `/wiki?…` URL that unfurls as a generic site card with no document identity.
- **Paper pages lead with "100% Complete & Untruncated / 9,146 Characters / 147 Lines / 1,329 Words"** and no author, no date. A self-issued assurance about file transfer, sitting where a byline belongs, on a 1,329-word document the banner calls a "treatise". *Caveat:* only 5 of 47 documents have a `publicationDate`, so this fix costs real content work, not a template edit.
- **Long-form reading is poor.** Measure is 864 px (~108 chars) on `/papers` and 960 px (~120 chars) on `/wiki`, roughly double the readable band. `grep -c 'id=' MarkdownViewer.tsx` → 0: no heading emits an id, so there are no anchors, no deep links, no possible in-document TOC. A reader cannot send a colleague §4. The `prose dark:prose-invert` class it relies on is inert — `@tailwindcss/typography` is not installed and `node_modules/@tailwindcss` does not exist. Body copy is `font-light text-secondary` at 16 px (legible at 7.29:1, so this part is taste). Fix: `max-w-[68ch]`, slugified heading ids with hover anchors, a sticky h2/h3 rail.

**Medium**
- **Impressum and Cookie Settings are dead buttons on 55 of ~63 routes.** `/papers/[slug]` and `/theory/[slug]` import `Navbar` and `EuComplianceFooter` directly instead of `SiteChrome`, so `onOpenImpressum`/`onOpenCookies` are `undefined` and the buttons render with no handler. Verified live: `<button type="button" class="hover:text-dutchOrange…">Legal Impressum (Art. 5 DSA)</button>`. Those routes also never mount the cookie banner at all. One-line fix: wrap both in `SiteChrome`.
- **`/unified-standard` fetches ~3.4 MB of hero media** (2.88 MB webm + 708 kB PNG poster) for a layer rendered at `opacity-35` under an opaque canvas. No `preload`, no media query, no reduced-motion guard, while the sibling canvas has one. The page arguing for an efficient open standard is the heaviest on the site.
- **"3 Core Research Tracks" on the homepage** (`translations.ts:41`) one click from `/tracks` deriving "9 working groups / 46 treatises". Last hardcoded count from this session's derive pass. Also: "Track" carries three meanings (homepage portal cards, working groups, paper badges), and the WG numbering runs 01-05, 07, 08 with no WG-06. *Correction:* the navbar dropdown does **not** claim four groups — its first item reads "All 46 Treatises across 9 Working Groups". That third of the original finding does not hold.
- **`?doc=`-only wiki links land on the wrong sidebar section.** `wiki/page.tsx:36` defaults `activeWgId` to `"WG-01-UI"` and the effect only syncs when `?wg=` is present. Wrong category highlighted for 34 of 46 documents; document hidden from the TOC for 22 of 46 (the seed set pre-expands WG-01-UI, WG-02-DT and MP-MATH). *"All 46" overstates it by ~2×.* Two-line fix: derive `activeWgId` from the resolved document.

**Low**
- CTA and accent contrast — see accessibility below; same defect counted twice across dimensions.
- First-visit splash: 3.4 s, 1.26 MB raw PNG for a 45%-opacity wash, skip hint at 1.84:1 appearing at t=1.8 s. *Overstated as blocking:* the overlay is an opaque div that paints instantly, the image is not in the SSR HTML, and click/Esc/Space dismiss from t=0. Convert the PNG to WebP and show the hint from frame one.
- `/theory` is an unlinked, un-sitemapped duplicate index of `/physics`. Delete it or redirect. Its `bg-charcoal` wrapper is invisible because `TheoryCatalogue` paints over it.
- Type scale skews small (410 utilities ≤12 px vs 189 ≥16 px, incl. 9 `text-[9px]`). *Overstated:* the reading surface is `text-base`; the ≤12 px utilities are chrome. Drop the nine 9 px instances, two of which carry wayfinding.

### 3.3 Accessibility

Not close to WCAG 2.2 AA, clustered on the conversion path.

**High**
- **All four `/collaborate` inputs have no programmatic label.** `for=` count on the live page: 0. No `id`, no `aria-label`, no `aria-labelledby`. Fails 1.3.1, 3.3.2, 4.1.2 (all Level A). *Correction:* placeholders do supply a fallback accessible name per HTML-AAM, so a screen reader announces "Dr. Alexander Vance, edit text", not silence — but the placeholders are sample values, not labels. Also `mailto:jim@eigenia.nl` exists at `collaborate/page.tsx:302-310`, so this is not the only inbound channel. Still the top a11y issue and a one-line fix per control.

**Medium**
- **Primary CTA fails AA.** White on `#E05A10` = 3.72:1 at 12 px bold, on every route (`Navbar.tsx:321`), plus the form submit, the pathway pills, and both cookie buttons. Hover makes it worse (3.30:1 over light). `dutchOrange-600 #C64405` is already in the palette and gives ~5.0:1.
- **Accent as small text on light backgrounds:** `#E05A10` on `#FAF8F5` = 3.51:1, on `#F3F0EC` = 3.28:1, inside its own 10% tint = 3.11:1. ~125 instances at ≤12 px. Passes in dark (5.25:1), which is why it was never caught — but `layout.tsx:113-122` applies light when the OS prefers light. Add a `--color-accent-text` token (`#9C3204` light, `#E05A10` dark).
- **Navbar research dropdowns are hover-only.** No `onFocus`/`onBlur`/`onKeyDown`/`aria-expanded`/`aria-haspopup` anywhere in 449 lines. *Overstated as a corpus blackout:* the parent `/tracks` and `/physics` links are focusable and carry the same content. Real 2.1.1/4.1.2 defect on the control, not a lockout.
- **Mobile menu button has no accessible name.** 8 of 9 buttons on the homepage have one; this one is empty. Also no `aria-expanded`. Mitigated by footer links to all four top routes.
- **`<html lang="en">` never changes when a visitor picks NL.** `setLang` writes localStorage and nothing else. 3.1.1 Level A. Add `useEffect(() => { document.documentElement.lang = lang }, [lang])`.
- **No skip link, and the ARIA11 landmark fallback is defeated** — every page nests `<nav>` and `<footer>` **inside** `<main>` (verified: `<main>` at byte 4984, `<nav>` at 5130 on `/collaborate`), so jumping to `main` lands at the top of the masthead. Fix the nesting as well as adding the skip link. 9 tab stops before content.
- **Impressum and cookie dialogs have no dialog semantics** — zero `role` attributes are emitted on any rendered page. No `aria-modal`, no focus move or trap, no Escape handler, icon-only close buttons with no name, and the two GDPR consent checkboxes have no `id`, `label` or `aria-label` and no placeholder to fall back on, so they compute an empty accessible name. A consent UI whose toggles are unnamed is a compliance point, not only an a11y one.

**Low**
- Focus ring removed on all form inputs (`focus:outline-none`), replaced by a 1 px 3.28:1 border, with no global `:focus-visible` rule anywhere.
- The `/unified-standard` quote rail duplicates all five quotes for the loop with no `aria-hidden`, so screen readers read them twice. Its 42 s `repeat: Infinity` ignores `prefers-reduced-motion` (the only guard on the site is in `HeroCanvasBackground.tsx:36`). The rail's pause control is genuinely good and satisfies 2.2.2.
- Splash overlay has `role="dialog"` with no `aria-modal` or focus management. *Overstated:* Escape and Space do dismiss it, it is one route, once per session.
- Two `<h1>` and an h2→h4 skip on `/papers/calculus-of-the-subject` (the file opens `## Executive Abstract` before its `#` title, so `suppressLeadingTitle` misses it); `/tracks` jumps h1→h3. *Overstated as a WCAG failure:* HTML5 permits multiple h1 and there is no failure technique for level skips. Outline quality, not conformance.
- Wiki accordion buttons lack `aria-expanded`.

**Keep as-is:** `HeroCanvasBackground` reduced-motion handling, and the quote rail's pause button. Both correct.

### 3.4 SEO and discoverability

**High**
- **All 46 paper pages are orphans** — see §2.3. They are indexed (SSR, sitemapped, self-canonical), so this costs ranking and crawl priority rather than indexing outright.
- **`/wiki` returns 142 characters of spinner, identical for every query string** — see §2.3.
- **All 8 marketing routes are client components** — `"use client"` on line 1 of `page`, `mission`, `tracks`, `physics`, `collaborate`, `unified-standard`, `wiki`; `theory` exports nothing. Next forbids metadata exports from client components, so all eight serve the byte-identical root title and 232-char description, with no canonical on any of them. `/collaborate`, your only conversion page, cannot rank for "contact" or "research partnership". Fix: thin server `page.tsx` exporting `metadata`, existing body moved to a client child. Mechanical, no UI change.
- **No `og:image` or `twitter:image` anywhere**, while `twitter:card` is declared `summary_large_image`. Every LinkedIn post, email and Slack paste renders as a text stub. The assets already exist unwired in `public/assets` (`eigenia_linkedin_banner_*.png`, `eigenia_twitter_header_*.png`). Add `opengraph-image.tsx` at root and per-paper via next/og. Also `locale: "en_EU"` is not a valid OG locale and the paper pages use `en_US`.
- **Paper titles run 114-161 chars with the brand suffix twice.** `generateMetadata` appends "| Eigenia Research & Actuarial Treatises" and the root template appends "| Eigenia B.V." — 59 chars of constant overhead before any distinguishing text, on all 54 content pages, against Google's ~60-char cut. Drop the per-route suffix.

**Medium**
- Meta descriptions are a blind 160-char prefix cut of body prose: mid-word truncation, 18 of 45 opening with "Abstract"/"Executive Abstract", one leaking a heading number ("1. DEXPI 2.0 P&ID Topology Ingestion Pipeline"), one shipping a typo ("Predcitive"). Add a `description` per registry entry.
- JSON-LD omits `datePublished`, `dateModified` and `image`; the only date signal is a hardcoded `2026-05-01` on all 46 papers. The credibility cost outweighs the rich-result cost.
- `wordCount` counts raw markdown tokens: `MP_Mathematical_Models.md` reports 4,456 against ~1,600 prose words, published as schema.org data directly under "Exact Verification Audit". Prose-heavy papers are accurate; the error is concentrated in the math papers.
- `sameAs` 404s — see §2.2.
- EN/NL is localStorage-only: no `/nl` URLs, no hreflang, no `lang` mutation. 491 lines of Dutch translation with no URL Google can index. For a Dutch B.V. that forfeits the home market.

**Low**
- `/theory` is missing from the sitemap. *Overstated as cannibalisation:* it is also linked from nowhere, so it is a dead route to delete, not a competing one.
- `sitemap.ts` uses `lastModified: new Date()` for all URLs, so every deploy stamps all 46 treatises as freshly modified. Derive from file mtime or git commit date.

### 3.5 Code and security

- **Critical (perf/architecture):** the Navbar corpus import — see §2.3.
- **The build gate is a tautology.** `audit-publications.js` compares word counts against a value it just computed, which is why 833 corrupted expressions and 76 rewritten headings shipped undetected.
- **No `.dockerignore`**, so `web/.env.local` (SMTP credentials) is copied into the Railway build context. Fix today: add `.dockerignore` with `.env*`, `node_modules`, `.next`.
- **Contact endpoint has no validation, rate limiting or bot protection.** Nodemailer does strip CRLF from headers, no secrets are committed, and KaTeX is fed trusted content, so the exposure is spam and abuse rather than compromise. Add a length cap, an email-format check and a simple rate limit.
- **No security response headers.** `curl -I https://eigenia.nl/` returns no CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` or `Permissions-Policy`, plus `x-powered-by: Next.js`. Low real risk (static content, no cookies). It matters because a firm selling IEC 62443 assessments will have its own headers scanned by the prospects it is courting, and a default scan flags all six. Ship the five easy ones now, defer CSP (KaTeX and Framer Motion inject styles).

### 3.6 Performance

- **Critical:** Navbar corpus import, ~5× on every route, not yet deployed. See §2.3.
- **High:** `/tracks` pays 921 kB gzip / 3.4 MB parsed today to render document titles. Same root cause. (`/wiki` shipping the corpus is a design choice, not a defect, but it should fetch one document rather than all 46.)
- **Medium:** KaTeX is 264 kB raw / 77 kB gzip on the homepage — 26% of homepage JS — to render **one** static formula (`SCurveSection.tsx:56`). Pre-render it with `katex.renderToString` at build time and move the CSS import out of `globals.css`.
- **Medium:** paper pages ship the treatise twice. `/papers/cascading-failure-hypothesis` is 744,682 bytes of HTML, of which 266,396 (35.8%) is the raw markdown re-serialised into the RSC flight payload because `MarkdownViewer` is a client component. The hand-written 526-line parser plus 315 `katex.renderToString` calls then re-run during hydration. Make `MarkdownViewer` a server component.
- **Medium:** `images: { unoptimized: true }` ships every PNG raw — 1.29 MB splash backdrop, 1.09 MB of lazy homepage PNGs, 708 kB poster. Your hand-made WebP heroes are 88-95 kB, which proves the format works here.
- **Medium:** the hero canvas runs its full loop on mobile where it is `display:none` — the IntersectionObserver watches the wrapper div, which is not hidden. I measured the isolines inner loop (499,200 marching-squares cell tests/frame) at 6.84 ms/frame on an M-series Mac with warm JIT: 41% of a 16.7 ms budget for something nobody can see. Gate the effect on `matchMedia("(min-width: 1024px)")`.
- **Medium:** `/unified-standard` 2.88 MB video at ~4% visible on desktop. *Correction:* the canvas is `hidden lg:block`, so on mobile the video is roughly 17% visible — it is not invisible on exactly the devices where the bytes hurt.
- **Low:** `/public` assets served `cache-control: public, max-age=0` (304s work, but a round trip per asset). Brotli would take the corpus chunk 921 kB → 319 kB, but that is a workaround for a bug you should fix instead, and it needs a proxy or precompressed assets, not a config flag.

### 3.7 Positioning and conversion

- **High:** unverifiable entity + dead identities — see §2.2.
- **High:** "peer-reviewable," "open-source," "published openly for global academic peer review," "provided under open scientific licenses" — against 2 of 46 papers with a bibliography heading, 8 containing any URL, and no LICENSE file anywhere in the repo. GOV-01 "Research Governance & Sourcing Methodology" is published on `/tracks` promising that claims are "cross-referenced and catalogued via valyu searches into references/external-research"; that directory holds one 20-line naming-convention README and zero sources. Publishing an empty method page is worse than having none.
- **Medium:** the hero never names the buyer. Zero occurrences of insur/underwrit/reinsur/hyperscale above the fold; "datacenter" appears once in the whole UI. *Correction:* "Catastrophe Actuarial Engine" and "Clayton copula" do appear one section down, so the reader is not left with nothing — but self-recognition belongs in the H1.
- **Medium:** "sovereign" ×32 as a mood word (Sovereign Research Wiki, Sovereign Knowledge Transfer Pipeline, Protection Constitution), plus a live `/tracks` description promising "we forecast attack campaigns before initial payload delivery" from a "psychohistory engine". That is an unfalsifiable prediction claim on the same site whose flagship Taleb treatise argues confident forecasting of rare events is self-deception. Cut "sovereign" to where it means air-gapped or EU-resident. Rename to "Research Library" and "Research Charter". Describe what WG-03 outputs (a scored adversary prior into the Monte Carlo engine).
- **Medium:** homepage says "5-BOM Suite" in one band and "CycloneDX 4-BOM attestations" in another, while `/unified-standard` enumerates five in prose and `DexpiCycloneSection` enumerates four. Your own metadata keywords say 4-BOM. Pick one. Same section asserts, present tense, "Running 1,000+ automated Monte Carlo simulations per day" with no artefact anywhere.
- **Medium:** `WG-01-UI-1-Competitive_Analysis` is the most persuasive document you have for an underwriter, and it also publicly states "Eigenia actually lacks native external IT scanning capabilities", "lacks a native portfolio aggregation module", and names prospects: "feed into platforms like CyberCube… or directly to carriers like Zurich and Beazley to underwrite industrial giants like Heineken." *Correction:* it is not unreachable — `Navbar.tsx:105` links to `/wiki?wg=WG-01-UI`, two clicks from the top nav. That makes it worse, not better. Move a sanitised version of the OT-blind-spot argument onto the marketing surface; keep the gaps and the target list internal.
- **Low:** "Support the Lab" solicits gifts to a for-profit B.V. with no IBAN, payment link, budget or use-of-funds. *Two reviewer claims did not survive:* the sponsor path is 3 required fields, not 4, and the ANBI-legal-form argument is asserted, not established. Residual point stands: the ask terminates in a free-text essay.
- **Low:** the "Request Board Briefing" CTA. *The scent-trail claim was refuted* — `translations.ts:103` is "Request Validation Briefing" on the third pathway card, aimed at exactly this reader. What is real: it links to bare `/collaborate` with no anchor, and the only route through is a required proposal textarea. A calendar link would cost nothing.
- **Low:** 3.4 s homepage splash, once per session, dismissible by click/Esc/Space, not shown to search arrivals on papers.

---

## 4. What to do, in order

### Before you show this to anyone important

| # | Action | Effort |
|---|---|---|
| 1 | Delete the three fabricated journal entries + placeholder DOIs + ACME lines (`Cascading Failure Hypothesis.md:3931-3935`). Delete the Seldon entry and the two non-existent McKenney self-citations. Add a pre-publish grep gate for `10.xxxx`, `xxxxx`, `ACME`. | 45 min |
| 2 | Fix the 17 corrupted-LaTeX files at source: raw strings in all `compile_*.py`, re-run, add a build check for `0x09`/`0x0C` before `ext{`/`rac`. Verify by curling three rendered pages. | half day |
| 3 | Fix `splitRunInHeading()` (76 headings across 26 papers). | 1-2 h |
| 4 | Add KvK number, BTW ID and registered address to the footer and Impressum; link the KvK to the openbaar handelsregister. | 1 h + KvK lookup |
| 5 | Remove the dead `sameAs` entries and `twitter:creator`; redirect or drop the `eigenia.com` claim. | 15 min |
| 6 | Fix ATT&CK 27→14 and CISA 17/15→16; pick one TACAM and one ATQ expansion. | 30 min |
| 7 | Add `.dockerignore` (`.env*`, `node_modules`, `.next`). | 5 min |
| 8 | **Do not push the current branch as-is.** Split the wiki registry from the content JSON so Navbar stops shipping 3.4 MB. Confirm `/` is back to ~256 kB in `npm run build`. | 1 day |
| 9 | Replace the four count badges on paper pages with Author / Published / Working group. Delete "100% Complete & Untruncated" and the "standalone mode" banner. | 2 h |
| 10 | Label the four `/collaborate` inputs (`id` + `htmlFor`) and the two consent checkboxes; add `aria-label` to the mobile menu button. | 30 min |
| 11 | Swap CTA fills to `dutchOrange-600 #C64405`. | 15 min |
| 12 | Wrap `/papers/[slug]` and `/theory/[slug]` in `SiteChrome` so Impressum and cookie controls work on 55 routes. | 15 min |
| 13 | Add a bibliography to `WG-02-DT-1.md` (nine sources, mostly Taleb). | 1 h |
| 14 | Fix "3 Core Research Tracks" → derived; fix 5-BOM vs 4-BOM to one number. | 15 min |

### Next month

- Invert the corpus IA: make `/papers/<slug>` canonical, point `/tracks` at it, build a `/papers` index grouped by working group, demote `/wiki` to a reading shell that deep-links. Derive badges from `workingGroupId` and retire the TRACK/ACTUARIAL vocabulary. (2 days)
- Server-render `/wiki` document content, and give it a navbar, a footer and a CTA. (1 day)
- Split the 8 marketing routes into server metadata shells: unique title, description, canonical. Start with `/collaborate` and `/unified-standard`. Drop the double brand suffix on paper and theory titles. (half day)
- Add `opengraph-image.tsx` at root and per-paper; the banner assets are already in `public/assets`. (half day)
- Source Y5381 properly (one file in `references/external-research/`), then correct the characterisation in all 25 files and delete the fabricated LMA5381/2019 entry. (half day)
- Slugify heading ids, add hover anchors and a sticky TOC, constrain the measure to `max-w-[68ch]`. This is the biggest reading improvement available and it makes "send me §4" possible. (1 day)
- Add an `/about` page: name, photo, career history, standards-body work, LinkedIn. Normalise the four author identities to one string; add real `publicationDate` per document (git commit date at build time is acceptable). (1 day)
- Global "verified ROSI" → "illustrative ROSI" + a one-line disclaimer per appendix; fix the ALE-ROSI abstract's 842/859 and 49%/24.99% inconsistencies. (2 h)
- Publish one dated "Eigenia data assets" fact sheet and derive the 77,279 / 80,000 / 3.2M / 45-second numbers from it. Define or drop the Curated Incident Corpus. (half day)
- Make `MarkdownViewer` a server component; pre-render the homepage formula; move the KaTeX CSS out of `globals.css`. (1 day)
- Add the five easy security headers. Add validation and a rate limit to the contact endpoint. (2 h)
- Skip link, `document.documentElement.lang`, dialog semantics + Escape + focus trap on both modals, a global `:focus-visible` rule, `aria-expanded` on the accordion, `aria-hidden` on the duplicated quote set. Fix the nav/footer-inside-main nesting. (1 day)

### Nice to have

- Rewrite the hero to name the buyer; move the actuarial proposition above the fold. Cut "sovereign" to where it means something, rename the wiki and the "Constitution", delete "psychohistory" and the pre-payload forecasting claim from WG-03. (half day)
- Move a sanitised OT-blind-spot argument onto the marketing surface; strip the self-assessed gaps and named-carrier targeting from the public copy. (half day)
- Convert the large PNGs to WebP or drop `unoptimized: true`; drop the `/unified-standard` video or gate it behind desktop + reduced-motion. (half day)
- Gate the hero canvas effect on the `lg` breakpoint; add `useReducedMotion()` to the quote rail. (1 h)
- Cut the splash to under 800 ms with a visible skip control, or delete it. (30 min)
- Add a LICENSE (CC BY 4.0 for treatises), a calendar link on `/collaborate`, hand-written meta descriptions per paper, per-file `lastModified` in the sitemap, long cache headers on `/assets`, and delete `app/theory/page.tsx`. (1 day total)
- Populate `references/external-research/` for the ~20 highest-stakes named methods, or label each explicitly as Eigenia Labs synthesis. Either populate GOV-01's directory or unpublish GOV-01.

---

**One closing note on method.** Every finding above was checked against production HTML or a file:line at HEAD, and a second pass challenged each one. Roughly a third came back overstated, and I have flagged those inline rather than smoothing them over. The dev server at :4500 returned 500 throughout (a half-finished `web/.next` missing `prerender-manifest.json`), so the rendered-HTML evidence is from `https://eigenia.nl`, which is running a pre-fix build. Where a finding depends on unpushed code, that is stated.