<?php

namespace App\Domains\Purchase\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseOrderItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'purchase_order_id' => $this->purchase_order_id,
            'item_id' => $this->item_id,
            'item_name' => $this->item_name,
            'description' => $this->description,
            'quantity' => $this->quantity,
            'received_quantity' => $this->received_quantity,
            'unit' => $this->unit,
            'unit_price' => (float) $this->unit_price,
            'subtotal' => (float) $this->subtotal,
            'notes' => $this->notes,
        ];
    }
}
