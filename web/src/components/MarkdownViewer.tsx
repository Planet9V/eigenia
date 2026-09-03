"use client";

import React from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface MarkdownViewerProps {
  content: string;
}

const sanitizeMarkdownContent = (raw: string): string => {
  if (!raw) return "";
  let c = raw;
  // Strip YAML frontmatter strictly
  c = c.replace(/^---[\s\S]*?---\r?\n?/g, "");
  // Convert Obsidian [[target|label]] to label, or [[target]] to target
  c = c.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, p1, p2) => p2 || p1.replace(/_/g, " "));
  return c.trim();
};

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  const sanitizedContent = sanitizeMarkdownContent(content);
  // Helper to render inline text with KaTeX formulas and bold/italic/links/code
  const renderFormattedText = (text: string): React.ReactNode[] => {
    // Split text by inline math ($...$) and block math ($$...$$)
    const mathRegex = /(\$\$.*?\$\$|\$.*?\$)/g;
    const parts = text.split(mathRegex);

    return parts.map((part, idx) => {
      if (part.startsWith("$$") && part.endsWith("$$") && part.length > 4) {
        const mathStr = part.slice(2, -2).trim();
        try {
          const html = katex.renderToString(mathStr, { displayMode: true, throwOnError: false });
          return (
            <span
              key={idx}
              className="my-3 block overflow-x-auto text-center font-mono py-2 text-primary"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return <code key={idx} className="text-dutchOrange font-mono">{part}</code>;
        }
      }

      if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
        const mathStr = part.slice(1, -1).trim();
        try {
          const html = katex.renderToString(mathStr, { displayMode: false, throwOnError: false });
          return (
            <span
              key={idx}
              className="inline-block px-1 font-mono text-primary"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return <code key={idx} className="text-dutchOrange font-mono">{part}</code>;
        }
      }

      // Format bold (**text**), italic (*text*), code (`text`), and links ([text](url))
      return renderInlineMarkdown(part, idx);
    });
  };

  const renderInlineMarkdown = (text: string, keyPrefix: number | string): React.ReactNode => {
    // Match links [text](url), inline code `code`, bold **text**, and italic *text*
    const tokenRegex = /(\[.*?\]\(.*?\)|\`.*?\`|\*\*.*?\*\*|\*[^*]+?\*)/g;
    const parts = text.split(tokenRegex);

    return (
      <React.Fragment key={keyPrefix}>
        {parts.map((p, idx) => {
          if (!p) return null;
          const k = `${keyPrefix}-${idx}`;

          // Links [text](url)
          if (p.startsWith("[") && p.includes("](") && p.endsWith(")")) {
            const linkMatch = p.match(/^\[(.*?)\]\((.*?)\)$/);
            if (linkMatch) {
              const [, label, url] = linkMatch;
              const isExternal = url.startsWith("http://") || url.startsWith("https://");
              return (
                <a
                  key={k}
                  href={url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="text-dutchOrange hover:underline font-medium"
                >
                  {label}
                </a>
              );
            }
          }

          // Inline code `code`
          if (p.startsWith("`") && p.endsWith("`") && p.length >= 2) {
            return (
              <code
                key={k}
                className="px-1.5 py-0.5 rounded bg-subtle text-primary border border-hairline font-mono text-xs text-dutchOrange"
              >
                {p.slice(1, -1)}
              </code>
            );
          }

          // Bold **text**
          if (p.startsWith("**") && p.endsWith("**") && p.length >= 4) {
            return (
              <strong key={k} className="font-semibold text-primary">
                {p.slice(2, -2)}
              </strong>
            );
          }

          // Italic *text*
          if (p.startsWith("*") && p.endsWith("*") && p.length >= 2) {
            return (
              <em key={k} className="italic text-primary/90">
                {p.slice(1, -1)}
              </em>
            );
          }

          return p;
        })}
      </React.Fragment>
    );
  };

  // Parse lines into blocks (Headings, Paragraphs, Lists, Tables, CodeBlocks, Blockquotes, HR)
  const renderBlocks = () => {
    const lines = sanitizedContent.split(/\r?\n/);
    const blocks: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Code blocks (```) - Intentionally dark terminal container in both modes matching Stripe/GitHub docs
      if (line.trim().startsWith("```")) {
        const lang = line.trim().replace("```", "");
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // skip closing ```
        blocks.push(
          <div key={`code-${i}`} className="my-6 rounded-2xl bg-[#090a0c] border border-zinc-800 p-5 shadow-xl font-mono text-xs text-dutchOrange overflow-x-auto">
            {lang && <div className="text-[10px] uppercase text-zinc-500 mb-2 border-b border-zinc-800 pb-1">{lang}</div>}
            <pre><code>{codeLines.join("\n")}</code></pre>
          </div>
        );
        continue;
      }

      // Horizontal Rule (--- or ***)
      if (line.trim() === "---" || line.trim() === "***") {
        blocks.push(<hr key={`hr-${i}`} className="my-10 border-hairline" />);
        i++;
        continue;
      }

      // Headings
      if (line.startsWith("# ")) {
        blocks.push(
          <h1 key={`h1-${i}`} className="font-sans text-2xl sm:text-3xl text-primary font-semibold tracking-tight mt-8 mb-6 pb-4 border-b border-hairline">
            {renderFormattedText(line.replace("# ", ""))}
          </h1>
        );
        i++;
        continue;
      }
      if (line.startsWith("## ")) {
        blocks.push(
          <h2 key={`h2-${i}`} className="font-sans text-xl sm:text-2xl text-primary font-semibold tracking-tight mt-10 mb-4 pt-6 border-t border-hairline">
            {renderFormattedText(line.replace("## ", ""))}
          </h2>
        );
        i++;
        continue;
      }
      if (line.startsWith("### ")) {
        blocks.push(
          <h3 key={`h3-${i}`} className="font-sans text-lg sm:text-xl text-primary font-semibold tracking-tight mt-8 mb-3">
            {renderFormattedText(line.replace("### ", ""))}
          </h3>
        );
        i++;
        continue;
      }
      if (line.startsWith("#### ")) {
        blocks.push(
          <h4 key={`h4-${i}`} className="font-sans text-base sm:text-lg text-primary font-medium tracking-tight mt-6 mb-2">
            {renderFormattedText(line.replace("#### ", ""))}
          </h4>
        );
        i++;
        continue;
      }
      if (line.startsWith("##### ")) {
        blocks.push(
          <h5 key={`h5-${i}`} className="font-sans text-sm font-semibold tracking-tight mt-4 mb-2 text-secondary">
            {renderFormattedText(line.replace("##### ", ""))}
          </h5>
        );
        i++;
        continue;
      }
      if (line.startsWith("###### ")) {
        blocks.push(
          <h6 key={`h6-${i}`} className="font-sans text-xs font-semibold uppercase tracking-wider text-muted mt-4 mb-2">
            {renderFormattedText(line.replace("###### ", ""))}
          </h6>
        );
        i++;
        continue;
      }

      // Markdown Tables (| col | col |)
      if (line.trim().startsWith("|")) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith("|")) {
          tableLines.push(lines[i]);
          i++;
        }
        
        // Parse table
        const rows = tableLines.map(row => 
          row.split("|").slice(1, -1).map(cell => cell.trim())
        );

        if (rows.length >= 2) {
          const header = rows[0];
          // skip separator row if present (e.g. |---|---|)
          const body = rows.slice(1).filter(r => !r.every(c => c.replace(/[:\-]/g, "").length === 0));

          blocks.push(
            <div key={`table-${i}`} className="my-8 overflow-x-auto rounded-xl border border-hairline bg-surface shadow-lg">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-subtle border-b border-hairline text-primary font-mono uppercase tracking-wider">
                    {header.map((col, cIdx) => (
                      <th key={cIdx} className="p-3 font-semibold border-r border-hairline last:border-r-0">
                        {renderFormattedText(col)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline text-secondary">
                  {body.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-subtle/50 transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-3 border-r border-hairline last:border-r-0">
                          {renderFormattedText(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        continue;
      }

      // Blockquote (> quote)
      if (line.trim().startsWith(">")) {
        const quoteLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith(">")) {
          quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
          i++;
        }
        const quoteText = quoteLines.join(" ");
        // Check for GitHub alerts: [!NOTE], [!WARNING], [!IMPORTANT], [!TIP], [!CAUTION]
        const alertMatch = quoteText.match(/^\[!(NOTE|WARNING|IMPORTANT|TIP|CAUTION)\]\s*(.*)$/i);
        if (alertMatch) {
          const alertType = alertMatch[1].toUpperCase();
          const alertBody = alertMatch[2];
          const alertStyles: Record<string, { border: string; bg: string; titleColor: string }> = {
            NOTE: { border: "border-blue-500", bg: "bg-blue-500/10", titleColor: "text-blue-500" },
            TIP: { border: "border-emerald-500", bg: "bg-emerald-500/10", titleColor: "text-emerald-500" },
            IMPORTANT: { border: "border-violet-500", bg: "bg-violet-500/10", titleColor: "text-violet-500" },
            WARNING: { border: "border-amber-500", bg: "bg-amber-500/10", titleColor: "text-amber-500" },
            CAUTION: { border: "border-rose-500", bg: "bg-rose-500/10", titleColor: "text-rose-500" },
          };
          const style = alertStyles[alertType] || alertStyles.NOTE;
          blocks.push(
            <div key={`alert-${i}`} className={`my-6 pl-4 pr-4 py-3 border-l-4 ${style.border} ${style.bg} rounded-r-xl`}>
              <div className={`text-xs font-mono font-bold uppercase tracking-wider ${style.titleColor} mb-1`}>
                {alertType}
              </div>
              <div className="text-secondary text-sm font-sans leading-relaxed">
                {renderFormattedText(alertBody)}
              </div>
            </div>
          );
        } else {
          blocks.push(
            <blockquote key={`quote-${i}`} className="my-6 pl-4 border-l-2 border-dutchOrange text-secondary text-base font-sans bg-dutchOrange/5 py-3 rounded-r-xl">
              {renderFormattedText(quoteText)}
            </blockquote>
          );
        }
        continue;
      }

      // Unordered Lists (- item or * item)
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const listItems: string[] = [];
        while (
          i < lines.length &&
          (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
        ) {
          listItems.push(lines[i].trim().replace(/^[-*]\s+/, ""));
          i++;
        }
        blocks.push(
          <ul key={`ul-${i}`} className="my-4 space-y-2 pl-6 list-disc list-outside text-secondary">
            {listItems.map((item, lIdx) => (
              <li key={lIdx} className="leading-relaxed">
                {renderFormattedText(item)}
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // Ordered Lists (1. item)
      if (/^\d+\.\s+/.test(line.trim())) {
        const listItems: string[] = [];
        while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
          listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
          i++;
        }
        blocks.push(
          <ol key={`ol-${i}`} className="my-4 space-y-2 pl-6 list-decimal list-outside text-secondary">
            {listItems.map((item, lIdx) => (
              <li key={lIdx} className="leading-relaxed">
                {renderFormattedText(item)}
              </li>
            ))}
          </ol>
        );
        continue;
      }

      // Standalone Display Math ($$ ... $$) - single line or multi-line
      if (line.trim().startsWith("$$")) {
        let mathStr = "";
        if (line.trim().endsWith("$$") && line.trim().length > 2) {
          mathStr = line.trim().slice(2, -2).trim();
          i++;
        } else {
          i++;
          const mathLines: string[] = [];
          while (i < lines.length && !lines[i].trim().startsWith("$$")) {
            mathLines.push(lines[i]);
            i++;
          }
          if (i < lines.length && lines[i].trim().startsWith("$$")) {
            i++;
          }
          mathStr = mathLines.join("\n").trim();
        }

        try {
          const html = katex.renderToString(mathStr, { displayMode: true, throwOnError: false });
          blocks.push(
            <div
              key={`math-${i}`}
              className="my-6 p-4 rounded-xl bg-subtle border border-hairline font-mono text-sm overflow-x-auto flex items-center justify-center shadow-inner text-primary"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          blocks.push(
            <pre key={`math-err-${i}`} className="my-4 p-3 rounded bg-subtle font-mono text-xs text-dutchOrange">
              {mathStr}
            </pre>
          );
        }
        continue;
      }

      // Empty line
      if (line.trim() === "") {
        i++;
        continue;
      }

      // Default Paragraph
      const paraLines: string[] = [];
      while (
        i < lines.length &&
        lines[i].trim() !== "" &&
        !lines[i].startsWith("#") &&
        !lines[i].trim().startsWith("- ") &&
        !lines[i].trim().startsWith("* ") &&
        !/^\d+\.\s+/.test(lines[i].trim()) &&
        !lines[i].trim().startsWith("|") &&
        !lines[i].trim().startsWith(">") &&
        !lines[i].trim().startsWith("```") &&
        !lines[i].trim().startsWith("$$") &&
        lines[i].trim() !== "---"
      ) {
        paraLines.push(lines[i]);
        i++;
      }

      if (paraLines.length > 0) {
        blocks.push(
          <p key={`p-${i}`} className="my-4 leading-relaxed font-light text-secondary">
            {renderFormattedText(paraLines.join(" "))}
          </p>
        );
      }
    }

    return blocks;
  };

  return <div className="markdown-content text-base leading-relaxed space-y-2">{renderBlocks()}</div>;
};
