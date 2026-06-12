export const statCards = [
  { label: "Total Positions", value: 32, sub: "All positions", iconBg: "bg-indigo-50 dark:bg-indigo-950", iconColor: "text-indigo-500", icon: "users" },
  { label: "Active Positions", value: 28, sub: "Active now", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500", icon: "check" },
  { label: "Inactive Positions", value: 4, sub: "Inactive roles", iconBg: "bg-yellow-50 dark:bg-yellow-950", iconColor: "text-yellow-500", icon: "pause" },
  { label: "Departments", value: 5, sub: "HR departments", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-slate-500", icon: "shield" },
  { label: "Leadership", value: 6, sub: "Manager & exec", iconBg: "bg-purple-50 dark:bg-purple-950", iconColor: "text-purple-500", icon: "crown" },
];

export const positions = [
  { id: 1, code: "POS-001", name: "Chief Executive Officer", department: "Management", level: "Executive", description: "Oversees overall company strategy and operations.", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 2, code: "POS-002", name: "Human Resource Manager", department: "Human Resource", level: "Manager", description: "Leads HR programs, recruitment, and employee relations.", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 3, code: "POS-003", name: "Finance Manager", department: "Finance", level: "Manager", description: "Manages financial planning and accounting operations.", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 4, code: "POS-004", name: "Accounting Supervisor", department: "Finance", level: "Supervisor", description: "Supervises accounting team and financial transaction reviews.", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 5, code: "POS-005", name: "IT Support Specialist", department: "Information Technology", level: "Staff", description: "Provides technical support and system maintenance.", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 6, code: "POS-006", name: "Marketing Staff", department: "Marketing", level: "Staff", description: "Supports marketing campaigns and communications.", status: "Inactive", statusColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400" },
  { id: 7, code: "POS-007", name: "Sales Manager", department: "Sales", level: "Manager", description: "Drives sales strategy and manages the sales team.", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 8, code: "POS-008", name: "Quality Assurance", department: "Production", level: "Staff", description: "Ensures product quality and compliance.", status: "Inactive", statusColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400" },
];

export default positions;
