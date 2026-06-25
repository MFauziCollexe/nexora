<?php

namespace App\Domains\BusinessPartner\Models;

use Shared\Infrastructure\Persistence\Models\Traits\HasAudit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Customer extends Model
{
    use HasFactory, SoftDeletes, HasAudit;

    protected $fillable = [
        'code', 'name', 'email', 'phone', 'mobile', 'address', 'city', 'province',
        'postal_code', 'country', 'tax_id', 'payment_term_id', 'currency_id',
        'customer_group_id', 'credit_limit', 'status', 'company_id', 'created_by', 'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'credit_limit' => 'decimal:2',
        ];
    }

    public function group()
    {
        return $this->belongsTo(BusinessPartnerGroup::class, 'customer_group_id');
    }
}
