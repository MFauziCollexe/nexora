<?php

namespace App\Domains\Inventory\Models;

use Shared\Infrastructure\Persistence\Models\Traits\HasAudit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Item extends Model
{
    use HasFactory, SoftDeletes, HasAudit;

    protected $fillable = [
        'code', 'barcode', 'name', 'description', 'category_id', 'brand_id',
        'item_group_id', 'item_type_id', 'uom_id', 'unit_price', 'cost_price',
        'min_stock', 'max_stock', 'reorder_point', 'status', 'is_stockable',
        'is_purchasable', 'is_sellable', 'image', 'notes', 'company_id',
        'created_by', 'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'unit_price' => 'decimal:2',
            'cost_price' => 'decimal:2',
            'min_stock' => 'decimal:2',
            'max_stock' => 'decimal:2',
            'reorder_point' => 'decimal:2',
            'is_stockable' => 'boolean',
            'is_purchasable' => 'boolean',
            'is_sellable' => 'boolean',
        ];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function group()
    {
        return $this->belongsTo(ItemGroup::class, 'item_group_id');
    }

    public function type()
    {
        return $this->belongsTo(ItemType::class, 'item_type_id');
    }

    public function uom()
    {
        return $this->belongsTo(Uom::class);
    }
}
