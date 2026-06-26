"use client";

import { useMemo, useState } from "react";
import StatCards from "@/components/masterdata/StatCards";
import Pagination from "@/components/masterdata/Pagination";
import { statCards, supplierPurchases } from "@/data/purchase/supplierPurchaseReport";

type PerfFilter = "All" | "Excellent" | "Good" | "Fair" | "Poor";

export default function SupplierPurchaseReportPage() {
  const [search, setSearch] = useState("");
  const [filterPerf, setFilterPerf] = useState<PerfFilter>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filtered = useMemo(() => {
    return supplierPurchases.filter((r) => {
      const matchSearch = r.supplier.toLowerCase().includes(search.toLowerCase()) || r.city.toLowerCase().includes(search.toLowerCase());
      const matchPerf = filterPerf === "All" || r.performance === filterPerf;
      return matchSearch && matchPerf;
    });
  }, [search, filterPerf]);

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const summary = useMemo(() => {
    const parseRp = (s: string) => parseFloat(s.replace(/[^\d]/g, ""));
    const totalVal = filtered.reduce((sum, r) => sum + parseRp(r.totalValue), 0);
    const totalOut = filtered.reduce((sum, r) => sum + parseRp(r.outstanding), 0);
    const totalPo = filtered.reduce((sum, r) => sum + r.totalPo, 0);
    return { totalVal, totalOut, totalPo, count: filtered.length };
  }, [filtered]);

  function resetFilters() {
    setFilterPerf("All");
    setSearch("");
    setCurrentPage(1);
  }

  function perfClasses(perf: string) {
    const map: Record<string, string> = {
      Excellent: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400",
      Good: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400",
      Fair: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400",
      Poor: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400",
    };
    return map[perf] ?? map.Good;
  }

  const selectCls =
    "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-1.5 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 cursor-pointer";

  const cellCls = "px-4 py-3 text-[12px] text-right whitespace-nowrap";

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <span>Purchase</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span>Reports</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span className="text-slate-600 dark:text-slate-300 font-medium">Supplier Purchase Report</span>
      </div>

      <StatCards cards={statCards} />

      <div className="flex items-end gap-2 flex-wrap pb-1">
        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Performance</label>
          <select value={filterPerf} onChange={(e) => { setFilterPerf(e.target.value as PerfFilter); setCurrentPage(1); }} className={selectCls}>
            {(["All", "Excellent", "Good", "Fair", "Poor"] as const).map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        <button
          onClick={resetFilters}
          className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-[12px] font-medium px-3 py-1 rounded-lg transition-colors"
        >
          Reset
        </button>

        <div className="flex-1" />

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-transparent">x</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search supplier or city..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-[12px] text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
            />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-375">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                {["Supplier", "City", "Total PO", "Total Value", "GR", "Invoices", "Paid", "Outstanding", "Last Transaction", "Performance"].map((h) => (
                  <th key={h} className={`px-4 py-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide whitespace-nowrap ${h === "Total PO" || h === "Total Value" ? "text-center" : h === "GR" || h === "Invoices" ? "text-center" : h === "Paid" || h === "Outstanding" ? "text-right" : "text-left"}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((r) => (
                <tr key={r.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-3 text-[12px] text-slate-700 dark:text-slate-300 font-medium">{r.supplier}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400">{r.city}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-600 dark:text-slate-400 text-center font-medium">{r.totalPo}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-700 dark:text-slate-300 text-right font-medium">{r.totalValue}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 text-center">{r.totalGr}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 text-center">{r.totalInvoices}</td>
                  <td className="px-4 py-3 text-[12px] text-emerald-600 dark:text-emerald-400 text-right font-medium">{r.paidAmount}</td>
                  <td className="px-4 py-3 text-[12px] text-amber-600 dark:text-amber-400 text-right font-medium">{r.outstanding}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{r.lastTransaction}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${perfClasses(r.performance)}`}>
                      {r.performance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-14 text-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-slate-200 dark:text-slate-700 mx-auto mb-2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            <p className="text-[12px] text-slate-400 dark:text-slate-600">No supplier data found</p>
          </div>
        )}

        <div className="border-t border-slate-100 dark:border-slate-700 px-4 py-2.5 flex items-center gap-6 text-[12px] text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50">
          <span className="font-semibold">Summary:</span>
          <span>Suppliers: <strong className="text-slate-700 dark:text-slate-300">{summary.count}</strong></span>
          <span>Total PO: <strong className="text-slate-700 dark:text-slate-300">{summary.totalPo}</strong></span>
          <span>Total Value: <strong className="text-slate-700 dark:text-slate-300">Rp {summary.totalVal.toLocaleString()}</strong></span>
          <span>Outstanding: <strong className="text-amber-600 dark:text-amber-400">Rp {summary.totalOut.toLocaleString()}</strong></span>
        </div>

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          filteredLength={filtered.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
}
