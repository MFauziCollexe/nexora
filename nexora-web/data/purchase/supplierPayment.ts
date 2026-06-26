export const statCards = [
  { label: "Total Payments", value: 156, sub: "All time payments", icon: "credit-card", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "This Month", value: 12, sub: "Payments this month", icon: "calendar", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-emerald-500" },
  { label: "Pending", value: 8, sub: "Awaiting approval/processing", icon: "clock", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
  { label: "Total Disbursed", value: "Rp 7,8 M", sub: "Year to date", icon: "dollar-sign", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-indigo-500" },
];

export type SupplierPaymentItem = {
  id: number;
  paymentNo: string;
  date: string;
  paymentDate: string;
  supplier: string;
  amount: string;
  paidAmount: string;
  paymentMethod: string;
  referenceNumber: string;
  status: "Draft" | "Submitted" | "Approved" | "Paid" | "Cancelled";
};

export const supplierPayments: SupplierPaymentItem[] = [
  { id: 1, paymentNo: "PYT-2026-00156", date: "26/06/2026", paymentDate: "27/06/2026", supplier: "PT Komputer Jaya", amount: "Rp 48.000.000", paidAmount: "Rp 48.000.000", paymentMethod: "Bank Transfer", referenceNumber: "TRF-2026-0089", status: "Paid" },
  { id: 2, paymentNo: "PYT-2026-00155", date: "25/06/2026", paymentDate: "25/06/2026", supplier: "PT Kreatif Media", amount: "Rp 5.000.000", paidAmount: "Rp 5.000.000", paymentMethod: "Bank Transfer", referenceNumber: "TRF-2026-0088", status: "Paid" },
  { id: 3, paymentNo: "PYT-2026-00154", date: "24/06/2026", paymentDate: "26/06/2026", supplier: "PT Safety First", amount: "Rp 18.000.000", paidAmount: "Rp 18.000.000", paymentMethod: "Cheque", referenceNumber: "CHQ-2026-0045", status: "Approved" },
  { id: 4, paymentNo: "PYT-2026-00153", date: "24/06/2026", paymentDate: "24/06/2026", supplier: "PT Komputer Jaya", amount: "Rp 24.000.000", paidAmount: "Rp 24.000.000", paymentMethod: "Bank Transfer", referenceNumber: "TRF-2026-0087", status: "Paid" },
  { id: 5, paymentNo: "PYT-2026-00152", date: "23/06/2026", paymentDate: "28/06/2026", supplier: "PT Indopack", amount: "Rp 10.000.000", paidAmount: "Rp 10.000.000", paymentMethod: "Giro", referenceNumber: "GIRO-2026-0012", status: "Submitted" },
  { id: 6, paymentNo: "PYT-2026-00151", date: "22/06/2026", paymentDate: "22/06/2026", supplier: "PT Bengkel Sentral", amount: "Rp 3.600.000", paidAmount: "Rp 3.600.000", paymentMethod: "Cash", referenceNumber: "KAS-2026-0023", status: "Paid" },
  { id: 7, paymentNo: "PYT-2026-00150", date: "21/06/2026", paymentDate: "25/06/2026", supplier: "PT Data Center Indo", amount: "Rp 24.000.000", paidAmount: "Rp 0", paymentMethod: "Bank Transfer", referenceNumber: "-", status: "Draft" },
  { id: 8, paymentNo: "PYT-2026-00149", date: "20/06/2026", paymentDate: "20/06/2026", supplier: "PT Kimia Farma", amount: "Rp 22.800.000", paidAmount: "Rp 22.800.000", paymentMethod: "Bank Transfer", referenceNumber: "TRF-2026-0086", status: "Paid" },
  { id: 9, paymentNo: "PYT-2026-00148", date: "19/06/2026", paymentDate: "19/06/2026", supplier: "PT Bersih Sejahtera", amount: "Rp 6.250.000", paidAmount: "Rp 6.250.000", paymentMethod: "Bank Transfer", referenceNumber: "TRF-2026-0085", status: "Paid" },
  { id: 10, paymentNo: "PYT-2026-00147", date: "18/06/2026", paymentDate: "21/06/2026", supplier: "PT ATK Makmur", amount: "Rp 1.800.000", paidAmount: "Rp 1.800.000", paymentMethod: "Cash", referenceNumber: "KAS-2026-0022", status: "Approved" },
  { id: 11, paymentNo: "PYT-2026-00146", date: "17/06/2026", paymentDate: "17/06/2026", supplier: "PT Logistik Nusantara", amount: "Rp 7.200.000", paidAmount: "Rp 7.200.000", paymentMethod: "Bank Transfer", referenceNumber: "TRF-2026-0084", status: "Paid" },
  { id: 12, paymentNo: "PYT-2026-00145", date: "16/06/2026", paymentDate: "20/06/2026", supplier: "PT Chemindo", amount: "Rp 16.000.000", paidAmount: "Rp 0", paymentMethod: "Cheque", referenceNumber: "-", status: "Draft" },
];

export default supplierPayments;
