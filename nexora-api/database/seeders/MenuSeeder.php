<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Main Menus
        $mainMenus = [
            ['code' => 'M00', 'name' => 'Dashboard', 'icon' => 'home', 'href' => '/dashboard', 'order' => 1],
            ['code' => 'M01', 'name' => 'Master Data', 'icon' => 'database', 'href' => null, 'order' => 2],
            ['code' => 'M02', 'name' => 'Sales', 'icon' => 'shopping-cart', 'href' => null, 'order' => 3],
            ['code' => 'M03', 'name' => 'Purchase', 'icon' => 'shopping-bag', 'href' => null, 'order' => 4],
            ['code' => 'M04', 'name' => 'Inventory', 'icon' => 'package', 'href' => null, 'order' => 5],
            ['code' => 'M05', 'name' => 'Production', 'icon' => 'factory', 'href' => null, 'order' => 6],
            ['code' => 'M06', 'name' => 'Finance', 'icon' => 'dollar-sign', 'href' => null, 'order' => 7],
            ['code' => 'M07', 'name' => 'HR & Payroll', 'icon' => 'users', 'href' => null, 'order' => 8],
            ['code' => 'M08', 'name' => 'Assets Management', 'icon' => 'briefcase', 'href' => null, 'order' => 9],
            ['code' => 'M09', 'name' => 'Project', 'icon' => 'clipboard', 'href' => null, 'order' => 10],
            ['code' => 'M10', 'name' => 'CRM', 'icon' => 'users-cog', 'href' => null, 'order' => 11],
            ['code' => 'M11', 'name' => 'Reports & Analytics', 'icon' => 'chart-bar', 'href' => null, 'order' => 12],
            ['code' => 'M12', 'name' => 'Settings', 'icon' => 'cog', 'href' => null, 'order' => 13],
        ];

        foreach ($mainMenus as $menu) {
            DB::table('main_menus')->updateOrInsert(
                ['code' => $menu['code']],
                [
                    'name' => $menu['name'],
                    'icon' => $menu['icon'],
                    'href' => $menu['href'],
                    'order' => $menu['order'],
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }

        // Submenus for Master Data (M01)
        $masterDataId = DB::table('main_menus')->where('code', 'M01')->first()->id;

        // Get IDs for other main menus
        $inventoryMainId = DB::table('main_menus')->where('code', 'M04')->first()->id;
        $productionMainId = DB::table('main_menus')->where('code', 'M05')->first()->id;
        $financeMainId = DB::table('main_menus')->where('code', 'M06')->first()->id;
        $hrPayrollMainId = DB::table('main_menus')->where('code', 'M07')->first()->id;
        $assetsMainId = DB::table('main_menus')->where('code', 'M08')->first()->id;
        $projectMainId = DB::table('main_menus')->where('code', 'M09')->first()->id;
        $crmMainId = DB::table('main_menus')->where('code', 'M10')->first()->id;
        $reportsMainId = DB::table('main_menus')->where('code', 'M11')->first()->id;

        $submenus = [
            // Master Data submenus
            ['main_menu_id' => $masterDataId, 'code' => 'S01', 'name' => 'Business Partner', 'order' => 1],
            ['main_menu_id' => $masterDataId, 'code' => 'S02', 'name' => 'Inventory', 'order' => 2],
            ['main_menu_id' => $masterDataId, 'code' => 'S03', 'name' => 'Asset Management', 'order' => 3],
            ['main_menu_id' => $masterDataId, 'code' => 'S04', 'name' => 'Human Resource', 'order' => 4],
            ['main_menu_id' => $masterDataId, 'code' => 'S05', 'name' => 'Finance', 'order' => 5],
            ['main_menu_id' => $masterDataId, 'code' => 'S00', 'name' => 'General', 'order' => 6],
            
            // Inventory submenus
            ['main_menu_id' => $inventoryMainId, 'code' => 'S01', 'name' => 'Transactions', 'order' => 1],
            ['main_menu_id' => $inventoryMainId, 'code' => 'S02', 'name' => 'Warehouse Operations', 'order' => 2],
            ['main_menu_id' => $inventoryMainId, 'code' => 'S03', 'name' => 'Cold Storage', 'order' => 3],
            ['main_menu_id' => $inventoryMainId, 'code' => 'S04', 'name' => 'Reports', 'order' => 4],
            
            // Production submenus
            ['main_menu_id' => $productionMainId, 'code' => 'S01', 'name' => 'Planning', 'order' => 1],
            ['main_menu_id' => $productionMainId, 'code' => 'S02', 'name' => 'Execution', 'order' => 2],
            ['main_menu_id' => $productionMainId, 'code' => 'S03', 'name' => 'Reports', 'order' => 3],
            
            // Finance submenus
            ['main_menu_id' => $financeMainId, 'code' => 'S01', 'name' => 'General Ledger', 'order' => 1],
            ['main_menu_id' => $financeMainId, 'code' => 'S02', 'name' => 'Cash & Bank', 'order' => 2],
            ['main_menu_id' => $financeMainId, 'code' => 'S03', 'name' => 'Accounts Receivable', 'order' => 3],
            ['main_menu_id' => $financeMainId, 'code' => 'S04', 'name' => 'Accounts Payable', 'order' => 4],
            ['main_menu_id' => $financeMainId, 'code' => 'S05', 'name' => 'Financial Reports', 'order' => 5],
            
            // HR & Payroll submenus
            ['main_menu_id' => $hrPayrollMainId, 'code' => 'S01', 'name' => 'Employee Management', 'order' => 1],
            ['main_menu_id' => $hrPayrollMainId, 'code' => 'S02', 'name' => 'Attendance', 'order' => 2],
            ['main_menu_id' => $hrPayrollMainId, 'code' => 'S03', 'name' => 'Payroll', 'order' => 3],
            ['main_menu_id' => $hrPayrollMainId, 'code' => 'S04', 'name' => 'Reports', 'order' => 4],
            
            // Assets Management submenus
            ['main_menu_id' => $assetsMainId, 'code' => 'S01', 'name' => 'Asset Operations', 'order' => 1],
            ['main_menu_id' => $assetsMainId, 'code' => 'S02', 'name' => 'Maintenance', 'order' => 2],
            ['main_menu_id' => $assetsMainId, 'code' => 'S03', 'name' => 'Depreciation', 'order' => 3],
            ['main_menu_id' => $assetsMainId, 'code' => 'S04', 'name' => 'Reports', 'order' => 4],
            
            // Project submenus
            ['main_menu_id' => $projectMainId, 'code' => 'S01', 'name' => 'Project Management', 'order' => 1],
            ['main_menu_id' => $projectMainId, 'code' => 'S02', 'name' => 'Budgeting', 'order' => 2],
            ['main_menu_id' => $projectMainId, 'code' => 'S03', 'name' => 'Reports', 'order' => 3],
            
            // CRM submenus
            ['main_menu_id' => $crmMainId, 'code' => 'S01', 'name' => 'Lead Management', 'order' => 1],
            ['main_menu_id' => $crmMainId, 'code' => 'S02', 'name' => 'Customer Activities', 'order' => 2],
            ['main_menu_id' => $crmMainId, 'code' => 'S03', 'name' => 'Reports', 'order' => 3],
            
            // Reports & Analytics submenus
            ['main_menu_id' => $reportsMainId, 'code' => 'S01', 'name' => 'Operational Reports', 'order' => 1],
            ['main_menu_id' => $reportsMainId, 'code' => 'S02', 'name' => 'Financial Reports', 'order' => 2],
            ['main_menu_id' => $reportsMainId, 'code' => 'S03', 'name' => 'HR Reports', 'order' => 3],
            ['main_menu_id' => $reportsMainId, 'code' => 'S04', 'name' => 'Dashboard Analytics', 'order' => 4],
        ];

        $settingsId = DB::table('main_menus')->where('code', 'M12')->first()->id;

        $settingsSubmenus = [
            ['main_menu_id' => $settingsId, 'code' => 'S01', 'name' => 'User & Security', 'order' => 1],
        ];

        foreach ($settingsSubmenus as $submenu) {
            DB::table('submenus')->updateOrInsert(
                [
                    'main_menu_id' => $submenu['main_menu_id'],
                    'code' => $submenu['code'],
                ],
                [
                    'name' => $submenu['name'],
                    'order' => $submenu['order'],
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }

        foreach ($submenus as $submenu) {
            DB::table('submenus')->updateOrInsert(
                [
                    'main_menu_id' => $submenu['main_menu_id'],
                    'code' => $submenu['code'],
                ],
                [
                    'name' => $submenu['name'],
                    'order' => $submenu['order'],
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }

        // ============ MASTER DATA CHILD MENUS ============
        
        // Child Menus for Business Partner (S01)
        $businessPartnerId = DB::table('submenus')->where('main_menu_id', $masterDataId)->where('code', 'S01')->first()->id;
        $childMenusMD01 = [
            ['submenu_id' => $businessPartnerId, 'code' => 'C01', 'name' => 'Customer', 'href' => '/master-data/customer', 'order' => 1],
            ['submenu_id' => $businessPartnerId, 'code' => 'C02', 'name' => 'Supplier', 'href' => '/master-data/supplier', 'order' => 2],
            ['submenu_id' => $businessPartnerId, 'code' => 'C03', 'name' => 'Vendor', 'href' => '/master-data/vendor', 'order' => 3],
        ];

        // Child Menus for Inventory Master Data (S02)
        $inventoryMdId = DB::table('submenus')->where('main_menu_id', $masterDataId)->where('code', 'S02')->first()->id;
        $childMenusMD02 = [
            ['submenu_id' => $inventoryMdId, 'code' => 'C01', 'name' => 'Item Master', 'href' => '/master-data/item-master', 'order' => 1],
            ['submenu_id' => $inventoryMdId, 'code' => 'C02', 'name' => 'Category', 'href' => '/master-data/category', 'order' => 2],
            ['submenu_id' => $inventoryMdId, 'code' => 'C03', 'name' => 'Brand', 'href' => '/master-data/brand', 'order' => 3],
            ['submenu_id' => $inventoryMdId, 'code' => 'C04', 'name' => 'UOM', 'href' => '/master-data/uom', 'order' => 4],
            ['submenu_id' => $inventoryMdId, 'code' => 'C05', 'name' => 'Warehouse', 'href' => '/master-data/warehouse', 'order' => 5],
        ];

        // Child Menus for Asset Management Master Data (S03)
        $assetManagementMdId = DB::table('submenus')->where('main_menu_id', $masterDataId)->where('code', 'S03')->first()->id;
        $childMenusMD03 = [
            ['submenu_id' => $assetManagementMdId, 'code' => 'C01', 'name' => 'Asset', 'href' => '/master-data/asset', 'order' => 1],
            ['submenu_id' => $assetManagementMdId, 'code' => 'C02', 'name' => 'Asset Category', 'href' => '/master-data/asset-category', 'order' => 2],
            ['submenu_id' => $assetManagementMdId, 'code' => 'C03', 'name' => 'Asset Location', 'href' => '/master-data/asset-location', 'order' => 3],
            ['submenu_id' => $assetManagementMdId, 'code' => 'C04', 'name' => 'Asset Status', 'href' => '/master-data/asset-status', 'order' => 4],
        ];

        // Child Menus for Human Resource Master Data (S04)
        $hrMdId = DB::table('submenus')->where('main_menu_id', $masterDataId)->where('code', 'S04')->first()->id;
        $childMenusMD04 = [
            ['submenu_id' => $hrMdId, 'code' => 'C01', 'name' => 'Employee', 'href' => '/master-data/employee', 'order' => 1],
            ['submenu_id' => $hrMdId, 'code' => 'C02', 'name' => 'Department', 'href' => '/master-data/department', 'order' => 2],
            ['submenu_id' => $hrMdId, 'code' => 'C03', 'name' => 'Position', 'href' => '/master-data/position', 'order' => 3],
        ];

        // Child Menus for General (S00)
        $generalMdId = DB::table('submenus')->where('main_menu_id', $masterDataId)->where('code', 'S00')->first()->id;
        $childMenusMD00 = [
            ['submenu_id' => $generalMdId, 'code' => 'C01', 'name' => 'City', 'href' => '/dashboard/master-data/city', 'order' => 1],
            ['submenu_id' => $generalMdId, 'code' => 'C02', 'name' => 'Province', 'href' => '/dashboard/master-data/province', 'order' => 2],
            ['submenu_id' => $generalMdId, 'code' => 'C03', 'name' => 'Country', 'href' => '/dashboard/master-data/country', 'order' => 3],
            ['submenu_id' => $generalMdId, 'code' => 'C04', 'name' => 'Currency', 'href' => '/dashboard/master-data/currency', 'order' => 4],
        ];

        // Child Menus for Finance Master Data (S05)
        $financeMdId = DB::table('submenus')->where('main_menu_id', $masterDataId)->where('code', 'S05')->first()->id;
        $childMenusMD05 = [
            ['submenu_id' => $financeMdId, 'code' => 'C01', 'name' => 'COA', 'href' => '/master-data/coa', 'order' => 1],
            ['submenu_id' => $financeMdId, 'code' => 'C02', 'name' => 'Tax', 'href' => '/master-data/tax', 'order' => 2],
            ['submenu_id' => $financeMdId, 'code' => 'C03', 'name' => 'Payment Terms', 'href' => '/master-data/payment-terms', 'order' => 3],
        ];

        // ============ INVENTORY CHILD MENUS ============
        
        // Child Menus for Inventory Transactions (S01)
        $inventoryTransId = DB::table('submenus')->where('main_menu_id', $inventoryMainId)->where('code', 'S01')->first()->id;
        $childMenusINV01 = [
            ['submenu_id' => $inventoryTransId, 'code' => 'C01', 'name' => 'Goods Receipt', 'href' => '/inventory/goods-receipt', 'order' => 1],
            ['submenu_id' => $inventoryTransId, 'code' => 'C02', 'name' => 'Goods Issue', 'href' => '/inventory/goods-issue', 'order' => 2],
            ['submenu_id' => $inventoryTransId, 'code' => 'C03', 'name' => 'Stock Transfer', 'href' => '/inventory/stock-transfer', 'order' => 3],
            ['submenu_id' => $inventoryTransId, 'code' => 'C04', 'name' => 'Stock Adjustment', 'href' => '/inventory/stock-adjustment', 'order' => 4],
            ['submenu_id' => $inventoryTransId, 'code' => 'C05', 'name' => 'Stock Opname', 'href' => '/inventory/stock-opname', 'order' => 5],
        ];

        // Child Menus for Warehouse Operations (S02)
        $inventoryWhId = DB::table('submenus')->where('main_menu_id', $inventoryMainId)->where('code', 'S02')->first()->id;
        $childMenusINV02 = [
            ['submenu_id' => $inventoryWhId, 'code' => 'C01', 'name' => 'Bin Location', 'href' => '/inventory/bin-location', 'order' => 1],
            ['submenu_id' => $inventoryWhId, 'code' => 'C02', 'name' => 'Put Away', 'href' => '/inventory/put-away', 'order' => 2],
            ['submenu_id' => $inventoryWhId, 'code' => 'C03', 'name' => 'Picking', 'href' => '/inventory/picking', 'order' => 3],
            ['submenu_id' => $inventoryWhId, 'code' => 'C04', 'name' => 'Packing', 'href' => '/inventory/packing', 'order' => 4],
        ];

        // Child Menus for Cold Storage (S03)
        $inventoryCsId = DB::table('submenus')->where('main_menu_id', $inventoryMainId)->where('code', 'S03')->first()->id;
        $childMenusINV03 = [
            ['submenu_id' => $inventoryCsId, 'code' => 'C01', 'name' => 'Cold Room', 'href' => '/inventory/cold-room', 'order' => 1],
            ['submenu_id' => $inventoryCsId, 'code' => 'C02', 'name' => 'Temperature Monitoring', 'href' => '/inventory/temperature-monitoring', 'order' => 2],
            ['submenu_id' => $inventoryCsId, 'code' => 'C03', 'name' => 'Pallet Tracking', 'href' => '/inventory/pallet-tracking', 'order' => 3],
            ['submenu_id' => $inventoryCsId, 'code' => 'C04', 'name' => 'Storage Utilization', 'href' => '/inventory/storage-utilization', 'order' => 4],
        ];

        // Child Menus for Inventory Reports (S04)
        $inventoryRepId = DB::table('submenus')->where('main_menu_id', $inventoryMainId)->where('code', 'S04')->first()->id;
        $childMenusINV04 = [
            ['submenu_id' => $inventoryRepId, 'code' => 'C01', 'name' => 'Stock Card', 'href' => '/inventory/stock-card', 'order' => 1],
            ['submenu_id' => $inventoryRepId, 'code' => 'C02', 'name' => 'Inventory Movement', 'href' => '/inventory/inventory-movement', 'order' => 2],
            ['submenu_id' => $inventoryRepId, 'code' => 'C03', 'name' => 'Aging Stock', 'href' => '/inventory/aging-stock', 'order' => 3],
            ['submenu_id' => $inventoryRepId, 'code' => 'C04', 'name' => 'Inventory Valuation', 'href' => '/inventory/inventory-valuation', 'order' => 4],
        ];

        // ============ PRODUCTION CHILD MENUS ============
        
        // Child Menus for Production Planning (S01)
        $productionPlanId = DB::table('submenus')->where('main_menu_id', $productionMainId)->where('code', 'S01')->first()->id;
        $childMenusPRD01 = [
            ['submenu_id' => $productionPlanId, 'code' => 'C01', 'name' => 'BOM', 'href' => '/production/bom', 'order' => 1],
            ['submenu_id' => $productionPlanId, 'code' => 'C02', 'name' => 'Production Planning', 'href' => '/production/production-planning', 'order' => 2],
            ['submenu_id' => $productionPlanId, 'code' => 'C03', 'name' => 'Material Requirement Planning', 'href' => '/production/material-requirement-planning', 'order' => 3],
        ];

        // Child Menus for Production Execution (S02)
        $productionExecId = DB::table('submenus')->where('main_menu_id', $productionMainId)->where('code', 'S02')->first()->id;
        $childMenusPRD02 = [
            ['submenu_id' => $productionExecId, 'code' => 'C01', 'name' => 'Work Order', 'href' => '/production/work-order', 'order' => 1],
            ['submenu_id' => $productionExecId, 'code' => 'C02', 'name' => 'Material Issue', 'href' => '/production/material-issue', 'order' => 2],
            ['submenu_id' => $productionExecId, 'code' => 'C03', 'name' => 'Production Receipt', 'href' => '/production/production-receipt', 'order' => 3],
            ['submenu_id' => $productionExecId, 'code' => 'C04', 'name' => 'Production Completion', 'href' => '/production/production-completion', 'order' => 4],
        ];

        // Child Menus for Production Reports (S03)
        $productionRepId = DB::table('submenus')->where('main_menu_id', $productionMainId)->where('code', 'S03')->first()->id;
        $childMenusPRD03 = [
            ['submenu_id' => $productionRepId, 'code' => 'C01', 'name' => 'Production Report', 'href' => '/production/production-report', 'order' => 1],
            ['submenu_id' => $productionRepId, 'code' => 'C02', 'name' => 'Material Consumption', 'href' => '/production/material-consumption', 'order' => 2],
            ['submenu_id' => $productionRepId, 'code' => 'C03', 'name' => 'Production Cost', 'href' => '/production/production-cost', 'order' => 3],
        ];

        // ============ FINANCE CHILD MENUS ============
        
        // Child Menus for General Ledger (S01)
        $financeGLId = DB::table('submenus')->where('main_menu_id', $financeMainId)->where('code', 'S01')->first()->id;
        $childMenusFIN01 = [
            ['submenu_id' => $financeGLId, 'code' => 'C01', 'name' => 'Journal Entry', 'href' => '/finance/journal-entry', 'order' => 1],
            ['submenu_id' => $financeGLId, 'code' => 'C02', 'name' => 'Recurring Journal', 'href' => '/finance/recurring-journal', 'order' => 2],
            ['submenu_id' => $financeGLId, 'code' => 'C03', 'name' => 'Journal Approval', 'href' => '/finance/journal-approval', 'order' => 3],
        ];

        // Child Menus for Cash & Bank (S02)
        $financeCBId = DB::table('submenus')->where('main_menu_id', $financeMainId)->where('code', 'S02')->first()->id;
        $childMenusFIN02 = [
            ['submenu_id' => $financeCBId, 'code' => 'C01', 'name' => 'Cash In', 'href' => '/finance/cash-in', 'order' => 1],
            ['submenu_id' => $financeCBId, 'code' => 'C02', 'name' => 'Cash Out', 'href' => '/finance/cash-out', 'order' => 2],
            ['submenu_id' => $financeCBId, 'code' => 'C03', 'name' => 'Bank Transfer', 'href' => '/finance/bank-transfer', 'order' => 3],
            ['submenu_id' => $financeCBId, 'code' => 'C04', 'name' => 'Bank Reconciliation', 'href' => '/finance/bank-reconciliation', 'order' => 4],
        ];

        // Child Menus for Accounts Receivable (S03)
        $financeARId = DB::table('submenus')->where('main_menu_id', $financeMainId)->where('code', 'S03')->first()->id;
        $childMenusFIN03 = [
            ['submenu_id' => $financeARId, 'code' => 'C01', 'name' => 'Customer Invoice', 'href' => '/finance/customer-invoice', 'order' => 1],
            ['submenu_id' => $financeARId, 'code' => 'C02', 'name' => 'Customer Payment', 'href' => '/finance/customer-payment', 'order' => 2],
            ['submenu_id' => $financeARId, 'code' => 'C03', 'name' => 'Outstanding Receivable', 'href' => '/finance/outstanding-receivable', 'order' => 3],
        ];

        // Child Menus for Accounts Payable (S04)
        $financeAPId = DB::table('submenus')->where('main_menu_id', $financeMainId)->where('code', 'S04')->first()->id;
        $childMenusFIN04 = [
            ['submenu_id' => $financeAPId, 'code' => 'C01', 'name' => 'Supplier Invoice', 'href' => '/finance/supplier-invoice', 'order' => 1],
            ['submenu_id' => $financeAPId, 'code' => 'C02', 'name' => 'Supplier Payment', 'href' => '/finance/supplier-payment', 'order' => 2],
            ['submenu_id' => $financeAPId, 'code' => 'C03', 'name' => 'Outstanding Payable', 'href' => '/finance/outstanding-payable', 'order' => 3],
        ];

        // Child Menus for Financial Reports (S05)
        $financeRepId = DB::table('submenus')->where('main_menu_id', $financeMainId)->where('code', 'S05')->first()->id;
        $childMenusFIN05 = [
            ['submenu_id' => $financeRepId, 'code' => 'C01', 'name' => 'Trial Balance', 'href' => '/finance/trial-balance', 'order' => 1],
            ['submenu_id' => $financeRepId, 'code' => 'C02', 'name' => 'Profit & Loss', 'href' => '/finance/profit-loss', 'order' => 2],
            ['submenu_id' => $financeRepId, 'code' => 'C03', 'name' => 'Balance Sheet', 'href' => '/finance/balance-sheet', 'order' => 3],
            ['submenu_id' => $financeRepId, 'code' => 'C04', 'name' => 'Cash Flow', 'href' => '/finance/cash-flow', 'order' => 4],
        ];

        // ============ HR & PAYROLL CHILD MENUS ============
        
        // Child Menus for Employee Management (S01)
        $hrEmpId = DB::table('submenus')->where('main_menu_id', $hrPayrollMainId)->where('code', 'S01')->first()->id;
        $childMenusHR01 = [
            ['submenu_id' => $hrEmpId, 'code' => 'C01', 'name' => 'Employee Profile', 'href' => '/hrpayroll/employee-profile', 'order' => 1],
            ['submenu_id' => $hrEmpId, 'code' => 'C02', 'name' => 'Employee Contract', 'href' => '/hrpayroll/employee-contract', 'order' => 2],
            ['submenu_id' => $hrEmpId, 'code' => 'C03', 'name' => 'Employee Document', 'href' => '/hrpayroll/employee-document', 'order' => 3],
        ];

        // Child Menus for Attendance (S02)
        $hrAttId = DB::table('submenus')->where('main_menu_id', $hrPayrollMainId)->where('code', 'S02')->first()->id;
        $childMenusHR02 = [
            ['submenu_id' => $hrAttId, 'code' => 'C01', 'name' => 'Attendance Log', 'href' => '/hrpayroll/attendance-log', 'order' => 1],
            ['submenu_id' => $hrAttId, 'code' => 'C02', 'name' => 'Shift Schedule', 'href' => '/hrpayroll/shift-schedule', 'order' => 2],
            ['submenu_id' => $hrAttId, 'code' => 'C03', 'name' => 'Overtime', 'href' => '/hrpayroll/overtime', 'order' => 3],
            ['submenu_id' => $hrAttId, 'code' => 'C04', 'name' => 'Leave Request', 'href' => '/hrpayroll/leave-request', 'order' => 4],
        ];

        // Child Menus for Payroll (S03)
        $hrPayrollId = DB::table('submenus')->where('main_menu_id', $hrPayrollMainId)->where('code', 'S03')->first()->id;
        $childMenusHR03 = [
            ['submenu_id' => $hrPayrollId, 'code' => 'C01', 'name' => 'Payroll Process', 'href' => '/hrpayroll/payroll-process', 'order' => 1],
            ['submenu_id' => $hrPayrollId, 'code' => 'C02', 'name' => 'Payroll Component', 'href' => '/hrpayroll/payroll-component', 'order' => 2],
            ['submenu_id' => $hrPayrollId, 'code' => 'C03', 'name' => 'Payslip', 'href' => '/hrpayroll/payslip', 'order' => 3],
            ['submenu_id' => $hrPayrollId, 'code' => 'C04', 'name' => 'Payroll History', 'href' => '/hrpayroll/payroll-history', 'order' => 4],
        ];

        // Child Menus for HR Reports (S04)
        $hrRepId = DB::table('submenus')->where('main_menu_id', $hrPayrollMainId)->where('code', 'S04')->first()->id;
        $childMenusHR04 = [
            ['submenu_id' => $hrRepId, 'code' => 'C01', 'name' => 'Attendance Report', 'href' => '/hrpayroll/attendance-report', 'order' => 1],
            ['submenu_id' => $hrRepId, 'code' => 'C02', 'name' => 'Leave Report', 'href' => '/hrpayroll/leave-report', 'order' => 2],
            ['submenu_id' => $hrRepId, 'code' => 'C03', 'name' => 'Payroll Report', 'href' => '/hrpayroll/payroll-report', 'order' => 3],
        ];

        // ============ ASSETS MANAGEMENT CHILD MENUS ============
        
        // Child Menus for Asset Operations (S01)
        $assetsOpId = DB::table('submenus')->where('main_menu_id', $assetsMainId)->where('code', 'S01')->first()->id;
        $childMenusASS01 = [
            ['submenu_id' => $assetsOpId, 'code' => 'C01', 'name' => 'Asset Registration', 'href' => '/assets-management/asset-registration', 'order' => 1],
            ['submenu_id' => $assetsOpId, 'code' => 'C02', 'name' => 'Asset Assignment', 'href' => '/assets-management/asset-assignment', 'order' => 2],
            ['submenu_id' => $assetsOpId, 'code' => 'C03', 'name' => 'Asset Transfer', 'href' => '/assets-management/asset-transfer', 'order' => 3],
            ['submenu_id' => $assetsOpId, 'code' => 'C04', 'name' => 'Asset Disposal', 'href' => '/assets-management/asset-disposal', 'order' => 4],
        ];

        // Child Menus for Maintenance (S02)
        $assetsMaintId = DB::table('submenus')->where('main_menu_id', $assetsMainId)->where('code', 'S02')->first()->id;
        $childMenusASS02 = [
            ['submenu_id' => $assetsMaintId, 'code' => 'C01', 'name' => 'Maintenance Request', 'href' => '/assets-management/maintenance-request', 'order' => 1],
            ['submenu_id' => $assetsMaintId, 'code' => 'C02', 'name' => 'Maintenance Schedule', 'href' => '/assets-management/maintenance-schedule', 'order' => 2],
            ['submenu_id' => $assetsMaintId, 'code' => 'C03', 'name' => 'Maintenance History', 'href' => '/assets-management/maintenance-history', 'order' => 3],
            ['submenu_id' => $assetsMaintId, 'code' => 'C04', 'name' => 'Repair Tracking', 'href' => '/assets-management/repair-tracking', 'order' => 4],
        ];

        // Child Menus for Depreciation (S03)
        $assetsDepId = DB::table('submenus')->where('main_menu_id', $assetsMainId)->where('code', 'S03')->first()->id;
        $childMenusASS03 = [
            ['submenu_id' => $assetsDepId, 'code' => 'C01', 'name' => 'Depreciation Process', 'href' => '/assets-management/depreciation-process', 'order' => 1],
            ['submenu_id' => $assetsDepId, 'code' => 'C02', 'name' => 'Depreciation History', 'href' => '/assets-management/depreciation-history', 'order' => 2],
            ['submenu_id' => $assetsDepId, 'code' => 'C03', 'name' => 'Asset Valuation', 'href' => '/assets-management/asset-valuation', 'order' => 3],
        ];

        // Child Menus for Assets Reports (S04)
        $assetsRepId = DB::table('submenus')->where('main_menu_id', $assetsMainId)->where('code', 'S04')->first()->id;
        $childMenusASS04 = [
            ['submenu_id' => $assetsRepId, 'code' => 'C01', 'name' => 'Asset Register Report', 'href' => '/assets-management/asset-register-report', 'order' => 1],
            ['submenu_id' => $assetsRepId, 'code' => 'C02', 'name' => 'Maintenance Report', 'href' => '/assets-management/maintenance-report', 'order' => 2],
            ['submenu_id' => $assetsRepId, 'code' => 'C03', 'name' => 'Depreciation Report', 'href' => '/assets-management/depreciation-report', 'order' => 3],
        ];

        // ============ PROJECT CHILD MENUS ============
        
        // Child Menus for Project Management (S01)
        $projectMgmtId = DB::table('submenus')->where('main_menu_id', $projectMainId)->where('code', 'S01')->first()->id;
        $childMenusPRJ01 = [
            ['submenu_id' => $projectMgmtId, 'code' => 'C01', 'name' => 'Project Master', 'href' => '/project/project-master', 'order' => 1],
            ['submenu_id' => $projectMgmtId, 'code' => 'C02', 'name' => 'Project Task', 'href' => '/project/project-task', 'order' => 2],
            ['submenu_id' => $projectMgmtId, 'code' => 'C03', 'name' => 'Milestone', 'href' => '/project/milestone', 'order' => 3],
            ['submenu_id' => $projectMgmtId, 'code' => 'C04', 'name' => 'Project Timeline', 'href' => '/project/project-timeline', 'order' => 4],
        ];

        // Child Menus for Budgeting (S02)
        $projectBudgId = DB::table('submenus')->where('main_menu_id', $projectMainId)->where('code', 'S02')->first()->id;
        $childMenusPRJ02 = [
            ['submenu_id' => $projectBudgId, 'code' => 'C01', 'name' => 'Budget Plan', 'href' => '/project/budget-plan', 'order' => 1],
            ['submenu_id' => $projectBudgId, 'code' => 'C02', 'name' => 'Budget Realization', 'href' => '/project/budget-realization', 'order' => 2],
            ['submenu_id' => $projectBudgId, 'code' => 'C03', 'name' => 'Project Cost', 'href' => '/project/project-cost', 'order' => 3],
        ];

        // Child Menus for Project Reports (S03)
        $projectRepId = DB::table('submenus')->where('main_menu_id', $projectMainId)->where('code', 'S03')->first()->id;
        $childMenusPRJ03 = [
            ['submenu_id' => $projectRepId, 'code' => 'C01', 'name' => 'Progress Report', 'href' => '/project/progress-report', 'order' => 1],
            ['submenu_id' => $projectRepId, 'code' => 'C02', 'name' => 'Budget Report', 'href' => '/project/budget-report', 'order' => 2],
            ['submenu_id' => $projectRepId, 'code' => 'C03', 'name' => 'Cost Report', 'href' => '/project/cost-report', 'order' => 3],
        ];

        // ============ CRM CHILD MENUS ============
        
        // Child Menus for Lead Management (S01)
        $crmLeadId = DB::table('submenus')->where('main_menu_id', $crmMainId)->where('code', 'S01')->first()->id;
        $childMenusCRM01 = [
            ['submenu_id' => $crmLeadId, 'code' => 'C01', 'name' => 'Lead', 'href' => '/crm/lead', 'order' => 1],
            ['submenu_id' => $crmLeadId, 'code' => 'C02', 'name' => 'Opportunity', 'href' => '/crm/opportunity', 'order' => 2],
            ['submenu_id' => $crmLeadId, 'code' => 'C03', 'name' => 'Lead Source', 'href' => '/crm/lead-source', 'order' => 3],
        ];

        // Child Menus for Customer Activities (S02)
        $crmActId = DB::table('submenus')->where('main_menu_id', $crmMainId)->where('code', 'S02')->first()->id;
        $childMenusCRM02 = [
            ['submenu_id' => $crmActId, 'code' => 'C01', 'name' => 'Meeting', 'href' => '/crm/meeting', 'order' => 1],
            ['submenu_id' => $crmActId, 'code' => 'C02', 'name' => 'Call Log', 'href' => '/crm/call-log', 'order' => 2],
            ['submenu_id' => $crmActId, 'code' => 'C03', 'name' => 'Follow Up', 'href' => '/crm/follow-up', 'order' => 3],
            ['submenu_id' => $crmActId, 'code' => 'C04', 'name' => 'Visit Report', 'href' => '/crm/visit-report', 'order' => 4],
        ];

        // Child Menus for CRM Reports (S03)
        $crmRepId = DB::table('submenus')->where('main_menu_id', $crmMainId)->where('code', 'S03')->first()->id;
        $childMenusCRM03 = [
            ['submenu_id' => $crmRepId, 'code' => 'C01', 'name' => 'Lead Report', 'href' => '/crm/lead-report', 'order' => 1],
            ['submenu_id' => $crmRepId, 'code' => 'C02', 'name' => 'Opportunity Report', 'href' => '/crm/opportunity-report', 'order' => 2],
            ['submenu_id' => $crmRepId, 'code' => 'C03', 'name' => 'Conversion Report', 'href' => '/crm/conversion-report', 'order' => 3],
        ];

        // ============ REPORTS & ANALYTICS CHILD MENUS ============
        
        // Child Menus for Operational Reports (S01)
        $reportsOpId = DB::table('submenus')->where('main_menu_id', $reportsMainId)->where('code', 'S01')->first()->id;
        $childMenusREP01 = [
            ['submenu_id' => $reportsOpId, 'code' => 'C01', 'name' => 'Sales Report', 'href' => '/report-analytics/sales-report', 'order' => 1],
            ['submenu_id' => $reportsOpId, 'code' => 'C02', 'name' => 'Purchase Report', 'href' => '/report-analytics/purchase-report', 'order' => 2],
            ['submenu_id' => $reportsOpId, 'code' => 'C03', 'name' => 'Inventory Report', 'href' => '/report-analytics/inventory-report', 'order' => 3],
            ['submenu_id' => $reportsOpId, 'code' => 'C04', 'name' => 'Asset Report', 'href' => '/report-analytics/asset-report', 'order' => 4],
        ];

        // Child Menus for Financial Reports (S02)
        $reportsFinId = DB::table('submenus')->where('main_menu_id', $reportsMainId)->where('code', 'S02')->first()->id;
        $childMenusREP02 = [
            ['submenu_id' => $reportsFinId, 'code' => 'C01', 'name' => 'Profit & Loss', 'href' => '/report-analytics/profit-loss', 'order' => 1],
            ['submenu_id' => $reportsFinId, 'code' => 'C02', 'name' => 'Balance Sheet', 'href' => '/report-analytics/balance-sheet', 'order' => 2],
            ['submenu_id' => $reportsFinId, 'code' => 'C03', 'name' => 'Cash Flow', 'href' => '/report-analytics/cash-flow', 'order' => 3],
            ['submenu_id' => $reportsFinId, 'code' => 'C04', 'name' => 'Trial Balance', 'href' => '/report-analytics/trial-balance', 'order' => 4],
        ];

        // Child Menus for HR Reports (S03)
        $reportsHRId = DB::table('submenus')->where('main_menu_id', $reportsMainId)->where('code', 'S03')->first()->id;
        $childMenusREP03 = [
            ['submenu_id' => $reportsHRId, 'code' => 'C01', 'name' => 'Attendance Report', 'href' => '/report-analytics/attendance-report', 'order' => 1],
            ['submenu_id' => $reportsHRId, 'code' => 'C02', 'name' => 'Leave Report', 'href' => '/report-analytics/leave-report', 'order' => 2],
            ['submenu_id' => $reportsHRId, 'code' => 'C03', 'name' => 'Payroll Report', 'href' => '/report-analytics/payroll-report', 'order' => 3],
        ];

        // Child Menus for Dashboard Analytics (S04)
        $reportsDashId = DB::table('submenus')->where('main_menu_id', $reportsMainId)->where('code', 'S04')->first()->id;
        $childMenusREP04 = [
            ['submenu_id' => $reportsDashId, 'code' => 'C01', 'name' => 'KPI Dashboard', 'href' => '/report-analytics/kpi-dashboard', 'order' => 1],
            ['submenu_id' => $reportsDashId, 'code' => 'C02', 'name' => 'Executive Dashboard', 'href' => '/report-analytics/executive-dashboard', 'order' => 2],
            ['submenu_id' => $reportsDashId, 'code' => 'C03', 'name' => 'Operational Dashboard', 'href' => '/report-analytics/operational-dashboard', 'order' => 3],
        ];

        // ============ SETTINGS CHILD MENUS ============
        
        $settingsSubmenuId = DB::table('submenus')->where('main_menu_id', $settingsId)->where('code', 'S01')->first()->id;
        $childMenusS12 = [
            ['submenu_id' => $settingsSubmenuId, 'code' => 'C01', 'name' => 'Users', 'href' => '/Settings/users', 'order' => 1],
            ['submenu_id' => $settingsSubmenuId, 'code' => 'C02', 'name' => 'Roles', 'href' => '/Settings/roles', 'order' => 2],
        ];

        // ============ MERGE ALL CHILD MENUS ============
        
        // Merge all child menus
        $childMenus = array_merge(
            $childMenusMD01, $childMenusMD02, $childMenusMD03, $childMenusMD04, $childMenusMD00, $childMenusMD05,
            $childMenusINV01, $childMenusINV02, $childMenusINV03, $childMenusINV04,
            $childMenusPRD01, $childMenusPRD02, $childMenusPRD03,
            $childMenusFIN01, $childMenusFIN02, $childMenusFIN03, $childMenusFIN04, $childMenusFIN05,
            $childMenusHR01, $childMenusHR02, $childMenusHR03, $childMenusHR04,
            $childMenusASS01, $childMenusASS02, $childMenusASS03, $childMenusASS04,
            $childMenusPRJ01, $childMenusPRJ02, $childMenusPRJ03,
            $childMenusCRM01, $childMenusCRM02, $childMenusCRM03,
            $childMenusREP01, $childMenusREP02, $childMenusREP03, $childMenusREP04,
            $childMenusS12
        );

        foreach ($childMenus as $childMenu) {
            DB::table('child_menus')->updateOrInsert(
                [
                    'submenu_id' => $childMenu['submenu_id'],
                    'code' => $childMenu['code'],
                ],
                [
                    'name' => $childMenu['name'],
                    'href' => $childMenu['href'],
                    'order' => $childMenu['order'],
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }
    }
}
