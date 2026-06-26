"use client";

import { useMemo, useState } from "react";
import StatCards from "@/components/masterdata/StatCards";
import Pagination from "@/components/masterdata/Pagination";
import { statCards, approvedVendors } from "@/data/purchase/approvedVendorList";

type StatusFilter = "All Status" | "Approved" | "Pending" | "Suspended" | "Revoked";

const categories = [...new Set(approvedVendors.map((v) => v.category))];
type CategoryFilter = "All Categories" | (typeof categories)[number];

export default function ApprovedVendorListPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("All Status");
  const [filterCategory, setFilterCategory] = useState<CategoryFilter>("All Categories");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filtered = useMemo(() => {
    return approvedVendors.filter((r) => {
      const matchSearch = r.supplier.toLowerCase().includes(search.toLowerCase()) || r.vendorCode.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "All Status" || r.approvalStatus === filterStatus;
      const matchCategory = filterCategory === "All Categories" || r.category === filterCategory;
      return matchSearch && matchStatus && matchCategory;
    });
  }, [search, filterStatus, filterCategory]);

  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const summary = useMemo(() => {
    return { count: filtered.length };
  }, [filtered]);

  function resetFilters() {
    setFilterStatus("All Status");
    setFilterCategory("All Categories");
    setSearch("");
    setCurrentPage(1);
  }

  function statusClasses(status: string) {
    const map: Record<string, string> = {
      Approved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400",
      Pending: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400",
      Suspended: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400",
      Revoked: "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
    };
    return map[status] ?? map.Pending;
  }

  const selectCls = "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-1.5 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 cursor-pointer";

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <span>Purchase</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span>Vendor Management</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span className="text-slate-600 dark:text-slate-300 font-medium">Approved Vendor List</span>
      </div>

      <StatCards cards={statCards} />

      <div className="flex items-end gap-2 flex-wrap pb-1">
        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Status</label>
          <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value as StatusFilter); setCurrentPage(1); }} className={selectCls}>
            {(["All Status", "Approved", "Pending", "Suspended", "Revoked"] as const).map((s) => (<option key={s}>{s}</option>))}
          </select>
        </div>
        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Category</label>
          <select value={filterCategory} onChange={(e) => { setFilterCategory(e.target.value as CategoryFilter); setCurrentPage(1); }} className={selectCls}>
            <option>All Categories</option>
            {categories.map((c) => (<option key={c}>{c}</option>))}
          </select>
        </div>
        <button onClick={resetFilters} className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-[12px] font-medium px-3 py-1 rounded-lg transition-colors">Reset</button>
        <div className="flex-1" />
        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-transparent">x</label>
          <div className="relative">
            <input type="text" placeholder="Search vendor code or name..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} className="w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-[12px] text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900" />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-325">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                {["Vendor Code", "Supplier", "City", "Category", "Certification", "Status", "Approval Date", "Expiry Date", "Next Review", "Action"].map((h) => (
                  <th key={h} className={`px-4 py-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide whitespace-nowrap ${h === "Vendor Code" ? "text-left" : "text-left"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((r) => (
                <tr key={r.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-3 text-[12px] text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">{r.vendorCode}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-600 dark:text-slate-400">{r.supplier}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400">{r.city}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400">{r.category}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400">{r.certification}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusClasses(r.approvalStatus)}`}>{r.approvalStatus}</span>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{r.approvalDate}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{r.expiryDate}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{r.nextReview}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button title="View" type="button" className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-14 text-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-slate-200 dark:text-slate-700 mx-auto mb-2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <p className="text-[12px] text-slate-400 dark:text-slate-600">No approved vendors found</p>
          </div>
        )}

        <div className="border-t border-slate-100 dark:border-slate-700 px-4 py-2.5 flex items-center gap-6 text-[12px] text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50">
          <span className="font-semibold">Summary:</span>
          <span>Vendors: <strong className="text-slate-700 dark:text-slate-300">{summary.count}</strong></span>
        </div>

        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} filteredLength={filtered.length} itemsPerPage={itemsPerPage} />
      </div>
    </div>
  );
}
