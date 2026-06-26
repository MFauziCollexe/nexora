export const statCards = [
  { label: "Total Purchase Value", value: "Rp 8,2 M", sub: "Year to date", icon: "dollar-sign", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "Total PR", value: 245, sub: "Purchase requests YTD", icon: "file-text", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-indigo-500" },
  { label: "Total PO", value: 189, sub: "Purchase orders issued", icon: "shopping-cart", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-emerald-500" },
  { label: "Total GR", value: 178, sub: "Goods received", icon: "package", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
  { label: "Active Suppliers", value: 34, sub: "With transactions this year", icon: "users", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-cyan-500" },
];

export interface MonthlySummary {
  month: string;
  prCount: number;
  poCount: number;
  grCount: number;
  totalValue: string;
}

export const monthlyData: MonthlySummary[] = [
  { month: "Jan", prCount: 22, poCount: 18, grCount: 16, totalValue: "Rp 720 Jt" },
  { month: "Feb", prCount: 18, poCount: 14, grCount: 13, totalValue: "Rp 580 Jt" },
  { month: "Mar", prCount: 25, poCount: 20, grCount: 19, totalValue: "Rp 890 Jt" },
  { month: "Apr", prCount: 20, poCount: 16, grCount: 15, totalValue: "Rp 650 Jt" },
  { month: "May", prCount: 28, poCount: 22, grCount: 21, totalValue: "Rp 1,1 M" },
  { month: "Jun", prCount: 30, poCount: 24, grCount: 22, totalValue: "Rp 1,3 M" },
  { month: "Jul", prCount: 26, poCount: 20, grCount: 18, totalValue: "Rp 980 Jt" },
  { month: "Aug", prCount: 22, poCount: 17, grCount: 16, totalValue: "Rp 740 Jt" },
  { month: "Sep", prCount: 18, poCount: 14, grCount: 13, totalValue: "Rp 520 Jt" },
  { month: "Oct", prCount: 15, poCount: 11, grCount: 10, totalValue: "Rp 410 Jt" },
  { month: "Nov", prCount: 12, poCount: 8, grCount: 8, totalValue: "Rp 320 Jt" },
  { month: "Dec", prCount: 9, poCount: 5, grCount: 7, totalValue: "Rp 210 Jt" },
];

export interface DocStatusSummary {
  label: string;
  draft: number;
  active: number;
  completed: number;
  cancelled: number;
  total: number;
}

export const docStatusData: DocStatusSummary[] = [
  { label: "Purchase Request", draft: 18, active: 35, completed: 175, cancelled: 17, total: 245 },
  { label: "RFQ", draft: 12, active: 28, completed: 142, cancelled: 10, total: 192 },
  { label: "Purchase Order", draft: 15, active: 42, completed: 120, cancelled: 12, total: 189 },
  { label: "Purchase Contract", draft: 5, active: 18, completed: 8, cancelled: 3, total: 34 },
  { label: "Goods Receipt", draft: 8, active: 0, completed: 158, cancelled: 12, total: 178 },
  { label: "Supplier Return", draft: 6, active: 0, completed: 22, cancelled: 6, total: 34 },
  { label: "Supplier Invoice", draft: 10, active: 45, completed: 58, cancelled: 4, total: 117 },
];

export const topSuppliers = [
  { name: "PT Komputer Jaya", totalPo: 24, totalValue: "Rp 1,8 M", percent: 22 },
  { name: "PT Kimia Farma", totalPo: 18, totalValue: "Rp 1,2 M", percent: 15 },
  { name: "PT Indopack", totalPo: 15, totalValue: "Rp 980 Jt", percent: 12 },
  { name: "PT Safety First", totalPo: 12, totalValue: "Rp 750 Jt", percent: 9 },
  { name: "PT Bersih Sejahtera", totalPo: 10, totalValue: "Rp 620 Jt", percent: 8 },
];
