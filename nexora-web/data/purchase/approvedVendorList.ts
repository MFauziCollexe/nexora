export const statCards = [
  { label: "Approved Vendors", value: 28, sub: "Total approved suppliers", icon: "check-circle", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "Pending", value: 4, sub: "Awaiting approval", icon: "clock", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
  { label: "Suspended", value: 2, sub: "Temporarily suspended", icon: "pause", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-rose-500" },
  { label: "Expiring Soon", value: 3, sub: "Within 30 days", icon: "alert-triangle", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-orange-500" },
];

export type ApprovedVendorItem = {
  id: number;
  vendorCode: string;
  supplier: string;
  city: string;
  category: string;
  certification: string;
  approvalStatus: "Approved" | "Pending" | "Suspended" | "Revoked";
  approvalDate: string;
  expiryDate: string;
  nextReview: string;
};

export const approvedVendors: ApprovedVendorItem[] = [
  { id: 1, vendorCode: "VND-001", supplier: "PT Komputer Jaya", city: "Jakarta", category: "Electronics", certification: "ISO 9001:2020", approvalStatus: "Approved", approvalDate: "15/01/2025", expiryDate: "15/01/2027", nextReview: "15/10/2026" },
  { id: 2, vendorCode: "VND-002", supplier: "PT Kimia Farma", city: "Bandung", category: "Chemicals", certification: "ISO 14001:2020", approvalStatus: "Approved", approvalDate: "20/02/2025", expiryDate: "20/02/2027", nextReview: "20/11/2026" },
  { id: 3, vendorCode: "VND-003", supplier: "PT Bersih Sejahtera", city: "Tangerang", category: "Cleaning Supplies", certification: "SNI", approvalStatus: "Approved", approvalDate: "10/03/2025", expiryDate: "10/03/2027", nextReview: "10/12/2026" },
  { id: 4, vendorCode: "VND-004", supplier: "PT Indopack", city: "Surabaya", category: "Packaging", certification: "ISO 9001:2020", approvalStatus: "Approved", approvalDate: "05/04/2025", expiryDate: "05/04/2027", nextReview: "05/01/2027" },
  { id: 5, vendorCode: "VND-005", supplier: "PT Safety First", city: "Jakarta", category: "Safety Equipment", certification: "SNI", approvalStatus: "Approved", approvalDate: "12/05/2025", expiryDate: "12/05/2027", nextReview: "12/02/2027" },
  { id: 6, vendorCode: "VND-006", supplier: "PT Teknik Utama", city: "Bandung", category: "Spare Parts", certification: "ISO 9001:2020", approvalStatus: "Suspended", approvalDate: "01/03/2025", expiryDate: "01/03/2027", nextReview: "01/08/2026" },
  { id: 7, vendorCode: "VND-007", supplier: "PT Logistik Nusantara", city: "Jakarta", category: "Logistics", certification: "ISO 27001", approvalStatus: "Approved", approvalDate: "20/06/2025", expiryDate: "20/06/2027", nextReview: "20/03/2027" },
  { id: 8, vendorCode: "VND-008", supplier: "PT Data Center Indo", city: "Jakarta", category: "IT Services", certification: "ISO 27001", approvalStatus: "Pending", approvalDate: "-", expiryDate: "-", nextReview: "-" },
  { id: 9, vendorCode: "VND-009", supplier: "PT Chemindo", city: "Cilegon", category: "Chemicals", certification: "ISO 14001:2020", approvalStatus: "Approved", approvalDate: "15/08/2025", expiryDate: "15/08/2027", nextReview: "15/05/2027" },
  { id: 10, vendorCode: "VND-010", supplier: "PT Kreatif Media", city: "Jakarta", category: "Marketing", certification: "-", approvalStatus: "Pending", approvalDate: "-", expiryDate: "-", nextReview: "-" },
  { id: 11, vendorCode: "VND-011", supplier: "PT Bengkel Sentral", city: "Bekasi", category: "Maintenance", certification: "SNI", approvalStatus: "Approved", approvalDate: "10/09/2025", expiryDate: "10/09/2027", nextReview: "10/06/2027" },
  { id: 12, vendorCode: "VND-012", supplier: "PT ATK Makmur", city: "Surabaya", category: "Office Supplies", certification: "-", approvalStatus: "Approved", approvalDate: "25/10/2025", expiryDate: "25/10/2027", nextReview: "25/07/2027" },
];

export default approvedVendors;
