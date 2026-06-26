"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import StatCards from "@/components/masterdata/StatCards";
import Pagination from "@/components/masterdata/Pagination";
import { api } from "@/lib/apiClient";

type SalesReturnItem = {
  id: number;
  return_no: string;
  return_date: string;
  invoice_no: string | null;
  customer_name: string;
  return_type: string;
  reason: string | null;
  total_amount: number;
  status: string;
};

function statusClasses(status: string) {
  const map: Record<string, string> = {
    Approved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400",
    Pending: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400",
    Rejected: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400",
  };
  return map[status] ?? map.Pending;
}

const itemsPerPage = 6;

export default function SalesReturnsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [filterCustomer, setFilterCustomer] = useState("All Customer");
  const [currentPage, setCurrentPage] = useState(1);
  const [returns, setReturns] = useState<SalesReturnItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<SalesReturnItem[]>("/api/v1/sales/sales-returns?per_page=100").then((res) => {
      setReturns(res);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const statCards = useMemo(() => {
    const total = returns.length;
    const approved = returns.filter((r) => r.status === "Approved").length;
    const pending = returns.filter((r) => r.status === "Pending").length;
    const rejected = returns.filter((r) => r.status === "Rejected").length;
    return [
      { label: "Total Returns", value: total, sub: "All returns", icon: "file-text" as const, iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-slate-500" },
      { label: "Approved", value: approved, sub: "Approved returns", icon: "check" as const, iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-emerald-500" },
      { label: "Pending", value: pending, sub: "Awaiting approval", icon: "clock" as const, iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
      { label: "Rejected", value: rejected, sub: "Rejected returns", icon: "alert-circle" as const, iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-rose-500" },
    ];
  }, [returns]);

  const customers = useMemo(() => Array.from(new Set(returns.map((r) => r.customer_name))), [returns]);

  const filtered = useMemo(() => {
    return returns.filter((ret) => {
      const matchSearch =
        ret.return_no.toLowerCase().includes(search.toLowerCase()) ||
        (ret.invoice_no ?? "").toLowerCase().includes(search.toLowerCase()) ||
        ret.customer_name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "All Status" || ret.status === filterStatus;
      const matchCustomer = filterCustomer === "All Customer" || ret.customer_name === filterCustomer;
      return matchSearch && matchStatus && matchCustomer;
    });
  }, [search, filterStatus, filterCustomer, returns]);

  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  function resetFilters() {
    setFilterStatus("All Status");
    setFilterCustomer("All Customer");
    setSearch("");
    setCurrentPage(1);
  }

  const selectCls =
    "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-1.5 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 cursor-pointer";

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <span>Sales</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span>Sales Management</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span className="text-slate-600 dark:text-slate-300 font-medium">Sales Returns</span>
      </div>

      <StatCards cards={statCards} />

      <div className="flex items-end gap-2 flex-wrap pb-1">
        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Status</label>
          <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }} className={selectCls}>
            {["All Status", "Approved", "Pending", "Rejected"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Customer</label>
          <select value={filterCustomer} onChange={(e) => { setFilterCustomer(e.target.value); setCurrentPage(1); }} className={selectCls}>
            <option>All Customer</option>
            {customers.map((c) => <option key={c}>{c}</option>)}
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
              placeholder="Search return..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-[12px] text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
            />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
        </div>

        <Link href="/sales/sales-management/sales-returns/new" className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Create Return
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-250">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                {["Return No.", "Return Date", "Invoice No.", "Customer", "Return Type", "Reason", "Amount", "Status", "Action"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-4 py-14 text-center text-[12px] text-slate-400 dark:text-slate-600">Loading...</td>
                </tr>
              ) : paginated.map((ret) => (
                <tr key={ret.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-3 text-[12px] text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">{ret.return_no}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{ret.return_date}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{ret.invoice_no ?? "-"}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-600 dark:text-slate-400">{ret.customer_name}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{ret.return_type}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 max-w-40 truncate">{ret.reason ?? "-"}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    {(ret.total_amount ?? 0).toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 })}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusClasses(ret.status)}`}>{ret.status}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Link href={`/sales/sales-management/sales-returns/${ret.id}`} title="View" className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>
                      </Link>
                      <Link href={`/sales/sales-management/sales-returns/${ret.id}/edit`} title="Edit" className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-blue-950 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!loading && filtered.length === 0 && (
          <div className="py-14 text-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-slate-200 dark:text-slate-700 mx-auto mb-2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <p className="text-[12px] text-slate-400 dark:text-slate-600">No returns found</p>
          </div>
        )}

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
