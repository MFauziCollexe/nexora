"use client";

import { donutData } from "@/data/dashboard";

export function DonutChart() {
  const cx = 65, cy = 65, r = 48, inner = 30;
  let angle = -90;

  const slices = donutData.map((d) => {
    const startAngle = angle;
    const sweep = (d.pct / 100) * 360;
    angle += sweep;
    const endAngle = angle;
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const xi1 = cx + inner * Math.cos(toRad(startAngle));
    const yi1 = cy + inner * Math.sin(toRad(startAngle));
    const xi2 = cx + inner * Math.cos(toRad(endAngle));
    const yi2 = cy + inner * Math.sin(toRad(endAngle));
    const large = sweep > 180 ? 1 : 0;
    return (
      <path key={d.label}
        d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${xi2} ${yi2} A ${inner} ${inner} 0 ${large} 0 ${xi1} ${yi1} Z`}
        fill={d.color}
      />
    );
  });

  return (
    <div className="flex items-center gap-4">
      <svg width="130" height="130" viewBox="0 0 130 130" className="flex-shrink-0">
        {slices}
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="8" fill="#64748b">Total Revenue</text>
        <text x={cx} y={cy + 8} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e293b">Rp 1.250 M</text>
      </svg>
      <div className="space-y-1.5 flex-1">
        {donutData.map((d) => (
          <div key={d.label} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }}/>
            <span className="text-[11px] text-slate-600 flex-1">{d.label}</span>
            <span className="text-[10px] text-slate-400">{d.pct}%</span>
            <span className="text-[11px] text-slate-700 font-semibold">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
