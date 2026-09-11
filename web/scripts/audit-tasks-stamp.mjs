#!/usr/bin/env node
/**
 * Audit: is TASKS.md current?
 *
 * TASKS.md at the repo root is the memory of record for this project. Line 1
 * carries `<!-- verified: YYYY-MM-DD <sha> -->`, written by whichever session
 * last brought the file current. This audit fails when that stamp is:
 *
 *   - missing or malformed,
 *   - not a commit in this repository's history,
 *   - more than MAX_COMMITS_BEHIND commits behind HEAD, or
 *   - more than MAX_AGE_DAYS old.
 *
 * On 2026-09-11 the file said "clean, 0 uncommitted files" while the tree held
 * 23 and main had moved four merges. Nothing noticed for two days. This is the
 * ratchet against that.
 *
 * Layouts. Locally and in CI the script runs from <repo>/web with TASKS.md at
 * <repo>/TASKS.md and a .git directory. In the Railway image (`COPY web ./`)
 * neither exists, and the audit SKIPS LOUDLY rather than failing a deploy over
 * a file that is not shipped. A shallow clone (actions/checkout fetch-depth 1)
 * cannot measure commit distance; the audit says so and checks the date only.
 *
 * Override: TASKS_STAMP_MAX_DAYS, TASKS_STAMP_MAX_COMMITS.
 */

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const MAX_AGE_DAYS = Number(process.env.TASKS_STAMP_MAX_DAYS ?? 7);
const MAX_COMMITS_BEHIND = Number(process.env.TASKS_STAMP_MAX_COMMITS ?? 15);

function findRepoRoot() {
  const candidates = [
    resolve(HERE, "../.."), // local / CI: <repo>/web/scripts -> <repo>
    resolve(process.cwd(), ".."),
    process.cwd(),
  ];
  for (const c of candidates) {
    if (existsSync(resolve(c, "TASKS.md"))) return c;
  }
  return null;
}

function git(root, args) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

const root = findRepoRoot();
if (!root) {
  console.log(
    "SKIP audit-tasks-stamp: no TASKS.md in this layout (expected in the Docker image, where only web/ and references/ are copied). Not a pass; CI runs this against the full checkout."
  );
  process.exit(0);
}

const first = readFileSync(resolve(root, "TASKS.md"), "utf8").split("\n", 1)[0];
const m = first.match(/verified:\s*(\d{4}-\d{2}-\d{2})\s+([0-9a-f]{7,40})\b/i);
const failures = [];

if (!m) {
  failures.push(
    "line 1 of TASKS.md is not `<!-- verified: YYYY-MM-DD <sha> -->`; got: " + JSON.stringify(first)
  );
} else {
  const [, date, sha] = m;
  const ageDays = Math.floor((Date.now() - new Date(`${date}T00:00:00Z`).getTime()) / 86_400_000);
  if (Number.isNaN(ageDays)) failures.push(`stamp date ${date} is not a valid date`);
  else if (ageDays > MAX_AGE_DAYS) failures.push(`stamp is ${ageDays} days old (limit ${MAX_AGE_DAYS})`);
  else if (ageDays < 0) failures.push(`stamp date ${date} is in the future`);

  let hasGit = existsSync(resolve(root, ".git"));
  if (!hasGit) {
    console.log("note: no .git directory; commit distance not checked, date only.");
  } else {
    let known = true;
    try {
      git(root, ["cat-file", "-e", `${sha}^{commit}`]);
    } catch {
      known = false;
    }
    let shallow = false;
    try {
      shallow = git(root, ["rev-parse", "--is-shallow-repository"]) === "true";
    } catch {
      /* old git */
    }
    if (!known && shallow) {
      console.log(
        `note: shallow clone; commit ${sha} is not in the local history so distance is not checked. Use fetch-depth: 0 in CI to enable it.`
      );
    } else if (!known) {
      failures.push(`stamp commit ${sha} is not in this repository's history`);
    } else {
      let behind = "?";
      try {
        behind = git(root, ["rev-list", "--count", `${sha}..HEAD`]);
      } catch {
        /* leave "?" */
      }
      if (behind !== "?" && Number(behind) > MAX_COMMITS_BEHIND) {
        failures.push(`stamp commit ${sha} is ${behind} commits behind HEAD (limit ${MAX_COMMITS_BEHIND})`);
      } else {
        console.log(`stamp ${date} at ${sha}: ${behind} commit(s) behind HEAD, ${ageDays} day(s) old.`);
      }
    }
  }
}

if (failures.length) {
  console.log(`audit-tasks-stamp: ${failures.length} failure(s)`);
  for (const f of failures) console.log(`  - ${f}`);
  console.log(
    "Bring TASKS.md current (read the repo, not your memory), then set line 1 to `<!-- verified: <today> <main sha> -->`."
  );
  process.exit(1);
}
console.log("audit-tasks-stamp: TASKS.md is current.");
