export const statCards = [
  { label: "Total Evaluations", value: 48, sub: "All time evaluations", icon: "clipboard", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "Completed", value: 36, sub: "Finalized evaluations", icon: "check", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-emerald-500" },
  { label: "Draft", value: 8, sub: "Not yet finalized", icon: "edit", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
  { label: "Avg Score", value: 78.5, sub: "Overall average", icon: "bar-chart", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-indigo-500" },
];

export type VendorEvaluationItem = {
  id: number;
  evaluationNo: string;
  date: string;
  period: string;
  supplier: string;
  category: string;
  overallScore: number;
  rating: "Excellent" | "Good" | "Fair" | "Poor";
  status: "Draft" | "Completed" | "Cancelled";
  evaluatedBy: string;
};

export const vendorEvaluations: VendorEvaluationItem[] = [
  { id: 1, evaluationNo: "EVAL-2026-00048", date: "25/06/2026", period: "Q2-2026", supplier: "PT Komputer Jaya", category: "Electronics", overallScore: 92, rating: "Excellent", status: "Completed", evaluatedBy: "Ahmad Rizki" },
  { id: 2, evaluationNo: "EVAL-2026-00047", date: "24/06/2026", period: "Q2-2026", supplier: "PT Bersih Sejahtera", category: "Cleaning Supplies", overallScore: 85, rating: "Excellent", status: "Completed", evaluatedBy: "Siti Rahma" },
  { id: 3, evaluationNo: "EVAL-2026-00046", date: "24/06/2026", period: "Q2-2026", supplier: "PT Kimia Farma", category: "Chemicals", overallScore: 78, rating: "Good", status: "Completed", evaluatedBy: "Fauzi Mukhammad" },
  { id: 4, evaluationNo: "EVAL-2026-00045", date: "23/06/2026", period: "Q2-2026", supplier: "PT Safety First", category: "Safety Equipment", overallScore: 82, rating: "Good", status: "Completed", evaluatedBy: "Rizky Pratama" },
  { id: 5, evaluationNo: "EVAL-2026-00044", date: "23/06/2026", period: "Q2-2026", supplier: "PT Indopack", category: "Packaging", overallScore: 88, rating: "Excellent", status: "Completed", evaluatedBy: "Rizky Pratama" },
  { id: 6, evaluationNo: "EVAL-2026-00043", date: "22/06/2026", period: "Q2-2026", supplier: "PT Teknik Utama", category: "Spare Parts", overallScore: 65, rating: "Fair", status: "Draft", evaluatedBy: "Budi Santoso" },
  { id: 7, evaluationNo: "EVAL-2026-00042", date: "22/06/2026", period: "Q2-2026", supplier: "PT Chemindo", category: "Chemicals", overallScore: 55, rating: "Poor", status: "Completed", evaluatedBy: "Fauzi Mukhammad" },
  { id: 8, evaluationNo: "EVAL-2026-00041", date: "21/06/2026", period: "Q1-2026", supplier: "PT Komputer Jaya", category: "Electronics", overallScore: 90, rating: "Excellent", status: "Completed", evaluatedBy: "Ahmad Rizki" },
  { id: 9, evaluationNo: "EVAL-2026-00040", date: "21/06/2026", period: "Q1-2026", supplier: "PT Logistik Nusantara", category: "Logistics", overallScore: 72, rating: "Good", status: "Draft", evaluatedBy: "Diana Putri" },
  { id: 10, evaluationNo: "EVAL-2026-00039", date: "20/06/2026", period: "Q1-2026", supplier: "PT Kreatif Media", category: "Marketing", overallScore: 95, rating: "Excellent", status: "Completed", evaluatedBy: "Siti Rahma" },
  { id: 11, evaluationNo: "EVAL-2026-00038", date: "20/06/2026", period: "Q1-2026", supplier: "PT Data Center Indo", category: "IT Services", overallScore: 80, rating: "Good", status: "Completed", evaluatedBy: "Diana Putri" },
  { id: 12, evaluationNo: "EVAL-2026-00037", date: "19/06/2026", period: "Q1-2026", supplier: "PT Bengkel Sentral", category: "Maintenance", overallScore: 60, rating: "Fair", status: "Cancelled", evaluatedBy: "Fauzi Mukhammad" },
];

export default vendorEvaluations;
