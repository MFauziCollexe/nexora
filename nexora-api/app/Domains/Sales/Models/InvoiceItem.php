<?php

namespace App\Domains\Sales\Models;

use App\Domains\Inventory\Models\Item;
use Illuminate\Database\Eloquent\Model;

class InvoiceItem extends Model
{
    protected $table = 'invoice_items';

    protected $fillable = [
        'invoice_id', 'item_id', 'item_name',
        'quantity', 'unit_price', 'subtotal',
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
