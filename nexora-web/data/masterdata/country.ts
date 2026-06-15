export type CountryItem = {
  id: number;
  code: string;
  countryName: string;
  countryCode3: string;
  region: string;
  status: "Active" | "Inactive";
  statusColor: string;
};

export const regions = [
  "All Region",
  "Asia",
  "Europe",
  "North America",
  "Oceania",
  "Middle East",
];

export const countries: CountryItem[] = [
  { id: 1, code: "IDN", countryName: "Indonesia", countryCode3: "ID", region: "Asia", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 2, code: "SGP", countryName: "Singapore", countryCode3: "SG", region: "Asia", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 3, code: "MYS", countryName: "Malaysia", countryCode3: "MY", region: "Asia", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 4, code: "THA", countryName: "Thailand", countryCode3: "TH", region: "Asia", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 5, code: "PHL", countryName: "Philippines", countryCode3: "PH", region: "Asia", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 6, code: "AUS", countryName: "Australia", countryCode3: "AU", region: "Oceania", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 7, code: "JPN", countryName: "Japan", countryCode3: "JP", region: "Asia", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 8, code: "USA", countryName: "United States", countryCode3: "US", region: "North America", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 9, code: "GBR", countryName: "United Kingdom", countryCode3: "GB", region: "Europe", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 10, code: "CHN", countryName: "China", countryCode3: "CN", region: "Asia", status: "Inactive", statusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" },
];

export const statCards = [
  { label: "Total Countries", value: 249, sub: "All configured countries", iconBg: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-700 dark:text-blue-400", icon: "globe" },
  { label: "Active Countries", value: 246, sub: "Available for transaction", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500", icon: "check" },
  { label: "Inactive Countries", value: 3, sub: "Retired entries", iconBg: "bg-red-50 dark:bg-red-950", iconColor: "text-red-500", icon: "pause" },
  { label: "Most Used Country", value: "Indonesia", sub: "Most referenced", iconBg: "bg-violet-50 dark:bg-violet-950", iconColor: "text-violet-700 dark:text-violet-400", icon: "flag" },
  { label: "Last Updated", value: "Today", sub: "Master data synchronized", iconBg: "bg-amber-50 dark:bg-amber-950", iconColor: "text-amber-500", icon: "clock" },
];
