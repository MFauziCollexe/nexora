<?php

namespace App\Domains\Sales\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SalesReturnResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'return_no' => $this->return_no,
            'return_date' => $this->return_date,
            'invoice_id' => $this->invoice_id,
            'invoice_no' => $this->invoice_no,
            'customer_id' => $this->customer_id,
            'customer_name' => $this->customer_name,
            'return_type' => $this->return_type,
            'reason' => $this->reason,
            'total_amount' => (float) $this->total_amount,
            'status' => $this->status,
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
