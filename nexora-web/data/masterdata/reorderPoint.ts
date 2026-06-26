export const statCards = [
  { label: "Total Items", value: 1248, sub: "All items", iconBg: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-500", icon: "users" },
  { label: "Need Reorder", value: 23, sub: "Below reorder point", iconBg: "bg-red-50 dark:bg-red-950", iconColor: "text-red-500", icon: "lock" },
  { label: "Low Stock", value: 78, sub: "Below minimum stock", iconBg: "bg-orange-50 dark:bg-orange-950", iconColor: "text-orange-500", icon: "shield" },
  { label: "Adequate Stock", value: 956, sub: "Sufficient stock level", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500", icon: "check" },
  { label: "Overstock", value: 191, sub: "Above maximum stock", iconBg: "bg-purple-50 dark:bg-purple-950", iconColor: "text-purple-500", icon: "crown" },
];

export const categories = [
  "All Category",
  "AC & Pendingin",
  "Komputer & Laptop",
  "Peralatan Listrik",
  "Kendaraan Operasional",
  "Peralatan Gudang",
];

export const reorderPoints = [
  { id: 1, image: "AC", code: "ITM-0001", name: "Freon R404A", category: "AC & Pendingin", currentStock: 50, minStock: 10, maxStock: 100, reorderPoint: 20, stockStatus: "Adequate", stockStatusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 2, image: "OL", code: "ITM-0002", name: "Oli Compressor", category: "AC & Pendingin", currentStock: 25, minStock: 5, maxStock: 50, reorderPoint: 10, stockStatus: "Adequate", stockStatusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 3, image: "BR", code: "ITM-0003", name: "Bearing 6205", category: "Peralatan Listrik", currentStock: 120, minStock: 20, maxStock: 200, reorderPoint: 50, stockStatus: "Overstock", stockStatusColor: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400" },
  { id: 4, image: "FK", code: "ITM-0004", name: "Kabel NYY 2.5 mm", category: "Peralatan Listrik", currentStock: 200, minStock: 50, maxStock: 500, reorderPoint: 100, stockStatus: "Adequate", stockStatusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 5, image: "LP", code: "ITM-0005", name: "Lampu LED 18W", category: "Peralatan Listrik", currentStock: 15, minStock: 15, maxStock: 150, reorderPoint: 30, stockStatus: "Need Reorder", stockStatusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" },
  { id: 6, image: "SF", code: "ITM-0006", name: "Stretch Film", category: "Peralatan Gudang", currentStock: 150, minStock: 20, maxStock: 200, reorderPoint: 40, stockStatus: "Adequate", stockStatusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 7, image: "KB", code: "ITM-0007", name: "Kardus Box 60x40x40", category: "Peralatan Gudang", currentStock: 55, minStock: 50, maxStock: 500, reorderPoint: 100, stockStatus: "Need Reorder", stockStatusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" },
  { id: 8, image: "SG", code: "ITM-0008", name: "Sarung Tangan Safety", category: "Peralatan Gudang", currentStock: 8, minStock: 10, maxStock: 100, reorderPoint: 25, stockStatus: "Low Stock", stockStatusColor: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400" },
];

export default reorderPoints;
