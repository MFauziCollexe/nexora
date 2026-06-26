"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/apiClient";

function statusClasses(status: string) {
  const map: Record<string, string> = {
    Paid: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400",
    Partial: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400",
    Unpaid: "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
    Overdue: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400",
  };
  return map[status] ?? map.Unpaid;
}

type InvoiceDetail = {
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
  notes: string | null;
  items: { id: number; item_name: string; quantity: number; unit_price: number; subtotal: number }[];
  created_at: string;
  updated_at: string;
};

function formatRupiah(v: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);
}

export default function InvoiceDetailPage() {
  const params = useParams();
  const [invoice, setInvoice] = useState<InvoiceDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<InvoiceDetail>(`/api/v1/sales/invoices/${params.id}`).then((res) => {
      setInvoice(res);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="p-4 text-[12px] text-slate-400 dark:text-slate-600">Loading...</div>;
  if (!invoice) return <div className="p-4 text-[12px] text-red-500">Invoice not found</div>;

  const taxAmount = Math.round(invoice.total_amount * 11 / 111);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/sales/sales-management/invoices" className="text-slate-500 hover:text-blue-500">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 inline mr-1"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back
        </Link>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Invoice Detail</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Invoice Information</h3>
          <div className="mt-3 text-[13px] text-slate-600 dark:text-slate-300 grid grid-cols-2 gap-y-2">
            <div className="flex justify-between"><span className="text-slate-500">Invoice No.</span><span className="font-medium">{invoice.invoice_no}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Date</span><span className="font-medium">{invoice.date}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Due Date</span><span className="font-medium">{invoice.due_date}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">SO No.</span><span className="font-medium">{invoice.so_no ?? "-"}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Status</span><span className={`text-[12px] font-semibold px-2 py-0.5 rounded-full ${statusClasses(invoice.status)}`}>{invoice.status}</span></div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Customer Information</h3>
          <div className="mt-3 text-[13px] text-slate-600 dark:text-slate-300">
            <div className="flex justify-between"><span className="text-slate-500">Customer</span><span className="font-medium">{invoice.customer_name}</span></div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Invoice Items</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                {["No.", "Item Name", "QTY", "Unit Price", "Amount"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((it, idx) => (
                <tr key={it.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-3 text-[12px] text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">{idx + 1}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-600 dark:text-slate-400">{it.item_name}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{it.quantity}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{formatRupiah(it.unit_price)}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-600 dark:text-slate-400 whitespace-nowrap">{formatRupiah(it.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Notes</h4>
          <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-300">{invoice.notes ?? "No notes"}</p>
        </div>

        <div className="rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 col-span-2">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Invoice Summary</h4>
          <div className="mt-3 text-[13px] text-slate-600 dark:text-slate-300 space-y-2">
            <div className="flex justify-between max-w-xs"><span className="text-slate-500">Subtotal</span><span className="font-medium">{formatRupiah(invoice.total_amount - taxAmount)}</span></div>
            <div className="flex justify-between max-w-xs"><span className="text-slate-500">Tax (11%)</span><span className="font-medium">{formatRupiah(taxAmount)}</span></div>
            <div className="flex justify-between max-w-xs pt-2 border-t border-slate-100 dark:border-slate-700"><span className="text-blue-600 font-semibold">Grand Total</span><span className="text-blue-600 font-semibold">{formatRupiah(invoice.total_amount)}</span></div>
            <div className="flex justify-between max-w-xs"><span className="text-slate-500">Paid Amount</span><span className="font-medium text-emerald-600">{formatRupiah(invoice.paid_amount)}</span></div>
            <div className="flex justify-between max-w-xs pb-2"><span className="text-slate-500">Outstanding</span><span className={`font-medium ${invoice.outstanding > 0 ? "text-rose-600" : "text-slate-600"}`}>{formatRupiah(invoice.outstanding)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
