<?php

namespace App\Domains\Purchase\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRfqRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'rfq_no' => 'required|string|max:50|unique:rfqs,rfq_no',
            'date' => 'required|date',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'expected_delivery_date' => 'nullable|date',
            'closing_date' => 'nullable|date',
            'total_items' => 'required|integer|min:0',
            'total_amount' => 'required|numeric|min:0',
            'status' => 'sometimes|string|in:Draft,Sent,Open,Closed,Cancelled',
            'priority' => 'sometimes|string|in:Low,Medium,High',
            'notes' => 'nullable|string',
            'requested_by' => 'required|exists:users,id',
        ];
    }
}
