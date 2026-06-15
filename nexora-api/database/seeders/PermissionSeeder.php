<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            // Main Menus
            ['code' => 'M00', 'name' => 'Dashboard', 'type' => 'menu'],
            ['code' => 'M01', 'name' => 'Master Data', 'type' => 'menu'],
            ['code' => 'M02', 'name' => 'Sales', 'type' => 'menu'],
            ['code' => 'M03', 'name' => 'Purchase', 'type' => 'menu'],
            ['code' => 'M04', 'name' => 'Inventory', 'type' => 'menu'],
            ['code' => 'M05', 'name' => 'Production', 'type' => 'menu'],
            ['code' => 'M06', 'name' => 'Finance', 'type' => 'menu'],
            ['code' => 'M07', 'name' => 'HR & Payroll', 'type' => 'menu'],
            ['code' => 'M08', 'name' => 'Assets Management', 'type' => 'menu'],
            ['code' => 'M09', 'name' => 'Project', 'type' => 'menu'],
            ['code' => 'M10', 'name' => 'CRM', 'type' => 'menu'],
            ['code' => 'M11', 'name' => 'Reports & Analytics', 'type' => 'menu'],
            ['code' => 'M12', 'name' => 'Settings', 'type' => 'menu'],

            // Master Data Submenus
            ['code' => 'M01.S01', 'name' => 'Business Partner', 'type' => 'menu'],
            ['code' => 'M01.S02', 'name' => 'Inventory', 'type' => 'menu'],
            ['code' => 'M01.S03', 'name' => 'Asset Management', 'type' => 'menu'],
            ['code' => 'M01.S04', 'name' => 'Human Resource', 'type' => 'menu'],
            ['code' => 'M01.S05', 'name' => 'Finance', 'type' => 'menu'],
            ['code' => 'M01.S00', 'name' => 'General', 'type' => 'menu'],
            ['code' => 'M12.S01', 'name' => 'User & Security', 'type' => 'menu'],

            // Business Partner Child Menus
            ['code' => 'M01.S01.C01', 'name' => 'Customer', 'type' => 'menu'],
            ['code' => 'M01.S01.C02', 'name' => 'Supplier', 'type' => 'menu'],
            ['code' => 'M01.S01.C03', 'name' => 'Vendor', 'type' => 'menu'],

            // Inventory Child Menus
            ['code' => 'M01.S02.C01', 'name' => 'Item Master', 'type' => 'menu'],
            ['code' => 'M01.S02.C02', 'name' => 'Category', 'type' => 'menu'],
            ['code' => 'M01.S02.C03', 'name' => 'Brand', 'type' => 'menu'],
            ['code' => 'M01.S02.C04', 'name' => 'UOM', 'type' => 'menu'],
            ['code' => 'M01.S02.C05', 'name' => 'Warehouse', 'type' => 'menu'],

            // Asset Management Child Menus
            ['code' => 'M01.S03.C01', 'name' => 'Asset', 'type' => 'menu'],
            ['code' => 'M01.S03.C02', 'name' => 'Asset Category', 'type' => 'menu'],
            ['code' => 'M01.S03.C03', 'name' => 'Asset Location', 'type' => 'menu'],
            ['code' => 'M01.S03.C04', 'name' => 'Asset Status', 'type' => 'menu'],

            // Human Resource Child Menus
            ['code' => 'M01.S04.C01', 'name' => 'Employee', 'type' => 'menu'],
            ['code' => 'M01.S04.C02', 'name' => 'Department', 'type' => 'menu'],
            ['code' => 'M01.S04.C03', 'name' => 'Position', 'type' => 'menu'],

            // General Child Menus
            ['code' => 'M01.S00.C01', 'name' => 'City', 'type' => 'menu'],
            ['code' => 'M01.S00.C02', 'name' => 'Province', 'type' => 'menu'],
            ['code' => 'M01.S00.C03', 'name' => 'Country', 'type' => 'menu'],
            ['code' => 'M01.S00.C04', 'name' => 'Currency', 'type' => 'menu'],

            // Finance Child Menus
            ['code' => 'M01.S05.C01', 'name' => 'COA', 'type' => 'menu'],
            ['code' => 'M01.S05.C02', 'name' => 'Tax', 'type' => 'menu'],
            ['code' => 'M01.S05.C03', 'name' => 'Payment Terms', 'type' => 'menu'],

            // Settings User & Security Child Menus
            ['code' => 'M12.S01.C01', 'name' => 'Users', 'type' => 'menu'],
            ['code' => 'M12.S01.C02', 'name' => 'Roles', 'type' => 'menu'],
        ];

        foreach ($permissions as $permission) {
            DB::table('permissions')->updateOrInsert(
                ['code' => $permission['code']],
                [
                    'name' => $permission['name'],
                    'type' => $permission['type'],
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }

        DB::table('roles')->updateOrInsert(
            ['slug' => 'super-admin'],
            [
                'name' => 'Super Admin',
                'slug' => 'super-admin',
                'description' => 'Full access to every menu.',
                'guard_name' => 'web',
                'updated_at' => now(),
                'created_at' => now(),
            ]
        );

        $roleId = DB::table('roles')->where('slug', 'super-admin')->value('id');
        $permissionIds = DB::table('permissions')->pluck('id');

        foreach ($permissionIds as $permissionId) {
            DB::table('role_permission')->updateOrInsert(
                [
                    'role_id' => $roleId,
                    'permission_id' => $permissionId,
                ],
                [
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }
    }
}
