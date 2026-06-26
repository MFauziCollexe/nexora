<?php

namespace App\Domains\Sales\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSalesOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'so_no' => 'sometimes|string|max:50|unique:sales_orders,so_no,' . $this->route('id'),
            'date' => 'sometimes|date',
            'customer_id' => 'sometimes|exists:customers,id',
            'customer_name' => 'sometimes|string|max:255',
            'quotation_id' => 'nullable|exists:quotations,id',
            'total_amount' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|string|in:Draft,Confirmed,Released,Delivered,Invoiced,Cancelled',
            'notes' => 'nullable|string',
            'sales_person_id' => 'nullable|exists:users,id',
            'items' => 'nullable|array',
            'items.*.item_id' => 'nullable|exists:items,id',
            'items.*.item_name' => 'required_with:items|string|max:255',
            'items.*.quantity' => 'required_with:items|integer|min:1',
            'items.*.unit_price' => 'required_with:items|numeric|min:0',
            'items.*.subtotal' => 'required_with:items|numeric|min:0',
        ];
    }
}
