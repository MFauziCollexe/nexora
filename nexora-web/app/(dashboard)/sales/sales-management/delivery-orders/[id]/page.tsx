"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/apiClient";

function statusClasses(status: string) {
  const map: Record<string, string> = {
    Completed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400",
    "In Delivery": "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400",
    Pending: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400",
    Cancelled: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400",
  };
  return map[status] ?? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400";
}

type DeliveryOrderDetail = {
  id: number;
  do_no: string;
  do_date: string;
  sales_order_id: number | null;
  so_no: string | null;
  customer_id: number;
  customer_name: string;
  warehouse: string | null;
  delivery_date: string | null;
  status: string;
  delivery_type: string;
  total_amount: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

function formatRupiah(v: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);
}

export default function DeliveryOrderDetailPage() {
  const params = useParams();
  const [doData, setDoData] = useState<DeliveryOrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<DeliveryOrderDetail>(`/api/v1/sales/delivery-orders/${params.id}`).then((res) => {
      setDoData(res);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="p-4 text-[12px] text-slate-400 dark:text-slate-600">Loading...</div>;
  if (!doData) return <div className="p-4 text-[12px] text-red-500">Delivery Order not found</div>;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/sales/sales-management/delivery-orders" className="text-slate-500 hover:text-blue-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 inline mr-1"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </Link>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Delivery Order Detail</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">1. Order Information</h3>
          <div className="mt-3 text-[13px] text-slate-600 dark:text-slate-300 grid grid-cols-2 gap-y-2">
            <div className="flex justify-between"><span className="text-slate-500">DO No.</span><span className="font-medium">{doData.do_no}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">DO Date</span><span className="font-medium">{doData.do_date}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">SO No.</span><span className="font-medium">{doData.so_no ?? "-"}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Delivery Date</span><span className="font-medium">{doData.delivery_date ?? "-"}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Delivery Type</span><span className="font-medium">{doData.delivery_type}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Status</span><span className={`text-[12px] font-semibold px-2 py-0.5 rounded-full ${statusClasses(doData.status)}`}>{doData.status}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Warehouse</span><span className="font-medium">{doData.warehouse ?? "-"}</span></div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">2. Customer Information</h3>
          <div className="mt-3 text-[13px] text-slate-600 dark:text-slate-300">
            <div className="flex justify-between"><span className="text-slate-500">Customer</span><span className="font-medium">{doData.customer_name}</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">3. Notes</h4>
          <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-300">{doData.notes ?? "No notes"}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4 col-span-2">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">4. Summary</h4>
          <div className="mt-3 text-[13px] text-slate-600 dark:text-slate-300 space-y-2">
            <div className="flex justify-between max-w-xs"><span className="text-slate-500">Total Amount</span><span className="font-medium">{formatRupiah(doData.total_amount)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
