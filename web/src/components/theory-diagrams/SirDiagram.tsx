"use client";

import React from "react";

export const SirDiagram: React.FC = () => {
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
      {/* S box */}
      <rect x="20" y="45" width="100" height="65" rx="8" fill="none" stroke="#E8E3DA" strokeWidth="1.5" />
      <text x="70" y="85" fontSize="19" fill="#E8E3DA" textAnchor="middle" fontWeight={700} fontFamily="ui-monospace, monospace">S</text>
      <text x="70" y="128" fontSize="8.5" fill="#71717A" textAnchor="middle" letterSpacing="0.5" fontFamily="ui-monospace, monospace">SUSCEPTIBLE</text>

      {/* I box */}
      <rect x="150" y="45" width="100" height="65" rx="8" fill="#E05A10" fillOpacity="0.15" stroke="#E05A10" strokeWidth="1.5" />
      <text x="200" y="85" fontSize="19" fill="#E05A10" textAnchor="middle" fontWeight={700} fontFamily="ui-monospace, monospace">I</text>
      <text x="200" y="128" fontSize="8.5" fill="#71717A" textAnchor="middle" letterSpacing="0.5" fontFamily="ui-monospace, monospace">INFECTED</text>

      {/* R box */}
      <rect x="280" y="45" width="100" height="65" rx="8" fill="none" stroke="#71717A" strokeWidth="1.5" />
      <text x="330" y="85" fontSize="19" fill="#A1A1AA" textAnchor="middle" fontWeight={700} fontFamily="ui-monospace, monospace">R</text>
      <text x="330" y="128" fontSize="8.5" fill="#71717A" textAnchor="middle" letterSpacing="0.5" fontFamily="ui-monospace, monospace">RECOVERED</text>

      {/* S -> I arrow */}
      <line x1="120" y1="78" x2="146" y2="78" stroke="#E8E3DA" strokeWidth="1.8" />
      <polygon points="150,78 142,74 142,82" fill="#E8E3DA" />
      <text x="133" y="63" fontSize="12" fill="#E05A10" textAnchor="middle" fontStyle="italic" fontFamily="ui-monospace, monospace">&#946;</text>

      {/* I -> R arrow */}
      <line x1="250" y1="78" x2="276" y2="78" stroke="#E8E3DA" strokeWidth="1.8" />
      <polygon points="280,78 272,74 272,82" fill="#E8E3DA" />
      <text x="263" y="63" fontSize="12" fill="#E05A10" textAnchor="middle" fontStyle="italic" fontFamily="ui-monospace, monospace">&#947;</text>
    </svg>
  );
};
