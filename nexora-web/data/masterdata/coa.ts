export const statCards = [
  { label: "Total Accounts", value: 256, sub: "All accounts", iconBg: "bg-blue-100", iconColor: "text-blue-600", icon: "check" },
  { label: "Active Accounts", value: 243, sub: "Currently active", iconBg: "bg-emerald-100", iconColor: "text-emerald-600", icon: "online" },
  { label: "Inactive Accounts", value: 13, sub: "Currently inactive", iconBg: "bg-slate-100", iconColor: "text-slate-600", icon: "pause" },
  { label: "Max Level", value: 5, sub: "Max level in COA", iconBg: "bg-indigo-100", iconColor: "text-indigo-600", icon: "crown" },
  { label: "Last Updated", value: "Today", sub: "Latest account data", iconBg: "bg-slate-100", iconColor: "text-slate-700", icon: "shield" },
];

export type CoaItem = {
  id: number;
  code: string;
  name: string;
  type: string;
  category: string;
  parent: string;
  level: number;
  status: string;
  statusColor: string;
};

export const coaItems: CoaItem[] = [
  { id: 1, code: "1000", name: "ASSETS", type: "Header", category: "Asset", parent: "-", level: 1, status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: 2, code: "1100", name: "CURRENT ASSETS", type: "Header", category: "Asset", parent: "1000 - ASSETS", level: 2, status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: 3, code: "1110", name: "Cash and Cash Equivalent", type: "Header", category: "Asset", parent: "1100 - CURRENT ASSETS", level: 3, status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: 4, code: "1111", name: "Cash on Hand", type: "Detail", category: "Asset", parent: "1110 - Cash and Cash Equivalent", level: 4, status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: 5, code: "1112", name: "Petty Cash", type: "Detail", category: "Asset", parent: "1110 - Cash and Cash Equivalent", level: 4, status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: 6, code: "1113", name: "Cash in Bank - BCA", type: "Detail", category: "Asset", parent: "1110 - Cash and Cash Equivalent", level: 4, status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: 7, code: "1114", name: "Cash in Bank - Mandiri", type: "Detail", category: "Asset", parent: "1110 - Cash and Cash Equivalent", level: 4, status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: 8, code: "1120", name: "Short Term Investment", type: "Header", category: "Asset", parent: "1100 - CURRENT ASSETS", level: 3, status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: 9, code: "1200", name: "RECEIVABLES", type: "Header", category: "Asset", parent: "1000 - ASSETS", level: 2, status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: 10, code: "1210", name: "Account Receivable - Trade", type: "Detail", category: "Asset", parent: "1200 - RECEIVABLES", level: 3, status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
];
