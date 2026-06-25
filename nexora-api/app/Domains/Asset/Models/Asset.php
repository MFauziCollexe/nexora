<?php

namespace App\Domains\Asset\Models;

use Shared\Infrastructure\Persistence\Models\Traits\HasAudit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Asset extends Model
{
    use HasFactory, SoftDeletes, HasAudit;

    protected $fillable = [
        'code', 'name', 'description', 'asset_category_id', 'asset_location_id',
        'asset_status_id', 'purchase_date', 'purchase_cost', 'current_value',
        'salvage_value', 'useful_life_years', 'depreciation_method',
        'depreciation_start_date', 'serial_number', 'model', 'manufacturer',
        'supplier_id', 'responsible_employee_id', 'status', 'image', 'notes',
        'company_id', 'created_by', 'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'purchase_date' => 'date',
            'depreciation_start_date' => 'date',
            'purchase_cost' => 'decimal:2',
            'current_value' => 'decimal:2',
            'salvage_value' => 'decimal:2',
            'useful_life_years' => 'decimal:2',
        ];
    }

    public function category()
    {
        return $this->belongsTo(AssetCategory::class, 'asset_category_id');
    }

    public function location()
    {
        return $this->belongsTo(AssetLocation::class, 'asset_location_id');
    }

    public function status()
    {
        return $this->belongsTo(AssetStatus::class, 'asset_status_id');
    }
}
