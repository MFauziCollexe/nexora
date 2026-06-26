export const statCards = [
  { label: "Total Outstanding", value: "Rp 425,3 Jt", sub: "From 18 suppliers", icon: "dollar-sign", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "Current (0-30 days)", value: "Rp 312,8 Jt", sub: "Not yet due", icon: "clock", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-emerald-500" },
  { label: "Overdue", value: "Rp 112,5 Jt", sub: "Past due date", icon: "alert-triangle", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-rose-500" },
  { label: "Overdue Suppliers", value: 5, sub: "With past due invoices", icon: "users", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
];

export type OutstandingPayableItem = {
  id: number;
  supplier: string;
  totalInvoices: number;
  totalAmount: string;
  current: string;
  overdue1to30: string;
  overdue31to60: string;
  overdue61plus: string;
  oldestDue: string;
  status: "Current" | "Overdue" | "Critical";
};

export const outstandingPayables: OutstandingPayableItem[] = [
  { id: 1, supplier: "PT Komputer Jaya", totalInvoices: 3, totalAmount: "Rp 96.000.000", current: "Rp 48.000.000", overdue1to30: "Rp 48.000.000", overdue31to60: "Rp 0", overdue61plus: "Rp 0", oldestDue: "26/06/2026", status: "Current" },
  { id: 2, supplier: "PT Kimia Farma", totalInvoices: 2, totalAmount: "Rp 45.600.000", current: "Rp 22.800.000", overdue1to30: "Rp 22.800.000", overdue31to60: "Rp 0", overdue61plus: "Rp 0", oldestDue: "25/06/2026", status: "Current" },
  { id: 3, supplier: "PT Bersih Sejahtera", totalInvoices: 1, totalAmount: "Rp 6.250.000", current: "Rp 6.250.000", overdue1to30: "Rp 0", overdue31to60: "Rp 0", overdue61plus: "Rp 0", oldestDue: "25/07/2026", status: "Current" },
  { id: 4, supplier: "PT Logistik Nusantara", totalInvoices: 1, totalAmount: "Rp 7.200.000", current: "Rp 7.200.000", overdue1to30: "Rp 0", overdue31to60: "Rp 0", overdue61plus: "Rp 0", oldestDue: "22/07/2026", status: "Current" },
  { id: 5, supplier: "PT Indopack", totalInvoices: 1, totalAmount: "Rp 10.000.000", current: "Rp 10.000.000", overdue1to30: "Rp 0", overdue31to60: "Rp 0", overdue61plus: "Rp 0", oldestDue: "20/07/2026", status: "Current" },
  { id: 6, supplier: "PT Data Center Indo", totalInvoices: 1, totalAmount: "Rp 24.000.000", current: "Rp 24.000.000", overdue1to30: "Rp 0", overdue31to60: "Rp 0", overdue61plus: "Rp 0", oldestDue: "17/07/2026", status: "Current" },
  { id: 7, supplier: "PT ATK Makmur", totalInvoices: 1, totalAmount: "Rp 1.800.000", current: "Rp 1.800.000", overdue1to30: "Rp 0", overdue31to60: "Rp 0", overdue61plus: "Rp 0", oldestDue: "16/07/2026", status: "Current" },
  { id: 8, supplier: "PT Teknik Utama", totalInvoices: 2, totalAmount: "Rp 19.000.000", current: "Rp 0", overdue1to30: "Rp 9.500.000", overdue31to60: "Rp 9.500.000", overdue61plus: "Rp 0", oldestDue: "23/05/2026", status: "Overdue" },
  { id: 9, supplier: "PT Chemindo", totalInvoices: 2, totalAmount: "Rp 32.000.000", current: "Rp 0", overdue1to30: "Rp 0", overdue31to60: "Rp 16.000.000", overdue61plus: "Rp 16.000.000", oldestDue: "18/04/2026", status: "Critical" },
  { id: 10, supplier: "PT Safety First", totalInvoices: 1, totalAmount: "Rp 18.000.000", current: "Rp 18.000.000", overdue1to30: "Rp 0", overdue31to60: "Rp 0", overdue61plus: "Rp 0", oldestDue: "24/07/2026", status: "Current" },
  { id: 11, supplier: "PT Bengkel Sentral", totalInvoices: 1, totalAmount: "Rp 3.600.000", current: "Rp 0", overdue1to30: "Rp 3.600.000", overdue31to60: "Rp 0", overdue61plus: "Rp 0", oldestDue: "21/06/2026", status: "Overdue" },
  { id: 12, supplier: "PT Kreatif Media", totalInvoices: 1, totalAmount: "Rp 5.000.000", current: "Rp 0", overdue1to30: "Rp 5.000.000", overdue31to60: "Rp 0", overdue61plus: "Rp 0", oldestDue: "19/06/2026", status: "Overdue" },
];

export default outstandingPayables;
