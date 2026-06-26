<?php

namespace App\Domains\Sales\Models;

use App\Domains\BusinessPartner\Models\Customer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'invoices';

    protected $fillable = [
        'invoice_no', 'date', 'due_date', 'customer_id', 'customer_name',
        'sales_order_id', 'so_no', 'total_amount', 'paid_amount',
        'outstanding', 'status', 'notes', 'created_by', 'updated_by',
    ];

    protected $casts = [
        'date' => 'date',
        'due_date' => 'date',
        'total_amount' => 'decimal:2',
        'paid_amount' => 'decimal:2',
        'outstanding' => 'decimal:2',
    ];

    public function items()
    {
        return $this->hasMany(InvoiceItem::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function salesOrder()
    {
        return $this->belongsTo(SalesOrder::class);
    }
}
