# Data and Access Requirements

**Cyber Digital Twin Pilot, Amazon Leo**
Companion to the pilot proposal
<mark>DATE</mark>

---

## How to read this document

Three columns matter: what we need, when we need it, and what happens if it does
not arrive. The last column is the honest one. A pilot that quietly proceeds
without an input produces a deliverable that quietly does not work.

Everything here is scoped to the minimum that produces the deliverable. Section 5
lists what we are **not** asking for, and that list is as deliberate as this one.

---

## 1. Gateway earth station

| Artefact | Needed by | If it does not arrive |
|---|---|---|
| Single-line diagram or electrical schedule for the site | Week 1 | The electrical leg of the graph is empty. Reach analysis still works across physical and software boundaries, but power-path dependencies are invisible |
| Equipment list with make, model, firmware version | Week 1 | No conformance determination is possible for site hardware. This is the single most load-bearing input in the pilot |
| Network architecture diagram, including the boundary to the terrestrial link | Week 2 | Reachability from an untrusted interface cannot be computed, which disables the falsification rules that discharge most advisories |
| Antenna and RF subsystem specification | Week 2 | Gateway-to-space interface is modelled as a boundary rather than a path |
| Hazard log or equivalent safety analysis | Week 3 | Security level targets must be assigned rather than derived. Derivation is the defensible version |
| Control system documentation: PLC, SCADA, BMS as applicable | Week 3 | Physical actuation paths are incomplete, so kinetic decoupling cannot be asserted |
| Site jurisdiction and operator entity | Week 1 | The regulatory determination in the gap analysis cannot be completed |

## 2. Gen1 satellite

| Artefact | Needed by | If it does not arrive |
|---|---|---|
| Component bill of materials to the level Amazon maintains it | Week 3 | No advisory correlation is possible for the space segment. The pilot's central question cannot be asked |
| Interface control documents, subsystem to subsystem | Week 4 | Subsystem boundaries are inferred rather than declared, and the specification forbids inferring a missing relation |
| Firmware and software inventory with versions | Week 4 | Software reach is limited to what the bill of materials happens to name |
| As-built configuration baseline, and its variance from design | Week 5 | Configuration accuracy cannot be measured, which removes one of the five success metrics |
| Reliability analysis or FMEA | Week 5 | Consequence coupling is not available for the space segment |

## 3. Gen2 satellite

| Artefact | Needed by | If it does not arrive |
|---|---|---|
| Current design baseline, at whatever maturity exists | Week 3 | No design recommendations can be produced, which removes the pilot's lead use case |
| Which design decisions remain open, and the date each closes | Week 3 | Recommendations cannot be prioritised against the decisions they could still influence. This is a short conversation and a high-value one |
| Delta from Gen1, at subsystem level | Week 4 | Inherited findings cannot be separated from new ones |
| Supplier list for changed subsystems | Week 5 | Supply corridor analysis is limited to Gen1 |

## 4. Access, people and environment

| Requirement | Needed by | Note |
|---|---|---|
| Dedicated instance, US region, inside Amazon's account and perimeter | Pre-kickoff | GPU access for the inference models. Region must be named before the technology control plan can be finalised |
| Engineering point of contact per asset | Pre-kickoff | One named person per asset, not a distribution list |
| Workshop access: engineering, operations, security, compliance, procurement | Weeks 1, 5, 9 | Roughly three hours each. Procurement is included because supply corridor analysis needs their view of origin |
| Trade-compliance counterpart | Pre-kickoff | Named individual, for the review described in the compliance annex |
| Current-state timings for the ten conformance questions | Week 1 | Captured live in the month-one workshop. Cannot be reconstructed afterwards |
| Internal cost rates for engineering change at current and post-build maturity | Week 6 | Amazon's own figures. We will not assert them on your behalf |
| Read access to advisory feeds Amazon already subscribes to | Week 6 | Only if Amazon prefers its own feed over public sources |

---

## 5. What we are not asking for

This list exists because the fastest way through a trade-compliance review is to
need less.

- **No spacecraft design data beyond the component and interface level.** We do not
  need detailed design drawings, analysis models, manufacturing process
  specifications, or performance data that would characterise the vehicle's
  capability.
- **No orbital parameters, ephemerides or manoeuvre planning.**
- **No cryptographic key material, and no key-management procedures.** The
  cryptography bill of materials records which algorithms and which certificate
  authorities are in use. It does not need, and we will not request, the keys or
  the procedures that protect them.
- **No launch vehicle integration data.**
- **No telemetry, tracking and command protocol specifications.** Command paths are
  modelled as a boundary. The pilot does not need to know what crosses it.
- **No customer or subscriber data of any kind.**
- **No source code.** The software inventory is a list of components and versions.
- **No personnel records.** The technology control plan names roles and
  nationalities on our side only.

If a deliverable in the proposal appears to require something on this list, that is
a scoping error on our part and we would rather find it in the pre-kickoff review
than in month two.

---

## 6. Classification and handling

Every artefact above is handled at the classification Amazon assigns it. Where
Amazon judges an artefact too sensitive to transfer, three alternatives are
available and all three preserve the deliverable:

1. **Structure without values.** A bill of materials with part identities and
   without performance parameters supports advisory correlation completely.
2. **Amazon-side extraction.** Amazon's engineers run the ingestion against the
   source document; only the resulting graph elements cross.
3. **Amazon-operated session.** Our engineers guide, an Amazon engineer drives, and
   nothing leaves the instance.

Option 1 covers most of this list without loss. We raise this now because the usual
failure is a binary choice between full access and no pilot, and it is not a binary.

---

## 7. Single-page summary for the kickoff meeting

Three things decide whether month one is productive:

1. **The gateway equipment list**, with make, model and firmware version.
2. **Which Gen2 design decisions are still open, and when each one closes.**
3. **A named trade-compliance counterpart**, before kickoff rather than after.

Everything else can be sequenced. These three cannot.
