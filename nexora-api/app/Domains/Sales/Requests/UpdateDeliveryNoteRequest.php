<?php

namespace App\Domains\Sales\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDeliveryNoteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'dn_no' => 'sometimes|string|max:50|unique:delivery_notes,dn_no,' . $this->route('id'),
            'dn_date' => 'sometimes|date',
            'delivery_order_id' => 'nullable|exists:delivery_orders,id',
            'do_no' => 'nullable|string|max:50',
            'customer_id' => 'nullable|exists:customers,id',
            'customer_name' => 'sometimes|string|max:255',
            'delivery_date' => 'nullable|date',
            'receiver' => 'nullable|string|max:255',
            'status' => 'sometimes|string|in:Pending,In Process,Completed',
            'total_amount' => 'sometimes|numeric|min:0',
            'notes' => 'nullable|string',
        ];
    }
}
