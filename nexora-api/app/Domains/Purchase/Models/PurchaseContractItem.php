<?php

namespace App\Domains\Purchase\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PurchaseContractItem extends Model
{
    use HasFactory;

    protected $table = 'purchase_contract_items';

    protected $fillable = [
        'purchase_contract_id', 'item_id', 'item_name', 'description',
        'quantity', 'unit_price', 'subtotal',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'unit_price' => 'decimal:2',
        'subtotal' => 'decimal:2',
    ];

    public function contract()
    {
        return $this->belongsTo(PurchaseContract::class, 'purchase_contract_id');
    }
}
