<?php

namespace App\Domains\Sales\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSalesReturnRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'return_no' => 'sometimes|string|max:50|unique:sales_returns,return_no,' . $this->route('id'),
            'return_date' => 'sometimes|date',
            'invoice_id' => 'nullable|exists:invoices,id',
            'invoice_no' => 'nullable|string|max:50',
            'customer_id' => 'nullable|exists:customers,id',
            'customer_name' => 'sometimes|string|max:255',
            'return_type' => 'sometimes|string|in:Return,Exchange,Credit Note',
            'reason' => 'nullable|string|max:500',
            'total_amount' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|string|in:Pending,Approved,Rejected',
            'notes' => 'nullable|string',
        ];
    }
}
