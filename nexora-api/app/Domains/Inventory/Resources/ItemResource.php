<?php

namespace App\Domains\Inventory\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'barcode' => $this->barcode,
            'name' => $this->name,
            'description' => $this->description,
            'category_id' => $this->category_id,
            'category_name' => $this->category?->name,
            'brand_id' => $this->brand_id,
            'brand_name' => $this->brand?->name,
            'item_type_id' => $this->item_type_id,
            'type_name' => $this->type?->name,
            'uom_id' => $this->uom_id,
            'uom_name' => $this->uom?->name,
            'unit_price' => (float) $this->unit_price,
            'cost_price' => (float) $this->cost_price,
            'min_stock' => (float) $this->min_stock,
            'max_stock' => (float) $this->max_stock,
            'reorder_point' => (float) $this->reorder_point,
            'status' => $this->status,
            'is_stockable' => $this->is_stockable,
            'is_purchasable' => $this->is_purchasable,
            'is_sellable' => $this->is_sellable,
            'image' => $this->image,
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}