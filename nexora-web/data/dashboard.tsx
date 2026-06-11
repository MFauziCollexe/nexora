import { ReactNode } from "react";
import { ClockIcon, ShoppingCartIcon, BoxIcon, DollarIcon } from "@/components/ui/Icons";

export type StatCardData = {
  label: string;
  value: string;
  pct: string;
  iconBg: string;
  iconColor: string;
  icon: ReactNode;
};

export const statCards: StatCardData[] = [
  {
    label: "Total Sales (This Month)", value: "Rp 1.250.000.000", pct: "+12.5%",
    iconBg: "bg-blue-100", iconColor: "text-blue-600",
    icon: <ClockIcon />,
  },
  {
    label: "Total Purchase (This Month)", value: "Rp 850.000.000", pct: "+8.3%",
    iconBg: "bg-emerald-100", iconColor: "text-emerald-600",
    icon: <ShoppingCartIcon />,
  },
  {
    label: "Inventory Value", value: "Rp 2.450.000.000", pct: "+5.7%",
    iconBg: "bg-purple-100", iconColor: "text-purple-600",
    icon: <BoxIcon />,
  },
  {
    label: "Total Profit (This Month)", value: "Rp 400.000.000", pct: "+15.9%",
    iconBg: "bg-orange-100", iconColor: "text-orange-500",
    icon: <DollarIcon />,
  },
];

export type SalesDataPoint = { date: string; value: number };

export const salesData: SalesDataPoint[] = [
  { date: "Mei 4",  value: 280  }, { date: "Mei 6",  value: 320  },
  { date: "Mei 8",  value: 370  }, { date: "Mei 11", value: 440  },
  { date: "Mei 18", value: 530  }, { date: "Mei 25", value: 640  },
  { date: "Jun 1",  value: 720  }, { date: "Jun 5",  value: 840  },
  { date: "Jun 8",  value: 960  }, { date: "Jun 10", value: 1250 },
];

export type TopProduct = {
  name: string;
  qty: number;
  revenue: string;
  color: string;
};

export const topProducts: TopProduct[] = [
  { name: "Produk A", qty: 1250, revenue: "Rp 250.000.000", color: "#6366f1" },
  { name: "Produk B", qty: 980,  revenue: "Rp 196.000.000", color: "#a855f7" },
  { name: "Produk C", qty: 750,  revenue: "Rp 150.000.000", color: "#ec4899" },
  { name: "Produk D", qty: 610,  revenue: "Rp 122.000.000", color: "#f97316" },
  { name: "Produk E", qty: 430,  revenue: "Rp 86.000.000",  color: "#eab308" },
];

export type Activity = {
  color: string;
  title: string;
  sub: string;
  time: string;
};

export const activities: Activity[] = [
  { color: "bg-blue-500",   title: "Sales Order #SO-2026-0001",    sub: "New sales order created",      time: "10:30 AM"  },
  { color: "bg-purple-500", title: "Purchase Order #PO-2026-0001", sub: "New purchase order created",   time: "09:45 AM"  },
  { color: "bg-green-500",  title: "Goods Received #GR-2026-0001", sub: "Goods received from supplier", time: "09:20 AM"  },
  { color: "bg-yellow-400", title: "Payment Received",             sub: "Payment from PT. Maju Jaya",   time: "08:15 AM"  },
  { color: "bg-red-400",    title: "Inventory Adjustment",         sub: "Inventory has been adjusted",  time: "Yesterday" },
];

export type DonutData = {
  label: string;
  pct: number;
  value: string;
  color: string;
};

export const donutData: DonutData[] = [
  { label: "Sales",      pct: 40, value: "Rp 1.250.000.000", color: "#3b82f6" },
  { label: "Purchase",   pct: 27, value: "Rp 850.000.000",   color: "#a855f7" },
  { label: "Inventory",  pct: 20, value: "Rp 625.000.000",   color: "#10b981" },
  { label: "Production", pct: 8,  value: "Rp 250.000.000",   color: "#f97316" },
  { label: "Others",     pct: 5,  value: "Rp 125.000.000",   color: "#94a3b8" },
];

export type Task = {
  label: string;
  sub: string;
  badge: number | null;
  badgeColor: string;
  done: boolean;
};

export const tasks: Task[] = [
  { label: "Approve Purchase Order", sub: "3 orders pending",       badge: 3,    badgeColor: "bg-red-500",    done: false },
  { label: "Stock Opname",           sub: "Schedule for this month", badge: 1,    badgeColor: "bg-yellow-400", done: false },
  { label: "AR Collection",          sub: "5 invoices are overdue",  badge: 5,    badgeColor: "bg-red-500",    done: false },
  { label: "Monthly Closing",        sub: "Finance closing process", badge: null, badgeColor: "",              done: true  },
];

export const cashFlowPoints = [20, 22, 21, 25, 23, 27, 26, 30, 29, 33, 31, 35];
