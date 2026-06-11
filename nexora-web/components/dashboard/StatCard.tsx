"use client";

import { ReactNode } from "react";
import { ArrowUpIcon } from "@/components/ui/Icons";

type StatCardProps = {
  label: string;
  value: string;
  pct: string;
  iconBg: string;
  iconColor: string;
  icon: ReactNode;
};

export function StatCard({ label, value, pct, iconBg, iconColor, icon }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm dark:shadow-slate-900/30 p-3 flex items-center gap-3">
      <div className={`${iconBg} ${iconColor} w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{label}</div>
        <div className="text-[12px] font-bold text-slate-800 dark:text-slate-100 mt-0.5 leading-tight">{value}</div>
        <div className="flex items-center gap-1 mt-0.5">
          <ArrowUpIcon className="w-2.5 h-2.5 text-emerald-500" />
          <span className="text-[10px] font-semibold text-emerald-600">{pct}</span>
          <span className="text-[9px] text-slate-400 dark:text-slate-500">vs last month</span>
        </div>
      </div>
    </div>
  );
}
