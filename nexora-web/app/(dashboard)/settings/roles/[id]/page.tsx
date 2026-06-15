"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useMenus } from "@/lib/MenuContext";
import { MainMenuType } from "@/lib/menuApi";

type TabType = "general" | "module" | "permission" | "scope" | "approval" | "assigned";

const tabs: { id: TabType; label: string }[] = [
  { id: "general", label: "General Information" },
  { id: "module", label: "Module Access" },
  { id: "permission", label: "Permission Matrix" },
  { id: "scope", label: "Data Scope" },
  { id: "approval", label: "Approval Authority" },
  { id: "assigned", label: "Assigned Users" },
];

export default function EditRolePage() {
  const router = useRouter();
  const params = useParams();
  const roleId = params.id;
  const { menus: sidebarMenus } = useMenus();
  
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [moduleState, setModuleState] = useState(() => {
    if (sidebarMenus.length > 0) {
      const allModuleCodes = sidebarMenus.map((m: MainMenuType) => m.code);
      const allMenuCodes = sidebarMenus.flatMap((m: MainMenuType) => [
        m.code,
        ...(m.submenus?.map((s) => s.code) || []),
        ...(m.submenus?.flatMap((s) => s.child_menus?.map((c) => c.code) || []) || [])
      ]);
      return { expanded: allModuleCodes, selected: allMenuCodes };
    }
    return { expanded: [], selected: [] };
  });
  const [searchQuery, setSearchQuery] = useState("");

  const toggleModule = (code: string) => {
    setModuleState(prev => ({
      ...prev,
      expanded: prev.expanded.includes(code) 
        ? prev.expanded.filter(c => c !== code) 
        : [...prev.expanded, code]
    }));
  };

  const toggleMenu = (code: string) => {
    setModuleState(prev => ({
      ...prev,
      selected: prev.selected.includes(code)
        ? prev.selected.filter(c => c !== code)
        : [...prev.selected, code]
    }));
  };

  const selectAll = () => {
    const allMenuCodes = sidebarMenus.flatMap((m: MainMenuType) => [
      m.code,
      ...(m.submenus?.map((s) => s.code) || []),
      ...(m.submenus?.flatMap((s) => s.child_menus?.map((c) => c.code) || []) || [])
    ]);
    setModuleState(prev => ({ ...prev, selected: allMenuCodes }));
  };

  const expandAll = () => {
    const allExpandable = sidebarMenus.flatMap((m: MainMenuType) => [
      m.code,
      ...(m.submenus?.map((s) => s.code) || [])
    ]);
    setModuleState(prev => ({ ...prev, expanded: allExpandable }));
  };

  const collapseAll = () => {
    setModuleState(prev => ({ ...prev, expanded: [] }));
  };

  const roleData = {
    id: parseInt(roleId as string),
    name: "Manager",
    code: "MANAGER",
    description: "Management access for operational and team activities",
    status: "Active",
    type: "Custom Role",
    createdBy: "admin",
    createdDate: "10 Jun 2026 10:30",
    updatedBy: "admin",
    updatedDate: "11 Jun 2026 14:20",
  };

  return (
    <div className="p-4 space-y-3">
      {/* BREADCRUMB */}
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <span>Settings</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span>User & Security</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span>Roles</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span className="text-slate-600 dark:text-slate-300 font-medium">Edit Role</span>
      </div>

      {/* TABS */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700 gap-3 overflow-x-auto">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-[12px] font-medium rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => router.back()}
              className="border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[12px] font-medium px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-colors">
              Save Role
            </button>
          </div>
        </div>

        {/* TAB CONTENT */}
        <div className="p-4">
          {/* GENERAL INFORMATION */}
          {activeTab === "general" && (
            <div className="space-y-4">
              <h3 className="text-[13px] font-bold text-slate-800 dark:text-white">General Information</h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">Define basic information for this role</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1 block">Role Name *</label>
                  <input type="text" defaultValue={roleData.name} className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900" />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1 block">Role Code *</label>
                  <input type="text" defaultValue={roleData.code} className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1 block">Description</label>
                <textarea rows={4} defaultValue={roleData.description} className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-2 block">Status</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="status" defaultChecked className="w-4 h-4 accent-blue-600" />
                      <span className="text-[12px] text-slate-600 dark:text-slate-300">Active</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="status" className="w-4 h-4 accent-blue-600" />
                      <span className="text-[12px] text-slate-600 dark:text-slate-300">Inactive</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
