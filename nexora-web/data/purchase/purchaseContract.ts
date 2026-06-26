export const statCards = [
  { label: "Total Contracts", value: 24, sub: "All time contracts", icon: "file-text", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "Active", value: 14, sub: "Currently active", icon: "check", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-emerald-500" },
  { label: "Draft", value: 3, sub: "Not yet active", icon: "edit", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
  { label: "Expired", value: 5, sub: "Past contracts", icon: "clock", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-rose-500" },
  { label: "Total Value", value: "Rp 18.5 Miliar", sub: "Total contract value", icon: "dollar-sign", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-indigo-500" },
];

export type PurchaseContractItem = {
  id: number;
  contractNo: string;
  date: string;
  title: string;
  supplier: string;
  startDate: string;
  endDate: string;
  contractValue: number;
  status: "Draft" | "Active" | "Expired" | "Terminated" | "Renewed";
  paymentTerms: string;
};

export const purchaseContracts: PurchaseContractItem[] = [
  { id: 1, contractNo: "CNT-2026-00024", date: "01/01/2026", title: "Raw Material Supply 2026", supplier: "PT Kimia Farma", startDate: "01/01/2026", endDate: "31/12/2026", contractValue: 4500000000, status: "Active", paymentTerms: "Monthly" },
  { id: 2, contractNo: "CNT-2026-00023", date: "15/03/2026", title: "Packaging Supply Agreement", supplier: "PT Indopack", startDate: "01/04/2026", endDate: "31/03/2027", contractValue: 1800000000, status: "Active", paymentTerms: "Quarterly" },
  { id: 3, contractNo: "CNT-2026-00022", date: "10/06/2026", title: "IT Infrastructure Lease", supplier: "PT Komputer Jaya", startDate: "01/07/2026", endDate: "30/06/2028", contractValue: 5200000000, status: "Draft", paymentTerms: "Monthly" },
  { id: 4, contractNo: "CNT-2026-00021", date: "01/02/2025", title: "Cleaning Services 2025", supplier: "PT Bersih Sejahtera", startDate: "01/02/2025", endDate: "31/01/2026", contractValue: 360000000, status: "Expired", paymentTerms: "Monthly" },
  { id: 5, contractNo: "CNT-2026-00020", date: "20/04/2026", title: "Chemical Supply Contract", supplier: "PT Chemindo", startDate: "01/05/2026", endDate: "30/04/2027", contractValue: 2800000000, status: "Active", paymentTerms: "Quarterly" },
  { id: 6, contractNo: "CNT-2026-00019", date: "01/03/2024", title: "Machine Maintenance 2024", supplier: "PT Teknik Utama", startDate: "01/03/2024", endDate: "28/02/2026", contractValue: 960000000, status: "Expired", paymentTerms: "Semi-Annually" },
  { id: 7, contractNo: "CNT-2026-00018", date: "05/05/2026", title: "Safety Equipment Supply", supplier: "PT Safety First", startDate: "01/06/2026", endDate: "31/05/2027", contractValue: 750000000, status: "Active", paymentTerms: "Monthly" },
  { id: 8, contractNo: "CNT-2026-00017", date: "01/01/2026", title: "Logistics Partnership 2026", supplier: "PT Logistik Nusantara", startDate: "01/01/2026", endDate: "31/12/2026", contractValue: 1200000000, status: "Active", paymentTerms: "Monthly" },
  { id: 9, contractNo: "CNT-2026-00016", date: "10/08/2025", title: "Marketing Materials Print", supplier: "PT Kreatif Media", startDate: "01/09/2025", endDate: "31/08/2026", contractValue: 240000000, status: "Active", paymentTerms: "Monthly" },
  { id: 10, contractNo: "CNT-2026-00015", date: "15/06/2025", title: "Vehicle Maintenance Program", supplier: "PT Bengkel Sentral", startDate: "01/07/2025", endDate: "30/06/2026", contractValue: 520000000, status: "Terminated", paymentTerms: "Quarterly" },
  { id: 11, contractNo: "CNT-2026-00014", date: "20/02/2026", title: "Server Colocation", supplier: "PT Data Center Indo", startDate: "01/03/2026", endDate: "28/02/2027", contractValue: 840000000, status: "Active", paymentTerms: "Monthly" },
  { id: 12, contractNo: "CNT-2026-00013", date: "01/01/2023", title: "Raw Material Supply 2023", supplier: "PT Kimia Farma", startDate: "01/01/2023", endDate: "31/12/2023", contractValue: 3800000000, status: "Expired", paymentTerms: "Monthly" },
];

export function formatRp(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export default purchaseContracts;
