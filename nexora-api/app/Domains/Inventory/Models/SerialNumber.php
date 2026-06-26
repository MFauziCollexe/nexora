<?php

namespace App\Domains\Inventory\Models;

use Shared\Infrastructure\Persistence\Models\Traits\HasAudit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SerialNumber extends Model
{
    use HasFactory, SoftDeletes, HasAudit;

    protected $table = 'serial_numbers';

    protected $fillable = [
        'serial_number', 'item_id', 'batch_lot_id', 'status',
        'warehouse', 'purchase_date', 'warranty_expiry', 'notes',
        'is_active', 'company_id', 'created_by', 'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'purchase_date' => 'date',
            'warranty_expiry' => 'date',
            'is_active' => 'boolean',
        ];
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }

}
