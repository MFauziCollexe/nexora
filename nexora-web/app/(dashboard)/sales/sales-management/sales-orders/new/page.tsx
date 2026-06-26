"use client";

import Link from "next/link";
import SalesOrderCreateForm from "@/components/sales/SalesOrderCreateForm";
import { useRouter } from "next/navigation";

export default function SalesOrderCreatePage() {
  const router = useRouter();

  function handleCancel() {
    router.push("/sales/sales-management/sales-orders");
  }

  return (
    <div className="px-4 py-5 sm:px-6">
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 mb-4">
        <span>Dashboard</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span>Sales</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span>Sales Management</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <Link href="/sales/sales-management/sales-orders" className="text-slate-500 hover:text-blue-500 transition-colors">Sales Orders</Link>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span className="text-slate-700 dark:text-slate-200 font-medium">Add Sales Order</span>
      </div>

      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Add Sales Order</h1>
        <Link href="/sales/sales-management/sales-orders" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[12px] font-medium text-slate-600 dark:text-slate-300 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to Sales Orders
        </Link>
      </div>

      <SalesOrderCreateForm onCancel={handleCancel} />
    </div>
  );
}
