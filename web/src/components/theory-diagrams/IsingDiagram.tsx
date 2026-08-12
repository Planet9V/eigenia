"use client";

import React from "react";

const COLS = [40, 87, 134, 181, 228, 275, 322, 369];
const ROWS = [45, 75, 105, 135];

// left half: disordered mix; right half: ordered (mostly up, orange)
const PATTERN: boolean[][] = [
  [true, false, true, false, true, true, true, true],
  [false, true, false, true, true, true, false, true],
  [true, true, false, false, true, true, true, true],
  [false, false, true, true, true, false, true, true],
];

export const IsingDiagram: React.FC = () => {
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
      {/* soft gradient boundary between disordered and ordered halves */}
      <defs>
        <linearGradient id="isingBoundary" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E05A10" stopOpacity="0" />
          <stop offset="100%" stopColor="#E05A10" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <rect x="205" y="25" width="175" height="120" fill="url(#isingBoundary)" />

      {ROWS.map((cy, r) =>
        COLS.map((cx, c) => {
          const up = PATTERN[r][c];
          const ordered = c >= 4;
          const color = ordered ? "#E05A10" : "#A1A1AA";
          const points = up
            ? `${cx - 4},${cy + 4} ${cx + 4},${cy + 4} ${cx},${cy - 5}`
            : `${cx - 4},${cy - 4} ${cx + 4},${cy - 4} ${cx},${cy + 5}`;
          return <polygon key={`${r}-${c}`} points={points} fill={color} opacity={ordered ? 0.95 : 0.65} />;
        })
      )}

      <text x="115" y="175" fontSize="9" fill="#71717A" textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="0.5">
        DISORDERED
      </text>
      <text x="270" y="20" fontSize="9" fill="#E05A10" textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="0.5">
        ORDERED PHASE
      </text>
    </svg>
  );
};
