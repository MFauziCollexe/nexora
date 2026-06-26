<?php

namespace App\Domains\Purchase\Models;

use App\Domains\User\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseContract extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'purchase_contracts';

    protected $fillable = [
        'contract_no', 'date', 'start_date', 'end_date', 'supplier_id',
        'title', 'description', 'contract_value', 'status', 'payment_terms',
        'terms_and_conditions', 'notes', 'approved_by', 'approved_at',
        'created_by', 'updated_by',
    ];

    protected $casts = [
        'date' => 'date',
        'start_date' => 'date',
        'end_date' => 'date',
        'approved_at' => 'datetime',
        'contract_value' => 'decimal:2',
    ];

    public function items()
    {
        return $this->hasMany(PurchaseContractItem::class, 'purchase_contract_id');
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
