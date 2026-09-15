# Cyber Digital Twin Pilot Project Proposal

**Prepared for** Michelle Piscula, Amazon Leo
**Prepared by** OXOT
14 September 2026

---

## The problem

Modern industrial infrastructure operates across complex, risk-indexed regulatory
environments, where compliance complexity in each jurisdiction dictates the scope of
sovereign risk management. Fragmented standards and disconnected supply chain data
prevent authoritative tracking of asset composition and vulnerabilities across
international shipping corridors.

That friction has two faces, and they compound each other.

**The record is fragmented.** Design drawings describe the physical plant. Bills of
materials describe what was bought. Interface specifications describe how subsystems
connect. Hazard logs describe what can go wrong. Each is correct, each is maintained
by a different team, and none can answer a question that crosses two of them.

**The obligations are not uniform.** The same component acquires different duties
depending on where it originated and where it is deployed. Each jurisdiction indexes
risk differently and demands evidence in a different form. Whoever places the finished
asset on a market inherits the obligations of everything inside it, so a supplier's
missing evidence becomes your gap.

Put together, straightforward questions take weeks. Which components are in this
configuration. Which carry a known issue. Which regulation applies to which part, in
which market. Whether the asset we built matches the one we designed. And the
difficulty scales with the fleet rather than staying fixed.

A dedicated memo on Cyber Resilience Act conformity and the supply corridor analysis
accompanies this proposal.

## The value

The pilot delivers four things Amazon can use immediately.

**One authoritative model.** A single view of the asset in which physical,
electrical and computational elements are connected, and every element traces back
to the document it came from. Questions that currently require assembling several
teams become queries.

**Compliance answered from evidence.** Regulatory obligations, including the EU
Cyber Resilience Act, assessed against the actual configuration rather than against
a questionnaire. Where a gap exists, it is identified with the provision that
creates it.

**Vulnerability effort spent where it matters.** Bills of materials correlated
against vulnerability data automatically, so that the small number of issues that
genuinely apply are separated from the large number that do not before anyone
spends engineering hours on them.

**Design decisions informed earlier.** Findings from the model expressed as
recommendations while a design is still open, which is when a change is cheap.

**Consequence understood, not just inventory.** The platform runs consequence-driven
propagation simulations across the model, so the effect of a problem in one component
on the rest of the asset is established rather than estimated.

**A jurisdictional view of the supply corridor.** Component origin and deployment
destination held as properties of the model, so the obligations attaching to each part
in each market are visible alongside the part itself.

The platform's wider capability set is available to the pilot rather than held back:
threat actor capability matching, quantified hazard analysis, security level
derivation, actuarial loss modelling and Monte Carlo simulation over the asset graph.
We scope the pilot to what produces value in three months, and nothing in the platform
is withheld from it.

## The method

Three months, in three stages.

**Stage one, build the model.** We ingest the documentation you already have and
convert it into the unified model. Nothing new has to be authored. We also record,
with your teams, how long the current process takes for a defined set of questions,
so that improvement can be demonstrated rather than asserted.

**Stage two, assess.** IEC 62443 is our standard engineering process, and we run it
here. Security level targets are derived from consequence, using the hazard analysis
and safety integrity level the asset already carries, rather than assigned by
category. Where a target cannot be met, the deviation is justified quantitatively
rather than waived.

That process produces a requirements allocation with acceptance criteria attached,
which is the same artefact a conformity assessment needs. One body of engineering
work, two outputs: an asset secure by design under a recognised industrial standard,
and the evidence a regulator or notified body asks for. The alternative is running two
programmes, which most organisations discover only when the second audit arrives.

Compliance checks run across the assets in scope, and vulnerability data is correlated
against the bills of materials. Output is a gap analysis per asset.

**Stage three, apply.** We simulate how a problem propagates through the model,
produce design recommendations, complete the supply corridor analysis, and re-measure
the same questions from stage one. The engagement closes with an on-site readout.

## Scope

One gateway earth station, one Gen1 satellite and one Gen2 satellite.

Three assets rather than three of the same kind, because they share a supply chain
and sit under different regulatory regimes. That combination is what makes the
model useful beyond any single asset, and it is what lets the approach scale across
a fleet afterwards.

## What you receive

1. The unified asset model, with provenance to source documents.
2. A compliance gap analysis for each of the three assets.
3. Design recommendations, each traceable to a specific finding.
4. A reusable reference model of the gateway, which Amazon keeps.
5. A supply corridor analysis covering regulatory friction between where components
   originate and where they are deployed.
6. Before-and-after measurement against the agreed measures below.
7. An on-site readout.

## How success is measured

Five measures, each with a starting point captured in stage one and re-measured at
the readout, using the same method both times.

| Measure | How it is established |
|---|---|
| Compliance audit time | Your team answers a fixed set of questions, timed, at the start and again at the end |
| Vulnerability remediation cycle time | Time from an advisory to a defensible list of affected components |
| Engineering redesign and rework cost | Your own cost figures, applied to findings actually acted on |
| Hardware compliant before deployment | Proportion of in-scope components with complete evidence |
| Lifecycle configuration accuracy | Sampled comparison of the model against as-built reality |

The current-state figures and internal cost rates come from Amazon. We would rather
work from your numbers than present ours, because yours are the ones that carry
weight internally afterwards.

## Deployment

The platform runs on a secure dedicated instance within Amazon's own cloud, with
access to GPU capacity for the inference models. Your data and the models stay
inside your environment.

## Governance

A named point of contact on each side per asset. Workshops with engineering,
operations, security, compliance and procurement at the start, middle and end.
Readout sessions validate deliverables, confirm roles, set the communication cadence
and record sign-off against the list above.

A thirty-day alignment period before kickoff covers project management,
communications, documentation access and infrastructure setup, so that month one is
engineering rather than administration.

## Investment

Fixed fee of 275,000 US dollars for the three-month engagement, including the
alignment period and travel for the on-site sessions.

Payment at signature, at the end of month two, and on acceptance of the readout.
Work outside the agreed scope proceeds only by written change order.

## About OXOT

OXOT builds and operates the Cyber Digital Twin platform. Its development was funded
under **CIF-NL 2025**, the Dutch government innovation grant administered by RVO, the
Netherlands Enterprise Agency, where the platform received the maximum award available
under the scheme as one of thirteen projects selected from ninety-five applications.

The underlying data model is published openly by Eigenia Labs and submitted to the
relevant standards bodies, so your engineers can evaluate the standard independently
of the company implementing it. Supporting documentation on the model and the
standards it uses is available on request.
