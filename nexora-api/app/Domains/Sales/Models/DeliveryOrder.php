<?php

namespace App\Domains\Sales\Models;

use App\Domains\BusinessPartner\Models\Customer;
use App\Domains\User\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class DeliveryOrder extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'delivery_orders';

    protected $fillable = [
        'do_no', 'do_date', 'sales_order_id', 'so_no', 'customer_id', 'customer_name',
        'warehouse', 'delivery_date', 'status', 'delivery_type', 'total_amount',
        'notes', 'created_by', 'updated_by',
    ];

    protected $casts = [
        'do_date' => 'date',
        'delivery_date' => 'date',
        'total_amount' => 'decimal:2',
    ];

    public function salesOrder()
    {
        return $this->belongsTo(SalesOrder::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
