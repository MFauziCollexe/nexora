<?php

namespace App\Domains\Finance\Models;

use Shared\Infrastructure\Persistence\Models\Traits\HasAudit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BankAccount extends Model
{
    use HasFactory, SoftDeletes, HasAudit;

    protected $fillable = [
        'code', 'bank_name', 'account_name', 'account_number', 'currency_code',
        'description', 'is_active', 'company_id', 'created_by', 'updated_by',
    ];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }
}
