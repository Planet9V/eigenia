"use client";

import React from "react";

export const SCurveDiagram: React.FC = () => {
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
      {/* axes */}
      <line x1="30" y1="215" x2="380" y2="215" stroke="#22252C" strokeWidth="1.5" />
      <line x1="30" y1="215" x2="30" y2="30" stroke="#22252C" strokeWidth="1.5" />
      <polygon points="380,215 372,211 372,219" fill="#22252C" />
      <polygon points="30,30 26,38 34,38" fill="#22252C" />

      {/* critical point x_c */}
      <line x1="205" y1="215" x2="205" y2="45" stroke="#E05A10" strokeWidth="1.2" strokeDasharray="3,3" />
      <text x="205" y="38" fontSize="11" fill="#E05A10" textAnchor="middle" fontWeight={700} fontFamily="ui-monospace, monospace">
        x_c
      </text>

      {/* sigmoid curve */}
      <path
        d="M 40 200 C 100 198, 150 196, 180 185 C 200 175, 210 90, 230 65 C 260 45, 310 42, 370 40"
        fill="none"
        stroke="#E05A10"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* region labels */}
      <text x="105" y="192" fontSize="8.5" fill="#71717A" textAnchor="middle" letterSpacing="0.4" fontFamily="ui-monospace, monospace">
        APPARENT CALM
      </text>
      <text x="215" y="130" fontSize="8.5" fill="#71717A" textAnchor="middle" letterSpacing="0.4" fontFamily="ui-monospace, monospace" transform="rotate(-62 215 130)">
        RAPID TRANSITION
      </text>
      <text x="310" y="55" fontSize="8.5" fill="#71717A" textAnchor="middle" letterSpacing="0.4" fontFamily="ui-monospace, monospace">
        COLLAPSE
      </text>

      {/* axis labels */}
      <text x="205" y="238" fontSize="9.5" fill="#71717A" textAnchor="middle" letterSpacing="0.5" fontFamily="ui-monospace, monospace">
        ADVERSARY PERTURBATION / WEAR
      </text>
      <text
        x="14"
        y="122"
        fontSize="9.5"
        fill="#71717A"
        textAnchor="middle"
        letterSpacing="0.5"
        fontFamily="ui-monospace, monospace"
        transform="rotate(-90 14 122)"
      >
        SYSTEM STABILITY
      </text>
    </svg>
  );
};
