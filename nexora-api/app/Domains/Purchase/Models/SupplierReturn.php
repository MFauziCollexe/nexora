<?php

namespace App\Domains\Purchase\Models;

use App\Domains\User\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class SupplierReturn extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'supplier_returns';

    protected $fillable = [
        'sr_no', 'date', 'purchase_order_id', 'goods_receipt_id', 'supplier_id',
        'warehouse_id', 'reference_number', 'reason', 'total_items', 'total_quantity',
        'total_amount', 'status', 'notes', 'returned_by', 'approved_by',
        'created_by', 'updated_by',
    ];

    protected $casts = [
        'date' => 'date',
        'total_amount' => 'decimal:2',
    ];

    public function items()
    {
        return $this->hasMany(SupplierReturnItem::class, 'supplier_return_id');
    }

    public function purchaseOrder()
    {
        return $this->belongsTo(PurchaseOrder::class, 'purchase_order_id');
    }

    public function goodsReceipt()
    {
        return $this->belongsTo(GoodsReceipt::class, 'goods_receipt_id');
    }

    public function supplier()
    {
        return $this->belongsTo(\App\Domains\BusinessPartner\Models\Supplier::class, 'supplier_id');
    }

    public function warehouse()
    {
        return $this->belongsTo(\App\Domains\Inventory\Models\Warehouse::class, 'warehouse_id');
    }

    public function returnedBy()
    {
        return $this->belongsTo(User::class, 'returned_by');
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
