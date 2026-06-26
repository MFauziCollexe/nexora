"use client";

import StatCards from "@/components/masterdata/StatCards";
import { statCards, monthlyData, docStatusData, topSuppliers } from "@/data/purchase/purchaseReport";

export default function PurchaseReportPage() {
  const barMax = Math.max(...monthlyData.map((m) => m.poCount));

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <span>Purchase</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span>Reports</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span className="text-slate-600 dark:text-slate-300 font-medium">Purchase Report</span>
      </div>

      <StatCards cards={statCards} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Monthly Trend */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm p-4">
          <h3 className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 mb-3">Monthly Transaction Trend</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-200">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700">
                  <th className="text-left px-3 py-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Month</th>
                  <th className="text-center px-3 py-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">PR</th>
                  <th className="text-center px-3 py-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">PO</th>
                  <th className="text-center px-3 py-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">GR</th>
                  <th className="text-right px-3 py-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Total Value</th>
                  <th className="text-left px-3 py-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">PO Trend</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((m) => (
                  <tr key={m.month} className="border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-3 py-2.5 text-[12px] text-slate-700 dark:text-slate-300 font-medium">{m.month}</td>
                    <td className="px-3 py-2.5 text-[12px] text-slate-500 dark:text-slate-400 text-center">{m.prCount}</td>
                    <td className="px-3 py-2.5 text-[12px] text-slate-500 dark:text-slate-400 text-center">{m.poCount}</td>
                    <td className="px-3 py-2.5 text-[12px] text-slate-500 dark:text-slate-400 text-center">{m.grCount}</td>
                    <td className="px-3 py-2.5 text-[12px] text-slate-600 dark:text-slate-400 text-right font-medium">{m.totalValue}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1">
                        <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(m.poCount / barMax) * 100}%` }} />
                        </div>
                        <span className="text-[10px] text-slate-400 w-5 text-right">{m.poCount}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Suppliers */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm p-4">
          <h3 className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 mb-3">Top Suppliers by Value</h3>
          <div className="space-y-3">
            {topSuppliers.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-slate-600 dark:text-slate-400 truncate mr-2">{s.name}</span>
                  <span className="text-[12px] text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">{s.totalValue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${s.percent}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-400 w-8 text-right">{s.percent}%</span>
                </div>
                <span className="text-[10px] text-slate-400">{s.totalPo} PO</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Document Status Summary */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
          <h3 className="text-[13px] font-semibold text-slate-700 dark:text-slate-300">Document Status Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-225">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Document</th>
                <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Draft</th>
                <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">In Progress</th>
                <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Completed</th>
                <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Cancelled</th>
                <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Total</th>
              </tr>
            </thead>
            <tbody>
              {docStatusData.map((d) => (
                <tr key={d.label} className="border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3 text-[12px] text-slate-700 dark:text-slate-300 font-medium">{d.label}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 text-center">{d.draft}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 text-center">{d.active}</td>
                  <td className="px-4 py-3 text-[12px] text-emerald-600 dark:text-emerald-400 text-center font-medium">{d.completed}</td>
                  <td className="px-4 py-3 text-[12px] text-rose-500 dark:text-rose-400 text-center">{d.cancelled}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-700 dark:text-slate-300 text-center font-semibold">{d.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
