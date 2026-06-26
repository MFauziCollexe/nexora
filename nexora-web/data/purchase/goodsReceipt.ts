export const statCards = [
  { label: "Total Receipts", value: 67, sub: "All time goods receipts", icon: "package", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "Today", value: 3, sub: "Received today", icon: "clock", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
  { label: "Completed", value: 58, sub: "Fully processed", icon: "check", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-emerald-500" },
  { label: "Draft", value: 6, sub: "Not yet finalized", icon: "edit", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-indigo-500" },
  { label: "Total Qty", value: "12.450 Pcs", sub: "Total items received", icon: "box", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-indigo-500" },
];

export type GoodsReceiptItem = {
  id: number;
  grNo: string;
  date: string;
  poNo: string;
  supplier: string;
  items: number;
  totalQuantity: number;
  status: "Draft" | "Completed" | "Cancelled";
  receivedBy: string;
};

export const goodsReceipts: GoodsReceiptItem[] = [
  { id: 1, grNo: "GR-2026-00067", date: "26/06/2026", poNo: "PO-2026-00048", supplier: "PT Komputer Jaya", items: 12, totalQuantity: 48, status: "Completed", receivedBy: "Ahmad Rizki" },
  { id: 2, grNo: "GR-2026-00066", date: "26/06/2026", poNo: "PO-2026-00047", supplier: "PT Bersih Sejahtera", items: 5, totalQuantity: 200, status: "Completed", receivedBy: "Siti Rahma" },
  { id: 3, grNo: "GR-2026-00065", date: "25/06/2026", poNo: "PO-2026-00052", supplier: "PT Kimia Farma", items: 6, totalQuantity: 120, status: "Completed", receivedBy: "Fauzi Mukhammad" },
  { id: 4, grNo: "GR-2026-00064", date: "25/06/2026", poNo: "PO-2026-00049", supplier: "PT Teknik Utama", items: 2, totalQuantity: 5, status: "Draft", receivedBy: "Budi Santoso" },
  { id: 5, grNo: "GR-2026-00063", date: "24/06/2026", poNo: "PO-2026-00045", supplier: "PT Safety First", items: 7, totalQuantity: 350, status: "Completed", receivedBy: "Rizky Pratama" },
  { id: 6, grNo: "GR-2026-00062", date: "24/06/2026", poNo: "PO-2026-00044", supplier: "PT Logistik Nusantara", items: 4, totalQuantity: 8, status: "Draft", receivedBy: "Budi Santoso" },
  { id: 7, grNo: "GR-2026-00061", date: "23/06/2026", poNo: "PO-2026-00042", supplier: "PT Bengkel Sentral", items: 6, totalQuantity: 45, status: "Completed", receivedBy: "Fauzi Mukhammad" },
  { id: 8, grNo: "GR-2026-00060", date: "23/06/2026", poNo: "PO-2026-00051", supplier: "PT Indopack", items: 4, totalQuantity: 10000, status: "Completed", receivedBy: "Rizky Pratama" },
  { id: 9, grNo: "GR-2026-00059", date: "22/06/2026", poNo: "PO-2026-00046", supplier: "PT Chemindo", items: 2, totalQuantity: 500, status: "Cancelled", receivedBy: "Fauzi Mukhammad" },
  { id: 10, grNo: "GR-2026-00058", date: "22/06/2026", poNo: "PO-2026-00043", supplier: "PT Kreatif Media", items: 6, totalQuantity: 3000, status: "Completed", receivedBy: "Siti Rahma" },
  { id: 11, grNo: "GR-2026-00057", date: "21/06/2026", poNo: "PO-2026-00041", supplier: "PT Data Center Indo", items: 3, totalQuantity: 6, status: "Draft", receivedBy: "Diana Putri" },
  { id: 12, grNo: "GR-2026-00056", date: "21/06/2026", poNo: "PO-2026-00050", supplier: "PT ATK Makmur", items: 8, totalQuantity: 120, status: "Completed", receivedBy: "Diana Putri" },
];

export default goodsReceipts;
