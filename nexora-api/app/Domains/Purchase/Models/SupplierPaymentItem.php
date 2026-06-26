<?php

namespace App\Domains\Purchase\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SupplierPaymentItem extends Model
{
    use HasFactory;

    protected $table = 'supplier_payment_items';

    protected $fillable = [
        'supplier_payment_id', 'supplier_invoice_id', 'invoice_amount',
        'paid_amount', 'outstanding_before', 'outstanding_after', 'notes',
    ];

    protected $casts = [
        'invoice_amount' => 'decimal:2',
        'paid_amount' => 'decimal:2',
        'outstanding_before' => 'decimal:2',
        'outstanding_after' => 'decimal:2',
    ];

    public function supplierPayment()
    {
        return $this->belongsTo(SupplierPayment::class, 'supplier_payment_id');
    }

    public function supplierInvoice()
    {
        return $this->belongsTo(SupplierInvoice::class, 'supplier_invoice_id');
    }
}
