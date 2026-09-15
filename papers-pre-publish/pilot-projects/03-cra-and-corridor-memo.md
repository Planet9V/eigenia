# Cyber Resilience Act Conformity and Supply Corridor Analysis

**Supporting memo, Cyber Digital Twin Pilot**
**Prepared for** Michelle Piscula, Amazon Leo
**Prepared by** OXOT

---

## Why this is the centre of the proposal, not an annex to it

Compliance complexity in each jurisdiction dictates the scope of sovereign risk
management. That is not a security observation, it is a market access one. A product
that cannot demonstrate conformity cannot be placed on the market, and a component
whose origin cannot be evidenced cannot be relied on to carry conformity through to
the finished asset.

The Cyber Resilience Act is the clearest current example, because it converts
cybersecurity from a matter of internal policy into a condition of sale with a fixed
calendar. It is not the only such regime, and that is precisely the problem this memo
addresses: the same component crossing the same corridor acquires different
obligations depending on where it originated and where it comes to rest.

## What the Cyber Resilience Act requires

Regulation (EU) 2024/2847 applies to products with digital elements placed on the
European Union market. Its obligations fall on the economic operators: manufacturers
first, then importers and distributors.

**The calendar is already running.** Chapter IV applied from 11 June 2026. The
Article 14 reporting obligations became binding on 11 September 2026. The Regulation
applies in full from 11 December 2027. These are application dates, not
consultation dates.

**The essential requirements sit in Annex I, in two parts.** Part I concerns the
properties the product must have. Part II concerns the vulnerability handling
processes the manufacturer must operate across the support period, which Article 13(8)
sets at a minimum of five years unless the product's expected use is shorter.

**Classification determines the route, and the route determines the cost.** Products
not listed in Annex III or Annex IV may self-assess through internal control.
Products listed as important, in either class, face a narrower set of options, and
for one of those classes internal control is not available at all. Products listed as
critical in Annex IV are narrower still. Getting the classification right early is
the difference between an internal process and a notified body engagement.

**The technical documentation is the deliverable.** Annex VII sets out what must
exist and be retained, including a machine-readable software bill of materials
covering at minimum the top-level dependencies, producible on a reasoned request from
a market surveillance authority.

**The penalty is scaled to the company, not the product.** Infringement of the Annex I
essential requirements or of the Article 13 and 14 obligations carries administrative
fines of up to 15 million euro or 2.5 percent of worldwide annual turnover, whichever
is higher, under Article 64(2).

## IEC 62443 as the engineering process that produces the evidence

We do not treat conformity as a documentation exercise run alongside engineering. We
run IEC 62443 as the standard process, and conformity evidence is a by-product of
doing that properly.

The mechanism is straightforward. Security level targets are derived from
consequence, using the hazard analysis and the safety integrity level the asset
already carries, rather than assigned by asset category. That derivation produces a
defensible requirement per zone and per conduit. Where a target cannot be met, the
deviation is justified quantitatively against a disproportionate cost test rather
than waived.

The output of that process is a requirements allocation with acceptance criteria
attached, and that is the same artefact a conformity assessment needs. One body of
engineering work, two outputs: an asset that is secure by design under a recognised
industrial standard, and the evidence that a regulator or a notified body asks for.

This matters commercially because the alternative is running two programmes. Most
organisations discover the duplication only when the second audit arrives.

## The supply corridor problem

A bill of materials tells you what is in an asset. It does not tell you what
obligations came with each part, and that is where the friction sits.

Consider a single component travelling from its point of manufacture, through one or
more integration steps in other jurisdictions, into a finished asset deployed
somewhere else again. Four things vary along that path:

**Regulatory index.** Each jurisdiction rates the same class of risk differently, and
sets its own thresholds for what must be assessed, by whom, and how often.

**Obligation transfer.** Whoever places the finished product on a market inherits
obligations for everything inside it. A supplier's conformity does not automatically
become yours, and the absence of a supplier's evidence becomes your gap.

**Evidence sufficiency.** Documentation adequate in one regime is frequently
insufficient in another, not because the engineering differs but because the required
form of the evidence does.

**Origin sensitivity.** Where a part or its intellectual property originates can
determine what may be transferred, to whom, and under what conditions, independently
of any cybersecurity requirement.

The result is that two identical assets, built from the same parts and deployed in
different markets, carry materially different conformity positions. That difference is
invisible in a bill of materials and visible in a model that records origin,
deployment and obligation as properties of the same component.

## What the corridor analysis delivers

For the assets in scope, the pilot produces:

- Component origin and deployment destination recorded as part of the asset model,
  not as a separate spreadsheet
- The obligations attaching to each component in each relevant jurisdiction
- The points along the corridor where obligations change or transfer
- Gaps where supplier evidence is insufficient for the destination market, identified
  with the provision that creates the gap
- The conformity route determination per component, with the basis stated

For the European example we would use Ireland, where published gateway infrastructure
already exists and the regulatory position is concrete rather than illustrative.

## Why doing this during the pilot is cheaper than doing it later

Conformity work is inexpensive while a design is open and expensive once a fleet
exists. A classification error found during design changes a requirement. The same
error found after deployment changes a product already on the market, across every
unit built to that configuration, in every jurisdiction it reached.

The pilot's value in this area is not that it produces a compliance report. It is
that it produces the conformity position as a property of the engineering model, so
that it stays current as the design changes and as the regulatory environment does.

---

*References are to Regulation (EU) 2024/2847 and to Commission Implementing
Regulation (EU) 2025/2392, which sets out the technical descriptions of the Annex III
and Annex IV product categories. Detailed provision-level citations are available on
request.*
