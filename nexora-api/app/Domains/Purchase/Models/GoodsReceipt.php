<?php

namespace App\Domains\Purchase\Models;

use App\Domains\User\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class GoodsReceipt extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'goods_receipts';

    protected $fillable = [
        'gr_no', 'date', 'purchase_order_id', 'supplier_id', 'warehouse_id',
        'reference_number', 'description', 'total_items', 'total_quantity',
        'status', 'notes', 'received_by', 'created_by', 'updated_by',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function items()
    {
        return $this->hasMany(GoodsReceiptItem::class, 'goods_receipt_id');
    }

    public function purchaseOrder()
    {
        return $this->belongsTo(PurchaseOrder::class, 'purchase_order_id');
    }

    public function supplier()
    {
        return $this->belongsTo(\App\Domains\BusinessPartner\Models\Supplier::class, 'supplier_id');
    }

    public function warehouse()
    {
        return $this->belongsTo(\App\Domains\Inventory\Models\Warehouse::class, 'warehouse_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'received_by');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
