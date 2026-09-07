# Three-Schema Cyber Digital Twin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish seven papers establishing a mapping between DEXPI 2.0, CycloneDX and IEC 61970 CIM identity systems, submittable upstream to three standards bodies, with energy, manufacturing and rail reference architectures.

**Architecture:** Two gates are built BEFORE any paper, and each is verified to FAIL against the current corpus before anything is fixed. The gates are the tests. Papers are then written in dependency order: the join specification, then its conformance suite, then the CIM profile, then three applied reference architectures, then the payoff paper that extends an existing Eigenia result from two ontologies to three.

**Tech Stack:** Markdown under `references/`, Python compilers under `scripts/`, Node audit gates under `web/scripts/`, Next.js registries at `web/src/lib/papers.ts` and `web/src/lib/wikiRegistry.ts`.

**Spec:** `notes/2026-09-07/three-schema-cyber-digital-twin-design.md`

---

## Why the gates come first

This corpus has repaired the same defect classes by hand across four sessions. The em-dash artifact was fixed manually for weeks until the substitution itself was guarded in nineteen compilers. 19 of 55 findings in one audit scope were proved by putting two passages side by side, and every one is mechanically detectable.

Building a terminology gate after writing seven papers means seven papers of drift to reconcile. Building it first means the drift cannot happen.

Each gate task follows red-green: write the gate, run it, watch it fail on the real corpus with a real count, fix the corpus, watch it pass. A gate that has never failed proves nothing.

## File structure

| File | Responsibility |
|:---|:---|
| `web/scripts/terminology-registry.json` | The single definition of each term, acronym and standard number |
| `web/scripts/audit-terminology.mjs` | Fails if a document uses a variant of a registry term, or a forbidden bare form |
| `web/scripts/audit-citations.mjs` | Fails on an `[n]` with no matching bibliography entry |
| `references/WG-05-CAD-DEXPI-2/WG-05-CAD-Three-Identity-Join.md` | P1, the normative join |
| `references/WG-05-CAD-DEXPI-2/WG-05-CAD-Conformance-Reference-Implementation.md` | P3, conformance suite |
| `references/WG-05-CAD-DEXPI-2/WG-05-CAD-CIM-Profile-Cyber-Physical.md` | P2, the CIM profile |
| `references/WG-05-CAD-DEXPI-2/WG-05-CAD-RefBESS-250MW-Specification.md` | Reference architecture used by P4 |
| `references/WG-05-CAD-DEXPI-2/WG-05-CAD-Energy-RefBESS-250MW.md` | P4 |
| `references/WG-05-CAD-DEXPI-2/WG-05-CAD-Manufacturing-RefPharma-API-1.md` | P5 |
| `references/WG-05-CAD-DEXPI-2/WG-05-CAD-Rail-RefDepot-EMU-12.md` | P6 |
| `references/WG-05-CAD-DEXPI-2/WG-05-CAD-Blast-Radius-Three-Ontologies.md` | P7 |

Registry slots `TRACK 02` through `TRACK 02-F` are taken. New papers take **`TRACK 02-G` through `TRACK 02-N`**.

---

### Task 1: Confirm W0 landed before building on it

W0 is a separate corrective pass that may still be running. Every later task assumes its corrections.

**Files:** none modified.

- [ ] **Step 1: Run the W0 gate**

```bash
cd /Users/jimmcknney/jim_private/eigenia
echo "CBOM as Component (expect 0): $(grep -rl 'Component BOM' references/ --include='*.md' | wc -l)"
echo "ISO/IEC 5962 on CycloneDX (expect 0): $(grep -rn 'CycloneDX[^)]*ISO/IEC 5962' references/ --include='*.md' | wc -l)"
echo "ECMA-424 present (expect 1 or more): $(grep -rl 'ECMA-424' references/ --include='*.md' | wc -l)"
echo "BOM variants (expect one value): $(grep -rhoE '[456]-BOM' references/ --include='*.md' | sort -u | tr '\n' ' ')"
```

Expected: `0`, `0`, `1` or more, and a single BOM variant.

- [ ] **Step 2: If any check fails, STOP**

Do not proceed. W0 has not completed. Report which check failed and wait. Building seven papers on an uncorrected foundation is the failure this plan exists to prevent.

---

### Task 2: Build the terminology registry and gate, and watch it fail

**Files:**
- Create: `web/scripts/terminology-registry.json`
- Create: `web/scripts/audit-terminology.mjs`

- [ ] **Step 1: Write the registry**

```json
{
  "_comment": "One definition per term. The gate fails if a document uses a listed variant. Add a term here before using it in a paper.",
  "terms": [
    {
      "canonical": "Cryptography Bill of Materials",
      "abbreviation": "CBOM",
      "variants": ["Component BOM", "Component Bill of Materials", "Component Bill of Material"],
      "note": "Ruled 2026-09-07. Matches CycloneDX cryptographic-asset."
    },
    {
      "canonical": "ECMA-424",
      "abbreviation": null,
      "variants": ["CycloneDX (ISO/IEC 5962)", "CycloneDX 1.6+ (ISO/IEC 5962)"],
      "note": "CycloneDX standardisation. ISO/IEC 5962 is SPDX and must never be attached to CycloneDX."
    },
    {
      "canonical": "ISO 15926-1",
      "abbreviation": null,
      "variants": [],
      "note": "Overview and fundamental principles. Part number is mandatory at every use."
    },
    {
      "canonical": "ISO 15926-2",
      "abbreviation": null,
      "variants": [],
      "note": "Data model."
    },
    {
      "canonical": "ISO 15926-4",
      "abbreviation": null,
      "variants": [],
      "note": "Reference data library."
    }
  ],
  "bare_forms_forbidden": [
    {
      "pattern": "ISO 15926(?![-0-9])",
      "message": "ISO 15926 must carry a part number. Parts differ: 1 overview, 2 data model, 4 reference data library."
    }
  ]
}
```

- [ ] **Step 2: Write the gate**

```javascript
#!/usr/bin/env node
/**
 * TERMINOLOGY AUDIT
 *
 * Fails if a published document uses a variant of a term the registry defines
 * once, or a bare form the registry forbids.
 *
 * Why this exists: 19 of the 55 findings in the WG-05-CAD and WG-07-TM audit
 * were proved by putting two passages side by side. CBOM meant two different
 * things across seven papers. The BOM layer count was 4, 5 and 6. Four
 * incompatible IEC 62443 zone schemes all claimed the same standard. Every one
 * of those is mechanically detectable and none of them was detected, because
 * nothing checked.
 *
 * Usage: node scripts/audit-terminology.mjs
 * Exit:  0 clean, 1 violations found, 2 could not run.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, relative } from "node:path";

const ROOT = resolve(import.meta.dirname, "../..");
const REGISTRY = join(import.meta.dirname, "terminology-registry.json");

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e.endsWith(".md")) out.push(p);
  }
  return out;
}

let registry;
try {
  registry = JSON.parse(readFileSync(REGISTRY, "utf-8"));
} catch (e) {
  console.error("TERMINOLOGY AUDIT COULD NOT RUN:", e.message);
  process.exit(2);
}

// Prove the gate can fail before trusting a pass.
const canary = "This text uses Component BOM which is a forbidden variant.";
const canaryHit = registry.terms.some((t) =>
  (t.variants || []).some((v) => canary.includes(v))
);
if (!canaryHit) {
  console.error("TERMINOLOGY AUDIT ABORTED: the gate did not flag a known-bad string,");
  console.error("so a green result here would prove nothing.");
  process.exit(2);
}

console.log("\n" + "=".repeat(72));
console.log("TERMINOLOGY AUDIT");
console.log("=".repeat(72) + "\n");

let violations = 0;
for (const file of walk(join(ROOT, "references"))) {
  const rel = relative(ROOT, file);
  const lines = readFileSync(file, "utf-8").split("\n");
  let inFence = false;
  lines.forEach((line, i) => {
    if (line.trim().startsWith("```")) { inFence = !inFence; return; }
    if (inFence) return;
    for (const t of registry.terms) {
      for (const v of t.variants || []) {
        if (line.includes(v)) {
          violations++;
          console.log(`FAIL  ${rel}:${i + 1}`);
          console.log(`        uses "${v}", canonical is "${t.canonical}"`);
          if (t.note) console.log(`        ${t.note}`);
        }
      }
    }
    for (const b of registry.bare_forms_forbidden || []) {
      if (new RegExp(b.pattern).test(line)) {
        violations++;
        console.log(`FAIL  ${rel}:${i + 1}`);
        console.log(`        ${b.message}`);
      }
    }
  });
}

console.log("\n" + "=".repeat(72));
if (violations) {
  console.error(`TERMINOLOGY AUDIT FAILED: ${violations} violation(s).`);
  console.log("=".repeat(72) + "\n");
  process.exit(1);
}
console.log("TERMINOLOGY AUDIT PASSED: no variant or bare form found.");
console.log("=".repeat(72) + "\n");
```

- [ ] **Step 3: Run it and confirm it FAILS**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web
node scripts/audit-terminology.mjs; echo "EXIT=$?"
```

Expected: `EXIT=1`, with roughly 34 bare `ISO 15926` violations reported by file and line. A gate that passes on its first run against an uncorrected corpus is broken; verify the count is non-zero before continuing.

- [ ] **Step 4: Commit the gate, red**

```bash
cd /Users/jimmcknney/jim_private/eigenia
git add web/scripts/terminology-registry.json web/scripts/audit-terminology.mjs
git commit -m "test(content): add a terminology gate, currently failing on ISO 15926 bare forms"
```

---

### Task 3: Make the terminology gate pass

**Files:**
- Modify: every `.md` under `references/` the gate reports, plus the `scripts/compile_*.py` that owns each

- [ ] **Step 1: List what the gate reports, grouped by file**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web
node scripts/audit-terminology.mjs 2>&1 | grep '^FAIL' | sed 's/:[0-9]*$//' | sort | uniq -c | sort -rn
```

- [ ] **Step 2: For each reported file, check compiler ownership BEFORE editing**

```bash
cd /Users/jimmcknney/jim_private/eigenia
grep -rln "WG-05-CAD-Unified-DEXPI-CycloneDX.md" scripts/
```

Repeat for each reported filename, substituting it into the grep. If a compiler owns the file, edit the `.py` and run it. A markdown-only edit is silently reverted; that has already happened twice in this project.

Compiler string literals are a mix of raw (`r"""`) and non-raw. In a raw literal write a single backslash before a LaTeX command; in a non-raw literal write two. Getting this backwards previously broke 408 expressions here and the build did not catch it.

- [ ] **Step 3: Assign each ISO 15926 use its part**

Read the sentence. Part 1 is overview and fundamental principles, part 2 is the data model, part 4 is the reference data library. A sentence invoking reference data classes means part 4; one invoking the data model means part 2.

**Where the sentence does not determine the part, do not guess.** Add the file and line to a list in your report and leave it. An incorrectly specific citation is worse than a vague one, because a reader can check it and find it wrong.

- [ ] **Step 4: Run the gate to green**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web
node scripts/audit-terminology.mjs; echo "EXIT=$?"
```

Expected: `EXIT=0`.

If any use could not be assigned a part, the gate will still fail. In that case add that specific sentence to `bare_forms_forbidden` as a documented exception carrying a `reason` field, so the exception is visible rather than silent.

- [ ] **Step 5: Verify nothing else broke, then commit**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web
npx tsc --noEmit
npm run build 2>&1 | grep -iE "AUDIT PASSED|error"
cd .. && git add references/ scripts/ web/scripts/terminology-registry.json
git commit -m "fix(content): state the ISO 15926 part at every use, terminology gate green"
```

---

### Task 4: Build the citation gate and watch it fail

**Files:**
- Create: `web/scripts/audit-citations.mjs`

- [ ] **Step 1: Write the gate**

```javascript
#!/usr/bin/env node
/**
 * CITATION AUDIT
 *
 * Fails when an [n] marker has no entry n in the same document.
 *
 * Why this exists: 148 of 494 citation markers corpus-wide sit in documents
 * with no bibliography at all. WG-02-DT carries 69 markers and not one
 * bibliography anywhere in the folder. A citation that resolves to nothing is
 * worse than no citation, because it looks like evidence.
 *
 * A document with zero markers and zero entries is clean; not every document
 * must cite. A document with markers and no bibliography is not.
 *
 * Usage: node scripts/audit-citations.mjs [--warn-orphan-entries]
 * Exit:  0 clean, 1 unresolved markers found, 2 could not run.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, relative } from "node:path";

const ROOT = resolve(import.meta.dirname, "../..");
const WARN_ORPHANS = process.argv.includes("--warn-orphan-entries");

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e.endsWith(".md")) out.push(p);
  }
  return out;
}

/** Bibliography entries look like "12. Author..." or "[12] Author..." after a References heading. */
function bibliographyIndices(text) {
  const idx = new Set();
  const parts = text.split(/^#{1,4} *(?:\d+\.? *)?(?:References|Bibliography|Works Cited)\b/im);
  if (parts.length < 2) return idx;
  const tail = parts.slice(1).join("\n");
  for (const mm of tail.matchAll(/^\s*(?:\[(\d{1,3})\]|(\d{1,3})\.)\s+\S/gm)) {
    idx.add(Number(mm[1] ?? mm[2]));
  }
  return idx;
}

// Prove the gate can fail.
if (bibliographyIndices("## References\n1. Something\n").size !== 1) {
  console.error("CITATION AUDIT ABORTED: entry parser did not find a known entry,");
  console.error("so a green result here would prove nothing.");
  process.exit(2);
}

console.log("\n" + "=".repeat(72));
console.log("CITATION AUDIT");
console.log("=".repeat(72) + "\n");

let unresolved = 0, orphans = 0, clean = 0;
for (const file of walk(join(ROOT, "references"))) {
  const rel = relative(ROOT, file);
  const text = readFileSync(file, "utf-8");
  const body = text.replace(/```[\s\S]*?```/g, " ");
  const entries = bibliographyIndices(text);
  const cited = new Set();
  for (const m of body.matchAll(/\[(\d{1,3})\]/g)) cited.add(Number(m[1]));

  if (cited.size === 0 && entries.size === 0) { clean++; continue; }

  const missing = [...cited].filter((n) => !entries.has(n)).sort((a, b) => a - b);
  const unused = [...entries].filter((n) => !cited.has(n)).sort((a, b) => a - b);

  if (missing.length) {
    unresolved += missing.length;
    console.log(`FAIL  ${rel}`);
    console.log(`        ${missing.length} marker(s) resolve to nothing: ${missing.slice(0, 12).join(", ")}`);
    console.log(`        bibliography has ${entries.size} entries`);
  }
  if (unused.length && WARN_ORPHANS) {
    orphans += unused.length;
    console.log(`warn  ${rel}  ${unused.length} entries cited by nothing: ${unused.slice(0, 12).join(", ")}`);
  }
}

console.log("\n" + "=".repeat(72));
console.log(`${clean} document(s) carry neither markers nor a bibliography, which is allowed.`);
if (WARN_ORPHANS) console.log(`${orphans} bibliography entries cited by nothing.`);
if (unresolved) {
  console.error(`CITATION AUDIT FAILED: ${unresolved} marker(s) resolve to nothing.`);
  console.log("=".repeat(72) + "\n");
  process.exit(1);
}
console.log("CITATION AUDIT PASSED: every marker resolves.");
console.log("=".repeat(72) + "\n");
```

- [ ] **Step 2: Run it and confirm it FAILS**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web
node scripts/audit-citations.mjs --warn-orphan-entries; echo "EXIT=$?"
```

Expected: `EXIT=1`. WG-02-DT documents should dominate the failures, with 69 markers against zero bibliographies.

- [ ] **Step 3: Commit the gate, red**

```bash
cd /Users/jimmcknney/jim_private/eigenia
git add web/scripts/audit-citations.mjs
git commit -m "test(content): add a citation resolution gate, currently failing"
```

- [ ] **Step 4: Record the baseline, do NOT fix the whole corpus here**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web
node scripts/audit-citations.mjs 2>&1 | grep -c '^FAIL'
```

Write that number into this plan under `## Citation baseline`, with today's date.

Fixing WG-02-DT's 69 markers is a separate programme, recorded in `notes/2026-09-06/publication-roadmap.md`. This plan requires only that **the seven new papers pass the gate**, which Task 14 enforces by scope.

---

### Task 5: Write P1, the three-identity join

**Files:**
- Create: `references/WG-05-CAD-DEXPI-2/WG-05-CAD-Three-Identity-Join.md`

- [ ] **Step 1: Read the sources**

```bash
cd /Users/jimmcknney/jim_private/eigenia
cat "papers-pre-publish/DEXPI and CycloneDX/DEXPI2_Overview.md"
cat "papers-pre-publish/DEXPI and CycloneDX/DEXPI2_Study_guide.md"
sed -n '1,120p' references/WG-05-CAD-DEXPI-2/WG-05-CAD-Unified-DEXPI-CycloneDX.md
```

`DEXPI2_SPECS.md` is byte-identical to `DEXPI2_Overview.md` apart from a trailing slash; read only one.

- [ ] **Step 2: Write the paper against this outline**

1. Scope, and what this specification does not do
2. The three identity systems, reproducing the table below exactly
3. Why extension rather than fork
4. The join, normatively
5. The DEXPI Standard Library extension
6. The CycloneDX property taxonomy
7. The CIM profile reference, deferring detail to P2
8. Conformance requirements, deferring the suite to P3
9. Limitations
10. References

The identity table, which every later paper cites:

| Standard | Describes | Identity | Assigned by | Nature |
|:---|:---|:---|:---|:---|
| DEXPI 2.0 | process topology, P&ID and BFD/PFD | `TagName` plus ISO 15926-4 class | plant engineer | human, stable, semantic |
| CycloneDX | component supply chain | `bom-ref` plus `purl` or `cpe` | build system | machine, versioned, ephemeral |
| IEC 61970 CIM | electrical network topology | `mRID`, a UUID | network model tool | machine, stable, opaque |

Section 3 rests on a fact from Jim's own source document: DEXPI e.V. is developing the Standard Library as "a curated set of templates intended to extend or restrict the DEXPI Specification to meet specific engineering requirements." That is a sanctioned extension point, so no leg needs forking and every file stays conformant to its own specification.

- [ ] **Step 3: Use RFC 2119 keywords, because this is an upstream submission**

Jim approved upstream submission on 2026-09-07. Normative statements use MUST, SHOULD and MAY, capitalised, with a sentence early in section 1 stating that the key words are to be interpreted as described in RFC 2119. A body cannot adopt a proposal that does not say what an implementer is required to do.

- [ ] **Step 4: State the licence**

DEXPI 2.0 is published on GitLab under CC BY 4.0. Section 1 MUST state the licence this extension is offered under and that it is compatible. An extension whose licence is unstated cannot be merged.

- [ ] **Step 5: Keep Eigenia-proprietary terms out of the normative text**

`RefBESS-250MW`, `RefDNSP-1.2M` and `RefPharma-API-1` belong in the applied papers. P1's normative sections MUST NOT depend on them. A worked example may reference one, clearly marked non-normative.

- [ ] **Step 6: Run the gates**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web
node scripts/audit-terminology.mjs
node scripts/audit-citations.mjs
cd .. && F="references/WG-05-CAD-DEXPI-2/WG-05-CAD-Three-Identity-Join.md"
echo "words: $(wc -w < "$F")"
echo "em: $(grep -c '—' "$F")  en: $(grep -c '–' "$F")  spaced-semicolon: $(grep -c ' ; ' "$F")"
echo "title-dup heading (expect 0): $(head -3 "$F" | grep -cE '^# |^## [^0-9|]')"
echo "RFC 2119 declared: $(grep -c 'RFC 2119' "$F")"
echo "licence stated: $(grep -ci 'CC BY 4.0' "$F")"
```

All three style counts MUST be 0. RFC 2119 and the licence MUST each be 1 or more.

- [ ] **Step 7: Commit**

```bash
git add references/WG-05-CAD-DEXPI-2/WG-05-CAD-Three-Identity-Join.md
git commit -m "feat(content): P1, the three-identity join specification"
```

---

### Task 6: Write P3, conformance and reference implementation

P3 precedes P2 because upstream submission makes conformance mandatory, and because P2's profile is easier to bound once the conformance criteria exist.

**Files:**
- Create: `references/WG-05-CAD-DEXPI-2/WG-05-CAD-Conformance-Reference-Implementation.md`

- [ ] **Step 1: Write the paper against this outline**

1. Scope
2. What a conformant unified file is
3. Validation rules, each traceable to a MUST in P1
4. Test vectors: one minimal conformant example, one for each way a file can fail
5. The three round-trips: DEXPI XML to unified graph and back, CycloneDX JSON likewise, CIM likewise
6. What conformance does NOT establish
7. Limitations
8. References

- [ ] **Step 2: Every validation rule cites the P1 requirement it enforces**

A rule with no corresponding MUST in P1 is either a missing requirement in P1 or an invented rule here. Either way it is a defect. State the mapping as a table with two columns: rule, and the P1 section and requirement it enforces.

- [ ] **Step 3: Section 6 is not optional**

Conformance to a schema establishes that a file is well formed. It does not establish that the file describes the plant accurately. That distinction MUST be stated plainly, because an assessor will otherwise read conformance as assurance.

- [ ] **Step 4: Run the gates and commit**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web
node scripts/audit-terminology.mjs
node scripts/audit-citations.mjs
cd .. && git add references/WG-05-CAD-DEXPI-2/WG-05-CAD-Conformance-Reference-Implementation.md
git commit -m "feat(content): P3, conformance and reference implementation"
```

---

### Task 7: Write P2, the CIM profile

**Files:**
- Create: `references/WG-05-CAD-DEXPI-2/WG-05-CAD-CIM-Profile-Cyber-Physical.md`

- [ ] **Step 1: Establish the corpus has no prior CIM work**

```bash
cd /Users/jimmcknney/jim_private/eigenia
grep -rc 'IEC 61970' references/ --include='*.md' | grep -v ':0$'
grep -rc 'IEC 61850' references/ --include='*.md' | grep -v ':0$' | wc -l
```

Expected before this task: the first command returns nothing, the second returns a non-zero count. The corpus is silent on CIM and this paper is net-new territory. It uses IEC 61850 twenty times, which is substation communications and a different thing. Say so explicitly in section 1 so no reader conflates them.

- [ ] **Step 2: Write the paper against this outline**

1. Scope, and the IEC 61850 versus IEC 61970 distinction
2. Why a profile is necessary: CIM is large, and an unprofiled dependency is unbounded
3. CGMES as precedent for profiling a large model down to a purpose
4. The profile: which classes, which associations, and why each is in or out
5. The `mRID` as join key, and its properties
6. What the profile deliberately excludes
7. Limitations
8. References

- [ ] **Step 3: Justify every inclusion and exclusion**

A profile that lists classes without saying why each is needed is not a profile, it is a subset. Each entry carries one sentence naming the question it lets the twin answer.

- [ ] **Step 4: Run the gates and commit**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web
node scripts/audit-terminology.mjs
node scripts/audit-citations.mjs
cd .. && git add references/WG-05-CAD-DEXPI-2/WG-05-CAD-CIM-Profile-Cyber-Physical.md
git commit -m "feat(content): P2, a CIM profile for cyber-physical assets"
```

---

### Task 8: Specify RefBESS-250MW

A reference architecture is specified once and cited by the paper that uses it, following the pattern the corpus already uses for `RefDNSP-1.2M` and `RefFac-100MW-AI`.

**Files:**
- Create: `references/WG-05-CAD-DEXPI-2/WG-05-CAD-RefBESS-250MW-Specification.md`

- [ ] **Step 1: Read the existing reference architecture pattern**

```bash
cd /Users/jimmcknney/jim_private/eigenia
grep -A22 'Reference Network Specification' "references/WG-04-CF-Cascading-Failures/WG-04-CF-Cascading Failure Hypothesis.md" | head -30
```

Match that table's shape: Parameter, Value, Basis. Every row's Basis says whether the value is sourced or modelled.

- [ ] **Step 2: Specify a site that exercises all three schemas**

This is why RefBESS is new rather than a reuse of RefDNSP-1.2M, which sits at network scale where the process leg is thin. RefBESS-250MW MUST have, at minimum:

- **A process leg for DEXPI:** coolant loop, pumps, plate heat exchangers, valves, instrumentation. These are P&ID objects.
- **A component leg for CycloneDX:** BMS firmware, PCS controller software, EMS platform, each with a `purl`.
- **An electrical leg for CIM:** transformer, switchgear, the point of common coupling, each with an `mRID`.

If any leg is thin, the paper cannot demonstrate a three-way join and the reference architecture has failed its purpose.

- [ ] **Step 3: Mark every parameter sourced or modelled**

No third category. A parameter with no public source is modelled and says so inline.

- [ ] **Step 4: Run the gates and commit**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web
node scripts/audit-terminology.mjs
node scripts/audit-citations.mjs
cd .. && git add references/WG-05-CAD-DEXPI-2/WG-05-CAD-RefBESS-250MW-Specification.md
git commit -m "feat(content): specify the RefBESS-250MW reference architecture"
```

---

### Task 9: Write P4, energy

**Files:**
- Create: `references/WG-05-CAD-DEXPI-2/WG-05-CAD-Energy-RefBESS-250MW.md`

- [ ] **Step 1: Write the paper against this outline**

1. Scope, citing the RefBESS-250MW specification rather than restating it
2. The DEXPI model of the coolant loop
3. The CycloneDX BOMs for the control stack
4. The CIM profile instance for the electrical connection
5. The join applied: one physical object carrying all three identities
6. One worked query neither standard answers alone
7. Limitations
8. References

- [ ] **Step 2: Section 6 must be a query, not an assertion**

State the question, show the traversal, show the answer, and state what the answer depends on.

"The unified model enables blast radius analysis" is an assertion. "A CVE in the BMS firmware reaches these three physical nodes and one electrical node, by this path, under this coupling assumption" is a result.

- [ ] **Step 3: Run the gates and commit**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web
node scripts/audit-terminology.mjs
node scripts/audit-citations.mjs
cd .. && git add references/WG-05-CAD-DEXPI-2/WG-05-CAD-Energy-RefBESS-250MW.md
git commit -m "feat(content): P4, energy reference case on RefBESS-250MW"
```

---

### Task 10: Write P5, manufacturing

P5 is deliberately the weak CIM case. A join that only works when every leg is rich is not a general mechanism, and publishing it without testing that would be a claim the corpus cannot support.

**Files:**
- Create: `references/WG-05-CAD-DEXPI-2/WG-05-CAD-Manufacturing-RefPharma-API-1.md`

- [ ] **Step 1: Specify RefPharma-API-1 inline**

Unlike RefBESS-250MW this asset does not need its own specification document, because one paper uses it. Specify it in section 2 using the same Parameter, Value, Basis table shape.

- [ ] **Step 2: Write the paper against this outline**

1. Scope, and why this case is deliberately CIM-thin
2. RefPharma-API-1 specification
3. The DEXPI model, rich here because this is DEXPI's home ground
4. The CycloneDX BOMs
5. The CIM leg, and what it does and does not contain
6. Graceful degradation: what the join still answers with a thin electrical leg, and what it cannot
7. Limitations
8. References

- [ ] **Step 3: Section 6 is the point of this paper**

Report honestly what degrades. If a query answerable at RefBESS is unanswerable here, name it. That negative result is the contribution.

- [ ] **Step 4: Run the gates and commit**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web
node scripts/audit-terminology.mjs
node scripts/audit-citations.mjs
cd .. && git add references/WG-05-CAD-DEXPI-2/WG-05-CAD-Manufacturing-RefPharma-API-1.md
git commit -m "feat(content): P5, manufacturing reference case, the CIM-thin test"
```

---

### Task 11: Write P6, rail

**Files:**
- Create: `references/WG-05-CAD-DEXPI-2/WG-05-CAD-Rail-RefDepot-EMU-12.md`

- [ ] **Step 1: Write the paper against this outline**

1. Scope, and why rail forced the third schema
2. RefDepot-EMU-12 specification
3. Depot process systems in DEXPI: fuelling, washing, HVAC, compressed air
4. Traction power in CIM, which DEXPI cannot represent
5. The control stack in CycloneDX
6. The join across a genuinely split domain
7. Relationship to CLC/TS 50701 and EN 50126, which the corpus already cites
8. Limitations
9. References

- [ ] **Step 2: Section 1 states the finding that reshaped the programme**

DEXPI is a process-industry standard. Traction power distribution is an electrical single-line diagram and DEXPI does not cover it. That boundary is why the programme carries three schemas rather than two, and stating it plainly is a contribution rather than an admission.

- [ ] **Step 3: Run the gates and commit**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web
node scripts/audit-terminology.mjs
node scripts/audit-citations.mjs
cd .. && git add references/WG-05-CAD-DEXPI-2/WG-05-CAD-Rail-RefDepot-EMU-12.md
git commit -m "feat(content): P6, rail reference case on RefDepot-EMU-12"
```

---

### Task 12: Write P7, blast radius across three ontologies

P7 REUSES the existing chain rather than building one. Jim ruled this on 2026-09-07.

**Files:**
- Create: `references/WG-05-CAD-DEXPI-2/WG-05-CAD-Blast-Radius-Three-Ontologies.md`

- [ ] **Step 1: Read the formulation being extended**

```bash
cd /Users/jimmcknney/jim_private/eigenia
sed -n '308,320p' references/WG-05-CAD-DEXPI-2/WG-05-CAD-Unified-DEXPI-CycloneDX.md
sed -n '69p' references/WG-05-CAD-DEXPI-2/WG-05-CAD-DEXPI-Open-Standard-Position-Paper.md
```

Section 4.4 already defines the two-schema blast radius over a directed multigraph: the vertex set partitioned into plant nodes and cyber nodes, a shortest-path distance term bounded by a depth k, a path product of coupling weights, and an impact threshold. Reproduce that formulation exactly before extending it.

- [ ] **Step 2: Extend it, do not replace it**

The three-schema version adds an electrical partition to the vertex set, with its own edge semantics. State explicitly that this generalises section 4.4 rather than superseding it, and cite that section.

A parallel formulation would make P7 a second opinion competing with an existing Eigenia result. Extension makes it the paper that generalises one.

- [ ] **Step 3: Reuse the exploit-likelihood signals**

EPSS appears in 8 documents and KEV in 2, in TACAM and ATQ. Cite those for the signal rather than restating them. P7 supplies the traversal, not the threat scoring.

- [ ] **Step 4: Work one full example end to end**

A CVE, a `purl`, the component it identifies, the DEXPI equipment that component controls, the physical nodes downstream, and the CIM electrical nodes beyond. State every coupling weight and where it came from.

- [ ] **Step 5: Run the gates and commit**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web
node scripts/audit-terminology.mjs
node scripts/audit-citations.mjs
cd .. && git add references/WG-05-CAD-DEXPI-2/WG-05-CAD-Blast-Radius-Three-Ontologies.md
git commit -m "feat(content): P7, blast radius generalised to three ontologies"
```

---

### Task 13: Register all eight documents in both registries

An unregistered file is invisible while the build stays green. That is how the DEXPI position paper sat unpublished in this repo.

**Files:**
- Modify: `web/src/lib/papers.ts`
- Modify: `web/src/lib/wikiRegistry.ts`

- [ ] **Step 1: Add the eight entries to `papers.ts`**

Slots `TRACK 02` through `TRACK 02-F` are taken. Use `TRACK 02-G` through `TRACK 02-N`, in the Cyber-Physical Standards block, following the existing entry shape:

```typescript
  "three-identity-join": {
    title: "The Three-Identity Join: DEXPI 2.0, CycloneDX and IEC 61970 CIM",
    category: "Cyber-Physical Standards",
    number: "TRACK 02-G",
    relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-Three-Identity-Join.md",
  },
```

Slugs, in order: `three-identity-join`, `conformance-reference-implementation`, `cim-profile-cyber-physical`, `refbess-250mw-specification`, `energy-refbess-250mw`, `manufacturing-refpharma-api-1`, `rail-refdepot-emu-12`, `blast-radius-three-ontologies`.

- [ ] **Step 2: Add matching entries to `wikiRegistry.ts`**

Add to the `WG-05-CAD` `documents` array. Each entry needs all fourteen fields, matching the shape already present: `id`, `slug`, `title`, `titleNl`, `subtitle`, `subtitleNl`, `workingGroupId`, `workingGroupName`, `workingGroupNameNl`, `relativePath`, `author` set to `"J. McKenney"`, `publicationDate`, `badge`, `badgeNl`.

Update the working group `badge` and `badgeNl` counts to include the eight new documents.

- [ ] **Step 3: Verify both registries agree**

```bash
cd /Users/jimmcknney/jim_private/eigenia
node -e "
const fs=require('fs');
const p=fs.readFileSync('web/src/lib/papers.ts','utf8');
const w=fs.readFileSync('web/src/lib/wikiRegistry.ts','utf8');
const slugs=['three-identity-join','conformance-reference-implementation','cim-profile-cyber-physical','refbess-250mw-specification','energy-refbess-250mw','manufacturing-refpharma-api-1','rail-refdepot-emu-12','blast-radius-three-ontologies'];
for (const s of slugs) console.log(s.padEnd(38), 'papers:', (p.match(new RegExp('\"'+s+'\"','g'))||[]).length, ' wiki:', (w.match(new RegExp('\"'+s+'\"','g'))||[]).length);
"
```

Every row MUST read `papers: 1  wiki: 1`.

- [ ] **Step 4: Commit**

```bash
git add web/src/lib/papers.ts web/src/lib/wikiRegistry.ts
git commit -m "feat(site): register the eight three-schema documents in both registries"
```

---

### Task 14: Full verification, then push

**Files:** none modified; this task only verifies.

- [ ] **Step 1: Run every gate**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web
npx tsc --noEmit
node scripts/audit-terminology.mjs
node scripts/audit-citations.mjs
node scripts/audit-mermaid.mjs | tail -2
npm run build 2>&1 | grep -iE "AUDIT PASSED|Total Source|error"
```

Expected: tsc clean, both new audits PASSED, all diagrams parse, and `AUDIT PASSED: All 64 reference documents`, being 56 today plus eight new.

- [ ] **Step 2: Gate 0, which outranks the rest**

```bash
cd /Users/jimmcknney/jim_private/eigenia/web
npm run dev > /tmp/dev-p.log 2>&1 &
sleep 27
node scripts/audit-rendered-completeness.js 2>&1 | tail -4
```

`AUDIT PASSED` required. Exit 2, meaning inconclusive, blocks exactly as hard as exit 1.

- [ ] **Step 3: Every new slug returns 200**

```bash
for s in three-identity-join conformance-reference-implementation cim-profile-cyber-physical refbess-250mw-specification energy-refbess-250mw manufacturing-refpharma-api-1 rail-refdepot-emu-12 blast-radius-three-ontologies; do
  printf "  %-40s %s\n" "$s" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:4500/papers/$s)"
done
pkill -f "next dev"
```

Every one MUST be 200. A cross-reference to a 404 is worse than no cross-reference.

- [ ] **Step 4: Push the branch, do not merge**

```bash
cd /Users/jimmcknney/jim_private/eigenia
git push -u origin HEAD
```

`main` auto-deploys to Railway. Merging is Jim's decision, not this plan's.

---

## Citation baseline

To be recorded by Task 4, Step 4.

## Known gate limitation, recorded 2026-09-07

The terminology gate skips fenced blocks. That is correct for code samples, and
wrong for one case that exists today.

`references/WG-02-DT-Digital-Twin/WG-02-DT-Seven-Staff-Fugue.md:178` carries a
bare `ISO 15926` inside an UNLABELLED fence holding an ASCII diagram. A reader
sees that text on the published page exactly as they see prose, but the gate
does not check it. Verified: fence parity above line 178 is odd, so it is
genuinely inside a fence, and the line reads
`| DEXPI 2.0 PIPING SCHEMATIC (ISO 15926): |` inside a drawn box.

So the gate reports **20**, and the true corpus count is **21**.

This is why the plan's predicted figure was wrong: it came from a plain grep
that does not skip fences. The Task 2 implementer found the discrepancy,
investigated it, and reported it rather than adjusting the script or the
expectation. That is the behaviour the red-green discipline is meant to produce.

**Refinement available, deliberately not taken yet:** distinguish a fence with a
language tag (```json, ```python, genuine code, skip it) from an unlabelled
fence (usually an ASCII diagram or a quoted block, check it). That would catch
the 21st. It is deferred on just-in-time grounds; one occurrence does not yet
justify the added complexity, and the ASCII diagram is separately a candidate
for conversion to a real diagram under the earlier ASCII-to-Mermaid work.

## What this plan does not do

- It does not fix WG-02-DT's 69 unresolved citation markers, WG-01-UI's zero-citation problem, or the 182 corpus audit findings. Those are recorded in `notes/2026-09-06/publication-roadmap.md` and are a separate programme.
- It does not build an arithmetic gate. That gate is the hardest of the three proposed and catches the smallest measured class; it is deferred on kaizen just-in-time grounds until terminology and citation are green.
- It does not submit anything upstream. It produces documents drafted for submission. The three engagements, DEXPI e.V., the CycloneDX project and IEC TC 57, run on their own timetables and none is Eigenia's to control.
