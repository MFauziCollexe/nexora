<?php

namespace App\Domains\Purchase\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePurchaseContractRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('purchase_contract');
        return [
            'contract_no' => 'sometimes|string|max:50|unique:purchase_contracts,contract_no,' . $id,
            'date' => 'sometimes|date',
            'start_date' => 'sometimes|date|after_or_equal:date',
            'end_date' => 'sometimes|date|after:start_date',
            'supplier_id' => 'sometimes|exists:suppliers,id',
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'contract_value' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|string|in:Draft,Active,Expired,Terminated,Renewed',
            'payment_terms' => 'sometimes|string|in:Monthly,Quarterly,Semi-Annually,Annually,Upon Delivery',
            'terms_and_conditions' => 'nullable|string',
            'notes' => 'nullable|string',
        ];
    }
}
