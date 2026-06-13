export const statCards = [
  { label: "Total Warehouses", value: 12, sub: "All warehouses", iconBg: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-500", icon: "users" },
  { label: "Active Warehouses", value: 10, sub: "Currently active", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500", icon: "check" },
  { label: "Inactive Warehouses", value: 2, sub: "Currently inactive", iconBg: "bg-yellow-50 dark:bg-yellow-950", iconColor: "text-yellow-500", icon: "pause" },
  { label: "Total Locations", value: 35, sub: "Warehouse locations", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-slate-500", icon: "shield" },
  { label: "Linked Managers", value: 8, sub: "Assigned managers", iconBg: "bg-purple-50 dark:bg-purple-950", iconColor: "text-purple-500", icon: "crown" },
];

export const warehouses = [
  { id: 1, code: "WH-001", name: "Gudang Cold Storage A", description: "Gudang penyimpanan cold storage A", location: "Jakarta - Tanjung Priok", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 2, code: "WH-002", name: "Gudang Cold Storage B", description: "Gudang penyimpanan cold storage B", location: "Jakarta - Marunda", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 3, code: "WH-003", name: "Gudang Dry Storage", description: "Gudang penyimpanan non cold storage", location: "Jakarta - Cakung", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 4, code: "WH-004", name: "Gudang Bahan Baku", description: "Gudang penyimpanan bahan baku", location: "Bekasi - Cikarang", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 5, code: "WH-005", name: "Gudang Finished Goods", description: "Gudang penyimpanan barang jadi", location: "Tangerang - Balaraja", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 6, code: "WH-006", name: "Gudang Sparepart", description: "Gudang penyimpanan sparepart & tools", location: "Karawang - Klari", status: "Inactive", statusColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400" },
  { id: 7, code: "WH-007", name: "Transit Warehouse", description: "Gudang transit / sementara", location: "Jakarta - Soekarno Hatta", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 8, code: "WH-008", name: "Gudang Cabang Surabaya", description: "Gudang cabang Surabaya", location: "Surabaya - Waru", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
];

export default warehouses;
