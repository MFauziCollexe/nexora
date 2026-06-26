<?php

namespace App\Domains\Sales\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'invoice_no' => 'required|string|max:50|unique:invoices,invoice_no',
            'date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:date',
            'customer_id' => 'required|exists:customers,id',
            'total_amount' => 'required|numeric|min:0',
            'paid_amount' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|string|in:Unpaid,Partial,Paid,Overdue,Cancelled',
        ];
    }
}
