"use client";

import Link from "next/link";
import { menuItems } from "@/data/menu";
import { ChevronRightIcon } from "@/components/ui/Icons";

export function Sidebar() {
  return (
    <aside className="w-48 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col flex-shrink-0">
      <div className="flex items-center gap-2 px-3 py-3 border-b border-slate-100 dark:border-slate-700">
        <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-[11px]">N</span>
        </div>
        <div>
          <div className="text-[18px] font-bold text-slate-800 dark:text-white leading-tight">NEXORA</div>
          <div className="text-[9px] text-slate-400 dark:text-slate-500 leading-tight">ERP SYSTEM</div>
        </div>
      </div>

      <nav className="flex-1 py-2 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`
              flex items-center justify-between
              px-3 py-1.5 mx-1.5 mb-0.5
              rounded-md text-[12px] font-medium transition-colors
              ${item.active
                ? "bg-blue-600 text-white"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50"
              }
            `}
          >
            <span>{item.label}</span>
            {!item.active && <ChevronRightIcon className="w-2.5 h-2.5 opacity-40 dark:opacity-30" />}
          </Link>
        ))}
      </nav>

      <div className="border-t border-slate-100 dark:border-slate-700 px-3 py-2.5">
        <p className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wide mb-1">
          System Information
        </p>
        <div className="space-y-1">
          <div>
            <p className="text-[9px] text-slate-400 dark:text-slate-500">Company</p>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">Nexora Solusi Indonesia</p>
          </div>
          <div>
            <p className="text-[9px] text-slate-400 dark:text-slate-500">Database</p>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">nexora_erp</p>
          </div>
          <div>
            <p className="text-[9px] text-slate-400 dark:text-slate-500">Version</p>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">v1.0.0</p>
          </div>
        </div>
        <p className="text-[9px] text-slate-300 dark:text-slate-600 mt-2">© 2026 Nexora ERP. All rights reserved.</p>
      </div>
    </aside>
  );
}
