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
            // ============ MAIN MENUS ============
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

            // ============ MASTER DATA SUBMENUS ============
            ['code' => 'M01.S01', 'name' => 'Business Partner', 'type' => 'menu'],
            ['code' => 'M01.S02', 'name' => 'Inventory', 'type' => 'menu'],
            ['code' => 'M01.S03', 'name' => 'Asset Management', 'type' => 'menu'],
            ['code' => 'M01.S04', 'name' => 'Human Resource', 'type' => 'menu'],
            ['code' => 'M01.S05', 'name' => 'Finance', 'type' => 'menu'],
            ['code' => 'M01.S00', 'name' => 'General', 'type' => 'menu'],

            // ============ INVENTORY SUBMENUS ============
            ['code' => 'M04.S01', 'name' => 'Transactions', 'type' => 'menu'],
            ['code' => 'M04.S02', 'name' => 'Warehouse Operations', 'type' => 'menu'],
            ['code' => 'M04.S03', 'name' => 'Cold Storage', 'type' => 'menu'],
            ['code' => 'M04.S04', 'name' => 'Reports', 'type' => 'menu'],

            // ============ PRODUCTION SUBMENUS ============
            ['code' => 'M05.S01', 'name' => 'Planning', 'type' => 'menu'],
            ['code' => 'M05.S02', 'name' => 'Execution', 'type' => 'menu'],
            ['code' => 'M05.S03', 'name' => 'Reports', 'type' => 'menu'],

            // ============ FINANCE SUBMENUS ============
            ['code' => 'M06.S01', 'name' => 'General Ledger', 'type' => 'menu'],
            ['code' => 'M06.S02', 'name' => 'Cash & Bank', 'type' => 'menu'],
            ['code' => 'M06.S03', 'name' => 'Accounts Receivable', 'type' => 'menu'],
            ['code' => 'M06.S04', 'name' => 'Accounts Payable', 'type' => 'menu'],
            ['code' => 'M06.S05', 'name' => 'Financial Reports', 'type' => 'menu'],

            // ============ HR & PAYROLL SUBMENUS ============
            ['code' => 'M07.S01', 'name' => 'Employee Management', 'type' => 'menu'],
            ['code' => 'M07.S02', 'name' => 'Attendance', 'type' => 'menu'],
            ['code' => 'M07.S03', 'name' => 'Payroll', 'type' => 'menu'],
            ['code' => 'M07.S04', 'name' => 'Reports', 'type' => 'menu'],

            // ============ ASSETS MANAGEMENT SUBMENUS ============
            ['code' => 'M08.S01', 'name' => 'Asset Operations', 'type' => 'menu'],
            ['code' => 'M08.S02', 'name' => 'Maintenance', 'type' => 'menu'],
            ['code' => 'M08.S03', 'name' => 'Depreciation', 'type' => 'menu'],
            ['code' => 'M08.S04', 'name' => 'Reports', 'type' => 'menu'],

            // ============ PROJECT SUBMENUS ============
            ['code' => 'M09.S01', 'name' => 'Project Management', 'type' => 'menu'],
            ['code' => 'M09.S02', 'name' => 'Budgeting', 'type' => 'menu'],
            ['code' => 'M09.S03', 'name' => 'Reports', 'type' => 'menu'],

            // ============ CRM SUBMENUS ============
            ['code' => 'M10.S01', 'name' => 'Lead Management', 'type' => 'menu'],
            ['code' => 'M10.S02', 'name' => 'Customer Activities', 'type' => 'menu'],
            ['code' => 'M10.S03', 'name' => 'Reports', 'type' => 'menu'],

            // ============ REPORTS & ANALYTICS SUBMENUS ============
            ['code' => 'M11.S01', 'name' => 'Operational Reports', 'type' => 'menu'],
            ['code' => 'M11.S02', 'name' => 'Financial Reports', 'type' => 'menu'],
            ['code' => 'M11.S03', 'name' => 'HR Reports', 'type' => 'menu'],
            ['code' => 'M11.S04', 'name' => 'Dashboard Analytics', 'type' => 'menu'],

            // ============ SETTINGS SUBMENUS ============
            ['code' => 'M12.S01', 'name' => 'User & Security', 'type' => 'menu'],

            // ============ MASTER DATA CHILD MENUS ============
            // Business Partner
            ['code' => 'M01.S01.C01', 'name' => 'Customer', 'type' => 'menu'],
            ['code' => 'M01.S01.C02', 'name' => 'Supplier', 'type' => 'menu'],
            ['code' => 'M01.S01.C03', 'name' => 'Vendor', 'type' => 'menu'],
            // Inventory Master Data
            ['code' => 'M01.S02.C01', 'name' => 'Item Master', 'type' => 'menu'],
            ['code' => 'M01.S02.C02', 'name' => 'Category', 'type' => 'menu'],
            ['code' => 'M01.S02.C03', 'name' => 'Brand', 'type' => 'menu'],
            ['code' => 'M01.S02.C04', 'name' => 'UOM', 'type' => 'menu'],
            ['code' => 'M01.S02.C05', 'name' => 'Warehouse', 'type' => 'menu'],
            // Asset Management Master Data
            ['code' => 'M01.S03.C01', 'name' => 'Asset', 'type' => 'menu'],
            ['code' => 'M01.S03.C02', 'name' => 'Asset Category', 'type' => 'menu'],
            ['code' => 'M01.S03.C03', 'name' => 'Asset Location', 'type' => 'menu'],
            ['code' => 'M01.S03.C04', 'name' => 'Asset Status', 'type' => 'menu'],
            // Human Resource Master Data
            ['code' => 'M01.S04.C01', 'name' => 'Employee', 'type' => 'menu'],
            ['code' => 'M01.S04.C02', 'name' => 'Department', 'type' => 'menu'],
            ['code' => 'M01.S04.C03', 'name' => 'Position', 'type' => 'menu'],
            // General
            ['code' => 'M01.S00.C01', 'name' => 'City', 'type' => 'menu'],
            ['code' => 'M01.S00.C02', 'name' => 'Province', 'type' => 'menu'],
            ['code' => 'M01.S00.C03', 'name' => 'Country', 'type' => 'menu'],
            ['code' => 'M01.S00.C04', 'name' => 'Currency', 'type' => 'menu'],
            // Finance Master Data
            ['code' => 'M01.S05.C01', 'name' => 'COA', 'type' => 'menu'],
            ['code' => 'M01.S05.C02', 'name' => 'Tax', 'type' => 'menu'],
            ['code' => 'M01.S05.C03', 'name' => 'Payment Terms', 'type' => 'menu'],

            // ============ INVENTORY CHILD MENUS ============
            // Transactions
            ['code' => 'M04.S01.C01', 'name' => 'Goods Receipt', 'type' => 'menu'],
            ['code' => 'M04.S01.C02', 'name' => 'Goods Issue', 'type' => 'menu'],
            ['code' => 'M04.S01.C03', 'name' => 'Stock Transfer', 'type' => 'menu'],
            ['code' => 'M04.S01.C04', 'name' => 'Stock Adjustment', 'type' => 'menu'],
            ['code' => 'M04.S01.C05', 'name' => 'Stock Opname', 'type' => 'menu'],
            // Warehouse Operations
            ['code' => 'M04.S02.C01', 'name' => 'Bin Location', 'type' => 'menu'],
            ['code' => 'M04.S02.C02', 'name' => 'Put Away', 'type' => 'menu'],
            ['code' => 'M04.S02.C03', 'name' => 'Picking', 'type' => 'menu'],
            ['code' => 'M04.S02.C04', 'name' => 'Packing', 'type' => 'menu'],
            // Cold Storage
            ['code' => 'M04.S03.C01', 'name' => 'Cold Room', 'type' => 'menu'],
            ['code' => 'M04.S03.C02', 'name' => 'Temperature Monitoring', 'type' => 'menu'],
            ['code' => 'M04.S03.C03', 'name' => 'Pallet Tracking', 'type' => 'menu'],
            ['code' => 'M04.S03.C04', 'name' => 'Storage Utilization', 'type' => 'menu'],
            // Inventory Reports
            ['code' => 'M04.S04.C01', 'name' => 'Stock Card', 'type' => 'menu'],
            ['code' => 'M04.S04.C02', 'name' => 'Inventory Movement', 'type' => 'menu'],
            ['code' => 'M04.S04.C03', 'name' => 'Aging Stock', 'type' => 'menu'],
            ['code' => 'M04.S04.C04', 'name' => 'Inventory Valuation', 'type' => 'menu'],

            // ============ PRODUCTION CHILD MENUS ============
            // Planning
            ['code' => 'M05.S01.C01', 'name' => 'BOM', 'type' => 'menu'],
            ['code' => 'M05.S01.C02', 'name' => 'Production Planning', 'type' => 'menu'],
            ['code' => 'M05.S01.C03', 'name' => 'Material Requirement Planning', 'type' => 'menu'],
            // Execution
            ['code' => 'M05.S02.C01', 'name' => 'Work Order', 'type' => 'menu'],
            ['code' => 'M05.S02.C02', 'name' => 'Material Issue', 'type' => 'menu'],
            ['code' => 'M05.S02.C03', 'name' => 'Production Receipt', 'type' => 'menu'],
            ['code' => 'M05.S02.C04', 'name' => 'Production Completion', 'type' => 'menu'],
            // Reports
            ['code' => 'M05.S03.C01', 'name' => 'Production Report', 'type' => 'menu'],
            ['code' => 'M05.S03.C02', 'name' => 'Material Consumption', 'type' => 'menu'],
            ['code' => 'M05.S03.C03', 'name' => 'Production Cost', 'type' => 'menu'],

            // ============ FINANCE CHILD MENUS ============
            // General Ledger
            ['code' => 'M06.S01.C01', 'name' => 'Journal Entry', 'type' => 'menu'],
            ['code' => 'M06.S01.C02', 'name' => 'Recurring Journal', 'type' => 'menu'],
            ['code' => 'M06.S01.C03', 'name' => 'Journal Approval', 'type' => 'menu'],
            // Cash & Bank
            ['code' => 'M06.S02.C01', 'name' => 'Cash In', 'type' => 'menu'],
            ['code' => 'M06.S02.C02', 'name' => 'Cash Out', 'type' => 'menu'],
            ['code' => 'M06.S02.C03', 'name' => 'Bank Transfer', 'type' => 'menu'],
            ['code' => 'M06.S02.C04', 'name' => 'Bank Reconciliation', 'type' => 'menu'],
            // Accounts Receivable
            ['code' => 'M06.S03.C01', 'name' => 'Customer Invoice', 'type' => 'menu'],
            ['code' => 'M06.S03.C02', 'name' => 'Customer Payment', 'type' => 'menu'],
            ['code' => 'M06.S03.C03', 'name' => 'Outstanding Receivable', 'type' => 'menu'],
            // Accounts Payable
            ['code' => 'M06.S04.C01', 'name' => 'Supplier Invoice', 'type' => 'menu'],
            ['code' => 'M06.S04.C02', 'name' => 'Supplier Payment', 'type' => 'menu'],
            ['code' => 'M06.S04.C03', 'name' => 'Outstanding Payable', 'type' => 'menu'],
            // Financial Reports
            ['code' => 'M06.S05.C01', 'name' => 'Trial Balance', 'type' => 'menu'],
            ['code' => 'M06.S05.C02', 'name' => 'Profit & Loss', 'type' => 'menu'],
            ['code' => 'M06.S05.C03', 'name' => 'Balance Sheet', 'type' => 'menu'],
            ['code' => 'M06.S05.C04', 'name' => 'Cash Flow', 'type' => 'menu'],

            // ============ HR & PAYROLL CHILD MENUS ============
            // Employee Management
            ['code' => 'M07.S01.C01', 'name' => 'Employee Profile', 'type' => 'menu'],
            ['code' => 'M07.S01.C02', 'name' => 'Employee Contract', 'type' => 'menu'],
            ['code' => 'M07.S01.C03', 'name' => 'Employee Document', 'type' => 'menu'],
            // Attendance
            ['code' => 'M07.S02.C01', 'name' => 'Attendance Log', 'type' => 'menu'],
            ['code' => 'M07.S02.C02', 'name' => 'Shift Schedule', 'type' => 'menu'],
            ['code' => 'M07.S02.C03', 'name' => 'Overtime', 'type' => 'menu'],
            ['code' => 'M07.S02.C04', 'name' => 'Leave Request', 'type' => 'menu'],
            // Payroll
            ['code' => 'M07.S03.C01', 'name' => 'Payroll Process', 'type' => 'menu'],
            ['code' => 'M07.S03.C02', 'name' => 'Payroll Component', 'type' => 'menu'],
            ['code' => 'M07.S03.C03', 'name' => 'Payslip', 'type' => 'menu'],
            ['code' => 'M07.S03.C04', 'name' => 'Payroll History', 'type' => 'menu'],
            // HR Reports
            ['code' => 'M07.S04.C01', 'name' => 'Attendance Report', 'type' => 'menu'],
            ['code' => 'M07.S04.C02', 'name' => 'Leave Report', 'type' => 'menu'],
            ['code' => 'M07.S04.C03', 'name' => 'Payroll Report', 'type' => 'menu'],

            // ============ ASSETS MANAGEMENT CHILD MENUS ============
            // Asset Operations
            ['code' => 'M08.S01.C01', 'name' => 'Asset Registration', 'type' => 'menu'],
            ['code' => 'M08.S01.C02', 'name' => 'Asset Assignment', 'type' => 'menu'],
            ['code' => 'M08.S01.C03', 'name' => 'Asset Transfer', 'type' => 'menu'],
            ['code' => 'M08.S01.C04', 'name' => 'Asset Disposal', 'type' => 'menu'],
            // Maintenance
            ['code' => 'M08.S02.C01', 'name' => 'Maintenance Request', 'type' => 'menu'],
            ['code' => 'M08.S02.C02', 'name' => 'Maintenance Schedule', 'type' => 'menu'],
            ['code' => 'M08.S02.C03', 'name' => 'Maintenance History', 'type' => 'menu'],
            ['code' => 'M08.S02.C04', 'name' => 'Repair Tracking', 'type' => 'menu'],
            // Depreciation
            ['code' => 'M08.S03.C01', 'name' => 'Depreciation Process', 'type' => 'menu'],
            ['code' => 'M08.S03.C02', 'name' => 'Depreciation History', 'type' => 'menu'],
            ['code' => 'M08.S03.C03', 'name' => 'Asset Valuation', 'type' => 'menu'],
            // Assets Reports
            ['code' => 'M08.S04.C01', 'name' => 'Asset Register Report', 'type' => 'menu'],
            ['code' => 'M08.S04.C02', 'name' => 'Maintenance Report', 'type' => 'menu'],
            ['code' => 'M08.S04.C03', 'name' => 'Depreciation Report', 'type' => 'menu'],

            // ============ PROJECT CHILD MENUS ============
            // Project Management
            ['code' => 'M09.S01.C01', 'name' => 'Project Master', 'type' => 'menu'],
            ['code' => 'M09.S01.C02', 'name' => 'Project Task', 'type' => 'menu'],
            ['code' => 'M09.S01.C03', 'name' => 'Milestone', 'type' => 'menu'],
            ['code' => 'M09.S01.C04', 'name' => 'Project Timeline', 'type' => 'menu'],
            // Budgeting
            ['code' => 'M09.S02.C01', 'name' => 'Budget Plan', 'type' => 'menu'],
            ['code' => 'M09.S02.C02', 'name' => 'Budget Realization', 'type' => 'menu'],
            ['code' => 'M09.S02.C03', 'name' => 'Project Cost', 'type' => 'menu'],
            // Project Reports
            ['code' => 'M09.S03.C01', 'name' => 'Progress Report', 'type' => 'menu'],
            ['code' => 'M09.S03.C02', 'name' => 'Budget Report', 'type' => 'menu'],
            ['code' => 'M09.S03.C03', 'name' => 'Cost Report', 'type' => 'menu'],

            // ============ CRM CHILD MENUS ============
            // Lead Management
            ['code' => 'M10.S01.C01', 'name' => 'Lead', 'type' => 'menu'],
            ['code' => 'M10.S01.C02', 'name' => 'Opportunity', 'type' => 'menu'],
            ['code' => 'M10.S01.C03', 'name' => 'Lead Source', 'type' => 'menu'],
            // Customer Activities
            ['code' => 'M10.S02.C01', 'name' => 'Meeting', 'type' => 'menu'],
            ['code' => 'M10.S02.C02', 'name' => 'Call Log', 'type' => 'menu'],
            ['code' => 'M10.S02.C03', 'name' => 'Follow Up', 'type' => 'menu'],
            ['code' => 'M10.S02.C04', 'name' => 'Visit Report', 'type' => 'menu'],
            // CRM Reports
            ['code' => 'M10.S03.C01', 'name' => 'Lead Report', 'type' => 'menu'],
            ['code' => 'M10.S03.C02', 'name' => 'Opportunity Report', 'type' => 'menu'],
            ['code' => 'M10.S03.C03', 'name' => 'Conversion Report', 'type' => 'menu'],

            // ============ REPORTS & ANALYTICS CHILD MENUS ============
            // Operational Reports
            ['code' => 'M11.S01.C01', 'name' => 'Sales Report', 'type' => 'menu'],
            ['code' => 'M11.S01.C02', 'name' => 'Purchase Report', 'type' => 'menu'],
            ['code' => 'M11.S01.C03', 'name' => 'Inventory Report', 'type' => 'menu'],
            ['code' => 'M11.S01.C04', 'name' => 'Asset Report', 'type' => 'menu'],
            // Financial Reports
            ['code' => 'M11.S02.C01', 'name' => 'Profit & Loss', 'type' => 'menu'],
            ['code' => 'M11.S02.C02', 'name' => 'Balance Sheet', 'type' => 'menu'],
            ['code' => 'M11.S02.C03', 'name' => 'Cash Flow', 'type' => 'menu'],
            ['code' => 'M11.S02.C04', 'name' => 'Trial Balance', 'type' => 'menu'],
            // HR Reports
            ['code' => 'M11.S03.C01', 'name' => 'Attendance Report', 'type' => 'menu'],
            ['code' => 'M11.S03.C02', 'name' => 'Leave Report', 'type' => 'menu'],
            ['code' => 'M11.S03.C03', 'name' => 'Payroll Report', 'type' => 'menu'],
            // Dashboard Analytics
            ['code' => 'M11.S04.C01', 'name' => 'KPI Dashboard', 'type' => 'menu'],
            ['code' => 'M11.S04.C02', 'name' => 'Executive Dashboard', 'type' => 'menu'],
            ['code' => 'M11.S04.C03', 'name' => 'Operational Dashboard', 'type' => 'menu'],

            // ============ SETTINGS CHILD MENUS ============
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
