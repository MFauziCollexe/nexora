<?php

namespace App\Domains\Sales\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSalesOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'so_no' => 'required|string|max:50|unique:sales_orders,so_no',
            'date' => 'required|date',
            'customer_id' => 'required|exists:customers,id',
            'customer_name' => 'required|string|max:255',
            'quotation_id' => 'nullable|exists:quotations,id',
            'total_amount' => 'required|numeric|min:0',
            'status' => 'sometimes|string|in:Draft,Confirmed,Released,Delivered,Invoiced,Cancelled',
            'notes' => 'nullable|string',
            'sales_person_id' => 'nullable|exists:users,id',
            'items' => 'sometimes|array',
            'items.*.item_id' => 'nullable|exists:items,id',
            'items.*.item_name' => 'required|string|max:255',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.subtotal' => 'required|numeric|min:0',
        ];
    }
}
