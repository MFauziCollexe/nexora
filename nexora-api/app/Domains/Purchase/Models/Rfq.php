<?php

namespace App\Domains\Purchase\Models;

use App\Domains\User\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Rfq extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'rfqs';

    protected $fillable = [
        'rfq_no', 'date', 'title', 'description', 'supplier_id',
        'expected_delivery_date', 'closing_date', 'total_items', 'total_amount',
        'status', 'priority', 'notes', 'requested_by', 'approved_by',
        'approved_at', 'created_by', 'updated_by',
    ];

    protected $casts = [
        'date' => 'date',
        'expected_delivery_date' => 'date',
        'closing_date' => 'date',
        'approved_at' => 'datetime',
        'total_amount' => 'decimal:2',
    ];

    public function items()
    {
        return $this->hasMany(RfqItem::class, 'rfq_id');
    }

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
