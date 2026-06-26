<?php

namespace App\Domains\Purchase\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseRequestResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'pr_no' => $this->pr_no,
            'date' => $this->date,
            'requested_by' => $this->requested_by,
            'requester' => $this->whenLoaded('requester', fn() => [
                'id' => $this->requester->id,
                'name' => $this->requester->name,
            ]),
            'department' => $this->department,
            'description' => $this->description,
            'total_items' => $this->total_items,
            'total_amount' => (float) $this->total_amount,
            'status' => $this->status,
            'priority' => $this->priority,
            'notes' => $this->notes,
            'approved_by' => $this->approved_by,
            'approved_at' => $this->approved_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
