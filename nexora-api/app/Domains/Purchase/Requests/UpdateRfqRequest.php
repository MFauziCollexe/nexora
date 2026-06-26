<?php

namespace App\Domains\Purchase\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRfqRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('rfq');
        return [
            'rfq_no' => 'sometimes|string|max:50|unique:rfqs,rfq_no,' . $id,
            'date' => 'sometimes|date',
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'expected_delivery_date' => 'nullable|date',
            'closing_date' => 'nullable|date',
            'total_items' => 'sometimes|integer|min:0',
            'total_amount' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|string|in:Draft,Sent,Open,Closed,Cancelled',
            'priority' => 'sometimes|string|in:Low,Medium,High',
            'notes' => 'nullable|string',
            'requested_by' => 'sometimes|exists:users,id',
        ];
    }
}
