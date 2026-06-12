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
    // Initialize with all menu codes on first render
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

  const permissions = [
    { module: "Dashboard", view: true, create: false, edit: false, delete: false, approve: false, export: true, print: true, import: false },
    { module: "Business Partner", view: true, create: true, edit: true, delete: true, approve: false, export: true, print: true, import: true },
    { module: "Sales Order", view: true, create: true, edit: true, delete: false, approve: true, export: true, print: true, import: false },
    { module: "Purchase Order", view: true, create: true, edit: true, delete: false, approve: true, export: true, print: true, import: false },
    { module: "Journal Entry", view: true, create: true, edit: true, delete: false, approve: true, export: true, print: true, import: false },
    { module: "Employee", view: true, create: true, edit: true, delete: true, approve: false, export: true, print: true, import: true },
    { module: "User", view: true, create: true, edit: true, delete: true, approve: false, export: true, print: true, import: true },
  ];

  const approvalRules = [
    { document: "Purchase Request", enabled: true, limit: 50000, currency: "IDR", description: "Approval limit for PR" },
    { document: "Purchase Order", enabled: true, limit: 100000, currency: "IDR", description: "Approval limit for PO" },
    { document: "Payment Request", enabled: true, limit: 25000, currency: "IDR", description: "Approval limit for Payment" },
    { document: "Goods Receipt", enabled: false, limit: 0, currency: "-", description: "No approval required" },
    { document: "Sales Order", enabled: true, limit: 75000, currency: "IDR", description: "Approval limit for SO" },
    { document: "Discount Approval", enabled: true, limit: 10000, currency: "IDR", description: "Approval limit for Discount" },
  ];

  const assignedUsers = [
    { username: "budi.santoso", fullName: "Budi Santoso", employee: "FIN001", department: "Finance", email: "budi@nexora.com", status: "Active" },
    { username: "ricky.pratama", fullName: "Ricky Pratama", employee: "INV001", department: "Inventory", email: "ricky@nexora.com", status: "Active" },
    { username: "fauzi.ahmad", fullName: "Fauzi Ahmad", employee: "ITM001", department: "IT", email: "fauzi@nexora.com", status: "Active" },
    { username: "linda.wati", fullName: "Linda Wati", employee: "HRG001", department: "HRGA", email: "linda@nexora.com", status: "Active" },
    { username: "siti.aisyah", fullName: "Siti Aisyah", employee: "PUR001", department: "Purchase", email: "siti@nexora.com", status: "Active" },
  ];

  return (
    <div className="p-4 space-y-3">
      {/* BREADCRUMB */}
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <span>Master Data</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6"/></svg>
        <span>System</span>
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
                <div>
                  <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-2 block">Role Type</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="type" className="w-4 h-4 accent-blue-600" />
                      <span className="text-[12px] text-slate-600 dark:text-slate-300">System Role</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="type" defaultChecked className="w-4 h-4 accent-blue-600" />
                      <span className="text-[12px] text-slate-600 dark:text-slate-300">Custom Role</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1 block">Created By</label>
                  <input type="text" value={roleData.createdBy} disabled className="w-full border border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-500 dark:text-slate-400 cursor-not-allowed" />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1 block">Created Date</label>
                  <input type="text" value={roleData.createdDate} disabled className="w-full border border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-500 dark:text-slate-400 cursor-not-allowed" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1 block">Last Updated By</label>
                  <input type="text" value={roleData.updatedBy} disabled className="w-full border border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-500 dark:text-slate-400 cursor-not-allowed" />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1 block">Last Updated Date</label>
                  <input type="text" value={roleData.updatedDate} disabled className="w-full border border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-500 dark:text-slate-400 cursor-not-allowed" />
                </div>
              </div>
            </div>
          )}

          {/* MODULE ACCESS */}
          {activeTab === "module" && (
            <div className="space-y-4">
              <h3 className="text-[13px] font-bold text-slate-800 dark:text-white">Module Access</h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">Select modules and menus that can be accessed by this role</p>

              <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
                <input 
                  type="text" 
                  placeholder="Search module or menu..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100" 
                />
                <button onClick={selectAll} className="text-[11px] font-medium text-blue-600 hover:text-blue-700">Select All</button>
                <button onClick={expandAll} className="text-[11px] font-medium text-blue-600 hover:text-blue-700">Expand All</button>
                <button onClick={collapseAll} className="text-[11px] font-medium text-blue-600 hover:text-blue-700">Collapse All</button>
              </div>

              <div className="space-y-2">
                {sidebarMenus.map((mainMenu: MainMenuType) => {
                  const isExpanded = moduleState.expanded.includes(mainMenu.code);
                  const isSelected = moduleState.selected.includes(mainMenu.code);
                  
                  return (
                    <div key={mainMenu.code} className="border border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleModule(mainMenu.code)}
                        className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                      >
                        <label className="flex items-center gap-2 cursor-pointer flex-1">
                          <input 
                            type="checkbox" 
                            checked={isSelected}
                            onChange={() => toggleMenu(mainMenu.code)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-4 h-4 accent-blue-600" 
                          />
                          <span className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">{mainMenu.name}</span>
                        </label>
                        <svg className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? "rotate-90" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </button>

                      {isExpanded && mainMenu.submenus && (
                        <div className="px-3 py-2 space-y-2 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                          {mainMenu.submenus.map((submenu) => {
                            const isSubSelected = moduleState.selected.includes(submenu.code);
                            
                            return (
                              <div key={submenu.code}>
                                <label className="flex items-center gap-2 cursor-pointer ml-4">
                                  <input 
                                    type="checkbox" 
                                    checked={isSubSelected}
                                    onChange={() => toggleMenu(submenu.code)}
                                    className="w-4 h-4 accent-blue-600" 
                                  />
                                  <span className="text-[11px] text-slate-600 dark:text-slate-300">{submenu.name}</span>
                                </label>

                                {submenu.child_menus && submenu.child_menus.length > 0 && (
                                  <div className="ml-8 mt-1 space-y-1">
                                    {submenu.child_menus.map((childMenu) => {
                                      const isChildSelected = moduleState.selected.includes(childMenu.code);
                                      
                                      return (
                                        <label key={childMenu.code} className="flex items-center gap-2 cursor-pointer">
                                          <input 
                                            type="checkbox" 
                                            checked={isChildSelected}
                                            onChange={() => toggleMenu(childMenu.code)}
                                            className="w-3 h-3 accent-blue-600" 
                                          />
                                          <span className="text-[10px] text-slate-500 dark:text-slate-400">{childMenu.name}</span>
                                        </label>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {sidebarMenus.length === 0 && (
                <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                  <p className="text-[12px]">No menus available</p>
                </div>
              )}
            </div>
          )}

          {/* PERMISSION MATRIX */}
          {activeTab === "permission" && (
            <div className="space-y-4">
              <h3 className="text-[13px] font-bold text-slate-800 dark:text-white">Permission Matrix</h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">Set permission level for each menu and action</p>

              <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
                <input type="text" placeholder="Search menu..." className="flex-1 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100" />
                <div className="flex gap-2">
                  <label className="flex items-center gap-1 cursor-pointer text-[11px]">
                    <input type="checkbox" defaultChecked className="w-3 h-3 accent-blue-600" />
                    <span className="text-slate-600 dark:text-slate-300">Allowed</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer text-[11px]">
                    <input type="checkbox" className="w-3 h-3 accent-slate-600" />
                    <span className="text-slate-600 dark:text-slate-300">Read Only</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer text-[11px]">
                    <input type="checkbox" className="w-3 h-3 accent-slate-600" />
                    <span className="text-slate-600 dark:text-slate-300">Not Allowed</span>
                  </label>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-250 text-[12px]">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900">
                      <th className="text-left px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">MODULE / MENU</th>
                      <th className="text-center px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">VIEW</th>
                      <th className="text-center px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">CREATE</th>
                      <th className="text-center px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">EDIT</th>
                      <th className="text-center px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">DELETE</th>
                      <th className="text-center px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">APPROVE</th>
                      <th className="text-center px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">EXPORT</th>
                      <th className="text-center px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">PRINT</th>
                      <th className="text-center px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">IMPORT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((perm, idx) => (
                      <tr key={idx} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                        <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{perm.module}</td>
                        {['view', 'create', 'edit', 'delete', 'approve', 'export', 'print', 'import'].map((action) => (
                          <td key={action} className="text-center">
                            <input type="checkbox" defaultChecked={perm[action as keyof typeof perm] === true} className="w-4 h-4 accent-blue-600" />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* DATA SCOPE */}
          {activeTab === "scope" && (
            <div className="space-y-4">
              <h3 className="text-[13px] font-bold text-slate-800 dark:text-white">Data Scope</h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">Define the data access scope for this role</p>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="scope" className="w-4 h-4 accent-blue-600" />
                  <div>
                    <p className="text-[12px] font-medium text-slate-700 dark:text-slate-300">All Data</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Can access all data in all departments and branches</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="scope" className="w-4 h-4 accent-blue-600" />
                  <div>
                    <p className="text-[12px] font-medium text-slate-700 dark:text-slate-300">Department Only</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Can access data only from user&apos;s own department</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="scope" className="w-4 h-4 accent-blue-600" />
                  <div>
                    <p className="text-[12px] font-medium text-slate-700 dark:text-slate-300">Own Data Only</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Can access data created by the user only</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="scope" defaultChecked className="w-4 h-4 accent-blue-600" />
                  <div>
                    <p className="text-[12px] font-medium text-slate-700 dark:text-slate-300">Custom Scope</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Define custom data access rules</p>
                  </div>
                </label>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-600 pt-4 space-y-3">
                <h4 className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">Custom Scope Configuration</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1 block">Department</label>
                    <select className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100">
                      <option>2 selected</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1 block">Branch / Location</label>
                    <select className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100">
                      <option>All Branches</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1 block">Data Owner</label>
                    <select className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100">
                      <option>All Users</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1 block">Data Filter</label>
                  <input type="text" placeholder="Status = Active" className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100" />
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg">
                  <p className="text-[11px] text-blue-700 dark:text-blue-300">ℹ Information</p>
                  <p className="text-[10px] text-blue-600 dark:text-blue-400">This scope will be applied to all medium flow that support data level access control.</p>
                </div>
              </div>
            </div>
          )}

          {/* APPROVAL AUTHORITY */}
          {activeTab === "approval" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[13px] font-bold text-slate-800 dark:text-white">Approval Authority</h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">Define approval authority and limit for documents</p>
                </div>
                <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Add Authority
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-250 text-[12px]">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900">
                      <th className="text-left px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">DOCUMENT</th>
                      <th className="text-center px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">CAN APPROVE</th>
                      <th className="text-left px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">APPROVAL LIMIT</th>
                      <th className="text-left px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">CURRENCY</th>
                      <th className="text-left px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">DESCRIPTION</th>
                      <th className="text-left px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvalRules.map((rule, idx) => (
                      <tr key={idx} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                        <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{rule.document}</td>
                        <td className="text-center">
                          <label className="flex justify-center">
                            <input type="checkbox" defaultChecked={rule.enabled} className="w-4 h-4 accent-blue-600" />
                          </label>
                        </td>
                        <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{rule.limit > 0 ? rule.limit.toLocaleString() : "-"}</td>
                        <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{rule.currency}</td>
                        <td className="px-3 py-2 text-slate-600 dark:text-slate-400">{rule.description}</td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1.5">
                            <button className="w-6 h-6 rounded border border-slate-200 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-blue-950 flex items-center justify-center text-slate-400 hover:text-blue-500">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                            </button>
                            <button className="w-6 h-6 rounded border border-slate-200 dark:border-slate-600 hover:bg-red-50 dark:hover:bg-red-950 flex items-center justify-center text-slate-400 hover:text-red-500">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                                <path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg">
                <p className="text-[11px] text-blue-700 dark:text-blue-300">ℹ Approval limit is the maximum amount that can be approved by this role. Transactions above the limit require higher authority.</p>
              </div>
            </div>
          )}

          {/* ASSIGNED USERS */}
          {activeTab === "assigned" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[13px] font-bold text-slate-800 dark:text-white">Assigned Users</h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">Manage users that are assigned to this role</p>
                </div>
                <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Assign User
                </button>
              </div>

              <input type="text" placeholder="Search user..." className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100" />

              <div className="overflow-x-auto">
                <table className="w-full min-w-250 text-[12px]">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900">
                      <th className="text-left px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">USERNAME</th>
                      <th className="text-left px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">FULL NAME</th>
                      <th className="text-left px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">EMPLOYEE ID</th>
                      <th className="text-left px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">DEPARTMENT</th>
                      <th className="text-left px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">EMAIL</th>
                      <th className="text-left px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">STATUS</th>
                      <th className="text-left px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignedUsers.map((user, idx) => (
                      <tr key={idx} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-linear-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white text-[10px] font-bold">
                              {user.username.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-slate-700 dark:text-slate-300">{user.username}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{user.fullName}</td>
                        <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{user.employee}</td>
                        <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{user.department}</td>
                        <td className="px-3 py-2 text-slate-600 dark:text-slate-400">{user.email}</td>
                        <td className="px-3 py-2">
                          <span className="inline-flex px-2 py-1 bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400 text-[11px] font-semibold rounded-full">{user.status}</span>
                        </td>
                        <td className="px-3 py-2">
                          <button className="w-6 h-6 rounded border border-slate-200 dark:border-slate-600 hover:bg-red-50 dark:hover:bg-red-950 flex items-center justify-center text-slate-400 hover:text-red-500">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                              <path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                <p>Showing 1 to 5 of 5 entries</p>
                <div className="flex items-center gap-2">
                  <span>10 / page</span>
                  <button className="px-2 py-1 border border-slate-200 dark:border-slate-600 rounded hover:bg-slate-50 dark:hover:bg-slate-700">1</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
