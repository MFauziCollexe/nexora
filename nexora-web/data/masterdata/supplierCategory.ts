export const statCards = [
  {
    icon: "crown",
    label: "Total Supplier Categories",
    value: "7",
    sub: "All categories",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-700 dark:text-blue-400",
    description: "All categories",
  },
  {
    icon: "check",
    label: "Active Categories",
    value: "5",
    sub: "Currently active",
    iconBg: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-700 dark:text-green-400",
    description: "Currently active",
  },
  {
    icon: "pause",
    label: "Inactive Categories",
    value: "2",
    sub: "Currently inactive",
    iconBg: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-700 dark:text-red-400",
    description: "Currently inactive",
  },
];

export const supplierCategories = [
  { id: 1, code: "SC-001", name: "Electronics", description: "Komponen dan perangkat elektronik", status: "Active", statusColor: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" },
  { id: 2, code: "SC-002", name: "Raw Materials", description: "Bahan baku produksi", status: "Active", statusColor: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" },
  { id: 3, code: "SC-003", name: "Packaging", description: "Bahan kemasan", status: "Active", statusColor: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" },
  { id: 4, code: "SC-004", name: "Consumables", description: "Barang habis pakai", status: "Inactive", statusColor: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" },
];
