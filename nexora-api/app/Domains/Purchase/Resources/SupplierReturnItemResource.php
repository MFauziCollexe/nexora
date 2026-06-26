<?php

namespace App\Domains\Purchase\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierReturnItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'supplier_return_id' => $this->supplier_return_id,
            'purchase_order_item_id' => $this->purchase_order_item_id,
            'goods_receipt_item_id' => $this->goods_receipt_item_id,
            'item_id' => $this->item_id,
            'item_name' => $this->item_name,
            'quantity_returned' => $this->quantity_returned,
            'unit_price' => $this->unit_price,
            'total_price' => $this->total_price,
            'unit' => $this->unit,
            'return_reason' => $this->return_reason,
            'notes' => $this->notes,
        ];
    }
}
