"use client";

import { salesData } from "@/data/dashboard";

export function SalesChart() {
  const W = 460, H = 160;
  const padL = 36, padR = 10, padT = 12, padB = 24;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const maxVal = 1300;

  const xPos = (i: number) => padL + (i / (salesData.length - 1)) * chartW;
  const yPos = (v: number) => padT + chartH - (v / maxVal) * chartH;

  const linePath = salesData.map((d, i) => `${i === 0 ? "M" : "L"} ${xPos(i)} ${yPos(d.value)}`).join(" ");
  const areaPath = linePath + ` L ${xPos(salesData.length - 1)} ${H - padB} L ${xPos(0)} ${H - padB} Z`;
  const yLabels = ["0", "200M", "400M", "600M", "800M", "1B", "1.2B"];
  const yVals   = [0, 200, 400, 600, 800, 1000, 1200];

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#dbeafe" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.05"/>
        </linearGradient>
      </defs>
      {yVals.map((v, i) => (
        <g key={v}>
          <line x1={padL} y1={yPos(v)} x2={W - padR} y2={yPos(v)} stroke="#f1f5f9" strokeWidth="1"/>
          <text x={padL - 3} y={yPos(v) + 3} textAnchor="end" fontSize="8" fill="#94a3b8">{yLabels[i]}</text>
        </g>
      ))}
      <path d={areaPath} fill="url(#areaGrad)"/>
      <path d={linePath} fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinejoin="round"/>
      {salesData.map((d, i) => (
        <circle key={i} cx={xPos(i)} cy={yPos(d.value)} r="2.5" fill="white" stroke="#3b82f6" strokeWidth="1.5"/>
      ))}
      {salesData.map((d, i) => (
        <text key={i} x={xPos(i)} y={H - 5} textAnchor="middle" fontSize="8" fill="#94a3b8">{d.date}</text>
      ))}
    </svg>
  );
}
