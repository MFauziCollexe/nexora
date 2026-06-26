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
              { label: "Business Partner Group", href: "/dashboard/master-data/business-partner-group", active: false, code: "C07" },
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
          { label: "Bin Location", href: "/dashboard/master-data/bin-location", active: false, code: "C06" },
          { label: "Item Group", href: "/dashboard/master-data/item-group", active: false, code: "C07" },
          { label: "Item Type", href: "/dashboard/master-data/item-type", active: false, code: "C08" },
          { label: "Batch/Lot Master", href: "/dashboard/master-data/batch-lot-master", active: false, code: "C09" },
          { label: "Serial Number Master", href: "/dashboard/master-data/serial-number-master", active: false, code: "C10" },
          { label: "Reorder Point", href: "/dashboard/master-data/reorder-point", active: false, code: "C11" },
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
          { label: "Cost Center", href: "/dashboard/master-data/cost-center", active: false, code: "C04" },
          { label: "Profit Center", href: "/dashboard/master-data/profit-center", active: false, code: "C05" },
          { label: "Bank Account", href: "/dashboard/master-data/bank-account", active: false, code: "C06" },
          { label: "Exchange Rate", href: "/dashboard/master-data/exchange-rate", active: false, code: "C07" },
        ],
      },
      {
        label: "Company Profile",
        href: "#",
        active: false,
        code: "S07",
        children: [
          { label: "Branch", href: "/dashboard/master-data/branch", active: false, code: "C01" },
          { label: "Currency", href: "/dashboard/master-data/currency", active: false, code: "C02" },
          { label: "Fiscal Year", href: "/dashboard/master-data/fiscal-year", active: false, code: "C03" },
        ],
      },
    ],
  },
  { label: "Sales", href: "#", active: false, code: "M02", children: [{ label: "Reports", href: "#", active: false, code: "S01", children: [{ label: "Sales Report", href: "/sales/reports/sales-report", active: false, code: "C01" }, { label: "Customer Sales Report", href: "/sales/reports/customer-sales-report", active: false, code: "C02" }, { label: "Outstanding Invoice", href: "/sales/reports/outstanding-invoice", active: false, code: "C03" }] }] },
  { label: "Purchase", href: "#", active: false, code: "M03", children: [
    { label: "Procurement", href: "#", active: false, code: "S01", children: [
      { label: "Purchase Request", href: "/purchase/procurement/purchase-request", active: false, code: "C01" },
      { label: "RFQ", href: "/purchase/procurement/rfq", active: false, code: "C02" },
      { label: "Purchase Order", href: "/purchase/procurement/purchase-order", active: false, code: "C03" },
      { label: "Purchase Contract", href: "/purchase/procurement/purchase-contract", active: false, code: "C04" },
    ] },
    { label: "Receiving", href: "#", active: false, code: "S02", children: [
      { label: "Goods Receipt", href: "/purchase/receiving/goods-receipt", active: false, code: "C01" },
      { label: "Supplier Return", href: "/purchase/receiving/supplier-return", active: false, code: "C02" },
      { label: "Receiving History", href: "/purchase/receiving/receiving-history", active: false, code: "C03" },
    ] },
    { label: "Payables", href: "#", active: false, code: "S03", children: [
      { label: "Supplier Invoice", href: "/purchase/payables/supplier-invoice", active: false, code: "C01" },
      { label: "Supplier Payment", href: "/purchase/payables/supplier-payment", active: false, code: "C02" },
    ] },
    { label: "Reports", href: "#", active: false, code: "S04", children: [
      { label: "Purchase Report", href: "/purchase/reports/purchase-report", active: false, code: "C01" },
      { label: "Supplier Purchase Report", href: "/purchase/reports/supplier-purchase-report", active: false, code: "C02" },
      { label: "PO Report", href: "/purchase/reports/po-report", active: false, code: "C03" },
    ] },
    { label: "Vendor Management", href: "#", active: false, code: "S05", children: [
      { label: "Vendor Evaluation", href: "/purchase/vendor-management/vendor-evaluation", active: false, code: "C01" },
      { label: "Vendor Scorecard", href: "/purchase/vendor-management/vendor-scorecard", active: false, code: "C02" },
      { label: "Vendor Performance", href: "/purchase/vendor-management/vendor-performance", active: false, code: "C03" },
      { label: "Approved Vendor List", href: "/purchase/vendor-management/approved-vendor-list", active: false, code: "C04" },
    ] },
  ] },
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
