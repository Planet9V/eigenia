
None selected

Skip to content
Using Gmail with screen readers
Mped0626 
1 of 2
RE: Follow-up to saying hi!
Inbox
AI Overview
Michelle reviewed your proposal and attachments, suggesting you adopt her updated executive pitch framing the Cyber Digital Twin as a "mission-assurance pilot" rather than a cybersecurity tool, while also noting she reverted her last name to Lewis following her divorce.
Michelle added satellite-specific frameworks (NIST IR 8270, NIST SP 800-160 Vol. 2, CCSDS, ENISA), a 5-layer assurance framework, broader satellite dependency models, and more rigorous tests for OXOT's industrial-to-space applicability.
Michelle suggested executing generic non-disclosure agreements to continue discussions and offered to send one from her work account.
By Gemini; there may be mistakes. Learn more

mped0626@gmail.com
Attachments
Sep 14, 2026, 8:27 PM (18 hours ago)
to me

Hi Jim.

 

Thanks for the info and proposed pilot.  I’ve reviewed everything and put together some feedback.  Attached is a generic pitch to a satellite executive team proposing the pilot and surrounding details.  Below is a summary of what or how I would expand the information you shared to broaden the opportunity and importance.

 

Before we dive into it, when I went through my divorce, I reverted my last name to ‘Lewis’ (maiden name) which I may not have mentioned. 😉

 

The fundamental change in one sentence

Before: Can OXOT create a Cyber Digital Twin that improves cybersecurity, compliance, and supply-chain visibility?

Now: Can a Cyber Digital Twin demonstrably connect component provenance, cyber threats, physical dependencies, mission consequences, resilience, regulatory obligations, and cost sufficiently well to help the satellite company make faster, earlier, and more defensible engineering and investment decisions?

 

The changes were primarily intended to make the proposal more satellite-specific, independently supported, mission-focused, and defensible to executive, engineering, security, and compliance reviewers.

Added independent satellite-specific frameworks. The original proposal relied heavily on OXOT's own methodology and industrial/OT standards. I added NIST IR 8270, NIST SP 800-160 Vol. 2, CCSDS Security Architecture, and ENISA's Space Threat Landscape so the rationale is supported by recognized government and space-industry guidance rather than primarily by the vendor's claims. This is especially important because OXOT's existing architecture is rooted heavily in industrial/OT concepts such as PLCs, SCADA, Purdue architecture, IEC 62443, FMECA, and RAMS.
Changed the framing from “cybersecurity tool pilot” to “mission-assurance pilot.” The original material could be interpreted as evaluating another cybersecurity or compliance platform. The revised narrative instead asks whether a unified model can connect component provenance, vulnerabilities, physical consequences, mission impact, regulatory obligations, and business decisions. This gives executives a much stronger reason to consider the pilot.
Elevated cyber-physical dependency analysis. The original proposal already describes consequence-driven propagation across an asset model. We made that concept more explicit for satellites by establishing the chain: component/vulnerability → reachable pathway → physical/system effect → mission consequence → regulatory/business consequence. This addresses the limitation of relying primarily on CVE/CVSS severity.
Added Mission Resilience & Recoverability as a fifth major issue. The earlier four issues addressed regulation, supply chain, cyber-physical mission risk, and late-stage redesign. The new fifth issue asks what happens after a compromise or failure: Can the satellite or ground system fail over, enter a safe/degraded mode, use redundancy, recover, or continue the mission? This moves the analysis from simply identifying failure to understanding mission survivability.
Expanded SBOM/HBOM into a broader satellite dependency model. Rather than treating SBOM and HBOM as the end state, the revised approach incorporates hardware, software/firmware, cryptography, RF/communications, ground/cloud services, supply chain, operations, and regulatory attributes. This builds on OXOT's existing five-BOM concept, which already includes SBOM, HBOM, CBOM, SaaS-BOM, and Ops-BOM. The change was made because a satellite mission depends on far more than software and hardware inventories alone.
Strengthened the supply-chain argument. The proposal now distinguishes component inventory from component assurance. Knowing that a component exists does not tell us whether its provenance is established, whether supplier evidence is sufficient, what jurisdictional obligations follow it, or whether it creates an unacceptable mission dependency. This reinforces the existing OXOT supply-corridor analysis, which identifies regulatory differences, obligation transfer, evidence sufficiency, and origin sensitivity.
Corrected/qualified the CRA positioning. The revised document avoids suggesting that the EU Cyber Resilience Act universally requires complete SBOMs and HBOMs for every connected component operated in Europe. Instead, CRA is positioned accurately as one important regulatory driver while SBOM/HBOM and component provenance are presented as mechanisms that can help support compliance and assurance. This makes the proposal more defensible with legal/compliance reviewers. The source material itself identifies the CRA's technical-documentation/SBOM requirements and significant potential penalties.
Added a specific test of OXOT's applicability to satellite systems. Rather than assuming that an industrial Cyber Digital Twin automatically works for space systems, the pilot now explicitly asks OXOT to prove that its industrial/OT architecture can appropriately represent spacecraft, ground stations, RF systems, satellite buses, and mission dependencies. This is important risk containment: the pilot validates applicability before the satellite company considers broader adoption.
Changed success from “build a digital twin” to “improve decisions.” A technically impressive model is not enough. The revised pilot asks whether the system can answer operational questions faster and better than current processes—for example, which components can affect a mission-critical function, which vulnerabilities can actually reach them, what happens physically if they are compromised, and whether the mission can recover.
Added satellite-specific performance measures. In addition to the original measures—compliance audit time, vulnerability remediation cycle time, redesign/rework cost, evidence completeness, and configuration accuracy —the revised proposal introduces mission-impact identification time and false-priority reduction. These test whether the model actually helps teams find consequential risks faster and stop spending resources on technically severe but operationally irrelevant vulnerabilities.
Added reproducibility and auditability as success criteria. The pilot should demonstrate that another engineering/security team can trace a conclusion back through the model to the underlying evidence. This is consistent with OXOT's stated emphasis on data provenance and traceable source information. The reason for adding it is that executives, auditors, regulators, and engineers need a defensible decision trail, not an opaque AI-generated risk score.
Added “what-if” decision testing. The revised approach emphasizes whether the digital twin can evaluate a proposed design or security change before changing the actual system. That builds directly on OXOT's stated proposition of testing controls virtually before purchase or production changes. For the satellite company, this could be particularly valuable before design freeze, qualification, procurement, or deployment.
Made late discovery an executive financial issue rather than only an engineering problem. The proposal now emphasizes the asymmetry between finding an issue while a design remains open versus finding it after integration, qualification, production, or deployment. The existing CRA analysis makes the same point for conformity: problems discovered during design can change a requirement, while the same discovery after deployment may affect every unit of that configuration across multiple jurisdictions.
Added a five-layer assurance framework. The revised proposal organizes the concept into Component Assurance → Cyber Assurance → Cyber-Physical Assurance → Mission Assurance → Regulatory & Business Assurance. This was added to give executives a simple conceptual model for understanding why the pilot extends beyond conventional vulnerability management.
Made the pilot intentionally skeptical rather than vendor-promotional. Perhaps the most important change is that the document does not assume OXOT works. The recommendation is essentially: the concept is sufficiently compelling and relevant to satellite operations that it deserves a controlled test. OXOT must demonstrate measurable improvement using the satellite company's own assets, data, engineering questions, and baseline processes.
 

We should sign some generic NDAs as we continue these conversations.  I’ll send you one from my work account.

 

Let me know your thoughts.

Michelle

 

 

From: Jim McKenney <jims67mustang@gmail.com>
Sent: Monday, September 14, 2026 7:11 PM
To: Mped0626@gmail.com
Subject: Follow-up to saying hi!

 

Hi Michelle,

I have reconstructed some notes from last week. They are first in this email; then my draft Memo for a Pilot project for a ground station, Gen 1 and Gen 2 over 3 months, inclusive of Cyber Resilience Act 


Notes 

Modern satellite constellations operate across physical, electrical, and computational boundaries. When ground stations and space vehicles communicate, traditional software security tools miss the physical and kinetic dependencies of satellite operations. A compromised tracking motor controller, a thermal runaway in an amplifier, or an unvetted component in a satellite bus cannot be evaluated using software vulnerability scanners alone.

Issue: statutory operating requirements have hardened worldwide:
- The European Cyber Resilience Act (Regulation (EU) 2024/2847)  requires complete component traceability, software bills of materials (SBOMs), hardware bills of materials (HBOMs), and verified vulnerability handling for all connected hardware deployed or operated within the European Union. Non-compliance risks statutory fines up to €15 million or 2.5% of global annual turnover, alongside market withdrawal orders.
- Cross-Border Supply Chain Friction: Components originate across international shipping corridors (US, Taiwan, Japan, EU) and deploy into global ground stations (such as in European countries and ANZ). Reconciling component origin against sovereign and local statutory operating mandates currently requires hundreds of hours of manual legal and engineering review.
- Gen 2+ Satellite Qualification Costs: Unmitigated component conflicts or kinetic blast radiuses discovered after hardware tape-out cost millions of dollars in engineering rework and launch delays.

 

 

Please see my thoughts on a pilot program below;

 

To: Michelle Piscula, Amazon Leo
From: Jim McKenney, 
Subject: Cyber Digital Twin Pilot Project Proposal

Modern industrial infrastructure operates across complex, risk-indexed regulatory environments, where compliance complexity in each jurisdiction dictates the scope of sovereign risk management. Fragmented standards and disconnected supply chain data prevent authoritative tracking of asset composition and vulnerabilities across international shipping corridors.

Supported by CIF-NL 2025, the Dutch government research and development grant under which our Cyber Digital Twin platform was developed and for which it received the maximum award available under the scheme, we propose a pilot covering one ground station, one Gen1 satellite and one Gen2 satellite across three months.

The platform ingests engineering design documents, product specification documents, interface control documents, system design documents, bills of materials across hardware, software, cryptography, manufacturing and operations, concepts of operation, hazard logs, IEC 62443 analysis, safety programmes, reliability analyses and minimum operating requirements. It converts them into a unified schema mapping every physical, electrical and computational boundary, with full data provenance. IEC 62443 is our standard engineering process throughout. Security level targets are derived from consequence rather than assigned by category, and the same body of engineering work then produces the evidence that regulatory conformity requires. One programme, two outputs.

The platform implements compliance checks such as the Cyber Resilience Act across all assets, satellites and site hardware alike, and integrates bill of materials and
vulnerability data for automatic vulnerability and exploitability correlation and prioritisation. It executes consequence-driven threat propagation simulations,
generates design recommendations, and tracks performance against success metrics including audit time reduction, remediation cycle time, engineering redesign costs, hardware compliance and lifecycle asset configuration precision.

The pilot uses a hierarchical model where individual facility twins integrate into a broader corporate and supply chain ecosystem, scaling securely to include a supply
corridor jurisdictional analysis that addresses regulatory friction between component origin and deployment location. That structure is what drives per-unit cost down as the approach extends across a fleet.

For the pilot we propose to install and operate the platform on a secure dedicated instance within Amazon's cloud infrastructure, ensuring the security of the data and
the inference models. Please see the CDT_Pilot Proposal for a more detailed proposal.

Also dedicated memo on Cyber Resilience Act conformity and the supply corridor analysis accompanies this proposal.

Best,

 One attachment
  •  Scanned by Gmail
