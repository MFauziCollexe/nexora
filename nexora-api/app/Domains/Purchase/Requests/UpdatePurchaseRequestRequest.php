<?php

namespace App\Domains\Purchase\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePurchaseRequestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('purchase_request');
        return [
            'pr_no' => 'sometimes|string|max:50|unique:purchase_requests,pr_no,' . $id,
            'date' => 'sometimes|date',
            'requested_by' => 'sometimes|exists:users,id',
            'department' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'total_items' => 'sometimes|integer|min:0',
            'total_amount' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|string|in:Draft,Pending,Approved,Rejected',
            'priority' => 'sometimes|string|in:Low,Medium,High',
            'notes' => 'nullable|string',
        ];
    }
}
