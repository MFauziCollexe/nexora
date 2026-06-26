<?php

namespace App\Domains\Purchase\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierReturnResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sr_no' => $this->sr_no,
            'date' => $this->date,
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
            'supplier_id' => $this->supplier_id,
            'supplier' => $this->whenLoaded('supplier', fn() => [
                'id' => $this->supplier->id,
                'name' => $this->supplier->name,
            ]),
            'warehouse_id' => $this->warehouse_id,
            'reference_number' => $this->reference_number,
            'reason' => $this->reason,
            'total_items' => $this->total_items,
            'total_quantity' => $this->total_quantity,
            'total_amount' => $this->total_amount,
            'status' => $this->status,
            'notes' => $this->notes,
            'returned_by' => $this->returned_by,
            'returned_by_user' => $this->whenLoaded('returnedBy', fn() => [
                'id' => $this->returnedBy->id,
                'name' => $this->returnedBy->name,
            ]),
            'approved_by' => $this->approved_by,
            'items' => SupplierReturnItemResource::collection($this->whenLoaded('items')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
