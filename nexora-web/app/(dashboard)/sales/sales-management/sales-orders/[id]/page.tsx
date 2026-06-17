import Link from "next/link";
import { notFound } from "next/navigation";
import { statCards, salesOrders as salesOrdersData } from "@/data/sales/salesOrders";

function statusClasses(status: string) {
  const map: Record<string, string> = {
    Confirmed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400",
    Released: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400",
    Draft: "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
    Pending: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400",
  };
  return map[status] ?? map.Draft;
}

export default async function SalesOrderDetail({ params }: { params: { id: string } }) {
  const p = await params;
  const id = parseInt(p.id, 10);
  const so = salesOrdersData.find((s) => s.id === id);
  if (!so) return notFound();

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/sales/sales-management/sales-orders" className="text-slate-500 hover:text-blue-500">
            Back
          </Link>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Sales Order Detail</h2>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[13px]">Print SO</button>
          <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[13px]">Send Email</button>
          <button className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[13px]">Release to Warehouse</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">1. Order Information</h3>
          <div className="mt-3 text-[13px] text-slate-600 dark:text-slate-300 grid grid-cols-2 gap-y-2">
            <div className="flex justify-between"><span className="text-slate-500">Sales Order No.</span><span className="font-medium">{so.soNo}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Delivery Date</span><span className="font-medium">23/06/2026</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Order Date</span><span className="font-medium">{so.date}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Warehouse</span><span className="font-medium">{so.warehouse}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Status</span><span className={`text-[12px] font-semibold px-2 py-0.5 rounded-full ${statusClasses(so.status)}`}>{so.status}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Currency</span><span className="font-medium">IDR - Indonesian Rupiah</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Quotation No.</span><span className="font-medium">QT-2026-000{so.id + 116}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Sales Person</span><span className="font-medium">{so.sales}</span></div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">2. Customer Information</h3>
          <div className="mt-3 text-[13px] text-slate-600 dark:text-slate-300">
            <div className="flex justify-between"><span className="text-slate-500">Customer</span><span className="font-medium">{so.customer}</span></div>
            <div className="mt-2 text-sm text-slate-500">Jl. Merdeka No. 123<br/>Jakarta Pusat, DKI Jakarta 10110<br/>Indonesia</div>
            <div className="mt-3 border-t border-slate-100 dark:border-slate-700 pt-3">
              <div className="flex items-center gap-2 text-slate-500"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"/></svg> PIC : <span className="ml-auto font-medium text-slate-700 dark:text-slate-200">Budi Santoso</span></div>
              <div className="flex items-center gap-2 text-slate-500 mt-2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M3 8h18v8H3z"/></svg> Email : <span className="ml-auto font-medium text-slate-700 dark:text-slate-200">budi@majubersama.co.id</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">3. Order Items</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                {['No.', 'Item Code', 'Item Name', 'Type', 'Description', 'UOM', 'QTY', 'Unit Price', 'Discount (%)', 'Tax', 'Amount'].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[{
                itemCode: 'SRV-001', itemName: 'Frozen Storage', type: 'Service', description: 'Storage -20°C per pallet/day', uom: 'Pallet', qty: 100, unitPrice: '150.000', tax: '11%', amount: '15.000.000'
              },{
                itemCode: 'SRV-002', itemName: 'Handling In', type: 'Service', description: 'Receiving & handling in', uom: 'Pallet', qty: 100, unitPrice: '10.000', tax: '11%', amount: '1.000.000'
              }].map((it, idx) => (
                <tr key={idx} className="border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-3 text-[12px] text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">{idx + 1}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{it.itemCode}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-600 dark:text-slate-400">{it.itemName}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{it.type}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400">{it.description}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{it.uom}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{it.qty}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{it.unitPrice}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">0</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{it.tax}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-600 dark:text-slate-400 whitespace-nowrap">{it.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">4. Storage Reservation</h4>
          <div className="mt-2 text-[13px] text-slate-600 dark:text-slate-300">
            <div className="flex justify-between"><span className="text-slate-500">Cold Room</span><span className="font-medium">Frozen Room A</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Start Date</span><span className="font-medium">01/07/2026</span></div>
            <div className="flex justify-between"><span className="text-slate-500">End Date</span><span className="font-medium">31/07/2026</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Reserved Capacity</span><span className="font-medium">100 Pallet</span></div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">5. Notes & Attachments</h4>
          <div className="mt-2 text-[13px] text-slate-600 dark:text-slate-300">
            <div className="border border-slate-100 dark:border-slate-700 rounded p-3 text-sm bg-slate-50 dark:bg-slate-900">Mohon siapkan storage sesuai tanggal yang disepakati. Terima kasih.</div>
            <div className="mt-3">
              <div className="flex items-center gap-2 border border-slate-100 dark:border-slate-700 rounded px-3 py-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-rose-500"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4"/></svg>
                <div className="text-sm text-slate-600 dark:text-slate-300">SO-2026-000126.pdf <span className="text-xs text-slate-400">245 KB</span></div>
                <div className="ml-auto text-slate-400">⬇</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">6. Order Summary</h4>
          <div className="mt-3 text-[13px] text-slate-600 dark:text-slate-300 space-y-2">
            <div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span className="font-medium">Rp 17.000.000</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Tax (11%)</span><span className="font-medium">Rp 1.870.000</span></div>
            <div className="flex justify-between pt-2 border-t border-slate-100 dark:border-slate-700"><span className="text-blue-600 font-semibold">Grand Total</span><span className="text-blue-600 font-semibold">Rp 18.870.000</span></div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">7. Order Timeline</h4>
        <div className="mt-4">
          <div className="flex items-center gap-6">
            <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full relative">
              <div className="absolute left-0 -top-3 text-[12px] text-emerald-600">Quotation Created</div>
              <div className="absolute left-1 top-3 text-[11px] text-slate-400">16/06/2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
