export const statCards = [
  { label: "Total Groups", value: 18, sub: "All item groups", iconBg: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-500", icon: "users" },
  { label: "Active Groups", value: 15, sub: "Currently active", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500", icon: "check" },
  { label: "Inactive Groups", value: 3, sub: "Currently inactive", iconBg: "bg-red-50 dark:bg-red-950", iconColor: "text-red-500", icon: "lock" },
  { label: "Most Items Group", value: "Sparepart", sub: "Highest item count", iconBg: "bg-orange-50 dark:bg-orange-950", iconColor: "text-orange-500", icon: "crown" },
  { label: "Group Categories", value: 6, sub: "Distinct categories", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-slate-500", icon: "shield" },
];

export const itemGroups = [
  { id: 1, code: "GRP-ITM-001", name: "Raw Material", description: "Bahan baku untuk produksi", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 2, code: "GRP-ITM-002", name: "Finished Good", description: "Barang jadi siap jual", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 3, code: "GRP-ITM-003", name: "Sparepart", description: "Suku cadang dan komponen", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 4, code: "GRP-ITM-004", name: "Consumable", description: "Barang habis pakai", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 5, code: "GRP-ITM-005", name: "Asset", description: "Barang yang dikapitalisasi sebagai aset", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 6, code: "GRP-ITM-006", name: "Packaging", description: "Bahan kemasan", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 7, code: "GRP-ITM-007", name: "Service", description: "Item jasa/layanan", status: "Inactive", statusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" },
  { id: 8, code: "GRP-ITM-008", name: "WIP", description: "Barang dalam proses produksi", status: "Inactive", statusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" },
];

export default itemGroups;
