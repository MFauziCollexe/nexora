export const statCards = [
  { label: "Total Serial Numbers", value: 156, sub: "All serial numbers", iconBg: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-500", icon: "users" },
  { label: "Available", value: 98, sub: "Ready to use", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500", icon: "check" },
  { label: "In Use/Sold", value: 45, sub: "Currently used/sold", iconBg: "bg-purple-50 dark:bg-purple-950", iconColor: "text-purple-500", icon: "shield" },
  { label: "Scrap/Returned", value: 13, sub: "Scrap or returned", iconBg: "bg-red-50 dark:bg-red-950", iconColor: "text-red-500", icon: "lock" },
  { label: "In Repair", value: 7, sub: "Under maintenance", iconBg: "bg-orange-50 dark:bg-orange-950", iconColor: "text-orange-500", icon: "crown" },
];

export const itemNames = [
  "All Item",
  "Freon R404A",
  "Oli Compressor",
  "Bearing 6205",
  "Kabel NYY 2.5 mm",
  "Lampu LED 18W",
];

export const statuses = [
  "All Status",
  "Available",
  "Sold",
  "Used",
  "Scrap",
  "In Repair",
  "Returned",
];

export const serialNumbers = [
  { id: 1, serialNumber: "SN-FR-2024-0001", item: "Freon R404A", batchLot: "BATCH-2024-001", status: "Available", warehouse: "Gudang Cold Storage A", purchaseDate: "2024-01-20", warrantyExpiry: "2026-01-20", notes: "-", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 2, serialNumber: "SN-FR-2024-0002", item: "Freon R404A", batchLot: "BATCH-2024-001", status: "Sold", warehouse: "-", purchaseDate: "2024-01-20", warrantyExpiry: "2026-01-20", notes: "Sold to PT ABC", statusColor: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400" },
  { id: 3, serialNumber: "SN-OC-2024-0001", item: "Oli Compressor", batchLot: "BATCH-2024-002", status: "Available", warehouse: "Gudang Cold Storage A", purchaseDate: "2024-02-05", warrantyExpiry: "2025-08-05", notes: "-", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 4, serialNumber: "SN-BR-2024-0001", item: "Bearing 6205", batchLot: "BATCH-2024-003", status: "Used", warehouse: "Gudang Sparepart", purchaseDate: "2024-03-15", warrantyExpiry: null, notes: "Used in production machine #3", statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400" },
  { id: 5, serialNumber: "SN-BR-2024-0002", item: "Bearing 6205", batchLot: "BATCH-2024-003", status: "Available", warehouse: "Gudang Sparepart", purchaseDate: "2024-03-15", warrantyExpiry: null, notes: "-", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 6, serialNumber: "SN-LP-2024-0001", item: "Lampu LED 18W", batchLot: "BATCH-2024-005", status: "Available", warehouse: "Gudang Dry Storage", purchaseDate: "2024-05-05", warrantyExpiry: "2028-05-05", notes: "-", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 7, serialNumber: "SN-FR-2023-0001", item: "Freon R404A", batchLot: "BATCH-2023-001", status: "In Repair", warehouse: "Workshop", purchaseDate: "2023-07-01", warrantyExpiry: "2025-07-01", notes: "Leaking, sent to repair", statusColor: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400" },
  { id: 8, serialNumber: "SN-FR-2022-0001", item: "Freon R404A", batchLot: "BATCH-2022-001", status: "Scrap", warehouse: "-", purchaseDate: "2022-02-01", warrantyExpiry: "2024-02-01", notes: "Expired and scrapped", statusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" },
];

export default serialNumbers;
