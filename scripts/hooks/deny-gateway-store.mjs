#!/usr/bin/env node
/**
 * PreToolUse hook matched to mcp__super-intelligence__memory_store.
 *
 * The gateway is a query tool on this project, not memory of record
 * (memory/context/gateway-evaluation.md). Decisions go in memory/ and
 * TASKS.md, which every session loads automatically. This denies the write
 * path and leaves graph_* and memory_search alone.
 */

console.log(
  JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason:
        "memory_store is disabled on this repo (decided 2026-09-11). Write the decision to memory/ (or a line in TASKS.md) instead; that is what every session reads. graph_query / graph_path / graph_explain / memory_search remain available.",
    },
  })
);
process.exit(0);
