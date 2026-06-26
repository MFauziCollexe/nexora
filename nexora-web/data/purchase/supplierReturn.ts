export const statCards = [
  { label: "Total Returns", value: 34, sub: "All time supplier returns", icon: "rotate-ccw", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "This Month", value: 5, sub: "Returns this month", icon: "calendar", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
  { label: "Completed", value: 28, sub: "Fully processed", icon: "check", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-emerald-500" },
  { label: "Pending", value: 4, sub: "Awaiting processing", icon: "clock", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-indigo-500" },
  { label: "Total Amount", value: "Rp 87,5 Jt", sub: "Total return value", icon: "dollar-sign", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-indigo-500" },
];

export type SupplierReturnItem = {
  id: number;
  srNo: string;
  date: string;
  grNo: string;
  supplier: string;
  items: number;
  totalQuantity: number;
  totalAmount: string;
  status: "Draft" | "Completed" | "Cancelled";
  returnedBy: string;
};

export const supplierReturns: SupplierReturnItem[] = [
  { id: 1, srNo: "SR-2026-00034", date: "26/06/2026", grNo: "GR-2026-00067", supplier: "PT Komputer Jaya", items: 3, totalQuantity: 8, totalAmount: "Rp 24.000.000", status: "Completed", returnedBy: "Ahmad Rizki" },
  { id: 2, srNo: "SR-2026-00033", date: "25/06/2026", grNo: "GR-2026-00066", supplier: "PT Bersih Sejahtera", items: 2, totalQuantity: 50, totalAmount: "Rp 1.250.000", status: "Completed", returnedBy: "Siti Rahma" },
  { id: 3, srNo: "SR-2026-00032", date: "25/06/2026", grNo: "GR-2026-00065", supplier: "PT Kimia Farma", items: 1, totalQuantity: 20, totalAmount: "Rp 3.800.000", status: "Draft", returnedBy: "Fauzi Mukhammad" },
  { id: 4, srNo: "SR-2026-00031", date: "24/06/2026", grNo: "GR-2026-00063", supplier: "PT Safety First", items: 4, totalQuantity: 60, totalAmount: "Rp 9.000.000", status: "Completed", returnedBy: "Rizky Pratama" },
  { id: 5, srNo: "SR-2026-00030", date: "23/06/2026", grNo: "GR-2026-00064", supplier: "PT Teknik Utama", items: 2, totalQuantity: 3, totalAmount: "Rp 4.500.000", status: "Cancelled", returnedBy: "Budi Santoso" },
  { id: 6, srNo: "SR-2026-00029", date: "22/06/2026", grNo: "GR-2026-00062", supplier: "PT Logistik Nusantara", items: 3, totalQuantity: 6, totalAmount: "Rp 7.200.000", status: "Draft", returnedBy: "Diana Putri" },
  { id: 7, srNo: "SR-2026-00028", date: "21/06/2026", grNo: "GR-2026-00061", supplier: "PT Bengkel Sentral", items: 2, totalQuantity: 10, totalAmount: "Rp 1.800.000", status: "Completed", returnedBy: "Fauzi Mukhammad" },
  { id: 8, srNo: "SR-2026-00027", date: "20/06/2026", grNo: "GR-2026-00060", supplier: "PT Indopack", items: 1, totalQuantity: 2000, totalAmount: "Rp 5.000.000", status: "Completed", returnedBy: "Rizky Pratama" },
  { id: 9, srNo: "SR-2026-00026", date: "19/06/2026", grNo: "GR-2026-00058", supplier: "PT Kreatif Media", items: 2, totalQuantity: 500, totalAmount: "Rp 2.500.000", status: "Completed", returnedBy: "Siti Rahma" },
  { id: 10, srNo: "SR-2026-00025", date: "18/06/2026", grNo: "GR-2026-00059", supplier: "PT Chemindo", items: 1, totalQuantity: 100, totalAmount: "Rp 8.000.000", status: "Draft", returnedBy: "Ahmad Rizki" },
  { id: 11, srNo: "SR-2026-00024", date: "17/06/2026", grNo: "GR-2026-00057", supplier: "PT Data Center Indo", items: 2, totalQuantity: 4, totalAmount: "Rp 12.000.000", status: "Completed", returnedBy: "Diana Putri" },
  { id: 12, srNo: "SR-2026-00023", date: "16/06/2026", grNo: "GR-2026-00056", supplier: "PT ATK Makmur", items: 5, totalQuantity: 60, totalAmount: "Rp 900.000", status: "Completed", returnedBy: "Budi Santoso" },
];

export default supplierReturns;
