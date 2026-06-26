"use client";

import { useState } from "react";
import { api } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

const customerOptions = [
  { id: 1, name: "PT Maju Sejahtera" },
  { id: 2, name: "CV Karya Mandiri" },
  { id: 3, name: "UD Berkah Abadi" },
];

const returnTypeOptions = ["Return", "Exchange", "Credit Note"];

const today = new Date().toISOString().split("T")[0];

const inputCls = "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[12px] text-slate-700 dark:text-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition";
const labelCls = "text-[11px] font-medium text-slate-500 dark:text-slate-400";

export default function SalesReturnCreateForm({ onCancel }: { onCancel?: () => void }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [returnDate, setReturnDate] = useState(today);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [customerId, setCustomerId] = useState(String(customerOptions[0].id));
  const [returnType, setReturnType] = useState(returnTypeOptions[0]);
  const [reason, setReason] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [notes, setNotes] = useState("");

  async function submitReturn(status: string) {
    setSubmitting(true);
    try {
      const body = {
        return_date: returnDate,
        invoice_no: invoiceNo || null,
        customer_id: Number(customerId),
        return_type: returnType,
        reason: reason || null,
        total_amount: Number(totalAmount) || 0,
        status,
        notes: notes || null,
      };

      await api.post("/api/v1/sales/sales-returns", body);
      router.push("/sales/sales-management/sales-returns");
    } catch (err) {
      alert("Failed to save Sales Return: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-5 max-w-[640px] mx-auto">
      <div className="rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4">Return Information</h3>
        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <label className={labelCls}>Return No.</label>
            <input type="text" readOnly value="Auto-generated" className={inputCls + " bg-slate-50 dark:bg-slate-800 text-slate-400"} />
          </div>
          <div className="grid gap-1.5">
            <label className={labelCls}>Return Date <span className="text-rose-500">*</span></label>
            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className={inputCls} />
          </div>
          <div className="grid gap-1.5">
            <label className={labelCls}>Invoice No.</label>
            <input type="text" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} placeholder="e.g. INV-001" className={inputCls} />
          </div>
          <div className="grid gap-1.5">
            <label className={labelCls}>Customer <span className="text-rose-500">*</span></label>
            <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} className={inputCls}>
              {customerOptions.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="grid gap-1.5">
            <label className={labelCls}>Return Type <span className="text-rose-500">*</span></label>
            <select value={returnType} onChange={(e) => setReturnType(e.target.value)} className={inputCls}>
              {returnTypeOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="grid gap-1.5">
            <label className={labelCls}>Reason</label>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for return" rows={3} className={inputCls + " resize-none"} />
          </div>
          <div className="grid gap-1.5">
            <label className={labelCls}>Total Amount</label>
            <input type="number" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} placeholder="0" className={inputCls} />
          </div>
          <div className="grid gap-1.5">
            <label className={labelCls}>Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes" rows={3} className={inputCls + " resize-none"} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 justify-end pt-1 pb-4">
        <button onClick={onCancel} disabled={submitting} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[12px] font-medium px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
        <button onClick={() => submitReturn("Pending")} disabled={submitting} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[12px] font-semibold px-5 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          {submitting ? "Saving..." : "Save as Draft"}
        </button>
        <button onClick={() => submitReturn("Approved")} disabled={submitting} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold px-5 py-2.5 transition-colors shadow-sm">
          {submitting ? "Saving..." : "Save & Confirm"}
        </button>
      </div>
    </div>
  );
}
