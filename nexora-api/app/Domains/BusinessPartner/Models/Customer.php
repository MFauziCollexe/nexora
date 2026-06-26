<?php

namespace App\Domains\BusinessPartner\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'code', 'name', 'payment_term_id', 'currency_id',
        'business_partner_group_id', 'status',
    ];

    public function group()
    {
        return $this->belongsTo(BusinessPartnerGroup::class, 'business_partner_group_id');
    }
}
