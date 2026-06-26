export const statCards = [
  { label: "Total PO", value: 189, sub: "Year to date", icon: "shopping-cart", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "Open PO", value: 42, sub: "Not yet received", icon: "clock", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
  { label: "Completed PO", value: 120, sub: "Fully received", icon: "check", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-emerald-500" },
  { label: "Cancelled PO", value: 12, sub: "Cancelled orders", icon: "x", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-rose-500" },
  { label: "Total Value", value: "Rp 8,2 M", sub: "All PO value", icon: "dollar-sign", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-indigo-500" },
];

export type PoReportItem = {
  id: number;
  poNo: string;
  date: string;
  supplier: string;
  items: number;
  totalQty: number;
  totalAmount: string;
  status: "Draft" | "Sent" | "Confirmed" | "Partial" | "Completed" | "Cancelled";
  fulfilledPercent: number;
  createdBy: string;
};

export const poReports: PoReportItem[] = [
  { id: 1, poNo: "PO-2026-00048", date: "26/06/2026", supplier: "PT Komputer Jaya", items: 12, totalQty: 48, totalAmount: "Rp 48.000.000", status: "Completed", fulfilledPercent: 100, createdBy: "Ahmad Rizki" },
  { id: 2, poNo: "PO-2026-00047", date: "25/06/2026", supplier: "PT Bersih Sejahtera", items: 5, totalQty: 200, totalAmount: "Rp 6.250.000", status: "Completed", fulfilledPercent: 100, createdBy: "Siti Rahma" },
  { id: 3, poNo: "PO-2026-00052", date: "25/06/2026", supplier: "PT Kimia Farma", items: 6, totalQty: 120, totalAmount: "Rp 22.800.000", status: "Partial", fulfilledPercent: 65, createdBy: "Fauzi Mukhammad" },
  { id: 4, poNo: "PO-2026-00049", date: "24/06/2026", supplier: "PT Teknik Utama", items: 2, totalQty: 5, totalAmount: "Rp 9.500.000", status: "Sent", fulfilledPercent: 0, createdBy: "Budi Santoso" },
  { id: 5, poNo: "PO-2026-00045", date: "24/06/2026", supplier: "PT Safety First", items: 7, totalQty: 350, totalAmount: "Rp 18.000.000", status: "Completed", fulfilledPercent: 100, createdBy: "Rizky Pratama" },
  { id: 6, poNo: "PO-2026-00044", date: "23/06/2026", supplier: "PT Logistik Nusantara", items: 4, totalQty: 8, totalAmount: "Rp 14.400.000", status: "Draft", fulfilledPercent: 0, createdBy: "Diana Putri" },
  { id: 7, poNo: "PO-2026-00042", date: "23/06/2026", supplier: "PT Bengkel Sentral", items: 6, totalQty: 45, totalAmount: "Rp 3.600.000", status: "Completed", fulfilledPercent: 100, createdBy: "Fauzi Mukhammad" },
  { id: 8, poNo: "PO-2026-00051", date: "22/06/2026", supplier: "PT Indopack", items: 4, totalQty: 10000, totalAmount: "Rp 10.000.000", status: "Partial", fulfilledPercent: 80, createdBy: "Rizky Pratama" },
  { id: 9, poNo: "PO-2026-00046", date: "22/06/2026", supplier: "PT Chemindo", items: 2, totalQty: 500, totalAmount: "Rp 16.000.000", status: "Cancelled", fulfilledPercent: 0, createdBy: "Fauzi Mukhammad" },
  { id: 10, poNo: "PO-2026-00043", date: "21/06/2026", supplier: "PT Kreatif Media", items: 6, totalQty: 3000, totalAmount: "Rp 5.000.000", status: "Completed", fulfilledPercent: 100, createdBy: "Siti Rahma" },
  { id: 11, poNo: "PO-2026-00041", date: "21/06/2026", supplier: "PT Data Center Indo", items: 3, totalQty: 6, totalAmount: "Rp 24.000.000", status: "Confirmed", fulfilledPercent: 0, createdBy: "Diana Putri" },
  { id: 12, poNo: "PO-2026-00050", date: "20/06/2026", supplier: "PT ATK Makmur", items: 8, totalQty: 120, totalAmount: "Rp 1.800.000", status: "Completed", fulfilledPercent: 100, createdBy: "Budi Santoso" },
];

export default poReports;
