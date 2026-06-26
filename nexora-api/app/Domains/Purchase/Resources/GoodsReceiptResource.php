<?php

namespace App\Domains\Purchase\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GoodsReceiptResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'gr_no' => $this->gr_no,
            'date' => $this->date,
            'purchase_order_id' => $this->purchase_order_id,
            'purchase_order' => $this->whenLoaded('purchaseOrder', fn() => [
                'id' => $this->purchaseOrder->id,
                'po_no' => $this->purchaseOrder->po_no,
            ]),
            'supplier_id' => $this->supplier_id,
            'supplier' => $this->whenLoaded('supplier', fn() => [
                'id' => $this->supplier->id,
                'name' => $this->supplier->name,
            ]),
            'warehouse_id' => $this->warehouse_id,
            'reference_number' => $this->reference_number,
            'description' => $this->description,
            'total_items' => $this->total_items,
            'total_quantity' => $this->total_quantity,
            'status' => $this->status,
            'notes' => $this->notes,
            'received_by' => $this->received_by,
            'receiver' => $this->whenLoaded('receiver', fn() => [
                'id' => $this->receiver->id,
                'name' => $this->receiver->name,
            ]),
            'items' => GoodsReceiptItemResource::collection($this->whenLoaded('items')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
