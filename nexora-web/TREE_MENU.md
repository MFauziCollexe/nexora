# Tree Menu — Nexora ERP

```
NEXORA ERP
│
├─ M00  📊 Dashboard                          /dashboard                          ✅
│
├─ M01  🗄️ Master Data
│   ├─ S01  🤝 Business Partner
│   │   ├─ C01  Customer                      /master-data/customer               ✅
│   │   ├─ C02  Supplier                      /master-data/supplier               ✅
│   │   ├─ C03  Vendor                        /master-data/vendor                 ✅
│   │   ├─ C04  Vendor Type                   /master-data/vendor-type            ✅
│   │   ├─ C05  Supplier Type                 /master-data/supplier-type          ✅
│   │   └─ C06  Supplier Category             /master-data/supplier-category      ✅
│   │
│   ├─ S02  📦 Inventory
│   │   ├─ C01  Item Master                   /master-data/item-master            ✅
│   │   ├─ C02  Category                      /master-data/category               ✅
│   │   ├─ C03  Brand                         /master-data/brand                  ✅
│   │   ├─ C04  UOM                           /master-data/uom                    ✅
│   │   └─ C05  Warehouse                     /master-data/warehouse              ✅
│   │
│   ├─ S03  🔧 Asset Management
│   │   ├─ C01  Asset                         /master-data/asset                  ✅
│   │   ├─ C02  Asset Category                /master-data/asset-category         ✅
│   │   ├─ C03  Asset Location                /master-data/asset-location         ✅
│   │   └─ C04  Asset Status                  /master-data/asset-status           ✅
│   │
│   ├─ S04  👥 Human Resource
│   │   ├─ C01  Employee                      /master-data/employee               ✅
│   │   ├─ C02  Department                    /master-data/department             ✅
│   │   └─ C03  Position                      /master-data/position               ✅
│   │
│   ├─ S05  💰 Finance
│   │   ├─ C01  COA                           /master-data/coa                    ✅
│   │   ├─ C02  Tax                           /master-data/tax                    ✅
│   │   └─ C03  Payment Terms                 /master-data/payment-terms          ✅
│   │
│   └─ S07  🌐 General
│       ├─ C01  City                          /master-data/city                   ✅
│       ├─ C02  Province                      /master-data/province               ✅
│       ├─ C03  Country                       /master-data/country                ✅
│       └─ C04  Currency                      /master-data/currency               ✅
│
├─ M02  🛒 Sales
│   ├─ S01  📋 Sales Management
│   │   ├─ C01  Quotations                    /sales/sales-management/quotations  ✅
│   │   ├─ C02  Sales Orders                  /sales/sales-management/sales-orders✅
│   │   ├─ C07  Deliver Orders                /sales/sales-management/delivery-orders✅
│   │   ├─ C03  Invoices                      /sales/sales-management/invoices    ✅
│   │   ├─ C04  Delivery Notes                /sales/sales-management/delivery-notes✅
│   │   ├─ C05  Sales Return                  /sales/sales-management/sales-returns✅
│   │   └─ C06  Credit Note                   /sales/sales-management/credit-notes✅
│   │
│   ├─ S02  💳 Customer Payment               ❌ semua page
│   │   ├─ C01  Incoming Payment              /sales/incoming-payment             ❌
│   │   ├─ C02  Payment Allocation            /sales/payment-allocation           ❌
│   │   └─ C03  Payment History               /sales/payment-history              ❌
│   │
│   └─ S03  📊 Reports                        ❌ semua page
│       ├─ C01  Sales Report                  /sales/sales-report                 ❌
│       ├─ C02  Customer Sales Report         /sales/customer-sales-report        ❌
│       └─ C03  Outstanding Invoice           /sales/outstanding-invoice          ❌
│
├─ M03  🛍️ Purchase
│   ├─ S01  📋 Procurement
│   │   ├─ C01  Purchase Request              /purchase/purchase-request          ❌
│   │   ├─ C02  RFQ                            /purchase/rfq                      ❌
│   │   ├─ C03  Purchase Order                /purchase/purchase-order            ❌
│   │   └─ C04  Purchase Contract             /purchase/purchase-contract         ❌
│   │
│   ├─ S02  📦 Receiving
│   │   ├─ C01  Goods Receipt                 /purchase/goods-receipt             ❌
│   │   ├─ C02  Supplier Return               /purchase/supplier-return           ❌
│   │   └─ C03  Receiving History             /purchase/receiving-history         ❌
│   │
│   ├─ S03  💰 Payables
│   │   ├─ C01  Supplier Invoice              /purchase/supplier-invoice          ❌
│   │   ├─ C02  Supplier Payment              /purchase/supplier-payment          ❌
│   │   └─ C03  Outstanding Payable           /purchase/outstanding-payable       ❌
│   │
│   └─ S04  📊 Reports
│       ├─ C01  Purchase Report               /purchase/purchase-report           ❌
│       ├─ C02  Supplier Purchase Report      /purchase/supplier-purchase-report  ❌
│       └─ C03  PO Report                     /purchase/po-report                 ❌
│
├─ M04  📦 Inventory
│   ├─ S01  🔄 Transactions
│   │   ├─ C01  Goods Receipt                 /inventory/goods-receipt            ❌
│   │   ├─ C02  Goods Issue                   /inventory/goods-issue              ❌
│   │   ├─ C03  Stock Transfer                /inventory/stock-transfer           ❌
│   │   ├─ C04  Stock Adjustment              /inventory/stock-adjustment         ❌
│   │   └─ C05  Stock Opname                  /inventory/stock-opname             ❌
│   │
│   ├─ S02  🏭 Warehouse Operations
│   │   ├─ C01  Bin Location                  /inventory/bin-location             ❌
│   │   ├─ C02  Put Away                      /inventory/put-away                 ❌
│   │   ├─ C03  Picking                       /inventory/picking                  ❌
│   │   └─ C04  Packing                       /inventory/packing                  ❌
│   │
│   ├─ S03  ❄️ Cold Storage
│   │   ├─ C01  Cold Room                     /inventory/cold-room                ❌
│   │   ├─ C02  Temperature Monitoring        /inventory/temperature-monitoring   ❌
│   │   ├─ C03  Pallet Tracking               /inventory/pallet-tracking          ❌
│   │   └─ C04  Storage Utilization           /inventory/storage-utilization      ❌
│   │
│   └─ S04  📊 Reports
│       ├─ C01  Stock Card                    /inventory/stock-card               ❌
│       ├─ C02  Inventory Movement            /inventory/inventory-movement       ❌
│       ├─ C03  Aging Stock                   /inventory/aging-stock              ❌
│       └─ C04  Inventory Valuation           /inventory/inventory-valuation      ❌
│
├─ M05  🏭 Production
│   ├─ S01  📋 Planning
│   │   ├─ C01  BOM                           /production/bom                     ❌
│   │   ├─ C02  Production Planning            /production/production-planning    ❌
│   │   └─ C03  Material Requirement Planning  /production/material-requirement-planning ❌
│   │
│   ├─ S02  ⚙️ Execution
│   │   ├─ C01  Work Order                    /production/work-order              ❌
│   │   ├─ C02  Material Issue                /production/material-issue          ❌
│   │   ├─ C03  Production Receipt            /production/production-receipt      ❌
│   │   └─ C04  Production Completion         /production/production-completion   ❌
│   │
│   └─ S03  📊 Reports
│       ├─ C01  Production Report             /production/production-report       ❌
│       ├─ C02  Material Consumption           /production/material-consumption    ❌
│       └─ C03  Production Cost               /production/production-cost         ❌
│
├─ M06  💵 Finance
│   ├─ S01  📒 General Ledger
│   │   ├─ C01  Journal Entry                 /finance/journal-entry              ❌
│   │   ├─ C02  Recurring Journal             /finance/recurring-journal          ❌
│   │   └─ C03  Journal Approval              /finance/journal-approval           ❌
│   │
│   ├─ S02  🏦 Cash & Bank
│   │   ├─ C01  Cash In                       /finance/cash-in                    ❌
│   │   ├─ C02  Cash Out                      /finance/cash-out                   ❌
│   │   ├─ C03  Bank Transfer                 /finance/bank-transfer              ❌
│   │   └─ C04  Bank Reconciliation           /finance/bank-reconciliation        ❌
│   │
│   ├─ S03  💳 Accounts Receivable
│   │   ├─ C01  Customer Invoice              /finance/customer-invoice           ❌
│   │   ├─ C02  Customer Payment              /finance/customer-payment           ❌
│   │   └─ C03  Outstanding Receivable        /finance/outstanding-receivable     ❌
│   │
│   ├─ S04  💸 Accounts Payable
│   │   ├─ C01  Supplier Invoice              /finance/supplier-invoice           ❌
│   │   ├─ C02  Supplier Payment              /finance/supplier-payment           ❌
│   │   └─ C03  Outstanding Payable           /finance/outstanding-payable        ❌
│   │
│   └─ S05  📊 Financial Reports
│       ├─ C01  Trial Balance                 /finance/trial-balance              ❌
│       ├─ C02  Profit & Loss                 /finance/profit-loss                ❌
│       ├─ C03  Balance Sheet                 /finance/balance-sheet              ❌
│       └─ C04  Cash Flow                     /finance/cash-flow                  ❌
│
├─ M07  👥 HR & Payroll
│   ├─ S01  👤 Employee Management
│   │   ├─ C01  Employee Profile              /hrpayroll/employee-profile         ❌
│   │   ├─ C02  Employee Contract             /hrpayroll/employee-contract        ❌
│   │   └─ C03  Employee Document             /hrpayroll/employee-document        ❌
│   │
│   ├─ S02  ⏰ Attendance
│   │   ├─ C01  Attendance Log                /hrpayroll/attendance-log           ❌
│   │   ├─ C02  Shift Schedule                /hrpayroll/shift-schedule           ❌
│   │   ├─ C03  Overtime                      /hrpayroll/overtime                 ❌
│   │   └─ C04  Leave Request                 /hrpayroll/leave-request            ❌
│   │
│   ├─ S03  💰 Payroll
│   │   ├─ C01  Payroll Process               /hrpayroll/payroll-process          ❌
│   │   ├─ C02  Payroll Component             /hrpayroll/payroll-component        ❌
│   │   ├─ C03  Payslip                       /hrpayroll/payslip                  ❌
│   │   └─ C04  Payroll History               /hrpayroll/payroll-history          ❌
│   │
│   └─ S04  📊 Reports
│       ├─ C01  Attendance Report             /hrpayroll/attendance-report        ❌
│       ├─ C02  Leave Report                  /hrpayroll/leave-report             ❌
│       └─ C03  Payroll Report                /hrpayroll/payroll-report           ❌
│
├─ M08  💼 Assets Management
│   ├─ S01  🔧 Asset Operations
│   │   ├─ C01  Asset Registration            /assets-management/asset-registration   ❌
│   │   ├─ C02  Asset Assignment              /assets-management/asset-assignment     ❌
│   │   ├─ C03  Asset Transfer                /assets-management/asset-transfer       ❌
│   │   └─ C04  Asset Disposal                /assets-management/asset-disposal       ❌
│   │
│   ├─ S02  🔨 Maintenance
│   │   ├─ C01  Maintenance Request           /assets-management/maintenance-request  ❌
│   │   ├─ C02  Maintenance Schedule          /assets-management/maintenance-schedule ❌
│   │   ├─ C03  Maintenance History           /assets-management/maintenance-history  ❌
│   │   └─ C04  Repair Tracking               /assets-management/repair-tracking      ❌
│   │
│   ├─ S03  📉 Depreciation
│   │   ├─ C01  Depreciation Process          /assets-management/depreciation-process ❌
│   │   ├─ C02  Depreciation History          /assets-management/depreciation-history ❌
│   │   └─ C03  Asset Valuation               /assets-management/asset-valuation      ❌
│   │
│   └─ S04  📊 Reports
│       ├─ C01  Asset Register Report         /assets-management/asset-register-report  ❌
│       ├─ C02  Maintenance Report            /assets-management/maintenance-report     ❌
│       └─ C03  Depreciation Report           /assets-management/depreciation-report   ❌
│
├─ M09  📋 Project
│   ├─ S01  📋 Project Management
│   │   ├─ C01  Project Master                /project/project-master              ❌
│   │   ├─ C02  Project Task                  /project/project-task                ❌
│   │   ├─ C03  Milestone                     /project/milestone                   ❌
│   │   └─ C04  Project Timeline              /project/project-timeline            ❌
│   │
│   ├─ S02  💰 Budgeting
│   │   ├─ C01  Budget Plan                   /project/budget-plan                 ❌
│   │   ├─ C02  Budget Realization            /project/budget-realization          ❌
│   │   └─ C03  Project Cost                  /project/project-cost                ❌
│   │
│   └─ S03  📊 Reports
│       ├─ C01  Progress Report               /project/progress-report             ❌
│       ├─ C02  Budget Report                 /project/budget-report               ❌
│       └─ C03  Cost Report                   /project/cost-report                 ❌
│
├─ M10  🤝 CRM
│   ├─ S01  🎯 Lead Management
│   │   ├─ C01  Lead                          /crm/lead                            ❌
│   │   ├─ C02  Opportunity                   /crm/opportunity                     ❌
│   │   └─ C03  Lead Source                   /crm/lead-source                     ❌
│   │
│   ├─ S02  📞 Customer Activities
│   │   ├─ C01  Meeting                       /crm/meeting                         ❌
│   │   ├─ C02  Call Log                      /crm/call-log                        ❌
│   │   ├─ C03  Follow Up                     /crm/follow-up                       ❌
│   │   └─ C04  Visit Report                  /crm/visit-report                    ❌
│   │
│   └─ S03  📊 Reports
│       ├─ C01  Lead Report                   /crm/lead-report                     ❌
│       ├─ C02  Opportunity Report            /crm/opportunity-report              ❌
│       └─ C03  Conversion Report             /crm/conversion-report               ❌
│
├─ M11  📈 Reports & Analytics
│   ├─ S01  📊 Operational Reports
│   │   ├─ C01  Sales Report                  /report-analytics/sales-report       ❌
│   │   ├─ C02  Purchase Report               /report-analytics/purchase-report    ❌
│   │   ├─ C03  Inventory Report              /report-analytics/inventory-report   ❌
│   │   └─ C04  Asset Report                  /report-analytics/asset-report       ❌
│   │
│   ├─ S02  💵 Financial Reports
│   │   ├─ C01  Profit & Loss                 /report-analytics/profit-loss        ❌
│   │   ├─ C02  Balance Sheet                 /report-analytics/balance-sheet      ❌
│   │   ├─ C03  Cash Flow                     /report-analytics/cash-flow          ❌
│   │   └─ C04  Trial Balance                 /report-analytics/trial-balance      ❌
│   │
│   ├─ S03  👥 HR Reports
│   │   ├─ C01  Attendance Report             /report-analytics/attendance-report  ❌
│   │   ├─ C02  Leave Report                  /report-analytics/leave-report       ❌
│   │   └─ C03  Payroll Report                /report-analytics/payroll-report     ❌
│   │
│   └─ S04  📉 Dashboard Analytics
│       ├─ C01  KPI Dashboard                 /report-analytics/kpi-dashboard      ❌
│       ├─ C02  Executive Dashboard           /report-analytics/executive-dashboard❌
│       └─ C03  Operational Dashboard         /report-analytics/operational-dashboard ❌
│
└─ M12  ⚙️ Settings
    └─ S01  🔐 User & Security
        ├─ C01  Users                         /settings/users                      ✅
        └─ C02  Roles                         /settings/roles                      ✅
```

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Page sudah dibuat (`page.tsx` exists) |
| ❌ | Page belum dibuat |
| M## | Main Menu (level 1) |
| S## | Sub Menu (level 2) |
| C## | Child Menu (level 3 / leaf) |

## Summary

| Level | Total | ✅ Done | ❌ Missing |
|-------|-------|---------|-----------|
| Main Menu | 13 | 1 (Dashboard) | 12 (no standalone page) |
| Sub Menu | 26 | — | — |
| Child Menu | 107 | 37 | 70 |

> **Note:** Data diambil langsung dari database MySQL `nexora` via MenuSeeder. Halaman yang sudah ada tercatat ✅ berdasarkan file `page.tsx` yang ditemukan di frontend. 70 child menu masih perlu dibuatkan halaman.
