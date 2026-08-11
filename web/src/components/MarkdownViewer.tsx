"use client";

import React from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface MarkdownViewerProps {
  content: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  // Helper to render inline text with KaTeX formulas and bold/italic/links
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
              className="my-3 block overflow-x-auto text-center font-mono py-2 text-zinc-100"
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
              className="inline-block px-1 font-mono text-zinc-100"
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
    // Process markdown formatting: bold (**), italic (*), code (`), links ([text](url))
    const tokens: React.ReactNode[] = [];
    let current = text;
    let counter = 0;

    // Replace bold text **bold**
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match: RegExpExecArray | null;
    let lastIndex = 0;

    while ((match = boldRegex.exec(current)) !== null) {
      if (match.index > lastIndex) {
        tokens.push(current.substring(lastIndex, match.index));
      }
      tokens.push(
        <strong key={`${keyPrefix}-b-${counter++}`} className="font-semibold text-white">
          {match[1]}
        </strong>
      );
      lastIndex = boldRegex.lastIndex;
    }
    if (lastIndex < current.length) {
      tokens.push(current.substring(lastIndex));
    }

    return <React.Fragment key={keyPrefix}>{tokens}</React.Fragment>;
  };

  // Parse lines into blocks (Headings, Paragraphs, Lists, Tables, CodeBlocks, Blockquotes, HR)
  const renderBlocks = () => {
    const lines = content.split("\n");
    const blocks: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Code blocks (```)
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
        blocks.push(<hr key={`hr-${i}`} className="my-10 border-zinc-900" />);
        i++;
        continue;
      }

      // Headings
      if (line.startsWith("# ")) {
        blocks.push(
          <h1 key={`h1-${i}`} className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mt-12 mb-6 pt-6 border-t border-zinc-900/60">
            {renderFormattedText(line.replace("# ", ""))}
          </h1>
        );
        i++;
        continue;
      }
      if (line.startsWith("## ")) {
        blocks.push(
          <h2 key={`h2-${i}`} className="font-serif text-xl sm:text-2xl text-white font-normal tracking-tight mt-10 mb-4 pt-6 border-t border-zinc-900/60">
            {renderFormattedText(line.replace("## ", ""))}
          </h2>
        );
        i++;
        continue;
      }
      if (line.startsWith("### ")) {
        blocks.push(
          <h3 key={`h3-${i}`} className="font-sans text-lg sm:text-xl text-white font-semibold tracking-tight mt-8 mb-3">
            {renderFormattedText(line.replace("### ", ""))}
          </h3>
        );
        i++;
        continue;
      }
      if (line.startsWith("#### ")) {
        blocks.push(
          <h4 key={`h4-${i}`} className="font-sans text-base sm:text-lg text-white font-medium tracking-tight mt-6 mb-2">
            {renderFormattedText(line.replace("#### ", ""))}
          </h4>
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
            <div key={`table-${i}`} className="my-8 overflow-x-auto rounded-xl border border-[#22252c] bg-[#0d0e11] shadow-lg">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#15171c] border-b border-zinc-800 text-white font-mono uppercase tracking-wider">
                    {header.map((col, cIdx) => (
                      <th key={cIdx} className="p-3 font-semibold border-r border-zinc-800 last:border-r-0">
                        {renderFormattedText(col)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-300">
                  {body.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-zinc-900/40 transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-3 border-r border-zinc-900 last:border-r-0">
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
        blocks.push(
          <blockquote key={`quote-${i}`} className="my-6 pl-4 border-l-2 border-dutchOrange text-zinc-300 text-base font-sans bg-dutchOrange/5 py-3 rounded-r-xl">
            {renderFormattedText(quoteLines.join(" "))}
          </blockquote>
        );
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
          <ul key={`ul-${i}`} className="my-4 space-y-2 pl-6 list-disc list-outside text-zinc-300">
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
          <ol key={`ol-${i}`} className="my-4 space-y-2 pl-6 list-decimal list-outside text-zinc-300">
            {listItems.map((item, lIdx) => (
              <li key={lIdx} className="leading-relaxed">
                {renderFormattedText(item)}
              </li>
            ))}
          </ol>
        );
        continue;
      }

      // Standalone Display Math ($$ ... $$)
      if (line.trim().startsWith("$$") && line.trim().endsWith("$$") && line.trim().length > 4) {
        const mathStr = line.trim().slice(2, -2).trim();
        try {
          const html = katex.renderToString(mathStr, { displayMode: true, throwOnError: false });
          blocks.push(
            <div
              key={`math-${i}`}
              className="my-6 p-4 rounded-xl bg-[#0b0c0e] border border-zinc-800/80 font-mono text-sm overflow-x-auto flex items-center justify-center shadow-inner"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          blocks.push(
            <pre key={`math-err-${i}`} className="my-4 p-3 rounded bg-zinc-900 font-mono text-xs text-dutchOrange">
              {line}
            </pre>
          );
        }
        i++;
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
          <p key={`p-${i}`} className="my-4 leading-relaxed font-light text-zinc-300">
            {renderFormattedText(paraLines.join(" "))}
          </p>
        );
      }
    }

    return blocks;
  };

  return <div className="markdown-content text-base leading-relaxed space-y-2">{renderBlocks()}</div>;
};
