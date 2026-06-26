<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PurchaseRequestSeeder extends Seeder
{
    public function run(): void
    {
        $requesterId = DB::table('users')->value('id');

        $prs = [
            ['pr_no' => 'PR-2026-00048', 'date' => '2026-06-25', 'department' => 'Production', 'total_items' => 5, 'total_amount' => 185000000, 'status' => 'Pending', 'priority' => 'High'],
            ['pr_no' => 'PR-2026-00047', 'date' => '2026-06-24', 'department' => 'Warehouse', 'total_items' => 3, 'total_amount' => 52000000, 'status' => 'Approved', 'priority' => 'Medium'],
            ['pr_no' => 'PR-2026-00046', 'date' => '2026-06-23', 'department' => 'IT', 'total_items' => 8, 'total_amount' => 250000000, 'status' => 'Pending', 'priority' => 'High'],
            ['pr_no' => 'PR-2026-00045', 'date' => '2026-06-22', 'department' => 'Production', 'total_items' => 2, 'total_amount' => 35000000, 'status' => 'Approved', 'priority' => 'Low'],
            ['pr_no' => 'PR-2026-00044', 'date' => '2026-06-21', 'department' => 'Production', 'total_items' => 6, 'total_amount' => 98000000, 'status' => 'Rejected', 'priority' => 'Medium'],
            ['pr_no' => 'PR-2026-00043', 'date' => '2026-06-20', 'department' => 'Marketing', 'total_items' => 4, 'total_amount' => 45000000, 'status' => 'Approved', 'priority' => 'Medium'],
            ['pr_no' => 'PR-2026-00042', 'date' => '2026-06-19', 'department' => 'Warehouse', 'total_items' => 7, 'total_amount' => 120000000, 'status' => 'Draft', 'priority' => 'Low'],
            ['pr_no' => 'PR-2026-00041', 'date' => '2026-06-18', 'department' => 'IT', 'total_items' => 3, 'total_amount' => 75000000, 'status' => 'Approved', 'priority' => 'High'],
            ['pr_no' => 'PR-2026-00040', 'date' => '2026-06-17', 'department' => 'Production', 'total_items' => 10, 'total_amount' => 310000000, 'status' => 'Pending', 'priority' => 'High'],
            ['pr_no' => 'PR-2026-00039', 'date' => '2026-06-16', 'department' => 'Marketing', 'total_items' => 2, 'total_amount' => 28000000, 'status' => 'Approved', 'priority' => 'Low'],
            ['pr_no' => 'PR-2026-00038', 'date' => '2026-06-15', 'department' => 'Production', 'total_items' => 4, 'total_amount' => 65000000, 'status' => 'Rejected', 'priority' => 'Medium'],
            ['pr_no' => 'PR-2026-00037', 'date' => '2026-06-14', 'department' => 'Warehouse', 'total_items' => 6, 'total_amount' => 88000000, 'status' => 'Approved', 'priority' => 'Medium'],
        ];

        foreach ($prs as $pr) {
            DB::table('purchase_requests')->updateOrInsert(
                ['pr_no' => $pr['pr_no']],
                array_merge($pr, [
                    'requested_by' => $requesterId,
                    'created_by' => $requesterId,
                    'description' => 'Purchase request ' . $pr['pr_no'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ])
            );
        }
    }
}
