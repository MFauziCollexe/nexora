"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { api } from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

type MasterItem = {
  id: number;
  code: string;
  name: string;
  type_name: string;
  description: string;
  uom_name: string;
  unit_price: number;
};

type QuotationLine = {
  id: number;
  masterItemId: number | null;
  itemCode: string;
  itemName: string;
  type: string;
  description: string;
  uom: string;
  qty: number;
  unitPrice: number;
  discount: number;
  tax: number;
};

type Customer = {
  id: number;
  name: string;
  address: string;
  pic: string;
  email: string;
  phone: string;
};

const customerOptions: Customer[] = [
  { id: 1, name: "PT Maju Sejahtera", address: "Jl. Merdeka No. 123\nJakarta Pusat, DKI Jakarta 10110\nIndonesia", pic: "Budi Santoso", email: "budi@majubersama.co.id", phone: "0812-3456-7890" },
  { id: 2, name: "CV Karya Mandiri", address: "Jl. Sudirman No. 88\nJakarta Selatan, DKI Jakarta 12920\nIndonesia", pic: "Rina Wijaya", email: "rina@solusilogistics.id", phone: "0813-1234-5678" },
  { id: 3, name: "UD Berkah Abadi", address: "Jl. Gatot Subroto No. 45\nJakarta Selatan 12930\nIndonesia", pic: "Ahmad Yusuf", email: "ahmad@sumberabadi.co.id", phone: "0821-9876-5432" },
];

const currencyOptions = ["IDR - Indonesian Rupiah", "USD - US Dollar"];
const paymentTermsOptions = ["NET 30", "NET 15", "Due on Receipt"];
const salesPersonOptions = ["Fauzi"];

const today = new Date().toISOString().split("T")[0];
const nextMonth = new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0];

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

const inputCls = "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[12px] text-slate-700 dark:text-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition";
const labelCls = "text-[11px] font-medium text-slate-500 dark:text-slate-400";

export default function QuotationCreateForm({ onCancel, quotationId, readOnly }: {
  onCancel?: () => void;
  quotationId?: number;
  readOnly?: boolean;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [pageLoading, setPageLoading] = useState(!!quotationId);
  const [quotationNo, setQuotationNo] = useState("");
  const [quotationDate, setQuotationDate] = useState(today);
  const [validUntil, setValidUntil] = useState(nextMonth);
  const [currency, setCurrency] = useState(currencyOptions[0]);
  const [paymentTerms, setPaymentTerms] = useState(paymentTermsOptions[0]);
  const [salesPerson, setSalesPerson] = useState(salesPersonOptions[0]);
  const [referenceNo, setReferenceNo] = useState("");
  const [description, setDescription] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState(String(customerOptions[0].id));
  const customer = useMemo(
    () => customerOptions.find((c) => c.id === Number(selectedCustomer)) ?? customerOptions[0],
    [selectedCustomer]
  );

  const [serverAttachments, setServerAttachments] = useState<{ name: string; url: string }[]>([]);

  const [masterItems, setMasterItems] = useState<MasterItem[]>([]);
  const [itemsLoading, setItemsLoading] = useState(true);

  useEffect(() => {
    api.get<MasterItem[]>("/api/v1/master-data/inventory/items?per_page=200").then((res) => {
      setMasterItems(res);
      setItemsLoading(false);
    }).catch(() => setItemsLoading(false));
  }, []);

  useEffect(() => {
    if (!quotationId) return;
    api.get<{
      quotation_no: string; date: string; valid_until: string | null; customer_id: number; customer_name: string;
      total_amount: number; status: string; notes: string | null;
      sales_person: { name: string } | null;
      attachments: { name: string; url: string }[];
      items: { item_name: string; quantity: number; unit_price: number; subtotal: number }[];
    }>(`/api/v1/sales/quotations/${quotationId}`).then((res) => {
      setQuotationNo(res.quotation_no);
      setQuotationDate(res.date);
      if (res.valid_until) setValidUntil(res.valid_until);
      setSelectedCustomer(String(res.customer_id));
      if (res.sales_person) setSalesPerson(res.sales_person.name);
      setNotes(res.notes ?? "");
      setItems(res.items.map((it, idx) => ({
        id: idx + 1,
        masterItemId: null,
        itemCode: "",
        itemName: it.item_name,
        type: "",
        description: "",
        uom: "",
        qty: it.quantity,
        unitPrice: it.unit_price,
        discount: 0,
        tax: 11,
      })));
      if (res.attachments) setServerAttachments(res.attachments);
      setPageLoading(false);
    }).catch(() => setPageLoading(false));
  }, [quotationId]);

  const [items, setItems] = useState<QuotationLine[]>([]);
  const [globalDiscount, setGlobalDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<"%" | "IDR">("%");

  const [notes, setNotes] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleItemSelect(lineId: number, masterId: string) {
    const item = masterItems.find((m) => m.id === Number(masterId));
    if (!item) return;
    setItems((prev) => prev.map((l) =>
      l.id === lineId ? {
        ...l,
        masterItemId: item.id,
        itemCode: item.code,
        itemName: item.name,
        type: item.type_name,
        description: item.description,
        uom: item.uom_name,
        unitPrice: item.unit_price,
      } : l
    ));
  }

  function updateLineField(id: number, field: keyof QuotationLine, value: string | number) {
    setItems((prev) => prev.map((l) => l.id === id ? { ...l, [field]: value } : l));
  }

  const subtotal = useMemo(() => items.reduce((s, item) => s + item.qty * item.unitPrice, 0), [items]);
  const taxTotal = useMemo(() => items.reduce((s, item) => s + (item.qty * item.unitPrice * (1 - item.discount / 100) * item.tax) / 100, 0), [items]);
  const discountTotal = useMemo(() => {
    if (discountType === "%") return (subtotal * globalDiscount) / 100;
    return globalDiscount;
  }, [subtotal, globalDiscount, discountType]);
  const grandTotal = subtotal - discountTotal + taxTotal;

  function removeItem(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function addItem() {
    const newId = Math.max(0, ...items.map((i) => i.id)) + 1;
    setItems((prev) => [...prev, {
      id: newId,
      masterItemId: null,
      itemCode: "",
      itemName: "",
      type: "",
      description: "",
      uom: "",
      qty: 1,
      unitPrice: 0,
      discount: 0,
      tax: 11,
    }]);
  }

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const valid = Array.from(files).filter((f) => f.size <= 5 * 1024 * 1024 && ["application/pdf", "image/jpeg", "image/png"].includes(f.type));
    setAttachments((prev) => [...prev, ...valid]);
  }

  async function submitQuotation(status: string) {
    setSubmitting(true);
    try {
      const salesPersonMap: Record<string, number> = { Fauzi: 2 };
      const body: Record<string, unknown> = {
        quotation_no: "QT-" + new Date().getFullYear() + "-" + String(Date.now()).slice(-6),
        date: quotationDate,
        customer_id: customer.id,
        customer_name: customer.name,
        total_amount: grandTotal,
        status,
        valid_until: validUntil,
        sales_person_id: salesPersonMap[salesPerson] ?? 1,
        notes: notes || null,
        items: items.map((item) => ({
          item_name: item.itemName,
          quantity: item.qty,
          unit_price: item.unitPrice,
          subtotal: item.qty * item.unitPrice,
        })),
      };

      const created = await api.post<{ id: number }>("/api/v1/sales/quotations", body);

      if (attachments.length > 0) {
        const formData = new FormData();
        attachments.forEach((file) => formData.append("attachments[]", file));

        await api.post(`/api/v1/sales/quotations/${created.id}/attachments`, formData);
      }

      router.push("/sales/sales-management/quotations");
    } catch (err) {
      alert("Failed to save quotation: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  }

  const cellCls = "w-full bg-transparent border-0 text-[12px] text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-0 p-0";
  const cellInputCls = "w-full bg-transparent border border-transparent hover:border-slate-200 dark:hover:border-slate-600 focus:border-blue-300 dark:focus:border-blue-700 rounded px-1.5 py-1 text-[12px] text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-800 transition";
  const disabledInputCls = "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[12px] text-slate-500 dark:text-slate-400 px-3 py-2";
  const itemHeaders = useMemo(() => {
    const headers = ["No.", "Item Code", "Item Name", "Type", "Description", "UOM", "Qty", "Unit Price", "Discount (%)", "Tax (%)", "Amount"];
    if (!readOnly) headers.push("Action");
    return headers;
  }, [readOnly]);

  if (pageLoading) {
    return <div className="py-14 text-center text-[12px] text-slate-400 dark:text-slate-600">Loading quotation...</div>;
  }

  return (
    <div className="space-y-5 max-w-[1440px] mx-auto">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5">
          <h3 className="text-[13px] font-semibold text-blue-600 dark:text-blue-400 mb-4">1. Quotation Information</h3>
          <div className="grid gap-4">
              <div className="grid gap-1.5">
                <label className={labelCls}>Quotation No.</label>
                <div className="flex items-center gap-2">
                  <input type="text" readOnly value={quotationNo || (readOnly ? "-" : "Auto-generated")} className={readOnly ? disabledInputCls : (inputCls + " bg-slate-50 dark:bg-slate-800 text-slate-400")} />
                  {!readOnly && <span className="shrink-0 rounded-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-500 dark:text-slate-400 px-2.5 py-1 font-medium">Auto</span>}
                </div>
              </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <label className={labelCls}>Quotation Date <span className="text-rose-500">*</span></label>
                <input type="date" value={quotationDate} onChange={(e) => setQuotationDate(e.target.value)} disabled={readOnly} className={readOnly ? disabledInputCls : inputCls} />
              </div>
              <div className="grid gap-1.5">
                <label className={labelCls}>Valid Until <span className="text-rose-500">*</span></label>
                <input type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} disabled={readOnly} className={readOnly ? disabledInputCls : inputCls} />
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="grid gap-1.5">
                <label className={labelCls}>Currency <span className="text-rose-500">*</span></label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} disabled={readOnly} className={readOnly ? disabledInputCls : inputCls}>
                  {currencyOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="grid gap-1.5">
                <label className={labelCls}>Payment Terms</label>
                <select value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} disabled={readOnly} className={readOnly ? disabledInputCls : inputCls}>
                  {paymentTermsOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="grid gap-1.5">
                <label className={labelCls}>Sales Person <span className="text-rose-500">*</span></label>
                <select value={salesPerson} onChange={(e) => setSalesPerson(e.target.value)} disabled={readOnly} className={readOnly ? disabledInputCls : inputCls}>
                  {salesPersonOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Reference No.</label>
              <input type="text" value={referenceNo} onChange={(e) => setReferenceNo(e.target.value)} disabled={readOnly} placeholder="Enter reference number (optional)" className={readOnly ? disabledInputCls : inputCls} />
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} disabled={readOnly} placeholder="Enter quotation description (optional)" rows={3} className={(readOnly ? disabledInputCls : inputCls) + " resize-none"} />
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5">
          <h3 className="text-[13px] font-semibold text-blue-600 dark:text-blue-400 mb-4">2. Customer Information</h3>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <label className={labelCls}>Customer <span className="text-rose-500">*</span></label>
              <div className="flex gap-2">
                <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)} disabled={readOnly} className={readOnly ? disabledInputCls : inputCls}>
                  {customerOptions.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                {!readOnly && <button title="Add new customer" className="shrink-0 w-10 h-[38px] rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 hover:text-blue-600 hover:border-blue-300 text-lg font-semibold transition-colors">+</button>}
              </div>
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Address</label>
              <textarea readOnly value={customer.address} rows={4} className={inputCls + " resize-none bg-slate-50 dark:bg-slate-800 whitespace-pre-wrap"} />
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
        {readOnly ? (
          <h4 className="text-[12px] font-semibold text-slate-600 dark:text-slate-300">Items</h4>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={addItem} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold px-3 py-2 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><path d="M12 5v14M5 12h14"/></svg>
                Add Item
              </button>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-slate-500">
              <span>Discount</span>
              <select value={discountType} onChange={(e) => setDiscountType(e.target.value as "%" | "IDR")} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[12px] px-2 py-2">
                <option>%</option>
                <option>IDR</option>
              </select>
              <input type="number" min={0} value={globalDiscount} onChange={(e) => setGlobalDiscount(Number(e.target.value))} className="w-20 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[12px] text-slate-700 dark:text-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
          </div>
        )}
        <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-700">
          <table className="w-full min-w-[1200px] border-separate border-spacing-0 text-[12px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                {itemHeaders.map((h) => (
                  <th key={h} className="px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap first:rounded-tl-xl last:rounded-tr-xl">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const amount = item.qty * item.unitPrice * (1 - item.discount / 100);
                return (
                  <tr key={item.id} className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-3 py-2 whitespace-nowrap text-slate-500 font-medium">{index + 1}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-slate-700 dark:text-slate-300">
                      {item.itemCode || "-"}
                    </td>
                    <td className="px-3 py-2 min-w-[200px]">
                      {readOnly ? (
                        <span className="text-[12px] text-slate-700 dark:text-slate-300">{item.itemName || "-"}</span>
                      ) : itemsLoading ? (
                        <span className="text-[12px] text-slate-400">Loading items...</span>
                      ) : (
                        <select
                          value={item.masterItemId ?? ""}
                          onChange={(e) => handleItemSelect(item.id, e.target.value)}
                          className="w-full rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[12px] text-slate-700 dark:text-slate-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                          <option value="">-- Select Item --</option>
                          {masterItems.map((m) => (
                            <option key={m.id} value={m.id}>{m.code} - {m.name}</option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {item.type ? (
                        <span className="inline-flex rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 text-[10px] font-semibold">{item.type}</span>
                      ) : "-"}
                    </td>
                    <td className="px-3 py-2 min-w-[180px] text-slate-500 dark:text-slate-400 text-[11px]">{item.description || "-"}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-slate-600 dark:text-slate-400">{item.uom || "-"}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {readOnly ? (
                        <span className="text-[12px] text-slate-700 dark:text-slate-300">{item.qty}</span>
                      ) : (
                        <input type="number" min={1} value={item.qty} onChange={(e) => updateLineField(item.id, "qty", Number(e.target.value))} className={cellInputCls + " w-16 text-center" + (item.masterItemId === null ? " opacity-40" : "")} disabled={item.masterItemId === null} />
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {readOnly ? (
                        <span className="text-[12px] text-slate-700 dark:text-slate-300">{formatRupiah(item.unitPrice)}</span>
                      ) : (
                        <input type="number" min={0} value={item.unitPrice} onChange={(e) => updateLineField(item.id, "unitPrice", Number(e.target.value))} className={cellInputCls + " w-24 text-right" + (item.masterItemId === null ? " opacity-40" : "")} disabled={item.masterItemId === null} />
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {readOnly ? (
                        <span className="text-[12px] text-slate-700 dark:text-slate-300">{item.discount}%</span>
                      ) : (
                        <input type="number" min={0} max={100} value={item.discount} onChange={(e) => updateLineField(item.id, "discount", Number(e.target.value))} className={cellInputCls + " w-14 text-center" + (item.masterItemId === null ? " opacity-40" : "")} disabled={item.masterItemId === null} />
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {readOnly ? (
                        <span className="text-[12px] text-slate-700 dark:text-slate-300">{item.tax}%</span>
                      ) : (
                        <input type="number" min={0} max={100} value={item.tax} onChange={(e) => updateLineField(item.id, "tax", Number(e.target.value))} className={cellInputCls + " w-14 text-center" + (item.masterItemId === null ? " opacity-40" : "")} disabled={item.masterItemId === null} />
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-slate-700 dark:text-slate-300 font-semibold text-right">
                      {item.masterItemId !== null ? amount.toLocaleString("id-ID") : "-"}
                    </td>
                    {!readOnly && (
                      <td className="px-3 py-2 whitespace-nowrap">
                        <button title="Remove" onClick={() => removeItem(item.id)} className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-rose-300 hover:text-rose-500 text-slate-400 flex items-center justify-center transition-colors">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
              {items.length === 0 && (
                <tr><td colSpan={readOnly ? 11 : 12} className="py-10 text-center text-[12px] text-slate-400 dark:text-slate-600">No items</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">Showing {items.length} item{items.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr] items-end">
        <div className="rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 flex flex-col h-full">
          <h3 className="text-[13px] font-semibold text-blue-600 dark:text-blue-400 mb-4">4. Notes &amp; Attachments</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-1.5">
              <label className={labelCls}>Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} disabled={readOnly} placeholder="Enter notes (optional)" rows={6} className={(readOnly ? disabledInputCls : inputCls) + " resize-none min-h-[160px]"} />
            </div>
            <div className="grid gap-1.5">
              <label className={labelCls}>Attachments</label>
              <div className="h-full flex flex-col">
                {readOnly ? (
                  serverAttachments.length > 0 ? (
                    <ul className="space-y-2">
                      {serverAttachments.map((att, i) => (
                        <li key={i}>
                          <a href={att.url} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[12px] text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 shrink-0">
                              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                              <polyline points="14 2 14 8 20 8"/>
                            </svg>
                            {att.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[12px] text-slate-400 dark:text-slate-500 py-4 text-center">No attachments</p>
                  )
                ) : (
                  <></>
                )}
                {!readOnly && (
                  <><div onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }} onClick={() => fileInputRef.current?.click()}
                    className={`w-full rounded-xl border-2 border-dashed px-6 py-6 text-center cursor-pointer transition-colors flex items-center justify-center min-h-[160px] ${dragging ? "border-blue-400 bg-blue-50 dark:bg-blue-950" : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <p className="text-[12px] font-medium text-slate-600 dark:text-slate-300">Drag &amp; drop files here <span className="text-blue-500">or click to browse</span></p>
                    <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">Max file size 5MB (PDF, JPG, PNG)</p>
                    <input ref={fileInputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
                  </div>
                  {attachments.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {attachments.map((file, i) => (
                        <li key={`attach-${i}`} className="flex items-center justify-between text-[11px] bg-slate-50 dark:bg-slate-900 rounded-lg px-3 py-2 border border-slate-200 dark:border-slate-700">
                          <span className="text-slate-600 dark:text-slate-300 truncate">{file.name}</span>
                          <button onClick={() => setAttachments((prev) => prev.filter((_, idx) => idx !== i))} className="text-rose-400 hover:text-rose-600 ml-3 shrink-0">✕</button>
                        </li>
                      ))}
                    </ul>
                  )}</>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 shadow-sm p-6 flex flex-col justify-between h-full">
          <div className="space-y-3 text-[13px] text-slate-500 dark:text-slate-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount ({discountType === "%" ? `${globalDiscount}%` : formatRupiah(globalDiscount)})</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">{formatRupiah(discountTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (11%)</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">{formatRupiah(taxTotal)}</span>
            </div>
            <div className="mt-4">
              <div className="rounded-md bg-white dark:bg-white p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-bold text-slate-800 dark:text-slate-800">Grand Total</span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatRupiah(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 justify-end pt-1 pb-4">
        {readOnly ? (
          <Link href="/sales/sales-management/quotations" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[12px] font-medium px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            Back
          </Link>
        ) : (
          <><button onClick={onCancel} disabled={submitting} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[12px] font-medium px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
        <button onClick={() => submitQuotation("Draft")} disabled={submitting} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[12px] font-semibold px-5 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          {submitting ? "Saving..." : "Save as Draft"}
        </button>
        <button onClick={() => submitQuotation("Sent")} disabled={submitting} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold px-5 py-2.5 transition-colors shadow-sm">
          {submitting ? "Saving..." : "Save & Send"}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button></>
        )}
      </div>
    </div>
  );
}
