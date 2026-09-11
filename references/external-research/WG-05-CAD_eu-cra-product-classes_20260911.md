# EU Cyber Resilience Act: product classes, conformity routes, and application dates

External research; found via valyu and verified against the authentic Official
Journal text, not the working group's own analysis.

**Supports:** `references/WG-05-CAD-DEXPI-2/WG-05-CAD-Supply-Chain-EU-CRA.md`
section 1 (regulatory architecture, product classification, penalty tiers).

**Retrieved:** 2026-09-11

**Queries run**

- `Cyber Resilience Act Annex III important products Class I Class II Annex IV critical products` (valyu, web)
- Follow-up verification against the authentic OJ XHTML. The EUR-Lex web UI
  blocks automated fetches; the authentic text is retrievable from
  `publications.europa.eu/resource/celex/…`.

## Primary sources

| Source | Identifier | URL |
|---|---|---|
| Cyber Resilience Act | Regulation (EU) 2024/2847 | https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng |
| Technical descriptions of the Annex III and Annex IV categories | Commission Implementing Regulation (EU) 2025/2392, adopted 28 November 2025 under Art. 7(4), in force 21 December 2025 | https://eur-lex.europa.eu/eli/reg_impl/2025/2392/oj/eng |
| Commission guidance on conformity assessment | European Commission, Digital Strategy | https://digital-strategy.ec.europa.eu/en/policies/cra-conformity-assessment |
| Commission CRA policy page | European Commission, Digital Strategy | https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act |

## What the Regulation actually establishes

The Regulation does not use the phrase "risk tier". Article 7 creates
**important products with digital elements**, subdivided into **class I** and
**class II**. Article 8 creates **critical products with digital elements**.
Products in neither category are a residual the Regulation does not name; the
Commission calls it "the default category of products". Article 6 is
"Requirements for products with digital elements" and does not classify.

So there are three named designations and **four distinct conformity routes**,
because important splits in two.

### Which annex holds which

**Annex III lists important products and contains both class I and class II.
Annex IV lists critical products.** Article 7(1): "the core functionality of a
product category set out in Annex III shall be considered to be important".
Article 8(1) refers to "a product category that is set out in Annex IV".

Annex I holds the essential requirements, in two parts: Part I product
properties, Part II vulnerability handling processes. Annex VIII holds the
conformity assessment procedures: Part I module A, Part II module B, Part III
module C, Part IV module H.

IR 2025/2392 Article 2 places the technical descriptions of Annex III classes I
and II in its own Annex I, and those of Annex IV in its own Annex II.

### Category counts: 26 named categories

| Designation | Annex | Named categories |
|---|---|---|
| Important, class I | III | 19 |
| Important, class II | III | 4 |
| Critical | IV | 3 |

**Annex III class II, all four:** hypervisors and container runtime systems
supporting virtualised execution of operating systems; firewalls, intrusion
detection and prevention systems; tamper-resistant microprocessors;
tamper-resistant microcontrollers.

**Annex IV, all three:** hardware devices with security boxes; smart meter
gateways within smart metering systems and other devices for advanced security
purposes, including for secure cryptoprocessing; smartcards or similar devices,
including secure elements.

IR 2025/2392 Annex II item 1, "Hardware Devices with Security Boxes", expressly
states the category includes "physical payment terminals, hardware security
modules that generate and manage cryptographic elements, and tachographs". So
**HSMs are Annex IV critical, not Annex III class II.**

Neither the Regulation nor IR 2025/2392 contains the strings "programmable
logic", "PLC", or "industrial automation". A programmable logic controller is in
scope of the CRA but sits in the default category unless its core functionality
matches a listed Annex III category. Classification follows core functionality,
not an incidental feature (Art. 7(1)).

Annex III class I item 14 is "microcontrollers with security-related
functionalities"; the qualifier is security-related functionality, not
"industrial". "Baseboards" appears in neither annex.

### Conformity routes, Article 32

| Designation | Article | Routes |
|---|---|---|
| Default | 32(1) | Free choice of four: (a) module A internal control; (b) module B + C; (c) module H; (d) where available and applicable, a European cybersecurity certification scheme per Art. 27(9). Module A is available irrespective of the technical specification used |
| Important, class I | 32(2) | Module A remains available **only** where harmonised standards, common specifications, **or** a European cybersecurity certification scheme at assurance level at least 'substantial' have been applied **in full**. Where they are not applied, applied only in part, or do not exist: (a) B+C or (b) H |
| Important, class II | 32(3) | (a) B+C; (b) H; (c) a European cybersecurity certification scheme at least 'substantial'. No module A |
| Critical | 32(4) | (a) a European cybersecurity certification scheme in accordance with Art. 8(1); (b) where the Art. 8(1) conditions are not met, any Art. 32(3) procedure |

Article 8(1) lets the Commission adopt delegated acts *requiring* an Annex IV
product to hold a certificate at least 'substantial'. "Where no delegated acts
have been adopted", Annex IV products fall under Art. 32(3). **No such delegated
act has been adopted**, and no scheme is yet recognised as conferring a CRA
presumption of conformity, so Annex IV currently falls back to the notified-body
routes. That is a temporary state, not the statutory rule.

Article 32(5): manufacturers of free and open-source software qualifying as
Annex III products may use the Art. 32(1) procedures where the technical
documentation is made public.

Annex VIII Part I is "Conformity assessment procedure based on **internal
control** (based on module A)". "Internal **production** control" is Part III,
**module C**, "Conformity to type based on internal production control". The two
labels are not interchangeable.

### Application dates, Article 71(2)

Verbatim: "This Regulation shall apply from **11 December 2027**. However,
Article 14 shall apply from **11 September 2026** and Chapter IV (Articles 35 to
51) shall apply from **11 June 2026**."

Adopted at Strasbourg 23 October 2024. Published in the Official Journal
20 November 2024. **Entered into force 10 December 2024**, the twentieth day
after publication.

11 June 2026 is when Chapter IV applies, opening the notification machinery for
Member States. It is not a designation event, and as of 9 August 2026 the NANDO
database listed no CRA notified bodies.

Article 14 cadence: 24-hour early warning, 72-hour notification, then a final
report within 14 days for an actively exploited vulnerability or one month for a
severe incident.

Related transitional provisions: Art. 69(1), legacy type-examination
certificates valid until 11 June 2028; Art. 69(3), Article 14 reaches products
placed on the market before 11 December 2027.

### Bills of materials

The Regulation mandates a **software** bill of materials only: Art. 3
definition, Annex I Part II point 1 ("in a commonly used and machine-readable
format covering at the very least the top-level dependencies"), and Annex VII.

**The strings "hardware bill of materials" and "HBOM" do not appear in the
Regulation.** Annex VII point 8 makes the SBOM producible "further to a reasoned
request from a market surveillance authority", not to a notified body.

### Penalties, Article 64

| Paragraph | Subject | Ceiling |
|---|---|---|
| 64(2) | Annex I essential requirements and the obligations in Articles 13 and 14 | EUR 15,000,000 or 2.5 % of worldwide annual turnover, whichever is higher |
| 64(3) | Other obligations under the Regulation | EUR 10,000,000 or 2 % |
| 64(4) | Supply of incorrect, incomplete or misleading information to notified bodies or market surveillance authorities | EUR 5,000,000 or 1 % |
| 64(5) | Aggravating and mitigating factors, not a fine tier | n/a |

### Support period

Article 13(8): "the support period shall be at least five years. Where the
product with digital elements is expected to be in use for less than five years,
the support period shall correspond to the expected use time."

### Scope exclusions, Article 2

Medical devices under MDR/IVDR, civil aviation, motor vehicles under the
type-approval regime, marine equipment, products developed exclusively for
national security or defence, spare parts made to the same specifications as the
components they replace, and non-commercial open-source software. Open-source
stewards carry a lighter tailored set of obligations.

## Secondary sources found to be wrong, recorded so they are not re-used

Several widely-indexed sources get the Annex III and Annex IV split wrong. They
were checked against the OJ text and rejected.

| Source | Claim | Why it is wrong |
|---|---|---|
| securebydesignhandbook.com | IR 2025/2392 has three annexes; class II has 6 categories including "industrial automation and control systems"; 28 categories total | The authentic IR has two annexes, class II has four, and the string "industrial" does not occur in it. Also legally impossible: Art. 7(4) empowers technical descriptions only; adding a category needs a delegated act under Art. 7(3) |
| sota.io | Classification is Article 6; "CRA applies to most product categories from 13 September 2026" | Classification is Articles 7 and 8. Article 6 is the requirements article. 13 September 2026 is not a CRA date |
| tributech.io | "Default (Class I), Important (Class II)" | Conflates the designation with the class. Default has no class; class I and class II are both subdivisions of important |
| SGS, Taylor Wessing | Entry into force 11 December 2024 | 20 November plus 20 days is 10 December 2024 |

## Practical caveats, true as of September 2026

- **No CRA harmonised standard reference has been published in the Official
  Journal.** The Article 27 presumption of conformity, and with it the module A
  escape for class I, is therefore not practically available for any product
  category, even though it is legally described.
- No Article 8(1) delegated act exists, so Annex IV falls back to Art. 32(3).
- NANDO listed no CRA notified bodies as of 9 August 2026.
