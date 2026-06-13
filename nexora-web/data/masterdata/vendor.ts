export const statCards = [
  { label: "Total Vendors", value: 156, sub: "All vendors", iconBg: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-500", icon: "user" },
  { label: "Active Vendors", value: 142, sub: "Currently active", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500", icon: "check" },
  { label: "Inactive Vendors", value: 14, sub: "Currently inactive", iconBg: "bg-red-50 dark:bg-red-950", iconColor: "text-red-500", icon: "lock" },
  { label: "Service Vendors", value: 95, sub: "Provide service", iconBg: "bg-purple-50 dark:bg-purple-950", iconColor: "text-purple-500", icon: "shield" },
  { label: "Product Vendors", value: 61, sub: "Supply goods/material", iconBg: "bg-orange-50 dark:bg-orange-950", iconColor: "text-orange-500", icon: "crown" },
];

export const vendorTypes = [
  "All Types",
  "Service Vendor",
  "Contractor",
  "Consultant",
  "Distributor",
  "Manufacturer",
  "Supplier",
];

export const cities = [
  "All Cities",
  "Surabaya",
  "Jakarta",
  "Sidoarjo",
  "Bandung",
  "Medan",
  "Makassar",
];

export const vendors = [
  { id: 1, code: "VEN-001", name: "PT ABC Refrigeration", type: "Service Vendor", typeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400", pic: "Budi Santoso", phone: "0812 3456 7890", email: "info@abc.com", city: "Surabaya", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 2, code: "VEN-002", name: "PT Teknik Nusantara", type: "Contractor", typeColor: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400", pic: "Andi Wijaya", phone: "0813 5678 1234", email: "admin@teknik.co.id", city: "Jakarta", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 3, code: "VEN-003", name: "PT Kalibrasi Indonesia", type: "Service Vendor", typeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400", pic: "Dewi Lestari", phone: "0815 6789 2345", email: "cs@kalibrasi.id", city: "Sidoarjo", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 4, code: "VEN-004", name: "PT ERP Solusi Digital", type: "Consultant", typeColor: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400", pic: "Rudi Hermawan", phone: "0817 8901 4567", email: "support@erp.id", city: "Bandung", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 5, code: "VEN-005", name: "PT Pest Control Jaya", type: "Service Vendor", typeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400", pic: "Lina Marlina", phone: "0818 9012 3456", email: "admin@pcjaya.com", city: "Surabaya", status: "Inactive", statusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" },
  { id: 6, code: "VEN-006", name: "PT Mitra Distributor", type: "Distributor", typeColor: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-400", pic: "Siti Nurhaliza", phone: "0819 1234 5678", email: "sales@mitra.co.id", city: "Jakarta", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 7, code: "VEN-007", name: "CV Anugrah Mandiri", type: "Supplier", typeColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400", pic: "Ahmad Suryanto", phone: "0821 3456 7890", email: "info@anugrah.id", city: "Medan", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 8, code: "VEN-008", name: "PT Solusi Manufaktur", type: "Manufacturer", typeColor: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-400", pic: "Yolanda Susanti", phone: "0822 4567 8901", email: "contact@solusi-mfg.com", city: "Makassar", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
];

export default vendors;
