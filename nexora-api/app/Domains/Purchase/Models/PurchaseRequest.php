<?php

namespace App\Domains\Purchase\Models;

use App\Domains\User\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseRequest extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'purchase_requests';

    protected $fillable = [
        'pr_no', 'date', 'requested_by', 'department', 'description',
        'total_items', 'total_amount', 'status', 'priority', 'notes',
        'approved_by', 'approved_at', 'company_id', 'created_by', 'updated_by',
    ];

    protected $casts = [
        'date' => 'date',
        'approved_at' => 'datetime',
        'total_amount' => 'decimal:2',
    ];

    public function requester()
    {
        return $this->belongsTo(User::class, 'requested_by');
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
