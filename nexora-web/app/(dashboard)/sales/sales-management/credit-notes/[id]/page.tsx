"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/apiClient";

function statusClasses(status: string) {
  const map: Record<string, string> = {
    Used: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400",
    Unused: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400",
    Partial: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400",
  };
  return map[status] ?? map.Unused;
}

type CreditNoteDetail = {
  id: number;
  credit_note_no: string;
  date: string;
  invoice_id: number | null;
  invoice_no: string | null;
  customer_id: number;
  customer_name: string;
  reason: string | null;
  total_amount: number;
  used_amount: number;
  status: string;
  expires_on: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

function formatRupiah(v: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);
}

export default function CreditNoteDetailPage() {
  const params = useParams();
  const [cn, setCn] = useState<CreditNoteDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<CreditNoteDetail>(`/api/v1/sales/credit-notes/${params.id}`).then((res) => {
      setCn(res);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="p-4 text-[12px] text-slate-400 dark:text-slate-600">Loading...</div>;
  if (!cn) return <div className="p-4 text-[12px] text-red-500">Credit Note not found</div>;

  const remaining = cn.total_amount - cn.used_amount;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/sales/sales-management/credit-notes" className="text-slate-500 hover:text-blue-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 inline mr-1"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </Link>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Credit Note Detail</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">1. Credit Note Information</h3>
          <div className="mt-3 text-[13px] text-slate-600 dark:text-slate-300 grid grid-cols-2 gap-y-2">
            <div className="flex justify-between"><span className="text-slate-500">CN No.</span><span className="font-medium">{cn.credit_note_no}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Date</span><span className="font-medium">{cn.date}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Invoice No.</span><span className="font-medium">{cn.invoice_no ?? "-"}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Status</span><span className={`text-[12px] font-semibold px-2 py-0.5 rounded-full ${statusClasses(cn.status)}`}>{cn.status}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Reason</span><span className="font-medium">{cn.reason ?? "-"}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Expires On</span><span className="font-medium">{cn.expires_on ?? "-"}</span></div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">2. Customer Information</h3>
          <div className="mt-3 text-[13px] text-slate-600 dark:text-slate-300">
            <div className="flex justify-between"><span className="text-slate-500">Customer</span><span className="font-medium">{cn.customer_name}</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">3. Notes</h4>
          <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-300">{cn.notes ?? "No notes"}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4 col-span-2">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">4. Summary</h4>
          <div className="mt-3 text-[13px] text-slate-600 dark:text-slate-300 space-y-2">
            <div className="flex justify-between max-w-xs"><span className="text-slate-500">Total Amount</span><span className="font-medium">{formatRupiah(cn.total_amount)}</span></div>
            <div className="flex justify-between max-w-xs"><span className="text-slate-500">Used Amount</span><span className="font-medium">{formatRupiah(cn.used_amount)}</span></div>
            <div className="flex justify-between max-w-xs pt-2 border-t border-slate-100 dark:border-slate-700"><span className="text-blue-600 font-semibold">Remaining</span><span className="text-blue-600 font-semibold">{formatRupiah(remaining)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
