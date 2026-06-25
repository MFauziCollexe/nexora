<?php

namespace App\Domains\Finance\Models;

use Shared\Infrastructure\Persistence\Models\Traits\HasAudit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ExchangeRate extends Model
{
    use HasFactory, SoftDeletes, HasAudit;

    protected $fillable = [
        'from_currency', 'to_currency', 'rate', 'effective_date', 'created_by', 'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'rate' => 'decimal:6',
            'effective_date' => 'date',
        ];
    }
}
