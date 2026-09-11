/**
 * Shared helpers for the Claude Code hooks in this directory.
 *
 * Hooks receive one JSON object on stdin (session_id, cwd, hook_event_name,
 * and event-specific fields such as `source` on SessionStart or
 * `stop_hook_active` on Stop). $CLAUDE_PROJECT_DIR is the repo root.
 *
 * Every helper here is read-only against git. Nothing in scripts/hooks/ ever
 * writes to the working tree except the session marker under .claude/, which
 * is gitignored.
 */

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

export const ROOT = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
export const TASKS = join(ROOT, "TASKS.md");
export const MARKER = join(ROOT, ".claude", ".session-start");

export function readStdinJson() {
  try {
    const raw = readFileSync(0, "utf8");
    return raw.trim() ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function git(args, fallback = "") {
  try {
    return execFileSync("git", args, {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return fallback;
  }
}

/** Parses `<!-- verified: YYYY-MM-DD <sha> -->` from line 1 of TASKS.md. */
export function readStamp() {
  if (!existsSync(TASKS)) return null;
  const first = readFileSync(TASKS, "utf8").split("\n", 1)[0];
  const m = first.match(/verified:\s*(\d{4}-\d{2}-\d{2})\s+([0-9a-f]{7,40})/i);
  return m ? { date: m[1], sha: m[2] } : null;
}

export function tasksMtimeMs() {
  return existsSync(TASKS) ? statSync(TASKS).mtimeMs : 0;
}

export function readMarker() {
  try {
    return JSON.parse(readFileSync(MARKER, "utf8"));
  } catch {
    return null;
  }
}

/** Tracked changes only. Untracked files (`??`) are somebody's drafts, not this session's work. */
export function trackedChanges() {
  return git(["status", "--porcelain", "--untracked-files=no"])
    .split("\n")
    .filter(Boolean);
}

/** The Active section of TASKS.md, as lines, for context injection. */
export function activeSection() {
  if (!existsSync(TASKS)) return [];
  const text = readFileSync(TASKS, "utf8");
  const m = text.match(/^## Active\s*\n([\s\S]*?)(?=^## |\Z)/m);
  if (!m) return [];
  return m[1].split("\n").filter((l) => l.startsWith("- ["));
}
