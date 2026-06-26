<?php

namespace App\Domains\Purchase\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RfqItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'rfq_id' => $this->rfq_id,
            'item_id' => $this->item_id,
            'item_name' => $this->item_name,
            'description' => $this->description,
            'quantity' => $this->quantity,
            'unit' => $this->unit,
            'estimated_unit_price' => (float) $this->estimated_unit_price,
            'subtotal' => (float) $this->subtotal,
            'notes' => $this->notes,
        ];
    }
}
