"use client";

import React from "react";

const statCards = [
  {
    label: "Total Sales (This Month)", value: "Rp 1.250.000.000", pct: "+12.5%",
    iconBg: "bg-blue-100", iconColor: "text-blue-600",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  },
  {
    label: "Total Purchase (This Month)", value: "Rp 850.000.000", pct: "+8.3%",
    iconBg: "bg-emerald-100", iconColor: "text-emerald-600",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>,
  },
  {
    label: "Inventory Value", value: "Rp 2.450.000.000", pct: "+5.7%",
    iconBg: "bg-purple-100", iconColor: "text-purple-600",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>,
  },
  {
    label: "Total Profit (This Month)", value: "Rp 400.000.000", pct: "+15.9%",
    iconBg: "bg-orange-100", iconColor: "text-orange-500",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  },
];

const salesData = [
  { date: "Mei 4",  value: 280  }, { date: "Mei 6",  value: 320  },
  { date: "Mei 8",  value: 370  }, { date: "Mei 11", value: 440  },
  { date: "Mei 18", value: 530  }, { date: "Mei 25", value: 640  },
  { date: "Jun 1",  value: 720  }, { date: "Jun 5",  value: 840  },
  { date: "Jun 8",  value: 960  }, { date: "Jun 10", value: 1250 },
];

const topProducts = [
  { name: "Produk A", qty: 1250, revenue: "Rp 250.000.000", color: "#6366f1" },
  { name: "Produk B", qty: 980,  revenue: "Rp 196.000.000", color: "#a855f7" },
  { name: "Produk C", qty: 750,  revenue: "Rp 150.000.000", color: "#ec4899" },
  { name: "Produk D", qty: 610,  revenue: "Rp 122.000.000", color: "#f97316" },
  { name: "Produk E", qty: 430,  revenue: "Rp 86.000.000",  color: "#eab308" },
];

const activities = [
  { color: "bg-blue-500",   title: "Sales Order #SO-2026-0001",    sub: "New sales order created",      time: "10:30 AM"  },
  { color: "bg-purple-500", title: "Purchase Order #PO-2026-0001", sub: "New purchase order created",   time: "09:45 AM"  },
  { color: "bg-green-500",  title: "Goods Received #GR-2026-0001", sub: "Goods received from supplier", time: "09:20 AM"  },
  { color: "bg-yellow-400", title: "Payment Received",             sub: "Payment from PT. Maju Jaya",   time: "08:15 AM"  },
  { color: "bg-red-400",    title: "Inventory Adjustment",         sub: "Inventory has been adjusted",  time: "Yesterday" },
];

const donutData = [
  { label: "Sales",      pct: 40, value: "Rp 1.250.000.000", color: "#3b82f6" },
  { label: "Purchase",   pct: 27, value: "Rp 850.000.000",   color: "#a855f7" },
  { label: "Inventory",  pct: 20, value: "Rp 625.000.000",   color: "#10b981" },
  { label: "Production", pct: 8,  value: "Rp 250.000.000",   color: "#f97316" },
  { label: "Others",     pct: 5,  value: "Rp 125.000.000",   color: "#94a3b8" },
];

const tasks = [
  { label: "Approve Purchase Order", sub: "3 orders pending",       badge: 3,    badgeColor: "bg-red-500",    done: false },
  { label: "Stock Opname",           sub: "Schedule for this month", badge: 1,    badgeColor: "bg-yellow-400", done: false },
  { label: "AR Collection",          sub: "5 invoices are overdue",  badge: 5,    badgeColor: "bg-red-500",    done: false },
  { label: "Monthly Closing",        sub: "Finance closing process", badge: null, badgeColor: "",              done: true  },
];

// ── Stat Card ──
function StatCard({ label, value, pct, iconBg, iconColor, icon }: {
  label: string; value: string; pct: string;
  iconBg: string; iconColor: string; icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 flex items-center gap-3">
      <div className={`${iconBg} ${iconColor} w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-[10px] text-slate-500 leading-tight">{label}</div>
        <div className="text-[12px] font-bold text-slate-800 mt-0.5 leading-tight">{value}</div>
        <div className="flex items-center gap-1 mt-0.5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-2.5 h-2.5 text-emerald-500">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
          <span className="text-[10px] font-semibold text-emerald-600">{pct}</span>
          <span className="text-[9px] text-slate-400">vs last month</span>
        </div>
      </div>
    </div>
  );
}

// ── Sales Chart ──
function SalesChart() {
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

// ── Donut Chart ──
function DonutChart() {
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

// ── Cash Flow Mini Line ──
function CashFlowLine() {
  const pts = [20, 22, 21, 25, 23, 27, 26, 30, 29, 33, 31, 35];
  const W = 100, H = 36;
  const min = Math.min(...pts), max = Math.max(...pts);
  const points = pts.map((v, i) => {
    const x = (i / (pts.length - 1)) * W;
    const y = H - ((v - min) / (max - min)) * (H * 0.7) - H * 0.15;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-9">
      <polyline points={points} fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

// ── HALAMAN UTAMA ──
export default function DashboardPage() {
  return (
    <div className="p-4 space-y-3">

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-3">
        {statCards.map((c) => <StatCard key={c.label} {...c}/>)}
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px_220px] gap-3">

        {/* Sales Chart */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[12px] font-semibold text-slate-800">Sales Overview</h3>
            <span className="text-[11px] border border-slate-200 rounded-lg px-2 py-0.5 text-slate-600 cursor-pointer">This Month ▾</span>
          </div>
          <SalesChart/>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[12px] font-semibold text-slate-800">Top Selling Products</h3>
            <button className="text-[11px] text-blue-600 font-medium">View All</button>
          </div>
          <div className="grid grid-cols-3 text-[10px] text-slate-400 font-semibold uppercase pb-1.5 border-b border-slate-100">
            <span>Product</span><span className="text-center">Qty</span><span className="text-right">Revenue</span>
          </div>
          {topProducts.map((p) => (
            <div key={p.name} className="grid grid-cols-3 items-center py-1.5 border-b border-slate-50">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded flex-shrink-0" style={{ backgroundColor: p.color + "40" }}/>
                <span className="text-[11px] font-medium text-slate-700">{p.name}</span>
              </div>
              <span className="text-[11px] text-slate-500 text-center">{p.qty.toLocaleString()}</span>
              <span className="text-[10px] font-semibold text-slate-700 text-right">{p.revenue}</span>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[12px] font-semibold text-slate-800">Recent Activities</h3>
            <button className="text-[11px] text-blue-600 font-medium">View All</button>
          </div>
          <div className="space-y-2.5">
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className={`${a.color} w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-3 h-3">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-slate-700 truncate">{a.title}</p>
                  <p className="text-[10px] text-slate-400">{a.sub}</p>
                </div>
                <span className="text-[10px] text-slate-400 flex-shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_240px] gap-3">

        {/* Business Overview */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
          <h3 className="text-[12px] font-semibold text-slate-800 mb-2">Business Overview</h3>
          <DonutChart/>
        </div>

        {/* Cash Flow */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[12px] font-semibold text-slate-800">Cash Flow</h3>
            <span className="text-[11px] border border-slate-200 rounded-lg px-2 py-0.5 text-slate-600">This Month ▾</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
              <div>
                <p className="text-[10px] text-slate-500">Cash In</p>
                <p className="text-[13px] font-bold text-blue-600 mt-0.5">Rp 1.650.000.000</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" className="w-3.5 h-3.5">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
              <div>
                <p className="text-[10px] text-slate-500">Cash Out</p>
                <p className="text-[13px] font-bold text-red-500 mt-0.5">Rp 1.050.000.000</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" className="w-3.5 h-3.5">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-100">
              <p className="text-[10px] text-slate-500">Net Cash Flow</p>
              <p className="text-[13px] font-bold text-blue-600 mt-0.5">Rp 600.000.000</p>
              <CashFlowLine/>
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[12px] font-semibold text-slate-800">Tasks & Reminders</h3>
            <button className="text-[11px] text-blue-600 font-medium">View All</button>
          </div>
          <div className="space-y-1.5">
            {tasks.map((t, i) => (
              <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                <div className={`w-3.5 h-3.5 rounded border-2 flex-shrink-0 flex items-center justify-center
                  ${t.done ? "bg-green-500 border-green-500" : "border-slate-300"}`}>
                  {t.done && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-2 h-2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[11px] font-semibold leading-tight ${t.done ? "text-slate-400 line-through" : "text-slate-700"}`}>
                    {t.label}
                  </p>
                  <p className="text-[10px] text-slate-400 leading-tight">{t.sub}</p>
                </div>
                {t.badge && (
                  <span className={`${t.badgeColor} text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0`}>
                    {t.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}