<?php

namespace App\Domains\Purchase\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierInvoiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'invoice_no' => $this->invoice_no,
            'date' => $this->date,
            'due_date' => $this->due_date,
            'supplier_id' => $this->supplier_id,
            'supplier' => $this->whenLoaded('supplier', fn() => [
                'id' => $this->supplier->id,
                'name' => $this->supplier->name,
            ]),
            'purchase_order_id' => $this->purchase_order_id,
            'purchase_order' => $this->whenLoaded('purchaseOrder', fn() => [
                'id' => $this->purchaseOrder->id,
                'po_no' => $this->purchaseOrder->po_no,
            ]),
            'goods_receipt_id' => $this->goods_receipt_id,
            'goods_receipt' => $this->whenLoaded('goodsReceipt', fn() => [
                'id' => $this->goodsReceipt->id,
                'gr_no' => $this->goodsReceipt->gr_no,
            ]),
            'supplier_invoice_ref' => $this->supplier_invoice_ref,
            'reference_number' => $this->reference_number,
            'subtotal' => $this->subtotal,
            'tax_amount' => $this->tax_amount,
            'tax_rate' => $this->tax_rate,
            'discount_amount' => $this->discount_amount,
            'total_amount' => $this->total_amount,
            'amount_due' => $this->amount_due,
            'currency' => $this->currency,
            'description' => $this->description,
            'status' => $this->status,
            'payment_status' => $this->payment_status,
            'notes' => $this->notes,
            'items' => SupplierInvoiceItemResource::collection($this->whenLoaded('items')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
