export const statCards = [
  { label: "Total Requests", value: 48, sub: "All time requests", icon: "file-text", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "Pending", value: 12, sub: "Awaiting approval", icon: "clock", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
  { label: "Approved", value: 28, sub: "Approved requests", icon: "check", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-emerald-500" },
  { label: "Rejected", value: 5, sub: "Rejected requests", icon: "pause", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-rose-500" },
  { label: "Total Value", value: "Rp 850 Juta", sub: "Total request value", icon: "dollar-sign", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-indigo-500" },
];

export type PurchaseRequestItem = {
  id: number;
  prNo: string;
  date: string;
  requestedBy: string;
  department: string;
  items: number;
  totalAmount: number;
  status: "Pending" | "Approved" | "Rejected" | "Draft";
  priority: "High" | "Medium" | "Low";
};

export const purchaseRequests: PurchaseRequestItem[] = [
  { id: 1, prNo: "PR-2026-00048", date: "25/06/2026", requestedBy: "Fauzi Mukhammad", department: "Production", items: 5, totalAmount: 185000000, status: "Pending", priority: "High" },
  { id: 2, prNo: "PR-2026-00047", date: "24/06/2026", requestedBy: "Rizky Pratama", department: "Warehouse", items: 3, totalAmount: 52000000, status: "Approved", priority: "Medium" },
  { id: 3, prNo: "PR-2026-00046", date: "23/06/2026", requestedBy: "Diana Putri", department: "IT", items: 8, totalAmount: 250000000, status: "Pending", priority: "High" },
  { id: 4, prNo: "PR-2026-00045", date: "22/06/2026", requestedBy: "Budi Santoso", department: "Production", items: 2, totalAmount: 35000000, status: "Approved", priority: "Low" },
  { id: 5, prNo: "PR-2026-00044", date: "21/06/2026", requestedBy: "Fauzi Mukhammad", department: "Production", items: 6, totalAmount: 98000000, status: "Rejected", priority: "Medium" },
  { id: 6, prNo: "PR-2026-00043", date: "20/06/2026", requestedBy: "Siti Rahma", department: "Marketing", items: 4, totalAmount: 45000000, status: "Approved", priority: "Medium" },
  { id: 7, prNo: "PR-2026-00042", date: "19/06/2026", requestedBy: "Rizky Pratama", department: "Warehouse", items: 7, totalAmount: 120000000, status: "Draft", priority: "Low" },
  { id: 8, prNo: "PR-2026-00041", date: "18/06/2026", requestedBy: "Diana Putri", department: "IT", items: 3, totalAmount: 75000000, status: "Approved", priority: "High" },
  { id: 9, prNo: "PR-2026-00040", date: "17/06/2026", requestedBy: "Budi Santoso", department: "Production", items: 10, totalAmount: 310000000, status: "Pending", priority: "High" },
  { id: 10, prNo: "PR-2026-00039", date: "16/06/2026", requestedBy: "Siti Rahma", department: "Marketing", items: 2, totalAmount: 28000000, status: "Approved", priority: "Low" },
  { id: 11, prNo: "PR-2026-00038", date: "15/06/2026", requestedBy: "Fauzi Mukhammad", department: "Production", items: 4, totalAmount: 65000000, status: "Rejected", priority: "Medium" },
  { id: 12, prNo: "PR-2026-00037", date: "14/06/2026", requestedBy: "Rizky Pratama", department: "Warehouse", items: 6, totalAmount: 88000000, status: "Approved", priority: "Medium" },
];

export function formatRp(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export default purchaseRequests;
