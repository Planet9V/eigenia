"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  Lock, 
  Scale, 
  Compass, 
  Mail,
  Zap,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { HeroCanvasBackground } from "@/components/canvas/HeroCanvasBackground";
import { motion } from "framer-motion";

export default function UnifiedStandardPage() {
  const [activeTier, setActiveTier] = useState<1 | 2 | 3>(1);
  const [isSlidePaused, setIsSlidePaused] = useState(false);

  return (
    <main className="min-h-screen bg-canvas text-primary relative font-sans selection:bg-dutchOrange selection:text-white transition-colors duration-300">
      <SiteChrome>
        {/* =========================================================================
            HERO SECTION: Total Black Background with Dynamic Background Video & Digital Twin Canvas
        ========================================================================= */}
        <section className="dark relative overflow-hidden border-b border-hairline min-h-[480px] sm:min-h-[540px] lg:min-h-[620px] flex items-center selection:bg-dutchOrange selection:text-white">
          {/* Authentic Total Black Background with Dynamic Background Video + Live Digital Twin Canvas */}
          <div className="absolute inset-0 bg-[#0B0C0E] overflow-hidden">
            {/* Dynamic Looping Background Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/assets/grand_unification_hero.png"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-35 mix-blend-luminosity pointer-events-none"
            >
              <source src="/assets/hero-unified-standard.webm" type="video/webm" />
              <source src="/assets/hero-unified-standard.mp4" type="video/mp4" />
            </video>

            {/* Live Procedural Vector Streamline Canvas Overlay */}
            <HeroCanvasBackground
              variant="digital-twin"
              fallbackSrc="/assets/hero-digital-twin.webp"
              fallbackClassName="object-cover object-[65%_center]"
              opacity={0.75}
            />

            {/* Multi-layered Dark Vignettes to ensure crisp text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E] via-[#0B0C0E]/75 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-[#0B0C0E]/60 pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 space-y-6">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Research Tracks", href: "/tracks" },
                { label: "The Unified Standard" },
              ]}
            />

            <div className="max-w-4xl space-y-4">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
                Open Standard // DEXPI 2.0 &amp; CycloneDX 1.6+
              </span>

              <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-primary">
                The Unified Standard:{" "}
                <span className="text-dutchOrange">
                  Topological BIM &amp; Hierarchical BOM
                </span>.
              </h1>

              <p className="text-base sm:text-lg text-secondary font-light leading-relaxed max-w-3xl">
                A single computable graph schema reconciling physical process engineering topology (ISO 15926 / DEXPI 2.0) with full-spectrum supply chain multi-BOM transparency (OWASP CycloneDX 1.6+). Breaking proprietary CAD monopolies through sovereign applied complexity science.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Jump & Metadata Sub-Bar */}
        <section className="py-4 sm:py-5 bg-canvas border-b border-hairline transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="w-2 h-2 rounded-full bg-dutchOrange animate-pulse" />
              <span className="text-secondary font-medium">Schema G_CPDT • ISO 15926 &amp; CycloneDX 1.6+</span>
              <span className="hidden sm:inline text-hairline">|</span>
              <span className="hidden sm:inline text-muted">100% Air-Gapped Offline Operation</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#papers-suite"
                className="text-dutchOrange hover:underline font-semibold flex items-center gap-1"
              >
                <span>7-Paper Suite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-hairline">|</span>
              <Link
                href="/wiki?wg=WG-05-CAD"
                className="text-secondary hover:text-primary transition-colors flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5 text-dutchOrange" />
                <span>WG-05 Wiki Treatises</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 1: Core Statement & Artwork (Modeled directly on Mission.tsx)
        ========================================================================= */}
        <section className="py-20 bg-subtle text-primary relative font-sans border-b border-hairline transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              
              {/* Left Column: Aligned Statement Block */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full border-l-2 border-l-dutchOrange pl-6 sm:pl-8 py-2 space-y-6">
                <div className="space-y-4">
                  <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-semibold block">
                    Dutch B.V. Applied Complexity Think Tank // WG-05 &amp; WG-02
                  </span>

                  <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
                    Liberating Industrial Engineering from Proprietary Walled Gardens
                  </h2>

                  <div className="w-12 h-0.5 bg-dutchOrange/40 rounded-full my-3" />

                  <p className="text-base sm:text-lg text-secondary leading-relaxed font-sans font-light">
                    For decades, proprietary CAE and BIM vendors have locked critical piping, instrumentation, and thermodynamic details inside closed binary schemas. When engineering metadata is trapped in proprietary geometry blobs, automated multi-physics co-simulation and supply chain vulnerability verification become impossible.
                  </p>

                  <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans font-light">
                    DEXPI 2.0 provides an open, vendor-neutral information model grounded in ISO 15926, serializing the plant as a machine-readable directed graph. OWASP CycloneDX 1.6+ provides full-spectrum transparency across hardware, software, runtime configurations, and cryptographic assets. By binding DEXPI equipment tags directly to CycloneDX component references, Eigenia delivers the complete cyber-physical state machine.
                  </p>
                </div>

                <div className="pt-4 border-t border-hairline/60 flex items-center justify-between font-mono text-xs text-dutchOrange">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-dutchOrange animate-pulse" />
                    <span className="font-medium text-xs">
                      Single Computable Graph Schema: G_CPDT
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-[11px] text-muted font-sans">
                    <ShieldCheck className="w-3.5 h-3.5 text-dutchOrange" />
                    <span>Purdue Level 0–4 • Zero Egress Required</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Flush Aligned Artwork (Featuring Eigenia_1.png) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-5 relative min-h-[340px] lg:min-h-[420px] rounded-2xl overflow-hidden shadow-2xl group border border-hairline/40"
              >
                <Image
                  src="/assets/Eigenia_1.png"
                  alt="Eigenia Societal Infrastructure Protection"
                  fill
                  className="object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[11px] text-zinc-300">
                  <span className="text-dutchOrange font-semibold block mb-0.5">Societal Protection</span>
                  <span>Non-destructive SCADA and physical control loop defense across sovereign utilities.</span>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: The Multi-Advisor Strategic Council
        ========================================================================= */}
        <section className="py-20 bg-canvas text-primary relative font-sans border-b border-hairline transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-2">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-semibold block">
                Multi-Advisor Strategic Council // First Principles
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
                Why Open Interoperability Inevitably Triumphs
              </h2>
              <p className="text-sm sm:text-base text-secondary font-light leading-relaxed">
                Evaluating the unified standard through long-term economic moats, radical design clarity, and first-principles thermodynamics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 font-sans">
              {/* Advisor 1: Capital & Economic Moats */}
              <div className="p-8 rounded-2xl bg-surface border border-hairline space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                      <Scale className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-sans text-base font-semibold text-primary">Chief Investment Officer</h3>
                      <span className="font-mono text-[10px] text-muted block uppercase">Sector: Catastrophe Reinsurance</span>
                    </div>
                  </div>
                  <blockquote className="text-xs sm:text-sm text-secondary font-light leading-relaxed italic border-l-2 border-dutchOrange/40 pl-3">
                    &ldquo;Buying a closed proprietary system does not transfer your liability. Proprietary CAD vendors protect their license margins, not your plant. When a physical catastrophe halts operations, the asset owner absorbs every dollar of loss. Open, inspectable data standards build the only real economic moat: capital compounds without vendor lock-in, and risk rests on empirical physics.&rdquo;
                  </blockquote>
                </div>
                <div className="pt-3 border-t border-hairline font-mono text-[11px] text-muted">
                  <span className="text-dutchOrange font-semibold">Actuarial Grounding:</span> Eliminates unhedged accumulation risk under Lloyd&apos;s Y5381.
                </div>
              </div>

              {/* Advisor 2: Design & Human-Machine Interfaces */}
              <div className="p-8 rounded-2xl bg-surface border border-hairline space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-sans text-base font-semibold text-primary">Chief Design Officer</h3>
                      <span className="font-mono text-[10px] text-muted block uppercase">Sector: Human-Machine Interfaces (HMI)</span>
                    </div>
                  </div>
                  <blockquote className="text-xs sm:text-sm text-secondary font-light leading-relaxed italic border-l-2 border-dutchOrange/40 pl-3">
                    &ldquo;Simplicity comes from removing artificial boundaries. For decades, plants forced mechanical engineers to work in isolated piping diagrams while software teams looked at code elsewhere. That division makes no sense. When you place physical piping and digital components on the same computable canvas, the interface gets out of the way, and operators can finally see how the whole machine behaves.&rdquo;
                  </blockquote>
                </div>
                <div className="pt-3 border-t border-hairline font-mono text-[11px] text-muted">
                  <span className="text-dutchOrange font-semibold">Operator Interface:</span> Unifies piping topology and digital telemetry on one screen.
                </div>
              </div>

              {/* Advisor 3: First-Principles Physics */}
              <div className="p-8 rounded-2xl bg-surface border border-hairline space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-dutchOrange/10 text-dutchOrange flex items-center justify-center">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-sans text-base font-semibold text-primary">Chief Engineer</h3>
                      <span className="font-mono text-[10px] text-muted block uppercase">Sector: Autonomous Physical Systems</span>
                    </div>
                  </div>
                  <blockquote className="text-xs sm:text-sm text-secondary font-light leading-relaxed italic border-l-2 border-dutchOrange/40 pl-3">
                    &ldquo;Start from first principles. If cooling stops, 140 kilowatts of rack heat will destroy silicon packaging in twelve seconds. A cybersecurity compliance checklist that ignores fluid dynamics protects nothing. Build the digital twin around physical ground truth: mass flow, pump curves, pressure limits, and silicon temperatures.&rdquo;
                  </blockquote>
                </div>
                <div className="pt-3 border-t border-hairline font-mono text-[11px] text-muted">
                  <span className="text-dutchOrange font-semibold">Physical Grounding:</span> Couples firmware exploits to Navier-Stokes fluid transients.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: The Deliberation Panel (Smooth Horizontal Sliding Rail)
        ========================================================================= */}
        <section className="py-20 bg-subtle text-primary relative font-sans border-b border-hairline overflow-hidden transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-2xl space-y-2">
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-semibold block">
                  Cross-Disciplinary Deliberation // Peer Review Panel
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
                  The Voices of Industrial Operations
                </h2>
                <p className="text-sm sm:text-base text-secondary font-light leading-relaxed">
                  Real-world operational perspectives from mechanical piping, operational technology, cyber-physical modeling, plant operations, and catastrophe underwriting.
                </p>
              </div>

              {/* Sliding Controls */}
              <div className="flex items-center gap-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setIsSlidePaused(!isSlidePaused)}
                  className="px-3.5 py-1.5 rounded-xl border border-hairline bg-surface hover:border-dutchOrange text-secondary hover:text-primary transition-colors flex items-center gap-2"
                  title={isSlidePaused ? "Resume auto-slide" : "Pause auto-slide"}
                >
                  {isSlidePaused ? (
                    <>
                      <Play className="w-3.5 h-3.5 text-dutchOrange" />
                      <span>Resume Slide</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-3.5 h-3.5 text-dutchOrange" />
                      <span>Pause on Hover</span>
                    </>
                  )}
                </button>
                <div className="flex items-center gap-1.5 text-[10px] text-muted">
                  <span className={`w-2 h-2 rounded-full ${isSlidePaused ? "bg-muted" : "bg-dutchOrange animate-pulse"}`} />
                  <span>{isSlidePaused ? "Paused" : "Live Glide"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Bleed Horizontal Sliding Rail with Edge Vignettes */}
          <div 
            className="relative mt-8 w-full overflow-hidden py-4"
            onMouseEnter={() => setIsSlidePaused(true)}
            onMouseLeave={() => setIsSlidePaused(false)}
            onTouchStart={() => setIsSlidePaused(true)}
            onTouchEnd={() => setIsSlidePaused(false)}
          >
            {/* Soft Edge Fade Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-subtle via-subtle/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-subtle via-subtle/80 to-transparent z-10 pointer-events-none" />

            <motion.div
              animate={isSlidePaused ? {} : { x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: 42,
                repeat: Infinity,
              }}
              className="flex gap-6 w-max pl-4 sm:pl-8"
            >
              {[
                {
                  id: "mechanical",
                  title: "Lead Mechanical Engineer",
                  sector: "Industrial Cooling Systems",
                  quote: "Proprietary CAD files trap engineering intent inside closed geometry. When we engineer a 140 kW liquid cooling loop, our P&IDs hold critical data: pipe schedules, glycol mixtures (PG25), valve flow coefficients, and pump head curves. In traditional CAD tools, that hydraulic data is locked away. DEXPI 2.0 serializes the piping schematic into an open directed graph. Mapping DEXPI equipment tags straight to the digital twin lets us test flow failures and valve trips without paying CAD seat licenses.",
                  note: "Proteus XML directed graph export • Papers #1 & #4"
                },
                {
                  id: "security",
                  title: "Principal Cybersecurity Architect",
                  sector: "Operational Technology & Automation",
                  quote: "SPDX was created for open source software licenses, not physical plants. Under IEC 62443 and the EU Cyber Resilience Act, security requires tracking five distinct layers: hardware roots of trust (HBOM), operating firmware (SBOM), network register setpoints (OBOM), cryptographic keys (CBOM), and cloud telemetry endpoints (SaaSBOM). CycloneDX 1.6+ supports every layer and evaluates VEX exploitability offline, so air-gapped control rooms can check vulnerabilities without external network connections.",
                  note: "Five-layer BOM coverage with offline VEX validation • Papers #2 & #3"
                },
                {
                  id: "twin",
                  title: "Lead Digital Twin Architect",
                  sector: "Cyber-Physical Systems",
                  quote: "Neither model works in isolation. A piping schematic shows that closing valve FCV-201 starves supply manifold A, but says nothing about the microcontroller controlling the actuator. An SBOM flags a vulnerability in that actuator's TCP stack, but cannot tell you that exploiting it drives GPU junction temperature above 105°C within 12 seconds. Binding DEXPI equipment tags directly to CycloneDX component references connects the vulnerability to the physical consequence.",
                  note: "Topological edge binding: DEXPI tag to CycloneDX bom-ref • Papers #2, #3, & #5"
                },
                {
                  id: "operations",
                  title: "Head of Plant Operations",
                  sector: "Critical Power & SCADA",
                  quote: "In an alarm state, operators need actionable physical insight, not a list of software packages. The digital twin must respect Purdue Model boundaries. Facility staff need to see their familiar piping schematics, while security teams track vulnerability blast radius. Most importantly, the model must maintain an unbreachable safety boundary: software agents can observe and run simulations, but hardwired safety instrumented systems retain sole control over physical trips.",
                  note: "Enforces Purdue Model boundaries and analog trip authority • Papers #1, #4, & #7"
                },
                {
                  id: "actuary",
                  title: "Chief Actuary",
                  sector: "Industrial Risk Underwriting",
                  quote: "Self-attestation spreadsheets cannot underwrite a billion-dollar facility. Under Lloyd's Market Association Y5381 requirements, syndicates demand measurable proof of risk accumulation. Joining BIM piping topology with BOM component catalogs lets us run Monte Carlo simulations to calculate Single Loss Expectancy and Annualised Loss Expectancy based on actual physical damage. Insurers get defensible exposure numbers, and facility owners can price captive retention layers accurately.",
                  note: "Derives empirical SLE and ALE from physical failure blast radius • Papers #1, #4, #6, & #7"
                },
                // Duplicated set for seamless continuous horizontal gliding loop
                {
                  id: "mechanical-dup",
                  title: "Lead Mechanical Engineer",
                  sector: "Industrial Cooling Systems",
                  quote: "Proprietary CAD files trap engineering intent inside closed geometry. When we engineer a 140 kW liquid cooling loop, our P&IDs hold critical data: pipe schedules, glycol mixtures (PG25), valve flow coefficients, and pump head curves. In traditional CAD tools, that hydraulic data is locked away. DEXPI 2.0 serializes the piping schematic into an open directed graph. Mapping DEXPI equipment tags straight to the digital twin lets us test flow failures and valve trips without paying CAD seat licenses.",
                  note: "Proteus XML directed graph export • Papers #1 & #4"
                },
                {
                  id: "security-dup",
                  title: "Principal Cybersecurity Architect",
                  sector: "Operational Technology & Automation",
                  quote: "SPDX was created for open source software licenses, not physical plants. Under IEC 62443 and the EU Cyber Resilience Act, security requires tracking five distinct layers: hardware roots of trust (HBOM), operating firmware (SBOM), network register setpoints (OBOM), cryptographic keys (CBOM), and cloud telemetry endpoints (SaaSBOM). CycloneDX 1.6+ supports every layer and evaluates VEX exploitability offline, so air-gapped control rooms can check vulnerabilities without external network connections.",
                  note: "Five-layer BOM coverage with offline VEX validation • Papers #2 & #3"
                },
                {
                  id: "twin-dup",
                  title: "Lead Digital Twin Architect",
                  sector: "Cyber-Physical Systems",
                  quote: "Neither model works in isolation. A piping schematic shows that closing valve FCV-201 starves supply manifold A, but says nothing about the microcontroller controlling the actuator. An SBOM flags a vulnerability in that actuator's TCP stack, but cannot tell you that exploiting it drives GPU junction temperature above 105°C within 12 seconds. Binding DEXPI equipment tags directly to CycloneDX component references connects the vulnerability to the physical consequence.",
                  note: "Topological edge binding: DEXPI tag to CycloneDX bom-ref • Papers #2, #3, & #5"
                },
                {
                  id: "operations-dup",
                  title: "Head of Plant Operations",
                  sector: "Critical Power & SCADA",
                  quote: "In an alarm state, operators need actionable physical insight, not a list of software packages. The digital twin must respect Purdue Model boundaries. Facility staff need to see their familiar piping schematics, while security teams track vulnerability blast radius. Most importantly, the model must maintain an unbreachable safety boundary: software agents can observe and run simulations, but hardwired safety instrumented systems retain sole control over physical trips.",
                  note: "Enforces Purdue Model boundaries and analog trip authority • Papers #1, #4, & #7"
                },
                {
                  id: "actuary-dup",
                  title: "Chief Actuary",
                  sector: "Industrial Risk Underwriting",
                  quote: "Self-attestation spreadsheets cannot underwrite a billion-dollar facility. Under Lloyd's Market Association Y5381 requirements, syndicates demand measurable proof of risk accumulation. Joining BIM piping topology with BOM component catalogs lets us run Monte Carlo simulations to calculate Single Loss Expectancy and Annualised Loss Expectancy based on actual physical damage. Insurers get defensible exposure numbers, and facility owners can price captive retention layers accurately.",
                  note: "Derives empirical SLE and ALE from physical failure blast radius • Papers #1, #4, #6, & #7"
                }
              ].map((item) => (
                <div
                  key={item.id}
                  className="w-[360px] sm:w-[480px] lg:w-[520px] shrink-0 p-8 rounded-2xl bg-surface border border-hairline shadow-lg flex flex-col justify-between border-l-2 border-l-dutchOrange hover:border-dutchOrange/70 transition-all duration-300 group"
                >
                  <blockquote className="text-xs sm:text-sm text-primary font-sans leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  <div className="mt-6 space-y-2 pt-3 border-t border-hairline/60">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] font-mono">
                      <span className="text-dutchOrange font-semibold">{item.title}</span>
                      <span className="text-muted">Sector: {item.sector}</span>
                    </div>
                    <div className="text-[10px] font-mono text-muted">
                      {item.note}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: The Three-Tier Equipment Catalog Model
        ========================================================================= */}
        <section className="py-20 bg-canvas text-primary relative font-sans border-b border-hairline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-2">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-semibold block">
                Standardized Data Architecture // ISO 15926 & CycloneDX
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
                The Three-Tier Equipment Catalog
              </h2>
              <p className="text-sm sm:text-base text-secondary font-light leading-relaxed">
                Decoupling engineering intent from procurement and operations, enabling automated simulation before procurement and continuous verification in production.
              </p>
            </div>

            {/* Stage Selector Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <button
                onClick={() => setActiveTier(1)}
                className={`p-5 rounded-2xl text-left border transition-all ${
                  activeTier === 1
                    ? "bg-surface border-dutchOrange text-primary shadow-lg"
                    : "bg-surface/50 border-hairline text-secondary hover:text-primary"
                }`}
              >
                <span className="text-[10px] text-dutchOrange font-semibold block">STAGE 01</span>
                <span className="text-sm font-sans font-semibold block mt-1">Tier 1: Functional Requirements</span>
                <span className="text-[11px] font-light font-sans block mt-1 text-muted">
                  Vendor-agnostic engineering intent (Flow, Head, SIL).
                </span>
              </button>

              <button
                onClick={() => setActiveTier(2)}
                className={`p-5 rounded-2xl text-left border transition-all ${
                  activeTier === 2
                    ? "bg-surface border-dutchOrange text-primary shadow-lg"
                    : "bg-surface/50 border-hairline text-secondary hover:text-primary"
                }`}
              >
                <span className="text-[10px] text-dutchOrange font-semibold block">STAGE 02</span>
                <span className="text-sm font-sans font-semibold block mt-1">Tier 2: Vendor Model Catalogs</span>
                <span className="text-[11px] font-light font-sans block mt-1 text-muted">
                  Manufacturer cut-sheets with native BOM specifications.
                </span>
              </button>

              <button
                onClick={() => setActiveTier(3)}
                className={`p-5 rounded-2xl text-left border transition-all ${
                  activeTier === 3
                    ? "bg-surface border-dutchOrange text-primary shadow-lg"
                    : "bg-surface/50 border-hairline text-secondary hover:text-primary"
                }`}
              >
                <span className="text-[10px] text-dutchOrange font-semibold block">STAGE 03</span>
                <span className="text-sm font-sans font-semibold block mt-1">Tier 3: As-Built Configured Asset</span>
                <span className="text-[11px] font-light font-sans block mt-1 text-muted">
                  Deployed plant instance with live VEX exploitability status.
                </span>
              </button>
            </div>

            {/* Active Tier Content Card */}
            <div className="p-8 rounded-2xl bg-surface border border-hairline space-y-4 shadow-xl">
              {activeTier === 1 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-dutchOrange font-semibold uppercase tracking-wider">
                      Tier 1 // Process Engineering Intent
                    </span>
                    <h3 className="font-sans text-xl font-semibold text-primary">
                      The Reference Requirements Specification
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-secondary font-light leading-relaxed max-w-3xl">
                    Process modelers specify operating limits, nominal flow rates, design pressures, and required Safety Integrity Levels (IEC 61508) without vendor coupling. This enables complete hydraulic simulation prior to commercial equipment bidding.
                  </p>
                  <div className="p-4 rounded-xl bg-canvas border border-hairline font-mono text-xs text-secondary overflow-x-auto">
                    <pre className="text-zinc-300">{`REQ-CDU-PUMP-01:
  Functional Role: Secondary Coolant Circulation Pump
  Fluid Medium: Propylene Glycol 25% (PG25)
  Nominal Flow: Q >= 35.0 m3/h | Design Pressure: 16.0 bar
  Safety Integrity: SIL-2 (IEC 61508)
  Security Target: SL-3 (IEC 62443-3-3)
  Fail-Safe State: Fail-Open to Maximum Flow`}</pre>
                  </div>
                </div>
              )}

              {activeTier === 2 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-dutchOrange font-semibold uppercase tracking-wider">
                      Tier 2 // Verified Manufacturer Models
                    </span>
                    <h3 className="font-sans text-xl font-semibold text-primary">
                      The Vendor Equipment Catalog
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-secondary font-light leading-relaxed max-w-3xl">
                    Equipment vendors publish certified cut-sheets in standardized DEXPI XML and CycloneDX multi-BOM formats. Engineers evaluate calibrated pump head curves alongside embedded firmware libraries and silicon roots of trust.
                  </p>
                  <div className="p-4 rounded-xl bg-canvas border border-hairline font-mono text-xs text-secondary overflow-x-auto">
                    <pre className="text-zinc-300">{`VEND-WILO-01 (Wilo Stratos MAXO 65/0.5-12 PN16):
  Mechanical: Impeller 142mm, Motor 1.45 kW, EEI <= 0.17
  HBOM: ARM Cortex-M4 SoC (STM32F407)
  SBOM: FreeRTOS v10.4 + libmodbus v3.1.6
  Communication: Modbus TCP (Port 502), BACnet IP
  RoT: Legacy Flash -> Mitigation Required: Hardware Diode Conduit`}</pre>
                  </div>
                </div>
              )}

              {activeTier === 3 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-dutchOrange font-semibold uppercase tracking-wider">
                      Tier 3 // Operational Ground Truth
                    </span>
                    <h3 className="font-sans text-xl font-semibold text-primary">
                      The As-Built Configured Asset
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-secondary font-light leading-relaxed max-w-3xl">
                    The physical asset deployed in the data hall or plant floor. Anchored to a facility tag, network VLAN, serial number, and active VEX vulnerability feed. If an advisory is issued, the digital twin traces downstream consequences instantly.
                  </p>
                  <div className="p-4 rounded-xl bg-canvas border border-hairline font-mono text-xs text-secondary overflow-x-auto">
                    <pre className="text-zinc-300">{`ASSET-AMSTERDAM-CDU01-PMP01A (Tag: PMP-SEC-01A):
  Location: Amsterdam-01 Campus, Hall 3, CDU Bay 01
  IP: 10.14.22.105 (VLAN 402) | Serial: WLO-2024-NL-8849201
  Firmware Hash: SHA-256 [4b92a10e... verified]
  VEX Status: not_affected (Vulnerable telemetry daemon disabled)
  Safety Interlock: Hardwired Bimetallic Shunt Trip Active on PDU`}</pre>
                  </div>
                </div>
              )}
            </div>

            {/* Visual Grand Unification Architecture Schema Callout */}
            <div className="p-8 rounded-2xl bg-surface border border-hairline shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dutchOrange font-semibold block">
                  Computable Graph Architecture // G_CPDT
                </span>
                <h3 className="font-sans text-xl font-semibold text-primary">
                  The Dual-View Cyber-Physical Bridge
                </h3>
                <p className="text-xs sm:text-sm text-secondary font-light leading-relaxed">
                  The physical P&amp;ID layout (DEXPI 2.0 / ISO 15926) defines hydraulic conductivity, pipe schedules, and fail-safe valve states. The multi-BOM hierarchy (OWASP CycloneDX 1.6+) defines firmware libraries, silicon roots of trust, and cryptographic readiness.
                </p>
                <div className="pt-2 font-mono text-[11px] text-muted space-y-1.5 border-t border-hairline/60">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-dutchOrange" />
                    <span>Physical Edge: Pipe segment (DN150, PG25 fluid)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-dutchOrange" />
                    <span>Digital Edge: bom-ref (STM32F407 embedded FreeRTOS)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-dutchOrange" />
                    <span>Coupled Consequence: Thermal spike in 12s if starved</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[340px] rounded-2xl overflow-hidden border border-hairline/60 shadow-lg group">
                <Image
                  src="/assets/grand_unification_hero.png"
                  alt="Grand Unification Schema G_CPDT"
                  fill
                  className="object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 font-mono text-[11px] text-zinc-300 flex items-center justify-between">
                  <span className="text-dutchOrange font-semibold">Schema G_CPDT</span>
                  <span className="text-[10px] text-muted">ISO 15926 ⟷ CycloneDX 1.6+ Binding</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: The Seven-Paper Suite Showcase
        ========================================================================= */}
        <section id="papers-suite" className="py-20 bg-subtle text-primary relative font-sans border-b border-hairline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-2">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-semibold block">
                Research Monograph Suite // Working Group Pre-Publishes
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
                The Seven Foundational Papers
              </h2>
              <p className="text-sm sm:text-base text-secondary font-light leading-relaxed">
                Authored under clean direct-prose academic standards, establishing the mathematical, topological, and actuarial foundations of the sovereign digital twin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
              
              {/* Paper 1 */}
              <div className="p-8 rounded-2xl bg-surface border border-hairline space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-dutchOrange font-semibold">Paper 01 // WG-05-CAD</span>
                    <span className="text-muted">Position Paper</span>
                  </div>
                  <h3 className="font-sans text-base font-semibold text-primary leading-snug">
                    Breaking the Proprietary CAD/BIM Monopoly
                  </h3>
                  <p className="text-xs text-secondary font-light leading-relaxed">
                    Why DEXPI 2.0 (ISO 15926) is the open foundation for industrial cyber-physical twins, liberating engineering models from closed Autodesk and AVEVA formats.
                  </p>
                </div>
                <div className="pt-3 border-t border-hairline text-[11px] font-mono text-muted flex items-center justify-between">
                  <span>Track 5: Engineering CAD</span>
                  <Link href="/wiki?wg=WG-05-CAD" className="text-dutchOrange font-semibold hover:underline">
                    View in Wiki →
                  </Link>
                </div>
              </div>

              {/* Paper 2 */}
              <div className="p-8 rounded-2xl bg-surface border border-hairline space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-dutchOrange font-semibold">Paper 02 // WG-05 & WG-07</span>
                    <span className="text-muted">Technical Spec</span>
                  </div>
                  <h3 className="font-sans text-base font-semibold text-primary leading-snug">
                    The Omnipresent Bill of Materials
                  </h3>
                  <p className="text-xs text-secondary font-light leading-relaxed">
                    Full-spectrum OWASP CycloneDX 1.6+ specification across HBOM, SBOM, OBOM, CBOM, and SaaSBOM for 100% offline air-gapped systems assurance.
                  </p>
                </div>
                <div className="pt-3 border-t border-hairline text-[11px] font-mono text-muted flex items-center justify-between">
                  <span>Track 7: Threat Modeling</span>
                  <Link href="/wiki?wg=WG-07-TM" className="text-dutchOrange font-semibold hover:underline">
                    View in Wiki →
                  </Link>
                </div>
              </div>

              {/* Paper 3 */}
              <div className="p-8 rounded-2xl bg-surface border border-hairline space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-dutchOrange font-semibold">Paper 03 // WG-05 & WG-02</span>
                    <span className="text-muted">Systems Architecture</span>
                  </div>
                  <h3 className="font-sans text-base font-semibold text-primary leading-snug">
                    Unified DEXPI & CycloneDX Schema
                  </h3>
                  <p className="text-xs text-secondary font-light leading-relaxed">
                    Formal specification of the single computable graph schema G_CPDT, joining physical P&ID multigraphs with digital component dependency DAGs.
                  </p>
                </div>
                <div className="pt-3 border-t border-hairline text-[11px] font-mono text-muted flex items-center justify-between">
                  <span>Track 2: Digital Twin</span>
                  <Link href="/wiki?wg=WG-02-DT" className="text-dutchOrange font-semibold hover:underline">
                    View in Wiki →
                  </Link>
                </div>
              </div>

              {/* Paper 4 */}
              <div className="p-8 rounded-2xl bg-surface border border-hairline space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-dutchOrange font-semibold">Paper 04 // WG-02 & WG-04</span>
                    <span className="text-muted">Applied Case Study 1</span>
                  </div>
                  <h3 className="font-sans text-base font-semibold text-primary leading-snug">
                    Thermal Catastrophe in 140 kW AI Racks
                  </h3>
                  <p className="text-xs text-secondary font-light leading-relaxed">
                    Joint hydraulic P&ID and silicon root-of-trust blast radius modeling. Simulating the 12-second burnout horizon in high-density direct-to-chip liquid cooling.
                  </p>
                </div>
                <div className="pt-3 border-t border-hairline text-[11px] font-mono text-muted flex items-center justify-between">
                  <span>Track 4: Cascading Failures</span>
                  <Link href="/wiki?wg=WG-04-CF" className="text-dutchOrange font-semibold hover:underline">
                    View in Wiki →
                  </Link>
                </div>
              </div>

              {/* Paper 5 */}
              <div className="p-8 rounded-2xl bg-surface border border-hairline space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-dutchOrange font-semibold">Paper 05 // WG-07 & WG-08</span>
                    <span className="text-muted">Applied Case Study 2</span>
                  </div>
                  <h3 className="font-sans text-base font-semibold text-primary leading-snug">
                    Automated CyHAZOP & Monte Carlo Graphs
                  </h3>
                  <p className="text-xs text-secondary font-light leading-relaxed">
                    Coupling IEC 61882 hazard guide words with stochastic Monte Carlo attack walks across unified cyber-physical schemas to expose non-linear failure modes.
                  </p>
                </div>
                <div className="pt-3 border-t border-hairline text-[11px] font-mono text-muted flex items-center justify-between">
                  <span>Track 8: Monte Carlo Engine</span>
                  <Link href="/wiki?wg=WG-08-MO" className="text-dutchOrange font-semibold hover:underline">
                    View in Wiki →
                  </Link>
                </div>
              </div>

              {/* Paper 6 */}
              <div className="p-8 rounded-2xl bg-surface border border-hairline space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-dutchOrange font-semibold">Paper 06 // WG-01-UI</span>
                    <span className="text-muted">Actuarial Framework</span>
                  </div>
                  <h3 className="font-sans text-base font-semibold text-primary leading-snug">
                    Physics-Grounded Cyber Underwriting
                  </h3>
                  <p className="text-xs text-secondary font-light leading-relaxed">
                    Deriving Single Loss Expectancy (SLE), Annualised Loss Expectancy (ALE), and Return on Security Investment (ROSI) from verified digital twin asset registers.
                  </p>
                </div>
                <div className="pt-3 border-t border-hairline text-[11px] font-mono text-muted flex items-center justify-between">
                  <span>Track 1: Underwriting</span>
                  <Link href="/wiki?wg=WG-01-UI" className="text-dutchOrange font-semibold hover:underline">
                    View in Wiki →
                  </Link>
                </div>
              </div>

              {/* Paper 7 (Capstone) */}
              <div className="p-8 rounded-2xl bg-surface border-2 border-dutchOrange/60 hover:border-dutchOrange space-y-4 shadow-2xl flex flex-col justify-between md:col-span-2 lg:col-span-3 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-dutchOrange font-bold uppercase tracking-wider">Paper 07 // Cross-Working Group Flagship</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-dutchOrange text-white font-bold text-[10px]">Conference Whitepaper</span>
                  </div>
                  <h3 className="font-sans text-lg sm:text-xl font-semibold text-primary leading-snug">
                    The Sovereign Cyber Digital Twin: An Open Architecture Standard for Critical Infrastructure Assurance
                  </h3>
                  <p className="text-xs sm:text-sm text-secondary font-light leading-relaxed max-w-4xl">
                    The synthesis whitepaper releasing the open-source Reference Facility Specification (RefFac-100MW-AI), defining the multi-agent governance charter, and establishing the global working group roadmap for hyperscalers, plant operators, and catastrophe reinsurance syndicates.
                  </p>
                </div>
                <div className="pt-4 border-t border-hairline text-[11px] font-mono text-muted flex flex-wrap items-center justify-between gap-2">
                  <span>Target Conferences: S4x27 • IEEE SecDev • ACM CPS-IoT • OCP Global Summit</span>
                  <Link href="/wiki" className="text-dutchOrange font-semibold hover:underline flex items-center gap-1">
                    <span>Access Full Research Wiki</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: Think Tank Collaboration CTA
        ========================================================================= */}
        <section id="join" className="py-20 bg-canvas text-primary relative font-sans border-b border-hairline transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-surface border border-hairline p-8 sm:p-12 text-center space-y-6 shadow-xl">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-medium inline-block">
                Open Working Group Consortium // Eigenia Foundation
              </span>

              <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
                Participate in the Sovereign Digital Twin Working Group
              </h2>

              <p className="text-sm sm:text-base text-secondary font-light max-w-2xl mx-auto leading-relaxed">
                Whether you are an industrial plant operator, a process piping engineer, an embedded firmware architect, or a catastrophe reinsurance underwriter, contribute your domain expertise to build the open, mathematical future of sovereign infrastructure defense.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  href="/collaborate"
                  className="px-6 py-3 rounded-xl bg-dutchOrange hover:bg-dutchOrange/90 text-white font-sans text-xs font-semibold transition-all shadow-md inline-flex items-center gap-2"
                >
                  <span>Request Working Group Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href="mailto:jim@eigenia.nl"
                  className="px-6 py-3 rounded-xl bg-subtle hover:bg-surface text-secondary hover:text-primary border border-hairline font-mono text-xs transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-dutchOrange" />
                  <span>jim@eigenia.nl</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </SiteChrome>
    </main>
  );
}
