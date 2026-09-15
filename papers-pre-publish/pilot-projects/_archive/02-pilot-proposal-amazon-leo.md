# Cyber Digital Twin Pilot Proposal

**Amazon Leo: one gateway earth station, one Gen1 satellite, one Gen2 satellite**

Prepared for Michelle <mark>SURNAME</mark>, Amazon Leo
Prepared by OXOT
<mark>DATE</mark>

---

## 1. The problem this pilot addresses

Three asset classes in the Amazon Leo programme carry the same components and obey
different rules.

A customer terminal is a product placed on a market, so it inherits product
regulation. A gateway earth station is industrial infrastructure, so it inherits
IEC 62443 and, in Europe, the NIS2 regime. A satellite is neither, and it has a
property the other two do not: once it is on orbit, its hardware is final.

That last point is the one that carries the money. A terminal can be patched. A
gateway can be re-architected during a maintenance window. A satellite cannot be
recalled, so a defect found after launch is permanent for the service life of the
vehicle, multiplied by every vehicle already carrying it.

The public record contains the precedent. In August 2022 Lennert Wouters of KU
Leuven presented a black-box evaluation of a competitor's user terminal at Black
Hat USA. Using roughly twenty-five dollars of custom hardware, a voltage
fault-injection attack against the ROM bootloader produced arbitrary code execution
and root access [1]. Because the bootloader is burned into the system-on-chip, the
operator could raise the difficulty of the attack but could not remove the flaw
without new silicon. Every terminal already manufactured remained exposed.

Public reporting describes Amazon's custom Prometheus baseband silicon as common to
the satellites, the gateway antennas and the customer terminals [2]. If that holds,
a finding at silicon level is not three problems in three programmes. It is one
problem instantiated in three places, one of which is unreachable.

Nothing in that argument requires a novel threat. It requires only the ability to
ask, quickly and with evidence, which vehicles and which sites contain a given
part. That question is the pilot.

## 2. Scope

| Asset | What it exercises |
|---|---|
| One gateway earth station | Industrial control and facility topology, IEC 62443 security levels, and, if the site is in the European Union, the NIS2 regime |
| One Gen1 satellite | An as-built vehicle already flying, where the value is knowing what is on orbit and what cannot be changed |
| One Gen2 satellite | A design still open. Gen2 was authorised on 10 February 2026 and is not yet built [3] |

The three are chosen because they share a supply chain and diverge on regulation.
Modelling one of them produces a report. Modelling all three produces the cross-
boundary answers that neither a product-security review nor a facility assessment
can give on its own.

The gateway is treated generically in this proposal. If Amazon nominates a specific
site, the jurisdictional analysis in section 6 becomes concrete rather than
illustrative, and the European example we would use is Cork, Ireland, where the
gateway at the National Space Centre is licensed by ComReg for 18 and 28 GHz and
was announced publicly in October 2025 [4].

## 3. Method

### 3.1 One schema across three engineering languages

Physical plant topology, component supply chain and electrical network are
described today in three standards that do not share an identifier. The published
specification behind this platform joins them without merging them:

- **DEXPI 2.0** and ISO 15926-4 for physical process and plant topology
- **CycloneDX 1.6** and ECMA-424 for the component bill of materials
- **IEC 61970 CIM**, the Common Information Model, for electrical network topology

The join is an RFC 9562 UUID asset reference carried inside each standard's own
sanctioned extension point, so no native file is modified and vendor signatures
survive. The relation vocabulary is deliberately closed at five relations. The
specification numbers its requirements so that a conformance rule can be written
against each one individually, and it publishes a conformance suite with test
vectors and an explicit statement of which requirements a machine can decide and
which need human review.

Source, for independent audit rather than as a marketing claim:
`references/WG-05-CAD-DEXPI-2/WG-05-CAD-Three-Identity-Join.md` sections 1 and 4;
the CIM profile at `WG-05-CAD-CIM-Profile-Cyber-Physical.md`; the conformance suite
at `WG-05-CAD-Conformance-Reference-Implementation.md` section 3.

### 3.2 Who built what, and why that matters to you

The schema is published by **Eigenia Labs** under CC BY 4.0 and has been submitted
to DEXPI e.V., the CycloneDX project and IEC TC 57. Eigenia's papers state plainly
that they are specifications rather than software.

**OXOT is the reference implementation.** That division is deliberate and it is the
answer to the question a buyer should ask: if the schema is the vendor's secret,
the vendor owns your data model forever. Here the specification is open and
auditable by your own engineers, independently of the company implementing it, and
if OXOT were to disappear the schema would not.

### 3.3 What the platform ingests

What your engineers already produce, with no new document types required:
interface control documents, system design documents, high and low level design
documents, product specifications, bills of materials across hardware, software,
cryptography, manufacturing and operations, concepts of operation, hazard logs,
FMEA and reliability analyses, and minimum operating requirements.

Every ingested element retains provenance to the source document and page, so any
answer the graph gives can be traced back to the artefact it came from. An
assertion without provenance is not loaded.

## 4. The three use cases

### 4.1 Design influence on Gen2, while it is still designable

Gen2 is authorised and unbuilt. This is the only use case where the return does not
need arguing: a change made before build costs a design cycle, and the same change
after build costs a fleet.

The pilot produces design recommendations for Gen2 in which each recommendation
names the finding in the graph that produced it. Recommendations that cannot be
traced to a finding are not included, because a recommendation that reduces to
general good practice is something Amazon can already write for itself.

### 4.2 Conformance evidence before deployment

The customer terminals are products placed on the European market. Under
Regulation (EU) 2024/2847, Article 14 reporting obligations have been binding since
11 September 2026 and the Regulation applies in full from 11 December 2027 [5].
Product classification and the conformity assessment route follow from Annex III
and Annex IV, and the route determines whether internal control is available at all
or whether a notified body is required.

The pilot determines the conformity route for each in-scope component and cites the
governing provision for each determination. Where a component's classification is
genuinely arguable, the proposal records the argument rather than asserting a
conclusion, because a conformance claim that cannot survive a regulator is worse
than no claim.

Gateway equipment is assessed against IEC 62443 with security level targets derived
rather than assigned. The derivation is a published closed-form function of the
safety integrity level and the cyber-adjusted risk priority number, with the
disproportionate-cost test for any deviation stated quantitatively
(`references/WG-05-CAD-DEXPI-2/WG-05-CAD-IEC62443-SFAIRP-SecRACS.md` section 5).

### 4.3 Reach analysis when an advisory lands

Stated precisely, because precision here is the difference between a useful tool
and an overclaim.

The platform computes **reach**: given a component and a new advisory, which
vehicles, which sites and which terminal models contain that component, and what is
reachable from it across the physical, electrical and software boundaries. The
metric is published together with a proof that it reduces to the simpler
two-schema formulation when the electrical leg is empty, which is what makes it
checkable rather than rhetorical.

**Reach is not harm.** The published findings behind this metric say so directly,
and one of them notes that a reachable set can contain equipment whose loss removes
a hazard rather than causing one
(`references/WG-05-CAD-DEXPI-2/WG-05-CAD-Blast-Radius-Three-Ontologies.md`
section 8.9 and its findings). We will not deliver a ranked list of assets by
reachable-set size and call it a risk ranking. What we will deliver is the named
list and the path, which is the thing that is slow today and the thing an incident
commander actually needs.

Exploitability is narrowed before it reaches a human. Three topological
falsification rules discharge a large fraction of advisories automatically by
showing that the vulnerable code is unreachable, that no directed path terminates
at an actuated physical asset, or that the affected function is disabled by
default. In the working group's own measurement across fourteen industrial control
assemblies, 4,820 third-party dependencies and 612 active CVEs, 90.5 percent were
proven non-exploitable and 2.6 percent were exploitable
(`references/WG-06-CRA-Product-Assurance/WG-06-CRA-Product-Assurance.md`
section 3.3). That figure is labelled in the source as the working group's own
result on its own corpus, not an industry norm, and we present it the same way
here. Your ratio will be your own.

## 5. Deliverables

1. **The asset graph**, covering all three scopes, every element carrying
   provenance to its source document.
2. **Conformance gap analysis** per asset, with the governing instrument cited for
   every determination and the arguable cases flagged as arguable.
3. **Gen2 design recommendations**, each traceable to a named finding.
4. **RefGroundStation**, a reusable synthetic reference model of a gateway earth
   station, built by the same published method as the existing energy,
   manufacturing and rail reference assets. Amazon keeps it. See section 9 on why
   this is the honest framing rather than a claim of prior space work.
5. **Supply corridor jurisdictional analysis**, addressing regulatory friction
   between component origin and deployment location.
6. **Baseline and end-state measurement** against the five metrics in section 7.
7. **On-site readout**, presenting the above and confirming acceptance.

## 6. Success metrics, with baselines

A metric without a baseline cannot be demonstrated. Each of the five is measured
at the start of month one and again at readout, by the same method, so the
difference is defensible internally after we leave.

| Metric | Baseline captured in month one | Re-measured at readout |
|---|---|---|
| Conformance audit time | Amazon's own team answers a fixed set of ten conformance questions, timed | The same ten questions, same conditions |
| Vulnerability remediation cycle time | Time from advisory publication to a defensible list of affected assets, today | The same, on a live or replayed advisory |
| Engineering rework and redesign cost | Amazon supplies its own cost for a Gen2 change at current maturity against post-build | Cost avoided on findings actually actioned |
| Percent of hardware conformant before deployment | Components with complete evidence over total in scope | Recount |
| Lifecycle configuration accuracy | Sampled reconciliation of graph against as-built truth, defined sample size | Re-sample |

Amazon supplies the current-state timings and the internal cost rates. We are not
asserting your numbers on your behalf, and the resulting figures are yours, which
is what makes them usable in your own business case.

We are not importing a return-on-investment figure from another asset class. The
method for annualised loss expectancy, the Gordon-Loeb optimal investment bound and
return on security investment is published and available
(`references/WG-01-UI-Underwriter-insurance/WG-01-UI-ALE-ROSI-Decision-Framework.md`),
and every input in its worked example is explicitly labelled modelled rather than
measured. Applied here, it runs on Amazon's rates and produces Amazon's numbers.

## 7. Acceptance criteria

Stated now rather than agreed later.

1. The asset graph contains the agreed component count across the three scopes,
   each element with provenance to a source document.
2. A conformity route is determined for every in-scope component, with the
   governing provision cited.
3. Gen2 design recommendations delivered, each traceable to a named finding.
4. All five baselines captured in month one and re-measured at readout.
5. RefGroundStation delivered as a reusable model.
6. On-site readout delivered and accepted in writing.

## 8. Schedule

### Pre-kickoff, thirty days

This period exists to remove the two things that most often stall a pilot of this
kind, so that month one is engineering rather than paperwork.

- US entity contracting, supplier onboarding and insurance in place
- Written technology control plan, personnel named and attested
- Trade-compliance review of the data requirements list, with a named owner on
  each side and an explicit go or no-go
- Dedicated instance provisioned in a US region of Amazon's cloud
- Data requirements list agreed, including which artefacts are deliberately not
  requested

### Month one: boundary mapping and baselines

On-site kickoff. Ingestion of gateway and Gen1 documentation. Physical, electrical
and computational boundaries mapped. All five metric baselines captured while the
team is on site, because they cannot be reconstructed later.

### Month two: conformance and correlation

Full ingestion across all three assets. Conformity route determination per
component. CycloneDX and VEX correlation running against the graph, with the
falsification rules narrowing the advisory set before human triage.

### Month three: reach, recommendations and readout

Reach analysis on live or replayed advisories. Gen2 design recommendations
assembled and traced. Supply corridor jurisdictional analysis completed. Metrics
re-measured. On-site readout.

## 9. What we are not claiming

Stated here rather than left for your engineers to discover, because a proposal
that overstates its base is worth less than one that does not.

**There is no prior space or satellite work in the published corpus.** The
reference assets are a 250 MW battery storage site, a pharmaceutical API plant and
a rail maintenance depot. There is no satellite case, no ground-segment case and no
mapping to DO-178, DO-254, ECSS or CCSDS. What transfers is the method and the
schema, both published and both testable. What does not yet exist is a space-domain
reference asset, and building the first one is deliverable four rather than a
capability we are asserting.

**The schema is specified and conformance-testable; OXOT is its implementation.**
The published papers are explicit that they are specifications. Claims about what
the platform does are claims about OXOT's software, and we will demonstrate it
rather than describe it.

**Two carriage details are provisional.** The CycloneDX property namespace used by
the join is not yet registered with the CycloneDX taxonomy, and the DEXPI
serialisation binding rests on a reading of the published profile that no standards
body has confirmed. Both are flagged as provisional in the specification itself.

## 10. Commercial

**Fixed fee: 275,000 US dollars**, covering the three-month engagement and the
pre-kickoff period.

| Milestone | Share |
|---|---|
| Signature | 40 percent |
| End of month two | 30 percent |
| Acceptance of readout | 30 percent |

Work outside the stated scope proceeds only by written change order with an agreed
price. Travel for the on-site kickoff and the on-site readout is included.

OXOT's platform development is supported in part by Dutch research and development
incentives <mark>NAME THE INSTRUMENT PRECISELY OR REMOVE THIS SENTENCE</mark>,
which is why a pilot at this scope is priced as it is. That support is a cost
position and not an endorsement of the platform by any government.

## 11. What Amazon provides

Detailed in the accompanying data and access requirements document. In summary:

- A nominated engineering point of contact per asset
- Workshop access to engineering, operations, security, compliance and procurement
- The documentation set listed in section 3.3, at the agreed classification level
- A dedicated instance in a US region, with GPU access for the inference models
- Current-state timings and internal cost rates for the metric baselines
- Named counterpart for the trade-compliance review

---

## Notes

[1] L. Wouters, "Glitched on Earth by Humans: A Black-Box Security Evaluation of the
SpaceX Starlink User Terminal," Black Hat USA, 10 August 2022. Tooling published at
github.com/KULeuven-COSIC/Starlink-FI.

[2] Public reporting on the Prometheus baseband SoC and its use across satellites,
gateway antennas and terminals. <mark>VERIFY AGAINST A PRIMARY SOURCE BEFORE
SENDING</mark>

[3] FCC grant of the Kuiper second-generation satellite system, 10 February 2026.
The FCC licensee remains Kuiper Systems LLC and the licence refers to the Gen1,
Gen2 and Polar systems.

[4] Gateway at the National Space Centre Ltd, Elfordstown, Co. Cork, licensed by
ComReg for 18 and 28 GHz; announced 6 October 2025.

[5] Regulation (EU) 2024/2847, Article 71(2). Chapter IV applies from 11 June 2026,
Article 14 from 11 September 2026, and the Regulation in full from 11 December 2027.
Technical descriptions of the Annex III and Annex IV categories are given in
Commission Implementing Regulation (EU) 2025/2392.
