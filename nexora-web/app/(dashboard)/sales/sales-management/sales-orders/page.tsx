"use client";

import { use } from "react";
import Link from "next/link";
import { salesOrders } from "@/data/sales/salesOrders";

function formatNumber(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}

function formatRupiah(value: number) {
  return "Rp " + new Intl.NumberFormat("id-ID").format(value);
}

export default function SalesOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const so = salesOrders.find((s) => s.id === Number(id));

  if (!so) {
    return (
      <div className="p-8 text-center text-slate-400 text-[13px]">
        Sales Order tidak ditemukan.{" "}
        <Link href="/sales/sales-management/sales-orders" className="text-blue-500 underline">
          Kembali
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto bg-[#F8FAFC] min-h-screen text-slate-800 font-sans">
      
      {/* ── Top Header & Breadcrumb ─────────────────────────────────── */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[13px] text-slate-400">
            <span>Dashboard</span>
            <ChevronIcon />
            <span>Sales</span>
            <ChevronIcon />
            <span>Sales Order</span>
            <ChevronIcon />
            <span className="text-slate-700 font-medium">{so.soNo}</span>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <h1 className="text-2xl font-bold text-slate-900">Sales Order</h1>
            <span className="px-2.5 py-0.5 bg-[#E8F0FE] text-[#1A73E8] font-semibold text-[12px] rounded border border-[#D2E3FC]">
              {so.soNo}
            </span>
            <span className="px-2.5 py-0.5 bg-[#E6F4EA] text-[#137333] font-semibold text-[11px] rounded-full">
              {so.status}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 border border-slate-200 bg-white text-[13px] font-medium text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-500">
              <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
            </svg>
            Print SO
          </button>
          <button className="inline-flex items-center gap-2 border border-slate-200 bg-white text-[13px] font-medium text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-500">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
            Send Email
          </button>
          <button className="inline-flex items-center gap-2 border border-slate-200 bg-white text-[13px] font-medium text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-500">
              <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
            Create Delivery Order
          </button>
          <button className="inline-flex items-center justify-center border border-slate-200 bg-white text-[13px] font-medium text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            More
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 ml-1 text-slate-500">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          <button className="inline-flex items-center bg-[#1A73E8] hover:bg-blue-700 text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm">
            Release to Warehouse
          </button>
        </div>
      </div>

      {/* ── Row 1: Order Info & Customer Info ─────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* 1. Order Information */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm p-6">
          <h3 className="text-[14px] font-bold text-[#1A73E8] mb-5 uppercase tracking-wider">1. Order Information</h3>
          <div className="grid grid-cols-2 gap-x-12 gap-y-3.5">
            <div className="space-y-3.5">
              <GridInfoRow label="Sales Order No." value={so.soNo} />
              <GridInfoRow label="Order Date" value={so.date} />
              <GridInfoRow label="Status" value={
                <span className="px-2 py-0.5 bg-[#E6F4EA] text-[#137333] text-[11px] font-bold rounded-full">
                  {so.status}
                </span>
              } />
              <GridInfoRow label="Quotation No." value={
                <span className="text-[#1A73E8] font-semibold cursor-pointer hover:underline">{so.quotationNo}</span>
              } />
            </div>
            <div className="space-y-3.5">
              <GridInfoRow label="Delivery Date" value={so.deliveryDate} />
              <GridInfoRow label="Warehouse" value={so.warehouse} />
              <GridInfoRow label="Currency" value={so.currency} />
              <GridInfoRow label="Payment Terms" value={so.paymentTerms} />
              <GridInfoRow label="Sales Person" value={so.sales} />
              <GridInfoRow label="Reference No." value={so.referenceNo} />
              <GridInfoRow label="Description" value={so.description} />
            </div>
          </div>
        </div>

        {/* 2. Customer Information */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-[#1A73E8] mb-5 uppercase tracking-wider">2. Customer Information</h3>
            <div className="space-y-3.5">
              <GridInfoRow label="Customer" value={<span className="text-[#1A73E8] font-bold">{so.customer}</span>} />
              <GridInfoRow label="Address" value={<span className="text-slate-600 font-normal leading-relaxed block">{so.address}</span>} />
            </div>
          </div>
          
          <div className="pt-5 border-t border-slate-100 space-y-3 mt-4">
            <div className="flex items-center text-[13px]">
              <span className="w-24 text-slate-400 font-medium inline-flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                PIC
              </span>
              <span className="text-slate-400 mr-3">:</span>
              <span className="text-slate-700 font-semibold">{so.pic}</span>
            </div>
            <div className="flex items-center text-[13px]">
              <span className="w-24 text-slate-400 font-medium inline-flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Email
              </span>
              <span className="text-slate-400 mr-3">:</span>
              <span className="text-[#1A73E8] font-medium truncate">{so.email}</span>
            </div>
            <div className="flex items-center text-[13px]">
              <span className="w-24 text-slate-400 font-medium inline-flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                Phone
              </span>
              <span className="text-slate-400 mr-3">:</span>
              <span className="text-slate-700 font-medium">{so.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: Order Items Table ─────────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
        <h3 className="text-[14px] font-bold text-[#1A73E8] mb-4 uppercase tracking-wider">3. Order Items</h3>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-[1100px] text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-slate-200 text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-4 py-3.5 w-16">No.</th>
                <th className="px-4 py-3.5">Item Code</th>
                <th className="px-4 py-3.5">Item Name</th>
                <th className="px-4 py-3.5">Type</th>
                <th className="px-4 py-3.5 max-w-[250px]">Description</th>
                <th className="px-4 py-3.5">UOM</th>
                <th className="px-4 py-3.5 text-right">QTY</th>
                <th className="px-4 py-3.5 text-right">Unit Price</th>
                <th className="px-4 py-3.5 text-right">Discount (%)</th>
                <th className="px-4 py-3.5 text-right">Tax</th>
                <th className="px-4 py-3.5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13px]">
              {so.items.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors text-slate-700">
                  <td className="px-4 py-4 text-slate-400 font-medium">{item.no}</td>
                  <td className="px-4 py-4 font-mono text-slate-600">{item.itemCode}</td>
                  <td className="px-4 py-4 font-semibold text-slate-900">{item.itemName}</td>
                  <td className="px-4 py-4">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#E6F4EA] text-[#137333]">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-500 max-w-[250px] truncate">{item.description}</td>
                  <td className="px-4 py-4 text-slate-500">{item.uom}</td>
                  <td className="px-4 py-4 text-right font-medium">{formatNumber(item.qty)}</td>
                  <td className="px-4 py-4 text-right font-medium">{formatNumber(item.unitPrice)}</td>
                  <td className="px-4 py-4 text-right text-slate-400">{item.discount}</td>
                  <td className="px-4 py-4 text-right text-slate-500">{item.tax}%</td>
                  <td className="px-4 py-4 text-right font-bold text-slate-900">{formatNumber(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-[12px] text-slate-400 font-medium">
          Showing 1 to {so.items.length} of {so.items.length} items
        </div>
      </div>

      {/* ── Row 3: Storage, Notes & Summary ──────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* 4. Storage Reservation */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
          <h3 className="text-[14px] font-bold text-[#1A73E8] uppercase tracking-wider">4. Storage Reservation</h3>
          <div className="space-y-3.5">
            <GridInfoRow label="Cold Room" value={so.storage.coldRoom} />
            <GridInfoRow label="Start Date" value={so.storage.startDate} />
            <GridInfoRow label="End Date" value={so.storage.endDate} />
            <GridInfoRow label="Reserved Capacity" value={so.storage.reservedCapacity} />
            <GridInfoRow label="Status" value={
              <span className="px-2 py-0.5 bg-[#E8F0FE] text-[#1A73E8] text-[11px] font-bold rounded">
                {so.storage.status}
              </span>
            } />
          </div>
        </div>

        {/* 5. Notes & Attachments */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
          <h3 className="text-[14px] font-bold text-[#1A73E8] uppercase tracking-wider">5. Notes &amp; Attachments</h3>
          <div className="space-y-1">
            <label className="text-[12px] text-slate-900 font-bold">Notes</label>
            <div className="w-full rounded-lg border border-slate-200 p-3 bg-white min-h-[72px] text-[13px] text-slate-700 leading-relaxed">
              {so.notes}
            </div>
          </div>
          
          {so.attachments.length > 0 && (
            <div className="space-y-1.5">
              <label className="text-[12px] text-slate-900 font-bold">Attachments ({so.attachments.length})</label>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3 bg-[#FAFAFA]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-rose-500">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-slate-800 leading-tight">{so.attachments[0].name}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{so.attachments[0].size}</p>
                  </div>
                </div>
                <button className="p-1.5 rounded border border-slate-200 bg-white text-slate-400 hover:text-[#1A73E8] hover:border-blue-200 shadow-sm transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 6. Order Summary */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 flex flex-col justify-between">
          <h3 className="text-[14px] font-bold text-[#1A73E8] uppercase tracking-wider mb-2">6. Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-[13px] text-slate-600">
              <span>Subtotal</span>
              <span className="text-slate-900 font-medium">{formatRupiah(so.subtotal)}</span>
            </div>
            <div className="flex justify-between text-[13px] text-slate-600">
              <span>Discount</span>
              <span className="text-slate-900 font-medium">{formatRupiah(so.discount)}</span>
            </div>
            <div className="flex justify-between text-[13px] text-slate-600">
              <span>Tax (11%)</span>
              <span className="text-slate-900 font-medium">{formatRupiah(so.tax)}</span>
            </div>
            <div className="border-t border-slate-200 pt-4 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-[14px] font-bold text-slate-900">Grand Total</span>
                <span className="text-xl font-black text-[#1A73E8]">{formatRupiah(so.grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 4: Order Timeline ────────────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
        <h3 className="text-[14px] font-bold text-[#1A73E8] mb-6 uppercase tracking-wider">7. Order Timeline</h3>
        <div className="overflow-x-auto pb-2">
          <div className="flex items-center min-w-max justify-between px-6">
            {so.timeline.map((step, idx) => {
              const isLast = idx === so.timeline.length - 1;
              const isDone = step.done;
              const isActive = step.active;

              return (
                <div key={idx} className="flex items-center flex-1">
                  {/* Step Node */}
                  <div className="flex flex-col items-center w-36 shrink-0">
                    <div className={`
                      w-9 h-9 rounded-full flex items-center justify-center border-2 shadow-sm transition-all duration-300
                      ${isDone && !isActive
                        ? "bg-[#E6F4EA] border-[#137333] text-[#137333]"
                        : isActive
                        ? "bg-white border-[#1A73E8] text-[#1A73E8] ring-4 ring-blue-50"
                        : "bg-white border-slate-200 text-slate-300"
                      }
                    `}>
                      {isDone && !isActive ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      ) : isActive ? (
                        <div className="w-3 h-3 rounded-full bg-[#1A73E8]" />
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                          <rect x="6" y="3" width="12" height="18" rx="1"/>
                        </svg>
                      )}
                    </div>
                    {/* Node Text */}
                    <p className="mt-2.5 text-[12px] font-bold text-slate-800 text-center leading-tight">{step.label}</p>
                    <p className="mt-0.5 text-[11px] text-slate-400 text-center font-normal">{step.date}</p>
                    <p className="text-[11px] text-slate-400 text-center font-normal">{step.by}</p>
                  </div>

                  {/* Connector Line */}
                  {!isLast && (
                    <div className={`h-[2px] w-full min-w-[50px] -mt-8 ${isDone ? "bg-[#1A73E8]" : "bg-slate-200"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}

{/* ── Sub-component Helpers ────────────────────────────────────────── */}
function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3 text-slate-300">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  );
}

function GridInfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[130px_auto_1fr] items-start text-[13px] leading-relaxed">
      <span className="text-slate-500 font-medium">{label}</span>
      <span className="text-slate-400 px-2">:</span>
      <span className="text-slate-900 font-semibold break-words">{value}</span>
    </div>
  );
}