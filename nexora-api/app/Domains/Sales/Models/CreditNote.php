<?php

namespace App\Domains\Sales\Models;

use App\Domains\BusinessPartner\Models\Customer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class CreditNote extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'credit_notes';

    protected $fillable = [
        'credit_note_no', 'date', 'invoice_id', 'invoice_no', 'customer_id', 'customer_name',
        'reason', 'total_amount', 'used_amount', 'status', 'expires_on', 'notes',
        'created_by', 'updated_by',
    ];

    protected $casts = [
        'date' => 'date',
        'expires_on' => 'date',
        'total_amount' => 'decimal:2',
        'used_amount' => 'decimal:2',
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
