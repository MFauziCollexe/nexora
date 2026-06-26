"use client";

import { useMemo, useState } from "react";
import StatCards from "@/components/masterdata/StatCards";
import Pagination from "@/components/masterdata/Pagination";
import { statCards, vendorScorecards } from "@/data/purchase/vendorScorecard";

type RatingFilter = "All Ratings" | "Excellent" | "Good" | "Fair" | "Poor";

export default function VendorScorecardPage() {
  const [search, setSearch] = useState("");
  const [filterRating, setFilterRating] = useState<RatingFilter>("All Ratings");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filtered = useMemo(() => {
    return vendorScorecards.filter((r) => {
      const matchSearch = r.supplier.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase());
      const matchRating = filterRating === "All Ratings" || r.rating === filterRating;
      return matchSearch && matchRating;
    });
  }, [search, filterRating]);

  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const summary = useMemo(() => {
    const avg = filtered.length ? (filtered.reduce((s, r) => s + r.overallScore, 0) / filtered.length) : 0;
    return { count: filtered.length, avgScore: Math.round(avg * 10) / 10 };
  }, [filtered]);

  function resetFilters() {
    setFilterRating("All Ratings");
    setSearch("");
    setCurrentPage(1);
    setExpandedId(null);
  }

  function ratingClasses(rating: string) {
    const map: Record<string, string> = {
      Excellent: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400",
      Good: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400",
      Fair: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400",
      Poor: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400",
    };
    return map[rating] ?? map.Good;
  }

  function scoreColor(score: number) {
    if (score >= 85) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 70) return "text-blue-600 dark:text-blue-400";
    if (score >= 55) return "text-amber-600 dark:text-amber-400";
    return "text-rose-600 dark:text-rose-400";
  }

  function barColor(score: number) {
    if (score >= 85) return "bg-emerald-500";
    if (score >= 70) return "bg-blue-500";
    if (score >= 55) return "bg-amber-500";
    return "bg-rose-500";
  }

  const selectCls = "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-1.5 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 cursor-pointer";

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <span>Purchase</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span>Vendor Management</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span className="text-slate-600 dark:text-slate-300 font-medium">Vendor Scorecard</span>
      </div>

      <StatCards cards={statCards} />

      <div className="flex items-end gap-2 flex-wrap pb-1">
        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Rating</label>
          <select value={filterRating} onChange={(e) => { setFilterRating(e.target.value as RatingFilter); setCurrentPage(1); setExpandedId(null); }} className={selectCls}>
            {(["All Ratings", "Excellent", "Good", "Fair", "Poor"] as const).map((r) => (<option key={r}>{r}</option>))}
          </select>
        </div>
        <button onClick={resetFilters} className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-[12px] font-medium px-3 py-1 rounded-lg transition-colors">Reset</button>
        <div className="flex-1" />
        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-transparent">x</label>
          <div className="relative">
            <input type="text" placeholder="Search supplier or category..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); setExpandedId(null); }} className="w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-[12px] text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900" />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {paginated.map((s) => {
          const isExpanded = expandedId === s.id;
          return (
            <div key={s.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
              <button onClick={() => setExpandedId(isExpanded ? null : s.id)} className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-300">{s.supplier}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">{s.category}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[11px] text-slate-400">{s.totalEvaluations} evals</span>
                    <span className="text-[11px] text-slate-400">Last: {s.lastEvaluation}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[18px] font-bold ${scoreColor(s.overallScore)}`}>{s.overallScore}</span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${ratingClasses(s.rating)}`}>{s.rating}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6"/></svg>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-slate-100 dark:border-slate-700 px-4 py-3 space-y-2.5 bg-slate-50/50 dark:bg-slate-900/30">
                  {s.criteria.map((c) => (
                    <div key={c.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[12px] text-slate-600 dark:text-slate-400">{c.name} ({c.weight}%)</span>
                        <span className={`text-[12px] font-semibold ${scoreColor(c.score)}`}>{c.score}</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${barColor(c.score)}`} style={{ width: `${c.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-14 text-center bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-slate-200 dark:text-slate-700 mx-auto mb-2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <p className="text-[12px] text-slate-400 dark:text-slate-600">No vendor scorecards found</p>
          </div>
        )}

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm px-4 py-2.5 flex items-center gap-6 text-[12px] text-slate-600 dark:text-slate-400">
          <span className="font-semibold">Summary:</span>
          <span>Suppliers: <strong className="text-slate-700 dark:text-slate-300">{summary.count}</strong></span>
          <span>Avg Score: <strong className="text-slate-700 dark:text-slate-300">{summary.avgScore}</strong></span>
        </div>

        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} filteredLength={filtered.length} itemsPerPage={itemsPerPage} />
      </div>
    </div>
  );
}
