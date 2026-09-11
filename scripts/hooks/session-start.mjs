#!/usr/bin/env node
/**
 * SessionStart hook. Whatever this prints to stdout is added to Claude's
 * context, so this is the one place the task state is guaranteed to be seen.
 *
 * Also records a session marker (.claude/.session-start, gitignored) that the
 * Stop hook uses to tell "TASKS.md was updated this session" from "TASKS.md
 * was updated last week".
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import {
  MARKER,
  activeSection,
  git,
  readStdinJson,
  readStamp,
  trackedChanges,
} from "./lib.mjs";

const input = readStdinJson();
const source = input.source ?? "startup";
const head = git(["rev-parse", "--short", "HEAD"], "unknown");
const branch = git(["branch", "--show-current"], "detached");

// A compaction is not a new session; keep the original marker so the Stop
// hook still compares against the real start of the work.
if (source !== "compact") {
  try {
    mkdirSync(dirname(MARKER), { recursive: true });
    writeFileSync(MARKER, JSON.stringify({ ts: Date.now(), head, source }));
  } catch {
    /* read-only checkout; the Stop hook degrades to "allow" without a marker */
  }
}

const stamp = readStamp();
const lines = [];
lines.push("=== Eigenia working memory (SessionStart hook) ===");
lines.push(`Branch ${branch} at ${head}.`);

if (!stamp) {
  lines.push(
    "TASKS.md has no `<!-- verified: DATE SHA -->` stamp on line 1. Add one when you bring it current; audit-tasks-stamp.mjs fails without it."
  );
} else {
  const behind = git(["rev-list", "--count", `${stamp.sha}..HEAD`], "?");
  const ageDays = Math.floor(
    (Date.now() - new Date(`${stamp.date}T00:00:00Z`).getTime()) / 86_400_000
  );
  lines.push(
    `TASKS.md stamp: ${stamp.date} at ${stamp.sha} — ${behind} commit(s) behind HEAD, ${ageDays} day(s) old.` +
      (behind !== "?" && Number(behind) > 0
        ? " Something merged since it was written; verify before trusting it."
        : "")
  );
}

const active = activeSection();
lines.push(`Active tasks (${active.length}):`);
for (const l of active) lines.push("  " + l.replace(/\*\*/g, ""));

const changes = trackedChanges();
if (changes.length) {
  lines.push(`Tracked files already modified in the working tree: ${changes.length} (someone's work in progress — do not revert).`);
}

lines.push(
  "Rules: memory/context/working-agreement.md. Update TASKS.md and its stamp before ending a session that changed anything; the Stop hook checks."
);
console.log(lines.join("\n"));
