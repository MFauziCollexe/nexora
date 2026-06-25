<?php

namespace App\Domains\Inventory\Models;

use Shared\Infrastructure\Persistence\Models\Traits\HasAudit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BinLocation extends Model
{
    use HasFactory, SoftDeletes, HasAudit;

    protected $fillable = [
        'code', 'name', 'warehouse_id', 'aisle', 'rack', 'shelf', 'bin',
        'max_capacity', 'capacity_uom', 'is_active', 'created_by', 'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'max_capacity' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }
}
