"use client";

import { ReactNode } from "react";
import { ProtectedRoute } from "@/lib/ProtectedRoute";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const menuItems = [
  { label: "Dashboard",           href: "/dashboard", active: true  },
  { label: "Master Data",         href: "#",          active: false },
  { label: "Sales",               href: "#",          active: false },
  { label: "Purchase",            href: "#",          active: false },
  { label: "Inventory",           href: "#",          active: false },
  { label: "Production",          href: "#",          active: false },
  { label: "Finance",             href: "#",          active: false },
  { label: "HR & Payroll",        href: "#",          active: false },
  { label: "Assets Management",   href: "#",          active: false },
  { label: "Project",             href: "#",          active: false },
  { label: "CRM",                 href: "#",          active: false },
  { label: "Reports & Analytics", href: "#",          active: false },
  { label: "Settings",            href: "#",          active: false },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-slate-50">

        {/* ── SIDEBAR ── */}
        <aside className="w-48 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">

          {/* Logo */}
          <div className="flex items-center gap-2 px-3 py-3 border-b border-slate-100">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-[11px]">N</span>
            </div>
            <div>
              <div className="text-[18px] font-bold text-slate-800 leading-tight">NEXORA</div>
              <div className="text-[9px] text-slate-400 leading-tight">ERP SYSTEM</div>
            </div>
          </div>

          {/* Menu */}
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
                    : "text-slate-600 hover:bg-slate-100"
                  }
                `}
              >
                <span>{item.label}</span>
                {!item.active && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-2.5 h-2.5 opacity-40">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                )}
              </Link>
            ))}
          </nav>

          {/* System Info */}
          <div className="border-t border-slate-100 px-3 py-2.5">
            <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wide mb-1">
              System Information
            </p>
            <div className="space-y-1">
              <div>
                <p className="text-[9px] text-slate-400">Company</p>
                <p className="text-[11px] text-slate-600 font-medium">Nexora Solusi Indonesia</p>
              </div>
              <div>
                <p className="text-[9px] text-slate-400">Database</p>
                <p className="text-[11px] text-slate-600 font-medium">nexora_erp</p>
              </div>
              <div>
                <p className="text-[9px] text-slate-400">Version</p>
                <p className="text-[11px] text-slate-600 font-medium">v1.0.0</p>
              </div>
            </div>
            <p className="text-[9px] text-slate-300 mt-2">© 2026 Nexora ERP. All rights reserved.</p>
          </div>

        </aside>

        {/* ── MAIN AREA ── */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Header */}
          <header className="bg-white border-b border-slate-200 flex items-center px-4 py-2.5 gap-3">
            <div>
              <h1 className="text-[15px] font-bold text-slate-800 leading-tight">Dashboard</h1>
              <p className="text-[11px] text-slate-500 leading-tight">
                Welcome back, {user?.name || "Admin"}! Here's what's happening with your business.
              </p>
            </div>

            <div className="ml-auto flex items-center gap-2.5">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-44 bg-slate-50 border border-slate-200 rounded-lg pl-7 pr-3 py-1.5 text-[11px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-slate-400 bg-white border border-slate-200 rounded px-1">
                  Ctrl+K
                </span>
              </div>

              {/* Notifikasi */}
              <button className="relative p-1.5 text-slate-500 hover:text-slate-700">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 01-3.46 0"/>
                </svg>
                <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  5
                </span>
              </button>

              {/* Cart */}
              <button className="relative p-1.5 text-slate-500 hover:text-slate-700">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                </svg>
                <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-orange-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* User */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">
                  {(user?.name || "A").charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-semibold text-slate-800">{user?.name || "Admin"}</div>
                  <div className="text-[9px] text-slate-400">System Administrator</div>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 text-slate-400">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            {children}
          </main>

        </div>
      </div>
    </ProtectedRoute>
  );
}