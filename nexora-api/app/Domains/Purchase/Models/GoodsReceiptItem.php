<?php

namespace App\Domains\Purchase\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GoodsReceiptItem extends Model
{
    use HasFactory;

    protected $table = 'goods_receipt_items';

    protected $fillable = [
        'goods_receipt_id', 'purchase_order_item_id', 'item_id', 'item_name',
        'quantity_ordered', 'quantity_received', 'quantity_accepted',
        'quantity_rejected', 'unit', 'notes',
    ];

    protected $casts = [
        'quantity_ordered' => 'integer',
        'quantity_received' => 'integer',
        'quantity_accepted' => 'integer',
        'quantity_rejected' => 'integer',
    ];

    public function goodsReceipt()
    {
        return $this->belongsTo(GoodsReceipt::class, 'goods_receipt_id');
    }

    public function purchaseOrderItem()
    {
        return $this->belongsTo(PurchaseOrderItem::class, 'purchase_order_item_id');
    }
}
