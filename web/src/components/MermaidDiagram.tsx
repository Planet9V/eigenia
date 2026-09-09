"use client";

import React from "react";

// Ground #0B0C0E / accent #E05A10 / borders #22252C / muted labels #71717A.
// Matches src/components/theory-diagrams/*, and mirrors the code-block
// convention of staying dark in both colour modes.
const MERMAID_CONFIG = {
  startOnLoad: false,
  securityLevel: "strict" as const,
  theme: "base" as const,
  fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
  // wrappingWidth 620: at mermaid's default of 200 a node carrying a title and
  // a line of description renders as a 264px column, so a seven-layer stack
  // came out 1284px tall. The converted diagrams describe rather than label,
  // and this is where a rendering default belongs, rather than repeated as an
  // init directive in every published document.
  flowchart: {
    useMaxWidth: true,
    curve: "basis" as const,
    padding: 12,
    wrappingWidth: 620,
  },
  sequence: { useMaxWidth: true },
  themeVariables: {
    background: "#0B0C0E",
    fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
    fontSize: "13px",
    primaryColor: "#131519",
    primaryTextColor: "#E8E3DA",
    primaryBorderColor: "#E05A10",
    secondaryColor: "#16181D",
    secondaryTextColor: "#A1A1AA",
    secondaryBorderColor: "#22252C",
    tertiaryColor: "#121417",
    tertiaryTextColor: "#A1A1AA",
    tertiaryBorderColor: "#22252C",
    mainBkg: "#131519",
    nodeBorder: "#E05A10",
    nodeTextColor: "#E8E3DA",
    lineColor: "#71717A",
    textColor: "#71717A",
    titleColor: "#E8E3DA",
    clusterBkg: "#121417",
    clusterBorder: "#22252C",
    edgeLabelBackground: "#0B0C0E",
    labelBoxBkgColor: "#131519",
    labelBoxBorderColor: "#E05A10",
    labelTextColor: "#E8E3DA",
    actorBkg: "#131519",
    actorBorder: "#E05A10",
    actorTextColor: "#E8E3DA",
    activationBkgColor: "#E05A10",
    signalColor: "#71717A",
    signalTextColor: "#E8E3DA",
    noteBkgColor: "#121417",
    noteBorderColor: "#E05A10",
    noteTextColor: "#E8E3DA",
    pie1: "#E05A10",
    pie2: "#71717A",
    pie3: "#22252C",
  },
};

let initialized = false;

export const MermaidDiagram: React.FC<{ chart: string }> = ({ chart }) => {
  const reactId = React.useId();
  const domId = React.useMemo(() => `mermaid-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`, [reactId]);
  const [svg, setSvg] = React.useState<string | null>(null);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    setSvg(null);
    setFailed(false);

    // Lazily pulled: mermaid lands in its own async chunk and is only fetched
    // by routes that actually mount a diagram. Do not hoist this to a
    // top-level import.
    import("mermaid")
      .then(async (mod) => {
        const mermaid = mod.default;
        if (!initialized) {
          mermaid.initialize(MERMAID_CONFIG);
          initialized = true;
        }
        // parse first so an invalid diagram never reaches render()
        const ok = await mermaid.parse(chart, { suppressErrors: true });
        if (!ok) throw new Error("mermaid: unparseable diagram");
        const { svg: rendered } = await mermaid.render(domId, chart);
        if (!cancelled) setSvg(rendered);
      })
      .catch(() => {
        // mermaid can leave an orphan measuring node behind on failure
        document.getElementById(`d${domId}`)?.remove();
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [chart, domId]);

  if (failed) {
    return (
      <div className="my-6 rounded-2xl bg-[#090a0c] border border-zinc-800 p-5 shadow-xl font-mono text-xs text-dutchOrange overflow-x-auto">
        <div className="text-[10px] uppercase text-zinc-500 mb-2 border-b border-zinc-800 pb-1">mermaid</div>
        <pre>
          <code>{chart}</code>
        </pre>
      </div>
    );
  }

  return (
    <figure
      className="mermaid-figure my-6 rounded-2xl bg-[#0B0C0E] border border-[#22252C] px-5 py-6 shadow-xl overflow-x-auto"
      aria-label="Diagram"
    >
      {svg ? (
        <div className="flex justify-center [&_svg]:max-w-full [&_svg]:h-auto" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <div className="h-24 flex items-center justify-center font-mono text-[10px] uppercase tracking-widest text-[#71717A]">
          rendering diagram
        </div>
      )}
    </figure>
  );
};

export default MermaidDiagram;
