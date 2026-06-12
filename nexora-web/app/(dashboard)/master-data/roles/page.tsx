"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const statCards = [
  { label: "Total Roles",   value: 8,  sub: "All roles in system",        iconBg: "bg-blue-50 dark:bg-blue-950",   iconColor: "text-blue-500",   icon: "shield" },
  { label: "Active Roles",  value: 7,  sub: "Currently active",          iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500",  icon: "check"  },
  { label: "System Roles",  value: 3,  sub: "Built-in roles",             iconBg: "bg-yellow-50 dark:bg-yellow-950", iconColor: "text-yellow-500", icon: "crown"  },
  { label: "Custom Roles",  value: 5,  sub: "Custom created roles",       iconBg: "bg-purple-50 dark:bg-purple-950", iconColor: "text-purple-500", icon: "user"   },
  { label: "Assigned Users", value: 52, sub: "Users with roles",          iconBg: "bg-slate-50 dark:bg-slate-950",  iconColor: "text-slate-500",  icon: "users"  },
];

const roles = [
  {
    id: 1,
    name: "Super Admin",
    type: "System Role",
    typeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
    description: "Full access to all modules and system settings",
    users: 2,
    permissions: 125,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
    createdDate: "10 Jun 2026",
    createdBy: "admin",
  },
  {
    id: 2,
    name: "Manager",
    type: "Custom Role",
    typeColor: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    description: "Management access for operational activities",
    users: 8,
    permissions: 80,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
    createdDate: "10 Jun 2026",
    createdBy: "admin",
  },
  {
    id: 3,
    name: "Supervisor",
    type: "Custom Role",
    typeColor: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-400",
    description: "Monitoring and approval access",
    users: 6,
    permissions: 60,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
    createdDate: "10 Jun 2026",
    createdBy: "admin",
  },
  {
    id: 4,
    name: "Staff",
    type: "Custom Role",
    typeColor: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    description: "Daily operational access for staff",
    users: 35,
    permissions: 45,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
    createdDate: "11 Jun 2026",
    createdBy: "admin",
  },
  {
    id: 5,
    name: "Accountant",
    type: "Custom Role",
    typeColor: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400",
    description: "Finance and accounting access",
    users: 4,
    permissions: 55,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
    createdDate: "11 Jun 2026",
    createdBy: "admin",
  },
  {
    id: 6,
    name: "IT Support",
    type: "System Role",
    typeColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
    description: "System maintenance and technical support",
    users: 1,
    permissions: 30,
    status: "Inactive",
    statusColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
    createdDate: "12 Jun 2026",
    createdBy: "admin",
  },
  {
    id: 7,
    name: "Warehouse Staff",
    type: "Custom Role",
    typeColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
    description: "Warehouse and inventory management",
    users: 7,
    permissions: 40,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
    createdDate: "12 Jun 2026",
    createdBy: "admin",
  },
  {
    id: 8,
    name: "Purchasing Staff",
    type: "Custom Role",
    typeColor: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    description: "Purchasing and vendor management",
    users: 5,
    permissions: 38,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
    createdDate: "12 Jun 2026",
    createdBy: "admin",
  },
];

export default function RolesPage() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All Types");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [filterCreatedBy, setFilterCreatedBy] = useState("All Users");

  const filtered = roles.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "All Types" || r.type === filterType;
    const matchStatus = filterStatus === "All Status" || r.status === filterStatus;
    const matchCreatedBy = filterCreatedBy === "All Users" || r.createdBy === filterCreatedBy;
    return matchSearch && matchType && matchStatus && matchCreatedBy;
  });

  const inputClass = "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-1.5 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 cursor-pointer";
  const btnOutline = "flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-[12px] font-medium px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap";

  return (
    <div className="p-4 space-y-3">

      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <span>Master Data</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span>System</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span className="text-slate-600 dark:text-slate-300 font-medium">Roles</span>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {statCards.map((s) => (
          <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm p-3 flex items-center gap-3">
            <div className={`${s.iconBg} ${s.iconColor} w-10 h-10 rounded-full flex items-center justify-center shrink-0`}>
              {s.icon === "shield" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
              {s.icon === "check" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M20 6L9 17l-5-5"/></svg>}
              {s.icon === "crown" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M2 17l4-11 4 7 4-7 4 11H2z"/></svg>}
              {s.icon === "user" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
              {s.icon === "users" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/></svg>}
            </div>
            <div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">{s.label}</p>
              <p className="text-[20px] font-bold text-slate-800 dark:text-white leading-tight">{s.value}</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-end gap-2 overflow-x-auto pb-1">

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Role Type</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className={inputClass}>
            {['All Types', 'System Role', 'Custom Role'].map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Status</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={inputClass}>
            {['All Status', 'Active', 'Inactive'].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Created By</label>
          <select value={filterCreatedBy} onChange={(e) => setFilterCreatedBy(e.target.value)} className={inputClass}>
            {['All Users', 'admin'].map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-transparent">x</label>
          <button
            onClick={() => { setFilterType('All Types'); setFilterStatus('All Status'); setFilterCreatedBy('All Users'); setSearch(''); }}
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
              type="text" placeholder="Search role..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-[12px] text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
            />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-transparent">x</label>
          <button className={btnOutline}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export Excel
          </button>
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-transparent">x</label>
          <button className={btnOutline}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Import Excel
          </button>
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
            Add Role
          </button>
        </div>

      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-250">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                {[
                  "Role Name",
                  "Description",
                  "Users",
                  "Permissions",
                  "Status",
                  "Created Date",
                  "Action",
                ].map((h) => (
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
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-semibold text-slate-800 dark:text-slate-200">{r.name}</span>
                      <span className={`${r.typeColor} text-[11px] font-semibold px-2 py-0.5 rounded-full inline-flex w-max`}>{r.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-slate-600 dark:text-slate-400 whitespace-normal">{r.description}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{r.users}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{r.permissions}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`${r.statusColor} text-[11px] font-semibold px-2 py-0.5 rounded-full`}>{r.status}</span>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{r.createdDate} by {r.createdBy}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => router.push(`/master-data/roles/${r.id}`)} className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-200 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-yellow-50 dark:hover:bg-yellow-950 hover:border-yellow-200 flex items-center justify-center text-slate-400 hover:text-yellow-500 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                          <rect x="3" y="11" width="18" height="11" rx="2"/>
                          <path d="M7 11V7a5 5 0 0110 0v4"/>
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
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            <p className="text-[12px] text-slate-400 dark:text-slate-600">No roles found</p>
          </div>
        )}
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setDrawerOpen(false)} />
      )}

      <div className={`
        fixed top-0 right-0 h-full w-80 bg-white dark:bg-slate-800 shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${drawerOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-[14px] font-bold text-slate-800 dark:text-white">Add New Role</h2>
          <button onClick={() => setDrawerOpen(false)} className="w-7 h-7 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          <div>
            <h3 className="text-[12px] font-bold text-slate-700 dark:text-slate-300 mb-3">Role Information</h3>
            <div className="space-y-3">
              {[
                { label: "Role Name", type: "text", placeholder: "Enter role name", required: true },
                { label: "Role Type", type: "select", placeholder: "Select role type", required: true, options: ["Select type", "System Role", "Custom Role"] },
                { label: "Description", type: "textarea", placeholder: "Enter description", required: false },
                { label: "Created By", type: "text", placeholder: "Admin name", required: true },
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
                      rows={4}
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
            <button onClick={() => setDrawerOpen(false)}
              className="flex-1 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-[12px] font-medium py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold py-2 rounded-lg transition-colors">
              Save Role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
