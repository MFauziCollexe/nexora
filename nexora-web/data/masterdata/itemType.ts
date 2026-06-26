export const statCards = [
  { label: "Total Types", value: 9, sub: "All item types", iconBg: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-500", icon: "users" },
  { label: "Active Types", value: 7, sub: "Currently active", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500", icon: "check" },
  { label: "Inactive Types", value: 2, sub: "Currently inactive", iconBg: "bg-red-50 dark:bg-red-950", iconColor: "text-red-500", icon: "lock" },
  { label: "Most Used Type", value: "Inventory", sub: "Highest item count", iconBg: "bg-orange-50 dark:bg-orange-950", iconColor: "text-orange-500", icon: "crown" },
  { label: "Type Categories", value: 3, sub: "Distinct types", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-slate-500", icon: "shield" },
];

export const itemTypes = [
  { id: 1, code: "TYPE-001", name: "Inventory", description: "Item yang dikelola stoknya", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 2, code: "TYPE-002", name: "Service", description: "Item jasa/layanan non-stok", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 3, code: "TYPE-003", name: "Non-Inventory", description: "Item yang tidak dikelola stoknya", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 4, code: "TYPE-004", name: "Consumable", description: "Barang habis pakai", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 5, code: "TYPE-005", name: "Asset", description: "Aset tetap perusahaan", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 6, code: "TYPE-006", name: "Raw Material", description: "Bahan baku produksi", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 7, code: "TYPE-007", name: "Finished Good", description: "Barang jadi siap jual", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 8, code: "TYPE-008", name: "WIP", description: "Barang dalam proses", status: "Inactive", statusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" },
  { id: 9, code: "TYPE-009", name: "Promotion", description: "Item untuk promosi/gratis", status: "Inactive", statusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" },
];

export default itemTypes;
