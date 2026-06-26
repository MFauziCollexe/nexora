<?php

namespace App\Domains\Inventory\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SerialNumberResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'serial_number' => $this->serial_number,
            'item_id' => $this->item_id,
            'item_name' => $this->whenLoaded('item', fn() => $this->item->name),
            'batch_lot_id' => $this->batch_lot_id,
            'status' => $this->status,
            'warehouse' => $this->warehouse,
            'purchase_date' => $this->purchase_date?->format('Y-m-d'),
            'warranty_expiry' => $this->warranty_expiry?->format('Y-m-d'),
            'notes' => $this->notes,
            'is_active' => $this->is_active,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
