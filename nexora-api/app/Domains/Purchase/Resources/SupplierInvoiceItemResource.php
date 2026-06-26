<?php

namespace App\Domains\Purchase\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierInvoiceItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'supplier_invoice_id' => $this->supplier_invoice_id,
            'purchase_order_item_id' => $this->purchase_order_item_id,
            'goods_receipt_item_id' => $this->goods_receipt_item_id,
            'item_id' => $this->item_id,
            'item_name' => $this->item_name,
            'quantity' => $this->quantity,
            'unit_price' => $this->unit_price,
            'tax_rate' => $this->tax_rate,
            'tax_amount' => $this->tax_amount,
            'discount_percent' => $this->discount_percent,
            'discount_amount' => $this->discount_amount,
            'total_price' => $this->total_price,
            'unit' => $this->unit,
            'notes' => $this->notes,
        ];
    }
}
