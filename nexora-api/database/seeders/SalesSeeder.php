<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SalesSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();
        // Ensure customers exist
        $customerData = [
            ['id' => 1, 'name' => 'PT Maju Sejahtera'],
            ['id' => 2, 'name' => 'CV Karya Mandiri'],
            ['id' => 3, 'name' => 'UD Berkah Abadi'],
        ];
        foreach ($customerData as $c) {
            DB::table('customers')->updateOrInsert(
                ['id' => $c['id']],
                ['name' => $c['name'], 'code' => 'CUST-' . str_pad($c['id'], 3, '0', STR_PAD_LEFT), 'status' => 'active', 'created_at' => $now, 'updated_at' => $now]
            );
        }
        $customers = $customerData;
        $salesPersonIds = [1, 2];

        // Quotations
        $quotationStatuses = ['Draft', 'Sent', 'Open', 'Expired', 'Converted', 'Cancelled'];
        for ($i = 1; $i <= 10; $i++) {
            $customer = $customers[array_rand($customers)];
            $qtDate = Carbon::now()->subDays(rand(1, 60));
            $status = $quotationStatuses[array_rand($quotationStatuses)];
            $qtNo = 'QT-' . date('Y') . '-' . str_pad((string) $i, 6, '0', STR_PAD_LEFT);

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

            DB::table('quotations')->updateOrInsert(
                ['quotation_no' => $qtNo],
                [
                    'date' => $qtDate,
                    'customer_id' => $customer['id'],
                    'customer_name' => $customer['name'],
                    'total_amount' => $total,
                    'status' => $status,
                    'valid_until' => $qtDate->copy()->addDays(14),
                    'sales_person_id' => $salesPersonIds[array_rand($salesPersonIds)],
                    'created_by' => 1,
                    'updated_by' => 1,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]
            );

            $qtId = DB::table('quotations')->where('quotation_no', $qtNo)->value('id');
            DB::table('quotation_items')->where('quotation_id', $qtId)->delete();
            foreach ($items as $item) {
                DB::table('quotation_items')->insert(array_merge($item, [
                    'quotation_id' => $qtId,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]));
            }
        }
        $soStatuses = ['Draft', 'Confirmed', 'Delivered', 'Invoiced', 'Cancelled'];
        $invStatuses = ['Unpaid', 'Partial', 'Paid', 'Overdue'];

        // Sales orders
        for ($i = 1; $i <= 10; $i++) {
            $customer = $customers[array_rand($customers)];
            $soDate = Carbon::now()->subDays(rand(1, 90));
            $status = $soStatuses[array_rand($soStatuses)];
            $soNo = 'SO-' . str_pad($i, 5, '0', STR_PAD_LEFT);

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
                    'customer_id' => $customer['id'],
                    'customer_name' => $customer['name'],
                    'total_amount' => $total,
                    'status' => $status,
                    'sales_person_id' => $salesPersonIds[array_rand($salesPersonIds)],
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

            // Invoice for confirmed/delivered/invoiced orders
            if (in_array($status, ['Confirmed', 'Delivered', 'Invoiced'])) {
                $invStatus = $invStatuses[array_rand($invStatuses)];
                $invNo = 'INV-' . str_pad($i, 5, '0', STR_PAD_LEFT);
                $paidAmount = match ($invStatus) {
                    'Paid' => $total,
                    'Partial' => (int) ($total * rand(10, 90) / 100),
                    default => 0,
                };

                DB::table('invoices')->updateOrInsert(
                    ['invoice_no' => $invNo],
                    [
                        'date' => $soDate->copy()->addDays(rand(1, 7)),
                        'due_date' => $soDate->copy()->addDays(rand(14, 30)),
                        'customer_id' => $customer['id'],
                        'customer_name' => $customer['name'],
                        'sales_order_id' => $soId,
                        'so_no' => $soNo,
                        'total_amount' => $total,
                        'paid_amount' => $paidAmount,
                        'outstanding' => $total - $paidAmount,
                        'status' => $invStatus,
                        'created_by' => 1,
                        'updated_by' => 1,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ]
                );

                $invId = DB::table('invoices')->where('invoice_no', $invNo)->value('id');
                DB::table('invoice_items')->where('invoice_id', $invId)->delete();
                foreach ($items as $item) {
                    DB::table('invoice_items')->insert(array_merge($item, [
                        'invoice_id' => $invId,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ]));
                }
            }
        }

        // Extra invoices without SO
        for ($i = 11; $i <= 15; $i++) {
            $customer = $customers[array_rand($customers)];
            $invDate = Carbon::now()->subDays(rand(1, 90));
            $invStatus = $invStatuses[array_rand($invStatuses)];
            $invNo = 'INV-' . str_pad($i, 5, '0', STR_PAD_LEFT);

            $itemCount = rand(1, 3);
            $total = 0;
            $items = [];
            for ($j = 1; $j <= $itemCount; $j++) {
                $qty = rand(1, 10);
                $price = rand(50000, 500000);
                $subtotal = $qty * $price;
                $total += $subtotal;
                $items[] = [
                    'item_name' => 'Item Direct-' . chr(64 + $j) . '-' . $i,
                    'quantity' => $qty,
                    'unit_price' => $price,
                    'subtotal' => $subtotal,
                ];
            }

            $paidAmount = match ($invStatus) {
                'Paid' => $total,
                'Partial' => (int) ($total * rand(10, 90) / 100),
                default => 0,
            };

            DB::table('invoices')->updateOrInsert(
                ['invoice_no' => $invNo],
                [
                    'date' => $invDate,
                    'due_date' => $invDate->copy()->addDays(rand(14, 30)),
                    'customer_id' => $customer['id'],
                    'customer_name' => $customer['name'],
                    'total_amount' => $total,
                    'paid_amount' => $paidAmount,
                    'outstanding' => $total - $paidAmount,
                    'status' => $invStatus,
                    'created_by' => 1,
                    'updated_by' => 1,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]
            );

            $invId = DB::table('invoices')->where('invoice_no', $invNo)->value('id');
            DB::table('invoice_items')->where('invoice_id', $invId)->delete();
            foreach ($items as $item) {
                DB::table('invoice_items')->insert(array_merge($item, [
                    'invoice_id' => $invId,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]));
            }
        }
    }
}
