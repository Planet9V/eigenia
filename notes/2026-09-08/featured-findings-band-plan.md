# Featured Findings Band Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put five featured research findings and the nine working groups on the Eigenia homepage, where today no paper is named at all.

**Architecture:** Two client components read metadata from `wikiRegistry.ts` and nothing else. Featured papers are marked by a `featured` flag on their existing registry entry rather than by a separate list. Motion is CSS scroll-driven, so it follows the reader's scrolling and stops when they stop.

**Tech Stack:** React 19, Next.js 15 App Router, Tailwind CSS 3.4, plain CSS scroll-driven animations. No new dependencies.

**Design spec:** `notes/2026-09-08/featured-findings-band-design.md`

---

## Read this before Task 1

**There is no test framework in this repo.** No vitest, no jest, no playwright, no
testing-library. Do not install one; that is not what this work is for.

What this repo uses instead is executable audit scripts under `web/scripts/`, run by
`npm run prebuild`, that exit non-zero on failure. `audit-publications.js`,
`audit-terminology.mjs` and `audit-citations.mjs` all follow that shape. Task 1 adds
one more in the same idiom, and it is a real test: it fails before the data exists and
passes after.

**Two traps that have already cost time in this repo:**

1. **Never run `npm run build` while `npm run dev` is running.** The production build
   overwrites the dev server's chunks and every page then returns 500 with
   `Cannot find module './vendor-chunks/framer-motion.js'`. Stop the dev server first.
2. **Never import `@/lib/wiki` from a homepage component.** It pulls a 3.3 MB content
   bundle. `/wiki` already ships about 1.65 MB of First Load JS because of this. Import
   `@/lib/wikiRegistry` only.

---

## File structure

| File | Responsibility |
|:---|:---|
| `web/scripts/audit-featured.mjs` | create. Asserts the featured set is well formed. The test for Tasks 1 to 3. |
| `web/src/lib/wikiRegistry.ts` | modify. Add `featured?` and `hook?` to `WikiDocumentMeta`; set them on five entries; add `getFeaturedDocuments()`. |
| `web/src/app/globals.css` | modify. Two keyframe blocks plus the support and reduced-motion guards. |
| `web/src/components/home/FeaturedFindingsBand.tsx` | create. Renders the five cards. Holds no state. |
| `web/src/components/home/WorkingGroupsStrip.tsx` | create. Renders nine groups with derived counts. Holds no state. |
| `web/src/app/page.tsx` | modify. Renders both, after the `research-portals` section. |

---

### Task 1: Write the failing audit

**Files:**
- Create: `web/scripts/audit-featured.mjs`

- [ ] **Step 1: Write the audit script**

This is the test. It reads the registry as text and asserts four things: exactly five
documents are featured, every featured document has a non-empty hook, no hook contains
an em dash or a banned filler word, and every hook is at most 140 characters so it fits
a card.

```js
// web/scripts/audit-featured.mjs
// Asserts the homepage featured set is well formed. Run by prebuild.
import { readFileSync } from "node:fs";

const SRC = "src/lib/wikiRegistry.ts";
const EXPECTED_FEATURED = 5;
const MAX_HOOK_CHARS = 140;
const BANNED = [
  "leverage", "utilize", "pivotal", "testament to", "foster", "streamline",
  "at its core", "landscape", "beacon", "game-changing", "harness",
  "furthermore", "robust",
];

const src = readFileSync(SRC, "utf8");

// Each document object is a brace-delimited block containing a slug.
const blocks = src.split(/\n\s{6}\{\n/).slice(1);
const featured = [];
for (const b of blocks) {
  if (!/featured:\s*true/.test(b)) continue;
  const slug = (b.match(/slug:\s*"([^"]+)"/) || [])[1] ?? "(unknown)";
  const hook = (b.match(/hook:\s*"((?:[^"\\]|\\.)*)"/) || [])[1] ?? null;
  featured.push({ slug, hook });
}

const errors = [];

if (featured.length !== EXPECTED_FEATURED) {
  errors.push(
    `expected ${EXPECTED_FEATURED} featured documents, found ${featured.length}`
  );
}

for (const { slug, hook } of featured) {
  if (!hook || hook.trim() === "") {
    errors.push(`${slug}: featured but has no hook`);
    continue;
  }
  if (hook.length > MAX_HOOK_CHARS) {
    errors.push(`${slug}: hook is ${hook.length} chars, max ${MAX_HOOK_CHARS}`);
  }
  if (hook.includes("—") || hook.includes("–")) {
    errors.push(`${slug}: hook contains an em or en dash`);
  }
  const lower = hook.toLowerCase();
  for (const w of BANNED) {
    if (lower.includes(w)) errors.push(`${slug}: hook contains banned word "${w}"`);
  }
}

console.log("=".repeat(64));
if (errors.length) {
  console.log("FEATURED AUDIT FAILED");
  for (const e of errors) console.log(`  ${e}`);
  console.log("=".repeat(64));
  process.exit(1);
}
console.log(`FEATURED AUDIT PASSED: ${featured.length} featured, all hooks valid.`);
for (const f of featured) console.log(`  ${f.slug}`);
console.log("=".repeat(64));
```

- [ ] **Step 2: Run it and confirm it FAILS**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web && node scripts/audit-featured.mjs; echo "exit=$?"
```

Expected: `FEATURED AUDIT FAILED`, the line
`expected 5 featured documents, found 0`, and `exit=1`.

If it exits 0 here, the audit is not testing anything. Stop and fix it before going on.

- [ ] **Step 3: Commit**

```bash
cd /Users/jimmcknney/jim_private/eigenia
git add web/scripts/audit-featured.mjs
git commit -m "test: audit for the homepage featured set, currently failing"
```

---

### Task 2: Extend the registry interface and add the selector

**Files:**
- Modify: `web/src/lib/wikiRegistry.ts`

- [ ] **Step 1: Add the two fields to the interface**

Find `export interface WikiDocumentMeta {` and add two lines before its closing brace,
after `badgeNl?: string;`:

```ts
  featured?: boolean;
  hook?: string;
```

- [ ] **Step 2: Add the selector at the end of the file**

Append:

```ts
/**
 * Documents marked for the homepage Featured Findings band.
 *
 * Reads metadata only. Never import ./wiki from a homepage component: it pulls
 * generatedReferencesContent.json, about 3.3 MB, into the client bundle.
 */
export function getFeaturedDocuments(limit = 5): WikiDocumentMeta[] {
  return getAllWikiDocuments()
    .filter((d) => d.featured === true)
    .slice(0, limit);
}
```

- [ ] **Step 3: Verify it compiles**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web && npx tsc --noEmit; echo "exit=$?"
```

Expected: `exit=0`, no output.

If `getAllWikiDocuments` is reported as undefined, it is defined later in the file than
your insertion point. Function declarations hoist, so this compiles regardless; a real
error here means you inserted inside another function's body.

- [ ] **Step 4: Commit**

```bash
cd /Users/jimmcknney/jim_private/eigenia
git add web/src/lib/wikiRegistry.ts
git commit -m "feat: featured and hook fields on WikiDocumentMeta, plus a selector"
```

---

### Task 3: Mark the five featured documents and make the audit pass

**Files:**
- Modify: `web/src/lib/wikiRegistry.ts`

- [ ] **Step 1: Add featured and hook to five entries**

For each slug below, find its document object in `wikiRegistry.ts` and add the two
properties immediately after its `badgeNl` line. Keep the eight-space indentation the
surrounding document properties use.

`rail-refdepot-emu-12`:

```ts
        featured: true,
        hook: "The most dangerous item in the set had the lowest service impact. Availability triage ranks it last.",
```

`manufacturing-refpharma-api-1`:

```ts
        featured: true,
        hook: "Fifty-eight candidates. True, conformant, operationally worthless.",
```

`blast-radius-three-ontologies`:

```ts
        featured: true,
        hook: "A blast radius can contain equipment whose loss removes the hazard. Its size is not a measure of harm.",
```

`cim-profile-cyber-physical`:

```ts
        featured: true,
        hook: "A model that says nothing about a relay is not a model that says there is no relay.",
```

`refbess-250mw-specification`:

```ts
        featured: true,
        hook: "Fifteen parameters sourced, thirty-five modelled, and every row says which.",
```

- [ ] **Step 2: Run the audit and confirm it now PASSES**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web && node scripts/audit-featured.mjs; echo "exit=$?"
```

Expected: `FEATURED AUDIT PASSED: 5 featured, all hooks valid.`, the five slugs listed,
and `exit=0`.

This is the red-to-green transition. The same script failed in Task 1 Step 2 and passes
now because the data exists, which is what makes it a test rather than a formality.

- [ ] **Step 3: Wire the audit into prebuild**

In `web/package.json`, change the `prebuild` script from:

```json
"prebuild": "node scripts/sync-publications.js && node scripts/audit-publications.js",
```

to:

```json
"prebuild": "node scripts/sync-publications.js && node scripts/audit-publications.js && node scripts/audit-featured.mjs",
```

- [ ] **Step 4: Verify types still pass**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web && npx tsc --noEmit; echo "exit=$?"
```

Expected: `exit=0`.

- [ ] **Step 5: Commit**

```bash
cd /Users/jimmcknney/jim_private/eigenia
git add web/src/lib/wikiRegistry.ts web/package.json
git commit -m "feat: mark five featured papers with their finding hooks"
```

---

### Task 4: Add the scroll-driven motion CSS

**Files:**
- Modify: `web/src/app/globals.css`

- [ ] **Step 1: Append the motion block**

Add to the end of `web/src/app/globals.css`:

```css
/* Featured Findings band.
   Motion is tied to a view progress timeline, so it advances only while the
   reader scrolls and stops when they stop. WCAG 2.2.2 Pause Stop Hide does not
   apply to user-driven motion, which is why this band needs no pause control.
   transform is compositor-only; animating top or left instead costs roughly
   fifty percent of frames. */
.findings-track {
  animation: findings-drift linear both;
  animation-timeline: view();
  animation-range: entry 20% exit 80%;
}

@keyframes findings-drift {
  from {
    transform: translateX(2%);
  }
  to {
    transform: translateX(-6%);
  }
}

/* Firefox does not support animation-timeline without a flag. The unanimated
   state is a normal horizontal scroll-snap strip, which is fully usable, so
   this fallback loses nothing. */
@supports not (animation-timeline: view()) {
  .findings-track {
    animation: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .findings-track {
    animation: none;
  }
}
```

- [ ] **Step 2: Confirm the rule landed**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web && npx tsc --noEmit && echo "types ok" && grep -c 'findings-drift' src/app/globals.css
```

Expected: `types ok` then `2` (the animation reference and the keyframes name).

- [ ] **Step 3: Commit**

```bash
cd /Users/jimmcknney/jim_private/eigenia
git add web/src/app/globals.css
git commit -m "feat: scroll-driven drift for the featured findings band"
```

---

### Task 5: Build FeaturedFindingsBand

**Files:**
- Create: `web/src/components/home/FeaturedFindingsBand.tsx`

- [ ] **Step 1: Write the component**

```tsx
"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedDocuments, getAllWikiDocuments } from "@/lib/wikiRegistry";

export const FeaturedFindingsBand: React.FC = () => {
  const featured = getFeaturedDocuments(5);
  const total = getAllWikiDocuments().length;

  if (featured.length === 0) return null;

  return (
    <section
      aria-label="Featured research findings"
      className="py-20 bg-canvas text-primary border-b border-hairline transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-semibold block">
              Featured Findings
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
              What the research actually found
            </h2>
          </div>
          <Link
            href="/wiki"
            className="text-dutchOrange font-mono text-[11px] font-semibold hover:underline flex items-center gap-1 shrink-0"
          >
            all {total} treatises
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="findings-track flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {featured.map((doc) => (
            <Link
              key={doc.id}
              href={`/papers/${doc.slug}`}
              className="snap-start shrink-0 w-[19rem] sm:w-[22rem] p-8 rounded-2xl bg-surface border border-hairline shadow-xl flex flex-col justify-between gap-6 hover:border-dutchOrange transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-dutchOrange font-semibold">
                    {doc.workingGroupId}
                  </span>
                  {doc.badge ? (
                    <span className="text-muted uppercase tracking-wider">
                      {doc.badge}
                    </span>
                  ) : null}
                </div>
                <p className="font-sans text-lg font-semibold text-primary leading-snug">
                  {doc.hook}
                </p>
              </div>
              <div className="pt-4 border-t border-hairline space-y-2">
                <p className="text-xs text-secondary font-light leading-relaxed">
                  {doc.title}
                </p>
                <span className="text-dutchOrange font-mono text-[11px] font-semibold flex items-center gap-1">
                  Read paper
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
```

Three details that matter. The hook renders at `text-lg` and the title at `text-xs`,
which is the whole point of the design: the finding leads and the title is the small
print. Each card is one `<Link>`, so there is one tab stop per paper and the entire card
is a target. The `findings-track` class carries the motion, and the same element carries
`overflow-x-auto snap-x snap-mandatory`, so with the animation absent the strip is still
a working scroll-snap list.

- [ ] **Step 2: Verify it compiles**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web && npx tsc --noEmit; echo "exit=$?"
```

Expected: `exit=0`.

- [ ] **Step 3: Commit**

```bash
cd /Users/jimmcknney/jim_private/eigenia
git add web/src/components/home/FeaturedFindingsBand.tsx
git commit -m "feat: FeaturedFindingsBand, findings lead and titles follow"
```

---

### Task 6: Build WorkingGroupsStrip

**Files:**
- Create: `web/src/components/home/WorkingGroupsStrip.tsx`

- [ ] **Step 1: Confirm the exact export name for working groups**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web && grep -n "getAllWorkingGroups" src/app/tracks/page.tsx src/lib/wikiRegistry.ts
```

Expected: an import in `tracks/page.tsx` and an `export function getAllWorkingGroups`
in `wikiRegistry.ts`. Use whatever identifier this prints; the component below assumes
`getAllWorkingGroups`.

- [ ] **Step 2: Write the component**

```tsx
"use client";

import React from "react";
import Link from "next/link";
import { getAllWorkingGroups, getAllWikiDocuments } from "@/lib/wikiRegistry";

export const WorkingGroupsStrip: React.FC = () => {
  const groups = getAllWorkingGroups();
  const total = getAllWikiDocuments().length;

  return (
    <section
      aria-label="Research working groups"
      className="py-16 bg-subtle text-primary border-b border-hairline transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-semibold">
            Working Groups
          </span>
          <span className="font-mono text-[11px] text-muted">
            {total} treatises across {groups.length} groups
          </span>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {groups.map((g) => (
            <li key={g.id}>
              <Link
                href={`/wiki?wg=${g.id}`}
                className="flex items-center justify-between gap-4 px-5 py-4 rounded-2xl bg-surface border border-hairline hover:border-dutchOrange transition-colors"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] text-dutchOrange font-semibold tracking-wider">
                    {g.id}
                  </span>
                  <span className="block text-sm text-primary font-medium truncate">
                    {g.title}
                  </span>
                </span>
                <span className="font-mono text-sm text-muted shrink-0">
                  {g.documents.length}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
```

Every number here is derived. Nothing is typed by hand, which is the point: the site
advertised "25 Treatises" for months while the real figure climbed to 59.

- [ ] **Step 3: Verify it compiles**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web && npx tsc --noEmit; echo "exit=$?"
```

Expected: `exit=0`.

- [ ] **Step 4: Commit**

```bash
cd /Users/jimmcknney/jim_private/eigenia
git add web/src/components/home/WorkingGroupsStrip.tsx
git commit -m "feat: WorkingGroupsStrip with counts derived from the registry"
```

---

### Task 7: Render both on the homepage

**Files:**
- Modify: `web/src/app/page.tsx`

- [ ] **Step 1: Add the imports**

Next to the existing
`import { UnifiedStandardBand } from "@/components/UnifiedStandardBand";` line, add:

```tsx
import { FeaturedFindingsBand } from "@/components/home/FeaturedFindingsBand";
import { WorkingGroupsStrip } from "@/components/home/WorkingGroupsStrip";
```

- [ ] **Step 2: Render them after the research-portals section**

Find this exact block:

```tsx
      {/* The Unified Standard: Topological BIM & Hierarchical BOM Band */}
      <UnifiedStandardBand />
```

Replace it with:

```tsx
      {/* Featured Findings: five papers, led by what they found */}
      <FeaturedFindingsBand />

      {/* Working Groups: nine groups, counts derived from the registry */}
      <WorkingGroupsStrip />

      {/* The Unified Standard: Topological BIM & Hierarchical BOM Band */}
      <UnifiedStandardBand />
```

This places both after the `research-portals` section closes. Directly under the Hero
was rejected during design: it competes with the site's opening statement and pushes the
portal cards below the fold.

- [ ] **Step 3: Capture the current homepage bundle size, before building**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web
pkill -f "next dev" 2>/dev/null; sleep 2
git stash push -- src/app/page.tsx
npm run build 2>&1 | grep -E "First Load|^\S*[┌├└].*/ " | head -6
git stash pop
```

Write down the `/` row. You are about to compare against it.

- [ ] **Step 4: Verify types and build**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web
npx tsc --noEmit && echo "types ok"
npm run build 2>&1 | grep -iE "FEATURED AUDIT|AUDIT PASSED|Compiled|Failed"
```

Expected: `types ok`, `FEATURED AUDIT PASSED: 5 featured, all hooks valid.`,
`AUDIT PASSED: All 65 reference documents are present with 100% content fidelity.`,
and `✓ Compiled successfully`.

- [ ] **Step 5: Check the homepage bundle did not blow up**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web
npm run build 2>&1 | grep -E "First Load|^\S*[┌├└].*/ " | head -6
```

Compare the `/` row against Step 3. An increase of a few kB is expected.

**An increase of hundreds of kB means a component imported `@/lib/wiki` instead of
`@/lib/wikiRegistry` and dragged the 3.3 MB content bundle onto the homepage.** If that
happens, fix the import; do not ship it.

- [ ] **Step 6: Commit**

```bash
cd /Users/jimmcknney/jim_private/eigenia
git add web/src/app/page.tsx
git commit -m "feat: render the findings band and working groups strip on the homepage"
```

---

### Task 8: Verify in a browser, both themes

**Files:** none modified.

- [ ] **Step 1: Start the dev server**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web
pkill -f "next start" 2>/dev/null; sleep 1
npm run dev
```

Wait for `Local: http://localhost:4500`.

- [ ] **Step 2: Check the rendered numbers**

In a second shell:

```bash
curl -s http://localhost:4500/ | sed 's/<!-- -->//g' | grep -oE '[0-9]+ treatises across [0-9]+ groups|all [0-9]+ treatises'
```

Expected: `59 treatises across 9 groups` and `all 59 treatises`.

React splits interpolated text with HTML comments, which is why the `sed` is there. A
raw grep without it returns nothing and looks like a failure when the page is fine.

- [ ] **Step 3: Confirm the five hooks and links render**

```bash
curl -s http://localhost:4500/ | grep -c "Fifty-eight candidates"
curl -s http://localhost:4500/ | grep -oE 'href="/papers/[a-z0-9-]+"' | sort -u
```

Expected: `1`, and exactly five `/papers/...` hrefs matching the five featured slugs.

- [ ] **Step 4: Look at it**

Open `http://localhost:4500/` in a browser and confirm, in **both light and dark mode**
using the theme toggle in the header:

- five cards, hook in large type above the title in small type
- the strip scrolls horizontally and snaps
- scrolling the page past the band produces a small horizontal drift in Chrome; in
  Firefox there is no drift and the strip still works
- keyboard `Tab` reaches exactly five links inside the band, each with a visible focus
  ring, and each scrolls its card into view
- the console shows no hydration warnings

- [ ] **Step 5: Confirm reduced motion**

On macOS set System Settings, Accessibility, Display, Reduce motion. Reload. The drift
must stop and **all five cards must still be reachable by scrolling the strip.** If any
card became unreachable, the fallback is wrong and must be fixed; that is the failure
mode this design exists to avoid.

- [ ] **Step 6: Stop the dev server**

```bash
pkill -f "next dev"
```

There is nothing to commit in this task. If you found a defect, fix it, and commit that
fix with a message naming what the browser showed that the build did not.

---

## Self-review

**Spec coverage.** Both components, the placement, the data model, the five hooks, the
motion, the reduced-motion fallback, the accessibility properties, the
never-import-`wiki.ts` constraint, and the styling rule each have a task. The eight
non-featured hooks are recorded in the spec and deliberately not implemented; they are
stock, not scope.

**Placeholders.** None. Every step carries the code or the command it needs.

**Type consistency.** `featured?: boolean` and `hook?: string` are declared in Task 2
and used in Tasks 3 and 5. `getFeaturedDocuments(limit = 5)` is defined in Task 2 and
called in Task 5. `getAllWikiDocuments` and `getAllWorkingGroups` are existing exports,
and Task 6 Step 1 confirms the second one's exact name rather than assuming it.

**Known gap, stated rather than hidden.** Task 1's audit parses TypeScript with a regex
over brace-delimited blocks. That is fragile against reformatting. It is the right trade
here because the repo has no test runner and the alternative is no check at all, but if
the registry is ever reformatted, expect this script to need adjusting rather than
believing it found a real fault.
