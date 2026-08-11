"use client";

import React from "react";
import katex from "katex";

interface MathFormulaProps {
  formula: string;
  inline?: boolean;
  className?: string;
}

export const MathFormula: React.FC<MathFormulaProps> = ({
  formula,
  inline = false,
  className = "",
}) => {
  const html = React.useMemo(() => {
    try {
      return katex.renderToString(formula, {
        displayMode: !inline,
        throwOnError: false,
      });
    } catch (err) {
      console.error("KaTeX rendering error:", err);
      return formula;
    }
  }, [formula, inline]);

  return (
    <div
      className={`katex-wrapper ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
