"use client";

import { useMemo, useState, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Customer = {
  name: string;
  address: string;
  pic: string;
  email: string;
  phone: string;
};

type QuotationLine = {
  id: number;
  itemCode: string;
  itemName: string;
  type: "Service" | "Item";
  description: string;
  uom: string;
  qty: number;
  unitPrice: number;
  discount: number;
  tax: number;
};

// ─── Mock data (ganti dengan fetch API sesungguhnya) ─────────────────────────
const customerOptions: Customer[] = [
  {
    name: "PT Maju Bersama",
    address: "Jl. Merdeka No. 123\nJakarta Pusat, DKI Jakarta 10110\nIndonesia",
    pic: "Budi Santoso",
    email: "budi@majubersama.co.id",
    phone: "0812-3456-7890",
  },
  {
    name: "PT Solusi Logistics",
    address: "Jl. Sudirman No. 88\nJakarta Selatan, DKI Jakarta 12920\nIndonesia",
    pic: "Rina Wijaya",
    email: "rina@solusilogistics.id",
    phone: "0813-1234-5678",
  },
];

const currencyOptions = ["IDR - Indonesian Rupiah", "USD - US Dollar"];
const paymentTermsOptions = ["NET 30", "NET 15", "Due on Receipt"];
const salesPersonOptions = ["Fauzi", "Maya", "Rian"];

const today = new Date().toISOString().split("T")[0];
const nextMonth = new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

const inputCls =
  "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[12px] text-slate-700 dark:text-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition";

const labelCls = "text-[11px] font-medium text-slate-500 dark:text-slate-400";

// ─── Component ────────────────────────────────────────────────────────────────
export default function QuotationCreateForm({ onCancel }: { onCancel?: () => void }) {
  // Header fields
  const [quotationDate, setQuotationDate] = useState(today);
  const [validUntil, setValidUntil] = useState(nextMonth);
  const [currency, setCurrency] = useState(currencyOptions[0]);
  const [paymentTerms, setPaymentTerms] = useState(paymentTermsOptions[0]);
  const [salesPerson, setSalesPerson] = useState(salesPersonOptions[0]);
  const [referenceNo, setReferenceNo] = useState("");
  const [description, setDescription] = useState("");

  // Customer
  const [selectedCustomer, setSelectedCustomer] = useState(customerOptions[0].name);
  const customer = useMemo(
    () => customerOptions.find((c) => c.name === selectedCustomer) ?? customerOptions[0],
    [selectedCustomer]
  );

  // Items
  const [items, setItems] = useState<QuotationLine[]>([
    { id: 1, itemCode: "SRV-001", itemName: "Frozen Storage", type: "Service", description: "Storage -20°C per pallet/day", uom: "Pallet", qty: 100, unitPrice: 150000, discount: 0, tax: 11 },
    { id: 2, itemCode: "SRV-002", itemName: "Handling In", type: "Service", description: "Receiving & handling in", uom: "Pallet", qty: 100, unitPrice: 10000, discount: 0, tax: 11 },
    { id: 3, itemCode: "SRV-003", itemName: "Handling Out", type: "Service", description: "Handling out / delivery", uom: "Pallet", qty: 100, unitPrice: 10000, discount: 0, tax: 11 },
  ]);
  const [globalDiscount, setGlobalDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<"%" | "IDR">("%");

  // Notes & attachments
  const [notes, setNotes] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Totals ────────────────────────────────────────────────────────────────
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0),
    [items]
  );
  const taxTotal = useMemo(
    () => items.reduce((sum, item) => sum + (item.qty * item.unitPrice * (1 - item.discount / 100) * item.tax) / 100, 0),
    [items]
  );
  const discountTotal = useMemo(() => {
    if (discountType === "%") return (subtotal * globalDiscount) / 100;
    return globalDiscount;
  }, [subtotal, globalDiscount, discountType]);
  const grandTotal = subtotal - discountTotal + taxTotal;

  // ── Item handlers ─────────────────────────────────────────────────────────
  function removeItem(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function addItem(type: "Service" | "Item") {
    const newId = Math.max(0, ...items.map((i) => i.id)) + 1;
    setItems((prev) => [
      ...prev,
      {
        id: newId,
        itemCode: type === "Service" ? `SRV-00${newId}` : `ITM-00${newId}`,
        itemName: type === "Service" ? "New Service" : "New Item",
        type,
        description: "",
        uom: "Pallet",
        qty: 1,
        unitPrice: 0,
        discount: 0,
        tax: 11,
      },
    ]);
  }

  // ── Attachment handlers ───────────────────────────────────────────────────
  function handleFiles(files: FileList | null) {
    if (!files) return;
    const valid = Array.from(files).filter(
      (f) => f.size <= 5 * 1024 * 1024 && ["application/pdf", "image/jpeg", "image/png"].includes(f.type)
    );
    setAttachments((prev) => [...prev, ...valid]);
  }

  // ── Submit handlers ───────────────────────────────────────────────────────
  function handleSaveDraft() {
    console.log("Save as Draft", { quotationDate, validUntil, currency, paymentTerms, salesPerson, referenceNo, description, customer, items, notes, attachments });
    alert("Saved as Draft!");
  }

  function handleSaveAndSend() {
    console.log("Save & Send", { quotationDate, validUntil, currency, paymentTerms, salesPerson, referenceNo, description, customer, items, notes, attachments });
    alert("Quotation saved and sent!");
  }

  return (
    <div className="space-y-5 max-w-[1440px] mx-auto">

      {/* ── Row 1: Quotation Info + Customer Info ───────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">

        {/* 1. Quotation Information */}
        <div className="rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5">
          <h3 className="text-[13px] font-semibold text-blue-600 dark:text-blue-400 mb-4">
            1. Quotation Information
          </h3>
          <div className="grid gap-4">

            {/* Quotation No */}
            <div className="grid gap-1.5">
              <label className={labelCls}>Quotation No.</label>
              <div className="flex items-center gap-2">
                <input type="text" readOnly value="QT-2026-000126" className={inputCls + " bg-slate-50 dark:bg-slate-800 text-slate-400"} />
                <span className="shrink-0 rounded-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-500 dark:text-slate-400 px-2.5 py-1 font-medium">
                  Auto
                </span>
              </div>
            </div>

            {/* Date + Valid Until */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <label className={labelCls}>Quotation Date <span className="text-rose-500">*</span></label>
                <input type="date" value={quotationDate} onChange={(e) => setQuotationDate(e.target.value)} className={inputCls} />
              </div>
              <div className="grid gap-1.5">
                <label className={labelCls}>Valid Until <span className="text-rose-500">*</span></label>
                <input type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} className={inputCls} />
              </div>
            </div>

            {/* Currency + Payment Terms + Sales Person */}
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="grid gap-1.5">
                <label className={labelCls}>Currency <span className="text-rose-500">*</span></label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={inputCls}>
                  {currencyOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="grid gap-1.5">
                <label className={labelCls}>Payment Terms</label>
                <select value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} className={inputCls}>
                  {paymentTermsOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="grid gap-1.5">
                <label className={labelCls}>Sales Person <span className="text-rose-500">*</span></label>
                <select value={salesPerson} onChange={(e) => setSalesPerson(e.target.value)} className={inputCls}>
                  {salesPersonOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Reference No */}
            <div className="grid gap-1.5">
              <label className={labelCls}>Reference No.</label>
              <input
                type="text"
                value={referenceNo}
                onChange={(e) => setReferenceNo(e.target.value)}
                placeholder="Enter reference number (optional)"
                className={inputCls}
              />
            </div>

            {/* Description */}
            <div className="grid gap-1.5">
              <label className={labelCls}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter quotation description (optional)"
                rows={3}
                className={inputCls + " resize-none"}
              />
            </div>
          </div>
        </div>

        {/* 2. Customer Information */}
        <div className="rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5">
          <h3 className="text-[13px] font-semibold text-blue-600 dark:text-blue-400 mb-4">
            2. Customer Information
          </h3>
          <div className="grid gap-4">

            {/* Customer selector + add button */}
            <div className="grid gap-1.5">
              <label className={labelCls}>Customer <span className="text-rose-500">*</span></label>
              <div className="flex gap-2">
                <select
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  className={inputCls}
                >
                  {customerOptions.map((c) => <option key={c.name}>{c.name}</option>)}
                </select>
                <button
                  title="Add new customer"
                  className="shrink-0 w-10 h-[38px] rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 hover:text-blue-600 hover:border-blue-300 text-lg font-semibold transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Address */}
            <div className="grid gap-1.5">
              <label className={labelCls}>Address</label>
              <textarea
                readOnly
                value={customer.address}
                rows={4}
                className={inputCls + " resize-none bg-slate-50 dark:bg-slate-800 whitespace-pre-wrap"}
              />
            </div>

            {/* PIC + Email + Phone */}
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

      {/* ── Row 2: Item Details ─────────────────────────────────────────── */}
      <div className="rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5">
        <h3 className="text-[13px] font-semibold text-blue-600 dark:text-blue-400 mb-4">
          3. Item Details
        </h3>

        {/* Action bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => addItem("Item")}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold px-3 py-2 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><path d="M12 5v14M5 12h14"/></svg>
              Add Item
            </button>
            <button
              onClick={() => addItem("Service")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-[12px] font-medium px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
              Add Service
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-[12px] font-medium px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 12h10M12 7v10"/></svg>
              Scan Barcode
            </button>
          </div>

          {/* Global discount */}
          <div className="flex items-center gap-2 text-[12px] text-slate-500">
            <span>Discount</span>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value as "%" | "IDR")}
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[12px] px-2 py-2"
            >
              <option>%</option>
              <option>IDR</option>
            </select>
            <input
              type="number"
              min={0}
              value={globalDiscount}
              onChange={(e) => setGlobalDiscount(Number(e.target.value))}
              className="w-20 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[12px] text-slate-700 dark:text-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-700">
          <table className="w-full min-w-[1100px] border-separate border-spacing-0 text-[12px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                {["No.", "Item Code", "Item Name", "Type", "Description", "UOM", "Qty", "Unit Price", "Discount (%)", "Tax", "Amount", "Action"].map((h) => (
                  <th key={h} className="px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap first:rounded-tl-xl last:rounded-tr-xl">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const amount = item.qty * item.unitPrice * (1 - item.discount / 100);
                return (
                  <tr key={item.id} className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-3 py-3 whitespace-nowrap text-slate-500 font-medium">{index + 1}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-slate-700 dark:text-slate-300">{item.itemCode}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-slate-700 dark:text-slate-300 font-medium">{item.itemName}</td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="inline-flex rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 text-[10px] font-semibold">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-3 py-3 min-w-[200px] text-slate-500 dark:text-slate-400">{item.description}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-slate-600 dark:text-slate-400">{item.uom}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-slate-700 dark:text-slate-300">{item.qty.toLocaleString("id-ID")}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-slate-700 dark:text-slate-300">{item.unitPrice.toLocaleString("id-ID")}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-slate-600 dark:text-slate-400">{item.discount}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-slate-600 dark:text-slate-400">{item.tax}%</td>
                    <td className="px-3 py-3 whitespace-nowrap text-slate-700 dark:text-slate-300 font-semibold">{amount.toLocaleString("id-ID")}</td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <button
                          title="Edit"
                          className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-300 hover:text-blue-600 text-slate-400 flex items-center justify-center transition-colors"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button
                          title="Remove"
                          onClick={() => removeItem(item.id)}
                          className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-rose-300 hover:text-rose-500 text-slate-400 flex items-center justify-center transition-colors"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {items.length === 0 && (
                <tr>
                  <td colSpan={12} className="py-10 text-center text-[12px] text-slate-400 dark:text-slate-600">
                    No items added yet. Click "Add Item" or "Add Service" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">Showing {items.length} item{items.length !== 1 ? "s" : ""}</p>
      </div>

      {/* ── Row 3: Notes & Attachments + Summary ───────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr] items-end">

        {/* 4. Notes & Attachments */}
        <div className="rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 flex flex-col h-full">
          <h3 className="text-[13px] font-semibold text-blue-600 dark:text-blue-400 mb-4">
            4. Notes &amp; Attachments
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-1.5">
              <label className={labelCls}>Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter notes (optional)"
                rows={6}
                className={inputCls + " resize-none min-h-[160px]"}
              />
            </div>

            <div className="grid gap-1.5">
              <label className={labelCls}>Attachments</label>
              <div className="h-full flex flex-col">
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full rounded-xl border-2 border-dashed px-6 py-6 text-center cursor-pointer transition-colors flex items-center justify-center min-h-[160px] ${
                    dragging
                      ? "border-blue-400 bg-blue-50 dark:bg-blue-950"
                      : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <p className="text-[12px] font-medium text-slate-600 dark:text-slate-300">
                    Drag &amp; drop files here <span className="text-blue-500">or click to browse</span>
                  </p>
                  <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">Max file size 5MB (PDF, JPG, PNG)</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                </div>

                {attachments.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {attachments.map((file, i) => {
                      return (
                        <li key={`attach-${i}`} className="flex items-center justify-between text-[11px] bg-slate-50 dark:bg-slate-900 rounded-lg px-3 py-2 border border-slate-200 dark:border-slate-700">
                          <span className="text-slate-600 dark:text-slate-300 truncate">{file.name}</span>
                          <button
                            onClick={() => setAttachments((prev) => prev.filter((_, idx) => idx !== i))}
                            className="text-rose-400 hover:text-rose-600 ml-3 shrink-0"
                          >
                            ✕
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
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

      {/* ── Action Buttons ──────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3 justify-end pt-1 pb-4">
        <button
          onClick={onCancel}
          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[12px] font-medium px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveDraft}
          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[12px] font-semibold px-5 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          Save as Draft
        </button>
        <button
          onClick={handleSaveAndSend}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold px-5 py-2.5 transition-colors shadow-sm"
        >
          Save &amp; Send
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  );
}