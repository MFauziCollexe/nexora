export const statCards = [
  { label: "Total Invoices", value: 89, sub: "All time supplier invoices", icon: "file-text", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "Unpaid", value: 23, sub: "Awaiting payment", icon: "clock", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
  { label: "Overdue", value: 5, sub: "Past due date", icon: "alert-triangle", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-rose-500" },
  { label: "Paid", value: 58, sub: "Settled invoices", icon: "check", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-emerald-500" },
  { label: "Total Due", value: "Rp 425 Jt", sub: "Outstanding amount", icon: "dollar-sign", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-indigo-500" },
];

export type SupplierInvoiceItem = {
  id: number;
  invoiceNo: string;
  date: string;
  dueDate: string;
  supplierRef: string;
  supplier: string;
  totalAmount: string;
  amountDue: string;
  status: "Draft" | "Submitted" | "Approved" | "Rejected" | "Paid" | "Overdue" | "Cancelled";
  paymentStatus: "Unpaid" | "Partial" | "Paid";
};

export const supplierInvoices: SupplierInvoiceItem[] = [
  { id: 1, invoiceNo: "INV-2026-00089", date: "26/06/2026", dueDate: "26/07/2026", supplierRef: "SI-2026-0045", supplier: "PT Komputer Jaya", totalAmount: "Rp 48.000.000", amountDue: "Rp 48.000.000", status: "Submitted", paymentStatus: "Unpaid" },
  { id: 2, invoiceNo: "INV-2026-00088", date: "25/06/2026", dueDate: "25/07/2026", supplierRef: "SI-2026-0044", supplier: "PT Bersih Sejahtera", totalAmount: "Rp 6.250.000", amountDue: "Rp 6.250.000", status: "Approved", paymentStatus: "Unpaid" },
  { id: 3, invoiceNo: "INV-2026-00087", date: "25/06/2026", dueDate: "25/07/2026", supplierRef: "SI-2026-0043", supplier: "PT Kimia Farma", totalAmount: "Rp 22.800.000", amountDue: "Rp 22.800.000", status: "Draft", paymentStatus: "Unpaid" },
  { id: 4, invoiceNo: "INV-2026-00086", date: "24/06/2026", dueDate: "24/07/2026", supplierRef: "SI-2026-0042", supplier: "PT Safety First", totalAmount: "Rp 18.000.000", amountDue: "Rp 0", status: "Paid", paymentStatus: "Paid" },
  { id: 5, invoiceNo: "INV-2026-00085", date: "23/06/2026", dueDate: "23/06/2026", supplierRef: "SI-2026-0041", supplier: "PT Teknik Utama", totalAmount: "Rp 9.500.000", amountDue: "Rp 9.500.000", status: "Overdue", paymentStatus: "Unpaid" },
  { id: 6, invoiceNo: "INV-2026-00084", date: "22/06/2026", dueDate: "22/07/2026", supplierRef: "SI-2026-0040", supplier: "PT Logistik Nusantara", totalAmount: "Rp 14.400.000", amountDue: "Rp 7.200.000", status: "Approved", paymentStatus: "Partial" },
  { id: 7, invoiceNo: "INV-2026-00083", date: "21/06/2026", dueDate: "21/07/2026", supplierRef: "SI-2026-0039", supplier: "PT Bengkel Sentral", totalAmount: "Rp 3.600.000", amountDue: "Rp 0", status: "Paid", paymentStatus: "Paid" },
  { id: 8, invoiceNo: "INV-2026-00082", date: "20/06/2026", dueDate: "20/07/2026", supplierRef: "SI-2026-0038", supplier: "PT Indopack", totalAmount: "Rp 10.000.000", amountDue: "Rp 10.000.000", status: "Submitted", paymentStatus: "Unpaid" },
  { id: 9, invoiceNo: "INV-2026-00081", date: "19/06/2026", dueDate: "19/07/2026", supplierRef: "SI-2026-0037", supplier: "PT Kreatif Media", totalAmount: "Rp 5.000.000", amountDue: "Rp 0", status: "Paid", paymentStatus: "Paid" },
  { id: 10, invoiceNo: "INV-2026-00080", date: "18/06/2026", dueDate: "18/06/2026", supplierRef: "SI-2026-0036", supplier: "PT Chemindo", totalAmount: "Rp 16.000.000", amountDue: "Rp 16.000.000", status: "Overdue", paymentStatus: "Unpaid" },
  { id: 11, invoiceNo: "INV-2026-00079", date: "17/06/2026", dueDate: "17/07/2026", supplierRef: "SI-2026-0035", supplier: "PT Data Center Indo", totalAmount: "Rp 24.000.000", amountDue: "Rp 24.000.000", status: "Draft", paymentStatus: "Unpaid" },
  { id: 12, invoiceNo: "INV-2026-00078", date: "16/06/2026", dueDate: "16/07/2026", supplierRef: "SI-2026-0034", supplier: "PT ATK Makmur", totalAmount: "Rp 1.800.000", amountDue: "Rp 1.800.000", status: "Approved", paymentStatus: "Unpaid" },
];

export default supplierInvoices;
