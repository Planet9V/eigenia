"use client";

import React from "react";

export const KramersDiagram: React.FC = () => {
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
      {/* axes */}
      <line x1="40" y1="165" x2="370" y2="165" stroke="#22252C" strokeWidth="1.5" />
      <line x1="40" y1="165" x2="40" y2="20" stroke="#22252C" strokeWidth="1.5" />
      <polygon points="370,165 362,161 362,169" fill="#22252C" />
      <polygon points="40,20 36,28 44,28" fill="#22252C" />

      {/* reference level for left well (dashed) */}
      <line x1="55" y1="140" x2="185" y2="140" stroke="#3A3E47" strokeWidth="1" strokeDasharray="2,3" />

      {/* delta-E double-headed indicator */}
      <line x1="192" y1="140" x2="192" y2="48" stroke="#E05A10" strokeWidth="1.2" strokeDasharray="3,3" />
      <polygon points="192,140 189,133 195,133" fill="#E05A10" />
      <polygon points="192,48 189,55 195,55" fill="#E05A10" />
      <text x="199" y="97" fontSize="11" fill="#E05A10" fontWeight={700} fontFamily="ui-monospace, monospace">
        &#x394;E
      </text>

      {/* potential curve: left well -> barrier -> shallower right well */}
      <path
        d="M 60 140 C 90 143, 115 143, 140 132 C 165 118, 175 60, 190 48 C 205 60, 225 105, 250 128 C 268 143, 285 138, 305 125 C 325 113, 345 112, 360 114"
        fill="none"
        stroke="#E8E3DA"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* escape path */}
      <path
        d="M 68 133 Q 190 18 300 122"
        fill="none"
        stroke="#E05A10"
        strokeWidth="1.6"
        strokeDasharray="4,4"
        opacity={0.85}
      />
      <polygon points="300,122 291,119 295,128" fill="#E05A10" opacity={0.85} />

      {/* particle resting in left well */}
      <circle cx="68" cy="133" r="6" fill="#E05A10" />

      {/* axis labels */}
      <text
        x="205"
        y="184"
        fontSize="9.5"
        fill="#71717A"
        textAnchor="middle"
        letterSpacing="0.5"
        fontFamily="ui-monospace, monospace"
      >
        REACTION COORDINATE
      </text>
      <text
        x="14"
        y="95"
        fontSize="9.5"
        fill="#71717A"
        textAnchor="middle"
        letterSpacing="0.5"
        fontFamily="ui-monospace, monospace"
        transform="rotate(-90 14 95)"
      >
        POTENTIAL ENERGY
      </text>
    </svg>
  );
};
