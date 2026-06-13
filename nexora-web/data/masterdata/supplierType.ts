export const statCards = [
  {
    icon: "crown",
    label: "Total Supplier Types",
    value: "8",
    sub: "All types",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-700 dark:text-blue-400",
    description: "All types",
  },
  {
    icon: "check",
    label: "Active Types",
    value: "6",
    sub: "Currently active",
    iconBg: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-700 dark:text-green-400",
    description: "Currently active",
  },
  {
    icon: "pause",
    label: "Inactive Types",
    value: "2",
    sub: "Currently inactive",
    iconBg: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-700 dark:text-red-400",
    description: "Currently inactive",
  },
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
