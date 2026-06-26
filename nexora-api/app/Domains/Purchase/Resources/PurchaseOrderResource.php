<?php

namespace App\Domains\Purchase\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseOrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'po_no' => $this->po_no,
            'date' => $this->date,
            'supplier_id' => $this->supplier_id,
            'supplier' => $this->whenLoaded('supplier', fn() => [
                'id' => $this->supplier->id,
                'name' => $this->supplier->name,
            ]),
            'rfq_id' => $this->rfq_id,
            'title' => $this->title,
            'description' => $this->description,
            'expected_delivery_date' => $this->expected_delivery_date,
            'total_items' => $this->total_items,
            'subtotal' => (float) $this->subtotal,
            'discount' => (float) $this->discount,
            'tax' => (float) $this->tax,
            'total_amount' => (float) $this->total_amount,
            'status' => $this->status,
            'priority' => $this->priority,
            'notes' => $this->notes,
            'payment_terms' => $this->payment_terms,
            'shipping_method' => $this->shipping_method,
            'requested_by' => $this->requested_by,
            'requester' => $this->whenLoaded('requester', fn() => [
                'id' => $this->requester->id,
                'name' => $this->requester->name,
            ]),
            'approved_by' => $this->approved_by,
            'approved_at' => $this->approved_at,
            'items' => PurchaseOrderItemResource::collection($this->whenLoaded('items')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
