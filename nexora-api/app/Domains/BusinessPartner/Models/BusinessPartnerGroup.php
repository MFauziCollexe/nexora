<?php

namespace App\Domains\BusinessPartner\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BusinessPartnerGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'code', 'name', 'status',
    ];

    public function customers()
    {
        return $this->hasMany(Customer::class, 'business_partner_group_id');
    }
}
