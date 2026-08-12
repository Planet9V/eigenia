"use client";

import React from "react";

// scatter points clustering toward the lower-tail corner (u,v both small)
const POINTS: [number, number][] = [
  [0.06, 0.05], [0.08, 0.11], [0.04, 0.09], [0.11, 0.06], [0.09, 0.15],
  [0.14, 0.09], [0.05, 0.14], [0.16, 0.13], [0.03, 0.04], [0.12, 0.18],
  [0.19, 0.08], [0.07, 0.20], [0.22, 0.15], [0.17, 0.22], [0.25, 0.10],
  [0.10, 0.25], [0.28, 0.18], [0.20, 0.28], [0.32, 0.14], [0.15, 0.32],
  [0.38, 0.22], [0.24, 0.40], [0.45, 0.30], [0.30, 0.48], [0.55, 0.38],
  [0.60, 0.55], [0.70, 0.62], [0.75, 0.72], [0.85, 0.80], [0.90, 0.88],
  [0.65, 0.85], [0.82, 0.60],
];

const X0 = 40, X1 = 370, Y0 = 155, Y1 = 25;

export const ClaytonDiagram: React.FC = () => {
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
      {/* unit square axes */}
      <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke="#22252C" strokeWidth="1.5" />
      <line x1={X0} y1={Y0} x2={X0} y2={Y1} stroke="#22252C" strokeWidth="1.5" />
      <polygon points={`${X1},${Y0} ${X1 - 8},${Y0 - 4} ${X1 - 8},${Y0 + 4}`} fill="#22252C" />
      <polygon points={`${X0},${Y1} ${X0 - 4},${Y1 + 8} ${X0 + 4},${Y1 + 8}`} fill="#22252C" />

      {/* lower-tail cluster highlight */}
      <circle cx={X0 + 0.11 * (X1 - X0)} cy={Y0 - 0.11 * (Y0 - Y1)} r="26" fill="#E05A10" fillOpacity="0.12" stroke="#E05A10" strokeWidth="1" strokeDasharray="2,2" />

      {POINTS.map(([u, v], i) => (
        <circle
          key={i}
          cx={X0 + u * (X1 - X0)}
          cy={Y0 - v * (Y0 - Y1)}
          r="3"
          fill={u < 0.3 && v < 0.3 ? "#E05A10" : "#71717A"}
          opacity={u < 0.3 && v < 0.3 ? 0.9 : 0.55}
        />
      ))}

      <text x={X0 - 8} y={Y0 + 14} fontSize="9" fill="#71717A" fontFamily="ui-monospace, monospace">0</text>
      <text x={X1 - 6} y={Y0 + 14} fontSize="9" fill="#71717A" fontFamily="ui-monospace, monospace">u</text>
      <text x={X0 - 10} y={Y1 + 4} fontSize="9" fill="#71717A" fontFamily="ui-monospace, monospace">v</text>

      <text x="120" y="178" fontSize="9" fill="#E05A10" fontFamily="ui-monospace, monospace" letterSpacing="0.4" fontWeight={700}>
        JOINT TAIL RISK
      </text>
    </svg>
  );
};
