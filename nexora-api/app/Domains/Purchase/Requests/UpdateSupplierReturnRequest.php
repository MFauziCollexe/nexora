<?php

namespace App\Domains\Purchase\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSupplierReturnRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('supplier_return');
        return [
            'sr_no' => 'sometimes|string|max:50|unique:supplier_returns,sr_no,' . $id,
            'date' => 'sometimes|date',
            'purchase_order_id' => 'nullable|exists:purchase_orders,id',
            'goods_receipt_id' => 'nullable|exists:goods_receipts,id',
            'supplier_id' => 'sometimes|exists:suppliers,id',
            'warehouse_id' => 'nullable|exists:warehouses,id',
            'reference_number' => 'nullable|string|max:255',
            'reason' => 'nullable|string',
            'total_items' => 'sometimes|integer|min:0',
            'total_quantity' => 'sometimes|integer|min:0',
            'total_amount' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|string|in:Draft,Completed,Cancelled',
            'notes' => 'nullable|string',
            'returned_by' => 'sometimes|exists:users,id',
        ];
    }
}
