<?php

namespace App\Domains\Purchase\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateApprovedVendorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('approved_vendor');
        return [
            'supplier_id' => 'sometimes|exists:suppliers,id|unique:approved_vendors,supplier_id,' . $id,
            'vendor_code' => 'sometimes|string|max:50|unique:approved_vendors,vendor_code,' . $id,
            'category' => 'nullable|string|max:255',
            'certification' => 'nullable|string|max:255',
            'approval_status' => 'sometimes|string|in:Pending,Approved,Suspended,Revoked',
            'approval_date' => 'nullable|date',
            'expiry_date' => 'nullable|date|after_or_equal:approval_date',
            'last_review_date' => 'nullable|date',
            'next_review_date' => 'nullable|date|after_or_equal:last_review_date',
            'scope_of_supply' => 'nullable|string',
            'notes' => 'nullable|string',
        ];
    }
}
