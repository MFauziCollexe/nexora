"use client";

import { useState } from "react";

const statCards = [
  { label: "Total Users",    value: 25, sub: "All registered users",  iconBg: "bg-blue-50 dark:bg-blue-950",     iconColor: "text-blue-500",   icon: "user"   },
  { label: "Active Users",   value: 22, sub: "Currently active",      iconBg: "bg-green-50 dark:bg-green-950",   iconColor: "text-green-500",  icon: "check"  },
  { label: "Inactive Users", value: 2,  sub: "Inactive accounts",     iconBg: "bg-yellow-50 dark:bg-yellow-950", iconColor: "text-yellow-500", icon: "pause"  },
  { label: "Locked Users",   value: 1,  sub: "Locked accounts",       iconBg: "bg-red-50 dark:bg-red-950",       iconColor: "text-red-500",    icon: "lock"   },
  { label: "Online Now",     value: 5,  sub: "Active sessions",       iconBg: "bg-purple-50 dark:bg-purple-950", iconColor: "text-purple-500", icon: "online" },
];

const users = [
  { id: 1,  avatar: "AD", username: "admin",       department: "IT",        fullName: "Admin User",     employee: "ADM001", role: "Super Admin", roleColor: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400", email: "admin@nexora.com",  status: "Active",   statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",   lastLogin: "11 Jun 2026\n08:30" },
  { id: 2,  avatar: "BS", username: "finance01",   department: "Finance",   fullName: "Budi Santoso",   employee: "FIN001", role: "Staff",       roleColor: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",       email: "budi@nexora.com",   status: "Active",   statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",   lastLogin: "10 Jun 2026\n17:00" },
  { id: 3,  avatar: "SA", username: "purchase01",  department: "Purchase",  fullName: "Siti Aisyah",    employee: "PUR001", role: "Staff",       roleColor: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",       email: "siti@nexora.com",   status: "Active",   statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",   lastLogin: "10 Jun 2026\n16:20" },
  { id: 4,  avatar: "RP", username: "inventory01", department: "Inventory", fullName: "Rizky Pratama",  employee: "INV001", role: "Supervisor",  roleColor: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-400",       email: "rizky@nexora.com",  status: "Active",   statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",   lastLogin: "10 Jun 2026\n15:45" },
  { id: 5,  avatar: "FA", username: "itmanager",   department: "IT",        fullName: "Fauzi Ahmad",    employee: "ITM001", role: "Manager",     roleColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400",email: "fauzi@nexora.com",  status: "Active",   statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",   lastLogin: "09 Jun 2026\n11:10" },
  { id: 6,  avatar: "LW", username: "hrga01",      department: "HRGA",      fullName: "Linda Wati",     employee: "HRG001", role: "Staff",       roleColor: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",       email: "linda@nexora.com",  status: "Inactive", statusColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",lastLogin: "-" },
  { id: 7,  avatar: "DK", username: "warehouse01", department: "Warehouse", fullName: "Dedi Kurniawan", employee: "WH001",  role: "Staff",       roleColor: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",       email: "dedi@nexora.com",   status: "Locked",   statusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",           lastLogin: "-" },
  { id: 8,  avatar: "MR", username: "sales01",     department: "Sales",     fullName: "Mira Rahma",     employee: "SAL001", role: "Staff",       roleColor: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",       email: "maya@nexora.com",   status: "Active",   statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",   lastLogin: "11 Jun 2026\n07:45" },
];

export default function UsersPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All Roles");
  const [filterStatus, setFilterStatus] = useState("All Status");

  const filtered = users.filter((u) => {
    const matchSearch =
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole   = filterRole   === "All Roles"  || u.role   === filterRole;
    const matchStatus = filterStatus === "All Status" || u.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  const inputClass = "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-1.5 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 cursor-pointer";
  const btnOutline = "flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-[12px] font-medium px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap";

  return (
    <div className="p-4 space-y-3">

      {/* BREADCRUMB */}
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <span>Master Data</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span>System</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span className="text-slate-600 dark:text-slate-300 font-medium">Users</span>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-5 gap-3">
        {statCards.map((s) => (
          <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm p-3 flex items-center gap-3">
            <div className={`${s.iconBg} ${s.iconColor} w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0`}>
              {s.icon === "user"   && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
              {s.icon === "check"  && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
              {s.icon === "pause"  && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
              {s.icon === "lock"   && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>}
              {s.icon === "online" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>}
            </div>
            <div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">{s.label}</p>
              <p className="text-[20px] font-bold text-slate-800 dark:text-white leading-tight">{s.value}</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* TOOLBAR + FILTER */}
      <div className="flex items-end gap-2 overflow-x-auto pb-1">

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Role</label>
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className={inputClass}>
            {["All Roles", "Super Admin", "Manager", "Supervisor", "Staff"].map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Status</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={inputClass}>
            {["All Status", "Active", "Inactive", "Locked"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Department</label>
          <select className={inputClass}>
            {["All Departments", "Finance", "IT", "HR", "Warehouse", "Sales"].map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-transparent">x</label>
          <button
            onClick={() => { setFilterRole("All Roles"); setFilterStatus("All Status"); setSearch(""); }}
            className={btnOutline}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
            </svg>
            Reset
          </button>
        </div>

        <div className="flex-1"/>

        {/* Search */}
        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-transparent">x</label>
          <div className="relative">
            <input
              type="text" placeholder="Search user..."
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
            Add User
          </button>
        </div>

      </div>

      {/* TABEL */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                {["Username", "Full Name", "Employee", "Department", "Role", "Email", "Status", "Last Login", "Action"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {h}
                      {h !== "Action" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 text-slate-300 dark:text-slate-600 flex-shrink-0">
                          <path d="M7 15l5 5 5-5M7 9l5-5 5 5"/>
                        </svg>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">

                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                        {u.avatar}
                      </div>
                      <span className="text-[12px] font-medium text-slate-700 dark:text-slate-300">{u.username}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-[12px] text-slate-600 dark:text-slate-400 whitespace-nowrap">{u.fullName}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{u.employee}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{u.department}</td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`${u.roleColor} text-[11px] font-semibold px-2 py-0.5 rounded-full`}>{u.role}</span>
                  </td>

                  <td className="px-4 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{u.email}</td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`${u.statusColor} text-[11px] font-semibold px-2 py-0.5 rounded-full`}>{u.status}</span>
                  </td>

                  <td className="px-4 py-3 text-[11px] text-slate-500 dark:text-slate-400 whitespace-pre-line">{u.lastLogin}</td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <button className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-200 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors">
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
            <p className="text-[12px] text-slate-400 dark:text-slate-600">No users found</p>
          </div>
        )}
      </div>

      {/* OVERLAY */}
      {drawerOpen && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setDrawerOpen(false)}/>
      )}

      {/* DRAWER */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-white dark:bg-slate-800 shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${drawerOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-[14px] font-bold text-slate-800 dark:text-white">Add New User</h2>
          <button onClick={() => setDrawerOpen(false)} className="w-7 h-7 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">

          {[
            { title: "Account Information", fields: [
              { label: "Employee", type: "select", placeholder: "Select employee", required: true, options: ["Select employee", "Budi Santoso", "Siti Aisyah", "Rizky Pratama"] },
              { label: "Username", type: "text",   placeholder: "Enter username",  required: true },
              { label: "Full Name", type: "text",  placeholder: "Enter full name", required: true },
              { label: "Email",    type: "email",  placeholder: "Enter email address", required: true },
              { label: "Phone Number", type: "text", placeholder: "Enter phone number", required: false },
            ]},
            { title: "Access Control", fields: [
              { label: "Role",       type: "select", placeholder: "Select role",       required: true, options: ["Select role", "Super Admin", "Manager", "Supervisor", "Staff"] },
              { label: "Department", type: "select", placeholder: "Select department", required: false, options: ["Select department", "Finance", "IT", "HR", "Warehouse"] },
            ]},
          ].map((section) => (
            <div key={section.title}>
              <h3 className="text-[12px] font-bold text-slate-700 dark:text-slate-300 mb-3">{section.title}</h3>
              <div className="space-y-3">
                {section.fields.map((f) => (
                  <div key={f.label}>
                    <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1 block">
                      {f.label} {f.required && <span className="text-red-500">*</span>}
                    </label>
                    {f.type === "select" ? (
                      <select className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-500 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900">
                        {f.options?.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input type={f.type} placeholder={f.placeholder}
                        className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-700 dark:text-slate-300 placeholder:text-slate-300 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Security */}
          <div>
            <h3 className="text-[12px] font-bold text-slate-700 dark:text-slate-300 mb-3">Security</h3>
            <div className="space-y-3">
              {[
                { label: "Password",         placeholder: "Enter password"    },
                { label: "Confirm Password", placeholder: "Confirm password"  },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1 block">
                    {f.label} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input type="password" placeholder={f.placeholder}
                      className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-700 dark:text-slate-300 placeholder:text-slate-300 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 pr-9"
                    />
                    <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

              <div className="space-y-2">
                {[
                  { label: "Force Change Password on First Login", defaultChecked: true  },
                  { label: "Two Factor Authentication",            defaultChecked: false },
                  { label: "Account Never Expires",                defaultChecked: false },
                ].map((cb) => (
                  <label key={cb.label} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked={cb.defaultChecked} className="w-3.5 h-3.5 rounded accent-blue-600"/>
                    <span className="text-[11px] text-slate-600 dark:text-slate-400">{cb.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Tombol */}
          <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
            <button onClick={() => setDrawerOpen(false)}
              className="flex-1 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-[12px] font-medium py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              Cancel
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold py-2 rounded-lg transition-colors">
              Save User
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}