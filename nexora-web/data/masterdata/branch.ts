export const statCards = [
  { label: "Total Branches", value: 8, sub: "All company branches", iconBg: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-500", icon: "check" },
  { label: "Active", value: 7, sub: "Currently active", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500", icon: "online" },
  { label: "Inactive", value: 1, sub: "Currently inactive", iconBg: "bg-red-50 dark:bg-red-950", iconColor: "text-red-500", icon: "lock" },
  { label: "Head Offices", value: 1, sub: "Head office branches", iconBg: "bg-purple-50 dark:bg-purple-950", iconColor: "text-purple-500", icon: "shield" },
  { label: "Last Updated", value: "Today", sub: "Latest branch data", iconBg: "bg-orange-50 dark:bg-orange-950", iconColor: "text-orange-500", icon: "crown" },
];

export const branches = [
  { id: 1, code: "BR-001", name: "Kantor Pusat Jakarta", address: "Jl. Sudirman No. 123", city: "Jakarta Pusat", phone: "021-12345678", email: "ho@nexora.co.id", isHeadOffice: true, status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", updatedAt: "2026-06-26" },
  { id: 2, code: "BR-002", name: "Cabang Surabaya", address: "Jl. Tunjungan No. 45", city: "Surabaya", phone: "031-9876543", email: "surabaya@nexora.co.id", isHeadOffice: false, status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", updatedAt: "2026-06-25" },
  { id: 3, code: "BR-003", name: "Cabang Bandung", address: "Jl. Asia Afrika No. 78", city: "Bandung", phone: "022-4567890", email: "bandung@nexora.co.id", isHeadOffice: false, status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", updatedAt: "2026-06-24" },
  { id: 4, code: "BR-004", name: "Cabang Medan", address: "Jl. Balai Kota No. 12", city: "Medan", phone: "061-2345678", email: "medan@nexora.co.id", isHeadOffice: false, status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", updatedAt: "2026-06-23" },
  { id: 5, code: "BR-005", name: "Cabang Makassar", address: "Jl. Somba Opu No. 34", city: "Makassar", phone: "0411-876543", email: "makassar@nexora.co.id", isHeadOffice: false, status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", updatedAt: "2026-06-22" },
  { id: 6, code: "BR-006", name: "Cabang Denpasar", address: "Jl. Sunset Road No. 56", city: "Denpasar", phone: "0361-345678", email: "bali@nexora.co.id", isHeadOffice: false, status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", updatedAt: "2026-06-21" },
  { id: 7, code: "BR-007", name: "Cabang Balikpapan", address: "Jl. Jenderal Sudirman No. 89", city: "Balikpapan", phone: "0542-567890", email: "balikpapan@nexora.co.id", isHeadOffice: false, status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", updatedAt: "2026-06-20" },
  { id: 8, code: "BR-008", name: "Cabang Manado", address: "Jl. Sam Ratulangi No. 67", city: "Manado", phone: "0431-234567", email: "manado@nexora.co.id", isHeadOffice: false, status: "Inactive", statusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400", updatedAt: "2026-05-15" },
];

export default branches;
