<?php

namespace App\Domains\Sales\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'invoice_no' => $this->invoice_no,
            'date' => $this->date,
            'due_date' => $this->due_date,
            'customer_id' => $this->customer_id,
            'customer_name' => $this->customer_name,
            'sales_order_id' => $this->sales_order_id,
            'so_no' => $this->so_no,
            'total_amount' => (float) $this->total_amount,
            'paid_amount' => (float) $this->paid_amount,
            'outstanding' => (float) $this->outstanding,
            'status' => $this->status,
            'notes' => $this->notes,
            'items' => $this->whenLoaded('items'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
