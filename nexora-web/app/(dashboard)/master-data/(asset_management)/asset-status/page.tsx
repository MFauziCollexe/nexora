"use client";

import { useState } from "react";
import StatCards from "@/components/masterdata/StatCards";
import DrawerForm from "@/components/masterdata/DrawerForm";
import { statCards, assetStatuses as statusData } from "@/data/masterdata/assetStatus";

export default function AssetStatusPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");

  const filtered = statusData.filter((s) => {
    const matchSearch =
      s.statusCode.toLowerCase().includes(search.toLowerCase()) ||
      s.statusName.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All Status" || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const inputClass = "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-1.5 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 cursor-pointer";
  const btnOutline = "flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-[12px] font-medium px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap";

  return (
    <div className="p-4 space-y-3">

      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <span>Master Data</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span>Asset Management</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span className="text-slate-600 dark:text-slate-300 font-medium">Asset Status</span>
      </div>

      <StatCards cards={statCards} />

      <div className="flex items-end gap-2 overflow-x-auto pb-1">

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Status</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={inputClass}>
            {["All Status", "Active", "Inactive"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-transparent">x</label>
          <button
            onClick={() => { setFilterStatus("All Status"); setSearch(""); }}
            className={btnOutline}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
            </svg>
            Reset
          </button>
        </div>

        <div className="flex-1" />

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-transparent">x</label>
          <div className="relative">
            <input
              type="text" placeholder="Search status..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-[12px] text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
            />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-transparent">x</label>
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Status
          </button>
        </div>

      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                {["Status Code", "Status Name", "Description", "Status", "Action"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {h}
                      {h !== "Action" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 text-slate-300 dark:text-slate-600 shrink-0">
                          <path d="M7 15l5 5 5-5M7 9l5-5 5 5"/>
                        </svg>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-4 py-3 text-[12px] font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">{s.statusCode}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-800 dark:text-slate-200 whitespace-nowrap font-medium">{s.statusName}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400">{s.description}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`${s.statusColor} text-[11px] font-semibold px-2 py-0.5 rounded-full`}>{s.status}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <button className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-200 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-red-50 dark:hover:bg-red-950 hover:border-red-200 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                          <line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                      </button>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center justify-center text-slate-400 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                          <circle cx="12" cy="5" r="1" fill="currentColor"/>
                          <circle cx="12" cy="12" r="1" fill="currentColor"/>
                          <circle cx="12" cy="19" r="1" fill="currentColor"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-slate-200 dark:text-slate-700 mx-auto mb-2">
              <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10M7 12h10M7 17h5"/>
            </svg>
            <p className="text-[12px] text-slate-400 dark:text-slate-600">No statuses found</p>
          </div>
        )}
      </div>

      <DrawerForm open={drawerOpen} title="Add Status" onClose={() => setDrawerOpen(false)}>
        <div>
          <h3 className="text-[12px] font-bold text-slate-700 dark:text-slate-300 mb-3">Status Information</h3>
          <div className="space-y-3">
            {[
              { label: "Status Code", type: "text", placeholder: "Enter status code", required: true },
              { label: "Status Name", type: "text", placeholder: "Enter status name", required: true },
              { label: "Description", type: "textarea", placeholder: "Enter status description", required: true },
              { label: "Status", type: "select", placeholder: "Select status", required: true, options: ["Select status", "Active", "Inactive"] },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1 block">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === "select" ? (
                  <select className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-500 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900">
                    {field.options?.map((o) => <option key={o}>{o}</option>)}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    rows={3}
                    placeholder={field.placeholder}
                    className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-700 dark:text-slate-300 placeholder:text-slate-300 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
                  />
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-700 dark:text-slate-300 placeholder:text-slate-300 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
          <button onClick={() => setDrawerOpen(false)} className="flex-1 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-[12px] font-medium py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Cancel</button>
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold py-2 rounded-lg transition-colors">Save Status</button>
        </div>
      </DrawerForm>

    </div>
  );
}
