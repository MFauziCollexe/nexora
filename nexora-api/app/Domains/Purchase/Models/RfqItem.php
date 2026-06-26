<?php

namespace App\Domains\Purchase\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RfqItem extends Model
{
    use HasFactory;

    protected $table = 'rfq_items';

    protected $fillable = [
        'rfq_id', 'item_id', 'item_name', 'description', 'quantity',
        'unit', 'estimated_unit_price', 'subtotal', 'notes',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'estimated_unit_price' => 'decimal:2',
        'subtotal' => 'decimal:2',
    ];

    public function rfq()
    {
        return $this->belongsTo(Rfq::class, 'rfq_id');
    }
}
