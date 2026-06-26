<?php

namespace App\Domains\Purchase\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGoodsReceiptRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('goods_receipt');
        return [
            'gr_no' => 'sometimes|string|max:50|unique:goods_receipts,gr_no,' . $id,
            'date' => 'sometimes|date',
            'purchase_order_id' => 'sometimes|exists:purchase_orders,id',
            'supplier_id' => 'sometimes|exists:suppliers,id',
            'warehouse_id' => 'nullable|exists:warehouses,id',
            'reference_number' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'total_items' => 'sometimes|integer|min:0',
            'total_quantity' => 'sometimes|integer|min:0',
            'status' => 'sometimes|string|in:Draft,Completed,Cancelled',
            'notes' => 'nullable|string',
            'received_by' => 'sometimes|exists:users,id',
        ];
    }
}
