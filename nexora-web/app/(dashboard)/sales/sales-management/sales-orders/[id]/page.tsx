"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/apiClient";

function statusClasses(status: string) {
  const map: Record<string, string> = {
    Confirmed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400",
    Released: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400",
    Draft: "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
    Pending: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400",
  };
  return map[status] ?? map.Draft;
}

type SalesOrderDetail = {
  id: number;
  so_no: string;
  date: string;
  customer_id: number;
  customer_name: string;
  quotation_id: number | null;
  quotation_no: string | null;
  total_amount: number;
  status: string;
  notes: string | null;
  warehouse: string | null;
  sales_person_id: number | null;
  sales_person: { id: number; name: string } | null;
  items: { id: number; item_id: number | null; item_name: string; quantity: number; unit_price: number; subtotal: number }[];
  created_at: string;
  updated_at: string;
};

function formatRupiah(v: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);
}

export default function SalesOrderDetailPage() {
  const params = useParams();
  const [so, setSo] = useState<SalesOrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<SalesOrderDetail>(`/api/v1/sales/sales-orders/${params.id}`).then((res) => {
      setSo(res);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="p-4 text-[12px] text-slate-400 dark:text-slate-600">Loading...</div>;
  if (!so) return <div className="p-4 text-[12px] text-red-500">Sales Order not found</div>;

  const taxTotal = so.items.reduce((s, i) => s + i.subtotal * 0.11, 0);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/sales/sales-management/sales-orders" className="text-slate-500 hover:text-blue-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 inline mr-1"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </Link>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Sales Order Detail</h2>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[13px]">Print SO</button>
          <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[13px]">Send Email</button>
          <button className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[13px]">Release to Warehouse</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">1. Order Information</h3>
          <div className="mt-3 text-[13px] text-slate-600 dark:text-slate-300 grid grid-cols-2 gap-y-2">
            <div className="flex justify-between"><span className="text-slate-500">Sales Order No.</span><span className="font-medium">{so.so_no}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Warehouse</span><span className="font-medium">{so.warehouse ?? "-"}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Order Date</span><span className="font-medium">{so.date}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Status</span><span className={`text-[12px] font-semibold px-2 py-0.5 rounded-full ${statusClasses(so.status)}`}>{so.status}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Quotation No.</span><span className="font-medium">{so.quotation_no ?? "-"}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Sales Person</span><span className="font-medium">{so.sales_person?.name ?? "-"}</span></div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">2. Customer Information</h3>
          <div className="mt-3 text-[13px] text-slate-600 dark:text-slate-300">
            <div className="flex justify-between"><span className="text-slate-500">Customer</span><span className="font-medium">{so.customer_name}</span></div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">3. Order Items</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                {["No.", "Item Name", "QTY", "Unit Price", "Subtotal"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {so.items.map((it, idx) => (
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
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">4. Notes</h4>
          <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-300">{so.notes ?? "No notes"}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4 col-span-2">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">5. Order Summary</h4>
          <div className="mt-3 text-[13px] text-slate-600 dark:text-slate-300 space-y-2">
            <div className="flex justify-between max-w-xs"><span className="text-slate-500">Subtotal</span><span className="font-medium">{formatRupiah(so.total_amount - taxTotal)}</span></div>
            <div className="flex justify-between max-w-xs"><span className="text-slate-500">Tax (11%)</span><span className="font-medium">{formatRupiah(taxTotal)}</span></div>
            <div className="flex justify-between max-w-xs pt-2 border-t border-slate-100 dark:border-slate-700"><span className="text-blue-600 font-semibold">Grand Total</span><span className="text-blue-600 font-semibold">{formatRupiah(so.total_amount)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
