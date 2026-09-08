# Testing

One command runs everything:

```bash
cd web && npm run verify
```

That syncs generated content, typechecks, runs the audit suite, and runs the unit
tests. If it is green, the branch is safe to push.

## Why this exists

Five audit scripts lived in `web/scripts/` and only one of them ran, and only as a
side effect of `prebuild`. The other four fired when somebody remembered to type the
command, which is to say rarely. Two consequences reached production:

- A stray `**` rendered on a published paper. Terminology, citations, types and the
  fidelity audit all passed. Only looking at the deployed page caught it.
- The navbar advertised 25 treatises while the real figure had climbed to 59.

There was no CI and no git hook, so nothing enforced anything.

## The three layers

### 1. Unit tests, Vitest

```bash
npm test          # watch
npm run test:run  # once
```

Tests live beside the code in `src/**/__tests__/*.test.ts`. They run in Node, not a
browser.

`src/lib/__tests__/registry.test.ts` covers the defect classes that actually happened
here, not hypothetical ones: a document registered nowhere and therefore unreachable
while every gate stayed green, a `relativePath` that does not resolve (which fails the
Railway build and not the local one), duplicate slugs, and totals drifting from the
sum of their parts.

### 2. Audit suite

```bash
npm run audit         # everything
npm run audit:quick   # skips the two slow ones
npm run audit:list    # show what would run
```

`scripts/run-audits.mjs` discovers **any** file matching `audit-*.js` or `audit-*.mjs`
in `web/scripts/` and runs it. There is no registration list, because a registration
list is a thing people forget to update.

**To add a check: drop a script in `web/scripts/` named `audit-something.mjs` that
exits 0 on success and non-zero on failure.** That is the entire contract. It will be
picked up by the runner, by `prebuild`, by CI and by the pre-push hook without another
edit anywhere.

Current audits:

| Script | Checks |
|:---|:---|
| `audit-publications.js` | every registered document is present with 100% content fidelity |
| `audit-rendered-completeness.js` | no prose silently lost between source and rendered page |
| `audit-terminology.mjs` | canonical terms, no bare `ISO 15926`, no banned variants |
| `audit-citations.mjs` | every `[n]` marker resolves to a bibliography entry |
| `audit-mermaid.mjs` | every mermaid block parses through the real library |

### 3. Gates

- **`prebuild`** runs the sync and the full audit suite, so `npm run build` cannot
  succeed on a content defect. Railway runs this, so a broken audit blocks a deploy.
- **CI**, `.github/workflows/ci.yml`, runs three separate jobs on every push and pull
  request: Audits, Unit tests, Types and build. They are separate so a red check names
  its own cause.
- **Pre-push hook**, `.githooks/pre-push`, runs typecheck, the quick audits and the
  unit tests before anything leaves the machine.

Enable the hook once per clone:

```bash
git config core.hooksPath .githooks
```

The hook is committed, so it travels with the repo rather than living in one person's
`.git/hooks`. Bypass it for a genuine emergency with `git push --no-verify`. If you
are typing that regularly, the hook is wrong; fix the hook.

## The ratchet

`scripts/known-failures.json` freezes pre-existing failures so a real gate could be
switched on immediately rather than after a content project.

A listed audit may fail without breaking the build, **but its failure count can never
grow.** If the count rises, or a script not listed fails, the suite exits non-zero.

Currently frozen: `audit-citations.mjs` at 12 unresolved markers across two WG-02-DT
documents that are byte-identical to `main`.

Three rules:

1. **To retire an entry**, fix the underlying problem, confirm the audit exits 0, then
   delete the entry.
2. **When the count drops**, the runner tells you and asks you to lower it. Lower it.
   That is how the ratchet tightens.
3. **Never raise a count to make a build pass.** That is the one move this file exists
   to prevent. If something new is broken, it is new, and it is yours.

## Known limits, stated rather than hidden

**No component rendering tests.** Nothing renders React and asserts on the output.
`jsdom` is installed and Vitest is configured for Node, so adding
`@testing-library/react` and switching `environment` per file is the natural next step.
It was not done here because nothing asked for it.

**No browser-level test.** The `**` rendering bug that prompted this work would still
not be caught by any of these layers. It was valid markdown that the renderer
disagreed with, and only a real browser showed it. `scripts/verify_live_*.py` and
`audit_live_*.py` are older Playwright-style helpers, currently unwired and hardcoded
to another machine's paths.

**`audit-rendered-completeness.js` needs a running dev server.** The runner probes
`http://localhost:4500` (override with `AUDIT_BASE_URL`) and, finding nothing, skips
that audit and says so: *"Server-dependent audits did not run. A pass here does not
cover them."* It is not silently passed and not falsely failed. CI runs it for real in
the build job, which starts a server after building; that is the only place it
actually executes, because a permanently skipped check is not a check.

It also returns exit 2 for INCONCLUSIVE on pages under 5 KB. The runner treats any
non-zero exit as a failure, which is deliberate: inconclusive is not green.

**Node version is pinned to 20 across CI and the Dockerfile.** They disagreed once,
and it mattered: `jsdom@30` pulls an `undici` needing Node 22+, so `audit-mermaid`
died with `webidl.util.markAsUncloneable is not a function` on Node 20. It passed
locally on Node 26. `jsdom` is pinned to `^25` for this reason. If you bump it, bump
the Dockerfile too, or the Railway build breaks where your machine does not.

**Dependency discipline.** `audit-mermaid.mjs` imported `jsdom` without it being
declared in `package.json`. It worked by accident on one machine and would have failed
on the first CI run. It is declared now. If you add an audit that needs a package,
declare it.
