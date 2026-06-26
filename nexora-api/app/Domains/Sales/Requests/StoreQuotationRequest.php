<?php

namespace App\Domains\Sales\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuotationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'quotation_no' => 'required|string|max:50|unique:quotations,quotation_no',
            'date' => 'required|date',
            'customer_id' => 'required|exists:customers,id',
            'customer_name' => 'required|string|max:255',
            'total_amount' => 'required|numeric|min:0',
            'status' => 'sometimes|string|in:Draft,Sent,Open,Expired,Converted,Cancelled',
            'valid_until' => 'nullable|date',
            'sales_person_id' => 'nullable|exists:users,id',
            'notes' => 'nullable|string',
            'attachments' => 'nullable|array',
            'attachments.*' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'items' => 'sometimes|array',
            'items.*.item_id' => 'nullable|exists:items,id',
            'items.*.item_name' => 'required|string|max:255',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.subtotal' => 'required|numeric|min:0',
        ];
    }
}
