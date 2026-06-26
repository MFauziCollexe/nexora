<?php

namespace App\Domains\Purchase\Models;

use App\Domains\User\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class SupplierPayment extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'supplier_payments';

    protected $fillable = [
        'payment_no', 'date', 'supplier_id', 'amount', 'paid_amount',
        'currency', 'payment_method', 'bank_name', 'bank_account',
        'reference_number', 'payment_date', 'description', 'status',
        'notes', 'approved_by', 'approved_at', 'created_by', 'updated_by',
    ];

    protected $casts = [
        'date' => 'date',
        'payment_date' => 'date',
        'approved_at' => 'datetime',
        'amount' => 'decimal:2',
        'paid_amount' => 'decimal:2',
    ];

    public function items()
    {
        return $this->hasMany(SupplierPaymentItem::class, 'supplier_payment_id');
    }

    public function supplier()
    {
        return $this->belongsTo(\App\Domains\BusinessPartner\Models\Supplier::class, 'supplier_id');
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
