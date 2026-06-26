export const statCards = [
  { label: "Total Batches", value: 36, sub: "All batch/lot records", iconBg: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-500", icon: "users" },
  { label: "Active Batches", value: 28, sub: "Currently active", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500", icon: "check" },
  { label: "Expired Batches", value: 3, sub: "Past expiry date", iconBg: "bg-red-50 dark:bg-red-950", iconColor: "text-red-500", icon: "lock" },
  { label: "Expiring Soon", value: 5, sub: "Within 30 days", iconBg: "bg-orange-50 dark:bg-orange-950", iconColor: "text-orange-500", icon: "shield" },
  { label: "Total Quantity", value: "12.450", sub: "All batch quantities", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-slate-500", icon: "crown" },
];

export const itemNames = [
  "All Item",
  "Freon R404A",
  "Oli Compressor",
  "Bearing 6205",
  "Kabel NYY 2.5 mm",
  "Lampu LED 18W",
  "Stretch Film",
  "Sarung Tangan Safety",
];

export const batchLots = [
  { id: 1, batchNumber: "BATCH-2024-001", item: "Freon R404A", quantity: 50, manufactureDate: "2024-01-15", expiryDate: "2026-01-15", supplier: "PT Indo Refrigerant", notes: "Batch pertama Freon R404A", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 2, batchNumber: "BATCH-2024-002", item: "Oli Compressor", quantity: 25, manufactureDate: "2024-02-01", expiryDate: "2025-08-01", supplier: "PT Multi Karya Elektrik", notes: "-", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 3, batchNumber: "BATCH-2024-003", item: "Bearing 6205", quantity: 120, manufactureDate: "2024-03-10", expiryDate: null, supplier: "PT Global Parts Nusantara", notes: "-", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 4, batchNumber: "BATCH-2024-004", item: "Kabel NYY 2.5 mm", quantity: 200, manufactureDate: "2024-04-20", expiryDate: null, supplier: "PT Multi Karya Elektrik", notes: "Kabel per meter", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 5, batchNumber: "BATCH-2024-005", item: "Lampu LED 18W", quantity: 75, manufactureDate: "2024-05-01", expiryDate: "2028-05-01", supplier: "PT Sinar Abadi", notes: "-", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 6, batchNumber: "BATCH-2023-001", item: "Freon R404A", quantity: 30, manufactureDate: "2023-06-15", expiryDate: "2025-06-15", supplier: "PT Indo Refrigerant", notes: "Sisa batch lama", status: "Expiring Soon", statusColor: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400" },
  { id: 7, batchNumber: "BATCH-2022-001", item: "Oli Compressor", quantity: 5, manufactureDate: "2022-01-10", expiryDate: "2024-01-10", supplier: "PT Multi Karya Elektrik", notes: "Batch expired", status: "Expired", statusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" },
  { id: 8, batchNumber: "BATCH-2024-006", item: "Sarung Tangan Safety", quantity: 60, manufactureDate: "2024-07-01", expiryDate: null, supplier: "PT Safety Utama", notes: "Batch baru", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
];

export default batchLots;
