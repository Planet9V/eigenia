# Cyber Digital Twin Pilot: Amazon Leo Ground Segment and Space Segment

**To:** Michelle <mark>SURNAME</mark>, Amazon Leo
**From:** Jim McKenney, OXOT
**Date:** <mark>DATE</mark>
**Subject:** Three-month pilot, one gateway and two satellite generations

---

A terminal can be patched. A gateway can be re-architected. A satellite cannot be
recalled.

A defect found in a component after launch is permanent for the service life of the
vehicle, multiplied by every vehicle already carrying it. That asymmetry is the
reason to model Amazon Leo before Gen2 is built rather than after.

There is a precedent in the public record. In August 2022 a researcher at KU Leuven
presented a voltage fault-injection attack against a competitor's user terminal at
Black Hat, using roughly twenty-five dollars of hardware, and obtained root through
the ROM bootloader [1]. The bootloader is burned into silicon. The operator raised
the difficulty of the attack; the flaw itself could not be fixed without new
silicon, so every terminal already manufactured stayed exposed.

Public reporting describes the Prometheus baseband silicon as common to the
satellites, the gateway antennas and the customer terminals [2]. A finding at that
level is not three separate problems. It is one problem present in three places at
once, and one of those places is in orbit.

## What we propose

A three-month pilot across one gateway earth station, one Gen1 satellite and one
Gen2 satellite. Three assets that share a component supply chain and do not share a
regulatory regime, which is why modelling them together produces answers none of
them produces alone.

The platform ingests what your engineers already produce: interface control
documents, system design documents, bills of materials, hazard logs, FMEA and
reliability analyses. It converts them into one queryable graph with provenance
back to the source document, then answers three questions that are slow today.

**Which Gen2 design decisions are still open, and which of them a finding should
change.** Gen2 was authorised in February 2026 and is not yet built [3]. The window
for design influence is open now and will not be in a year.

**Which components carry conformance exposure before they deploy.** The customer
terminals are products placed on the European market. Article 14 reporting under
the EU Cyber Resilience Act has been binding since 11 September 2026, with full
application on 11 December 2027 [4]. A European gateway adds IEC 62443 and the NIS2
regime on top of that.

**When an advisory lands, which vehicles on orbit, which gateway sites and which
terminal models contain the part, and what is reachable from it.** Not a severity
score. A named list, with the path.

## What it costs and what you get

Fixed fee of 275,000 US dollars across three months, paid at signature, at the end
of month two, and on acceptance.

Deliverables are the asset graph with provenance, a conformance gap analysis per
asset with the governing instrument cited, Gen2 design recommendations each
traceable to a named finding in the graph, and a reusable reference model of the
gateway that Amazon keeps.

The platform runs on a dedicated instance inside your own cloud environment, in a
US region, under your perimeter and your logging. Work is performed by a US entity
with US-person personnel under a written technology control plan. The accompanying
compliance annex sets out which artefacts we need and, equally, which ones we are
deliberately not asking for.

## The ask

Ninety minutes with your engineering, security and compliance leads to confirm
scope and data availability. We will bring the data requirements list and the
control plan to that meeting rather than after it.

---

## Notes

[1] L. Wouters, "Glitched on Earth by Humans: A Black-Box Security Evaluation of the
SpaceX Starlink User Terminal," Black Hat USA, 10 August 2022.

[2] Public reporting on the Prometheus baseband SoC and its use across satellites,
gateway antennas and terminals. <mark>VERIFY PRIMARY SOURCE BEFORE SENDING</mark>

[3] FCC grant of the Kuiper second-generation satellite system, 10 February 2026.

[4] Regulation (EU) 2024/2847, Article 71(2). Article 14 applies from 11 September
2026; the Regulation applies in full from 11 December 2027.

---

*OXOT B.V. builds and operates the Cyber Digital Twin platform. The underlying
schema is published openly by Eigenia Labs under CC BY 4.0 and submitted to DEXPI
e.V., the CycloneDX project and IEC TC 57. OXOT is its reference implementation, so
the standard can be audited independently of the vendor implementing it.*
