# Two bibliography entries that no search can find

Date: 2026-09-07
Status: UNRESOLVED, needs Jim's ruling
File: `references/WG-05-CAD-DEXPI-2/WG-05-CAD-Frontier-AI-Hardware-Security.md`

## The two entries, verbatim

```
12. Ashok, A., et al. Cyber-Physical Threat Analysis for Critical Liquid-Cooled
    Infrastructure. IEEE Transactions on Industrial Informatics,
    vol. 19, no. 4, pp. 4120-4131, 2023.

15. Sethi, P., et al. Power Glitch and Resonant Induction Vulnerabilities in
    Modern Accelerator Silicon. Proceedings of the IEEE Symposium on Security
    and Privacy (S&P), pp. 1024-1039, 2024.
```

## What was searched, and what came back

| Route | Result |
|:---|:---|
| WebSearch, exact title plus author plus venue, both entries | no match |
| WebSearch, IEEE TII vol 19 no 4 pages 4120-4131 | could not resolve the page range to any article |
| WebSearch, IEEE S&P 2024 proceedings pages 1024-1039 | could not resolve the page range to any article |
| dblp volume listing for IEEE TII vol 19 | blocked by bot protection, unread |
| Valyu, which indexes arXiv, PubMed, bioRxiv, medRxiv and licensed publishers | no match for either; returns topically adjacent work by other authors |
| Perplexity deep research | network failure, did not run |
| The corpus itself | neither author surname appears in any other document |

Five routes attempted. Four returned nothing; one was blocked.

## What this establishes, and what it does not

**Establishes:** no evidence of existence was found by any working search route, including an academic index that covers paywalled publishers.

**Does NOT establish:** that the papers do not exist. IEEE Xplore full text sits behind a paywall this session cannot reach, dblp was blocked rather than empty, and the one purpose-built deep-research tool failed on a network error rather than returning a negative. Absence of evidence across five routes is strong, and it is not proof.

I am stating that distinction rather than collapsing it, because a fabricated citation and an unfindable-but-real citation call for different corrections, and reporting the second as the first would be its own fabrication.

## Why the pattern is still suspicious

Both entries carry **volume, issue and page ranges**. That is the detail that makes a citation look checked, and it is the detail a real reader uses to check it. A genuine reference this specific should be findable.

Both surnames appear nowhere else in a 62-document corpus.

Both sit in a bibliography the corpus audit already found to be largely orphaned: 24 entries, almost none cited from the body when the audit ran.

## The mitigating fact, which decides the correct action

**Neither is cited anywhere in the body.** Zero `[12]` or `[15]` markers.

So no claim in the paper rests on either one. The W0 corrective pass deliberately declined to wire them, on the grounds that wiring a citation to a source you cannot find is how a fabrication becomes load-bearing. That judgement was right.

## Recommended action, for Jim to accept or overrule

**Strike both entries and renumber.** The cost is zero, because nothing cites them. The benefit is that a reviewer who tries to check them, and fails as five routes have failed, does not conclude the rest of the bibliography is decorative.

The alternative, keeping them with an "unverified" annotation, is worse here than usual: an annotated unverifiable entry in a bibliography invites the question of why it is there at all, when nothing in the paper needs it.

**If these came from a real reading**, they should be restored with a DOI, which is the one identifier that would settle this in a second. Jim would know; no search does.

## Related, and the reason this matters beyond two entries

The same paper's bibliography carries entry 10, the CRA **proposal** COM(2022) 454 final, where the body relies on the **adopted** Regulation (EU) 2024/2847. That is a different defect, a real document cited in the wrong version, and it is separately recorded in the W0 report.

Three defects in one 24-entry bibliography is a pattern about that bibliography, not three coincidences.
