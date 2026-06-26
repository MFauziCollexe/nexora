<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $uoms = [
            ['code' => 'PCS', 'name' => 'Pieces'],
            ['code' => 'PAL', 'name' => 'Pallet'],
            ['code' => 'BOX', 'name' => 'Box'],
            ['code' => 'KG',  'name' => 'Kilogram'],
            ['code' => 'LTR', 'name' => 'Liter'],
            ['code' => 'MTR', 'name' => 'Meter'],
            ['code' => 'CTN', 'name' => 'Carton'],
            ['code' => 'DRM', 'name' => 'Drum'],
            ['code' => 'BAG', 'name' => 'Bag'],
            ['code' => 'UNT', 'name' => 'Unit'],
        ];
        foreach ($uoms as $u) {
            DB::table('uoms')->updateOrInsert(
                ['code' => $u['code']],
                ['name' => $u['name'], 'is_active' => true, 'created_at' => $now, 'updated_at' => $now]
            );
        }

        $itemTypes = [
            ['code' => 'RAW',   'name' => 'Raw Material'],
            ['code' => 'WIP',   'name' => 'Work in Process'],
            ['code' => 'FG',    'name' => 'Finished Goods'],
            ['code' => 'SVC',   'name' => 'Service'],
            ['code' => 'SUP',   'name' => 'Supply'],
        ];
        foreach ($itemTypes as $t) {
            DB::table('item_types')->updateOrInsert(
                ['code' => $t['code']],
                ['name' => $t['name'], 'is_active' => true, 'created_at' => $now, 'updated_at' => $now]
            );
        }

        $categories = [
            ['code' => 'FOOD',    'name' => 'Food & Beverage'],
            ['code' => 'COLD',    'name' => 'Cold Storage'],
            ['code' => 'DRY',     'name' => 'Dry Storage'],
            ['code' => 'CHEM',    'name' => 'Chemical'],
            ['code' => 'PHARMA',  'name' => 'Pharmaceutical'],
            ['code' => 'SVC',     'name' => 'Service'],
        ];
        foreach ($categories as $c) {
            DB::table('categories')->updateOrInsert(
                ['code' => $c['code']],
                ['name' => $c['name'], 'is_active' => true, 'created_at' => $now, 'updated_at' => $now]
            );
        }

        $palUomId = DB::table('uoms')->where('code', 'PAL')->value('id');
        $pcsUomId = DB::table('uoms')->where('code', 'PCS')->value('id');
        $boxUomId = DB::table('uoms')->where('code', 'BOX')->value('id');
        $kgUomId  = DB::table('uoms')->where('code', 'KG')->value('id');
        $ltrUomId = DB::table('uoms')->where('code', 'LTR')->value('id');
        $svcTypeId = DB::table('item_types')->where('code', 'SVC')->value('id');
        $fgTypeId  = DB::table('item_types')->where('code', 'FG')->value('id');
        $coldCatId = DB::table('categories')->where('code', 'COLD')->value('id');
        $foodCatId = DB::table('categories')->where('code', 'FOOD')->value('id');
        $dryCatId  = DB::table('categories')->where('code', 'DRY')->value('id');
        $svcCatId  = DB::table('categories')->where('code', 'SVC')->value('id');

        $items = [
            ['code' => 'SRV-001', 'name' => 'Frozen Storage',        'description' => 'Cold storage -20°C per pallet per day',            'item_type_id' => $svcTypeId, 'category_id' => $svcCatId, 'uom_id' => $palUomId, 'unit_price' => 150000],
            ['code' => 'SRV-002', 'name' => 'Handling In',           'description' => 'Receiving and handling in per pallet',              'item_type_id' => $svcTypeId, 'category_id' => $svcCatId, 'uom_id' => $palUomId, 'unit_price' => 10000],
            ['code' => 'SRV-003', 'name' => 'Handling Out',          'description' => 'Handling out and delivery per pallet',              'item_type_id' => $svcTypeId, 'category_id' => $svcCatId, 'uom_id' => $palUomId, 'unit_price' => 10000],
            ['code' => 'SRV-004', 'name' => 'Chilled Storage',       'description' => 'Chilled storage 2-8°C per pallet per day',           'item_type_id' => $svcTypeId, 'category_id' => $svcCatId, 'uom_id' => $palUomId, 'unit_price' => 200000],
            ['code' => 'SRV-005', 'name' => 'Ambient Storage',       'description' => 'Ambient storage per pallet per day',                 'item_type_id' => $svcTypeId, 'category_id' => $svcCatId, 'uom_id' => $palUomId, 'unit_price' => 100000],
            ['code' => 'SRV-006', 'name' => 'Pick and Pack',         'description' => 'Order picking and packing per order',               'item_type_id' => $svcTypeId, 'category_id' => $svcCatId, 'uom_id' => $pcsUomId, 'unit_price' => 25000],
            ['code' => 'SRV-007', 'name' => 'Cross Docking',         'description' => 'Cross docking service per pallet',                  'item_type_id' => $svcTypeId, 'category_id' => $svcCatId, 'uom_id' => $palUomId, 'unit_price' => 50000],
            ['code' => 'SRV-008', 'name' => 'Inventory Reporting',   'description' => 'Monthly inventory report',                          'item_type_id' => $svcTypeId, 'category_id' => $svcCatId, 'uom_id' => $pcsUomId, 'unit_price' => 750000],
            ['code' => 'SRV-009', 'name' => 'Quality Inspection',    'description' => 'Quality check per pallet',                          'item_type_id' => $svcTypeId, 'category_id' => $svcCatId, 'uom_id' => $palUomId, 'unit_price' => 35000],
            ['code' => 'SRV-010', 'name' => 'Re-packing Service',    'description' => 'Re-packing and re-labeling per unit',               'item_type_id' => $svcTypeId, 'category_id' => $svcCatId, 'uom_id' => $pcsUomId, 'unit_price' => 5000],
            ['code' => 'ITM-001', 'name' => 'Frozen Chicken',        'description' => 'Bone-in frozen chicken 10kg box',                   'item_type_id' => $fgTypeId,  'category_id' => $coldCatId, 'uom_id' => $boxUomId, 'unit_price' => 250000],
            ['code' => 'ITM-002', 'name' => 'Frozen Fish Fillet',    'description' => 'Frozen dory fish fillet 5kg pack',                   'item_type_id' => $fgTypeId,  'category_id' => $coldCatId, 'uom_id' => $boxUomId, 'unit_price' => 180000],
            ['code' => 'ITM-003', 'name' => 'Ice Cream Premium',     'description' => 'Premium vanilla ice cream 4L',                       'item_type_id' => $fgTypeId,  'category_id' => $coldCatId, 'uom_id' => $ltrUomId, 'unit_price' => 85000],
            ['code' => 'ITM-004', 'name' => 'Frozen Vegetables',     'description' => 'Mixed frozen vegetables 1kg',                       'item_type_id' => $fgTypeId,  'category_id' => $coldCatId, 'uom_id' => $kgUomId,  'unit_price' => 35000],
            ['code' => 'ITM-005', 'name' => 'Frozen Dough',          'description' => 'Pre-proofed frozen dough 500g',                     'item_type_id' => $fgTypeId,  'category_id' => $coldCatId, 'uom_id' => $kgUomId,  'unit_price' => 28000],
            ['code' => 'ITM-006', 'name' => 'Chilled Milk',          'description' => 'Fresh UHT milk 1L',                                 'item_type_id' => $fgTypeId,  'category_id' => $foodCatId, 'uom_id' => $ltrUomId, 'unit_price' => 18000],
            ['code' => 'ITM-007', 'name' => 'Cheese Block',          'description' => 'Cheddar cheese block 2kg',                          'item_type_id' => $fgTypeId,  'category_id' => $coldCatId, 'uom_id' => $kgUomId,  'unit_price' => 120000],
            ['code' => 'ITM-008', 'name' => 'Butter Unsalted',       'description' => 'Unsalted butter 1kg block',                         'item_type_id' => $fgTypeId,  'category_id' => $coldCatId, 'uom_id' => $kgUomId,  'unit_price' => 45000],
            ['code' => 'ITM-009', 'name' => 'Frozen Shrimp',         'description' => 'Peeled frozen shrimp 1kg',                          'item_type_id' => $fgTypeId,  'category_id' => $coldCatId, 'uom_id' => $kgUomId,  'unit_price' => 95000],
            ['code' => 'ITM-010', 'name' => 'Dry Noodle',            'description' => 'Instant dry noodle 85g x 40 pack',                  'item_type_id' => $fgTypeId,  'category_id' => $dryCatId,  'uom_id' => $boxUomId, 'unit_price' => 120000],
        ];

        foreach ($items as $item) {
            DB::table('items')->updateOrInsert(
                ['code' => $item['code']],
                array_merge($item, [
                    'status' => 'active',
                    'is_stockable' => $item['category_id'] !== $svcCatId,
                    'is_purchasable' => true,
                    'is_sellable' => true,
                    'cost_price' => $item['unit_price'] * 0.7,
                    'min_stock' => 0,
                    'max_stock' => 1000,
                    'reorder_point' => 10,
                    'created_by' => 1,
                    'updated_by' => 1,
                    'created_at' => $now,
                    'updated_at' => $now,
                ])
            );
        }
    }
}
