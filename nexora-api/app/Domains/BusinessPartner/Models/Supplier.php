<?php

namespace App\Domains\BusinessPartner\Models;

use Shared\Infrastructure\Persistence\Models\Traits\HasAudit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Supplier extends Model
{
    use HasFactory, SoftDeletes, HasAudit;

    protected $fillable = [
        'code', 'name', 'email', 'phone', 'mobile', 'address', 'city', 'province',
        'postal_code', 'country', 'tax_id', 'supplier_type_id', 'supplier_category_id',
        'payment_term_id', 'currency_id', 'status', 'company_id', 'created_by', 'updated_by',
    ];

    public function type()
    {
        return $this->belongsTo(SupplierType::class);
    }

    public function category()
    {
        return $this->belongsTo(SupplierCategory::class, 'supplier_category_id');
    }
}
