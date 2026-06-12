export const statCards = [
  { label: "Total Departments", value: 21, sub: "All departments", iconBg: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-500", icon: "users" },
  { label: "Active Departments", value: 19, sub: "Currently active", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500", icon: "check" },
  { label: "Inactive Departments", value: 2, sub: "Inactive units", iconBg: "bg-yellow-50 dark:bg-yellow-950", iconColor: "text-yellow-500", icon: "pause" },
  { label: "Parent Departments", value: 5, sub: "Top-level groups", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-slate-500", icon: "shield" },
  { label: "Department Heads", value: 18, sub: "Assigned heads", iconBg: "bg-purple-50 dark:bg-purple-950", iconColor: "text-purple-500", icon: "crown" },
];

export const departments = [
  { id: 1, code: "DEP-001", name: "Management", parent: "-", head: "Budi Santoso", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 2, code: "DEP-002", name: "Finance", parent: "Management", head: "Siti Aisyah", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 3, code: "DEP-003", name: "Accounting", parent: "Finance", head: "Rudi Hermawan", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 4, code: "DEP-004", name: "Tax", parent: "Finance", head: "Dewi Lestari", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 5, code: "DEP-005", name: "Human Resource", parent: "Management", head: "Andi Wijaya", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 6, code: "DEP-006", name: "Recruitment", parent: "Human Resource", head: "Andi Wijaya", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 7, code: "DEP-007", name: "Training & Development", parent: "Human Resource", head: "Lina Marlina", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 8, code: "DEP-008", name: "Information Technology", parent: "Management", head: "Agus Setiawan", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 9, code: "DEP-009", name: "Marketing", parent: "Management", head: "Nadia Kusuma", status: "Inactive", statusColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400" },
  { id: 10, code: "DEP-010", name: "Sales", parent: "Management", head: "Mira Rahma", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
];

export default departments;
