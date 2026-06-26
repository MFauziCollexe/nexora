<?php

namespace App\Domains\Purchase\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierPaymentItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'supplier_payment_id' => $this->supplier_payment_id,
            'supplier_invoice_id' => $this->supplier_invoice_id,
            'invoice_amount' => $this->invoice_amount,
            'paid_amount' => $this->paid_amount,
            'outstanding_before' => $this->outstanding_before,
            'outstanding_after' => $this->outstanding_after,
            'notes' => $this->notes,
        ];
    }
}
