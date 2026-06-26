"use client";

import { useState } from "react";
import StatCards from "@/components/masterdata/StatCards";
import DrawerForm from "@/components/masterdata/DrawerForm";
import Pagination from "@/components/masterdata/Pagination";
import { statCards, items as itemData, categories, brands, itemGroups, itemTypes, uoms } from "@/data/masterdata/itemMaster";

export default function ItemMasterPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All Category");
  const [filterBrand, setFilterBrand] = useState("All Brand");
  const [filterUom, setFilterUom] = useState("All UOM");
  const [filterStatus, setFilterStatus] = useState("All Status");

  const filtered = itemData.filter((item) => {
    const query = search.toLowerCase();
    const matchSearch =
      item.code.toLowerCase().includes(query) ||
      (item.barcode && item.barcode.toLowerCase().includes(query)) ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.brand.toLowerCase().includes(query);
    const matchCategory = filterCategory === "All Category" || item.category === filterCategory;
    const matchBrand = filterBrand === "All Brand" || item.brand === filterBrand;
    const matchUom = filterUom === "All UOM" || item.uom === filterUom;
    const matchStatus = filterStatus === "All Status" || item.status === filterStatus;
    return matchSearch && matchCategory && matchBrand && matchUom && matchStatus;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const inputClass = "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-1.5 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 cursor-pointer";
  const btnOutline = "flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-[12px] font-medium px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap";

  return (
    <div className="p-4 space-y-3">

      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <span>Master Data</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6" /></svg>
        <span>Inventory</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M9 18l6-6-6-6" /></svg>
        <span className="text-slate-600 dark:text-slate-300 font-medium">Item Master</span>
      </div>

      <StatCards cards={statCards} />

      <div className="flex items-end gap-2 overflow-x-auto pb-1">

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Category</label>
          <select value={filterCategory} onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }} className={inputClass}>
            {categories.map((category) => <option key={category}>{category}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Brand</label>
          <select value={filterBrand} onChange={(e) => { setFilterBrand(e.target.value); setCurrentPage(1); }} className={inputClass}>
            {brands.map((brand) => <option key={brand}>{brand}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">UOM</label>
          <select value={filterUom} onChange={(e) => { setFilterUom(e.target.value); setCurrentPage(1); }} className={inputClass}>
            {uoms.map((uom) => <option key={uom}>{uom}</option>)}
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
          <button onClick={() => { setFilterCategory("All Category"); setFilterBrand("All Brand"); setFilterUom("All UOM"); setFilterStatus("All Status"); setSearch(""); setCurrentPage(1); }} className={btnOutline}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
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
              placeholder="Search item..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-[12px] text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
            />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
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
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Item
          </button>
        </div>

      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-250">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                {["Item Code", "Barcode", "Item Name", "Category", "Brand", "UOM", "Unit Price", "Cost Price", "Min Stock", "Status", "Actions"].map((h) => (
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
              {paginatedData.map((item) => (
                <tr key={item.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-[12px] font-medium text-slate-700 dark:text-slate-300">{item.code}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[12px] text-slate-500 dark:text-slate-400">{item.barcode ?? "-"}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[12px] text-slate-800 dark:text-slate-200">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 text-[10px] font-semibold">{item.image}</div>
                      <div>
                        <span className="block">{item.name}</span>
                        <span className="block text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{item.description}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-[12px] text-slate-600 dark:text-slate-400">{item.category}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[12px] text-slate-600 dark:text-slate-400">{item.brand}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[12px] text-slate-600 dark:text-slate-400">{item.uom}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[12px] text-slate-700 dark:text-slate-300 font-medium">Rp {item.unitPrice.toLocaleString("id-ID")}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[12px] text-slate-600 dark:text-slate-400">Rp {item.costPrice.toLocaleString("id-ID")}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[12px] text-slate-600 dark:text-slate-400">{item.minStock.toLocaleString("id-ID")}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`${item.statusColor} text-[11px] font-semibold px-2 py-0.5 rounded-full`}>{item.status}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
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

        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} filteredLength={filtered.length} itemsPerPage={itemsPerPage} />

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-slate-200 dark:text-slate-700 mx-auto mb-2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <p className="text-[12px] text-slate-400 dark:text-slate-600">No items found</p>
          </div>
        )}
      </div>

      <DrawerForm open={drawerOpen} title="Add Item" onClose={() => setDrawerOpen(false)}>
        <div>
          <h3 className="text-[12px] font-bold text-slate-700 dark:text-slate-300 mb-3">Item Information</h3>
          <div className="space-y-3">
            {[
              { label: "Item Code", type: "text", placeholder: "Enter item code", required: true },
              { label: "Barcode", type: "text", placeholder: "Enter barcode (optional)", required: false },
              { label: "Item Name", type: "text", placeholder: "Enter item name", required: true },
              { label: "Description", type: "textarea", placeholder: "Enter description", required: false },
              { label: "Category", type: "select", placeholder: "Select category", required: true, options: categories.filter((c) => c !== "All Category") },
              { label: "Brand", type: "select", placeholder: "Select brand", required: false, options: brands.filter((b) => b !== "All Brand") },
              { label: "Item Group", type: "select", placeholder: "Select item group", required: false, options: itemGroups.filter((g) => g !== "All Group") },
              { label: "Item Type", type: "select", placeholder: "Select item type", required: false, options: itemTypes.filter((t) => t !== "All Type") },
              { label: "UOM", type: "select", placeholder: "Select UOM", required: true, options: uoms.filter((u) => u !== "All UOM") },
              { label: "Unit Price", type: "text", placeholder: "Enter unit price", required: true },
              { label: "Cost Price", type: "text", placeholder: "Enter cost price", required: true },
              { label: "Min Stock", type: "text", placeholder: "Enter minimum stock", required: true },
              { label: "Max Stock", type: "text", placeholder: "Enter maximum stock", required: false },
              { label: "Reorder Point", type: "text", placeholder: "Enter reorder point", required: false },
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
                ) : field.type === "textarea" ? (
                  <textarea
                    placeholder={field.placeholder}
                    rows={3}
                    className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-700 dark:text-slate-300 placeholder:text-slate-300 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 resize-none"
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
          <button onClick={() => setDrawerOpen(false)} className="flex-1 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-[12px] font-medium py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            Cancel
          </button>
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold py-2 rounded-lg transition-colors">
            Save Item
          </button>
        </div>
      </DrawerForm>
    </div>
  );
}
