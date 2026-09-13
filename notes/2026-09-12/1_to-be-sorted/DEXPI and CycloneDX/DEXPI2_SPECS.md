DEXPI 2.0 Specification: Advancing Data Exchange Standards for the Process Industry

Executive Summary

Released on October 10, 2025, the DEXPI 2.0 Specification represents a significant evolution in digital data exchange for the process industry. This major update unifies the DEXPI P&ID Specification version 1.4 and the DEXPI Process Specification 1.0 into a single, cohesive framework. The primary innovation is the introduction of DEXPI XML, a new UML-based Information Model format and standardized serialization method that replaces the legacy Proteus Schema.

Key takeaways include:

* Unified Modeling: For the first time, Piping and Instrumentation Diagrams (P&IDs), Process Flow Diagrams (PFDs), and Block Flow Diagrams (BFDs) are supported by a common serialization standard.
* Technical Modernization: Transition from XMI-based modeling to a simplified UML format via DEXPI XML, reducing complexity for software implementers.
* Stability and Compatibility: Backward compatibility for P&ID "plant model" content ensures that existing projects remain undisrupted.
* Open Access: The specification is freely available under the Creative Commons CC BY 4.0 license via GitLab, fostering industry-wide adoption and transparency.

Overview of DEXPI 2.0

The DEXPI (Data Exchange in the Process Industry) 2.0 Specification is designed to harmonize how process information is modeled and shared across various software platforms and organizations. It serves as the foundation for digital continuity throughout the entire asset lifecycle, aiming to reduce vendor lock-in and simplify data interchange.

Core Components

The 2.0 Specification integrates two previously distinct areas of focus:

1. Plant Model: Incorporates the DEXPI P&ID Specification version 1.4.
2. Process Model: Incorporates an enhanced version of the DEXPI Process Specification 1.0.

Technical Innovations and Improvements

The release introduces several technical advancements intended to improve interoperability and model expressiveness.

The "DEXPI XML" Format

DEXPI 2.0 marks the launch of DEXPI XML, which serves a dual purpose:

* Information Modeling: It defines a simplified format for representing UML (Unified Modeling Language) elements. This provides an alternative to the XMI format, allowing for the setup of conceptual models without the complexities typically associated with XMI.
* Standardized Serialization: It provides a common XML format for serializing the content of BFDs, PFDs, and P&IDs. Notably, this replaces the earlier Proteus Schema, meaning DEXPI can now be fully implemented without requiring the Proteus XML schema.

Process Model Enhancements

The Process Model within DEXPI 2.0 includes over 30 incorporated change requests. A primary improvement is the addition of a parameter qualification mechanism. This mechanism allows for more precise and detailed data definitions, which increases the usability and expressiveness of the model for process engineers.

Serialization for Diagram Types

Prior to version 2.0, no serialization standard existed within the DEXPI Process framework for BFDs and PFDs. DEXPI 2.0 resolves this by defining consistent serialization for these diagrams using DEXPI XML, facilitating their exchange between different engineering software tools.

Key Features at a Glance

Feature	Description
Backward Compatibility	P&ID "plant model" content remains unchanged from version 1.4.
New Serialization	DEXPI XML replaces Proteus Schema for P&IDs and introduces serialization for BFDs/PFDs.
UML Modeling	Simplified UML-based Information Model format (alternative to XMI).
Open Source	Full specification available on GitLab under CC BY 4.0 license.
Parameter Qualification	New mechanism for more detailed data definitions in process models.

The Standard Library Initiative

In parallel with the 2.0 Specification, DEXPI e.V. is developing the Standard Library. This initiative involves a curated set of templates intended to extend or restrict the DEXPI Specification to meet specific engineering requirements.

The goals of the Standard Library include:

* Providing consistent, reusable building blocks for engineering workflows.
* Streamlining and harmonizing workflows across the industry.
* Supporting specific engineering processes through tailored extensions.

Collaboration and Accessibility

The DEXPI 2.0 Specification is the product of collaborative efforts between several specialized groups:

* DEXPI Plant SIG (Special Interest Group)
* DEXPI Process SIG
* DEXPI Specification Steering Team

Licensing and Availability

To encourage community adoption and transparency, the specification is published under the Creative Commons Attribution 4.0 International (CC BY 4.0) license. This allows for free use, sharing, and adaptation, provided proper attribution is given. The "source of truth" for the specification and supporting materials is hosted on GitLab.

Upcoming Engagement Opportunities

Several events are scheduled to facilitate the adoption and understanding of the new standard:

* DEXPI 2.0 Release Event (Q4 2025): Will feature live discussions with contributors and hands-on demonstrations of the innovations.
* DEXPI Days 1.0 (January 2026): A networking and educational event designed to provide deeper insights into the future of process data exchange and allow for direct engagement with experts.
