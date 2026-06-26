<?php

namespace App\Domains\Sales\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSalesReturnRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'return_no' => 'required|string|max:50|unique:sales_returns,return_no',
            'return_date' => 'required|date',
            'invoice_id' => 'nullable|exists:invoices,id',
            'invoice_no' => 'nullable|string|max:50',
            'customer_id' => 'nullable|exists:customers,id',
            'customer_name' => 'required|string|max:255',
            'return_type' => 'sometimes|string|in:Return,Exchange,Credit Note',
            'reason' => 'nullable|string|max:500',
            'total_amount' => 'required|numeric|min:0',
            'status' => 'sometimes|string|in:Pending,Approved,Rejected',
            'notes' => 'nullable|string',
        ];
    }
}
