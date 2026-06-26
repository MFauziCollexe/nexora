<?php

namespace App\Domains\Sales\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DeliveryOrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'do_no' => $this->do_no,
            'do_date' => $this->do_date,
            'sales_order_id' => $this->sales_order_id,
            'so_no' => $this->so_no,
            'customer_id' => $this->customer_id,
            'customer_name' => $this->customer_name,
            'warehouse' => $this->warehouse,
            'delivery_date' => $this->delivery_date,
            'status' => $this->status,
            'delivery_type' => $this->delivery_type,
            'total_amount' => (float) $this->total_amount,
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
