<?php

namespace App\Domains\Sales\Models;

use App\Domains\BusinessPartner\Models\Customer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class DeliveryNote extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'delivery_notes';

    protected $fillable = [
        'dn_no', 'dn_date', 'delivery_order_id', 'do_no', 'customer_id', 'customer_name',
        'delivery_date', 'receiver', 'status', 'total_amount', 'notes',
        'created_by', 'updated_by',
    ];

    protected $casts = [
        'dn_date' => 'date',
        'delivery_date' => 'date',
        'total_amount' => 'decimal:2',
    ];

    public function deliveryOrder()
    {
        return $this->belongsTo(DeliveryOrder::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
