"use client";

import React from "react";

export const AleDiagram: React.FC = () => {
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
      {/* axes */}
      <line x1="35" y1="165" x2="380" y2="165" stroke="#22252C" strokeWidth="1.5" />
      <line x1="35" y1="165" x2="35" y2="25" stroke="#22252C" strokeWidth="1.5" />
      <polygon points="380,165 372,161 372,169" fill="#22252C" />
      <polygon points="35,25 31,33 39,33" fill="#22252C" />

      {/* EP exceedance curve (monotonic decreasing, convex) */}
      <path
        d="M 45 45 C 90 65, 120 95, 150 115 C 185 138, 230 150, 280 157 C 320 161, 350 163, 375 164"
        fill="none"
        stroke="#E8E3DA"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* attachment point guide lines */}
      <line x1="190" y1="165" x2="190" y2="127" stroke="#E05A10" strokeWidth="1.2" strokeDasharray="3,3" />
      <line x1="35" y1="127" x2="190" y2="127" stroke="#E05A10" strokeWidth="1.2" strokeDasharray="3,3" />
      <circle cx="190" cy="127" r="5" fill="#E05A10" />
      <text x="196" y="118" fontSize="9" fill="#E05A10" fontWeight={700} fontFamily="ui-monospace, monospace">
        ATTACHMENT POINT
      </text>

      {/* axis labels */}
      <text x="207" y="184" fontSize="9.5" fill="#71717A" textAnchor="middle" letterSpacing="0.5" fontFamily="ui-monospace, monospace">
        LOSS AMOUNT
      </text>
      <text
        x="16"
        y="95"
        fontSize="9.5"
        fill="#71717A"
        textAnchor="middle"
        letterSpacing="0.5"
        fontFamily="ui-monospace, monospace"
        transform="rotate(-90 16 95)"
      >
        P(EXCEEDANCE)
      </text>
    </svg>
  );
};
