export const statCards = [
  { label: "Total Outstanding", value: "Rp 485 Juta", sub: "All unpaid invoices", icon: "dollar-sign", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-rose-500" },
  { label: "Overdue Invoices", value: 16, sub: "Past due date", icon: "alert-circle", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-rose-500" },
  { label: "Unpaid Invoices", value: 42, sub: "Not yet paid", icon: "pause", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
  { label: "Partial Paid", value: 8, sub: "Partially paid", icon: "clock", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "Avg Days Overdue", value: "24 Hari", sub: "Average delay", icon: "bar-chart", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-slate-500" },
];

export type OutstandingItem = {
  id: number;
  invoiceNo: string;
  date: string;
  customer: string;
  dueDate: string;
  amount: number;
  paidAmount: number;
  outstanding: number;
  daysOverdue: number;
  status: "Overdue" | "Unpaid" | "Partial";
};

export const outstandingInvoices: OutstandingItem[] = [
  { id: 1, invoiceNo: "INV-2026-000123", date: "13/06/2026", customer: "PT Sukses Mandiri", dueDate: "13/07/2026", amount: 98750000, paidAmount: 0, outstanding: 98750000, daysOverdue: 0, status: "Unpaid" },
  { id: 2, invoiceNo: "INV-2026-000124", date: "14/06/2026", customer: "PT Global Sejahtera", dueDate: "14/07/2026", amount: 250000000, paidAmount: 0, outstanding: 250000000, daysOverdue: 0, status: "Unpaid" },
  { id: 3, invoiceNo: "INV-2026-000120", date: "10/06/2026", customer: "CV Berkah Abadi", dueDate: "10/07/2026", amount: 32500000, paidAmount: 0, outstanding: 32500000, daysOverdue: 0, status: "Unpaid" },
  { id: 4, invoiceNo: "INV-2026-000115", date: "05/06/2026", customer: "PT Maju Bersama", dueDate: "05/07/2026", amount: 92000000, paidAmount: 0, outstanding: 92000000, daysOverdue: 0, status: "Unpaid" },
  { id: 5, invoiceNo: "INV-2026-000101", date: "20/05/2026", customer: "PT Sukses Mandiri", dueDate: "20/06/2026", amount: 45000000, paidAmount: 20000000, outstanding: 25000000, daysOverdue: 6, status: "Overdue" },
  { id: 6, invoiceNo: "INV-2026-000098", date: "15/05/2026", customer: "CV Berkah Abadi", dueDate: "15/06/2026", amount: 78500000, paidAmount: 0, outstanding: 78500000, daysOverdue: 11, status: "Overdue" },
  { id: 7, invoiceNo: "INV-2026-000095", date: "10/05/2026", customer: "PT Maju Bersama", dueDate: "10/06/2026", amount: 156000000, paidAmount: 100000000, outstanding: 56000000, daysOverdue: 16, status: "Overdue" },
  { id: 8, invoiceNo: "INV-2026-000090", date: "01/05/2026", customer: "PT Global Sejahtera", dueDate: "01/06/2026", amount: 210000000, paidAmount: 0, outstanding: 210000000, daysOverdue: 25, status: "Overdue" },
  { id: 9, invoiceNo: "INV-2026-000085", date: "20/04/2026", customer: "CV Sumber Abadi", dueDate: "20/05/2026", amount: 180000000, paidAmount: 100000000, outstanding: 80000000, daysOverdue: 37, status: "Overdue" },
  { id: 10, invoiceNo: "INV-2026-000080", date: "15/04/2026", customer: "PT Sukses Mandiri", dueDate: "15/05/2026", amount: 95000000, paidAmount: 50000000, outstanding: 45000000, daysOverdue: 42, status: "Partial" },
  { id: 11, invoiceNo: "INV-2026-000075", date: "01/04/2026", customer: "PT Indo Makmur", dueDate: "01/05/2026", amount: 142300000, paidAmount: 70000000, outstanding: 72300000, daysOverdue: 56, status: "Partial" },
  { id: 12, invoiceNo: "INV-2026-000070", date: "20/03/2026", customer: "CV Berkah Abadi", dueDate: "20/04/2026", amount: 67000000, paidAmount: 0, outstanding: 67000000, daysOverdue: 67, status: "Overdue" },
];

export function formatRp(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export default outstandingInvoices;
