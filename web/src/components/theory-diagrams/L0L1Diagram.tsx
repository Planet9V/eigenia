"use client";

import React from "react";

export const L0L1Diagram: React.FC = () => {
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
      {/* axes */}
      <line x1="30" y1="150" x2="380" y2="150" stroke="#22252C" strokeWidth="1.5" />
      <line x1="30" y1="150" x2="30" y2="25" stroke="#22252C" strokeWidth="1.5" />
      <polygon points="380,150 372,146 372,154" fill="#22252C" />
      <polygon points="30,25 26,33 34,33" fill="#22252C" />

      {/* shaded divergence gap between the two curves */}
      <path
        d="M 150 130 C 175 90, 195 55, 220 45 C 235 60, 245 95, 260 125 C 245 100, 225 70, 210 62 C 190 78, 170 105, 150 130 Z"
        fill="#E05A10"
        fillOpacity="0.14"
      />

      {/* L0: Platonic Datasheet (dashed) */}
      <path
        d="M 60 145 C 110 140, 160 90, 200 50 C 240 90, 280 140, 340 145"
        fill="none"
        stroke="#71717A"
        strokeWidth="1.6"
        strokeDasharray="3,3"
      />

      {/* L1: Live Telemetry (solid orange, shifted) */}
      <path
        d="M 60 148 C 120 145, 160 120, 190 60 C 215 105, 245 130, 300 138 C 320 140, 335 141, 350 142"
        fill="none"
        stroke="#E05A10"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      <text x="205" y="182" fontSize="9.5" fill="#71717A" textAnchor="middle" letterSpacing="0.5" fontFamily="ui-monospace, monospace">
        SENSOR VALUE
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
        DENSITY
      </text>

      <text x="200" y="40" fontSize="9" fill="#E05A10" textAnchor="middle" fontFamily="ui-monospace, monospace" fontWeight={700}>
        DRIFT GAP
      </text>
    </svg>
  );
};
