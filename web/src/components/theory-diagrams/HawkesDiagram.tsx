"use client";

import React from "react";

export const HawkesDiagram: React.FC = () => {
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
      {/* axes */}
      <line x1="30" y1="165" x2="380" y2="165" stroke="#22252C" strokeWidth="1.5" />
      <line x1="30" y1="165" x2="30" y2="25" stroke="#22252C" strokeWidth="1.5" />
      <polygon points="380,165 372,161 372,169" fill="#22252C" />
      <polygon points="30,25 26,33 34,33" fill="#22252C" />

      {/* baseline reference */}
      <line x1="30" y1="135" x2="380" y2="135" stroke="#3A3E47" strokeWidth="1" strokeDasharray="2,3" />

      {/* intensity curve: baseline -> spike -> decay -> smaller triggered spike -> decay */}
      <path
        d="M 30 135
           L 95 135
           L 95 40
           C 130 65, 150 95, 168 113
           L 168 75
           C 195 90, 215 110, 245 125
           L 245 135
           L 380 135"
        fill="none"
        stroke="#E8E3DA"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* primary event marker */}
      <circle cx="95" cy="135" r="5" fill="#E05A10" />
      <line x1="95" y1="135" x2="95" y2="165" stroke="#E05A10" strokeWidth="1.2" strokeDasharray="2,2" />

      {/* secondary triggered event marker */}
      <circle cx="168" cy="135" r="4" fill="#E05A10" fillOpacity="0.8" />
      <line x1="168" y1="135" x2="168" y2="165" stroke="#E05A10" strokeWidth="1" strokeDasharray="2,2" opacity="0.7" />

      <text x="95" y="30" fontSize="10" fill="#E05A10" textAnchor="middle" fontFamily="ui-monospace, monospace">t&#8320;</text>
      <text x="168" y="65" fontSize="10" fill="#E05A10" textAnchor="middle" fontFamily="ui-monospace, monospace" opacity="0.85">t&#8321;</text>

      {/* axis labels */}
      <text x="205" y="184" fontSize="9.5" fill="#71717A" textAnchor="middle" letterSpacing="0.5" fontFamily="ui-monospace, monospace">TIME</text>
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
        INTENSITY &#955;(t)
      </text>
    </svg>
  );
};
