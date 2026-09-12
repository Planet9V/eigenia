> **Superseded, 2026-09-12.** This review covers the Mexican *field* edition of Paper 4, which carried a legal frame and invariants DM-1 to DM-32. That edition has been replaced by MPN-4-MX-R, the closed research environment edition (DM-1 to DM-23, no legal frame, synthetic data). None of the legal findings below transfer. The report is kept as the record of the field edition's legal verification, which remains the best available research on the Mexican frame should a field edition be written again; the underlying research is `notes/2026-09-12/research/q10-mexico-legal-frame.md`. The research edition has not yet had an adversarial review of its own.

# QA review: MPN-4-MX (Mexico edition of the deployment paper)

Reviewer role: adversarial legal reviewer, Mexican law, independence rule applied (expected result not disclosed). Date: 2026-09-12. Files reviewed: `/home/claude/mpn-drafts/MPN-4-MX-deployment-mexico.md` (439 lines), `/home/claude/mpn-drafts/CITATION-LEDGER-MPN-4-MX.md`, with `/home/claude/mpn-drafts/MPN-2-notation.md`, `/home/claude/mpn-drafts/MPN-3-engine.md` and `/home/claude/mpn-drafts/MPN-4-deployment.md` opened for cross-reference.

Method: the primary texts were retrieved first and read before the paper was opened for comparison. Line numbers below refer to the MX draft.

## 1. Authentic texts retrieved, with URLs

| Text | Source retrieved | Status as retrieved |
|:---|:---|:---|
| LFPDPPP, nueva ley DOF 20-03-2025, última reforma DOF 14-11-2025 | https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf (texto vigente PDF, 24 pp.) | Full text read: Arts. 2, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 26, 39, 59, 60, 61, 62, 63, 64; Transitorios Primero, Segundo, Cuarto, Quinto, Décimo, Décimo Segundo, Vigésimo; reform decree of 14-11-2025 (Art. 4 only) |
| LGPDPPSO, nueva ley DOF 20-03-2025, última reforma DOF 14-11-2025 | https://www.diputados.gob.mx/LeyesBiblio/pdf/LGPDPPSO.pdf | Read: Arts. 1, 2, 3 fr. X, XXVI, XXVII; Art. 15 (consent, sensitive data); Arts. 68 to 72 (evaluación de impacto) |
| Ley Federal del Trabajo, última reforma DOF 14-05-2026 | https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf | Read: Arts. 2, 3, 3 Bis, 16, 47, 132 fr. XVI, XVII, XVIII, XXXI, XXXIV, 134 fr. X, 291-J, 291-K, 304 to 308, 305 Bis, 330-I, 422 to 425, 475 Bis, 994; decree headings of 15-01-2026 and 14-05-2026 |
| Ley del Sector Eléctrico, DOF 18-03-2025 | https://www.diputados.gob.mx/LeyesBiblio/pdf/LSE.pdf | Read: Art. 2 fr. XII, Art. 123, Art. 124, Transitorio Tercero |
| Ley de la Comisión Nacional de Energía, DOF 18-03-2025, declaratoria de invalidez DOF 26-12-2025 | https://www.diputados.gob.mx/LeyesBiblio/pdf/LCNE.pdf | Read: Art. 2; SCJN declaratoria (Art. 22 fr. III invalidated) |
| CPEUM, últimas reformas DOF 02-06-2026 | https://www.diputados.gob.mx/LeyesBiblio/pdf/CPEUM.pdf | Read: Art. 16 paras. 1 and 2; whole-text search for "inteligencia artificial" (none) |
| NOM-035-STPS-2018, DOF 23-10-2018 | https://dof.gob.mx/nota_detalle.php?codigo=5541828&fecha=23/10/2018 (DOF HTML) | Read: numerals 1, 2, 5.1 to 5.7, 7.1, 7.2, 7.5 to 7.9, 8.1, 8.3, 8.4, 11, 13, Transitorios; Guía de referencia II/III application instructions (confidentiality clause) |
| ILO C190 dates | https://basham.com.mx/en/el-convenio-190-de-la-oit-entra-en-vigor-en-mexico/ ; UN Mexico and SRE press releases surfaced by search (DOF page for the 19-06-2023 decree refused the fetch: robots) | Deposit 6 July 2022 and entry into force 6 July 2023 confirmed from secondary sources; the 6 April 2022 DOF date of the Senate approval decree was not independently verified |
| AI legislation status | https://www.itsitio.com/mx/inteligencia-artificial/regulacion-de-ia-en-mexico-todavia-no-hay-una-ley-general-pero-las-reglas-ya-avanzan-por-sectores/ (3 Aug 2026); https://intoleranciadiario.com/articles/nacional/2026/05/14/1052819-aprueba-el-senado-candados-a-la-inteligencia-artificial.html (14 May 2026) | No general AI statute in force; the LFT/LFDA performers' reform on AI use of voice and image was enacted (DOF 14-05-2026, LFT Art. 305 Bis) |
| UMA 2026 | https://kpmg.com/mx/es/tendencias/2026/01/flash-inegi-valor-de-la-uma-para-2026.html (INEGI communiqué 1/26 also surfaced) | Daily 117.31 MXN from 1 Feb 2026; monthly 3,566.22; annual 42,794.64 |
| Reglamento LFPDPPP status | Two searches | No report of a new Reglamento found through the search window; not verified against the DOF index. Consistent with the paper's caveat, not proof of it |
| INAI Guía de Datos Biométricos 2018 [20] | Not fetched (budget) | Quotations at line 35 not checked by this reviewer |

Fetch count: 7 PDF/HTML retrievals by curl, 5 WebFetch, 7 searches.

## 2. Quotation comparison table

Every Spanish quotation in the paper compared word for word with the retrieved text.

| Line | Provision | Paper's quotation | Authentic text | Result |
|:---|:---|:---|:---|:---|
| 35 | LFPDPPP Art. 2 fr. V | "Datos personales: Cualquier información concerniente a una persona identificada o identificable." | Same, but the fraction continues: "Se considera que una persona es identificable cuando su identidad pueda determinarse directa o indirectamente a través de cualquier información;" | Truncated without ellipsis. The dropped sentence is the identifiability test that governs the pseudonymised research set of DM-25 |
| 35 | Art. 2 fr. VI | Full sensitive-data definition | Identical, including "enunciativa más no limitativa" (sic in the law) | Exact |
| 37 | Art. 8 | Both paragraphs | Identical | Exact |
| 39 | Art. 5 | Principles list | Identical | Exact |
| 39 | Art. 12 | Full article | Identical | Exact |
| 41 | Art. 15 fr. II, III | "identificando aquéllos que son sensibles", "distinguiendo aquéllas que requieren el consentimiento" | Identical fragments | Exact |
| 41 | Art. 16 fr. II | "por cualquier medio electrónico, óptico, sonoro, visual, o a través de cualquier otra tecnología" | Identical | Exact |
| 43 | Art. 26 fr. II | Full fraction | Identical | Exact. Note the head of Art. 26 ("por causa legítima") and the closing paragraph (legal-obligation carve-out) are paraphrased, see section 3 |
| 45 | Art. 18 para. 2 | "el riesgo existente, las posibles consecuencias para las personas titulares, la sensibilidad de los datos y el desarrollo tecnológico" | Identical | Exact |
| 45 | Art. 59 fr. II, III, IV | "100 a 160,000 veces la Unidad de Medida y Actualización"; "200 a 320,000 ..."; doubling sentence | Identical. The doubling sentence is printed as the last sentence of fraction IV (the reiteration fraction), not as a free-standing paragraph | Exact text; placement should be noted (section 3, item 8) |
| 49 | CPEUM Art. 16 para. 2 | Full paragraph | Identical; "Párrafo adicionado DOF 01-06-2009" | Exact |
| 51 | LSE Art. 2 fr. XII | "Actividad estratégica exclusiva del Estado" | Identical | Exact |
| 51 | LSE Art. 123 | "El CENACE es un organismo público descentralizado de la Administración Pública Federal ... que tiene a su cargo el Control Operativo del Sistema Eléctrico Nacional" | Ellipsis covers "con personalidad jurídica y patrimonio propios," | Exact with fair ellipsis |
| 57 | LFT Art. 2 para. 1 | "propiciar el trabajo digno o decente en todas las relaciones laborales, en un entorno libre de violencias y con respeto pleno a los derechos humanos" | Identical; "Párrafo reformado DOF 15-01-2026" | Exact |
| 57 | LFT Art. 3 paras. 2, 3 | "que impliquen discriminación entre los trabajadores por motivo de ... condiciones de salud ... o cualquier otro que atente contra la dignidad humana"; "No se considerarán discriminatorias ..." | Identical with fair ellipses | Exact |
| 57 | LFT Art. 134 fr. X | Full fraction | Identical | Exact |
| 37 | LFT Art. 3 Bis a) | "una relación de subordinación real" | Identical | Exact |
| 59 | LFT Art. 47 fr. VII | "por su imprudencia o descuido inexcusable" | Identical | Exact |
| 61 | LFT Art. 330-I | Two fragments | Identical; the ellipsis after "personas trabajadoras" omits "bajo la modalidad de teletrabajo, y respetando el marco jurídico aplicable en materia de protección de datos personales", which in fact helps the paper's argument | Exact with ellipsis |
| 61 | LFT Art. 291-J | "a través de algoritmos o mecanismos análogos deberán ser transparentes, claras y conocidas"; "política de gestión algorítmica del trabajo"; "El algoritmo deberá ser razonable ... en su contra" | Identical; "Artículo adicionado DOF 24-12-2024" | Exact |
| 65 | C190 Art. 1(1)(a), 9(b) | Spanish fragments | Not compared (DOF page refused fetch) | Unverified by this reviewer |
| 69 | NOM-035 numeral 1 | Objective | Identical | Exact |
| 69 | NOM-035 5.6 | With ellipsis | Identical; ellipsis covers "de los factores de riesgo psicosocial, a que se refiere el numeral 7.1 y 7.2 de esta Norma," | Exact |
| 69 | NOM-035 Guía II/III application instruction 4) | Confidentiality sentence with ellipsis | Identical; ellipsis covers "(ver Guía de referencia V Datos del trabajador)" | Exact |
| 79 | LCNE Art. 2 | "órgano de carácter técnico, sectorizado a la Secretaría de Energía"; "regular, supervisar e imponer sanciones en las Actividades en materia energética" | Identical | Exact |
| 79 | LSE Transitorio Tercero | "Código de Red, y demás disposiciones aplicables vigentes al momento de la publicación de esta Ley y hasta en tanto no se expidan nuevas disposiciones" | Identical. The transitorio's subject is "La operación del Mercado Eléctrico Mayorista", not grid operation generally | Exact text; scope paraphrase slightly wide |
| 35 | INAI Guía 2018 (three quotations) | Not compared | Unverified by this reviewer |

Article numbers: every article number cited for the LFPDPPP, LGPDPPSO, LFT, LSE, LCNE, CPEUM and NOM-035 was found where the paper says it is. No misnumbered article.

Word-absence claims checked: the LFPDPPP contains none of "biométrico", "emocional", "psicológico", "trabajador" (line 35: correct). The LFT contains none of "videovigilancia", "monitoreo" but does contain "inteligencia artificial" (line 55: wrong, see section 4 item 1).

## 3. Legal over-reach findings

1. **Art. 26 fr. II is read as reaching the system when its own elements say otherwise (line 43, DM-21 line 155, line 168).** The fraction requires cumulatively that the automated processing (a) "le produzca efectos jurídicos no deseados o afecte de manera significativa sus intereses, derechos o libertades" and (b) be "destinados a evaluar, sin intervención humana". The paper's design (DM-28: "informs and never actuates or recommends", every use "MUST pass through a human") is built to fail both elements. The sentence "a display that scored an operator's fiabilidad or comportamiento for a supervisor would sit inside the wording" omits both conditions; a supervisor hearing a number is human intervention, and no legal effect is produced. Line 168 repeats the error ("an evaluation of fiabilidad or comportamiento in the words of Article 26 fraction II"). What the text supports: Art. 26-II is a fallback that would bite only if the system were later wired to an automated decision; the objection right actually available to the operator is Art. 26 fr. I (causa legítima, situación específica) and, more simply, revocation of consent under Art. 7 last paragraph ("El consentimiento podrá ser revocado en cualquier momento sin que se le atribuyan efectos retroactivos"), which the paper never cites although DM-19 and DM-21 depend on it. DM-21's "honoured without a reason being asked" is more generous than Art. 26 (which requires "causa legítima") and should be presented as a design choice grounded in revocation, not as compliance with 26-II.

2. **Sensitive-data status of an inferred arousal or load index (lines 15, 35).** The paper correctly labels this the working group's reading by analogy in section 2.1, but the executive summary (line 15) presents the law as if it "treats" such data as sensitive and "requires express written consent for their processing". The law says nothing about inferred physiological indices; what it supports is that raw HRV, EDA and pupil data about an identified person "puedan revelar" state of health (fr. VI) and that the list is open. The analogy is defensible and conservative; the summary should say "on the working group's reading" as section 2.1 does.

3. **Consent-based channel at a public-sector site (line 51, DM-29 line 163).** The LGPDPPSO does permit processing of sensitive data on "consentimiento expreso y por escrito" (Art. 15 para. 4, same wording as the federal law), so a consent-based operator-state channel is not excluded at CENACE. But the paper understates the additional gate: Art. 68 requires an "evaluación de impacto en la protección de datos personales" whenever a sujeto obligado puts a system into operation that involves "tratamiento intensivo o relevante", Art. 69 fr. II deems any processing of sensitive data such a treatment, and Art. 71 requires the evaluation to be presented to the Secretaría "treinta días anteriores a la fecha en que se pretenda poner en operación". DM-29's "the public-sector impact evaluation completed" should read "presented to the Secretaría Anticorrupción y Buen Gobierno at least thirty days before any channel is connected (LGPDPPSO Arts. 68, 69 fr. II, 71)". Also: the LGPDPPSO's definition of sujetos obligados (Art. 3 fr. XXVII: "Cualquier autoridad, entidad, órgano y organismo de los poderes ejecutivo, legislativo y judicial, órganos autónomos, partidos políticos, fideicomisos y fondos públicos") plainly covers CENACE (organismo descentralizado); it does not name "empresas públicas del Estado", so the CFE and PEMEX assertion rests on their being "entidades" of the federal executive, which is the working group's inference and should be flagged as such. The paper's ledger says the LGPDPPSO text was "not read"; this reviewer read it, and the paper can now cite it properly.

4. **GDPR reach of the Dutch supplier (line 91, DM-30 line 164).** Art. 3(1) does apply to processing "in the context of the activities of an establishment of a controller or processor in the Union, regardless of whether the processing takes place in the Union or not", so the premise is right. The over-reach is the conclusion that "Article 9 and Article 35 apply to it" and that "the EU edition's conclusion that employee consent is all but closed ... then governs the Dutch leg in full". If the Dutch company is a processor (the ordinary case for hosting or telemetry), the Art. 9 basis and the Art. 35 assessment are the controller's obligations, and the controller is the Mexican employer, which is outside Art. 3(1) and reached, if at all, only under Art. 3(2), which the paper does not analyse. The employee-consent imbalance argument (Recital 43, Art. 7(4)) concerns the controller-employee relationship; a Dutch processor is nobody's employer here. The EU edition's consent conclusion transfers only if the Dutch company is a controller of Mexican operators' data. DM-30's precaution (no data leaves the site) is sound engineering; its legal justification should be narrowed to "if the supplier is a controller" and add "if processor, Art. 28 contract and Art. 32 security apply to the supplier".

5. **ILO C190 "domestic follow-through" (line 65).** The decree published DOF 15-01-2026 that reformed LFT Arts. 2 and 3 is a general gender-equality package ("DECRETO por el que se reforman ... la Ley General para la Igualdad entre Mujeres y Hombres; ... la Ley General de Acceso de las Mujeres a una Vida Libre de Violencia; ... la Ley Federal del Trabajo ...", Artículo Décimo Cuarto reforming Arts. 2, 3, 56 and adding two paragraphs to Art. 16 on violence against women). Nothing in the decree names Convention 190. Calling it "the domestic follow-through" is the working group's inference; say so or drop it.

6. **Art. 13 and the encargado (line 39).** The paper says Art. 13 (controller must ensure the aviso is respected "por terceros con los que guarde alguna relación jurídica") "is where a Dutch supplier acting as encargado sits". Under Art. 2 fr. XVII a "Tercero" is a person "distinta de la persona titular o del responsable de los datos", and Art. 2 fr. XII defines "Persona encargada" separately; Art. 2 fr. XX likewise excludes the encargado from "transferencia". The encargado is not a tercero in the law's own scheme; its regime is in the 2011 Reglamento (Arts. 49 to 56, applied supletoriamente) and, for an international transfer, Arts. 35 and 36. Re-anchor the sentence.

7. **Reglamento interior de trabajo as the adoption vehicle (DM-31 line 165, lines 41, 210, 228).** The paper builds its Mexican counterpart of the works-council gate on the reglamento interior but admits (ledger) that Arts. 422 to 425 were not read. They matter and they help: Art. 424 fr. I requires the reglamento to be drawn up "por una comisión mixta de representantes de los trabajadores y del patrón", fr. II requires deposit with the Centro Federal de Conciliación y Registro Laboral within eight days of signature, and Art. 425 makes it effective only from deposit. Art. 423 fr. VI (normas para prevenir los riesgos de trabajo) and fr. XI are where a non-alarm display belongs, and fr. VIII ("exámenes médicos, previos o periódicos") is the clause DM-27 must keep the system out of. Cite these; they turn "adoption through the reglamento interior" from a phrase into a procedure with a statutory worker-participation step.

8. **Art. 59 doubling clause (lines 15, 45).** The sentence "En tratándose de infracciones cometidas en el tratamiento de datos sensibles, las sanciones podrán incrementarse hasta por dos veces" is printed as the closing sentence of fraction IV (repeat infractions), not as a separate paragraph. The conventional reading, carried over from Art. 64 of the 2010 law, treats it as a general aggravator, and the paper's "doubled for sensitive data" is that reading. State it as "may be increased up to twofold (Art. 59, closing sentence of fr. IV)" and note "podrán" (discretionary), not "doubled". With the 2026 UMA of 117.31 MXN the 320,000 UMA band tops at 37,539,200 MXN before any increase; the paper may now give this figure with the INEGI source.

9. **"Right to object" in the executive summary (line 15).** "gives a right to object to automated evaluation of performance, reliability or behaviour" drops the two conditions of item 1. Add "without human intervention and with legal or significant effect".

10. **AI Act Art. 2(1) (line 89).** The paraphrase of (a) and (c) matches the Regulation's text as this reviewer knows it; no over-reach. The paper's own flag ("read from knowledge") is adequate.

## 4. Errors, severity-ordered, with fixes

1. **Factual error, high.** Line 55: "the words videovigilancia, monitoreo and inteligencia artificial do not occur in it [12]". The texto vigente cited (reforms to 14-05-2026) contains Art. 305 Bis, added by the decree of DOF 14-05-2026 on performing artists: "En los contratos ... se deberán estipular de manera específica las condiciones y la remuneración correspondiente para la utilización de su imagen o voz a través de sistemas de inteligencia artificial o cualquier otra tecnología." (The phrase is split across a line break in the PDF, which is why a naive search misses it.) Fix: "the words videovigilancia and monitoreo do not occur in it; inteligencia artificial occurs once, in Art. 305 Bis (DOF 14 May 2026), on the contractual use of performers' image and voice, which has no bearing on a control room". Also update line 75 ("what has been enacted is sectoral, the platform-work articles of December 2024 above all") to add the 14 May 2026 LFT/LFDA reform, and upgrade the ledger note on [25] ("copyright reform reported, primary NOT verified") to verified from the LFT texto vigente.

2. **Legal analysis error, high.** Line 43 and line 168: Art. 26-II applied without its "sin intervención humana" and effects conditions (section 3 item 1). Fix as stated there; add Art. 7 last paragraph to reference [10] and to DM-19 and DM-21.

3. **Internal inconsistency in the profile relaxation, high.** Line 21 says N-14 and E-9 "admit one further stream in operator-state mode, heard at the consenting operator's own position". DM-24 (line 158) and section 4.4 (line 230) add a second further stream, the supervisor aggregate, heard at the supervisor's position, not the operator's. Either the relaxation admits two further streams (the personal stream, near-field, and the aggregate) or the aggregate must be dropped. As written, the aggregate stream is not admitted by the profile's own relaxation statement.

4. **Mode exclusivity unresolved, high.** N-1 requires a score to declare "its input mode" (singular) and the paper calls operator-state mode "a fourth declared input mode". But the mode diagram (line 198, `OP --> OS`) and section 4.4 show operator-state mode running on top of operational mode in the same room and the same score. If a score is in operational mode with operator-state channels added, N-3 ("In operational mode a score MUST carry no per-person data other than the crew-level fatigue annotation") is breached, although line 21 says N-3 is not relaxed, and DM-3 has quietly carved out "In operator-state mode the per-operator index exists by nature". State whether operator-state is an exclusive mode (then say what happens to the plant streams and to adversary mode when it is on) or an overlay (then N-1 and N-3 must be relaxed for the overlay and said so at line 21).

5. **Per-person constants in the persistent log, medium.** DM-14 requires "per-operator baseline constants recorded under that operator's consent" and section 4.4 (line 230) has the personal stream "rendered by the fixed functions of Paper 2 with constants declared in the header". E-16 makes the header constants part of the engine's log, and DM-7 and line 230 say operator-state values never enter the persistent log. Baseline constants for a named operator are per-person data. Fix: say the baselines live in the consent register or a separate operator-state store under DM-25 retention, not in the score header, and that the header carries only the function form.

6. **Over-reach on the GDPR leg, medium.** Line 91 and DM-30 (section 3 item 4).

7. **Under-stated public-sector gate, medium.** DM-29 and line 51 (section 3 item 3): add the thirty-day prior filing under LGPDPPSO Art. 71, and cite Arts. 3 fr. XXVII, 15, 68, 69. Update ledger [22] from existence-only.

8. **Mis-citation, medium.** Line 75: "presidential consultation forums running to 17 September 2026 are all pending [25] [26] [21]". [21] is the Constitution; it says nothing about forums. Replace with the source that reported them, or drop the claim.

9. **Unsupported attribution, medium.** Line 65: January 2026 reform as the C190 follow-through (section 3 item 5).

10. **Tercero versus encargado, medium.** Line 39 (section 3 item 6).

11. **D-9 and D-10 contradiction, low.** Line 133 says D-9 and D-10 "have no Mexican counterpart"; DM-19 (line 153) is labelled "replaces D-9" and DM-31 (line 165) "replaces D-10", and line 355 counts "two European invariants are dropped". They are not dropped, they are replaced. Say "D-9 and D-10 are replaced by DM-19 and DM-31" and correct line 355 ("eighteen ... carried across, because they rested on ... not on any statute" is also loose: DM-8 rests on LFT Art. 47 and DM-10 on LFPDPPP Arts. 18 to 20).

12. **Truncated quotation, low.** Line 35, Art. 2 fr. V: add an ellipsis or the second sentence; the identifiability test is what the pseudonymised research set of DM-25 will be judged against.

13. **Transitorio scope, low.** Line 79: LSE Transitorio Tercero governs "La operación del Mercado Eléctrico Mayorista"; say so rather than "operation".

14. **SCJN invalidity now identifiable, low.** Line 79 and [29]: the declaratoria published DOF 26-12-2025 invalidates LCNE Art. 22 fr. III (from the texto vigente's own annex). The paper can say which article rather than "not read".

15. **Transitorios described loosely, low.** Line 33: staff pass to the "Secretaría Anticorrupción y Buen Gobierno y Transparencia para el Pueblo" (Transitorio Quinto); pending access-to-information procedures go to Transparencia para el Pueblo (Noveno) and pending data-protection procedures to the Secretaría (Décimo). "transfer INAI's staff and pending procedures to it" is close enough but could cite Quinto and Décimo.

16. **Reference entry lists articles not used, low.** [12] lists Arts. 51, 291-K, 132 fr. XXXIV and 1002; none is cited in the body. Trim or use.

17. **Notice content, low.** DM-19 requires the simplified notice to name the Secretaría as authority; Art. 16 fr. II requires only Art. 15 fr. I to IV plus the location of the full aviso. Harmless surplus; say "in addition to the content Art. 16 fr. II requires".

18. **DM-8 wording, low.** "no output MAY be adduced in a rescission under Article 47" purports to bind evidence rules; rewrite as "the site MUST NOT adduce any output".

## 5. Requirement audit, including profile-relaxation cross-references

**DM numbering.** DM-1 through DM-32 are present, contiguous, one per bullet (lines 135 to 166). Section 1 (line 13) and section 10 (line 355) both say thirty-two. Mapping to the EU edition checks: DM-1..DM-8 = D-1..D-8; DM-9..DM-18 = D-11..D-20; DM-19 replaces D-9; DM-31 replaces D-10; DM-20 to DM-30 and DM-32 are new. 18 carried + 14 new = 32. The "dropped" language at lines 133 and 355 contradicts the "replaces" labels (item 11 above).

**Traceability.** Every DM that cites a source cites a numbered reference that exists in the ledger. Weak anchors: DM-9 rests on [31] and [32], both UNVERIFIED and both "not read"; DM-29 rests on [22], existence-only (now readable, see above); DM-30 rests on the unverified Art. 3(1) reading.

**Relaxed requirements checked against MPN-2 and MPN-3.**

| Requirement | Exists | What it says (source file) | What the paper says it relaxes | Verdict |
|:---|:---|:---|:---|:---|
| N-1 | Yes, MPN-2 line 322 | "A score MUST declare its input mode (operational, simulation or adversary) in the header and MUST draw only on the channels of section 2 admissible in that mode." | Adds a fourth declared mode, operator-state (MX) | Consistent, but see item 4 (overlay versus exclusive mode) |
| N-2 | Yes, MPN-2 line 323 | "A channel MUST NOT be a biometric of a member of staff, and a channel MUST NOT be an inferred emotion, mood, stress or arousal of a member of staff, in any mode." | Lifts the biometric and inferred-arousal prohibitions for operator-state mode only; emotion, mood, stress stand | Consistent. Note MPN-2 line 46 states the same rule in prose "absolute"; profile MX should acknowledge that it overrides that sentence too |
| N-14 | Yes, MPN-2 line 335 | "not more than three concurrent streams in operational mode or four in simulation and adversary mode, each with a distinct timbre family ..." | Admits one further stream in operator-state mode at the operator's position | Inconsistent with DM-24's supervisor aggregate (item 3). Also silent on timbre family and register: the personal stream and the aggregate must each have a timbre family and register overlapping no other stream's, which N-14 requires and the paper never assigns |
| E-9 | Yes, MPN-3 line 214 | "at most three concurrent streams in operational mode and four in simulation and adversary mode, with timbre family, register, rhythmic figure and pan position fixed per stream at configuration time" | Same as N-14 | Same defect; pan position of the near-field personal stream is not declared |
| E-3 | Yes, MPN-3 line 208 | "In operational mode the engine MUST accept only the channels of Paper 2 section 2 ... and MUST reject any other field at the schema boundary with a hard failure." | Schema boundary admits operator-state channels in that mode, rejects them elsewhere | Consistent |

**Silent reliance on relaxed requirements elsewhere.** N-2 is cited in DM-1 for the three unrelaxed modes only (correct). N-14/E-9's "at most three streams" is relied on at line 210 for operational mode only (correct). E-3 is cited at lines 99, 135, 144 as the boundary, consistent with the per-mode relaxation. The two silent problems are the reverse: requirements said to be unrelaxed that the design breaches (N-3 via the overlay, item 4; E-16 via per-operator header constants, item 5).

**Unrelaxed requirements the paper says stand.** N-3, N-19, N-25, E-5, E-16, E-17, E-21 all exist as described (MPN-2 lines 324, 340, 346; MPN-3 lines 210, 221, 222, 226). N-19 and E-21 are honoured by DM-15 (annotation only). E-17's "no export path" is honoured by DM-8. E-5 is honoured by DM-22.

## 6. Science leak check

Direct claims that the system measures emotion, mood or stress: none. Every occurrence of those words is in a prohibition or a negation (lines 17, 136, 157, 199, 226, 357). Lead time, incident-rate reduction, premium effect: none claimed; each is expressly refused (DM-18, lines 303, 315, 343, 351). Voice or facial inference: never admitted; excluded at lines 17, 112, 135, 156, 199, 226.

Soft leaks to tighten:

- Line 230: "so that the operator can hear their own indices rise as an upset builds" asserts that the arousal index co-varies with a plant upset in time. No source supports it and it edges toward a lead-time claim. Rewrite: "hear their own indices change and judge for themselves".
- Line 325: "the moment an operator's arousal index would be most informative" presumes informativeness that section 5.4 says is unmeasured. Rewrite as "the moment the display would be loudest about the operator".
- Line 17 cites [13] (Barrett et al., facial movements) for "no facial or vocal configuration is reliably diagnostic". Barrett et al. is about faces; the vocal extension is the working group's, as DM-22 (line 156) admits. Move the "vocal" half out of the [13] citation at line 17 and line 226.
- Line 224: "fatigue detection from blink rate, PERCLOS and mouse velocity" cites an existence-only study as established practice; acceptable as literature, but since the paper forbids sensor-derived fatigue (line 234) the phrase invites the reader to expect it. Consider dropping [53] from this list.

## 7. Reference consistency (spot-check against the EU edition)

Compared bibliographic data, verbatim, for: Loeb and Fitch 2002 ([14] vs EU [6]); Watson and Sanderson 2004 ([15] vs [7]); Barrett et al. 2019 ([13] vs [15]); IEC 62682:2022 ([35] vs [28]); Gilfix and Couch 2000 ([43] vs [30]); Gadalla et al. 2026 ([47] vs [33]); FRA final rule 2022 ([59] vs [35]); Kazi et al. 2021 ([56] vs [51]); Loui et al. 2014 ([74] vs [52]); van de Leemput et al. 2014 ([72] vs [49]); Roma et al. 2012 ([57] vs [13]); HSE CHIS6, COMAH case study and 1997 report ([76]-[78] vs [55], [54], [56]); EEMUA 191 ed. 4 ([36] vs [57]); ISO 7731:2003 ([42] vs [44]); Endsley 1995 and 1988 ([63], [64] vs [39], [40]); Hart and Staveland 1988 ([65] vs [41]). All identical in authors, titles, venues, volumes, pages, years, DOIs and URLs. No drift.

Two ledger observations: [22] LGPDPPSO can be upgraded from existence-only (text is on diputados.gob.mx); [25]'s "copyright reform ... primary NOT verified" is now verifiable from the LFT texto vigente (Art. 305 Bis, DOF 14-05-2026).

## 8. Style

- Em dashes: 0. H1 headings: 0. "OXOT": 0.
- Banned words (leverage, utilize, pivotal, testament to, foster, streamline, at its core, beacon, game-changing, harness, furthermore, robust): 0 in English prose. Spanish "utilizada"/"utilizarse" inside statutory quotations are not hits.
- Headings: longest is 68 characters; none at or over 90.
- Citation placement: 79 instances of `word [n].`; 0 instances of `. [n]`.
- Mermaid: 4 blocks, 4 accTitle, 4 accDescr.
- `$` in table cells: none (the only table is the metadata table). Inline `$n$` at line 230 and display math at line 299 are in prose, which the rule permits.
- Minor: line 35 reproduces the law's own "más no limitativa" (the DOF text has that solecism); add "(sic)" or leave, but do not "correct" it.

## 9. Three weakest paragraphs

1. **Line 55** (section 2.3 opening). States as fact that "inteligencia artificial" does not occur in the LFT as reformed to 14 May 2026. It does (Art. 305 Bis, added by that very reform). The paragraph then builds its "no regime for electronic surveillance" conclusion on the absence. The conclusion survives (Art. 305 Bis is about performers' image and voice), but the paragraph as written is falsifiable in one search of the file the paper cites.

2. **Line 43** (Art. 26 fr. II). Quotes the fraction exactly and then applies it without its "sin intervención humana" and effects conditions, concludes the supervisor display "would sit inside the wording", and hangs DM-21's opt-out on it while never citing Art. 7's revocation right, which is the provision that actually does the work. Line 168 repeats the reading.

3. **Line 91** (GDPR reach). Correct on Art. 3(1), then over-extends: assigns Art. 9 and Art. 35 to a Dutch company that will usually be a processor, imports the EU edition's employee-consent conclusion to a company that employs none of the operators, and never mentions Art. 3(2) for the Mexican controller. The precaution (DM-30) is fine; the reasoning would not survive a Dutch data-protection lawyer's first question ("controller or processor?").

## 10. Verdict

**Not ready for working-group review without revision; ready after the fixes in section 4 items 1 to 10.**

The primary-source work behind the paper is largely sound: twenty-three Spanish quotations from seven statutes and one NOM were checked and all are verbatim or fairly elided; every article number is right; the word-absence claim about the LFPDPPP holds; the C190 dates, the LFPDPPP transitorios, the LSE and LCNE readings and the NOM-035 numerals all check. The paper's scientific discipline is intact: no emotion, lead-time, incident-rate or premium claim leaks through, and voice and face stay out.

The defects are in the legal reasoning layered on the correct texts: one flat factual error about the LFT's vocabulary (curable in a sentence, but it is the sentence the section leads with); a mis-application of Art. 26-II that the design's own human-in-the-loop invariant defeats; an over-extended GDPR analysis; an understated public-sector gate (the thirty-day prior filing under LGPDPPSO Art. 71); and an unread reglamento-interior procedure (LFT Arts. 423 to 425) that would strengthen the paper's central Mexican substitute for the works-council gate. Structurally, the profile-relaxation statement in section 1.1 does not admit the supervisor aggregate that DM-24 renders, and the paper has not decided whether operator-state mode is exclusive or an overlay, which determines whether N-3 and E-16 are silently breached.
