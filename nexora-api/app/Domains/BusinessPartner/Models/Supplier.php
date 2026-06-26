<?php

namespace App\Domains\BusinessPartner\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'code', 'name', 'supplier_type_id', 'supplier_category_id', 'status',
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
