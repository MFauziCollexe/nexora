<?php

namespace App\Domains\Sales\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateQuotationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('quotation');
        return [
            'quotation_no' => 'sometimes|string|max:50|unique:quotations,quotation_no,' . $id,
            'date' => 'sometimes|date',
            'customer_id' => 'sometimes|exists:customers,id',
            'customer_name' => 'sometimes|string|max:255',
            'total_amount' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|string|in:Draft,Sent,Open,Expired,Converted,Cancelled',
            'valid_until' => 'nullable|date',
            'sales_person_id' => 'nullable|exists:users,id',
            'notes' => 'nullable|string',
            'attachments' => 'nullable|array',
            'attachments.*' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'items' => 'sometimes|array',
            'items.*.item_id' => 'nullable|exists:items,id',
            'items.*.item_name' => 'required_with:items|string|max:255',
            'items.*.quantity' => 'required_with:items|integer|min:1',
            'items.*.unit_price' => 'required_with:items|numeric|min:0',
            'items.*.subtotal' => 'required_with:items|numeric|min:0',
        ];
    }
}
