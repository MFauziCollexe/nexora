export const statCards = [
  { icon: "🏷️", label: "Total Supplier Types", value: "8", description: "All types" },
  { icon: "✅", label: "Active Types", value: "6", description: "Currently active" },
  { icon: "❌", label: "Inactive Types", value: "2", description: "Currently inactive" },
];

export const supplierTypes = [
  {
    id: 1,
    code: "ST-001",
    name: "Local Supplier",
    description: "Supplier lokal untuk kebutuhan sehari-hari",
    status: "Active",
    statusColor: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  },
  {
    id: 2,
    code: "ST-002",
    name: "Import Supplier",
    description: "Supplier yang memasok barang impor",
    status: "Active",
    statusColor: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  },
  {
    id: 3,
    code: "ST-003",
    name: "Raw Material Supplier",
    description: "Supplier bahan baku produksi",
    status: "Active",
    statusColor: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  },
  {
    id: 4,
    code: "ST-004",
    name: "Packaging Supplier",
    description: "Supplier untuk kebutuhan kemasan",
    status: "Inactive",
    statusColor: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
  },
];
