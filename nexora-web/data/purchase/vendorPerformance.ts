export const statCards = [
  { label: "Suppliers Tracked", value: 18, sub: "With performance history", icon: "users", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "Improving", value: 8, sub: "Upward trend", icon: "trending-up", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-emerald-500" },
  { label: "Stable", value: 6, sub: "Consistent scores", icon: "minus", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-blue-500" },
  { label: "Declining", value: 4, sub: "Downward trend", icon: "trending-down", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-rose-500" },
];

export interface PeriodScore {
  period: string;
  score: number;
  rating: string;
}

export interface VendorPerformanceItem {
  id: number;
  supplier: string;
  category: string;
  trend: "Improving" | "Stable" | "Declining";
  currentScore: number;
  previousScore: number;
  change: number;
  history: PeriodScore[];
}

export const vendorPerformances: VendorPerformanceItem[] = [
  {
    id: 1, supplier: "PT Komputer Jaya", category: "Electronics", trend: "Improving", currentScore: 92, previousScore: 88, change: 4,
    history: [
      { period: "Q1-2025", score: 78, rating: "Good" },
      { period: "Q2-2025", score: 82, rating: "Good" },
      { period: "Q3-2025", score: 80, rating: "Good" },
      { period: "Q4-2025", score: 85, rating: "Excellent" },
      { period: "Q1-2026", score: 88, rating: "Excellent" },
      { period: "Q2-2026", score: 92, rating: "Excellent" },
    ],
  },
  {
    id: 2, supplier: "PT Kreatif Media", category: "Marketing", trend: "Improving", currentScore: 95, previousScore: 90, change: 5,
    history: [
      { period: "Q2-2025", score: 80, rating: "Good" },
      { period: "Q3-2025", score: 82, rating: "Good" },
      { period: "Q4-2025", score: 85, rating: "Excellent" },
      { period: "Q1-2026", score: 90, rating: "Excellent" },
      { period: "Q2-2026", score: 95, rating: "Excellent" },
    ],
  },
  {
    id: 3, supplier: "PT Indopack", category: "Packaging", trend: "Stable", currentScore: 88, previousScore: 87, change: 1,
    history: [
      { period: "Q2-2025", score: 85, rating: "Excellent" },
      { period: "Q3-2025", score: 87, rating: "Excellent" },
      { period: "Q4-2025", score: 86, rating: "Excellent" },
      { period: "Q1-2026", score: 87, rating: "Excellent" },
      { period: "Q2-2026", score: 88, rating: "Excellent" },
    ],
  },
  {
    id: 4, supplier: "PT Kimia Farma", category: "Chemicals", trend: "Declining", currentScore: 78, previousScore: 85, change: -7,
    history: [
      { period: "Q2-2025", score: 88, rating: "Excellent" },
      { period: "Q3-2025", score: 86, rating: "Excellent" },
      { period: "Q4-2025", score: 85, rating: "Excellent" },
      { period: "Q1-2026", score: 82, rating: "Good" },
      { period: "Q2-2026", score: 78, rating: "Good" },
    ],
  },
  {
    id: 5, supplier: "PT Safety First", category: "Safety Equipment", trend: "Stable", currentScore: 82, previousScore: 83, change: -1,
    history: [
      { period: "Q3-2025", score: 80, rating: "Good" },
      { period: "Q4-2025", score: 82, rating: "Good" },
      { period: "Q1-2026", score: 83, rating: "Good" },
      { period: "Q2-2026", score: 82, rating: "Good" },
    ],
  },
  {
    id: 6, supplier: "PT Bersih Sejahtera", category: "Cleaning Supplies", trend: "Improving", currentScore: 85, previousScore: 80, change: 5,
    history: [
      { period: "Q3-2025", score: 72, rating: "Good" },
      { period: "Q4-2025", score: 75, rating: "Good" },
      { period: "Q1-2026", score: 80, rating: "Good" },
      { period: "Q2-2026", score: 85, rating: "Excellent" },
    ],
  },
  {
    id: 7, supplier: "PT Data Center Indo", category: "IT Services", trend: "Improving", currentScore: 80, previousScore: 76, change: 4,
    history: [
      { period: "Q4-2025", score: 70, rating: "Good" },
      { period: "Q1-2026", score: 76, rating: "Good" },
      { period: "Q2-2026", score: 80, rating: "Good" },
    ],
  },
  {
    id: 8, supplier: "PT Logistik Nusantara", category: "Logistics", trend: "Stable", currentScore: 72, previousScore: 73, change: -1,
    history: [
      { period: "Q3-2025", score: 74, rating: "Good" },
      { period: "Q4-2025", score: 72, rating: "Good" },
      { period: "Q1-2026", score: 73, rating: "Good" },
      { period: "Q2-2026", score: 72, rating: "Good" },
    ],
  },
  {
    id: 9, supplier: "PT Teknik Utama", category: "Spare Parts", trend: "Declining", currentScore: 65, previousScore: 72, change: -7,
    history: [
      { period: "Q3-2025", score: 78, rating: "Good" },
      { period: "Q4-2025", score: 75, rating: "Good" },
      { period: "Q1-2026", score: 72, rating: "Good" },
      { period: "Q2-2026", score: 65, rating: "Fair" },
    ],
  },
  {
    id: 10, supplier: "PT Chemindo", category: "Chemicals", trend: "Declining", currentScore: 55, previousScore: 62, change: -7,
    history: [
      { period: "Q3-2025", score: 72, rating: "Good" },
      { period: "Q4-2025", score: 68, rating: "Fair" },
      { period: "Q1-2026", score: 62, rating: "Fair" },
      { period: "Q2-2026", score: 55, rating: "Poor" },
    ],
  },
  {
    id: 11, supplier: "PT Bengkel Sentral", category: "Maintenance", trend: "Declining", currentScore: 60, previousScore: 65, change: -5,
    history: [
      { period: "Q4-2025", score: 70, rating: "Good" },
      { period: "Q1-2026", score: 65, rating: "Fair" },
      { period: "Q2-2026", score: 60, rating: "Fair" },
    ],
  },
  {
    id: 12, supplier: "PT ATK Makmur", category: "Office Supplies", trend: "Improving", currentScore: 75, previousScore: 70, change: 5,
    history: [
      { period: "Q1-2026", score: 70, rating: "Good" },
      { period: "Q2-2026", score: 75, rating: "Good" },
    ],
  },
];

export default vendorPerformances;
