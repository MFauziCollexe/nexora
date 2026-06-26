"use client";

import { useMemo, useState, useEffect } from "react";
import StatCards from "@/components/masterdata/StatCards";
import Pagination from "@/components/masterdata/Pagination";
import { formatRp } from "@/data/sales/customerSalesReport";
import { api } from "@/lib/apiClient";

type CustomerReportItem = {
  customer_id: number;
  customer_name: string;
  total_invoices: number;
  total_amount: number;
  total_paid: number;
  total_outstanding: number;
  last_invoice: string;
};

export default function CustomerSalesReportPage() {
  const [data, setData] = useState<CustomerReportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await api.get<CustomerReportItem[]>("/api/v1/sales/reports/customer-sales");
        setData(result ?? []);
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    return data.filter((r) =>
      r.customer_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const summary = useMemo(() => {
    const totalAmount = filtered.reduce((sum, r) => sum + Number(r.total_amount), 0);
    const totalPaid = filtered.reduce((sum, r) => sum + Number(r.total_paid), 0);
    const totalOutstanding = filtered.reduce((sum, r) => sum + Number(r.total_outstanding), 0);
    return { totalAmount, totalPaid, totalOutstanding, count: filtered.length };
  }, [filtered]);

  const statCards = useMemo(() => {
    const sorted = [...data].sort((a, b) => Number(b.total_amount) - Number(a.total_amount));
    const topCustomer = sorted[0]?.customer_name ?? "-";
    const totalSales = data.reduce((s, r) => s + Number(r.total_amount), 0);
    const totalInvoices = data.reduce((s, r) => s + Number(r.total_invoices), 0);
    return [
      { label: "Total Customers", value: data.length, sub: "Customers with sales", icon: "users", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
      { label: "Total Sales", value: formatRp(totalSales), sub: "All time sales", icon: "file-text", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-emerald-500" },
      { label: "Total Invoices", value: totalInvoices, sub: "All invoices", icon: "file-text", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-slate-500" },
      { label: "Avg per Customer", value: data.length ? formatRp(Math.round(totalSales / data.length)) : "Rp 0", sub: "Average sales per customer", icon: "file-text", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-indigo-500" },
      { label: "Top Customer", value: topCustomer, sub: "Highest sales volume", icon: "crown", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
    ];
  }, [data]);

  function resetFilters() {
    setSearch("");
    setCurrentPage(1);
  }

  function formatDate(iso: string) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  }

  function customerStatus(item: CustomerReportItem): string {
    const last = new Date(item.last_invoice);
    const now = new Date();
    const diffDays = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
    if (Number(item.total_invoices) <= 3) return "New";
    if (diffDays > 60) return "Inactive";
    return "Active";
  }

  function statusClasses(status: string) {
    const map: Record<string, string> = {
      Active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400",
      Inactive: "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
      New: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400",
    };
    return map[status] ?? map.Inactive;
  }

  const selectCls =
    "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-1.5 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 cursor-pointer";

  if (loading) {
    return (
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
          <span>Sales</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
          <span>Reports</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
          <span className="text-slate-600 dark:text-slate-300 font-medium">Customer Sales Report</span>
        </div>
        <div className="flex items-center justify-center py-20 text-slate-400 text-[12px]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <span>Sales</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span>Reports</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span className="text-slate-600 dark:text-slate-300 font-medium">Customer Sales Report</span>
      </div>

      <StatCards cards={statCards} />

      <div className="flex items-end gap-2 flex-wrap pb-1">
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
              placeholder="Search customer..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-[12px] text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
            />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-transparent">x</label>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-sm"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>
            </svg>
            Export
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-275">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                {["Customer", "Total Invoices", "Total Amount", "Total Paid", "Outstanding", "Last Invoice", "Status", "Action"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((r) => {
                const status = customerStatus(r);
                const outstanding = Number(r.total_amount) - Number(r.total_paid);
                return (
                  <tr key={r.customer_id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-4 py-3 text-[12px] text-slate-700 dark:text-slate-300 font-medium">{r.customer_name}</td>
                    <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{r.total_invoices}</td>
                    <td className="px-4 py-3 text-[12px] text-slate-600 dark:text-slate-400 whitespace-nowrap font-medium">{formatRp(Number(r.total_amount))}</td>
                    <td className="px-4 py-3 text-[12px] text-slate-600 dark:text-slate-400 whitespace-nowrap">{formatRp(Number(r.total_paid))}</td>
                    <td className="px-4 py-3 text-[12px] text-slate-600 dark:text-slate-400 whitespace-nowrap">{formatRp(outstanding)}</td>
                    <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{formatDate(r.last_invoice)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusClasses(status)}`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <button title="View" type="button" className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                        <button title="Download" type="button" className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-14 text-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-slate-200 dark:text-slate-700 mx-auto mb-2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <p className="text-[12px] text-slate-400 dark:text-slate-600">No customer reports found</p>
          </div>
        )}

        <div className="border-t border-slate-100 dark:border-slate-700 px-4 py-2.5 flex items-center gap-6 text-[12px] text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50">
          <span className="font-semibold">Summary:</span>
          <span>Total: <strong className="text-slate-700 dark:text-slate-300">{formatRp(summary.totalAmount)}</strong></span>
          <span>Paid: <strong className="text-emerald-600 dark:text-emerald-400">{formatRp(summary.totalPaid)}</strong></span>
          <span>Outstanding: <strong className="text-amber-600 dark:text-amber-400">{formatRp(summary.totalOutstanding)}</strong></span>
          <span>Customers: <strong className="text-slate-700 dark:text-slate-300">{summary.count}</strong></span>
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
