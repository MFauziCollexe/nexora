<?php

namespace App\Domains\Asset\Models;

use Shared\Infrastructure\Persistence\Models\Traits\HasAudit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AssetCategory extends Model
{
    use HasFactory, SoftDeletes, HasAudit;

    protected $fillable = [
        'code', 'name', 'description', 'useful_life_years', 'depreciation_method',
        'salvage_value_percentage', 'is_active', 'created_by', 'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'useful_life_years' => 'decimal:2',
            'salvage_value_percentage' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function assets()
    {
        return $this->hasMany(Asset::class, 'asset_category_id');
    }
}
