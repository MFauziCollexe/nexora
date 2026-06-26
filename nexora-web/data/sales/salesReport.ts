export const statCards = [
  { label: "Total Sales", value: "Rp 1.2 M", sub: "All time sales", icon: "dollar-sign", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "Total Invoices", value: 156, sub: "All invoices", icon: "file-text", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-slate-500" },
  { label: "Avg per Invoice", value: "Rp 7.8 M", sub: "Average invoice amount", icon: "bar-chart", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-emerald-500" },
  { label: "Pending", value: 42, sub: "Unpaid invoices", icon: "clock", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
  { label: "Overdue", value: 16, sub: "Past due date", icon: "alert-circle", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-rose-500" },
];

export type SalesReportItem = {
  id: number;
  invoiceNo: string;
  date: string;
  customer: string;
  soNo: string;
  dueDate: string;
  amount: number;
  paidAmount: number;
  status: "Paid" | "Partial" | "Unpaid" | "Overdue";
  sales: string;
};

export const salesReports: SalesReportItem[] = [
  { id: 1, invoiceNo: "INV-2026-000126", date: "16/06/2026", customer: "PT Maju Bersama", soNo: "SO-2026-000126", dueDate: "16/07/2026", amount: 18870000, paidAmount: 18870000, status: "Paid", sales: "Fauzi" },
  { id: 2, invoiceNo: "INV-2026-000125", date: "15/06/2026", customer: "CV Sumber Abadi", soNo: "SO-2026-000125", dueDate: "15/07/2026", amount: 78500000, paidAmount: 50000000, status: "Partial", sales: "Rizky" },
  { id: 3, invoiceNo: "INV-2026-000124", date: "14/06/2026", customer: "PT Global Sejahtera", soNo: "SO-2026-000124", dueDate: "14/07/2026", amount: 250000000, paidAmount: 0, status: "Unpaid", sales: "Diana" },
  { id: 4, invoiceNo: "INV-2026-000123", date: "13/06/2026", customer: "PT Sukses Mandiri", soNo: "SO-2026-000123", dueDate: "13/07/2026", amount: 98750000, paidAmount: 0, status: "Overdue", sales: "Fauzi" },
  { id: 5, invoiceNo: "INV-2026-000122", date: "12/06/2026", customer: "UD Karya Utama", soNo: "SO-2026-000122", dueDate: "12/07/2026", amount: 55200000, paidAmount: 55200000, status: "Paid", sales: "Rizky" },
  { id: 6, invoiceNo: "INV-2026-000121", date: "11/06/2026", customer: "PT Indo Makmur", soNo: "SO-2026-000121", dueDate: "11/07/2026", amount: 142300000, paidAmount: 70000000, status: "Partial", sales: "Diana" },
  { id: 7, invoiceNo: "INV-2026-000120", date: "10/06/2026", customer: "CV Berkah Abadi", soNo: "SO-2026-000120", dueDate: "10/07/2026", amount: 32500000, paidAmount: 0, status: "Unpaid", sales: "Fauzi" },
  { id: 8, invoiceNo: "INV-2026-000119", date: "09/06/2026", customer: "PT Sehat Selalu", soNo: "SO-2026-000119", dueDate: "09/07/2026", amount: 27500000, paidAmount: 27500000, status: "Paid", sales: "Rizky" },
  { id: 9, invoiceNo: "INV-2026-000118", date: "08/06/2026", customer: "PT Prima Niaga", soNo: "SO-2026-000118", dueDate: "08/07/2026", amount: 175000000, paidAmount: 175000000, status: "Paid", sales: "Diana" },
  { id: 10, invoiceNo: "INV-2026-000117", date: "07/06/2026", customer: "PT Cahaya Abadi", soNo: "SO-2026-000117", dueDate: "07/07/2026", amount: 87600000, paidAmount: 87600000, status: "Paid", sales: "Fauzi" },
  { id: 11, invoiceNo: "INV-2026-000116", date: "06/06/2026", customer: "CV Sumber Abadi", soNo: "SO-2026-000116", dueDate: "06/07/2026", amount: 45000000, paidAmount: 25000000, status: "Partial", sales: "Rizky" },
  { id: 12, invoiceNo: "INV-2026-000115", date: "05/06/2026", customer: "PT Maju Bersama", soNo: "SO-2026-000115", dueDate: "05/07/2026", amount: 92000000, paidAmount: 0, status: "Unpaid", sales: "Fauzi" },
];

export function formatRp(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export default salesReports;
