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
│   │   ├─ C03  Supplier Type                 /master-data/supplier-type          ✅
│   │   ├─ C04  Supplier Category             /master-data/supplier-category      ✅
│   │   └─ C05  Business Partner Group        /master-data/business-partner-group ❌
│   │
│   ├─ S02  📦 Inventory
│   │   ├─ C01  Item Master                   /master-data/item-master            ✅
│   │   ├─ C02  Category                      /master-data/category               ✅
│   │   ├─ C03  Brand                         /master-data/brand                  ✅
│   │   ├─ C04  UOM                           /master-data/uom                    ✅
│   │   ├─ C05  Warehouse                     /master-data/warehouse              ✅
│   │   ├─ C06  Bin Location                  /master-data/bin-location           ❌
│   │   ├─ C07  Item Group                    /master-data/item-group             ❌
│   │   ├─ C08  Item Type                     /master-data/item-type              ❌
│   │   ├─ C09  Batch/Lot Master              /master-data/batch-lot-master       ❌
│   │   ├─ C10  Serial Number Master          /master-data/serial-master          ❌
│   │   └─ C11  Reorder Point                 /master-data/reorder-point          ❌
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
│   │   ├─ C03  Payment Terms                 /master-data/payment-terms          ✅
│   │   ├─ C04  Cost Center                   /master-data/cost-center            ❌
│   │   ├─ C05  Profit Center                 /master-data/profit-center          ❌
│   │   ├─ C06  Bank Account                  /master-data/bank-account           ❌
│   │   └─ C07  Exchange Rate                 /master-data/exchange-rate          ❌
│   │
│   └─ S07  🏢 Company Profile
│       ├─ C01  Branch                        /master-data/branch                 ❌
│       ├─ C02  Currency                      /master-data/currency               ✅
│       └─ C03  Fiscal Year                   /master-data/fiscal-year            ❌
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
│   └─ S03  📊 Reports                        ❌ semua page
│       ├─ C01  Sales Report                  /sales/reports/sales-report                 ❌
│       ├─ C02  Customer Sales Report         /sales/reports/customer-sales-report        ❌
│       └─ C03  Outstanding Invoice           /sales/reports/outstanding-invoice          ❌
│
├─ M03  🛍️ Purchase
│   ├─ S01  📋 Procurement
│   │   ├─ C01  Purchase Request              /purchase/procurement/purchase-request          ❌
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
│   ├─ S04  📊 Reports
│   │   ├─ C01  Purchase Report               /purchase/purchase-report           ❌
│   │   ├─ C02  Supplier Purchase Report      /purchase/supplier-purchase-report  ❌
│   │   └─ C03  PO Report                     /purchase/po-report                 ❌
│   │
│   └─ S05  📈 Vendor Management
│       ├─ C01  Vendor Evaluation             /purchase/vendor-evaluation         ❌
│       ├─ C02  Vendor Scorecard              /purchase/vendor-scorecard          ❌
│       ├─ C03  Vendor Performance            /purchase/vendor-performance        ❌
│       └─ C04  Approved Vendor List          /purchase/approved-vendor-list      ❌
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
│   │   ├─ C04  Storage Utilization           /inventory/storage-utilization      ❌
│   │   ├─ C05  FEFO Management               /inventory/fefo-management          ❌
│   │   ├─ C06  Expiry Monitoring             /inventory/expiry-monitoring        ❌
│   │   └─ C07  Temperature Alert             /inventory/temperature-alert        ❌
│   │
│   ├─ S04  📊 Reports
│   │   ├─ C01  Stock Card                    /inventory/stock-card               ❌
│   │   ├─ C02  Inventory Movement            /inventory/inventory-movement       ❌
│   │   ├─ C03  Aging Stock                   /inventory/aging-stock              ❌
│   │   └─ C04  Inventory Valuation           /inventory/inventory-valuation      ❌
│   │
│   └─ S05  🔍 Inventory Control
│       ├─ C01  Lot Tracking                  /inventory/lot-tracking             ❌
│       ├─ C02  Serial Tracking               /inventory/serial-tracking          ❌
│       ├─ C03  Stock Reservation             /inventory/stock-reservation        ❌
│       ├─ C04  Replenishment                 /inventory/replenishment            ❌
│       ├─ C05  Cycle Count                   /inventory/cycle-count              ❌
│       └─ C06  Inventory Freeze              /inventory/inventory-freeze         ❌
│
├─ M05  🏭 Production
│   ├─ S00  🏭 Production Master
│   │   ├─ C01  Routing                       /production/routing                 ❌
│   │   ├─ C02  Work Center                   /production/work-center             ❌
│   │   ├─ C03  Machine                       /production/machine                 ❌
│   │   ├─ C04  Production Shift              /production/production-shift        ❌
│   │   └─ C05  Production Line               /production/production-line         ❌
│   │
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
│   ├─ S03  📊 Shop Floor Control
│   │   ├─ C01  Production Monitoring         /production/production-monitoring   ❌
│   │   ├─ C02  Machine Downtime              /production/machine-downtime        ❌
│   │   ├─ C03  Production Scrap              /production/production-scrap        ❌
│   │   ├─ C04  Rework                        /production/rework                  ❌
│   │   └─ C05  Production QC                 /production/production-qc           ❌
│   │
│   └─ S04  📊 Manufacturing Analytics
│       ├─ C01  OEE Dashboard                    /production/oee-dashboard            ❌
│       ├─ C02  Machine Utilization              /production/machine-utilization      ❌
│       ├─ C03  Production Efficiency            /production/production-efficiency    ❌
│       └─ C04  Scrap Analysis                   /production/scrap-analysis           ❌
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
│   │   ├─ C01  Incoming Payment              /finance/incoming-payment           ❌
│   │   ├─ C02  Payment Allocation            /finance/payment-allocation         ❌
│   │   ├─ C03  Payment History               /finance/payment-history            ❌
│   │   └─ C04  Outstanding Receivable        /finance/outstanding-receivable     ❌
│   │
│   ├─ S04  💸 Accounts Payable
│   │   ├─ C01  Outgoing Payment              /finance/outgoing-payment           ❌
│   │   ├─ C02  Payment Allocation            /finance/payment-allocation         ❌
│   │   ├─ C03  Payment History               /finance/payment-history            ❌
│   │   └─ C04  Outstanding Payable           /finance/outstanding-payable        ❌
│   │
│   ├─ S05  📊 Financial Reports
│   │   ├─ C01  Trial Balance                 /finance/trial-balance              ❌
│   │   ├─ C02  Profit & Loss                 /finance/profit-loss                ❌
│   │   ├─ C03  Balance Sheet                 /finance/balance-sheet              ❌
│   │   └─ C04  Cash Flow                     /finance/cash-flow                  ❌
│   │
│   ├─ S06  📈 Budgeting
│   │   ├─ C01  Budget Plan                   /finance/budget-plan                ❌
│   │   ├─ C02  Budget Approval               /finance/budget-approval            ❌
│   │   ├─ C03  Budget Realization            /finance/budget-realization         ❌
│   │   └─ C04  Budget Variance               /finance/budget-variance            ❌
│   │
│   ├─ S07  🏢 Cost Accounting
│   │   ├─ C01  Cost Center Allocation        /finance/cost-center-allocation     ❌
│   │   ├─ C02  Profit Center Analysis        /finance/profit-center-analysis     ❌
│   │   ├─ C03  Cost Distribution             /finance/cost-distribution          ❌
│   │   └─ C04  Department Costing            /finance/department-costing         ❌
│   │
│   ├─ S08  🏦 Fixed Asset Accounting
│   │   ├─ C01  Asset Acquisition             /finance/asset-acquisition          ❌
│   │   ├─ C02  Asset Depreciation            /finance/asset-depreciation         ❌
│   │   ├─ C03  Asset Revaluation             /finance/asset-revaluation          ❌
│   │   └─ C04  Asset Disposal                /finance/asset-disposal             ❌
│   │
│   └─ S09  💰 Tax Management
│       ├─ C01  Tax Invoice                   /finance/tax-invoice                 ❌
│       ├─ C02  VAT Report                    /finance/vat-report                  ❌
│       ├─ C03  Tax Reconciliation            /finance/tax-reconciliation          ❌
│       └─ C04  Withholding Tax               /finance/withholding-tax             ❌
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
│   │   └─ C04  Asset Return                  /assets-management/asset-return         ❌
│   │
│   ├─ S02  💰 Asset Transactions
│   │   ├─ C01  Asset Depreciation            /assets-management/asset-depreciation   ❌
│   │   ├─ C02  Asset Revaluation             /assets-management/asset-revaluation    ❌
│   │   ├─ C03  Asset Disposal                /assets-management/asset-disposal       ❌
│   │   └─ C04  Asset Write Off               /assets-management/asset-write-off      ❌
│   │
│   └─ S03  📊 Reports
│       └─ C01  Asset Reporting               /assets-management/asset-reporting      ❌
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
│   ├─ S03  📋 Resource Management
│   │   ├─ C01  Resource Allocation           /project/resource-allocation         ❌
│   │   └─ C02  Equipment Allocation           /project/equipment-allocation        ❌
│   │
│   ├─ S04  ⏰ Timesheet
│   │   ├─ C01  Timesheet Entry               /project/timesheet-entry             ❌
│   │   └─ C02  Timesheet Approval            /project/timesheet-approval          ❌
│   │
│   ├─ S05  💰 Billing
│   │   ├─ C01  Project Billing               /project/project-billing             ❌
│   │   └─ C02  Project Invoice               /project/project-invoice             ❌
│   │
│   ├─ S06  📈 Profitability
│   │   └─ C01  Project Profitability         /project/project-profitability       ❌
│   │
│   └─ S07  📊 Reports
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
│       ├─ C03  Operational Dashboard         /report-analytics/operational-dashboard ❌
│       ├─ C04  Production Dashboard          /report-analytics/production-dashboard ❌
│       ├─ C05  Quality Dashboard             /report-analytics/quality-dashboard ❌
│       ├─ C06  Maintenance Dashboard         /report-analytics/maintenance-dashboard ❌
│       ├─ C07  CRM Dashboard                 /report-analytics/crm-dashboard ❌
│       └─ C08  Project Dashboard             /report-analytics/project-dashboard ❌
│
├─ M12  ⚙️ Settings
│   ├─ S01  🔐 User & Security
│   │   ├─ C01  Users                         /settings/users                      ✅
│   │   ├─ C02  Roles                         /settings/roles                      ✅
│   │   ├─ C03  Approval Matrix               /settings/approval-matrix            ❌
│   │   ├─ C04  Approval Workflow             /settings/approval-workflow          ❌
│   │   └─ C05  Approval History              /settings/approval-history           ❌
│   │
│   └─ S08  📋 Audit
│       ├─ C01  Activity Log                  /settings/activity-log               ❌
│       ├─ C02  Audit Trail                   /settings/audit-trail                ❌
│       └─ C03  Login History                 /settings/login-history              ❌
│
├─ M13  🧪 Quality Management
│   ├─ S01  📋 Quality Planning
│   │   ├─ C01  Inspection Plan               /quality/inspection-plan             ❌
│   │   ├─ C02  Quality Standard              /quality/quality-standard            ❌
│   │   └─ C03  Quality Checklist             /quality/quality-checklist           ❌
│   │
│   ├─ S02  🔍 Inspection
│   │   ├─ C01  Incoming Inspection           /quality/incoming-inspection         ❌
│   │   ├─ C02  In Process Inspection         /quality/in-process-inspection       ❌
│   │   ├─ C03  Final Inspection              /quality/final-inspection            ❌
│   │   └─ C04  Inspection Result             /quality/inspection-result           ❌
│   │
│   ├─ S03  ⚠️ Non Conformance
│   │   ├─ C01  NCR                           /quality/ncr                         ❌
│   │   ├─ C02  CAPA                          /quality/capa                        ❌
│   │   ├─ C03  Root Cause Analysis           /quality/root-cause-analysis         ❌
│   │   └─ C04  Corrective Action             /quality/corrective-action           ❌
│   │
│   ├─ S04  ⚙️ Calibration
│   │   ├─ C01  Calibration Schedule          /quality/calibration-schedule        ❌
│   │   ├─ C02  Calibration Record            /quality/calibration-record          ❌
│   │   └─ C03  Calibration Certificate       /quality/calibration-certificate     ❌
│   │
│   └─ S05  📊 Reports
│       ├─ C01  Quality Report                /quality/quality-report              ❌
│       ├─ C02  NCR Report                    /quality/ncr-report                  ❌
│       ├─ C03  CAPA Report                   /quality/capa-report                 ❌
│       └─ C04  Audit Report                  /quality/audit-report                ❌
│
├─ M14  🔧 Maintenance Management
│   ├─ S01  📝 Maintenance Request
│   │   ├─ C01  Work Request                  /maintenance/work-request               ❌
│   │   ├─ C02  Work Order                    /maintenance/work-order                 ❌
│   │   └─ C03  Request Approval              /maintenance/request-approval           ❌
│   │
│   ├─ S02  🔄 Preventive Maintenance
│   │   ├─ C01  Maintenance Schedule          /maintenance/maintenance-schedule       ❌
│   │   ├─ C02  PM Checklist                  /maintenance/pm-checklist               ❌
│   │   └─ C03  PM Execution                  /maintenance/pm-execution               ❌
│   │
│   ├─ S03  🚨 Corrective Maintenance
│   │   ├─ C01  Breakdown Ticket              /maintenance/breakdown-ticket           ❌
│   │   ├─ C02  Repair Activity               /maintenance/repair-activity            ❌
│   │   ├─ C03  Spare Part Usage              /maintenance/spare-part-usage           ❌
│   │   └─ C04  Spare Part Request            /maintenance/spare-part-request         ❌
│   │
│   ├─ S04  🔍 Inspection
│   │   ├─ C01  Inspection Checklist          /maintenance/inspection-checklist       ❌
│   │   └─ C02  Inspection Result             /maintenance/inspection-result          ❌
│   │
│   └─ S05  📊 Reports
│       ├─ C01  Maintenance History           /maintenance/maintenance-history        ❌
│       ├─ C02  MTBF Report                   /maintenance/mtbf-report                ❌
│       ├─ C03  MTTR Report                   /maintenance/mttr-report                ❌
│       └─ C04  Downtime Report               /maintenance/downtime-report            ❌
│
└─ M15  🎫 Service Desk
    ├─ S01  🎟 Ticket Management
    │   ├─ C01  Ticket                        /service-desk/ticket                 ❌
    │   ├─ C02  Assignment                    /service-desk/assignment             ❌
    │   ├─ C03  Escalation                    /service-desk/escalation             ❌
    │   └─ C04  Resolution                    /service-desk/resolution             ❌
    │
    ├─ S02  📚 Knowledge Base
    │   ├─ C01  FAQ                           /service-desk/faq                    ❌
    │   ├─ C02  SOP                           /service-desk/sop                    ❌
    │   └─ C03  Troubleshooting               /service-desk/troubleshooting        ❌
    │
    ├─ S03  🚗 Field Service
    │   ├─ C01  Service Order                 /service-desk/service-order          ❌
    │   ├─ C02  Technician Schedule           /service-desk/technician-schedule    ❌
    │   └─ C03  Service Report                /service-desk/service-report         ❌
    │
    └─ S04  📊 Reports
        ├─ C01  SLA Report                    /service-desk/sla-report             ❌
        ├─ C02  Ticket Performance            /service-desk/ticket-performance     ❌
        ├─ C03  Resolution Time               /service-desk/resolution-time        ❌
        └─ C04  Customer Satisfaction         /service-desk/customer-satisfaction  ❌
```

---

## Legend

| Symbol | Meaning                               |
| ------ | ------------------------------------- |
| ✅     | Page sudah dibuat (`page.tsx` exists) |
| ❌     | Page belum dibuat                     |
| M##    | Main Menu (level 1)                   |
| S##    | Sub Menu (level 2)                    |
| C##    | Child Menu (level 3 / leaf)           |

## Summary

| Level      | Total | ✅ Done       | ❌ Missing              |
| ---------- | ----- | ------------- | ----------------------- |
| Main Menu  | 16    | 1 (Dashboard) | 15 (no standalone page) |
| Sub Menu   | 69    | —             | —                       |
| Child Menu | 269   | 37            | 232                     |
| Permissions | 336   | —             | —                       |

> **Note:** Data diambil langsung dari database MySQL `nexora` via MenuSeeder. Halaman yang sudah ada tercatat ✅ berdasarkan file `page.tsx` yang ditemukan di frontend.
>
> **Changes (batch):** Menambahkan child menu M01.S02 (C06-C11), M01.S05 (C04-C07), M03.S05 Vendor Management, M04.S05 Inventory Control, M04.S03 Cold Storage (C05-C07), M05.S00 Production Master, M05.S03 Shop Floor Control (replaces Reports), M06.S06 Budgeting, M06.S07 Cost Accounting, M06.S08 Fixed Asset Accounting, dan 3 main menu baru: M13 Quality Management, M14 Maintenance Management, M15 Service Desk.
