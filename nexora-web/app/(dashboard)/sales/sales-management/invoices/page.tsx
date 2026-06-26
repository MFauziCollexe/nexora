"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import StatCards from "@/components/masterdata/StatCards";
import Pagination from "@/components/masterdata/Pagination";
import { api } from "@/lib/apiClient";

type InvoiceItem = {
  id: number;
  invoice_no: string;
  date: string;
  due_date: string;
  customer_name: string;
  so_no: string | null;
  total_amount: number;
  paid_amount: number;
  status: string;
};

function statusClasses(status: string) {
  const map: Record<string, string> = {
    Paid: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400",
    Partial: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400",
    Unpaid: "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
    Overdue: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400",
  };
  return map[status] ?? map.Unpaid;
}

const itemsPerPage = 6;

export default function InvoicesPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [filterCustomer, setFilterCustomer] = useState("All Customer");
  const [currentPage, setCurrentPage] = useState(1);
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<InvoiceItem[]>("/api/v1/sales/invoices?per_page=100").then((res) => {
      setInvoices(res);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const statCards = useMemo(() => {
    const total = invoices.length;
    const paid = invoices.filter((i) => i.status === "Paid").length;
    const unpaid = invoices.filter((i) => i.status === "Unpaid").length;
    const overdue = invoices.filter((i) => i.status === "Overdue").length;
    return [
      { label: "Total Invoices", value: total, sub: "All invoices", icon: "file-text" as const, iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-slate-500" },
      { label: "Paid", value: paid, sub: "Fully paid", icon: "check" as const, iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-emerald-500" },
      { label: "Unpaid", value: unpaid, sub: "Awaiting payment", icon: "clock" as const, iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
      { label: "Overdue", value: overdue, sub: "Past due date", icon: "alert-circle" as const, iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-rose-500" },
    ];
  }, [invoices]);

  const customers = useMemo(() => Array.from(new Set(invoices.map((i) => i.customer_name))), [invoices]);

  const filtered = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchSearch =
        invoice.invoice_no.toLowerCase().includes(search.toLowerCase()) ||
        invoice.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        (invoice.so_no ?? "").toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "All Status" || invoice.status === filterStatus;
      const matchCustomer = filterCustomer === "All Customer" || invoice.customer_name === filterCustomer;
      return matchSearch && matchStatus && matchCustomer;
    });
  }, [search, filterStatus, filterCustomer, invoices]);

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
        <span className="text-slate-600 dark:text-slate-300 font-medium">Invoices</span>
      </div>

      <StatCards cards={statCards} />

      <div className="flex items-end gap-2 flex-wrap pb-1">
        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Status</label>
          <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }} className={selectCls}>
            {["All Status", "Paid", "Partial", "Unpaid", "Overdue"].map((s) => <option key={s}>{s}</option>)}
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
              placeholder="Search invoice..."
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
          <Link
            href="/sales/sales-management/invoices/new"
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-sm"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Create Invoice
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-275">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                {["Invoice No.", "Date", "Customer", "SO No.", "Due Date", "Amount", "Paid Amount", "Status", "Action"].map((heading) => (
                  <th key={heading} className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide whitespace-nowrap">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-4 py-14 text-center text-[12px] text-slate-400 dark:text-slate-600">Loading...</td>
                </tr>
              ) : paginated.map((invoice) => (
                <tr key={invoice.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-3 text-[12px] text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">{invoice.invoice_no}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{invoice.date}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-600 dark:text-slate-400">{invoice.customer_name}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{invoice.so_no ?? "-"}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{invoice.due_date}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    {(invoice.total_amount ?? 0).toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 })}
                  </td>
                  <td className="px-4 py-3 text-[12px] text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    {(invoice.paid_amount ?? 0).toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 })}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusClasses(invoice.status)}`}>{invoice.status}</span>
                  </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Link href={`/sales/sales-management/invoices/${invoice.id}`} title="View" className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>
                      </Link>
                      <Link href={`/sales/sales-management/invoices/${invoice.id}/edit`} title="Edit" className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-blue-950 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </Link>
                      <Link href="#" title="Download" className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>
                      </Link>
                      <Link href="#" title="Email" className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M4 4h16v16H4z"/><polyline points="4 4 12 13 20 4"/></svg>
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
            <p className="text-[12px] text-slate-400 dark:text-slate-600">No invoices found</p>
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
