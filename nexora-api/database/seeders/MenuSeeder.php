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

        $submenus = [
            ['main_menu_id' => $masterDataId, 'code' => 'S01', 'name' => 'Business Partner', 'order' => 1],
            ['main_menu_id' => $masterDataId, 'code' => 'S02', 'name' => 'Inventory', 'order' => 2],
            ['main_menu_id' => $masterDataId, 'code' => 'S03', 'name' => 'Asset Management', 'order' => 3],
            ['main_menu_id' => $masterDataId, 'code' => 'S04', 'name' => 'Human Resource', 'order' => 4],
            ['main_menu_id' => $masterDataId, 'code' => 'S05', 'name' => 'Finance', 'order' => 5],
            ['main_menu_id' => $masterDataId, 'code' => 'S06', 'name' => 'System', 'order' => 6],
        ];

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

        // Child Menus for Business Partner (S01)
        $businessPartnerId = DB::table('submenus')->where('main_menu_id', $masterDataId)->where('code', 'S01')->first()->id;
        $childMenusS01 = [
            ['submenu_id' => $businessPartnerId, 'code' => 'C01', 'name' => 'Customer', 'href' => '/master-data/customer', 'order' => 1],
            ['submenu_id' => $businessPartnerId, 'code' => 'C02', 'name' => 'Supplier', 'href' => '/master-data/supplier', 'order' => 2],
            ['submenu_id' => $businessPartnerId, 'code' => 'C03', 'name' => 'Vendor', 'href' => '/master-data/vendor', 'order' => 3],
        ];

        // Child Menus for Inventory (S02)
        $inventoryId = DB::table('submenus')->where('main_menu_id', $masterDataId)->where('code', 'S02')->first()->id;
        $childMenusS02 = [
            ['submenu_id' => $inventoryId, 'code' => 'C01', 'name' => 'Item Master', 'href' => '/master-data/item-master', 'order' => 1],
            ['submenu_id' => $inventoryId, 'code' => 'C02', 'name' => 'Category', 'href' => '/master-data/category', 'order' => 2],
            ['submenu_id' => $inventoryId, 'code' => 'C03', 'name' => 'Brand', 'href' => '/master-data/brand', 'order' => 3],
            ['submenu_id' => $inventoryId, 'code' => 'C04', 'name' => 'UOM', 'href' => '/master-data/uom', 'order' => 4],
            ['submenu_id' => $inventoryId, 'code' => 'C05', 'name' => 'Warehouse', 'href' => '/master-data/warehouse', 'order' => 5],
        ];

        // Child Menus for Asset Management (S03)
        $assetManagementId = DB::table('submenus')->where('main_menu_id', $masterDataId)->where('code', 'S03')->first()->id;
        $childMenusS03 = [
            ['submenu_id' => $assetManagementId, 'code' => 'C01', 'name' => 'Asset', 'href' => '/master-data/asset', 'order' => 1],
            ['submenu_id' => $assetManagementId, 'code' => 'C02', 'name' => 'Asset Category', 'href' => '/master-data/asset-category', 'order' => 2],
            ['submenu_id' => $assetManagementId, 'code' => 'C03', 'name' => 'Asset Location', 'href' => '/master-data/asset-location', 'order' => 3],
            ['submenu_id' => $assetManagementId, 'code' => 'C04', 'name' => 'Asset Status', 'href' => '/master-data/asset-status', 'order' => 4],
        ];

        // Child Menus for Human Resource (S04)
        $hrId = DB::table('submenus')->where('main_menu_id', $masterDataId)->where('code', 'S04')->first()->id;
        $childMenusS04 = [
            ['submenu_id' => $hrId, 'code' => 'C01', 'name' => 'Employee', 'href' => '/master-data/employee', 'order' => 1],
            ['submenu_id' => $hrId, 'code' => 'C02', 'name' => 'Department', 'href' => '/master-data/department', 'order' => 2],
            ['submenu_id' => $hrId, 'code' => 'C03', 'name' => 'Position', 'href' => '/master-data/position', 'order' => 3],
        ];

        // Child Menus for Finance (S05)
        $financeId = DB::table('submenus')->where('main_menu_id', $masterDataId)->where('code', 'S05')->first()->id;
        $childMenusS05 = [
            ['submenu_id' => $financeId, 'code' => 'C01', 'name' => 'COA', 'href' => '/master-data/coa', 'order' => 1],
            ['submenu_id' => $financeId, 'code' => 'C02', 'name' => 'Tax', 'href' => '/master-data/tax', 'order' => 2],
            ['submenu_id' => $financeId, 'code' => 'C03', 'name' => 'Payment Terms', 'href' => '/master-data/payment-terms', 'order' => 3],
        ];

        // Child Menus for System (S06)
        $systemId = DB::table('submenus')->where('main_menu_id', $masterDataId)->where('code', 'S06')->first()->id;
        $childMenusS06 = [
            ['submenu_id' => $systemId, 'code' => 'C01', 'name' => 'Users', 'href' => '/master-data/users', 'order' => 1],
            ['submenu_id' => $systemId, 'code' => 'C02', 'name' => 'Roles', 'href' => '/master-data/roles', 'order' => 2],
            ['submenu_id' => $systemId, 'code' => 'C03', 'name' => 'Permissions', 'href' => '/master-data/permissions', 'order' => 3],
        ];

        // Merge all child menus
        $childMenus = array_merge($childMenusS01, $childMenusS02, $childMenusS03, $childMenusS04, $childMenusS05, $childMenusS06);

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
