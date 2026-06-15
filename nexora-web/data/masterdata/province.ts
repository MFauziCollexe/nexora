export type ProvinceItem = {
  id: number;
  code: string;
  provinceName: string;
  country: string;
  countryCode: string;
  status: "Active" | "Inactive";
  statusColor: string;
};

export const countries = [
  "All Country",
  "Indonesia",
  "Malaysia",
  "Singapore",
  "Thailand",
];

export const provinces: ProvinceItem[] = [
  { id: 1, code: "JK", provinceName: "DKI Jakarta", country: "Indonesia", countryCode: "ID", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 2, code: "JB", provinceName: "Jawa Barat", country: "Indonesia", countryCode: "ID", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 3, code: "JT", provinceName: "Jawa Timur", country: "Indonesia", countryCode: "ID", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 4, code: "JTENG", provinceName: "Jawa Tengah", country: "Indonesia", countryCode: "ID", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 5, code: "BA", provinceName: "Bali", country: "Indonesia", countryCode: "ID", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 6, code: "SA", provinceName: "Sumatera Utara", country: "Indonesia", countryCode: "ID", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 7, code: "SB", provinceName: "Sumatera Barat", country: "Indonesia", countryCode: "ID", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 8, code: "SS", provinceName: "Sulawesi Selatan", country: "Indonesia", countryCode: "ID", status: "Inactive", statusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" },
  { id: 9, code: "KR", provinceName: "Kalimantan Raya", country: "Indonesia", countryCode: "ID", status: "Inactive", statusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" },
  { id: 10, code: "ST", provinceName: "Sumatera Selatan", country: "Indonesia", countryCode: "ID", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
];

export const statCards = [
  { label: "Total Provinces", value: 38, sub: "All configured provinces", iconBg: "bg-violet-50 dark:bg-violet-950", iconColor: "text-violet-700 dark:text-violet-400", icon: "shield" },
  { label: "Active Provinces", value: 37, sub: "Available for transaction", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500", icon: "check" },
  { label: "Inactive Provinces", value: 1, sub: "Retired entries", iconBg: "bg-red-50 dark:bg-red-950", iconColor: "text-red-500", icon: "pause" },
  { label: "Countries", value: 4, sub: "Available countries", iconBg: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-700 dark:text-blue-400", icon: "globe" },
  { label: "Last Updated", value: "Today", sub: "Master data synchronized", iconBg: "bg-amber-50 dark:bg-amber-950", iconColor: "text-amber-500", icon: "clock" },
];
