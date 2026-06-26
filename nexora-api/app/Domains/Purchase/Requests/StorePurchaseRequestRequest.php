<?php

namespace App\Domains\Purchase\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePurchaseRequestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'pr_no' => 'required|string|max:50|unique:purchase_requests,pr_no',
            'date' => 'required|date',
            'requested_by' => 'required|exists:users,id',
            'department' => 'required|string|max:255',
            'description' => 'nullable|string',
            'total_items' => 'required|integer|min:0',
            'total_amount' => 'required|numeric|min:0',
            'status' => 'sometimes|string|in:Draft,Pending,Approved,Rejected',
            'priority' => 'sometimes|string|in:Low,Medium,High',
            'notes' => 'nullable|string',
        ];
    }
}
