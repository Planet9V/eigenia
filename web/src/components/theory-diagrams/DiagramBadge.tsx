"use client";

import React from "react";

interface DiagramBadgeProps {
  line1: string;
  line2: string;
}

export const DiagramBadge: React.FC<DiagramBadgeProps> = ({ line1, line2 }) => {
  return (
    <div className="absolute bottom-2.5 right-3 text-right font-mono pointer-events-none">
      <div className="text-[10px] font-bold text-dutchOrange">{line1}</div>
      <div className="text-[9px] text-zinc-400 mt-0.5">{line2}</div>
    </div>
  );
};
