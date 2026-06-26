<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DeliveryOrderSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();
        $statuses = ['Pending', 'In Delivery', 'Completed', 'Cancelled'];
        $types = ['Own Fleet', 'External'];
        $salesOrders = DB::table('sales_orders')->whereIn('status', ['Confirmed', 'Released', 'Delivered', 'Invoiced'])->get();

        foreach ($salesOrders as $so) {
            $soDate = Carbon::parse($so->date);
            $doNo = 'DO-' . date('Y') . '-' . str_pad((string) $so->id, 6, '0', STR_PAD_LEFT);
            $status = $statuses[array_rand($statuses)];

            DB::table('delivery_orders')->updateOrInsert(
                ['do_no' => $doNo],
                [
                    'do_date' => $soDate->copy()->addDays(rand(1, 3)),
                    'sales_order_id' => $so->id,
                    'so_no' => $so->so_no,
                    'customer_id' => $so->customer_id,
                    'customer_name' => $so->customer_name,
                    'warehouse' => $so->warehouse,
                    'delivery_date' => $soDate->copy()->addDays(rand(3, 7)),
                    'status' => $status,
                    'delivery_type' => $types[array_rand($types)],
                    'total_amount' => $so->total_amount,
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
