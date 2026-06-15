export type CurrencyItem = {
  id: number;
  code: string;
  currencyName: string;
  symbol: string;
  country: string;
  decimalPlaces: number;
  baseCurrency: "Yes" | "No";
  status: "Active" | "Inactive";
  statusColor: string;
};

export const countries = [
  "All Country",
  "Indonesia",
  "United States",
  "Singapore",
  "European Union",
  "Japan",
  "Malaysia",
  "Thailand",
  "Australia",
  "United Kingdom",
  "China",
];

export const baseCurrencyOptions = ["All Base Currency", "Yes", "No"];

export const currencies: CurrencyItem[] = [
  {
    id: 1,
    code: "IDR",
    currencyName: "Indonesian Rupiah",
    symbol: "Rp",
    country: "Indonesia",
    decimalPlaces: 0,
    baseCurrency: "Yes",
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  },
  {
    id: 2,
    code: "USD",
    currencyName: "United States Dollar",
    symbol: "$",
    country: "United States",
    decimalPlaces: 2,
    baseCurrency: "No",
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  },
  {
    id: 3,
    code: "SGD",
    currencyName: "Singapore Dollar",
    symbol: "S$",
    country: "Singapore",
    decimalPlaces: 2,
    baseCurrency: "No",
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  },
  {
    id: 4,
    code: "EUR",
    currencyName: "Euro",
    symbol: "€",
    country: "European Union",
    decimalPlaces: 2,
    baseCurrency: "No",
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  },
  {
    id: 5,
    code: "JPY",
    currencyName: "Japanese Yen",
    symbol: "¥",
    country: "Japan",
    decimalPlaces: 0,
    baseCurrency: "No",
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  },
  {
    id: 6,
    code: "MYR",
    currencyName: "Malaysian Ringgit",
    symbol: "RM",
    country: "Malaysia",
    decimalPlaces: 2,
    baseCurrency: "No",
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  },
  {
    id: 7,
    code: "THB",
    currencyName: "Thai Baht",
    symbol: "฿",
    country: "Thailand",
    decimalPlaces: 2,
    baseCurrency: "No",
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  },
  {
    id: 8,
    code: "AUD",
    currencyName: "Australian Dollar",
    symbol: "A$",
    country: "Australia",
    decimalPlaces: 2,
    baseCurrency: "No",
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  },
  {
    id: 9,
    code: "GBP",
    currencyName: "British Pound",
    symbol: "£",
    country: "United Kingdom",
    decimalPlaces: 2,
    baseCurrency: "No",
    status: "Inactive",
    statusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
  },
  {
    id: 10,
    code: "CNY",
    currencyName: "Chinese Yuan",
    symbol: "¥",
    country: "China",
    decimalPlaces: 2,
    baseCurrency: "No",
    status: "Inactive",
    statusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
  },
];

export const statCards = [
  { label: "Total Currencies", value: 29, sub: "All configured currencies", iconBg: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-700 dark:text-blue-400", icon: "currency" },
  { label: "Active Currencies", value: 27, sub: "Available for transaction", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500", icon: "check" },
  { label: "Inactive Currencies", value: 2, sub: "Retired entries", iconBg: "bg-red-50 dark:bg-red-950", iconColor: "text-red-500", icon: "pause" },
  { label: "Base Currency", value: "IDR", sub: "Default system currency", iconBg: "bg-violet-50 dark:bg-violet-950", iconColor: "text-violet-700 dark:text-violet-400", icon: "banknote" },
  { label: "Last Updated", value: "Today", sub: "Master data synchronized", iconBg: "bg-amber-50 dark:bg-amber-950", iconColor: "text-amber-500", icon: "clock" },
];
