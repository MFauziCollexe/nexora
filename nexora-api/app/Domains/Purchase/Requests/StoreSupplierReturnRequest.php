<?php

namespace App\Domains\Purchase\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSupplierReturnRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'sr_no' => 'required|string|max:50|unique:supplier_returns,sr_no',
            'date' => 'required|date',
            'purchase_order_id' => 'nullable|exists:purchase_orders,id',
            'goods_receipt_id' => 'nullable|exists:goods_receipts,id',
            'supplier_id' => 'required|exists:suppliers,id',
            'warehouse_id' => 'nullable|exists:warehouses,id',
            'reference_number' => 'nullable|string|max:255',
            'reason' => 'nullable|string',
            'total_items' => 'required|integer|min:0',
            'total_quantity' => 'required|integer|min:0',
            'total_amount' => 'required|numeric|min:0',
            'status' => 'sometimes|string|in:Draft,Completed,Cancelled',
            'notes' => 'nullable|string',
            'returned_by' => 'required|exists:users,id',
        ];
    }
}
