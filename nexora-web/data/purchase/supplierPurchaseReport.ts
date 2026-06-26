export const statCards = [
  { label: "Total Suppliers", value: 34, sub: "Active suppliers YTD", icon: "users", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "Total Purchases", value: "Rp 8,2 M", sub: "Year to date", icon: "dollar-sign", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-emerald-500" },
  { label: "Total PO Issued", value: 189, sub: "Across all suppliers", icon: "shopping-cart", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-indigo-500" },
  { label: "Avg per Supplier", value: "Rp 241 Jt", sub: "Average purchase value", icon: "bar-chart", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
];

export type SupplierPurchaseItem = {
  id: number;
  supplier: string;
  city: string;
  totalPo: number;
  totalValue: string;
  totalGr: number;
  totalInvoices: number;
  paidAmount: string;
  outstanding: string;
  lastTransaction: string;
  performance: "Excellent" | "Good" | "Fair" | "Poor";
};

export const supplierPurchases: SupplierPurchaseItem[] = [
  { id: 1, supplier: "PT Komputer Jaya", city: "Jakarta", totalPo: 24, totalValue: "Rp 1.800.000.000", totalGr: 22, totalInvoices: 18, paidAmount: "Rp 1.200.000.000", outstanding: "Rp 96.000.000", lastTransaction: "26/06/2026", performance: "Excellent" },
  { id: 2, supplier: "PT Kimia Farma", city: "Bandung", totalPo: 18, totalValue: "Rp 1.200.000.000", totalGr: 17, totalInvoices: 14, paidAmount: "Rp 850.000.000", outstanding: "Rp 45.600.000", lastTransaction: "25/06/2026", performance: "Excellent" },
  { id: 3, supplier: "PT Indopack", city: "Surabaya", totalPo: 15, totalValue: "Rp 980.000.000", totalGr: 14, totalInvoices: 12, paidAmount: "Rp 750.000.000", outstanding: "Rp 10.000.000", lastTransaction: "23/06/2026", performance: "Good" },
  { id: 4, supplier: "PT Safety First", city: "Jakarta", totalPo: 12, totalValue: "Rp 750.000.000", totalGr: 11, totalInvoices: 10, paidAmount: "Rp 600.000.000", outstanding: "Rp 18.000.000", lastTransaction: "24/06/2026", performance: "Good" },
  { id: 5, supplier: "PT Bersih Sejahtera", city: "Tangerang", totalPo: 10, totalValue: "Rp 620.000.000", totalGr: 10, totalInvoices: 8, paidAmount: "Rp 500.000.000", outstanding: "Rp 6.250.000", lastTransaction: "26/06/2026", performance: "Good" },
  { id: 6, supplier: "PT Data Center Indo", city: "Jakarta", totalPo: 8, totalValue: "Rp 480.000.000", totalGr: 8, totalInvoices: 6, paidAmount: "Rp 300.000.000", outstanding: "Rp 24.000.000", lastTransaction: "21/06/2026", performance: "Excellent" },
  { id: 7, supplier: "PT Chemindo", city: "Cilegon", totalPo: 7, totalValue: "Rp 420.000.000", totalGr: 6, totalInvoices: 5, paidAmount: "Rp 200.000.000", outstanding: "Rp 32.000.000", lastTransaction: "22/06/2026", performance: "Fair" },
  { id: 8, supplier: "PT Bengkel Sentral", city: "Bekasi", totalPo: 6, totalValue: "Rp 380.000.000", totalGr: 6, totalInvoices: 5, paidAmount: "Rp 280.000.000", outstanding: "Rp 3.600.000", lastTransaction: "23/06/2026", performance: "Good" },
  { id: 9, supplier: "PT Teknik Utama", city: "Bandung", totalPo: 5, totalValue: "Rp 320.000.000", totalGr: 5, totalInvoices: 4, paidAmount: "Rp 200.000.000", outstanding: "Rp 19.000.000", lastTransaction: "25/06/2026", performance: "Fair" },
  { id: 10, supplier: "PT Logistik Nusantara", city: "Jakarta", totalPo: 6, totalValue: "Rp 310.000.000", totalGr: 5, totalInvoices: 4, paidAmount: "Rp 180.000.000", outstanding: "Rp 7.200.000", lastTransaction: "24/06/2026", performance: "Good" },
  { id: 11, supplier: "PT Kreatif Media", city: "Jakarta", totalPo: 4, totalValue: "Rp 250.000.000", totalGr: 4, totalInvoices: 3, paidAmount: "Rp 200.000.000", outstanding: "Rp 5.000.000", lastTransaction: "22/06/2026", performance: "Excellent" },
  { id: 12, supplier: "PT ATK Makmur", city: "Surabaya", totalPo: 3, totalValue: "Rp 180.000.000", totalGr: 3, totalInvoices: 2, paidAmount: "Rp 120.000.000", outstanding: "Rp 1.800.000", lastTransaction: "21/06/2026", performance: "Good" },
];

export default supplierPurchases;
