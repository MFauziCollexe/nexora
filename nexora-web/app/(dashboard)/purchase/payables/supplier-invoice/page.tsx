"use client";

import { useMemo, useState } from "react";
import StatCards from "@/components/masterdata/StatCards";
import Pagination from "@/components/masterdata/Pagination";
import { statCards, supplierInvoices } from "@/data/purchase/supplierInvoice";

type StatusFilter = "All Status" | "Draft" | "Submitted" | "Approved" | "Rejected" | "Paid" | "Overdue" | "Cancelled";
type PaymentFilter = "All" | "Unpaid" | "Partial" | "Paid";

export default function SupplierInvoicePage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("All Status");
  const [filterPayment, setFilterPayment] = useState<PaymentFilter>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filtered = useMemo(() => {
    return supplierInvoices.filter((r) => {
      const matchSearch =
        r.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
        r.supplierRef.toLowerCase().includes(search.toLowerCase()) ||
        r.supplier.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        filterStatus === "All Status" || r.status === filterStatus;
      const matchPayment =
        filterPayment === "All" || r.paymentStatus === filterPayment;

      return matchSearch && matchStatus && matchPayment;
    });
  }, [search, filterStatus, filterPayment]);

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const summary = useMemo(() => {
    const totalDue = filtered.reduce((sum, r) => {
      const amt = parseFloat(r.amountDue.replace(/[^\d]/g, ""));
      return sum + (isNaN(amt) ? 0 : amt);
    }, 0);
    return { count: filtered.length, totalDue };
  }, [filtered]);

  function resetFilters() {
    setFilterStatus("All Status");
    setFilterPayment("All");
    setSearch("");
    setCurrentPage(1);
  }

  function statusClasses(status: string) {
    const map: Record<string, string> = {
      Draft: "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
      Submitted: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400",
      Approved: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-400",
      Rejected: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400",
      Paid: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400",
      Overdue: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400",
      Cancelled: "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
    };
    return map[status] ?? map.Draft;
  }

  function paymentClasses(status: string) {
    const map: Record<string, string> = {
      Unpaid: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400",
      Partial: "bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-400",
      Paid: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400",
    };
    return map[status] ?? "";
  }

  const selectCls =
    "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-1.5 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 cursor-pointer";

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <span>Purchase</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span>Payables</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span className="text-slate-600 dark:text-slate-300 font-medium">Supplier Invoice</span>
      </div>

      <StatCards cards={statCards} />

      <div className="flex items-end gap-2 flex-wrap pb-1">
        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Status</label>
          <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value as StatusFilter); setCurrentPage(1); }} className={selectCls}>
            {(["All Status", "Draft", "Submitted", "Approved", "Rejected", "Paid", "Overdue", "Cancelled"] as const).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Payment</label>
          <select value={filterPayment} onChange={(e) => { setFilterPayment(e.target.value as PaymentFilter); setCurrentPage(1); }} className={selectCls}>
            {(["All", "Unpaid", "Partial", "Paid"] as const).map((p) => (
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
              placeholder="Search invoice no, ref or supplier..."
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
          <table className="w-full min-w-325">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                {["Invoice No.", "Date", "Due Date", "Supplier Ref.", "Supplier", "Total", "Amount Due", "Status", "Payment", "Action"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((r) => (
                <tr key={r.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-3 text-[12px] text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">{r.invoiceNo}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{r.date}</td>
                  <td className={`px-4 py-3 text-[12px] whitespace-nowrap ${r.status === "Overdue" ? "text-rose-600 dark:text-rose-400 font-semibold" : "text-slate-500 dark:text-slate-400"}`}>{r.dueDate}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-600 dark:text-slate-400 whitespace-nowrap">{r.supplierRef}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400">{r.supplier}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-600 dark:text-slate-400 font-medium">{r.totalAmount}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-700 dark:text-slate-300 font-semibold">{r.amountDue}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusClasses(r.status)}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${paymentClasses(r.paymentStatus)}`}>
                      {r.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <button title="View" type="button" className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                    </div>
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
            <p className="text-[12px] text-slate-400 dark:text-slate-600">No supplier invoices found</p>
          </div>
        )}

        <div className="border-t border-slate-100 dark:border-slate-700 px-4 py-2.5 flex items-center gap-6 text-[12px] text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50">
          <span className="font-semibold">Summary:</span>
          <span>Invoices: <strong className="text-slate-700 dark:text-slate-300">{summary.count}</strong></span>
          <span>Amount Due: <strong className="text-slate-700 dark:text-slate-300">Rp {summary.totalDue.toLocaleString()}</strong></span>
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
