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

export const itemGroups = [
  "All Group",
  "Raw Material",
  "Finished Good",
  "Sparepart",
  "Consumable",
  "Asset",
];

export const itemTypes = [
  "All Type",
  "Inventory",
  "Service",
  "Non-Inventory",
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

export const items = [
  { id: 1, image: "AC", code: "ITM-0001", barcode: "8991234567890", name: "Freon R404A", description: "Refrigerant gas untuk mesin pendingin", category: "AC & Pendingin", brand: "Panasonic", itemGroup: "Raw Material", itemType: "Inventory", uom: "KG", unitPrice: 150000, costPrice: 145000, minStock: 10, maxStock: 100, reorderPoint: 20, status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 2, image: "OL", code: "ITM-0002", barcode: "8991234567891", name: "Oli Compressor", description: "Oli pelumas untuk kompresor", category: "AC & Pendingin", brand: "-", itemGroup: "Consumable", itemType: "Inventory", uom: "Liter", unitPrice: 45000, costPrice: 43000, minStock: 5, maxStock: 50, reorderPoint: 10, status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 3, image: "BR", code: "ITM-0003", barcode: "8991234567892", name: "Bearing 6205", description: "Bearing untuk motor listrik", category: "Peralatan Listrik", brand: "-", itemGroup: "Sparepart", itemType: "Inventory", uom: "PCS", unitPrice: 28000, costPrice: 26500, minStock: 20, maxStock: 200, reorderPoint: 50, status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 4, image: "FK", code: "ITM-0004", barcode: "8991234567893", name: "Kabel NYY 2.5 mm", description: "Kabel listrik NYY 2.5 mm per meter", category: "Peralatan Listrik", brand: "-", itemGroup: "Raw Material", itemType: "Inventory", uom: "Meter", unitPrice: 12500, costPrice: 11800, minStock: 50, maxStock: 500, reorderPoint: 100, status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 5, image: "LP", code: "ITM-0005", barcode: "8991234567894", name: "Lampu LED 18W", description: "Lampu LED 18 watt Philips", category: "Peralatan Listrik", brand: "Philips", itemGroup: "Finished Good", itemType: "Inventory", uom: "PCS", unitPrice: 25000, costPrice: 23500, minStock: 15, maxStock: 150, reorderPoint: 30, status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 6, image: "SF", code: "ITM-0006", barcode: "8991234567895", name: "Stretch Film", description: "Plastic stretch film untuk packaging", category: "Peralatan Gudang", brand: "-", itemGroup: "Consumable", itemType: "Inventory", uom: "ROLL", unitPrice: 85000, costPrice: 80000, minStock: 20, maxStock: 200, reorderPoint: 40, status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 7, image: "KB", code: "ITM-0007", barcode: null, name: "Kardus Box 60x40x40", description: "Kardus box ukuran 60x40x40 cm", category: "Peralatan Gudang", brand: "-", itemGroup: "Finished Good", itemType: "Inventory", uom: "PCS", unitPrice: 5500, costPrice: 5000, minStock: 50, maxStock: 500, reorderPoint: 100, status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 8, image: "SG", code: "ITM-0008", barcode: null, name: "Sarung Tangan Safety", description: "Sarung tangan safety untuk pekerja gudang", category: "Peralatan Gudang", brand: "-", itemGroup: "Consumable", itemType: "Inventory", uom: "PCS", unitPrice: 18000, costPrice: 17000, minStock: 10, maxStock: 100, reorderPoint: 25, status: "Inactive", statusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" },
];

export default items;
