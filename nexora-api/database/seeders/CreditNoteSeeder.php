<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CreditNoteSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();
        $statuses = ['Unused', 'Partial', 'Used'];
        $reasons = ['Overpayment', 'Return Item', 'Price Adjustment', 'Service Adjustment'];
        $invoices = DB::table('invoices')->get();

        foreach ($invoices->take(8) as $inv) {
            $invDate = Carbon::parse($inv->date);
            $cnNo = 'CN-' . date('Y') . '-' . str_pad((string) $inv->id, 6, '0', STR_PAD_LEFT);
            $status = $statuses[array_rand($statuses)];

            $totalAmount = (int) ($inv->total_amount * rand(5, 25) / 100);
            $usedAmount = match ($status) {
                'Used' => $totalAmount,
                'Partial' => (int) ($totalAmount * rand(10, 90) / 100),
                default => 0,
            };

            DB::table('credit_notes')->updateOrInsert(
                ['credit_note_no' => $cnNo],
                [
                    'date' => $invDate->copy()->addDays(rand(1, 7)),
                    'invoice_id' => $inv->id,
                    'invoice_no' => $inv->invoice_no,
                    'customer_id' => $inv->customer_id,
                    'customer_name' => $inv->customer_name,
                    'reason' => $reasons[array_rand($reasons)],
                    'total_amount' => $totalAmount,
                    'used_amount' => $usedAmount,
                    'status' => $status,
                    'expires_on' => $invDate->copy()->addYear(),
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
