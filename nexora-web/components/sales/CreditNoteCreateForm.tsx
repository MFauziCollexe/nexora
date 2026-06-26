"use client";

import { useState } from "react";
import { api } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

const customerOptions = [
  { id: 1, name: "PT Maju Sejahtera" },
  { id: 2, name: "CV Karya Mandiri" },
  { id: 3, name: "UD Berkah Abadi" },
];

const reasonOptions = ["Overpayment", "Return Item", "Price Adjustment", "Service Adjustment"];

const today = new Date().toISOString().split("T")[0];

const inputCls = "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[12px] text-slate-700 dark:text-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition";
const labelCls = "text-[11px] font-medium text-slate-500 dark:text-slate-400";

export default function CreditNoteCreateForm({ onCancel }: { onCancel?: () => void }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [cnDate, setCnDate] = useState(today);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [customerId, setCustomerId] = useState(String(customerOptions[0].id));
  const [reason, setReason] = useState(reasonOptions[0]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [usedAmount, setUsedAmount] = useState(0);
  const [expiresOn, setExpiresOn] = useState("");
  const [notes, setNotes] = useState("");

  async function submitCn(status: string) {
    setSubmitting(true);
    try {
      const body = {
        credit_note_no: "CN-" + new Date().getFullYear() + "-" + String(Date.now()).slice(-6),
        date: cnDate,
        invoice_no: invoiceNo || null,
        customer_id: Number(customerId),
        customer_name: customerOptions.find((c) => c.id === Number(customerId))?.name ?? "",
        reason: reason || null,
        total_amount: totalAmount,
        used_amount: usedAmount,
        status,
        expires_on: expiresOn || null,
        notes: notes || null,
      };

      await api.post("/api/v1/sales/credit-notes", body);
      router.push("/sales/sales-management/credit-notes");
    } catch (err) {
      alert("Failed to save Credit Note: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-5 max-w-[1440px] mx-auto">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5">
          <h3 className="text-[13px] font-semibold text-blue-600 dark:text-blue-400 mb-4">1. Credit Note Information</h3>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <label className={labelCls}>Credit Note No.</label>
              <input type="text" readOnly value="Auto-generated" className={inputCls + " bg-slate-50 dark:bg-slate-800 text-slate-400"} />
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Date <span className="text-rose-500">*</span></label>
              <input type="date" value={cnDate} onChange={(e) => setCnDate(e.target.value)} className={inputCls} />
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Invoice No.</label>
              <input type="text" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} placeholder="e.g. INV-2025-0001" className={inputCls} />
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Customer <span className="text-rose-500">*</span></label>
              <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} className={inputCls}>
                {customerOptions.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Reason</label>
              <select value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls}>
                {reasonOptions.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5">
          <h3 className="text-[13px] font-semibold text-blue-600 dark:text-blue-400 mb-4">2. Amount Information</h3>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <label className={labelCls}>Total Amount <span className="text-rose-500">*</span></label>
              <input type="number" min={0} value={totalAmount} onChange={(e) => setTotalAmount(Number(e.target.value))} className={inputCls} />
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Used Amount</label>
              <input type="number" min={0} value={usedAmount} onChange={(e) => setUsedAmount(Number(e.target.value))} className={inputCls} />
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Expires On</label>
              <input type="date" value={expiresOn} onChange={(e) => setExpiresOn(e.target.value)} className={inputCls} />
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Status</label>
              <select value="Unused" className={inputCls + " bg-slate-50 dark:bg-slate-800 text-slate-400"}>
                <option>Unused</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5">
        <h3 className="text-[13px] font-semibold text-blue-600 dark:text-blue-400 mb-4">3. Notes</h3>
        <div className="grid gap-1.5">
          <label className={labelCls}>Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes" rows={4} className={inputCls + " resize-none"} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 justify-end pt-1 pb-4">
        <button onClick={onCancel} disabled={submitting} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[12px] font-medium px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
        <button onClick={() => submitCn("Unused")} disabled={submitting} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold px-5 py-2.5 transition-colors shadow-sm">
          {submitting ? "Saving..." : "Save as Draft"}
        </button>
      </div>
    </div>
  );
}
