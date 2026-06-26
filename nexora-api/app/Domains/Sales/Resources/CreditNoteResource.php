<?php

namespace App\Domains\Sales\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CreditNoteResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'credit_note_no' => $this->credit_note_no,
            'date' => $this->date,
            'invoice_id' => $this->invoice_id,
            'invoice_no' => $this->invoice_no,
            'customer_id' => $this->customer_id,
            'customer_name' => $this->customer_name,
            'reason' => $this->reason,
            'total_amount' => (float) $this->total_amount,
            'used_amount' => (float) $this->used_amount,
            'status' => $this->status,
            'expires_on' => $this->expires_on,
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
