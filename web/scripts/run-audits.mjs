#!/usr/bin/env node
/**
 * Runs every audit in scripts/ and reports one summary.
 *
 * Discovery is by filename: any file matching `audit-*.js` or `audit-*.mjs` in
 * this directory is picked up. There is no registration list, because a
 * registration list is a thing people forget to update. Drop a script in and it
 * runs.
 *
 * An audit is any script that exits 0 on success and non-zero on failure.
 *
 * Pre-existing failures are frozen in known-failures.json. A frozen audit may
 * fail without breaking the build, but its count can never grow. That is the
 * ratchet: debt is visible and can only shrink.
 *
 * Usage:
 *   node scripts/run-audits.mjs           run everything
 *   node scripts/run-audits.mjs --quick   skip audits marked slow
 *   node scripts/run-audits.mjs --list    show what would run, run nothing
 */

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const KNOWN_FAILURES_PATH = join(HERE, "known-failures.json");

/** Audits that take long enough to skip under --quick. */
const SLOW = new Set(["audit-rendered-completeness.js", "audit-mermaid.mjs"]);

/**
 * Audits that fetch from a running dev server. Without one they report every
 * document unreachable, which is neither a pass nor a real failure. The runner
 * probes for the server and skips them loudly when it is absent.
 *
 * Loudly matters. A silent skip is how a check rots into decoration.
 */
const NEEDS_SERVER = new Set(["audit-rendered-completeness.js"]);
const SERVER_URL = process.env.AUDIT_BASE_URL ?? "http://localhost:4500";

async function serverIsUp() {
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 2000);
    const res = await fetch(SERVER_URL, { signal: ctl.signal });
    clearTimeout(t);
    return res.ok;
  } catch {
    return false;
  }
}

const args = new Set(process.argv.slice(2));
const QUICK = args.has("--quick");
const LIST_ONLY = args.has("--list");

function loadKnownFailures() {
  if (!existsSync(KNOWN_FAILURES_PATH)) return {};
  try {
    return JSON.parse(readFileSync(KNOWN_FAILURES_PATH, "utf8")).audits ?? {};
  } catch (err) {
    console.error(`Could not parse known-failures.json: ${err.message}`);
    process.exit(2);
  }
}

function discoverAudits() {
  return readdirSync(HERE)
    .filter((f) => /^audit-.*\.(js|mjs)$/.test(f))
    .sort();
}

/**
 * Pulls the failure count out of an audit's output using the pattern recorded
 * against it. Returns null when the pattern is absent or does not match, which
 * the caller treats as "cannot verify, so fail".
 */
function extractCount(output, pattern) {
  if (!pattern) return null;
  const m = output.match(new RegExp(pattern));
  return m ? Number(m[1]) : null;
}

const known = loadKnownFailures();
const audits = discoverAudits();
const serverUp = await serverIsUp();

if (LIST_ONLY) {
  console.log(`${audits.length} audit(s) discovered in scripts/:`);
  for (const a of audits) {
    const tags = [SLOW.has(a) ? "slow" : null, known[a] ? "frozen" : null]
      .filter(Boolean)
      .join(", ");
    console.log(`  ${a}${tags ? `  [${tags}]` : ""}`);
  }
  process.exit(0);
}

const results = [];

for (const script of audits) {
  if (QUICK && SLOW.has(script)) {
    results.push({ script, status: "SKIP", note: "slow, skipped under --quick" });
    continue;
  }

  if (NEEDS_SERVER.has(script) && !serverUp) {
    results.push({
      script,
      status: "SKIP",
      note: `needs a dev server at ${SERVER_URL}, none responding. Run \`npm run dev\` and re-run to include it.`,
    });
    continue;
  }

  let output = "";
  let code = 0;
  const started = Date.now();
  try {
    output = execFileSync(process.execPath, [join(HERE, script)], {
      cwd: join(HERE, ".."),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      maxBuffer: 32 * 1024 * 1024,
    });
  } catch (err) {
    code = err.status ?? 1;
    output = `${err.stdout ?? ""}${err.stderr ?? ""}`;
  }
  const ms = Date.now() - started;

  if (code === 0) {
    results.push({ script, status: "PASS", ms });
    continue;
  }

  const frozen = known[script];
  if (!frozen) {
    results.push({
      script,
      status: "FAIL",
      ms,
      output,
      note: "not in known-failures.json",
    });
    continue;
  }

  const actual = extractCount(output, frozen.countPattern);
  if (actual === null) {
    results.push({
      script,
      status: "FAIL",
      ms,
      output,
      note: "frozen, but countPattern did not match its output, so the count could not be verified",
    });
  } else if (actual > frozen.count) {
    results.push({
      script,
      status: "FAIL",
      ms,
      output,
      note: `regression: ${actual} failures, frozen at ${frozen.count}`,
    });
  } else if (actual < frozen.count) {
    results.push({
      script,
      status: "FROZEN",
      ms,
      note: `${actual} failures, frozen at ${frozen.count}. Improved. Lower the count in known-failures.json.`,
    });
  } else {
    results.push({
      script,
      status: "FROZEN",
      ms,
      note: `${actual} known failures. ${frozen.reason}`,
    });
  }
}

const width = Math.max(...results.map((r) => r.script.length), 10);
const line = "=".repeat(width + 46);

console.log(line);
console.log("EIGENIA AUDIT SUITE");
console.log(line);

for (const r of results) {
  const time = r.ms === undefined ? "" : `${String(r.ms).padStart(6)}ms`;
  console.log(`  ${r.status.padEnd(6)} ${r.script.padEnd(width)} ${time}`);
  if (r.note) console.log(`         ${r.note}`);
}

const failed = results.filter((r) => r.status === "FAIL");
const frozenCount = results.filter((r) => r.status === "FROZEN").length;
const passed = results.filter((r) => r.status === "PASS").length;
const skipped = results.filter((r) => r.status === "SKIP").length;

console.log(line);

if (failed.length) {
  for (const f of failed) {
    console.log(`\n--- ${f.script} output ---`);
    console.log(f.output.trim());
  }
  console.log(line);
  console.log(
    `AUDIT SUITE FAILED: ${failed.length} failing, ${passed} passing, ${frozenCount} frozen, ${skipped} skipped.`
  );
  console.log(
    "A new failure, or a frozen count that grew. Fix it, or if it is genuinely"
  );
  console.log(
    "pre-existing, record it in scripts/known-failures.json with a reason."
  );
  console.log(line);
  process.exit(1);
}

console.log(
  `AUDIT SUITE PASSED: ${passed} passing, ${frozenCount} frozen, ${skipped} skipped.`
);
if (!serverUp && audits.some((a) => NEEDS_SERVER.has(a))) {
  console.log(
    `Server-dependent audits did not run. A pass here does not cover them.`
  );
}
if (frozenCount) {
  console.log("Frozen entries are pre-existing debt. They can shrink, never grow.");
}
console.log(line);
