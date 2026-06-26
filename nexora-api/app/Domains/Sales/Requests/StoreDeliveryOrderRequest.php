<?php

namespace App\Domains\Sales\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDeliveryOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'do_no' => 'required|string|max:50|unique:delivery_orders,do_no',
            'do_date' => 'required|date',
            'sales_order_id' => 'nullable|exists:sales_orders,id',
            'so_no' => 'nullable|string|max:50',
            'customer_id' => 'nullable|exists:customers,id',
            'customer_name' => 'required|string|max:255',
            'warehouse' => 'nullable|string|max:255',
            'delivery_date' => 'nullable|date',
            'status' => 'sometimes|string|in:Pending,In Delivery,Completed,Cancelled',
            'delivery_type' => 'sometimes|string|in:Own Fleet,External',
            'total_amount' => 'required|numeric|min:0',
            'notes' => 'nullable|string',
        ];
    }
}
