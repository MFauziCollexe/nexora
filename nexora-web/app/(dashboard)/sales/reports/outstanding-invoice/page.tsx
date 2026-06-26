"use client";

import { useMemo, useState, useEffect } from "react";
import StatCards from "@/components/masterdata/StatCards";
import Pagination from "@/components/masterdata/Pagination";
import { formatRp } from "@/data/sales/outstandingInvoice";
import { api } from "@/lib/apiClient";

type Invoice = {
  id: number;
  invoice_no: string;
  date: string;
  due_date: string;
  customer_id: number;
  customer_name: string;
  sales_order_id: number | null;
  so_no: string | null;
  total_amount: number;
  paid_amount: number;
  outstanding: number;
  status: string;
};

type StatusFilter = "All Status" | "Overdue" | "Unpaid" | "Partial";

export default function OutstandingInvoicePage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("All Status");
  const [filterCustomer, setFilterCustomer] = useState("All Customer");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await api.get<Invoice[]>("/api/v1/sales/reports/outstanding");
        setInvoices(data ?? []);
      } catch {
        setInvoices([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const customers = useMemo(
    () => Array.from(new Set(invoices.map((r) => r.customer_name))),
    [invoices]
  );

  const filtered = useMemo(() => {
    return invoices.filter((r) => {
      const matchSearch =
        r.invoice_no.toLowerCase().includes(search.toLowerCase()) ||
        r.customer_name.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        filterStatus === "All Status" || r.status === filterStatus;
      const matchCustomer =
        filterCustomer === "All Customer" || r.customer_name === filterCustomer;

      const rDate = new Date(r.date);
      const from = dateFrom ? new Date(dateFrom) : null;
      const to = dateTo ? new Date(dateTo) : null;
      const matchDate =
        (!from || rDate >= from) && (!to || rDate <= to);

      return matchSearch && matchStatus && matchCustomer && matchDate;
    });
  }, [search, filterStatus, filterCustomer, dateFrom, dateTo, invoices]);

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const summary = useMemo(() => {
    const totalOutstanding = filtered.reduce((sum, r) => sum + Number(r.outstanding), 0);
    return { totalOutstanding, count: filtered.length };
  }, [filtered]);

  const statCards = useMemo(() => {
    const now = new Date();
    const overdue = invoices.filter((i) => {
      const due = new Date(i.due_date);
      return due < now;
    });
    const unpaid = invoices.filter((i) => i.status === "Unpaid");
    const partial = invoices.filter((i) => i.status === "Partial");
    const avgDays = overdue.length
      ? Math.round(overdue.reduce((s, i) => s + Math.floor((now.getTime() - new Date(i.due_date).getTime()) / (1000 * 60 * 60 * 24)), 0) / overdue.length)
      : 0;
    const totalOutstandingNum = invoices.reduce((s, i) => s + Number(i.outstanding), 0);

    return [
      { label: "Total Outstanding", value: formatRp(totalOutstandingNum), sub: "All unpaid invoices", icon: "file-text", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-rose-500" },
      { label: "Overdue Invoices", value: overdue.length, sub: "Past due date", icon: "file-text", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-rose-500" },
      { label: "Unpaid Invoices", value: unpaid.length, sub: "Not yet paid", icon: "file-text", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
      { label: "Partial Paid", value: partial.length, sub: "Partially paid", icon: "file-text", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
      { label: "Avg Days Overdue", value: `${avgDays} Hari`, sub: "Average delay", icon: "file-text", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-slate-500" },
    ];
  }, [invoices]);

  function resetFilters() {
    setFilterStatus("All Status");
    setFilterCustomer("All Customer");
    setDateFrom("");
    setDateTo("");
    setSearch("");
    setCurrentPage(1);
  }

  function statusClasses(status: string) {
    const map: Record<string, string> = {
      Overdue: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400",
      Unpaid: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400",
      Partial: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400",
    };
    return map[status] ?? map.Unpaid;
  }

  function daysOver(date: string) {
    const now = new Date();
    const due = new Date(date);
    return Math.floor((now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
  }

  function overdueClass(days: number) {
    if (days <= 0) return "text-slate-500 dark:text-slate-400";
    if (days <= 30) return "text-amber-600 dark:text-amber-400 font-semibold";
    return "text-rose-600 dark:text-rose-400 font-semibold";
  }

  function formatDate(iso: string) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
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
          <span className="text-slate-600 dark:text-slate-300 font-medium">Outstanding Invoice</span>
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
        <span className="text-slate-600 dark:text-slate-300 font-medium">Outstanding Invoice</span>
      </div>

      <StatCards cards={statCards} />

      <div className="flex items-end gap-2 flex-wrap pb-1">
        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">From</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1); }}
            className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-1.5 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">To</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1); }}
            className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-1.5 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Status</label>
          <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value as StatusFilter); setCurrentPage(1); }} className={selectCls}>
            {(["All Status", "Overdue", "Unpaid", "Partial"] as const).map((s) => (
              <option key={s}>{s}</option>
            ))}
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
              placeholder="Search..."
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
                {["Invoice No.", "Date", "Customer", "Due Date", "Amount", "Paid", "Outstanding", "Days Overdue", "Status", "Action"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((r) => {
                const d = daysOver(r.due_date);
                return (
                  <tr key={r.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-4 py-3 text-[12px] text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">{r.invoice_no}</td>
                    <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{formatDate(r.date)}</td>
                    <td className="px-4 py-3 text-[12px] text-slate-600 dark:text-slate-400">{r.customer_name}</td>
                    <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{formatDate(r.due_date)}</td>
                    <td className="px-4 py-3 text-[12px] text-slate-600 dark:text-slate-400 whitespace-nowrap font-medium">{formatRp(Number(r.total_amount))}</td>
                    <td className="px-4 py-3 text-[12px] text-slate-600 dark:text-slate-400 whitespace-nowrap">{formatRp(Number(r.paid_amount))}</td>
                    <td className="px-4 py-3 text-[12px] text-rose-600 dark:text-rose-400 whitespace-nowrap font-medium">{formatRp(Number(r.outstanding))}</td>
                    <td className={`px-4 py-3 text-[12px] whitespace-nowrap ${overdueClass(d)}`}>
                      {d > 0 ? `${d} hari` : "-"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusClasses(r.status)}`}>
                        {r.status}
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
            <p className="text-[12px] text-slate-400 dark:text-slate-600">No outstanding invoices found</p>
          </div>
        )}

        <div className="border-t border-slate-100 dark:border-slate-700 px-4 py-2.5 flex items-center gap-6 text-[12px] text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50">
          <span className="font-semibold">Summary:</span>
          <span>Total Outstanding: <strong className="text-rose-600 dark:text-rose-400">{formatRp(summary.totalOutstanding)}</strong></span>
          <span>Invoices: <strong className="text-slate-700 dark:text-slate-300">{summary.count}</strong></span>
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
