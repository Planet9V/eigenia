"use client";

import React from "react";

export const LacanDiagram: React.FC = () => {
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
      {/* RSI triangle, kept clear of the bottom-right badge zone */}
      <polygon
        points="190,25 95,125 260,125"
        fill="none"
        stroke="#71717A"
        strokeWidth="1.4"
      />

      <text x="190" y="17" fontSize="10" fill="#E8E3DA" textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="0.5">
        REAL
      </text>
      <text x="80" y="140" fontSize="10" fill="#E8E3DA" textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="0.5">
        SYMBOLIC
      </text>
      <text x="270" y="140" fontSize="10" fill="#E8E3DA" textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="0.5">
        IMAGINARY
      </text>

      {/* faint background tensor cube hint */}
      <polygon points="145,88 190,75 235,88 190,101" fill="none" stroke="#3A3E47" strokeWidth="1" />
      <line x1="145" y1="88" x2="145" y2="65" stroke="#3A3E47" strokeWidth="1" />
      <line x1="235" y1="88" x2="235" y2="65" stroke="#3A3E47" strokeWidth="1" />
      <line x1="190" y1="101" x2="190" y2="78" stroke="#3A3E47" strokeWidth="1" />
      <polygon points="145,65 190,52 235,65 190,78" fill="none" stroke="#3A3E47" strokeWidth="1" />

      {/* vector piercing through center to the target */}
      <line x1="190" y1="95" x2="195" y2="115" stroke="#E05A10" strokeWidth="1.8" strokeDasharray="3,3" opacity="0.9" />
      <polygon points="195,115 190,107 200,108" fill="#E05A10" opacity="0.9" />
      <circle cx="195" cy="115" r="5" fill="#E05A10" />
      <circle cx="190" cy="85" r="3" fill="#E8E3DA" />

      <text x="20" y="30" fontSize="8.5" fill="#71717A" fontFamily="ui-monospace, monospace" letterSpacing="0.4">
        ADVERSARY TARGET PROFILE
      </text>
    </svg>
  );
};
