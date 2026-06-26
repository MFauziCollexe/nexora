<?php

namespace App\Domains\Sales\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDeliveryNoteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'dn_no' => 'required|string|max:50|unique:delivery_notes,dn_no',
            'dn_date' => 'required|date',
            'delivery_order_id' => 'nullable|exists:delivery_orders,id',
            'do_no' => 'nullable|string|max:50',
            'customer_id' => 'nullable|exists:customers,id',
            'customer_name' => 'required|string|max:255',
            'delivery_date' => 'nullable|date',
            'receiver' => 'nullable|string|max:255',
            'status' => 'sometimes|string|in:Pending,In Process,Completed',
            'total_amount' => 'required|numeric|min:0',
            'notes' => 'nullable|string',
        ];
    }
}
