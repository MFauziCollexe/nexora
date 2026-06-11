"use client";

import { statCards, topProducts, activities, tasks } from "@/data/dashboard";
import { StatCard } from "@/components/dashboard/StatCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { CashFlowLine } from "@/components/dashboard/CashFlowLine";
import { DocIcon, CheckIcon } from "@/components/ui/Icons";

export function DashboardPage() {
  return (
    <div className="p-4 space-y-3">

      <div className="grid grid-cols-4 gap-3">
        {statCards.map((c) => <StatCard key={c.label} {...c}/>)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px_220px] gap-3">

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm dark:shadow-slate-900/30 p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[12px] font-semibold text-slate-800 dark:text-slate-100">Sales Overview</h3>
            <span className="text-[11px] border border-slate-200 dark:border-slate-600 rounded-lg px-2 py-0.5 text-slate-600 dark:text-slate-400 cursor-pointer">This Month ▾</span>
          </div>
          <SalesChart />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm dark:shadow-slate-900/30 p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[12px] font-semibold text-slate-800 dark:text-slate-100">Top Selling Products</h3>
            <button className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">View All</button>
          </div>
          <div className="grid grid-cols-3 text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase pb-1.5 border-b border-slate-100 dark:border-slate-700">
            <span>Product</span><span className="text-center">Qty</span><span className="text-right">Revenue</span>
          </div>
          {topProducts.map((p) => (
            <div key={p.name} className="grid grid-cols-3 items-center py-1.5 border-b border-slate-50 dark:border-slate-700/50">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded flex-shrink-0" style={{ backgroundColor: p.color + "40" }}/>
                <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">{p.name}</span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 text-center">{p.qty.toLocaleString()}</span>
              <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 text-right">{p.revenue}</span>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm dark:shadow-slate-900/30 p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[12px] font-semibold text-slate-800 dark:text-slate-100">Recent Activities</h3>
            <button className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">View All</button>
          </div>
          <div className="space-y-2.5">
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className={`${a.color} w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0`}>
                  <DocIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate">{a.title}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">{a.sub}</p>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 flex-shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_240px] gap-3">

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm dark:shadow-slate-900/30 p-3">
          <h3 className="text-[12px] font-semibold text-slate-800 dark:text-slate-100 mb-2">Business Overview</h3>
          <DonutChart />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm dark:shadow-slate-900/30 p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[12px] font-semibold text-slate-800 dark:text-slate-100">Cash Flow</h3>
            <span className="text-[11px] border border-slate-200 dark:border-slate-600 rounded-lg px-2 py-0.5 text-slate-600 dark:text-slate-400">This Month ▾</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Cash In</p>
                <p className="text-[13px] font-bold text-blue-600 dark:text-blue-400 mt-0.5">Rp 1.650.000.000</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" className="w-3.5 h-3.5">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Cash Out</p>
                <p className="text-[13px] font-bold text-red-500 dark:text-red-400 mt-0.5">Rp 1.050.000.000</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" className="w-3.5 h-3.5">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-700">
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Net Cash Flow</p>
              <p className="text-[13px] font-bold text-blue-600 dark:text-blue-400 mt-0.5">Rp 600.000.000</p>
              <CashFlowLine />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm dark:shadow-slate-900/30 p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[12px] font-semibold text-slate-800 dark:text-slate-100">Tasks & Reminders</h3>
            <button className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">View All</button>
          </div>
          <div className="space-y-1.5">
            {tasks.map((t, i) => (
              <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer">
                <div className={`w-3.5 h-3.5 rounded border-2 flex-shrink-0 flex items-center justify-center
                  ${t.done ? "bg-green-500 border-green-500" : "border-slate-300 dark:border-slate-600"}`}>
                  {t.done && <CheckIcon />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[11px] font-semibold leading-tight ${t.done ? "text-slate-400 dark:text-slate-500 line-through" : "text-slate-700 dark:text-slate-300"}`}>
                    {t.label}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">{t.sub}</p>
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
