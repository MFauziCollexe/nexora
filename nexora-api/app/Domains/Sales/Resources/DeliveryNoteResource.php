<?php

namespace App\Domains\Sales\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DeliveryNoteResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'dn_no' => $this->dn_no,
            'dn_date' => $this->dn_date,
            'delivery_order_id' => $this->delivery_order_id,
            'do_no' => $this->do_no,
            'customer_id' => $this->customer_id,
            'customer_name' => $this->customer_name,
            'delivery_date' => $this->delivery_date,
            'receiver' => $this->receiver,
            'status' => $this->status,
            'total_amount' => (float) $this->total_amount,
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
