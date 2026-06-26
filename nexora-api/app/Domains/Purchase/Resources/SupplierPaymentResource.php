<?php

namespace App\Domains\Purchase\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierPaymentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'payment_no' => $this->payment_no,
            'date' => $this->date,
            'supplier_id' => $this->supplier_id,
            'supplier' => $this->whenLoaded('supplier', fn() => [
                'id' => $this->supplier->id,
                'name' => $this->supplier->name,
            ]),
            'amount' => $this->amount,
            'paid_amount' => $this->paid_amount,
            'currency' => $this->currency,
            'payment_method' => $this->payment_method,
            'bank_name' => $this->bank_name,
            'bank_account' => $this->bank_account,
            'reference_number' => $this->reference_number,
            'payment_date' => $this->payment_date,
            'description' => $this->description,
            'status' => $this->status,
            'notes' => $this->notes,
            'items' => SupplierPaymentItemResource::collection($this->whenLoaded('items')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
