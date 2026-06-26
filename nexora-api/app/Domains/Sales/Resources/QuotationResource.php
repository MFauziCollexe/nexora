<?php

namespace App\Domains\Sales\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class QuotationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'quotation_no' => $this->quotation_no,
            'date' => $this->date,
            'customer_id' => $this->customer_id,
            'customer_name' => $this->customer_name,
            'total_amount' => (float) $this->total_amount,
            'status' => $this->status,
            'valid_until' => $this->valid_until,
            'sales_person_id' => $this->sales_person_id,
            'sales_person' => $this->whenLoaded('salesPerson', fn() => [
                'id' => $this->salesPerson->id,
                'name' => $this->salesPerson->name,
            ]),
            'notes' => $this->notes,
            'attachments' => $this->when($this->attachments, fn() => collect($this->attachments)->map(fn($path) => [
                'path' => $path,
                'url' => url('storage/' . $path),
                'name' => basename($path),
                'size' => Storage::disk('public')->exists($path) ? Storage::disk('public')->size($path) : 0,
            ])->values()),
            'items' => QuotationItemResource::collection($this->whenLoaded('items')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
