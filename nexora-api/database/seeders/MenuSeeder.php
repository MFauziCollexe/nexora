<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        // ============ MAIN MENUS ============

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

        $mainM00 = DB::table('main_menus')->where('code', 'M00')->first()->id;
        $mainM01 = DB::table('main_menus')->where('code', 'M01')->first()->id;

        // Submenus for Master Data (M01)
        $subM01 = [
            ['main_menu_id' => $mainM01, 'code' => 'S01', 'name' => 'Business Partner', 'href' => null, 'order' => 1],
            ['main_menu_id' => $mainM01, 'code' => 'S02', 'name' => 'Inventory', 'href' => null, 'order' => 2],
            ['main_menu_id' => $mainM01, 'code' => 'S03', 'name' => 'Asset Management', 'href' => null, 'order' => 3],
            ['main_menu_id' => $mainM01, 'code' => 'S04', 'name' => 'Human Resource', 'href' => null, 'order' => 4],
            ['main_menu_id' => $mainM01, 'code' => 'S05', 'name' => 'Finance', 'href' => null, 'order' => 5],
            ['main_menu_id' => $mainM01, 'code' => 'S07', 'name' => 'Company Profile', 'href' => null, 'order' => 6],
        ];

        foreach ($subM01 as $submenu) {
            DB::table('submenus')->updateOrInsert(
                ['main_menu_id' => $submenu['main_menu_id'], 'code' => $submenu['code']],
                ['name' => $submenu['name'], 'href' => $submenu['href'], 'order' => $submenu['order'], 'updated_at' => now(), 'created_at' => now()]
            );
        }

        $subM01S01Id = DB::table('submenus')->where('main_menu_id', $mainM01)->where('code', 'S01')->first()->id;
        // Child Menus for Business Partner (S01)
        $childM01S01 = [
            ['submenu_id' => $subM01S01Id, 'code' => 'C01', 'name' => 'Customer', 'href' => '/master-data/customer', 'order' => 1],
            ['submenu_id' => $subM01S01Id, 'code' => 'C02', 'name' => 'Supplier', 'href' => '/master-data/supplier', 'order' => 2],
            ['submenu_id' => $subM01S01Id, 'code' => 'C03', 'name' => 'Vendor', 'href' => '/master-data/vendor', 'order' => 3],
            ['submenu_id' => $subM01S01Id, 'code' => 'C04', 'name' => 'Vendor Type', 'href' => '/master-data/vendor-type', 'order' => 4],
            ['submenu_id' => $subM01S01Id, 'code' => 'C05', 'name' => 'Supplier Type', 'href' => '/master-data/supplier-type', 'order' => 5],
            ['submenu_id' => $subM01S01Id, 'code' => 'C06', 'name' => 'Supplier Category', 'href' => '/master-data/supplier-category', 'order' => 6],
        ];

        $subM01S02Id = DB::table('submenus')->where('main_menu_id', $mainM01)->where('code', 'S02')->first()->id;
        // Child Menus for Inventory (S02)
        $childM01S02 = [
            ['submenu_id' => $subM01S02Id, 'code' => 'C01', 'name' => 'Item Master', 'href' => '/master-data/item-master', 'order' => 1],
            ['submenu_id' => $subM01S02Id, 'code' => 'C02', 'name' => 'Category', 'href' => '/master-data/category', 'order' => 2],
            ['submenu_id' => $subM01S02Id, 'code' => 'C03', 'name' => 'Brand', 'href' => '/master-data/brand', 'order' => 3],
            ['submenu_id' => $subM01S02Id, 'code' => 'C04', 'name' => 'UOM', 'href' => '/master-data/uom', 'order' => 4],
            ['submenu_id' => $subM01S02Id, 'code' => 'C05', 'name' => 'Warehouse', 'href' => '/master-data/warehouse', 'order' => 5],
        ];

        $subM01S03Id = DB::table('submenus')->where('main_menu_id', $mainM01)->where('code', 'S03')->first()->id;
        // Child Menus for Asset Management (S03)
        $childM01S03 = [
            ['submenu_id' => $subM01S03Id, 'code' => 'C01', 'name' => 'Asset', 'href' => '/master-data/asset', 'order' => 1],
            ['submenu_id' => $subM01S03Id, 'code' => 'C02', 'name' => 'Asset Category', 'href' => '/master-data/asset-category', 'order' => 2],
            ['submenu_id' => $subM01S03Id, 'code' => 'C03', 'name' => 'Asset Location', 'href' => '/master-data/asset-location', 'order' => 3],
            ['submenu_id' => $subM01S03Id, 'code' => 'C04', 'name' => 'Asset Status', 'href' => '/master-data/asset-status', 'order' => 4],
        ];

        $subM01S04Id = DB::table('submenus')->where('main_menu_id', $mainM01)->where('code', 'S04')->first()->id;
        // Child Menus for Human Resource (S04)
        $childM01S04 = [
            ['submenu_id' => $subM01S04Id, 'code' => 'C01', 'name' => 'Employee', 'href' => '/master-data/employee', 'order' => 1],
            ['submenu_id' => $subM01S04Id, 'code' => 'C02', 'name' => 'Department', 'href' => '/master-data/department', 'order' => 2],
            ['submenu_id' => $subM01S04Id, 'code' => 'C03', 'name' => 'Position', 'href' => '/master-data/position', 'order' => 3],
        ];

        $subM01S05Id = DB::table('submenus')->where('main_menu_id', $mainM01)->where('code', 'S05')->first()->id;
        // Child Menus for Finance (S05)
        $childM01S05 = [
            ['submenu_id' => $subM01S05Id, 'code' => 'C01', 'name' => 'COA', 'href' => '/master-data/coa', 'order' => 1],
            ['submenu_id' => $subM01S05Id, 'code' => 'C02', 'name' => 'Tax', 'href' => '/master-data/tax', 'order' => 2],
            ['submenu_id' => $subM01S05Id, 'code' => 'C03', 'name' => 'Payment Terms', 'href' => '/master-data/payment-terms', 'order' => 3],
        ];

        $subM01S07Id = DB::table('submenus')->where('main_menu_id', $mainM01)->where('code', 'S07')->first()->id;
        // Child Menus for Company Profile (S07)
        $childM01S07 = [
            ['submenu_id' => $subM01S07Id, 'code' => 'C01', 'name' => 'Branch', 'href' => '/master-data/branch', 'order' => 1],
            ['submenu_id' => $subM01S07Id, 'code' => 'C02', 'name' => 'Currency', 'href' => '/master-data/currency', 'order' => 2],
            ['submenu_id' => $subM01S07Id, 'code' => 'C03', 'name' => 'Fiscal Year', 'href' => '/master-data/fiscal-year', 'order' => 3],
        ];

        $mainM02 = DB::table('main_menus')->where('code', 'M02')->first()->id;

        // Submenus for Sales (M02)
        $subM02 = [
            ['main_menu_id' => $mainM02, 'code' => 'S01', 'name' => 'Sales Management', 'href' => null, 'order' => 1],
            ['main_menu_id' => $mainM02, 'code' => 'S03', 'name' => 'Reports', 'href' => null, 'order' => 2],
        ];

        foreach ($subM02 as $submenu) {
            DB::table('submenus')->updateOrInsert(
                ['main_menu_id' => $submenu['main_menu_id'], 'code' => $submenu['code']],
                ['name' => $submenu['name'], 'href' => $submenu['href'], 'order' => $submenu['order'], 'updated_at' => now(), 'created_at' => now()]
            );
        }

        $subM02S01Id = DB::table('submenus')->where('main_menu_id', $mainM02)->where('code', 'S01')->first()->id;
        // Child Menus for Sales Management (S01)
        $childM02S01 = [
            ['submenu_id' => $subM02S01Id, 'code' => 'C01', 'name' => 'Quotations', 'href' => '/sales/sales-management/quotations', 'order' => 1],
            ['submenu_id' => $subM02S01Id, 'code' => 'C02', 'name' => 'Sales Orders', 'href' => '/sales/sales-management/sales-orders', 'order' => 2],
            ['submenu_id' => $subM02S01Id, 'code' => 'C07', 'name' => 'Deliver Orders', 'href' => '/sales/sales-management/delivery-orders', 'order' => 3],
            ['submenu_id' => $subM02S01Id, 'code' => 'C03', 'name' => 'Invoices', 'href' => '/sales/sales-management/invoices', 'order' => 4],
            ['submenu_id' => $subM02S01Id, 'code' => 'C04', 'name' => 'Delivery Notes', 'href' => '/sales/sales-management/delivery-notes', 'order' => 5],
            ['submenu_id' => $subM02S01Id, 'code' => 'C05', 'name' => 'Sales Return', 'href' => '/sales/sales-management/sales-returns', 'order' => 6],
            ['submenu_id' => $subM02S01Id, 'code' => 'C06', 'name' => 'Credit Note', 'href' => '/sales/sales-management/credit-notes', 'order' => 7],
        ];

        $subM02S03Id = DB::table('submenus')->where('main_menu_id', $mainM02)->where('code', 'S03')->first()->id;
        // Child Menus for Reports (S03)
        $childM02S03 = [
            ['submenu_id' => $subM02S03Id, 'code' => 'C01', 'name' => 'Sales Report', 'href' => '/sales/sales-report', 'order' => 1],
            ['submenu_id' => $subM02S03Id, 'code' => 'C02', 'name' => 'Customer Sales Report', 'href' => '/sales/customer-sales-report', 'order' => 2],
            ['submenu_id' => $subM02S03Id, 'code' => 'C03', 'name' => 'Outstanding Invoice', 'href' => '/sales/outstanding-invoice', 'order' => 3],
        ];

        $mainM03 = DB::table('main_menus')->where('code', 'M03')->first()->id;

        // Submenus for Purchase (M03)
        $subM03 = [
            ['main_menu_id' => $mainM03, 'code' => 'S01', 'name' => 'Procurement', 'href' => null, 'order' => 1],
            ['main_menu_id' => $mainM03, 'code' => 'S02', 'name' => 'Receiving', 'href' => null, 'order' => 2],
            ['main_menu_id' => $mainM03, 'code' => 'S03', 'name' => 'Payables', 'href' => null, 'order' => 3],
            ['main_menu_id' => $mainM03, 'code' => 'S04', 'name' => 'Reports', 'href' => null, 'order' => 4],
        ];

        foreach ($subM03 as $submenu) {
            DB::table('submenus')->updateOrInsert(
                ['main_menu_id' => $submenu['main_menu_id'], 'code' => $submenu['code']],
                ['name' => $submenu['name'], 'href' => $submenu['href'], 'order' => $submenu['order'], 'updated_at' => now(), 'created_at' => now()]
            );
        }

        $subM03S01Id = DB::table('submenus')->where('main_menu_id', $mainM03)->where('code', 'S01')->first()->id;
        // Child Menus for Procurement (S01)
        $childM03S01 = [
            ['submenu_id' => $subM03S01Id, 'code' => 'C01', 'name' => 'Purchase Request', 'href' => '/purchase/purchase-request', 'order' => 1],
            ['submenu_id' => $subM03S01Id, 'code' => 'C02', 'name' => 'RFQ', 'href' => '/purchase/rfq', 'order' => 2],
            ['submenu_id' => $subM03S01Id, 'code' => 'C03', 'name' => 'Purchase Order', 'href' => '/purchase/purchase-order', 'order' => 3],
            ['submenu_id' => $subM03S01Id, 'code' => 'C04', 'name' => 'Purchase Contract', 'href' => '/purchase/purchase-contract', 'order' => 4],
        ];

        $subM03S02Id = DB::table('submenus')->where('main_menu_id', $mainM03)->where('code', 'S02')->first()->id;
        // Child Menus for Receiving (S02)
        $childM03S02 = [
            ['submenu_id' => $subM03S02Id, 'code' => 'C01', 'name' => 'Goods Receipt', 'href' => '/purchase/goods-receipt', 'order' => 1],
            ['submenu_id' => $subM03S02Id, 'code' => 'C02', 'name' => 'Supplier Return', 'href' => '/purchase/supplier-return', 'order' => 2],
            ['submenu_id' => $subM03S02Id, 'code' => 'C03', 'name' => 'Receiving History', 'href' => '/purchase/receiving-history', 'order' => 3],
        ];

        $subM03S03Id = DB::table('submenus')->where('main_menu_id', $mainM03)->where('code', 'S03')->first()->id;
        // Child Menus for Payables (S03)
        $childM03S03 = [
            ['submenu_id' => $subM03S03Id, 'code' => 'C01', 'name' => 'Supplier Invoice', 'href' => '/purchase/supplier-invoice', 'order' => 1],
            ['submenu_id' => $subM03S03Id, 'code' => 'C02', 'name' => 'Supplier Payment', 'href' => '/purchase/supplier-payment', 'order' => 2],
            ['submenu_id' => $subM03S03Id, 'code' => 'C03', 'name' => 'Outstanding Payable', 'href' => '/purchase/outstanding-payable', 'order' => 3],
        ];

        $subM03S04Id = DB::table('submenus')->where('main_menu_id', $mainM03)->where('code', 'S04')->first()->id;
        // Child Menus for Reports (S04)
        $childM03S04 = [
            ['submenu_id' => $subM03S04Id, 'code' => 'C01', 'name' => 'Purchase Report', 'href' => '/purchase/purchase-report', 'order' => 1],
            ['submenu_id' => $subM03S04Id, 'code' => 'C02', 'name' => 'Supplier Purchase Report', 'href' => '/purchase/supplier-purchase-report', 'order' => 2],
            ['submenu_id' => $subM03S04Id, 'code' => 'C03', 'name' => 'PO Report', 'href' => '/purchase/po-report', 'order' => 3],
        ];

        $mainM04 = DB::table('main_menus')->where('code', 'M04')->first()->id;

        // Submenus for Inventory (M04)
        $subM04 = [
            ['main_menu_id' => $mainM04, 'code' => 'S01', 'name' => 'Transactions', 'href' => null, 'order' => 1],
            ['main_menu_id' => $mainM04, 'code' => 'S02', 'name' => 'Warehouse Operations', 'href' => null, 'order' => 2],
            ['main_menu_id' => $mainM04, 'code' => 'S03', 'name' => 'Cold Storage', 'href' => null, 'order' => 3],
            ['main_menu_id' => $mainM04, 'code' => 'S04', 'name' => 'Reports', 'href' => null, 'order' => 4],
        ];

        foreach ($subM04 as $submenu) {
            DB::table('submenus')->updateOrInsert(
                ['main_menu_id' => $submenu['main_menu_id'], 'code' => $submenu['code']],
                ['name' => $submenu['name'], 'href' => $submenu['href'], 'order' => $submenu['order'], 'updated_at' => now(), 'created_at' => now()]
            );
        }

        $subM04S01Id = DB::table('submenus')->where('main_menu_id', $mainM04)->where('code', 'S01')->first()->id;
        // Child Menus for Transactions (S01)
        $childM04S01 = [
            ['submenu_id' => $subM04S01Id, 'code' => 'C01', 'name' => 'Goods Receipt', 'href' => '/inventory/goods-receipt', 'order' => 1],
            ['submenu_id' => $subM04S01Id, 'code' => 'C02', 'name' => 'Goods Issue', 'href' => '/inventory/goods-issue', 'order' => 2],
            ['submenu_id' => $subM04S01Id, 'code' => 'C03', 'name' => 'Stock Transfer', 'href' => '/inventory/stock-transfer', 'order' => 3],
            ['submenu_id' => $subM04S01Id, 'code' => 'C04', 'name' => 'Stock Adjustment', 'href' => '/inventory/stock-adjustment', 'order' => 4],
            ['submenu_id' => $subM04S01Id, 'code' => 'C05', 'name' => 'Stock Opname', 'href' => '/inventory/stock-opname', 'order' => 5],
        ];

        $subM04S02Id = DB::table('submenus')->where('main_menu_id', $mainM04)->where('code', 'S02')->first()->id;
        // Child Menus for Warehouse Operations (S02)
        $childM04S02 = [
            ['submenu_id' => $subM04S02Id, 'code' => 'C01', 'name' => 'Bin Location', 'href' => '/inventory/bin-location', 'order' => 1],
            ['submenu_id' => $subM04S02Id, 'code' => 'C02', 'name' => 'Put Away', 'href' => '/inventory/put-away', 'order' => 2],
            ['submenu_id' => $subM04S02Id, 'code' => 'C03', 'name' => 'Picking', 'href' => '/inventory/picking', 'order' => 3],
            ['submenu_id' => $subM04S02Id, 'code' => 'C04', 'name' => 'Packing', 'href' => '/inventory/packing', 'order' => 4],
        ];

        $subM04S03Id = DB::table('submenus')->where('main_menu_id', $mainM04)->where('code', 'S03')->first()->id;
        // Child Menus for Cold Storage (S03)
        $childM04S03 = [
            ['submenu_id' => $subM04S03Id, 'code' => 'C01', 'name' => 'Cold Room', 'href' => '/inventory/cold-room', 'order' => 1],
            ['submenu_id' => $subM04S03Id, 'code' => 'C02', 'name' => 'Temperature Monitoring', 'href' => '/inventory/temperature-monitoring', 'order' => 2],
            ['submenu_id' => $subM04S03Id, 'code' => 'C03', 'name' => 'Pallet Tracking', 'href' => '/inventory/pallet-tracking', 'order' => 3],
            ['submenu_id' => $subM04S03Id, 'code' => 'C04', 'name' => 'Storage Utilization', 'href' => '/inventory/storage-utilization', 'order' => 4],
        ];

        $subM04S04Id = DB::table('submenus')->where('main_menu_id', $mainM04)->where('code', 'S04')->first()->id;
        // Child Menus for Reports (S04)
        $childM04S04 = [
            ['submenu_id' => $subM04S04Id, 'code' => 'C01', 'name' => 'Stock Card', 'href' => '/inventory/stock-card', 'order' => 1],
            ['submenu_id' => $subM04S04Id, 'code' => 'C02', 'name' => 'Inventory Movement', 'href' => '/inventory/inventory-movement', 'order' => 2],
            ['submenu_id' => $subM04S04Id, 'code' => 'C03', 'name' => 'Aging Stock', 'href' => '/inventory/aging-stock', 'order' => 3],
            ['submenu_id' => $subM04S04Id, 'code' => 'C04', 'name' => 'Inventory Valuation', 'href' => '/inventory/inventory-valuation', 'order' => 4],
        ];

        $mainM05 = DB::table('main_menus')->where('code', 'M05')->first()->id;

        // Submenus for Production (M05)
        $subM05 = [
            ['main_menu_id' => $mainM05, 'code' => 'S01', 'name' => 'Planning', 'href' => null, 'order' => 1],
            ['main_menu_id' => $mainM05, 'code' => 'S02', 'name' => 'Execution', 'href' => null, 'order' => 2],
            ['main_menu_id' => $mainM05, 'code' => 'S03', 'name' => 'Reports', 'href' => null, 'order' => 3],
        ];

        foreach ($subM05 as $submenu) {
            DB::table('submenus')->updateOrInsert(
                ['main_menu_id' => $submenu['main_menu_id'], 'code' => $submenu['code']],
                ['name' => $submenu['name'], 'href' => $submenu['href'], 'order' => $submenu['order'], 'updated_at' => now(), 'created_at' => now()]
            );
        }

        $subM05S01Id = DB::table('submenus')->where('main_menu_id', $mainM05)->where('code', 'S01')->first()->id;
        // Child Menus for Planning (S01)
        $childM05S01 = [
            ['submenu_id' => $subM05S01Id, 'code' => 'C01', 'name' => 'BOM', 'href' => '/production/bom', 'order' => 1],
            ['submenu_id' => $subM05S01Id, 'code' => 'C02', 'name' => 'Production Planning', 'href' => '/production/production-planning', 'order' => 2],
            ['submenu_id' => $subM05S01Id, 'code' => 'C03', 'name' => 'Material Requirement Planning', 'href' => '/production/material-requirement-planning', 'order' => 3],
        ];

        $subM05S02Id = DB::table('submenus')->where('main_menu_id', $mainM05)->where('code', 'S02')->first()->id;
        // Child Menus for Execution (S02)
        $childM05S02 = [
            ['submenu_id' => $subM05S02Id, 'code' => 'C01', 'name' => 'Work Order', 'href' => '/production/work-order', 'order' => 1],
            ['submenu_id' => $subM05S02Id, 'code' => 'C02', 'name' => 'Material Issue', 'href' => '/production/material-issue', 'order' => 2],
            ['submenu_id' => $subM05S02Id, 'code' => 'C03', 'name' => 'Production Receipt', 'href' => '/production/production-receipt', 'order' => 3],
            ['submenu_id' => $subM05S02Id, 'code' => 'C04', 'name' => 'Production Completion', 'href' => '/production/production-completion', 'order' => 4],
        ];

        $subM05S03Id = DB::table('submenus')->where('main_menu_id', $mainM05)->where('code', 'S03')->first()->id;
        // Child Menus for Reports (S03)
        $childM05S03 = [
            ['submenu_id' => $subM05S03Id, 'code' => 'C01', 'name' => 'Production Report', 'href' => '/production/production-report', 'order' => 1],
            ['submenu_id' => $subM05S03Id, 'code' => 'C02', 'name' => 'Material Consumption', 'href' => '/production/material-consumption', 'order' => 2],
            ['submenu_id' => $subM05S03Id, 'code' => 'C03', 'name' => 'Production Cost', 'href' => '/production/production-cost', 'order' => 3],
        ];

        $mainM06 = DB::table('main_menus')->where('code', 'M06')->first()->id;

        // Submenus for Finance (M06)
        $subM06 = [
            ['main_menu_id' => $mainM06, 'code' => 'S01', 'name' => 'General Ledger', 'href' => null, 'order' => 1],
            ['main_menu_id' => $mainM06, 'code' => 'S02', 'name' => 'Cash & Bank', 'href' => null, 'order' => 2],
            ['main_menu_id' => $mainM06, 'code' => 'S03', 'name' => 'Accounts Receivable', 'href' => null, 'order' => 3],
            ['main_menu_id' => $mainM06, 'code' => 'S04', 'name' => 'Accounts Payable', 'href' => null, 'order' => 4],
            ['main_menu_id' => $mainM06, 'code' => 'S05', 'name' => 'Financial Reports', 'href' => null, 'order' => 5],
        ];

        foreach ($subM06 as $submenu) {
            DB::table('submenus')->updateOrInsert(
                ['main_menu_id' => $submenu['main_menu_id'], 'code' => $submenu['code']],
                ['name' => $submenu['name'], 'href' => $submenu['href'], 'order' => $submenu['order'], 'updated_at' => now(), 'created_at' => now()]
            );
        }

        $subM06S01Id = DB::table('submenus')->where('main_menu_id', $mainM06)->where('code', 'S01')->first()->id;
        // Child Menus for General Ledger (S01)
        $childM06S01 = [
            ['submenu_id' => $subM06S01Id, 'code' => 'C01', 'name' => 'Journal Entry', 'href' => '/finance/journal-entry', 'order' => 1],
            ['submenu_id' => $subM06S01Id, 'code' => 'C02', 'name' => 'Recurring Journal', 'href' => '/finance/recurring-journal', 'order' => 2],
            ['submenu_id' => $subM06S01Id, 'code' => 'C03', 'name' => 'Journal Approval', 'href' => '/finance/journal-approval', 'order' => 3],
        ];

        $subM06S02Id = DB::table('submenus')->where('main_menu_id', $mainM06)->where('code', 'S02')->first()->id;
        // Child Menus for Cash & Bank (S02)
        $childM06S02 = [
            ['submenu_id' => $subM06S02Id, 'code' => 'C01', 'name' => 'Cash In', 'href' => '/finance/cash-in', 'order' => 1],
            ['submenu_id' => $subM06S02Id, 'code' => 'C02', 'name' => 'Cash Out', 'href' => '/finance/cash-out', 'order' => 2],
            ['submenu_id' => $subM06S02Id, 'code' => 'C03', 'name' => 'Bank Transfer', 'href' => '/finance/bank-transfer', 'order' => 3],
            ['submenu_id' => $subM06S02Id, 'code' => 'C04', 'name' => 'Bank Reconciliation', 'href' => '/finance/bank-reconciliation', 'order' => 4],
        ];

        $subM06S03Id = DB::table('submenus')->where('main_menu_id', $mainM06)->where('code', 'S03')->first()->id;
        // Child Menus for Accounts Receivable (S03)
        $childM06S03 = [
            ['submenu_id' => $subM06S03Id, 'code' => 'C01', 'name' => 'Incoming Payment', 'href' => '/finance/incoming-payment', 'order' => 1],
            ['submenu_id' => $subM06S03Id, 'code' => 'C02', 'name' => 'Payment Allocation', 'href' => '/finance/payment-allocation', 'order' => 2],
            ['submenu_id' => $subM06S03Id, 'code' => 'C03', 'name' => 'Payment History', 'href' => '/finance/payment-history', 'order' => 3],
            ['submenu_id' => $subM06S03Id, 'code' => 'C04', 'name' => 'Outstanding Receivable', 'href' => '/finance/outstanding-receivable', 'order' => 4],
        ];

        $subM06S04Id = DB::table('submenus')->where('main_menu_id', $mainM06)->where('code', 'S04')->first()->id;
        // Child Menus for Accounts Payable (S04)
        $childM06S04 = [
            ['submenu_id' => $subM06S04Id, 'code' => 'C01', 'name' => 'Outgoing Payment', 'href' => '/finance/outgoing-payment', 'order' => 1],
            ['submenu_id' => $subM06S04Id, 'code' => 'C02', 'name' => 'Payment Allocation', 'href' => '/finance/payment-allocation', 'order' => 2],
            ['submenu_id' => $subM06S04Id, 'code' => 'C03', 'name' => 'Payment History', 'href' => '/finance/payment-history', 'order' => 3],
            ['submenu_id' => $subM06S04Id, 'code' => 'C04', 'name' => 'Outstanding Payable', 'href' => '/finance/outstanding-payable', 'order' => 4],
        ];

        $subM06S05Id = DB::table('submenus')->where('main_menu_id', $mainM06)->where('code', 'S05')->first()->id;
        // Child Menus for Financial Reports (S05)
        $childM06S05 = [
            ['submenu_id' => $subM06S05Id, 'code' => 'C01', 'name' => 'Trial Balance', 'href' => '/finance/trial-balance', 'order' => 1],
            ['submenu_id' => $subM06S05Id, 'code' => 'C02', 'name' => 'Profit & Loss', 'href' => '/finance/profit-loss', 'order' => 2],
            ['submenu_id' => $subM06S05Id, 'code' => 'C03', 'name' => 'Balance Sheet', 'href' => '/finance/balance-sheet', 'order' => 3],
            ['submenu_id' => $subM06S05Id, 'code' => 'C04', 'name' => 'Cash Flow', 'href' => '/finance/cash-flow', 'order' => 4],
        ];

        $mainM07 = DB::table('main_menus')->where('code', 'M07')->first()->id;

        // Submenus for HR & Payroll (M07)
        $subM07 = [
            ['main_menu_id' => $mainM07, 'code' => 'S01', 'name' => 'Employee Management', 'href' => null, 'order' => 1],
            ['main_menu_id' => $mainM07, 'code' => 'S02', 'name' => 'Attendance', 'href' => null, 'order' => 2],
            ['main_menu_id' => $mainM07, 'code' => 'S03', 'name' => 'Payroll', 'href' => null, 'order' => 3],
            ['main_menu_id' => $mainM07, 'code' => 'S04', 'name' => 'Reports', 'href' => null, 'order' => 4],
        ];

        foreach ($subM07 as $submenu) {
            DB::table('submenus')->updateOrInsert(
                ['main_menu_id' => $submenu['main_menu_id'], 'code' => $submenu['code']],
                ['name' => $submenu['name'], 'href' => $submenu['href'], 'order' => $submenu['order'], 'updated_at' => now(), 'created_at' => now()]
            );
        }

        $subM07S01Id = DB::table('submenus')->where('main_menu_id', $mainM07)->where('code', 'S01')->first()->id;
        // Child Menus for Employee Management (S01)
        $childM07S01 = [
            ['submenu_id' => $subM07S01Id, 'code' => 'C01', 'name' => 'Employee Profile', 'href' => '/hrpayroll/employee-profile', 'order' => 1],
            ['submenu_id' => $subM07S01Id, 'code' => 'C02', 'name' => 'Employee Contract', 'href' => '/hrpayroll/employee-contract', 'order' => 2],
            ['submenu_id' => $subM07S01Id, 'code' => 'C03', 'name' => 'Employee Document', 'href' => '/hrpayroll/employee-document', 'order' => 3],
        ];

        $subM07S02Id = DB::table('submenus')->where('main_menu_id', $mainM07)->where('code', 'S02')->first()->id;
        // Child Menus for Attendance (S02)
        $childM07S02 = [
            ['submenu_id' => $subM07S02Id, 'code' => 'C01', 'name' => 'Attendance Log', 'href' => '/hrpayroll/attendance-log', 'order' => 1],
            ['submenu_id' => $subM07S02Id, 'code' => 'C02', 'name' => 'Shift Schedule', 'href' => '/hrpayroll/shift-schedule', 'order' => 2],
            ['submenu_id' => $subM07S02Id, 'code' => 'C03', 'name' => 'Overtime', 'href' => '/hrpayroll/overtime', 'order' => 3],
            ['submenu_id' => $subM07S02Id, 'code' => 'C04', 'name' => 'Leave Request', 'href' => '/hrpayroll/leave-request', 'order' => 4],
        ];

        $subM07S03Id = DB::table('submenus')->where('main_menu_id', $mainM07)->where('code', 'S03')->first()->id;
        // Child Menus for Payroll (S03)
        $childM07S03 = [
            ['submenu_id' => $subM07S03Id, 'code' => 'C01', 'name' => 'Payroll Process', 'href' => '/hrpayroll/payroll-process', 'order' => 1],
            ['submenu_id' => $subM07S03Id, 'code' => 'C02', 'name' => 'Payroll Component', 'href' => '/hrpayroll/payroll-component', 'order' => 2],
            ['submenu_id' => $subM07S03Id, 'code' => 'C03', 'name' => 'Payslip', 'href' => '/hrpayroll/payslip', 'order' => 3],
            ['submenu_id' => $subM07S03Id, 'code' => 'C04', 'name' => 'Payroll History', 'href' => '/hrpayroll/payroll-history', 'order' => 4],
        ];

        $subM07S04Id = DB::table('submenus')->where('main_menu_id', $mainM07)->where('code', 'S04')->first()->id;
        // Child Menus for Reports (S04)
        $childM07S04 = [
            ['submenu_id' => $subM07S04Id, 'code' => 'C01', 'name' => 'Attendance Report', 'href' => '/hrpayroll/attendance-report', 'order' => 1],
            ['submenu_id' => $subM07S04Id, 'code' => 'C02', 'name' => 'Leave Report', 'href' => '/hrpayroll/leave-report', 'order' => 2],
            ['submenu_id' => $subM07S04Id, 'code' => 'C03', 'name' => 'Payroll Report', 'href' => '/hrpayroll/payroll-report', 'order' => 3],
        ];

        $mainM08 = DB::table('main_menus')->where('code', 'M08')->first()->id;

        // Submenus for Assets Management (M08)
        $subM08 = [
            ['main_menu_id' => $mainM08, 'code' => 'S01', 'name' => 'Asset Operations', 'href' => null, 'order' => 1],
            ['main_menu_id' => $mainM08, 'code' => 'S02', 'name' => 'Maintenance', 'href' => null, 'order' => 2],
            ['main_menu_id' => $mainM08, 'code' => 'S03', 'name' => 'Depreciation', 'href' => null, 'order' => 3],
            ['main_menu_id' => $mainM08, 'code' => 'S04', 'name' => 'Reports', 'href' => null, 'order' => 4],
        ];

        foreach ($subM08 as $submenu) {
            DB::table('submenus')->updateOrInsert(
                ['main_menu_id' => $submenu['main_menu_id'], 'code' => $submenu['code']],
                ['name' => $submenu['name'], 'href' => $submenu['href'], 'order' => $submenu['order'], 'updated_at' => now(), 'created_at' => now()]
            );
        }

        $subM08S01Id = DB::table('submenus')->where('main_menu_id', $mainM08)->where('code', 'S01')->first()->id;
        // Child Menus for Asset Operations (S01)
        $childM08S01 = [
            ['submenu_id' => $subM08S01Id, 'code' => 'C01', 'name' => 'Asset Registration', 'href' => '/assets-management/asset-registration', 'order' => 1],
            ['submenu_id' => $subM08S01Id, 'code' => 'C02', 'name' => 'Asset Assignment', 'href' => '/assets-management/asset-assignment', 'order' => 2],
            ['submenu_id' => $subM08S01Id, 'code' => 'C03', 'name' => 'Asset Transfer', 'href' => '/assets-management/asset-transfer', 'order' => 3],
            ['submenu_id' => $subM08S01Id, 'code' => 'C04', 'name' => 'Asset Disposal', 'href' => '/assets-management/asset-disposal', 'order' => 4],
        ];

        $subM08S02Id = DB::table('submenus')->where('main_menu_id', $mainM08)->where('code', 'S02')->first()->id;
        // Child Menus for Maintenance (S02)
        $childM08S02 = [
            ['submenu_id' => $subM08S02Id, 'code' => 'C01', 'name' => 'Maintenance Request', 'href' => '/assets-management/maintenance-request', 'order' => 1],
            ['submenu_id' => $subM08S02Id, 'code' => 'C02', 'name' => 'Maintenance Schedule', 'href' => '/assets-management/maintenance-schedule', 'order' => 2],
            ['submenu_id' => $subM08S02Id, 'code' => 'C03', 'name' => 'Maintenance History', 'href' => '/assets-management/maintenance-history', 'order' => 3],
            ['submenu_id' => $subM08S02Id, 'code' => 'C04', 'name' => 'Repair Tracking', 'href' => '/assets-management/repair-tracking', 'order' => 4],
        ];

        $subM08S03Id = DB::table('submenus')->where('main_menu_id', $mainM08)->where('code', 'S03')->first()->id;
        // Child Menus for Depreciation (S03)
        $childM08S03 = [
            ['submenu_id' => $subM08S03Id, 'code' => 'C01', 'name' => 'Depreciation Process', 'href' => '/assets-management/depreciation-process', 'order' => 1],
            ['submenu_id' => $subM08S03Id, 'code' => 'C02', 'name' => 'Depreciation History', 'href' => '/assets-management/depreciation-history', 'order' => 2],
            ['submenu_id' => $subM08S03Id, 'code' => 'C03', 'name' => 'Asset Valuation', 'href' => '/assets-management/asset-valuation', 'order' => 3],
        ];

        $subM08S04Id = DB::table('submenus')->where('main_menu_id', $mainM08)->where('code', 'S04')->first()->id;
        // Child Menus for Reports (S04)
        $childM08S04 = [
            ['submenu_id' => $subM08S04Id, 'code' => 'C01', 'name' => 'Asset Register Report', 'href' => '/assets-management/asset-register-report', 'order' => 1],
            ['submenu_id' => $subM08S04Id, 'code' => 'C02', 'name' => 'Maintenance Report', 'href' => '/assets-management/maintenance-report', 'order' => 2],
            ['submenu_id' => $subM08S04Id, 'code' => 'C03', 'name' => 'Depreciation Report', 'href' => '/assets-management/depreciation-report', 'order' => 3],
        ];

        $mainM09 = DB::table('main_menus')->where('code', 'M09')->first()->id;

        // Submenus for Project (M09)
        $subM09 = [
            ['main_menu_id' => $mainM09, 'code' => 'S01', 'name' => 'Project Management', 'href' => null, 'order' => 1],
            ['main_menu_id' => $mainM09, 'code' => 'S02', 'name' => 'Budgeting', 'href' => null, 'order' => 2],
            ['main_menu_id' => $mainM09, 'code' => 'S03', 'name' => 'Reports', 'href' => null, 'order' => 3],
        ];

        foreach ($subM09 as $submenu) {
            DB::table('submenus')->updateOrInsert(
                ['main_menu_id' => $submenu['main_menu_id'], 'code' => $submenu['code']],
                ['name' => $submenu['name'], 'href' => $submenu['href'], 'order' => $submenu['order'], 'updated_at' => now(), 'created_at' => now()]
            );
        }

        $subM09S01Id = DB::table('submenus')->where('main_menu_id', $mainM09)->where('code', 'S01')->first()->id;
        // Child Menus for Project Management (S01)
        $childM09S01 = [
            ['submenu_id' => $subM09S01Id, 'code' => 'C01', 'name' => 'Project Master', 'href' => '/project/project-master', 'order' => 1],
            ['submenu_id' => $subM09S01Id, 'code' => 'C02', 'name' => 'Project Task', 'href' => '/project/project-task', 'order' => 2],
            ['submenu_id' => $subM09S01Id, 'code' => 'C03', 'name' => 'Milestone', 'href' => '/project/milestone', 'order' => 3],
            ['submenu_id' => $subM09S01Id, 'code' => 'C04', 'name' => 'Project Timeline', 'href' => '/project/project-timeline', 'order' => 4],
        ];

        $subM09S02Id = DB::table('submenus')->where('main_menu_id', $mainM09)->where('code', 'S02')->first()->id;
        // Child Menus for Budgeting (S02)
        $childM09S02 = [
            ['submenu_id' => $subM09S02Id, 'code' => 'C01', 'name' => 'Budget Plan', 'href' => '/project/budget-plan', 'order' => 1],
            ['submenu_id' => $subM09S02Id, 'code' => 'C02', 'name' => 'Budget Realization', 'href' => '/project/budget-realization', 'order' => 2],
            ['submenu_id' => $subM09S02Id, 'code' => 'C03', 'name' => 'Project Cost', 'href' => '/project/project-cost', 'order' => 3],
        ];

        $subM09S03Id = DB::table('submenus')->where('main_menu_id', $mainM09)->where('code', 'S03')->first()->id;
        // Child Menus for Reports (S03)
        $childM09S03 = [
            ['submenu_id' => $subM09S03Id, 'code' => 'C01', 'name' => 'Progress Report', 'href' => '/project/progress-report', 'order' => 1],
            ['submenu_id' => $subM09S03Id, 'code' => 'C02', 'name' => 'Budget Report', 'href' => '/project/budget-report', 'order' => 2],
            ['submenu_id' => $subM09S03Id, 'code' => 'C03', 'name' => 'Cost Report', 'href' => '/project/cost-report', 'order' => 3],
        ];

        $mainM10 = DB::table('main_menus')->where('code', 'M10')->first()->id;

        // Submenus for CRM (M10)
        $subM10 = [
            ['main_menu_id' => $mainM10, 'code' => 'S01', 'name' => 'Lead Management', 'href' => null, 'order' => 1],
            ['main_menu_id' => $mainM10, 'code' => 'S02', 'name' => 'Customer Activities', 'href' => null, 'order' => 2],
            ['main_menu_id' => $mainM10, 'code' => 'S03', 'name' => 'Reports', 'href' => null, 'order' => 3],
        ];

        foreach ($subM10 as $submenu) {
            DB::table('submenus')->updateOrInsert(
                ['main_menu_id' => $submenu['main_menu_id'], 'code' => $submenu['code']],
                ['name' => $submenu['name'], 'href' => $submenu['href'], 'order' => $submenu['order'], 'updated_at' => now(), 'created_at' => now()]
            );
        }

        $subM10S01Id = DB::table('submenus')->where('main_menu_id', $mainM10)->where('code', 'S01')->first()->id;
        // Child Menus for Lead Management (S01)
        $childM10S01 = [
            ['submenu_id' => $subM10S01Id, 'code' => 'C01', 'name' => 'Lead', 'href' => '/crm/lead', 'order' => 1],
            ['submenu_id' => $subM10S01Id, 'code' => 'C02', 'name' => 'Opportunity', 'href' => '/crm/opportunity', 'order' => 2],
            ['submenu_id' => $subM10S01Id, 'code' => 'C03', 'name' => 'Lead Source', 'href' => '/crm/lead-source', 'order' => 3],
        ];

        $subM10S02Id = DB::table('submenus')->where('main_menu_id', $mainM10)->where('code', 'S02')->first()->id;
        // Child Menus for Customer Activities (S02)
        $childM10S02 = [
            ['submenu_id' => $subM10S02Id, 'code' => 'C01', 'name' => 'Meeting', 'href' => '/crm/meeting', 'order' => 1],
            ['submenu_id' => $subM10S02Id, 'code' => 'C02', 'name' => 'Call Log', 'href' => '/crm/call-log', 'order' => 2],
            ['submenu_id' => $subM10S02Id, 'code' => 'C03', 'name' => 'Follow Up', 'href' => '/crm/follow-up', 'order' => 3],
            ['submenu_id' => $subM10S02Id, 'code' => 'C04', 'name' => 'Visit Report', 'href' => '/crm/visit-report', 'order' => 4],
        ];

        $subM10S03Id = DB::table('submenus')->where('main_menu_id', $mainM10)->where('code', 'S03')->first()->id;
        // Child Menus for Reports (S03)
        $childM10S03 = [
            ['submenu_id' => $subM10S03Id, 'code' => 'C01', 'name' => 'Lead Report', 'href' => '/crm/lead-report', 'order' => 1],
            ['submenu_id' => $subM10S03Id, 'code' => 'C02', 'name' => 'Opportunity Report', 'href' => '/crm/opportunity-report', 'order' => 2],
            ['submenu_id' => $subM10S03Id, 'code' => 'C03', 'name' => 'Conversion Report', 'href' => '/crm/conversion-report', 'order' => 3],
        ];

        $mainM11 = DB::table('main_menus')->where('code', 'M11')->first()->id;

        // Submenus for Reports & Analytics (M11)
        $subM11 = [
            ['main_menu_id' => $mainM11, 'code' => 'S01', 'name' => 'Operational Reports', 'href' => null, 'order' => 1],
            ['main_menu_id' => $mainM11, 'code' => 'S02', 'name' => 'Financial Reports', 'href' => null, 'order' => 2],
            ['main_menu_id' => $mainM11, 'code' => 'S03', 'name' => 'HR Reports', 'href' => null, 'order' => 3],
            ['main_menu_id' => $mainM11, 'code' => 'S04', 'name' => 'Dashboard Analytics', 'href' => null, 'order' => 4],
        ];

        foreach ($subM11 as $submenu) {
            DB::table('submenus')->updateOrInsert(
                ['main_menu_id' => $submenu['main_menu_id'], 'code' => $submenu['code']],
                ['name' => $submenu['name'], 'href' => $submenu['href'], 'order' => $submenu['order'], 'updated_at' => now(), 'created_at' => now()]
            );
        }

        $subM11S01Id = DB::table('submenus')->where('main_menu_id', $mainM11)->where('code', 'S01')->first()->id;
        // Child Menus for Operational Reports (S01)
        $childM11S01 = [
            ['submenu_id' => $subM11S01Id, 'code' => 'C01', 'name' => 'Sales Report', 'href' => '/report-analytics/sales-report', 'order' => 1],
            ['submenu_id' => $subM11S01Id, 'code' => 'C02', 'name' => 'Purchase Report', 'href' => '/report-analytics/purchase-report', 'order' => 2],
            ['submenu_id' => $subM11S01Id, 'code' => 'C03', 'name' => 'Inventory Report', 'href' => '/report-analytics/inventory-report', 'order' => 3],
            ['submenu_id' => $subM11S01Id, 'code' => 'C04', 'name' => 'Asset Report', 'href' => '/report-analytics/asset-report', 'order' => 4],
        ];

        $subM11S02Id = DB::table('submenus')->where('main_menu_id', $mainM11)->where('code', 'S02')->first()->id;
        // Child Menus for Financial Reports (S02)
        $childM11S02 = [
            ['submenu_id' => $subM11S02Id, 'code' => 'C01', 'name' => 'Profit & Loss', 'href' => '/report-analytics/profit-loss', 'order' => 1],
            ['submenu_id' => $subM11S02Id, 'code' => 'C02', 'name' => 'Balance Sheet', 'href' => '/report-analytics/balance-sheet', 'order' => 2],
            ['submenu_id' => $subM11S02Id, 'code' => 'C03', 'name' => 'Cash Flow', 'href' => '/report-analytics/cash-flow', 'order' => 3],
            ['submenu_id' => $subM11S02Id, 'code' => 'C04', 'name' => 'Trial Balance', 'href' => '/report-analytics/trial-balance', 'order' => 4],
        ];

        $subM11S03Id = DB::table('submenus')->where('main_menu_id', $mainM11)->where('code', 'S03')->first()->id;
        // Child Menus for HR Reports (S03)
        $childM11S03 = [
            ['submenu_id' => $subM11S03Id, 'code' => 'C01', 'name' => 'Attendance Report', 'href' => '/report-analytics/attendance-report', 'order' => 1],
            ['submenu_id' => $subM11S03Id, 'code' => 'C02', 'name' => 'Leave Report', 'href' => '/report-analytics/leave-report', 'order' => 2],
            ['submenu_id' => $subM11S03Id, 'code' => 'C03', 'name' => 'Payroll Report', 'href' => '/report-analytics/payroll-report', 'order' => 3],
        ];

        $subM11S04Id = DB::table('submenus')->where('main_menu_id', $mainM11)->where('code', 'S04')->first()->id;
        // Child Menus for Dashboard Analytics (S04)
        $childM11S04 = [
            ['submenu_id' => $subM11S04Id, 'code' => 'C01', 'name' => 'KPI Dashboard', 'href' => '/report-analytics/kpi-dashboard', 'order' => 1],
            ['submenu_id' => $subM11S04Id, 'code' => 'C02', 'name' => 'Executive Dashboard', 'href' => '/report-analytics/executive-dashboard', 'order' => 2],
            ['submenu_id' => $subM11S04Id, 'code' => 'C03', 'name' => 'Operational Dashboard', 'href' => '/report-analytics/operational-dashboard', 'order' => 3],
        ];

        $mainM12 = DB::table('main_menus')->where('code', 'M12')->first()->id;

        // Submenus for Settings (M12)
        $subM12 = [
            ['main_menu_id' => $mainM12, 'code' => 'S01', 'name' => 'User & Security', 'href' => null, 'order' => 1],
            ['main_menu_id' => $mainM12, 'code' => 'S08', 'name' => 'Audit', 'href' => null, 'order' => 2],
        ];

        foreach ($subM12 as $submenu) {
            DB::table('submenus')->updateOrInsert(
                ['main_menu_id' => $submenu['main_menu_id'], 'code' => $submenu['code']],
                ['name' => $submenu['name'], 'href' => $submenu['href'], 'order' => $submenu['order'], 'updated_at' => now(), 'created_at' => now()]
            );
        }

        $subM12S01Id = DB::table('submenus')->where('main_menu_id', $mainM12)->where('code', 'S01')->first()->id;
        // Child Menus for User & Security (S01)
        $childM12S01 = [
            ['submenu_id' => $subM12S01Id, 'code' => 'C01', 'name' => 'Users', 'href' => '/Settings/users', 'order' => 1],
            ['submenu_id' => $subM12S01Id, 'code' => 'C02', 'name' => 'Roles', 'href' => '/Settings/roles', 'order' => 2],
            ['submenu_id' => $subM12S01Id, 'code' => 'C03', 'name' => 'Approval Matrix', 'href' => '/settings/approval-matrix', 'order' => 3],
            ['submenu_id' => $subM12S01Id, 'code' => 'C04', 'name' => 'Approval Workflow', 'href' => '/settings/approval-workflow', 'order' => 4],
            ['submenu_id' => $subM12S01Id, 'code' => 'C05', 'name' => 'Approval History', 'href' => '/settings/approval-history', 'order' => 5],
        ];

        $subM12S08Id = DB::table('submenus')->where('main_menu_id', $mainM12)->where('code', 'S08')->first()->id;
        // Child Menus for Audit (S08)
        $childM12S08 = [
            ['submenu_id' => $subM12S08Id, 'code' => 'C01', 'name' => 'Activity Log', 'href' => '/settings/activity-log', 'order' => 1],
            ['submenu_id' => $subM12S08Id, 'code' => 'C02', 'name' => 'Audit Trail', 'href' => '/settings/audit-trail', 'order' => 2],
            ['submenu_id' => $subM12S08Id, 'code' => 'C03', 'name' => 'Login History', 'href' => '/settings/login-history', 'order' => 3],
        ];

        // ============ MERGE ALL CHILD MENUS ============

        $childMenus = array_merge(
            $childM01S01,
            $childM01S02,
            $childM01S03,
            $childM01S04,
            $childM01S05,
            $childM01S07,
            $childM12S08,
            $childM02S01,
            $childM02S03,
            $childM03S01,
            $childM03S02,
            $childM03S03,
            $childM03S04,
            $childM04S01,
            $childM04S02,
            $childM04S03,
            $childM04S04,
            $childM05S01,
            $childM05S02,
            $childM05S03,
            $childM06S01,
            $childM06S02,
            $childM06S03,
            $childM06S04,
            $childM06S05,
            $childM07S01,
            $childM07S02,
            $childM07S03,
            $childM07S04,
            $childM08S01,
            $childM08S02,
            $childM08S03,
            $childM08S04,
            $childM09S01,
            $childM09S02,
            $childM09S03,
            $childM10S01,
            $childM10S02,
            $childM10S03,
            $childM11S01,
            $childM11S02,
            $childM11S03,
            $childM11S04,
            $childM12S01
        );

        foreach ($childMenus as $childMenu) {
            DB::table('child_menus')->updateOrInsert(
                ['submenu_id' => $childMenu['submenu_id'], 'code' => $childMenu['code']],
                ['name' => $childMenu['name'], 'href' => $childMenu['href'], 'order' => $childMenu['order'], 'updated_at' => now(), 'created_at' => now()]
            );
        }
    }
}
