<?php

namespace App\Domains\Purchase\Models;

use App\Domains\User\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class SupplierInvoice extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'supplier_invoices';

    protected $fillable = [
        'invoice_no', 'date', 'due_date', 'supplier_id', 'purchase_order_id',
        'goods_receipt_id', 'supplier_invoice_ref', 'reference_number',
        'subtotal', 'tax_amount', 'tax_rate', 'discount_amount', 'total_amount',
        'amount_due', 'currency', 'description', 'status', 'payment_status',
        'notes', 'approved_by', 'approved_at', 'created_by', 'updated_by',
    ];

    protected $casts = [
        'date' => 'date',
        'due_date' => 'date',
        'approved_at' => 'datetime',
        'subtotal' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'tax_rate' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'amount_due' => 'decimal:2',
    ];

    public function items()
    {
        return $this->hasMany(SupplierInvoiceItem::class, 'supplier_invoice_id');
    }

    public function supplier()
    {
        return $this->belongsTo(\App\Domains\BusinessPartner\Models\Supplier::class, 'supplier_id');
    }

    public function purchaseOrder()
    {
        return $this->belongsTo(PurchaseOrder::class, 'purchase_order_id');
    }

    public function goodsReceipt()
    {
        return $this->belongsTo(GoodsReceipt::class, 'goods_receipt_id');
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
