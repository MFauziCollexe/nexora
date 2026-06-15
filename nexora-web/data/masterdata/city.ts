export type CityItem = {
  id: number;
  code: string;
  cityName: string;
  province: string;
  postalCode: string;
  status: string;
  statusColor: string;
};

export const provinces = [
  "All Province",
  "Jawa Timur",
  "DKI Jakarta",
  "Jawa Barat",
  "Bali",
  "Sumatera Utara",
  "Sulawesi Selatan",
  "Jawa Tengah",
];

export const cities: CityItem[] = [
  { id: 1, code: "SBY", cityName: "Surabaya", province: "Jawa Timur", postalCode: "60111", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 2, code: "JKT", cityName: "Jakarta", province: "DKI Jakarta", postalCode: "10110", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 3, code: "BDG", cityName: "Bandung", province: "Jawa Barat", postalCode: "40111", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 4, code: "DPS", cityName: "Denpasar", province: "Bali", postalCode: "80221", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 5, code: "MDN", cityName: "Medan", province: "Sumatera Utara", postalCode: "20111", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 6, code: "MKS", cityName: "Makassar", province: "Sulawesi Selatan", postalCode: "90111", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 7, code: "PLM", cityName: "Palembang", province: "Sumatera Selatan", postalCode: "30111", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 8, code: "SMG", cityName: "Semarang", province: "Jawa Tengah", postalCode: "50111", status: "Inactive", statusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" },
];

export const statCards = [
  { label: "Total Cities", value: 514, sub: "All configured cities", iconBg: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-700 dark:text-blue-400", icon: "users" },
  { label: "Active Cities", value: 502, sub: "Available for transaction", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-700 dark:text-green-400", icon: "check" },
  { label: "Inactive Cities", value: 12, sub: "Retired entries", iconBg: "bg-red-50 dark:bg-red-950", iconColor: "text-red-700 dark:text-red-400", icon: "lock" },
  { label: "Total Provinces", value: 38, sub: "Across Indonesia", iconBg: "bg-violet-50 dark:bg-violet-950", iconColor: "text-violet-700 dark:text-violet-400", icon: "shield" },
];
