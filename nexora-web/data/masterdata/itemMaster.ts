export const statCards = [
  { label: "Total Items", value: 1248, sub: "All items", iconBg: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-500", icon: "users" },
  { label: "Active Items", value: 1086, sub: "Currently active", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500", icon: "check" },
  { label: "Low Stock Items", value: 78, sub: "Below minimum stock", iconBg: "bg-red-50 dark:bg-red-950", iconColor: "text-red-500", icon: "lock" },
  { label: "Out of Stock Items", value: 12, sub: "Stock is empty", iconBg: "bg-purple-50 dark:bg-purple-950", iconColor: "text-purple-500", icon: "crown" },
  { label: "Expiring Soon Items", value: 34, sub: "Within 30 days", iconBg: "bg-orange-50 dark:bg-orange-950", iconColor: "text-orange-500", icon: "shield" },
];

export const categories = [
  "All Category",
  "AC & Pendingin",
  "Komputer & Laptop",
  "Peralatan Listrik",
  "Kendaraan Operasional",
  "Peralatan Gudang",
];

export const brands = [
  "All Brand",
  "Panasonic",
  "Dell",
  "Makita",
  "Toyota",
  "Philips",
];

export const uoms = [
  "All UOM",
  "PCS (Pieces)",
  "UNIT (Unit)",
  "ROLL (Roll)",
  "KG",
  "Liter",
  "Meter",
];

export const warehouses = [
  "All Warehouse",
  "Gudang Cold Storage A",
  "Gudang Sparepart",
  "Gudang Elektrikal",
  "Gudang APD",
];

export const items = [
  { id: 1, image: "AC", code: "ITM-0001", name: "Freon R404A", category: "Refrigeration Material", brand: "Panasonic", uom: "KG", warehouse: "Gudang Cold Storage A", currentStock: 50, minStock: 10, lastPurchasePrice: "Rp 150.000", avgCost: "Rp 145.000", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 2, image: "OL", code: "ITM-0002", name: "Oli Compressor", category: "Lubricant", brand: "-", uom: "Liter", warehouse: "Gudang Sparepart", currentStock: 25, minStock: 5, lastPurchasePrice: "Rp 45.000", avgCost: "Rp 43.000", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 3, image: "BR", code: "ITM-0003", name: "Bearing 6205", category: "Sparepart", brand: "-", uom: "Pcs", warehouse: "Gudang Sparepart", currentStock: 120, minStock: 20, lastPurchasePrice: "Rp 28.000", avgCost: "Rp 26.500", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 4, image: "FK", code: "ITM-0004", name: "Kabel NYY 2.5 mm", category: "Elektrikal", brand: "-", uom: "Meter", warehouse: "Gudang Elektrikal", currentStock: 200, minStock: 50, lastPurchasePrice: "Rp 12.500", avgCost: "Rp 11.800", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 5, image: "LP", code: "ITM-0005", name: "Lampu LED 18W", category: "Elektrikal", brand: "Philips", uom: "Pcs", warehouse: "Gudang Elektrikal", currentStock: 75, minStock: 15, lastPurchasePrice: "Rp 25.000", avgCost: "Rp 23.500", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 6, image: "SF", code: "ITM-0006", name: "Stretch Film", category: "Packaging", brand: "-", uom: "Roll", warehouse: "Gudang Cold Storage A", currentStock: 150, minStock: 20, lastPurchasePrice: "Rp 85.000", avgCost: "Rp 80.000", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 7, image: "KB", code: "ITM-0007", name: "Kardus Box 60x40x40", category: "Packaging", brand: "-", uom: "Pcs", warehouse: "Gudang Cold Storage A", currentStock: 300, minStock: 50, lastPurchasePrice: "Rp 5.500", avgCost: "Rp 5.000", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 8, image: "SG", code: "ITM-0008", name: "Sarung Tangan Safety", category: "Safety & APD", brand: "-", uom: "Pcs", warehouse: "Gudang APD", currentStock: 60, minStock: 10, lastPurchasePrice: "Rp 18.000", avgCost: "Rp 17.000", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
];

export default items;
