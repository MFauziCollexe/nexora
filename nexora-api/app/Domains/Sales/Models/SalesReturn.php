<?php

namespace App\Domains\Sales\Models;

use App\Domains\BusinessPartner\Models\Customer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class SalesReturn extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'sales_returns';

    protected $fillable = [
        'return_no', 'return_date', 'invoice_id', 'invoice_no', 'customer_id', 'customer_name',
        'return_type', 'reason', 'total_amount', 'status', 'notes',
        'created_by', 'updated_by',
    ];

    protected $casts = [
        'return_date' => 'date',
        'total_amount' => 'decimal:2',
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
