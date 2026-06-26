<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SalesOrderSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();
        $soStatuses = ['Draft', 'Confirmed', 'Released', 'Delivered', 'Invoiced', 'Cancelled', 'Pending'];
        $customers = DB::table('customers')->get();
        if ($customers->isEmpty()) {
            $this->call(CustomerSeeder::class);
            $customers = DB::table('customers')->get();
        }

        for ($i = 11; $i <= 20; $i++) {
            $customer = $customers->random();
            $soDate = Carbon::now()->subDays(rand(1, 60));
            $status = $soStatuses[array_rand($soStatuses)];
            $soNo = 'SO-' . date('Y') . '-' . str_pad((string) $i, 6, '0', STR_PAD_LEFT);

            $itemCount = rand(1, 4);
            $total = 0;
            $items = [];
            for ($j = 1; $j <= $itemCount; $j++) {
                $qty = rand(1, 10);
                $price = rand(50000, 500000);
                $subtotal = $qty * $price;
                $total += $subtotal;
                $items[] = [
                    'item_name' => 'Item ' . chr(64 + $j) . '-' . $i,
                    'quantity' => $qty,
                    'unit_price' => $price,
                    'subtotal' => $subtotal,
                ];
            }

            DB::table('sales_orders')->updateOrInsert(
                ['so_no' => $soNo],
                [
                    'date' => $soDate,
                    'customer_id' => $customer->id,
                    'customer_name' => $customer->name,
                    'total_amount' => $total,
                    'status' => $status,
                    'warehouse' => ['WH01 - Cold Storage 01', 'WH02 - Dry Storage 01', 'WH03 - Ambient 01'][rand(0, 2)],
                    'notes' => rand(0, 1) ? 'Auto-generated sales order' : null,
                    'sales_person_id' => [1, 2][rand(0, 1)],
                    'created_by' => 1,
                    'updated_by' => 1,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]
            );

            $soId = DB::table('sales_orders')->where('so_no', $soNo)->value('id');
            DB::table('sales_order_items')->where('sales_order_id', $soId)->delete();
            foreach ($items as $item) {
                DB::table('sales_order_items')->insert(array_merge($item, [
                    'sales_order_id' => $soId,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]));
            }
        }
    }
}
