<?php

namespace App\Domains\Purchase\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GoodsReceiptItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'goods_receipt_id' => $this->goods_receipt_id,
            'purchase_order_item_id' => $this->purchase_order_item_id,
            'item_id' => $this->item_id,
            'item_name' => $this->item_name,
            'quantity_ordered' => $this->quantity_ordered,
            'quantity_received' => $this->quantity_received,
            'quantity_accepted' => $this->quantity_accepted,
            'quantity_rejected' => $this->quantity_rejected,
            'unit' => $this->unit,
            'notes' => $this->notes,
        ];
    }
}
