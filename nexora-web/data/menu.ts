export type MenuItem = {
  label: string;
  href?: string;
  active?: boolean;
  code?: string;
  children?: MenuItem[];
};

export const menuItems: MenuItem[] = [
  { label: "Dashboard", href: "/dashboard", active: true, code: "M00" },
  {
    label: "Master Data",
    href: "#",
    active: false,
    code: "M01",
    children: [
      {
        label: "Business Partner",
        href: "#",
        active: false,
        code: "S01",
        children: [
          { label: "Customer", href: "/dashboard/master-data/customer", active: false, code: "C01" },
          { label: "Supplier", href: "/dashboard/master-data/supplier", active: false, code: "C02" },
          { label: "Vendor", href: "/dashboard/master-data/vendor", active: false, code: "C03" },
              { label: "Vendor Type", href: "/dashboard/master-data/vendor-type", active: false, code: "C04" },
              { label: "Supplier Type", href: "/dashboard/master-data/supplier-type", active: false, code: "C05" },
              { label: "Supplier Category", href: "/dashboard/master-data/supplier-category", active: false, code: "C06" },
        ],
      },
      {
        label: "Inventory",
        href: "#",
        active: false,
        code: "S02",
        children: [
          { label: "Item Master", href: "/dashboard/master-data/item-master", active: false, code: "C01" },
          { label: "Category", href: "/dashboard/master-data/category", active: false, code: "C02" },
          { label: "Brand", href: "/dashboard/master-data/brand", active: false, code: "C03" },
          { label: "UOM", href: "/dashboard/master-data/uom", active: false, code: "C04" },
          { label: "Warehouse", href: "/dashboard/master-data/warehouse", active: false, code: "C05" },
        ],
      },
      {
        label: "Asset Management",
        href: "#",
        active: false,
        code: "S03",
        children: [
          { label: "Asset", href: "/dashboard/master-data/asset", active: false, code: "C01" },
          { label: "Asset Category", href: "/dashboard/master-data/asset-category", active: false, code: "C02" },
          { label: "Asset Location", href: "/dashboard/master-data/asset-location", active: false, code: "C03" },
          { label: "Asset Status", href: "/dashboard/master-data/asset-status", active: false, code: "C04" },
        ],
      },
      {
        label: "General",
        href: "#",
        active: false,
        code: "S00",
        children: [
          { label: "City", href: "/dashboard/master-data/city", active: false, code: "C01" },
          { label: "Province", href: "/dashboard/master-data/province", active: false, code: "C02" },
          { label: "Country", href: "/dashboard/master-data/country", active: false, code: "C03" },
          { label: "Currency", href: "/dashboard/master-data/currency", active: false, code: "C04" },
        ],
      },
      {
        label: "Human Resource",
        href: "#",
        active: false,
        code: "S04",
        children: [
          { label: "Employee", href: "/dashboard/master-data/employee", active: false, code: "C01" },
          { label: "Department", href: "/dashboard/master-data/department", active: false, code: "C02" },
          { label: "Position", href: "/dashboard/master-data/position", active: false, code: "C03" },
        ],
      },
      {
        label: "Finance",
        href: "#",
        active: false,
        code: "S05",
        children: [
          { label: "COA", href: "/dashboard/master-data/coa", active: false, code: "C01" },
          { label: "Tax", href: "/dashboard/master-data/tax", active: false, code: "C02" },
          { label: "Payment Terms", href: "/dashboard/master-data/payment-terms", active: false, code: "C03" },
        ],
      },
    ],
  },
  { label: "Sales", href: "#", active: false, code: "M02" },
  { label: "Purchase", href: "#", active: false, code: "M03" },
  { label: "Inventory", href: "#", active: false, code: "M04" },
  { label: "Production", href: "#", active: false, code: "M05" },
  { label: "Finance", href: "#", active: false, code: "M06" },
  { label: "HR & Payroll", href: "#", active: false, code: "M07" },
  { label: "Assets Management", href: "#", active: false, code: "M08" },
  { label: "Project", href: "#", active: false, code: "M09" },
  { label: "CRM", href: "#", active: false, code: "M10" },
  { label: "Reports & Analytics", href: "#", active: false, code: "M11" },
  {
    label: "Settings",
    href: "#",
    active: false,
    code: "M12",
    children: [
      {
        label: "User & Security",
        href: "#",
        active: false,
        code: "S01",
        children: [
              { label: "Users", href: "/settings/users", active: false, code: "C01" },
              { label: "Roles", href: "/settings/roles", active: false, code: "C02" },
        ],
      },
    ],
  },
];
