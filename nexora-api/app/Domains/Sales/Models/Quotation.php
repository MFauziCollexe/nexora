<?php

namespace App\Domains\Sales\Models;

use App\Domains\BusinessPartner\Models\Customer;
use App\Domains\User\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Quotation extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'quotations';

    protected $fillable = [
        'quotation_no', 'date', 'customer_id', 'customer_name',
        'total_amount', 'status', 'valid_until', 'sales_person_id',
        'notes', 'attachments', 'created_by', 'updated_by',
    ];

    protected $casts = [
        'date' => 'date',
        'valid_until' => 'date',
        'total_amount' => 'decimal:2',
        'attachments' => 'array',
    ];

    public function items()
    {
        return $this->hasMany(QuotationItem::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function salesPerson()
    {
        return $this->belongsTo(User::class, 'sales_person_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function salesOrder()
    {
        return $this->hasOne(SalesOrder::class, 'quotation_id');
    }
}
