"use client";

import { useMemo, useState } from "react";
import StatCards from "@/components/masterdata/StatCards";
import Pagination from "@/components/masterdata/Pagination";
import { statCards, vendorPerformances } from "@/data/purchase/vendorPerformance";

type TrendFilter = "All" | "Improving" | "Stable" | "Declining";

export default function VendorPerformancePage() {
  const [search, setSearch] = useState("");
  const [filterTrend, setFilterTrend] = useState<TrendFilter>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filtered = useMemo(() => {
    return vendorPerformances.filter((r) => {
      const matchSearch = r.supplier.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase());
      const matchTrend = filterTrend === "All" || r.trend === filterTrend;
      return matchSearch && matchTrend;
    });
  }, [search, filterTrend]);

  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  function resetFilters() {
    setFilterTrend("All");
    setSearch("");
    setCurrentPage(1);
  }

  function trendClasses(trend: string) {
    const map: Record<string, string> = {
      Improving: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400",
      Stable: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400",
      Declining: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400",
    };
    return map[trend] ?? map.Stable;
  }

  function changeColor(change: number) {
    if (change > 0) return "text-emerald-600 dark:text-emerald-400";
    if (change < 0) return "text-rose-600 dark:text-rose-400";
    return "text-slate-500 dark:text-slate-400";
  }

  function changeIcon(change: number) {
    if (change > 0) return "▲";
    if (change < 0) return "▼";
    return "–";
  }

  function scoreBarColor(score: number) {
    if (score >= 85) return "bg-emerald-500";
    if (score >= 70) return "bg-blue-500";
    if (score >= 55) return "bg-amber-500";
    return "bg-rose-500";
  }

  const maxScore = 100;
  const barHeight = 28;

  const selectCls = "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-1.5 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 cursor-pointer";

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <span>Purchase</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span>Vendor Management</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span className="text-slate-600 dark:text-slate-300 font-medium">Vendor Performance</span>
      </div>

      <StatCards cards={statCards} />

      <div className="flex items-end gap-2 flex-wrap pb-1">
        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Trend</label>
          <select value={filterTrend} onChange={(e) => { setFilterTrend(e.target.value as TrendFilter); setCurrentPage(1); }} className={selectCls}>
            {(["All", "Improving", "Stable", "Declining"] as const).map((t) => (<option key={t}>{t}</option>))}
          </select>
        </div>
        <button onClick={resetFilters} className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-[12px] font-medium px-3 py-1 rounded-lg transition-colors">Reset</button>
        <div className="flex-1" />
        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-transparent">x</label>
          <div className="relative">
            <input type="text" placeholder="Search supplier or category..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} className="w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-[12px] text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900" />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {paginated.map((s) => (
          <div key={s.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="px-4 py-3 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-300">{s.supplier}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">{s.category}</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${trendClasses(s.trend)}`}>{s.trend}</span>
                  <span className={`text-[11px] font-medium ${changeColor(s.change)}`}>
                    {changeIcon(s.change)} {Math.abs(s.change)} pts
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-[20px] font-bold text-slate-700 dark:text-slate-300">{s.currentScore}</div>
                  <div className="text-[9px] text-slate-400 uppercase tracking-wide">Current</div>
                </div>
                <div className="text-center">
                  <div className="text-[16px] font-semibold text-slate-400">{s.previousScore}</div>
                  <div className="text-[9px] text-slate-400 uppercase tracking-wide">Previous</div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-700 px-4 py-3">
              <div className="flex items-end gap-1" style={{ height: barHeight + 16 }}>
                {s.history.map((h) => (
                  <div key={h.period} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex justify-center">
                      <div
                        className={`w-full max-w-[28px] rounded-t-sm ${scoreBarColor(h.score)}`}
                        style={{ height: `${(h.score / maxScore) * barHeight}px`, minHeight: h.score > 0 ? 3 : 0 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-1 mt-1">
                {s.history.map((h) => (
                  <div key={h.period} className="flex-1 text-center">
                    <div className="text-[8px] text-slate-400">{h.period.replace("Q", "").replace("-", " ")}</div>
                    <div className="text-[10px] font-medium text-slate-600 dark:text-slate-400">{h.score}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-14 text-center bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-slate-200 dark:text-slate-700 mx-auto mb-2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <p className="text-[12px] text-slate-400 dark:text-slate-600">No vendor performance data found</p>
          </div>
        )}

        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} filteredLength={filtered.length} itemsPerPage={itemsPerPage} />
      </div>
    </div>
  );
}
