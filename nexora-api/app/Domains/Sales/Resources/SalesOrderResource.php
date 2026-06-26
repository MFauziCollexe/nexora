<?php

namespace App\Domains\Sales\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SalesOrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'so_no' => $this->so_no,
            'date' => $this->date,
            'customer_id' => $this->customer_id,
            'customer_name' => $this->customer_name,
            'quotation_id' => $this->quotation_id,
            'quotation_no' => $this->whenLoaded('quotation', fn() => $this->quotation->quotation_no),
            'total_amount' => (float) $this->total_amount,
            'status' => $this->status,
            'notes' => $this->notes,
            'warehouse' => $this->warehouse,
            'sales_person_id' => $this->sales_person_id,
            'sales_person' => $this->whenLoaded('salesPerson', fn() => [
                'id' => $this->salesPerson->id,
                'name' => $this->salesPerson->name,
            ]),
            'items' => $this->whenLoaded('items'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
