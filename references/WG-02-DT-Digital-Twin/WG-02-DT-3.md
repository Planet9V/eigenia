# The Moment of Recognition

Lab Sponsor Resident  j.mckenney

There is a particular kind of clarity that comes from spending decades inside facilities where the stakes are not financial — where the wrong call does not cost money but costs lives, power, water, safety, and the invisible infrastructure that modern civilization takes entirely for granted.

## What Nassim Taleb Saw in Markets, We See Every Day in the Facilities the World Depends On

It is the clarity of someone who has stood in substations and battery storage facilities and rail control rooms and water treatment plants across multiple continents and watched smart, well-intentioned people manage systems of extraordinary complexity with mental models that are — at a foundational level — broken. Not because the people are incompetent. Not because they haven't tried. But because the entire industry handed them a map drawn for the wrong territory and told them, with great confidence, that it was accurate.

When McKenney encountered Nassim Taleb's _Fooled by Randomness_, he recognized it immediately — not as a book about finance, but as an exact description of what he had been watching in critical infrastructure for years. The same delusions. The same structural blindness. The same catastrophic overconfidence built on the wrong kind of evidence. The same invisible cemetery of near-misses and silent failures that never make it into the case studies.

Taleb's financial markets and McKenney's industrial facilities are different worlds. The math underneath them is the same.

---

## What Taleb Saw on Wall Street

Taleb's central observation was deceptively simple: in noisy, complex, nonlinear systems, **outcomes are poor evidence of skill**.fs+1

He watched fund managers with five-year winning streaks be celebrated as geniuses — and understood that in a room of ten thousand managers, each with a 50/50 chance of success in any year, pure mathematics guarantees that hundreds of them will have winning streaks of five years or more. Those survivors become the case studies. They go on magazine covers. Institutions copy their "methodology." The ten thousand minus the survivors — the ones whose strategies failed, whose funds closed, who left the industry — are invisible. They do not testify. They do not appear in databases. They are the **silent evidence** that would, if visible, completely reframe what the winning streak means.jamesclear+2

Taleb called this living on the **right side of the table**: the comfortable, narrative-driven, outcome-focused side where success looks like skill, streaks look like systems, and the future looks like a slightly modified version of the past.wikipedia+1

The **left side of the table** is where reality operates: a probability space full of outcomes that did not happen but could have, tail events that historical data does not contain because they haven't occurred yet, rare but ruinous scenarios that look implausible right up until the moment they are not.fs+1

Taleb's warning was that the entire financial industry had built its risk management apparatus on the right side of the table — and was therefore not managing risk at all. It was managing _stories about risk_. And that, eventually and repeatedly, the left side would assert itself with consequences no model had priced in.wikipedia+1

---

## What McKenney Sees in the Field

Jim McKenney has spent years watching the identical dynamic play out across critical infrastructure — but with consequences that dwarf a blown-up fund.

The language is different. Instead of "we had a positive year," it is _"we passed the audit."_ Instead of "our Sharpe ratio is strong," it is _"we are IEC 62443 compliant."_ Instead of "our strategy has been validated by ten years of returns," it is _"we haven't had a significant incident."_

The underlying epistemological error is identical.

When a facility hasn't been breached, most people interpret that as evidence that the controls are working. McKenney recognizes it for what it actually is: evidence that the specific combination of adversary capability, timing, target selection, and internal vulnerability state hasn't yet converged into a realized attack path. The facility is on _one sample path_ through a probability space that contains thousands of alternative paths. Some of those alternative paths end in loss of control, safety system failure, physical damage, or worse.

The absence of visible compromise tells you almost nothing about which path you are actually on.

This is Taleb's turkey problem, moved from trading desks to control rooms. The turkey is fed every day for a thousand days, building ever-greater confidence in the stability of the arrangement — until the day before Thanksgiving, when the model is revised with maximum prejudice. The compliance score doesn't fall the week before the catastrophic breach. The audit passes. The dashboard looks green. And somewhere in the facility's actual configuration — in the gap between what the reference architecture says should be deployed and what was actually installed, modified, patched, or quietly connected for operational convenience — an adversary has already found the path that none of the controls were designed to address.fs+1

McKenney has seen this pattern across continents and sectors. The faces change. The systems change. The fundamental mistake does not.

---

## The Right Side of the Table, in Every Facility He Has Walked Into

McKenney's years of field experience have taught him to recognize right-side thinking on sight. It manifests in recognizable forms:

**The Reference Architecture Illusion.** The diagram on the wall shows a cleanly segmented network: IT separated from OT, the demilitarized zone properly positioned, all connections flowing through controlled chokepoints. The diagram is accurate — for the system as it was designed. What actually exists in the facility is the product of years of operational decisions, emergency workarounds, vendor access paths created during a maintenance window and never removed, legacy equipment that predates the current architecture, and software running on firmware that hasn't been updated since installation. The reference architecture and the operational reality have diverged substantially. The audit checked the reference architecture.

**The Compliance-as-Security Illusion.** Every major framework — IEC 62443, NERC CIP, NIS2, NIST CSF — represents genuine knowledge about security principles. McKenney respects the frameworks. What he does not accept is the conflation of _compliance with a framework_ and _actual security posture_. Frameworks are built from known patterns, past incidents, and agreed-upon principles. They describe the right side of the table very well. They cannot, by construction, account for the specific combination of configurations, people, software dependencies, geopolitical context, and organizational behaviors that define the actual risk surface of a specific facility at a specific moment.

**The Vendor Survivorship Illusion.** The vendor shows you their reference customers. The facilities that deployed their product and had no significant incident. McKenney has spent enough time in enough boardrooms to understand that what is not being shown is equally important: the facilities that deployed the same product and were compromised anyway, the incidents quietly handled under NDA, the near-misses that never reached public reporting. The security market, like Taleb's fund management market, shows you its survivors and calls them proof. The silent evidence — the cemetery of deployments where the product did not prevent the incident — is structurally invisible to the buyer.

**The "We've Always Done It This Way" Illusion.** Critical infrastructure carries deep institutional memory. Practices that worked for fifteen years are not interrogated because they have worked for fifteen years. McKenney understands why: facilities cannot afford to disrupt operations for every security theory that passes through. But he also understands what Taleb would say about fifteen years of incident-free operation in a world where the threat landscape is not stationary: you are on a sample path. The fact that a strategy has worked does not tell you whether it will continue to work, especially when the adversary environment, the software dependency chain, and the geopolitical context have all shifted.

---

## The Left Side of the Table: What McKenney's Methodology Actually Does

McKenney's approach to security in critical facilities is built on a principle that aligns directly with Taleb's deepest insight: **uncertainty is not the obstacle to good security. Pretending it doesn't exist is.**

Where conventional security practice asks "do we have the controls in place?" McKenney asks a fundamentally different question: **"Given the full probability space of how an adversary could move through this specific facility, with these specific people, at this specific moment — where are we actually exposed, and how exposed are we?"**

This requires refusing the comfort of the right side of the table.

It means building a model of the facility that captures not just what the reference architecture says should exist, but what actually exists — every piece of equipment with its real firmware, real configuration, real patch state, and real network connectivity. It means mapping the software in every device down to its transitive dependencies, because a vulnerability buried four levels deep in a library used by a component nobody thinks about is exactly the kind of thing an adversary finds and a conventional audit misses. It means modeling the threat intelligence not as a generic list of TTPs, but as the actual active campaigns being run by actual adversaries against actual sectors.

And it means — this is the part the industry most consistently avoids — modeling the **human beings** in the facility.

McKenney has watched, in real incidents and real exercises, the way organizations respond under pressure. The SOC analyst who dismisses the third alert as a false positive because the first two were. The plant manager who is certain the cyber team is overreacting because "these systems have run fine for twenty years." The incident commander whose authority structure prevents them from escalating to the people who could act in time. The team whose collective response capability collapses under cognitive load at exactly the moment when clarity is most needed.

These are not failures of individual character. They are predictable, measurable properties of human organizations under stress. Taleb spent his career arguing that human cognition systematically distorts risk perception in specific, computable directions — that the biases, heuristics, and narrative tendencies that served our species well in small-group environments become dangerous liabilities in complex, nonlinear, high-stakes systems. McKenney's field experience confirms this at every scale, from the individual analyst to the organizational culture to the institutional constraints of the regulatory environment itself.wikipedia+1

The methodology he and his team have built treats human behavior not as an unpredictable wildcard to be managed with training videos and policy documents, but as a **dynamical system with its own structure, thresholds, and failure modes** — one that must be modeled with the same rigor as the technical systems it operates alongside.

---

## The Monte Carlo Mind: Running the Paths That Haven't Happened

Taleb's antidote to right-side thinking was the Monte Carlo simulation — the practice of generating thousands of alternative histories to reveal the distribution of outcomes hidden behind the single sample path that actually occurred. His insight was that you cannot understand your true exposure by studying what happened. You have to study what _could_ happen — across the full space of possibility, including the regions of that space you haven't visited yet and hope never to.wikipedia+1

McKenney's approach is built on this exact principle, applied to the physical and organizational reality of critical facilities.

The question he asks — and builds systematic methodology to answer — is not "what has gone wrong before?" but "in how many ways could this facility be broken, through what sequences of steps, exploiting what specific combinations of technical and human vulnerability?" And then: "which of those pathways are most probable, which are most catastrophic, and what would we have to change to genuinely reduce the exposure — not just to pass the next audit?"

This is not desk theory. It is the product of walking facilities, talking to operators, understanding the organizational culture, mapping the actual software running in actual devices, and thinking adversarially about what a patient, capable attacker would do with the specific vulnerabilities that actually exist — not the hypothetical vulnerabilities that compliance frameworks are designed to address.

The result is a radically different kind of output than a compliance report provides. Not a score. Not a checklist. Not a maturity rating. A **probability landscape**: these are the paths most likely to succeed, with the highest consequence, given this specific facility, these specific people, this specific threat environment. Here is where the risk actually concentrates. Here is what would genuinely reduce it. Here is what looks important on paper but is unlikely to matter in practice.

---

## The Fragility of the World That Depends on These Systems

McKenney's urgency about this paradigm shift is not abstract. It comes from years of direct contact with the systems that modern life depends on — and from watching, in real time, the acceleration of threats against them.

The power grid that heats homes and runs hospitals. The water treatment systems that serve cities. The battery storage systems that underpin the energy transition. The rail networks that move people and goods. The communications infrastructure that connects everything else. These systems are increasingly digitized, increasingly networked, and increasingly targeted by adversaries — state actors, criminal organizations, and others — who operate with exactly the kind of patience, adaptability, and probabilistic sophistication that Taleb attributed to markets' most dangerous participants.

And the security posture of most of these facilities is still built predominantly on the right side of the table. Still organized around compliance frameworks that describe the threat landscape as it was understood when they were written. Still evaluated by audits that check for controls against known attack patterns. Still defended by teams whose cognitive architecture, organizational structure, and available tools were not designed to handle the multi-hop, multi-domain, human-and-technical attack sequences that modern adversaries actually use.

McKenney's assessment — earned through direct observation, not theoretical extrapolation — is that this gap between the threat reality and the defensive methodology is widening. The adversaries are getting more capable, more patient, and more willing to invest in understanding the specific configuration of specific facilities. The defensive side is, in many cases, still primarily optimizing its compliance narrative.

Taleb's warning about financial markets was that the reckoning, when it came, would be worse for being delayed — that every year the right-side illusion held, the hidden exposure grew. The same dynamic applies here. Every year that critical infrastructure security is evaluated primarily on right-side metrics while left-side vulnerability accumulates, the eventual convergence of adversary capability and exploitable exposure becomes more consequential.

---

## What the Shift Looks Like

The paradigm shift McKenney advocates for — and that his methodology is designed to enable — is not primarily technological. It is epistemological.

It starts with accepting that **uncertainty is the data, not the noise**. The goal is not to eliminate uncertainty about the facility's security posture. The goal is to measure it honestly, understand its structure, and make decisions that genuinely reduce the probability of catastrophic outcomes — not decisions that reduce the anxiety of decision-makers by producing clean, auditable evidence of right-side compliance.

It means treating the facility as a **living probability system** rather than a static control architecture. Security posture is not a state that gets assessed annually and maintained between assessments. It is a dynamic property of a complex system that changes as equipment ages, software is updated, configurations drift, people come and go, organizational cultures evolve, and the external threat environment shifts.

It means **thinking in distributions and paths**, not in controls and categories. The relevant question is not "do we have a firewall?" but "given the full connectivity graph of this facility, what are the paths an adversary could traverse, with what probability, and how do they interact with the human response system's actual capabilities under realistic stress conditions?"

And it means having the intellectual honesty to follow the analysis where it leads — even when it points away from the vendor products already purchased, the frameworks already invested in, and the compliance narratives already submitted to regulators.

This is what Taleb demanded of financial risk management. It is what McKenney demands of industrial security. And it is what the facilities that keep the world running deserve.

---

## The Core of the Matter

Nassim Taleb's gift to anyone willing to absorb it is the recognition that **the world is not organized to make right-side thinking correct**. The world is organized on the left side — probabilistic, nonlinear, full of fat tails and rare events and outcomes that didn't happen but could have. The tools and habits of right-side thinking are not slightly inadequate; they are actively dangerous in proportion to the gap between the map they provide and the territory that actually exists.fs+1

Jim McKenney's gift — built from years of direct experience with the systems that civilization depends on — is the recognition that this gap in critical infrastructure security is real, it is widening, and it matters in ways that no balance sheet can capture.

His approach works not because it promises certainty, but because it refuses false certainty. Not because it eliminates risk, but because it measures risk honestly. Not because it tells operators what they want to hear, but because it shows them what they need to see: the left side of the table, fully illuminated, with all its uncomfortable probability and all its actionable truth.

The threats to critical infrastructure are not going to become simpler or more predictable. The fragility of the systems the world depends on is not going to diminish as they become more networked, more automated, and more targeted. The only question is whether the people responsible for defending them will choose the comfort of the right side — or the harder, more honest, more necessary work of the left.

**The randomness is not the enemy. Pretending it doesn't exist is.**