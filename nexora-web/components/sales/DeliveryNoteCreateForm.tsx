"use client";

import { useState } from "react";
import { api } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

type Customer = {
  id: number;
  name: string;
};

const customerOptions: Customer[] = [
  { id: 1, name: "PT Maju Sejahtera" },
  { id: 2, name: "CV Karya Mandiri" },
  { id: 3, name: "UD Berkah Abadi" },
];

const today = new Date().toISOString().split("T")[0];

const inputCls = "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[12px] text-slate-700 dark:text-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition";
const labelCls = "text-[11px] font-medium text-slate-500 dark:text-slate-400";

export default function DeliveryNoteCreateForm({ onCancel }: { onCancel?: () => void }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [dnDate, setDnDate] = useState(today);
  const [customerId, setCustomerId] = useState(String(customerOptions[0].id));
  const [deliveryDate, setDeliveryDate] = useState("");
  const [receiver, setReceiver] = useState("");
  const [status, setStatus] = useState("Pending");
  const [notes, setNotes] = useState("");

  async function submitDn() {
    setSubmitting(true);
    try {
      const customer = customerOptions.find((c) => c.id === Number(customerId));
      const body = {
        dn_no: "DN-" + new Date().getFullYear() + "-" + String(Date.now()).slice(-6),
        dn_date: dnDate,
        customer_id: Number(customerId),
        customer_name: customer?.name ?? "",
        delivery_date: deliveryDate || null,
        receiver: receiver || null,
        status,
        notes: notes || null,
        total_amount: 0,
      };

      await api.post("/api/v1/sales/delivery-notes", body);
      router.push("/sales/sales-management/delivery-notes");
    } catch (err) {
      alert("Failed to save Delivery Note: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-5 max-w-[1440px] mx-auto">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5">
          <h3 className="text-[13px] font-semibold text-blue-600 dark:text-blue-400 mb-4">1. Delivery Note Information</h3>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <label className={labelCls}>DN No.</label>
              <input type="text" readOnly value="Auto-generated" className={inputCls + " bg-slate-50 dark:bg-slate-800 text-slate-400"} />
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>DN Date <span className="text-rose-500">*</span></label>
              <input type="date" value={dnDate} onChange={(e) => setDnDate(e.target.value)} className={inputCls} />
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>DO No.</label>
              <input type="text" readOnly value="Auto-generated" className={inputCls + " bg-slate-50 dark:bg-slate-800 text-slate-400"} />
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Customer <span className="text-rose-500">*</span></label>
              <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} className={inputCls}>
                {customerOptions.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Delivery Date</label>
              <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} className={inputCls} />
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Receiver</label>
              <input type="text" value={receiver} onChange={(e) => setReceiver(e.target.value)} placeholder="Receiver name" className={inputCls} />
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputCls}>
                {["Pending", "In Process", "Completed"].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes" rows={3} className={inputCls + " resize-none"} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 justify-end pt-1 pb-4">
        <button onClick={onCancel} disabled={submitting} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[12px] font-medium px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
        <button onClick={submitDn} disabled={submitting} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[12px] font-semibold px-5 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          {submitting ? "Saving..." : "Save as Draft"}
        </button>
      </div>
    </div>
  );
}
