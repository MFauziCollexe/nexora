<?php

namespace App\Domains\Purchase\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePurchaseOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'po_no' => 'required|string|max:50|unique:purchase_orders,po_no',
            'date' => 'required|date',
            'supplier_id' => 'required|exists:suppliers,id',
            'rfq_id' => 'nullable|exists:rfqs,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'expected_delivery_date' => 'nullable|date',
            'total_items' => 'required|integer|min:0',
            'subtotal' => 'required|numeric|min:0',
            'discount' => 'required|numeric|min:0',
            'tax' => 'required|numeric|min:0',
            'total_amount' => 'required|numeric|min:0',
            'status' => 'sometimes|string|in:Draft,Pending,Approved,Sent,Partial,Received,Cancelled',
            'priority' => 'sometimes|string|in:Low,Medium,High',
            'notes' => 'nullable|string',
            'payment_terms' => 'nullable|string|max:255',
            'shipping_method' => 'nullable|string|max:255',
            'requested_by' => 'required|exists:users,id',
        ];
    }
}
