# NFPA 855, stationary energy storage separation distances

*External research, found via Valyu, not the working group's own analysis.*

| Field | Value |
|:---|:---|
| Title | NFPA 855, *Standard for the Installation of Stationary Energy Storage Systems* |
| Publisher | National Fire Protection Association |
| Query run | "NFPA 855 stationary energy storage systems separation distance requirements lithium-ion BESS" |
| Tool | Valyu web search |
| Retrieval date | 2026-09-08 |
| Supports | `WG-05-CAD-RefBESS-250MW-Specification.md` and `WG-05-CAD-Energy-RefBESS-250MW.md` |
| Status | **Identified gap, not yet used in any paper** |

## Why this was looked up

RefBESS-250MW is a synthetic reference battery storage architecture. NFPA 855 is
the governing US installation standard for stationary energy storage, so a reference
BESS that never mentions it is incomplete on the physical safety side. NFPA 855 appears
in none of the eight three-schema papers. This note records the gap and what was found,
so a later revision does not have to start from nothing.

## What the sources say

The commonly cited provision is a minimum separation of **three feet, 0.9 metres**,
between individual ESS units and between units and surrounding walls or structures.
Secondary sources place this at **Section 15.5**, and state that smaller separations are
permitted where documented as adequate through large-scale fire testing and approved by
the authority having jurisdiction.

Sources also indicate a **2026 edition** of the standard, superseding the prior edition,
with changes described as covering separation distances, fire protection, operation and
training, and emergency response.

## What is NOT established, and why nothing was written into a paper

**The clause number is from secondary sources, not from the standard text.** NFPA 855 is
a paid document and was not held or read during this session. The repo rule is explicit:
do not invent clause numbers, and cite scope only where a clause cannot be verified.

Two specific risks make the secondary citation unsafe to use as-is:

1. **Clause numbers move between editions.** One source discussing Section 15.5 frames it
   in a residential context and carries an internal date of 2022. If the applicable edition
   for RefBESS is the 2026 one, that number may no longer point at the same requirement.
2. **The three-foot rule's scope is unclear from secondary reporting.** Whether it applies
   uniformly, or differs between residential, commercial, and utility-scale installations,
   is exactly the sort of distinction a secondary summary flattens. A 250 MW utility-scale
   asset is the case where that flattening would matter most.

## What would close this

Read the applicable edition of NFPA 855 directly and confirm the clause number, the
separation figure, and its scope for utility-scale installations. NFPA provides free
read-only access to its standards, which is the cheapest route.

Until then, any statement in an Eigenia paper should cite NFPA 855 by title and scope
only, and label the separation distance as reported rather than verified.
