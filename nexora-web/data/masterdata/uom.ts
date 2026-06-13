export const statCards = [
  { label: "Total UOM", value: 28, sub: "All units of measurement", iconBg: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-500", icon: "users" },
  { label: "Base UOM", value: 10, sub: "Base units", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500", icon: "check" },
  { label: "Active UOM", value: 26, sub: "Currently active", iconBg: "bg-teal-50 dark:bg-teal-950", iconColor: "text-teal-500", icon: "online" },
  { label: "Inactive UOM", value: 2, sub: "Currently inactive", iconBg: "bg-red-50 dark:bg-red-950", iconColor: "text-red-500", icon: "lock" },
  { label: "Conversion Rules", value: 18, sub: "Defined conversions", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-slate-500", icon: "shield" },
];

export const uoms = [
  { id: 1, code: "PCS", name: "Pcs (Pieces)", type: "Base Unit", base: "PCS", conversion: "1", description: "Satuan per unit / piece", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 2, code: "BOX", name: "Box", type: "Non-Base Unit", base: "PCS", conversion: "1 BOX = 10 PCS", description: "Satuan per box", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 3, code: "PACK", name: "Pack", type: "Non-Base Unit", base: "PCS", conversion: "1 PACK = 5 PCS", description: "Satuan per pack", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 4, code: "KG", name: "Kilogram", type: "Base Unit", base: "KG", conversion: "1", description: "Satuan berat kilogram", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 5, code: "GRAM", name: "Gram", type: "Non-Base Unit", base: "KG", conversion: "1 GRAM = 0.001 KG", description: "Satuan berat gram", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 6, code: "TON", name: "Ton", type: "Non-Base Unit", base: "KG", conversion: "1 TON = 1,000 KG", description: "Satuan berat ton", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 7, code: "L", name: "Liter", type: "Base Unit", base: "L", conversion: "1", description: "Satuan volume liter", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 8, code: "ML", name: "Milliliter", type: "Non-Base Unit", base: "L", conversion: "1 ML = 0.001 L", description: "Satuan volume milliliter", status: "Inactive", statusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" },
];

export default uoms;
