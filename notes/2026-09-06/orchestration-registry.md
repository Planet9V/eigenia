# Orchestration registry: Eigenia uplift and corpus programme

Opened: 2026-09-06
Orchestrator: this session
Model: file-level locking, evidence gates, no agent self-report accepted as done

## Orchestrator identity

Decomposes, assigns file ownership, verifies with commands, and merges. Does
NOT author papers, does NOT research sources, does NOT audit documents. Where
this session has edited files directly, it was to repair a defect a subagent
introduced or to apply a one-line fix cheaper than a round trip; each is
recorded in git with a message saying so.

## THE LOCK TABLE

One writer per file, always. Two agents on one file is the failure this scheme
exists to prevent, and it has already been avoided four times this session by
holding tasks behind a lock rather than running them in parallel.

| Resource | Holder | State |
|:---|:---|:---|
| `WG-04-CF-Cascading Failure Hypothesis.md` | T7 placeholders | **HELD** |
| `WG-04-CF-Grid-Incident-Response-Playbook.md` | T8 (queued) | free, not yet created |
| `web/src/lib/papers.ts` + `wikiRegistry.ts` | T8 registration | free |
| `notes/2026-09-06/*` | orchestrator | free |
| every file under `references/` outside WG-04-CF | corpus swarm | free, read-only |

Read-only auditors take no lock. Four ran fully parallel earlier today with
zero contention because none of them wrote to `references/`.

## Queue

| # | Task | Depends on | Agent | Lock needed |
|:--|:---|:---|:---|:---|
| T7 | Clear the last placeholders | none | running, 31 left of 154 | paper |
| T8 | Extract the operational playbook | T7 | opus, queued | paper + playbook + registries |
| T11 | Promote limitations, finalise cut list | T8 | opus | paper |
| T13 | Four mermaid diagrams | T11 | opus | paper |
| T14 | Cross-references and style sweep | T13 | opus | paper |
| T15 | Full verification, then push | T14 | orchestrator | all |
| S1 | Publication gap register | none | swarm, read-only | none |

T12, the bibliography merge, is DEFERRED at Jim's instruction. Consequence to
carry into T15: sections 5 and 9 ship with `[n]` markers that resolve to
nothing. That is a visible loose end and must be stated at push time, not
discovered by a reader.

## Quality gates: a claim is not evidence

Every task is verified by the orchestrator running these itself, never by
reading an agent's summary.

| # | Gate | Command |
|:--|:---|:---|
| **0** | **No prose lost** | `node web/scripts/audit-rendered-completeness.js` -> PASSED, exit 0. Exit 2 (inconclusive) blocks as hard as exit 1. |
| 1 | Word count did not fall unrecorded | `wc -w`, reconciled against `uplift-cut-list.md` |
| 2 | Scope | `git status --porcelain`, only the locked file changed |
| 3 | Deletions audited | `git show <sha> | grep '^-'`, every removed line accounted for |
| 4 | Build and fidelity | `npm run build` -> AUDIT PASSED, all documents |
| 5 | Types | `npx tsc --noEmit` -> exit 0 |
| 6 | Diagrams parse | `node web/scripts/audit-mermaid.mjs` -> PASSED |
| 7 | Reachable | both registries carry it, slug returns HTTP 200 |
| 8 | Style | 0 em dashes, 0 en dashes, 0 spaced semicolons, no banned words |

Gate 0 outranks the rest. Gate 3 exists because a word count can stay flat
while content is swapped out.

## Failure log

Recorded so the same trap is not re-entered.

| Failure | Cause | Fix |
|:---|:---|:---|
| Agent connection lost, 3 times | API instability, always at the point of writing a large finished artifact | resume rather than restart; instruct agents to commit each completed section |
| My brief said block B had 4 appendices | I surveyed with `head -20` | agent flagged the discrepancy; 69 placeholders would have been destroyed |
| My gate flagged a legitimate `## 1.` heading | `head -3 | grep '^##'` cannot tell a numbered section from a title duplicate | corrected to `^# |^## [^0-9]` |
| I reported destroyed colons corpus-wide | my own `awk -F:` rebuilt lines with colons as spaces | verified with a control before reporting |
| I passed on leads `[87]` and `[558]` | they were line numbers in an old note, never verified | auditor refuted both; register now records it |
| My ATQ weight spot-check said 1.00 | regex grabbed 8 of 12 rows | read the actual table: 1.05, auditor was right |

Six entries. Four are my own errors, and every one was caught by running a
check rather than trusting a summary, including two where the summary was mine.
