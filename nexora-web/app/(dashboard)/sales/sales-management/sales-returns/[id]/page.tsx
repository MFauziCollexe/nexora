"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/apiClient";

function statusClasses(status: string) {
  const map: Record<string, string> = {
    Approved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400",
    Pending: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400",
    Rejected: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400",
  };
  return map[status] ?? map.Pending;
}

function formatRupiah(v: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);
}

type SalesReturnDetail = {
  id: number;
  return_no: string;
  return_date: string;
  invoice_id: number | null;
  invoice_no: string | null;
  customer_id: number;
  customer_name: string;
  return_type: string;
  reason: string | null;
  total_amount: number;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export default function SalesReturnDetailPage() {
  const params = useParams();
  const [ret, setRet] = useState<SalesReturnDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<SalesReturnDetail>(`/api/v1/sales/sales-returns/${params.id}`).then((res) => {
      setRet(res);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="p-4 text-[12px] text-slate-400 dark:text-slate-600">Loading...</div>;
  if (!ret) return <div className="p-4 text-[12px] text-red-500">Sales Return not found</div>;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/sales/sales-management/sales-returns" className="text-slate-500 hover:text-blue-500">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 inline mr-1"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back
        </Link>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Sales Return Detail</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Return Information</h3>
          <div className="mt-3 text-[13px] text-slate-600 dark:text-slate-300 grid grid-cols-2 gap-y-2">
            <div className="flex justify-between"><span className="text-slate-500">Return No.</span><span className="font-medium">{ret.return_no}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Return Date</span><span className="font-medium">{ret.return_date}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Invoice No.</span><span className="font-medium">{ret.invoice_no ?? "-"}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Return Type</span><span className="font-medium">{ret.return_type}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Status</span><span className={`text-[12px] font-semibold px-2 py-0.5 rounded-full ${statusClasses(ret.status)}`}>{ret.status}</span></div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Customer Information</h3>
          <div className="mt-3 text-[13px] text-slate-600 dark:text-slate-300">
            <div className="flex justify-between"><span className="text-slate-500">Customer</span><span className="font-medium">{ret.customer_name}</span></div>
          </div>
        </div>
      </div>

      {ret.reason && (
        <div className="rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Reason</h3>
          <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-300">{ret.reason}</p>
        </div>
      )}

      {ret.notes && (
        <div className="rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Notes</h3>
          <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-300">{ret.notes ?? "No notes"}</p>
        </div>
      )}

      <div className="rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Summary</h3>
        <div className="mt-3 text-[13px] text-slate-600 dark:text-slate-300">
          <div className="flex justify-between max-w-xs"><span className="text-slate-500">Total Amount</span><span className="text-blue-600 font-semibold">{formatRupiah(ret.total_amount)}</span></div>
        </div>
      </div>
    </div>
  );
}
