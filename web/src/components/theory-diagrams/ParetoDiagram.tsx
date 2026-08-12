"use client";

import React from "react";

export const ParetoDiagram: React.FC = () => {
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
      {/* axes */}
      <line x1="30" y1="165" x2="380" y2="165" stroke="#22252C" strokeWidth="1.5" />
      <line x1="30" y1="165" x2="30" y2="20" stroke="#22252C" strokeWidth="1.5" />
      <polygon points="380,165 372,161 372,169" fill="#22252C" />
      <polygon points="30,20 26,28 34,28" fill="#22252C" />

      {/* threshold line */}
      <line x1="230" y1="165" x2="230" y2="35" stroke="#3A3E47" strokeWidth="1" strokeDasharray="2,3" />
      <text x="230" y="28" fontSize="8.5" fill="#71717A" textAnchor="middle" fontFamily="ui-monospace, monospace">THRESHOLD</text>

      {/* shaded black swan region under pareto tail */}
      <path
        d="M 230 112 C 270 122, 310 128, 380 134 L 380 165 L 230 165 Z"
        fill="#E05A10"
        fillOpacity="0.12"
      />

      {/* Gaussian curve (thin tail) */}
      <path
        d="M 40 145 C 90 140, 130 55, 175 42 C 220 55, 250 125, 280 138 C 310 141, 350 142, 380 142"
        fill="none"
        stroke="#71717A"
        strokeWidth="1.6"
        strokeDasharray="3,3"
      />

      {/* Pareto curve (fat tail) */}
      <path
        d="M 40 148 C 80 120, 120 65, 175 38 C 210 55, 230 95, 250 115 C 280 128, 320 132, 380 134"
        fill="none"
        stroke="#E05A10"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      <text x="325" y="118" fontSize="9" fill="#E05A10" fontFamily="ui-monospace, monospace" opacity="0.9">BLACK SWAN</text>

      {/* axis labels */}
      <text x="205" y="184" fontSize="9.5" fill="#71717A" textAnchor="middle" letterSpacing="0.5" fontFamily="ui-monospace, monospace">LOSS MAGNITUDE</text>
      <text
        x="14"
        y="92"
        fontSize="9.5"
        fill="#71717A"
        textAnchor="middle"
        letterSpacing="0.5"
        fontFamily="ui-monospace, monospace"
        transform="rotate(-90 14 92)"
      >
        PROBABILITY
      </text>
    </svg>
  );
};
