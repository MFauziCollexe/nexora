export const statCards = [
  { label: "Total Orders", value: 52, sub: "All time purchase orders", icon: "shopping-cart", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "Pending", value: 9, sub: "Awaiting approval", icon: "clock", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
  { label: "Approved", value: 18, sub: "Approved orders", icon: "check", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-emerald-500" },
  { label: "Received", value: 21, sub: "Fully received", icon: "package", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-indigo-500" },
  { label: "Total Value", value: "Rp 2.8 Miliar", sub: "Total order value", icon: "dollar-sign", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-indigo-500" },
];

export type PurchaseOrderItem = {
  id: number;
  poNo: string;
  date: string;
  title: string;
  supplier: string;
  items: number;
  totalAmount: number;
  status: "Draft" | "Pending" | "Approved" | "Sent" | "Partial" | "Received" | "Cancelled";
  priority: "High" | "Medium" | "Low";
  requestedBy: string;
};

export const purchaseOrders: PurchaseOrderItem[] = [
  { id: 1, poNo: "PO-2026-00052", date: "25/06/2026", title: "Raw Materials Batch #4", supplier: "PT Kimia Farma", items: 6, totalAmount: 420000000, status: "Sent", priority: "High", requestedBy: "Fauzi Mukhammad" },
  { id: 2, poNo: "PO-2026-00051", date: "24/06/2026", title: "Packaging Supplies Q3", supplier: "PT Indopack", items: 4, totalAmount: 98000000, status: "Approved", priority: "Medium", requestedBy: "Rizky Pratama" },
  { id: 3, poNo: "PO-2026-00050", date: "23/06/2026", title: "Office Furniture", supplier: "PT ATK Makmur", items: 8, totalAmount: 156000000, status: "Pending", priority: "Low", requestedBy: "Diana Putri" },
  { id: 4, poNo: "PO-2026-00049", date: "22/06/2026", title: "Machine Maintenance Kit", supplier: "PT Teknik Utama", items: 3, totalAmount: 78500000, status: "Partial", priority: "High", requestedBy: "Budi Santoso" },
  { id: 5, poNo: "PO-2026-00048", date: "21/06/2026", title: "Network Equipment", supplier: "PT Komputer Jaya", items: 12, totalAmount: 345000000, status: "Received", priority: "High", requestedBy: "Diana Putri" },
  { id: 6, poNo: "PO-2026-00047", date: "20/06/2026", title: "Cleaning Supplies", supplier: "PT Bersih Sejahtera", items: 5, totalAmount: 32000000, status: "Received", priority: "Low", requestedBy: "Siti Rahma" },
  { id: 7, poNo: "PO-2026-00046", date: "19/06/2026", title: "Chemical Solvents", supplier: "PT Chemindo", items: 2, totalAmount: 210000000, status: "Draft", priority: "Medium", requestedBy: "Fauzi Mukhammad" },
  { id: 8, poNo: "PO-2026-00045", date: "18/06/2026", title: "Safety Gear Bundle", supplier: "PT Safety First", items: 7, totalAmount: 112000000, status: "Sent", priority: "Medium", requestedBy: "Rizky Pratama" },
  { id: 9, poNo: "PO-2026-00044", date: "17/06/2026", title: "Logistics Equipment", supplier: "PT Logistik Nusantara", items: 4, totalAmount: 89000000, status: "Approved", priority: "High", requestedBy: "Budi Santoso" },
  { id: 10, poNo: "PO-2026-00043", date: "16/06/2026", title: "Printing Materials", supplier: "PT Kreatif Media", items: 6, totalAmount: 45000000, status: "Cancelled", priority: "Low", requestedBy: "Siti Rahma" },
  { id: 11, poNo: "PO-2026-00042", date: "15/06/2026", title: "Vehicle Spare Parts", supplier: "PT Bengkel Sentral", items: 9, totalAmount: 175000000, status: "Partial", priority: "Medium", requestedBy: "Fauzi Mukhammad" },
  { id: 12, poNo: "PO-2026-00041", date: "14/06/2026", title: "Server Racks & UPS", supplier: "PT Data Center Indo", items: 3, totalAmount: 520000000, status: "Pending", priority: "High", requestedBy: "Diana Putri" },
];

export function formatRp(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export default purchaseOrders;
