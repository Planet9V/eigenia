#!/usr/bin/env node
/**
 * Stop hook. Refuses to let a session end when it did work and left
 * TASKS.md untouched.
 *
 * "Did work" means tracked files are modified in the working tree, or HEAD
 * moved since the session marker was written. Untracked files never count.
 * "Touched" means TASKS.md's mtime is newer than the marker, or TASKS.md is
 * among the modified files, or it changed in a commit since the marker.
 *
 * Output `{"decision":"block","reason":...}` makes Claude continue with the
 * reason instead of stopping. `stop_hook_active` is true when we are already
 * in that continuation, and we always allow then, so this can never loop.
 */

import {
  git,
  readMarker,
  readStdinJson,
  tasksMtimeMs,
  trackedChanges,
} from "./lib.mjs";

const input = readStdinJson();
if (input.stop_hook_active) process.exit(0);

const marker = readMarker();
if (!marker) process.exit(0); // no SessionStart ran; cannot judge, allow

const head = git(["rev-parse", "--short", "HEAD"], "unknown");
const changes = trackedChanges();
const headMoved = head !== marker.head;
const didWork = changes.length > 0 || headMoved;
if (!didWork) process.exit(0);

const tasksInWorkingTree = changes.some((l) => l.endsWith(" TASKS.md") || l.endsWith("\tTASKS.md"));
const tasksInCommits =
  headMoved &&
  git(["diff", "--name-only", `${marker.head}..HEAD`], "")
    .split("\n")
    .includes("TASKS.md");
const tasksTouched = tasksMtimeMs() > marker.ts || tasksInWorkingTree || tasksInCommits;

if (tasksTouched) process.exit(0);

const what = [
  changes.length ? `${changes.length} tracked file(s) modified` : null,
  headMoved ? `HEAD moved ${marker.head} → ${head}` : null,
]
  .filter(Boolean)
  .join(", ");

console.log(
  JSON.stringify({
    decision: "block",
    reason:
      `This session did work (${what}) but TASKS.md was not updated. ` +
      "Before stopping: move finished items to Done with the PR/commit, add anything new you found, " +
      "and refresh line 1 to `<!-- verified: <today> <current main sha> -->`. " +
      "If the change really was trivial, say so in one line under the current date in Done.",
  })
);
process.exit(0);
