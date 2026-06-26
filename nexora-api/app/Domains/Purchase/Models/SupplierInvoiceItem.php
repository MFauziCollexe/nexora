<?php

namespace App\Domains\Purchase\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SupplierInvoiceItem extends Model
{
    use HasFactory;

    protected $table = 'supplier_invoice_items';

    protected $fillable = [
        'supplier_invoice_id', 'purchase_order_item_id', 'goods_receipt_item_id',
        'item_id', 'item_name', 'quantity', 'unit_price', 'tax_rate', 'tax_amount',
        'discount_percent', 'discount_amount', 'total_price', 'unit', 'notes',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'unit_price' => 'decimal:2',
        'tax_rate' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'discount_percent' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'total_price' => 'decimal:2',
    ];

    public function supplierInvoice()
    {
        return $this->belongsTo(SupplierInvoice::class, 'supplier_invoice_id');
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
