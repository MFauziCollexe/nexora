<?php

namespace App\Domains\Purchase\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePurchaseContractRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'contract_no' => 'required|string|max:50|unique:purchase_contracts,contract_no',
            'date' => 'required|date',
            'start_date' => 'required|date|after_or_equal:date',
            'end_date' => 'required|date|after:start_date',
            'supplier_id' => 'required|exists:suppliers,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'contract_value' => 'required|numeric|min:0',
            'status' => 'sometimes|string|in:Draft,Active,Expired,Terminated,Renewed',
            'payment_terms' => 'sometimes|string|in:Monthly,Quarterly,Semi-Annually,Annually,Upon Delivery',
            'terms_and_conditions' => 'nullable|string',
            'notes' => 'nullable|string',
        ];
    }
}
