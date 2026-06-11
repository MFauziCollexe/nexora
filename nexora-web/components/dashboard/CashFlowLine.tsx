"use client";

import { cashFlowPoints } from "@/data/dashboard";

export function CashFlowLine() {
  const W = 100, H = 36;
  const min = Math.min(...cashFlowPoints), max = Math.max(...cashFlowPoints);
  const points = cashFlowPoints.map((v, i) => {
    const x = (i / (cashFlowPoints.length - 1)) * W;
    const y = H - ((v - min) / (max - min)) * (H * 0.7) - H * 0.15;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-9">
      <polyline points={points} fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}
