"use client";

import { useMemo, useState } from "react";
import { api } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

type Customer = {
  id: number;
  name: string;
  address: string;
  pic: string;
  email: string;
  phone: string;
};

type SoLine = {
  id: number;
  item_name: string;
  qty: number;
  unit_price: number;
};

const customerOptions: Customer[] = [
  { id: 1, name: "PT Maju Sejahtera", address: "Jl. Merdeka No. 123\nJakarta Pusat", pic: "Budi Santoso", email: "budi@majubersama.co.id", phone: "0812-3456-7890" },
  { id: 2, name: "CV Karya Mandiri", address: "Jl. Sudirman No. 88\nJakarta Selatan", pic: "Rina Wijaya", email: "rina@solusilogistics.id", phone: "0813-1234-5678" },
  { id: 3, name: "UD Berkah Abadi", address: "Jl. Gatot Subroto No. 45\nJakarta Selatan", pic: "Ahmad Yusuf", email: "ahmad@sumberabadi.co.id", phone: "0821-9876-5432" },
];

const salesPersonOptions = ["Fauzi"];
const today = new Date().toISOString().split("T")[0];

const inputCls = "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[12px] text-slate-700 dark:text-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition";
const labelCls = "text-[11px] font-medium text-slate-500 dark:text-slate-400";

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

export default function SalesOrderCreateForm({ onCancel }: { onCancel?: () => void }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [soDate, setSoDate] = useState(today);
  const [salesPerson, setSalesPerson] = useState(salesPersonOptions[0]);
  const [warehouse, setWarehouse] = useState("");
  const [notes, setNotes] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState(String(customerOptions[0].id));
  const customer = useMemo(
    () => customerOptions.find((c) => c.id === Number(selectedCustomer)) ?? customerOptions[0],
    [selectedCustomer]
  );

  const [items, setItems] = useState<SoLine[]>([
    { id: 1, item_name: "Frozen Storage", qty: 100, unit_price: 150000 },
    { id: 2, item_name: "Handling In", qty: 100, unit_price: 10000 },
    { id: 3, item_name: "Handling Out", qty: 100, unit_price: 10000 },
  ]);

  const grandTotal = useMemo(() => items.reduce((s, i) => s + i.qty * i.unit_price, 0), [items]);

  function removeItem(id: number) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function addItem() {
    const newId = Math.max(0, ...items.map((i) => i.id)) + 1;
    setItems((prev) => [...prev, { id: newId, item_name: "New Item", qty: 1, unit_price: 0 }]);
  }

  async function submitSo(status: string) {
    setSubmitting(true);
    try {
      const body = {
        so_no: "SO-" + new Date().getFullYear() + "-" + String(Date.now()).slice(-6),
        date: soDate,
        customer_id: customer.id,
        customer_name: customer.name,
        total_amount: grandTotal,
        status,
        warehouse: warehouse || null,
        notes: notes || null,
        sales_person_id: 2,
        items: items.map((i) => ({
          item_name: i.item_name,
          quantity: i.qty,
          unit_price: i.unit_price,
          subtotal: i.qty * i.unit_price,
        })),
      };

      await api.post("/api/v1/sales/sales-orders", body);
      router.push("/sales/sales-management/sales-orders");
    } catch (err) {
      alert("Failed to save Sales Order: " + (err instanceof Error ? err.message : "Unknown error"));
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
              <label className={labelCls}>Sales Order No.</label>
              <input type="text" readOnly value="Auto-generated" className={inputCls + " bg-slate-50 dark:bg-slate-800 text-slate-400"} />
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Order Date <span className="text-rose-500">*</span></label>
              <input type="date" value={soDate} onChange={(e) => setSoDate(e.target.value)} className={inputCls} />
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Sales Person <span className="text-rose-500">*</span></label>
              <select value={salesPerson} onChange={(e) => setSalesPerson(e.target.value)} className={inputCls}>
                {salesPersonOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Warehouse</label>
              <input type="text" value={warehouse} onChange={(e) => setWarehouse(e.target.value)} placeholder="e.g. WH01 - Cold Storage 01" className={inputCls} />
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
              <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)} className={inputCls}>
                {customerOptions.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Address</label>
              <textarea readOnly value={customer.address} rows={4} className={inputCls + " resize-none bg-slate-50 dark:bg-slate-800"} />
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="grid gap-1.5">
                <label className={labelCls}>PIC</label>
                <input readOnly value={customer.pic} className={inputCls + " bg-slate-50 dark:bg-slate-800"} />
              </div>
              <div className="grid gap-1.5">
                <label className={labelCls}>Email</label>
                <input readOnly value={customer.email} className={inputCls + " bg-slate-50 dark:bg-slate-800"} />
              </div>
              <div className="grid gap-1.5">
                <label className={labelCls}>Phone</label>
                <input readOnly value={customer.phone} className={inputCls + " bg-slate-50 dark:bg-slate-800"} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5">
        <h3 className="text-[13px] font-semibold text-blue-600 dark:text-blue-400 mb-4">3. Item Details</h3>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button onClick={addItem} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold px-3 py-2 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><path d="M12 5v14M5 12h14"/></svg>
            Add Item
          </button>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-700">
          <table className="w-full min-w-[800px] border-separate border-spacing-0 text-[12px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                {["No.", "Item Name", "Qty", "Unit Price", "Amount", "Action"].map((h) => (
                  <th key={h} className="px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap first:rounded-tl-xl last:rounded-tr-xl">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const amount = item.qty * item.unit_price;
                return (
                  <tr key={item.id} className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-3 py-3 whitespace-nowrap text-slate-500 font-medium">{index + 1}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-slate-700 dark:text-slate-300 font-medium">{item.item_name}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-slate-700 dark:text-slate-300">{item.qty.toLocaleString("id-ID")}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-slate-700 dark:text-slate-300">{item.unit_price.toLocaleString("id-ID")}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-slate-700 dark:text-slate-300 font-semibold">{amount.toLocaleString("id-ID")}</td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <button title="Remove" onClick={() => removeItem(item.id)} className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-rose-300 hover:text-rose-500 text-slate-400 flex items-center justify-center transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
              {items.length === 0 && (
                <tr><td colSpan={6} className="py-10 text-center text-[12px] text-slate-400 dark:text-slate-600">No items added yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">Showing {items.length} item{items.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4 max-w-xs ml-auto">
        <h4 className="text-[13px] font-semibold text-slate-700 dark:text-slate-200 mb-2">Order Summary</h4>
        <div className="flex justify-between text-[13px]">
          <span className="text-slate-500">Grand Total</span>
          <span className="text-blue-600 font-bold">{formatRupiah(grandTotal)}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 justify-end pt-1 pb-4">
        <button onClick={onCancel} disabled={submitting} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[12px] font-medium px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
        <button onClick={() => submitSo("Draft")} disabled={submitting} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[12px] font-semibold px-5 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          {submitting ? "Saving..." : "Save as Draft"}
        </button>
        <button onClick={() => submitSo("Confirmed")} disabled={submitting} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold px-5 py-2.5 transition-colors shadow-sm">
          {submitting ? "Saving..." : "Save & Confirm"}
        </button>
      </div>
    </div>
  );
}
