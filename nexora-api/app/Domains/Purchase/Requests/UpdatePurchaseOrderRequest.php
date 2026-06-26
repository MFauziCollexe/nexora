<?php

namespace App\Domains\Purchase\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePurchaseOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('purchase_order');
        return [
            'po_no' => 'sometimes|string|max:50|unique:purchase_orders,po_no,' . $id,
            'date' => 'sometimes|date',
            'supplier_id' => 'sometimes|exists:suppliers,id',
            'rfq_id' => 'nullable|exists:rfqs,id',
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'expected_delivery_date' => 'nullable|date',
            'total_items' => 'sometimes|integer|min:0',
            'subtotal' => 'sometimes|numeric|min:0',
            'discount' => 'sometimes|numeric|min:0',
            'tax' => 'sometimes|numeric|min:0',
            'total_amount' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|string|in:Draft,Pending,Approved,Sent,Partial,Received,Cancelled',
            'priority' => 'sometimes|string|in:Low,Medium,High',
            'notes' => 'nullable|string',
            'payment_terms' => 'nullable|string|max:255',
            'shipping_method' => 'nullable|string|max:255',
            'requested_by' => 'sometimes|exists:users,id',
        ];
    }
}
