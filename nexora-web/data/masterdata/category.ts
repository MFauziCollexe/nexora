export const statCards = [
  { label: "Total Categories", value: 56, sub: "All categories", iconBg: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-500", icon: "users" },
  { label: "Active Categories", value: 49, sub: "Currently active", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500", icon: "check" },
  { label: "Inactive Categories", value: 7, sub: "Currently inactive", iconBg: "bg-red-50 dark:bg-red-950", iconColor: "text-red-500", icon: "lock" },
  { label: "With Items", value: 45, sub: "Categories have items", iconBg: "bg-orange-50 dark:bg-orange-950", iconColor: "text-orange-500", icon: "crown" },
  { label: "Category Groups", value: 8, sub: "Assigned groups", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-slate-500", icon: "shield" },
];

export const categories = [
  { id: 1, code: "CAT-001", name: "Elektronik", description: "Semua jenis barang elektronik", parent: "-", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 2, code: "CAT-002", name: "Komputer & Laptop", description: "Perangkat komputer dan laptop", parent: "Elektronik", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 3, code: "CAT-003", name: "Handphone & Tablet", description: "Handphone dan tablet berbagai merek", parent: "Elektronik", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 4, code: "CAT-004", name: "AC & Pendingin", description: "AC, kipas angin, dan peralatan pendingin", parent: "Elektronik", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 5, code: "CAT-005", name: "Peralatan Rumah Tangga", description: "Peralatan rumah tangga", parent: "-", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 6, code: "CAT-006", name: "Kulkas", description: "Kulkas 1 pintu, 2 pintu, dan lainnya", parent: "Peralatan Rumah Tangga", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 7, code: "CAT-007", name: "Mesin Cuci", description: "Mesin cuci berbagai tipe", parent: "Peralatan Rumah Tangga", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 8, code: "CAT-008", name: "Furniture", description: "Meja, kursi, lemari, dan furniture lainnya", parent: "-", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
];

export default categories;
