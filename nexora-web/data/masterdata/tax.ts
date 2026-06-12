export const statCards = [
  { label: "Total Taxes", value: 18, sub: "All configured taxes", iconBg: "bg-blue-100", iconColor: "text-blue-600", icon: "check" },
  { label: "Active Taxes", value: 14, sub: "Currently active", iconBg: "bg-emerald-100", iconColor: "text-emerald-600", icon: "online" },
  { label: "Inactive Taxes", value: 4, sub: "Currently inactive", iconBg: "bg-slate-100", iconColor: "text-slate-600", icon: "pause" },
  { label: "Tax Rate Average", value: "10.42%", sub: "Average tax rate", iconBg: "bg-violet-100", iconColor: "text-violet-600", icon: "crown" },
  { label: "Last Updated", value: "Today", sub: "Latest tax changes", iconBg: "bg-slate-100", iconColor: "text-slate-700", icon: "shield" },
];

export type TaxItem = {
  id: number;
  code: string;
  name: string;
  type: string;
  category: string;
  rate: string;
  basis: string;
  status: string;
  statusColor: string;
};

export const taxes: TaxItem[] = [
  { id: 1, code: "TAX-PPN-11", name: "PPN 11%", type: "Percentage", category: "VAT", rate: "11.00", basis: "DPP (Tax Base)", status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: 2, code: "TAX-PPN-12", name: "PPN 12%", type: "Percentage", category: "VAT", rate: "12.00", basis: "DPP (Tax Base)", status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: 3, code: "TAX-PPnBM-10", name: "PPnBM 10%", type: "Percentage", category: "Excise", rate: "10.00", basis: "DPP (Tax Base)", status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: 4, code: "TAX-PPH-22", name: "PPH 22 (1.5%)", type: "Percentage", category: "Withholding", rate: "1.50", basis: "DPP (Tax Base)", status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: 5, code: "TAX-PPH-23", name: "PPH 23 (2%)", type: "Percentage", category: "Withholding", rate: "2.00", basis: "DPP (Tax Base)", status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: 6, code: "TAX-PPH-4-2", name: "PPH Final 4(2)", type: "Percentage", category: "Final", rate: "2.00", basis: "DPP (Tax Base)", status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: 7, code: "TAX-NON", name: "Non Taxable", type: "None", category: "Other", rate: "0.00", basis: "-", status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: 8, code: "TAX-OUT-O", name: "Outside Scope", type: "None", category: "Other", rate: "0.00", basis: "-", status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: 9, code: "TAX-EXPORT", name: "Export 0%", type: "Percentage", category: "VAT", rate: "0.00", basis: "DPP (Tax Base)", status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: 10, code: "TAX-INACTIVE", name: "Old Tax 10%", type: "Percentage", category: "VAT", rate: "10.00", basis: "DPP (Tax Base)", status: "Inactive", statusColor: "bg-slate-100 text-slate-600" },
];
