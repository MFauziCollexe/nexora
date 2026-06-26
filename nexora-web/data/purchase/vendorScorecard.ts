export const statCards = [
  { label: "Suppliers Scored", value: 24, sub: "With active scorecards", icon: "users", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "Excellent", value: 6, sub: "Score ≥85", icon: "award", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-emerald-500" },
  { label: "Good", value: 10, sub: "Score 70-84", icon: "thumbs-up", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "Needs Improvement", value: 8, sub: "Score <70", icon: "alert-circle", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-amber-500" },
];

export interface CriterionScore {
  name: string;
  score: number;
  weight: number;
}

export interface VendorScorecardItem {
  id: number;
  supplier: string;
  category: string;
  totalEvaluations: number;
  lastEvaluation: string;
  overallScore: number;
  rating: "Excellent" | "Good" | "Fair" | "Poor";
  criteria: CriterionScore[];
}

export const vendorScorecards: VendorScorecardItem[] = [
  {
    id: 1, supplier: "PT Komputer Jaya", category: "Electronics", totalEvaluations: 6, lastEvaluation: "Q2-2026", overallScore: 92, rating: "Excellent",
    criteria: [
      { name: "Quality", score: 95, weight: 30 },
      { name: "Delivery", score: 90, weight: 25 },
      { name: "Price", score: 88, weight: 20 },
      { name: "Service", score: 95, weight: 15 },
      { name: "Compliance", score: 92, weight: 10 },
    ],
  },
  {
    id: 2, supplier: "PT Kreatif Media", category: "Marketing", totalEvaluations: 4, lastEvaluation: "Q2-2026", overallScore: 95, rating: "Excellent",
    criteria: [
      { name: "Quality", score: 98, weight: 30 },
      { name: "Delivery", score: 92, weight: 25 },
      { name: "Price", score: 90, weight: 20 },
      { name: "Service", score: 100, weight: 15 },
      { name: "Compliance", score: 95, weight: 10 },
    ],
  },
  {
    id: 3, supplier: "PT Indopack", category: "Packaging", totalEvaluations: 5, lastEvaluation: "Q2-2026", overallScore: 88, rating: "Excellent",
    criteria: [
      { name: "Quality", score: 90, weight: 30 },
      { name: "Delivery", score: 85, weight: 25 },
      { name: "Price", score: 92, weight: 20 },
      { name: "Service", score: 85, weight: 15 },
      { name: "Compliance", score: 88, weight: 10 },
    ],
  },
  {
    id: 4, supplier: "PT Bersih Sejahtera", category: "Cleaning Supplies", totalEvaluations: 4, lastEvaluation: "Q2-2026", overallScore: 85, rating: "Excellent",
    criteria: [
      { name: "Quality", score: 82, weight: 30 },
      { name: "Delivery", score: 90, weight: 25 },
      { name: "Price", score: 80, weight: 20 },
      { name: "Service", score: 88, weight: 15 },
      { name: "Compliance", score: 85, weight: 10 },
    ],
  },
  {
    id: 5, supplier: "PT Safety First", category: "Safety Equipment", totalEvaluations: 3, lastEvaluation: "Q2-2026", overallScore: 82, rating: "Good",
    criteria: [
      { name: "Quality", score: 85, weight: 30 },
      { name: "Delivery", score: 78, weight: 25 },
      { name: "Price", score: 80, weight: 20 },
      { name: "Service", score: 85, weight: 15 },
      { name: "Compliance", score: 82, weight: 10 },
    ],
  },
  {
    id: 6, supplier: "PT Data Center Indo", category: "IT Services", totalEvaluations: 3, lastEvaluation: "Q2-2026", overallScore: 80, rating: "Good",
    criteria: [
      { name: "Quality", score: 82, weight: 30 },
      { name: "Delivery", score: 75, weight: 25 },
      { name: "Price", score: 78, weight: 20 },
      { name: "Service", score: 85, weight: 15 },
      { name: "Compliance", score: 80, weight: 10 },
    ],
  },
  {
    id: 7, supplier: "PT Kimia Farma", category: "Chemicals", totalEvaluations: 5, lastEvaluation: "Q2-2026", overallScore: 78, rating: "Good",
    criteria: [
      { name: "Quality", score: 80, weight: 30 },
      { name: "Delivery", score: 75, weight: 25 },
      { name: "Price", score: 82, weight: 20 },
      { name: "Service", score: 75, weight: 15 },
      { name: "Compliance", score: 78, weight: 10 },
    ],
  },
  {
    id: 8, supplier: "PT Logistik Nusantara", category: "Logistics", totalEvaluations: 3, lastEvaluation: "Q1-2026", overallScore: 72, rating: "Good",
    criteria: [
      { name: "Quality", score: 70, weight: 30 },
      { name: "Delivery", score: 75, weight: 25 },
      { name: "Price", score: 72, weight: 20 },
      { name: "Service", score: 70, weight: 15 },
      { name: "Compliance", score: 73, weight: 10 },
    ],
  },
  {
    id: 9, supplier: "PT Teknik Utama", category: "Spare Parts", totalEvaluations: 4, lastEvaluation: "Q2-2026", overallScore: 65, rating: "Fair",
    criteria: [
      { name: "Quality", score: 68, weight: 30 },
      { name: "Delivery", score: 60, weight: 25 },
      { name: "Price", score: 70, weight: 20 },
      { name: "Service", score: 62, weight: 15 },
      { name: "Compliance", score: 65, weight: 10 },
    ],
  },
  {
    id: 10, supplier: "PT Bengkel Sentral", category: "Maintenance", totalEvaluations: 2, lastEvaluation: "Q1-2026", overallScore: 60, rating: "Fair",
    criteria: [
      { name: "Quality", score: 62, weight: 30 },
      { name: "Delivery", score: 58, weight: 25 },
      { name: "Price", score: 65, weight: 20 },
      { name: "Service", score: 55, weight: 15 },
      { name: "Compliance", score: 60, weight: 10 },
    ],
  },
  {
    id: 11, supplier: "PT Chemindo", category: "Chemicals", totalEvaluations: 3, lastEvaluation: "Q2-2026", overallScore: 55, rating: "Poor",
    criteria: [
      { name: "Quality", score: 50, weight: 30 },
      { name: "Delivery", score: 55, weight: 25 },
      { name: "Price", score: 60, weight: 20 },
      { name: "Service", score: 52, weight: 15 },
      { name: "Compliance", score: 58, weight: 10 },
    ],
  },
  {
    id: 12, supplier: "PT ATK Makmur", category: "Office Supplies", totalEvaluations: 2, lastEvaluation: "Q1-2026", overallScore: 75, rating: "Good",
    criteria: [
      { name: "Quality", score: 78, weight: 30 },
      { name: "Delivery", score: 72, weight: 25 },
      { name: "Price", score: 76, weight: 20 },
      { name: "Service", score: 74, weight: 15 },
      { name: "Compliance", score: 75, weight: 10 },
    ],
  },
];

export default vendorScorecards;
