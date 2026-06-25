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
            ['code' => 'M13', 'name' => 'Quality Management', 'type' => 'menu'],
            ['code' => 'M14', 'name' => 'Maintenance Management', 'type' => 'menu'],
            ['code' => 'M15', 'name' => 'Service Desk', 'type' => 'menu'],

            // ============ MASTER DATA SUBMENUS ============
            ['code' => 'M01.S01', 'name' => 'Business Partner', 'type' => 'menu'],
            ['code' => 'M01.S02', 'name' => 'Inventory', 'type' => 'menu'],
            ['code' => 'M01.S03', 'name' => 'Asset Management', 'type' => 'menu'],
            ['code' => 'M01.S04', 'name' => 'Human Resource', 'type' => 'menu'],
            ['code' => 'M01.S05', 'name' => 'Finance', 'type' => 'menu'],
            ['code' => 'M01.S07', 'name' => 'Company Profile', 'type' => 'menu'],

            // ============ INVENTORY SUBMENUS ============
            ['code' => 'M04.S01', 'name' => 'Transactions', 'type' => 'menu'],
            ['code' => 'M04.S02', 'name' => 'Warehouse Operations', 'type' => 'menu'],
            ['code' => 'M04.S03', 'name' => 'Cold Storage', 'type' => 'menu'],
            ['code' => 'M04.S04', 'name' => 'Reports', 'type' => 'menu'],
            ['code' => 'M04.S05', 'name' => 'Inventory Control', 'type' => 'menu'],

            // ============ PRODUCTION SUBMENUS ============
            ['code' => 'M05.S00', 'name' => 'Production Master', 'type' => 'menu'],
            ['code' => 'M05.S01', 'name' => 'Planning', 'type' => 'menu'],
            ['code' => 'M05.S02', 'name' => 'Execution', 'type' => 'menu'],
            ['code' => 'M05.S03', 'name' => 'Shop Floor Control', 'type' => 'menu'],
            ['code' => 'M05.S04', 'name' => 'Manufacturing Analytics', 'type' => 'menu'],

            // ============ FINANCE SUBMENUS ============
            ['code' => 'M06.S01', 'name' => 'General Ledger', 'type' => 'menu'],
            ['code' => 'M06.S02', 'name' => 'Cash & Bank', 'type' => 'menu'],
            ['code' => 'M06.S03', 'name' => 'Accounts Receivable', 'type' => 'menu'],
            ['code' => 'M06.S04', 'name' => 'Accounts Payable', 'type' => 'menu'],
            ['code' => 'M06.S05', 'name' => 'Financial Reports', 'type' => 'menu'],
            ['code' => 'M06.S06', 'name' => 'Budgeting', 'type' => 'menu'],
            ['code' => 'M06.S07', 'name' => 'Cost Accounting', 'type' => 'menu'],
            ['code' => 'M06.S08', 'name' => 'Fixed Asset Accounting', 'type' => 'menu'],
            ['code' => 'M06.S09', 'name' => 'Tax Management', 'type' => 'menu'],

            // ============ HR & PAYROLL SUBMENUS ============
            ['code' => 'M07.S01', 'name' => 'Employee Management', 'type' => 'menu'],
            ['code' => 'M07.S02', 'name' => 'Attendance', 'type' => 'menu'],
            ['code' => 'M07.S03', 'name' => 'Payroll', 'type' => 'menu'],
            ['code' => 'M07.S04', 'name' => 'Reports', 'type' => 'menu'],

            // ============ ASSETS MANAGEMENT SUBMENUS ============
            ['code' => 'M08.S01', 'name' => 'Asset Operations', 'type' => 'menu'],
            ['code' => 'M08.S02', 'name' => 'Asset Transactions', 'type' => 'menu'],
            ['code' => 'M08.S03', 'name' => 'Reports', 'type' => 'menu'],

            // ============ PROJECT SUBMENUS ============
            ['code' => 'M09.S01', 'name' => 'Project Management', 'type' => 'menu'],
            ['code' => 'M09.S02', 'name' => 'Budgeting', 'type' => 'menu'],
            ['code' => 'M09.S03', 'name' => 'Resource Management', 'type' => 'menu'],
            ['code' => 'M09.S04', 'name' => 'Timesheet', 'type' => 'menu'],
            ['code' => 'M09.S05', 'name' => 'Billing', 'type' => 'menu'],
            ['code' => 'M09.S06', 'name' => 'Profitability', 'type' => 'menu'],
            ['code' => 'M09.S07', 'name' => 'Reports', 'type' => 'menu'],

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
            ['code' => 'M12.S08', 'name' => 'Audit', 'type' => 'menu'],

            // ============ PURCHASE SUBMENUS ============
            ['code' => 'M03.S05', 'name' => 'Vendor Management', 'type' => 'menu'],

            // ============ QUALITY MANAGEMENT SUBMENUS ============
            ['code' => 'M13.S01', 'name' => 'Quality Planning', 'type' => 'menu'],
            ['code' => 'M13.S02', 'name' => 'Inspection', 'type' => 'menu'],
            ['code' => 'M13.S03', 'name' => 'Non Conformance', 'type' => 'menu'],
            ['code' => 'M13.S04', 'name' => 'Calibration', 'type' => 'menu'],
            ['code' => 'M13.S05', 'name' => 'Reports', 'type' => 'menu'],

            // ============ MAINTENANCE MANAGEMENT SUBMENUS ============
            ['code' => 'M14.S01', 'name' => 'Maintenance Request', 'type' => 'menu'],
            ['code' => 'M14.S02', 'name' => 'Preventive Maintenance', 'type' => 'menu'],
            ['code' => 'M14.S03', 'name' => 'Corrective Maintenance', 'type' => 'menu'],
            ['code' => 'M14.S04', 'name' => 'Inspection', 'type' => 'menu'],
            ['code' => 'M14.S05', 'name' => 'Reports', 'type' => 'menu'],

            // ============ SERVICE DESK SUBMENUS ============
            ['code' => 'M15.S01', 'name' => 'Ticket Management', 'type' => 'menu'],
            ['code' => 'M15.S02', 'name' => 'Knowledge Base', 'type' => 'menu'],
            ['code' => 'M15.S03', 'name' => 'Field Service', 'type' => 'menu'],
            ['code' => 'M15.S04', 'name' => 'Reports', 'type' => 'menu'],

            // ============ MASTER DATA CHILD MENUS ============
            // Business Partner
            ['code' => 'M01.S01.C01', 'name' => 'Customer', 'type' => 'menu'],
            ['code' => 'M01.S01.C02', 'name' => 'Supplier', 'type' => 'menu'],
            ['code' => 'M01.S01.C03', 'name' => 'Supplier Type', 'type' => 'menu'],
            ['code' => 'M01.S01.C04', 'name' => 'Supplier Category', 'type' => 'menu'],
            ['code' => 'M01.S01.C05', 'name' => 'Business Partner Group', 'type' => 'menu'],
            // Inventory Master Data
            ['code' => 'M01.S02.C01', 'name' => 'Item Master', 'type' => 'menu'],
            ['code' => 'M01.S02.C02', 'name' => 'Category', 'type' => 'menu'],
            ['code' => 'M01.S02.C03', 'name' => 'Brand', 'type' => 'menu'],
            ['code' => 'M01.S02.C04', 'name' => 'UOM', 'type' => 'menu'],
            ['code' => 'M01.S02.C05', 'name' => 'Warehouse', 'type' => 'menu'],
            ['code' => 'M01.S02.C06', 'name' => 'Bin Location', 'type' => 'menu'],
            ['code' => 'M01.S02.C07', 'name' => 'Item Group', 'type' => 'menu'],
            ['code' => 'M01.S02.C08', 'name' => 'Item Type', 'type' => 'menu'],
            ['code' => 'M01.S02.C09', 'name' => 'Batch/Lot Master', 'type' => 'menu'],
            ['code' => 'M01.S02.C10', 'name' => 'Serial Number Master', 'type' => 'menu'],
            ['code' => 'M01.S02.C11', 'name' => 'Reorder Point', 'type' => 'menu'],
            // Asset Management Master Data
            ['code' => 'M01.S03.C01', 'name' => 'Asset', 'type' => 'menu'],
            ['code' => 'M01.S03.C02', 'name' => 'Asset Category', 'type' => 'menu'],
            ['code' => 'M01.S03.C03', 'name' => 'Asset Location', 'type' => 'menu'],
            ['code' => 'M01.S03.C04', 'name' => 'Asset Status', 'type' => 'menu'],
            // Human Resource Master Data
            ['code' => 'M01.S04.C01', 'name' => 'Employee', 'type' => 'menu'],
            ['code' => 'M01.S04.C02', 'name' => 'Department', 'type' => 'menu'],
            ['code' => 'M01.S04.C03', 'name' => 'Position', 'type' => 'menu'],
            // Company Profile
            ['code' => 'M01.S07.C01', 'name' => 'Branch', 'type' => 'menu'],
            ['code' => 'M01.S07.C02', 'name' => 'Currency', 'type' => 'menu'],
            ['code' => 'M01.S07.C03', 'name' => 'Fiscal Year', 'type' => 'menu'],
            // Finance Master Data
            ['code' => 'M01.S05.C01', 'name' => 'COA', 'type' => 'menu'],
            ['code' => 'M01.S05.C02', 'name' => 'Tax', 'type' => 'menu'],
            ['code' => 'M01.S05.C03', 'name' => 'Payment Terms', 'type' => 'menu'],
            ['code' => 'M01.S05.C04', 'name' => 'Cost Center', 'type' => 'menu'],
            ['code' => 'M01.S05.C05', 'name' => 'Profit Center', 'type' => 'menu'],
            ['code' => 'M01.S05.C06', 'name' => 'Bank Account', 'type' => 'menu'],
            ['code' => 'M01.S05.C07', 'name' => 'Exchange Rate', 'type' => 'menu'],

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
            ['code' => 'M04.S03.C05', 'name' => 'FEFO Management', 'type' => 'menu'],
            ['code' => 'M04.S03.C06', 'name' => 'Expiry Monitoring', 'type' => 'menu'],
            ['code' => 'M04.S03.C07', 'name' => 'Temperature Alert', 'type' => 'menu'],
            // Inventory Reports
            ['code' => 'M04.S04.C01', 'name' => 'Stock Card', 'type' => 'menu'],
            ['code' => 'M04.S04.C02', 'name' => 'Inventory Movement', 'type' => 'menu'],
            ['code' => 'M04.S04.C03', 'name' => 'Aging Stock', 'type' => 'menu'],
            ['code' => 'M04.S04.C04', 'name' => 'Inventory Valuation', 'type' => 'menu'],
            // Inventory Control
            ['code' => 'M04.S05.C01', 'name' => 'Lot Tracking', 'type' => 'menu'],
            ['code' => 'M04.S05.C02', 'name' => 'Serial Tracking', 'type' => 'menu'],
            ['code' => 'M04.S05.C03', 'name' => 'Stock Reservation', 'type' => 'menu'],
            ['code' => 'M04.S05.C04', 'name' => 'Replenishment', 'type' => 'menu'],
            ['code' => 'M04.S05.C05', 'name' => 'Cycle Count', 'type' => 'menu'],
            ['code' => 'M04.S05.C06', 'name' => 'Inventory Freeze', 'type' => 'menu'],

            // ============ PRODUCTION CHILD MENUS ============
            // Production Master
            ['code' => 'M05.S00.C01', 'name' => 'Routing', 'type' => 'menu'],
            ['code' => 'M05.S00.C02', 'name' => 'Work Center', 'type' => 'menu'],
            ['code' => 'M05.S00.C03', 'name' => 'Machine', 'type' => 'menu'],
            ['code' => 'M05.S00.C04', 'name' => 'Production Shift', 'type' => 'menu'],
            ['code' => 'M05.S00.C05', 'name' => 'Production Line', 'type' => 'menu'],
            // Planning
            ['code' => 'M05.S01.C01', 'name' => 'BOM', 'type' => 'menu'],
            ['code' => 'M05.S01.C02', 'name' => 'Production Planning', 'type' => 'menu'],
            ['code' => 'M05.S01.C03', 'name' => 'Material Requirement Planning', 'type' => 'menu'],
            // Execution
            ['code' => 'M05.S02.C01', 'name' => 'Work Order', 'type' => 'menu'],
            ['code' => 'M05.S02.C02', 'name' => 'Material Issue', 'type' => 'menu'],
            ['code' => 'M05.S02.C03', 'name' => 'Production Receipt', 'type' => 'menu'],
            ['code' => 'M05.S02.C04', 'name' => 'Production Completion', 'type' => 'menu'],
            // Shop Floor Control
            ['code' => 'M05.S03.C01', 'name' => 'Production Monitoring', 'type' => 'menu'],
            ['code' => 'M05.S03.C02', 'name' => 'Machine Downtime', 'type' => 'menu'],
            ['code' => 'M05.S03.C03', 'name' => 'Production Scrap', 'type' => 'menu'],
            ['code' => 'M05.S03.C04', 'name' => 'Rework', 'type' => 'menu'],
            ['code' => 'M05.S03.C05', 'name' => 'Production QC', 'type' => 'menu'],
            // Manufacturing Analytics
            ['code' => 'M05.S04.C01', 'name' => 'OEE Dashboard', 'type' => 'menu'],
            ['code' => 'M05.S04.C02', 'name' => 'Machine Utilization', 'type' => 'menu'],
            ['code' => 'M05.S04.C03', 'name' => 'Production Efficiency', 'type' => 'menu'],
            ['code' => 'M05.S04.C04', 'name' => 'Scrap Analysis', 'type' => 'menu'],

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
            ['code' => 'M06.S03.C01', 'name' => 'Incoming Payment', 'type' => 'menu'],
            ['code' => 'M06.S03.C02', 'name' => 'Payment Allocation', 'type' => 'menu'],
            ['code' => 'M06.S03.C03', 'name' => 'Payment History', 'type' => 'menu'],
            ['code' => 'M06.S03.C04', 'name' => 'Outstanding Receivable', 'type' => 'menu'],
            // Accounts Payable
            ['code' => 'M06.S04.C01', 'name' => 'Outgoing Payment', 'type' => 'menu'],
            ['code' => 'M06.S04.C02', 'name' => 'Payment Allocation', 'type' => 'menu'],
            ['code' => 'M06.S04.C03', 'name' => 'Payment History', 'type' => 'menu'],
            ['code' => 'M06.S04.C04', 'name' => 'Outstanding Payable', 'type' => 'menu'],
            // Financial Reports
            ['code' => 'M06.S05.C01', 'name' => 'Trial Balance', 'type' => 'menu'],
            ['code' => 'M06.S05.C02', 'name' => 'Profit & Loss', 'type' => 'menu'],
            ['code' => 'M06.S05.C03', 'name' => 'Balance Sheet', 'type' => 'menu'],
            ['code' => 'M06.S05.C04', 'name' => 'Cash Flow', 'type' => 'menu'],
            // Budgeting
            ['code' => 'M06.S06.C01', 'name' => 'Budget Plan', 'type' => 'menu'],
            ['code' => 'M06.S06.C02', 'name' => 'Budget Approval', 'type' => 'menu'],
            ['code' => 'M06.S06.C03', 'name' => 'Budget Realization', 'type' => 'menu'],
            ['code' => 'M06.S06.C04', 'name' => 'Budget Variance', 'type' => 'menu'],
            // Cost Accounting
            ['code' => 'M06.S07.C01', 'name' => 'Cost Center Allocation', 'type' => 'menu'],
            ['code' => 'M06.S07.C02', 'name' => 'Profit Center Analysis', 'type' => 'menu'],
            ['code' => 'M06.S07.C03', 'name' => 'Cost Distribution', 'type' => 'menu'],
            ['code' => 'M06.S07.C04', 'name' => 'Department Costing', 'type' => 'menu'],
            // Fixed Asset Accounting
            ['code' => 'M06.S08.C01', 'name' => 'Asset Acquisition', 'type' => 'menu'],
            ['code' => 'M06.S08.C02', 'name' => 'Asset Depreciation', 'type' => 'menu'],
            ['code' => 'M06.S08.C03', 'name' => 'Asset Revaluation', 'type' => 'menu'],
            ['code' => 'M06.S08.C04', 'name' => 'Asset Disposal', 'type' => 'menu'],
            // Tax Management
            ['code' => 'M06.S09.C01', 'name' => 'Tax Invoice', 'type' => 'menu'],
            ['code' => 'M06.S09.C02', 'name' => 'VAT Report', 'type' => 'menu'],
            ['code' => 'M06.S09.C03', 'name' => 'Tax Reconciliation', 'type' => 'menu'],
            ['code' => 'M06.S09.C04', 'name' => 'Withholding Tax', 'type' => 'menu'],

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
            ['code' => 'M08.S01.C04', 'name' => 'Asset Return', 'type' => 'menu'],
            // Asset Transactions
            ['code' => 'M08.S02.C01', 'name' => 'Asset Depreciation', 'type' => 'menu'],
            ['code' => 'M08.S02.C02', 'name' => 'Asset Revaluation', 'type' => 'menu'],
            ['code' => 'M08.S02.C03', 'name' => 'Asset Disposal', 'type' => 'menu'],
            ['code' => 'M08.S02.C04', 'name' => 'Asset Write Off', 'type' => 'menu'],
            // Assets Reports
            ['code' => 'M08.S03.C01', 'name' => 'Asset Reporting', 'type' => 'menu'],

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
            // Resource Management
            ['code' => 'M09.S03.C01', 'name' => 'Resource Allocation', 'type' => 'menu'],
            ['code' => 'M09.S03.C02', 'name' => 'Equipment Allocation', 'type' => 'menu'],
            // Timesheet
            ['code' => 'M09.S04.C01', 'name' => 'Timesheet Entry', 'type' => 'menu'],
            ['code' => 'M09.S04.C02', 'name' => 'Timesheet Approval', 'type' => 'menu'],
            // Billing
            ['code' => 'M09.S05.C01', 'name' => 'Project Billing', 'type' => 'menu'],
            ['code' => 'M09.S05.C02', 'name' => 'Project Invoice', 'type' => 'menu'],
            // Profitability
            ['code' => 'M09.S06.C01', 'name' => 'Project Profitability', 'type' => 'menu'],
            // Project Reports
            ['code' => 'M09.S07.C01', 'name' => 'Progress Report', 'type' => 'menu'],
            ['code' => 'M09.S07.C02', 'name' => 'Budget Report', 'type' => 'menu'],
            ['code' => 'M09.S07.C03', 'name' => 'Cost Report', 'type' => 'menu'],

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

            // ============ SALES CHILD MENUS ============
            // Sales Management
            ['code' => 'M02.S01.C01', 'name' => 'Quotations', 'type' => 'menu'],
            ['code' => 'M02.S01.C02', 'name' => 'Sales Orders', 'type' => 'menu'],
            ['code' => 'M02.S01.C03', 'name' => 'Invoices', 'type' => 'menu'],
            ['code' => 'M02.S01.C04', 'name' => 'Delivery Notes', 'type' => 'menu'],
            ['code' => 'M02.S01.C05', 'name' => 'Credit Notes', 'type' => 'menu'],

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
            ['code' => 'M11.S04.C04', 'name' => 'Production Dashboard', 'type' => 'menu'],
            ['code' => 'M11.S04.C05', 'name' => 'Quality Dashboard', 'type' => 'menu'],
            ['code' => 'M11.S04.C06', 'name' => 'Maintenance Dashboard', 'type' => 'menu'],
            ['code' => 'M11.S04.C07', 'name' => 'CRM Dashboard', 'type' => 'menu'],
            ['code' => 'M11.S04.C08', 'name' => 'Project Dashboard', 'type' => 'menu'],

            // ============ SETTINGS CHILD MENUS ============
            ['code' => 'M12.S01.C01', 'name' => 'Users', 'type' => 'menu'],
            ['code' => 'M12.S01.C02', 'name' => 'Roles', 'type' => 'menu'],
            ['code' => 'M12.S01.C03', 'name' => 'Approval Matrix', 'type' => 'menu'],
            ['code' => 'M12.S01.C04', 'name' => 'Approval Workflow', 'type' => 'menu'],
            ['code' => 'M12.S01.C05', 'name' => 'Approval History', 'type' => 'menu'],
            ['code' => 'M12.S08.C01', 'name' => 'Activity Log', 'type' => 'menu'],
            ['code' => 'M12.S08.C02', 'name' => 'Audit Trail', 'type' => 'menu'],
            ['code' => 'M12.S08.C03', 'name' => 'Login History', 'type' => 'menu'],

            // ============ PURCHASE CHILD MENUS ============
            // Vendor Management
            ['code' => 'M03.S05.C01', 'name' => 'Vendor Evaluation', 'type' => 'menu'],
            ['code' => 'M03.S05.C02', 'name' => 'Vendor Scorecard', 'type' => 'menu'],
            ['code' => 'M03.S05.C03', 'name' => 'Vendor Performance', 'type' => 'menu'],
            ['code' => 'M03.S05.C04', 'name' => 'Approved Vendor List', 'type' => 'menu'],

            // ============ QUALITY MANAGEMENT CHILD MENUS ============
            // Quality Planning
            ['code' => 'M13.S01.C01', 'name' => 'Inspection Plan', 'type' => 'menu'],
            ['code' => 'M13.S01.C02', 'name' => 'Quality Standard', 'type' => 'menu'],
            ['code' => 'M13.S01.C03', 'name' => 'Quality Checklist', 'type' => 'menu'],
            // Inspection
            ['code' => 'M13.S02.C01', 'name' => 'Incoming Inspection', 'type' => 'menu'],
            ['code' => 'M13.S02.C02', 'name' => 'In Process Inspection', 'type' => 'menu'],
            ['code' => 'M13.S02.C03', 'name' => 'Final Inspection', 'type' => 'menu'],
            ['code' => 'M13.S02.C04', 'name' => 'Inspection Result', 'type' => 'menu'],
            // Non Conformance
            ['code' => 'M13.S03.C01', 'name' => 'NCR', 'type' => 'menu'],
            ['code' => 'M13.S03.C02', 'name' => 'CAPA', 'type' => 'menu'],
            ['code' => 'M13.S03.C03', 'name' => 'Root Cause Analysis', 'type' => 'menu'],
            ['code' => 'M13.S03.C04', 'name' => 'Corrective Action', 'type' => 'menu'],
            // Calibration
            ['code' => 'M13.S04.C01', 'name' => 'Calibration Schedule', 'type' => 'menu'],
            ['code' => 'M13.S04.C02', 'name' => 'Calibration Record', 'type' => 'menu'],
            ['code' => 'M13.S04.C03', 'name' => 'Calibration Certificate', 'type' => 'menu'],
            // Quality Reports
            ['code' => 'M13.S05.C01', 'name' => 'Quality Report', 'type' => 'menu'],
            ['code' => 'M13.S05.C02', 'name' => 'NCR Report', 'type' => 'menu'],
            ['code' => 'M13.S05.C03', 'name' => 'CAPA Report', 'type' => 'menu'],
            ['code' => 'M13.S05.C04', 'name' => 'Audit Report', 'type' => 'menu'],

            // ============ MAINTENANCE MANAGEMENT CHILD MENUS ============
            // Maintenance Request
            ['code' => 'M14.S01.C01', 'name' => 'Work Request', 'type' => 'menu'],
            ['code' => 'M14.S01.C02', 'name' => 'Work Order', 'type' => 'menu'],
            ['code' => 'M14.S01.C03', 'name' => 'Request Approval', 'type' => 'menu'],
            // Preventive Maintenance
            ['code' => 'M14.S02.C01', 'name' => 'Maintenance Schedule', 'type' => 'menu'],
            ['code' => 'M14.S02.C02', 'name' => 'PM Checklist', 'type' => 'menu'],
            ['code' => 'M14.S02.C03', 'name' => 'PM Execution', 'type' => 'menu'],
            // Corrective Maintenance
            ['code' => 'M14.S03.C01', 'name' => 'Breakdown Ticket', 'type' => 'menu'],
            ['code' => 'M14.S03.C02', 'name' => 'Repair Activity', 'type' => 'menu'],
            ['code' => 'M14.S03.C03', 'name' => 'Spare Part Usage', 'type' => 'menu'],
            ['code' => 'M14.S03.C04', 'name' => 'Spare Part Request', 'type' => 'menu'],
            // Inspection
            ['code' => 'M14.S04.C01', 'name' => 'Inspection Checklist', 'type' => 'menu'],
            ['code' => 'M14.S04.C02', 'name' => 'Inspection Result', 'type' => 'menu'],
            // Maintenance Reports
            ['code' => 'M14.S05.C01', 'name' => 'Maintenance History', 'type' => 'menu'],
            ['code' => 'M14.S05.C02', 'name' => 'MTBF Report', 'type' => 'menu'],
            ['code' => 'M14.S05.C03', 'name' => 'MTTR Report', 'type' => 'menu'],
            ['code' => 'M14.S05.C04', 'name' => 'Downtime Report', 'type' => 'menu'],

            // ============ SERVICE DESK CHILD MENUS ============
            // Ticket Management
            ['code' => 'M15.S01.C01', 'name' => 'Ticket', 'type' => 'menu'],
            ['code' => 'M15.S01.C02', 'name' => 'Assignment', 'type' => 'menu'],
            ['code' => 'M15.S01.C03', 'name' => 'Escalation', 'type' => 'menu'],
            ['code' => 'M15.S01.C04', 'name' => 'Resolution', 'type' => 'menu'],
            // Knowledge Base
            ['code' => 'M15.S02.C01', 'name' => 'FAQ', 'type' => 'menu'],
            ['code' => 'M15.S02.C02', 'name' => 'SOP', 'type' => 'menu'],
            ['code' => 'M15.S02.C03', 'name' => 'Troubleshooting', 'type' => 'menu'],
            // Field Service
            ['code' => 'M15.S03.C01', 'name' => 'Service Order', 'type' => 'menu'],
            ['code' => 'M15.S03.C02', 'name' => 'Technician Schedule', 'type' => 'menu'],
            ['code' => 'M15.S03.C03', 'name' => 'Service Report', 'type' => 'menu'],
            // Service Desk Reports
            ['code' => 'M15.S04.C01', 'name' => 'SLA Report', 'type' => 'menu'],
            ['code' => 'M15.S04.C02', 'name' => 'Ticket Performance', 'type' => 'menu'],
            ['code' => 'M15.S04.C03', 'name' => 'Resolution Time', 'type' => 'menu'],
            ['code' => 'M15.S04.C04', 'name' => 'Customer Satisfaction', 'type' => 'menu'],
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
