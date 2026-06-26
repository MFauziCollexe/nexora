<?php

namespace App\Domains\Purchase\Models;

use App\Domains\User\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseOrder extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'purchase_orders';

    protected $fillable = [
        'po_no', 'date', 'supplier_id', 'rfq_id', 'title', 'description',
        'expected_delivery_date', 'total_items', 'subtotal', 'discount', 'tax',
        'total_amount', 'status', 'priority', 'notes', 'payment_terms',
        'shipping_method', 'requested_by', 'approved_by', 'approved_at',
        'created_by', 'updated_by',
    ];

    protected $casts = [
        'date' => 'date',
        'expected_delivery_date' => 'date',
        'approved_at' => 'datetime',
        'subtotal' => 'decimal:2',
        'discount' => 'decimal:2',
        'tax' => 'decimal:2',
        'total_amount' => 'decimal:2',
    ];

    public function items()
    {
        return $this->hasMany(PurchaseOrderItem::class, 'purchase_order_id');
    }

    public function supplier()
    {
        return $this->belongsTo(\App\Domains\BusinessPartner\Models\Supplier::class, 'supplier_id');
    }

    public function rfq()
    {
        return $this->belongsTo(Rfq::class, 'rfq_id');
    }

    public function requester()
    {
        return $this->belongsTo(User::class, 'requested_by');
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
