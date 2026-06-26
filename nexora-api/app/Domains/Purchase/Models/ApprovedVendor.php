<?php

namespace App\Domains\Purchase\Models;

use App\Domains\User\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class ApprovedVendor extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'approved_vendors';

    protected $fillable = [
        'supplier_id', 'vendor_code', 'category', 'certification',
        'approval_status', 'approval_date', 'expiry_date', 'last_review_date',
        'next_review_date', 'scope_of_supply', 'notes', 'approved_by',
        'approved_at', 'created_by', 'updated_by',
    ];

    protected $casts = [
        'approval_date' => 'date',
        'expiry_date' => 'date',
        'last_review_date' => 'date',
        'next_review_date' => 'date',
        'approved_at' => 'datetime',
    ];

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
