export const statCards = [
  { label: "Total Cost Centers", value: 24, sub: "All cost centers", iconBg: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-500", icon: "check" },
  { label: "Active", value: 20, sub: "Currently active", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500", icon: "online" },
  { label: "Inactive", value: 4, sub: "Currently inactive", iconBg: "bg-red-50 dark:bg-red-950", iconColor: "text-red-500", icon: "lock" },
  { label: "Departments", value: 8, sub: "Departments using cost center", iconBg: "bg-purple-50 dark:bg-purple-950", iconColor: "text-purple-500", icon: "shield" },
  { label: "Last Updated", value: "Today", sub: "Latest cost center data", iconBg: "bg-orange-50 dark:bg-orange-950", iconColor: "text-orange-500", icon: "crown" },
];

export const costCenters = [
  { id: 1, code: "CC-001", name: "Produksi Cold Storage", description: "Biaya operasional cold storage", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", updatedAt: "2026-06-25" },
  { id: 2, code: "CC-002", name: "Gudang Dry Storage", description: "Biaya operasional dry storage", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", updatedAt: "2026-06-24" },
  { id: 3, code: "CC-003", name: "Quality Control", description: "Biaya pengujian dan QC produk", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", updatedAt: "2026-06-24" },
  { id: 4, code: "CC-004", name: "Logistik Distribusi", description: "Biaya pengiriman dan distribusi", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", updatedAt: "2026-06-23" },
  { id: 5, code: "CC-005", name: "Pemeliharaan Mesin", description: "Biaya maintenance dan perbaikan mesin", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", updatedAt: "2026-06-22" },
  { id: 6, code: "CC-006", name: "IT & Sistem Informasi", description: "Biaya infrastruktur IT dan software", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", updatedAt: "2026-06-21" },
  { id: 7, code: "CC-007", name: "HR & Pengembangan SDM", description: "Biaya pelatihan dan pengembangan karyawan", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", updatedAt: "2026-06-20" },
  { id: 8, code: "CC-008", name: "Marketing & Promosi", description: "Biaya pemasaran dan promosi", status: "Inactive", statusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400", updatedAt: "2026-05-15" },
  { id: 9, code: "CC-009", name: "Administrasi & Umum", description: "Biaya administrasi kantor", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", updatedAt: "2026-06-19" },
  { id: 10, code: "CC-010", name: "Keamanan & Kebersihan", description: "Biaya keamanan dan kebersihan fasilitas", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", updatedAt: "2026-06-18" },
  { id: 11, code: "CC-011", name: "Penelitian & Pengembangan", description: "Biaya riset dan pengembangan produk baru", status: "Inactive", statusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400", updatedAt: "2026-04-10" },
  { id: 12, code: "CC-012", name: "Layanan Pelanggan", description: "Biaya customer service dan support", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", updatedAt: "2026-06-17" },
];

export default costCenters;
