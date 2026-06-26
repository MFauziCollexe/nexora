export const statCards = [
  { label: "Total Records", value: 46, sub: "All receiving transactions", icon: "archive", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "Goods Receipts", value: 34, sub: "Incoming goods", icon: "package", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-emerald-500" },
  { label: "Supplier Returns", value: 12, sub: "Returned to supplier", icon: "rotate-ccw", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
  { label: "This Week", value: 8, sub: "Recent activity", icon: "activity", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-indigo-500" },
];

export type ReceivingRecord = {
  id: number;
  documentType: "Goods Receipt" | "Supplier Return";
  documentNo: string;
  date: string;
  referenceNo: string;
  supplier: string;
  items: number;
  quantity: number;
  status: "Draft" | "Completed" | "Cancelled";
  handledBy: string;
};

export const receivingHistory: ReceivingRecord[] = [
  { id: 1, documentType: "Goods Receipt", documentNo: "GR-2026-00067", date: "26/06/2026", referenceNo: "PO-2026-00048", supplier: "PT Komputer Jaya", items: 12, quantity: 48, status: "Completed", handledBy: "Ahmad Rizki" },
  { id: 2, documentType: "Goods Receipt", documentNo: "GR-2026-00066", date: "26/06/2026", referenceNo: "PO-2026-00047", supplier: "PT Bersih Sejahtera", items: 5, quantity: 200, status: "Completed", handledBy: "Siti Rahma" },
  { id: 3, documentType: "Supplier Return", documentNo: "SR-2026-00034", date: "26/06/2026", referenceNo: "GR-2026-00067", supplier: "PT Komputer Jaya", items: 3, quantity: 8, status: "Completed", handledBy: "Ahmad Rizki" },
  { id: 4, documentType: "Goods Receipt", documentNo: "GR-2026-00065", date: "25/06/2026", referenceNo: "PO-2026-00052", supplier: "PT Kimia Farma", items: 6, quantity: 120, status: "Completed", handledBy: "Fauzi Mukhammad" },
  { id: 5, documentType: "Supplier Return", documentNo: "SR-2026-00033", date: "25/06/2026", referenceNo: "GR-2026-00066", supplier: "PT Bersih Sejahtera", items: 2, quantity: 50, status: "Completed", handledBy: "Siti Rahma" },
  { id: 6, documentType: "Supplier Return", documentNo: "SR-2026-00032", date: "25/06/2026", referenceNo: "GR-2026-00065", supplier: "PT Kimia Farma", items: 1, quantity: 20, status: "Draft", handledBy: "Fauzi Mukhammad" },
  { id: 7, documentType: "Goods Receipt", documentNo: "GR-2026-00064", date: "25/06/2026", referenceNo: "PO-2026-00049", supplier: "PT Teknik Utama", items: 2, quantity: 5, status: "Draft", handledBy: "Budi Santoso" },
  { id: 8, documentType: "Goods Receipt", documentNo: "GR-2026-00063", date: "24/06/2026", referenceNo: "PO-2026-00045", supplier: "PT Safety First", items: 7, quantity: 350, status: "Completed", handledBy: "Rizky Pratama" },
  { id: 9, documentType: "Supplier Return", documentNo: "SR-2026-00031", date: "24/06/2026", referenceNo: "GR-2026-00063", supplier: "PT Safety First", items: 4, quantity: 60, status: "Completed", handledBy: "Rizky Pratama" },
  { id: 10, documentType: "Goods Receipt", documentNo: "GR-2026-00062", date: "24/06/2026", referenceNo: "PO-2026-00044", supplier: "PT Logistik Nusantara", items: 4, quantity: 8, status: "Draft", handledBy: "Budi Santoso" },
  { id: 11, documentType: "Goods Receipt", documentNo: "GR-2026-00061", date: "23/06/2026", referenceNo: "PO-2026-00042", supplier: "PT Bengkel Sentral", items: 6, quantity: 45, status: "Completed", handledBy: "Fauzi Mukhammad" },
  { id: 12, documentType: "Supplier Return", documentNo: "SR-2026-00030", date: "23/06/2026", referenceNo: "GR-2026-00064", supplier: "PT Teknik Utama", items: 2, quantity: 3, status: "Cancelled", handledBy: "Budi Santoso" },
  { id: 13, documentType: "Goods Receipt", documentNo: "GR-2026-00060", date: "23/06/2026", referenceNo: "PO-2026-00051", supplier: "PT Indopack", items: 4, quantity: 10000, status: "Completed", handledBy: "Rizky Pratama" },
  { id: 14, documentType: "Supplier Return", documentNo: "SR-2026-00029", date: "22/06/2026", referenceNo: "GR-2026-00062", supplier: "PT Logistik Nusantara", items: 3, quantity: 6, status: "Draft", handledBy: "Diana Putri" },
  { id: 15, documentType: "Goods Receipt", documentNo: "GR-2026-00059", date: "22/06/2026", referenceNo: "PO-2026-00046", supplier: "PT Chemindo", items: 2, quantity: 500, status: "Cancelled", handledBy: "Fauzi Mukhammad" },
  { id: 16, documentType: "Goods Receipt", documentNo: "GR-2026-00058", date: "22/06/2026", referenceNo: "PO-2026-00043", supplier: "PT Kreatif Media", items: 6, quantity: 3000, status: "Completed", handledBy: "Siti Rahma" },
  { id: 17, documentType: "Goods Receipt", documentNo: "GR-2026-00057", date: "21/06/2026", referenceNo: "PO-2026-00041", supplier: "PT Data Center Indo", items: 3, quantity: 6, status: "Draft", handledBy: "Diana Putri" },
  { id: 18, documentType: "Supplier Return", documentNo: "SR-2026-00028", date: "21/06/2026", referenceNo: "GR-2026-00061", supplier: "PT Bengkel Sentral", items: 2, quantity: 10, status: "Completed", handledBy: "Fauzi Mukhammad" },
  { id: 19, documentType: "Goods Receipt", documentNo: "GR-2026-00056", date: "21/06/2026", referenceNo: "PO-2026-00050", supplier: "PT ATK Makmur", items: 8, quantity: 120, status: "Completed", handledBy: "Diana Putri" },
  { id: 20, documentType: "Supplier Return", documentNo: "SR-2026-00027", date: "20/06/2026", referenceNo: "GR-2026-00060", supplier: "PT Indopack", items: 1, quantity: 2000, status: "Completed", handledBy: "Rizky Pratama" },
];

export default receivingHistory;
