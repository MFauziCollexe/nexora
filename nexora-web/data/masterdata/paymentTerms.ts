export const statCards = [
  { label: "Total Payment Terms", value: 10, sub: "All configured terms", iconBg: "bg-blue-100", iconColor: "text-blue-600", icon: "check" },
  { label: "Active Terms", value: 8, sub: "Currently available", iconBg: "bg-emerald-100", iconColor: "text-emerald-600", icon: "online" },
  { label: "Inactive Terms", value: 2, sub: "Retired entries", iconBg: "bg-slate-100", iconColor: "text-slate-600", icon: "pause" },
  { label: "Average Due Days", value: 21, sub: "Across active terms", iconBg: "bg-indigo-100", iconColor: "text-indigo-600", icon: "crown" },
  { label: "Last Updated", value: "Today", sub: "Payment schedule data", iconBg: "bg-slate-100", iconColor: "text-slate-700", icon: "shield" },
];

export type PaymentTerm = {
  id: number;
  code: string;
  name: string;
  type: string;
  description: string;
  dueDays: number | string;
  status: string;
  typeColor: string;
  statusColor: string;
};

export const paymentTerms: PaymentTerm[] = [
  {
    id: 1,
    code: "NET-0",
    name: "Cash On Delivery",
    type: "Cash",
    description: "Payment is due immediately.",
    dueDays: 0,
    status: "Active",
    typeColor: "bg-emerald-100 text-emerald-700",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 2,
    code: "NET-7",
    name: "Net 7 Days",
    type: "Credit",
    description: "Payment is due within 7 days.",
    dueDays: 7,
    status: "Active",
    typeColor: "bg-blue-100 text-blue-700",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 3,
    code: "NET-14",
    name: "Net 14 Days",
    type: "Credit",
    description: "Payment is due within 14 days.",
    dueDays: 14,
    status: "Active",
    typeColor: "bg-blue-100 text-blue-700",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 4,
    code: "NET-30",
    name: "Net 30 Days",
    type: "Credit",
    description: "Payment is due within 30 days.",
    dueDays: 30,
    status: "Active",
    typeColor: "bg-blue-100 text-blue-700",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 5,
    code: "NET-45",
    name: "Net 45 Days",
    type: "Credit",
    description: "Payment is due within 45 days.",
    dueDays: 45,
    status: "Active",
    typeColor: "bg-blue-100 text-blue-700",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 6,
    code: "NET-60",
    name: "Net 60 Days",
    type: "Credit",
    description: "Payment is due within 60 days.",
    dueDays: 60,
    status: "Inactive",
    typeColor: "bg-blue-100 text-blue-700",
    statusColor: "bg-slate-100 text-slate-600",
  },
  {
    id: 7,
    code: "EOM",
    name: "End Of Month",
    type: "Others",
    description: "Payment is due at the end of the month.",
    dueDays: "EOM",
    status: "Active",
    typeColor: "bg-slate-100 text-slate-700",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 8,
    code: "COD",
    name: "Cash On Delivery",
    type: "Cash",
    description: "Payment is made when goods are delivered.",
    dueDays: 0,
    status: "Inactive",
    typeColor: "bg-emerald-100 text-emerald-700",
    statusColor: "bg-slate-100 text-slate-600",
  },
  {
    id: 9,
    code: "2/10 NET 30",
    name: "2% 10 Days, Net 30",
    type: "Credit",
    description: "2% discount if paid within 10 days, full amount due in 30 days.",
    dueDays: 30,
    status: "Active",
    typeColor: "bg-blue-100 text-blue-700",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 10,
    code: "1/15 NET 30",
    name: "1% 15 Days, Net 30",
    type: "Credit",
    description: "1% discount if paid within 15 days, full amount due in 30 days.",
    dueDays: 30,
    status: "Active",
    typeColor: "bg-blue-100 text-blue-700",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
];
