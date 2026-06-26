export const statCards = [
  { label: "Total Customers", value: 12, sub: "Active customers with sales", icon: "users", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "Total Sales", value: "Rp 1.2 M", sub: "All time sales", icon: "dollar-sign", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-emerald-500" },
  { label: "Total Invoices", value: 156, sub: "All invoices", icon: "file-text", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-slate-500" },
  { label: "Avg per Customer", value: "Rp 102 M", sub: "Average sales per customer", icon: "bar-chart", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-indigo-500" },
  { label: "Top Customer", value: "PT Maju Bersama", sub: "Highest sales volume", icon: "crown", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
];

export type CustomerSalesItem = {
  id: number;
  customer: string;
  totalInvoices: number;
  totalAmount: number;
  totalPaid: number;
  lastInvoice: string;
  status: "Active" | "Inactive" | "New";
};

export const customerSalesReports: CustomerSalesItem[] = [
  { id: 1, customer: "PT Maju Bersama", totalInvoices: 24, totalAmount: 385000000, totalPaid: 320000000, lastInvoice: "16/06/2026", status: "Active" },
  { id: 2, customer: "CV Sumber Abadi", totalInvoices: 44, totalAmount: 650000000, totalPaid: 480000000, lastInvoice: "15/06/2026", status: "Active" },
  { id: 3, customer: "PT Global Sejahtera", totalInvoices: 64, totalAmount: 980000000, totalPaid: 720000000, lastInvoice: "14/06/2026", status: "Active" },
  { id: 4, customer: "PT Sukses Mandiri", totalInvoices: 16, totalAmount: 210000000, totalPaid: 150000000, lastInvoice: "13/06/2026", status: "Active" },
  { id: 5, customer: "UD Karya Utama", totalInvoices: 10, totalAmount: 130000000, totalPaid: 130000000, lastInvoice: "12/06/2026", status: "Active" },
  { id: 6, customer: "PT Indo Makmur", totalInvoices: 30, totalAmount: 520000000, totalPaid: 400000000, lastInvoice: "11/06/2026", status: "Active" },
  { id: 7, customer: "CV Berkah Abadi", totalInvoices: 14, totalAmount: 175000000, totalPaid: 120000000, lastInvoice: "10/06/2026", status: "Inactive" },
  { id: 8, customer: "PT Sehat Selalu", totalInvoices: 8, totalAmount: 95000000, totalPaid: 95000000, lastInvoice: "09/06/2026", status: "Active" },
  { id: 9, customer: "PT Prima Niaga", totalInvoices: 20, totalAmount: 310000000, totalPaid: 290000000, lastInvoice: "08/06/2026", status: "Active" },
  { id: 10, customer: "PT Cahaya Abadi", totalInvoices: 28, totalAmount: 440000000, totalPaid: 380000000, lastInvoice: "07/06/2026", status: "Active" },
  { id: 11, customer: "CV Sumber Rejeki", totalInvoices: 5, totalAmount: 52000000, totalPaid: 0, lastInvoice: "01/05/2026", status: "Inactive" },
  { id: 12, customer: "PT Bumi Persada", totalInvoices: 3, totalAmount: 78000000, totalPaid: 78000000, lastInvoice: "20/04/2026", status: "New" },
];

export function formatRp(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export default customerSalesReports;
