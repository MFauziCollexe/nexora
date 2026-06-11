export type MenuItem = {
  label: string;
  href: string;
  active: boolean;
};

export const menuItems: MenuItem[] = [
  { label: "Dashboard",           href: "/dashboard", active: true  },
  { label: "Master Data",         href: "#",          active: false },
  { label: "Sales",               href: "#",          active: false },
  { label: "Purchase",            href: "#",          active: false },
  { label: "Inventory",           href: "#",          active: false },
  { label: "Production",          href: "#",          active: false },
  { label: "Finance",             href: "#",          active: false },
  { label: "HR & Payroll",        href: "#",          active: false },
  { label: "Assets Management",   href: "#",          active: false },
  { label: "Project",             href: "#",          active: false },
  { label: "CRM",                 href: "#",          active: false },
  { label: "Reports & Analytics", href: "#",          active: false },
  { label: "Settings",            href: "#",          active: false },
];
