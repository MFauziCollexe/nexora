<?php

namespace App\Domains\Purchase\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApprovedVendorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'supplier_id' => $this->supplier_id,
            'supplier' => $this->whenLoaded('supplier', fn() => [
                'id' => $this->supplier->id,
                'name' => $this->supplier->name,
            ]),
            'vendor_code' => $this->vendor_code,
            'category' => $this->category,
            'certification' => $this->certification,
            'approval_status' => $this->approval_status,
            'approval_date' => $this->approval_date,
            'expiry_date' => $this->expiry_date,
            'last_review_date' => $this->last_review_date,
            'next_review_date' => $this->next_review_date,
            'scope_of_supply' => $this->scope_of_supply,
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
