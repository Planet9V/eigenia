| Field | Value |
|:---|:---|
| Designation | REVIEW-DESIGN-constraints |
| Reviews | MPN-DESIGN-01 revision 2 |
| Role | Constraint Guardian. Mandate: performance, scalability, reliability, security and privacy, maintainability, operational cost. May not debate product goals or suggest features |
| Disposition | **REJECT**, and partly VOID. The author ruled the scope on 13 September 2026: theory and internal research, synthetic material, no people, not in the EU. **Findings 7 to 11 and the regulatory half of 12 rest on a premise that is false for this programme and are void.** Findings 1 to 6 and 13 to 16 are technical and stand as future work for any use of real audio |
| Date | 13 September 2026 |

## Why REJECT

Published 2026 diarisation error makes the flagship multi-party case unmeasurable; the confidence rule the design depends on has no input on live APIs; live capture with speaker attribution is special-category biometric processing the dialogue surfaces declared nothing about, and Layer 3 may be a prohibited practice in workplace and education settings; and the design stated no security requirements at all.

## Findings

| # | Finding | Evidence | Disposition |
|:---|:---|:---|:---|
| 1 | **Future work, not current.** Synthetic dialogue is class A and carries exact labels. Layer 0 accuracy on multi-speaker audio is far below what any honest refusal threshold can pass. Best streaming DER 19.8 per cent; bundled vendors 39.1 and 39.2; meeting-benchmark word error 35 to 46 per cent. A true 60/40 floor share is not distinguishable from even | pyannote streaming benchmark; AssemblyAI accuracy guidance | **Accepted.** D15 three ingest classes, D16 resolution floor, D18 class B for multi-party live |
| 2 | The live diarisation-confidence rule has no input: streaming APIs return a speaker label and no confidence; per-segment confidence is batch-only | Deepgram diarisation docs | **Accepted.** D17: overlap measures not computed at all on class C |
| 3 | The asymmetric overlap error is confirmed and unbounded; missed speech is the dominant failure across all models | arXiv 2509.26177 | **Accepted.** D17 |
| 4 | Latency is achievable and the stated budget is conservative | AssemblyAI streaming; pyannote streaming | **No finding against.** Section 6.2 unchanged |
| 5 | Vendor concurrency and stream caps are a hard ceiling the design does not record: 8 speakers, 10 parallel streams, 5 hours per stream | pyannote streaming | **Accepted.** Section 8a failure table |
| 6 | Compute cost is not the constraint: 0.17 to 0.68 dollars per conversation-hour, 1 to 3 for a two-hour panel, under 100 a month for a small practice | AssemblyAI, Deepgram, pyannote pricing | **Accepted.** Section 10 records that the fixed legal cost per market is the real floor |
| 7 | **VOID under the scope ruling.** | EU AI Act Article 5(1)(f) may prohibit Layer 3 outright in workplace and education settings. In force since 2 February 2025; exposure up to 35 million euro or 7 per cent of turnover. The medical exception excludes general-wellness monitoring, which is the PRD's posture | Article 5, Article 99(3) | **Accepted.** D19 jurisdiction-and-context gate in code; D20 a written opinion is a condition of building |
| 8 | **VOID under the scope ruling.** | Speaker diarisation makes voice special-category biometric data. Article 9(2)(a) explicit consent, Article 35(3)(b) mandatory DPIA, Article 5(1)(e) retention, Article 28 processor agreements. The therapy surface declares all of this and the dialogue surfaces declared none | GDPR | **Accepted.** D21: the PRD's data obligations apply to every capturing surface |
| 9 | **VOID under the scope ruling.** | US biometric statutes are live litigation risk on this exact mechanism. BIPA damages 1,000 and 5,000 per violation; section 15(b) requires a written release before collection and 15(a) a public retention schedule | Basich v Microsoft, W.D. Wash., February 2026 | **Accepted.** D22: session-scoped diarisation, embeddings discarded, no voiceprint feature |
| 10 | **VOID under the scope ruling.** | Vendor default is to train on submitted audio; the design names no opt-out, residency or sub-processor disclosure | Deepgram, AssemblyAI docs | **Accepted.** Section 7.3 |
| 11 | **VOID under the scope ruling.** | The consent rule is correct and jurisdiction-blind. Twelve all-party-consent states; Article 50(3) disclosure duty from 2 August 2026 | recordinglaw.com; Article 50 | **Accepted.** D14 amended: resolved at session start |
| 12 | The design states no security requirements at all, in a programme that committed a live credential to a public repository for eight months | S4-1 | **Accepted in part.** The credential rule stands on its own merits and is section 7.3. The rest of the security programme is void with the scope ruling |
| 13 | The frozen build pin and mandatory security patching are in direct conflict, resolved in favour of the pin | HIPAA Security Rule revision | **Accepted.** D24: pins behaviour, with a security-backport lane |
| 14 | The parse-confidence refusal is the only failure rule and covers one failure of six | | **Accepted.** D25, section 8a, plus the staleness horizon |
| 15 | The real fragility is stimulus stability, and the programme's demonstrated behaviour under divergence is to fork | S4 section 7.1 | **Accepted.** D24: a golden-output suite in continuous integration |
| 16 | The viability floor is per-deployment legal fixed cost, not volume | | **Accepted.** Section 10 |
