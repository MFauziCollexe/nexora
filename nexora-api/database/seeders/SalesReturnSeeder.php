<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SalesReturnSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();
        $statuses = ['Pending', 'Approved', 'Rejected'];
        $types = ['Return', 'Exchange', 'Credit Note'];
        $reasons = ['Damaged Product', 'Wrong Item', 'Expired Product', 'Not As Described', 'Packaging Damage'];
        $invoices = DB::table('invoices')->get();

        foreach ($invoices->take(10) as $inv) {
            $invDate = Carbon::parse($inv->date);
            $srNo = 'SR-' . date('Y') . '-' . str_pad((string) $inv->id, 6, '0', STR_PAD_LEFT);
            $status = $statuses[array_rand($statuses)];
            $returnAmount = (int) ($inv->total_amount * rand(5, 30) / 100);

            DB::table('sales_returns')->updateOrInsert(
                ['return_no' => $srNo],
                [
                    'return_date' => $invDate->copy()->addDays(rand(1, 14)),
                    'invoice_id' => $inv->id,
                    'invoice_no' => $inv->invoice_no,
                    'customer_id' => $inv->customer_id,
                    'customer_name' => $inv->customer_name,
                    'return_type' => $types[array_rand($types)],
                    'reason' => $reasons[array_rand($reasons)],
                    'total_amount' => $returnAmount,
                    'status' => $status,
                    'notes' => null,
                    'created_by' => 1,
                    'updated_by' => 1,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]
            );
        }
    }
}
