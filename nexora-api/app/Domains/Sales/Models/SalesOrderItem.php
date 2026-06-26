<?php

namespace App\Domains\Sales\Models;

use App\Domains\Inventory\Models\Item;
use Illuminate\Database\Eloquent\Model;

class SalesOrderItem extends Model
{
    protected $table = 'sales_order_items';

    protected $fillable = [
        'sales_order_id', 'item_id', 'item_name',
        'quantity', 'unit_price', 'subtotal',
    ];

    public function salesOrder()
    {
        return $this->belongsTo(SalesOrder::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
