"use client";

import { useState } from "react";
import { api } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

const customerOptions = [
  { id: 1, name: "PT Maju Sejahtera" },
  { id: 2, name: "CV Karya Mandiri" },
  { id: 3, name: "UD Berkah Abadi" },
];

const today = new Date().toISOString().split("T")[0];

const inputCls = "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[12px] text-slate-700 dark:text-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition";
const labelCls = "text-[11px] font-medium text-slate-500 dark:text-slate-400";

export default function DeliveryOrderCreateForm({ onCancel }: { onCancel?: () => void }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [doDate, setDoDate] = useState(today);
  const [customerId, setCustomerId] = useState(String(customerOptions[0].id));
  const [warehouse, setWarehouse] = useState("");
  const [deliveryType, setDeliveryType] = useState("Own Fleet");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [notes, setNotes] = useState("");

  async function submitDo(status: string) {
    setSubmitting(true);
    try {
      const customer = customerOptions.find((c) => c.id === Number(customerId)) ?? customerOptions[0];
      const body = {
        do_date: doDate,
        customer_id: customer.id,
        customer_name: customer.name,
        warehouse: warehouse || null,
        delivery_type: deliveryType,
        delivery_date: deliveryDate || null,
        notes: notes || null,
        status,
        total_amount: 0,
      };

      await api.post("/api/v1/sales/delivery-orders", body);
      router.push("/sales/sales-management/delivery-orders");
    } catch (err) {
      alert("Failed to save Delivery Order: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-5 max-w-[1440px] mx-auto">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5">
          <h3 className="text-[13px] font-semibold text-blue-600 dark:text-blue-400 mb-4">1. Order Information</h3>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <label className={labelCls}>DO Date <span className="text-rose-500">*</span></label>
              <input type="date" value={doDate} onChange={(e) => setDoDate(e.target.value)} className={inputCls} />
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>SO No.</label>
              <input type="text" readOnly value="Auto-generated" className={inputCls + " bg-slate-50 dark:bg-slate-800 text-slate-400"} />
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Warehouse</label>
              <input type="text" value={warehouse} onChange={(e) => setWarehouse(e.target.value)} placeholder="e.g. WH01 - Cold Storage 01" className={inputCls} />
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Delivery Type <span className="text-rose-500">*</span></label>
              <select value={deliveryType} onChange={(e) => setDeliveryType(e.target.value)} className={inputCls}>
                <option>Own Fleet</option>
                <option>External</option>
              </select>
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Delivery Date</label>
              <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} className={inputCls} />
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes" rows={3} className={inputCls + " resize-none"} />
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5">
          <h3 className="text-[13px] font-semibold text-blue-600 dark:text-blue-400 mb-4">2. Customer Information</h3>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <label className={labelCls}>Customer <span className="text-rose-500">*</span></label>
              <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} className={inputCls}>
                {customerOptions.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 justify-end pt-1 pb-4">
        <button onClick={onCancel} disabled={submitting} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[12px] font-medium px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
        <button onClick={() => submitDo("Pending")} disabled={submitting} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold px-5 py-2.5 transition-colors shadow-sm">
          {submitting ? "Saving..." : "Save as Draft"}
        </button>
      </div>
    </div>
  );
}
