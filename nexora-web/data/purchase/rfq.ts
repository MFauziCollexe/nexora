export const statCards = [
  { label: "Total RFQ", value: 36, sub: "All time RFQs", icon: "file-text", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "Open", value: 8, sub: "Awaiting responses", icon: "clock", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
  { label: "Sent", value: 14, sub: "Sent to suppliers", icon: "send", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-indigo-500" },
  { label: "Closed", value: 11, sub: "Completed RFQs", icon: "check", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-emerald-500" },
  { label: "Total Value", value: "Rp 1.2 Miliar", sub: "Total RFQ value", icon: "dollar-sign", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-indigo-500" },
];

export type RfqItem = {
  id: number;
  rfqNo: string;
  date: string;
  title: string;
  supplier: string;
  items: number;
  totalAmount: number;
  status: "Draft" | "Sent" | "Open" | "Closed" | "Cancelled";
  priority: "High" | "Medium" | "Low";
  requestedBy: string;
};

export const rfqs: RfqItem[] = [
  { id: 1, rfqNo: "RFQ-2026-00036", date: "25/06/2026", title: "Raw Material Q1", supplier: "PT Kimia Farma", items: 8, totalAmount: 350000000, status: "Sent", priority: "High", requestedBy: "Fauzi Mukhammad" },
  { id: 2, rfqNo: "RFQ-2026-00035", date: "24/06/2026", title: "Packaging Materials", supplier: "PT Indopack", items: 5, totalAmount: 185000000, status: "Open", priority: "Medium", requestedBy: "Rizky Pratama" },
  { id: 3, rfqNo: "RFQ-2026-00034", date: "23/06/2026", title: "Office Supplies", supplier: "PT ATK Makmur", items: 12, totalAmount: 45000000, status: "Closed", priority: "Low", requestedBy: "Diana Putri" },
  { id: 4, rfqNo: "RFQ-2026-00033", date: "22/06/2026", title: "Machine Spare Parts", supplier: "PT Teknik Utama", items: 6, totalAmount: 520000000, status: "Draft", priority: "High", requestedBy: "Budi Santoso" },
  { id: 5, rfqNo: "RFQ-2026-00032", date: "21/06/2026", title: "IT Equipment", supplier: "PT Komputer Jaya", items: 10, totalAmount: 275000000, status: "Sent", priority: "High", requestedBy: "Diana Putri" },
  { id: 6, rfqNo: "RFQ-2026-00031", date: "20/06/2026", title: "Cleaning Services", supplier: "PT Bersih Sejahtera", items: 3, totalAmount: 96000000, status: "Closed", priority: "Low", requestedBy: "Siti Rahma" },
  { id: 7, rfqNo: "RFQ-2026-00030", date: "19/06/2026", title: "Chemical Raw Materials", supplier: "PT Chemindo", items: 4, totalAmount: 420000000, status: "Open", priority: "Medium", requestedBy: "Fauzi Mukhammad" },
  { id: 8, rfqNo: "RFQ-2026-00029", date: "18/06/2026", title: "Safety Equipment", supplier: "PT Safety First", items: 7, totalAmount: 125000000, status: "Sent", priority: "Medium", requestedBy: "Rizky Pratama" },
  { id: 9, rfqNo: "RFQ-2026-00028", date: "17/06/2026", title: "Logistics Services", supplier: "PT Logistik Nusantara", items: 2, totalAmount: 78000000, status: "Open", priority: "High", requestedBy: "Budi Santoso" },
  { id: 10, rfqNo: "RFQ-2026-00027", date: "16/06/2026", title: "Marketing Materials", supplier: "PT Kreatif Media", items: 5, totalAmount: 35000000, status: "Cancelled", priority: "Low", requestedBy: "Siti Rahma" },
  { id: 11, rfqNo: "RFQ-2026-00026", date: "15/06/2026", title: "Fleet Maintenance", supplier: "PT Bengkel Sentral", items: 9, totalAmount: 210000000, status: "Closed", priority: "Medium", requestedBy: "Fauzi Mukhammad" },
  { id: 12, rfqNo: "RFQ-2026-00025", date: "14/06/2026", title: "Server Infrastructure", supplier: "PT Data Center Indo", items: 4, totalAmount: 650000000, status: "Draft", priority: "High", requestedBy: "Diana Putri" },
];

export function formatRp(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export default rfqs;
