<?php

namespace App\Domains\BusinessPartner\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SupplierCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'code', 'name', 'status',
    ];

    public function suppliers()
    {
        return $this->hasMany(Supplier::class);
    }
}
