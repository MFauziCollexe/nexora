<?php

namespace App\Domains\Purchase\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGoodsReceiptRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'gr_no' => 'required|string|max:50|unique:goods_receipts,gr_no',
            'date' => 'required|date',
            'purchase_order_id' => 'required|exists:purchase_orders,id',
            'supplier_id' => 'required|exists:suppliers,id',
            'warehouse_id' => 'nullable|exists:warehouses,id',
            'reference_number' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'total_items' => 'required|integer|min:0',
            'total_quantity' => 'required|integer|min:0',
            'status' => 'sometimes|string|in:Draft,Completed,Cancelled',
            'notes' => 'nullable|string',
            'received_by' => 'required|exists:users,id',
        ];
    }
}
