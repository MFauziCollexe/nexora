<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DeliveryNoteSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();
        $statuses = ['Pending', 'In Process', 'Completed'];
        $deliveryOrders = DB::table('delivery_orders')->get();

        foreach ($deliveryOrders as $do) {
            $doDate = Carbon::parse($do->do_date);
            $dnNo = 'DN-' . date('Y') . '-' . str_pad((string) $do->id, 6, '0', STR_PAD_LEFT);
            $status = $statuses[array_rand($statuses)];

            DB::table('delivery_notes')->updateOrInsert(
                ['dn_no' => $dnNo],
                [
                    'dn_date' => $doDate->copy()->addDays(rand(0, 2)),
                    'delivery_order_id' => $do->id,
                    'do_no' => $do->do_no,
                    'customer_id' => $do->customer_id,
                    'customer_name' => $do->customer_name,
                    'delivery_date' => Carbon::parse($do->delivery_date),
                    'receiver' => ['Budi Santoso', 'Rizky Pratama', 'Diana Putri', 'Fauzi Rahman'][rand(0, 3)],
                    'status' => $status,
                    'total_amount' => $do->total_amount,
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
