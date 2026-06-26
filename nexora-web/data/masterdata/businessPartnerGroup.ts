export const statCards = [
  {
    icon: "crown",
    label: "Total Groups",
    value: "6",
    sub: "All groups",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-700 dark:text-blue-400",
    description: "All groups",
  },
  {
    icon: "check",
    label: "Active Groups",
    value: "4",
    sub: "Currently active",
    iconBg: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-700 dark:text-green-400",
    description: "Currently active",
  },
  {
    icon: "pause",
    label: "Inactive Groups",
    value: "2",
    sub: "Currently inactive",
    iconBg: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-700 dark:text-red-400",
    description: "Currently inactive",
  },
];

export const businessPartnerGroups = [
  { id: 1, code: "GRP-001", name: "Retail Customer", type: "Customer", description: "Grup untuk pelanggan retail", status: "Active", statusColor: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" },
  { id: 2, code: "GRP-002", name: "Corporate Customer", type: "Customer", description: "Grup untuk pelanggan korporasi", status: "Active", statusColor: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" },
  { id: 3, code: "GRP-003", name: "Local Supplier Group", type: "Supplier", description: "Grup untuk supplier lokal", status: "Active", statusColor: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" },
  { id: 4, code: "GRP-004", name: "Import Supplier Group", type: "Supplier", description: "Grup untuk supplier impor", status: "Active", statusColor: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" },
  { id: 5, code: "GRP-005", name: "Premium Partner", type: "Both", description: "Grup untuk mitra premium yang merupakan customer dan supplier", status: "Inactive", statusColor: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" },
  { id: 6, code: "GRP-006", name: "Government Institution", type: "Both", description: "Grup untuk instansi pemerintahan", status: "Inactive", statusColor: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" },
];

export const groupTypes = [
  "All Types",
  "Customer",
  "Supplier",
  "Both",
];
