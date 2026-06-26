<?php

namespace App\Domains\Purchase\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseContractResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'contract_no' => $this->contract_no,
            'date' => $this->date,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'supplier_id' => $this->supplier_id,
            'supplier' => $this->whenLoaded('supplier', fn() => [
                'id' => $this->supplier->id,
                'name' => $this->supplier->name,
            ]),
            'title' => $this->title,
            'description' => $this->description,
            'contract_value' => (float) $this->contract_value,
            'status' => $this->status,
            'payment_terms' => $this->payment_terms,
            'terms_and_conditions' => $this->terms_and_conditions,
            'notes' => $this->notes,
            'approved_by' => $this->approved_by,
            'approved_at' => $this->approved_at,
            'items' => PurchaseContractItemResource::collection($this->whenLoaded('items')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
