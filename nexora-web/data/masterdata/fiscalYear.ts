export const statCards = [
  { label: "Total Fiscal Years", value: 8, sub: "All fiscal years", iconBg: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-500", icon: "check" },
  { label: "Active", value: 1, sub: "Currently active", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500", icon: "online" },
  { label: "Closed", value: 5, sub: "Already closed", iconBg: "bg-slate-100 dark:bg-slate-800", iconColor: "text-slate-500", icon: "lock" },
  { label: "Upcoming", value: 2, sub: "Not yet started", iconBg: "bg-purple-50 dark:bg-purple-950", iconColor: "text-purple-500", icon: "shield" },
  { label: "Last Updated", value: "Today", sub: "Latest fiscal year data", iconBg: "bg-orange-50 dark:bg-orange-950", iconColor: "text-orange-500", icon: "crown" },
];

export const fiscalYears = [
  { id: 1, name: "FY 2026", startDate: "2026-01-01", endDate: "2026-12-31", active: true, closed: false, status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", updatedAt: "2026-06-26" },
  { id: 2, name: "FY 2025", startDate: "2025-01-01", endDate: "2025-12-31", active: false, closed: true, status: "Closed", statusColor: "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400", updatedAt: "2026-01-01" },
  { id: 3, name: "FY 2024", startDate: "2024-01-01", endDate: "2024-12-31", active: false, closed: true, status: "Closed", statusColor: "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400", updatedAt: "2025-01-01" },
  { id: 4, name: "FY 2023", startDate: "2023-01-01", endDate: "2023-12-31", active: false, closed: true, status: "Closed", statusColor: "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400", updatedAt: "2024-01-01" },
  { id: 5, name: "FY 2022", startDate: "2022-01-01", endDate: "2022-12-31", active: false, closed: true, status: "Closed", statusColor: "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400", updatedAt: "2023-01-01" },
  { id: 6, name: "FY 2021", startDate: "2021-01-01", endDate: "2021-12-31", active: false, closed: true, status: "Closed", statusColor: "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400", updatedAt: "2022-01-01" },
  { id: 7, name: "FY 2027", startDate: "2027-01-01", endDate: "2027-12-31", active: false, closed: false, status: "Upcoming", statusColor: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400", updatedAt: "2026-06-20" },
  { id: 8, name: "FY 2028", startDate: "2028-01-01", endDate: "2028-12-31", active: false, closed: false, status: "Upcoming", statusColor: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400", updatedAt: "2026-06-18" },
];

export default fiscalYears;
