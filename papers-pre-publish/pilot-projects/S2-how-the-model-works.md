# How the Model Works

**Supporting document, Cyber Digital Twin Pilot**

---

## The idea

An asset is described by several engineering disciplines, each with its own
established way of recording things. Process and plant engineering has one. Software
and component supply chain has another. Electrical network topology has a third. All
three are mature, widely used, and none of them was designed to reference the others.

The usual response is to merge everything into one new database, which means
maintaining a copy that immediately starts drifting from the originals and which
breaks any signature or approval attached to the source files.

We do the opposite. Each document stays exactly as it is, in its own format, under
its own owner. We add a single shared reference to the objects that describe the same
physical thing, using the extension mechanism each standard already provides for
exactly this purpose. Nothing is rewritten and nothing is replaced.

The result is that the existing documents become queryable together, while remaining
the authoritative record individually.

## What that makes possible

Once the same asset can be recognised across the three descriptions, a set of
questions that currently require several teams becomes a single query:

- Which components are in this configuration, and where did that answer come from
- Which of them are affected by a newly published issue
- What else is connected to a given component, physically, electrically or in software
- Which regulation applies to which part, in which market
- Where the built asset differs from the designed one

Every answer carries provenance back to the document that produced it, so a result
can be checked rather than trusted.

## The standards involved

The model uses established open standards rather than a proprietary format:
DEXPI 2.0 for physical process and plant topology, CycloneDX for component bills of
materials, and IEC 61970 Common Information Model for electrical topology. The
identifier that links them is a standard UUID.

The specification describing how these are joined is published openly by Eigenia Labs
and has been submitted to the relevant standards bodies. Your engineers can read and
evaluate it independently of OXOT, which is the point: the data model is not a
vendor secret, so the work done during the pilot remains meaningful regardless of who
maintains the platform afterwards.

## IEC 62443 as the engineering process

The model is the record. IEC 62443 is how we work against it, and it is our standard
process rather than an option.

Security level targets are derived from consequence, using the hazard analysis and
safety integrity level the asset already carries, rather than assigned by asset
category. Zones and conduits are established from the model's own topology rather than
drawn by hand. Where a target cannot be met, the deviation is justified against a
quantified cost test rather than waived.

The reason this matters beyond good practice is that the artefact it produces, a
requirements allocation with acceptance criteria attached, is the same artefact a
conformity assessment requires. The engineering work and the compliance evidence stop
being two programmes.

## Compliance and vulnerability handling

Compliance obligations are assessed against the model rather than against a
questionnaire. Because the model knows what a component actually is and how it is
connected, a requirement can be checked against the configuration, and a gap can be
reported alongside the provision that creates it.

Vulnerability data is correlated against the bills of materials automatically. Most
published issues do not apply to a given asset, and the model can often establish
that without human effort, by showing that the affected function is not reachable,
not connected to anything that acts physically, or disabled in the configuration
being used. What reaches an engineer is the remainder.

## Scaling

Individual asset models integrate into a wider view across a site, a programme and a
supply chain. The effort is highest for the first asset and falls sharply for
subsequent ones of the same type, because the structure and much of the component
library is reused. That is what makes the approach practical across a fleet rather
than only for a showcase.
