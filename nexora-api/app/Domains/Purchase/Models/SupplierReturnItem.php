<?php

namespace App\Domains\Purchase\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SupplierReturnItem extends Model
{
    use HasFactory;

    protected $table = 'supplier_return_items';

    protected $fillable = [
        'supplier_return_id', 'purchase_order_item_id', 'goods_receipt_item_id',
        'item_id', 'item_name', 'quantity_returned', 'unit_price', 'total_price',
        'unit', 'return_reason', 'notes',
    ];

    protected $casts = [
        'quantity_returned' => 'integer',
        'unit_price' => 'decimal:2',
        'total_price' => 'decimal:2',
    ];

    public function supplierReturn()
    {
        return $this->belongsTo(SupplierReturn::class, 'supplier_return_id');
    }

    public function purchaseOrderItem()
    {
        return $this->belongsTo(PurchaseOrderItem::class, 'purchase_order_item_id');
    }

    public function goodsReceiptItem()
    {
        return $this->belongsTo(GoodsReceiptItem::class, 'goods_receipt_item_id');
    }
}
