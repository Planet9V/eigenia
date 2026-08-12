"use client";

import React from "react";

export const GgnnDiagram: React.FC = () => {
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
      {/* edges into the highlighted node */}
      <line x1="70" y1="65" x2="188" y2="72" stroke="#E05A10" strokeWidth="1.6" />
      <polygon points="192,73 184,69 184,77" fill="#E05A10" />
      <line x1="140" y1="45" x2="188" y2="70" stroke="#E05A10" strokeWidth="1.6" />
      <polygon points="192,72 184,68 185,76" fill="#E05A10" />
      <line x1="110" y1="120" x2="192" y2="82" stroke="#E05A10" strokeWidth="1.6" />
      <polygon points="196,80 188,80 190,88" fill="#E05A10" />

      {/* edges out of the highlighted node */}
      <line x1="212" y1="72" x2="290" y2="48" stroke="#71717A" strokeWidth="1.3" />
      <polygon points="294,46 286,47 289,54" fill="#71717A" />
      <line x1="216" y1="80" x2="270" y2="118" stroke="#71717A" strokeWidth="1.3" />
      <polygon points="274,121 266,119 269,112" fill="#71717A" />
      <line x1="278" y1="122" x2="330" y2="105" stroke="#71717A" strokeWidth="1.1" opacity="0.8" />
      <polygon points="334,103 326,104 328,111" fill="#71717A" opacity="0.8" />

      {/* peripheral nodes */}
      <circle cx="60" cy="60" r="9" fill="none" stroke="#E8E3DA" strokeWidth="1.5" />
      <circle cx="140" cy="40" r="9" fill="none" stroke="#E8E3DA" strokeWidth="1.5" />
      <circle cx="105" cy="122" r="9" fill="none" stroke="#E8E3DA" strokeWidth="1.5" />
      <circle cx="298" cy="42" r="8" fill="none" stroke="#71717A" strokeWidth="1.3" />
      <circle cx="278" cy="126" r="8" fill="none" stroke="#71717A" strokeWidth="1.3" />
      <circle cx="338" cy="100" r="7" fill="none" stroke="#71717A" strokeWidth="1.1" opacity="0.8" />

      {/* highlighted GRU-update node */}
      <circle cx="202" cy="76" r="13" fill="#E05A10" fillOpacity="0.18" stroke="#E05A10" strokeWidth="2" />
      <circle cx="202" cy="76" r="4" fill="#E05A10" />

      <text x="202" y="30" fontSize="9" fill="#E05A10" textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="0.5">
        GRU UPDATE
      </text>
    </svg>
  );
};
