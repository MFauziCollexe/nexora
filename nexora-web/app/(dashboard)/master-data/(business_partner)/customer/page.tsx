"use client";

import { useState } from "react";
import StatCards from "@/components/masterdata/StatCards";
import DrawerForm from "@/components/masterdata/DrawerForm";
import { statCards, customers as customerData, customerTypes, customerGroups, cities } from "@/data/masterdata/customer";

export default function CustomerPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All Types");
  const [filterGroup, setFilterGroup] = useState("All Groups");
  const [filterCity, setFilterCity] = useState("All Cities");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filtered = customerData.filter((customer) => {
    const query = search.toLowerCase();
    const matchSearch =
      customer.code.toLowerCase().includes(query) ||
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.phone.toLowerCase().includes(query) ||
      customer.pic.toLowerCase().includes(query) ||
      customer.city.toLowerCase().includes(query);
    const matchType = filterType === "All Types" || customer.type === filterType;
    const matchGroup = filterGroup === "All Groups" || customer.group === filterGroup;
    const matchCity = filterCity === "All Cities" || customer.city === filterCity;
    const matchStatus = filterStatus === "All Status" || customer.status === filterStatus;
    return matchSearch && matchType && matchGroup && matchCity && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const inputClass = "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-1.5 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 cursor-pointer";
  const btnOutline = "flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-[12px] font-medium px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap";

  return (
    <div className="p-4 space-y-3">

      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <span>Master Data</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6" /></svg>
        <span>Business Partner</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6" /></svg>
        <span className="text-slate-600 dark:text-slate-300 font-medium">Customer</span>
      </div>

      <StatCards cards={statCards} />

      <div className="flex items-end gap-2 overflow-x-auto pb-1">

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Customer Type</label>
          <select value={filterType} onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }} className={inputClass}>
            {customerTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Customer Group</label>
          <select value={filterGroup} onChange={(e) => { setFilterGroup(e.target.value); setCurrentPage(1); }} className={inputClass}>
            {customerGroups.map((group) => <option key={group}>{group}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">City</label>
          <select value={filterCity} onChange={(e) => { setFilterCity(e.target.value); setCurrentPage(1); }} className={inputClass}>
            {cities.map((city) => <option key={city}>{city}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Status</label>
          <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }} className={inputClass}>
            {["All Status", "Active", "Inactive"].map((status) => <option key={status}>{status}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-transparent">x</label>
          <button onClick={() => { setFilterType("All Types"); setFilterGroup("All Groups"); setFilterCity("All Cities"); setFilterStatus("All Status"); setSearch(""); setCurrentPage(1); }} className={btnOutline}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
            </svg>
            Reset
          </button>
        </div>

        <div className="flex-1" />

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-transparent">x</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-[12px] text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
            />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
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
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Customer
          </button>
        </div>

      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-250">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                {["Customer Code", "Customer Name", "Customer Type", "Customer Group", "PIC", "Phone", "Email", "City", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {h}
                      {h !== "Actions" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 text-slate-300 dark:text-slate-600 shrink-0">
                          <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
                        </svg>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((customer) => (
                <tr key={customer.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-[12px] font-medium text-slate-700 dark:text-slate-300">{customer.code}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[12px] text-slate-800 dark:text-slate-200">{customer.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`${customer.typeColor} text-[11px] font-semibold px-2 py-0.5 rounded-full`}>{customer.type}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-[12px] text-slate-600 dark:text-slate-400">{customer.group}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[12px] text-slate-600 dark:text-slate-400">{customer.pic}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[12px] text-slate-600 dark:text-slate-400">{customer.phone}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[12px] text-slate-600 dark:text-slate-400">{customer.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[12px] text-slate-600 dark:text-slate-400">{customer.city}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`${customer.statusColor} text-[11px] font-semibold px-2 py-0.5 rounded-full`}>{customer.status}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <button className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-200 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors" title="View">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-200 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors" title="Edit">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center justify-center text-slate-400 transition-colors" title="More">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                          <circle cx="12" cy="5" r="1" fill="currentColor" />
                          <circle cx="12" cy="12" r="1" fill="currentColor" />
                          <circle cx="12" cy="19" r="1" fill="currentColor" />
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
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            <p className="text-[12px] text-slate-400 dark:text-slate-600">No customers found</p>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between text-[11px]">
            <span className="text-slate-600 dark:text-slate-400">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} entries
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-6 h-6 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-slate-600 dark:text-slate-400"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                return page <= totalPages ? page : null;
              }).filter(Boolean).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page as number)}
                  className={`w-6 h-6 rounded text-[10px] font-medium transition-colors ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {page}
                </button>
              ))}
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <span className="text-slate-400 dark:text-slate-600">...</span>
              )}
              {totalPages > 5 && (
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className="w-6 h-6 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 text-[10px] font-medium transition-colors"
                >
                  {totalPages}
                </button>
              )}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-6 h-6 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-slate-600 dark:text-slate-400"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <DrawerForm open={drawerOpen} title="Add Customer" onClose={() => setDrawerOpen(false)}>
        <div>
          <h3 className="text-[12px] font-bold text-slate-700 dark:text-slate-300 mb-3">Customer Information</h3>
          <div className="space-y-3">
            {[
              { label: "Customer Code", type: "text", placeholder: "Enter customer code", required: true },
              { label: "Customer Name", type: "text", placeholder: "Enter customer name", required: true },
              { label: "Customer Type", type: "select", placeholder: "Select type", required: true, options: customerTypes.filter((t) => t !== "All Types") },
              { label: "Customer Group", type: "select", placeholder: "Select group", required: true, options: customerGroups.filter((g) => g !== "All Groups") },
              { label: "PIC (Person in Charge)", type: "text", placeholder: "Enter PIC name", required: true },
              { label: "Phone", type: "text", placeholder: "Enter phone number", required: true },
              { label: "Email", type: "email", placeholder: "Enter email address", required: true },
              { label: "City", type: "select", placeholder: "Select city", required: true, options: cities.filter((c) => c !== "All Cities") },
              { label: "Status", type: "select", placeholder: "Select status", required: true, options: ["Select status", "Active", "Inactive"] },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1 block">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === "select" ? (
                  <select className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-500 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900">
                    {[field.placeholder, ...(field.options ?? [])].map((option, index) => (
                      <option key={`${field.label}-${index}`} value={option}>{option}</option>
                    ))}
                  </select>
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
          <button onClick={() => setDrawerOpen(false)} className="flex-1 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-[12px] font-medium py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            Cancel
          </button>
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold py-2 rounded-lg transition-colors">
            Save Customer
          </button>
        </div>
      </DrawerForm>
    </div>
  );
}
